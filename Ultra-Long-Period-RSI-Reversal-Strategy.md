
> Name

Ultra-Long-Period-RSI-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description



This strategy uses an ultra long period RSI indicator to generate trading signals based on RSI crossover with thresholds. 

Specifically, it adopts a very long RSI period, typically 50-100. Long signals are triggered when RSI crosses above oversold level. Short signals are generated on RSI crossing below overbought level.

The advantage of this strategy is the ultra long RSI can more precisely determine trend, filtering out short-term noise and avoiding whipsaws. However, RSI itself has lagging issues and cannot promptly detect reversals. Also, parameter tuning is required for different products.

In summary, the ultra long RSI reversal strategy suits medium-long term holding. Despite decent performance, attention is still required on trend change risks and timely stop loss to protect capital. Only with comprehensive risk management can steady profits be achieved in the long run.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|65|length|
|v_input_2|40|overSold|
|v_input_3|60|overBought|
|v_input_4_close|0|price: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-03 00:00:00
end: 2023-09-10 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// strategy("Kozlod - RSI Strategy - 1 minute", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100)


// Inputs
length     = input(65)
overSold   = input(40)
overBought = input(60)
price      = input(close)

// RSI
vrsi = rsi(price, length)

if (crossover(vrsi, overSold))
    strategy.entry("RsiLE", strategy.long, comment="RsiLE")
if (crossunder(vrsi, overBought))
    strategy.entry("RsiSE", strategy.short, comment="RsiSE")

```

> Detail

https://www.fmz.com/strategy/426391

> Last Modified

2023-09-11 17:36:19
