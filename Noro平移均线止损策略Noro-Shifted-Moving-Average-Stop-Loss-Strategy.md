
> Name

Noro平移均线止损策略Noro-Shifted-Moving-Average-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13afe8dc93c3ba1c714.png)

## Overview

The Noro Shifted Moving Average Stop Loss Strategy is a trend following strategy. It calculates the 3-day simple moving average line, and sets a long line above it and a stop loss line below it at given percentages. Take profit lines are also set. This allows opening positions when trends start, and stopping out when trends reverse.

## Strategy Logic

The core of this strategy is calculating the 3-day simple moving average line ma. Then a percentage lo is added above ma to get the long line long for entries. When price crosses above long, long positions are opened. Below ma a percentage sl is subtracted to get the stop loss line stop. When price drops below stop, positions are stopped out. There are also take profit lines take set at a percentage tp above the current average holding price.

The specific rules are:

1. Calculate 3-day simple moving average ma
2. Long line long = ma + ma * lo%  
3. Take profit line take = Current average holding price + Current average holding price * tp%
4. Stop loss line stop = Current average holding price - Current average holding price * sl%

This constructs a trend following strategy that sets entry, take profit and stop loss lines based on the ma benchmark and configurable percentages. 

## Advantage Analysis   

The biggest advantage of this strategy is it can automatically track trends. By going long to catch uptrends and short for downtrends without needing pattern recognition, it catches trends. Adding take profit and stop loss further allows it to stop out automatically when trends end to limit drawdowns.

Another advantage is flexible parameter adjustment. By changing the percentages for long, take profit and stop loss, position sizing and stop loss spacing can be easily controlled.

## Risk Analysis

The biggest risk of this strategy is slippage. As a stop order is used for stop loss, in a fast dropping market prices can gap down way below the stop loss before orders are filled. This can lead to catastrophic losses.

Another risk comes from poorly set parameters causing too frequent entries and exits, increasing commission costs. 

## Optimization Directions 

The strategy can be optimized in the following ways:

1. Use limit orders instead of stop orders for stop losses to avoid slippage risks

2. Add position sizing settings to scale in and out smoothly, reducing trade frequency   

3. Add trend detection filters to avoid false signals in non-trending markets

4. Optimize parameter settings to find optimum combinations

## Conclusion   

The Noro Shifted Moving Average Stop Loss Strategy is a simple and practical trend following strategy. It can automatically track trends with take profit and stop loss controlling risk. The biggest risks come from potential slippage and overly frequent trading from poor parameter optimization. By improving stop loss technique and optimizing parameters, the strategy can be made more robust.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|-5|Long-line, %|
|v_input_2|5|Take-profit|
|v_input_3|2|Stop-loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-30 00:00:00
end: 2024-01-29 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//2019
//Noro

//@version=4
strategy("Stop-loss", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
lo = input(-5.0, title = "Long-line, %")
tp = input(5.0, title = "Take-profit")
sl = input(2.0, title = "Stop-loss")

//SMA
ma = sma(ohlc4, 3)
long = ma + ((ma / 100) * lo)

//Orders
avg = strategy.position_avg_price
if ma > 0
    strategy.entry("Long", strategy.long, limit = long)
    strategy.entry("Take", strategy.short, 0, limit = avg + ((avg / 100) * tp))
    strategy.entry("Stop", strategy.short, 0, stop = avg - ((avg / 100) * sl))
    
//Cancel order
if strategy.position_size == 0
    strategy.cancel("Take")
    strategy.cancel("Stop")

//Lines
plot(long, offset = 1, color = color.black, transp = 0)
take = avg != 0 ? avg + ((avg / 100) * tp) : long + ((long / 100) * tp)
stop = avg != 0 ? avg - ((avg / 100) * sl) : long - ((long / 100) * sl)
takelinecolor = avg == avg[1] and avg != 0 ? color.lime : na
stoplinecolor = avg == avg[1] and avg != 0 ? color.red : na
plot(take, offset = 1, color = takelinecolor, linewidth = 3, transp = 0)
plot(stop, offset = 1, color = stoplinecolor, linewidth = 3, transp = 0)
```

> Detail

https://www.fmz.com/strategy/440438

> Last Modified

2024-01-30 15:49:34
