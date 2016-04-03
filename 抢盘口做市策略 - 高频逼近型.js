/*
策略出处: https://www.botvs.com/strategy/348
策略名称: 抢盘口做市策略 - 高频逼近型
策略作者: Zero
策略描述:

抢盘口做市策略, 最基础的做市策略，买一卖一抢单抢盘口, 赚买一卖一的差价. 
比如现在卖1是60买1是70, 此策略会以65为中界，65以下布满买单，65以上布满卖单, 因为需要不停的调整订单布局，暂起名为高频逼近型
注意: 模拟测试GetTicker的买一卖一固定差价为1.6, 实际效果需要实盘测试


参数            默认值    描述
------------  -----  ----------
Interval      2000   出错重试间隔(毫秒)
LoopInterval  60     轮询间隔(秒)
Step          0.1    网格间隔(元)
Lot           0.05   手数
MaxNets       20     最大网格数
DisableLog    false  关闭订单跟踪
*/

function adjustFloat(v) {
    return Math.floor(v*100)/100;
}

function GetOrders() {
    var orders = null;
    while (!(orders = exchange.GetOrders())) {
        Sleep(Interval);
    }
    return orders;
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
    LogProfit(adjustFloat(netNow - netInit));
}

var InitAccount = null;
var LastOrdersLength = null;

function onTick() {
    var ticker = GetTicker();
    var account = GetAccount();
    var orders = GetOrders();
    if (LastOrdersLength != null && LastOrdersLength != orders.length) {
        updateProfit(InitAccount, account, ticker);
    }
    LastOrdersLength = orders.length;
    
    var mid = adjustFloat(ticker.Buy + ((ticker.Sell - ticker.Buy) / 2));
    var numBuy = parseInt(Math.min(MaxNets / 2 , (mid - ticker.Buy) / Step, account.Balance / ticker.Buy / Lot));
    var numSell = parseInt(Math.min(MaxNets / 2, account.Stocks / Lot));
    var num = Math.max(numBuy, numSell);
    var ordersKeep = [];
    var queue = [];
    for (var i = 1; i < num; i++) {
        var buyPrice = adjustFloat(mid - (i * Step));
        var sellPrice = adjustFloat(mid + (i * Step));
        var alreadyBuy = false;
        var alreadySell = false;
        for (j = 0; j < orders.length; j++) {
            if (orders[j].Type == ORDER_TYPE_BUY) {
                if (Math.abs(orders[j].Price - buyPrice) < (Step / 2)) {
                    alreadyBuy = true;
                    ordersKeep.push(orders[j].Id);
                }
            } else {
                if (Math.abs(orders[j].Price - sellPrice) < (Step / 2)) {
                    alreadySell = true;
                    ordersKeep.push(orders[j].Id);
                }
            }
        }
        if ((!alreadyBuy) && (i < numBuy)) {
            queue.push([buyPrice, ORDER_TYPE_BUY]);
        }
        if ((!alreadySell) && (i < numSell)) {
            queue.push([sellPrice, ORDER_TYPE_SELL]);
        }
    }

    for (var i = 0; i < orders.length; i++) {
        var keep = false;
        for (var j = 0; j < ordersKeep.length; j++) {
            if (orders[i].Id == ordersKeep[j]) {
                keep = true;
            }
        }
        if (!keep) {
            exchange.CancelOrder(orders[i].Id);
            LastOrdersLength--;
        }
    }

    for (var i = 0; i < queue.length; i++) {
        if (queue[i][1] == ORDER_TYPE_BUY) {
            exchange.Buy(queue[i][0], Lot);
        } else {
            exchange.Sell(queue[i][0], Lot);
        }
        LastOrdersLength++;
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
