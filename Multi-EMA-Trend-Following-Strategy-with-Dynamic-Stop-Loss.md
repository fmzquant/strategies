
> Name

Multi-EMA-Trend-Following-Strategy-with-Dynamic-Stop-Loss

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15162e53230a9c7f8c7.png)


#### Overview
This strategy is a trend following trading system based on multiple Exponential Moving Averages (EMA) and Relative Strength Index (RSI). It combines daily EMA(20,30,200) crossover signals, RSI momentum confirmation, and dynamic stop-loss mechanism to capture medium to long-term trend opportunities.

#### Strategy Principles
The core logic includes the following key components:
1. Entry Signal: A long position is triggered when the 20-day EMA crosses above the 30-day EMA, price is above the 200-day EMA, and RSI is above 50.
2. Take Profit: A fixed 50% take profit level is set upon entry.
3. Dynamic Stop Loss: A 25% trailing stop that moves up as price makes new highs.
4. Exit Mechanism: Positions are automatically closed when price hits either the take profit or trailing stop levels.

#### Strategy Advantages
1. Multiple Timeframe Validation: Daily EMAs filter out short-term noise and enhance trading stability.
2. Dynamic Risk Management: Trailing stop mechanism effectively locks in profits and prevents large drawdowns.
3. Comprehensive Trend Confirmation: Combination of RSI and EMA system better confirms trend validity.
4. Clear Execution Logic: Entry and exit conditions are well-defined and easy to understand.

#### Strategy Risks
1. Choppy Market Risk: Frequent stop-outs may occur in range-bound markets.
2. Slippage Impact: Dynamic stops and take profit levels may face significant slippage in volatile markets.
3. False Breakout Risk: EMA crossover signals may generate false breakouts.
4. Parameter Sensitivity: Stop loss and take profit percentages significantly impact strategy performance.

#### Optimization Directions
1. Market Environment Filter: Add volatility indicators (like ATR) to assess market conditions and reduce position size or pause trading in choppy markets.
2. Dynamic Take Profit: Consider adjusting take profit levels based on market volatility.
3. Entry Signal Enhancement: Incorporate volume indicators to complement EMA crossover signals for improved reliability.
4. Position Management Improvement: Implement dynamic position sizing based on market risk levels.

#### Summary
This strategy builds a complete trend following trading system through the synergy of multiple technical indicators. Its main features are the combination of medium to long-term trend identification and dynamic risk control, suitable for trending market environments. Through continuous optimization and refinement, the strategy shows promise for improved performance in real trading conditions.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-10 00:00:00
end: 2025-02-09 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Talbuaia Signal", overlay=true)

// Request EMAs on the daily timeframe
ema20_daily = request.security(syminfo.tickerid, "D", ta.ema(close, 20), lookahead=barmerge.lookahead_on)
ema30_daily = request.security(syminfo.tickerid, "D", ta.ema(close, 30), lookahead=barmerge.lookahead_on)
ema200_daily = request.security(syminfo.tickerid, "D", ta.ema(close, 200), lookahead=barmerge.lookahead_on)

// RSI Calculation
rsi = ta.rsi(close, 14)

// Plot daily EMAs
plot(ema20_daily, color=color.blue, title="Daily EMA 20")
plot(ema30_daily, color=color.orange, title="Daily EMA 30")
plot(ema200_daily, color=color.red, title="Daily EMA 200")

// Plot RSI
hline(50, "RSI Midline", color=color.gray)
plot(rsi, color=color.purple, title="RSI")

// Entry condition: 20 EMA crosses above 30 EMA, price is above 200 EMA, and RSI > 50
bullishEntry = ta.crossover(ema20_daily, ema30_daily) and close > ema200_daily and rsi > 50

// Variables to track entry price, take profit, and trailing stop
var float entryPriceLong = na
var float highestPriceSinceEntry = na
var float takeProfitLevel = na
var float trailingStopLevel = na

// Entry Logic
if bullishEntry
    strategy.entry("Long", strategy.long)
    entryPriceLong := close
    highestPriceSinceEntry := close  // Initialize the highest price since entry
    takeProfitLevel := entryPriceLong * 1.50  // Set take profit at 50% above entry price
    trailingStopLevel := na  // Reset trailing stop
    label.new(bar_index, close, "BUY", style=label.style_label_up, color=color.green, textcolor=color.white)

// Update highest price and trailing stop dynamically
if strategy.position_size > 0
    highestPriceSinceEntry := math.max(highestPriceSinceEntry, close)  // Track the highest price reached
    trailingStopLevel := highestPriceSinceEntry * (1 - 0.25)  // Set trailing stop at 25% below the highest price

// Exit Logic: Take profit or trailing stop
if strategy.position_size > 0 and (close >= takeProfitLevel or close <= trailingStopLevel)
    strategy.close("Long")
    label.new(bar_index, close, "EXIT LONG", style=label.style_label_down, color=color.red, textcolor=color.white)

// Plot trailing stop and take profit levels on the chart
plot(trailingStopLevel, "Trailing Stop", color=color.red, linewidth=2, style=plot.style_line)
plot(takeProfitLevel, "Take Profit", color=color.green, linewidth=2, style=plot.style_line)

```

> Detail

https://www.fmz.com/strategy/481345

> Last Modified

2025-02-10 14:23:43
