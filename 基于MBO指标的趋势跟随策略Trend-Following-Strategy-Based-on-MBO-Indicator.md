
> Name

基于MBO指标的趋势跟随策略Trend-Following-Strategy-Based-on-MBO-Indicator

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy implements a simple trend following trading system based on the MBO indicator. The MBO indicator is similar to the MACD indicator, using the difference between fast and slow moving averages as trading signals. It goes long when the fast moving average crosses above the slow one, and goes short when the fast crosses below the slow one. The strategy follows the trend of the MBO indicator to trade.

## Strategy Logic

The strategy generates trading signals primarily based on the MBO indicator. The MBO indicator was developed by Bryan Strain and Mark Whitley. The indicator is calculated as:

MBO = 25-day Simple Moving Average - 200-day Simple Moving Average

The MBO line is then smoothed by calculating the 18-day Simple Moving Average of MBO, called SMAMBO.

When MBO crosses above SMAMBO, go long. When MBO crosses below SMAMBO, go short.

The key steps in the strategy logic are:

1. Calculate the 25-day and 200-day SMA, assigned to xFastAvg and xSlowAvg. 

2. Calculate the MBO value: MBO = xFastAvg - xSlowAvg

3. Calculate the 18-day SMA of MBO, called SMAMBO.

4. Compare MBO and SMAMBO to generate trading signals pos:

    If MBO > SMAMBO, pos = 1, go long
    
    If MBO < SMAMBO, pos = -1, go short

5. Enter and exit trades based on the value of pos.

The strategy follows the trend exhibited by the MBO indicator. It is a typical trend following strategy.

## Advantage Analysis 

The advantages of this strategy include:

1. Lower trading frequency and avoid unnecessary stops by following medium/long term trends.

2. Flexible MBO parameters adaptable to different market conditions. 

3. Simple and clear logic, easy to understand and implement, good for beginners.

4. Visual indicator clearly shows trend changes to support decisions. 

5. High extensibility to optimize with stops, etc.

## Risk Analysis

The risks of the strategy:

1. Trend following tends to vertical rallies/selloffs that can produce large losses.

2. Fails to exit in a timely manner when trend reverses, potentially increasing losses.

3. Inappropriate parameters may cause too frequent trading or inaccurate signals. 

4. Susceptible to false breakout signals, needs filter mechanisms.

5. No stop loss mechanism results in unlimited loss potential.

Solutions:

1. Use reasonable SMA parameters, not too sensitive.

2. Add trend reversal indicator, exit quickly after reversal signaled.

3. Optimize parameters for accurate signals.  

4. Add filters to avoid false breakouts.

5. Implement stop loss to control loss per trade.

## Optimization Directions

The strategy can be improved in the following ways:

1. Add trend reversal indicator, implement timely stop loss after reversal.

2. Optimize SMA parameters to balance trade frequency and signal quality.

3. Add ATR stop loss to set reasonable stop levels to control loss.

4. Incorporate other indicators to filter false breakouts. 

5. Implement position sizing based on trend strength.

6. Consider requiring triple confirmation before entry.

7. Build parameter optimization mechanism to adjust to different markets.

## Summary

The strategy captures trends using a simple MBO indicator for trend following trading. The advantages are being simple, intuitive visuals, and beginner friendly. But risks like chasing rallies and inability to stop loss exist. We can optimize it by adding reversal signals, optimizing parameters, implementing stops etc, to build a robust trend following system. Overall it is a great introductory trend following strategy, and can become a practical daily trading tool after optimization.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|25|Fastavg|
|v_input_2|200|Slowavg|
|v_input_3|18|Length|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-08 00:00:00
end: 2023-10-08 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 16/08/2018
// MBO indicator is the third component of TFS trading system. This indicator
// was developed by Bryan Strain and Mark Whitley.
// The idea of MBO is similar to moving average convergence/divergence (MACD)
// indicator. It is calculated by subtracting the 200-day moving average from
// the 25-day moving average.
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="TFS: MBO Backtest", shorttitle="TFS: MBO indicator")
Fastavg = input(25, minval=1)
Slowavg = input(200, minval=1)
Length = input(18, minval=1)
reverse = input(false, title="Trade reverse")
hline(0, color=blue, linestyle=line)
xFastAvg = sma(close, Fastavg)
xSlowAvg = sma(close, Slowavg)        
nMBO = xFastAvg - xSlowAvg
xSMAMBO = sma(nMBO, Length)
pos = iff(nMBO > xSMAMBO, 1,
       iff(nMBO < xSMAMBO, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(nMBO, color=red, style = histogram, title="TFS: MBO indicator")
plot(xSMAMBO, color=blue, title="SMA")
```

> Detail

https://www.fmz.com/strategy/428793

> Last Modified

2023-10-09 15:22:04
