
> Name

KST策略

> Author

镜花水月、



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ROC1|
|v_input_2|15|ROC2|
|v_input_3|20|ROC3|
|v_input_4|30|ROC4|
|v_input_5|9|SMA1|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-28 00:00:00
end: 2023-12-04 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/
//@version=4
strategy("KST策略", overlay = false, pyramiding=1, default_qty_type= strategy.percent_of_equity, default_qty_value = 100,commission_type=strategy.commission.percent,commission_value=0.07)

ROC1 = input(10)
ROC2 = input(15)
ROC3 = input(20)
ROC4 = input(30)
SMA1 = input(9)

ROCma1 = sma(roc(close, ROC1), 10)
ROCma2 = sma(roc(close, ROC2), 10)
ROCma3 = sma(roc(close, ROC3), 10)
ROCma4 = sma(roc(close, ROC4), 15)
hline(0)

KST = ROCma1 + ROCma2 * 2 + ROCma3 * 3 + ROCma4 * 4
signal = sma(KST, SMA1)

plot(KST, color=color.green)
plot(signal, color=color.red)
if ta.crossover(KST,signal) //and KST >= 0 //and signal >=0
    strategy.entry("L",strategy.long)
if ta.crossunder(KST,signal) //and KST <= 0 //and signal <=0
    strategy.entry("S",strategy.short)
```

> Detail

https://www.fmz.com/strategy/436493

> Last Modified

2023-12-26 11:25:30
