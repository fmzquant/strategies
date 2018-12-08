
> 策略名称

新手上路CoinEx交易  (LTC_USDT)

> 策略作者

yuehen7

> 策略描述

新手上路，研究了几天，简单的写了个......


QQ:185772115
可以交流交流呀~

> 策略参数



|参数|默认值|描述|
|----|----|----|
|MinSpace|0.06|最小利润差价|
|MaxSpace|0.03|挂单失效距离|
|SlidePrice|0.01|下单滑动价|
|RetryDelay|500|失败重试|
|MinStock|0.001|最小交易量|
|OrderAmount|0.02|固定下单数量|
|Precision|2|小数精度|


> 源码 (javascript)

``` javascript
function GetAccount(e, waitFrozen) {
    if (typeof(waitFrozen) == 'undefined') {
        waitFrozen = false;
    }
    var account = null;
    var alreadyAlert = false;
    while (true) {
        account = _C(e.GetAccount);
        if (!waitFrozen || (account.FrozenStocks < MinStock && account.FrozenBalance < 0.01)) {
            break;
        }
        if (!alreadyAlert) {
            alreadyAlert = true;
            Log("发现账户有冻结的钱或币", account);
        }
        Sleep(RetryDelay);
    }
    return account;
}

function CancelPendingOrders(e, orderType) {
    while (true) {
        var orders = e.GetOrders();
        if (!orders) {
            Sleep(RetryDelay);
            continue;
        }
        var processed = 0;
        for (var j = 0; j < orders.length; j++) {
            if (typeof(orderType) == 'number' && orders[j].Type != orderType) {
                continue;
            }
            e.CancelOrder(orders[j].Id, orders[j]);
            processed++;
            if (j < (orders.length - 1)) {
                Sleep(RetryDelay);
            }
        }
        if (processed == 0) {
            break;
        }
    }
}

function StripOrders(e, tradeType, orderId) {
    var dealAmount = 0; //返回交易数量，-1表示全部交易，0表示未交易，其他值表示部分交易
    if (typeof(orderId) == 'undefined') {
        orderId = null;
    }
    var isBuy = tradeType == ORDER_TYPE_BUY;
    while (true) {
        logAccount();
        var order = null;
        var orders = _C(e.GetOrders); //取出未完成订单
        for (var i = 0; i < orders.length; i++) {
            if (orders[i].Id == orderId) {
                order = orders[i];
            }
        }
        if (orders.length == 0 || order == null) {
            dealAmount = -1;
            break;
        } else {
            var ticker = _C(e.GetTicker);
            var tradePrice = 0;
            if (isBuy) {
                tradePrice = _N(ticker.Buy + SlidePrice, Precision);
            } else {
                tradePrice = _N(ticker.Sell - SlidePrice, Precision);
            }
            var price = order.Price;
            if (Math.abs(tradePrice - price) > MaxSpace) { //超过最大挂单区间
                var extra = "";
                if (order.DealAmount > 0) {
                    dealAmount = order.DealAmount;
                    extra = "订单id:" + order.Id + ",成交: " + order.DealAmount;
                } else {
                    dealAmount = 0;
                    extra = "订单id:" + order.Id + ",未成交";
                }
                var flag = e.CancelOrder(order.Id, order.Type == ORDER_TYPE_BUY ? "买入-" : "卖出-", extra, ' #C9C9C9');
                Log('取消订单:', flag, ' #ff0000');
                if (flag) {
                    break;
                }
            }
        }
        Sleep(RetryDelay);
    }
    return dealAmount;
}

function Trade(e, tradeType, ordPrice, tradeAmount) {
    var ret = null;
    var nowAccount = GetAccount(e, true);
    var tradeFunc = tradeType == ORDER_TYPE_BUY ? e.Buy : e.Sell;
    var isBuy = tradeType == ORDER_TYPE_BUY;

    var doAmount = 0;
    if (isBuy) {
        doAmount = Math.min(tradeAmount, _N(nowAccount.Balance / ordPrice, 6));
    } else {
        doAmount = Math.min(tradeAmount, nowAccount.Stocks);
    }
    if (doAmount == MinStock) {} else if (doAmount < tradeAmount) {
        Log('固定下单量:', tradeAmount, ',当前可交易:', doAmount, ' #9400D3');
        ret = {
            price: ordPrice,
            amount: -1
        };
        return ret;
    }
    logAccount();
    var orderId = tradeFunc(ordPrice, tradeAmount);
    if (!orderId) {
        CancelPendingOrders(e, tradeType);
        ret = {
            price: ordPrice,
            amount: 0
        };
    } else {
        var amount = StripOrders(e, tradeType, orderId); //-1成交，0全撤，大于0表示部分成交的数量
        if (amount < 0) {
            ret = {
                price: ordPrice,
                amount: tradeAmount
            };
        } else {
            ret = {
                price: ordPrice,
                amount: amount
            };
        }
    }
    logAccount();
    return ret;
}

var ini_blance = 0;
var ini_stocks = 0;
var ini_cet = 0;
var count = 0;
var usdt_Profit = 0.0;
var BuyInfo; //买单信息
var SellCet = 0;

function OrderPrice(e) {
    var ticker = _C(e.GetTicker);
    var c = _N(ticker.Sell - ticker.Buy, 6);
    var buyPrice = 0;
    var sellPrice = 0;
    if (c > MinSpace) {
        buyPrice = _N(((ticker.Buy + ticker.Sell) / 2) - SlidePrice * 2, Precision);
        sellPrice = _N(((ticker.Buy + ticker.Sell) / 2) + SlidePrice * 2, Precision);
    } else if (c >= (2 * SlidePrice)) {
        buyPrice = _N(ticker.Buy + SlidePrice, Precision);
        sellPrice = _N(ticker.Sell - SlidePrice, Precision);
    } else {
        buyPrice = _N(ticker.Last, Precision);
        sellPrice = _N(ticker.Last, Precision);
    }

    if (BuyInfo != null && BuyInfo.amount > 0) {
        var space = Math.abs(BuyInfo.price - sellPrice)
        if (space > MaxSpace && space <= (MaxSpace * 1.5)) { //卖价小于买价-挂单距离
            sellPrice = _N(BuyInfo.price - MaxSpace, Precision);
        } else if(space > (MaxSpace * 1.5)) {
            sellPrice = _N(BuyInfo.price - MaxSpace * 1.5, Precision);
        }
    }
    count = count + 1;
    Log('计数器:', count, '计划买价:', buyPrice, ',计划卖价:', sellPrice, ' #f47920');
    logAccount();
    return {
        buy: buyPrice,
        sell: sellPrice
    };
}

logAccount = function() {
    var ex1 = exchanges[0]; //交易主账户
    var ex2 = exchanges[1]; //收益账户

    var ticker = _C(ex1.GetTicker);
    var nowBlance = _C(ex1.GetAccount);
    var account2 = _C(ex2.GetAccount);
    var cet = account2.Stocks;

    var table = {
        type: 'table',
        title: '持仓信息',
        cols: ['当前价格', '初始CET', '初始USDT', '初始LTC', '当前USDT', '当前LTC', '冻结USDT', '冻结LTC', '当前CET', 'USDT收益', '当前CET收益', '卖出CET'],
        rows: [
            [ticker.Last, ini_cet, ini_blance, ini_stocks, nowBlance.Balance, nowBlance.Stocks, nowBlance.FrozenBalance, nowBlance.FrozenStocks, cet, _N(usdt_Profit, 6), _N(cet - ini_cet, 8), SellCet]
        ]
    };
    LogStatus('`' + JSON.stringify(table) + '`\n\n新手上路，写着玩的......');
}

function onTick(e) {
    var prices = OrderPrice(e);
    var buyPrice = prices.buy;
    var sellPrice = prices.sell;
    var sellInfo;

    if (BuyInfo == null) { //没有买单先开买单
        var buyInfo = Trade(e, ORDER_TYPE_BUY, buyPrice, OrderAmount);
        if (buyInfo != null && buyInfo.amount > 0) {
            BuyInfo = buyInfo;
        } else if (buyInfo.amount < 0) {
            Log('购买余额不足，自动卖出平衡...... #d71345');
            Trade(e, ORDER_TYPE_SELL, -1, MinStock);
        }
    }
    if (BuyInfo != null) {
        sellInfo = Trade(e, ORDER_TYPE_SELL, sellPrice, BuyInfo.amount);
    } else {
        sellInfo = Trade(e, ORDER_TYPE_SELL, sellPrice, OrderAmount);
    }

    if (BuyInfo != null && sellInfo != null && sellInfo.amount > 0) {
        var profit = _N(sellInfo.amount * (sellInfo.price - BuyInfo.price), 6);
        Log('买价为:', BuyInfo.price, '卖出价为:', sellInfo.price, '盈利:', profit, ' #d71345');
        usdt_Profit += profit;
        LogProfit(usdt_Profit);
        BuyInfo = null;
    } else if (BuyInfo != null && sellInfo.amount < 0) { //有买单并且卖出数量不足时才需要平衡数量
        Log('卖出数量不足，自动买入平衡...... #d71345');
        Trade(e, ORDER_TYPE_BUY, -1, MinStock);
    }
    logAccount();
}

function autoSellCet(e) {
    var account = _C(e.GetAccount);
    var cet = account.Stocks;
    var profit = _N(cet - ini_cet);
    if (profit > 1 && (profit % 3) == 0) {
        var orderId = e.Sell(-1, 1);
        if (!orderId) {
            CancelPendingOrders(e, ORDER_TYPE_SELL);
        }
        SellCet += 1;
        Log('自动卖出CET:', 1, ' #FF00FF');
    }
}

function main() {
    LogReset();
    LogProfitReset();

    if (exchanges.length == 2) {
        var ex1 = exchanges[0]; //交易主账户
        var ex2 = exchanges[1]; //收益账户

        var iniAccount = _C(ex1.GetAccount);
        ini_blance = iniAccount.Balance;
        ini_stocks = iniAccount.Stocks;

        var account2 = _C(ex2.GetAccount);
        ini_cet = account2.Stocks;
        Log('主交易账户:', ex1.GetCurrency(), ',结算单位:', ex1.GetQuoteCurrency(), ' #ff0000');
        Log('子交易账户:', ex2.GetCurrency(), ',结算单位:', ex2.GetQuoteCurrency(), ' #ff0000');
        Log('账户初始余额:', ini_blance, ',初始货币数量:', ini_stocks, ',初始CET数量:', ini_cet, ' #ff0000');

        count = 0;
        while (true) {
            onTick(ex1, ex2);
            autoSellCet(ex2);
            Sleep(1000);
        }
    }
}
```

> 策略出处

https://www.fmz.com/strategy/103464

> 更新时间

2018-07-07 15:13:14
