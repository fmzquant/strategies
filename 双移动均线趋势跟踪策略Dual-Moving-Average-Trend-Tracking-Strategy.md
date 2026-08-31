
> Name

双移动均线趋势跟踪策略Dual-Moving-Average-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8a528a6bbc068fb910.png)

## Overview  

The Dual Moving Average Trend Tracking strategy utilizes a combination of fast and slow moving averages to determine trend direction, along with candlestick body color as entry signals. This strategy has both trend following and mean reversion characteristics.  

## Principle  

The strategy uses a 20-period slow moving average to define overall trend. Upward crossover suggests an uptrend while downward crossover suggests a downtrend. A 5-period fast MA serves as an entry filter. Trades are triggered only when price breaks the fast MA. In addition, recent N candle body colors are checked. Long signals are triggered when body color turns red in an uptrend. Short signals are triggered when body color turns green in a downtrend. This helps avoid false breakouts.  

The strategy examines price action using three dimensions - trend, short-term MA and candlestick body, improving signal reliability. Signals are generated only when all three align, filtering out some noise.   

## Advantages

1. Combines trend following and mean reversion, adaptable across market environments.  

2. Multi-factor review prior signals improves win rate by avoiding false signals.   

3. Optimizable using MA lengths, candle colors checked etc.  

4. Clear, concise logic, beginner friendly.

## Risks  

1. Whipsaws during rangy markets can lead to losses/drawdowns. Consider loss limits or optimizing MA parameters.  

2. Potential whipsaws during sideways may result in losses. Try tweaking number of candles checked or disabling mean reversion.   

3. Extensive backtesting needed to validate parameters and performance.

## Enhancement  

1. Explore other MA types e.g. EMA, KAMA etc.  

2. Add position sizing rules e.g fixed quantity or % equity based.  

3. Build in stop loss mechanism. Consider exiting longs if price closes below slow MA.
   
4. Test across different instruments to verify stability.  

## Conclusion  

The Dual MA strategy profits from trend trades while extracting mean reversion alpha in shorter time frames. Performance and profit potential can be improved further through optimization. Despite its simplicity, it allows beginners to grasp key concepts around combining trend and mean reversion. Comprehensive validation is must across instruments and parameters.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|long|
|v_input_2|true|short|
|v_input_3|7|Type of Slow MA|
|v_input_4_close|0|Source of Slow MA: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|true|Use fast MA Filter|
|v_input_6|5|fast MA Period|
|v_input_7|20|slow MA Period|
|v_input_8|2|Bars Q|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-04 00:00:00
end: 2024-02-03 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title = "Noro's Trend MAs 1.5", shorttitle = "Trend MAs 1.5", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

//Settings
needlong = input(true, "long")
needshort = input(true, "short")
type = input(7, defval = 7, minval = 1, maxval = 7, title = "Type of Slow MA")
src = input(close, defval = close, title = "Source of Slow MA")
usefastsma = input(true, "Use fast MA Filter")
fastlen = input(5, defval = 5, minval = 1, maxval = 50, title = "fast MA Period")
len = input(20, defval = 20, minval = 2, maxval = 200, title = "slow MA Period")
bars = input(2, defval = 2, minval = 0, maxval = 3, title = "Bars Q")

fastsma = ema(src, fastlen)

//DEMA
dema = 2 * ema(src, len) - ema(ema(close, len), len)

//TEMA
xPrice = close
xEMA1 = ema(src, len)
xEMA2 = ema(xEMA1, len)
xEMA3 = ema(xEMA2, len)
tema = 3 * xEMA1 - 3 * xEMA2 + xEMA3

//KAMA
xvnoise = abs(src - src[1])
nfastend = 0.20
nslowend = 0.05
nsignal = abs(src - src[len])
nnoise = sum(xvnoise, len)
nefratio = iff(nnoise != 0, nsignal / nnoise, 0)
nsmooth = pow(nefratio * (nfastend - nslowend) + nslowend, 2) 
kama = nz(kama[1]) + nsmooth * (src - nz(kama[1]))

//PriceChannel
lasthigh = highest(src, len)
lastlow = lowest(src, len)
center = (lasthigh + lastlow) / 2

//Trend
ma = type == 1 ? sma(src, len) : type == 2 ? ema(src, len) : type == 3 ? vwma(src, len) : type == 4 ? dema : type == 5 ? tema : type == 6 ? kama : type == 7 ? center : 0
trend = low > ma ? 1 : high < ma ? -1 : trend[1]

//Bars
bar = close > open ? 1 : close < open ? -1 : 0
redbars = bars == 0 ? 1 : bars == 1 and bar == -1 ? 1 : bars == 2 and bar == -1 and bar[1] == -1 ? 1 : bars == 3 and bar == -1 and bar[1] == -1 and bar[2] == -1 ? 1 : 0
greenbars = bars == 0 ? 1 : bars == 1 and bar == 1 ? 1 : bars == 2 and bar == 1 and bar[1] == 1 ? 1 : bars == 3 and bar == 1 and bar[1] == 1 and bar[2] == 1 ? 1 : 0

//Signals
up = trend == 1 and (low < fastsma or usefastsma == false) and redbars == 1 ? 1 : 0
dn = trend == -1 and (high > fastsma or usefastsma == false) and greenbars == 1 ? 1 : 0

//Lines
colorfastsma = usefastsma == true ? red : na
plot(fastsma, color = colorfastsma, title = "Fast MA")
plot(ma, color = blue, linewidth = 3, transp = 0, title = "Slow MA")

//Trading
longCondition = up == 1
if (longCondition)
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na)

shortCondition = dn == 1
if (shortCondition)
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na)
```

> Detail

https://www.fmz.com/strategy/440999

> Last Modified

2024-02-04 15:57:12
