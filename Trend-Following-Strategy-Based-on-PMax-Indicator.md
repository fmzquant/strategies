
> Name

Trend-Following-Strategy-Based-on-PMax-Indicator

> Author

ChaoZhang

> Strategy Description






This strategy is named “Trend Following Strategy Based on PMax Indicator”. It uses the PMax indicator to determine price trend direction and its moving average line as key reference to generate trading signals.

The PMax indicator combines the strengths of the support/resistance indicator SuperTrend and trend change indicator MOST. It builds price channels using the Average True Range (ATR), together with moving averages to judge trend direction.

When price crosses above the PMax line, it signals an upside trend reversal. When price crosses below PMax, it flags a downtrend reversal. Moving average crossover above PMax generates buy signals, while crossover below produces sell signals.

Moving average parameters directly affect trend sensitivity. Shorter periods are more sensitive to minor moves. Longer periods only capture major trends. So parameters need market-adjusted optimization. 

The advantage of this strategy is PMax is sensitive in detecting trend changes. Combining with moving averages helps filtering to identify major reversal points of mid-to-long term trends. But overtrading should be avoided.

In conclusion, the combination of PMax and moving averages forms a relatively mature trend following strategy. Through parameter optimization it can adapt to different market characteristics and capture significant directional opportunities. But traders still need flexibility in adjusting strategy parameters according to actual conditions.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_2|10|ATR Length|
|v_input_3|3|ATR Multiplier|
|v_input_4|0|Moving Average Type: EMA|SMA|WMA|TMA|VAR|WWMA|ZLEMA|TSF|
|v_input_5|10|Moving Average Length|
|v_input_6|true|Change ATR Calculation Method ?|
|v_input_7|true|Show Moving Average?|
|v_input_8|true|Show Crossing Signals?|
|v_input_9|false|Show Price/Pmax Crossing Signals?|
|v_input_10|true|Highlighter On/Off ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-05 00:00:00
end: 2023-09-12 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © KivancOzbilgic
//developer: @KivancOzbilgic
//author: @KivancOzbilgic

strategy("Profit Maximizer Strategy","PMax strat", overlay=true)
src = input(hl2, title="Source")
Periods = input(title="ATR Length", type=input.integer, defval=10)
Multiplier = input(title="ATR Multiplier", type=input.float, step=0.1, defval=3.0)
mav = input(title="Moving Average Type", defval="EMA", options=["SMA", "EMA", "WMA", "TMA", "VAR", "WWMA", "ZLEMA", "TSF"])
length =input(10, "Moving Average Length", minval=1)
changeATR= input(title="Change ATR Calculation Method ?", type=input.bool, defval=true)
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
longStop = MAvg - Multiplier*atr
longStopPrev = nz(longStop[1], longStop)
longStop := MAvg > longStopPrev ? max(longStop, longStopPrev) : longStop
shortStop = MAvg + Multiplier*atr
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
// plotshape(buySignalc and showsignalsc ? PMax*0.995 : na, title="Buy", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=#0F18BF, textcolor=color.white, transp=0)
sellSignallc = crossunder(src, PMax)
// plotshape(sellSignallc and showsignalsc ? PMax*1.005 : na, title="Sell", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=#0F18BF, textcolor=color.white, transp=0)
mPlot = plot(ohlc4, title="", style=plot.style_circles, linewidth=0,display=display.none)
longFillColor = highlighting ? (MAvg>PMax ? color.green : na) : na
shortFillColor = highlighting ? (MAvg<PMax ? color.red : na) : na
fill(mPlot, pALL, title="UpTrend Highligter", color=longFillColor)
fill(mPlot, pALL, title="DownTrend Highligter", color=shortFillColor)


strategy.entry("long",1,when = buySignalk )
strategy.entry("short",0, when = sellSignallk)


  
```

> Detail

https://www.fmz.com/strategy/426590

> Last Modified

2023-09-13 15:21:31
