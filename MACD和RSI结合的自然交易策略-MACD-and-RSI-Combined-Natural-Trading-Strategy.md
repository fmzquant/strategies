
> Name

MACD和RSI结合的自然交易策略-MACD-and-RSI-Combined-Natural-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11b63fa428cdeb10c90.png)


#### Overview
This strategy combines two technical indicators, MACD and RSI, using MACD crossover signals and RSI overbought/oversold signals to determine trading timing. Meanwhile, the strategy also introduces the Weighted Moving Average (WMA) as an auxiliary judgment to improve the reliability of the strategy. The strategy runs on a 1-hour timeframe, opening long positions when MACD forms a golden cross and RSI is above 50, and opening short positions when MACD forms a death cross and RSI is below 50. At the same time, it closes long positions when RSI is above 70 and closes short positions when RSI is below 30. In addition, the strategy sets variables for multiple timeframes to judge trend changes at different time scales.

#### Strategy Principles
The core of this strategy is the combined use of two technical indicators, MACD and RSI. MACD is composed of the difference between the fast line (short-term moving average) and the slow line (long-term moving average), which can reflect market trend changes. When the fast line crosses above the slow line, it forms a golden cross, indicating an upward trend; conversely, it forms a death cross, indicating a downward trend. RSI is an indicator that measures the overbought and oversold state of the market. When RSI is above 70, it indicates that the market is overbought and may face a pullback risk; when RSI is below 30, it indicates that the market is oversold and may usher in a rebound opportunity.

This strategy combines MACD and RSI, using MACD's trend judgment and RSI's overbought/oversold judgment to more accurately grasp trading timing. At the same time, the strategy also introduces the Weighted Moving Average (WMA) as an auxiliary judgment. WMA places more emphasis on recent prices compared to ordinary moving averages, and can more sensitively reflect price changes.

In addition, the strategy sets variables for multiple timeframes (such as 15 minutes, 30 minutes, 1 hour, 2 hours, etc.) to judge trend changes at different time scales. This multi-timeframe analysis method can help the strategy grasp market trends more comprehensively and improve the accuracy of decision-making.

#### Advantage Analysis
1. It combines two effective technical indicators, MACD and RSI, which can better grasp market trends and overbought/oversold conditions, improving the accuracy of trading decisions.
2. It introduces the Weighted Moving Average (WMA) as an auxiliary judgment. WMA places more emphasis on recent prices and can more sensitively reflect price changes, improving the adaptability of the strategy.
3. It sets variables for multiple timeframes, realizing joint analysis of multiple timeframes, which can more comprehensively grasp market trends and improve the reliability of decisions.
4. It runs on a 1-hour timeframe, with a moderate trading frequency, which can better balance trading costs and returns.
5. It sets clear opening and closing conditions, such as MACD golden cross/death cross, RSI overbought/oversold, etc., which are easy to understand and implement.

#### Risk Analysis
1. Both MACD and RSI are lagging indicators. When the market changes rapidly, there may be a disconnect between indicator signals and prices, leading to false signals.
2. The strategy runs on a single timeframe (1 hour), which may not fully capture trend changes at different time scales, and has certain limitations.
3. The strategy lacks risk control measures, such as stop-loss and position management, which may face greater drawdown risks when the market fluctuates violently.
4. The parameter settings of the strategy (such as the fast and slow line periods of MACD, the time period of RSI, etc.) may need to be adjusted according to different market conditions. The selection of parameters has certain subjectivity and uncertainty.

#### Optimization Direction
1. Introduce more technical indicators, such as Bollinger Bands, ATR, etc., to build more robust trading signals and improve the reliability of the strategy.
2. Optimize the selection of the strategy's timeframes, such as adding higher-level timeframes like daily charts to better grasp the big trend, while setting specific entry points on lower-level timeframes (such as 15 minutes, 5 minutes, etc.) to improve the precision of the strategy.
3. Add risk control measures, such as setting reasonable stop-loss positions and limiting the size of positions, to control drawdown risks.
4. Optimize the parameters of the strategy. Machine learning and other methods can be used to automatically find the optimal parameter combination based on historical data, reducing the impact of subjective judgment.
5. Consider introducing other factors such as market sentiment, trading volume, open interest, etc., to more comprehensively grasp the market state and improve the adaptability of the strategy.

#### Summary
This strategy combines two effective technical indicators, MACD and RSI, while introducing WMA as an auxiliary judgment to make trading decisions on a 1-hour timeframe. The strategy logic is clear, easy to understand and implement, and can better grasp market trends and overbought/oversold conditions, with certain feasibility. However, the strategy also has some limitations and risks, such as lag, single timeframe, lack of risk control, etc. In the future, the strategy can be improved in terms of introducing more indicators, optimizing timeframes, strengthening risk control, parameter optimization, etc., to enhance its robustness and profitability. Overall, this strategy provides a way of thinking for quantitative trading, but still needs to be continuously optimized and refined in practice.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-05-01 00:00:00
end: 2024-05-31 23:59:59
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Improved MACD and RSI Trading Strategy", overlay=true, initial_capital=10000, commission_type=strategy.commission.percent, commission_value=0.01, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// MACD 設置
fast_length = input(12, title="MACD Fast Length")
slow_length = input(26, title="MACD Slow Length")
signal_smoothing = input(9, title="MACD Signal Smoothing")

// RSI 設置
input_rsi_length = input.int(14, title="RSI Length")
input_rsi_source = input(close, "RSI Source")

RSI = ta.rsi(input_rsi_source, input_rsi_length)

// 計算MACD和信號線
[macdLine, signalLine, _] = ta.macd(close, fast_length, slow_length, signal_smoothing)

// 自然交易理論：利用MACD和RSI的結合
ma(source, length, type) =>
    switch type
        "SMA" => ta.sma(source, length)
        "EMA" => ta.ema(source, length)
        "SMMA (RMA)" => ta.rma(source, length)
        "WMA" => ta.wma(source, length)
        "VWMA" => ta.vwma(source, length)

maTypeInput = input.string("SMA", title="Moving Average Type", options=["SMA", "EMA", "SMMA (RMA)", "WMA", "VWMA"], group="MA Settings")
maLengthInput = input.int(14, title="Moving Average Length", group="MA Settings")

macdMA = ma(macdLine, maLengthInput, maTypeInput)

// 設置交易信號
longCondition = ta.crossover(macdLine, signalLine) and macdLine > macdMA and RSI < 70
shortCondition = ta.crossunder(macdLine, signalLine) and macdLine < macdMA and RSI > 30

// 定義時間框架
tf_15m = ta.change(RSI, 15) > 0 ? 1 : 0
tf_30m = ta.change(RSI, 30) > 0 ? 1 : 0
tf_1h = ta.change(RSI, 60) > 0 ? 1 : 0
tf_2h = ta.change(RSI, 120) > 0 ? 1 : 0
tf_4h = ta.change(RSI, 240) > 0 ? 1 : 0
tf_6h = ta.change(RSI, 360) > 0 ? 1 : 0
tf_8h = ta.change(RSI, 480) > 0 ? 1 : 0
tf_12h = ta.change(RSI, 720) > 0 ? 1 : 0
tf_1d = ta.change(RSI, 1440) > 0 ? 1 : 0

// 設置開倉、平倉和空倉條件
if (longCondition and tf_1h and RSI > 50)
    strategy.entry("Long", strategy.long)
if (shortCondition and tf_1h and RSI < 50)
    strategy.entry("Short", strategy.short)

if (tf_1h and RSI > 70)
    strategy.close("Long")
if (tf_1h and RSI < 30)
    strategy.close("Short")

// 加入其他策略
// 定義加權平均價格
wma(source, length) =>
    wma = 0.0
    sum = 0.0
    sum_wts = 0.0
    for i = 0 to length - 1
        wts = (length - i) * (length - i)
        sum := sum + source[i] * wts
        sum_wts := sum_wts + wts
    wma := sum / sum_wts

wmaLength = input.int(20, title="WMA Length", group="Other Strategies")
wmaValue = wma(close, wmaLength)

// 設置交易信號
longWMACondition = close > wmaValue
shortWMACondition = close < wmaValue

if (longWMACondition and tf_1h and RSI > 50)
    strategy.entry("Long WMA", strategy.long)
if (shortWMACondition and tf_1h and RSI < 50)
    strategy.entry("Short WMA", strategy.short)

if (tf_1h and RSI > 70)
    strategy.close("Long WMA")
if (tf_1h and RSI < 30)
    strategy.close("Short WMA")

// 繪製MACD和RSI
plot(macdLine, color=color.blue, title="MACD Line")
plot(signalLine, color=color.red, title="Signal Line")

```

> Detail

https://www.fmz.com/strategy/453287

> Last Modified

2024-06-03 17:22:03
