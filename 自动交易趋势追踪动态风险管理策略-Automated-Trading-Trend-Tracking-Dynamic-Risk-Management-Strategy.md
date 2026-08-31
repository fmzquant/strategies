
> Name

自动交易趋势追踪动态风险管理策略-Automated-Trading-Trend-Tracking-Dynamic-Risk-Management-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d943dcb2bede1c4371b1.png)
![IMG](https://www.fmz.com/upload/asset/2d7cf1878fea300d00001.png)





#### Overview

This is an automated trading strategy that combines moving averages, MACD indicators, and volume filtering, aimed at determining trend direction and managing trading risks through multiple technical indicators. The strategy judges market trends through short-term and long-term moving averages, confirms trend signals using MACD, and incorporates volume filtering and dynamic risk management mechanisms to enhance trading accuracy and stability.

#### Strategy Principle

The strategy primarily includes four core technical components:
1. Moving Average Trend Determination: Using short-term (20-period) and long-term (100-period) moving average crossovers to judge market trend direction.
2. MACD Signal Confirmation: Verifying the validity of trend signals through the relative position of MACD line and signal line.
3. Volume Filtering: Ensuring trades occur under active market conditions by comparing current volume with historical average volume.
4. Dynamic Risk Management: Calculating take-profit and stop-loss points using ATR indicators and setting daily maximum loss and maximum drawdown limits.

#### Strategy Advantages

1. Multiple Indicator Verification: Significantly improving signal accuracy by combining moving averages, MACD, and volume.
2. Dynamic Risk Control: Flexible position size calculation and risk management mechanisms effectively control per-trade and overall risks.
3. Trend Tracking Capability: Ability to capture medium-term market trends, reducing ineffective trades in oscillating markets.
4. Parameter Adjustability: Providing multiple customizable parameters for optimization across different market environments.

#### Strategy Risks

1. Lagging Risk: Moving averages and MACD have inherent lagging characteristics, potentially delaying trend reversal point capture.
2. Parameter Sensitivity: Strategy performance highly depends on chosen parameters, requiring continuous adjustment in different market environments.
3. Oscillating Market Challenges: In markets lacking clear trends, the strategy may generate frequent and ineffective trading signals.
4. Extreme Market Conditions: Risk control mechanisms might fail to completely avoid significant losses during violent fluctuations or black swan events.

#### Strategy Optimization Directions

1. Incorporate Machine Learning Algorithms: Introduce dynamic parameter adjustment mechanisms that adaptively optimize strategy parameters based on real-time market changes.
2. Multi-Period Verification: Introduce more technical indicators from different periods to improve signal reliability.
3. Correlation Analysis: Add market correlation analysis to reduce systematic risks between different assets.
4. Comprehensive Risk Assessment: Enhance risk models by incorporating more complex risk assessment indicators and scenario simulations.

#### Summary

This is an automated trading strategy comprehensively utilizing multiple technical analysis tools, aiming to provide a relatively stable and reliable trading method through strict risk management and multiple indicator verification. The strategy's core lies in balancing trend capture capabilities and risk control, providing a flexible and optimizable framework for quantitative trading.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-02 00:00:00
end: 2025-04-02 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Strategia Semmoncino", shorttitle="semmoncino", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10, commission_type=strategy.commission.percent, commission_value=0.05)

// Inputs
useVolumeFilter = input.bool(true, title="Usa Filtro di Volume")
volumeThreshold = input.float(1.5, title="Soglia Volume (x Media)", minval=1)
atrPeriod = input.int(14, title="ATR Period", minval=1)
atrMultiplier = input.float(2.0, title="ATR Multiplier", minval=0.1)
takeProfitMultiplier = input.float(6.0, title="Take Profit Multiplier", minval=1.0)  // Aumentato per ottimizzare
riskPerTrade = input.float(2.0, title="Rischio per Trade (%)", minval=0.1) / 100
maxDailyLoss = input.float(2.0, title="Perdita Massima Giornaliera (%)", minval=0.1) / 100
maxDrawdown = input.float(10.0, title="Drawdown Massimo (%)", minval=0.1) / 100
shortMAPeriod = input.int(20, title="MA Breve Termine", minval=1)
longMAPeriod = input.int(100, title="MA Lungo Termine", minval=1)

// MACD Inputs
macdFastLength = input.int(12, title="MACD Fast Length")
macdSlowLength = input.int(26, title="MACD Slow Length")
macdSignalLength = input.int(9, title="MACD Signal Length")

showSignals = input.bool(true, title="Mostra Segnali di Entrata")

// Prezzi di Apertura e Chiusura delle Candele Precedenti (senza repainting)
prevOpen = ta.valuewhen(1, open, 0)
prevClose = ta.valuewhen(1, close, 0)

// Calculate ATR
atr = ta.atr(atrPeriod)

// Calculate Volume Filter
volumeAvg = ta.sma(volume, 20)
volumeFilter = useVolumeFilter ? volume > (volumeAvg * volumeThreshold) : true

// Calculate Moving Averages
shortMA = ta.sma(close, shortMAPeriod)
longMA = ta.sma(close, longMAPeriod)

// Calculate MACD
[macdLine, signalLine, _] = ta.macd(close, macdFastLength, macdSlowLength, macdSignalLength)
macdConditionLong = macdLine > signalLine
macdConditionShort = macdLine < signalLine

// Determine Trend Direction
uptrend = shortMA > longMA
downtrend = shortMA < longMA

// Determine Order Conditions
longCondition = prevClose > prevOpen and volumeFilter and uptrend and macdConditionLong
shortCondition = prevClose < prevOpen and volumeFilter and downtrend and macdConditionShort

// Calcola la dimensione della posizione basata sul capitale iniziale
initialCapital = strategy.initial_capital
positionSize = (initialCapital * riskPerTrade) / (atr * atrMultiplier)

// Calculate Take Profit and Stop Loss Levels dynamically using ATR
takeProfitLong = close + (atr * takeProfitMultiplier)
stopLossLong = close - (atr * 1.5)  // Ridotto per ottimizzare
takeProfitShort = close - (atr * takeProfitMultiplier)
stopLossShort = close + (atr * 1.5)  // Ridotto per ottimizzare

// Limite di Perdita Giornaliera
var float dailyLossLimit = na
if na(dailyLossLimit) or (time - time) > 86400000 // Se è un nuovo giorno
    dailyLossLimit := strategy.equity * (1 - maxDailyLoss)

// Drawdown Massimo
var float drawdownLimit = na
if na(drawdownLimit)
    drawdownLimit := strategy.equity * (1 - maxDrawdown)

// Controllo delle Perdite
if strategy.equity < dailyLossLimit
    strategy.cancel_all()
    strategy.close_all()
    label.new(bar_index, high, text="Perdita Giornaliera Massima Raggiunta", color=color.red)

if strategy.equity < drawdownLimit
    strategy.cancel_all()
    strategy.close_all()
    label.new(bar_index, high, text="Drawdown Massimo Raggiunto", color=color.red)

// Strategy Entries
if (longCondition)
    strategy.entry("Long", strategy.long, qty=positionSize)
    strategy.exit("Take Profit/Stop Loss Long", from_entry="Long", limit=takeProfitLong, stop=stopLossLong)

if (shortCondition)
    strategy.entry("Short", strategy.short, qty=positionSize)
    strategy.exit("Take Profit/Stop Loss Short", from_entry="Short", limit=takeProfitShort, stop=stopLossShort)

// Plot Entry Signals
plotshape(series=longCondition and showSignals ? close : na, location=location.belowbar, color=color.green, style=shape.labelup, text="LONG")
plotshape(series=shortCondition and showSignals ? close : na, location=location.abovebar, color=color.red, style=shape.labeldown, text="SHORT")

// Plot Moving Averages
plot(shortMA, color=color.blue, title="MA Breve Termine", linewidth=2)
plot(longMA, color=color.orange, title="MA Lungo Termine", linewidth=2)

// Plot MACD
hline(0, "Zero Line", color=color.gray)
plot(macdLine - signalLine, title="MACD Histogram", color=color.red, style=plot.style_histogram)
```

> Detail

https://www.fmz.com/strategy/489319

> Last Modified

2025-04-03 13:43:11
