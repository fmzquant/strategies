
> Name

Multi-Condition-Trend-Following-Quantitative-Trading-Strategy-Based-on-Fibonacci-Retracement-Levels

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14bd894de203c39644b.png)

#### Overview
This strategy is a trend following system based on Fibonacci retracement levels. It calculates key Fibonacci retracement levels using the previous day's high and low prices, combines multiple entry conditions based on opening price position and time windows, and sets corresponding stop-loss levels for different conditions to capture trends and control risks.

#### Strategy Principle
The strategy first calculates six key Fibonacci retracement levels (0, 23.6%, 38.2%, 50%, 61.8%, and 100%). Based on the opening price's position relative to these levels, entry conditions are divided into three scenarios: 1) opening price between 23.6%-50%; 2) opening price at 61.8% within specified time window (9:15-9:30); 3) opening price below 23.6% and previous day's low. Different stop-loss levels are set for these three scenarios: 61.8% retracement level, midpoint between 61.8%-100% retracement, and 38.2% retracement level, forming a complete trading system.

#### Strategy Advantages
1. Utilizes Fibonacci retracement levels as key support and resistance levels, which have strong significance in markets.
2. Combines multiple conditions including time windows and price positions, improving strategy accuracy.
3. Sets corresponding stop-loss levels for different scenarios, demonstrating flexibility in risk management.
4. Clear strategy logic with adjustable parameters, convenient for optimization based on different market conditions.

#### Strategy Risks
1. Effectiveness of Fibonacci retracement levels may decrease under certain market conditions.
2. Fixed time window settings might miss good opportunities in other time periods.
3. Stop-loss levels might be easily triggered during violent market fluctuations.
4. Strategy doesn't consider overall market trends, may trade frequently in ranging or oscillating markets.

#### Strategy Optimization Directions
1. Introduce trend indicators (like moving averages) to execute trades only in clear trends.
2. Add volatility indicators (like ATR) to dynamically adjust stop-loss positions.
3. Incorporate volume analysis to improve reliability of price breakouts.
4. Optimize time window settings by analyzing historical data for best trading periods.
5. Add profit targets to implement a more complete profit-taking mechanism.

#### Summary
The strategy builds a relatively complete trading system by combining Fibonacci retracement levels, time windows, and multiple condition judgments. Its advantages lie in clear logic and controllable risks, but it still needs optimization and improvement based on market conditions. Strategy stability and profitability can be further enhanced through optimizations in trend judgment, dynamic stop-loss, and volume analysis.
> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-19 00:00:00
end: 2024-12-18 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("Fibonacci Retracement Strategy", overlay=true)

// Get the high and low of the previous day
previousHigh = request.security(syminfo.tickerid, "D", high[1])
previousLow = request.security(syminfo.tickerid, "D", low[1])

// Fibonacci levels for the previous day (from high to low)
fib0 = previousHigh
fib236 = previousHigh - (previousHigh - previousLow) * 0.236
fib382 = previousHigh - (previousHigh - previousLow) * 0.382
fib50 = previousHigh - (previousHigh - previousLow) * 0.5
fib618 = previousHigh - (previousHigh - previousLow) * 0.618
fib1 = previousHigh - (previousHigh - previousLow) * 1

// Current open price (for the current day)
openPrice = open

// Time for 9:15 AM check
timeStart = timestamp(year, month, dayofmonth, 9, 15)
timeClose = timestamp(year, month, dayofmonth, 9, 30) // Time window to allow for opening range

// Entry Conditions
buyCondition1 = openPrice >= fib236 and openPrice <= fib50
buyCondition2 = openPrice == fib618 and time >= timeStart and time <= timeClose
buyCondition3 = openPrice < fib236 and openPrice < previousLow

// Stop Loss based on conditions
stopLoss1 = fib618
stopLoss2 = fib618 - (fib618 - fib1) / 2
stopLoss3 = fib382

// Plot Fibonacci levels with calculated values
plot(fib0, color=color.green, linewidth=1, title="Fib 0")
plot(fib236, color=color.red, linewidth=1, title="Fib 0.236")
plot(fib382, color=color.blue, linewidth=1, title="Fib 0.382")
plot(fib50, color=color.yellow, linewidth=1, title="Fib 0.5")
plot(fib618, color=color.purple, linewidth=1, title="Fib 0.618")
plot(fib1, color=color.orange, linewidth=1, title="Fib 1")

// Plot labels for Fibonacci levels with actual values
label.new(x=bar_index, y=fib0, text="Fib 0: " + str.tostring(fib0), style=label.style_label_right, color=color.green, textcolor=color.white, size=size.small, yloc=yloc.abovebar)
label.new(x=bar_index, y=fib236, text="Fib 0.236: " + str.tostring(fib236), style=label.style_label_right, color=color.red, textcolor=color.white, size=size.small, yloc=yloc.abovebar)
label.new(x=bar_index, y=fib382, text="Fib 0.382: " + str.tostring(fib382), style=label.style_label_right, color=color.blue, textcolor=color.white, size=size.small, yloc=yloc.abovebar)
label.new(x=bar_index, y=fib50, text="Fib 0.5: " + str.tostring(fib50), style=label.style_label_right, color=color.yellow, textcolor=color.white, size=size.small, yloc=yloc.abovebar)
label.new(x=bar_index, y=fib618, text="Fib 0.618: " + str.tostring(fib618), style=label.style_label_right, color=color.purple, textcolor=color.white, size=size.small, yloc=yloc.abovebar)
label.new(x=bar_index, y=fib1, text="Fib 1: " + str.tostring(fib1), style=label.style_label_right, color=color.orange, textcolor=color.white, size=size.small, yloc=yloc.abovebar)

// Entry conditions and strategy execution
if (buyCondition1)
    strategy.entry("Buy", strategy.long, stop=stopLoss1)
    label.new(bar_index, low, "BUY", color=color.green, textcolor=color.white, style=label.style_label_up, size=size.small)

if (buyCondition2)
    strategy.entry("Buy", strategy.long, stop=stopLoss2)
    label.new(bar_index, low, "BUY", color=color.green, textcolor=color.white, style=label.style_label_up, size=size.small)

if (buyCondition3)
    strategy.entry("Buy", strategy.long, stop=stopLoss3)
    label.new(bar_index, low, "BUY", color=color.green, textcolor=color.white, style=label.style_label_up, size=size.small)

// Show exit signals and labels
if (buyCondition1)
    strategy.exit("Exit", from_entry="Buy", stop=stopLoss1)
    label.new(bar_index, high, "EXIT", color=color.red, textcolor=color.white, style=label.style_label_down, size=size.small)

if (buyCondition2)
    strategy.exit("Exit", from_entry="Buy", stop=stopLoss2)
    label.new(bar_index, high, "EXIT", color=color.red, textcolor=color.white, style=label.style_label_down, size=size.small)

if (buyCondition3)
    strategy.exit("Exit", from_entry="Buy", stop=stopLoss3)
    label.new(bar_index, high, "EXIT", color=color.red, textcolor=color.white, style=label.style_label_down, size=size.small)
```

> Detail

https://www.fmz.com/strategy/475620

> Last Modified

2024-12-20 15:55:57
