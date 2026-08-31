
> Name

追踪止损百分比策略Percentage-Trailing-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1506cca7363c7fdffbc.png)

## Overview

The percentage trailing stop loss strategy is a strategy that sets and adjusts stop loss orders based on percentage of the instrument price. It can adjust the stop loss to the entry price after the price reaches a certain profitable level to realize breakeven stop loss.

## Strategy Logic

This strategy sets the percentage for long position trailing stop loss via input parameters, such as 3%. After opening a position, it calculates the trailing stop loss price in real time. The calculation method is:

1. When the price exceeds entry price*(1+trailing stop loss percentage), the stop loss price is adjusted to entry price to realize breakeven.  

2. When the price is below the above level, the stop loss price is entry price*(1-trailing stop loss percentage).

This can realize breakeven stop loss when the price reaches a certain profit level, avoiding losing all profits by losses, while preventing too aggressive stop loss from being knocked out by normal price fluctuations.

The strategy also plots the trailing stop loss price for confirmation, and sets to only go long. It goes long on golden cross and closes position on death cross. After going long, it sets trailing stop loss orders to realize the stop loss logic.

## Advantage Analysis 

The biggest advantage of this strategy is that it can realize breakeven stop loss after making profits through trailing stop loss, no matter how the later market goes, at least the principal can be kept to avoid losses. This is important for many investors.

In addition, the stop loss of this strategy is relatively mild. The trailing stop loss range is not too large, which can prevent being stopped out by normal price fluctuations compared to fixed stop loss. It is more flexible and intelligent.

## Risk Analysis

The main risk of this strategy is that if the stop loss percentage is set improperly. If set too small, it would be hard to realize breakeven stop loss. If set too large, it would be easy to be stopped out by normal price fluctuations. So the proper stop loss percentage needs careful testing and evaluation.

Another risk is that in abnormal markets, prices may suddenly gap largely. In this case, stop loss price may not be able to update in time, resulting in invalid stop loss. But the probability is relatively small.

## Optimization Directions

This strategy can be optimized in the following aspects:

1. Add exit rules such as death cross, price breaking through SMA etc. to make the strategy more comprehensive. 

2. Add dynamic adjustment mechanism of stop loss percentage, to automatically optimize stop loss range in different market environments.

3. Add exit strategies to exit positions after prices running certain range to lock in profits.

4. Research the differences of stop loss percentage parameters on different instruments, establish parameter self-adaptive optimization mechanism.

## Conclusion

The percentage trailing stop loss strategy is very practical overall, which can effectively realize breakeven stop loss after making profits to avoid losses. This strategy has large room for optimization and is worth further researching to improve efficiency. In general, this strategy suits investors pursuing steady investment returns.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|3|Trail Long Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-08 00:00:00
end: 2024-01-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © osmaras
// based on https://kodify.net/tradingview/orders/percentage-trail/

//@version=5
strategy("Break even stop loss (% of instrument price)", overlay=true)

// Configure trail stop level with input options (optional)
longTrailPerc = input.float(defval=3.0,step=0.1,title="Trail Long Loss (%)")* 0.01 
longCondition = ta.crossover(ta.sma(close, 14), ta.sma(close, 28))

// Determine trail stop loss prices
longStopPrice = 0.0
lastEntryPrice = strategy.opentrades.entry_price(strategy.opentrades - 1)
longStopPrice := if (strategy.position_size > 0 and close > (lastEntryPrice * (1 + longTrailPerc)))
    stopValue = lastEntryPrice
    math.max(stopValue, longStopPrice[1])
else
    longStopPrice := if (strategy.position_size > 0)
        stopValue = lastEntryPrice * (1 - longTrailPerc)
        math.max(stopValue, longStopPrice[1])
    else
        0

// Plot stop loss values for confirmation
plot(series=(strategy.position_size > 0) ? longStopPrice : na,
     color=color.fuchsia, style=plot.style_cross,
     linewidth=2, title="Long Trail Stop")

// set strategy only long
strategy.risk.allow_entry_in(strategy.direction.long)

// Submit entry orders
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = ta.crossunder(ta.sma(close, 14), ta.sma(close, 28))
if (shortCondition)
    strategy.close("Long")


// Submit exit orders for trail stop loss price
if (strategy.position_size > 0)
    strategy.exit(id="Stop Loss", stop=longStopPrice)


```

> Detail

https://www.fmz.com/strategy/438068

> Last Modified

2024-01-08 17:12:46
