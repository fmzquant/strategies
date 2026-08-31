
> Name

Dual-Moving-Average-Crossover-Strategy-451389

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/600348a9f53c14dc35.png)

#### Overview
The Dual Moving Average Crossover Strategy is a common quantitative trading strategy. This strategy uses two moving averages with different periods as buy and sell signals. It buys when the short-term moving average crosses above the long-term moving average and sells when the short-term moving average crosses below the long-term moving average. The strategy code supports various common types of moving averages, such as Simple Moving Average (SMA), Exponential Moving Average (EMA), Double Exponential Moving Average (DEMA), Triple Exponential Moving Average (TEMA), Weighted Moving Average (WMA), and Volume Weighted Moving Average (VWMA). It also allows flexible settings for the periods of the short-term and long-term moving averages. Moreover, the strategy supports selecting different price types for calculating the moving averages, including close, high, open, low, typical price, and median price.

#### Strategy Principle
The core principle of this strategy is to capture price trends by leveraging the trend characteristics and lag of two moving averages with different periods. Generally speaking, the short-term moving average is more sensitive to price changes, while the long-term moving average is relatively lagging. When the price is in an uptrend, the short-term moving average will move upward before the long-term moving average and eventually cross above it, forming a "golden cross" buy signal. Conversely, when the price is in a downtrend, the short-term moving average will move downward before the long-term moving average and eventually cross below it, forming a "death cross" sell signal. By capturing the golden cross and death cross signals, this strategy can trade in line with the main trend direction of the price.

#### Strategy Advantages
1. Simple and easy to use: The Dual Moving Average Crossover Strategy is a simple, easy-to-understand, and easy-to-implement quantitative trading strategy, suitable for novice traders to learn and use.

2. Wide applicability: This strategy can be applied to various financial markets and trading instruments, such as stocks, futures, forex, cryptocurrencies, etc., with strong versatility.

3. Flexible parameters: The strategy code supports multiple common types of moving averages and price types, allowing users to flexibly set parameters according to their needs to adapt to different market conditions and trading styles.

4. Trend tracking: By using the crossover signals of two moving averages with different periods, this strategy can effectively capture the main trend of the price, which helps to follow the trend and avoid counter-trend trading.

#### Strategy Risks
1. Lag: Moving averages are essentially trend-following indicators and have a certain lag, which may miss the best entry and exit timings.

2. Ineffectiveness in range-bound markets: In range-bound or sideways markets, price fluctuations are large, and moving average crossover signals occur frequently, which may lead to frequent trading and result in high trading costs and capital losses.

3. Difficulty in parameter optimization: The selection of moving average periods has a significant impact on the strategy performance, but the optimal parameters often vary depending on market conditions, making it challenging to find universally applicable optimal parameter combinations.

#### Strategy Optimization Directions
1. Introduce trend filters: In addition to the moving average crossover signals, other trend indicators such as MACD and ADX can be incorporated for trend filtering, trading only when the trend is clear to avoid frequent trading in range-bound markets.

2. Optimize take-profit and stop-loss: Incorporate reasonable take-profit and stop-loss logic into the strategy, such as trailing stop-loss and volatility-based stop-loss, to control single-trade risk and improve the strategy's risk-reward ratio.

3. Dynamic parameter optimization: For different market environments, periodically perform dynamic optimization on parameters such as moving average periods to enable the strategy to adapt to market changes and improve robustness.

4. Multi-factor combination: Combine the dual moving average crossover signals with other effective quantitative factors (such as momentum, value, volume, etc.) to form a more robust and effective multi-factor strategy.

#### Summary
The Dual Moving Average Crossover Strategy is a simple and classic trend-following strategy that captures price trends through the crossover signals of two moving averages with different periods, suitable for trending markets. However, this strategy also has issues such as lag and difficulty in parameter optimization, requiring combinations with other methods for optimization and improvement, such as trend filtering, dynamic parameter optimization, multi-factor combination, etc., to enhance the strategy's applicability and robustness. Overall, the Dual Moving Average Crossover Strategy can serve as one of the foundational strategies in quantitative trading, worthy of learning and research by quantitative enthusiasts.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-08 00:00:00
end: 2024-05-13 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © SustainableInvestment

//@version=5
strategy("Moving average strategy (이동평균선 전략)", overlay=true)

// === INPUTS ===

basisType   = input.string(defval = "EMA", title = "MA Type: SMA, EMA, DEMA, TEMA, WMA, VWMA ",options=["SMA", "EMA", "DEMA", "TEMA", "WMA", "VWMA"])
shortLen    = input.int(defval = 1, title = "Short MA Period", minval = 1)
longLen    = input.int(defval = 20, title = "Long MA Period", minval = 1)
price       = input.string(defval = "Typical", title = "Price Type : Close, High, Open, Low, Typical, Center ",options=["Close", "High", "Open", "Low", "Typical", "Center"])

// === BASE FUNCTIONS ===
// 가격 종류 설정
priceType(price) =>
    Typical = (high+low+close)/3
    Center  = (high+low) / 2
    price=="High"?high : price=="Low"?low : price=="Open"?open : price=="Typical"?Typical : price=="Center"?Center : close

// 이동평균선 종류 설정
variant(type, src, len) =>
    v1 = ta.sma(src, len)                                                  // Simple
    v2 = ta.ema(src, len)                                                  // Exponential
    v3 = 2 * v2 - ta.ema(v2, len)                                          // Double Exponential
    v4 = 3 * (v2 - ta.ema(v2, len)) + ta.ema(ta.ema(v2, len), len)         // Triple Exponential
    v5 = ta.wma(src, len)                                                  // Weighted
    v6 = ta.vwma(src, len)                                                 // Volume Weighted
    
    type=="EMA"?v2 : type=="DEMA"?v3 : type=="TEMA"?v4 : type=="WMA"?v5 : type=="VWMA"?v6 : v1

longCondition = ta.crossover(variant(basisType, priceType(price), shortLen), variant(basisType, priceType(price), longLen))
if (longCondition)
    strategy.entry("Long Entry", strategy.long)

exitCondition = ta.crossunder(variant(basisType, priceType(price), shortLen), variant(basisType, priceType(price), longLen))
if (exitCondition)
    strategy.close("Long Entry","Long Exit")

```

> Detail

https://www.fmz.com/strategy/451389

> Last Modified

2024-05-14 15:37:54
