
> Name

BabyShark-VWAP-Trading-Strategy-Based-on-VWAP-and-OBV-RSI-Indicators

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c7b3774ac791c048ec.png)

## Strategy Overview

The BabyShark VWAP trading strategy is a quantitative trading strategy based on Volume Weighted Average Price (VWAP) and On Balance Volume Relative Strength Index (OBV RSI). The strategy aims to identify potential buy and sell signals based on deviations from VWAP and OBV RSI crossing certain threshold levels.

## Strategy Principle

The core principle of this strategy is to utilize VWAP and OBV RSI indicators to capture market trends and momentum changes. VWAP is a dynamic moving average based on price and volume, which reflects the main trading areas of the market. When the price significantly deviates from VWAP, it usually indicates overbought or oversold conditions in the market. OBV RSI, on the other hand, introduces the volume factor on the basis of the traditional RSI indicator to determine the strength of market trends by measuring the intensity of volume changes.

Specifically, the strategy uses 60 candles as the calculation period for VWAP, with the closing price as the input data. It then constructs overbought and oversold zones based on price deviations of positive and negative 3 standard deviations from VWAP. For OBV RSI, it uses 5 candles as the calculation period and sets thresholds of 70 and 30 as criteria for determining overbought and oversold conditions.

In terms of trading logic, when the price is in the oversold zone below the lower band of VWAP and OBV RSI is less than 30, the strategy generates a long signal. Conversely, when the price is in the overbought zone above the upper band of VWAP and OBV RSI is greater than 70, it generates a short signal. Additionally, the strategy sets a take profit and stop loss ratio of 0.6% and introduces a cooling-off period of 10 candles after consecutive losses to control risks.

## Strategy Advantages

1. Combines multiple market factors such as price and volume to comprehensively capture market trends and momentum.
2. Adopts dynamic VWAP and OBV RSI indicators to adapt to changes in different market cycles.
3. Sets reasonable take profit and stop loss ratios and cooling-off periods to effectively control risks while seizing opportunities.
4. Clear logic, easy to understand and implement, with a certain level of interpretability.
5. Adjustable parameters, suitable for traders with different styles to optimize and improve.

## Strategy Risks

1. For oscillating or repetitive markets, frequent trading signals may lead to overtrading and increased slippage costs.
2. In trending markets, solely relying on VWAP for profit-taking may cause the strategy to exit too early, missing out on subsequent trend profits.
3. Fixed parameter settings may not adapt to changes in market conditions, requiring optimization for different instruments and timeframes.
4. OBV indicator heavily relies on volume data; when volume data is inaccurate or manipulated, indicator distortions may mislead judgments.
5. The strategy lacks consideration of external factors such as macroeconomics and news, and may fail in extreme market conditions.

## Optimization Directions

1. Introduce more filtering conditions for oscillating markets, such as trend confirmation indicators and volatility indicators, to reduce frequent trading.
2. Optimize exit conditions, such as using trailing stops or combining with other trend-following indicators to better capture trending markets.
3. Perform adaptive optimization of VWAP and OBV RSI parameters, dynamically adjusting calculation periods and threshold settings.
4. Introduce volume authenticity verification mechanisms to improve the reliability of the OBV RSI indicator.
5. Consider incorporating macroeconomic data analysis, sentiment indicators, etc., to enhance the adaptability and robustness of the strategy.

## Summary

The BabyShark VWAP trading strategy is a quantitative trading strategy that combines volume weighted average price and on balance volume relative strength index to generate trading signals by capturing overbought and oversold conditions and changes in trend momentum. The strategy has clear logic, integrating multiple market factors such as price and volume to comprehensively grasp the market pulse. At the same time, reasonable take profit and stop loss settings and risk control mechanisms allow the strategy to pursue returns while considering risk management. However, the strategy also has potential issues such as inadequate adaptability to oscillating and trending markets and fixed parameters. Future improvements can focus on optimizing entry filters, dynamic profit-taking, adaptive parameters, enhancing external data analysis, and further improving the robustness and profitability of the strategy. Overall, the BabyShark VWAP trading strategy provides a reference framework for quantitative trading practice that is worth further exploration and improvement.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|(?Optional)Log-space|
|v_input_2|60|(?Strategy Modification)length|
|v_input_3_close|0|source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|5|RSI Length|
|v_input_6|70|Higher Level|
|v_input_7|30|Lower Level|
|v_input_4|false|(?Deviation Cross Monitor)Show Table|
|v_input_5|300|Table Lookback Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-01 00:00:00
end: 2024-02-29 23:59:59
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © GreatestUsername

//@version=5
strategy("BabyShark VWAP Strategy", overlay=true, margin_long=100, margin_short=100, calc_on_every_tick = true)


// VWAP
ls = input(false, title='Log-space', group = "Optional")
type = 'Average Deviation'
length = input(60, group="Strategy Modification")
source = input(close, group="Strategy Modification")
_low = ls == true ? math.log(low) : low
_high = ls == true ? math.log(high) : high
src = ls == true ? math.log(source) : source

//weighted mean
pine_vwmean(x, y) =>
    cw = 0.0
    cd = 0.0
    w_sum = 0.0
    d_sum = 0.0
    for i = 0 to y - 1 by 1
        cd := x[i]
        cw := volume[i]
        d_sum += cw * cd
        w_sum += cw
        w_sum
    d_sum / w_sum

//weighted standard deviation
pine_vwstdev(x, y, b) =>
    d_sum = 0.0
    w_sum = 0.0
    cd = 0.0
    for i = 0 to y - 1 by 1
        cd := x[i]
        cw = volume[i]
        d_sum += cw * math.pow(cd - b, 2)
        w_sum += cw
        w_sum
    math.sqrt(d_sum / w_sum)

//weighted average deviation
pine_vwavdev(x, y, b) =>
    d_sum = 0.0
    w_sum = 0.0
    cd = 0.0
    for i = 0 to y - 1 by 1
        cd := x[i]
        cw = volume[i]
        d_sum += cw * math.abs(cd - b)
        w_sum += cw
        w_sum
    d_sum / w_sum

vwmean = pine_vwmean(src, length)

//consider using Average Deviation instead of Standard Deviatio if there are values outside of 3rd upper & lower bands within a rolling window
dev = if type == 'Standard Deviation'
    dev = pine_vwstdev(src, length, vwmean)
    dev
else if type == 'Average Deviation'
    dev = pine_vwavdev(src, length, vwmean)
    dev

basis = ls == true ? math.exp(vwmean) : vwmean
plot(basis, color=color.new(#b7b7b7, 60), title='Basis')

upper_dev_2 = vwmean + dev * 2
upper_dev_3 = vwmean + dev * 3

lower_dev_2 = vwmean - dev * 2
lower_dev_3 = vwmean - dev * 3

fill(
     plot1=plot(ls == true ? math.exp(upper_dev_2) : upper_dev_2, color=color.new(#B20000, 0), title='Upper dev 2'), 
     plot2=plot(ls == true ? math.exp(upper_dev_3) : upper_dev_3, color=color.new(#FF6666, 0), title='Upper dev 3', display=display.none), 
     color=color.new(#FF4D4D, 80), title='Upper band'
     )
fill(
     plot1=plot(ls == true ? math.exp(lower_dev_3) : lower_dev_3, color=color.new(#00CC00, 0), title='Lower dev 3', display=display.none), 
     plot2=plot(ls == true ? math.exp(lower_dev_2) : lower_dev_2, color=color.new(#008000, 0), title='Lower dev 2'), 
     color=color.new(#006600, 80), title='Lower band'
     )


// Input to enable or disable the table visibility
table_visible = input(false, title="Show Table", group="Deviation Cross Monitor")
// Input for the number of candles to look back
table_length = input(300, title="Table Lookback Length", group="Deviation Cross Monitor")

// Custom count function
count_occurrences(cond, length) =>
    count = 0
    for i = 0 to length - 1
        if cond[i]
            count := count + 1
    count

// Count occurrences of prices above Upper dev 2 and below Lower dev 2

above_upper_dev_2 = count_occurrences(close > upper_dev_2, table_length)
below_lower_dev_2 = count_occurrences(close < lower_dev_2, table_length)

// Create table in the bottom right corner
var table tbl = table.new(position=position.bottom_right, rows=2, columns=2)

if table_visible
    if barstate.islast
        // Update the table headers
        table.cell(tbl, 0, 0, "Above Upper Dev 2", bgcolor=color.gray, text_color=color.white)
        table.cell(tbl, 0, 1, "Below Lower Dev 2", bgcolor=color.gray, text_color=color.white)
        
        // Update the table values
        table.cell(tbl, 1, 0, str.tostring(above_upper_dev_2), bgcolor=color.new(color.green, 90), text_color=color.green)
        table.cell(tbl, 1, 1, str.tostring(below_lower_dev_2), bgcolor=color.new(color.red, 90), text_color=color.red)
else
    table.delete(tbl)

// RSI
obvsrc = close
change_1 = ta.change(obvsrc)
obv = ta.cum(ta.change(obvsrc) > 0 ? volume : change_1 < 0 ? -volume : 0 * volume)

src2 = obv
len = input.int(5, minval=1, title="RSI Length", group="Strategy Modification")
up = ta.rma(math.max(ta.change(src2), 0), len)
down = ta.rma(-math.min(ta.change(src2), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - 100 / (1 + up / down)
higherlvl = input(70, title="Higher Level", group="Strategy Modification")
lowerlvl = input(30, title="Lower Level", group="Strategy Modification")


plot_color = rsi >= higherlvl ? color.red : rsi <= lowerlvl ? color.green : color.new(#b7b7b7, 60)
// plot(rsi, color=plot_color)

//plot(rsi, color=color.white)



// Count occurrences of RSI crossing higher level and lower level
cross_above_higher = ta.crossover(rsi, higherlvl)
cross_below_lower = ta.crossunder(rsi, lowerlvl)
above_higher_count = count_occurrences(cross_above_higher, table_length)
below_lower_count = count_occurrences(cross_below_lower, table_length)

// Create table in the bottom right corner
if (table_visible)
    var table tbl2 = table.new(position=position.bottom_right, rows=2, columns=2)
    if (barstate.islast)
        // Update the table headers
        table.cell(tbl2, 0, 0, "Higher Level Cross", bgcolor=color.gray, text_color=color.white)
        table.cell(tbl2, 0, 1, "Lower Level Cross", bgcolor=color.gray, text_color=color.white)
        
        // Update the table values
        table.cell(tbl2, 1, 0, str.tostring(above_higher_count), bgcolor=color.new(color.red, 90), text_color=color.red)
        table.cell(tbl2, 1, 1, str.tostring(below_lower_count), bgcolor=color.new(color.green, 90), text_color=color.green)


// Entries

// Long Entry:
// Price is in the shaded GREEN area of [Hoss] VWAP Deviation
// and the [Hoss] OBV RSI is GREEN.
longCondition1 = close <= lower_dev_3
longConditions = plot_color == color.green and longCondition1 and strategy.position_size == 0

// Short Entry:
// Price is in the shaded RED area of [Hoss] VWAP Deviation
// and the [Hoss] OBV RSI is RED.
shortCondition1 = close >= upper_dev_3
shortConditions = plot_color == color.red and shortCondition1 and strategy.position_size == 0

var int lastEntryBar = 0


shortEMA = ta.ema(close, 12)
longEMA = ta.ema(close, 21)
uptrend = shortEMA > longEMA

if longConditions and lastEntryBar < bar_index - 10 //and uptrend
    strategy.entry("Long", strategy.long, stop=close * 0.994)
    lastEntryBar := bar_index

if shortConditions and lastEntryBar < bar_index - 10 //and not uptrend
    strategy.entry("Short", strategy.short, stop=close * 1.006)
    lastEntryBar := bar_index


if strategy.position_size > 0 and (ta.crossover(close, basis) or strategy.opentrades.entry_price(strategy.opentrades - 1) * 0.994 > close)
    strategy.close("Long", immediately = true)
if strategy.position_size < 0 and (ta.crossunder(close, basis) or strategy.opentrades.entry_price(strategy.opentrades - 1) * 1.006 < close)
    strategy.close("Short", immediately = true)

// Stop Loss:
// 0.6%
// After 1 Loss => NO more Trades for 10 Candles (10 minutes) (usually a breakout will happen, and it takes average 10min till it ranges again. So basically wait for range to form again)

// Take Profit:
// Grey line on [Hoss] VWAP Deviation or 0.6%


```

> Detail

https://www.fmz.com/strategy/444022

> Last Modified

2024-03-08 16:39:28
