
> Name

20-Level-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b6445fbd5d2f07ec4a.png)

## Overview

The 20 level breakout strategy is a trend following strategy. Its core idea is that when the price breaks through a certain key level, it indicates a trend reversal. At this point, long or short positions can be established according to the direction of the breakout.  

This strategy chooses the 20-day moving average as the key level. When the closing price breaks through the 20-day moving average from above, go long; when the closing price breaks through the 20-day moving average from below, go short.

## Principles  

The 20 level breakout strategy uses the 20-day moving average to judge trend breakouts. When prices break through the 20-day moving average from top to bottom, it indicates a downward trend in the market, then we should go short. When prices break through the 20-day moving average from bottom to top, it indicates an upward trend in the market, then we should go long.

This strategy also incorporates the MACD indicator to determine market conditions. Short signals are only issued when the MACD is a red bar; Long signals are only issued when the MACD is a green bar. This avoids generating wrong signals during market consolidations. 

Specifically, the strategy logic is:

1. Define the 20-day moving average as the base line; 
2. When the closing price is higher than the base line +0.2% and the MACD condition is met, go long near the opening price on the day after the breakout;  
3. When the closing price is lower than the base line -0.2% and the MACD condition is met, go short near the opening price on the day after the breakout;
4. Set stop loss at 0.5% below base line and take profit at 1% above base line for long positions;
5. Set stop loss at 0.5% above base line and take profit at 1% below base line for short positions.  

With this setup, this strategy can capture opportunities in time when trend transitions occur, achieving the goal of tracking market trends.

## Advantage Analysis   

The 20 level breakout strategy has the following advantages:

1. Simple to implement. The calculation and judgment rules of 20-day moving average are very straightforward.  

2. Relatively small drawdowns. Using price breakouts as trading signals can effectively avoid unnecessary reverse operations.

3. Strong trend tracking capability. The 20-day moving average can reflect changes in medium-term trends very well. Combining MACD filters avoids wrongly establishing positions during trend consolidations.

## Risk Analysis

The 20 level breakout strategy also has the following risks:

1. When prices fluctuate violently, the 20-day moving average method will lag, possibly missing the best entry opportunity.  

2. In range-bound markets, prices may break through up and down frequently. If there is no good indicator filter, there will be too many invalid trades.

3. The strategy does not consider the amplitude of price fluctuations. If volatility indicators are not combined, there is a risk of excessive losses.  

4. Fixed stop loss and take profit levels will also affect the smooth operation of the strategy. This requires adjusting parameters according to different underlying assets.

## Optimization Directions   

The 20 level breakout strategy can be optimized in the following aspects:

1. Try moving averages with different periods, such as 10-day, 30-day, etc., to see which period can better grasp the trend.

2. Add volatility indicators to dynamically adjust positions based on the magnitude of price fluctuations. This can effectively control risks.  

3. Optimize stop loss and take profit positions. The optimal parameters can be calculated from historical backtest data.

4. Try combining other indicators such as KDJ, Bollinger Bands, etc. for signal filtering. This can reduce invalid trades.

5. Develop improved versions by finding larger trends on higher time frames first, and then entering on lower time frames.

## Conclusion  

The 20 level breakout strategy identifies trend turning points through price breakouts. It has the advantages of simple operation and strong trend tracking capability. But there are still some risks that need further optimization to adapt to market complexity. Overall, the 20 level breakout strategy, as a relatively basic trend following strategy, still has considerable room for improvement. Investors can continue to optimize it so that it can achieve steady returns in various market environments.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5


//@version=4
strategy("20 Level Breakout", overlay=true)

baseLevel = math.floor(close * 100) /100
eigthylevel = baseLevel - 0.002
twentyLevel = baseLevel + 0.002
takeprofitL = baseLevel - 0.01
stoplossL = baseLevel + 0.02 
takeprofitS = baseLevel + 0.015
stoplossS = baseLevel - 0.02

isPriceAboveLevel(price, level) =>
    price > level

breakout = close > twentyLevel and close > baseLevel
breakoutl = close < eigthylevel and close < baseLevel
// Entry condition: Only enter if there are no open trades and the close is between baseLevel and baseLevel + 0.01
isLong = breakout and close > baseLevel and close <= (baseLevel + 0.01) and ta.rsi(close, 14) > 40 and ta.ema(close,50)<close
isShort = breakoutl and close < baseLevel and close >= (baseLevel - 0.01)
// Debugging
plot(isLong ? 1 : 0, color=color.blue, style=plot.style_histogram)
plotshape(isLong, style=shape.triangledown, color=color.green, size=size.small)
plotshape(isShort, style = shape.triangleup, color =  color.red, size = size.small)
// Plotting the stop loss line
plot(stoplossL, color=color.red, linewidth=2, title="Take Profit")
plot(stoplossS, color=color.green, linewidth = 2, title = " Take Profit")
strategy.entry("Short", strategy.short, when=isLong, stop =twentyLevel)
strategy.exit("Stop Loss/Profit", "Short", stop = stoplossL , limit = takeprofitL)

strategy.entry("Long",strategy.long, when=isShort , stop = eigthylevel )
strategy.exit("Stop loss/Profit", "Long", stop = stoplossS , limit = takeprofitS)
```

> Detail

https://www.fmz.com/strategy/442868

> Last Modified

2024-02-26 17:27:50
