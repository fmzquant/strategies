
> Name

基于动量均线反转策略Momentum-Moving-Average-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ab45fa9c2b8da6043e.png)

## Overview

The core idea of this strategy is to combine the RSI indicator and moving average to find opportunities for stock price reversals and achieve buying low and selling high. When the RSI indicator shows that the stock is oversold and the short-term moving average crosses below the price, it serves as a buy signal. After setting the stop loss and take profit, wait for the price to reverse upward.

## Strategy Principle

This strategy mainly uses the RSI indicator to judge oversold and overbought conditions, and the golden cross and dead cross of the moving average to determine price trends. Specifically, the RSI indicator can effectively judge whether a stock is oversold or overbought. When the RSI is below 30, it is in the oversold range. And when the short-term moving average (set to 9-day in this strategy) crosses below the price, it means the price is falling.

So when the RSI indicator is below 40, nearing the oversold state, and the 9-day moving average crosses below the price, it can be judged as a possible timing for the stock price to reverse, going long to buy. Then set the stop loss and take profit to exit, waiting for the stock price to reverse upward before selling to take profits.  

## Advantage Analysis

This strategy combines the RSI indicator and moving average, which can effectively determine the timing of buying. Compared with a single judgment of oversold, the added condition judgment of the moving average avoids fluctuation in the oversold area. The setting of stop loss and take profit is flexible and can vary from person to person.

## Risk Analysis

This strategy relies on parameter settings such as RSI judgment threshold, moving average time window, etc. Different parameters may lead to different results. And under certain market conditions, stop loss is still possible. 

In addition, transaction fees will also have a certain impact on profits. It is worth considering incorporating trading volume or fund management modules later for optimization.  

## Optimization Direction

Consider dynamically adjusting moving average parameters, selecting different parameters for different cycle; or introducing other indicators to judge, such as KDJ, MACD, etc., to form a comprehensive judgment based on multiple conditions.

It is also possible to establish a trading volume or capital management module to control the proportion of funds occupied by a single trade and reduce the impact of a single loss.


## Summary  

In general, this strategy uses RSI indicators and moving averages to determine buy timing and can effectively determine price reversals. Buying in oversold and locking in profits with stop loss and take profit can yield good results. For future optimizations, it is worth considering incorporating more Indicators or adding additional trading/fund management modules to make the strategy more robust.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2020|From Year|
|v_input_4|true|Thru Month|
|v_input_5|true|Thru Day|
|v_input_6|2112|Thru Year|
|v_input_7|true|Show Date Range|
|v_input_8|9|MA short period|
|v_input_9|14|RSI period|
|v_input_10|1.5|Long Stop Loss (%)|
|v_input_11|3|Long Take Profit (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-24 23:59:59
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Coinrule

//@version=4
strategy(shorttitle='MARSI',title='Moving Average', overlay=true, initial_capital=1000,  default_qty_type = strategy.percent_of_equity, default_qty_value = 100)

//Backtest dates
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 1,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 2020, title = "From Year",       type = input.integer, minval = 1970)
thruMonth = input(defval = 1,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12)
thruDay   = input(defval = 1,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31)
thruYear  = input(defval = 2112, title = "Thru Year",       type = input.integer, minval = 1970)

showDate  = input(defval = true, title = "Show Date Range", type = input.bool)

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => true

//MA inputs and calculations
inshort=input(9, title='MA short period')
MAshort= sma(close, inshort)

// RSI inputs and calculations
lengthRSI = input(14, title = 'RSI period', minval=1)
RSI = rsi(close, lengthRSI)

//Entry 
strategy.entry(id="long", long = true, when = MAshort<close and RSI<40 and window())

//Exit
longLossPerc = input(title="Long Stop Loss (%)",
     type=input.float, minval=0.0, step=0.1, defval=1.5) * 0.01
longTakePerc = input(title="Long Take Profit (%)",
     type=input.float, minval=0.0, step=0.1, defval=3) * 0.01
longSL  = strategy.position_avg_price * (1 - longLossPerc)
longTP  = strategy.position_avg_price * (1 + longTakePerc)
if (strategy.position_size > 0 and window())
    strategy.exit(id="TP/SL", stop=longSL, limit=longTP)


bgcolor(color = showDate and window() ? color.gray : na, transp = 90)  
plot(MAshort, color=color.purple, linewidth=4)


```

> Detail

https://www.fmz.com/strategy/442119

> Last Modified

2024-02-19 14:59:10
