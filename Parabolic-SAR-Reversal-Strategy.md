
> Name

Parabolic-SAR-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy trades based on Parabolic SAR indicator which identifies potential reversal points in trends. Entry signals are generated when SAR flips above or below price. 

## Principles

Parabolic SAR is a trend following indicator that mainly identifies trend reversals.

When SAR is below price, it represents uptrend. SAR flipping above price gives short signal.

When SAR is above price, it represents downtrend. SAR flipping below price gives long signal.

The strategy simply trades the SAR flip as signal direction, with SAR as stop loss.

## Advantages

1. SAR accurately locates potential reversal points.

2. Trend following mechanism reduces false signals.

3. SAR acts as trailing stop, avoiding being trapped.

4. No other indicators or filters required. 

5. Easy parameter optimization, defaults often work.

## Risks and Mitigations

1. SAR may whipsaw in ranging markets. Trend filter can be added.

2. SAR too close to price risks being hit. Wider stops needed.

3. Volume is ignored, risk of divergence. Volume indicators can help.

4. Drawdowns may be significant. Appropriate position sizing is key.

5. Reversals do not always succeed. Confirmation may be needed.

## Enhancement Opportunities

1. Test if SAR parameters can be improved.

2. Add indicators like MACD to confirm reversal probability.

3. Build dynamic trailing stop mechanism. 

4. Optimize entry position sizing to capitalize on SAR signals.

5. Research adding reversal confirmation logic.

## Summary

The strategy trades potential reversal points identified by SAR, taking trades when SAR flips price. Benefits include trailing stops to avoid traps. But SAR timing may be inaccurate and needs refinement. Overall the SAR reversal concept is worth learning.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.02|start|
|v_input_2|0.02|increment|
|v_input_3|0.2|maximum|
|v_input_4|true|From Day|
|v_input_5|true|From Month|
|v_input_6|2018|From Year|
|v_input_7|true|To Day|
|v_input_8|true|To Month|
|v_input_9|2019|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-09-17 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Parabolic SAR Strategy", overlay=true)

// 
// author: Kozlod
// date: 2018-09-03
// https://www.tradingview.com/u/Kozlod/
// 

start = input(0.02)
increment = input(0.02)
maximum = input(0.2)

////////////////////////////////////////////////////////////////////////////////
// BACKTESTING RANGE
 
// From Date Inputs
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2018, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2019, title = "To Year", minval = 1970)
 
// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true
 
////////////////////////////////////////////////////////////////////////////////

psar = sar(start, increment, maximum)

// Signals
psar_long  = high[1] < psar[2] and high > psar[1] 
psar_short = low[1]  > psar[2] and low  < psar[1] 

// Plot PSAR
plotshape(psar, location = location.absolute, style = shape.cross, size = size.tiny, color = low < psar[1] and not psar_long ? green : red)


if (psar >= high and time_cond)
    strategy.entry("ParLE", strategy.long, stop=psar, comment="ParLE")
else
    strategy.cancel("ParLE")

if (psar <= low and time_cond)
    strategy.entry("ParSE", strategy.short, stop=psar, comment="ParSE")
else
    strategy.cancel("ParSE")

if (not time_cond)
    strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/427190

> Last Modified

2023-09-18 21:59:08
