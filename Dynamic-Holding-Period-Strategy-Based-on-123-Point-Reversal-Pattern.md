
> Name

Dynamic-Holding-Period-Strategy-Based-on-123-Point-Reversal-Pattern

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/994efb5209428c5e23.png)


#### Overview
This strategy is a quantitative trading system based on market price pattern recognition, primarily designed to capture potential market reversal opportunities by identifying 123-point reversal patterns. The strategy combines dynamic holding period management with moving average filtering, utilizing multiple condition verification to enhance trading accuracy. It employs precise mathematical models for entry point definition and uses a 200-day moving average as an auxiliary exit condition, forming a complete trading system.

#### Strategy Principles
The core logic is based on price pattern recognition, including the following key elements:
1. Entry Condition Design
- Current day's low must be lower than previous day's low
- Previous day's low must be lower than the low from three days ago
- The low from two days ago must be lower than the low from four days ago
- The high from two days ago must be lower than the high from three days ago
When all four conditions are met simultaneously, the system generates a long signal.

2. Exit Mechanism Design
- Default holding period set to 7 days
- Uses 200-day Simple Moving Average (SMA) as dynamic exit condition
- Triggers position closure when price touches or exceeds the 200-day moving average
- Automatic position closure when holding period reaches the set duration

#### Strategy Advantages
1. High Pattern Recognition Accuracy
- Multiple condition verification mechanism
- Strict entry conditions based on relative price high/low positions
- Reduced false signal probability

2. Comprehensive Risk Control
- Fixed holding period limits maximum loss
- Long-term moving average as trend filter
- Dual exit mechanism to protect profits

3. Clear Operating Rules
- Explicit entry and exit conditions
- Flexible parameters adjustable to market conditions
- Easy to implement and backtest

#### Strategy Risks
1. Pattern Recognition Limitations
- May generate false signals in choppy markets
- Reduced accuracy during periods of extreme volatility
- Requires validation with other technical indicators

2. Parameter Optimization Risks
- Fixed holding period may not suit all market environments
- Moving average period selection affects strategy performance
- Over-optimization may lead to overfitting

3. Market Adaptability Risks
- Reduced reliability of reversal signals in strong trend markets
- Performance varies across different market conditions
- Requires periodic strategy effectiveness evaluation

#### Strategy Optimization Directions
1. Entry Signal Enhancement
- Add volume confirmation mechanism
- Incorporate momentum indicators as auxiliary judgment
- Consider adding volatility filters

2. Exit Mechanism Improvement
- Implement dynamic holding period management
- Add trailing stop loss functionality
- Develop multi-level profit targets

3. Risk Control Enhancement
- Establish position management system
- Design drawdown control mechanism
- Add market sentiment indicators

#### Summary
The strategy provides traders with a reliable market reversal capture tool through strict pattern recognition and comprehensive risk control systems. While certain limitations exist, continuous optimization and appropriate parameter adjustments enable the strategy to maintain stable performance across different market environments. Traders are advised to combine market experience with strategy-specific adjustments in practical applications to achieve better trading results.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-11 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © EdgeTools

//@version=5
strategy("123 Reversal Trading Strategy", overlay=true)

// Input for number of days to hold the trade
daysToHold = input(7, title="Days to Hold Trade")

// Input for 20-day moving average
maLength = input(200, title="Moving Average Length")

// Calculate the 20-day moving average
ma20 = ta.sma(close, maLength)

// Define the conditions for the 123 reversal pattern (bullish reversal)
// Condition 1: Today's low is lower than yesterday's low
condition1 = low < low[1]

// Condition 2: Yesterday's low is lower than the low three days ago
condition2 = low[1] < low[3]

// Condition 3: The low two days ago is lower than the low four days ago
condition3 = low[2] < low[4]

// Condition 4: The high two days ago is lower than the high three days ago
condition4 = high[2] < high[3]

// Entry condition: All conditions must be true
entryCondition = condition1 and condition2 and condition3 and condition4

// Exit condition: Close the position after a certain number of bars or when the price reaches the 20-day moving average
exitCondition = ta.barssince(entryCondition) >= daysToHold or close >= ma20

// Execute buy and sell signals
if (entryCondition)
    strategy.entry("Buy", strategy.long)
if (exitCondition)
    strategy.close("Buy")


```

> Detail

https://www.fmz.com/strategy/471698

> Last Modified

2024-11-12 15:15:46
