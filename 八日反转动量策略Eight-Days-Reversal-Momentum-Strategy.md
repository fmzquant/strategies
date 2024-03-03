
> Name

八日反转动量策略Eight-Days-Reversal-Momentum-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/dc004000dc448841b4.png)

[trans]
## 概述

该策略主要利用价格在连续8天高于或低于5日简单移动平均线后发生反转的特点,来捕捉中短线上的动量效应。当价格连续8天低于5日线后第一天收盘价再次上穿5日线时,做多;当价格连续8天高于5日线后第一天收盘价再次下穿5日线时,做空。

## 策略原理

1. 计算5日简单移动平均线SMA。
2. 定义多头趋势TrendUp为收盘价大于或等于SMA,空头趋势TrendDown为收盘价小于或等于SMA。
3. 确认趋势反转的条件:连续8日收盘价低于SMA后,下一日收盘价转为多头(上穿SMA)时触发买入信号;连续8日收盘价高于SMA后,下一日收盘价转为空头(下穿SMA)时触发卖出信号。
4. 入场:买入条件Buy为上一日触发买入信号TriggerBuy且当前为空头趋势时做多;卖出条件Sell为上一日触发卖出信号TriggerSell且当前为多头趋势时做空。
5. 出场:多头止损为收盘价下穿SMA时平仓;空头止损为收盘价上穿SMA时平仓。

## 优势分析

1. 利用价格反转的特点,适合捕捉中短线动量。
2. 连续8日突破SMA形成趋势运行的情况较多,增加交易机会。
3. 5日线参数较优,避免被过多假突破愚弄。
4. 风险可控,有明确的止损点。

## 风险分析

1. 行情震荡时止损点可能会被频繁触发。
2. 突破运行的天数如果设定过长,可能错过最佳入场时机。
3. 如果行情出现长期单边运行,该策略难以获利。

可以适当调整SMA的参数;优化入场条件,防止假突破;结合趋势判断指标强化效果。

## 优化方向  

1. 参数优化:可以测试不同周期的SMA参数,寻找更优参数。
2. 进场优化:加入成交量指标,避免假突破;或增加阳线阴线判断,规避震荡。 
3. 出场优化:可测试收盘价回落一定幅度后止损,增加止损BUFFER。
4. 风控优化:可设置每日止损次数,避免亏损过多。
5. 结合其他指标:可加入RSI,MACD等判断趋势指标,识别趋势态势。

## 总结

该策略通过判断价格运动状态,捕捉中短线价格from突破到反转的过程,实现规避震荡、顺势而为的交易策略。关键是参数设定和进场的判断要严谨,防止被噪音误导;同时出场止损要合理,防止亏损过大。如果再辅以趋势判断指标,可以获得更出色的效果。该策略逻辑清晰易懂,代码简洁,值得深入研究优化。

||

## Overview

This strategy mainly utilizes the reversal feature of prices after continuously closing above or below the 5-day simple moving average for 8 days to capture the momentum effect in medium and short term. It goes long when the closing price crosses above the 5-day line again after continuously closing below the 5-day line for 8 days; it goes short when the closing price crosses below the 5-day line again after continuously closing above the 5-day line for 8 days.

## Strategy Logic  

1. Calculate the 5-day simple moving average SMA.
2. Define the uptrend TrendUp as close greater than or equal to SMA, downtrend TrendDown as close less than or equal to SMA.
3. Confirm the condition for trend reversal: trigger buy signal when closing price closes below SMA for consecutive 8 days and turns to uptrend (crosses above SMA) the next day; trigger sell signal when closing price closes above SMA for consecutive 8 days and turns to downtrend (crosses below SMA) the next day.  
4. Entry: long when the buy condition Buy is triggered yesterday and the current trend is downtrend; short when the sell condition Sell is triggered yesterday and the current trend is uptrend.
5. Exit: close long position when closing price crosses below SMA; close short position when closing price crosses above SMA.

## Advantage Analysis  

1. Captures momentum by utilizing price reversal features, suitable for medium and short term trading.
2. High trading opportunities as continuous SMA breakout for 8 days happens frequently.  
3. 5-day SMA parameter performs well, avoids too many false breakouts. 
4. Controllable risk with clear stop loss point.

## Risk Analysis

1. Stop loss may be triggered frequently during market consolidation.  
2. May miss the best entry point if the breakout days are set too long.
3. Hard to profit if there is a prolonged trend.

Can optimize SMA parameters, improve entry criteria to prevent false breakout, combine with trend indicators to strengthen the strategy.  

## Optimization Directions

1. Parameter optimization: test different periods of SMA to find better parameters.  
2. Entry optimization: add volume indicators to avoid false breakouts; or judge bull/bear candles to avoid whipsaws.
3. Exit optimization: test fixed percentage trailing stop loss to give more room.   
4. Risk control: set maximum daily stop loss times to limit losses.
5. Combine indicators: add RSI, MACD to determine trend to identify market conditions.

## Conclusion  

The strategy captures the price movement from breakout to pullback by judging the momentum, implements the trading logic of avoiding whipsaws and trend following. The keys are strict parameter settings and robust entry criteria to prevent noise; reasonable stop loss to limit losses. Combining with trend indicators can achieve better results. The strategy logic is simple and clean. It is worthwhile to explore further optimization.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-04 00:00:00
end: 2023-12-04 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Marcuscor

//@version=5

// Inpsired by Linda Bradford Raschke: a strategy for trading momentum in futures markets

strategy("8D Run", initial_capital = 50000, commission_value = 0.0004) 


SMA = ta.sma(close,5)

TrendUp = close >= SMA

TrendDown = close <= SMA


//logic to long

TriggerBuy = ta.barssince(close < SMA) >= 8

Buy = TriggerBuy[1] and TrendDown 

strategy.entry("EL", strategy.long, when = Buy)
strategy.close(id = "EL", when = close > SMA)

// 1) color background when "run" begins and 2) change color when buy signal occurs
bgcolor(TriggerBuy? color.green : na, transp = 90)
bgcolor(Buy ? color.green : na, transp = 70)


// logic to short 

TriggerSell = ta.barssince(close > SMA) >= 8

Sell = TriggerSell[1] and TrendUp

strategy.entry("ES", strategy.short, when = Sell)
strategy.close(id = "ES", when = close < SMA)

// 1) color background when "run" begins and 2) change color when sell signal occurs
bgcolor(TriggerSell ? color.red : na, transp = 90)
bgcolor(Sell ? color.red : na, transp = 70) 






```

> Detail

https://www.fmz.com/strategy/434294

> Last Modified

2023-12-05 10:56:37
