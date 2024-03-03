
> Name

基于stochastic和MACD指标的反转交易策略Reversal-Trading-Strategy-Based-on-Stochastic-and-MACD-Indicators

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略融合stochastic指标判断超买超卖反转点和MACD指标识别趋势反转,实现低买高卖的反转交易策略。同时设置追踪止损来锁定利润,可有效控制风险。

## 策略原理

1. 使用stochastic指标判断超买超卖状况。9日线低于20时为超卖区域,高于80时为超买区域,形成反转信号。 

2. MACD指标金叉做多,死叉做空。MACD线突破信号线预示均线反转,提示趋势反转。

3. stochastic反转信号和MACD反转信号同时出现时,做多做空。

4. 设置追踪止损。进入趋势后,当价格达到一定比例盈利时,追踪止损启动;随后止损线跟踪价格上涨通道。

5. 反转信号出现时,关闭原有头寸,同时止损线重置。

## 策略优势

- 融合多个指标判断,可提高信号准确性

- stochastic指标可有效识别超买超卖区域

- MACD可提前捕捉均线反转,把握趋势反转

- 设置追踪止损,可很好的保护利润

- 回测数据充足,策略信号生成明确

- 各参数可优化,易实现参数调整

## 策略风险

- 多指标组合优化难度较大

- 反转信号可能出现误判,需要诸指标验证

- 追踪止损需要更多数据进行测试优化

- stochastic和MACD指标均存在滞后问题

- 频繁交易可能导致较高交易成本

## 策略优化方向

- 尝试加入更多指标,形成更稳健的交易系统

- 测试不同周期参数,寻找最佳参数组合

- 开发自适应参数设置,实时更新最优参数

- 设置回撤止损以控制最大回撤

- 加入交易量指标,避免量价背离导致的失误

- 考虑交易成本的影响,设置最小止盈幅度

## 总结

本策略综合stochastic指标和MACD指标优势,对反转交易时点选择具有很强的识别能力。追踪止损机制也可有效锁定利润。但反转交易本身依然存在一定风险,需要利用更多指标进行验证,并继续对参数进行测试优化。如果能获得稳定的参数组合,以及控制好资金管理,该策略可成为高效的短线交易策略。

|| 


## Overview

This strategy combines the stochastic indicator to determine overbought and oversold reversal points and the MACD indicator to identify trend reversals, aiming to buy low and sell high through reversal trading. It also sets trailing stops to lock in profits and effectively control risks.

## Strategy Logic

1. Use the stochastic indicator to identify overbought and oversold conditions. Readings below 20 indicate oversold levels while above 80 suggest overbought zones, forming reversal signals.

2. Go long on MACD golden crosses and go short on MACD death crosses. MACD crossing above signal line indicates moving average reversal and implies trend reversal. 

3. Take long or short positions when stochastic reversal aligns with MACD reversal signals.

4. Implement trailing stop loss. After entering a trend, when price reaches a certain profit percentage, trailing stop is triggered. The stop level then trails the upward price channel.

5. Existing positions are closed and stop loss reset when a new reversal signal appears.

## Advantages

- Multiple indicator confirmations improve signal accuracy

- Stochastic effectively identifies overbought/oversold zones

- MACD captures moving average reversal early 

- Trailing stop locks in profits well

- Sufficient backtesting data with clear strategy signals

- Optimizable parameters for easy adjustments

## Risks

- Difficulty in optimizing multiple indicators

- Reversal signals can be misjudged and need validation

- More data needed to test and optimize trailing stops 

- Lagging nature of stochastic and MACD

- Frequent trading may lead to higher costs

## Enhancements

- Add more indicators to build a robust trading system

- Test different parameter periods to find optimal combinations

- Develop adaptive parameters that update in real-time

- Set drawdown stop loss to limit maximum drawdown

- Incorporate volume to avoid false signals from divergence

- Consider trading costs impact and set minimum profit target

## Conclusion

This strategy combines the strengths of stochastic and MACD in identifying favorable reversal trading points. The trailing stop mechanism also effectively locks in profits. But reversal trading still carries inherent risks that need validation from more indicators and further parameter optimization. With stable parameters and proper capital management, this strategy can become a highly efficient short-term trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|leverage|
|v_input_2|100|percentOfEquity|
|v_input_3|10|Stop Trail Trigger %|
|v_input_4|5|Stop Trail %|
|v_input_5|10|Stop Loss %|
|v_input_6|100|Length|
|v_input_7|true|KSmoothing|
|v_input_8|2|DLength|
|v_input_9|true|Level|
|v_input_10|10|fastLength|
|v_input_11|19|slowLength|
|v_input_12|24|signalLength|
|v_input_13_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_14|false|Trade reverse|
|v_input_15|true|From Day|
|v_input_16|true|From Month|
|v_input_17|2015|From Year|
|v_input_18|true|To Day|
|v_input_19|true|To Month|
|v_input_20|2999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-14 00:00:00
end: 2023-06-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
// @CoinDigger
//
// Credits for the base strategy go to HPotter
//
// I've just added a trail stop, basic leverage simulation and stop loss
//
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 28/01/2021
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
// MACD – Moving Average Convergence Divergence. The MACD is calculated 
// by subtracting a 26-day moving average of a security's price from a 
// 12-day moving average of its price. The result is an indicator that 
// oscillates above and below zero. When the MACD is above zero, it means 
// the 12-day moving average is higher than the 26-day moving average. 
// This is bullish as it shows that current expectations (i.e., the 12-day 
// moving average) are more bullish than previous expectations (i.e., the 
// 26-day average). This implies a bullish, or upward, shift in the supply/demand 
// lines. When the MACD falls below zero, it means that the 12-day moving average 
// is less than the 26-day moving average, implying a bearish shift in the 
// supply/demand lines.
// A 9-day moving average of the MACD (not of the security's price) is usually 
// plotted on top of the MACD indicator. This line is referred to as the "signal" 
// line. The signal line anticipates the convergence of the two moving averages 
// (i.e., the movement of the MACD toward the zero line).
// Let's consider the rational behind this technique. The MACD is the difference 
// between two moving averages of price. When the shorter-term moving average rises 
// above the longer-term moving average (i.e., the MACD rises above zero), it means 
// that investor expectations are becoming more bullish (i.e., there has been an 
// upward shift in the supply/demand lines). By plotting a 9-day moving average of 
// the MACD, we can see the changing of expectations (i.e., the shifting of the 
// supply/demand lines) as they occur.
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

MACD(fastLength,slowLength,signalLength) =>
    pos = 0.0
    fastMA = ema(close, fastLength)
    slowMA = ema(close, slowLength)
    macd = fastMA - slowMA
    signal = sma(macd, signalLength)
    pos:= iff(signal < macd , 1,
	       iff(signal > macd, -1, nz(pos[1], 0))) 
    pos
strategy(title="Combo Backtest 123 Reversal & MACD Crossover with Trail and Stop", shorttitle="ComboReversal123MACDWithStop", overlay = false, precision=8,default_qty_type=strategy.percent_of_equity, default_qty_value=100, initial_capital=100, currency="USD", commission_type=strategy.commission.percent, commission_value=0.075)

leverage=input(2,"leverage",step=1)
percentOfEquity=input(100,"percentOfEquity",step=1)

sl_trigger = input(10, title='Stop Trail Trigger %', type=input.float)/100
sl_trail = input(5, title='Stop Trail %', type=input.float)/100
sl_inp = input(10, title='Stop Loss %', type=input.float)/100

Length = input(100, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(2, minval=1)
Level = input(1, minval=1)
//-------------------------
fastLength = input(10, minval=1)
slowLength = input(19,minval=1)
signalLength=input(24,minval=1)
xSeria = input(title="Source", type=input.source, defval=close)
reverse = input(false, title="Trade reverse")


////////////////////////////////////////////////////////////////////////////////
// BACKTESTING RANGE
 
// From Date Inputs
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2015, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2999, title = "To Year", minval = 1970)
 
// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = time >= startDate and time <= finishDate
 
////////////////////////////////////////////////////////////////////////////////



////////////////////// STOP LOSS CALCULATIONS //////////////////////////////
///////////////////////////////////////////////////


cond() => barssince(strategy.position_size[1] == 0 and (strategy.position_size > 0 or strategy.position_size < 0)) > 0

lastStopLong = 0.0
lastStopLong := lastStopLong[1] != strategy.position_avg_price - (strategy.position_avg_price * (sl_inp)) and lastStopLong[1]  != 0.0 ? lastStopLong[1]  : strategy.position_size > 0 ? (cond() and close > strategy.position_avg_price + (strategy.position_avg_price * (sl_trigger)) ? strategy.position_avg_price + (strategy.position_avg_price * (sl_trail)) : strategy.position_avg_price - (strategy.position_avg_price * (sl_inp))) : 0
lastStopShort = 0.0
lastStopShort := lastStopShort[1] != strategy.position_avg_price + (strategy.position_avg_price * (sl_inp)) and lastStopShort[1]  != 9999999999.0 ? lastStopShort[1]  : strategy.position_size < 0 ? (cond() and close < strategy.position_avg_price - (strategy.position_avg_price * (sl_trigger)) ? strategy.position_avg_price - (strategy.position_avg_price * (sl_trail)) : strategy.position_avg_price + (strategy.position_avg_price * (sl_inp))) : 9999999999.0

longStopPrice = 0.0
longStopPrice2 = 0.0
longStopPrice3 = 0.0
shortStopPrice = 0.0
longStopPrice := if strategy.position_size > 0
    originalStop = strategy.position_avg_price - (strategy.position_avg_price * (sl_inp))
    trigger = strategy.position_avg_price + (strategy.position_avg_price * (sl_trigger))
    trail = strategy.position_avg_price + (strategy.position_avg_price * (sl_trail))
    stopValue = high > trigger ? trail : 0
    max(stopValue, originalStop, longStopPrice[1])
else
    0

longStopPrice2 := if strategy.position_size > 0
    originalStop = strategy.position_avg_price - (strategy.position_avg_price * (sl_inp))
    trigger = strategy.position_avg_price + (strategy.position_avg_price * (sl_trigger*2))
    trail = strategy.position_avg_price + (strategy.position_avg_price * (sl_trail*2))
    stopValue = high > trigger ? trail : 0
    max(stopValue, originalStop, longStopPrice2[1])
else
    0


longStopPrice3 := if strategy.position_size > 0
    originalStop = strategy.position_avg_price - (strategy.position_avg_price * (sl_inp))
    trigger = strategy.position_avg_price + (strategy.position_avg_price * (sl_trigger*4))
    trail = strategy.position_avg_price + (strategy.position_avg_price * (sl_trail*3))
    stopValue = high > trigger ? trail : 0
    max(stopValue, originalStop, longStopPrice3[1])
else
    0
    
shortStopPrice := if strategy.position_size < 0
    originalStop = strategy.position_avg_price + (strategy.position_avg_price * (sl_inp))
    trigger = strategy.position_avg_price - (strategy.position_avg_price * (sl_trigger))
    trail = strategy.position_avg_price - (strategy.position_avg_price * (sl_trail))
    stopValue = low < trigger ? trail : 999999
    min(stopValue, originalStop, shortStopPrice[1])
else
    999999
    
///////////////////////////////////////////////////
///////////////////////////////////////////////////


posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posMACD = MACD(fastLength,slowLength, signalLength)
pos = iff(posReversal123 == 1 and posMACD == 1 , 1,
	   iff(posReversal123 == -1 and posMACD == -1, -1, 0)) 
	   
possig = pos

quantity = max(0.000001,min(((strategy.equity*(percentOfEquity/100))*leverage/open),100000000))

if (possig == 1 and time_cond)
    strategy.entry("Long", strategy.long, qty=quantity)
if (possig == -1 and time_cond)
    strategy.entry("Short", strategy.short, qty=quantity) 
if (strategy.position_size > 0 and possig == -1 and time_cond)   
    strategy.close_all()
if (strategy.position_size < 0 and possig == 1 and time_cond)   
    strategy.close_all()
if ((strategy.position_size < 0 or strategy.position_size > 0) and possig == 0)   
    strategy.close_all()

//EXIT TRADE @ TSL
if strategy.position_size > 0
    strategy.exit(id="Long", stop=longStopPrice)
if strategy.position_size < 0
    strategy.exit(id="Short", stop=shortStopPrice)


```

> Detail

https://www.fmz.com/strategy/427529

> Last Modified

2023-09-21 21:39:34
