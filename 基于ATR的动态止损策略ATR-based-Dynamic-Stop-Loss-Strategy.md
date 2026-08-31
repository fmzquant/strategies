
> Name

基于ATR的动态止损策略ATR-based-Dynamic-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy uses the ATR indicator to set dynamic stop loss points and adjust stop loss positions based on price fluctuations, in order to control risks. Mainly it enters long when 5EMA crosses above 20EMA, and then uses the ATR indicator to set stop loss and take profit positions. The stop loss position will be adjusted according to price movements to lock in more profits.

## Strategy Logic

The strategy first judges if 5EMA crosses above 20EMA to go long. After entering, it calculates the ATR multiples of the entry price to current price using the ATR indicator, and sets the stop loss position at 1.5ATR below the entry price. As the price rises, the stop loss position is gradually raised to increase profits of the position. 

Specifically, the strategy defines the following variables:

- entry_price: entry price
- stop_price: stop loss price
- take_profit_price: take profit price  
- atr_down: ATR down line
- atr_up: ATR up line
- atr_current: current ATR line
- atr_ref: ATR value

After entering, it calculates atr_ref as the current ATR value, and atr_div as the ATR multiples of entry price to current price. Then sets the positions of atr_down, atr_current and atr_up based on atr_div. The stop loss price stop_price is set at 1.5ATR below entry price.

As price rises, by comparing current price avg and atr_up, if avg crosses above atr_up, it recalculates atr_div and ATR line positions, thus gradually raising the stop loss line to increase profits. 

If price rises above 3ATR of entry price, it will partially close position to lock in profits, and set tookProfit to true. Afterwards if price keeps rising, it will continue to raise stop loss. When stop loss is triggered, it checks tookProfit - if already took partial profit earlier, it will only close remaining position; otherwise close the full position.

## Advantages

1. Using ATR indicator to dynamically adjust stop loss can set reasonable stop distance based on market volatility.

2. Follow trends while capping losses. Stop loss will gradually be raised to accumulate profits.

3. Partial take profit mechanism locks in some profit and reduces risk. Stop loss continues to rise to allow profit to run.

## Risks

1. ATR indicator is not sensitive to sharp reversals and gaps.

2. EMAs cannot determine trend reversal, may enter new positions at trend reversals.

3. High chance of losses after partial take profit.

4. Parameters need further optimization, 1.5ATR stop and 3ATR take profit should be adjusted for different products.

## Improvements 

1. Consider adding other stop loss indicators like Donchian Channel to compensate for ATR lag.

2. Test different moving averages or add MACD etc. to judge trend reversal.

3. Optimize partial take profit ratios and frequency for different products. 

4. Parameter optimization on ATR multiples for stop and take profit. Add trailing stop loss feature.

5. Test performance during weak trends, may disable strategy during weak trends.

## Summary

The strategy has a clear logic of using ATR for dynamic stop loss management which is its biggest strength. However, ATR itself has limitations like lagging. Adding other stop and trend indicators will improve it. Also the partial take profit needs optimizations across products. Overall it provides the idea of ATR-based stop loss management but needs further optimizations and enhancements.




> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-03 00:00:00
end: 2023-10-09 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ekinbasarkomur

//@version=5
strategy("[EKIN] ATR Exit Strategy", overlay=true, initial_capital = 1000, default_qty_value = 100, default_qty_type = strategy.percent_of_equity, calc_on_every_tick = true)

// Simple EMA tracking
fastEMA = ta.ema(close, 5)
slowEMA = ta.ema (close, 20)
atr = ta.atr(14)

// We define entry price for future reference
var float entry_price = na
// We define stop and take profit for future calculations
var float stop_price = na
var float take_profit_price = na

// We define atr limtim its here
var float atr_down = na
var float atr_up = na
var float atr_current = na
var float atr_ref = na

avg = (low + high) / 2

// Conditions
enterCondition = ta.crossover(fastEMA, slowEMA)
var bool tookProfit = false
timePeriod = time >= timestamp(syminfo.timezone, 2021, 12, 15, 0, 0)
InTrade = strategy.position_size > 0

// Go long if conditions are met
if (enterCondition and timePeriod and not InTrade)
    // Calculate and update variables
    entry_price := avg
    atr_ref := atr
    atr_div = int((avg - entry_price) / atr_ref)
    atr_down := entry_price + (atr_ref * (atr_div - 1.5))
    atr_up := entry_price + (atr_ref * (atr_div + 1))
    atr_current := entry_price + (atr_ref * atr_div) 
    stop_price := (entry_price - (atr_ref * 1.5))
    take_profit_price := (entry_price + (atr_ref * 3))
    strategy.order("buy", strategy.long, qty = 2)

// Enter here if in position
if InTrade or tookProfit
    stopCondition = avg < stop_price
    takeProfitCondition = avg > take_profit_price

    if avg < atr_down
        stopCondition := true

    // Move stop price and exit price if price for each atr price increase
    if avg > atr_up
        if tookProfit
            atr_ref := atr
        atr_div = int((avg - entry_price) / atr_ref)
        atr_down := entry_price + (atr_ref * (atr_div - 1))
        atr_up := entry_price + (atr_ref * (atr_div + 1))
        atr_current := entry_price + (atr_ref * atr_div) 

    // Take half of the investment if current price is 3 atr higher than entry price
    if (takeProfitCondition and timePeriod and InTrade and not tookProfit)
        strategy.order("take_half_profit", strategy.short, qty = 1)
        tookProfit := true

    // Exit position if conditions are met and reset the variables
    if (stopCondition and timePeriod and InTrade)
        if tookProfit
            strategy.order("exit", strategy.short, qty = 1)
        else
            strategy.order("stop_loss", strategy.short, qty = 2)

        tookProfit := false

// Plot EMA's
plot(fastEMA, color = color.blue)
plot(slowEMA, color = color.yellow)

// Plot ATR Limit/Stop positions
profit_plot = plot(series = InTrade?atr_up:na, title = "profit", color = color.green, style=plot.style_linebr)
close_plot = plot(series = InTrade?atr_current:na, title = "close", color = color.white, style=plot.style_linebr)
stop_plot = plot(series = InTrade?atr_down:na, title = "stop_loss", color = color.red, style=plot.style_linebr)
fill(profit_plot, close_plot, color = color.new(color.green, 80))
fill(close_plot, stop_plot, color =color.new(color.red,80))
```

> Detail

https://www.fmz.com/strategy/428857

> Last Modified

2023-10-10 10:50:21
