
> Name

双重反转RSI动量策略Double-Reversal-RSI-Momentum-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略通过结合123形态反转策略和RSI动量策略,实现双重信号过滤,在趋势反转点位实现高概率 entries。

## 原理解析

### 123形态反转策略

该策略来源于Ulf Jensen的《我如何在期货市场上获得三倍收益》一书第183页。其原理是在盘整阶段判断潜在的趋势反转机会。

具体来说,当收盘价连续2日高于前一日收盘价,并且9日Slow K线低于50时,做多;当收盘价连续2日低于前一日收盘价,并且9日Fast K线高于50时,做空。

所以,该策略本质上是以Stochastic指标的快慢线金叉死叉来判断潜在反转机会。

### RSI动量策略

该策略利用ROC函数计算价格变化率,再基于价格变化率构建RSI指标,从而判定动量趋势。

当RSI低于买入区时表明价格上涨动量加速,做多;当RSI高于卖出区时表明价格下跌动量加速,做空。

### 优势

- 123形态反转策略能在盘整之后判断潜在反转点位
- RSI动量策略能够有效过滤假突破
- 两种策略信号累积,形成强力的入场信号

### 风险

- 123形态容易形成头部重叠或假突破,需配合其他指标过滤
- RSI本身还是以价格为基础,无法完全避免被套
- 双重信号累积时可能会错过较好入场点位

可考虑以下几点来降低风险:

1. 调整Stochastic指标的参数,使用更长周期确定趋势
2. 调整RSI的参数,使用更低区买入和更高区卖出
3. 考虑仅使用单一信号入场

## 优化方向 

- 可测试ROC周期参数,找到对特定品种更合适的参数
- 可测试123形态判定逻辑,例如调整K线快慢线参数
- 可测试RSI区段参数,确定更适合的买入卖出区域
- 可尝试其他指标如MACD取代Stochastic
- 可测试仅使用单一策略信号的效果

## 总结

本策略通过双重反转信号的验证,能够在趋势反转前提高入场准确率。123形态判定反转机会,RSI动量指标进一步验证反转有效性。策略易于优化和调整参数,用户可以根据不同品种和交易偏好进行测试。但也应注意双重信号可能错过入场时点的风险。总体来说,该策略提供了一种有效判断反转走势的思路和框架。

|| 

## Overview

This strategy combines the 123 reversal pattern and RSI momentum strategies to filter signals for high-probability entries at trend reversal points.

## Principles

### 123 Reversal Strategy 

This strategy is from the book "How I Tripled My Money in the Futures Market" by Ulf Jensen, Page 183. It identifies potential trend reversals during consolidations.

Specifically, it goes long when the close is higher than the previous close for 2 consecutive days and the 9-period Slow K line is below 50; it goes short when the close is lower than the previous close for 2 consecutive days and the 9-period Fast K line is above 50.

So essentially it uses the stochastic indicator's golden cross and death cross to determine potential reversals.

### RSI Momentum Strategy

This strategy uses the ROC function to calculate price rate of change, and constructs a RSI indicator based on the price rate of change to determine momentum trends. 

It goes long when RSI is below the buy zone, indicating accelerating upside momentum; it goes short when RSI is above the sell zone, indicating accelerating downside momentum.

### Advantages

- 123 reversal pattern identifies potential reversal points after consolidations
- RSI momentum filters out false breakouts effectively 
- Accumulation of signals from both strategies gives high-conviction entries

### Risks

- 123 pattern prone to bull traps or false breakouts, needs filtering 
- RSI still based on price, cannot fully avoid whipsaws
- Double signal accumulation may miss better entry points

Possible ways to reduce risks:

1. Tune Stochastic parameters to use longer period to define trend
2. Adjust RSI parameters to use wider buy/sell zones
3. Consider using just one signal for entries

## Optimization Directions

- Test ROC periods to find optimal values for specific products
- Test 123 pattern logic, e.g. adjust fast/slow K lines
- Test RSI zone values to find optimal buy/sell ranges
- Try other indicators like MACD to replace Stochastic
- Test effect of using just one strategy signal

## Conclusion

This strategy improves entry accuracy at trend reversals by requiring two confirming reversal signals. 123 pattern identifies reversals and RSI momentum verifies validity. Easy to optimize parameters for different products and preferences. But beware of missing entries from dual signal accumulation. Overall an effective framework for identifying reversal trends.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- RSI based on ROC ----|
|v_input_7|20|RSILength|
|v_input_8|20|ROCLength|
|v_input_9|30|BuyZone|
|v_input_10|70|SellZone|
|v_input_11|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-26 00:00:00
end: 2023-09-25 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 17/06/2021
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
// This is the new-age indicator which is version of RSI calculated upon 
// the Rate-of-change indicator.
// The name "Relative Strength Index" is slightly misleading as the RSI 
// does not compare the relative strength of two securities, but rather 
// the internal strength of a single security. A more appropriate name 
// might be "Internal Strength Index." Relative strength charts that compare 
// two market indices, which are often referred to as Comparative Relative Strength.
// And in its turn, the Rate-of-Change ("ROC") indicator displays the difference 
// between the current price and the price x-time periods ago. The difference can 
// be displayed in either points or as a percentage. The Momentum indicator displays 
// the same information, but expresses it as a ratio.
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


RSI_ROC(RSILength,ROCLength,BuyZone,SellZone) =>
    pos = 0.0
    xPrice = close
    nRes = rsi(roc(xPrice,ROCLength),RSILength)
    pos := iff(nRes < BuyZone, -1,
	         iff(nRes > SellZone, 1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & RSI based on ROC", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- RSI based on ROC ----")
RSILength = input(20, minval=1)
ROCLength = input(20, minval=1)
BuyZone = input(30, minval=1)
SellZone = input(70, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posRSI_ROC = RSI_ROC(RSILength,ROCLength,BuyZone,SellZone)
pos = iff(posReversal123 == 1 and posRSI_ROC == 1 , 1,
	   iff(posReversal123 == -1 and posRSI_ROC == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1 ) 
    strategy.entry("Long", strategy.long)
if (possig == -1 )
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/427883

> Last Modified

2023-09-26 15:42:48
