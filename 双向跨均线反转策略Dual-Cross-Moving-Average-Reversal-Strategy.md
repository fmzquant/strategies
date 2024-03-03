
> Name

双向跨均线反转策略Dual-Cross-Moving-Average-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f071d5236b56952b57.png)
这里是我尝试根据您的要求写的文章:

[trans]

## 概述

本策略综合应用了123形态反转策略和熊力指标策略,当二者同向做多或做空信号出现时,产生交易信号,属于突破反转型交易策略。

## 策略原理

该策略由两部分组成:

1. 123形态反转策略

    当收盘价连续2日下跌后第3日收盘价突破向上,并且低位stoch指标从低位反弹时产生买入信号;当收盘价连续2日上涨后第3日收盘价突破向下,并且高位stoch指标从高位回落时产生卖出信号。

2. 熊力指标策略

    熊力指标反映多空力量对比,当指标大于设定的卖出界线时产生卖出信号,当指标小于设定的买入界线时产生买入信号。

综合信号时,若二者给出同向信号,产生实际交易信号。

## 策略优势

1. 结合反转信号和指标过滤,避免假突破,提高信号质量。

2. 多种时间周期适用,灵活应对不同市场环境。

3. 可单独使用组成部分策略,也可组合使用,策略模块化设计。

## 策略风险

1. 反转信号可能出现回调深度较大情况。

2. 熊力指标参数设置需要反复测试优化。

3. 多因子综合策略参数调优复杂,需要大量历史数据测试。

## 策略优化

1. join量化模块连接更多数据源,获取更长时间段更丰富数据。

2. 应用机器学习方法自动搜索和评估参数组合。

3. 增加止损机制以控制单笔损失。

## 总结

本策略综合运用反转技术分析和量化指标,通过双重确认提高信号质量,模块化程度高,可扩展性强,属于实用型策略。后续可通过引入更多先进技术手段进行优化,从而适应更加复杂的市场环境。

||

## Overview  

This strategy combines the 123 reversal pattern strategy and the Bear Power indicator strategy. Trading signals are generated when both give buy or sell signals in the same direction. It belongs to the breakout reversal trading strategy.

## Strategy Logic  

The strategy consists of two parts:  

1. 123 Reversal Pattern Strategy

    It generates buy signals when the closing price breaks out upward after two consecutive days of decline and the low Stoch indicator bounces back from the low level; It generates sell signals when the closing price breaks down after two consecutive days of rise and the high Stoch indicator pulls back from the high level.

2. Bear Power Indicator Strategy 

    The Bear Power indicator reflects the comparison of bullish and bearish powers. It generates sell signals when above the set sell line and generates buy signals when below the set buy line.

When combining the signals, actual trading signals are generated if the two gives signals in the same direction.

## Advantages

1. Combining reversal signals and indicator filters avoids false breakouts and improves signal quality.  

2. Applicable to multiple timeframes, flexible in adapting to different market environments.

3. The constituent strategies can be used alone or in combination, with modular design.   

## Risks  

1. Reversal signals may face large pullback depths.

2. The Bear Power indicator parameters need repetitive testing and optimization. 

3. Multi-factor integrated strategies have complex parameter tuning and require large amounts of historical data for testing.

## Optimization Directions   

1. Connect more data sources with the join Quant module to obtain longer time range and richer dataset.  

2. Apply machine learning methods to automatically search and evaluate parameter combinations.

3. Add stop loss mechanisms to control single trade loss.

## Conclusion

This strategy combines reversal technical analysis and quantitative indicators to improve signal quality through double confirmation. It has high modularity and expandability. Further optimization with advanced technologies can adapt it to more sophisticated market environments.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|30|SellLevel|
|v_input_6|3|BuyLevel|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-13 00:00:00
end: 2023-11-20 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 29/05/2019
// This is combo strategies for get 
// a cumulative signal. Result signal will return 1 if two strategies 
// is long, -1 if all strategies is short and 0 if signals of strategies is not equal.
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
//  Bear Power Indicator
//  To get more information please see "Bull And Bear Balance Indicator" 
//  by Vadim Gimelfarb. 
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

BearPower(SellLevel, BuyLevel) =>
    value =  iff (close < open ,  
              iff (close[1] > open ,  max(close - open, high - low), high - low), 
               iff (close > open, 
                 iff(close[1] > open, max(close[1] - low, high - close), max(open - low, high - close)), 
                  iff(high - close > close - low, 
                   iff (close[1] > open, max(close[1] - open, high - low), high - low), 
                     iff (high - close < close - low, 
                      iff(close > open, max(close - low, high - close),open - low), 
                       iff (close > open, max(close[1] - open, high - close),
                         iff(close[1] < open, max(open - low, high - close), high - low))))))
    pos = 0.0
    pos := iff(value > SellLevel, -1,
	   iff(value <= BuyLevel, 1, nz(pos[1], 0))) 

    pos

strategy(title="Combo Backtest 123 Reversal & Bear Power", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
SellLevel = input(30)
BuyLevel = input(3)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posBearPower = BearPower(SellLevel, BuyLevel)
pos = iff(posReversal123 == 1 and posBearPower == 1 , 1,
	   iff(posReversal123 == -1 and posBearPower == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
```

> Detail

https://www.fmz.com/strategy/432759

> Last Modified

2023-11-21 11:28:27
