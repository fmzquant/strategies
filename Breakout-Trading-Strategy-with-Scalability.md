
> Name

Breakout-Trading-Strategy-with-Scalability

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c8f247680cfd6d39ae.png)

## Overview

The scalable breakout trading strategy generates trading signals when the price breaks through key support and resistance levels identified by the price swings. It is a highly flexible and extensible breakout strategy. The strategy can be adapted to different timeframes by adjusting parameters and can easily integrate additional filters and risk management mechanisms for optimization.

## How It Works 

The strategy first uses the `swings()` function to calculate the swing highs and lows based on the lookback period. The lookback period is set with the `swingLookback` parameter, default to 20 bars. Long signals are triggered when the price breaks above the swing high, and short signals are triggered when the price breaks below the swing low.

Specifically, a long signal is triggered when the close price is greater than or equal to the swing high price. A short signal is triggered when the close price is less than or equal to the swing low price. 

The strategy also sets a stop target based on the `stopTargetPercent` parameter to define the stop loss level. For example, the long stop loss can be set at 5% below the swing high, and the short stop loss can be set at 5% above the swing low.

The advantage of this strategy is the flexibility to adjust the lookback period to control the trade frequency. A shorter lookback period makes it more sensitive to breakouts and increases trade frequency. A longer lookback period decreases sensitivity and trade frequency but may miss opportunities. Finding the optimal lookback period is crucial for optimizing the strategy.

## Advantages

- Simple breakout logic, easy to understand and implement
- Lookback period allows optimizing parameters and controlling trade frequency  
- Easily integrates stop loss, trailing stop and other risk management 
- Highly extensible to add filters and improve profitability
- Applicable to any timeframe for intraday or swing trading

## Risks and Mitigations

- Too short lookback period may cause overtrading
- Too long lookback period may miss trading opportunities
- Stop loss too wide reduces profit potential
- Stop loss too tight may get stopped out frequently

Mitigations:

- Test different lookback periods to find optimal parameters
- Optimize stop loss level to balance profit vs. risk control
- Add trailing stop or chandelier exit to lock in profits
- Add filters to improve quality of trading signals  
- Optimize parameters through backtesting

## Enhancement Opportunities

The strategy can be enhanced in several ways:

1. Test different lookback period values to find optimal parameters.

2. Test different timeframes such as 5m, 15m, 1h to determine the best timeframe. 

3. Optimize the stop loss percentage to balance profit potential vs. risk management.

4. Add filters like volume, volatility to reduce inferior setups.

5. Integrate more risk management mechanisms like trailing stop, profit taking. 

6. Parameter optimization through walk forward analysis and machine learning.

7. Introduce AI/machine learning for auto optimization of parameters.

## Conclusion

The scalable breakout trading strategy is a robust and customizable breakout system. It is simple to use and highly adaptable by adjusting lookback and adding filters. It can easily integrate risk management for risk control. With parameter optimization and machine learning integration, the strategy can evolve over time to adapt to changing markets. Overall, it is a recommended universal breakout strategy.



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|Swing Lookback|
|v_input_float_1|5|Stop Target Percentage|
|v_input_bool_1|true|(?Backtest Time Period)Begin Backtest at Start Date|
|v_input_1|timestamp(1 Jan 2020)|Start Date|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-29 00:00:00
end: 2023-10-29 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © deperp

//@version=5
// strategy("Range Breaker", overlay=true, initial_capital=100000, default_qty_type=strategy.percent_of_equity, default_qty_value=10, commission_type=strategy.commission.percent, commission_value=0.07, pyramiding=0)

// Backtest Time Period

useDateFilter = input.bool(true, title="Begin Backtest at Start Date",
     group="Backtest Time Period")
backtestStartDate = input(timestamp("1 Jan 2020"), 
     title="Start Date", group="Backtest Time Period",
     tooltip="This start date is in the time zone of the exchange " + 
     "where the chart's instrument trades. It doesn't use the time " + 
     "zone of the chart or of your computer.")

inTradeWindow = true

swingLookback = input.int(20, title="Swing Lookback", minval=3)
stopTargetPercent = input.float(5, title="Stop Target Percentage", step=0.1)

// Calculate lockback swings
swings(len) =>
    var highIndex = bar_index
    var lowIndex = bar_index
    var swingHigh = float(na)
    var swingLow = float(na)
    
    upper = ta.highest(len)
    lower = ta.lowest(len)
    
    if high[len] > upper
        highIndex := bar_index[len]
        swingHigh := high[len]

    if low[len] < lower
        lowIndex := bar_index[len]
        swingLow := low[len]

    [swingHigh, swingLow, highIndex, lowIndex]


// Strategy logic
[swingHigh, swingLow, highIndex, lowIndex] = swings(swingLookback)
longCondition = inTradeWindow and (ta.crossover(close, swingHigh))
shortCondition = inTradeWindow and (ta.crossunder(close, swingLow))

if longCondition
    strategy.entry("Long", strategy.long)
if shortCondition
    strategy.entry("Short", strategy.short)

longStopTarget = close * (1 + stopTargetPercent / 100)
shortStopTarget = close * (1 - stopTargetPercent / 100)

strategy.exit("Long Stop Target", "Long", limit=longStopTarget)
strategy.exit("Short Stop Target", "Short", limit=shortStopTarget)

// Plot break lines
// line.new(x1=highIndex, y1=swingHigh, x2=bar_index, y2=swingHigh, color=color.rgb(255, 82, 82, 48), width=3, xloc=xloc.bar_index, extend=extend.right)
// line.new(x1=lowIndex, y1=swingLow, x2=bar_index, y2=swingLow, color=color.rgb(76, 175, 79, 47), width=3, xloc=xloc.bar_index, extend=extend.right)


// Alert conditions for entry and exit
longEntryCondition = inTradeWindow and (ta.crossover(close, swingHigh))
shortEntryCondition = inTradeWindow and (ta.crossunder(close, swingLow))

longExitCondition = close >= longStopTarget
shortExitCondition = close <= shortStopTarget

alertcondition(longEntryCondition, title="Long Entry Alert", message="Enter Long Position")
alertcondition(shortEntryCondition, title="Short Entry Alert", message="Enter Short Position")
alertcondition(longExitCondition, title="Long Exit Alert", message="Exit Long Position")
alertcondition(shortExitCondition, title="Short Exit Alert", message="Exit Short Position")
```

> Detail

https://www.fmz.com/strategy/430598

> Last Modified

2023-10-30 17:25:17
