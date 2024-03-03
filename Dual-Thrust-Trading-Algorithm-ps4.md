
> Name

Dual-Thrust-Trading-Algorithm-ps4

> Author

a624587332



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Lookback Window|
|v_input_2|2|Multiplier|
|v_input_3|0|Trend Identification Rule: Original|SMA3|EMA10|SMA5/SMA10|
|v_input_4|0|Algorithm used:: Algo #1|Algo #2|
|v_input_5|5|Lookback Window M|
|v_input_6|14|Lookback Window N|
|v_input_7|0.9|Coeff|
|v_input_8|0.55|Trending discount|
|v_input_9|false|Bollinger? (alt. Standard Error) Bands|
|v_input_10|20|Lookback Window|
|v_input_11|3|Smoothing Factor|
|v_input_12|2|Bands Multiplier|
|v_input_13|true|Repaint?|


> Source (PineScript)

``` pinescript
//@version=4
study("Dual Thrust Trading Algorithm (ps4)", overlay=true)
// author: capissimo

// This is an PS4 update to the Dual Thrust trading algorithm developed by Michael Chalek. 
// It has been commonly used in futures, forex and equity markets. 
// The idea of Dual Thrust is similar to a typical breakout system, 
// however dual thrust uses the historical price to construct update the look back period - 
// theoretically making it more stable in any given period.

// see: https://www.quantconnect.com/tutorials/strategy-library/dual-thrust-trading-algorithm

//*** Inputs
p      = input(20,         "Lookback Window", minval=1)
mult   = input(2.0,        "Multiplier", minval=0.001, maxval=50)
rule   = input("Original", "Trend Identification Rule", options=["Original","SMA3","EMA10","SMA5/SMA10"])
algo   = input("Algo #1",  "Algorithm used:", options=["Algo #1", "Algo #2"])
mlen   = input(5,          "Lookback Window M") // 4
nlen   = input(14,         "Lookback Window N") // 20
k      = input(0.9,        "Coeff", step=0.01) // .7, .9
disc   = input(0.55,       "Trending discount", step=0.01) //  .6
use_bb = input(false,      "Bollinger? (alt. Standard Error) Bands")
pbb    = input(20,         "Lookback Window", minval=1)
sdeg   = input(3,          "Smoothing Factor", minval=1)
multbb = input(2.0,        "Bands Multiplier", minval=0.001, maxval=50)
repnt  = input(true,       "Repaint?")

//*** Main
O = security(syminfo.tickerid, tostring(timeframe.multiplier), repnt ? open  : open[1],  barmerge.gaps_off, barmerge.lookahead_on)
H = security(syminfo.tickerid, tostring(timeframe.multiplier), repnt ? high  : high[1],  barmerge.gaps_off, barmerge.lookahead_on)
L = security(syminfo.tickerid, tostring(timeframe.multiplier), repnt ? low   : low[1],   barmerge.gaps_off, barmerge.lookahead_on)
C = security(syminfo.tickerid, tostring(timeframe.multiplier), repnt ? close : close[1], barmerge.gaps_off, barmerge.lookahead_on)

// ==Bands==
//
// Standard Error of the Estimate (SEE) Bands are constructed around a linear regression curve and 
// based on two standard errors above and below this regression line. 
// The error bands measure the standard error of the estimate around the linear re-gression line. 
// Therefore, as a price series follows the course of the regression line the bands will narrow, 
// showing little error in the estimate. As the market gets noisy and random, 
// the error will be greater resulting in wider bands.

beta(array,per) =>
    val1 = sum(bar_index*array,per)-(per*sma(bar_index,per)*sma(array,per))
    val2 = sum(pow(bar_index,2),per)-(per*pow(sma(bar_index,per),2))
    calcB = val1/val2
    
alpha(array,per) =>
    calcA = sma(array,per)-(beta(array,per)*sma(bar_index,per))
    
see(array,per,mult,dir,type) =>
    lr = linreg(array,per,0)
    val1 = (sum(pow(array,2),per))-((alpha(array,per)*sum(array,per)))-((beta(array,per)*sum(bar_index*array,per)))
    val2 = per - 2
    narrow = sqrt(val1/val2)
    est = sum(pow(lr-array,2),per) / (per - 2 )
    wide = sqrt(est)
    d = dir ? 1 : -1
    band = type ? narrow : wide
    seb = lr + d * mult * band

// SEE Bands
UWB = plot(use_bb ? na: sma(see(close, pbb, 2.1, true, false), sdeg), color=color.blue, transp=90)
UNB = plot(use_bb ? na: sma(see(close, pbb, 2, true, true), sdeg), color=color.blue, transp=90)
plot(use_bb ? na: sma(linreg(close, pbb, 0), sdeg), color=color.orange, transp=0)
BNB = plot(use_bb ? na: sma(see(close, pbb, 2, false, true), sdeg), color=color.blue, transp=90)
BWB = plot(use_bb ? na: sma(see(close, pbb, 2.1, false, false), sdeg), color=color.blue, transp=90)
fill(UWB, BWB, title="WideSEE", color=color.blue)
fill(UNB, BNB, title="NarrowSEE", color=color.blue)

// Bollinger Bands
basis = sma(close, pbb)
dev   = multbb * stdev(close, pbb)
upper = basis + dev
lower = basis - dev
plot(use_bb ? basis : na, color=color.orange, linewidth=2, transp=0)
fill(plot(use_bb ? upper : na, transp=65), plot(use_bb ? lower : na, transp=65), color=color.blue, transp=90)

// ==Dual Thrust Trading Algorithm== 
// At the close of the day, calculate two values: 
// the highest price - the closing price, and 
// the closing price - the lowest price. 
// Then take the two larger ones, multiply the k values. The results are called trig-ger values.

// On the second day, the opening price is recorded, 
// and then immediately after the price exceeds (opening + trigger value),
// or the price is lower than the (opening - trigger value), the short selling immedi-ately.

// This is an inversion system without a single stop? i.e. the reverse signal is also the unwinding signal.

// K1 and K2 are the parameters. 
// When K1 is greater than K2, it is much easier to trigger the long signal and vice versa. 
// For demonstration, here we choose K1 = K2 = 0.5. 
// In live trading, we can still use historical data to optimize those parameters or 
// adjust the parameters according to the market trend. 
// K1 should be small than k2 if you are bullish on the market and k1 should be much bigger if you are bearish on the market.

// Trend Identification - Bullish or Bearish 
uptrend = false, dntrend = false
if rule=="Original"
    rng = C - O
    doji = rng == 0 
    uptrend := rng > 0 or doji and rng[1] > 0
    dntrend := rng < 0 or doji and rng[1] < 0
else
    sm   = sma(C, 3)                    // #1
    em   = ema(C, 10)                   // #2
    ma5  = sma(C, 5), ma10 = sma(C, 10) // #3
    uptrend := rule=="SMA3" ? C > sm : rule=="EMA10" ? C > em : ma5 > ma10 
    dntrend := rule=="SMA3" ? C < sm : rule=="EMA10" ? C < em : ma5 < ma10  

k1 = k, k2 = k
if uptrend  // Assigned empirically. Should be optimized separately
    k1 := k1 * disc  //.2
    k2 := k2 * (1 + disc)
if dntrend
    k1 := k1 * (1 + disc)
    k2 := k2 * disc //.2

dtta1_algo(k1, k2, len) =>
    hh = highest(H, len)[1]
    hc = highest(C, len)[1]
    lc = lowest(C, len)[1]
    ll = lowest(L, len)[1]
    
    // The range is calculated based on the close, high and low over the most recent N-periods.  
    // A position is opened when the market moves a certain range from the opening price. 
    range = max(hh - lc, hc - ll)
    [O + k1 * range, O - k2 * range] 
    
dtta2_algo(k1, k2, ml, nl) =>
    hh = 0.0, ll = 0.0, hc = 0.0, lc = 0.0

    hh := highest(H, ml)[1]
    hc := highest(C, ml)[1]
    lc := lowest(C, ml)[1]
    ll := lowest(L, ml)[1]
    
    sellRange = (hh - lc) >= (hc - ll) ? hh - lc : hc - ll
    
    hh := highest(H, nl)[1]
    hc := highest(C, nl)[1]
    lc := lowest(C, nl)[1]
    ll := lowest(L, nl)[1]
    
    buyRange = (hh - lc) >= (hc - ll) ? hh - lc : hc - ll
    [O + k1 * buyRange, O - k2 * sellRange] 

[bt1, st1] = dtta1_algo(k1, k2, mlen)
[bt2, st2] = dtta2_algo(k1, k2, mlen, nlen)

buyTrig = 0.0, sellTrig = 0.0
if algo == "Algo #1" 
    buyTrig := bt1, sellTrig := st1
else    
    buyTrig := bt2, sellTrig := st2

longCondition  = C >= buyTrig 
shortCondition = C <= sellTrig 
state  = 0
state := longCondition ? 1 : shortCondition ? -1 : nz(state[1])
long   = change(state) and state[1]==-1 
short  = change(state) and state[1]==1

plotshape(uptrend and long  ? low : na, location=location.belowbar, style=shape.labelup, color=color.green, size=size.tiny, text="B", textcolor=color.white, transp=0)
plotshape(dntrend and short ? high : na, location=location.abovebar, style=shape.labeldown, color=color.red, size=size.tiny, text="S", textcolor=color.white, transp=0)

alertcondition(long,  title='Buy',  message='go long')
alertcondition(short, title='Sell', message='go short') 

```

> Detail

https://www.fmz.com/strategy/373247

> Last Modified

2022-07-14 02:43:15
