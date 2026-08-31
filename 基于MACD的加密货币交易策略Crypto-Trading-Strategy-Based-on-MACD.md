
> Name

基于MACD的加密货币交易策略Crypto-Trading-Strategy-Based-on-MACD

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses the Moving Average Convergence Divergence (MACD) and Relative Strength Index (RSI) indicators to identify trading signals for cryptocurrencies. It calculates the difference between short-term and long-term moving averages along with RSI to judge market trends and overbought/oversold levels for making trading decisions.

## Strategy Logic

1. Calculate 12-day EMA and 26-day EMA as short-term and long-term moving averages.

2. Calculate the difference between short and long EMAs as the MACD histogram. 

3. Calculate 9-day EMA of MACD as the signal line.

4. Calculate 14-day RSI to judge overbought/oversold levels.

5. Display buy signal when MACD crosses above signal line and RSI is greater than 81.

6. Display sell signal when MACD crosses below signal line and RSI is less than 27.

7. Use built-in strategy module for entries and exits.

## Advantage Analysis

1. MACD can identify trends and changes, RSI shows overbought/oversold levels. Combining both improves signal accuracy.

2. MACD above/below zero line indicates direction/strength of short-term vs long-term trend. 

3. RSI at high/low levels indicates possible overheating/oversold. Helps find trading signals.

4. Clear and simple trading signals, easy to execute trades systematically.

5. Customizable parameters for optimization and adapting to different market conditions.

## Risk Analysis

1. MACD and RSI data prone to false breakouts and anomalies, may generate incorrect signals.

2. Fixed parameters may fail to adapt to evolving markets, needs optimization.

3. Signals may lag, unable to trade at turning points. 

4. Only long/short, unable to profit from ranging markets.

## Optimization Directions

1. Test different parameter combinations to find optimum settings.

2. Add filters to avoid false breakout trades. 

3. Add stop loss to limit losses in one-sided markets.

4. Manage positions size, increase in trends and decrease in ranges.

5. Combine with other indicators for more accurate signals.

6. Test on different instruments and timeframes.

## Summary

This strategy utilizes the complementary strengths of MACD and RSI to identify trends and trading signals. Fine tuning parameters and adding filters can improve robustness and profitability. Adjusting stops and position sizing also helps maximize profits and minimize risk. The pros and cons of MACD and RSI make this strategy more suitable for catching mid-to-long term trends rather than short-term trades. Overall, it is a simple and practical strategy worth further testing and optimization to achieve improved backtest and live results.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Invert Trade Direction?|
|v_input_2|true|From Month|
|v_input_3|true|From Day|
|v_input_4|2017|From Year|
|v_input_5|2|To Month|
|v_input_6|10|To Day|
|v_input_7|2019|To Year|
|v_input_8|20000|Take Profit|
|v_input_9|1500|Stop Loss|
|v_input_10|100|Trailing Stop Loss|
|v_input_11|false|Trailing Stop Loss Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-12 04:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// Revision:        5
// Author:          @Hugo_Moriceau
//study("Thesis_EMLYON_Withdate-strategies-Daily_Crypto_Moriceau_indicator",overlay=true)

// Pyramide 10 order size 100, every tick

strategy("Daily_Crypto_Moriceau_indicator",overlay=true)

// === GENERAL INPUTS ===

fast = 12, slow = 26
fastMA = ema(close, fast)
slowMA = ema(close, slow)

macd = fastMA - slowMA
signal = sma(macd, 9)
rsi = rsi(close,14)



tradeInvert     = input(defval = false, title = "Invert Trade Direction?")

// === LOGIC ===

// is fast ma above slow ma?
aboveBelow = fastMA >= slowMA ? true : false

// are we inverting our trade direction?
tradeDirection = tradeInvert ? aboveBelow ? false : true : aboveBelow ? true : false

// === Plot Setting ===

//plot(fastMA,color=red)
//plot(slowMA,color=blue)
//barcolor(color=iff(fastMA > slowMA, yellow, na))
//barcolor(color=iff(fastMA < slowMA, black, na))
barcolor(color=iff(macd > 0.12*close , fuchsia, na))
barcolor(color=iff(macd < -0.1*close , lime, na))
dataS= macd > 0.125 and rsi>81 and fastMA > slowMA
dataB= macd < -0.1  and rsi<27 and fastMA< slowMA


plotchar(dataB, char='B',color=black,size = size.tiny,location = location.belowbar,transp= 0)  
plotchar(dataS, char='S',color=black,size = size.tiny,location = location.abovebar,transp= 0)


// === BACKTEST RANGE ===
FromMonth = input(defval = 01, title = "From Month", minval = 1)
FromDay   = input(defval = 01, title = "From Day", minval = 1)
FromYear  = input(defval = 2017, title = "From Year", minval = 2014)
ToMonth   = input(defval = 2, title = "To Month", minval = 1)
ToDay     = input(defval = 10, title = "To Day", minval = 1)
ToYear    = input(defval = 2019, title = "To Year", minval = 2018)


// === STRATEGY RELATED INPUTS ===+
// the risk management inputs
inpTakeProfit   = input(defval = 20000, title = "Take Profit", minval = 0)
inpStopLoss     = input(defval = 1500, title = "Stop Loss", minval = 0)
inpTrailStop    = input(defval = 100, title = "Trailing Stop Loss", minval = 0)
inpTrailOffset  = input(defval = 0, title = "Trailing Stop Loss Offset", minval = 0)

// === RISK MANAGEMENT VALUE PREP ===

// if an input is less than 1, assuming not wanted so we assign 'na' value to disable it.

useTakeProfit   = inpTakeProfit  >= 1 ? inpTakeProfit  : na
useStopLoss     = inpStopLoss    >= 1 ? inpStopLoss    : na
useTrailStop    = inpTrailStop   >= 1 ? inpTrailStop   : na
useTrailOffset  = inpTrailOffset >= 1 ? inpTrailOffset : na


// === STRATEGY - LONG POSITION EXECUTION ===

enterLong() => not tradeDirection[1] and tradeDirection 
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

https://www.fmz.com/strategy/427239

> Last Modified

2023-09-19 11:21:42
