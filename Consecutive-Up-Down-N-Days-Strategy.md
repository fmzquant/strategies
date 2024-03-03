
> Name

Consecutive-Up-Down-N-Days-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

这是一个仅做多不做空的策略,它根据用户设置的连续上涨天数和连续下跌天数来决定 entries 和 exits。其交易逻辑非常简单直接。

策略原理

首先,我们需要设置两个参数:

consecutiveBarsUp: 连续上涨天数 
consecutiveBarsDown: 连续下跌天数

然后我们记录两个变量:

ups: 目前连续上涨天数
dns: 目前连续下跌天数  

每天我们根据收盘价和前一日收盘价的比较,来判断该日是上涨还是下跌,如果上涨天数,则ups加1,下跌天数则dns加1。

当ups达到consecutiveBarsUp时,我们做多;当dns达到consecutiveBarsDown时,我们平仓。

这样就完成了一个简单的连续涨跌策略。我们只在见底后连续上涨一定天数时做多,在连续下跌一定天数后平仓。避免了在震荡行情中频繁交易。

策略优势

1. 逻辑简单,容易理解和实现

2. 通过设置连续上涨和下跌天数,可以 filtering 一些短线震荡,避免频繁交易

3. 仅做多,可以减少交易频率,降低交易成本和滑点影响 

4. 容易设置止损,可以有效控制单笔损失

潜在风险

1. 无法在见顶的时候做空,可能错过做空机会

2. 需要连续上涨一定天数才入场,可能错过买入最低点

3. 存在一定的时间滞后,无法实时捕捉转折点

4. 如果不设置止损,可能带来较大的单笔损失风险

总结

连续涨跌N天策略以其简单的交易逻辑和较低的交易频率大受投资人欢迎。通过合理设置参数,可有效过滤震荡,避免频繁交易。但也存在一定时间滞后和无法做空的限制。需要投资人综合考量后实施。总体来说,该策略适合追踪中长线趋势的投资人,可以提供稳定的投资回报。

||
Consecutive Up/Down N Days Strategy 

This article will introduce in detail the trading logic, pros, potential risks and summary of the Consecutive Up/Down N Days strategy.

This is a long-only strategy that determines entries and exits based on user-defined consecutive up days and consecutive down days. The trading logic is very straightforward. 

Strategy Logic

Firstly, we need to set two parameters:

consecutiveBarsUp: consecutive up days
consecutiveBarsDown: consecutive down days

Then we record two variables: 

ups: current consecutive up days
dns: current consecutive down days

Each day we compare the close price with previous close to determine if it's an up day or down day. If up, ups + 1, if down, dns + 1.

When ups reaches consecutiveBarsUp, we go long. When dns reaches consecutiveBarsDown, we exit positions.

That's the simple logic for a consecutive up/down strategy. We only go long after consecutive up days from bottom. And exit after consecutive down days. This avoids frequent trading in range-bound markets.

Pros

1. Simple logic, easy to understand and implement

2. Filtering short-term fluctuations by the consecutive days setting

3. Long only, less trades, lower transaction costs and slippage impact

4. Easy to set stop loss, effectively control single trade loss

Potential Risks 

1. Unable to short tops, missing shorting opportunities 

2. Need consecutive up days to enter, possibly missing best entry point

3. Time lag, not capturing turns in real time

4. Large single trade loss without stop loss

Summary

The consecutive up/down days strategy is widely popular for its simplicity and low frequency trading. With proper parameter tuning, it can filter out whipsaws effectively. But it also has limitations like time lag and inability to short. Investors need to consider carefully before adopting. Overall it suits investors seeking stable returns when tracking medium-long term trends.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|consecutiveBarsUp|
|v_input_2|true|consecutiveBarsDown|
|v_input_3|timestamp(2021-01-01T00:00:00)|startDate|
|v_input_4|timestamp(2021-12-31T00:00:00)|finishDate|
|v_input_5|{{strategy.order.alert_message}}|Buy message|
|v_input_6|{{strategy.order.alert_message}}|Sell message|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-12 00:00:00
end: 2023-09-11 00:00:00
period: 12h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

// Strategy
// strategy("Up/Down Long Strategy", overlay=true, initial_capital = 10000, default_qty_value = 10000, default_qty_type = strategy.cash)

// There will be no short entries, only exits from long.
// strategy.risk.allow_entry_in(strategy.direction.long)

consecutiveBarsUp = input(1)
consecutiveBarsDown = input(1)

price = close

ups = 0.0
ups := price > price[1] ? nz(ups[1]) + 1 : 0

dns = 0.0
dns := price < price[1] ? nz(dns[1]) + 1 : 0

// Strategy Backesting
startDate  = input(timestamp("2021-01-01T00:00:00"), type = input.time)
finishDate = input(timestamp("2021-12-31T00:00:00"), type = input.time)

time_cond  = true

// Messages for buy and sell
message_buy  = input("{{strategy.order.alert_message}}", title="Buy message")
message_sell = input("{{strategy.order.alert_message}}", title="Sell message")

// Strategy Execution

if (ups >= consecutiveBarsUp) and time_cond
    strategy.entry("Long", strategy.long, stop = high + syminfo.mintick, alert_message = message_buy)
    
if (dns >= consecutiveBarsDown) and time_cond
    strategy.entry("Short", strategy.short, stop = low + syminfo.mintick, alert_message = message_sell)

```

> Detail

https://www.fmz.com/strategy/426464

> Last Modified

2023-09-12 11:51:10
