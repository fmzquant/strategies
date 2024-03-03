
> Name

威廉指标的精妙震荡器AC回测策略AC-Backtest-Strategy-of-Williams-Indicator

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/631c4cdba663e71f1f.png)
 [trans]

## 概述
本策略基于著名交易专家比尔·威廉姆斯设计的威廉指标中的精妙震荡器(Awesome Oscillator,简称AO),通过计算不同周期的中价均线的差值,形成诊断趋势和市场动量的震荡指标,并设计了相应的交易信号来指导买入卖出。

## 策略原理
该策略的核心指标是精妙震荡器(AO),其计算公式为:
AO = SMA(中价, 5日) - SMA(中价, 34日)
其中,中价定义为(最高价+最低价)/2。该公式从两个不同周期的中价SMA中抽取价格动量信息。通过计算快线SMA(5日)和慢线SMA(34日)的差值,当快线高于慢线时为买入信号,当快线低于慢线时为卖出信号。

在本策略中,为了滤波误差信号,又对AO进行了5日SMA操作。并设置了一个反转模式,可以通过反转long/short信号来实现不同的交易方向。当AO值高于之前时,视为买入机会,标记为蓝色柱状;当AO值不高于之前时,视为卖出机会,标记为红色柱状。

## 策略优势
1. 使用了中价而不是收盘价,能减少假突破对SMA的影响,提高稳定性
2. 快慢SMA结合,灵敏捕捉市场变化
3. SMA双重滤波,去除高频噪声,提高信号质量 
4. 可灵活调整参数,适应不同市场环境
5. 直观的柱状显示买卖点,易于判断操作

## 风险及解决方法
1. 需谨慎评估市场波动频率,调整参数防止过拟合
2. 震荡市场中可能出现多次误操作。可适当放宽止损范围,或减少仓位规模
3. 回测数据不可靠,实盘可能与模拟不同。建议多组合实盘验证,分批建仓

## 优化方向
1. 增加成交量指标等过滤,提高信号质量
2. 加入止损策略,控制个别损失operations
3. 优化仓位管理,根据市场波动加减仓
4. 结合其他指标判断趋势方向,防止震荡市反转

## 总结
本策略利用中价快慢SMA结构设计的精妙震荡器,对市场动量变化进行诊断,买卖信号直观明了。但可能受到震荡和反转的影响,需适当调整参数和止损策略以提高稳定性。在控制风险的前提下,该策略简单实用,值得进一步优化应用。

||


## Overview
This strategy is based on the Awesome Oscillator (AO) in the Williams Indicator designed by famous trader Bill Williams. By calculating the difference between median price SMAs of different periods, it forms an oscillating indicator to diagnose trends and market momentum and designs corresponding trading signals to guide long and short.

## Principle  
The core indicator of this strategy is the Awesome Oscillator (AO), which is calculated as:
AO = SMA(Median Price, 5 days) - SMA(Median Price, 34 days)
Where the Median Price is defined as (Highest Price + Lowest Price)/2. This formula extracts price momentum information from two SMAs of the median price over different periods. Buying signals are generated when the fast SMA (5 days) is higher than the slow SMA (34 days), and selling signals are generated when the fast SMA is lower than the slow SMA.

To filter erroneous signals, this strategy also applies a 5-day SMA operation on AO. A reverse mode is provided where reversing the long/short signals realizes different trading directions. When AO is higher than the previous value, it is considered a buying opportunity and marked as a blue bar. When AO is not higher than the previous value, it is considered a selling opportunity and marked as a red bar.


## Advantages
1. Using median price instead of close price reduces the impact of false breakouts on SMA and improves stability  
2. Fast and slow SMA combination sensitively captures market changes
3. Double SMA filtering removes high frequency noise and improves signal quality  
4. Flexible parameter adjustment adapts to different market environments 
5. Intuitive bar display of trading points for easy judgment of operations


## Risks and Solutions
1. Evaluate market volatility frequency cautiously to prevent overfitting by adjusting parameters  
2. Multiple erroneous operations may occur in oscillating markets. Relax stop loss range properly or reduce position scale
3. Unreliable backtest data, actual performance may differ from simulation. Suggest combining multi-leg actual trading and split batch positions

## Optimization Directions  
1. Increase filters like trading volume to improve signal quality
2. Incorporate stop loss strategies to control individual operation losses  
3. Optimize position management, add or reduce positions according to market volatility
4. Combine other indicators to determine trend direction to prevent oscillation reversals
   

## Conclusion
This strategy utilizes the Awesome Oscillator designed with fast and slow median price SMA structure to diagnose market momentum changes, with intuitive and clear trading signals. But it is subject to impacts of oscillation and reversal, requiring proper parameter tuning and stop loss strategies to improve stability. With effective risk control, this strategy is simple, practical and worth further optimization and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|34|Length Slow|
|v_input_2|5|Length Fast|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-11 00:00:00
end: 2023-12-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 28/12/2016
//    This indicator plots the oscillator as a histogram where blue denotes 
//    periods suited for buying and red . for selling. If the current value 
//    of AO (Awesome Oscillator) is above previous, the period is considered 
//    suited for buying and the period is marked blue. If the AO value is not 
//    above previous, the period is considered suited for selling and the 
//    indicator marks it as red.
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy("Bill Williams. Awesome Oscillator (AC)")
nLengthSlow = input(34, minval=1, title="Length Slow")
nLengthFast = input(5, minval=1, title="Length Fast")
reverse = input(false, title="Trade reverse")
xSMA1_hl2 = sma(hl2, nLengthFast)
xSMA2_hl2 = sma(hl2, nLengthSlow)
xSMA1_SMA2 = xSMA1_hl2 - xSMA2_hl2
xSMA_hl2 = sma(xSMA1_SMA2, nLengthFast)
nRes =  xSMA1_SMA2 - xSMA_hl2
cClr = nRes > nRes[1] ? blue : red
pos = iff(nRes > nRes[1], 1,
	   iff(nRes < nRes[1], -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(nRes, style=histogram, linewidth=1, color=cClr)
```

> Detail

https://www.fmz.com/strategy/435716

> Last Modified

2023-12-18 12:03:38
