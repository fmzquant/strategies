
> Name

MACD-Pine简单策略

> Author

发明者量化



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|fast|
|v_input_int_1|26|slow|
|v_input_float_1|9|signal|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-04 00:00:00
end: 2022-05-03 23:59:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Bitfinex","currency":"BTC_USD"}]
*/


fastPeriod = input(12, "fast")
slowPeriod = input.int(26, "slow")
singnalPeriod = input.float(9, "signal")


[fast, slow, _] = ta.macd(close, fastPeriod, slowPeriod, singnalPeriod)
plot(fast, 'fast')
plot(slow, 'slow')

if fast>slow and fast[1]<slow[1]
    strategy.entry("Enter Long", strategy.long)
else if fast<slow and fast[1]>slow[1]
    strategy.entry("Enter Short", strategy.short)
    

```

> Detail

https://www.fmz.com/strategy/356844

> Last Modified

2022-05-23 18:08:17
