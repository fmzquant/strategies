
> Name

零滞后叠加移动平均线结合悬臂线出口交易策略Zero-Lag-Overlapping-Moving-Average-with-Chandelier-Exit-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13410efb5aff82132fc.png)
[trans]

## 概述

该策略的主要思想是结合零滞后叠加移动平均线(ZLSMA)指标判断趋势方向,以及悬臂线出口(CE)指标来寻找更精确的入场和出场时机。ZLSMA是一种趋势指标,可较早判断趋势的变化。CE通过计算ATR来动态调整出场点位,可有效控制止损。该策略主要适合中短线操作。  

## 策略原理  

1. ZLSMA部分:  
    - 使用线性回归方法分别计算长度为130周期的LMA线。  
    - 然后将两条LMA线叠加,得出赋值给eq的差值。  
    - 最后,通过原先的LMA线加上eq差值,构成零滞后叠加移动平均线ZLSMA。

2. CE部分:  
    - 计算ATR指标,并乘以系数(默认2)来确定离最近高点或低点的动态距离。
    - 当收盘价超过最近的多头止损线或空头止损线时,相应调整该止损线。
    - 根据收盘价相对于止损线的位置变化判断做多做空方向。  

3. 入场时机:  
    - ZLSMA判断趋势方向,CE发出信号时入场。    

4. 出场止损: 
    - 长线设有固定止损和止盈。
    - 短线以CE的动态出口替代固定止损。  

## 优势分析

1. ZLSMA可较早判断趋势,避免假突破。  
2. CE可根据市场波动程度灵活调整出口点位。
3. 策略风险收益比可自定义。 
4. 长短线运用止损止盈方法不同,可同时控制风险。

## 风险分析  

1. 参数设置不当可能增加输率或扩大止损范围。
2. 若行情反转迅速,仍有止损被突破的风险。  

## 优化方向

1. 可以测试不同市场及时间周期的参数优化。
2. 可考虑根据波动率或特定周期调整止盈止损参数。
3. 可尝试与其它指标或模型组合,提高获利率。

## 总结

该策略主要运用零滞后叠加移动平均线判断趋势方向,结合悬臂线出口指标寻找更精确的入场出场时机。策略优势在于可自定义止损止盈比例,以及悬臂线出口的动态调整可根据市场情况控制风险。下一步可尝试参数优化及策略组合,以进一步提高稳定性和获利率。

||


## Overview  

The main idea of this strategy is to combine the Zero Lag Overlapping Moving Average (ZLSMA) indicator to judge the trend direction, and the Chandelier Exit (CE) indicator to find more precise entry and exit points. ZLSMA is a trend indicator that can identify trend changes earlier. CE dynamically adjusts exit points by calculating ATR to effectively control stop loss. This strategy is mainly suitable for medium-short term operations.

## Strategy Principle   

1. ZLSMA part:   
    - Use linear regression method to calculate 130-period LMA lines respectively.   
    - Then overlay the two LMA lines to get the difference value assigned to eq.
    - Finally, construct the Zero Lag Overlapping Moving Average ZLSMA through the original LMA line plus the eq difference.  

2. CE part:    
    - Calculate the ATR indicator and multiply it by a factor (default 2) to determine the dynamic distance from the most recent high or low point.  
    - When the closing price exceeds the most recent long or short stop loss line, adjust the stop loss line accordingly.
    - Determine long or short direction based on the change in closing price relative to the stop loss line.   

3. Entry signal:   
    - ZLSMA judges trend direction, enter when CE issues signal.     

4. Exit stop loss:  
    - Fixed stop loss and take profit for long position.
    - For short position, use CE's dynamic exit to replace fixed stop loss.   

## Advantage Analysis  

1. ZLSMA can identify trend earlier to avoid false breakout.   
2. CE can flexibly adjust exit points according to market volatility.  
3. Customizable risk-reward ratio of the strategy.
4. Different methods of stop loss and take profit used for long and short positions to control risk.  

## Risk Analysis   

1. Improper parameter settings may increase loss rate or expand stop loss range.  
2. There is still risk of stop loss being broken in case of swift market reversal.   

## Optimization Directions  

1. Parameters can be optimized for different markets and timeframes.  
2. Consider adjusting profit/stop parameters based on volatility or specific cycles.   
3. Try combining with other indicators or models to improve profit rate.  

## Summary  

The strategy mainly uses Zero Lag Overlapping Moving Average to determine the trend direction, combined with Chandelier Exit indicator to find more precise entry and exit points. The advantages lie in the customizable stop/profit ratio and the dynamic adjustment of Chandelier Exit can control risks according to market conditions. Next steps could be parameter optimization and strategy combination to further improve stability and profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|(?take profit / stop loss)long TP%|
|v_input_2|2|long SL%|
|v_input_3|2|short TP|
|v_input_4|2|short SL|
|v_input_5|130|(?ZLSMA settings)Length|
|v_input_6|false|Offset|
|v_input_7_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|true|(?Chandelier exit settings)ATR Period|
|v_input_float_1|2|ATR Multiplier|
|v_input_bool_1|true|Use Close Price for Extremums|
|v_input_bool_2|true|(?Visuals)Show Buy/Sell Labels|
|v_input_bool_3|true|Highlight State|
|v_input_bool_4|true|(?Alerts)Await Bar Confirmation|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-14 00:00:00
end: 2024-01-21 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © GGkurg

//@version=5

strategy(title = "ZLSMA + Chandelier Exit", shorttitle="ZLSMA + CE", overlay=true)


var GRP1 = "take profit / stop loss"
TP = input(title='long TP%', defval=2.0,   inline = "1", group = GRP1) 
SL = input(title='long SL%', defval=2.0,    inline = "1", group = GRP1) 
TP2 = input(title='short TP', defval=2.0,    inline = "2", group = GRP1) 
SL2 = input(title='short SL', defval=2.0,    inline = "2", group = GRP1) 
//-------------------------------------------------calculations
takeProfitPrice = strategy.position_avg_price * (1+(TP/100))
stopLossPrice = strategy.position_avg_price * (1-(SL/100))
takeProfitPrice2 = strategy.position_avg_price * (1-(TP2/100))
stopLossPrice2 = strategy.position_avg_price * (1+(SL2/100))


//---------------------------------------ZLSMA - Zero Lag LSMA
var GRP2 = "ZLSMA settings"
length1 = input(title='Length', defval=130, inline = "1", group = GRP2) 
offset1 = input(title='Offset', defval=0, inline = "2", group = GRP2) 
src = input(close, title='Source', inline = "3", group = GRP2) 
lsma = ta.linreg(src, length1, offset1)
lsma2 = ta.linreg(lsma, length1, offset1)
eq = lsma - lsma2
zlsma = lsma + eq

plot(zlsma, color=color.new(color.yellow, 0), linewidth=3)


//---------------------------------------ZLSMA conditisions 
//---------long
longc1 = close > zlsma
longclose1 = close < zlsma
//---------short
shortc1 = close < zlsma
shortclose1 = close > zlsma


//---------------------------------------Chandelier Exit
var string calcGroup = 'Chandelier exit settings'
length = input.int(title='ATR Period', defval=1, group=calcGroup)
mult = input.float(title='ATR Multiplier', step=0.1, defval=2.0, group=calcGroup)
useClose = input.bool(title='Use Close Price for Extremums', defval=true, group=calcGroup)

var string visualGroup = 'Visuals'
showLabels = input.bool(title='Show Buy/Sell Labels', defval=true, group=visualGroup)
highlightState = input.bool(title='Highlight State', defval=true, group=visualGroup)

var string alertGroup = 'Alerts'
awaitBarConfirmation = input.bool(title="Await Bar Confirmation", defval=true, group=alertGroup)

atr = mult * ta.atr(length)

longStop = (useClose ? ta.highest(close, length) : ta.highest(length)) - atr
longStopPrev = nz(longStop[1], longStop)
longStop := close[1] > longStopPrev ? math.max(longStop, longStopPrev) : longStop

shortStop = (useClose ? ta.lowest(close, length) : ta.lowest(length)) + atr
shortStopPrev = nz(shortStop[1], shortStop)
shortStop := close[1] < shortStopPrev ? math.min(shortStop, shortStopPrev) : shortStop

var int dir = 1
dir := close > shortStopPrev ? 1 : close < longStopPrev ? -1 : dir

var color longColor = color.green
var color shortColor = color.red
var color longFillColor = color.new(color.green, 90)
var color shortFillColor = color.new(color.red, 90)
var color textColor = color.new(color.white, 0)

longStopPlot = plot(dir == 1 ? longStop : na, title='Long Stop', style=plot.style_linebr, linewidth=2, color=color.new(longColor, 0))
buySignal = dir == 1 and dir[1] == -1
plotshape(buySignal ? longStop : na, title='Long Stop Start', location=location.absolute, style=shape.circle, size=size.tiny, color=color.new(longColor, 0))
plotshape(buySignal and showLabels ? longStop : na, title='Buy Label', text='Buy', location=location.absolute, style=shape.labelup, size=size.tiny, color=color.new(longColor, 0), textcolor=textColor)

shortStopPlot = plot(dir == 1 ? na : shortStop, title='Short Stop', style=plot.style_linebr, linewidth=2, color=color.new(shortColor, 0))
sellSignal = dir == -1 and dir[1] == 1
plotshape(sellSignal ? shortStop : na, title='Short Stop Start', location=location.absolute, style=shape.circle, size=size.tiny, color=color.new(shortColor, 0))
plotshape(sellSignal and showLabels ? shortStop : na, title='Sell Label', text='Sell', location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.new(shortColor, 0), textcolor=textColor)

midPricePlot = plot(ohlc4, title='', style=plot.style_circles, linewidth=0, display=display.none, editable=false)

longStateFillColor = highlightState ? dir == 1 ? longFillColor : na : na
shortStateFillColor = highlightState ? dir == -1 ? shortFillColor : na : na
fill(midPricePlot, longStopPlot, title='Long State Filling', color=longStateFillColor)
fill(midPricePlot, shortStopPlot, title='Short State Filling', color=shortStateFillColor)

await = awaitBarConfirmation ? barstate.isconfirmed : true
alertcondition(dir != dir[1] and await, title='Alert: CE Direction Change', message='Chandelier Exit has changed direction!')
alertcondition(buySignal and await, title='Alert: CE Buy', message='Chandelier Exit Buy!')
alertcondition(sellSignal and await, title='Alert: CE Sell', message='Chandelier Exit Sell!')




//---------------------------------------Chandelier Exit conditisions 
//---------long
longc2 = buySignal
longclose2 = sellSignal
//---------short
shortc2 = sellSignal
shortclose2 = buySignal



//---------------------------------------Long entry and exit
if longc1 and longc2 
    strategy.entry("long", strategy.long)

if strategy.position_avg_price > 0
    strategy.exit("close long", "long", limit = takeProfitPrice, stop = stopLossPrice, alert_message = "close all orders")

if longclose1 and longclose2 and strategy.opentrades == 1
    strategy.close("long","ema long cross", alert_message = "close all orders")


//---------------------------------------Short entry and exit
if shortc1 and shortc2 
    strategy.entry("short", strategy.short)

if strategy.position_avg_price > 0
    strategy.exit("close short", "short", limit = takeProfitPrice2, stop = stopLossPrice2, alert_message = "close all orders")

if shortclose1 and shortclose2 and strategy.opentrades == 1
    strategy.close("close short","short", alert_message = "close all orders")



```

> Detail

https://www.fmz.com/strategy/439599

> Last Modified

2024-01-22 10:03:05
