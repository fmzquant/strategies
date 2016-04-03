/*
策略出处: https://www.botvs.com/strategy/275
策略名称: 套利软件(差价套利)
策略作者: Zero
策略描述:

主交易所参考其它交易所价格, 判断当前价格的走向, 所以策略需要添加两个交易所


参数                   默认值    描述
-------------------  -----  ----------
Interval             2000   出错重试间隔(毫秒)
SlidePrice           0.3    滑动价(元)
StopLoss             0.8    止损点
StopProfitThreshold  0.9    止盈系数(0-1)
EnableGoingShort     true   允许做空
LoopInterval         true   轮询间隔(秒)
PriceDiff            5      套利差价
AmountOnce           0.2    单笔交易数量
*/


function adjustFloat(v) {
    return Math.floor(v*1000)/1000;
}

function GetOrders() {
    var orders = null;
    while (!(orders = exchange.GetOrders())) {
        Sleep(Interval);
    }
    return orders;
}

function CancelPendingOrders() {
    while (true) {
        var orders = GetOrders();
        if (orders.length == 0) {
            return;
        }

        for (var j = 0; j < orders.length; j++) {
            exchange.CancelOrder(orders[j].Id, orders[j]);
            if (j < (orders.length-1)) {
                Sleep(Interval);
            }
        }
    }
}

function GetAccount() {
    var account;
    while (!(account = exchange.GetAccount())) {
        Sleep(Interval);
    }
    return account;
}

function GetTicker(e) {
    if (typeof(e) == 'undefined') {
        e = exchange;
    }
    var ticker;
    while (!(ticker = e.GetTicker())) {
        Sleep(Interval);
    }
    return ticker;
}

function updateProft(accountInit, accountNow, ticker) {
    var netNow = accountNow.Balance + accountNow.FrozenBalance + ((accountNow.Stocks + accountNow.FrozenStocks) * ticker.Buy);
    var netInit = accountInit.Balance + accountInit.FrozenBalance + ((accountInit.Stocks + accountInit.FrozenStocks) * ticker.Buy);
    LogProfit(netNow - netInit);
}

var STATE_WAIT_IDLE     = 0;
var STATE_WAIT_BUY      = 1;
var STATE_WAIT_SELL     = 2;
var STATE_BUY           = 3;
var STATE_SELL          = 4;

var State = STATE_WAIT_IDLE;
var InitAccount = null;
var LastBuyPrice = 0;
var LastSellPrice = 0;
var LastHighPrice = 0;
var LastLowPrice = 0;
var LastRecord = null;
var Goingshort = false;

function onTick(exchange) {
    var oldState = State;
    var ticker = GetTicker();
    
    if (State == STATE_WAIT_IDLE) {
        var tickerOther = GetTicker(exchanges[1]);
        // 价格被低估
        if ((tickerOther.Buy - ticker.Sell) > PriceDiff) {
            Goingshort = false;
            State = STATE_BUY;
            Log('开始做多, 价差:', adjustFloat(tickerOther.Buy - ticker.Sell));
        } else if ((ticker.Buy - tickerOther.Sell) > PriceDiff) {
            Goingshort = true;
            State = STATE_SELL;
            Log('开始做空, 价差:', adjustFloat(ticker.Buy - tickerOther.Sell));
        } else {
            return;
        }
    }
    
    // 重新设置这两个参数
    if (oldState == STATE_WAIT_IDLE && State != STATE_WAIT_IDLE) {
        LastLowPrice = ticker.Last;
        LastHighPrice = ticker.Last;
    }

    // 做多
    if (!Goingshort) {
        if (State == STATE_WAIT_SELL) {
            var ratioStopLoss = Math.abs((LastHighPrice - ticker.Last) / LastHighPrice) * 100;
            var ratioStopProfit = Math.abs((ticker.Last - LastBuyPrice) / LastBuyPrice) * 100;
            var ratioMaxUp = Math.abs((LastHighPrice - LastBuyPrice) / LastBuyPrice) * 100;
            if (ticker.Last < LastBuyPrice && ratioStopLoss >= StopLoss) {
                State = STATE_SELL;
                Log("开始止损, 当前下跌点数:", adjustFloat(ratioStopLoss), "当前价格", ticker.Last, "对比价格", adjustFloat(LastHighPrice));
            } else if (ticker.Last > LastBuyPrice && ticker.Last < LastHighPrice && ratioStopProfit <= (ratioMaxUp*StopProfitThreshold)) {
                State = STATE_SELL;
                Log("开始止赢, 当前上涨点数:", adjustFloat(ratioStopProfit), "当前价格", ticker.Last, "对比价格", adjustFloat(LastBuyPrice));
            }
            LastHighPrice = Math.max(LastHighPrice, ticker.Last);
        }
    } else {
        if (State == STATE_WAIT_BUY) {
            var ratioStopLoss = Math.abs((ticker.Last - LastLowPrice) / LastLowPrice) * 100;
            var ratioStopProfit = Math.abs((LastSellPrice - ticker.Last) / LastSellPrice) * 100;
            var ratioMaxDown = Math.abs((LastSellPrice - LastLowPrice) / LastSellPrice) * 100;
            if (ticker.Last > LastSellPrice && ratioStopLoss >= StopLoss) {
                State = STATE_BUY;
                Log("开始止损, 当前上涨点数:", adjustFloat(ratioStopLoss), "当前价格", ticker.Last, "对比价格", adjustFloat(LastSellPrice));
            } else if (ticker.Last < LastSellPrice && ticker.Last > LastLowPrice && ratioStopProfit <= (ratioMaxDown*StopProfitThreshold)) {
                State = STATE_BUY;
                Log("开始止盈, 当前下跌点数:", adjustFloat(ratioStopProfit), "当前价格", ticker.Last, "对比价格", adjustFloat(LastLowPrice));
            }
            LastHighPrice = Math.max(LastHighPrice, ticker.Last);
            LastLowPrice = Math.min(LastLowPrice, ticker.Last);
        }

    }

    if (State != STATE_BUY && State != STATE_SELL) {
        return;
    }
    var orders = GetOrders();
    if (orders.length > 0) {
        if (((State == STATE_BUY) && (LastBuyPrice >= (ticker.Buy-SlidePrice))) || ((State == STATE_SELL) && (LastSellPrice <= (ticker.Sell-SlidePrice)))) {
            return;
        }
    }
    // Buy or Sell, Cancel pending orders first
    CancelPendingOrders();
    // Wait Ticker Update
    Sleep(3000);
    var account = GetAccount();
    // Update Ticker
    ticker = GetTicker();

    // 做多
    if (!Goingshort) {
        if (State == STATE_BUY) {
            var tickerOther = GetTicker(exchanges[1]);
            // 价差消失
            if ((tickerOther.Buy - ticker.Sell) < (PriceDiff/2)) {
                Log('做多价差消失:', adjustFloat(tickerOther.Buy - ticker.Sell));
                if ((account.Stocks - InitAccount.Stocks) > exchange.GetMinStock()) {
                    State = STATE_WAIT_SELL;
                } else {
                    State = STATE_WAIT_IDLE;
                }
                return;
            }
            var price = ticker.Buy + SlidePrice;
            var amount = adjustFloat(Math.min(AmountOnce, account.Balance / price));
            if (amount >= exchange.GetMinStock()) {
                if (exchange.Buy(price, amount)) {
                    LastBuyPrice = LastHighPrice = price;
                }
            } else {
                State = STATE_WAIT_SELL;
            }
        } else {
            var sellAmount = Math.min(AmountOnce, account.Stocks - InitAccount.Stocks);
            if (sellAmount > exchange.GetMinStock()) {
                exchange.Sell(ticker.Sell - SlidePrice, sellAmount);
                LastSellPrice = price;
            } else {
                // No stocks, wait buy and log profit
                updateProft(account, InitAccount, ticker);
                State = STATE_WAIT_IDLE;
            }
        }
    } else {
        if (State == STATE_BUY) {
            var price = ticker.Buy + SlidePrice;
            var amount = adjustFloat(Math.min(AmountOnce, account.Balance / price, InitAccount.Stocks - account.Stocks));
            if (amount >= exchange.GetMinStock()) {
                exchange.Buy(price, amount);
                LastBuyPrice = price;
            } else {
                updateProft(account, InitAccount, ticker);
                State = STATE_WAIT_IDLE;
            }
        } else {
            var tickerOther = GetTicker(exchanges[1]);
            // 价差消失
            if ((ticker.Buy - tickerOther.Sell) < (PriceDiff/2)) {
                Log('做空价差消失:', adjustFloat(ticker.Buy - tickerOther.Sell));
                if ((InitAccount.Stocks - account.Stocks) > exchange.GetMinStock()) {
                    State = STATE_WAIT_BUY;
                } else {
                    State = STATE_WAIT_IDLE;
                }
                return;
            }
            var price = ticker.Sell - SlidePrice;
            var sellAmount = Math.min(AmountOnce, account.Stocks);
            if (sellAmount > exchange.GetMinStock()) {
                exchange.Sell(price, sellAmount, "做空");
                LastSellPrice = LastLowPrice = price;
            } else {
                // No stocks, wait buy and log profit
                State = STATE_WAIT_BUY;
            }
        }
    }
}

function main() {
    if (exchanges.length < 2) {
        throw '最少提供一个参考平台';
    }
    InitAccount = GetAccount();
    LoopInterval = Math.min(1, LoopInterval);
    Log('交易平台:', exchange.GetName(), GetAccount());
    Log('参考平台:', exchanges[1].GetName());
    
    EnableGoingShort = EnableGoingShort && (InitAccount.Stocks > exchange.GetMinStock());
    LoopInterval = Math.max(LoopInterval, 1);
    while (true) {
        onTick(exchange);
        Sleep(LoopInterval*1000);
    }
}
