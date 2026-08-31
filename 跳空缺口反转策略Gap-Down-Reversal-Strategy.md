
> Name

跳空缺口反转策略Gap-Down-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

## Overview

This strategy trades gap down reversals. When the current candle opens below the prior close and finishes up on the day with a close greater than the open, the strategy enters long on the next day's open or close.

## Strategy Principle

1. Check if a gap down occurs, i.e. current open below prior close. 

2. If gapped down, observe if the current close is above the open, indicating an upside reversal.

3. If gap down reversal conditions are met, go long on the next day's open or close.

4. Set a trailing stop loss at a percentage, e.g. 5%, after entry. The stop level moves up with the price.

5. When price drops to hit the stop loss, the position is closed.

## Advantage Analysis

Main advantages of this strategy:

1. Captures reversal trading opportunities from gap down patterns.

2. High probability reversal pattern aligns with alternating fear/greed. 

3. Trailing stop locks in profits without needing manual monitoring.

4. Flexible settings for entry and stop loss to suit individual stocks.

5. Automated execution and easy backtesting/optimization.

## Risk Analysis

Main risks of this strategy:

1. Failed gap down reversals can occur, need pattern verification.

2. Oversized stop loss prone to being taken out leading to amplified losses.

3. Poor stock selection may lead to hard reversals.

4. Insufficient backtest data leads to overfit risks.

5. Execution differs between backtest and live.

Solutions:

1. Optimize stop loss level and cap loss percentage per trade.

2. Gauge overall market trend to avoid topping stocks. 

3. Verify pattern and volume changes. 

4. Expand sample size for backtest, simulate live trading.

## Optimization Directions

Some ways to improve the strategy:

1. Add trend filter to avoid countertrend entries.

2. Dynamically adjust stop loss percentage to protect profits.

3. Consider adding time filter to trade on specific dates. 

4. Assess strength of pattern for position sizing.

5. Test different holding periods to find optimal exit spots.

## Summary

The gap down reversal strategy capitalizes on high probability reversal patterns. Stops effectively control risk but beware of false bounces and changing market conditions. When trading live, cautious evaluation of patterns and trends along with ongoing optimizations are recommended.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Start Date|
|v_input_2|true|Start Month|
|v_input_3|2009|Start Year|
|v_input_4|5|Trail Long Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-12 04:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © RolandoSantos

//@version=2

strategy(title="Gap Down reversal strat", overlay=true, pyramiding=1, default_qty_type =  strategy.cash, default_qty_value = 10000, initial_capital = 10000 )

/// Start date

startDate = input(title="Start Date", defval=1, minval=1, maxval=31)
startMonth = input(title="Start Month", defval=1, minval=1, maxval=12)
startYear = input(title="Start Year", defval=2009, minval=1800, maxval=2100)


// See if this bar's time happened on/after start date
afterStartDate = (time >= timestamp(syminfo.timezone, startYear, startMonth, startDate, 0, 0))

// STEP 1:
// Configure trail stop level with input options (optional)
longTrailPerc = input(title="Trail Long Loss (%)",
     type=float, minval=0.0, step=0.1, defval=5.0) * 0.01


// Calculate trading conditions
gap_d_r = open < close[1] and close > open


// Plot Shapes
plotshape(gap_d_r, style=shape.triangleup, location=location.belowbar)
///plotshape(gap_u_r, style=shape.triangledown, location=location.abovebar)

///// Use Low, or close/////

//hlco = input(title="Stop Modifier", defval="close", options=["open", "high", "low"])


// STEP 2:
// Determine trail stop loss prices
longStopPrice = 0.0   ///, shortStopPrice = 0.0

longStopPrice := if (strategy.position_size > 0)
    stopValue = close * (1 - longTrailPerc)
    max(stopValue, longStopPrice[1])
else
    0


// Plot stop loss values for confirmation
plot(series=(strategy.position_size > 0) ? longStopPrice : na,
     color=red, style=circles,
     linewidth=1, title="Long Trail Stop")


// Submit entry orders
if (afterStartDate and gap_d_r)
    strategy.entry(id="EL", long=true)


// Submit exit orders for trail stop loss price
if (strategy.position_size > 0)
    strategy.exit(id="Stop out", stop=longStopPrice)














```

> Detail

https://www.fmz.com/strategy/427266

> Last Modified

2023-09-19 16:19:51
