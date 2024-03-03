
> Name

基于平均真实波幅的趋势跟踪策略ATR-Based-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/833f351091b72b171c.png)
[trans]

## 概述

该策略是一个基于平均真实波幅(ATR)的趋势跟踪策略。它使用ATR来计算指标值,从而判断价格趋势方向。该策略同时提供止损机制来控制风险。

## 策略原理  

该策略使用三个主要参数:周期Period、乘数Multiplier和进出场点Entry/Exit Point。默认参数为14周期的ATR和4倍的乘数。

该策略首先计算多头均价(buyavg)和空头均价(sellavg),然后比较价格与这两个均价的关系,判断目前的趋势方向。如果价格高于空头均价,则判断为多头;如果价格低于多头均价,则判断为空头。

此外,该策略结合ATR来设定 추踪止损(Trailing Stop Loss)。具体方法是:以ATR的14周期加权移动平均乘以一个乘数(默认为4)作为止损距离。这样可以根据市场波动程度来调整止损距离。

当止损被触发时,该策略就会平仓了结利润。

## 策略优势

1. 基于趋势判断,能够顺势而为,持续获利
2. 采用ATR动态调整止损距离,可以有效控制风险
3. 计算买卖点位简单直接,容易理解实现

## 风险及对策  

1. 趋势发生转变时,可能出现较大亏损
   - 适当调整ATR周期和乘数,优化止损距离
2. 震荡行情中, WILL产生多次小额损失
   - 增加过滤条件,避免震荡市
3. 参数设置不当可能导致策略效果变差
   - 多组合参数优化测试,找到最佳参数

## 策略优化方向  

1.加入其他指标判断过滤信号,避免在震荡行情中出入场
2.优化ATR周期和乘数参数,使止损距离更加合理
3.加入开仓仓位控制,根据市场情况调整仓位大小

## 总结

该策略整体来说是一个简单实用的趋势跟踪策略。它只需要少量参数即可实现,通过ATR来动态调整止损,可以有效控制风险。如果搭配其他辅助判断指标,可以进一步优化,过滤掉一些噪音信号。总的来说,该策略适合那些想要学习趋势跟踪策略的人,也可以作为其他高级策略的基础组件来使用。

|| 

## Overview

This is a trend tracking strategy based on Average True Range (ATR). It uses ATR to calculate indicator values and determine price trend direction. The strategy also provides a stop loss mechanism to control risks.  

## Strategy Logic

The strategy uses three main parameters: Period, Multiplier and Entry/Exit Point. The default parameters are 14 periods of ATR and a multiplier of 4.

The strategy first calculates the long average price (buyavg) and short average price (sellavg), then compares the price relationship between these two averages to determine the current trend direction. If the price is higher than the short average price, it is judged as long; if the price is lower than the long average price, it is judged as short.

In addition, the strategy incorporates ATR to set a trailing stop loss. Specifically, it uses the 14-period weighted moving average of ATR multiplied by a multiplier (default 4) as the stop loss distance. This allows the stop loss distance to be adjusted based on market volatility.  

When the stop loss is triggered, the strategy will close the position to lock in profits.

## Advantages

1. Based on trend judgment, it can follow the trend continuously for profit
2. Use ATR to dynamically adjust stop loss distance, effectively control risks 
3. Simple and direct to calculate entry and exit points, easy to understand and implement

## Risks & Solutions

1. May encounter large losses when trend changes
   - Adjust ATR period and multiplier reasonably to optimize stop loss distance
2. WILL generate multiple small losses in ranging markets
   - Add filter conditions to avoid ranging markets
3. Improper parameter settings may worsen strategy performance
   - Conduct multi-parameter optimization to find optimum 

## Optimization Directions  

1. Add other indicators for filtering to avoid opening positions in ranging markets
2. Optimize ATR period and multiplier parameters to make stop distance more reasonable
3. Add position sizing control based on market conditions

## Conclusion

Overall this is a simple and practical trend tracking strategy. It only needs a few parameters to implement, and uses ATR to dynamically adjust stops to effectively control risks. When combined with other assisting indicators for filtering, it can be further optimized. In general, this strategy suits those who want to learn about trend tracking strategies, and can also be used as a basic component for more advanced strategies.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Show TrailingSTOP Prices|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|true|From Month|
|v_input_int_2|true|From Day|
|v_input_int_3|2021|From Year|
|v_input_int_4|true|Thru Month|
|v_input_int_5|true|Thru Day|
|v_input_int_6|2100|Thru Year|
|v_input_3|true|Show Date Range|
|v_input_4|14|ATR_Period|
|v_input_5|4|ATR_Mult|
|v_input_bool_2|false|ShortPosition|
|v_input_bool_1|false|(?Stop Loss)╔══════   Enable   ══════╗|
|v_input_string_1|0|Based on: Percent|ATR|
|v_input_float_1|10|ATR   Mult|
|v_input_int_7|14|Length|
|v_input_float_2|5|Percent|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-29 00:00:00
end: 2024-01-04 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy('Trend Strategy by zdmre', shorttitle='Trend Strategy', overlay=true, pyramiding=0, currency=currency.USD, default_qty_type=strategy.percent_of_equity, initial_capital=10000, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.005)
show_STOPLOSSprice = input(true, title='Show TrailingSTOP Prices')
src = input(close, title='Source')
out2 = ta.ema(src, 20)

buyavg = (close + high) / 2.02 - high * (1 - open / close) * (1 - low * open / (high * close))
sellavg = ((low + close) / 1.99 + low * (1 - low / open) * (1 - low * open / (close * high)) / 1.1 + out2 )/ 2

// === INPUT BACKTEST RANGE ===
fromMonth = input.int(defval=1, title='From Month', minval=1, maxval=12)
fromDay = input.int(defval=1, title='From Day', minval=1, maxval=31)
fromYear = input.int(defval=2021, title='From Year', minval=1970)
thruMonth = input.int(defval=1, title='Thru Month', minval=1, maxval=12)
thruDay = input.int(defval=1, title='Thru Day', minval=1, maxval=31)
thruYear = input.int(defval=2100, title='Thru Year', minval=1970)

// === INPUT SHOW PLOT ===
showDate = input(defval=true, title='Show Date Range')

// === FUNCTION EXAMPLE ===
start = timestamp(fromYear, fromMonth, fromDay, 00, 00)  // backtest start window
finish = timestamp(thruYear, thruMonth, thruDay, 23, 59)  // backtest finish window
window() => true


// === TRAILING STOP LOSS === //

ATR_Period = input(14)
ATR_Mult = input(4.0)
var float ATR_TrailSL = na
var int pos = na
atr = ta.rma (ta.tr(true), 14)
xATR = ta.atr(ATR_Period)
nLoss = ATR_Mult * xATR

iff_1 = close > nz(ATR_TrailSL[1], 0) ? close - nLoss : close + nLoss
iff_2 = close < nz(ATR_TrailSL[1], 0) and close[1] < nz(ATR_TrailSL[1], 0) ? math.min(nz(ATR_TrailSL[1]), close + nLoss) : iff_1
ATR_TrailSL := close > nz(ATR_TrailSL[1], 0) and close[1] > nz(ATR_TrailSL[1], 0) ? math.max(nz(ATR_TrailSL[1]), close - nLoss) : iff_2

iff_3 = close[1] > nz(ATR_TrailSL[1], 0) and close < nz(ATR_TrailSL[1], 0) ? -1 : nz(pos[1], 0)
pos := close[1] < nz(ATR_TrailSL[1], 0) and close > nz(ATR_TrailSL[1], 0) ? 1 : iff_3

atr_color = pos == -1 ? color.green : pos == 1 ? color.red : color.aqua
atrtrend = plot(ATR_TrailSL, 'Trailing StopLoss', atr_color, linewidth=2)

// ===  Stop Loss === //
slGroup = 'Stop Loss'
useSL = input.bool(false, title='╔══════   Enable   ══════╗', group=slGroup, tooltip='If you are using this strategy for Scalping or Futures market, we do not recommend using Stop Loss.')
SLbased = input.string(title='Based on', defval='Percent', options=['ATR', 'Percent'], group=slGroup, tooltip='ATR: Average True Range\nPercent: eg. 5%.')
multiATR = input.float(10.0, title='ATR   Mult', group=slGroup, inline='atr')
lengthATR = input.int(14, title='Length', group=slGroup, inline='atr')
SLPercent = input.float(5, title='Percent', group=slGroup) * 0.01
Shortposenter = input.bool(false, title='ShortPosition')

longStop = 0.0
shortStop = 0.0

if SLbased == 'ATR'
    longStop := ta.valuewhen(pos == 1, low, 0) - ta.valuewhen(pos == 1, ta.rma(ta.tr(true), lengthATR), 0) * multiATR
    longStopPrev = nz(longStop[1], longStop)
    longStop := close[1] > longStopPrev ? math.max(longStop, longStopPrev) : longStop

    shortStop := ta.valuewhen(pos == -1, ta.rma(ta.tr(true), lengthATR), 0) * multiATR + ta.valuewhen(pos == -1, high, 0)
    shortStopPrev = nz(shortStop[1], shortStop)
    shortStop := close[1] > shortStopPrev ? math.max(shortStop, shortStopPrev) : shortStop
    shortStop
if SLbased == 'Percent'
    longStop := strategy.position_avg_price * (1 - SLPercent)
    shortStop := strategy.position_avg_price * (1 + SLPercent)
    shortStop
exitLong  = pos == -1 

// === PlotColor === //
buySignal = pos == 1 and pos[1] == -1
plotshape(buySignal, title="Long", location=location.belowbar, style=shape.labelup, size=size.normal, color=color.new(color.green,50), text='Buy', textcolor=color.white)
exitSignal = pos == -1 and pos[1] == 1
plotshape(exitSignal, title="Exit", location=location.abovebar, style=shape.labeldown, size=size.normal, color=color.new(color.red,50), text='Exit', textcolor=color.white)

hPlot = plot(ohlc4, title="", style=plot.style_circles, linewidth=0, editable = false)
longFill = (pos == 1 ? color.new(color.green,80) : na) 
shortFill = (pos == -1 ? color.new(color.red,80) : na)
fill(hPlot, atrtrend,color=longFill)
fill(hPlot,atrtrend, color=shortFill)

// === Strategy === //
strategy.entry('Long', strategy.long,limit = buyavg, when=window() and pos == 1,comment="Entry: "+str.tostring(buyavg))
strategy.close('Long', when=window() and exitLong , comment='Exit: '+str.tostring(sellavg) )

if Shortposenter
    strategy.entry('Short', strategy.short, when=window() and pos== -1,comment="Entry: "+str.tostring(close))
    strategy.close('Short', when=window() and pos == 1 , comment='Exit: ')

if useSL
    strategy.exit('Stop Loss', 'Long', stop=longStop)
    
// === Show StopLoss Price === //
if show_STOPLOSSprice
    if pos == -1
        label ShortStop = label.new(bar_index, na, 'SL: ' + str.tostring(ATR_TrailSL), color=color.green, textcolor=color.white, style=label.style_none, yloc=yloc.abovebar, size=size.small)
        label.delete(ShortStop[1])

    if pos == 1
        label LongStop = label.new(bar_index, na, 'SL: ' + str.tostring(ATR_TrailSL), color=color.red, textcolor=color.white, style=label.style_none, yloc=yloc.belowbar, size=size.small)
        label.delete(LongStop[1])
```

> Detail

https://www.fmz.com/strategy/437802

> Last Modified

2024-01-05 16:28:48
