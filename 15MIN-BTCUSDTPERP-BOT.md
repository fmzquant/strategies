
> Name

15MIN-BTCUSDTPERP-BOT

> Author

ChaoZhang

> Strategy Description

This is my BTCUSDTPERP 15 min bot
Best results are on BTCUSDTPERP at binancefutures
Results depends of specific volume indicators that works best at binancefutures

15min bots are really fast, Its hard to find a good configurations, becouse of 15min backtesting which least around 3-4 months

This bot is specyfic got really high % profitable trades . Profit net is alsmo really good. However 15min bots are extremly hard to use in long-term, so I made as deflaut settings as I can.

So,
This bot using 11 difrent indicators:
1) ADX
2) RANGE FILTER
3) SAR
4) RSI
5) TWAP
6) JMA
7) MACD
8) VOLUME DELTA
9) VOLUME WEIGHT
10) MA
and the last one for the better results at qucik charts (15min) I decided to add :
11) STOCH

1) ADX - - makes a solid view to trend without any scam wick : Long only on green bars, Shorts only on red bars. That's helps my strategy to define a right trend, there is also a orange option for unidentified trends.
2) RANGE FILTER - this indicator is for the better view of trends, define trends, that is important for every bull/bear traps which helps a lot becouse of the very variable trends.
3) SAR - The parabolic SAR is a technical indicator used to determine the price direction of an asset, as well as draw attention to when the price direction is changing. SAR supporting bot, to not open new trades when the trends are slowly changing
4) RSI- value helps strategy to stop trade in right time. When RSI is overbought strategy don't open new longs , also when RSI is oversold strategy don't open new shorts
5) TWAP - has the same task like Range filter, is only for better view of trends, define trends.
6) JMA - The Jurik Moving Average indicator is one of the surest ways to smoothen price curves within a minimum time lag. The indicator offers currency traders one of the best price filters during strong price moves. In this time, when bitcoin price action is so strong, this indicator is necessary.
7) MACD - Moving average convergence divergence ( MACD ) is a trend-following momentum indicator that shows the relationship between two moving averages of a security’s price. The MACD is calculated by subtracting the 26-period exponential moving average ( EMA ) from the 12-period EMA .
Today, macd just like JMA is neccessary to make a profitable bots.
8) Volume Delta - A Cumulative Volume Delta approach based on the Bull and Bear Balance Indicator by Vadim Gimelfarb published in the October 2003 issue of the S&C Magazine. Adjust the length of the moving average according to your needs (Symbol, Timeframe, etc.)
9) Volume Weight - is the most important indicator for the strategy, to avoid open trades on flat chart, new trades are open after a strong volume bars.
10) MA 5-10-30 - like previous ones this is for better view of trends, and correctly define the trends, also Speed_MA are using for predict the future price action.
11) Stochastic- stoch is useful for predicting trend reversals. It also focuses on price momentum and can be used to identify overbought and oversold levels

Enjoy ;)

**backtest**
 ![IMG](https://www.fmz.com/upload/asset/16ed324d9172131e373.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_ohlc4|0|src: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_2|true|AVERAGE DIRECTIONAL INDEX|
|v_input_3|0|ADX OPTION: MASANAKAMURA|CLASSIC|
|v_input_4|11|ADX LENGTH|
|v_input_5|12|ADX THRESHOLD|
|v_input_6|13|Range Filter lenght|
|v_input_7|true|Range Filter mult|
|v_input_8|false|SAR Start|
|v_input_9|0.006|SAR Increment|
|v_input_10|true|SAR Maximum|
|v_input_11|true|SAR Point Width|
|v_input_12|70|RSI lenght|
|v_input_13_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_14|10|TWAP Smoothing|
|v_input_15|0|TWAP Timeframe|
|v_input_16_close|0|JMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_17||JMA Resolution|
|v_input_18|false|JMA Allow Repainting?|
|v_input_19|4|JMA Length|
|v_input_20|25|MACD Fast Length|
|v_input_21|50|MACD Slow Length|
|v_input_22|9|MACD Signal Smoothing|
|v_input_23|45|Delta Length|
|v_input_24|100|Volume Weight Length|
|v_input_25|0|Volume Weight Type: SMA|EMA|HMA|WMA|DEMA|
|v_input_26|1.5|Volume To Trigger Signal|
|v_input_27|51|MA Length|
|v_input_28|5|AvgType|
|v_input_29|45|Momentum Length|
|v_input_30|12|Momentum Calc length|
|v_input_31|9|Momentum Smooth length|
|v_input_32|true|BACKTEST|
|v_input_33|180|BACKTEST DAYS|
|v_input_34|0|ENTRY TYPE: % EQUITY|CASH|CONTRACTS|
|v_input_35|3.6|Stop Loss % [plotshape]|
|v_input_36|0.8|Take Profit % [plotshape]|
|v_input_37|3.6| stop loss [BT]|
|v_input_38|100| qty percent|
|v_input_39|0.8| Take profit [BT]|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-05-20 00:00:00
end: 2022-06-18 23:59:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © wielkieef

//@version=4
strategy("15MIN BTCUSDTPERP BOT", overlay=true,  pyramiding=1,initial_capital = 10000, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0)

//SOURCE ==================================================================================================================================================================================================================================================================

src = input(ohlc4)

// INPUTS ==================================================================================================================================================================================================================================================================

//ADX -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Act_ADX = input(true, title = "AVERAGE DIRECTIONAL INDEX", type = input.bool)
ADX_options = input("MASANAKAMURA",  title = "ADX OPTION", options = ["CLASSIC", "MASANAKAMURA"])
ADX_len = input(11, title = "ADX LENGTH", type = input.integer, minval = 1)
th = input(12, title = "ADX THRESHOLD", type = input.float, minval = 0, step = 0.5)

//Range Filter----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

length0 = input(13, title="Range Filter lenght"),mult = input(1, title="Range Filter mult")

//SAR-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

start = input(title="SAR Start", type=input.float, step=0.001, defval=0)
increment = input(title="SAR Increment", type=input.float, step=0.001, defval=0.006)
maximum = input(title="SAR Maximum", type=input.float, step=0.01, defval=1)
width = input(title="SAR Point Width", type=input.integer, minval=1, defval=1)

//RSI---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

len_3 = input(70, minval=1, title="RSI lenght")
src_3 = input(close, "RSI Source")

//TWAP Trend --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

smoothing = input(title="TWAP Smoothing", defval= 10)
resolution = input("0", "TWAP Timeframe") 

//JMA------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

inp = input(title="JMA Source", type=input.source, defval=close)
reso = input(title="JMA Resolution", type=input.resolution, defval="")
rep = input(title="JMA Allow Repainting?", type=input.bool, defval=false)
src0 = security(syminfo.tickerid, reso, inp[rep ? 0 : barstate.isrealtime ? 1 : 0])[rep ? 0 : barstate.isrealtime ? 0 : 1]
lengths = input(title="JMA Length", type=input.integer, defval=4, minval=1)

//MACD------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

fast_length = input(title="MACD Fast Length", type=input.integer, defval=25)
slow_length = input(title="MACD Slow Length", type=input.integer, defval=50)
signal_length = input(title="MACD Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 9)

//Volume Delta -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

periodMa = input(title="Delta Length", minval=1, defval=45)

//Volume weight------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

maLength = input(title="Volume Weight Length", type=input.integer, defval=100, minval=1)
maType = input(title="Volume Weight Type", type=input.string, defval="SMA", options=["EMA", "SMA", "HMA", "WMA", "DEMA"])
rvolTrigger = input(title="Volume To Trigger Signal", type=input.float, defval=1.5, step=0.1 , minval=0.1)

//MA----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

length = input(51, minval=1, title="MA Length")
matype = input(5, minval=1, maxval=5, title="AvgType")

//Momentum------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

tmolength = input(45, title="Momentum Length")
calcLength = input(12, title="Momentum Calc length")
smoothLength = input(9, title="Momentum Smooth length")

//INDICATORS ==============================================================================================================================================================================================================================================================

//ADX----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

calcADX(_len) =>
    up              = change(high)
	down            = -change(low)
	plusDM          = na(up)   ? na : (up > down and up > 0   ? up   : 0)
    minusDM         = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange       = rma(tr, _len)
	_plus           = fixnan(100 * rma(plusDM, _len)  / truerange)
	_minus          = fixnan(100 * rma(minusDM, _len) / truerange)
	sum             = _plus + _minus
	_adx            = 100 * rma(abs(_plus - _minus) / (sum == 0 ? 1 : sum), _len)
    [_plus,_minus,_adx]

calcADX_Masanakamura(_len) =>
    SmoothedTrueRange                   = 0.0
    SmoothedDirectionalMovementPlus     = 0.0
    SmoothedDirectionalMovementMinus    = 0.0
    TrueRange                           = max(max(high - low, abs(high - nz(close[1]))), abs(low - nz(close[1])))
    DirectionalMovementPlus             = high - nz(high[1]) > nz(low[1]) - low ? max(high - nz(high[1]), 0) : 0
    DirectionalMovementMinus            = nz(low[1]) - low > high - nz(high[1]) ? max(nz(low[1]) - low, 0)   : 0
    SmoothedTrueRange                   := nz(SmoothedTrueRange[1]) - (nz(SmoothedTrueRange[1]) /_len) + TrueRange
    SmoothedDirectionalMovementPlus     := nz(SmoothedDirectionalMovementPlus[1])  - (nz(SmoothedDirectionalMovementPlus[1])  / _len) + DirectionalMovementPlus
    SmoothedDirectionalMovementMinus    := nz(SmoothedDirectionalMovementMinus[1]) - (nz(SmoothedDirectionalMovementMinus[1]) / _len) + DirectionalMovementMinus
    DIP                                 = SmoothedDirectionalMovementPlus  / SmoothedTrueRange * 100
    DIM                                 = SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100
    DX                                  = abs(DIP-DIM) / (DIP+DIM)*100
    adx                                 = sma(DX, _len)
    [DIP,DIM,adx]

[DIPlusC,DIMinusC,ADXC] = calcADX(ADX_len) 
[DIPlusM,DIMinusM,ADXM] = calcADX_Masanakamura(ADX_len)
DIPlus                  = ADX_options == "CLASSIC" ? DIPlusC    : DIPlusM
DIMinus                 = ADX_options == "CLASSIC" ? DIMinusC   : DIMinusM
ADX                     = ADX_options == "CLASSIC" ? ADXC       : ADXM

ADX_color = DIPlus > DIMinus and ADX > th ? color.green : DIPlus < DIMinus and ADX > th ? color.red : color.orange
barcolor(color = Act_ADX ? ADX_color : na, title = "ADX")

//Range Filter---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

out = 0., cma = 0., cts = 0.
Var = variance(src,length0)*mult
sma = sma(src,length0)

secma = pow(nz(sma - cma[1]),2) 
sects = pow(nz(src - cts[1]),2) 
ka = Var < secma ? 1 - Var/secma : 0
kb = Var < sects ? 1 - Var/sects : 0

cma := ka*sma+(1-ka)*nz(cma[1],src)
cts := kb*src+(1-kb)*nz(cts[1],src)

css = cts > cma ? color.green : color.red
a = plot(cts,"CTS",color.red,2,transp=0)
b = plot(cma,"CMA",color.green,2,transp=0)
fill(a,b,color=css,transp=80)

rangegood = cts > cma
rangebad  = cts < cma

//SAR-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

psar = sar(start, increment, maximum)
dir = psar < close ? 1 : -1

psarColor = dir == 1 ? color.green : color.red
psarPlot = plot(psar, title="PSAR", style=plot.style_circles, linewidth=width, color=psarColor, transp=0)

var color longColor = color.green
var color shortColor = color.red

sargood = dir ==1
sarbad  = dir ==-1

//RSI---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

up_3 = rma(max(change(src_3), 0), len_3)
down_3 = rma(-min(change(src_3), 0), len_3)
rsi_3 = down_3 == 0 ? 100 : up_3 == 0 ? 0 : 100 - (100 / (1 + up_3 / down_3))

rsiob = (rsi_3 < 70)
rsios  = (rsi_3 > 30) 

//TWAP Trend --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

res = resolution != "0" ? resolution : timeframe.period
weight = barssince(change(security(syminfo.tickerid, res, time, lookahead=barmerge.lookahead_on)))
price = 0.
price:= weight == 0 ? src : src + nz(price[1])
twap = price / (weight + 1)
ma_ = smoothing < 2 ? twap : sma(twap, smoothing)
bullish = iff(smoothing < 2, src >= ma_, src > ma_)
disposition = bullish ? color.lime : color.red
basis = plot(src, "OHLC4", disposition, linewidth=1, transp=100)
work = plot(ma_, "TWAP", disposition, linewidth=2, transp=20)
fill(basis, work, disposition, transp=65)

//JMA------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

jsa = (src0 + src0[lengths]) / 2
sig = src0 > jsa ? 1 : src0 < jsa ? -1 : 0

jsaColor = sig > 0 ? color.lime : sig < 0 ? color.red : color.orange
plot(jsa, color=jsaColor, linewidth=2)

jmagood = sig > 0
jmabad  = sig < 0

//MACD------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

fast_ma = ema(src, fast_length)
slow_ma = ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma(macd, signal_length)

macdgood = macd > signal
macdbad  = macd < signal

//Volume Delta -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

bullPower = iff(close < open, iff(close[1] < open, max(high - close[1], close - low), max(high - open, close - low)), iff(close > open, iff(close[1] > open,  high - low, max(open - close[1], high - low)), iff(high - close > close - low, iff(close[1] < open, max(high - close[1], close - low), high - open), iff(high - close < close - low, iff(close[1] > open, high - low, max(open - close[1], high - low)), iff(close[1] > open, max(high - open, close - low), iff(close[1] < open, max(open - close[1], high - low), high-low))))))
bearPower = iff(close < open, iff(close[1] > open, max(close[1] - open, high - low), high - low), iff(close > open, iff(close[1] > open, max(close[1] - low, high - close), max(open - low, high - close)), iff(high - close > close - low, iff(close[1] > open, max(close[1] - open, high - low), high - low), iff(high - close < close - low, iff(close[1] > open, max(close[1] - low, high - close), open - low), iff(close[1] > open, max(close[1] - open, high - low), iff(close[1] < open, max(open - low, high - close), high - low))))))

bullVolume = (bullPower / (bullPower + bearPower)) * volume
bearVolume = (bearPower / (bullPower + bearPower)) * volume

delta = bullVolume - bearVolume
cvd = cum(delta)
cvdMa = sma(cvd, periodMa)

deltagood = cvd > cvdMa
deltabad  = cvd < cvdMa

//Volume weight------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

getMA0(length) =>
    maPrice = ema(volume, length)
    if maType == "SMA"
        maPrice := sma(volume, length)
    if maType == "HMA"
        maPrice := hma(volume, length)
    if maType == "WMA"
        maPrice := wma(volume, length)
    if maType == "DEMA"
        e1 = ema(volume, length)
        e2 = ema(e1, length)
        maPrice := 2 * e1 - e2
    maPrice

ma = getMA0(maLength)
rvol = volume / ma

volumegood = volume > rvolTrigger * ma

//MA----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ma5 = sma(close, 5)
ma10 = sma(close, 10)
ma30 = sma(close, 30)

magood = ma5 > ma30
mabad  = ma5 < ma30

simplema = sma(src,length)
exponentialma = ema(src,length)
hullma = wma(2*wma(src, length/2)-wma(src, length), round(sqrt(length)))
weightedma = wma(src, length)
volweightedma = vwma(src, length)
avgval = matype==1 ? simplema : matype==2 ? exponentialma : matype==3 ? hullma : matype==4 ? weightedma : matype==5 ? volweightedma : na
MA_speed = (avgval / avgval[1] -1 ) *100

masgood = MA_speed > 0
masbad  = MA_speed < 0

//Momentum-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

data = 0
for i = 1 to tmolength-1
    if close > open[i]
        data := data + 1
    if close < open[i]
        data := data - 1
    
EMA5 = ema(data, calcLength)
Main = ema(EMA5, smoothLength)
Signal = ema(Main, smoothLength)

momentumgood = Main > Signal
momentumbad = Main < Signal

//STRATEGY===============================================================================================================================================================================================================================================================

Long = (DIPlus > DIMinus and ADX > th)  and volumegood and sargood and rsiob and macdgood and deltagood and magood and masgood and bullish and jmagood and rangegood and momentumgood
Short = (DIPlus < DIMinus and ADX > th) and volumegood and sarbad  and rsios and macdbad  and deltabad  and mabad and masbad and jmabad and rangebad and momentumbad

//BACKTESTING==========================================================================================================================================================================================================================

// ————— Backtest input
Act_BT              = input(true, title = "BACKTEST", type = input.bool)
backtest_time       = input(180, title ="BACKTEST DAYS", type = input.integer, minval = 1)*24*60*60*1000
entry_Type          = input("% EQUITY", title = "ENTRY TYPE", options = ["CONTRACTS","CASH","% EQUITY"])
et_Factor           = (entry_Type == "CONTRACTS") ? 1 : (entry_Type == "% EQUITY") ? (100/(strategy.equity/close)) : close

//Signals----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// SL AND TP-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

stopPer = input(3.6, title='Stop Loss % [plotshape]', type=input.float) / 100
takePer = input(0.8, title='Take Profit % [plotshape]', type=input.float) / 100

long_short = 0
long_last = Long and (nz(long_short[1]) == 0 or nz(long_short[1]) == -1)
short_last = Short and (nz(long_short[1]) == 0 or nz(long_short[1]) == 1)
long_short := long_last ? 1 : short_last ? -1 : long_short[1]

longPrice = valuewhen(long_last, close, 0)
shortPrice = valuewhen(short_last, close, 0)

longStop = longPrice * (1 - stopPer)
shortStop = shortPrice * (1 + stopPer)
longTake = longPrice * (1 + takePer)
shortTake = shortPrice * (1 - takePer)

//plot lines ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

plotshape(long_short==1  ? longTake : na, style=shape.cross, color=color.gray, location=location.absolute )
plotshape(long_short==-1 ? shortTake : na, style=shape.cross, color=color.gray, location=location.absolute )

longBar1 = barssince(long_last)
longBar2 = longBar1 >= 1 ? true : false
shortBar1 = barssince(short_last)
shortBar2 = shortBar1 >= 1 ? true : false

Long_SL = long_short==1 and longBar2 and low < longStop
Short_SL = long_short==-1 and shortBar2 and high > shortStop

Long_TP = long_short==1 and longBar2 and high > longTake
Short_TP = long_short==-1 and shortBar2 and low < shortTake

long_short := (long_short==1 or long_short==0) and longBar2 and (Long_SL or Long_TP) ? 0 : (long_short==-1 or long_short==0) and shortBar2 and (Short_SL or Short_TP) ? 0 : long_short

last_long_cond  = Long and  long_last
last_short_cond = Short and short_last

//plotshapes---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

plotshape(last_long_cond, title="Long x1", color=color.blue, style=shape.triangleup, location=location.belowbar, size=size.small, textcolor=color.white, text="Long" , transp=1)
plotshape(last_short_cond, title="Short x1", color=color.red, style=shape.triangledown, location=location.abovebar, size=size.tiny, textcolor=color.white, text="Short" ,transp=1)

plotshape(Long_SL, location=location.belowbar, color=color.black, size=size.tiny , text="SL", textcolor=color.fuchsia)
plotshape(Short_SL, location=location.abovebar, color=color.black, size=size.tiny , text="SL", textcolor=color.fuchsia)

plotshape(Long_TP,style=shape.triangledown, location=location.abovebar, color=color.gray, size=size.tiny , text="TP", textcolor=color.red)
plotshape(Short_TP,style=shape.triangleup, location=location.belowbar, color=color.gray, size=size.tiny , text="TP", textcolor=color.green)

if last_long_cond and Act_BT
    strategy.entry("L", strategy.long)
    
if last_short_cond and Act_BT
    strategy.entry("S", strategy.short)
    
per(pcnt) =>
    strategy.position_size != 0 ? round(pcnt / 100 * strategy.position_avg_price / syminfo.mintick) : float(na)
stoploss=input(title=" stop loss [BT]", defval=3.6, minval=0.01)
los = per(stoploss)
q=input(title=" qty percent", defval=100, minval=1)

tp=input(title=" Take profit [BT]", defval=0.8, minval=0.01)

strategy.exit("tp", qty_percent = q, profit = per(tp), loss = los)

//By wielkieef

```

> Detail

https://www.fmz.com/strategy/365126

> Last Modified

2022-06-20 10:25:03
