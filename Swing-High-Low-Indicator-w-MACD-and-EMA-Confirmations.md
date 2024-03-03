
> Name

Swing-High-Low-Indicator-w-MACD-and-EMA-Confirmations

> Author

ChaoZhang

> Strategy Description

Swing High/Low Indicator w/ MACD and EMA Confirmations by KaizenTraderB

I designed this indicator to be used with a market structure break strategy.
It labels swing highs and lows that are confirmed by the MACD .
It also displays a higher timeframe Fast and Slow EMA to determine directional bias.
Also provides alerts that signal Swing Low breaks in downtrends and Swing High Breaks in uptrends.
It draws a horizontal line on the last Swing High and Low.

Display this indicator on your entry timeframe and choose your Higher Timeframe in settings.
You can also change lookback period for Swing Highs and Lows and EMA's.

When I use this I am looking for the Swing High/Low break in direction of HTF Trend
Then look for pullback between price level of break and areas of liquidity (wicks, order blocks, price congestion) for entry in direction of EMA trend.

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/218f429f1e8d47fc2fc.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Bars back to check for a swing|
|v_input_2|true|Show Signal Markers|
|v_input_3|240|EMA Timeframe|
|v_input_4|20|Fast EMA Length|
|v_input_5|50|Slow EMA Length|
|v_input_6|true|Show EMA's|
|v_input_7|true|Show Swing Break Entry Levels|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-05-03 00:00:00
end: 2022-05-09 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// Swing High/Low Indicator w/ MACD and EMA Confirmations by KaizenTraderB
//
//I designed this indicator to be used with a market structure break strategy.
//It labels swing highs and lows that are confirmed by the MACD.  
//It also displays a higher timeframe Fast and Slow EMA to determine directional bias.
//Also provides alerts that signal Swing Low breaks in downtrends and Swing High Breaks in uptrends.
//It draws a horizontal line on the last Swing High and Low.
//
//Display this indicator on your entry timeframe and choose your Higher Timeframe in settings.
//You can also change lookback period for Swing Highs and Lows and EMA's.
//
//@version=4
study("Swing High/Low Indicator w/ MACD and HTF EMA's", overlay=true)

barsback = input(5, title='Bars back to check for a swing')
showsig = input(true, title='Show Signal Markers')
res = input(title="EMA Timeframe", defval="240")
flen = input(title="Fast EMA Length", type=input.integer, defval=20)
slen = input(title="Slow EMA Length", type=input.integer, defval=50)
showema = input(title="Show EMA's", type=input.bool, defval=true)
showentry = input(title="Show Swing Break Entry Levels", type=input.bool, defval=true)

//HTF EMA's

fema = ema(close, flen)
sema = ema(close, slen)

rp_security(_symbol, _res, _src, _gaps, _lookahead) => security(_symbol, _res, _src[barstate.isrealtime ? 1 : 0], _gaps, _lookahead)

femaSmooth = rp_security(syminfo.tickerid, res, fema, barmerge.gaps_on, barmerge.lookahead_off)
semaSmooth = rp_security(syminfo.tickerid, res, sema, barmerge.gaps_on, barmerge.lookahead_off)
plot(showema ? femaSmooth : na,"Fast HTF EMA", color.lime, 3)
plot(showema ? semaSmooth : na,"Slow HTF EMA", color.navy, 3)

downtrend = femaSmooth < semaSmooth
uptrend = femaSmooth > semaSmooth

//Swing Highs and Lows
////////////////////////////////////////////////////////////////////////////////
//Thank you Backtest-Rookies.com for the Swing Detection Indicator code

swing_detection(index)=>
    swing_high = false
    swing_low = false
    start = (index*2) - 1 // -1 so we have an even number of
    swing_point_high = high[index]
    swing_point_low = low[index]
    
    //Swing Highs
    for i = 0 to start
        swing_high := true
        if i < index 
            if high[i] > swing_point_high 
                swing_high := false
                break
        // Have to do checks before pivot and after seperately because we can get
        // two highs of the same value in a row. Notice the > and >= difference
        if i > index
            if high[i] >= swing_point_high 
                swing_high := false
                break
        
    //Swing lows
    for i = 0 to start
        swing_low := true
        if i < index
            if low[i] < swing_point_low 
                swing_low := false
                break  
        // Have to do checks before pivot and after seperately because we can get
        // two lows of the same value in a row. Notice the > and >= difference
        if i > index
            if low[i] <= swing_point_low 
                swing_low := false
                break 
        
    [swing_high, swing_low]

// Check for a swing
[swing_high, swing_low] = swing_detection(barsback)
////////////////////////////////////////////////////////////////////////////////

float swing_high_price = na
float swing_low_price = na
 
if swing_high
    swing_high_price := high[barsback] 
if swing_low
    swing_low_price := low[barsback] 

[macdline, signalline, histline] = macd(close,12,26,9)

macpos = histline[barsback] > 0
macneg = histline[barsback] < 0

// Plotting

SHPrice = "SH\n" + str.tostring(swing_high_price)
SLPrice = "SL\n" + str.tostring(swing_low_price)

if swing_high and macpos and showsig
    //SHLabel = label.new(bar_index[barsback], swing_high_price, SHPrice, xloc.bar_index, yloc.abovebar, color.red, label.style_arrowdown, textcolor=color.red, size=size.normal)
    //SHLine = line.new(bar_index[barsback], swing_high_price, bar_index[barsback] + 20, swing_high_price, xloc.bar_index, extend.none, color.black, width=2)
    //line.delete(SHLine[1])

if swing_low and macneg and showsig
    //label.new(bar_index[barsback], swing_low_price, SLPrice, xloc.bar_index, yloc.belowbar, color.green, label.style_arrowup, textcolor=color.green)
    //SLLine = line.new(bar_index[barsback], swing_low_price, bar_index[barsback] + 20, swing_low_price, xloc.bar_index, extend.none, color.black, width=2)
    //line.delete(SLLine[2])
    
//alerts
alertcondition(uptrend and close > swing_high_price, "Swing High Break in Uptrend", "Swing High Break!")
alertcondition(downtrend and close < swing_low_price, "Swing Low Break in Downtrend", "Swing Low Break!")

if uptrend
    strategy.entry("Enter Long", strategy.long)
else if downtrend
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/362443

> Last Modified

2022-05-11 16:33:11
