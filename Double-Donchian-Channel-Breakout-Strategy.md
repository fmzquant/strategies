
> Name

Double-Donchian-Channel-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b56a20c57f829a6d23.png)

## Overview

The Double Donchian Channel Breakout strategy is a quantitative trading strategy based on the Donchian Channel. This strategy uses a combination of fast and slow Donchian Channels to achieve low-risk high-return breakout trading. It goes long/short when price breaks out of the slow channel and exits at a stop loss or take profit when price breaks back through the fast channel.

## Strategy Logic

This strategy mainly utilizes two Donchian Channels, including a slower channel with longer period and a faster channel with shorter period. 

The slow Donchian Channel has a longer period which can effectively filter out market noise, making its breakout signals more reliable. The strategy goes long when price breaks above the upper band of the slow channel and goes short when price breaks below the lower band.  

The fast Donchian Channel has a shorter period which can quickly respond to short-term price fluctuations. When price breaks back through this channel, it signals a trend reversal and prompts an exit for stop loss or take profit.

In addition, a volatility condition is set as a filter for entry signals. The strategy will only trigger entry when price movement exceeds a predetermined percentage threshold. This avoids frequent whipsaws during range-bound consolidations.

## Advantage Analysis 

- Dual-channel mechanism sets two lines of defense and effectively controls risk
- Combination of fast and slow channels efficiently captures trends  
- Volatility filter reduces ineffective trades
- Simultaneously tracks trends and prevents overfitting
- Simple and clear logic, easy to understand and master

## Risk Analysis

- Violent price swings may penetrate stop loss and cause heavy losses
- Improper parameter settings (e.g. channel periods) may compromise strategy efficiency 
- Trading costs also erode profits to some extent
- Gap risks around significant events need attention

These risks can be reduced by parameter optimization, reasonable stop loss placement, event awareness etc.

## Optimization Directions

- Test different combinations of Donchian channel periods
- Optimize volatility parameter for best entry timing
- Add trend-checking indicator to avoid counter-trend trades
- Fundamentals-based stock picking  
- Adjust stop loss mechanism to limit losses

## Conclusion

The Double Donchian Channel Breakout strategy is overall a relatively stable and reliable trend-following strategy. It combines the strengths of both trend capture and risk control, making it suitable as a basic module in various stock trading strategies. Further improvements in performance can be expected through parameter tuning and logic refinement.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|50|Slow Donchian|
|v_input_int_2|30|Fast Donchian|
|v_input_int_3|3|Volatility (%)|
|v_input_float_1|2|Long TP1 (%)|
|v_input_float_2|2|Short TP1 (%)|
|v_input_int_4|50|TP1 Position Amount (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-04 00:00:00
end: 2024-02-03 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © omererkan

//@version=5
strategy(title="Double Donchian Channel Breakout", overlay=true, initial_capital = 1000, commission_value = 0.05, default_qty_value = 100, default_qty_type = strategy.percent_of_equity)


slowLen = input.int(50, title="Slow Donchian")
fastLen = input.int(30, title="Fast Donchian")
volatility = input.int(3, title="Volatility (%)")
longProfitPerc = input.float(2, title="Long TP1 (%)", minval=0.0, step=0.1) * 0.01
shortProfitPerc = input.float(2, title="Short TP1 (%)", minval=0.0, step=0.1) * 0.01
TP1Yuzde =input.int(50, title = "TP1 Position Amount (%)")

ubSlow = ta.highest(close, slowLen)[1]
lbSlow = ta.lowest(close, slowLen)[1]

ubFast = ta.highest(close, fastLen)[1]
lbFast = ta.lowest(close, fastLen)[1]

plot(ubSlow, color=color.green, linewidth=2, title="Slow DoCh - Upperband")
plot(lbSlow, color=color.green, linewidth=2, title="Slow DoCh - Lowerband")
plot(ubFast, color=color.blue, linewidth=2, title="Fast DoCh - Upperband")
plot(lbFast, color=color.blue, linewidth=2, title="Fast DoCh - Lowerband")

fark = (ubSlow - lbSlow) / lbSlow * 100

longExitPrice  = strategy.position_avg_price * (1 + longProfitPerc)
shortExitPrice = strategy.position_avg_price * (1 - shortProfitPerc)

longCondition = ta.crossover(close, ubSlow) and fark > volatility
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = ta.crossunder(close, lbSlow) and fark > volatility
if (shortCondition)
    strategy.entry("Short", strategy.short)

if strategy.position_size > 0 and ta.crossunder(close, lbFast) 
    strategy.close("Long", "Close All")

if strategy.position_size < 0 and ta.crossover(close, ubFast)
    strategy.close("Short", "Close All")

// Take Profit
if strategy.position_size > 0
    strategy.exit("TP1", "Long", qty_percent = TP1Yuzde, limit = longExitPrice)

if strategy.position_size < 0
    strategy.exit("TP1", "Short", qty_percent = TP1Yuzde, limit = shortExitPrice)
```

> Detail

https://www.fmz.com/strategy/440949

> Last Modified

2024-02-04 09:42:14
