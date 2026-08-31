
> Name

动态持仓盈利追踪交易策略Dynamic-Trailing-Take-Profit-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11cb99020da15005d3b.png)

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
