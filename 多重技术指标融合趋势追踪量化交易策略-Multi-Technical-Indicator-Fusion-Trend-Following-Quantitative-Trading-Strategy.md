
> Name

多重技术指标融合趋势追踪量化交易策略-Multi-Technical-Indicator-Fusion-Trend-Following-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/172be7ebec2de06968c.png)


#### Overview
This strategy is a quantitative trading system that integrates three major technical indicators: Relative Strength Index (RSI), Moving Average (MA), and Bollinger Bands (BB). The strategy seeks optimal trading opportunities in market trends and volatility by comprehensively analyzing signals from multiple technical indicators. It uses MA20 and MA50 crossovers to judge medium-term trends, combined with RSI overbought/oversold signals and Bollinger Bands breakout/regression to build a complete trading decision system.

#### Strategy Principles
The core logic is based on three dimensions:
1. Trend Judgment: Uses MA20 and MA50 crossover relationships to determine market medium-term trends, with MA20 crossing above MA50 indicating an uptrend, and vice versa.
2. Momentum Judgment: Uses RSI indicator to judge market overbought/oversold conditions, with RSI below 25 entering oversold territory and above 80 entering overbought territory.
3. Volatility Judgment: Uses Bollinger Bands (BB30) channels to map price volatility ranges, with lower band breakout indicating oversold conditions and upper band breakout indicating overbought conditions.

Long conditions must simultaneously satisfy: RSI<25(oversold)+MA20>MA50(uptrend)+price<BB lower band(oversold)
Short conditions must simultaneously satisfy: RSI>80(overbought)+MA20<MA50(downtrend)+price>BB upper band(overbought)

#### Strategy Advantages
1. Multi-indicator Cross-validation: Improves trading signal reliability by integrating indicators from trend, momentum, and volatility dimensions.
2. Comprehensive Risk Control: Reasonable RSI overbought/oversold thresholds effectively filter false signals.
3. Strong Adaptability: Bollinger Bands self-adjust based on market volatility, improving strategy performance in different market environments.
4. Strong Parameter Adjustability: Key indicator parameters can be optimized for different market characteristics.

#### Strategy Risks
1. Lag Risk: Moving averages have inherent lag, potentially causing delayed entry timing.
2. Oscillation Risk: May generate frequent false signals in sideways markets.
3. Trend Reversal Risk: Strategy may not respond quickly enough to sudden trend reversals.
4. Parameter Sensitivity: Over-optimization of parameters may lead to overfitting issues.

#### Strategy Optimization Directions
1. Incorporate Volume Indicators: Recommend adding volume analysis dimension to improve trend judgment accuracy.
2. Optimize Stop-loss Mechanism: Design dynamic stop-loss based on ATR to enhance risk control capability.
3. Add Market Environment Filters: Include market volatility judgment to adjust strategy parameters in high volatility environments.
4. Improve Position Management: Design dynamic position control system based on signal strength.

#### Summary
The strategy constructs a relatively complete trading system through the synergistic combination of multiple technical indicators. It performs excellently in markets with clear trends but requires attention to market environment changes and corresponding adjustments. Through continuous optimization and improvement, the strategy has the potential to achieve stable returns in live trading.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2025-01-04 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("RSI + MA + BB30 Strategy", overlay=true)

// === Cài đặt RSI ===
rsiLength = input(14, title="RSI Length")
rsiOverbought = input(80, title="RSI Overbought Level")
rsiOversold = input(25, title="RSI Oversold Level")
rsi = ta.rsi(close, rsiLength)

// === Cài đặt MA ===
maLength20 = input(20, title="MA20 Length")
maLength50 = input(50, title="MA50 Length")
ma20 = ta.sma(close, maLength20)
ma50 = ta.sma(close, maLength50)

// === Cài đặt Bollinger Bands (BB30) ===
bbLength = input(30, title="Bollinger Bands Length")
bbStdDev = input(2, title="BB Standard Deviation")
[bbUpper, bbBasis, bbLower] = ta.bb(close, bbLength, bbStdDev)

// === Điều kiện giao dịch ===
// Điều kiện Long
longCondition = (rsi < rsiOversold) and (ma20 > ma50) and (close < bbLower)

// Điều kiện Short
shortCondition = (rsi > rsiOverbought) and (ma20 < ma50) and (close > bbUpper)

// === Mở lệnh giao dịch ===
if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

// === Hiển thị chỉ báo trên biểu đồ ===
// Hiển thị MA
plot(ma20, color=color.blue, title="MA20")
plot(ma50, color=color.red, title="MA50")

// Hiển thị Bollinger Bands
plot(bbUpper, color=color.green, title="BB Upper")
plot(bbBasis, color=color.gray, title="BB Basis")
plot(bbLower, color=color.green, title="BB Lower")

// Hiển thị RSI và mức quan trọng
hline(rsiOverbought, "RSI Overbought", color=color.red, linestyle=hline.style_dashed)
hline(rsiOversold, "RSI Oversold", color=color.green, linestyle=hline.style_dashed)
plot(rsi, color=color.purple, title="RSI")
```

> Detail

https://www.fmz.com/strategy/477613

> Last Modified

2025-01-06 16:57:57
