
> Name

Dynamic-Neural-RSI-Trend-Following-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10c14369678d3e362d0.png)

#### Overview
This strategy is a quantitative trading system based on moving averages, RSI indicator, and trailing stop loss. It combines trend following and momentum indicators from technical analysis, achieving risk-controlled trading through strict entry and exit conditions. The core logic is to seek oversold opportunities in uptrends and protect profits using trailing stops.

#### Strategy Principles
The strategy uses a 200-day Simple Moving Average (SMA) as the baseline for trend judgment, combined with the Relative Strength Index (RSI) for generating trading signals. Specifically:
1. Uses 200-day SMA to judge the major trend, only considering long positions when price is above the average
2. Identifies oversold signals when RSI falls below preset threshold (default 40)
3. Triggers long entry when both conditions are met and waiting period since last exit (default 10 days) has elapsed
4. Protects profits during position holding through trailing stop loss (default 5%)
5. Exits position when price breaks below trailing stop or 200-day SMA

#### Strategy Advantages
1. Combines trend and momentum double filtering to improve trading accuracy
2. Uses trailing stop mechanism to effectively lock in profits
3. Sets trading intervals to avoid frequent trading
4. Strong parameter adjustability to adapt to different market environments
5. Clear trading logic, easy to understand and execute
6. Simple calculations with high computational efficiency

#### Strategy Risks
1. Moving average lag may cause delayed entry and exit signals
2. RSI indicator may generate false signals in ranging markets
3. Fixed percentage trailing stop may not suit all market environments
4. Parameter optimization may lead to overfitting
5. May suffer significant drawdowns in highly volatile markets

#### Strategy Optimization Directions
1. Introduce volatility-adaptive trailing stop percentage
2. Add volume indicators as auxiliary confirmation
3. Replace simple moving average with exponential moving average for better sensitivity
4. Incorporate market sentiment indicators to optimize trading timing
5. Develop dynamic parameter optimization mechanism
6. Add multi-timeframe strategy confirmation mechanism

#### Summary
This is a quantitative trading strategy with complete structure and clear logic. It pursues stable returns while controlling risk by combining multiple technical indicators. Although there is room for optimization, the basic framework has good practicality and extensibility. The strategy is suitable for medium to long-term investors and adapts well to different market environments.

> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-09 00:00:00
end: 2025-01-16 00:00:00
period: 15m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":49999}]
*/

//@version=5
strategy("200 SMA Crossover Strategy", overlay=false)

// Define inputs
smaLength = input.int(200, title="SMA Length")
rsiLength = input.int(14, title="RSI Length")
rsiThreshold = input.float(40, title="RSI Threshold")
trailStopPercent = input.float(5.0, title="Trailing Stop Loss (%)")
waitingPeriod = input.int(10, title="Waiting Period (Days)")

// Calculate 200 SMA
sma200 = ta.sma(close, smaLength)

// Calculate RSI
rsi = ta.rsi(close, rsiLength)

// Plot the 200 SMA and RSI
plot(sma200, color=color.blue, linewidth=2, title="200 SMA")
plot(rsi, color=color.purple, title="RSI", display=display.none)

// Define buy and sell conditions
var isLong = false
var float lastExitTime = na
var float trailStopPrice = na

// Explicitly declare timeSinceExit as float
float timeSinceExit = na(lastExitTime) ? na : (time - lastExitTime) / (24 * 60 * 60 * 1000)
canEnter = na(lastExitTime) or timeSinceExit > waitingPeriod

buyCondition = close > sma200 and rsi < rsiThreshold and canEnter

if (buyCondition and not isLong)
    strategy.entry("Buy", strategy.long)
    trailStopPrice := na
    isLong := true

// Update trailing stop loss if long
if (isLong)
    trailStopPrice := na(trailStopPrice) ? close * (1 - trailStopPercent / 100) : math.max(trailStopPrice, close * (1 - trailStopPercent / 100))

// Check for trailing stop loss or sell condition
if (isLong and (close < trailStopPrice or close < sma200))
    strategy.close("Buy")
    lastExitTime := time
    isLong := false

// Plot buy and sell signals
plotshape(series=buyCondition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(series=(isLong and close < trailStopPrice) or close < sma200, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

```

> Detail

https://www.fmz.com/strategy/478685

> Last Modified

2025-01-17 14:19:08
