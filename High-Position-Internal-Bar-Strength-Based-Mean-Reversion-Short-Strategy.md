
> Name

High-Position-Internal-Bar-Strength-Based-Mean-Reversion-Short-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8f65610cf386290b8ea.png)
![IMG](https://www.fmz.com/upload/asset/2d8130ad74644d7c3d453.png)

#### Overview
This is a short-only mean reversion strategy based on the Internal Bar Strength (IBS) indicator, which identifies trading opportunities by monitoring the closing price's position within the daily price range. The strategy initiates short positions when the IBS indicates overbought conditions and exits when IBS reaches oversold levels. It is specifically designed for daily timeframe trading in stocks and ETF markets.

#### Strategy Principle
The core of the strategy lies in using the IBS indicator to measure where the closing price falls within the day's high-low range. IBS is calculated as: (Close - Low)/(High - Low). When IBS is greater than or equal to 0.9, it indicates the closing price is near the day's high, suggesting overbought conditions; when IBS is less than or equal to 0.3, it indicates the closing price is near the day's low, suggesting oversold conditions. The strategy enters a short position when all of the following conditions are met:
1. IBS value reaches or exceeds the upper threshold (default 0.9)
2. Closing price is higher than the previous bar's high
3. Current time is within the specified trading window
The strategy closes all positions when the IBS value drops below the lower threshold (default 0.3).

#### Strategy Advantages
1. Clear and simple logic with few parameters, easy to understand and implement
2. Effectively captures price reversion opportunities after overbought conditions
3. Time window restrictions help avoid trading during unfavorable periods
4. Entry conditions include previous day's high breakout confirmation, improving signal reliability
5. Percentage-based position management allows for flexible risk control

#### Strategy Risks
1. May face continuous losses in strong trending markets
2. Using IBS indicator alone might generate false signals
3. Lack of stop-loss mechanism could lead to significant losses in extreme market conditions
4. Strategy relies on the stability of intraday price ranges
5. Trading frequency might be high, resulting in substantial transaction costs

#### Strategy Optimization Directions
1. Incorporate trend filters to avoid counter-trend trading in strong trends
2. Add volume or volatility filters to improve signal quality
3. Design dynamic IBS thresholds that adapt to different market conditions
4. Implement stop-loss mechanisms to control single-trade risk
5. Optimize position management system to adjust holdings based on market volatility
6. Consider multi-timeframe analysis to enhance signal reliability

#### Summary
This is a short-only mean reversion strategy that uses the IBS indicator to capture price pullback opportunities after overbought conditions. While the strategy design is concise and operations are clear, it requires optimization based on specific trading instruments and market conditions. It is recommended to thoroughly test different parameter combinations and incorporate other technical indicators to improve strategy stability before live trading. Additionally, risk control must be emphasized, especially when applying the strategy in strong trending markets.
> Source (PineScript)

``` pinescript
/*backtest
start: 2024-06-01 00:00:00
end: 2025-02-18 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Botnet101

//@version=6
strategy('[SHORT ONLY] Internal Bar Strength (IBS) Mean Reversion Strategy', overlay = false, default_qty_value = 100, default_qty_type = strategy.percent_of_equity, margin_long = 5, margin_short = 5, process_orders_on_close = true, precision = 4)

//#region INPUTS SECTION
// ============================================


//#region IBS Thresholds
upperThresholdInput = input.float(defval = 0.9, title = 'Upper Threshold', step = 0.1, maxval=1, group = 'IBS Settings')
lowerThresholdInput = input.float(defval = 0.3, title = 'Lower Threshold', step = 0.1, minval=0, group = 'IBS Settings')
//#endregion
//#endregion

//#region IBS CALCULATION
// ============================================
// IBS Value Calculation
// ============================================
internalBarStrength  = (close - low) / (high - low)
//#endregion

//#region TRADING CONDITIONS
// ============================================
// Entry/Exit Logic
// ============================================
shortCondition = internalBarStrength  >= upperThresholdInput and close>high[1] 
exitCondition = internalBarStrength  <= lowerThresholdInput
//#endregion

//#region STRATEGY EXECUTION
// ============================================
// Order Management
// ============================================
if shortCondition
    strategy.entry('short', strategy.short)
if exitCondition
    strategy.close_all()
//#endregion

//#region PLOTTING
// ============================================
// Visual Components
// ============================================
plot(internalBarStrength, color = color.white, title = "IBS Value")
plot(upperThresholdInput, color = color.yellow, title = "Upper Threshold")
plot(lowerThresholdInput, color = color.yellow, title = "Lower Threshold")
//#endregion
```

> Detail

https://www.fmz.com/strategy/482784

> Last Modified

2025-02-20 15:00:16
