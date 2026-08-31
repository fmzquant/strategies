
> Name

Trailing-Stop-Loss-Percent-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e9440ada607c5d1b7d.png)

## Overview

This strategy is designed for a long position entry with a date-specific trigger and a trailing stop loss mechanism for risk management. It is particularly useful for traders who want to automate their entries based on specific calendar dates and manage their positions with a dynamic risk control method like a trailing stop loss.

## Strategy Logic  

The strategy first takes input of specific entry dates, including month and day, then calculates the accurate entry timestamp based on these dates. It also inputs the percentage parameter for trailing stop loss.  

On the entry date, the strategy will open a long position. At the same time, it records the highest price (highestPrice) and stop loss price (stopLoss). The highestPrice keeps updating over time, while the stopLoss trails it by a certain percentage downwards.  

If the price falls below the stopLoss, the position will be closed. Otherwise, the position remains open, and the stopLoss keeps trailing the highestPrice to lock in profits and control risk.

## Advantage Analysis

The main advantages of this strategy are:

1. Automated entry based on specific dates. Suitable for strategies trading around significant events.  
2. Applies trailing stop loss to dynamically lock in profits and effectively manage risks.
3. Stop loss set as percentage, simple and intuitive to operate. Customizable loss range.  
4. Allows long-term holding to maximize upside potential.

## Risk Analysis  

There are also some risks:

1. Risk of stop loss failure. If price drops sharply below stop loss briefly then bounces back, the position may get stopped out and fail to capture the rebound.
2. No limit on maximum loss. If trailing stop loss percentage set too wide, max loss can exceed expectations.

Possible improvements:
1. Combine other indicators to pause trailing stop when market faces correction, avoiding failure.
2. Set stop loss percentage carefully, usually under 10%. Or set maximum tolerable loss.  

## Optimization  

Possible optimization directions:

1. Add profit taking mechanisms. When price rises 50% etc, take partial or full profits.
2. Optimize trailing width based on market regime signals from indices. Widen when market consolidating.   
3. Enhance position sizing. Consider pyramiding when new highs breakout for greater profits.

## Conclusion  

This strategy provides automated date-based entry and dynamic risk management via trailing stop loss. Simple and intuitive to operate, suitable for long-term holdings. Further optimizations can make it a very practical quant trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|true|Entry Day|
|v_input_int_2|true|Entry Month|
|v_input_int_3|2023|Entry Year|
|v_input_float_1|5|Trailing Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-24 00:00:00
end: 2024-01-31 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="Trailing Stop Loss Percent",
     overlay=true, pyramiding=1)

// Input for the specific entry date
entryDay = input.int(defval = 1, title = "Entry Day", minval = 1, maxval = 31)
entryMonth = input.int(defval = 1, title = "Entry Month", minval = 1, maxval = 12)
entryYear = input.int(defval = 2023, title = "Entry Year", minval = 1970)

// Calculate the entry date timestamp
entryDate = timestamp(entryYear, entryMonth, entryDay, 00, 00)

// Trailing Stop Loss Percentage
trailStopPercent = input.float(defval = 5.0, title = "Trailing Stop Loss (%)", minval = 0.1)

// Entry Condition
enterTrade = true

// Variables to track the highest price and stop loss level since entry
var float highestPrice = na
var float stopLoss = na

// Update the highest price and stop loss level
if strategy.position_size > 0
    highestPrice := math.max(highestPrice, high)
    stopLoss := highestPrice * (1 - trailStopPercent / 100)

// Enter the strategy
if enterTrade
    strategy.entry("Long Entry", strategy.long)
    highestPrice := high
    stopLoss := highestPrice * (1 - trailStopPercent / 100)

// Exit the strategy if the stop loss is hit
if strategy.position_size > 0 and low <= stopLoss
    strategy.close("Long Entry")

// Plotting the stop loss level for reference
plot(strategy.position_size > 0 ? stopLoss : na, "Trailing Stop Loss", color=color.red)
```

> Detail

https://www.fmz.com/strategy/440691

> Last Modified

2024-02-01 11:05:36
