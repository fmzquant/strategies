
> Name

Multi-Moving-Average-Cross-Trend-Following-RSI-Oscillation-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/202f7f27946cc2976e3.png)

#### Overview
This strategy is a trend following trading system based on multiple moving averages crossover and RSI indicator. It combines EMA20, EMA50, and SMA200 to determine market trends, uses RSI indicator to filter trading signals, and executes trades when price breaks previous highs. The strategy implements fixed take-profit and stop-loss conditions, suitable for 1-hour and daily timeframes.

#### Strategy Principles
The core logic is based on the following key conditions:
1. Trend Determination: EMA20 must be above EMA50, and SMA200 below both EMAs, confirming an uptrend.
2. Price Position: Current closing price must be within 1% range of either EMA20 or EMA50, ensuring key support levels.
3. RSI Filter: RSI value must be above the set threshold (default 40), filtering for strong markets.
4. Entry Trigger: Long position is triggered when price breaks the previous candle's high.
5. Risk Management: Sets 25% take-profit and 10% stop-loss levels for risk control.

#### Strategy Advantages
1. Multiple Confirmation Mechanism: Confirms trading signals through multiple dimensions including moving averages, RSI indicator, and price breakouts.
2. Strong Trend Following: Uses multiple moving average system to judge medium and long-term trends.
3. Comprehensive Risk Management: Sets fixed take-profit and stop-loss ratios for effective risk control.
4. Good Adaptability: Strategy parameters can be adjusted to adapt to different market conditions.
5. Clear Execution: Entry and exit conditions are well-defined and easy to implement programmatically.

#### Strategy Risks
1. Choppy Market Risk: May generate frequent false signals in sideways markets.
2. Lag Risk: Moving average system has inherent lag, potentially missing optimal entry points.
3. Stop Loss Range Risk: Fixed stop-loss percentage may not suit all market conditions.
4. Drawdown Risk: May face significant drawdowns during trend reversals.

#### Strategy Optimization Directions
1. Dynamic Parameter Optimization: Dynamically adjust moving average periods and RSI threshold based on market volatility.
2. Market Environment Recognition: Add market environment identification mechanism to use different parameter combinations.
3. Dynamic Take-Profit/Stop-Loss: Set dynamic levels based on ATR or volatility.
4. Volume Analysis Integration: Incorporate volume indicators to improve signal reliability.
5. Exit Mechanism Optimization: Design more flexible exit mechanisms to improve profit capture.

#### Summary
This strategy is a well-structured and logically sound trend following system. Through the combination of multiple technical indicators, it effectively captures market trends while maintaining comprehensive risk management. The strategy has significant room for optimization and can achieve improved stability and profitability through continuous improvement. For medium to long-term traders, this represents a worthwhile strategic framework.
> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-02 00:00:00
end: 2025-01-09 00:00:00
period: 5m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("EMA/SMA Strategy", overlay=false)

// Input parameters
ema20Length = input(20, title="20 EMA Length")
ema50Length = input(50, title="50 EMA Length")
sma200Length = input(200, title="200 SMA Length")
rsiLength = input(14, title="RSI Length")
rsiThreshold = input(40, title="RSI Threshold")

// Calculate indicators
ema20 = ta.ema(close, ema20Length)
ema50 = ta.ema(close, ema50Length)
sma200 = ta.sma(close, sma200Length)
rsiValue = ta.rsi(close, rsiLength)

// Conditions
emaCondition = ema20 > ema50 and sma200 < ema20 and sma200 < ema50
priceNearEMA = (close <= ema20 * 1.01 and close >= ema20 * 0.99) or (close <= ema50 * 1.01 and close >= ema50 * 0.99)
rsiCondition = rsiValue > rsiThreshold

// Entry condition: Price crosses previous candle high
entryCondition = priceNearEMA and rsiCondition and emaCondition and (close > high[1])

// Strategy entry
if entryCondition
    strategy.entry("Long", strategy.long)

// Take profit and stop loss settings
takeProfitLevel = strategy.position_avg_price * 1.25 // Take profit at +25%
stopLossLevel = strategy.position_avg_price * 0.90 // Stop loss at -10%

// Exit conditions
if strategy.position_size > 0
    strategy.exit("Take Profit", from_entry="Long", limit=takeProfitLevel)
    strategy.exit("Stop Loss", from_entry="Long", stop=stopLossLevel)

// Plotting indicators for visualization
plot(ema20, color=color.blue, title="20 EMA")
plot(ema50, color=color.red, title="50 EMA")
plot(sma200, color=color.green, title="200 SMA")
hline(rsiThreshold, "RSI Threshold", color=color.orange)

```

> Detail

https://www.fmz.com/strategy/477946

> Last Modified

2025-01-10 15:15:58
