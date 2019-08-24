
> 策略名称

C++商品期货高频交易策略之Penny Jump

> 策略作者

Zero

> 策略描述

> 高频交易分类

* 以最快的速度抹平市场的一切不合理现象, 常见于炒单与高频套利, 主动出击, 拼速度
* 提前在不合理的价位埋伏并跟随市场快速移动, 常见于市商策略, 守株待兔, 拼知识面
* 其它各种作者只学习了理论没有实盘, 先不讲

> 动手实现

* 观察盘口的概率极低的不合理现像并做出相应策略进行测试更改
* 如果逻辑复杂, 就需要利用现有的数学知识尽可能的用模型描述不合理现象的本质, 尽量减少拟合
* 必须用可以见量成交又可以见价成交的回测模型去验证, 发明者量化目前是唯一支持这两种回测模式的平台
* 平台的C++例子很少, 这里就用C++写本策略, 方便大家学习

> 策略原理

 正常情况下商品期货的盘口买一卖一差价只有一跳, 偶尔会有两跳，三跳基本很少见, 主力合约交易比较频繁, 这种现像发生后瞬间消失, 难以有下手机会, 我们就把精力放到次主力合约上面，比如MA001为主力, MA909为次主力时, MA909盘口下面这种情况

 ![IMG](https://www.fmz.com/upload/asset/10c6ef53263999aec8e.png) 
 
 卖一为2225量551, 买一2223量565, 向下看几秒, 出现这种情况后, 几个tick推送后消失, 这种情况，我们视为市场的自我纠正, 我们要做的就是赶在市场主动纠正前, 杀进去, 这种逻辑看人工去盯盘是天方夜谈, 因为商品期货盘口差价两跳的情况级少出现, 三跳最安全, 但三跳极少出现, 导致交易频率太低, 意义不大, 接下来, 我们观察盘口之前卖一买一与现在两跳时买一卖一的区别, 去填补盘口差价空隙, 如果速度够快, 就可以排在委托单的最前位置, 做为Maker以最快的速度成交后反手卖出, 持仓时间很短, 有了这个交易逻辑, 实现为策略以后, 以MA909为例, 实盘测试推荐易盛而非CTP接口, 易盛仓位与资金变化是推送机制, 非常适合高频

> 回测结果

 ![IMG](https://www.fmz.com/upload/asset/1209a7f1c3125148a76.png) 

> 交易逻辑

 ![IMG](https://www.fmz.com/upload/asset/e2afad523b119c9a23.png) 
 
> 必看声明

为满足对高频交易的好奇心, 为了更明显的看到结果, 此策略回测手续费设定为0, 实现了一个简单的拼速度逻辑, 想要覆盖手续费实现盈利, 实盘需做更多优化, 仅凭这个简单的逻辑很难致胜, 要考虑更多操作, 比如锁仓(降低平今手续费), 利用定单薄流进行短期预测提高胜率, 再加上交易所手续费返还, 从而实现一个可持久盈利的策略, 关于高频交易的书籍很多, 希望大家多去思考，多去实盘，而不是只停留在原理上.
  
> 关于我们

  发明者量化是一个纯技术驱动的团队, 为量化交易爱好者提供了一个高可用的回测机制, 我们的回测机制是真实的模拟了一个交易所的存在, 而不是简单的见价撮合, 希望用户能够利用到平台的优点更好的去发挥自己的能力

> 策略参数



|参数|默认值|描述|
|----|----|----|
|Symbol|MA909|品种|
|RetryMax|true|重试最多|
|ProfitTick|true|利润跳数|
|TolerateTick|5|容忍跳数|


> 源码 (cpp)

``` cpp
/*backtest
start: 2019-08-19 09:00:00
end: 2019-08-23 15:00:00
period: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES","balance":10000,"minfee":0,"fee":[0,0]}]
mode: 1
*/

enum State {
    STATE_NA,
    STATE_IDLE,
    STATE_HOLD_LONG,
    STATE_HOLD_SHORT,
};

typedef struct {
    double bidPrice;
    double bidAmount;
    double askPrice;
    double askAmount;
} Book;

class HFT {
    public:
        HFT() {
            _tradingDay = getTradingWeekDay();
            Log("current trading weekday", _tradingDay);
        }
        int getTradingWeekDay() {
            int seconds = Unix() + 28800;
            int hour = (seconds/3600)%24;
            int weekDay = (seconds/(60*60*24))%7+4;
            if (hour > 20) {
                weekDay += 1;
            }
            return weekDay;
        }
        State getState() {
            auto orders = exchange.GetOrders();
            if (!orders.Valid || orders.size() == 2) {
                return STATE_NA;
            }
            
            bool foundCover = false;
            for (auto &order : orders) {
                if (order.Id == _coverId) {
                    if ((order.Type == ORDER_TYPE_BUY && order.Price < _book.bidPrice - _toleratePrice) ||
                        (order.Type == ORDER_TYPE_SELL && order.Price > _book.askPrice + _toleratePrice)) {
                        exchange.CancelOrder(order.Id, "Cancel Cover Order");
                        _countCancel++;
                        _countRetry++;
                    } else {
                        foundCover = true;
                    }
                } else {
                    exchange.CancelOrder(order.Id);
                    _countCancel++;
                }
            }
            
            if (foundCover) {
                return STATE_NA;
            }
            
            auto positions = exchange.GetPosition();
            if (!positions.Valid) {
                return STATE_NA;
            }

            for (auto &pos : positions) {
                if (pos.ContractType == Symbol) {
                    _holdPrice = pos.Price;
                    _holdAmount = pos.Amount;
                    _holdType = pos.Type;
                    return pos.Type == PD_LONG || pos.Type == PD_LONG_YD ? STATE_HOLD_LONG : STATE_HOLD_SHORT; 
                }
            }
            return STATE_IDLE;
        }

        void stop() {
            Log(exchange.GetOrders());
            Log(exchange.GetPosition());
            Log("Stop");
        }

        bool Loop() {
            if (exchange.IO("status") == 0) {
                LogStatus(_D(), "Server not connect ....");
                Sleep(1000);
                return true;
            }
            if (_initBalance == 0) {
                _initBalance = _C(exchange.GetAccount).Balance;
            }
            auto day = getTradingWeekDay();
            if (day != _tradingDay) {
                _tradingDay = day;
                _countCancel = 0;
            }

            if (_ct.is_null()) {
                Log(_D(), "subscribe", Symbol);
                _ct = exchange.SetContractType(Symbol);
                if (!_ct.is_null()) {
                    auto obj = _ct["Commodity"]["CommodityTickSize"];
                    int volumeMultiple = 1;
                    if (obj.is_null()) { // CTP
                        obj = _ct["PriceTick"];
                        volumeMultiple = _ct["VolumeMultiple"];
                        _exchangeId = _ct["ExchangeID"];
                    } else { // Esunny
                        volumeMultiple = _ct["Commodity"]["ContractSize"];
                        _exchangeId = _ct["Commodity"]["ExchangeNo"];
                    }
                    if (obj.is_null() || obj <= 0) {
                        Panic("PriceTick not found");
                    }
                    if (_priceTick < 1) {
                        exchange.SetPrecision(1, 0);
                    }
                    _priceTick = double(obj);
                    _toleratePrice = _priceTick * TolerateTick;
                    _ins = _ct["InstrumentID"];
                    
                    Log(_ins, _exchangeId, "PriceTick:", _priceTick, "VolumeMultiple:", volumeMultiple);
                }
                Sleep(1000);
                return true;
            }
            // Check orders and positions to set state
            auto depth = exchange.GetDepth();
            if (!depth.Valid) {
                LogStatus(_D(), "Market not ready");
                Sleep(1000);
                return true;
            }
            _countTick++;
            _preBook = _book;
            _book.bidPrice = depth.Bids[0].Price;
            _book.bidAmount = depth.Bids[0].Amount;
            _book.askPrice = depth.Asks[0].Price;
            _book.askAmount = depth.Asks[0].Amount;
            // _book not init
            if (_preBook.bidAmount == 0) {
                return true;
            }
            auto st = getState();
            
            LogStatus(_D(), _ins, "State:", st, 
                      "Ask:", depth.Asks[0].Price, depth.Asks[0].Amount, 
                      "Bid:", depth.Bids[0].Price, depth.Bids[0].Amount,
                      "Cancel:", _countCancel,
                      "Tick:", _countTick);
            
            bool forceCover = _countRetry >= _retryMax;
            if (st == STATE_IDLE) {
                if (_holdAmount > 0) {
                    if (_countRetry > 0) {
                        _countLoss++;
                    } else {
                        _countWin++;
                    }
                    auto account = exchange.GetAccount();
                    if (account.Valid) {
                        LogProfit(_N(account.Balance+account.FrozenBalance-_initBalance, 2), "Win:", _countWin, "Loss:", _countLoss);
                    }
                }
                _countRetry = 0;
                _holdAmount = 0;
                
                if (_countCancel > _cancelMax) {
                    Log("Cancel Exceed", _countCancel);
                    return false;
                }

                bool canDo = false;
                if (abs(_book.bidPrice - _book.askPrice) > _priceTick * 1) {
                    canDo = true;
                }
                if (!canDo) {
                    return true;
                }
                

                auto bidPrice = depth.Bids[0].Price;
                auto askPrice = depth.Asks[0].Price;
                auto bidAmount = 1.0;
                auto askAmount = 1.0;
                
                if (_preBook.bidPrice > _book.bidPrice && _book.askAmount < _book.bidAmount) {
                    bidPrice += _priceTick;
                    bidAmount = 2;
                } else if (_preBook.askPrice < _book.askPrice && _book.bidAmount < _book.askAmount) {
                    askPrice -= _priceTick;
                    askAmount = 2;
                } else {
                    return true;
                }
                Log(_book.bidPrice, _book.bidAmount, _book.askPrice, _book.askAmount);
                exchange.SetDirection("buy");
                exchange.Buy(bidPrice, bidAmount);
                exchange.SetDirection("sell");
                exchange.Sell(askPrice, askAmount);
            } else if (st == STATE_HOLD_LONG) {
                exchange.SetDirection((_holdType == PD_LONG && _exchangeId == "SHFE") ? "closebuy_today" : "closebuy");
                auto sellPrice = depth.Asks[0].Price;
                if (sellPrice > _holdPrice) {
                    Log(_holdPrice, "Hit #ff0000");
                    sellPrice = _holdPrice + ProfitTick;
                } else if (sellPrice < _holdPrice) {
                    forceCover = true;
                }
                if (forceCover) {
                    Log("StopLoss");
                }
                _coverId = exchange.Sell(forceCover ? depth.Bids[0].Price : sellPrice, _holdAmount);
                if (!_coverId.Valid) {
                    return false;
                }
            } else if (st == STATE_HOLD_SHORT) {
                exchange.SetDirection((_holdType == PD_SHORT && _exchangeId == "SHFE") ? "closesell_today" : "closesell");
                auto buyPrice = depth.Bids[0].Price;
                if (buyPrice < _holdPrice) {
                    Log(_holdPrice, "Hit #ff0000");
                    buyPrice = _holdPrice - ProfitTick;
                } else if (buyPrice > _holdPrice) {
                    forceCover = true;
                }
                if (forceCover) {
                    Log("StopLoss");
                }
                _coverId = exchange.Buy(forceCover ? depth.Asks[0].Price : buyPrice, _holdAmount);   
                if (!_coverId.Valid) {
                    return false;
                }
            }
            return true;
        }
    private:
        double _holdPrice = 0;
        double _holdAmount = 0;
        int _holdType;
        int _countTick = 0;
        int _countRetry = 0;
        int _countCancel = 0;
        int _period = 20;
        int _tradingDay = 0;
        double _initBalance;
        const int _retryMax = RetryMax;
        const int _cancelMax = 300;
    
        int _countLoss = 0;
        int _countWin = 0;

        json _ct;
        string _ins;
        string _exchangeId;
        double _priceTick;
        double _toleratePrice;
        Book _book;
        Book _preBook;
        TId _coverId;
};


void main() {
    LogReset();
    SetErrorFilter("ready|timeout");
    Log("Init OK");
    HFT hft;
    while (hft.Loop());
    Log("Exit");
}
```

> 策略出处

https://www.fmz.com/strategy/163427

> 更新时间

2019-08-24 12:23:42
