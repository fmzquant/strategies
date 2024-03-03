
> Name

RePaNoCHa量化交易策略RePaNoCHa-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

RePaNoCHa策略是一个集成多种指标和风险管理机制的量化交易策略。它主要通过判断趋势方向和潜在反转点,发出买入和卖出信号。该策略同时具有移动止损、固定止损和止盈设置来锁定利润和控制风险。

## 策略原理

该策略集成以下多个指标:

- T3平均线:衡量价格趋势方向。

- 平均波动范围指标:识别价格波动并设置目标区域。 

- ADX指标:判断趋势强弱。

- SAR指标:显示潜在的反转点。

- RSI指标:判断超买超卖区域。

- MACD指标:显示价格动量。

当上述多个指标给出一致信号时,策略判断趋势启动,产生买入和卖出信号。入场后,策略采用线性移动止损追踪最高价/最低价的一定百分比,并随着利润增加而逐步上移,用于锁定利润。同时也具有固定百分比止损来限制最大损失。

具体来说,当价格高于目标区域上轨、T3上涨、ADX看涨、SAR看涨、RSI高于中线、MACD正值时,产生做多信号。相反条件产生做空信号。止盈和止损分别固定设置为入场价格的1%和3%。移动止损根据当前收益水平,相对入场点线性设置止损距离。

## 优势分析

- 多种指标综合判断,提高准确率

考量趋势、超买超卖、反转等多个指标,可避免单一指标误判带来的风险。

- 移动止损机制灵活跟踪,锁定盈利

移动止损距离随利润变化调整,可较好跟踪价格波动锁定利润。

- 固定止损控制最大损失

设置固定止损百分比,可以限制每单最大损失,避免亏损扩大。

- 可自定义的参数组合

指标参数可自由调整,可根据不同交易品种定制最优参数。

## 风险分析

- 多指标组合提高决策难度

过多指标可能造成指标排斥,决策判断难度增加,需要仔细评估指标效果。

- 市场剧烈波动被套或止损

在价格剧烈波动时段,容易被套或频繁触发止损,止盈难以奏效。

- 频繁交易增加交易成本

较短线操作会增加交易频率和滑点成本,影响实际盈利。

- 参数优化难度大

需要测试各种指标参数组合,优化难度较大,需足够历史数据支持。

## 优化方向

- 评估指标实际效果,避免冗余

通过对照测试,检查各指标对信号提升的实际贡献,去除冗余指标。

- 优化移动止损算法

测试不同止损 trailing 算法,寻找更好地跟踪收益的止损方式。

- 考虑实盘滑点和手续费

将实际交易成本引入回测,辅助决策是否入场。

- 分时段参数优化

分别优化高波动和低波动时段的参数,提高策略稳定性。

## 总结

RePaNoCHa策略通过集成多种指标和止损/止盈机制,实现了较为稳定的量化交易决策和盈亏管理。但其交易频率较高,且参数优化过程较为复杂。需要在回测中加入更多实盘因素,并采用对照测试等方法简化模型,降低过优化风险,从而在相对频繁的交易中获得长期稳定收益。

||

## Overview

The RePaNoCHa strategy integrates multiple indicators and risk management techniques for quantitative trading. It generates buy and sell signals primarily by identifying trend direction and potential reversal points. The strategy also incorporates trailing stop loss, fixed stop loss and take profit to lock in profits and control risks.

## Strategy Logic

The strategy integrates the following indicators:

- T3 Moving Average: To gauge price trend. 

- Average Range Filter: To identify price fluctuation zones.

- ADX: To determine trend strength.

- SAR: To mark potential reversal points.

- RSI: To identify overbought/oversold levels. 

- MACD: To display price momentum.

When the indicators give aligned signals, the strategy determines a trend has started and produces entry signals. After entering, it uses a linear trailing stop loss to follow a percentage of the highest/lowest price, gradually moving up as profits increase to lock in gains. Fixed percentage stop loss is also used to limit max loss per trade.

Specifically, when price is above range upper band, T3 rising, ADX bullish, SAR bullish, RSI above midpoint, MACD positive, long signal is generated. The opposite conditions generate short signal. Take profit and stop loss are fixed at 1% and 3% of entry price. Trailing stop distance is linearly set based on current profit relative to entry price.

## Advantage Analysis  

- Multiple indicators improve accuracy
Combining trend, momentum, reversal indicators avoids single indicator pitfalls.

- Flexible trailing stop locks in profits  
Trailing stop level adjusts with changing profits to better follow price fluctuations and secure gains.

- Fixed stop controls max loss
The fixed stop loss percentage limits maximum loss per trade and prevents loss expansion.

- Customizable parameters
Indicators parameters can be freely tuned for optimizing across different trading products.

## Risk Analysis

- Increased decision difficulty with more indicators
Too many indicators may cause contradiction and increased difficulty in decision making. Indicator effectiveness needs proper evaluation.

- Whipsaw and stop loss trigger during high volatility
Sharp volatile moves can cause whipsaw and frequent stop loss triggering, rendering take profit useless.

- Increased trading costs from higher frequency 
More short-term signals increase trade frequency and slippage costs, impacting actual profitability.

- Difficult optimization with multiple parameters
Testing various parameter combinations of indicators makes optimization challenging and requires sufficient history.

## Improvement Directions

- Evaluate actual indicator effects to avoid redundancy
Compare test results to examine the actual incremental benefits of each indicator and remove redundant ones.

- Optimize trailing stop algorithms  
Test different trailing stop algorithms to find better ways to trail profits.

- Account for real slippage and commissions
Incorporate actual trading costs into backtest to aid entry decision making.

- Separate parameter optimization by volatility
Optimize parameters separately for high/low volatility sessions to improve robustness.

## Summary

The RePaNoCHa strategy realizes relatively stable automated trading decisions and profit management through integrating multiple indicators and stop mechanisms. But its high trading frequency and complex optimization process needs further improvement. More real-world factors should be introduced into backtests, and techniques like benchmark testing should be adopted to simplify the model and reduce overfitting risks, in order to achieve consistent long-term returns from its relatively active trading approach.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|POSITIONS: BOTH|LONG|SHORT|
|v_input_2_hlc3|0|SOURCE: hlc3|high|low|open|hl2|close|hlcc4|ohlc4|
|v_input_3|3|T3 LENGTH|
|v_input_4|0.4|T3 VOLUME FACTOR|
|v_input_5|23|SAMPLING PERIOD|
|v_input_6|1.5|RANGE MULTIPLIER|
|v_input_7|12|ADX LENGTH|
|v_input_8|8|ADX THRESHOLD|
|v_input_9|0.07|SAR STAR|
|v_input_10|0.05|SAR INC|
|v_input_11|0.15|SAR MAX|
|v_input_12|14|RSI LENGHT|
|v_input_13|52|RSI CENTER LINE|
|v_input_14|10|MACD FAST LENGTH|
|v_input_15|19|MACD SLOW LENGTH|
|v_input_16|9|MACD SIGNAL SMOOTHING|
|v_input_17|false|MACD SIMPLE MA(Oscillator)|
|v_input_18|0.5|TRAILING STOP ACTIVATION %|
|v_input_19|0.25|TRAILING STOP OFFSET % --> WHEN PROFIT=0.5% (MINIMUM)|
|v_input_20|true|TRAILING STOP OFFSET % --> WHEN PROFIT=10% (LINEAR_EXTRAPOLATION)|
|v_input_21|120|TRAILING STOP DELAY (SECONDS BETWEEN SNAPSHOTS)|
|v_input_22|2|TRAILING STOP ANTI-LIQUIDATION ACTIVATION % |
|v_input_23|false|STOP LOSS|
|v_input_24|3|STOP LOSS %|
|v_input_25|true|SHOW WEEKEND|
|v_input_26|2019|BACKTEST START YEAR|
|v_input_27|true|BACKTEST START MONTH|
|v_input_28|true|BACKTEST START DAY|
|v_input_29|2|(TICKS/PIPS CORRECTION)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-18 00:00:00
end: 2023-09-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy(title = "RePaNoCHa V4 [Backtest]", overlay = true, initial_capital = 1000, pyramiding = 100,
   calc_on_order_fills = false, calc_on_every_tick = false, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_value = 0.075)

//study(title="RePaNoCHa V4 [Alerts]", overlay=true)

// 
// Copyright by XaviZ v1.0 26/07/2019 
//
// Script for automatic trading with Alerts (Use Backtest to customize your own settings)
//
// LG --> Long (green:not confirmed) (lime: confirmed)
// ST --> Short (maroon: not confirmed) (red: confirmed)
// TS --> Trailing Stop
// xL --> Close Long Position
// xS --> Close Short Position
// SL --> Stop Loss
//
// The trailing stop closes the trade if the price changes direction by a specified percentage or offset. 
// There is no ideal distance because markets and price are always changing and we know that is impossible to exit on the top or bottom. 
// This script interpolate the trailing Stop Offset with profit, higher profit --> higher Trailing Stop Offset. Despite this, it's difficult to catch the price but not impossible.
// It has a TS delay too. It take a snapshot every X seconds, if the TS is activated the alert is triggered, otherwise the price keeps fluctuating until a new snapshot. 
//
// Thanks...
//
// BTC: 3LEUP3WjQctdbFjBavcmRGUVRBje8bptCd
// ETH: 0x518AAD4746912ae506c82B747488306186c4d546
// 

// INITIAL SETTINGS
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

Position = input("BOTH", "POSITIONS", options = ["BOTH","LONG","SHORT"])
src = input(hlc3, "SOURCE", type = input.source)

// T3
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

T3_len = input(3, "T3 LENGTH", minval = 2)
a1 = input(0.4, "T3 VOLUME FACTOR", step = 0.1, minval = 0.1)

T3(_src,_T3_len,_a1)=>
    e1=ema(_src, _T3_len)
    e2=ema(e1,_T3_len)
    e3=ema(e2,_T3_len)
    e4=ema(e3,_T3_len)
    e5=ema(e4,_T3_len)
    e6=ema(e5,_T3_len)
    c1=-_a1*_a1*_a1
    c2=3*_a1*_a1+3*_a1*_a1*_a1
    c3=-6*_a1*_a1-3*_a1-3*_a1*_a1*_a1
    c4=1+3*_a1+_a1*_a1*_a1+3*_a1*_a1
    _T3=c1*e6+c2*e5+c3*e4+c4*e3
    _T3

T3_Rising = T3(src,T3_len,a1) > T3(src,T3_len,a1)[1]
T3_Falling = T3(src,T3_len,a1) < T3(src,T3_len,a1)[1]

T3_color = T3_Rising ? color.green : T3_Falling ? color.red : color.yellow

plot(T3(src,T3_len,a1), color=T3_color, linewidth = 3, title= "T3")

// RANGE FILTER
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

per = input(defval=23, title="SAMPLING PERIOD", minval=1)
mult = input(defval=1.5, title="RANGE MULTIPLIER", minval=0.1, step = 0.1)

Range_filter(_src, _per, _mult)=>
    var float _upward = 0.0
    var float _downward = 0.0
    wper      = (_per*2) - 1
    avrng     = ema(abs(_src - _src[1]), _per)
    _smoothrng = ema(avrng, wper)*_mult
    _filt  = _src
    _filt := _src > nz(_filt[1]) ? ((_src-_smoothrng) < nz(_filt[1]) ? nz(_filt[1]) : (_src-_smoothrng)) : ((_src+_smoothrng) > nz(_filt[1]) ? nz(_filt[1]) : (_src+_smoothrng))
    _upward := _filt > _filt[1] ? nz(_upward[1]) + 1 : _filt < _filt[1] ? 0 : nz(_upward[1])
    _downward := _filt < _filt[1] ? nz(_downward[1]) + 1 : _filt > _filt[1] ? 0 : nz(_downward[1])
    [_smoothrng,_filt,_upward,_downward]

[smoothrng, filt, upward, downward] = Range_filter(src, per, mult)

hband = filt + smoothrng
lband = filt - smoothrng

filtcolor = upward > 0 ? color.lime : downward > 0 ? color.red : color.orange
filtplot = plot(filt, color = filtcolor, linewidth = 3, title="Range Filter", editable = false)

hbandplot = plot(hband, color = color.aqua, transp = 60, title = "High Target", editable = false)
lbandplot = plot(lband, color = color.aqua, transp = 60, title = "Low Target", editable = false)

fill(hbandplot, filtplot, color = color.aqua, title = "High Target Range", editable = false)
fill(lbandplot, filtplot, color = color.aqua, title = "Low Target Range", editable = false)

// ADX MasaNakamura version
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

ADX_len = input(12, title="ADX LENGTH", type=input.integer, minval = 1)
th = input(8, title="ADX THRESHOLD", type=input.integer, minval = 0)

calcADX(_ADX_len)=>
    var float SmoothedTrueRange = 0.0
    var float SmoothedDirectionalMovementPlus = 0.0
    var float SmoothedDirectionalMovementMinus = 0.0
    TrueRange = max(max(high-low, abs(high-nz(close[1]))), abs(low-nz(close[1])))
    DirectionalMovementPlus = high-nz(high[1]) > nz(low[1])-low ? max(high-nz(high[1]), 0): 0
    DirectionalMovementMinus = nz(low[1])-low > high-nz(high[1]) ? max(nz(low[1])-low, 0): 0
    SmoothedTrueRange := nz(SmoothedTrueRange[1]) - (nz(SmoothedTrueRange[1])/_ADX_len) + TrueRange
    SmoothedDirectionalMovementPlus := nz(SmoothedDirectionalMovementPlus[1]) - (nz(SmoothedDirectionalMovementPlus[1])/_ADX_len) + DirectionalMovementPlus
    SmoothedDirectionalMovementMinus := nz(SmoothedDirectionalMovementMinus[1]) - (nz(SmoothedDirectionalMovementMinus[1])/_ADX_len) + DirectionalMovementMinus
    _DIPlus = SmoothedDirectionalMovementPlus / SmoothedTrueRange * 100
    _DIMinus = SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100
    DX = abs(_DIPlus-_DIMinus) / (_DIPlus+_DIMinus)*100
    _ADX = sma(DX, _ADX_len)
    [_DIPlus,_DIMinus,_ADX]
 
[DIPlus, DIMinus, ADX] = calcADX(ADX_len)

macol = DIPlus > DIMinus and ADX > th ? color.lime : DIPlus < DIMinus and ADX > th ? color.red : color.orange
barcolor(color = macol, title = "ADX")

// SAR
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

Sst = input (0.07, "SAR STAR", step=0.01, minval = 0.01)
Sinc = input (0.05, "SAR INC", step=0.01, minval = 0.01)
Smax = input (0.15, "SAR MAX", step=0.05, minval = 0.01)

CalcSARwithoutSAR(_Sst, _Sinc, _Smax)=>
    P = 1
    EP = max(high, high[1])
    _SAR = min(low, low[1])
    AF = _Sst
    EPnew = 0.0
    AFnew = _Sst
    if nz(P[1]) == 0
        P := 1
    else
        if (P[1] == 1)
            EPnew := max(high, EP[1])
        else
            EPnew := min(low, EP[1]) 
    
        if EPnew != EP[1]
            AFnew := min(_Smax, AF[1] + _Sinc)
        else
            AFnew := AF[1]
        
    if nz(P[1]) == 0
        P := 1
    else 
        if P[1] == 1 and _SAR[1] + AF[1] * (EPnew - _SAR[1]) <= low
            P := 1
            _SAR := _SAR[1] + AFnew * (EPnew - _SAR[1])
            EP := EPnew
            AF := AFnew
        else        
            if P[1] == 1 and _SAR[1] + AF[1] * (EPnew - _SAR[1]) > low
                if low >= _SAR[1]
                    P := 1
                    _SAR := low
                    EP := EPnew
                    AF := AFnew
                else
                    P := -1
                    _SAR := max(high, EP[1])
                    EP := min(low, low[1])
                    AF := _Sst
            else 
                if P[1] == -1 and _SAR[1] - AF[1] * (_SAR[1] - EPnew) >= high
                    P := -1
                    _SAR := _SAR[1] - AFnew * (_SAR[1] - EPnew)
                    EP := EPnew
                    AF := AFnew
                else
                    if P[1] == -1 and _SAR[1] - AF[1] * (_SAR[1] - EPnew) < high
                        if high <= _SAR[1]
                            P := -1
                            _SAR := high
                            EP := EPnew
                            AF := AFnew
                        else
                            P := 1
                            _SAR := min(low, EP[1])
                            EP := max(high, high[1])
                            AF := _Sst
    _SAR

SAR = CalcSARwithoutSAR(Sst, Sinc, Smax)
plot(SAR, color = macol, style = plot.style_cross, title = "SAR") 

// RSI 
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

RSI_len = input(14, "RSI LENGHT", minval = 1)
RSI_obos = input(52,title="RSI CENTER LINE", type=input.integer, minval = 1)

RSI(len)=>
    up_rsi = rma(max(change(close), 0), len)
    down_rsi = rma(-min(change(close), 0), len)
    rsi = down_rsi == 0 ? 100 : up_rsi == 0 ? 0 : 100 - (100 / (1 + up_rsi / down_rsi))
    rsi

// MACD
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

fast_length = input(title="MACD FAST LENGTH", type=input.integer, minval = 1, defval=10)
slow_length = input(title="MACD SLOW LENGTH", type=input.integer, minval = 1, defval=19)
signal_length = input(title="MACD SIGNAL SMOOTHING", type=input.integer, minval = 1, maxval = 50, defval = 9)
sma_source = input(title="MACD SIMPLE MA(Oscillator)", type=input.bool, defval=false)

MACD(_src,_fast_length,_slow_length)=>
    fast_ma = sma_source ? sma(_src, _fast_length) : ema(_src, _fast_length)
    slow_ma = sma_source ? sma(_src, _slow_length) : ema(_src, _slow_length)
    macd = fast_ma - slow_ma
    signal = sma_source ? sma(macd, signal_length) : ema(macd, signal_length)
    _hist = macd - signal
    _hist

hist = MACD(src,fast_length,slow_length)
    
// STRATEGY
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

var bool longCond = na
var bool shortCond = na
longCond := (high > hband and upward > 0) and not (DIPlus < DIMinus and ADX > th) and (SAR < close) and (T3_Rising) and (RSI(RSI_len) > RSI_obos) and (hist > 0) and (timenow > time + 10000)
shortCond := (low < lband and downward > 0) and not (DIPlus > DIMinus and ADX > th) and (SAR > close) and (T3_Falling) and (RSI(RSI_len) < RSI_obos) and (hist < 0) and (timenow > time + 10000)

var bool XlongCond = na
var bool XshortCond = na
XlongCond := (low < hband and downward > 0) and (DIPlus > DIMinus and ADX > th) and (SAR > close) and (T3_Falling) and (timenow > time + 10000)
XshortCond := (high > lband and upward > 0) and (DIPlus < DIMinus and ADX > th) and (SAR < close) and (T3_Rising) and (timenow > time + 10000)

var int CondIni_long = 0
CondIni_long := longCond ? 1 : shortCond ? -1 : CondIni_long[1]

var int CondIni_short = 0
CondIni_short := longCond ? 1 : shortCond ? -1 : CondIni_short[1]

longCondition = (longCond and CondIni_long[1] == -1)
shortCondition = (shortCond and CondIni_short[1] == 1)

var int CondIniX = 0
CondIniX := XlongCond ? 1 : XshortCond ? -1 : CondIniX[1]
XlongCondition = XlongCond and CondIniX[1] == -1
XshortCondition = XshortCond and CondIniX[1] == 1

// Get the price of the last opened long or short

var float last_open_longCondition = na
var float last_open_shortCondition = na
last_open_longCondition := longCondition ? close : nz(last_open_longCondition[1])
last_open_shortCondition := shortCondition ? close : nz(last_open_shortCondition[1])

// Check if your last postion was a long or a short

var int last_longCondition = na
var int last_shortCondition = na
last_longCondition := longCondition ? time : nz(last_longCondition[1])
last_shortCondition := shortCondition ? time : nz(last_shortCondition[1])

in_longCondition = last_longCondition > last_shortCondition
in_shortCondition = last_shortCondition > last_longCondition

var int last_XlongCondition = na
var int last_XshortCondition = na
last_XlongCondition := XlongCondition ? time : nz(last_XlongCondition[1])
last_XshortCondition := XshortCondition ? time : nz(last_XshortCondition[1])

in_longConditionX = last_longCondition > last_XlongCondition
in_shortConditionX = last_shortCondition > last_XshortCondition

// TRAILING STOP
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

isTSl = Position == "SHORT" ? na : true
isTSs = Position == "LONG" ? na : true
tsi = input(0.5, "TRAILING STOP ACTIVATION %", type = input.float, step = 0.1) 
ts_low_profit = input(0.25, "TRAILING STOP OFFSET % --> WHEN PROFIT=0.5% (MINIMUM)", type = input.float, step = 0.05, minval = 0.01)
ts_high_profit = input(1.0, "TRAILING STOP OFFSET % --> WHEN PROFIT=10% (LINEAR_EXTRAPOLATION)", type = input.float, step = 0.1, minval = 0.1)
delay = input(120, "TRAILING STOP DELAY (SECONDS BETWEEN SNAPSHOTS)", type = input.integer, minval = 30, maxval = 300, step = 30)*1000

// Dynamic Trailing Stop linear extrapolation / interpolation according with profit

ts_dynamic(x)=> 
    ts_dynamic = 0.0
    ts_dynamic := max(((((ts_high_profit-ts_low_profit)/9.5)*(x-0.5)) + ts_low_profit), ts_low_profit)

long_profit = abs(((high-last_open_longCondition)/last_open_longCondition)*100)
short_profit = abs(((low-last_open_shortCondition)/last_open_shortCondition)*100)

var float ts = 0.0
ts := in_longCondition ? ts_dynamic(long_profit) : ts_dynamic(short_profit)

// Time between snapshots

round = (floor(timenow/(delay)))*(delay)

var bool ts_delay = 0
if timenow < (time + (timeframe.multiplier*60000) - 60000)
    ts_delay := (timenow >= round + (delay)-7500) ? 1 : 0
else
    if timenow > (time + (timeframe.multiplier*60000) - 60000) 
       or ((in_longCondition and high > ((last_open_longCondition*(1+(tsi/100)))*(1+(ts/100)))) and (close < (last_open_longCondition*(1+(tsi/100))))) 
       or ((in_shortCondition and low < (last_open_shortCondition*(1-(tsi/100)))) and (close > (last_open_shortCondition*(1-(tsi/100)))))
        ts_delay := 1

// TS Conditions

var bool long_ts = na
var bool short_ts = na

if high > ((last_open_longCondition*(1+(tsi/100)))*(1+(ts/100)))
    long_ts := isTSl and high >= (close*(1+(ts/100))) and high >= (last_open_longCondition*(1+(tsi/100))) and (high >= hband*(1+(ts/100))) and in_longCondition and in_longConditionX and not longCondition
else
    if high <= ((last_open_longCondition*(1+(tsi/100)))*(1+(ts/100)))
        long_ts := isTSl and high >= (close*(1+(ts/100))) and high >= (last_open_longCondition*(1+(tsi/100))) and close >= (last_open_longCondition*(1+(tsi/100))) and (high >= hband*(1+(ts/100)))
           and in_longCondition and in_longConditionX and not longCondition

if (timenow > (time + (timeframe.multiplier*60000) - 60000)) and high < (close*(1+(ts/100))) and (high > ((last_open_longCondition*(1+(tsi/100)))*(1+(ts/100)))) and (high >= hband*(1+(ts/100)))
    long_ts := isTSl and in_longCondition and in_longConditionX and not longCondition

if low < ((last_open_shortCondition*(1-(tsi/100)))*(1-(ts/100)))      
    short_ts := isTSs and low <= (close*(1-(ts/100))) and low <= (last_open_shortCondition*(1-(tsi/100))) and (low <= lband*(1-(ts/100))) and in_shortCondition and in_shortConditionX and not shortCondition
else
    if low >= ((last_open_shortCondition*(1-(tsi/100)))*(1-(ts/100)))
        short_ts := isTSs and low <= (close*(1-(ts/100))) and low <= (last_open_shortCondition*(1-(tsi/100))) and close <= (last_open_shortCondition*(1-(tsi/100))) and (low <= lband*(1-(ts/100)))
           and in_shortCondition and in_shortConditionX and not shortCondition

if (timenow > (time + (timeframe.multiplier*60000) - 60000)) and low > (close*(1-(ts/100))) and (low < ((last_open_shortCondition*(1-(tsi/100)))*(1-(ts/100)))) and (low <= lband*(1-(ts/100)))
    short_ts := isTSs and in_shortCondition and in_shortConditionX and not shortCondition
    
// Ts Antiliquidation. For pumps on same candle of entry.

last_open_long = max(SAR[1],hband)
last_open_short = min(SAR[1],lband)

ts_antiliq_long_profit = abs(((high-last_open_long)/last_open_long)*100)
ts_antiliq_short_profit = abs(((low-last_open_short)/last_open_short)*100)

ts_antiliq = in_longCondition ? ts_dynamic(ts_antiliq_long_profit) : ts_dynamic(ts_antiliq_short_profit)

var bool long_ts_antiliq = na
var bool short_ts_antiliq = na

Act_ts_antiliq = input(2.0, "TRAILING STOP ANTI-LIQUIDATION ACTIVATION % ", type = input.float, step = 0.1)

long_ts_antiliq := isTSl and longCondition and high > ((last_open_long*(1+(Act_ts_antiliq/100)))*(1+(ts_antiliq/100))) and high > last_open_long*(1+(Act_ts_antiliq/100)) and (DIPlus > DIMinus and ADX > th) 
   and high >= (close*(1+(ts_antiliq/100))) and in_longCondition and in_longConditionX

short_ts_antiliq := isTSs and shortCondition and low < ((last_open_short*(1-(Act_ts_antiliq/100)))*(1-(ts_antiliq/100))) and low < last_open_short*(1-(Act_ts_antiliq/100)) and (DIPlus < DIMinus and ADX > th) 
   and low <= (close*(1-(ts_antiliq/100))) and in_shortCondition and in_shortConditionX
    
// Get the time of the last ts close

var int last_long_ts = na
var int last_short_ts = na
last_long_ts := long_ts ? time : nz(last_long_ts[1])
last_short_ts := short_ts ? time : nz(last_short_ts[1])

Final_Long_ts = (long_ts and last_longCondition > nz(last_long_ts[1]))
Final_Short_ts = (short_ts and last_shortCondition > nz(last_short_ts[1]))

var int last_long_ts_antiliq = na
var int last_short_ts_antiliq = na
last_long_ts_antiliq := long_ts_antiliq ? time : nz(last_long_ts_antiliq[1])
last_short_ts_antiliq := short_ts_antiliq ? time : nz(last_short_ts_antiliq[1])

Final_Long_ts_antiliq = (long_ts_antiliq and last_longCondition > nz(last_long_ts_antiliq[1]))
Final_Short_ts_antiliq = (short_ts_antiliq and last_shortCondition > nz(last_short_ts_antiliq[1]))

// STOP LOSS
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

Act_sl = input(false, "STOP LOSS")
isSLl = Position == "SHORT" ? na : true
isSLs = Position == "LONG" ? na : true
sl = input(3.0, "STOP LOSS %", type = input.float, step = 0.1)

long_sl = Act_sl and isSLl and low <= ((1-(sl/100))*last_open_longCondition) and not (open < ((1-(sl/100))*last_open_longCondition)) and in_longCondition and not longCondition
short_sl = Act_sl and isSLs and high >= ((1+(sl/100))*last_open_shortCondition) and not (open > ((1+(sl/100))*last_open_shortCondition)) and in_shortCondition and not shortCondition

// Get the time of the last sl close

var int last_long_sl = na
var int last_short_sl = na
last_long_sl := long_sl ? time : nz(last_long_sl[1])
last_short_sl := short_sl ? time : nz(last_short_sl[1])

// Sl counter

var int CondIni_long_sl = 0
CondIni_long_sl := long_sl or Final_Long_ts ? 1 : longCondition ? -1 : CondIni_long_sl[1]

var int CondIni_short_sl = 0
CondIni_short_sl := short_sl or Final_Short_ts ? 1 : shortCondition ? -1 : CondIni_short_sl[1]

Final_Long_sl = long_sl and CondIni_long_sl[1] == -1 and in_longConditionX and not XlongCondition and not Final_Long_ts
Final_Short_sl = short_sl and CondIni_short_sl[1] == -1 and in_shortConditionX and not XshortCondition and not Final_Short_ts

// Final Long & Short Counter

if Final_Long_ts or Final_Long_sl or XlongCondition
    CondIni_long := -1

if Final_Short_ts or Final_Short_sl or XshortCondition
    CondIni_short := 1

// SIGNALS
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

// long & short

Final_longCondition_notconfirmed = Position == "SHORT" ? na : longCondition and (DIPlus > DIMinus and ADX > th)
Final_shortCondition_notconfirmed = Position == "LONG" ? na : shortCondition and (DIPlus < DIMinus and ADX > th)

//plotshape(Final_longCondition_notconfirmed, title = "Long Signal", text = "LG", style=shape.triangleup, location=location.belowbar, color = #2E8B57, transp = 0, size=size.tiny)
//plotshape(Final_shortCondition_notconfirmed, title = "Short Signal", text = "ST", style=shape.triangledown, location=location.abovebar, color = #B22222, transp = 0, size=size.tiny)

Final_longCondition = Position == "SHORT" ? na : longCondition[1] and not (shortCondition and (DIPlus < DIMinus and ADX > th))
Final_shortCondition = Position == "LONG" ? na : shortCondition[1] and not (longCondition and (DIPlus > DIMinus and ADX > th))

//plotshape(Final_longCondition, title = "Long Signal", text = "LG", style=shape.triangleup, location=location.belowbar, color = color.lime, transp = 0, size=size.tiny)
//plotshape(Final_shortCondition, title = "Short Signal", text = "ST", style=shape.triangledown, location=location.abovebar, color = color.red, transp = 0, size=size.tiny)

// Xlong & Xshort

var int CondIni_Xlong = 0
CondIni_Xlong := Final_Long_ts or XlongCondition or Final_shortCondition ? 1 : Final_longCondition ? -1 : CondIni_Xlong[1]

var int CondIni_Xshort = 0
CondIni_Xshort := Final_Short_ts or XshortCondition or Final_longCondition ? 1 : Final_shortCondition ? -1 : CondIni_Xshort[1]

var bool Final_XlongCondition = na
var bool Final_XshortCondition = na

Final_XlongCondition := Position == "SHORT" ? na : 
   ((shortCondition and last_longCondition > last_shortCondition[1]) or (XlongCondition and last_longCondition > last_XlongCondition[1])) and CondIni_Xlong[1] == -1 
   and not Final_shortCondition_notconfirmed and not Final_shortCondition
Final_XshortCondition := Position == "LONG" ? na : 
   ((longCondition and last_shortCondition > last_longCondition[1]) or (XshortCondition and last_shortCondition > last_XshortCondition[1])) and CondIni_Xshort[1] == -1 
   and not Final_longCondition_notconfirmed and not Final_longCondition
   
F_XLONG = Final_XlongCondition[1] and not Final_shortCondition and not Final_shortCondition_notconfirmed and not Final_longCondition_notconfirmed
F_XSHORT = Final_XshortCondition[1] and not Final_longCondition and not Final_longCondition_notconfirmed and not Final_shortCondition_notconfirmed

//plotshape(F_XLONG, title = "xL Signal", text = "xL", style=shape.triangledown, location=location.abovebar, color = color.orange, transp = 0, size=size.tiny)
//plotshape(F_XSHORT, title = "xS Signal", text = "xS", style=shape.triangleup, location=location.belowbar, color = color.aqua, transp = 0, size=size.tiny)

// Ts

//plotshape(Final_Long_ts, text ="TS", title="Trailing Stop Long", style=shape.triangledown, location=location.abovebar, color = color.red, editable = false, transp = 0) 
//plotshape(Final_Short_ts, text ="TS", title="Trailing Stop Short", style=shape.triangleup, location=location.belowbar, color = color.lime, editable = false, transp = 0) 

//lts = iff(Final_Long_ts, high*(1-(ts/100)), na), plot(lts, style = plot.style_cross, linewidth=3, color = color.white, editable = false)
//sts = iff(Final_Short_ts, low*(1+(ts/100)), na), plot(sts, style = plot.style_cross, linewidth=3, color = color.white, editable = false)

// Ts anti-liquidation

//plotshape(Final_Long_ts_antiliq, text ="TSA", title="Trailing Stop Long Antiliq", style=shape.triangledown, location=location.abovebar, color = color.red, editable = false, transp = 0) 
//plotshape(Final_Short_ts_antiliq, text ="TSA", title="Trailing Stop Short Antiliq", style=shape.triangleup, location=location.belowbar, color = color.lime, editable = false, transp = 0) 

//lts_antiliq = iff(Final_Long_ts_antiliq, high*(1-(ts_antiliq/100)), na), plot(lts_antiliq, style = plot.style_cross, linewidth=3, color = color.white, editable = false)
//sts_antiliq = iff(Final_Short_ts_antiliq, low*(1+(ts_antiliq/100)), na), plot(sts_antiliq, style = plot.style_cross, linewidth=3, color = color.white, editable = false)

// Sl

//plotshape(Final_Long_sl, text ="SL", title="Stop Loss Long", style=shape.triangledown, location=location.abovebar, color = color.fuchsia, editable = false, transp = 0) 
//plotshape(Final_Short_sl, text ="SL", title="Stop Loss Short", style=shape.triangleup, location=location.belowbar, color = color.fuchsia, editable = false, transp = 0) 

//lsl = iff(Final_Long_sl, (1-(sl/100))*last_open_longCondition, na), plot(lsl, style = plot.style_cross, linewidth=2, color = color.white, editable = false)
//ssl = iff(Final_Short_sl, (1+(sl/100))*last_open_shortCondition, na), plot(ssl, style = plot.style_cross, linewidth=2, color = color.white, editable = false)

// Levels

plot(isTSl and in_longCondition == 1 ? (last_open_longCondition*(1+(tsi/100))) : na, "Long Trailing", color = color.white, style=3, linewidth=1, editable = false)
plot(isTSs and in_shortCondition == 1 ? (last_open_shortCondition*(1-(tsi/100))) : na, "Short Trailing", color = color.white, style=3, linewidth=1, editable = false)

//plot(isTSl and longCondition and high > last_open_long*(1+(Act_ts_antiliq/100)) and (DIPlus > DIMinus and ADX > th) ? 
//   last_open_long*(1+(Act_ts_antiliq/100)) : na, "Long TSA", color = color.lime, style=3, linewidth=2, editable = false)
//plot(isTSs and shortCondition and low < last_open_short*(1-(Act_ts_antiliq/100)) and (DIPlus < DIMinus and ADX > th) ? 
//   last_open_short*(1-(Act_ts_antiliq/100)) : na, "Short TSA", color = color.red, style=3, linewidth=2, editable = false)

// Weekend

Weekend = input(true, "SHOW WEEKEND")
W_color = Weekend and (dayofweek == dayofweek.sunday or dayofweek == dayofweek.saturday) ? color.teal : na
bgcolor(W_color, title = "WEEKEND")

// ALERTS
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

// or Final_longCondition_notconfirmed (green signals)
//alertcondition(
//   Final_longCondition,  
//   title="Long Alert", 
//   message = "LONG"
//   )
   
// or Final_shortCondition_notconfirmed (maroon signals)
//alertcondition(
//   Final_shortCondition, 
//   title="Short Alert", 
//   message = "SHORT"
//   )

//alertcondition(
//   (Final_Long_ts and ts_delay)
//   or F_XLONG 
//   or Final_Long_sl 
//   or (Final_Long_ts_antiliq and close >= (last_open_long*(1+(Act_ts_antiliq/100)))), 
//   title="XLong TS/XL/SL Alert", 
//   message = "XLONG TS/XL/SL"
//   )

//alertcondition(
//   (Final_Short_ts and ts_delay) 
//   or F_XSHORT 
//   or Final_Short_sl 
//   or (Final_Short_ts_antiliq and close <= (last_open_short*(1-(Act_ts_antiliq/100)))), 
//   title="XShort TS/XL/SL Alert", 
//   message = "XSHORT TS/XL/SL"
//   )

// BOT SYNTAX (DERIBIT EXAMPLE)
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

// message = "LONG | e=DERIBIT a=ACCOUNT s=BTC-PERPETUAL c=order | delay=1 | e=DERIBIT a=ACCOUNT s=BTC-PERPETUAL c=position b=short t=market | delay=2 | e=DERIBIT a=ACCOUNT s=BTC-PERPETUAL b=long q=50% t=market | delay=2 | e=DERIBIT a=ACCOUNT s=BTC-PERPETUAL c=position b=long sl=-3.1% p=-3%"
// message = "SHORT | e=DERIBIT a=ACCOUNT s=BTC-PERPETUAL c=order | delay=1 | e=DERIBIT a=ACCOUNT s=BTC-PERPETUAL c=position b=long t=market | delay=2 | e=DERIBIT a=ACCOUNT s=BTC-PERPETUAL b=short q=50% t=market | delay=2 | e=DERIBIT a=ACCOUNT s=BTC-PERPETUAL c=position b=short sl=3% p=3.1%"
// message = "XSHORT/TS/SL | e=DERIBIT a=ACCOUNT s=BTC-PERPETUAL c=order | delay=2 | e=DERIBIT a=ACCOUNT s=BTC-PERPETUAL c=position b=short t=market"
// message = "XLONG/TS/SL | e=DERIBIT a=ACCOUNT s=BTC-PERPETUAL c=order | delay=2 | e=DERIBIT a=ACCOUNT s=BTC-PERPETUAL c=position b=long t=market"
//
// Using t=limit on entries --> comission_value = 0.025

// BACKTESTING
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

BT_Final_longCondition = Position == "SHORT" ? na : longCondition
BT_Final_shortCondition = Position == "LONG" ? na : shortCondition

testStartYear = input(2019, "BACKTEST START YEAR", minval = 1, maxval = 2222) 
testStartMonth = input(01, "BACKTEST START MONTH", minval = 1, maxval = 12)
testStartDay = input(01, "BACKTEST START DAY", minval = 1, maxval = 31)
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

if (BT_Final_longCondition)
    strategy.entry("long", strategy.long, when = time >= testPeriodStart)
if (BT_Final_shortCondition) 
    strategy.entry("short", strategy.short, when = time >= testPeriodStart)
    
pips_corection = input(2, "(TICKS/PIPS CORRECTION)")

strategy.exit("Tsl", "long", trail_points = (abs((last_open_longCondition*(1+(tsi/100)))-last_open_longCondition)*pips_corection),
   trail_offset = (high*(ts/100))*pips_corection, loss = Act_sl ? (abs((last_open_longCondition*(1-(sl/100)))-last_open_longCondition)*pips_corection) : na) 
strategy.exit("Tss", "short", trail_points = (abs((last_open_shortCondition*(1-(tsi/100)))-last_open_shortCondition)*pips_corection),
   trail_offset = (low*(ts/100))*pips_corection, loss = Act_sl ? (abs((last_open_shortCondition*(1+(sl/100)))-last_open_shortCondition)*pips_corection) : na) 

strategy.close_all(when = Final_XlongCondition or Final_XshortCondition or Final_Long_sl or Final_Short_sl)
  
```

> Detail

https://www.fmz.com/strategy/427823

> Last Modified

2023-09-25 18:29:33
