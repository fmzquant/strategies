
> Name

Fast-and-Slow-EMA-Crossover-Trend-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


This strategy trades the crossover of fast and slow EMAs to determine and track price trends. It aims to capture intermediate-term trends.

Strategy Logic:

1. Calculate fast and slow EMAs, typically 13 and 48 periods.

2. Enter long when fast EMA crosses above slow EMA. 

3. Exit long when price crosses below fast EMA.

4. Option to add short side rules for two-way trading.

Advantages:

1. Fast/slow EMA combo effectively identifies intermediate trends.

2. Breakout trading allows timely trend entries.

3. Simple stop loss mechanism controls loss per trade. 

Risks:

1. EMA lag causes missed best entry points.

2. Loosen stops to avoid excessive whipsaws.

3. Hard to determine clear trend direction during ranges.

In summary, this strategy uses EMA crosses for trend identification and tracking. Optimization on parameters and risk controls can further improve performance for a wide range of markets.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Fast MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|13|Fast MA Period|
|v_input_3_close|0|Slow MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|48|Slow MA Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-05 00:00:00
end: 2023-09-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

// strategy("EMA Strategy 13 48", shorttitle = "EMA Strategy 13 48", overlay=true, pyramiding = 3,default_qty_type = strategy.percent_of_equity, default_qty_value = 1000)


// === Inputs ===
// short ma
maFastSource   = input(defval = close, title = "Fast MA Source")
maFastLength   = input(defval = 13, title = "Fast MA Period", minval = 1)

// long ma
maSlowSource   = input(defval = close, title = "Slow MA Source")
maSlowLength   = input(defval = 48, title = "Slow MA Period", minval = 1)


// === Vars and Series ===
fastMA = ema(maFastSource, maFastLength)
slowMA = ema(maSlowSource, maSlowLength)

plot(fastMA, color=blue)
plot(slowMA, color=purple)

goLong() => crossover(fastMA, slowMA)
killLong() => crossunder(close, fastMA)
strategy.entry("Buy", strategy.long, when = goLong())
strategy.close("Buy", when = killLong())

// Shorting if using
goShort() => crossunder (fastMA, slowMA)
killShort() => crossover(fastMA, slowMA)
//strategy.entry("Sell", strategy.short, when = goShort())
//strategy.close("Sell", when = killShort())


 
```

> Detail

https://www.fmz.com/strategy/426521

> Last Modified

2023-09-12 18:06:26
