
> Name

Prime-Number-Bands-Backtest-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d35e774b3780813c4d.png)

## Overview
The Prime Number Bands backtest strategy judges market trends by identifying the highest and lowest prime numbers around a price and plotting these two prime number series as a band. This strategy was developed by Modulus Financial Engineering Inc.

## Strategy Logic
1. Traverse a specified price fluctuation range based on the input tolerance percentage to find the highest and lowest prime numbers.
2. Use the highest and lowest functions to obtain the highest and lowest points of the prime number bands in the most recent N bars.  
3. Determine the long or short direction based on whether the closing price breaks through the highest and lowest points of the prime number bands.
4. Can choose to reverse trading signals.

## Advantage Analysis
1. Capture market randomness using the random and irregular distribution characteristics of prime numbers.
2. The prime number bands have a certain lag, which can filter out some noise.
3. The upper and lower limits of prime number bands are flexible and can be adjusted through the tolerance percentage to adapt to different cycles and different trading varieties.

## Risk Analysis
1. Prime number bands cannot completely fit the price movement and have a certain degree of lag.
2. Price reversals due to extremes could lead to wrong signals.
3. Excessive tolerance percentage settings filter out some valid signals.

Risks can be avoided by properly adjusting parameters, combining with other indicators, etc.

## Optimization Directions
1. Set dual conditions for triggering signals by combining simple moving averages and other indicators.
2. Research the use of other random numbers such as Fibonacci numbers.
3. Introduce machine learning algorithms to achieve automatic parameter optimization.

## Summary  
The prime number bands backtest strategy overall is a very innovative strategy with practical value. It uses the characteristics of prime numbers to capture market randomness while also considering price lag in identifying trends, very worthwhile for research. Next steps are to optimize from aspects of improving signal quality, expanding random number types, automatic optimization, etc. to make the strategy effect more remarkable.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Tolerance Percentage|
|v_input_2|5|Length|
|v_input_3_high|0|Source Up Band: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4_low|0|Source Down Band: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-08 00:00:00
end: 2024-01-07 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 27/03/2018
// Determining market trends has become a science even though a high number 
// or people still believe it’s a gambling game. Mathematicians, technicians, 
// brokers and investors have worked together in developing quite several 
// indicators to help them better understand and forecast market movements.
// The Prime Number Bands indicator was developed by Modulus Financial Engineering 
// Inc. This indicator is charted by indentifying the highest and lowest prime number 
// in the neighborhood and plotting the two series as a band.
//
// You can change long to short in the Input Settings
// WARNING:
//  - For purpose educate only
//  - This script to change bars colors.
////////////////////////////////////////////////////////////
PrimeNumberUpBand(price, percent) =>
    res = 0
    res1 = 0
    for j = price to price + (price * percent / 100)
        res1 := j
	    for i = 2 to sqrt(price)
        	res1 := iff(j % i == 0 , 0, j)
            if res1 == 0 
                break
		if res1 > 0 
		    break
    res := iff(res1 == 0, res[1], res1)
    res

PrimeNumberDnBand(price, percent) =>
    res = 0
    res2 = 0
    for j = price to price - (price * percent / 100)
        res2 := j
	    for i = 2 to sqrt(price)
        	res2 := iff(j % i == 0 , 0, j)
            if res2 == 0 
                break
		if res2 > 0 
		    break
    res := iff(res2 == 0, res[1], res2)
    res

strategy(title="Prime Number Bands Backtest", overlay = true)
percent = input(5, minval=0.01, step = 0.01, title="Tolerance Percentage")
Length = input(5, minval=1)
srcUp = input(title="Source Up Band",  defval=high)
srcDn = input(title="Source Down Band",  defval=low)
reverse = input(false, title="Trade reverse")
xPNUB = PrimeNumberUpBand(srcUp, percent)
xPNDB = PrimeNumberDnBand(srcDn, percent)
xHighestPNUB = highest(xPNUB, Length)
xLowestPNUB = lowest(xPNDB, Length)
pos = iff(close > xHighestPNUB[1], 1,
       iff(close < xLowestPNUB[1], -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(xHighestPNUB, color=red, title="PNUp")
plot(xLowestPNUB, color=green, title="PNDn")
```

> Detail

https://www.fmz.com/strategy/438025

> Last Modified

2024-01-08 11:54:52
