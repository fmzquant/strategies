
> Name

RSI-VWAP量价策略RSI-VWAP-Price-Volume-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

RSI-VWAP量价策略是一种趋势跟随策略。它结合了相对强弱指数(RSI)和成交量加权平均价(VWAP)两个指标,实现在趋势中的多次加仓与止损。该策略适用于中长线趋势交易。

## 原理

当RSI指标线从超买区回落进入超卖区时,认为趋势反转,做多;当RSI指标线从超卖区上涨进入超买区时,认为趋势反转,做空。 

多仓的止损线为最新开仓价的(1-止损比例),止盈线为持仓均价的(1+止盈比例);空仓类似。

每次开仓后,如果再次触发信号,可以进行加仓,加仓次数最多为5次,每次加仓量递增,实现趋势追踪。

## 优势

1. 结合RSI指标和VWAP指标,可以更好地判断趋势反转点。

2. 采用多次加仓,可以充分利用趋势行情。随着加仓次数的增加,持仓量逐步扩大,实现趋势跟踪。

3. 设置止损线,可以有效控制风险。持仓出现亏损后止损出场,避免亏损进一步扩大。

4. 设置追踪止盈,锁定盈利,避免盈利回吐。

## 风险

1. RSI指标存在repaint现象,实际信号触发点可能发生偏差。

2. VWAP也可能出现repaint。实际的最优入场点只能事后确定。

3. 止损点设置不当可能造成不必要的损失。

4. 止盈点设置不当,可能使盈利无法实现。

5. 趋势判断错误,持续做多(空)可能扩大亏损。

## 优化

1. 优化RSI参数,寻找最佳长度周期。

2. 优化超买超卖区域,使其更准确判断趋势反转。

3. 测试不同的加仓策略,找到最佳加仓方式。

4. 对止损止盈进行优化,找到最优参数。

5. 尝试结合其它指标判断趋势,提高确定趋势反转的概率。

## 总结

RSI-VWAP量价策略,运用RSI指标结合VWAP指标判断趋势反转点,设置多次加仓跟踪趋势行情,在盈利达到预设标准时止盈,出现亏损时止损,综合考虑风险控制和盈利保护。通过参数优化,可以获得更好的策略效果。该策略适合有一定经验的交易者进行中长线趋势交易。

||

## Overview

The RSI-VWAP price-volume strategy is a trend following strategy. It combines the Relative Strength Index (RSI) and Volume Weighted Average Price (VWAP) to implement pyramiding and stop loss in trends. This strategy is suitable for medium-to-long term trend trading.

## Principle  

When the RSI line falls from the overbought zone into the oversold zone, it is considered a trend reversal signal to go long. When the RSI line rises from the oversold zone into the overbought zone, it is considered a trend reversal signal to go short.

The stop loss for long positions is set at (1-stop loss percentage) of the latest entry price. The take profit is set at (1+take profit percentage) of the average holding price. The settings for short positions are similar.

After each new entry, the strategy allows up to 5 additional pyramiding entries if the signal triggers again. The position size increases with each new entry to follow the trend.

## Advantages

1. Combining the RSI indicator and VWAP indicator helps better identify trend reversal points.

2. Pyramiding entries allow taking full advantage of trending moves. As the number of entries increases, the position size gradually expands to follow the trend.

3. The stop loss effectively controls risks. Exits are triggered when a loss occurs to avoid further losses.

4. The trailing take profit locks in profits and avoids giving back gains.

## Risks  

1. The RSI indicator has repainting. Actual signal timing may deviate.

2. VWAP may also repaint. The actual optimal entry can only be determined in hindsight.

3. Improper stop loss placement may cause unnecessary losses. 

4. Improper take profit placement may prevent gains from being realized.

5. Wrong trend judgment can increase losses from persistently holding long or short positions.

## Enhancements

1. Optimize RSI parameters to find the optimal lookback period.

2. Optimize the overbought/oversold zones for better trend reversal signals.

3. Test different pyramiding strategies to find the optimal approach. 

4. Optimize the stops and takes to find the best parameters.

5. Try combining other indicators to increase probability of accurately detecting trend reversals.

## Conclusion

The RSI-VWAP strategy identifies trend reversal points using RSI and VWAP, pyramids to follow the trend, takes profit when predefined targets are met, and stops out with a loss. It balances risk management and profit protection. Further optimizations can improve strategy performance. This strategy suits experienced traders for medium-to-long term trend trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|LONG / SHORT: LONG ONLY|LONG & SHORT|
|v_input_2|true|RSI VOLUME WEIGHTED AVERAGE PRICE|
|v_input_3|17|RSI-VWAP LENGTH|
|v_input_4|19|RSI-VWAP OVERSOLD|
|v_input_5|80|RSI-VWAP OVERBOUGHT|
|v_input_6|5|PYRAMIDING ?|
|v_input_7|true|ACTIVATE SL / DEACTIVATE RE-ENTRY|
|v_input_8|7.5|STOP LOSS / RE-ENTRY %|
|v_input_9|false|ACTIVATE TAKE PROFIT|
|v_input_10|10|TAKE PROFIT %|
|v_input_11|true|BACKTEST ?|
|v_input_12|1000|$ QUANTITY 1ST ENTRY|
|v_input_13|500|$ INCREASE NEXT ENTRY|
|v_input_14|2019|BACKTEST START YEAR ⏲️|
|v_input_15|true|BACKTEST START MONTH|
|v_input_16|true|BACKTEST START DAY|
|v_input_17|2222|BACKTEST STOP YEAR|
|v_input_18|12|BACKTEST STOP MONTH|
|v_input_19|31|BACKTEST STOP DAY|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-10-07 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Xaviz

//#####©ÉÉÉÉ¶N###############################################
//####*..´´´´´´,,,»ëN########################################
//###ë..´´´´´´,,,,,,''%©#####################################
//###'´´´´´´,,,,,,,'''''?¶###################################
//##o´´´´´´,,,,,,,''''''''*©#################################
//##'´´´´´,,,,,,,'''''''^^^~±################################
//#±´´´´´,,,,,,,''''''''^í/;~*©####æ%;í»~~~~;==I±N###########
//#»´´´´,,,,,,'''''''''^;////;»¶X/í~~/~~~;=~~~~~~~~*¶########
//#'´´´,,,,,,''''''''^^;////;%I^~/~~/~~~=~~~;=?;~~~~;?ë######
//©´´,,,,,,,''''''''^^~/////X~/~~/~~/~~»í~~=~~~~~~~~~~^;É####
//¶´,,,,,,,''''''''^^^;///;%;~/~~;í~~»~í?~?~~~?I/~~~~?*=íÑ###
//N,,,,,,,'''''''^^^^^///;;o/~~;;~~;£=»í»;IX/=~~~~~~^^^^'*æ##
//#í,,,,,''''''''^^^^^;;;;;o~»~~~~íX//~/»~;í?IíI»~~^/*?'''=N#
//#%,,,'''''''''^^^^^^í;;;;£;~~~//»I»/£X/X/»í*&~~~^^^^'^*~'É#
//#©,,''''''''^^^^^^^^~;;;;&/~/////*X;í;o*í»~=*?*===^'''''*£#
//##&''''''''^^^^^^^^^^~;;;;X=í~~~»;;;/~;í»~»±;^^^^^';=''''É#
//##N^''''''^^^^^^^^^^~~~;;;;/£;~~/»~~»~~///o~~^^^^''''?^',æ#
//###Ñ''''^^^^^^^^^^^~~~~~;;;;;í*X*í»;~~IX?~~^^^^/?'''''=,=##
//####X'''^^^^^^^^^^~~~~~~~~;;íííííí~~í*=~~~~Ií^'''=''''^»©##
//#####£^^^^^^^^^^^~~~~~~~~~~~íííííí~~~~~*~^^^;/''''='',,N###
//######æ~^^^^^^^^~~~~~~~~~~~~~~íííí~~~~~^*^^^'=''''?',,§####
//########&^^^^^^~~~~~~~~~~~~~~~~~~~~~~~^^=^^''=''''?,íN#####
//#########N?^^~~~~~~~~~~~~~~~~~~~~~~~~^^^=^''^?''';í@#######
//###########N*~~~~~~~~~~~~~~~~~~~~~~~^^^*'''^='''/É#########
//##############@;~~~~~~~~~~~~~~~~~~~^^~='''~?'';É###########
//#################É=~~~~~~~~~~~~~~^^^*~'''*~?§##############
//#####################N§£I/~~~~~~»*?~»o§æN##################

//@version=4
// strategy("RSI-VWAP", overlay=true, initial_capital = 1000, currency = "USD", pyramiding = 5, default_qty_type = strategy.cash, default_qty_value = 1000, commission_value = 0.04)

//Uncomment for alerts
//study("RSI-VWAP INDICATOR", overlay=true)

// ================================================================================================================================================================================
// VARIABLES
// ================================================================================================================================================================================

var bool longCondition = na, var bool shortCondition = na, var bool Xlong = na,
var int CondIni_Xlong = 0, var bool XlongCondition = na
var float last_open_longCondition = na, var float last_open_shortCondition = na
var int last_longCondition = 0, var int last_shortCondition = 0
var int last_long_sl = na, var int last_short_sl = na
var bool CondIni_long_sl = 0, var bool CondIni_short_sl = 0
var int nLongs = na, var int nShorts = na, var int pyr = na
var float sum_long = 0.0, var float sum_short = 0.0
var float Position_Price = 0.0, Position_Price := nz(Position_Price[1])
var bool Final_Long_sl = na, var bool Final_Short_sl = na, var bool Act_sl = na, var float sl = na
var int last_long_tp = na, var int last_short_tp = na
var bool CondIni_long_tp = 0, var bool CondIni_short_tp = 0
var float Quantity = na, var float Increase = na
var float sum_qty_l = na, var float sum_qty_s = na

// ================================================================================================================================================================================
// RSI VWAP INDICATOR
// ================================================================================================================================================================================

// Initial inputs
Positions = input("LONG ONLY", "LONG / SHORT", options = ["LONG & SHORT","LONG ONLY"])
Long_only = Positions == "LONG ONLY" ? true : na
Act_RSI_VWAP = input(true, "RSI VOLUME WEIGHTED AVERAGE PRICE")
RSI_VWAP_length = input(17, "RSI-VWAP LENGTH")
RSI_VWAP_overSold = input(19, "RSI-VWAP OVERSOLD", type=input.float)
RSI_VWAP_overBought = input(80, "RSI-VWAP OVERBOUGHT", type=input.float)

// RSI with VWAP as source
RSI_VWAP = rsi(vwap(close), RSI_VWAP_length)

// Plotting, overlay=false
//r=plot(RSI_VWAP, color = RSI_VWAP > RSI_VWAP_overBought ? color.red : RSI_VWAP < RSI_VWAP_overSold ? color.lime : color.teal, title="rsi", linewidth=2, style=plot.style_line)
//h1=plot(RSI_VWAP_overBought, color = color.gray, style=plot.style_stepline)
//h2=plot(RSI_VWAP_overSold, color = color.gray, style=plot.style_stepline)
//fill(r,h1, color = RSI_VWAP > RSI_VWAP_overBought ? color.red : na, transp = 75)
//fill(r,h2, color = RSI_VWAP < RSI_VWAP_overSold ? color.lime : na, transp = 75)

// ================================================================================================================================================================================
// STRATEGY
// ================================================================================================================================================================================

// Long/Short/Xlong Conditions
longCondition := (crossover(RSI_VWAP, RSI_VWAP_overSold)) and (nz(nLongs[1]) < pyr)
shortCondition := (crossunder(RSI_VWAP, RSI_VWAP_overBought)) and (nz(nShorts[1]) < pyr) and not Long_only
Xlong := (crossunder(RSI_VWAP, RSI_VWAP_overBought)) and Long_only
CondIni_Xlong := longCondition ? 1 : Xlong ? -1 : nz(CondIni_Xlong[1])
XlongCondition := Xlong and nz(CondIni_Xlong[1]) == 1

// Get the price of the last opened long or short
last_open_longCondition := longCondition ? close : nz(last_open_longCondition[1])
last_open_shortCondition := shortCondition ? close : nz(last_open_shortCondition[1])

// Get the bar time of the last opened long or short
last_longCondition := longCondition ? time : nz(last_longCondition[1])
last_shortCondition := shortCondition ? time : nz(last_shortCondition[1])

// In long/short conditions
in_longCondition = last_longCondition > last_shortCondition
in_shortCondition = last_shortCondition > last_longCondition

// ================================================================================================================================================================================
// PRICE AVERAGE / PYRAMIDING
// ================================================================================================================================================================================

// Pyramiding
pyr := input(5, "PYRAMIDING ?")

// Counting long & short iterations
nLongs := nz(nLongs[1])
nShorts := nz(nShorts[1])

// Longs Counter
if longCondition or (Final_Long_sl and not Act_sl)
    nLongs := nLongs + 1
    nShorts := na
    
// Shorts Counter
if shortCondition or (Final_Short_sl and not Act_sl)
    nLongs := na
    nShorts := nShorts + 1

// Quantity Factor
QF_l = Quantity+(Increase*(nLongs-1))
QF_s = Quantity+(Increase*(nShorts-1))

// Price average of your position according to the quantities
if longCondition
    sum_long := nz(last_open_longCondition)*QF_l + nz(sum_long[1])
    sum_short := 0.0
    sum_qty_l := QF_l + nz(sum_qty_l[1])
    sum_qty_s := na
    
if Final_Long_sl and not Act_sl
    sum_long := ((1-(sl/100))*last_open_longCondition)*QF_l + nz(sum_long[1])
    sum_short := 0.0
    sum_qty_l := QF_l + nz(sum_qty_l[1])
    sum_qty_s := na
    
if shortCondition
    sum_short := nz(last_open_shortCondition)*QF_s + nz(sum_short[1])
    sum_long := 0.0
    sum_qty_s := QF_s + nz(sum_qty_s[1])
    sum_qty_l := na
    
if Final_Short_sl and not Act_sl
    sum_long := 0.0
    sum_short := ((1+(sl/100))*last_open_shortCondition)*QF_s + nz(sum_short[1])
    sum_qty_s := QF_s + nz(sum_qty_s[1])
    sum_qty_l := na
    
// Calculating and Plotting the price average
Position_Price := nz(Position_Price[1])
Position_Price := longCondition or (Final_Long_sl and not Act_sl) ? sum_long/(sum_qty_l) : shortCondition or (Final_Short_sl and not Act_sl) ? sum_short/(sum_qty_s) : na
plot(Position_Price[1], title = "Average Price", color = in_longCondition ? color.blue : color.red, linewidth = 2, style = plot.style_cross, transp = 0)

// ================================================================================================================================================================================
// STOP LOSS / RE-ENTRY
// ================================================================================================================================================================================

// SL initial inputs
Act_sl := input(true, "ACTIVATE SL / DEACTIVATE RE-ENTRY")
sl := input(7.5, "STOP LOSS / RE-ENTRY %", type = input.float, minval = 0, step = 0.5)

// Initial SL conditions
long_sl = crossunder(low, (1-(sl/100))*last_open_longCondition) and in_longCondition and not longCondition
short_sl = crossover(high, (1+(sl/100))*last_open_shortCondition) and in_shortCondition and not shortCondition

// Get the time of the last sl
last_long_sl := long_sl ? time : nz(last_long_sl[1])
last_short_sl := short_sl ? time : nz(last_short_sl[1])

// Sl counter
CondIni_long_sl := long_sl ? 1 : longCondition ? -1 : nz(CondIni_long_sl[1])
CondIni_short_sl := short_sl ? 1 : shortCondition ? -1 : nz(CondIni_short_sl[1])

// Final SL conditions
Final_Long_sl := long_sl and nz(CondIni_long_sl[1]) == -1 and in_longCondition and not longCondition
Final_Short_sl := short_sl and nz(CondIni_short_sl[1]) == -1 and in_shortCondition and not shortCondition

// ================================================================================================================================================================================
// TAKE PROFIT
// ================================================================================================================================================================================

// Take Profit input
Act_tp = input(false, "ACTIVATE TAKE PROFIT")
tp = input(10.0, "TAKE PROFIT %", type = input.float, minval = 0, step = 0.5)

// Initial TP conditions
long_tp = crossover(high, (1+(tp/100))*fixnan(Position_Price)) and in_longCondition and not longCondition and not Final_Long_sl and Act_tp
short_tp = crossunder(low, (1-(tp/100))*fixnan(Position_Price)) and in_shortCondition and not shortCondition and not Final_Short_sl and Act_tp

// Get the time of the last tp
last_long_tp := long_tp ? time : nz(last_long_tp[1])
last_short_tp := short_tp ? time : nz(last_short_tp[1])

// Tp signal ordering
CondIni_long_tp := (Final_Long_sl and Act_sl) or XlongCondition ? 1 : longCondition ? -1 : nz(CondIni_long_tp[1])
CondIni_short_tp := Final_Short_sl and Act_sl ? 1 : shortCondition ? -1 : nz(CondIni_short_tp[1])

// Final tp condition
Final_Long_tp = long_tp and last_longCondition > nz(last_long_tp[1]) and nz(CondIni_long_tp[1]) == -1
Final_Short_tp = short_tp and last_shortCondition > nz(last_short_tp[1]) and nz(CondIni_short_tp[1]) == -1

if Final_Long_tp or (Final_Long_sl and Act_sl) or XlongCondition
    sum_long := 0.0
    nLongs := na
    CondIni_long_sl := 1
    sum_qty_l := na
    
if Final_Short_tp or (Final_Short_sl and Act_sl)
    sum_short := 0.0
    nShorts := na
    CondIni_short_sl := 1
    sum_qty_s := na
    
// ================================================================================================================================================================================
// SIGNALS
// ================================================================================================================================================================================

// Longs
// label.new(
//    x = longCondition[1] ? time : na, 
//    y = na, 
//    text = 'LONG '+tostring(nLongs), 
//    color = color.blue, 
//    textcolor = color.black,  
//    style = label.style_labelup, 
//    xloc = xloc.bar_time, 
//    yloc = yloc.belowbar,
//    size = size.tiny
//    )

// // Shorts
// label.new(
//    x = shortCondition[1] ? time : na, 
//    y = na, 
//    text = 'SHORT '+tostring(nShorts), 
//    color = color.red, 
//    textcolor = color.black,  
//    style = label.style_labeldown, 
//    xloc = xloc.bar_time, 
//    yloc = yloc.abovebar,
//    size = size.tiny
//    )

// // XLongs
// label.new(
//    x = XlongCondition[1] ? time : na, 
//    y = na, 
//    text = 'XLONG', 
//    color = color.yellow, 
//    textcolor = color.black,  
//    style = label.style_labeldown, 
//    xloc = xloc.bar_time, 
//    yloc = yloc.abovebar,
//    size = size.tiny
//    )
   
// // Tp on longs
// label.new(
//    x = Final_Long_tp ? time : na, 
//    y = na, 
//    text = 'TP '+tostring(tp)+'%', 
//    color = color.orange, 
//    textcolor = color.black,  
//    style = label.style_labeldown, 
//    xloc = xloc.bar_time, 
//    yloc = yloc.abovebar,
//    size = size.tiny
//    ) 

ltp = iff(Final_Long_tp, (fixnan(Position_Price)*(1+(tp/100))), na), plot(ltp, style=plot.style_cross, linewidth=3, color = color.white, editable = false)

// Tp on shorts
// label.new(
//    x = Final_Short_tp ? time : na, 
//    y = na, 
//    text = 'TP '+tostring(tp)+'%', 
//    color = color.orange, 
//    textcolor = color.black,  
//    style = label.style_labelup, 
//    xloc = xloc.bar_time, 
//    yloc = yloc.belowbar,
//    size = size.tiny
//    )
   
stp = iff(Final_Short_tp, (fixnan(Position_Price)*(1-(tp/100))), na), plot(stp, style=plot.style_cross, linewidth=3, color = color.white, editable = false)

// Sl on Longs
// label.new(
//    x = Final_Long_sl ? time : na, 
//    y = na, 
//    text = Act_sl ? ('SL '+tostring(sl)+'%') : ('RE '+tostring(sl)+'%'), 
//    color = color.green, 
//    textcolor = color.black,  
//    style = label.style_labelup, 
//    xloc = xloc.bar_time, 
//    yloc = yloc.belowbar,
//    size = size.tiny
//    )
   
// Sl on Longs dot   
lsl = iff(Final_Long_sl, (last_open_longCondition*(1-(sl/100))), na), plot(lsl, style=plot.style_cross, linewidth=3, color = color.white, editable = false)

// Sl on Shorts
// label.new(
//    x = Final_Short_sl ? time : na, 
//    y = na, 
//    text = Act_sl ? ('SL '+tostring(sl)+'%') : ('RE '+tostring(sl)+'%'), 
//    color = color.maroon, 
//    textcolor = color.black,  
//    style = label.style_labeldown, 
//    xloc = xloc.bar_time, 
//    yloc = yloc.abovebar,
//    size = size.tiny
//    ) 

// Sl on Shorts dot
ssl = iff(Final_Short_sl, (last_open_shortCondition*(1+(sl/100))), na), plot(ssl, style=plot.style_cross, linewidth=3, color = color.white, editable = false)

// ================================================================================================================================================================================
// BACKTEST
// ================================================================================================================================================================================

// Backtest inputs
Act_BT = input(true, "BACKTEST ?")
Quantity := input(1000, "$ QUANTITY 1ST ENTRY")/close
Increase := input(500, "$ INCREASE NEXT ENTRY")/close

// Backtest Period inputs
testStartYear = input(2019, "BACKTEST START YEAR ⏲️", minval = 1980, maxval = 2222) 
testStartMonth = input(01, "BACKTEST START MONTH", minval = 1, maxval = 12)
testStartDay = input(01, "BACKTEST START DAY", minval = 1, maxval = 31)
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)
testStopYear = input(2222, "BACKTEST STOP YEAR", minval=1980, maxval = 2222)
testStopMonth = input(12, "BACKTEST STOP MONTH", minval=1, maxval=12)
testStopDay = input(31, "BACKTEST STOP DAY", minval=1, maxval=31)
testPeriodStop = timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)

// Backtest Condition
testPeriod = true

// Backtest entries
if (Act_BT and not na(RSI_VWAP) and testPeriod)
    strategy.entry("Long", strategy.long, qty = QF_l, when = longCondition or (Final_Long_sl and not Act_sl))
    strategy.close("Long", when = XlongCondition)
    strategy.entry("Short", strategy.short, qty = QF_s, when = (shortCondition or (Final_Short_sl and not Act_sl)))
    strategy.exit("XL", "Long", limit = Act_tp ? (fixnan(Position_Price)*(1+(tp/100))) : na, stop = (Act_sl ? (1-(sl/100))*last_open_longCondition : na))
    strategy.exit("XS", "Short", limit = Act_tp ? (fixnan(Position_Price)*(1-(tp/100))) : na, stop = (Act_sl ? (1+(sl/100))*last_open_shortCondition : na))

// ================================================================================================================================================================================
// ALERTS
// ================================================================================================================================================================================

alertcondition((longCondition[1] or (Final_Long_sl and not Act_sl)) and nLongs == 1, title="Long 1 Alert", 
   message = "LONG1")
alertcondition((longCondition[1] or (Final_Long_sl and not Act_sl)) and nLongs == 2, title="Long 2 Alert", 
   message = "LONG2")
alertcondition((longCondition[1] or (Final_Long_sl and not Act_sl)) and nLongs == 3, title="Long 3 Alert", 
   message = "LONG3")
alertcondition((longCondition[1] or (Final_Long_sl and not Act_sl)) and nLongs == 4, title="Long 4 Alert", 
   message = "LONG4")
alertcondition((longCondition[1] or (Final_Long_sl and not Act_sl)) and nLongs == 5, title="Long 5 Alert", 
   message = "LONG5")

alertcondition(Final_Long_tp or (Final_Long_sl and Act_sl), title="TPL/SLL Alert", 
   message = "TPL/SLL")

alertcondition((shortCondition[1] or (Final_Short_sl and not Act_sl)) and nShorts == 1, title="Short 1 Alert", 
   message = "SHORT1")
alertcondition((shortCondition[1] or (Final_Short_sl and not Act_sl)) and nShorts == 2, title="Short 2 Alert", 
   message = "SHORT2")
alertcondition((shortCondition[1] or (Final_Short_sl and not Act_sl)) and nShorts == 3, title="Short 3 Alert", 
   message = "SHORT3")
alertcondition((shortCondition[1] or (Final_Short_sl and not Act_sl)) and nShorts == 4, title="Short 4 Alert", 
   message = "SHORT4")
alertcondition((shortCondition[1] or (Final_Short_sl and not Act_sl)) and nShorts == 5, title="Short 5 Alert", 
   message = "SHORT5")

alertcondition(Final_Short_tp or (Final_Short_sl and Act_sl), title="TPS/SLS Alert", 
   message = "TPS/SLS")

// by Xaviz

```

> Detail

https://www.fmz.com/strategy/428689

> Last Modified

2023-10-08 13:52:09
