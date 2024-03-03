
> Name

Goblin-Town-60min-可用版

> Author

ChaoZhang



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_open|0|src: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|0|Longs / Shorts: Both|Longs|Shorts|
|v_input_27|15|length_|
|v_input_28|4|gamma|
|v_input_29|false|Zero-Lag|
|v_input_30|8|Rsi vwap lenght|
|v_input_31|14|  1-SMA Lenght|
|v_input_32|28|  2-SMA Lenght|
|v_input_33|55|  3-SMA Lenght|
|v_input_45|10|per2|
|v_input_46|3.5|dev2|
|v_input_47|21|per3|
|v_input_48|5|dev3|
|v_input_50|1.7|TP-2 [%]|
|v_input_51|7|SL [%]|
|v_input_52|true|Activate leverage?|
|v_input_53|3|Max lev.|
|v_input_54|50|Volume lenght lev.|
|v_input_3|false|(?ADX)  SHOW ADX Bars |
|v_input_4|0|  ADX Option: CLASSIC|MASANAKAMURA|
|v_input_5|22|  ADX Lenght|
|v_input_6|18|  ADX Treshold|
|v_input_7|false|(?Range Filter)  Show Range Filter|
|v_input_8|30|  Sampling Period|
|v_input_9|1.3|  Range Mult.|
|v_input_10|false|(?Volume BASIC)  SHOW Volume Bars |
|v_input_11|1.4|  Volume mult.|
|v_input_12|20|  Volume lenght|
|v_input_13|1.8|(?Volume BREAKOUTS)  Volume mult. Breakouts|
|v_input_14|25|  Volume lenght Breakouts|
|v_input_15|12|(?MACD)  Fast Length|
|v_input_16|19|  Slow Length|
|v_input_17|20|  Signal Smoothing|
|v_input_18|true|(?SAR)  Show Parabolic SAR|
|v_input_19|0.1|  Sar Start|
|v_input_20|0.1|  Sar Int|
|v_input_21|0.1|  Sar Max|
|v_input_22|40|(?Relative Strenght Indeks)  RSI Lenght|
|v_input_23_high|0|  RSI Source: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_24|false|(?Support and Resistance)  Show Support and Resistance levels|
|v_input_25|5|  Left|
|v_input_26|5|  Right|
|v_input_34|10|(?Relative Momentum Index)Rmi Lenght|
|v_input_35|14|Rmi Momentum|
|v_input_36|28|Rmi oversold|
|v_input_37|70|Rmi overbought|
|v_input_38|20|(?Bolinger Bands)  Bollinger Bands Length|
|v_input_39_high|0|  Bollinger Bands Source: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_40||  Timeframe 3|
|v_input_41_open|0|  Source 3: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_42|false|  Show Bollinger Bands|
|v_input_43||  Timeframe 2|
|v_input_44_open|0|  Source 2: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_49|0.9|(?Backtesting)TP-1 [%]|
|v_input_55|true|(?BACKTEST)Backtest|
|v_input_56|1997|start year|
|v_input_57|6|start month|
|v_input_58|true|start day|
|v_input_59|3333|stop year|
|v_input_60|12|stop month|
|v_input_61|31|stop day|


> Source (PineScript)

``` pinescript

strategy("Goblin Town [60min]", overlay = true, pyramiding=100,initial_capital = 10000, default_qty_type= strategy.percent_of_equity, default_qty_value = 50, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.03)

//SOURCE =============================================================================================================================================================================================================================================================================================================

src                 =                   input(open)

// POSITION ==========================================================================================================================================================================================================================================================================================================

Position            =                   input("Both",                           title= "Longs / Shorts",                                    options = ["Both","Longs","Shorts"])

is_Long             =                   Position                                                    == "SHORT" ? na : true
is_Short            =                   Position                                                    == "LONG" ? na : true

// Indicators Inputs ========================================================================================================================================================================================================================================================================================================


//ADX --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Candles_ADX         =                   input(false,                            title="  SHOW ADX Bars ",                                                                                                                  group = "ADX")
ADX_options         =                   input("CLASSIC",                   title="  ADX Option",                                       options = ["CLASSIC", "MASANAKAMURA"],                                          group = "ADX")
ADX_len             =                   input(22,                               title="  ADX Lenght",                                       type = input.integer, minval = 1,                                               group = "ADX")
th                  =                   input(18,                             title="  ADX Treshold",                                    type = input.float, minval = 0, step = 0.5,                                     group = "ADX")

// Range Filter ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

SHOW_RF             =                   input(false,                            title="  Show Range Filter",                                                                                                                  group="Range Filter")
per_                =                   input(30,                               title="  Sampling Period",                                  minval=1,                                                                       group = "Range Filter")
mult                =                   input(1.3,                              title="  Range Mult.",                                   minval=0.1, step = 0.1,                                                         group = "Range Filter")

// Volume ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Volume_candles      =                   input(false,                            title="  SHOW Volume Bars ",                                                                                                                  group="Volume (BASIC)")

volume_f            =                   input(1.4,                              title="  Volume mult.",                                       minval = 0, step = 0.1,                                                         group="Volume (BASIC)")
sma_length          =                   input(20,                               title="  Volume lenght",                                      minval = 1,                                                                     group="Volume (BASIC)")

volume_f_B          =                   input(1.8,                              title="  Volume mult. Breakouts",                                       minval = 0, step = 0.1,                                                         group="Volume (BREAKOUTS)")
sma_length_B        =                   input(25,                               title="  Volume lenght Breakouts",                                      minval = 1,                                                                     group="Volume (BREAKOUTS)")

//MACD----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

fast_length         =                   input(12,                                title="  Fast Length",                                        type=input.integer,                                                             group="MACD")
slow_length         =                   input(19,                               title="  Slow Length",                                        type=input.integer,                                                             group="MACD")
signal_length       =                   input(20,                               title="  Signal Smoothing",                                   type=input.integer,                                                             group="MACD")

//SAR----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

SHOW_SAR            =                   input(true,                             title="  Show Parabolic SAR",                                                                                                                  group="SAR")
Sst                 =                   input (0.1,                             title="  Sar Start",                                          step=0.01, minval = 0.01,                                                       group="SAR")
Sinc                =                   input (0.1,                             title="  Sar Int",                                            step=0.01, minval = 0.01,                                                       group="SAR")
Smax                =                   input (0.1,                             title="  Sar Max",                                            step=0.01, minval = 0.01,                                                       group="SAR")

//RSI----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

len_3               =                   input(40,                               title="  RSI Lenght",                                                                                                                         group = "Relative Strenght Indeks")
src_3               =                   input(high,                             title="  RSI Source",                                                                                                                         group = "Relative Strenght Indeks")

// General Conditions Inputs ========================================================================================================================================================================================================================================================================================================

// Support and Resistance ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

SHOW_S_R            =                   input(false,                            title="  Show Support and Resistance levels",                                                                                                 group="Support and Resistance")
left                =                   input(5,                                title="  Left",                                                                                                                               group="Support and Resistance")
right               =                   input(5,                                title="  Right",                                                                                                                              group="Support and Resistance")

// Indicators Calculations ========================================================================================================================================================================================================================================================================================================

//ADX-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

calcADX(_len) =>
    up              =                                                                                                                       ta.change(high)
	down            =                                                                                                                      -ta.change(low)
	plusDM          =                                                                                                                       na(up)   ? na : (up > down and up > 0   ? up   : 0)
    minusDM         =                                                                                                                       na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange       =                                                                                                                       ta.rma(ta.tr, _len)
	_plus           =                                                                                                                       fixnan(100 * ta.rma(plusDM, _len)  / truerange)
	_minus          =                                                                                                                       fixnan(100 * ta.rma(minusDM, _len) / truerange)
	sum             =                                                                                                                       _plus + _minus
	_adx            =                                                                                                                       100 * ta.rma(math.abs(_plus - _minus) / (sum == 0 ? 1 : sum), _len)
    [_plus,_minus,_adx]
calcADX_Masanakamura(_len) =>
    SmoothedTrueRange                   =                                                                                                   0.0
    SmoothedDirectionalMovementPlus     =                                                                                                   0.0
    SmoothedDirectionalMovementMinus    =                                                                                                   0.0
    TrueRange                           =                                                                                                   math.max(math.max(high - low, math.abs(high - nz(close[1]))), math.abs(low - nz(close[1])))
    DirectionalMovementPlus             =                                                                                                   high - nz(high[1]) > nz(low[1]) - low ? math.max(high - nz(high[1]), 0) : 0
    DirectionalMovementMinus            =                                                                                                   nz(low[1]) - low > high - nz(high[1]) ? math.max(nz(low[1]) - low, 0)   : 0
    SmoothedTrueRange                   :=                                                                                                  nz(SmoothedTrueRange[1]) - (nz(SmoothedTrueRange[1]) /_len) + TrueRange
    SmoothedDirectionalMovementPlus     :=                                                                                                  nz(SmoothedDirectionalMovementPlus[1])  - (nz(SmoothedDirectionalMovementPlus[1])  / _len) + DirectionalMovementPlus
    SmoothedDirectionalMovementMinus    :=                                                                                                  nz(SmoothedDirectionalMovementMinus[1]) - (nz(SmoothedDirectionalMovementMinus[1]) / _len) + DirectionalMovementMinus
    DIP                                 =                                                                                                   SmoothedDirectionalMovementPlus  / SmoothedTrueRange * 100
    DIM                                 =                                                                                                   SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100
    DX                                  =                                                                                                   math.abs(DIP-DIM) / (DIP+DIM)*100
    adx                                 =                                                                                                   ta.sma(DX, _len)
    [DIP,DIM,adx]
[DIPlusC,DIMinusC,ADXC] =                                                                                                                   calcADX(ADX_len) 
[DIPlusM,DIMinusM,ADXM] =                                                                                                                   calcADX_Masanakamura(ADX_len)

DIPlus                  =                                                                                                                   ADX_options == "CLASSIC" ? DIPlusC    : DIPlusM
DIMinus                 =                                                                                                                   ADX_options == "CLASSIC" ? DIMinusC   : DIMinusM
ADX                     =                                                                                                                   ADX_options == "CLASSIC" ? ADXC       : ADXM
L_adx                   =                                                       DIPlus > DIMinus and ADX > th
S_adx                   =                                                       DIPlus < DIMinus and ADX > th

// Range Filter ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var bool L_RF = na,  var bool S_RF = na

Range_filter(_src, _per_, _mult)=>
    var float _upward   =                                                                                                                   0.0
    var float _downward =                                                                                                                   0.0
    wper                =                                                                                                                   (_per_*2) - 1
    avrng               =                                                                                                                   ta.ema(math.abs(_src - _src[1]), _per_)
    _smoothrng          =                                                                                                                   ta.ema(avrng, wper)*_mult
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

// Volume -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Volume_condt            =                                                       volume > ta.sma(volume,sma_length)*volume_f
Volume_Breakouts_condt  =                                                       volume > ta.sma(volume,sma_length_B)*volume_f_B

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

fast_ma                 =                                                                                                                               ta.ema(src, fast_length)
slow_ma                 =                                                                                                                               ta.ema(src, slow_length)
macd                    =                                                                                                                               fast_ma - slow_ma
signal_                 =                                                                                                                               ta.sma(macd, signal_length)
L_macd                  =                                                       macd > signal_ 
S_macd                  =                                                       macd < signal_ 

//SAR------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

SAR                     =                                                                                                                   ta.sar(Sst, Sinc, Smax)
L_sar                   =                                                       (SAR < close)
S_sar                   =                                                       (SAR > close)

//RSI------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

up_3                    =                                                                                                                   ta.rma(math.max(ta.change(src_3), 0), len_3)
down_3                  =                                                                                                                   ta.rma(-math.min(ta.change(src_3), 0), len_3)
rsi_3                   =                                                                                                                   down_3 == 0 ? 100 : up_3 == 0 ? 0 : 100 - (100 / (1 + up_3 / down_3))
L_rsi                   =                                                       (rsi_3 < 70)
S_rsi                   =                                                       (rsi_3 > 30) 

// Support and Resistance ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

hih                 =                                                                                                                       ta.pivothigh(high, left, right)
lol                 =                                                                                                                       ta.pivotlow (low , left, right)

top                 =                                                                                                                       ta.valuewhen(hih, high[right], 0)
bot                 =                                                                                                                       ta.valuewhen(lol, low [right], 0)

RS_Long_condt       =                                                           close > top
RS_Short_condt      =                                                           close < bot

L_cross             =                                                           ta.crossover(close, top)
S_cross             =                                                           ta.crossunder(close,bot)


length_ = input(15),gamma = input(4.),zl = input(false,title="Zero-Lag")
//----
ma = 0.
mad = 0.
ma4h = 0.
mad4h = 0.

//----
src_ = zl ? close + change(close,length_/2) : close
ma := nz(mad[1],src_)
d = ta.cum(math.abs(src[length_] - ma))/ bar_index * gamma
mad := ta.sma(ta.sma(src_ > nz(mad[1],src_) + d ? src_ + d : src_ < nz(mad[1],src_) - d ? src_ - d : nz(mad[1],src_),length_),length_)
//--- 4h version

src4h = request.security(syminfo.tickerid, "1440", zl ? close[1] + change(close[1],length_/2) : close[1], lookahead=barmerge.lookahead_on)
ma4h := nz(mad4h[1],src4h)
d4h = ta.cum(math.abs(src4h[length_] - ma4h))/ bar_index * gamma
mad4h := ta.sma(ta.sma(src4h > nz(mad4h[1],src4h) + d4h ? src4h + d4h : src4h < nz(mad4h[1],src4h) - d4h ? src4h - d4h : nz(mad4h[1],src4h),length_),length_)

mad_f = mad/mad[1] > .999 and mad/mad[1] < 1.001
mad_flat = mad4h/mad4h[1] > .999 and mad4h/mad4h[1] < 1.001

// plot
plot(mad4h, color=color.purple, linewidth=2, transp=0)

RSI_VWAP_length     =                   input(8,                                title="Rsi vwap lenght")
RSI_VWAP                = ta.rsi(ta.vwap(close), RSI_VWAP_length)
RSI_VWAP_overSold       = 13
RSI_VWAP_overBought     = 68

L_VAP                   =                                                       (ta.crossover(RSI_VWAP, RSI_VWAP_overSold)) and close < mad
S_VAP                   =                                                       (ta.crossunder(RSI_VWAP, RSI_VWAP_overBought)) and close > mad


Length1 = input(14,  title="  1-SMA Lenght", minval=1)
Length2 = input(28, title="  2-SMA Lenght", minval=1)
Length3 = input(55, title="  3-SMA Lenght", minval=1)
xPrice = close
SMA1 = ta.sma(xPrice, Length1)
SMA2 = ta.sma(xPrice, Length2)
SMA3 = ta.sma(xPrice, Length3)

Long_MA =  (SMA1 < close and  SMA2 < close and  SMA3  < close )
Short_MA = (SMA1 > close and  SMA2 > close and  SMA3  > close )

//RMI ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

RMI_len             =                   input(10,                               title="Rmi Lenght",                                     type=input.integer, minval = 1,                                                     group="Relative Momentum Index")
mom                 =                   input(14,                               title="Rmi Momentum",                                   type=input.integer, minval = 1,                                                     group="Relative Momentum Index")
RMI_os              =                   input(28,                               title="Rmi oversold",                                   type=input.integer, minval = 0,                                                     group="Relative Momentum Index")
RMI_ob              =                   input(70,                               title="Rmi overbought",                                 type=input.integer, minval = 0,                                                     group="Relative Momentum Index")

// RMI -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

RMI(len, m)=>
    up              =                                                                                                                       ta.ema(math.max(close - close[m],0), len)
    dn              =                                                                                                                       ta.ema(math.max(close[m] - close,0), len)
    RMI             =                                                                                                                       dn == 0 ? 0 : 100 - 100 / (1 + up / dn)
    RMI
L_rmi               =                                                           ta.crossover(RMI(RMI_len, mom), RMI_os)
S_rmi               =                                                           ta.crossunder(RMI(RMI_len, mom), RMI_ob)

//BOLINGER BANDS ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//BOLINGER BANDS ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

bb_length           =                   input(20,                                title="  Bollinger Bands Length",                                                                                                           group="Bolinger Bands")
bb_source           =                   input(high,                             title="  Bollinger Bands Source",                                                                                                           group="Bolinger Bands")
//BOLINGER BANDS ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
tf3                 =                   input("",                               title="  Timeframe 3",                                       type = input.resolution,                                                        group="Bolinger Bands")
src3                =                   input(open,                             title="  Source 3",                                          type = input.source,                                                            group="Bolinger Bands")

SHOW_BB             =                   input(false,                            title="  Show Bollinger Bands",                                                                                                               group="Bolinger Bands")
tf2                 =                   input("",                               title="  Timeframe 2",                                      type = input.resolution,                                                        group="Bolinger Bands")
src2                =                   input(open,                             title="  Source 2",                                         type = input.source,                                                            group="Bolinger Bands")
per2                                        =                                                                                                                                                          input(10)
dev2                                        =                                                                                                                                                          input(3.5)
ma2                                         =                                                                                                                                                           request.security(syminfo.tickerid, tf2, ta.sma(src2, per2))
hb2                                         =                                                                                                                                                           ma2 + request.security(syminfo.tickerid, tf2, ta.stdev(src2, per2)) * dev2
lb2                                         =                                                                                                                                                           ma2 - request.security(syminfo.tickerid, tf2, ta.stdev(src2, per2)) * dev2
per3                                        =                                                                                                                                                          input(21)
dev3                                        =                                                                                                                                                          input(5.0)
ma3                                         =                                                                                                                                                           request.security(syminfo.tickerid, tf2, ta.sma(src2, per2))
hb3                                         =                                                                                                                                                           ma3 + request.security(syminfo.tickerid, tf3, ta.stdev(src3, per3)) * dev3
lb3                                         =                                                                                                                                                           ma3 - request.security(syminfo.tickerid, tf3, ta.stdev(src3, per3)) * dev3
per4                                        =                                                                                                                                                          15
dev4                                        =                                                                                                                                                          3.4
ma4                                         =                                                                                                                                                           request.security(syminfo.tickerid, tf2, ta.sma(src2, per2))
hb4                                         =                                                                                                                                                           ma3 + request.security(syminfo.tickerid, tf3, ta.stdev(src3, per4)) * dev4
lb4                                         =                                                                                                                                                           ma3 - request.security(syminfo.tickerid, tf3, ta.stdev(src3, per4)) * dev4

L_BB_CROSS          =                                                           ta.crossover(low, lb4)
S_BB_CROSS          =                                                           ta.crossunder(high, hb3)

L_BB_2              =                                                           close > hb2
S_BB_2              =                                                           close > lb2


//L/S variables----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var bool longCond                    = na, var bool shortCond                   = na, longCond := nz(longCond[1]), shortCond := nz(shortCond[1])
var int CondIni_long                 = 0, var int CondIni_short                 = 0, CondIni_long := nz(CondIni_long[1]), CondIni_short := nz(CondIni_short[1])
var bool Final_longCondition         = na, var bool Final_shortCondition        = na, Final_longCondition := nz(Final_longCondition[1]), Final_shortCondition := nz(Final_shortCondition[1])
var bool BT_Final_longCondition      = na, var bool BT_Final_shortCondition     = na, BT_Final_longCondition := nz(BT_Final_longCondition[1]), BT_Final_shortCondition := nz(BT_Final_shortCondition[1])
var float last_open_longCondition    = na, var float last_open_shortCondition   = na
var int last_longCondition           = na, var int last_shortCondition          = na
var int nLongs = na, var int nShorts = na, nLongs := nz(nLongs[1]), nShorts     := nz(nShorts[1])

//STRATEGY ==========================================================================================================================================================================================================================================================================================================


L_1 =                                                                           not mad_f and RS_Long_condt   and Volume_Breakouts_condt    and L_RF   
S_1 =                                                                           not mad_f and RS_Short_condt  and Volume_Breakouts_condt    and S_RF   

L_2   =                                                                         not mad_flat and L_adx and L_macd  and  L_rsi and not S_1 and Long_MA 
S_2   =                                                                         not mad_flat and S_adx and S_macd  and  S_rsi and not L_1 and Short_MA 

L_3 =                                                                           mad_flat and L_VAP and L_sar 
S_3 =                                                                           mad_flat and S_VAP and S_sar 

L_4     =                                                                       L_rmi and  close < mad and close > ta.sma(close,20) and mad_flat and not (L_1 or L_2 or L_3)
S_4     =                                                                       S_rmi and  close > mad and close < ta.sma(close,20) and mad_flat and not (S_1 or S_2 or S_3)

L_5  =                                                                          L_BB_2 and L_adx and  L_rsi and  not mad_flat and not (L_1 or L_2 or L_3 or L_4)
S_5 =                                                                           S_BB_2 and S_adx and  S_rsi and not mad_flat and not (L_1 or L_2 or L_3 or S_4)

Final_Long_Condt =                                                              (L_5 or L_1 or L_2) 
Final_Short_Condt =                                                             ( S_5 or S_1 or S_2)

longCond        :=                                                              (Final_Long_Condt or L_3 or L_4)
shortCond       :=                                                              (Final_Short_Condt or S_3  or S_4)

CondIni_long    :=                                                              longCond[1] ? 1 : shortCond[1] ? -1 : nz(CondIni_long[1])
CondIni_short   :=                                                              longCond[1] ? 1 : shortCond[1] ? -1 : nz(CondIni_short[1])
longCondition   =                                                               (longCond[1] and nz(CondIni_long[1]) == -1)
shortCondition  =                                                               (shortCond[1] and nz(CondIni_short[1]) == 1)

// POSITION PRICE ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var int last_long_sl = na, var int last_short_sl = na
last_open_longCondition             :=                                          longCondition ? close[1] :                                                      nz(last_open_longCondition[1])
last_open_shortCondition            :=                                          shortCondition ? close[1] :                                                     nz(last_open_shortCondition[1])
last_longCondition                  :=                                          longCondition ? time :                                                          nz(last_longCondition[1])
last_shortCondition                 :=                                          shortCondition ? time :                                                         nz(last_shortCondition[1])
in_longCondition                    =                                           last_longCondition > last_shortCondition
in_shortCondition                   =                                           last_shortCondition > last_longCondition


if longCondition
    nLongs := nLongs + 1
    nShorts := na

if shortCondition
    nLongs := na
    nShorts := nShorts + 1
    
//TP_1 -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

tp                      = input(0.9, "TP-1 [%]",                     type    = input.float, step = 0.1, group="Backtesting") 
var bool long_tp        = na, var bool short_tp                                     = na
var int last_long_tp    = na, var int last_short_tp                                 = na
var bool Final_Long_tp  = na, var bool Final_Short_tp                               = na, Final_Long_tp := nz(Final_Long_tp[1]), Final_Short_tp := nz(Final_Short_tp[1])
long_tp                 := (is_Long and high > (last_open_longCondition*(1+(tp/100))) and  in_longCondition)
short_tp                := (is_Short and low < (last_open_shortCondition*(1-(tp/100))) and  in_shortCondition)
last_long_tp            := long_tp ? time : nz(last_long_tp[1])
last_short_tp           := short_tp ? time : nz(last_short_tp[1])
Final_Long_tp           := (long_tp and last_longCondition > nz(last_long_tp[1]) and last_longCondition > nz(last_long_sl[1]))
Final_Short_tp          := (short_tp and last_shortCondition > nz(last_short_tp[1]) and last_shortCondition > nz(last_short_sl[1]))
l_1_h = iff(Final_Long_tp, last_open_longCondition*(1+(tp/100)), na),
s_1_h = iff(Final_Short_tp, last_open_shortCondition*(1-(tp/100)), na)

//TP_2 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

tp2                     = input(1.7, "TP-2 [%]",                     type    = input.float, step = 0.1) 
var bool long_tp2       = na, var bool short_tp2                                    = na
var int last_long_tp2   = na, var int last_short_tp2                                = na
var bool Final_Long_tp2 = na, var bool Final_Short_tp2                              = na, Final_Long_tp2 := nz(Final_Long_tp2[1]), Final_Short_tp2 := nz(Final_Short_tp2[1])
long_tp2                := ( is_Long and high > (last_open_longCondition*(1+(tp2/100))) and  in_longCondition)
short_tp2               := ( is_Short and low < (last_open_shortCondition*(1-(tp2/100))) and  in_shortCondition)
last_long_tp2           := long_tp2 ? time : nz(last_long_tp2[1])
last_short_tp2          := short_tp2 ? time : nz(last_short_tp2[1])
Final_Long_tp2          := (long_tp2 and last_longCondition > nz(last_long_tp2[1]) and last_longCondition > nz(last_long_sl[1]))
Final_Short_tp2         := (short_tp2 and last_shortCondition > nz(last_short_tp2[1]) and last_shortCondition > nz(last_short_sl[1]))
l_2_h = iff(Final_Long_tp2, last_open_longCondition*(1+(tp2/100)), na)
s_2_h = iff(Final_Short_tp2, last_open_shortCondition*(1-(tp2/100)), na),

// SL ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

sl                      = input(7, "SL [%]",                      type    = input.float, step = 0.1)
var int CondIni_long_sl = 0, var int CondIni_short_sl                               = 0
var bool Final_Long_sl0 = na, var bool Final_Short_sl0                              = na, Final_Long_sl0 := nz(Final_Long_sl0[1]), Final_Short_sl0 := nz(Final_Short_sl0[1])
var bool Final_Long_sl  = na, var bool Final_Short_sl                               = na, Final_Long_sl := nz(Final_Long_sl[1]), Final_Short_sl := nz(Final_Short_sl[1])
long_sl                 =  is_Long and low <= ((1-(sl/100))*last_open_longCondition) and not (open < ((1-(sl/100))*last_open_longCondition)) 
short_sl                =  is_Short and high >= ((1+(sl/100))*last_open_shortCondition) and not (open > ((1+(sl/100))*last_open_shortCondition))
Final_Long_sl0          := Position == "BOTH" ? long_sl and nz(CondIni_long_sl[1]) == -1 and not Final_Long_tp and not shortCondition  : long_sl and nz(CondIni_long_sl[1]) == -1 and not Final_Long_tp
Final_Short_sl0         := Position == "BOTH" ? short_sl and nz(CondIni_short_sl[1]) == -1 and not Final_Short_tp and not longCondition  : short_sl and nz(CondIni_short_sl[1]) == -1 and not Final_Short_tp
last_long_sl            := Final_Long_sl ? time : nz(last_long_sl[1])
last_short_sl           := Final_Short_sl ? time : nz(last_short_sl[1])
Final_Long_sl           := Final_Long_sl0 and last_longCondition > nz(last_long_tp[1]) and last_longCondition > nz(last_long_sl[1])
Final_Short_sl          := Final_Short_sl0 and last_shortCondition > nz(last_short_tp[1]) and last_shortCondition > nz(last_short_sl[1])
CondIni_long_sl         := Final_Long_tp or Final_Long_sl or  Final_shortCondition  ? 1 : Final_longCondition ? -1 : nz(CondIni_long_sl[1])
CondIni_short_sl        := Final_Short_tp or Final_Short_sl  or Final_longCondition  ? 1 : Final_shortCondition ? -1 : nz(CondIni_short_sl[1])

// Leverage ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var float   last_leverage_L  = na,   var float   last_leverage_S = na

Act_Lev                 =           input(true,                                title="Activate leverage?"                                                                                                                  )
Max_Lev                 =           input(3,                                    title="Max lev.",                                                               type    = input.integer,   minval = 1,     maxval = 5       )
sma_length_lev          =           input(50,                                   title="Volume lenght lev.",                                                     minval  = 1                                                 )

long = ((longCond and not in_longCondition) or (longCond and Final_Long_tp) or (longCond and Final_Long_sl)) or (longCond and not longCondition and (last_long_tp > nz(last_longCondition))) or (longCond and not longCondition and (last_long_sl > nz(last_longCondition))) 
Long      = (longCond and not in_longCondition) or (longCond and Final_Long_tp) or (longCond and Final_Long_sl) or (longCond and not longCondition and (last_long_tp >= nz(last_longCondition))) or (longCond and not longCondition and (last_long_sl >= nz(last_longCondition)))
short = ((shortCond and not in_shortCondition) or (shortCond and Final_Short_tp) or (shortCond and Final_Short_sl)) or (shortCond and not shortCondition and (last_short_tp > nz(last_shortCondition))) or (shortCond and not shortCondition and (last_short_sl > nz(last_shortCondition))) 
Short     = (shortCond and not in_shortCondition) or (shortCond and Final_Short_tp) or (shortCond and Final_Short_sl) or (shortCond and not shortCondition and (last_short_tp >= nz(last_shortCondition))) or (shortCond and not shortCondition and (last_short_sl >= nz(last_shortCondition)))

Lev_vol                 =                           not    mad_flat  ?              math.min(Max_Lev,math.max(1, math.round(volume/ta.sma(volume,sma_length_lev)))) : 1
rsiLen                  =                                                       14
last_leverage_L     :=                                  Long        ?       Lev_vol             :                           nz(last_leverage_L[1]       )
last_leverage_S     :=                                  Short       ?       Lev_vol             :                           nz(last_leverage_S[1]       )

vol_x1                  =   Lev_vol[1]  ==  1                                                                             
vol_x2                  =   Lev_vol[1]  ==  2
vol_x3                  =   Lev_vol[1]  ==  3
vol_x4                  =   Lev_vol[1]  ==  4

Long_x1     = longCondition     and     vol_x1 
Short_x1    = shortCondition    and     vol_x1 

Long_x2     = longCondition     and     vol_x2  
Short_x2    = shortCondition    and     vol_x2

Long_x3     = longCondition     and     vol_x3 
Short_x3    = shortCondition    and     vol_x3

Long_x4     = longCondition     and     vol_x4 
Short_x4    = shortCondition    and     vol_x4




//RE-ENTRY ON TP-HIT-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var float sum_long              =                                                           0.0,                                                                    var float sum_short = 0.0
var float Position_Price        =                                                           0.0

if Final_Long_tp or Final_Long_sl  
    CondIni_long                :=                                                          -1
    sum_long                    :=                                                          0.0
    nLongs                      :=                                                          na
if Final_Short_tp or Final_Short_sl 
    CondIni_short               :=                                                          1
    sum_short                   :=                                                          0.0
    nShorts                     :=                                                          na
   
// Colors ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Colors ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

bar_color = L_adx ? #009688 : S_adx ? #f06292 : color.gray

barcolor                                                                        (color = bar_color)

//PLOTS==============================================================================================================================================================================================================================================================================================================

//PLOTS==============================================================================================================================================================================================================================================================================================================

h_BB        = plot(SHOW_BB ? hb3 : na,                      title = "Upper Bollinger Band",                                                                                             color = #009688,                                linewidth = 1   )
l_BB        = plot(SHOW_BB ? lb3 : na,                      title = "Lower Bollinger Band",                                                                                             color = #f06292,                                linewidth = 1   )
fill(h_BB, l_BB,                                            title = "Bollinger Band Background",                                                                                        color = in_longCondition ? #009688 : #f06292,   transp = 95     )

plot(SHOW_SAR ? SAR : na,                                   title = "SAR",                  style=plot.style_circles,                                                                   color= bar_color                                                  ) 

res         = plot(SHOW_S_R ? top : na,                                                     style = plot.style_cross,        offset=-left,                                              color=top != top[1] ? na : color.green,         linewidth = 1    )
sup         = plot(SHOW_S_R ? bot : na,                                                     style = plot.style_cross,        offset=-left,                                              color=bot != bot[1] ? na : color.red,           linewidth = 1    )

plot                                                        (l_1_h,                         style = plot.style_cross,             linewidth=5,                                        color=color.fuchsia,                                                                                editable = false        )
plot                                                        (s_1_h,                         style = plot.style_cross,             linewidth=5,                                        color=color.fuchsia,                                                                                editable = false        )
plot                                                        (l_2_h,                         style = plot.style_cross,             linewidth=5,                                        color=color.fuchsia,                                                                                editable = false        )
plot                                                        (s_2_h,                         style = plot.style_cross,             linewidth=5,                                        color=color.fuchsia,                                                                                editable = false        )

hbandplot   =   plot(SHOW_RF ? hband : na,                                 title = "RF HT",                                                                                                            color=color.aqua,                                                                                    transp = 50             )
lbandplot   =   plot(SHOW_RF ? lband : na,                                 title = "RF LT",                                                                                                            color=color.aqua,                                                                                    transp = 50             )
fill(hbandplot, lbandplot,                                  title = "RF TR",                                                                                                            color=color.aqua                                                                                                             )

// PLOTSPAHES ======================================================================================================================================================================================================================================================================================================

plotshape(Final_Long_tp2  and  Final_Long_tp ,                 title="Long TP HIT",            style=shape.flag,                       location=location.abovebar,                         color=color.red,            size=size.tiny ,          textcolor=color.red,             transp = 0                          ) 
plotshape(Final_Short_tp2  and  Final_Short_tp ,               title="Short TP HIT",           style=shape.flag,                       location=location.belowbar,                         color=color.green,          size=size.tiny ,          textcolor=color.green,           transp = 0                          ) 

plotshape(Final_Long_tp2  and not Final_Long_tp ,                 title="Long TP HIT",            style=shape.triangledown,                       location=location.abovebar,                         color=color.red,   text="TP",         size=size.tiny ,          textcolor=color.red,             transp = 0                          ) 
plotshape(Final_Short_tp2  and not Final_Short_tp ,               title="Short TP HIT",           style=shape.triangleup,                       location=location.belowbar,                         color=color.green,    text="TP",      size=size.tiny ,          textcolor=color.green,           transp = 0                          ) 

plotshape(Final_Long_tp  and not Final_Long_tp2 ,                 title="Long TP HIT",            style=shape.triangledown,                       location=location.abovebar,                         color=color.red,     text="TP",        size=size.tiny ,          textcolor=color.red,             transp = 0                          ) 
plotshape(Final_Short_tp  and not Final_Short_tp2 ,               title="Short TP HIT",           style=shape.triangleup,                       location=location.belowbar,                         color=color.green,     text="TP",     size=size.tiny ,          textcolor=color.green,           transp = 0                          ) 

plotshape(Long_x1,                                          title = "L x1",                 style=shape.triangleup,                 location=location.belowbar,                         color=color.blue,         size=size.tiny ,        text="x1",          textcolor=color.blue,           transp = 0            )
plotshape(Short_x1,                                         title = "S x1",                 style=shape.triangledown,               location=location.abovebar,                         color=color.red,          size=size.tiny ,        text="x1",          textcolor=color.red,            transp = 0            )

plotshape(Long_x2,                                          title = "L x2",                 style=shape.triangleup,                 location=location.belowbar,                         color=color.blue,         size=size.tiny ,        text="x2",          textcolor=color.blue,           transp = 0            )
plotshape(Short_x2,                                         title = "S x2",                 style=shape.triangledown,               location=location.abovebar,                         color=color.red,          size=size.tiny,         text="x2",          textcolor=color.red,            transp = 0            )

plotshape(Long_x3,                                          title = "L x3",                 style=shape.triangleup,                 location=location.belowbar,                         color=color.blue,         size=size.tiny ,        text="x3",          textcolor=color.blue,           transp = 0            )
plotshape(Short_x3,                                         title = "S x3",                 style=shape.triangledown,               location=location.abovebar,                         color=color.red,          size=size.tiny,         text="x3",          textcolor=color.red,            transp = 0            )

plotshape(Long_x4,                                          title = "L x4",                 style=shape.triangleup,                 location=location.belowbar,                         color=color.blue,         size=size.tiny ,        text="x4",          textcolor=color.blue,           transp = 0            )
plotshape(Short_x4,                                         title = "S x4",                 style=shape.triangledown,               location=location.abovebar,                         color=color.red,          size=size.tiny,         text="x4",          textcolor=color.red,            transp = 0            )


//BACKTESTING--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

//L_STOP = in_longCondition and S_1 and mad_flat
//S_STOP = in_shortCondition and L_1 and mad_flat

if long
    strategy.entry("L_1", strategy.long, when=ACT_BT and testPeriod)
    strategy.entry("L_2", strategy.long, when=ACT_BT and testPeriod)

if short
    strategy.entry("S_1", strategy.short, when=ACT_BT and testPeriod)
    strategy.entry("S_2", strategy.short, when=ACT_BT and testPeriod)


strategy.exit("TP-1_L", "L_1", profit = (math.abs((last_open_longCondition   *       (1+(tp/100)))-last_open_longCondition)/syminfo.mintick),    loss = (math.abs((last_open_longCondition    *   (1-(sl/100)))-last_open_longCondition)/syminfo.mintick  ))
strategy.exit("TP-2_S", "S_2", profit = (math.abs((last_open_shortCondition  *       (1-(tp2/100)))-last_open_shortCondition)/syminfo.mintick),  loss = (math.abs((last_open_shortCondition   *   (1+(sl/100)))-last_open_shortCondition)/syminfo.mintick ))
strategy.exit("TP-1_S", "S_1", profit = (math.abs((last_open_shortCondition  *       (1-(tp/100)))-last_open_shortCondition)/syminfo.mintick),   loss = (math.abs((last_open_shortCondition   *   (1+(sl/100)))-last_open_shortCondition)/syminfo.mintick ))
strategy.exit("TP-2_L", "L_2", profit = (math.abs((last_open_longCondition   *       (1+(tp2/100)))-last_open_longCondition)/syminfo.mintick),   loss = (math.abs((last_open_longCondition    *   (1-(sl/100)))-last_open_longCondition)/syminfo.mintick  ))

//strategy.close_all(when = L_STOP or S_STOP)
```

> Detail

https://www.fmz.com/strategy/376304

> Last Modified

2022-08-03 10:57:43
