
> Name

Multi-EMA-Trend-Following-Strategy-with-Dynamic-Volatility-Filter

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f5bf8cc0abd714900e.png)

[trans]
#### 概述
该策略是一个结合了趋势跟踪和波动率过滤的智能交易系统。它通过指数移动平均线(EMA)识别市场趋势,利用真实波动幅度(TR)和动态波动率过滤器来确定入场时机,并采用基于波动性的动态止盈止损机制管理风险。策略支持两种交易模式:短线(Scalp)和波段(Swing),可以根据不同的市场环境和交易风格灵活切换。

#### 策略原理
策略的核心逻辑包含以下几个关键组成部分:
1. 趋势识别:使用50周期EMA作为趋势过滤器,只在价格位于EMA之上做多,位于EMA之下做空。
2. 波动率过滤:计算真实波动幅度(TR)的EMA,并使用可调节的过滤系数(默认1.5)来过滤市场噪音。
3. 入场条件:结合连续3根K线的形态分析,要求价格运动具有持续性和加速特征。
4. 止盈止损:在短线模式下基于当前TR设置,波段模式下基于前期高低点设置,实现动态风险管理。

#### 策略优势
1. 自适应性强:通过动态波动率过滤和趋势跟踪相结合,能够适应不同市场环境。
2. 风险管理完善:提供两种交易模式的动态止盈止损机制,可根据市场特征灵活选择。
3. 参数可调性好:关键参数如过滤系数、趋势周期等都可以根据交易品种特点进行优化。
4. 可视化效果佳:提供清晰的买卖信号标记和止盈止损位显示,便于交易监控。

#### 策略风险
1. 趋势反转风险:在趋势转折点可能出现连续止损。
2. 假突破风险:在波动率突增时可能触发虚假信号。
3. 参数敏感性:过滤系数设置不当可能导致信号过多或过少。
4. 滑点影响:在快速市场中可能面临较大滑点,影响策略表现。

#### 策略优化方向
1. 增加趋势强度过滤:可引入ADX等指标评估趋势强度,提高趋势跟踪效果。
2. 优化止盈止损:可考虑引入移动止损,保护更多利润。
3. 完善波段模式:可加入更多波段交易特有的判断条件,提高中长期持仓能力。
4. 增加成交量分析:结合成交量变化来确认突破的有效性。

#### 总结
该策略通过将趋势跟踪、波动率过滤和动态风险管理有机结合,构建了一个完整的交易系统。策略的优势在于其适应性强、风险可控,同时提供了较大的优化空间。通过合理设置参数和选择合适的交易模式,该策略能够在不同市场环境下保持稳定表现。建议交易者在实盘使用前,进行充分的回测和参数优化,并根据具体交易品种的特点做出相应调整。 ||

#### Overview
This strategy is an intelligent trading system that combines trend following with volatility filtering. It identifies market trends using Exponential Moving Averages (EMA), determines entry timing through True Range (TR) and dynamic volatility filters, and manages risk using a volatility-based dynamic stop-loss/take-profit mechanism. The strategy supports two trading modes: Scalp and Swing, which can be flexibly switched based on different market environments and trading styles.

#### Strategy Principles
The core logic includes the following key components:
1. Trend Identification: Uses 50-period EMA as a trend filter, only taking long positions above EMA and short positions below EMA.
2. Volatility Filtering: Calculates EMA of True Range (TR) and uses an adjustable filter coefficient (default 1.5) to filter market noise.
3. Entry Conditions: Combines analysis of three consecutive candles, requiring price movement to show continuity and acceleration characteristics.
4. Stop-Loss/Take-Profit: Set based on current TR in scalp mode and based on previous highs/lows in swing mode, achieving dynamic risk management.

#### Strategy Advantages
1. Strong Adaptability: Adapts to different market environments through the combination of dynamic volatility filtering and trend following.
2. Comprehensive Risk Management: Provides dynamic stop-loss/take-profit mechanisms for both trading modes, allowing flexible selection based on market characteristics.
3. Good Parameter Adjustability: Key parameters such as filter coefficient and trend period can be optimized according to trading instrument characteristics.
4. Excellent Visualization: Provides clear buy/sell signal markers and stop-loss/take-profit level displays for easy trade monitoring.

#### Strategy Risks
1. Trend Reversal Risk: May experience consecutive stops at trend turning points.
2. False Breakout Risk: May trigger false signals during sudden volatility increases.
3. Parameter Sensitivity: Improper filter coefficient settings may lead to too many or too few signals.
4. Slippage Impact: May face significant slippage in fast markets, affecting strategy performance.

#### Strategy Optimization Directions
1. Add Trend Strength Filtering: Can introduce indicators like ADX to evaluate trend strength and improve trend following effectiveness.
2. Optimize Stop-Loss/Take-Profit: Can consider introducing trailing stops to protect more profits.
3. Improve Swing Mode: Can add more swing-trading-specific conditions to enhance medium to long-term holding capability.
4. Add Volume Analysis: Combine volume changes to confirm breakout validity.

#### Summary
This strategy constructs a complete trading system by organically combining trend following, volatility filtering, and dynamic risk management. Its strengths lie in its adaptability, controllable risk, while providing significant optimization potential. Through proper parameter settings and appropriate trading mode selection, the strategy can maintain stable performance in different market environments. Traders are advised to conduct thorough backtesting and parameter optimization before live trading, and make appropriate adjustments based on specific trading instrument characteristics.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-12-17 00:00:00
end: 2025-01-15 08:00:00
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":49999}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Creativ3mindz

//@version=5
strategy("Scalp Slayer (I)", overlay=true)

// Input Parameters
filterNumber = input.float(1.5, "Filter Number", minval=1.0, maxval=10.0, tooltip="Higher = More aggressive Filter, Lower = Less aggressive")
emaTrendPeriod = input.int(50, "EMA Trend Period", minval=1, tooltip="Period for the EMA used for trend filtering")
lookbackPeriod = input.int(20, "Lookback Period for Highs/Lows", minval=1, tooltip="Period for determining recent highs/lows")
colorTP = input.color(title='Take Profit Color', defval=color.orange)
colorSL = input.color(title='Stop Loss Color', defval=color.red)

// Inputs for visibility
showBuyLabels = input.bool(true, title="Show Buy Labels")
showSellLabels = input.bool(true, title="Show Sell Labels")

// Alert Options
alertOnCondition = input.bool(true, title="Alert on Condition Met", tooltip="Enable to alert when condition is met")

// Trade Mode Toggle
tradeMode = input.bool(false, title="Trade Mode (ON = Swing, OFF = Scalp)", tooltip="Swing-mode you can use your own TP/SL.")

// Calculations
tr = high - low
ema = filterNumber * ta.ema(tr, 50)
trendEma = ta.ema(close, emaTrendPeriod)  // Calculate the EMA for the trend filter

// Highest and lowest high/low within lookback period for swing logic
swingHigh = ta.highest(high, lookbackPeriod)
swingLow = ta.lowest(low, lookbackPeriod)

// Variables to track the entry prices and SL/TP levels
var float entryPriceLong = na
var float entryPriceShort = na
var float targetPriceLong = na
var float targetPriceShort = na
var float stopLossLong = na
var float stopLossShort = na
var bool tradeActive = false

// Buy and Sell Conditions with Trend Filter
buyCondition = close > trendEma and  // Buy only if above the trend EMA
      close[2] > open[2] and close[1] > open[1] and close > open and 
      (math.abs(close[2] - open[2]) > math.abs(close[1] - open[1])) and 
      (math.abs(close - open) > math.abs(close[1] - open[1])) and 
      close > close[1] and close[1] > close[2] and tr > ema

sellCondition = close < trendEma and  // Sell only if below the trend EMA
       close[2] < open[2] and close[1] < open[1] and close < open and 
       (math.abs(close[2] - open[2]) > math.abs(close[1] - open[1])) and 
       (math.abs(close - open) > math.abs(close[1] - open[1])) and 
       close < close[1] and close[1] < close[2] and tr > ema

// Entry Rules
if (buyCondition and not tradeActive)
    entryPriceLong := close  // Track entry price for long position
    stopLossLong := tradeMode ? ta.lowest(low, lookbackPeriod) : swingLow  // Scalping: recent low, Swing: lowest low of lookback period
    targetPriceLong := tradeMode ? close + tr : swingHigh  // Scalping: close + ATR, Swing: highest high of lookback period
    tradeActive := true

if (sellCondition and not tradeActive)
    entryPriceShort := close  // Track entry price for short position
    stopLossShort := tradeMode ? ta.highest(high, lookbackPeriod) : swingHigh  // Scalping: recent high, Swing: highest high of lookback period
    targetPriceShort := tradeMode ? close - tr : swingLow  // Scalping: close - ATR, Swing: lowest low of lookback period
    tradeActive := true

// Take Profit and Stop Loss Logic
signalBuyTPPrint = (not na(entryPriceLong) and close >= targetPriceLong)
signalSellTPPrint = (not na(entryPriceShort) and close <= targetPriceShort)

signalBuySLPrint = (not na(entryPriceLong) and close <= stopLossLong)
signalSellSLPrint = (not na(entryPriceShort) and close >= stopLossShort)

if (signalBuyTPPrint or signalBuySLPrint)
    entryPriceLong := na  // Reset entry price for long position
    targetPriceLong := na  // Reset target price for long position
    stopLossLong := na  // Reset stop-loss for long position
    tradeActive := false

if (signalSellTPPrint or signalSellSLPrint)
    entryPriceShort := na  // Reset entry price for short position
    targetPriceShort := na  // Reset target price for short position
    stopLossShort := na  // Reset stop-loss for short position
    tradeActive := false

// Plot Buy and Sell Labels with Visibility Conditions
plotshape(showBuyLabels and buyCondition, "Buy", shape.labelup, location=location.belowbar, color=color.green, text="BUY", textcolor=color.white, size=size.tiny)
plotshape(showSellLabels and sellCondition, "Sell", shape.labeldown, location=location.abovebar, color=color.red, text="SELL", textcolor=color.white, size=size.tiny)

// Plot Take Profit Flags
plotshape(showBuyLabels and signalBuyTPPrint, title="Take Profit (buys)", text="TP", style=shape.flag, location=location.abovebar, color=colorTP, textcolor=color.white, size=size.tiny)
plotshape(showSellLabels and signalSellTPPrint, title="Take Profit (sells)", text="TP", style=shape.flag, location=location.belowbar, color=colorTP, textcolor=color.white, size=size.tiny)

// Plot Stop Loss "X" Marker
plotshape(showBuyLabels and signalBuySLPrint, title="Stop Loss (buys)", text="X", style=shape.xcross, location=location.belowbar, color=colorSL, textcolor=color.white, size=size.tiny)
plotshape(showSellLabels and signalSellSLPrint, title="Stop Loss (sells)", text="X", style=shape.xcross, location=location.abovebar, color=colorSL, textcolor=color.white, size=size.tiny)

// Alerts

alertcondition(buyCondition and alertOnCondition, title="Buy Alert", message='{"content": "Buy {{ticker}} at {{close}}"}')
alertcondition(sellCondition and alertOnCondition, title="Sell Alert", message='{"content": "Sell {{ticker}} at {{close}}"}')
alertcondition(signalBuyTPPrint and alertOnCondition, title="Buy TP Alert", message='{"content": "Buy TP {{ticker}} at {{close}}"}')
alertcondition(signalSellTPPrint and alertOnCondition, title="Sell TP Alert", message='{"content": "Sell TP {{ticker}} at {{close}}"}')
alertcondition(signalBuySLPrint and alertOnCondition, title="Buy SL Alert", message='{"content": "Buy SL {{ticker}} at {{close}}"}')
alertcondition(signalSellSLPrint and alertOnCondition, title="Sell SL Alert", message='{"content": "Sell SL {{ticker}} at {{close}}"}')

if buyCondition
    strategy.entry("Enter Long", strategy.long)
else if sellCondition
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/478707

> Last Modified

2025-01-17 15:00:37
