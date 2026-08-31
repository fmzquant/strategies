
> Name

多指标BTC交易策略-Multi-indicator-BTC-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17dbf11853456901396.png)

#### Overview

This strategy combines multiple technical indicators, including the Relative Strength Index (RSI), Moving Average Convergence Divergence (MACD), and several Simple Moving Averages (SMAs) with different periods, aiming to provide a comprehensive analysis tool for Bitcoin (BTC) trading. The main idea of the strategy is to enter long positions when the RSI is within a specific range, the MACD exhibits a bullish crossover, and the price is below multiple SMAs, while setting stop-loss and take-profit levels and updating the stop-loss position when the RSI reaches 50.

#### Strategy Principles

1. Calculate RSI, MACD, and SMAs with different periods.
2. Check if the previous RSI value is below the lower bound or above the upper bound, the current RSI value is between the lower and upper bounds, the MACD has a bullish crossover, and the closing price is below all SMAs.
3. If the above conditions are met and there is no current position, enter a long position.
4. Set stop-loss and take-profit prices based on a risk percentage.
5. If a long position is held and the RSI reaches 50, update the stop-loss position to the highest price.
6. If the MACD exhibits a bearish crossover, close the position.

#### Strategy Advantages

1. Incorporates multiple technical indicators to improve signal reliability.
2. Enters positions when the RSI is within a specific range, avoiding extreme situations.
3. Sets stop-loss and take-profit levels to control risk.
4. Dynamically adjusts the stop-loss position to lock in partial profits.
5. Closes positions in a timely manner based on MACD bearish crossover signals to reduce potential losses.

#### Strategy Risks

1. In a choppy market, frequent trading signals may lead to excessive trading and commission losses.
2. Fixed risk percentage for stop-loss and take-profit may not adapt to different market environments.
3. Relying solely on technical indicators while ignoring fundamental factors may lead to incorrect trading decisions.

#### Strategy Optimization Directions

1. Introduce more technical indicators or market sentiment indicators to improve signal accuracy.
2. Dynamically adjust stop-loss and take-profit levels based on market volatility to adapt to different market environments.
3. Incorporate fundamental analysis, such as significant news events or regulatory policy changes, to assist in trading decisions.
4. Consider indicators with different time frames to capture trading opportunities on multiple time scales.

#### Summary

This strategy provides a comprehensive analysis framework for Bitcoin trading by integrating RSI, MACD, and SMA technical indicators. It generates trading signals using the confirmation of multiple indicators and incorporates risk control measures. However, there is still room for optimization, such as introducing more indicators, dynamically adjusting parameters, and incorporating fundamental analysis. In practical applications, traders should adapt the strategy according to their risk preferences and market conditions.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|RSI Length|
|v_input_2|20|RSI Lower Bound|
|v_input_3|30|RSI Upper Bound|
|v_input_4|14|ATR Length|
|v_input_5|20|SMA 20 Length|
|v_input_6|50|SMA 50 Length|
|v_input_7|200|SMA 200 Length|
|v_input_8|0.005|Risk Percentage for SL and Target|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-01 00:00:00
end: 2024-03-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Advanced Strategy", shorttitle="1M Advanced Strat", overlay=true)

// Input settings
rsiLength = input(14, title="RSI Length")
rsiLowerBound = input(20, title="RSI Lower Bound")
rsiUpperBound = input(30, title="RSI Upper Bound")

atrLength = input(14, title="ATR Length")

smaFastLength = input(20, title="SMA 20 Length")
smaMediumLength = input(50, title="SMA 50 Length")
smaSlowLength = input(200, title="SMA 200 Length")

riskPercent = input(0.005, title="Risk Percentage for SL and Target")

// Calculate indicators
rsiValue = rsi(close, rsiLength)
[macdLine, signalLine, _] = macd(close, 12, 26, 9)
smaFast = sma(close, smaFastLength)
smaMedium = sma(close, smaMediumLength)
smaSlow = sma(close, smaSlowLength)
atrValue = atr(atrLength)

// Checking previous RSI value
prevRsiValue = rsi(close[1], rsiLength)

// Conditions for Entry
longCondition = rsiValue > rsiLowerBound and rsiValue < rsiUpperBound and  prevRsiValue < rsiLowerBound or prevRsiValue > rsiUpperBound and crossover(macdLine, signalLine) and close < smaFast and close < smaMedium and close < smaSlow

// Strategy Entry
if (longCondition and not strategy.position_size)
    strategy.entry("Long", strategy.long)

    // Setting Stop Loss and Take Profit
    stopLoss = close - riskPercent * close
    takeProfit = close + atrValue
    strategy.exit("Exit Long", "Long", stop = stopLoss, limit = takeProfit)

//Update Stop Loss when RSI reaches 50
if (strategy.position_size > 0 and rsiValue >= 50)
    strategy.exit("Update SL", "Long", stop = high)

// Conditions for Exit
shortCondition = crossunder(macdLine, signalLine)

// Strategy Exit
if (shortCondition)
    strategy.close("Long")


```

> Detail

https://www.fmz.com/strategy/446761

> Last Modified

2024-04-01 11:26:00
