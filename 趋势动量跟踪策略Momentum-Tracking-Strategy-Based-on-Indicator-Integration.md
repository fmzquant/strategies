
> Name

趋势动量跟踪策略Momentum-Tracking-Strategy-Based-on-Indicator-Integration

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b2945829979b0552f6.png)

[trans]


## 概述

本策略基于自定义的指标积分器,通过对价格与移动平均线距离的累积求和,判断价格趋势方向,实现趋势跟踪。

## 策略原理

该策略使用自定义指标对价格与移动平均线的距离进行累积求和,具体实现如下:

1. 计算价格相对于长度为200的简单移动平均线的距离k=close-sma(close,200)

2. 定义累积周期s=29,对最近s周期内k的值进行累积求和:sum = 0, for i = 0 to s, sum := sum + k[i]

3. 当sum>0时产生做多信号,当sum<0时产生做空信号

4. 进入做多头寸时,如果sum<0则平仓;进入做空头寸时,如果sum>0则平仓

该策略通过跟踪价格与移动平均线距离的累积和的正负来判断价格总体趋势方向,当积分和为正,认为价格处于上升趋势中,应持有多头;当积分和为负,认为价格处于下降趋势中,应持有空头。

## 策略优势

1. 使用自定义指标积分器,能够有效判断价格趋势方向

2. 采用积分思想,对价格与移动平均线距离进行累积,能够提高判断趋势的准确性

3. 相对简单的逻辑,容易理解实现,方便优化改进

4. 可以灵活调整积分周期参数,优化积分器判定趋势的灵敏度

5. 回测表现良好,收益稳定,可实际应用

## 策略风险

1. 积分周期设置不当可能导致积分器反应不灵敏,错过趋势转折点

2. 移动平均线长度设置不当,可能导致积分器误判价格趋势

3. 突发重大事件导致价格急剧变动,会使积分器产生错误信号

4. 交易品种选择不当,如选择波动率过大的品种,会使积分器效果不佳

对应风险的解决方法:

1. 优化积分周期参数,使积分器对趋势变化更敏感

2. 测试不同长度移动平均线的效果,选择能够有效判定趋势的长度

3. 在重大事件前关闭策略,避免大幅价格变动带来的错误信号

4. 选择低波动率的交易品种,使积分器效果更好

## 策略优化方向 

1. 可以考虑在积分器基础上加入其他辅助指标,如RSI等,形成综合判定

2. 可以研究不同类型移动平均线与价格距离的积分效果

3. 可以尝试自动优化积分周期参数,使其能适应不同交易品种

4. 可以加入交易量指标,避免积分器在价格剧烈震荡时产生错误信号

5. 可以通过机器学习等方法自动优化积分器参数,使策略更具鲁棒性

## 总结

本策略通过自定义指标积分器判断价格趋势方向,采用价格与移动平均线距离累积求和的方法实现对趋势的有效跟踪。策略 logic 简单清晰,回测表现良好。可以通过调整积分器参数、加入辅助指标、自动优化等方法进行改进,使策略在实盘中更稳定可靠。总体来说,该策略是一个可实际应用的量化趋势跟踪策略。

||


## Overview

This strategy is based on a custom indicator integrator to determine price trend direction by accumulating the sum of distances between price and moving average, and thus track the trend.

## Strategy Logic

The strategy uses a custom indicator to integrate the distance between price and moving average, implemented as follows:

1. Calculate the distance between price and 200-period simple moving average k=close-sma(close,200)

2. Define integration period s=29, accumulate the sum of k over last s periods: sum = 0, for i = 0 to s, sum := sum + k[i] 

3. When sum>0, long signal is generated. When sum<0, short signal is generated.

4. When long position is opened, if sum<0, close long position. When short position is opened, if sum>0, close short position.

The strategy judges overall trend direction by tracking whether the accumulated sum of distance between price and moving average is positive or negative. When the integral is positive, it indicates an upward trend and long position should be held. When the integral is negative, it indicates a downward trend and short position should be held.

## Advantages

1. The custom indicator integrator can effectively determine price trend direction.

2. The integration concept accumulates distance between price and MA, improving trend determination accuracy. 

3. Relatively simple logic, easy to understand and optimize.

4. Flexible adjustment of integration period to optimize sensitivity.

5. Good backtest results, stable profits, applicable in live trading.

## Risks

1. Improper integration period setting may cause insensitive reaction and miss trend turning points.

2. Improper MA length setting may cause misjudgment of trend.

3. Sudden big events may cause wrong signals. 

4. Improper symbol selection, highly volatile symbols may deteriorate effectiveness.

Corresponding solutions:

1. Optimize integration period for better sensitivity.

2. Test different MA lengths to find optimal one for trend determination.

3. Close strategy before major events to avoid errors from big price changes.

4. Select low volatility symbols for better performance.

## Improvement Directions

1. Consider adding other indicators like RSI for comprehensive determination.

2. Research integration results using different types of MA.

3. Try auto optimizing integration period for different symbols. 

4. Add volume indicators to avoid errors during huge price swings.

5. Use machine learning to auto optimize parameters for robustness.

## Conclusion

This strategy judges trend direction using a custom indicator integrator by accumulating the distance between price and MA. The logic is simple and clear, and backtest results are good. It can be improved by adjusting integration parameters, adding auxiliary indicators, auto optimization etc. for more reliable practical application. Overall it is an applicable quantitative trend tracking strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|170|Length for indicator|
|v_input_2|29|Length of summation|
|v_input_3|false|Take Profit|
|v_input_4|false|Stop Loss|
|v_input_5|false|Trailing Stop Loss|
|v_input_6|false|Trailing Stop Loss Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-09 00:00:00
end: 2023-10-16 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Indicator Integrator Strat",default_qty_type = strategy.percent_of_equity, default_qty_value = 100,currency="USD",initial_capital=100, overlay=true)

l = input(defval=170,title="Length for indicator")
s = input(title="Length of summation",defval=29)
a= sma(close,l)
r=roc(close,l)
k=close-a
sum = 0
for i = 0 to s
    sum := sum + k[i]
plot(a,color=yellow,linewidth=2,transp=0)
//bc =  iff( sum > 0, white, teal)
//plot(sum,color=bc, transp=20, linewidth=3,style=columns)
//plot(sma(sum,3),color=white)
//hline(0)

inpTakeProfit = input(defval = 0, title = "Take Profit", minval = 0)
inpStopLoss = input(defval = 0, title = "Stop Loss", minval = 0)
inpTrailStop = input(defval = 0, title = "Trailing Stop Loss", minval = 0)
inpTrailOffset = input(defval = 0, title = "Trailing Stop Loss Offset", minval = 0)
useTakeProfit = inpTakeProfit >= 1 ? inpTakeProfit : na
useStopLoss = inpStopLoss >= 1 ? inpStopLoss : na
useTrailStop = inpTrailStop >= 1 ? inpTrailStop : na
useTrailOffset = inpTrailOffset >= 1 ? inpTrailOffset : na


longCondition = sum>0
exitlong = sum<0

shortCondition = sum<0
exitshort = sum>0

strategy.entry(id = "Long", long=true, when = longCondition)
strategy.close(id = "Long", when = exitlong)
strategy.exit("Exit Long", from_entry = "Long", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset, when=exitlong)

strategy.entry(id = "Short", long=false, when = shortCondition)
strategy.close(id = "Short", when = exitshort)
strategy.exit("Exit Short", from_entry = "Short", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset, when=exitshort)
```

> Detail

https://www.fmz.com/strategy/429484

> Last Modified

2023-10-17 15:26:49
