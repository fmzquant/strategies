
> Name

EMA-Breakout-Filter-Long-Only-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


This long-only strategy uses an ATR channel to filter fake EMA breakouts for stable trend-following long trades. It focuses solely on long side trading.

Strategy Logic: 

1. Calculate n-period EMA as intermediate-term trend.

2. Calculate n-period ATR for range channel bands.

3. Go long when price breaks above channel top. 

4. Exit long when price breaks below channel bottom.

5. ATR channel filters insignificant or short-term false breakouts.

Advantages:

1. ATR channel improves reliability of long signals.

2. Long only reduces complexity and risks.

3. Simple optimization adapts easily across markets.

Risks:

1. Unable to profit from short-side moves.

2. Both EMA and ATR lag, causing poor entry timing. 

3. Hard to sustain signals in prolonged ranges.

In summary, this simple system can perform well in bull trends but requires caution on lagging indicators and ranging markets.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2020-09-11 00:00:00
end: 2021-04-17 00:00:00
period: 7d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("EMA Long Only Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

len = input(21,  minval=1, title="Length")

price = sma(close, 2)
average = ema(close, len)
diff = atr(len)
bull_level = average + diff
bear_level = average - diff
bull_cross = crossover(price, bull_level)
bear_cross = crossover(bear_level, price)

strategy.entry("Buy", strategy.long, when=bull_cross) 
strategy.close("Buy", when=bear_cross) //strategy.entry("Sell", strategy.short, when=bear_cross)
    
plot(price, title="price", color=green, transp=50, linewidth = 4)
plot(average, title="average", color=red, transp=50, linewidth = 4)
a1 = plot(bull_level, title="bull", color=red, transp=50, linewidth = 1)
a2 = plot(bear_level, title="bear", color=red, transp=50, linewidth = 1)
fill(a2, a1, color=red, transp=95)

```

> Detail

https://www.fmz.com/strategy/426516

> Last Modified

2023-09-12 17:12:22
