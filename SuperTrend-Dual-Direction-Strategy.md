
> Name

SuperTrend-Dual-Direction-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses the upper and lower bands calculated based on the ATR indicator to determine the current trend direction and generate buy and sell signals. It suggests long when the price breaks above the upper band and short when the price breaks below the lower band.

## Strategy Logic

1. Calculate the ATR indicator, representing the average price volatility range. 
2. Calculate the upper and lower bands based on the ATR value multiplied by a factor.
3. Determine the trend direction based on the price's relationship with the bands.
   - When the price is above the upper band, it's an uptrend.
   - When the price is below the lower band, it's a downtrend.
4. Generate buy and sell signals when the trend changes direction.
   - A buy signal is generated near the upper band when trend changes from downtrend to uptrend. 
   - A sell signal is generated near the lower band when trend changes from uptrend to downtrend.
5. Visualize the upper/lower bands, trend direction and trade signals.

## Advantage Analysis

- Using ATR to determine trend can adapt the bands to market volatility by adjusting parameters.
- Captures trend reversal timely by breakout of the bands. 
- Filters signals by trend direction to avoid fake breakouts.
- Clear visualization of bands and signals.

## Risk Analysis

- Inappropriate ATR period may detach bands from price.
- Too large/small multiplier causes more false signals and lagging signals. 
- Inaccurate reversal timing leads to losses from reverse trading.
- Needs other filters to reduce being whipsawed.

## Optimization Directions

- Dynamic optimization of ATR period to fit market volatility.
- Parameter tuning for different products and timeframes.
- Combine other indicators like volume for trend validation. 
- Utilize machine learning for parameter optimization.

## Summary

This strategy implements the idea of determining dual-directional trend based on ATR. Breakout signals are generated and filtered by trend direction to avoid fake signals. Parameters can be tuned for different market environments. There are still some risks that need further optimization. Overall speaking, this is a simple and practical strategy worth researching and improving.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Day|
|v_input_2|true|From Month|
|v_input_3|2018|From Year|
|v_input_4|true|To Day|
|v_input_5|true|To Month|
|v_input_6|2100|To Year|
|v_input_7|10|ATR Period|
|v_input_8_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_9|3|ATR Multiplier|
|v_input_10|true|Change ATR Calculation Method ?|
|v_input_11|true|Show Buy/Sell Signals ?|
|v_input_12|true|Highlighter On/Off ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-01 00:00:00
end: 2023-10-07 00:00:00
period: 3d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

TradeId = "RVG"

InitCapital = 1000
InitPosition = 1000
InitCommission = 0.075
InitPyramidMax = 1
CalcOnorderFills = true
CalcOnTick = true

//@version=4
// strategy("Supertrend RG", overlay = true,process_orders_on_close=true,commission_type=strategy.commission.percent,commission_value=InitCommission,
//  currency=currency.USD,initial_capital=InitCapital,default_qty_type=strategy.cash, default_qty_value=InitPosition, calc_on_order_fills=CalcOnorderFills, calc_on_every_tick=CalcOnTick,pyramiding=InitPyramidMax)

//
////////////////////////////////////////////////////////////////////////////////
// BACKTESTING RANGE

// From Date Inputs
fromDay = input(defval=1, title="From Day", minval=1, maxval=31)
fromMonth = input(defval=1, title="From Month", minval=1, maxval=12)
fromYear = input(defval=2018, title="From Year", minval=1970)

// To Date Inputs
toDay = input(defval=1, title="To Day", minval=1, maxval=31)
toMonth = input(defval=1, title="To Month", minval=1, maxval=12)
toYear = input(defval=2100, title="To Year", minval=1970)

// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true



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


strategy.entry(TradeId + " Long", true, when=buySignal[1] and time_cond)
strategy.entry(TradeId + " Short", false, when=sellSignal[1] and time_cond)   



```

> Detail

https://www.fmz.com/strategy/428703

> Last Modified

2023-10-08 15:02:45
