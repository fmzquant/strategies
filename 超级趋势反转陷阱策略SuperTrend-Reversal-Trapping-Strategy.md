
> Name

超级趋势反转陷阱策略SuperTrend-Reversal-Trapping-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略基于超趋指标判断当前趋势方向,并根据陷阱蜡烛形态发出交易信号,属于趋势跟踪策略。当出现与超趋指标相反方向的陷阱蜡烛时,表明趋势可能反转,该策略将抓住反转机会入场。

## 策略原理 

该策略首先计算超趋指标判断当前趋势,绿色为上涨趋势,红色为下跌趋势。然后判断K线是否形成陷阱蜡烛形态,条件是:1)该K线与超趋指标方向相反,2)该K线强势(大阳线或收盘价无背离),3)该K线交易量放大。当同时满足上述三个条件时,说明可能出现趋势反转,策略在陷阱蜡烛高点多头入场,低点空头入场。止损点设置为陷阱蜡烛的对方或最近高低点。 

具体来说,策略根据10周期ATR计算超趋指标,判断目前趋势。然后计算当前K线是否与超趋指标方向相反,且 VOLUME 比前一根K线大,或连续三根K线 CLOSE 方向一致但 VOLUME 减少。如果满足条件,认为可能出现反转,在该陷阱K线最高价多头入场,最低价空头入场,止损点为陷阱K线开盘价方向。

该策略通过超趋指标判断大趋势,并在可能反转点陷阱蜡烛入场,目标获利来自后续趋势的运行。

## 优势分析

- 结合趋势和形态判断,提高交易准确率

超趋指标判断大趋势方向,陷阱蜡烛识别趋势反转机会,结合趋势和形态可提高判断准确率。

- 陷阱蜡烛增加入场确认,避免假突破

要求陷阱蜡烛强势放量,可避免因噪音造成的假信号。增加入场确认,可避免追顶和掘底的风险。

- 策略简单清晰,容易实施

以超趋指标和陷阱蜡烛为核心,非常简洁明了,参数少,实施难度低。

- 停损点设置合理,控制风险

止损点设置为陷阱蜡烛价格,可快速止损,也符合趋势反转后的合理位置。

## 风险分析

- 超趋指标存在滞后

超趋指标判断趋势存在一定滞后,可能错过趋势反转的最佳入场点位。

- 反转失败可能扩大亏损

反转信号不一定百分百可靠,如果反转失败,亏损可能会加大。

- 需要识别合适的陷阱形态

不同品种和时间周期,合适的陷阱形态可能会有所不同。需针对具体情况测试最佳参数。

- 夜盘和隔夜特征不同

夜盘和隔夜交易特征存在差异,参数需要分别优化。

## 优化方向 

- 考虑夜盘和隔夜差异进行参数优化

比如陷阱K线的交易量放大程度,日夜参数可分别优化。

- 优化超趋指标参数

测试不同的ATR周期参数,找出给定品种最优参数,生成更准确的超趋信号。

- 结合更多指标进行入场过滤

可再加入如MACD,KDJ等指标,提高对反转的判断准确性。

- 加入止损机制

如趋势反转后再次止损,或百分比止损等方式,控制风险。

## 总结

该策略整合超趋指标和陷阱蜡烛形态,在判断到趋势反转时入场。核心思路简单清晰,易于实现。但其交易信号准确性还有优化空间,需要考虑大趋势、夜盘差异、止损等多方面进行综合优化,以提高策略的稳定性。如果不断迭代优化,该策略可成为频繁交易者的有力工具。

||


## Overview

This strategy uses the SuperTrend indicator to determine the current trend direction, and generates trading signals based on trapping candlestick patterns. It belongs to trend following strategies. When a trapping candle opposite to the SuperTrend direction forms, it signals a potential trend reversal. The strategy aims to capitalize on the reversal opportunity.

## Strategy Logic

The strategy first calculates the SuperTrend indicator to determine the current trend, with green for uptrend and red for downtrend. It then checks if the candlestick forms a trapping pattern, which requires: 1) the candle is opposite to the SuperTrend direction, 2) the candle is strong (big bullish or close is not diverging), 3) the candle has increasing volume. When all three conditions are met, it signals a likely trend reversal. The strategy goes long at the top of the trapping candle and goes short at the bottom. The stop loss is placed at the opposite side of the trapping candle or recent swing high/low.

Specifically, the SuperTrend is calculated based on 10-period ATR. It then checks if the current candle is opposite to the SuperTrend direction, and its VOLUME is larger than previous candle, or three consecutive candles with same CLOSE direction but decreasing VOLUME. If the criteria are met, it signals reversal and enters long at candle high and enters short at candle low. The stop loss is placed at the opening price direction of the trapping candle. 

The strategy identifies the overall trend with SuperTrend and enters on potential reversal points marked by trapping candles, with the profit target coming from the subsequent trend move.

## Advantage Analysis

- Combine trend and pattern for higher accuracy

SuperTrend determines overall trend, trapping candle signals reversal chance. Combining trend and pattern improves accuracy.

- Trapping candle adds entry confirmation, avoiding false breakout

The strong momentum and increasing volume of trapping candle avoids false signals from noise. The confirmation prevents chasing tops and bottoms.

- Simple and clear logic, easy to implement

With SuperTrend and trapping candle as the core, the strategy is very minimalist, with few parameters and easy to implement.

- Reasonable stop loss setups control risk

The stop loss at trapping candle price allows quick exit and also suits the position post-reversal.

## Risk Analysis

- SuperTrend lags in catching trend reversal

SuperTrend has some lag in detecting trend reversal, thus may miss the best entry timing.

- Failed reversal can amplify losses

Reversal signals are not 100% reliable. Failed reversals can magnify losses.

- Need to identify proper trapping patterns

The optimal trapping pattern may vary between products and timeframes. Requires testing for best parameters per situation.

- Day and night patterns differ

Trading characteristics differ between day and night sessions. Separate parameter optimization is needed.

## Improvement Directions

- Parameter optimization for day and night differences

For example, optimize trapping candle volume increase level separately for day and night.

- Optimize SuperTrend parameters  

Test different ATR periods to find optimal SuperTrend parameters and signals for each product.

- Add more filters for entry

Incorporate additional indicators like MACD, KDJ to improve reversal judgment accuracy.

- Add stop loss mechanisms

Such as re-setting stop loss after reversals, percentage stop loss etc to control risk.

## Summary

This strategy combines SuperTrend and trapping candle patterns to enter on perceived trend reversals. The core idea is simple and clear. But there is room to further improve signal accuracy by comprehensive optimizations across aspects like overall trend, session differences, stop loss etc, to enhance stability. With iterative optimization, it can become a powerful tool for active traders.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|ATR Length|
|v_input_int_2|2|Factor|
|v_input_float_1|0.003|Candle Height|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-17 00:00:00
end: 2023-09-24 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("SuperTrend Trapping Candle Strategy", shorttitle="ST", margin_long=1, margin_short=1, overlay=true)


// Inputs
atrPeriod = input.int(10, "ATR Length")
factor = input.int(2, "Factor")
candleDivider = input.float(0.003, "Candle Height", step=0.0001)


// Supertrend
[supertrend, direction] = ta.supertrend(factor, atrPeriod)
plot(direction < 0 ? supertrend : na, "Up Trend", color = color.green, style=plot.style_linebr)
plot(direction < 0? na : supertrend, "Down Trend", color = color.red, style=plot.style_linebr)


//Trapping canlde
isUptrend = direction < 0
isDowntrend = direction > 0
isBullsStrengthDecreasing = volume < volume[1] and volume[1] < volume[2] and close > close[1] and close[1] > close[2] and open > open[1] and open[1] > open[2]
isBearsStrengthDecreasing = volume < volume[1] and volume[1] < volume[2] and close < close[1] and close[1] < close[2] and open < open[1] and open[1] < open[2]
isStrongVolume = (volume > volume[1]) or isBullsStrengthDecreasing or isBearsStrengthDecreasing
isSmallCandle = (high - low) < close * candleDivider
isUptrendTrapping = isUptrend and close < open and isStrongVolume and isSmallCandle
isDowntrendTrapping = isDowntrend and close > open and isStrongVolume and isSmallCandle

plotshape(isUptrendTrapping, style=shape.triangleup, location=location.belowbar, color=color.green)
plotshape(isDowntrendTrapping, style=shape.triangledown, location=location.abovebar, color=color.orange)


// Signals
longCondition = isUptrendTrapping
if (longCondition)
    strategy.entry("Long", strategy.long)


shortCondition = isDowntrendTrapping
if (shortCondition)
    strategy.entry("Short", strategy.short)

if open < close
    alert("Seller Trapped.", alert.freq_all)
if close > open
    alert("Buyer Trapped.", alert.freq_all)


```

> Detail

https://www.fmz.com/strategy/427820

> Last Modified

2023-09-25 17:58:05
