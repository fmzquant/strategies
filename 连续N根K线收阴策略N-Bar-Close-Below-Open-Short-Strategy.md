
> Name

连续N根K线收阴策略N-Bar-Close-Below-Open-Short-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b35c7aa861b2b1802f.png)
[trans]


## 概述

本策略基于技术指标判断市场趋势,当出现连续N根K线收阴时做空,是一种短线交易策略。

## 策略原理

本策略使用nCounter变量统计连续收阴根数。当close价格低于open价格时,增加nCounter值;当close价格高于open价格时,重置nCounter为0。当nCounter达到输入参数nLength时,标志着出现连续N根K线收阴,输出信号C2=1。

出现信号时,如果当前没有持仓,则开仓做空;如果已经持有做空单,则继续持有。开仓后,使用posprice记录开仓价格。以开仓价格为基准,设置止盈和止损条件:如果价格达到止盈点(开仓价格+输入参数takeprofit),平仓并重置;如果价格达到止损点(开仓价格-输入参数stoploss),平仓并重置。

## 优势分析

本策略主要优势有:

1. 规则简单清晰,容易理解实现。
2. 可自定义参数,灵活应对不同市场条件。
3. 采用止盈止损机制,可以有效控制风险。

## 风险分析

本策略主要风险有:

1. 连续N根K线收阴不能完全确定趋势反转,可能出现假破。可以适当调整N值或结合其他指标验证。
2. 止盈止损设置不当可能造成过早离场或亏损扩大。应根据市场波动程度设定合理参数。

## 优化方向 

本策略可以从以下几个方面进行优化:

1. 增加趋势过滤,避免不明确市场上出现的短期调整被误判。例如结合均线等指标判断整体趋势。

2. 增加量能验证,例如交易量放大能更好确认趋势转折。

3. 优化止盈止损策略,例如运用游离止损、比例止损等方式,使止损更加智能化。

4. 利用机器学习方法优化参数,使nLength值能根据实时市场变化进行调整。

## 总结

本策略基于收盘价与开盘价的大小关系判断短期趋势,当检测到连续N根K线收阴时产生交易信号。策略简单直观,参数可调,带有止盈止损机制,可以过滤掉部分噪音交易。但也存在一定假信号风险,建议结合其他滤波指标优化。通过参数调整、风险管理和模型优化,本策略可以成为一个非常实用的短线选择工具。

||


## Overview

This strategy identifies short-term trend based on technical indictors and takes short position when detecting N consecutive bar closing below opening price. It is an intraday trading strategy.

## Strategy Logic

The strategy uses a nCounter variable to count the number of consecutive bar with close below open. When close price is lower than open price, nCounter increments by 1. When close price is higher than open price, nCounter resets to 0. When nCounter reaches the input parameter nLength, it indicates N consecutive bars closing below opening price and the signal C2 becomes 1.

Upon signal, if there is no position, a short order will be sent. If already in short position, keep holding the position. After opening position, posprice records the entry price. Take profit and stop loss are set based on entry price: if price reaches take profit point (entry + input takeprofit), close position and reset; if price reaches stop loss point (entry - input stoploss), close position and reset.

## Advantage Analysis

The main advantages of this strategy:

1. Simple and clear logic, easy to understand and implement.  
2. Customizable parameters, flexible across different market conditions.
3. Equipped with take profit and stop loss, effectively control risks.

## Risk Analysis

The main risks of this strategy:

1. N bar close below open cannot fully confirm trend reversal, false signal may occur. Fine tune N value or add other filters for verification.
2. Improper stop loss or take profit setting may lead to premature exit or amplified losses. Reasonable parameters should be set according to market volatility.

## Optimization Directions

The strategy can be improved from the following aspects:

1. Add trend filter to avoid misjudging short-term corrections in sideways market. For example, combine with moving average to determine overall trend.

2. Add volume confirmation. Surging volume can better confirm trend reversal.  

3. Optimize take profit and stop loss, such as using trailing stop loss, percentage stop loss to make more intelligent exits.

4. Utilize machine learning models to dynamically adjust parameters like nLength according to real-time market changes.

## Conclusion

This strategy identifies short-term trend simply based on the relationship between close price and open price. Trading signals are generated when detecting N consecutive bars closing below opening price. The strategy is intuitive, customizable and equipped with effective risk management. However, certain level of false signals exist. It is recommended to combine additional filters for optimization. With parameter tuning, risk management and model enhancement, this can be a very practical tool for short-term trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4|nLength|
|v_input_2|20|Take Profit pip|
|v_input_3|10|Stop Loss pip|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-18 00:00:00
end: 2023-12-25 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 05/02/2020
// Evaluates for n number of consecutive lower closes. Returns a value 
// of 1 when the condition is true or 0 when false.
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="N Bars Down", shorttitle="NBD Backtest", overlay = false) 
nLength = input(4, minval=1)
input_takeprofit = input(20, title="Take Profit pip", step=0.01)
input_stoploss = input(10, title="Stop Loss pip", step=0.01)
nCounter = 0
nCounter := iff(close[1] <= open[1], nz(nCounter[1],0)+1,
             iff(close[1] > open[1], 0, nCounter))
C2 = iff(nCounter >= nLength, 1, 0)
posprice = 0.0
pos = 0
barcolor(nz(pos[1], 0) == -1 ? color.red: nz(pos[1], 0) == 1 ? color.green : color.blue ) 
posprice := iff(C2== 1, close, nz(posprice[1], 0)) 
pos := iff(posprice > 0, -1, 0)
if (pos == 0) 
    strategy.close_all()
if (pos == -1)
    strategy.entry("Short", strategy.short)
posprice := iff(low <= posprice - input_takeprofit and posprice > 0, 0 ,  nz(posprice, 0))
posprice := iff(high >= posprice + input_stoploss and posprice > 0, 0 ,  nz(posprice, 0))
plot(C2, title='NBD', color=color.red)
```

> Detail

https://www.fmz.com/strategy/436599

> Last Modified

2023-12-26 10:29:12
