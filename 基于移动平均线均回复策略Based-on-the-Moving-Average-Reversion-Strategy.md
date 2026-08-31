
> Name

基于移动平均线均回复策略Based-on-the-Moving-Average-Reversion-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/143f3c2639db7478228.png)

## Overview

The Jaws mean reversion strategy is a very simple trend trading strategy. Its core idea is to go long when the short-term moving average falls below the long-term moving average by a certain percentage, and close the position when the short-term moving average crosses above the long-term moving average. The strategy first calculates a short-term and a long-term moving average, and then generates trading signals based on the relationship between the two moving averages.  

## Strategy Logic

The strategy mainly relies on two moving averages, one short-term and one long-term. The short-term moving average parameter is smallMAPeriod, and the long-term moving average parameter is bigMAPeriod. The strategy first calculates these two moving averages, and then compares the size relationship between them.

When the short-term moving average falls from above and breaks through a certain percentage (set by the percentBelowToBuy parameter) of the long-term moving average, a buy signal is generated to go long. When the short-term moving average subsequently rises and crosses above the long-term moving average, a sell signal is generated to close the position.

The strategy captures mean reversion opportunities between the short-term and long-term moving averages. When the short-term moving average is below the long-term moving average to a certain extent, it means the asset may be undervalued and should have a chance to revert to the mean, so going long can obtain a rebound profit.

## Advantage Analysis  

The Jaws mean reversion strategy has the following advantages:

1. The logic is simple and easy to understand and implement
2. Captures the turning points of short-term and long-term trends for precise judgment of market trends  
3. Flexible parameter settings that can obtain more trading signals by adjusting the moving average periods and concession percentage
4. Simple backtesting process suitable for quantitative trading simulation and optimization

The strategy can achieve good results through simple parameter optimization. By adjusting the moving average and concession percentage parameters, backtesting can be performed on different market assets like stocks, forex, and cryptocurrencies to screen out the optimal parameter combinations.  

## Risk Analysis

The Jaws mean reversion strategy also has some risks:  

1. Fewer signals unable to trade frequently
2. Prone to missing price reversal situations
3. Improper parameters can lead to excessively frequent trading, higher trading costs and slippage losses

The following methods can be used to mitigate risks:

1. Appropriately adjust parameters for an adequate amount of trading signals  
2. Adopt breakout pullback entry method to avoid false breakouts
3. Optimize parameter combinations by selecting moving average periods and concession percentages  

## Optimization Directions

The Jaws mean reversion strategy can be optimized from the following aspects:

1. Test different price data like close, high, low, typical price as strategy signal source
2. Try different types of moving averages like exponential, weighted, Hull moving averages etc 
3. Add filter conditions to avoid unnecessary trading in non-trending markets
4. Incorporate volume indicators to avoid false breakouts with increasing price but insufficient momentum
5. Employ machine learning or genetic algorithms for automated parameter optimization

## Conclusion

The Jaws mean reversion strategy captures the mean reversion opportunities after short-term prices deviate from long-term trends by comparing short and long-term moving averages. The strategy has simple logic that is easy to understand and implement. Through parameter optimization it can achieve good results. But risks like fewer signals and missing reversals still exist, requiring testing and optimization of parameters and filters to maximize strategy returns.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|2|Small Moving Average|
|v_input_3|5|Big Moving Average|
|v_input_4|3|Percent below to buy %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-20 00:00:00
end: 2024-02-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=4
//
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
//
// @author Sunil Halai
//
// This very simple strategy is an implementation of PJ Sutherlands' Jaws Mean reversion algorithm. It simply buys when a small moving average period (e.g. 2) is below
// a longer moving average period (e.g. 5) by a certain percentage, and closes when the small period average crosses over the longer moving average. 
// 
// If you are going to use this, you may wish to apply this to a range of investment assets, as the amount signals is low. Alternatively you may wish to tweak the settings to provide more
// signals.


strategy("Jaws Mean Reversion [Strategy]", overlay = true)

//Strategy inputs
source = input(title = "Source", defval = close)
smallMAPeriod = input(title = "Small Moving Average", defval = 2)
bigMAPeriod = input(title = "Big Moving Average", defval = 5)
percentBelowToBuy = input(title = "Percent below to buy %", defval = 3)


//Strategy calculation
smallMA = sma(source, smallMAPeriod)
bigMA =  sma(source, bigMAPeriod) 
buyMA = ((100 - percentBelowToBuy) / 100) * sma(source, bigMAPeriod)[0]

if(crossunder(smallMA, buyMA))
    strategy.entry("BUY", strategy.long)

if(crossover(smallMA, bigMA))
    strategy.close("BUY")
```

> Detail

https://www.fmz.com/strategy/442975

> Last Modified

2024-02-27 17:51:43
