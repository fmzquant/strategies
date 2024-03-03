
> Name

K线连续向上突破策略Consecutive-Bar-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略根据K线的连续上涨或下跌突破进行交易。该策略判断近期K线走势是否呈现持续上涨或下跌态势,以捕捉短期趋势机会。

策略原理:

1. 判断当前K线与固定周期前的K线比较,如5周期前。

2. 当连续多个K线收盘价较开盘价上涨时,进行做多入场。

3. 当连续多个K线收盘价较开盘价下跌时,进行做空入场。 

4. 设置止损线,避免亏损扩大。

5. 可自定义历史回测周期,优化参数。

该策略的优势:

1. 连续上涨下跌可判断短期趋势。

2. 实盘时可加入消息提醒,便于监控。

3. 回测参数优化简单,易于实盘。

该策略的风险:

1. 无法判断中长线整体走势,存在被套风险。

2. 止损点靠近,可能导致过频繁止损。

3. 需警惕反转风险,适时主动止损。

总之,该策略通过判断K线趋势性突破进行短线操盘,可在参数优化后获得良好回测效果,但实盘时仍需警惕反转风险,适时止损。

||

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

[/trans]

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
