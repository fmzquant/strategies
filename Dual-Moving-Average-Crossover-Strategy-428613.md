
> Name

Dual-Moving-Average-Crossover-Strategy-428613

> Author

ChaoZhang

> Strategy Description



## Overview

This is a trading strategy based on dual moving average crossover. It uses the interactions between fast and slow moving averages to determine market trends and generate trading signals. When the fast MA crosses above the slow MA, a buy signal is generated. When the fast MA crosses below the slow MA, a sell signal is generated.

## Principle  

This strategy mainly utilizes the trend tracking capability of moving averages. Moving averages are the average prices calculated over a certain period based on historical closing prices. They can smooth out intraday minor fluctuations and reflect larger timeframe trends. The fast MA uses a shorter period and can respond more quickly to price changes, while the slow MA uses a longer period and represents the long-term trend. The fast MA crossing above the slow MA indicates the short-term momentum is breaking through the long-term trend upwards, signaling an uptrend is starting. Conversely, the fast MA crossing below the slow MA means the long-term trend is under pressure and the price may fall.

This strategy generates trading signals by setting moving averages of different cycle lengths and using their crossovers. When the short-cycle MA crosses above the long-cycle MA, it signals improving short-term momentum and generates a buy signal. When the short-cycle MA crosses below the long-cycle MA, it indicates weakening short-term trend and produces a sell signal. The strategy code plots the MAs with the plot function, uses the trend variable to determine MA crosses, and outputs buy and sell signals when a crossover occurs.

## Advantages

- Using MA crosses to determine trend changes is a simple and effective technique
- MAs can filter out market noise effectively and avoid whipsaws
- Adjusting fast and slow MA periods can adapt to different market conditions
- Visually indicates trend signals and turning points  
- Easy to understand, flexible parameter tuning

## Risks

- Dual MA crossovers have time lags and may miss turn points
- Not suitable for rangy markets, can produce more false signals
- Improper MA period settings may cause over-sensitivity or sluggishness 
- Needs other indicators to confirm trend context and timing

## Optimization Directions 

- Evaluate profitability of different MA period parameters and select the optimal
- Add other filters like channel indicators, candlestick patterns etc. 
- Incorporate volatility indicators to optimize stop loss and take profit
- Use machine learning algorithms to auto-optimize parameters and rules
- Add algorithmic trading modules for auto-order execution

## Summary

The dual MA crossover strategy utilizes the trend tracking ability of moving averages and generates signals based on their crosses. While being simple and intuitive, it also has some flaws. These can be overcome by parameter tuning, adding confirmations, algorithm optimization etc. to turn it into a robust system. Overall, the dual MA strategy is a very classic and easy-to-use trend following strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ATR Period|
|v_input_2_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_3|3|ATR Multiplier|
|v_input_4|true|Change ATR Calculation Method ?|
|v_input_5|false|Show Buy/Sell Signals ?|
|v_input_6|true|Highlighter On/Off ?|
|v_input_7|true|Bar Coloring On/Off ?|
|v_input_8|9|From Month|
|v_input_9|true|From Day|
|v_input_10|2018|From Year|
|v_input_11|true|To Month|
|v_input_12|true|To Day|
|v_input_13|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-04-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © KivancOzbilgic


//@version=4
strategy("pomila", overlay=true)
Periods = input(title="ATR Period", type=input.integer, defval=10)
src = input(hl2, title="Source")
Multiplier = input(title="ATR Multiplier", type=input.float, step=0.1, defval=3.0)
changeATR= input(title="Change ATR Calculation Method ?", type=input.bool, defval=true)
showsignals = input(title="Show Buy/Sell Signals ?", type=input.bool, defval=false)
highlighting = input(title="Highlighter On/Off ?", type=input.bool, defval=true)
barcoloring = input(title="Bar Coloring On/Off ?", type=input.bool, defval=true)
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
FromMonth = input(defval = 9, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2018, title = "From Year", minval = 999)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 999)
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)       
window()  => time >= start and time <= finish ? true : false
longCondition = buySignal
if (longCondition)
    strategy.entry("BUY", strategy.long, when = window())
shortCondition = sellSignal
if (shortCondition)
    strategy.entry("SELL", strategy.short, when = window())
buy1= barssince(buySignal)
sell1 = barssince(sellSignal)
color1 = buy1[1] < sell1[1] ? color.green : buy1[1] > sell1[1] ? color.red : na
barcolor(barcoloring ? color1 : na)
```

> Detail

https://www.fmz.com/strategy/428613

> Last Modified

2023-10-07 15:18:44
