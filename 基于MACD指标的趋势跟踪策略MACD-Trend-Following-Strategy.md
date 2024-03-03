
> Name

基于MACD指标的趋势跟踪策略MACD-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/96418c6ef2eed7422d.png)
[trans]


## 概述

该策略基于MACD指标实现趋势跟踪交易。策略利用MACD指标识别趋势方向,配合动态止损来锁定利润。

## 策略原理

1. 计算快线、慢线和MACD指标。快线采用12周期指数移动平均线,慢线采用26周期指数移动平均线。MACD 为快线和慢线的差值。

2. 设置买入线和卖出线。当MACD上穿买入线时生成买入信号;当MACD下穿卖出线时生成卖出信号。

3. 开仓后设置动态止损,跟踪止损线。止损线初始值为开仓价格的95%,随着价格运行止损线上移,来锁定利润。

4. 当触发止损或反向信号时平仓。

## 优势分析

1. 使用MACD指标识别趋势方向,可以有效跟踪趋势。

2. 动态止损机制可以持续锁定利润,避免亏损扩大。

3. 策略逻辑简单清晰,容易理解实现,适合量化交易的自动执行。

## 风险分析

1. MACD指标存在滞后,可能错过短期趋势反转。

2. 止损过于宽松可能错过部分利润,过于严格可能过早止损。

3. parameter tuning问题,MACD参数及买卖线需要不断测试优化。

4. 趋势行情中效果较好,震荡行情中存在亏损风险。

## 优化方向

1. 优化MACD参数,寻找最佳参数组合。

2. 测试不同的止损方式,比如点数止损、ATR止损等。

3. 增加过滤条件,利用其它指标避免误交易。例如布林带、RSI等。

4. 结合趋势判断指标,识别趋势和震荡行情,动态调整策略参数。

## 总结

该策略整体思路清晰,使用MACD指标跟踪趋势,并采用动态止损来锁定利润,可以有效跟踪趋势行情。但MACD指标存在滞后问题,止损点设置也需要优化。下一步将进一步测试参数设定,优化止损机制,并配合其它指标进行过滤,使策略更适合不同行情,提高策略的稳定性。

||


## Overview

This strategy implements trend following trading  on the MACD indicator. It identifies trend direction using MACD and with dynamic stop loss to lock in profits. 

## Strategy Logic

1. Calculate Fast MA, Slow MA and MACD indicator. Fast MA uses 12-period EMA, Slow MA uses 26-period EMA. MACD is the difference between Fast and Slow MA.

2. Set buy and sell lines. Generate buy signal when MACD crosses over buy line, generate sell signal when MACD crosses below sell line.

3. Set dynamic stop loss after opening position. The initial stop loss is set at 95% of entry price, and will trail upwards as price runs.

4. Close position when stop loss is triggered or reverse signal appears.

## Advantage Analysis 

1. Using MACD to identify trend direction can effectively track trends.

2. The dynamic stop loss can continuously lock in profits and avoid enlarged losses.

3. The strategy logic is simple and clear, easy to understand and automate for quant trading.

## Risk Analysis

1. MACD has lagging effect, may miss short term trend reversal.  

2. Stop loss set too loose may miss some profits, too tight may stop out early.

3. Parameter tuning issue. MACD parameters and buy/sell lines need constant testing and optimization.

4. Works better in trending market, may have losses in choppy market.

## Optimization Directions

1. Optimize MACD parameters to find best combination.

2. Test different stop loss methods, like fixed points, ATR-based etc.

3. Add filter conditions using other indicators to avoid false signals, e.g. Bollinger Bands, RSI etc. 

4. Combine with trend identification tools, dynamically adjust strategy parameters based on trend vs range-bound market.

## Summary

The strategy has clear logic of using MACD to track trends and dynamic stop loss to lock in profits. It can effectively track trending markets. But MACD has lagging issue, and stop loss points need to be optimized. Next step is to further test parameters, optimize stop loss mechanism, add filters with other indicators, to make it robust across different market conditions, improving stability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Fast moving average|
|v_input_2|26|Slow moving average|
|v_input_3|12|Fast Length|
|v_input_4|26|Slow Length|
|v_input_5_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|9|Signal Smoothing|
|v_input_7|false|Simple MA(Oscillator)|
|v_input_8|false|Simple MA(Signal Line)|
|v_input_9|-0.0002|Enter Long|
|v_input_10|0.0001|Close Long|
|v_input_11|0.05|Stop Loss %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-16 00:00:00
end: 2023-11-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(shorttitle = "EURUSD MACD", title = "EURUSD MACD")
fastMA = input(title="Fast moving average",  defval = 12, minval = 7)
slowMA = input(title="Slow moving average",  defval = 26, minval = 7)
lastColor = yellow
[currMacd,_,_] = macd(close[0], fastMA, slowMA, 9)
[prevMacd,_,_] = macd(close[1], fastMA, slowMA, 9)
plotColor = currMacd > 0 ? currMacd > prevMacd ? lime : green : currMacd < prevMacd ? maroon : red
plot(currMacd, style = histogram, color = plotColor, linewidth = 3)
plot(0, title = "Zero line", linewidth = 1, color = gray)

//MACD
// Getting inputs
fast_length = input(title="Fast Length",  defval=12)
slow_length = input(title="Slow Length",  defval=26)
src = input(title="Source",  defval=close)
signal_length = input(title="Signal Smoothing",  minval = 1, maxval = 50, defval =9)
sma_source = input(title="Simple MA(Oscillator)", type=bool, defval=false)
sma_signal = input(title="Simple MA(Signal Line)", type=bool, defval=false)

// Plot colors
col_grow_above = #26A69A
col_grow_below = #FFCDD2
col_fall_above = #B2DFDB
col_fall_below = #EF5350
col_macd = #0094ff
col_signal = #ff6a00

// Calculating
fast_ma = sma_source ? sma(src, fast_length) : ema(src, fast_length)
slow_ma = sma_source ? sma(src, slow_length) : ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal ? sma(macd, signal_length) : ema(macd, signal_length)
hist = macd - signal

//plot(hist, title="Histogram", style=columns, color=(hist>=0 ? (hist[1] < hist ? col_grow_above : col_fall_above) : (hist[1] < hist ? col_grow_below : col_fall_below) ), transp=0 )
plot(macd, title="MACD", color=col_macd, transp=0)
plot(signal, title="Signal", color=col_signal, transp=0)
///END OF MACD

//Long and Close Long Lines
linebuy = input(title="Enter Long", type=float, defval=-0.0002)
linesell = input(title="Close Long", type=float, defval=0.0001)

//Plot Long and Close Long Lines
plot(linebuy,color=green),plot(linesell,color=red)


//Stop Loss Input
sl_inp = input(0.05, title='Stop Loss %', type=float)/100


//Order Conditions
longCond = crossover(currMacd, linebuy)
exitLong = crossover(currMacd, linesell)
stop_level = strategy.position_avg_price * (1 - sl_inp)


//Order Entries
strategy.entry("long", strategy.long,  when=longCond==true)
strategy.close("long", when=exitLong==true)
strategy.exit("Stop Loss", stop=stop_level)
```

> Detail

https://www.fmz.com/strategy/432361

> Last Modified

2023-11-16 17:42:09
