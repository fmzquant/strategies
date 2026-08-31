
> Name

Dynamic-Risk-Reward-Price-Action-Breakout-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d80a0a447fe67a371d4a.png)
![IMG](https://www.fmz.com/upload/asset/2d8b16450183d04ed5997.png)



#### Overview
This strategy is a price action-based breakout trading system that achieves high-quality trades through dynamic risk-reward ratio calculation. The strategy limits daily trades to 3-5, ensuring only the highest quality trading opportunities are executed. The system uses high and low price levels to identify strong bullish and bearish breakouts, with dynamic stop-loss and profit targets maintaining a strict risk-reward ratio of no less than 1:5.

#### Strategy Principles
The core logic includes several key components:
1. Breakout Detection - Uses highest and lowest price levels within the lookback period as reference points, triggering signals when closing prices break these levels.
2. Dynamic Stop-Loss - Sets stop-loss positions based on volatility within the stopLookback period, using period lows for longs and highs for shorts.
3. Profit Targets - Calculates target prices using the risk-reward multiplier (rrMultiplier) based on the distance between entry and stop-loss prices.
4. Trade Filtering - Implements daily maximum trade limits with automatic reset through date change detection.

#### Strategy Advantages
1. Strict Risk Management - Ensures controllable risk for each trade through dynamic stops and fixed risk-reward ratios.
2. High-Quality Opportunities - Prevents overtrading by limiting daily trades, focusing on best opportunities.
3. Market Adaptability - Dynamically calculated breakout levels and stops adapt to different market conditions.
4. Clear Trading Rules - Simple and direct strategy logic without complex indicator combinations, easy to understand and execute.

#### Strategy Risks
1. False Breakout Risk - Markets may exhibit false breakouts leading to stop-outs. Consider adding volume confirmation or other filters.
2. Slippage Impact - Actual execution prices may significantly deviate from signal prices during volatile periods. Consider setting maximum slippage limits.
3. Drawdown Risk - Consecutive stops may occur during major trend reversals. Can be improved by adding trend filters.
4. Parameter Sensitivity - Strategy performance is sensitive to parameter settings. Requires thorough optimization and backtesting.

#### Optimization Directions
1. Add Volume Confirmation - Check for volume expansion during breakout signals to improve reliability.
2. Implement Trend Filtering - Use moving averages or other trend indicators to trade only in trend direction.
3. Optimize Stop-Loss Method - Consider using ATR for dynamic stop distance adjustment to increase flexibility.
4. Enhance Exit Mechanism - Add trailing stops or partial profit-taking functionality to better protect profits.

#### Summary
The strategy combines price action analysis with strict risk management to create a concise and effective trading system. By limiting daily trades and maintaining high risk-reward ratios, it helps maintain trade quality. While some potential risks exist, they can be addressed through the suggested optimization directions to further enhance strategy stability and reliability. The core advantage lies in its simple yet strict trading rules, making it suitable as a basic framework for personalized adjustments and optimization.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-21 00:00:00
end: 2025-02-18 08:00:00
period: 5d
basePeriod: 5d
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("Filtered Price Action Breakout", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// === INPUTS ===
lookback = input.int(20, title="Breakout Lookback Period", minval=5)
stopLookback = input.int(10, title="Stop Loss Lookback Period", minval=3)
rrMultiplier = input.float(5.0, title="Risk-to-Reward Multiplier", step=0.1)
maxTradesPerDay = input.int(5, title="Max Trades Per Day", minval=1)

// Ensure there are enough bars for calculations
inRange = bar_index >= lookback

// === CALCULATIONS ===
// Highest high and lowest low over the 'lookback' period
highestHigh = ta.highest(high, lookback)
lowestLow = ta.lowest(low, lookback)

// Define breakout conditions (using previous bar's level)
bullBreakout = ta.crossover(close, highestHigh[1])
bearBreakout = ta.crossunder(close, lowestLow[1])

// Store breakout signals in variables to prevent inconsistencies
bullBreakoutSignal = bullBreakout
bearBreakoutSignal = bearBreakout

// Determine stop levels based on recent swing lows/highs
longStop = ta.lowest(low, stopLookback)
shortStop = ta.highest(high, stopLookback)

// Track number of trades per day (fixing boolean condition issue)
newDay = ta.change(time("D")) != 0
todayTrades = ta.barssince(newDay)
tradeCount = 0
if newDay
    tradeCount := 0
else
    tradeCount := tradeCount + 1

// === STRATEGY LOGIC: ENTRY & EXIT ===
if bullBreakoutSignal and tradeCount < maxTradesPerDay
    entryPrice = close
    stopLevel = longStop
    risk = entryPrice - stopLevel
    if risk > 0
        target = entryPrice + rrMultiplier * risk
        strategy.entry("Long", strategy.long)
        strategy.exit("Long Exit", from_entry="Long", stop=stopLevel, limit=target)
        tradeCount := tradeCount + 1

if bearBreakoutSignal and tradeCount < maxTradesPerDay
    entryPrice = close
    stopLevel = shortStop
    risk = stopLevel - entryPrice
    if risk > 0
        target = entryPrice - rrMultiplier * risk
        strategy.entry("Short", strategy.short)
        strategy.exit("Short Exit", from_entry="Short", stop=stopLevel, limit=target)
        tradeCount := tradeCount + 1

// === PLOTTING ===
plot(highestHigh, color=color.green, title="Highest High (Breakout Level)")
plot(lowestLow, color=color.red, title="Lowest Low (Breakout Level)")

```

> Detail

https://www.fmz.com/strategy/482797

> Last Modified

2025-02-20 14:57:06
