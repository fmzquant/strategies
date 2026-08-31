
> Name

Moving-Average-Trend-Direction-Quantitative-Strategy-with-Cross-Validation

> Author

ianzeng123

> Strategy Description
![IMG](https://www.fmz.com/upload/asset/2d8101426a700f0354046.png)
![IMG](https://www.fmz.com/upload/asset/2d90fc3991bc853006596.png)

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
This strategy captures market trend reversal points through multiple moving average crossover signals, offering strong configurability and risk management capabilities. Through proper parameter optimization and signal filtering, it can maintain stable performance across different market environments. The key to success lies in selecting appropriate MA types and parameter combinations, along with establishing effective risk control mechanisms.
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
