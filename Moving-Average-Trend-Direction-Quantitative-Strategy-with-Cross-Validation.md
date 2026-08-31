
> Name

Moving-Average-Trend-Direction-Quantitative-Strategy-with-Cross-Validation

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8101426a700f0354046.png)
![IMG](https://www.fmz.com/upload/asset/2d90fc3991bc853006596.png)


[trans]
#### 概述
这是一个基于多重移动均线交叉信号的量化交易策略。策略采用开盘价和收盘价的移动均线交叉作为交易信号,并支持多种移动均线类型,包括SMMA、EMA、DEMA等。策略具有高度的可配置性,可以根据不同的市场环境和交易需求进行参数优化。

#### 策略原理
策略的核心是通过监测开盘价移动均线和收盘价移动均线的交叉来识别市场趋势的转换点。当收盘价均线上穿开盘价均线时,产生做多信号;当收盘价均线下穿开盘价均线时,产生做空信号。策略支持多个时间周期的回测,并提供止盈止损功能来管理风险。

#### 策略优势
1. 灵活的均线选择:支持11种不同类型的移动均线,可以根据不同市场特征选择最适合的均线类型。
2. 完善的风险管理:内置止盈止损机制,可以有效控制每笔交易的风险。
3. 多周期适配:支持从分钟到月度等多个时间周期,并可以通过参数调整进行周期倍数的优化。
4. 可视化支持:提供趋势颜色标记功能,便于直观理解市场走势。

#### 策略风险
1. 滞后性风险:移动均线本质上是滞后指标,在剧烈波动的市场中可能产生滞后信号。
2. 震荡市风险:在横盘震荡市场中,频繁的交叉信号可能导致过度交易。
3. 参数依赖:策略效果严重依赖于参数的选择,不同市场环境可能需要不同的参数组合。

#### 策略优化方向
1. 信号过滤:可以添加成交量、波动率等辅助指标来过滤假信号。
2. 动态参数:引入自适应参数机制,根据市场状态动态调整均线周期和类型。
3. 仓位管理:优化仓位管理系统,根据市场波动性和趋势强度动态调整持仓比例。

#### 总结
该策略通过多重移动均线的交叉信号捕捉市场趋势的转换点,具有较强的可配置性和风险管理能力。通过合理的参数优化和信号过滤,可以在不同的市场环境中保持稳定的表现。策略的成功关键在于选择合适的均线类型和参数组合,以及建立有效的风险控制机制。 ||


#### Overview
This is a quantitative trading strategy based on multiple moving average crossover signals. The strategy uses crossovers between moving averages of opening and closing prices as trading signals, supporting various types of moving averages including SMMA, EMA, DEMA, etc. The strategy offers high configurability and can be optimized for different market environments and trading requirements.

#### Strategy Principle
The core principle is to identify market trend reversal points by monitoring crossovers between moving averages of opening and closing prices. A long signal is generated when the closing price MA crosses above the opening price MA, while a short signal is generated when the closing price MA crosses below the opening price MA. The strategy supports multi-timeframe backtesting and includes stop-loss and take-profit functionality for risk management.

#### Strategy Advantages
1. Flexible MA Selection: Supports 11 different types of moving averages, allowing selection of the most suitable MA type for different market characteristics.
2. Comprehensive Risk Management: Built-in stop-loss and take-profit mechanisms effectively control risk for each trade.
3. Multi-timeframe Adaptation: Supports multiple timeframes from minutes to monthly, with adjustable period multipliers for optimization.
4. Visualization Support: Provides trend color marking functionality for intuitive understanding of market trends.

#### Strategy Risks
1. Lag Risk: Moving averages are inherently lagging indicators, potentially generating delayed signals in volatile markets.
2. Ranging Market Risk: Frequent crossover signals in sideways markets may lead to overtrading.
3. Parameter Dependency: Strategy effectiveness heavily depends on parameter selection, requiring different parameter combinations for various market environments.

#### Optimization Directions
1. Signal Filtering: Add auxiliary indicators like volume and volatility to filter false signals.
2. Dynamic Parameters: Introduce adaptive parameter mechanisms to dynamically adjust MA periods and types based on market conditions.
3. Position Management: Optimize the position management system to dynamically adjust position sizes based on market volatility and trend strength.

#### Summary
This strategy captures market trend reversal points through multiple moving average crossover signals, offering strong configurability and risk management capabilities. Through proper parameter optimization and signal filtering, it can maintain stable performance across different market environments. The key to success lies in selecting appropriate MA types and parameter combinations, along with establishing effective risk control mechanisms.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-08-01 00:00:00
end: 2025-02-18 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy("Open Close Cross Strategy v6", 
     overlay=true, 
     pyramiding=0, 
     default_qty_type=strategy.percent_of_equity, 
     default_qty_value=10,
     calc_on_every_tick=false)

// === INPUTS ===
var bool useRes = input.bool(true, "Use Alternate Resolution?")
var int intRes = input.int(3, "Multiplier for Alternate Resolution")
var string basisType = input.string("SMMA", "MA Type: ", options=["SMA", "EMA", "DEMA", "TEMA", "WMA", "VWMA", "SMMA", "HullMA", "LSMA", "ALMA", "SSMA", "TMA"])
var int basisLen = input.int(8, "MA Period", minval=1)
var int offsetSigma = input.int(6, "Offset for LSMA / Sigma for ALMA", minval=0)
var float offsetALMA = input.float(0.85, "Offset for ALMA", minval=0, step=0.01)
var bool scolor = input.bool(false, "Show coloured Bars to indicate Trend?")
var int delayOffset = input.int(0, "Delay Open/Close MA (Forces Non-Repainting)", minval=0, step=1)
var string tradeType = input.string("BOTH", "What trades should be taken : ", options=["LONG", "SHORT", "BOTH", "NONE"])
var float slPoints = input.float(0, "Initial Stop Loss Points (zero to disable)", minval=0)
var float tpPoints = input.float(0, "Initial Target Profit Points (zero for disable)", minval=0)
var int ebar = input.int(10000, "Number of Bars for Back Testing", minval=0)
var bool dummy = input.bool(false, "- SET to ZERO for Daily or Longer Timeframes")

// Определение таймфрейма для alternate resolution
getAlternateResolution() =>
    timeframe.ismonthly ? str.tostring(timeframe.multiplier * intRes) + "M" :
         timeframe.isweekly ? str.tostring(timeframe.multiplier * intRes) + "W" :
         timeframe.isdaily ? str.tostring(timeframe.multiplier * intRes) + "D" :
         timeframe.isintraday ? str.tostring(timeframe.multiplier * intRes) : "60"

stratRes = getAlternateResolution()

// === MA Functions ===
variant(type, src, len, offSig, offALMA) =>
    float result = switch type
        "EMA" => ta.ema(src, len)
        "DEMA" => 2 * ta.ema(src, len) - ta.ema(ta.ema(src, len), len)
        "TEMA" => 3 * (ta.ema(src, len) - ta.ema(ta.ema(src, len), len)) + ta.ema(ta.ema(ta.ema(src, len), len), len)
        "WMA" => ta.wma(src, len)
        "VWMA" => ta.vwma(src, len)
        "SMMA" => ta.sma(src, len)  // Упрощенная версия SMMA
        "HullMA" => ta.wma(2 * ta.wma(src, len / 2) - ta.wma(src, len), math.round(math.sqrt(len)))
        "LSMA" => ta.linreg(src, len, offSig)
        "ALMA" => ta.alma(src, len, offALMA, offSig)
        "TMA" => ta.sma(ta.sma(src, len), len)
        "SSMA" => 
            a1 = math.exp(-1.414 * math.pi / len)
            b1 = 2 * a1 * math.cos(1.414 * math.pi / len)
            c2 = b1
            c3 = -a1 * a1
            c1 = 1 - c2 - c3
            c1 * (src + nz(src[1])) / 2 + c2 * nz(ta.sma(src, len)[1]) + c3 * nz(ta.sma(src, len)[2])
        => ta.sma(src, len)

// === Series Setup ===
closeSeries = variant(basisType, close[delayOffset], basisLen, offsetSigma, offsetALMA)
openSeries = variant(basisType, open[delayOffset], basisLen, offsetSigma, offsetALMA)

// Get Alternate resolution Series
closeSeriesAlt = useRes ? request.security(syminfo.tickerid, stratRes, closeSeries, barmerge.gaps_off, barmerge.lookahead_on) : closeSeries
openSeriesAlt = useRes ? request.security(syminfo.tickerid, stratRes, openSeries, barmerge.gaps_off, barmerge.lookahead_on) : openSeries

// === Plotting ===
color trendColor = closeSeriesAlt > openSeriesAlt ? color.green : color.red
color barColor = closeSeries > openSeriesAlt ? color.new(color.lime, 0) : color.new(color.red, 0)

// Перемещаем barcolor в глобальную область видимости
barcolor(scolor ? barColor : na)

var closePlot = plot(closeSeriesAlt, "Close Series", trendColor, 2, plot.style_line)
var openPlot = plot(openSeriesAlt, "Open Series", trendColor, 2, plot.style_line)
fill(closePlot, openPlot, color=trendColor)

// === Trade Conditions ===
xlong = ta.crossover(closeSeriesAlt, openSeriesAlt)
xshort = ta.crossunder(closeSeriesAlt, openSeriesAlt)
longCond = xlong
shortCond = xshort

// === Strategy Logic ===
float tp = tpPoints > 0 ? tpPoints : na
float sl = slPoints > 0 ? slPoints : na

var int lastPositionType = 0  // 1 для long, -1 для short, 0 для нет позиции

if ebar == 0 or (timenow - time) / (timeframe.multiplier * 60000) <= ebar and tradeType != "NONE"
    // Закрытие позиций
    if lastPositionType == 1 and shortCond
        strategy.close("long")
        lastPositionType := 0
        label.new(bar_index, high, "Exit Long", color=color.red, style=label.style_label_down, textcolor=color.white)
    
    if lastPositionType == -1 and longCond
        strategy.close("short")
        lastPositionType := 0
        label.new(bar_index, low, "Exit Short", color=color.green, style=label.style_label_up, textcolor=color.white)
    
    // Открытие новых позиций
    if longCond and tradeType != "SHORT" and lastPositionType == 0
        strategy.entry("long", strategy.long)
        lastPositionType := 1
        label.new(bar_index, low, "Long", color=color.green, style=label.style_label_up, textcolor=color.white)
    
    if shortCond and tradeType != "LONG" and lastPositionType == 0
        strategy.entry("short", strategy.short)
        lastPositionType := -1
        label.new(bar_index, high, "Short", color=color.red, style=label.style_label_down, textcolor=color.white)
    
    // Take Profit и Stop Loss
    if lastPositionType != 0
        strategy.exit("TP/SL", profit=tp, loss=sl)
```

> Detail

https://www.fmz.com/strategy/482785

> Last Modified

2025-02-27 17:49:25
