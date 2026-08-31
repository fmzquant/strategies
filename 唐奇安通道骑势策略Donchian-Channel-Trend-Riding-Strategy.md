
> Name

唐奇安通道骑势策略Donchian-Channel-Trend-Riding-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fc8c9c2bc4162f2148.png)

## Overview

The Donchian Channel Trend Riding Strategy is a trend following strategy. It uses Donchian Channel to identify market trend direction and enters the market when a trend signal is generated to capture as much of the trend movement as possible. Meanwhile, it incorporates long period moving average to filter out false signals. Stop loss is set at the lower band of the channel to effectively control risks.

## Strategy Logic

The strategy is mainly based on the Donchian Channel. The Donchian Channel consists of an upper band, a lower band and a middle band. The upper band is the highest high over the past n days, the lower band is the lowest low over the past n days, and the middle band is the average of the upper and lower bands. A buy signal is generated when price breaks above the upper band. A sell signal is generated when price breaks below the lower band.

The strategy first calculates the 20-day Donchian Channel, including the upper band, lower band and middle band. It then checks if price breaks through the channel bands. If close price breaks above 200-day moving average AND close price breaks above upper band, a long signal is generated. If close price breaks below 200-day moving average AND close price breaks below lower band, a short signal is generated.

After entering long positions, stop loss is set at the lower band. After entering short positions, stop loss is set at the upper band.

## Advantage Analysis 

The strategy has the following advantages:

1. It can effectively identify market trend directions. Donchian Channel makes trend identification clear.

2. Combining with long period moving average helps filtering out false signals effectively. The long period MA ensures that signals are only generated along the major trend direction.  

3. Stop loss set at channel bands allows quick exit and effective risk control.

4. The strategy logic is simple and clear, easy to understand and implement.

## Risk Analysis

The strategy also has some risks:

1. Trend reversal risk. Sudden trend reversal may cause huge loss.  

2. Parameter optimization risk. Parameters of Donchian Channel need constant testing and optimization, otherwise it may affect strategy performance.

3. Excessive trading frequency risk. Donchian Channel tends to generate more frequent trading signals.  

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Add more indicators for signal filtering, e.g. candlestick patterns, volatility indicators etc, to avoid false signals.

2. Parameter optimization. Optimize parameters like channel length to find the optimal parameter combination.  

3. Adopt adaptive stop loss method according to market volatility and risk control needs.  

4. Classify signals and adopt different stop loss levels to differentiate strong and weak signals.

## Conclusion

In general, the Donchian Channel Trend Riding Strategy is a relatively simple and practical trend following strategy. It can effectively identify market trend directions and capture most of the trend movements. Meanwhile, long period moving average and channel bands stop loss help control risks. The strategy has large room for optimization in aspects like parameter tuning, signal filtering and stop loss methods etc, in order to achieve better performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|length|
|v_input_2|0|Long Entry: Higher High|Basis|
|v_input_3|0|Short Entry: Lower Low|Basis|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-26 00:00:00
end: 2024-02-16 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © pratyush_trades

//@version=4
strategy("Donchian Channel Strategy", overlay=true)

length = input(20)
longRule = input("Higher High", "Long Entry", options=["Higher High", "Basis"])
shortRule = input("Lower Low", "Short Entry", options=["Lower Low", "Basis"])

hh = highest(high, length)
ll = lowest(low, length)

up = plot(hh, 'Upper Band', color = color.green)
dw = plot(ll, 'Lower Band', color = color.red)
mid = (hh + ll) / 2
midPlot = plot(mid, 'Basis', color = color.orange)
fill(up, midPlot, color=color.green, transp = 95)
fill(dw, midPlot, color=color.red, transp = 95)

if (close>ema(close,200))
    if (not na(close[length]))
        strategy.entry("Long", strategy.long, stop=longRule=='Basis' ? mid : hh)

if (close<ema(close,200))
    if (not na(close[length]))
        strategy.entry("Short", strategy.short, stop=shortRule=='Basis' ? mid : ll)

if (strategy.position_size>0)
    strategy.exit(id="Longs Exit",stop=ll)

if (strategy.position_size<0)
    strategy.exit(id="Shorts Exit",stop=hh)
```

> Detail

https://www.fmz.com/strategy/442870

> Last Modified

2024-02-26 17:31:45
