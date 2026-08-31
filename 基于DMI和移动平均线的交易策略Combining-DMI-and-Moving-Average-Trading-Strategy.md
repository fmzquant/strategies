
> Name

基于DMI和移动平均线的交易策略Combining-DMI-and-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy combines the Directional Movement Index (DMI) and moving average to identify trend direction for  and generate trading signals. It will produce buy and sell signals when DMI indicates the price is in a trending state and the moving average confirms the trend direction.

## Strategy Logic 

The strategy is based on two main indicators:

1. DMI, including DMI+ and DMI-, is used to identify the existence and direction of a trend. When DMI+ is above DMI-, an uptrend is present. When DMI- is above DMI+, a downtrend is present.

2. The moving average, usually set to 15 to 50 days, is used to determine the price trend direction. When price is above (below) the moving average, an uptrend (downtrend) is indicated.

The strategy first calculates the DMI+, DMI-, and moving average. When DMI shows a trending state (DMI+ above DMI- or vice versa) and the moving average confirms the direction, a trading signal is generated. Specifically:

- When DMI+ crosses above DMI- and price crosses above MA, go long.

- When DMI- crosses above DMI+ and price crosses below MA, go short.

A reverse input option is also included. When enabled, the long and short signals are reversed.

## Advantage Analysis

Combining a trend-following indicator like DMI and a trend indicator like the moving average can improve signal reliability by utilizing the strengths of both. 

The advantage of DMI is its quick identification of emerging trends. The moving average helps filter noise and confirm the trend direction. Using both together allows earlier trend entries while avoiding false signals in non-trending markets.

The reverse option also adds flexibility to trade with or against the trend.

## Risk Analysis

The main risks of this strategy are:

1. Wrong signals may occur around trend transitions, leading to losses. Adjusting parameters or using stops can control this risk.

2. Trend formation takes time. In the meantime, price fluctuations may generate false signals. Lengthening DMI and MA periods can filter out this noise.

3. Reversal trading has larger loss risks in adverse moves. With the reverse option, loss size should be limited and trailing stops used to lock profits.

4. Parameters need to be re-optimized for different products and timeframes. Copying parameters directly may not work well.

## Optimization Directions

Possible optimizations for this strategy include:

1. Testing different moving average periods to find the best fit for trend transitions.

2. Testing the DMI smoothing periods to filter out short reversals within trends. 

3. Evaluating the effect of the reverse option versus default trend-following in historical backtests to choose the better approach.

4. Incorporating stop strategies like trailing stops, time stops, or breakout stops to limit loss size.

5. Evaluating parameter performance across different products and timeframes and optimizing parameters.

6. Adding filters like RSI to avoid false signals at localized extremes.

## Summary

This strategy combines the strengths of the trend-following DMI and moving average indicators to enter trends early while avoiding whipsaws in choppy markets. The reverse option also adds flexibility. Further enhancements in stability can come from parameter optimization, stops, and combining with additional filters. However, parameters will need to be re-tested for applicability across different products and timeframes.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|30|Length_MA|
|v_input_2|14|Length_DMI|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-28 00:00:00
end: 2023-09-27 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 03/03/2017
// The related article is copyrighted material from Stocks & Commodities Aug 2009 
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Combining DMI And Moving Average For A EUR/USD Trading System")
Length_MA = input(30, minval=1)
Length_DMI = input(14, minval=1)
reverse = input(false, title="Trade reverse")
xMA = sma(close, Length_MA)
up = change(high)
down = -change(low)
trur = rma(tr, Length_DMI)
xPDI = fixnan(100 * rma(up > down and up > 0 ? up : 0, Length_DMI) / trur)
xNDI = fixnan(100 * rma(down > up and down > 0 ? down : 0, Length_DMI) / trur)
nPDI = xPDI
nNDI = xNDI
nMA = xMA
nPDI_1 = xPDI[1]
nNDI_1 = xNDI[1]
nMA_1 = xMA[1]
bMDILong =iff(nPDI > nNDI and nPDI_1 < nNDI_1, true, 
           iff(nPDI < nNDI and nPDI_1 > nNDI_1, false, false)) 
bMDIShort =  iff(nPDI > nNDI and nPDI_1 < nNDI_1, false, 
              iff(nPDI < nNDI and nPDI_1 > nNDI_1, true, false)) 
bMALong = iff(close > nMA and close[1] < nMA_1, true, 
           iff(close < nMA and close[1] > nMA_1, false, false))
bMAShort = iff(close > nMA and close[1] < nMA_1, false, 
             iff(close < nMA and close[1] > nMA_1, true, false))
pos = iff(bMDILong and bMALong, 1, 
     iff(bMDIShort and bMAShort, -1, nz(pos[1], 0)))
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1 )
    strategy.entry("Long", strategy.long)
if (possig == -1 )
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(nPDI, color=green, title="DMI Plus")
plot(nNDI, color=red, title="DMI Minus")
```

> Detail

https://www.fmz.com/strategy/428075

> Last Modified

2023-09-28 12:39:44
