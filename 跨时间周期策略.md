
> Name

跨时间周期策略

> Author

一刀



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|splide_price|0.1|滑点|
|slow_ma|20|慢MA周期|
|fast_ma|5|快MA周期|
|rsi_period|5|RSI周期|
|tick_interval|60|循环间隔|


> Source (javascript)

``` javascript
/*backtest
start: 2021-02-14 00:00:00
end: 2022-02-13 23:59:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Bitfinex","currency":"BTC_USD","stocks":0}]
args: [["rsi_period",10]]
*/

/*
* fast_ma: 快均线，短周期
* slow_ma: 慢均线，长周期
* rsi_period: rsi周期
* tick_interval: 循环间隔
* splide_price: 滑点
*/

// RSI指示操作状态
var RSI_NONE = 0;
var RSI_BUY = 1;
var RSI_SELL = 2;

// 取消未成交下单
function canelPendingOrders() {
    while (true) {
        let orders = _C(exchange.GetOrders);
        if (orders.length == 0) {
            break;
        }
        for (let i = 0; i < orders.length; i++) {
            exchange.CancelOrder(orders[i].Id);
        }
    }
}

// 获取RSI操作状态
function getRsiStatus(records) {
    let rsi = TA.RSI(records, rsi_period)[records.length - 1];
    if (rsi < 30) {
        return RSI_BUY;
    }
    else if (rsi > 70) {
        return RSI_SELL;
    }
    else {
        return RSI_NONE;
    }
}

function onTick() {
    let records = _C(exchange.GetRecords, PERIOD_M15);
    let ticker = _C(exchange.GetTicker);
    let account = _C(exchange.GetAccount);
    let fast = TA.MA(records, fast_ma);
    let slow = TA.MA(records, slow_ma);
    let n = _Cross(fast, slow);
    if (n > 0 && getRsiStatus(records) == RSI_BUY) {
        canelPendingOrders();
        let price = ticker.Last + splide_price;
        let amount = account.Balance / price - 0.1;
        if (amount > 0.1) {
            exchange.Buy(price, amount);
        }
    }
    else if (n < 0 && getRsiStatus(records) == RSI_SELL) {
        canelPendingOrders();
        let price = ticker.Last - splide_price;
        let amount = account.Stocks;
        if (amount > 0.1) {
            exchange.Sell(price, amount);
        }
    }
}

function main() {
    while (true) {
        onTick();
        Sleep(tick_interval * 1000);
    }
}
```

> Detail

https://www.fmz.com/strategy/345289

> Last Modified

2022-02-15 09:37:09
