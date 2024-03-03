
> Name

移动平均线双击金叉持续上涨策略Dual-Moving-Average-Crossover-Persistent-Uptrend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13cd9e4626b59d3a93b.png)

[trans]

## 概述

这是一个利用移动平均线金叉形态,配合趋势线持续上涨形成的交易策略。当快线从下方向上突破慢线时,形成金叉信号。如果金叉后的趋势能持续向上,那么就可以在这个阶段开仓做多。当价格上涨到止损线或止盈线时,就可以选择止损或止盈了。

## 策略原理

该策略主要基于移动平均线的金叉形态来判断入场时机。具体来说,定义了一个快速移动平均线MA1和一个慢速移动平均线MA2。当MA1从下方向上突破MA2时,就是做多的信号。 

为了避免因短期金叉造成的假信号,策略加入了角度阈值判断,即只有当MA2的角度大于设定的阈值时才会触发买入信号。这可以过滤掉一些非趋势性的短期上涨。

策略同时设定了止损线和止盈线。止损线用于避免市场突然转向造成的损失,止盈线用于锁定盈利离场。具体设置为入场价格的一定百分比范围。

当价格上涨达到止盈点时,策略会选择止盈离场。同时,如果本轮上涨较强,策略会再次做空反向操作。

## 优势分析

这是一个比较简单直观的趋势追踪策略。它具有以下几个优势:

1. 使用移动平均线组合过滤掉市场噪音,能锁定趋势方向
2. 角度阈值能避免被短期震荡误导
3. 双向操作,能在震荡行情中获利
4. 设定止损止盈,控制风险

## 风险分析

该策略也存在一些风险需要注意:

1. 移动平均线存在滞后,可能错过价格转折点
2. 虽有止损,但在瞬息变化的市场中,止损被突破的概率还是存在
3. 双边交易风险加倍,卖出点选取不当可能造成损失
4. 参数设定不当,如移动平均线周期选择,可能影响策略表现

## 优化方向

可以从以下几个方面进一步优化该策略:

1. 增加趋势判断指标,如MACD,布林带等,提高定位准确率
2. 采用机器学习等方法动态优化移动平均线的周期参数
3. 优化止损止盈的设置,如采用追踪止损等
4. 增加交易量控制,避免亏损过大
5. 结合段指等指标判断本轮趋势强度,动态调整反向开仓力度

## 总结

整体来说,这是一个简单实用的趋势跟踪策略。它具有一定的优势,但也需要注意风险。通过进一步的参数优化、指标优选、止损止盈设定等进行改进,可以获得更好的稳定收益。但任何策略都无法完全避免市场系统性风险,需要建立风险意识,谨慎交易。
||

## Overview

This is a trading strategy that utilizes moving average crossover patterns along with persistent uptrend to enter trades. When the fast MA crosses above the slow MA, a golden crossover signal is generated. If the uptrend persists after the crossover, a long position can be opened. When the price rallies to the stop loss or take profit levels, the position can be closed for stop loss or take profit.

## Strategy Logic

The strategy is primarily based on moving average crossover for entry signals. Specifically, a fast MA (MA1) and slow MA (MA2) are defined. When MA1 crosses above MA2, it's a signal to go long.

To avoid false signals from short-term crossovers, an angle threshold is added, so that a buy signal is only triggered when the MA2 angle is above a set threshold. This filters out some non-trending short-term rallies.

The strategy also sets a stop loss and take profit. The stop loss avoids losses in case of sudden market reversal, while take profit locks in profits. They are set as a percentage range from the entry price.

When price rallies to take profit point, the strategy will close long for profit taking. Also, if the rally is strong, the strategy will open a short position for mean reversion.

## Advantage Analysis

This is a simple and intuitive trend following strategy. The advantages are:

1. MA combo filters out market noise and locks in trend direction
2. Angle threshold avoids being misled by short-term oscillations  
3. Two-way trading allows profiting from range-bound markets
4. Stop loss and take profit controls risk

## Risk Analysis

There are some risks to note:

1. MAs have lag and may miss turning points
2. Stop loss is not guaranteed, can be gapped in fast markets
3. Double-edge trading doubles risk, timing of short entry is key 
4. Poor parameter tuning like MA periods can affect results

## Improvement Areas

Some ways to further optimize the strategy:

1. Add trend filters like MACD, Bollinger to improve accuracy
2. Use machine learning to dynamically optimize MA periods
3. Optimize stop loss and take profit settings e.g. trailing stops
4. Add position sizing to limit losses
5. Gauge trend strength with ADX to size mean reversion position

## Conclusion

Overall this is a simple and practical trend following strategy. It has pros but also risks. Further refinements like parameter tuning, optimal indicators, stop loss settings etc. can improve it. But no strategy eliminates systemic risk fully. Risk management is key for prudent trading.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|7|Angle|
|v_input_int_2|2|Angle Period|
|v_input_int_3|10|ATR Period|
|v_input_int_4|6|Angle Level|
|v_input_source_1_close|0|MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|true|TP|
|v_input_float_2|true|SL|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-05 00:00:00
end: 2023-11-12 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//written by markjames12210@gmail.com
//@version=5
strategy(title="MJ-Dual Moving Average",initial_capital=10000,overlay=false)

// import TradingView/ZigZag/6 as ZigZagLib 

// // Create Zig Zag instance from user settings.
// var zigZag = ZigZagLib.newInstance(
//   ZigZagLib.Settings.new(
//       input.float(5.0, "Price deviation for reversals (%)", 0.00001, 100.0, 0.5, "0.00001 - 100"),
//       input.int(10, "Pivot legs", 2),
//       input(#2962FF, "Line color"),
//       input(true, "Extend to last bar"),
//       input(true, "Display reversal price"),
//       input(true, "Display cumulative volume"),
//       input(true, "Display reversal price change", inline = "priceRev"),
//       input.string("Absolute", "", ["Absolute", "Percent"], inline = "priceRev"),
//       true)
//  )

// // Update 'zigZag' object on each bar with new ​pivots, ​volume, lines, labels.
// zigZag.update()
// // plot(zigZag.pivots, "zigZag")

ma1= ta.sma(close,8)
ma2= ta.sma(close,21)

angleCriteria = input.int(title="Angle", defval=7, minval=1, maxval=13)

i_lookback   = input.int(2,     "Angle Period", minval = 1)
i_atrPeriod  = input.int(10,    "ATR Period",   minval = 1)
i_angleLevel = input.int(6,     "Angle Level",  minval = 1)
i_maSource   = input.source(close, "MA Source")
TP = input.float(1, "TP", minval = 0.1)
SL = input.float(1, "SL", minval = 0.1)

f_angle(_src, _lookback, _atrPeriod) =>
    rad2degree = 180 / 3.141592653589793238462643  //pi 
    ang = rad2degree * math.atan((_src[0] - _src[_lookback]) / ta.atr(_atrPeriod)/_lookback)
    ang
_angle = f_angle(ma2, i_lookback, i_atrPeriod)
plot(ta.atr(i_atrPeriod), "atr")
// plot(ma1,color=#FF0000)
// plot(ma2,color=#00FF00)

crosso=ta.crossover(ma1,ma2) 
crossu=ta.crossunder(ma1,ma2)

_lookback = 15

f_somethingHappened(_cond, _lookback) =>
    bool _crossed = false
    for i = 1 to _lookback
        if _cond[i]
            _crossed := true
    _crossed
    
longcrossed = f_somethingHappened(crosso,_lookback)
shortcrossed = f_somethingHappened(crossu,_lookback)

atr_factor = 1
atr = ta.atr(i_atrPeriod)
e = atr * atr_factor 

afr = close 
afr := nz(afr[1], afr)

atr_factoryHigh = close + e
atr_factoryLow = close - e 

if atr_factoryLow > afr 
    afr := atr_factoryLow
if atr_factoryHigh < afr 
    afr := atr_factoryHigh

// plot(afr, "afr", display = display.data_window)
// plot(atr_factoryHigh, "afr", color = color.yellow, display = display.all)
// plot(atr_factoryLow, "afr", color = color.green, display = display.all)


inLong() => strategy.position_size > 0
inShort() => strategy.position_size < 0
inZero() => not inLong() and not inShort()

long = longcrossed and _angle > angleCriteria
short= shortcrossed and _angle < -(angleCriteria)

plotshape(long, "Buy", shape.arrowup, location.belowbar, color = #FF0000)
plotshape(short, "Sell", shape.arrowdown, location.abovebar, color = #00FF00)

var longTp = 0.0
var longSl = 0.0
var shortTp = 0.0
var shortSl = 0.0
[b_middle, b_high, b_low] = ta.bb(close, 20, 2)
entry_price = strategy.opentrades.entry_price(0)

if inZero()
    if short
        longTp := close * (1 + TP/100)
        longSl := close * (1 - SL/100)
        strategy.entry("LONG",strategy.long, comment = "tp:" + str.tostring(longTp) + " sl:" + str.tostring(longSl))
    if long
        shortTp := close * (1 - TP/100)
        shortSl := close * (1 + SL/100)
        strategy.entry("SHORT",strategy.short, comment = "tp:" + str.tostring(shortTp) + " sl:" + str.tostring(shortSl))

if inLong()
    // if close - entry_price > close * 0.005
    //     longSl := entry_price + close * 0.001
    if high > longTp
        strategy.close("LONG")
        if (close - open) > close * 0.014
            shortTp := close * (1 - TP/100)
            shortSl := close * (1 + SL/100)
            strategy.entry("SHORT",strategy.short, comment = "tp:" + str.tostring(shortTp) + " sl:" + str.tostring(shortSl))

    if close < longSl
        strategy.close("LONG")
    if open >= b_high and close >= b_high
        strategy.close("LONG")
    // if high > b_high and entry_price < high
    //     strategy.close("LONG")


if inShort()
    // if entry_price - close > close * 0.005
    //     shortSl := entry_price - close * 0.001
    if low < shortTp
        strategy.close("SHORT")
        if (open - close) > close * 0.014
            longTp := close * (1 + TP/100)
            longSl := close * (1 - SL/100)
            strategy.entry("LONG",strategy.long, comment = "tp:" + str.tostring(longTp) + " sl:" + str.tostring(longSl))


    if close > shortSl
        strategy.close("SHORT")
    if open < b_low and close < b_low
        strategy.close("SHORT")
    // if low < b_low and entry_price > low
    //     strategy.close("SHORT")
```

> Detail

https://www.fmz.com/strategy/431901

> Last Modified

2023-11-13 10:47:48
