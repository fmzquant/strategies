
> Name

基于多项式插值的RSI动量指标策略Polynomial-Interpolation-Based-RSI-Momentum-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1164ed7a5a46f80e6a0.png)
[trans]

## 概述

该策略利用基于多项式插值的RSI动量指标Delta-RSI生成交易信号。Delta-RSI通过局部多项式回归方法对RSI进行平滑处理,得到RSI的一阶时间导数,用作动量指标。该策略增加了基于ATR、成交量和RSI的过滤器,可以过滤掉一部分“假”信号。

## 原理

该策略的核心指标是Delta-RSI。其计算步骤如下:

1. 输入RSI时间序列,长度为rsi_l周期
2. 在长度为window的滑动窗口上,利用多项式插值方法拟合RSI
3. 计算拟合曲线在当前点的一阶导数,即Delta-RSI
4. Delta-RSI上穿0为买入信号,下穿0为卖出信号
5. 还可以结合Delta-RSI的信号线生成交易信号

策略通过ATR、成交量和RSI过滤器过滤信号:

1. ATR过滤器:当前N周期ATR高于M周期ATR,表示波动率上升
2. 成交量过滤器:当前成交量超过近M周期平均成交量的N倍
3. RSI过滤器:RSI高于阈值1且低于阈值2,过滤超买超卖区域

## 优势

该策略具有以下优势:

1. Delta-RSI指标更加灵敏,可以提早捕捉趋势转折
2. 增加过滤器,可以过滤掉大部分假信号,提高信号质量
3. 可自定义多项式插值和滤波参数,适应不同市场环境
4. 可单独做多做空,满足不同偏好
5. 可设置止损止盈,控制单笔亏损和盈利

## 风险

该策略也存在以下风险:

1. 参数设置不当可能使平滑过度或过滤过度
2. 多头仓位亏损风险或空头仓位亏损风险
3. 停损止损设置过宽可能扩大单笔亏损

可以通过优化参数、调整过滤条件、设定更严格的止损来控制和降低这些风险。

## 优化方向

该策略还可进一步优化:

1. 优化Delta-RSI模型参数,改进拟合效果
2. 增加基于机器学习的自适应滤波
3. 根据不同品种分别设定参数
4. 增加模型组合等方法提高稳定性

## 总结

该策略利用Delta-RSI指标的高灵敏度特点,配合严格的过滤机制,在控制风险的前提下提升策略的质量。通过持续优化参数和模型,有望进一步扩大策略正收益率,是一种有效的量化交易策略。

||

## Overview

This strategy generates trading signals using the RSI momentum indicator Delta-RSI based on polynomial interpolation. Delta-RSI smooths RSI through local polynomial regression to obtain its first order time derivative as a momentum indicator. This strategy incorporates additional filters based on ATR, volume and RSI to filter out some “false” signals.

## Principle  

The core indicator of this strategy is Delta-RSI. Its calculation steps are:

1. Take RSI time series with length rsi_l as input 
2. Fit RSI using polynomial interpolation within sliding window of length window
3. Calculate the first order derivative of fitted curve at current point as Delta-RSI
4. Delta-RSI crossing above 0 generates buy signal, crossing below 0 generates sell signal
5. Trading signals can also be generated using Delta-RSI signal line

The strategy filters signals using ATR, volume and RSI filters:

1. ATR filter: current N-period ATR higher than M-period ATR indicates rising volatility
2. Volume filter: current volume higher than N times average volume over M periods  
3. RSI filter: RSI between threshold 1 and threshold 2 filters overbought/oversold area

## Advantages

The advantages of this strategy include:  

1. Delta-RSI is more sensitive for early trend reversal detection 
2. Filters can remove most false signals and improve signal quality
3. Customizable polynomial and filter parameters suit different markets
4. Separate long/short allows accommodation of different biases  
5. Stop loss/take profit controls per trade loss/profit

## Risks

The risks of this strategy include:

1. Poor parameter tuning can cause over-smoothing or over-filtering
2. Long/short position losses 
3. Overly wide stops can increase per trade loss

These can be controlled via parameter optimization, filter adjustment and tighter stops.

## Enhancement Opportunities

This strategy can be further improved by:

1. Optimizing Delta-RSI model parameters  
2. Incorporating machine learning based adaptive filtering
3. Tuning parameters for different products
4. Adding model combination methods etc. to increase robustness

## Conclusion  

By exploiting Delta-RSI’s high sensitivity and strict filtering mechanisms, this strategy can improve quality while controlling risks. Further parameter and model optimization may expand positive profit rate. It is an effective quantitative trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|(?Model Parameters:)Polynomial Order|
|v_input_2|21|RSI Length|
|v_input_3|50|Length ( > Order)|
|v_input_4|9|Signal Length|
|v_input_5|true|(?Allowed Entries:)Long|
|v_input_6|true|Short|
|v_input_7|0|(?Entry and Exit Conditions:)Buy: Signal Line Crossing|Zero-Crossing|Direction Change|
|v_input_8|0|Sell: Signal Line Crossing|Zero-Crossing|Direction Change|
|v_input_9|0|Exit: Signal Line Crossing|Zero-Crossing|Direction Change|
|v_input_10|true|(?Apply Filters to)Long Entries|
|v_input_11|true|Short Enties|
|v_input_12|true|Exits|
|v_input_13|false|(?Relative Volume Filter:)usevol|
|v_input_14|true|Volume >|
|v_input_15|30|Avg. Volume Over Period|
|v_input_16|false|(?Volatility Filter:)useatr|
|v_input_17|5|ATR|
|v_input_18|30|> ATR|
|v_input_19|false|(?Overbought/Oversold Filter:)usersi|
|v_input_20|false|rsitrhs1|
|v_input_21|100|< RSI (14) >|
|v_input_22|false|(?Stop Loss / Take Profit:)SL|
|v_input_23|10|, %|
|v_input_24|false|Trailing|
|v_input_25|false|TP|
|v_input_26|20|, %|
|v_input_27|true|(?Fixed Backtest Period Start/End Dates:)fixedstart|
|v_input_28|timestamp(01 Jan 2017 13:30 +0000)|backtest_start|
|v_input_29|false|fixedend|
|v_input_30|timestamp(30 Dec 2080 23:30 +0000)|backtest_end|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-04 00:00:00
end: 2024-01-11 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © tbiktag
//
// Delta-RSI Oscillator Strategy With Filters
//
// This is a version of the Delta-RSI Oscillator Strategy compatible with 
// the Strategy Tester.
//
// This version also allows filtering the trade signals generated by Delts-RSI
// by means of volatility (defined by ATR), relative volume and RSI(14).
//
// Delta-RSI (© tbiktag) is a smoothed time derivative of the RSI designed
// as a momentum indicator. For the original publication, see link below:
// https://www.tradingview.com/script/OXQVFTQD-Delta-RSI-Oscillator/
// 
// D-RSI model parameters:
// RSI Length: The timeframe of the RSI that serves as an input to D-RSI.
// Frame Length: The length of the lookback frame used for local regression.
// Polynomial Order: The order of the local polynomial function used to interpolate 
// the RSI.
// Trade signals are generated based on three optional conditions:
// - Zero-crossing: bullish when D-RSI crosses zero from negative to positive 
// values (bearish otherwise)
// - Signal Line Crossing: bullish when D-RSI crosses from below to above the signal 
// line (bearish otherwise)
// - Direction Change: bullish when D-RSI was negative and starts ascending 
// (bearish otherwise)
// 
//@version=4
strategy(title="Delta-RSI Strategy with Filters", shorttitle = "D-RSI with filters", overlay = true)

// ---Subroutines---
matrix_get(_A,_i,_j,_nrows) =>
    // Get the value of the element of an implied 2d matrix
    //input: 
    // _A :: array: pseudo 2d matrix _A = [[column_0],[column_1],...,[column_(n-1)]]
    // _i :: integer: row number
    // _j :: integer: column number
    // _nrows :: integer: number of rows in the implied 2d matrix
    array.get(_A,_i+_nrows*_j)

matrix_set(_A,_value,_i,_j,_nrows) =>
    // Set a value to the element of an implied 2d matrix
    //input: 
    // _A :: array, changed on output: pseudo 2d matrix _A = [[column_0],[column_1],...,[column_(n-1)]]
    // _value :: float: the new value to be set
    // _i :: integer: row number
    // _j :: integer: column number
    // _nrows :: integer: number of rows in the implied 2d matrix
    array.set(_A,_i+_nrows*_j,_value)

transpose(_A,_nrows,_ncolumns) =>
    // Transpose an implied 2d matrix
    // input:
    // _A :: array: pseudo 2d matrix _A = [[column_0],[column_1],...,[column_(n-1)]]
    // _nrows :: integer: number of rows in _A
    // _ncolumns :: integer: number of columns in _A
    // output:
    // _AT :: array: pseudo 2d matrix with implied dimensions: _ncolums x _nrows
    var _AT = array.new_float(_nrows*_ncolumns,0)
    for i = 0 to _nrows-1
        for j = 0 to _ncolumns-1
            matrix_set(_AT, matrix_get(_A,i,j,_nrows),j,i,_ncolumns)
    _AT

multiply(_A,_B,_nrowsA,_ncolumnsA,_ncolumnsB) => 
    // Calculate scalar product of two matrices
    // input: 
    // _A :: array: pseudo 2d matrix
    // _B :: array: pseudo 2d matrix
    // _nrowsA :: integer: number of rows in _A
    // _ncolumnsA :: integer: number of columns in _A
    // _ncolumnsB :: integer: number of columns in _B
    // output:
    // _C:: array: pseudo 2d matrix with implied dimensions _nrowsA x _ncolumnsB
    var _C = array.new_float(_nrowsA*_ncolumnsB,0)
    int _nrowsB = _ncolumnsA
    float elementC= 0.0
    for i = 0 to _nrowsA-1
        for j = 0 to _ncolumnsB-1
            elementC := 0
            for k = 0 to _ncolumnsA-1
                elementC := elementC + matrix_get(_A,i,k,_nrowsA)*matrix_get(_B,k,j,_nrowsB)
            matrix_set(_C,elementC,i,j,_nrowsA)
    _C

vnorm(_X,_n) =>
    //Square norm of vector _X with size _n
    float _norm = 0.0
    for i = 0 to _n-1
        _norm := _norm + pow(array.get(_X,i),2)
    sqrt(_norm)

qr_diag(_A,_nrows,_ncolumns) => 
    //QR Decomposition with Modified Gram-Schmidt Algorithm (Column-Oriented)
    // input:
    // _A :: array: pseudo 2d matrix _A = [[column_0],[column_1],...,[column_(n-1)]]
    // _nrows :: integer: number of rows in _A
    // _ncolumns :: integer: number of columns in _A
    // output:
    // _Q: unitary matrix, implied dimenstions _nrows x _ncolumns
    // _R: upper triangular matrix, implied dimansions _ncolumns x _ncolumns
    var _Q = array.new_float(_nrows*_ncolumns,0)
    var _R = array.new_float(_ncolumns*_ncolumns,0)
    var _a = array.new_float(_nrows,0)
    var _q = array.new_float(_nrows,0)
    float _r = 0.0
    float _aux = 0.0
    //get first column of _A and its norm:
    for i = 0 to _nrows-1
        array.set(_a,i,matrix_get(_A,i,0,_nrows))
    _r := vnorm(_a,_nrows)
    //assign first diagonal element of R and first column of Q
    matrix_set(_R,_r,0,0,_ncolumns)
    for i = 0 to _nrows-1
        matrix_set(_Q,array.get(_a,i)/_r,i,0,_nrows)
    if _ncolumns != 1
        //repeat for the rest of the columns
        for k = 1 to _ncolumns-1
            for i = 0 to _nrows-1
                array.set(_a,i,matrix_get(_A,i,k,_nrows))
            for j = 0 to k-1
                //get R_jk as scalar product of Q_j column and A_k column:
                _r := 0
                for i = 0 to _nrows-1
                    _r := _r + matrix_get(_Q,i,j,_nrows)*array.get(_a,i)
                matrix_set(_R,_r,j,k,_ncolumns)
                //update vector _a
                for i = 0 to _nrows-1
                    _aux := array.get(_a,i) - _r*matrix_get(_Q,i,j,_nrows)
                    array.set(_a,i,_aux)
            //get diagonal R_kk and Q_k column
            _r := vnorm(_a,_nrows)
            matrix_set(_R,_r,k,k,_ncolumns)
            for i = 0 to _nrows-1
                matrix_set(_Q,array.get(_a,i)/_r,i,k,_nrows)
    [_Q,_R]
    
pinv(_A,_nrows,_ncolumns) =>
    //Pseudoinverse of matrix _A calculated using QR decomposition
    // Input: 
    // _A:: array: implied as a (_nrows x _ncolumns) matrix 
    //.             _A = [[column_0],[column_1],...,[column_(_ncolumns-1)]]
    // Output: 
    // _Ainv:: array implied as a (_ncolumns x _nrows) matrix 
    //              _A = [[row_0],[row_1],...,[row_(_nrows-1)]]
    // ----
    // First find the QR factorization of A: A = QR,
    // where R is upper triangular matrix.
    // Then _Ainv = R^-1*Q^T.
    // ----
    [_Q,_R] = qr_diag(_A,_nrows,_ncolumns)
    _QT = transpose(_Q,_nrows,_ncolumns)
    // Calculate Rinv:
    var _Rinv = array.new_float(_ncolumns*_ncolumns,0)
    float _r = 0.0
    matrix_set(_Rinv,1/matrix_get(_R,0,0,_ncolumns),0,0,_ncolumns)
    if _ncolumns != 1
        for j = 1 to _ncolumns-1
            for i = 0 to j-1
                _r := 0.0
                for k = i to j-1
                    _r := _r + matrix_get(_Rinv,i,k,_ncolumns)*matrix_get(_R,k,j,_ncolumns)
                matrix_set(_Rinv,_r,i,j,_ncolumns)
            for k = 0 to j-1
                matrix_set(_Rinv,-matrix_get(_Rinv,k,j,_ncolumns)/matrix_get(_R,j,j,_ncolumns),k,j,_ncolumns)
            matrix_set(_Rinv,1/matrix_get(_R,j,j,_ncolumns),j,j,_ncolumns)
    //
    _Ainv = multiply(_Rinv,_QT,_ncolumns,_ncolumns,_nrows)
    _Ainv

norm_rmse(_x, _xhat) =>
    // Root Mean Square Error normalized to the sample mean
    // _x.   :: array float, original data
    // _xhat :: array float, model estimate
    // output
    // _nrmse:: float
    float _nrmse = 0.0
    if array.size(_x) != array.size(_xhat)
        _nrmse := na
    else
        int _N = array.size(_x)
        float _mse = 0.0
        for i = 0 to _N-1
            _mse := _mse + pow(array.get(_x,i) - array.get(_xhat,i),2)/_N
        _xmean = array.sum(_x)/_N
        _nrmse := sqrt(_mse) /_xmean
    _nrmse
    

diff(_src,_window,_degree) =>
    // Polynomial differentiator
    // input:
    // _src:: input series
    // _window:: integer: wigth of the moving lookback window
    // _degree:: integer: degree of fitting polynomial
    // output:
    // _diff :: series: time derivative
    // _nrmse:: float: normalized root mean square error
    //
    // Vandermonde matrix with implied dimensions (window x degree+1)
    // Linear form: J = [ [z]^0, [z]^1, ... [z]^degree], 
    //              with z = [ (1-window)/2 to (window-1)/2 ] 
    var _J = array.new_float(_window*(_degree+1),0)
    for i = 0 to _window-1 
        for j = 0 to _degree
            matrix_set(_J,pow(i,j),i,j,_window)
    // Vector of raw datapoints:
    var _Y_raw = array.new_float(_window,na)
    for j = 0 to _window-1
        array.set(_Y_raw,j,_src[_window-1-j]) 
    // Calculate polynomial coefficients which minimize the loss function
    _C = pinv(_J,_window,_degree+1)
    _a_coef = multiply(_C,_Y_raw,_degree+1,_window,1)
    // For first derivative, approximate the last point (i.e. z=window-1) by 
    float _diff = 0.0
    for i = 1 to _degree
        _diff := _diff + i*array.get(_a_coef,i)*pow(_window-1,i-1)
    // Calculates data estimate (needed for rmse)
    _Y_hat = multiply(_J,_a_coef,_window,_degree+1,1)
    float _nrmse = norm_rmse(_Y_raw,_Y_hat)
    [_diff,_nrmse]

/// --- main ---
degree = input(title="Polynomial Order", group = "Model Parameters:",
              inline = "linepar1", type = input.integer, defval=3, minval = 1)
rsi_l = input(title = "RSI Length", group = "Model Parameters:", 
              inline = "linepar1", type = input.integer, defval = 21, minval = 1,
              tooltip="The period length of RSI that is used as input.")
window = input(title="Length ( > Order)", group = "Model Parameters:",
              inline = "linepar2", type = input.integer, defval=50, minval = 2)
signalLength = input(title="Signal Length", group = "Model Parameters:",
              inline = "linepar2", type=input.integer, defval=9,
              tooltip="The signal line is a EMA of the D-RSI time series.")
islong = input(title = "Long", group = "Allowed Entries:",
              inline = "lineent",type = input.bool, defval = true)
isshort = input(title = "Short", group = "Allowed Entries:",
              inline = "lineent", type = input.bool, defval= true)
buycond = input(title="Buy", group = "Entry and Exit Conditions:", 
              inline = "linecond",type = input.string, defval="Signal Line Crossing", 
              options=["Zero-Crossing", "Signal Line Crossing","Direction Change"])
sellcond = input(title="Sell", group = "Entry and Exit Conditions:", 
              inline = "linecond",type = input.string, defval="Signal Line Crossing", 
              options=["Zero-Crossing", "Signal Line Crossing","Direction Change"])
endcond = input(title="Exit", group = "Entry and Exit Conditions:", 
              inline = "linecond",type = input.string, defval="Signal Line Crossing", 
              options=["Zero-Crossing", "Signal Line Crossing","Direction Change"])
filterlong =input(title = "Long Entries", inline = 'linefilt', group = 'Apply Filters to', 
               type = input.bool, defval = true)
filtershort =input(title = "Short Enties", inline = 'linefilt', group = 'Apply Filters to', 
               type = input.bool, defval = true)
filterend =input(title = "Exits", inline = 'linefilt', group = 'Apply Filters to', 
               type = input.bool, defval = true)
usevol =input(title = "", inline = 'linefiltvol', group = 'Relative Volume Filter:', 
               type = input.bool, defval = false)
rvol = input(title = "Volume >", inline = 'linefiltvol', group = 'Relative Volume Filter:', 
               type = input.integer, defval = 1)
len_vol = input(title = "Avg. Volume Over Period", inline = 'linefiltvol', group = 'Relative Volume Filter:', 
               type = input.integer, defval = 30, minval = 1,
               tooltip="The current volume must be greater than N times the M-period average volume.")
useatr =input(title = "", inline = 'linefiltatr', group = 'Volatility Filter:', 
               type = input.bool, defval = false)
len_atr1 = input(title = "ATR", inline = 'linefiltatr', group = 'Volatility Filter:', 
               type = input.integer, defval = 5, minval = 1)
len_atr2 = input(title = "> ATR", inline = 'linefiltatr', group = 'Volatility Filter:', 
               type = input.integer, defval = 30, minval = 1,
               tooltip="The N-period ATR must be greater than the M-period ATR.")
usersi =input(title = "", inline = 'linersi', group = 'Overbought/Oversold Filter:', 
               type = input.bool, defval = false)
rsitrhs1 = input(title = "", inline = 'linersi', group = 'Overbought/Oversold Filter:', 
               type = input.integer, defval = 0, minval=0, maxval=100)
rsitrhs2 = input(title = "< RSI (14) >", inline = 'linersi', group = 'Overbought/Oversold Filter:', 
               type = input.integer, defval = 100, minval=0, maxval=100,
               tooltip="RSI(14) must be in the range between N and M.")
issl =  input(title = "SL", inline = 'linesl1', group = 'Stop Loss / Take Profit:', 
               type = input.bool, defval = false)
slpercent =  input(title = ", %", inline = 'linesl1', group = 'Stop Loss / Take Profit:', 
               type = input.float, defval = 10, minval=0.0)
istrailing =  input(title = "Trailing", inline = 'linesl1', group = 'Stop Loss / Take Profit:', 
               type = input.bool, defval = false)
istp =  input(title = "TP", inline = 'linetp1', group = 'Stop Loss / Take Profit:', 
               type = input.bool, defval = false)
tppercent =  input(title = ", %", inline = 'linetp1', group = 'Stop Loss / Take Profit:', 
               type = input.float, defval = 20)
fixedstart =input(title="", group = "Fixed Backtest Period Start/End Dates:",
              inline = "linebac1", type = input.bool, defval = true)
backtest_start=input(title = "", type = input.time, inline = "linebac1", 
              group = "Fixed Backtest Period Start/End Dates:",
              defval = timestamp("01 Jan 2017 13:30 +0000"),
              tooltip="If deactivated, backtest staring from the first available price bar.")
fixedend =  input(title="", group = "Fixed Backtest Period Start/End Dates:",
              inline = "linebac2", type = input.bool, defval = false)
backtest_end =input(title = "", type = input.time, inline = "linebac2", 
              group = "Fixed Backtest Period Start/End Dates:",
              defval = timestamp("30 Dec 2080 23:30 +0000"),
              tooltip="If deactivated, backtesting ends at the last available price bar.")

if window < degree
    window := degree+1

src = rsi(close,rsi_l)
[drsi,nrmse] = diff(src,window,degree)
signalline = ema(drsi, signalLength)

// Conditions for D-RSI
dirchangeup = (drsi>drsi[1]) and (drsi[1]<drsi[2]) and drsi[1]<0.0
dirchangedw = (drsi<drsi[1]) and (drsi[1]>drsi[2]) and drsi[1]>0.0
crossup = crossover(drsi,0.0)
crossdw = crossunder(drsi,0.0)
crosssignalup = crossover(drsi,signalline)
crosssignaldw = crossunder(drsi,signalline)

// D-RSI signals
drsilong = (buycond=="Direction Change"?dirchangeup:(buycond=="Zero-Crossing"?crossup:crosssignalup)) 
drsishort= (sellcond=="Direction Change"?dirchangedw:(sellcond=="Zero-Crossing"?crossdw:crosssignaldw)) 
drisendlong = (endcond=="Direction Change"?dirchangedw:(endcond=="Zero-Crossing"?crossdw:crosssignaldw)) 
drisendshort= (endcond=="Direction Change"?dirchangeup:(endcond=="Zero-Crossing"?crossup:crosssignalup)) 

// Filters
rsifilter = usersi?(rsi(close,14) > rsitrhs1 and rsi(close,14) < rsitrhs2):true
volatilityfilter = useatr?(atr(len_atr1) > atr(len_atr2)):true
volumefilter = usevol?(volume > rvol*sma(volume,len_vol)):true
totalfilter = volatilityfilter and volumefilter and rsifilter

//Filtered signals
golong  = drsilong  and islong  and (filterlong?totalfilter:true) 
goshort = drsishort and isshort and (filtershort?totalfilter:true)
endlong  = drisendlong and (filterend?totalfilter:true)
endshort = drisendlong and (filterend?totalfilter:true)

// Backtest period
//backtest_start = timestamp(syminfo.timezone, startYear, startMonth, startDate, 0, 0)
//backtest_end = timestamp(syminfo.timezone, endYear, endMonth, endDate, 0, 0)
isinrange = true

// Entry price / Take profit / Stop Loss
startprice = valuewhen(condition=golong or goshort, source=close, occurrence=0)
pm = golong?1:goshort?-1:1/sign(strategy.position_size)
takeprofit = startprice*(1+pm*tppercent*0.01)
// fixed stop loss
stoploss = startprice * (1-pm*slpercent*0.01)
// trailing stop loss
if istrailing and strategy.position_size>0
    stoploss := max(close*(1 - slpercent*0.01),stoploss[1])
else if istrailing and strategy.position_size<0
    stoploss := min(close*(1 + slpercent*0.01),stoploss[1])

tpline = plot(takeprofit,color=color.blue,transp=100, title="TP")
slline = plot(stoploss,  color=color.red, transp=100, title="SL")
p1 = plot(close,transp=100,color=color.white, title="Dummy Close")
fill(p1, tpline, color=color.green, transp=istp?70:100, title="TP")
fill(p1, slline, color=color.red,   transp=issl?70:100, title="SL")

// Backtest: Basic Entry and Exit Conditions
if golong and isinrange and islong
    strategy.entry("long",   true )
    alert("D-RSI Long " + syminfo.tickerid, alert.freq_once_per_bar_close) 
if goshort and isinrange and isshort
    strategy.entry("short",  false)
    alert("D-RSI Short " + syminfo.tickerid, alert.freq_once_per_bar_close) 
if endlong
    strategy.close("long",  alert_message="Close Long")
    alert("D-RSI Exit Long " + syminfo.tickerid, alert.freq_once_per_bar_close) 
if endshort
    strategy.close("short", alert_message="Close Short")
    alert("D-RSI Exit Short " + syminfo.tickerid, alert.freq_once_per_bar_close) 

// Exit via SL or TP
strategy.exit(id="sl/tp long", from_entry="long", stop=issl?stoploss:na, 
              limit=istp?takeprofit:na, alert_message="Close Long")
strategy.exit(id="sl/tp short",from_entry="short",stop=issl?stoploss:na, 
              limit=istp?takeprofit:na, alert_message="Stop Loss Short")

// Close if outside the range
if (not isinrange)
    strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/438479

> Last Modified

2024-01-12 13:46:53
