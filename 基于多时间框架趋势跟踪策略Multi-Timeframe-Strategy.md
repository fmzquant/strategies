
> Name

基于多时间框架趋势跟踪策略Multi-Timeframe-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c8a90d884d702376f7.png)
[trans]
## 概述

该策略是一个利用多个时间框架指标同意的趋势跟踪策略。它会在日线、10日线、15日线和30日线同时看涨或看跌时开仓做多或做空,使用动态止损方式止损。

## 策略原理

该策略使用日线、10日线、15日线和30日线四个时间框架判断趋势方向。当四个时间框架的收盘价都高于开盘价时判定为看涨,当四个时间框架的收盘价都低于开盘价时判定为看跌。

当判断为看涨时,做多入场;当判断为看跌时,做空入场。入场后使用KC通道进行动态止损。

具体来说,策略通过比较不同时间框架下的开盘价和收盘价来判断趋势方向。如果开盘价低于收盘价,则该时间框架看涨,用绿色表示。如果开盘价高于收盘价,则该时间框架看跌,用红色表示。

当四个时间框架均看涨时,策略会开仓做多;当四个时间框架均看跌时,策略会开仓做空。平仓条件为止损或趋势反转。

## 策略优势

1. 使用多个时间框架判断趋势,可以有效过滤假突破,确定趋势方向

2. 动态止损方式可以最大限度保护资金

3. 入场条件严格,可以减少不必要的交易,避免过多滑点成本

4. 多时间框架结合,可以平衡获利速度和稳定性

## 策略风险

1. 入场条件太严格,可能错过部分机会

2. 止损幅度设置不当可能过于激进或保守

3. 时间框架选择不当,可能与更长期或更短期趋势不符

4. 突发事件导致快速反转,无法止损

## 优化方向

1. 优化时间框架的选择,平衡获利速度和稳定性

2. 测试不同的参数设置,优化止损幅度

3. 增加机器学习算法,辅助判断趋势反转点

4. 增加关注重大事件,避免突发事件造成损失

## 总结

该策略整合多时间框架判断趋势方向,严格入场条件结合动态止损,旨在获得稳定收益。存在可能错过机会以及风险控制不当的问题。下一步将继续优化参数设置,提高策略稳定性。

||

## Overview

This strategy utilizes the agreement of indicators across multiple timeframes to track trends. It goes long or short when the daily, 10-day, 15-day and 30-day timeframes simultaneously give bullish or bearish signals, with dynamic stop loss.

## Strategy Logic

The strategy judges trend direction using four timeframes - daily, 10-day, 15-day and 30-day. When the closing prices are higher than the opening prices across all four timeframes, it indicates a bullish signal. When the closing prices are lower than the opening prices across all four timeframes, it indicates a bearish signal. 

When the signal is bullish, it goes long. When the signal is bearish, it goes short. After entering, KC channel is used for dynamic stop loss.

Specifically, the strategy compares the opening prices and closing prices across different timeframes to determine the trend direction. If closing price is higher than opening price, the timeframe is considered bullish and plotted in green. If closing price is lower than opening price, the timeframe is considered bearish and plotted in red.

When all four timeframes agree on a bullish signal, the strategy will open a long position. When all four timeframes agree on a bearish signal, the strategy will open a short position. It will exit when hit the stop loss or the trend reverses.

## Advantages

1. Using multiple timeframes to confirm trends can effectively filter false breakouts and determine trend direction. 

2. Dynamic stop loss can maximize capital protection.

3. Strict entry criteria reduces unnecessary trades and slippage costs. 

4. Combining multiple timeframes balances profit speed and stability.

## Risks

1. Entry criteria may be too strict, missing some opportunities.

2. Improper stop loss setting may be too aggressive or conservative.  

3. Inappropriate timeframe selections may not align with longer or shorter term trends.

4. Sudden reversals from events may not trigger stop loss.

## Enhancement Areas

1. Optimize timeframe selections to balance profit speed and stability.  

2. Test different parameter settings to optimize stop loss levels.

3. Add machine learning algorithms to assist in judging reversal points.

4. Monitor significant events to avoid losses from sudden reversals.

## Summary

This strategy integrates judgments across multiple timeframes, with strict entry criteria and dynamic stops, aiming for steady returns. It has the risk of missing opportunities and improper risk control. Next step is to continue optimizing parameters for higher stability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|D|Timeframe 1|
|v_input_2|10D|Timeframe 2|
|v_input_3|15D|Timeframe 3|
|v_input_4|30D|Timeframe 4|
|v_input_5|20|KC Length|
|v_input_6|1.5|KC MultFactor|
|v_input_7|20|BB Length|
|v_input_8|true|Contract/Share Amount|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-19 00:00:00
end: 2024-02-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("[RichG] Easy MTF Strategy v1.1", overlay=false)

TF_1_time = input("D", "Timeframe 1")
TF_2_time = input("10D", "Timeframe 2")
TF_3_time = input("15D", "Timeframe 3")
TF_4_time = input("30D", "Timeframe 4")
lengthKC=input(20, title="KC Length")
multKC = input(1.5, title="KC MultFactor")
lengthBB=input(20, title="BB Length")
transaction_size = input(1, "Contract/Share Amount")

src = close, len = 20


out = sma(src, len)
width = 5
upcolor = green
downcolor = red
neutralcolor = blue
linestyle = line


kc() =>
    ma = sma(close, lengthKC)
    range = tr
    rangema = sma(range, lengthKC)
    upperKC = ma + rangema * multKC
    lowerKC = ma - rangema * multKC
    [lowerKC, upperKC] 

 
bb() =>
    source = close 
    basis = sma(source, lengthBB)
    dev = multKC * stdev(source, lengthBB)
    upperBB = basis + dev
    lowerBB = basis - dev
    [upperBB, lowerBB]

TF_1 = request.security(syminfo.tickerid, TF_1_time, open) < request.security(syminfo.tickerid, TF_1_time, close) ? true:false
TF_1_color = TF_1 ? upcolor:downcolor

TF_2 = request.security(syminfo.tickerid, TF_2_time, open) < request.security(syminfo.tickerid, TF_2_time, close) ? true:false
TF_2_color = TF_2 ? upcolor:downcolor

TF_3 = request.security(syminfo.tickerid, TF_3_time, open) < request.security(syminfo.tickerid, TF_3_time, close) ? true:false
TF_3_color = TF_3 ? upcolor:downcolor


TF_4 = request.security(syminfo.tickerid, TF_4_time, open) < request.security(syminfo.tickerid, TF_4_time, close) ? true:false
TF_4_color = TF_4 ? upcolor:downcolor

TF_global = TF_1 and TF_2 and TF_3 and TF_4 
TF_global_bear = TF_1 == false and TF_2 == false and TF_3 == false and TF_4 == false
TF_global_color = TF_global ? green : TF_global_bear ? red : white
TF_trigger_width = TF_global ? 6 : width

plot(1, style=linestyle, linewidth=width, color=TF_1_color)
plot(5, style=linestyle, linewidth=width, color=TF_2_color)
plot(10, style=linestyle, linewidth=width, color=TF_3_color)
plot(15, style=linestyle, linewidth=width, color=TF_4_color)
plot(25, style=linestyle, linewidth=4, color=TF_global_color)    

exitCondition_Long = TF_global_bear 
exitCondition_Short = TF_global

longCondition = TF_global
if (longCondition)
    strategy.entry("MTF_Long", strategy.long, qty=transaction_size)

shortCondition = TF_global_bear
if (shortCondition)
    strategy.entry("MTF_Short", strategy.short, qty=transaction_size)

[kc_lower,kc_upper] = kc()

strategy.close("MTF_Long", when=close < kc_upper)
strategy.close("MTF_Short", when=close > kc_lower)

```

> Detail

https://www.fmz.com/strategy/442089

> Last Modified

2024-02-19 11:13:22
