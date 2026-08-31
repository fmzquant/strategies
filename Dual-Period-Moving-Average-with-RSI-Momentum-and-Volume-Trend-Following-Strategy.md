
> Name

Dual-Period-Moving-Average-with-RSI-Momentum-and-Volume-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15257e6b09207adc6d3.png)

#### Overview
This is a trend-following strategy that combines dual-period moving averages (21-day and 55-day), RSI momentum indicator, and volume analysis. The strategy analyzes market information from three dimensions - price, momentum, and volume - while confirming trend direction and filtering trading signals through RSI and volume indicators to improve trading accuracy. The strategy requires price breakthrough of short-term moving average, RSI crossing above its average, and increased volume to confirm trend validity.

#### Strategy Principles
The strategy employs a triple-filtering mechanism:
1. Price Filter: Uses 21-day and 55-day moving averages to confirm price trends, with prices above 21-day MA indicating potential long opportunities
2. Momentum Filter: Calculates 13-period RSI and its 13-period average, confirming momentum direction when RSI crosses above its average
3. Volume Filter: Calculates 21-period volume moving average, requiring entry volume to exceed its average, confirming market participation

Buy conditions require all of the following:
- Close price above 21-day MA
- RSI above its average
- Volume above volume MA

Sell conditions require any of the following:
- Price falls below 55-day MA
- RSI falls below its average

#### Strategy Advantages
1. Multi-dimensional Analysis: Improves signal reliability through comprehensive analysis of price, momentum, and volume
2. Trend Confirmation: Dual-period moving averages better confirm trend direction and strength
3. Dynamic Adaptation: RSI indicator dynamically adapts to market volatility, helping capture momentum changes
4. Volume-Price Coordination: Uses volume as a filter condition, ensuring trades occur during periods of high market activity
5. Risk Control: Sets clear stop-loss conditions, helping control risk

#### Strategy Risks
1. Lag Risk: Moving averages are inherently lagging indicators, potentially causing delayed entry and exit
2. Range-bound Market Risk: May generate frequent false breakout signals in sideways markets
3. Parameter Sensitivity: Strategy effectiveness is sensitive to parameter settings, requiring adjustment in different market environments
4. Cost Risk: Frequent trading may incur high transaction costs
5. Liquidity Risk: May be difficult to execute trades at ideal prices in low-liquidity markets

#### Strategy Optimization Directions
1. Parameter Adaptation: Introduce adaptive mechanisms to dynamically adjust moving average periods based on market volatility
2. Signal Confirmation: Add trend strength indicators (like ADX) to further filter trading signals
3. Profit-Taking Optimization: Design dynamic profit-taking mechanisms to capture more gains in strong trends
4. Position Management: Dynamically adjust position sizes based on signal strength and market volatility
5. Time Filtering: Add trading time windows to avoid unfavorable trading periods

#### Summary
This is a trend-following strategy that comprehensively utilizes the three essential elements of technical analysis (price, volume, momentum). Through multiple filtering mechanisms, the strategy ensures signal reliability while maintaining risk control capabilities. Although it has some inherent limitations, through continuous optimization and improvement, the strategy has the potential to achieve stable returns in actual trading. The strategy may perform particularly well in markets with clear trends and sufficient liquidity.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2025-01-04 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("21/55 MA with RSI Crossover", overlay=true)

// Inputs for moving averages
ma21_length = input.int(21, title="21-day Moving Average Length", minval=1)
ma55_length = input.int(55, title="55-day Moving Average Length", minval=1)

// RSI settings
rsi_length = input.int(13, title="RSI Length", minval=1)
rsi_avg_length = input.int(13, title="RSI Average Length", minval=1)

// Moving averages
ma21 = ta.sma(close, ma21_length)
ma55 = ta.sma(close, ma55_length)

// Volume settings
vol_ma_length = input.int(21, title="Volume MA Length", minval=1)

// Volume moving average
vol_ma = ta.sma(volume, vol_ma_length)

// RSI calculation
rsi = ta.rsi(close, rsi_length)
rsi_avg = ta.sma(rsi, rsi_avg_length)

// Buy condition
// buy_condition = close > ma21 and ta.crossover(rsi, rsi_avg) and volume > vol_ma
buy_condition = close > ma21 and rsi > rsi_avg and volume > vol_ma

// Sell condition
// sell_condition = close < ma55 or ta.crossunder(rsi, rsi_avg)
sell_condition = ta.crossunder(close, ma55) or ta.crossunder(rsi, rsi_avg)

// Execute trades
if (buy_condition)
    strategy.entry("Buy", strategy.long, comment="Buy Signal")

if (sell_condition)
    strategy.close("Buy", comment="Sell Signal")

// Plot moving averages for reference
plot(ma21, color=color.blue, title="21-day MA")
plot(ma55, color=color.red, title="55-day MA")

// Plot RSI and RSI average for reference
rsi_plot = input.bool(true, title="Show RSI?", inline="rsi")
plot(rsi_plot ? rsi : na, color=color.green, title="RSI")
plot(rsi_plot ? rsi_avg : na, color=color.orange, title="RSI Average")
```

> Detail

https://www.fmz.com/strategy/477551

> Last Modified

2025-01-06 13:45:16
