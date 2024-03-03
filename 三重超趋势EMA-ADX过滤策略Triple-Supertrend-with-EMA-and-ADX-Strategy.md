
> Name

三重超趋势EMA-ADX过滤策略Triple-Supertrend-with-EMA-and-ADX-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

这是一种融合三重超趋势、EMA和ADX指标的量化交易策略。它利用三重超趋势系统发出交易信号,并结合EMA和ADX作为过滤条件,以控制交易频率、提高交易信号质量。

## 策略原理

- 使用三组不同参数的超趋势系统,当三组超趋势都同向时产生交易信号。
- 应用EMA作为趋势过滤器,只有当收盘价高于EMA时做多,收盘价低于EMA时做空。
- 应用ADX作为趋势强弱过滤器,只有当ADX高于设定阈值时才交易。  
- 允许选择是否重入,控制盈利能力和止损风险。

具体来说,长入场条件为三重超趋势都转为看涨、收盘价高于EMA、ADX高于设定值时开多仓;短入场条件为三重超趋势都转为看空、收盘价低于EMA、ADX高于设定值时开空仓。平仓条件为任一超趋势转向时平掉当前仓位。

该策略同时绘制三组超趋势的支撑阻力线,辅助判断趋势方向。

## 优势分析

- 三重超趋势系统可过滤假突破,提高入场准确率。
- EMA和ADX双过滤降低 whipsaw 带来的损失,增强止损能力。  
- 允许选择是否重入,可根据个人风险偏好调整策略的盈利能力。
- 结合视觉上的超趋势支撑阻力线,有助判断趋势方向。

## 风险分析

- 超趋势等指标存在滞后问题,可能出现晚入场、提前出场的情况。
- 选择过于严格的过滤条件会导致错过机会。
- 在缩量整理的市场中,容易形成 whipsaw 带来损失。
- 允许重入会增加交易频率和滑点成本。

可以通过调整参数组合、优化过滤条件等方法来降低这些风险。同时要控制好仓位规模,严格止损,以应对不确定的市场情况。

## 优化方向

该策略可以从以下几个方面进行优化:

- 测试不同的参数组合,找到最佳的超趋势和EMA参数。
- 优化ADX的门槛值,降低假信号。
- 添加其他指标过滤,如波动率、成交量等。
- 针对不同品种分别优化参数,提高适应性。
- 建立动态止损机制,主动控制风险。
- 尝试机器学习等方法寻找更好的入场和出场规则。

## 总结

本策略充分利用三重超趋势系统的优势,并辅以EMA和ADX双重过滤,可有效提高交易信号质量,控制风险。通过参数优化、增加过滤条件、动态止损等方法可以进一步增强策略的健壮性和适应性。与趋势判断相结合,该策略可为量化交易提供有效的入场和出场信号。

|| 

## Overview

This is a quantitative trading strategy that combines triple supertrend, EMA and ADX indicators. It generates trading signals using a triple supertrend system and applies EMA and ADX as filters to control trade frequency and improve signal quality.

## Strategy Logic

- Use three supertrend systems with different parameters and generate trading signals when all three supertrends agree on direction.

- Apply EMA as a trend filter, only go long when close is above EMA and go short when close is below EMA.

- Apply ADX as a trend strength filter, only trade when ADX is above a threshold.

- Allow re-entry option to adjust profitability and risk control.

Specifically, the long entry condition is when all three supertrends turn bullish, close is above EMA and ADX is higher than the threshold. The short entry condition is when all three supertrends turn bearish, close is below EMA and ADX is higher than the threshold. Exit when any of the supertrends reverse direction. 

The strategy also plots supertrend support and resistance lines to aid visual trend determination.

## Advantage Analysis  

- Triple supertrend system filters false breakouts and improves entry accuracy.

- EMA and ADX double filters reduce whipsaw losses and enhance risk management.

- Re-entry option allows adjusting profitability based on risk preference.

- Visual supertrend lines help determine trend direction.

## Risk Analysis

- Supertrend and other indicators have lag and may cause late entry or early exit.

- Too strict filters may miss opportunities. 

- Whipsaws may cause losses in range-bound markets.

- Allowing re-entry increases trade frequency and slippage costs.

These risks can be reduced by optimizing parameters, filters and using dynamic stops. Position sizing and strict stops should be applied to address uncertain market conditions.

## Optimization Directions

This strategy can be optimized in several aspects:

- Test different parameter combinations to find optimal supertrend and EMA settings.

- Optimize ADX threshold to reduce false signals.

- Add other filters like volatility, volume etc.

- Optimize parameters separately for different products.

- Build dynamic stop loss mechanisms for better risk control.

- Explore machine learning for finding better entry and exit rules.

## Summary

This strategy utilizes the strengths of triple supertrend systems and augments it with EMA and ADX double filters to effectively improve signal quality and control risks. Further enhancements in parameters, filters, dynamic stops can improve its robustness and adaptiveness. Combined with trend analysis, it provides effective entry and exit signals for quantitative trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_4|200|EMA Len|
|v_input_int_5|14|ADX Len|
|v_input_int_6|14|Di Len|
|v_input_float_4|25|adx filter|
|v_input_bool_1|false|Add Adx & EMA filter|
|v_input_bool_2|true|Allow Reentry|
|v_input_float_1|true|(?ST 1)ATR Multi|
|v_input_int_1|10|ATR Multi|
|v_input_float_2|2|(?ST 2)ATR Multi|
|v_input_int_2|15|ATR Multi|
|v_input_float_3|3|(?ST 3)ATR Multi|
|v_input_int_3|20|ATR Multi|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-09-17 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// ©kunjandetroja


//@version=5
strategy('Triple Supertrend with EMA and ADX', overlay=true)

m1 = input.float(1,"ATR Multi",minval = 1,maxval= 6,step=0.5,group='ST 1')
m2 = input.float(2,"ATR Multi",minval = 1,maxval= 6,step=0.5,group='ST 2')
m3 = input.float(3,"ATR Multi",minval = 1,maxval= 6,step=0.5,group='ST 3')
p1 = input.int(10,"ATR Multi",minval = 5,maxval= 25,step=1,group='ST 1')
p2 = input.int(15,"ATR Multi",minval = 5,maxval= 25,step=1,group='ST 2')
p3 = input.int(20,"ATR Multi",minval = 5,maxval= 25,step=1,group='ST 3')
len_EMA = input.int(200,"EMA Len",minval = 5,maxval= 250,step=1)
len_ADX = input.int(14,"ADX Len",minval = 1,maxval= 25,step=1)
len_Di = input.int(14,"Di Len",minval = 1,maxval= 25,step=1)
adx_above = input.float(25,"adx filter",minval = 1,maxval= 50,step=0.5)
var bool long_position = false
adx_filter = input.bool(false, "Add Adx & EMA filter")
renetry = input.bool(true, "Allow Reentry")

f_getColor_Resistance(_dir, _color) =>
    _dir == 1 and _dir == _dir[1] ? _color : na
f_getColor_Support(_dir, _color) =>
    _dir == -1 and _dir == _dir[1] ? _color : na

[superTrend1, dir1] = ta.supertrend(m1, p1)
[superTrend2, dir2] = ta.supertrend(m2, p2)
[superTrend3, dir3] = ta.supertrend(m3, p3)
EMA = ta.ema(close, len_EMA)
[diplus,diminus,adx] = ta.dmi(len_Di,len_ADX)

// ADX Filter
adxup = adx > adx_above and close > EMA
adxdown = adx > adx_above and close < EMA

sum_dir = dir1 + dir2 + dir3

dir_long = if(adx_filter == false)
    sum_dir == -3
else
    sum_dir == -3 and adxup
dir_short = if(adx_filter == false)
    sum_dir == 3
else
    sum_dir == 3 and adxdown
Exit_long = dir1 == 1 and dir1 != dir1[1]
Exit_short = dir1 == -1 and dir1 != dir1[1]

// BuySignal = dir_long and dir_long != dir_long[1]
// SellSignal = dir_short and dir_short != dir_short[1]
// if BuySignal
//     label.new(bar_index, low, 'Long', style=label.style_label_up)
// if SellSignal
//     label.new(bar_index, high, 'Short', style=label.style_label_down)

longenter = if(renetry == false)
    dir_long and long_position == false
else
    dir_long
shortenter = if(renetry == false)
    dir_short and long_position == true
else
    dir_short
if longenter
    long_position := true
if shortenter
    long_position := false

strategy.entry('BUY', strategy.long, when=longenter)
strategy.entry('SELL', strategy.short, when=shortenter)   
strategy.close('BUY', Exit_long)
strategy.close('SELL', Exit_short)

buy1 = ta.barssince(dir_long)
sell1 = ta.barssince(dir_short)

colR1 = f_getColor_Resistance(dir1, color.red)
colS1 = f_getColor_Support(dir1, color.green)

colR2 = f_getColor_Resistance(dir2, color.orange)
colS2 = f_getColor_Support(dir2, color.yellow)

colR3 = f_getColor_Resistance(dir3, color.blue)
colS3 = f_getColor_Support(dir3, color.maroon)

plot(superTrend1, 'R1', colR1, linewidth=2)
plot(superTrend1, 'S1', colS1, linewidth=2)

plot(superTrend2, 'R1', colR2, linewidth=2)
plot(superTrend2, 'S1', colS2, linewidth=2)

plot(superTrend3, 'R1', colR3, linewidth=2)
plot(superTrend3, 'S1', colS3, linewidth=2)

// // Intraday only
// var int new_day = na
// var int new_month = na
// var int new_year = na
// var int close_trades_after_time_of_day = na

// if dayofmonth != dayofmonth[1]
//     new_day := dayofmonth
// if month != month[1]
//     new_month := month
// if year != year[1]
//     new_year := year
// close_trades_after_time_of_day := timestamp(new_year,new_month,new_day,15,15)

// strategy.close_all(time > close_trades_after_time_of_day) 

```

> Detail

https://www.fmz.com/strategy/427121

> Last Modified

2023-09-18 14:02:12
