
> Name

EMA-SMA-CCI-ATR-均线完美排列策略与趋势魔法指标自动交易系统-EMA-SMA-CCI-ATR-Perfect-Order-Moving-Average-Strategy-with-Trend-Magic-Indicator-Auto-Trading-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6a35f6fb3663d3b00d.png)


#### Overview

This strategy combines the Perfect Order of moving averages with the Trend Magic indicator to capture market trends. It utilizes three moving averages (EMA45, SMA90, and SMA180) along with a Trend Magic indicator based on CCI and ATR calculations. The core of the strategy lies in identifying the Perfect Order of moving averages while confirming trend reversals using color changes in the Trend Magic indicator to generate trading signals. This approach aims to reduce false signals and trade only when strong trends are forming.

#### Strategy Principles

The strategy operates based on the following key elements:

1. Perfect Order of Moving Averages: Using EMA45, SMA90, and SMA180, when they align in a specific order (Bullish: EMA45 > SMA90 > SMA180; Bearish: EMA45 < SMA90 < SMA180), it's considered a strong signal of an established trend.

2. Trend Magic Indicator: This is a custom indicator based on the CCI (Commodity Channel Index) and ATR (Average True Range). It indicates potential trend reversals through color changes.

3. Entry Conditions: Trading signals are generated only when both the Perfect Order of moving averages and the Trend Magic indicator color change are satisfied. This ensures trades are taken only when strong trends are forming.

4. Risk Management: The strategy employs stop-loss and take-profit targets based on a risk-reward ratio. The stop-loss is set at the SMA90 level at entry, and the take-profit is set at 1.5 times the risk.

#### Strategy Advantages

1. Trend Following: By combining multiple indicators, the strategy effectively captures medium to long-term trends, reducing false signals.

2. Risk Control: Built-in risk management mechanisms, including fixed stop-loss and risk-reward based take-profit targets, help control risk for each trade.

3. Flexibility: The strategy allows users to adjust various parameters such as CCI period, ATR multiplier, and moving average periods to adapt to different market conditions and personal preferences.

4. Visualization: The strategy plots the Trend Magic indicator and moving averages on the chart, allowing traders to visually analyze market trends.

#### Strategy Risks

1. Lag: Due to the use of moving averages and other lagging indicators, the strategy may miss some opportunities at the beginning of trends.

2. Choppy Markets: In sideways or choppy markets, the strategy may generate frequent false signals, leading to overtrading.

3. Fixed Stop-Loss: Using the fixed SMA90 as a stop-loss may be too loose in some situations, increasing potential losses.

4. Parameter Sensitivity: The strategy's performance may be sensitive to parameter settings, requiring careful optimization and backtesting.

#### Strategy Optimization Directions

1. Dynamic Stop-Loss: Consider implementing a trailing stop to adjust the stop-loss level as the price moves, better protecting profits.

2. Market State Filter: Introduce volatility or trend strength filters to adjust strategy behavior under different market conditions.

3. Multiple Timeframe Analysis: Incorporate multiple timeframe analysis to improve signal reliability and reduce false signals.

4. Volume Analysis: Add volume analysis or other quantitative indicators to enhance trend confirmation and reversal identification.

5. Machine Learning Optimization: Use machine learning algorithms to dynamically adjust parameters to adapt to changing market conditions.

#### Summary

This automated trading strategy combining the Perfect Order of moving averages with the Trend Magic indicator showcases a promising approach to trend following. By leveraging multiple technical indicators, the strategy aims to capture strong market trends while controlling risk through built-in risk management mechanisms. Although there are some inherent limitations such as lag and parameter sensitivity, with continuous optimization and adaptive adjustments, this strategy has the potential to be an effective trading tool. It may perform particularly well in markets with clear medium to long-term trends. However, traders should remember that no strategy is perfect, and continuous monitoring, backtesting, and optimization are key to long-term success.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-08-26 00:00:00
end: 2024-09-24 08:00:00
period: 5m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © PakunFX

//@version=5
strategy("Trend Magic with EMA, SMA, and Auto-Trading", shorttitle="TM_Trading", overlay=true, format=format.price, precision=2)

// Inputs
period = input.int(21, "CCI period")
coeff = input.float(1.0, "ATR Multiplier")
AP = input.int(7, "ATR Period")
riskRewardRatio = input.float(1.5, "Risk/Reward Ratio")  // Risk/Reward Ratio for take profit

// Calculations
ATR = ta.sma(ta.tr, AP)
src = input(close)
upT = low - ATR * coeff
downT = high + ATR * coeff
var MagicTrend = 0.0
MagicTrend := ta.cci(src, period) >= 0 ? (upT < nz(MagicTrend[1]) ? nz(MagicTrend[1]) : upT) : (downT > nz(MagicTrend[1]) ? nz(MagicTrend[1]) : downT)

// Define colors for Trend Magic
color1 = ta.cci(src, period) >= 0 ? color.rgb(0, 34, 252) : color.rgb(252, 4, 0)
isBlue = ta.cci(src, period) >= 0
isRed = ta.cci(src, period) < 0

// Convert bool to float (1 for true, 0 for false)
isBlueFloat = isBlue ? 1 : 0
isRedFloat = isRed ? 1 : 0

// Moving Averages
ema45 = ta.ema(close, 45)
sma90 = ta.sma(close, 90)
sma180 = ta.sma(close, 180)

// Plot Trend Magic
plot(MagicTrend, color=color1, linewidth=3)

// Alerts
alertcondition(ta.cross(close, MagicTrend), title="Cross Alert", message="Price - MagicTrend Crossing!")
alertcondition(ta.crossover(low, MagicTrend), title="CrossOver Alarm", message="BUY SIGNAL!")
alertcondition(ta.crossunder(high, MagicTrend), title="CrossUnder Alarm", message="SELL SIGNAL!")

// Perfect Order conditions
bullishPerfectOrder = ema45 > sma90 and sma90 > sma180  // Bullish Perfect Order
bearishPerfectOrder = ema45 < sma90 and sma90 < sma180  // Bearish Perfect Order

// Trend Magic color change detection
trendMagicTurnedBlue = ta.crossover(isBlueFloat, isRedFloat)  // Red to Blue crossover (For long entry)
trendMagicTurnedRed = ta.crossunder(isBlueFloat, isRedFloat)  // Blue to Red crossover (For short entry)

// Variables to store SMA90 at the entry
var float longSma90 = na
var float shortSma90 = na

// Trading logic based on Perfect Order and color change
longCondition = bullishPerfectOrder and trendMagicTurnedBlue  // Buy when Perfect Order is bullish and Trend Magic turns red to blue
shortCondition = bearishPerfectOrder and trendMagicTurnedRed  // Sell when Perfect Order is bearish and Trend Magic turns blue to red

// Strategy Entry
if (longCondition)
    strategy.entry("Buy", strategy.long)
    longSma90 := sma90  // Store SMA90 at entry for long position

if (shortCondition)
    strategy.entry("Sell", strategy.short)
    shortSma90 := sma90  // Store SMA90 at entry for short position

// Stop-Loss and Take-Profit calculations
// For Long Positions: stop at SMA90 (fixed at entry), take profit at 1.5x risk
if (longCondition and not na(longSma90))
    longStopLoss = longSma90  // Use SMA90 at the time of entry
    longRisk = close - longSma90  // Calculate risk
    longTakeProfit = close + longRisk * riskRewardRatio  // Calculate take profit
    strategy.exit("Take Profit/Stop Loss", "Buy", stop=longStopLoss, limit=longTakeProfit)

// For Short Positions: stop at SMA90 (fixed at entry), take profit at 1.5x risk
if (shortCondition and not na(shortSma90))
    shortStopLoss = shortSma90  // Use SMA90 at the time of entry
    shortRisk = shortSma90 - close  // Calculate risk
    shortTakeProfit = close - shortRisk * riskRewardRatio  // Calculate take profit
    strategy.exit("Take Profit/Stop Loss", "Sell", stop=shortStopLoss, limit=shortTakeProfit)

// Plot Moving Averages
plot(ema45, color=color.green, title="EMA 45")
plot(sma90, color=color.blue, title="SMA 90")
plot(sma180, color=color.red, title="SMA 180")

```

> Detail

https://www.fmz.com/strategy/468328

> Last Modified

2024-09-26 15:52:31
