
> Name

Bollinger-Awesome-Alert-R1

> Author

ChaoZhang

> Strategy Description

This indicator is an implementation of the Bollinger Band and Awesome Oscillator Scalping system.

This technique is for those who want the most simple method that is very effective. It is BEST traded during the busiest trading hours, 3am to 12am EST NY time. This method doesn't work in sideways markets, only in volatile trending markets.

Time Frames: 1, 5, 10, 15 ,30 min.
Currency pairs: majors.

Other Chart indicators:
Add Awesome Oscillator .
Optionally Add Squeeze Indicator.

Here's the strategy:

Going LONG:
Enter a long position when the black 3 EMA has crossed up through the Bollinger red middle band MA. At the same time, the Awesome should be approaching or crossing it's zeroline, going up. This is indicated by "Buy" alert.

Going SHORT:
Enter a short position when the black 3 EMA has crossed down through the Bollinger red middle band MA. At the same time, the Awesome should be approaching or crossing it's zero line, going down. This is indicated by the "Sell" Alert.

Take profit:
10-20 pips depending on pair or When Awesome Oscillator turns a different colour.

HINTS: Best trades tend to occur when price reversing bounce off outer band and outside the Optional Bollinger Squeeze indication.

**backtest**
 ![IMG](https://www.fmz.com/upload/asset/fe8423451e99aad452.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Use EMA for Bollinger Band|
|v_input_2|false|Filter Buy/Sell with Bollinger Bands|
|v_input_3|false|Flter Buy/Sell with BB squeeze|
|v_input_4|20|Bollinger Length|
|v_input_5_close|0|Bollinger Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|2|Base Multiplier|
|v_input_7|3|Fast EMA length|
|v_input_8|34|Awesome Length Slow|
|v_input_9|5|Awesome Length Fast|
|v_input_10|100|BB Relative Squeeze Length|
|v_input_11|50|BB Squeeze Threshold %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-23 00:00:00
end: 2022-05-22 23:59:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

study(shorttitle="BBAWE", title="Bollinger Awesome Alert R1.1 by JustUncleL", overlay=true)

// Author: Lawrie Steven
// Date:   22-Apr-2017
// Revision: R1
//
// Description:
// ============
// This indicator is an implementation of the Bollinger Band and Awesome Oscillator
// scalping system.
// This technique is for those who want the most simple method that is
// very effective. It is BEST traded during the busiest trading hours,
// 3am to 12am EST NY time. This method doesn't work in sideways markets, only in
// volatile trending markets.
//
// Time Frames: 1, 5, 10, 15 ,30 min.
// Currency pairs: majors.
//
// Other Chart indicators:
// - Add Awesome Oscillator.
// - Optionally Add Squeeze Indicator.
//
// Here's the strategy:
// --------------------
// Going LONG:
// Enter a long position when the black 3 EMA has crossed up through the Bollinger red 
// middle band MA. At the same time, the Awesome should be approaching or crossing 
// it's zeroline, going up. Optionally Close price also must stay below the upper BB.
// This is indicated by "Buy" alert.
//
// Going SHORT:
// Enter a short position when the black 3 EMA has crossed down through the Bollinger red
// middle band MA. At the same time, the Awesome should be approaching or crossing it's 
// zero line, going down. Optionally Close price also must stay above the lower BB.
// This is indicated by the "Sell" Alert.
// 
// Take profit:
// 10-20 pips depending on pair or When Awesome Oscillator turns a different color.
//
// HINTS: Best trades tend to occur when price reversing bounce off outer band and 
// and outside Optional Bollinger Squeeze indication.
//
// References:
// -----------
// - https://www.forexstrategiesresources.com/scalping-forex-strategies-iii/337-bollinger-bands-and-chaos-awesome-scalping-system
// - "Squeeze Momentum Indicator [LazyBear]"
//
// Modifications
// -------------
// 6-Sept-2019 :
//      - Added optional extra condition that the signal candle close price must stay within the Bollinger Bands.
//        This helps remove some of the oversized signal candles, these candles have a lower success probabilty.
//      - Added Alarm system Alerts for BUY and SELL.
// 28-Sept-2019 :
//      - Added optional BB squeeze filter. The squeeze Algo is based on the current relative width of the BB, 
//        it is NOT based on the LazyBear Algo.
// 08-Aug-2020
//      - Converted to Pinescript V4
// 11-Aug-2020
//      - Modified "alertcondition" calls to include the close placeholder, this forces the compiler to
//        to recognise the as a placeholder alert and other placeholders can be accessed in the alarm
//        message.
//

// === INPUTS ===

// Bollinger Bands Inputs
bb_use_ema = input(false, title="Use EMA for Bollinger Band")
bb_filter = input(false, title="Filter Buy/Sell with Bollinger Bands")
sqz_filter = input(false, title="Flter Buy/Sell with BB squeeze")
bb_length = input(20, minval=1, title="Bollinger Length")
bb_source = input(close, title="Bollinger Source")
bb_mult = input(2.0, title="Base Multiplier", minval=0.5, maxval=10)
// EMA inputs
fast_ma_len = input(3, title="Fast EMA length", minval=2)
// Awesome Inputs
nLengthSlow = input(34, minval=1, title="Awesome Length Slow")
nLengthFast = input(5, minval=1, title="Awesome Length Fast")

// === /INPUTS ===

sqz_length = input(100, "BB Relative Squeeze Length", minval=5)
sqz_threshold = input(50, "BB Squeeze Threshold %", maxval=99, step=5)



// === SERIES ===

// Breakout Indicator Inputs
ema_1 = ema(bb_source, bb_length)
sma_1 = sma(bb_source, bb_length)
bb_basis = bb_use_ema ? ema_1 : sma_1
fast_ma = ema(bb_source, fast_ma_len)

// Deviation
// * I'm sure there's a way I could write some of this cleaner, but meh.
dev = stdev(bb_source, bb_length)
bb_dev = bb_mult * dev

// Upper bands
bb_upper = bb_basis + bb_dev
// Lower Bands
bb_lower = bb_basis - bb_dev

// Calculate Awesome Oscillator
xSMA1_hl2 = sma(hl2, nLengthFast)
xSMA2_hl2 = sma(hl2, nLengthSlow)
xSMA1_SMA2 = xSMA1_hl2 - xSMA2_hl2
// Calculate direction of AO
AO = xSMA1_SMA2 >= 0 ? xSMA1_SMA2 > xSMA1_SMA2[1] ? 1 : 2 : 
   xSMA1_SMA2 > xSMA1_SMA2[1] ? -1 : -2

// Calculate BB spread and average spread
spread = bb_upper - bb_lower
avgspread = sma(spread, sqz_length)

// Calculate BB relative %width for Squeeze indication
bb_squeeze = spread / avgspread * 100

// Calculate Upper and Lower band painting offsets based on 50% of atr.
bb_offset = atr(14) * 0.5
bb_sqz_upper = bb_upper + bb_offset
bb_sqz_lower = bb_lower - bb_offset

// === /SERIES ===

// === PLOTTING ===

// plot BB basis
plot(bb_basis, title="Basis Line", color=color.red, transp=10, linewidth=2)
// plot BB upper and lower bands
ubi = plot(bb_upper, title="Upper Band Inner", color=color.blue, transp=10, linewidth=1)
lbi = plot(bb_lower, title="Lower Band Inner", color=color.blue, transp=10, linewidth=1)
// center BB channel fill
fill(ubi, lbi, title="Center Channel Fill", color=color.silver, transp=90)

//Indicate BB squeeze based on threshold.
usqzi = plot(bb_sqz_upper, "Hide Sqz Upper", transp=100)
lsqzi = plot(bb_sqz_lower, "Hide Sqz Lower", transp=100)
fill(ubi, usqzi, color=bb_squeeze > sqz_threshold ? color.white : color.blue, transp=50)
fill(lbi, lsqzi, color=bb_squeeze > sqz_threshold ? color.white : color.blue, transp=50)

// plot fast ma
plot(fast_ma, title="Fast EMA", color=color.black, transp=10, linewidth=2)

// Calc breakouts
break_down = crossunder(fast_ma, bb_basis) and close < bb_basis and abs(AO) == 2 and 
   (not bb_filter or close > bb_lower) and 
   (not sqz_filter or bb_squeeze > sqz_threshold)
break_up = crossover(fast_ma, bb_basis) and close > bb_basis and abs(AO) == 1 and 
   (not bb_filter or close < bb_upper) and 
   (not sqz_filter or bb_squeeze > sqz_threshold)

// Show Break Alerts
plotshape(break_down, title="Breakout Down", style=shape.arrowdown, location=location.abovebar, size=size.auto, text="Sell", color=color.red, transp=0)
plotshape(break_up, title="Breakout Up", style=shape.arrowup, location=location.belowbar, size=size.auto, text="Buy", color=color.green, transp=0)

// === /PLOTTING ===

// Send alert to TV alarm sub-system
alertcondition(break_down or break_up, title="BBAWE Alert", message="BBAWE Alert close={{close}}")
alertcondition(break_down, title="BBAWE Sell", message="SELL close={{close}}")
alertcondition(break_up, title="BBAWE Buy", message="BUY close={{close}}")


// eof



if break_up
    strategy.entry("Enter Long", strategy.long)
else if break_down
    strategy.entry("Enter Short", strategy.short)
    
    
```

> Detail

https://www.fmz.com/strategy/365419

> Last Modified

2022-05-24 18:31:33
