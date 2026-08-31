
> Name

基于市场多空力量的Ichimoku云突破策略Market-Sentiment-Based-Ichimoku-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11a0bb50187e9a54be7.png)

## Overview

This strategy combines Ichimoku Cloud indicators to gauge market sentiment and identify potential breakout opportunities. It has Ichimoku-based trend filtering, ATR/percentage trailing stops, and an optional profit taking mechanism.

## Strategy Logic

There are two core components - Ichimoku Cloud signals to determine bullish/bearish momentum and strength burst signals to capture potential breakouts.

The trend signal requires Conversion Line to cross above Base Line to signal an uptrend, Lagging Span above price bars indicating strong momentum, and price breaking Ichimoku Cloud's top band. 

The strength burst signals for additional entry opportunities require price breaking through Cloud's recent lows and highs for ultra strength and Conversion/Base Line agreeing on bullish sentiment.

Long entries are triggered when either signal fires. Exits will trail stops based on ATR, percentage, or Ichimoku rules to lock in profits.

## Advantage Analysis  

The biggest edge comes from using Ichimoku Cloud for both trend and momentum analysis, making signals more accurate than lone indicators like moving averages. 

The risk management from ATR/percentage trailing stops also keeps loss per trade small. Optional profit taking further enhances reward consistency.

## Risk Analysis

Ichimoku Cloud has some lagging issues. Strength signals also increase chance of chasing momentum. 

To address lagging risk, optimize Cloud faster settings. For momentum risk, tighter trailing stops react quicker to reversals.  

## Optimization Directions

Possible improvements include:

1. Test on more market data for robustness.

2. Optimize Cloud parameters for specific instruments.  

3. Try ML like LSTM for better signal rating.

4. Add volume analysis to avoid bull traps.

## Conclusion

This Ichimoku system effectively gauges market sentiment for trend trading. The balanced focus on catching momentum and managing risk also makes it practical. There is room for improvement but overall a solid trend following framework.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|0|(?Strategy settings)Trail Source: Lows/Highs|Close|Open|
|v_input_string_2|0|Trail Method: ATR|Percent|Ichi exit|
|v_input_float_1|10|Trail Percent|
|v_input_int_1|7|Lookback|
|v_input_int_2|14|ATR Period|
|v_input_float_2|true|ATR Multiplier|
|v_input_bool_1|false|Add Ichimoku exit|
|v_input_bool_2|false|Use Take Profit|
|v_input_float_3|5|Take Profit Percentage|
|v_input_int_3|9|(?Ichimoku settings)Conversion Line Length|
|v_input_int_4|26|Base Line Length|
|v_input_int_5|52|Leading Span B Length|
|v_input_int_6|26|Lagging Span|
|v_input_int_7|26|Delta|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-04 00:00:00
end: 2024-02-03 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mikul_se
//@version=5
strategy("mikul's Ichimoku Cloud Strategy v 2.0", shorttitle="mikul's Ichi strat", overlay=true, margin_long=100, margin_short=100, default_qty_type = strategy.percent_of_equity, default_qty_value = 100)

// Strategy settings
strategySettingsGroup = "Strategy settings"
trailSource         = input.string(title="Trail Source", defval="Lows/Highs", options=["Lows/Highs", "Close", "Open"], confirm=true, group=strategySettingsGroup)
trailMethod         = input.string(title="Trail Method", defval="ATR", options=["ATR", "Percent", "Ichi exit"], confirm=true, tooltip="Ichi rules means it follows the rules of the Ichimoku cloud for exiting the trade.", group=strategySettingsGroup)
trailPercent        = input.float(title="Trail Percent", defval=10, minval=0.1, confirm=true, group=strategySettingsGroup)
swingLookback       = input.int(title="Lookback", defval=7, confirm=true, group=strategySettingsGroup)
atrPeriod           = input.int(title="ATR Period", defval=14, confirm=true, group=strategySettingsGroup)
atrMultiplier       = input.float(title="ATR Multiplier", defval=1.0, confirm=true, group=strategySettingsGroup)
addIchiExit         = input.bool(false, "Add Ichimoku exit", "You can use this to add Ichimoku cloud exit signals on top of Percent or ATR", group=strategySettingsGroup)
useTakeProfit       = input.bool(false, "Use Take Profit", confirm=true, group=strategySettingsGroup)
takeProfitPercent   = input.float(title="Take Profit Percentage", defval=5, minval=0.1, confirm=true, group=strategySettingsGroup)

// Ichimoku settings
ichimokuSettingsGroup = "Ichimoku settings"
conversionPeriods       = input.int(9, minval=1, title="Conversion Line Length", group=ichimokuSettingsGroup)
basePeriods             = input.int(26, minval=1, title="Base Line Length", group=ichimokuSettingsGroup)
laggingSpan2Periods     = input.int(52, minval=1, title="Leading Span B Length", group=ichimokuSettingsGroup)
displacement            = input.int(26, minval=1, title="Lagging Span", group=ichimokuSettingsGroup)
delta                   = input.int(26, minval=1, title="Delta", group=ichimokuSettingsGroup)

donchian(len) => math.avg(ta.lowest(len), ta.highest(len))
conversionLine = donchian(conversionPeriods)
baseLine       = donchian(basePeriods)
leadLine1      = math.avg(conversionLine, baseLine)
leadLine2      = donchian(laggingSpan2Periods)

uppercloud     = leadLine1[displacement-1]
bottomcloud    = leadLine2[displacement-1]

// Ichi exit variables and calculations 
delta2 = delta-3
average(len) => math.avg(ta.lowest(len), ta.highest(len))

conversion_line = average(conversionPeriods)
base_line       = average(basePeriods)
lead_line_a     = math.avg(conversion_line, base_line)
lead_line_b     = average(laggingSpan2Periods)
lagging_span    = close
lead_line_a_delta = lead_line_a[delta]
lead_line_b_delta = lead_line_b[delta]
lagging_span_delta = lagging_span[delta]
prisgris = hlc3[delta]
prisgris2 = hlc3[delta2]

// Declare trailing price variable (stores our trail stop value)
var float trailPrice    = na
float next_trailPrice   = na

// Get required trailing stop variables
atrValue       = ta.atr(atrPeriod) * atrMultiplier
swingLow       = ta.lowest(low, swingLookback)
swingHigh      = ta.highest(high, swingLookback)

// Ichi plotting
plot(conversionLine, color=#2962FF, title="Conversion Line")
plot(baseLine, color=#B71C1C, title="Base Line")
plot(close, offset=-displacement + 1, color=#43A047, title="Lagging Span")
p1 = plot(leadLine1, offset=displacement - 1, color=#A5D6A7, title="Leading Span A")
p2 = plot(leadLine2, offset=displacement - 1, color=#EF9A9A, title="Leading Span B")
fill(p1, p2, color=leadLine1 > leadLine2 ? color.rgb(67, 160, 71, 90) : color.rgb(244, 67, 54, 90))

// Plotting ichi crossover signals
ichiup = ta.crossover(conversionLine, baseLine)
ichidown = ta.crossover(baseLine, conversionLine)

plotshape(ichiup ? conversionLine : na, 'Ichi long 1', style=shape.circle, location=location.absolute, offset=0, color=#00ff00b0, size=size.tiny)
plotshape(ichidown ? conversionLine : na, 'Ichi short 1', style=shape.circle, location=location.absolute, offset=0, color=#ff1100c7, size=size.tiny)

// Pamp signal
signal5 = close > bottomcloud[displacement] and close > uppercloud[displacement] and close > high[displacement]
signal5b = close[1] <= bottomcloud[displacement+1] or close[1] <= uppercloud[displacement+1] or close <= high[displacement+1]
signal6 = close > bottomcloud and close > uppercloud and close > open
signal6b = close[1] <= bottomcloud[1] or close[1] <= uppercloud[1]
signal7 = leadLine1 > leadLine2
signal7b = leadLine1[1] <= leadLine2[1]
signal8 = conversionLine > baseLine

pamp = signal5 and signal6 and signal7 and signal8 and strategy.position_size == 0 and (signal5b or signal6b or signal7b)

// Trend signal
nsignal5 = close > close[displacement]
nsignal6 = close > bottomcloud and close > uppercloud and close > open
nsignal8 = ta.crossover(conversionLine, baseLine) and conversionLine > bottomcloud and conversionLine > uppercloud and baseLine > bottomcloud and baseLine > uppercloud

trend = nsignal5 and nsignal6 and nsignal8 and strategy.position_size == 0

plotshape(trend, style=shape.triangleup, location=location.belowbar, color=color.green)

if (trend or pamp)
    trailPrice := na
    strategy.entry(trend ? "Trend" : "Pamp", direction = strategy.long)

// Get trailing stop price
if trailMethod == "ATR"
    next_trailPrice := switch trailSource
        "Close" => strategy.position_size > 0 ? close - atrValue : close + atrValue
        "Open" => strategy.position_size > 0 ? open - atrValue : open + atrValue
        => strategy.position_size > 0 ? swingLow - atrValue : swingHigh + atrValue
else if trailMethod == "Percent"
    float percentMulti = strategy.position_size > 0 ? (100 - trailPercent) / 100 : (100 + trailPercent) / 100
    next_trailPrice := switch trailSource
        "Close" => close * percentMulti
        "Open" => open * percentMulti
        => strategy.position_size > 0 ? swingLow * percentMulti : swingHigh * percentMulti
else
    short_signal = (ta.crossunder(lagging_span, prisgris)) or ta.crossover(base_line, conversion_line) and ((close)) < ((lead_line_a)) or ta.crossunder(lagging_span, prisgris) or (ta.crossover(base_line, conversion_line) and ((lagging_span) < (lead_line_a)) and ((lagging_span) < (lead_line_b)))

    if short_signal
        strategy.close("Trend", "Ichi trend over")
        strategy.close("Pamp", "Ichi pamp over")
        alert("Sell")

if (addIchiExit)
    short_signal = (ta.crossunder(lagging_span, prisgris)) or ta.crossover(base_line, conversion_line) and ((close)) < ((lead_line_a)) or ta.crossunder(lagging_span, prisgris) or (ta.crossover(base_line, conversion_line) and ((lagging_span) < (lead_line_a)) and ((lagging_span) < (lead_line_b)))

    if short_signal
        strategy.close("Trend", "Ichi trend over")
        strategy.close("Pamp", "Ichi pamp over")
        alert("Sell")

// Check for trailing stop update
if strategy.position_size != 0 and barstate.isconfirmed
    if (next_trailPrice > trailPrice or na(trailPrice)) and strategy.position_size > 0
        trailPrice := next_trailPrice
        alert(message="Trailing Stop updated for " + syminfo.tickerid + ": " + str.tostring(trailPrice, "#.#####"), freq=alert.freq_once_per_bar_close)

    if (next_trailPrice < trailPrice or na(trailPrice)) and strategy.position_size < 0
        trailPrice := next_trailPrice
        alert(message="Trailing Stop updated for " + syminfo.tickerid + ": " + str.tostring(trailPrice, "#.#####"), freq=alert.freq_once_per_bar_close)

// Draw data to chart
plot(strategy.position_size != 0 ? trailPrice : na, color=color.red, title="Trailing Stop")

// Take Profit
float profitTarget = strategy.position_avg_price * (1 + takeProfitPercent / 100)

// Exit trade if stop is hit
strategy.exit(id="trend Exit", from_entry="Trend", stop=trailPrice, limit=useTakeProfit ? profitTarget : na)
strategy.exit(id="pamp Exit", from_entry="Pamp", stop=trailPrice, limit=useTakeProfit ? profitTarget : na)

if strategy.position_size == 0
    trailPrice = 0

```

> Detail

https://www.fmz.com/strategy/440975

> Last Modified

2024-02-04 14:46:22
