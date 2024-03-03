
> Name

Angle-Attack-Follow-Line-Indicator

> Author

ChaoZhang

> Strategy Description

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/16a58102a271d57e8ea.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true| FOLLOW LINE CURRENT CHART RESOLUTION |
|v_input_int_1|21|Period|
|v_input_float_1|true|Deviations|
|v_input_2|true|ATR Filter|
|v_input_int_2|5|ATR Period|
|v_input_3|true| FOLLOW LINE HIGHER TIME FRAME |
|v_input_4|true|Activate Indicator Background|
|v_input_string_1|0|Type Of MA: SMA|RMA|EMA|WMA|VWMA|SMMA|KMA|TMA|HullMA|DEMA|TEMA|CTI|
|v_input_timeframe_1|240|Resolution|
|v_input_5|21|Period|
|v_input_float_2|true|Deviations|
|v_input_int_3|5|ATR Period|
|v_input_6_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|true| MODE |
|v_input_string_2|0|Type Of Mode: NO FILTER HIGHER TIME FRAME|FILTER HIGHER TIME FRAME|
|v_input_8|true| ANGLE CONFIGURATION |
|v_input_int_4|8|Angle Period|
|v_input_int_5|10|ATR Period|
|v_input_9|true| BUY/SELL |
|v_input_10|true|Buy Change Follow Line|
|v_input_11|true|Sell Change Follow Line|
|v_input_12|true| OPTIONS TO ADD |
|v_input_13|true|Option 1 to Add Buy|
|v_input_14|true|Option 1 to Add Sell|
|v_input_15|false|Option 2 to Add Buy|
|v_input_16|false|Option 2 to Add Sell|
|v_input_17|false|Option 3 to Add Buy|
|v_input_18|false|Option 3 to Add Sell|
|v_input_19|true| OPTIONS TO REDUCE |
|v_input_int_6|40|Max Angle Level 1|
|v_input_int_7|65|Max Angle Level 2|
|v_input_int_8|-40|Min Angle Level 1|
|v_input_int_9|-65|Min Angle Level 2|
|v_input_20|true|Option 1 to Reduce Buy Max Angle Level 1|
|v_input_21|true|Option 2 to Reduce Buy Max Angle Level 2|
|v_input_22|false|Option 3 to Reduce Buy 2 Bars Above Max Angle Level 2|
|v_input_23|true|Option 4 to Reduce Buy 3 Bars Above Max Angle Level 2|
|v_input_24|false|Option 5 to Reduce Buy 4 Bars Above Max Angle Level 2|
|v_input_25|true|Option 1 to Reduce Sell Min Angle Level 1|
|v_input_26|true|Option 2 to Reduce Sell Min Angle Level 1|
|v_input_27|false|Option 3 to Reduce Sell 2 bars Below Min Angle Level 2|
|v_input_28|true|Option 4 to Reduce Sell 3 bars Below Min Angle Level 2|
|v_input_29|false|Option 5 to Reduce Sell 4 bars Below Min Angle Level 2|
|v_input_30|true| OTHERS |
|v_input_31|true|Bar Color?|
|v_input_32|false|Hide Labels|
|v_input_33|14|len|
|v_input_34|20|th|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-05-02 00:00:00
end: 2022-05-08 23:59:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © cmlaydinn

//@version=5
indicator(shorttitle='Teyfık', title='Angle Attack Follow Line Indicator ', overlay=false, max_bars_back=1000)

//INPUTS ————————————————————————————————————————————————————————————
FL = input(title=' FOLLOW LINE CURRENT CHART RESOLUTION ', defval=true)

BBperiod = input.int(defval=21, title='Period', minval=1)
BBdeviations = input.float(defval=1.00, title='Deviations', minval=0.1, step=0.05)
UseATRfilter = input(defval=true, title='ATR Filter')
ATRperiod = input.int(defval=5, title='ATR Period', minval=1)

FLH = input(title=' FOLLOW LINE HIGHER TIME FRAME ', defval=true)

AIB = input(defval=true, title='Activate Indicator Background')
TYPE = input.string(title='Type Of MA', defval='SMA', options=['RMA', 'SMA', 'EMA', 'WMA', 'VWMA', 'SMMA', 'KMA', 'TMA', 'HullMA', 'DEMA', 'TEMA', 'CTI'])
RES = input.timeframe('240', title='Resolution')
LEN = input(21, title='Period')
BBdeviations_ = input.float(defval=1.00, title='Deviations', minval=0.1, step=0.05)
ATRperiod_ = input.int(defval=5, title='ATR Period', minval=1)
SOUR = input(title='Source', defval=close)

MD = input(title=' MODE ', defval=true)

MODE = input.string(title='Type Of Mode', defval='NO FILTER HIGHER TIME FRAME', options=['NO FILTER HIGHER TIME FRAME', 'FILTER HIGHER TIME FRAME'])

AC = input(title=' ANGLE CONFIGURATION ', defval=true)

i_lookback = input.int(8, 'Angle Period', minval=1)
i_atrPeriod = input.int(10, 'ATR Period', minval=1)

BSA = input(title=' BUY/SELL ', defval=true)

Buy_0 = input(defval=true, title='Buy Change Follow Line')
Sell_0 = input(defval=true, title='Sell Change Follow Line')

OTA = input(title=' OPTIONS TO ADD ', defval=true)

Add_Buy_0 = input(defval=true, title='Option 1 to Add Buy')
Add_Sell_0 = input(defval=true, title='Option 1 to Add Sell')
Add_Buy_1 = input(defval=false, title='Option 2 to Add Buy')
Add_Sell_1 = input(defval=false, title='Option 2 to Add Sell')
Add_Buy_2 = input(defval=false, title='Option 3 to Add Buy')
Add_Sell_2 = input(defval=false, title='Option 3 to Add Sell')

OTR = input(title=' OPTIONS TO REDUCE ', defval=true)

Max_level_1 = input.int(defval=40, title='Max Angle Level 1', minval=1)
Max_level_2 = input.int(defval=65, title='Max Angle Level 2', minval=1)
Min_level_1 = input.int(defval=-40, title='Min Angle Level 1', minval=-100)
Min_level_2 = input.int(defval=-65, title='Min Angle Level 2', minval=-100)
Red_Buy_0 = input(defval=true, title='Option 1 to Reduce Buy Max Angle Level 1')
Red_Buy_1 = input(defval=true, title='Option 2 to Reduce Buy Max Angle Level 2')
Red_Buy_2 = input(defval=false, title='Option 3 to Reduce Buy 2 Bars Above Max Angle Level 2')
Red_Buy_3 = input(defval=true, title='Option 4 to Reduce Buy 3 Bars Above Max Angle Level 2')
Red_Buy_4 = input(defval=false, title='Option 5 to Reduce Buy 4 Bars Above Max Angle Level 2')
Red_Sell_0 = input(defval=true, title='Option 1 to Reduce Sell Min Angle Level 1')
Red_Sell_1 = input(defval=true, title='Option 2 to Reduce Sell Min Angle Level 1')
Red_Sell_2 = input(defval=false, title='Option 3 to Reduce Sell 2 bars Below Min Angle Level 2')
Red_Sell_3 = input(defval=true, title='Option 4 to Reduce Sell 3 bars Below Min Angle Level 2')
Red_Sell_4 = input(defval=false, title='Option 5 to Reduce Sell 4 bars Below Min Angle Level 2')


OTH = input(title=' OTHERS ', defval=true)

i_barColor = input(true, 'Bar Color?')
h_lables = input(false, 'Hide Labels')


// FOLLOW LINE —————————————————————————————————————————————————————

BBUpper = ta.sma(close, BBperiod) + ta.stdev(close, BBperiod) * BBdeviations
BBLower = ta.sma(close, BBperiod) - ta.stdev(close, BBperiod) * BBdeviations
TrendLine = 0.0
iTrend = 0.0
BBSignal = close > BBUpper ? 1 : close < BBLower ? -1 : 0
if BBSignal == 1 and UseATRfilter == 1
    TrendLine := low - ta.atr(ATRperiod)
    if TrendLine < TrendLine[1]
        TrendLine := TrendLine[1]
        TrendLine
if BBSignal == -1 and UseATRfilter == 1
    TrendLine := high + ta.atr(ATRperiod)
    if TrendLine > TrendLine[1]
        TrendLine := TrendLine[1]
        TrendLine
if BBSignal == 0 and UseATRfilter == 1
    TrendLine := TrendLine[1]
    TrendLine
if BBSignal == 1 and UseATRfilter == 0
    TrendLine := low
    if TrendLine < TrendLine[1]
        TrendLine := TrendLine[1]
        TrendLine
if BBSignal == -1 and UseATRfilter == 0
    TrendLine := high
    if TrendLine > TrendLine[1]
        TrendLine := TrendLine[1]
        TrendLine
if BBSignal == 0 and UseATRfilter == 0
    TrendLine := TrendLine[1]
    TrendLine
iTrend := iTrend[1]
if TrendLine > TrendLine[1]
    iTrend := 1
    iTrend
if TrendLine < TrendLine[1]
    iTrend := -1
    iTrend

// FOLLOW LINE HIGHER TIME FRAME ——————————————————————————————

cd = 0.0
cti(sm, src, cd) =>
    di = (sm - 1.0) / 2.0 + 1.0
    c1 = 2 / (di + 1.0)
    c2 = 1 - c1
    c3 = 3.0 * (cd * cd + cd * cd * cd)
    c4 = -3.0 * (2.0 * cd * cd + cd + cd * cd * cd)
    c5 = 3.0 * cd + 1.0 + cd * cd * cd + 3.0 * cd * cd
    i1 = 0.0
    i2 = 0.0
    i3 = 0.0
    i4 = 0.0
    i5 = 0.0
    i6 = 0.0
    i1 := c1 * src + c2 * nz(i1[1])
    i2 := c1 * i1 + c2 * nz(i2[1])
    i3 := c1 * i2 + c2 * nz(i3[1])
    i4 := c1 * i3 + c2 * nz(i4[1])
    i5 := c1 * i4 + c2 * nz(i5[1])
    i6 := c1 * i5 + c2 * nz(i6[1])

    bfr = -cd * cd * cd * i6 + c3 * i5 + c4 * i4 + c5 * i3
    bfr

smma(src, len) =>
    smma = 0.0
    smma := na(smma[1]) ? ta.sma(src, len) : (smma[1] * (len - 1) + src) / len
    smma

ma(smoothing, src, length) =>
    if smoothing == 'RMA'
        ta.rma(src, length)
    else
        if smoothing == 'SMA'
            ta.sma(src, length)
        else
            if smoothing == 'EMA'
                ta.ema(src, length)
            else
                if smoothing == 'WMA'
                    ta.wma(src, length)
                else
                    if smoothing == 'VWMA'
                        ta.vwma(src, length)
                    else
                        if smoothing == 'SMMA'
                            smma(src, length)
                        else
                            if smoothing == 'HullMA'
                                ta.wma(2 * ta.wma(src, length / 2) - ta.wma(src, length), math.round(math.sqrt(length)))
                            else
                                if smoothing == 'LSMA'
                                    src
                                else
                                    if smoothing == 'KMA'
                                        xPrice = src
                                        xvnoise = math.abs(xPrice - xPrice[1])
                                        nfastend = 0.666
                                        nslowend = 0.0645
                                        nsignal = math.abs(xPrice - xPrice[length])
                                        nnoise = math.sum(xvnoise, length)
                                        nefratio = nnoise != 0 ? nsignal / nnoise : 0
                                        nsmooth = math.pow(nefratio * (nfastend - nslowend) + nslowend, 2)
                                        nAMA = 0.0
                                        nAMA := nz(nAMA[1]) + nsmooth * (xPrice - nz(nAMA[1]))
                                        nAMA
                                    else
                                        if smoothing == 'TMA'
                                            ta.sma(ta.sma(close, length), length)
                                        else
                                            if smoothing == 'DEMA'
                                                emaValue = ta.ema(src, length)
                                                2 * emaValue - ta.ema(emaValue, length)
                                            else
                                                if smoothing == 'TEMA'
                                                    ema1 = ta.ema(src, length)
                                                    ema2 = ta.ema(ema1, length)
                                                    ema3 = ta.ema(ema2, length)
                                                    3 * ema1 - 3 * ema2 + ema3
                                                else
                                                    if smoothing == 'CTI'
                                                        cti(length, src, cd)
                                                    else
                                                        src

MA = ma(TYPE, SOUR, LEN)
MA_MTF = request.security(syminfo.tickerid, RES, MA)
close_ = request.security(syminfo.tickerid, RES, close)
low_ = request.security(syminfo.tickerid, RES, low)
high_ = request.security(syminfo.tickerid, RES, high)
atr_ = request.security(syminfo.tickerid, RES, ta.atr(ATRperiod_))

BBUpper_ = MA_MTF + ta.stdev(close_, LEN) * BBdeviations_
BBLower_ = MA_MTF - ta.stdev(close_, LEN) * BBdeviations_

TrendLine_MTF = 0.0
iTrend_ = 0.0

BBSignal_ = close_ > BBUpper_ ? 1 : close_ < BBLower_ ? -1 : 0

if BBSignal_ == 1
    TrendLine_MTF := low_ - atr_
    if TrendLine_MTF < TrendLine_MTF[1]
        TrendLine_MTF := TrendLine_MTF[1]
        TrendLine_MTF
if BBSignal_ == -1
    TrendLine_MTF := high_ + atr_
    if TrendLine_MTF > TrendLine_MTF[1]
        TrendLine_MTF := TrendLine_MTF[1]
        TrendLine_MTF
if BBSignal_ == 0
    TrendLine_MTF := TrendLine_MTF[1]
    TrendLine_MTF

iTrend_ := iTrend_[1]
if TrendLine_MTF > TrendLine_MTF[1]
    iTrend_ := 1
    iTrend_
if TrendLine_MTF < TrendLine_MTF[1]
    iTrend_ := -1
    iTrend_

// ANGLE FL———————————————————————————————————————————————————————————— 

f_angle(_src, _lookback, _atrPeriod) =>
    rad2degree = 180 / 3.14159265359
    ang = rad2degree * math.atan((_src[0] - _src[_lookback]) / ta.atr(_atrPeriod))
    ang

_angle_fl = f_angle(TrendLine, i_lookback, i_atrPeriod)


// BUY/SELL AND NO FILTER HIGHER TIME FRAME  ————————————————————————————————————————————————————————————

buy_0 = iTrend[1] < 0 and iTrend > 0 and Buy_0 and MODE == 'NO FILTER HIGHER TIME FRAME' ? 1 : 0
sell_0 = iTrend[1] > 0 and iTrend < 0 and Sell_0 and MODE == 'NO FILTER HIGHER TIME FRAME' ? 1 : 0

// BUY/SELL AND FILTER HIGHER TIME FRAME  ————————————————————————————————————————————————————————————

buy_0_A = iTrend[1] < 0 and iTrend > 0 and Buy_0 and MODE == 'FILTER HIGHER TIME FRAME' and iTrend_ == 1 ? 1 : 0
sell_0_A = iTrend[1] > 0 and iTrend < 0 and Sell_0 and MODE == 'FILTER HIGHER TIME FRAME' and iTrend_ == -1 ? 1 : 0


//ADD AND NO FILTER HIGHER TIME FRAME ————————————————————————————————————————————————————————————

add_buy_1 = _angle_fl[2] > 0 and _angle_fl[1] == 0 and _angle_fl == 0 and iTrend > 0 and Add_Buy_0 and MODE == 'NO FILTER HIGHER TIME FRAME' ? 1 : 0

add_sell_1 = _angle_fl[2] < 0 and _angle_fl[1] == 0 and _angle_fl == 0 and iTrend < 0 and Add_Sell_0 and MODE == 'NO FILTER HIGHER TIME FRAME' ? 1 : 0

add_buy_2 = _angle_fl[5] > 0 and _angle_fl[4] == 0 and _angle_fl[3] == 0 and _angle_fl[2] == 0 and _angle_fl[1] == 0 and _angle_fl == 0 and iTrend > 0 and Add_Buy_1 and MODE == 'NO FILTER HIGHER TIME FRAME' ? 1 : 0

add_sell_2 = _angle_fl[5] < 0 and _angle_fl[4] == 0 and _angle_fl[3] == 0 and _angle_fl[2] == 0 and _angle_fl[1] == 0 and _angle_fl == 0 and iTrend < 0 and Add_Sell_1 and MODE == 'NO FILTER HIGHER TIME FRAME' ? 1 : 0

add_buy_3 = _angle_fl[8] > 0 and _angle_fl[7] == 0 and _angle_fl[6] == 0 and _angle_fl[5] == 0 and _angle_fl[4] == 0 and _angle_fl[3] == 0 and _angle_fl[2] == 0 and _angle_fl[1] == 0 and _angle_fl == 0 and iTrend > 0 and Add_Buy_2 and MODE == 'NO FILTER HIGHER TIME FRAME' ? 1 : 0

add_sell_3 = _angle_fl[8] < 0 and _angle_fl[7] == 0 and _angle_fl[6] == 0 and _angle_fl[5] == 0 and _angle_fl[4] == 0 and _angle_fl[3] == 0 and _angle_fl[2] == 0 and _angle_fl[1] == 0 and _angle_fl == 0 and iTrend < 0 and Add_Sell_2 and MODE == 'NO FILTER HIGHER TIME FRAME' ? 1 : 0

//ADD AND FILTER HIGHER TIME FRAME ————————————————————————————————————————————————————————————

add_buy_1_A = _angle_fl[2] > 0 and _angle_fl[1] == 0 and _angle_fl == 0 and iTrend > 0 and Add_Buy_0 and MODE == 'FILTER HIGHER TIME FRAME' and iTrend_ == 1 ? 1 : 0

add_sell_1_A = _angle_fl[2] < 0 and _angle_fl[1] == 0 and _angle_fl == 0 and iTrend < 0 and Add_Sell_0 and MODE == 'FILTER HIGHER TIME FRAME' and iTrend_ == -1 ? 1 : 0

add_buy_2_A = _angle_fl[5] > 0 and _angle_fl[4] == 0 and _angle_fl[3] == 0 and _angle_fl[2] == 0 and _angle_fl[1] == 0 and _angle_fl == 0 and MODE == 'FILTER HIGHER TIME FRAME' and iTrend_ == 1 and Add_Buy_1 ? 1 : 0

add_sell_2_A = _angle_fl[5] < 0 and _angle_fl[4] == 0 and _angle_fl[3] == 0 and _angle_fl[2] == 0 and _angle_fl[1] == 0 and _angle_fl == 0 and MODE == 'FILTER HIGHER TIME FRAME' and iTrend_ == -1 and Add_Sell_1 ? 1 : 0

add_buy_3_A = _angle_fl[8] > 0 and _angle_fl[7] == 0 and _angle_fl[6] == 0 and _angle_fl[5] == 0 and _angle_fl[4] == 0 and _angle_fl[3] == 0 and _angle_fl[2] == 0 and _angle_fl[1] == 0 and _angle_fl == 0 and MODE == 'FILTER HIGHER TIME FRAME' and iTrend_ == 1 and Add_Buy_2 ? 1 : 0

add_sell_3_A = _angle_fl[8] < 0 and _angle_fl[7] == 0 and _angle_fl[6] == 0 and _angle_fl[5] == 0 and _angle_fl[4] == 0 and _angle_fl[3] == 0 and _angle_fl[2] == 0 and _angle_fl[1] == 0 and _angle_fl == 0 and MODE == 'FILTER HIGHER TIME FRAME' and iTrend_ == -1 and Add_Sell_2 ? 1 : 0


//REDUCE AND NO FILTER HIGHER TIME FRAME ————————————————————————————————————————————————————————————

Redu_buy_1 = _angle_fl[1] < Max_level_1 and _angle_fl > Max_level_1 and Red_Buy_0 and MODE == 'NO FILTER HIGHER TIME FRAME' ? 1 : 0
Redu_buy_2 = _angle_fl[1] < Max_level_2 and _angle_fl > Max_level_2 and Red_Buy_1 and MODE == 'NO FILTER HIGHER TIME FRAME' ? 1 : 0
Redu_buy_3 = _angle_fl[2] < Max_level_2 and _angle_fl[1] > Max_level_2 and _angle_fl > Max_level_2 and Red_Buy_2 and MODE == 'NO FILTER HIGHER TIME FRAME' ? 1 : 0
Redu_buy_4 = _angle_fl[3] < Max_level_2 and _angle_fl[2] > Max_level_2 and _angle_fl[1] > Max_level_2 and _angle_fl > Max_level_2 and Red_Buy_3 and MODE == 'NO FILTER HIGHER TIME FRAME' ? 1 : 0
Redu_buy_5 = _angle_fl[4] < Max_level_2 and _angle_fl[3] > Max_level_2 and _angle_fl[2] > Max_level_2 and _angle_fl[1] > Max_level_2 and _angle_fl > Max_level_2 and Red_Buy_4 and MODE == 'NO FILTER HIGHER TIME FRAME' ? 1 : 0

Redu_sell_1 = _angle_fl[1] > Min_level_1 and _angle_fl < Min_level_1 and Red_Sell_0 and MODE == 'NO FILTER HIGHER TIME FRAME' ? 1 : 0
Redu_sell_2 = _angle_fl[1] > Min_level_2 and _angle_fl < Min_level_2 and Red_Sell_1 and MODE == 'NO FILTER HIGHER TIME FRAME' ? 1 : 0
Redu_sell_3 = _angle_fl[2] > Min_level_2 and _angle_fl[1] < Min_level_2 and _angle_fl < Min_level_2 and Red_Sell_2 and MODE == 'NO FILTER HIGHER TIME FRAME' ? 1 : 0
Redu_sell_4 = _angle_fl[3] > Min_level_2 and _angle_fl[2] < Min_level_2 and _angle_fl[1] < Min_level_2 and _angle_fl < Min_level_2 and Red_Sell_3 and MODE == 'NO FILTER HIGHER TIME FRAME' ? 1 : 0
Redu_sell_5 = _angle_fl[4] > Min_level_2 and _angle_fl[3] < Min_level_2 and _angle_fl[2] < Min_level_2 and _angle_fl[1] < Min_level_2 and _angle_fl < Min_level_2 and Red_Sell_4 and MODE == 'NO FILTER HIGHER TIME FRAME' ? 1 : 0

//REDUCE AND FILTER HIGHER TIME FRAME ————————————————————————————————————————————————————————————

Redu_buy_1_A = _angle_fl[1] < Max_level_1 and _angle_fl > Max_level_1 and Red_Buy_0 and MODE == 'FILTER HIGHER TIME FRAME' and iTrend_ == 1 ? 1 : 0
Redu_buy_2_A = _angle_fl[1] < Max_level_2 and _angle_fl > Max_level_2 and Red_Buy_1 and MODE == 'FILTER HIGHER TIME FRAME' and iTrend_ == 1 ? 1 : 0
Redu_buy_3_A = _angle_fl[2] < Max_level_2 and _angle_fl[1] > Max_level_2 and _angle_fl > Max_level_2 and Red_Buy_2 and MODE == 'FILTER HIGHER TIME FRAME' and iTrend_ == 1 ? 1 : 0
Redu_buy_4_A = _angle_fl[3] < Max_level_2 and _angle_fl[2] > Max_level_2 and _angle_fl[1] > Max_level_2 and _angle_fl > Max_level_2 and Red_Buy_3 and MODE == 'FILTER HIGHER TIME FRAME' and iTrend_ == 1 ? 1 : 0
Redu_buy_5_A = _angle_fl[4] < Max_level_2 and _angle_fl[3] > Max_level_2 and _angle_fl[2] > Max_level_2 and _angle_fl[1] > Max_level_2 and _angle_fl > Max_level_2 and Red_Buy_4 and MODE == 'FILTER HIGHER TIME FRAME' and iTrend_ == 1 ? 1 : 0

Redu_sell_1_A = _angle_fl[1] > Min_level_1 and _angle_fl < Min_level_1 and Red_Sell_0 and MODE == 'FILTER HIGHER TIME FRAME' and iTrend_ == -1 ? 1 : 0
Redu_sell_2_A = _angle_fl[1] > Min_level_2 and _angle_fl < Min_level_2 and Red_Sell_1 and MODE == 'FILTER HIGHER TIME FRAME' and iTrend_ == -1 ? 1 : 0
Redu_sell_3_A = _angle_fl[2] > Min_level_2 and _angle_fl[1] < Min_level_2 and _angle_fl < Min_level_2 and Red_Sell_2 and MODE == 'FILTER HIGHER TIME FRAME' and iTrend_ == -1 ? 1 : 0
Redu_sell_4_A = _angle_fl[3] > Min_level_2 and _angle_fl[2] < Min_level_2 and _angle_fl[1] < Min_level_2 and _angle_fl < Min_level_2 and Red_Sell_3 and MODE == 'FILTER HIGHER TIME FRAME' and iTrend_ == -1 ? 1 : 0
Redu_sell_5_A = _angle_fl[4] > Min_level_2 and _angle_fl[3] < Min_level_2 and _angle_fl[2] < Min_level_2 and _angle_fl[1] < Min_level_2 and _angle_fl < Min_level_2 and Red_Sell_4 and MODE == 'FILTER HIGHER TIME FRAME' and iTrend_ == -1 ? 1 : 0

// PLOT ————————————————————————————————————————————————————————————

_color_fl = iTrend > 0 ? color.blue : color.red

plot(_angle_fl, 'Angle Follow Line', _color_fl, 3, plot.style_line)
plot(_angle_fl, 'Angle Follow Line Histogram', _color_fl, 3, plot.style_histogram)

hline(Max_level_1, title='Max Angle Level 1', color=color.blue, linestyle=hline.style_dotted, linewidth=1)
hline(Max_level_2, title='Max Angle Level 2', color=color.blue, linestyle=hline.style_dotted, linewidth=1)
hline(Min_level_1, title='Min Angle Level 1', color=color.red, linestyle=hline.style_dotted, linewidth=1)
hline(Min_level_2, title='Min Angle Level 2', color=color.red, linestyle=hline.style_dotted, linewidth=1)


plotshape(h_lables == false and (sell_0 or sell_0_A) ? 5 : na, title='Sell', text='Sell', location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.new(color.red, 0), textcolor=color.new(color.white, 0))
plotshape(h_lables == false and (buy_0 or buy_0_A) ? -5 : na, title='Buy', text='Buy', location=location.absolute, style=shape.labelup, size=size.tiny, color=color.new(color.blue, 0), textcolor=color.new(color.white, 0))

plotshape(h_lables == false and (add_sell_1 or add_sell_1_A or add_sell_2 or add_sell_3 or add_sell_2_A or add_sell_3_A) ? _angle_fl + 5 : na, title='Add Sell 1', text='Add', location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.new(color.red, 0), textcolor=color.new(color.white, 0))
plotshape(h_lables == false and (add_buy_1 or add_buy_1_A or add_buy_2 or add_buy_3 or add_buy_2_A or add_buy_3_A) ? _angle_fl - 5 : na, title='Add Buy 1', text='Add', location=location.absolute, style=shape.labelup, size=size.tiny, color=color.new(color.blue, 0), textcolor=color.new(color.white, 0))

plotshape(h_lables == false and (Redu_buy_1 or Redu_buy_1_A) ? _angle_fl + 5 : na, title='Reduce Buy 1', text='Red', location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.new(color.blue, 0), textcolor=color.new(color.white, 0))
plotshape(h_lables == false and (Redu_buy_2 or Redu_buy_2_A) ? _angle_fl + 5 : na, title='Reduce Buy 2', text='Red', location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.new(color.blue, 0), textcolor=color.new(color.white, 0))
plotshape(h_lables == false and (Redu_buy_3 or Redu_buy_3_A) ? _angle_fl + 5 : na, title='Reduce Buy 3', text='Red', location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.new(color.blue, 0), textcolor=color.new(color.white, 0))
plotshape(h_lables == false and (Redu_buy_4 or Redu_buy_4_A) ? _angle_fl + 5 : na, title='Reduce Buy 4', text='Red', location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.new(color.blue, 0), textcolor=color.new(color.white, 0))
plotshape(h_lables == false and (Redu_buy_5 or Redu_buy_5_A) ? _angle_fl + 5 : na, title='Reduce Buy 5', text='Red', location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.new(color.blue, 0), textcolor=color.new(color.white, 0))

plotshape(h_lables == false and (Redu_sell_1 or Redu_sell_1_A) ? _angle_fl - 5 : na, title='Reduce Sell 1', text='Red', location=location.absolute, style=shape.labelup, size=size.tiny, color=color.new(color.red, 0), textcolor=color.new(color.white, 0))
plotshape(h_lables == false and (Redu_sell_2 or Redu_sell_2_A) ? _angle_fl - 5 : na, title='Reduce Sell 2', text='Red', location=location.absolute, style=shape.labelup, size=size.tiny, color=color.new(color.red, 0), textcolor=color.new(color.white, 0))
plotshape(h_lables == false and (Redu_sell_3 or Redu_sell_3_A) ? _angle_fl - 5 : na, title='Reduce Sell 3', text='Red', location=location.absolute, style=shape.labelup, size=size.tiny, color=color.new(color.red, 0), textcolor=color.new(color.white, 0))
plotshape(h_lables == false and (Redu_sell_4 or Redu_sell_4_A) ? _angle_fl - 5 : na, title='Reduce Sell 4', text='Red', location=location.absolute, style=shape.labelup, size=size.tiny, color=color.new(color.red, 0), textcolor=color.new(color.white, 0))
plotshape(h_lables == false and (Redu_sell_5 or Redu_sell_5_A) ? _angle_fl - 5 : na, title='Reduce Sell 5', text='Red', location=location.absolute, style=shape.labelup, size=size.tiny, color=color.new(color.red, 0), textcolor=color.new(color.white, 0))

bgcolor(iTrend_ > 0 and AIB ? color.blue : iTrend_ < 0 and AIB ? color.red : na, transp=70)

//barcolor(iTrend > 0 ? color.blue : color.red)

// ALERTS————————————————————————————————————————————————————————————

alertcondition(sell_0 or sell_0_A, title='Sell', message='Sell')
alertcondition(buy_0 or buy_0_A, title='Buy', message='Buy')

alertcondition(add_sell_1 or add_sell_1_A or add_sell_2 or add_sell_3 or add_sell_2_A or add_sell_3_A, title='Add Sell', message='Add Sell')
alertcondition(add_buy_1 or add_buy_1_A or add_buy_2 or add_buy_3 or add_buy_2_A or add_buy_3_A, title='Add Buy', message='Add Buy')

alertcondition(Redu_buy_1 or Redu_buy_1_A or Redu_buy_2 or Redu_buy_2_A or Redu_buy_3 or Redu_buy_3_A or Redu_buy_4 or Redu_buy_4_A or Redu_buy_5 or Redu_buy_5_A, title='Reduce Buy', message='Reduce Buy')
alertcondition(Redu_sell_1 or Redu_sell_1_A or Redu_sell_2 or Redu_sell_2_A or Redu_sell_3 or Redu_sell_3_A or Redu_sell_4 or Redu_sell_4_A or Redu_sell_5 or Redu_sell_5_A, title='Reduce Sell', message='Reduce Sell')

//alertcondition(sell_0 or sell_0_A or buy_0 or buy_0_A or add_sell_1 or add_sell_1_A or add_sell_2 or add_sell_3 or add_sell_2_A or add_sell_3_A or add_buy_1 or add_buy_1_A or add_buy_2 or add_buy_3 or add_buy_2_A or add_buy_3_A or Redu_buy_1 or Redu_buy_1_A or Redu_buy_2 or Redu_buy_2_A or Redu_buy_3 or Redu_buy_3_A or Redu_buy_4 or Redu_buy_4_A or Redu_buy_5 or Redu_buy_5_A or Redu_sell_1 or Redu_sell_1_A or Redu_sell_2 or Redu_sell_2_A or Redu_sell_3 or Redu_sell_3_A or Redu_sell_4 or Redu_sell_4_A or Redu_sell_5 or Redu_sell_5_A, title='Buy/Sell/Add/Reduce', message='Buy/Sell/Add/Reduce')

if buy_0
    strategy.entry("Enter Long", strategy.long)
else if sell_0
    strategy.entry("Enter Short", strategy.short)
    
//if add_buy_1 or add_buy_1_A or add_buy_2 or add_buy_3 or add_buy_2_A or add_buy_3_A
//    strategy.entry("Add Long", strategy.long)
//else if add_sell_1 or add_sell_1_A or add_sell_2 or add_sell_3 or add_sell_2_A or add_sell_3_A
//    strategy.entry("Add Short", strategy.short)
    
len = input(14)
th = input(20)

TrueRange = math.max(math.max(high - low, math.abs(high - nz(close[1]))), math.abs(low - nz(close[1])))
DirectionalMovementPlus = high - nz(high[1]) > nz(low[1]) - low ? math.max(high - nz(high[1]), 0) : 0
DirectionalMovementMinus = nz(low[1]) - low > high - nz(high[1]) ? math.max(nz(low[1]) - low, 0) : 0

SmoothedTrueRange = 0.0
SmoothedTrueRange := nz(SmoothedTrueRange[1]) - nz(SmoothedTrueRange[1]) / len + TrueRange

SmoothedDirectionalMovementPlus = 0.0
SmoothedDirectionalMovementPlus := nz(SmoothedDirectionalMovementPlus[1]) - nz(SmoothedDirectionalMovementPlus[1]) / len + DirectionalMovementPlus

SmoothedDirectionalMovementMinus = 0.0
SmoothedDirectionalMovementMinus := nz(SmoothedDirectionalMovementMinus[1]) - nz(SmoothedDirectionalMovementMinus[1]) / len + DirectionalMovementMinus

DIPlus = SmoothedDirectionalMovementPlus / SmoothedTrueRange * 100
DIMinus = SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100
DX = math.abs(DIPlus - DIMinus) / (DIPlus + DIMinus) * 100
ADX = ta.sma(DX, len)

plot(DIPlus, color=color.new(color.green, 0), title='DI+')
plot(DIMinus, color=color.new(color.red, 0), title='DI-')
plot(ADX, color=color.new(color.navy, 0), title='ADX')
hline(th, color=color.black)


```

> Detail

https://www.fmz.com/strategy/362256

> Last Modified

2022-05-10 21:29:29
