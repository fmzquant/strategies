/*
策略出处: https://www.botvs.com/strategy/16373
策略名称: 定期定额购买策略
策略作者: wojiushizhemedeshuaiqidemeinanzi
策略描述:

简单的才是最好的
本人BTC死多
本策略适合用小钱长期投入
每两天购买100块钱


参数               默认值  描述
------------  ------  -------
LoopInterval  172800  时间间隔（秒）
Money            100  定期购买金额
*/

//var LoopInterval = 24 * 3600; //定期购买时间 秒
var InitAccount = null; //初始账户信息
var Interval = 60000; //轮询间隔
//var Money = 100; //定额购买的金钱
var TotalMoney = 0; //已用总金额
var Profit = 0; //目前收益

function AdjustFloat(v) {
    return Math.floor(v * 1000) / 1000;
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
            if (j < (orders.length - 1)) {
                Sleep(Interval);
            }
        }
    }
    return ret;
}

function Buy() {
    var STATE_WAIT_IDLE = 0;
    var STATE_WAIT_BUY = 1;
    var State = STATE_WAIT_IDLE;
    var opSuccess = false;
    while (!opSuccess) {
        var Ticker = GetTicker();
        var Price = Ticker.Sell;
        var Amount = AdjustFloat(Money / Price);
        if (State != STATE_WAIT_IDLE) {
            opSuccess = !CancelPendingOrders();
            State = STATE_WAIT_IDLE;
            if (opSuccess) { break; }
        }
        else if (Amount >= exchange.GetMinStock()) {
        exchange.Buy(Price, Amount);
        State = STATE_WAIT_BUY;
        Sleep(Interval);
        }
    }
    return opSuccess;
}

function onTick() {
    Buy();
    TotalMoney = TotalMoney + Money;
    var NowAccount = GetAccount();
    var Ticker = GetTicker();
    Profit = ((NowAccount.Stocks * Ticker.Buy) - TotalMoney);
    LogProfit(AdjustFloat(Profit));
//    LogProfit(AdjustFloat(Profit/TotalMoney));
    Log("Profit: " + AdjustFloat(Profit) + " Percents:" + AdjustFloat(Profit*100/TotalMoney) + "% " + " BTC:" + NowAccount.Stocks + " NowPrice:" + AdjustFloat(Ticker.Buy) + " TotalCost: " + TotalMoney);
}


function main() {
    SetErrorFilter("502:|503:|tcp|character|unexpected|network|timeout|WSARecv|Connect|GetAddr|no such|reset|http|received|EOF|reused");
    InitAccount = GetAccount();
    LoopInterval = Math.max(LoopInterval, 1);
    while (1) {
        onTick();
        Sleep(LoopInterval * 1000);
    }
}
