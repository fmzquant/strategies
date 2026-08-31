
> Name

Adaptive-Supertrend-Channel-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy builds double-layer supertrend channels and generates trading signals when price breaks through the channels. It also adapts channel width using price volatility for adaptive effect. It belongs to trend following strategies.

## Strategy Logic

1. Calculate price standard deviation and volatility ATR, use volatility to adjust channel width.

2. Build double-layer supertrend channels, with inner layer more sensitive and outer layer more stable. 

3. Generate buy/sell signals when price breaks inner or outer channel.

4. The double channel structure helps filter some false breakouts.

5. ATR volatility adapts channel width, wider when volatility surges for adaptive effect.

## Advantages

1. Supertrend channels are simple and effective in tracking trends.

2. The double channel filters false breakouts and improves signal quality.

3. Volatility adaptive adjustment makes the channels fit different market environments.

4. Easy to implement with simple parameter tuning.

5. Visualized channels and breakouts form intuitive trading signals.

## Risks

1. Breakout signals may produce false signals resulting in unnecessary losses.

2. It fails to determine trend direction, risks of counter-trend trading.

3. Adaptive adjustment may be too sensitive, with over-adjustments.

4. Improper parameter optimization leads to overfitting.

5. As a trend following strategy, it struggles in range-bound markets.

## Enhancement

1. Test parameters' impacts on adaptive effect.

2. Incorporate MA to determine major trends. 

3. Optimize breakout confirmation to avoid false breakouts.

4. Add stop loss to limit loss per trade.

5. Evaluate channel tuning on trading frequency.

6. Use machine learning to dynamically optimize parameters.

## Conclusion

This strategy uses adaptive double supertrend channels to capture price trends. It is simple and intuitive in tracking trends. But risks include false breakouts and incorrect trend direction. Further parameter tuning and supplementary mechanisms can improve strategy performance, making it a robust trend following system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Multiplier|
|v_input_2|10|Period|
|v_input_3|false|Self-Adjusting|
|v_input_4|true|From Day|
|v_input_5|true|From Month|
|v_input_6|2019|From Year|
|v_input_7|true|To Day|
|v_input_8|true|To Month|
|v_input_9|2020|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("SuperTrend Cloud Strategy", shorttitle="SuperTrend Cloud Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, initial_capital = 1000)

//Inputs
multi = input(title="Multiplier", type=input.float, step=0.1, defval=3, minval=1)
period = input(title="Period", type=input.integer, step=1, defval=10, minval=1)
SelfAdjust = input(title="Self-Adjusting", type=input.bool, defval = false)


////////////////////////////////////////////////////////////////////////////////
// BACKTESTING RANGE
 
// From Date Inputs
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2019, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2020, title = "To Year", minval = 1970)
 
// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true
 
////////////////////////////////////////////////////////////////////////////////

dev = stdev(close, period)
stdDev = (dev / close) * 100 + 1
MultDev = SelfAdjust ? multi * stdDev : multi

up_lev1 = hl2 - MultDev * atr(period)
dn_lev1 = hl2 + MultDev * atr(period)
up_lev2 = hl2 - (MultDev * 2 * atr(period))
dn_lev2 = hl2 + (MultDev * 2 * atr(period))

up_trend1 = 0.0
up_trend1 := close[1] > up_trend1[1] ? max(up_lev1, up_trend1[1]) : up_lev1
up_trend2 = 0.0
up_trend2 := close[1] > up_trend2[1] ? max(up_lev2, up_trend2[1]) : up_lev2

down_trend1 = 0.0
down_trend1 := close[1] < down_trend1[1] ? min(dn_lev1, down_trend1[1]) : dn_lev1
down_trend2 = 0.0
down_trend2 := close[1] < down_trend2[1] ? min(dn_lev2, down_trend2[1]) : dn_lev2

trend1 = 0
trend1 := close > down_trend1[1] ? 1: close < up_trend1[1] ? -1 : nz(trend1[1], 1)
trend2 = 0
trend2 := close > down_trend2[1] ? 1: close < up_trend2[1] ? -1 : nz(trend2[1], 1)

st_line1 = trend1 == 1 ? up_trend1 : down_trend1
st_line2 = trend2 == 1 ? up_trend2 : down_trend2

// Plotting
plot1 = plot(st_line1, color = trend1 == 1 ? color.green : color.red , style = plot.style_line, linewidth = 1, title = "SuperTrend 1")
plot2 = plot(st_line2, color = trend2 == 1 ? color.green : color.red , style = plot.style_line, linewidth = 1, title = "SuperTrend 2")
fill(plot1, plot2, color = color.aqua, title = "Cloud")

buy = crossover(close, st_line1) and close > st_line2 or crossover(close, st_line2) and close > st_line1
sell = crossunder(close, st_line1) and close < st_line2 or crossunder(close, st_line2) and close < st_line1

if(buy and time_cond)
    strategy.entry("long", long = true , comment="long")

if (close < st_line1 and time_cond or close < st_line2 and time_cond)
    strategy.close("long")
    
if (not time_cond)
    strategy.close_all()





 

```

> Detail

https://www.fmz.com/strategy/427382

> Last Modified

2023-09-20 15:17:51
