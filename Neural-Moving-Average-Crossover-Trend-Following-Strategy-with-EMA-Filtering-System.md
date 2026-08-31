
> Name

Neural-Moving-Average-Crossover-Trend-Following-Strategy-with-EMA-Filtering-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16fbc20cfd0e97cbf8b.png)

#### Overview
This strategy is a trading system based on moving average crossover signals and trend filtering. It combines short-term SMA crossover signals (9-period and 15-period) with a long-term EMA (200-period) as a trend filter to capture market trends across different timeframes. The system also includes a re-entry mechanism that allows for position rebuilding during trend continuation.

#### Strategy Principles
The strategy employs a triple moving average system for trading decisions:
1. Uses 9-period and 15-period Simple Moving Averages (SMA) for generating trading signals
2. Employs 200-period Exponential Moving Average (EMA) as a trend filter
3. Generates long signals when the short-term SMA (9-period) crosses above the 15-period SMA and price is above the 200-period EMA
4. Generates short signals when the short-term SMA (9-period) crosses below the 15-period SMA and price is below the 200-period EMA
5. Includes re-entry logic allowing new positions after initial crossover signals as long as price maintains position relative to the 200 EMA

#### Strategy Advantages
1. Multiple timeframe analysis: Combines short-term and long-term moving averages for a comprehensive market perspective
2. Trend filtering: Uses 200 EMA to filter false signals and improve trade quality
3. Re-entry mechanism: Allows multiple entries during strong trends to maximize profit potential
4. Clear entry/exit rules: Based on objective technical indicators, reducing subjective judgment
5. Bi-directional trading: Profits from both bullish and bearish markets
6. Integrated risk management: Automatic risk control through the moving average system

#### Strategy Risks
1. Choppy market risk: May generate frequent false signals in sideways markets
2. Lag risk: Moving averages are inherently lagging indicators, potentially missing optimal entry points
3. Trend reversal risk: May suffer significant losses during sharp market reversals
4. Re-entry risk: Excessive position building may lead to overexposure
Mitigation measures:
- Add additional volatility filters
- Set maximum position limits
- Implement dynamic stop-loss mechanisms
- Deploy position sizing system

#### Strategy Optimization Directions
1. Dynamic Period Optimization:
- Automatically adjust moving average periods based on market volatility
- Introduce Adaptive Moving Averages (AMA) to replace fixed-period ones

2. Entry Optimization:
- Add volume confirmation
- Include momentum indicator validation
- Implement price pattern confirmation

3. Risk Management Optimization:
- Implement dynamic position sizing
- Add trailing stops
- Develop volatility-based stop-loss settings

4. Re-entry Logic Optimization:
- Add trend strength confirmation
- Design graduated position building system
- Incorporate market environment recognition

#### Summary
This strategy builds a comprehensive trend-following trading system by combining multiple moving average systems with trend filters. Its main advantage lies in capturing significant profits in trending markets while improving stability through moving average filtering and re-entry mechanisms. Although inherent risks exist, implementing the optimization directions can further enhance strategy performance. The strategy is suitable for tracking medium to long-term market trends and serves as a reliable trading tool for patient traders.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-19 00:00:00
end: 2025-02-17 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=5
strategy("SMA Crossover with EMA Filter", overlay=true)

// Define indicators
sma9 = ta.sma(close, 9)
sma15 = ta.sma(close, 15)
ema200 = ta.ema(close, 200)

// Crossover conditions
bullish_crossover = ta.crossover(sma9, sma15) // Buy signal
bearish_crossover = ta.crossunder(sma9, sma15) // Sell signal

// Filters
above_ema200 = close > ema200
below_ema200 = close < ema200

// Buy condition (only above 200 EMA)
buy_signal = bullish_crossover and above_ema200
if buy_signal
    strategy.entry("Buy", strategy.long)

// Sell condition (only below 200 EMA)
sell_signal = bearish_crossover and below_ema200
if sell_signal
    strategy.entry("Sell", strategy.short)

// Exit condition if the signal reverses
exit_long = bearish_crossover
exit_short = bullish_crossover
if exit_long
    strategy.close("Buy")
if exit_short
    strategy.close("Sell")

// Re-entry condition when price crosses EMA 200 after a prior crossover
buy_reentry = ta.barssince(bullish_crossover) > 0 and above_ema200
sell_reentry = ta.barssince(bearish_crossover) > 0 and below_ema200
if buy_reentry
    strategy.entry("Buy", strategy.long)
if sell_reentry
    strategy.entry("Sell", strategy.short)

// Plot indicators
plot(sma9, color=color.blue, title="SMA 9")
plot(sma15, color=color.red, title="SMA 15")
plot(ema200, color=color.orange, title="EMA 200")



```

> Detail

https://www.fmz.com/strategy/482515

> Last Modified

2025-02-18 18:29:13
