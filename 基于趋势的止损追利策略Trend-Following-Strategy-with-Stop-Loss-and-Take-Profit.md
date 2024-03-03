
> Name

基于趋势的止损追利策略Trend-Following-Strategy-with-Stop-Loss-and-Take-Profit

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ea70e915d48d78ac52.png)
[trans]
## 概述

该策略的主要思想是基于每周的价格趋势来确定多空方向,在看涨的情况下,当出现阳线形态之后进入多单;当价格上涨至预设的止盈点时止盈,如果下跌至预设的止损点则止损。

## 策略原理

该策略首先定义了判断每周趋势的条件:

```
isUptrend = close > close[1] 

isDowntrend = close < close[1]
```

如果当前收盘价大于前一日的收盘价则判断为看涨趋势,反之则看跌。

然后定义日内交易信号:

```
buyCondition = getPrevDayClose() > getPrevDayOpen() and getPrevDayOpen() > getPrevDayClose()[1] and isUptrend
```

即前一日收盘价大于开盘价(阳线),且前一日开盘价大于前前日收盘价(缺口涨),且处于看涨趋势,满足多头入场条件。

入场后,止损点设置为前一日收盘价再减去1.382倍的前一日实体线长度:

```
stopLoss = getPrevDayClose() - 1.382 * (getPrevDayClose() - getPrevDayOpen()) 
```

止盈点则设置为前一日收盘价加上2倍止损点与收盘价的差额:

```
takeProfit = getPrevDayClose() + 2 * (getPrevDayClose() - stopLoss)
```

以此实现止损追利。

## 优势分析

该策略具有以下优势:

1. 基于趋势交易,避免逆势做空带来的风险
2. 采用日内阳线及缺口的组合信号,避免多头入场过早
3. 止损定位合理,控制单笔损失
4. 止盈空间较大,盈利潜力高

## 风险分析 

该策略也存在一些风险:

1. 无法判断趋势反转点,可能错过100000000000000000000转机会
2. 止损过于接近,被套可能性较大
3. 没有考虑成本控制,交易频率过高时收益可能下降

为控制这些风险,可以考虑加入如下优化:

1. 在止损点附近设置trailers,追踪止损
2. 加入成本控制模块,限制开仓频率
3. 增加对SUPPORT/RESISTANCE的判断

## 优化方向

该策略还可以从以下方向进行优化:

1. 基于更多因素判断趋势,如移动平均线方向、成交量变化等
2. 优化入场信号,结合更多K线形态
3. 动态追踪止损止盈,根据价格波动自动调整
4. 加入量化模块,控制仓位规模
5. 多时间周期组合,利用更高级别的趋势过滤

## 总结

该策略整体来说较为实用,核心思路突出趋势交易,同时控制风险。可以作为日内短线交易的基础策略,也可根据不同市场和品种进行模块化优化,实现多样化的交易组合。在实际运用中,仍需要注意控制成本和防范被套风险,保持适当的心态很关键。

||

## Overview

The main idea of this strategy is to determine the direction of long and short based on the weekly price trend. In an uptrend, it goes long when there is a bullish candlestick pattern. It takes profit when the price rises to the preset take profit level and stops loss when it falls to the preset stop loss level.

## Strategy Logic

The strategy first defines the conditions for judging the weekly trend:

```
isUptrend = close > close[1]
isDowntrend = close < close[1] 
```

If the current close is higher than the previous close, it is judged as an uptrend. Otherwise, it is a downtrend.

Then the intraday trading signal is defined: 

```
buyCondition = getPrevDayClose() > getPrevDayOpen() and getPrevDayOpen() > getPrevDayClose()[1] and isUptrend
```

That is, the previous close is higher than the previous open (bullish candle), and the previous open is higher than the close before previous day (gap up), and it is in an uptrend. These criteria meet the long entry condition.

After entering the position, the stop loss is set to the previous close minus 1.382 times the previous day's real body:

```
stopLoss = getPrevDayClose() - 1.382 * (getPrevDayClose() - getPrevDayOpen())
```

The take profit is set to the previous close plus 2 times the difference between the previous close and stop loss: 

```  
takeProfit = getPrevDayClose() + 2 * (getPrevDayClose() - stopLoss)
```

This realizes the stop loss and profit taking strategy.

## Advantage Analysis

The advantages of this strategy include:

1. Trading along trends avoids risks of counter-trend shorting  
2. Entry signal combines bullish candle and gap up to avoid premature long entry
3. Stop loss positioning is reasonable to control single loss
4. Take profit range is large with high profit potential

## Risk Analysis

There are also some risks:  

1. Unable to determine trend reversal points, may miss turning opportunities
2. Stop loss is too close with higher probability of being trapped
3. No consideration of cost control, profit may decrease at high trading frequency

To control these risks, some optimizations can be considered:

1. Set trailers near stop loss to trail the stop loss
2. Add cost control module to limit order frequency 
3. Add judgment of SUPPORT/RESISTANCE

## Optimization Directions

The strategy can also be optimized in the following ways:

1. Determine trend based on more factors like MA direction, volume change etc. 
2. Optimize entry signals with more candlestick patterns
3. Dynamically trail stop loss and take profit according to price fluctuation
4. Add quantitative module to control position sizing  
5. Combinations of multiple timeframes to filter based on higher level trends

## Summary  

Overall this is quite a practical strategy, highlighting trading along trends while controlling risks. It can serve as a basic intraday trading strategy and can be modularly optimized for different markets and products to create diversified trading portfolios. In actual usage, controlling costs and avoiding traps remain critical, so maintaining proper mentality is key.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-24 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Trend Following Strategy with Stop Loss and Take Profit", overlay=true)

// Function to get previous day's close and open
getPrevDayClose() =>
    request.security(syminfo.tickerid, "D", close[1])

getPrevDayOpen() =>
    request.security(syminfo.tickerid, "D", open[1])

// Determine weekly trend
isUptrend = close > close[1]
isDowntrend = close < close[1]

// Determine daily conditions for buy
buyCondition = getPrevDayClose() > getPrevDayOpen() and getPrevDayOpen() > getPrevDayClose()[1] and isUptrend

// Calculate stop loss and take profit
stopLoss = getPrevDayClose() - 1.382 * (getPrevDayClose() - getPrevDayOpen())
takeProfit = getPrevDayClose() + 2 * (getPrevDayClose() - stopLoss)

// Strategy logic
if (isUptrend)
    strategy.entry("Buy", strategy.long, when = buyCondition)
    strategy.exit("Take Profit/Stop Loss", from_entry="Buy", loss=stopLoss, profit=takeProfit)
    
if (isDowntrend)
    strategy.entry("Sell", strategy.short)

// Plotting the trend on the chart
plotshape(series=isUptrend, title="Uptrend", color=color.green, style=shape.triangleup, location=location.abovebar)
plotshape(series=isDowntrend, title="Downtrend", color=color.red, style=shape.triangledown, location=location.belowbar)

// Plotting stop loss and take profit levels on the chart
plot(stopLoss, color=color.red, title="Stop Loss", linewidth=2, style=plot.style_cross)
plot(takeProfit, color=color.green, title="Take Profit", linewidth=2, style=plot.style_cross)

```

> Detail

https://www.fmz.com/strategy/442382

> Last Modified

2024-02-21 14:55:41
