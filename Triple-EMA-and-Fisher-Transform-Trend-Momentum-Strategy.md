
> Name

Triple-EMA-and-Fisher-Transform-Trend-Momentum-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8a58adb79b787179365.png)
![IMG](https://www.fmz.com/upload/asset/2d901d8fb7d74c85aeb73.png)

#### Overview
This strategy combines the Triple Exponential Moving Average (TEMA) and Fisher Transform indicators to identify trend and momentum signals for entry and exit timing. TEMA serves as a low-lag trend following indicator for effective trend direction identification, while Fisher Transform converts price movements into a Gaussian normal distribution for clearer momentum signals. The strategy uses crossover signals as trading triggers, combining the advantages of trend following and momentum analysis.

#### Strategy Principles
The core logic is built on two main indicators:
1. TEMA uses a triple exponential moving average calculation method, reducing the lag of traditional moving averages through the formula "3×EMA - 3×EMA(EMA) + EMA(EMA(EMA))", with a default period of 21.
2. Fisher Transform converts price data into a normal distribution with a default parameter of 10, applying logarithmic transformation after normalizing high-low prices for clearer signals.

Trading rules are:
- Long Entry: Price crosses above TEMA and Fisher Transform crosses above 0
- Short Entry: Price crosses below TEMA and Fisher Transform crosses below 0
- Long Exit: Price crosses below TEMA or Fisher Transform crosses below 0
- Short Exit: Price crosses above TEMA or Fisher Transform crosses above 0

#### Strategy Advantages
1. High Signal Reliability: Effectively filters false signals by combining trend and momentum indicators
2. Low Latency: TEMA provides faster response compared to traditional moving averages
3. Clear Signals: Fisher Transform's normal distribution characteristics provide clearer trading signals
4. Robust Risk Control: Implements clear stop-loss conditions
5. Adjustable Parameters: Can be tuned for different market conditions
6. Good Visualization: Provides clear chart display

#### Strategy Risks
1. Choppy Market Risk: May generate frequent false breakout signals in sideways markets
2. Lag Risk: Though reduced, some degree of delay still exists
3. Parameter Sensitivity: Different parameter settings may lead to varying strategy performance
4. Market Environment Dependence: Strategy performs better in trending markets

#### Strategy Optimization Directions
1. Introduce Volatility Filter: Add ATR indicator to filter signals in low volatility environments
2. Optimize Exit Mechanism: Consider adding trailing stops or profit protection mechanisms
3. Add Time Filters: Adjust trading strategy based on different time period characteristics
4. Include Volume Confirmation: Incorporate volume indicators to improve signal reliability
5. Dynamic Parameter Optimization: Adjust indicator parameters based on market conditions

#### Summary
This is a comprehensive trading strategy combining trend and momentum analysis. Through the complementary use of TEMA and Fisher Transform, it ensures trend following capability while providing clear momentum confirmation signals. The strategy design is rational and practical, but attention must be paid to market environment adaptability and parameter optimization in actual application. Through the suggested optimization directions, the strategy's stability and reliability can be further enhanced.

> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-21 00:00:00
end: 2025-02-19 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("Triple EMA (TEMA) + Fisher Transform Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// ==== Triple EMA (TEMA) Settings ====
temaLength = input.int(21, title="TEMA Length", minval=1)

// Implementácia Triple EMA (TEMA)
// TEMA = 3 * EMA(close, length) - 3 * EMA(EMA(close, length), length) + EMA(EMA(EMA(close, length), length), length)
ema1 = ta.ema(close, temaLength)
ema2 = ta.ema(ema1, temaLength)
ema3 = ta.ema(ema2, temaLength)
tema = 3 * ema1 - 3 * ema2 + ema3
plot(tema, color=color.blue, title="TEMA")

// ==== Fisher Transform Settings ====
fisherLength = input.int(10, title="Fisher Length", minval=1)
fisherSmooth = input.int(1, title="Fisher Smoothing", minval=1)  // Zvyčajne sa používa 1 alebo 2

// Výpočet Fisher Transform
// Krok 1: Normalizácia ceny
price = (high + low) / 2
maxPrice = ta.highest(price, fisherLength)
minPrice = ta.lowest(price, fisherLength)
value = 0.5 * (2 * ((price - minPrice) / (maxPrice - minPrice)) - 1)
value := math.min(math.max(value, -0.999), 0.999)  // Orezanie hodnoty pre stabilitu

// Krok 2: Výpočet Fisher Transform
var float fisher = na
fisher := 0.5 * math.log((1 + value) / (1 - value)) + 0.5 * nz(fisher[1])
fisher := fisherSmooth > 1 ? ta.sma(fisher, fisherSmooth) : fisher
plot(fisher, color=color.red, title="Fisher Transform", linewidth=2)

// ==== Strategie Podmienky ====
 // Long Condition: Cena prekročí TEMA smerom nahor a Fisher Transform prekročí 0 smerom nahor
longCondition = ta.crossover(close, tema) and ta.crossover(fisher, 0)
if (longCondition)
    strategy.entry("Long", strategy.long)

 // Short Condition: Cena prekročí TEMA smerom nadol a Fisher Transform prekročí 0 smerom nadol
shortCondition = ta.crossunder(close, tema) and ta.crossunder(fisher, 0)
if (shortCondition)
    strategy.entry("Short", strategy.short)

// Exit Long Condition: Cena prekročí TEMA smerom nadol alebo Fisher Transform prekročí 0 smerom nadol
exitLong = ta.crossunder(close, tema) or ta.crossunder(fisher, 0)
if (exitLong)
    strategy.close("Long")

// Exit Short Condition: Cena prekročí TEMA smerom nahor alebo Fisher Transform prekročí 0 smerom nahor
exitShort = ta.crossover(close, tema) or ta.crossover(fisher, 0)
if (exitShort)
    strategy.close("Short")

// ==== Voliteľné: Vykreslenie Zero Line pre Fisher Transform ====
hline(0, "Zero Line", color=color.gray, linestyle=hline.style_dotted)

```

> Detail

https://www.fmz.com/strategy/482919

> Last Modified

2025-02-20 17:41:02
