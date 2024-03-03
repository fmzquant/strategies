
> Name

多因子反转交易组合策略Multi-factor-Reversal-Trading-Combo-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述 

该策略通过组合使用多种反转指标,在价格出现反转信号时采取反向头寸,属于反转类算法交易策略。

## 策略原理

1. 首先使用123反转系统判断价格反转信号。该系统结合了价格连续两个Bar的关系和Stochastic指标判断反转。

2. 其次使用快慢峰度指标FSK判断市场情绪反转。该指标通过动量的加速度判断市场买卖气势的变化。

3. 将123反转系统和FSK反转指标进行组合,当两者同时发出反转信号时,采取反向头寸。

4. 可选择反向交易,当原信号为多头时采取空头,当原信号为空头时采取多头。

## 优势分析

1. 组合多个因子可以提高信号的准确率,避免单一指标的假信号。

2. 123反转系统和FSK指标具有互补性,可以捕捉不同时间维度的反转机会。

3. 反向交易可以在剧烈行情反转中获利。

4. 采用多种反转因子,可以增强策略的稳健性。

5. 容易理解和实现,适合量化交易初学者。

## 风险分析

1. 反转信号可能出现误判,导致亏损。

2. 反转时间定位不准可能导致追顶追底。

3. 反向交易在趋势持续时会亏损。

4. 参数优化不当可能导致过拟合。

5. 交易频率过高可能承担更多交易成本。

## 优化方向

1. 测试添加其他反转因子,如RSI,KD等,丰富组合。

2. 优化参数,提高指标灵敏度。

3. 添加趋势过滤,避免逆势交易。

4. 使用动态仓位管理策略,优化资金利用效率。 

5. 优化止损策略,降低单笔亏损。

6. 评估交易成本影响,降低过高频交易。

## 总结

该策略通过组合123反转系统和FSK指标,在价格反转时采取反向交易。可以过滤假信号,提高准确率。但反转策略面临着反转不确定性的风险。需要持续优化参数,并适当控制仓位规模和交易频率,降低风险,提高稳定性。

||


## Overview

This strategy combines multiple reversal indicators to take counter directional positions when price reversal signals emerge. It belongs to mean reversion algorithmic trading strategies.

## Strategy Logic

1. Firstly, the 123 reversal system is used to identify price reversal signals, based on price action of two consecutive bars and the Stochastic indicator.

2. Secondly, the Fast and Slow Kurtosis (FSK) indicator judges sentiment reversal based on momentum acceleration. 

3. The 123 reversal system and FSK reversal indicator are combined as a combo. Counter directional positions are taken when both produce reversal signals.

4. Reverse trading can be enabled, taking short when original signal is long, and vice versa.

## Advantage Analysis

1. Combining multiple factors can improve signal accuracy and avoid false signals.

2. The 123 system and FSK indicator are complementary in catching reversals across timeframes.

3. Reverse trading allows profiting from sharp reversals. 

4. Using multiple reversal factors enhances strategy robustness. 

5. Easy to understand and implement, suitable for quant trading beginners.

## Risk Analysis

1. Reversal signals may produce false signals resulting in losses.

2. Poor timing of reversals can lead to chasing tops and bottoms.

3. Reverse trading can produce losses in persistent trends.

4. Improper parameter optimization leads to overfitting. 

5. High trading frequency may incur more transaction costs.

## Optimization Directions

1. Test adding other reversal factors like RSI, KD to enrich the combo.

2. Optimize parameters for better indicator sensitivity. 

3. Add trend filter to avoid counter-trend trades.

4. Use dynamic position sizing to optimize capital efficiency.

5. Optimize stop loss to limit losses per trade. 

6. Evaluate transaction costs impact to avoid over-trading. 

## Conclusion

This strategy combines the 123 reversal system and FSK indicator to trade price reversals in counter direction. It can filter out false signals and improve accuracy. But reversal strategies face the risk of uncertain reversals. Continual parameter tuning, position sizing and trade frequency controls are needed to reduce risks and enhance robustness.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|15|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|false|Triger|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 14/10/2020
// This is combo strategies for get a cumulative signal. 
//
// First strategy
// This System was created from the Book "How I Tripled My Money In The 
// Futures Market" by Ulf Jensen, Page 183. This is reverse type of strategies.
// The strategy buys at market, if close price is higher than the previous close 
// during 2 days and the meaning of 9-days Stochastic Slow Oscillator is lower than 50. 
// The strategy sells at market, if close price is lower than the previous close price 
// during 2 days and the meaning of 9-days Stochastic Fast Oscillator is higher than 50.
//
// Second strategy
// This indicator plots the Fast & Slow Kurtosis. The Kurtosis is a market
// sentiment indicator. The Kurtosis is constructed from three different parts.
// The Kurtosis, the Fast Kurtosis(FK), and the Fast/Slow Kurtosis(FSK).
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
Reversal123(Length, KSmoothing, DLength, Level) =>
    vFast = sma(stoch(close, high, low, Length), KSmoothing) 
    vSlow = sma(vFast, DLength)
    pos = 0.0
    pos := iff(close[2] < close[1] and close > close[1] and vFast < vSlow and vFast > Level, 1,
	         iff(close[2] > close[1] and close < close[1] and vFast > vSlow and vFast < Level, -1, nz(pos[1], 0))) 
	pos

FSK(Triger) =>
    pos = 0.0
    xMOM_R = mom(mom(close, 3), 1)
    xMOM_RAvr = ema(xMOM_R, 65)
    xMOM_RWAvr = wma(xMOM_RAvr, 3)
    pos := iff(xMOM_RAvr > Triger and xMOM_RWAvr > Triger, 1,-1) 
    pos

strategy(title="Combo Backtest 123 Reversal & FSK (Fast and Slow Kurtosis)", shorttitle="Combo", overlay = true)
Length = input(15, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
Triger = input(0, minval=0.001)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posFSK = FSK(Triger)
pos = iff(posReversal123 == 1 and posFSK == 1 , 1,
	   iff(posReversal123 == -1 and posFSK == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/427381

> Last Modified

2023-09-20 15:13:58
