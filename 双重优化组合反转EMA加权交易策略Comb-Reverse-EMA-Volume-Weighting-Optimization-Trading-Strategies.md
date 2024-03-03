
> Name

双重优化组合反转EMA加权交易策略Comb-Reverse-EMA-Volume-Weighting-Optimization-Trading-Strategies

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1516c76b6303e5370bd.png)

[trans]

### 概述

该策略是一种双重优化的组合反转EMA加权交易策略。它结合了反转策略和EMA加权策略这两种不同类型的策略,通过判断两种策略的信号是否一致,来产生更可靠的交易信号。

### 策略原理

反转部分采用123反转策略。该策略判断前两天的收盘价关系,与随机指标的组合来产生信号。具体规则是:

- 当今天的收盘价高于昨天,且昨天的收盘价低于前天;同时9日随机慢线低于50时,做多;
- 当今天的收盘价低于昨天,且昨天的收盘价高于前天;同时9日随机快线高于50时,做空。

EMA加权部分采用指数移动平均和成交量的加权计算。计算公式如下:

```
xMAVolPrice = ema(volume * close, Length)
xMAVol = ema(volume, Length)  
nRes = xMAVolPrice / xMAVol
```

具体交易规则是:当nRes指标低于/高于昨日收盘价时,做多/做空。

最后,该策略判断两个部分的信号是否一致,一致才产生实际的交易信号。

### 优势分析

该策略结合两种不同类型的策略,可以互相验证,提高信号的可靠性,降低假信号。同时,反转部分可以捕捉转折点,EMA加权部分可以跟踪趋势,两者可以达到优势互补。

### 风险分析 

该策略有一定的时间滞后,容易错过短线的交易机会。且EMA加权对价格震荡的市场效果不佳。此外,反转信号的可靠性也需要检验。

可以适当缩短参数,加快反应速度。加入止损来控制风险。引入更多因素验证反转信号。

### 优化方向

1. 测试更多的反转因素组合,找到最佳的参数。
2. 尝试不同类型的EMA加权方式。 
3. 加入止损、追踪止损。
4. 优化参数,使反应更快。

### 总结

该策略整合两种不同类型策略的优点,可以提高信号质量,在一定程度上克服单一策略的缺点。但也存在一定的滞后性,需要进一步优化。总体而言,该策略为量化交易提供了新的思路,值得进一步研究优化,抓住市场机会。

|| 

### Overview

This strategy is a double optimized combination reverse EMA weighted trading strategy. It combines reverse strategy and EMA weighted strategy, two different types of strategies, and generates more reliable trading signals by judging whether the signals of the two strategies are consistent.

### Strategy Principle 

The reversal part uses the 123 reversal strategy. This strategy combines the relationship between the closing prices of the previous two days and the stochastic oscillator to generate signals. The specific rules are:

- When today's closing price is higher than yesterday's, and yesterday's closing price is lower than the day before yesterday; at the same time, the 9-day stochastic slow line is lower than 50, go long;
- When today's closing price is lower than yesterday's, and yesterday's closing price is higher than the day before yesterday; at the same time, the 9-day stochastic fast line is higher than 50, go short.

The EMA weighted part uses the exponential moving average and volume weighted calculation. The calculation formula is as follows:

```
xMAVolPrice = ema(volume * close, Length)
xMAVol = ema(volume, Length)
nRes = xMAVolPrice / xMAVol
```

The specific trading rules are: when the nRes indicator is lower/higher than yesterday's closing price, go long/short.

Finally, the strategy judges whether the signals of the two parts are consistent before generating the actual trading signal.


### Advantage Analysis

The strategy combines two different types of strategies to verify each other and improve the reliability of signals and reduce false signals. At the same time, the reversal part can capture turning points, and the EMA weighted part can track trends to achieve complementary advantages.

### Risk Analysis

The strategy has a certain time lag and is prone to miss short-term trading opportunities. Also, the EMA weighted is not effective for oscillating markets. In addition, the reliability of reversal signals also needs to be verified.

Shorten the parameters appropriately to speed up reaction. Add stop loss to control risks. Introduce more factors to verify reversal signals.

### Optimization

1. Test more reversal factor combinations to find the optimal parameters.
2. Try different types of EMA weighting methods.
3. Add stop loss, trailing stop loss. 
4. Optimize parameters for faster response.

### Summary  

The strategy integrates the advantages of two different types of strategies, which can improve signal quality and overcome the disadvantages of a single strategy to some extent. But there is also a certain lag that needs further optimization. Overall, this strategy provides new ideas for quantitative trading and is worth further research and optimization to seize market opportunities.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|22|LengthEMA_VM|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-06 00:00:00
end: 2023-12-06 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 18/10/2019
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
// The related article is copyrighted material from Stocks & Commodities 2009 Oct 
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

fFilter(xSeriesSum, xSeriesV, Filter) =>
    iff(xSeriesV > Filter, xSeriesSum, 0)

EMA_VW(Length) =>
    pos = 0.0
    xMAVolPrice = ema(volume * close, Length)
    xMAVol = ema(volume, Length)
    nRes = xMAVolPrice / xMAVol
    pos := iff(nRes < close[1], 1,
             iff(nRes > close[1], -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & EMA & Volume Weighting", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthEMA_VM = input(22, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posEMA_VW = EMA_VW(LengthEMA_VM)
pos = iff(posReversal123 == 1 and posEMA_VW == 1 , 1,
	   iff(posReversal123 == -1 and posEMA_VW == -1, -1, 0)) 
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

https://www.fmz.com/strategy/434579

> Last Modified

2023-12-07 16:39:50
