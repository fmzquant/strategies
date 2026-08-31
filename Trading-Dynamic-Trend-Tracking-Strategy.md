
> Name

Trading-Dynamic-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1e5d0d7e76a417e94ed.png)

## Overview

This strategy is an improved design based on the ideas presented by Andrew Abraham in the "Trading the Trend" article published in Technical Analysis of Stocks & Commodities magazine in September 1998, which is used to dynamically track stock price trends and generate trading signals accordingly.  

## Strategy Logic

The strategy first calculates the average true range over the past 21 days as a reference threshold, then calculates the highest and lowest prices over the past 21 days, and sets the upper and lower limits of the channel accordingly. The upper limit of the channel is set to the 21-day highest price minus 3 times the average true range, and the lower limit is set to the 21-day lowest price plus 3 times the average true range. When the closing price is higher than the upper limit of the channel, it is a selling pressure signal; when the closing price is lower than the lower limit of the channel, it is a buying signal. To filter out false signals, a 21-period exponential moving average is also calculated, and a real trading signal is only generated when the closing price breaks through the channel limits in the same direction as the moving average. In addition, the strategy also provides a reverse input parameter, which can reverse the original long and short signals to implement short and long operations.

## Advantage Analysis 

The biggest advantage of this strategy is that it can dynamically track price trends and generate trading signals accordingly. Compared with moving average strategies with fixed parameters, it can better capture price change trends. In addition, the establishment of the channel incorporates the true range, avoiding the shortcomings of setting channel limits based solely on highest and lowest prices. The fluctuation range of the upper and lower limits of the channel is also very reasonable, avoiding false breakouts to some extent. The customizability of the reverse parameter also increases the flexibility of the strategy.  

## Risk Analysis

There are two main risks with this strategy: one is the risk of overtrading caused by increased trading signals; the second is the risk that may arise from improper parameter settings. As this strategy uses dynamic parameters, trading signals will be more frequent than traditional moving average strategies, which may lead to a certain degree of overtrading risk. In addition, if the parameters are set improperly, such as if the time period is set too short or the channel limit values are too small, false signals will also increase, thus increasing risk.

To control risks, parameters can be adjusted appropriately by selecting longer time periods and moderately relaxing channel upper and lower limit constraints. Stop loss strategies can also be considered to control single loss.

## Optimization Directions   

There is still a large space for optimizing this strategy. For example, other filtering indicators such as RSI and KD can be considered to avoid false breakouts. Machine learning methods can also be tried to automatically optimize parameters. In addition, the optimal parameter values may differ across different stocks and market environments. Therefore, we can also consider formulating a set of parameter optimization mechanisms to dynamically select the optimal parameters based on stock and market characteristics to improve the stability of the strategy.  

## Summary 

Overall, this is a very practical trend tracking strategy. Compared with traditional moving average strategies, it is more flexible and intelligent, and can dynamically capture price change trends. With proper parameter tuning, the quality of its trading signals is relatively high and can yield good returns. It is expected that the performance of this strategy can be further improved through subsequent optimizations. It is worth verifying in live trading and application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|Length|
|v_input_2|21|LengthMA|
|v_input_3|3|Multiplier|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-15 00:00:00
end: 2024-02-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 10/10/2018
// This is plots the indicator developed by Andrew Abraham 
// in the Trading the Trend article of TASC September 1998  
// It was modified, result values wass averages.
////////////////////////////////////////////////////////////
strategy(title="Trend Trader AVR Backtest", overlay = true)
Length = input(21, minval=1),
LengthMA = input(21, minval=1),
Multiplier = input(3, minval=1)
reverse = input(false, title="Trade reverse")
avgTR      = wma(atr(1), Length)
highestC   = highest(Length)
lowestC    = lowest(Length)
hiLimit = highestC[1]-(avgTR[1] * Multiplier)
loLimit = lowestC[1]+(avgTR[1] * Multiplier)
ret = 0.0
ret :=  iff(close > hiLimit and close > loLimit, hiLimit,
         iff(close < loLimit and close < hiLimit, loLimit, nz(ret[1], 0)))
nResMA = ema(ret, LengthMA)        
pos = 0
pos := iff(close < nResMA, -1,
       iff(close > nResMA, 1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(nResMA, color= blue , title="Trend Trader AVR")
```

> Detail

https://www.fmz.com/strategy/442566

> Last Modified

2024-02-22 17:54:26
