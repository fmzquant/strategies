
> Name

双重反转CMO量子策略Dual-Reversion-CMO-Quantum-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1cfc6dee3502b9d9ae1.png)
[trans]

## 概述

该策略是一种双重反转策略,结合了123反转指标和CMOWMA量子指标,实现价格反转信号的双重确认,具有红绿染色K线视觉效果。

## 策略原理

策略由两部分组成:

1. 123反转指标

    - 使用收盘价与昨日收盘价的大小关系判断价格上涨或下跌
    - 利用Stochastic指标的快线和慢线交叉来确认反转信号
    - 当符合条件时产生做多或做空信号

2. CMOWMA量子指标

    - 使用CMO指标测量价格动量
    - 对CMO指标进行WMA加权移动平均
    - CMO指标高于(低于)其WMA时看多(空)

两部分信号同向时进入仓位。

## 策略优势

1. 双重确认机制,可过滤假断和减少无谓头寸
2. 红绿K线染色,形成视觉效果,容易判断市场状况
3. 利用反转和动量指标的组合,整体稳定性良好
4. 简单参数设置,适合多种品种,容易实施

## 策略风险

1. 反转后可能再反转,存在尾盘风险
2. 仓位频繁切换,产生过多交易费用
3. 参数设置不当可能造成信号过多或过少
4. CMO参数需要根据品种特点调整

可以通过适当放宽反转条件、增加持仓时间、优化参数组合等方法降低风险。

## 策略优化

1. 可以测试不同Stochastic参数对效果的影响
2. 可以结合其他指标如MACD、KDJ等替代或添加确认
3. 可以测试不同CMO和WMA长度参数的优化
4. 可以尝试在特定级别添加止损止盈
5. 可以设置过滤条件,控制开仓频率

## 总结

该策略整体稳健,参数简单,容易实施,同时结合价格反转和动量指标,形成有效的双重信号过滤机制,可以过滤假信号,且K线染色效果直观。通过参数优化和风险控制,可以进一步提升策略表现。

||

## Overview

This strategy is a dual reversion strategy, combining the 123 Reversion indicator and CMOWMA quantum indicator to achieve double confirmation of price reversal signals with red and green K-line visual effects.

## Strategy Principle 

The strategy consists of two parts:

1. 123 Reversion Indicator

    - Use the closing price vs previous closing price to determine price up or down
    - Use Stochastic indicator's fast line and slow line crossovers to confirm reversal signals 
    - Generate long or short signals when conditions are met

2. CMOWMA Quantum Indicator

    - Use CMO indicator to measure price momentum
    - Apply WMA weighted moving average to CMO indicator 
    - See long (short) when CMO is above (below) its WMA

Enter positions when both parts give signals in the same direction.

## Advantages of the Strategy

1. Dual confirmation mechanism can filter false breaks and reduce unnecessary positions
2. Red and green K-line coloring generates visual effects for easily judging market conditions
3. Combination of reversal and momentum indicators provides overall stability 
4. Simple parameter settings make it suitable for various products and easy to implement

## Risks of the Strategy

1. Prices may reverse again after initial reversal, with risk of whipsaws
2. Frequent position switching generates excessive trading fees
3. Improper parameter settings may cause too many or too few signals
4. CMO parameters need adjustment based on product characteristics 

Risks can be reduced by relaxing reversal conditions, increasing holding period, optimizing parameter combinations etc.

## Optimization Directions

1. Test impacts of different Stochastic parameters 
2. Replace/add confirmations with other indicators like MACD, KDJ etc.
3. Test optimizations of different CMO and WMA lengths
4. Try adding stop loss/profit taking at certain levels
5. Set filters to control frequency of new positions

## Summary

The strategy is robust overall with simple parameters, easy to implement, combining price reversal and momentum indicators to form an effective dual-signal filtering mechanism to eliminate false signals. K-line coloring provides intuitive visuals. Further performance improvements can come from parameter optimization and risk control.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|14|LengthCMO|
|v_input_6|13|LengthWMA|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-04 00:00:00
end: 2024-01-03 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 19/08/2019
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
//    This indicator plots Chandre Momentum Oscillator and its WMA on the 
//    same chart. This indicator plots the absolute value of CMO.
//    The CMO is closely related to, yet unique from, other momentum oriented 
//    indicators such as Relative Strength Index, Stochastic, Rate-of-Change, 
//    etc. It is most closely related to Welles Wilder?s RSI, yet it differs 
//    in several ways:
//    - It uses data for both up days and down days in the numerator, thereby 
//        directly measuring momentum;
//    - The calculations are applied on unsmoothed data. Therefore, short-term 
//        extreme movements in price are not hidden. Once calculated, smoothing 
//        can be applied to the CMO, if desired;
//    - The scale is bounded between +100 and -100, thereby allowing you to clearly 
//        see changes in net momentum using the 0 level. The bounded scale also allows 
//        you to conveniently compare values across different securities.
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

CMOWMA(Length, LengthWMA) =>
    pos = 0
    xMom = abs(close - close[1])
    xSMA_mom = sma(xMom, Length)
    xMomLength = close - close[Length]
    nRes = 100 * (xMomLength / (xSMA_mom * Length))
    xWMACMO = wma(nRes, LengthWMA)
    pos := iff(nRes > xWMACMO, 1,
    	   iff(nRes <= xWMACMO, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & CMO & WMA", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthCMO = input(14, minval=1)
LengthWMA = input(13, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posCMOWMA = CMOWMA(LengthCMO, LengthWMA)
pos = iff(posReversal123 == 1 and posCMOWMA == 1 , 1,
	   iff(posReversal123 == -1 and posCMOWMA == -1, -1, 0)) 
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

https://www.fmz.com/strategy/437632

> Last Modified

2024-01-04 14:35:23
