/*
策略出处: https://www.botvs.com/strategy/143
策略名称: 均线买卖策略
策略作者: Zero
策略描述:

均线买卖策略, 当EMA快线上穿慢线的时候，做多，当EMA中线上穿快线或者达到的止盈/止损的时候，平仓。


参数             默认值  描述
----------  ------  --------
EMA_Fast       7    EMA快线周期
EMA_Mid       12    EMA中线周期
EMA_Slow      30    EMA慢线周期
StopProfit     0.2  止盈点
StopLoss       0.3  止损点
SlidePrice     0.3  下单滑动价(元)
Interval    2000    出错重试(毫秒)
*/


function adjustFloat(v) {
    return Math.floor(v*1000)/1000;
}

function CancelPendingOrders() {
    while (true) {
        var orders = null;
        while (!(orders = exchange.GetOrders())) {
            Sleep(Interval);
        }
    
        if (orders.length == 0) {
            return;
        }
    
        for (var j = 0; j < orders.length; j++) {
            exchange.CancelOrder(orders[j].Id);
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

function GetTicker() {
    var ticker;
    while (!(ticker = exchange.GetTicker())) {
        Sleep(Interval);
    }
    return ticker;
}

var STATE_WAIT_BUY      = 0;
var STATE_WAIT_SELL     = 1;
var STATE_BUY           = 2;
var STATE_SELL          = 3;
var STATE_WAIT_SELL_ALL = 4;

var State = STATE_WAIT_BUY;
var lastRecord = null;
var InitAccount = null;
var LastBuyPrice = 0.0;
var LastHighPrice = 0.0;

function onTick(exchange) {
    var records = exchange.GetRecords();
    if (!records || records.length < (EMA_Slow + 3)) {
        return;
    }
    var newLast = records[records.length-1];
    if ((!lastRecord) || (lastRecord.Time == newLast.Time && lastRecord.Close == newLast.Close)) {
        lastRecord = newLast;
        return;
    }
    lastRecord = newLast;
    
    
    var ticker = GetTicker();

    var emaFast = TA.EMA(records, EMA_Fast);
    var emaSlow = TA.EMA(records, EMA_Slow);
    var emaMid = TA.EMA(records, EMA_Mid);
    
    if (State == STATE_WAIT_BUY && 
        (emaFast[emaFast.length-1] >= emaSlow[emaSlow.length-1]) 
        && (emaFast[emaFast.length-2] < emaSlow[emaSlow.length-2])
        && (emaFast[emaFast.length-1] > emaMid[emaSlow.length-1])) {
        State = STATE_BUY;
    } else if (State == STATE_WAIT_SELL) {
        var ratioStopLoss = Math.abs((LastHighPrice - ticker.Last) / LastHighPrice) * 100;
        var ratioStopProfit = Math.abs((ticker.Last - LastBuyPrice) / LastBuyPrice) * 100;
        
        if (emaFast[emaFast.length-1] < emaMid[emaFast.length-1]) {
            State = STATE_SELL;
            Log("EMA 快线下穿中线", "Fast:", adjustFloat(emaFast[emaFast.length-1]), "Mid", adjustFloat(emaMid[emaFast.length-1]));
        } else if (ticker.Last < LastHighPrice && ratioStopLoss >= StopLoss) {
            State = STATE_SELL;
            Log("开始止损, 当前下跌点数:", adjustFloat(ratioStopLoss), "当前价格", ticker.Last, "对比价格", adjustFloat(LastHighPrice));
        } else if (ticker.Last > LastBuyPrice && ratioStopProfit >= StopProfit) {
            State = STATE_SELL;
            Log("开始止赢, 当前上涨点数:", adjustFloat(ratioStopProfit), "当前价格", ticker.Last, "对比价格", adjustFloat(LastBuyPrice));
        }
        LastHighPrice = Math.max(LastHighPrice, ticker.Last);
    }
    
    if (State != STATE_BUY && State != STATE_SELL && State != STATE_WAIT_SELL_ALL) {
        return;
    }

    // Buy or Sell, Cancel pending orders first
    CancelPendingOrders();

    var account = GetAccount();
    
    if (State == STATE_BUY) {
        var price = ticker.Last + SlidePrice;
        var amount = adjustFloat(account.Balance / price);
        if (amount >= exchange.GetMinStock()) {
            if (exchange.Buy(price, amount)) {
                State = STATE_WAIT_SELL;
                LastBuyPrice = LastHighPrice = price;
            }
        }
    } else {
        var sellAmount = account.Stocks - InitAccount.Stocks;
        if (sellAmount > exchange.GetMinStock()) {
            // STATE_WAIT_SELL or STATE_WAIT_SELL_ALL
            State = STATE_WAIT_SELL_ALL;
            exchange.Sell(ticker.Last - SlidePrice, sellAmount);
        } else {
            // No stocks, wait buy and log profit
            LogProfit(account.Balance - InitAccount.Balance);
            Log(account);
            State = STATE_WAIT_BUY;
        }
    }
}

function main() {
    InitAccount = GetAccount();
    Log(exchange.GetName(), exchange.GetCurrency(), InitAccount);
    while (true) {
        onTick(exchange);
        Sleep(10000);
    }
}
