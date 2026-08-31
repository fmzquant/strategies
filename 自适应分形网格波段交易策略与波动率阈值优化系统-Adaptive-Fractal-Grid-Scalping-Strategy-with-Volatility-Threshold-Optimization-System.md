
> Name

自适应分形网格波段交易策略与波动率阈值优化系统-Adaptive-Fractal-Grid-Scalping-Strategy-with-Volatility-Threshold-Optimization-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11640731917880248ae.png)


#### Overview
This strategy is a scalping system based on fractal theory and adaptive grid, combined with volatility threshold for trade timing optimization. The system dynamically adjusts grid levels to capture market microstructure changes during high volatility periods while avoiding overtrading during low volatility periods. The strategy integrates multiple technical indicators, including Average True Range (ATR), Simple Moving Average (SMA), and fractal breakout points, building a comprehensive trading decision framework.

#### Strategy Principles
The core of the strategy lies in establishing dynamic trading grids through fractal identification and volatility clustering. The specific implementation includes the following key steps:
1. Using Pivot High and Pivot Low to identify local extremes as fractal breakout signals
2. Utilizing ATR indicator to measure market volatility and setting minimum volatility threshold as trading trigger
3. Dynamically adjusting grid levels based on ATR values and user-defined multipliers
4. Using SMA to determine trend direction, providing directional bias for trading decisions
5. Setting limit orders at grid levels and adjusting stop-loss and take-profit points based on ATR values

#### Strategy Advantages
1. Strong Adaptability - Grid levels automatically adjust according to market volatility, adapting to different market environments
2. Comprehensive Risk Control - Integrates volatility threshold and trailing stop mechanism for effective risk management
3. Precise Trading Opportunities - Uses dual confirmation of fractal breakouts and trend direction to improve trade quality
4. Visual Support - Provides graphical display of fractal points and grid levels for easy monitoring
5. Parameter Flexibility - Allows traders to adjust parameters according to personal risk preferences and market conditions

#### Strategy Risks
1. Parameter Sensitivity - Different parameter combinations may lead to significant performance variations, requiring thorough testing
2. Market Environment Dependency - May experience reduced trading opportunities in extremely low volatility markets
3. False Breakout Risk - Fractal breakout signals may produce false breakouts, requiring confirmation from other indicators
4. Slippage Impact - May encounter slippage when executing limit orders, affecting actual execution results
5. Capital Management Requirements - Requires appropriate sizing of positions to avoid excessive risk exposure

#### Strategy Optimization Directions
1. Introduce More Technical Indicators - Consider adding RSI, MACD, etc. for signal confirmation
2. Optimize Stop-Loss Mechanism - Develop more sophisticated dynamic stop-loss algorithms to improve risk control efficiency
3. Enhance Volatility Model - Consider using more advanced volatility prediction models, such as GARCH family models
4. Add Market Environment Filters - Implement market environment recognition module to use different parameters in different market phases
5. Develop Adaptive Parameter System - Implement automatic parameter optimization to improve strategy adaptability

#### Summary
This is a comprehensive strategy system combining fractal theory, grid trading, and volatility filtering. Through the coordinated use of multiple technical indicators, it achieves effective capture of market microstructure. The strategy's strengths lie in its adaptability and risk control capabilities, while attention needs to be paid to parameter optimization and market environment adaptability. Through continuous optimization and improvement, the strategy has the potential to maintain stable performance across different market environments.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-17 00:00:00
end: 2025-02-15 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("Adaptive Fractal Grid Scalping Strategy", overlay=true)

// Inputs
atrLength = input.int(14, title="ATR Length")
smaLength = input.int(50, title="SMA Length")
gridMultiplierHigh = input.float(2.0, title="Grid Multiplier High")
gridMultiplierLow = input.float(0.5, title="Grid Multiplier Low")
trailStopMultiplier = input.float(0.5, title="Trailing Stop Multiplier")
volatilityThreshold = input.float(1.0, title="Volatility Threshold (ATR)")

// Calculate Fractals
fractalHigh = ta.pivothigh(high, 2, 2)
fractalLow = ta.pivotlow(low, 2, 2)

// Calculate ATR and SMA
atrValue = ta.atr(atrLength)
smaValue = ta.sma(close, smaLength)

// Determine Trend Direction
isBullish = close > smaValue
isBearish = close < smaValue

// Calculate Grid Levels
gridLevelHigh = fractalHigh + atrValue * gridMultiplierHigh
gridLevelLow = fractalLow - atrValue * gridMultiplierLow

// Plot Fractals and Grid Levels
plotshape(not na(fractalHigh), style=shape.triangledown, location=location.abovebar, color=color.red, size=size.small)
plotshape(not na(fractalLow), style=shape.triangleup, location=location.belowbar, color=color.green, size=size.small)
plot(gridLevelHigh, color=color.red, linewidth=1, title="Grid Level High")
plot(gridLevelLow, color=color.green, linewidth=1, title="Grid Level Low")

// Trade Execution Logic with Volatility Threshold
if (atrValue > volatilityThreshold)
    if (isBullish and not na(fractalLow))
        strategy.entry("Buy", strategy.long, limit=gridLevelLow)
    if (isBearish and not na(fractalHigh))
        strategy.entry("Sell", strategy.short, limit=gridLevelHigh)

// Profit-Taking and Stop-Loss
strategy.exit("Take Profit/Stop Loss", "Buy", limit=gridLevelHigh, stop=fractalLow - atrValue * trailStopMultiplier)
strategy.exit("Take Profit/Stop Loss", "Sell", limit=gridLevelLow, stop=fractalHigh + atrValue * trailStopMultiplier)
```

> Detail

https://www.fmz.com/strategy/482240

> Last Modified

2025-02-17 10:47:58
