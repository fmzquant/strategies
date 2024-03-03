
> Name

基于MACD和RSI的长短双向交易策略MACD-and-RSI-Based-Long-Short-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略结合MACD和RSI两个指标,实现在趋势方向不明确的情况下,同时进行做多做空交易,以获取超额收益。

## 策略原理

1. 计算快速EMA(12日线)和慢速EMA(26日线)
2. 计算MACD收敛离差(快速EMA减去慢速EMA)
3. 计算MACD的9日移动平均作为信号线signal
4. 计算14日RSI
5. 当MACD<-0.1,RSI<27且快速EMA低于慢速EMA时,做多
6. 当MACD>0.125,RSI>81且快速EMA高于慢速EMA时,做空
7. 设置止盈、止损、移动止损来管理仓位

## 优势分析

1. 同时进行多空交易,可以在非趋势行情中获取超额收益
2. 结合趋势方向指标EMA和反转指标RSI,可以提高信号质量
3. 采用移动止损来锁定盈利,可以有效控制亏损风险

## 风险分析

1. 双向交易需要更多资金来支撑保证金要求
2. 行情剧烈反转时,可能同时止损多空头寸
3. 参数设置不当可能导致过于频繁交易

风险解决方法:

1. 充足的资金支持,控制仓位规模
2. 合理设置止损距离,避免过密集止损
3. 优化参数,降低交易频率

## 优化方向 

1. 可以考虑结合波动率指标,优化入场时机
2. 可以测试不同参数组合,寻找最佳参数
3. 可以根据市场条件优化止损策略,如尾随止损等
4. 可以结合机器学习算法自动优化参数

## 总结

本策略通过MACD和RSI的组合,实现双向交易。使用移动止损来锁定盈利,可以在非趋势行情中获取超额收益。该策略可以进一步优化参数设置、止损策略等,以获得更稳定的超额收益。

||


## Overview

This strategy combines MACD and RSI indicators to implement long and short trading simultaneously, in order to obtain excess returns in unclear trend situations.

## Strategy Logic

1. Calculate fast EMA (12-day) and slow EMA (26-day) 
2. Calculate MACD convergence divergence (fast EMA minus slow EMA)
3. Calculate 9-day moving average of MACD as signal line
4. Calculate 14-day RSI
5. Go long when MACD<-0.1, RSI<27 and fast EMA below slow EMA
6. Go short when MACD>0.125, RSI>81 and fast EMA above slow EMA
7. Use take profit, stop loss, trailing stop loss to manage positions

## Advantage Analysis

1. Going both long and short can generate excess returns in non-trending markets
2. Combining trend indicator EMA and reversal indicator RSI improves signal quality  
3. Using trailing stop loss to lock in profits effectively controls loss risk

## Risk Analysis

1. Trading both ways requires more capital to support margin requirements
2. Prices may hit stop loss on both long and short positions when reversing sharply
3. Improper parameter settings may cause over-trading

Risk Solutions:

1. Sufficient capital to support position sizing  
2. Reasonable stop loss distance to avoid over-crowded stops
3. Optimize parameters to reduce trading frequency  

## Optimization Directions

1. Consider combining volatility indicators to improve entry timing
2. Test different parameter combinations to find optimum  
3. Optimize stop loss strategy based on market conditions, such as trailing stop loss
4. Use machine learning algorithms to auto-optimize parameters

## Summary 

This strategy implements dual-directional trading with MACD and RSI combination. Using trailing stop loss to lock in profits can generate excess returns in non-trending markets. The strategy can be further optimized on parameters, stop loss strategies etc. to obtain more consistent excess returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Invert Trade Direction?|
|v_input_2|5|From Month|
|v_input_3|23|From Day|
|v_input_4|2021|From Year|
|v_input_5|5|To Month|
|v_input_6|25|To Day|
|v_input_7|2021|To Year|
|v_input_8|2500|Take Profit|
|v_input_9|600|Stop Loss|
|v_input_10|300|Trailing Stop Loss|
|v_input_11|50|Trailing Stop Loss Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-08 00:00:00
end: 2023-10-08 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// Revision:        290
// Author:          @Hugo_Moriceau
//study("Moriceau_Crypto_strategies_Long_short_indicator_thesis",overlay=true)

// Pyramide 10 order size 100, every tick

strategy("Moriceau_Crypto_strategies_Long_short_indicator",overlay=true)

// === GENERAL INPUTS ===

fast = 12, slow = 26
fastMA = ema(close, fast)
slowMA = ema(close, slow)

macd = fastMA - slowMA
signal = sma(macd, 9)
rsi = rsi(close,14)

dataB = macd < -0.1  and rsi<27 and fastMA < slowMA
// data1 = macd > 0.125  and rsi>81 and fastMA> slowMA
dataS = macd > 0.125 and rsi > 81 and fastMA > slowMA

tradeInvert     = input(defval = false, title = "Invert Trade Direction?")

// === LOGIC ===

// is fast ma above slow ma?
Achat = macd < -0.1  and rsi < 27 and fastMA < slowMA ? true : false
vente = macd > 0.125 and rsi > 81 and fastMA > slowMA ? true : false

// are we inverting our trade direction?
tradeDirection = vente ? Achat ? false : true : Achat ? true : false

// === Plot Setting ===

plot(fastMA,color=red)
plot(slowMA,color=blue)
barcolor(color=iff(fastMA > slowMA, yellow, na))
barcolor(color=iff(fastMA < slowMA, black, na))
//barcolor(color=iff(macd > 0.12*close , fuchsia, na))
//barcolor(color=iff(macd < -0.1*close , lime, na))
plotchar(dataB, char='B',color=black,size = size.auto,location = location.belowbar,transp= 0)  
plotchar(dataS, char='S',color=black,size = size.auto,location = location.abovebar,transp= 0)

//fast = plot(maFast, title = "FastMA", color = yellow, linewidth = 2, style = line, transp = 50)
//slow = plot(maSlow, title = "SlowMA", color = black, linewidth = 2, style = line, transp = 50)

// === BACKTEST RANGE ===
FromMonth = input(defval = 05, title = "From Month", minval = 1)
FromDay   = input(defval = 23, title = "From Day", minval = 1)
FromYear  = input(defval = 2021, title = "From Year", minval = 2017)
ToMonth   = input(defval = 5, title = "To Month", minval = 1)
ToDay     = input(defval = 25, title = "To Day", minval = 1)
ToYear    = input(defval = 2021, title = "To Year", minval = 2017)


// === STRATEGY RELATED INPUTS ===+
// the risk management inputs
inpTakeProfit   = input(defval = 2500, title = "Take Profit", minval = 28)
inpStopLoss     = input(defval = 600, title = "Stop Loss", minval = 15)
inpTrailStop    = input(defval = 300, title = "Trailing Stop Loss", minval = 5)
inpTrailOffset  = input(defval = 50, title = "Trailing Stop Loss Offset", minval = 1)

// === RISK MANAGEMENT VALUE PREP ===

// if an input is less than 1, assuming not wanted so we assign 'na' value to disable it.

useTakeProfit   = inpTakeProfit  >= 1 ? inpTakeProfit  : na
useStopLoss     = inpStopLoss    >= 1 ? inpStopLoss    : na
useTrailStop    = inpTrailStop   >= 1 ? inpTrailStop   : na
useTrailOffset  = inpTrailOffset >= 1 ? inpTrailOffset : na


// === STRATEGY - LONG POSITION EXECUTION ===

enterLong() => not tradeDirection[1] and tradeDirection 
exitLong() => tradeDirection[1] and not tradeDirection
strategy.entry(id = "Achat", long = true, when = enterLong()) // use function or simple condition to decide when to get in
strategy.close(id = "TP 50% Sell", when = exitLong()) // ...and when to get out

// === STRATEGY - SHORT POSITION EXECUTION ===

enterShort() => tradeDirection[1] and not tradeDirection
exitShort() => not tradeDirection[1] and tradeDirection
strategy.entry(id = "Vente", long = false, when = enterShort())
strategy.close(id = "Vente", when = exitShort())

// === STRATEGY RISK MANAGEMENT EXECUTION ===

// finally, make use of all the earlier values we got prepped
strategy.exit("Vente", from_entry = "Vente", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
strategy.exit("Short", from_entry = "Achat", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
```

> Detail

https://www.fmz.com/strategy/428795

> Last Modified

2023-10-09 15:33:17
