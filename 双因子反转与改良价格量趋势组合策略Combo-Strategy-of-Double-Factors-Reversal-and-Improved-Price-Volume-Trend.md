
> Name

双因子反转与改良价格量趋势组合策略Combo-Strategy-of-Double-Factors-Reversal-and-Improved-Price-Volume-Trend

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19193c9237130c25ad6.png)
 [trans]
## 概述

本策略结合双因子反转与改良价格量趋势两个子策略,以获取综合交易信号。其中双因子反转策略基于Ulf Jensen的书中P183的思路,在股票两日内收盘价反转且随机指标条件成立时产生信号。改良价格量趋势策略基于价格与成交量的联合研判,判断市场的盘整与蓄势的时机。两种策略可以互相验证,组合使用可以提高稳定性。

## 策略原理

双因子反转子策略运用两日收盘价反转原理与随机指标的多空判断。如果前一日收盘价较高而今日收盘价反转下跌,且快速随机指标低于慢速随机指标而快速随机指标高于50,则产生空头信号。如果前一日收盘较低而今日收盘反转上涨,且快速随机指标高于慢速随机指标而快速随机低于50,则产生多头信号。

改良价格量趋势策略基于价格与成交量的联合研判。计算公式为:PxVFactor = PriceFactor + Scale * CumPVT, 其中PriceFactor为价格因子,CumPVT为累积能量指标。然后计算PxVFactor的Length天简单移动平均,与当前PxVFactor值比较,判断市场趋势与力度。

组合策略综合考虑两个子策略的信号,双因子反转与改良价格量趋势同向看多或看空时,则产生相应的多空信号。

## 优势分析

- 双因子反转策略结合了价格反转与随机指标判断,可以有效识别短期 extremums,捕捉反转机会。
- 改良价格量趋势策略加入成交量因子,可以判断市场蓄势盘整的时机。
- 两种策略互相验证,可以提高稳定性,避免错误信号。
- 使用9天或14天等中短期参数,适合日内和短线操作。

## 风险及优化

- 反转策略存在被套住的风险,需要设置止损来控制风险。
- 量价策略存在增大回撤的可能,如果判断市场方向错误,则亏损扩大。
- 可以测试是否 PriceFactor 和 CumPVT 两个因子的权重是否最优,是可以做进一步优化。
- 可以测试不同天数参数下的收益回撤比,选择最优参数。

## 总结

综上所述,双因子反转与改良价格量趋势组合策略,结合了反转和趋势两个维度的研判,两者可以互相验证信号,提高稳定性。在容易被套的反转策略中增加趋势指标作为辅助判断是必要的。而加入成交量因子也很重要,可以判断市场反转与蓄势的时机。本策略使用中短期参数,适合日内与短线操作,具有一定的实盘价值。

||

## Overview

This strategy combines double factors reversal and improved price volume trend sub-strategies to generate cumulative trading signals. The double factors reversal strategy is based on Ulf Jensen's idea on Page 183 of his book, generating signals when stock prices reverse over two days and the stochastic indicator conditions are met. The improved price volume trend strategy follows the joint research of price and trading volume to judge the direction and momentum of the market. The two strategies can validate each other, and combined use can improve stability.

## Strategy Principles

The double factors reversal sub-strategy uses the two-day price reversal principle and the multiple judgment of the stochastic indicator. If the previous closing price is higher but the current closing price reverses downward, and the fast stochastic is below the slow stochastic while the fast stochastic is above 50, a short signal is generated. If the previous closing price is lower but the current closing price reverses upward, and the fast stochastic is above the slow stochastic while the fast stochastic is below 50, a long signal is generated.

The improved price volume trend strategy is based on the joint research of price and trading volume. The calculation formula is: PxVFactor = PriceFactor + Scale * CumPVT, where PriceFactor is the price factor, and CumPVT is the accumulated power indicator. Then calculate the Length-day simple moving average of PxVFactor and compare it with the current PxVFactor value to determine the market trend and momentum.

The combo strategy comprehensively considers the signals of the two sub-strategies. When the double factors reversal and the improved price volume trend are bullish or bearish, corresponding long and short signals are generated.

## Advantage Analysis  

- The double factors reversal strategy combines price reversal and stochastic indicator judgment, which can effectively identify short-term extremums and capture reversal opportunities.
- The improved price volume trend strategy incorporates the trading volume factor to judge the momentum and consolidation of the market.
- The two strategies verify each other to improve stability and avoid wrong signals.
- Using medium-term parameters of 9 or 14 days is suitable for intraday and short-term operations.

## Risk and Optimization

- Reversal strategies carry the risk of being trapped, requiring stop loss to control risk.
- Volume price strategies may increase drawdowns if the market direction is incorrectly judged.
- It can be tested whether the weights of the PriceFactor and CumPVT factors are optimal for further optimization.
- Parameters of different days can be tested for the best return to drawdown ratio.

## Conclusion

In conclusion, the combo strategy of double factors reversal and improved price volume trend combines the judgments of reversal and trend in two dimensions. The two can verify signals from each other to improve stability. Adding a trend indicator as an auxiliary judgment is necessary in reversal strategies where it’s easy to be trapped. And incorporating trading volume factors is also essential to determine market reversals and momentum. This strategy uses medium-term parameters suitable for intraday and short-term operations, with certain practical value.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Price-Volume Trend ----|
|v_input_7|true|LevelPVT|
|v_input_8|true|Scale|
|v_input_9|23|LengthPVT|
|v_input_10|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-17 00:00:00
end: 2024-01-24 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 23/02/2021
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
//  The related article is copyrighted material from
//  Stocks & Commodities.
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


MPVT(Level,Scale,Length) =>
    pos = 0.0
    xCumPVT = 0.0
    xOHLC4 = ohlc4
    xV = volume
    rV = xV / 50000
    xCumPVT := nz(xCumPVT[1]) + (rV * (xOHLC4 - xOHLC4[1]) / xOHLC4[1])
    nRes = Level + Scale * xCumPVT
    xMARes = sma(nRes, Length)
    pos:= iff(nRes > xMARes, 1,
           iff(nRes < xMARes, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Modified Price-Volume Trend", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Price-Volume Trend ----")
LevelPVT = input(1)
Scale = input(1)
LengthPVT = input(23)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posMPVT = MPVT(LevelPVT,Scale,LengthPVT)
pos = iff(posReversal123 == 1 and posMPVT == 1 , 1,
	   iff(posReversal123 == -1 and posMPVT == -1, -1, 0)) 
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

https://www.fmz.com/strategy/439980

> Last Modified

2024-01-25 14:46:36
