
> Name

RSI-Combined-with-Bollinger-Bands-and-Dynamic-Support-Resistance-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14d3aeb93aa864e61eb.png)

## Overview
This strategy uses the RSI indicator to judge the overbought/oversold levels in the market, combined with Bollinger Bands to determine the price fluctuation range. In addition, dynamic support/resistance are generated based on high/low prices to trigger buy/sell orders only when the price is close to support/resistance levels. Users can set a trend filter condition, such as simple moving average, to ensure the price trend aligns with trade directions. This strategy integrates multiple technical indicators for robust signal accuracy and captures market opportunities effectively.

## Strategy Logic
The strategy consists of 3 key components – RSI, Bollinger Bands and Dynamic S/R.

The RSI component judges overbought/oversold levels. RSI dropping below 30 suggests oversold condition and triggers buy signal. RSI rising above 70 suggests overbought condition and triggers sell signal.  

Bollinger Bands are upper/lower bands calculated from price moving average and standard deviation, to determine if price has broken out of the normal fluctuation range. Price approaching upper band suggests a sell while lower band suggests a buy.

The S/R component uses a dynamic calculation method to generate key S/R levels based on historical high/low prices (or close/open prices) within certain lookback periods and percentage ranges, as well as historical price reversal points. It triggers sell signal when price rises to key resistance levels, and buy signal when price drops to support levels.

In summary, this strategy initiates buy/sell trades only when RSI overbought/oversold, price breaking out of Bollinger Bands, as well as proximity to dynamic S/R levels are met. 

## Advantages
1. Fundamental indicator RSI combined with technical analysis indicator Bollinger Bands. RSI judges overbought/oversold levels fundamentally while Bollinger Bands determines technical price patterns.

2. Dynamic S/R calculation adheres closer to actual S/R that governs price movement.  

3. Adding a trend filter further improves signal accuracy by filtering out noise when combined with RSI and Bollinger Bands.

## Risks 
1. Improper RSI parameter settings may cause misjudgement. Too short RSI length increases noise. Incorrect overbought/oversold threshold setup also leads to errors.

2. Incorrect Bollinger Bands parameters such as length, StdDev multiplier affects judging accuracy.  

3. Dynamic S/R relies on historical high/low prices thus tends to lag. Users should optimize S/R parameters for greater relevance to current price.

4. This strategy has relatively complex logic with multiple indicators potentially causing interference. Users should test parameters to reduce conflict. Simplifying entry criteria also helps minimize errors.

## Optimization Directions
1. Test and optimize RSI parameters including length, overbought/oversold thresholds.  

2. Test and optimize Bollinger Bands parameters including length and StdDev multiplier.

3. Optimize dynamic S/R parameters to align S/R levels closer to price, such as using shorter lookback periods or fewer historical high/low prices.  

4. Test additional auxiliary indicators in combination with RSI, such as KDJ, MACD etc to improve accuracy.

5. Test and optimize trend filter parameters, filter length in particular, to extend holding period and reduce unnecessary reverse orders.

## Conclusion  
This strategy leverages the strengths of multiple indicators like RSI, Bollinger Bands and Dynamic S/R, with extensive cross verification for robust signal accuracy. Adding a trend filter further reduces noise. With flexible parameter tuning, users can optimize this strategy to best suit their needs. Proper parameter testing and optimization will lead to more pronounced performance. This is a highly promising quantitative strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|RSI Length|
|v_input_int_2|70|Overbought Level|
|v_input_int_3|30|Oversold Level|
|v_input_int_4|20|BB Length|
|v_input_float_1|2|BB Deviation|
|v_input_int_5|10|Pivot Period|
|v_input_string_1|0|Pivot Source: High/Low|Close/Open|
|v_input_int_6|20|Maximum Number of Pivot|
|v_input_int_7|10|Maximum Channel Width %|
|v_input_int_8|5|Maximum Number of S/R Levels|
|v_input_int_9|2|Minimum Strength|
|v_input_bool_1|false|Use Trend Filter|
|v_input_int_10|50|Trend Filter Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-17 00:00:00
end: 2024-01-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("RSI + BB + S/R Strategy with Trend Filter", shorttitle="RSI + BB + S/R + Trend Filter", overlay=true)

// RSI Settings
rsi_length = input.int(14, title="RSI Length")
overbought = input.int(70, title="Overbought Level")
oversold = input.int(30, title="Oversold Level")

// Bollinger Bands Settings
bb_length = input.int(20, title="BB Length")
bb_deviation = input.float(2.0, title="BB Deviation")

// Dynamic Support/Resistance Settings
pivot_period = input.int(10, title="Pivot Period")
pivot_source = input.string("High/Low", title="Pivot Source", options=["High/Low", "Close/Open"])
max_pivots = input.int(20, title="Maximum Number of Pivot", minval=5, maxval=100)
channel_width = input.int(10, title="Maximum Channel Width %", minval=1)
max_sr_levels = input.int(5, title="Maximum Number of S/R Levels", minval=1, maxval=10)
min_strength = input.int(2, title="Minimum Strength", minval=1, maxval=10)

// Trend Filter Settings
use_trend_filter = input.bool(false, title="Use Trend Filter")
trend_filter_length = input.int(50, title="Trend Filter Length")

// Calculate RSI and Bollinger Bands
rsi = ta.rsi(close, rsi_length)
basis = ta.sma(close, bb_length)
deviation = ta.stdev(close, bb_length)
upper_band = basis + bb_deviation * deviation
lower_band = basis - bb_deviation * deviation

// Plot Bollinger Bands on the chart
plot(upper_band, color=color.blue, title="Upper Bollinger Band")
plot(lower_band, color=color.red, title="Lower Bollinger Band")

// Dynamic Support/Resistance Calculation
float src1 = pivot_source == "High/Low" ? high : math.max(close, open)
float src2 = pivot_source == "High/Low" ? low : math.min(close, open)
float ph = ta.pivothigh(src1, pivot_period, pivot_period)
float pl = ta.pivotlow(src2, pivot_period, pivot_period)


// Calculate maximum S/R channel zone width
prdhighest = ta.highest(300)
prdlowest = ta.lowest(300)
cwidth = (prdhighest - prdlowest) * channel_width / 100

var pivotvals = array.new_float(0)

if ph or pl
    array.unshift(pivotvals, ph ? ph : pl)
    if array.size(pivotvals) > max_pivots
        array.pop(pivotvals)

get_sr_vals(ind) =>
    float lo = array.get(pivotvals, ind)
    float hi = lo
    int numpp = 0
    for y = 0 to array.size(pivotvals) - 1 by 1
        float cpp = array.get(pivotvals, y)
        float wdth = cpp <= lo ? hi - cpp : cpp - lo
        if wdth <= cwidth
            if cpp <= hi
                lo := math.min(lo, cpp)
            else
                hi := math.max(hi, cpp)
            numpp += 1
    [hi, lo, numpp]

var sr_up_level = array.new_float(0)
var sr_dn_level = array.new_float(0)
sr_strength = array.new_float(0)

find_loc(strength) =>
    ret = array.size(sr_strength)
    for i = ret > 0 ? array.size(sr_strength) - 1 : na to 0 by 1
        if strength <= array.get(sr_strength, i)
            break
        ret := i
    ret

check_sr(hi, lo, strength) =>
    ret = true
    for i = 0 to array.size(sr_up_level) > 0 ? array.size(sr_up_level) - 1 : na by 1
        if array.get(sr_up_level, i) >= lo and array.get(sr_up_level, i) <= hi or array.get(sr_dn_level, i) >= lo and array.get(sr_dn_level, i) <= hi
            if strength >= array.get(sr_strength, i)
                array.remove(sr_strength, i)
                array.remove(sr_up_level, i)
                array.remove(sr_dn_level, i)
            else
                ret := false
            break
    ret

if ph or pl
    array.clear(sr_up_level)
    array.clear(sr_dn_level)
    array.clear(sr_strength)
    for x = 0 to array.size(pivotvals) - 1 by 1
        [hi, lo, strength] = get_sr_vals(x)
        if check_sr(hi, lo, strength)
            loc = find_loc(strength)
            if loc < max_sr_levels and strength >= min_strength
                array.insert(sr_strength, loc, strength)
                array.insert(sr_up_level, loc, hi)
                array.insert(sr_dn_level, loc, lo)
                if array.size(sr_strength) > max_sr_levels
                    array.pop(sr_strength)
                    array.pop(sr_up_level)
                    array.pop(sr_dn_level)

// Calculate the Trend Filter
trend_filter = use_trend_filter ? ta.sma(close, trend_filter_length) : close

// Buy Condition (RSI + Proximity to Support + Trend Filter)
buy_condition = ta.crossover(rsi, oversold) and close <= ta.highest(high, max_sr_levels) and close >= ta.lowest(low, max_sr_levels) and (not use_trend_filter or close > trend_filter)

// Sell Condition (RSI + Proximity to Resistance + Trend Filter)
sell_condition = ta.crossunder(rsi, overbought) and close >= ta.lowest(low, max_sr_levels) and close <= ta.highest(high, max_sr_levels) and (not use_trend_filter or close < trend_filter)

// Strategy Orders
strategy.entry("Buy", strategy.long, when = buy_condition)
strategy.entry("Sell", strategy.short, when = sell_condition)
```

> Detail

https://www.fmz.com/strategy/439876

> Last Modified

2024-01-24 15:19:22
