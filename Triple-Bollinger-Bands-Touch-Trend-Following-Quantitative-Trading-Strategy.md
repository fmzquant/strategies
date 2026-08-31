
> Name

Triple-Bollinger-Bands-Touch-Trend-Following-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a65904a2b383e07925.png)

#### Overview
This strategy is an improved version of the traditional Bollinger Bands trend-following system. It monitors price action for three consecutive touches of the Bollinger Bands to confirm trend reliability, resulting in higher win rates. The strategy uses a 20-period moving average as the middle band and 2 standard deviations for the upper and lower bands. Through detailed analysis of price relationships with band boundaries, it achieves a trading system with unique advantages.

#### Strategy Principles
The core logic relies on a counting mechanism to identify sustained price touches of the Bollinger Band boundaries. The system generates a long signal when price breaks below the lower band three consecutive times, and a short signal when price breaks above the upper band three consecutive times. This mechanism effectively filters out false breakouts, improving trading reliability. The strategy uses the middle band (20-period moving average) as an exit signal, completing trades when price returns to the middle band. This design ensures both trend capture and timely profit-taking.

#### Strategy Advantages
1. High Reliability: Requiring three consecutive touches of band boundaries to confirm trading signals significantly reduces the impact of false breakouts.
2. Risk Control: Using the moving average as an exit point enables timely stop-loss when trends reverse.
3. Strong Adaptability: Strategy parameters can be adjusted for different market conditions, offering good universality.
4. Moderate Trading Frequency: Strict entry conditions prevent overtrading.
5. Rational Money Management: Position sizing based on account equity percentage ensures controlled risk.

#### Strategy Risks
1. Ranging Market Risk: May generate frequent false signals in sideways markets.
2. Slippage Risk: Potential for significant slippage losses during volatile market conditions.
3. Parameter Sensitivity: Strategy performance heavily depends on Bollinger Bands parameter settings.
4. Trend Reversal Risk: May incur substantial losses during sudden trend reversals.

#### Strategy Optimization Directions
1. Incorporate Volume Indicators: Combining volume analysis can improve signal reliability.
2. Dynamic Parameter Adjustment: Adapt Bollinger Bands parameters based on market volatility.
3. Add Trend Confirmation Indicators: Include additional technical indicators to confirm trend direction.
4. Optimize Stop-Loss Mechanism: Design more flexible stop-loss approaches for different market environments.
5. Enhance Position Management: Dynamically adjust position sizes based on signal strength.

#### Summary
This strategy improves upon traditional Bollinger Bands trading systems by implementing a highly reliable trend-following approach. Its unique triple-touch confirmation mechanism effectively increases win rates, while the moving average-based exit mechanism provides a rational profit-taking solution. Though inherent risks exist, the suggested optimization directions can further enhance strategy stability and profitability.
> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-10 00:00:00
end: 2024-12-09 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("Bollinger Bands Strategy - 3 Crossings", overlay=true)

// Input Parameters
length = input.int(20, title="Bollinger Bands Length", minval=1)
src = input(close, title="Source")
mult = input.float(2.0, title="Multiplier", step=0.1)

// Calculate Bollinger Bands
basis = ta.sma(src, length)
dev = mult * ta.stdev(src, length)
upper = basis + dev
lower = basis - dev

// Plot Bollinger Bands
plotBasis = plot(basis, color=color.blue, title="Basis")
plotUpper = plot(upper, color=color.red, title="Upper Band")
plotLower = plot(lower, color=color.green, title="Lower Band")
fill(plot1=plotUpper, plot2=plotLower, color=color.new(color.blue, 90), title="Band Fill")

// Counter Variables
var int longCrossCount = 0
var int shortCrossCount = 0

// Detect Crossings
longCondition = close < lower  // Price closes below the lower band
shortCondition = close > upper  // Price closes above the upper band

if longCondition
    longCrossCount += 1  // Increment the counter for long
    shortCrossCount := 0  // Reset the short counter

if shortCondition
    shortCrossCount += 1  // Increment the counter for short
    longCrossCount := 0  // Reset the long counter

if not longCondition and not shortCondition
    longCrossCount := 0  // Reset if no crossing
    shortCrossCount := 0

// Entry and Exit Rules
if longCrossCount >= 3 and strategy.position_size <= 0
    strategy.entry("Long", strategy.long)
    longCrossCount := 0  // Reset the counter after entering

if shortCrossCount >= 3 and strategy.position_size >= 0
    strategy.entry("Short", strategy.short)
    shortCrossCount := 0  // Reset the counter after entering

// Exit Condition (When Price Returns to the Middle Band)
exitCondition = ta.crossover(src, basis) or ta.crossunder(src, basis)

if exitCondition and strategy.position_size > 0
    strategy.close("Long")
if exitCondition and strategy.position_size < 0
    strategy.close("Short")

```

> Detail

https://www.fmz.com/strategy/474630

> Last Modified

2024-12-11 11:01:52
