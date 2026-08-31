
> Name

双移动均线与超级趋势策略Dual-Moving-Average-and-Supertrend-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy generates trading signals based on the crossover of 21-day and 55-day moving averages, and uses the supertrend indicator to filter out false signals. It is a trend-following strategy.

## Strategy Logic

The code first defines the 21-day EMA (EMA1) and 55-day EMA (EMA2). A buy signal is generated when EMA1 crosses above EMA2. A sell signal is generated when EMA1 crosses below EMA2.

To filter false signals, the supertrend indicator is added. The supertrend calculates trend direction based on ATR and recent high-low prices. In the code, above the supertrend line is uptrend and below is downtrend. 

So a buy signal is only generated when EMA1 crosses above EMA2 during an uptrend. A sell signal is only generated when EMA1 crosses below EMA2 during a downtrend. The supertrend filters out false signals during trend transitions.

In addition, the 200-day and 233-day moving averages are added to determine the long-term trend. Signals are only generated when long-term and short-term trends align.

## Advantages

1. Dual moving averages combined with supertrend can effectively identify trends and filter false signals.

2. Adjustable moving average parameters can adapt the strategy to different market conditions. 

3. Long-term moving averages prevent risks from conflicting trends.

4. Clear rules easy for algorithmic trading. 

5. Visual buy/sell signals make trading decisions clear.

## Risks

1. Moving averages may generate false signals around turning points. Potential turns need to be identified.

2. Inappropriate parameter settings may cause missed trends or excessive false signals. Parameters need to be adjusted for different markets.

3. High trading frequency leads to higher transaction costs. Costs need to be monitored. 

4. Supertrend parameters need to be optimized to balance filtering effectiveness and lagging.

5. Long-term averages may lag in generating signals. Timing trend changes is critical.

## Enhancements

1. Test different moving average combinations to find optimal parameters.

2. Optimize supertrend parameters to balance filtering and lagging.

3. Add other indicators like volume to further validate signals.

4. Incorporate sentiment and news analytics to identify potential turning points.  

5. Use machine learning to dynamically optimize parameters.

## Conclusion

This strategy combines the strengths of dual moving averages and supertrend in identifying trends and filtering false signals. It can be continuously improved through parameter optimization and additional validation. Despite certain risks, they can be managed through risk control techniques. The strategy is suitable for algorithmic trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|len1|
|v_input_2|55|len2|
|v_input_3|200|len3|
|v_input_4|233|len4|
|v_input_5|10|ATR Period|
|v_input_6_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_7|3|ATR Multiplier|
|v_input_8|true|Change ATR Calculation Method ?|
|v_input_9|true|Show Buy/Sell Signals ?|
|v_input_10|true|Highlighter On/Off ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-21 00:00:00
end: 2023-09-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © bhavikmota

//@version=4
strategy("EMA & Supertrend", overlay = true)

//length = input(9, minval=1)
//ema1 = ema(close, length)
//ema2 = ema(ema1, length)
//ema3 = ema(ema2, length)

//shortest = ema(close, 20)
//short = ema(close, 50)
//longer = ema(close, 100)
//longest = ema(close, 200)


//for Ema1
len1 = input(21, minval=1)
//src1 = input(close)
ema1 = ema(close,len1)
plot(ema1, color=color.red, linewidth=1)

//for Ema2
len2 = input(55, minval=1)
//src2 = input(close)
ema2 = ema(close,len2)
plot(ema2, color=color.green, linewidth=1)

//for Ema3
len3 = input(200, minval=1)
//src3 = input(close)
ema3 = ema(close,len3)
plot(ema3, color=color.blue, linewidth=1)

//for Ema4
len4 = input(233, minval=1)
//src4 = input(close)
ema4 = ema(close,len4)
plot(ema4, color=color.black, linewidth=1)


Periods = input(title="ATR Period", type=input.integer, defval=10)
src = input(hl2, title="Source")
Multiplier = input(title="ATR Multiplier", type=input.float, step=0.1, defval=3.0)
changeATR= input(title="Change ATR Calculation Method ?", type=input.bool, defval=true)
showsignals = input(title="Show Buy/Sell Signals ?", type=input.bool, defval=true)
highlighting = input(title="Highlighter On/Off ?", type=input.bool, defval=true)
atr2 = sma(tr, Periods)
atr= changeATR ? atr(Periods) : atr2
up=src-(Multiplier*atr)
up1 = nz(up[1],up)
up := close[1] > up1 ? max(up,up1) : up
dn=src+(Multiplier*atr)
dn1 = nz(dn[1], dn)
dn := close[1] < dn1 ? min(dn, dn1) : dn
trend = 1
trend := nz(trend[1], trend)
trend := trend == -1 and close > dn1 ? 1 : trend == 1 and close < up1 ? -1 : trend
upPlot = plot(trend == 1 ? up : na, title="Up Trend", style=plot.style_linebr, linewidth=2, color=color.green)
buySignal = trend == 1 and trend[1] == -1
plotshape(buySignal ? up : na, title="UpTrend Begins", location=location.absolute, style=shape.circle, size=size.tiny, color=color.green, transp=0)
plotshape(buySignal and showsignals ? up : na, title="Buy", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=color.green, textcolor=color.white, transp=0)
dnPlot = plot(trend == 1 ? na : dn, title="Down Trend", style=plot.style_linebr, linewidth=2, color=color.red)
sellSignal = trend == -1 and trend[1] == 1
plotshape(sellSignal ? dn : na, title="DownTrend Begins", location=location.absolute, style=shape.circle, size=size.tiny, color=color.red, transp=0)
plotshape(sellSignal and showsignals ? dn : na, title="Sell", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.red, textcolor=color.white, transp=0)
mPlot = plot(ohlc4, title="", style=plot.style_circles, linewidth=0)
longFillColor = highlighting ? (trend == 1 ? color.green : color.white) : color.white
shortFillColor = highlighting ? (trend == -1 ? color.red : color.white) : color.white
fill(mPlot, upPlot, title="UpTrend Highligter", color=longFillColor)
fill(mPlot, dnPlot, title="DownTrend Highligter", color=shortFillColor)
alertcondition(buySignal, title="SuperTrend Buy", message="SuperTrend Buy!")
alertcondition(sellSignal, title="SuperTrend Sell", message="SuperTrend Sell!")
changeCond = trend != trend[1]
alertcondition(changeCond, title="SuperTrend Direction Change", message="SuperTrend has changed direction!")


//Trading logic

Enterlong = crossover(ema1,ema2) or (close>ema1 and close>ema2 and ema1>ema2) and close>ema4// positive ema crossover
Exitlong = crossunder(close,ema2) // candle closes below supertrend

Entershort = crossunder(ema1,ema2) or (close<ema1 and close<ema2 and ema2<ema1) and close<ema4// negative ema crossover
Exitshort = crossover(close,ema2) // candle closes above supertrend

//Execution Logic - Placing Order

start = timestamp(2008,1,1,0,0)

if time>= start
    strategy.entry("long", strategy.long, when=Enterlong)
    strategy.close("long",when=Exitlong)
//strategy.entry("short",strategy.short,100,when=Entershort)
//strategy.close("short",when=Exitshort)
```

> Detail

https://www.fmz.com/strategy/428083

> Last Modified

2023-09-28 15:12:50
