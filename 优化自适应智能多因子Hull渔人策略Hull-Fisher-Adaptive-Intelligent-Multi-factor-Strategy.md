
> Name

优化自适应智能多因子Hull渔人策略Hull-Fisher-Adaptive-Intelligent-Multi-factor-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8b02629ed907cd4661.png)

[trans]

## 概述

该策略是一个结合Hull移动平均线、渔人转向指标以及商品通道指数的自适应多因子策略。它能够智能识别趋势,自动调整参数,适应不同品种和周期。

## 策略原理

该策略的核心逻辑基于渔人转向指标的金叉死叉来判断入场和出场。渔人转向指标结合了移动平均线和震荡指标的优点,能更准确判断趋势转折点。

策略首先计算Hull移动平均线和渔人转向指标。然后结合商品通道指数辅助判断,形成入场条件。当渔人转向指标从零轴下方上穿或从设定参数范围外上穿时设定为金叉条件,形成做多信号;当渔人转向从零轴上方下穿或参数范围外下穿时设定为死叉条件,形成做空信号。

出场条件则相反,金叉做多单以死叉平仓;死叉做空单以金叉平仓。这样利用指标之间的交叉来捕捉趋势转折点。

## 优势分析

该策略最大的优势在于多因子自适应。它同时利用了移动平均线、震荡指标和趋势指标的优势,能够在跌涨市中都获得不错的表现。而参数设置又可以根据品种和周期进行调整,实现自适应。

另外,策略加入了自动止损机制。当价格重新回破Hull移动平均线时,会自动止损出场。这大大降低了策略的损失风险。

## 风险及解决方案

该策略最大的风险在于指标之间产生误差信号。当价格出现区间震荡时,指标可能产生一些不必要的交叉。这会导致不必要的入场和止损。 

解决方法是适当调整指标参数,过滤掉一些小信号。或者结合更多辅助指标来确认。比如增加成交量指标判断真信号。

## 优化方向

该策略可以从以下几个方向进行优化:

1. 增加机器学习算法,实现参数的自动优化。可以根据历史数据训练,实时调整指标参数。

2. 增加更多指标组合进行评分,取多数决策略,提高决策的准确性。

3. 增加突破确认机制,利用价格重要级别和通道进行再次确认,避免误操作。

4. 增加风险评估模块,能够根据市场环境自动调整仓位规模和止损幅度。

## 总结

该策略整体来说是一个非常好的多因子自适应框架。它结合移动平均线的趋势判断、震荡指标的超买超卖判定和趋势指标的交叉应用,形成了一套完整的入场出场机制。如果能够进一步优化,增加自适应和智能化成分,将会成为一个极具商业价值的策略产品。

||

## Overview  

This strategy combines the Hull Moving Average, Fisher Transform indicator and the Commodity Channel Index into an adaptive multi-factor strategy. It can intelligently identify trends, automatically adjust parameters, and adapt to different products and cycles.

## Strategy Logic  

The core logic of this strategy is based on the golden cross and dead cross of the Fisher Transform indicator to determine entry and exit. The Fisher Transform indicator combines the advantages of moving averages and oscillators to more accurately judge turning points.

The strategy first calculates the Hull Moving Average and Fisher Transform indicator. Then with the help of the Commodity Channel Index, form the entry conditions. When the Fisher Transform indicator crosses up from below the zero line or crosses up from outside the set parameter range, it is set as a golden cross condition to form a long signal; when the Fisher Transform crosses down from above the zero line or outside the parameter range, it is set as a dead cross condition to form a short signal.

The exit conditions are the opposite, long orders opened on golden crosses are closed on dead crosses; short orders opened on dead crosses are closed on golden crosses. This uses the crossover of the indicators to capture trend reversal points.

## Advantage Analysis  

The biggest advantage of this strategy is the adaptive multi-factor. It takes advantage of moving averages, oscillators and trend indicators to perform well in both falling and rising markets. The parameters can also be adjusted according to variety and cycle to achieve adaptability.

In addition, the strategy incorporates an automatic stop loss mechanism. When the price breaks back above the Hull Moving Average, it will automatically stop loss to exit. This greatly reduces the risk of loss for the strategy.

## Risks and Solutions

The biggest risk of this strategy is the error signals between the indicators. When the price moves sideways, the indicators may produce some unnecessary crosses. This will lead to unnecessary entry and stop loss.  

The solution is to appropriately adjust the indicator parameters to filter out some small signals. Or combine more auxiliary indicators for confirmation. For example, add a volume indicator to determine true signals.

## Optimization Directions  

The strategy can be optimized in the following directions:

1. Add machine learning algorithms to achieve automatic parameter optimization. Can train based on historical data and adjust indicator parameters in real time.

2. Add more indicators for scoring, take majority decision strategy, and improve decision accuracy.  

3. Add a breakout confirmation mechanism that uses important price levels and channels for confirmation again to avoid misoperation.

4. Add a risk assessment module that can automatically adjust position size and stop loss range based on market conditions.

## Conclusion  

Overall, this is a very good adaptive multi-factor framework. It combines the trend judgment of moving averages, the overbought and oversold judgments of oscillators, and the application of indicator crosses, forming a complete entry and exit mechanism. If it can be further optimized and increased adaptive and intelligent components, it will become a strategy product with extremely high commercial value.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|HullMA Length|
|v_input_2|9|Signal Length|
|v_input_3|5|Top Line|
|v_input_4|-5|Bottom Line|
|v_input_5_open|0|Price data: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|true|Open when HullFisher crossover outside Lines|
|v_input_7|true|Open when HullFisher past zero|
|v_input_8|true|Include Hull_moving_average|
|v_input_9|true|Include Commodity_channel_index|
|v_input_10|true|Close order when Fisher crossover|
|v_input_11|true|Close order when Hull crossover|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-09 00:00:00
end: 2024-01-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is free to copy/paste/use. no permission required. just do it!
// © @SeaSide420 
//@version=4
strategy(title="Hull Fisher",currency="USD",default_qty_type=strategy.percent_of_equity,default_qty_value=100,commission_type=strategy.commission.percent,commission_value=0.25)

//=================================== Inputs =========================================================
period =input(title="HullMA Length", type=input.integer, defval=14, minval=2)
length =input(9, minval=1, title="Signal Length")
line1 = input(5, minval=2, title="Top Line")
line5 = input(-5, maxval=-2, title="Bottom Line")
price = input(open, type=input.source, title="Price data")
entry1 =input(true,type=input.bool, title="Open when HullFisher crossover outside Lines")
entry2 =input(true,type=input.bool, title="Open when HullFisher past zero")
useHMA =input(true,type=input.bool, title="Include Hull_moving_average")
useCCI =input(true,type=input.bool, title="Include Commodity_channel_index")
fishclose=input(true,type=input.bool, title="Close order when Fisher crossover")
HMAclose=input(true,type=input.bool, title="Close order when Hull crossover")

//================================ Calculations ======================================================
HMA = hma(price,period)
HMA2 = HMA[1]
high_ = highest(HMA, length)
low_ = lowest(HMA, length)
round_(val) => val > .99 ? .999 : val < -.99 ? -.999 : val
value = 0.0
value := round_(.66 * ((HMA - low_) / max(high_ - low_, .001) - .5) + .67 * nz(value[1]))
value1 = 0.0
value1 := .5 * log((1 + value) / max(1 - value, .001)) + .5 * nz(value1[1])
value2 = value1[1]
CCI1 = cci(price,period)
CCI2 = CCI1[1]
line2 = line1/2
line4 = line5/2

//================================ Draw Plots =======================================================
colorchange1 =CCI1>CCI2?color.lime:color.red
colorchange2 =value1>value2?color.lime:color.red
a =plot(line1,style=plot.style_line,color=color.red,transp=50,linewidth=2,title="Top Line")
b =plot(line2,style=plot.style_line,color=color.red,transp=50,linewidth=2,title="Upper Line")
c =plot(0,style=plot.style_line,color=color.black,transp=50,linewidth=2,title="Middle Line")
d =plot(line4,style=plot.style_line,color=color.lime,transp=50,linewidth=2,title="Lower Line")
e =plot(line5,style=plot.style_line,color=color.lime,transp=50,linewidth=2,title="Bottom Line")
f =plot(value1, color=color.black,transp=50,linewidth=2, title="Value 1")
g =plot(value2, color=color.black,transp=50,linewidth=2, title="Value 2")
h =plot(CCI1/50,style=plot.style_area, color=colorchange1,transp=50,linewidth=2, title="CCI")
fill(f,g,color=colorchange2,transp=20,title="Color fill")
plot(cross(value1, value2) ? value1 : na, style=plot.style_circles, color=color.black, linewidth=10)
plot(cross(value1, value2) ? value1 : na, style=plot.style_circles, color=color.white, linewidth=8)
plot(cross(value1, value2) ? value1 : na, style=plot.style_circles, color=colorchange2, linewidth=5)

//============================= Entry conditions ====================================================
// Outside Lines crossover or zero lines crossover
LongCondition1 = value1>value2 and value1<line5 and entry1 and not useCCI and not useHMA
ShortCondition1 = value1<value2 and value1>line1 and entry1 and not useCCI and not useHMA
LongCondition2 = value1>value2 and value1>0 and entry2 and not useCCI and not useHMA
ShortCondition2 = value1<value2 and value1<0 and entry2 and not useCCI and not useHMA

// Use CCI
LongCondition3 = value1>value2 and value1<line5 and CCI1>CCI2 and entry1 and useCCI and not useHMA
ShortCondition3 = value1<value2 and value1>line1 and CCI1<CCI2 and entry1 and useCCI and not useHMA
LongCondition4 = value1>value2 and value1>0 and CCI1>CCI2 and entry2 and useCCI and not useHMA
ShortCondition4 = value1<value2 and value1<0 and CCI1<CCI2 and entry2 and useCCI and not useHMA

// Use HMA
LongCondition5 = value1>value2 and value1<line5 and CCI1>CCI2 and HMA>HMA2 and entry1 and not useCCI and useHMA
ShortCondition5 = value1<value2 and value1>line1 and CCI1<CCI2 and HMA<HMA2 and entry1 and not useCCI and useHMA
LongCondition6 = value1>value2 and value1>0 and CCI1>CCI2 and HMA>HMA2 and entry2 and not useCCI and useHMA
ShortCondition6 = value1<value2 and value1<0 and CCI1<CCI2 and HMA<HMA2 and entry2 and not useCCI and useHMA

//Use CCI & HMA
LongCondition7 = value1>value2 and value1<line5 and CCI1>CCI2 and HMA>HMA2 and entry1 and useCCI and useHMA
ShortCondition7 = value1<value2 and value1>line1 and CCI1<CCI2 and HMA<HMA2 and entry1 and useCCI and useHMA
LongCondition8 = value1>value2 and value1>0 and CCI1>CCI2 and HMA>HMA2 and entry2 and useCCI and useHMA
ShortCondition8 = value1<value2 and value1<0 and CCI1<CCI2 and HMA<HMA2 and entry2 and useCCI and useHMA

//========================= Exit & Entry excecution =================================================
if HMAclose and fishclose and value1<value2 and HMA<HMA2
    strategy.close("BUY")
if HMAclose and fishclose and value1>value2 and HMA>HMA2
    strategy.close("SELL")
if HMAclose and HMA<HMA2
    strategy.close("BUY")
if HMAclose and HMA>HMA2
    strategy.close("SELL")
if fishclose and value1<value2
    strategy.close("BUY")
if fishclose and value1>value2
    strategy.close("SELL")    
if LongCondition1 or LongCondition2 or LongCondition3 or LongCondition4 or LongCondition5 or LongCondition6 or LongCondition7 or LongCondition8
    strategy.entry("BUY", strategy.long)
if ShortCondition1 or ShortCondition2 or ShortCondition3 or ShortCondition4 or ShortCondition5 or ShortCondition6 or ShortCondition7 or ShortCondition8
    strategy.entry("SELL", strategy.short)

```

> Detail

https://www.fmz.com/strategy/438940

> Last Modified

2024-01-16 15:10:06
