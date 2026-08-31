
> Name

Trend-Following-Trading-Strategy-with-Momentum-Filtering

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d3cadcf2a3c7f250e1.png)


#### Overview
This strategy combines technical analysis tools such as Moving Averages (MA), Relative Strength Index (RSI), and Average True Range (ATR) to capture trending opportunities in the market. The strategy uses dual moving average crossovers to determine the trend direction and employs the RSI indicator for momentum filtering of trading signals. It also utilizes ATR as a basis for stop-loss to manage risk.

#### Strategy Principles
The core of this strategy is to use the crossover of two moving averages with different periods (fast and slow) to identify market trends. When the fast MA crosses above the slow MA, it indicates an uptrend, and the strategy will generate a long signal. Conversely, when the fast MA crosses below the slow MA, it indicates a downtrend, and the strategy will generate a short signal.

To improve the reliability of trading signals, the strategy introduces the RSI indicator as a momentum filter. Long positions are only allowed when the RSI is above a certain threshold (e.g., 50), and short positions are only allowed when the RSI is below that threshold. This helps avoid trading during sideways markets or when momentum is lacking, thus improving signal quality.

Furthermore, the strategy uses ATR as a basis for stop-loss, dynamically adjusting the stop-loss level according to the price volatility over a recent period. This adaptive stop-loss approach allows for quick stops during unclear trends to control drawdowns, while providing more room for profits during strong trends to enhance strategy returns.

#### Strategy Advantages
1. Trend-following: By capturing market trends through dual moving average crossovers, the strategy can align with the primary market direction and increase the win rate.
2. Momentum filtering: The RSI indicator is used for secondary confirmation of trading signals, avoiding blind entries when momentum is insufficient and improving the quality of individual trades.
3. Adaptive stop-loss: By dynamically adjusting the stop-loss level based on ATR, the strategy achieves risk adaptation in different market conditions, reducing drawdowns and improving capital efficiency.
4. Simplicity and ease of use: The strategy logic is clear, with few parameters, making it easy to understand and implement, suitable for most investors.

#### Strategy Risks
1. Whipsaw risk: During choppy markets with unclear trends, frequent crossovers may lead to excessive trading signals, resulting in frequent trades and rapid capital depletion.
2. Parameter risk: The strategy's performance is sensitive to parameter settings, and different parameters may yield entirely different results. If parameters are not chosen properly, the strategy may fail.
3. Trend reversal risk: When the market suddenly experiences drastic changes and the trend reverses sharply, the strategy may not be able to stop losses in time, leading to significant losses.
4. Overall risk: Although the strategy incorporates momentum filtering, it is still primarily a trend-following strategy. It may face systematic risks during prolonged sideways markets or when trends are not evident.

#### Strategy Optimization Directions
1. Trend strength identification: In addition to trend determination, trend strength indicators (such as ADX) can be introduced to avoid frequent trading in weak trends and improve the precision of trend capturing.
2. Differentiation of long and short momentum: The current strategy applies the same momentum filtering approach to both long and short signals. Consider setting different RSI thresholds for long and short positions to better adapt to the asymmetry of bullish and bearish trends.
3. Stop-loss optimization: In addition to ATR-based stop-loss, other stop-loss methods (such as percentage stop-loss, support/resistance level stop-loss, etc.) can be combined to construct a diversified stop-loss system for further risk control.
4. Parameter adaptation: Consider introducing parameter optimization or adaptive algorithms to allow strategy parameters to automatically adjust based on changes in market conditions, improving the adaptability and robustness of the strategy.

#### Summary
This strategy effectively combines trend-following and momentum filtering to capture trending opportunities in the market while managing risk. The strategy logic is clear and easy to implement and optimize. However, in practical application, attention should be paid to whipsaw risk and parameter risk. The strategy should be flexibly adjusted and optimized based on market characteristics and individual needs. Overall, this is a balanced strategy that considers both trend capturing and risk control, worthy of further exploration and practice.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-28 00:00:00
end: 2024-06-02 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Trend-Following Strategy with MACD and RSI Filter", overlay=true)

// Input variables
fastLength = input(12, title="Fast MA Length")
slowLength = input(26, title="Slow MA Length")
signalLength = input(9, title="Signal Line Length")
stopLossPct = input(1.0, title="Stop Loss %") / 100
rsiLength = input(14, title="RSI Length")
rsiThreshold = input(50, title="RSI Threshold")

// Moving averages
fastMA = ta.sma(close, fastLength)
slowMA = ta.sma(close, slowLength)

// MACD
[macdLine, signalLine, _] = ta.macd(close, fastLength, slowLength, signalLength)

// RSI
rsi = ta.rsi(close, rsiLength)

// Entry conditions with RSI filter
bullishSignal = ta.crossover(macdLine, signalLine) and rsi > rsiThreshold
bearishSignal = ta.crossunder(macdLine, signalLine) and rsi < rsiThreshold

// Calculate stop loss levels
longStopLoss = ta.highest(close, 10)[1] * (1 - stopLossPct)
shortStopLoss = ta.lowest(close, 10)[1] * (1 + stopLossPct)

// Execute trades
strategy.entry("Long", strategy.long, when=bullishSignal)
strategy.entry("Short", strategy.short, when=bearishSignal)
strategy.exit("Exit Long", "Long", stop=longStopLoss)
strategy.exit("Exit Short", "Short", stop=shortStopLoss)

// Plotting signals
plotshape(bullishSignal, style=shape.triangleup, location=location.belowbar, color=color.green, size=size.small, title="Bullish Signal")
plotshape(bearishSignal, style=shape.triangledown, location=location.abovebar, color=color.red, size=size.small, title="Bearish Signal")

// Plot MACD
plot(macdLine, color=color.blue, title="MACD Line")
plot(signalLine, color=color.orange, title="Signal Line")

// Plot RSI
hline(rsiThreshold, "RSI Threshold", color=color.gray)
plot(rsi, color=color.purple, title="RSI")


```

> Detail

https://www.fmz.com/strategy/453246

> Last Modified

2024-06-03 11:23:02
