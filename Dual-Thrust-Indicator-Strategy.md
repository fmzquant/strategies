
> Name

Dual-Thrust-Indicator-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

The core idea of this strategy is to combine the dual thrust indicator with a basic moving average line to implement trend following and trend reversal trading. When the price is in the same direction as the indicator, follow the trend; when the price is in the opposite direction of the indicator, take reversal trades.

## Strategy Logic

The strategy is mainly based on three custom indicators:

1. Dual Thrust Indicator (Trend): Calculates the relationship between the price and the overbought/oversold channel to determine the bullish and bearish trends, returning 1, 0, -1 three states.

2. Overbought/Oversold Channel (Tsl): Calculates the upper and lower rails with reference to ATR. Breaking through the upper rail is regarded as overbought, and breaking through the lower rail is regarded as oversold.

3. Basic Moving Average Line (MA): Calculates the 20-period simple moving average of the closing price.

Specifically, the strategy judges whether the price is in bullish, sideways or bearish state according to the dual thrust indicator value. When the dual thrust indicator is 1, it means a bullish state; when the dual thrust indicator is -1, it means a bearish state. At this point, if the price is in the same direction as the indicator, a trend following strategy is adopted, going long or short at the right spot. If the price is in the opposite direction of the indicator, such as the indicator showing bullish while the price breaking through the lower rail, a reversal strategy is adopted by going short to capture profits.

In addition, the breaking through of price on moving average line also serves as an auxiliary signal to guide the trading direction. Go long when the price breaks through the average line upwards, and go short when the price breaks through the average line downwards.

The specific long trade strategies are as follows:

1. Dual thrust indicator > 0, price rises to break through the upper rail, which belongs to trend following, go long.

2. Dual thrust indicator < 0, price falls to break through the lower rail, which belongs to trend reversal, go short.

3. Closing price > Opening price > Pivot level, regarded as breaking the pivot to go long, go long. 

4. Closing price breaks through upper rail, and closing price > Moving average line, go long.

The short trade strategies are as follows:

1. Dual thrust indicator < 0, price falls to break through the lower rail, which belongs to trend following, go short.

2. Dual thrust indicator > 0, price rises to break through the upper rail, which belongs to trend reversal, go long.

3. Opening price > Closing price < Pivot level, regarded as breaking the pivot to go short, go short.

4. Closing price breaks through lower rail, and closing price < Moving average line, go short.

The exit strategy is simple by stopping loss when price breaks through the overbought/oversold channel again.

## Advantage Analysis 

The strategy has the following advantages:

1. The dual thrust indicator can accurately determine the market trend and is the core indicator of the strategy.

2. The overbought/oversold channel combined with the indicator can discover potential reversal opportunities. 

3. The basic moving average line can serve as an auxiliary filtering signal to avoid false breakouts.

4. The pivot point combined with the dual thrust indicator forms high-probability trading spots.

5. It has both trend following and reversal trading capabilities for more profit opportunities.

6. The overbought/oversold channel stop loss is simple and clear, which is beneficial for risk control.

## Risk Analysis

The strategy also has the following risks:

1. The dual thrust indicator may give out wrong signals, and needs to be filtered with other indicators.

2. Breakout trading is prone to being trapped, so strict stop loss is required.

3. Improper moving average period setting may miss trends or generate false signals. 

4. The pivot points need backtesting to verify probability reliability.

5. The overbought/oversold channel needs optimization of parameters to adapt to different products.

6. Mismatch of indicator parameters may lead to frequent trading.

To address these risks, the following measures can be taken:

1. Combine other indicators like K-line, volume to verify dual thrust indicator signals.

2. Strictly follow the overbought/oversold channel stop loss strategy for quick stop loss.

3. Test different moving average period parameters to find the optimal one. 

4. Fully backtest the pivot point strategy probability.

5. Optimize parameters to find the optimal combination for each product. 

6. Adjust indicator parameters to keep the overall system running smoothly.

## Optimization Directions

The strategy can also be optimized in the following aspects:

1. Increase machine learning algorithms to train the dual thrust indicator with big data. This can improve accuracy and reduce false signals.

2. Add adaptive channels to automatically adjust channel parameters based on market volatility. This can improve breakout accuracy.

3. Use deep learning to extract more changeable indicators to optimize entry and exit strategies.

4. Add advanced stop loss algorithms that can track trends for stop loss, avoiding being stopped out by reversals.

5. Conduct parameter optimization and combination tests to improve overall strategy stability. 

6. Add risk management modules for more scientific risk control.

## Summary

The strategy combines trend following and trend reversal organically by judging market structure with the dual thrust indicator and generating trading signals with channels and moving average lines. It has the advantages of good indicator effectiveness, abundant trading opportunities, and clear stop loss. At the same time, it also has certain risks that need further optimization to improve stability. Overall, the strategy fully integrates the ideas of trend trading and reversal trading, and is worth further research and application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Pivot Type: Daily|Intraday|Weekly|
|v_input_2|true|Plot PP|
|v_input_3|true|Plot S1 and R1|
|v_input_4|true|Plot S2 and R2|
|v_input_5|true|Plot S3 and R3|
|v_input_6|true|Plot S3 and R3|
|v_input_7|0800-1600|Trading Session|
|v_input_8|false|Highlight Session?|
|v_input_9|false|Show Labels?|
|v_input_10|2|Factor|
|v_input_11|10|Pd|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-25 00:00:00
end: 2023-09-24 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © amysojexson

//@version=3
strategy(title="Pivots strategy", overlay=true)

// Input settings
// Create a pull-down menu for the pivot type
pivotType = input(title="Pivot Type",
     options=["Daily", "Intraday", "Weekly"], defval="Daily")

// Make toggles for pivot level options
plotPP   = input(title="Plot PP", type=bool, defval=true)
plotS1R1 = input(title="Plot S1 and R1", type=bool, defval=true)
plotS2R2 = input(title="Plot S2 and R2", type=bool, defval=true)
plotS3R3 = input(title="Plot S3 and R3", type=bool, defval=true)
plotTCBC = input(title="Plot S3 and R3", type=bool, defval=true)
// Configure session options
sessRange = input(title="Trading Session",  defval="0800-1600")
showSess  = input(title="Highlight Session?", type=bool, defval=false)

// Enable or disable pivot labels
showLabels = input(title="Show Labels?", type=bool, defval=false)

// Step 2. Calculate indicator values
// Create a function to fetch daily and weekly data
GetData(res, data) =>
    security(syminfo.tickerid, res, data[1],
         lookahead=barmerge.lookahead_on)

// Fetch daily and weekly price data
dailyHigh  = GetData("D", high)
dailyLow   = GetData("D", low)
dailyClose = GetData("D", close)

weeklyHigh  = GetData("W", high)
weeklyLow   = GetData("W", low)
weeklyClose = GetData("W", close)

// Determine session pivot data
// First see how the price bar relates to
// the session time range
inSession = not na(time(timeframe.period, sessRange)[1])
sessStart = inSession and not inSession[1]
sessEnd   = not inSession and inSession[1]

// Determine session price data
sessHigh  = 0.0
sessLow   = 0.0
sessClose = 0.0

sessHigh := sessStart ? high :
     inSession ? max(high, sessHigh[1]) : na
sessLow := sessStart ? low :
     inSession ? min(low, sessLow[1]) : na
sessClose := sessEnd ? close[1] : na

// Compute high, low, close from previous intra-day session
highPrevSess  = 0.0
lowPrevSess   = 0.0
closePrevSess = 0.0

highPrevSess  := sessEnd ? fixnan(sessHigh) : highPrevSess[1]
lowPrevSess   := sessEnd ? fixnan(sessLow) : lowPrevSess[1]
closePrevSess := sessEnd ? fixnan(sessClose) : closePrevSess[1]

// Now figure out which kind of price data
// to use for the pivot calculation
theHigh = if (pivotType == "Daily")
    dailyHigh
else
    if (pivotType == "Intraday")
        highPrevSess
    else
        weeklyHigh

theLow = if (pivotType == "Daily")
    dailyLow
else
    if (pivotType == "Intraday")
        lowPrevSess
    else
        weeklyLow

theClose = if (pivotType == "Daily")
    dailyClose
else
    if (pivotType == "Intraday")
        closePrevSess
    else
        weeklyClose

// Finally calculate the pivot levels
pp = (theHigh + theLow + theClose) / 3
bc= (theHigh + theLow)/2
tc= (pp-bc)+pp

r1 = pp+(.382*(theHigh-theLow))
s1 = pp-(.382*(theHigh-theLow))
r2 = pp +(.618*(theHigh-theLow))
s2 = pp -(.618*(theHigh-theLow))
r3 = pp +(1*(theHigh-theLow))
s3 = pp -(1*(theHigh-theLow))

// Step 3. Output indicator data
// Plot the various pivot levels
plot(series=plotS3R3 ? r3 : na, title="R3",
     style=circles, linewidth=1, color=#0023FF)
plot(series=plotS2R2 ? r2 : na, title="R2",
     style=circles, linewidth=1, color=#1E90FF)
plot(series=plotS1R1 ? r1 : na, title="R1",
     style=circles, linewidth=1, color=#09E0F3)

plot(series=plotTCBC ? tc : na, title="TC",
     style=circles, linewidth=.75, color=#FF00D1)
plot(series=plotPP ? pp : na, title="PP",
     style=circles, linewidth=1, color=#000000)
plot(series=plotTCBC ? bc : na, title="BC",
     style=circles, linewidth=.75, color=#FF00D1)

plot(series=plotS1R1 ? s1 : na, title="S1",
     style=circles, linewidth=1, color=#09E0F3)
plot(series=plotS2R2 ? s2 : na, title="S2",
     style=circles, linewidth=1, color=#1E90FF)
plot(series=plotS3R3 ? s3 : na, title="S3",
     style=circles, linewidth=1, color=#0023FF)

// Display the pivot names on the chart, if applicable
newPivots = (showLabels == false) ? false :
     (pivotType == "Intraday") ? sessEnd :
     (pivotType == "Daily") ? dayofmonth != dayofmonth[1] :
     dayofweek == monday and dayofmonth != dayofmonth[1]

plotchar(series=newPivots and plotS3R3 ? r3 : na,
     char='', text="R3", offset=1,
     location=location.absolute,
     color=#0023FF, title="R3 label")

plotchar(series=newPivots and plotS2R2 ? r2 : na,
     char='', text="R2", offset=1,
     location=location.absolute,
     color=#1E90FF, title="R2 label")

plotchar(series=newPivots and plotS1R1 ? r1 : na,
     char='', text="R1", offset=1,
     location=location.absolute,
     color=#09E0F3, title="R1 label")

plotchar(series=newPivots and plotTCBC ? r1 : na,
     char='', text="TC", offset=1,
     location=location.absolute,
     color=#FF00D1, title="TC label")
     
plotchar(series=newPivots and plotTCBC ? r1 : na,
     char='', text="BC", offset=1,
     location=location.absolute,
     color=#FF00D1, title="BC label")

plotchar(series=newPivots and plotS1R1 ? s1 : na,
     char='', text="S1", offset=1,
     location=location.absolute,
     color=#09E0F3, title="S1 label")

plotchar(series=newPivots and plotS2R2 ? s2 : na,
     char='', text="S2", offset=1,
     location=location.absolute,
     color=#1E90FF, title="S2 label")

plotchar(series=newPivots and plotS3R3 ? s3 : na,
     char='', text="S3", offset=1,
     location=location.absolute,
     color=#0023FF, title="S3 label")

// Highlight the intra-day price data session on the chart
bgcolor(color=showSess and inSession and (pivotType == "Intraday") ?
     orange : na, transp=95)

// Step 4. Create indicator alerts
alertcondition(condition=cross(close, s3),
     title="Pivot S3 Cross",
     message="Prices crossed Pivot S3 level")

alertcondition(condition=cross(close, s2),
     title="Pivot S2 Cross",
     message="Prices crossed Pivot S2 level")

alertcondition(condition=cross(close, s1),
     title="Pivot S1 Cross",
     message="Prices crossed Pivot S1 level")
     
alertcondition(condition=cross(close, tc),
     title="Pivot TC Cross",
     message="Prices crossed Pivot TC level")

alertcondition(condition=cross(close, pp),
     title="Pivot PP Cross",
     message="Prices crossed the main Pivot Point level")
     
alertcondition(condition=cross(close, bc),
     title="Pivot BC Cross",
     message="Prices crossed Pivot BC level")

alertcondition(condition=cross(close, r1),
     title="Pivot R1 Cross",
     message="Prices crossed Pivot R1 level")

alertcondition(condition=cross(close, r2),
     title="Pivot R2 Cross",
     message="Prices crossed Pivot R2 level")

alertcondition(condition=cross(close, r3),
     title="Pivot R3 Cross",
     message="Prices crossed Pivot R3 level")
    
MA = sma(close, 20)
plot(MA, color=red)

Factor				= input(2, type=float)
Pd					= input(10, minval=1,maxval = 100)
Up					= hl2-(Factor*atr(Pd))
Dn					= hl2+(Factor*atr(Pd))
TrendUp				= 0.0
TrendUp				:= close[1]>TrendUp[1]? max(Up,TrendUp[1]) : Up
TrendDown			= 0.0
TrendDown			:= close[1]<TrendDown[1]? min(Dn,TrendDown[1]) : Dn
Trend				= 0.0
Trend 				:= close > TrendDown[1] ? 1: close< TrendUp[1]? -1: nz(Trend[1],1)
Tsl 				= Trend==1? TrendUp: TrendDown

plot(Tsl, color=blue)

if close>open
    if open<pp
        if close>pp
            if close>MA
                strategy.entry("long", true) 
if close<open
    if open>pp
        if close<pp
            if close<MA
                strategy.entry("short", false) 
                
strategy.close("long", when = open<Tsl)
strategy.close("short", when = open>Tsl)
```

> Detail

https://www.fmz.com/strategy/427809

> Last Modified

2023-09-25 17:34:46
