
> Name

基于价格波动率的跟踪止损策略Volatility-Tracking-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description


### Overview

This strategy calculates the moving average of true range to reflect market volatility. It determines the trend direction based on the relationship between volatility and its moving average. It goes short when volatility crosses above the moving average, and goes long when crossing below, with a trailing stop loss.

### Strategy Logic

The ATR function is used to calculate the true range over a specified period. The simple moving average of ATR is then calculated as the moving average line of volatility. When ATR crosses above its moving average, market volatility is considered as increasing and a short strategy is adopted. When ATR crosses below its moving average, market volatility is considered as decreasing and a long strategy is adopted.

When in a position, a fixed percentage trailing stop loss is set to adjust the stop loss dynamically based on price changes, in order to protect profits while avoiding being stopped out prematurely. 

### Advantage Analysis

This strategy judges market trends via the volatility indicator, avoiding noise interference. It goes short when volatility rises and goes long when volatility falls, realizing hedged operations. The trailing stop loss adjusts stop loss positions according to real-time price changes, balancing profit protection and unnecessary stop loss.

### Risk Analysis

The strategy relies solely on one volatility indicator, with some lagging. The trailing stop loss only considers adverse price moves, unable to prevent profit retracements. If prices fluctuate violently, the stop loss may be hit, incurring large losses.

Parameter tuning on ATR and moving average periods could help, as could incorporating other indicators for comprehensive judgements. The stop loss method could also switch to dynamic stops, adjusting stop loss percentage based on market volatility.

### Optimization Directions

1. Test different parameter combinations of ATR and moving averages to find optimal parameters.

2. Incorporate other indicators for judgement to form a strategy ensemble, improving accuracy.

3. Adopt dynamic stop loss strategies, adjusting stop loss percentage based on market volatility. 

4. Optimize position sizing models for different products.

5. Apply machine learning to aid in identifying volatility turning points.

6. Combine with higher timeframe moving averages to determine larger trend direction.

### Summary

The strategy judges market trends simply and directly via volatility, but a single indicator has limitations. Introducing multiple indicators and parameter optimization can improve robustness. Overall, the strategy provides a volatility-based trading idea.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Length|
|v_input_2|26|LengthMA|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 20/08/2018
// The Volatility function measures the market volatility by plotting a 
// smoothed average of the True Range. It returns an average of the TrueRange 
// over a specific number of bars, giving higher weight to the TrueRange of 
// the most recent bar.
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Volatility Backtest", shorttitle="Volatility")
Length = input(10, minval=1)
LengthMA = input(26, minval=1)
reverse = input(false, title="Trade reverse")
xATR = atr(Length)
nRes = ((Length - 1) * nz(nRes[1], 0) + xATR) / Length
xMARes = sma(nRes, LengthMA)
pos = iff(nRes < xMARes, 1,
       iff(nRes > xMARes, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(nRes, color=blue, title="Volatility")
plot(xMARes, color=red, title="MA")
```

> Detail

https://www.fmz.com/strategy/427346

> Last Modified

2023-09-20 11:31:12
