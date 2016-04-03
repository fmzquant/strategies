/*
策略出处: https://www.botvs.com/strategy/345
策略名称: 单平台均衡策略
策略作者: Zero
策略描述:

这个需要建仓，比如账户有5000块钱，跟1个币，如果币的价值大于账户的余额5000了并且差价超过阀值，比如币现在值6000块钱，就卖掉(6000-5000)/6000/2个币，说明币升值了，把钱兑换回来，如果币贬值了，比如4000块钱了，就买入(5000-4000)/4000/2个币, 币跌的时候买一些回来，如果再涨了，就再卖掉，好像天平一样，两边不同的对冲，所以我命名为均衡策略


参数              默认值  描述
------------  -----  ----------
threshold        10  阀值
Interval       2000  出错重试间隔(毫秒)
LoopInterval     60  轮询间隔(秒)
*/

function adjustFloat(v) {
    return Math.floor(v*1000)/1000;
}

function GetTicker() {
    var ticker;
    while (!(ticker = exchange.GetTicker())) {
        Sleep(Interval);
    }
    return ticker;
}

function GetAccount() {
    var account;
    while (!(account = exchange.GetAccount())) {
        Sleep(Interval);
    }
    return account;
}

function CancelPendingOrders() {
    var ret = false;
    while (true) {
        var orders = null;
        while (!(orders = exchange.GetOrders())) {
            Sleep(Interval);
        }

        if (orders.length == 0) {
            return ret;
        }

        for (var j = 0; j < orders.length; j++) {
            exchange.CancelOrder(orders[j].Id);
            ret = true;
            if (j < (orders.length-1)) {
                Sleep(Interval);
            }
        }
    }
    return ret;
}

function updateProft(accountInit, accountNow, ticker) {
    LogProfit(accountNow.Balance + accountNow.FrozenBalance + ((accountNow.Stocks + accountNow.FrozenStocks - accountInit.Stocks - accountInit.FrozenStocks) * ticker.Buy) - accountInit.Balance - accountInit.FrozenBalance);
}

var STATE_WAIT_IDLE = 0;
var STATE_WAIT_BUY  = 1;
var STATE_WAIT_SELL = 2;

var State = STATE_WAIT_IDLE;
var InitAccount = null;

function onTick() {
    var opSuccess = false;
    if (State != STATE_WAIT_IDLE) {
        opSuccess = !CancelPendingOrders();
        State = STATE_WAIT_IDLE;
    }
    
    var portfolio = GetAccount();
    var ticker = GetTicker();
    
    if (opSuccess) {
        updateProft(InitAccount, portfolio, ticker);
    }
    
    var diff = portfolio.Balance - (portfolio.Stocks * ticker.Sell);
    
    if (diff > threshold) {
        var amount = adjustFloat(diff / 2 / ticker.Buy);
        if (amount < exchange.GetMinStock()) {
            return;
        }
        exchange.Buy(ticker.Buy, amount);
        State = STATE_WAIT_BUY;
    } else if (diff <= -threshold) {
        var amount = adjustFloat(Math.abs(diff) / 2 / ticker.Sell);
        if (amount < exchange.GetMinStock()) {
            return;
        }
        exchange.Sell(ticker.Sell, amount);
        State = STATE_WAIT_SELL;
    }
}

function main() {
    InitAccount = GetAccount();
    LoopInterval = Math.max(LoopInterval, 1);
    while (1) {
        onTick();
        Sleep(LoopInterval * 1000);
    }
}
