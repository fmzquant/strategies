
> Name

ML-Alerts-Template

> Author

ChaoZhang

> Strategy Description

I created this indicator/study script because i ran into the issue that the same Alerts would fire multiple times. For example it would trigger a Long signal when already being in a Long. I guess there would be no issue with a very basic strategy but with a larger script and many variables, it seemed to create complications.

This is resolved by a TradingLine oscillator and only when it switches to a new and different position from previous, will it trigger an Alert.

If you are in a Long and it signals Long again, then this is seen as a "Continuation Long" in the Alerts settings. You can use this condition to add to your existing position (Optional). Continuation signals are plotted as bright green/red dots.

You will notice there's an option to uncheck "Trade Shorts" and "Trade Exits" signals.
Lets say you choose not to trade Short and Exits, then your Long would only Exit once a Short signal is detected.
This could prove useful for Back-testing purposes.

This quick example script uses the EMA 10, EMA 200, emaPlus1Atr and emaMinus1Atr.


To use in your script, you will need to modify and add your own BUY/SELL/EXIT signals in the box where it says:

//// INPUT YOUR BUY/SELL/EXIT SIGNALS HERE: ////

//////////////////////////////////////////////////

Hope someone will find this useful, or even just as an additional visual confirmation for your own trading strategy and script.

**Back-testing**

 ![IMG](https://www.fmz.com/upload/asset/f590b731354bd2b03d.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|- *Trade Shorts* - |
|v_input_2|true|- *Trade Exits* -|
|v_input_3|10|EMA 1|
|v_input_4|200|EMA 2|
|v_input_5|12|ATR Length|
|v_input_6|12|Hist Fast Length|
|v_input_7|26|Hist Slow Length|
|v_input_8|9|Hist Signal Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-16 00:00:00
end: 2022-05-15 23:59:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © zombie76

//@version=5
indicator("ML Alerts Template [indicator]", shorttitle = "ML Alerts Template [indicator]", overlay=false)






/////////////////////////////////////////////////////////////////////////
tradeshorts = input(title='- *Trade Shorts* - ', defval=true)
tradeexitsignals = input(title='- *Trade Exits* -', defval=true)
/////////////////////////////////////////////////////////////////////////

src = (close)
source = (close)

///////////////////// EMA's ////////////////////////
p10=input(title="EMA 1",defval=10)
p200=input(title="EMA 2",defval=200)

ema10=ta.ema(close,p10)
ema200=ta.ema(close,p200)
////////////////////////////////////////////////////






//************* ATR ***************//
lengthatr = input(12, title="ATR Length") 

atr = ta.rma(ta.tr(true), lengthatr)
ema = ta.ema(close, lengthatr)

emaPlus1Atr = ema + atr
emaMinus1Atr = ema - atr

//************ END ATR ***********//






////////////////////////////// HIST ///////////////////////////////////

fastLengthHist = input(title='Hist Fast Length',defval=12)
slowLengthHist=input(title='Hist Slow Length',defval=26)
signalLength=input(title='Hist Signal Length',defval=9)

fastMA = ta.ema(source, fastLengthHist)
slowMA = ta.ema(source, slowLengthHist)

macd = fastMA - slowMA
signal = ta.sma(macd, signalLength)
hist = macd - signal

///////////////////////////////////////////////////////////////////












//////////////////////////////////////////////////
//// INPUT YOUR  BUY/SELL/EXIT  SIGNALS HERE: ////
//////////////////////////////////////////////////

tradeups = ema10 > ema10[1] and low > emaMinus1Atr and hist > hist[1] // LONG
tradeexits = tradeexitsignals and (ema10 < ema10[1]) and not tradeups // Exit Long
tradedowns = ((ema10 < ema10[1] and hist < hist[1]) or (high > emaPlus1Atr and close < emaPlus1Atr and close < open and hist < hist[1])) and not tradeups // SHORT
exitshort = low < emaMinus1Atr and close > open and ema10 > ema10[1] and hist > hist[1] // Exit Short

//////////////////////////////////////////////////
//////////////////////////////////////////////////

















///////////////////////////////// Buy Sell Line ///////////////////////////////////////////
////////////////////////// DO NOT EDIT ANYTHING BELOW /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Filters out signals if opposite signal is also on:
heikDownColor() => tradedowns
heikUpColor() => tradeups
heikExitColor() => tradeexitsignals and tradeexits

previnashort = 0
previnalong = 0
previnaexit = 0

// Heiki Down Filter //    
//short//
inashort_filt = heikDownColor() and tradeshorts and not heikUpColor()
previnashort := inashort_filt ? 1 : heikUpColor() ? -1 : previnashort[1]
inashort2 = previnashort[1] == 1

// Heiki Up Filter //
//long// 
inalong_filt = heikUpColor() and not (heikDownColor() or tradeexits)
previnalong := inalong_filt ? 1 : heikDownColor() ? -1 : previnalong[1]
inalong2 = previnalong[1] == 1

// Heiki Exit Filter //
//exit//
inaexit_filt = heikExitColor() and not heikDownColor() and not (heikUpColor() or tradeups)
previnaexit := inaexit_filt ? 1 : heikDownColor() or heikUpColor() ? -1 : previnaexit[1]
inaexit2 = previnaexit[1] == 1

// Heiki Exit Filter 2 //
//exit short//
previnasexits = 0
inasexits_filt = exitshort and (inashort2 or tradedowns) and not tradeups //and not tradedowns[1]
previnasexits := inasexits_filt ? 1 : heikDownColor() or heikUpColor() ? -1 : previnasexits[1]
inasexit2 = previnasexits[1] == 1 //and not exitshort[1]

/////////////////////////////////////////////////////// 

 
heikDownColor_filt = (heikDownColor() and not heikUpColor()) or (heikDownColor() and not heikExitColor())
heikUpColor_filt = tradeups or ((heikUpColor() or inalong2) and not (tradeexits or tradedowns or (inaexit2 and not tradeups)))
heikExitColor_filt = heikExitColor() and not (heikDownColor_filt or tradeups)
heikNeuColor_filt = (heikUpColor() or heikDownColor() or tradeups)

prev5 = 0
prev5 := (heikUpColor_filt and (not (tradedowns or tradeexits))) or tradeups ? 1000 : (tradeshorts and tradedowns) or not (inashort2 and (exitshort or inasexit2)) and (tradeshorts and (inashort2 or heikDownColor_filt)) ? -1000 : not (tradeups or heikUpColor_filt) and (((not tradeshorts and (heikExitColor_filt)) or (inashort2 and exitshort) or (tradeshorts and tradeexits and heikUpColor_filt and not (heikDownColor_filt)) or (tradeshorts and tradeexits and not heikDownColor_filt and not heikUpColor_filt))) ? 0 : prev5[0]

plot(prev5, color=color.new(color.aqua, 10), style=plot.style_stepline, title='Trade Line')

shortdata2 = prev5[0] == -1000 and (heikDownColor_filt or inashort2) //and heikNeuColor_filt
longdata2 = prev5[0] == 1000 and (heikUpColor_filt or not (heikExitColor_filt or heikDownColor_filt))
exitdata2 = prev5[0] == 0 and not (heikNeuColor_filt or heikDownColor_filt)
////////////////////// END Buy Sell Line ///////////////////////////////////





/////////////////////////////////// Plot Dots //////////////////////////////
plotshape(longdata2 and not tradeexits, style=shape.diamond, location=location.bottom, color=color.new(color.lime, 50)) //LONG
plotshape(shortdata2 and tradeshorts, style=shape.diamond, location=location.bottom, color=color.new(color.red, 50)) // SHORT
plotshape(exitdata2 and not (tradeups or heikUpColor_filt), style=shape.diamond, location=location.bottom, color=color.new(color.purple, 50)) // EXIT

plotshape(tradeups and not tradeups[1], style=shape.diamond, location=location.bottom, color=color.new(color.lime, 0)) //LONG
plotshape(tradedowns and tradeshorts and not tradedowns[1], style=shape.diamond, location=location.bottom, color=color.new(color.red, 0)) // SHORT
plotshape(prev5[0] == 0 and (prev5[1] > 0 or prev5[1] < 0) and not (tradeups or heikUpColor_filt), style=shape.diamond, location=location.bottom, color=color.new(color.white, 70))
////////////////////////////////////////////////////////////////////////////

/////////////////////////////////

GoLong = prev5[0] > 0 and prev5[1] < 900
GoShort = prev5[0] < 0 and prev5[1] > -900
GoExit = prev5[0] == 0 and (prev5[1] > 0 or prev5[1] < 0)

///////////// Alerts ////////////////

alertcondition(condition=GoLong,
     title="1_Warp LONG",
     message="LONG *")
     
     
alertcondition(condition=GoShort and tradeshorts,
     title="2_Warp SHORT",
     message="SHORT *")

   
alertcondition(condition=GoExit,
     title="3_EXIT Warp",
     message="EXIT *")   




////// Alerts Add to Position ////// 
alertcondition(condition=tradeups and not exitdata2[1] and not tradeups[1],
     title="4_Warp Add to LONG",
     message="LONG *increase")
     
     
alertcondition(condition=tradedowns and tradeshorts and not exitdata2[1] and not tradedowns[1],
     title="5_Warp Add to SHORT",
     message="SHORT *increase")
     
//////////////// END ALL /////////////////////








if GoLong
    strategy.entry("Enter Long", strategy.long)
else if GoShort
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/363756

> Last Modified

2022-05-17 10:53:38
