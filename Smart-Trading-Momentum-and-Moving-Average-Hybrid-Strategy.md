
> Name

Smart-Trading-Momentum-and-Moving-Average-Hybrid-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8422f7135b0eb38155d.png)
![IMG](https://www.fmz.com/upload/asset/2d8923d50590d5d6e3a9f.png)



#### Overview
The Smart Trading Momentum and Moving Average Hybrid Strategy is a quantitative trading approach that combines technical indicators with candlestick pattern recognition. This strategy utilizes Simple Moving Average (SMA) crossover signals, candlestick pattern identification, and volatility-adjusted stop-loss levels to determine market entry and exit points. Additionally, the strategy incorporates risk management and precise position sizing methods by setting a risk percentage per trade and a risk-reward ratio to optimize trading performance. The strategy generates T and TT signal labels when prices cross the 22-period SMA, providing traders with additional visual confirmation.

#### Strategy Principles
The core principle of this strategy is based on the combined use of multiple technical analysis methods to enhance the reliability of trading signals. The strategy primarily relies on the following key components:

1. **Moving Average Crossovers**: Utilizes crossovers between 13-period and 5-period Simple Moving Averages (SMA) to trigger buy and sell signals. When the fast moving average (shorter period) crosses above the slow moving average (longer period), a buy signal is generated; when the fast moving average crosses below the slow moving average, a sell signal is generated.

2. **Candlestick Pattern Recognition**: The strategy integrates multiple candlestick pattern recognition functions, including bullish engulfing, bearish engulfing, hammer, inverted hammer, bullish harami, and bearish harami patterns. These patterns are displayed in different colors on the chart, providing additional confirmation for trading decisions.

3. **Volatility-Adjusted Stop Losses**: Uses the Average True Range (ATR) indicator to calculate stop-loss distances, adjusting stop-loss placement by multiplying by a user-defined ATR multiplier. This approach makes the stop-loss more adaptive to the current market volatility.

4. **Precise Position Sizing**: Calculates position size based on initial capital, risk percentage per trade, and ATR-calculated stop-loss distance, ensuring consistent risk control.

5. **T and TT Signal System**: The strategy also includes a visual signal system that generates T and TT labels when price crosses the 22-period SMA. These labels appear in different colors based on the direction of the cross and the relationship between closing and opening prices, providing additional trade confirmation.

#### Strategy Advantages
This strategy offers several significant advantages:

1. **Multiple Confirmation Mechanisms**: By combining moving average crossovers, candlestick patterns, and T/TT signal system, it provides multiple layers of trade confirmation, reducing the risk of false signals.

2. **Dynamic Risk Management**: Uses the ATR indicator to adjust stop-loss placement, allowing the strategy to automatically adapt protective measures based on market volatility, providing wider stops in more volatile markets and tighter stops in less volatile conditions.

3. **Precise Capital Management**: Through risk percentage-based position sizing, ensures consistent risk per trade, maintaining the same risk exposure regardless of market volatility.

4. **Visualized Trading Signals**: The strategy visually displays candlestick patterns and T/TT signals on the chart, allowing traders to quickly identify potential trading opportunities.

5. **Customizable Risk Parameters**: Allows traders to adjust key parameters according to personal risk preferences, such as risk percentage per trade, risk-reward ratio, and ATR multiplier, making the strategy adaptable to different trading styles and market conditions.

#### Strategy Risks
Despite its comprehensive design, the strategy still carries the following potential risks:

1. **Moving Average Lag**: Moving averages are lagging indicators and may lead to late entries during trend reversals, missing initial price movements. The solution is to combine other leading indicators or reduce the moving average periods to improve responsiveness.

2. **Rapid Market Fluctuation Risk**: In highly volatile market conditions, prices may gap beyond preset stop-loss levels, resulting in actual losses exceeding expectations. Consider using guaranteed stop orders or increasing the ATR multiplier to address this situation.

3. **Overtrading Risk**: Frequent moving average crossovers may lead to overtrading, especially in ranging markets. This can be mitigated by adding additional filters, such as trend strength indicators.

4. **Parameter Sensitivity**: Strategy performance is highly sensitive to parameter choices (such as moving average periods, ATR period, and multiplier). Thorough backtesting and parameter optimization are needed to find optimal settings for specific markets.

5. **Candlestick Pattern Misidentification**: In certain market conditions, candlestick pattern recognition may not be accurate enough, leading to false signals. It's recommended to use candlestick patterns as supplementary confirmation rather than primary trading signals.

#### Strategy Optimization Directions
Based on code analysis, the strategy can be optimized in the following directions:

1. **Add Trend Filters**: Introduce trend strength indicators (such as ADX or MACD) as additional filters, trading only in confirmed trend directions to avoid false signals in ranging markets. This can improve trade quality and success rate.

2. **Integrate Volume Confirmation**: Add volume analysis to the strategy, requiring volume increase when signals are generated, enhancing signal reliability, especially in breakout and reversal patterns.

3. **Implement Adaptive Parameters**: Develop adaptive mechanisms to automatically adjust moving average periods and ATR multipliers based on market conditions. For example, use longer moving average periods and larger ATR multipliers in more volatile markets.

4. **Add Time Filters**: Implement trading time filters to avoid known low-liquidity or high-volatility periods, such as market openings or important economic data release times.

5. **Improve Entry Logic**: Combine price action patterns and support/resistance levels to optimize entry points, rather than relying solely on moving average crossovers, improving entry precision and reducing slippage.

6. **Multi-Timeframe Analysis**: Add multi-timeframe confirmation to ensure trade direction aligns with higher timeframe trends, reducing counter-trend trades and improving win rates.

7. **Partial Profit-Locking Mechanism**: Implement a stepped profit-taking strategy, locking in partial profits when price reaches specific targets while moving stop-loss to breakeven or small profit positions, protecting gained profits.

#### Summary
The Smart Trading Momentum and Moving Average Hybrid Strategy is a comprehensive trading system that combines technical analysis, risk management, and precise position sizing. Its core strengths lie in multi-layered signal confirmation, dynamic risk management, and intuitive visualized trading signals. By combining moving average crossovers, candlestick pattern recognition, and volatility-adjusted stop losses, the strategy provides traders with a structured trading framework. Despite risks such as moving average lag and parameter sensitivity, by implementing the suggested optimization measures, such as adding trend filters, integrating volume confirmation, and multi-timeframe analysis, the strategy's robustness and performance can be significantly improved. This strategy is particularly suitable for medium to long-term traders who seek a systematic approach and value risk management, and through reasonable parameter adjustments and strategy optimization, it can adapt to various market environments and trading instruments.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-03 00:00:00
end: 2025-04-02 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BNB_USDT"}]
*/

//@version=5 
strategy("Smart Trade By Amit Roy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// Input Settings
riskPercent = input.float(3, title="Risk Percentage per Trade (%)", minval=0.1, step=0.1)
rewardRatio = input.float(3, title="Risk-Reward Ratio", minval=1.0)
capital = input.float(10000, title="Starting Capital ($)", minval=1)
atrMultiplier = input.float(1.5, title="ATR Multiplier for Stop Loss")
show_TT = input.bool(true, title = "Show T and TT")
show_sma = input.bool(true, title = "Show SMA")

// ATR Calculation for Volatility-based Stop-Loss
atrLength = input.int(14, title="ATR Length")
atrValue = ta.atr(atrLength)
stopLossDistance = atrValue * atrMultiplier
takeProfitDistance = stopLossDistance * rewardRatio

// Position Sizing Calculation
riskAmount = capital * (riskPercent / 100)
positionSize = riskAmount / stopLossDistance

// Simple Moving Averages
fastMA = ta.sma(close, 13)
slowMA = ta.sma(close, 5)

// Entry and Exit Conditions using Simple Moving Averages
longCondition = ta.crossover(fastMA, slowMA)
shortCondition = ta.crossunder(fastMA, slowMA)

// Candlestick Patterns Functions
isBullishEngulfing() => (open[1] > close[1] and close > open and close >= open[1] and close[1] >= open and close - open > open[1] - close[1])
isBearishEngulfing() => (close[1] > open[1] and open > close and open >= close[1] and open[1] >= close and open - close > close[1] - open[1])
isHammer() => (((high - low) > 3 * (open - close)) and ((close - low) / (.001 + high - low) > 0.6) and ((open - low) / (.001 + high - low) > 0.6))
isInvertedHammer() => (((high - low) > 3 * (open - close)) and ((high - close) / (.001 + high - low) > 0.6) and ((high - open) / (.001 + high - low) > 0.6))
isBullishHarami() => (open[1] > close[1] and close > open and close <= open[1] and close[1] <= open and close - open < open[1] - close[1])
isBearishHarami() => (close[1] > open[1] and open > close and open <= close[1] and open[1] <= close and open - close < close[1] - open[1])

// Color Bars for Candlestick Patterns
barcolor(isBullishEngulfing() ? color.rgb(0, 102, 255) : na)
barcolor(isHammer() ? (#1f0cef) : na)
barcolor(isBullishHarami() ? color.rgb(0, 93, 214) : na)
barcolor(isBearishEngulfing() ? color.rgb(255, 196, 0) : na)
barcolor(isBearishHarami() ? color.rgb(251, 255, 0) : na)
barcolor(isInvertedHammer() ? color.rgb(247, 0, 247) : na)

// Calculate SMA for Visualization
sma_22 = ta.sma(close, 22)
lineColor = close > sma_22 ? color.green : color.green
plot(show_sma ? sma_22 : na, color=lineColor, linewidth=1)

// Determine T and TT Labels based on Conditions
candleCrossG = ta.crossover(close, sma_22)
candleCrossR = ta.crossunder(close, sma_22)

// Plot T and TT labels
redT = candleCrossG and close < open
greenTT = candleCrossG and close > open and close > sma_22
greenT = candleCrossR and close > open
redTT = candleCrossR and close < open

plotshape(series=redT ? show_TT : na, title="Red-T", color=na, style=shape.labeldown, location=location.abovebar, size=size.small, textcolor=color.red, text="T")
plotshape(series=greenTT ? show_TT : na, title="Green-TT", color=na, style=shape.labelup, location=location.belowbar, size=size.tiny, textcolor=color.green, text="TT")
plotshape(series=greenT ? show_TT : na, title="Green-T", color=na, style=shape.labelup, location=location.belowbar, size=size.small, textcolor=color.green, text="T")
plotshape(series=redTT ? show_TT : na, title="Red-TT", color=na, style=shape.labeldown, location=location.abovebar, size=size.tiny, textcolor=color.red, text="TT")

// Place Trades Based on Conditions
if (longCondition)
    strategy.entry("उड़ाओ ", strategy.long, qty=positionSize)
    strategy.exit("Take Profit", from_entry="Long", limit=close + takeProfitDistance, stop=close - stopLossDistance)

if (shortCondition)
    strategy.entry("गिराओ", strategy.short, qty=positionSize)
    strategy.exit("Take Profit", from_entry="Short", limit=close - takeProfitDistance, stop=close + stopLossDistance)

// Plotting Stop Loss and Take Profit Levels for Visualization
plot(longCondition ? close - stopLossDistance : na, color=na, title="Stop Loss", linewidth=1, style=plot.style_line)
plot(longCondition ? close + takeProfitDistance : na, color=na, title="Take Profit", linewidth=1, style=plot.style_line)
plot(shortCondition ? close + stopLossDistance : na, color=na, title="Stop Loss (Short)", linewidth=1, style=plot.style_line)
plot(shortCondition ? close - takeProfitDistance : na, color=na, title="Take Profit (Short)", linewidth=1, style=plot.style_line)

```

> Detail

https://www.fmz.com/strategy/489285

> Last Modified

2025-04-03 10:42:22
