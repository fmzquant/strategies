
> Name

基于MACD的加密货币交易策略Crypto-Trading-Strategy-Based-on-MACD

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略是基于移动平均线聚合差价指标(MACD)和相对强度指数(RSI)来判断加密货币买卖点的交易策略。它通过计算短期和长期移动平均线的差值,结合RSI来判断市场趋势和超买超卖情况,为交易决策提供信号。

## 策略原理

1. 计算12日EMA和26日EMA,分别作为短期和长期移动平均线

2. 计算短期和长期EMA的差值,作为MACD柱状图

3. 计算MACD的9日EMA作为信号线

4. 计算14日RSI,判断超买超卖情况

5. 当MACD上穿信号线,且RSI大于81时,显示买入信号

6. 当MACD下穿信号线,且RSI小于27时,显示卖出信号

7. 使用内置策略模块入场和出场

## 优势分析

1. MACD指标可以识别趋势和趋势变化,RSI指标可以显示超买超卖现象,两者结合可以提高交易信号的准确度

2. MACD零轴上下方变化代表短期和长期趋势的变化方向和力度,为判断市场方向提供依据

3. RSI高位区域代表过热和超买的可能,RSI低位代表超卖的可能,为买卖点寻找提供依据

4. 交易信号简单明确,容易按照规则来执行交易

5. 可配置参数进行优化,适应不同市场环境

## 风险分析

1. MACD和RSI所依据的数据易受假突破和异常数据影响,可能发出错误信号

2. 固定的参数设置可能无法适应市场变化,需要优化

3. 买卖信号可能滞后,无法在转折点买卖

4. 仓位只有多空二选一,无法利用震荡行情获利

## 优化方向

1. 测试不同的参数组合,找到最优参数

2. 增加额外过滤条件,避免假突破

3. 增加止损策略,减少单边行情的亏损

4. 增加仓位管理,在趋势中做加仓,在震荡中做减仓

5. 结合其它指标,寻找更准确的买卖点

6. 测试在不同品种和时间周期的效果

## 总结

该策略利用MACD和RSI两个指标的互补优势来识别趋势方向和买卖点。通过优化参数和增加过滤条件可以改进策略的稳定性和profit因子。适当调整止损和仓位管理也有助于提高盈利水平和降低风险。MACD和RSI的优势和不足决定了该策略更适合识别中长线趋势而非短线交易。总体来说,该策略简单实用,值得进一步测试和优化,以取得更好的回测和实盘结果。

|| 

## Overview

This strategy uses the Moving Average Convergence Divergence (MACD) and Relative Strength Index (RSI) indicators to identify trading signals for cryptocurrencies. It calculates the difference between short-term and long-term moving averages along with RSI to judge market trends and overbought/oversold levels for making trading decisions.

## Strategy Logic

1. Calculate 12-day EMA and 26-day EMA as short-term and long-term moving averages.

2. Calculate the difference between short and long EMAs as the MACD histogram. 

3. Calculate 9-day EMA of MACD as the signal line.

4. Calculate 14-day RSI to judge overbought/oversold levels.

5. Display buy signal when MACD crosses above signal line and RSI is greater than 81.

6. Display sell signal when MACD crosses below signal line and RSI is less than 27.

7. Use built-in strategy module for entries and exits.

## Advantage Analysis

1. MACD can identify trends and changes, RSI shows overbought/oversold levels. Combining both improves signal accuracy.

2. MACD above/below zero line indicates direction/strength of short-term vs long-term trend. 

3. RSI at high/low levels indicates possible overheating/oversold. Helps find trading signals.

4. Clear and simple trading signals, easy to execute trades systematically.

5. Customizable parameters for optimization and adapting to different market conditions.

## Risk Analysis

1. MACD and RSI data prone to false breakouts and anomalies, may generate incorrect signals.

2. Fixed parameters may fail to adapt to evolving markets, needs optimization.

3. Signals may lag, unable to trade at turning points. 

4. Only long/short, unable to profit from ranging markets.

## Optimization Directions

1. Test different parameter combinations to find optimum settings.

2. Add filters to avoid false breakout trades. 

3. Add stop loss to limit losses in one-sided markets.

4. Manage positions size, increase in trends and decrease in ranges.

5. Combine with other indicators for more accurate signals.

6. Test on different instruments and timeframes.

## Summary

This strategy utilizes the complementary strengths of MACD and RSI to identify trends and trading signals. Fine tuning parameters and adding filters can improve robustness and profitability. Adjusting stops and position sizing also helps maximize profits and minimize risk. The pros and cons of MACD and RSI make this strategy more suitable for catching mid-to-long term trends rather than short-term trades. Overall, it is a simple and practical strategy worth further testing and optimization to achieve improved backtest and live results.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Invert Trade Direction?|
|v_input_2|true|From Month|
|v_input_3|true|From Day|
|v_input_4|2017|From Year|
|v_input_5|2|To Month|
|v_input_6|10|To Day|
|v_input_7|2019|To Year|
|v_input_8|20000|Take Profit|
|v_input_9|1500|Stop Loss|
|v_input_10|100|Trailing Stop Loss|
|v_input_11|false|Trailing Stop Loss Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-12 04:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// Revision:        5
// Author:          @Hugo_Moriceau
//study("Thesis_EMLYON_Withdate-strategies-Daily_Crypto_Moriceau_indicator",overlay=true)

// Pyramide 10 order size 100, every tick

strategy("Daily_Crypto_Moriceau_indicator",overlay=true)

// === GENERAL INPUTS ===

fast = 12, slow = 26
fastMA = ema(close, fast)
slowMA = ema(close, slow)

macd = fastMA - slowMA
signal = sma(macd, 9)
rsi = rsi(close,14)



tradeInvert     = input(defval = false, title = "Invert Trade Direction?")

// === LOGIC ===

// is fast ma above slow ma?
aboveBelow = fastMA >= slowMA ? true : false

// are we inverting our trade direction?
tradeDirection = tradeInvert ? aboveBelow ? false : true : aboveBelow ? true : false

// === Plot Setting ===

//plot(fastMA,color=red)
//plot(slowMA,color=blue)
//barcolor(color=iff(fastMA > slowMA, yellow, na))
//barcolor(color=iff(fastMA < slowMA, black, na))
barcolor(color=iff(macd > 0.12*close , fuchsia, na))
barcolor(color=iff(macd < -0.1*close , lime, na))
dataS= macd > 0.125 and rsi>81 and fastMA > slowMA
dataB= macd < -0.1  and rsi<27 and fastMA< slowMA


plotchar(dataB, char='B',color=black,size = size.tiny,location = location.belowbar,transp= 0)  
plotchar(dataS, char='S',color=black,size = size.tiny,location = location.abovebar,transp= 0)


// === BACKTEST RANGE ===
FromMonth = input(defval = 01, title = "From Month", minval = 1)
FromDay   = input(defval = 01, title = "From Day", minval = 1)
FromYear  = input(defval = 2017, title = "From Year", minval = 2014)
ToMonth   = input(defval = 2, title = "To Month", minval = 1)
ToDay     = input(defval = 10, title = "To Day", minval = 1)
ToYear    = input(defval = 2019, title = "To Year", minval = 2018)


// === STRATEGY RELATED INPUTS ===+
// the risk management inputs
inpTakeProfit   = input(defval = 20000, title = "Take Profit", minval = 0)
inpStopLoss     = input(defval = 1500, title = "Stop Loss", minval = 0)
inpTrailStop    = input(defval = 100, title = "Trailing Stop Loss", minval = 0)
inpTrailOffset  = input(defval = 0, title = "Trailing Stop Loss Offset", minval = 0)

// === RISK MANAGEMENT VALUE PREP ===

// if an input is less than 1, assuming not wanted so we assign 'na' value to disable it.

useTakeProfit   = inpTakeProfit  >= 1 ? inpTakeProfit  : na
useStopLoss     = inpStopLoss    >= 1 ? inpStopLoss    : na
useTrailStop    = inpTrailStop   >= 1 ? inpTrailStop   : na
useTrailOffset  = inpTrailOffset >= 1 ? inpTrailOffset : na


// === STRATEGY - LONG POSITION EXECUTION ===

enterLong() => not tradeDirection[1] and tradeDirection 
exitLong() => tradeDirection[1] and not tradeDirection
strategy.entry(id = "Long", long = true, when = enterLong()) // use function or simple condition to decide when to get in
strategy.close(id = "Long", when = exitLong()) // ...and when to get out

// === STRATEGY - SHORT POSITION EXECUTION ===

enterShort() => tradeDirection[1] and not tradeDirection
exitShort() => not tradeDirection[1] and tradeDirection
strategy.entry(id = "Short", long = false, when = enterShort())
strategy.close(id = "Short", when = exitShort())

// === STRATEGY RISK MANAGEMENT EXECUTION ===

// finally, make use of all the earlier values we got prepped
strategy.exit("Exit Long", from_entry = "Long", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
strategy.exit("Exit Short", from_entry = "Short", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
```

> Detail

https://www.fmz.com/strategy/427239

> Last Modified

2023-09-19 11:21:42
