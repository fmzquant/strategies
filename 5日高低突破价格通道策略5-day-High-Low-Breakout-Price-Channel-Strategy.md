
> Name

5日高低突破价格通道策略5-day-High-Low-Breakout-Price-Channel-Strategy

> Author

ChaoZhang

> Strategy Description



[trans]
本策略名称为“5日高低突破价格通道策略”。该策略通过统计最近5个交易日的最高价和最低价构建价格通道,在价格突破通道时进行趋势交易。

具体步骤如下:

1. 计算最近5个交易日的最高价和最低价。

2. 取最高的2个最高价构建上轨,取最低的2个最低价构建下轨。

3. 当价格上涨超过上轨一定比例时(如0.3%),产生买入信号。

4. 当价格下跌超过下轨一定比例时,产生卖出信号。 

5. 入场后以第二高低位作为止损位,或追踪一定比例止盈(如0.5%)后平仓。

该策略的优势是通过突破关键的最高/低价格来判断趋势转折点。突破通道代表价量集中推动价格。但需要防止在盘整中产生过多无效信号。

总体来说,关注关键价格区域的突破是较为经典的趋势跟踪策略。但交易者仍需要辅助其他指标确认,并优化参数,以发挥该策略最大效用。


||

This strategy is named "5-day High-Low Breakout Price Channel Strategy". It constructs a price channel using the highest high and lowest low prices over the past 5 trading days, and trades breakouts of the channel.

The steps are:

1. Calculate the highest high and lowest low prices over the past 5 trading days. 

2. Take the top 2 highest high prices to build the upper rail, and the bottom 2 lowest low prices for the lower rail.

3. When price rises above the upper rail by a certain percentage (e.g. 0.3%), a buy signal is generated.

4. When price drops below the lower rail by a certain percentage, a sell signal is generated.

5. After entry, the second highest/lowest price is used as the stop loss, or take profit at a certain percentage (e.g. 0.5%) is tracked before exiting.

The advantage is using key high/low price breakouts to determine trend reversal points. Breaking the channel represents concentrated price-volume thrusts. But over-trading in ranging markets should be prevented. 

In summary, watching key price area breakouts is a classical trend following approach. But traders still need confirmation with other indicators and parameter optimization to maximize the strategy's utility.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.3|Entry - % point above high/low|
|v_input_2|0.5|Profit Target %|
|v_input_3|BOTH|Trade Type: LONG, SHORT, BOTH ( case sensitive )|
|v_input_4|2|High/Low line width (Enter 0 to hide )|
|v_input_5|NO|Display sorted low/high: YES, NO ( case sensitive )|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-13 00:00:00
end: 2023-09-12 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=4
// Based on Sort pseudo-array v2 by apozdnyakov https://www.tradingview.com/script/IUlIoSnA-Sort-pseudo-array-v2/

strategy(title="5 Day high/low breakout strategy", shorttitle="5 days range breakout", overlay=true)
entry_factor = input(title="Entry - % point above high/low", type=input.float, defval=0.3, minval=0, maxval=5)
profit_target = input(title="Profit Target %", type=input.float, defval=0.5, minval=0, maxval=5)
trade_type   = input(defval = "BOTH", title = "Trade Type: LONG, SHORT, BOTH ( case sensitive )", type = input.string)
width = input(defval = 2, title = "High/Low line width (Enter 0 to hide )", type = input.integer, minval=0, maxval=5)
debug = input(defval= "NO", title = "Display sorted low/high: YES, NO ( case sensitive )", type = input.string)

high_day1 = security(syminfo.tickerid, "D", high[1], lookahead = barmerge.lookahead_on)
high_day2 = security(syminfo.tickerid, "D", high[2], lookahead = barmerge.lookahead_on)
high_day3 = security(syminfo.tickerid, "D", high[3], lookahead = barmerge.lookahead_on)
high_day4 = security(syminfo.tickerid, "D", high[4], lookahead = barmerge.lookahead_on)
high_day5 = security(syminfo.tickerid, "D", high[5], lookahead = barmerge.lookahead_on)

low_day1 = security(syminfo.tickerid, "D", low[1], lookahead = barmerge.lookahead_on)
low_day2 = security(syminfo.tickerid, "D", low[2], lookahead = barmerge.lookahead_on)
low_day3 = security(syminfo.tickerid, "D", low[3], lookahead = barmerge.lookahead_on)
low_day4 = security(syminfo.tickerid, "D", low[4], lookahead = barmerge.lookahead_on)
low_day5 = security(syminfo.tickerid, "D", low[5], lookahead = barmerge.lookahead_on)


// sorts a list of up to the fixed length
sort_all(type) =>
	float s0 = na
	float s1 = na
	float s2 = na
	float s3 = na
	float s4 = na

    h_val = security(syminfo.tickerid, "D", high, false)
	
	float min = na
	float last = na

	for i = 0 to 4
		float min_local = na
		float last_local = na
		float val = na
		
		for l = 0 to 4
    		if type == "high"
    		    val := l == 0 ? high_day1 : val
                val := l == 1 ? high_day2 : val
		        val := l == 2 ? high_day3 : val
    		    val := l == 3 ? high_day4 : val
	    	    val := l == 4 ? high_day5 : val
            else
    		    val := l == 0 ? low_day1 : val
	    	    val := l == 1 ? low_day2 : val
		        val := l == 2 ? low_day3 : val
    		    val := l == 3 ? low_day4 : val
	    	    val := l == 4 ? low_day5 : val

			if(na(min) or val > min or (val == min and l > last))
				new_min_local = na(min_local) ? val : min(min_local, na(min) ? val : max(min, val))
				if(na(min_local) or new_min_local != min_local)
					last_local := l
					min_local := new_min_local
		
		min := min_local
		last := last_local
		
		s0 := i == 0 ? min : s0
		s1 := i == 1 ? min : s1
		s2 := i == 2 ? min : s2
		s3 := i == 3 ? min : s3
		s4 := i == 4 ? min : s4

	[s0, s1, s2, s3, s4]


[high5, high4, high3, high2, high1] = sort_all("high")
[low1, low2, low3, low4, low5] = sort_all("low")

plot(high1, color = color.blue, style=plot.style_circles, linewidth=width)
plot(high2, color = color.red, style=plot.style_circles, linewidth=width)
plot(low1, color = color.blue, style=plot.style_circles, linewidth=width)
plot(low2, color = color.red, style=plot.style_circles, linewidth=width)


if close >= (high1 * (1 + entry_factor/100)) and strategy.position_size == 0 and hour <= 12
    strategy.entry(id = "long_entry", long = true, qty = 1, stop = high2)

strategy.close(id = "long_entry", when = strategy.position_size != 0 and (close < high2  or close > high1 * (1 + (entry_factor + profit_target)/100)))


if close <= (low1 * (1 - entry_factor/100)) and strategy.position_size == 0 and hour <= 12
    strategy.entry(id = "short_entry", long = false, qty = 1, stop = low2)

strategy.close(id = "short_entry", when = strategy.position_size != 0 and (close > low2  or close < low1 * (1 - (entry_factor + profit_target)/100)))
    

if (hour == 14)
    strategy.close_all()

//No more than 1 order per day
// strategy.risk.max_intraday_filled_orders(2)


//Check whether this is the first bar of the day? If yes, display highs for last 5 days
// t = time("1440", session.regular)
// is_first = na(t[1]) and not na(t) or t[1] < t

// if (is_first and debug != "NO")  
//     label.new(bar_index, na, tostring(high1) + ", " + tostring(high2) + ", " + tostring(high3) + ", " + tostring(high4) + ", " + tostring(high5), style=label.style_cross, yloc=yloc.abovebar)
//     label.new(bar_index, na, tostring(low1) + ", " + tostring(low2) + ", " + tostring(low3) + ", " + tostring(low4) + ", " + tostring(low5), style=label.style_cross, yloc=yloc.belowbar)

```

> Detail

https://www.fmz.com/strategy/426607

> Last Modified

2023-09-13 17:05:43
