
> Name

手动买卖警报策略Manual-Buy-Sell-Alerts-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12a66b2a151b370f89c.png)
[trans]
该策略是一个手动买卖警报工具,可以设置买入价格、卖出价格等参数,当价格触发条件时,会发出买入或卖出的警报提醒。

### 策略概述

本策略是一个非自动化的手动买卖工具。它可以生成“警报”,以便用户在预先设置的价格点买入和卖出。用户可以设置以下内容:

1. 时间周期
2. 入场价格和入场类型(止损或限价)  
3. 目标价格  
4. 止损价格

通过改变周期值和设置值,可以轻松测试该策略。

### 策略原理

1. 用户首先设置时间周期,在该时间周期内策略生效。  
2. 然后设置买入类型是止损或限价,以及具体的买入价格。
3. 再设置目标价格和止损价格。  
4. 当价格触发买入条件时,会发出买入警报。比如选择止损,当价格低于设置的买入价时,会发出买入警报。
5. 在持仓期间,如果触发目标价格,会发出卖出警报。如果触发止损价,也会发出卖出警报。

通过这种方式,用户可以手动根据警报信息来决定交易时机,无需自动下单,更加灵活。

### 策略优势分析

1. 该策略最大的优势在于操作灵活,用户可以根据自己的判断来决定是否买入或卖出,而不是自动交易,控制力更强。
2. 设置止损和目标价位后,可以有效控制风险,防止大幅亏损。
3. 可以通过调整买入条件和参数测试不同的交易策略,对策略进行优化。
4. 作为一个工具来辅助手动交易,可以发挥很好的作用,提高交易效率。

### 策略风险分析

1. 该策略依赖于用户的操作判断,如果判断失误,仍然可能造成损失。
2. 在快速变动的市场中,警报消息可能会落后,导致交易决策失误。
3. 如果没有及时关注和操作,可能错过最佳的交易时机。
4. 参数设置不当也会影响策略效果,需要反复测试优化。

为降低风险,建议采用止损来限制亏损; 在关键时刻要密切关注市场,及时操作;进取多轮测试,优化参数。

### 策略优化方向  

1. 可以设置更复杂的止损机制,如移动止损、振荡止损等方式。
2. 可以加入更多类型的交易条件,如突破买入等。
3. 可以增加仓位管理机制,如加仓或减仓。  
4. 可以加入更多过滤条件,避免错交易。
5. 可以连接telegram或微信,使用消息推送的方式发出警报。
6. 可以保存参数设置成模板,快速调整测试。

通过这些优化,可以使该工具对用户更加友好和智能,提高手动交易的效率。

### 总结

本策略作为一个辅助手动交易的工具,最大优势在于操作灵活,可以完全根据用户判断确定交易时机。相比自动交易策略,具有更大的控制力。同时,也提供了参数设置功能,可以方便用户测试不同的交易策略,对交易理念进行验证,可谓一箭多雕。当然,作为一个工具,也需要用户不断优化与改进,使其可以适应更复杂的交易需要,发挥更大的作用。


||

This strategy is a manual buy and sell alert tool that can set buy price, sell price and other parameters. When the price triggers the conditions, it will issue a buy or sell alert.

### Strategy Overview

This strategy is a non-automated manual trading tool. It can generate "alerts" for users to buy and sell at preset prices. Users can set the following:  

1. Time Period
2. Entry price and entry type (stop loss or limit price)
3. Target price
4. Stop loss price

The strategy can be easily tested by changing the cycle value and setting value.

### Strategy Principle 

1. Users first set the time period during which the strategy is valid.
2. Then set the buy type to stop loss or limit price, and the specific buy price.  
3. Set target price and stop loss price.
4. When the price triggers the buy condition, a buy alert will be issued. For example, if you choose stop loss, when the price is lower than the set buy price, a buy alert will be issued.
5. During the holding period, if the target price is triggered, a sell alert will be issued. If the stop loss price is triggered, a sell alert will be issued as well.

In this way, users can manually determine the trading opportunity based on the alert information without the need for automated order placement, which is more flexible.

### Advantage Analysis

1. The biggest advantage of this strategy is flexible operation. Users can decide whether to buy or sell based on their own judgment instead of automated trading, which gives more control.
2. By setting stop loss and target price, risk can be effectively controlled to prevent huge losses.  
3. Different trading strategies can be tested by adjusting buy conditions and parameters for optimization.
4. As a tool to assist manual trading, it can play a great role and improve trading efficiency.  

### Risk Analysis  

1. The strategy relies on the user's operating judgment. If the judgment is wrong, losses may still occur.
2. In a fast changing market, alert messages may lag, leading to wrong trading decisions. 
3. If not paying close attention and operation timely, the best trading opportunity may be missed.
4. Improper parameter settings can also affect strategy performance and need iterative testing and optimization.  

To reduce risks, it is recommended to use stop loss to limit losses; pay close attention to the market at critical moments and operate in a timely manner; and conduct multi-round testing to optimize parameters.

### Optimization Direction

1. More complex stop loss mechanisms can be set, such as moving stop loss, swing stop loss etc.
2. More types of trading conditions can be added, such as breakout trading.
3. Position management mechanisms can be added, such as pyramiding or position reduction.
4. More filtering conditions can be added to avoid wrong trades.
5. Alerts can be pushed via Telegram or WeChat messages.  
6. Parameter settings can be saved as templates for quick adjustment and testing.

With these optimizations, the tool can be more user-friendly and intelligent to improve the efficiency of manual trading.  

### Summary  

As a tool to assist manual trading, the biggest advantage of this strategy is flexible operation, which allows users to fully determine trading opportunities based on their own judgment, compared to automated trading strategies. At the same time, it also provides parameter setting functions for users to easily test different trading strategies, verify trading ideas, and serve multiple purposes. Of course, as a tool, it also requires users to continuously optimize and improve it so that it can adapt to more complex trading needs and play a greater role.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(2020-01-01)|(?Period)Start|
|v_input_2|timestamp(2030-01-01)|End|
|v_input_string_1|0|(?Buy&Sell)Buy Type: stop|limit|
|v_input_float_1|49000|Buy Price|
|v_input_float_2|51000|Target Price|
|v_input_float_3|47000|Stop Price|
|v_input_string_2|Buy message|(?Alert set-up)Buy Alert Message|
|v_input_string_3|Sell message|Sell Alert Message|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-21 00:00:00
end: 2024-02-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © MGTG

title_name = 'Manual Buy & Sell Alerts'

//@version=5
strategy(
 title=title_name, overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, 
 pyramiding=1, commission_type=strategy.commission.percent, commission_value=0.1)

// Period
sTime         = input(timestamp("2020-01-01"), "Start", group="Period", inline='1')
eTime         = input(timestamp("2030-01-01"), "End", group="Period", inline='2')
inDateRange   = true

// Bot Set-up
buy_type = input.string('stop', 'Buy Type', group='Buy&Sell', inline='1', options=['stop', 'limit'])
buy_price = input.float(49000, 'Buy Price', group='Buy&Sell', inline='1')

target_price = input.float(51000, 'Target Price', group='Buy&Sell', inline='2')
stop_price = input.float(47000, 'Stop Price', group='Buy&Sell', inline='2')
avg_price = strategy.position_avg_price
division = 1

// Alert message
AlertLong=input.string("Buy message", "Buy Alert Message",  group='Alert set-up', inline='1')
AlertExit=input.string("Sell message", "Sell Alert Message",  group='Alert set-up', inline='1')

plot(buy_price, 'Buy Price', color=color.new(#009688, 0), style=plot.style_linebr, offset=1)
plot(target_price, 'Take Profit', color=color.new(color.orange, 0), style=plot.style_linebr, offset=1)
plot(stop_price, 'Safety', color=color.new(color.aqua, 0), style=plot.style_linebr, offset=1)

posSize = 
 strategy.equity / close

strategy.exit("sell", "buy", limit=target_price, stop=stop_price, alert_message=AlertExit)

longCondition = inDateRange and strategy.position_size == 0
if longCondition and buy_type == 'stop'
    strategy.entry("buy", strategy.long, qty=posSize, stop=buy_price, when=close < buy_price, comment="buy_STOP", alert_message=AlertLong)

if longCondition and buy_type == 'limit'
    strategy.entry("buy", strategy.long, qty=posSize, limit=buy_price, when=close > buy_price, comment="buy_LIMIT", alert_message=AlertLong)
```

> Detail

https://www.fmz.com/strategy/442334

> Last Modified

2024-02-21 11:02:02
