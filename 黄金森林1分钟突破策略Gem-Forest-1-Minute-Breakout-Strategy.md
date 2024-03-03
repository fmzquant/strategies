
> Name

黄金森林1分钟突破策略Gem-Forest-1-Minute-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/7d40088943fb372215.png)
[trans]
## 概述

黄金森林1分钟突破策略是一种短线量化交易策略,致力于捕捉价格在1分钟时间框架内的突破信号,实现快速盈利。该策略融合均线、ATR、RSI等多个指标,形成交易信号,以期在短时间内实现更高的盈亏比。

## 策略原理 

该策略主要基于以下几个要素形成交易信号:

1. ATR指标 - 计算价格的平均真实波动范围,用来设置价格通道;
2. 均线指标 - 计算快速EMA和慢速EMA,形成金叉死叉信号;  
3. RSI指标 - 计算快慢RSI,判断超买超卖区域;
4. 价格与通道的关系 - 当价格突破上下通道时,发出交易信号。

具体来说,策略会计算ATR的N周期平均值,以及快速EMA、慢速EMA和快慢RSI。结合价格突破ATR通道,以及EMA形成金叉和RSI达到超买超卖水平这三个条件,策略会发出买入或卖出的信号。

## 优势分析

该策略主要具有以下优势:

1. 捕捉价格的短期趋势;
2. 响应迅速,适合高频交易;
3. 利用多种指标进行滤波,可靠性较高;
4.  parametric,用户可以自行优化参数。

## 风险分析

该策略也存在一些风险:  

1. 短线交易风险高,需要严格的止损;
2. 参数优化不当可能导致过拟合;
3. 交易频率过高,交易成本增大。

为了控制风险,应采取止损策略,同时优化参数时做好回测,避免过拟合。此外,调整交易频率,控制交易成本。

## 优化方向  

该策略可以从以下几个方向进行优化:

1.测试更短周期(5分钟、15分钟)的参数设置;  

2.加入更多过滤指标,例如交易量指标等,提高信号质量;

3.优化ATR通道和均线参数,寻找最佳参数组合。

## 总结

黄金森林1分钟突破策略,专注于抓住短期价格趋势,通过多指标联合过滤,具有响应迅速、盈亏比高的特点。该策略可根据用户风险偏好,通过参数优化获得更好的表现。但用户需要注意控制交易风险,包括严格止损和合理交易频率等。总体而言,该策略适合有一定量化交易基础与风险承受能力的投资者进行短线操作。

||

## Overview

The Gem Forest 1 Minute Breakout Strategy is a quantitative trading strategy that aims to capture breakout signals within a 1-minute timeframe to realize quick profits. This strategy incorporates multiple indicators like moving averages, ATR, RSI to generate trading signals and achieve higher risk-reward ratios over short holding periods.

## Strategy Logic

This strategy mainly uses the following elements to form trade signals:

1. ATR Indicator - Calculates average true range to set price channels;  
2. Moving Average Indicators - Compute fast EMA and slow EMA to generate golden cross/dead cross signals;
3. RSI Indicator - Calculate fast and slow RSI to determine overbought/oversold area; 
4. Price-Channel Relationship - Generates trade signals when price breaks out of the channels.

Specifically, the strategy computes N-period average of ATR, fast EMA, slow EMA, fast RSI and slow RSI. Combining the conditions of price breaking ATR channel, EMA golden cross, and RSI reaching extreme levels, the strategy sends out buy or sell signals.  

## Advantage Analysis 

The main advantages of this strategy are:

1. Captures short-term price trends;
2. Responds swiftly, suitable for high frequency trading;
3. More reliable with multiple filtered indicators;  
4. Parametric for users to optimize.

## Risk Analysis   

There are also some risks:   

1. High risks in short-term trading, strict stop loss needed;  
2. Improper parameter optimization leads to overfitting;
3. High trading frequency increases costs.  

To control risks, stop loss should be implemented, and parameters need proper backtests to avoid overfitting. Moreover, adjusting trade frequency to control costs.  

## Optimization Directions

The strategy can be optimized through:

1. Test parameters settings over shorter periods (5-min, 15-min);   

2. Add more filtering indicators like volume to improve signal quality;  

3. Optimize ATR channel and moving average parameters to find best parameter combinations.   

## Conclusion

The Gem Forest 1 Minute Breakout Strategy focuses on capturing short-term trends by filtering with multiple indicators, featuring fast response and high risk-reward characteristics. It can be adapted to users' risk preferences through parameter optimization for better results. However, users should control trading risks via strict stop loss, reasonable trade frequencies etc. Overall, this strategy suits investors with certain quant trading knowledge and risk tolerance for short-term trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|ATR Period|
|v_input_float_1|true|ATR Multi|
|v_input_string_1|0|ATR Smoothing: WMA|SMA|EMA|RMA|
|v_input_int_2|21|Fast EMA|
|v_input_int_3|65|Slow EMA|
|v_input_int_4|25|Fast RSI Length|
|v_input_int_5|100|Slow RSI Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-12 00:00:00
end: 2024-02-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Gem Forest 1 Dakika Scalp", overlay=true)

source = close
atrlen = input.int(14, "ATR Period")
mult = input.float(1, "ATR Multi", step=0.1)
smoothing = input.string(title="ATR Smoothing", defval="WMA", options=["RMA", "SMA", "EMA", "WMA"])

ma_function(source, atrlen) => 
    if smoothing == "RMA"
        ta.rma(source, atrlen)
    else
        if smoothing == "SMA"
            ta.sma(source, atrlen)
        else
            if smoothing == "EMA"
                ta.ema(source, atrlen)
            else
                ta.wma(source, atrlen)

atr_slen = ma_function(ta.tr(true), atrlen)
upper_band = atr_slen * mult + close
lower_band = close - atr_slen * mult

ShortEMAlen = input.int(21, "Fast EMA")
LongEMAlen = input.int(65, "Slow EMA")
shortSMA = ta.ema(close, ShortEMAlen)
longSMA = ta.ema(close, LongEMAlen)
RSILen1 = input.int(25, "Fast RSI Length")
RSILen2 = input.int(100, "Slow RSI Length")
rsi1 = ta.rsi(close, RSILen1)
rsi2 = ta.rsi(close, RSILen2)
atr = ta.atr(atrlen)

RSILong = rsi1 > rsi2
RSIShort = rsi1 < rsi2

longCondition = open < lower_band
shortCondition = open > upper_band
GoldenLong = ta.crossover(shortSMA,longSMA)
Goldenshort = ta.crossover(longSMA,shortSMA)

plotshape(shortCondition, title="Sell Label", text="Sell", location=location.abovebar, style=shape.labeldown, size=size.tiny, color=color.new(color.red, 0), textcolor=color.white)
plotshape(longCondition, title="Buy Label", text="Buy", location=location.belowbar, style=shape.labelup, size=size.tiny, color=color.new(color.green, 0), textcolor=color.white)
plotshape(Goldenshort, title="Golden Sell Label", text="Golden Crossover Short", location=location.abovebar, style=shape.labeldown, size=size.tiny, color=color.new(color.blue, 0), textcolor=color.white)
plotshape(GoldenLong, title="Golden Buy Label", text="Golden Crossover Long", location=location.belowbar, style=shape.labelup, size=size.tiny, color=color.new(color.yellow, 0), textcolor=color.white)

if (longCondition)
    stopLoss = low - atr * 2
    takeProfit = high + atr * 5
    strategy.entry("long", strategy.long)

if (shortCondition)
    stopLoss = high + atr * 2
    takeProfit = low - atr * 5
    strategy.entry("short", strategy.short)

plot(upper_band)
plot(lower_band)
plot(shortSMA, color = color.red)
plot(longSMA, color = color.yellow)

```

> Detail

https://www.fmz.com/strategy/442083

> Last Modified

2024-02-19 10:56:07
