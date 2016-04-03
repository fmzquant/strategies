/*
策略出处: https://www.botvs.com/strategy/358
策略名称: 高频交易策略之 - Penny Jump
策略作者: Zero
策略描述:

Penny jump, 请自行百度


参数            默认值    描述
------------  -----  ----------
Interval      2000   出错重试间隔(毫秒)
LoopInterval  true   轮询间隔(秒)
SlidePrice    0.1    滑点
Lot           0.2    手数
DisableLog    false  关闭订单跟踪
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

function CancelPendingOrders(orderType) {
    while (true) {
        var orders = GetOrders();
        var count = 0;
        if (typeof(orderType) != 'undefined') {
            for (var i = 0; i < orders.length; i++) {
                if (orders[i].Type == orderType) {
                    count++;
                }
            }
        } else {
            count = orders.length;
        }
        if (count == 0) {
            return;
        }

        for (var j = 0; j < orders.length; j++) {
            if (typeof(orderType) == 'undefined' || (orderType == orders[j].Type)) {
                exchange.CancelOrder(orders[j].Id, orders[j]);
                if (j < (orders.length-1)) {
                    Sleep(Interval);
                }
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

function updateProfit(accountInit, accountNow, ticker) {
    var netNow = accountNow.Balance + accountNow.FrozenBalance + ((accountNow.Stocks + accountNow.FrozenStocks) * ticker.Buy);
    var netInit = accountInit.Balance + accountInit.FrozenBalance + ((accountInit.Stocks + accountInit.FrozenStocks) * ticker.Buy);
    LogProfit(adjustFloat(netNow - netInit), accountNow);
}

var InitAccount = null;

function onTick() {
    var ticker = GetTicker();
    var dealAmount = 0;
    for (var i = 0; i < 10; i++) {
        var account = GetAccount();
        dealAmount = adjustFloat(account.Stocks - InitAccount.Stocks);
        if (dealAmount >= exchange.GetMinStock()) {
            break;
        }
        var buyPrice = ticker.Buy + SlidePrice;
        var amountBuy = Math.min(adjustFloat(account.Balance / buyPrice), Lot);
        if (amountBuy < exchange.GetMinStock()) {
            throw "没有钱买币了...";
        }
        exchange.Buy(buyPrice, amountBuy);
        Sleep(1000);
        CancelPendingOrders();
    }
    
    if (dealAmount < exchange.GetMinStock()) {
        return;
    }
    
    var update = false;
    var count = 0;
    while (true) {
        var sellAmount = adjustFloat(GetAccount().Stocks - InitAccount.Stocks);
        if (sellAmount < exchange.GetMinStock()) {
            break;
        }
        exchange.Sell(ticker.Buy + (2 * SlidePrice), sellAmount);
        update = true;
        if (count == 0) {
            Sleep(10000);
        } else {
            Sleep(1000);
        }
        CancelPendingOrders();
        ticker = GetTicker();
        count++;
    }
    
    if (update) {
        updateProfit(InitAccount, GetAccount(), GetTicker());
    }
}

function main() {
    if (DisableLog) {
        EnableLog(false);
    }
    InitAccount = GetAccount();
    Log(InitAccount);
    LoopInterval = Math.max(LoopInterval, 1);
    Lot = Math.max(exchange.GetMinStock(), Lot);
    while (true) {
        onTick();
        Sleep(LoopInterval * 1000);
    }
}
