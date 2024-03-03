
> Name

Bitcoin-Scalper-30MIN

> Author

a624587332



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_high|0|src: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_19|false|Filter|
|v_input_20|3|Pullback Lookback|
|v_input_21|true|Use H.A Calculations|
|v_input_26|true|Activate leverage?|
|v_input_27|2|Max lev.|
|v_input_28|70|Volume lenght lev.|
|v_input_2|30|(?Relative Momentum Index)Rmi Lenght|
|v_input_3|12|Rmi Momentum|
|v_input_4|33|Rmi oversold|
|v_input_5|70|Rmi overbought|
|v_input_6|22|(?Average Directional Index)Adx Lenght|
|v_input_7|15|Adx Treshold|
|v_input_8|67|(?Relative strenght Indeks)Rsi Lenght|
|v_input_9|3|(?Support and Resistance)Left|
|v_input_10|true|Right|
|v_input_11|23|(?Cloud)Cloud Length|
|v_input_12|2.6|(?Volume)Volume mult.|
|v_input_13|21|Volume lenght|
|v_input_14|true|(?Scalping)SCALPING|
|v_input_15|4|Scalping Lenght|
|v_input_16|10|Fast EMA lenght|
|v_input_17|120|Medium EMA lenght|
|v_input_18|500|Slow EMA lenght|
|v_input_22|2|(?TP PLOTSHAPE)TP Long|
|v_input_23|2|TP Short|
|v_input_24|true|(?SL PLOTSHAPE)Stop loss?|
|v_input_25|8|% Stop loss|
|v_input_29|true|(?BACKTEST)Backtest|
|v_input_30|true|Longs|
|v_input_31|true|Shorts|
|v_input_32|100|risk|
|v_input_33|1997|start year|
|v_input_34|6|start month|
|v_input_35|true|start day|
|v_input_36|3333|stop year|
|v_input_37|12|stop month|
|v_input_38|31|stop day|
|v_input_39|0.02| TP/100|
|v_input_40|0.08| SL/100|


> Source (PineScript)

``` pinescript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © wielkieef

//@version=4



strategy("Bitcoin Scalper [30MIN]", overlay=true,  pyramiding=1,initial_capital = 10000, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.04)

//SOURCE =============================================================================================================================================================================================================================================================================================================

src                 =                   input(high)

//RMI ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

RMI_len             =                   input(30,                               title="Rmi Lenght",                                     type=input.integer, minval = 1,                                                     group="Relative Momentum Index")
mom                 =                   input(12,                               title="Rmi Momentum",                                   type=input.integer, minval = 1,                                                     group="Relative Momentum Index")
RMI_os              =                   input(33,                               title="Rmi oversold",                                   type=input.integer, minval = 0,                                                     group="Relative Momentum Index")
RMI_ob              =                   input(70,                               title="Rmi overbought",                                 type=input.integer, minval = 0,                                                     group="Relative Momentum Index")

//ADX-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ADX_len             =                   input(22,                               title="Adx Lenght",                                     type=input.integer, minval = 1,                                                     group="Average Directional Index")
th                  =                   input(15,                               title="Adx Treshold",                                   type=input.integer, minval = 0,                                                     group="Average Directional Index")

//RSI ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

RSI_len             =                   input(67,                               title="Rsi Lenght",                                     minval = 1,                                                                         group="Relative strenght Indeks")

// Support and Resistance ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

left                =                   input(3,                                title="Left",                                                                                                                               group="Support and Resistance")
right               =                   input(1,                                title="Right",                                                                                                                              group="Support and Resistance")

// Cloud --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

len                 =                   input(23,                               title="Cloud Length",                                                                                                                       group="Cloud")

// Volume ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

volume_f            =                   input(2.6,                              title="Volume mult.",                                       minval = 0, step = 0.1,                                                         group="Volume")
sma_length          =                   input(21,                               title="Volume lenght",                                      minval = 1,                                                                     group="Volume")

//Scalpng ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ACT_SCLP            =                   input(true,                             title="SCALPING",                                         type = input.bool,                                                              group="Scalping")
HiLoLen             =                   input(4,                                title="Scalping Lenght",                                    minval=2,                                                                       group="Scalping")
fastEMAlength       =                   input(10,                               title="Fast EMA lenght",                                    minval=2,                                                                       group="Scalping")
mediumEMAlength     =                   input(120,                              title="Medium EMA lenght",                                  minval=2,                                                                       group="Scalping")
slowEMAlength       =                   input(500,                              title="Slow EMA lenght",                                    minval=2,                                                                       group="Scalping")
filterBW            =                   input(false,                            title="Filter")
Lookback            =                   input(3,                                title="Pullback Lookback")
UseHAcandles        =                   input(true,                             title="Use H.A Calculations")

//TP PLOTSHAPE -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

tp_long0            =                   input(2,                                title="TP Long",                                            type = input.float,     minval = 0,     step = 0.1,                             group="TP PLOTSHAPE") 
tp_short0           =                   input(2,                                title="TP Short",                                           type = input.float,     minval = 0,     step = 0.1,                             group="TP PLOTSHAPE") 

// SL PLOTSHAPE ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Act_sl              =                   input(true,                             title="Stop loss?",                                         type = input.bool,                                                              group="SL PLOTSHAPE")
sl0                 =                   input(8,                                title="% Stop loss",                                        type = input.float,     minval = 0,     step = 0.1,                             group="SL PLOTSHAPE")

//INDICATORS =======================================================================================================================================================================================================================================================================================================

//ADX-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

calcADX(_len)=>
    up = change(high)
	down = -change(low)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
    minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange = rma(tr, _len)
	_plus = fixnan(100 * rma(plusDM, _len) / truerange)
	_minus = fixnan(100 * rma(minusDM, _len) / truerange)
	sum = _plus + _minus
	_adx = 100 * rma(abs(_plus - _minus) / (sum == 0 ? 1 : sum), _len)
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
    
[DIPlus,DIMinus,ADX]                    =                                                                                                   calcADX(ADX_len)
[DIPlusM,DIMinusM,ADXM]                 =                                                                                                   calcADX_Masanakamura(ADX_len)
L_adx_m                                 =                                       DIPlusM > DIMinusM and ADXM > th
S_adx_m                                 =                                       DIPlusM < DIMinusM and ADXM> th
L_adx                                   =                                       (DIPlus < DIMinus and ADX > th)
S_adx                                   =                                       (DIPlus < DIMinus and ADX < th)

//RSI ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

RSI_os              =                                                                                                                       48
RSI(len)=>
    up_rsi          =                                                                                                                       rma(max(change(close), 0), len)
    down_rsi        =                                                                                                                       rma(-min(change(close), 0), len)
    rsi             =                                                                                                                       down_rsi == 0 ? 100 : up_rsi == 0 ? 0 : 100 - (100 / (1 + up_rsi / down_rsi))
    rsi
L_rsi               =                                                           (RSI(RSI_len) < RSI_os)
S_rsi               =                                                           (RSI(RSI_len) > RSI_os)

// RMI -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

RMI(len, m)=>
    up              =                                                                                                                       ema(max(close - close[m],0), len)
    dn              =                                                                                                                       ema(max(close[m] - close,0), len)
    RMI             =                                                                                                                       dn == 0 ? 0 : 100 - 100 / (1 + up / dn)
    RMI
L_rmi               =                                                           crossover(RMI(RMI_len, mom), RMI_os)
S_rmi               =                                                           crossunder(RMI(RMI_len, mom), RMI_ob)

//TREND STRENGHT-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//TREND STRENGHT---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

n1                      =                                                                                                                   10
n2                      =                                                                                                                   21
ap                      =                                                                                                                   hlc3 
esa                     =                                                                                                                   ema(ap, n1)
d                       =                                                                                                                   ema(abs(ap - esa), n1)
ci                      =                                                                                                                   (ap - esa) / (0.015 * d)
tci                     =                                                                                                                   ema(ci, n2)
wt1                     =                                                                                                                   tci
wt2                     =                                                                                                                   sma(wt1,4)
mfi_upper               =                                                                                                                   sum(volume * (change(hlc3) <= 0 ? 0 : hlc3), 58)
mfi_lower               =                                                                                                                   sum(volume * (change(hlc3) >= 0 ? 0 : hlc3), 58)
_mfi_rsi(mfi_upper, mfi_lower) =>
    if mfi_lower == 0
        100
    if mfi_upper == 0
        0
	100.0 - (100.0 / (1.0 + mfi_upper / mfi_lower))
mf                      =                                                                                                                   _mfi_rsi(mfi_upper, mfi_lower)
mfi                     =                                                                                                                   (mf - 50) * 3
L_mfi                   =                                                       mfi > 2
S_mfi                   =                                                       mfi < -2

// Support and Resistance ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

hih                 =                                                                                                                       pivothigh(high, left, right)
lol                 =                                                                                                                       pivotlow (low , left, right)

top                 =                                                                                                                       valuewhen(hih, high[right], 0)
bot                 =                                                                                                                       valuewhen(lol, low [right], 0)

RS_Long_condt       =                                                           close > top
RS_Short_condt      =                                                           close < bot

L_cross             =                                                           crossover(close, top)
S_cross             =                                                           crossunder(close,bot)

//Cloud --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

// Volume -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Volume_condt            =                                                       volume > sma(volume,sma_length)*volume_f

//Scalpng ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

haClose             =                   UseHAcandles                        ?                                                               security(heikinashi(syminfo.tickerid), timeframe.period, close) : close
haOpen              =                   UseHAcandles                        ?                                                               security(heikinashi(syminfo.tickerid), timeframe.period, open) : open
haHigh              =                   UseHAcandles                        ?                                                               security(heikinashi(syminfo.tickerid), timeframe.period, high) : high
haLow               =                   UseHAcandles                        ?                                                               security(heikinashi(syminfo.tickerid), timeframe.period, low) : low
isRegularFractal(mode) =>
    ret = mode == 1 ? high[4] < high[3] and high[3] < high[2] and high[2] > high[1] and 
       high[1] > high[0] : mode == -1 ? 
       low[4] > low[3] and low[3] > low[2] and low[2] < low[1] and low[1] < low[0] : 
       false
    ret
isBWFractal(mode) =>
    ret = mode == 1 ? high[4] < high[2] and high[3] <= high[2] and high[2] >= high[1] and 
       high[2] > high[0] : mode == -1 ? 
       low[4] > low[2] and low[3] >= low[2] and low[2] <= low[1] and low[2] < low[0] : 
       false
    ret
fastEMA             =                                                                                                                       ema(haClose, fastEMAlength)
mediumEMA           =                                                                                                                       ema(haClose, mediumEMAlength)
slowEMA             =                                                                                                                       ema(haClose, slowEMAlength)
pacC                =                                                                                                                       ema(haClose, HiLoLen)
pacL                =                                                                                                                       ema(haLow, HiLoLen)
pacU                =                                                                                                                       ema(haHigh, HiLoLen)
TrendDirection      = fastEMA > mediumEMA and pacL > mediumEMA ? 1 : 
   fastEMA < mediumEMA and pacU < mediumEMA ? -1 : 0
filteredtopf        =                                                                                                                       filterBW ? isRegularFractal(1) : isBWFractal(1)
filteredbotf        =                                                                                                                       filterBW ? isRegularFractal(-1) : isBWFractal(-1)
valuewhen_H0        =                                                                                                                       valuewhen(filteredtopf == true, high[2], 0)
valuewhen_H1        =                                                                                                                       valuewhen(filteredtopf == true, high[2], 1)
valuewhen_H2        =                                                                                                                       valuewhen(filteredtopf == true, high[2], 2)
higherhigh          =                                                                                                                       filteredtopf == false ? false : 
   valuewhen_H1 < valuewhen_H0 and valuewhen_H2 < valuewhen_H0
lowerhigh = filteredtopf == false ? false : 
   valuewhen_H1 > valuewhen_H0 and valuewhen_H2 > valuewhen_H0
valuewhen_L0        =                                                                                                                       valuewhen(filteredbotf == true, low[2], 0)
valuewhen_L1        =                                                                                                                       valuewhen(filteredbotf == true, low[2], 1)
valuewhen_L2        =                                                                                                                       valuewhen(filteredbotf == true, low[2], 2)
higherlow = filteredbotf == false ? false : 
   valuewhen_L1 < valuewhen_L0 and valuewhen_L2 < valuewhen_L0
lowerlow = filteredbotf == false ? false : 
   valuewhen_L1 > valuewhen_L0 and valuewhen_L2 > valuewhen_L0
TradeDirection = 0
TradeDirection := nz(TradeDirection[1])
pacExitU = haOpen < pacU and haClose > pacU and barssince(haClose<pacC)<=Lookback
pacExitL = haOpen > pacL and haClose < pacL and barssince(haClose>pacC)<=Lookback
Buy      = TrendDirection == 1        and pacExitU
Sell     = TrendDirection == -1       and pacExitL
TradeDirection := TradeDirection == 1 and haClose<pacC ? 0 : 
   TradeDirection == -1               and haClose>pacC ? 0 : 
   TradeDirection == 0                and Buy ? 1 : 
   TradeDirection == 0                and Sell ? -1 : TradeDirection
L_scalp             =                                                           nz(TradeDirection[1]) == 0 and TradeDirection == 1
S_scalp             =                                                           nz(TradeDirection[1]) == 0 and TradeDirection == -1

//CONDITIONS =======================================================================================================================================================================================================================================================================================================

L_scalp_condt           =                                                       L_scalp and ACT_SCLP
S_scalp_condt           =                                                       S_scalp and ACT_SCLP

//STRATEGY ==========================================================================================================================================================================================================================================================================================================

//L/S variables----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var bool longCond                   = na,                                                                                                   var bool shortCond                          = na
var int CondIni_long                = 0,                                                                                                    var int CondIni_short                       = 0
var bool _Final_longCondition       = na,                                                                                                   var bool _Final_shortCondition              = na
var float last_open_longCondition   = na,                                                                                                   var float last_open_shortCondition          = na
var int last_longCondition          = na,                                                                                                   var int last_shortCondition                 = na
var int last_Final_longCondition    = na,                                                                                                   var int last_Final_shortCondition           = na
var int nLongs                      = na,                                                                                                   var int nShorts                             = na

L_ =            L_adx and L_rsi and L_rmi or L_mfi and L_adx_m and  RS_Long_condt and L_cloud and Volume_condt or L_scalp_condt and L_adx
S_ =            S_adx and S_rsi and S_rmi or S_mfi and S_adx_m and RS_Short_condt and S_cloud and Volume_condt or S_scalp_condt and S_adx

longCond                :=                                                      L_
shortCond               :=                                                      S_

CondIni_long                := longCond[1]              ? 1 :                   shortCond[1] ? -1 :                             nz(CondIni_long[1]                                          )
CondIni_short               := longCond[1]              ? 1 :                   shortCond[1] ? -1 :                             nz(CondIni_short[1]                                         )

longCondition               = (longCond[1]              and                                                                     nz(CondIni_long[1])                 == -1                   )
shortCondition              = (shortCond[1]             and                                                                     nz(CondIni_short[1])                ==  1                   )

//POSITION PRICE-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

//TP---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var bool long_tp = na, var bool short_tp = na
var int last_long_tp = na, var int last_short_tp = na
var bool Final_Long_tp = na, var bool Final_Short_tp = na
var bool Final_Long_sl0 = na, var bool Final_Short_sl0 = na
var bool Final_Long_sl = na, var bool Final_Short_sl = na
var int last_long_sl = na, var int last_short_sl = na

tp_long             =       ((nLongs  > 1)              ?                       tp_long0  / nLongs              :           tp_long0)                       / 100
tp_short            =       ((nShorts > 1)              ?                       tp_short0 / nShorts             :           tp_short0)                      / 100
long_tp             := high                             >                       (fixnan(Position_Price)         *           (1 + tp_long))                  and                 in_longCondition
short_tp            := low                              <                       (fixnan(Position_Price)         *           (1 - tp_short))                 and                 in_shortCondition
last_long_tp        :=      long_tp                     ?                       time : nz(last_long_tp[1])
last_short_tp       :=      short_tp                    ?                       time : nz(last_short_tp[1])
Final_Long_tp       :=      (long_tp                    and                     last_longCondition              >           nz(last_long_tp[1])             and                 last_longCondition  > nz(last_long_sl[1]))
Final_Short_tp      :=      (short_tp                   and                     last_shortCondition             >           nz(last_short_tp[1])            and                 last_shortCondition > nz(last_short_sl[1]))

//TP SIGNALS--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

tplLevel            = (in_longCondition                 and 
                      (last_longCondition               >                       nz(last_long_tp[1]))            and 
                      (last_longCondition               >                       nz(last_long_sl[1]))            and not Final_Long_sl[1])                   ? 
                      (nLongs > 1)                      ? 
                      (fixnan(Position_Price)           *                       (1 + tp_long))                  :               (last_open_longCondition    *              (1 + tp_long)) : na
tpsLevel            = (in_shortCondition                and 
                      (last_shortCondition              >                       nz(last_short_tp[1]))           and 
                      (last_shortCondition              >                       nz(last_short_sl[1]))           and not Final_Short_sl[1])                  ? 
                      (nShorts > 1)                     ? 
                      (fixnan(Position_Price)           *                       (1 - tp_short))                 :               (last_open_shortCondition   *             (1 - tp_short)) : na
                      
ltp                 = iff(Final_Long_tp,  fixnan(Position_Price) * (1 + tp_long), na) 
stp                 = iff(Final_Short_tp, fixnan(Position_Price) * (1 - tp_short), na) 

plot(ltp,                 title = "TP Long Crosses",        style = plot.style_circles,                                   color = color.fuchsia,            linewidth = 7)
plot(stp,                 title = "TP Short Crosses",       style = plot.style_circles,                                   color = color.fuchsia,            linewidth = 7)

//SL ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Risk                =8
Percent_Capital     =99

sl                  =  in_longCondition  ?  min(sl0,(((Risk) * 100) / (Percent_Capital *  max(1, nLongs))))  : 
                       in_shortCondition ?  min(sl0,(((Risk) * 100) / (Percent_Capital *  max(1, nShorts)))) : sl0

Normal_long_sl      =               ((Act_sl            and in_longCondition                and low                             <= ((1 - (sl / 100))    *               (fixnan(Position_Price)))))
Normal_short_sl     =               ((Act_sl            and in_shortCondition               and high                            >= ((1 + (sl / 100))    *               (fixnan(Position_Price)))))  
last_long_sl        :=              Normal_long_sl      ? time : nz(last_long_sl[1])
last_short_sl       :=              Normal_short_sl     ? time : nz(last_short_sl[1])
Final_Long_sl       :=              Normal_long_sl      and last_longCondition              > nz(last_long_sl[1])               and last_longCondition  > nz(last_long_tp[1])  and not Final_Long_tp
Final_Short_sl      :=              Normal_short_sl     and last_shortCondition             > nz(last_short_sl[1])              and last_shortCondition > nz(last_short_tp[1]) and not Final_Short_tp

//RE-ENTRY ON TP-HIT-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

if Final_Long_tp                    or                                          Final_Long_sl
    CondIni_long    :=                                                          -1
    sum_long        :=                                                          0.0
    nLongs          :=                                                          na
    
if Final_Short_tp                   or                                          Final_Short_sl
    CondIni_short   :=                                                          1
    sum_short       :=                                                          0.0
    nShorts         :=                                                          na
    
// Leverage ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var float   last_leverage_L  = na,   var float   last_leverage_S = na

Act_Lev                 =           input(true,                                 title="Activate leverage?"                                                                                                                  )
Max_Lev                 =           input(2,                                    title="Max lev.",                                                               type    = input.integer,   minval = 1,     maxval = 2       )
sma_length_lev          =           input(70,                                   title="Volume lenght lev.",                                                     minval  = 1                                                 )      

Long      = (longCond and not in_longCondition) or (longCond and Final_Long_tp) or (longCond and Final_Long_sl) or (longCond and not longCondition and (last_long_tp >= nz(last_longCondition))) or (longCond and not longCondition and (last_long_sl >= nz(last_longCondition)))
Short     = (shortCond and not in_shortCondition) or (shortCond and Final_Short_tp) or (shortCond and Final_Short_sl) or (shortCond and not shortCondition and (last_short_tp >= nz(last_shortCondition))) or (shortCond and not shortCondition and (last_short_sl >= nz(last_shortCondition)))

Lev_vol                 =                               Act_Lev  ?              min(Max_Lev,max(1, round(volume/sma(volume,sma_length_lev)))) : 1
rsiLen                  =                                                       14

last_leverage_L     :=                                  Long        ?       Lev_vol             :                           nz(last_leverage_L[1]       )
last_leverage_S     :=                                  Short       ?       Lev_vol             :                           nz(last_leverage_S[1]       )

vol_x1                  =   Lev_vol[1]  ==  1                                                                             
vol_x2                  =   Lev_vol[1]  ==  2                                                                             

Long_x1     = longCondition     and     vol_x1 
Short_x1    = shortCondition    and     vol_x1 

Long_x2     = longCondition     and     vol_x2  
Short_x2    = shortCondition    and     vol_x2  


// Colors ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ADX_COLOR           =   L_mfi ? color.lime : S_mfi ? color.red :  color.orange
BAR_COLOR           =   L_cross ? #1b5e20 : L_mfi  ? color.lime :  S_cross ? color.maroon : S_mfi ? color.red :  color.orange
barcolor                                                                        (color = BAR_COLOR)

//PLOTS==============================================================================================================================================================================================================================================================================================================

mama_p      =   plot(mama,          title="Cloud A",                                                                                                            color=ADX_COLOR                                                                                                                     )
fama_p      =   plot(fama,          title="Cloud B",                                                                                                            color=ADX_COLOR                                                                                                                     )
fill                                    (mama_p,fama_p,                                                                                                         color=ADX_COLOR  )

res         = plot(top,             style = plot.style_cross,        offset=-left,                                                                              color=top != top[1] ? na : color.green,         linewidth = 1    )
sup         = plot(bot,             style = plot.style_cross,        offset=-left,                                                                              color=bot != bot[1] ? na : color.red,           linewidth = 1    )

//PLOTSHAPES----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

plotshape(Final_Long_tp,            title="TP Long Signal",         style = shape.flag,                     location=location.abovebar,                         color=color.red,            size=size.small ,       text="TP",          textcolor=color.red,             transp = 0                  ) 
plotshape(Final_Short_tp,           title="TP Short Signal",        style = shape.flag,                     location=location.belowbar,                         color=color.green,          size=size.small ,       text="TP",          textcolor=color.green,           transp = 0                  ) 

plotshape(Long_x1,                  title = "L x1",                 style=shape.triangleup,                 location=location.belowbar,                         color = color.blue,         size=size.tiny ,        text="x1",          textcolor=color.blue,           transp = 0)
plotshape(Short_x1,                 title = "S x1",                 style=shape.triangledown,               location=location.abovebar,                         color = color.red,          size=size.tiny ,        text="x1",          textcolor=color.red,            transp = 0)

plotshape(Long_x2,                  title = "L x2",                 style=shape.triangleup,                 location=location.belowbar,                         color = color.blue,         size=size.tiny ,        text="x2",          textcolor=color.blue,           transp = 0)
plotshape(Short_x2,                 title = "S x2",                 style=shape.triangledown,               location=location.abovebar,                         color = color.red,          size=size.tiny,         text="x2",          textcolor=color.red,            transp = 0)

//BACKTESTING inputs --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ACT_BT              =                   input(true,                             title="Backtest",                                           type = input.bool,                                                              group= "BACKTEST")
long_               =                   input(true,                             title="Longs",                                                                                                                              group= "BACKTEST")
short_              =                   input(true,                             title="Shorts",                                                                                                                             group= "BACKTEST")
risk                =                   input(100,                                                                                                                                                                          group= "BACKTEST")
testStartYear       =                   input(1997,                             title="start year",                                         minval = 1997, maxval = 3000,                                                   group= "BACKTEST") 
testStartMonth      =                   input(06,                               title="start month",                                        minval = 1, maxval = 12,                                                        group= "BACKTEST")
testStartDay        =                   input(01,                               title="start day",                                          minval = 1, maxval = 31,                                                        group= "BACKTEST")
testPeriodStart     =                   timestamp(testStartYear,testStartMonth,testStartDay,0,0)
testStopYear        =                   input(3333,                             title="stop year",                                          minval=1980, maxval = 2222,                                                     group= "BACKTEST")
testStopMonth       =                   input(12,                               title="stop month",                                         minval=1, maxval=12,                                                            group= "BACKTEST")
testStopDay         =                   input(31,                               title="stop day",                                           minval=1, maxval=31,                                                            group= "BACKTEST")
testPeriodStop      =                   timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)
testPeriod          =                   time >= testPeriodStart and time <= testPeriodStop ? true : false

// Backtest tp & sl ================================================================================================================================================================================================================================================================================================================================

g(v, p)                                                                         =>                                                                                      round(v * (pow(10, p))) / pow(10, p)

tp_=                                    input(0.02,                            title=" TP/100",                                            step=0.001,                                                                      group= "BACKTEST")
sl_=                                    input(0.08,                            title=" SL/100",                                            step=0.001,                                                                     group= "BACKTEST")

// Backtest Long ==================================================================================================================================================================================================================================================================================================================================

if long_                  and          ACT_BT 


    strategy.entry("L"                          ,1,                                                             when = L_   and testPeriod , qty = Lev_vol              )
    strategy.exit("S_tp/sl", "L", profit=close * tp_ / syminfo.mintick, loss=close * sl_ / syminfo.mintick)
    
// Backtest Short ==================================================================================================================================================================================================================================================================================================================================
   
if short_                   and        ACT_BT 


    strategy.entry("S"                          ,0,                                                             when = S_   and testPeriod  , qty = Lev_vol         )
    strategy.exit("S_tp/sl", "S", profit=close * tp_ / syminfo.mintick, loss=close * sl_ / syminfo.mintick)




//By Wielkieef
```

> Detail

https://www.fmz.com/strategy/376263

> Last Modified

2022-08-02 23:58:55
