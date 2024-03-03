
> Name

买盘中的均线突破策略Mean-Reversal-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

本策略的核心思想是在盘中出现短期均线向上突破时买入,以捕捉短期趋势反转机会。

### 策略原理

1. 定义买盘条件:当低点价格突破向下的短期SMA均线时
2. 买入信号:当买盘条件成立时,做多入场
3. 止损 EXIT:默认20根K线之后平仓

具体来说,该策略通过计算低价与长度为smoothness的SMA均线的交叉作为买入信号。当低价从上方向下跌破SMA均线时,产生买入信号。之后在20根K线之后无条件平仓止损。

该策略试图捕捉短期反转机会。当价格跌至一定程度后,短期SMA提供支撑,多头力量可能重新主导,价格可能反弹回升。这时买入可以获得反弹利润。

### 优势分析

1. 策略思路简单直观,容易理解实现,适合初学者
2. 利用了短期均线的支撑作用,有一定的概率捕捉到反转机会
3. 无需选择具体品种,可广泛适用于不同市场
4. 可灵活调整均线参数,适应不同周期
5. 止损清晰,可控制单笔损失

### 风险分析

1. 反转失败风险。价格突破均线后可能继续下跌而不是反弹
2. 频繁止损风险。反转次数多导致频繁止损
3. 参数优化风险。不同品种和周期需要调整参数,否则效果可能不佳
4. 交易成本风险。频繁交易会增加交易成本

可通过优化止损策略,引入趋势过滤,适当宽松持仓等方式降低上述风险。

### 优化方向 

1. 优化止损方法,以追踪价格实时变化,避免预设固定止损被套
2. 增加趋势判断,只在趋势转向时买入,避免反趋势交易
3. 考虑增加再入场机会,在反弹过程中多次加仓
4. 测试不同均线参数对效果的影响,寻找最佳参数组合
5. 评估不同品种参数效果,建立参数优化系统
6. 比较止损bars数量的影响,优化止损策略

### 总结

本策略为简单的短期反转策略,采用均线突破形态作为买入时机。优点是简单易操作,可广泛适用;缺点是容易止损,存在反转失败风险。可通过严格的止损控制单笔损失,然后优化策略规则,在趋势判断和再入场等方面进行改进,降低风险并提高效果。该策略适合熟悉基本交易策略思路的初学者进行学习和优化改进。

|| 

### Overview

The core idea of this strategy is to buy when there is an upward breakout of the short-term moving average during the session, in order to capture opportunities for short-term trend reversals.

### Strategy Logic

1. Define buy condition: When the low price breaks below the downward short-term SMA
2. Buy signal: Go long when the buy condition is met
3. Stop loss EXIT: Default exit after 20 bars 

Specifically, the strategy calculates the crossover between the low price and the SMA of length smoothness as the buy signal. When the low price breaks down from above across the SMA line, a buy signal is generated. Then it exits unconditionally after 20 bars.

The strategy attempts to capture short-term reversal opportunities. When the price falls to a certain level, the short-term SMA provides support, and the bullish forces could take over again, pushing the price to bounce back. Buying at this time could gain profits from the pullback.

### Advantage Analysis

1. The strategy idea is simple and intuitive, easy to understand and implement, suitable for beginners
2. Utilizes the support of short-term moving averages, has some probability of capturing reversal opportunities  
3. No need to select specific products, can be widely applied across different markets
4. Flexible adjustment of MA parameters to adapt to different cycles
5. Clear stop loss controls single trade loss

### Risk Analysis

1. Failed reversal risk. Price may continue to fall after breaking the MA instead of bouncing back
2. Frequent stop loss risk. High reversal frequency leads to frequent stop loss
3. Parameter optimization risk. Different products and cycles need parameter tuning, otherwise the results may be poor
4. Transaction cost risk. Frequent trading increases transaction costs

Risks can be reduced by optimizing stop loss strategy, adding trend filter, allowing loose holding position etc.

### Optimization Directions

1. Optimize stop loss methods to track price changes in real time, avoid fixed stop loss being trapped
2. Add trend judgment, only buy when the trend turns around, avoiding counter-trend trading
3. Consider adding re-entry opportunities, pyramiding during pullback
4. Test the impact of different MA parameters on results to find optimal parameter combinations
5. Evaluate parameter effectiveness across different products, build parameter optimization system
6. Compare impact of different stop loss bar quantities, optimize stop loss strategy

### Summary

This is a simple short-term mean reversal strategy, using MA breakout as entry timing. The advantages are being simple and widely applicable; the disadvantages are vulnerablility to stop loss and failed reversal risks. Risks can be managed through strict stop loss control, and the strategy can be improved by optimizing rules around trend filters, re-entry etc. It is suitable for beginners to learn and optimize such basic strategy ideas.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|Dipness|
|v_input_2|10|Smoothing|
|v_input_3|20|Exit After This Many Bars|


> Source (PineScript)

``` pinescript
//@version=3
strategy(title="Buy The Dip", shorttitle="BTFD", overlay=true)
dipness = input(title="Dipness",defval=2)
smoothness = input(title="Smoothing",defval=10,minval=0)
lookforward = input(title="Exit After This Many Bars", defval=20)

thedip = low - (atr(20) * dipness)
thedipsma = sma(thedip,smoothness)

buyCondition = crossunder(low,thedipsma)

if (buyCondition)
    strategy.entry("long", strategy.long)
    
strategy.close("long",when=buyCondition[20]) 

plot(thedipsma)
```

> Detail

https://www.fmz.com/strategy/427438

> Last Modified

2023-09-21 10:35:47
