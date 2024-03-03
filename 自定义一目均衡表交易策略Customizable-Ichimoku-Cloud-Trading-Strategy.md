
> Name

自定义一目均衡表交易策略Customizable-Ichimoku-Cloud-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略通过全面自定义一目均衡表(Ichimoku Kinko Hyo)各项参数和条件,实现高度灵活的均衡表交易策略。该策略可完整复制均衡表多种交易方法,适应不同市场环境。

策略原理:

1. 计算转换线、基準线、前导线1、前导线2和延迟线。

2. 根据自定义参数设置多头和空头的入场条件组合。

3. 根据自定义参数设置多头和空头的出场条件组合。

4. 视觉显示配置的条件达成情况。

5. 根据入场和出场条件进行交易,可选择是否使用止损止盈。

该策略的优势:

1. 完全自定义均衡表参数,匹配个人交易方式。

2. 条件组合交易,可过滤假信号,提高稳定性。 

3. 视觉辅助判断,直观反映市场情况。

4. 测试优化灵活,可适应多种市场类型。

该策略的风险:

1. 全自定义带来的复杂度,需要花费大量时间测试。

2. 参数不合理可能得到损失,需要谨慎测试。

3. 过于复杂的条件组合可能导致漏失良机。

总之,该策略实现了均衡表交易策略的高度自定义,用户可根据偏好、市场情况调整参数,以达到最佳效果。但也需要谨慎测试,以免增加非系统性风险。

||

This strategy fully customizes all parameters and conditions of the Ichimoku Cloud for ultimate flexibility in Ichimoku trading. It can replicate a wide range of Ichimoku methods to suit different market environments. 

Strategy Logic:

1. Calculate Tenkan, Kijun, Senkou A, Senkou B and Chikou lines.

2. Define customizable combinations of long entry conditions.

3. Define customizable combinations of long exit conditions. 

4. Visually indicate when configured conditions are met.

5. Trade entries and exits based on conditions, with optional stops/take profits.

Advantages:

1. Fully customizable parameters match personal trading style.

2. Condition combos filter false signals and improve stability.

3. Visual assistance intuitively reflects market state. 

4. Flexible testing/optimization adapts to various markets.

Risks: 

1. Full customization introduces complexity requiring extensive testing.

2. Bad parameters can lead to losses, requiring prudent testing.

3. Overly complex condition combos may miss good opportunities. 

In summary, this strategy enables high customization of Ichimoku trading systems. Users can tune parameters and conditions to suit their preferences and market conditions. But prudent testing is required to avoid unintended risks.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(2015-12-12T00:00:00)|(?Backtest Range)Start Date|
|v_input_2|timestamp(2022-12-12T00:00:00)|Finish Date|
|v_input_3|false|(?Ichimoku Lines)Show Conversion Line (Tenkan Sen)|
|v_input_4|false|Show Base Line (Kijun Sen)|
|v_input_5|false|Show Lagging Span (Chikou Span)|
|v_input_6|false|Show Leading Span A (Senkou Span A)|
|v_input_7|false|Show Leading Span B (Senkou Span B)|
|v_input_8|true|Show All Lines|
|v_input_9|9|(?Ichimoku Periods)Conversion Period|
|v_input_10|26|Base Line Period|
|v_input_11|52|Lagging Span Period|
|v_input_12|26|Displacement|
|v_input_13|true|(?Ichimoku Long Conditions)Conversion Crosses Base|
|v_input_14|false|Conversion Above Base|
|v_input_15|true|Positive Cloud|
|v_input_16|true|Price Above Cloud|
|v_input_17|true|Positive Chikou|
|v_input_18|true|Price Above Conversion|
|v_input_19|false|Show Condititons Visually|
|v_input_20|true|(?Ichimoku Short Conditions)Base Crosses Conversion|
|v_input_21|false|Base Above Conversion|
|v_input_22|true|Negative Cloud|
|v_input_23|true|Price Below Cloud|
|v_input_24|true|Negative Chikou|
|v_input_25|true|Price Below Base|
|v_input_26|false|Show Condititons Visually|
|v_input_27|true|(?Ichimoku Long Exit Conditions)Base Crosses Conversion|
|v_input_28|false|Negative Chikou|
|v_input_29|false|Show Condititons Visually|
|v_input_30|true|(?Ichimoku Short Exit Conditions)Conversion Crosses Base|
|v_input_31|false|Positive Chikou|
|v_input_32|false|Show Condititons Visually|
|v_input_33|false|(?Exits vs TP/SL)Use SL and TP Instead of Exits|
|v_input_34|2|Take Profit (%)|
|v_input_35|true|Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-12 00:00:00
end: 2023-09-11 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © antondmt

//@version=5
strategy("Ultimate Ichimoku Cloud Strategy", "UIC Strategy", true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, process_orders_on_close = true)
// Inputs {
// Backtest Range
i_time_start =              input(timestamp("2015-12-12T00:00:00"), "Start Date", group = "Backtest Range")
i_time_finish =             input(timestamp("2022-12-12T00:00:00"), "Finish Date", group = "Backtest Range")

// Ichimoku Lines
i_show_conversion =         input(false, "Show Conversion Line (Tenkan Sen)", group = "Ichimoku Lines")
i_show_base =               input(false, "Show Base Line (Kijun Sen)", group = "Ichimoku Lines")
i_show_lagging =            input(false, "Show Lagging Span (Chikou Span)", group = "Ichimoku Lines")
i_show_span_A =             input(false, "Show Leading Span A (Senkou Span A)", group = "Ichimoku Lines")
i_show_span_B =             input(false, "Show Leading Span B (Senkou Span B)", group = "Ichimoku Lines")
i_show_all =                input(true, "Show All Lines", group = "Ichimoku Lines")

// Ichimoku Periods
i_conversion_line_period =  input(9, "Conversion Period", 1, group = "Ichimoku Periods")
i_base_line_period =        input(26, "Base Line Period", 1, group = "Ichimoku Periods")
i_leading_span_period =     input(52, "Lagging Span Period", 1, group = "Ichimoku Periods")
i_displacement =            input(26, "Displacement", 1, group = "Ichimoku Periods")

// Ichimoku Long Conditions
i_long_cond_1 =             input(true, "Conversion Crosses Base", "Conversion line crosses up on base line.", group = "Ichimoku Long Conditions")
i_long_cond_2 =             input(false, "Conversion Above Base", "Conversion line is above base line", group = "Ichimoku Long Conditions")
i_long_cond_3 =             input(true, "Positive Cloud", "Cloud has to be positive. Span A > Span B.", group = "Ichimoku Long Conditions")
i_long_cond_4 =             input(true, "Price Above Cloud", "Price has to be above the clouds.", group = "Ichimoku Long Conditions")
i_long_cond_5 =             input(true, "Positive Chikou", "Lagging span has to be higher than price at displacement.", group = "Ichimoku Long Conditions")
i_long_cond_6 =             input(true, "Price Above Conversion", "Price has to be higher than conversion line.", group = "Ichimoku Long Conditions")
i_long_cond_show =          input(false, "Show Condititons Visually", "Draws lines when condition is true.", group = "Ichimoku Long Conditions")

// Ichimoku Short Conditions 
i_short_cond_1 =            input(true, "Base Crosses Conversion", "Base line crosses up on conversion line.", group = "Ichimoku Short Conditions")
i_short_cond_2 =            input(false, "Base Above Conversion", "Base line is above conversion line", group = "Ichimoku Short Conditions")
i_short_cond_3 =            input(true, "Negative Cloud", "Cloud has to be negative. Span B > Span A.", group = "Ichimoku Short Conditions")
i_short_cond_4 =            input(true, "Price Below Cloud", "Price has to be below the clouds.", group = "Ichimoku Short Conditions")
i_short_cond_5 =            input(true, "Negative Chikou", "Lagging span has to be lower than price at displacement.", group = "Ichimoku Short Conditions")
i_short_cond_6 =            input(true, "Price Below Base", "Price has to be lower than base line.", group = "Ichimoku Short Conditions")
i_short_cond_show =         input(false, "Show Condititons Visually", "Draws lines when condition is true.", group = "Ichimoku Short Conditions")

// Ichimoku Long Exit Conditions
i_sell_long_cond_1 =        input(true, "Base Crosses Conversion", "Base line crosses up on conversion line.", group = "Ichimoku Long Exit Conditions")
i_sell_long_cond_2 =        input(false, "Negative Chikou", "Lagging span is lower than price at displacement.", group = "Ichimoku Long Exit Conditions")
i_sell_long_cond_show =     input(false, "Show Condititons Visually", "Draws lines when condition is true.", group = "Ichimoku Long Exit Conditions")

// Ichimoku Short Exit Conditions
i_sell_short_cond_1 =       input(true, "Conversion Crosses Base", "Conversion line crosses up on base line.", group = "Ichimoku Short Exit Conditions")
i_sell_short_cond_2 =       input(false, "Positive Chikou", "Lagging span is higher than price at displacement.", group = "Ichimoku Short Exit Conditions")
i_sell_short_cond_show =    input(false, "Show Condititons Visually", "Draws lines when condition is true.", group = "Ichimoku Short Exit Conditions")

// Exits vs TP/SL
i_use_SLTP =                input(false, "Use SL and TP Instead of Exits", group = "Exits vs TP/SL")
i_TP =                      input(2, "Take Profit (%)", group = "Exits vs TP/SL")
i_SL =                      input(1, "Stop Loss (%)", group = "Exits vs TP/SL")
// }

// Ichimoku Calculations {
donchian(len) =>
    math.avg(ta.lowest(len), ta.highest(len))
conversion_line = donchian(i_conversion_line_period)
base_line = donchian(i_base_line_period)
leading_span_A = math.avg(conversion_line, base_line)
leading_span_B = donchian(i_leading_span_period)
// }

// Entries and Exits Logic { 
long_entry = false
if(i_long_cond_1 or i_long_cond_2 or i_long_cond_3 or i_long_cond_4 or i_long_cond_5 or i_long_cond_6)
    long_entry := (i_long_cond_1 ? ta.crossover(conversion_line, base_line) : true) 
         and (i_long_cond_2 ? conversion_line > base_line : true)
         and (i_long_cond_3 ? leading_span_A[i_displacement - 1] > leading_span_B[i_displacement - 1] : true) 
         and (i_long_cond_4 ? close > leading_span_A[i_displacement - 1] and close > leading_span_B[i_displacement - 1] : true) 
         and (i_long_cond_5 ? close > nz(close[i_displacement + 1], close) : true) 
         and (i_long_cond_6 ? close > conversion_line : true)
         
short_entry = false
if(i_short_cond_1 or i_short_cond_2 or i_short_cond_3 or i_short_cond_4 or i_short_cond_5)
    short_entry := (i_short_cond_1 ? ta.crossunder(conversion_line, base_line) : true) 
         and (i_short_cond_2 ? base_line > conversion_line : true)
         and (i_short_cond_3 ? leading_span_A[i_displacement - 1] < leading_span_B[i_displacement - 1] : true) 
         and (i_short_cond_4 ? close < leading_span_A[i_displacement - 1] and close < leading_span_B[i_displacement - 1] : true) 
         and (i_short_cond_5 ? close < nz(close[i_displacement + 1], close) : true) 
         and (i_short_cond_6 ? close < base_line : true)
         
long_exit = false
if(i_sell_long_cond_1 or i_sell_long_cond_2)
    long_exit := (i_sell_long_cond_1 ? ta.crossunder(conversion_line, base_line) : true) 
         and (i_sell_long_cond_2 ? close < nz(close[i_displacement + 1], close) : true) 
         
short_exit = false
if(i_sell_short_cond_1 or i_sell_short_cond_2)
    short_exit := (i_sell_short_cond_1 ? ta.crossover(conversion_line, base_line) : true) 
         and (i_sell_short_cond_2 ? close > nz(close[i_displacement + 1], close) : true) 

dateRange() => 
    true
// }

// Entries and Exits {
if(strategy.position_size <= 0 and long_entry and dateRange())
    strategy.entry("Long", strategy.long)
if(long_exit and not i_use_SLTP)
    strategy.close("Long")
else if(i_use_SLTP)
    strategy.exit("TP/SL", "Long", stop = strategy.position_avg_price * (1 - i_SL / 100), limit = strategy.position_avg_price * (1 + i_TP / 100))


if(strategy.position_size >= 0 and short_entry and dateRange())
    strategy.entry("Short", strategy.short)
if(short_exit and not i_use_SLTP)
    strategy.close("Short")
else if(i_use_SLTP)
    strategy.exit("TP/SL", "Short", stop = strategy.position_avg_price * (1 + i_SL / 100), limit = strategy.position_avg_price * (1 - i_TP / 100))
// }

// Plots { 
plot(i_show_all or i_show_conversion ? conversion_line : na, "Conversion Line (Tenkan Sen)", color.new(#0496ff, 0), 2)
plot(i_show_all or i_show_base ? base_line : na, "Base Line (Kijun Sen)", color.new(#991515, 0), 2)
plot(i_show_all or i_show_lagging ? close : na, "Lagging Span (Chikou Span)", color.new(color.yellow, 0), 2, offset = -i_displacement + 1)
span_A = plot(i_show_all or i_show_span_A ? leading_span_A : na, "Leading Span A (Senkou Span A)", color.new(color.green, 0), offset = i_displacement - 1)
span_B = plot(i_show_all or i_show_span_B ? leading_span_B : na, "Leading Span B (Senkou Span B)", color.new(color.red, 0), offset = i_displacement - 1)
fill(span_A, span_B, leading_span_A > leading_span_B ? color.new(color.green, 90) : color.new(color.red, 90), "Cloud Colors")

bgcolor(i_long_cond_show and long_entry ? color.new(color.green, 40) : na)
bgcolor(i_short_cond_show and short_entry ? color.new(color.red, 40) : na)
bgcolor(i_sell_long_cond_show and long_exit ? color.new(color.purple, 40) : na)
bgcolor(i_sell_short_cond_show and short_exit ? color.new(color.aqua, 40) : na)
// }
```

> Detail

https://www.fmz.com/strategy/426508

> Last Modified

2023-09-12 16:31:44
