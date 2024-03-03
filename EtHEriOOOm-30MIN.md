
> Name

EtHEriOOOm-30MIN

> Author

a624587332



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_hl2|0|src: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_2|0|Longs / Shorts: Both|Longs|Shorts|
|v_input_7|true|RANGE FILTER|
|v_input_43|1.9|% TP [PLOTSHAPE]|
|v_input_3|true|(?ADX)AVERAGE DIRECTIONAL INDEX|
|v_input_4|0|ADX OPTION: MASANAKAMURA|CLASSIC|
|v_input_5|19|ADX LENGTH|
|v_input_6|16|ADX THRESHOLD|
|v_input_8|35|(?Range Filter)SAMPLING PERIOD|
|v_input_9|0.2|RANGE MULTIPLIER|
|v_input_10_close|0|(?Jurik Moving Average)JMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_11||JMA Resolution|
|v_input_12|false|JMA Allow Repainting?|
|v_input_13|31|JMA Length|
|v_input_14|13|(?MACD)Fast Length|
|v_input_15|19|Slow Length|
|v_input_16|19|Signal Smoothing|
|v_input_17|61|(?Fast MA)MA Length|
|v_input_18|5|AvgType|
|v_input_19|61|(?Volume)Volume Weight Length|
|v_input_20|0|Volume Weight Type: EMA|SMA|HMA|WMA|DEMA|
|v_input_21|1.1|Volume To Trigger Signal|
|v_input_22|50|(?Relative Strenght Indeks)RSI lenght|
|v_input_23_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_24|10|(?Trend Strenght)Channel Length|
|v_input_25|21|Average Length|
|v_input_26|20|(?TWAP)TWAP Smoothing|
|v_input_27|0|TWAP Timeframe|
|v_input_28|true|(?Stoch Scalps)SCALPING|
|v_input_29|42|lower lenght|
|v_input_30|12|lenght D|
|v_input_31|72|smooth K|
|v_input_32|67|upper lenght|
|v_input_33|true|(?BACKTEST)BACKTEST|
|v_input_34|true|Longs|
|v_input_35|true|Shorts|
|v_input_36|100|risk|
|v_input_37|2019|start year|
|v_input_38|6|start month|
|v_input_39|true|start day|
|v_input_40|2222|stop year|
|v_input_41|12|stop month|
|v_input_42|31|stop day|
|v_input_44|0.019| TP/100|
|v_input_45|0.081| SL/100|


> Source (PineScript)

``` pinescript
strategy("EtHEriOOOm [30MIN]", overlay=true,  pyramiding=1,initial_capital = 10000, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.04)

//SOURCE =============================================================================================================================================================================================================================================================================================================

src                 =                   input(hl2)

// POSITION ==========================================================================================================================================================================================================================================================================================================

Position            =                   input("Both",                       title= "Longs / Shorts",                options = ["Both","Longs","Shorts"])

is_Long             =                   Position                            == "SHORT"                      ?                    na : true
is_Short            =                   Position                            == "LONG"                       ?                    na : true

// INPUTS ============================================================================================================================================================================================================================================================================================================

//ADX --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Act_ADX             =                   input(true,                         title = "AVERAGE DIRECTIONAL INDEX",        type = input.bool,                                                                              group = "ADX")
ADX_options         =                   input("MASANAKAMURA",               title = "ADX OPTION",                       options = ["CLASSIC", "MASANAKAMURA"],                                                          group = "ADX")
ADX_len             =                   input(19,                           title = "ADX LENGTH",                       type = input.integer, minval = 1,                                                               group = "ADX")
th                  =                   input(16,                           title = "ADX THRESHOLD",                    type = input.float, minval = 0, step = 0.5,                                                     group = "ADX")

// Range Filter ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Act_RF              =                   input(true,                         title = "RANGE FILTER")
per_                 =                   input(35,                          title = "SAMPLING PERIOD",                 minval=1,                                                                                        group = "Range Filter")
mult                =                   input(0.2,                          title="RANGE MULTIPLIER",                   minval=0.1, step = 0.1,                                                                         group = "Range Filter")

//JMA--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

inp                 =                   input(defval=close,                 title="JMA Source",                     type=input.source,                                                                                  group = "Jurik Moving Average")
reso                =                   input("",                           title="JMA Resolution",                 type=input.resolution,                                                                              group = "Jurik Moving Average")
rep                 =                   input(false,                        title="JMA Allow Repainting?",          type=input.bool,                                                                                    group = "Jurik Moving Average")
src0                =                   security(syminfo.tickerid, reso, inp[rep ? 0 : barstate.isrealtime ? 1 : 0])[rep ? 0 : barstate.isrealtime ? 0 : 1]
lengths             =                   input(31,                           title="JMA Length",                     type=input.integer,                                                                                 group = "Jurik Moving Average")

//MACD----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

fast_length         =                   input(13,                           title="Fast Length",                   type=input.integer,                                                                                   group="MACD")
slow_length         =                   input(19,                           title="Slow Length",                   type=input.integer,                                                                                   group="MACD")
signal_length       =                   input(19,                           title="Signal Smoothing",              type=input.integer,                                                                                   group="MACD")

//MA----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

length              =                   input(61,                           title="MA Length",                      minval=1,                                                                                           group="Fast MA" )
matype              =                   input(5,                            title="AvgType",                        minval=1, maxval=5,                                                                                 group="Fast MA")

//Volume weight------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

maLength            =                   input(61,                           title="Volume Weight Length",           type=input.integer, minval=1,                                                                       group = "Volume")
maType              =                   input(defval="EMA",                 title="Volume Weight Type",             type=input.string,  options=["EMA", "SMA", "HMA", "WMA", "DEMA"],                                   group = "Volume")
rvolTrigger         =                   input(1.1,                          title="Volume To Trigger Signal",       type=input.float, step=0.1, minval=0.1,                                                             group = "Volume")

//RSI----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

len_3               =                   input(50,                           title="RSI lenght",                                                                                                                         group = "Relative Strenght Indeks")
src_3               =                   input(close,                        title="RSI Source",                                                                                                                         group = "Relative Strenght Indeks")

//TREND STRENGHT--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

n1                  =                   input(10,                           title= "Channel Length",                                                                                                                    group="Trend Strenght")
n2                  =                   input(21,                           title= "Average Length",                                                                                                                    group="Trend Strenght")

//TWAP Trend --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

smoothing           =                   input(20,                           title="TWAP Smoothing",                                                                                                                     group="TWAP")     
resolution          =                   input("0",                          title="TWAP Timeframe",                                                                                                                     group="TWAP")       

//Stoch Divergence Scalping--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ACT_S_SCLP            =                 input(true,                         title = "SCALPING",                                         type = input.bool,                                                              group ="Stoch Scalps")
ll                  =                   input(42,                           title="lower lenght",                                       maxval=50,                                                                      group ="Stoch Scalps")
lengthd             =                   input(12,                           title="lenght D",                                                                                                                           group ="Stoch Scalps")
smoothK             =                   input(72,                           title="smooth K",                                           minval=1,                                                                       group ="Stoch Scalps")
ul                  =                   input(67,                           title="upper lenght",                                       minval=50,                                                                      group ="Stoch Scalps")

//BACKTESTING--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ACT_BT              =                   input(true,                         title="BACKTEST",                                           type = input.bool,                                                              group= "BACKTEST")
long_               =                   input(true,                         title="Longs",                                                                                                                              group= "BACKTEST")
short_              =                   input(true,                         title="Shorts",                                                                                                                             group= "BACKTEST")
risk                =                   input(100,                                                                                                                                                                      group= "BACKTEST")
testStartYear       =                   input(2019,                         title="start year",                                         minval = 1997, maxval = 3000,                                                   group= "BACKTEST") 
testStartMonth      =                   input(06,                           title="start month",                                        minval = 1, maxval = 12,                                                        group= "BACKTEST")
testStartDay        =                   input(01,                           title="start day",                                          minval = 1, maxval = 31,                                                        group= "BACKTEST")
testPeriodStart     =                   timestamp(testStartYear,testStartMonth,testStartDay,0,0)
testStopYear        =                   input(2222,                         title="stop year",                                          minval=1980, maxval = 2222,                                                     group= "BACKTEST")
testStopMonth       =                   input(12,                           title="stop month",                                         minval=1, maxval=12,                                                            group= "BACKTEST")
testStopDay         =                   input(31,                           title="stop day",                                           minval=1, maxval=31,                                                            group= "BACKTEST")
testPeriodStop      =                   timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)
testPeriod          =                   time >= testPeriodStart and time <= testPeriodStop ? true : false

//INDICATORS ==============================================================================================================================================================================================================================================================

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

// Range Filter ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var bool L_RF           = na,                               var bool S_RF = na
Range_filter(_src, _per_, _mult)=>
    var float _upward   =                                                                                                                   0.0
    var float _downward =                                                                                                                   0.0
    wper                =                                                                                                                   (_per_*2) - 1
    avrng               =                                                                                                                   ema(abs(_src - _src[1]), _per_)
    _smoothrng          =                                                                                                                   ema(avrng, wper)*_mult
    _filt               =                                                                                                                   _src
    _filt               := _src > nz(_filt[1]) ? ((_src-_smoothrng) < nz(_filt[1]) ? nz(_filt[1]) : (_src-_smoothrng)) : ((_src+_smoothrng) > nz(_filt[1]) ? nz(_filt[1]) : (_src+_smoothrng))
    _upward             :=                                                                                                                  _filt > _filt[1] ? nz(_upward[1]) + 1 : _filt < _filt[1] ? 0 : nz(_upward[1])
    _downward           :=                                                                                                                  _filt < _filt[1] ? nz(_downward[1]) + 1 : _filt > _filt[1] ? 0 : nz(_downward[1])
    [_smoothrng,_filt,_upward,_downward]
[smoothrng, filt, upward, downward] = Range_filter(src, per_, mult)
hband                   =                                                                                                                   filt + smoothrng
lband                   =                                                                                                                   filt - smoothrng
L_RF                    :=                                                      (Act_RF ? (high > hband and upward > 0) : L_adx)
S_RF                    :=                                                      (Act_RF ? (low < lband and downward > 0) : S_adx)

filtcolor               =                                                                                                                   upward > 0 ? color.lime : downward > 0 ? color.red : color.orange
filtplot                =                                                                                                                   plot(Act_RF ? filt : na, color = filtcolor, linewidth = 3, title="Range Filter", editable = false)
hbandplot               =                                                                                                                   plot(Act_RF ? hband : na, color = color.green, transp = 60, title = "High Target", editable = false)
lbandplot               =                                                                                                                   plot(Act_RF ? lband : na, color = color.red, transp = 60, title = "Low Target", editable = false)
fill(hbandplot, filtplot,                       color = color.green,    title = "HT RF",            editable = false)
fill(lbandplot, filtplot,                       color = color.red,      title = "LT RF",            editable = false)

//MACD-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

fast_ma                 =                                                                                                                               ema(src, fast_length)
slow_ma                 =                                                                                                                               ema(src, slow_length)
macd                    =                                                                                                                               fast_ma - slow_ma
signal_                 =                                                                                                                               sma(macd, signal_length)
L_macd                  =                                                       macd > signal_ 
S_macd                  =                                                       macd < signal_ 

//JMA------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

jsa                     =                                                                                                                               (src0 + src0[lengths]) / 2
sig                     =                                                                                                                               src0 > jsa ? 1 : src0 < jsa ? -1 : 0
L_jma                   =                                                       sig > 0 
S_jma                   =                                                       sig < 0 

//MA----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

simplema                =                                                                                                                               sma(src,length)
exponentialma           =                                                                                                                               ema(src,length)
hullma                  =                                                                                                                               wma(2*wma(src, length/2)-wma(src, length), round(sqrt(length)))
weightedma              =                                                                                                                               wma(src, length)
volweightedma           =                                                                                                                               vwma(src, length)
avgval                  =                                                                                                                               matype==1 ? simplema : matype==2 ? exponentialma : matype==3 ? hullma : matype==4 ? weightedma : matype==5 ? volweightedma : na
MA_speed                =                                                                                                                               (avgval / avgval[1] -1 ) *100
L_s_ma                  =                                                       MA_speed > 0 
S_s_ma                  =                                                       MA_speed < 0 

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
ma                                                                                                                                          = getMA0(maLength)
rvol                                                                                                                                        = volume / ma
volumegood              =                                                       volume > rvolTrigger * ma

//RSI------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

up_3                    =                                                                                                                   rma(max(change(src_3), 0), len_3)
down_3                  =                                                                                                                   rma(-min(change(src_3), 0), len_3)
rsi_3                   =                                                                                                                   down_3 == 0 ? 100 : up_3 == 0 ? 0 : 100 - (100 / (1 + up_3 / down_3))
L_rsi                   =                                                       (rsi_3 < 70)
S_rsi                   =                                                       (rsi_3 > 30) 

//TREND STRENGHT---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
mf                      = _mfi_rsi(mfi_upper, mfi_lower)
mfi                     = (mf - 50) * 3
L_mfi                   =                                                       mfi > 1
S_mfi                   =                                                       mfi < -1

//TWAP Trend --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

res                                     =                                                                                           resolution != "0" ? resolution : timeframe.period
weight                                  =                                                                                           barssince(change(security(syminfo.tickerid, res, time, lookahead=barmerge.lookahead_on)))
price                                   =                                                                                           0.
price := weight == 0 ? src : src + nz(price[1])
twap                                    =                                                                                           price / (weight + 1)
ma_                                     =                                                                                           smoothing < 2 ? twap : sma(twap, smoothing)
bullish                                 =                                                                                           iff(smoothing < 2, src >= ma_, src > ma_)
disposition                             =                                       bullish ? color.lime : color.red
basis                                   =                                                                                           plot(src, "OHLC4", disposition, linewidth=1, transp=100)
work                                    =                                                                                           plot(ma_, "TWAP", disposition, linewidth=2, transp=20)
fill(basis, work, disposition, transp=90)

//Stoch Divergence ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

k                                   =                                                                                               sma(stoch(close, high, low, lengthd), smoothK)
uline                               =                                                                                               ul
lline                               =                                                                                               ll
d_stoch_L_condt                     =                                           crossover(uline, k)
d_stoch_S_condt                     =                                           crossunder(lline, k)

//L/S variables----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var bool longCond                    = na, var bool shortCond                   = na, longCond := nz(longCond[1]), shortCond := nz(shortCond[1])
var int CondIni_long                 = 0, var int CondIni_short                 = 0, CondIni_long := nz(CondIni_long[1]), CondIni_short := nz(CondIni_short[1])
var bool Final_longCondition         = na, var bool Final_shortCondition        = na, Final_longCondition := nz(Final_longCondition[1]), Final_shortCondition := nz(Final_shortCondition[1])
var bool BT_Final_longCondition      = na, var bool BT_Final_shortCondition     = na, BT_Final_longCondition := nz(BT_Final_longCondition[1]), BT_Final_shortCondition := nz(BT_Final_shortCondition[1])
var float last_open_longCondition    = na, var float last_open_shortCondition   = na
var int last_longCondition           = na, var int last_shortCondition          = na
var int nLongs = na, var int nShorts = na, nLongs := nz(nLongs[1]), nShorts     := nz(nShorts[1])

//CONDITIONS =======================================================================================================================================================================================================================================================================================================

L_scalp_condt           =                                                       d_stoch_L_condt and ACT_S_SCLP
S_scalp_condt           =                                                       d_stoch_S_condt and ACT_S_SCLP

//STRATEGY ==========================================================================================================================================================================================================================================================================================================

L_basic_condt   =                                                               L_adx and L_RF and L_jma and L_macd and L_s_ma and volumegood and L_rsi and L_mfi
S_basic_condt   =                                                               S_adx and S_RF and S_jma and S_macd and S_s_ma and volumegood and S_rsi and S_mfi

L_second_condt  =                                                               L_basic_condt or L_scalp_condt 
S_second_condt  =                                                               S_basic_condt or S_scalp_condt  

longCond        := L_second_condt
shortCond       := S_second_condt
CondIni_long    := longCond[1] ? 1 : shortCond[1] ? -1 : nz(CondIni_long[1])
CondIni_short   := longCond[1] ? 1 : shortCond[1] ? -1 : nz(CondIni_short[1])
longCondition   =                                                               (longCond[1] and nz(CondIni_long[1]) == -1)
shortCondition  =                                                               (shortCond[1] and nz(CondIni_short[1]) == 1)

// Price position----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var int last_long_sl                =                                           na, var int last_short_sl                                                           = na
last_open_longCondition             :=                                          longCondition ? close[1] :                                                      nz(last_open_longCondition[1])
last_open_shortCondition            :=                                          shortCondition ? close[1] :                                                     nz(last_open_shortCondition[1])
last_longCondition                  :=                                          longCondition ? time :                                                          nz(last_longCondition[1])
last_shortCondition                 :=                                          shortCondition ? time :                                                         nz(last_shortCondition[1])
in_longCondition                    =                                           last_longCondition > last_shortCondition
in_shortCondition                   =                                           last_shortCondition > last_longCondition
if longCondition
    nLongs                          :=                                          nLongs + 1
    nShorts                         :=                                          na
if shortCondition
    nLongs                          :=                                          na
    nShorts                         :=                                          nShorts + 1
    
//TP -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

tp                                  =           input(1.9, "% TP [PLOTSHAPE]",                     type    = input.float, step = 0.1) 
var bool long_tp                    =                                           na, var bool short_tp                                     = na
var int last_long_tp                =                                           na, var int last_short_tp                                 = na
var bool Final_Long_tp              =                                           na, var bool Final_Short_tp                               = na, Final_Long_tp := nz(Final_Long_tp[1]), Final_Short_tp := nz(Final_Short_tp[1])
long_tp                             :=                                                                                                  (is_Long and high > (last_open_longCondition*(1+(tp/100))) and  in_longCondition)
short_tp                            :=                                                                                                  (is_Short and low < (last_open_shortCondition*(1-(tp/100))) and  in_shortCondition)
last_long_tp                        :=                                                                                                  long_tp ? time : nz(last_long_tp[1])
last_short_tp                       :=                                                                                                  short_tp ? time : nz(last_short_tp[1])
Final_Long_tp                       :=                                                                                                  (long_tp and last_longCondition > nz(last_long_tp[1]) and last_longCondition > nz(last_long_sl[1]))
Final_Short_tp                      :=                                                                                                  (short_tp and last_shortCondition > nz(last_short_tp[1]) and last_shortCondition > nz(last_short_sl[1]))

//LONG/SHORT CONDT=================================================================================================================================================================================================================================================================================================

Final_longCondition     := is_Long and longCondition
Final_shortCondition    := is_Short and shortCondition

//RE-ENTRY ON TP-HIT-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var float sum_long              =                                                           0.0,                                                                    var float sum_short = 0.0
var float Position_Price        =                                                           0.0

if Final_Long_tp 
    CondIni_long                :=                                                          -1
    sum_long                    :=                                                          0.0
    nLongs                      :=                                                          na
if Final_Short_tp
    CondIni_short               :=                                                          1
    sum_short                   :=                                                          0.0
    nShorts                     :=                                                          na
    
//BAR COLORS =======================================================================================================================================================================================================================================================================================================

bar_col                         =       L_adx       ?       color.green         :       S_adx       ?       color.red       :       L_scalp_condt       ?       color.lime      :       S_scalp_condt       ?       color.maroon : color.orange
barcolor(color = bar_col)
   
//PLOTSPAHES =======================================================================================================================================================================================================================================================================================================

plotshape(Final_longCondition,                                              title="Long",           style=shape.triangleup,         location=location.belowbar,                                     color=color.blue,   size=size.small , transp=0)
plotshape(Final_shortCondition,                                             title="Short",          style=shape.triangledown,       location=location.abovebar,                                     color=color.red,   size=size.small ,transp=0)

plotshape(Final_Long_tp ,                                                   title = "TP",           style = shape.triangledown,     location = location.abovebar, text="TP", textcolor=color.red,  color = color.red,  transp = 0, size = size.tiny) 
plotshape(Final_Short_tp ,                                                  title = "TP",           style = shape.triangleup,       location = location.belowbar, text="TP", textcolor=color.green,color = color.green, transp = 0, size = size.tiny) 

//BACKTESTING--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

g(v, p) => round(v * (pow(10, p))) / pow(10, p)

tp_=                                                                        input(0.019, step=0.001,                        title=" TP/100",                                            group= "BACKTEST")
sl_=                                                                        input(0.081, step=0.001,                        title=" SL/100",                                            group = "BACKTEST")

if long_                                                                and                                                                             ACT_BT 
    strategy.entry("L"                          ,1,                                                 when=L_second_condt         and                                     testPeriod )
    strategy.exit("S_tp/sl", "L", profit=close * tp_ / syminfo.mintick, loss=close * sl_ / syminfo.mintick)
    
if long_                                                                and                                                                             ACT_BT 
    strategy.entry("S"                          ,0,                                                 when=S_second_condt         and                                     testPeriod )
    strategy.exit("S_tp/sl", "S", profit=close * tp_ / syminfo.mintick, loss=close * sl_ / syminfo.mintick)


// By wielkieef
```

> Detail

https://www.fmz.com/strategy/376259

> Last Modified

2022-08-02 23:44:45
