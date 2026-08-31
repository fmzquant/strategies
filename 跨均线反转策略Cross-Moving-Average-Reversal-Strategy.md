
> Name

跨均线反转策略Cross-Moving-Average-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17bebcd04c5bf748668.png)

## Overview

This is a reversal strategy based on simple moving average crossover. It uses 1-day and 5-day simple moving averages. When the shorter SMA crosses above the longer SMA, it goes long. When the shorter SMA crosses below the longer SMA, it goes short. It's a typical trend following strategy.  

## Strategy Logic

The strategy calculates the 1-day SMA (sma1) and 5-day SMA (sma5) of the closing price. When sma1 crosses over sma5, it enters a long position. When sma1 crosses below sma5, it enters a short position. After opening a long position, the stop loss is set at 5 USD below the entry price and take profit at 150 USD above. For short positions, stop loss is 5 USD above entry and take profit 150 USD below.

## Advantage Analysis   

- Using double SMAs to determine market trend, avoiding loss trades after stop loss
- SMA parameters simple and reasonable, good backtest results  
- Small stop loss to withstand certain price fluctuations
- Big profit target to make enough money 

## Risk Analysis

- Double SMAs are prone to whipsaws, high probability of stop loss when choppy
- Hard to catch trending moves, limited profit for long term trades 
- Limited optimization space, easy to overfit
- Parameters need adjustment for different trading instruments

## Improvement Directions

- Add other filters to avoid wrong signals
- Dynamic stop loss and take profit  
- Optimize SMA parameters 
- Combine volatility index to control position sizing  

## Conclusion

This simple double SMA strategy is easy to understand and implement for fast strategy verification. But it has limited risk tolerance and profit potential. Further optimizations are needed in parameters and filters to adapt more market conditions. As a starter quant strategy, it contains basic building blocks for iterable improvements.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-19 00:00:00
end: 2024-02-19 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Valeria 181 Bot Strategy Mejorado 2.21", overlay=true, margin_long=100, margin_short=100)
 
var float lastLongOrderPrice = na
var float lastShortOrderPrice = na

longCondition = ta.crossover(ta.sma(close, 1), ta.sma(close, 5))
if (longCondition)
    strategy.entry("Long Entry", strategy.long)  // Enter long

shortCondition = ta.crossunder(ta.sma(close, 1), ta.sma(close, 5))
if (shortCondition)
    strategy.entry("Short Entry", strategy.short)  // Enter short

if (longCondition)
    lastLongOrderPrice := close

if (shortCondition)
    lastShortOrderPrice := close

// Calculate stop loss and take profit based on the last executed order's price
stopLossLong = lastLongOrderPrice - 5  // 10 USDT lower than the last long order price
takeProfitLong = lastLongOrderPrice + 151  // 100 USDT higher than the last long order price
stopLossShort = lastShortOrderPrice + 5  // 10 USDT higher than the last short order price
takeProfitShort = lastShortOrderPrice - 150  // 100 USDT lower than the last short order price

// Apply stop loss and take profit to long positions
strategy.exit("Long Exit", from_entry="Long Entry", stop=stopLossLong, limit=takeProfitLong)

// Apply stop loss and take profit to short positions
strategy.exit("Short Exit", from_entry="Short Entry", stop=stopLossShort, limit=takeProfitShort)
```

> Detail

https://www.fmz.com/strategy/442222

> Last Modified

2024-02-20 13:59:46
