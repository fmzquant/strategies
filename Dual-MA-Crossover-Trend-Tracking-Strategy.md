
> Name

Dual-MA-Crossover-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1afddbdb85ac7f60eaa.png)

## Overview

This strategy adopts the typical trend tracking method of dual moving average crossover, combined with risk management mechanisms such as stop loss, take profit, and trailing stop loss, aiming to capture large profits from trending markets.

## Strategy Logic

1. Calculate the n-day EMA as the fast line for short term;  
2. Calculate the m-day EMA as the slow line for long term;
3. Go long when the fast line breaks through the slow line upwards, and go short when breaks downwards;  
4. Exit signal: reverse crossover (e.g. exit long when long crossover occurs).
5. Use stop loss, take profit, trailing stop loss to manage risks.

## Advantage Analysis  

1. Adopting dual EMA lines can better determine price trend reversal points and capture trending moves.
2. Combining stop loss, take profit and trailing stop helps limit single trade loss, lock in profits and reduce drawdown.
3. There are many customizable parameters to adjust and optimize for different products and market environments.  
4. The strategy logic is simple and clear, easy to understand and modify.
5. Support both long and short operations, adaptable to different market conditions.

## Risk Analysis

1. Dual MA strategies are very sensitive to false breakouts and prone to being trapped.
2. Improper parameter settings may lead to frequent trading, increasing trading costs and slippage losses. 
3. The strategy itself cannot determine trend reversal points, needs to be combined with other indicators.  
4. It’s easy to generate trading signals in ranging markets, but actual profitability tends to be low.
5. Parameters need to be optimized for different products and market environments.

Risks can be reduced by:
1. Filtering false signals with other indicators.  
2. Optimizing parameters to lower trading frequency. 
3. Adding trend-judging indicators to avoid range-bound market trades.
4. Adjusting position sizing to lower single trade risks.  

## Optimization Directions  

The strategy can be optimized in the following aspects:

1. Optimize fast and slow MA periods for different products and markets.  
2. Add other indicators to determine trends and filter false signals, e.g MACD, KDJ etc.
3. Consider replacing EMA with SMA or WMA.  
4. Dynamically adjust stop loss based on ATR.
5. Flexibly adjust single position sizes based on position sizing methodology. 
6. Parameter self-adaptive optimization based on correlation and volatility metrics.

## Summary

In summary, this is a typical dual EMA crossover trend tracking strategy. It has the advantage of capturing trending moves, integrated with risk management mechanisms like stop loss, take profit and trailing stop loss. But it also has some typical weaknesses, like high sensitivity toward noise and range-bound markets, prone to being trapped. Further improvements can be made by introducing additional indicators, parameters optimization, dynamic adjustments and portfolio usage to enhance the strategy's performance. Overall speaking, with proper parameter tuning and good fitness with product and market conditions, this strategy can achieve decent results.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_open|0|Fast MA Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|14|Fast MA Period|
|v_input_3_open|0|Slow MA Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|21|Slow MA Period|
|v_input_5|false|Invert Trade Direction?|
|v_input_6|1000|Take Profit|
|v_input_7|200|Stop Loss|
|v_input_8|200|Trailing Stop Loss|
|v_input_9|false|Trailing Stop Loss Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-12-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2

strategy(title = "Strategy Code Example", shorttitle = "Strategy Code Example", overlay = true)

// Revision:        1
// Author:          @JayRogers
//
// *** THIS IS JUST AN EXAMPLE OF STRATEGY RISK MANAGEMENT CODE IMPLEMENTATION ***

// === GENERAL INPUTS ===
// short ma
maFastSource   = input(defval = open, title = "Fast MA Source")
maFastLength   = input(defval = 14, title = "Fast MA Period", minval = 1)
// long ma
maSlowSource   = input(defval = open, title = "Slow MA Source")
maSlowLength   = input(defval = 21, title = "Slow MA Period", minval = 1)

// === STRATEGY RELATED INPUTS ===
tradeInvert     = input(defval = false, title = "Invert Trade Direction?")
// the risk management inputs
inpTakeProfit   = input(defval = 1000, title = "Take Profit", minval = 0)
inpStopLoss     = input(defval = 200, title = "Stop Loss", minval = 0)
inpTrailStop    = input(defval = 200, title = "Trailing Stop Loss", minval = 0)
inpTrailOffset  = input(defval = 0, title = "Trailing Stop Loss Offset", minval = 0)

// === RISK MANAGEMENT VALUE PREP ===
// if an input is less than 1, assuming not wanted so we assign 'na' value to disable it.
useTakeProfit   = inpTakeProfit  >= 1 ? inpTakeProfit  : na
useStopLoss     = inpStopLoss    >= 1 ? inpStopLoss    : na
useTrailStop    = inpTrailStop   >= 1 ? inpTrailStop   : na
useTrailOffset  = inpTrailOffset >= 1 ? inpTrailOffset : na

// === SERIES SETUP ===
/// a couple of ma's..
maFast = ema(maFastSource, maFastLength)
maSlow = ema(maSlowSource, maSlowLength)

// === PLOTTING ===
fast = plot(maFast, title = "Fast MA", color = green, linewidth = 2, style = line, transp = 50)
slow = plot(maSlow, title = "Slow MA", color = red, linewidth = 2, style = line, transp = 50)

// === LOGIC ===
// is fast ma above slow ma?
aboveBelow = maFast >= maSlow ? true : false
// are we inverting our trade direction?
tradeDirection = tradeInvert ? aboveBelow ? false : true : aboveBelow ? true : false

// === STRATEGY - LONG POSITION EXECUTION ===
enterLong() => not tradeDirection[1] and tradeDirection // functions can be used to wrap up and work out complex conditions
exitLong() => tradeDirection[1] and not tradeDirection
strategy.entry(id = "Long", long = true, when = enterLong()) // use function or simple condition to decide when to get in
strategy.close(id = "Long", when = exitLong()) // ...and when to get out
// === STRATEGY - SHORT POSITION EXECUTION ===
enterShort() => tradeDirection[1] and not tradeDirection
exitShort() => not tradeDirection[1] and tradeDirection
strategy.entry(id = "Short", long = false, when = enterShort())
strategy.close(id = "Short", when = exitShort())

// === STRATEGY RISK MANAGEMENT EXECUTION ===
// finally, make use of all the earlier values we got prepped
strategy.exit("Exit Long", from_entry = "Long", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
strategy.exit("Exit Short", from_entry = "Short", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)

```

> Detail

https://www.fmz.com/strategy/436145

> Last Modified

2023-12-21 16:10:22
