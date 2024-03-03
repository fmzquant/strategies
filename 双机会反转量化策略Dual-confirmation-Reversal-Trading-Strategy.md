
> Name

双机会反转量化策略Dual-confirmation-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15f795a14c77dd867be.png)
[trans]

## 概述

双机会反转量化策略是一种综合运用123反转和Stochastic RSI两种策略思路的组合策略。该策略首先判断价格是否出现了123反转形态,然后结合Stochastic RSI指标再次确认反转信号,只有当两者同时发出信号时,才会开仓做多或做空。这种双重确认机制可以有效过滤误报信号,提高策略的稳定性。

## 策略原理

该策略由两部分组成:

1. 123反转

 该部分运用123形态来判断价格反转。具体逻辑是:

 - 如果收盘价低于昨日收盘价,且当前收盘价高于昨日收盘价,同时9日Slow Stochastic低于50,则做多

 - 如果收盘价高于昨日收盘价,且当前收盘价低于昨日收盘价,同时9日Fast Stochastic高于50,则做空

这样可以发现价格反转的早期信号。

2. Stochastic RSI

 该部分使用Stochastic指标对RSI进行再次分析,判断反转确认:

 - 计算RSI的值,长度为14

 - 对RSI应用Stochastic分析,长度14,获得K值

 - 计算K值的3日SMA D值

 - 如果K值超过80则看多,K值低于20则看空

只有当两部分策略同时发出信号时,才会开仓。

## 优势分析

该策略最大的优势是采用了双重确认的思路,可以有效过滤误报信号,提高稳定性。具体优势如下:

1. 123反转可以较早判断价格反转趋势

2. Stochastic RSI提供反转确认,避免错过反转点

3. 两者结合可以提高胜率,降低误报概率

4. 采用参数组合优化,可以针对不同市场调整参数

5. 程序化实现简单清晰,易于实盘应用

## 风险分析

该策略也存在一些风险需要注意:

1. 反转失败风险。市场可能出现假反转,导致亏损。

2. 参数优化风险。不合适的参数组合可能导致策略效果不佳。

3. 过优化风险。针对历史数据过度优化参数,而未来效果无法复制。

4. 交易频率过高风险。双重信号可能增加交易频率,导致滑点成本升高。

5. 代码实现风险。代码存在错漏可能导致实盘效果异常。

对应解决方法:

1. 适当调整仓位规模,控制单笔亏损。

2. 采用walk-forward方法进行参数优化。

3. 注重参数稳定性,不追求过高收益。 

4. 适当调整开仓条件,降低交易频率。

5. 仔细测试代码,确保逻辑正确。

## 优化方向 

该策略可以从以下方面进行优化:

1. 优化参数。可以调整Stochastic等参数,针对具体市场进行优化。

2. 优化开仓条件。可以增加其他因子判断,避免冲动反转。

3. 优化止损机制。可以设定移动止损、时间止损等方式。

4. 降低交易频率。可增加交易过滤条件,降低交易频率。

5. 增加仓位管理。根据市场情况调整仓位大小。

6. 考虑手续费因素。根据实际手续费调整策略参数。

## 总结

双机会反转量化策略总体来说是一个稳定、实用的短线反转策略。它同时兼具捕捉反转的灵敏度以及双重过滤的稳定性。通过参数优化和适当修改,该策略可以成为量化策略体系中的一个有效组成部分。但我们也要注意防范过优化和误报风险,保持参数稳定性,在实盘中审慎验证。

||


## Overview

The dual-confirmation reversal trading strategy combines the 123 reversal pattern with the Stochastic RSI indicator to create a robust mean-reversion system. It provides two layers of confirmation before entering a trade, improving the strategy's accuracy and stability.

## Strategy Logic

The strategy consists of two components:

1. 123 Reversal

 It uses the 123 pattern to identify potential reversals. The logic is:

 - Long if close < previous close and current close > previous close and 9-day Slow Stochastic < 50

 - Short if close > previous close and current close < previous close and 9-day Fast Stochastic > 50

This provides an early signal for price reversals. 

2. Stochastic RSI

 It applies Stochastic indicator on RSI for additional confirmation:

 - Compute RSI with length 14 

 - Calculate Stochastic of RSI, with lengths 14, to get K

 - Take 3-day SMA of K to get D

 - If K crosses above 80, it indicates long. If K crosses below 20, it indicates short.

A trade is triggered only when both parts agree. 

## Advantage Analysis

The key advantage of this strategy is the double confirmation, which improves accuracy and reduces whipsaws. Specific benefits include:

1. 123 reversal provides early detection of trend reversal

2. Stochastic RSI confirms the reversal signal 

3. Combination improves win rate and reduces false signals

4. Parameters can be optimized for different markets

5. Simple and clean implementation for live trading

## Risk Analysis

Some risks to consider for this strategy:

1. Failed reversal risk. False reversals may cause losses.

2. Parameter optimization risk. Bad parameters lead to poor performance. 

3. Overfitting risk. Excessive optimization to historical data.

4. High trading frequency risk. More signals may increase costs.

5. Coding error risk. Bugs in implementation logic.

Possible solutions:

1. Use prudent position sizing to limit losses.

2. Employ walk-forward optimization methods.

3. Focus on parameter stability, not high returns.

4. Tune conditions to reduce trade frequency. 

5. Thoroughly test code logic.

## Enhancement Opportunities

The strategy can be improved in the following areas:

1. Parameter tuning for specific markets.

2. Adding filters to avoid hasty reversals. 

3. Incorporating stop loss mechanisms.

4. Reducing trade frequency with additional filters.

5. Implementing dynamic position sizing. 

6. Adjusting for transaction costs.

## Conclusion

The dual-confirmation reversal strategy is a stable and practical system for short-term mean-reversion. It balances the sensitivity to catch reversals and the accuracy from dual confirmation. With proper optimization and modifications, it can effectively complement a quantitative strategy portfolio. But parameters should be robust and risks like overfitting and whipsaws should be managed prudently in live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Stochastic RSI ----|
|v_input_7|80|TopBand|
|v_input_8|20|LowBand|
|v_input_9|14|lengthRSI|
|v_input_10|14|lengthStoch|
|v_input_11|3|smoothK|
|v_input_12|3|smoothD|
|v_input_13|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-14 00:00:00
end: 2023-11-13 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 03/08/2021
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
// This strategy used to calculate the Stochastic RSI
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


SRSI(lengthRSI,lengthStoch,smoothK,smoothD, TopBand,LowBand) =>
    pos = 0.0
    Source = close
    rsi1 = rsi(Source, lengthRSI)
    k = sma(stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
    d = sma(k, smoothD)
    d_cross_80 = cross(d,TopBand) 
    pos := iff(k > TopBand, 1,
              iff(k < LowBand, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Stochastic RSI", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Stochastic RSI ----")
TopBand = input(80, step=0.01)
LowBand = input(20, step=0.01)
lengthRSI = input(14, minval=1)
lengthStoch = input(14, minval=1)
smoothK = input(3, minval=1)
smoothD = input(3, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posSRSI = SRSI(lengthRSI,lengthStoch,smoothK,smoothD, TopBand,LowBand)
pos = iff(posReversal123 == 1 and posSRSI == 1 , 1,
	   iff(posReversal123 == -1 and posSRSI == -1, -1, 0)) 
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

https://www.fmz.com/strategy/432092

> Last Modified

2023-11-14 13:42:47
