
> Name

基于ADX指标的趋势反转策略Trend-Reversal-Strategy-Based-on-ADX-Indicator

> Author

ChaoZhang

> Strategy Description



[trans]
本策略名称为“基于ADX指标的趋势反转策略”。该策略利用ADX指标判断趋势强度,在超买超卖时捕捉反转机会。

ADX表示平均趋向指数,反映趋势的力度。ADX值越高,表明趋势越强。当ADX大于25时,认为存在较明显趋势。

DMI包括DI+和DI-两线。DI+在上时表示上涨趋势,DI-在上时表示下跌趋势。

本策略的交易逻辑:

1. 当ADX高于45,认为趋势非常强劲。

2. 此时若DI+低于DI-,则判断为超卖状态,出现趋势反转机会,做多。

3. 反之,若DI-低于DI+,则判断为超买状态,出现反转机会,做空。

4. 在反转后及时止盈。

该策略的优势是使用ADX判断强势趋势的反转点,高ADX值可以有效过滤震荡市场的假信号。但ADX参数需要优化,且止损策略也很重要。

总体来说,ADX指标较好地判定强势趋势反转的时机。但交易者仍需关注更多因素,ADX仅作为辅助判断指标之一。



||



This strategy is named "Trend Reversal Strategy Based on ADX Indicator". It uses the ADX indicator to gauge trend strength and capture reversal opportunities when overbought/oversold.

ADX stands for Average Directional Index, reflecting the strength of a trend. The higher the ADX value, the stronger the trend. ADX above 25 suggests a significant trend is present. 

DMI includes DI+ and DI- lines. DI+ above DI- shows an uptrend, while DI- above DI+ flags a downtrend.

The trading logic is:

1. When ADX is above 45, the trend is considered very steep. 

2. If DI+ is below DI- then, it signals an oversold state and trend reversal opportunity, going long.

3. Conversely, if DI- is below DI+, it suggests overbought conditions and reversal opportunity for going short.

4. Take profit timely after reversal.

The advantage is using ADX to determine strong trend reversal points. High ADX values filter out false signals from ranging markets effectively. But ADX parameters need optimization, and stop loss is also important.

In conclusion, ADX is adept at gauging strong trend reversal timing. But traders still need to watch more factors, using ADX as just one supplementary indicator.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2021|From Year|
|v_input_4|true|Thru Month|
|v_input_5|true|Thru Day|
|v_input_6|2112|Thru Year|
|v_input_7|true|Show Date Range|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-13 00:00:00
end: 2023-09-12 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(shorttitle='DMI swings',title='DMI swings', overlay=true, initial_capital = 100, process_orders_on_close=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type=strategy.commission.percent, commission_value=0.1)

//Backtest dates
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 1,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 2021, title = "From Year",       type = input.integer, minval = 1970)
thruMonth = input(defval = 1,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12)
thruDay   = input(defval = 1,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31)
thruYear  = input(defval = 2112, title = "Thru Year",       type = input.integer, minval = 1970)

showDate  = input(defval = true, title = "Show Date Range", type = input.bool)

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => true        // create function "within window of time"

[pos_dm, neg_dm, avg_dm] = dmi(14, 14)

//Entry 
strategy.entry(id="long", long = true, when = avg_dm > 45 and pos_dm < neg_dm and window())

//Exit
strategy.close("long", when = avg_dm > 45 and pos_dm > neg_dm and window())
```

> Detail

https://www.fmz.com/strategy/426606

> Last Modified

2023-09-13 17:02:31
