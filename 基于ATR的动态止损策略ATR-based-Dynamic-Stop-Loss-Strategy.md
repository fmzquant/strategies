
> Name

基于ATR的动态止损策略ATR-based-Dynamic-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略运用ATR指标设定动态止损点,根据价格波动幅度调整止损位置,实现风险控制。策略主要通过5日EMA和20日EMA形成金叉做多入场,然后利用ATR指标设定止损位置和止盈位置。止损位置会根据价格波动情况进行调整,从而锁定更多利润。

## 策略原理

该策略首先判断5日EMA上穿20日EMA形成金叉时做多入场。入场后,利用ATR指标计算入场价距离当前价格的ATR倍数,设定止损位置为入场价下方1.5ATR处。然后随着价格上涨,逐步抬高止损位置,如果价格上涨超过入场价3ATR,则部分止盈。

具体来说,策略会定义以下变量:

- entry_price:入场价
- stop_price:止损价格 
- take_profit_price:止盈价格
- atr_down:下方ATR线
- atr_up:上方ATR线
- atr_current:当前ATR线
- atr_ref:ATR数值

入场后会计算atr_ref为当前ATR数值,atr_div为入场价距当前价格的ATR倍数。然后根据atr_div设定atr_down、atr_current和atr_up的位置。止损价格stop_price为入场价下方1.5ATR。

随着价格上涨,通过比较当前价格avg和atr_up,如果avg上穿atr_up,则重新计算atr_div和atr对应的位置,从而将止损线逐步抬高,增加持仓利润。

如果价格超过入场价3ATR,则会部分平仓以锁定利润,此时tookProfit标志置为true。之后如果价格继续上涨,会继续抬高止损位置。如果触发止损,则会判断tookProfit,如果之前已经部分止盈,则仅平掉剩余头寸,否则全仓平掉。

## 策略优势

1. 利用ATR指标动态调整止损位置,可以根据市场波动程度来设定合理的止损距离。

2. 在亏损有限的情况下,跟随趋势运行切割利润。止损线会逐步抬高,让利润不断累积。

3. 部分止盈机制可以锁定部分利润,减少风险。之后止损位置继续抬高,让利润继续运行。

## 策略风险

1. ATR指标对异常突破不敏感,无法应对gaps带来的风险。

2. EMA指标无法判断趋势反转,可能在趋势反转时又进入新的头寸。

3. 部分止盈后再反转亏损的概率较大。

4. 参数优化不足,1.5ATR止损和3ATR止盈需要根据不同品种调整。

## 策略优化

1. 可以考虑加入其他止损指标,如Donchian通道等,防止ATR指标的滞后。

2. 可以测试不同的均线指标,或加入MACD等判断趋势反转。

3. 可以优化部分止盈的比例和次数,不同品种可以有不同设置。

4. 增加参数优化,测试不同ATR倍数的止损止盈效果。加入步进止损止盈功能。

5. 测试在趋势较弱时的表现,可考虑仅在趋势较强时启用该策略。

## 总结

该策略整体思路清晰易懂,利用ATR指标动态调整止损实现交易风险控制是其最大优势。但ATR指标本身存在滞后性,且参数设置需要优化。加入其他止损和趋势判断指标将是改进方向。此外,部分止盈机制也需要根据不同品种进行优化测试。总体来说,该策略提供了一种利用ATR进行止损管理的思路,但需要进一步优化与完善。

||


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

[/trans]



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
