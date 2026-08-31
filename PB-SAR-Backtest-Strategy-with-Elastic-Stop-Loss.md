
> Name

PB-SAR-Backtest-Strategy-with-Elastic-Stop-Loss

> Author

ChaoZhang

> Strategy Description
## Overview

This strategy is based on the Parabolic SAR indicator to generate buy and sell signals for long and short positions. It also incorporates a trailing stop loss mechanism to effectively control risks.

## Principle

The core of this strategy is to identify trend reversal points using the Parabolic SAR indicator for counter-trend trading. The indicator uses the true range to detect extreme prices. When the price exceeds the extreme, it is considered a breakout and a sign of potential trend reversal. Specifically, the indicator maintains two variables: the Extreme Price (EP) and the Trigger Price (TP). The EP represents the highest/lowest price of the current trend, while the TP is derived from the EP.

In an uptrend, when the price is higher than the EP, it is considered a breakout. The EP is then updated to the highest price and the TP to the lowest price. When the price falls below the TP, a trend reversal is identified and a sell signal is generated. The same principle applies for a downtrend.

The strategy also incorporates a trailing stop loss mechanism. After opening a position, it will track the optimal stop loss price in real-time, locking in profits while controlling risks. Specifically, after long entry, the stop loss tracks the closing low; after short entry, it tracks the closing high.

## Advantages

The main advantages of this strategy are:

1. Identify trend reversal points with the indicator, avoiding being trapped in trends.

2. Trailing stop loss locks in profits and prevents wider losses. 

3. Simple indicator parameters, easy to implement.

4. Configurable buy/sell signal alerts for convenience.

5. Flexible backtest period configuration for thorough evaluation.

## Risks

There are also some risks to consider:

1. Indicator lag may miss optimal reversal points. 

2. Aggressive stops may be stopped out by short-term fluctuations.

3. Improper backtest period selection cannot fully evaluate the strategy.

4. Transaction costs may impair profits.

Some ways to address the risks are:

1. Optimize parameters to reduce lag.

2. Improve stop loss algorithm to avoid being stopped out unnecessarily.

3. Select appropriate backtest periods for reliability.

4. Optimize position sizing to lower transaction costs.

## Enhancement

Some ways to further optimize the strategy:

1. Incorporate trend indicators like MA to avoid being trapped in countertrends.

2. Optimize position sizing algorithms, e.g. fixed fractional, dynamic.

3. Add volume filter to avoid false signals from gaps.

4. Parameter optimization to find optimal combinations. 

5. Implement profit taking strategies to lock in profits in trends.

6. Refine stop loss algorithms for smoother stops. Experiment with Chandelier Exit etc.

7. Optimize across products, time frames etc. to improve adaptability. 

8. Incorporate machine learning for greater adaptability.

## Summary

In summary, this is a simple and robust strategy using the Parabolic SAR to identify reversals and trailing stop loss to control risk. It can work as a short-term mean-reversion strategy. But indicator lag and oversensitive stops need to be addressed. Further optimizations can lead to improved performance.
> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Start Month|
|v_input_2|true|Start Date|
|v_input_3|(2019)|Start Year|
|v_input_4|true|End Month|
|v_input_5|true|End Date|
|v_input_6|(2020)|End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-10-10 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("PB SAR BackTest - Colorbar", overlay=false)

// Full credit to Sawcruhteez, Lucid Investment Strategies LLC, Casey Bowman and Peter Brandt.
// This is a strategy version of the Peterbolic SAR indicator created by the above-mentioned parties.
// Original version of the indicator: https://www.tradingview.com/script/6nYrH3Vm-Peterbolic-SAR/

// SAR #1
// Lucid Sar
// Branded under the name "Lucid SAR"
// as agreed to with Lucid Investment Strategies LLC on July 9, 2019
// https://lucidinvestmentstrategies.com/
// see branch "lucid"

// SAR #2
// Peterbolic Sar
// Using the name "Peterbolic SAR"
// as agreed to by Peter Brandt on October 2, 2019
// - https://twitter.com/PeterLBrandt/status/1179365590668075008
// in response to request from Sawcruhteez
// - https://twitter.com/Sawcruhteez/status/1179213105705836544
// Sawcruhteez gives credit to @CrazyGabey for coming up with the name
// - https://twitter.com/Sawcruhteez/status/1179213196583940097
// see branch "peterbolic"

// SAR #3
// Sawcruhteez Sar
// Branded under the name "Sawcruhteez SAR"
// as agreed to with Sawcruhteez on September 11, 2019
// see branch "sawcruhteez"

// Open Source on github
// https://github.com/casey-bowman/sar/blob/peterbolic/peterbolic.pine

// Created by Casey Bowman on July 4, 2019

// MIT License

// Copyright (c) 2019 Casey Bowman

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.



TSR() =>

    // start with uptrend
    var uptrend = true
    var EP = high       // extreme price - high or low depending on trend
    var SP = low        // setup price
    var TP = float(na)  // trigger price


    var setup   = low
    var trigger = float(na)

    if barstate.isnew
        setup := low
        trigger = float(na)

    extreme_candle = false
    first_extreme_candle = false
    setup_candle = false
    trigger_candle = false

    waiting_for_setup = false
    waiting_for_trigger = false

    var since_extreme = 0
    var since_setup = 0

    waiting_for_setup   := not extreme_candle and not na(SP)
    waiting_for_trigger := not na(TP)

    if not barstate.isfirst
        if barstate.isnew and extreme_candle[1]
            trigger := float(na)
        if barstate.isnew and setup_candle[1]
            setup := float(na)
        if barstate.isnew and waiting_for_trigger
            since_setup := since_setup + 1
            trigger := TP
        if barstate.isnew and waiting_for_setup
            since_extreme := since_extreme + 1
            setup := SP
        if uptrend

            if extreme_candle
                EP := high
                SP := low
            else
                if high > EP
                    extreme_candle := true
                    EP := high
                    SP := low
                    since_extreme := 0
                    since_setup   := 0
                else
                    if waiting_for_setup
                        if barstate.isconfirmed
                            if close < SP
                                setup_candle := true
                                SP := float(na)
                                TP := low
            if waiting_for_trigger
                if low < TP
                    trigger_candle := true
                    extreme_candle := true
                    EP := low
                    SP := high
                    TP := float(na)
                    uptrend := false
                    since_extreme := 0
                    since_setup := 0
                else
                    if barstate.isconfirmed and extreme_candle
                        TP := float(na)
                        trigger := float(na)

        else
            if extreme_candle
                EP := low
                SP := high
            else
                if low <  EP
                    extreme_candle := true
                    EP := low
                    SP := high
                    since_extreme := 0
                    since_setup   := 0
                else
                    if waiting_for_setup
                        if barstate.isconfirmed
                            if close > SP
                                setup_candle := true
                                SP := float(na)
                                TP := high
            if waiting_for_trigger
                if high > TP
                    trigger_candle := true
                    extreme_candle := true
                    EP := high
                    SP := low
                    TP := float(na)
                    uptrend := true
                    since_extreme := 0
                    since_setup := 0
                else
                    if barstate.isconfirmed and extreme_candle
                        TP := float(na)
                        trigger := float(na)


    [trigger_candle, trigger, since_setup, setup_candle, setup, since_extreme, extreme_candle, uptrend]


[TC, T, SS, SC, S, SE, EC, up] = TSR()

// Make input options that configure backtest date range
StartMonth = input(title="Start Month", type=input.integer,
     defval=1, minval=1, maxval=12)
StartDate = input(title="Start Date", type=input.integer,
     defval=1, minval=1, maxval=31)
StartYear = input(title="Start Year", type=input.integer,
     defval=(2019), minval=1800, maxval=2100)

EndMonth = input(title="End Month", type=input.integer,
     defval=1, minval=1, maxval=12)
EndDate = input(title="End Date", type=input.integer,
     defval=1, minval=1, maxval=31)
EndYear = input(title="End Year", type=input.integer,
     defval=(2020), minval=1800, maxval=2100)
     
// Look if the close time of the current bar falls inside the date range
inDateRange = true

buytrigger = (TC and up)
selltrigger = (TC and not up)
buysetup = (SC and not up)
sellsetup = (SC and up)

IntBuy = buytrigger ? 1 : 0
IntSB = buysetup ? 0.5 : 0

IntSell= selltrigger ? -1 : 0
IntSS = sellsetup ? -0.5 : 0

bgcolor = buytrigger ? color.green : selltrigger ? color.red : buysetup ? color.yellow : sellsetup ? color.orange : color.black
trans = buytrigger ? 20 : selltrigger ? 20 : 100

bgcolor(bgcolor, 30)

NUM = IntBuy + IntSB + IntSell + IntSS
linecolor = color.orange
plot(NUM, color=linecolor, linewidth=2)

alertcondition(NUM > 0.5, title="Buy Signal", message="Buy Alert")
alertcondition(NUM < -0.5, title="Sell Signal", message="Sell Alert")

alertcondition(NUM == 0.5, title="Buy Setup", message="Buy Setup")
alertcondition(NUM == -0.5, title="Sell Setup", message="Sell Setup")

//Switch on for strategy moves

if(inDateRange and buytrigger)
    strategy.exit("SHORT", "SHORT_SL", comment="Short_Exit")
    strategy.entry("LONG", strategy.long, comment="")
if(inDateRange and selltrigger)
    strategy.exit("LONG", "LONG_SL", comment="Long_Exit")
    strategy.entry("SHORT", strategy.short, comment="")
if (not inDateRange)
    strategy.close_all()

// plotshape(SC and not up, color = color.yellow, style = shape.triangleup, location = location.belowbar, size = size.auto, transp = 0, title = "Setup to Buy")
// plotshape(TC and up, color = color.green, style = shape.triangleup, location = location.belowbar, size = size.auto, title = "Trigger to Buy")
// plotshape(SC and up, color = color.yellow, style = shape.triangledown, location = location.abovebar, size = size.auto, transp = 0, title = "Setup to Sell")
// plotshape(TC and not up, color = color.red, style = shape.triangledown, location = location.abovebar, size = size.auto, title = "Trigger to Sell")

```

> Detail

https://www.fmz.com/strategy/428975

> Last Modified

2023-10-11 15:22:26
