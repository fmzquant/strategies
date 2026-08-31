
> Name

Trading-Strategy-Based-on-Market-Facilitation-Index

> Author

ChaoZhang

> Strategy Description

## Overview

This strategy uses the Market Facilitation Index (MFI) to judge the market's trending condition and possibility of trend reversal. It generates trading signals by calculating the relationship between price range and volume to evaluate the efficiency of price movement.

## Strategy Logic 

1. Calculate MFI, formula: (Highest - Lowest) / Volume * 10000

2. Set buy and sell thresholds, such as buy when MFI > 1 and sell when MFI < 0.8

3. Go long when MFI crosses above buy threshold, go short when crossing below sell threshold  

4. Color code bars based on signals for visual representation 

5. Option to reverse signal directions

## Advantage Analysis

1. Strong ability to evaluate market trending and price movement efficiency

2. Simple parameter setup, easy to determine thresholds

3. Clear trading signals, easy to interpret and execute

4. Visual bar colors intuitively display market conditions 

5. Flexibility to go long or short as needed

## Risk Analysis

1. Unable to determine trend strength, risks insufficient profit

2. Cannot differentiate normal fluctuations or real reversals

3. Prone to false signals from sudden events 

4. Has some lag, may miss best entry points

5. No stop loss mechanism, unable to control single loss

## Optimization Directions

1. Test different parameter threshold values

2. Add volume-price indicators for confirmation 

3. Incorporate moving averages to determine trend direction

4. Establish stop loss strategies for risk control

5. Define position sizing rules to adjust with markets

6. Test performance in live markets across different instruments and timeframes

## Summary

This strategy uses MFI to judge market trending conditions and provide simple trade signals. Further improvements in parameter optimization, stop losses etc. are needed for strict risk control. But the logic is clear and feasible to serve as part of a trend following strategy, thus having practical value.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|6.2|SellZone|
|v_input_2|true|BuyZone|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-09-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 12/09/2018
// The Market Facilitation Index is an indicator that relates price range to 
// volume and measures the efficency of price movement. Use the indicator to 
// determine if the market is trending. If the Market Facilitation Index increased, 
// then the market is facilitating trade and is more efficient, implying that the 
// market is trending. If the Market Facilitation Index decreased, then the market 
// is becoming less efficient, which may indicate a trading range is developing that 
// may be a trend reversal.
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Market Facilitation Index (MFI) Backtest", shorttitle="MFI")
SellZone = input(6.2, minval=0.01, step = 0.01)
BuyZone = input(1, minval=0.01, step = 0.01)
reverse = input(false, title="Trade reverse")
hline(BuyZone, color=green, linestyle=line)
hline(SellZone, color=red, linestyle=line)
xmyVol = volume
xmyhigh = high
xmylow = low
nRes = (xmyhigh - xmylow) / xmyVol * 10000
pos = iff(nRes > BuyZone, 1,
       iff(nRes < SellZone, -1, nz(pos[1], 0)))
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )        
plot(nRes, color=green, title="MFI", style = histogram)
```

> Detail

https://www.fmz.com/strategy/427262

> Last Modified

2023-09-19 15:56:29
