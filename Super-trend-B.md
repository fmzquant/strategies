
> Name

Super-trend-B

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|length|
|v_input_float_1|0.5| multiflier|
|v_input_float_2|3|SuperTrend Multiplier|
|v_input_int_2|7|SuperTrend Period|
|v_input_float_3|2|DEV|
|v_input_int_3|150|Linear length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

//@version=5
indicator(title='Super trend B', overlay=true)

length = input.int(20, minval=1)
src = close
mult1 = input.float(0.5, minval=0.001, maxval=50, title=" multiflier")
basis = ta.sma(src, length)

upper1 = basis + mult1 * ta.stdev(src, length)
lower1 = basis - mult1 * ta.stdev(src, length)

plot(basis, "Basis", color=#FF6D00)

plot(upper1, "Upper 1", color=#2962FF)
plot(lower1, "Lower 1", color=#2962FF)

// INPUTS //
st_mult = input.float(3, title='SuperTrend Multiplier', minval=0, maxval=100, step=0.01)
st_period = input.int(7, title='SuperTrend Period', minval=1)

// CALCULATIONS //
up_lev = upper1 - st_mult * ta.atr(st_period)
dn_lev = lower1 + st_mult * ta.atr(st_period)

up_trend = 0.0
up_trend := close > up_trend ? math.max(up_lev, up_trend) : up_lev

down_trend = 0.0
down_trend := close < down_trend ? math.min(dn_lev, down_trend) : dn_lev

// Calculate trend var
trend = 0
trend := close > down_trend ? 1 : close < up_trend ? -1 : nz(trend, 1)

// Calculate SuperTrend Line
st_line = trend == 1 ? up_trend : down_trend

// Plotting
//plot(st_line[1], color=trend == 1 ? color.green : color.red, style=plot.style_cross, linewidth=2, title='SuperTrend')
buy = ta.crossover(close, st_line) 
sell = ta.crossunder(close, st_line)
//plotshape(crossover( close, st_line), location = location.belowbar, color = color.green,size=size.tiny)
//plotshape(crossunder(close, st_line), location = location.abovebar, color = color.red,size=size.tiny)
//plotshape(buy, title='buy', text='Buy', color=color.new(color.green, 0), style=shape.labelup, location=location.belowbar, size=size.small, textcolor=color.new(color.white, 0))  //plot for buy icon
plotshape(sell, title='sell', text='Sell', color=color.new(color.red, 0), style=shape.labeldown, location=location.abovebar, size=size.small, textcolor=color.new(color.white, 0))  //plot for sell icon


//
multiplier = input.float(title='DEV', defval=2, minval=1)
src5 = close
len5 = input.int(title='Linear length', defval=150, minval=1)
offset = 0

calcSlope(src5, len5) =>
    sumX = 0.0
    sumY = 0.0
    sumXSqr = 0.0
    sumXY = 0.0
    for i = 1 to len5 by 1
        val = src5[len5 - i]
        per = i + 1.0
        sumX += per
        sumY += val
        sumXSqr += per * per
        sumXY += val * per
        sumXY


    slope = (len5 * sumXY - sumX * sumY) / (len5 * sumXSqr - sumX * sumX)
    average = sumY / len5
    intercept = average - slope * sumX / len5 + slope
    [slope, average, intercept]

var float tmp = na
[s, a, i] = calcSlope(src5, len5)

vwap1 = i + s * (len5 - offset)
sdev = ta.stdev(close, len5)
dev = multiplier * sdev
top = vwap1 + dev
bott = vwap1 - dev

//
z1 = vwap1 + dev
x1 = vwap1 - dev

low1 = ta.crossover(close, x1)
high1 = ta.crossunder(close, z1)

plotshape(low1, title='b', text='BUY', color=color.new(color.green, 0), style=shape.labelup, location=location.belowbar, size=size.small, textcolor=color.new(color.white, 0))  //plot for buy icon
plotshape(high1, title='high', text='HIGH', color=color.new(color.green, 0), style=shape.labeldown, location=location.abovebar, size=size.small, textcolor=color.new(color.white, 0))  //plot for sell icon


/////// Alerts /////
//alertcondition(buy, title='buy')
alertcondition(sell, title='sell')
alertcondition(low1, title='buy')
//alertcondition(high1, title='buy tp')
if low1
   strategy.entry("Alert on Bottom", strategy.long)
else if high1
    strategy.entry("Alert on Top", strategy.short)
```

> Detail

https://www.fmz.com/strategy/366385

> Last Modified

2022-05-29 07:09:06
