
> Name

Historical-High-Breakthrough-with-Monthly-Moving-Average-Filter-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16fa6f3711ab74299a1.png)


#### Overview
This strategy is a trend following system based on historical high breakthrough and monthly moving average filter. It generates buy signals by monitoring price breakouts above previous historical highs, while using the 8-period Simple Moving Average (8 SMA) on monthly timeframe as a sell filter to reduce false breakout risks. The strategy design aligns with the market characteristic of "trend continuation" and is particularly suitable for capturing major trends in strong upward markets.

#### Strategy Principles
The core logic consists of two key components:
1. Buy Signal: Generated when the latest closing price breaks above the previous historical high (excluding the current bar's high). This condition ensures entry only in clear upward trends.
2. Sell Signal: Triggered when the monthly closing price falls below the 8-period Simple Moving Average. This condition helps with timely stop-loss and prevents larger losses from trend reversals.
The strategy also includes a signal state tracking mechanism to avoid repeated signals in the same state, improving strategy stability.

#### Strategy Advantages
1. Strong Trend Capture: Effectively captures strong upward trends through historical high breakout detection.
2. Robust Risk Control: Incorporates monthly moving average as a filter to effectively screen out false breakouts.
3. High Signal Stability: Uses lastSignal variable to track signal states, preventing signal repetition.
4. Good Visualization: Provides clear graphical interface including historical high lines, moving averages, and buy/sell markers.
5. High Adaptability: Can be applied to different timeframes and instruments.

#### Strategy Risks
1. Lag Risk: Historical high breakout signals are inherently somewhat lagging, potentially missing optimal entry points.
2. False Breakout Risk: Despite monthly moving average filtering, false breakouts may still occur in ranging markets.
3. Drawdown Risk: Strategy may experience significant drawdowns at trend reversal points.
4. Position Management Risk: Strategy lacks position sizing mechanisms, requiring additional money management rules.

#### Strategy Optimization Directions
1. Volume Confirmation: Add volume indicators as breakout confirmation conditions to improve signal reliability.
2. Enhanced Stop-Loss: Design more flexible stop-loss rules, such as trailing stops or volatility-based stops.
3. Position Management: Dynamically adjust position sizes based on market volatility and trend strength.
4. Signal Filtering: Add trend strength indicators like ADX to further filter weak signals.
5. Time Filtering: Add time period filters to avoid trading during unsuitable time periods.

#### Summary
This is a well-designed trend following strategy with clear logic. Through the combination of historical high breakouts and monthly moving averages, it achieves both effective trend capture and reasonable risk control. While there are inherent risks of lag and false breakouts, the suggested optimization directions offer potential for further performance improvement. The strategy is particularly suitable for markets with clear trends and can serve as an important reference tool for medium to long-term investment.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-11 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Buy Signal on Close Greater Than Previous All-Time High Strategy", overlay=true)

// Initialize the previous all-time high
var float prevAllTimeHigh = na

// Update the all-time high, excluding the current bar's high (use previous bar's high)
if (na(prevAllTimeHigh) or high[1] > prevAllTimeHigh)
    prevAllTimeHigh := high[1]

// Monthly closing price and 8 SMA on monthly time frame
monthlyClose = request.security(syminfo.tickerid, "M", close)
monthlySMA = ta.sma(monthlyClose, 8)

// Variables to track the last signal type
var int lastSignal = 0 // 0 = None, 1 = Buy, 2 = Sell

// Debugging output to check the all-time high and conditions
plot(prevAllTimeHigh, color=color.blue, linewidth=1, title="Previous All-Time High")
plot(monthlySMA, color=color.green, linewidth=1, title="8 SMA (Monthly)")

// Buy signal: when the latest close is greater than the previous all-time high
buySignal = close > prevAllTimeHigh and lastSignal != 1

// Sell signal: when the monthly close is below the 8 SMA
sellSignal = monthlyClose < monthlySMA and lastSignal != 2

// Update the last signal type after triggering a signal
if (buySignal)
    lastSignal := 1
if (sellSignal)
    lastSignal := 2

// Execute the strategy orders
if (buySignal)
    strategy.entry("Buy", strategy.long)

if (sellSignal)
    strategy.close("Buy")

// Optional: Plot buy and sell signals on the chart for visual reference
plotshape(series=buySignal, style=shape.labelup, location=location.belowbar, color=color.green, text="BUY", size=size.small)
plotshape(series=sellSignal, style=shape.labeldown, location=location.abovebar, color=color.red, text="SELL", size=size.small)

```

> Detail

https://www.fmz.com/strategy/474955

> Last Modified

2024-12-13 10:25:18
