
> Name

Golden-Ratio-Breakout-Long-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19de19b9da949473d94.png)


## Overview

The Golden Ratio Breakout Long Strategy is a swing trading strategy based on the golden ratio levels of the highest and lowest prices over the past 21 days. It features a backtesting mechanism, long-only setup, and long-term holding period.

## Strategy Logic

The strategy first calculates the 21-day highest price (high21) and the 21-day lowest price (low21), then computes the difference between them as diff. The trading signal triggers when the current low price breaks above low21 + 0.382 * diff while the previous bar's close is higher than the previous bar's open. The stop loss is set at low21 + 0.236 * diff. In other words, when the price breaks the 38.2% golden ratio line of the recent 21-day price range with upwards elasticity, a long position is initiated. The stop loss line is the 23.6% golden ratio line.   

The golden ratio levels are used here as they generally correspond to common market support and resistance areas. 0.382 and 0.236 are watched as retracement and bounce levels, making the golden ratio one of the most intriguing numbers in nature.

## Advantage Analysis

The advantages of this strategy are:

1. Guided by mature technical analysis methodology - golden ratio theory.

2. Long-only setup lowers system risk. 

3. Trend tracking mechanism identifies accurate entry timing.

4. Clear stop loss controls risk.

5. Customizable backtest parameters suit different market environments.

## Risk Analysis  

There are also some risks:

1. Reliance on historical data causes insensitivity to market regime shifts.

2. The tight stop loss may get stopped out by overnight gaps.

3. False signals can happen if violent price swings occur under improper backtest periods.

4. Slippage impacts profitability.

These risks can be reduced by adjusting backtest periods, optimizing stop loss placement, considering slippage cost, etc.

## Optimization Directions

The strategy can be upgraded in the following aspects:

1. Auto-optimize parameters with machine learning algorithms to better fit the current market.

2. Incorporate leverage products like index futures for position amplification. 

3. Improve handling of extreme events like price gaps.

4. Optimize stop loss rules, e.g. set dynamic stops based on volatility.

## Conclusion

In conclusion, this is a long-only strategy that provides clear entry and stop loss logic based on the golden ratio theory. It can be transformed into a robust quantitative trading strategy through parameter tuning, model optimization, portfolio combination, and other enhancement techniques.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|High Days|
|v_input_2|21|Low Days|
|v_input_3|true|Start Date|
|v_input_4|true|Start Month|
|v_input_5|2019|Start Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-21 00:00:00
end: 2023-11-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © omkarkondhekar

//@version=4
strategy("GRBLong", overlay=true)

highInput = input(title = "High Days", type = input.integer, defval = 21, minval = 11)
lowInput = input(title = "Low Days", type = input.integer, defval = 21, minval = 5)

// Configure backtest start date with inputs
startDate = input(title="Start Date", type=input.integer,
     defval=1, minval=1, maxval=31)
startMonth = input(title="Start Month", type=input.integer,
     defval=1, minval=1, maxval=12)
startYear = input(title="Start Year", type=input.integer,
     defval=2019, minval=1800, maxval=2100)

// See if this bar's time happened on/after start date
afterStartDate = (time >= timestamp(syminfo.timezone,
     startYear, startMonth, startDate, 0, 0))

high21 = highest(high, highInput)
low21 = lowest(low, lowInput)

diff = high21 - low21

longEntrySignal = low > low21 + (diff * 0.382) and close[1] > open[1] 

strategy.entry("Long", strategy.long, limit = low, when = longEntrySignal and afterStartDate)
strategy.exit("Long Exit", "Long", stop = low21 + (diff * 0.236))

plot(low21 + (diff * 0.382), color= color.green)
plot(low21 + (diff * 0.236), color = color.red)

```

> Detail

https://www.fmz.com/strategy/433538

> Last Modified

2023-11-28 13:40:35
