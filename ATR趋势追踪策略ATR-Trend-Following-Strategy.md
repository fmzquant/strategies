
> Name

ATR趋势追踪策略ATR-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy uses the Average True Range (ATR) indicator to determine the trend direction. It goes long when the trend goes up and goes short when the trend goes down. It belongs to the trend following strategy type.  

## Strategy Logic

The strategy first calculates the simple moving average (sma) and exponential moving average (ema) of the price. Then it calculates the ATR indicator, which is the average range of price movement over the past N days.

The strategy uses the ema average line, upper band (ema + ATR * coefficient) and lower band (ema - ATR * coefficient) to determine the trend direction. It goes long when the price breaks above the upper band, and goes short when the price breaks below the lower band.

Main logic in the code:

1. Calculate price sma and ema averages  
2. Calculate ATR average range
3. Calculate upper and lower bands
4. Determine long signal: price breaks above upper band
5. Determine short signal: price breaks below lower band 
6. Set stop loss to close positions: price breaks below upper band to close longs; price breaks above lower band to close shorts.

By dynamically adjusting positions based on ATR, it can effectively follow trend directions.

## Advantages

1. Using ATR to determine trend direction can effectively capture price trends
2. Stop loss based on moving averages can reasonably control risks  
3. Simple and clear strategy logic, easy to understand and implement
4. Flexible configurable parameters, adaptable to different market environments

## Risks

1. ATR indicator will fail in highly volatile sideways markets
2. Improper parameter settings may cause too frequent trading
3. Sudden reversals can make stop loss invalid  
4. Higher trading costs require adjustment for tracking settings

Solutions:
1. Pause strategy or use other indicators in high volatility
2. Optimize parameters to reduce trading frequency
3. Increase stop loss ratio for major data events
4. Adjust ATR range based on specific products  

## Improvement Directions

1. Combine with trend indicators to optimize parameters, e.g. add MACD for trend  
2. Add filters like Bollinger Bands for entry
3. Optimize stop loss methods, like trailing stop or exit indicators
4. Optimize ATR range based on specific products
5. Add risk management like fixed fractional position sizing  
6. Dynamically optimize parameters using machine learning

## Summary

The ATR trend following strategy has clear logic to determine trend direction using ATR. It is a typical trend following system. The advantages are simplicity and ability to follow trends. But it also has risks that require optimizations for different markets. Overall, it has great potential and value as a quantitative trading tool.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|26|Length|
|v_input_2|2.618|Length|
|v_input_3|2.386|Length|
|v_input_4|8|From Month|
|v_input_5|18|From Day|
|v_input_6|2008|From Year|
|v_input_7|true|To Month|
|v_input_8|true|To Day|
|v_input_9|2020|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-28 00:00:00
end: 2023-09-27 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Investoz

//@version=4
strategy("ATR Strategy FOREX", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

len = input(26, type=input.integer, minval=1, title="Length")
mul = input(2.618, type=input.float, minval=0, title="Length")
mullow = input(2.386, type=input.float, minval=0, title="Length")

price = sma(close, 1)
average = ema(close, len)
diff = atr(len) * mul
difflow = atr(len) * mullow

bull_level = average + diff
bear_level = average - difflow
bull_cross = crossunder(price, bear_level)
bear_cross = crossunder(bull_level, price)

FromMonth = input(defval = 8, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 18, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2008, title = "From Year", minval = 2008)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 2020, title = "To Year", minval = 2019)

start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)       
startTimeOk()  => true

if (startTimeOk()) and ema(close,1) > ema(close,528)
    strategy.entry("KOP", strategy.long, when=bull_cross) 
    strategy.close("KOP", when=bear_cross)  
if (startTimeOk()) and ema(close,1) < ema(close,528)
   strategy.entry("SALJ", strategy.short, when=bear_cross) 
   strategy.close("SALJ", when=bull_cross)

plot(price, title="price", color=color.black, transp=50, linewidth=2)
a0 = plot(average, title="average", color=color.red, transp=50, linewidth=1)
a1 = plot(bull_level, title="bull", color=color.green, transp=50, linewidth=1)
a2 = plot(bear_level, title="bear", color=color.red, transp=50, linewidth=1)
fill(a0, a1, color=color.green, transp=97)
fill(a0, a2, color=color.red, transp=97)
```

> Detail

https://www.fmz.com/strategy/428064

> Last Modified

2023-09-28 11:32:09
