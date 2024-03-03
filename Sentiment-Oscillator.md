
> Name

Sentiment-Oscillator

> Author

发明者量化



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|49|(?Parameters)Market Sentiment Lookback Length|
|v_input_2|40|Fast EMA Length|
|v_input_3|204|Slow EMA Length|
|v_input_4|20|Signal Length|
|v_input_5|false|(?Plots)Show Market Sentiment Line?|
|v_input_6|true|Show Momentum Histogram?|
|v_input_7|true|Show MACD Line?|
|v_input_8|true|Show Signal Line?|
|v_input_9|true|Plot Dots when MACD and Signal Line cross?|
|v_input_10|false|[Show Change/Volume of Each Bar?]|
|v_input_11|false|[Show Fast EMA?]|
|v_input_12|false|[Show Slow EMA?]|
|v_input_13|true|(?Long Strategy)Backtest Long Strategy?|
|v_input_14|0|Long Entry Variable 1: Histogram|Fast EMA|Slow EMA|MACD|Signal Line|Market Sentiment|
|v_input_15|0|Long Entry Condition: Crossing Over|Crossing Under|
|v_input_16|0|Long Entry Variable 2: Zero Line|Fast EMA|Slow EMA|MACD|Signal Line|Histogram|Market Sentiment|
|v_input_17|0|Long Exit Variable 1: MACD|Fast EMA|Slow EMA|Market Sentiment|Signal Line|Histogram|
|v_input_18|0|Long Exit Condition: Crossing Under|Crossing Over|
|v_input_19|0|Long Exit Variable 2: Zero Line|Fast EMA|Slow EMA|MACD|Signal Line|Histogram|Market Sentiment|
|v_input_20|false|(?Other Settings)Use Alternate Calculation Method?|
|v_input_21|false|Use Alternate Color Scheme?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2020-05-04 00:00:00
end: 2022-05-03 23:59:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Bitfinex","currency":"BTC_USD"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © dannylimardi

//@version=4
strategy("Sentiment Oscillator with Backtest", "Sentiment Oscillator", overlay=false)

//Inputs
msLen = input(49, type=input.integer, title="Market Sentiment Lookback Length", group="Parameters")
emaLen1 = input(40, type=input.integer, title="Fast EMA Length", group="Parameters")
emaLen2 = input(204, type=input.integer, title="Slow EMA Length", group="Parameters")
signalLen = input(20, type=input.integer, title="Signal Length", group="Parameters")
showMs = input(false, type=input.bool, title="Show Market Sentiment Line?", group="Plots")
showHist = input(true, type=input.bool, title="Show Momentum Histogram?", group="Plots")
showMacd = input(true, type=input.bool, title="Show MACD Line?", group="Plots")
showSignal = input(true, type=input.bool, title="Show Signal Line?", group="Plots")
showDots = input(true, type=input.bool, title="Plot Dots when MACD and Signal Line cross?", group="Plots")
showCpv = input(false, type=input.bool, title="[Show Change/Volume of Each Bar?]", group="Plots")
showEma1 = input(false, type=input.bool, title="[Show Fast EMA?]", group="Plots")
showEma2 = input(false, type=input.bool, title="[Show Slow EMA?]", group="Plots")
longStrategy = input(true, type=input.bool, title="Backtest Long Strategy?", group="Long Strategy")
entryVar1 = input(title="Long Entry Variable 1",defval="Histogram", options=["Market Sentiment", "Fast EMA", "Slow EMA", "MACD", "Signal Line", "Histogram"], group="Long Strategy")
entryCond = input(title="Long Entry Condition", defval="Crossing Over", options=["Crossing Over", "Crossing Under"], group="Long Strategy")
entryVar2 = input(title="Long Entry Variable 2", defval="Zero Line", options=["Market Sentiment", "Fast EMA", "Slow EMA", "MACD", "Signal Line", "Histogram", "Zero Line"], group="Long Strategy")
exitVar1 = input(title="Long Exit Variable 1",defval="MACD", options=["Market Sentiment", "Fast EMA", "Slow EMA", "MACD", "Signal Line", "Histogram"], group="Long Strategy")
exitCond = input(title="Long Exit Condition", defval="Crossing Under", options=["Crossing Over", "Crossing Under"], group="Long Strategy")
exitVar2 = input(title="Long Exit Variable 2", defval="Zero Line", options=["Market Sentiment", "Fast EMA", "Slow EMA", "MACD", "Signal Line", "Histogram", "Zero Line"], group="Long Strategy")
useCPV = input(false, type=input.bool, title="Use Alternate Calculation Method?", group="Other Settings", tooltip="If checked, the Market Sentiment will be the EMA of Change Per Volume of each bar, instead of the default calculation method (Price Change EMA divided by Volume EMA). The alternate method may be slightly more responsive, but will result in bigger fluctuations when there is a huge change in volume. If this method is checked, I recommend changing the Long Exit Strategy to 'Signal Line Crossing Under Zero'.")
mcTheme = input(false, type=input.bool, title="Use Alternate Color Scheme?", group="Other Settings", tooltip="If checked, the MACD, Signal, and Histogram will all be plotted as areas and histograms")

//Calculations
priceChange = close - close[1]
changePerVolume = (priceChange/volume) * 10000000  // (The 1000000 doesn't have any significance, it's just to avoid color-change errors when the values are too small.)
priceChangeEma = ema(priceChange, msLen)
volumeEma = ema(volume, msLen)
marketSentiment = useCPV ? ema(changePerVolume, msLen) : priceChangeEma/volumeEma * 1000000000
msEma1 = ema(marketSentiment, emaLen1)
msEma2 = ema(marketSentiment, emaLen2)
macd = msEma1-msEma2
signal = ema(macd, signalLen)
hist = macd-signal

//Strategy Function and String Definitions

var entryVar1_ = 0.0
var entryVar2_ = 0.0
var exitVar1_ = 0.0
var exitVar2_ = 0.0

if entryVar1 == "Market Sentiment" 
    entryVar1_ := marketSentiment
else if entryVar1 == "Fast EMA"
    entryVar1_ := msEma1
else if entryVar1 =="Slow EMA"
    entryVar1_ := msEma2
else if entryVar1 == "MACD"
    entryVar1_ := macd
else if entryVar1 == "Signal Line" 
    entryVar1_ := signal
else if entryVar1 == "Histogram" 
    entryVar1_ := hist
    
if entryVar2 == "Market Sentiment" 
    entryVar2_ := marketSentiment
else if entryVar2 == "Fast EMA"
    entryVar2_ := msEma1
else if entryVar2 =="Slow EMA"
    entryVar2_ := msEma2
else if entryVar2 == "MACD"
    entryVar2_ := macd
else if entryVar2 == "Signal Line" 
    entryVar2_ := signal
else if entryVar2 == "Histogram" 
    entryVar2_ := hist
else if entryVar2 == "Zero Line"
    entryVar2_ := 0
    
if exitVar1 == "Market Sentiment" 
    exitVar1_ := marketSentiment
else if exitVar1 == "Fast EMA"
    exitVar1_ := msEma1
else if exitVar1 =="Slow EMA"
    exitVar1_ := msEma2
else if exitVar1 == "MACD"
    exitVar1_ := macd
else if exitVar1 == "Signal Line" 
    exitVar1_ := signal
else if exitVar1 == "Histogram" 
    exitVar1_ := hist
    
if exitVar2 == "Market Sentiment" 
    exitVar2_ := marketSentiment
else if exitVar2 == "Fast EMA"
    exitVar2_ := msEma1
else if exitVar2 =="Slow EMA"
    exitVar2_ := msEma2
else if exitVar2 == "MACD"
    exitVar2_ := macd
else if exitVar2 == "Signal Line" 
    exitVar2_ := signal
else if exitVar2 == "Histogram" 
    exitVar2_ := hist
else if exitVar2 == "Zero Line"
    exitVar2_ := 0
    
entryCond_(entryVar1_, entryVar2_) =>
    if entryCond == "Crossing Over"
        crossover(entryVar1_, entryVar2_)
    else if entryCond == "Crossing Under"
        crossunder(entryVar1_, entryVar2_)

exitCond_(exitVar1_, exitVar2_) =>
    if exitCond == "Crossing Over"
        crossover(exitVar1_, exitVar2_)
    if exitCond == "Crossing Under"
        crossunder(exitVar1_, exitVar2_)

longEntry = entryCond_(entryVar1_, entryVar2_)
longExit = exitCond_(exitVar1_, exitVar2_)

up = crossover(macd, signal)
down = crossunder(macd, signal)

greenDot = up ? valuewhen(up, signal, 0) : na
redDot = down ? valuewhen(down, signal, 0) : na

//Plot colors
col_grow_above = #26A69A
col_grow_below = #FFCDD2
col_fall_above = #B2DFDB
col_fall_below = #EF5350
col_macd = #0094ff
col_signal = #ff6a00

//Drawings
plot(showMacd ? macd : na, title="MACD", color=mcTheme ? #6f62e3 : col_macd, transp=mcTheme ? 15 : 0,
 style=mcTheme ? plot.style_histogram : plot.style_line)
plot(showSignal ? signal : na, title="Signal", color=mcTheme ? (signal > 0 ? color.blue : color.orange) : col_signal, transp=mcTheme ? 85 : 0,
 style=mcTheme ? plot.style_area : plot.style_line)
plot(showHist ? hist : na, title="Histogram", style=mcTheme ? plot.style_columns : plot.style_area, 
 color=mcTheme ? (hist > 0 ? color.teal : color.red) : (hist>=0 ? (hist[1] < hist ? col_grow_above : col_fall_above) : (hist[1] < hist ? col_grow_below : col_fall_below)), 
 transp=mcTheme ? 15 : 20)
plot(showDots ? greenDot : na, color=color.lime, style=plot.style_circles, linewidth=5, transp=40)
plot(showDots ? redDot : na, color=color.red, style=plot.style_circles, linewidth=5, transp=40)
plot(0, color=color.white, transp=80)
plot(showEma1 ? msEma1 : na, color=color.aqua)
plot(showEma2 ? msEma2 : na, color=color.yellow)
plot(showMs ? marketSentiment : na, color=color.lime)
plot(showCpv ? changePerVolume : na, color=changePerVolume > changePerVolume[1] ? color.teal : color.red)

//Strategy
if longStrategy
    strategy.entry("Buy", strategy.long, when=longEntry)
    strategy.close("Buy", when=longExit)

```

> Detail

https://www.fmz.com/strategy/361332

> Last Modified

2022-05-05 20:45:11
