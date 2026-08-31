
> Name

双重平滑移动平均线交易策略Dual-Smooth-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy utilizes a dual smooth moving average system as the primary trading signal, combined with the TDFI volume validation indicator for trade signal filtering, in order to leverage the advantages of smooth moving averages while reducing incorrect trades in non-trending markets.

## Strategy Logic

The strategy employs two sets of smooth moving averages with different parameter configurations as the primary trading signal. First an 8-period fast smooth moving average is used as the initial confirmation, then a slightly slower 16-period smooth moving average acts as the second confirmation. When the fast MA gives a buy signal, if the slower MA also signals in the same direction within the last 1-2 bars, a long position is opened. When the fast MA gives a sell signal, if the slower MA also signals in the same direction within the last 1-2 bars, a short position is opened. Exits are triggered when the second confirmation MA reverses direction. In addition, the TDFI volume indicator is used to detect trading volume energy behind price bars to filter misleading signals. Trades are only taken when volume aligns with expectations.

## Advantages

- Smooth MAs effectively track trends and avoid market noise, catching mid- to long-term trends
- The dual smooth MA setup enhances signal reliability, avoiding incorrect trades in non-trending markets
- Volume indicator introduction filters misleading low volume signals, avoiding unnecessary losses 
- High parameter optimization space, can be adjusted for different products and timeframes, highly adaptable

## Risks

- Smooth MAs can be slow to identify trend reversals, potentially leading to some losses
- Dual smooth MAs may still generate concurrent wrong signals in non-trending markets
- Volume indicator has limited effect, cannot filter all misleading signals

To reduce risks, the following optimization directions could be considered:

- Add trend strength indicator to aid trend reversal identification
- Optimize smooth MA parameters for a more effective fast/slow configuration 
- Test different volume indicators to better filter misleading low volume signals

## Optimization Directions 

- Add MACD etc. to help identify trend reversals
- Adjust ATR stops and limits to suit different product characteristics
- Try increasing position sizing to improve strategy return
- Optimize parameters based on backtest results to enhance stability

## Summary

Overall this is a typical trend-following strategy. The dual smooth MA system combined with the TDFI volume filter can effectively leverage trend-tracking capability while reducing incorrect signal rates in non-trending markets. Through parameter optimization it can be adapted to different timeframes and products. However, it relies more on parameter tweaking than mechanical application. Lack of trend reversal identification and parameter tuning impact should be noted. Overall a clear and straightforward approach, worthy of further optimization and practice.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|1.5|SL|
|v_input_2|true|TP|
|v_input_3|14|ATR Length|
|v_input_4|0|Smoothing: SMA|RMA|EMA|WMA|
|v_input_5|8|SSL 1 Length Period|
|v_input_6|16|SSL 2 Length Period|
|v_input_7|6|TDFI Lookback|
|v_input_8|0.05|Filter High|
|v_input_9|-0.05|Filter Low|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-06 00:00:00
end: 2023-10-12 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Designed per No Nonsense Forex VP rules
//Made to be as modular as possible, so we can swap the indicators in and out.
//Originated from causecelebre
//Tried to put in as much VP rules as possible

///////////////////////////////////////////////////
//Rules Implemented:
///////////////////////////////////////////////////
// - SL 1.5 x ATR
// - TP 1 x ATR
//
// - Entry conditions
//// - Entry within first confirmation cross over and 1 candle of second confirmation + volume
// - Exit conditions
//// - Exit on exit indicator or when baseline or confirmation flip 

///////////////////////////////////////////////////
//Trades entries
///////////////////////////////////////////////////
// - First entry L1 or S1 with standard SL and TP

///////////////////////////////////////////////////
//Included Indicators and settings
///////////////////////////////////////////////////
// - Confirmtion = SSL 8, 16
// - Volume = TDFI 6

///////////////////////////////////////////////////
//Credits
// Strategy causecelebre https://www.tradingview.com/u/causecelebre/
// TDFI causecelebre https://www.tradingview.com/u/causecelebre/
// SSL Channel ErwinBeckers https://www.tradingview.com/u/ErwinBeckers/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// strategy(title="NNFX Strategy 3 Indicator Template | jh", overlay = true, pyramiding=0, initial_capital=20000, currency=currency.USD, calc_on_order_fills=0,default_qty_type=strategy.fixed, default_qty_value=10000)

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
//  **** Confirmation 1 Fast ****
///////////////////////////////////////////////////

///////////////////////////////////////////////////
//SSL 6
///////////////////////////////////////////////////

ssllen1=input(title="SSL 1 Length Period", defval=8)
smaHigh1=sma(high, ssllen1)
smaLow1=sma(low, ssllen1)
Hlv1 = na
Hlv1 := close > smaHigh1 ? 1 : close < smaLow1 ? -1 : Hlv1[1]
sslDown1 = Hlv1 < 0 ? smaHigh1: smaLow1
sslUp1   = Hlv1 < 0 ? smaLow1 : smaHigh1

plot(sslDown1, "SSL Down", linewidth=1, color=red)
plot(sslUp1, "SSL Up", linewidth=1, color=lime)

///////////////////////////////////////////////////
//Confirm Signals
///////////////////////////////////////////////////

c_Up = sslUp1
c_Down =sslDown1

//Signals based on crossover
c_cross_Long = crossover(c_Up, c_Down)
c_cross_Short = crossover(c_Down, c_Up)

//Signals based on signal position
c_trend_Long = c_Up > c_Down ? 1 : 0
c_trend_Short = c_Down > c_Up ? 1 : 0

confirm_Long = c_cross_Long
confirm_Short = c_cross_Short

plotshape(c_cross_Long, color = green, style=shape.triangleup, location=location.top)
plotshape(c_cross_Short, color = red, style=shape.triangledown, location=location.top)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  **** Confirmation 2 Slow ****
///////////////////////////////////////////////////

///////////////////////////////////////////////////
//SSL 30
///////////////////////////////////////////////////

///////////////////////////////////////////////////
//SSL
///////////////////////////////////////////////////

ssllen2=input(title="SSL 2 Length Period", defval=16)
smaHigh2=sma(high, ssllen2)
smaLow2=sma(low, ssllen2)
Hlv2 = na
Hlv2 := close > smaHigh2 ? 1 : close < smaLow2 ? -1 : Hlv2[1]
sslDown2 = Hlv2 < 0 ? smaHigh2: smaLow2
sslUp2   = Hlv2 < 0 ? smaLow2 : smaHigh2

plot(sslDown2, "SSL Down", linewidth=1, color=orange)
plot(sslUp2, "SSL Up", linewidth=1, color=blue)

///////////////////////////////////////////////////
//Confirm Signals
///////////////////////////////////////////////////
c2_Up = sslUp2
c2_Down = sslDown2

//Signals based on crossover
c2_cross_Long = crossover(c2_Up, c2_Down)
c2_cross_Short = crossover(c2_Down, c2_Up)

//Signals based on signal position
c2_trend_Long = c2_Up > c2_Down ? 1 : 0
c2_trend_Short = c2_Down > c2_Up ? 1 : 0

confirm2_Long = c2_trend_Long
confirm2_Short = c2_trend_Short

plotshape(c2_cross_Long, color = green, style=shape.triangleup, location=location.bottom)
plotshape(c2_cross_Short, color = red, style=shape.triangledown, location=location.bottom)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  **** Volume Indicator Start ****
///////////////////////////////////////////////////

///////////////////////////////////////////////////
//TDFI
///////////////////////////////////////////////////

lookback = input(6, title = "TDFI Lookback") 
filterHigh = input(0.05, title = "Filter High") 
filterLow = input(-0.05, title = "Filter Low") 

mma = ema(price * 1000, lookback)
smma = ema(mma, lookback)

impetmma = mma - mma[1]
impetsmma= smma - smma[1]
divma = abs(mma - smma)
averimpet = (impetmma + impetsmma) / 2

number = averimpet
pow = 3
result = na

for i = 1 to pow - 1
    if i == 1
        result := number
    result := result * number

tdf = divma * result
ntdf = tdf / highest(abs(tdf), lookback * 3)

///////////////////////////////////////////////////
//Volume Signals
///////////////////////////////////////////////////
v_Long = ntdf > filterHigh ? 1 : 0
v_Short = filterLow > ntdf ? 1 : 0

volumeLong = v_Long
volumeShort = v_Short

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **************************** Logic to handle NNFX rules ****************************
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Checking for confirmation indication with 1 candle difference for second confirmtion and volume
enterLong   = confirm_Long and (confirm2_Long[0] or confirm2_Long[1])      and (volumeLong[0] or volumeLong[1]) ? 1 : 0
enterShort  = confirm_Short and (confirm2_Short[0] or confirm2_Short[1])   and (volumeShort[0] or volumeShort[1]) ? 1 : 0

exitLong = c_cross_Short or c2_cross_Short ? 1 : 0 
exitShort = c_cross_Long or c2_cross_Long ? 1 : 0 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Entries and Exits
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (year>2009)

    //Long entries with standard 1.5 ATR for SL, 1 ATR for TP
    long_sl = price - (atr * slMultiplier)
    long_tp = price + (atr * tpMultiplier)

    //Short entries with standard 1.5 ATR for SL, 1 ATR for TP
    short_sl = price + (atr * slMultiplier)
    short_tp = price - (atr * tpMultiplier)

    strategy.close("L1", when = exitLong)
    strategy.close("S1", when = exitShort)

    strategy.exit("L Limit Exit", "L1", stop = long_sl, limit = long_tp)
    strategy.exit("S Limit Exit", "S1", stop = short_sl, limit = short_tp)

    strategy.order("L1", strategy.long, when = enterLong)
    strategy.order("S1", strategy.short, when = enterShort)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    



```

> Detail

https://www.fmz.com/strategy/429148

> Last Modified

2023-10-13 15:45:58
