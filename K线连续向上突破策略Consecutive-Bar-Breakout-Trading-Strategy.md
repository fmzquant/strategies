
> Name

K线连续向上突破策略Consecutive-Bar-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


This strategy trades consecutive upside or downside bar breakouts, judging if recent price action exhibits persistence in one direction. It aims to capture short-term trend opportunities.

Strategy Logic:

1. Check if current bar is up/down versus bars from fixed lookback, e.g. 5 bars ago.

2. Enter long after multiple bars close higher than open. 

3. Enter short after multiple bars close lower than open.

4. Use stops to limit loss.

5. Customizable backtest period for optimizing parameters.

Advantages:

1. Consecutive up/down bars determine short-term trends. 

2. Real-time alerts possible for monitoring.

3. Simple backtest optimization enables live trading.

Risks:

1. No overall mid/long-term bias, risks whipsaws.

2. Tight stops may prematurely exit.

3. Beware reversals, prudent to actively take profits.

In summary, this short-term tactical strategy has potential based on backtests, but requires caution on reversals and disciplined loss cutting when live trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|BarsUp|
|v_input_2|true|BarsDown|
|v_input_3|timestamp(2021-01-01T00:00:00)|startDate|
|v_input_4|timestamp(2021-12-31T00:00:00)|finishDate|
|v_input_5|{{strategy.order.alert_message}}|Buy message|
|v_input_6|{{strategy.order.alert_message}}|Sell message|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-13 00:00:00
end: 2023-09-12 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// strategy("BarUpDn Strategy", overlay=true, initial_capital = 10000, default_qty_value = 10000, default_qty_type = strategy.cash)

BarsUp = input(1)
BarsDown = input(1)

// Strategy Backesting
startDate  = input(timestamp("2021-01-01T00:00:00"), type = input.time)
finishDate = input(timestamp("2021-12-31T00:00:00"), type = input.time)

time_cond  = true

// Messages for buy and sell
message_buy  = input("{{strategy.order.alert_message}}", title="Buy message")
message_sell = input("{{strategy.order.alert_message}}", title="Sell message")

if (close > open and open > close[BarsUp]) and time_cond
	strategy.entry("BarUp", strategy.long, stop = high + syminfo.mintick, alert_message = message_buy)
if (close < open and open < close[BarsDown]) and time_cond
	strategy.entry("BarDn", strategy.short, stop = low + syminfo.mintick, alert_message = message_sell)
//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)
```

> Detail

https://www.fmz.com/strategy/426550

> Last Modified

2023-09-13 10:53:06
