
> Name

基于高斯平滑去趋势反转策略Gaussian-Detrended-Reversion-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1589d8a90757cc94093.png)
[trans]

### 概述

这是一种利用自定义的基于高斯平滑的去趋势价格震荡指标识别潜在价格反转的策略。该策略结合去趋势价格震荡指标和价格周期的高斯平滑移动均线,设定具体的入场和出场条件,以捕捉价格反转机会。

### 策略原理

该策略首先计算去趋势价格震荡指标(GDPO),方法是比较收盘价和一定周期的指数移动平均线,以识别出短期内的价格周期。然后对GDPO进行高斯平滑,使用Arnaud Legoux移动平均线(ALMA)应用高斯平滑技术,过滤掉噪音,给出价格趋势更清晰的图景。 

策略通过平滑后的GDPO与其滞后版本的交叉情况来确定做多做空的具体入场和出场条件。当平滑GDPO上穿滞后版本且为负时,做多入场;当平滑GDPO下穿滞后版本或零轴时,平仓做多头仓位。类似地,当平滑GDPO下穿滞后版本且为正时,做空入场;当平滑GDPO上穿滞后版本或零轴时,平仓做空头仓位。

在图表上,平滑后的GDPO和其滞后版本用不同颜色绘制,以直观显示其交叉情况。同时绘制零轴作为参考。策略入场时设置背景颜色变化以提示。并在GDPO的交叉点绘制叉型标记以提示出场点。

### 优势分析

该策略结合去趋势技术和高斯平滑过滤噪音,可以更清晰地识别价格反转机会。相比其他震荡指标,GDPO通过去趋势来配合周期分析,可提高准确性。高斯平滑滤除大量噪声,使指标信号更清晰。具体的入场出场条件可以有效控制损失。

### 风险分析

该策略对参数调节较为敏感,如周期长度、平滑参数等,需要经过充分回测确定合适参数组合,否则可能出现过多错误信号。在趋势行情中,该策略可能产生连续亏损。止损策略需要搭配使用以控制单笔损失。此外,反转失败是该策略的主要风险,需要关注形态特征及趋势强度等确定反转概率。

可以通过动态调整参数,结合趋势判断指标进行优化,提高策略稳健性。也可以设置动态止损来控制风险。

### 优化方向

该策略可以从以下几个方向进行优化:

1. 动态调整平滑参数,在趋势行情中增大平滑强度,减少错误信号。

2. 结合趋势判断指标,如ADX,避免反转策略在趋势行情中持续亏损。

3. 增加止损策略,如随价格波动调整止损点或盈利后移动止损。

4. 优化入场条件,可结合其他指标或形态作为确认,提高入场准确率。 

5. 优化资金管理,根据市场情况调整仓位和止损点。

6. 测试不同的价格数据,如日线、周线等,评估不同周期下的策略效果。

### 总结

基于高斯平滑去趋势反转策略,利用GDPO指标识别价格短期周期性,并应用高斯滤波技术提取信号,在明确的入场出场条件下捕捉反转机会。该策略有效控制了反转交易的风险,但需要注意参数优化及趋势判断。通过动态调整、确认指标及止损策略的配合,可以进一步提升策略稳定性。

||


### Overview

This is a strategy that identifies potential price reversals using a customized Gaussian Detrended Price Oscillator (GDPO) combined with smoothed price cycles. It uses the detrended oscillator with Gaussian smoothing and sets specific entry and exit rules to capture reversal opportunities.

### Strategy Logic

The strategy first calculates the Detrended Price Oscillator (DPO) by comparing the close price to an Exponential Moving Average (EMA) over a specified period to identify short-term price cycles. The DPO values are then smoothed using the Arnaud Legoux Moving Average (ALMA) with Gaussian smoothing technique to filter out noise.

The entry and exit rules are defined based on crossover events between the smoothed GDPO and its lagged version. A long position is entered when the smoothed GDPO crosses above the lag and is negative. The long position is exited when the smoothed GDPO crosses below the lag or the zero line. A short position is entered when the smoothed GDPO crosses below the lag and is positive. The short position is exited when the smoothed GDPO crosses above the lag or the zero line.

The smoothed GDPO and its lag are plotted in distinct colors. The zero line is also displayed as a reference. The chart background color changes when the strategy enters a position. Cross markers are plotted at the crossover points as exit signals.

### Advantage Analysis 

The strategy combines detrending techniques and Gaussian smoothing to more clearly identify reversal opportunities compared to other oscillators. The GDPO improves accuracy by incorporating cycle analysis with detrending. Gaussian smoothing eliminates noise for clearer signals. The specific entry and exit rules effectively control losses.

### Risk Analysis

The strategy is sensitive to parameter tuning like the period lengths and smoothing parameters. Extensive backtesting is required to determine optimal parameters, otherwise excessive false signals may occur. The strategy may produce consecutive losses in trending markets. Stop loss should be used to control single trade loss. Failed reversals are also a major risk. Reversal probability should be confirmed using chart patterns and trend strength. 

Optimization can be done by dynamically adjusting parameters and incorporating trend indicators to improve robustness. Dynamic stops can also control risks.

### Optimization Directions

The strategy can be optimized in several aspects:

1. Dynamically adjust smoothing parameters to increase smoothing in trends and reduce false signals.

2. Incorporate trend indicators like ADX to avoid losses in trending markets. 

3. Add stop loss mechanisms like dynamic or trailing stops.

4. Optimize entry conditions using additional indicators or patterns for higher entry accuracy.

5. Optimize capital management by adjusting position sizing and stops based on market conditions. 

6. Test the strategy across different timeframes like daily or weekly data.

### Summary

The Gaussian Detrended Reversion strategy identifies short-term cycles using the GDPO and extracts signals with Gaussian filtering to capture reversals under defined entry and exit rules. It effectively controls the risks of reversal trading but requires parameter optimization and trend validation. Further improvements in robustness can be made through dynamic adjustments, confirming indicators and stop loss strategies.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|50|Price Length|
|v_input_1|50|Smoothing Length|
|v_input_2|25|Lag Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-31 00:00:00
end: 2023-11-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0
// © DraftVenture

//@version=5
strategy(title="Gaussian Detrended Reversion Strategy", overlay=false, default_qty_type=strategy.percent_of_equity, default_qty_value=15)

//Detrended Price Oscillator for price cycles
period_ = input.int(50, title="Price Length", minval=1)

barsback = period_/2 + 1
ma = ta.ema(close, period_)
dpo = close - ma[barsback]

// Rounded ALMA Calculations for gaussian smoothing
almaSource = dpo
almaWindowSize = input(title="Smoothing Length", defval=50)
lagLength = input(title="Lag Length", defval=25)
almaSmoothed = ta.alma(almaSource, almaWindowSize, 0.85, 6)
almaLag = almaSmoothed[lagLength]

// Reversion entry conditions
entryL = ta.crossover(almaSmoothed, almaLag) and almaSmoothed < 0
exitL = ta.crossunder(almaSmoothed, almaLag) or ta.crossunder(almaSmoothed, 0)
entryS = ta.crossunder(almaSmoothed, almaLag) and almaSmoothed > 0
exitS = ta.crossover(almaSmoothed, almaLag) or ta.crossover(almaSmoothed, 0)

// Long entry and exit
if entryL
    strategy.entry("Long", strategy.long)

if exitL
    strategy.close("Long")

// Short entry and exit
if entryS
    strategy.entry("Short", strategy.short)

if exitS
    strategy.close("Short")

// Plot the oscillator
plot(almaSmoothed, title="GDPO", color=color.green)
plot(almaLag, title="Lag", color=color.white)

hline(0, title="Zero Line", color=color.white)

bgcolor(entryL ? color.new(color.green, 40) : na)
bgcolor(entryS ? color.new(color.red, 40) : na)

plotshape(series=ta.crossunder(almaSmoothed, almaLag) or ta.crossunder(almaSmoothed, 0), style=shape.xcross, location=location.top, color=color.white, size=size.tiny)
plotshape(series=ta.crossover(almaSmoothed, almaLag) or ta.crossover(almaSmoothed, 0), style=shape.xcross, location=location.bottom, color=color.white, size=size.tiny)

//Strategy by KP
```

> Detail

https://www.fmz.com/strategy/431392

> Last Modified

2023-11-07 15:01:19
