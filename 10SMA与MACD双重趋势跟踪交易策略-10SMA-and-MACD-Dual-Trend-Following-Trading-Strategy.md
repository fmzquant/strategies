
> Name

10SMA与MACD双重趋势跟踪交易策略-10SMA-and-MACD-Dual-Trend-Following-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/157d56d28188a46a65a.png)

#### Overview
This strategy utilizes two technical indicators, the 10-day Simple Moving Average (10SMA) and the Moving Average Convergence Divergence (MACD), to determine the trend direction of the price and make trading decisions based on their crossover signals. When the price crosses above the 10SMA and the MACD fast line crosses above the slow line, a long signal is generated; when the price crosses below the 10SMA and the MACD fast line crosses below the slow line, the long position is closed. The strategy aims to capture trending opportunities in the market while improving the reliability of signals through the confirmation of two indicators.

#### Strategy Principle
1. Calculate the 10-day Simple Moving Average (10SMA) as a reference for determining the price trend. When the price is running above the 10SMA, it indicates a bullish trend; otherwise, it indicates a bearish trend.
2. Calculate the MACD indicator, including the MACD fast line, slow line, and histogram. The MACD indicator reflects the strength and direction of the price trend by performing double smoothing on the difference between the short-term and long-term moving averages.
3. Generate trading signals:
   - Long signal: The current closing price crosses above the 10SMA, and the MACD fast line crosses above the MACD slow line.
   - Close long signal: The current closing price crosses below the 10SMA, and the MACD fast line crosses below the MACD slow line.
4. Execute trades based on the trading signals:
   - When a long signal appears, open a long position.
   - When a close long signal appears, close all long positions.

The core of this strategy is to determine the trend using the relationship between the price and the 10SMA, as well as the crossover of the MACD fast and slow lines. The confirmation from both indicators can improve the validity and reliability of signals to a certain extent.

#### Advantage Analysis
1. Simple and easy to use: The strategy only uses two common technical indicators, with simple principles that are easy to calculate and apply.
2. Trend following: By combining the 10SMA and MACD, the strategy can effectively capture and follow the medium to long-term trends in the market.
3. Noise filtering: Compared to using price or a single indicator alone to generate signals, the confirmation from two indicators can filter out market noise and false signals to a certain extent.
4. High adaptability: The strategy is not very sensitive to parameter selection and has strong adaptability, making it applicable to different markets and instruments.

#### Risk Analysis
1. Lag risk: Moving averages and MACD are lagging indicators, and trading signals may have a certain lag relative to market movements, resulting in missing the best entry timing or reduced profit potential.
2. Choppy market risk: In choppy markets, the price and indicators may experience frequent crossovers, generating trading signals that lead to overtrading and increased transaction costs.
3. Unexpected event risk: The strategy mainly generates trading signals based on technical indicators and does not consider the impact of fundamental factors and unexpected events, which may result in significant drawdowns in the face of black swan events.
4. Parameter optimization risk: The performance of the strategy will be affected by the selection of parameters, and different parameters may produce different results, leading to the risk of parameter optimization.

#### Optimization Directions
1. Add other filtering conditions: Consider adding other technical indicators or conditions, such as trading volume, volatility, etc., to further improve the reliability and effectiveness of signals.
2. Optimize take profit and stop loss: Set appropriate take profit and stop loss conditions based on market characteristics and personal risk preferences to control the risk exposure and risk-reward ratio of each trade.
3. Dynamic parameter optimization: Use parameter optimization methods to dynamically adjust indicator parameters based on different market conditions and instrument characteristics to adapt to market changes.
4. Combine with fundamental analysis: Combine technical analysis with fundamental analysis, considering the impact of important economic data, policy events, and other factors on the market to improve the comprehensiveness and effectiveness of the strategy.

#### Summary
The 10SMA and MACD Dual Trend Following Trading Strategy combines two commonly used technical indicators to capture medium to long-term trending opportunities in the market in a simple and easy-to-use manner. Compared to using a single indicator, the confirmation from two indicators can improve the reliability and effectiveness of signals to a certain extent while also having a certain level of adaptability. However, the strategy also faces risks such as lag, choppy markets, and unexpected events. In practical application, appropriate optimization and improvements need to be made based on market characteristics and personal preferences, such as adding other filtering conditions, optimizing take profit and stop loss, dynamic parameter optimization, and combining with fundamental analysis to further enhance the robustness and profitability of the strategy.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-06-01 00:00:00
end: 2024-06-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("10SMA and MACD Strategy", overlay=true)

// Input parameters
length = input(10, title="SMA Length")
macdFastLength = input(12, title="MACD Fast Length")
macdSlowLength = input(26, title="MACD Slow Length")
macdSignalSmoothing = input(9, title="MACD Signal Smoothing")

// Calculate 10SMA
sma10 = ta.sma(close, length)
plot(sma10, title="10SMA", color=color.blue)

// Calculate MACD
[macdLine, signalLine, _] = ta.macd(close, macdFastLength, macdSlowLength, macdSignalSmoothing)
plot(macdLine, title="MACD Line", color=color.red)
plot(signalLine, title="Signal Line", color=color.green)

// Strategy conditions
longCondition = ta.crossover(close, sma10) and ta.crossover(macdLine, signalLine)
shortCondition = ta.crossunder(close, sma10) and ta.crossunder(macdLine, signalLine)

// Plot buy and sell signals
plotshape(series=longCondition, location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(series=shortCondition, location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

// Strategy execution
if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.close("Long")
```

> Detail

https://www.fmz.com/strategy/453645

> Last Modified

2024-06-07 14:46:36
