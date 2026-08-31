
> Name

分形混沌震荡器交易策略Fractal-Chaos-Oscillator-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses the Fractal Chaos Oscillator (FCO) indicator to determine market trend direction for trend following. FCO compares changes in local highs and lows to judge price movement, with values between -1 and 1. Higher values indicate stronger trends. Go long when FCO reaches high values, and short when reaching low values.

## Strategy Logic

Identify local highs and lows by looking for specific candlestick patterns. Compare changes between adjacent groups of highs/lows to calculate the FCO indicator. For example, if the latest high/low group differs from the previous group, FCO is 1, indicating uptrend strength increasing. Determine trend direction based on FCO value - go long on higher values and short on lower values.

## Advantages

- FCO effectively judges trend direction simply
- No complex parameters required, easy to use
- Profitable for short-term intraday trading  
- Flexibility to go long or short as needed

## Risks

- Pattern identification not fully accurate, may miss turns
- Cannot accurately determine trend reversal, risks losses
- Frequent intraday trading increases transaction costs

Risks can be reduced via parameter optimization and adding reversal indicators.

## Enhancement Opportunities

- Test different periods for pattern identification
- Optimize FCO long/short thresholds 
- Add moving averages etc. to determine trend reversal
- Test robustness across different products

## Conclusion

FCO strategy simplifies trend direction judgment for short-term trading. Performance can be improved via parameter tuning. An easily implemented trend following concept.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Pattern|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-09-17 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 22/02/2018
//   The value of Fractal Chaos Oscillator is calculated as the difference between 
// the most subtle movements of the market. In general, its value moves between 
// -1.000 and 1.000. The higher the value of the Fractal Chaos Oscillator, the 
// more one can say that it follows a certain trend – an increase in prices trend, 
// or a decrease in prices trend.
//
//   Being an indicator expressed in a numeric value, traders say that this is an 
// indicator that puts a value on the trendiness of the markets. When the FCO reaches 
// a high value, they initiate the “buy” operation, contrarily when the FCO reaches a 
// low value, they signal the “sell” action. This is an excellent indicator to use in 
// intra-day trading.
//
// You can change long to short in the Input Settings
// WARNING:
//  - For purpose educate only
//  - This script to change bars colors.
////////////////////////////////////////////////////////////
fractalUp(pattern) =>
    p = high[pattern+1]
    okl = 1
    okr = 1
	for i = pattern to 1
		okl := iff(high[i] < high[i+1] and okl == 1 , 1, 0)
	for i = pattern+2 to pattern*2+1
		okr := iff(high[i] < high[i-1] and okr == 1, 1, 0)
	res = iff(okl == 1 and okr == 1, p, res[1])
    res

fractalDn(pattern) =>
    p = low[pattern+1]
    okl = 1
    okr = 1
	for i = pattern to 1
		okl := iff(low[i] > low[i+1] and okl == 1 , 1, 0)
	for i = pattern+2 to pattern*2+1
		okr := iff(low[i] > low[i-1] and okr == 1, 1, 0)
	res = iff(okl == 1 and okr == 1, p, res[1])
    res

strategy(title="Fractal Chaos Oscillator", overlay = false)
Pattern = input(1, minval=1)
reverse = input(false, title="Trade reverse")
xUpper = fractalUp(Pattern)
xLower = fractalDn(Pattern)
xRes = iff(xUpper != xUpper[1], 1, 
         iff(xLower != xLower[1], -1, 0))
pos = iff(xRes == 1, 1,
       iff(xRes == -1, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )           
plot(xRes, color=blue, title="FCO")
```

> Detail

https://www.fmz.com/strategy/427136

> Last Modified

2023-09-18 15:10:09
