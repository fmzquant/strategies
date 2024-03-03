
> Name

双唐奇安通道突破策略Double-Donchian-Channel-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b56a20c57f829a6d23.png)
[trans]

## 概述

双唐奇安通道突破策略是一种基于唐奇安通道的量化交易策略。该策略利用快速唐奇安通道和慢速唐奇安通道的组合,实现低风险高收益的突破交易。当价格突破慢速通道时入场做多/做空,当价格重新突破快速通道时离场止损或止盈。

## 策略原理  

该策略主要基于两个唐奇安通道,包括一个周期较长的慢速唐奇安通道和一个周期较短的快速唐奇安通道。

慢速唐奇安通道的周期较长,可以有效滤除市场噪音,其突破信号具有较高的可靠性。当价格突破慢速通道上轨时,做多入场;当价格跌破慢速通道下轨时,做空入场。

快速唐奇安通道的周期较短,可以快速响应短期价格变动。当价格重新突破这个通道时,说明趋势发生转折,需要立即止损或止盈离场。 

此外,还设置了波动率条件作为策略的入场过滤器。只有当价格波动超过事先设置的阈值百分比时,才会触发入场。这可以避免在横盘整理中频繁出入场。

## 优势分析

- 利用双通道设定了两道防线,可以有效控制风险
- 快慢通道配合运用,实现高效的趋势捕捉
- 波动率过滤机制可以减少无效交易
- 兼具追踪趋势和防止范畴缩小的优点
- 规则清晰简单,容易理解掌握

## 风险分析

- 行情剧烈震荡时,止损点可能被突破,造成较大亏损
- 参数设置(如通道周期长度)不当可能导致策略效果打折
- 交易费用也会对盈利造成一定影响
- 需要关注重大事件导致的行情跳空

可以通过优化参数,合理设置止损点,关注重大事件等措施来减少这些风险。

## 优化方向  

- 测试不同的唐奇安通道周期参数组合
- 优化波动率参数,寻找最佳的入场时机
- 添加趋势判断指标,避免逆势交易
- 结合股票基本面选择标的
- 调整止损机制,防止亏损扩大

## 总结

双唐奇安通道突破策略整体而言是一种相对稳定可靠的趋势追踪策略。它同时兼具趋势捕捉和风险控制的优点,适合作为多种股票交易策略的基础模块。通过参数优化和规则完善,可以进一步提升该策略的效果。

||

## Overview

The Double Donchian Channel Breakout strategy is a quantitative trading strategy based on the Donchian Channel. This strategy uses a combination of fast and slow Donchian Channels to achieve low-risk high-return breakout trading. It goes long/short when price breaks out of the slow channel and exits at a stop loss or take profit when price breaks back through the fast channel.

## Strategy Logic

This strategy mainly utilizes two Donchian Channels, including a slower channel with longer period and a faster channel with shorter period. 

The slow Donchian Channel has a longer period which can effectively filter out market noise, making its breakout signals more reliable. The strategy goes long when price breaks above the upper band of the slow channel and goes short when price breaks below the lower band.  

The fast Donchian Channel has a shorter period which can quickly respond to short-term price fluctuations. When price breaks back through this channel, it signals a trend reversal and prompts an exit for stop loss or take profit.

In addition, a volatility condition is set as a filter for entry signals. The strategy will only trigger entry when price movement exceeds a predetermined percentage threshold. This avoids frequent whipsaws during range-bound consolidations.

## Advantage Analysis 

- Dual-channel mechanism sets two lines of defense and effectively controls risk
- Combination of fast and slow channels efficiently captures trends  
- Volatility filter reduces ineffective trades
- Simultaneously tracks trends and prevents overfitting
- Simple and clear logic, easy to understand and master

## Risk Analysis

- Violent price swings may penetrate stop loss and cause heavy losses
- Improper parameter settings (e.g. channel periods) may compromise strategy efficiency 
- Trading costs also erode profits to some extent
- Gap risks around significant events need attention

These risks can be reduced by parameter optimization, reasonable stop loss placement, event awareness etc.

## Optimization Directions

- Test different combinations of Donchian channel periods
- Optimize volatility parameter for best entry timing
- Add trend-checking indicator to avoid counter-trend trades
- Fundamentals-based stock picking  
- Adjust stop loss mechanism to limit losses

## Conclusion

The Double Donchian Channel Breakout strategy is overall a relatively stable and reliable trend-following strategy. It combines the strengths of both trend capture and risk control, making it suitable as a basic module in various stock trading strategies. Further improvements in performance can be expected through parameter tuning and logic refinement.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|50|Slow Donchian|
|v_input_int_2|30|Fast Donchian|
|v_input_int_3|3|Volatility (%)|
|v_input_float_1|2|Long TP1 (%)|
|v_input_float_2|2|Short TP1 (%)|
|v_input_int_4|50|TP1 Position Amount (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-04 00:00:00
end: 2024-02-03 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © omererkan

//@version=5
strategy(title="Double Donchian Channel Breakout", overlay=true, initial_capital = 1000, commission_value = 0.05, default_qty_value = 100, default_qty_type = strategy.percent_of_equity)


slowLen = input.int(50, title="Slow Donchian")
fastLen = input.int(30, title="Fast Donchian")
volatility = input.int(3, title="Volatility (%)")
longProfitPerc = input.float(2, title="Long TP1 (%)", minval=0.0, step=0.1) * 0.01
shortProfitPerc = input.float(2, title="Short TP1 (%)", minval=0.0, step=0.1) * 0.01
TP1Yuzde =input.int(50, title = "TP1 Position Amount (%)")

ubSlow = ta.highest(close, slowLen)[1]
lbSlow = ta.lowest(close, slowLen)[1]

ubFast = ta.highest(close, fastLen)[1]
lbFast = ta.lowest(close, fastLen)[1]

plot(ubSlow, color=color.green, linewidth=2, title="Slow DoCh - Upperband")
plot(lbSlow, color=color.green, linewidth=2, title="Slow DoCh - Lowerband")
plot(ubFast, color=color.blue, linewidth=2, title="Fast DoCh - Upperband")
plot(lbFast, color=color.blue, linewidth=2, title="Fast DoCh - Lowerband")

fark = (ubSlow - lbSlow) / lbSlow * 100

longExitPrice  = strategy.position_avg_price * (1 + longProfitPerc)
shortExitPrice = strategy.position_avg_price * (1 - shortProfitPerc)

longCondition = ta.crossover(close, ubSlow) and fark > volatility
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = ta.crossunder(close, lbSlow) and fark > volatility
if (shortCondition)
    strategy.entry("Short", strategy.short)

if strategy.position_size > 0 and ta.crossunder(close, lbFast) 
    strategy.close("Long", "Close All")

if strategy.position_size < 0 and ta.crossover(close, ubFast)
    strategy.close("Short", "Close All")

// Take Profit
if strategy.position_size > 0
    strategy.exit("TP1", "Long", qty_percent = TP1Yuzde, limit = longExitPrice)

if strategy.position_size < 0
    strategy.exit("TP1", "Short", qty_percent = TP1Yuzde, limit = shortExitPrice)
```

> Detail

https://www.fmz.com/strategy/440949

> Last Modified

2024-02-04 09:42:14
