
> Name

基于肯特纳通道和CCI指标的趋势过滤量化策略Trend-Filter-Quantitative-Strategy-Based-on-Keltner-Channels-and-CCI-Indicator

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c5a429e79a0f2500f9.png)
[trans]

## 概述

本策略结合了肯特纳通道、CCI指标以及RSI指标和交易量的条件,实现了一个较为完整的趋势过滤量化交易策略。该策略可以在突破关键价格区域、指标发出交易信号以及大额交易量出现时,产生买入和卖出信号。同时,策略加入了均线进行趋势判断,避免在没有明确趋势的情况下交易。

## 策略原理

该策略主要基于以下几个指标和条件进行交易决策:

1. 肯特纳通道:根据一定周期内的典型价格和ATR计算上下轨,判断价格是否处于通道区域内。

2. CCI指标:用于判断价格是否超买超卖。

3. RSI指标:辅助判断价格是否超买超卖。 

4. 交易量:要求交易量突破一定均值才产生交易。

5. 均线趋势过滤:结合SMA、EMA等均线指标,判断价格整体趋势方向。

在符合趋势方向的条件下,如果价格突破肯特纳通道上下轨,且CCI和RSI指标发出信号,同时交易量大幅增加,则产生买入和卖出信号。

## 策略优势

该策略结合多种指标和条件,可以有效滤除一些不确定的交易信号,使得交易决策更加稳定可靠。主要优势有:

1. 趋势过滤机制可以避免不明朗的震荡市场。

2. 肯特纳通道判断价格突破关键区域。

3. CCI和RSI发出超买超卖信号时机较准确。 

4. 大额交易量的条件可避免一些假突破。

## 策略风险

该策略主要存在以下几方面风险:

1. 趋势判断机制不完善,可能错过较强趋势机会。可以测试不同均线参数。

2. 指标参数设置不当,可能错过关键交易时机或产生错误信号。可以优化参数。 

3. 交易量放大效应不明显时,存在一定假突破风险。可以测试不同交易量放大倍数。

## 策略优化方向  

该策略可以从以下几个方面进行优化:

1. 测试不同类型和长度的均线,找到更合适的趋势过滤参数。

2. 优化肯特纳通道、CCI、RSI等指标的参数,使信号更准确。

3. 测试不同的交易量放大倍数,找到更合适倍数。

4. 可以考虑加入止损策略,以控制单笔交易的最大损失。

## 总结

总的来说，这个策略结合了Keltner通道、CCI、RSI指标和交易量条件，创建了一个相对完整的趋势过滤量化交易策略。当价格突破关键区域，指标给出交易信号，并且出现大额交易量时，它可以产生买入和卖出信号。同时，使用移动平均线进行趋势判断以避免没有明确趋势的交易。该策略具有诸如避免不清晰的波动市场、识别关键突破点、获取相对准确的超买/超卖信号以及防止一些假突破等优点。风险存在于参数设置不当和体积放大无效等方面。进一步优化可以在趋势过滤方法、指标参数、成交量倍增器以及添加止损机制上进行。

||

## Overview

This strategy combines Keltner Channels, CCI indicator and RSI indicator with trading volume conditions to create a relatively complete trend filtering quantitative trading strategy. It generates buy and sell signals when prices break through key areas, indicators give trading signals, and large trading volumes appear. At the same time, moving averages are used for trend judgment to avoid trading without a clear trend.  

## Strategy Logic  

The strategy makes trading decisions mainly based on the following indicators and conditions:

1. Keltner Channels: Calculate upper and lower bands based on typical price and ATR over a period to determine if price is within the channel.  

2. CCI Indicator: Used to determine whether price is overbought or oversold.

3. RSI Indicator: Assists in judging overbought/oversold levels.

4. Trading Volume: Requires breakout of certain moving average value.  

5. Trend Filter with MAs: Use SMA, EMA etc. to determine overall trend direction.

With trend direction condition met, buy and sell signals are generated when price breaks Keltner Channel bands, CCI and RSI give signals, and trading volume surges.  

## Advantages  

The strategy combines multiple indicators and conditions to filter uncertain signals and make decisions more reliable:  

1. Trend filter avoids unclear volatile markets. 

2. Keltner Channels identify key breakout levels.

3. CCI and RSI signals are relatively accurate.  

4. Volume surge helps prevent some false breakouts.

## Risks

Main risks:  

1. Improper trend judgment may miss stronger trends. Test different MA parameters.  

2. Wrong indicator parameters may cause missed or false signals. Optimize parameters.

3. Ineffective volume magnification leaves certain false breakout risks. Test different multipliers.

## Optimization Directions

Potential optimization directions:

1. Test different MA types and lengths for better trend filter.  

2. Optimize parameters of Keltner Channels, CCI, RSI for more accurate signals. 

3. Test different volume multipliers to find optimal level.  

4. Consider adding stop loss to limit max loss per trade.

## Conclusion  

Overall, this strategy combines Keltner Channels, CCI, RSI indicators and trading volume conditions to create a relatively complete trend filtering quantitative trading strategy. It has advantages like avoiding unclear volatile markets, identifying key breakouts, getting relatively accurate overbought/oversold signals, and preventing some false breakouts. Risks exist in aspects like improper parameter settings and ineffective volume magnification. Further optimizations can be done on the trend filtering method, indicator parameters, volume multiplier, and adding stop loss mechanisms.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Allow Long Trades|
|v_input_2|true|Allow Short Trades|
|v_input_3|0|MA Type: OFF|SMA|EMA|SMMA|CMA|TMA|
|v_input_4|0|Trend Filter Method: OFF|Normal|Reversed|
|v_input_5|14|MA Length|
|v_input_6|30|Keltner Channels Length|
|v_input_7|0.7|Keltner Channels Multiplier|
|v_input_8|5|CCI Length|
|v_input_9|75|CCI Overbought Level|
|v_input_10|-75|CCI Oversold Level|
|v_input_11|30|RSI Period|
|v_input_12|60|RSI Overbought Level|
|v_input_13|60|RSI Oversold Level|
|v_input_14|false|Volume Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-27 00:00:00
end: 2024-02-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Custom Keltner CCI Strategy with Trend Filter", overlay=true )
// Input Parameters for allowing long and short trades
allowLong = input(true, title="Allow Long Trades")
allowShort = input(true, title="Allow Short Trades")
// Trend Filter Inputs
maType = input(title="MA Type", options=["OFF", "SMA", "EMA", "SMMA", "CMA", "TMA"], defval="OFF")
trendFilterMethod = input(title="Trend Filter Method", options=["OFF", "Normal", "Reversed"], defval="OFF")
maLength = input(14, title="MA Length")
// Other Input Parameters
lengthKC = input(30, title="Keltner Channels Length")
multKC = input(0.7, title="Keltner Channels Multiplier")
lengthCCI = input(5, title="CCI Length")
overboughtCCI = input(75, title="CCI Overbought Level")
oversoldCCI = input(-75, title="CCI Oversold Level")
rsiPeriod = input(30, title="RSI Period")
rsiOverbought = input(60, title="RSI Overbought Level")
rsiOversold = input(60, title="RSI Oversold Level")
volumeMultiplier = input(0, title="Volume Multiplier", type=input.float, step=0.1, minval=0)
// Define Moving Averages
var float maValue = na
if (maType == "SMA")
    maValue := sma(close, maLength)
else if (maType == "EMA")
    maValue := ema(close, maLength)
else if (maType == "SMMA")
    maValue := na(maValue[1]) ? sma(close, maLength) : (maValue[1] * (maLength - 1) + close) / maLength
else if (maType == "CMA")
    maValue := na(maValue[1]) ? sma(close, maLength) : (sma(close, maLength) + (sma(close, maLength) - maValue[1])) / 2
else if (maType == "TMA")
    maValue := sma(sma(close, round(maLength/2)), round(maLength/2)+1)
// Entry Conditions with Trend Filter
longCondition = allowLong and (trendFilterMethod == "OFF" or (trendFilterMethod == "Normal" and close > maValue) or (trendFilterMethod == "Reversed" and close < maValue))
shortCondition = allowShort and (trendFilterMethod == "OFF" or (trendFilterMethod == "Normal" and close < maValue) or (trendFilterMethod == "Reversed" and close > maValue))
// Keltner Channels
typicalPrice = hlc3
middleLine = sma(typicalPrice, lengthKC)
range = multKC * atr(lengthKC)
upperChannel = middleLine + range
lowerChannel = middleLine - range
// CCI
cci = cci(close, lengthCCI)
// RSI
rsi = rsi(close, rsiPeriod)
// Volume
volCondition = volume > sma(volume, 50) * volumeMultiplier
// Combined Entry Conditions with Trend Filter
longCondition := longCondition and cci < oversoldCCI and low < lowerChannel and rsi < rsiOversold and volCondition
shortCondition := shortCondition and cci > overboughtCCI and high > upperChannel and rsi > rsiOverbought and volCondition
// Execute orders at the open of the new bar after conditions are met
if (longCondition)
    strategy.entry("Long", strategy.long)
if (shortCondition)
    strategy.entry("Short", strategy.short)
// Exit Conditions
strategy.close("Long", when = cci > 0)
strategy.close("Short", when = cci < 0)
// Plotting
plot(upperChannel, color=color.red, linewidth=1)
plot(lowerChannel, color=color.green, linewidth=1)
hline(overboughtCCI, "Overbought", color=color.red)
hline(oversoldCCI, "Oversold", color=color.green)
```

> Detail

https://www.fmz.com/strategy/442944

> Last Modified

2024-02-27 15:47:20
