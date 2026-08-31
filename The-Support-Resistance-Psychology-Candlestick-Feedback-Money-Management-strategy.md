
> Name

The-Support-Resistance-Psychology-Candlestick-Feedback-Money-Management-strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1038f58dc0747bdad4c.png)

## Overview

The Support/Resistance-Psychology-Candlestick Feedback-Money Management strategy is a quantitative trading strategy based on technical analysis and money management. This strategy comprehensively considers the market's support and resistance levels, traders' psychological sentiment, price feedback signals, and strict money management rules, striving to obtain stable returns while controlling risks.

## Strategy Principles

The core logic of this strategy includes the following parts:

1. **Identification of Support and Resistance Levels**: Input predefined support and resistance price levels through the `input` function. When the market price breaks through these key levels, important trading signals will be formed.

2. **Traders' Psychological Sentiment**: Introduce bullish sentiment indicator `bullPsych` and bearish sentiment indicator `bearPsych` to measure market sentiment. When the price exceeds the bullish sentiment threshold, it tends to go long; when it is lower than the bearish sentiment threshold, it tends to go short.

3. **Candlestick Feedback Condition**: `feedbackCond` serves as a feedback signal. After the price reaches the support/resistance level and meets the sentiment condition, it determines whether to enter a trade based on the feedback condition.

4. **Risk-Reward Ratio**: `rewardRiskRatio` defines the ratio between the strategy's target profit and risk tolerance.

5. **Position Sizing**: Dynamically calculate the position size of each trade based on the account balance `strategy.equity` and the risk percentage of each trade `riskPerTradePercent`, realizing quantitative risk control.

6. **Entry Signals**: Combine support/resistance level breakout, psychological sentiment indicators, and candlestick feedback conditions, using the `strategy.entry` function to capture long and short signals.

7. **Take Profit and Stop Loss**: Dynamically calculate take profit price and stop loss price based on the risk-reward ratio. Use the `strategy.exit` function for conditional exit, strictly controlling the profit and loss ratio of each trade.

8. **Visualization**: Use the `plot` and `plotshape` functions to draw support/resistance level lines and mark candlestick feedback signals on the chart, providing intuitive references for trading decisions.

## Advantage Analysis

The advantages of the Support/Resistance-Psychology-Candlestick Feedback-Money Management strategy are:

1. It integrates technical analysis factors and market sentiment factors, forming a multi-dimensional comprehensive trading logic with stronger adaptability and robustness.

2. The setting of candlestick feedback conditions can effectively filter noise signals and improve signal validity.

3. Fixed risk-reward ratio position sizing control makes the strategy more rigorous in terms of money management, effectively avoiding excessive risk exposure of a single trade.

4. The dynamic calculation of take profit and stop loss levels makes the profit and loss ratio of each trade controllable, which is conducive to long-term stable equity curve performance.

5. Key indicator parameters can be flexibly adjusted through the `input` function, providing strong customizability and tunability.

## Risk Analysis

1. The selection of support and resistance levels has certain subjectivity, and incorrect selection may lead to frequent misjudgments.

2. Market sentiment indicators are not absolutely indicative of price trends and may fail in extreme market conditions.

3. The effectiveness of feedback signals depends on the reliability of candlestick patterns, but the quality of candlestick signals may decline in volatile markets.

4. Fixed risk-reward ratio strategies may miss higher potential returns during significant market fluctuations.

To address the above risks, the following aspects can be optimized and improved:

- For support and resistance levels, more technical indicators (such as Bollinger Bands, trend lines, etc.) can be combined for dynamic confirmation.
- Under extreme market sentiment, sentiment signals can be calibrated by introducing trading volume indicators.
- For candlestick feedback signals, multi-timeframe filtering can be introduced to improve signal reliability.
- Under the premise of controllable risk, the risk-reward ratio can be appropriately increased for phases with stronger market trends to strive for higher returns.

## Optimization Direction

1. **Dynamic Identification of Support and Resistance Levels**: Fixed input of support and resistance levels may not adapt well to real-time market changes. Adaptive algorithms (such as adaptive moving averages, dynamic arbitrage channels, etc.) can be introduced to dynamically adjust support and resistance levels based on price trends and volatility conditions, improving the flexibility and accuracy of key level judgments.

2. **Comprehensive Trading Volume Indicators**: The current strategy mainly makes judgments based on price information itself, while trading volume is another important market signal. Trading volume-related indicators (such as volume-price divergence, OBV indicator, etc.) can be considered to be incorporated into the trading logic, forming multiple confirmations combining price and volume to improve signal reliability.

3. **Dynamic Configuration of Long and Short Positions**: Currently, the strategy's position ratio for long and short directions is fixed, which may not adapt well to trending markets. Methods for dynamic position adjustment (such as grid trading, market tracking models, etc.) can be explored to dynamically configure the proportion of long and short positions based on factors such as price trends and volatility, better capturing market trend opportunities.

4. **Optimization of Take Profit and Stop Loss Thresholds**: Fixed take profit and stop loss ratios may not accommodate the differentiation of market conditions. Adaptive take profit and stop loss algorithms (such as trailing stop, volatility stop, etc.) can be attempted to dynamically adjust take profit and stop loss thresholds based on characteristics such as price fluctuation amplitude and frequency, pursuing higher profit levels while controlling risks.

5. **Incorporation of Machine Learning Models**: Traditional technical indicators and rules, although simple and effective, may have limitations in dealing with complex market changes. Machine learning models (such as support vector machines, decision trees, neural networks, etc.) can be considered to be introduced into the strategy framework. By training and learning from historical data, deeper market patterns can be mined to assist or even replace some traditional trading rules, improving the adaptability and intelligence level of the strategy.

The above optimization directions can be selectively implemented based on actual needs and resource conditions. Through continuous iterative optimization, it is hoped to further enhance the robustness and profitability of the strategy.

## Summary

The Support/Resistance-Psychology-Candlestick Feedback-Money Management strategy is a comprehensive strategy that integrates various technical analysis elements and quantitative trading concepts. It constructs a relatively complete trading logic and risk management system through the organic combination of multiple dimensions such as support/resistance levels, market sentiment, feedback signals, and risk control. At the same time, this strategy also provides high flexibility and custom izability in the implementation process, allowing users to optimize parameters and adjust modules according to their own needs and market characteristics.

Of course, no strategy can be perfect. In practical applications, it will inevitably face various challenges and risks. The effectiveness of support/resistance level judgments, the reliability of market sentiment indicators, the noise interference of feedback signals, and the limitations of risk models are all aspects that need to be continuously optimized and improved in practice. By introducing dynamic resistance support levels, trading volume indicator verification, adaptive position configuration, dynamic optimization of take profit and stop loss, and machine learning, the adaptability and risk resistance of the strategy can be improved to a certain extent.

Overall, the Support/Resistance-Psychology-Candlestick Feedback-Money Management strategy provides a relatively simple and practical framework for quantitative trading practice. On the basis of mastering the core principles, through flexible optimization combination and rigorous practical testing, it is expected to become an effective tool for grasping market opportunities and controlling trading risks. There are no shortcuts in quantitative trading. Only through persistent learning and optimization, as well as prudent and rigorous risk control, can we stand undefeated in the volatile market.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|حمایت پیشرفته|
|v_input_2|200|مقاومت پیشرفته|
|v_input_3|70|روحیه خریداری|
|v_input_4|30|روحیه فروشنده|
|v_input_5|true|استفاده از پولبک|
|v_input_6|3|نسبت تارگت به ریسک|
|v_input_float_1|true|ریسک برای هر معامله (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-03-16 00:00:00
end: 2024-03-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("S/R-Psych-Cndl-Fdbck-MM", shorttitle="SRPCFMM", overlay=true)
// تعریف حمایت و مقاومت پیشرفته
supportLvl = input(100, title="حمایت پیشرفته")
resistanceLvl = input(200, title="مقاومت پیشرفته")

// روانشناسی کندل
bullPsych = input(70, title="روحیه خریداری")
bearPsych = input(30, title="روحیه فروشنده")

// پولبک
feedbackCond = input(true, title="استفاده از پولبک")

// نسبت تارگت به ریسک
rewardRiskRatio = input(3, title="نسبت تارگت به ریسک")

// مدیریت مالی
riskPerTradePercent = input.float(1, title="ریسک برای هر معامله (%)", minval=0)
riskAmount = strategy.equity * (riskPerTradePercent / 100)
// Define entry conditions and feedback condition
longCond = close > supportLvl and close > bullPsych
shortCond = close < resistanceLvl and close < bearPsych


// Execute trade entry with feedback condition
if (longCond and feedbackCond)
    strategy.entry("Long", strategy.long)
if (shortCond and feedbackCond)
    strategy.entry("Short", strategy.short)

// محاسبه تارگت و استاپ لاس بر اساس نسبت تارگت به ریسک
targetPriceLong = close + (high - low) * rewardRiskRatio
stopPriceLong = close - (high - low) * (riskPerTradePercent / 100)
targetPriceShort = close - (high - low) * rewardRiskRatio
stopPriceShort = close + (high - low) * (riskPerTradePercent / 100)

// اجرای خروج از معامله با حمایت و مقاومت و تارگت و استاپ لاس
strategy.exit("Take Profit/Stop Loss", from_entry="Long", loss=supportLvl, profit=targetPriceLong)
strategy.exit("Take Profit/Stop Loss", from_entry="Short", loss=resistanceLvl, profit=targetPriceShort)

// نمایش خطوط حمایت و مقاومت در نمودار
plot(supportLvl, color=color.green, linewidth=2, title="حمایت پیشرفته")
plot(resistanceLvl, color=color.red, linewidth=2, title="مقاومت پیشرفته")

// نمایش حجم پیشرفته
plotshape(series=na, title="حجم پیشرفته", color=color.purple, style=shape.triangleup, location=location.abovebar, size=size.small)

```

> Detail

https://www.fmz.com/strategy/445808

> Last Modified

2024-03-22 14:16:08
