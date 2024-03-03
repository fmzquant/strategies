
> Name

基于多维度指标决策的短期趋势策略Multi-indicator-Decision-Based-Short-Term-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ce35655f0109f09471.png)

[trans]


## 概述

该策略融合了三个不同维度的技术指标,即支撑阻力位、均线系统和超买超卖指标,根据它们的综合信号判断短期趋势方向,以获取较高的胜率。

## 策略原理

代码中首先计算出价格的支撑阻力位,包括标准振荡轴和费波纳奇支撑阻力位,并绘制在图表上。当价格突破这些关键位时,视为重要的趋势信号。 

然后是计算加权移动平均线VWAP和均价,判断它们的黄金交叉和死叉信号。这属于中长期趋势判断。

最后是计算Stochastic RSI指标,判断它的黄金交叉和死叉信号,属于超买超卖指标。

综合这三个维度的指标,如果支撑阻力位、VWAP均线、Stochastic RSI同时发出买入信号,就开多单;如果三者同时发出卖出信号,就开空单。

## 优势分析

该策略最大的优势在于结合了三个不同维度的指标,使判断更全面准确,胜率较高。首先支撑阻力位判断大趋势;其次VWAP判断中长线趋势;最后Stochastic RSI判断超买超卖情况。三维指标同时发出信号,可以大大过滤假信号,提高入场的成功率。

另外,策略加入了止盈功能,可以锁定一定比例收益,有利于资金管理。

## 风险分析

该策略主要风险在于多空决策依赖指标同步发出信号,如果部分指标发出错误信号,则可能导致决策错误。例如Stochastic RSI发出超买信号,但VWAP和支撑阻力判断仍为看涨,此时就可能错过买点而不入场。 

另外,指标参数设置不当也会导致信号判断错误,需要通过反复回测找出最优参数。

此外,股市短期内常有黑天鹅事件出现,导致指标失效。要防范这种风险,可以加入止损策略,避免单笔损失过大。

## 优化方向

该策略可以从以下几个方面继续优化:

1. 加入更多指标信号,如成交量指标,判断趋势强弱,提高决策准确率。

2. 增加机器学习模型,对多维指标进行训练,自动寻找最优交易策略。

3. 根据不同品种参数进行优化,设置自适应参数。

4. 增加止损策略,以及根据回撤控制仓位大小,更好控制风险。

5. 进行组合优化,找到相关性低的品种进行组合,降低组合回撤。

## 总结

该策略整体来说非常适合短期趋势交易。它利用多维指标进行决策,可以过滤掉大量噪音,胜率较高。但仍需注意指标发出错误信号的风险,通过继续优化,该策略有望成为高效稳定的短线策略。

||

## Overview

This strategy incorporates three technical indicators across different dimensions, including support/resistance levels, moving average system, and oscillator indicators, to determine short-term trend direction for higher win rate.

## Strategy Logic

The code first calculates the support/resistance levels of the price, including the standard pivot points and Fibonacci retracement levels, and plots them on the chart. Breaking these key levels signals important trend signals.

Then it calculates the Volume Weighted Average Price (VWAP) and Average Price for golden cross and death cross signals. This belongs to medium-long term trend judgment. 

Finally it calculates the Stochastic RSI oscillator for overbought and oversold signals. This belongs to the overbought/oversold indicator.

By combining signals across these three dimensions, if the support/resistance, VWAP, and Stochastic RSI all give buy signals, it will open long position. If all give sell signals, it will open short position.

## Advantage Analysis 

The biggest advantage of this strategy is the combination of indicators across different dimensions, making the judgment more comprehensive and accurate with higher win rate. First the support/resistance levels define the major trend. Then VWAP determines the medium-long term trend. Finally the Stochastic RSI judges the overbought/oversold condition. With all three indicators firing at the same time, it can effectively filter out false signals and improve entry accuracy.

In addition, the take profit function helps lock in certain percentage of profits, aiding risk management.

## Risk Analysis

The main risk of this strategy is its reliance on simultaneous signals from all indicators for decision making. If some indicators give out faulty signals, it may lead to wrong decisions. For example, when Stochastic RSI shows overbought but VWAP and support/resistance still indicate bullish, it may miss the buying opportunity by not entering.

Also, improper parameter tuning of the indicators could lead to wrong signal judgments that requires iterative backtesting for optimization. 

Additionally, black swan events in the short-term market may invalidate signals from the indicators. To guard against this risk, stop loss strategies could be implemented to limit downside on individual trades.

## Improvement Opportunities 

The strategy can be further improved in the following aspects:

1. Incorporate more indicator signals like volume to gauge trend strength for better accuracy.

2. Add machine learning models to train on the multidimensional indicators and automatically discover optimal strategies. 

3. Optimize parameters based on different products for adaptive tuning.

4. Introduce stop loss and position sizing based on drawdown to better control risks.

5. Perform portfolio optimization to find low-correlation products for diversity.

## Conclusion

Overall this strategy is well suited for short-term trend trading. By combining signals across dimensions, it can filter out significant noise for higher win rate. But risks of erroneous signals remain that can be improved on through further enhancements. With continued optimization, this strategy has the potential to become an efficient and robust short-term system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|(?Pivot Points)Plot Close Price Crossing Pivot Points?|
|v_input_2|false|Plot Pivot Points?|
|v_input_3|0|Pivot Points type: Fibonacci|Traditional|
|v_input_4|2|Width of Pivot Point circles|
|v_input_5|true|(?VWAP)Plot VWAP?|
|v_input_6|true|Plot Average Price?|
|v_input_7|false|Plot Price Crossing VWAP?|
|v_input_8|D|Period|
|v_input_9|14|VWAP Cumulative Period|
|v_input_10|false|(?StochRSI)Plot StochRSI Cross?|
|v_input_11|3|K|
|v_input_12|3|D|
|v_input_13|14|(?Stochastic-RSI)RSI Length|
|v_input_14|14|Stochastic Length|
|v_input_15_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_16|true|(?Strategy only)Plot Long Opportunity?|
|v_input_17|true|Plot Short Opportunity?|
|v_input_18|0|Strategy trading Direction: : L&S|L|S|
|v_input_19|true|Take Profit %|
|v_input_20|true|Plot Take Profit?|
|v_input_21|true|(?Backtesting range)Start Date|
|v_input_22|true|Start Month|
|v_input_23|2017|Start Year|
|v_input_24|31|End Date|
|v_input_25|12|End Month|
|v_input_26|2050|End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-24 00:00:00
end: 2023-10-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// EmperorBTC's VWAP Indicator & Strategy
//              v2.1
// 
//      coded by Bogdan Vaida

// This indicator was created after EmperorBTC's conditions on Twitter. 
// Good timeframes for it: 30', 15', 5'
// To convert from strategy to study switch the commented lines in the beginning
// and at the end of the script and vice versa.

// What this indicator does is to check if:
// o Pivot Point was crossed
// o Stoch-RSI and VWAP were crossed in current or previous candle
// o Candle (or previous candle) close is in the trend direction
// If all these are true then it will go long or short based on direction.


// FUTURE IDEAS: 
//  - Volume Expansion
//  - Candle Stick patterns

//@version=4

// ?Uncomment the line below for the indicator and comment the strategy lines
// study(title="EmperorBTC's VWAP Indicator", shorttitle="EMP-VWAP", overlay=true)

// ? Uncomment the line below for the strategy and comment the above line
strategy(title="EmperorBTC's VWAP Strategy", shorttitle="EMP-VWAP", overlay=true, pyramiding=1)

plotAveragePriceCrossedPivotPoint = input(false, title="Plot Close Price Crossing Pivot Points?", group="Pivot Points")
plotPivotPoints = input(false, title="Plot Pivot Points?", group="Pivot Points")
pivotPointsType = input(title="Pivot Points type", defval="Fibonacci", options=["Fibonacci", "Traditional"], group="Pivot Points")

pivotPointCircleWidth = input(2, title="Width of Pivot Point circles", minval=1, group="Pivot Points")

plotVWAP = input(true, title="Plot VWAP?", group="VWAP")
plotAvgPrice = input(true, title="Plot Average Price?", group="VWAP")
plotVWAPCrossPrice = input(false, title="Plot Price Crossing VWAP?", group="VWAP")
reso = input(title="Period", type=input.resolution, defval="D", group="VWAP")
cumulativePeriod = input(14, "VWAP Cumulative Period", group="VWAP")

plotStochRSICross = input(false, title="Plot StochRSI Cross?", group="StochRSI")
smoothK = input(3, "K", minval=1, group="StochRSI", inline="K&D")
smoothD = input(3, "D", minval=1, group="StochRSI", inline="K&D")
lengthRSI = input(14, "RSI Length", minval=1, group="Stochastic-RSI", inline="length")
lengthStoch = input(14, "Stochastic Length", minval=1, group="Stochastic-RSI", inline="length")
rsiSrc = input(close, title="RSI Source", group="Stochastic-RSI")

plotLong = input(true, title="Plot Long Opportunity?", group="Strategy only")
plotShort = input(true, title="Plot Short Opportunity?", group="Strategy only")
tradingDirection = input(title="Strategy trading Direction: ", defval="L&S", options=["L&S", "L", "S"], group="Strategy only")
takeProfit = input(1.0, title='Take Profit %', group="Strategy only") / 100
plotTP = input(true, title="Plot Take Profit?", group="Strategy only")
startDate = input(title="Start Date", type=input.integer,
     defval=1, minval=1, maxval=31, group="Backtesting range", inline="Start Date")
startMonth = input(title="Start Month", type=input.integer,
     defval=1, minval=1, maxval=12, group="Backtesting range", inline="Start Date")
startYear = input(title="Start Year", type=input.integer,
     defval=2017, minval=1800, maxval=2100, group="Backtesting range", inline="Start Date")
endDate = input(title="End Date", type=input.integer,
     defval=31, minval=1, maxval=31, group="Backtesting range", inline="End Date")
endMonth = input(title="End Month", type=input.integer,
     defval=12, minval=1, maxval=12, group="Backtesting range", inline="End Date")
endYear = input(title="End Year", type=input.integer,
     defval=2050, minval=1800, maxval=2100, group="Backtesting range", inline="End Date")


// PivotPoint code (PVTvX by DGT has some nice code on PP)
candleHigh  = security(syminfo.tickerid,"D", high[1], lookahead=barmerge.lookahead_on)
candleLow   = security(syminfo.tickerid,"D", low[1], lookahead=barmerge.lookahead_on)
candleClose = security(syminfo.tickerid,"D", close[1], lookahead=barmerge.lookahead_on)

pivotPoint = (candleHigh+candleLow+candleClose) / 3

float resistance1 = na
float resistance2 = na
float resistance3 = na
float support1 = na
float support2 = na
float support3 = na

if pivotPointsType == "Fibonacci"
    resistance1 := pivotPoint + 0.382 * (candleHigh - candleLow)
    resistance2 := pivotPoint + 0.618 * (candleHigh - candleLow)
    resistance3 := pivotPoint + (candleHigh - candleLow)
    support1 := pivotPoint - 0.382 * (candleHigh - candleLow)
    support2 := pivotPoint - 0.618 * (candleHigh - candleLow)
    support3 := pivotPoint - (candleHigh - candleLow)
else if pivotPointsType == "Traditional"
    resistance1 := 2 * pivotPoint - candleLow
    resistance2 := pivotPoint + (candleHigh - candleLow)
    resistance3 := candleHigh + 2 * (pivotPoint - candleLow) 
    support1 := 2 * pivotPoint - candleHigh
    support2 := pivotPoint - (candleHigh - candleLow)
    support3 := candleLow - 2 * (candleHigh - pivotPoint)

plot(series = plotPivotPoints ? support1 : na, color=#ff0000, title="S1", style = plot.style_circles, linewidth = pivotPointCircleWidth)
plot(series = plotPivotPoints ? support2 : na, color=#800000, title="S2", style = plot.style_circles, linewidth = pivotPointCircleWidth)
plot(series = plotPivotPoints ? support3 : na, color=#330000, title="S3", style = plot.style_circles, linewidth = pivotPointCircleWidth)
plot(series = plotPivotPoints ? pivotPoint : na, color=#FFA500, title="PP", style = plot.style_circles, linewidth = pivotPointCircleWidth)
plot(series = plotPivotPoints ? resistance1 : na, color=#00FF00, title="R1", style = plot.style_circles, linewidth = pivotPointCircleWidth)
plot(series = plotPivotPoints ? resistance2 : na, color=#008000, title="R2", style = plot.style_circles, linewidth = pivotPointCircleWidth)
plot(series = plotPivotPoints ? resistance3 : na, color=#003300, title="R3", style = plot.style_circles, linewidth = pivotPointCircleWidth)

pivotPointCrossedUp = ((low < support3) and (close > support3)) or ((low < support2) and (close > support2)) or ((low < support1) and (close > support1)) or  ((low < pivotPoint) and (close > pivotPoint))
pivotPointCrossedDown = ((high > support3) and (close < support3)) or ((high > support2) and (close < support2)) or ((high > support1) and (close < support1)) or  ((high > pivotPoint) and (close < pivotPoint))
plotPPColor = pivotPointCrossedUp ? color.green :
     pivotPointCrossedDown ? color.red :
     na

plotshape(series = plotAveragePriceCrossedPivotPoint ? (pivotPointCrossedUp or pivotPointCrossedDown) : na, title="PP Cross", style = shape.triangleup, location=location.belowbar, color=plotPPColor, text="PP", size=size.small)

// VWAP (taken from the TV code)
// There are five steps in calculating VWAP:
//
// 1. Calculate the Typical Price for the period. [(High + Low + Close)/3)]
// 2. Multiply the Typical Price by the period Volume (Typical Price x Volume)
// 3. Create a Cumulative Total of Typical Price. Cumulative(Typical Price x Volume)
// 4. Create a Cumulative Total of Volume. Cumulative(Volume)
// 5. Divide the Cumulative Totals. 
//
// VWAP = Cumulative(Typical Price x Volume) / Cumulative(Volume)

// Emperor's Edition
t = time(reso)
debut = na(t[1]) or t > t[1]

addsource = ohlc4 * volume
addvol = volume
addsource := debut ? addsource : addsource + addsource[1]
addvol := debut ? addvol : addvol + addvol[1]
vwapValue = addsource / addvol

pVWAP = plot(series = plotVWAP ? vwapValue : na, color=color.purple, title="VWAP")
pAvgPrice = plot(series = plotAvgPrice ? ohlc4 : na, color=color.blue, title="PRICE")
fill(pVWAP, pAvgPrice, color = ohlc4 > vwapValue ? color.red : color.green, title="VWAP PRICE FILL")

vwapCrossUp = (low < vwapValue) and (vwapValue < high) and (close > open) // added green candle check
vwapCrossDown = (high > vwapValue) and (vwapValue > low) and (close < open) // added red candle check

plotVWAPColor = vwapCrossUp ? color.green :
     vwapCrossDown ? color.red :
     na
plotshape(series = plotVWAPCrossPrice ? (vwapCrossUp or vwapCrossDown) : na, title="VWAP Cross Price", style=shape.triangleup, location=location.belowbar, color=plotVWAPColor, text="VWAP", size=size.small)


// Stochastic RSI

rsi1 = rsi(rsiSrc, lengthRSI)
k = sma(stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
d = sma(k, smoothD)

sRsiCrossUp = k[1] < d[1] and k > d
sRsiCrossDown = k[1] > d[1] and k < d

plotColor = sRsiCrossUp ? color.green :
     sRsiCrossDown ? color.red :
     na
plotshape(series = plotStochRSICross ? (sRsiCrossUp or sRsiCrossDown) : na, title="StochRSI Cross Up", style=shape.triangleup, location=location.belowbar, color=plotColor, text="StochRSI", size=size.small)

// Long Trades
sRsiCrossedUp = sRsiCrossUp or sRsiCrossUp[1]
vwapCrossedUp = vwapCrossUp or vwapCrossUp[1]
// longCond1 = (sRsiCross and vwapCross) or (sRsiCross[1] and vwapCross) or (sRsiCross and vwapCross[1])
longCond1 = (sRsiCrossedUp[1] and vwapCrossedUp[1])
longCond2 = pivotPointCrossedUp[1]
longCond3 = (close[1] > open[1]) and (close > open) // check this
longCond = longCond1 and longCond2 and longCond3
plotshape(series = plotLong ? longCond : na, title="Long", style=shape.triangleup, location=location.belowbar, color=color.green, text="Long", size=size.normal)

// Short Trades
sRsiCrossedDown = sRsiCrossDown or sRsiCrossDown[1]
vwapCrossedDown = vwapCrossDown or vwapCrossDown[1]
shortCond1 = (sRsiCrossedDown[1] and vwapCrossedDown[1])
shortCond2 = pivotPointCrossedDown[1]
shortCond3 = (close[1] < open[1]) and (close < open)
shortCond = shortCond1 and shortCond2 and shortCond3
plotshape(series = plotShort ? shortCond : na, title="Short", style=shape.triangledown, location=location.abovebar, color=color.red, text="Short", size=size.normal)

// alertcondition(condition=longCond, title="Long", message="Going long")
// alertcondition(condition=shortCond, title="Short", message="Going short")

// ? Uncomment the lines below for the strategy and revert for the study
takeProfitLong     = strategy.position_avg_price * (1 + takeProfit)
takeProfitShort     = strategy.position_avg_price * (1 - takeProfit)
exitTp = ((strategy.position_size > 0) and (close > takeProfitLong)) or ((strategy.position_size < 0) and (close < takeProfitShort))
strategy.risk.allow_entry_in(tradingDirection == "L" ? strategy.direction.long : tradingDirection == "S" ? strategy.direction.short : strategy.direction.all)
plot(series = (plotTP and strategy.position_size > 0) ? takeProfitLong : na, title="TP Level",color=color.green, style=plot.style_linebr, linewidth=2)
plot(series = (plotTP and strategy.position_size < 0) ? takeProfitShort : na, title="TP Level",color=color.red, style=plot.style_linebr, linewidth=2)
inDateRange = (time >= timestamp(syminfo.timezone, startYear,
         startMonth, startDate, 0, 0)) and (time < timestamp(syminfo.timezone, endYear, endMonth, endDate, 0, 0))
strategy.entry("VWAP", strategy.long, comment="Long", when=longCond and inDateRange)
strategy.entry("VWAP", strategy.short, comment="Short", when=shortCond and inDateRange)
strategy.close(id="VWAP", when=exitTp)
if (not inDateRange)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/430154

> Last Modified

2023-10-25 15:31:30
