
> Name

可配置BBRSIAroon策略Configurable-BBRSIAroon-Strategy-Backtest

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略结合布林带(BB)、相对强弱指数(RSI)和Aroon指标,以发挥各指标的优势,为交易提供高效的入场和出场信号。

## 策略原理

1. 当价格突破布林带下带时,显示多头信号。

2. 当RSI上穿超买线时,显示多头确认信号。 

3. 当Aroon上穿下穿时,显示多头确认信号。

4. 当上述三个条件同时满足时,做多。

5. 当价格突破布林带上带时,显示空头信号。

6. 当RSI下穿超卖线时,显示空头确认信号。

7. 当Aroon下穿上穿时,显示空头确认信号。 

8. 当上述三个条件同时满足时,做空。

## 策略优势

- 可配置参数,优化至最佳组合
- 多种指标确认,提高信号准确率
- 适用于多种市场环境
- 简单的交易逻辑,易于实施

## 策略风险

- 参数优化不当,可能产生过多错误信号
- 多重指标增加滞后,可能错过快速反转
- 反向操作增加交易频率和成本

## 优化方向

- 多市场多时间框架回测寻找最佳参数
- 评估每种指标的效果,必要时删减
- 尝试基于机器学习的参数优化
- 优化策略代码,减少计算量
- 测试不同持仓时间参数

## 总结

该策略综合多个指标的优势,形成较强大的入场信号。通过参数优化、去除冗余指标及优化代码,可以将策略效果提升至更高水平。总体而言,该策略为交易提供了有效的定制化解决方案。

|| 

## Overview

This strategy combines Bollinger Bands (BB), Relative Strength Index (RSI) and Aroon indicators to capitalize on the strengths of each for efficient entry and exit signals trading.

## How it Works

1. Price breaking BB lower band shows long signal.

2. RSI crossing oversold line gives long confirmation.

3. Aroon crossover shows long confirmation.  

4. Long entry when all 3 conditions are met.

5. Price breaking BB upper band shows short signal. 

6. RSI crossing overbought line gives short confirmation.

7. Aroon crossover shows short confirmation.

8. Short entry when all 3 conditions are met.

## Advantages

- Configurable parameters for optimization
- Multiple confirmations improve accuracy 
- Adaptable to various market conditions
- Simple logic easy to implement

## Risks

- Poor parameter tuning can cause false signals
- Multiple indicators add lag, may miss quick reversals
- Reversals increase trade frequency and costs

## Optimization Directions

- Backtest across markets and timeframes for optimal parameters
- Evaluate contribution of each indicator, remove redundancies
- Explore machine learning for parameter optimization
- Optimize code to reduce computations
- Test different holding period parameters 

## Conclusion

The strategy combines strengths of multiple indicators into robust entry signals. Further improvements via parameter optimization, reducing redundant indicators, and optimizing code can enhance performance. Overall an effective customizable solution  trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4|Aroonish Lenght|
|v_input_2|50|Aroonish Confirmation Value|
|v_input_3|4|RSI Lenght|
|v_input_4|20|RSI Oversold Limit|
|v_input_5|80|RSI Overbought Limit|
|v_input_6|20|Bollinger Lenght|
|v_input_7|2.5|Bollinger Std Dev|
|v_input_8|3|Bars to keep the operation open|
|v_input_9|true|Start Month|
|v_input_10|true|Start Date|
|v_input_11|(2020)|Start Year|
|v_input_12|true|End Month|
|v_input_13|true|End Date|
|v_input_14|(2021)|End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-13 00:00:00
end: 2023-09-20 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// Developed by Marco Jarquin as part of Arkansas 22 Project for Binary Options
// CBRA for binary options (Configurable Bollinger Bands, RSI and Aroon)

//@version=4
// ====================================================================================

//strategy("A22.CBRA.Strat", overlay=true, initial_capital=10000, currency="USD", calc_on_every_tick=true, default_qty_type=strategy.cash, default_qty_value=4000, commission_type=strategy.commission.cash_per_order, commission_value=0)

// Aroonish Parameters
// ====================================================================================

Aroonish_length = input(4, minval=1, title="Aroonish Lenght")
Aroonish_ConfVal = input(50, minval=0, maxval=100, step=25, title="Aroonish Confirmation Value")
Aroonish_upper = 100 * (-highestbars(high, Aroonish_length+1) + Aroonish_length)/Aroonish_length
Aroonish_lower = 100 * (-lowestbars(low, Aroonish_length+1) + Aroonish_length)/Aroonish_length

// Aroonish confirmations
// ====================================================================================
Aroonish_ConfLong = (Aroonish_lower >= Aroonish_ConfVal) and (Aroonish_upper < Aroonish_lower)
Aroonish_ConfShrt = (Aroonish_upper >= Aroonish_ConfVal) and (Aroonish_upper > Aroonish_lower)

plotshape(crossover(Aroonish_lower, Aroonish_upper), color = color.red, style = shape.triangledown, location = location.abovebar, size = size.auto, title = "Ar-B")
plotshape(crossover(Aroonish_upper, Aroonish_lower), color = color.green, style = shape.triangleup, location = location.belowbar, size = size.auto, transp = 0, title = "Ar-S")

// RSI Parameters
// ====================================================================================
RSI_length = input(4, title="RSI Lenght")
RSI_overSold = input(20, title="RSI Oversold Limit")
RSI_overBought = input(80, title="RSI Overbought Limit" )

RSI = rsi(close, RSI_length)

plotshape(crossover(RSI, RSI_overSold), color = color.orange, style = shape.square, location = location.belowbar, size = size.auto, title = "RSI-B")
plotshape(crossunder(RSI, RSI_overBought), color = color.orange, style = shape.square, location = location.abovebar, size = size.auto, transp = 0, title = "RSI-S")

// Bollinger Parameters
// ====================================================================================
BB_length = input(20, minval=1, title="Bollinger Lenght")
BB_mult = input(2.5, minval=0.1, maxval=50, step=0.1, title="Bollinger Std Dev")
// BB_bars = input(3, minval=1, maxval=5, title="Check bars after crossing")

BB_basis = sma(close, BB_length)
BB_dev = BB_mult * stdev(close, BB_length)

BB_upper = BB_basis + BB_dev
BB_lower = BB_basis - BB_dev

p1 = plot(BB_upper, color=color.blue)
p2 = plot(BB_lower, color=color.blue)

// Bars to have the operation open
// ====================================================================================
nBars = input(3, minval=1, maxval=30, title="Bars to keep the operation open")

// Strategy condition short or long
// ====================================================================================
ConditionShrt = ((crossunder(close, BB_upper) or crossunder(close[1], BB_upper[1])) and Aroonish_ConfShrt) and (crossunder(RSI, RSI_overBought) or crossunder(RSI[1], RSI_overBought[1]))
ConditionLong = ((crossover(close, BB_lower) or crossover(close[1], BB_lower[1])) and Aroonish_ConfLong) and (crossover(RSI, RSI_overSold) or crossover(RSI[1], RSI_overSold[1]))

plotshape(crossover(close, BB_lower), color = color.blue, style = shape.circle, location = location.belowbar, size = size.auto, title = "BB-B")
plotshape(crossunder(close, BB_upper), color = color.blue, style = shape.circle, location = location.abovebar, size = size.auto, transp = 0, title = "BB-S")


// Make input options that configure backtest date range
// ====================================================================================
iMo = input(title="Start Month", type=input.integer, defval=1, minval=1, maxval=12)
iDy = input(title="Start Date", type=input.integer, defval=1, minval=1, maxval=31)
iYr = input(title="Start Year", type=input.integer, defval=(2020), minval=1800, maxval=2100)

eMo = input(title="End Month", type=input.integer, defval=1, minval=1, maxval=12)
eDy = input(title="End Date", type=input.integer, defval=1, minval=1, maxval=31)
eYr = input(title="End Year", type=input.integer, defval=(2021), minval=1800, maxval=2100)

// Look if the close time of the current bar falls inside the date range
// ====================================================================================
inDateRange = true


// Evaluates conditions to enter short or long
// ====================================================================================
if (inDateRange and ConditionLong)
    strategy.entry("A22.L", strategy.long)

if (inDateRange and ConditionLong[nBars])
    strategy.close("A22.L", comment="A22.L Exit")
    
if (inDateRange and ConditionShrt)
    strategy.entry("A22.S", strategy.short)

if (inDateRange and ConditionShrt[nBars])
    strategy.close("A22.S", comment="A22.S Exit")

if (not inDateRange)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/427468

> Last Modified

2023-09-21 15:05:38
