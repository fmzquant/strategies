
> Name

条件开仓马丁

> Author

陈木



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_color_1|#000000|Bearish candle|
|v_input_color_2|#4CAF50|Bullish candle|
|v_input_float_1|1.8|Multiplier|
|v_input_int_1|120|Lookback lenght|
|v_input_int_2|7|DI Length|
|v_input_int_3|26|ADX Smoothing|


> Source (PineScript)

``` pinescript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
//  DiegoRoz0
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
    label.new(bar_index, low, color = color.green, text = "Bu ", style = label.style_label_up)

else if bearishCondition and usedBeCandle == false
    label.new(bar_index, high, color = color.orange, text = "Be ")

if bullishCondition
    usedBuCandle := true

else if bearishCondition 
    usedBeCandle := true 

//BACKTESTING inputs ----------------------------
```

> Detail

https://www.fmz.com/strategy/380672

> Last Modified

2022-10-03 16:48:28
