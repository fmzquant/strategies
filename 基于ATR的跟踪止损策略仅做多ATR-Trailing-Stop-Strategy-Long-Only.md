
> Name

基于ATR的跟踪止损策略仅做多ATR-Trailing-Stop-Strategy-Long-Only

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b27c2ccb1840ef780e.png)


## Overview

This strategy uses two ATR stops with different parameters to set dynamic stop loss levels - one fast stop and one slow stop. It establishes long positions based on price breakouts of the different stop levels and exits positions using the trailing stops. The goal is to use ATR stops to set reasonable stop loss levels while maximizing the trend following ability.

## Strategy Logic

The strategy uses ATR indicator to calculate two stop loss levels. The fast stop uses 5-period ATR multiplied by 0.5 as the stop distance. The slow stop uses 10-period ATR multiplied by 3 as the stop distance. When price breaks above the fast stop level, a long position is established. When price continues to break above the slow stop level, the stop is adjusted to the slow stop level. If price turns down, the stop level is adjusted based on the crossover relationships. 

The logic is:

1. Calculate fast stop Trail1: 5-period ATR * 0.5

2. Calculate slow stop Trail2: 10-period ATR * 3 

3. When price breaks above Trail1, establish long position

4. When price continues to break above Trail2, adjust stop to Trail2

5. If price turns down breaking Trail1, adjust stop back to Trail1

6. If price continues down breaking Trail2, adjust stop to Trail2

7. Finally, if price hits the stop level, exit the position with stop loss

This way, the strategy can maximize the profit during uptrends with the trailing stops while quickly stopping out losses when the trend reverses. The two stops also balance between capturing trends and limiting losses.

## Advantages

1. ATR stops set dynamic stop loss levels based on market volatility

2. Dual stop mechanism balances between stopping losses and trailing trends

3. Long direction aligns with overall uptrend, higher profitability

4. Simple and clear logic, easy to understand and implement

5. Strict stop loss rules limit losses effectively

## Risks

1. Improper ATR parameters may cause stops being too wide or too tight

2. Long direction has directional bias, prone to stops at market tops

3. Dual stop rules are complex, may fail if not set properly

4. No filters such as EMA crossovers, may cause bad trades

5. No position or risk management, risks of overtrading

These risks can be reduced by optimizing ATR parameters, adding filters, and enforcing risk management.

## Improvement Areas

1. Optimize ATR parameter combinations for best results

2. Add filters like EMA to qualify entry signals

3. Incorporate indicators like Stoch RSI for additional edge

4. Add re-entry logic to optimize position management 

5. Optimize risk management rules to limit per trade stop loss

6. Incorporate market-level analytics to avoid directional mistakes

7. Consider faster timeframe strategies like hourly

8. Expand to multi-market universal strategy

9. Deploy high performance trading engine

With these improvements, the strategy can be more robust, stable and profitable.

## Summary

The strategy uses clear ATR trailing stops for long entries and exits. The advantages lie in its strict stop loss rules to limit losses while trailing trends. It has directional bias risks that can be reduced through optimizations like better parameters, adding filters and enhancing risk management. With further testing and improvements, this can become a reliable trend following strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|5|Fast ATR period|
|v_input_3|0.5|Fast ATR multiplier|
|v_input_4|10|Slow ATR period|
|v_input_5|3|Slow ATR multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-25 00:00:00
end: 2023-11-01 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("ATR Trailing Stop Strategy (Long Position Only)", overlay=true)

SC = input(close, "Source", input.source)

// Fast Trail
AP1 = input(5, "Fast ATR period", input.integer)
AF1 = input(0.5, "Fast ATR multiplier", input.float)
SL1 = AF1 * atr(AP1)
Trail1 = 0.0
Trail1 := iff(SC > nz(Trail1[1], 0) and SC[1] > nz(Trail1[1], 0), max(nz(Trail1[1], 0), SC - SL1), iff(SC < nz(Trail1[1], 0), SC + SL1, na))

// Slow Trail
AP2 = input(10, "Slow ATR period", input.integer)
AF2 = input(3, "Slow ATR multiplier", input.float)
SL2 = AF2 * atr(AP2)
Trail2 = 0.0
Trail2 := iff(SC > nz(Trail2[1], 0) and SC[1] > nz(Trail2[1], 0), max(nz(Trail2[1], 0), SC - SL2), iff(SC < nz(Trail2[1], 0), SC + SL2, na))

Green = Trail1 > Trail2 and close > Trail2 and low > Trail2

Buy = crossover(Trail1, Trail2)

plotshape(Buy, style=shape.triangleup, location=location.belowbar, color=color.green, size=size.small)

strategy.entry("Buy", strategy.long, when = Buy)

var float trailingStopPrice = na
if (Trail2 > trailingStopPrice)
    trailingStopPrice := Trail2

if (crossover(Trail1, Trail2))
    trailingStopPrice := Trail2

strategy.exit("Exit", from_entry = "Buy", stop=trailingStopPrice)

```

> Detail

https://www.fmz.com/strategy/430836

> Last Modified

2023-11-02 14:05:22
