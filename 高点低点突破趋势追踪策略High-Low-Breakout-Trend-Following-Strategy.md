
> Name

高点低点突破趋势追踪策略High-Low-Breakout-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description



[trans]
本策略名称为“高点低点突破趋势追踪策略”。该策略通过识别价格创出新的高点和低点,判断趋势方向,并在突破最新高点或低点时进行趋势追踪。

具体交易逻辑如下:

1. 计算一定周期(例如22天)内的最高价和最低价。

2. 当价格突破最近一日的最高价时,产生买入信号,表明上涨趋势形成。

3. 当价格跌破最近一日的最低价时,产生卖出信号,表明下跌趋势形成。

4. 为过滤假信号,还需校验趋势方向。例如价格创新高但指标出现背离则不考虑买入。

5. 只有当指标与价格趋势一致时,才在突破最新高点/低点时进行追踪。

该策略的优点是捕捉价格突破关键点位的时机,这常常伴随趋势的启动或加速。但需要防止在震荡盘整中产生过多无效信号。

总体而言,关注关键价格区域的突破是基本的趋势跟踪方法。但交易者还需要借助其他指标进行确认,根据实际情况调整参数,以发挥该策略最大效用。



||



This strategy is named “High-Low Breakout Trend Following Strategy”. It identifies new price highs and lows to determine trend direction, and trades breakouts of latest high/low points to follow trends.

The specific logic is:

1. Calculate the highest high and lowest low over a certain period (e.g. 22 days). 

2. When price breaks above the latest 1-day high, a buy signal is generated, flagging an uptrend.

3. When price breaks below the latest 1-day low, a sell signal is generated, flagging a downtrend. 

4. Trend direction is checked to filter false signals. For example, new high price with bearish divergence is ignored for buying.

5. Only when indicators align with price trend will trades be taken on breakouts of the latest high/low points.

The advantage is capturing pivotal breakout timing, which often accompanies trend start or acceleration. But over-trading in ranging markets should be prevented.

In summary, watching key price area breakouts is essential in trend following. But confirmation with other indicators and parameter tuning based on actual conditions are needed to maximize the strategy’s utility.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_hlc3|0|price: hlc3|high|low|open|hl2|close|hlcc4|ohlc4|
|v_input_2|22|LookBack|
|v_input_3|14|length|
|v_input_4|2|length2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-13 00:00:00
end: 2023-09-12 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=1
strategy(title="HIGHER HIGH LOWER LOW STRATEGY", shorttitle="HH LL STRATEGY", overlay=true, calc_on_order_fills=true, initial_capital=100000, default_qty_type=strategy.percent_of_equity, currency="USD", default_qty_value=100)

////


//Higher High or Lower Low Entry Inputs
price = input(hlc3)
LookBack = input(22)
Highest = highest(LookBack)
Lowest = lowest(LookBack)

long = price > Highest[1] 
short = price < Lowest[1]




//Divergence Check Inputs
length = input(14)
High_Guard = highest(length)
Low_Guard = lowest(length)

length2 = input(2)

long1 = long == 1 and Highest[1] > High_Guard[length2]
short1 = short == 1 and Lowest[1] < Low_Guard[length2]


plot(long and long[1], color=green, style=line)
plot(short and short[1], color=red, style=line)

strategy.entry("Long", strategy.long, when=long1)
strategy.entry("Short", strategy.short, when=short1)

```

> Detail

https://www.fmz.com/strategy/426597

> Last Modified

2023-09-13 15:50:50
