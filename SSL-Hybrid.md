
> Name

SSL-Hybrid

> Author

ChaoZhang

> Strategy Description

This script is designed for the NNFX Method, so it is recommended for Daily charts only.
Tried to implement a few VP NNFX Rules
This script has a SSL / Baseline (you can choose between the SSL or MA), a secondary SSL for continiuation trades and a third SSL for exit trades.
Alerts added for Baseline entries, SSL2 continuations, Exits.
Baseline has a Keltner Channel setting for "in zone" Gray Candles
Added "Candle Size > 1 ATR" Diamonds from my old script with the criteria of being within Baseline ATR range.

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/16f9872d59d9fafbaaf.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Show Baseline|
|v_input_2|false|Show SSL1|
|v_input_3|true|Show ATR bands|
|v_input_4|14|ATR Period|
|v_input_5|true|ATR Multi|
|v_input_6|0|ATR Smoothing: SMA|RMA|EMA|WMA|
|v_input_7|0|SSL1 / Baseline Type: HMA|EMA|DEMA|TEMA|LSMA|WMA|MF|VAMA|TMA|SMA|JMA|Kijun v2|EDSMA|McGinley|
|v_input_8|60|SSL1 / Baseline Length|
|v_input_9|0|SSL2 / Continuation Type: JMA|EMA|DEMA|TEMA|WMA|MF|VAMA|TMA|HMA|SMA|McGinley|
|v_input_10|5|SSL 2 Length|
|v_input_11|0|EXIT Type: HMA|TEMA|LSMA|VAMA|TMA|DEMA|JMA|Kijun v2|McGinley|MF|
|v_input_12|15|EXIT Length|
|v_input_13_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_14|true|Kijun MOD Divider|
|v_input_15|3|* Jurik (JMA) Only - Phase|
|v_input_16|true|* Jurik (JMA) Only - Power|
|v_input_17|10|* Volatility Adjusted (VAMA) Only - Volatility lookback length|
|v_input_18|0.8|Modular Filter, General Filter Only - Beta|
|v_input_19|false|Modular Filter Only - Feedback|
|v_input_20|0.5|Modular Filter Only - Feedback Weighting|
|v_input_21|20|EDSMA - Super Smoother Filter Length|
|v_input_22|0|EDSMA - Super Smoother Filter Poles: 2|3|
|v_input_23|true|useTrueRange|
|v_input_24|0.2|Base Channel Multiplier|
|v_input_25|true|Color Bars|
|v_input_26|0.9|Continuation ATR Criteria|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-16 00:00:00
end: 2022-05-15 23:59:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//By Mihkel00
// This script is designed for the NNFX Method, so it is recommended for Daily charts only. 
// Tried to implement a few VP NNFX Rules
// This script has a SSL / Baseline (you can choose between the SSL or MA), a secondary SSL for continiuation trades and a third SSL for exit trades.
// Alerts added for Baseline entries, SSL2 continuations, Exits.
// Baseline has a Keltner Channel setting for "in zone" Gray Candles
// Added "Candle Size > 1 ATR" Diamonds from my old script with the criteria of being within Baseline ATR range.
// Credits
// Strategy causecelebre https://www.tradingview.com/u/causecelebre/
// SSL Channel ErwinBeckers https://www.tradingview.com/u/ErwinBeckers/
// Moving Averages jiehonglim https://www.tradingview.com/u/jiehonglim/
// Moving Averages  everget https://www.tradingview.com/u/everget/
// "Many Moving Averages" script  Fractured https://www.tradingview.com/u/Fractured/
study("SSL Hybrid", overlay=true)
show_Baseline = input(title="Show Baseline", type=input.bool, defval=true)
show_SSL1 = input(title="Show SSL1", type=input.bool, defval=false)
show_atr = input(title="Show ATR bands", type=input.bool, defval=true)
//ATR
atrlen = input(14, "ATR Period")
mult = input(1, "ATR Multi", step=0.1)
smoothing = input(title="ATR Smoothing", defval="SMA", options=["RMA", "SMA", "EMA", "WMA"])

ma_function(source, atrlen) => 
    if smoothing == "RMA"
        rma(source, atrlen)
    else
        if smoothing == "SMA"
            sma(source, atrlen)
        else
            if smoothing == "EMA"
                ema(source, atrlen)
            else
                wma(source, atrlen)
atr_slen = ma_function(tr(true), atrlen)
////ATR Up/Low Bands
upper_band = atr_slen * mult + close
lower_band = close - atr_slen * mult

////BASELINE / SSL1 / SSL2 / EXIT MOVING AVERAGE VALUES
maType = input(title="SSL1 / Baseline Type", type=input.string, defval="HMA", options=["SMA","EMA","DEMA","TEMA","LSMA","WMA","MF","VAMA","TMA","HMA", "JMA", "Kijun v2", "EDSMA","McGinley"])
len = input(title="SSL1 / Baseline Length", defval=60)

SSL2Type = input(title="SSL2 / Continuation Type", type=input.string, defval="JMA", options=["SMA","EMA","DEMA","TEMA","WMA","MF","VAMA","TMA","HMA", "JMA","McGinley"])
len2 = input(title="SSL 2 Length", defval=5)
//
SSL3Type = input(title="EXIT Type", type=input.string, defval="HMA", options=["DEMA","TEMA","LSMA","VAMA","TMA","HMA","JMA", "Kijun v2", "McGinley", "MF"])
len3 = input(title="EXIT Length", defval=15)
src = input(title="Source", type=input.source, defval=close)

//
tema(src, len) =>
    ema1 = ema(src, len)
    ema2 = ema(ema1, len)
    ema3 = ema(ema2, len)
    (3 * ema1) - (3 * ema2) + ema3
kidiv = input(defval=1,maxval=4,  title="Kijun MOD Divider")

jurik_phase = input(title="* Jurik (JMA) Only - Phase", type=input.integer, defval=3)
jurik_power = input(title="* Jurik (JMA) Only - Power", type=input.integer, defval=1)
volatility_lookback = input(10, title="* Volatility Adjusted (VAMA) Only - Volatility lookback length")
//MF
beta = input(0.8,minval=0,maxval=1,step=0.1,  title="Modular Filter, General Filter Only - Beta")
feedback = input(false, title="Modular Filter Only - Feedback")
z = input(0.5,title="Modular Filter Only - Feedback Weighting",step=0.1, minval=0, maxval=1)
//EDSMA
ssfLength = input(title="EDSMA - Super Smoother Filter Length", type=input.integer, minval=1, defval=20)
ssfPoles = input(title="EDSMA - Super Smoother Filter Poles", type=input.integer, defval=2, options=[2, 3])

//----

//EDSMA
get2PoleSSF(src, length) =>
    PI = 2 * asin(1)
    arg = sqrt(2) * PI / length
    a1 = exp(-arg)
    b1 = 2 * a1 * cos(arg)
    c2 = b1
    c3 = -pow(a1, 2)
    c1 = 1 - c2 - c3
    
    ssf = 0.0
    ssf := c1 * src + c2 * nz(ssf[1]) + c3 * nz(ssf[2])

get3PoleSSF(src, length) =>
    PI = 2 * asin(1)

    arg = PI / length
    a1 = exp(-arg)
    b1 = 2 * a1 * cos(1.738 * arg)
    c1 = pow(a1, 2)

    coef2 = b1 + c1
    coef3 = -(c1 + b1 * c1)
    coef4 = pow(c1, 2)
    coef1 = 1 - coef2 - coef3 - coef4

    ssf = 0.0
    ssf := coef1 * src + coef2 * nz(ssf[1]) + coef3 * nz(ssf[2]) + coef4 * nz(ssf[3])

ma(type, src, len) =>
    float result = 0
    if type=="TMA"
        result := sma(sma(src, ceil(len / 2)), floor(len / 2) + 1)
    if type=="MF"
        ts=0.,b=0.,c=0.,os=0.
        //----
        alpha = 2/(len+1)
        a = feedback ? z*src + (1-z)*nz(ts[1],src) : src
        //----
        b := a > alpha*a+(1-alpha)*nz(b[1],a) ? a : alpha*a+(1-alpha)*nz(b[1],a)
        c := a < alpha*a+(1-alpha)*nz(c[1],a) ? a : alpha*a+(1-alpha)*nz(c[1],a)
        os := a == b ? 1 : a == c ? 0 : os[1]
        //----
        upper = beta*b+(1-beta)*c
        lower = beta*c+(1-beta)*b 
        ts := os*upper+(1-os)*lower
        result := ts
    if type=="LSMA"
        result := linreg(src, len, 0)
    if type=="SMA" // Simple
        result := sma(src, len)
    if type=="EMA" // Exponential
        result := ema(src, len)
    if type=="DEMA" // Double Exponential
        e = ema(src, len)
        result := 2 * e - ema(e, len)
    if type=="TEMA" // Triple Exponential
        e = ema(src, len)
        result := 3 * (e - ema(e, len)) + ema(ema(e, len), len)
    if type=="WMA" // Weighted
        result := wma(src, len)
    if type=="VAMA" // Volatility Adjusted
        /// Copyright © 2019 to present, Joris Duyck (JD)
        mid=ema(src,len)
        dev=src-mid
        vol_up=highest(dev,volatility_lookback)
        vol_down=lowest(dev,volatility_lookback)
        result := mid+avg(vol_up,vol_down)
    if type=="HMA" // Hull
        result := wma(2 * wma(src, len / 2) - wma(src, len), round(sqrt(len)))
    if type=="JMA" // Jurik
        /// Copyright © 2018 Alex Orekhov (everget)
        /// Copyright © 2017 Jurik Research and Consulting.
        phaseRatio = jurik_phase < -100 ? 0.5 : jurik_phase > 100 ? 2.5 : jurik_phase / 100 + 1.5
        beta = 0.45 * (len - 1) / (0.45 * (len - 1) + 2)
        alpha = pow(beta, jurik_power)
        jma = 0.0
        e0 = 0.0
        e0 := (1 - alpha) * src + alpha * nz(e0[1])
        e1 = 0.0
        e1 := (src - e0) * (1 - beta) + beta * nz(e1[1])
        e2 = 0.0
        e2 := (e0 + phaseRatio * e1 - nz(jma[1])) * pow(1 - alpha, 2) + pow(alpha, 2) * nz(e2[1])
        jma := e2 + nz(jma[1])
        result := jma
    if type=="Kijun v2"
        kijun = avg(lowest(len), highest(len))//, (open + close)/2)
        conversionLine = avg(lowest(len/kidiv), highest(len/kidiv))
        delta = (kijun + conversionLine)/2
        result :=delta
    if type=="McGinley"
        mg = 0.0
        mg := na(mg[1]) ? ema(src, len) : mg[1] + (src - mg[1]) / (len * pow(src/mg[1], 4))
        result :=mg
    if type=="EDSMA"
    
        zeros = src - nz(src[2])
        avgZeros = (zeros + zeros[1]) / 2
        
        // Ehlers Super Smoother Filter 
        ssf = ssfPoles == 2
             ? get2PoleSSF(avgZeros, ssfLength)
             : get3PoleSSF(avgZeros, ssfLength)
        
        // Rescale filter in terms of Standard Deviations
        stdev = stdev(ssf, len)
        scaledFilter = stdev != 0
             ? ssf / stdev
             : 0
        
        alpha = 5 * abs(scaledFilter) / len
        
        edsma = 0.0
        edsma := alpha * src + (1 - alpha) * nz(edsma[1])
        result :=  edsma
    result
    
///SSL 1 and SSL2
emaHigh = ma(maType, high, len)
emaLow = ma(maType, low, len)

maHigh = ma(SSL2Type, high, len2)
maLow = ma(SSL2Type, low, len2)

///EXIT
ExitHigh = ma(SSL3Type, high, len3)
ExitLow = ma(SSL3Type, low, len3)

///Keltner Baseline Channel
BBMC = ma(maType, close, len)
useTrueRange = input(true)
multy = input(0.2, step=0.05, title="Base Channel Multiplier")
Keltma = ma(maType, src, len)
range = useTrueRange ? tr : high - low
rangema = ema(range, len)
upperk =Keltma + rangema * multy
lowerk = Keltma - rangema * multy

//Baseline Violation Candle
open_pos =  open*1
close_pos = close*1
difference = abs(close_pos-open_pos)
atr_violation = difference > atr_slen
InRange = upper_band > BBMC and lower_band < BBMC
candlesize_violation = atr_violation and InRange
plotshape(candlesize_violation, color=color.white, size=size.tiny,style=shape.diamond, location=location.top, transp=0,title="Candle Size > 1xATR")


//SSL1 VALUES
Hlv = int(na)
Hlv := close > emaHigh ? 1 : close < emaLow ? -1 : Hlv[1]
sslDown = Hlv < 0 ? emaHigh : emaLow

//SSL2 VALUES
Hlv2 = int(na)
Hlv2 := close > maHigh ? 1 : close < maLow ? -1 : Hlv2[1]
sslDown2 = Hlv2 < 0 ? maHigh : maLow

//EXIT VALUES
Hlv3 = int(na)
Hlv3 := close > ExitHigh ? 1 : close < ExitLow ? -1 : Hlv3[1]
sslExit = Hlv3 < 0 ? ExitHigh : ExitLow
base_cross_Long = crossover(close, sslExit)
base_cross_Short = crossover(sslExit, close)
codiff = base_cross_Long ? 1 : base_cross_Short ? -1 : na 

//COLORS
show_color_bar = input(title="Color Bars", type=input.bool, defval=true)
color_bar = close > upperk ? #00c3ff : close < lowerk ? #ff0062 : color.gray
color_ssl1 = close > sslDown ? #00c3ff : close < sslDown ? #ff0062 : na

//PLOTS
//plotarrow(codiff, colorup=#00c3ff, colordown=#ff0062,title="Exit Arrows", transp=20, maxheight=20, offset=0)
p1 = plot(show_Baseline ? BBMC : na, color=color_bar, linewidth=4,transp=0, title='MA Baseline')
DownPlot = plot( show_SSL1 ? sslDown : na, title="SSL1", linewidth=3, color=color_ssl1, transp=10)
//barcolor(show_color_bar ? color_bar : na)
up_channel = plot(show_Baseline ? upperk : na, color=color_bar, title="Baseline Upper Channel")
low_channel = plot(show_Baseline ? lowerk : na, color=color_bar, title="Basiline Lower Channel")
fill(up_channel, low_channel, color=color_bar, transp=90)

////SSL2 Continiuation from ATR
atr_crit = input(0.9, step=0.1, title="Continuation ATR Criteria")
upper_half = atr_slen * atr_crit + close
lower_half = close - atr_slen * atr_crit
buy_inatr =  lower_half < sslDown2
sell_inatr = upper_half > sslDown2
sell_cont = close < BBMC and close < sslDown2
buy_cont = close > BBMC and close > sslDown2
sell_atr = sell_inatr and sell_cont
buy_atr = buy_inatr and buy_cont
atr_fill = buy_atr ? color.green : sell_atr ? color.purple : color.white
LongPlot = plot(sslDown2, title="SSL2", linewidth=2, color=atr_fill, style=plot.style_circles, transp=0)
u = plot(show_atr ? upper_band : na, "+ATR", color=color.white, transp=80)
l = plot(show_atr ? lower_band : na, "-ATR", color=color.white, transp=80)

//ALERTS
alertcondition(crossover(close, sslDown), title='SSL Cross Alert', message='SSL1 has crossed.')
alertcondition(crossover(close, sslDown2), title='SSL2 Cross Alert', message='SSL2 has crossed.')
alertcondition(sell_atr, title='Sell Continuation', message='Sell Continuation.')
alertcondition(buy_atr, title='Buy Continuation', message='Buy Continuation.')
alertcondition(crossover(close, sslExit), title='Exit Sell', message='Exit Sell Alert.')
alertcondition(crossover(sslExit, close), title='Exit Buy', message='Exit Buy Alert.')
alertcondition(crossover(close, upperk ), title='Baseline Buy Entry', message='Base Buy Alert.')
alertcondition(crossover(lowerk, close ), title='Baseline Sell Entry', message='Base Sell Alert.')

if buy_atr
    strategy.entry("Enter Long", strategy.long)
else if sell_atr
    strategy.entry("Enter Short", strategy.short)
    
    
    
```

> Detail

https://www.fmz.com/strategy/363851

> Last Modified

2022-05-17 17:36:40
