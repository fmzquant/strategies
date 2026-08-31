
> Name

Volatility-Force-Breakthrough-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fe91028c2cc78aaa45.png)


## Overview

This strategy uses moving average, ATR, Bollinger Bands for trend judgment and breakout trading, combined with force index for timing, belongs to breakout trading strategy.

## Strategy Logic

1. Calculate middle, upper and lower lines of Bollinger Bands. Middle line is sma of close price, upper and lower are middle line ± stdDev.

2. Calculate fast and slow ATR. Fast ATR has period of 20, slow ATR has period of 50.

3. Calculate force index XFORCE, which is cumulative of volume * (close - previous close). And calculate fast and slow EMA of XFORCE.

4. Judge long signal: fast XFORCE cross above slow XFORCE, and fast ATR > slow ATR, and close > open. 

5. Judge short signal: fast XFORCE cross below slow XFORCE, and fast ATR > slow ATR, and close < open.

6. Go long when long signal triggered, go short when short signal triggered.

## Advantage Analysis

1. Moving average provides trend, Bollinger Bands provides breakout points.

2. ATR judges volatility, implements volatility trading.

3. Force index determines force direction, implements force breakout. 

4. Combination of multiple indicators provides comprehensive judgment.

5. Clear and simple rules, easy to understand and implement.

6. Good backtest results, stable profit.

## Risk Analysis

1. Bollinger Bands may generate wrong signals if width is improper.

2. Wrong ATR parameters cannot catch market volatility.

3. Force index has limited effect, cannot determine real trend reversal.

4. Difficult to adjust parameters and weights for multiple indicators.

5. Breakout signals may be inaccurate, divergence may happen. 

6. Drawdown may be large, can use stop loss to control it.

## Optimization Directions

1. Optimize Bollinger Bands parameters for different periods and instruments.

2. Optimize ATR parameters to better capture volatility.

3. Add trend indicators like MACD for trend validation. 

4. Add stop loss strategies like trailing stop to control drawdown.

5. Utilize AI algorithms to judge reversal signals.

6. Combine multiple timeframes for comprehensive judgment and lower false signals.

## Summary

This strategy integrates moving average, ATR, Bollinger Bands and Force Index to form a complete breakout trading system. Further improvements on parameters optimization, adding trend filter, stop loss strategy and AI algorithms can enhance stability and profitability. But no strategy is perfect, continuous optimizations against backtest results are needed to adapt to changing market conditions.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Fast|
|v_input_2|20|Slow|
|v_input_3|20|ATR Fast|
|v_input_4|50|ATR Slow|
|v_input_5|20|Length|
|v_input_6|2|multiplier|
|v_input_7_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-25 00:00:00
end: 2023-10-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("yuthavithi volatility based force trade scalper strategy", overlay=true)

fast = input(3, minval= 1, title="Fast")
slow = input(20, minval = 1, title = "Slow")
atrFast = input(20, minval = 1, title = "ATR Fast")
atrSlow = input(50, minval = 1, title = "ATR Slow")

len = input(20, minval=1, title="Length")
multiplier = input(2, minval=1, title="multiplier")
src = input(close, title="Source")
bbMid = sma(src, len)
plot(bbMid, color=blue)

atrFastVal = atr(atrFast)
atrSlowVal = atr(atrSlow)
stdOut = stdev(close, len)
bbUpper = bbMid + stdOut * multiplier
bbLower = bbMid - stdOut * multiplier
plot(bbUpper, color = (atrFastVal > atrSlowVal ? red : silver))
plot(bbLower, color = (atrFastVal > atrSlowVal ? red : silver))


force = volume * (close -  nz(close[1]))
xforce = cum(force)
xforceFast = ema(xforce, fast)
xforceSlow = ema(xforce, slow)

bearish = ((xforceFast < xforceSlow) and (atrFastVal > atrSlowVal)) and ((xforceFast[1] > xforceSlow[1]) or (atrFastVal[1] < atrSlowVal[1])) and (close < open)
bullish = ((xforceFast > xforceSlow) and (atrFastVal > atrSlowVal)) and ((xforceFast[1] < xforceSlow[1]) or (atrFastVal[1] < atrSlowVal[1])) and (close > open)


if (bullish)
    strategy.entry("Buy", strategy.long)

if (bearish)
    strategy.entry("Sell", strategy.short)
```

> Detail

https://www.fmz.com/strategy/430261

> Last Modified

2023-10-26 16:17:17
