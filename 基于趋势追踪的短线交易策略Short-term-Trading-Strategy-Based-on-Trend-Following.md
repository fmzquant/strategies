
> Name

基于趋势追踪的短线交易策略Short-term-Trading-Strategy-Based-on-Trend-Following

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过识别强劲趋势和有利时机,实现亏损控制的短线交易。策略追踪价格突破简单移动平均线的趋势信号,在RSI超买超卖区发生背离时及时止损止盈,捕捉短期价格涨跌。

## 策略原理 

1. 计算多周期简单移动平均线

    - 分别设置9日线、50日线和100日线的SMA
    
    - 短周期线上穿长周期线判断趋势方向

2. RSI指标判断超买超卖

    - 设置RSI长度为14周期
    
    - RSI高于70为超买,低于30为超卖区
    
3. 价格突破9日线时入场

    - 价格向上突破9日线时做多
    
    - 价格向下跌破9日线时做空
    
4. RSI背离 THENJournal形成时止损止盈

    - RSI背离价格作用停损

    - RSI达到设定参数则止盈

## 优势分析

- 追踪短期趋势,适合高频交易

- 移动平均组合判断趋势方向,避免错误交易

- RSI指标判断时机,可有效控制风险 

- 灵活止损止盈,锁定短线获利

- 结合指标信号,提高策略稳定性

## 风险分析

- 短期趋势判断可能失误,追高杀跌

- RSI产生假信号,扩大亏损

- 止损止盈参数设置不当,减少获利或扩大损失

- 交易频率过高,增加交易成本和滑点

- 参数失效和异常市场影响策略效果

- 优化参数设定,严格止损,考虑成本控制

## 优化方向

- 测试不同移动平均线组合,优化判断效果

- 考虑STOCH等其他指标验证RSI信号

- 加入机器学习判断突破的有效性

- 针对不同品种和交易时段调整参数

- 优化止损止盈逻辑,实现动态跟踪

- 考虑整合自动调参机制

## 总结

该策略整合均线指标和RSI指标优势,实现保守的短线交易策略。通过参数优化、信号验证、风险控制等使策略更完善,可适应市场的变化获得持续效果。可继续扩展移动平均线组合、加入机器学习等方式提升策略效果,在不断优化中趋于成熟。

||


## Overview

This strategy identifies strong trends and favorable timing for short-term trading with loss control. It tracks price breakouts of simple moving averages as trend signals and sets stop loss/take profit based on RSI divergences to capture short-term price movements.

## Strategy Logic

1. Calculating multi-period simple moving averages  

    - Setting 9-day, 50-day and 100-day SMAs
    
    - Short SMA crossing long SMA indicates trend direction

2. Judging overbought/oversold levels using RSI

    - RSI length is 14 periods
    
    - RSI above 70 is overbought, below 30 is oversold
    
3. Entering trades when price breaks 9-day SMA

    - Go long when price breaks above 9-day SMA
    
    - Go short when price breaks below 9-day SMA

4. Setting stop loss/take profit based on RSI divergences

    - RSI divergence for stop loss

    - Take profit when RSI reaches preset levels

## Advantage Analysis   

- Captures short-term trends, suitable for high frequency trading

- SMA combos filter trend signals, avoiding bad trades

- RSI helps determine timing, effectively control risks

- Flexible stop loss/take profit locks short-term profits

- Combining indicators improves stability 

## Risk Analysis

- Inaccurate short-term trend judgment causes chasing

- False RSI signals expand losses

- Improper stop loss/take profit settings reduce profit or magnify losses

- High trading frequency increases costs and slippage 

- Ineffective parameters and abnormal markets impact strategy

- Optimize parameters, strict stop loss, manage costs

## Optimization Directions

- Test different SMA combos to improve trend judgment 

- Consider additional indicators like STOCH to verify RSI signals

- Employ machine learning to determine valid breakouts

- Adjust parameters for different products and sessions

- Optimize stop loss/take profit logic for dynamic trailing

- Explore auto parameter tuning mechanisms

## Conclusion

This strategy combines SMA and RSI for a conservative short-term trading approach. Fine-tuning parameters, validating signals, controlling risks makes it more robust and adaptive. There is room for improvement by exploring more SMA combos, adding machine learning models etc. Continuous optimization will lead to further maturity.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|10|From Day|
|v_input_3|2019|From Year|
|v_input_4|true|Thru Month|
|v_input_5|true|Thru Day|
|v_input_6|2112|Thru Year|
|v_input_7|true|Show Date Range|
|v_input_8|9|v_input_8|
|v_input_9|50|v_input_9|
|v_input_10|100|v_input_10|
|v_input_11|70|TP|
|v_input_12|30|SL|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-27 00:00:00
end: 2023-09-26 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Coinrule

//@version=4
strategy(shorttitle='Maximized Scalping On Trend',title='Maximized Scalping On Trend (by Coinrule)', overlay=true, initial_capital = 1000, process_orders_on_close=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 30, commission_type=strategy.commission.percent, commission_value=0.1)

//Backtest dates
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 10,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 2019, title = "From Year",       type = input.integer, minval = 1970)
thruMonth = input(defval = 1,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12)
thruDay   = input(defval = 1,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31)
thruYear  = input(defval = 2112, title = "Thru Year",       type = input.integer, minval = 1970)

showDate  = input(defval = true, title = "Show Date Range", type = input.bool)

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => true      // create function "within window of time"

//MA inputs and calculations
movingaverage_fast = sma(close, input(9))
movingaverage_mid= sma(close, input(50))
movingaverage_slow = sma(close, input (100))


//Trend situation
Bullish= cross(close, movingaverage_fast)

Momentum = movingaverage_mid > movingaverage_slow

// RSI inputs and calculations
lengthRSI = 14
RSI = rsi(close, lengthRSI)

//Entry
strategy.entry(id="long", long = true, when = Bullish and Momentum and RSI > 50)

//Exit

TP = input(70)
SL =input(30)
longTakeProfit  = RSI > TP
longStopPrice = RSI < SL

strategy.close("long", when = longStopPrice or longTakeProfit and window())

plot(movingaverage_fast, color=color.black, linewidth=2 )
plot(movingaverage_mid, color=color.orange, linewidth=2)
plot(movingaverage_slow, color=color.purple, linewidth=2)

```

> Detail

https://www.fmz.com/strategy/427996

> Last Modified

2023-09-27 16:56:34
