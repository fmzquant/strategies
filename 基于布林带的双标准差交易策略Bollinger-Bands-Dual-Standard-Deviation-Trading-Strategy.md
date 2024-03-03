
> Name

基于布林带的双标准差交易策略Bollinger-Bands-Dual-Standard-Deviation-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/129c302fdd0715cc33e.png)
 [trans]

## 概述

该策略是基于布林带的双标准差模型设计的交易策略。它使用布林带的上下轨及一个和两个标准差作为交易信号。当价格突破布林带上轨时做多,当价格突破布林带下轨时做空。该策略同时使用一个和两个标准差作为止损位。

## 策略原理  

该策略首先计算布林带的中轨、上轨和下轨。中轨是CLOSE的SMA,上轨是中轨+2*标准差,下轨是中轨-2*标准差。当价格突破上轨时产生买入信号做多,当价格突破下轨时产生卖出信号做空。此外,策略还绘制了中轨+1个标准差和中轨-1个标准差的线。它们作为止损位使用。具体逻辑是:

1. 计算CLOSE的SMA作为布林带中轨
2. 计算CLOSE的标准差STD,并计算2*STD
3. 中轨+2*STD为布林带上轨,中轨-2*STD为布林带下轨 
4. 当价格突破上轨时做多
5. 当价格突破下轨时做空
6. 中轨+1*STD作为止损线,如果止损线被突破则平仓

## 策略优势  

1. 使用双标准差设计,对突破判断更加严格,避免错误信号
2. 采用双止损线设计,最大程度控制风险
3. 参数优化空间大,中轨周期、标准差倍数都可调整
4. 回撤可以通过调整止损位来控制

## 策略风险  

1. 布林带策略容易产生假突破,引发交易信号不准确
2. 双标准差和双止损线设定可能过于严格,导致信号少剔除机会
3. 参数设置不当可能增大策略风险
4. 回撤控制并不完善,无法有效控制极端行情下的亏损

## 策略优化方向

1. 可以考虑结合其他指标过滤布林带交易信号,避免假突破
2. 可以测试不同参数设置,优化参数以获得更好收益回撤比 
3. 可以设计动态止损机制,比如跟踪型止损或余额比例止损
4. 可以结合机器学习算法自动优化参数

## 总结

该策略整体来说是一种典型的布林带突破策略。它使用双标准差提高信号判断严格程度,并采用双止损线主动控制风险。该策略有一定的参数优化空间,通过调节中轨周期、标准差倍数等参数可以获得更好的策略表现。同时,该策略也存在布林带策略普遍面临的假突破问题。此外,止损机制也有待进一步改进和优化。

|| 

## Overview

This strategy is a trading strategy designed based on the Bollinger Bands dual standard deviation model. It uses the upper and lower rails of Bollinger Bands and one and two standard deviations as trading signals. It goes long when the price breaks through the upper rail and goes short when the price breaks through the lower rail. The strategy also uses one and two standard deviations as stop loss lines.

## Strategy Logic  

The strategy first calculates the middle rail, upper rail and lower rail of the Bollinger Bands. The middle rail is the SMA of CLOSE, the upper rail is middle rail + 2*standard deviation, and the lower rail is middle rail - 2*standard deviation. When the price breaks through the upper rail, a buy signal is generated to go long. When the price breaks through the lower rail, a sell signal is generated to go short. In addition, the strategy also plots the lines of middle rail + 1 standard deviation and middle rail - 1 standard deviation. They are used as stop loss lines. The specific logic is:

1. Calculate the SMA of CLOSE as the middle rail of Bollinger Bands  
2. Calculate the standard deviation STD of CLOSE, and calculate 2*STD
3. Middle rail + 2*STD is the upper rail of Bollinger Bands, middle rail - 2*STD is the lower rail
4. Go long when price breaks through the upper rail  
5. Go short when price breaks through the lower rail
6. Middle rail + 1*STD serves as the stop loss line. If the stop loss line is broken, close the position.

## Advantages of the Strategy  

1. The dual standard deviation design makes the breakout judgment more strict to avoid wrong signals  
2. The dual stop loss lines design maximizes risk control
3. Large parameter optimization space, the period of middle rail and the multiple of standard deviation can be adjusted  
4. The drawdown can be controlled by adjusting the stop loss level

## Risks of the Strategy

1. Bollinger Bands strategies are prone to false breakouts, leading to inaccurate trading signals  
2. The dual standard deviation and dual stop loss lines setting may be too strict, missing opportunities by filtering out too many signals
3. Improper parameter settings may increase the risk of the strategy
4. The drawdown control is not perfect enough to effectively control losses in extreme market conditions

## Optimization Directions 

1. Consider combining other indicators to filter Bollinger Bands trading signals to avoid false breakouts
2. Test different parameter settings and optimize parameters for better return/drawdown ratio
3. Design dynamic stop loss mechanisms such as trailing stop loss or equity percentage stop loss
4. Combine machine learning algorithms to automatically optimize parameters

## Conclusion

In general, this strategy is a typical Bollinger Bands breakout strategy. It uses dual standard deviations to increase the strictness of signal judgment and adopts dual stop loss lines to actively control risks. The strategy has some parameter optimization space. By adjusting parameters like middle rail period and standard deviation multiplier, better strategy performance can be obtained. At the same time, the strategy also faces the common problem of false breakouts in Bollinger Bands strategies. In addition, there is room for further improvement and optimization in the stop loss mechanism.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|34|length|
|v_input_float_1|2|mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-11 00:00:00
end: 2023-12-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// Bollinger Bands: Madrid : 14/SEP/2014 11:07 : 2.0
// This displays the traditional Bollinger Bands, the difference is 
// that the 1st and 2nd StdDev are outlined with two colors and two
// different levels, one for each Standard Deviation

strategy(shorttitle='MBB', title='Bollinger Bands', overlay=true)
src = input(close)
length = input.int(34, minval=1)
mult = input.float(2.0, minval=0.001, maxval=50)

basis = ta.sma(src, length)
dev = ta.stdev(src, length)
dev2 = mult * dev

upper1 = basis + dev
lower1 = basis - dev
upper2 = basis + dev2
lower2 = basis - dev2

colorBasis = src >= basis ? color.blue : color.orange

pBasis = plot(basis, linewidth=2, color=colorBasis)
pUpper1 = plot(upper1, color=color.new(color.blue, 0), style=plot.style_circles)
pUpper2 = plot(upper2, color=color.new(color.blue, 0))
pLower1 = plot(lower1, color=color.new(color.orange, 0), style=plot.style_circles)
pLower2 = plot(lower2, color=color.new(color.orange, 0))

fill(pBasis, pUpper2, color=color.new(color.blue, 80))
fill(pUpper1, pUpper2, color=color.new(color.blue, 80))
fill(pBasis, pLower2, color=color.new(color.orange, 80))
fill(pLower1, pLower2, color=color.new(color.orange, 80))

// Entry conditions
longCondition = ta.crossover(close, upper1)
shortCondition = ta.crossunder(close, lower1)

// Entry and exit strategy
strategy.entry("Buy", strategy.long, when=longCondition)
strategy.entry("Sell", strategy.short, when=shortCondition)

strategy.close("Buy", when=shortCondition)
strategy.close("Sell", when=longCondition)
```

> Detail

https://www.fmz.com/strategy/435767

> Last Modified

2023-12-18 17:23:42
