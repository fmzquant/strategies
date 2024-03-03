
> Name

双重动量指数与反转复合策略Double-Momentum-Index-and-Reversal-Hybrid-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12b8075cd07a74b1683.png)
[trans]
### 概述

双重动量指数与反转复合策略是一个结合反转策略与动量策略的复合策略。它综合运用了123反转策略与商品选择指数(CSI)两个子策略,根据双重信号判断入场时机。该策略旨在提高交易信号的准确性。

### 策略原理

该策略由两个子策略组成:

1. 123反转策略。它在连续两天收盘价上涨且stoch指标低于50时做多;连续两天收盘价下跌且stoch指标高于50时做空。属于反转型策略。

2. 商品选择指数(CSI)策略。它结合平均真实价格范围指标(ATR)与平均方向运动指标(ADX)。ATR反映市场波动性,ADX反映趋势强度。CSI值越高,表示市场趋势性与波动性越强。属于动量追踪型策略。

整个策略以123反转策略为主体,CSI策略为辅助confirmation。只有当两者信号一致时才发出交易信号。做多时,连续两天收盘价上涨且stoch低于50,同时CSI上穿其移动平均线;做空时,连续两天收盘价下跌且stoch高于50,同时CSI下穿其移动平均线。

这样既保证了交易信号的反转属性,同时加入CSI指标过滤可以减少假信号。

### 优势分析

该策略具有以下优势:

1. 结合反转与动量,提高信号准确性。123反转策略作为主信号,可捕捉到突发的剧烈行情反转。CSI指标作为副确认,可过滤掉部分噪音。

2. 采用复合过滤,可大幅降低净持仓。即使子策略本身存在一定假信号比例,但最终信号必须双重一致,则可过滤掉大部分假信号,从而最大限度减少不必要的反复开平仓。

3. 子策略参数可单独优化。123反转策略和CSI策略各自的参数可分别测试和优化,而不会互相干扰。这为寻找最佳参数组合提供了便利。

4. 可单独启用子策略。该策略支持只使用123反转策略或CSI策略单独交易。这提供了策略的灵活性。

### 风险分析

尽管该策略通过复合过滤大幅降低了假信号,但仍存在以下主要风险:

1. 策略信号产生频率相对较低。采用双重确认方式,必然会过滤掉一定比例的交易机会。这是实现高胜率的必然付出。

2. 若两个子策略参数不当,可能造成信号稀少甚至没有信号。需要对参数进行严格的测试与优化,找到最佳参数组合。

3. 123反转属于逆市操作。若行情出现连续和剧烈的单边价格突破,则该策略将面临较大的风险。可考虑加入止损来控制风险。

### 优化方向

该策略的主要优化空间在以下几个方面:

1. 优化每个子策略内在的参数,找到最佳参数组合。包括stoch指标参数、CSI指标参数等。

2. 测试加入不同市场状态过滤器。如只在趋势盛行时使用CSI策略,只在震荡市场使用123反转策略等。这可在一定程度上克服子策略的劣势。

3. 开发参数自适应和动态优化模块。允许策略根据实时市场状态和统计数据自动调整参数,实时追踪最优参数组合。

4. 测试不同的止损机制。适当的止损既可有效控制风险,也可减少不必要的反复开平仓。

### 总结

双重动量指数与反转复合策略运用多信号确认和组合思路,有效利用了反转策略和动量策略各自的优势,同时通过互相过滤缓解了双方的劣势,实现高效率和高稳定性。它是一个可供选用的典型量化策略之一。

||

### Overview

The Double Momentum Index and Reversal Hybrid Strategy is a composite strategy combining reversal and momentum strategies. It integrates the 123 Reversal Strategy and the Commodity Selection Index (CSI) as sub-strategies to determine entry signals based on dual confirmation. The strategy aims to improve the accuracy of trading signals.  

### Strategy Logic   

The strategy consists of two sub-strategies:   

1. 123 Reversal Strategy. It goes long when the closing price rises for two consecutive days and Stoch is below 50; it goes short when the closing price falls for two consecutive days and Stoch is above 50. It’s a reversal-type strategy.  

2. Commodity Selection Index (CSI) Strategy. It combines the Average True Range (ATR) and the Average Directional Movement Index (ADX). ATR reflects market volatility and ADX reflects trend strength. The higher the CSI value, the stronger the market trend and volatility. It’s a momentum tracking strategy.   

The whole strategy takes the 123 Reversal strategy as the main body and CSI as an assistant confirmation. Trading signals are generated only when the signals of both strategies are consistent. It goes long when the closing price rises for two consecutive days and Stoch is below 50, and at the same time when CSI crosses above its moving average; it goes short when the closing price falls for two consecutive days and Stoch is above 50, and at the same time when CSI crosses below its moving average.  

This ensures the reversal attribute of trading signals, while adding CSI to filter can reduce false signals.  

### Advantages  

The strategy has the following advantages:  

1. Combining reversal and momentum improves signal accuracy. The 123 Reversal as the main signal can capture sudden and violent reversals. CSI as confirmation can filter out some noise.  

2. Adopting composite filtering can greatly reduce net positions. Even if the sub-strategies themselves have some false signals, the final signal must be double confirmed, which can filter out most false signals and minimize unnecessary opening and closing of positions.
  
3. The parameters of sub-strategies can be optimized separately without interference with each other. This facilitates finding the optimal parameter combination.  

4. Sub-strategies can be enabled separately. The strategy supports using only 123 Reversal or CSI for trading alone. This provides flexibility.

### Risk Analysis   

Although the strategy significantly reduces false signals through composite filtering, there are still the following main risks:  

1. The frequency of strategy signal generation is relatively low. By adopting double confirmation, a certain proportion of trading opportunities will inevitably be filtered out. This is the inevitable cost to achieve high win rate.  

2. If the parameters of the two sub-strategies are improper, it may result in rare or even no signals. Strict testing and optimization of the parameters are needed to find the optimal parameter combination.  

3. 123 Reversal belongs to counter-trend operations. In case of consecutive and violent one-way price breakthroughs, the strategy will face greater risks. It’s advisable to add in stop loss to control risk.  

### Optimization Direction  

The main optimization possibilities of this strategy are in the following areas:  

1. Optimize the intrinsic parameters of each sub-strategy to find the optimal parameter combinations, including the parameters of Stoch, CSI, etc.  

2. Test adding in different market condition filters, like using CSI only when trend prevails, using 123 Reversal only in range-bound markets, etc. This can overcome the disadvantages of sub-strategies to some extent.

3. Develop parameter self-adaptation and dynamic optimization modules, allowing the strategy to automatically adjust parameters and track optimal parameter combinations according to market conditions and statistics in real time.
  
4. Test different stop loss mechanisms. Proper stop loss can both effectively control risks and reduce unnecessary opening and closing of positions.

### Summary  

The Double Momentum Index and Reversal Hybrid Strategy utilizes the ideas of multi-signal confirmation and combination, making good use of the respective strengths of reversal and momentum strategies, while overcoming their shortcomings by mutual filtering, to achieve high efficiency and stability. It serves as a typical quantitative strategy to be considered for adoption.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|50|PointValue|
|v_input_6|3000|Margin|
|v_input_7|10|Commission|
|v_input_8|14|LengthCSI|
|v_input_9|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-06 00:00:00
end: 2024-02-05 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 25/10/2019
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
// The Commodity Selection Index ("CSI") is a momentum indicator. It was 
// developed by Welles Wilder and is presented in his book New Concepts in 
// Technical Trading Systems. The name of the index reflects its primary purpose. 
// That is, to help select commodities suitable for short-term trading.
// A high CSI rating indicates that the commodity has strong trending and volatility 
// characteristics. The trending characteristics are brought out by the Directional 
// Movement factor in the calculation--the volatility characteristic by the Average 
// True Range factor.
// Wilder's approach is to trade commodities with high CSI values (relative to other 
// commodities). Because these commodities are highly volatile, they have the potential 
// to make the "most money in the shortest period of time." High CSI values imply 
// trending characteristics which make it easier to trade the security.
// The Commodity Selection Index is designed for short-term traders who can handle 
// the risks associated with highly volatile markets.
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

fADX(Len) =>
    up = change(high)
    down = -change(low)
    trur = rma(tr, Len)
    plus = fixnan(100 * rma(up > down and up > 0 ? up : 0, Len) / trur)
    minus = fixnan(100 * rma(down > up and down > 0 ? down : 0, Len) / trur)
    sum = plus + minus 
    100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), Len)

CSI(Length, Commission, Margin, PointValue) =>
    pos = 0.0
    K = 100 * ((PointValue / sqrt(Margin) / (150 + Commission)))
    xATR = atr(Length)
    xADX = fADX(Length)
    nADXR = (xADX + xADX[Length]) * 0.5
    xCSI = K * xATR * nADXR
    xMACSI = sma(xCSI, Length)
    pos := iff(xCSI < xMACSI, 1,
    	     iff(xCSI > xMACSI, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Strategy 123 Reversal & Commodity Selection Index", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
PointValue = input(50)
Margin = input(3000)
Commission = input(10)
LengthCSI = input(14)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posCSI = CSI(LengthCSI, Commission, Margin, PointValue)
pos = iff(posReversal123 == 1 and posCSI == 1 , 1,
	   iff(posReversal123 == -1 and posCSI == -1, -1, 0)) 
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

https://www.fmz.com/strategy/441164

> Last Modified

2024-02-06 12:22:32
