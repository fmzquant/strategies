
> Name

反转预判与振荡器组合策略Reversal-Prediction-and-Oscillator-Combo-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

这个策略是反转策略与振荡器策略的组合,目的是获取更可靠的交易信号。它结合了反转预判策略和Chande预测振荡器策略,当两个策略同时发出买入或卖出信号时,执行交易。

## 策略原理

1. 反转预判策略

    - 使用Stochastic oscillator指标判断超买超卖现象

    - 当价格连续两个bar收盘价格出现反转,同时Stochastic oscillator指标出现超买或超卖信号时,进行反向操作

2. Chande预测振荡器策略
    
    - 使用线性回归分析预测价格

    - 振荡器曲线等于收盘价与预测价格的差值

    - 当实际价格与预测价格出现明显偏离时,产生交易信号

3. 策略逻辑

    - 同时计算反转预判策略和Chande预测振荡器策略的信号

    - 只有当两个策略的信号一致时,即都为买入信号或卖出信号,才生成实际的交易信号

    - 通过组合滤除单一策略可能出现的假信号,提高信号的可靠性

## 策略优势分析

1. 组合多个策略,综合判断市场,可靠性更高

2. 滤除单一技术指标可能出现的假信号

3. 反转预判策略能捕捉到短期反转机会

4. Chande预测振荡器对长期趋势判断准确

5. Stochastic oscillator指标参数可调,适应性强

6. 融合多种分析方法,把握不同维度的交易机会

## 风险分析

1. 组合策略虽提高可靠性,但信号产生频率降低

2. 需同时优化各策略参数,较为复杂

3. 反转出现时间难以把握,存在亏损风险

4. 线性回归预测不适用于价格剧烈波动的市场

5. 需关注股价是否出现背离Stochastic oscillator的情况

6. 回测数据不足,实盘效果存疑问

## 策略优化方向

1. 优化Stochastic oscillator参数,缩短K线和D线周期

2. 调整线性回归周期,测试更多周期参数

3. 增加止损策略,降低单笔亏损

4. 修改开仓逻辑,等待Stochastic oscillator指标完全进入超买超卖区

5. 增加对交易品种的统计特征分析

6. 结合更多指标,如MACD等,提供更多维度判断

## 总结

该策略综合运用多种分析方法,通过组合提高信号质量,同时兼顾发现短期反转和判断大趋势两个方面,能抓住更全面的交易机会。但需关注实盘效果,适当调整参数。此策略思路可扩展到更多指标和策略的组合,也可用于指导实际交易操作。总体来说,该策略具有一定的创新性和参考价值。

|| 

## Overview

This strategy combines reversal and oscillator strategies to obtain more reliable trading signals. It incorporates the reversal prediction strategy and Chande Forecast Oscillator strategy, executing trades when both strategies generate concurrent buy or sell signals.

## Strategy Logic

1. Reversal Prediction Strategy

    - Use Stochastic oscillator to identify overbought and oversold conditions
    
    - Take counter directional trades when price closes reversal over 2 bars while Stochastic oscillator reaches overbought or oversold levels

2. Chande Forecast Oscillator Strategy

    - Use linear regression analysis to forecast prices
    
    - Oscillator plots the percentage difference between closing price and forecast price

    - Generate trading signals when actual price deviates significantly from forecast price
    
3. Strategy Rules

    - Concurrently compute signals from both strategies

    - Only generate actual trading signals when both strategies agree on buy or sell

    - Combination filters false signals from individual strategies, improving reliability
    
## Advantage Analysis 

1. Combining multiple strategies provides more robust market assessment

2. Filters out false signals that may occur in single indicators

3. Reversal strategy captures short-term reversal opportunities

4. Chande oscillator accurately judges long-term trends

5. Flexible Stochastic oscillator parameters adaptable to changing markets

6. Blends analysis techniques to capitalize on diverse trading prospects

## Risk Analysis

1. Although more reliable, combo strategies reduce signal frequency 

2. Requires complex optimization of multiple strategy parameters

3. Difficult to time reversals, risks of losses exist

4. Linear regression forecast ineffective when prices are volatile

5. Watch for price divergence from Stochastic oscillator 

6. Backtest data insufficient, live performance uncertain

## Improvement Opportunities

1. Optimize Stochastic oscillator by reducing K and D periods

2. Test more linear regression periods to find optimal

3. Add stop loss to limit losses

4. Tweak logic to await Stochastic oscillator reaches extremes

5. Analyze statistical properties of trading instruments 

6. Incorporate more indicators like MACD for robustness

## Summary

This strategy synthesizes multiple analytical techniques and improves signal quality through combination, capturing both short-term reversals and long-term trends. But live performance needs to be validated and parameters tuned accordingly. The conceptual framework can be extended to more indicators and strategies, providing practical trading guidance. Overall the strategy offers meaningful innovations and references.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|14|LengthCFO|
|v_input_6|false|Offset|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-09 00:00:00
end: 2023-10-09 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 08/08/2019
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
// The Chande Forecast Oscillator developed by Tushar Chande The Forecast 
// Oscillator plots the percentage difference between the closing price and 
// the n-period linear regression forecasted price. The oscillator is above 
// zero when the forecast price is greater than the closing price and less 
// than zero if it is below.
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

ChandeForecastOscillator(Length, Offset) =>
    pos = 0
    xLG = linreg(close, Length, Offset)
    xCFO = ((close -xLG) * 100) / close
    pos := iff(xCFO > 0, 1,
           iff(xCFO < 0, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Chande Forecast Oscillator", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthCFO = input(14, minval=1)
Offset = input(0)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posChandeForecastOscillator = ChandeForecastOscillator(LengthCFO, Offset)
pos = iff(posReversal123 == 1 and posChandeForecastOscillator == 1 , 1,
	   iff(posReversal123 == -1 and posChandeForecastOscillator == -1, -1, 0)) 
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

https://www.fmz.com/strategy/428855

> Last Modified

2023-10-10 10:39:44
