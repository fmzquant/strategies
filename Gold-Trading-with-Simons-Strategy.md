
> Name

Gold-Trading-with-Simons-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1abadaedd287e365fd6.png)

## Overview

This strategy combines moving average indicators, relative strength index (RSI) and engulfing patterns to conduct long and short trades on gold. It mainly uses the crossover of 21-day, 50-day and 200-day moving averages as the trading signal, with RSI indicator and engulfing patterns to filter additional entry signals for better optimization. 

## Strategy Logic

The strategy makes trading decisions based on the following aspects:

1. Moving Average Crossover

   The crossover between 21-day MA and 200-day MA is used as the primary indicator to determine trend reversal. Golden cross is buy signal while death cross is sell signal. 50-day MA is also used to filter out false signals.
   
2. RSI Indicator

   RSI overbought line at 70 and oversold line at 30 are configured. RSI needs to be below overbought level for long signal, and above oversold level for short signal, to avoid buying peaks and selling valleys.
   
3. Engulfing Pattern Confirmation

   Bullish engulfing pattern is required for long signal when golden cross happens. Bearish engulfing pattern needed for short signal when death cross occurs. This further confirms the trend reversal.

Trading signals are generated when all three conditions above are met. This forms a strict set of filters for the strategy.  

## Advantages

The biggest advantage lies in the comprehensive use of multiple parameters and indicators for decision making, which filters out incorrect signals well and reduces unnecessary stop loss. Specifically:

1. The moving average strategy itself has relatively good stability.

2. RSI settings prevent buying peaks and selling valleys.  

3. Engulfing patterns confirmation improves reliability in trend reversal judgement.
   
4. Smaller stop loss effectively controls risks.

## Risks 

While this strategy excels in signal filtering and risk control, it still contains some weaknesses and risks:

1. Complex parameter tuning requires significant efforts to find optimum combination.

2. Strict entry signals may miss some good opportunities.  

3. There will be certain lag in extremely volatile market conditions.

4. Long term stability and validity need further verification.

To address the above risks, we can fine tune parameters, optimize logic flows, incorporate other indicators etc. to improve the strategy.

## Optimization Opportunities 

Despite doing well in combining multiple indicators, this strategy still has space for optimization:

1. Further find optimum parameter sets through more backtesting. Assess different parameters' impact on results to determine a better parameter combination.

2. Incorporate other indicators like MACD, KD etc. to aid in judging trend reversal timing. This forms a more comprehensive indicator system.   

3. Enhance and refine stop loss mechanisms. Assess whether larger stop loss percentages can reduce unnecessary position changes. 

4. Test longer historical data sets to verify long term validity of the strategy. Examine stability across more years of varying market conditions.

## Conclusion
In conclusion, this strategy leverages a toolkit of technical analysis instruments like moving averages, RSI and engulfing patterns to conduct long short gold trades. Through parameter configuration and signal filtering, it establishes a relatively strict system to control risks to some extent. However, no strategy can be absolutely perfect. This strategy still has much room for optimization and directional improvement. In general it provides meaningful references for quantified trading, but should still be used discreetly with pragmatic adjustments when applied in practice.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|Length for 21 MA|
|v_input_2|50|Length for 50 MA|
|v_input_3|200|Length for 200 MA|
|v_input_4|14|RSI Length|
|v_input_5|70|RSI Overbought Level|
|v_input_6|30|RSI Oversold Level|
|v_input_7|4|Take Profit %|
|v_input_8|true|Stop Loss %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-01 00:00:00
end: 2024-02-29 23:59:59
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Gold Trading with Simons Strategy", overlay=true)

// Parameters
length21 = input(21, minval=1, title="Length for 21 MA")
length50 = input(50, minval=1, title="Length for 50 MA")
length200 = input(200, minval=1, title="Length for 200 MA")
rsiLength = input(14, minval=1, title="RSI Length")
rsiOverbought = input(70, title="RSI Overbought Level")
rsiOversold = input(30, title="RSI Oversold Level")
takeProfitPercent = input(4, title="Take Profit %")
stopLossPercent = input(1, title="Stop Loss %")

// Moving Averages
ma21 = sma(close, length21)
ma50 = sma(close, length50)
ma200 = sma(close, length200)

// RSI
rsi = rsi(close, rsiLength)

// Engulfing Pattern
isBullishCandle(c) => close[c] > open[c]
isBearishCandle(c) => close[c] < open[c]

bearishEngulfing = isBullishCandle(1) and isBearishCandle(0) and close < open[1] and open > close[1]
bullishEngulfing = isBearishCandle(1) and isBullishCandle(0) and close > open[1] and open < close[1]

// Calculate Take Profit and Stop Loss Levels
takeProfitLevel(entryPrice) => entryPrice * (1 + takeProfitPercent / 100)
stopLossLevel(entryPrice) => entryPrice * (1 - stopLossPercent / 100)

// Entry Conditions
longCondition = crossover(ma21, ma200) and close > ma21 and close > ma50 and rsi < rsiOverbought and bullishEngulfing
shortCondition = crossunder(ma21, ma200) and close < ma21 and close < ma50 and rsi > rsiOversold and bearishEngulfing

// Entry
if (longCondition)
    entryPrice = close
    strategy.entry("Long", strategy.long)
    strategy.exit("Take Profit", "Long", limit=takeProfitLevel(entryPrice))
    strategy.exit("Stop Loss", "Long", stop=stopLossLevel(entryPrice))
if (shortCondition)
    entryPrice = close
    strategy.entry("Short", strategy.short)
    strategy.exit("Take Profit", "Short", limit=takeProfitLevel(entryPrice))
    strategy.exit("Stop Loss", "Short", stop=stopLossLevel(entryPrice))

// Plotting
plot(ma21, color=color.blue, title="21 MA")
plot(ma50, color=color.orange, title="50 MA")
plot(ma200, color=color.red, title="200 MA")
hline(rsiOverbought, "RSI Overbought", color=color.green)
hline(rsiOversold, "RSI Oversold", color=color.red)
plot(rsi, "RSI", color=color.purple)
```

> Detail

https://www.fmz.com/strategy/443247

> Last Modified

2024-03-01 12:28:38
