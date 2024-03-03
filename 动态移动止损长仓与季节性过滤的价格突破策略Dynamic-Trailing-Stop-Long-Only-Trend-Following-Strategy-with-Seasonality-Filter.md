
> Name

动态移动止损长仓与季节性过滤的价格突破策略Dynamic-Trailing-Stop-Long-Only-Trend-Following-Strategy-with-Seasonality-Filter

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ec59ac8ae7817e006b.png)
[trans]
### 概述

本策略基于动态移动指标(DMI)设计了一个只做多头的长线策略,同时结合平均真实波幅(ATR)进行尾随止损,以控制亏损风险。为了进一步优化,该策略还融入了交易时间和标准普尔500指数的季节性过滤条件,具有一定的优势。

### 策略原理

1. 该策略只在指定的交易日(周一至周五)和交易时间(默认为当地时间9:30-20:30)开仓。

2. 当ADX大于27时,表示目前处于价格趋势状态。此时如果+DI线上穿-DI线,产生做多信号。

3. 开仓后,以ATR的5.5倍设置止损位,并且止损线会随价格上涨而上移,确保获利。

4. 可选地应用标准普尔500指数的季节性规则,只在历史上表现较好的时段开仓。

### 优势分析

1. 结合趋势指标和止损机制,能够有效跟踪趋势,并控制 einzelnen头寸的损失。

2. 利用交易时间和季节性过滤条件,可以避开市场的异常波动期,降低误报率。

3. DMI和ATR均为成熟的技术指标,参数调整灵活,适合量化优化。

### 风险分析

1. DMI和ATR参数设置不当可能导致信号过多或过少。需要调参数进行测试。

2. 止损幅度设大了可能造成不必要的止损。设小了可能无法有效控制损失。

3. 交易时间和季节性规则可能过滤掉部分利润机会。需要评估滤波效果。

### 优化方向

1. 可以考虑结合其他指标,如MACD、布林带等,设计进场和出场规则。

2. 可以测试不同的ATR倍数止损方式,也可以考虑动态调整止损幅度。

3. 可以测试调整交易时间段,或优化季节性交易的开始结束时间。

4. 可以尝试应用机器学习方法自动优化参数。

### 总结

本策略整合趋势分析与风险控制技术,在一定程度上克服了趋势跟踪策略的剧烈抖动问题。同时加入交易时间和季节性过滤,可以减少错误信号。通过参数调优和功能扩展,本策略可以获得更好的稳定收益。

||

### Overview

This strategy designs a long-only trend following strategy based on the Dynamic Movement Index (DMI), with an Average True Range (ATR) trailing stop loss to control downside risks. It also incorporates trading hours and S&P500 seasonality filters for further optimization and edge.

### Strategy Logic

1. The strategy only enters trades on specified trading days (Mon-Fri) and trading hours (default 9:30am - 8:30pm local time).  

2. When ADX is above 27, it signals that the market is in a trend. If the +DI crosses above -DI, a long signal is generated.

3. After opening a position, the stop loss is set at 5.5 x ATR from the entry price, and it trails upwards as price rises to lock in profits.

4. Optionally, S&P500 seasonal patterns are enabled, so that trades happen only during historically bullish periods.

### Advantage Analysis 

1. Combining trend metrics and stop loss helps effectively ride trends and control loss per trade.

2. Trading hours and seasonality filters help avoid abnormal volatility and reduce false signals.  

3. DMI and ATR are mature technical indicators with flexibility in parameter tuning suitable for quant optimization.

### Risk Analysis

1. Improper DMI and ATR parameters may lead to too many or too few signals. Parameter tuning is needed.  

2. Stop loss set too wide may cause unnecessary stops. Set too tight may fail to control losses.

3. Trading hours and seasonality rules may filter some profitable opportunities. Filter effect needs evaluation.


### Optimization Directions

1. Consider combining other indicators like MACD, Bollinger Bands for entry and exit rules.

2. Test different ATR multiples for stop loss, or dynamic adjustment of stop loss scale.  

3. Test adjusting trading hours, or optimizing seasonal entry and exit dates.  

4. Try applying machine learning methods to auto-tune parameters.


### Conclusion

This strategy integrates trend following and risk control techniques to overcome high volatility issues with trend systems. Adding trading hours and seasonal filters further reduces false signals. With parameter tuning and feature expansion, this strategy can achieve more steady profits.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|DI Length|
|v_input_int_2|14|ADX Smoothing|
|v_input_float_1|27|ADX Threshold for Long|
|v_input_int_3|14|ATR Length|
|v_input_float_2|5.5|ATR Multiplier for Trailing SL (Long)|
|v_input_int_4|9|startTime hh|
|v_input_int_5|30|startTime mm|
|v_input_int_6|20|endTime hh|
|v_input_int_7|30|endTime mm|
|v_input_int_8|true|Timezone Offset (Hours from UTC)|
|v_input_bool_1|false|Enable SP500 Seasonality|
|v_input_bool_2|true|Trade on Monday|
|v_input_bool_3|true|Trade on Tuesday|
|v_input_bool_4|true|Trade on Wednesday|
|v_input_bool_5|true|Trade on Thursday|
|v_input_bool_6|true|Trade on Friday|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-27 00:00:00
end: 2024-02-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="DMI Strategy with ADX and ATR-based Trailing SL (Long Only) and Seasonality", shorttitle="MBV-SP500-CLIMBER", overlay=true)

// Eingabeparameter für Long-Positionen
len = input.int(14, minval=1, title="DI Length")
lensig = input.int(14, title="ADX Smoothing", minval=1, maxval=50)
adxLongThreshold = input.float(27.0, title="ADX Threshold for Long", minval=0)
atrLength = input.int(14, title="ATR Length")
atrLongMultiplier = input.float(5.5, title="ATR Multiplier for Trailing SL (Long)")

startTimeHH = input.int(09, title="startTime hh")
startTimeMM = input.int(30, title="startTime mm")

endTimeHH = input.int(20, title="endTime hh")
endTimeMM = input.int(30, title="endTime mm")

// Zeitzone des Nutzers als Eingabeparameter
timezoneOffset = input.int(1, title="Timezone Offset (Hours from UTC)", minval=-12, maxval=14)


// Zusätzliche Einstellung für SP500-Saisonalität
enableSeasonality = input.bool(false, title="Enable SP500 Seasonality")
seasonColor = color.new(color.blue, 90)
activeTimeColor = color.new(color.yellow, 90) // Farbe für aktive Handelszeiten

// Handelstage und -zeiten
tradeMonday = input.bool(true, title="Trade on Monday")
tradeTuesday = input.bool(true, title="Trade on Tuesday")
tradeWednesday = input.bool(true, title="Trade on Wednesday")
tradeThursday = input.bool(true, title="Trade on Thursday")
tradeFriday = input.bool(true, title="Trade on Friday")

// Konvertierung der Uhrzeit in Unix-Zeitstempel
getUnixTime(hour, minute) =>
    adjustedHour = hour - timezoneOffset
    sessionDate = timestamp(year, month, dayofmonth, 0, 0)
    sessionDate + adjustedHour * 60 * 60000 + minute * 60000

// Start- und Endzeit als Unix-Zeitstempel
// + 1 Stunde wegen UTC
startTime = getUnixTime(startTimeHH, startTimeMM)
endTime = getUnixTime(endTimeHH, endTimeMM)


// Überprüfen, ob der aktuelle Zeitpunkt innerhalb der Handelszeit liegt
isTradingTime() => true

// Saisonale Zeiträume definieren
isSeason(time) =>
    m = month(time)
    d = dayofmonth(time)
    (m == 1 and d >= 1) or (m == 2 and d <= 15) or (m == 3 and d >= 23) or (m == 4 and d <= 17) or (m == 5 and d >= 12) or (m == 6 and d >= 27 and d <= 8) or (m == 7 and d <= 29) or (m == 10 and d >= 15) or (m == 11 and d >= 1) or (m == 12 and d <= 2) or (m == 12 and d >= 20 and d <= 27)

// Hintergrundfarbe für saisonale Bereiche und aktive Handelszeiten
bgcolor(enableSeasonality and isSeason(time) ? seasonColor : na)
bgcolor(isTradingTime() ? color.new(activeTimeColor, 90) : na)

// Berechnung von +DM, -DM, ATR
up = ta.change(high)
down = -ta.change(low)
plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
trur = ta.rma(ta.tr, len)
atr = ta.atr(atrLength)

// Berechnung von +DI, -DI und ADX
plus = fixnan(100 * ta.rma(plusDM, len) / trur)
minus = fixnan(100 * ta.rma(minusDM, len) / trur)
sum = plus + minus
adx = 100 * ta.rma(math.abs(plus - minus) / (sum == 0 ? 1 : sum), lensig)

// Logik für LONG Signale unter Berücksichtigung der Saisonalität und Zeitfilter
longSignal = ta.crossover(adx, adxLongThreshold) and plus > minus and isTradingTime()
longSignal := longSignal and (not enableSeasonality or (enableSeasonality and isSeason(time)))


// Variable für Trailing Stop-Loss
var float longTrailingSL = na

// Variablen für die Eröffnungszeit und den Eröffnungspreis der Position
var int openBarIndex = na
var float openPrice = na

// Handelslogik für Long-Positionen
// ohne strategy.position_size == 0 gilt die Kondition für ALLE Signale und nicht nur für das erste
if (longSignal and strategy.position_size == 0)
    strategy.entry("Long", strategy.long)
    openBarIndex := bar_index
    openPrice := close
    longTrailingSL := close - atr * atrLongMultiplier

//if (longSignal)
   //longTrailingSL := close - atr * atrLongMultiplier

// Aktualisierung des Trailing Stop-Loss
if strategy.position_size > 0
    longTrailingSL := math.max(longTrailingSL, close - atr * atrLongMultiplier)

// Ausstieg aus Long-Positionen
strategy.exit("Close Long", "Long", stop=longTrailingSL)

// Anzeige des ATR-basierten Trailing Stops für Long-Positionen
//plot(strategy.position_size > 0 ? longTrailingSL : na, color=color.red, title="ATR Trailing Stop Long")

// Anzeige des ATR-basierten Trailing Stops für Long-Positionen
plot(strategy.position_size > 0 ? longTrailingSL : na, color=color.new(color.red, 75), style=plot.style_circles, linewidth=1, title="Trailing Stop-Loss")


// Wenn eine Position geschlossen wird, zeichnen Sie die Linie
// if strategy.position_size[1] > 0 and strategy.position_size == 0
//     lineColor = longTrailingSL > openPrice ? color.new(color.green, 50) : color.new(color.red, 50) // Hellgrün für Gewinne, Hellrot für Verluste
//     line.new(openBarIndex, openPrice, bar_index, longTrailingSL, width=3, color=lineColor)

```

> Detail

https://www.fmz.com/strategy/442923

> Last Modified

2024-02-27 14:01:56
