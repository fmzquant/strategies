
> Name

DMI-and-Moving-Average-Combination-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy combines the 123 reversal strategy, DMI strategy and moving average strategy to form an effective combination strategy. It can make reverse operations at trend reversal points and follow the trend when the trend continues. Meanwhile, it uses moving average to filter and identify market trend directions to improve strategy win rate.

## Strategy Logic

1. 123 reversal strategy: go long when close price is higher than previous close for 2 consecutive days and 9-day slow K line is below 50; go short when close price is lower than previous close for 2 consecutive days and 9-day fast K line is above 50.

2. DMI strategy: go long when +DI crosses above -DI; go short when -DI crosses below +DI. 

3. Moving average strategy: go long when close price crosses above MA; go short when close price crosses below MA.

4. Open positions when three strategies give consistent signals, otherwise close positions.

The strategy combines trend strategies and reversal strategies, which can capture reversal opportunities and trend-following opportunities. The moving average filter can reduce false signals. Multiple strategies verify each other and improve signal reliability.

## Advantage Analysis 

1. Combining multiple strategies improves win rate. 123 reversal for catching turning points, DMI for catching trends and MA filter for filtering signals.

2. Combining reversal and trend strategies enables catching reversals and trends flexibly.

3. MA filter reduces false signals from short-term fluctuations.

4. Combining multiple strategies verifies signals and avoids failure of single strategy.

5. Multiple parameters allow optimization for best parameter combination and higher stability.

## Risk Analysis

1. Reversal strategies are prone to being trapped in range-bound trends. Combining with trend strategies helps avoid.

2. DMI may miss early trend opportunities. Can shorten DMI parameters to improve sensitivity.

3. MA has lagging effect and may delay signal generation. Can shorten MA period to speed up reaction.

4. Although combining strategies improves win rate, it also increases complexity. Careful testing of parameters is needed.

5. The strategy is sensitive to transaction costs. Should relax stop loss to avoid over-trading.

## Optimization Directions

1. Optimize parameters of each strategy to find best combination.

2. Add other indicators like MACD, RSI to filter signals and improve stability. 

3. Add stop loss strategies like trailing stop loss to control risks.

4. Optimize position sizing like fixed/dynamic sizing to improve return.

5. Fine tune parameters for specific products to improve adaptiveness. 

6. Add machine learning models to assist decisions and improve performance.

## Conclusion

This strategy forms a flexible combination system by effectively combining reversal, trend and MA filter strategies. It can capture both reversal and trend-following opportunities, and improves signal reliability through multiple strategies. There is still room for further improvements in parameters, stop loss, position sizing and so on. With skilled application, this practical and expandable strategy can generate considerable profits in live trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|30|Length_MA|
|v_input_6|14|Length_DMI|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-18 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 15/10/2019
// This is combo strategies for get a cumulative signal. 
//
// First strategy
// This System was created from the Book "How I Tripled My Money In The 
// Futures Market" by Ulf Jensen, Page 183. This is reverse type of strategies.
// The strategy buys at market, if close price is higher than the previous close 
// during 2 days and the meaning of 9-days Stochastic Slow Oscillator is lower than 50. 
// The strategy sells at market, if close price is lower than the previous close price 
// during 2 days and the meaning of 9-days Stochastic Fast Oscillator is higher than 50.
//
// Second strategy
// The related article is copyrighted material from Stocks & Commodities Aug 2009 
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
Reversal123(Length, KSmoothing, DLength, Level) =>
    vFast = sma(stoch(close, high, low, Length), KSmoothing) 
    vSlow = sma(vFast, DLength)
    pos = 0.0
    pos := iff(close[2] < close[1] and close > close[1] and vFast < vSlow and vFast > Level, 1,
	         iff(close[2] > close[1] and close < close[1] and vFast > vSlow and vFast < Level, -1, nz(pos[1], 0))) 
	pos

fFilter(xSeriesSum, xSeriesV, Filter) =>
    iff(xSeriesV > Filter, xSeriesSum, 0)

DMIMA(Length_MA, Length_DMI) =>
    pos = 0.0
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
    bMDILong = iff(nPDI > nNDI and nPDI_1 < nNDI_1, true, 
                 iff(nPDI < nNDI and nPDI_1 > nNDI_1, false, false)) 
    bMDIShort = iff(nPDI > nNDI and nPDI_1 < nNDI_1, false, 
                  iff(nPDI < nNDI and nPDI_1 > nNDI_1, true, false)) 
    bMALong = iff(close > nMA and close[1] < nMA_1, true, 
                 iff(close < nMA and close[1] > nMA_1, false, false))
    bMAShort = iff(close > nMA and close[1] < nMA_1, false, 
                 iff(close < nMA and close[1] > nMA_1, true, false))
    pos := iff(bMDILong and bMALong, 1, 
         iff(bMDIShort and bMAShort, -1, nz(pos[1], 0)))
    pos

strategy(title="Combo Backtest 123 Reversal & DMI & Moving Average", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
Length_MA = input(30, minval=1)
Length_DMI = input(14, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posDMIMA = DMIMA(Length_MA,Length_DMI)
pos = iff(posReversal123 == 1 and posDMIMA == 1 , 1,
	   iff(posReversal123 == -1 and posDMIMA == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/427309

> Last Modified

2023-09-19 21:51:14
