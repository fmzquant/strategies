
> Name

V2Smoothed-RSI-Backtesting-Strategy-V2

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy is an enhanced version of the RSI indicator developed by John Ehlers. Its main advantage is smoothing the RSI curve while minimizing lag.

## How it Works 

1. Calculate price average xValue using 6 bars.

2. Calculate upward sum CU23 and downward sum CD23 based on xValue.

3. Compute normalized RES value nRes as CU23/(CU23 + CD23).

4. Generate long/short signals by comparing nRes to thresholds.

5. Option to reverse signals. 

6. Enter long/short based on signals.

## Advantages

- Smoothed RSI curve reduces false signals
- Adjustable parameters for finding optimal values
- Reverse trading adaptable to various market conditions
- Simple and intuitive logic

## Risks

- Poor parameter optimization can cause excessive false signals
- Some lag remains, may miss short reversals  
- Reverse trading increases trade frequency and costs

## Optimization Directions

- Optimize parameters to find best combination
- Filter signals with additional indicators 
- Add stop loss logic to control single loss
- Backtest to find optimal holding period
- Explore machine learning for parameter optimization

## Conclusion

The strategy effectively smoothes the RSI curve by enhancing its calculation, reducing false signals to some degree. Further filtering and parameter optimization can improve performance. But some lag persists as a momentum system. Overall, a simple and reliable breakout system worth further research and optimization.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Length|
|v_input_2|0.8|TopBand|
|v_input_3|0.2|LowBand|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-13 00:00:00
end: 2023-09-19 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 20/11/2017
// This is new version of RSI oscillator indicator, developed by John Ehlers. 
// The main advantage of his way of enhancing the RSI indicator is smoothing 
// with minimum of lag penalty. 
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Smoothed RSI Backtest ver.2")
Length = input(10, minval=1)
TopBand = input(0.8, step=0.01)
LowBand = input(0.2, step=0.01)
reverse = input(false, title="Trade reverse")
hline(TopBand, color=red, linestyle=line)
hline(LowBand, color=green, linestyle=line)
xValue = (close + 2 * close[1] + 2 * close[2] + close[3] ) / 6
CU23 = sum(iff(xValue > xValue[1], xValue - xValue[1], 0), Length)
CD23 = sum(iff(xValue < xValue[1], xValue[1] - xValue, 0), Length)
nRes = iff(CU23 + CD23 != 0, CU23/(CU23 + CD23), 0)
pos = iff(nRes > TopBand, 1,
	   iff(nRes < LowBand, -1, nz(pos[1], 0))) 
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

https://www.fmz.com/strategy/427467

> Last Modified

2023-09-21 15:02:06
