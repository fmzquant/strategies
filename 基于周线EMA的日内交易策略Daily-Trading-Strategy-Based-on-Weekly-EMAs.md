
> Name

基于周线EMA的日内交易策略Daily-Trading-Strategy-Based-on-Weekly-EMAs

> Author

ChaoZhang

> Strategy Description


## Overview

The core idea of this strategy is to map the EMA indicators from weekly timeframe to daily trading, in order to get support from longer term trends and guide daily trading decisions.

## Strategy Principle 

The strategy first calculates the 6-day, 12-day, 26-day, 52-day EMAs on the daily chart, as well as the 42-day, 84-day, 182-day, 364-day EMAs corresponding to weekly EMA parameter settings.

Then, the crosses of 42-day EMA and 84-day EMA are used to determine the long-term trend; the crosses of 84-day EMA and 182-day EMA are used to determine the medium-term trend.

When shorter period EMA crosses above longer period EMA, go long; when shorter period EMA crosses below longer period EMA, close positions.  

Through this mapping method, we get support from weekly level EMA indicators in daily trading, which helps filter some noise and capture larger trend opportunities.

## Advantage Analysis

This strategy combines the flexibility of daily trading and the stability of weekly EMAs, with the following advantages:

1. Weekly EMAs can effectively filter market noise and identify real trend moves. Daily trading can then choose more precise entry based on daily formations.

2. Weekly EMA parameters are more stable, less affected by short-term price fluctuations. At the same time, daily formations combined with trend judgment result in more timely exits.

3. EMA crosses can clearly identify cyclical trend reversal points. Profiting from them through daily trading leads to relatively high win rate. 

4. Different period EMA combinations capture trend opportunities across long, medium and short terms.

5. The strategy has low trading frequency, suitable for long holding. It reduces slippage cost from excessive trading.

## Risk Analysis

The main risks of this strategy are:

1. Weekly EMA entry signals may lag, unable to catch the earliest price change timing. 

2. Exits rely on EMA crosses, without considering formations, volatility etc, may lead to premature exit.

3. Few EMA crosses tend to result in over extended one-sided holding. 

4. No stop loss means high drawdown risk, requires active human management.

5. Coarse parameter tuning, needs adjustment for optimal performance on different coins.

Risks can be reduced through:

1. Identify entry formations with other indicators, take positions ahead of EMA signals.

2. Add exit rules like stop loss, take profit to avoid over holding.

3. Optimize EMA periods, test suitable period combos for different coins. 

4. Multi-tier trading, different EMAs for layered positions, lower one-sided holding risk.

## Optimization Directions

The strategy can be further optimized in the following aspects:

1. Add rules on daily entry, like formations, volume etc to filter noise.

2. Combine stoch, MACD to judge overbought-oversold for finer entry/exit.

3. Add stop loss, take profit to lower drawdown, lock in profit.

4. Optimize EMA periods, test combos of different periods.

5. Try different EMAs like DEMA, TEMA for smoother parameters.

6. Add position sizing based on different EMA signals. 

7. Research parameters for different trading pairs.

8. Explore machine learning methods for dynamic EMA optimization.

## Conclusion

This is an excellent trend following strategy suitable for long-term holding. It cleverly combines weekly trend judgment and daily execution. With proper enhancements, it can become a very practical multi-timeframe trading system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2017|From Year|
|v_input_4|true|To Month|
|v_input_5|true|To Day|
|v_input_6|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=1

strategy("Investing Weekly mapped to Daily", overlay=true,  pyramiding=100)


// === PLOTTING EMA ===

plot(ema(close, 6), color=aqua, transp=0, linewidth=2, title="ema6")
plot(ema(close, 12), color=white, transp=0, linewidth=2, title="ema12")
plot(ema(close, 26), color=#9802FF, transp=0, linewidth=2, title="ema26")
plot(ema(close, 52), color=orange, transp=0, linewidth=2, title="ema52")
plot(ema(close, 42), color=aqua, transp=0, linewidth=5, title="W-ema6")
plot(ema(close, 84), color=white, transp=0, linewidth=5, title="W-ema12")
plot(ema(close, 182), color=#9802FF, transp=0, linewidth=5, title="W-ema26")
plot(ema(close, 364), color=orange, transp=0, linewidth=5, title="W-ema52")


// === INPUT BACKTEST RANGE ===

FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2017, title = "From Year", minval = 2017)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2017)

start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"


// === STRATEGY FOR CRYPTO ===

ema42= ema(close, 42)
ema84= ema(close, 84)
ema182= ema(close, 182)

enterLong1 = cross(ema42, ema84) and ema42 > ema84
exitLong1 = cross(ema42, ema84) and ema42 < ema84

enterLong2 = cross(ema84, ema182) and ema84 > ema182
exitLong2 = cross(ema84, ema182) and ema84 < ema182


strategy.entry(id="Entry_1", long=true, when=enterLong1)
strategy.entry(id="Entry_2", long=true, when=enterLong2)
strategy.entry(id="Exit_1", long=false, when=exitLong1)
strategy.entry(id="Exit_2", long=false, when=exitLong2)

```

> Detail

https://www.fmz.com/strategy/427398

> Last Modified

2023-09-20 17:11:52
