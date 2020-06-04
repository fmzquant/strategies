
> 策略名称

C++期货高频套币策略OKEX Websocket版

> 策略作者

小小梦

> 策略描述

## C++期货高频套币策略OKEX Websocket版

策略原理 

  策略原理为非常简单的，OKEX合约跨期对冲，仓位控制设计方面，设计为差价网格对冲。
  策略定义两个合约，A合约，B合约。可以合约设置不同的合约代码，进行对冲。
  例如，设置 A 合约为季度合约，B合约为当周合约（也可以设置 A 为近期合约，B为远期合约，其它定义就是相反的）。
  对冲操作即分为 做空A合约（季度），做多B合约（类似 商品期货中跨期套利的做空远期合约，做多近期合约，进行正套）
  做多A合约，做空B合约（类似商品期货中的做空近期，做多远期，进行反套）

- ### 设计特点

  - 代码语言
    策略编写代码使用C++语言，具有速度快的性能优势。

  - 行情驱动:
    行情驱动采用OKEX websocket 接口接受交易所推送行情，最新行情获取较为及时，行情数据使用数据量不大的实时tick数据，
    对于行情响应速度有不小提升。对于tick 数据，策略专门构造了一个K线生成器，用来对获取到的tick数据计算后的合约差价，进行K线合成。
    策略对冲操作的开仓、平仓 均由该K线生成器类对象生成的数据驱动。

  - 仓位控制
    仓位控制采用类似 「波菲纳契」数列的对冲仓位比例，进行控制。
    实现差价越大，套利对冲数量相对增加，对仓位进行分散，从而把握住小差价波动小仓位，大差价波动仓位适当增大。

  - 平仓：止损止盈
    固定的止盈差价，止损差价。
    持仓差价到达止盈位置、止损位置即进行止盈、止损。

  - 入市、离市 周期设计
    参数 NPeriod 控制的周期对策略的开仓平仓进行一定的动态控制。

  - 仓位平衡系统、订单检测系统
    策略有专门的定期检测 平衡系统。
    订单检测系统。
    
  - 策略扩展
    策略代码设计耦合度较低，可扩展为商品期货对冲，或者进行进一步优化，修改。

  - 策略图表
    策略自动生成差价 K线图表，标记相关交易信息。

- ### 回测

  ![IMG](https://www.fmz.com/upload/asset/165549c612d8ba5ae550.png) 

  ![IMG](https://www.fmz.com/upload/asset/168d0e671a56094b28c3.png) 

  ![IMG](https://www.fmz.com/upload/asset/170dcc772a1925d46885.png)

> 策略参数



|参数|默认值|描述|
|----|----|----|
|InstrumentA|this_week|近期合约|
|InstrumentB|next_week|远期合约|
|DPeriod|30|差价周期(秒)|
|NPeriod|20|周期|
|LeavePeriod|5|出场周期|
|AddMax|5|加仓次数|
|StopLoss|10|止损差价|
|StopWin|30|止盈差价|
|OpenAmount|10|手数|
|SlidePrice|true|滑价|
|MaxDelay|500|最大行情延迟(毫秒)|
|IsSetProxy|false|(?代理)是否代理设置|
|Proxy||代理设置|


> 源码 (cpp)

``` cpp
/*backtest
start: 2019-07-22 00:00:00
end: 2019-08-21 00:00:00
period: 1m
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD","stocks":0.1,"fee":[0.02,0.05]}]
args: [["InstrumentB","quarter"],["NPeriod",200],["LeavePeriod",100],["AddMax",3],["StopLoss",20],["StopWin",50],["OpenAmount",2]]
*/

enum State {
    STATE_NA,
    STATE_IDLE,
    STATE_HOLD_LONG,
    STATE_HOLD_SHORT,
};

string replace(string s, const string from, const string& to) {
    if(!from.empty())
        for(size_t pos = 0; (pos = s.find(from, pos)) != std::string::npos; pos += to.size())
            s.replace(pos, from.size(), to);
    return s;
}

class BarFeeder {
    public:
        BarFeeder(int period) : _period(period) {
            _rs.Valid = true;
        }

        void feed(double price, Chart *c=nullptr, int chartIdx=0) {
            uint64_t epoch = uint64_t(Unix() / _period) * _period * 1000;
            bool newBar = false;
            if (_rs.size() == 0 || _rs[_rs.size()-1].Time < epoch) {
                Record r;
                r.Time = epoch;
                r.Open = r.High = r.Low = r.Close = price;
                _rs.push_back(r);
                if (_rs.size() > 2000) {
                    _rs.erase(_rs.begin());
                }
                newBar = true;
            } else {
                Record &r = _rs[_rs.size() - 1];
                r.High = max(r.High, price);
                r.Low = min(r.Low, price);
                r.Close = price;
            }
    
            auto bar = _rs[_rs.size()-1];
            json point = {bar.Time, bar.Open, bar.High, bar.Low, bar.Close};
            if (c != nullptr) {
               if (newBar) {
                    c->add(chartIdx, point);
                    c->reset(1000);
                } else {
                    c->add(chartIdx, point, -1);
                } 
            }
        }
        Records & get() {
            return _rs;
        }
    private:
        int _period;
        Records _rs;
};

class Hedge {
  public:
    Hedge() {
        _isCover = true;
        _needCheckOrder = true;
        _st = STATE_NA;
        for (int i = 0; i < AddMax + 1; i++) {
            if (_addArr.size() < 2) {
                _addArr.push_back((i+1)*OpenAmount);
            }
            _addArr.push_back(_addArr[_addArr.size()-1] + _addArr[_addArr.size()-2]);
        }

        _cfgStr = R"EOF(
        [{
        "extension": { "layout": "single", "col": 6, "height": "500px"},
        "rangeSelector": {"enabled": false},
        "tooltip": {"xDateFormat": "%Y-%m-%d %H:%M:%S, %A"},
        "plotOptions": {"candlestick": {"color": "#d75442", "upColor": "#6ba583"}},
        "chart":{"type":"line"},
        "title":{"text":"Spread Long"},
        "xAxis":{"title":{"text":"Date"}},
        "series":[
            {"type":"candlestick", "name":"Long Spread","data":[], "id":"dataseriesA"},
            {"type":"flags","data":[], "onSeries": "dataseriesA"}
            ]
        },
        {
        "extension": { "layout": "single", "col": 6, "height": "500px"},
        "rangeSelector": {"enabled": false},
        "tooltip": {"xDateFormat": "%Y-%m-%d %H:%M:%S, %A"},
        "plotOptions": {"candlestick": {"color": "#d75442", "upColor": "#6ba583"}},
        "chart":{"type":"line"},
        "title":{"text":"Spread Short"},
        "xAxis":{"title":{"text":"Date"}},
        "series":[
            {"type":"candlestick", "name":"Long Spread","data":[], "id":"dataseriesA"},
            {"type":"flags","data":[], "onSeries": "dataseriesA"}
            ]
        }
        ]
        )EOF";
        _c.update(_cfgStr);
        _c.reset();
    };
    
    State getState(string &symbolA, Depth &depthA, string &symbolB, Depth &depthB) {
        
        if (!_needCheckOrder && _st != STATE_NA) {
            return _st;
        }

        //Log("sync orders");
        auto orders = exchange.GetOrders();
        if (!orders.Valid) {
            return STATE_NA;
        }

        if (orders.size() > 0) {
            for (auto &order : orders) {
                exchange.CancelOrder(order.Id);
            }
            return STATE_NA;
        }
        
        Sleep(500);
        
        //Log("sync positions");
        
        auto positions = exchange.GetPosition();
        if (!positions.Valid) {
            return STATE_NA;
        }
        
        // cache orders and positions;
        _needCheckOrder = false;
        
        if (positions.size() == 0) {
            //Log("Position is empty");
            return STATE_IDLE;
        }

        
        State st[2] = {STATE_IDLE, STATE_IDLE};
        double holdAmount[2] = {0, 0};
        double holdPrice[2] = {};
        for (auto &pos : positions) {
            int idx = -1;
            if (pos.ContractType == symbolA) {
                idx = 0;
            } else if (pos.ContractType == symbolB) {
                idx = 1;
            }
            if (idx >= 0) {
                holdPrice[idx] = pos.Price;
                holdAmount[idx] += pos.Amount;
                st[idx] = pos.Type == PD_LONG || pos.Type == PD_LONG_YD ? STATE_HOLD_LONG : STATE_HOLD_SHORT;
            }
        }

        if (holdAmount[0] > holdAmount[1]) {
            st[1] = STATE_IDLE;
        } else if (holdAmount[0] < holdAmount[1]) {
            st[0] = STATE_IDLE;
        }

        if (st[0] != STATE_IDLE && st[1] != STATE_IDLE) {
            // update
            _holdPrice = _N(holdPrice[1] - holdPrice[0], 4);
            _holdAmount = holdAmount[0];
            return st[0];
        } else if (st[0] == STATE_IDLE && st[1] == STATE_IDLE) {
            return STATE_IDLE;
        } else {
            double amount = abs(holdAmount[0] - holdAmount[1]);
            auto idx_fat = st[0] == STATE_IDLE ? 1 : 0;
            if (_isCover) {
                exchange.SetContractType(st[0] == STATE_IDLE ? symbolB : symbolA);
                if (st[idx_fat] == STATE_HOLD_LONG) {
                    exchange.SetDirection("closebuy");
                    exchange.Sell((st[0] == STATE_IDLE ? depthB.Bids[0].Price: depthA.Bids[0].Price)-SlidePrice, amount);
                } else {
                    exchange.SetDirection("closesell");
                    exchange.Buy((st[0] == STATE_IDLE ? depthB.Asks[0].Price : depthA.Asks[0].Price)+SlidePrice, amount);
                }
            } else {
                exchange.SetContractType(st[0] == STATE_IDLE ? symbolA : symbolB);
                if (st[idx_fat] == STATE_HOLD_LONG) {
                    exchange.SetDirection("sell");
                    exchange.Sell((st[0] == STATE_IDLE ? depthA.Bids[0].Price : depthB.Bids[0].Price)-SlidePrice, amount);
                } else {
                    exchange.SetDirection("buy");
                    exchange.Buy((st[0] == STATE_IDLE ? depthA.Asks[0].Price : depthB.Asks[0].Price)+SlidePrice, amount);
                }
            }
            
            _needCheckOrder = true;
            
            return STATE_NA;
        }
        Log(positions);
        Panic("WTF");
    }
    bool Loop(string &symbolA, Depth &depthA, string &symbolB, Depth &depthB, string extra="") {
        
        _loopCount++;
        auto diffLong = _N(depthB.Bids[0].Price - depthA.Asks[0].Price, 4);
        auto diffShort = _N(depthB.Asks[0].Price - depthA.Bids[0].Price, 4);
        
       _feederA.feed(diffLong, &_c, 0);
       _feederB.feed(diffShort, &_c, 2);
        
        auto barsA = _feederA.get();
        auto barsB = _feederB.get();

        if (barsA.size() < max(LeavePeriod, NPeriod) + 2) {
            LogStatus(_D(), "Calc His", barsA.size());
            return true;
        }
        
        bool expired = false;
        auto seconds = Unix();
        if (seconds - _lastCache > 600) {
            _needCheckOrder = true;
            expired = true;
        }
        
        State st = getState(symbolA, depthA, symbolB, depthB);
        if (st == STATE_NA) {
            return true;
        }
        if (st == STATE_IDLE) {
            _holdPrice = 0;
        }
        // cache st
        _st = st;
        if (expired) {
            _lastCache = seconds;
        }
        
        if (Unix() - seconds > 5) {
            Log("skip this tick");
            return true;
        }
        

        LogStatus(_D(), "State: ", _state_desc[st], "Hold:", _holdPrice, "Long:", diffLong, "Short:", diffShort, "Loop:", _loopCount, extra);

        if (st == STATE_IDLE && _isCover) {
            auto account = exchange.GetAccount();
            if (account.Valid) {
                double profit = _N(exchange.GetName() == "Futures_OKCoin" ? account.Stocks + account.FrozenStocks : account.Balance + account.FrozenBalance, 8);
                LogProfit(profit, _hedgeCount > 0 ? format("Net: %f @", profit) : "");
            }
            _isCover = false;
            return true;
        }
        auto ratio = abs(diffLong - diffShort);
        bool condOpenLong = (st == STATE_IDLE || st == STATE_HOLD_LONG) && (diffLong - _countOpen * max(1.0, _holdPrice * 0.1)) > TA.Highest(barsA.High(), NPeriod) && _countOpen < AddMax;
        bool condOpenShort = (st == STATE_IDLE || st == STATE_HOLD_SHORT) && (diffShort + _countOpen * max(1.0, _holdPrice * 0.1)) < TA.Lowest(barsB.Low(), NPeriod) && _countOpen < AddMax;
        bool condCoverLong = false;
        bool condCoverShort = false;
        bool isLeave = false;
        bool isStopLoss = false;
        bool isStopWin = false;
        if (st == STATE_HOLD_LONG) {
            auto leavePrice = (diffShort + _countCover + ratio);
            isLeave = leavePrice < TA.Lowest(barsB.Low(), LeavePeriod);
            if (!isLeave) {
                isStopLoss = diffShort - _holdPrice >= StopLoss;
                if (!isStopLoss) {
                    isStopWin = _holdPrice - diffShort >= StopWin;
                    if (isStopWin) {
                        Log("Stop Win", "HOLD:", _holdPrice, "SHORT:", diffShort);
                    }
                } else {
                    Log("StopLoss", "HOLD:", _holdPrice, "SHORT:", diffShort);
                }
            } else {
                Log("Leave normally", "LeavePrice:", leavePrice);
            }
            condCoverLong = isLeave || isStopLoss || isStopWin;
        } else if (st == STATE_HOLD_SHORT) {
            auto leavePrice = (diffLong - _countCover - ratio);
            isLeave = leavePrice > TA.Highest(barsA.High(), NPeriod);
            if (!isLeave) {
                isStopLoss = _holdPrice - diffLong >= StopLoss;
                if (!isStopLoss) {
                    isStopWin = diffLong - _holdPrice >= StopWin;
                    if (isStopWin) {
                        Log("Stop Win", "HOLD:", _holdPrice, "LONG:", diffLong);
                    }
                } else {
                    Log("StopLoss", "HOLD:", _holdPrice, "LONG:", diffLong);
                }
            } else {
                Log("Leave normally", "LeavePrice:", leavePrice);
            }
            condCoverShort = isLeave || isStopLoss || isStopWin;
        }
        
        string action, color;
        double opPrice;
        int chartIdx = 0;
        if (condOpenLong) {
            // Must Increase
            if (_countOpen > 0 && diffLong <= _holdPrice) {
                return STATE_IDLE;
            }
            
            _isCover = false;
            _countOpen++;
            _countCover = 0;
            _holdPrice = diffLong;
            auto amount = _addArr[_countOpen];

            if (_countOpen > 0) {
                Log("Add Position Long", _countOpen);
            }
            exchange.SetContractType(symbolB);
            exchange.SetDirection("sell");
            exchange.Sell(depthB.Bids[0].Price-SlidePrice, amount);

            exchange.SetContractType(symbolA);
            exchange.SetDirection("buy");
            exchange.Buy(depthA.Asks[0].Price+SlidePrice, amount);
            action = "L";
            color = "blue";
            opPrice = diffLong;
            chartIdx = 1;
        } else if (condOpenShort) {
            // Must Decrease
            if (_countOpen > 0 && diffShort >= _holdPrice) {
                return STATE_IDLE;
            }
            
            _isCover = false;
            _countOpen++;
            _countCover = 0;
            _holdPrice = diffShort;
            auto amount = _addArr[_countOpen];

            if (_countOpen > 0) {
                Log("Add Position Short", _countOpen);
            }
            exchange.SetContractType(symbolA);
            exchange.SetDirection("sell");
            exchange.Sell(depthA.Bids[0].Price-SlidePrice, amount);

            exchange.SetContractType(symbolB);
            exchange.SetDirection("buy");
            exchange.Buy(depthB.Asks[0].Price+SlidePrice, amount);
            
            action = "S";
            color = "red";
            opPrice = diffShort;
            chartIdx = 3;
        } else if (condCoverLong) {
            _isCover = true;
            _countOpen = 0;
            _countCover++;
            _hedgeCount++;
            if (_countCover > 0) {
                Log("Cover Position Long", _countCover);
            }
            exchange.SetContractType(symbolB);
            exchange.SetDirection("closesell");
            exchange.Buy(depthB.Asks[0].Price+SlidePrice, _holdAmount);

            exchange.SetContractType(symbolA);
            exchange.SetDirection("closebuy");
            exchange.Sell(depthA.Bids[0].Price-SlidePrice, _holdAmount);
            
           action = "CL";
           color = "blue";
           opPrice = diffShort;
            
           chartIdx = 3;
        } else if (condCoverShort) {
            _hedgeCount++;
            _isCover = true;
            _countOpen = 0;
            _countCover++;
            if (_countCover > 0) {
                Log("Cover Position Short", _countCover);
            }
            exchange.SetContractType(symbolA);
            exchange.SetDirection("closesell");
            exchange.Buy(depthA.Asks[0].Price+SlidePrice, _holdAmount);

            exchange.SetContractType(symbolB);
            exchange.SetDirection("closebuy");
            exchange.Sell(depthB.Bids[0].Price-SlidePrice, _holdAmount);
            action = "CS";
            color = "blue";
            opPrice = diffLong;
            chartIdx = 1;
        } else {
            return true;
        }
        _needCheckOrder = true;
            
        _c.add(chartIdx, {{"x", UnixNano()/1000000}, {"title", action},  {"text", format("diff: %f", opPrice)}, {"color", color}});
        Log(st, "Long:", diffLong, "Short:", diffShort, "Hold:", _holdPrice);
        return true;
    }

  private:
    
    vector<double> _addArr;
    string _state_desc[4] = {"NA", "IDLE", "LONG", "SHORT"};
    int _countOpen = 0;
    int _countCover = 0;
    int _lastCache = 0;
    int _hedgeCount = 0;
    int _loopCount = 0;
    double _holdPrice = 0;
    BarFeeder _feederA = BarFeeder(DPeriod);
    BarFeeder _feederB = BarFeeder(DPeriod);
    State _st = STATE_NA;
    string _cfgStr;
    double _holdAmount = 0;
    bool _isCover = false;
    bool _needCheckOrder = true;
    Chart _c = Chart("{}");
    
};

inline unsigned char toHex(unsigned char x) { 
    return  x > 9 ? x + 55 : x + 48; 
}

std::string urlencode(const std::string& str) {
    std::string strTemp = "";
    size_t length = str.length();
    for (size_t i = 0; i < length; i++)
    {
        if (isalnum((unsigned char)str[i]) || 
            (str[i] == '-') ||
            (str[i] == '_') || 
            (str[i] == '.') || 
            (str[i] == '~'))
            strTemp += str[i];
        else if (str[i] == ' ')
            strTemp += "+";
        else
        {
            strTemp += '%';
            strTemp += toHex((unsigned char)str[i] >> 4);
            strTemp += toHex((unsigned char)str[i] % 16);
        }
    }
    return strTemp;
}

uint64_t _Time(string &s) {
    tm t_init;
    t_init.tm_year  = 70;
    t_init.tm_mon   = 0;
    t_init.tm_mday  = 1;
    t_init.tm_hour  = 0;
    t_init.tm_min   = 0;
    t_init.tm_sec   = 0;
    
    tm t;
    int year, month, day, hour, minute, second, ms;
    sscanf(s.c_str(), "%d-%d-%dT%d:%d:%d.%dZ", &year, &month, &day, &hour, &minute, &second, &ms);
    t.tm_year  = year - 1900;
    t.tm_mon   = month - 1;
    t.tm_mday  = day;
    t.tm_hour  = hour;
    t.tm_min   = minute;
    t.tm_sec   = second;
    t.tm_isdst = 0;

    return uint64_t(mktime(&t))*1000+ms-uint64_t(mktime(&t_init))*1000;
}

void main() {
    // exchange.IO("base", "https://www.okex.me");   // 测试
    if (IsSetProxy) {
        exchange.SetProxy(Proxy);
    }
    
    LogReset();
    LogProfitReset();
    SetErrorFilter("ready|timeout|500");
    Log("Init OK");
    
    string symbolA = InstrumentA;
    string symbolB = InstrumentB;
    Hedge h;
    
    if (IsVirtual()) {
        while (true) {
            exchange.SetContractType(symbolA);
            auto depthA = exchange.GetDepth();
            if (depthA.Valid) {
                exchange.SetContractType(symbolB);
                auto depthB = exchange.GetDepth();
                if (depthB.Valid) {
                    h.Loop(symbolA, depthA, symbolB, depthB);
                }
            }
        }
        return;
    }
    if (exchange.GetName() != "Futures_OKCoin") {
        Panic("only support Futures_OKCoin");
    }
    string realSymbolA = exchange.SetContractType(symbolA)["instrument"];
    string realSymbolB = exchange.SetContractType(symbolB)["instrument"];

    string qs = urlencode(json({{"op", "subscribe"}, {"args", {"futures/depth5:" + realSymbolA, "futures/depth5:" + realSymbolB}}}).dump());
    Log("try connect to websocket");
    // wss://real.OKEx.com:8443/ws/v3
    auto ws = Dial("wss://real.okex.com:8443/ws/v3|compress=gzip_raw&mode=recv&reconnect=true&payload="+qs);
    // auto ws = Dial("wss://real.okex.me:8443/ws/v3|compress=gzip_raw&mode=recv&reconnect=true&payload="+qs);
    Log("connect to websocket success");
    
    Depth depthA, depthB;
    auto fillDepth = [](json &data, Depth &d) {
        d.Valid = true;
        d.Asks.clear();
        d.Asks.push_back({atof(string(data["asks"][0][0]).c_str()), atof(string(data["asks"][0][1]).c_str())});
        d.Bids.clear();
        d.Bids.push_back({atof(string(data["bids"][0][0]).c_str()), atof(string(data["bids"][0][1]).c_str())});
    };
    string timeA;
    string timeB;
    while (true) {
        auto buf = ws.read();

        // Log("buf:", buf);   // 测试
        
        json obj;
        try {
            obj = json::parse(buf);
        } catch (json::parse_error& e) {
            Log(buf);
            Log(e.what());
            continue;
        }
        if (obj["data"].size() == 0) {
            continue;
        }
        auto data = obj["data"][0];
        string ins = data["instrument_id"];
        if (ins == realSymbolA) {
            fillDepth(data, depthA);
            timeA = data["timestamp"];
        } else if (ins == realSymbolB) {
            fillDepth(data, depthB);
            timeB = data["timestamp"];
        }
        
        if (depthA.Valid && depthB.Valid) {
            auto diffA = uint64_t(UnixNano()/1000000)-_Time(timeA);
            auto diffB = uint64_t(UnixNano()/1000000)-_Time(timeB);

            if (diffA > MaxDelay || diffB > MaxDelay) {
                continue;
            }
            h.Loop(symbolA, depthA, symbolB, depthB, format("market delay (ms): %d, %d", diffA, diffB));
        }
    }
}




```

> 策略出处

https://www.fmz.com/strategy/163447

> 更新时间

2020-05-27 10:29:05
