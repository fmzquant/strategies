
> Name

基于Chande-Kroll止损与ADX过滤的趋势跟踪策略ADX-Filtered-Chande-Kroll-Stop-Loss-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c27c1d06280689521e.png)
[trans]

## 概述

该策略结合Chande Kroll止损指标和平均趋向指数(ADX)指标,实现了一个相对简单的趋势跟踪策略。Chande Kroll止损用于生成长短仓入场信号,ADX用于过滤掉无明显趋势的市场情况,避免无方向的震荡市导致止损反复触发。

## 策略原理

该策略首先计算Chande Kroll止损的长线stop_long和短线stop_short。长线由过去p周期内的最高价计算,短线由过去p周期内的最低价计算。然后用过去q周期内长短线的最高点和最低点作为当前的长短止损线。这样可以滤除短期价格震荡的影响,只在趋势转折点触发止损。 

当收盘价上穿短线stop_short时,产生做多信号;当收盘价下穿长线stop_long时,产生做空信号。

此外,策略加入ADX指标判断趋势强弱。只有在ADX大于阈值时,止损信号才会触发入场。这可以过滤掉盘整震荡时止损的误报。

## 策略优势

该策略结合趋势指标和止损指标的优点,既可以及时捕捉趋势转折,又可以避免无方向市场的 whip saw。Chande Kroll止损的参数优化可以平滑滤波,确保只在趋势转折时止损。ADX指标确保只在趋势明显时入场,可以避免震荡市的止损跳空。

## 策略风险

ADX参数设置不当可能错过趋势开始的机会。如果ADX阈值设置过高,在趋势开始阶段就可能因ADX值过低而错过入场机会。

止损点过近也可能造成策略仓位频繁打开和关闭。这会增加交易成本和滑点成本。止损点需要合理设置,给予趋势一定的视角。

## 策略优化

可以考虑在ADX升破某个阈值时才允许止损信号触发,这样可以提高入场时机的可靠性。还可以结合其他趋势指标进行组合判断,如将ADX值与EMA斜率进行组合等。

止损线也可以考虑根据ATR动态调整,在市场波动加大时扩大止损空间,避免过于灵敏。或者可以结合MACD等辅助指标评估趋势强弱,动态调整止损线。

## 总结

该策略整合Chande Kroll止损和ADX指标的优势,实现了一个相对简单实用的趋势跟踪策略。通过参数优化,可以进一步提高策略的稳定性和盈利能力。但需要注意防止止损过于灵敏和ADX过滤过于宽松造成的风险。
||

## Overview

This strategy combines the Chande Kroll stop loss indicator and the Average Directional Movement Index (ADX) indicator to implement a relatively simple trend following strategy. Chande Kroll stop loss is used to generate long and short entry signals, while ADX filters out market conditions without a clear trend to avoid whipsaws from non-directional volatility triggering stop losses repeatedly.

## Strategy Logic

The strategy first calculates the long stop long and short stop short lines of the Chande Kroll stop loss. The long line is calculated based on the highest price over the past p periods. The short line is calculated based on the lowest price over the past p periods. The highest point of the long and short lines over the past q periods are then used as the current long and short stop loss lines. This filters out short-term price fluctuations and only triggers stop loss at trend reversal points.

When the closing price crosses above the short line stop_short, a long signal is generated. When the closing price crosses below the long line stop_long, a short signal is generated.

In addition, the ADX indicator is used to judge the strength of the trend. Only when the ADX is greater than the threshold will the stop loss signal trigger entry. This filters out non-directional whipsaw in consolidation.

## Advantages

The strategy combines the advantages of trend indicators and stop loss indicators. It can timely capture trend reversals while avoiding whipsaws in non-directional markets. Optimization of the Chande Kroll stop loss parameters can smooth filtering and ensure stop loss only at trend reversal points. The ADX indicator ensures entry only when the trend is significant, avoiding stop loss whipsaws during market consolidation.

## Risks

Improper ADX parameter settings may miss opportunities at the beginning of trends. If the ADX threshold is set too high, entry opportunities may be missed at the beginning of trends when ADX values are still low.

Stop loss points that are too close may also cause frequent opening and closing of strategy positions. This will increase trading and slippage costs. Stop loss points need to be reasonably set to allow some space for trends.

## Optimization

Consider allowing stop loss signals to trigger only when ADX breaks above a threshold. This can improve the reliability of entry timing. Other trend indicators can also be combined for conjunctive conditions, such as combining ADX values with EMA slopes. 

Stop loss lines can also be dynamically adjusted based on ATR, allowing wider stops when market volatility increases to avoid excessive sensitivity. Or MACD can be used to evaluate trend strength and dynamically adjust stop loss lines.

## Summary

The strategy integrates the strengths of Chande Kroll stop loss and ADX indicators to build a relatively simple and practical trend following strategy. Through parameter optimization, the stability and profitability of the strategy can be further improved. But risks of excessive stop loss sensitivity and insufficient ADX filtering need to be watched out for.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|p|
|v_input_int_2|true|x|
|v_input_int_3|9|q|
|v_input_1|14|ADX Smoothing|
|v_input_2|14|DI Length|
|v_input_int_4|20|minimum ADX threshold for signal|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-30 00:00:00
end: 2023-06-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title = "Chande Kroll Stop", overlay=true)
p = input.int(10, minval=1)
x = input.int(1, minval=1)
q = input.int(9, minval=1)
first_high_stop = ta.highest(high, p) - x * ta.atr(p)
first_low_stop = ta.lowest(low, p) + x * ta.atr(p)
stop_short = ta.highest(first_high_stop, q)
stop_long = ta.lowest(first_low_stop, q)
plot(stop_long, color=color.blue)
plot(stop_short, color=color.orange)

adxlen = input(14, title="ADX Smoothing")
dilen = input(14, title="DI Length")
ADX_sig = input.int(20, title="minimum ADX threshold for signal")
dirmov(len) =>
	up = ta.change(high)
	down = -ta.change(low)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
	minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange = ta.rma(ta.tr, len)
	plus = fixnan(100 * ta.rma(plusDM, len) / truerange)
	minus = fixnan(100 * ta.rma(minusDM, len) / truerange)
	[plus, minus]
adx(dilen, adxlen) =>
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * ta.rma(math.abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
sig = adx(dilen, adxlen)


if ta.crossunder(close, stop_long) and sig>ADX_sig
    strategy.entry("long", strategy.long)
if ta.crossover(close, stop_short) and sig>ADX_sig
    strategy.entry("short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/431251

> Last Modified

2023-11-06 14:52:27
