
> Name

Dual-Moving-Average-Crossover-Intraday-Futures-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11c185631535c2f1ddc.png)


## Overview

This strategy utilizes the principle of dual moving average crossover, incorporates ATR indicator for stop loss and take profit, and adds trading hour control to design an intraday trading strategy suitable for futures contracts. The strategy is simple and easy to grasp, making it ideal for beginners.

## Strategy Logic

The strategy uses 5-period and 20-period WMA lines crossover as entry signals. It goes long when 5-period line breaks above 20-period line, and goes short when 5-period line breaks below 20-period line. It also uses 50-period WMA line to determine the trend direction. Trading signals are only triggered when price breakout direction is consistent with the major trend.

In addition, the strategy leverages ATR indicator to set dynamic stop loss and take profit levels. ATR reflects the volatility of the market. The strategy uses ATR value multiplied by a factor (such as 3) to determine stop loss and take profit, thereby controlling per trade loss.

Finally, the strategy only triggers trades during US trading hours (9:00-14:30 CST) to avoid high volatility around market open and close where false signals easily form.

## Advantage Analysis 

The strategy has the following advantages:

1. Dual moving average crossover effectively captures trend turning points for timely entry.

2. Trend filter avoids trading against major trend and reduces false signals. 

3. Dynamic ATR-based stop loss controls per trade loss.

4. Limiting trading hours avoids volatile open and close periods.

5. Simple and clear rules, easy to understand and implement for beginners.

6. Customizable parameters like MA periods, ATR multiplier, trading hours etc. for optimization.

## Risk Analysis

The strategy also has the following risks:

1. More stop loss triggers during range-bound markets.

2. Dual MA crossover has lag and may miss short-term breakouts.  

3. Improper ATR parameter setting leads to large or small stop loss.

4. Rely solely on technical indicators without fundamental analysis.

5. Effectiveness relies on proper symbol and timeframe.

6. Mechanical system has risk of being arbitraged. 

7. Parameters need adjustment for different trading sessions.

These can be improved via parameter tuning, indicator combinations, selective manual intervention etc.

## Optimization Directions

The strategy can be enhanced in the following aspects:

1. Test different MA systems like EMA, DMA etc.

2. Add other technical filters like MACD, RSI etc.

3. Optimize ATR parameters for better stop loss/profit.

4. Incorporate volume indicators to find high quality entry signals.

5. Adjust parameters based on symbol specifics. 

6. Integrate fundamental factors to avoid trading against market.

7. Introduce machine learning like neural networks for market modeling.

8. Explore multi-timeframe combinations for more opportunities.

9. Construct strategy ensemble to improve robustness.

## Conclusion

In summary, this is a simple and intuitive strategy suitable for beginners to practice live trading. At the same time, huge room remains for optimization via more technical indicators or machine learning. Parameter tuning based on symbol and market dynamics is also key. The strategy provides a reference framework for quant trading beginners, but requires relentless testing and enhancement for stable profits.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ATR Period|
|v_input_2_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_3|3|ATR Multiplier|
|v_input_4|true|Change ATR Calculation Method ?|
|v_input_5|true|Show Buy/Sell Signals ?|
|v_input_6_close|0|Fast WMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|5|Fast WMA Period|
|v_input_8_close|0|Slow WMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|20|Slow WMA Period|
|v_input_10_close|0|Trend 50 Period Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_11|50|Trend 50 Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-15 00:00:00
end: 2023-11-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © james4392010

//@version=4

strategy(title="DayTradingFutures Cross-Strategy", overlay=true)




// === GENERAL INPUTS ===
Periods = input(title="ATR Period", type=input.integer, defval=10)
src = input(hl2, title="Source")
Multiplier = input(title="ATR Multiplier", type=input.float, step=0.1, defval=3.0)
changeATR= input(title="Change ATR Calculation Method ?", type=input.bool, defval=true)
showsignals = input(title="Show Buy/Sell Signals ?", type=input.bool, defval=true)
//highlighting = input(title="Highlighter On/Off ?", type=input.bool, defval=true)
atr2 = sma(tr, Periods)
atr= changeATR ? atr(Periods) : atr2
up=src-(Multiplier*atr)
up1 = nz(up[1],up)
up := close[1] > up1 ? max(up,up1) : up
dn=src+(Multiplier*atr)
dn1 = nz(dn[1], dn)
dn := close[1] < dn1 ? min(dn, dn1) : dn



wmaFastSource   = input(defval = close, title = "Fast WMA Source")
wmaFastLength   = input(defval = 5, title = "Fast WMA Period")
wmaSlowSource   = input(defval = close, title = "Slow WMA Source")
wmaSlowLength   = input(defval = 20, title = "Slow WMA Period")
wmaDirectionSource  = input(defval = close, title = "Trend 50 Period Source")
wmaDirectionLength  = input(defval = 50, title = "Trend 50 Period")
timeinrange(res, sess) => time(res, sess) != 0



// === SERIES SETUP ===
/// a couple of ma's..
wmaFast = wma(close, 5)
wmaSlow = wma(close, 20)
wmaDirection = wma(close, 50)





// === PLOTTING ===
fast = plot(series=wmaFast, color=color.white, linewidth=2)
slow = plot(series=wmaSlow, color=color.yellow, linewidth=2)
direction = plot(series=wmaDirection, color=color.red, linewidth=2)


// === INPUT BACKTEST RANGE ===

//fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
//fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
//fromYear = input(defval = 2022, title = "From Year", minval = 2022)
 
// To Date Inputs
//toDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
//toMonth = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
//toYear = input(defval = 2022, title = "To Year", minval = 2022)
//startDate = timestamp(fromYear, fromMonth, fromDay)
//finishDate = timestamp(toYear, toMonth, toDay)
//inDateRange= (time >= fromDay, fromMonth, fromYear and time <= toDay, toMonth, toYear) 



// === FUNCTION EXAMPLE ===
//inDateRange = (time >= fromDay, fromMonth, fromYear) and (time <= toDay, toMonth, toYear)


// === LOGIC ===

enterLong = crossover(wmaFast, wmaSlow) and close > wmaDirection and timeinrange(timeframe.period, "0900-1430")
enterShort = crossunder(wmaFast, wmaSlow) and close < wmaDirection and timeinrange(timeframe.period, "0900-1430")

//trend := nz(trend[1], trend)
//trend := trend == -1 and close > dn1 ? 1 : trend == 1 and close < up1 ? -1 : trend
//upPlot = plot(trend == 1 ? up : na, title="Up Trend", style=plot.style_linebr, linewidth=2, color=color.green)

buySignal = enterLong 
//plotshape(enterLong ? up : na, title="UpTrend Begins", location=location.absolute, style=shape.circle, size=size.tiny, color=color.green)
plotshape(enterLong and showsignals ? up : na, title="Buy", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=color.green, textcolor=color.white)
//dnPlot = plot(trend == 1 ? na : dn, title="Down Trend", style=plot.style_linebr, linewidth=2, color=color.red)

sellSignal = enterShort
//plotshape(enterShort ? dn : na, title="DownTrend Begins", location=location.absolute, style=shape.circle, size=size.tiny, color=color.red)
plotshape(enterShort and showsignals ? dn : na, title="Sell", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.red, textcolor=color.white)
//mPlot = plot(ohlc4, title="", style=plot.style_circles, linewidth=0)
//longFillColor = highlighting ? (trend == 1 ? color.green : color.white) : color.white
//shortFillColor = highlighting ? (trend == -1 ? color.red : color.white) : color.white
//fill(mPlot, upPlot, title="UpTrend Highligter", color=longFillColor)
//fill(mPlot, dnPlot, title="DownTrend Highligter", color=shortFillColor)
alertcondition(buySignal, title="Buy", message="Buy!")
alertcondition(sellSignal, title="Sell", message="Sell!")
//changeCond = trend != trend[1]
//alertcondition(changeCond, title="SuperTrend Direction Change", message="SuperTrend has changed direction!")



// Entry for strategy //

//tp=input(25,title="TakeProfit")
//sl=input(40,title="StopLoss")

strategy.entry("Long",1, when=buySignal)
//strategy.exit("Exit",profit=tp,loss=sl)
//strategy.exit("TakeProfit",profit=tp)
//strategy.exit("StopLoss",loss=sl)

strategy.entry("Short",1, when=sellSignal)
//strategy.exit("Exit",profit=tp,loss=sl)
//strategy.exit("TakeProfit",profit=tp)
//strategy.exit("StopLoss",loss=sl)
//strategy.exit("Exit", wmaFastwmaSlow)

//Buy and Sell Signals

//strategy.close_all(when =not timeinrange(timeframe.period, "1000-1430"))   


// === FILL ====

fill (fast, slow, color = wmaSlow > wmaDirection ? color.green : color.red)
//fill(when=enterLong, tp, color = color.new(color.green, 90), title = "Profit area")
//fill(when=enterLong, sl, color = color.new(color.red, 90), title = "Loss area")
//fill(when=enterShort, tp, color = color.new(color.green, 90), title = "Profit area")
//fill(when=enterShort, sl, color = color.new(color.red, 90), title = "Loss area")





```

> Detail

https://www.fmz.com/strategy/432224

> Last Modified

2023-11-15 16:48:02
