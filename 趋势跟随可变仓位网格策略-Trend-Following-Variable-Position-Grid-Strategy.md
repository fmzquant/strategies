
> Name

趋势跟随可变仓位网格策略-Trend-Following-Variable-Position-Grid-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1828af091215c9459d0.png)


#### Overview

This strategy is a trend-following variable position grid strategy that mainly uses EMA, RSI, and engulfing patterns to determine the trend direction and entry timing. The strategy adjusts the stop-loss and take-profit positions based on the size of the engulfing pattern's body while allowing users to choose to go long only, short only, or both. Additionally, the strategy provides the option to use MACD as a trend filter.

#### Strategy Principles

The strategy uses a 200-period EMA to determine the overall trend direction. When the price is above the EMA, it is considered an uptrend, and when below the EMA, it is considered a downtrend. A 9-period RSI is used to gauge momentum, with an RSI above 50 indicating stronger bullish momentum and below 50 indicating stronger bearish momentum. The strategy also uses bullish and bearish engulfing patterns as entry signals. When the EMA, RSI, and engulfing pattern signals are in agreement, the strategy opens a position.

The stop-loss and take-profit positions are determined based on the size of the engulfing pattern's body. The stop-loss is set at twice the size of the engulfing body, with a minimum stop-loss percentage of 0.3% from the entry price to avoid frequent stop-outs due to small stop-loss distances. The take-profit position is set by multiplying the stop-loss distance by a pre-defined risk-reward ratio to ensure a fixed risk-reward ratio. Additionally, the strategy provides the option to use MACD as a trend filter, considering a stronger bullish trend when the MACD line is above the signal line and a stronger bearish trend when the MACD line is below the signal line.

#### Strategy Advantages

1. Trend following: The strategy uses multiple indicators to determine the trend, helping to enter at the early stages of a trend formation and capture trending moves.

2. Dynamic stop-loss and take-profit: By adjusting the stop-loss and take-profit positions based on the size of the engulfing pattern's body, the strategy expands the take-profit range when the trend is strong and narrows the stop-loss range when the trend is weak, allowing for flexible position management.

3. Users can customize trading direction, risk preferences, and other parameters to suit different user needs.

4. The option to use MACD as a trend filter further confirms trend strength and improves entry accuracy.

#### Strategy Risks

1. Incorrect trend identification: Although the strategy uses multiple indicators to determine the trend, there may still be instances where the trend is incorrectly identified, leading to losses.

2. Narrowing range: If the engulfing pattern's body is small, the stop-loss and take-profit distances will be very close, leading to a deterioration in the risk-reward ratio. This situation is more common in choppy markets.

3. Parameter optimization: The optimal parameters may vary significantly across different instruments and timeframes, requiring users to continuously test and optimize.

#### Strategy Optimization Directions

1. Trend identification: Consider introducing additional trend confirmation tools such as Bollinger Bands, Average Directional Index (ADX), etc., to improve the accuracy of trend identification.

2. Stop-loss and take-profit optimization: Consider incorporating volatility-related indicators such as ATR to dynamically adjust stop-loss and take-profit distances, reducing the risk associated with small ranges.

3. Position sizing: Dynamically adjust position size based on trend strength, account profitability, etc., increasing position size when the trend is strong and consistently profitable, and reducing the cost of frequent trading.

4. Multi-timeframe and multi-instrument coordination: Validate trend signals across timeframes and instruments to improve the accuracy of trend identification while diversifying the risk of a single instrument or timeframe.

#### Summary

This trend-following variable position grid strategy performs well in trending markets by using multiple indicators to determine trend direction and strength, dynamically adjusting stop-loss, take-profit, and position sizing to capture trends and achieve excess returns. However, the strategy's performance is average in unclear or frequently fluctuating markets. Therefore, when using this strategy, it is crucial to focus on selecting trending instruments and adjusting parameters as market conditions change. Furthermore, there is room for further optimization in trend identification, stop-loss and take-profit placement, position sizing, and multi-timeframe and multi-instrument coordination.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|EMA Length|
|v_input_2|9|RSI Length|
|v_input_string_1|0|Trend Direction: Both|Short Only|Long Only|
|v_input_3|2|Risk Reward Ratio|
|v_input_bool_1|true|Use MACD Filter|
|v_input_4|5|MACD Timeframe|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-01 00:00:00
end: 2024-02-29 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © niosupetranmartinez
//@version=5
strategy("Trend Follower Scalping Strategy", overlay=true, process_orders_on_close = true)

// Inputs
emaLen = input(200, 'EMA Length')
rsiLen = input(9, 'RSI Length')
trendDirection = input.string("Both", 'Trend Direction', options=["Long Only", "Short Only", "Both"])
risk_reward_ratio = input(2, 'Risk Reward Ratio')
useMacdFilter = input.bool(true, "Use MACD Filter")
macdTimeframe = input("5", "MACD Timeframe")

// EMA and RSI
ema200 = ta.ema(close, emaLen)
customRsi = ta.rsi(close, rsiLen)

// MACD Filter
[macdLine, signalLine, _] = request.security(syminfo.tickerid, macdTimeframe, ta.macd(close, 12, 26, 9))


// Majority Body Candle Identification Function
isMajorityBodyCandle(candleOpen, candleClose, high, low) =>
    bodySize = math.abs(candleClose - candleOpen)
    fullSize = high - low
    bodySize / fullSize > 0.6

// Engulfing Patterns
isBullishEngulfing = close > open and close[1] < open[1] and (close - open) > (open[1] - close[1]) and isMajorityBodyCandle(open, close, high, low)
isBearishEngulfing = close < open and close[1] > open[1] and (open - close) > (close[1] - open[1]) and isMajorityBodyCandle(open, close, high, low)

// Entry Conditions with MACD Filter
longCondition = close > ema200 and customRsi > 50 and isBullishEngulfing and (not useMacdFilter or macdLine > signalLine)
shortCondition = close < ema200 and customRsi < 50 and isBearishEngulfing and (not useMacdFilter or macdLine < signalLine)

// Trade Execution
var float stopLossPrice = na
var float entryPrice = na

// Long Entry
if (longCondition and (trendDirection == "Long Only" or trendDirection == "Both"))
    entryPrice := close
    engulfingBodySize = math.abs(close - open)
    minimumStopLoss = entryPrice * 0.997
    calculatedStopLoss = entryPrice - (engulfingBodySize * 2)
    stopLossPrice := calculatedStopLoss < minimumStopLoss ? calculatedStopLoss : minimumStopLoss
    risk = entryPrice - stopLossPrice
    takeProfitPrice = entryPrice + (risk_reward_ratio * risk)
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit Long", "Long", stop = stopLossPrice, limit = takeProfitPrice)

// Short Entry
if (shortCondition and (trendDirection == "Short Only" or trendDirection == "Both"))
    entryPrice := close
    engulfingBodySize = math.abs(open - close)
    minimumStopLoss = entryPrice * 1.003
    calculatedStopLoss = entryPrice + (engulfingBodySize * 2)
    stopLossPrice := calculatedStopLoss > minimumStopLoss ? calculatedStopLoss : minimumStopLoss
    risk = stopLossPrice - entryPrice
    takeProfitPrice = entryPrice - (risk_reward_ratio * risk)
    strategy.entry("Short", strategy.short)
    strategy.exit("Exit Short", "Short", stop = stopLossPrice, limit = takeProfitPrice)

// Plotting
plot(ema200, color=color.blue, linewidth=2, title="EMA 200")
```

> Detail

https://www.fmz.com/strategy/446547

> Last Modified

2024-03-29 15:23:23
