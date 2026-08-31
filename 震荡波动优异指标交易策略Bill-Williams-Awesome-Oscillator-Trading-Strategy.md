
> Name

震荡波动优异指标交易策略Bill-Williams-Awesome-Oscillator-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ec33658e72f3579d91.png)


## Overview

The Bill Williams Awesome Oscillator trading strategy is a quantitative trading strategy developed based on the recommendations proposed by Bill Williams in his book “New Trading Dimensions”. The strategy uses the difference between fast and slow moving averages to construct an oscillator indicator and displays it as a histogram, generating trading signals through color changes of the histogram.   

## Strategy Logic

The core indicator of this strategy is the Awesome Oscillator (AO). Its formula is:  

AO = SMA(Median Price, Fast Length) - SMA(Median Price, Slow Length)

Where Median Price takes the average of high and low prices; Fast Length represents the period of the fast moving average; Slow Length represents the period of the slow moving average.  

The AO indicator reflects the oscillation of market prices at different time scales through the difference between fast and slow moving averages. When the fast moving average is higher than the slow one, it signals that short-term price momentum is stronger than long-term momentum and gives a buy signal. When the fast moving average is lower than the slow one, it signals that short-term price momentum is weaker than long-term momentum and gives a sell signal.

The strategy uses the difference between the current AO value and its previous period to determine the current period’s long/short stance. Different colors are used to identify them on the histogram: blue when current AO is greater than previous period, indicating suitable for long; red when current AO is less than previous period, indicating suitable for short.

## Advantage Analysis 

The main advantages of this strategy include:

1. Using the difference between moving averages to construct the indicator smooths price data and helps filter market noise;
2. The difference between fast and slow moving averages captures price trend changes across different time horizons;
3. The histogram visually presents long/short status for ease of judging trading direction;  
4. Customizable parameters to adjust indicator sensitivity catering to different trading instruments.

## Risk Analysis

There are also some risks with this strategy:

1. Improper parameter settings may result in frequent trading signals, leading to overtrading;
2. The relatively complex construction of the AO indicator may lead to missing trading opportunities if parameters are not properly set;
3. Signals come from a single source lacking verification from other indicators.

To mitigate the above risks, parameters can be optimized, indicator construction can be adjusted, and other indicators can be used for verification.  

## Optimization Directions

Some directions this strategy can be optimized on include:

1. Optimize fast and slow moving average lengths to find the best parameter combination;
2. Try different types of moving averages to construct the AO indicator, e.g. EMA, LWMA, etc;
3. Incorporate trend-following and oscillating indicators to improve the AO;  
4. Add stop loss mechanisms to control losses per trade.

## Conclusion  

In conclusion, the Bill Williams Awesome Oscillator trading strategy effectively identifies short-term reversal opportunities by judging price trend changes using the difference between fast and slow moving averages. This strategy has a clear concept and is easy to implement. With parameter optimization and incorporation of other indicators, it has the potential to achieve good trading performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|34|Length Slow|
|v_input_2|5|Length Fast|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-12 00:00:00
end: 2023-12-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 29/12/2016
//    This indicator is based on Bill Williams` recommendations from his book 
//    "New Trading Dimensions". We recommend this book to you as most useful reading.
//    The wisdom, technical expertise, and skillful teaching style of Williams make 
//    it a truly revolutionary-level source. A must-have new book for stock and 
//    commodity traders.
//    The 1st 2 chapters are somewhat of ramble where the author describes the 
//    "metaphysics" of trading. Still some good ideas are offered. The book references 
//    chaos theory, and leaves it up to the reader to believe whether "supercomputers" 
//    were used in formulating the various trading methods (the author wants to come across 
//    as an applied mathemetician, but he sure looks like a stock trader). There isn't any 
//    obvious connection with Chaos Theory - despite of the weak link between the title and 
//    content, the trading methodologies do work. Most readers think the author's systems to 
//    be a perfect filter and trigger for a short term trading system. He states a goal of 
//    10%/month, but when these filters & axioms are correctly combined with a good momentum 
//    system, much more is a probable result.
//    There's better written & more informative books out there for less money, but this author 
//    does have the "Holy Grail" of stock trading. A set of filters, axioms, and methods which are 
//    the "missing link" for any trading system which is based upon conventional indicators.
//    This indicator plots the oscillator as a histogram where periods fit for buying are marked 
//    as blue, and periods fit for selling as red. If the current value of AC (Awesome Oscillator) 
//    is over the previous, the period is deemed fit for buying and the indicator is marked blue. 
//    If the AC values is not over the previous, the period is deemed fir for selling and the indicator 
//    is marked red.
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy("Bill Williams. Awesome Oscillator (AO)")
nLengthSlow = input(34, minval=1, title="Length Slow")
nLengthFast = input(5, minval=1, title="Length Fast")
reverse = input(false, title="Trade reverse")
xSMA1_hl2 = sma(hl2, nLengthFast)
xSMA2_hl2 = sma(hl2, nLengthSlow)
xSMA1_SMA2 = xSMA1_hl2 - xSMA2_hl2
cClr = xSMA1_SMA2 > xSMA1_SMA2[1] ? blue : red
pos = iff(xSMA1_SMA2 > xSMA1_SMA2[1], 1,
	   iff(xSMA1_SMA2 < xSMA1_SMA2[1], -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(xSMA1_SMA2, style=histogram, linewidth=1, color=cClr)
```

> Detail

https://www.fmz.com/strategy/435888

> Last Modified

2023-12-19 15:27:15
