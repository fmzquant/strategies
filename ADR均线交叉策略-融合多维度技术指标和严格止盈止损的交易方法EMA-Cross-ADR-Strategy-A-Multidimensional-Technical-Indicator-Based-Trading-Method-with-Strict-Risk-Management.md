
> Name

ADR均线交叉策略-融合多维度技术指标和严格止盈止损的交易方法EMA-Cross-ADR-Strategy-A-Multidimensional-Technical-Indicator-Based-Trading-Method-with-Strict-Risk-Management

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10e215963179b73dec5.png)

## Overview

The EMA Cross ADR Strategy is a quantitative trading strategy based on the TradingView platform. It combines multiple technical indicators to determine trends, filter signals, and set stop-loss and take-profit levels. The strategy employs two Exponential Moving Averages (EMAs) with different periods to identify the main trend, uses the Average Daily Range (ADR) as a volatility filter, and dynamically sets stop-loss and take-profit levels based on a risk-reward ratio. In addition, the strategy incorporates risk management measures such as a trading time window, break-even stops, and a maximum daily loss limit, aiming to capture trend opportunities while strictly controlling downside risk.

## Strategy Principles

1. Dual EMA Crossover: The strategy uses two EMAs with different periods to determine the trend. When the short-term EMA crosses above the long-term EMA, it is considered an uptrend, generating a long signal; conversely, when the short-term EMA crosses below the long-term EMA, it is considered a downtrend, generating a short signal.

2. ADR Volatility Filter: To avoid generating trading signals in low volatility environments, the strategy introduces the ADR indicator as a volatility filter. Positions are only allowed to be opened when the ADR value is above a pre-set minimum threshold.

3. Trading Time Window: The strategy allows users to set the start and end times for daily trading. Trades are only executed within the specified time window, which helps avoid illiquid or highly volatile periods.

4. Dynamic Stop-Loss and Take-Profit: The strategy dynamically calculates the stop-loss and take-profit prices based on the average highest and lowest prices of the most recent N candlesticks, combined with a pre-set risk-reward ratio. This ensures that the risk-reward of each trade is controllable.

5. Break-Even Stops: When a position reaches a certain profit level (user-defined risk-reward ratio), the strategy moves the stop-loss to the break-even point (entry price). This helps protect profits that have already been earned.

6. Maximum Daily Loss Limit: To control the maximum loss per day, the strategy sets a daily loss limit. Once the daily loss reaches this limit, the strategy stops trading until the next day's opening.

7. Close All Positions at End of Day: Regardless of whether positions have hit the take-profit or stop-loss levels, the strategy closes all positions at a fixed time each trading day (e.g., 16:00) to avoid overnight risk.

## Advantage Analysis

1. Strong Trend-Following Ability: By using dual EMA crossovers to determine trends, the strategy can effectively capture the main market trends, thereby improving the win rate and profit potential.

2. Good Volatility Adaptability: The introduction of the ADR indicator as a volatility filter can avoid frequent trading in low volatility environments, reducing losses caused by invalid signals and false breakouts.

3. Strict Risk Control: The strategy sets risk control measures from multiple dimensions, including dynamic stop-loss and take-profit, break-even stops, and maximum daily loss limits, effectively controlling downside risk and improving risk-adjusted returns.

4. Flexible Parameter Settings: The various parameters of the strategy, such as EMA periods, ADR length, risk-reward ratio, trading time window, etc., can be flexibly set according to user preferences and market characteristics to optimize strategy performance.

5. High Degree of Automation: The strategy is based on the TradingView platform, and the trading logic is executed entirely by the program, reducing the interference of human emotions and subjective judgments, which is conducive to the long-term stable operation of the strategy.

## Risk Analysis

1. Parameter Optimization Risk: Although the parameters of the strategy can be flexibly adjusted, over-optimization may lead to overfitting and poor out-of-sample performance. Therefore, when setting parameters, sufficient backtesting and analysis are required to ensure the robustness of the strategy.

2. Sudden Event Risk: The strategy mainly trades based on technical indicators and may not react sufficiently to some sudden major fundamental events, such as policy changes or significant economic data fluctuations, leading to large drawdowns.

3. Trend Reversal Risk: During key periods of trend reversals, dual EMA crossover signals may be delayed, causing the strategy to miss the best timing for establishing positions or suffer losses at the beginning of a trend reversal.

4. Liquidity Risk: Although the strategy sets a trading time window, if the liquidity of the traded instruments is poor, it may still face risks such as slippage and trading delays, affecting strategy performance.

5. Technical Indicator Failure Risk: The strategy relies heavily on technical indicators. If market conditions change significantly, causing the indicators to lose their original meaning, the effectiveness of the strategy may decline.

## Optimization Directions

1. Introduce More Dimensional Indicators: On the basis of the existing dual EMAs and ADR, consider introducing more effective technical indicators, such as MACD and RSI, to improve the reliability and robustness of signals.

2. Dynamic Parameter Optimization: Establish a mechanism for parameter optimization that dynamically adjusts key strategy parameters based on different market states (such as trending or oscillating) to adapt to market changes.

3. Incorporate Fundamental Factors: Give appropriate consideration to some important fundamental indicators, such as economic data and policy directions, which can help the strategy better grasp market trends and avoid systemic risks in a timely manner.

4. Improve Stop-Loss and Take-Profit Mechanisms: Further optimize the logic of stop-loss and take-profit on the basis of the existing dynamic stop-loss and take-profit, such as introducing trailing stops and partial take-profits, to better protect profits and control risks.

5. Multiple Instruments and Time Frames: Extend the strategy to multiple trading instruments and time frames, and improve the adaptability and stability of the strategy through diversified investment and time frame optimization.

## Summary

The EMA Cross ADR Strategy is a quantitative trading strategy based on technical analysis. It determines trends through dual EMA crossovers and uses the ADR indicator for volatility filtering. The strategy also sets strict risk control measures, including dynamic stop-loss and take-profit, break-even stops, and maximum daily loss limits to control downside risk. The advantages of the strategy lie in its strong trend-following ability, good volatility adaptability, strict risk control, flexible parameter settings, and high degree of automation. However, it also has some risks, such as parameter optimization risk, sudden event risk, trend reversal risk, liquidity risk, and technical indicator failure risk. In the future, the strategy can consider optimizing and improving from aspects such as introducing more dimensional indicators, dynamic parameter optimization, incorporating fundamental factors, improving stop-loss and take-profit mechanisms, and extending to multiple instruments and time frames to further enhance the robustness and profitability of the strategy. Overall, the EMA Cross ADR Strategy provides quantitative traders with a trading model for reference, but in practical application, it needs to be appropriately adjusted and optimized according to one's own risk preferences and trading style.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Short EMA Length|
|v_input_2|50|Long EMA Length|
|v_input_3|14|ADR Length|
|v_input_4|2|Risk/Reward Ratio|
|v_input_5|10|Lookback Candles for Stop Loss|
|v_input_6|900|Start Time|
|v_input_7|1600|End Time|
|v_input_8|10|Minimum ADR Value for Entry|
|v_input_float_1|true|Break-Even Profit|
|v_input_float_2|true|Break-Even Risk-Reward Ratio|
|v_input_9|-2000|Daily Loss Limit|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-26 00:00:00
end: 2024-03-27 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Sameh_Hussein

//@version=5
strategy('EMA Cross ADR Strategy with Stats', overlay=true)

// Adjustable Parameters
shortEmaLength = input(10, title='Short EMA Length')
longEmaLength = input(50, title='Long EMA Length')
adrLength = input(14, title='ADR Length')
riskRewardRatio = input(2.0, title='Risk/Reward Ratio')
lookbackCandles = input(10, title='Lookback Candles for Stop Loss')
startTime = input(0900, title='Start Time')
endTime = input(1600, title='End Time')
minAdrValue = input(10, title='Minimum ADR Value for Entry')
breakEvenProfit = input.float(1.0, title='Break-Even Profit', minval=0.0)
breakEvenRR = input.float(1.0, title='Break-Even Risk-Reward Ratio', minval=0.0)
dailyLossLimit = input(-2000.0, title='Daily Loss Limit')

// Exponential Moving Averages
shortEma = ta.ema(close, shortEmaLength)
longEma = ta.ema(close, longEmaLength)

// Average Daily Range
adr = ta.sma(ta.tr, adrLength)

// Time Filter Function
timeFilter() => true

// Entry Conditions with ADR filter
longCondition = ta.crossover(shortEma, longEma) and timeFilter() and adr > minAdrValue
shortCondition = ta.crossunder(shortEma, longEma) and timeFilter() and adr > minAdrValue

// Calculate the average low and average high of the previous 'lookbackCandles' candles
averageLow = ta.sma(low, lookbackCandles)
averageHigh = ta.sma(high, lookbackCandles)

// Risk and Reward Calculation
stopLossLong = averageLow
takeProfitLong = close + (close - averageLow) * riskRewardRatio
stopLossShort = averageHigh
takeProfitShort = close - (averageHigh - close) * riskRewardRatio

// Entry Control Variables
var longEntryAllowed = true
var shortEntryAllowed = true

// Update entry price on trade execution
var float entryPriceLong = na
var float entryPriceShort = na

if (strategy.position_size > 0)
    if (strategy.position_size[1] <= 0)
        entryPriceLong := strategy.opentrades.entry_price(strategy.opentrades - 1)
    else
        entryPriceLong := entryPriceLong
else
    entryPriceLong := na

if (strategy.position_size < 0)
    if (strategy.position_size[1] >= 0)
        entryPriceShort := strategy.opentrades.entry_price(strategy.opentrades - 1)
    else
        entryPriceShort := entryPriceShort
else
    entryPriceShort := na

// Adjust stop loss to break-even plus the defined profit when the specified risk-reward ratio is reached
breakEvenTriggerLong = entryPriceLong + (entryPriceLong - stopLossLong) * breakEvenRR
breakEvenTriggerShort = entryPriceShort - (stopLossShort - entryPriceShort) * breakEvenRR

if (longEntryAllowed and close >= breakEvenTriggerLong)
    stopLossLong := entryPriceLong + breakEvenProfit

if (shortEntryAllowed and close <= breakEvenTriggerShort)
    stopLossShort := entryPriceShort - breakEvenProfit

// Close all trades at 1600
if (hour == 15 and minute == 59)
    strategy.close_all(comment='Close at 1600')

// Define the daily loss variable and last trade day
var float[] dailyLossArray = array.new_float(1, 0.0)
var int[] lastTradeDayArray = array.new_int(1, na)

// Function to update the daily loss
updateDailyLoss() =>
    _dailyLoss = array.get(dailyLossArray, 0)
    _lastTradeDay = array.get(lastTradeDayArray, 0)
    if na(_lastTradeDay) or dayofmonth != _lastTradeDay
        _dailyLoss := 0.0
        array.set(lastTradeDayArray, 0, dayofmonth)
    if not na(strategy.closedtrades.entry_bar_index(strategy.closedtrades - 1))
        _dailyLoss += strategy.closedtrades.profit(strategy.closedtrades - 1)
    array.set(dailyLossArray, 0, _dailyLoss)

// Call the function to update the daily loss
updateDailyLoss()

// Execute Strategy
if longCondition and longEntryAllowed
    strategy.entry('Long', strategy.long)
    strategy.exit('Take Profit/Stop Loss', 'Long', stop=stopLossLong, limit=takeProfitLong)
    longEntryAllowed := false

if shortCondition and shortEntryAllowed
    strategy.entry('Short', strategy.short)
    strategy.exit('Take Profit/Stop Loss', 'Short', stop=stopLossShort, limit=takeProfitShort)
    shortEntryAllowed := false

// Reset entry control variables on position close
if strategy.position_size == 0
    longEntryAllowed := true
    shortEntryAllowed := true

// // Statistics
// winRate = strategy.wintrades / strategy.closedtrades * 100
// totalTrades = strategy.closedtrades
// averageProfit = strategy.grossprofit / strategy.wintrades
// averageLoss = strategy.grossloss / strategy.losstrades

// // Plotting
// plot(shortEma, color=color.new(color.red, 0), title='Short EMA')
// plot(longEma, color=color.new(color.blue, 0), title='Long EMA')

// // Display Table
// table statsTable = table.new(position=position.top_right, columns=2, rows=4, bgcolor=color.gray, border_width=1)
// table.cell(statsTable, column=0, row=0, text='Win Rate (%)', bgcolor=color.blue)
// table.cell(statsTable, column=1, row=0, text=str.tostring(winRate), bgcolor=color.blue)
// table.cell(statsTable, column=0, row=1, text='Total Trades', bgcolor=color.blue)
// table.cell(statsTable, column=1, row=1, text=str.tostring(totalTrades), bgcolor=color.blue)
// table.cell(statsTable, column=0, row=2, text='Average Profit', bgcolor=color.blue)
// table.cell(statsTable, column=1, row=2, text=str.tostring(averageProfit), bgcolor=color.blue)
// table.cell(statsTable, column=0, row=3, text='Average Loss', bgcolor=color.blue)
// table.cell(statsTable, column=1, row=3, text=str.tostring(averageLoss), bgcolor=color.blue)

```

> Detail

https://www.fmz.com/strategy/446441

> Last Modified

2024-03-28 16:46:29
