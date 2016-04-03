/*
策略出处: https://www.botvs.com/strategy/236
策略名称: 冰山委托 - 买入
策略作者: Zero
策略描述:

冰山委托指的是投资者在进行大额交易时，为避免对市场造成过大冲击，将大单委托自动拆为多笔委托，根据当前的最新买一/卖一价格和客户设定的价格策略自动进行小单委托，在上一笔委托被全部成交或最新价格明显偏离当前委托价时，自动重新进行委托。
例子:
如果单次均值浮动点数设置为10那么:
每一笔委托的数量为其单次委托平均值的90%~110%，委托价格为最新买1价*（1-委托深度），在上一笔委托全部成交后再进行新的一笔委托，在最新成交价格距离该笔委托超过委托深度*2时自动撤单并重新进行委托。在策略总成交量等于其总委托数量时停止委托。当市场的最新成交价格高于其最高买入价格时停止委托，在最新成交价格重新低于最高买入价后恢复委托。


参数            默认值    描述
------------  -----  -------------
TotalBuyCNY   10000  购买总金额(元)
AvgBuyOnce    100    单次购买数量均值(元)
FloatPoint    10     单次均值浮动点数(百分比)
EntrustDepth  0.1    委托深度(百分比)
MaxBuyPrice   4000   最高买入价格(元)
Interval      1000   失败重试(毫秒)
LoopInterval  true   价格轮询间隔(秒)
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

var LastBuyPrice = 0;
var InitAccount = null;

function dispatch() {
    var account = null;
    var ticker = GetTicker();
    // 在最新成交价格距离该笔委托超过委托深度*2时自动撤单并重新进行委托
    if (LastBuyPrice > 0) {
        // 订单没有完成
        if (GetOrders().length > 0) {
            if (ticker.Last > LastBuyPrice && ((ticker.Last - LastBuyPrice) / LastBuyPrice) > (2*(EntrustDepth/100))) {
                Log('偏离过多, 最新成交价:', ticker.Last, '委托价', LastBuyPrice);
                CancelPendingOrders();
            } else {
                return true;
            }
        } else {
            account = GetAccount();
            Log("买单完成, 累计花费:", adjustFloat(InitAccount.Balance - account.Balance), "平均买入价:", adjustFloat((InitAccount.Balance - account.Balance) / (account.Stocks - InitAccount.Stocks)));
        }
        LastBuyPrice = 0;
    }
    
    // 委托价格为最新买1价*（1-委托深度）
    var BuyPrice = adjustFloat(ticker.Buy * (1 - EntrustDepth/100));
    if (BuyPrice > MaxBuyPrice) {
        return true;
    }
    
    if (!account) {
        account = GetAccount();
    }


    if ((InitAccount.Balance - account.Balance) >= TotalBuyCNY) {
        return false;
    }
    
    var RandomAvgBuyOnce = (AvgBuyOnce * ((100 - FloatPoint) / 100)) + (((FloatPoint * 2) / 100) * AvgBuyOnce * Math.random());
    var UsedMoney = Math.min(account.Balance, RandomAvgBuyOnce, TotalBuyCNY - (InitAccount.Balance - account.Balance));
    
    var BuyAmount = adjustFloat(UsedMoney / BuyPrice);
    if (BuyAmount < exchange.GetMinStock()) {
        return false;
    }
    LastBuyPrice = BuyPrice;
    exchange.Buy(BuyPrice, BuyAmount, '花费: ￥', adjustFloat(UsedMoney), '上次成交价', ticker.Last);
    return true;
}

function main() {
    CancelPendingOrders();
    InitAccount = GetAccount();
    Log(InitAccount);
    if (InitAccount.Balance < TotalBuyCNY) {
        throw "账户余额不足";
    }
    LoopInterval = Math.max(LoopInterval, 1);
    while (dispatch()) {
        Sleep(LoopInterval * 1000);
    }
    Log("委托全部完成", GetAccount());
}
