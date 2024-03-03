
> Name

基于双均线金叉死叉策略Dual-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1155b1ddb5d164aa192.png)
[trans]

## 概述
该策略是一种典型的移动平均线交叉策略,它同时使用两组均线,一组快均线,一组慢均线。当快均线上穿慢均线时产生买入信号;当快均线下穿慢均线时产生卖出信号。该策略同时使用EMA和SMA两种均线,组成两组快慢均线,快均线采用EMA计算,慢均线采用SMA计算。通过多组均线的确认,可以过滤掉一些假信号,提高信号的可靠性。

## 策略原理

该策略的主要逻辑是基于两组快慢均线的交叉来判断入场和出场时机。

首先,分别计算两组快慢均线:

- 第一组快速EMA,长度为8天
- 第二组快速EMA,长度为21天  
- 第一组慢速SMA,长度为50天
- 第二组慢速SMA,长度为200天

然后,判断快速EMA是否已经金叉或死叉慢速SMA:

- 如果8日EMA上穿50日SMA,为金叉信号
- 如果8日EMA下穿50日SMA,为死叉信号

为了过滤假信号,增加了第二组EMA与SMA的确认:  

- 只有当21日EMA也已经上穿或下穿50日SMA时,才会发出交易信号

这样,通过两组快慢均线的确认,可以过滤掉许多假信号,从而提高信号的可靠性。

当判断产生买入信号时,做多入场;当判断产生卖出信号时,做空入场。

此外,该策略还设置了止盈止损逻辑。持仓时,会根据设置的盈亏比例来跟踪止盈和止损价格。

## 优势分析

该策略具有以下几个优势:

1. 使用双均线组合,可以有效过滤假信号,提高信号准确率
2. 采用EMA和SMA的组合,结合了EMA对最新价格 변化的敏感性和SMA的平滑性
3. 设置止盈止损,可以锁定利润,控制风险
4. 简单明了的原理,容易理解和修改
5. 可自定义参数,适用于不同市场环境

## 风险分析

该策略也存在一些风险:  

1. 均线策略容易产生较多震荡小利润和小亏损
2. 在趋势剧烈变化时,可能会产生较大亏损
3. 参数设置不当也会使盈利成效不佳

为了控制风险,建议:

1. 适当调整参数组合,使之适应不同市场环境
2. 根据回测结果优化参数,使策略更加适应目标市场  
3. 设置止损以控制单笔亏损大小

## 优化方向  

该策略还可从以下几个方面进行优化:  

1. 测试更多的快慢均线组合,寻找最佳参数组合
2. 利用机器学习或遗传算法自动寻优参数
3. 增加趋势判断指标,避免逆势交易
4. 增加移动止损或游移止损,更好地锁定利润
5. 结合交易量或波动性指标加强信号的可靠性
6. 多策略/多品种组合,利用非相关性分散风险

## 总结  

整体来说,该双均线金叉死叉策略通过快慢均线的交叉形成交易信号,设置止盈止损控制风险,具有简单、直观、容易实现等特点。该策略可根据市场和需求进行参数优化,也可与其他技术指标或策略组合使用,在量化交易中具有很好的实用性。

||

## Overview
This strategy is a typical moving average crossover strategy that uses two sets of moving averages, one fast and one slow. When the fast moving average crosses over the slow moving average, a buy signal is generated. When the fast crosses below the slow, a sell signal is generated. The strategy uses both EMA and SMA for the moving averages, with EMAs as the fast lines and SMAs as the slow lines. Using multiple moving averages can help filter out false signals and improve reliability. 

## Strategy Logic

The core logic relies on crossovers between fast and slow moving average lines to determine entries and exits.

Specifically, two sets of fast and slow moving averages are calculated:

- 1st Fast EMA, length 8 days
- 2nd Fast EMA, length 21 days
- 1st Slow SMA, length 50 days 
- 2nd Slow SMA, length 200 days

Crossovers are then checked between the fast EMAs and slow SMAs:

- If 8-day EMA crosses over 50-day SMA, golden cross signal
- If 8-day EMA crosses below 50-day SMA, death cross signal

To filter false signals, a second EMA/SMA crossover is required for confirmation:

- Only when 21-day EMA also crosses over/under 50-day SMA, trading signal is triggered

By requiring two fast/slow MA crossovers, many false signals can be filtered out and reliability improved.

When buy signal triggers, go long. When sell signal triggers, go short.  

The strategy also sets profit taking and stop loss based on input percentage from entry price once in a position.

## Advantage Analysis

The advantages of this strategy include:

1. Dual MA design filters false signals and improves accuracy 
2. Combination of EMA and SMA utilizes EMA's sensitivity and SMA's smoothness
3. Take profit and stop loss lock in profits and control risks
4. Simple logic easy to understand and modify
5. Customizable parameters suit different market environments

## Risk Analysis

Risks of the strategy:

1. MA strats tend to produce lots of small wins/losses in choppy markets
2. Can face large losses in strong trending markets
3. Poor parameter tuning also leads to underperformance

To control risks:

1. Adjust parameters for different market conditions
2. Optimize based on backtests to fit target market
3. Use stop loss to limit loss size

## Improvement Directions

The strategy can be further optimized by:

1. Testing more fast/slow MA combinations to find best
2. Using machine learning or genetic algos to auto optimize
3. Adding trend filter to avoid counter-trend trades 
4. Adding trailing stop loss to lock in profits
5. Incorporating volume or volatility filters to confirm signals
6. Combining with other strats/products to utilize low correlation

## Conclusion
In summary, the dual MA crossover strategy generates signals with fast/slow MA crosses, sets take profit and stop loss to control risks, and is simple, intuitive and easy to implement. The parameters can be tuned and combined with other indicators for better performance. It has great utility in quantitative trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|8|Length|
|v_input_2|true|EMA|
|v_input_3|21|Length|
|v_input_4|true|EMA|
|v_input_5|50|Length|
|v_input_6|true|SMA|
|v_input_7|200|Length|
|v_input_8|true|SMA|
|v_input_9|8|Profit/lost %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-20 00:00:00
end: 2024-02-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © JMLSlop

//@version=4

src = close
strategy("Crossover moving averages", shorttitle="Cross MA-EMA", overlay=true, calc_on_order_fills=false)

// first fast EMA
len = input(8, "Length", type=input.integer, minval=1)
doma1 = input(true, title="EMA")
out1 = ema(src, len) 

//Second fast EMA
len2 = input(21, minval=1, title="Length")
doma2 = input(true, title="EMA")
out2 = ema(src, len2)

//First slow MA
len3 = input(50, minval=1, title="Length")
doma3 = input(true, title="SMA")
out3 = sma(src, len3)

//Second slow MA
len4 = input(200, minval=1, title="Length")
doma4 = input(true, title="SMA")
out4 = sma(src, len4)

// Profit
profit = input(8, "Profit/lost %", type=input.float, minval=1) * 0.01


plot(doma1 and out1 ? out1: na, color=color.blue, linewidth=1, title="1st EMA")
plot(doma2 and out2 ? out2: na, color=color.red, linewidth=1, title="2nd EMA")
plot(doma3 and out3 ? out3: na, color=color.green, linewidth=2, title="1st MA")
plot(doma4 and out4 ? out4: na, color=color.orange, linewidth=3, title="2nd MA")

// Orders config
takeProfitPrice =
     (strategy.position_size > 0) ? strategy.position_avg_price + open*profit : (strategy.position_size < 0) ? strategy.position_avg_price - (open*profit) : na

longStopPrice  = strategy.position_avg_price * (1 - profit)
shortStopPrice = strategy.position_avg_price * (1 + profit)

longCondition2 = (out2>out3 and (crossover(out1, out4) or crossover(out1[1], out4[1]) or crossover(out1[2], out4[2]) or (crossover(out1[3], out4[3]))) or (out2>out3 and (crossover(out1, out3) or crossover(out1[1], out3[1]) or crossover(out1[2], out3[2]) or crossover(out1[3], out3[3]))))
if (longCondition2)
    strategy.entry("Enter L", strategy.long)

shortCondition2 = (out2<out3 and (crossunder(out1, out4) or crossunder(out1[1], out4[1]) or crossunder(out1[2], out4[2]) or crossunder(out1[3], out4[3]))) or (out2<out3 and (crossunder(out1, out3) or crossunder(out1[1], out3[1]) or crossunder(out1[2], out3[2]) or crossunder(out1[3], out3[3])))
if (shortCondition2)
    strategy.entry("Enter S", strategy.short)


if (strategy.position_size > 0)
    strategy.exit("Exit L", limit=takeProfitPrice, stop=longStopPrice)

if (strategy.position_size < 0)
    strategy.exit("Exit S", limit=takeProfitPrice, stop=shortStopPrice)

```

> Detail

https://www.fmz.com/strategy/442957

> Last Modified

2024-02-27 16:21:02
