
> Name

Dual-Moving-Average-Crossover-Combined-with-RSI-Indicator-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/150b97cd28da910a46f.png)

## Overview

This strategy combines dual moving average crossover and RSI indicator to identify trend direction and overbought/oversold situations. It goes long when the buying conditions are met and closes positions when the selling conditions are triggered. The goal is to use moving average crossover to determine trend direction while utilizing RSI indicator to avoid wrongly buying at tops and selling at bottoms, thus generating better profits.

## Strategy Logic  

When the fast 9-period moving average crosses above the slow 50-period moving average, it signals an uptrend in shorter timeframe overlapping with an uptrend in longer timeframe, which is a typical bullish signal. Meanwhile, if RSI is greater than the previous period by 5 points and less than 70, it means the asset is approaching but not yet in the overbought territory, making it a good timing to go long.

When the fast 9-period moving average crosses below the slow 50-period moving average, it signals the beginning of a bearish market and existing long positions should be closed.

## Advantage Analysis

- Dual moving averages help determine overall market direction and avoid false breakout
- RSI indicator prevents wrong moves at turning points  
- Flexibility in adjusting moving average periods to suit different symbols and timeframes
- Controllable stop loss strategy

## Risk Analysis  

- Crossover signal may lag and cause some losses
- Improper RSI parameter setting may miss best entry timing
- Need to watch trading volume to see if it supports price move
- Black swan events require manual intervention 

## Optimization Directions

- Optimize RSI parameters for best results
- Incorporate trading volume to avoid false signals
- Test optimal moving average periods based on symbol and timeframe
- Loosen stop loss to avoid being stopped out early

## Summary

This strategy utilizes dual moving average crossover to determine direction and RSI to avoid chasing tops and bottoms. It can effectively ride medium- to long-term trends for steady profits. But the lagging nature of crossover signals and tuning of RSI parameters should be watched out for. Also need to correlate price with volume. With continuous testing and optimization, this strategy shows promise for even better results.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Show Date Range|
|v_input_2|14|length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-14 00:00:00
end: 2023-11-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © joshuajcoop01

//@version=5
strategy("Bitpanda Coinrule Template",
         overlay=true,
         initial_capital=1000,
         process_orders_on_close=true,
         default_qty_type=strategy.percent_of_equity,
         default_qty_value=30,
         commission_type=strategy.commission.percent,
         commission_value=0.1)

showDate = input(defval=true, title='Show Date Range')
timePeriod = time >= timestamp(syminfo.timezone, 2020, 1, 1, 0, 0)
notInTrade = strategy.position_size <= 0


// RSI
length = input(14)
vrsi = ta.rsi(close, length)

// Moving  Averages for Buy Condition
buyFastEMA = ta.ema(close, 9)
buySlowEMA = ta.ema(close, 50)
buyCondition1 = ta.crossover(buyFastEMA, buySlowEMA)


increase = 5
if ((vrsi > vrsi[1]+increase) and buyCondition1 and vrsi < 70 and timePeriod)
    strategy.entry("Long", strategy.long)


// Moving  Averages for Sell Condition
sellFastEMA = ta.ema(close, 9)
sellSlowEMA = ta.ema(close, 50)
plot(request.security(syminfo.tickerid, "60", sellFastEMA), color = color.blue)
plot(request.security(syminfo.tickerid, "60", sellSlowEMA), color = color.green)


condition = ta.crossover(sellSlowEMA, sellFastEMA)
//sellCondition1 = request.security(syminfo.tickerid, "60", condition)

strategy.close('Long', when = condition and timePeriod)




```

> Detail

https://www.fmz.com/strategy/432767

> Last Modified

2023-11-21 12:09:50
