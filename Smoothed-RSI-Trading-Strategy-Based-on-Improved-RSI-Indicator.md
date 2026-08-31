
> Name

Smoothed-RSI-Trading-Strategy-Based-on-Improved-RSI-Indicator

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy utilizes an improved RSI indicator developed by John Ehlers, which uses special smoothing techniques to reduce lag and generate more reliable trading signals. The strategy allows easy switching between long and short directions in the input settings.

## Strategy Logic

The strategy first calculates a smoothed price, which is the average of the current closing price and previous 3 days' closing prices. Then it calculates the upward and downward momentum of this smoothed price, and normalizes them into a 0-1 RSI value. Finally a RSI above 0.5 generates a long signal, while a RSI below 0.5 generates a short signal. 

The core of this strategy lies in the improved calculation of the RSI indicator. The traditional RSI only looks at price change over a single period, which causes increasing lag as the period parameter rises. Ehlers' idea is to consider the price trend over multiple periods, and take a weighted average, so as to smooth out short-term price noises while reducing lag.

Specifically, rather than simply looking at the rise/fall ratio, this strategy calculates the upward and downward momentum of the smoothed price. The RSI is then normalized to the 0-1 range. This better reflects the price trend and generates more reliable trading signals.

## Advantage Analysis

Compared to the traditional RSI indicator, this strategy has the following advantages owing to the improved smoothed RSI:

1. Reduced lag, able to capture trend reversal more quickly
2. Smoothed price change, filters out short-term market noise
3. Considers multiple period trends, more reliable signals
4. Customizable parameters suitable for different market cycles  
5. Solid theoretical foundation, easy to understand and optimize

In summary, this strategy combines the merits of RSI while improving upon its weaknesses like lag and smoothing. This allows us to take advantage of the more powerful and reliable RSI signals, while reducing market noise and timely capturing trend changes.

## Risk Analysis 

Despite the beneficial improvements made to the RSI, some risks remain:

1. RSI prone to false signals, needs combining with other indicators  
2. Single parameter optimization insufficient, consider dynamic period optimization
3. Long periods may miss short-term opportunities 
4. Avoid using in range-bound choppy markets, better for trending periods
5. Frequent signals, need proper trade frequency control

Suggested ways to reduce risks:

1. Add MA and other trend filters to filter signals
2. Dynamically optimize RSI parameters for different market cycles
3. Add more timeframe analysis to uncover more opportunities
4. Avoid choppy markets, use strategy in trending periods 
5. Add position sizing to control per trade risk 

## Optimization Directions

This strategy can be further improved in the following aspects:

1. Add stop loss to control per trade risk
2. Combine multi-period RSI for signal combination
3. Develop dynamic RSI parameter optimization for market adaptiveness 
4. Optimize entry for avoiding false breakouts
5. Add trend filter to improve signal quality
6. Add reversal detection module to catch strong trend reversals
7. Incorporate ML to predict next period price for early signal

With continuous optimizations on parameters, filters, combinations, this strategy can be made into a more powerful, reliable, trend-aware RSI trading system, significantly improving win rate and profitability.

## Conclusion

This strategy achieves better smoothing and reduced lag by improving RSI calculation, effectively smoothing price changes and timely capturing trend shifts. The advantages mainly lie in smoothing price action and catching trend turns. Risks remain and continuous optimizations can further improve the strategy. Overall, it provides new ideas on applying RSI, and brings more value to our trading decisions.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Length|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-19 00:00:00
end: 2023-09-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 16/11/2017
// This is new version of RSI oscillator indicator, developed by John Ehlers. 
// The main advantage of his way of enhancing the RSI indicator is smoothing 
// with minimum of lag penalty. 
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Smoothed RSI")
Length = input(10, minval=1)
reverse = input(false, title="Trade reverse")
xValue = (close + 2 * close[1] + 2 * close[2] + close[3] ) / 6
CU23 = sum(iff(xValue > xValue[1], xValue - xValue[1], 0), Length)
CD23 = sum(iff(xValue < xValue[1], xValue[1] - xValue, 0), Length)
nRes = iff(CU23 + CD23 != 0, CU23/(CU23 + CD23), 0)
pos = iff(nRes == 0, -1,
	   iff(nRes == 1, 1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(nRes, color=blue, title="Smoothed RSI")
```

> Detail

https://www.fmz.com/strategy/427880

> Last Modified

2023-09-26 15:35:36
