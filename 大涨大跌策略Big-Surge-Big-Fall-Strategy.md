
> Name

大涨大跌策略Big-Surge-Big-Fall-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1204bdebcff1f60dfad.png)



## Overview

The Big Surge Big Fall strategy detects huge bullish and bearish candlesticks to enter positions. It goes short when detecting a huge bullish candlestick and goes long when detecting a huge bearish candlestick. The stop loss is placed below the low of the signal candlestick (vice versa for long), and take profit is set at 1 times the stop loss. Users can define the minimum size of bullish/bearish candlesticks, and the multiple of average bar range over certain periods. 

## Strategy Logic

The core logic of this strategy is:

1. Calculate the current candlestick range (high - low) and candlestick body size (positive if close > open, negative if close < open)

2. Calculate the average range over the past N candlesticks

3. Check if the current candlestick satisfies: range >= average range x multiple AND body size >= range x min body size coefficient 

4. If above conditions are met, a signal is triggered: go short on bullish candlestick, go long on bearish candlestick

5. Option to enable stop loss and take profit: Stop loss at low plus stop loss coefficient x range; Take profit at 1 x stop loss

The body size filter excludes doji. The dynamic average range adapts to market changes. The stop loss and take profit allows reasonable drawdown control.

## Advantages

The biggest advantage of this strategy is catching high quality trend reversal signals, based on two judgments:

1. The huge bullish/bearish candlestick likely indicates a trend is exhausted after extended move

2. The abnormally large range exceeding dynamic average confirms significance 

In addition, the stop loss and take profit settings are sensible, allowing effective loss control while not chasing.

Overall, this strategy succeeds in identifying high quality structural turning points, enabling efficient execution. It suits trend followers by avoiding getting caught in corrections.

## Risks

The main risks come from two aspects:

1. Huge bars could be stop loss hunting, creating false signals

2. Stop loss may be too wide to effectively control loss

For the first risk, adding minimum size filters can reduce false signals but also miss opportunities. Backtests are needed to optimize parameters. 

For the second risk, adjusting stop loss coefficient can optimize stops near supports without being too tight. Also consider increasing take profit ratio to compensate loss from stops.

## Enhancement Opportunities 

There are several ways this strategy can be further improved:

1. Add trend direction filter to avoid counter-trend trades

2. Optimize parameters through backtesting to find best combination

3. Add volume filter to ensure high volume on huge candlesticks 

4. Consider additional filters like moving average, Bollinger Bands to reduce false signals

5. Test parameters across different products for optimization

6. Add trailing stop loss for dynamic adjustment based on price action

7. Consider re-entry opportunities after initial stop loss

With the above enhancements, this strategy can become much more effective and improve probability of profit. Extensive backtesting and optimization is needed to find optimum parameters.

## Conclusion

The Big Surge Big Fall strategy profits from huge candlesticks reversals with stop loss and take profit management. It successfully identifies high quality structural turning points, providing valuable information for trend traders. With parameter and logic optimization, this strategy can become a practical decision tool. Its simple logic and intuitive economics also makes it easy to understand and apply. Overall, this strategy provides a solid framework worth researching and implementing.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Direction (Long=1, Both=0, Short=-1 |
|v_input_2|true|SL Mult|
|v_input_3|true|TP Mult|
|v_input_4|0.5|Bar Body Size|
|v_input_5|10|period|
|v_input_6|2|Big Size Avg Mult to determine Big Bar|
|v_input_7|false|Reverse Trades|
|v_input_8|false|Use SL / TP|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-06 00:00:00
end: 2023-11-05 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © tweakerID

// This strategy detects and uses big bars to enter a position. When the Big Bar 
// is bearish (red candle) the position will be long and viceversa
// for short positions. The stop loss (optional) is placed on the low of the 
// candle used to trigger the position and user inputs allow you to modify the
// size of the SL. Take profit is placed on a reward ratio of 1. User can also modify 
// the size of the bar body used to determine if we have a real Big Bar and
// filter out Doji bars. Big Bars are determined relative to the previous X period size, 
// which can also be modified, as well as the required size of the Big Bar relative to this period average.

//@version=4
strategy("Big Bar Strategy", overlay=false)

direction = input(0, title = "Direction (Long=1, Both=0, Short=-1 ", type=input.integer, minval=-1, maxval=1)
strategy.risk.allow_entry_in(direction == 0 ? strategy.direction.all : (direction < 0 ? strategy.direction.short : strategy.direction.long))

//Inputs
barsizemult=input(1, step=.1, title="SL Mult")
TPbarsizemult=input(1, step=.1, title="TP Mult")
barsizeThreshold=input(.5, step=.1, minval=.5, maxval=.9, title="Bar Body Size")
period=input(10)
mult=input(2, step=.2, title="Big Size Avg Mult to determine Big Bar")
i_reverse=input(false, title="Reverse Trades")
SLon=input(false, title="Use SL / TP")

//Calculations
barsize=high-low
barbodysize=close>open?(open-close)*-1:(open-close)
barsizeavg=sum(barsize, period)/period
bigbar=barsize >= barsizeavg*mult and barbodysize>barsize*barsizeThreshold

//Entry Logic
longCondition = close < open and bigbar //and strategy.position_size==0
shortCondition = close > open and bigbar //and strategy.position_size==0

//SL & TP Calculations
longTP=strategy.position_avg_price + (valuewhen(longCondition,barsize,0)*TPbarsizemult)
longSL=strategy.position_avg_price - (valuewhen(longCondition,barsize,0)*barsizemult)
shortTP=strategy.position_avg_price - (valuewhen(shortCondition,barsize,0)*TPbarsizemult)
shortSL=strategy.position_avg_price + (valuewhen(shortCondition,barsize,0)*barsizemult)
TP=strategy.position_size>0?longTP:shortTP
SL=strategy.position_size>0?longSL:shortSL

//Entries
if (longCondition)
    strategy.entry("long", long=not i_reverse?true:false)
    alert("Big Bar")
if (shortCondition)
    strategy.entry("short", long=not i_reverse?false:true)
    alert("Big Bar")
if SLon
    strategy.exit("SL & TP", "long", stop=SL, limit=TP)
    strategy.exit("SL & TP", "short", stop=SL, limit=TP)
    
// Plots
barcolor(bigbar ? color.white : na)
plot(barsizeavg, transp=100, title="Barsize Avg")
plot(barsize, transp=100, title="Bar Size")
plot(barbodysize, transp=100, title="Bar Body Size")
plot(SLon?TP:na, color=color.green, style=plot.style_cross, title="TP")
plot(SLon?SL:na, color=color.red, style=plot.style_cross, title="SL")
plotshape(longCondition ? 1 : na, style=shape.triangleup, location=location.belowbar, color=color.green, title="Bullish Setup")
plotshape(shortCondition ? 1 : na, style=shape.triangledown, location=location.abovebar, color=color.red, title="Bearish Setup")


```

> Detail

https://www.fmz.com/strategy/431267

> Last Modified

2023-11-06 15:48:22
