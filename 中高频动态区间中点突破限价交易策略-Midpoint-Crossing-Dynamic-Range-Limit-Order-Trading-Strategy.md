
> Name

中高频动态区间中点突破限价交易策略-Midpoint-Crossing-Dynamic-Range-Limit-Order-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8fcc61ea5666373b580.png)
![IMG](https://www.fmz.com/upload/asset/2d952b61c05b9814a7be6.png)





#### Overview

This strategy is a high-precision trading method based on the market's dynamic range midpoint, capturing price fluctuation characteristics within a specific time range to achieve precise entry and exit timing. The core of the strategy is to use a configurable lookback period to dynamically calculate the price range's high, low, and midpoint, and execute limit orders during New York Stock Exchange trading hours.

#### Strategy Principles

The strategy principles are based on the following key mechanisms:
1. Dynamic Range Calculation: Real-time calculation of price highs, lows, and midpoints by setting an adjustable lookback period (default 30 candles).
2. Time-Constrained Trading: Strictly limited to New York Stock Exchange trading hours (9:30 AM to 3:00 PM).
3. Midpoint Breakthrough Signals: Generate long or short signals when closing prices cross the range midpoint.
4. Limit Order Strategy: Place orders at the range midpoint with take profit and stop loss set at range high and low points.

#### Strategy Advantages

1. High-Precision Entry: Provide more accurate entry timing through dynamic midpoint calculation.
2. Controllable Risk: Strict take profit and stop loss mechanisms effectively control single trade risk.
3. Time Selectivity: Trade only during active exchange hours, avoiding low liquidity periods.
4. Flexible Parameters: Adjustable lookback period adapts to different market environments.
5. Overnight Risk Avoidance: Automatic position closure before trading day end.

#### Strategy Risks

1. Range Calculation Limitations: Fixed lookback periods may not accurately reflect real-time market conditions during volatile markets.
2. Trading Frequency Risks: Frequent trading may increase transaction costs and slippage risks.
3. Parameter Sensitivity: Lookback period and trading hours significantly impact strategy performance.
4. Market Adaptability: Strategy may not apply to all instruments and market environments.

#### Strategy Optimization Directions

1. Dynamic Lookback Period: Introduce adaptive algorithms to dynamically adjust lookback periods based on market volatility.
2. Multi-Timeframe Verification: Combine signals from different timeframes to improve signal accuracy.
3. Volatility Filtering: Add volatility indicators to filter low-quality trading signals.
4. Machine Learning Optimization: Use machine learning algorithms to dynamically adjust entry and exit parameters.
5. Enhanced Risk Management: Introduce more complex position management and dynamic stop-loss mechanisms.

#### Summary

This strategy provides traders with a systematic, rule-clear trading method through precise range midpoint breakthrough and limit order trading mechanisms. Its core advantages lie in high-precision entry, risk control, and time selectivity. Future optimization will focus on improving the strategy's adaptability and stability.

#### Key Technical Indicators

- Lookback Period
- Range High
- Range Low
- Range Midpoint
- NYSE Trading Hours

#### Trading Logic Summary

Capture short-term price trends and reversal opportunities by dynamically calculating price ranges and executing limit trades near the midpoint within a strict time and risk management framework.

#### Risk Disclaimer

This strategy is for reference only. Actual trading requires adjustment based on individual risk tolerance and market environment.

#### Recommended Application Scenarios

Suitable for medium and short-term investors seeking stable, systematic trading strategies, especially those focusing on index futures and high-liquidity instruments.

#### Conclusion

The core of quantitative trading is continuous optimization and adaptation. This strategy provides traders with a trading framework worth in-depth research and improvement.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-31 00:00:00
end: 2025-03-29 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("Midpoint Crossing Strategy", overlay=true)

// Input for lookback period
lookback = input.int(30, title="Lookback Period", minval=1)

// Input for NYSE trading hours
startHour = 9
startMinute = 30
endHour = 15
endMinute = 0

// Variables to store high, low, and midpoint of the lookback period
var float rangeHigh = na
var float rangeLow = na
var float rangeMid = na

// Calculate high, low, and midpoint based on lookback period
if (bar_index >= lookback)
    rangeHigh := ta.highest(high, lookback)
    rangeLow := ta.lowest(low, lookback)
    rangeMid := (rangeHigh + rangeLow) / 2

// Plot high, low, and midpoint for reference
plot(rangeHigh, color=color.red, title="Range High")
plot(rangeLow, color=color.green, title="Range Low")
plot(rangeMid, color=color.blue, title="Range Mid")

// Time condition for NYSE hours
currentTime = timestamp("GMT-5", year, month, dayofmonth, hour, minute)
startTime = timestamp("GMT-5", year, month, dayofmonth, startHour, startMinute)
endTime = timestamp("GMT-5", year, month, dayofmonth, endHour, endMinute)

// Check if the current time is within NYSE hours
isNYSEHours = currentTime >= startTime and currentTime <= endTime

// Entry conditions (only during NYSE hours)
longCondition = ta.crossover(close, rangeMid) and isNYSEHours
shortCondition = ta.crossunder(close, rangeMid) and isNYSEHours

// Define stop loss and take profit levels based on the range
longStopLoss = rangeLow
longTakeProfit = rangeHigh
shortStopLoss = rangeHigh
shortTakeProfit = rangeLow

// Place limit order at mid-price
if (longCondition and not strategy.opentrades)
    strategy.order("Long Limit", strategy.long, limit=rangeMid)
    strategy.exit("Take Profit", "Long Limit", limit=longTakeProfit, stop=longStopLoss)

if (shortCondition and not strategy.opentrades)
    strategy.order("Short Limit", strategy.short, limit=rangeMid)
    strategy.exit("Take Profit", "Short Limit", limit=shortTakeProfit, stop=shortStopLoss)

// Close open positions at 4:00 PM to avoid overnight risk
if (currentTime >= endTime)
    strategy.close_all(comment="Close All at 4:00 PM")

// Add a check for open positions
if (strategy.opentrades > 0)
    // Ensure no recalculation while a position is open
    rangeHigh := na
    rangeLow := na
    rangeMid := na

```

> Detail

https://www.fmz.com/strategy/488897

> Last Modified

2025-03-31 16:43:45
