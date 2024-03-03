
> Name

心理线交易策略Psychological-Line-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略利用心理线指标判断市场买卖力道比,以捕捉市场趋势变化。当买盘力道强于卖盘时做多,当卖盘力道强于买盘时做空。心理线简单易用,可作为趋势识别的辅助工具。

## 策略原理

1. 心理线指标计算一定周期内收盘价上涨的比例。

2. 当比例超过50%时,认为买盘力道大于卖盘力道,给出做多信号。

3. 当比例低于50%时,认为卖盘力道大于买盘力道,给出做空信号。

4. 当比例在50%附近震荡,认为买卖平衡,市场无明确方向。 

5. 可灵活调整参数,对短期或长期趋势进行判断。

## 优势分析

1. 计算方法简单,易于实盘操作。

2. 直观显示买卖力道强弱,辅助判断资金流向。

3. 可 discover 部分反转信号。

4. 可搭配其他指标一起使用,提高策略效果。

## 风险分析

1. 无法判断趋势的持续时间和力度。

2. 参数设置不当可能产生大量错误信号。

3. 单独使用容易被套,应该与其他指标组合。 

4. 需要优化参数以适应不同品种和周期。

## 优化方向

1. 测试不同参数在各品种的效果,找到最佳周期。

2. 组合更多指标判断趋势持续性。

3. 优化资金管理策略,设置止损和止盈。

4. 评估趋势强弱,避免反向开仓过早。

5. 在特定时间段关闭策略,规避容易产生错误的时间段。

## 总结

心理线指标本身较为简单,但搭配使用效果不错。可作为发现趋势变化的辅助工具之一,但不宜单独使用。通过参数优化及整合其他指标,可将心理线策略提升到一个新的水平,值得进一步研究。

|| 

## Overview

This strategy uses the Psychological Line indicator to gauge the buying/selling power in the market and capture trend changes. It goes long when buying power is stronger than selling power, and goes short when selling power exceeds buying power. The Psychological Line is simple and easy to use as a trend discovery tool.

## Strategy Logic

1. Psychological Line calculates the percentage of closing prices that have risen over a period. 

2. When the percentage exceeds 50%, it indicates buying power is greater than selling power, giving long signal.

3. When the percentage is below 50%, it indicates selling power exceeds buying power, giving short signal.

4. When the percentage oscillates near 50%, it indicates balanced buying/selling and no clear direction.

5. The parameters can be flexibly adjusted to judge short or long term trends.

## Advantage Analysis

1. Simple calculation method, easy to implement for live trading.

2. Intuitively displays the strength of buying/selling power as supplementary judgment of capital flows.

3. Can discover some reversal signals. 

4. Can be used together with other indicators to improve strategy performance.

## Risk Analysis

1. Unable to determine the duration and strength of trends.

2. Improper parameter settings may generate excessive false signals.

3. Prone to whipsaws when used alone, should combine with other indicators.

4. Need parameter optimization for different products and timeframes.

## Improvement Directions

1. Test different parameters on various products to find optimal periods.

2. Incorporate more indicators to determine trend persistence.

3. Optimize money management strategies by setting stop loss and take profit. 

4. Assess trend strength to avoid premature reverse entries.

5. Disable strategy during specific hours to avoid wrong signal-prone periods.

## Summary

The Psychological Line indicator itself is quite simple, but works well when combined with other tools. It can serve as an auxiliary tool for discovering trend changes, but should not be used alone. By optimizing parameters and integrating with other indicators, the Psychological Line strategy can be enhanced to a new level and is worth further research.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-12 00:00:00
end: 2023-09-19 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 10/04/2018
// Psychological line (PSY), as an indicator, is the ratio of the number of 
// rising periods over the total number of periods. It reflects the buying 
// power in relation to the selling power.
//
// If PSY is above 50%, it indicates that buyers are in control. Likewise, 
// if it is below 50%, it indicates the sellers are in control. If the PSY 
// moves along the 50% area, it indicates balance between the buyers and 
// sellers and therefore there is no direction movement for the market.
//
// You can change long to short in the Input Settings
// WARNING:
//  - For purpose educate only
//  - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Psychological line Backtest")
Length = input(20, minval=1)
reverse = input(false, title="Trade reverse")
xPSY = sum(close > close[1],Length) / Length * 100
clr = iff(xPSY >= 50, green, red)
pos = iff(xPSY > 50, 1,
       iff(xPSY < 50, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
p1 = plot(50, color=black, title="0")
p2 = plot(xPSY, color=blue, title="PSY")
fill(p1, p2, color=clr)
```

> Detail

https://www.fmz.com/strategy/427375

> Last Modified

2023-09-20 14:50:47
