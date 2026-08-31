
> Name

高斯通道自适应均线策略-Gaussian-Channel-Adaptive-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1529f41d0188770f28b.png)

### Overview
The Gaussian Channel Adaptive Moving Average Strategy is a quantitative trading strategy that utilizes Gaussian filtering techniques and adaptive parameter settings. Based on the Gaussian filter theory proposed by John Ehlers, this strategy generates smooth and adaptive trading signals by applying multiple exponential moving average calculations to price data. The core of the strategy is to construct a dynamically adjusted price channel, with upper and lower bands obtained by adding and subtracting the filtered true range from the Gaussian-filtered price. When the price breaks above the upper band, a long position is entered, and when it breaks below the lower band, a short position is entered. Additionally, the strategy introduces time period parameters, allowing flexible settings for the start and end times of strategy execution, enhancing its practicality.

### Strategy Principles
The principles of the Gaussian Channel Adaptive Moving Average Strategy are as follows:
1. Calculate the Gaussian filter value of the price. Based on the user-defined sampling period and number of poles, the Beta and Alpha parameters are calculated, and then the price data undergoes multi-level Gaussian filtering to obtain a smoothed price series.
2. Calculate the Gaussian filter value of the true range. The same Gaussian filtering process is applied to the true range of the price, resulting in a smoothed range series.
3. Construct the Gaussian channel. The Gaussian-filtered price serves as the middle band, the upper band is formed by adding the product of the filtered true range and a user-defined multiplier to the middle band, and the lower band is formed by subtracting this value from the middle band, creating a dynamic channel.
4. Generate trading signals. When the price breaks above the upper band of the channel, a buy signal is generated; when the price breaks below the lower band, a sell signal is generated.
5. Introduce time period parameters. Users can set the start and end times for the strategy execution, and the strategy will only operate based on trading signals within this specified time period.

### Advantage Analysis
The Gaussian Channel Adaptive Moving Average Strategy has the following advantages:
1. Strong adaptability. The strategy employs dynamically adjusted parameters that can adapt to different market conditions and trading instruments without requiring frequent manual tuning.
2. Good trend-following capability. By constructing price channels, the strategy can effectively capture and follow market trends, avoiding false signals in choppy markets.
3. Excellent smoothing. The Gaussian filtering technique is used to smooth the price data multiple times, eliminating most market noise and making trading signals more reliable.
4. High flexibility. Users can adjust strategy parameters according to their needs, such as the sampling period, number of poles, range multiplier, etc., to optimize the strategy's performance.
5. Strong practicality. The introduction of time period parameters allows the strategy to run within a specified time range, facilitating real-world application and backtesting research.

### Risk Analysis
Despite its many advantages, the Gaussian Channel Adaptive Moving Average Strategy still carries certain risks:
1. Parameter setting risk. Inappropriate parameter settings may lead to strategy ineffectiveness or poor performance, requiring repeated testing and optimization in practical applications.
2. Sudden event risk. In the face of certain sudden major events, the strategy may not be able to react correctly in a timely manner, resulting in losses.
3. Overfitting risk. If the parameter settings are too closely fitted to historical data, the strategy may perform poorly in the future, necessitating consideration of both in-sample and out-of-sample performance.
4. Arbitrage risk. The strategy is mainly suitable for trending markets, and frequent trading in choppy markets may face significant arbitrage risks.

### Optimization Directions
The optimization directions for the Gaussian Channel Adaptive Moving Average Strategy include:
1. Dynamic parameter optimization. By introducing machine learning and other techniques, achieve automatic optimization and dynamic adjustment of strategy parameters to improve adaptability.
2. Multi-factor fusion. Combine other effective technical indicators or factors with the Gaussian channel to form more robust trading signals.
3. Position management optimization. Incorporate reasonable position management and money management rules into the strategy to control drawdowns and risks.
4. Multi-instrument coordination. Extend the strategy to multiple different trading instruments and diversify risks through asset allocation and correlation analysis.

### Summary
The Gaussian Channel Adaptive Moving Average Strategy is a quantitative trading strategy based on Gaussian filtering and adaptive parameters, which generates smooth and reliable trading signals by dynamically constructing price channels. The strategy has advantages such as strong adaptability, good trend-following capability, high smoothness, great flexibility, and strong practicality. However, it also faces risks such as parameter setting, sudden events, overfitting, and arbitrage. In the future, the strategy can be further refined and enhanced through dynamic parameter optimization, multi-factor fusion, position management optimization, and multi-instrument coordination.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_3_hlc3|0|Source: hlc3|high|low|open|hl2|close|hlcc4|ohlc4|
|v_input_4|4|Poles|
|v_input_5|144|Sampling Period|
|v_input_6|1.414|Filtered True Range Multiplier|
|v_input_7|false|Reduced Lag Mode|
|v_input_8|false|Fast Response Mode|
|v_input_1|timestamp(1 Jan 2018 00:00 +0000)|(?Dates)Date Start|
|v_input_2|timestamp(31 Dec 2060 23:59 +0000)|Date End|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-03-22 00:00:00
end: 2024-03-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Gaussian Channel Strategy v1.0", overlay=true, calc_on_every_tick=false, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.1)

// Date condition inputs
startDate = input(title="Date Start", type=input.time, defval=timestamp("1 Jan 2018 00:00 +0000"), group="Dates")
endDate = input(title="Date End", type=input.time, defval=timestamp("31 Dec 2060 23:59 +0000"), group="Dates")
timeCondition = true

// This study is an experiment utilizing the Ehlers Gaussian Filter technique combined with lag reduction techniques and true range to analyze trend activity.
// Gaussian filters, as Ehlers explains it, are simply exponential moving averages applied multiple times.
// First, beta and alpha are calculated based on the sampling period and number of poles specified. The maximum number of poles available in this script is 9.
// Next, the data being analyzed is given a truncation option for reduced lag, which can be enabled with "Reduced Lag Mode".
// Then the alpha and source values are used to calculate the filter and filtered true range of the dataset.
// Filtered true range with a specified multiplier is then added to and subtracted from the filter, generating a channel.
// Lastly, a one pole filter with a N pole alpha is averaged with the filter to generate a faster filter, which can be enabled with "Fast Response Mode". 

//Custom bar colors are included.

//Note: Both the sampling period and number of poles directly affect how much lag the indicator has, and how smooth the output is.
//      Larger inputs will result in smoother outputs with increased lag, and smaller inputs will have noisier outputs with reduced lag.
//      For the best results, I recommend not setting the sampling period any lower than the number of poles + 1. Going lower truncates the equation.

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Updates:
// Huge shoutout to @e2e4mfck for taking the time to improve the calculation method!
// -> migrated to v4
// -> pi is now calculated using trig identities rather than being explicitly defined.
// -> The filter calculations are now organized into functions rather than being individually defined.
// -> Revamped color scheme.

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Functions - courtesy of @e2e4mfck
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
 
//Filter function 
f_filt9x (_a, _s, _i) => 
    int _m2 = 0, int _m3 = 0, int _m4 = 0, int _m5 = 0, int _m6 = 0, 
    int _m7 = 0, int _m8 = 0, int _m9 = 0, float _f = .0, _x = (1 - _a)
    // Weights. 
    // Initial weight _m1 is a pole number and equal to _i
    _m2 := _i == 9 ? 36  : _i == 8 ? 28 : _i == 7 ? 21 : _i == 6 ? 15 : _i == 5 ? 10 : _i == 4 ? 6 : _i == 3 ? 3 : _i == 2 ? 1 : 0
    _m3 := _i == 9 ? 84  : _i == 8 ? 56 : _i == 7 ? 35 : _i == 6 ? 20 : _i == 5 ? 10 : _i == 4 ? 4 : _i == 3 ? 1 : 0
    _m4 := _i == 9 ? 126 : _i == 8 ? 70 : _i == 7 ? 35 : _i == 6 ? 15 : _i == 5 ? 5  : _i == 4 ? 1 : 0
    _m5 := _i == 9 ? 126 : _i == 8 ? 56 : _i == 7 ? 21 : _i == 6 ? 6  : _i == 5 ? 1  : 0 
    _m6 := _i == 9 ? 84  : _i == 8 ? 28 : _i == 7 ? 7  : _i == 6 ? 1  : 0 
    _m7 := _i == 9 ? 36  : _i == 8 ? 8  : _i == 7 ? 1  : 0 
    _m8 := _i == 9 ? 9   : _i == 8 ? 1  : 0 
    _m9 := _i == 9 ? 1   : 0
    // filter
    _f :=   pow(_a, _i) * nz(_s) + 
      _i  *     _x      * nz(_f[1])      - (_i >= 2 ? 
      _m2 * pow(_x, 2)  * nz(_f[2]) : 0) + (_i >= 3 ? 
      _m3 * pow(_x, 3)  * nz(_f[3]) : 0) - (_i >= 4 ? 
      _m4 * pow(_x, 4)  * nz(_f[4]) : 0) + (_i >= 5 ? 
      _m5 * pow(_x, 5)  * nz(_f[5]) : 0) - (_i >= 6 ? 
      _m6 * pow(_x, 6)  * nz(_f[6]) : 0) + (_i >= 7 ? 
      _m7 * pow(_x, 7)  * nz(_f[7]) : 0) - (_i >= 8 ? 
      _m8 * pow(_x, 8)  * nz(_f[8]) : 0) + (_i == 9 ? 
      _m9 * pow(_x, 9)  * nz(_f[9]) : 0)

//9 var declaration fun
f_pole (_a, _s, _i) =>
    _f1 =            f_filt9x(_a, _s, 1),      _f2 = (_i >= 2 ? f_filt9x(_a, _s, 2) : 0), _f3 = (_i >= 3 ? f_filt9x(_a, _s, 3) : 0)
    _f4 = (_i >= 4 ? f_filt9x(_a, _s, 4) : 0), _f5 = (_i >= 5 ? f_filt9x(_a, _s, 5) : 0), _f6 = (_i >= 6 ? f_filt9x(_a, _s, 6) : 0)
    _f7 = (_i >= 2 ? f_filt9x(_a, _s, 7) : 0), _f8 = (_i >= 8 ? f_filt9x(_a, _s, 8) : 0), _f9 = (_i == 9 ? f_filt9x(_a, _s, 9) : 0)
    _fn = _i == 1 ? _f1 : _i == 2 ? _f2 : _i == 3 ? _f3 :
      _i == 4     ? _f4 : _i == 5 ? _f5 : _i == 6 ? _f6 :
      _i == 7     ? _f7 : _i == 8 ? _f8 : _i == 9 ? _f9 : na
    [_fn, _f1]

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Inputs
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

//Source
src = input(defval=hlc3, title="Source")

//Poles
int N = input(defval=4, title="Poles", minval=1, maxval=9)

//Period
int per = input(defval=144, title="Sampling Period", minval=2)

//True Range Multiplier
float mult = input(defval=1.414, title="Filtered True Range Multiplier", minval=0)

//Lag Reduction
bool modeLag  = input(defval=false, title="Reduced Lag Mode")
bool modeFast = input(defval=false, title="Fast Response Mode")

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Definitions
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

//Beta and Alpha Components
beta  = (1 - cos(4*asin(1)/per)) / (pow(1.414, 2/N) - 1)
alpha = - beta + sqrt(pow(beta, 2) + 2*beta)

//Lag
lag = (per - 1)/(2*N)

//Data
srcdata = modeLag ? src + (src - src[lag]) : src
trdata  = modeLag ? tr(true) + (tr(true) - tr(true)[lag]) : tr(true)

//Filtered Values
[filtn, filt1]     = f_pole(alpha, srcdata, N)
[filtntr, filt1tr] = f_pole(alpha, trdata,  N)

//Lag Reduction
filt   = modeFast ? (filtn + filt1)/2 : filtn
filttr = modeFast ? (filtntr + filt1tr)/2 : filtntr

//Bands
hband = filt + filttr*mult
lband = filt - filttr*mult

// Colors
color1   = #0aff68
color2   = #00752d
color3   = #ff0a5a
color4   = #990032
fcolor   = filt > filt[1] ? #0aff68 : filt < filt[1] ? #ff0a5a : #cccccc
barcolor = (src > src[1]) and (src > filt) and (src < hband) ? #0aff68 : (src > src[1]) and (src >= hband) ? #0aff1b : (src <= src[1]) and (src > filt) ? #00752d : 
           (src < src[1]) and (src < filt) and (src > lband) ? #ff0a5a : (src < src[1]) and (src <= lband) ? #ff0a11 : (src >= src[1]) and (src < filt) ? #990032 : #cccccc

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Outputs
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

//Filter Plot
filtplot = plot(filt, title="Filter", color=fcolor, linewidth=3)

//Band Plots
hbandplot = plot(hband, title="Filtered True Range High Band", color=fcolor)
lbandplot = plot(lband, title="Filtered True Range Low Band", color=fcolor)

//Channel Fill
fill(hbandplot, lbandplot, title="Channel Fill", color=fcolor, transp=80)

//Bar Color
barcolor(barcolor)


longCondition = crossover(close, hband) and timeCondition
closeAllCondition = crossunder(close, hband) and timeCondition

if longCondition
    strategy.entry("long", strategy.long)

if closeAllCondition
    strategy.close("long")
```

> Detail

https://www.fmz.com/strategy/446461

> Last Modified

2024-03-28 18:08:18
