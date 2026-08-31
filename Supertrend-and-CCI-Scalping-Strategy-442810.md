
> Name

Supertrend-and-CCI-Scalping-Strategy-442810

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e69287ca3a4d199f2c.png)

## Overview

This strategy is based on two Super Trend indicators with different parameter settings and the CCI indicator, aiming to capture short-term price fluctuations for high-frequency trading. The Super Trend indicator judges the trend direction dynamically by calculating the ATR, while the CCI indicator is used to determine whether the market is overbought or oversold. The strategy combines both to form trading signals.

## Strategy Logic

- Use 14 periods ATR to calculate the fast Super Trend, with a factor set to 3; use 14 periods ATR to calculate the slow Super Trend, with a factor set to 6. The fast Super Trend is more sensitive and can capture short-term changes; the slow Super Trend determines the major trend direction.

- When the fast Super Trend crosses below the price, and the slow Super Trend is still above the price, it is judged as a possible reversal signal to go long; when the fast Super Trend crosses above the price, and the slow Super Trend is still below the price, it is judged as a possible reversal signal to go short.

- At the same time, use CCI to judge whether the market is overbought or oversold. CCI above 100 indicates an overbought market, while below -100 means an oversold market. CCI signals are combined to filter out false breakouts. 

- The probability of the Super Trend indicator issuing a reversal signal is higher when the market is overbought or oversold. This is the core logic of the strategy.

## Advantage Analysis

- Combining Super Trend to determine trend reversal points and CCI to judge overbought/oversold conditions can effectively filter out false breakouts and improve signal quality.

- Fast and slow Super Trend crossovers form trading signals to achieve high-frequency entry and exit.

- CCI parameters and Super Trend parameters can be flexibly adjusted to adapt to different market conditions. 

- The strategy idea is clear and easy to understand, and parameter adjustment is also relatively simple.

## Risks and Solutions

- Super Trend itself has lagging effect, possibly missing the first reversal opportunity. Can try shortening the ATR period.

- CCI has callback risks, and excessive fluctuations may also cause repetitive trading. Can try increasing CCI parameters or adjusting boundaries.

- High frequency trading is prone to increase transaction frequency and trading costs. It is recommended to adjust holding time and reduce open/close frequency.

## Optimization Directions 

- Parameters combination can be traversed and optimized based on max drawdown or profit/loss ratio to find the optimal parameter.

- Machine learning methods such as Random Forest can be used for feature selection on parameters to achieve automatic parameter optimization.

- Explore limiting the maximum number of opening positions within a certain cycle to control risks. 

## Conclusion

The strategy makes full use of the Super Trend indicator to determine short-term trend reversal points, supplemented by the CCI indicator to filter out signals. When parameter settings are reasonable, it can achieve efficient short-term trading. But also need to be wary of risks arising from excessive trading, and continuously improve the strategy performance through parameter tuning and algorithm optimization.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|ATR Length 1|
|v_input_2|3|Factor 1|
|v_input_3|14|ATR Length 2|
|v_input_4|6|Factor 2|
|v_input_int_1|100|CCI Level|
|v_input_int_2|20|length|
|v_input_5_hlc3|0|Source: hlc3|high|low|open|hl2|close|hlcc4|ohlc4|
|v_input_string_1|0|(?Smoothing)Method: SMA|EMA|SMMA (RMA)|WMA|VWMA|
|v_input_int_3|5|Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-19 00:00:00
end: 2024-02-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Supertrend & CCI Strategy Scalp", overlay=true)

// SuperTrend Settings
atrLength1 = input(14, "ATR Length 1")
factor1 = input(3.0, "Factor 1" )
atrLength2 = input(14, "ATR Length 2")
factor2 = input(6.0, "Factor 2")
 // Calculate SuperTrend 1
[superTrend1, direction1] = ta.supertrend(factor1, atrLength1)

// // Calculate SuperTrend 2
[superTrend2, direction2] = ta.supertrend(factor2, atrLength2)

// superTrend1 := barstate.isfirst ? na : superTrend1
// upTrend1 =    plot(direction1 < 0 ? superTrend1 : na, "Up Trend",   color = color.green, style = plot.style_linebr)
// downTrend1 =  plot(direction1 < 0 ? na : superTrend1, "Down Trend", color = color.red,   style = plot.style_linebr)
// bodyMiddle1 = plot(barstate.isfirst ? na : (open + close) / 2, "Body Middle",display = display.none)

// fill(bodyMiddle1, upTrend1,   color.new(color.green, 90), fillgaps = false)
// fill(bodyMiddle1, downTrend1, color.new(color.red,   90), fillgaps = false)

// superTrend2 := barstate.isfirst ? na : superTrend2
// upTrend2 =    plot(direction1 < 0 ? superTrend2 : na, "Up Trend",   color = color.green, style = plot.style_linebr)
// downTrend2 =  plot(direction1 < 0 ? na : superTrend2, "Down Trend", color = color.red,   style = plot.style_linebr)
// bodyMiddle2 = plot(barstate.isfirst ? na : (open + close) / 2, "Body Middle",display = display.none)

// fill(bodyMiddle2, upTrend2,   color.new(color.green, 90), fillgaps = false)
// fill(bodyMiddle2, downTrend2, color.new(color.red,   90), fillgaps = false)
// CCI Settings
//cciLength = input.int(14, title="CCI Length")
cciLevel = input.int(100, title="CCI Level")

// Calculate CCI
length = input.int(20, minval=1)
src = input(hlc3, title="Source")
ma = ta.sma(src, length)
cci = (src - ma) / (0.015 * ta.dev(src, length))
//plot(cci, "CCI", color=#2962FF)
//band1 = hline(100, "Upper Band", color=#787B86, linestyle=hline.style_dashed)
//hline(0, "Middle Band", color=color.new(#787B86, 50))
//band0 = hline(-100, "Lower Band", color=#787B86, linestyle=hline.style_dashed)
//fill(band1, band0, color=color.rgb(33, 150, 243, 90), title="Background")

ma(source, length, type) =>
    switch type
        "SMA" => ta.sma(source, length)
        "EMA" => ta.ema(source, length)
        "SMMA (RMA)" => ta.rma(source, length)
        "WMA" => ta.wma(source, length)
        "VWMA" => ta.vwma(source, length)

typeMA = input.string(title = "Method", defval = "SMA", options=["SMA", "EMA", "SMMA (RMA)", "WMA", "VWMA"], group="Smoothing")
smoothingLength = input.int(title = "Length", defval = 5, minval = 1, maxval = 100, group="Smoothing")

smoothingLine = ma(cci, smoothingLength, typeMA)
//plot(smoothingLine, title="Smoothing Line", color=#f37f20, display=display.none)


// Entry conditions
longCondition = superTrend1 > close and superTrend2 < close and smoothingLine < -100
shortCondition = superTrend1 < close and superTrend2 > close and smoothingLine > 100

/// Initialize variables to track trade direction
var bool isLong = na
var bool isShort = na

// Strategy entry and exit
if (longCondition)
    strategy.entry("Long", strategy.long)
    isLong := true
    isShort := false
    
if (shortCondition)
    strategy.entry("Short", strategy.short)
    isShort := true
    isLong := false

// Close Long positions
if (isLong)
    strategy.close("Long", when = superTrend1 < close or superTrend2 > close or cci > 100)

// Close Short positions
if (isShort)
    strategy.close("Short", when = superTrend1 > close or superTrend2 < close or cci < -100)



// Plotting
plot(superTrend1, color=color.blue, title="SuperTrend 1")
plot(superTrend2, color=color.red, title="SuperTrend 2")
//plot(cci, color=color.orange, title="CCI")


```

> Detail

https://www.fmz.com/strategy/442810

> Last Modified

2024-02-26 10:39:49
