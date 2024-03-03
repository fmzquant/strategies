
> Name

基于随机转向因子和关键反转信号的组合反转策略Combination-Reversal-Strategy-Based-on-Stochastic-Turnaround-Factor-and-Key-Reversal-Signal

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b579bb6cced4a76514.png)
[trans]

## 概述

该策略结合了随机转向因子和关键反转信号这两种反转策略,以获取综合交易信号。首先使用随机转向因子判断价格是否出现反转迹象。然后结合关键反转信号过滤假反转,确保捕捉到真实的反转机会,降低交易风险。

## 策略原理

### 随机转向因子
该部分来源于Ulf Jensen的《我如何在期货市场上将资金翻三番》一书中介绍的反转策略。它结合了收盘价和随机指标的反转形态来判断价格走势是否出现转折。

当收盘价连续两日高于前一日的收盘价,且9日随机指标的慢线低于50时,做多。这表示价格在短期内持续上涨,但随机指标显示股票正在过度买入,预示着可能出现反转下跌的机会。

当收盘价连续两日低于前一日的收盘价,且9日随机指标的快线高于50时,做空。这表示价格在短期内持续下跌,但随机指标显示股票正在过度卖出,预示着可能出现反转上涨的机会。

### 关键反转信号
关键反转信号指一天内价格出现新的高点或低点后发生明显反转的K线形态。它常常预示着行情趋势的转变。

在牛市中,价格创新高后收盘价接近昨日的最低价位构成关键反转做多信号。
在熊市中,价格创新低后收盘价接近昨日的最高价构成关键反转做空信号。

## 策略优势

1. 结合多种指标和K线形态,提高了交易信号的准确率。

2. 基于反转理论构建,可捕捉潜在的反转机会。

3. 同时判断趋势和随机指标,可有效过滤错误信号。

4. 关键反转信号可避免假反转,降低交易风险。

## 策略风险及优化

1. 反转形态出现时,行情可能并未真正反转,存在回调风险。可以设置止损来控制风险。

2. 随机指标和价格可能发生背离,导致信号错误。可以优化随机指标的参数,或组合其他指标进行确认。

3. 该策略主要基于日内和短期K线交易,无法应对较长线的趋势行情。可以结合趋势和意识形态等方法进一步完善。


## 总结

该策略结合价格行情、随机指标和关键反转信号,以捕捉潜在的反转机会。相比单一的反转交易方法,它可以更准确地判断反转时机,过滤虚假信号。但仍需注意反转后可能出现的回调风险,以及随机指标与价格之间的背离现象。通过参数优化、止损设置及进一步与其他策略的整合,可以获得更可靠的交易策略。

||

## Overview

This strategy combines the stochastic turnaround factor and key reversal signal, two types of reversal strategies, to obtain combined trading signals. It first uses the stochastic turnaround factor to determine whether the price shows signs of reversal. It then incorporates the key reversal signal to filter out false reversals and ensure the capture of true reversal opportunities, reducing trading risk.

## Strategy Principle 

### Stochastic Turnaround Factor
This part comes from the reversal strategy introduced in Ulf Jensen's book "How I Tripled My Money in the Futures Market". It combines the reversal patterns of closing price and stochastic indicator to determine whether the price trend has reversed.  

It goes long when the closing price is higher than the previous closing price for two consecutive days and the 9-day slow stochastic line is below 50. This indicates that the price has continued to rise in the short term, but the stochastic indicator shows that the stock is excessively bought, heralding a possible reversal decline.

It goes short when the closing price is lower than the previous closing price for two consecutive days and the 9-day fast stochastic line is above 50. This indicates that the price has continued to fall in the short term, but the stochastic indicator shows that the stock is excessively sold, heralding a possible reversal rally.

### Key Reversal Signal 
The key reversal signal refers to the K-line pattern where the price hits a new high or low during the day and then reverses markedly. It often signals a change in market trends.  

In a bull market, after the price hits a new high, if the closing price is near the lowest price of the previous day, it constitutes a key reversal long signal. 
In a bear market, after the price hits a new low, if the closing price is near the highest price of the previous day, it constitutes a key reversal short signal.

## Advantages of the Strategy

1. Combining multiple indicators and K-line patterns improves the accuracy of trading signals.  

2. Built on reversal theory to capture potential reversal opportunities.  

3. Judging trends and stochastic indicators at the same time can effectively filter out wrong signals. 

4. Key reversal signals can avoid false reversals and reduce trading risks.

## Risks and Optimization 

1. When reversal patterns appear, the market may not have truly reversed, posing callback risks. Stop loss can be set to control risks.

2. Divergence may occur between the stochastic indicator and prices, resulting in wrong signals. The parameters of the stochastic indicator can be optimized or combined with other indicators for confirmation.

3. This strategy is mainly based on intraday and short-term trading and cannot cope with longer-term trending markets. Methods like trends and chart patterns can be incorporated to improve it further.

## Conclusion  

This strategy combines price action, stochastic indicator and key reversal signals to capture potential reversal opportunities. Compared to standalone reversal trading methods, it can more accurately determine the timing of reversals and filter out false signals. However, attention should still be paid to pullback risks after reversal and the divergence between stochastic and prices. More reliable trading strategies can be obtained through parameter optimization, stop loss setting and further integration with other strategies.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|true|Enter the number of bars over which to look for a new low in prices.|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-05 00:00:00
end: 2023-12-12 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 22/12/2020
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
// A key reversal is a one-day trading pattern that may signal the reversal of a trend. 
// Other frequently-used names for key reversal include "one-day reversal" and "reversal day."
// How Does a Key Reversal Work?
// Depending on which way the stock is trending, a key reversal day occurs when:
// In an uptrend -- prices hit a new high and then close near the previous day's lows.
// In a downtrend -- prices hit a new low, but close near the previous day's highs
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

KRU(nLength) =>
    pos = 0.0
    xLL = lowest(low[1], nLength)
    C1 = iff(low < xLL and close > close[1], true, false)
    pos := iff(C1, 1, 0)
    pos

strategy(title="Combo Backtest 123 Reversal & Key Reversal Up", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
nLength = input(1, minval=1, title="Enter the number of bars over which to look for a new low in prices.")
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posKRU = KRU(nLength)
pos = iff(posReversal123 == 1 and posKRU == 1 , 1,
	   iff(posReversal123 == -1 and posKRU == -1, -1, 0)) 
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

https://www.fmz.com/strategy/435288

> Last Modified

2023-12-13 17:54:34
