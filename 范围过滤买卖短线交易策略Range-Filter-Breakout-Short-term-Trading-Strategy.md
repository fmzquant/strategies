
> Name

范围过滤买卖短线交易策略Range-Filter-Breakout-Short-term-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview 

This short-term trading strategy generates buy and sell signals based on the price fluctuation range. It calculates the price movement range over a period and uses that as a filter for trade signals. Signals are triggered when price breaks out of the range.

## Strategy Logic

The core indicator is the price fluctuation range. The specific steps are:

1. Calculate the high-low range over past N periods as the price amplitude

2. Smooth the amplitude using moving averages to derive the range filter

3. A buy signal is generated when price rises above the range filter 

4. A sell signal is generated when price drops below the range filter

This way, breakouts of the price range are used to determine trend direction and filtrate noise for cleaner signals.

## Advantages

- Price range easy to judge breakouts
- Smoothed range effectively filters noise 
- Breakout signals catch short-term trends
- Higher trade frequency suitable for short-term
- Adjustable parameters easy to optimize

## Risks

- Range breakouts prone to whipsaws
- Needs sufficient historical data to calculate range
- Bad parameters cause oversensitivity or sluggishness 
- No effective stops, large drawdowns
- Performance impacted by fees due to high frequency

Risks can be mitigated by:

- Relaxing range filter volatility coefficient
- Parameter optimization for ideal settings
- Implementing stop loss or trailing stops 
- Reducing trade frequency to lower fees
- Product-specific parameter testing

## Enhancement Directions

The strategy can be improved by:

1. Testing different range calculation periods

2. Optimizing range filter volatility coefficient

3. Adding confirming indicators like MACD 

4. Using moving or trailing stops

5. Tuning parameters specifically for each product

6. Optimizing position sizing system

## Summary

This strategy uses price breaking out of ranges to generate short-term signals, effectively capturing temporary trends. But risks like whipsaws exist. Improvements can be made through parameter optimization, stop losses, adding filters etc. to control risks while retaining effectiveness. Fine-tuning parameters by product characteristics is also essential. Continual optimizations lead to robustness.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---------------- Use Date ----------------|
|v_input_2|7|From Month|
|v_input_3|25|From Day|
|v_input_4|2019|From Year|
|v_input_5|true|To Month|
|v_input_6|true|To Day|
|v_input_7|9999|To Year|
|v_input_8_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|false|Use HA Candles|
|v_input_10|50|Sampling Period|
|v_input_11|3|Range Multiplier|
|v_input_12|false|----- Use Stop Loss / Take profit -----|
|v_input_13|100|Stop Loss %|
|v_input_14|1.5|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-21 00:00:00
end: 2023-09-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="Range Filter Buy and Sell 5min [Strategy]", overlay=true, commission_type=strategy.commission.percent, commission_value=0.025, default_qty_type=strategy.cash, default_qty_value=10000, initial_capital=10000, slippage=0)

// === INPUT BACKTEST RANGE ===
useDate = input(true,     title='---------------- Use Date ----------------', type=bool)
FromMonth = input(defval = 7, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 25, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2019, title = "From Year", minval = 2017)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2017)
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true  // create function "within window of time"
// === INPUT BACKTEST RANGE ===


sources = input(defval=close, title="Source")
isHA = input(false, "Use HA Candles", bool)
src = isHA ? security(heikenashi(tickerid), period, sources) : sources
// Sampling Period
// Settings for 5min chart, BTCUSDC. For Other coin, change the paremeters

per = input(defval=50, minval=1, title="Sampling Period")

// Range Multiplier

mult = input(defval=3.0, minval=0.1, title="Range Multiplier")

// Smooth Average Range

smoothrng(x, t, m)=>
    wper      = (t*2) - 1
    avrng     = ema(abs(x - x[1]), t)
    smoothrng = ema(avrng, wper)*m
    smoothrng
smrng = smoothrng(src, per, mult)

// Range Filter

rngfilt(x, r)=>
    rngfilt  = x
    rngfilt := x > nz(rngfilt[1]) ? ((x - r) < nz(rngfilt[1]) ? nz(rngfilt[1]) : (x - r)) : ((x + r) > nz(rngfilt[1]) ? nz(rngfilt[1]) : (x + r))
    rngfilt
filt = rngfilt(src, smrng)

// Filter Direction

upward   = 0.0
upward  := filt > filt[1] ? nz(upward[1]) + 1 : filt < filt[1] ? 0 : nz(upward[1])
downward = 0.0
downward := filt < filt[1] ? nz(downward[1]) + 1 : filt > filt[1] ? 0 : nz(downward[1])

// Target Bands

hband = filt + smrng
lband = filt - smrng

// Colors

filtcolor = upward > 0 ? lime : downward > 0 ? red : orange
barcolor  = (src > filt) and (src > src[1]) and (upward > 0) ? lime : (src > filt) and (src < src[1]) and (upward > 0) ? green : 
   (src < filt) and (src < src[1]) and (downward > 0) ? red : (src < filt) and (src > src[1]) and (downward > 0) ? maroon : orange

filtplot = plot(filt, color=filtcolor, linewidth=3, title="Range Filter")

// Target

hbandplot = plot(hband, color=aqua, transp=100, title="High Target")
lbandplot = plot(lband, color=fuchsia, transp=100, title="Low Target")

// Fills

fill(hbandplot, filtplot, color=aqua, title="High Target Range")
fill(lbandplot, filtplot, color=fuchsia, title="Low Target Range")

// Bar Color

//barcolor(barcolor)

// Break Outs 

longCond = na
shortCond = na
longCond := ((src > filt) and (src > src[1]) and (upward > 0)) or ((src > filt) and (src < src[1]) and (upward > 0)) 
shortCond := ((src < filt) and (src < src[1]) and (downward > 0)) or ((src < filt) and (src > src[1]) and (downward > 0))

CondIni = 0
CondIni := longCond ? 1 : shortCond ? -1 : CondIni[1]
longCondition = longCond and CondIni[1] == -1
shortCondition = shortCond and CondIni[1] == 1

//Alerts

plotshape(longCondition, title = "Buy Signal", text ="BUY", textcolor = white, style=shape.labelup, size = size.normal, location=location.belowbar, color = green, transp = 0)
plotshape(shortCondition, title = "Sell Signal", text ="SELL", textcolor = white, style=shape.labeldown, size = size.normal, location=location.abovebar, color = red, transp = 0)

//strategy.entry("Long", strategy.long, stop = hband, when = window() , comment="Long")
//strategy.entry("Short", strategy.short, stop = lband, when = window() , comment="Short")

strategy.entry("Long", strategy.long, when = longCondition and window() , comment="Long")
strategy.entry("Short", strategy.short, when = shortCondition and window() , comment="Short")



// === Stop LOSS ===
useStopLoss = input(false, title='----- Use Stop Loss / Take profit -----', type=bool)
sl_inp = input(100, title='Stop Loss %', type=float, step=0.25)/100
tp_inp = input(1.5, title='Take Profit %', type=float, step=0.25)/100
stop_level = strategy.position_avg_price * (1 - sl_inp)
take_level = strategy.position_avg_price * (1 + tp_inp)
stop_level_short = strategy.position_avg_price * (1 + sl_inp)
take_level_short = strategy.position_avg_price * (1 - tp_inp)
// === Stop LOSS ===

if useStopLoss
    strategy.exit("Stop Loss/Profit Long","Long", stop=stop_level, limit=take_level)
    strategy.exit("Stop Loss/Profit Short","Short", stop=stop_level_short, limit=take_level_short)

```

> Detail

https://www.fmz.com/strategy/427523

> Last Modified

2023-09-21 21:17:40
