
> Name

Buy-Monday-Sell-Tuesday-with-Stop-Loss-Take-Profit-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

The main idea of this strategy is to buy on Monday market close and set stop loss and take profit points to exit the position before Tuesday market close. It belongs to short-term trading strategies.

## Strategy Principle

The strategy is based on two judgements:

1. Entry signal: It is Monday and within 1 hour before market close, go long.

2. Exit signal: It is Tuesday and within 1 hour before market close, close position.

It also sets stop loss and take profit points. Stop loss is set at entry price * (1 - stop loss percentage). Take profit is set at entry price * (1 + take profit percentage). 

If stop loss and take profit are not triggered, it will exit at Tuesday market close.

## Advantage Analysis

The advantages of this strategy are:

1. Short period allows fast turnover.

2. Clear entry and exit rules. 

3. Stop loss and take profit controls risk.

4. Utilizes trend effect before Monday close and Tuesday close to improve profitability.

## Risk Analysis

The main risks are:

1. Cannot adapt to different market conditions, prone to fail.

2. Does not consider overall trend direction, may trade against trend.

3. Stop loss setting may be unreasonable, too wide or too narrow. 

4. Does not consider instrument characteristics, trades blindly.

## Optimization Directions

It can be optimized in the following aspects:

1. Incorporate high timeframe trend indicators to avoid counter trend trades.

2. Optimize stop loss and take profit ratios to find optimum parameters.

3. Consider instrument characteristics like volatility, trade frequency etc.

4. Add conditions like volume breakout, divergence indicators to improve filtration. 

5. Test parameter robustness across different instruments to check stability.

## Summary

Overall this is a short-term cycle trading strategy with some merits but also room for improvement. Further optimizing parameters, entry conditions, combining higher timeframe trends can improve profitability. But overall it remains a short-term trading strategy, cannot fully avoid being caught in traps. Investors need to use it cautiously.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|4|StopLoss %|
|v_input_float_2|3|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-12 00:00:00
end: 2023-02-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © processingclouds

// @description Strategy to go long at end of Monday and exit by Tuesday close, or at stop loss or take profit percentages  

//@version=5
strategy("Buy Monday, Exit Tuesday", "Mon-Tue Swings",overlay=true)

//  ----- Inputs: stoploss %, takeProfit %
stopLossPercentage = input.float(defval=4.0, title='StopLoss %', minval=0.1, step=0.2) / 100
takeProfit = input.float(defval=3.0, title='Take Profit %', minval=0.3, step=0.2) / 100

//  ----- Exit and Entry Conditions - Check current day and session time
isLong = dayofweek == dayofweek.monday  and not na(time(timeframe.period, "1400-1601"))
isExit = dayofweek == dayofweek.tuesday and not na(time(timeframe.period, "1400-1601"))

//  ----- Calculate Stoploss and Take Profit values
SL = strategy.position_avg_price * (1 - stopLossPercentage)
TP = strategy.position_avg_price * (1 + takeProfit)

//  ----- Strategy Enter, and exit when conditions are met
strategy.entry("Enter Long", strategy.long, when=isLong)
if strategy.position_size > 0 
    strategy.close("Enter Long", isExit)
    strategy.exit(id="Exit", stop=SL, limit=TP)

//  ----- Plot Stoploss and TakeProfit lines
plot(strategy.position_size > 0 ? SL : na, style=plot.style_linebr, color=color.red, linewidth=2, title="StopLoss")
plot(strategy.position_size > 0 ? TP : na, style=plot.style_linebr, color=color.green, linewidth=2, title="TakeProfit")

```

> Detail

https://www.fmz.com/strategy/427270

> Last Modified

2023-09-19 16:36:53
