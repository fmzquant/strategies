
> Name

多重过滤器SuperTrend交易策略SuperTrend-Trading-Strategy-with-Multiple-Filters

> Author

ChaoZhang

> Strategy Description

[trans]

本策略名为多重过滤器SuperTrend交易策略。该策略在Supertrend基础上,加入多重指标作为过滤器,严格控制入场。

策略运作原理:
1. 计算Supertrend指标,产生买入和卖出信号。
2. 如果启用MACD过滤器,只有当MACD上穿信号线同时快线上穿慢线时,才产生买入信号;只有当MACD下穿信号线同时快线下穿慢线时,才产生卖出信号。
3. 如果启用EMA过滤器,只有当价格上穿200日EMA时,才产生买入信号;只有当价格下穿200日EMA时,才产生卖出信号。
4. 如果启用Stochastic RSI过滤器,只有当Stochastic RSI从超买区下穿超卖区时,才产生买入信号;只有当Stochastic RSI从超卖区上穿超买区时,才产生卖出信号。
5. 如果启用MFI过滤器,只有当MFI上穿其EMA时,才产生买入信号;只有当MFI下穿其EMA时,才产生卖出信号。
6. 如果启用CCI过滤器,只有当价格上穿CCI基准线时,才产生买入信号;只有当价格下穿CCI基准线时,才产生卖出信号。
7. 使用ATR或布林带计算止损止盈位。

该策略的优势:
1. 多重过滤增加信号的可靠性,避免假信号。
2. 严格的止损止盈策略有助于风险控制。
3. 可自定义指标参数及开关,灵活度高。

该策略的风险:
1. 过多过滤条件可能错过部分交易机会。
2. 指标参数设置不当可能导致过滤失效。
3. 止损止盈设定不恰当可能导致亏损扩大。

总之,多重过滤器SuperTrend交易策略同时考虑趋势跟踪和指标分析,通过多重确认提高信号质量。设置合理的止损止盈机制对降低交易风险起关键作用。该策略适合有一定交易经验的人士使用。

|| 

This strategy is called SuperTrend Trading Strategy with Multiple Filters. It adds multiple indicators as filters on top of the Supertrend to strictly control entries.

How the strategy works:
1. Calculate the Supertrend indicator to generate buy and sell signals. 
2. If MACD filter is enabled, buy signals are only generated when MACD crosses above signal line and fast MA crosses above slow MA. Sell signals are only generated when MACD crosses below signal line and fast MA crosses below slow MA.
3. If EMA filter is enabled, buy signals are only generated when price crosses above 200-day EMA. Sell signals are only generated when price crosses below 200-day EMA.
4. If Stochastic RSI filter is enabled, buy signals are only generated when Stochastic RSI crosses from overbought to oversold. Sell signals are only generated when Stochastic RSI crosses from oversold to overbought. 
5. If MFI filter is enabled, buy signals are only generated when MFI crosses above its EMA. Sell signals are only generated when MFI crosses below its EMA.
6. If CCI filter is enabled, buy signals are only generated when price crosses above CCI baseline. Sell signals are only generated when price crosses below CCI baseline.
7. Use ATR or Bollinger Bands to calculate stop loss and take profit levels.

Advantages of this strategy:
1. Multiple filters increase signal reliability and avoid false signals. 
2. Strict stop loss and take profit helps control risks.
3. Customizable parameters and toggle switches provide flexibility.

Risks of this strategy:
1. Too many filter conditions may miss some trading opportunities.  
2. Improper indicator parameters may render filters ineffective.
3. Incorrect stop loss and take profit may enlarge losses.

In summary, the SuperTrend Trading Strategy with Multiple Filters considers both trend following and indicator analysis, improving signal quality through multiple confirmations. Reasonable stop loss and take profit mechanisms are key to reducing trading risks. The strategy is suitable for traders with some experience.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ATR Length|
|v_input_float_1|3|Factor|
|v_input_2|2|Stop Loss Factor|
|v_input_3|1.5|Take Profit Factor|
|v_input_4|14|stochlenght|
|v_input_5|20|Oversold|
|v_input_6|80|Overbought|
|v_input_bool_1|false|use_atr_exits|
|v_input_bool_2|false|use_bollinger_exits|
|v_input_bool_3|false|use_cci_filter|
|v_input_float_2|true|Long Stop Loss (%)|
|v_input_float_3|true|Short Stop Loss (%)|
|v_input_float_4|true|Long profit (%)|
|v_input_float_5|true|Short profit (%)|
|v_input_bool_4|false|plotsuper|
|v_input_7|99|Trama lenght|
|v_input_bool_5|false|Show Lux TRAMA|
|v_input_bool_6|false|use_LUX_trama_filter|
|v_input_bool_7|false|use_stochastic_filter|
|v_input_8|14|ma fast for macd filter|
|v_input_9|28|ma slowfor macd filter|
|v_input_bool_8|false|use_macd_filter|
|v_input_bool_9|false|use_ema200_filter|
|v_input_bool_10|true|Plot EMA200|
|v_input_10|9|mfi Signal Length|
|v_input_11|14|mfi Length|
|v_input_bool_11|false|use_mfi_filter|
|v_input_12|50|CCI Period Length|
|v_input_13|5| CCI ATR Length|
|v_input_14|20|bollinger lenght|
|v_input_float_6|2|bollinger StdDev|
|v_input_int_1|false|bollinger Offset|
|v_input_bool_12|true|use trailing stop loss (atr or bollinger)?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-09-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mathlabel

//@version=5
strategy("My strategy", overlay=true, margin_long=100, margin_short=100)



atrPeriod = input(10, "ATR Length")
factor = input.float(3.0, "Factor", step = 0.01)
stopLossFactor = input(2.0, "Stop Loss Factor")
takeProfitFactor = input(1.5, "Take Profit Factor")
stochlenght= input(14,'stochlenght')
oversold_level = input(title = 'Oversold', defval = 20)
overbought_level = input(title = 'Overbought', defval = 80)
use_atr_exits=input.bool(false)
use_bollinger_exits=input.bool(false)
use_cci_filter=input.bool(false)


longLossPerc = input.float(title='Long Stop Loss (%)', minval=0.0, step=0.1, defval=1) * 0.01

shortLossPerc = input.float(title='Short Stop Loss (%)', minval=0.0, step=0.1, defval=1) * 0.01

longprofitPerc = input.float(title='Long profit (%)', minval=0.0, step=0.1, defval=1) * 0.01

shortprofitPerc = input.float(title='Short profit (%)', minval=0.0, step=0.1, defval=1) * 0.01



// Calculate ATR
atr = ta.atr(atrPeriod)
plotsuper=input.bool(false)
[supertrend, direction] = ta.supertrend(factor, atrPeriod)


upTrend = plot(plotsuper? (direction < 0 ? supertrend : na) : na, "Up Trend", color = color.green, style=plot.style_linebr)
downTrend = plot(plotsuper ? (direction < 0? na : supertrend):na, "Down Trend", color = color.red, style=plot.style_linebr)



long_supertrend_filter= (direction < 0 ? supertrend : na)
short_supertrend_filter= (direction < 0? na : supertrend)



//--trama--
lengths = input(99,title='Trama lenght')
src =(close)

ama = 0.
hh = math.max(math.sign(ta.change(ta.highest(lengths))), 0)
ll = math.max(math.sign(ta.change(ta.lowest(lengths)) * -1), 0)
tc = math.pow(ta.sma(hh or ll ? 1 : 0, lengths), 2)
ama := nz(ama[1] + tc * (src - ama[1]), src)

plottrama=input.bool(false, title="Show Lux TRAMA")
plot(plottrama?ama : na, 'Plot', color.new(#ff1100, 0), 2)

use_LUX_trama_filter=input.bool(false)
long_LUX_trama_filter= (close > ama)
short_LUX_trama_filter= (close < ama)

// highest high
highest = ta.highest(high, stochlenght)
// lowest low
lowest = ta.lowest(low, stochlenght)

// stochastic oscillator
stochastic_K = ((close - lowest) / (highest - lowest)) * 100
stochastic_D = ta.sma(stochastic_K, 3)

use_stochastic_filter = input.bool(false)
long_stoch_filter = stochastic_K > oversold_level and stochastic_K[1] < oversold_level
short_stoch_filter = stochastic_K < overbought_level and stochastic_K[1] > overbought_level

//Define a ATR band upline and bottome line.

upline = open + (atr* takeProfitFactor)
bottomline = open -(atr*stopLossFactor)

plot(use_atr_exits ? upline : na, color=color.white)
plot(use_atr_exits ? bottomline:na, color=color.white)

// Calculate stop loss and take profit levels
stopLoss = stopLossFactor * atr
takeProfit = takeProfitFactor * atr

//input macd
ma_fast=ta.sma(close,input(14,title='ma fast for macd filter'))
ma_slow=ta.sma(close,input(28, title='ma slowfor macd filter'))
use_macd_filter=input.bool(false)

[macdLine, signalLine, histLine]= ta.macd(close,12,26,9)
long_macd_filter= (macdLine > signalLine) and ta.crossover(ma_fast,ma_slow)
short_macd_filter= (macdLine < signalLine) and ta.crossunder(ma_fast,ma_slow)
// ema 200
ema1= ta.ema(close,1)
ema2= ta.ema(close,200)
use_ema200_filter= input.bool(false)
long_ema_filter = (close > ema2)
short_ema_filter= (close < ema2)
plotAverage = input.bool(true, title="Plot EMA200")
plot(plotAverage ? ta.ema(close, 200) : na, title="Exponential Average")
// mfi
signalLength = input(title="mfi Signal Length", defval=9)
length1 = input(title="mfi Length", defval=14)
src1 = hlc3
mf = ta.mfi(src1, length1)
signal = ta.ema(mf, signalLength)



use_mfi_filter=input.bool(false)
long_mfi_filter= ta.crossover(mf,signal) ?mf:na 
short_mfi_filter= ta.crossunder(mf,signal)? mf : na

//cci
cci_l = input(50, title='CCI Period Length')
atr_l = input(5, title=' CCI ATR Length')
level = 0
sd_length = 20



cci = ta.cci(src, cci_l)
atr2 = ta.atr(atr_l)

var st = 0.

if cci >= level
    st := low - atr
    st

if cci <= level
    st := high + atr
    st


var tu = 0.
var td = 0.
var optimal_line = 0.

if cci >= level and cci[1] < level
    tu := td[1]
    tu

if cci <= level and cci[1] > level
    td := tu[1]
    td

if cci > level
    tu := low - atr2
    if tu < tu[1] and cci[1] >= level
        tu := tu[1]
        tu

if cci < level
    td := high + atr2
    if td > td[1] and cci[1] <= level
        td := td[1]
        td

optimal_line := math.max(tu, td)

// Creating a Price Channel, 

avg_st8 = ta.ema(st, 8)
avg_st13 = ta.ema(st, 13)
avg_st21 = ta.ema(st, 21)
avg_st34 = ta.ema(st, 21)
avg_st55 = ta.ema(st, 55)
avg_st89 = ta.ema(st, 89)
avg_st144 = ta.ema(st, 144)
avg_st233 = ta.ema(st, 233)

average_weighting = (optimal_line + avg_st8 + avg_st13 + avg_st21 + avg_st34 + avg_st55 + avg_st89 + avg_st144 + avg_st233) / 9

basis = ta.sma(average_weighting, sd_length)
devs = ta.stdev(average_weighting, sd_length)
upperS = basis + devs
lowerS = basis - devs
plot(use_cci_filter ? basis: na, 'Basis', color=color.new(#872323, 0))
p3 = plot(use_cci_filter ? upperS : na, 'UpperS', color=color.new(color.teal, 0))
p4 = plot(use_cci_filter ? lowerS: na ,'LowerS', color=color.new(color.teal, 0))

long_cci_filter= ta.crossover(close,upperS) 
short_cci_filter= ta.crossunder(close,lowerS) 



var isLong = false
var isShort = false
long = (not use_LUX_trama_filter or long_LUX_trama_filter) and ( long_supertrend_filter) and (not use_ema200_filter or long_ema_filter) and (not isLong) and  (not use_stochastic_filter or long_stoch_filter) and (not use_macd_filter or long_macd_filter) and (not use_mfi_filter or long_mfi_filter) and (not use_cci_filter or long_cci_filter)
short= (not use_LUX_trama_filter or short_LUX_trama_filter) and ( short_supertrend_filter) and (not use_ema200_filter or short_ema_filter) and (not isShort)  and ( not use_stochastic_filter or short_stoch_filter) and (not use_macd_filter or long_macd_filter) and (not use_mfi_filter or short_mfi_filter) and (not use_cci_filter or short_cci_filter)


if long
    isLong := true
    isShort := false

if short
    isLong := false
    isShort := true

plotshape(long, title='Buy', text='Buy', style=shape.labelup, location=location.belowbar, color=color.new(color.green, 0), textcolor=color.new(color.white, 0), size=size.tiny)
plotshape(short, title='Sell', text='Sell', style=shape.labeldown, location=location.abovebar, color=color.new(color.red, 0), textcolor=color.new(color.white, 0), size=size.tiny)


//bollinger
lengthss = input(20, title='bollinger lenght')

mult = input.float(2.0, minval=0.001, maxval=50, title="bollinger StdDev")
basiss = ta.sma(src, lengthss)
dev = mult * ta.stdev(src, lengthss)
upper = basiss + dev
lower = basiss - dev
offset = input.int(0, "bollinger Offset", minval = -500, maxval = 500)
plot(use_bollinger_exits ? basiss : na, "Basis", color=#FF6D00, offset = offset)
p1 = plot(use_bollinger_exits ? upper : na, "Upper", color=#2962FF, offset = offset)
p2 = plot(use_bollinger_exits ? lower: na, "Lower", color=#2962FF, offset = offset)

long_bollinger_exits= close > upper
short_bollinger_exits=close < lower
long_atr_exits = close > upline 
short_atr_exits = close < bottomline
takelong = (not use_atr_exits or long_atr_exits) and (not use_bollinger_exits or long_bollinger_exits)
takeshort = (not use_atr_exits or short_atr_exits) and (not use_bollinger_exits or short_bollinger_exits)

plotshape(use_atr_exits? takelong : na,title = 'take profit',text='high SL/TP',style=shape.cross,location = location.abovebar, color=color.new(color.green,0) , size=size.tiny)
plotshape(use_atr_exits ? takeshort : na,title = 'take profit',text='low SL/TP',style=shape.cross,location = location.belowbar, color=color.new(color.green,0), size=size.tiny)
plotshape(use_bollinger_exits ? takelong: na,title = 'take profit',text='high SL/TP',style=shape.cross,location = location.abovebar, color=color.new(color.green,0) , size=size.tiny)
plotshape(use_bollinger_exits ? takeshort: na,title = 'take profit',text='low SL/TP',style=shape.cross,location = location.belowbar, color=color.new(color.green,0), size=size.tiny)




alertcondition(long,'long','buy')
alertcondition(short,'short','short')
alertcondition(takeshort,'trail short close','short trailing take profit')
alertcondition(takelong ,'trail long close','long trailing take profit')


use_trailing_stop_loss=input.bool(title = 'use trailing stop loss (atr or bollinger)?', defval = true)

// Determine stop loss price
longStopPrice = strategy.position_avg_price * (1 - longLossPerc)
shortStopPrice = strategy.position_avg_price * (1 + shortLossPerc)
// Determine take profit price
longprofitPrice = strategy.position_avg_price * (1 + longprofitPerc)
shortprofitPrice = strategy.position_avg_price * (1 - shortprofitPerc)

// Plot stop loss values for confirmation
plot(series=strategy.position_size > 0 ? longStopPrice : na, color=color.new(color.red, 0), style=plot.style_cross, linewidth=1, title='Long Stop Loss')
plot(series=strategy.position_size < 0 ? shortStopPrice : na, color=color.new(color.red, 0), style=plot.style_cross, linewidth=1, title='Short Stop Loss')
plot(series=strategy.position_size > 0 ? longprofitPrice : na, color=color.new(color.green, 0), style=plot.style_cross, linewidth=1, title='Long profit')
plot(series=strategy.position_size < 0 ? shortprofitPrice : na, color=color.new(color.green, 0), style=plot.style_cross, linewidth=1, title='Short profit')




longCondition = long
if (longCondition)
    strategy.entry("Long Entry", strategy.long)

shortCondition = short
if (shortCondition)
    strategy.entry("Short Entry", strategy.short,stop = shortStopPrice)
if use_trailing_stop_loss
    if takelong or close < longStopPrice
        strategy.close("Long Entry")
    if takeshort or close > shortStopPrice
        strategy.close("Short Entry")
else
    if close < longStopPrice or close > longprofitPrice
        strategy.close("Long Entry")
    if close < shortprofitPrice or close > shortStopPrice
        strategy.close("Short Entry")
```

> Detail

https://www.fmz.com/strategy/426930

> Last Modified

2023-09-15 16:19:57
