
> Name

基于支撑阻力突破的趋势追踪策略Trend-Following-Strategy-Based-on-Pivot-Point-Breakout

> Author

ChaoZhang

> Strategy Description



[trans]
本策略名称为“基于支撑阻力突破的趋势追踪策略”。该策略通过识别关键的支撑位和阻力位,在价格突破这些位时进行趋势交易。

具体逻辑如下:

1. 计算一定周期内的最高点和最低点,作为关键的支撑阻力位。

2. 当价格上涨突破上一日的最高支撑时,产生买入信号。

3. 当价格下跌突破上一日的最低支撑时,产生卖出信号。

4. 在突破发生后快速追踪趋势运行。如果再次跌破支撑位,则止损退出。

该策略的优势是把握突破关键支撑阻力位的时机进行趋势交易。但需要关注指标形态,避免在震荡行情中产生过多不确定信号。

总体来说,关注关键支撑阻力位的突破是较简单直观的跟踪策略。但交易者仍需辅助其他技术指标进行确认,并适当调整参数,使策略 Both盈利进入趋势又能及时止损。


||



This strategy is named “Trend Following Strategy Based on Pivot Point Breakout”. It identifies key support and resistance levels, and trades breakouts of these levels to follow trends.

The logic is:

1. Calculate the highest high and lowest low prices over a period as key support/resistance levels. 

2. When prices break above the previous day’s high pivot, a buy signal is generated.

3. When prices break below the previous day’s low pivot, a sell signal is generated.

4. Quickly follow the trend after breakout occurs. If support is broken again, a stop loss exits.

The advantage is capitalizing on pivot breakout timing for trend trading. But indicator patterns should be watched to avoid excessive uncertain signals during ranging markets.

In summary, watching pivotal support/resistance level breakouts is a relatively simple and intuitive tracking approach. But traders still need confirmation from additional technical indicators, and parameter tuning, for the strategy to Both profit from trend entries and timely stop losses.

[/trans]


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|left|
|v_input_2|10|right|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-12 00:00:00
end: 2023-09-12 00:00:00
period: 3d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Yo_adriiiiaan

//@version=4
strategy("Breakout Strategy", overlay = true, commission_type=strategy.commission.percent,commission_value=0, initial_capital = 1000,  default_qty_type=strategy.percent_of_equity, default_qty_value=100)
left =  input(10)
right = input(10)
pivot_high = 0.000
pivot_low = 0.000
pivot_high := nz(pivothigh(high,left,right), pivot_high[1])
pivot_low := nz(pivotlow(low,left,right), pivot_low[1])
plot(pivot_high)
plot(pivot_low)
breakout_bull = close > pivot_high[1]
breakdown_bear = close < pivot_low[1]

barcolor(close > pivot_high[1]? color.green:close < pivot_low[1]? color.red:close < pivot_high[1]? color.orange:na)
strategy.entry("Long", strategy.long, when = breakout_bull)
strategy.close_all(when = breakdown_bear) 
//strategy.entry("Short", strategy.short, when = breakdown_bear)

```

> Detail

https://www.fmz.com/strategy/426613

> Last Modified

2023-09-13 17:20:40
