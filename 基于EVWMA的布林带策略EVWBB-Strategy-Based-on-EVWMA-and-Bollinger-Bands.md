
> Name

基于EVWMA的布林带策略EVWBB-Strategy-Based-on-EVWMA-and-Bollinger-Bands

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ff98febb0cd88e993f.png)

[trans]

## 概述

该策略利用EVWMA作为布林带的基础线,当价格突破布林带上轨时做多,突破下轨时做空,以捕捉价格的趋势性移动。

## 策略原理

该策略首先计算最近30个周期的总成交量vol_period。然后计算EVWMA,公式为:(前一日EVWMA x (vol_period - 今日成交量) + 今日成交量 x 收盘价) / vol_period。

布林带的中轨basis为EVWMA,上下轨分别为basis ± 2倍的stdev(收盘价的标准差)。当价格上穿上轨时做多,下穿下轨时做空。止损点为basis。

## 优势分析

1. EVWMA能更好地反映价格变化趋势,与均线相比更平滑。

2. 布林带能清晰识别出价格波动的上下限,利于捕捉价格突破。 

3. 结合趋势指标EVWMA和波动指标布林带,能更精确判断入场时机。

4. 止损点为basis,有利于控制风险。

## 风险分析

1. 在剧烈行情中,EVWMA无法及时反映价格变化,可能错过入场机会。

2. 布林带在横盘中容易被反复震荡触发入场。

3. 未考虑持仓时间和位置规模的管理,存在获利不理想和亏损扩大的风险。

4. 没有设置止盈点,存在超出合理目标而继续持有的风险。

## 优化方向

1. 可以测试不同参数,找到更合适的期间长度。

2. 可以考虑结合其他指标如MACD等过滤入场信号。

3. 可以设置持仓时间管理,如设置固定持仓周期。

4. 可以设置止盈点,预先确定合理的盈利目标。

5. 可以根据市场情况调整仓位规模。

## 总结

该策略整合了EVWMA和布林带两个指标的优势,通过捕捉价格突破上下轨的方式实现趋势跟踪。优点是指标组合合理,入场精准,能够有效控制风险。但也存在参数设置不当,持仓管理不完善等问题。通过优化参数,设置止盈止损,以及加强持仓管理,能够进一步提高策略的稳定性和盈利能力。总体来说,该策略思路合理,有一定的实用价值和开发潜力。

||


## Overview

This strategy uses EVWMA as the basis line for Bollinger Bands. It goes long when the price breaks through the upper band and goes short when the price breaks through the lower band to capture trending moves in the price.

## Strategy Logic

The strategy first calculates the total volume over the past 30 periods as vol_period. Then it calculates EVWMA using the formula: (previous EVWMA x (vol_period - current volume) + current volume x close) / vol_period. 

The basis for the Bollinger Bands is set as EVWMA, and the upper and lower bands are basis ± 2 * stdev(close). The strategy goes long when the price breaks above the upper band and goes short when the price breaks below the lower band. The stop loss is set at the basis level.

## Advantage Analysis 

1. EVWMA reflects price changes better than moving averages, resulting in a smoother line.

2. Bollinger Bands clearly identify the upper and lower limits of price fluctuations, making it easy to capture breakouts.

3. Combining the trend indicator EVWMA and the volatility indicator Bollinger Bands allows more precise timing of entries. 

4. The stop loss at the basis level helps control risk.

## Risk Analysis

1. EVWMA may fail to reflect price changes in time during huge market swings, causing missed entry opportunities.

2. Bollinger Bands are prone to whipsaws during range-bound markets, triggering unnecessary entries. 

3. Lack of position sizing and holding period management can lead to unsatisfactory profits or magnified losses.

4. Absence of a profit target risks holding positions beyond reasonable objectives.

## Optimization Directions

1. Test different parameter settings to find optimal lookback periods.

2. Consider adding filters like MACD to refine entry signals. 

3. Implement fixed holding period to manage trades.

4. Set profit targets to define reasonable profit goals.

5. Adjust position sizes based on market conditions.

## Summary

This strategy combines the strengths of EVWMA and Bollinger Bands to track trends by capturing breakouts. Its advantages are reasonable indicator combination, precise entries, and effective risk control. However, improper parameter tuning and lack of trade management remain issues. Further improvements in parameter optimization, profit targeting, stop losses, and position sizing can enhance its stability and profitability. Overall, the strategy logic is sound and shows practical value and development potential.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|30|Length|
|v_input_2|2|mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-26 00:00:00
end: 2023-11-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("EVWBB Strategy [QuantNomad]", shorttitle="EVWBB Strategy [QN]", overlay=true)

// Inputs
sum_length = input(30,  title = "Length", type = input.integer)
mult       = input(2.0, minval=0.001, maxval=50)
 
// Calculate Volume Period
vol_period = sum(volume, sum_length)

// Calculate EVWMA
evwma = 0.0
evwma := ((vol_period - volume) * nz(evwma[1], close) + volume * close) / (vol_period)

basis = evwma
dev = mult * stdev(close, sum_length)

upper = basis + dev
lower = basis - dev

plot(basis, color=color.red)
p1 = plot(upper, color=color.blue)
p2 = plot(lower, color=color.blue)
fill(p1, p2)

buyEntry = crossover(close, lower)
sellEntry = crossunder(close, upper)

strategy.entry("BBandLE", strategy.long,  stop = upper , oca_name = "BollingerBands",  comment="BBandLE")
strategy.entry("BBandSE", strategy.short, stop = lower,  oca_name = "BollingerBands", comment="BBandSE")

strategy.exit("BBand L SL", "BBandLE", stop = basis)
strategy.exit("BBand S SL", "BBandSE", stop = basis)
```

> Detail

https://www.fmz.com/strategy/430863

> Last Modified

2023-11-02 15:27:28
