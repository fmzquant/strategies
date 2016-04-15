/*
策略出处: https://www.botvs.com/strategy/10989
策略名称: 数字货币交易类库
策略作者: Zero
策略描述:

暂时封装了以下几个函数

> $.GetAccount(e)

```
Log($.GetAccount()); // 获取账户信息, 带容错功能
Log($.GetAcccount(exchanges[1]));
```

> $.Buy/Sell(e, amount)

```
$.Buy(0.3); // 主交易所买入0.3个币
$.Sell(0.2); // 主交易所卖出0.2个币
$.Sell(exchanges[1], 0.1); // 次交易所卖出0.1个币
```
> $.CancelPendingOrders(e, orderType)

```
$.CancelPendingOrders(); // 取消主交易所所有委托单
$.CancelPendingOrders(ORDER_TYPE_BUY); // 取消主交易所所有的买单
$.CancelPendingOrders(exchanges[1]); // 取消第二个交易所所有订单
$.CancelPendingOrders(exchanges[1], ORDER_TYPE_SELL); // 取消第二个交易所所有的卖单
```

> $.Cross(periodA, periodB) / $.Cross(arr1, arr2);

```
var n = $.Cross(15, 30);
var m = $.Cross([1,2,3,2.8,3.5], [3,1.9,2,5,0.6])
```

``` text
如果 n 等于 0, 指刚好15周期的EMA与30周期的EMA当前价格相等
如果 n 大于 0, 比如 5, 指15周期的EMA上穿了30周期的EMA 5个周期(Bar)
如果 n 小于 0, 比如 -12, 指15周期的EMA下穿了30周期的EMA 12个周期(Bar)
如果传给Cross不是数组, 则函数自动获取K线进行均线计算
如果传给Cross的是数组, 则直接进行比较
```


参数            默认值  描述
----------  -----  -----------------------
OpMode        0    下单方式: 吃单|挂单
MaxSpace      0.5  挂单失效距离
SlidePrice    0.1  下单滑动价(元)
MaxAmount     0.8  开仓最大单次下单量
RetryDelay  500    失败重试(毫秒)
MAType        0    均线算法: EMA|MA|AMA(自适应均线)
*/


function CancelPendingOrders(e, orderType) {
    while (true) {
        var orders = e.GetOrders();
        if (!orders) {
            Sleep(RetryDelay);
            continue;
        }
        var processed = 0;
        for (var j = 0; j < orders.length; j++) {
            if (typeof(orderType) === 'number' && orders[j].Type !== orderType) {
                continue;
            }
            e.CancelOrder(orders[j].Id, orders[j]);
            processed++;
            if (j < (orders.length - 1)) {
                Sleep(RetryDelay);
            }
        }
        if (processed === 0) {
            break;
        }
    }
}

function GetAccount(e, waitFrozen) {
    if (typeof(waitFrozen) == 'undefined') {
        waitFrozen = false;
    }
    var account = null;
    var alreadyAlert = false;
    while (true) {
        account = _C(e.GetAccount);
        if (!waitFrozen || (account.FrozenStocks < e.GetMinStock() && account.FrozenBalance < 0.01)) {
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


function StripOrders(e, orderId) {
    var order = null;
    if (typeof(orderId) == 'undefined') {
        orderId = null;
    }
    while (true) {
        var dropped = 0;
        var orders = _C(e.GetOrders);
        for (var i = 0; i < orders.length; i++) {
            if (orders[i].Id == orderId) {
                order = orders[i];
            } else {
                var extra = "";
                if (orders[i].DealAmount > 0) {
                    extra = "成交: " + orders[i].DealAmount;
                } else {
                    extra = "未成交";
                }
                e.CancelOrder(orders[i].Id, orders[i].Type == ORDER_TYPE_BUY ? "买单" : "卖单", extra);
                dropped++;
            }
        }
        if (dropped === 0) {
            break;
        }
        Sleep(RetryDelay);
    }
    return order;
}

// mode = 0 : direct buy, 1 : buy as buy1
function Trade(e, tradeType, tradeAmount, mode, slidePrice, maxAmount, maxSpace, retryDelay) {
    var initAccount = GetAccount(e, true);
    var nowAccount = initAccount;
    var orderId = null;
    var prePrice = 0;
    var dealAmount = 0;
    var diffMoney = 0;
    var isFirst = true;
    var tradeFunc = tradeType == ORDER_TYPE_BUY ? e.Buy : e.Sell;
    var isBuy = tradeType == ORDER_TYPE_BUY;
    while (true) {
        var ticker = _C(e.GetTicker);
        var tradePrice = 0;
        if (isBuy) {
            tradePrice = _N((mode === 0 ? ticker.Sell : ticker.Buy) + slidePrice, 4);
        } else {
            tradePrice = _N((mode === 0 ? ticker.Buy : ticker.Sell) - slidePrice, 4);
        }
        if (!orderId) {
            if (isFirst) {
                isFirst = false;
            } else {
                nowAccount = GetAccount(e, true);
            }
            var doAmount = 0;
            if (isBuy) {
                diffMoney = _N(initAccount.Balance - nowAccount.Balance, 4);
                dealAmount = _N(nowAccount.Stocks - initAccount.Stocks, 4);
                doAmount = Math.min(maxAmount, tradeAmount - dealAmount, _N((nowAccount.Balance - 10) / tradePrice, 4));
            } else {
                diffMoney = _N(nowAccount.Balance - initAccount.Balance, 4);
                dealAmount = _N(initAccount.Stocks - nowAccount.Stocks, 4);
                doAmount = Math.min(maxAmount, tradeAmount - dealAmount, nowAccount.Stocks);
            }
            if (doAmount < e.GetMinStock()) {
                break;
            }
            prePrice = tradePrice;
            orderId = tradeFunc(tradePrice, doAmount, ticker);
        } else {
            if (Math.abs(tradePrice - prePrice) > maxSpace) {
                orderId = null;
            }
            var order = StripOrders(exchange, orderId);
            if (!order) {
                orderId = null;
            }
        }
        Sleep(retryDelay);
    }

    if (dealAmount <= 0) {
        return null;
    }

    return {
        price: _N(diffMoney / dealAmount, 4),
        amount: dealAmount
    };
}

$.Buy = function(e, amount) {
    if (typeof(e) === 'number') {
        amount = e;
        e = exchange;
    }
    return Trade(e, ORDER_TYPE_BUY, amount, OpMode, SlidePrice, MaxAmount, MaxSpace, RetryDelay);
};

$.Sell = function(e, amount) {
    if (typeof(e) === 'number') {
        amount = e;
        e = exchange;
    }
    return Trade(e, ORDER_TYPE_SELL, amount, OpMode, SlidePrice, MaxAmount, MaxSpace, RetryDelay);
};

$.CancelPendingOrders = function(e, orderType) {
    if (typeof(orderType) === 'undefined') {
        if (typeof(e) === 'number') {
            orderType = e;
            e = exchange;
        } else if (typeof(e) === 'undefined') {
            e = exchange;
        }
    }
    return CancelPendingOrders(e, orderType);
};

$.GetAccount = function(e) {
    if (typeof(e) === 'undefined') {
        e = exchange;
    }
    return _C(e.GetAccount);
};

var _MACalcMethod = [TA.EMA, TA.MA, talib.KAMA][MAType];

// 返回上穿的周期数. 正数为上穿周数, 负数表示下穿的周数, 0指当前价格一样
$.Cross = function(a, b) {
    var crossNum = 0;
    var arr1 = [];
    var arr2 = [];
    if (Array.isArray(a)) {
        arr1 = a;
        arr2 = b;
    } else {
        var records = null;
        while (true) {
            records = exchange.GetRecords();
            if (records && records.length > a && records.length > b) {
                break;
            }
            Sleep(RetryDelay);
        }
        arr1 = _MACalcMethod(records, a);
        arr2 = _MACalcMethod(records, b);
    }
    if (arr1.length !== arr2.length) {
        throw "array length not equal";
    }
    for (var i = arr1.length-1; i >= 0; i--) {
        if (typeof(arr1[i]) !== 'number' || typeof(arr2[i]) !== 'number') {
            break;
        }
        if (arr1[i] < arr2[i]) {
            if (crossNum > 0) {
                break;
            }
            crossNum--;
        } else if (arr1[i] > arr2[i]) {
            if (crossNum < 0) {
                break;
            }
            crossNum++;
        } else {
            break;
        }
    }
    return crossNum;
};

// 仅调试模板策略用
function main() {
    Log($.GetAccount());
    Log($.Buy(0.5));
    Log($.Sell(0.5));
    exchange.Buy(1000, 3);
    $.CancelPendingOrders(exchanges[0]);
    Log($.Cross(30, 7));
    Log($.Cross([1,2,3,2.8,3.5], [3,1.9,2,5,0.6]));
}
