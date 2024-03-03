
> Name

Vitalik-Scalpe

> Author

a624587332



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_open|0|  Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_32|false|  Filter|
|v_input_33|7|  Pullback Lookback|
|v_input_34|true|  Use H.A Calculations|
|v_input_2|0|(?Average Directional Index)  Adx Type: CLASSIC|MASANAKAMURA|
|v_input_3|22|  Adx Lenght|
|v_input_4|13|  Adx Treshold|
|v_input_5|false|(?Support and Resistance)Show Support and Resistance levels|
|v_input_6|7|  Left|
|v_input_7|8|  Right|
|v_input_8|1.8|(?Volume)  Volume mult.|
|v_input_9|33|  Volume lenght|
|v_input_10|true|(?SAR)Show Parabolic SAR|
|v_input_11|0.7|  Sar Start|
|v_input_12|0.2|  Sar Int|
|v_input_13|0.38|  Sar Max|
|v_input_14|15|(?Range Filter)  Period|
|v_input_15|1.6|  mult.|
|v_input_16|15|(?MACD)  Fast Length|
|v_input_17|16|  Slow Length|
|v_input_18|21|  Signal Smoothing|
|v_input_19|50|(?Relative Strenght Indeks)  RSI Lenght|
|v_input_20_hlc3|0|  RSI Source: hlc3|high|low|open|hl2|close|hlcc4|ohlc4|
|v_input_21|false|(?Bolinger Bands)Show Bollinger Bands|
|v_input_22||  Timeframe 2|
|v_input_23_high|0|  Source 2: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_24|15|(?Relative Momentum Index)  Rmi Lenght|
|v_input_25|24|  Rmi Momentum|
|v_input_26|31|  Rmi overbought|
|v_input_27|63|  Rmi overbought|
|v_input_28|6|(?Scalping)  Scalping Lenght|
|v_input_29|10|  Fast EMA lenght|
|v_input_30|120|  Medium EMA lenght|
|v_input_31|500|  Slow EMA lenght|
|v_input_35|2|(?Average True Range)  PP period|
|v_input_36|4|  ATR Factor|
|v_input_37|true|  ATR Period|
|v_input_38|0.9|(?Target Point)  % TP Long|
|v_input_39|0.9|  % TP Short|
|v_input_40|3.5|(?Stop Loss)  % Stop loss|
|v_input_41|true|(?BACKTEST)Backtest|
|v_input_42|1997|start year|
|v_input_43|6|start month|
|v_input_44|true|start day|
|v_input_45|3333|stop year|
|v_input_46|12|stop month|
|v_input_47|31|stop day|


> Source (PineScript)

``` pinescript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © wielkieef


//@version=4


strategy("Vitalik Scalper", overlay = true, pyramiding=1,initial_capital = 10000, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.03)


//SOURCE =============================================================================================================================================================================================================================================================================================================

src                 =                   input(open,                             title="  Source")

// Indicators Inputs ========================================================================================================================================================================================================================================================================================================

//ADX-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ADX_options         =                   input("CLASSIC",                        title="  Adx Type",                                          options = ["CLASSIC", "MASANAKAMURA"],                                          group="Average Directional Index")
ADX_len             =                   input(22,                               title="  Adx Lenght",                                     type=input.integer, minval = 1,                                                     group="Average Directional Index")
th                  =                   input(13,                               title="  Adx Treshold",                                   type=input.integer, minval = 0,                                                     group="Average Directional Index")

// Support and Resistance ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

SHOW_S_R            =                   input(false,                            title="Show Support and Resistance levels",                                                                                                 group="Support and Resistance")
left                =                   input(7,                                title="  Left",                                                                                                                               group="Support and Resistance")
right               =                   input(8,                                title="  Right",                                                                                                                              group="Support and Resistance")

// Volume ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

volume_f            =                   input(1.8,                              title="  Volume mult.",                                       minval = 0, step = 0.1,                                                         group="Volume")
sma_length          =                   input(33,                               title="  Volume lenght",                                      minval = 1,                                                                     group="Volume")

//SAR----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

SHOW_SAR            =                   input(true,                             title="Show Parabolic SAR",                                                                                                                  group="SAR")
Sst                 =                   input (0.7,                             title="  Sar Start",                                          step=0.01, minval = 0.01,                                                       group="SAR")
Sinc                =                   input (0.2,                             title="  Sar Int",                                            step=0.01, minval = 0.01,                                                       group="SAR")
Smax                =                   input (0.38,                            title="  Sar Max",                                            step=0.01, minval = 0.01,                                                       group="SAR")

// Range Filter ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

per_                =                   input(15,                               title="  Period",                                             minval=1,                                                                       group = "Range Filter")
mult                =                   input(1.6,                              title="  mult.",                                              minval=0.1, step = 0.1,                                                         group = "Range Filter")

//MACD----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

fast_length         =                   input(15,                               title="  Fast Length",                                        type=input.integer,                                                             group="MACD")
slow_length         =                   input(16,                               title="  Slow Length",                                        type=input.integer,                                                             group="MACD")
signal_length       =                   input(21,                               title="  Signal Smoothing",                                   type=input.integer,                                                             group="MACD")

//RSI----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

len_3               =                   input(50,                               title="  RSI Lenght",                                                                                                                         group = "Relative Strenght Indeks")
src_3               =                   input(hlc3,                             title="  RSI Source",                                                                                                                         group = "Relative Strenght Indeks")

//BOLINGER BANDS ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

SHOW_BB             =                   input(false,                            title="Show Bollinger Bands",                                                                                                               group="Bolinger Bands")
tf2                 =                   input("",                               title="  Timeframe 2",                                       type = input.resolution,                                                        group="Bolinger Bands")
src2                =                   input(high,                             title="  Source 2",                                          type = input.source,                                                            group="Bolinger Bands")

//RMI ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

RMI_len             =                   input(15,                               title="  Rmi Lenght",                                     type=input.integer, minval = 1,                                                     group="Relative Momentum Index")
mom                 =                   input(24,                               title="  Rmi Momentum",                                   type=input.integer, minval = 1,                                                     group="Relative Momentum Index")
RMI_os              =                   input(31,                               title="  Rmi overbought",                                 type=input.integer, minval = 0,                                                     group="Relative Momentum Index")
RMI_ob              =                   input(63,                               title="  Rmi overbought",                                 type=input.integer, minval = 0,                                                     group="Relative Momentum Index")

//Scalpng ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

HiLoLen             =                   input(6,                                title="  Scalping Lenght",                                    minval=2,                                                                       group="Scalping")
fastEMAlength       =                   input(10,                               title="  Fast EMA lenght",                                    minval=2,                                                                       group="Scalping")
mediumEMAlength     =                   input(120,                              title="  Medium EMA lenght",                                  minval=2,                                                                       group="Scalping")
slowEMAlength       =                   input(500,                              title="  Slow EMA lenght",                                    minval=2,                                                                       group="Scalping")
filterBW            =                   input(false,                            title="  Filter")
Lookback            =                   input(7,                                title="  Pullback Lookback")
UseHAcandles        =                   input(true,                             title="  Use H.A Calculations")

// ATR -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

prd                     =               input(2,                                title="  PP period",                                                                                                                          group="Average True Range")
Factor                  =               input(4,                                title="  ATR Factor",                                                                                                                       group="Average True Range")
Pd                      =               input(1,                                title="  ATR Period",                                                                                                                       group="Average True Range")

//TP PLOTSHAPE -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

tp_long0            =                   input(0.9,                              title="  % TP Long",                                        type = input.float,     minval = 0,     step = 0.1,                           group="Target Point") 
tp_short0           =                   input(0.9,                              title="  % TP Short",                                       type = input.float,     minval = 0,     step = 0.1,                           group="Target Point") 

// SL PLOTSHAPE ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

sl0                 =                   input(3.5,                              title="  % Stop loss",                                        type = input.float,     minval = 0,     step = 0.1,                             group="Stop Loss")

//INDICATORS =======================================================================================================================================================================================================================================================================================================

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

//SAR------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

SAR                     =                                                                                                                   sar(Sst, Sinc, Smax)
L_sar                   =                                                       (SAR < close)
S_sar                   =                                                       (SAR > close)

// Support and Resistance ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

hih                 =                                                                                                                       pivothigh(high, left, right)
lol                 =                                                                                                                       pivotlow (low , left, right)

top                 =                                                                                                                       valuewhen(hih, high[right], 0)
bot                 =                                                                                                                       valuewhen(lol, low [right], 0)

RS_Long_condt       =                                                           close > top
RS_Short_condt      =                                                           close < bot

L_cross             =                                                           crossover(close, top)
S_cross             =                                                           crossunder(close,bot)

// Volume -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Volume_condt            =                                                       volume > sma(volume,sma_length)*volume_f

// Range Filter ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var bool L_RF = na,  var bool S_RF = na

Range_filter(_src, _per_, _mult)=>
    var float _upward   =                                                                                                                   0.0
    var float _downward =                                                                                                                   0.0
    wper                =                                                                                                                   (_per_*2) - 1
    avrng               =                                                                                                                   ema(abs(_src - _src[1]), _per_)
    _smoothrng          =                                                                                                                   ema(avrng, wper)*_mult
    _filt               =                                                                                                                   _src
    _filt               :=                                                                                                                  _src > nz(_filt[1]) ? ((_src-_smoothrng) < nz(_filt[1]) ? nz(_filt[1]) : (_src-_smoothrng)) : ((_src+_smoothrng) > nz(_filt[1]) ? nz(_filt[1]) : (_src+_smoothrng))
    _upward             :=                                                                                                                  _filt > _filt[1] ? nz(_upward[1]) + 1 : _filt < _filt[1] ? 0 : nz(_upward[1])
    _downward           :=                                                                                                                  _filt < _filt[1] ? nz(_downward[1]) + 1 : _filt > _filt[1] ? 0 : nz(_downward[1])
    [_smoothrng,_filt,_upward,_downward]
[smoothrng, filt, upward, downward] = Range_filter(src, per_, mult)
hband                   =                                                                                                                   filt + smoothrng
lband                   =                                                                                                                   filt - smoothrng
L_RF                    :=                                                      high > hband and upward > 0
S_RF                    :=                                                      low < lband and downward > 0

//MACD-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

fast_ma                 =                                                                                                                   ema(src, fast_length)
slow_ma                 =                                                                                                                   ema(src, slow_length)
macd                    =                                                                                                                   fast_ma - slow_ma
signal_                 =                                                                                                                   sma(macd, signal_length)
L_macd                  =                                                       macd > signal_ 
S_macd                  =                                                       macd < signal_ 

//RSI------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

up_3                    =                                                                                                                   rma(max(change(src_3), 0), len_3)
down_3                  =                                                                                                                   rma(-min(change(src_3), 0), len_3)
rsi_3                   =                                                                                                                   down_3 == 0 ? 100 : up_3 == 0 ? 0 : 100 - (100 / (1 + up_3 / down_3))
L_rsi                   =                                                       (rsi_3 < 70)
S_rsi                   =                                                       (rsi_3 > 30) 

// BOLINGER BADNS -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

per2                                        =                                                                                                                                                           10
dev2                                        =                                                                                                                                                           1.0
ma2                                         =                                                                                                                                                           security(syminfo.tickerid, tf2, sma(src2, per2))

hb2                                         =                                                                                                                                                           ma2 + security(syminfo.tickerid, tf2, stdev(src2, per2)) * dev2
lb2                                         =                                                                                                                                                           ma2 - security(syminfo.tickerid, tf2, stdev(src2, per2)) * dev2

L_BB_2 = close > hb2
S_BB_2 = close > lb2


// RMI -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

RMI(len, m)=>
    up              =                                                                                                                       ema(max(close - close[m],0), len)
    dn              =                                                                                                                       ema(max(close[m] - close,0), len)
    RMI             =                                                                                                                       dn == 0 ? 0 : 100 - 100 / (1 + up / dn)
    RMI
L_rmi               =                                                           crossover(RMI(RMI_len, mom), RMI_os)
S_rmi               =                                                           crossunder(RMI(RMI_len, mom), RMI_ob)

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

//STRATEGY ==========================================================================================================================================================================================================================================================================================================

var bool longCond = na, var bool shortCond = na
var int CondIni_long = 0, var int CondIni_short = 0
var bool _Final_longCondition = na, var bool _Final_shortCondition = na
var float last_open_longCondition = na, var float last_open_shortCondition = na
var int last_longCondition = na, var int last_shortCondition = na
var int last_Final_longCondition = na, var int last_Final_shortCondition = na
var int nLongs = na, var int nShorts = na

L_1     =                                                                       RS_Long_condt  and L_adx and L_sar and L_RF and L_macd and L_rsi
S_1     =                                                                       RS_Short_condt and S_adx and S_sar and S_RF and S_macd and S_rsi

L_2     =                                                                       L_BB_2  and L_RF and Volume_condt and L_rsi
S_2     =                                                                       S_BB_2  and S_RF and Volume_condt and S_rsi

L_3     =                                                                       L_rmi and L_adx and L_sar  and L_rsi
S_3     =                                                                       S_rmi and S_adx and S_sar  and S_rsi

L_4     =                                                                       L_scalp and L_adx and L_RF and Volume_condt and L_rsi
S_4     =                                                                       S_scalp and S_adx and S_RF and Volume_condt and S_rsi

L_basic_condt       =         L_1 or L_2 or L_3 or L_4
S_basic_condt       =         S_1 or S_2 or S_3 or S_4

longCond                :=                                                      L_basic_condt
shortCond               :=                                                      S_basic_condt

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
L_tp                 =      iff(Final_Long_tp,                                  fixnan(Position_Price)          *           (1 + tp_long)                   ,                   na) 
S_tp                 =      iff(Final_Short_tp,                                 fixnan(Position_Price)          *           (1 - tp_short)                  ,                   na) 

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

//SL ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Risk                = sl0
Percent_Capital     = 100

sl                  =  in_longCondition  ?  min(sl0,(((Risk) * 100) / (Percent_Capital *  max(1, nLongs))))  : 
                       in_shortCondition ?  min(sl0,(((Risk) * 100) / (Percent_Capital *  max(1, nShorts)))) : sl0
                       
Normal_long_sl      =               ((in_longCondition                and low                             <= ((1 - (sl / 100))    *               (fixnan(Position_Price)))))
Normal_short_sl     =               ((in_shortCondition               and high                            >= ((1 + (sl / 100))    *               (fixnan(Position_Price)))))  
last_long_sl        :=              Normal_long_sl      ? time : nz(last_long_sl[1])
last_short_sl       :=              Normal_short_sl     ? time : nz(last_short_sl[1])
Final_Long_sl       :=              Normal_long_sl      and last_longCondition              > nz(last_long_sl[1])               and last_longCondition  > nz(last_long_tp[1])  and not Final_Long_tp
Final_Short_sl      :=              Normal_short_sl     and last_shortCondition             > nz(last_short_sl[1])              and last_shortCondition > nz(last_short_tp[1]) and not Final_Short_tp

//RE-ENTRY ON TP-HIT-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ATR_L_STOP = ssignal and in_longCondition
ATR_S_STOP = bsignal and in_shortCondition

if Final_Long_tp                    or                                          Final_Long_sl
    CondIni_long    :=                                                          -1
    sum_long        :=                                                          0.0
    nLongs          :=                                                          na
    
if Final_Short_tp                   or                                          Final_Short_sl
    CondIni_short   :=                                                          1
    sum_short       :=                                                          0.0
    nShorts         :=                                                          na
    
// Colors ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ADX_COLOR           =   L_adx ? color.lime : S_adx ? color.red :  color.orange
BAR_COLOR           =   L_cross ? #1b5e20 :S_cross ? color.maroon : L_adx  ? color.lime : S_adx ? color.red :  color.orange
barcolor                                                                        (color = BAR_COLOR)

//PLOTS==============================================================================================================================================================================================================================================================================================================

h_BB        = plot(SHOW_BB ? hb2 : na,                      title = "Upper Bollinger Band",                                                                                             color = #009688,                                linewidth = 2   )
l_BB        = plot(SHOW_BB ? lb2 : na,                      title = "Lower Bollinger Band",                                                                                             color = #f06292,                                linewidth = 2   )
fill(h_BB, l_BB,                                            title = "Bollinger Band Background",                                                                                        color = in_longCondition ? #009688 : #f06292,   transp = 95     )

plot(SHOW_SAR ? SAR : na,                                   title = "SAR",                  style=plot.style_circles,                                                                   color=ADX_COLOR                                                 ) 

plot(L_tp,                                                  title = "TP_L",                 style = plot.style_circles,                                                                 color = color.fuchsia,                          linewidth = 7   )
plot(S_tp,                                                  title = "TP_S",                 style = plot.style_circles,                                                                 color = color.fuchsia,                          linewidth = 7   )

res         = plot(SHOW_S_R ? top : na,                                                     style = plot.style_cross,        offset=-left,                                              color=top != top[1] ? na : color.green,         linewidth = 1    )
sup         = plot(SHOW_S_R ? bot : na,                                                     style = plot.style_cross,        offset=-left,                                              color=bot != bot[1] ? na : color.red,           linewidth = 1    )

//PLOTSHAPES----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

plotshape(Final_Long_tp,            title="TP Long Signal",         style = shape.flag,                     location=location.abovebar,                         color=color.red,            size=size.small ,                       textcolor=color.red,               transp = 0                  ) 
plotshape(Final_Short_tp,           title="TP Short Signal",        style = shape.flag,                     location=location.belowbar,                         color=color.green,          size=size.small ,                       textcolor=color.green,             transp = 0                  ) 

plotshape(longCondition,            title="Long",                   style=shape.triangleup,                 location=location.belowbar,                         color=color.blue,           size=size.tiny ,                                                           transp = 0                  )
plotshape(shortCondition,           title="Short",                  style=shape.triangledown,               location=location.abovebar,                         color=color.red,            size=size.tiny ,                                                           transp = 0                  )

//BACKTESTING inputs --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ACT_BT              =                   input(true,                             title="Backtest",                                           type = input.bool,                                                              group= "BACKTEST")
testStartYear       =                   input(1997,                             title="start year",                                         minval = 1997, maxval = 3000,                                                   group= "BACKTEST") 
testStartMonth      =                   input(06,                               title="start month",                                        minval = 1, maxval = 12,                                                        group= "BACKTEST")
testStartDay        =                   input(01,                               title="start day",                                          minval = 1, maxval = 31,                                                        group= "BACKTEST")
testPeriodStart     =                   timestamp(testStartYear,testStartMonth,testStartDay,0,0)
testStopYear        =                   input(3333,                             title="stop year",                                          minval=1980, maxval = 2222,                                                     group= "BACKTEST")
testStopMonth       =                   input(12,                               title="stop month",                                         minval=1, maxval=12,                                                            group= "BACKTEST")
testStopDay         =                   input(31,                               title="stop day",                                           minval=1, maxval=31,                                                            group= "BACKTEST")
testPeriodStop      =                   timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)
testPeriod          =                   time >= testPeriodStart and time <= testPeriodStop ? true : false

// Backtest  ==================================================================================================================================================================================================================================================================================================================================

if                                                                              L_basic_condt
    strategy.entry                                                              ("L", strategy.long , when = ACT_BT and testPeriod )
if                                                                              S_basic_condt
    strategy.entry                                                              ("S", strategy.short, when = ACT_BT and testPeriod )
    
    
strategy.exit("TP_L", "L", profit = (abs((last_open_longCondition  * (1 + tp_long)) - last_open_longCondition) / syminfo.mintick), limit = nLongs >= 1 ? strategy.position_avg_price * (1 + tp_long) : na, loss = (abs((last_open_longCondition*(1-(sl/100)))-last_open_longCondition)/syminfo.mintick))

strategy.exit("TP_S", "S", profit = (abs((last_open_shortCondition * (1 - tp_short)) - last_open_shortCondition) / syminfo.mintick), limit = nShorts >= 1 ? strategy.position_avg_price*(1-(tp_short)) : na, loss     = (abs((last_open_shortCondition*(1+(sl/100)))-last_open_shortCondition)/syminfo.mintick))

strategy.close_all(when = ATR_L_STOP or ATR_S_STOP)






// By wielkieef





```

> Detail

https://www.fmz.com/strategy/376261

> Last Modified

2022-08-02 23:55:53
