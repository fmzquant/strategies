
> Name

周一买入周三止盈策略Buy-Monday-Sell-Wednesday-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]  

本策略围绕交易周期性规律设计,在周一尾盘买入,并在周三开盘前止盈退出,捕捉该波段的价格趋势行情。属于典型的机械交易策略。

策略原理:

1. 每周一收盘前执行买入操作,开启多头仓位。

2. 每周三开盘前执行止盈退出多头仓位。

3. 设置止损百分比,避免亏损扩大。

4. 设置止盈百分比目标,锁定盈利。

5. 绘制止盈止损线,直观展示盈亏情况。

该策略的优势:

1. 周期交易方式回撤风险较小,历史表现较优。

2. 规则固定明确,便于算法化交易执行。

3. 止盈止损设置简单实用。

该策略的风险:

1. 无法适应突发事件对周期模式的影响。

2. 滞后止损 Unable 限制单笔亏损扩大。

3. 锁定盈利后无法跟踪进一步行情。

总之,该策略采用机械化的周期交易方式,回测效果显著,但难以应对周期模式突变,投资者需谨慎使用。

||

This strategy trades the weekly cyclical pattern by entering long on Monday close and taking profit before Wednesday open to capture the price swing during this period. It is a typical mechanical system.

Strategy Logic:

1. Execute long entry on every Monday close.

2. Take profit to exit long before every Wednesday open.

3. Set stop loss percentage to limit loss. 

4. Set take profit target percentage to lock in gains.

5. Plot stop and profit lines for visual P&L.

Advantages:

1. Cyclical trading has smaller drawdowns and good historical returns.

2. Fixed rules easy to automate and execute. 

3. Simple stop loss and take profit configuration.

Risks:

1. Cannot adapt to events disrupting the cycle.

2. Lagging stop loss Unable to limit loss on single trade.

3. Locked in profit Unable to track further upside.

In summary, this mechanical cyclical system has impressive backtests but struggles to adapt when the pattern changes. Investors should apply prudent discretion.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|4|StopLoss %|
|v_input_float_2|3|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-12 00:00:00
end: 2023-09-11 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © processingclouds

// @description Strategy to go long at end of Monday and exit by Tuesday close, or at stop loss or take profit percentages  

//@version=5
strategy("Buy Monday, Exit Wednesday", "Mon-Wed Swings",overlay=true)

//  ----- Inputs: stoploss %, takeProfit %
stopLossPercentage = input.float(defval=4.0, title='StopLoss %', minval=0.1, step=0.2) / 100
takeProfit = input.float(defval=3.0, title='Take Profit %', minval=0.3, step=0.2) / 100

//  ----- Exit and Entry Conditions - Check current day and session time
isLong = dayofweek == dayofweek.monday  and not na(time(timeframe.period, "1400-1601"))
isExit = dayofweek == dayofweek.wednesday and not na(time(timeframe.period, "1400-1601"))

//  ----- Calculate Stoploss and Take Profit values
SL = strategy.position_avg_price * (1 - stopLossPercentage)
TP = strategy.position_avg_price * (1 + takeProfit)

//  ----- Strategy Enter, and exit when conditions are met
strategy.entry("Enter Long", strategy.long, when=isLong)
if strategy.position_size > 0 
    strategy.close("Enter Long", isExit)
    strategy.exit(id="Exit", stop=SL, limit=TP)

//  ----- Plot Stoploss and TakeProfit lines
plot(strategy.position_size > 0 ? SL : na, style=plot.style_linebr, color=color.red, linewidth=2, title="StopLoss")
plot(strategy.position_size > 0 ? TP : na, style=plot.style_linebr, color=color.green, linewidth=2, title="TakeProfit")
```

> Detail

https://www.fmz.com/strategy/426511

> Last Modified

2023-09-12 16:44:53
