
> Name

Get-your-trend

> Author

发明者量化

> Strategy Description

来自tradingview社区热门策略

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|5|  1-SMA Lenght|
|v_input_3|15|  2-SMA Lenght|
|v_input_4|25|  3-SMA Lenght|
|v_input_5|15|(?Average True Range)  PP period|
|v_input_6|true|  ATR Factor|
|v_input_7|true|  ATR Period|
|v_input_8|0|(?ADX)  Adx Type: CLASSIC|MASANAKAMURA|
|v_input_9|20|  Adx lenght|
|v_input_10|15|  Adx Treshold|
|v_input_11|30|(?Cloud)  Cloud Length|
|v_input_12|1.8|(?Volume)  Volume mult.|
|v_input_13|30|  Volume lenght|


> Source (PineScript)

``` pinescript
/*backtest
start: 2020-01-28 00:00:00
end: 2022-04-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Bitfinex","currency":"BTC_USD"}]
*/

//@version=4

src = input(close)

strategy("Get your trend", overlay = true)


//Inputs  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Length1 =                               input(5,                                title="  1-SMA Lenght", minval=1)
Length2 =                               input(15,                               title="  2-SMA Lenght", minval=1)
Length3 =                               input(25,                               title="  3-SMA Lenght", minval=1)
prd                     =               input(15,                               title="  PP period",                                                                                                                        group="Average True Range")
Factor                  =               input(1,                                title="  ATR Factor",                                                                                                                       group="Average True Range")
Pd                      =               input(1,                                title="  ATR Period",                                                                                                                       group="Average True Range")
ADX_options         =                   input("CLASSIC",                        title="  Adx Type",                                          options = ["CLASSIC", "MASANAKAMURA"],                                          group = "ADX")
ADX_len             =                   input(20,                               title="  Adx lenght",                                        type = input.integer, minval = 1,                                               group = "ADX")
th                  =                   input(15,                               title="  Adx Treshold",                                      type = input.float, minval = 0, step = 0.5,                                     group = "ADX")
len                 =                   input(30,                               title="  Cloud Length",                                                                                                                       group="Cloud")
volume_f            =                   input(1.8,                              title="  Volume mult.",                                       minval = 0, step = 0.1,                                                         group="Volume")
sma_length          =                   input(30,                               title="  Volume lenght",                                      minval = 1,                                                                     group="Volume")

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
SMA1 = sma(src, Length1)
SMA2 = sma(src, Length2)
SMA3 = sma(src, Length3)
Volume_condt            =                                                       volume > sma(volume,sma_length)*volume_f
Long_MA         =                                                               (SMA1 < close and  SMA2 < close and  SMA3  < close )
Short_MA        =                                                               (SMA1 > close and  SMA2 > close and  SMA3  > close )
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

// STRATEGY LOGIC -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var bool longCond                    = na, var bool shortCond                   = na, longCond := nz(longCond[1]), shortCond := nz(shortCond[1])
var int CondIni_long                 = 0, var int CondIni_short                 = 0, CondIni_long := nz(CondIni_long[1]), CondIni_short := nz(CondIni_short[1])
var bool Final_longCondition         = na, var bool Final_shortCondition        = na, Final_longCondition := nz(Final_longCondition[1]), Final_shortCondition := nz(Final_shortCondition[1])
var bool BT_Final_longCondition      = na, var bool BT_Final_shortCondition     = na, BT_Final_longCondition := nz(BT_Final_longCondition[1]), BT_Final_shortCondition := nz(BT_Final_shortCondition[1])
var float last_open_longCondition    = na, var float last_open_shortCondition   = na
var int last_longCondition           = na, var int last_shortCondition          = na
var int nLongs = na, var int nShorts = na, nLongs := nz(nLongs[1]), nShorts     := nz(nShorts[1])
Bulls_on_the_control            =                   Long_MA and Volume_condt and L_adx and not S_cloud
close_condt                     =                   S_cloud and S_ATR
longCond        :=                                                              Bulls_on_the_control
shortCond       :=                                                              close_condt
CondIni_long    :=                                                              longCond[1] ? 1 : shortCond[1] ? -1 : nz(CondIni_long[1])
CondIni_short   :=                                                              longCond[1] ? 1 : shortCond[1] ? -1 : nz(CondIni_short[1])
longCondition   =                                                               (longCond[1] and nz(CondIni_long[1]) == -1)
shortCondition  =                                                               (shortCond[1] and nz(CondIni_short[1]) == 1)
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
var int sectionLongs = 0
sectionLongs := nz(sectionLongs[1])
var int sectionShorts = 0
sectionShorts := nz(sectionShorts[1])
if longCondition 
    sectionLongs := sectionLongs + 1
    sectionShorts := 0
if shortCondition 
    sectionLongs := 0
    sectionShorts := sectionShorts + 1
var float PositionPrice = 0.0
PositionPrice := nz(PositionPrice[1])
var float sum_long = 0.0
var float sum_short = 0.0
if longCondition
    sum_long := nz(last_open_longCondition) + nz(sum_long[1])
    sum_short := 0.0
if shortCondition
    sum_short := nz(last_open_shortCondition) + nz(sum_short[1])
    sum_long := 0.0
PositionPrice := longCondition ? sum_long/(sectionLongs) : shortCondition  ? sum_short/(sectionShorts) : na


plot(SMA1, color=color.gray,style= plot.style_stepline, title="5", linewidth=1)
plot(SMA2, color=color.gray,style= plot.style_stepline, title="15", linewidth=2)
plot(SMA3, color=color.black,style= plot.style_stepline, title="55", linewidth=3)
plot(PositionPrice, title = "Average Price", color = color.white, linewidth = 7, style = plot.style_circles, transp = 0, editable = false)


if Long_MA and Volume_condt and L_adx and not S_cloud
    strategy.entry                                                              ("L", strategy.long)

strategy.close_all( when =  close_condt )



```

> Detail

https://www.fmz.com/strategy/360018

> Last Modified

2022-05-07 13:52:58
