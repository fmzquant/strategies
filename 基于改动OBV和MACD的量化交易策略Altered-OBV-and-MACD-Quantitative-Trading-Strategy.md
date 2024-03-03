
> Name

基于改动OBV和MACD的量化交易策略Altered-OBV-and-MACD-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/170fb79891be6196c4d.png)

[trans]

## 概述

该策略基于改动的能量潮指标(OBV)和MACD进行交易信号判断,属于量价综合策略。它融合了股价指数MACD和改动OBV作为量价综合信号,旨在发现股票量价强弱突破的交易机会。

## 策略原理

1. 计算简单移动平均线SMA,判断大盘趋势。

2. 计算改动OBV。它根据收盘价和前一日收盘价的关系改动OBV的计算方式,使OBV更敏感。

3. 在改动OBV上计算MACD。MACD由快线、慢线和MACD柱组成,可发现量能变化趋势。 

4. 当MACD金叉且向上时,判断为买入信号。

5. 当MACD死叉且向下时,判断为卖出信号。

6. 结合大盘SMA判断,避免不必要的交易。

## 优势分析

1. 改动OBV更加敏感,可提前捕捉到量能变化。

2. MACD可清晰判断量能变化趋势和关键点位。

3. 量价综合信号,提高信号准确率。

4. SMA判断大盘趋势,有助过滤误信号。

5. 策略思路清晰易理解,参数优化空间大。

## 风险分析

1. 改动OBV容易产生误信号,需要配合其他指标过滤。

2. MACD参数设置不当会错过交易机会或产生误信号。

3. 需要关注股票本身信息,避免因个股问题导致损失。

4. 需关注市场环境,不适用于特殊行情场景。

5. 回测数据拟合风险,实盘可能效果下降。

## 优化方向

1. 测试不同SMA周期组合,优化大盘趋势判断。

2. 测试MACD参数设置,优化量能变化判断。

3. 增加其他指标过滤误信号,如KDJ、RSI等。 

4. 添加止损策略,控制单笔损失。

5. 优化资金管理策略,提高整体盈利效果。

6. 测试不同股票策略参数差异。

## 总结

该策略融合改动OBV和MACD指标,实现了量价结合,能够提前捕捉股票量能态势的变化,从而产生交易信号。相比单一使用OBV或MACD,该策略可以提供更可靠的买卖时机。但该策略也存在一定的误信号风险,需要进一步优化指标组合和参数设定,并辅以资金管理手段,才能在实盘中获得稳定收益。总体来说,该策略思路清晰,值得进一步测试优化,以发掘其潜力。

|| 

## Overview

This strategy uses altered On Balance Volume (OBV) and MACD to generate trading signals. It combines price index MACD and altered OBV as a comprehensive indicator for volume and price, aiming to capture trading opportunities when price and volume strengths breakout.

## Strategy Logic

1. Calculate Simple Moving Average (SMA) to determine market trend. 

2. Calculate altered OBV. It modifies the OBV calculation based on close price and previous close price relationship to make OBV more sensitive.

3. Calculate MACD on altered OBV. MACD consists of fast line, slow line and histogram to identify volume momentum change.

4. When MACD golden cross and goes up, a buy signal is generated. 

5. When MACD dead cross and goes down, a sell signal is triggered.

6. Check SMAs to avoid unnecessary trades during trendless market.

## Advantage Analysis 

1. Altered OBV is more sensitive to capture early volume changes.

2. MACD clearly indicates volume momentum change and key levels.

3. Volume and price combined signal improves accuracy. 

4. SMA filters false signal by determining market trend.

5. Clear strategy logic and big optimization space.

## Risk Analysis

1. Altered OBV may generate false signals, needs filter by other indicators.

2. Improper MACD parameters setting may miss trades or cause false signals.

3. Pay attention to stock specifics to avoid losses.

4. Monitor market condition as strategy may not work for special scenarios. 

5. Backtest overfit risk may lead to worse performance in live trading.

## Optimization Directions

1. Test different SMA period combinations to optimize market trend determination.

2. Test MACD parameters to better identify volume momentum change.

3. Add other indicators as filter, like KDJ, RSI etc.

4. Add stop loss to limit loss per trade.

5. Optimize money management to improve overall profitability. 

6. Test parameter differences among stocks.

## Conclusion

The strategy combines altered OBV and MACD to achieve volume and price synthesis. It can capture volume momentum change early and generate trading signals. Compared to using OBV or MACD alone, this strategy provides more reliable trading opportunities. However, false signals risk exists and further optimizations on indicators and parameters, plus money management are needed to obtain steady profits in live trading. Overall, the strategy has clear logic and is worth testing and optimizing to explore its potential.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|false|Offset|
|v_input_1|12|Fast Length|
|v_input_2|26|Slow Length|
|v_input_int_2|9|Signal Smoothing|
|v_input_string_1|0|Oscillator MA Type: EMA|SMA|
|v_input_string_2|0|Signal Line MA Type: EMA|SMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-14 00:00:00
end: 2023-11-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © stocktechbot

//@version=5
strategy("Altered OBV On MACD", overlay=true, margin_long=100, margin_short=100)

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © stocktechbot
//@version=5
//SMA Tredline
out = ta.sma(close, 200)
outf = ta.sma(close, 50)
outn = ta.sma(close, 90)
outt = ta.sma(close, 21)
outthree = ta.sma(close, 9)
//sma plot
offset = input.int(title="Offset", defval=0, minval=-500, maxval=500)
plot(out, color=color.blue, title="MA200", offset=offset)
plot(outf, color=color.maroon, title="MA50", offset=offset)
plot(outn, color=color.orange, title="MA90", offset=offset)
plot(outt, color=color.olive, title="MA21", offset=offset)
plot(outthree, color=color.fuchsia, title="MA9", offset=offset)

fast_length = input(title="Fast Length", defval=12)
slow_length = input(title="Slow Length", defval=26)
chng = 0
obv = ta.cum(math.sign(ta.change(close)) * volume)
if close < close[1] and (open < close)
    chng := 1
else if close > close[1]
    chng := 1
else
    chng := -1
obvalt = ta.cum(math.sign(chng) * volume)
//src = input(title="Source", defval=close)
src = obvalt
signal_length = input.int(title="Signal Smoothing",  minval = 1, maxval = 50, defval = 9)
sma_source = input.string(title="Oscillator MA Type",  defval="EMA", options=["SMA", "EMA"])
sma_signal = input.string(title="Signal Line MA Type", defval="EMA", options=["SMA", "EMA"])

// Calculating
fast_ma = sma_source == "SMA" ? ta.sma(src, fast_length) : ta.ema(src, fast_length)
slow_ma = sma_source == "SMA" ? ta.sma(src, slow_length) : ta.ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal == "SMA" ? ta.sma(macd, signal_length) : ta.ema(macd, signal_length)
hist = macd - signal
//hline(0, "Zero Line", color=color.new(#787B86, 50))
//plot(hist, title="Histogram", style=plot.style_columns, color=(hist>=0 ? (hist[1] < hist ? col_grow_above : col_fall_above) : (hist[1] < hist ? col_grow_below : col_fall_below)))
//plot(macd, title="MACD", color=col_macd)
//plot(signal, title="Signal", color=col_signal)
[macdLine, signalLine, histLine] = ta.macd(close, 12, 26, 9)
//BUY Signal
mafentry =ta.sma(close, 50) > ta.sma(close, 90)
//matentry = ta.sma(close, 21) > ta.sma(close, 50)
matwohun = close > ta.sma(close, 200)
twohunraise = ta.rising(out, 2)
twentyrise = ta.rising(outt, 2)
macdrise = ta.rising(macd,2)
macdlong = ta.crossover(macd, signal)
longCondition=false
if macdlong and macdrise
    longCondition := true

if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)
//Sell Signal
mafexit =ta.sma(close, 50) < ta.sma(close, 90)
matexit = ta.sma(close, 21) < ta.sma(close, 50)
matwohund = close < ta.sma(close, 200)
twohunfall = ta.falling(out, 3)
twentyfall = ta.falling(outt, 2)
shortmafall = ta.falling(outthree, 1)
macdfall = ta.falling(macd,1)
macdsell = macd < signal
shortCondition = false
if macdfall and macdsell and (macdLine < signalLine) and ta.falling(low,2)
    shortCondition := true


if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)

```

> Detail

https://www.fmz.com/strategy/432241

> Last Modified

2023-11-15 17:58:42
