
> Name

追踪金本位价值的动态移动平均线策略Daily-Moving-Average-Tracking-Strategy-for-Gold-Value

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/570070179794b9742f.png)

## Overview

This strategy uses a combination of the previous day’s open and close prices, fast EMA line and slow EMA line to determine the direction of market value within the user-defined trading time period, and makes corresponding long or short entries. Meanwhile, the strategy uses trailing stop loss to lock in profits or limit losses. 

## Strategy Logic

The strategy mainly bases its judgment of gold value direction on two aspects:

1. The rise and fall of previous day’s close price relative to open price. If close price is higher than open price, it indicates that the overall value rose during that day. If close price is lower than open price, it indicates that the overall value dropped during that day.

2. The position relationship between the 50-period fast EMA line and 200-period slow EMA line. If the fast line is above slow line, it means short-term value rising speed is greater than long-term trend. If fast line is below slow line, it means short-term value rising speed is less than long-term trend.

When the long condition triggers, if previous day’s close is higher than open, current price is above previous day’s open, fast EMA is above slow EMA, and it is within user-defined trading hours, the strategy will go long gold.

When the short condition triggers, if previous day’s close is lower than open, current price is below previous day’s open, fast EMA is below slow EMA, and it is within user-defined trading hours, the strategy will go short gold.

In addition, the strategy uses trailing stop loss to lock in profits or limit losses. The trailing stop distance adjusts based on initial user setting and move step.

## Advantage Analysis 

The advantages of this strategy are:

1. Using multiple indicators to determine gold value direction reduces the probability of bad trades.

2. Trailing stop can effectively lock in profits, and exit in a timely manner when trend reverses, lowering risks.

3. Users can choose suitable trading windows based on their own trading time to avoid being trapped during institutional operations.

4. The EMA period values can be adjusted and optimized according to market changes, making the strategy more flexible.

## Risk Analysis

There are also some risks with this strategy:

1. Sudden events may incur large losses that need manual intervention or more relaxed stop loss distance. 

2. EMA cannot fully filter market noise. Erroneous signals can trigger unnecessary trades. Parameters can be optimized or more filters added.

3. Improper trailing stop distance settings also increase risks - too tight tends to get stopped out prematurely while too wide fails to control losses effectively. Extensive testing is needed to determine optimal values.

## Optimization Directions

The strategy can also be optimized in the following aspects:

1. Add other technical indicators for signal filtering, like MACD, Bollinger Bands etc. to reduce erroneous EMA signals.

2. Change to adaptive stops that adjust stop distance intelligently based on market volatility. 

3. Add position sizing rules to allow partial exits for better risk control and lower impact of single trade losses.

4. Add machine learning models to determine trend direction, improving accuracy using more historical data.

5. Optimize trading time window selection using Gaussian distribution to target higher strategy participation intervals.

## Conclusion

In summary, this is a typical trend following strategy. It combines multiple indicators to determine upward or downward value trends and is considered robust. The trailing stop application also allows effective loss control. Further optimizations to the indicators and stop loss rules can achieve an improved balance between returns and risk management. It suits investors with some quant investing knowledge who wish to participate in cryptocurrency trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|11|Start Hour|
|v_input_2|16|End Hour|
|v_input_3|100|Trailing Stop Start (pips)|
|v_input_4|10|Trailing Step (pips)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-04 00:00:00
end: 2024-01-11 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("My Strategy", overlay=true)

// Inputs for user to modify
startHour = input(11, title="Start Hour")
endHour = input(16, title="End Hour")
trailingStop = input(100, title="Trailing Stop Start (pips)")
trailingStep = input(10, title="Trailing Step (pips)")

// Define the EMAs
longEma = ema(close, 200)
shortEma = ema(close, 50)

// Calculate daily open, high, low, close
daily_open = security(syminfo.tickerid, "D", open[1])
daily_close = security(syminfo.tickerid, "D", close[1])

// Time conditions
timeAllowed = (hour >= startHour) and (hour <= endHour)

// Define long condition based on your criteria
longCondition = (daily_close > daily_open) and (close > daily_open) and (shortEma > longEma) and timeAllowed

// Define short condition based on your criteria
shortCondition = (daily_close < daily_open) and (close < daily_open) and (shortEma < longEma) and timeAllowed

// Enter the trade
if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

// Trailing Stop Loss
strategy.exit("Exit Long", "Long", trail_points = trailingStop / syminfo.mintick, trail_offset = trailingStep / syminfo.mintick)
strategy.exit("Exit Short", "Short", trail_points = trailingStop / syminfo.mintick, trail_offset = trailingStep / syminfo.mintick)

// Plotting
plot(daily_open, color=color.red, title="Daily Open")
plot(longEma, color=color.blue, title="200 EMA")
plot(shortEma, color=color.orange, title="50 EMA")

```

> Detail

https://www.fmz.com/strategy/438466

> Last Modified

2024-01-12 11:54:21
