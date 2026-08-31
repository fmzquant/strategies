
> Name

动量突破回测支持阻力策略Momentum-Breakout-Backtesting-Support-Resistance-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f095b3b11c68e3f733.png)

## Overview

This strategy mainly uses the previous trading day's high, low and close prices as the support and resistance levels for the current day. It goes long when the resistance level is broken and goes short when the support level is backtested. It belongs to a typical breakout strategy.

## Strategy Principle 

The code first defines a function calculateSupportResistance to calculate the support and resistance levels, which extracts the previous trading day's high, low and close prices as the current day's support and resistance levels.

Then in the main logic, this function is called to get these three price levels and plot them.

In the backtesting logic, if the close price is lower than the previous day's low while the current price is higher than that low forming a breakout, it goes long. If the close price is higher than the previous day's high while the current price is lower than that high forming a breakout, it goes short. 

Through this breakout model, the judgment of trend and generation of trading signals are implemented.

## Advantages

1. Use previous trading day's data to build current day's support and resistance levels, avoiding the parameter optimization problem

2. Support and resistance levels come from real market trading data, with some reference value

3. Simple and straightforward backtesting model, easy to understand and implement

4. Visual display of support and resistance levels forms perception of prices  

5. Real-time monitoring of breakouts, timely catching trading opportunities

## Risks

1. Support and resistance levels change over time, hard to determine validity

2. Unable to predict trend direction, risk of missing reversals 

3. Easily affected by false breakouts, premature entry risk

4. Unable to determine persistence of breakouts, early stop loss likely

5. Individual support and resistance failure more likely under huge market fluctuation

Countermeasures:

1. Combine more factors to judge validity of breakouts

2. Appropriately expand stop loss range to catch trends  

3. Open positions in batches, reduce impact of individual fluctuations

## Optimizations

1. Add more historical data like 5-day, 10-day lines to determine levels

2. Incorporate other indicators like volume to judge breakout validity  

3. Set stop loss based on actual volatility  

4. Optimize capital management, control single loss

## Summary

Overall this is a typical breakout strategy, simple and intuitive. By building current day's support and resistance with previous day's data and backtesting breakouts of those levels for long/short. Pros are easy to understand and directly visualize levels; cons are false breakout risks and uncertainty of persistence. Next steps are improving breakout validity, controlling risks, optimizing capital management etc.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-22 00:00:00
end: 2024-02-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Support and Resistance with Backtesting", overlay=true)

// Function to calculate support and resistance levels
calculateSupportResistance() =>
    highPrevDay = request.security(syminfo.tickerid, "D", high[1], lookahead=barmerge.lookahead_on)
    lowPrevDay = request.security(syminfo.tickerid, "D", low[1], lookahead=barmerge.lookahead_on)
    closePrevDay = request.security(syminfo.tickerid, "D", close[1], lookahead=barmerge.lookahead_on)
    [highPrevDay, lowPrevDay, closePrevDay]

// Call the function to get support and resistance levels
[supResHigh, supResLow, supResClose] = calculateSupportResistance()

// Plotting support and resistance levels
plot(supResHigh, color=color.red, linewidth=2, title="Previous Day High")
plot(supResLow, color=color.green, linewidth=2, title="Previous Day Low")
plot(supResClose, color=color.blue, linewidth=2, title="Previous Day Close")

// Backtesting logic
backtestCondition = close[1] < supResLow and close > supResLow
strategy.entry("Long", strategy.long, when=backtestCondition)

// Plotting buy/sell arrows for backtesting
plotarrow(backtestCondition ? 1 : na, colorup=color.green, offset=-1, transp=0)

```

> Detail

https://www.fmz.com/strategy/442528

> Last Modified

2024-02-22 16:07:14
