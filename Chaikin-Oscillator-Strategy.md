
> Name

Chaikin-Oscillator-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

The Chaikin Oscillator strategy uses the Chaikin Oscillator indicator to judge capital flow in the market and capture trend changes. This strategy combines fast and slow moving averages to form an indicator curve, buying when the curve crosses above the trendline and selling when the curve crosses below to track market trends.

## Strategy Logic

This strategy is based on the Chaikin Oscillator indicator, which improves on the Williams Accumulation/Distribution indicator by using the average of the high and low prices instead of the opening price to address the missing opening price problem. The indicator formula is:

Chaikin Oscillator = Fast EMA of Accumulation/Distribution Index - Slow EMA of Accumulation/Distribution Index

Where the Accumulation/Distribution Index is calculated as: 

Accumulation/Distribution Index = (Close - Open) / (High - Low) * Volume

Since the opening price is missing, it is calculated here as:

Accumulation/Distribution Index = (Close - (High + Low)/2) / (High - Low) * Volume

The indicator takes the difference between fast and slow EMAs of the index as the Chaikin Oscillator. A crossing above 0 indicates a buy signal, while a crossing below 0 indicates a sell signal. 

The specific logic is:

1. Calculate the Accumulation/Distribution Index 
2. Calculate fast and slow EMAs
3. Take the difference as the Chaikin Oscillator
4. Buy when the oscillator crosses above 0, sell when it crosses below 0

## Advantage Analysis 

The advantages of this strategy are:

1. Captures capital flow to determine market trend
2. Combines fast and slow moving averages to filter false breaks  
3. Simple and clear rules easy to implement

## Risk Analysis

Some risks of this strategy are:

1. The Chaikin Oscillator lags, potentially missing trend turning points
2. Requires tuning parameters to avoid excessive trades  
3. Needs stop loss to control single losing trades

Risks can be managed through parameter optimization, combining with other indicators, etc.

## Improvement Directions

Some ways to improve this strategy:

1. Optimize fast and slow EMA periods to balance frequency and stability
2. Add exit conditions like trend reversal signals 
3. Add filters like RSI, MACD to confirm signals
4. Incorporate stop loss strategy to control losses
5. Adjust parameters for different products to create customized strategies

## Conclusion

Overall the Chaikin Oscillator strategy is relatively stable and reliable. Fine tuning parameters can balance profitability and risk. Adding filters and stop loss can further improve robustness. This trend following strategy can achieve satisfactory results through customized optimizations.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Fast|
|v_input_2|10|Slow|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-10-11 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 18/09/2017
//    Indicator plots Money Flow Indicator (Chaikin). This indicator looks 
//    to improve on Larry William's Accumulation Distribution formula that 
//    compared the closing price with the opening price. In the early 1970's, 
//    opening prices for stocks stopped being transmitted by the exchanges. 
//    This made it difficult to calculate Williams' formula. The Chaikin 
//    Oscillator uses the average price of the bar calculated as follows 
//    (High + Low) /2 instead of the Open.
//    The indicator subtracts a 10 period exponential moving average of the 
//    AccumDist function from a 3 period exponential moving average of the 
//    AccumDist function.    
//
// You can change long to short in the Input Settings
// WARNING:
//  - For purpose educate only
//  - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Money Flow Indicator (Chaikin Oscillator)", shorttitle="MFI")
Fast = input(3, minval=1)
Slow = input(10, minval=1)
reverse = input(false, title="Trade reverse")
hline(0, color=gray, linestyle=hline.style_dashed)
lenMax = max(Fast, Slow)
lenMin = min(Fast, Slow)
xDiv = (high - low) * volume
SumMax = sum(iff(xDiv > 0, (close - open) / (high - low) * volume , 0) , lenMax)
SumMin = sum(iff(xDiv > 0, (close - open) / (high - low) * volume , 0) , lenMin)
emaMax = ema(SumMax, lenMax)
emaMin = ema(SumMin, lenMin)
nRes = emaMax - emaMin
pos = iff(nRes > 0, 1,
	   iff(nRes < 0, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(nRes, color=blue, title="RMI")
```

> Detail

https://www.fmz.com/strategy/429077

> Last Modified

2023-10-12 16:41:54
