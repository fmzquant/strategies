
> Name

基于EMA和斐波那契回撤的下跌趋势策略Short-term-Down-Trend-Strategy-Based-on-EMA-and-Adaptive-Fibonacci-Retracement

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略运用EMA指标判断趋势方向,并结合自适应斐波那契回撤自动确定反转点,实现低买高卖,捕捉下跌趋势行情。策略操作频繁,适合短线交易。

## 策略原理

1. 使用9日EMA和21日EMA形成金叉死叉,判断趋势方向。21日EMA下穿55日EMA视为下跌趋势启动信号。

2. 设置自适应斐波那契回撤指标,长度为100周期,根据最近价格震荡范围自动确定关键回撤比例。

3. 当价格突破0.236斐波那契回撤时,视为反转信号,平仓原有仓位。

4. 当9日EMA下穿21日EMA,并且价格低于自适应斐波那契最高点时,做空入场。

5. 多头获利退出条件为突破200日EMA。空头止损退出条件为突破0.236斐波那契回撤。

## 策略优势

- 使用EMA判断趋势方向,操作信号简单清晰

- 自适应斐波那契回撤,不需要人工确定参数

- 策略操作频繁,可捕捉短线变化,实现高频策略

- 利用关键回撤点确定反转,及时止损

- 可配置参数,优化策略以适应不同周期

## 策略风险

- EMA指标存在滞后,需要组合其他指标进行确认

- 自适应斐波那契可能过度优化,回撤点不稳定

- 高频交易增加交易成本和滑点成本

- 无法有效过滤震荡趋势,存在过多错误信号

- 回撤管理和盈亏比控制有待改进

## 策略优化方向

- 增加量能指标,避免量价背离所导致的失误信号

- 优化EMA周期参数,使其更符合当前市场环境

- 设置动态止损以更好控制风险

- 结合趋势强弱指标,避免在震荡期反复交易

- 考虑实际交易成本的影响,设置最小止盈幅度

## 总结

本策略利用EMA判别趋势方向,并使用自适应斐波那契回撤动态确定反转点,可自动适应不同市场变化。但该策略更依赖指标提示,缺乏趋势分段和波浪判断逻辑,优化空间较大。整体来说,作为一个高频短线交易策略,可以捕捉较快的价格变动,但需要交易者承担频繁停损带来的风险,以及防范过度交易的问题。

|| 

## Overview

This strategy uses EMA to determine trend direction and adaptive Fibonacci retracement to automatically identify reversal points, aiming to sell high and buy low by catching down trends. It involves frequent trading suitable for short-term trading.

## Strategy Logic 

1. Use 9-day EMA and 21-day EMA golden cross and death cross to determine trend direction. 21-day EMA crossing below 55-day EMA signals a down trend start.

2. Implement adaptive Fibonacci retracement with 100 periods to automatically determine key retracement levels based on recent price swings. 

3. Price breaking 0.236 Fibonacci retracement indicates a reversal and closes existing position.

4. When 9-day EMA crosses below 21-day EMA, and price is lower than adaptive Fibonacci high, go short.

5. Long profit target is a crossover above 200-day EMA. Short stop loss is breaking 0.236 Fibonacci retracement.

## Advantages

- EMA gives clear trend signals, easy to implement

- Adaptive Fibonacci avoids manual parameter tuning

- Frequent trading catches short-term moves for high frequency strategies

- Key retracement levels for timely stop loss 

- Configurable parameters for optimization across cycles

## Risks

- EMA lagging requires confirmation from other indicators

- Adaptive Fibonacci risks overfitting with unstable levels

- High frequency trading increases costs from commissions and slippage

- Ineffective filtering of range-bound trends leads to false signals

- Needs improvement in drawdown management and risk-reward control

## Enhancement

- Add volume indicators to avoid false signals from price-volume divergence

- Optimize EMA periods to better fit current market conditions

- Implement dynamic stop loss for better risk control

- Incorporate trend strength index to avoid whipsaws

- Consider trading costs impact and set minimum profit target

## Conclusion

This strategy identifies trend direction with EMA and determines reversal levels dynamically using adaptive Fibonacci retracement, which automatically adapts to different market conditions. But it relies more on indicator cues without trend segmentation and Elliott Wave logic, leaving room for optimization. Overall, as a high frequency short-term trading strategy, it can capture fast price changes but involves risks of frequent stop loss and overtrading that traders need to manage.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|100|(?Automatic Fibonacci Retracement)Fibonacci Length|
|v_input_int_2|true|Show Last|
|v_input_int_3|5|Offset Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-21 00:00:00
end: 2023-09-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © CheatCode1

//@version=5
strategy("CC-Trend strategy 2", overlay=true, initial_capital = 10000, commission_type = strategy.commission.percent, commission_value = 0.01, default_qty_type =  strategy.percent_of_equity, default_qty_value = 100 )
ema9 = ta.ema(close, 9)
ema21 = ta.ema(close, 21)
ema55 = ta.ema(close, 55)
ema200 = ta.ema(close, 200)


plot(ema200, '22', color.blue, 2)

FibL = input.int(100, 'Fibonacci Length', 1, 500, group = 'Automatic Fibonacci Retracement')
len1 = input.int(1, 'Show Last', 0, 1000, group = 'Automatic Fibonacci Retracement')
len2 = input.int(5, 'Offset Length', 0, 1000, group = 'Automatic Fibonacci Retracement')

highF = ta.highest(ema55 >= ema9 ? ema55:ema9, FibL)
lowF = ta.lowest(ema55 >= ema9 ? ema9:ema55, FibL)
AvgFib = highF - lowF

//Fibonacci Executions
LL2 = highF + .618 * AvgFib
LL1 = highF + .272 * AvgFib
L1 = highF
L236 = highF - 0.236 * AvgFib
L382 = highF - 0.382 * AvgFib
Mid =  highF - 0.50 * AvgFib
S382 = lowF + 0.382 * AvgFib
S236 = lowF + 0.236 * AvgFib
S1 = lowF
SS1 = lowF - .272 * AvgFib
SS2 = lowF - .618 * AvgFib
//Fibonacci Plot's


high2FP = plot(LL2, 'Highe2', color.red,offset = len2, show_last = len1, trackprice = true)
high1FP = plot(LL1, 'Highe1', color.red,offset = len2, show_last = len1, trackprice = true)
highFP = plot(highF, 'High', color.red,offset = len2, show_last = len1, trackprice = true)
L236P = plot(L236, "0.764", #ED381C, offset = len2, show_last = len1, trackprice = true )
L382P = plot(L382, "0.618", color.white,offset = len2, show_last = len1, trackprice = true )
MidP = plot(Mid, "0.5", color.orange,offset = len2, show_last = len1, trackprice = true )
S382P = plot(S382, "0.382", color.yellow ,offset = len2, show_last = len1, trackprice = true)
S236P = plot(S236, "0.236", color.lime ,offset = len2, show_last = len1, trackprice = true)
lowFP = plot(lowF, 'Low', color.green,offset = len2, show_last = len1, trackprice = true)
low1FP = plot(SS1, 'Lowe1', color.green,offset = len2, show_last = len1, trackprice = true)
low2FP = plot(SS2, 'Lowe2', color.green,offset = len2, show_last = len1, trackprice = true)

plot(ema9, '22', color.yellow, 2)

plot(ema55, '55', color.aqua, 2)

plot(ema200, '200', color.maroon, 2)



shortCondition = close[1] < highF and ema21 < ema55
if (shortCondition)
    strategy.entry("Short", strategy.short)

shorttp = ta.crossover(close, ema200) and strategy.openprofit >= 0
if (shorttp)
    strategy.close('Short', 'Short TP', qty_percent = 100)

shortclose2 = close[1] > L236 and not (shortCondition) 
if(shortclose2)
    strategy.close('Short', 'Short RM', qty_percent = 100)
```

> Detail

https://www.fmz.com/strategy/427528

> Last Modified

2023-09-21 21:36:16
