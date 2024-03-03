
> Name

Big-candle分享

> Author

a624587332



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_color_1|#000000|Bearish candle|
|v_input_color_2|#4CAF50|Bullish candle|
|v_input_float_1|1.8|Multiplier|
|v_input_int_1|120|Lookback lenght|
|v_input_int_2|7|DI Length|
|v_input_int_3|26|ADX Smoothing|
|v_input_float_2|9| stop loss|
|v_input_int_10|100| qty percent|
|v_input_float_3|1.3| Take profit|
|v_input_bool_1|true|(?BACKTEST)Backtest|
|v_input_int_4|2022|start year|
|v_input_int_5|true|start month|
|v_input_int_6|true|start day|
|v_input_int_7|2220|stop year|
|v_input_int_8|12|stop month|
|v_input_int_9|31|stop day|


> Source (PineScript)

``` pinescript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © DiegoRoz0
//@version=5
// https://cn.tradingview.com/script/76QDmNz9
// 2022年，500%的利润
strategy("Big candle", overlay=true,  pyramiding=1,initial_capital = 10000, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.04)

//inputs
colorBe = input.color(title="Bearish candle", defval=color.new(#000000, 0))
colorBu = input.color(title="Bullish candle", defval=color.new(#4CAF50, 0))
multiplier = input.float(title="Multiplier", defval=1.8)
lookback = input.int(title="Lookback lenght", defval=120)

average = math.sum(high - low, lookback) / lookback * multiplier
averageVol = math.sum(volume, 200) / 200 * multiplier * 1.5

ema = ta.ema(close, 50)
len = input.int(7, minval=1, title="DI Length")
lensig = input.int(26, title="ADX Smoothing", minval=1, maxval=50)
[diplus, diminus, adx] = ta.dmi(len, lensig)

[supertrend, direction] = ta.supertrend(2, 10)

varip usedBuCandle = false
varip usedBeCandle = false
bullishCondition = close > open and close > ema and high - low > average and adx>30 and adx < 50 and volume > averageVol and direction == -1
bearishCondition = close < open and close < ema and high - low > average and adx>30 and adx < 50 and volume > averageVol and direction == 1

if direction != direction[1]
    usedBuCandle := false
    usedBeCandle := false

barcolor(bullishCondition and usedBuCandle == false ? colorBu: bearishCondition and usedBeCandle == false ? colorBe: na)
if bullishCondition and usedBuCandle == false
    label.new(bar_index, low, color = color.green, text = "Bu ?", style = label.style_label_up)

else if bearishCondition and usedBeCandle == false
    label.new(bar_index, high, color = color.orange, text = "Be ??")

if bullishCondition
    usedBuCandle := true

else if bearishCondition 
    usedBeCandle := true 

//BACKTESTING inputs --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ACT_BT              =                   input.bool(true,                             title="Backtest",                                                                                 group= "BACKTEST")
testStartYear       =                   input.int(2022,                             title="start year",                                         minval = 1997, maxval = 3000,                                                   group= "BACKTEST") 
testStartMonth      =                   input.int(01,                               title="start month",                                        minval = 1, maxval = 12,                                                        group= "BACKTEST")
testStartDay        =                   input.int(01,                               title="start day",                                          minval = 1, maxval = 31,                                                        group= "BACKTEST")
testPeriodStart     =                   timestamp(testStartYear,testStartMonth,testStartDay,0,0)
testStopYear        =                   input.int(2220,                             title="stop year",                                          minval=1980, maxval = 2222,                                                     group= "BACKTEST")
testStopMonth       =                   input.int(12,                               title="stop month",                                         minval=1, maxval=12,                                                            group= "BACKTEST")
testStopDay         =                   input.int(31,                               title="stop day",                                           minval=1, maxval=31,                                                            group= "BACKTEST")
testPeriodStop      =                   timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)
testPeriod          =                   time >= testPeriodStart and time <= testPeriodStop ? true : false

// Backtest  ==================================================================================================================================================================================================================================================================================================================================

//Signals======================================================================================================================================================================================================================

if bullishCondition and usedBuCandle 
    strategy.entry("L", strategy.long, when=ACT_BT and testPeriod)
    
if  bearishCondition and usedBeCandle
    strategy.entry("S", strategy.short, when=ACT_BT and testPeriod)
    
per(pcnt) =>
    strategy.position_size != 0 ? math.round(pcnt / 100 * strategy.position_avg_price / syminfo.mintick) : float(na)
stoploss=input.float(title=" stop loss", defval=9, minval=0.01)
los = per(stoploss)
q=input.int(title=" qty percent", defval=100, minval=1)

tp=input.float(title=" Take profit", defval=1.3, minval=0.01)

strategy.exit("tp", qty_percent = q, profit = per(tp), loss = los)
```

> Detail

https://www.fmz.com/strategy/375951

> Last Modified

2022-08-02 14:31:12
