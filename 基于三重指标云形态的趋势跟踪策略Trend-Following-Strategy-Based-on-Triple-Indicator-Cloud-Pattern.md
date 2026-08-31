
> Name

基于三重指标云形态的趋势跟踪策略Trend-Following-Strategy-Based-on-Triple-Indicator-Cloud-Pattern

> Author

ChaoZhang

> Strategy Description





This strategy is named “Trend Following Strategy Based on Triple Indicator Cloud Pattern”. It integrates three different types of trend indicators to form a cloud pattern, trading breakouts of the cloud to follow trends.

The three indicators used are:

Kaufman Adaptive Moving Average, sensitive in capturing market volatility. 

Hull Moving Average, with its smooth turns, filters out false signals.

SuperTrend mechanism, forming price channels to avoid chasing highs and selling lows.

Together they form the cloud pattern, with the top band being the highest values of the three, and the bottom band the lowest values. 

The trading logic is:

When candlestick high breaks above the cloud top, it signals breaking the uptrend channel for a buy signal.

When close or low breaks below cloud bottom, it flags the start of a downtrend for closing longs.

The advantage of this strategy is the indicator combo judges trend status more accurately, reducing false signals. But parameter optimization remains critical. Stop loss is also essential.

In summary, using multiple indicators to determine trends is a common and effective approach. But traders still need sound discretion and flexibility in strategy adjustment.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Lengthkaufman|
|v_input_2|20|hull_len|
|v_input_3|2|atr_factor|
|v_input_4|5|atr_period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-12 00:00:00
end: 2023-02-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © SnarkyPuppy

//@version=5
strategy("HKST Cloud", overlay=true, default_qty_type= strategy.percent_of_equity, default_qty_value=100)



////////////////nAMA
Lengthkaufman = input(20) 
xPrice = ohlc4
xvnoise = math.abs(xPrice - xPrice[1])
nfastend = 0.666
nslowend = 0.0645
nsignal = math.abs(xPrice - xPrice[Lengthkaufman])
nnoise = math.sum(xvnoise, Lengthkaufman)
nefratio = nnoise != 0? nsignal / nnoise : 0
nsmooth = math.pow(nefratio * (nfastend - nslowend) + nslowend, 2) 
nAMA =  float(0)
nAMA := nz(nAMA[1]) + nsmooth * (xPrice - nz(nAMA[1]))

//plot(nAMA,color=color.red)
///short=input(true)



///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

////////hull moving average
hull_len=input(20)
hull= ta.hma(nAMA,hull_len)

///////atr trail
atr_factor=input(2)
atr_period=input(5)
[supertrend, direction] = ta.supertrend(atr_factor,atr_period)

/////////cloud
band1= math.max(supertrend,hull,nAMA)
band2= math.min(supertrend,hull,nAMA)

b1=plot(band1, "band1", color = color.rgb(76, 175, 79, 85), style=plot.style_linebr)
b2=plot(band2, "band2", color = color.rgb(255, 82, 82, 78), style=plot.style_linebr)
fill(b1,b2,color.rgb(12, 50, 186, 75))
longCondition = ta.crossover(high,band1) //or ta.crossover(low,band2)
if (longCondition)
    strategy.entry("Up", strategy.long)

shortCondition =  ta.crossunder(low,band2) or close<band2
if (shortCondition) 
    strategy.close("Up", shortCondition)


```

> Detail

https://www.fmz.com/strategy/426619

> Last Modified

2023-09-13 17:38:55
