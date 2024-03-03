
> Name

Johnys-BOT

> Author

ChaoZhang

> Strategy Description

Hello


This is updated version of 60MIN bot,
I decided to make this bot for people who still using 10BOT,
This is much more profitable and reliable version

THIS IS SO IMPORTANT for users

As always, this bot is ONLY FOR
BINANCE:BTCUSDTPERP

To make this result as true as possible, I decided to use as few indicators as possible
which translates into more positions, which means that the bot is quick to react to any change in trend
Unfortunately, as a result, the quality of opened positions has decreased quite strongly ( 79% profitable trades)
It also consists of a fairly high target point and basically a low stop-loss.

TP: 1.5
SL: 7.2

The bot uses the most efficient and most important indicators such as:

ADX - Is one of the most powerful and accurate trend indicators. ADX measures how strong a trend is, and can give valuable information on whether there is a potential trading opportunity.
CLOUD - This is one of the newset indicators I'm using. This indicator helps strategy , this indicator is designed to indicate the correct market trend. By applying the great length of this indicator, I am able to notice a change in the trend a little later, but more accurately.
RANGE FILTER - this indicator is for the better view of trends, define trends, that is important for every bull/bear traps which helps a lot becouse of the very variable trends.
FAST MA - like previous ones this is for better view of trends, and correctly define the trends, also Speed_MA are using for predict the future price action.
MACD - Moving average convergence divergence ( MACD ) is a trend-following momentum indicator that shows the relationship between two moving averages of a security’s price. The MACD is calculated by subtracting the 26-period exponential moving average ( EMA ) from the 12-period EMA .
VOLUME - is the most important indicator for the strategy, to avoid open trades on flat chart, new trades are open after a strong volume bars.
RSI - value helps strategy to stop trade in right time. When RSI is overbought strategy don't open new longs , also when RSI is oversold strategy don't open new shorts

using these indicators, the bot opens about 75-80% of positions
in addition, I created two independent of the main condition of the possibility of opening a position such as:

REVERSALS (based of rsi crossovers) - this option, can add more speed to make right decision, while trends are changin very fast.
BOLLINGER BANDS - this function has also increased the possibilities of opening and closing new positions, it works in such a way that if the candle is closed outside the Bolinger bands, more positions are opened, I focused on this function in order to maintain a high percentage level as much as possible

To maintain the high quality of trades, both Bollinger Bands and Reversals are dependent on the most important indicators

I think that the results of this bot are the most correct, but let's not forget that backtesting is testing in the past, it is not known how the bot will behave in the future, however, the use of indicators that are not very optimized, can bring the result very close in the future

Good luck and enjoy ;)

**backtesting**

 ![IMG](https://www.fmz.com/upload/asset/159efe4661da93e1142.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_high|0|src: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_26|15|leftBars|
|v_input_27|7|rightBars|
|v_input_2|0|(?ADX_options)ADX_options option: MASANAKAMURA|CLASSIC|
|v_input_3|13|ADX_options lenght|
|v_input_4|15|ADX_options treshold|
|v_input_5|7|(?Cloud)Cloud Length|
|v_input_6|0.015|(?SAR)SAR Start|
|v_input_7|0.018|SAR Increment|
|v_input_8|0.1|SAR Maximum|
|v_input_9|10|(?Range Filter)Period|
|v_input_10|1.5|mult.|
|v_input_11|6|(?MACD)Fast Length|
|v_input_12|8|Slow Length|
|v_input_13|17|Signal Smoothing|
|v_input_14|0.8|(?Volume)Volume mult.|
|v_input_15|37|Volume lenght|
|v_input_16|25|(?RSI)Rsi Lenght|
|v_input_17|true|(?Bollinger Bands)Show BB |
|v_input_18|true|Show MA |
|v_input_19||Timeframe |
|v_input_20_high|0|Source : high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_21|10|Period |
|v_input_22|2.1|Deviation |
|v_input_23|66|(?Fast MA)MA Length|
|v_input_24|2|AvgType|
|v_input_25|true|(?REVERSAL)REVERSAL|
|v_input_28|64|REV Rsi Overbought|
|v_input_29|34|REV RSI Oversold|
|v_input_30|1.5|(?TP PLOTSHAPE)TP Long|
|v_input_31|1.5|TP Short|
|v_input_32|true|(?SL PLOTSHAPE)Stop loss?|
|v_input_33|7.2|% Stop loss|
|v_input_34|true|(?BACKTEST)Longs|
|v_input_35|true|Shorts|
|v_input_36|0.015| TP/100|
|v_input_37|0.072| SL/100|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-05-01 00:00:00
end: 2022-05-16 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy("Johny's BOT [60MIN]", overlay=true,  pyramiding=1,initial_capital = 10000, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.04)

//SOURCE =============================================================================================================================================================================================================================================================================================================

src                 =                   input(high)

// INPUTS ============================================================================================================================================================================================================================================================================================================

// ADX --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ADX_options         =                   input("MASANAKAMURA",                   title = "ADX option",                                       options = ["CLASSIC", "MASANAKAMURA"],                                          group = "ADX")
ADX_len             =                   input(13,                               title = "ADX lenght",                                       type = input.integer, minval = 1,                                               group = "ADX")
th                  =                   input(15,                               title = "ADX treshold",                                     type = input.float, minval = 0, step = 0.5,                                     group = "ADX")

// Cloud --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

len                 =                   input(7,                               title="Cloud Length",                                                                                                                       group="Cloud")

//SAR----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

start               =                   input(0.015,                            title="SAR Start",                                          type=input.float, step=0.001 ,                                                  group="SAR")       
increment           =                   input(0.018,                            title="SAR Increment",                                      type=input.float, step=0.001 ,                                                  group="SAR")     
maximum             =                   input(0.1,                              title="SAR Maximum",                                        type=input.float, step=0.01 ,                                                   group="SAR")       

// Range Filter ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

per_                =                   input(10,                               title="Period",                                           minval=1,                                                                       group = "Range Filter")
mult                =                   input(1.5,                              title="mult.",                                              minval=0.1, step = 0.1,                                                         group = "Range Filter")

//MACD----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

fast_length         =                   input(6,                                title="Fast Length",                                        type=input.integer,                                                             group="MACD")
slow_length         =                   input(8,                                title="Slow Length",                                        type=input.integer,                                                             group="MACD")
signal_length       =                   input(17,                               title="Signal Smoothing",                                   type=input.integer,                                                             group="MACD")

// Volume ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

volume_f            =                   input(0.8,                              title="Volume mult.",                                       minval = 0, step = 0.1,                                                         group="Volume")
sma_length          =                   input(37,                               title="Volume lenght",                                      minval = 1,                                                                     group="Volume")


// RSI -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

RSI_len             = input(25,                                                 title="Rsi Lenght",                                         minval = 1,                                                                     group="RSI")

//BOLINGER BANDS ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// inputs

bb1                 =                   input(true,                             title="Show BB ",                                                                                                                          group="Bollinger Bands")
m1                  =                   input(true,                             title="Show MA ",                                                                                                                          group="Bollinger Bands")
tf1                 =                   input("",                               title = "Timeframe ",                                      type = input.resolution,                                                        group="Bollinger Bands")
src1                =                   input(high,                            title = "Source ",                                         type = input.source,                                                            group="Bollinger Bands")
per1                =                   input(10,                               title = "Period ",                                         type = input.integer, minval = 2,                                               group="Bollinger Bands")
dev1                =                   input(2.1,                              title = "Deviation ",                                      type = input.float, minval = 1,                                                 group="Bollinger Bands")

//MA----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

length              =                   input(66,                               title="MA Length",                                          minval=1,                                                                       group="Fast MA" )
matype              =                   input(2,                                title="AvgType",                                            minval=1, maxval=5,                                                             group="Fast MA")

//REVERSAL ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ACT_REV             =                   input(true,                             title = "REVERSAL",                                         type = input.bool,                                                              group="REVERSAL")
leftBars            =                   input(15)
rightBars           =                   input(7)
rsi_ob              =                   input(64,                               title="REV Rsi Overbought",                                                                                                                 group="REVERSAL")
rsi_os              =                   input(34,                               title="REV RSI Oversold",                                                                                                                   group="REVERSAL")

//TP PLOTSHAPE -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

tp_long0            =                   input(1.5,                              title="TP Long",                                          type = input.float,     minval = 0,     step = 0.1,                               group="TP PLOTSHAPE") 
tp_short0           =                   input(1.5,                              title="TP Short",                                         type = input.float,     minval = 0,     step = 0.1,                               group="TP PLOTSHAPE") 

// SL PLOTSHAPE ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Act_sl              =                   input(true,                             title="Stop loss?",                                       type = input.bool,                                                                group="SL PLOTSHAPE")
sl0                 =                   input(7.2,                              title="% Stop loss",                                      type = input.float,     minval = 0,     step = 0.1,                               group="SL PLOTSHAPE")

//INDICATORS =============================================================================================================================================================================================================================================================================================================

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

//SAR------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

psar                                    =                                                                                                   sar(start, increment, maximum)
dir                                     =                                                                                                   psar < close ? 1 : -1
L_sar                                   =                                       dir ==1
S_sar                                   =                                       dir ==-1

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

fast_ma                 =                                                                                                                               ema(src, fast_length)
slow_ma                 =                                                                                                                               ema(src, slow_length)
macd                    =                                                                                                                               fast_ma - slow_ma
signal_                 =                                                                                                                               sma(macd, signal_length)
L_macd                  =                                                       macd > signal_ 
S_macd                  =                                                       macd < signal_ 

// RSI -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

WiMA(src, length) => 
    var float MA_s=0.0
    MA_s               :=                                                                                                                   (src + nz(MA_s[1] * (length-1)))/length
    MA_s
RSI_Volume(fv, length) =>	
	up                  =                                                                                                                   iff(fv>fv[1],abs(fv-fv[1])*volume,0)
	dn                  =                                                                                                                   iff(fv<fv[1],abs(fv-fv[1])*volume,0)
	upt                 =                                                                                                                   WiMA(up,length)
	dnt                 =                                                                                                                   WiMA(dn,length)
	100*(upt/(upt+dnt))
RSI_V                   =                                                                                                                   RSI_Volume(src, RSI_len)
RSI_                    =                                                                                                                   52

L_rsi                   =                                                       (RSI_V > RSI_)
S_rsi                   =                                                       (RSI_V < RSI_)

// Volume -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Volume_condt            =                                                       volume > sma(volume,sma_length)*volume_f

// BOLINGER BADNS -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ma1                     =                                                                                                                   security(syminfo.tickerid, tf1, sma(src1, per1))
hb1                     =                                                                                                                   ma1 + security(syminfo.tickerid, tf1, stdev(src1, per1)) * dev1
lb1                     =                                                                                                                   ma1 - security(syminfo.tickerid, tf1, stdev(src1, per1)) * dev1

L_BB                                        =                                   open > hb1
S_BB                                        =                                   open < lb1

//MA------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

simplema                =                                                                                                                   sma(src,length)
exponentialma           =                                                                                                                   ema(src,length)
hullma                  =                                                                                                                   wma(2*wma(src, length/2)-wma(src, length), round(sqrt(length)))
weightedma              =                                                                                                                   wma(src, length)
volweightedma           =                                                                                                                   vwma(src, length)
avgval                  =                                                                                                                   matype==1 ? simplema : matype==2 ? exponentialma : matype==3 ? hullma : matype==4 ? weightedma : matype==5 ? volweightedma : na
MA_speed                =                                                                                                                   (avgval / avgval[1] -1 ) *100
L_s_ma                  =                                                       MA_speed > 0 
S_s_ma                  =                                                       MA_speed < 0 

//REVERSAL ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

swh                                         =                                                                                                                                                           pivothigh(leftBars,rightBars)
swl                                         =                                                                                                                                                           pivotlow(leftBars, rightBars)
pivots                                      =                                                                                                                                                           not na(swh)? swh: not na(swl)? swl : na
swh_cond                                    =                                                                                                                                                           not na(swh)
hprice                                      =                                                                                                                                                           0.0
hprice                                      :=                                                                                                                                                          swh_cond ? swh : hprice[1]
le                                          =                                                                                                                                                           false
le                                          :=                                                                                                                                                          swh_cond ? true : (le[1] and high > hprice ? false : le[1]) and (rsi(close, 14)<rsi_ob)
swl_cond                                    =                                                                                                                                                           not na(swl)
lprice                                      =                                                                                                                                                           0.0
lprice                                      :=                                                                                                                                                          swl_cond ? swl : lprice[1]
se                                          =                                                                                                                                                           false
se                                          :=                                                                                                                                                          swl_cond ? true : (se[1] and  low < lprice ? false : se[1]) and (rsi(close, 14)>rsi_os)
le_se                                       =                                                                                                                                                           0
le_se                                       :=                                                                                                                                                          ( crossover(high,hprice+syminfo.mintick) )? +1 : ( crossunder(low,lprice-syminfo.mintick) )? -1 : nz(le_se[1])
_le_se                                      =                                                                                                                                                           le_se[1]==-1 and le_se==+1 and rsi(close, 14)<rsi_ob? 1 : le_se[1]==+1 and le_se==-1 and rsi(close, 14)>rsi_os? -1 :0 
L_REV                                       =                                   _le_se==+1
S_REV                                       =                                   _le_se==-1

//CONDITIONS =======================================================================================================================================================================================================================================================================================================

L_rev_condt             =                                                       L_REV and ACT_REV
S_rev_condt             =                                                       S_REV and ACT_REV

//STRATEGY ==========================================================================================================================================================================================================================================================================================================


L_basic_condt           =                                                       L_adx and L_cloud and L_sar and L_RF and L_macd and L_rsi and L_s_ma and Volume_condt
S_basic_condt           =                                                       S_adx and S_cloud and S_sar and S_RF and S_macd and S_rsi and S_s_ma and Volume_condt

L_second_condt          =                                                       L_basic_condt or L_BB and L_adx and L_sar and L_rsi 
S_second_condt          =                                                       S_basic_condt or S_BB and S_adx and S_sar and S_rsi 

L_third_condt           =                                                       L_second_condt or L_rev_condt and L_adx and L_sar and Volume_condt
S_third_condt           =                                                       S_second_condt or S_rev_condt and S_adx and S_sar and Volume_condt

// PRICE POSITION ==========================================================================================================================================================================================================================================================================================================

var bool longCond = na, var bool shortCond = na
var int CondIni_long = 0, var int CondIni_short = 0
var bool _Final_longCondition = na, var bool _Final_shortCondition = na
var float last_open_longCondition = na, var float last_open_shortCondition = na
var int last_longCondition = na, var int last_shortCondition = na
var int last_Final_longCondition = na, var int last_Final_shortCondition = na
var int nLongs = na, var int nShorts = na
var float sum_long = 0.0, var float sum_short = 0.0
var float Position_Price = 0.0
var bool Final_long_BB = na, var bool Final_short_BB = na
var int last_long_BB = na, var int last_short_BB = na

longCond                :=                                                      L_third_condt
shortCond               :=                                                      S_third_condt


CondIni_long                := longCond[1]              ? 1 :                   shortCond[1] ? -1 :                             nz(CondIni_long[1]                                          )
CondIni_short               := longCond[1]              ? 1 :                   shortCond[1] ? -1 :                             nz(CondIni_short[1]                                         )

longCondition               = (longCond[1]              and                                                                     nz(CondIni_long[1])                 == -1                   )
shortCondition              = (shortCond[1]             and                                                                     nz(CondIni_short[1])                ==  1                   )

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

//SL ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Risk                =7.2
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
    
// Colors ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ADX_COLOR           =   L_adx ? color.lime : S_adx ? color.red :  color.orange
SCALPS_COLOR        =   L_rev_condt ? color.lime : S_rev_condt ? color.maroon : na
BAR_COLOR           =   L_adx ? color.lime : S_adx ? color.red : L_rev_condt ? color.blue : S_rev_condt ? color.maroon : color.orange
barcolor                                                                        (color = BAR_COLOR)

//Indicator plots ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


psarPlot    =   plot(psar,          title="Psar Plot",              style=plot.style_circles,                                                                   color=ADX_COLOR,                                                                                      linewidth=1, transp=0         )
plot((bb1 and m1) ? ma1 : na, title = "MA1", color = ADX_COLOR, transp = 0, linewidth = 1)
hband1 = plot(bb1 ? hb1 : na, title = "HBand1", color = #006064, style = plot.style_line, linewidth = 2)
lband1 = plot(bb1 ? lb1 : na, title = "LBand1", color = color.maroon, style = plot.style_line, linewidth = 2)
fill(hband1, lband1, title = "BG1", color = ADX_COLOR, transp = 85)
mama_p      =   plot(mama,          title="Cloud A",                                                                                                            color=ADX_COLOR                                                                                                                     )
fama_p      =   plot(fama,          title="Cloud B",                                                                                                            color=ADX_COLOR                                                                                                                     )
fill                                    (mama_p,fama_p,                                                                                                         color=ADX_COLOR  )

//Price plots ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

plot((nLongs > 1) or (nShorts > 1) ? Position_Price : na, title = "Price", color = in_longCondition ? color.aqua : color.orange, linewidth = 2, style = plot.style_cross)
plot(tplLevel,                      title="Long TP ",               style = plot.style_cross,                                                                   color=color.green,                                                                                      linewidth = 1               )
plot(tpsLevel,                      title="Short TP ",              style = plot.style_cross,                                                                   color=color.red,                                                                                        linewidth = 1               )

//PLOTSHAPES----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

plotshape(Final_Long_tp,            title="TP Long Signal",         style = shape.flag,                     location=location.abovebar,                         color=color.red,            size=size.small ,       text="TP",          textcolor=color.red,            transp = 0                  ) 
plotshape(Final_Short_tp,           title="TP Short Signal",        style = shape.flag,                     location=location.belowbar,                         color=color.green,          size=size.small ,       text="TP",          textcolor=color.green,          transp = 0                  ) 

plotshape(Final_Long_sl,            title="SL Long",                style=shape.xcross,                     location=location.belowbar,                         color=color.fuchsia,        size=size.small ,       text ="SL",                                         transp = 0                  ) 
plotshape(Final_Short_sl,           title="SL Short",               style=shape.xcross,                     location=location.abovebar,                         color=color.fuchsia,        size=size.small ,       text ="SL",                                         transp = 0                  ) 

plotshape(longCondition,            title="Long",                   style=shape.triangleup,                 location=location.belowbar,                         color=color.blue,           size=size.small ,       text="Long",        textcolor=color.white,          transp = 0                  )
plotshape(shortCondition,           title="Short",                  style=shape.triangledown,               location=location.abovebar,                         color=color.red,            size=size.small ,       text="Short",       textcolor=color.white,          transp = 0                  )

//BACKTESTING inputs --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

long_               =                   input(true,                             title="Longs",                                                                                                                              group= "BACKTEST")
short_              =                   input(true,                             title="Shorts",                                                                                                                             group= "BACKTEST")

// Backtest tp & sl ================================================================================================================================================================================================================================================================================================================================

g(v, p)                                                                         =>                                                                                      round(v * (pow(10, p))) / pow(10, p)

tp_=                                    input(0.015,                            title=" TP/100",                                            step=0.001,                                                                     group= "BACKTEST")
sl_=                                    input(0.072,                            title=" SL/100",                                            step=0.001,                                                                     group= "BACKTEST")

// Backtest Long ==================================================================================================================================================================================================================================================================================================================================


if long_
    strategy.entry("L"                          ,1,                                                             when = L_third_condt                 )
    strategy.exit("S_tp/sl", "L", profit=close * tp_ / syminfo.mintick, loss=close * sl_ / syminfo.mintick)
    
// Backtest Short ==================================================================================================================================================================================================================================================================================================================================

if short_

    strategy.entry("S"                          ,0,                                                             when = S_third_condt             )
    strategy.exit("S_tp/sl", "S", profit=close * tp_ / syminfo.mintick, loss=close * sl_ / syminfo.mintick)








```

> Detail

https://www.fmz.com/strategy/363970

> Last Modified

2022-05-18 10:24:18
