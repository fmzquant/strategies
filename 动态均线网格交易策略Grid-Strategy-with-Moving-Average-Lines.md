
> Name

动态均线网格交易策略Grid-Strategy-with-Moving-Average-Lines

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/181aa589911d945c7af.png)
 [trans]

## 概述

该策略是一个利用移动均线的动态网格交易策略。它会根据设置的均线和波动幅度,在均线上下划定多个买卖区和卖区。当价格进入不同买卖区时,会发出不同数量的买入信号;当价格重新进入卖区时,会按顺序平仓。这样形成一个动态调整的网格交易策略。

## 策略原理  

1. 用户设置移动均线参数,决定主要交易中轴;
2. 根据ATR和设置参数,在均线上下划分多个买入区和卖出区;  
3. 当价格进入不同买入区时,会触发对应数量的做多信号;
4. 当价格重新回到相应的卖出区时,会按顺序平仓;
5. 形成一个动态调整的网格交易机制。

## 策略优势  

1. 利用均线判断趋势方向,避免逆势建仓;
2. ATR参数综合考虑市场波动性,使网格更加动态化;  
3. 多层次分批建仓,可控制风险;
4. 按顺序分批止损,避免瀑布式亏损;
5. 简单参数设置,易于操作。

## 策略风险

1. 大幅震荡可能造成网格频繁触发亏损;
2. 强势趋势中,止损点可能过于靠近,造成拉升后快速止损;
3. 多重建仓增加交易次数,手续费负担重;
4. 不适用于横盘震荡市或无明确趋势市场。  

可通过适当放宽网格间距、优化ATR参数、减少建仓次数等方法降低风险。也可以根据不同市场设定趋势交易和震荡交易两种参数组合。

## 优化方向  

1. 可以加入现货指数指标判断大盘走势,区分多空市场;
2. 可以添加量化指标筛选具有趋势特征的品种进行策略运用;  
3. 可以根据波动率实时调整ATR参数或网格间距;
4. 可以添加止盈策略,跟踪趋势获取更多利润。  

这样可以进一步优化,使策略更具有动态性和局部增强性。

## 总结

本策略整体是一个较为成熟简单的趋势跟踪网格策略。它利用均线判断大趋势,再建立动态网格进行分批交易。具有一定的风险控制能力。通过进一步量化优化,可以成为一个非常实用的量化工具。

|| 

## Overview  

This is a grid trading strategy that utilizes moving average lines dynamically. It draws multiple buy and sell zones above and below the moving average line based on settings of the MA and volatility range. When price drops into different buy zones, corresponding long orders will be opened. When price goes back into sell zones, opened orders will be closed sequentially. Thus forms a dynamic grid trading mechanism.

## Strategy Logic

1. Users set parameters for determining major moving average line;  
2. Multiple buy and sell zones are divided based on ATR and settings;
3. When price drops into different buying zones, corresponding long orders are triggered;  
4. When price moves back into sell zones, orders are closed sequentially;
5. A dynamic grid trading system is formed eventually.

## Advantages

1. Using MA line to determine trend direction avoids trading against major trend;
2. ATR parameter considers market volatility, making grid more dynamic;
3. Opening orders in batches controls risks;  
4. Closing orders sequentially avoids cascade stop loss; 
5. Simple parameters, easy to operate.

## Risks 

1. Significant fluctuation may frequently trigger grid losses;
2. In strong trends, stop loss points could be too close leading to quick post-pullback stops;
3. Increased transactions from multiple entries produce higher commission fees;
4. Not suitable for range-bound or trendless markets.

Risks can be reduced by relaxing grid interval, optimizing ATR parameter, reducing order quantities etc. Different parameter sets could also be used for trending and ranging scenarios.  

## Optimization Directions 

1. Spot index indicators can be added to determine bullish/bearish bias;
2. Quantitative indicators can be used to select assets with trend characteristics;
3. ATR parameters or grid intervals can be adjusted dynamically based on volatility; 
4. Profit taking mechanism can be added to follow trends.

These further optimizations will make the strategy more dynamic and locally enhanced.  

## Conclusion  

In conclusion, this is an overall mature and simple trend-following grid strategy. It uses moving averages to determine major trends, and establishes dynamic grid mechanism for batched trades. Has certain risk control capabilities. With further quant optimizations, it can become a very practical quant tool.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_2|0|Grid Logic: ATR|Percent|
|v_input_int_1|100|(?MA)MA Length|
|v_input_string_1|0|MA Type: SMA|HMA|LSMA|RMA|EMA|WMA|
|v_input_float_1|2.5|(?Parameter)Band Multiplier/Percent|
|v_input_int_2|100|(?parameter)ATR Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-13 00:00:00
end: 2023-12-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Seungdori_

//@version=5
strategy("Grid Strategy with MA", overlay=true, initial_capital = 100000, default_qty_type = strategy.cash, default_qty_value = 10000, pyramiding = 10, process_orders_on_close = true, commission_type = strategy.commission.percent, commission_value = 0.04)


//Inputs//

length = input.int(defval = 100, title = 'MA Length', group = 'MA')
MA_Type = input.string("SMA", title="MA Type", options=['EMA', 'HMA', 'LSMA', 'RMA', 'SMA', 'WMA'],group = 'MA')

logic = input.string(defval='ATR', title ='Grid Logic', options = ['ATR', 'Percent'])

band_mult = input.float(2.5, step = 0.1, title = 'Band Multiplier/Percent', group = 'Parameter')
atr_len = input.int(defval=100, title = 'ATR Length', group ='parameter')
//Var//

var int order_cond = 0
var bool order_1 = false
var bool order_2 = false
var bool order_3 = false
var bool order_4 = false
var bool order_5 = false
var bool order_6 = false
var bool order_7 = false
var bool order_8 = false
var bool order_9 = false
var bool order_10 = false
var bool order_11 = false
var bool order_12 = false
var bool order_13 = false
var bool order_14 = false
var bool order_15 = false


/////////////////////
//Region : Function//
/////////////////////
getMA(source ,ma_type, length) =>
    maPrice = ta.ema(source, length)
    ema = ta.ema(source, length)
    sma = ta.sma(source, length)
    if ma_type == 'SMA'
        maPrice := ta.sma(source, length)
        maPrice
    if ma_type == 'HMA'
        maPrice := ta.hma(source, length)
        maPrice
    if ma_type == 'WMA'
        maPrice := ta.wma(source, length)
        maPrice
    if ma_type == "RMA"
        maPrice := ta.rma(source, length)
    if ma_type == "LSMA"
        maPrice := ta.linreg(source, length, 0)
    maPrice

main_plot = getMA(ohlc4, MA_Type, length)


atr = ta.atr(length)

premium_zone_1 = logic == 'ATR' ? ta.ema(main_plot + atr*(band_mult*1), 5) : ta.ema((main_plot*(1+band_mult*0.01*1)), 5)
premium_zone_2 = logic == 'ATR' ? ta.ema(main_plot + atr*(band_mult*2), 5) : ta.ema((main_plot*(1+band_mult*0.01*2)), 5)
premium_zone_3 = logic == 'ATR' ? ta.ema(main_plot + atr*(band_mult*3), 5) : ta.ema((main_plot*(1+band_mult*0.01*3)), 5)
premium_zone_4 = logic == 'ATR' ? ta.ema(main_plot + atr*(band_mult*4), 5) : ta.ema((main_plot*(1+band_mult*0.01*4)), 5)
premium_zone_5 = logic == 'ATR' ? ta.ema(main_plot + atr*(band_mult*5), 5) : ta.ema((main_plot*(1+band_mult*0.01*5)), 5)
premium_zone_6 = logic == 'ATR' ? ta.ema(main_plot + atr*(band_mult*6), 5) : ta.ema((main_plot*(1+band_mult*0.01*6)), 5)
premium_zone_7 = logic == 'ATR' ? ta.ema(main_plot + atr*(band_mult*7), 5) : ta.ema((main_plot*(1+band_mult*0.01*7)), 5)
premium_zone_8 = logic == 'ATR' ? ta.ema(main_plot + atr*(band_mult*8), 5) : ta.ema((main_plot*(1+band_mult*0.01*8)), 5)
//premium_zone_9 = ta.rma(main_plot + atr*(band_mult*9), 5)
//premium_zone_10 = ta.rma(main_plot + atr*(band_mult*10), 5)


discount_zone_1 = logic == 'ATR' ? ta.ema(main_plot - atr*(band_mult*1), 5) : ta.ema((main_plot*(1-band_mult*0.01*1)), 5)
discount_zone_2 = logic == 'ATR' ? ta.ema(main_plot - atr*(band_mult*2), 5) : ta.ema((main_plot*(1-band_mult*0.01*2)), 5)
discount_zone_3 = logic == 'ATR' ? ta.ema(main_plot - atr*(band_mult*3), 5) : ta.ema((main_plot*(1-band_mult*0.01*3)), 5)
discount_zone_4 = logic == 'ATR' ? ta.ema(main_plot - atr*(band_mult*4), 5) : ta.ema((main_plot*(1-band_mult*0.01*4)), 5)
discount_zone_5 = logic == 'ATR' ? ta.ema(main_plot - atr*(band_mult*5), 5) : ta.ema((main_plot*(1-band_mult*0.01*5)), 5)
discount_zone_6 = logic == 'ATR' ? ta.ema(main_plot - atr*(band_mult*6), 5) : ta.ema((main_plot*(1-band_mult*0.01*6)), 5)
discount_zone_7 = logic == 'ATR' ? ta.ema(main_plot - atr*(band_mult*7), 5) : ta.ema((main_plot*(1-band_mult*0.01*7)), 5)
discount_zone_8 = logic == 'ATR' ? ta.ema(main_plot - atr*(band_mult*8), 5) : ta.ema((main_plot*(1-band_mult*0.01*8)), 5)
//discount_zon_9 = ta.sma(main_plot - atr*(band_mult*9), 5)
//discount_zone_10 =ta.sma( main_plot - atr*(band_mult*10), 5)

//Region End//

////////////////////
// Region : Plots//
///////////////////

dis_low1 = plot(discount_zone_1, color=color.new(color.green, 80))
dis_low2 = plot(discount_zone_2, color=color.new(color.green, 70))
dis_low3 = plot(discount_zone_3, color=color.new(color.green, 60))
dis_low4 = plot(discount_zone_4, color=color.new(color.green, 50))
dis_low5 = plot(discount_zone_5, color=color.new(color.green, 40))
dis_low6 = plot(discount_zone_6, color=color.new(color.green, 30))
dis_low7 = plot(discount_zone_7, color=color.new(color.green, 20))
dis_low8 = plot(discount_zone_8, color=color.new(color.green, 10))
//dis_low9 = plot(discount_zone_9, color=color.new(color.green, 0))
//dis_low10 = plot(discount_zone_10, color=color.new(color.green, 0))

plot(main_plot, color =color.new(color.gray, 10))

pre_up1 = plot(premium_zone_1, color=color.new(color.red, 80))
pre_up2 = plot(premium_zone_2, color=color.new(color.red, 70))
pre_up3 = plot(premium_zone_3, color=color.new(color.red, 60))
pre_up4 = plot(premium_zone_4, color=color.new(color.red, 50))
pre_up5 = plot(premium_zone_5, color=color.new(color.red, 40))
pre_up6 = plot(premium_zone_6, color=color.new(color.red, 30))
pre_up7 = plot(premium_zone_7, color=color.new(color.red, 20))
pre_up8 = plot(premium_zone_8, color=color.new(color.red, 10))
//pre_up9 = plot(premium_zone_9, color=color.new(color.red, 0))
//pre_up10 = plot(premium_zone_10, color=color.new(color.red, 0))

fill(dis_low1, dis_low2, color=color.new(color.green, 95))
fill(dis_low2, dis_low3, color=color.new(color.green, 90))
fill(dis_low3, dis_low4, color=color.new(color.green, 85))
fill(dis_low4, dis_low5, color=color.new(color.green, 80))
fill(dis_low5, dis_low6, color=color.new(color.green, 75))
fill(dis_low6, dis_low7, color=color.new(color.green, 70))
fill(dis_low7, dis_low8, color=color.new(color.green, 65))
//fill(dis_low8, dis_low9, color=color.new(color.green, 60))
//fill(dis_low9, dis_low10, color=color.new(color.green, 55))

fill(pre_up1, pre_up2, color=color.new(color.red, 95))
fill(pre_up2, pre_up3, color=color.new(color.red, 90))
fill(pre_up3, pre_up4, color=color.new(color.red, 85))
fill(pre_up4, pre_up5, color=color.new(color.red, 80))
fill(pre_up5, pre_up6, color=color.new(color.red, 75))
fill(pre_up6, pre_up7, color=color.new(color.red, 70))
fill(pre_up7, pre_up8, color=color.new(color.red, 65))
//fill(pre_up8, pre_up9, color=color.new(color.red, 60))
//fill(pre_up9, pre_up10, color=color.new(color.red, 55))



//Region End//

///////////////////////
//Region : Strategies//
///////////////////////

//Longs//

longCondition1 = ta.crossunder(low, discount_zone_7)
longCondition2 = ta.crossunder(low, discount_zone_6)
longCondition3 = ta.crossunder(low, discount_zone_5)
longCondition4 = ta.crossunder(low, discount_zone_4)
longCondition5 = ta.crossunder(low, discount_zone_3)
longCondition6 = ta.crossunder(low, discount_zone_2)
longCondition7 = ta.crossunder(low, discount_zone_1)
longCondition8 = ta.crossunder(low, main_plot)
longCondition9 = ta.crossunder(low, premium_zone_1)
longCondition10 = ta.crossunder(low, premium_zone_2)
longCondition11 = ta.crossunder(low, premium_zone_3)
longCondition12 = ta.crossunder(low, premium_zone_4)
longCondition13 = ta.crossunder(low, premium_zone_5)
longCondition14 = ta.crossunder(low, premium_zone_6)
longCondition15 = ta.crossunder(low, premium_zone_7)

if (longCondition1) and order_1 == false
    strategy.entry("Long1", strategy.long)
    order_1 := true
if (longCondition2) and order_2 == false
    strategy.entry("Long2", strategy.long)
    order_2 := true
if (longCondition3) and order_3 == false
    strategy.entry("Long3", strategy.long)
    order_3 := true
if (longCondition4) and order_4 == false
    strategy.entry("Long4", strategy.long)
    order_4 := true
if (longCondition5) and order_5 == false
    strategy.entry("Long5", strategy.long)
    order_5 := true
if (longCondition6) and order_6 == false
    strategy.entry("Long6", strategy.long)
    order_6 := true
if (longCondition7) and order_7 == false
    strategy.entry("Long7", strategy.long)
    order_7 := true
if (longCondition8) and order_8 == false
    strategy.entry("Long8", strategy.long)
    order_8 := true
if (longCondition9) and order_9 == false
    strategy.entry("Long9", strategy.long)
    order_9 := true
if (longCondition10) and order_10 == false
    strategy.entry("Long10", strategy.long)
    order_10 := true
if (longCondition11) and order_11 == false
    strategy.entry("Long11", strategy.long)
    order_11 := true
if (longCondition12) and order_12 == false
    strategy.entry("Long12", strategy.long)
    order_12 := true
if (longCondition13) and order_13 == false
    strategy.entry("Long13", strategy.long)
    order_13 := true
if (longCondition14) and order_14 == false
    strategy.entry("Long14", strategy.long)
    order_14 := true
if (longCondition15) and order_15 == false
    strategy.entry("Long14", strategy.long)
    order_15 := true

//Close//

shortCondition1 = ta.crossover(high, discount_zone_6)
shortCondition2 = ta.crossover(high, discount_zone_5)
shortCondition3 = ta.crossover(high, discount_zone_4)
shortCondition4 = ta.crossover(high, discount_zone_3)
shortCondition5 = ta.crossover(high, discount_zone_2)
shortCondition6 = ta.crossover(high, discount_zone_1)
shortCondition7 = ta.crossover(high, main_plot)
shortCondition8 = ta.crossover(high, premium_zone_1)
shortCondition9 = ta.crossover(high, premium_zone_2)
shortCondition10 = ta.crossover(high, premium_zone_3)
shortCondition11 = ta.crossover(high, premium_zone_4)
shortCondition12 = ta.crossover(high, premium_zone_5)
shortCondition13 = ta.crossover(high, premium_zone_6)
shortCondition14 = ta.crossover(high, premium_zone_7)
shortCondition15 = ta.crossover(high, premium_zone_8)

if (shortCondition1) and order_1 == true
    strategy.close("Long1")
    order_1 := false
if (shortCondition2) and order_2 == true
    strategy.close("Long2")
    order_2 := false
if (shortCondition3) and order_3 == true
    strategy.close("Long3")
    order_3 := false
if (shortCondition4) and order_4 == true
    strategy.close("Long4")
    order_4 := false
if (shortCondition5) and order_5 == true
    strategy.close("Long5")
    order_5 := false
if (shortCondition6) and order_6 == true
    strategy.close("Long6")
    order_6 := false
if (shortCondition7) and order_7 == true
    strategy.close("Long7")
    order_7 := false
if (shortCondition8) and order_8 == true
    strategy.close("Long8")
    order_8 := false
if (shortCondition9) and order_9 == true
    strategy.close("Long9")
    order_9 := false
if (shortCondition10) and order_10 == true
    strategy.close("Long10")
    order_10 := false
if (shortCondition11) and order_11 == true
    strategy.close("Long11")
    order_11 := false
if (shortCondition12) and order_12 == true
    strategy.close("Long12")
    order_12 := false
if (shortCondition13) and order_13 == true
    strategy.close("Long13")
    order_13 := false
if (shortCondition14) and order_14 == true
    strategy.close("Long14")
    order_14 := false
if (shortCondition15) and order_15 == true
    strategy.close("Long15")
    order_15 := false


```

> Detail

https://www.fmz.com/strategy/435954

> Last Modified

2023-12-20 13:55:15
