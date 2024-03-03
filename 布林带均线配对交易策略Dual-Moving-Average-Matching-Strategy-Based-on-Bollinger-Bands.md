
> Name

布林带均线配对交易策略Dual-Moving-Average-Matching-Strategy-Based-on-Bollinger-Bands

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/133d67602c6573b6335.png)

[trans]

### 概述

布林带均线配对交易策略是一种随市量价运行的趋势追踪策略。它利用布林带和移动均线的交叉作为交易信号,实现了一种可以自动识别市场趋势,并配合止盈止损规则进行交易的量化策略。

### 策略原理

该策略主要基于布林带指标和移动均线指标的交叉信号进行交易。具体来说,它同时使用了布林带中轨、布林带上轨、以及长度为5到200天的7条移动平均线。当价格从下向上突破布林带中轨和下轨时产生买入信号;当价格从上向下跌破布林带上轨时产生卖出信号,实现了趋势追踪。

此外,策略还引入了moveToFract的多空判断指标。该指标通过计算短期和长期移动平均线顺序排列的情况,判断目前市场走势是向上还是向下,从而避免在震荡行情中产生错误信号。最后,结合可配置的止盈止损规则,形成了一个较为完整的趋势追踪交易策略。

### 优势分析

1. 配置灵活,可以自定义参数组合,适应不同市场环境
2. 结合两种不同指标作为过滤,可以减少错误信号
3. 趋势判断指标可避免震荡市做反向操作
4. 跟踪止损设定让利润最大化

### 风险分析

1. 须适当调整参数,以符合不同周期以避免过度交易
2. 追踪止损在快速下跌中可能扩大损失
3. 须确保资金充足,否则无法承受连续亏损的风险

### 优化方向  

1. 加入黄金交叉、死叉的判断,可进一步优化
2. 不同品种参数不一,可考虑机器学习训练最佳参数
3. 结合波动率指数,判断趋势震荡加强风控

### 总结

本策略总体来说是一个非常实用的趋势追踪策略。它利用指标交叉进行决策,又加入了趋势判断模块,可以有效滤除错误信号。配置止盈止损后,可以充分跟踪趋势进行交易,获得较好收益。通过调整参数组合和加入更多滤波器,该策略可以进一步优化,适应更多市场环境,具有很大的改进空间和应用前景。

|| 

## Overview  

The dual moving average matching strategy based on Bollinger Bands is a trend-following strategy that runs with price and volume in the market. It uses the crossover of Bollinger Bands and moving averages as trading signals to implement a quantitative strategy that can automatically identify market trends and trade with stop profit and stop loss rules.

## Strategy Principle

This strategy is mainly based on the crossover signals of the Bollinger Bands indicator and the moving average indicator for trading. Specifically, it uses the middle rail, upper rail of Bollinger Bands, and 7 moving averages with lengths from 5 to 200 days at the same time. It generates a buy signal when the price breaks through the middle and lower rails of the Bollinger Bands from bottom to top; it generates a sell signal when the price breaks through the upper rail of the Bollinger Bands from top to bottom to achieve trend following.

In addition, the strategy also introduces the moveToFract indicator for judging long and short positions. This indicator determines whether the current market trend is up or down by calculating the order of arrangement of short-term and long-term moving averages, thus avoiding generating wrong signals in range-bound markets. Finally, combined with configurable stop profit and stop loss rules, it forms a more complete trend following trading strategy.

## Advantage Analysis  

1. Flexible configuration that can customize parameter combinations to suit different market environments
2. Combining two different indicators as filters can reduce erroneous signals  
3. Trend judging indicator can avoid reverse operations in volatile markets
4. Tracking stop loss setting maximizes profits

## Risk Analysis

1. Parameters should be adjusted appropriately to suit cycles of different timeframes to avoid over-trading
2. Tracking stop loss may expand losses in a fast decline  
3. Must ensure sufficient funds, otherwise unable to withstand the risk of continuous losses

## Optimization Directions

1. Add golden cross and death cross judgments to further optimize
2. Different varieties have different parameters, consider machine learning for optimal parameters  
3. Combine with volatility index to determine trend volatility and strengthen risk control


## Conclusion  

In general, this is a very practical trend following strategy. It uses indicator crossover for decision making, and also incorporates a trend judging module to effectively filter out wrong signals. After configuring stop profit and stop loss, it can fully follow trends for trading and obtain good returns. By adjusting parameter combinations and adding more filters, this strategy can be further optimized to adapt to more market environments, and has great room for improvement and application prospects.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Moving Average Type: sma|ema|hma|rma|vwma|wma|
|v_input_2|0|Exit Strategy: Signal|TrailingStop|Both|
|v_input_3|30|LookbackPeriod|
|v_input_4|2|BBStdDev|
|v_input_5|60|BBLength|
|v_input_6|22|atrLength|
|v_input_7|6|atrMult|
|v_input_8|0|Trade Direction: strategy.direction.all|strategy.direction.long|strategy.direction.short|
|v_input_9|10|backtestYears|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-24 00:00:00
end: 2023-11-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © HeWhoMustNotBeNamed

//@version=4
strategy("BuyTheDip", overlay=true, initial_capital = 100000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type = strategy.commission.percent, pyramiding = 1, commission_value = 0.01, calc_on_order_fills = true)

MAType = input(title="Moving Average Type", defval="sma", options=["ema", "sma", "hma", "rma", "vwma", "wma"])
exitType = input(title="Exit Strategy", defval="Signal", options=["Signal", "TrailingStop", "Both"])
LookbackPeriod = input(30, minval=10,step=10)

BBStdDev = input(2, minval=1, maxval=10, step=0.5)
BBLength = input(60, minval=5, step=5)

atrLength = input(22)
atrMult = input(6)

tradeDirection = input(title="Trade Direction", defval=strategy.direction.all, options=[strategy.direction.all, strategy.direction.long, strategy.direction.short])
backtestYears = input(10, minval=1, step=1)
includePartiallyAligned = true
f_getMovingAverage(source, MAType, length)=>
    ma = sma(source, length)
    if(MAType == "ema")
        ma := ema(source,length)
    if(MAType == "hma")
        ma := hma(source,length)
    if(MAType == "rma")
        ma := rma(source,length)
    if(MAType == "vwma")
        ma := vwma(source,length)
    if(MAType == "wma")
        ma := wma(source,length)
    ma

f_getTrailingStop(atr, atrMult)=>
    stop = close - atrMult*atr
    stop := strategy.position_size > 0 ? max(stop, stop[1]) : stop
    stop

f_getMaAlignment(MAType, includePartiallyAligned)=>
    ma5 = f_getMovingAverage(close,MAType,5)
    ma10 = f_getMovingAverage(close,MAType,10)
    ma20 = f_getMovingAverage(close,MAType,20)
    ma30 = f_getMovingAverage(close,MAType,30)
    ma50 = f_getMovingAverage(close,MAType,50)
    ma100 = f_getMovingAverage(close,MAType,100)
    ma200 = f_getMovingAverage(close,MAType,200)

    upwardScore = 0
    upwardScore := close > ma5? upwardScore+1:upwardScore
    upwardScore := ma5 > ma10? upwardScore+1:upwardScore
    upwardScore := ma10 > ma20? upwardScore+1:upwardScore
    upwardScore := ma20 > ma30? upwardScore+1:upwardScore
    upwardScore := ma30 > ma50? upwardScore+1:upwardScore
    upwardScore := ma50 > ma100? upwardScore+1:upwardScore
    upwardScore := ma100 > ma200? upwardScore+1:upwardScore
    
    upwards = close > ma5 and ma5 > ma10 and ma10 > ma20 and ma20 > ma30 and ma30 > ma50 and ma50 > ma100 and ma100 > ma200
    downwards = close < ma5 and ma5 < ma10 and ma10 < ma20 and ma20 < ma30 and ma30 < ma50 and ma50 < ma100 and ma100 < ma200
    upwards?1:downwards?-1:includePartiallyAligned ? (upwardScore > 5? 0.5: upwardScore < 2?-0.5:upwardScore>3?0.25:-0.25) : 0
    
inDateRange = time >= timestamp(syminfo.timezone, year(timenow) - backtestYears, 01, 01, 0, 0)

exitBySignal = exitType == "Signal" or exitType == "Both"
exitByTrailingStop = exitType == "TrailingStop" or exitType == "Both"
maAlignment = f_getMaAlignment(MAType,includePartiallyAligned)
atr = atr(atrLength)

trailingStop = f_getTrailingStop(atr, atrMult)
maAligned = highest(maAlignment,LookbackPeriod)
[middle, upper, lower] = bb(close, BBLength, BBStdDev)

buyCondition = maAligned == 1 and (crossover(close, lower) or crossover(close, middle))
buyExitCondition = crossunder(close, upper)

strategy.entry("Buy", strategy.long, when=buyCondition and inDateRange, oca_name="oca_buy")
strategy.close("Buy", when=buyExitCondition and exitBySignal)
strategy.exit("ExitBuy", "Buy", stop = trailingStop, when=exitByTrailingStop )



```

> Detail

https://www.fmz.com/strategy/433119

> Last Modified

2023-11-24 15:32:57
