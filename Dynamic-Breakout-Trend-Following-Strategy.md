
> Name

Dynamic-Breakout-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b0ff308dfa19dfa989.png)

## Overview  

This is a dynamic trend following breakout strategy. It tracks stock's highest and lowest price in real time. When price breaks through the highest price in recent period, it will go long. When price breaks through the lowest price in recent period, it will go short. Meanwhile, stop loss and take profit are set to control risks and ensure fixed risk reward ratio.  

## Strategy Logic  

The core logic of this strategy is to track and trade price breakout points of trends. Specifically, the strategy calculates the highest high and lowest low in recent 20 days. When today's close price breaks through yesterday's highestHigh, it is considered as an upward trend breakout signal and will go long. When today's close price breaks through yesterday's lowestLow, it is considered as a downward trend breakout signal and will go short.

After going long or short, stop loss of 1% and take profit of 2% are set. This ensures fixed risk reward ratio of 2:1 for each trade. It effectively controls the risk of single trade.

## Advantages

The biggest advantage of this strategy is quickly capturing reversal points of price trends, while controlling risks of each single trade. Main advantages are:

1. Dynamic calculation of highest and lowest price, real time tracking of price trend changes, which can quickly capture price reversal signals.

2. Taking breakout method for entries improves quality of entries.  

3. Setting stop loss and take profit to control risk reward ratio of single trade effectively manages trade risk.

4. Simple and easy to understand logic, suitable for quant beginners.  

5. Less code which is easy for testing and optimization.

## Risks  

There are also some risks of this strategy:

1. Following trends for entries may miss the best turning points of price reversal.  

2. Fixed stop loss and take profit cannot adapt to market change, may stop out or profit target prematurely.

3. No pyramiding logic for later additional entries, cannot keep following trends.

4. No consideration of big cycles, may conflict with major trend causing losses.  

5. No position sizing module, cannot control overall position management.

## Optimization Directions

There is still large room for optimization, mainly in below directions:  

1. Add dynamic stop loss and take profit based on market volatility.

2. Add trend direction filter based on moving average to avoid conflict major trends.

3. Add trend strength indicator to ensure entering on strong trends only.  

4. Add pyramiding logic to maximize profits by keep following trends.

5. Combine with position sizing module to dynamically adjust position size and control overall risk. 

6. Optimize parameters to find optimum parameter sets.

## Summary  

In summary, this strategy is suitable for quant beginners to learn and practice overall. Its advantage lies in simplicity and easy understanding, also with stop loss and take profit logic to control risk. But still has many aspects to optimize, can serve as chance for further learning. Generally speaking, this strategy is suitable to master from principle to application for beginners.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length|
|v_input_2|true|Stop Loss %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-28 00:00:00
end: 2023-12-28 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Trend Following Breakout Strategy with 2:1 RRR", overlay=true)

// 定义前高和前低的计算
length = input(20, minval=1, title="Length")
highestHigh = highest(high, length)
lowestLow = lowest(low, length)

// 定义买入和卖出的条件
longCondition = close > highestHigh[1] // 当前收盘价高于前一期的最高价
shortCondition = close < lowestLow[1] // 当前收盘价低于前一期的最低价

// 为了确保盈亏比为2:1，我们需要定义止损和目标价
stopLoss = input(1, title="Stop Loss %") / 100
takeProfit = stopLoss * 2

// 如果满足买入条件，进入多头
if (longCondition)
    strategy.entry("Long", strategy.long)
    strategy.exit("Long TP", "Long", profit=takeProfit * close, loss=stopLoss * close)

// 如果满足卖出条件，进入空头
if (shortCondition)
    strategy.entry("Short", strategy.short)
    strategy.exit("Short TP", "Short", profit=takeProfit * close, loss=stopLoss * close)

// 绘图显示前高和前低
plot(highestHigh, color=color.green, title="Previous High")
plot(lowestLow, color=color.red, title="Previous Low")

```

> Detail

https://www.fmz.com/strategy/437048

> Last Modified

2023-12-29 17:32:10
