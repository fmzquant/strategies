
> Name

基于HULL-SMA和EMA交叉的趋势策略Trend-Strategy-Based-on-HULL-SMA-and-EMA-Crossover

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ebb708c9919b59d40c.png)



## Overview

This strategy generates buy and sell signals by calculating the crossover between the HULL Smoothed Moving Average line and the Exponential Moving Average line to determine market trend direction. It belongs to the category of medium-term trend-following strategies.

## Strategy Logic

1. Calculate the 5-period HULL Smoothed Moving Average (HULL SMA). HULL SMA responds faster to price changes by using weighted moving averages and the square root of the period. 

2. Calculate the 5-period Exponential Moving Average (EMA). EMA gives more weight to recent prices and is more sensitive than SMA in tracking the trend.

3. Generate buy and sell signals based on the crossover between HULL SMA and EMA.

  - When HULL SMA crosses above EMA, a buy signal is generated, indicating the short-term trend breaks out above the long-term trend, suggesting an upward price movement.  

  - When HULL SMA crosses below EMA, a sell signal is generated, indicating the short-term trend turning down, suggesting a downward price movement.

4. Use HULL SMA as the fast line and EMA as the slow line to determine changes in short-term and medium-term trends based on the crossover, generating trading signals. 

## Advantage Analysis  

1. HULL SMA is sensitive to price changes and can detect trend changes earlier.

2. EMA smoothes market noise and tracks long-term trends.

3. Crossover signals catch trend turning points in a timely manner.

4. Parameters can be adjusted for different trading timeframes.  

5. Captures upside and downside trends flexibly.

## Risk Analysis

1. More false signals may occur during range-bound markets.

2. Unable to determine trend strength, may lead to repeated losses in weak trends.

3. Price movements between the averaging intervals may be missed.  

4. Improper parameter settings affect signal quality.

5. High trading frequency increases costs and slippage risks.

Improvements can be made via signal filtering, evaluating trend strength, parameter optimization, risk management, etc.

## Optimization Directions

1. Add indicators like MACD, RSI for signal confirmation.

2. Incorporate trend strength indicators like ADX to avoid trading weak trends.

3. Optimize moving average parameters for best combinations. 

4. Implement stop loss to control single trade loss.

5. Manage trade frequency and costs.

6. Incorporate multi-timeframe analysis to identify cross-cycle trends.

7. Develop auto parameter optimization programs.

## Summary

This strategy judges the trend based on the crossover between the fast HULL SMA and slow EMA. It is a typical moving average crossover system. Compared to traditional moving averages, the more responsive HULL SMA provides earlier trend change detection. But parameters and supplemental indicators should be optimized to reduce false signals. With proper risk and money management, this strategy can be an efficient medium-term trend following system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|5|Hull EMA Value|
|v_input_1|5|EMA Value|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-23 00:00:00
end: 2023-10-29 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("HULL EMA Crossover", overlay = true, process_orders_on_close = true)

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © spiritedPerson95700

inSession = true


HULL_INP = input.int(5, "Hull EMA Value")
EMA_INP = input(5, "EMA Value")

/// Indicator
HULL_EMA = ta.hma(close, HULL_INP)
EMA = ta.ema(close, EMA_INP)

prevSignal = ''
if (prevSignal == '')  
    prevSignal := HULL_EMA > EMA ? 'buy' : 'sell'

/// buy and sell signal
buy = ta.crossover(HULL_EMA, EMA)
short = ta.crossover(EMA, HULL_EMA)

sell = short
cover = buy

if inSession
    if buy 
        prevSignal := 'na'
        strategy.entry("long", direction = strategy.long, comment = "Buy")

    if sell
        prevSignal := 'na'
        strategy.close("long", comment = "Sell")

    if short
        strategy.entry("short", direction = strategy.short, comment = "Short")

    if cover
        strategy.close("short", comment = "Cover")


plot(HULL_EMA, color = color.green)
plot(EMA, color = color.blue)

// if ( hour(time) == 15 and minute(time) > 25  )  
//     strategy.close("long", comment="EOD")
//     strategy.close("short", comment="EOD")
//     buy := false
//     sell := false
//     prevSignal := ''

```

> Detail

https://www.fmz.com/strategy/430563

> Last Modified

2023-10-30 14:36:25
