
> Name

双重确认反转趋势追踪策略Dual-Confirmation-Reversal-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b09b8afa134c9939ed.png)
 [trans]
## 概述

双重确认反转趋势追踪策略融合了123形态反转策略和支撑阻力位突破策略,实现了对价格反转信号的双重确认,从而过滤掉部分噪音交易信号,提高策略胜率。

该策略主要应用于中长线交易。它在价格形成反转信号时,会同时检测是否突破关键的支撑或者阻力位,双重确认后才产生交易信号。

## 策略原理

双重确认反转趋势追踪策略由两部分组成:

1. 123形态反转策略

    通过比较前两根K线的收盘价,判断价格是否出现反转形态。再结合随机指标判定震荡度,过滤误报机会。

2. 支撑阻力位突破策略

    使用前一日的最高价、最低价和收盘价计算支撑位和阻力位。监测价格是否突破这些关键位。

当价格同时满足这两个策略的交易信号时,认为反转信号得到双重确认,产生最终的交易指令。

## 策略优势

- 双重信号确认,可靠性更高
- 反转追踪,及时捕捉转折机会
- 随机指标辅助,有效过滤假突破

## 策略风险 

- 双重确认导致少量机会被过滤
- 大趋势下的反转失败风险

可通过参数优化,调整双确认严格度,平衡策略胜率和盈利次数。

## 策略优化

- 调整 stochastic 参数,优化震荡度过滤
- 测试不同日线计算支撑阻力位 
- 增加止损策略,降低大趋势下反转风险

## 总结

双重确认反转趋势追踪策略成功结合反转形态和关键位突破的优点,在提高信号质量的同时,保证了交易次数,是一种适合中长线趋势交易的策略。参数调整和止损策略的加入,能够进一步增强策略的稳定性和实战性。

||

## Overview  

The dual confirmation reversal trend tracking strategy integrates the 123 reversal pattern strategy and the support/resistance breakout strategy to realize double confirmation of price reversal signals and filter out some noisy trading signals, thus improving the win rate of the strategy.  

It is mainly used for medium-to-long term trading. When the price forms a reversal signal, it will detect whether the key support or resistance level is broken out at the same time. Trading signals are generated only after double confirmation.  

## Strategy Principle  

The dual confirmation reversal trend tracking strategy consists of two parts:  

1. 123 reversal pattern strategy  

    By comparing the closing prices of the previous two candlesticks, determine whether the price has formed a reversal pattern. Combined with the stochastic indicator to determine the oscillation to filter out false opportunities.  

2. Support/Resistance Breakout Strategy  

    Use the highest price, lowest price and closing price of the previous day to calculate the support and resistance levels. Monitor whether the price breaks through these key levels.  

When the price meets the trading signals of both strategies at the same time, the reversal signal is considered to be double confirmed and the final trading order is generated.  

## Advantages of the Strategy  

- Higher reliability with dual signal confirmation  
- Timely capture turnaround opportunities with reversal tracking
- Effective fake breakout filtering with stochastic indicator  

## Risks of the Strategy   

- A small number of opportunities are filtered out due to dual confirmation  
- Risk of reversal failure under major trends  

Parameters can be optimized to adjust the strictness of dual confirmation and balance the win rate and number of profitable trades.

## Optimization Directions  

- Adjust stochastic parameters to optimize oscillation filtering  
- Test different timeframes for calculating support/resistance levels
- Add stop loss strategy to reduce reversal risk under major trends   

## Conclusion  

The dual confirmation reversal trend tracking strategy successfully combines the advantages of reversal patterns and key level breakouts. While improving signal quality, it also ensures the number of trades. It is a suitable strategy for medium-to-long term trend trading. The addition of parameter tuning and stop loss strategies can further enhance the stability and practicability of the strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|15|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-17 00:00:00
end: 2024-01-16 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 15/09/2020
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
// The name ‘Floor-Trader Pivot,’ came from the fact that Pivot points can 
// be calculated quickly, on the fly using price data from the previous day 
// as an input. Although time-frames of less than a day can be used, Pivots are 
// commonly plotted on the Daily Chart; using price data from the previous day’s 
// trading activity. 
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


FPP() =>
    pos = 0
    xHigh  = security(syminfo.tickerid,"D", high[1])
    xLow   = security(syminfo.tickerid,"D", low[1])
    xClose = security(syminfo.tickerid,"D", close[1])
    vPP = (xHigh+xLow+xClose) / 3
    vR1 = (vPP * 2) - xLow
    vS1 = (vPP * 2) - xHigh
    pos := iff(close > vR1, 1,
             iff(close < vS1, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Floor Pivot Points", shorttitle="Combo", overlay = true)
Length = input(15, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posFPP = FPP()
pos = iff(posReversal123 == 1 and posFPP == 1 , 1,
	   iff(posReversal123 == -1 and posFPP == -1, -1, 0)) 
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

https://www.fmz.com/strategy/439113

> Last Modified

2024-01-17 18:03:50
