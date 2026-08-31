
> Name

Wave-Trend-and-VWMA-Based-Trend-Following-Quant-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/145765ee7e18aaff4a7.png)

## Overview

This strategy combines the Wave Trend oscillator and VWMA indicator to implement a trend following quant trading strategy. It can identify market trends and make buy or sell decisions based on signals from the Wave Trend oscillator. Meanwhile, trade size is determined by signals from the VWMA indicator.

## Strategy Logic  

The strategy is mainly based on the following two indicators:

1. Wave Trend Oscillator: This is an oscillator ported to TradingView by LazyBear, which identifies "waves" in price fluctuations and generates buy/sell signals. The specific calculation is: first calculate the average price ap, then calculate the EMA of ap (called esa), then calculate the EMA of the absolute value of the difference between ap and esa (called d), finally calculate the consistency index ci=(ap-esa)/(0.015*d), the EMA of ci is the Wave Trend (wt1), and the 4-period SMA of wt1 is wt2. When wt1 crosses above wt2, it is a buy signal, and when wt1 crosses below wt2, it is a sell signal.

2. VWMA Indicator: This is a volume weighted moving average line. Based on whether the price is inside or outside the VWMA Bands (Upper and lower bands of VWMA), it generates +1 (bullish), 0 (neutral) or -1 (bearish) signals.  

The Wave Trend signals determine when to buy and sell. While the bullish/bearish signals from VWMA indicator determine the specific trade size for each trade.

## Advantages  

- Combines signals from two indicators to improve decision accuracy  
- VWMA considers volume flow to judge market strength
- Customizable trading sessions to avoid volatility from news  
- Trade size adjusted based on VWMA signals to reduce risks

## Risks

- Potential false signals from Wave Trend  
- Inaccurate volume data may affect VWMA
- Requires long historical data for indicator calculation
- No stop loss in place

## Optimization

- Test different parameter combinations to find optimum  
- Add stop loss strategies
- Consider combining with other indicators for signal filtering
- Test different settings for trading sessions  
- Dynamically adjust trade size calculation 

## Conclusion  

This strategy integrates trend judgment and volume capabilities for an advanced trend following approach. It has some edges but also risks to note. Further improvements in parameters and rules may enhance its stability and profitability.
> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Base Quantity|
|v_input_2|true|Limit Signals to Trading Sessions?|
|v_input_3|8|Session 1: Start Hour|
|v_input_4|25|Session 1: Start Minute|
|v_input_5|10|Session 1: Stop Hour|
|v_input_6|25|Session 1: Stop Minute|
|v_input_7|12|Session 2: Start Hour|
|v_input_8|55|Session 2: Start Minute|
|v_input_9|14|Session 2: Stop Hour|
|v_input_10|55|Session 2: Stop Minute|
|v_input_11|false|Close All at End of Session 1|
|v_input_12|true|Close All at End of Session 2|
|v_input_13|true|VWMA: Use Volume (uncheck if equity does not have volume)|
|v_input_14|21|VWMA: Length|
|v_input_15|10|Wave Trend: Channel Length|
|v_input_16|21|Wave Trend: Average Length|
|v_input_17|60|Wave Trend: Over Bought Level 1|
|v_input_18|53|Wave Trend: Over Bought Level 2|
|v_input_19|-60|Wave Trend: Over Sold Level 1|
|v_input_20|-53|Wave Trend: Over Sold Level 2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-26 00:00:00
end: 2024-01-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at
// https://mozilla.org/MPL/2.0/
//
// Created by jadamcraig
// 
// This strategy benefits from extracts taken from the following
// studies/authors.  Thank you for developing and sharing your ideas in an open
// way!
//  * Wave Trend Strategy by thomas.gigure
//  * cRSI + Waves Strategy with VWMA overlay by Dr_Roboto
//
//@version=4

//==============================================================================
//==============================================================================
overlay = true  // plots VWMA (need to close and re-add)
//overlay = false // plots Wave Trend (need to close and re-add)

strategy("Wave Trend w/ VWMA overlay", overlay=overlay)
     
baseQty = input(defval=1, title="Base Quantity", type=input.float, minval=1)

useSessions = input(defval=true, title="Limit Signals to Trading Sessions?")
sess1_startHour = input(defval=8, title="Session 1: Start Hour",
     type=input.integer, minval=0, maxval=23)
sess1_startMinute = input(defval=25, title="Session 1: Start Minute",
     type=input.integer, minval=0, maxval=59)
sess1_stopHour = input(defval=10, title="Session 1: Stop Hour",
     type=input.integer, minval=0, maxval=23)
sess1_stopMinute = input(defval=25, title="Session 1: Stop Minute",
     type=input.integer, minval=0, maxval=59)
sess2_startHour = input(defval=12, title="Session 2: Start Hour",
     type=input.integer, minval=0, maxval=23)
sess2_startMinute = input(defval=55, title="Session 2: Start Minute",
     type=input.integer, minval=0, maxval=59)
sess2_stopHour = input(defval=14, title="Session 2: Stop Hour",
     type=input.integer, minval=0, maxval=23)
sess2_stopMinute = input(defval=55, title="Session 2: Stop Minute",
     type=input.integer, minval=0, maxval=59)
sess1_closeAll = input(defval=false, title="Close All at End of Session 1")
sess2_closeAll = input(defval=true, title="Close All at End of Session 2")

//==============================================================================
//==============================================================================
//                    Volume Weighted Moving Average (VWMA)
//==============================================================================
//==============================================================================
plotVWMA = overlay

// check if volume is available for this equity
useVolume = input(
     title="VWMA: Use Volume (uncheck if equity does not have volume)",
     defval=true)

vwmaLen = input(defval=21, title="VWMA: Length", type=input.integer, minval=1,
     maxval=200)
vwma = vwma(close, vwmaLen)
vwma_high = vwma(high, vwmaLen)
vwma_low = vwma(low, vwmaLen)

if not(useVolume)
    vwma := wma(close, vwmaLen)
    vwma_high := wma(high, vwmaLen)
    vwma_low := wma(low, vwmaLen)

// +1 when above, -1 when below, 0 when inside
vwmaSignal(priceOpen, priceClose, vwmaHigh, vwmaLow) =>
    sig = 0
    color = color.gray
    if priceClose > vwmaHigh
        sig := 1
        color := color.green
    else if priceClose < vwmaLow
        sig := -1
        color := color.red
    else
        sig := 0
        color := color.gray
    [sig,color]

[vwma_sig, vwma_color] = vwmaSignal(open, close, vwma_high, vwma_low)

priceAboveVWMA = vwma_sig ==  1 ? true : false
priceBelowVWMA = vwma_sig == -1 ? true : false
// plot(priceAboveVWMA?2.0:0,color=color.blue)
// plot(priceBelowVWMA?2.0:0,color=color.maroon)

//bandTrans = input(defval=70, title="VWMA Band Transparancy (100 invisible)",
//     type=input.integer, minval=0, maxval=100)
//fillTrans = input(defval=70, title="VWMA Fill Transparancy (100 invisible)",
//     type=input.integer, minval=0, maxval=100)
bandTrans = 60
fillTrans = 60

// ***** Plot VWMA *****
highband = plot(plotVWMA?fixnan(vwma_high):na, title='VWMA High band', 
     color = vwma_color, linewidth=1, transp=bandTrans)
lowband = plot(plotVWMA?fixnan(vwma_low):na, title='VWMA Low band',
     color = vwma_color, linewidth=1, transp=bandTrans)
fill(lowband, highband, title='VWMA Band fill', color=vwma_color,
     transp=fillTrans)
plot(plotVWMA?vwma:na, title='VWMA', color = vwma_color, linewidth=3,
     transp=bandTrans)

//==============================================================================
//==============================================================================
//                                  Wave Trend
//==============================================================================
//==============================================================================
plotWaveTrend = not(overlay)

n1 = input(10, "Wave Trend: Channel Length")
n2 = input(21, "Wave Trend: Average Length")
obLevel1 = input(60, "Wave Trend: Over Bought Level 1")
obLevel2 = input(53, "Wave Trend: Over Bought Level 2")
osLevel1 = input(-60, "Wave Trend: Over Sold Level 1")
osLevel2 = input(-53, "Wave Trend: Over Sold Level 2")

ap = hlc3 
esa = ema(ap, n1)
d = ema(abs(ap - esa), n1)
ci = (ap - esa) / (0.015 * d)
tci = ema(ci, n2)
 
wt1 = tci
wt2 = sma(wt1,4)

plot(plotWaveTrend?0:na, color=color.gray)
plot(plotWaveTrend?obLevel1:na, color=color.red)
plot(plotWaveTrend?osLevel1:na, color=color.green)
plot(plotWaveTrend?obLevel2:na, color=color.red, style=3)
plot(plotWaveTrend?osLevel2:na, color=color.green, style=3)

plot(plotWaveTrend?wt1:na, color=color.green)
plot(plotWaveTrend?wt2:na, color=color.red, style=3)
plot(plotWaveTrend?wt1-wt2:na, color=color.blue, transp=80)

//==============================================================================
//==============================================================================
//                               Order Management
//==============================================================================
//==============================================================================
// Define Long and Short Conditions
longCondition = crossover(wt1, wt2)
shortCondition = crossunder(wt1, wt2)

// Define Quantities
orderQty = baseQty * 2
if (longCondition)
    if (vwma_sig == 1)
        if ( strategy.position_size >= (baseQty * 4 * -1) and 
             strategy.position_size < 0 )
            orderQty := baseQty * 4 + abs(strategy.position_size)
        else
            orderQty := baseQty * 4
    else if (vwma_sig == 0)
        if ( strategy.position_size >= (baseQty * 2 * -1) and 
             strategy.position_size < 0 )
            orderQty := baseQty * 2 + abs(strategy.position_size)
        else
            orderQty := baseQty * 2
    else if (vwma_sig == -1)
        if ( strategy.position_size >= (baseQty * 1 * -1) and 
             strategy.position_size < 0 )
            orderQty := baseQty * 1 + abs(strategy.position_size)
        else
            orderQty := baseQty * 1
else if (shortCondition)
    if (vwma_sig == -1)
        if ( strategy.position_size <= (baseQty * 4) and 
             strategy.position_size > 0 )
            orderQty := baseQty * 4 + strategy.position_size
        else
            orderQty := baseQty * 4
    else if (vwma_sig == 0)
        if ( strategy.position_size <= (baseQty * 2) and 
             strategy.position_size > 2 )
            orderQty := baseQty * 2 + strategy.position_size
        else
            orderQty := baseQty * 2
    else if (vwma_sig == 1)
        if ( strategy.position_size <= (baseQty * 1) and 
             strategy.position_size > 0 )
            orderQty := baseQty * 1 + strategy.position_size
        else
            orderQty := baseQty * 1

// Determine if new trades are permitted
newTrades = false
if (useSessions)
    if ( hour == sess1_startHour and minute >= sess1_startMinute )
        newTrades := true
    else if ( hour > sess1_startHour and hour < sess1_stopHour )
        newTrades := true
    else if ( hour == sess1_stopHour and minute < sess1_stopMinute )
        newTrades := true
    else if ( hour == sess2_startHour and minute >= sess2_startMinute )
        newTrades := true
    else if ( hour > sess2_startHour and hour < sess2_stopHour )
        newTrades := true
    else if ( hour == sess2_stopHour and minute < sess2_stopMinute )
        newTrades := true
    else
        newTrades := false
else
    newTrades := true

// Long Signals
if ( longCondition  )
    strategy.order("Buy", strategy.long, orderQty)

// Short Signals
if ( shortCondition  )
    strategy.order("Sell", strategy.short, orderQty)

// Close open position at end of Session 1, if enabled
if (sess1_closeAll )
    strategy.close_all()
    
// Close open position at end of Session 2, if enabled
if (sess2_closeAll  )
    strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/440118

> Last Modified

2024-01-26 17:35:29
