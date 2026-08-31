
> Name

Donchian-Channels-Breakout-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14bc1166cf899fd1d62.png)

## Overview

The core idea of this strategy is to make trading decisions based on price breakouts of Donchian Channels. It belongs to the trend following type of quantitative strategies. It can automatically identify price channels. When prices break through the upper rail of the channel, long positions will be opened. When prices fall back near the lower rail of the channel or the stop loss point, positions will be closed. This strategy aims to capture medium to long term price trends and is suitable for algorithmic trading of financial derivatives such as index futures.

## Principles 

This strategy is based on the Donchian Channels indicator. Donchian Channels are channels drawn by the highest and lowest prices over a given period. Its calculation method is:

Upper Rail = Highest price over last n periods
Lower Rail = Lowest price over last n periods

When prices break through the upper rail, it is considered that a long trend has started. When prices break through the lower rail, it is considered that a short trend has started. This strategy only considers cases when the upper rail is broken.

The specific trading logic is:

1. Plot the upper rail of Donchian Channels using highest price over last n periods 
2. When closing price breaks through the upper rail, go long
3. Profit taking by trailing stop when closing price falls back near lower rail or to a preset stop loss point

## Advantages

The advantages of this strategy include:

1. The strategy idea is clear and easy to understand and implement
2. Donchian Channels is a mature and reliable indicator for judging trend direction  
3. It automatically identifies channels without manual interference  
4. Customizable parameters make it highly adaptable
5. It contains stop loss mechanisms to limit losses

## Risks

There are also some risks:

1. Donchian Channels could have false breakouts, causing unnecessary losses
2. Improper stop loss positioning could increase losses
3. Pay attention to reversal risks when price is near the channel rails
4. Inadequate parameter settings could negatively impact strategy performance

Solutions:

1. Add filters by incorporating other indicators to avoid false breakouts
2. Optimize stop loss positioning for smooth exits
3. Consider increasing position size or widening profit range when price is near channel rails
4. Test different parameters to find optimum values

## Optimization Directions

This strategy can be further optimized in the following areas:

1. Add other indicators like MACD, KD to avoid false breakouts
2. Optimize stop loss mechanisms, e.g. moving stop loss
3. Optimize participate rate control, e.g. only trade when volatility rises
4. Parameter optimization to find optimum combination

## Summary 

The overall idea of this strategy is clear and easy to understand and implement. It utilizes mature Donchian Channels to automatically identify trend direction. The configuration is also highly flexible to cater for different needs. With proper stop loss and parameter optimization, good results can be achieved. In conclusion, this strategy has a low learning curve yet reasonable efficiency. It is suitable as a starter quantitative trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Select 1: Stock/Forex, 2: Future|
|v_input_2|10000|Money for each trade|
|v_input_3|2000|Insert first year to backtest|
|v_input_4|50|Period in bars of Donchian Channel|
|v_input_5|1000|Monetary Stop Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-07 00:00:00
end: 2023-12-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Giovanni_Trombetta

// Strategy to capture price channel breakouts

//@version=4
strategy("ChannelsBreakout", max_bars_back=50, overlay=true)

instrument = input(1, title = "Select 1: Stock/Forex, 2: Future")
money = input(10000, title = "Money for each trade")
backtest_start = input(2000, "Insert first year to backtest")
period = input(50, title = "Period in bars of Donchian Channel")
monetary_stoploss = input(1000, title = "Monetary Stop Loss")

quantity = if instrument != 1 
    1
else
    int(money / close)
    
upBarrier = highest(high,period)
downBarrier = lowest(low,period)
up = highest(high,period / 4)
down = lowest(low,period / 4)

plot(upBarrier, color=color.green, linewidth=2)
plot(downBarrier, color=color.red, linewidth=2)
plot(up, color=color.lime, linewidth=1)
plot(down, color=color.orange, linewidth=2)

longCondition = crossover(close, upBarrier[1]) and year >= backtest_start

if (longCondition)
    strategy.entry("Long", strategy.long, quantity, when = strategy.position_size == 0)

closeCondition = crossunder(close, down[1]) or down < down[1]

if (closeCondition)
    strategy.close("Long", comment = "Trailing")
    
stop_level = strategy.position_avg_price - monetary_stoploss / strategy.position_size
strategy.exit("StopLoss", from_entry = "Long", stop = stop_level)
plot(stop_level, color=color.yellow, linewidth=2)

// l = label.new(bar_index, na,
//   text="PineScript Code", color= color.lime, textcolor = color.white,
//   style=label.style_labelup, yloc=yloc.belowbar, size=size.normal)
// label.delete(l[1])
```

> Detail

https://www.fmz.com/strategy/434675

> Last Modified

2023-12-08 11:00:05
