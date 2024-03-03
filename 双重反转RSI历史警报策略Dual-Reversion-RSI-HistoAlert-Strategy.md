
> Name

双重反转RSI历史警报策略Dual-Reversion-RSI-HistoAlert-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1f5e2c68e545780a7eb.png)
[trans]

## 概述

双重反转RSI历史警报策略通过结合123反转策略和RSI历史警报策略,实现更准确的交易信号产生。123反转策略判断价格反转点,RSI历史警报策略判断超买超卖点。两种策略信号综合后,可以产生更可靠的交易信号。

## 策略原理

### 123反转策略

123反转策略基于该假设:股票价格反转信号往往出现在股票价格反转前2天。

具体判断规则是:

- 买入信号:前一天收盘价<前两天收盘价 且 当前收盘价>前一天收盘价 且 9日慢速K线低于50
- 卖出信号:前一天收盘价>前两天收盘价 且 当前收盘价<前一天收盘价 且 9日快速K线高于50

该策略借助股价反转前2天的价格关系判断可能的反转点。同时,K线指标滤除部分噪音信号。

### RSI历史警报策略 

RSI历史警报策略是在RSI指标的基础上进行修改:

- 将RSI值缩放到-100到100
- 当RSI值超过预设的买入/卖出警报线时,产生交易信号

该策略通过判断RSI指标的绝对值大小,提示超买超卖状态,从而产生交易信号。

## 策略优势

该策略结合两种不同类型的策略思路,可以互补优势,产生更可靠的信号。具体优势有:

1. 123反转策略擅长判断价格反转点。RSI历史警报策略擅长判断超买超卖点。两者结合可以更全面判断交易时机。
2. 123反转策略和RSI历史警报策略使用不同指标作为输入。这可以降低错误信号的概率,提高可靠性。
3. 两种策略都各有自己的优化空间,可以通过参数调整进一步提升策略效果。

## 策略风险

该策略主要面临以下风险:

1. 股价反转不一定发生。即使符合123反转策略的判断条件,价格也可能继续原趋势运行。
2. RSI指标发出虚假信号的概率较大。RSI绝对值超过警报线不一定代表真正的超买超卖状态。
3. 两种策略都可能同时发出错误信号。这时wrong direction风险会加倍。

对应解决方法是:

1. 适当调整123反转策略的参数,确保其只在比较确定的反转点发信号。
2. 调整RSI历史警报策略的警报线位置,降低虚假信号概率。
3. 增加其他指标的确认,避免wrong direction风险过大。

## 策略优化方向

该策略可以从以下几个方向进行优化:

1. 使用不同的参数组合测试123反转策略和RSI历史警报策略,找到最佳参数。
2. 增加其他指标判断,进行多因子验证,过滤掉更多假信号。例如可以引入均线指标、波动率指标等。 
3. 测试不同的持仓时间范围。现有策略使用 Momentum 持仓,可以测试优化为趋势跟踪持仓。
4. 针对长线和短线分别优化参数组合。

## 总结

双重反转RSI历史警报策略通过结合价格反转策略和超买超卖判断策略,可以产生更可靠的交易信号。相比单一策略,具有更低假信号概率、更全面判断的优点。该策略还有很大的优化空间,通过参数调整、多因子验证、持仓优化等手段,可以进一步提升策略的稳定性和盈利能力。

||

## Overview

The Dual Reversion RSI HistoAlert strategy generates more accurate trading signals by combining the 123 Reversion strategy and RSI HistoAlert strategy. The 123 Reversion strategy judges price reversal points and the RSI HistoAlert strategy judges overbought and oversold points. The integrated signals from both strategies can produce more reliable trading signals.

## Strategy Logic

### 123 Reversion Strategy 

The 123 Reversion strategy is based on the hypothesis that: price reversal signals often appear 2 days before the actual price reversal. 

The specific rules are:

- Buy signal: Previous close < 2-day ago close AND Current close > Previous close AND 9-day slow K-line below 50
- Sell signal: Previous close > 2-day ago close AND Current close < Previous close AND 9-day fast K-line above 50

It uses the price relationship 2 days before reversal to judge potential reversal points. The K-line indicators filter some noise signals.

### RSI HistoAlert Strategy

The RSI HistoAlert strategy modifies the RSI indicator:

- Scale RSI values to -100 to 100
- Generate trading signals when RSI exceeds preset buy/sell alert lines

It uses the absolute RSI value to indicate overbought/oversold states and triggers signals.

## Advantages

This strategy combines two different strategy ideas to complement strengths and generate more reliable signals:

1. 123 Reversion strategy is good at catching price reversal points. RSI HistoAlert strategy is good at catching overbought/oversold points. The combination leads to more comprehensive judgements of trading chances.  
2. The two strategies use different input indicators. This decreases the probability of false signals and improves reliability.
3. Both strategies have optimization space themselves. Further performance improvement can be achieved by parameter tuning.

## Risks

The main risks are:  

1. Price reversal is not guaranteed. Prices may continue the trend even if 123 Reversion signal rules are met.
2. RSI indicator can have a high rate of false signals. Exceeding the alert line does not always truly represent overbought/oversold status.  
3. Both strategies may give out wrong signals simultaneously. This doubles the wrong direction risks.

The solutions are:

1. Fine tune 123 Reversion parameters to ensure signals only on high probability reversal points.
2. Adjust RSI HistoAlert alert line positions to decrease false signal rates. 
3. Add other indicator confirmations to avoid excessive wrong direction risks.

## Optimization Directions 

The strategy can be optimized in aspects:

1. Test different parameter combinations of both strategies to find optimum values.  
2. Introduce more factors like MA, volatility indicators for multifactor verification to filter out more false signals.
3. Test different holding period schemes. The current strategy uses momentum holding. Trend following holding may be evaluated.   
4. Separate parameter sets for long term and short term.

## Conclusion

The Dual Reversion RSI HistoAlert strategy combines price reversal and overbought/oversold judgment strategies for more reliable trading signals compared to single strategy usage. It has lower false signal probability and more comprehensive judgement. There is also large room for optimization via parameter tuning, multifactor verification, position holding scheme etc. for further enhancing stability and profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- RSI HistoAlert ----|
|v_input_7|13|RSIPeriod|
|v_input_8|-10|BuyAlertLevel|
|v_input_9|10|SellAlertLevel|
|v_input_10|1.5|RSIHistoModify|
|v_input_11|false|Trade reverse|


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
//  Copyright by HPotter v1.0 28/06/2021
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
// This simple indicator modified RSI
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


RSI_Hist(RSIPeriod,BuyAlertLevel,SellAlertLevel,RSIHistoModify) =>
    pos = 0.0
    xPrice = close
    RSIMain = (rsi(xPrice, RSIPeriod) - 50) * RSIHistoModify
    pos:= iff(RSIMain > BuyAlertLevel, 1,
    	     iff(RSIMain < SellAlertLevel, -1, nz(pos[1], 0)))
    pos

strategy(title="Combo Backtest 123 Reversal & RSI HistoAlert", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- RSI HistoAlert ----")
RSIPeriod = input(13, minval=1)
BuyAlertLevel = input(-10)
SellAlertLevel = input(10)
RSIHistoModify = input(1.5)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posRSI_Hist = RSI_Hist(RSIPeriod,BuyAlertLevel,SellAlertLevel,RSIHistoModify)
pos = iff(posReversal123 == 1 and posRSI_Hist == 1 , 1,
	   iff(posReversal123 == -1 and posRSI_Hist == -1, -1, 0)) 
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

https://www.fmz.com/strategy/437673

> Last Modified

2024-01-04 17:17:24
