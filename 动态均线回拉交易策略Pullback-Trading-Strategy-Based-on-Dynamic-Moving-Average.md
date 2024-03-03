
> Name

动态均线回拉交易策略Pullback-Trading-Strategy-Based-on-Dynamic-Moving-Average

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/753c60999f268f8a11.png)
[trans]
## 概述

本策略运用双均线系统,在特定的股票或数字货币中寻找潜在的突破机会。其基本原理是当短期均线从长期均线下方反弹时,买入股票或数字货币。当价格重新测试长期均线时,卖出股票或数字货币。

## 策略原理  

该策略使用两个不同周期的简单移动平均线(SMA)作为交易信号。第一个SMA周期较长,代表整体趋势方向。第二个SMA周期较短,用于捕捉短期价格波动。

当短期SMA从下方上穿长期SMA时,代表价格在整体上涨趋势中,因此策略打开多头仓位。当价格下跌重新测试长期SMA时,预示着短期 pullback 结束,这时策略会考虑止损或利润了结仓位。

另外,策略还设定了“超卖”和“超买”条件,避免在极端情况下交易。只有同时满足双均线交叉和合理估值条件时,才会开仓。

## 策略优势

- 利用双均线系统,能有效识别中短期趋势
- 结合了趋势跟踪和回调交易的优点
- 内置“超卖”和“超买”条件,可减少不必要的交易

## 风险分析

- 回调结束的时机判断难度大,可能预判失误止损
- 趋势变化时,无法快速止损,可能承受较大亏损
- 参数设置不当可能导致过于频繁或保守交易

## 策略优化

该策略还有进一步优化的空间:

1. 利用更复杂的工具判断价格波动和趋势,如布林带、KD指标等
2. 结合更多因素判断回调结束时机,如交易量变化、波动率等
3. 动态调整头寸规模,让利润最大化
4. 优化止损逻辑,利用KAMA、Ichimoku 云和更低时间帧判断止损时机

## 总结

本策略整合趋势跟踪与回调交易的优势,利用双均线系统来判断机会的出现。同时,内置一定的超买超卖条件,可避免不必要的头寸打开。这是一个非常实用的量化交易策略,值得深入研究与优化。

||

## Overview  

This strategy employs a dual moving average system to identify potential breakout opportunities in selected stocks or cryptocurrencies. The core principle is to buy when the shorter-term moving average bounces back from below the longer-term moving average and sell when prices retest the longer-term moving average.

## Strategy Logic

The strategy utilizes two simple moving averages (SMA) with different periods as trading signals. The first SMA has a longer period to represent the overall trend direction. The second SMA has a shorter period to capture short-term price fluctuations.  

When the shorter-term SMA crosses above the longer-term SMA from below, it signals an uptrend in prices overall hence the strategy opens a long position. When prices pull back down to retest the longer-term SMA, it indicates the short-term pullback has ended and the strategy considers stopping out or taking profit on the position.

In addition, the strategy has “oversold” and “overbought” conditions to avoid trading in extreme situations. It only opens positions when both SMA crossover and reasonable valuation criteria are met.

## Advantages

- Dual moving average system effectively identifies medium-term trends  
- Combines the merits of trend following and pullback trading
- Embedded oversold and overbought conditions reduce unnecessary trades

## Risk Analysis 

- Difficult to determine precise pullback end timing, may stop out prematurely
- Unable to quickly cut losses when trend changes, could suffer large drawdowns
- Poor parameter tuning may result in over-trading or conservative trading

## Optimization Directions

There is further room to optimize this strategy:

1. Utilize more advanced technical indicators like Bollinger Bands and KD to gauge price waves and trends
2. Incorporate more factors like volume change, volatility to determine pullback completion  
3. Dynamically size positions to maximize profit potential
4. Optimize stop loss logic with KAMA, Ichimoku clouds and lower timeframe signals  

## Conclusion

This strategy combines the strengths of trend following and pullback trading using a dual moving average system to detect opportunities. At the same time, embedded overbought/oversold conditions avoid unnecessary position opening. It is a very practical quant trading strategy worth deeper research and optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|280|(?Moving Avg. Parameters)MA length 1|
|v_input_int_2|13|MA length 2|
|v_input_float_1|0.07|Stop Loss (%)|
|v_input_float_2|0.27|(?Too Deep and Thin conditions)Too Deep (%)|
|v_input_float_3|0.03|Too Thin (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-20 00:00:00
end: 2024-02-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=5
strategy("Profitable Pullback Trading Strategy", overlay=true,initial_capital=1000, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// Inputs
ma_length1 = input.int(280,'MA length 1', step = 10,group = 'Moving Avg. Parameters', inline = 'MA')
ma_length2 = input.int(13,'MA length 2', step = 1,group = 'Moving Avg. Parameters', inline = 'MA')
sl = input.float(title="Stop Loss (%)", defval=0.07, step=0.1, group="Moving Avg. Parameters")
too_deep    = input.float(title="Too Deep (%)", defval=0.27, step=0.01, group="Too Deep and Thin conditions", inline = 'Too')
too_thin    = input.float(title="Too Thin (%)", defval=0.03, step=0.01, group="Too Deep and Thin conditions", inline = 'Too')

// Calculations
ma1 = ta.sma(close,ma_length1)
ma2 = ta.sma(close,ma_length2)
too_deep2   = (ma2/ma1-1) < too_deep
too_thin2   = (ma2/ma1-1) > too_thin

// Entry and close condtions
var float buy_price = 0
buy_condition = (close > ma1) and (close < ma2) and strategy.position_size == 0 and too_deep2 and too_thin2
close_condition1  = (close > ma2) and strategy.position_size > 0 and (close < low[1])
stop_distance = strategy.position_size > 0 ? ((buy_price - close) / close) : na
close_condition2 = strategy.position_size > 0 and stop_distance > sl
stop_price = strategy.position_size > 0 ? buy_price - (buy_price * sl) : na

// Entry and close orders
if buy_condition
    strategy.entry('Long',strategy.long)
if buy_condition[1]
    buy_price := open
if close_condition1 or close_condition2
    strategy.close('Long',comment="Exit" + (close_condition2 ? "SL=true" : ""))
    buy_price := na

plot(ma1,color = color.blue)
plot(ma2,color = color.orange)


```

> Detail

https://www.fmz.com/strategy/442929

> Last Modified

2024-02-27 14:38:45
