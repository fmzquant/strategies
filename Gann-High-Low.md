
> Name

Gann-High-Low

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|13|HIGH Period|
|v_input_2|21|LOW Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/
//@version=5
indicator('Gann High Low', overlay=true)
HPeriod = input(13, 'HIGH Period')
LPeriod = input(21, 'LOW Period')
iff_1 = close < nz(ta.sma(low, LPeriod))[1] ? -1 : 0
HLd = close > nz(ta.sma(high, HPeriod))[1] ? 1 : iff_1
HLv = ta.valuewhen(HLd != 0, HLd, 0)
sma_1 = ta.sma(high, HPeriod)
sma_2 = ta.sma(low, LPeriod)
HiLo = HLv == -1 ? sma_1 : sma_2
HLcolor = HLv == -1 ? color.maroon : color.blue
plot(HiLo, linewidth=2, color=HLcolor)

alertcondition(ta.cross(close, HiLo), title='Price Cross Alert', message='Price - HiLo Crossing!')
alertcondition(ta.crossover(close, HiLo), title='PRICE CrossOver Alarm', message='LAST PRICE is ABOVE HiLo')
alertcondition(ta.crossunder(close, HiLo), title='PRICE CrossUnder Alarm', message='LAST PRICE is BELOW HiLo!')
buySignal=ta.crossover(close, HiLo)
sellSignal=ta.crossunder(close, HiLo)
if buySignal
    strategy.entry("buy", strategy.long)
else if sellSignal
    strategy.entry("sell", strategy.short) 
```

> Detail

https://www.fmz.com/strategy/370655

> Last Modified

2022-06-25 10:00:25
