
> Name

Triple-Supertrend-with-EMA-and-ADX

> Author

ChaoZhang

> Strategy Description

Publishing a strategy that includes adx and ema filter as well

Entry: all three Supertrend turns positive. If a filter of ADX and EMA is applied, also check if ADX is above the selected level and close is above EMA
Exit: when the first supertrend turns negative

opposite for short entries

A FIlter is given to take or avoid re-enter on the same side. For example, After a long exit, if the entry condition is satisfied again for long before the short single is triggered it takes re-entry if selected.

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/18f728137093b0473f5.png) 

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
start: 2022-02-07 00:00:00
end: 2022-05-07 00:00:00
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

//buy1 = ta.barssince(dir_long)
//sell1 = ta.barssince(dir_short)

//colR1 = f_getColor_Resistance(dir1, color.red)
//colS1 = f_getColor_Support(dir1, color.green)

//colR2 = f_getColor_Resistance(dir2, color.orange)
//colS2 = f_getColor_Support(dir2, color.yellow)

//colR3 = f_getColor_Resistance(dir3, color.blue)
//colS3 = f_getColor_Support(dir3, color.maroon)

//plot(superTrend1, 'R1', colR1, linewidth=2)
//plot(superTrend1, 'S1', colS1, linewidth=2)

//plot(superTrend2, 'R1', colR2, linewidth=2)
//plot(superTrend2, 'S1', colS2, linewidth=2)

//plot(superTrend3, 'R1', colR3, linewidth=2)
//plot(superTrend3, 'S1', colS3, linewidth=2)

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

https://www.fmz.com/strategy/361880

> Last Modified

2022-05-08 21:16:55
