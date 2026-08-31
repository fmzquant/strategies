
> Name

市场结构摆动交易策略-Market-Structure-Swing-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d889bbaa839480382818.png)
![IMG](https://www.fmz.com/upload/asset/2d8516776554577d7f234.png)





#### Overview
The Market Structure Swing Trading Strategy is an advanced trading approach based on market structure changes, liquidity capture, and trend momentum. By analyzing key characteristics of price movements, the strategy identifies potential trend reversals and continuation opportunities, providing traders with a systematic decision-making framework.

#### Strategy Principles
The core principles are based on four key indicators:
1. Change of Character (CHoCH): Identifying potential market direction changes by detecting trend turning points.
2. Break of Structure (BOS): Confirming trend momentum and directional breakouts.
3. Inducements (IDM): Capturing market liquidity traps and money flow.
4. Sweeps: Identifying false breakouts and liquidity grab opportunities.

The strategy integrates technical analysis indicators, including Average True Range (ATR), Relative Strength Index (RSI), and volume, to construct a multi-dimensional trading decision system.

#### Strategy Advantages
1. Systematic Risk Management: Effectively controlling single-trade risk through ATR-based stop-loss and take-profit calculations.
2. Multiple Filter Conditions: Combining CHoCH, BOS, RSI, and volume to improve signal accuracy.
3. Dynamic Position Management: Optimizing capital efficiency using percentage of equity positioning.
4. Flexible Entry and Exit Mechanisms: Dynamically adjusting trading strategies based on market structure.

#### Strategy Risks
1. False Breakout Risk: Market structure indicators may generate misleading signals.
2. Parameter Sensitivity: Strategy performance significantly depends on parameter settings.
3. Volume and Liquidity Risks: Potential poor performance in low-liquidity markets.
4. Drawdown Control: Possible significant drawdowns in persistent trend markets.

#### Strategy Optimization Directions
1. Introduce Machine Learning Algorithms: Optimize parameter selection and signal identification.
2. Incorporate Multi-Timeframe Analysis: Improve signal reliability.
3. Develop Dynamic Risk Management Modules: Adjust positions based on market volatility.
4. Integrate Additional Technical Indicators: Enhance signal filtering using MACD, Bollinger Bands, etc.

#### Conclusion
The Market Structure Swing Trading Strategy is an advanced quantitative trading method that provides traders with a powerful decision-making framework through systematic market structure analysis. With continuous optimization and risk management, the strategy has the potential to achieve stable trading performance across different market environments.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-28 00:00:00
end: 2025-03-27 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("Market Structure Swing Trading", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=5)

// === Input Parameters ===
len = input(50, "CHoCH Detection Period")
shortLen = input(3, "IDM Detection Period")
atrMultiplierSL = input(2.0, "ATR Multiplier for Stop Loss")
atrMultiplierTP = input(3.0, "ATR Multiplier for Take Profit")
rsiPeriod = input(14, "RSI Period")
rsiOverbought = input(70, "RSI Overbought Level")
rsiOversold = input(30, "RSI Oversold Level")
volThreshold = input(1.2, "Volume Multiplier Threshold") 

// === ATR Calculation for SL & TP ===
atr = ta.atr(14)
stopLossLong = close - (atr * atrMultiplierSL)
takeProfitLong = close + (atr * atrMultiplierTP)
stopLossShort = close + (atr * atrMultiplierSL)
takeProfitShort = close - (atr * atrMultiplierTP)

// === RSI Filter ===
rsi = ta.rsi(close, rsiPeriod)
longConditionRSI = rsi < rsiOversold
shortConditionRSI = rsi > rsiOverbought

// === Volume Filter ===
volThresholdValue = ta.sma(volume, 20) * volThreshold
highVolume = volume > volThresholdValue

// === Market Structure Functions ===
swings(len) =>
    var int topx = na
    var int btmx = na
    upper = ta.highest(len)
    lower = ta.lowest(len)
    top = high[len] > upper ? high[len] : na
    btm = low[len] < lower ? low[len] : na
    topx := top ? bar_index[len] : topx
    btmx := btm ? bar_index[len] : btmx
    [top, topx, btm, btmx]

[top, topx, btm, btmx] = swings(len)

// === CHoCH Detection ===
var float topy = na
var float btmy = na
var os = 0
var top_crossed = false
var btm_crossed = false

if top
    topy := top
    top_crossed := false
if btm
    btmy := btm
    btm_crossed := false

if close > topy and not top_crossed
    os := 1
    top_crossed := true
if close < btmy and not btm_crossed
    os := 0
    btm_crossed := true

// === Break of Structure (BOS) ===
var float max = na
var float min = na
var int max_x1 = na
var int min_x1 = na

if os != os[1]
    max := high
    min := low
    max_x1 := bar_index
    min_x1 := bar_index

bullishBOS = close > max and os == 1
bearishBOS = close < min and os == 0

// === Trade Conditions with Filters ===
longEntry = bullishBOS and longConditionRSI and highVolume
shortEntry = bearishBOS and shortConditionRSI and highVolume

// === Execute Trades ===
if longEntry
    strategy.entry("Long", strategy.long)
    strategy.exit("Long TP/SL", from_entry="Long", stop=stopLossLong, limit=takeProfitLong)

if shortEntry
    strategy.entry("Short", strategy.short)
    strategy.exit("Short TP/SL", from_entry="Short", stop=stopLossShort, limit=takeProfitShort)

// === Plotting Market Structure ===
plotshape(series=longEntry, location=location.belowbar, color=color.green, style=shape.labelup, title="BUY")
plotshape(series=shortEntry, location=location.abovebar, color=color.red, style=shape.labeldown, title="SELL")
plot(topy, color=color.blue, title="CHoCH High")
plot(btmy, color=color.orange, title="CHoCH Low")

```

> Detail

https://www.fmz.com/strategy/488545

> Last Modified

2025-03-28 17:38:45
