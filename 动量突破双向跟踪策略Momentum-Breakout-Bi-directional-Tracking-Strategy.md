
> Name

动量突破双向跟踪策略Momentum-Breakout-Bi-directional-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/207f8a2245b24b751e7.png)
 [trans]

## 概述

本策略结合使用动量指标和双向追踪指标,在强势趋势中捕捉突破信号,实现趋势跟踪。当价格向上突破时做多,当价格向下突破时做空,属于趋势追踪类策略。

## 策略原理

1. 使用HiLo激活器指标计算中期价,该指标将最高价和最低价的中点作为中期价。当价格上涨突破中期价时产生买入信号,当价格下跌突破中期价时产生卖出信号。

2. 平均趋向指数ADX用于判断趋势力度。ADX数值越大,表示趋势越强。本策略配合使用一定阈值的ADX来过滤信号,只在趋势足够强劲时才产生信号。

3. 多向导指标DI+和DI-分别表示多头力度和空头力度。本策略同时配合一定阈值的DI+和DI-来确认多头和空头的力度,防止错误信号。

4. 当价格向上突破中期价、ADX高于阈值、DI+高于阈值时产生买入信号;当价格向下突破中期价、ADX高于阈值、DI-高于阈值时产生卖出信号。

## 优势分析

本策略结合动量指标和趋势指标的优点,能够在趋势发展早期捕捉到价格的突破,从而紧贴趋势运行。同时,趋势过滤条件严格,有助于避免 consolidation 市和震荡市的错误信号。

相比单一使用动量指标,本策略在产生信号时加入对趋势力度的判断,可以减少错误信号,提高获利概率。相比单一使用趋势跟踪指标,本策略通过突破产生信号,可以更早进入趋势。

总体来说,策略可以顺利跟踪趋势,及时进入和退出,避免泥淖;同时也可以减少趋势反转的损失。

## 风险分析

本策略存在一定的whipsaw风险,即价格可能出现一定程度的回调从而产生反向信号。此外,使用ADX和DI设置过滤条件可能会错过部分运行初期的机会。

为降低whipsaw风险,可以适当调整HiLo激活器的参数,增大突破幅度。为获取更多机会,可以降低ADX和DI的阈值要求,但需要权衡信号质量。

此外,用户需要关注不同品种和市场环境下参数设置的差异。一般来说,大宗商品需要设置更高阈值;股票和外汇则可以使用较低阈值。

## 优化方向

本策略可以通过调整参数设置进行优化,主要优化方向包括:

1. 调整HiLo激活器周期和触发幅度,平衡whipsaw风险和进入时机。

2. 调整ADX周期和阈值要求,平衡信号质量和进入频次。

3. 分别调整多头和空头DI的阈值,区分多头和空头环境差异。

4. 添加止损策略,设置止损点以控制单笔损失。

5. 结合其他辅助指标进行优化,提高策略整体稳定性。

## 总结

本策略综合考虑动量指标和趋势指标,在强势趋势中产生买入和卖出信号。它具有顺势而为、紧贴趋势的特点,适合捕捉趋势早期机会。同时,它也具备一定的风险控制能力,可以减少错误信号和 whipsaw 带来的损失。通过参数调整和止损策略的添加,本策略可以获得持续稳定的表现。它是一种多功能的趋势跟踪策略,适合不同品种和市场环境,值得量化交易者重点研究和应用。

||

## Overview

This strategy combines momentum indicators and bi-directional tracking indicators to capture breakout signals in strong trends for trend tracking. It goes long when prices break out upwards and goes short when prices break downwards. It belongs to the trend tracking strategy category.

## Strategy Logic  

1. The HiLo Activator indicator calculates the midpoint price using the midpoint of the highest high and lowest low. When prices break out above the midpoint, a buy signal is generated. When prices break down below the midpoint, a sell signal is generated.

2. The Average Directional Index (ADX) is used to gauge the strength of the trend. The higher the ADX value, the stronger the trend. This strategy uses ADX with a threshold to filter signals, only generating signals when the trend is strong enough.  

3. The Directional Indicators DI+ and DI- represent the strength of the uptrend and downtrend respectively. This strategy also uses DI+ and DI- thresholds to confirm the strength to avoid wrong signals.

4. Buy signals are generated when prices break out above the midpoint, ADX is higher than the threshold, and DI+ is higher than the threshold. Sell signals are generated when prices break down below the midpoint, ADX is higher than the threshold, and DI- is higher than the threshold.

## Advantage Analysis

This strategy combines the advantages of momentum and trend-following indicators to capture early breakouts and follow trends closely. The strict trend filter conditions also help avoid wrong signals in consolidation and ranging periods.  

Compared to using momentum indicators alone, this strategy adds trend strength evaluation to filter signals and improve profitability. Compared to pure trend-following strategies, this strategy can enter trends earlier through breakout signals.  

Overall, the strategy can track trends smoothly, enter and exit timely, and avoid being stuck in consolidations while also reducing losses from trend reversals.

## Risk Analysis  

This strategy has some whipsaw risks from temporary price reversals generating wrong signals. Also, using ADX and DI thresholds may cause missing some early opportunities.  

To reduce whipsaw risks, tweak the HiLo Activator parameters to increase the breakout range. To capture more opportunities, lower the ADX and DI thresholds at the expense of signal quality.  

Users should also note differences across products and market environments. Higher thresholds generally work better for commodities while lower thresholds suit stocks and forex.

## Optimization Directions

The main ways to optimize this strategy include:  

1. Adjust the HiLo Activator period and trigger levels to balance whipsaw risks and timing.

2. Tweak ADX period and threshold to balance signal quality and frequency.  

3. Set separate thresholds for DI+ and DI- to accommodate differences between uptrends and downtrends.  

4. Add stop loss strategies with stop loss levels to control single trade loss.

5. Combine with other auxiliary indicators to improve overall stability.  

## Conclusion

This strategy considers both momentum and trend-following indicators to generate signals during strong trends. It has the advantage of following trends smoothly and closely, suitable for capturing early trend opportunities. It also has reasonable risk control abilities to reduce losses from wrong signals and whipsaws. With parameter tuning and stop loss additions, it can achieve steady performance. As a versatile trend tracking strategy fitting different products and markets, it deserves good attention and application from quant traders.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|HiLo Activator Period|
|v_input_2|false|Offset|
|v_input_3|true|Trigger for Buy/Sell|
|v_input_4|14|ADX Period|
|v_input_5|25|ADX Threshold|
|v_input_6|50|DI Threshold|
|v_input_7|1000|Number of Candles for Backtest|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-11 00:00:00
end: 2023-12-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("HiLo Activator with ADX", shorttitle="HASB_ADX", overlay=true)

// Parameters for the HiLo Activator
length_ha = input(14, title="HiLo Activator Period")
offset_ha = input(0, title="Offset")
trigger_ha = input(1, title="Trigger for Buy/Sell")

// Parameters for ADX
adx_length = input(14, title="ADX Period", minval=1)
adx_threshold = input(25, title="ADX Threshold")
di_threshold = input(50, title="DI Threshold")

// Parameter for choosing the number of candles for backtest
backtest_candles = input(1000, title="Number of Candles for Backtest", minval=1)

// Function to get backtest data
getBacktestData() =>
    var float data = na
    if bar_index >= backtest_candles
        data := security(syminfo.tickerid, "D", close[backtest_candles])
    data

// HiLo Activator calculations
ha = (highest(high, length_ha) + lowest(low, length_ha)) / 2

// ADX calculations
trh = high - high[1]
trl = low[1] - low
tr = max(trh, trl)
atr = sma(tr, adx_length)
plus_dm = high - high[1] > low[1] - low ? max(high - high[1], 0) : 0
minus_dm = low[1] - low > high - high[1] ? max(low[1] - low, 0) : 0
smoothed_plus_dm = sma(plus_dm, adx_length)
smoothed_minus_dm = sma(minus_dm, adx_length)
di_plus = 100 * (smoothed_plus_dm / atr)
di_minus = 100 * (smoothed_minus_dm / atr)
dx = 100 * abs(di_plus - di_minus) / (di_plus + di_minus)
adx = sma(dx, adx_length)

// Buy and Sell signals based on HiLo Activator and ADX
signalLong = crossover(close, ha) and adx > adx_threshold and di_plus > di_threshold
signalShort = crossunder(close, ha) and adx > adx_threshold and di_minus > di_threshold

// Plot HiLo Activator and ADX
plot(ha, color=color.blue, title="HiLo Activator")
plot(offset_ha, color=color.red, style=plot.style_histogram, title="Offset")
plot(adx, color=color.purple, title="ADX")

// Backtest strategy
strategy.entry("Buy", strategy.long, when = signalLong)
strategy.entry("Sell", strategy.short, when = signalShort)
strategy.close("Buy", when = signalShort)
strategy.close("Sell", when = signalLong)

// Accuracy percentage
var accuracy = 0.0
var totalTrades = 0
var winningTrades = 0

if (signalLong or signalShort)
    totalTrades := totalTrades + 1

if (signalLong and (not na(signalLong[1]) and (not signalLong[1])))
    winningTrades := winningTrades + 1

if (signalShort and (not na(signalShort[1]) and (not signalShort[1])))
    winningTrades := winningTrades + 1

accuracy := totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0

// Plot accuracy percentage on the chart
plot(accuracy, title="Accuracy Percentage", color=color.purple, style=plot.style_histogram)

```

> Detail

https://www.fmz.com/strategy/435709

> Last Modified

2023-12-18 10:47:46
