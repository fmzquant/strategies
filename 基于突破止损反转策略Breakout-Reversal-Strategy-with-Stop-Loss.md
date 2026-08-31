
> Name

基于突破止损反转策略Breakout-Reversal-Strategy-with-Stop-Loss

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ce01781cc07ea12da5.png)

## Overview

This is a long/short quantitative trading strategy based on breakout theory. It calculates the highest close price over the past 100 trading days and determines if a breakout happens based on if the latest closing price exceeds that level. If a breakout is detected, a long signal is triggered. After entering long, the position will be closed by a stop loss after 25 bars.

## Strategy Logic

The core logic of this strategy leverages the "breakout" theory in technical analysis. The breakout theory believes that when price breaks through the recent highest or lowest level over a period of time, it signals a reversal and the market may start a new uptrend or downtrend. 

Specifically, this strategy uses the Pine Script built-in function `ta.highest()` to calculate the highest close over the past 100 bars. It then compares if the current bar's closing price is higher than that level. If the closing price breaks through and exceeds the 100-day highest closing price, a long entry signal is triggered.

Once entering a long position, the strategy sets a stop loss condition to close the position. By calling `ta.barssince()` to count the number of bars elapsed since entering long, it will force to close the position after 25 bars. 

The entry logic can be summarized as:

1. Calculate the highest close of recent 100 trading days
2. Compare if current bar's closing price exceeds that highest close 
3. If exceeds, trigger long entry signal
4. Close long position by stop loss after 25 bars

## Advantage Analysis 

The biggest advantage of this strategy is to capture price reversal points with relatively high success rate of trend-following trades. Also, the stop loss logic can effectively control single trade loss amount.

The concrete advantages are:

**1. Trend-following, higher success rate**

The breakout theory believes after price exceeds a key level, it may start a new trend. This strategy is designed based on this logic, thus with relatively high probability to capture price reversal points and benefit from trend-following.

**2. Controllable risk, with stop loss**

The strategy sets a forced stop loss exit after 25 bars to maximum single trade loss, avoiding huge loss. So the overall risk is controllable. 

**3. Suitable for mid-to-long-term holding**  

The default holding period is 25 bars, about 1 month. This frequency is suitable for mid-to-long-term strategies, not too short for whipsaws, and not too long to increase risk.

**4. Few parameters, easy to optimize**

There are mainly 2 tunable parameters. With few parameters it's easy to test and find optimal parameters for actual trading.

**5. Transferable across different products** 

This strategy does not reply on peculiar indicators of certain products. Its logic applies to stocks, forex, commodities, cryptocurrencies etc. So it's flexible to switch between products.

## Risk Analysis

While this strategy has some edges, there are also some risks when deploying it in actual trading, mainly:

**1. Risk of holding losing positions**

The strategy does not have trailing stop loss to follow profitable positions. If the price trend does not proceed as expected, or breakout turns out to be false breakout, then forced exit at pre-set stop loss point may lead to big loss. This is the biggest risk.

**2. Parameter tuning may be needed** 

Default parameters may not be optimal. They need to be optimized during live trading to find the best fit for specific product and market regimes. This adds extra work.

**3. Performance correlation with markets**

The strategy relies too much on persistent price trends. It does not work well during range-bound regimes. If encountered whipsaw markets, forced exit will frequently occur leading to unstable gains/losses.  

## Optimization 

To make this strategy more robust and profitable for actual deployment, some enhancements can be conducted from the following aspects:

**1. Add trailing stop loss mechanism** 

Add trailing stop loss logic to follow profitable positions, by dynamically updating stop loss point based on floating profits. This can limit max loss of single trades.

**2. Adaptive parameters based on markets**

Make parameters like breakout period and holding period adaptive based on market strength, quantified using metrics like ATR. This can dynamically tune parameters.

**3. Combine trend filters **

Better filtering of unclear trends when applying strategy, through trend analysis beforehand, either discretionary or quantitatively. Only take trades when seeing a clear trend.  

**4. Test on different products and intervals** 

Testing the optimized parameters and rules on different products (e.g. indexes, commodities, forex, crypto) and intervals (e.g. daily, 60m bars) will make this strategy more robust and widely applicable.

## Conclusion

This breakout reversal strategy with stop loss is easy to implement with clear rules on trend identification and position management. We analyze its strength and risks, provide suggestions to enhance its profitability and applicability. With further optimization, it can become a solid quantitative trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|100|Breakout Period|
|v_input_int_2|2022|Start Year|
|v_input_int_3|true|Start Month|
|v_input_int_4|true|Start Day|
|v_input_int_5|2023|End Year|
|v_input_int_6|12|End Month|
|v_input_int_7|31|End Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-29 00:00:00
end: 2024-02-04 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © All_Verklempt

//@version=5
strategy("Breakout Strategy", overlay=true)

// Input variable for breakout period
breakoutPeriod = input.int(100, title="Breakout Period", minval=1)

// Calculate the highest close of the past breakout period
highestClose = ta.highest(close, breakoutPeriod)

// Input variables for start and end dates
startYear = input.int(2022, title="Start Year", minval=1900)
startMonth = input.int(1, title="Start Month", minval=1, maxval=12)
startDay = input.int(1, title="Start Day", minval=1, maxval=31)

endYear = input.int(2023, title="End Year", minval=1900)
endMonth = input.int(12, title="End Month", minval=1, maxval=12)
endDay = input.int(31, title="End Day", minval=1, maxval=31)

// Convert start and end dates to timestamp
startDate = timestamp(startYear, startMonth, startDay, 00, 00)
endDate = timestamp(endYear, endMonth, endDay, 23, 59)

// Entry condition: Breakout and higher close within the specified date range
enterLong = close > highestClose[1] and close > close[1]

// Exit condition: Close the long position after twenty-five bars
exitLong = ta.barssince(enterLong) >= 25

// Strategy logic
if (enterLong)
    strategy.entry("Long", strategy.long)

if (exitLong)
    strategy.close("Long")

```

> Detail

https://www.fmz.com/strategy/441092

> Last Modified

2024-02-05 14:56:16
