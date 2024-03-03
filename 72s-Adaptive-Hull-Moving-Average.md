
> Name

72s-Adaptive-Hull-Moving-Average

> Author

ChaoZhang

> Strategy Description

One challenging issue for beginner traders is to differentiate market conditions, whether or not the current market is giving best possibility to stack profits, as earliest, in shortest time possible, or not.

On intraday, we've seen some big actions by big banks are somewhat can be defined --or circling around-- by HMA 200. I've been thinking on to make the visuals more conform to price dynamics (separating major movement and minor noise) to get clearer signs of when it starts to happen. So it will be easier to see in a glance when the strength starts really taken place, with less cluttered chart.

This Adaptive HMA is using the new Pine Script's feature which now support Dynamic Length arguments for several Pine functions. ( read: https://www.tradingview.com/blog/en/pine...). It hasn't support the built-in HMA () directly, but thankfully we can use its wma () formula to construct. (Note: I tweaked a bit HMA formula already popular here by using plain int() instead of round() on its wma's length, since I find it precisely match tradingview's built-in HMA ).

You can choose which aspect the Adaptive HMA period will adapt to.

In this study I present it with two options: Volume and Volatility. It will "moves" faster or slower depends on which situation the aspect is currently into. ie: When volume is generally low or volatile readings is not there, price won't move very much, so the adapting MA will slow down by dynamically lengthen the lookback period, and vice versa, and so on.

Colour-markings in the Adaptive resembles which situation explained above. In addition, I also combine it with slope calculation of the MA to help measuring trend-strength or sideway/choppy conditions.

This way when we use it as dynamic support/resistance it will be more visually-reliable.

Secondly, and more important, it might help us traders with better probability info of whether or not a trade should even worth to be made. ie: If in the mean time market won't give much movement, any profit would also only as much. In most cases, we might better save our dime for later or place it somewhere else.

HOW TO USE:
Aside from better dynamic support/resistance and clearer breakout confirmation, MA is coloured as follow:
YELLOW:
Market is in consolidation or flat. Be it sideways, choppy, or in relatively small movements. If it shows up in a trending market, it may be an earlier sign that current trend might about to change its direction, or confirming a price broke-out to another side.
LIGHT GREEN or LIGHT RED:
Tells if a trend is forming but still relatively weak (or getting weaker), as it doesn't have volume or volatility to support.
DARKER GREEN ot DARKER RED:
This is where we can expect some good and strong price movement to ride. If it's strong enough, many times it marks a start of new long-lasting major trend.

SETTINGS:
Charger:
Choose which aspect your HMA should plug itself into, thus it will adapt to it.
Minimum Period, Maximum Period:
172 - 233 is just my own setting to outmatch the static HMA 200 for intraday. I find it --in my style of trading-- best in 15m tf in almost any pair, and 15m to 1H for some stocks. It also works nicely with conventional EMA 200, sometimes as if they somewhat work hand-in-hand in defining where the price should go. But you can, ofcourse, experiment with other ranges, broader or narrower. Especially if you already have an established strategy to follow to. As you might do with:
Consolidation area threshold:
This has to do with slope calculation. The bigger the number means your MA needs bigger degree to define the market is out of flat (yellow) area. This can be useful if needed to lighten up the filter or vice-versa.
Background colouring:
Just another colouring to help highlighting the difference in market conditions.

ALERTS:
There are two alerts:
Volume Break: when volume is breaking up above average, and
Volatility Meter: when the market more likely is about to have its moment of the big wiggling brush.

USAGE:
Very very nice BUY entry to catch big up-movement if:
1. Price is above MA. (It is best when price is also not to far distance from the MA, or you can also use distance oscillator to help out too)
2. HMA's color is in darker green. Means it's on the charging plug with your chosen aspect.
3. RSI is above 50. This is to help as additional confirmation.

Clear SELL entry signal is same as above, just the opposite.


**backtest**

 ![IMG](https://www.fmz.com/upload/asset/c26d83c2b416482e2d.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Choose which charger to adapt to:: Volatility|Volume|
|v_input_2_close|0|Source:: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|172|Minimum period:|
|v_input_4|233|Maximum period:|
|v_input_5|17|Consolidation area is when slope below:|
|v_input_6|true|(?Minor Adaptive HMA+ Period)Show minor xHMA+|
|v_input_7|89|Minimum:|
|v_input_8|121|Maximum:|
|v_input_9|false|(?DISTANCE ZONE)Show Adaptive HMA+ Distance Zone|
|v_input_10|2.7|Distance (Envelope) Multiplier|
|v_input_11|true|(?OTHER)Show Possible Signals|
|v_input_12|true|Background color to differentiate movement|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-25 00:00:00
end: 2022-05-24 23:59:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// 2020 © io72signals / Antorio Bergasdito

//@version=4
study("72s: Adaptive Hull Moving Average+", shorttitle="72s: Adaptive HMA+", overlay=true)

//Optional Inputs
charger     = input("Volatility", title="Choose which charger to adapt to:", options=["Volatility", "Volume"])
src         = input(close, title="Source:")
minLength   = input(172, title="Minimum period:")
maxLength   = input(233, title="Maximum period:")
adaptPct    = 0.03141 //input(3.141, minval = 0, maxval = 100, title="Adapting Percentage:") / 100.0

flat        = input(17, title="Consolidation area is when slope below:")

showMinor   = input(true, title="Show minor xHMA+", group="Minor Adaptive HMA+ Period")
minorMin    = input(89, title="Minimum:", group="Minor Adaptive HMA+ Period", inline="mHMA+")
minorMax    = input(121, title="Maximum:", group="Minor Adaptive HMA+ Period", inline="mHMA+")

showZone    = input(false, title="Show Adaptive HMA+ Distance Zone", group="DISTANCE ZONE")
mult        = input(2.7, title="Distance (Envelope) Multiplier", step=.1, group="DISTANCE ZONE") 

showSignals = input(true, title="Show Possible Signals", group="OTHER")
useBg       = input(true, title="Background color to differentiate movement", group="OTHER")

//Source to adapt to
highVolatility = atr(14) > atr(46)                  //Volatility Meter. Change it to match to your strat/pair/tf if needs.

rsivol  = rsi(volume,14)                            //RSI Volume Osc:
osc     = hma(rsivol,10)                            //Basically it's almost the same as: vol > ma(volume,20)
volBreak = osc > 49                                 //but smoothed using weight to filter noise or catch earlier signs.    

//Dynamics 
var float dynamicLength = avg(minLength,maxLength)
var float minorLength   = avg(minorMin,minorMax)
plugged = charger=="Volume"? volBreak : highVolatility
dynamicLength   := iff(plugged, max(minLength, dynamicLength * (1 - adaptPct)), min(maxLength, dynamicLength * (1 + adaptPct)))
minorLength     := iff(plugged, max(minorMin, minorLength * (1 - adaptPct)), min(minorMax, minorLength * (1 + adaptPct)))

//Slope calculation to determine whether market is in trend, or in consolidation or choppy, or might about to change current trend
slope_period = 34, range = 25, pi = atan(1) * 4
highestHigh = highest(slope_period), lowestLow = lowest(slope_period)
slope_range = range / (highestHigh - lowestLow) * lowestLow
calcslope(_ma)=>
    dt = (_ma[2] - _ma) / src * slope_range  
    c = sqrt(1 + dt * dt)
    xAngle = round(180 * acos(1 / c) / pi)
    maAngle = iff(dt > 0, -xAngle, xAngle)
    maAngle

//MA coloring to mark market dynamics 
dynColor(_ma,_col1a,_col1b, _col2a, _col2b, _col0) =>
    slope = calcslope(_ma)
    slope >= flat ? plugged? _col1a : _col1b :
     slope < flat and slope > -flat ? _col0 : 
     slope <= -flat ? plugged? _col2a : _col2b : _col0

//Adaptive HMA 
xhma(_src,_length) => _return = wma(2 * wma(_src, _length / 2) - wma(_src, _length), floor(sqrt(_length))) 

dynamicHMA  = xhma(src,int(dynamicLength))      //<--Batman - Our main xHMA+
minorHMA    = xhma(src,int(minorLength))        //<--Robin  - Faster minor xHMA+ (Optional). Can be use to assist for 
                                                //            faster entry, slower exit point, or pullbacks info too.

//Plot
plot(dynamicHMA, "Dynamic HMA+", dynColor(dynamicHMA, #6fbf73, #c0f5ae, #eb4d5c, #f2b1d4, color.yellow), 3)
plot(showMinor? minorHMA:na, "minor HMA+", dynColor(minorHMA, #6fbf73, #c0f5ae, #eb4d5c, #f2b1d4, color.yellow), 1)

//Backgroud coloring
notgreat = calcslope(dynamicHMA) < flat and calcslope(dynamicHMA) > -flat
bgcolor(useBg? plugged? na : notgreat? #757779: #afb4b9 : na)

// Comparative study
// staticHMA = hma(close, 200)
// plot(staticHMA,  "Static HMA")
// plotchar(dynamicLength, "dynamicLengthgth", "", location.top) //check output the calculated Dynamic Length in the Data Window.

//{ DISTANCE ZONE
// Envelope the main DynamicHMA with ATR band, just one way to approximate current price distance to MA. Other usages/methods may vary.
upperTL = dynamicHMA + mult * atr(40)        ,  lowerTL = dynamicHMA - mult * atr(40)           //<--Half distance zone
topTL = dynamicHMA + (mult*2) * atr(40)      ,  botTL = dynamicHMA - (mult*2) * atr(40)         //<--One distance zone
stopupperTL = dynamicHMA + (mult/2) * atr(40),  stoplowerTL = dynamicHMA - (mult/2) * atr(40)   //<--Half of the half. If need ie. tighter SL or trailing

// Plotting Distance Zone
plot(showZone?upperTL:na, color=color.green, transp=72)
plot(showZone?lowerTL:na, color=color.red,   transp=72)
plot(showZone?topTL:na, color=color.gray, transp=72)
plot(showZone?botTL:na, color=color.gray, transp=72)
sutl = plot(showZone?stopupperTL:na, color=color.white, transp=100)
sltl = plot(showZone?stoplowerTL:na, color=color.white, transp=100)
colZone = showZone? color.purple:color.new(color.white,100)
fill(sutl, sltl, color=colZone, transp=90)
//}

//{ SIGNALS
_slope = calcslope(dynamicHMA)

// Entry Base; When HMA+ turn to a darker color and market is out from low volatility. 
// Remember to also considering price distance to MA and strength (ie. RSI)
_upSig = _slope >=  flat and plugged
_dnSig = _slope <= -flat and plugged
buy  = _upSig and not _upSig[1] 
sell = _dnSig and not _dnSig[1] 

// Possible Exits. These only based on faster xHMA+
_upExit = _slope>=flat  and (not plugged) and close<minorHMA 
_dnExit = _slope<=-flat and (not plugged) and close>minorHMA 
fastExits  = (_upExit and not _upExit[1]) or (_dnExit and not _dnExit[1])

// Caution Sign. When Price crossed most outer distance zone. Could also be a good TP spot if your already in profit
_topWarn    = high>topTL
_botWarn    = low<botTL
warningSigns = (_topWarn and not _topWarn[1]) or (_botWarn and not _botWarn[1])

// Plot 'em up
atrPos = 0.72 * atr(5)
plotchar(showSignals and buy?  dynamicHMA-atrPos: na, color=color.green, location=location.absolute, char="⬆", size = size.tiny)
plotchar(showSignals and sell? dynamicHMA+atrPos: na, color=color.red,   location=location.absolute, char="⬇", size = size.tiny)
plotchar(showSignals and fastExits? _upExit? minorHMA+atrPos: _dnExit? minorHMA-atrPos: na: na, 
     color=_upExit?color.green:_dnExit?color.red: na, location=location.absolute, char="ⓧ", size=size.tiny)
plotchar(showSignals and warningSigns? _topWarn? high+atrPos: _botWarn? low-atrPos: na: na, 
     color=color.orange, location=location.absolute, char="⚠", size=size.tiny)
//} 

//{ ALERTS
// Previous alerts:
// alertcondition(highVolatility and not notgreat, "72s: Volatility Meter", "Market is on the move")
// alertcondition(volBreak[1] and volBreak and not notgreat, "72s: Volume Break", "Volume has just break above average")

// New Alert: 
// Delete what alert you don't need:
if buy 
    alert("Possible Buy Signal at" + tostring(close), alert.freq_once_per_bar_close)
if sell
    alert("Possible Sell Signal at" + tostring(close), alert.freq_once_per_bar_close)
    
if fastExits and _upExit
    alert("Price has just crossed down minor xHMA+ at" + tostring(close), alert.freq_once_per_bar_close)
if fastExits and _dnExit
    alert("Price has just crossed up minor xHMA+ at" + tostring(close), alert.freq_once_per_bar_close)
    
if warningSigns and _topWarn
    alert("Price has just crossed above top xHMA+ zone", alert.freq_once_per_bar_close)
if warningSigns and _botWarn
    alert("Price has just crossed below bottom xHMA+ zone", alert.freq_once_per_bar_close)
//}
    




if buy
    strategy.entry("Enter Long", strategy.long)
else if sell
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/365902

> Last Modified

2022-05-26 17:17:37
