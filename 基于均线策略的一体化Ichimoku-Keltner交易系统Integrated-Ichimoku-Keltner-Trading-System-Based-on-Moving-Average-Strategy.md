
> Name

基于均线策略的一体化Ichimoku-Keltner交易系统Integrated-Ichimoku-Keltner-Trading-System-Based-on-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1edef05f5fdcab865d6.png)
 [trans]

### 概述

本策略集成了均线策略、Ichimoku云图和Keltner通道技术指标,实现了趋势跟踪和突破交易,适用于高频算法交易。

### 策略原理

1. 使用Keltner通道判断股价是否超过通道上下轨,作为建仓信号
2. Ichimoku云图判断趋势方向,与Keltner通道配合使用
3. 均线策略发出平仓信号

### 优势分析

1. 集成多种技术指标,综合判断,提高决策准确性
2. Keltner通道判断超买超卖情况,避免建仓追高杀跌
3. Ichimoku云图判断大趋势,避免逆势交易
4. 均线策略过滤震荡,防止过于敏感

### 风险分析

1. 多指标集成,参数设置较复杂,需要仔细测试
2. 云图转换线和基准线交叉并不总是可靠的交易信号
3. Keltner通道需要调整参数,适应不同股票特点

### 优化方向

1. 评估服务器性能,适当缩短均线周期,提高交易频率
2. 测试不同股票对参数的敏感性,设定自适应参数
3. 增加止损策略,降低单笔损失

### 总结

本策略集成Ichimoku云图、Keltner通道和均线策略多种技术指标,实现了趋势跟踪和高效率突破交易。相比单一指标,本策略判断更加全面和准确,避免了一定的假信号。同时也存在参数设置较为复杂,需要针对个股优化的问题。总体而言,本策略适用于高频算法交易,效果显著。

||


## Overview

This strategy integrates moving average strategy, Ichimoku cloud charts and Keltner channel technical indicators to achieve trend following and breakthrough trading, which is suitable for high-frequency algorithmic trading.

## Strategy Principle 

1. Use Keltner channel to judge whether the stock price exceeds the upper and lower rails of the channel as a signal for opening positions
2. Ichimoku cloud charts judge the trend direction and use with Keltner channel
3. Moving average strategy sends closing signals

## Advantage Analysis

1. Integrate multiple technical indicators for comprehensive judgment to improve decision accuracy
2. Keltner channel judges overbought and oversold conditions to avoid chasing highs and killing lows when opening positions 
3. Ichimoku cloud charts judge major trends to avoid trading against the trend
4. Moving average strategy filters shocks and prevents excessive sensitivity

## Risk Analysis

1. The integration of multiple indicators makes parameter settings more complex and requires careful testing
2. The crossing of conversion line and baseline of cloud charts is not always a reliable trading signal
3. The Keltner channel needs to adjust parameters to adapt to the characteristics of different stocks

## Optimization Directions

1. Evaluate server performance and appropriately shorten moving average cycles to increase trading frequency
2. Test the sensitivity of different stocks to parameters and set adaptive parameters
3. Increase stop loss strategy to reduce single loss

## Summary

This strategy integrates Ichimoku cloud charts, Keltner channels and moving average strategies with multiple technical indicators to achieve trend tracking and efficient breakthrough trading. Compared with a single indicator, the judgment of this strategy is more comprehensive and accurate, avoiding certain false signals. At the same time, there are also problems that the parameter settings are more complex and need to be optimized for individual stocks. In general, this strategy is suitable for high-frequency algorithmic trading with significant effects.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|useTrueRange|
|v_input_2|18|length|
|v_input_3|1.8|mult|
|v_input_4|200|ATRlength|
|v_input_5|2.272|ATRMult|
|v_input_6|26|EMA Length|
|v_input_7_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_8|15|conversionPeriods|
|v_input_9|35|basePeriods|
|v_input_10|52|laggingSpan2Periods|
|v_input_11|26|displacement|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-19 00:00:00
end: 2023-12-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// Author: Persio Flexa
// Description: Ichimoku Clouds with Keltner Channel, perfect for margin trading 
strategy("Ichimoku Keltner Strategy", overlay=true) 

// -- Keltner ------------------------------------------------------------------
source = close

useTrueRange = input(true)
length = input(18, minval=1) 
mult = input(1.8)

ma = sma(source, length)
range = useTrueRange ? tr : high - low
rangema = sma(range, length)
upper = ma + rangema * mult
lower = ma - rangema * mult

plot(ma, title="BASE", color=orange,transp=85)
plot(upper, title="UPPER", color=red)
plot(lower, title="LOWER", color=green)

//crossUpper = crossover(source, upper)
//crossLower = crossunder(source, lower)
crossUpper = source > upper
crossLower = source  < lower

bprice = 0.0
bprice := crossUpper ? high+syminfo.mintick : nz(bprice[1])

sprice = 0.0
sprice := crossLower ? low -syminfo.mintick : nz(sprice[1]) 

crossBcond = false
crossBcond := crossUpper ? true 
 : na(crossBcond[1]) ? false : crossBcond[1]

crossScond = false
crossScond := crossLower ? true 
 : na(crossScond[1]) ? false : crossScond[1]

cancelBcond = crossBcond and (source < ma or high >= bprice )
cancelScond = crossScond and (source > ma or low <= sprice )

// ---------------------------------------------------------------------


// -- Ichimoku

ATRlength = input(200, minval=1)
ATRMult = input(2.272, minval=1)

ATR = rma(tr(true), ATRlength)

len = input(26, minval=1, title="EMA Length")
src = input(close, title="Source")
out = ema(src, len)

emaup = out+(ATR*ATRMult)
emadw = out-(ATR*ATRMult)

conversionPeriods = input(15, minval=1),
basePeriods = input(35, minval=1)
laggingSpan2Periods = input(52, minval=1),
displacement = input(26, minval=1)

donchian(len) => avg(lowest(len), highest(len))

conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)

p1 = plot(leadLine1, offset = displacement, color=green,transp=85, title="Lead 1")
p2 = plot(leadLine2, offset = displacement, color=red,transp=85, title="Lead 2")
fill(p1, p2,silver) 

longCond    = crossover(conversionLine, baseLine)
shortCond   = crossunder(conversionLine, baseLine)
// -------------------------------------------------------------------------

if (crossUpper and (conversionLine > baseLine))
    strategy.entry("long", strategy.long, stop=bprice, comment="LONG")

if (crossLower and (conversionLine < baseLine))
    strategy.entry("short", strategy.short, stop=sprice, comment="SHORT")
    
strategy.close("long", when = (shortCond and source < lower))
strategy.close("short", when = (longCond and source > upper))
```

> Detail

https://www.fmz.com/strategy/435950

> Last Modified

2023-12-20 13:40:08
