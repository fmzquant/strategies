
> Name

基于道氏理论的RSI-MFI动量指标策略Dow-Theory-based-RSI-MFI-Momentum-Indicator-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d34532a51123d5e866.png)
[trans]

## 概述

本策略采用相对强弱指标(RSI)或资金流量指标(MFI)判断市场bull还是bear,并结合道氏理论的牛熊系数,计算出调整后的概率分布。根据不同的市场类型,采用不同的入场和出场逻辑。

## 策略原理

1. 计算RSI或MFI判断市场目前是什么状态(bull或bear)
2. 计算道氏理论的牛熊系数,反映当前价格和成交量的相关性
3. 调整RSI/MFI概率分布,确定精准的多空分布
4. 根据当前sessionId和概率判断是否入场
5. 当盈利回撤或盘整市场时止损

## 优势分析

1. 结合道氏理论,能更准确判断市场类型
2. 考虑到盘整因素,避免盲目入场
3. 损益比高,回撤低

## 风险分析 

1. 参数不当时,会产生多次误判
2. 需要足够的历史数据支持
3. 止损逻辑简单,无法针对特殊行情优化

## 优化方向

1. 可以考虑结合更多指标判断market session
2. 增加基于波动率、历史数据等更严谨的止损逻辑
3. 可以尝试机器学习等确定更好的参数

## 总结

本策略总体来说回测结果良好,有一定的实战价值。但仍需进一步测试和调整,特别是止损逻辑。作为辅助判断指标使用效果会更好,不能盲目跟单。

||

## Overview

This strategy uses Relative Strength Index (RSI) or Money Flow Index (MFI) to judge if the market is bull or bear, combined with the bull-bear coefficient from Dow Theory to calculate the adjusted probability distribution. Different entry and exit logic are adopted according to different market types.

## Strategy Principle  

1. Calculate RSI or MFI to judge the current market state (bull or bear)
2. Calculate Dow Theory bull-bear coefficient to reflect the correlation between current price and volume  
3. Adjust RSI/MFI probability distribution to determine precise long/short distribution
4. Decide whether to entry based on current sessionId and probability
5. Stop loss when profit taking or sideways market

## Advantage Analysis

1. More accurate judgement of market type combined with Dow Theory  
2. Consider sideways factor to avoid blindly entry
3. High risk-reward ratio and low drawdown

## Risk Analysis

1. Multiple misjudgements may happen with improper parameters
2. Enough historical data is needed to support
3. Simple stop loss logic cannot be optimized for special market situations 

## Optimization Direction  

1. Consider combining more indicators to judge market session
2. Add more rigorous stop loss logic based on volatility, historical data etc.  
3. Try machine learning etc. to determine better parameters

## Summary  

The overall backtest result of this strategy is good and has certain practical value. But further test and adjustment is still needed, especially for the stop loss logic. It works better as an assist judgement indicator, cannot follow blindly.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Barcolor I / 0 ? : OFF|ON|
|v_input_2|0|METHOD: RSI|MFI|
|v_input_3|5|Strategy Period|
|v_input_4|25|Oversold|
|v_input_5|75|Overbought|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-05 00:00:00
end: 2023-03-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

//MIT License

//Copyright (c) 2019 user-Noldo

//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.


strategy("Dow Factor RSI/MFI and Dependent Variable Odd Generator Strategy",shorttitle = "Dow_Factor RSI/MFI & DVOG Strategy", overlay = false, default_qty_type=strategy.percent_of_equity,commission_type=strategy.commission.percent, commission_value=0.125, default_qty_value=100 )
src = close 
lights          = input(title="Barcolor I / 0 ? ", options=["ON", "OFF"], defval="OFF")
method          = input(title="METHOD", options=["MFI", "RSI"], defval="RSI")

length = input(5, minval=2,maxval = 14, title = "Strategy Period")

// Essential Functions 

// Function Sum 

f_sum(_src , _length) => 

    _output  = 0.00 
    
    _length_adjusted = _length < 1 ? 1 : _length
    
    for i = 0 to _length_adjusted-1
        _output := _output + _src[i]


f_sma(_src, _length)=>
    _length_adjusted = _length < 1 ? 1 : _length
    float _sum = 0
    for _i = 0 to (_length_adjusted - 1)
        _sum := _sum + _src[_i]
    _return = _sum / _length_adjusted
   

// Unlocked Exponential Moving Average Function

f_ema(_src, _length)=>
    _length_adjusted = _length < 1 ? 1 : _length
    _multiplier = 2 / (_length_adjusted + 1)
    _return  = 0.00
    _return := na(_return[1]) ? _src : ((_src - _return[1]) * _multiplier) + _return[1]


// Function Standard Deviation

f_stdev(_src,_length) =>

    float _output = na 
    _length_adjusted = _length < 2 ? 2 : _length
    _avg  = f_ema(_src , _length_adjusted)
    evar  = (_src - _avg) * (_src - _avg)
    evar2 = ((f_sum(evar,_length_adjusted))/_length_adjusted)
    
    _output := sqrt(evar2)


// Linear Regression Channels : 

f_pearson_corr(_src1, _src2, _length) =>

    _length_adjusted = _length < 2 ? 2 : _length
    _ema1 = f_ema(_src1, _length_adjusted)
    _ema2 = f_ema(_src2, _length_adjusted)
    isum = 0.0
    for i = 0 to _length_adjusted - 1
        isum := isum + (_src1[i] - _ema1) * (_src2[i] - _ema2)
    isumsq1 = 0.0
    for i = 0 to _length_adjusted - 1
        isumsq1 := isumsq1 + pow(_src1[i] - _ema1, 2)
    isumsq2 = 0.0
    for i = 0 to _length_adjusted - 1
        isumsq2 := isumsq2 + pow(_src2[i] - _ema2, 2)
    pcc = isum/(sqrt(isumsq1*isumsq2))
    pcc


// Dow Theory Cycles 


dow_coeff = f_pearson_corr(src,volume,length)

dow_bull_factor = (1 + dow_coeff)
dow_bear_factor = (1 - dow_coeff)


// MONEY FLOW INDEX =====> FOR BULL OR BEAR MARKET (CLOSE)


upper_s = f_sum(volume * (change(src) <= 0 ? 0 : src), length)
lower_s = f_sum(volume * (change(src) >= 0 ? 0 : src), length)

_market_index = rsi(upper_s, lower_s)


// RSI (Close)

// Function RMA 

f_rma(_src, _length) =>
    _length_adjusted = _length < 1 ? 1 : _length
    alpha = _length_adjusted
    sum = 0.0
    sum := (_src + (alpha - 1) * nz(sum[1])) / alpha


// Function Relative Strength Index (RSI)

f_rsi(_src, _length) => 

    _output = 0.00 
    _length_adjusted = _length < 0 ? 0 : _length

    u = _length_adjusted < 1 ? max(_src - _src[_length_adjusted], 0) : max(_src - _src[1] , 0) // upward change
    d = _length_adjusted < 1 ? max(_src[_length_adjusted] - _src, 0) : max(_src[1] - _src , 0) // downward change
    rs = f_rma(u, _length) / f_rma(d, _length)
    res = 100 - 100 / (1 + rs)
    res


_rsi = f_rsi(src, length)


// Switchable Method Codes 

_method = 0.00 


if (method=="MFI")

    _method:= _market_index 
    
if (method=="RSI")

    _method:= _rsi   
    


// Conditions  

_bull_gross  = (_method )
_bear_gross  = (100 - _method )

_price_stagnant = ((_bull_gross * _bear_gross ) / 100)
_price_bull     =  (_bull_gross - _price_stagnant) 
_price_bear     =  (_bear_gross - _price_stagnant) 


_coeff_price = (_price_stagnant + _price_bull + _price_bear) / 100 

_bull     = _price_bull / _coeff_price 
_bear     = _price_bear / _coeff_price 
_stagnant = _price_stagnant / _coeff_price



// Market Types with Dow Factor

_temp_bull_gross     =  _bull     * dow_bull_factor       

_temp_bear_gross     =  _bear     * dow_bear_factor 


// Addition : Odds with Stagnant Market 


_coeff_normal = (_temp_bull_gross + _temp_bear_gross) / 100


// ********* OUR RSI / MFI VALUE ***********

_value        = _temp_bull_gross / _coeff_normal


// Temporary Pure Odds 

_temp_stagnant = ((_temp_bull_gross * _temp_bear_gross) / 100)
_temp_bull     = _temp_bull_gross - _temp_stagnant 
_temp_bear     = _temp_bear_gross - _temp_stagnant 


// Now we ll do venn scheme (Probability Cluster)
// Pure Bull + Pure Bear + Pure Stagnant = 100 
// Markets will get their share in the Probability Cluster 

 
_coeff = (_temp_stagnant + _temp_bull + _temp_bear) / 100

_odd_bull     = _temp_bull / _coeff
_odd_bear     = _temp_bear / _coeff
_odd_stagnant = _temp_stagnant / _coeff


_positive_condition     = crossover (_value,50)
_negative_condition     = crossunder(_value,50)
_stationary_condition   = ((_odd_stagnant > _odd_bull ) and (_odd_stagnant > _odd_bear))


// Strategy 

closePosition = _stationary_condition


if (_positive_condition)
    strategy.entry("Long", strategy.long, comment="Long")
    
strategy.close(id = "Long", when = closePosition )

if (_negative_condition)
    strategy.entry("Short", strategy.short, comment="Short")
    
strategy.close(id = "Short", when = closePosition )    


// Plot Data

// Plotage 

oversold   = input(25 , type = input.integer , title = "Oversold")   
overbought = input(75 , type = input.integer , title = "Overbought") 

zero    = 0 
hundred = 100
limit   = 50

// Plot Data 

stagline       = hline(limit      , color=color.new(color.white,0)   , linewidth=1, editable=false)
zeroline       = hline(zero       , color=color.new(color.silver,100), linewidth=0, editable=false)
hundredline    = hline(hundred    , color=color.new(color.silver,100), linewidth=0, editable=false)
oversoldline   = hline(oversold   , color=color.new(color.silver,100), linewidth=0, editable=false)
overboughtline = hline(overbought , color=color.new(color.silver,100), linewidth=0, editable=false)

// Filling Borders

fill(zeroline       , oversoldline   , color=color.maroon  , transp=88 , title = "Oversold Area")
fill(oversoldline   , stagline       , color=color.red     , transp=80 , title = "Bear Market")
fill(stagline       , overboughtline , color=color.green   , transp=80 , title = "Bull Market")
fill(overboughtline , hundredline    , color=color.teal    , transp=88 , title = "Overbought Market")


// Plot DOW Factor Methods

plot(_value, color = #F4C430 , linewidth = 2 , title = "DOW F-RSI" , transp = 0)

// Plot border lines

plot(oversold  ,style = plot.style_line,color = color.new(color.maroon,30),linewidth = 1)
plot(overbought,style = plot.style_line,color = color.new(color.teal,30)  ,linewidth = 1)


plot(zero     ,style = plot.style_line , color = color.new(color.silver,30) , linewidth = 1 ,editable = false)
plot(hundred  ,style = plot.style_line , color = color.new(color.silver,30) , linewidth = 1 ,editable = false)


// Switchable Barcolor ( On / Off)

_lights = 0.00 


if (lights=="ON")

    _lights:= 1.00
    
if (lights=="OFF")

    _lights:= -1.00   


bcolor_on  = _lights ==  1.00
bcolor_off = _lights == -1.00


barcolor((_positive_condition and bcolor_on)    ? color.green : (_negative_condition and bcolor_on) ? color.red : 
          (_stationary_condition and bcolor_on) ? color.yellow : na)


// Alerts 

alertcondition(_positive_condition , title='Strong Buy !', message='Strong Buy Signal ')
alertcondition(crossover(_value,overbought) , title='Gradual Buy', message='Gradual Buy Signal')
alertcondition(crossover(_value,oversold)   , title='Gradual Buy', message='Gradual Buy Signal')

alertcondition(crossunder(_value,overbought) , title='Gradual Sell', message='Gradual Sell Signal')
alertcondition(crossunder(_value,oversold)   , title='Gradual Sell', message='Gradual Sell Signal')

alertcondition(_negative_condition , title='Strong Sell !', message='Strong Sell Signal ')



```

> Detail

https://www.fmz.com/strategy/435162

> Last Modified

2023-12-12 17:54:58
