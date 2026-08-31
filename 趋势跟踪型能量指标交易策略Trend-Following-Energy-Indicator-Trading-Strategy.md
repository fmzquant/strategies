
> Name

趋势跟踪型能量指标交易策略Trend-Following-Energy-Indicator-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/77457626432c7a9c0a.png)


## Overview

This strategy is a trend following strategy that trades based on the Smeared Variability Channel Index (Smeared VCI) indicator by vitelot. It combines the trend judgment of moving averages and the overbought/oversold judgment of VCI to capture the main trend direction of prices. When prices run into overbought or oversold status, reverse operations are taken to profit.

## Strategy Logic

The strategy uses vitelot's Smeared VCI indicator to determine the trend direction. Smeared VCI indicator is a smoothed VCI (Variability Channel Index). It consists of three parameters: fast EMA, slow EMA and smoothing period. When fast EMA is above slow EMA, it is bullish, otherwise it is bearish. The smoothing process filters out some noise.

There are two conditions set in the strategy:

1. Smeared VCI crossing above Trigger line is long signal, and crossing below is short signal.

2. Only trade within the backtest time window. 

When both conditions are met, long or short position will be taken. Exit when stop loss is triggered or reverse signal appears.

## Advantage Analysis

The advantages of this strategy are:

1. Using a trend following indicator, it can effectively track trends.

2. The smoothing process reduces false signals. 

3. Backtesting within a time window focuses on specific period.

4. Stop loss set controls risk.

5. Using indicator parameters for long/short decision makes the rules simple and clear.

## Risk Analysis

There are also some risks in this strategy:

1. Trend judgment may be wrong, leading to losses.

2. Improper indicator parameters setting may lead to poor profitability.

3. Too small stop loss setting may result in being stopped out quickly.

4. Improper backtest time window may lead to biased test results.

5. Too frequent long/short switching may bring about commission pressure.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Test different parameter combinations to find the optimal parameters.

2. Use other indicators for confirmation to improve accuracy.

3. Optimize the stop loss algorithm to achieve dynamic trailing stop loss. 

4. Optimize entry conditions to avoid overtrading.

5. Test longer time windows to verify stability. 

6. Incorporate other factors like volume to improve decision accuracy.

## Summary

In summary, this is a relatively simple trend following strategy. It uses the Smeared VCI indicator to determine trend direction and open positions when trading signals are generated. Risk is controlled by stop loss. The strategy has trend following capability but also has some risks. Further improvements can be made through parameter optimization, stop loss optimization and adding confirming conditions to make it a stable and reliable trading system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Fast EMA period|
|v_input_2|13|Slow EMA period|
|v_input_3|34|Smearing period|
|v_input_4|13|Trigger line period|
|v_input_5|300|SL Activation|
|v_input_6|true|SL Trigger|
|v_input_7|150|TP Activation|
|v_input_8|true|TP Trigger|
|v_input_9|true|From Month|
|v_input_10|true|From Day|
|v_input_11|2019|From Year|
|v_input_12|6|To Month|
|v_input_13|19|To Day|
|v_input_14|2030|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-15 00:00:00
end: 2023-11-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Smeared VCI Backtest", overlay=false, shorttitle="SVCI Backtest", default_qty_type = strategy.percent_of_equity, default_qty_value = 100, initial_capital = 10000, slippage = 5)
// Smeared Variability Channel Index
//    a variation of the VCI indicator of the same author.
// The orange line over the lime line is bullish;
// The lime line over the orange one is bearish.
//
// vitelot/yanez/Vts
// Feb 2019
//
src = close

ep1 = input(5, minval=1, title="Fast EMA period")
ep2 = input(13, minval=2, title="Slow EMA period")

sm = input(34, minval=1, title="Smearing period")
tp = input(13, minval=1, title="Trigger line period")

fixedSL = input(title="SL Activation", defval=300)
trailSL = input(title="SL Trigger", defval=1)
fixedTP = input(title="TP Activation", defval=150)
trailTP = input(title="TP Trigger", defval=1)

FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2019, title = "From Year", minval = 2017)
ToMonth   = input(defval = 6, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 19, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 2030, title = "To Year", minval = 2017)
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
startTimeOk()  => time >= start and time <= finish ? true : false // create function "within window of time" if statement true

atrP = 96

e1 = ema(src,ep1)
e2 = ema(src,ep2)

vci = (e1-e2)/atr(atrP)

svci = sma(vci,sm)
t = sma(svci,tp)

plot(svci, color=lime, linewidth=3, transp=0, title="Smeared VCI")
plot(t, color=orange, linewidth=3, transp=0, title="Trigger line")

hline(0, title="Reference line")

long = crossover(svci,t)
short = crossover(t,svci)

// === STRATEGY - LONG POSITION EXECUTION ===
strategy.entry("Long", strategy.long, when= long and startTimeOk())
strategy.exit("Exit", qty_percent = 100, loss=fixedSL, trail_offset=trailTP, trail_points=fixedTP) 
strategy.exit("Exit", when= short)
// === STRATEGY - SHORT POSITION EXECUTION ===
strategy.entry("Short", strategy.short, when= short and startTimeOk())
strategy.exit("Exit", qty_percent = 100, loss=fixedSL, trail_offset=trailTP, trail_points=fixedTP)
strategy.exit("Exit", when= long)
```

> Detail

https://www.fmz.com/strategy/432234

> Last Modified

2023-11-15 17:36:46
