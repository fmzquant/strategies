
> Name

Wave-Buying-and-Selling-Reversal-5-Minutes-Timeframe-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/cd2ec0149101af4977.png)

## Overview  

This is a test strategy designed for the 5-minute ETHUSDT trading pair. It goes long when there is a price gap down of more than $5, and when already long, it sets two small short orders as stops at 1% and 2% price levels, while also setting a trailing limit long order at another price level. The logic after going short is similar, with two long stop orders at 0.99% and 1.02% price levels, and a trailing short limit order.

## Strategy Logic   

The core logic of this strategy is to identify potential new trend directions when there are price gaps or reversals at key levels. When prices drop more than $5, it indicates a potential bottom and upcoming bull trend. When already long, the small short orders at 1% and 2% serve for both stopping out and identifying potential new bear trends. Similarly on the upside, potential topping and new bear trends are identified, with the two small long orders serving for exiting shorts and trailing for new bull trends.  

Thus multiple small reversal orders are used instead of one big stop, for better judging trend direction and managing stops. The reversal orders also provide trailing stop/profit functions according to price fluctuation. 

## Advantage Analysis   

The biggest advantage is identifying new potential trends from key price gaps, and using small reversal orders for capital management, stop loss and judging new trends during huge swings. Setting stops and trailing orders at multiple price levels also allows more effective management.  

## Risk Analysis

The key risks are whipsaws from relying on shorter term price action, and higher order load on exchanges from the multiple orders. There may also be excessive fees from frequent stop triggering during volatile periods.  

## Optimization Directions

Directions include adjusting parameters for identifying signals like gap sizes, optimizing number and levels of stops and orders, implementing dynamic trailing, and introducing more factors like volume and technical indicators to judge trend changes. Machine learning for dynamic parameter optimization is also feasible.  

## Summary  

The strategy identifies new trend potential from gaps/reversals and sets trailing reversal orders for catching trends, flexible stops and dynamic profits. Key risks are whipsaws and extra costs from high order frequency, which can be improved via parameter tuning and more signal factors. With machine learning and dynamics optimization, there is great potential.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-22 00:00:00
end: 2024-02-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("pokupka perevorot 5min tf", overlay=true)

// Activation block (executed only once)
if (close - open) < -5
    strategy.entry("Long", strategy.long)

// Checking chart state block (executed continuously)
if strategy.position_size > 0
    // If long position is open
    strategy.entry("Short1", strategy.short, qty=2, limit=close * 1.01)
    strategy.entry("Short2", strategy.short, qty=2, limit=close * 1.01)
    strategy.entry("LongLimit", strategy.long, qty=1, limit=close * 0.98)

// Execution block (executed continuously)
if close * 1.01 <= strategy.position_avg_price
    // If price has increased by 1%, indicating a short position
    strategy.close("Long")

if close * 0.98 >= strategy.position_avg_price
    // If price has decreased by 2%, indicating two long positions
    strategy.close("Short1")
    strategy.close("Short2")

// Checking chart state block (executed continuously)
if strategy.position_size < 0
    // If short position is open
    strategy.entry("Long1", strategy.long, qty=2, limit=close * 0.99)
    strategy.entry("Long2", strategy.long, qty=2, limit=close * 0.99)
    strategy.entry("ShortLimit", strategy.short, qty=1, limit=close * 1.02)

// Execution block (executed continuously)
if close * 0.99 >= strategy.position_avg_price
    // If price has decreased by 1%, indicating a long position
    strategy.close("Short")

if close * 1.02 <= strategy.position_avg_price
    // If price has increased by 2%, indicating two short positions
    strategy.close("Long1")
    strategy.close("Long2")

```

> Detail

https://www.fmz.com/strategy/443129

> Last Modified

2024-02-29 14:19:44
