
> Name

Trend-Tracking-Maximized-Profit-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy calculates the moving average and standard deviation CHANNEL of the price to form dynamic upper and lower rails, and combines the average value of the highest and lowest prices to form the middle rail, so as to judge the current trend direction. When the price breaks through the upper rail, it means long. When the price breaks through the lower rail, it means short. This implements a strategy that trades based on trend changes.

## Strategy Logic

1. Calculate the 20-day simple moving average of close as the basis for the middle reference line
2. Calculate the 20-day standard deviation of close as the basis for the distance between the upper and lower rails and the middle rail 
3. The middle rail basis ± 2\*dev determines the upper rail upper and the lower rail lower
4. Calculate the average value of the highest upper2 and lowest lower2 prices in the most recent 20 days as the basis2 for the second middle rail
5. Take the average value MB of the above two middle rails as the final middle rail
6. When close is greater than the middle rail MB, it is a long signal. When MB is greater than close, it is a short signal
7. Determine the long and short direction according to the signal to track the trend and profit

## Advantage Analysis 

1. Using dynamic standard deviation Channel can quickly capture price trend changes
2. Combining the information of the highest and lowest prices, the middle rail is more meaningful
3. The double middle rail design makes the signal more accurate and reliable
4. The strategy idea is simple and clear, easy to understand and implement
5. There are few configurable parameters, suitable for various market environments

## Risk Analysis

1. When trading at breakouts of the upper or lower rail, stop loss strategies need to be considered to control single loss
2. The trading frequency may be high, and the impact of commissions needs to be considered
3. Parameters like period parameters need to be carefully optimized to avoid overfitting
4. When the trend changes, there is a possibility of wrong trading signals
5. Proper capital management is required, excessive leverage should not be used

## Optimization Directions

1. Consider adding filters when breaking through the upper and lower rails to avoid false breakouts
2. Set dynamic exits based on ATR and other indicators 
3. Incorporate trading volume information to verify the reliability of breakout signals
4. Optimize Parameters like calculation cycle to adapt to more market environments
5. Consider setting position size to control the risk of single loss

## Summary

The overall idea of this strategy is clear and easy to understand. By dynamically capturing trends through Channel and generating trading signals with multiple middle rail designs, it can effectively track trend directions for trading and obtain good returns. In actual application, attention should be paid to stop loss strategies, capital management, Parameters optimization, etc., so as to obtain stable returns in the long run.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-10-10 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ErdemDemir

//@version=4
strategy("Lawyers Trend Pro Strategy", shorttitle="Lawyers Trend Pro Strategy", overlay=true)

src = close
mult = 2.0
basis = sma(src, 20)
dev = mult * stdev(src, 20)
upper = basis + dev
lower = basis - dev
offset = 0


lower2 = lowest(20)
upper2 = highest(20)
basis2 = avg(upper2, lower2)


MB= (basis+basis2)/2





col1=close>MB
col3=MB>close
colorE = col1 ? color.blue : col3 ? color.red : color.yellow
p3=plot(MB, color=colorE, linewidth=3)

// Deternine if we are currently LONG
isLong = false
isLong := nz(isLong[1], false)

// Determine if we are currently SHORT
isShort = false
isShort := nz(isShort[1], false)

// Buy only if the buy signal is triggered and we are not already long
buySignal = not isLong and crossover(close,MB)

// Sell only if the sell signal is triggered and we are not already short
sellSignal= not isShort and crossover(MB,close)
if (buySignal)
    isLong := true
    isShort := false

if (sellSignal)
    isLong := false
    isShort := true







/// LONG
strategy.entry("long", true , when = buySignal, comment="Open Long")

strategy.close("long", when=sellSignal, comment = "Close Long")

/// SHORT
strategy.entry("short", false,  when = sellSignal, comment="Open Short")

strategy.close("short", when=buySignal, comment = "Close Short")


```

> Detail

https://www.fmz.com/strategy/428966

> Last Modified

2023-10-11 14:38:40
