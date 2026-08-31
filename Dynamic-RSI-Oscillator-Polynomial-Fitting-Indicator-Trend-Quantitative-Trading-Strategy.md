
> Name

Dynamic-RSI-Oscillator-Polynomial-Fitting-Indicator-Trend-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/113c46ea585baf8fb27.png)

[trans]
该策略是一个基于RSI动态振荡器的量化交易系统。通过对RSI指标进行多项式拟合和时间序列分析,计算RSI的变化率来捕捉市场动量。策略采用QR分解等高级数学方法进行信号处理,并结合均线系统进行交易决策。

#### 策略原理
策略的核心是Delta-RSI震荡器,它通过以下步骤实现:
1. 首先计算传统RSI指标作为基础数据
2. 使用多项式拟合对RSI进行平滑处理,减少噪声
3. 计算RSI的时间导数得到Delta-RSI,反映RSI的变化速率
4. 将Delta-RSI与其移动平均线比较生成交易信号
5. 使用均方根误差(RMSE)对拟合质量进行评估和过滤

交易信号可以通过三种方式产生:
- 零线穿越:Delta-RSI从负值转正时做多,从正值转负时做空
- 信号线交叉:Delta-RSI上穿/下穿其移动平均线时分别做多/做空  
- 方向改变:Delta-RSI在负值区域开始上升时做多,在正值区域开始下降时做空

#### 策略优势
1. 数学基础扎实：采用QR分解等高级数学方法进行信号处理,理论基础可靠
2. 信号平滑：多项式拟合可以有效过滤市场噪声,提高信号质量
3. 灵活性强：提供多种信号生成方式和参数选择,适应不同市场环境
4. 风险可控：包含RMSE过滤机制,可以筛选出可靠性较高的信号
5. 计算高效：矩阵运算采用优化算法,运行效率较高

#### 策略风险
1. 参数敏感：多个关键参数需要精心调整,参数选择不当会严重影响策略表现
2. 滞后性：信号平滑处理会带来一定滞后,可能错过快速行情
3. 假突破：在震荡市场中可能产生虚假信号,增加交易成本
4. 计算复杂：涉及较多矩阵运算,在高频交易中可能存在性能瓶颈
5. 过度拟合：参数优化时需要注意避免过度拟合历史数据

#### 策略优化方向
1. 自适应参数：可以根据市场波动率动态调整RSI周期和拟合阶数
2. 多时间周期：结合更多时间周期的信号进行交叉验证
3. 波动率过滤：加入ATR等波动率指标进行信号过滤
4. 市场分类：针对不同市场状态(趋势/震荡)使用不同的信号生成规则
5. 止损优化：加入更智能的止损机制,如基于支撑阻力位的动态止损

#### 总结
这是一个结构完整、理论基础扎实的量化交易策略。通过对RSI的动态特性分析,结合现代数学方法进行信号处理,能够较好地捕捉市场趋势。虽然存在一定的参数敏感性和计算复杂度问题,但通过合理的参数选择和优化改进,该策略具有良好的应用价值。建议在实盘应用时注意风险控制,合理设置仓位,并持续监控策略表现。 ||

This strategy is a quantitative trading system based on RSI dynamic oscillator. By performing polynomial fitting and time series analysis on the RSI indicator, it calculates the rate of change of RSI to capture market momentum. The strategy uses advanced mathematical methods such as QR decomposition for signal processing and combines with moving average system for trading decisions.

#### Strategy Principle
The core of the strategy is the Delta-RSI oscillator, which is implemented through the following steps:
1. First calculate traditional RSI indicator as basic data
2. Use polynomial fitting to smooth RSI and reduce noise
3. Calculate time derivative of RSI to get Delta-RSI, reflecting rate of change of RSI
4. Compare Delta-RSI with its moving average to generate trading signals
5. Use root mean square error (RMSE) to evaluate and filter fitting quality

Trading signals can be generated in three ways:
- Zero-line crossing: Long when Delta-RSI turns positive from negative, short when turns negative from positive
- Signal line crossing: Long/short when Delta-RSI crosses above/below its moving average
- Direction change: Long when Delta-RSI starts rising in negative territory, short when starts falling in positive territory

#### Strategy Advantages
1. Solid mathematical foundation: Uses advanced mathematical methods like QR decomposition for signal processing
2. Signal smoothing: Polynomial fitting can effectively filter market noise and improve signal quality
3. High flexibility: Provides multiple signal generation methods and parameter choices to adapt to different market conditions
4. Controllable risk: Includes RMSE filtering mechanism to screen out more reliable signals
5. Computational efficiency: Matrix operations use optimized algorithms for high running efficiency

#### Strategy Risks
1. Parameter sensitivity: Multiple key parameters need careful adjustment, poor parameter selection seriously affects strategy performance
2. Lag: Signal smoothing introduces some delay, may miss rapid market moves
3. False breakouts: May generate false signals in oscillating markets, increasing trading costs
4. Computational complexity: Involves many matrix operations, may have performance bottlenecks in high-frequency trading
5. Overfitting: Need to avoid overfitting historical data when optimizing parameters

#### Strategy Optimization Directions
1. Adaptive parameters: Dynamically adjust RSI period and fitting order based on market volatility
2. Multiple timeframes: Incorporate signals from more timeframes for cross-validation
3. Volatility filtering: Add volatility indicators like ATR for signal filtering
4. Market classification: Use different signal generation rules for different market states (trend/oscillation)
5. Stop-loss optimization: Add smarter stop-loss mechanisms, like dynamic stops based on support/resistance levels

#### Summary
This is a complete quantitative trading strategy with solid theoretical foundation. Through analysis of RSI's dynamic characteristics combined with modern mathematical methods for signal processing, it can effectively capture market trends. While there are some issues with parameter sensitivity and computational complexity, the strategy has good practical value through proper parameter selection and optimization improvements. When applying to live trading, it's recommended to pay attention to risk control, set reasonable position sizes, and continuously monitor strategy performance.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-10 00:00:00
end: 2024-12-09 08:00:00
period: 4h
basePeriod: 4h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © tbiktag
//
// Delta-RSI Oscillator Strategy
//
// A strategy that uses Delta-RSI Oscillator (© tbiktag) as a stand-alone indicator:
// https://www.tradingview.com/script/OXQVFTQD-Delta-RSI-Oscillator/
//
// Delta-RSI is a smoothed time derivative of the RSI, plotted as a histogram 
// and serving as a momentum indicator. 
// 
// Input parameters:
// RSI Length: The timeframe of the RSI that serves as an input to D-RSI.
// Length: The length of the lookback frame used for local regression.
// Polynomial Order: The order of the local polynomial function used to interpolate the RSI.
// Signal Length: The length of a EMA of the D-RSI series that is used as a signal line.
// Trade signals are generated based on three optional conditions:
// - Zero-crossing: bullish when D-RSI crosses zero from negative to positive values (bearish otherwise)
// - Signal Line Crossing: bullish when D-RSI crosses from below to above the signal line (bearish otherwise)
// - Direction Change: bullish when D-RSI was negative and starts ascending (bearish otherwise)
//
// Since D-RSI oscillator is based on polynomial fitting of the RSI curve, there is also an option
// to filter trade signal by means of the root mean-square error of the fit (normalized by the sample average).
// 
//@version=5
strategy(title='Delta-RSI Oscillator Strategy-QuangVersion', shorttitle='D-RSI-Q', overlay=true)

// ---Subroutines---
matrix_get(_A, _i, _j, _nrows) =>
    // Get the value of the element of an implied 2d matrix
    //input: 
    // _A :: array: pseudo 2d matrix _A = [[column_0],[column_1],...,[column_(n-1)]]
    // _i :: integer: row number
    // _j :: integer: column number
    // _nrows :: integer: number of rows in the implied 2d matrix
    array.get(_A, _i + _nrows * _j)

matrix_set(_A, _value, _i, _j, _nrows) =>
    // Set a value to the element of an implied 2d matrix
    //input: 
    // _A :: array, changed on output: pseudo 2d matrix _A = [[column_0],[column_1],...,[column_(n-1)]]
    // _value :: float: the new value to be set
    // _i :: integer: row number
    // _j :: integer: column number
    // _nrows :: integer: number of rows in the implied 2d matrix
    array.set(_A, _i + _nrows * _j, _value)

transpose(_A, _nrows, _ncolumns) =>
    // Transpose an implied 2d matrix
    // input:
    // _A :: array: pseudo 2d matrix _A = [[column_0],[column_1],...,[column_(n-1)]]
    // _nrows :: integer: number of rows in _A
    // _ncolumns :: integer: number of columns in _A
    // output:
    // _AT :: array: pseudo 2d matrix with implied dimensions: _ncolums x _nrows
    var _AT = array.new_float(_nrows * _ncolumns, 0)
    for i = 0 to _nrows - 1 by 1
        for j = 0 to _ncolumns - 1 by 1
            matrix_set(_AT, matrix_get(_A, i, j, _nrows), j, i, _ncolumns)
    _AT

multiply(_A, _B, _nrowsA, _ncolumnsA, _ncolumnsB) =>
    // Calculate scalar product of two matrices
    // input: 
    // _A :: array: pseudo 2d matrix
    // _B :: array: pseudo 2d matrix
    // _nrowsA :: integer: number of rows in _A
    // _ncolumnsA :: integer: number of columns in _A
    // _ncolumnsB :: integer: number of columns in _B
    // output:
    // _C:: array: pseudo 2d matrix with implied dimensions _nrowsA x _ncolumnsB
    var _C = array.new_float(_nrowsA * _ncolumnsB, 0)
    int _nrowsB = _ncolumnsA
    float elementC = 0.0
    for i = 0 to _nrowsA - 1 by 1
        for j = 0 to _ncolumnsB - 1 by 1
            elementC := 0
            for k = 0 to _ncolumnsA - 1 by 1
                elementC += matrix_get(_A, i, k, _nrowsA) * matrix_get(_B, k, j, _nrowsB)
                elementC
            matrix_set(_C, elementC, i, j, _nrowsA)
    _C

vnorm(_X, _n) =>
    //Square norm of vector _X with size _n
    float _norm = 0.0
    for i = 0 to _n - 1 by 1
        _norm += math.pow(array.get(_X, i), 2)
        _norm
    math.sqrt(_norm)

qr_diag(_A, _nrows, _ncolumns) =>
    //QR Decomposition with Modified Gram-Schmidt Algorithm (Column-Oriented)
    // input:
    // _A :: array: pseudo 2d matrix _A = [[column_0],[column_1],...,[column_(n-1)]]
    // _nrows :: integer: number of rows in _A
    // _ncolumns :: integer: number of columns in _A
    // output:
    // _Q: unitary matrix, implied dimenstions _nrows x _ncolumns
    // _R: upper triangular matrix, implied dimansions _ncolumns x _ncolumns
    var _Q = array.new_float(_nrows * _ncolumns, 0)
    var _R = array.new_float(_ncolumns * _ncolumns, 0)
    var _a = array.new_float(_nrows, 0)
    var _q = array.new_float(_nrows, 0)
    float _r = 0.0
    float _aux = 0.0
    //get first column of _A and its norm:
    for i = 0 to _nrows - 1 by 1
        array.set(_a, i, matrix_get(_A, i, 0, _nrows))
    _r := vnorm(_a, _nrows)
    //assign first diagonal element of R and first column of Q
    matrix_set(_R, _r, 0, 0, _ncolumns)
    for i = 0 to _nrows - 1 by 1
        matrix_set(_Q, array.get(_a, i) / _r, i, 0, _nrows)
    if _ncolumns != 1
        //repeat for the rest of the columns
        for k = 1 to _ncolumns - 1 by 1
            for i = 0 to _nrows - 1 by 1
                array.set(_a, i, matrix_get(_A, i, k, _nrows))
            for j = 0 to k - 1 by 1
                //get R_jk as scalar product of Q_j column and A_k column:
                _r := 0
                for i = 0 to _nrows - 1 by 1
                    _r += matrix_get(_Q, i, j, _nrows) * array.get(_a, i)
                    _r
                matrix_set(_R, _r, j, k, _ncolumns)
                //update vector _a
                for i = 0 to _nrows - 1 by 1
                    _aux := array.get(_a, i) - _r * matrix_get(_Q, i, j, _nrows)
                    array.set(_a, i, _aux)
            //get diagonal R_kk and Q_k column
            _r := vnorm(_a, _nrows)
            matrix_set(_R, _r, k, k, _ncolumns)
            for i = 0 to _nrows - 1 by 1
                matrix_set(_Q, array.get(_a, i) / _r, i, k, _nrows)
    [_Q, _R]

pinv(_A, _nrows, _ncolumns) =>
    //Pseudoinverse of matrix _A calculated using QR decomposition
    // Input: 
    // _A:: array: implied as a (_nrows x _ncolumns) matrix _A = [[column_0],[column_1],...,[column_(_ncolumns-1)]]
    // Output: 
    // _Ainv:: array implied as a (_ncolumns x _nrows) matrix _A = [[row_0],[row_1],...,[row_(_nrows-1)]]
    // ----
    // First find the QR factorization of A: A = QR,
    // where R is upper triangular matrix.
    // Then _Ainv = R^-1*Q^T.
    // ----
    [_Q, _R] = qr_diag(_A, _nrows, _ncolumns)
    _QT = transpose(_Q, _nrows, _ncolumns)
    // Calculate Rinv:
    var _Rinv = array.new_float(_ncolumns * _ncolumns, 0)
    float _r = 0.0
    matrix_set(_Rinv, 1 / matrix_get(_R, 0, 0, _ncolumns), 0, 0, _ncolumns)
    if _ncolumns != 1
        for j = 1 to _ncolumns - 1 by 1
            for i = 0 to j - 1 by 1
                _r := 0.0
                for k = i to j - 1 by 1
                    _r += matrix_get(_Rinv, i, k, _ncolumns) * matrix_get(_R, k, j, _ncolumns)
                    _r
                matrix_set(_Rinv, _r, i, j, _ncolumns)
            for k = 0 to j - 1 by 1
                matrix_set(_Rinv, -matrix_get(_Rinv, k, j, _ncolumns) / matrix_get(_R, j, j, _ncolumns), k, j, _ncolumns)
            matrix_set(_Rinv, 1 / matrix_get(_R, j, j, _ncolumns), j, j, _ncolumns)
    //
    _Ainv = multiply(_Rinv, _QT, _ncolumns, _ncolumns, _nrows)
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
        _nrmse
    else
        int _N = array.size(_x)
        float _mse = 0.0
        for i = 0 to _N - 1 by 1
            _mse += math.pow(array.get(_x, i) - array.get(_xhat, i), 2) / _N
            _mse
        _xmean = array.sum(_x) / _N
        _nrmse := math.sqrt(_mse) / _xmean
        _nrmse
    _nrmse


diff(_src, _window, _degree) =>
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
    // Linear form: J = [ [z]^0, [z]^1, ... [z]^degree], with z = [ (1-window)/2 to (window-1)/2 ] 
    var _J = array.new_float(_window * (_degree + 1), 0)
    for i = 0 to _window - 1 by 1
        for j = 0 to _degree by 1
            matrix_set(_J, math.pow(i, j), i, j, _window)
    // Vector of raw datapoints:
    var _Y_raw = array.new_float(_window, na)
    for j = 0 to _window - 1 by 1
        array.set(_Y_raw, j, _src[_window - 1 - j])
    // Calculate polynomial coefficients which minimize the loss function
    _C = pinv(_J, _window, _degree + 1)
    _a_coef = multiply(_C, _Y_raw, _degree + 1, _window, 1)
    // For first derivative, approximate the last point (i.e. z=window-1) by 
    float _diff = 0.0
    for i = 1 to _degree by 1
        _diff += i * array.get(_a_coef, i) * math.pow(_window - 1, i - 1)
        _diff
    // Calculates data estimate (needed for rmse)
    _Y_hat = multiply(_J, _a_coef, _window, _degree + 1, 1)
    float _nrmse = norm_rmse(_Y_raw, _Y_hat)
    [_diff, _nrmse]

/// --- main ---
degree = input.int(title='Polynomial Order', group='Model Parameters:', inline='linepar1', defval=2, minval=1)
rsi_l = input.int(title='RSI Length', group='Model Parameters:', inline='linepar1', defval=21, minval=1, tooltip='The period length of RSI that is used as input.')
window = input.int(title='Length ( > Order)', group='Model Parameters:', inline='linepar2', defval=21, minval=2)
signalLength = input.int(title='Signal Length', group='Model Parameters:', inline='linepar2', defval=9, tooltip='The signal line is a EMA of the D-RSI time series.')
islong = input.bool(title='Buy', group='Show Signals:', inline='lineent', defval=true)
isshort = input.bool(title='Sell', group='Show Signals:', inline='lineent', defval=true)
showendlabels = input.bool(title='Exit', group='Show Signals:', inline='lineent', defval=true)
buycond = input.string(title='Buy', group='Entry and Exit Conditions:', inline='linecond', defval='Zero-Crossing', options=['Zero-Crossing', 'Signal Line Crossing', 'Direction Change'])
sellcond = input.string(title='Sell', group='Entry and Exit Conditions:', inline='linecond', defval='Zero-Crossing', options=['Zero-Crossing', 'Signal Line Crossing', 'Direction Change'])
endcond = input.string(title='Exit', group='Entry and Exit Conditions:', inline='linecond', defval='Zero-Crossing', options=['Zero-Crossing', 'Signal Line Crossing', 'Direction Change'])
usenrmse = input.bool(title='', group='Filter by Means of Root-Mean-Square Error of RSI Fitting:', inline='linermse', defval=false)
rmse_thrs = input.float(title='RSI fitting Error Threshold, %', group='Filter by Means of Root-Mean-Square Error of RSI Fitting:', inline='linermse', defval=10, minval=0.0) / 100


src = ta.rsi(close, rsi_l)
[drsi, nrmse] = diff(src, window, degree)
signalline = ta.ema(drsi, signalLength)

// Conditions and filters
filter_rmse = usenrmse ? nrmse < rmse_thrs : true
dirchangeup = drsi > drsi[1] and drsi[1] < drsi[2] and drsi[1] < 0.0
dirchangedw = drsi < drsi[1] and drsi[1] > drsi[2] and drsi[1] > 0.0
crossup = ta.crossover(drsi, 0.0)
crossdw = ta.crossunder(drsi, 0.0)
crosssignalup = ta.crossover(drsi, signalline)
crosssignaldw = ta.crossunder(drsi, signalline)

//Signals
golong = (buycond == 'Direction Change' ? dirchangeup : buycond == 'Zero-Crossing' ? crossup : crosssignalup) and filter_rmse
goshort = (sellcond == 'Direction Change' ? dirchangedw : sellcond == 'Zero-Crossing' ? crossdw : crosssignaldw) and filter_rmse
endlong = (endcond == 'Direction Change' ? dirchangedw : endcond == 'Zero-Crossing' ? crossdw : crosssignaldw) and filter_rmse
endshort = (endcond == 'Direction Change' ? dirchangeup : endcond == 'Zero-Crossing' ? crossup : crosssignalup) and filter_rmse
plotshape(golong and islong ? low : na, location=location.belowbar, style=shape.labelup, color=color.new(#2E7C13, 0), size=size.small, title='Buy')
plotshape(goshort and isshort ? high : na, location=location.abovebar, style=shape.labeldown, color=color.new(#BF217C, 0), size=size.small, title='Sell')
plotshape(showendlabels and endlong and islong ? high : na, location=location.abovebar, style=shape.xcross, color=color.new(#2E7C13, 0), size=size.tiny, title='Exit Long')
plotshape(showendlabels and endshort and isshort ? low : na, location=location.belowbar, style=shape.xcross, color=color.new(#BF217C, 0), size=size.tiny, title='Exit Short')

alertcondition(golong, title='Long Signal', message='D-RSI: Long Signal')
alertcondition(goshort, title='Short Signal', message='D-RSI: Short Signal')
alertcondition(endlong, title='Exit Long Signal', message='D-RSI: Exit Long')
alertcondition(endshort, title='Exit Short Signal', message='D-RSI: Exit Short')

strategy.entry('long', strategy.long, when=golong and islong)
strategy.entry('short', strategy.short, when=goshort and isshort)
strategy.close('long', when=endlong and islong)
strategy.close('short', when=endshort and isshort)


```

> Detail

https://www.fmz.com/strategy/474681

> Last Modified

2024-12-11 15:32:23
