
> Name

基于动态吞噬趋势策略Dynamic-Engulfing-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1ad93d179b721add3f2.png)
[trans]

## 概述

动态吞噬趋势策略是一种根据吞噬形态在趋势方向上进行交易的策略。该策略利用平均真实波动范围(ATR)识别市场波动性,超级趋势指标判断市场趋势方向,在符合吞噬形态且吻合趋势方向时进行做多做空操作。止损位和止盈位也会基于吞噬形态动态计算。

## 策略原理  

1. 计算ATR,用来测量市场波动率。
2. 计算超级趋势指标,判断市场主要趋势方向。
3. 定义多头市场和空头市场条件。 
4. 识别符合趋势方向的多头吞噬(上涨趋势中)和空头吞噬(下跌趋势中)形态。
5. 根据吞噬形态计算止损位和止盈位。  
6. 在识别到吞噬形态且吻合趋势方向时,进行做多或做空操作。 
7. 当价格触碰止损位或止盈位时,进行平仓。
8. 在图表上标识吞噬形态。

## 策略优势分析

该策略具有以下优势:

1. 结合吞噬形态与趋势识别交易信号,提高信号质量。  
2. 能够识别趋势的转折点,针对性操作。
3. 做多做空信号比较明确,易于掌握操作时机。  
4. 吞噬止损策略既遵循趋势又控制风险。
5. 代码框架清晰,易于优化和改进。

## 策略风险分析  

该策略也存在一些风险:  

1. 吞噬形态可能是假突破,识别错误会导致损失。
2. 难以把握吞噬形态参数,如体积大小、时间长度等。  
3. 趋势判断机制不完善,可能导致不符合趋势操作。
4. 止损位和止盈位设定依赖经验,可能过于主观。
5. 效果依赖参数优化,需要大量历史数据验证。

针对上述风险,可以通过以下方法加以控制和改进:
1. 结合其他技术指标过滤假突破信号。 
2. 利用更稳健的参数计算方法,如自适应ATR。
3. 增加趋势判断机制的可靠性,如引入机器学习模型。
4. 利用遗传算法等手段寻找最佳参数组合。
5. 在更长的时间窗口内回测,确保参数稳健性。

## 策略优化方向  

该策略具有很大的优化空间:  

1. 可以引入机器学习模型提高趋势判断的准确性。
2. 结合新的形态识别方法改进吞噬形态的识别效果。 
3. 利用最新止盈止损策略动态优化止盈止损点。
4. 可基于高频数据开发更适合短线操作的吞噬突破策略。
5. 可应用于不同品种进行参数调整与优化。

## 总结

整体而言,动态吞噬趋势策略通过效果显著的吞噬形态与精准的趋势判断相结合,形成了入场信号精准、止盈止损合理的交易策略。在应用过程中,可以通过参数优化、风险控制和引入新技术来进一步增强策略的稳定性与盈利能力。该策略框架清晰,具有很强的通用性,值得深入研究与应用。 

||

# Overview  

The Dynamic Engulfing Trend strategy is a trading strategy that takes long or short positions based on engulfing patterns in the direction of the trend. This strategy uses Average True Range (ATR) to gauge market volatility, Supertrend indicator to determine the market trend direction, and enters trades when engulfing patterns align with the trend direction. Stop loss and take profit levels are also calculated dynamically based on the engulfing patterns.  

# Strategy Logic

1. Calculate ATR to measure market volatility.  
2. Calculate Supertrend indicator to identify the market trend.
3. Define conditions for uptrend and downtrend.
4. Identify bullish engulfing (in uptrend) and bearish engulfing (in downtrend).
5. Calculate Stop Loss (SL) and Take Profit (TP) levels based on the engulfing patterns.
6. Enter trades when engulfing patterns match the trend direction.  
7. Exit trades when price hits the SL or TP levels.  
8. Plot the engulfing patterns on the chart.

# Advantage Analysis

The advantages of this strategy include:

1. Improved signal quality by combining engulfing patterns with trend.
2. Ability to identify trend reversals for precise entries. 
3. Clear long/short signals for better timing.
4. Engulfing stop strategy follows the trend while managing risks.  
5. Modular code framework for easy optimizations.

# Risk Analysis
 
There are also some risks to consider:
 
1. Engulfing patterns may turn out to be false breakouts. 
2. Difficult to determine optimal parameters like pattern size, duration etc.
3. Imperfect trend determination may lead to false signals.  
4. Stop loss and take profit levels rely on discretions and may be subjective.  
5. Performance depends on parameter tuning based on historical data.  

The risks can be mitigated by:

1. Adding filters to remove false breakout signals.  
2. Using adaptive ATR for robust parameter calculations. 
3. Improving trend determination using machine learning.
4. Finding optimal parameters via genetic algorithms. 
5. Backtesting over longer durations to ensure robustness.  

# Optimization Directions

There is scope for further optimization:

1. Machine learning can improve trend determinations.  
2. New pattern recognition methods can better identify engulfing patterns.  
3. Latest stop loss/take profit strategies can dynamically optimize levels.
4. High frequency data can develop shorter-term system.
5. Parameter tuning for different instruments.  

# Conclusion

In summary, the Dynamic Engulfing Trend strategy combines the high-quality engulfing pattern signals with accurate trend determination to generate a trading system with precise entries and reasonable stop losses and profit taking. Further enhancements in parameters, risk management and technology integration can improve its stability and profitability. The structured code framework also makes this strategy customizable across different markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ATR Period|
|v_input_2_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_3|3|ATR Multiplier|
|v_input_4|true|Change ATR Calculation Method ?|
|v_input_5|true|Show Buy/Sell Signals ?|
|v_input_6|true|Highlighter On/Off ?|
|v_input_7|25|Boring Candle Threshold (%)|
|v_input_8|50|Engulfing Candle Threshold (%)|
|v_input_9|200|Stop Level (Pips)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Malikdrajat


//@version=4
strategy("Engulfing with Trend", overlay=true)

Periods = input(title="ATR Period", type=input.integer, defval=10)
src = input(hl2, title="Source")
Multiplier = input(title="ATR Multiplier", type=input.float, step=0.1, defval=3.0)
changeATR= input(title="Change ATR Calculation Method ?", type=input.bool, defval=true)
showsignals = input(title="Show Buy/Sell Signals ?", type=input.bool, defval=true)
highlighting = input(title="Highlighter On/Off ?", type=input.bool, defval=true)

atr2 = sma(tr, Periods)
atr= changeATR ? atr(Periods) : atr2

up=src-(Multiplier*atr)
up1 = nz(up[1],up)
up := close[1] > up1 ? max(up,up1) : up
dn=src+(Multiplier*atr)
dn1 = nz(dn[1], dn)
dn := close[1] < dn1 ? min(dn, dn1) : dn

trend = 1
trend := nz(trend[1], trend)
trend := trend == -1 and close > dn1 ? 1 : trend == 1 and close < up1 ? -1 : trend

upPlot = plot(trend == 1 ? up : na, title="Up Trend", style=plot.style_linebr, linewidth=2, color=color.green)
buySignal = trend == 1 and trend[1] == -1
plotshape(buySignal ? up : na, title="UpTrend Begins", location=location.absolute, style=shape.circle, size=size.tiny, color=color.green, transp=0)
plotshape(buySignal and showsignals ? up : na, title="Buy", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=color.green, textcolor=color.white, transp=0)
dnPlot = plot(trend == 1 ? na : dn, title="Down Trend", style=plot.style_linebr, linewidth=2, color=color.red)
sellSignal = trend == -1 and trend[1] == 1
plotshape(sellSignal ? dn : na, title="DownTrend Begins", location=location.absolute, style=shape.circle, size=size.tiny, color=color.red, transp=0)
plotshape(sellSignal and showsignals ? dn : na, title="Sell", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.red, textcolor=color.white, transp=0)
mPlot = plot(ohlc4, title="", style=plot.style_circles, linewidth=0)
longFillColor = highlighting ? (trend == 1 ? color.green : color.white) : color.white
shortFillColor = highlighting ? (trend == -1 ? color.red : color.white) : color.white
fill(mPlot, upPlot, title="UpTrend Highligter", color=longFillColor)
fill(mPlot, dnPlot, title="DownTrend Highligter", color=shortFillColor)
alertcondition(buySignal, title="SuperTrend Buy", message="SuperTrend Buy!")
alertcondition(sellSignal, title="SuperTrend Sell", message="SuperTrend Sell!")
changeCond = trend != trend[1]
alertcondition(changeCond, title="SuperTrend Direction Change", message="SuperTrend has changed direction!")

// Define Downtrend and Uptrend conditions
downtrend = trend == -1
uptrend = trend == 1


// Engulfing 
boringThreshold = input(25, title="Boring Candle Threshold (%)", minval=1, maxval=100, step=1)
engulfingThreshold = input(50, title="Engulfing Candle Threshold (%)", minval=1, maxval=100, step=1)
stopLevel = input(200, title="Stop Level (Pips)", minval=1)


// Boring Candle (Inside Bar) and Engulfing Candlestick Conditions
isBoringCandle = abs(open[1] - close[1]) * 100 / abs(high[1] - low[1]) <= boringThreshold
isEngulfingCandle = abs(open - close) * 100 / abs(high - low) <= engulfingThreshold

// Bullish and Bearish Engulfing Conditions
bullEngulfing = uptrend and close[1] < open[1] and close > open[1] and not isBoringCandle and not isEngulfingCandle
bearEngulfing = downtrend and close[1] > open[1] and close < open[1] and not isBoringCandle and not isEngulfingCandle

// Stop Loss, Take Profit, and Entry Price Calculation
bullStop = close + (stopLevel * syminfo.mintick)
bearStop = close - (stopLevel * syminfo.mintick)
bullSL = low 
bearSL = high
bullTP = bullStop + (bullStop - low)
bearTP = bearStop - (high - bearStop)

// Entry Conditions
enterLong = bullEngulfing and uptrend
enterShort = bearEngulfing and downtrend

// Exit Conditions
exitLong = crossover(close, bullTP) or crossover(close, bullSL)
exitShort = crossover(close, bearTP) or crossover(close, bearSL)

// Check if exit conditions are met by the next candle
exitLongNextCandle = exitLong and (crossover(close[1], bullTP[1]) or crossover(close[1], bullSL[1]))
exitShortNextCandle = exitShort and (crossover(close[1], bearTP[1]) or crossover(close[1], bearSL[1]))

// Strategy Execution
strategy.entry("Buy", strategy.long, when=enterLong )
strategy.entry("Sell", strategy.short, when=enterShort )

// Exit Conditions for Long (Buy) Positions
if (bullEngulfing and not na(bullTP) and not na(bullSL))
    strategy.exit("Exit Long", from_entry="Buy", stop=bullSL, limit=bullTP)

// Exit Conditions for Short (Sell) Positions
if (bearEngulfing and not na(bearTP) and not na(bearSL))
    strategy.exit("Exit Short", from_entry="Sell", stop=bearSL, limit=bearTP)

// Plot Shapes and Labels
plotshape(bullEngulfing, style=shape.triangleup, location=location.abovebar, color=color.green)
plotshape(bearEngulfing, style=shape.triangledown, location=location.abovebar, color=color.red)

// Determine OP, SL, and TP
plot(bullEngulfing ? bullStop : na, title="Bullish Engulfing stop", color=color.red, linewidth=3, style=plot.style_linebr)
plot(bearEngulfing ? bearStop : na, title="Bearish Engulfing stop", color=color.red, linewidth=3, style=plot.style_linebr)
plot(bullEngulfing ? bullSL : na, title="Bullish Engulfing SL", color=color.red, linewidth=3, style=plot.style_linebr)
plot(bearEngulfing ? bearSL : na, title="Bearish Engulfing SL", color=color.red, linewidth=3, style=plot.style_linebr)
plot(bullEngulfing ? bullTP : na, title="Bullish Engulfing TP", color=color.green, linewidth=3, style=plot.style_linebr)
plot(bearEngulfing ? bearTP : na, title="Bearish Engulfing TP", color=color.green, linewidth=3, style=plot.style_linebr)


```

> Detail

https://www.fmz.com/strategy/443099

> Last Modified

2024-02-29 11:24:18
