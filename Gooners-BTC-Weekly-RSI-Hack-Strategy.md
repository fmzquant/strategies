
> Name

Gooners-BTC-Weekly-RSI-Hack-Strategy

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|length|
|v_input_2|52|buylevel|
|v_input_3|52|selllevel|


> Source (PineScript)

``` pinescript
/*backtest
start: 2015-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/
//@version=5
strategy("Gooners BTC Weekly RSI Hack Strategy", overlay = true, default_qty_value = 100, default_qty_type = strategy.percent_of_equity, initial_capital = 1000000)
length = input( 14 )
buylevel = input( 52 )
selllevel = input( 52 )
price = close
rsi = ta.rsi(price, length)
co = ta.crossover(rsi, buylevel)
cu = ta.crossunder(rsi, selllevel)
if (not na(rsi))
	if (co)
		strategy.entry("RsiLE", strategy.long, comment="RsiLE")
	if (cu)
		strategy.close("RsiLE", comment="RsiLC")
```

> Detail

https://www.fmz.com/strategy/380277

> Last Modified

2022-08-27 21:19:13
