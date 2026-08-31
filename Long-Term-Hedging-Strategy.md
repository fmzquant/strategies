
> Name

Long-Term-Hedging-Strategy

> Author

ChaoZhang

> Strategy Description



## Strategy Logic

This strategy determines asset allocation and hedging based on long-term trends.

The logic is:

1. Select a base asset, moving average period and resolution

2. Compute simple moving average of the asset

3. Price crossing above MA signals long-term bullishness, go long the asset

4. Price crossing below MA signals long-term bearishness, go short the asset 

5. Can also go long-only or short-only

6. Judge long-term trend using asset price versus its MA

7. Take opposing position for hedging short-term fluctuations

The strategy hedges near-term risks and focuses on the asset's secular trend, allowing steady gains.

## Advantages

- Simple MA system to determine long-term trend

- Long/short pairing effectively hedges systemic risks 

- Clear long and short signals

## Risks

- MA lags price movements

- Holding costs of long-term positions

- Needs risk management across multiple legs

## Summary

This strategy hedges using long-term and short-term asset combinations, emphasizing risk management. But MA lag and holding costs require consideration.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|BMFBOVESPA:IBOV|base|
|v_input_2|5|SMA Period|
|v_input_3|M|SMA Resolution|
|v_input_4|0|Strategy: Long/Short|Long Only|Short Only|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © danilogalisteu

//@version=4
strategy("Long Term L/S", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

base = input("BMFBOVESPA:IBOV")
period = input(5, 'SMA Period', input.integer)
resolution = input(title="SMA Resolution", type=input.resolution, defval='M')
strat = input(title="Strategy", defval="Long/Short", options=["Long Only", "Long/Short", "Short Only"])
strat_val = strat == "Long Only" ? 1 : strat == "Long/Short" ? 0 : -1

base_cl = security((base), resolution, close)
base_ma = sma(base_cl, period)

longCondition = crossover(base_cl, base_ma)
if (longCondition)
    if strat_val > -1
        strategy.entry("LONG", strategy.long)
    if strat_val < 1
        strategy.close("SHORT")

shortCondition = crossunder(base_cl, base_ma)
if (shortCondition)
    if strat_val > -1
        strategy.close("LONG")
    if strat_val < 1
        strategy.entry("SHORT", strategy.short)

//plot(longCondition?1:0, 'L', color.blue)
//plot(shortCondition?-1:0, 'S', color.red)
```

> Detail

https://www.fmz.com/strategy/426811

> Last Modified

2023-09-14 16:56:34
