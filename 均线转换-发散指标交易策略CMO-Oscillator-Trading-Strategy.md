
> Name

均线转换-发散指标交易策略CMO-Oscillator-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略基于均线转换-发散指标(CMO)进行交易判断。CMO绝对值代表价格发散程度,策略以CMO三个周期绝对值的平均值判定超买超卖,属于典型的震荡指标交易策略。

## 策略原理

该策略主要运用以下逻辑:

1. 计算CMO指数的三个不同周期绝对值
2. 对三周期CMO指数绝对值取平均
3. 当平均值高于上限阈值时,看空做空
4. 当平均值低于下限阈值时,看多做多
5. CMO指数恢复到正常水平时,平仓

CMO指数反映价格变化的动量。其绝对值大小代表价格发散程度,超过一定幅度则进入超买超卖区域。该策略利用CMO的这一特性,采取多周期均值以平滑曲线,判断超买超卖状况,属于典型的震荡交易策略。

## 策略优势

- 利用CMO指数判定超买超卖区域
- 三周期均值制造平滑曲线,可避免错误信号
- 根据CMO理论,判断超买超卖的依据较强
- 可自定义参数阈值,适应市场变化
- 易于实施的反转策略

## 策略风险及应对

- CMO指标可能发出错误信号
- 参数阈值需要不断测试和优化
- 趋势行情下持续超买超卖可能造成损失

应对方法:

1. 配合趋势指标,避免逆趋势交易
2. 优化参数,提高指标的灵敏度
3. 采用移动止损,控制单笔损失

## 策略优化方向

该策略可从以下几个维度进行扩展:

1. 增加交易量指标的确认,避免趋势反转中的假突破
2. 整合移动止损策略,优化风险管理
3. 采用机器学习等方法自动优化参数
4. 结合波动率指标调整仓位规模
5. 组合其他策略,分散风险,提高整体收益率

## 总结

该策略利用CMO判定超买超卖进行反转交易,由于采用多周期均值,可以有效平滑曲线,避免错误信号。CMO指数本身理论基础稳固,可靠判定价格发散状况。通过参数优化、止损策略等扩展,可以将其优化成一个较为稳定的震荡指标交易策略。

|| 

## Overview 

This strategy uses the Chande Momentum Oscillator (CMO) to determine overbought and oversold levels for trading signals. The absolute CMO values over 3 periods are averaged to smooth the oscillator for identifying extremes. A typical mean reversion oscillator trading strategy.

## Strategy Logic

The key logic includes:

1. Calculating absolute CMO values over 3 different periods 
2. Taking the average of 3-period absolute CMO values
3. Going short when average value exceeds upper threshold 
4. Going long when average value drops below lower threshold
5. Closing positions when CMO returns to normal range

The CMO reflects the momentum of price changes. High absolute values represent price divergence entering overbought/oversold zones. The strategy utilizes this characteristic of CMO, using a multi-period average to smooth the curve for identifying extremes.

## Advantages  

- Uses CMO to identify overbought/oversold regions
- Multi-period averaging smooths curve and avoids false signals
- Sound theoretical basis for overbought/oversold detection
- Customizable parameter thresholds to adapt  
- Simple mean reversion implementation

## Risks and Mitigations

- Potential for false CMO signals 
- Requires ongoing threshold optimization
- Sustained extremes during trends can cause losses

Mitigations:

1. Adding trend filter to avoid counter-trend trades
2. Parameter optimization for better CMO sensitivity
3. Using stops to limit losses

## Enhancement Opportunities

The strategy can be enhanced through:

1. Volume confirmation to avoid false breakouts
2. Incorporating trailing stops for better risk management
3. Auto-optimization of parameters via machine learning
4. Volatility-based position sizing 
5. Combining with other strategies to diversify and improve returns

## Conclusion

This strategy uses CMO to identify overbought/oversold for mean reversion trading. Multi-period averaging helps avoid false signals. CMO itself has sound theoretical basis for gauging divergence. Enhancements through better parameters, stops, and filters can make it a stable oscillator trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Length1|
|v_input_2|10|Length2|
|v_input_3|20|Length3|
|v_input_4|58|TopBand|
|v_input_5|5|LowBand|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-14 07:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////7////////////
//  Copyright by HPotter v1.0 21/02/2017
//    This indicator plots the absolute value of CMO averaged over three 
//    different lengths. This indicator plots a classical-looking oscillator, 
//    which is really an averaged value based on three different periods.
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="CMOabsav", shorttitle="CMOabsav")
Length1 = input(5, minval=1)
Length2 = input(10, minval=1)
Length3 = input(20, minval=1)
TopBand = input(58, minval=1)
LowBand = input(5, minval=0)
reverse = input(false, title="Trade reverse")
hline(0, color=green, linestyle=hline.style_dashed)
hline(TopBand, color=purple, linestyle=hline.style_solid)
hline(LowBand, color=red, linestyle=hline.style_solid)
xMom = close - close[1]
xMomabs = abs(close - close[1])
nSum1 = sum(xMom, Length1)
nSumAbs1 = sum(xMomabs, Length1)
nSum2 = sum(xMom, Length2)
nSumAbs2 = sum(xMomabs, Length2)
nSum3 = sum(xMom, Length3)
nSumAbs3 = sum(xMomabs, Length3)
nRes = abs(100 * (nSum1 / nSumAbs1 + nSum2 / nSumAbs2 + nSum3 / nSumAbs3 ) / 3)
pos = iff(nRes > TopBand, 1,
	     iff(nRes < LowBand, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(nRes, color=blue, title="CMOabsav")
```

> Detail

https://www.fmz.com/strategy/427300

> Last Modified

2023-09-19 21:16:26
