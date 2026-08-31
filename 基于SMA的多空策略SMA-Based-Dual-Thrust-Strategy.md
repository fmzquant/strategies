
> Name

基于SMA的多空策略SMA-Based-Dual-Thrust-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/165491a196c926442f4.png)

## Overview  

This strategy builds a simple dual thrust strategy based on the SMA indicator. It goes long when the price crosses above the 20-period highest SMA and goes short when the price crosses below the 20-period lowest SMA. Stop loss exits are also set.

## Strategy Logic  

This strategy uses the 20-period SMA of highest high price and lowest low price to determine the direction for trading. When price crosses above the highest SMA, it is considered as an uptrend, so go long. When price crosses below the lowest SMA, it is considered as a downtrend, so go short. 

Specifically, the strategy first calculates the 20-period SMA of highest high and lowest low prices, and plots the indicator lines. The following trading logic is then set:  

Long entry: Close price crosses above highest SMA  
Long exit: Close price crosses below 0.99 * highest SMA   

Short entry: Close price crosses below lowest SMA   
Short exit: Close price crosses above 1.01 * lowest SMA  

So an trend following dual thrust strategy is built.  

## Advantage Analysis   

This strategy has the following advantages:  

1. Using SMA to determine trend direction is simple and practical  
2. Highest SMA and Lowest SMA act as support/resistance lines  
3. Reasonable stop loss design to maximize protection from huge losses
4. Good adaptability, can be used on different products and timeframes  

## Risk Analysis  

There are also some risks with this strategy:   

1. SMA has lagging effect, may miss trend turning points  
2. No protection from market sudden events   
3. Trading cost impact not considered  

These risks can be controlled and reduced in ways like combining other indicators, setting stop loss, parameter tuning etc.  

## Improvement Directions   

This strategy can also be improved in the following aspects:  

1. Combine other indicators like MACD, KDJ to determine trend  
2. Add protection for sudden events like suspension, price limiting etc   
3. Optimize SMA periods, find the best parameter combination  
4. Find best parameters for different products and timeframes  
5. Estimate trading cost impact, set optimal stop loss and take profit  

## Conclusion  

The overall logic of this strategy is clear and easy to implement. By using SMA to determine trend direction, and setting reasonable entry/exit rules, good results can be achieved. There is room for further optimization, and by combining with other techniques, it can become a promising strategy worth long term tracking.  




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-14 00:00:00
end: 2023-11-21 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © AlanAntony

//@version=4


strategy("ma 20 high-low",overlay=true)

//compute the indicators

smaH = sma(high, 20)
smaL = sma(low, 20)


//plot the indicators
plot(smaH,title="smaHigh", color=color.green, linewidth=2)


plot(smaL,title="smaLow", color=color.red, linewidth=2)


//trading logic
enterlong = crossover(close,smaH) //positive ema crossover
exitlong = crossunder(close,0.99*smaH)  //exiting long


entershort = crossunder(close,smaL) //negative EMA Crossover
exitshort = crossover(close,1.01*smaH) //exiting shorts


notintrade = strategy.position_size<=0
bgcolor(notintrade ? color.red:color.green)

//execution logic

start = timestamp(2015,6,1,0,0)
//end = timestamp(2022,6,1,0,0)

if time >= start
    strategy.entry( "long", strategy.long,1, when = enterlong)
    strategy.entry( "short", strategy.short,1, when = entershort) 
    
    strategy.close("long", when = exitlong)
    strategy.close("short", when = exitshort)

//if time >= end
   // strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/432896

> Last Modified

2023-11-22 15:42:29
