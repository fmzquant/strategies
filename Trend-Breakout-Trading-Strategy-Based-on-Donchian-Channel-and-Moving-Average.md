
> Name

Trend-Breakout-Trading-Strategy-Based-on-Donchian-Channel-and-Moving-Average

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d92683299730184048ed.png)
![IMG](https://www.fmz.com/upload/asset/2d89697a67f4b99e26849.png)

#### Overview
This strategy is a trend following trading system that combines the Donchian Channel and 200-period Simple Moving Average (SMA). It identifies potential long and short opportunities by observing price breakouts of the Donchian Channel in conjunction with SMA trends. The strategy also incorporates a dynamic stop-loss mechanism based on the channel midline for risk control.

#### Strategy Principles
The core logic of the strategy is based on the following key elements:
1. Uses 20-period calculation for Donchian Channel's upper, lower, and middle bands
2. Incorporates 200-period SMA to determine overall trend direction
3. Entry signals:
   - Long signal triggers when price breaks above the Donchian Channel upper band and is above SMA200
   - Short signal triggers when price breaks below the Donchian Channel lower band and is below SMA200
4. Stop-loss settings:
   - Long position stop-loss is set at 45% below the channel midline
   - Short position stop-loss is set at 45% above the channel midline

#### Strategy Advantages
1. Effective trend following: Successfully captures medium to long-term trends by combining Donchian Channel breakouts with SMA200 confirmation
2. Reasonable risk control: Dynamic stop-loss mechanism based on channel midline adapts to market volatility
3. Simple parameter settings: Only requires two main parameters - channel period and moving average period, reducing over-optimization risk
4. Clear strategy logic: Entry and exit conditions are well-defined, easy to understand and execute
5. High adaptability: Applicable to different trading instruments and timeframes

#### Strategy Risks
1. Sideways market risk: May generate frequent false breakout signals in ranging markets, leading to consecutive stops
2. Slippage risk: Actual execution prices may significantly differ from signal prices in fast-moving markets
3. Trend reversal risk: Potential for large drawdowns during major trend shifts
4. Parameter sensitivity: Strategy performance significantly affected by channel and moving average period selection

Risk control suggestions:
- Recommend cross-validation with other technical indicators
- Consider adding trend strength filters
- Implement dynamic position sizing
- Regular parameter review and optimization

#### Strategy Optimization Directions
1. Signal optimization:
   - Add volume confirmation mechanism
   - Introduce trend strength indicators
   - Consider price pattern analysis

2. Stop-loss optimization:
   - Research optimal stop-loss percentage
   - Add trailing stop mechanism
   - Consider volatility-adaptive stops

3. Position management optimization:
   - Implement volatility-based dynamic position sizing
   - Add scaled entry and exit mechanisms

4. Timing optimization:
   - Add market environment recognition
   - Optimize trading time filters

#### Summary
This strategy combines the classic Donchian Channel and moving average indicators to create a trend following system with clear logic and controllable risk. Its main advantages lie in clear signals and reasonable risk control, though performance may be suboptimal in ranging markets. The strategy has significant optimization potential through adding volume confirmation, improving stop-loss mechanisms, and introducing dynamic position management. Traders are advised to maintain strict risk control in live trading and optimize the strategy based on specific trading instruments and market conditions.

> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-21 00:00:00
end: 2024-03-18 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"SOL_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ardhankurniawan

//@version=5
strategy("Donchian Channel Strategy with SMA 200 and Custom SL", overlay=true)

// Parameters
length = 20
smaLength = 200  // Changed SMA to 200

// Calculate Donchian Channel
upper = ta.highest(high, length)
lower = ta.lowest(low, length)
mid = (upper + lower) / 2  // Mid Line

// Calculate SMA 200
sma200 = ta.sma(close, smaLength)

// Plot Donchian Channel, SMA 200, and Mid Line
plot(upper, color=color.green, linewidth=2, title="Upper Line")
plot(lower, color=color.red, linewidth=2, title="Lower Line")
plot(mid, color=color.orange, linewidth=1, title="Mid Line")
plot(sma200, color=color.blue, linewidth=2, title="SMA 200")

// Long and Short logic based on SMA 200
longCondition = upper > ta.highest(upper[1], length) and close > sma200
shortCondition = lower < ta.lowest(lower[1], length) and close < sma200

// Calculate Stop Loss for Long and Short based on new conditions
longSL = mid - 0.45 * (mid - lower)  // SL for Long when price crosses down mid line
shortSL = mid + 0.45 * (upper - mid) // SL for Short when price crosses up mid line

// Enter Long or Short position
if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

// Place Stop Loss
strategy.exit("Exit Long", from_entry="Long", stop=longSL)
strategy.exit("Exit Short", from_entry="Short", stop=shortSL)

```

> Detail

https://www.fmz.com/strategy/483061

> Last Modified

2025-02-27 17:07:14
