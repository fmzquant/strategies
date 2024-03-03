
> Name

多因子融合反转追踪策略Multi-factor-Reversal-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

### 策略概述

多因子融合反转追踪策略通过整合价格反转形态以及超买超卖指标,来产生入市和出市的决策信号。该策略综合运用多种因子判断市场结构的高低点,在反转点位产生交易信号,以期捕捉中短线价格的反转机会。

### 策略原理

该策略由两大模块组成:

1、123反转形态模块

- 当出现2日价格创新高但第3日回落时,视为潜在的短期高点,做空。

- 当出现2日价格创新低但第3日反弹时,视为潜在的短期低点,做多。 

2、RSI反向工程模块

- 通过动态调整RSI的超买超卖线,来判断反转点位。

- RSI高于调整后的超买线则看空,RSI低于调整后的超卖线则看多。

最后,当两个模块的信号一致时,才会产生实际的交易指令。

该策略最大的优势在于整合多种因子判断市场的结构性高低点,过滤掉一部分单一因子下的假信号,可以提高实际交易的胜率。

### 策略优势

- 多因子组合,综合判断市场高低点

- 结合反转形态和超买超卖指标

- 有效过滤假反转信号,提高准确率 

- 回测参数可优化,适应不同市场

- 实施难度不高,可快速复制交易

### 风险提示

- 反转信号可能滞后,需要及时更新参数

- 需要防止过度交易而增加交易费用

- 仍需关注个股的基本面情况 

- 反转策略更适用于指数和热门股

### 总结

多因子融合反转追踪策略完美结合了量化工具的优势与人工分析的经验,通过考量多个角度来确定交易信号。相比单一指标策略,它可以大幅提升实际交易的稳定性和胜率。该策略值得率先在回测中进行验证优化,然后再逐步实盘,具有非常显著的实用价值。


||


### Strategy Overview 

The multi-factor reversal tracking strategy generates trading signals by incorporating price reversal patterns and overbought-oversold indicators. It synthesizes multiple factors to identify market highs and lows and produces trade signals at reversal points to capture medium-short term price reversals.

### Strategy Logic

The strategy consists of two modules:

1. 123 Reversal Pattern Module

- Go short when seeing 2-day new high but pullback on 3rd day, indicating potential short-term high. 

- Go long when seeing 2-day new low but bounce on 3rd day, indicating potential short-term low.

2. Reverse Engineered RSI Module 

- Identify reversal points by dynamically adjusting RSI overbought and oversold lines.

- Go short when RSI above adjusted overbought line, go long when RSI below adjusted oversold line.

Trading signals are only generated when both modules align. 

The biggest advantage is incorporating multiple factors to determine structural highs and lows, filtering some false signals from individual factors, and improving actual trading win rate.

### Advantages of the Strategy

- Multi-factor synthesis for comprehensive high/low identification

- Combines reversal patterns and overbought/oversold indicators

- Filters false reversals, improves accuracy

- Optimizable backtest parameters adaptable to different markets

- Easy to implement for quick replication

### Risk Warnings

- Reversal signals may lag, parameter update needed

- Prevent overtrading to avoid more commissions

- Fundamentals of individual stocks still need to be considered

- Reversal strategies more suitable for indexes and hot stocks 

### Conclusion

The multi-factor reversal tracking strategy perfectly combines the strengths of quant tools and manual analysis experience by considering multiple perspectives for trade signals. Compared to single indicator strategies, it significantly enhances actual trading stability and win rate. The strategy is worth verifying and optimizing in backtests first, then gradually implementing in live trading, with very pronounced practical value.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Reverse Engineering RSI ----|
|v_input_7|50|Value|
|v_input_8|14|WildPer|
|v_input_9|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-15 00:00:00
end: 2023-09-14 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 15/06/2021
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
// The related article is copyrighted material from
// Stocks & Commodities.
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


RE_RSI(Value,WildPer) =>
    pos = 0.0
    AUC = 0.0
    ADC = 0.0
    ExpPer = 2 * WildPer - 1
    K = 2 / (ExpPer + 1)
    AUC := iff(close > close[1], K * (close - close[1]) + (1 - K) * nz(AUC[1], 1), (1-K) * nz(AUC[1], 1))
    ADC := iff(close > close[1], (1-K) * nz(ADC[1], 1), K * (close[1] - close) + (1 - K) * nz(ADC[1], 1))
    nVal = (WildPer - 1) * (ADC * Value / (100 - Value) - AUC)
    nRes = iff(nVal >= 0, close + nVal, close + nVal * (100 - Value) / Value)
    pos:= iff(nRes > close, -1,
    	   iff(nRes < close, 1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Reverse Engineering RSI, by Giorgos Siligardos", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Reverse Engineering RSI ----")
Value = input(50, minval=1)
WildPer = input(14,minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posRE_RSI = RE_RSI(Value,WildPer)
pos = iff(posReversal123 == 1 and posRE_RSI == 1 , 1,
	   iff(posReversal123 == -1 and posRE_RSI == -1, -1, 0)) 
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

https://www.fmz.com/strategy/426904

> Last Modified

2023-12-01 14:59:14
