
> Name

布林带与移动平均线结合的相对强弱指标交易策略Bollinger-Bands-and-Moving-Average-Combined-with-Relative-Strength-Index-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/138ad22ffe7ce5ce163.png)

## Overview

This strategy utilizes three technical indicators: Bollinger Bands, 3-day Exponential Moving Average (EMA), and Relative Strength Index (RSI), combining their crossover signals to construct a complete trading system. When the price breaks through the lower Bollinger Band while crossing above the 3-day EMA, and the RSI is below 30, a buy signal is generated; when the price breaks through the upper Bollinger Band while crossing below the 3-day EMA, and the RSI is above 70, a sell signal is generated.

## Strategy Principle

1. Bollinger Bands consist of three lines: the middle line is the moving average of price, and the upper and lower bands are calculated based on the standard deviation of price. It is mainly used to measure market volatility and identify overbought and oversold conditions.

2. The 3-day EMA is an exponential moving average based on the closing prices of the recent 3 days, which can quickly respond to price changes and is a short-term trend-following indicator.

3. RSI measures the magnitude and speed of price changes over a certain period to assess the overbought and oversold conditions of a stock. When RSI is below 30, it indicates an oversold condition; when RSI is above 70, it indicates an overbought condition.

4. The strategy logic is as follows:
   - When the closing price crosses above the lower Bollinger Band while crossing above the 3-day EMA, and the RSI is below 30, it is considered that the stock may be about to reverse and rise, generating a buy signal.
   - When the closing price crosses below the upper Bollinger Band while crossing below the 3-day EMA, and the RSI is above 70, it is considered that the stock may be about to reverse and fall, generating a sell signal.
   - Simultaneously satisfying the signals of Bollinger Bands, EMA, and RSI can effectively filter out many false signals and improve trading accuracy.

## Advantage Analysis

1. Bollinger Bands can quantify market volatility, 3-day EMA closely follows price movements, and RSI can determine overbought and oversold conditions. The three indicators complement each other, forming a robust trading system.

2. Combining the signals of the three indicators simultaneously, the strict trading conditions can avoid frequent trading, thereby reducing transaction costs.

3. It can capture good trading opportunities in both trending and oscillating markets, with strong applicability.

4. The code logic is clear and interpretable, making it easy to understand and optimize.

## Risk Analysis

1. In unilateral trending markets, the trading frequency of this strategy may be low, missing some trend profits.

2. For intraday markets with drastic fluctuations, trading signals may be slightly lagging.

3. The selection of strategy parameters will have a significant impact on trading results and needs to be optimized according to different underlying assets and market characteristics.

4. The strategy does not set stop-loss and take-profit levels, which may bear greater risks when the market fluctuates drastically.

To address the above risks, we can consider introducing trend judgment indicators to improve performance in trending markets, optimizing the data frequency when calculating signals, conducting in-depth analysis of optimal parameter ranges, and setting reasonable take-profit and stop-loss conditions.

## Optimization Direction

1. Introduce more effective technical indicators, such as the trend indicator MACD, to effectively capture trading opportunities in both oscillating and trending markets.

2. Optimize parameter selection by conducting comprehensive backtesting on historical data to find the optimal parameter combination and improve strategy stability and profitability.

3. Consider adding position management and capital management rules to control the proportion of funds in a single transaction and dynamically adjust positions to better control risks.

4. Set reasonable take-profit and stop-loss conditions to reduce the maximum loss of a single transaction and allow profitable trades to fully profit.

5. Design response mechanisms for different market conditions, such as reducing trading frequency in oscillating markets and increasing holding time in trending markets.

Through the above optimizations, the risk-reward ratio of the strategy can be further improved to better adapt to the changing market environment.

## Summary

This article introduces a trading strategy based on Bollinger Bands, 3-day EMA, and RSI indicators. By using the crossover signals of the three indicators, the strategy constructs strict buying and selling conditions that can effectively filter out most false signals. The strategy logic is clear and applicable to both trending and oscillating markets, with broad applicability. However, this strategy also has some limitations, such as low trading frequency in trending markets and a lack of position management and stop-loss/take-profit mechanisms. Therefore, it still needs to be continuously optimized and improved in practice to obtain more robust trading performance. Overall, this strategy provides a trading framework based on multiple indicator crossovers, offering new ideas for quantitative traders. On this basis, indicator selection and parameter settings can be flexibly adjusted to develop more quantitative strategies that adapt to different markets, enriching the strategy library of quantitative trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Bollinger Bands Length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|2|Bollinger Bands Multiplier|
|v_input_4|14|RSI Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-09 00:00:00
end: 2024-03-10 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Custom Strategy", overlay=true)

// Input parameters
length = input(20, title="Bollinger Bands Length")
src = input(close, title="Source")
mult = input(2.0, title="Bollinger Bands Multiplier")

// Bollinger Bands
basis = ta.sma(src, length)
upper_band = basis + mult * ta.stdev(src, length)
lower_band = basis - mult * ta.stdev(src, length)

// 3 EMA
ema3 = ta.ema(close, 3)

// RSI
rsi_length = input(14, title="RSI Length")
rsi_source = close
rsi_value = ta.rsi(rsi_source, rsi_length)

// Strategy logic
strategy.entry("Buy", strategy.long, when=ta.crossover(close, lower_band) and ta.crossover(close, ema3) and rsi_value < 30)
strategy.entry("Sell", strategy.short, when=ta.crossover(close, upper_band) and ta.crossunder(close, ema3) and rsi_value > 70)

// Plotting
plot(upper_band, color=color.blue)
plot(lower_band, color=color.blue)
plot(ema3, color=color.green, title="3 EMA")
hline(70, "Overbought", color=color.red)
hline(30, "Oversold", color=color.green)

```

> Detail

https://www.fmz.com/strategy/444338

> Last Modified

2024-03-11 11:02:44
