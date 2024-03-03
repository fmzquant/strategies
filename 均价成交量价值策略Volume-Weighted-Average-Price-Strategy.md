
> Name

均价成交量价值策略Volume-Weighted-Average-Price-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ff00eedcd6cdb4ced7.png)

[trans]

## 概述

均价成交量价值(VWAP)策略是一个跟踪股票在特定时间内的平均价格的策略。该策略使用VWAP作为一个基准,当价格高于或低于VWAP时开仓做多或做空。它还设置了止损和止盈条件来管理交易。

## 策略原理

该策略首先计算典型价格(最高价、最低价和收盘价的平均值)与成交量的乘积之和,以及成交量之和。然后用乘积之和除以成交量之和,计算出VWAP值。当价格上穿VWAP时,做多;当价格下穿时,做空。

做多仓位的止盈条件是价格较入场价上涨3%时止盈;止损条件是价格较入场价下跌1%时止损。做空仓位也是类似的条件。

## 优势分析

VWAP策略的主要优势有:

1. 使用了VWAP这个公认的重要统计指标作为交易信号的基准,使策略更有效;

2. 同时使用vwap信号与止盈止损,可以在趋势中获利,也可以减少损失;

3. 策略逻辑简单清晰,容易理解和实现。

## 风险分析 

该策略也存在一些风险:

1. VWAP无法预测未来价格,因此VWAP信号可能发生滞后;

2. 止损条件设置过于宽松,可能增加损失;

3. 回测时间越长,交易信号越多,实盘效果可能会有差异。

这些风险可以通过调整参数、优化止损算法等方法来降低。

## 优化方向

该策略可以从以下几个方向进行优化:

1. 对VWAP参数进行优化,找到最佳计算周期;

2. 可以测试其他跟踪止损算法,如移动止损、指数移动止损等;

3. 可以结合其他指标作为过滤器,避免VWAP信号错误;例如量能指标、布林带指标等。

## 总结

总的来说,均价成交量价值策略利用了vwap这个重要指标的predictive力,设置了止盈止损条件,可以获取长期正收益。但仍需进一步优化和组合其他策略,以减少市场波动带来的风险,提高策略盈利空间。


|| 

## Overview

The Volume Weighted Average Price (VWAP) strategy is a strategy that tracks the average price of a stock over a specified time. The strategy uses VWAP as a benchmark and takes long or short positions when the price crosses above or below VWAP. It also sets stop loss and take profit conditions to manage trades.  

## Strategy Logic

The strategy first calculates the typical price (average of high, low and close prices) multiplied by volume, and the sum of volume. Then VWAP is calculated by dividing the sum of typical price-volume product by the sum of volume. When price crosses over VWAP, go long. When price crosses below, go short.  

The profit taking condition for long positions is to close when price rises 3% above the entry price. The stop loss condition is when price drops 1% below entry price. Similar conditions apply for short positions.

## Advantage Analysis

The main advantages of the VWAP strategy are:

1. Uses the well-recognized VWAP statistic as benchmark for trade signals, making the strategy more effective.  

2. Utilizes both vwap signals and stop loss/profit taking, able to profit from trends and limit losses.

3. Simple and clear logic, easy to understand and implement.

## Risk Analysis

There are also some risks with this strategy:  

1. VWAP cannot predict future prices, so signals may lag.

2. Stop loss may be too wide, increasing potential loss.  

3. Longer backtests means more signals, actual performance may differ.

These risks may be reduced through parameter tuning, optimizing stop loss algorithms etc.

## Optimization Directions 

Some ways to optimize the strategy include:

1. Optimize VWAP parameters to find best calculation period.  

2. Test other tracking stop algorithms e.g. moving average stop, parabolic SAR.

3. Combine other indicators to filter VWAP signals, e.g. volume, Bollinger Bands.


## Conclusion

In summary, the VWAP strategy utilizes the predictive power of this important statistic, with stop loss/profit taking to achieve long-term positive expectancy. But further optimizations and combination with other strategies are needed to reduce market fluctuation risks for larger profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-28 00:00:00
end: 2023-12-28 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("VWAP Strategy by Royce Mars", overlay=true)

cumulativePeriod = input(14, "Period")

var float cumulativeTypicalPriceVolume = 0.0
var float cumulativeVolume = 0.0

typicalPrice = (high + low + close) / 3
typicalPriceVolume = typicalPrice * volume
cumulativeTypicalPriceVolume := cumulativeTypicalPriceVolume + typicalPriceVolume
cumulativeVolume := cumulativeVolume + volume
vwapValue = cumulativeTypicalPriceVolume / cumulativeVolume

// Buy condition: Price crosses over VWAP
buyCondition = crossover(close, vwapValue)

// Short condition: Price crosses below VWAP
shortCondition = crossunder(close, vwapValue)

// Profit-taking condition for long positions: Sell long position when profit reaches 3%
profitTakingLongCondition = close / strategy.position_avg_price >= 1.03

// Profit-taking condition for short positions: Cover short position when profit reaches 3%
profitTakingShortCondition = close / strategy.position_avg_price <= 0.97

// Stop loss condition for long positions: Sell long position when loss reaches 1%
stopLossLongCondition = close / strategy.position_avg_price <= 0.99

// Stop loss condition for short positions: Cover short position when loss reaches 1%
stopLossShortCondition = close / strategy.position_avg_price >= 1.01

// Strategy Execution
strategy.entry("Buy", strategy.long, when=buyCondition)
strategy.close("Buy", when=shortCondition or profitTakingLongCondition or stopLossLongCondition)

strategy.entry("Short", strategy.short, when=shortCondition)
strategy.close("Short", when=buyCondition or profitTakingShortCondition or stopLossShortCondition)

// Plot VWAP on the chart
plot(vwapValue, color=color.blue, title="VWAP")

```

> Detail

https://www.fmz.com/strategy/437032

> Last Modified

2023-12-29 16:31:33
