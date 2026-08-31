
> Name

基于SSL通道指标的趋势跟踪策略No-Nonsense-SSL-Channel-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a26113bf609b3a0719.png)

### Overview

This is a trend-following strategy based on the SSL Channel indicator. It incorporates stop loss and take profit management to lock in profits for steady capital growth.  

### Strategy Logic

The main logic of the code is to use the golden cross of the SSL upper and lower bands to determine trend direction. Specifically, go long when the SSL upper band crosses above the SSL lower band from below, and go short when the SSL lower band crosses below the SSL upper band from above.  

After entering a position, the strategy will use ATR multiplied by a coefficient to set the stop loss and take profit prices. For example, the stop loss price is the price minus ATR * 1.5 and the take profit price is the price plus ATR * 1. This can effectively control single loss and lock in profits.  

When the SSL channel crosses over, close the position. This can track inflection points in the trend for timely stop losses.

### Advantage Analysis 

1. The SSL channel is highly accurate in determining trend direction  
2. Stop loss and take profit settings are reasonable to effectively control risk
3. Timely stop losses track inflection points in the trend

### Risk Analysis

1. Trend trading can easily lead to overtrading  
2. There is a probability of failure in SSL channel judgement
3. ATR coefficients need to be optimized

The corresponding solutions:

1. Appropriately adjust the holding period  
2. Incorporate other indicators for confirmation
3. Test different combinations of ATR coefficients


### Optimization Directions

1. Optimize ATR parameters to find the optimal parameter combination
2. Increase other indicators for filtering and confirming signals  
3. Adjust holding periods according to different markets
4. Optimize stop loss and take profit strategies


### Summary

The overall logic of this strategy is clear, using the SSL channel to determine the trend, and setting reasonable stop loss and take profit. But further testing and optimization is still needed, incorporating other indicators to filter out false signals and find the best parameter combination. At the same time, parameters should be adjusted according to different markets to make the strategy more flexible. Overall, this strategy provides a reliable framework for achieving steady income.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|1.5|SL|
|v_input_2|true|TP|
|v_input_3|14|ATR Length|
|v_input_4|0|Smoothing: SMA|RMA|EMA|WMA|
|v_input_5|10|SSL Length Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-26 00:00:00
end: 2023-05-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Designed per No Nonsense Forex VP rules
//For testing your individual indicators before the full system
//Originated from causecelebre
//Tried to put in as much VP rules as possible

///////////////////////////////////////////////////
//Rules Implemented:
///////////////////////////////////////////////////
// - SL 1.5 x ATR
// - TP 1 x ATR
//
// - Entry conditions
//// - Entry from 1 x confirmation
// - Exit conditions
//// - Exit on confirmation flip 

///////////////////////////////////////////////////
//Trades entries
///////////////////////////////////////////////////
// - First entry L1 or S1 with standard SL and TP

///////////////////////////////////////////////////
//Included Indicators and settings
///////////////////////////////////////////////////
// - Confirmtion = SSL 10

///////////////////////////////////////////////////
//Credits
// Strategy causecelebre https://www.tradingview.com/u/causecelebre/
// SSL Channel ErwinBeckers https://www.tradingview.com/u/ErwinBeckers/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Change log
//First release. Testing of indicators
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

strategy(title="NNFX Strategy Indicator | jh", overlay = true )

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  **** Set the main stuff  ****
///////////////////////////////////////////////////

//Price
price = close

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ATR stuff
///////////////////////////////////////////////////

slMultiplier = input(1.5, "SL")
tpMultiplier = input(1, "TP")

atrlength = input(title="ATR Length", defval=14, minval=1)
atrsmoothing = input(title="Smoothing", defval="SMA", options=["RMA", "SMA", "EMA", "WMA"])

ma_function(source, atrlength) => 
    if atrsmoothing == "RMA"
        rma(source, atrlength)
    else
        if atrsmoothing == "SMA"
            sma(source, atrlength)
        else
            if atrsmoothing == "EMA"
                ema(source, atrlength)
            else
                wma(source, atrlength)

//plot(ma_function(tr(true), atrlength), title = "ATR", color=#991515, transp=0)

atr = ma_function(tr(true), atrlength)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  **** Confirmation ****
///////////////////////////////////////////////////

ssllen=input(title="SSL Length Period", defval=10)
smaHigh=sma(high, ssllen)
smaLow=sma(low, ssllen)
Hlv = na
Hlv := close > smaHigh ? 1 : close < smaLow ? -1 : Hlv[1]
sslDown = Hlv < 0 ? smaHigh: smaLow
sslUp   = Hlv < 0 ? smaLow : smaHigh

plot(sslDown, "SSL Down", linewidth=1, color=red)
plot(sslUp, "SSL Up", linewidth=1, color=lime)

///////////////////////////////////////////////////
//Confirm Signals
///////////////////////////////////////////////////

c_Up = sslUp
c_Down = sslDown

//Signals based on crossover
c_Long = crossover(c_Up, c_Down)
c_Short = crossover(c_Down, c_Up)

//Signals based on signal position
trendLong = c_Up > c_Down ? 1 : 0
trendShort = c_Down > c_Up ? 1 : 0

confirmLong = c_Long
confirmShort = c_Short

plotshape(trendLong, color = green, style=shape.triangleup, location=location.bottom)
plotshape(trendShort, color = red, style=shape.triangledown, location=location.bottom)


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Entries and Exits
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (year>2009)

    //Long entries with standard 1.5 ATR for SL, 1 ATR for TP
    long_sl = price - (atr * slMultiplier)
    long_tp = price + (atr * tpMultiplier)
    strategy.order("L1", strategy.long, when = confirmLong)
    strategy.close("L1", when = confirmShort)
    strategy.exit("L Limit Exit", "L1", stop = long_sl, limit = long_tp)

    
    //Short entries with standard 1.5 ATR for SL, 1 ATR for TP
    short_sl = price + (atr * slMultiplier)
    short_tp = price - (atr * tpMultiplier)
    strategy.order("S1", strategy.short, when = confirmShort)
    strategy.close("S1", when = confirmLong)
    strategy.exit("S Limit Exit", "S1", stop = short_sl, limit = short_tp)


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    



```

> Detail

https://www.fmz.com/strategy/433439

> Last Modified

2023-11-27 16:42:34
