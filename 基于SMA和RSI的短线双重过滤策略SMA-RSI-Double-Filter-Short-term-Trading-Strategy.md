
> Name

基于SMA和RSI的短线双重过滤策略SMA-RSI-Double-Filter-Short-term-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略基于简单移动平均线(SMA)和相对强弱指数(RSI)这两种指标设计。它在RSI值突破入场信号线,且收盘价低于SMA时做空;在止损或止盈信号出现时平仓。该策略结合双重过滤条件进行入场,可有效避免无效交易。

## 原理

该策略主要根据两种指标判断行情:

1. SMA:计算最近200天的收盘价简单移动平均,代表中长线趋势方向。

2. RSI:计算最近14天收盘价的相对强弱,代表短期超买超卖情况。 

当RSI上穿51进入超买区,又在SMA线上方时,表示短线和中长线趋势背离,因此做空。 

之后设置止损线和止盈线。当RSI下破32时止盈;当RSI上穿54或止损线被突破时止损。

## 优势

1. 双指标过滤增加入场准确率。RSI确定短期超买信号,SMA确定中长线空头信号,两者组合更可靠。

2. 采用追踪止损方式,可根据行情走势锁定利润,避免给利润回吐。

3. 策略逻辑简单清晰,容易理解修改。

## 风险

1. 未考虑交易量、波动率等影响因素。

2. RSI参数较为固定,可能不适用于所有品种和周期。 

3. 未考虑交易滑点、手续费等交易成本。

4. 策略较为简单,可扩展空间有限。

## 优化思路

1. 测试并优化RSI和SMA的参数,找到最佳参数组合。

2. 增加止盈止损方式。如移动止损、比例止损等。

3. 结合趋势性指标如MACD进行过滤,避免逆势交易。

4. 考虑加入交易量指标,过滤低量的虚假突破。

## 总结

该策略整体思路清晰,具有一定的实用价值。但其参数设定较为固定,未考虑市场变化。此外也存在一些可以优化的细节。综合而言,该策略可作为初学者理解双重指标过滤策略的一个示例,但实盘时还需进一步测试和完善。

||


## Overview

This strategy is based on the Simple Moving Average (SMA) and Relative Strength Index (RSI) indicators. It goes short when the RSI crosses above the entry level and the close price is below the SMA; It closes positions when stop loss or take profit signals appear. The double filter helps avoid ineffective trades.

## Principles 

The strategy judges the market mainly based on two indicators:

1. SMA: Calculated based on the simple moving average of closing prices in the past 200 days, representing mid-long term trends.

2. RSI: Calculated based on the relative strength of closing prices in the past 14 days, representing short-term overbought/oversold levels.

When RSI crosses above 51 into the overbought zone and is above the SMA line, it indicates that the short-term and mid-long term trends are diverging, so a short position is opened. 

After that, stop loss and take profit lines are set. Position is closed when RSI drops below 32 for take profit, or when RSI crosses above 54 or the stop loss is hit for stop loss.

## Strengths

1. The double filter of indicators increases the accuracy of entry signals. RSI determines short-term overbought levels and SMA determines mid-long term bearish signals, combining the two makes the signals more reliable.

2. The trailing stop locks in profits according to price action, avoiding giving back profits.

3. The logic is simple and straightforward, easy to understand and modify.

## Risks

1. Does not consider factors like trading volume or volatility. 

2. RSI parameters are fixed and may not suit all products and timeframes.

3. Does not consider trading costs like slippage and commissions. 

4. The strategy is very simple and has limited room for expansion.

## Improvement Areas

1. Test and optimize RSI and SMA parameters to find the best combination.

2. Add more types of stop loss/profit taking methods, like trailing stops, percentage-based stops.

3. Add trend filter indicators like MACD to avoid trading against the trend. 

4. Consider volume indicators to filter out false breakouts with low volume.

## Summary  

The strategy has clear logic and some practical value. But its parameters are fixed and don't adapt to market changes. There are also some details that can be improved. Overall, it can serve as an example for beginners to learn double indicator filtering strategies, but needs further testing and enhancement for actual trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|SMA Length|
|v_input_2|14|RSI Length|
|v_input_3|51|RSI Entry Level|
|v_input_4|54|RSI Stop Level|
|v_input_5|32|RSI Take Profit Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-10-07 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © abdllhatn

//@version=5
// strategy("Alpha Short SMA and RSI Strategy", overlay=true, initial_capital=10000, default_qty_value=100)

// Inputs
sma_length = input(200, title="SMA Length")
rsi_length = input(14, title="RSI Length")
rsi_entry = input(51, title="RSI Entry Level")
rsi_stop = input(54, title="RSI Stop Level")
rsi_take_profit = input(32, title="RSI Take Profit Level")

// Indicators
sma_value = ta.sma(close, sma_length)
rsi_value = ta.rsi(close, rsi_length)

var float trailingStop = na
var float lastLow = na

// Conditions
shortCondition = ta.crossover(rsi_value, rsi_entry) and close < sma_value
if (shortCondition)
    strategy.entry("Sell", strategy.short)
    trailingStop := na
    lastLow := na

if (strategy.position_size < 0)
    if (na(lastLow) or close < lastLow)
        lastLow := close
        trailingStop := close

if not na(trailingStop) and close > trailingStop
    strategy.close("Sell")

if (rsi_value >= rsi_stop)
    strategy.close("Sell")

if (rsi_value <= rsi_take_profit)
    strategy.close("Sell")

// Plot
plot(sma_value, color=color.red, linewidth=2)



```

> Detail

https://www.fmz.com/strategy/428682

> Last Modified

2023-10-08 12:14:36
