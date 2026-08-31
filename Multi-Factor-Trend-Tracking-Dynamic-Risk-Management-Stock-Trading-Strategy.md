
> Name

Multi-Factor-Trend-Tracking-Dynamic-Risk-Management-Stock-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d87a98e73df07691a32c.png)
![IMG](https://www.fmz.com/upload/asset/2d901944036b52b02e0b7.png)





#### Overview

This strategy is a multi-factor trend tracking dynamic risk management stock trading strategy that aims to improve trading signal accuracy and overall performance by comprehensively using multiple technical indicators. The strategy focuses on trend determination, momentum confirmation, volatility filtering, and risk control, providing investors with a systematic trading approach.

#### Strategy Principles

The strategy principle is based on comprehensive analysis of six key indicators:

1. G-Channel Indicator: Using 20-day and 50-day Exponential Moving Averages (EMA) to determine market trend direction.
2. Fantel Variable Moving Average (VMA) Confirmation: Comparing 14-day and 28-day Simple Moving Averages (SMA) to verify trend momentum.
3. Coral Trend Confirmation: Determining short-term trend direction through 10-day and 20-day SMA.
4. ADX Volatility Confirmation: Evaluating trend strength and market volatility.
5. Volume Confirmation: Checking if volume is significantly higher than the 20-day average volume.
6. Price Relative to 50-day SMA: Judging price position in the long-term trend.

#### Strategy Advantages

1. Multi-Factor Verification: Significantly reducing false signal probability through six different dimensional indicator cross-validation.
2. Dynamic Risk Management: Using Average True Range (ATR) to dynamically adjust stop-loss and take-profit.
3. Flexible Entry and Exit Mechanism: Combining trend, momentum, volatility, and volume multiple conditions.
4. Risk-Reward Ratio Optimization: Designing a 2:1 risk-reward ratio.
5. Low-Frequency Trading: Reducing trade frequency and lowering transaction costs.

#### Strategy Risks

1. Complex Long-Short Judgment: Multi-factor verification may cause signal generation delay.
2. Parameter Sensitivity: Fixed parameters may perform poorly in different market environments.
3. Volume Limitations: Low volume may increase trading misjudgment risks.
4. RSI Extreme Value Limitations: Potentially missing some trading opportunities.

#### Strategy Optimization Directions

1. Adaptive Parameters: Develop dynamic parameter adjustment mechanisms.
2. Machine Learning Optimization: Introduce machine learning algorithms to optimize entry and exit timing.
3. Multi-Market Adaptability: Customize parameters for different varieties and market environments.
4. Incorporate Sentiment Indicators: Introduce market sentiment indicators to improve strategy stability.

#### Summary

This strategy constructs a relatively robust stock trading system through multi-factor and multi-dimensional trading signal verification. Its core advantage lies in reducing trading risks, but continuous optimization and adaptation to market changes are still necessary.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-31 00:00:00
end: 2025-03-29 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("G-Channel Strategy for Stocks", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// === 1️⃣ G-Channel Indicator ===
gChannel = ta.ema(close, 20) > ta.ema(close, 50) ? 1 : 0

// === 2️⃣ Fantel VMA Confirmation ===
fvma = ta.sma(close, 14) > ta.sma(close, 28) ? 1 : 0

// === 3️⃣ Coral Trend Confirmation ===
coral = ta.sma(close, 10) > ta.sma(close, 20) ? 1 : 0

// === 4️⃣ ADX Confirmation (Volatility) ===
adx = ta.ema(ta.rma(ta.atr(14), 14), 14)
adxMa = ta.sma(adx, 14)
adxConfirmed = adx > adxMa ? 1 : 0

// === 5️⃣ Volume Confirmation ===
volConfirm = volume > ta.sma(volume, 20) * 1.3 ? 1 : 0

// === 6️⃣ Price Above 50-Day SMA ===
sma50 = ta.sma(close, 50)
priceAboveSMA = close > sma50 ? 1 : 0

// === ? ENTRY CONDITIONS (LONG & SHORT) ===
longCondition = gChannel and fvma and coral and adxConfirmed and volConfirm and priceAboveSMA
shortCondition = not gChannel and not fvma and not coral and adxConfirmed and volConfirm and close < sma50

// === 7️⃣ ATR Stop-Loss (Lower Than Crypto) ===
atr = ta.atr(14)
stopLoss = close - (atr * 2.0) // Adjusted for stocks
takeProfit = close + (atr * 4.0) // 2:1 Risk/Reward Ratio

// === ? EXECUTE TRADES ===
if (longCondition)
    strategy.entry("Long", strategy.long)
    strategy.exit("Take Profit", from_entry="Long", limit=takeProfit, stop=stopLoss)

if (shortCondition)
    strategy.entry("Short", strategy.short)
    strategy.exit("Take Profit", from_entry="Short", limit=close - (atr * 4.0), stop=close + (atr * 2.0))

// === 8️⃣ RSI EXIT (Stocks Exit Earlier) ===
rsi = ta.rsi(close, 14)
if (rsi > 75) // Lower exit threshold for stocks
    strategy.close("Long")
if (rsi < 25)
    strategy.close("Short")

// === 9️⃣ Volume-Based Exit ===
if (volume < ta.sma(volume, 20) * 0.5)
    strategy.close("Long")
    strategy.close("Short")
```

> Detail

https://www.fmz.com/strategy/488898

> Last Modified

2025-03-31 16:47:17
