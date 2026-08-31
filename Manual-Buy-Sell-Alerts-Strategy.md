
> Name

Manual-Buy-Sell-Alerts-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12a66b2a151b370f89c.png)

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
