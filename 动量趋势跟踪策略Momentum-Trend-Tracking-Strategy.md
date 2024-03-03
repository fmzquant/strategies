
> Name

动量趋势跟踪策略Momentum-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16bd1ddf5b6100c9a72.png)

[trans]

### 概述

动量趋势跟踪策略(Momentum Trend Tracking Strategy)是一个利用相对强度指数(RSI)、随机指标(Stochastic)和动量指标(Momentum)来识别趋势的策略。它综合多个指标信号,回测效果良好,适合中长线持仓。

### 策略原理

该策略首先分别计算长度为9周期的RSI、Stochastic和Momentum指标。然后把Stochastic和RSI的数值相乘,再除以Momentum,得到一个综合指标,即KNRP。该指标能够同时反映多个子指标的信息。

之后,对KNRP求长度为2的移动平均,当其上穿下穿时生成交易信号。即当平均值大于前一周期时做多,小于前一周期时做空。该信号反映了KNRP指标的短期趋势。

### 优势分析

该策略最大的优势是指标设计合理,有效地结合了多种技术指标的信息,能够准确判断趋势的走向。相比单一指标,它减少了错误信号的概率,提高了信号的可靠性。

另外,该策略判断趋势的主要依据是KNRP的移动平均,避免了追高杀跌的风险,符合趋势交易的理念。此外,参数设置灵活,用户可以根据自己的风格进行调整。

### 风险分析

该策略主要的风险在于多指标组合本身。如果组合方式不当,不同指标之间可能会出现冲突。这会增加错误信号,影响策略表现。此外,参数设置不当也会对结果产生较大影响。

为降低风险,建议优化参数,测试不同长度和组合方式的参数对策略指标和整体回测结果的影响。另外也需要关注长期行情对参数稳定性的影响。

### 优化方向

该策略主要可以从以下几个方面进行优化:

1. 测试更多种类的技术指标的组合,寻找更有效判断趋势的方式

2. 对指标参数进行优化,找到对现有市场环境更适合的数值

3. 添加止损、止盈逻辑,以锁定利润、减少亏损

4. 在更长的时间周期如日线或周线上测试,评估作为中长线策略的效果

5. 添加仓位管理模块,根据市场情况调整仓位

### 总结

动量趋势跟踪策略整体来说是一种较为稳定可靠的趋势策略。它解决了单一指标易受假信号影响的缺点,通过加权多指标有效判断趋势。参数设置灵活、优化空间较大,适合技术指标 traders。如果进一步完善,该策略有望成为一个值得长期持有的量化策略。

||

### Overview

The Momentum Trend Tracking Strategy is a strategy that uses Relative Strength Index (RSI), Stochastic and Momentum indicators to identify trends. It combines signals from multiple indicators with good backtesting results and is suitable for medium-to-long-term holding.  

### Strategy Logic

The strategy first calculates the 9-period RSI, Stochastic and Momentum indicators respectively. Then multiply the Stochastic by the RSI and divide by the Momentum to get a combined indicator called KNRP. This indicator reflects information from multiple sub-indicators simultaneously.

After that, a 2-period moving average of KNRP is calculated. Trading signals are generated when this moving average crosses above or below its previous value. That is, go long when the average is greater than the previous period and go short when less than the previous period. This signal reflects the short-term trend of the KNRP indicator.

### Advantage Analysis 

The biggest advantage of this strategy is that the indicator design is reasonable and effectively combines information from multiple technical indicators to accurately determine the trend direction. Compared with a single indicator, it reduces the probability of erroneous signals and improves signal reliability.

In addition, the main basis for the strategy to determine the trend is the moving average of KNRP, which avoids the risk of chasing highs and selling lows and is in line with the concept of trend trading. Moreover, the parameters are flexible for users to adjust according to their own style.

### Risk Analysis

The main risk of this strategy lies in the combined indicator itself. If the combination method is improper, there may be conflicts between different indicators. This will increase erroneous signals and affect strategy performance. In addition, improper parameter settings can also have a greater impact on the results.

To reduce risks, it is recommended to optimize parameters and test the impacts of different parameter lengths and combinations on the strategy indicator and overall backtest results. It is also necessary to pay attention to the impact of long-term market conditions on parameter stability.

### Optimization Directions

The main aspects that this strategy can be optimized include:

1. Test more types of technical indicators combinations to find more effective ways to determine trends  

2. Optimize indicator parameters to find values more suitable for current market conditions

3. Add stop loss/profit taking logic to lock in profits and reduce losses

4. Test on longer time frames such as daily or weekly to evaluate performance as a medium-long term strategy

5. Add position sizing module to adjust positions based on market conditions

### Summary

The Momentum Trend Tracking Strategy is generally a relatively stable and reliable trend strategy. It solves the problem that a single indicator is prone to false signals and effectively determines the trend through weighted multiple indicators. The parameters are flexible with large optimization space, suitable for technical indicator traders. With further improvements, this strategy has the potential to become a long-term quantitative strategy worth holding.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Length_Momentum|
|v_input_2|9|Length_RSI|
|v_input_3|9|Length_Stoch|
|v_input_4|2|Length_NRP|
|v_input_5|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-28 00:00:00
end: 2024-01-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 27/07/2021
// To calculate the coordinates in which the kink of the line will cross, 
//the standard Forex instruments are used - Relative Strenght Index, Stochastic and Momentum.
//It is very easy to optimize them for the existing trading strategy: they all have very 
//flexible and easily customizable parameters. Signals to enter the market can be 2 situations:
//    Change of color of the indicator line from red to blue. At the same time, it is worth entering into the purchase;
//    Change of color of the indicator line from blue to red. In this case, it is worth entering for sale.
//The signals are extremely clear and can be used in practice even by beginners. The indicator 
//itself shows when to make deals: the user only has to accompany them and set the values 
//of Take Profit and Stop Loss. As a rule, the signal to complete trading is the approach of 
//the indicator level to the levels of the maximum or minimum of the previous time period.  
////////////////////////////////////////////////////////////
strategy(title="Kwan NRP Backtest", shorttitle="KNRP")
xPrice = open
Length_Momentum = input(9, minval=1)
Length_RSI = input(9, minval=1)
Length_Stoch = input(9, minval = 1)
Length_NRP = input(2, minval=1)
reverse = input(false, title="Trade reverse")
var xKNRP = array.new_float(1,na)
xMom = close / close[Length_Momentum] * 100
xRSI = rsi(xPrice, Length_RSI)
xStoch = stoch(xPrice, high, low, 9)
if xMom != 0 
    val=xStoch*xRSI/xMom
    array.push(xKNRP,val)  
    nz(na)
avr = 0.0    
if array.size(xKNRP) > Length_NRP
    for i = array.size(xKNRP)-Length_NRP to array.size(xKNRP)-1
	    avr+= array.get(xKNRP, i)
    nz(na)	    
avr := avr / Length_NRP	
clr = avr > avr[1] ? color.blue : color.red
pos = iff(avr > avr[1] , 1,
	   iff(avr < avr[1], -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1 ) 
    strategy.entry("Long", strategy.long)
if (possig == -1 )
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
plot(avr, color=clr, title="RMI")
```

> Detail

https://www.fmz.com/strategy/437651

> Last Modified

2024-01-04 15:28:06
