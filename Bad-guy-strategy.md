
> Name

Bad-guy-strategy

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_open|0|src: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|0|Longs / Shorts: Both|Longs|Shorts|
|v_input_5|5|SL [%]|
|v_input_6|false|Activate leverage?|
|v_input_7|3|Max lev.|
|v_input_8|50|Volume lenght lev.|
|v_input_3|0.7|(?Backtesting)TP_L [%]|
|v_input_4|0.9|TP_S [%]|
|v_input_9|true|(?BACKTEST)Backtest|
|v_input_10|true|Longs|
|v_input_11|true|Shorts|
|v_input_12|100|risk|
|v_input_13|2000|start year|
|v_input_14|true|start month|
|v_input_15|true|start day|
|v_input_16|3333|stop year|
|v_input_17|12|stop month|
|v_input_18|31|stop day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/
//@version=4
strategy("坏b的策略", overlay = true, pyramiding=1,initial_capital = 10000, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.04)

//SOURCE =============================================================================================================================================================================================================================================================================================================

src                 =                   input(open)

// POSITION ==========================================================================================================================================================================================================================================================================================================

Position            =                   input("Both",                           title= "Longs / Shorts",                                    options = ["Both","Longs","Shorts"])

is_Long             =                   Position                                                    == "SHORT" ? na : true
is_Short            =                   Position                                                    == "LONG" ? na : true


ADX_options         =                   "MASANAKAMURA"
ADX_len             =                   22
th                  =                   19



c1                =                   19
c2                =                   2.5


x1         =                   12
x2         =                   16                                                            
x3         =                   9                                                        


u          =                   3.3
o          =                   20

n1                 =                   ""
n2                 =                   high


v1                 =                   0.5     
v2                 =                   0.2
v3                 =                   0.4

y          =                   2.7
i          =                   33                                                               


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

a1                 =                                                                                                                               ema(src, x1)
a2                 =                                                                                                                               ema(src, x2)
a3                    =                                                                                                                               a1 - a2
a4                 =                                                                                                                               sma(a3, x3)
L_a3                  =                                                       a3 > a4 
S_a3                  =                                                       a3 < a4 


var bool L_d = na,  var bool S_d = na

q(_src, _c1, _c2)=>
    var float d1   =                                                                                                                   0.0
    var float d2 =                                                                                                                   0.0
    d3                =                                                                                                                   (_c1*2) - 1
    d4               =                                                                                                                   ema(abs(_src - _src[1]), _c1)
    d5          =                                                                                                                   ema(d4, d3)*_c2
    d6               =                                                                                                                   _src
    d6               :=                                                                                                                  _src > nz(d6[1]) ? ((_src-d5) < nz(d6[1]) ? nz(d6[1]) : (_src-d5)) : ((_src+d5) > nz(d6[1]) ? nz(d6[1]) : (_src+d5))
    d1             :=                                                                                                                  d6 > d6[1] ? nz(d1[1]) + 1 : d6 < d6[1] ? 0 : nz(d1[1])
    d2           :=                                                                                                                  d6 < d6[1] ? nz(d2[1]) + 1 : d6 > d6[1] ? 0 : nz(d2[1])
    [d5,d6,d1,d2]
[d7, d8, d9, d10] = q(src, c1, c2)
d11                   =                                                                                                                   d8 + d7
d12                   =                                                                                                                   d8 - d7
L_d                    :=                                                      high > d11 and d9 > 0
S_d                    :=                                                      low < d12 and d10 > 0


f                     =                                                                                                                   sar(v1, v2, v3)
L_f                   =                                                       (f < close)
S_f                   =                                                       (f > close)


g1            =                                                       volume > sma(volume,o)*u
g2  =                                                       volume > sma(volume,i  )*y


h1                                        =                                                                                                                                                           20
j                                        =                                                                                                                                                           3.0
k                                         =                                                                                                                                                           security(syminfo.tickerid, n1, sma(n2 , h1))

k1                                         =                                                                                                                                                           k + security(syminfo.tickerid, n1, stdev(n2 , h1)) * j
l1                                         =                                                                                                                                                           k - security(syminfo.tickerid, n1, stdev(n2 , h1)) * j

L_BB_2 = close > k1
S_BB_2 = close > l1



//L/S variables----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var bool longCond                    = na, var bool shortCond                   = na, longCond := nz(longCond[1]), shortCond := nz(shortCond[1])
var int CondIni_long                 = 0, var int CondIni_short                 = 0, CondIni_long := nz(CondIni_long[1]), CondIni_short := nz(CondIni_short[1])
var bool Final_longCondition         = na, var bool Final_shortCondition        = na, Final_longCondition := nz(Final_longCondition[1]), Final_shortCondition := nz(Final_shortCondition[1])
var bool BT_Final_longCondition      = na, var bool BT_Final_shortCondition     = na, BT_Final_longCondition := nz(BT_Final_longCondition[1]), BT_Final_shortCondition := nz(BT_Final_shortCondition[1])
var float last_open_longCondition    = na, var float last_open_shortCondition   = na
var int last_longCondition           = na, var int last_shortCondition          = na
var int nLongs = na, var int nShorts = na, nLongs := nz(nLongs[1]), nShorts     := nz(nShorts[1])

//STRATEGY ==========================================================================================================================================================================================================================================================================================================



L_1 =                                                              L_adx and g2 and L_d and L_f and L_a3
S_1 =                                                              S_adx and g2 and S_d and S_f and S_a3
//加限制
L_2   =                                                               L_adx and L_f and L_a3 and L_d  and  g1 and g2
S_2   =                                                               S_adx and S_f and S_a3 and S_d  and  g1 and g2


L_3 =                                                             L_adx and L_BB_2 and g1 and g2 and L_d and L_a3
S_3 =                                                             S_adx and S_BB_2 and g1 and g2 and S_d and S_a3

Final_Long_Condt =                                                              L_2 or L_1 or L_3
Final_Short_Condt =                                                             S_2 or S_1 or S_3

longCond        :=                                                              Final_Long_Condt
shortCond       :=                                                              Final_Short_Condt

CondIni_long    :=                                                              longCond[1] ? 1 : shortCond[1] ? -1 : nz(CondIni_long[1])
CondIni_short   :=                                                              longCond[1] ? 1 : shortCond[1] ? -1 : nz(CondIni_short[1])
longCondition   =                                                               (longCond[1] and nz(CondIni_long[1]) == -1)
shortCondition  =                                                               (shortCond[1] and nz(CondIni_short[1]) == 1)

// Price position----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var int last_long_sl = na, var int last_short_sl = na
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

Final_longCondition                 := is_Long          and longCondition
Final_shortCondition                := is_Short         and shortCondition

//TP_1 -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

tp_l                     = input(0.7, "TP_L [%]",                     type    = input.float, step = 0.1, group="Backtesting") 
tp_s                     = input(0.9, "TP_S [%]",                     type    = input.float, step = 0.1, group="Backtesting") 

var bool long_tp        = na, var bool short_tp                                     = na
var int last_long_tp    = na, var int last_short_tp                                 = na
var bool Final_Long_tp  = na, var bool Final_Short_tp                               = na, Final_Long_tp := nz(Final_Long_tp[1]), Final_Short_tp := nz(Final_Short_tp[1])
long_tp                 := (is_Long and high > (last_open_longCondition*(1+(tp_l/100))) and  in_longCondition)
short_tp                := (is_Short and low < (last_open_shortCondition*(1-(tp_s/100))) and  in_shortCondition)
last_long_tp            := long_tp ? time : nz(last_long_tp[1])
last_short_tp           := short_tp ? time : nz(last_short_tp[1])
Final_Long_tp           := (long_tp and last_longCondition > nz(last_long_tp[1]) and last_longCondition > nz(last_long_sl[1]))
Final_Short_tp          := (short_tp and last_shortCondition > nz(last_short_tp[1]) and last_shortCondition > nz(last_short_sl[1]))
l_h = iff(Final_Long_tp, last_open_longCondition*(1+(tp_l/100)), na),
s_h = iff(Final_Short_tp, last_open_shortCondition*(1-(tp_s/100)), na)


// SL ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

sl                      = input(5, "SL [%]",                      type    = input.float, step = 0.1)
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

Act_Lev                 =           input(false,                                title="Activate leverage?"                                                                                                                  )
Max_Lev                 =           input(3,                                    title="Max lev.",                                                               type    = input.integer,   minval = 1,     maxval = 5       )
o_lev          =           input(50,                                   title="Volume lenght lev.",                                                     minval  = 1                                                 )

long = ((longCond and not in_longCondition) or (longCond and Final_Long_tp) or (longCond and Final_Long_sl)) or (longCond and not longCondition and (last_long_tp> nz(last_longCondition))) or (longCond and not longCondition and (last_long_sl > nz(last_longCondition))) 
Long      = (longCond and not in_longCondition) or (longCond and Final_Long_tp) or (longCond and Final_Long_sl) or (longCond and not longCondition and (last_long_tp >= nz(last_longCondition))) or (longCond and not longCondition and (last_long_sl >= nz(last_longCondition)))
short = ((shortCond and not in_shortCondition) or (shortCond and Final_Short_tp) or (shortCond and Final_Short_sl)) or (shortCond and not shortCondition and (last_short_tp > nz(last_shortCondition))) or (shortCond and not shortCondition and (last_short_sl > nz(last_shortCondition))) 
Short     = (shortCond and not in_shortCondition) or (shortCond and Final_Short_tp) or (shortCond and Final_Short_sl) or (shortCond and not shortCondition and (last_short_tp >= nz(last_shortCondition))) or (shortCond and not shortCondition and (last_short_sl >= nz(last_shortCondition)))




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
   

// PLOTSPAHES ======================================================================================================================================================================================================================================================================================================

plotshape(Final_Long_tp ,                 title="Long TP HIT",            style=shape.flag,                       location=location.abovebar,                         color=color.red,            size=size.small ,          textcolor=color.red,             transp = 0                          ) 
plotshape(Final_Short_tp ,                title="Short TP HIT",           style=shape.flag,                       location=location.belowbar,                         color=color.green,          size=size.small ,          textcolor=color.green,           transp = 0                          ) 

//BACKTESTING inputs --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ACT_BT              =                   input(true,                             title="Backtest",                                           type = input.bool,                                                              group= "BACKTEST")
long_               =                   input(true,                             title="Longs",                                                                                                                              group= "BACKTEST")
short_              =                   input(true,                             title="Shorts",                                                                                                                             group= "BACKTEST")
risk                =                   input(100,                                                                                                                                                                          group= "BACKTEST")
testStartYear       =                   input(2000,                             title="start year",                                         minval = 1997, maxval = 3000,                                                   group= "BACKTEST") 
testStartMonth      =                   input(01,                               title="start month",                                        minval = 1, maxval = 12,                                                        group= "BACKTEST")
testStartDay        =                   input(01,                               title="start day",                                          minval = 1, maxval = 31,                                                        group= "BACKTEST")
testPeriodStart     =                   timestamp(testStartYear,testStartMonth,testStartDay,0,0)
testStopYear        =                   input(3333,                             title="stop year",                                          minval=1980, maxval = 2222,                                                     group= "BACKTEST")
testStopMonth       =                   input(12,                               title="stop month",                                         minval=1, maxval=12,                                                            group= "BACKTEST")
testStopDay         =                   input(31,                               title="stop day",                                           minval=1, maxval=31,                                                            group= "BACKTEST")
testPeriodStop      =                   timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)
testPeriod          =                   time >= testPeriodStart and time <= testPeriodStop ? true : false

//BACKTESTING--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

if long and ACT_BT
    strategy.entry("L", strategy.long,when = testPeriod)


if short and ACT_BT
    strategy.entry("S", strategy.short,when = testPeriod)


strategy.exit("TP_L", "L", profit = (abs((last_open_longCondition   *       (1+(tp_l/100)))-last_open_longCondition)/syminfo.mintick),    loss = (abs((last_open_longCondition    *   (1-(sl/100)))-last_open_longCondition)/syminfo.mintick  ))

strategy.exit("TP_S", "S", profit = (abs((last_open_shortCondition  *       (1-(tp_s/100)))-last_open_shortCondition)/syminfo.mintick),   loss = (abs((last_open_shortCondition   *   (1+(sl/100)))-last_open_shortCondition)/syminfo.mintick ))


```

> Detail

https://www.fmz.com/strategy/380294

> Last Modified

2022-08-29 20:51:48
