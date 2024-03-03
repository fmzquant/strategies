
> Name

基于均差平滑的趋势跟踪策略Trend-Following-Strategy-Based-on-Smoothed-Deviation

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15fe7902ea1b0bbb750.png)
[trans]
## 概述

该策略是一种利用短期高低点和短期与长期平均成本之间均差判断趋势的指标策略。策略旨在增加短线敏感度,通过增大前后的均值平滑函数来降低盘整的损耗,以减少盘整中的小损失,同时在波段出现时保持大盈利。

## 策略原理

1. 计算短期成本:利用ta.highest和ta.lowest函数计算最近shortTerm根K线的最高价和最低价,然后求平均作为短期成本

2. 计算长期成本:利用ta.sma函数计算最近longTerm根K线的收盘价的简单移动平均作为长期成本

3. 计算均差:短期成本减去长期成本

4. 平滑均差:对均差进行平滑处理,以减少误判,这里采用ta.sma进行简单移动平均

5. 判断趋势:设定阈值threshold,当平滑均差大于threshold则判断为上涨趋势,当小于负的threshold则判断为下跌趋势

6. 进出场:做多时跟踪上涨趋势,做空时跟踪下跌趋势

## 优势分析

1. 增加短期敏感度,可以快速捕捉短线机会
2. 平滑处理,减少误判概率
3. 设定通道,减少无谓开仓
4. 紧跟趋势,及时止损止盈

## 风险分析

1. 短期专注容易被套,需要适当放大止损范围
2. 需要反复测试参数,如短长期天数、均差平滑参数等,不当设置可能导致过于敏感或迟钝
3. 需要合理设定通道宽度,过大过小都存在问题
4. 震荡行情中容易被反复开仓套牢

风险解决方法:

1. 适当放大止损幅度,避免套牢
2. 优化参数设置,平衡敏感度和误判率
3. 测试并优化通道参数
4. 加入过滤条件,避免震荡行情下无谓开仓

## 优化方向

1. 对短期高低点进行优化,如计算PA或加权等更平滑的短期成本
2. 测试不同的长期成本计算方法
3. 尝试不同的均差平滑算法
4. 优化通道参数
5. 添加开仓过滤,如突破,成交量放大等
6. 反转 加入反转交易机会

## 总结

该策略整体是一个非常简单直接的趋势跟踪策略。相比常见的移动平均等指标,其通过计算短长期成本的均差,可以更快地判断趋势转折。同时平滑处理也使其参数优化空间较大,可以通过调整平滑参数来平衡敏感度与误判率。总的来说,该策略具有敏捷、直接、可定制性强等特点,是一种值得深度挖掘的有潜力的策略思路。通过继续优化参数以及加入辅助判断条件,有望进一步增强策略表现。

||

## Overview

This strategy utilizes the deviation between short-term high-low and short-term & long-term average cost to determine the trend. It aims to increase short-term sensitivity and reduce the cost of consolidation by enlarging the previous and subsequent smoothing average functions, so as to decrease small losses during consolidation while maintaining significant profits when trends emerge.

## Strategy Principles 

1. Calculate short-term cost: Use ta.highest and ta.lowest functions to calculate the highest and lowest prices of the recent shortTerm candles, and take the average as the short-term cost

2. Calculate long-term cost: Use ta.sma function to calculate the simple moving average of closing prices of recent longTerm candles as the long-term cost

3. Calculate deviation: Subtract long-term cost from short-term cost  

4. Smooth deviation: Smooth the deviation to reduce misjudgements using ta.sma for simple moving average

5. Determine trend: If the smoothed deviation is greater than the threshold, judge it as an upward trend. If less than the negative threshold, judge it as a downward trend.

6. Entry and exit: Go long when tracing upward trend and go short when tracing downward trend.

## Advantage Analysis

1. Increase short-term sensitivity to quickly capture short-term opportunities
2. Smoothing processing reduces probability of misjudgement  
3. Setting channel reduces unnecessary opening positions
4. Following trends closely allows timely stop loss and profit taking

## Risk Analysis

1. Short-term focus can easily lead to being trapped, stop loss range needs to be appropriately enlarged
2. Parameters require repeated testing, improper settings of short-term, long-term days and deviation smoothing parameters can lead to oversensitivity or slowness
3. Channel amplitude needs to be reasonably set, too large or small can both lead to issues
4. Likely to be trapped in repeated opening positions during volatile sideways markets

Risk Resolution:

1. Appropriately enlarge stop loss range to avoid traps
2. Optimize parameter settings to balance sensitivity and misjudgement rate  
3. Test and optimize channel parameters
4. Add filtering conditions to avoid unnecessary opening positions during volatility

## Optimization Directions

1. Optimize short-term high-low points, such as calculating smoother short-term costs like PA or weighted averages
2. Test different long-term cost calculation methods 
3. Try different deviation smoothing algorithms
4. Optimize channel parameters
5. Add opening filters like breakouts, surges in volume etc.  
6. Reversals Add reverse trading opportunities

## Summary 

Overall this is a very simple and direct trend following strategy. Compared to common indicators like moving averages, by calculating the deviation between short and long term costs, it can judge trend changes faster. Meanwhile, the smoothing processing also provides greater flexibility in parameter optimization, allowing sensitivity and misjudgement rates to be balanced by adjusting the smoothing parameters. In summary, this strategy has characteristics like agility, directness and high customizability. It is a promising strategy worth deeper exploration. By continuing to optimize parameters and adding auxiliary judgement conditions, there is potential to further enhance the strategy's performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Short Term|
|v_input_2|20|Long Term|
|v_input_3|5|Smoothing|
|v_input_4|false|Threshold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © dead0001ing1

//@version=5
strategy("Trend-Following Indicator", overlay=true)

// 設置參數
shortTerm = input(5, "Short Term")
longTerm = input(20, "Long Term")
smooth = input(5, "Smoothing")
threshold = input(0, "Threshold")

// 計算短期成本
shortH = ta.highest(high, shortTerm)
shortL = ta.lowest(low, shortTerm)
shortCost = (shortH + shortL) / 2

// 計算長期成本
longCost = ta.sma(close, longTerm)

// 計算均差
deviation = shortCost - longCost

// 平滑均差
smoothedDeviation = ta.sma(deviation, smooth)

// 判斷順勢
isTrendingUp = smoothedDeviation > threshold
isTrendingDown = smoothedDeviation < -threshold

// 顯示順勢信號
plotshape(isTrendingUp, title="Trending Up", location=location.belowbar, color=color.green, style=shape.labelup, text="Up", size=size.small)
plotshape(isTrendingDown, title="Trending Down", location=location.abovebar, color=color.red, style=shape.labeldown, text="Down", size=size.small)

// 定義進出場策略
if isTrendingUp
    strategy.entry("Long", strategy.long)
    strategy.close("Long", when=isTrendingDown)
if isTrendingDown
    strategy.entry("Short", strategy.short)
    strategy.close("Short", when=isTrendingUp)


```

> Detail

https://www.fmz.com/strategy/442207

> Last Modified

2024-02-20 11:15:54
