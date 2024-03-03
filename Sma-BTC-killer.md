
> Name

Sma-BTC-killer

> Author

ChaoZhang

> Strategy Description

Hello !!


I made nice strategy with insane profit with only LONG and SHORT orders
well, this straegy is for ------->>> BINANCE:BTCUSDT

The strategy logic is quite simple

Strategy using 3 diffrent sma (7,21,55) to find a correct trend
To avoid a lot of wrong signals I added two indicators like:

ADX - Is one of the most powerful and accurate trend indicators. ADX measures how strong a trend is, and can give valuable information on whether there is a potential trading opportunity.
CLOUD - This is one of the newset indicators I'm using. This indicator helps strategy , this indicator is designed to indicate the correct market trend. By applying the great length of this indicator, I am able to notice a change in the trend a little later, but more accurately.

additionally I added trailing stop-loss to max security

To be honest this strategy looks really good, a lot of trades, high profit and a small amount of indicators, the future profits could be similar

Using this combinations of SMA gives me amazing quick changes while trend is also changin fast like here:

snapshot

unfortunetlly I was not able to 100% eleiminate wrong signals on the flat chart like here:

snapshot


I hope this strategy will be usefull for anyone ;)



Ass always






ENJOY !!

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/b9533260444f2dfb3e.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|  1-SMA Lenght|
|v_input_2|28|  2-SMA Lenght|
|v_input_3|55|  3-SMA Lenght|
|v_input_4|0|(?Average Directional Index)  Adx Type: MASANAKAMURA|CLASSIC|
|v_input_5|29|  Adx Lenght|
|v_input_6|21|  Adx Treshold|
|v_input_7|11|(?Cloud)Cloud Length|
|v_input_8|18|(?Average True Range)  PP period|
|v_input_9|5|  ATR Factor|
|v_input_10|6|  ATR Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-01-01 00:00:00
end: 2022-02-11 23:59:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Bitfinex","currency":"BTC_USD"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © wielkieef


//@version=4

src = close

//strategy("Sma BTC killer [60MIN]", overlay = true, pyramiding=1,initial_capital = 10000, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.04)

//SMAs -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Length1 = input(14,  title="  1-SMA Lenght", minval=1)
Length2 = input(28, title="  2-SMA Lenght", minval=1)
Length3 = input(55, title="  3-SMA Lenght", minval=1)
xPrice = close
SMA1 = sma(xPrice, Length1)
SMA2 = sma(xPrice, Length2)
SMA3 = sma(xPrice, Length3)

//Indicators Inputs -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ADX_options         =                   input("MASANAKAMURA",                   title="  Adx Type",                                       options = ["CLASSIC", "MASANAKAMURA"],                                            group="Average Directional Index")
ADX_len             =                   input(29,                               title="  Adx Lenght",                                     type=input.integer, minval = 1,                                                   group="Average Directional Index")
th                  =                   input(21,                               title="  Adx Treshold",                                   type=input.integer, minval = 0,                                                   group="Average Directional Index")
len                 =                   input(11,                               title="Cloud Length",                                                                                                                       group="Cloud")

// ATR Inputs  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

prd                     =               input(18,                                title="  PP period",                                                                                                                        group="Average True Range")
Factor                  =               input(5,                                title="  ATR Factor",                                                                                                                       group="Average True Range")
Pd                      =               input(6,                                title="  ATR Period",                                                                                                                       group="Average True Range")

//Indicators -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

calcADX(_len) =>
    up              =                                                                                                                       change(high)
	down            =                                                                                                                      -change(low)
	plusDM          =                                                                                                                       na(up)   ? na : (up > down and up > 0   ? up   : 0)
    minusDM         =                                                                                                                       na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange       =                                                                                                                       rma(tr, _len)
	_plus           =                                                                                                                       fixnan(100 * rma(plusDM, _len)  / truerange)
	_minus          =                                                                                                                       fixnan(100 * rma(minusDM, _len) / truerange)
	sum             =                                                                                                                       _plus + _minus
	_adx            =                                                                                                                       100 * rma(abs(_plus - _minus) / (sum == 0 ? 1 : sum), _len)
    [_plus,_minus,_adx]
calcADX_Masanakamura(_len) =>
    SmoothedTrueRange                   =                                                                                                   0.0
    SmoothedDirectionalMovementPlus     =                                                                                                   0.0
    SmoothedDirectionalMovementMinus    =                                                                                                   0.0
    TrueRange                           =                                                                                                   max(max(high - low, abs(high - nz(close[1]))), abs(low - nz(close[1])))
    DirectionalMovementPlus             =                                                                                                   high - nz(high[1]) > nz(low[1]) - low ? max(high - nz(high[1]), 0) : 0
    DirectionalMovementMinus            =                                                                                                   nz(low[1]) - low > high - nz(high[1]) ? max(nz(low[1]) - low, 0)   : 0
    SmoothedTrueRange                   :=                                                                                                  nz(SmoothedTrueRange[1]) - (nz(SmoothedTrueRange[1]) /_len) + TrueRange
    SmoothedDirectionalMovementPlus     :=                                                                                                  nz(SmoothedDirectionalMovementPlus[1])  - (nz(SmoothedDirectionalMovementPlus[1])  / _len) + DirectionalMovementPlus
    SmoothedDirectionalMovementMinus    :=                                                                                                  nz(SmoothedDirectionalMovementMinus[1]) - (nz(SmoothedDirectionalMovementMinus[1]) / _len) + DirectionalMovementMinus
    DIP                                 =                                                                                                   SmoothedDirectionalMovementPlus  / SmoothedTrueRange * 100
    DIM                                 =                                                                                                   SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100
    DX                                  =                                                                                                   abs(DIP-DIM) / (DIP+DIM)*100
    adx                                 =                                                                                                   sma(DX, _len)
    [DIP,DIM,adx]
[DIPlusC,DIMinusC,ADXC] =                                                                                                                   calcADX(ADX_len) 
[DIPlusM,DIMinusM,ADXM] =                                                                                                                   calcADX_Masanakamura(ADX_len)

DIPlus                  =                                                                                                                   ADX_options == "CLASSIC" ? DIPlusC    : DIPlusM
DIMinus                 =                                                                                                                   ADX_options == "CLASSIC" ? DIMinusC   : DIMinusM
ADX                     =                                                                                                                   ADX_options == "CLASSIC" ? ADXC       : ADXM
L_adx                   =                                                       DIPlus > DIMinus and ADX > th
S_adx                   =                                                       DIPlus < DIMinus and ADX > th
ADX_COLOR           =   L_adx ? color.lime : S_adx ? color.red :  color.orange
PI =                                                                                                                                        2 * asin(1)
hilbertTransform(src) =>
    0.0962 * src + 0.5769 * nz(src[2]) - 0.5769 * nz(src[4]) - 0.0962 * nz(src[6])
computeComponent(src, mesaPeriodMult) =>
    hilbertTransform(src) * mesaPeriodMult
computeAlpha(src, fastLimit, slowLimit) =>
    mesaPeriod =                                                                                                                            0.0
    mesaPeriodMult =                                                                                                                        0.075 * nz(mesaPeriod[1]) + 0.54
    smooth =                                                                                                                                0.0
    smooth :=                                                                                                                               (4 * src + 3 * nz(src[1]) + 2 * nz(src[2]) + nz(src[3])) / 10
    detrender   =                                                                                                                           0.0
    detrender   :=                                                                                                                          computeComponent(smooth, mesaPeriodMult)
    I1 =                                                                                                                                    nz(detrender[3])
    Q1 =                                                                                                                                    computeComponent(detrender, mesaPeriodMult)
    jI =                                                                                                                                    computeComponent(I1, mesaPeriodMult)
    jQ =                                                                                                                                    computeComponent(Q1, mesaPeriodMult)
    I2 = 0.0
    Q2 = 0.0
    I2 := I1 - jQ
    Q2 := Q1 + jI
    I2 := 0.2 * I2 + 0.8 *                                                                                                                  nz(I2[1])
    Q2 := 0.2 * Q2 + 0.8 *                                                                                                                  nz(Q2[1])
    Re = I2 * nz(I2[1]) + Q2 *                                                                                                              nz(Q2[1])
    Im = I2 * nz(Q2[1]) - Q2 *                                                                                                              nz(I2[1])
    Re := 0.2 * Re + 0.8 *                                                                                                                  nz(Re[1])
    Im := 0.2 * Im + 0.8 *                                                                                                                  nz(Im[1])
    if Re != 0 and Im != 0
        mesaPeriod := 2 *                                                                                                                   PI / atan(Im / Re)
    if mesaPeriod > 1.5 *                                                                                                                   nz(mesaPeriod[1])
        mesaPeriod := 1.5 *                                                                                                                 nz(mesaPeriod[1])
    if mesaPeriod < 0.67 *                                                                                                                  nz(mesaPeriod[1])
        mesaPeriod := 0.67 *                                                                                                                nz(mesaPeriod[1])
    if mesaPeriod < 6
        mesaPeriod := 6
    if mesaPeriod > 50
        mesaPeriod := 50
    mesaPeriod := 0.2 * mesaPeriod + 0.8 *                                                                                                  nz(mesaPeriod[1])
    phase = 0.0
    if I1 != 0
        phase := (180 / PI) *                                                                                                               atan(Q1 / I1)
    deltaPhase      =                                                                                                                       nz(phase[1]) - phase
    if  deltaPhase  < 1
        deltaPhase  := 1
    alpha           = fastLimit / deltaPhase
    if  alpha < slowLimit
        alpha       := slowLimit
    [alpha,alpha/2.0]
er                  =                                                                                                                       abs(change(src,len)) / sum(abs(change(src)),len)
[a,b]               =                                                                                                                       computeAlpha(src, er, er*0.1)
mama                =                                                                                                                       0.0
mama                :=                                                                                                                      a * src + (1 - a) * nz(mama[1])
fama                =                                                                                                                       0.0
fama                :=                                                                                                                      b * mama + (1 - b) * nz(fama[1])
alpha               =                                                                                                                       pow((er * (b - a)) + a, 2)
kama                =                                                                                                                       0.0
kama                :=                                                                                                                      alpha * src + (1 - alpha) * nz(kama[1])

L_cloud             =                                                           kama > kama[1]
S_cloud             =                                                           kama < kama[1]
float ph            =                                                                                                                       pivothigh(prd, prd)
float pl            =                                                                                                                       pivotlow(prd, prd)
var float center    =                                                                                                                       na
float lastpp        =                                                                                                                       ph ? ph : pl ? pl : na
if lastpp
    if na(center)
        center      :=                                                                                                                      lastpp
    else
        
        center      :=                                                                                                                      (center * 2 + lastpp) / 3
Up                  =                                                                                                                       center - (Factor * atr(Pd))
Dn                  =                                                                                                                       center + (Factor * atr(Pd))
float TUp           =                                                                                                                       na
float TDown         =                                                                                                                       na
Trend               =                                                                                                                       0
TUp                 :=                                                                                                                      close[1] > TUp[1] ? max(Up, TUp[1]) : Up
TDown               :=                                                                                                                      close[1] < TDown[1] ? min(Dn, TDown[1]) : Dn
Trend               :=                                                                                                                      close > TDown[1] ? 1: close < TUp[1]? -1: nz(Trend[1], 1)
Trailingsl          =                                                                                                                       Trend == 1 ? TUp : TDown
bsignal =                                                                       Trend == 1 and Trend[1] == -1
ssignal =                                                                       Trend == -1 and Trend[1] == 1
L_ATR   =                                                                       Trend == 1
S_ATR   =                                                                       Trend == -1

// Strategy logic ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var bool longCond = na, var bool shortCond = na
var int CondIni_long = 0, var int CondIni_short = 0
var bool _Final_longCondition = na, var bool _Final_shortCondition = na
var float last_open_longCondition = na, var float last_open_shortCondition = na
var int last_longCondition = na, var int last_shortCondition = na
var int last_Final_longCondition = na, var int last_Final_shortCondition = na
var int nLongs = na, var int nShorts = na
Long_MA =L_adx  and L_cloud and  (SMA1 < close and  SMA2 < close and  SMA3  < close )
Short_MA =S_adx  and S_cloud and (SMA1 > close and  SMA2 > close and  SMA3  > close )
longCond                :=                                                      Long_MA
shortCond               :=                                                      Short_MA
CondIni_long                := longCond[1]              ? 1 :                   shortCond[1] ? -1 :                             nz(CondIni_long[1]                                          )
CondIni_short               := longCond[1]              ? 1 :                   shortCond[1] ? -1 :                             nz(CondIni_short[1]                                         )
longCondition               = (longCond[1]              and                                                                     nz(CondIni_long[1])                 == -1                   )
shortCondition              = (shortCond[1]             and                                                                     nz(CondIni_short[1])                ==  1                   )
var float sum_long = 0.0, var float sum_short = 0.0
var float Position_Price = 0.0
var bool Final_long_BB = na, var bool Final_short_BB = na
var int last_long_BB = na, var int last_short_BB = na
last_open_longCondition     :=                      longCondition               or          Final_long_BB[1]            ? close[1]      : nz(last_open_longCondition[1]                     )
last_open_shortCondition    :=                      shortCondition              or          Final_short_BB[1]           ? close[1]      : nz(last_open_shortCondition[1]                    )
last_longCondition          :=                      longCondition               or          Final_long_BB[1]            ? time          : nz(last_longCondition[1]                          )
last_shortCondition         :=                      shortCondition              or          Final_short_BB[1]           ? time          : nz(last_shortCondition[1]                         )
in_longCondition            =                       last_longCondition          >           last_shortCondition
in_shortCondition           =                       last_shortCondition         >           last_longCondition
last_Final_longCondition    :=                      longCondition               ? time                                                  :    nz(last_Final_longCondition[1]                 )
last_Final_shortCondition   :=                      shortCondition              ? time                                                  :    nz(last_Final_shortCondition[1]                )
nLongs                      :=                      nz(nLongs[1]                                                                                                                            )
nShorts                     :=                      nz(nShorts[1]                                                                                                                           )
if longCondition            or                      Final_long_BB
    nLongs                  :=                      nLongs                      + 1
    nShorts                 := 0
    sum_long                :=                      nz(last_open_longCondition) +           nz(sum_long[1])
    sum_short               := 0.0
if shortCondition           or                      Final_short_BB
    nLongs                  := 0
    nShorts                 :=                      nShorts + 1
    sum_short               :=                      nz(last_open_shortCondition)+ nz(sum_short[1])
    sum_long                := 0.0
Position_Price              :=                      nz(Position_Price[1])
Position_Price              :=                      longCondition               or          Final_long_BB       ?       sum_long/nLongs         :       shortCondition      or      Final_short_BB      ?       sum_short/nShorts       :       na
ATR_L_STOP = ssignal and in_longCondition
ATR_S_STOP = bsignal and in_shortCondition

// Plots and colors 010101010101010010101010101010101010101001010101010101001010101001010100101100111100101010010100110110010011100101010101010010101010101001011110011010101010101001010100101100110101010001001010101001010101001110110010101010100101010101010100111110101010101010101010100101010101100

colors = (in_longCondition ? color.green : in_shortCondition ? color.red : color.orange)
bgcolor(color=colors)
//barcolor                                                                        (color = colors)
plotshape(longCondition,            title="Long",                   style=shape.triangleup,                 location=location.belowbar,                         color=color.blue,           size=size.small ,                                                           transp = 0                  )
plotshape(shortCondition,           title="Short",                  style=shape.triangledown,               location=location.abovebar,                         color=color.red,            size=size.small ,                                                           transp = 0                  )
mama_p      =   plot(mama,          title="Cloud A",  style= plot.style_stepline,                                                                               color=colors                                                                                                                     )
fama_p      =   plot(fama,          title="Cloud B",  style= plot.style_stepline,                                                                               color=colors                                                                                                                     )
fill                                    (mama_p,fama_p,                                                                                                         color=colors  )
plot(SMA1, color=color.white,style= plot.style_stepline, title="5", linewidth=1)
plot(SMA2, color=color.gray,style= plot.style_stepline, title="15", linewidth=2)
plot(SMA3, color=color.black,style= plot.style_stepline, title="55", linewidth=3)
plotshape(ATR_L_STOP,                                          title = "ATR LONG CLOSE",                 style=shape.arrowdown,                     location=location.abovebar,                         color=color.red,         size=size.small ,        text="ATR LONG CLOSE",          textcolor=color.red,           transp = 0            )
plotshape(ATR_S_STOP,                                         title = "ATR SHORT CLOSE",                 style=shape.arrowup,                     location=location.belowbar,                         color=color.blue,          size=size.small,         text="ATR SHORT CLOSE",         textcolor=color.blue,           transp = 0            )

// Strategy -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

if                                                                              Long_MA
    strategy.entry                                                              ("L", strategy.long)
if                                                                              Short_MA
    strategy.entry                                                              ("S", strategy.short)
    
strategy.close_all( when = ATR_L_STOP or ATR_S_STOP)



// By wielkieef
```

> Detail

https://www.fmz.com/strategy/363766

> Last Modified

2022-05-17 13:41:03
