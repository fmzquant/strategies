
> Name

Multi-SMA-Support-Level-False-Breakout-Strategy-with-ATR-Stop-Loss-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8530a1695a136dc72d.png)

#### Overview
This strategy is a trading system based on moving average trend determination and support level false breakout patterns. The strategy uses 50-period and 200-period simple moving averages to determine market trends, combines support level false breakout patterns to generate trading signals, and uses the ATR (Average True Range) indicator to dynamically set stop-loss positions while setting profit targets at breakout points. This strategy fully utilizes market trend characteristics and price movement patterns to capture opportunities for profit through rebounds after false breakouts.

#### Strategy Principles
The core logic of the strategy includes the following key elements:
1. Trend Determination: Uses the relative position of 50-period and 200-period moving averages to determine market trends, confirming an uptrend when the short-term moving average is above the long-term moving average.
2. Support Level Calculation: Calculates support levels using pivot point formula, utilizing weighted averages of the previous period's high, low, and closing prices.
3. False Breakout Confirmation: Generates long signals when price briefly breaks below support during an uptrend and then closes above it.
4. Risk Management: Uses 14-period ATR to calculate dynamic stop-loss positions, ensuring wider stops during increased market volatility.
5. Profit Targets: Calculates profit targets using the highest price of the previous 10 periods to ensure adequate profit potential.

#### Strategy Advantages
1. Trend Following: The strategy ensures trading in the direction of the main trend through the moving average system, improving win rates.
2. Dynamic Risk Control: Uses ATR to dynamically adjust stop-loss positions, adapting to different market environments.
3. Clear Trading Signals: Support level false breakout patterns have clear identification criteria, reducing subjective judgment.
4. Reasonable Risk-Reward Ratio: Ensures good risk-reward ratios through dynamic stop-losses and historically-based profit targets.
5. Systematic Operation: Clear strategy logic, easy to implement programmatically and backtest.

#### Strategy Risks
1. False Signal Risk: May generate numerous false breakout signals in ranging markets, increasing trading costs.
2. Trend Reversal Risk: Moving average systems react slowly at trend reversal points, potentially causing delayed entries.
3. Stop-Loss Range Risk: ATR stops may result in larger losses when volatility suddenly increases.
4. Profit Target Setting Risk: Fixed-period historical highs may not accurately reflect current market conditions.

#### Strategy Optimization Directions
1. Add Filtering Conditions: Can add volume confirmation indicators to improve signal reliability.
2. Optimize Moving Average Parameters: Adjust moving average periods based on different market characteristics to improve trend determination accuracy.
3. Improve Stop-Loss Methods: Can implement composite stop-losses combining support levels to improve stop-loss effectiveness.
4. Dynamic Profit Targets: Introduce dynamic profit target calculation methods to better adapt to market changes.
5. Add Time Filters: Include trading time window screening to avoid trading during unfavorable periods.

#### Summary
The Multi-SMA Support Level False Breakout Strategy is a complete trading system combining trend following and price patterns. Through trend determination using moving average systems and support level false breakout pattern recognition, coupled with ATR dynamic stop-losses, it constructs a risk-controllable trading strategy. The core advantages of this strategy lie in its systematic operation process and clear risk management methods. Through continuous optimization and improvement, the strategy can better adapt to different market environments and improve trading results. In live trading applications, investors are advised to adjust strategy parameters based on their risk tolerance and market characteristics.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-26 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("False Break Trading Strategy", overlay=true)

// Define inputs for strategy parameters
sma50Length = input.int(50, title="SMA 50 Length")
sma200Length = input.int(200, title="SMA 200 Length")
atrLength = input.int(14, title="ATR Length")
lookbackPeriod = input.int(10, title="Swing High Lookback Period")

// Calculate SMAs
sma50 = ta.sma(close, sma50Length)
sma200 = ta.sma(close, sma200Length)

// Calculate ATR
atr = ta.atr(atrLength)

// Check if we are in an uptrend
isUptrend = sma50 > sma200

// Calculate Pivot, Support, and Target Profit (Swing High)
pivot = (high[1] + low[1] + close[1]) / 3
support = (2 * pivot) - high[1]
swingHigh = ta.highest(high, lookbackPeriod)

// Create signals for entry
var float entryPrice = na
var float stopLoss = na
var float targetProfit = na
longCondition = isUptrend and low[1] < support and close > support

if (longCondition)
    entryPrice := open
    stopLoss := low - atr
    targetProfit := swingHigh

// Plot signals and lines on chart
plotshape(longCondition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")

// Plot levels for entry, stop loss, and target
plot(entryPrice, title="Entry Price", color=color.blue, linewidth=2, style=plot.style_linebr)
plot(stopLoss, title="Stop Loss", color=color.red, linewidth=2, style=plot.style_linebr)
plot(targetProfit, title="Target Profit", color=color.green, linewidth=2, style=plot.style_linebr)

// Backtest: Simulate exit points for the strategy
if (longCondition)
    strategy.entry("Long", strategy.long)
    if (na(stopLoss) == false and na(targetProfit) == false)
        strategy.exit("Take Profit/Stop Loss", "Long", stop=stopLoss, limit=targetProfit)

```

> Detail

https://www.fmz.com/strategy/473148

> Last Modified

2024-11-27 16:17:17
