
> Name

ATR趋势追踪策略ATR-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略基于平均真实波幅指标ATR来判断趋势方向,在趋势上涨时做多,在趋势下跌时做空,属于趋势跟踪类型的策略。

## 策略原理

该策略首先计算价格的简单移动平均线sma和指数移动平均线ema。然后计算ATR指标,即过去N天的平均波动范围。 

策略通过ema平均线、上轨(ema + ATR * 系数)和下轨(ema - ATR * 系数)来判断趋势方向。当价格上穿上轨时,做多;当价格下穿下轨时,做空。

代码主要逻辑:

1. 计算价格sma和ema平均线
2. 计算ATR平均波动范围
3. 计算上轨线和下轨线
4. 判断做多信号:价格上穿上轨线
5. 判断做空信号:价格下穿下轨线
6. 设置止损平仓:价格下穿上轨线平多单;价格上穿下轨线平空单

通过ATR动态调整仓位,能够有效跟踪趋势 Directions。

## 策略优势

1. 使用ATR指标判断趋势方向,能够有效捕捉价格趋势
2. 基于平均线设置止损,能够合理控制风险
3. 策略逻辑简单清晰,容易理解实现
4. 可配置参数灵活,适用于不同市场环境

## 策略风险

1. 大幅震荡市场下,ATR指标将失效
2. 参数设置不当可能造成过于频繁开仓
3. 突发事件造成急促反转时,止损可能无效
4. 交易费用较高的市场,跟踪 Setting 需要调整

解决方法:
1. 大幅震荡市场下,宜暂停策略,或采用其他指标
2. 优化参数,降低开仓频率
3. 针对重要数据事件,提高止损比率
4. 根据具体品种,调整ATR取值范围

## 策略优化方向

1. 结合趋势指标优化参数,如加入MACD判定趋势
2. 增加过滤器,如布林带判定入场
3. 优化止损方式,如移动止损或离场指标
4. 针对特定品种优化ATR取值范围
5. 增加资金管理策略,如固定份额等
6. 结合机器学习方法动态优化参数

## 总结

该ATR趋势追踪策略整体思路清晰,通过ATR指标判断趋势方向,属于典型的趋势跟踪策略。策略优点是简单易操作,能够有效跟踪趋势;但也存在一定风险,需要针对不同市场环境进行优化调整,才能发挥策略的最大效用。总体来说,该策略作为一种量化交易工具还具有很大的拓展空间和运用价值。

||


## Overview

This strategy uses the Average True Range (ATR) indicator to determine the trend direction. It goes long when the trend goes up and goes short when the trend goes down. It belongs to the trend following strategy type.  

## Strategy Logic

The strategy first calculates the simple moving average (sma) and exponential moving average (ema) of the price. Then it calculates the ATR indicator, which is the average range of price movement over the past N days.

The strategy uses the ema average line, upper band (ema + ATR * coefficient) and lower band (ema - ATR * coefficient) to determine the trend direction. It goes long when the price breaks above the upper band, and goes short when the price breaks below the lower band.

Main logic in the code:

1. Calculate price sma and ema averages  
2. Calculate ATR average range
3. Calculate upper and lower bands
4. Determine long signal: price breaks above upper band
5. Determine short signal: price breaks below lower band 
6. Set stop loss to close positions: price breaks below upper band to close longs; price breaks above lower band to close shorts.

By dynamically adjusting positions based on ATR, it can effectively follow trend directions.

## Advantages

1. Using ATR to determine trend direction can effectively capture price trends
2. Stop loss based on moving averages can reasonably control risks  
3. Simple and clear strategy logic, easy to understand and implement
4. Flexible configurable parameters, adaptable to different market environments

## Risks

1. ATR indicator will fail in highly volatile sideways markets
2. Improper parameter settings may cause too frequent trading
3. Sudden reversals can make stop loss invalid  
4. Higher trading costs require adjustment for tracking settings

Solutions:
1. Pause strategy or use other indicators in high volatility
2. Optimize parameters to reduce trading frequency
3. Increase stop loss ratio for major data events
4. Adjust ATR range based on specific products  

## Improvement Directions

1. Combine with trend indicators to optimize parameters, e.g. add MACD for trend  
2. Add filters like Bollinger Bands for entry
3. Optimize stop loss methods, like trailing stop or exit indicators
4. Optimize ATR range based on specific products
5. Add risk management like fixed fractional position sizing  
6. Dynamically optimize parameters using machine learning

## Summary

The ATR trend following strategy has clear logic to determine trend direction using ATR. It is a typical trend following system. The advantages are simplicity and ability to follow trends. But it also has risks that require optimizations for different markets. Overall, it has great potential and value as a quantitative trading tool.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|26|Length|
|v_input_2|2.618|Length|
|v_input_3|2.386|Length|
|v_input_4|8|From Month|
|v_input_5|18|From Day|
|v_input_6|2008|From Year|
|v_input_7|true|To Month|
|v_input_8|true|To Day|
|v_input_9|2020|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-28 00:00:00
end: 2023-09-27 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Investoz

//@version=4
strategy("ATR Strategy FOREX", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

len = input(26, type=input.integer, minval=1, title="Length")
mul = input(2.618, type=input.float, minval=0, title="Length")
mullow = input(2.386, type=input.float, minval=0, title="Length")

price = sma(close, 1)
average = ema(close, len)
diff = atr(len) * mul
difflow = atr(len) * mullow

bull_level = average + diff
bear_level = average - difflow
bull_cross = crossunder(price, bear_level)
bear_cross = crossunder(bull_level, price)

FromMonth = input(defval = 8, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 18, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2008, title = "From Year", minval = 2008)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 2020, title = "To Year", minval = 2019)

start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)       
startTimeOk()  => true

if (startTimeOk()) and ema(close,1) > ema(close,528)
    strategy.entry("KOP", strategy.long, when=bull_cross) 
    strategy.close("KOP", when=bear_cross)  
if (startTimeOk()) and ema(close,1) < ema(close,528)
   strategy.entry("SALJ", strategy.short, when=bear_cross) 
   strategy.close("SALJ", when=bull_cross)

plot(price, title="price", color=color.black, transp=50, linewidth=2)
a0 = plot(average, title="average", color=color.red, transp=50, linewidth=1)
a1 = plot(bull_level, title="bull", color=color.green, transp=50, linewidth=1)
a2 = plot(bear_level, title="bear", color=color.red, transp=50, linewidth=1)
fill(a0, a1, color=color.green, transp=97)
fill(a0, a2, color=color.red, transp=97)
```

> Detail

https://www.fmz.com/strategy/428064

> Last Modified

2023-09-28 11:32:09
