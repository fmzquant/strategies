
> Name

Dual-MACD-Optimization-Strategy-Combining-Trend-Following-and-Momentum-Trading

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1aa90887ef7af2112f2.png)


#### Overview
This strategy is an improved version of the MACD indicator-based trading strategy. It combines the trend-following characteristics of the MACD indicator with the ideas of momentum trading, generating trading signals by analyzing the differences between the fast and slow moving averages. Meanwhile, the strategy also introduces optimization methods such as trend confirmation, signal delay confirmation, fixed percentage stop-loss and take-profit, to improve the robustness and profitability of the strategy.

#### Strategy Principle
The core of this strategy is the MACD indicator, which consists of the difference between the fast moving average (EMA) and the slow moving average (EMA). When the fast EMA crosses the slow EMA, it generates a buy or sell signal. Specifically, when the MACD line breaks through the signal line from bottom to top, it generates a buy signal; when the MACD line falls below the signal line from top to bottom, it generates a sell signal.

In addition to the basic MACD crossover signals, the strategy also introduces a trend confirmation mechanism. It compares with the simple moving average (SMA) to determine whether the current market is in an uptrend or a downtrend. Only when a buy signal appears in an uptrend, or a sell signal appears in a downtrend, will the trading operation be executed. This effectively avoids false signals generated in a oscillating market.

Moreover, the strategy extends the signal confirmation time window. That is, only when the current candlestick satisfies the buying or selling conditions and the previous candlestick also satisfies the same conditions, the corresponding transaction will be executed. This further improves the reliability of the signals.

Finally, the strategy sets fixed percentage stop-loss and take-profit levels. Once a trade is carried out, the stop-loss and take-profit prices will be calculated based on the entry price, and the position will be automatically closed once these prices are reached. This helps to control the risk and return of a single transaction.

#### Strategy Advantages
1. Dual trend confirmation: Combining the trend judgment of MACD indicator and simple moving average can effectively filter out false signals in the oscillating market.
2. Signal delay confirmation: Requiring two consecutive candlesticks to simultaneously satisfy the buying or selling conditions improves the reliability of the signals.
3. Fixed stop-loss and take-profit: Setting stop-loss and take-profit levels based on fixed percentages helps control risks and lock in profits.
4. Flexible parameters: The parameters such as the length of the fast and slow lines of the MACD indicator, the length of the signal line, and the SMA period for trend judgment can be flexibly set to adapt to different market conditions.

#### Strategy Risks
1. Parameter optimization risk: The strategy contains multiple parameters, and different combinations of parameters may bring completely different results. If the parameter optimization is not done well, it may lead to poor performance of the strategy in actual application.
2. Trend recognition risk: The strategy relies on correct judgment of trends. If there are misjudgments in trend recognition, it may lead to wrong trading decisions.
3. Single indicator risk: Although the strategy is optimized based on MACD, it still mainly relies on a single indicator. In some specific market conditions, a single indicator may fail.
4. Backtesting data limitations: The effectiveness of the strategy largely depends on the quality of historical data. If the backtesting data differs greatly from actual market conditions, it may underestimate the actual risk of the strategy.

#### Strategy Optimization Directions
1. Combine with other technical indicators: Consider introducing other technical indicators, such as RSI, Bollinger Bands, etc., to analyze the market from multiple dimensions and improve the accuracy of signals.
2. Dynamic stop-loss and take-profit: Dynamically adjust the proportion of stop-loss and take-profit according to market volatility to better adapt to market changes.
3. Introduce position management: Dynamically adjust the position size of each transaction according to factors such as the strength of the market trend and the quality of trading signals to better control risks.
4. Introduce machine learning: Try to combine machine learning algorithms with the strategy to automatically optimize parameter selection by learning from historical data, improving the adaptability of the strategy.

#### Summary
This strategy is an improved trading strategy based on the MACD indicator. Through trend confirmation, signal delay confirmation, fixed stop-loss and take-profit, and other methods, it improves the robustness and profit potential of the strategy. However, it also faces risks in parameter optimization, trend recognition, single indicators, backtesting data, and other aspects. In the future, we can consider optimizing the strategy from aspects such as combining other indicators, dynamic stop-loss and take-profit, position management, and machine learning to further improve its practical application effect.



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
// © sligetit

//@version=5
strategy("Improved MACD_VXI Strategy", overlay=true)

// Calculate MACD and Signal Line
fastLength = input.int(13, title="Fast Length")
slowLength = input.int(21, title="Slow Length")
signalLength = input.int(8, title="Signal Length")

fastMA = ta.ema(close, fastLength)
slowMA = ta.ema(close, slowLength)
macd = fastMA - slowMA
signal = ta.sma(macd, signalLength)

// Plot MACD and Signal Line
plot(macd, color=color.red, linewidth=1)
plot(signal, color=color.blue, linewidth=2)

// Calculate Cross Signals with Trend Confirmation
smaPeriod = input.int(50, title="SMA Period")
sma = ta.sma(close, smaPeriod)

trendUp = close > sma
trendDown = close < sma

crossOver = ta.crossover(signal, macd)
crossUnder = ta.crossunder(signal, macd)

buySignal = crossOver and trendUp
sellSignal = crossUnder and trendDown

// Execute Buy/Sell Operations
if buySignal
    strategy.entry("Buy", strategy.long)
if sellSignal
    strategy.entry("Sell", strategy.short)

// Extend Signal Confirmation Time Window
longSignal = crossOver[1] and trendUp[1]
shortSignal = crossUnder[1] and trendDown[1]

if longSignal
    strategy.entry("Buy", strategy.long)
if shortSignal
    strategy.entry("Sell", strategy.short)

// Set Fixed Percentage Stop Loss and Take Profit
stopLossPercent = input.float(1, title="Stop Loss (%)") / 100
takeProfitPercent = input.float(2, title="Take Profit (%)") / 100

stopLossPrice = strategy.position_avg_price * (1 - stopLossPercent)
takeProfitPrice = strategy.position_avg_price * (1 + takeProfitPercent)

strategy.exit("Stop Loss/Profit", "Buy", stop=stopLossPrice, limit=takeProfitPrice)
strategy.exit("Stop Loss/Profit", "Sell", stop=stopLossPrice, limit=takeProfitPrice)
```

> Detail

https://www.fmz.com/strategy/451413

> Last Modified

2024-05-14 17:35:54
