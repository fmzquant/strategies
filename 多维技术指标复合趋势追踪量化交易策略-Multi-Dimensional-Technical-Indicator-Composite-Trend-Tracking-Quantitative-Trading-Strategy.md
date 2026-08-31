
> Name

多维技术指标复合趋势追踪量化交易策略-Multi-Dimensional-Technical-Indicator-Composite-Trend-Tracking-Quantitative-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8681741ff7d0fbbed9b.png)
![IMG](https://www.fmz.com/upload/asset/2d9086d593192ed8bf8e5.png)





#### Overview

This strategy is a quantitative trading method that comprehensively utilizes multiple technical indicators, aiming to precisely capture market trends and achieve controllable trading risks by combining Exponential Moving Averages (EMA), Relative Strength Index (RSI), Average True Range (ATR), Volume Weighted Average Price (VWAP), and Supertrend indicators.

#### Strategy Principles

The core principle is based on the synergistic effect of multi-dimensional technical indicators:
1. Use 50-day and 200-day Exponential Moving Averages (EMA) to determine trend direction and potential trend reversal points
2. Confirm trend momentum and avoid excessive chasing through the Relative Strength Index (RSI)
3. Calculate dynamic stop-loss and take-profit distances using Average True Range (ATR)
4. Verify price trend support and resistance levels with Volume Weighted Average Price (VWAP)
5. Use Supertrend indicator to confirm trend direction and trading signals

#### Strategy Advantages

1. Multi-indicator Collaboration: Significantly improve signal accuracy and reliability by integrating multiple technical indicators
2. Risk Management: Dynamic ATR stop-loss and fixed risk-reward ratio effectively control single trade risk
3. High Flexibility: Parameters can be adjusted according to market changes, adapting to different market environments
4. Signal Filtering: Reduce erroneous trades by filtering uncertain signals through RSI and VWAP indicators
5. Real-time Performance: Generate real-time trading signals and alerts for quick market response

#### Strategy Risks

1. Parameter Sensitivity: Improper indicator parameter settings may lead to frequent or missing trading signals
2. Market Black Swan Events: Cannot completely avoid sudden market events and violent fluctuations
3. Overfitting Risk: Requires thorough backtesting and verification of strategy parameters
4. Trading Costs: Frequent trading may increase commission and slippage costs
5. Indicator Failure: Some technical indicators may lose predictive power in certain market phases

#### Strategy Optimization Directions

1. Introduce Machine Learning Algorithms: Use AI technology to dynamically adjust indicator parameters
2. Add More Filtering Conditions: Introduce additional indicators like volatility and trading volume
3. Develop Multi-cycle Analysis Module: Verify trading signals across different time scales
4. Optimize Risk Management: Introduce more complex position and capital management strategies
5. Add Adaptive Parameters: Automatically adjust stop-loss and take-profit strategies based on market volatility

#### Summary

This is a quantitative trading strategy based on multi-dimensional technical indicators, aimed at capturing market trends and controlling trading risks through systematic indicator combinations and strict risk management. The strategy's core lies in the collaborative effect of indicators and dynamic parameter optimization, providing a flexible and relatively robust approach to quantitative trading.



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-02-25 00:00:00
end: 2025-03-27 00:00:00
period: 5m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy("Advanced BTC/USDT Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// ==== INPUT PARAMETERS ====
emaShortLength = input.int(50, title="Short EMA Length")
emaLongLength = input.int(200, title="Long EMA Length")
rsiLength = input.int(14, title="RSI Length")
atrLength = input.int(14, title="ATR Length")
supertrendFactor = input.float(2.0, title="Supertrend Factor")
supertrendATRLength = input.int(10, title="Supertrend ATR Length")
riskRewardRatio = input.float(2.0, title="Risk-Reward Ratio")

// ==== TECHNICAL INDICATORS ====
// Exponential Moving Averages (EMA)
emaShort = ta.ema(close, emaShortLength)
emaLong = ta.ema(close, emaLongLength)

// Relative Strength Index (RSI)
rsi = ta.rsi(close, rsiLength)

// Supertrend Indicator
[supertrend, supertrendDirection] = ta.supertrend(supertrendFactor, supertrendATRLength)

// Average True Range (ATR) for Stop Loss Calculation
atr = ta.atr(atrLength)
stopLossDistance = atr * 1.5  // ATR-based stop-loss
takeProfitDistance = stopLossDistance * riskRewardRatio

// Volume Weighted Average Price (VWAP)
vwap = ta.vwap(close)

// ==== ENTRY CONDITIONS ====
// Long Entry: Golden Cross + RSI Confirmation + VWAP Support + Supertrend Uptrend
longCondition = ta.crossover(emaShort, emaLong) and rsi > 40 and rsi < 65 and close > vwap and supertrendDirection == 1

// Short Entry: Death Cross + RSI Confirmation + VWAP Resistance + Supertrend Downtrend
shortCondition = ta.crossunder(emaShort, emaLong) and rsi > 60 and rsi < 80 and close < vwap and supertrendDirection == -1

// ==== EXIT CONDITIONS ====
// Stop-Loss and Take-Profit Levels for Long Positions
longStopLoss = close - stopLossDistance
longTakeProfit = close + takeProfitDistance

// Stop-Loss and Take-Profit Levels for Short Positions
shortStopLoss = close + stopLossDistance
shortTakeProfit = close - takeProfitDistance

// ==== TRADE EXECUTION ====
// Open Long Trade
if (longCondition)
    strategy.entry("Long", strategy.long)
    strategy.exit("Long Exit", from_entry="Long", limit=longTakeProfit, stop=longStopLoss)

// Open Short Trade
if (shortCondition)
    strategy.entry("Short", strategy.short)
    strategy.exit("Short Exit", from_entry="Short", limit=shortTakeProfit, stop=shortStopLoss)

// ==== ALERT SYSTEM (OPTIONAL) ====
// Send real-time alerts for buy/sell signals
alertcondition(longCondition, title="BUY Alert ?", message="BTC Buy Signal! ?")
alertcondition(shortCondition, title="SELL Alert ?", message="BTC Sell Signal! ?")

// ==== PLOTTING ====
// Plot Moving Averages
plot(emaShort, color=color.blue, title="50 EMA")
plot(emaLong, color=color.red, title="200 EMA")

// Plot Supertrend
plot(supertrend, color=supertrendDirection == 1 ? color.green : color.red, title="Supertrend")

// Plot VWAP
plot(vwap, color=color.orange, title="VWAP")

// Plot Buy/Sell Signals
plotshape(series=longCondition, location=location.belowbar, color=color.green, style=shape.labelup, title="Buy Signal")
plotshape(series=shortCondition, location=location.abovebar, color=color.red, style=shape.labeldown, title="Sell Signal")

```

> Detail

https://www.fmz.com/strategy/488539

> Last Modified

2025-03-28 17:22:09
