
> Name

递归移动趋势均线结合123形态反转的组合策略Recursive-Moving-Trend-Average-Combined-with-123-Reversal-Pattern-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/182fa68f5f298504660.png)
[trans]
## 概述
本策略是将递归移动趋势均线和123形态反转这两种策略组合在一起,形成一个综合信号,以提高策略的稳定性和盈利能力。

## 原理
### 123形态反转
该部分借鉴了Ulf Jensen的《我如何在期货市场上获得三倍收益》一书中的内容。其买入信号为:近两天收盘价格上涨且9日周期的STO SLOWK值低于50时做多;卖出信号为:近两天收盘价格下跌且9日周期的STO FASTK值高于50时做空。

### 递归移动趋势均线
该部分采用了一种叫做“递归多项式拟合”的技术。其思想是利用过去几天的价格以及当天的价格来预测第二天的价格。当预测价格高于昨日实际价格时看空,反之看多。

## 优势
这种组合策略可以发挥两种策略的优势,避免单一策略的局限性。123形态反转可以在价格反转的时候捕捉较大的行情。而递归移动趋势均线则可以更准确地判断价格的走势方向。两者结合可以形成较强的综合信号。

## 风险及解决方法
- 123形态反转存在因价格短期震荡而发出错误信号的可能。可以适当调整参数以过滤噪音。
- 递归移动趋势均线对突发事件的响应可能较慢。可以考虑结合其他指标判断局部趋势。 
- 两种策略信号可能不一致。这时可考虑只在双信号发出时才开仓,或根据市场状况选择仅跟随一种信号。

## 优化方向
- 可以测试不同周期参数的组合,寻找最佳参数对
- 可以引入自动止损机制
- 可以根据不同品种、市场环境调整参数
- 可以考虑与其他策略或指标组合,形成更强大的综合系统

## 总结
本策略综合运用两种不同类型的策略,通过产生综合信号提高稳定性。同时结合两者的优势,可以在价格反转点进行捕捉,并判断价格未来走势。如果继续优化,有望产生更出色的表现。

||

## Overview
This strategy combines the Recursive Moving Trend Average and the 123 Reversal Pattern into a composite signal to improve the stability and profitability.  

## Principle  
### 123 Reversal Pattern
This part is inspired by the book "How I Tripled My Money in the Futures Market" by Ulf Jensen. It buys when the close price rises for two consecutive days and the 9-day STO SLOWK is below 50. It sells when the close price falls for two consecutive days and the 9-day STO FASTK is above 50.

### Recursive Moving Trend Average 
This technique is called "recursive polynomial fitting". It uses the prices of the past few days and today's price to predict tomorrow's price. It goes short when the predicted price is higher than yesterday's actual price, and goes long otherwise.

## Advantages
The combined strategy exploits the strengths of both strategies to avoid the limitations of a single one. The 123 Reversal Pattern can catch major trends when price reversal happens. The Recursive Moving Trend Average can judge the price movement direction more accurately. Together they form stronger composite signals.  

## Risks and Solutions
- The 123 Reversal Pattern may generate false signals due to short-term price fluctuations. Fine tuning the parameters helps filter out noise.  
- The Recursive Moving Trend Average may respond slowly to sudden events. Considering other indicators for local trends is helpful.
- The two strategies may give inconsistent signals sometimes. One solution is to open positions only when double signals emerge, or follow just one signal based on market conditions.

## Directions for Enhancement
- Test different combination of period parameters to find the optimal pair.
- Introduce auto stop-loss mechanisms. 
- Adjust parameters based on different products and market environments.  
- Consider combining with other strategies or indicators to form more robust systems.

## Conclusion
This strategy combines two different types of strategies and generates composite signals to improve stability. It exploits both their advantages to catch price reversal points and judge future price trends. Further optimizations may lead to even better performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Recursive Moving Trend Average ----|
|v_input_7|21|LengthRMTA|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 01/06/2021
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
// Taken from an article "The Yen Recused" in the December 1998 issue of TASC, 
// written by Dennis Meyers. He describes the Recursive MA in mathematical terms 
// as "recursive polynomial fit, a technique that uses a small number of past values 
// of the estimated price and today's price to predict tomorrows price."
// Red bars color - short position. Green is long.
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


RMTA(Length) =>
    pos = 0.0
    Bot = 0.0
    nRes = 0.0
    Alpha = 2 / (Length+1)
    Bot := (1-Alpha) * nz(Bot[1],close) + close
    nRes := (1-Alpha) * nz(nRes[1],close) + (Alpha*(close + Bot - nz(Bot[1], 0)))
    pos:= iff(nRes > close[1], -1,
    	     iff(nRes < close[1], 1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Recursive Moving Trend Average", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Recursive Moving Trend Average ----")
LengthRMTA = input(21, minval=3)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posRMTA = RMTA(LengthRMTA)
pos = iff(posReversal123 == 1 and posRMTA == 1 , 1,
	   iff(posReversal123 == -1 and posRMTA == -1, -1, 0)) 
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

https://www.fmz.com/strategy/442399

> Last Modified

2024-02-21 16:02:32
