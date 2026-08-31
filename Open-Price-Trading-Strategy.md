
> Name

Open-Price-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

 

## Overview

This strategy judges future price direction by calculating the ratio between open and close prices. Ratio below 1 signals long, above 1 signals short. It is suitable for short-term trading.

## Strategy Logic 

The core indicator is the open/close price ratio:

`x = open / close`

Ratio below 1 means close > open, long signal. Ratio above 1 means open > close, short signal. 

To smooth signals, take average ratio of past N bars. Average below 1 for long, above 1 for short.

## Advantages

- Uses only two basic prices, very simple.

- No complex indicators, low computing needs.

- Only focuses on open/close prices, filtering noise.

- Good for short scalping with fast entry/exit.

- High capital efficiency for larger position sizes.

## Risks

- Prone to false signals, relies solely on open/close prices.

- No trend direction, risks reversals. 

- High frequency short-term trades increase fees.

- Large positions can lead to big losses and drawdowns.

Improvements:

1. Add filters like volume to validate signals.

2. Incorporate trend indicators for direction. 

3. Implement stop loss/profit taking to limit loss per trade.

4. Optimize position sizing based on prior performance.

## Optimization 

Ways to optimize the strategy:

1. Add more filters or conditions to screen signals.

2. Combine with trend indicators for overall direction.

3. Optimize parameters for better trade frequency.

4. Add stop loss and take profit for risk control.

5. Incorporate position sizing based on performance.

## Summary

The logic is simple but has blind trading risks. Enhancing signal filters, trend direction, stops can improve stability. Overall has potential value for improvements.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-14 00:00:00
end: 2023-09-21 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("PerfectStrategy", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 10)
 

x = ((open[1])/(close[1]))
x1 = ((open[2])/(close[2]))
x2= ((open[3])/(close[3]))
x3 = ((open[4])/(close[4]))
x4 = ((open[5])/(close[5]))
x5 = ((open[6])/(close[6]))
x6 = ((open[7])/(close[7]))
x7 = ((open[8])/(close[8]))
x8 = ((open[9])/(close[9]))

y = (x+x1+x2+x3+x4+x5+x6+x7+x8)/9
if (y < 1 )
    strategy.entry("Up", strategy.long)

if (y > 1)
    strategy.entry("Down", strategy.short)

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/427614

> Last Modified

2023-09-22 17:00:25
