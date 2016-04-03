/*
策略出处: https://www.botvs.com/strategy/304
策略名称: 抢盘口做市策略 - 对敲
策略作者: Zero
策略描述:

抢盘口做市策略, 最基础的做市策略，买一卖一抢单抢盘口, 赚买一卖一的差价.


参数            默认值    描述
------------  -----  ----------
Interval      2000   出错重试间隔(毫秒)
LoopInterval  true   轮询间隔(秒)
SlidePrice    0.01   滑点
MaxDiff       0.8    盘口最小差价
Lot           0.2    手数
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
    LogProfit(netNow - netInit);
}

var InitAccount = null;
var LastBuyPrice = 0;
var LastSellPrice = 0;

function onTick() {
    var ticker = GetTicker();
    var BuyPrice = ticker.Buy + SlidePrice;
    var SellPrice = ticker.Sell - SlidePrice;

    // 利润消失
    if ((SellPrice - BuyPrice) <= MaxDiff) {
        CancelPendingOrders();
        return;
    }
  
    var cancelType = null;
    
    if (LastBuyPrice > 0 && (ticker.Buy - LastBuyPrice) > SlidePrice) {
        cancelType = ORDER_TYPE_BUY;
    }
    
    if (LastSellPrice > 0 && (LastSellPrice - ticker.Sell) > SlidePrice) {
        if (cancelType == null) {
            cancelType = ORDER_TYPE_SELL;
        } else {
            cancelType = -1;
        }
    }
    
    if (cancelType == -1) {
        CancelPendingOrders();
    } else if (cancelType != null) {
        CancelPendingOrders(cancelType);
    }

    var orders = GetOrders();
    if (orders.length == 2) {
        return;
    }
    var account = GetAccount();
    var amountBuy = Math.min(adjustFloat(account.Balance / BuyPrice), Lot);
    var amountSell = Math.min(account.Stocks, Lot);

    if (amountBuy >= exchange.GetMinStock()) {
        if (orders.length == 0 || orders[0].Type == ORDER_TYPE_SELL) {
            if (orders.length > 0) {
                updateProfit(InitAccount, account, ticker);
            }
            exchange.Buy(BuyPrice, amountBuy);
            LastBuyPrice = BuyPrice;
        }
    }
    if (amountSell >= exchange.GetMinStock()) {
        if (orders.length == 0 || orders[0].Type == ORDER_TYPE_BUY) {
            if (orders.length > 0) {
                updateProfit(InitAccount, account, ticker);
            }
            exchange.Sell(SellPrice, amountSell);
            LastSellPrice = SellPrice;
        }
    }
}

function onexit() {
    CancelPendingOrders();
}

function main() {
    InitAccount = GetAccount();
    Log(InitAccount);
    SetErrorFilter("502:|503:|unexpected|network|timeout|WSARecv|Connect|GetAddr|no such|reset|received|EOF");
    exchange.SetRate(1);
    LoopInterval = Math.max(LoopInterval, 1);
    Lot = Math.max(exchange.GetMinStock(), Lot);
    while (true) {
        onTick();
        Sleep(LoopInterval * 1000);
    }
}
