
> Name

Turtle-Trend-Trading-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1159e7bae47b549394f.png)

## Overview

This strategy is the actual code implementation of the famous Turtle trading system, using a 55-period channel for entry signals and a 20-period channel for exit signals to track longer-term trends, belonging to the trend-following strategy type.

## Strategy Logic  

The strategy is mainly based on two indicators: the 55-period highest price (HI) and lowest price (LO) to construct the entry channel, and the 20-period highest price (hi) and lowest price (lo) to construct the exit channel.

When the price breaks above the 55-period channel, a buy signal is generated; when the price breaks below the 55-period channel, a sell signal is generated. This is the typical trend-following entry logic.  

When the price breaks below the 20-period channel, long positions are closed; when the price breaks above the 20-period channel, short positions are closed. This is the exit logic of the strategy.

The strategy also plots the 55-period channel and 20-period channel, which can visually see the entry and exit points of the strategy.

## Advantage Analysis   

The main advantages of this strategy are:

1. Tracking mid-to-long-term trends with relatively small drawdowns  
2. Clear entry signals using channel principle and good drawdown control   
3. Strict exit mechanism to avoid losses from reversals
4. Simple parameter settings, easy to implement

## Risk Analysis  

There are also some risks with this strategy:  

1. Unable to capture short-term opportunities, relatively weak profitability
2. Unable to cope with sudden events, prone to stop loss
3. Cannot effectively control excessive losses in one-way markets  
4. Very sensitive to parameters  

The risks can be reduced through:

1. Parameter optimization to find optimal combinations  
2. Adding stop loss strategies to control one-way market losses
3. Combining other indicators to identify potential reversal opportunities  

## Optimization Directions   

The strategy can be optimized in several aspects:

1. Optimize parameters of entry and exit channels to find optimal combination
2. Add volatility indicators to avoid choppy markets  
3. Combine trading volume indicators to ensure amplified volumes on entry signals  
4. Add moving stop loss strategies to follow dynamic stop loss lines
5. Combine multiple timeframes for comprehensive multi-timeframe trading

## Conclusion  

In summary, this is a very typical trend-following strategy, using channels to capture mid-to-long term trends with good drawdown control. It also has some typical issues of trend-following strategies, like insufficient trend capturing ability and difficulty dealing with reversals. With comprehensive optimizations, the advantages can be fully realized to become a reliable quantitative strategy.
> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|55|Entry Length|
|v_input_2|20|Exit Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-19 00:00:00
end: 2023-12-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © racer8
//@version=4
strategy("Turtle System", overlay=true)

n = input(55,"Entry Length")
e = input(20,"Exit Length")

HI = highest(n)
LO = lowest(n)
hi = highest(e)
lo = lowest(e)

if close>HI[1]
    strategy.entry("Buy", strategy.long)

if close<LO[1]
    strategy.entry("Sell", strategy.short)
    
if low<lo[1]
    strategy.close("Buy")

if high>hi[1]
    strategy.close("Sell")

plot(HI,color=color.lime)
plot(LO,color=color.red)
plot(hi,color=color.blue)
plot(lo,color=color.maroon)

```

> Detail

https://www.fmz.com/strategy/435960

> Last Modified

2023-12-20 14:16:48
