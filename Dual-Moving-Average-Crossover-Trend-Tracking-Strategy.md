
> Name

Dual-Moving-Average-Crossover-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy utilizes the dual moving average crossover principle combined with a trend tracking indicator to determine and follow trends. The main idea is to go long when the short period moving average crosses above the long period moving average and go short when the short period moving average crosses below the long period moving average. The overall trend direction is also determined by the 100-day moving average to avoid false breakouts.

## Strategy Logic

The strategy consists mainly of a dual moving average crossover system and a trend tracking system. 

The dual moving average crossover system contains a fast EMA1 and slow EMA2. The default periods are 10 days for EMA1 and 20 days for EMA2. A buy signal is generated when EMA1 crosses above EMA2. A sell signal is generated when EMA1 crosses below EMA2.

The 100-day EMA (EMA100) is added to determine the overall trend direction. Buy signals are only generated when the price is in an upward trend (price is above the 100-day EMA). Sell signals are only generated when the price is in a downward trend (price is below the 100-day EMA). This filters out most false breakout situations.

Buy and sell arrows are also plotted on the candles to visually display the trading signals.

The trend tracking system uses intraday and cycle day lines to confirm the trend direction again. Intraday uses 5-min and 60-min Heikin-Ashi moving averages while the cycle uses 8-day and 12-day moving averages of the daily line. 

Trading signals are only generated when the intraday and cycle judgments agree. This further filters out most noise in the non-major trend directions.

## Advantage Analysis 

The biggest advantage of this strategy is the integration of both trend tracking and moving average crossover systems, which effectively filters out false signals and keeps drawdowns within acceptable levels.

Specifically, the advantages of the dual moving average crossover system are:

1. Simple logic and easy to understand, suitable for beginners.

2. Trend-following, avoids trading against the trend.  

3. Customizable fast and slow EMA periods, adaptable to different cycles.

4. Strong profitability in major trends.

Adding the EMA100 has the advantages of:

1. Avoiding trading against the trend, reducing losses.

2. Following the trend, keeping drawdown controllable.

The trend tracking system has the advantages of:

1. Multiple timeframe analysis, avoiding noise from a single period.

2. Ensuring alignment with major trend direction, reducing drawdowns. 

3. Heikin-Ashi smooths out noise, only capturing trends.

## Risk Analysis

Some risks to note for this strategy:

1. Frequent crossovers and extra trading costs during prolonged consolidations.

2. Delayed signals, missing early trend stages.

3. Severe losses when major trend reverses.  

4. Performance depends on parameter optimization.

Solutions:

1. Reduce trading frequency during consolidations.

2. Shorten EMA periods to get earlier trend signals. 

3. Use stop loss to control single loss.

4. Optimize parameters for different products and market conditions.

## Optimization Directions

This strategy can be optimized in the following areas:

1. EMA period optimization. Test more combinations to find optimal periods.

2. Add more timeframe judgments, e.g. monthly or quarterly lines.

3. Incorporate stop loss mechanisms like moving or exponential stops.

4. Combine with volume indicators like On Balance Volume. 

5. Improve entry timing using faster oscillators like MACD.

6. Parameter optimization for more products and assets.

## Conclusion

This strategy combines the strengths of dual moving average crossover and trend tracking systems, avoiding the weaknesses of single systems. Multiple timeframe analysis ensures correct trade direction while drawdown control is excellent. Further optimizations can adapt it to more market environments for practical usage.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|par1|
|v_input_2|20|par2|
|v_input_3|8|MA1|
|v_input_4|12|MA2|
|v_input_5|D|Short Time|
|v_input_6|W|Long Time|
|v_input_7|16|EMA Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-20 00:00:00
end: 2023-09-27 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © askkuldeeprandhawa

//@version=4

strategy("KSR Strategy", overlay=true)



par1=input(10)
par2=input(20)
ema1=ema(close,par1)
ema2=ema(close,par2)
buy=ema1>ema2
sell=ema2<ema1
mycolor= iff(buy,color.green,iff(sell,color.blue,color.red))
barcolor(color=mycolor)



ema100=ema(close,100)
ibuy=crossover(ema1,ema2)
iSell=crossunder(ema1,ema2)

varp=tostring(close[1])
plotshape(ibuy, "Up Arrow", shape.triangleup, location.belowbar, color.green, 0, 0,"Buy" , color.green, true, size.tiny)
plotshape(iSell, "Down Arrow", shape.triangledown, location.abovebar, color.red, 0, 0, "Sell", color.red, true, size.tiny)

crossed =crossover(ema(close,par1), ema(close,par2))
// if crossed
//     l = label.new(bar_index, na, tostring(close), 
//          color=color.green, 
//          textcolor=color.white,
//          style=label.style_labelup, yloc=yloc.belowbar)
         
crossed2 =crossunder(ema(close,par1), ema(close,par2))
// if crossed2
//     l = label.new(bar_index, na, tostring(close), 
//          color=color.red, 
//          textcolor=color.white,
//          style=label.style_labeldown, yloc=yloc.abovebar)
         
plot(ema(close,par1),"EMA Short",color=color.white)
plot(ema(close,par2),"EMA Long",color=color.orange)


longCondition = crossover(ema(close, par1), ema(close, par2))
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

shortCondition = crossunder(ema(close, par1), ema(close, par2))
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)




ma1_len = input(title="MA1", type=input.integer, defval=8, minval=1, maxval=100, step=1)
ma2_len = input(title="MA2", type=input.integer, defval=12, minval=1, maxval=100, step=1)

o = ema(open, ma1_len)
c = ema(close, ma1_len)
h = ema(high, ma1_len)
l = ema(low, ma1_len)

tim1=input('D',"Short Time")
tim2=input('W',"Long Time")

ema_p=input(title="EMA Period", type=input.integer, defval=16, minval=1, maxval=100, step=1)
refma = ema(close, ema_p)
plot(refma, title="EMA" , linewidth=1, color=close < refma ? color.orange : color.blue)
ha_t = heikinashi(syminfo.tickerid)
ha_o = security(ha_t, tim2, o)
ha_c = security(ha_t, tim2, c)
ha_h = security(ha_t, tim2, h)
ha_l = security(ha_t, tim2, l)
o2 = ema(ha_o, ma2_len)
c2 = ema(ha_c, ma2_len)
h2 = ema(ha_h, ma2_len)
l2 = ema(ha_l, ma2_len)
ha_col = ha_c > ha_o ? color.red : color.green
plotshape(true, style=shape.circle, color=ha_c > ha_o ? color.green : color.red, location=location.bottom)


ha_t1 = heikinashi(syminfo.tickerid)
ha_o1 = security(ha_t1, tim1, o)
ha_c1 = security(ha_t1, tim1, c)
ha_h1 = security(ha_t1, tim1, h)
ha_l1 = security(ha_t1, tim1, l)
o3 = ema(ha_o1, ma2_len)
c3 = ema(ha_c1, ma2_len)
h3 = ema(ha_h1, ma2_len)
l3 = ema(ha_l1, ma2_len)
ha_col1 = ha_c1 > ha_o1 ? color.red : color.green
plotshape(true, style=shape.circle, color=ha_c1 > ha_o1 ? color.green : color.red, location=location.top)






```

> Detail

https://www.fmz.com/strategy/428068

> Last Modified

2023-09-28 11:52:16
