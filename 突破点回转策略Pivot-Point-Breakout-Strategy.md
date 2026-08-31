
> Name

突破点回转策略Pivot-Point-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

The pivot point breakout strategy is a trend following strategy that buys stocks when price breaks above recent resistance and sells when price breaks below recent support to capture trend changes. This simple and direct strategy suits investors who have no strong market views but just want to follow the trend.

## Strategy Logic

The strategy calculates the mid points of highest price and lowest price over a period as the recent resistance and support lines. When price breaks through these pivot points, it signals trend changes that can be traded on. 

Specifically, it calculates the mid point of highest price over past N1 days as the resistance line, and mid point of lowest price over N2 days as the support line. On the long side, if today's highest price breaks above the recent resistance line, a buy signal is triggered. On the short side, if today's lowest price breaks below the recent support line, a sell signal is triggered. Investors can customize N1 and N2 to adjust the sensitivity of the strategy.

The strategy is simple and straightforward, requiring no market prediction, just tracking pivot point breakouts to capture trends. It buys when uptrend breaks resistance and sells when downtrend breaks support to follow the trend.

## Advantage Analysis

- Simple and easy to operate, suitable for all investors

The strategy is very simple and intuitive, requiring no forecasting skills, just tracking pivot point breaks. This lowers the difficulty of operation, making it suitable for investors of all levels.

- Effectively captures trend changes and adjusts positions accordingly 

Pivot point breakout is a well-recognized signal for trend changes. The strategy can respond in a timely manner when trend changes, adjusting positions to avoid being trapped.

- Customizable parameters to adjust strategy flexibility

Investors can customize the number of days to look left and right, which adjusts the strategy's sensitivity. More days makes pivots more solid, while fewer days makes the strategy more flexible and sensitive.

- Easy to combine with other strategies for versatility

The strategy mainly provides trend following. It can be easily combined with other timing strategies to improve overall returns.

## Risk Analysis  

- Potential lagging effect

The strategy needs some data accumulation to identify trend changes, which may cause certain lags in signals. Need to watch for price reversal while signals still persist in original trend.

- Risk of false breakouts 

Markets may have short-term false breaks of pivot points. Investors need certain skills to handle whipsaws and avoid being trapped.

- Larger drawdowns

The strategy fully follows trends, thus has relatively large drawdown risks. Investors need to consider their own risk tolerance. Can also lower position sizes to reduce drawdowns.

- Need to control trade frequency

Overly sensitive parameters may lead to excessive trading frequency. Need to adjust parameters properly to control number of trades. Minimum holding period can also help lower frequency.

## Optimization Directions

- Optimize parameter tuning

Can backtest and optimize the N days for highest and lowest to find best parameter mix over long term. Can also dynamically tune parameters based on market conditions, using more sensitive settings when trend is strong.

- Add strength of breakout

Can set a minimum magnitude requirement for breakout to avoid minor false breaks. Stronger momentum on breakout signals higher chance of real trend change.

- Add other indicators as filters

Can add other technical indicators like RSI, KD etc. If breakout aligns with indicator divergences, signals are more effective. Avoid relying solely on breakouts.

- Improve position sizing  

Can size positions dynamically based on market conditions to control risk. Hedges can be stopped out to avoid huge losses. Can also adjust size based on strength of ongoing trends.

## Conclusion

The pivot point breakout strategy captures trends simply through pivotal point breaks, suitable for a wide range of investors. Its advantages are simplicity and effectively capturing trend changes, but it also has some lagging issues, whipsaw risks and large drawdowns. Parameters tuning, adding filters and improving position sizing can enhance the strategy's stability. Overall it suits investors seeking simple trend following, but risks need to be managed properly.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|0|Order direction: Long|Both|Short|
|v_input_int_1|3|(?Pivot high)Left|
|v_input_int_2|3|Right|
|v_input_int_3|3|(?Pivot low)Left|
|v_input_int_4|3|Right|
|v_input_1|false|(?Date selection)Starting date|
|v_input_2|false|Final date|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-27 00:00:00
end: 2023-09-26 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © EduardoMattje

//@version=5
strategy("Pivot Point Breakout", "PPB", true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, process_orders_on_close=true)

// Constants

var L_PIVOT_HIGH = "Pivot high"
var L_PIVOT_LOW = "Pivot low"

var LEFT = "Left"
var RIGHT = "Right"

var BOTH = "Both"
var LONG = "Long"
var SHORT = "Short"

var DATES = "Date selection"
var DATES_TOOLTIP = "Change it to limit the trades for the given time interval.\n\nLeave it to disable this behaviour."

// Inputs

var orderDirection = input.string(LONG, "Order direction", options=[BOTH, LONG, SHORT])

var leftHigh = input.int(3, LEFT, minval=0, inline=L_PIVOT_HIGH, group=L_PIVOT_HIGH)
var rightHigh = input.int(3, RIGHT, minval=0, inline=L_PIVOT_HIGH, group=L_PIVOT_HIGH)

var leftLow = input.int(3, LEFT, minval=0, inline=L_PIVOT_LOW, group=L_PIVOT_LOW)
var rightLow = input.int(3, RIGHT, minval=0, inline=L_PIVOT_LOW, group=L_PIVOT_LOW)

var startDate = input(0, "Starting date", group=DATES)
var endDate = input(0, "Final date", group=DATES)

//

var float lastHigh = na
var float lastLow = na

lowPivot = ta.pivotlow(leftLow, rightLow)
highPivot = ta.pivothigh(leftHigh, rightHigh)

f_updateLevels(pivot_) => 
    var float pastLevel = na
    
    if not na(pivot_)
        pastLevel := pivot_
    
    pastLevel
    
lastLow := f_updateLevels(lowPivot)
lastHigh := f_updateLevels(highPivot)

// Validates the time interval

validTrade =  true

// Orders

if high > lastHigh
    strategy.entry("Long", strategy.long, when=orderDirection != SHORT and validTrade)
    strategy.close("Short", when=orderDirection == SHORT)
if low < lastLow
    strategy.entry("Short", strategy.short, when=orderDirection != LONG and validTrade)
    strategy.close("Long", when=orderDirection == LONG)
    
// Plots

plot(lastLow, "Last pivot low", color.red, offset=1)
plot(lastHigh, "Last pivot high", color.teal, offset=1)

plotshape(lowPivot, "Pivot low", location=location.belowbar, color=color.red, offset=-rightLow)
plotshape(highPivot, "Pivot high", color=color.teal, offset=-rightHigh)

```

> Detail

https://www.fmz.com/strategy/427991

> Last Modified

2023-09-27 16:35:26
