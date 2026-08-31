
> Name

Advanced-Dual-EMA-and-Supertrend-Combination-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8ec81ab093f1adea1b5.png)
![IMG](https://www.fmz.com/upload/asset/2d8cc84861159406ffb92.png)


#### Overview
This is a trend following trading strategy that combines a dual EMA system (EMA5 and EMA20) with the Supertrend indicator. The strategy generates trading signals based on the crossover of fast and slow moving averages, confirmed by the trend direction from the Supertrend indicator. The strategy design incorporates both trend confirmation and momentum change as key factors, utilizing a dual verification mechanism to enhance signal reliability.

#### Strategy Principles
The core logic is based on three key technical indicators:
1. Fast Exponential Moving Average (EMA5) for capturing short-term price movements
2. Slow Exponential Moving Average (EMA20) for confirming medium-term trend direction
3. Supertrend indicator based on ATR (Average True Range) for overall trend confirmation

Buy signals require two simultaneous conditions:
- EMA5 crosses above EMA20
- Supertrend indicator shows uptrend

Sell signals require:
- EMA5 crosses below EMA20
- Supertrend indicator shows downtrend

#### Strategy Advantages
1. Dual verification mechanism significantly improves trading signal reliability
2. Combines benefits of trend following and momentum trading
3. Clear visual indication system including buy/sell markers and trend lines
4. Real-time market status information panel
5. Parameters can be flexibly adjusted for different market environments
6. Suitable for medium to long-term trend trading

#### Strategy Risks
1. May generate frequent false signals in ranging markets
2. Potential for significant drawdowns in quick reversal scenarios
3. Fixed parameters may not suit all market conditions
Solutions:
- Recommended use on daily or 4-hour timeframes
- Implementation of strict stop-loss strategy
- Dynamic parameter adjustment based on market volatility
- Integration with other technical indicators for trade confirmation

#### Optimization Directions
1. Parameter Optimization:
- Adjust EMA periods based on market volatility characteristics
- Optimize Supertrend's ATR period and multiplier factor
2. Signal Filtering:
- Add volume confirmation mechanism
- Introduce volatility filter
3. Risk Management:
- Implement dynamic stop-loss strategy
- Add position sizing module
4. Trade Execution:
- Optimize entry timing selection
- Add scaled entry and exit functionality

#### Summary
This is a well-structured trend following strategy with clear logic. By combining the EMA system with the Supertrend indicator, it effectively balances signal accuracy and lag. The strategy's visualization design and information display system allow traders to quickly assess market conditions. Through proper parameter optimization and risk management, this strategy can achieve good trading results in trending markets.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-22 00:00:00
end: 2024-07-01 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("Advanced Supertrend + EMA Strategy", overlay=true)

// =================== PARAMETER INPUTS ===================
// EMA Parameters
emaFastLength = input.int(5, "Fast EMA", minval=1, maxval=50, group="EMA Settings")
emaSlowLength = input.int(20, "Slow EMA", minval=1, maxval=100, group="EMA Settings")

// Supertrend Parameters
atrPeriod = input.int(10, "ATR Period", minval=1, maxval=50, group="Supertrend Settings")
factor = input.float(3.0, "Factor", step=0.1, group="Supertrend Settings")

// =================== CALCULATIONS ===================
// EMA Calculations
emaFast = ta.ema(close, emaFastLength)
emaSlow = ta.ema(close, emaSlowLength)

// Supertrend Calculation
[supertrend, direction] = ta.supertrend(factor, atrPeriod)

// =================== SIGNAL GENERATION ===================
// EMA Crossovers
emaCrossUp = ta.crossover(emaFast, emaSlow)
emaCrossDown = ta.crossunder(emaFast, emaSlow)

// Supertrend Signals
stUp = direction < 0
stDown = direction > 0

// Buy and Sell Conditions
longCondition = emaCrossUp and stUp
shortCondition = emaCrossDown and stDown

// =================== GRAPHICAL INDICATORS ===================
// EMA Lines
plot(emaFast, color=color.new(color.blue, 0), linewidth=2, title="Fast EMA")
plot(emaSlow, color=color.new(color.red, 0), linewidth=2, title="Slow EMA")

// Supertrend Line
supertrendColor = direction < 0 ? color.green : color.red
plot(supertrend, color=supertrendColor, linewidth=2, title="Supertrend")

// Buy-Sell Signals
plotshape(longCondition, title="Buy", text="BUY", location=location.belowbar, 
     color=color.green, style=shape.labelup, size=size.normal, textcolor=color.white)

plotshape(shortCondition, title="Sell", text="SELL", location=location.abovebar, 
     color=color.red, style=shape.labeldown, size=size.normal, textcolor=color.white)

// =================== STRATEGY EXECUTIONS ===================
if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.close("Long")

// =================== INFORMATION TABLE ===================
var table infoTable = table.new(position.bottom_right, 2, 4, bgcolor=color.new(color.black, 90))

// Signal Status
signalText = ""
signalColor = color.white
if (longCondition)
    signalText := "BUY SIGNAL"
    signalColor := color.green
if (shortCondition)
    signalText := "SELL SIGNAL"
    signalColor := color.red

// Table Content
table.cell(infoTable, 0, 0, "CURRENT SIGNAL", bgcolor=color.new(color.blue, 90))
table.cell(infoTable, 1, 0, signalText, text_color=signalColor)

table.cell(infoTable, 0, 1, "EMA TREND")
table.cell(infoTable, 1, 1, emaFast > emaSlow ? "UP" : "DOWN", 
     text_color=emaFast > emaSlow ? color.green : color.red)

table.cell(infoTable, 0, 2, "SUPERTREND")
table.cell(infoTable, 1, 2, direction < 0 ? "UP" : "DOWN", 
     text_color=direction < 0 ? color.green : color.red)

// Last Trade Information
table.cell(infoTable, 0, 3, "LAST TRADE")
table.cell(infoTable, 1, 3, longCondition ? "BUY" : shortCondition ? "SELL" : "-", 
     text_color=longCondition ? color.green : shortCondition ? color.red : color.white)

```

> Detail

https://www.fmz.com/strategy/483021

> Last Modified

2025-02-27 17:20:22
