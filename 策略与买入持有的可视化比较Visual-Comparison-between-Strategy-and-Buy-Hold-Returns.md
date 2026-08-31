
> Name

策略与买入持有的可视化比较Visual-Comparison-between-Strategy-and-Buy-Hold-Returns

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/193757768815d5ba4f6.png)

## Overview

This strategy makes a detailed and visual comparison between a given strategy and the buy & hold returns of the traded security.  

## Strategy Logic

The core logic of this strategy is to plot four key elements for comparison between the given strategy and buy & hold strategy:

1. Strategy P/L: strategy net profit + strategy open profit
2. Buy & Hold P/L: unrealized return  
3. Difference: Strategy P/L - Buy & Hold P/L
4. Strategy vs Buy Hold Stats
    - Percent of bars strategy P/L is above Buy & Hold 
    - Percent of bars strategy P/L is below Buy & Hold
    - All Time Average Difference

By comparing the above four elements, we can have an intuitive understanding on whether our strategy outperforms or underperforms a simple buy & hold strategy.

## Advantage Analysis 

Compared with a simple comparison of buy & hold returns, this strategy has the following advantages:

1. More comprehensive and detailed comparison metrics, including per bar comparisons and overall statistical comparisons, so that we know clearly when and where our strategy beats or loses to buy & hold.

2. Intuitive visual charts that plot the strategy P/L, buy & hold P/L and the difference between them. It allows us to visually tell the performance of our strategy faster. 

3. Customizable comparison date range where we can focus on comparing our strategy vs buy & hold on specific periods.

4. Simple and easy to use. The comparison logic is built-in so that we only need to replace the strategy script section with our own. No need to code the comparison logic ourselves.

## Risk Analysis

This strategy relies mainly on the built-in buy & hold return metrics of the trading platform for comparison. Any bias with that benchmark will affect the final result. Also, there may exist flaws in the statistical calculations of this strategy that fail to accurately reflect the comparison.  

More benchmarks and statistical methods can be introduced for further validation. If the trading platform introduces significant changes to the buy & hold metric, the comparison logic here needs to be adjusted as well.

## Optimization Directions

This strategy can be further optimized from the following aspects:

1. Introduce more benchmarks for 3-way or multi-way comparison, e.g. comparing against an index or industry peers.

2. Include more statistical metrics like annual win rate, maximum drawdown duration difference etc. for assessing the strategy from more dimensions. 

3. Make more components like benchmarks, metrics etc customizable by users instead of just the date range.

4. Improve charting visualization since simple line charts here make it hard to spot detailed comparisons on specific bars. Column plots or additional markings can help.

## Conclusion

With detailed comparison metrics and intuitive visual charts, this strategy allows us to have a very clear view on where and how our custom strategy differs from a simple buy & hold approach. The customizable date range also provides flexibility in analyzing the pros & cons of our strategy in different periods.

Further enriching the benchmarks, metrics and visualizations can turn this into an extremely powerful toolkit for strategy analysis. It provides a template and framework for making strategy analysis and enhancements much more efficient.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Enable Info Panel|
|v_input_2|true|Enable Indicator Panel|
|v_input_3|1970|From Year|
|v_input_4|true|From Month|
|v_input_5|true|From Day|
|v_input_6|2050|To Year|
|v_input_7|12|To Month|
|v_input_8|31|To Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-28 00:00:00
end: 2024-01-04 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("VS Buy Hold", precision=2)

bnh_info_panel = input(true, title='Enable Info Panel')
bnh_indicator_panel = input(true, title='Enable Indicator Panel')

//COMPARISON DATE RANGE//
bnh_FromYear = input(1970, title="From Year", minval=1970)
bnh_FromMonth = input(1, title="From Month", minval=1, maxval=12)
bnh_FromDay = input(1, title="From Day", minval=1, maxval=31)

bnh_ToYear = input(2050, title="To Year", minval=2010)
bnh_ToMonth = input(12, title="To Month", minval=1, maxval=12)
bnh_ToDay = input(31, title="To Day", minval=1, maxval=31)

bnh_start = timestamp(bnh_FromYear, bnh_FromMonth, bnh_FromDay, 00, 00)
bnh_finish = timestamp(bnh_ToYear, bnh_ToMonth, bnh_ToDay, 23, 59)
bnh_timeCond = time >= bnh_start and time <= bnh_finish ? true: false
    
//Note: If you are going to use the COMPARISON DATE RANGE above, apply bnh_timeCond
//      to your strategy parameters.


/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////STRATEGY SCRIPT START//////////////////////////////////

//=========================PLACEHOLDER MA CROSS STRATEGY=========================//
fastLength = 50
slowLength = 200
price = close

mafast = sma(price, fastLength)
maslow = sma(price, slowLength)
strategy.initial_capital = 50000
positionSize = strategy.initial_capital / close

if (crossover(mafast, maslow) and bnh_timeCond) // <= bnh_timeCond added as a condition
    strategy.entry("MA2CrossLE", strategy.long, positionSize, comment="MA2CrossLE")

if (crossunder(mafast, maslow) and bnh_timeCond) // <= bnh_timeCond added as a condition
    strategy.entry("MA2CrossSE", strategy.short, positionSize, comment="MA2CrossSE")

//////////////////////////////STRATEGY SCRIPT END////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////



//STRATEGY EQUITY
strategy_pnl = strategy.netprofit + strategy.openprofit
bnh_strategy_pnl_pcnt = (strategy_pnl / strategy.initial_capital) * 100


//BUY AND HOLD EQUITY
float bnh_start_bar = na
bnh_start_bar := na(bnh_start_bar[1]) and bnh_timeCond? close : bnh_start_bar[1]
bnl_buy_hold_equity = ((close - bnh_start_bar)/bnh_start_bar) * 100


//STRATEGY VS BUY AND HOLD STATS
bnh_vs_diff = bnh_strategy_pnl_pcnt - bnl_buy_hold_equity

bnh_bar_counter = 0
bnh_bar_counter := bnh_vs_diff > 0 ? nz(bnh_bar_counter[1]) + 1 : bnh_bar_counter[1]

bnh_bar_counter2 = 0
bnh_bar_counter2 := bnh_vs_diff <= 0 ? nz(bnh_bar_counter2[1]) + 1 : bnh_bar_counter2[1]

bnh_pcnt_above = (bnh_bar_counter/(bnh_bar_counter + bnh_bar_counter2))*100
bnh_pcnt_below = (bnh_bar_counter2/(bnh_bar_counter + bnh_bar_counter2))*100

bnh_average_diff = cum(bnh_vs_diff) / (bnh_bar_counter + bnh_bar_counter2)


//PLOTS AND LABELS
bnh_diff_color = bnh_vs_diff > 0 ? color.green : color.red
plot(bnh_vs_diff, style=plot.style_columns, color=bnh_diff_color, transp=60, title='SvB')
plot(bnh_strategy_pnl_pcnt, color=color.yellow, linewidth=2, title="SR")
plot(bnl_buy_hold_equity, color=color.blue, title="BHR")

// draw_IndicatorLabel(_text, _x, _y, label_color, font_color)=>
//     string_text = _text
//     var label la_indicator = na
//     label.delete(la_indicator)
//     la_indicator := label.new(
//          x=_x, y=_y, 
//          text=string_text, xloc=xloc.bar_index, yloc=yloc.price, 
//          color=label_color, style=label.style_labeldown, textcolor=font_color, size=size.small)

// draw_InfoPanel(_text, _x, _y, font_size)=>
//     var label la_panel = na
//     label.delete(la_panel)
//     la_panel := label.new(
//          x=_x, y=_y, 
//          text=_text, xloc=xloc.bar_time, yloc=yloc.price, 
//          color=color.new(#383838, 5), style=label.style_labelup, textcolor=color.white, size=font_size)

// if bnh_indicator_panel         
//     draw_IndicatorLabel("Difference", bar_index, bnh_vs_diff, color.new(color.gray, 40), color.white)
//     draw_IndicatorLabel("Strategy P/L", bar_index, bnh_strategy_pnl_pcnt, color.new(color.yellow, 50), color.white)
//     draw_IndicatorLabel("Buy & Hold P/L", bar_index, bnl_buy_hold_equity, color.new(color.blue, 50), color.white)

// info_panel_x = time_close + round(change(time) * 200)
// info_panel_y = max(max(bnl_buy_hold_equity, bnh_strategy_pnl_pcnt), bnh_vs_diff) + abs(bnh_vs_diff * 0.25)


// title = "STRATEGY vs BUY & HOLD STATS"
// row0 = "-----------------------------------------------------"
// row1 = 'Bars Above Buy & Hold: ' + tostring(bnh_pcnt_above, '#.##') + '%'
// row2 = 'Bars Below Buy & Hold: ' + tostring(bnh_pcnt_below, '#.##') + '%'
// row3 = 'All Time Ave. Difference: ' + tostring(bnh_average_diff, '#.##') + '%'

// panel_text = '\n' + title + '\n' + row0 + '\n' + row1 + '\n\n' + row2 + '\n\n' + row3 + '\n'

// if bnh_info_panel
//     draw_InfoPanel(panel_text, info_panel_x, info_panel_y, size.normal)


```

> Detail

https://www.fmz.com/strategy/437783

> Last Modified

2024-01-05 15:27:26
