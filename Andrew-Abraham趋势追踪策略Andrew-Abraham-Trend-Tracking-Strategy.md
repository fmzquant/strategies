
> Name

Andrew-Abraham趋势追踪策略Andrew-Abraham-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/90439992dc3a478825.png)

## Overview

The Trend Tracking strategy was proposed by Andrew Abraham in an article titled "Trading the Trend" published in Technical Analysis of Stocks & Commodities magazine in September 1998. It uses the moving average true range and highest and lowest prices to determine the price trend and trade in the direction of the trend.

## Principles

The strategy first calculates the 21-day average true range avgTR. Then it calculates the 21-day highest price highestC and lowest price lowestC. Next, it calculates the upper rail hiLimit, which is the highest price minus 3 times avgTR; and the lower rail loLimit, which is the lowest price plus 3 times avgTR. When the closing price exceeds the upper and lower rails, their values are taken as the reference price ret, respectively. When the closing price is higher than the reference price, go long; when lower, go short.

## Advantages

The main advantages of this strategy are:

1. Using average true range to calculate the channel can dynamically capture market volatility. 
2. Combining highest and lowest prices to determine trend direction avoids being misled by oscillating markets.
3. The logic is simple and clear, easy to understand and implement.
4. It can trade according to the trend and avoid frequent opening positions in oscillating markets.

## Risks 

There are also some risks with this strategy:  

1. More false signals will occur in oscillating markets. This can be reduced by optimizing parameters.
2. Unable to determine trend reversal points, risk of loss exists. Other indicators can be combined to judge trend reversal.
3. Improper parameter optimization may lead to overtrading or false signals. The stability of parameters needs to be tested carefully.

## Improvement

Some ways to improve this strategy:

1. Optimize the moving average period to find the best parameter combination.  
2. Add stop loss to control single loss.
3. Combine volatility indicators to determine market conditions and avoid trading in oscillating markets.
4. Add trend judgment indicators to identify trend reversal points and reduce probability of losses.

## Conclusion

In summary, the Trend Tracking strategy is a simple and practical trend trading strategy. It uses price channels to determine trend direction and avoid being trapped in oscillating markets. But there are still some risks, and further optimizations are needed to improve stability. It is suitable for investors with some trading experience.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|Length|
|v_input_2|3|Multiplier|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2024-01-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 12/01/2017
// This is plots the indicator developed by Andrew Abraham 
// in the Trading the Trend article of TASC September 1998  
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Trend Trader Strategy", overlay = true)
Length = input(21, minval=1),
Multiplier = input(3, minval=1)
reverse = input(false, title="Trade reverse")
avgTR      = wma(atr(1), Length)
highestC   = highest(Length)
lowestC    = lowest(Length)
hiLimit = highestC[1]-(avgTR[1] * Multiplier)
loLimit = lowestC[1]+(avgTR[1] * Multiplier)
ret = iff(close > hiLimit and close > loLimit, hiLimit,
       iff(close < loLimit and close < hiLimit, loLimit, nz(ret[1], 0)))
pos = iff(close > ret, 1,
	   iff(close < ret, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
         iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(ret, color= blue , title="Trend Trader Strategy")
```

> Detail

https://www.fmz.com/strategy/438053

> Last Modified

2024-01-08 16:21:11
