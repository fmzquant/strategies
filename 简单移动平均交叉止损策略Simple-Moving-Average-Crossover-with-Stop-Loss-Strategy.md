
> Name

简单移动平均交叉止损策略Simple-Moving-Average-Crossover-with-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy generates trading signals by crossover between Simple Moving Average and Volume Weighted Average Price, and uses Exponential Moving Average as stop loss, belonging to short-term trend following trading strategies.

## Strategy Logic

1. Calculate 5-day Simple Moving Average (SMA) and Volume Weighted Average Price (VWAP).

2. When SMA crosses above VWAP from below, generate long signal; when crossing below from above, generate short signal.

3. SMA is sensitive to price changes and can capture short-term trends. VWAP reflects latest price dynamics. Their crossover identifies short-term trend changes.

4. Set 9-day Exponential Moving Average (EMA) as stop loss. EMA reacts slower than SMA, providing stop loss buffer. 

5. Execute trades on long/short signals. Exit when price drops below stop loss to control risks.

The strategy mainly uses the crossover of the fast-reacting SMA and realtime VWAP to capture short-term price fluctuations, with EMA trailing stop to manage risks, simple and intuitive.

## Advantage Analysis  

1. SMA and VWAP crossover is simple and effective for short-term trend changes.

2. EMA stop loss provides buffer avoiding premature stop out.

3. Clear signals and simple rules, easy to execute.

4. Large optimization space, adjustable to different market environments. 

5. Can modify stop loss mechanism to control single trade loss amount.

6. Easy to expand, can introduce other technical indicators or risk management techniques.

## Risk Analysis

1. SMA and VWAP crossover may have lags or wrong signals.

2. Stop loss range too tight risks over-optimization. Real trading should watch for stop loss breaches.

3. Only applicable for short-term ranges, cannot track long-term trends.

4. Improper backtest period risks curve fitting.

5. Need to consider trading cost impact on profitability.

## Optimization Directions  

1. Test different parameter combinations for SMA and VWAP.

2. Optimize EMA stop loss period parameter.

3. Try other MA types or indicators for stop loss.

4. Add position sizing and risk management strategies.

5. Introduce machine learning algorithms for parameter optimization.

6. Evaluate periodically adjusting parameters to adapt to market changes.

## Summary

This SMA and VWAP crossover strategy with EMA trailing stop can be adjusted for short-term fluctuations via parameters, simple to operate, a typical short-term tracking strategy idea. Adding more indicators or algorithms can improve stability, also usable as a module integrated into more complex multi-strategy systems. Overall an easy to use strategy with great inspirational value for practical trading.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-09-18 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © realisticDove62527

//@version=5
strategy("ROoT", overlay=true, margin_long=1, margin_short=1)

longCondition = ta.crossover(ta.sma(close, 5), ta.vwap(hlc3))
if (longCondition)
    strategy.entry("BUY", strategy.long)

shortCondition = ta.crossunder(ta.sma(close, 5), ta.vwap(hlc3))
if (shortCondition)
    strategy.entry("SELL", strategy.short)
    

stoploss = ta.ema(close, 9)


```

> Detail

https://www.fmz.com/strategy/427307

> Last Modified

2023-09-19 21:42:30
