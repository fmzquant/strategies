
> Name

指数平滑移动平均值结合尾随止损与百分比止损的股票量化交易策略Stock-Quant-Trading-Strategy-Combining-Exponential-Moving-Average-with-Trailing-Stop-Loss-and-Percentage-Stop-Loss

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d3147e559aec5cfb97.png)


## Overview

The core of this strategy is using exponential moving average crossovers as trading signals, combined with trailing stop loss and percentage stop loss to lock in profits and control risks. The strategy is simple to implement and applicable to stocks and other financial products for quantitative trading.  

## Strategy Logic

1. Calculate fast EMA and slow EMA, with fast EMA period being 20 days and slow EMA period being 50 days. Generate buy signal when fast EMA crosses above slow EMA, and sell signal when fast EMA crosses below slow EMA.

2. After entry, set up trailing stop loss based on holding direction, e.g. 7% for long position and 7% for short position. The trailing stop loss adjusts every bar to lock in the maximum possible profit.  

3. At the same time, set stop loss price based on entry price and holding direction, e.g. 2% below entry price for long trade and 2% above entry price for short trade. The stop loss price remains unchanged to prevent excessive loss.

4. Compare trailing stop price and stop loss price, use the one closer to market price as the final stop loss for this trade, send stop loss order.

## Advantages

1. Simple and easy to implement moving average trading signals. 

2. Trailing stop loss locks in profits to the largest extent possible, while avoiding unnecessary loss from false signals.

3. Percentage stop loss is intuitive and easy to adjust for controlling maximum loss per trade.  

4. Combining trailing stops and fixed stops both locks in profits and controls risks.

## Risks and Countermeasures   

1. Moving averages can generate false signals easily, add further filters like volume.

2. Trailing stops sometimes trigger too early, relax the trailing percentage a bit.  

3. Improper fixed stop loss setting can be too aggressive or conservative, need to test and tune the percentage parameter.

4. Mechanical stop loss exits could miss market reversal opportunities, incorporate technical indicators to judge stop trigger.

## Optimization Directions 

1. Try different EMA combinations to find optimal balance.

2. Add indicators like volume to filter false signals.  

3. Test more stocks to find suitable stop loss percentages.

4. Try adaptive stops that adjust with market conditions.

5. Incorporate indicators like RSI to determine stop loss timing.

## Summary

This strategy integrates moving average trading signals, trailing stops and percentage stops. Through parameter optimization, it can achieve stable profits with strict risk control across various stocks and commodities, worth researching and continuously improving for quant traders.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|Fast EMA period|
|v_input_int_2|50|Slow EMA period|
|v_input_float_1|7|Long Trailing Stop (%)|
|v_input_float_2|7|Short Trailing Stop (%)|
|v_input_float_3|2|Long Stop Loss (%)|
|v_input_float_4|2|Short Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-26 00:00:00
end: 2024-01-02 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © wouterpruym1828

//@version=5
strategy(title=" Combining Trailing Stop and Stop loss (% of instrument price)",
     overlay=true, pyramiding=1, shorttitle="TSL&SL%")

//INDICATOR SECTION

// Indicator Input options+
i_FastEMA = input.int(title = "Fast EMA period", minval = 0, defval = 20)
i_SlowEMA = input.int(title = "Slow EMA period", minval = 0, defval = 50)
     
// Calculate moving averages
fastEMA = ta.ema(close, i_FastEMA)
slowEMA = ta.ema(close, i_SlowEMA)

// Plot moving averages
plot(fastEMA, title="Fast SMA", color=color.blue)
plot(slowEMA, title="Slow SMA", color=color.orange)




//STRATEGY SECTION  

// Calculate trading conditions
buy  = ta.crossover(fastEMA, slowEMA)
sell = ta.crossunder(fastEMA, slowEMA)

// STEP 1:
// Configure trail stop loss level with input options (optional)

longTrailPerc = input.float(title="Long Trailing Stop (%)", minval=0.0, step=0.1, defval=7) * 0.01

shortTrailPerc = input.float(title="Short Trailing Stop (%)", minval=0.0, step=0.1, defval=7) * 0.01

//Configure stop loss level with input options (optional)

longStopPerc = input.float(title="Long Stop Loss (%)", minval=0.0, step=0.1, defval=2)*0.01

shortStopPerc = input.float(title="Short Stop Loss (%)", minval=0.0, step=0.1, defval=2)*0.01


// STEP 2:
// Determine trail stop loss prices
longTrailPrice = 0.0, shortTrailPrice = 0.0

longTrailPrice := if (strategy.position_size > 0)
    stopValue = high * (1 - longTrailPerc)
    math.max(stopValue, longTrailPrice[1])
else
    0

shortTrailPrice := if (strategy.position_size < 0)
    stopValue = low * (1 + shortTrailPerc)
    math.min(stopValue, shortTrailPrice[1])
else
    999999

// Determine stop loss prices
entryPrice = 0.0

entryPrice := strategy.opentrades.entry_price(strategy.opentrades - 1)


longLossPrice = entryPrice * (1 - longStopPerc)

shortLossPrice = entryPrice * (1 + shortStopPerc)


// Plot stop loss values for confirmation

plot(series=(strategy.position_size > 0) ? longTrailPrice : na,
     color=color.fuchsia, style=plot.style_cross,
     linewidth=2, title="Long Trail Stop")
plot(series=(strategy.position_size < 0) ? shortTrailPrice : na,
     color=color.fuchsia, style=plot.style_cross,
     linewidth=2, title="Short Trail Stop")

plot(series=(strategy.position_size > 0) ? longLossPrice : na,
     color=color.olive, style=plot.style_cross,
     linewidth=2, title="Long Stop Loss")
plot(series=(strategy.position_size < 0) ? shortLossPrice : na,
     color=color.olive, style=plot.style_cross,
     linewidth=2, title="Short Stop Loss")

// Submit entry orders
if (buy)
    strategy.entry("Buy", strategy.long)

if (sell)
    strategy.entry("Sell", strategy.short)


//Evaluating trailing stop or stop loss to use

longStopPrice = longTrailPrice < longLossPrice ? longLossPrice : longTrailPrice

shortStopPrice = shortTrailPrice > shortLossPrice ? shortLossPrice : shortTrailPrice

// STEP 3:
// Submit exit orders for stop price

if (strategy.position_size > 0)
    strategy.exit(id="Buy Stop", stop=longStopPrice)

if (strategy.position_size < 0)
    strategy.exit(id="Sell Stop", stop=shortStopPrice)

```

> Detail

https://www.fmz.com/strategy/437547

> Last Modified

2024-01-03 16:25:54
