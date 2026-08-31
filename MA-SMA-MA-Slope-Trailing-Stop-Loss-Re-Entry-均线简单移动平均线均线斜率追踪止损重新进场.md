
> Name

MA-SMA-MA-Slope-Trailing-Stop-Loss-Re-Entry-均线简单移动平均线均线斜率追踪止损重新进场

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/162c60750012968bb74.png)


#### Overview
The strategy makes trading decisions based on the slope of the moving average (MA) and the relative position of the price to the MA. When the MA slope is greater than the minimum slope threshold and the price is above the MA, the strategy initiates a long position. Additionally, the strategy employs a Trailing Stop Loss to manage risk and allows for re-entry under specific conditions. The strategy aims to capture opportunities in uptrends while optimizing returns and risks through dynamic stop-loss and re-entry mechanisms.

#### Strategy Principle
1. Calculate the Simple Moving Average (SMA) over a specified period as the main trend indicator.
2. Calculate the slope of the SMA within a specified window size to determine the strength of the current trend.
3. When the SMA slope is greater than the minimum slope threshold and the price is above the SMA, consider the market to be in an uptrend and initiate a long position.
4. Once a position is opened, the strategy uses a Trailing Stop Loss mechanism to dynamically adjust the stop-loss level based on the current price and a specified percentage.
5. If the price hits the trailing stop-loss level, the strategy closes the position and marks the occurrence of a stop-loss event.
6. After a stop-loss event occurs, if the price retraces below the SMA by a specific percentage, the strategy re-enters the market.
7. If the price crosses below the SMA, the strategy directly closes the position.

#### Advantage Analysis
1. Trend Following: By using the SMA slope and the relative position of the price to the SMA, the strategy helps capture profits in uptrends.
2. Dynamic Stop Loss: The Trailing Stop Loss mechanism dynamically adjusts the stop-loss level based on price changes, providing better protection for profits and limiting losses.
3. Re-Entry: After a stop-loss event occurs, the strategy re-enters the market when the price retraces below the SMA by a specific percentage, allowing for potential rebound opportunities.
4. Flexible Parameters: The strategy offers multiple adjustable parameters, such as the SMA period, minimum slope threshold, trailing stop-loss percentage, etc., which can be optimized based on different market conditions.

#### Risk Analysis
1. Parameter Sensitivity: The strategy's performance may be sensitive to parameter settings, and improper parameter choices may lead to suboptimal results.
2. Trend Recognition: The strategy primarily relies on the SMA slope and the relative position of the price to the SMA to identify trends, which may generate false signals under certain market conditions.
3. Stop-Loss Frequency: The Trailing Stop Loss mechanism may result in frequent stop-losses, especially during highly volatile market conditions, impacting the overall performance of the strategy.
4. Re-Entry Risk: The re-entry mechanism may sometimes lead to the strategy re-entering the market after a further decline, amplifying losses.

#### Optimization Directions
1. Trend Confirmation: To improve the accuracy of trend recognition, consider incorporating additional technical indicators or price action patterns alongside the SMA slope and price position.
2. Stop-Loss Optimization: Explore alternative stop-loss methods, such as volatility-based or support/resistance-based stop-losses, to better adapt to different market conditions.
3. Re-Entry Conditions: Refine the re-entry conditions by considering factors such as the magnitude and duration of price retracements to filter out unfavorable re-entry signals.
4. Position Sizing: Introduce position sizing mechanisms to adjust the size of each trade based on market volatility or other risk indicators, helping control the overall risk exposure.

#### Summary
The strategy determines trends based on the slope of the moving average and the relative position of the price to the moving average. It employs a Trailing Stop Loss and conditional re-entry mechanisms to manage trades. The strengths of the strategy lie in its trend-following ability, dynamic stop-loss protection, and the capture of re-entry opportunities. However, the strategy also has potential drawbacks, such as parameter sensitivity, trend recognition errors, stop-loss frequency, and re-entry risks. Optimization directions include refining trend recognition, stop-loss methods, re-entry conditions, and position sizing. When applying the strategy in practice, it is crucial to carefully evaluate and adjust it based on specific market characteristics and trading style.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-05-01 00:00:00
end: 2024-05-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("MA Incline Strategy with Trailing Stop-Loss and Conditional Re-Entry", overlay=true, calc_on_every_tick=true)

// Input parameters
windowSize = input.int(10, title="Window Size")
maLength = input.int(150, title="Moving Average Length")
minSlope = input.float(0.001, title="Minimum Slope")
trailingStopPercentage = input.float(2.8, title="Trailing Stop Percentage (%)") / 100
reEntryPercentage = input.float(4.2, title="Re-Entry Percentage Above MA (%)") / 100

// Calculate the moving average
ma = ta.sma(close, maLength)

// Calculate the slope of the moving average over the window size
previousMa = ta.sma(close[windowSize], maLength)
slopeMa = (ma - previousMa) / windowSize

// Check conditions
isAboveMinSlope = slopeMa > minSlope
isAboveMa = close > ma

// Variables to track stop loss and re-entry condition
var bool stopLossOccurred = false
var float trailStopPrice = na
// Buy condition
buyCondition = isAboveMinSlope and isAboveMa and ((not stopLossOccurred) or (stopLossOccurred and low < ma * (1 + reEntryPercentage)))

// Execute strategy
if (buyCondition and strategy.opentrades == 0)
    if (stopLossOccurred and close < ma * (1 + reEntryPercentage))
        strategy.entry("Long", strategy.long)
        stopLossOccurred := false
    else if (not stopLossOccurred)
        strategy.entry("Long", strategy.long)

// Trailing stop-loss
if (strategy.opentrades == 1)
    // Calculate the trailing stop price
    trailStopPrice := close * (1 - trailingStopPercentage)
    // Use the built-in strategy.exit function with the trailing stop
    strategy.exit("Trail Stop", "Long", stop=close * (1 - trailingStopPercentage))

// Exit condition
sellCondition = ta.crossunder(close, ma)
if (sellCondition and strategy.opentrades == 1)
    strategy.close("Long")

// Check if stop loss occurred
if (strategy.closedtrades > 0)
    lastExitPrice = strategy.closedtrades.exit_price(strategy.closedtrades - 1)
    if (not na(trailStopPrice) and lastExitPrice <= trailStopPrice)
        stopLossOccurred := true

// Reset stop loss flag if the price crosses below the MA
if (ta.crossunder(close, ma))
    stopLossOccurred := false

```

> Detail

https://www.fmz.com/strategy/453666

> Last Modified

2024-06-07 16:41:53
