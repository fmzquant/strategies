
> Name

基于价格行为的机构交易策略Institutional-Trader-Strategy-Based-on-Price-Action

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/134c2b1a163d884534a.png)
[trans]
## 概述

本策略名为“基于价格行为的机构交易策略”。它attempts to利用机构交易者的某些交易模式,特别是他们倾向于在特定“订单区块”附近下单的倾向。 该策略结合了公平价值、流动性和价格行为的元素,以确定进入和退出市场的时机。

## 策略原理

该策略的核心是识别“订单区块”- 即过去发生过大量机构交易活动的价格区域。 这些区域与显著的流动性相关。订单区块是使用价格结构确定的,通常与关键的技术价格水平相关。 

公平价值被定义为基于移动平均线等指标的工具的“合理”价格。当当前价格远离公平价值时,这被视为市场失衡的信号。

流动性也是一个关键因素,因为机构交易者倾向于在高流动性区域执行交易。

该策略通过计算简单移动平均线来确定公平价值。然后它识别长度为20个周期的潜在订单区块。 如果关闭价格与公平价值之间的差距低于订单区块总高度的38.2%,则确定订单区块。

多头订单区块被认为是买入信号。空头订单区块被视为卖出信号。

## 优势分析

该策略的主要优势是利用了机构交易者的交易模式,这可能使其超越基于更机械化指标的策略。通过关注订单流和价值区域,它结合了几种不同类型的分析。

其他优势包括:

- 利用流动性获取较优执行
- 依赖易于可视化和理解的概念如订单流
- 容易在图表上可视化订单区块
- 有灵活性调整参数如区块长度

## 风险分析

该策略也面临一些潜在的风险,比如:

- 依赖对过去价格行为的判断
- 在没有订单流的市场中可能无法正常运行
- 可能会产生虚假信号
- 可能会错过短期趋势

为了缓解这些风险,建议考虑:

- 结合其他指标过滤虚假信号
- 调整参数如区块长度
- 对交易发出的信号进行过滤

## 优化方向

以下是本策略的一些潜在优化:

1. 测试并优化关键参数值如区块长度和公平价偏差百分比。
2. 添加其他指标和过滤器以提高质量
3. 建立止损和获利获取机制
4. 结合更多的数据源如订单簿活动
5. 测试在不同期间(日内,多日等)和不同市场中的健壮性
6. 添加机器学习预测来过滤信号

## 总结

总而言之,该策略提供了一种独特的方法来利用机构交易员的交易行为。它融合了多个要素,并具有一定的优势。但是像大多数交易策略一样,它也会面临市场发生变化和出现非预期价格行为时的风险。 通过持续的测试、优化和风险管理,该策略可以成为一个有价值的量化交易工具。

||

## Overview

This strategy is named the “Institutional Trader Strategy Based on Price Action”. It attempts to take advantage of certain trading patterns used by institutional traders, particularly their tendency to place orders around specific “order blocks”. The strategy incorporates elements of fair value, liquidity, and price action to determine entries and exits from the market.  

## Strategy Logic

The core of the strategy is identifying “order blocks” – price areas where significant institutional trading activity has taken place in the past. These areas are associated with significant liquidity. Order blocks are determined using price structures and are often associated with key technical price levels.  

Fair value is defined as the “reasonable” price of a tool based on indicators like moving averages. When the current price moves far from fair value, this is seen as a signal of market imbalance.

Liquidity is also a key factor as institutional traders tend to execute trades in high liquidity areas. 

The strategy determines fair value by calculating a simple moving average. It then identifies potential order blocks of length 20 periods. If the difference between the close price and fair value is below 38.2% of the total height of the order block range, an order block is determined. 

Bullish order blocks are considered buy signals. Bearish order blocks are considered sell signals.

## Advantage Analysis 

The main advantages of the strategy are using the trading patterns of institutional traders which may allow it to outperform more mechanistic indicator-based strategies. By watching order flow and value areas, it combines several different types of analysis.  

Other advantages include:

- Getting better execution using liquidity  
- Relying on easy to visualize concepts like order flow
- Easy to visualize order blocks on charts
- Flexibility to adjust parameters like block length

## Risk Analysis

The strategy also faces some potential risks such as:

- Reliance on judgments about past price behavior 
- May not function properly in markets without order flow
- Could produce false signals
- Could miss short-term trends

To mitigate these risks, it’s recommended to consider:

- Combining with other indicators to filter false signals
- Adjusting parameters like block length  
- Filtering the signals issued for trading

## Optimization Directions 

Here are some potential optimizations for the strategy:

1. Test and optimize key parameter values like block length and fair value deviation percentage
2. Add additional indicators and filters to improve quality 
3. Build in stop loss and take profit mechanisms
4. Incorporate more data sources like order book activity
5. Test robustness across different periods (intraday, multi-day etc) and markets
6. Add machine learning predictions to filter signals

## Summary

In summary, the strategy offers a unique approach to take advantage of institutional trader behavior. It blends multiple elements and has certain advantages. But like most trading strategies, it also faces risks when market conditions change or unexpected price behavior occurs. With continual testing, optimization, and risk management, the strategy can become a valuable quantitative trading tool.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|Order Block Length|
|v_input_int_2|60|Fair Value Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-23 00:00:00
end: 2024-02-22 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("ICT Strategy", overlay=true)

// Input variables
length = input.int(20, minval=1, title="Order Block Length")
fairValuePeriod = input.int(60, minval=1, title="Fair Value Period")

// Calculate fair value
fairValue = ta.sma(close, fairValuePeriod)

// Determine order blocks
isOrderBlock(high, low) =>
    highestHigh = ta.highest(high, length)
    lowestLow = ta.lowest(low, length)
    absHighLowDiff = highestHigh - lowestLow
    absCloseFairValueDiff = (close - fairValue)
    (absCloseFairValueDiff <= 0.382 * absHighLowDiff)

isBuyBlock = isOrderBlock(high, low) and close > fairValue
isSellBlock = isOrderBlock(high, low) and close < fairValue

// Plot fair value and order blocks
plot(fairValue, color=color.blue, title="Fair Value")
plotshape(isBuyBlock, style=shape.triangleup, location=location.belowbar, color=color.green, size=size.small)
plotshape(isSellBlock, style=shape.triangledown, location=location.abovebar, color=color.red, size=size.small)

// Strategy logic
if (isBuyBlock)
    strategy.entry("Buy", strategy.long)
    
if (isSellBlock)
    strategy.entry("Sell", strategy.short)

```

> Detail

https://www.fmz.com/strategy/442653

> Last Modified

2024-02-23 15:04:39
