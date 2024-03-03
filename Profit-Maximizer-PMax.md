
> Name

Profit-Maximizer-PMax

> Author

ChaoZhang

> Strategy Description


Both MOST and SuperTrend Indicators are very good at trend following systems but conversely their performance is not bright in sideways market conditions like most of the other indicators.

Profit Maximizer - PMax tries to solve this problem. PMax combines the powerful sides of MOST (Moving Average Trend Changer) and SuperTrend (ATR price detection) in one indicator.

Backtest and optimization results of PMax are far better when compared to its ancestors MOST and SuperTrend. It reduces the number of false signals in sideways and give more reliable trade signals.

PMax is easy to determine the trend and can be used in any type of markets and instruments. It does not repaint.

The first parameter in the PMax indicator set by the three parameters is the period/length of ATR.

The second Parameter is the Multiplier of ATR which would be useful to set the value of distance from the built in Moving Average.

I personally think the most important parameter is the Moving Average Length and type.

PMax will be much sensitive to trend movements if Moving Average Length is smaller. And vice versa, will be less sensitive when it is longer.

As the period increases it will become less sensitive to little trends and price actions.

In this way, your choice of period, will be closely related to which of the sort of trends you are interested in.

We are under the effect of the uptrend in cases where the Moving Average is above PMax;
conversely under the influence of a downward trend, when the Moving Average is below PMax.

Built in Moving Average type defaultly set as EMA but users can choose from 8 different Moving Average types like:

SMA : Simple Moving Average
EMA : Exponential Movin Average
WMA : Weighted Moving Average
TMA : Triangular Moving Average
VAR : Variable Index Dynamic Moving Average aka VIDYA
WWMA : Welles Wilder's Moving Average
ZLEMA : Zero Lag Exponential Moving Average
TSF : True Strength Force

Tip: In sideways VAR would be a good choice


You can use PMax default alarms and Buy Sell signals like:

1-
BUY when Moving Average crosses above PMax
SELL when Moving Average crosses under PMax

2-
BUY when prices jumps over PMax line.
SELL when prices go under PMax line.

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/1311358660a7697b6f6.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_2|10|ATR Length|
|v_input_3|3|ATR Multiplier|
|v_input_4|0|Moving Average Type: EMA|SMA|WMA|TMA|VAR|WWMA|ZLEMA|TSF|
|v_input_5|10|Moving Average Length|
|v_input_6|true|Change ATR Calculation Method ?|
|v_input_7|false|Normalize ATR ?|
|v_input_8|true|Show Moving Average?|
|v_input_9|true|Show Crossing Signals?|
|v_input_10|false|Show Price/Pmax Crossing Signals?|
|v_input_11|true|Highlighter On/Off ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-24 00:00:00
end: 2022-05-23 23:59:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © KivancOzbilgic
//developer: @KivancOzbilgic
//author: @KivancOzbilgic

study("Profit Maximizer","PMax", overlay=true, format=format.price, precision=2, resolution="")
src = input(hl2, title="Source")
Periods = input(title="ATR Length", type=input.integer, defval=10)
Multiplier = input(title="ATR Multiplier", type=input.float, step=0.1, defval=3.0)
mav = input(title="Moving Average Type", defval="EMA", options=["SMA", "EMA", "WMA", "TMA", "VAR", "WWMA", "ZLEMA", "TSF"])
length =input(10, "Moving Average Length", minval=1)
changeATR= input(title="Change ATR Calculation Method ?", type=input.bool, defval=true)
Normalize= input(title="Normalize ATR ?", type=input.bool, defval=false)
showsupport = input(title="Show Moving Average?", type=input.bool, defval=true)
showsignalsk = input(title="Show Crossing Signals?", type=input.bool, defval=true)
showsignalsc = input(title="Show Price/Pmax Crossing Signals?", type=input.bool, defval=false)
highlighting = input(title="Highlighter On/Off ?", type=input.bool, defval=true)
atr2 = sma(tr, Periods)
atr= changeATR ? atr(Periods) : atr2
valpha=2/(length+1)
vud1=src>src[1] ? src-src[1] : 0
vdd1=src<src[1] ? src[1]-src : 0
vUD=sum(vud1,9)
vDD=sum(vdd1,9)
vCMO=nz((vUD-vDD)/(vUD+vDD))
VAR=0.0
VAR:=nz(valpha*abs(vCMO)*src)+(1-valpha*abs(vCMO))*nz(VAR[1])
wwalpha = 1/ length
WWMA = 0.0
WWMA := wwalpha*src + (1-wwalpha)*nz(WWMA[1])
zxLag = length/2==round(length/2) ? length/2 : (length - 1) / 2
zxEMAData = (src + (src - src[zxLag]))
ZLEMA = ema(zxEMAData, length)
lrc = linreg(src, length, 0)
lrc1 = linreg(src,length,1)
lrs = (lrc-lrc1)
TSF = linreg(src, length, 0)+lrs
getMA(src, length) =>
    ma = 0.0
    if mav == "SMA"
        ma := sma(src, length)
        ma

    if mav == "EMA"
        ma := ema(src, length)
        ma

    if mav == "WMA"
        ma := wma(src, length)
        ma

    if mav == "TMA"
        ma := sma(sma(src, ceil(length / 2)), floor(length / 2) + 1)
        ma

    if mav == "VAR"
        ma := VAR
        ma

    if mav == "WWMA"
        ma := WWMA
        ma

    if mav == "ZLEMA"
        ma := ZLEMA
        ma

    if mav == "TSF"
        ma := TSF
        ma
    ma
    
MAvg=getMA(src, length)
longStop = Normalize ? MAvg - Multiplier*atr/close : MAvg - Multiplier*atr
longStopPrev = nz(longStop[1], longStop)
longStop := MAvg > longStopPrev ? max(longStop, longStopPrev) : longStop
shortStop = Normalize ? MAvg + Multiplier*atr/close : MAvg + Multiplier*atr
shortStopPrev = nz(shortStop[1], shortStop)
shortStop := MAvg < shortStopPrev ? min(shortStop, shortStopPrev) : shortStop
dir = 1
dir := nz(dir[1], dir)
dir := dir == -1 and MAvg > shortStopPrev ? 1 : dir == 1 and MAvg < longStopPrev ? -1 : dir
PMax = dir==1 ? longStop: shortStop
plot(showsupport ? MAvg : na, color=#0585E1, linewidth=2, title="Moving Avg Line")
pALL=plot(PMax, color=color.red, linewidth=2, title="PMax", transp=0)
alertcondition(cross(MAvg, PMax), title="Cross Alert", message="PMax - Moving Avg Crossing!")
alertcondition(crossover(MAvg, PMax), title="Crossover Alarm", message="Moving Avg BUY SIGNAL!")
alertcondition(crossunder(MAvg, PMax), title="Crossunder Alarm", message="Moving Avg SELL SIGNAL!")
alertcondition(cross(src, PMax), title="Price Cross Alert", message="PMax - Price Crossing!")
alertcondition(crossover(src, PMax), title="Price Crossover Alarm", message="PRICE OVER PMax - BUY SIGNAL!")
alertcondition(crossunder(src, PMax), title="Price Crossunder Alarm", message="PRICE UNDER PMax - SELL SIGNAL!")

buySignalk = crossover(MAvg, PMax)
plotshape(buySignalk and showsignalsk ? PMax*0.995 : na, title="Buy", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=color.green, textcolor=color.white, transp=0)

sellSignallk = crossunder(MAvg, PMax)
plotshape(sellSignallk and showsignalsk ? PMax*1.005 : na, title="Sell", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.red, textcolor=color.white, transp=0)

buySignalc = crossover(src, PMax)
plotshape(buySignalc and showsignalsc ? PMax*0.995 : na, title="Buy", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=#0F18BF, textcolor=color.white, transp=0)

sellSignallc = crossunder(src, PMax)
plotshape(sellSignallc and showsignalsc ? PMax*1.005 : na, title="Sell", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=#0F18BF, textcolor=color.white, transp=0)

mPlot = plot(ohlc4, title="", style=plot.style_circles, linewidth=0,display=display.none)
longFillColor = highlighting ? (MAvg>PMax ? color.green : na) : na
shortFillColor = highlighting ? (MAvg<PMax ? color.red : na) : na

fill(mPlot, pALL, title="UpTrend Highligter", color=longFillColor)
fill(mPlot, pALL, title="DownTrend Highligter", color=shortFillColor)


if buySignalk
    strategy.entry("Enter Long", strategy.long)
else if sellSignallk
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/365691

> Last Modified

2022-05-25 17:13:45
