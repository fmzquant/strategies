
> Name

Going-with-the-Trend-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ffbab85df56629181d.png)



## Overview

This strategy utilizes the golden cross and death cross of simple moving averages to determine entries and exits, going with the trend in a timely manner to capture turning points in market trends. It goes long when the shorter SMA crosses above the longer SMA, and goes short when the shorter SMA crosses below the longer SMA. This is a typical trend following system.

## Strategy Logic

1. Calculate the 10-day simple moving average (shortSMA) and 30-day simple moving average (longSMA) 

2. When shortSMA crosses above longSMA, a buy signal is generated

3. When shortSMA crosses below longSMA, a sell signal is generated

4. Require RSI to be above 50 for buy signals, and below 50 for sell signals, to avoid false breaks

5. Use ATR for stop loss and take profit trailing

The strategy mainly uses the crossover of two moving averages to determine entry timing, identifying trend inflection points. The shorter SMA reflects price changes faster, while the longer SMA provides support and resistance. When the shorter SMA crosses above the longer SMA, it indicates an uptrend start, so go long. When the shorter SMA crosses below the longer SMA, it indicates a downtrend start, so go short. RSI filters out false breaks. ATR stop loss and take profit trail price and optimize risk management.

## Advantage Analysis 

1. Simple to understand and learn

2. Follows market trend timely to capture turning points 

3. Dual moving average crossovers are classic and effective for trend determination

4. Rational stop loss and take profit reduces loss from individual segments

5. RSI filters out false breaks effectively, reducing trading risks

6. No need to predict, just follow the trend to profit

## Risk Analysis

1. Dual MAs can generate wrong signals, causing unnecessary losses

2. Delayed reaction of MAs, unable to timely catch trend reversals

3. Blindly following trends can amplify losses, position sizing needs control

4. Failure to fully filter choppy markets, prone to being trapped

5. Improper parameter settings increase trade frequency, reduce profitability

Risks can be reduced by choosing suitable parameter combinations, introducing other filters, controlling position sizing etc.

## Optimization Directions 

1. Optimize MA parameters to improve signal accuracy

2. Add other indicators like MACD, Bollinger Bands etc to improve strategy win rate

3. Incorporate trend-determining indicators to reduce trades in choppy markets

4. Optimize stop loss and take profit to minimize single loss and maximize single profit

5. Optimize capital management for different market conditions

6. Formulate separate strategies for trending and choppy markets

Continuous testing of different parameter sets, introducing auxiliary indicators for filtering and trend determination can steadily improve strategy performance. 

## Summary

This strategy employs the classic moving average crossover system to identify trend turning points for trading. It is very suitable for beginners to learn. But some weaknesses like false signals and lagging identification of reversals need to be noted. Through relentless testing and optimization of parameters, adding other indicators, the stability and profitability of the strategy can be enhanced. Most importantly, position sizing should be controlled to follow the trend trading principle, keeping losses within acceptable range and maximizing profits. Overall, the strategy logic is clear and easy to understand. It is worth researching further to improve practical trading performance.




> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-17 00:00:00
end: 2023-10-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Glenn234

//@version=5
strategy("MA cross strategy", shorttitle="macs", overlay=true)


// Create indicator's
shortSMA = ta.sma(close, 10)
longSMA = ta.sma(close, 30)
rsi = ta.rsi(close, 14)
atr = ta.atr(14)


// Crossover conditions
longCondition = ta.crossover(shortSMA, longSMA)
shortCondition = ta.crossunder(shortSMA, longSMA)


// trade conditions
if (longCondition)
    stopLoss = low - atr * 2
    takeProfit = high + atr * 2
    strategy.entry("long", strategy.long, when = rsi > 50)
    strategy.exit("exit", "long", stop=stopLoss, limit=takeProfit)

if (shortCondition)
    stopLoss = high + atr * 2
    takeProfit = low - atr * 2
    strategy.entry("short", strategy.short, when = rsi < 50)
    strategy.exit("exit", "short", stop=stopLoss, limit=takeProfit)


// Plot SMA to chart
plot(shortSMA, color=color.red, title="Short SMA")
plot(longSMA, color=color.green, title="Long SMA")
```

> Detail

https://www.fmz.com/strategy/430053

> Last Modified

2023-10-24 16:14:10
