
> Name

Bollinger-Bands-Breakout-Strategy-427264

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy is based on the Bollinger Bands indicator. It goes long when the price breaks above the lower band and closes the position when the price touches the upper band. The strategy utilizes the containment principle of Bollinger Bands to track abnormal price breakouts for buying low and selling high.

## Strategy Principle 

1. Calculate the middle band SMA as the simple moving average of recent closing prices.

2. Calculate the standard deviation StdDev to reflect the price fluctuation range.

3. Add the upper offset of standard deviation to the middle band SMA to get the upper band.

4. Subtract the lower offset of standard deviation from the middle band SMA to get the lower band.

5. Go long when the closing price breaks above the lower band from bottom up. 

6. Close the position when the price touches the upper band, as the price is considered abnormal.

## Advantage Analysis

The biggest advantage of this strategy is utilizing the statistical properties of Bollinger Bands to effectively track abnormal market fluctuations and capture trends. Compared to regular moving average strategies, Bollinger Bands strategies have more advantages:

1. Bollinger Bands upper and lower bands can automatically adapt to market volatility.

2. Breakout signals are more reliable for entry.

3. Reversion to mean is reasonable for taking profit.

4. Huge parameter tuning space for adjusting to different markets.

5. Can capture mid-to-long term trends and also be used for short term.

## Risk Analysis

The potential risks of this strategy are mainly:

1. Poor performance of Bollinger Bands in range-bound markets, avoid wrong entries.

2. Breakout signals may be false breakouts, need prudent judgements. 

3. Profit taking position is too idealized, can be optimized to actual price action.

4. Improper parameter settings may lead to over-trading or over-conservatism. 

5. Backtest period needs to be long enough to avoid curve fitting.

Corresponding risk management measures:

1. Add trading volume indicators to filter signals.

2. Optimize parameters and test data from different markets.

3. Add trailing stop loss, stagger take profit levels. 

4. Assess signal divergences, avoid chasing highs and selling lows.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Try different combinations of Bollinger Bands parameters to find the optimal.

2. Add MA, MACD etc to filter breakout signals.

3. Apply machine learning algorithms to optimize Bollinger parameters. 

4. Assess the strength of breakouts and adjust position sizing.

5. Backtest longer periods to test stability. 

6. Add stop loss mechanisms to control risk.

## Summary 

In summary, the Bollinger Bands strategy is an overall reliable trend following strategy. It can effectively capture abnormal price fluctuations. But we should also note its deviation from actual price and constantly optimize the parameters. If used for live trading, strict risk management is a must to control loss per trade.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2010|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2030|Backtest Stop Year|
|v_input_5|12|Backtest Stop Month|
|v_input_6|30|Backtest Stop Day|
|v_input_7|true|Color Background?|
|v_input_8|20|SMA Length|
|v_input_9|20|StdDev Length|
|v_input_10|2|Upper Band Offset|
|v_input_11|2|Lower Band Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-12 04:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy(title="BB training No Repainting (OTS Mode)", overlay=true)


// Strategy Rules:
// 1. Enter trade when price crosses above the lower band
// 2. Exit trade when price touches the upper band
// 

// Chart Properties
testStartYear = input(2010, "Backtest Start Year")
testStartMonth = input(01, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear, testStartMonth, testStartDay, 0, 0)

testStopYear = input(2030, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(30, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)

// A switch to control background coloring of the test period
testPeriodBackground = input(title="Color Background?", type=input.bool, defval=true)
testPeriodBackgroundColor = testPeriodBackground and time >= testPeriodStart and time <= testPeriodStop ? #6c6f6c : na
bgcolor(testPeriodBackgroundColor, transp=97)

// User provided values
smaLength = input(title="SMA Length", type=input.integer, defval=20) // Middle band period length (moving average)
stdLength = input(title="StdDev Length", type=input.integer, defval=20) // Range to apply bands to
ubOffset = input(title="Upper Band Offset", type=input.float, defval=2.0, step=0.5) // Number of standard deviations above MA
lbOffset = input(title="Lower Band Offset", type=input.float, defval=2.0, step=0.5) // Number of standard deviation below MA

testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false

smaValue = sma(close, smaLength) // Middle band
stdDev = stdev(close, stdLength)
upperBand = smaValue + stdDev * ubOffset // Top band
lowerBand = smaValue - stdDev * lbOffset // Bottom band

// Plot bands to chart
plot(series=smaValue, title="SMA", color=color.green)
plot(series=upperBand, title="UB", color=color.blue, linewidth=2)
plot(series=lowerBand, title="LB", color=color.blue, linewidth=2)

longCondition = (crossover(close, lowerBand))
closeLongCondition = (close >= upperBand)

if (longCondition and testPeriod())
    strategy.entry(id="CALL", long=true)

strategy.close(id="CALL", when=closeLongCondition)

```

> Detail

https://www.fmz.com/strategy/427264

> Last Modified

2023-09-19 16:06:56
