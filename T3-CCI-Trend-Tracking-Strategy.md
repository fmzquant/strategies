
> Name

T3-CCI-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f29faa48f09f98ec2b.png)



## Overview

This is a quantitative strategy that utilizes the T3 smoothed moving average line and CCI indicator to track trends. The strategy identifies trends by calculating the T3-CCI indicator and enters the market after obtaining double confirmation signals to follow trends.

## Strategy Principle  

The strategy first calculates the T3 smoothed moving average line and CCI indicator. It then converts the CCI indicator into the T3-CCI indicator through a series of filtering calculations. It generates a buy signal when the T3-CCI indicator crosses above the 0 axis and a sell signal when crossing below the 0 axis. To filter out false signals, the strategy requires the T3-CCI indicator to maintain the same signal for two consecutive periods before placing an order.  

Specifically, the strategy takes the following steps:

1. Calculate the CCI indicator and T3 indicator  
2. Convert the CCI indicator into the T3-CCI indicator through a series of digital filters
3. Judge the long/short state of the T3-CCI indicator  
4. Wait for persistent signals over two bars as entry signals

## Advantage Analysis   

The strategy has the following advantages:

1. Effectively smooths the CCI indicator using the T3 indicator to filter out market noise
2. Adopts a double confirmation mechanism to avoid false signals  
3. Tracks medium-to-long-term trends and avoids short-term pullbacks
   
## Risk Analysis  

The strategy also has some risks:  

1. It is prone to generating false signals in range-bound markets  
2. The double confirmation mechanism may miss short-term opportunities  
3. High risk of stop loss in major trend reversals  

Countermeasures:
  
1. Adjust CCI and T3 parameters to optimize indicator performance  
2. Appropriately shorten confirmation periods or run fast/slow parameter combinations simultaneously 
3. Adopt moving stop loss or timely stop loss to control single transaction loss

## Optimization Directions  

The strategy can be optimized in the following directions:

1. Adjust CCI and T3 parameters to suit different cycles and markets
2. Increase trend judgment indicators to improve signal quality  
3. Automatically adjust stop loss position based on volatility  
4. Dynamically optimize parameters using machine learning methods  

## Summary  

Overall, this is a reliable medium-to-long-term trend tracking strategy. It controls risks with double confirmation and trend tracking features, and can serve as a basic trend trading strategy. Further performance improvement can be achieved through parameter and rule optimization.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|CCI_Period|
|v_input_2|5|T3_Period|
|v_input_3|0.618|b|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-16 00:00:00
end: 2023-11-23 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version = 2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 19/12/2016
// This simple indicator gives you a lot of useful information - when to enter, when to exit
// and how to reduce risks by entering a trade on a double confirmed signal.
//
// You can use in the xPrice any series: Open, High, Low, Close, HL2, HLC3, OHLC4 and ect...
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="FX Sniper:  T3-CCI Strategy", shorttitle="T3-CCI")
CCI_Period = input(14, minval=1)
T3_Period = input(5, minval=1)
b = input(0.618)
reverse = input(false, title="Trade reverse")
hline(0, color=purple, linestyle=line)
xPrice = close
b2 = b*b
b3 = b2*b
c1 = -b3
c2 = (3*(b2 + b3))
c3 = -3*(2*b2 + b + b3)
c4 = (1 + 3*b + b3 + 3*b2)
nn = iff(T3_Period < 1, 1, T3_Period)
nr = 1 + 0.5*(nn - 1)
w1 = 2 / (nr + 1)
w2 = 1 - w1    
xcci = cci(xPrice, CCI_Period)
e1 = w1*xcci + w2*nz(e1[1])
e2 = w1*e1 + w2*nz(e2[1])
e3 = w1*e2 + w2*nz(e3[1])
e4 = w1*e3 + w2*nz(e4[1])
e5 = w1*e4 + w2*nz(e5[1])
e6 = w1*e5 + w2*nz(e6[1])
xccir = c1*e6 + c2*e5 + c3*e4 + c4*e3  
cciHcolor =  iff(xccir >= 0 , green,
               iff(xccir < 0, red, black))
pos =  iff(xccir > 0, 1,
         iff(xccir < 0, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(xccir, color=blue, title="T3-CCI")
plot(xccir, color=cciHcolor, title="CCIH", style = histogram)
```

> Detail

https://www.fmz.com/strategy/433075

> Last Modified

2023-11-24 10:33:31
