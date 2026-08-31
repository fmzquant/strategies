
> Name

Trend-Following-Strategy-Based-on-Moving-Average-Combination

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/157e938fe175bbe4346.png)

## Overview

This strategy identifies trend directions by calculating combinations of multiple fast and slow moving averages. It generates buy signals when the fast MAs cross above the slow MAs, and sell signals when the fast MAs cross below the slow MAs.

## Strategy Logic  

1. Calculate 7 groups of fast EMAs with periods of 3/6/9/12/15/18/21 days.
2. Calculate 14 groups of slow EMAs with periods of 24/27/30/.../200 days.
3. Set color rules for fast EMAs: 3MA above 6MA is uptrend (aqua), below is downtrend (orange).  
4. Set color rules for slow EMAs: 24MA above 25MA is uptrend (lime), below is downtrend (red).
5. When fast EMA grupo crosses above slow EMA group, generate buy signal, indicating uptrend. 
6. When fast EMA grupo crosses below slow EMA group, generate sell signal, indicating downtrend.

By combining fast and slow MAs, it can effectively identify the change in medium- and long-term trends for position tracking.  

## Advantages

1. Fast and slow MAs combined can strongly identify trend changes. Fast MAs capture short-term trends, and slow MAs filter consolidations.  
2. Multiple MAs combined can give clearer and more reliable signals, avoiding false signals.
3. Flexible operating cycle by using different EMA periods.
4. Long position tracking suits the mode of operation of most private funds.

## Risks

1. Holding positions for too long may miss short-term trading opportunities.  
2. EMA combinations are not suitable for catching sharp price fluctuations.
3. Improper parameter settings may result in too frequent or conservative signals. Parameter testing and live verification are recommended.

## Optimization Suggestions

1. Add more fast EMAs to improve judgment of short-term trends.
2. Add more slow EMAs to improve judgment of medium- and long-term trends. 
3. Add MA signal confirmation to reduce false signals.
4. Incorporate volume analysis to avoid false breakouts in ranging markets.  

## Summary

This strategy identifies mid- to long-term trend changes by constructing fast and slow MA systems, which is a typical tracking position strategy. There is still much room for optimization in parameter selection and signal filtering. Investors can tailor it to adapt to different market conditions.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2019|Backtest Stop Year|
|v_input_5|3|Backtest Stop Month|
|v_input_6|true|Backtest Stop Day|
|v_input_7|3|Fast EMA 1|
|v_input_8|6|Fast EMA 2|
|v_input_9|9|Fast EMA 3|
|v_input_10|12|Fast EMA 4|
|v_input_11|15|Fast EMA 5|
|v_input_12|18|Fast EMA 6|
|v_input_13|21|Fast EMA 7|
|v_input_14|24|Slow EMA 8|
|v_input_15|27|Slow EMA 9|
|v_input_16|30|Slow EMA 10|
|v_input_17|33|Slow EMA 11|
|v_input_18|36|Slow EMA 12|
|v_input_19|39|Slow EMA 13|
|v_input_20|42|Slow EMA 14|
|v_input_21|45|Slow EMA 15|
|v_input_22|48|Slow EMA 16|
|v_input_23|51|Slow EMA 17|
|v_input_24|54|Slow EMA 18|
|v_input_25|57|Slow EMA 19|
|v_input_26|60|Slow EMA 20|
|v_input_27|63|Slow EMA 21|
|v_input_28|66|Slow EMA 22|
|v_input_29|200|EMA 200|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-16 00:00:00
end: 2024-02-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("CM Super Guppy ala WY", pyramiding=1, default_qty_type=strategy.percent_of_equity, default_qty_value=99, overlay=true)


///////////////////////////////////////////////
//* Backtesting Period Selector | Component *//
///////////////////////////////////////////////

//* https://www.tradingview.com/script/eCC1cvxQ-Backtesting-Period-Selector-Component *//
//* https://www.tradingview.com/u/pbergden/ *//
//* Modifications made *//

testStartYear = input(2017, "Backtest Start Year") 
testStartMonth = input(01, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2019, "Backtest Stop Year")
testStopMonth = input(3, "Backtest Stop Month")
testStopDay = input(1, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

testPeriod() => true

///////////////////////////////////////////////

src = close, 
len1 = input(3, minval=1, title="Fast EMA 1")
len2 = input(6, minval=1, title="Fast EMA 2")
len3 = input(9, minval=1, title="Fast EMA 3")
len4 = input(12, minval=1, title="Fast EMA 4")
len5 = input(15, minval=1, title="Fast EMA 5")
len6 = input(18, minval=1, title="Fast EMA 6")
len7 = input(21, minval=1, title="Fast EMA 7")
//Slow EMA
len8 = input(24, minval=1, title="Slow EMA 8")
len9 = input(27, minval=1, title="Slow EMA 9")
len10 = input(30, minval=1, title="Slow EMA 10")
len11 = input(33, minval=1, title="Slow EMA 11")
len12 = input(36, minval=1, title="Slow EMA 12")
len13 = input(39, minval=1, title="Slow EMA 13")
len14 = input(42, minval=1, title="Slow EMA 14")
len15 = input(45, minval=1, title="Slow EMA 15")
len16 = input(48, minval=1, title="Slow EMA 16")
len17 = input(51, minval=1, title="Slow EMA 17")
len18 = input(54, minval=1, title="Slow EMA 18")
len19 = input(57, minval=1, title="Slow EMA 19")
len20 = input(60, minval=1, title="Slow EMA 20")
len21 = input(63, minval=1, title="Slow EMA 21")
len22 = input(66, minval=1, title="Slow EMA 22")
len23 = input(200, minval=1, title="EMA 200")

//Fast EMA
ema1 = ema(src, len1)
ema2 = ema(src, len2)
ema3 = ema(src, len3)
ema4 = ema(src, len4)
ema5 = ema(src, len5)
ema6 = ema(src, len6)
ema7 = ema(src, len7)

//Slow EMA
ema8 = ema(src, len8)
ema9 = ema(src, len9)
ema10 = ema(src, len10)
ema11 = ema(src, len11)
ema12 = ema(src, len12)
ema13 = ema(src, len13)
ema14 = ema(src, len14)
ema15 = ema(src, len15)
ema16 = ema(src, len16)
ema17 = ema(src, len17)
ema18 = ema(src, len18)
ema19 = ema(src, len19)
ema20 = ema(src, len20)
ema21 = ema(src, len21)
ema22 = ema(src, len22)

//EMA 200
ema23 = ema(src, len23)

//Fast EMA Color Rules
colfastL = (ema1 > ema2 and ema2 > ema3 and ema3 > ema4 and ema4 > ema5 and ema5 > ema6 and ema6 > ema7)
colfastS = (ema1 < ema2 and ema2 < ema3 and ema3 < ema4 and ema4 < ema5 and ema5 < ema6 and ema6 < ema7)
//Slow EMA Color Rules
colslowL = ema8 > ema9 and ema9 > ema10 and ema10 > ema11 and ema11 > ema12 and ema12 > ema13 and ema13 > ema14 and ema14 > ema15 and ema15 > ema16 and ema16 > ema17 and ema17 > ema18 and ema18 > ema19 and ema19 > ema20 and ema20 > ema21 and ema21 > ema22
colslowS = ema8 < ema9 and ema9 < ema10 and ema10 < ema11 and ema11 < ema12 and ema12 < ema13 and ema13 < ema14 and ema14 < ema15 and ema15 < ema16 and ema16 < ema17 and ema17 < ema18 and ema18 < ema19 and ema19 < ema20 and ema20 < ema21 and ema21 < ema22 
//Fast EMA Final Color Rules
colFinal = colfastL and colslowL? aqua : colfastS and colslowS? orange : gray
//Slow EMA Final Color Rules
colFinal2 = colslowL  ? lime : colslowS ? red : gray
//Fast EMA Plots
p1=plot(ema1, title="Fast EMA 1", style=line, linewidth=2, color=colFinal)
plot(ema2, title="Fast EMA 2", style=line, linewidth=1, color=colFinal)
plot(ema3, title="Fast EMA 3", style=line, linewidth=1, color=colFinal)
plot(ema4, title="Fast EMA 4", style=line, linewidth=1, color=colFinal)
plot(ema5, title="Fast EMA 5", style=line, linewidth=1, color=colFinal)
plot(ema6, title="Fast EMA 6", style=line, linewidth=1, color=colFinal)
p2=plot(ema7, title="Fast EMA 7", style=line, linewidth=2, color=colFinal)

//Slow EMA Plots
p3=plot(ema8, title="Slow EMA 8", style=line, linewidth=1, color=colFinal2)
plot(ema9, title="Slow EMA 9", style=line, linewidth=1, color=colFinal2)
plot(ema10, title="Slow EMA 10", style=line, linewidth=1, color=colFinal2)
plot(ema11, title="Slow EMA 11", style=line, linewidth=1, color=colFinal2)
plot(ema12, title="Slow EMA 12", style=line, linewidth=1, color=colFinal2)
plot(ema13, title="Slow EMA 13", style=line, linewidth=1, color=colFinal2)
plot(ema14, title="Slow EMA 14", style=line, linewidth=1, color=colFinal2)
plot(ema15, title="Slow EMA 15", style=line, linewidth=1, color=colFinal2)
plot(ema16, title="Slow EMA 16", style=line, linewidth=1, color=colFinal2)
plot(ema17, title="Slow EMA 17", style=line, linewidth=1, color=colFinal2)
plot(ema18, title="Slow EMA 18", style=line, linewidth=1, color=colFinal2)
plot(ema19, title="Slow EMA 19", style=line, linewidth=1, color=colFinal2)
plot(ema20, title="Slow EMA 20", style=line, linewidth=1, color=colFinal2)
plot(ema21, title="Slow EMA 21", style=line, linewidth=1, color=colFinal2)
plot(ema22, title="Slow EMA 22", style=line, linewidth=2, color=colFinal2)
p4=plot(ema23, title="EMA 200", style=line, linewidth=2)


// Strategy Center
enterLong = colfastL and colslowL
exitLong = not colfastL

if testPeriod()
    strategy.entry("WY Long", strategy.long, when=enterLong, comment="WY Long")
else
    strategy.cancel(id="WY Long")

if testPeriod()
    strategy.close("WY Long", when=exitLong)
```

> Detail

https://www.fmz.com/strategy/442651

> Last Modified

2024-02-23 14:54:34
