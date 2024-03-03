
> Name

双Donchian通道突破策略Dual-Donchian-Channel-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10d8acc7a960c28685b.png)
[trans]
## 概述
双Donchian通道突破策略(Dual Donchian Channel Breakout Strategy)是一种基于Donchian通道的突破交易策略。它利用快速和慢速两个Donchian通道构建多头和空头交易信号。当价格突破慢速通道时开仓做多或做空,当价格重新突破快速通道时平仓。该策略同时设置了止盈和止损条件。

## 策略原理

双Donchian通道突破策略基于两个参数:**慢速Donchian通道周期**和**快速Donchian通道周期**。策略首先计算两个Donchian通道的上轨和下轨。

- 慢速Donchian通道周期默认为50根K线,反映了较长期的趋势。 
- 快速Donchian通道周期默认为30根K线,反映了较短期的趋势变化。

多头入场信号是**价格突破上轨**且**波动率大于阈值**。空头入场信号则是**价格突破下轨**且**波动率大于阈值**。

多头止损平仓信号是价格重新**突破下轨**。空头止损平仓信号是价格重新**突破上轨**。

该策略同时设置了**止盈**退出条件。默认设置为止盈比例为2%,即价格变动达到2%时止盈一半仓位。

## 优势分析

双Donchian通道突破策略具有以下优势:

1. 使用双通道设计,能捕捉较长线和较短线的趋势信号,实现更准确的入场。

2. 波动率条件避免了横盘市的频繁交易。

3. 止盈和止损设置全面,可以锁定部分利润,也可以减少损失。

4. 策略逻辑简单清晰,容易理解和实现。

5. 可自定义参数,适应不同品种和交易偏好。

## 风险分析

双Donchian通道突破策略也存在一定的风险:

1. 双通道设计较为敏感,容易产生错误信号。可以适当拓宽通道范围或调整波动率参数来减少错误信号。

2. 剧烈行情中止损可能触发过于频繁。可以设置交易次数上限或扩大止损幅度。 

3. 固定比例止盈无法最大限度锁定利润。可以考虑动态跟踪止盈或人工干预确定止盈价格。

4. 回测外的实盘情况可能与预期不符,应提前充分验证,必要时调整参数。

## 优化方向  

双Donchian通道突破策略可从以下几个方面进行优化:

1. 测试更多周期参数组合,找到最佳参数。

2. 尝试不同的波动率计算方法,如ATR,寻找最稳定的参数。

3. 设置开仓次数限制,避免趋势末期打反弹带来损失。

4. 尝试动态跟踪止盈,实现更高的单笔利润。

5. 结合其他指标过滤入场信号,提高决策准确性。例如结合成交量指标.

6. 优化资金管理策略,如固定份额、凯利公式等,控制更好的风险收益比。

## 总结

双Donchian通道突破策略整体来说是一种优秀的趋势跟踪策略。它同时兼具趋势识别能力和反转防护能力。通过参数优化和规则完善,能够适应大部分品种,在多种市场中 profitable trading。该策略简单实用,值得量化交易者学习和应用。

||

## Overview

The Dual Donchian Channel Breakout Strategy is a breakout trading strategy based on Donchian Channels. It uses fast and slow Donchian Channels to construct long and short trading signals. When the price breaks through the slow channel, open long or short positions. When the price breaks back through the fast channel, close positions. The strategy also sets take profit and stop loss conditions.

## Strategy Principle 

The Dual Donchian Channel Breakout Strategy is based on two parameters: **Slow Donchian Channel Period** and **Fast Donchian Channel Period**. The strategy first calculates the upper and lower bands of the two Donchian Channels.

- The default slow Donchian channel period is 50 bars, reflecting longer term trends.
- The default fast Donchian channel period is 30 bars, reflecting shorter term trend changes.

The long entry signal is a **breakout above the upper band** with **volatility greater than the threshold**. The short entry signal is a **breakdown below the lower band** with **volatility greater than the threshold**. 

The long stop loss exit signal is a **breakdown below the lower band**. The short stop loss exit signal is a **breakout above the upper band**.

The strategy also sets **take profit** exit conditions. The default take profit ratio is 2%, that is, take profit half position when price movement reaches 2%.

## Advantage Analysis

The Dual Donchian Channel Breakout Strategy has the following advantages:

1. The dual channel design can capture trend signals from both longer and shorter timeframes, allowing more accurate entries.

2. The volatility condition avoids frequent trading in range-bound markets. 

3. Comprehensive take profit and stop loss settings lock in partial profits and reduce losses.

4. Simple and clear strategy logic, easy to understand and implement.

5. Customizable parameters suit different products and trading preferences.

## Risk Analysis

The Dual Donchian Channel Breakout Strategy also has some risks:

1. The dual channel design is sensitive and can generate false signals. Wider channels or adjusted volatility parameters may reduce false signals.

2. In volatile markets, stop loss may trigger too frequently. Consider setting a limit on number of trades or widening stop loss range.

3. Fixed percentage take profit fails to maximize profits. Consider dynamic or manual intervention for optimal take profit pricing.  

4. Real trading performance may differ from backtest expectations. Requires thorough validation and parameter adjustments if needed.

## Optimization Directions

The Dual Donchian Channel Breakout Strategy can be optimized in several aspects:

1. Test more period combinations to find optimal parameters.

2. Try different volatility measures like ATR to find the most stable metric.

3. Set a limit on number of entries to avoid losses at end of trends.  

4. Try dynamic take profit for higher single trade profit.

5. Incorporate other indicators to filter entries and improve accuracy, e.g. volume.

6. Optimize money management models like fixed fractional position sizing for better risk control.

## Conclusion

In conclusion, the Dual Donchian Channel Breakout Strategy is an excellent trend following strategy. It combines both trend identification and reversal protection capabilities. With parameter optimization and rule refinement, it can be profitable across most products and market conditions. The strategy is simple and practical, worth learning and applying for quantitative traders.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|50|(?Conditions)Slow Donchian|
|v_input_int_2|30|Fast Donchian|
|v_input_int_3|3|Volatility (%)|
|v_input_bool_1|true|(?Strategy)Long Position On/Off|
|v_input_float_1|2|Long TP1 (%)|
|v_input_bool_2|true|Short Position On/Off|
|v_input_float_2|2|Short TP1 (%)|
|v_input_int_4|50|TP1 Position Amount (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © omererkan

//@version=5
strategy(title="Double Donchian Channel Breakout", overlay=true, initial_capital = 1000, commission_value = 0.05, default_qty_value = 100, default_qty_type = strategy.percent_of_equity)

// Donchian Channels
slowLen = input.int(50, title="Slow Donchian", group = "Conditions")
fastLen = input.int(30, title="Fast Donchian", group = "Conditions")

// Volatility Calculated as a percentage
volatility = input.int(3, title="Volatility (%)", group = "Conditions")

// Long positions
long = input.bool(true, "Long Position On/Off", group = "Strategy")
longProfitPerc = input.float(2, title="Long TP1 (%)", group = "Strategy", minval=0.0, step=0.1) * 0.01

// Short positions
short = input.bool(true, "Short Position On/Off", group = "Strategy")
shortProfitPerc = input.float(2, title="Short TP1 (%)", group = "Strategy", minval=0.0, step=0.1) * 0.01

// First take profit point for positions
TP1Yuzde =input.int(50, title = "TP1 Position Amount (%)", group = "Strategy")

// Slow Donchian Calculated
ubSlow = ta.highest(high, slowLen)[1]
lbSlow = ta.lowest(low, slowLen)[1]

// Fast Donchian Calculated
ubFast = ta.highest(high, fastLen)[1]
lbFast = ta.lowest(low, fastLen)[1]

// Plot Donchian Channel for entries
plot(ubSlow, color=color.green, linewidth=2, title="Slow DoCh - Upperband")
plot(lbSlow, color=color.green, linewidth=2, title="Slow DoCh - Lowerband")
plot(ubFast, color=color.blue, linewidth=2, title="Fast DoCh - Upperband")
plot(lbFast, color=color.blue, linewidth=2, title="Fast DoCh - Lowerband")

// This calculation, the strategy does not open position in the horizontal market.
fark = (ubSlow - lbSlow) / lbSlow * 100

// Take profit levels
longExitPrice  = strategy.position_avg_price * (1 + longProfitPerc)
shortExitPrice = strategy.position_avg_price * (1 - shortProfitPerc)

// Code long trading conditions
longCondition = ta.crossover(close, ubSlow) and fark > volatility
if longCondition and long == true
    strategy.entry("Long", strategy.long)

// Code short trading conditions
shortCondition = ta.crossunder(close, lbSlow) and fark > volatility
if shortCondition and short == true
    strategy.entry("Short", strategy.short)

// Determine long trading conditions
if strategy.position_size > 0 and ta.crossunder(close, lbFast) 
    strategy.close_all("Close All")

// Determine short trading conditions
if strategy.position_size < 0 and ta.crossover(close, ubFast)
    strategy.close_all("Close All")

// Take Profit Long
if strategy.position_size > 0
    strategy.exit("TP1", "Long", qty_percent = TP1Yuzde, limit = longExitPrice)

// Take Profit Short
if strategy.position_size < 0
    strategy.exit("TP1", "Short", qty_percent = TP1Yuzde, limit = shortExitPrice)
```

> Detail

https://www.fmz.com/strategy/442343

> Last Modified

2024-02-21 11:38:48
