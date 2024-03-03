
> Name

超趋势盲从策略Supertrend-Blind-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9140736ef2115de529.png)
[trans]

## 概述

本策略展示了如果盲目跟随超趋势指标会发生什么情况。我们知道,超趋势指标不是立即出现的,我们需要等待下一根K线才能决定是否进入仓位。所以,你可以看到,如果在超趋势指标最终形成后才入场,会发生什么。如果没有其他工具的辅助,这个指标非常危险,可能会带来非常大的回撤。请注意资金管理。

## 策略原理

本策略使用超趋势指标判断价格趋势。超趋势指标基于平均真实波幅和高低价中点构建。

当收盘价高于上轨时,代表持续看涨;当收盘价低于下轨时,代表持续看跌。

本策略设置了Factor和Pd两个参数。Factor控制超趋势通道的宽度,Pd控制计算ATR的周期长度。根据这两个参数可以构建上轨和下轨。

上轨公式:hl2 - (Factor * ATR(Pd))
下轨公式:hl2 + (Factor * ATR(Pd)) 

其中hl2代表高低价中点。

然后比较当前收盘价与上下轨,判断持续看涨还是看跌,输出布尔型的Trend变量。

根据Trend来绘制超趋势的上下轨。并在Trend状态发生变化时,放置入场和出场信号。

根据信号设置策略的开仓逻辑。

## 优势分析

本策略具有以下优势:

1. 使用了超趋势指标,可以清晰判断价格趋势和枢轴点。

2. 设置了明确的入场和出场逻辑。

3. 可视化通过箭头标注入场时机。

4. 策略逻辑简单易懂。

## 风险分析

本策略存在以下风险:

1. 盲目跟随超趋势指标,没有其它辅助指标和效果管理,可能带来巨大回撤。

2. 没有设置止损,无法控制单笔损失。

3. 信号可能出现滞后,无法在转折点附近及时入场。

4. 参数设定不当可能导致超趋势通道过于宽泛或过于狭窄。

风险管理措施:

1. 结合其他指标如MACD、KDJ等进行效果验证,避免盲目跟随。

2. 设置合理的止损位,最大限度控制单笔损失。

3. 调整参数,使超趋势通道合理,防止过于宽泛或狭窄。 

## 优化方向  

本策略可以从以下方面进行优化:

1. 增加辅助指标进行效果验证,防止失效。例如可以考虑加入MACD指标。

2. 设置合理的止损逻辑。可以基于ATR来设置百分比止损。

3. 对超参数Factor和Pd进行优化,找到最佳参数组合。例如可以采用遍历的方法寻找最优参数。

4. 对入场时机进行优化,避免信号滞后。例如可以引入动量指标判断强弱格局调整入场时机。

5. 增加仓位管理策略。例如可以采用固定份额进行仓位管理。

## 总结

本策略采用超趋势指标判断价格趋势和找出转折点。由于缺乏辅助指标和止损手段,盲目跟随超趋势指标带来巨大风险。我们提出了在风险管理、止损策略、参数优化、入场时机等多个方面进行改进,可以显著增强策略的稳定性和盈利能力。

||

## Overview

This strategy shows what would happen if you blindly follow the Supertrend indicator. As we know, Supertrend does not appear immediately and we need to wait for the next bar to decide whether to enter a position. So you can see what will happen if you take a position after Supertrend finally formed. This indicator is extremely dangerous without other tools and can give very serious drawdowns. Take care of yourself...

## Strategy Logic

This strategy uses the Supertrend indicator to determine price trend. Supertrend is built based on the Average True Range and midpoints of high and low prices. 

When the close price is above the upper rail, it represents a sustained uptrend; when the close price is below the lower rail, it represents a sustained downtrend.

This strategy sets two parameters: Factor and Pd. Factor controls the width of the Supertrend channel, and Pd controls the period length to calculate ATR. Based on these two parameters, the upper and lower rails can be constructed.

Upper Rail Formula: hl2 - (Factor * ATR(Pd))
Lower Rail Formula: hl2 + (Factor * ATR(Pd))

Where hl2 represents the midpoint of high and low prices. 

Then compare the current close price with the upper and lower rails to determine if it's an uptrend or a downtrend, and output a boolean Trend variable.

Plot the upper and lower rails of Supertrend based on Trend. And place entry and exit signals when Trend status changes. 

Set strategy's entry logic based on the signals.

## Advantage Analysis 

This strategy has the following advantages:

1. Uses Supertrend indicator, which can clearly determine price trend and pivot points.

2. Sets clear entry and exit logic.  

3. Visualizes entry timing with arrows.

4. Simple and easy to understand strategy logic.

## Risk Analysis

This strategy has the following risks:

1. Blindly following Supertrend without other auxiliary indicators and money management may lead to huge drawdowns.

2. No stop loss set, unable to control single loss.

3. Signals may lag, unable to enter in time around turning points. 

4. Improper parameter settings may cause Supertrend channel to be too wide or too narrow.

Risk Management Measures:

1. Combine with other indicators like MACD, KDJ for effectiveness validation, avoid blind following.

2. Set reasonable stop loss to maximize control over single loss.

3. Adjust parameters to make Supertrend channel reasonable, prevent too wide or too narrow.

## Optimization Directions

This strategy can be optimized in the following aspects:

1. Add auxiliary indicators for effectiveness validation to prevent failure. For example, MACD indicator can be considered.

2. Set reasonable stop loss logic. Can set percentage stop loss based on ATR.

3. Optimize hyperparameters Factor and Pd to find best parameter combinations. For example, traversal methods can be used to find optimal parameters.  

4. Optimize entry timing to avoid signal lag. For example, momentum indicators can be introduced to adjust entry timing based on strength and weakness.

5. Add position sizing strategies. For example, fixed fractional position sizing can be adopted. 

## Conclusion

This strategy uses Supertrend indicator to determine price trend and find turning points. Blindly following Supertrend without auxiliary indicators and stop loss means brings huge risks. We proposed improvements in aspects like risk management, stop loss strategies, parameter optimization, entry timing, etc, which can significantly enhance the stability and profitability of the strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Factor|
|v_input_2|7|Pd|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-06 00:00:00
end: 2023-12-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Supertrend blind follow", overlay=true)

Factor=input(3, minval=1,maxval = 100)
Pd=input(7, minval=1,maxval = 100)


Up=hl2-(Factor*atr(Pd))
Dn=hl2+(Factor*atr(Pd))


TrendUp=close[1]>TrendUp[1]? max(Up,TrendUp[1]) : Up
TrendDown=close[1]<TrendDown[1]? min(Dn,TrendDown[1]) : Dn

Trend = close > TrendDown[1] ? 1: close< TrendUp[1]? -1: nz(Trend[1],1)
Tsl = Trend==1? TrendUp: TrendDown

linecolor = Trend == 1 ? green : red

plot(Tsl, color = linecolor , style = line , linewidth = 2,title = "SuperTrend")

plotshape(cross(close,Tsl) and close>Tsl , "Up Arrow", shape.triangleup,location.belowbar,green,0,0)
plotshape(cross(Tsl,close) and close<Tsl , "Down Arrow", shape.triangledown , location.abovebar, red,0,0)
//plot(Trend==1 and Trend[1]==-1,color = linecolor, style = circles, linewidth = 3,title="Trend")

plotarrow(Trend == 1 and Trend[1] == -1 ? Trend : na, title="Up Entry Arrow", colorup=lime, maxheight=60, minheight=50, transp=0)
plotarrow(Trend == -1 and Trend[1] == 1 ? Trend : na, title="Down Entry Arrow", colordown=red, maxheight=60, minheight=50, transp=0)

longCondition = cross(close,Tsl) and close>Tsl
if (longCondition)
    strategy.entry("long", strategy.long)
shortCondition = cross(Tsl,close) and close<Tsl
if (shortCondition)
    strategy.entry("short", strategy.short)


```

> Detail

https://www.fmz.com/strategy/435269

> Last Modified

2023-12-13 16:49:44
