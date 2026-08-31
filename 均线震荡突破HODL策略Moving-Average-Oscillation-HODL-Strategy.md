
> Name

均线震荡突破HODL策略Moving-Average-Oscillation-HODL-Strategy

> Author

ChaoZhang

> Strategy Description


This strategy observes price oscillation around long-period moving averages (e.g. 200-day) to determine hold signals, trading breakouts for position entry and using break below as stop loss. It aims to minimize trading frequency for long-term holding. 

Strategy Logic:

1. Calculate a long-period moving average, typically 200-day. 

2. Enter long when price breaks above the moving average.

3. Exit long when price breaks back below the moving average. 

4. Hold long position until break below stop loss.

Advantages:

1. Long-period MA effectively identifies mid-to-long term trends.

2. Breakout trading captures long-term reversals in a timely manner.

3. Lower trading frequency reduces costs and risks.

Risks:

1. Longer MAs lag significantly, resulting in poor entry timing.

2. No limit on post-breakout drawdown risks.

3. Frequent minor breakouts bring sustained small losses.

In summary, this HODL strategy uses long MA oscillation to determine hold timing, minimizing trade frequency. But parameter optimization and stop loss placement could improve performance and risk control for steady long-term gains. 


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2029|Backtest Stop Year|
|v_input_5|true|Backtest Stop Month|
|v_input_6|true|Backtest Stop Day|
|v_input_7|200|MA Period|
|v_input_8|0|smoothing: EMA|SMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-05 00:00:00
end: 2023-04-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("HODLBot", default_qty_type=strategy.percent_of_equity, default_qty_value=100, calc_on_every_tick=true, overlay=true)
    
//// Time limits 
testStartYear = input(2017, "Backtest Start Year")
testStartMonth = input(01, "Backtest Start Month")
testStartDay = input(01, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2029, "Backtest Stop Year")
testStopMonth = input(1, "Backtest Stop Month")
testStopDay = input(1, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

testPeriod() => true

maPeriod = input(200, "MA Period")
smoothing = input(defval="EMA", options=["EMA", "SMA"])

ma(smoothing, src, length) => 
    if smoothing == "EMA"
        ema(src, length)
    else
        if smoothing == "SMA"
            sma(src, length)
        
//// Main ////

movingAverage = ma(smoothing, close, maPeriod)

plot(movingAverage, color=orange, style = line, linewidth = 4)
 
// very simple, price over MA? Buy and HODL 
if (testPeriod() and close > movingAverage)
    strategy.entry("HODL", strategy.long)

// Price under, close long
if (testPeriod() and close < movingAverage)
    strategy.close("HODL")

```

> Detail

https://www.fmz.com/strategy/426497

> Last Modified

2023-09-12 16:02:24
