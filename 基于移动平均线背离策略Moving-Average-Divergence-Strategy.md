
> Name

基于移动平均线背离策略Moving-Average-Divergence-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d23dcd92ddbed44f6d.png)
 [trans]

## 概述

该策略通过计算移动平均线及其枢轴点,发现价格与移动平均线之间的背离,作为买入和卖出信号。它可以应用于任何振荡指标,以查找背离。这是一个有价值的工具,可以用来进行回测和实盘交易。

## 策略原理

1. 计算长度为Len的移动平均线(MA)
2. 检测MA的枢轴低点(PL)和枢轴高点(PH)
3. 判断是否存在正向背离:价格创新低点而MA未创新低或价格未创新低而MA创新低
4. 判断是否存在反向背离:价格创新高点而MA未创新高或价格未创新高而MA创新高
5. 根据背离情况判断买入和卖出

## 优势分析

1. 可自动发现价格与MA之间的背离,避免人工判断错误
2. 可适用于任何振荡指标,扩展性强
3. 可用于回测验证策略盈利能力
4. 可配置参数调整灵敏度,避免错误信号
5. 提供多种背离类型,判断准确全面

## 风险分析 

1. 若振荡指标设定不当,可能产生大量错误信号
2. 背离发生前需要有效的枢轴点,可能发生信号不足
3. 需适当调整参数,以平衡灵敏度与过滤错误信号
4. 与其他因素结合使用效果更好,单独使用可信度较低

## 优化方向

1. 优化移动平均线参数,寻找最佳参数组合
2. 结合其他指标如量价指标避免错误信号
3. 增加机器学习模型判断背离可信度
4. 增加风险管理机制,控制单笔损失

## 总结

该策略通过发现价格与移动平均线之间的背离作为交易信号,可自动化判断,避免主观错误。可广泛适用于任何振荡指标,具备较强扩展性。需配合参数优化与其他指标使用,可大幅提高交易信号的可信度与系统稳定性。

||

## Overview

This strategy detects divergences between price and moving average line, and uses them as buy and sell signals. It can be applied to any oscillator to find divergences. This is a valuable tool that can be used for backtesting and live trading.  

## Strategy Logic  

1. Calculate Moving Average (MA) of length Len
2. Detect pivot low (PL) and pivot high (PH) points of MA 
3. Check for bullish divergence: price makes new low but MA does not or MA makes new low but price does not
4. Check for bearish divergence: price makes new high but MA does not or MA makes new high but price does not 
5. Buy and sell based on divergence  

## Advantage Analysis

1. Automatically detect divergences between price and MA, avoid manual judgment errors
2. Applicable to any oscillator, strong extensibility  
3. Can be used to backtest and validate profitability
4. Configurable parameters to adjust sensitivity and avoid false signals
5. Provide multiple divergence types for accurate and comprehensive judgment  

## Risk Analysis

1. Invalid oscillator settings may generate excessive false signals
2. Valid pivot points required before divergence occurs, signals may be insufficient
3. Need to adjust parameters to balance sensitivity and filter false signals  
4. Works better combined with other factors, relatively low confidence when used alone

## Optimization Directions  

1. Optimize MA parameters to find best parameter combinations
2. Combine with other indicators like volume to avoid false signals
3. Add machine learning model to judge divergence credibility 
4. Add risk management mechanisms to control per trade loss

## Summary  

This strategy uses divergences between price and MA as trading signals for automated judgment to avoid subjective errors. It can be widely applied to any oscillator with strong extensibility. Requires parameter optimization and usage with other indicators to significantly improve signal reliability and system stability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2021|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|999999|Backtest Stop Year|
|v_input_5|9|Backtest Stop Month|
|v_input_6|26|Backtest Stop Day|
|v_input_7|14|MA Period|
|v_input_8_close|0|MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|5|Pivot Lookback Right|
|v_input_10|5|Pivot Lookback Left|
|v_input_11|600|Max of Lookback Range|
|v_input_12|2|Min of Lookback Range|
|v_input_13|true|Plot Bullish|
|v_input_14|true|Plot Hidden Bullish|
|v_input_15|true|Plot Bearish|
|v_input_16|true|Plot Hidden Bearish|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-24 00:00:00
end: 2024-01-12 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © tista 
//https://www.tradingview.com/u/tista/#published-scripts

//@version=4

strategy(title="MA Divergences", format=format.price)

//* Backtesting Period Selector | Component *//
//* https://www.tradingview.com/script/eCC1cvxQ-Backtesting-Period-Selector-Component *//
//* https://www.tradingview.com/u/pbergden/ *//
//* Modifications made *//
testStartYear = input(2021, "Backtest Start Year") 
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(999999, "Backtest Stop Year")
testStopMonth = input(9, "Backtest Stop Month")
testStopDay = input(26, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

testPeriod() => true
/////////////// END - Backtesting Period Selector | Component ///////////////
len = input(title="MA Period", minval=1, defval=14)
src = input(title="MA Source", defval=close)
lbR = input(title="Pivot Lookback Right", defval=5)
lbL = input(title="Pivot Lookback Left", defval=5)
rangeUpper = input(title="Max of Lookback Range", defval=600)
rangeLower = input(title="Min of Lookback Range", defval=2)
plotBull = input(title="Plot Bullish", defval=true)
plotHiddenBull = input(title="Plot Hidden Bullish", defval=true)
plotBear = input(title="Plot Bearish", defval=true)
plotHiddenBear = input(title="Plot Hidden Bearish", defval=true)

bearColor = color.red
bullColor = color.green
hiddenBullColor = color.green
hiddenBearColor = color.red
textColor = color.white
noneColor = color.new(color.white, 100)

osc = wma(src, len)

plot(osc, title="MA", linewidth=2, color=color.yellow)

plFound = na(pivotlow(osc, lbL, lbR)) ? false : true
phFound = na(pivothigh(osc, lbL, lbR)) ? false : true

_inRange(cond) =>
    bars = barssince(cond == true)
    rangeLower <= bars and bars <= rangeUpper

alertcondition(osc[1] > 100.0 and osc[2] < 100.0, title="MA value crosses over 100.0", message="Check charts for a MA cross over 100.0")
alertcondition(osc[1] < 100.0 and osc[2] > 100.0, title="MA value crosses under 100.0", message="Check charts for a MA cross under 100.0")
alertcondition(osc[1] > -100. and osc[2] < -100.0, title="MA value crosses over -100.0", message="Check charts for a MA cross over -100.0")
alertcondition(osc[1] < -100.0 and osc[2] > -100.0, title="MA value crosses under -100.0", message="Check charts for a MA cross under -100.0")

//------------------------------------------------------------------------------
// Regular Bullish

// Osc: Higher Low
oscHL = osc[lbR] > valuewhen(plFound, osc[lbR], 1) and _inRange(plFound[1])

// Price: Lower Low
priceLL = low[lbR] < valuewhen(plFound, low[lbR], 1)

bullCond = plotBull and priceLL and oscHL and plFound

plot(
	 plFound ? osc[lbR] : na,
	 offset=-lbR,
	 title="Regular Bullish",
	 linewidth=2,
	 color=(bullCond ? bullColor : noneColor),
	 transp=0
	 )

plotshape(
	 bullCond ? osc[lbR] : na,
	 offset=-lbR,
	 title="Regular Bullish Label",
	 text=" Bull ",
	 style=shape.labelup,
	 location=location.absolute,
	 color=bullColor,
	 textcolor=textColor,
	 transp=0
	 )

alertcondition(bullCond, title="Regular bullish divergence in MA found", message="Check charts for a regular bullish divergence found with MA")

//------------------------------------------------------------------------------
// Hidden Bullish

// Osc: Lower Low
oscLL = osc[lbR] < valuewhen(plFound, osc[lbR], 1) and _inRange(plFound[1])

// Price: Higher Low
priceHL = low[lbR] > valuewhen(plFound, low[lbR], 1)

hiddenBullCond = plotHiddenBull and priceHL and oscLL and plFound

plot(
	 plFound ? osc[lbR] : na,
	 offset=-lbR,
	 title="Hidden Bullish",
	 linewidth=2,
	 color=(hiddenBullCond ? hiddenBullColor : noneColor),
	 transp=0
	 )

plotshape(
	 hiddenBullCond ? osc[lbR] : na,
	 offset=-lbR,
	 title="Hidden Bullish Label",
	 text=" H Bull ",
	 style=shape.labelup,
	 location=location.absolute,
	 color=bullColor,
	 textcolor=textColor,
	 transp=0
	 )

alertcondition(hiddenBullCond, title="Hidden bullish divergence in MA found", message="Check charts for a hidden bullish divergence found with MA")

//------------------------------------------------------------------------------
// Regular Bearish

// Osc: Lower High
oscLH = osc[lbR] < valuewhen(phFound, osc[lbR], 1) and _inRange(phFound[1])

// Price: Higher High
priceHH = high[lbR] > valuewhen(phFound, high[lbR], 1)

bearCond = plotBear and priceHH and oscLH and phFound

plot(
	 phFound ? osc[lbR] : na,
	 offset=-lbR,
	 title="Regular Bearish",
	 linewidth=2,
	 color=(bearCond ? bearColor : noneColor),
	 transp=0
	 )

plotshape(
	 bearCond ? osc[lbR] : na,
	 offset=-lbR,
	 title="Regular Bearish Label",
	 text=" Bear ",
	 style=shape.labeldown,
	 location=location.absolute,
	 color=bearColor,
	 textcolor=textColor,
	 transp=0
	 )

alertcondition(bearCond, title="Regular bearish divergence in MA found", message="Check charts for a regular bearish divergence found with MA")

//------------------------------------------------------------------------------
// Hidden Bearish

// Osc: Higher High
oscHH = osc[lbR] > valuewhen(phFound, osc[lbR], 1) and _inRange(phFound[1])

// Price: Lower High
priceLH = high[lbR] < valuewhen(phFound, high[lbR], 1)

hiddenBearCond = plotHiddenBear and priceLH and oscHH and phFound

plot(
	 phFound ? osc[lbR] : na,
	 offset=-lbR,
	 title="Hidden Bearish",
	 linewidth=2,
	 color=(hiddenBearCond ? hiddenBearColor : noneColor),
	 transp=0
	 )

plotshape(
	 hiddenBearCond ? osc[lbR] : na,
	 offset=-lbR,
	 title="Hidden Bearish Label",
	 text=" H Bear ",
	 style=shape.labeldown,
	 location=location.absolute,
	 color=bearColor,
	 textcolor=textColor,
	 transp=0
	 )

// Alerts
//alertcondition(bearCond or hiddenBearCond, title='Bear div', message='Bear div')
//alertcondition(bullCond or hiddenBullCond, title='Bull div', message='Bull div')
//alertcondition(bearCond or bullCond, title='Bull or beal div', message='Bull or bear div') 
//alertcondition(hiddenBearCond or hiddenBullCond, title='Bull or beal div', message='Hidden Bull or bear div') 
//alertcondition(hiddenBearCond or hiddenBullCond or bearCond or bullCond, title='Bull or beal div', message='Any Bull or bear div') 

if testPeriod()
    if bullCond or hiddenBullCond
        strategy.entry("Buy", strategy.long)
    if bearCond or hiddenBearCond
        strategy.entry("Sell", strategy.short)
```

> Detail

https://www.fmz.com/strategy/439843

> Last Modified

2024-01-24 11:43:41
