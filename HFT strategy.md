
> 策略名称

HFT strategy

> 策略作者

Hukybo

> 策略描述

策略回测什么才是最重要的？速度？花里胡哨的绩效指标？答案是准确！是的，回测的目的是为了验证策略的逻辑和可行性。这也是回测本身的意义，其他都是次要的。一个能够真正反映策略在历史数据上的回测才具有参考价值，那些看似完美的回测曲线讲故事可以，实盘它不行。
[点击阅读更多内容](https://www.fmz.com/bbs-topic/4195)

> 策略参数



|参数|默认值|描述|
|----|----|----|
|Symbol|MA909|品种|
|RetryMax|3|重试最多|
|ProfitTick|5|利润调数|


> 源码 (cpp)

``` cpp
/*backtest
start: 2019-07-12 09:00:00
end: 2019-07-12 15:00:00
period: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
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
        State getState() {
            auto orders = exchange.GetOrders();
            if (!orders.Valid || orders.size() == 2) {
                return STATE_NA;
            }
            
            bool foundCover = false;
            for (auto &order : orders) {
                if (order.Id == _coverId) {
                    if ((order.Type == ORDER_TYPE_BUY && order.Price < _book.bidPrice - _slidePrice) ||
                        (order.Type == ORDER_TYPE_SELL && order.Price > _book.askPrice + _slidePrice)) {
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

            if (_ct.is_null()) {
                Log(_D(), "subscribe", Symbol);
                _ct = exchange.SetContractType(Symbol);
                if (!_ct.is_null()) {
                    auto obj = _ct["Commodity"]["CommodityTickSize"];
                    int volumeMultiple = 1;
                    if (obj.is_null()) {
                        obj = _ct["PriceTick"];
                        volumeMultiple = _ct["VolumeMultiple"];
                        _exchangeId = _ct["ExchangeID"];
                    } else {
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
                    _slidePrice = _priceTick * ProfitTick;
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
            // _book not init
            if (_book.bidAmount == 0) {
                return true;
            }
            _preBook = _book;
            _book.bidPrice = depth.Bids[0].Price;
            _book.bidAmount = depth.Bids[0].Amount;
            _book.askPrice = depth.Asks[0].Price;
            _book.askAmount = depth.Asks[0].Amount;
 
            double weight = depth.Asks[0].Price + depth.Bids[0].Price;
            _priceHis.push_back(weight);
            if (_priceHis.size() > 100) {
                _priceHis.erase(_priceHis.begin());
            }

            auto st = getState();
            
            LogStatus(_D(), _ins, "State:", st, 
                      "Ask:", depth.Asks[0].Price, depth.Asks[0].Amount, 
                      "Bid:", depth.Bids[0].Price, depth.Bids[0].Amount,
                      "Cancel:", _countCancel,
                      "Tick:", _countTick);
            Log(depth.Asks[0], depth.Bids[0]);
            
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
                        LogProfit(_N(account.Balance+account.FrozenBalance, 2), "Win:", _countWin, "Loss:", _countLoss);
                    }
                }
                _countRetry = 0;
                _holdAmount = 0;
                
                if (_countCancel > _cancelMax) {
                    Log("Cancel Exceed", _countCancel);
                    return false;
                }
                if (IsVirtual()) {
                    if (_priceHis.size() < _period) {
                        LogStatus("calc history", _priceHis.size());
                        return true;
                    }
                    auto arr = talib.STDDEV(_priceHis, _period);
                    double diff = abs(weight - _priceHis[_priceHis.size() - 2]);
                    if (diff < arr[arr.size()-1]) {
                        return true;
                    }
                } else {
                    bool canDo = false;
                    if (_book.bidPrice == _preBook.bidPrice && _book.bidAmount > 50 && abs(_preBook.bidAmount-_book.bidAmount) > 50) {
                        canDo = true;
                        Log("Bid Amount", _preBook.bidAmount, "->", _book.bidAmount);
                    }
                    if (_book.askPrice == _preBook.askPrice && _book.askAmount > 50 && abs(_preBook.askAmount-_book.askAmount) > 50) {
                        canDo = true;
                        Log("Ask Amount", _preBook.askAmount, "->", _book.askAmount);
                    }
                    if (!canDo) {
                        return true;
                    }
                }
                exchange.SetDirection("buy");
                exchange.Buy(depth.Bids[0].Price, 1);
                exchange.SetDirection("sell");
                exchange.Sell(depth.Asks[0].Price, 1);
            } else if (st == STATE_HOLD_LONG) {
                
                exchange.SetDirection((_holdType == PD_LONG && _exchangeId == "SHFE") ? "closebuy_today" : "closebuy");
                auto sellPrice = depth.Asks[0].Price;
                if (sellPrice > _holdPrice) {
                    Log(_holdPrice, "Hit #ff0000");
                    //sellPrice = depth.Asks[0].Price + _slidePrice;
                } else if (sellPrice < _holdPrice) {
                    //forceCover = true;
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
                } else if (buyPrice > _holdPrice) {
                    //forceCover = true;
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
        const int _retryMax = RetryMax;
        const int _cancelMax = 300;
    
        int _countLoss = 0;
        int _countWin = 0;

        json _ct;
        string _ins;
        string _exchangeId;
        double _priceTick;
        double _slidePrice;
        vector<double> _priceHis;
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

https://www.fmz.com/strategy/162372

> 更新时间

2019-08-23 16:05:13
