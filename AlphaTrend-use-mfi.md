
> Name

AlphaTrend-use-mfi

> Author

发明者量化

> Strategy Description

 ![IMG](https://www.fmz.com/upload/asset/fac92b30d9603ace21.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|5|Multiplier|
|v_input_1|14|Common Period|
|v_input_source_1|0|source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-05 00:00:00
end: 2022-05-04 23:59:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Bitfinex","currency":"BTC_USD"}]
*/


indicator('AlphaTrend', shorttitle='AT', overlay=true)

coeff = input.float(5, 'Multiplier')
AP = input(14, 'Common Period')
ATR = ta.sma(ta.tr, AP)
src = input.source(close, "source")
upT = low - ATR * coeff
downT = high + ATR * coeff
AlphaTrend = 0.0
AlphaTrend := ta.mfi(hlc3, 14) >= 50 ? upT < nz(AlphaTrend[1]) ? nz(AlphaTrend[1]) : upT : downT > nz(AlphaTrend[1]) ? nz(AlphaTrend[1]) : downT

plot(AlphaTrend)

if ta.crossover(low, AlphaTrend)
    strategy.entry("BUY", strategy.long)
else if ta.crossunder(high, AlphaTrend)
    strategy.entry("SELL", strategy.short, when=ta.crossunder(high, AlphaTrend))


```

> Detail

https://www.fmz.com/strategy/360014

> Last Modified

2022-05-06 15:38:52
