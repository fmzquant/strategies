
> Name

双K线预测闭合策略Dual-Candlestick-Prediction-Close-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c0255ff8649abe9773.png)
[trans]

## 概述

本策略的目的是预测下一个15分钟K线的收盘价,方法是分析过去两个30分钟K线的开盘价和收盘价。根据趋势判断未来15分钟K线是会继续向上、向下或盘整。

## 策略原理

本策略的核心逻辑在predictNextCandleClose函数。该函数接受前两个30分钟K线的开盘价和收盘价作为输入参数。

如果最后一个30分钟K线收盘价高于开盘价,则判断为多头趋势;如果低于开盘价,则为空头趋势。如果倒数第二个30分钟K线也显示同样的多空趋势,则认为趋势较强,预测下一个15分钟K线也会延续该趋势。

具体来说,如果最近两个30分钟K线都收阳(收盘价高于开盘价),那么预测下一个15分钟K线的收盘价会比当前K线收盘价高出最后一个30分钟K线收盘价与开盘价的差值。

如果最近两个30分钟K线都收阴(收盘价低于开盘价),那么预测下一个15分钟K线的收盘价会比当前K线收盘价低出最后一个30分钟K线开盘价与收盘价的差值。

如果最近两个30分钟K线一个阴一个阳,则说明无明确趋势,此时预测下一个15分钟K线的收盘价会与最后一个30分钟K线的收盘价相同。

这样可以利用过去K线信息判断未来短期的价格走势,作为交易决策的参考。

## 优势分析

这种双K线预测策略具有以下优势:

1. 简单直观,容易理解实现,适合量化交易的初学者

2. 利用双K线判断趋势,可以过滤掉部分噪音,提高判断的准确性

3. 15分钟级别预测,时间跨度短,有利于及时调整仓位

4. 结合当前价格与预测价格进行交易信号判断,可以快速响应突发事件

5. 无需大量历史数据,降低数据量要求,适用于数据不完整或实盘的情况

## 风险分析

但该策略也存在一些风险:  

1. 仅考虑开盘价和收盘价,缺乏更多K线细节作为辅助判断,可能漏掉重要信号

2. 双K线间隔较长,无法即时响应短期价格波动,存在时间滞后

3. 预测仅基于历史数据,无法判断重大突发事件的影响,风险较大

4. 多空判断规则较简单,容易产生错误信号,信号质量有待提高

5. 实盘数据常出现跳空或缺口,也会干扰判断逻辑的准确性

## 优化方向  

考虑到上述风险,该策略可以从以下几个方面进行优化:

1. 增加更多辅助判断指标,如MACD,KD等,提高预测准确性

2. 结合更多K线细节,如影线、实体等判断价位临界点,完善多空规则

3. 加大样本量,扩大判断K线的时间范围,避免被短期噪音干扰  

4. 增加止损策略,利用移动止损、时间止损等手段控制单笔损失

5. 优化开仓规则,只在趋势较明朗时开仓,避免不确定市场的反复

6. 实盘校验,修正不匹配实盘的逻辑,使策略参数更贴近真实市场

## 总结

本策略通过分析双K线的开收价信息判断未来短期趋势,并据此产生交易信号,属于基于历史数据的预测性策略。该策略简单易用,适合量化交易初学者,但也存在判断规则较单一、信号质量有限等问题。我们可以从辅助指标、K线细节、止损策略等方面进行多维度的优化,使策略的实战效果更佳。总体而言,双K线预测策略为我们提供了一个值得优化迭代的基础方案。

||

## Overview

The purpose of this strategy is to predict the close price of the next 15-minute candlestick by analyzing the open and close prices of the past two 30-minute candlesticks. It judges whether the trend of the next 15-minute candlestick will continue going up, down or sideways based on the trend.

## Strategy Principle  

The core logic of this strategy lies in the predictNextCandleClose function. This function takes the open and close prices of the previous two 30-minute candlesticks as input parameters.

If the close price of the last 30-minute candlestick is higher than the open price, it is judged as a bullish trend. If the close price is lower than the open price, it is judged as a bearish trend. If the second last 30-minute candlestick also shows the same bullish or bearish trend, it is considered that the trend is stronger and the next 15-minute candlestick will likely continue the trend.   

Specifically, if both of the most recent two 30-minute candlesticks are bullish (close price higher than open price), the predicted close price of the next 15-minute candlestick will be higher than the current candlestick's close price by the difference between the last 30-minute candlestick's close price and open price.  

If both of the most recent two 30-minute candlesticks are bearish (close price lower than open price), the predicted close price of the next 15-minute candlestick will be lower than the current candlestick's close price by the difference between the last 30-minute candlestick's open price and close price.

If one of the most recent two 30-minute candlesticks is bullish and the other is bearish, it indicates there is no clear trend, and in this case the predicted close price of the next 15-minute candlestick will be the same as the close price of the last 30-minute candlestick.   

In this way, it predicts the short-term price movement in the future based on past candlestick information, serving as a reference for trading decisions.

## Advantage Analysis   

This dual candlestick prediction strategy has the following advantages:

1. It is simple, intuitive and easy to understand and implement, suitable for quant trading beginners.  

2. By judging the trend using dual candlesticks, it can filter out some noise and improve the accuracy.   

3. The 15-minute level prediction has a short time span, which helps adjust positions in a timely manner.  

4. Combined with current price and predicted price to determine trading signals, it can respond quickly to unexpected events. 

5. It requires less historical data, reducing data needs and making it suitable for incomplete data or live trading scenarios.

## Risk Analysis   

However, there are also some risks with this strategy:   

1. It only considers open and close prices, lacking more candlestick details as auxiliary judgement, thus may miss important signals.

2. The interval between the two candlesticks is long, unable to respond timely to short-term price fluctuations, posing time lag risks.  

3. The prediction relies solely on historical data, unable to judge the impact of significant unexpected events, with higher risks.

4. The bullish/bearish rules are quite simple, prone to generating false signals and the signal quality needs improvement.  

5. Real trading data often has gaps, which could also interfere with the accuracy of the judgement logic.

## Optimization Directions   

In light of the above risks, the strategy can be optimized from the following aspects:

1. Add more auxiliary indicators like MACD, KD etc to improve prediction accuracy.  

2. Combine more candlestick details like shadows, real body etc to determine critical price levels and refine bullish/bearish rules.   

3. Increase sample size, expand the time range of judgement candlesticks to avoid interference from short-term noises.   

4. Add stop loss mechanisms like moving stop loss, timed stop loss etc to control single trade loss.

5. Optimize entry rules to only open positions when the trend is clear, avoiding uncertain market fluctuations.  

6. Backtest with real trading data, modify logic that does not match actual price moves to make the strategy parameters closer to the real market.

## Conclusion   

This strategy predicts short-term trends by analyzing the open and close prices of dual candlesticks, and generates trading signals based on it. It belongs to predictive strategies based on historical data. The strategy is simple and easy to use, suitable for quant trading beginners, but also has risks like relatively simple judgement rules and limited signal quality. We can optimize it in aspects like auxiliary indicators, candlestick details, stop loss mechanisms etc to improve practical performance. In summary, the dual candlestick prediction strategy provides us with a basic scheme worth optimizing and iterating on.  

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-19 00:00:00
end: 2024-01-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Sosawolf

//@version=5
strategy("Predict Next Candle Close Strategy", overlay=true)

// Function to predict next candle close based on previous two candles
predictNextCandleClose(open1, close1, open2, close2) =>
    if close1 > open1 and close2 > open2
        // Bullish trend, predict next candle close to be bullish
        close1 + (close1 - open1)
    else if close1 < open1 and close2 < open2
        // Bearish trend, predict next candle close to be bearish
        close1 - (open1 - close1)
    else
        // Indecisive or ranging market, predict next candle close to be neutral
        close1

// Get previous two 30-minute candles' open and close prices
open1 = request.security(syminfo.tickerid, "30", open[1])
close1 = request.security(syminfo.tickerid, "30", close[1])
open2 = request.security(syminfo.tickerid, "30", open[2])
close2 = request.security(syminfo.tickerid, "30", close[2])

// Predict next 15-minute candle close
predictedClose = predictNextCandleClose(open1, close1, open2, close2)

// Plot the predicted close as a line
plot(predictedClose, color=color.blue, linewidth=2, title="Predicted Close")

// Buy condition: Predicted close is higher than the current close
buyCondition = predictedClose > close
strategy.entry("Buy", strategy.long, when=buyCondition)

// Sell condition: Predicted close is lower than the current close
sellCondition = predictedClose < close
strategy.entry("Sell", strategy.short, when=sellCondition)

```

> Detail

https://www.fmz.com/strategy/440056

> Last Modified

2024-01-26 10:58:03
