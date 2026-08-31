
> Name

RSI-Mean-Reversion-Quantitative-Trading-Strategy-Based-on-RSI-Average-Crossing

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c9335e0e96d064a96e.png)


## Overview

This strategy determines buy and sell signals based on the crossing between RSI indicator and its moving average, belonging to short-term trading strategies. It will buy when RSI is lower than its MA and sell when RSI is higher than its MA, which is a typical low-buying-high-selling strategy.

## Strategy Principle  

1. Calculate RSI indicator with a period of 40 bars
2. Calculate the MA of RSI indicator, with period of 10 bars
3. Generate buy signal when RSI is lower than its MA multiplied by a coefficient (1-trading range%)  
4. Generate sell signal when RSI is higher than its MA multiplied by a coefficient (1+trading range%)
5. Default trading range distance is 5, meaning 5% above or below MA to trigger signals
6. Determine exit when RSI is above its MA and above 50 level

## Advantage Analysis

This is a typical mean reversion strategy, utilizing the overbought/oversold properties of RSI indicator to determine trading signals. The advantages are:

1. Adopting RSI indicator to judge market structure, which is quite reliable 
2. MA filter avoids unnecessary trades and enhances stability
3. Adjustable trading range controls frequency  
4. Simple logic and easy to understand

In summary, it is a simple and practical short-term trading strategy.  

## Risk Analysis  

There are some risks to note:

1. Possibility of RSI giving false signals, need to watch the pattern  
2. Improper trading range setting may lead to overtrading or missing opportunities
3. High trading frequency, need to consider transaction costs
4. Relying solely on single indicator, prone to market anomalies

These risks can be alleviated through parameter tuning, adding filters etc.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Add more filters like volume to ensure signals only at turning points
2. Add stop loss to control single trade loss
3. Optimize trading range to balance frequency and profit rate 
4. Utilize machine learning to find optimal parameter sets
5. Add ensemble models to integrate results from sub-strategies

Significant performance lift can be achieved via multi-indicator combos, stop loss management, parameter optimization etc.  

## Summary

In summary, this is a very typical and practical short-term trading strategy. It capitalizes on overbought/oversold levels of RSI to determine entries and exits, with additional MA filter. The logic is simple and clear, parameters flexible, easy to implement. There are certain market risks, but can be addressed via refining entry/exit mechanisms, parameter tuning etc. When combined with more technical indicators and risk management techniques, this strategy can become a relatively stable short-term strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|frequency|
|v_input_int_2|40|rsiFrequency|
|v_input_int_3|5|buyZoneDistance|
|v_input_int_4|3|avgDownATRSum|
|v_input_bool_1|true|useAbsoluteRSIBarrier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-24 00:00:00
end: 2023-11-30 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © I11L

//@version=5
strategy("I11L - Meanreverter 4h", overlay=false, pyramiding=3, default_qty_value=10000, initial_capital=10000, default_qty_type=strategy.cash,process_orders_on_close=false, calc_on_every_tick=false)
 
frequency = input.int(10)
rsiFrequency = input.int(40)
buyZoneDistance = input.int(5)
avgDownATRSum = input.int(3)
useAbsoluteRSIBarrier = input.bool(true)
barrierLevel = 50//input.int(50)

momentumRSI = ta.rsi(close,rsiFrequency)
momentumRSI_slow = ta.sma(momentumRSI,frequency)
 
isBuy = momentumRSI < momentumRSI_slow*(1-buyZoneDistance/100) and (strategy.position_avg_price - math.sum(ta.atr(20),avgDownATRSum)*strategy.opentrades > close or strategy.opentrades == 0 ) //and (momentumRSI < barrierLevel or not(useAbsoluteRSIBarrier))
isShort = momentumRSI > momentumRSI_slow*(1+buyZoneDistance/100) and (strategy.position_avg_price - math.sum(ta.atr(20),avgDownATRSum)*strategy.opentrades > close or strategy.opentrades == 0 ) and (momentumRSI > barrierLevel or not(useAbsoluteRSIBarrier))
momentumRSISoftClose = (momentumRSI > momentumRSI_slow) and (momentumRSI > barrierLevel or not(useAbsoluteRSIBarrier))

isClose = momentumRSISoftClose

plot(momentumRSI,color=isClose ? color.red :  momentumRSI < momentumRSI_slow*(1-buyZoneDistance/100) ? color.green : color.white)
plot(momentumRSI_slow,color=color.gray)
plot(barrierLevel,color=useAbsoluteRSIBarrier ? color.white : color.rgb(0,0,0,0))
plot(momentumRSI_slow*(1-buyZoneDistance/100),color=color.gray)
plot(momentumRSI_slow*(1+buyZoneDistance/100),color=color.gray)
plot(momentumRSI_slow*(1+(buyZoneDistance*2)/100),color=color.gray)

// plot(strategy.wintrades - strategy.losstrades)

 
 
if(isBuy)
    strategy.entry("Buy",strategy.long, comment="#"+str.tostring(strategy.opentrades+1))

// if(isShort)
//     strategy.entry("Sell",strategy.short, comment="#"+str.tostring(strategy.opentrades+1))

if(isClose)
    strategy.exit("Close",limit=close)




```

> Detail

https://www.fmz.com/strategy/433951

> Last Modified

2023-12-01 16:59:26
