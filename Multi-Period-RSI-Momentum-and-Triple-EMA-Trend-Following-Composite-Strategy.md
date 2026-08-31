
> Name

Multi-Period-RSI-Momentum-and-Triple-EMA-Trend-Following-Composite-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1609e3215807bea0a9a.png)


#### Overview
This strategy is a composite trading system that combines the momentum indicator RSI with the trend indicator EMA. Operating on both 1-minute and 5-minute timeframes, it makes trading decisions based on RSI overbought/oversold signals and triple EMA trend determination. The strategy incorporates both trend following and mean reversion characteristics, enabling it to capture trading opportunities in different market environments.

#### Strategy Principles
The strategy uses 21/50/200-day triple EMA as trend judgment benchmark, combined with a modified RSI indicator (calculated using Chebyshev method) to identify market overbought/oversold conditions. On the 1-minute timeframe, it initiates short positions when RSI breaks above 94 and closes when it falls below 4, with breakeven stops set when RSI returns to 50. On the 5-minute timeframe, it initiates long positions when price rebounds after falling below the 200-day EMA, closing positions when RSI is overbought or breaks below the median. Position management variables inPositionLong and inPositionShort prevent repeated entries.

#### Strategy Advantages
1. Multi-timeframe analysis enhances signal reliability
2. Combines trend and momentum indicators for complementary benefits
3. Implements breakeven stop-loss mechanism for risk control
4. Uses improved RSI calculation method for more accurate signals
5. Prevents duplicate trades through position management
6. Adaptable to different market environments

#### Strategy Risks
1. Frequent trading may incur high transaction costs
2. May trigger frequent stops in volatile markets
3. RSI indicator may generate false signals under certain market conditions
4. Multi-period strategy may have lag in signal confirmation
5. EMA crossover signals may be misleading in ranging markets

#### Optimization Directions
1. Introduce volatility filters to adjust parameters during high volatility periods
2. Add volume confirmation mechanism
3. Optimize RSI thresholds with potential dynamic adjustment
4. Include additional technical indicators for cross-validation
5. Implement adaptive parameter mechanisms
6. Develop more sophisticated stop-loss mechanisms

#### Summary
The strategy enhances trading stability and reliability through the combination of multiple technical indicators and multi-timeframe analysis. While certain risks exist, they can be effectively controlled through proper position management and stop-loss mechanisms. The strategy has significant optimization potential, and its performance can be further improved by introducing additional technical indicators and optimizing parameters.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-12 00:00:00
end: 2024-07-10 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Combined RSI Primed and 3 EMA Strategy", overlay=true)

// Input for EMA lengths
emaLength1 = input(21, title="EMA Length 1")
emaLength2 = input(50, title="EMA Length 2")
emaLength3 = input(200, title="EMA Length 3")

// Input for RSI settings
rsiLength = input(14, title="RSI Length")
rsiOverbought = input(94, title="RSI Overbought Level")
rsiNeutral = input(50, title="RSI Neutral Level")
rsiOversold = input(4, title="RSI Oversold Level")

// Calculate EMAs
ema1 = ta.ema(close, emaLength1)
ema2 = ta.ema(close, emaLength2)
ema3 = ta.ema(close, emaLength3)

// Calculate RSI using Chebyshev method from RSI Primed
rsi(source) =>
    up = math.max(ta.change(source), 0)
    down = -math.min(ta.change(source), 0)
    rs = up / down
    rsiValue = down == 0 ? 100 : 100 - (100 / (1 + rs))
    rsiValue

rsiValue = rsi(close)

// Plot EMAs
plot(ema1, color=color.red, title="EMA 21")
plot(ema2, color=color.white, title="EMA 50")
plot(ema3, color=color.blue, title="EMA 200")

// Plot RSI for visual reference
hline(rsiOverbought, "Overbought", color=color.red)
hline(rsiNeutral, "Neutral", color=color.gray)
hline(rsiOversold, "Oversold", color=color.green)
plot(rsiValue, color=color.blue, title="RSI")

// Trading logic with position management
var bool inPositionShort = false
var bool inPositionLong = false

// Trading logic for 1-minute timeframe
if (rsiValue > rsiOverbought and not inPositionShort)
    strategy.entry("Sell", strategy.short)
    inPositionShort := true

if (rsiValue < rsiOversold and inPositionShort)
    strategy.close("Sell")
    inPositionShort := false

if (ta.crossover(rsiValue, rsiNeutral) and inPositionShort)
    strategy.exit("Break Even", "Sell", stop=close)

// Trading logic for 5-minute timeframe
var float lastBearishClose = na

if (close < ema3 and close[1] >= ema3) // Check if the current close is below EMA200
    lastBearishClose := close

if (not na(lastBearishClose) and close > lastBearishClose and not inPositionLong)
    strategy.entry("Buy", strategy.long)
    inPositionLong := true

if (rsiValue > rsiOverbought and inPositionLong)
    strategy.close("Buy")
    inPositionLong := false

if (ta.crossunder(rsiValue, rsiNeutral) and inPositionLong)
    strategy.exit("Break Even", "Buy", stop=close)

lastBearishClose := na // Reset after trade execution
```

> Detail

https://www.fmz.com/strategy/471694

> Last Modified

2024-11-12 15:07:54
