
> Name

反转均线包络策略123-Reversal-Moving-Average-Envelope-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/204f0d864c85de36eec.png)

[trans]

## 概述

反转均线包络策略是一种综合利用反转交易和均线包络两大技术指标的量化交易策略。它整合了反转策略捕捉市场反转机会和均线包络判断趋势方向的优势,实现稳定盈利。

## 策略原理

该策略由两部分组成:

第一部分为123反转策略。它的交易信号来自随机指标KDJ。具体逻辑是:如果收盘价连续两个交易日低于前一日收盘价,且9日随机慢线低于50,产生买入信号;如果收盘价连续两个交易日高于前一日收盘价,且9日随机快线高于50,产生卖出信号。

第二部分为均线包络策略。它利用均线和均线上下两个包络线判定趋势。具体逻辑是:如果收盘价高于上轨,产生买入信号;如果收盘价低于下轨,产生卖出信号。

该策略综合利用上述两种交易信号,当123反转和均线包络同时发出买入信号时,策略才会开仓做多;当两者同时发出卖出信号时,策略才会开仓做空。这样可以过滤掉部分无效信号,降低交易频率的同时提高盈利概率。

## 优势分析

- 结合反转和趋势,提高获利概率

    123反转策略擅长捕捉关键支撑阻力附近的反转机会。均线包络策略可准确判断趋势方向。两者结合使用,可以在高概率位置捕捉反转。
    
- 双重过滤降低交易频率

    只有当两种指标同时发出信号时,策略才会开仓。这避免了单一指标产生的过多无效信号的干扰,从而降低了交易频率,有助于减少交易成本。

- parametrizable parameters为策略提供了灵活性

    策略中的指标参数都是可调整的,用户可以根据市场情况和个人偏好,选择合适的参数组合,使策略更具适应性。

- 单边交易简化了操作

    该策略只进行多头或空头单边交易,不进行反向开仓。这简化了策略操作逻辑,降低了durations风险。

## 风险分析

- 反转交易难以捕捉趋势行情

    该策略主要依靠反转交易获利。当出现长期单边趋势行情时,策略可能产生连续亏损。

- 参数优化困难

    策略包含多个可调整的参数,这给参数优化带来一定难度。不当的参数组合可能影响策略表现。

- 高换仓频率增加交易风险

    策略设计频繁换仓,虽可锁定小利润,但过于频繁的交易也会增加交易成本和意外风险。

- 无法限制最大回撤

    策略没有设置止损点,无法有效控制最大回撤。如果遇到重大黑天鹅事件,策略可能面临巨大亏损。

## 优化方向

- 增加止损策略

    可以设置移动止损或跟踪止损来限制最大回撤。当市场出现反常变化时,及时止损可以保护资金。

- 优化参数组合

    通过回测和模拟交易优化参数,确定最佳参数组合,提高策略稳定性。也可以设计动态参数优化机制,使策略更具适应性。

- 结合其它指标过滤信号

    增加例如MACD,布林带等指标,对交易信号进行验证,可以进一步提高信号质量,减少无效交易。

- 降低交易频率

    适当放宽反转条件和调整均线参数,降低换仓频率,有助于减少交易成本和意外风险。

## 总结

反转均线包络策略综合运用反转交易和趋势跟踪的优势,在控制风险的前提下,实现稳定的超额收益。该策略可以进一步优化,使其参数组合更科学合理,从而获得更出色的交易表现。它提供了一种结合多种交易信号的有效策略思路,适用于趋势行情和盘整市场,值得量化交易者学习和运用。


|| 


## Overview

The 123 Reversal Moving Average Envelope Strategy is a quantitative trading strategy that combines 123 reversal trading techniques and moving average envelope indicators. It integrates the strengths of catching market reversal opportunities using reversals and determining trend direction with moving average envelopes, achieving steady profits.

## Strategy Logic

The strategy consists of two parts:

The first part is the 123 reversal strategy. Its trading signals come from the KDJ oscillator. Specifically, if the closing price is lower than the previous close for two consecutive trading days, and the 9-day slow K line is below 50, a buy signal is generated; if the closing price is higher than the previous close for two consecutive trading days, and the 9-day fast K line is above 50, a sell signal is generated.

The second part is the moving average envelope strategy. It uses moving averages and envelope lines above and below the moving averages to determine trends. Specifically, if the closing price is higher than the upper band, a buy signal is generated; if the closing price is lower than the lower band, a sell signal is generated.

The strategy combines the above two types of trading signals. It will only open long positions when 123 reversals and moving average envelopes both give buy signals; it will only open short positions when both give sell signals. This filters out some invalid signals and reduces trading frequency while improving profitability.

## Advantage Analysis 

- Combines reversal and trend to improve profitability

    The 123 reversal strategy excels at catching reversal opportunities near key support and resistance levels. The moving average envelope strategy accurately determines trend direction. Using both improves the probability of catching reversals at high-probability price levels.
    
- Double filter reduces trading frequency

    Trades are only taken when both indicators give signals. This avoids interference from excessive invalid signals from a single indicator and thus reduces trading frequency and costs.

- Customizable parameters provide flexibility

    The adjustable parameters allow users to tailor the strategy to market conditions and personal preferences for improved adaptability.

- One-sided trading simplifies operations

    The strategy only goes long or short, without reverse positions. This simplifies the logic and reduces risks from being whipsawed.

## Risk Analysis

- Reversals struggle in persistent trends

    The strategy relies mainly on reversals for profits. During long trending periods, it may produce continuous losses.

- Parameter optimization is difficult

    The multiple adjustable parameters pose optimization challenges. Improper parameter combinations may degrade performance. 

- High turnover increases trade risks

    Frequent position changes allow locking in small profits but also increase costs and risks from overtrading.

- No drawdown limit

    The lack of a stop loss means no limit on maximum drawdown. Black swan events could cause severe losses.

## Optimization Directions

- Add stop loss
    
    Implement a moving or trailing stop loss to limit drawdowns. Stopping out early during abnormal market moves protects capital.
    
- Optimize parameters

    Backtest and forward test to find optimum parameters for higher stability. Consider dynamic optimization for improved adaptability.

- Add signal filters

    Adding filters like MACD and Bollinger Bands can validate signals and further improve quality while reducing unwanted trades.

- Reduce trade frequency

    Modestly relaxing reversal conditions and adjusting moving average settings to lower turnover can reduce costs and risks.

## Conclusion

The 123 Reversal Moving Average Envelope Strategy combines the strengths of reversal trading and trend following for steady risk-adjusted outperformance. Further optimizations can improve parameter robustness for even better results. Its effective synthesis of multiple signal types makes it suitable for trends and ranges, and worthwhile for quant traders to study and implement.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- MA Envelope ----|
|v_input_7|18|LengthMA|
|v_input_8|0.2|PercentShift|
|v_input_9|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-19 00:00:00
end: 2023-10-19 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 22/03/2021
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
// Moving Average Envelopes are percentage-based envelopes set above and 
// below a moving average. The moving average, which forms the base for 
// this indicator, can be a simple or exponential moving average. Each 
// envelope is then set the same percentage above or below the moving average. 
// This creates parallel bands that follow price action. With a moving average 
// as the base, Moving Average Envelopes can be used as a trend following indicator. 
// However, this indicator is not limited to just trend following. The envelopes 
// can also be used to identify overbought and oversold levels when the trend is 
// relatively flat. 
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


MAE(Length,PercentShift) =>
    pos = 0.0
    xSMA = sma(close, Length)
    xHighBand = xSMA + (xSMA * PercentShift / 100)
    xLowBand = xSMA - (xSMA * PercentShift / 100)
    pos := iff(close > xHighBand, 1,
             iff(close <xLowBand, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Moving Average Envelopes", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- MA Envelope ----")
LengthMA = input(18, minval=1)
PercentShift = input(0.2, minval = 0.01, step = 0.01)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posMAE = MAE(LengthMA,PercentShift)
pos = iff(posReversal123 == 1 and posMAE == 1 , 1,
	   iff(posReversal123 == -1 and posMAE == -1, -1, 0)) 
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

https://www.fmz.com/strategy/429771

> Last Modified

2023-10-20 16:05:43
