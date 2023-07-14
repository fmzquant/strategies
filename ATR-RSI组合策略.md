
> Name

ATR-RSI组合策略

> Author

一刀

> Strategy Description

## Atr指标
平均真实波动范围（Average True Range），简称ATR指标。主要用来衡量市场的波动烈度，显示市场变化率的指标，但不能反映价格走向及趋势的稳定性。该指标值越高，趋势改变的可能性就越大，反之趋势改变的可能性就小。

### 计算方法
平均真实波动范围，根据过往N天的真实波动与当日真实波动计算均值得出。单日真实波动根从(当日最高价-当日最低价)、(当日最高价-昨日收盘价)、(昨日收盘价-当日最低价)三组结果中间取中最大值，目的在于获取最大波动范围价格差。

## Rsi指标
相对强弱指标（Relative Strength Index），简称RSI指标。通过比较一段时间内多空双方买卖力量的强弱程度来判断未来市场走势的技术指标。

### 计算方法
RSI = 100 - (100/(1+RS));
RS = n天收盘涨数和/n天收盘跌数和；
一般RSI以50作为中界线，大于50视为多头行情，小于50视为空头行情；
RSI大于70视为超买状态，后续行情可能会出现回调或转势，小于30为超卖状态，后续可能出现上涨。

## 策略原理
ATR用于过滤，当ATR>ATRMa（过去N天的平均ATR）时，说明市场波动幅度开始增大，趋势正在增强。RSI用于产生交易信号。

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|rsi_period|20|强弱指标计算周期|
|atr_period|14|平均真实波幅计算周期|
|atrma_period|20|平均真实波幅均价计算周期|
|tick_interval|60|时间间隔|
|slide_price|0.3|下单滑动值|


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
