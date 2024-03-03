
> Name

Fukuiz-Trend

> Author

ChaoZhang

> Strategy Description

This indicator base on RSI of 2 different periond.

#A brief introduction to RSI #
The relative strength index ( RSI ) is a momentum indicator used in technical analysis that measures the magnitude of recent price changes to evaluate overbought or oversold conditions in the price of a stock or other asset. The RSI is displayed as an oscillator (a line graph that moves between two extremes) and can have a reading from 0 to 100. The indicator was originally developed by J. Welles Wilder Jr. and introduced in his seminal 1978 book, “New Concepts in Technical Trading Systems.”

Traditional interpretation and usage of the RSI are that values of 70 or above indicate that a security is becoming overbought or overvalued and may be primed for a trend reversal or corrective pullback in price. An RSI reading of 30 or below indicates an oversold or undervalued condition.

#In this indicator#
I see that you can use 2 RSI with different periond to suggest Bullish trend and Bearish trend .

#Conditions between short and long RSI crossing#
Crossover = Bullish trend (blue zone)
Crossunder = Bearish trend (red zone)

**backtesting**

 ![IMG](https://www.fmz.com/upload/asset/11cc3389245551b4231.png) 



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|24|RSI Short|
|v_input_int_2|100|RSI Long|
|v_input_1_open|0|Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|5|Pivot Lookback Right|
|v_input_3|5|Pivot Lookback Left|
|v_input_4|60|Max of Lookback Range|
|v_input_5|5|Min of Lookback Range|
|v_input_6|true|rsi>rsi2 Divergence|
|v_input_7|true|rsi<rsi2 Divergence|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-17 00:00:00
end: 2022-05-16 23:59:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//Fukuiz
indicator(title='Fukuiz Trend', shorttitle='Fukuiz Trend', format=format.price, precision=2, timeframe='')

//color//
colorwhite = #FFFFFF
colorblue = #6633FF
colorred = #FF3333
colorblue2 = #33CCFF
colorpink = #FF3366

//Fuction//
len = input.int(24, minval=1, title='RSI Short')
len2 = input.int(100, minval=1, title='RSI Long')
src = input(open, 'Source')
up = ta.rma(math.max(ta.change(src), 0), len)
down = ta.rma(-math.min(ta.change(src), 0), len)
up2 = ta.rma(math.max(ta.change(src), 0), len2)
down2 = ta.rma(-math.min(ta.change(src), 0), len2)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - 100 / (1 + up / down)
rsi2 = down2 == 0 ? 100 : up2 == 0 ? 0 : 100 - 100 / (1 + up2 / down2)

Bullish = rsi > rsi2
Bearish = rsi < rsi2
Fukuizcolor = Bullish ? color.new(colorblue,0) : Bearish ? color.new(colorred,0) : na
Fukuizcolor2 = Bullish ? color.new(colorblue2,0) : Bearish ? color.new(colorpink,0) : na
Fukuizcolor3 = Bullish ? color.new(colorblue,75) : Bearish ? color.new(colorred,75) : na

//Plot//
l1 = plot(rsi, 'RSI Short', color=Fukuizcolor, linewidth=2, style=plot.style_line)
l2 = plot(rsi2, 'RSI Long', color=Fukuizcolor2, linewidth=2, style=plot.style_line)
band2 = hline(50, 'Middle Band', color=#FFCC99)
band1 = hline(70, 'Upper Band', color=#FFCC99)
band0 = hline(30, 'Lower Band', color=#FFCC99)
fill(band1, band0, color.new(#0946CA, 90), title='Background')
fill(l1, l2, color=Fukuizcolor3, title='Trend Background')


//DIVERGENCE//
lbR = input(title='Pivot Lookback Right', defval=5)
lbL = input(title='Pivot Lookback Left', defval=5)
rangeUpper = input(title='Max of Lookback Range', defval=60)
rangeLower = input(title='Min of Lookback Range', defval=5)
plotBull = input(title='Bullish Divergence', defval=true)
plotBear = input(title='Bearish Divergence', defval=true)
bearColor = color.red
bullColor = color.green
hiddenBullColor = color.new(color.green, 80)
hiddenBearColor = color.new(color.red, 80)
textColor = color.white
noneColor = color.new(color.white, 100)
osc = ta.rsi(src, len)

plFound = na(ta.pivotlow(osc, lbL, lbR)) ? false : true
phFound = na(ta.pivothigh(osc, lbL, lbR)) ? false : true
_inRange(cond) =>
    bars = ta.barssince(cond == true)
    rangeLower <= bars and bars <= rangeUpper

oscHL = osc[lbR] > ta.valuewhen(plFound, osc[lbR], 1) and _inRange(plFound[1])
priceLL = low[lbR] < ta.valuewhen(plFound, low[lbR], 1)
bullCond = plotBull and priceLL and oscHL and plFound

plot(plFound ? osc[lbR] : na, offset=-lbR, title='Bullish Divergence Line', linewidth=2, color=bullCond ? bullColor : noneColor,display=display.none)

plotshape(bullCond ? osc[lbR] : na, offset=-lbR, title='Bullish Divergence Label', text=' Bull ', style=shape.labelup, location=location.absolute, color=color.new(bullColor, 0), textcolor=color.new(textColor, 0))

oscLH = osc[lbR] < ta.valuewhen(phFound, osc[lbR], 1) and _inRange(phFound[1])
priceHH = high[lbR] > ta.valuewhen(phFound, high[lbR], 1)
bearCond = plotBear and priceHH and oscLH and phFound

plot(phFound ? osc[lbR] : na, offset=-lbR, title='Bearish Divergence Line', linewidth=2, color=bearCond ? bearColor : noneColor,display=display.none)

plotshape(bearCond ? osc[lbR] : na, offset=-lbR, title='Bearish Divergence Label', text=' Bear ', style=shape.labeldown, location=location.absolute, color=color.new(bearColor, 0), textcolor=color.new(textColor, 0))




if bullCond
    strategy.entry("Enter Long", strategy.long)
else if bearCond
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/363980

> Last Modified

2022-05-18 10:51:21
