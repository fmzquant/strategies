/*
策略出处: https://www.botvs.com/strategy/64
策略名称: 定点进场下单定点离场卖单
策略作者: Zero
策略描述:

可以选择在几点进场，几点离场，系统强制建仓，强制平仓，会不停的尝试建仓与平仓, 默认0点进场买，8点出场卖, 设置成进场23，离场8意思就晚上23点进场，第二天8点离场, 如果设置也8.5就是8点半的意思, 设置成8.6就是8点36分，小数点位乘6就是分钟数，止损可以禁止如果勾掉开启止损，止损点如果为0.1表示如果跌0.1%就强制卖出。如果止损价参考最高价，意思就是比如1000买进的，涨到2000了，如果2000跌了0.1%就止损，如果不参考最高价，就是比平均买入价跌了0.1%就止损.


参数                默认值    描述
----------------  -----  --------
EnterHour         false  进场时间(小时)
LeaveHour         8      离场时间(小时)
SlidePrice        true   滑动值
UsedFund          1000   建仓金额
RetryInterval     5      尝试间隔(秒)
StopLoss          0.5    止损点
EnableStopLoss    true   是否开启止损
RefHigh           true   参考最高价止损
StopProfit        0.5    止赢点
EnableStopProfit  false  是否开启止赢
*/


// 0 means wait buy, 1 means wait sell
var state = 0;
var lastBuyAmount = 0;
var lastHighPrice = 0;
var lastBuyPrice = 0;
var initBalance = 0;

function GetAccount() {
    var account;
    while (!(account = exchange.GetAccount())) {
        Sleep(2000);
    }
    return account;
}

function GetTicker() {
    var ticker;
    while (!(ticker = exchange.GetTicker())) {
        Sleep(2000);
    }
    return ticker;
}

function cancelAllOrders() {
    var orders = null;
    while (!(orders = exchange.GetOrders())) {
        Sleep(2000);
    }
    
    if (orders.length > 0) {
        for (var j = 0; j < orders.length; j++) {
            exchange.CancelOrder(orders[j].Id);
            if (j < (orders.length-1)) {
                Sleep(2000);
            }
        }
    }
}

function adjustFloat(v) {
    return Math.floor(v*1000)/1000;
}

function MustBuy() {
    var buyAmount = 0;
    var initAccount = GetAccount();
    if (initBalance == 0) {
        initBalance = initAccount.Balance;
        if (initAccount.Balance < UsedFund) {
            throw "账户余额不足，少于设定值 " + UsedFund;
        }
    }

    
    UsedFund = Math.min(initAccount.Balance, UsedFund);
    
    var spend = 0;
    var buyAmount = 0;
    
    while (spend < UsedFund) {
        var ticker = GetTicker();
        var amount = adjustFloat((UsedFund - spend) / (ticker.Last + SlidePrice));
        if (amount < exchange.GetMinStock()) {
            break;
        }
        exchange.Buy(ticker.Last + SlidePrice, amount);
        Sleep(RetryInterval * 1000);
        cancelAllOrders();
        var account = GetAccount();
        spend = initAccount.Balance - account.Balance;
        buyAmount = account.Stocks - initAccount.Stocks;
    }
    
    if (buyAmount > 0) {
        lastBuyPrice = lastHighPrice = (spend / buyAmount);
        Log("平均买入价", adjustFloat(lastHighPrice));
    }
    
    return buyAmount;
}

function MustSell(sellAmount) {
    var remaind = sellAmount;
    var initAccount = GetAccount();
    while (remaind >= exchange.GetMinStock()) {
        var ticker = GetTicker();
        exchange.Sell(ticker.Last - SlidePrice, remaind);
        Sleep(RetryInterval * 1000);
        cancelAllOrders();
        var newAccount = GetAccount();
        remaind -= (initAccount.Stocks - newAccount.Stocks);
        initAccount = newAccount;
    }
    LogProfit(initAccount.Balance - initBalance);
}

function onTick() {
    var now = new Date();
    var h = now.getHours() + (now.getMinutes() / 60);
    if (state == 0 && (
        (EnterHour < LeaveHour && h >= EnterHour && h < LeaveHour) || 
        (EnterHour > LeaveHour && (h >= EnterHour || h < LeaveHour))
        )) {
        lastBuyAmount = MustBuy();
        state = 1;
    } else if (state == 1 && (
        (EnterHour < LeaveHour && (h >= LeaveHour || h < EnterHour)) || 
        (EnterHour > LeaveHour && (h >= LeaveHour && h < EnterHour))
        )) {
        if (lastBuyAmount > 0) {
            MustSell(lastBuyAmount);
            lastBuyAmount = 0;
        }
        state = 0;
    } else if ((EnableStopProfit || EnableStopLoss) && lastBuyAmount > 0) {
        var ticker = GetTicker();
        if (RefHigh) {
            lastHighPrice = Math.max(lastHighPrice, ticker.Last);
        }
        var ratioStopLoss = Math.abs((lastHighPrice - ticker.Last) / lastHighPrice);
        var ratioStopProfit = Math.abs((lastBuyPrice - ticker.Last) / lastBuyPrice);
        var shouldSell = false;
        
        if (EnableStopLoss && ticker.Last < lastHighPrice && (ratioStopLoss >= (StopLoss/100))) {
            // Stop loss
            Log("开始止损, 当前跌价点数:", adjustFloat(ratioStopLoss*100), "当前价格", ticker.Last, "对比价格", adjustFloat(lastHighPrice));
            shouldSell = true;
            
        } else if (EnableStopProfit && ticker.Last > lastBuyPrice && (ratioStopProfit >= (StopProfit/100))) {
            // Stop loss
            Log("开始止赢, 当前涨价点数:", adjustFloat(ratioStopProfit*100), "当前价格", ticker.Last, "对比价格", adjustFloat(lastBuyPrice));
            shouldSell = true;
        }
        
        if (shouldSell) {
            MustSell(lastBuyAmount);
            lastBuyAmount = 0;
        }
    }
}

function main() {
    if (EnterHour == LeaveHour) {
        throw "进场时间跟离场时间不能相等!";
    }
    Log(GetAccount());
    while(true) {
        onTick();
        Sleep(60000);
    }
} 

