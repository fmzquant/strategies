
> Name

ATR-RSI-Combination-Strategy

> Author

一刀

> Strategy Description

## ATR Indicator
Average True Range (ATR) measures market volatility. It reflects the rate of market change, but it does not indicate price direction or trend stability. A higher ATR value implies a greater chance of trend change, while a lower ATR value suggests the current trend is more stable.

### Calculation Method
Average True Range is calculated from the average of true ranges over the past N periods. The true range for a single period is the largest of three values: current high minus current low, current high minus previous close, or previous close minus current low. The goal is to capture the maximum effective price movement range.

## RSI Indicator
The Relative Strength Index (RSI) compares the strength of buying and selling pressure over a period to help judge future market direction.

### Calculation Method
RSI = 100 - (100 / (1 + RS));
RS = sum of up closes over n periods / sum of down closes over n periods.
In general, RSI uses 50 as the midpoint: above 50 suggests a bullish market, while below 50 suggests a bearish market.
RSI above 70 is considered overbought, which may be followed by a pullback or reversal, while RSI below 30 is considered oversold, which may be followed by an upward move.

## Strategy Principle
ATR is used as a filter. When ATR > ATRMa (the average ATR over the past N periods), it suggests market volatility is increasing and the trend is strengthening. RSI is then used to generate trading signals.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|rsi_period|20|RSI calculation period|
|atr_period|14|Average true range calculation period|
|atrma_period|20|Average true range moving-average period|
|tick_interval|60|Time interval|
|slide_price|0.3|Order slippage value|

> Source (javascript)

``` javascript
/*backtest
start: 2021-02-11 00:00:00
end: 2022-02-10 23:59:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Huobi","currency":"BCH_USDT"}]
args: [["rsi_period",12],["atrma_period",18]]
*/

/*
* rsi_period: 强弱指标计算周期
* atr_period: 平均真实波幅计算周期
* atrma_period: 平均真实波幅均值计算呢周期
* tick_interval: 时间间隔
* slide_price: 下单滑动值
*/

// RSI指示操作状态
var RSI_NONE = 0;
var RSI_BUY = 1;
var RSI_SELL = 2;

var last_rsi_staus;

// ATR活跃信号判断
function isAtrActive(records) {
    let atr = TA.ATR(records, atr_period);
    let atrma = atr[atr.length - 1];
    if (atr.length > atrma_period) {
        let tmp_atr = 0;
        for (let i = atr.length - atrma_period; i < atr.length; i++) {
            tmp_atr += atr[i];
        }
        atrma = tmp_atr / atr_period;
    }
    else {
        atrma = aval(atr.join("+")) / atr.length;
    }
    return atr[atr.length - 1] > atrma;
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

function onTick() {
    let records = _C(exchange.GetRecords, PERIOD_M15);
    let ticker = _C(exchange.GetTicker);
    if (records == null ||
        ticker == null ||
        records.length < rsi_period ||
        records.length < atr_period) {
        return;
    }

    if (isAtrActive(records)) {
        let rsi = getRsiStatus(records);
        if (rsi != RSI_NONE) {
            let account = _C(exchange.GetAccount);
            if (rsi == RSI_BUY && last_rsi_staus != RSI_BUY) {
                Log("买入信号");
                last_rsi_staus = RSI_BUY;
                canelPendingOrders();
                if(account.Balance>0){
                    let price = ticker.Last + slide_price;
                    let amount = account.Balance / price * 0.99;
                    exchange.Buy(price, amount);
                }
            } else if (rsi == RSI_SELL && last_rsi_staus != RSI_SELL) {
                Log("卖出信号");
                last_rsi_staus = RSI_SELL;
                canelPendingOrders();
                if (account.Stocks > 0) {
                    let price = ticker.Last - slide_price;
                    exchange.Sell(price, account.Stocks);
                }
            }
        }
    }
    last_records = records;
}

function main() {
    while (true) {
        onTick();
        Sleep(tick_interval * 1000);
    }
}
```

> Detail

https://www.fmz.com/strategy/345036

> Last Modified

2022-02-13 17:19:57
