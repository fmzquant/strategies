
> Name

动态持仓盈利追踪交易策略Dynamic-Trailing-Take-Profit-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11cb99020da15005d3b.png)
[trans]
### 概述

本文主要介绍了一个名为“动态持仓盈利追踪交易策略”的量化交易策略。该策略通过设定一个基于ATR指标的动态出场止盈线,在价格出现突然的有利行情后的1-2根K线内实现快速止盈,防止价格再次调头造成亏损。

### 策略原理

该策略的交易逻辑非常简单清晰。具体来说,它包括以下步骤:

1. 使用14期SMA和28期SMA形式的均线交叉作为做多和做空的信号。当14期均线上穿28期均线时,做多买入;当14期均线下穿28期均线时,做空卖出。

2. 计算ATR指标,并将其与一个乘数相乘,得到动态出场的止盈位置。例如设定ATR长度为7,乘数为1.5,得到的动态止盈通道宽度为7期ATR的1.5倍。

3. 在持仓方向为多头时,将高点加上动态止盈通道宽度,得到做多止盈线。在持仓方向为空头时,将低点减去动态止盈通道宽度,得到做空止盈线。

4. 一旦价格超过该动态止盈线,则立即止盈离场。这可以在价格出现突然的超强行情后的1-2根K线内捕捉到利润。

通过以上步骤,该策略实现了一个简易但高效的持仓盈利追踪和快速止盈的效果。ATR通道为止盈线提供了动态调整的能力,而新增的1BAR条件保证了止盈线只在突发的行情利好情况下启动。这可以有效减少止盈过早离场的情况。

### 优势分析

“动态持仓盈利追踪交易策略”具有以下几个优势:

1. 思路简单清晰,容易理解实现,适合初学者学习。

2. 通过动态ATR止盈,可以自动追踪持仓盈利,避免盈利nodeList。

3. 增加1BAR高低点条件,使止盈仅在超强行情发生后启动,减少假动作。 

4. 可设置不同的ATR长度和乘数,调整止盈力度。

5. 可快速止盈离场,捕捉行情利好。

6. 可扩展性强,可基于该框架轻松实现其他止盈止损策略。

### 风险分析

该策略也存在一些风险,主要包括:

1. ATR突然放大,可能造成止盈过早离场。

2. 无法有效过滤市场噪音,容易被假突破误导。

3. 仅靠均线交叉做决策,对复杂行情无法有效判断。

4. 没有止损机制,无法有效控制亏损。

5. 默认风险参数设置可能不适合所有品种,需要优化。

为降低上述风险,可以从以下几个方面进行优化:

1. 增加过滤机制,结合其他指标过滤假信号。

2. 增加止损策略,严格控制单笔亏损。

3. 利用Walk Forward Analysis方法优化参数。 

4. 为不同品种分别优化参数组合。

5. 增加机器学习算法,实现更智能的决策。

### 优化方向  

根据风险分析,该策略的优化方向主要包括:

1. **增加信号过滤**: 可以在进入信号后,增加其他指标的过滤,例如结合MACD、布林带等指标,避免被噪音误导。

2. **添加止损线**: 增加基于ATR或移动止损的止损线设置,控制单笔亏损。

3. **参数优化**: 通过机器学习等方法,优化ATR长度、ATR乘数等参数的设置。

4. **风险调整**: 根据不同交易品种的特点,调整仓位管理和风险参数。

5. **模型融合**: 将该策略与机器学习、神经网络等其他模型融合,提升决策的准确性。

6. **注入外部干预**:增加人工干预节点,在关键时刻人工确定止盈止损位置。

通过以上几个方向的优化,可以大幅提高该策略的收益稳定性。

### 总结

“动态持仓盈利追踪交易策略”整体来说是一个非常实用的高效止盈策略。它思路清晰易懂,通过动态止盈可以自动追踪盈利,在超强行情中快速止盈。同时该策略也存在一些风险,可以从增加信号过滤、添加止损、参数优化等方面进行改进,使其适应更加复杂的市场环境。总的来说,该策略为我们提供了一个非常好的策略框架,值得进一步研究与应用。

||

### Overview

This article mainly introduces a quantitative trading strategy called "Dynamic Trailing Take Profit Trading Strategy". This strategy sets a dynamic take profit line based on the ATR indicator to realize fast profit taking within 1-2 candles after a sudden favorable price move, avoiding losses when prices turn around again.

### Principles  

The trading logic of this strategy is very simple and clear. Specifically, it includes the following steps:

1. Use the crossover of 14-period SMA and 28-period SMA as the signal for long and short. When 14-period SMA goes above 28-period SMA, go long. When 14-period SMA goes below 28-period SMA, go short.  

2. Calculate the ATR indicator and multiply it by a factor to obtain the dynamic take profit position. For example, set ATR length to 7, multiplier to 1.5, then the width of the dynamic take profit channel is 1.5 times the 7-period ATR.

3. When the position direction is long, add the high price and the dynamic take profit channel width to obtain the long take profit line. When position direction is short, subtract the dynamic take profit channel width from the low price to obtain the short take profit line.  

4. Once the price exceeds this dynamic take profit line, take profit to exit immediately. This can capture profits within 1-2 bars after a sudden strong price move.

Through the above steps, this strategy achieves a simple but efficient effect of profit trailing and fast profit taking. The ATR channel provides the dynamic adjustment capability for the take profit line, while the newly added 1 bar condition ensures that the take profit line is triggered only under sudden favorable market conditions. This can effectively reduce premature exit due to take profit.


### Advantages  

The "Dynamic Trailing Take Profit Trading Strategy" has the following advantages:

1. The idea is simple and clear, easy to understand and implement, suitable for beginners to learn.  

2. Dynamic ATR take profit can automatically trail profits and avoid leaving profits on the table.

3. Adding 1 bar high/low condition prevents take profit from triggering on smaller moves.

4. ATR length and multiplier can be adjusted to tune the degree of profit taking.  

5. Can exit fast to capture favorable price moves.

6. Highly extensible, easy to implement other stop loss/take profit strategies based on this framework.


### Risk Analysis   

There are also some risks with this strategy:

1. Sudden ATR expansion may cause premature take profit exit.  

2. Cannot effectively filter out market noise, prone to false signal.

3. Rely solely on SMA crossover for decision making, ineffective for complex market situations. 

4. No stop loss mechanism to effectively limit losses.

5. Default parameter may not suit all products, optimization needed.

To reduce the above risks, we can optimize from the following aspects:

1. Add filter rules based on other indicators to remove false signals.  

2. Add stop loss strategies to strictly control loss per trade.

3. Optimize parameters using Walk Forward Analysis.

4. Separately optimize parameters for different products. 

5. Increase machine learning models for smarter decisions.


### Optimization Directions   

Based on the risk analysis, the optimization directions mainly include:  

1. **Add signal filter**: Add filter rules based on indicators like MACD, Bollinger Band etc. after signal to avoid noise.

2. **Add stop loss line**: Add stop loss line based on ATR or trailing stop to control per trade loss.

3. **Parameter optimization**: Optimize parameters like ATR Length, ATR Multiplier using machine learning.

4. **Risk tuning**: Tune position sizing, risk parameters based on different products.  

5. **Model fusion**: Combine this strategy with machine learning, neural networks to improve accuracy.  

6. **Manual intervention**: Allow manual override of take profit/stop loss levels at critical moments.

With optimization in above directions, profitability and stability of the strategy can be greatly improved.


### Conclusion  

In summary, the “Dynamic Trailing Take Profit Trading Strategy” is a very practical and efficient take profit strategy. It has a clear and easy to understand idea. Through dynamic take profit, it can automatically trail profits and exit fast during strong trends. Meanwhile, this strategy also has some risks. It can be improved by adding signal filters, stop loss, optimizing parameters etc. to adapt to more complex market environments. Overall, this strategy provides a very good framework worthy of further research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|7|ATR Length|
|v_input_float_1|1.5|ATR Multiplier|


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
// © Peter_O

//@version=5
strategy("TrailingTakeProfit example", overlay=true, margin_long=100, margin_short=100, default_qty_value = 1, initial_capital = 100)

longCondition = ta.crossover(ta.sma(close, 14), ta.sma(close, 28))
shortCondition = ta.crossunder(ta.sma(close, 14), ta.sma(close, 28))

if longCondition
    strategy.entry("Long", strategy.long, comment="long", alert_message="long")
if shortCondition
    strategy.entry("Short", strategy.short, comment="short", alert_message="short")

atr_length=input.int(7, title="ATR Length")
atr_multiplier = input.float(1.5, title="ATR Multiplier")
atr_multiplied = atr_multiplier * ta.atr(atr_length)
ttp_top_bracket = strategy.position_size>0 ? high[1]+atr_multiplied : na
ttp_bottom_bracket = strategy.position_size<0 ? low[1]-atr_multiplied : na

plot(ttp_top_bracket, title="ttp_top_bracket", color=color.lime, style=plot.style_linebr, offset=1)
plot(ttp_bottom_bracket, title="ttp_bottom_bracket", color=color.red, style=plot.style_linebr, offset=1)

strategy.exit("closelong", from_entry="Long", limit=ttp_top_bracket, alert_message = "closelong")
strategy.exit("closeshort", from_entry="Short", limit=ttp_bottom_bracket, alert_message = "closeshort")

// var table alertsDisplayTable = table.new(position.top_right, 1, 5, color.black)
// if barstate.islastconfirmedhistory
//     table.cell(alertsDisplayTable, 0, 0, "TradingConnector-compatible alerts sent", text_color=color.white)
//     table.cell(alertsDisplayTable, 0, 1, "at Long Entry: long", text_color=color.white)
//     table.cell(alertsDisplayTable, 0, 2, "at Short Entry: short", text_color=color.white)
//     table.cell(alertsDisplayTable, 0, 3, "at Long Exit: closelong", text_color=color.white)
//     table.cell(alertsDisplayTable, 0, 4, "at Short Exit: closeshort", text_color=color.white)

```

> Detail

https://www.fmz.com/strategy/442930

> Last Modified

2024-02-27 14:43:17
