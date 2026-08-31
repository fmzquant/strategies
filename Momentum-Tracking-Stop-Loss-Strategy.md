
> Name

Momentum-Tracking-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14771b41f66d320edae.png)


## Overview

This strategy is based on the Parabolic SAR indicator and incorporates a time window for backtesting to achieve a momentum tracking stop loss effect. It is mainly suitable for products with a strong trend, and dynamically adjusts the stop loss point to realize trend tracking stop loss.

## Strategy Logic

The strategy uses the Parabolic SAR (Parabolic Stop and Reverse) indicator as the main technical indicator. Parabolic SAR can provide very accurate reversal signals. When the price is in an uptrend, Parabolic SAR will keep moving up to track the uptrend. When the price starts to fall, Parabolic SAR will drop rapidly to provide stop loss signals.

The strategy first sets three parameters of Parabolic SAR, including the starting value, increment value and maximum value. It then calculates the value of Parabolic SAR. The strategy uses Parabolic SAR as the dynamic stop loss point. When the price rises, it goes long above Parabolic SAR; when the price breaks below Parabolic SAR, it closes the long position. Similarly, when the price falls, it goes short below Parabolic SAR; when the price breaks above Parabolic SAR, it closes the short position.

In this way, the strategy can track the trend when the price is trending, and quickly stop loss when the price reverses, completing a trading cycle.

## Advantage Analysis 

- Utilizes the high efficiency of Parabolic SAR to provide accurate long and short signals
- Parabolic SAR can respond quickly to price changes for timely stop loss
- Automatically adjusts stop loss points without manual intervention, avoiding missing stop loss opportunities  
- Allows deep customization of Parabolic SAR parameters to fit your own style
- Backtests on specified time windows to examine strategy performance in different market environments

## Risk Analysis

- Difficult to determine the optimal Parabolic SAR parameter combination, improper parameters may lead to overly aggressive or conservative stop loss
- Relies on a single indicator Parabolic SAR, prone to abnormal fluctuations
- More suitable for trending markets, may stop loss too frequently during consolidation
- Needs to select proper time windows for backtest, incomplete samples may lead to biased results  
- Backtest only considers historical data, cannot predict future price moves, live performance may differ from backtest results

## Optimization Directions

- Consider combining with other indicators to form an indicator portfolio for higher stability
- Add parameter optimization module to automatically optimize Parabolic SAR parameters
- Add position sizing and order management modules to control capital utilization of each trade
- Add stop loss method options like trailing stop loss, limit orders etc. to make the strategy more comprehensive
- Optimize time window selection to examine strategy robustness across different market environments 
- Add machine learning module to dynamically optimize strategy parameters via AI

## Summary

The strategy fully utilizes the efficient stop loss function of the Parabolic SAR indicator to achieve momentum tracking stop loss effect. Compared to fixed stop loss points, it can adjust dynamically and automatically track trends for stop loss, avoiding prematurely stopped out positions. Meanwhile, the risks of the strategy cannot be neglected, and need multi-dimensional optimizations and enhancements for stable performance across different markets. Overall, it provides a significantly effective way of stop loss for trend tracking, and is worth further research and application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.02|start|
|v_input_2|0.02|increment|
|v_input_3|0.2|maximum|
|v_input_4|true|From Day|
|v_input_5|true|From Month|
|v_input_6|2018|From Year|
|v_input_7|true|To Day|
|v_input_8|12|To Month|
|v_input_9|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-26 00:00:00
end: 2023-10-26 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// === by @Aldovitch ===
// PSAR Strategy
// Based on Parabolic SAR Strategy provided by TradingView
// added a Time Window for Backtests
// 
strategy("Parabolic SAR Strategy w/ Time Window", shorttitle="PSAR Strategy w/ TW", overlay=true)

// === INPUT INDEXES PARAMETERS ===
start = input(0.02)
increment = input(0.02)
maximum = input(0.2)

// === INPUT BACKTEST RANGE ===
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromYear  = input(defval = 2018, title = "From Year", minval = 2016)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToMonth   = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
ToYear    = input(defval = 9999, title = "To Year", minval = 2017)


// === CONTROL & APPEARENCE ===
timeStart     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
timeFinish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window

// === FUNCTIONS ===
window()  => true // create function "within window of time"


// === COMPUTING INDEXES ===
psar = sar(start, increment, maximum)


if (psar > high)
    strategy.entry("ParLE", strategy.long, stop=psar, comment="ParLE", when=window())
else
    strategy.cancel("ParLE")

if (psar < low)
    strategy.entry("ParSE", strategy.short, stop=psar, comment="ParSE", when=window())
else
    strategy.cancel("ParSE")

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/430329

> Last Modified

2023-10-27 11:23:18
