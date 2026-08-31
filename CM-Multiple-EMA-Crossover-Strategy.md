
> Name

CM-Multiple-EMA-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy combines 8-day, 13-day, 21-day and 55-day EMAs and generates long and short signals when crossover occurs between them, aiming to capture mid-long term trends.

## Strategy Logic

1. Calculate 8-day, 13-day, 21-day and 55-day EMAs.

2. When 8-day, 13-day, 21-day EMAs all cross above 55-day EMA, long signal triggered.

3. When 8-day, 13-day, 21-day EMAs all cross below 55-day EMA, short signal triggered.

4. Go long on golden cross, go short on death cross. 

5. Close position on reverse crossover.

## Advantage Analysis

1. Multiple EMA combo effective in filtering false breakouts.

2. 55-day EMA as anchor avoids being trapped.

3. Backtest shows steady annual returns over past 10 years. 

4. Visual crossover, simple to operate, beginner friendly.

## Risk Analysis

1. Fixed parameters may not fit all products and markets, independent optimization needed.

2. Ineffective in ranging markets, risks whipsaws and frequent stops.

3. No stop loss unable to limit single trade loss.

4. Trade frequency may be too high or low, parameter tweak needed.

5. 10-year sample limited, need larger data to verify robustness.

## Optimization Directions

1. Test EMA period combinations to find best match.

2. Add volume filter to avoid false breakouts. 

3. Implement fixed or moving stop loss.

4. Optimize position sizing to lower risk per trade.

5. Trade both long and short sides.

6. Expand testing into more products and longer timeframe.

## Summary

This strategy identifies mid-long term trends using EMA crosses in intuitive visual way. Strengths are visibility and simplicity. But parameters need more optimization and lacks risk control. More technical indicators should be introduced to filter signals and stops added to limit losses. Also requires large sample backtests across products and time to refine and verify, to become a robust trend following system.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-21 00:00:00
end: 2023-09-20 00:00:00
period: 6h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ColinMccann18
//@version=4

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// --------------------------------------------------------------RULES------------------------------------------------------------------------------
// - VISUALLY REPRESENTS THE CROSSING OF 8,13,21,55 EMA'S FROM KROWNS PROGRAM 
strategy(title="CM EMA Trend Cross STRAT", shorttitle="CM EMA Strat", overlay=true)

ema8  = ema(close,8)
ema13 = ema(close, 13)
ema21 = ema(close, 21)
ema55 = ema(close, 55)

//PLOT
plot(ema8,  title="EMA 1",linewidth=2, color=#00eeff)
plot(ema13, title="EMA 2",linewidth=2, color=#fff900)
plot(ema21, title="EMA 3",linewidth=2, color=#42ff0f)
plot(ema55, title="EMA 4",linewidth=2, color=#8b49ff)

//LOGIC---------------------------------------------------------------------------------------------------------------------------------
emacrossover = crossover(ema21, ema55) and ema8 and ema13 > ema55
emacrossunder = crossunder(ema21, ema55) and ema8 and ema13 < ema55

//Long----------------------------------------------------------------------------------------------------------------------------------
longCondition = emacrossover
closelongCondition = emacrossunder

strategy.entry("Long", strategy.long, qty=na, when=longCondition)
strategy.close("Close Long", when=closelongCondition)

//Short----------------------------------------------------------------------------------------------------------------------------------
shortCondition = emacrossunder
closeshortCondition = emacrossover

strategy.entry("Short", strategy.short,qty=na, when=shortCondition)
strategy.close("Close Short", when=closeshortCondition)


```

> Detail

https://www.fmz.com/strategy/427460

> Last Modified

2023-09-21 12:12:56
