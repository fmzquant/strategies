/*
策略出处: https://www.botvs.com/strategy/241
策略名称: 冰山委托 - 卖出
策略作者: Zero
策略描述:

冰山委托指的是投资者在进行大额交易时，为避免对市场造成过大冲击，将大单委托自动拆为多笔委托，根据当前的最新买一/卖一价格和客户设定的价格策略自动进行小单委托，在上一笔委托被全部成交或最新价格明显偏离当前委托价时，自动重新进行委托。
例子:
如果单次均值浮动点数设置为10那么:
每一笔委托的数量为其单次委托平均值的90%~110%，委托价格为最新卖1价*（1+委托深度），在上一笔委托全部成交后再进行新的一笔委托，在最新成交价格距离该笔委托超过委托深度*2时自动撤单并重新进行委托。在策略总成交量等于其总委托数量时停止委托。当市场的最新成交价格低于其最低卖出价格时停止委托，在最新成交价格重新高于最低卖出价后恢复委托。


参数                  默认值  描述
---------------  ------  -------------
TotalSellStocks    10    卖出总数量(币)
AvgSellOnce         0.3  单次卖出数量均值(币)
FloatPoint         10    单次均值浮动点数(百分比)
EntrustDepth        0.1  委托深度(百分比)
MinSellPrice     3800    最低卖出价格(元)
Interval         1000    失败重试(毫秒)
LoopInterval      300    价格轮询间隔(毫秒)
*/

function adjustFloat(v, precision) {
    if (typeof(precision) != 'number') {
        precision = 4;
    }
    var s = v.toString().split(".");
    if (s.length < 2 || s[1].length <= precision) {
        return v;
    }
    var b = Math.pow(10, precision);
    return Math.floor(parseFloat(v.toFixed(Math.min(20, precision+10)))*b)/b;
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
            exchange.CancelOrder(orders[j].Id);
            if (j < (orders.length-1)) {
                Sleep(Interval);
            }
        }
    }
}

var LastSellPrice = 0;
var InitAccount = null;

function dispatch() {
    var account = null;
    var ticker = GetTicker();
    // 在最新成交价格距离该笔委托超过委托深度*2时自动撤单并重新进行委托
    if (LastSellPrice > 0) {
        // 订单没有完成
        if (GetOrders().length > 0) {
            if (ticker.Last < LastSellPrice && ((LastSellPrice - ticker.Last) / ticker.Last) > (2*(EntrustDepth/100))) {
                Log('偏离过多, 最新成交价:', ticker.Last, '委托价', LastSellPrice);
                CancelPendingOrders();
            } else {
                return true;
            }
        } else {
            account = GetAccount();
            Log("卖单完成, 累计卖出:", adjustFloat(InitAccount.Stocks - account.Stocks), "平均卖出价:", adjustFloat((account.Balance - InitAccount.Balance) / (InitAccount.Stocks - account.Stocks))); }
            LastSellPrice = 0;
    }

    // 委托价格为最新卖1价*（1+委托深度）
    var SellPrice = adjustFloat(ticker.Sell * (1 + EntrustDepth/100));
    if (SellPrice < MinSellPrice) {
        return true;
    }

    if (!account) {
        account = GetAccount();
    }


    if ((InitAccount.Stocks - account.Stocks) >= TotalSellStocks) {
        return false;
    }

    var RandomAvgSellOnce = (AvgSellOnce * ((100 - FloatPoint) / 100)) + (((FloatPoint * 2) / 100) * AvgSellOnce * Math.random());
    var SellAmount = Math.min(TotalSellStocks - (InitAccount.Stocks - account.Stocks), RandomAvgSellOnce);
    if (SellAmount < exchange.GetMinStock()) {
        return false;
    }
    LastSellPrice = SellPrice;
    exchange.Sell(SellPrice, SellAmount, '上次成交价', ticker.Last);
    return true;
}

function main() {
    CancelPendingOrders();
    InitAccount = GetAccount();
    Log(InitAccount);
    if (InitAccount.Stocks < TotalSellStocks) {
        throw "账户币数不足";
    }
    LoopInterval = Math.max(LoopInterval, 1);
    while (dispatch()) {
        Sleep(LoopInterval);
    }
    Log("委托全部完成", GetAccount());
}

