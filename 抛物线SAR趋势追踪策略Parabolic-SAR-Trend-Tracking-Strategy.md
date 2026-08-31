
> Name

抛物线SAR趋势追踪策略Parabolic-SAR-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/106026b1544025a12dc.png)


## Overview

This strategy utilizes Parabolic SAR (Stop and Reverse) indicator combined with EMA filtering to improve signal accuracy. It is suitable for traders who trade with the trend.

## Strategy Logic

A long signal is triggered when SAR is below price and price is above slow EMA plus offset. A short signal is triggered when SAR is above price and price is below slow EMA minus offset. Crossover between fast EMA and slow EMA provides additional filtering. This avoids false signals when using SAR alone.   

Specifically, long entry conditions are: 
1) SAR is below previous close and above current close;  
2) Current close is above slow EMA plus offset or fast EMA crosses below slow EMA;
3) Current close is above SAR value and slow EMA plus offset.

Short entry conditions are:
1) SAR is above previous close and below current close;
2) Current close is below slow EMA minus offset or fast EMA crosses above slow EMA; 
3) Current close is below SAR value and slow EMA minus offset.

## Advantage Analysis 

Combining SAR and EMA filtering, this strategy can identify trend direction well and reduce false signals.

Advantages are:

1. SAR can respond quickly to price changes and identify trend reversal points.  
2. EMA filtering further confirms trend direction and avoids false signals when using SAR alone.
3. Crossover between fast and slow EMA provides additional signal accuracy.  
4. Profitability can be improved through parameter optimization.

## Risk Analysis

There are some risks to this strategy:

1. SAR and EMA may generate incorrect signals during range-bound markets, impacting profitability. This can be reduced through parameter optimization.
2. EMA has lagging effect and may miss best entry points when trend reverses. Lagging effect can be reduced by shortening EMA periods. 
3. Stop loss may get hit easily during high volatility, causing higher losses. Stop loss range can be widened appropriately.  

## Optimization Directions   

This strategy can be optimized from the following aspects:

1. Optimize SAR parameters like step and maximum to make it more sensitive. 
2. Optimize slow and fast EMA periods to find optimal combinations.
3. Optimize EMA offset to reduce false signals.  
4. Add other indicators like MACD and KDJ for additional filtering and accuracy.
5. Optimize stop loss strategy to reduce losses per trade.  

## Conclusion

This strategy combines the strengths of SAR and EMA to design a flexible trend following system. Overall it has good trend detection capability and works well in tracking trends. Further enhancements in parameter optimization and risk management can improve stability and profitability. It suits investors with good risk management awareness and optimization skills.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|Slow EMA Length|
|v_input_2|10|Fast EMA Length|
|v_input_3|true|EMA Offset %|
|v_input_4|0.01|start|
|v_input_5|0.005|increment|
|v_input_6|0.08|maximum|
|v_input_7|true|From Day|
|v_input_8|true|From Month|
|v_input_9|2019|From Year|
|v_input_10|true|To Day|
|v_input_11|true|To Month|
|v_input_12|2020|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-11 00:00:00
end: 2024-01-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("SAR Trend Trader Strategy By: jhanson107", shorttitle="SAR Trend Trader Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)


SlowEMALength = input(100, "Slow EMA Length")
FastEMALength = input(10, "Fast EMA Length")
emaoffset = input(1.00, "EMA Offset %")
start = input(0.01)
increment = input(0.005)
maximum = input(0.08)

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

psar = sar(start, increment, maximum)
ema = ema(close, SlowEMALength)
fastema = ema(close, FastEMALength)
offset = (emaoffset / 100) * ema

// Signals
long = high[1] < psar[2] and high >= psar[1] and close > ema + offset or crossunder(ema, fastema) and close > psar and close > ema + offset
short = low[1] > psar[2] and low <= psar[1] and close < ema - offset or crossover(ema, fastema) and close < psar and close < ema - offset

// Plot PSAR
plot(psar, title="PSAR", color = low < psar and not long ? green : red, trackprice=true)

//Barcolor
barcolor(close > psar and close > ema + offset and fastema > ema ? green : na)
barcolor(close > psar and close < ema + offset or close > psar and fastema < ema ? white : na)
barcolor(close < psar and close < ema - offset and fastema < ema and close? red : na)
barcolor(close < psar and close > ema - offset or close < psar and fastema > ema ? white : na)

//Plot EMA
plot(ema, color=blue, linewidth=1, transp=0, title="Slow EMA")
plot(fastema, color=purple, linewidth=1, transp=0, title="Fast EMA")


if(high > psar)
    strategy.close("Short")
    
if(low < psar)
    strategy.close("Long")
    
if(long and time_cond)
    strategy.entry("Long", strategy.long, comment="Long")
   
if(short and time_cond)
    strategy.entry("Short", strategy.short, comment="Short")

if (not time_cond)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/439202

> Last Modified

2024-01-18 12:21:17
