
> Name

Welcome-to-the-BEARMARKET-30MIN

> Author

ChaoZhang

> Strategy Description


Hello everyone,

This is my first concept of bear market movmment nearfuture
Bot is optimalised for --->>> BINANCE:BTCUSDT

The core of this bot is using ATR trend to define trend, also uses rsi value to open new swingshorts ( RSI-VWAP ) or find a perfect close place ( RSI OVERSOLD)

This bot is only short bot for 100% maximalize profit from every move down from Bitcoin
I recommend using 1-3x leverage for this bot, becouse of the high amount of wrong trades or closes with minimal profit
Sl is arount : 6% (Just for best perforrming in all backtesting time period)

So, short codintion is open by :

1) Both ADX and S_ATR only if rsi is not oversold
a) ADX Is one of the most powerful and accurate trend indicators. ADX measures how strong a trend is, and can give valuable information on whether there is a potential trading opportunity.
b) The average true range (ATR) is a technical analysis indicator, introduced by market technician J. Welles Wilder Jr. in his book New Concepts in Technical Trading Systems, that measures market volatility by decomposing the entire range of an asset price for that period

2) RSI VWAP -VWAP is calculated by adding up the dollars traded for every transaction (price multiplied by the number of shares traded) and then dividing by the total shares traded.
rsi vwwap open new position only if there is no bullish signal from Cloud , Adx , ATR indicators

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/10b6726f9fa1eb5447c.jpg) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|PP period|
|v_input_2|10|ATR Factor|
|v_input_3|14|ATR Period|
|v_input_4|2|Cloud Length|
|v_input_10|22|Rsi vwap lenght|
|v_input_11|6| stop loss|
|v_input_12|100| qty percent|
|v_input_5|0|(?ADX_options)ADX_options OPTION: CLASSIC|MASANAKAMURA|
|v_input_6|17|ADX_options LENGTH|
|v_input_7|14|ADX_options THRESHOLD|
|v_input_8|51|(?Relative Strenght Indeks)RSI lenght|
|v_input_9_high|0|RSI Source: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-15 00:00:00
end: 2022-05-14 23:59:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © wielkieef


//@version=4

src = close

//strategy("Welcome to the BEARMARKET [30MIN]", overlay=true, initial_capital = 10000, pyramiding = 1, currency = "USD", calc_on_order_fills = false, calc_on_every_tick = false, default_qty_type = strategy.fixed, default_qty_value = 1, commission_value = 0.04)

//Inputs  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

prd                     =               input(2,                                title="PP period")
Factor                  =               input(10,                               title = "ATR Factor")
Pd                      =               input(14,                               title = "ATR Period")
len                     =               input(2,                                title="Cloud Length")
ADX_options             =               input("CLASSIC",                        title="ADX OPTION",                                       options = ["CLASSIC", "MASANAKAMURA"],                                            group = "ADX")
ADX_len                 =               input(17,                               title="ADX LENGTH",                                       type = input.integer, minval = 1,                                                 group = "ADX")
th                      =               input(14,                               title="ADX THRESHOLD",                                    type = input.float, minval = 0, step = 0.5,                                       group = "ADX")
len_3                   =               input(51,                               title="RSI lenght",                                                                                                                         group = "Relative Strenght Indeks")
src_3                   =               input(high,                             title="RSI Source",                                                                                                                         group = "Relative Strenght Indeks")
RSI_VWAP_length         =               input(22,                               title="Rsi vwap lenght")

//INDICATORS -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Cloud -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

CLOUD_COLOR = L_cloud ? color.lime : S_cloud ? color.red : na

// ATR -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

//RSI------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

up_3                    =                                                                                                                   rma(max(change(src_3), 0), len_3)
down_3                  =                                                                                                                   rma(-min(change(src_3), 0), len_3)
rsi_3                   =                                                                                                                   down_3 == 0 ? 100 : up_3 == 0 ? 0 : 100 - (100 / (1 + up_3 / down_3))
Ob_rsi                   =                                                       (rsi_3 >= 70)
Os_rsi                   =                                                       (rsi_3 <= 30) 
RSI_VWAP                = rsi(vwap(close), RSI_VWAP_length)
RSI_VWAP_overSold       = 13
RSI_VWAP_overBought     = 68

L_VAP                   =                                                       (crossover(RSI_VWAP, RSI_VWAP_overSold))
S_VAP                   =                                                       (crossunder(RSI_VWAP, RSI_VWAP_overBought))

//ADX-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

// Strategy logic ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var bool longCond = na, var bool shortCond = na
var int CondIni_long = 0, var int CondIni_short = 0
var bool _Final_longCondition = na, var bool _Final_shortCondition = na
var float last_open_longCondition = na, var float last_open_shortCondition = na
var int last_longCondition = na, var int last_shortCondition = na
var int last_Final_longCondition = na, var int last_Final_shortCondition = na
var int nLongs = na, var int nShorts = na
Short_condition = S_ATR and S_adx and not Os_rsi or S_VAP   and not Os_rsi and L_cloud and L_ATR and L_adx 
Short_close = L_ATR or Os_rsi or L_VAP
longCond                :=                                                      Short_close
shortCond               :=                                                      Short_condition
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

colors = (in_longCondition ? color.gray : in_shortCondition ? color.red : color.orange)
//barcolor                                                                        (color = colors)
mama_p      =   plot(mama,          title="Cloud A",                                                                                                            color=colors                                                                                                                     )
fama_p      =   plot(fama,          title="Cloud B",                                                                                                            color=colors                                                                                                                     )
fill                                    (mama_p,fama_p,                                                                                                         color=colors  )

plotshape(longCondition,            title="Long",                   style=shape.xcross,                 location=location.belowbar,                         color=color.green,           size=size.small ,                                                           transp = 0                  )
plotshape(shortCondition,           title="Short",                  style=shape.triangledown,               location=location.abovebar,                         color=color.red,            size=size.small ,                                                           transp = 0                  )

if Short_condition
    strategy.entry("S", strategy.short)
    
per(pcnt) =>
    strategy.position_size != 0 ? round(pcnt / 100 * strategy.position_avg_price / syminfo.mintick) : float(na)
stoploss=input(title=" stop loss", defval=6, minval=0.01)
los = per(stoploss)
q=input(title=" qty percent", defval=100, minval=1)

strategy.exit("SL", qty_percent = q,loss = los)

strategy.close_all(when = Short_close)


//By wielkieef
```

> Detail

https://www.fmz.com/strategy/363564

> Last Modified

2022-05-16 15:52:51
