
> Name

基于日线收盘价比较的量化交易策略Quantitative-Trading-Strategy-Based-on-Daily-Close-Price-Comparison

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19495dc99fc35cec4d7.png)

[trans]

## 概述

本策略称为“日线收盘价比较策略”,是基于日线收盘价进行交易决策的量化策略。该策略通过计算当前日线收盘价和前一日线收盘价的差值,据此产生交易信号。当差值超过设定的阈值时,进行买入或卖出操作。

## 策略原理

该策略的核心逻辑是比较当前K线的收盘价和前一根K线的收盘价。 specifically:

1. 计算当前日线收盘价和前一日线收盘价的差值(today - yesterday)
2. 计算差值与前一日收盘价的比例(difference / yesterday's close)  
3. 如果比例大于设定的正阈值,则产生买入信号;如果比例小于设定的负阈值,则产生卖出信号
4. 根据信号进入做多或空仓部位

该策略没有设置止损和止盈条件,依赖阈值条件形成的交易信号进行入场和平仓。

## 优势分析

- 思路简单容易理解,适合量化交易的入门学习
- 仅基于日线收盘价交易,避免过于频繁交易
- 可通过调整阈值来控制交易频率

## 风险分析  

- 没有止损设置,无法控制单笔损失
- 可能会产生连续的交易信号导致过度交易
- 回撤可能较大,无法很好控制总体亏损 

## 优化方向

- 增加止损逻辑,控制单笔损失
- 增加开仓次数限制,避免过度交易
- 优化参数,寻找最佳交易频率

## 总结

本策略通过比较日线收盘价形成交易信号,思路简单,适合入门学习。但该策略存在一定风险,需要进一步优化以用于实盘交易。


||


## Overview

This strategy is called "Daily Close Price Comparison Strategy". It is a quantitative trading strategy that makes trading decisions based on daily close prices. The strategy generates trading signals by calculating the difference between the current daily close price and the previous daily close price. When the difference exceeds a set threshold, buy or sell orders are executed.

## Strategy Logic

The core logic of this strategy is to compare the close prices between the current candlestick/bar and the previous one. Specifically:

1. Calculate the difference between the current daily close price and the previous daily close price (today - yesterday)  
2. Calculate the ratio between the difference and yesterday's close price (difference / yesterday's close)
3. If the ratio is greater than the set positive threshold, a buy signal is generated. If the ratio is less than the set negative threshold, a sell signal is generated.  
4. Enter long or short positions according to the signals

The strategy does not set stop loss or take profit conditions, and relies on the threshold-triggered signals for entry and exit.

## Advantage Analysis 

- Simple logic, easy to understand, suitable for quant trading beginners
- Only relies on daily close prices, avoids over-frequent trading
- Trading frequency can be controlled by adjusting the threshold 

## Risk Analysis

- No stop loss, unable to control single trade loss
- May generate consecutive trading signals resulting in over trading  
- Drawdown may be large, cannot control overall loss well

## Optimization Directions

- Add stop loss logic to control single trade loss
- Limit number of entries to avoid over trading
- Optimize parameters to find optimal trading frequency  

## Conclusion

This strategy generates trading signals by comparing daily close prices. The logic is simple and suitable for beginners to learn. But it contains certain risks and needs further optimization for live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Price Difference Threshold correct results|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-14 00:00:00
end: 2023-11-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Daily Close Comparison Strategy (by ChartArt) correct results", shorttitle="CA_-_Daily_Close_Strat", overlay=false)

// ChartArt's Daily Close Comparison Strategy
//
// Version 1.0
// Idea by ChartArt on February 28, 2016.
//
// This strategy is equal to the very
// popular "ANN Strategy" coded by sirolf2009,
// but without the Artificial Neural Network (ANN).
//
// Main difference besides stripping out the ANN
// is that I use close prices instead of OHLC4 prices.
// And the default threshold is set to 0 instead of 0.0014
// with a step of 0.001 instead of 0.0001.
//
// This strategy goes long if the close of the current day
// is larger than the close price of the last day.
// If the inverse logic is true, the strategy
// goes short (last close larger current close).
//
// This simple strategy does not have any
// stop loss or take profit money management logic.
//
// List of my work: 
// https://www.tradingview.com/u/ChartArt/
// 
//  __             __  ___       __  ___ 
// /  ` |__|  /\  |__)  |   /\  |__)  |  
// \__, |  | /~~\ |  \  |  /~~\ |  \  |  
// 
// 

threshold = input(title="Price Difference Threshold correct results", type=float, defval=0, step=0.004)

getDiff() =>
    yesterday=request.security(syminfo.tickerid, 'D', close[1])
    today=close
    delta=today-yesterday
    percentage=delta/yesterday
    
closeDiff = getDiff()
 
buying = closeDiff > threshold ? true : closeDiff < -threshold ? false : buying[1]

hline(0, title="zero line")

bgcolor(buying ? green : red, transp=25)
plot(closeDiff, color=silver, style=area, transp=75)
plot(closeDiff, color=aqua, title="prediction")

longCondition = buying
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = buying != true
if (shortCondition)
    strategy.entry("Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/432782

> Last Modified

2023-11-21 14:34:11
