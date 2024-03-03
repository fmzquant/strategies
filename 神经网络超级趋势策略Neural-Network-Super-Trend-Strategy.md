
> Name

神经网络超级趋势策略Neural-Network-Super-Trend-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

## 策略原理

该策略融合了神经网络模型、RSI指标和超级趋势指标来进行交易。

具体逻辑是:

1. 构建神经网络模型,输入包括成交量变化率、布林带、RSI等多维数据

2. 网络预测得到未来价格变化率

3. 计算RSI指标值,并将RSI与预测价格变化率进行组合

4. 根据RSI指标值生成动态止损线

5. 当价格跌破上行止损线则做空;当价格突破下行止损线则做多

6. 结合超级趋势指标的趋势判断进行过滤

该策略充分利用神经网络对复杂数据的模拟能力,并辅以RSI和超级趋势等指标进行信号验证,在提高判断准确性的同时控制交易风险。

## 策略优势

- 神经网络对多维数据建模判断趋势

- RSI止损保护利润,超级趋势辅助判断

- 多指标组合验证,提高信号质量

## 策略风险

- 需要大量数据进行神经网络训练

- RSI和超级趋势参数需优化调整

- 效果依赖模型判断,存在不确定性

## 总结

该策略通过机器学习技术辅以传统指标判断,在追求高效的同时控制风险。但其参数调整和模型可解释性仍需完善。

||

## Strategy Logic

This strategy combines a neural network model, RSI indicator and Super Trend indicator for trading. 

The logic is:

1. Build a neural network model with inputs including volume change, Bollinger Bands, RSI etc.

2. The network predicts future price change rate

3. Calculate RSI values and combine with predicted price change 

4. Generate dynamic stop loss lines based on RSI 

5. Go short when price breaks above up stop loss; go long when price breaks below down stop

6. Use Super Trend trend judgment for filtration

The strategy leverages neural networks' ability to model complex data, with additional signal verification from indicators like RSI and Super Trend to improve accuracy while controlling risk.

## Advantages

- Neural networks model multidimensional data to determine trends

- RSI stops protect profits, Super Trend assists judgement

- Multiple indicators combine to improve signal quality

## Risks

- Requires large datasets for neural network training 

- Fine-tuning of RSI and Super Trend parameters needed

- Performance depends on model predictions, uncertainties exist

## Summary

This strategy combines machine learning with traditional techniques for efficiency with risk controls. But parameters and model interpretability need improvement.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10000|Buy quantity|
|v_input_2|2019|Backtest Start Year|
|v_input_3|true|Backtest Start Month|
|v_input_4|true|Backtest Start Day|
|v_input_5|false|Backtest Start Hour|
|v_input_6|false|Backtest Start Minute|
|v_input_7|2099|Backtest Stop Year|
|v_input_8|true|Backtest Stop Month|
|v_input_9|30|Backtest Stop Day|
|v_input_10|14|length|
|v_input_11|12|MACD Fast Length|
|v_input_12|26|MACD Slow Length|
|v_input_13|9|MACD Signal Length|
|v_input_14|21|RSI Period|
|v_input_15|4|RSI Multiplier|
|v_input_16|false|Take Wicks into Account ?|
|v_input_17|true|Show Buy/Sell Labels ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//ANN taken from https://www.tradingview.com/script/Eq4zZsTI-ANN-MACD-BTC/
//it only work for BTC as the ANN is trained for this data only
//super trend https://www.tradingview.com/script/VLWVV7tH-SuperTrend/
// Strategy version created for @che_trader
strategy ("ANN RSI SUPER TREND STRATEGY BY che_trader", overlay = true)
qty = input(10000, "Buy quantity")

testStartYear = input(2019, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testStartHour = input(0, "Backtest Start Hour")
testStartMin = input(0, "Backtest Start Minute")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,testStartHour,testStartMin)
testStopYear = input(2099, "Backtest Stop Year")
testStopMonth = input(1, "Backtest Stop Month")
testStopDay = input(30, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)
testPeriod() => true

max_bars_back = (21)
src = close[0]

// Essential Functions

// Highest - Lowest Functions ( All efforts goes to RicardoSantos )

f_highest(_src, _length)=>
    _adjusted_length = _length < 1 ? 1 : _length
    _value = _src
    for _i = 0 to (_adjusted_length-1)
        _value := _src[_i] >= _value ? _src[_i] : _value
    _return = _value

f_lowest(_src, _length)=>
    _adjusted_length = _length < 1 ? 1 : _length
    _value = _src
    for _i = 0 to (_adjusted_length-1)
        _value := _src[_i] <= _value ? _src[_i] : _value
    _return = _value

// Function Sum  

f_sum(_src , _length) => 

    _output  = 0.00 
    
    _length_adjusted = _length < 1 ? 1 : _length
    
    for i = 0 to _length_adjusted-1
        _output := _output + _src[i]


// Unlocked Exponential Moving Average Function

f_ema(_src, _length)=>
    _length_adjusted = _length < 1 ? 1 : _length
    _multiplier = 2 / (_length_adjusted + 1)
    _return  = 0.00
    _return := na(_return[1]) ? _src : ((_src - _return[1]) * _multiplier) + _return[1]


// Unlocked Moving Average Function 

f_sma(_src, _length)=>
    
    _output = 0.00
    _length_adjusted = _length < 0 ? 0 : _length
    w = cum(_src)

    _output:= (w - w[_length_adjusted]) / _length_adjusted
   
    _output    


// Definition : Function Bollinger Bands

Multiplier = 2 
_length_bb = 20


e_r = f_sma(src,_length_bb)


// Function Standard Deviation : 

f_stdev(_src,_length) =>

    float _output = na 
    _length_adjusted = _length < 2 ? 2 : _length
    _avg  = f_ema(_src , _length_adjusted)
    evar  = (_src - _avg) * (_src - _avg)
    evar2 = ((f_sum(evar,_length_adjusted))/_length_adjusted)
    
    _output := sqrt(evar2)


std_r = f_stdev(src , _length_bb )


upband = e_r + (Multiplier * std_r)  // Upband
dnband = e_r - (Multiplier * std_r)  // Lowband
basis  = e_r                         // Midband

// Function : RSI


length = input(14, minval=1) // 


f_rma(_src, _length) =>
    _length_adjusted = _length < 1 ? 1 : _length
    alpha = _length_adjusted
    sum = 0.0
    sum := (_src + (alpha - 1) * nz(sum[1])) / alpha



f_rsi(_src, _length) => 

    _output = 0.00 
    _length_adjusted = _length < 0 ? 0 : _length

    u = _length_adjusted < 1 ? max(_src - _src[_length_adjusted], 0) : max(_src - _src[1] , 0) // upward change
    d = _length_adjusted < 1 ? max(_src[_length_adjusted] - _src, 0) : max(_src[1] - _src , 0) // downward change
    rs = f_rma(u, _length) / f_rma(d, _length)
    res = 100 - 100 / (1 + rs)
    res


_rsi = f_rsi(src, length)


// MACD 

_fastLength   = input(12 , title = "MACD Fast Length")
_slowlength   = input(26 , title = "MACD Slow Length")
_signalLength = input(9  , title = "MACD Signal Length")


_macd   = f_ema(close, _fastLength) - f_ema(close, _slowlength)
_signal = f_ema(_macd, _signalLength)
	   
_macdhist = _macd - _signal


// Inputs on Tangent Function : 

tangentdiff(_src) => nz((_src - _src[1]) / _src[1] ) 


// Deep Learning Activation Function (Tanh) : 

ActivationFunctionTanh(v) => (1 - exp(-2 * v))/( 1 + exp(-2 * v))


// DEEP LEARNING 

// INPUTS : 

input_1 = tangentdiff(volume)
input_2 = tangentdiff(dnband)
input_3 = tangentdiff(e_r)
input_4 = tangentdiff(upband)
input_5 = tangentdiff(_rsi)
input_6 = tangentdiff(_macdhist)

// LAYERS : 

// Input Layers 

n_0 = ActivationFunctionTanh(input_1 + 0)   
n_1 = ActivationFunctionTanh(input_2 + 0) 
n_2 = ActivationFunctionTanh(input_3 + 0) 
n_3 = ActivationFunctionTanh(input_4 + 0) 
n_4 = ActivationFunctionTanh(input_5 + 0)
n_5 = ActivationFunctionTanh(input_6 + 0)


// Hidden Layers 

n_6   = ActivationFunctionTanh( -2.580743 * n_0 + -1.883627 * n_1 + -3.512462 * n_2 + -0.891063 * n_3 + -0.767728 * n_4 + -0.542699 * n_5 +  0.221093) 
n_7   = ActivationFunctionTanh( -0.131977 * n_0 + -1.543499 * n_1 +  0.019450 * n_2 +  0.041301 * n_3 + -0.926690 * n_4 + -0.797512 * n_5 + -1.804061) 
n_8   = ActivationFunctionTanh( -0.587905 * n_0 + -7.528007 * n_1 + -5.273207 * n_2 +  1.633836 * n_3 +  6.099666 * n_4 +  3.509443 * n_5 + -4.384254) 
n_9   = ActivationFunctionTanh( -1.026331 * n_0 + -1.289491 * n_1 + -1.702887 * n_2 + -1.052681 * n_3 + -1.031452 * n_4 + -0.597999 * n_5 + -1.178839) 
n_10  = ActivationFunctionTanh( -5.393730 * n_0 + -2.486204 * n_1 +  3.655614 * n_2 +  1.051512 * n_3 + -2.763198 * n_4 +  6.062295 * n_5 + -6.367982) 
n_11  = ActivationFunctionTanh(  1.246882 * n_0 + -1.993206 * n_1 +  1.599518 * n_2 +  1.871801 * n_3 +  0.294797 * n_4 + -0.607512 * n_5 + -3.092821) 
n_12  = ActivationFunctionTanh( -2.325161 * n_0 + -1.433500 * n_1 + -2.928094 * n_2 + -0.715416 * n_3 + -0.914663 * n_4 + -0.485397 * n_5 + -0.411227) 
n_13  = ActivationFunctionTanh( -0.350585 * n_0 + -0.810108 * n_1 + -1.756149 * n_2 + -0.567176 * n_3 + -0.954021 * n_4 + -1.027830 * n_5 + -1.349766) 


// Output Layer 

_output  = ActivationFunctionTanh(2.588784 * n_6  + 0.100819 * n_7  + -5.305373 * n_8  + 1.167093 * n_9  + 
                                  3.770143 * n_10 + 1.269190 * n_11 +  2.090862 * n_12 + 0.839791 * n_13 + -0.196165)

_chg_src = tangentdiff(src) * 100

_seed = (_output - _chg_src)
// BEGIN ACTUAL STRATEGY
length1 = input(title="RSI Period", type=input.integer, defval=21)
mult = input(title="RSI Multiplier", type=input.float, step=0.1, defval=4.0)
wicks = input(title="Take Wicks into Account ?", type=input.bool, defval=false)
showLabels = input(title="Show Buy/Sell Labels ?", type=input.bool, defval=true)

srsi = mult* rsi(_seed ,length1)

longStop = hl2 - srsi
longStopPrev = nz(longStop[1], longStop)
longStop := (wicks ? low[1] : close[1]) > longStopPrev ? max(longStop, longStopPrev) : longStop

shortStop = hl2 + srsi
shortStopPrev = nz(shortStop[1], shortStop)
shortStop := (wicks ? high[1] : close[1]) < shortStopPrev ? min(shortStop, shortStopPrev) : shortStop

dir = 1
dir := nz(dir[1], dir)
dir := dir == -1 and (wicks ? high : close) > shortStopPrev ? 1 : dir == 1 and (wicks ? low : close) < longStopPrev ? -1 : dir

longColor = color.green
shortColor = color.red

plot(dir == 1 ? longStop : na, title="Long Stop", style=plot.style_linebr, linewidth=2, color=longColor)
buySignal = dir == 1 and dir[1] == -1
plotshape(buySignal ? longStop : na, title="Long Stop Start", location=location.absolute, style=shape.circle, size=size.tiny, color=longColor, transp=0)
plotshape(buySignal and showLabels ? longStop : na, title="Buy Label", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=longColor, textcolor=color.white, transp=0)

plot(dir == 1 ? na : shortStop, title="Short Stop", style=plot.style_linebr, linewidth=2, color=shortColor)
sellSignal = dir == -1 and dir[1] == 1
plotshape(sellSignal ? shortStop : na, title="Short Stop Start", location=location.absolute, style=shape.circle, size=size.tiny, color=shortColor, transp=0)
plotshape(sellSignal and showLabels ? shortStop : na, title="Sell Label", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=shortColor, textcolor=color.white, transp=0)





if testPeriod() and buySignal
    strategy.entry("Long",strategy.long)

if testPeriod() and sellSignal
    strategy.entry("Short",strategy.short)
```

> Detail

https://www.fmz.com/strategy/426809

> Last Modified

2023-09-14 16:49:38
