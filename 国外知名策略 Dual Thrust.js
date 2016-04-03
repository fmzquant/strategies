/*
策略出处: https://www.botvs.com/strategy/153
策略名称: 国外知名策略 Dual Thrust
策略作者: Zero
策略描述:

国外知名策略 Dual Thrust,  这个策略横盘振荡时很受伤，有波动的时候，很给力。建议周期选择最少5分钟
参考: 
http://pan.baidu.com/share/link?shareid=51043384&uk=690262241
http://bbs.tb18.net/thread-16325-1-1.html
http://www.doc88.com/p-0893982494346.html
http://www.legu8.com/?p=253


参数              默认值    描述
--------------  -----  ----------
NPeriod         true   计算周期
Ks              0.5    上轨系数
Kx              0.5    下轨系数
Lot             true   手数
SlidePrice      0.3    下单滑动价
Interval        2000   出错重试间隔(毫秒)
UseMarketOrder  false  使用市价单
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

function Highest(records, attr, n) {
    var v = 0;
    for (var pos = records.length - n; pos < records.length; pos++) {
        v = Math.max(v, records[pos][attr]);
    }
    return v;
}

function Lowest(records, attr, n) {
    var v = -1;
    for (var pos = records.length - n; pos < records.length; pos++) {
        if (v == -1) {
            v = records[pos][attr];
        } else {
            v = Math.min(v, records[pos][attr]);
        }
    }
    return v;
}

function updateProfit(accountInit, accountNow, ticker) {
    var netNow = accountNow.Balance + accountNow.FrozenBalance + ((accountNow.Stocks + accountNow.FrozenStocks) * ticker.Buy);
    var netInit = accountInit.Balance + accountInit.FrozenBalance + ((accountInit.Stocks + accountInit.FrozenStocks) * ticker.Buy);
    LogProfit(adjustFloat(netNow - netInit));
}

var LastEpoch = 0;
var InitAccount = null;
var LastProfit = 0;

function onTick() {
    var records = exchange.GetRecords();
    if (!records || records.length <= NPeriod) {
        return;
    }
    var Bar = records[records.length-1];
    
    if (LastEpoch == Bar.Time) {
        return;
    }
    
    var Range = 0;
    var HH = Highest(records, 'High', NPeriod);
    var HC = Highest(records, 'Close', NPeriod);
    var LL = Lowest(records, 'Low', NPeriod);
    var LC = Lowest(records, 'Close', NPeriod);
    
    if ((HH - LC) >= (HC - LL)) {
        Range = HH - LC;
    } else {
        Range = HC - LL;
    }
    
    var BuyPosition = Bar.Open + (Ks * Range);
    var SellPosition = Bar.Open - (Kx * Range);
    
    var shouldBuy = false;
    var shouldSell = false;

    if (Bar.High >= BuyPosition) {
        shouldBuy = true;
    }
    
    if (Bar.Low <= SellPosition) {
        shouldSell = true;
    }
    
    if (!shouldBuy && !shouldSell) {
        return;
    }
    
    CancelPendingOrders();

    var account = GetAccount();
    var ticker = GetTicker();
    
    if (shouldSell) {
        var maxSell = adjustFloat(account.Stocks - InitAccount.Stocks);
        if (maxSell > exchange.GetMinStock()) {
            var sellPrice = ticker.Sell - SlidePrice;
            if (UseMarketOrder) {
                sellPrice = ticker.Buy - SlidePrice;
            }
            exchange.Sell(sellPrice, maxSell);
        } else {
            // Nothing to sell
            LastEpoch = Bar.Time;
            updateProfit(InitAccount, account, ticker);
        }
    } else if (shouldBuy) {
        var buyPrice = ticker.Buy + SlidePrice;
        if (UseMarketOrder) {
            buyPrice = ticker.Sell + SlidePrice;
        }
        var amount = adjustFloat(account.Balance / buyPrice);
        if (amount > exchange.GetMinStock()) {
            exchange.Buy(buyPrice, Math.min(amount, Lot))
            LastEpoch = Bar.Time;
        }
    }
}

function main() {
    InitAccount = GetAccount();
    Log(exchange.GetName(), exchange.GetCurrency(), InitAccount);
    if (Lot < exchange.GetMinStock()) {
        throw "手数小于最小交易值";
    }
    while (true) {
        onTick();
        Sleep(10000);
    }
}
