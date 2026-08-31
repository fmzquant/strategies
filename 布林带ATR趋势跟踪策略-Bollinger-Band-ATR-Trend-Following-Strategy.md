
> Name

布林带ATR趋势跟踪策略-Bollinger-Band-ATR-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10abd0bdc623e94e525.png)


#### Overview
This strategy is based on Bollinger Bands and the ATR indicator. It captures price fluctuations using Bollinger Bands, uses price breakouts above or below the bands as entry signals, and employs ATR as a trailing stop loss. The strategy closes positions when the price crosses the simple moving average. It aims to capture trending markets, enter positions in the direction of the trend, and promptly close positions when the trend reverses.

#### Strategy Principles
1. Calculate Bollinger Bands: Use the closing price to calculate the simple moving average (SMA) as the middle band, and calculate the upper and lower bands based on volatility (standard deviation).
2. Calculate ATR: Use the moving average of true range (TR) to calculate ATR as the basis for the trailing stop loss.
3. Generate trading signals: When the price breaks below the lower Bollinger Band, generate a long signal; when it breaks above the upper Bollinger Band, generate a short signal. When the price breaks above the ATR trailing stop, generate a long signal; when it breaks below the ATR trailing stop, generate a short signal.
4. Close positions: For long positions, if the price breaks above the simple moving average, close the long position; for short positions, if the price breaks below the simple moving average, close the short position.

#### Strategy Advantages
1. Trend following: Captures trending markets by using Bollinger Bands and ATR trailing stop, adapting to different market environments.
2. Timely stop loss: Uses ATR as a trailing stop loss, dynamically adjusting the stop loss position according to market volatility to control risk.
3. Simple and easy to use: The strategy logic is clear, with few parameters, making it easy to understand and apply.

#### Strategy Risks
1. Parameter sensitivity: The performance of the strategy is affected by the choice of parameters for Bollinger Bands and ATR, requiring optimization for different markets and instruments.
2. Choppy markets: In choppy market conditions, frequent trading signals may lead to excessive trading frequency and costs.
3. Trend reversal: When a trend reverses, the strategy may experience significant drawdowns.

#### Strategy Optimization Directions
1. Parameter optimization: Optimize the parameters of Bollinger Bands and ATR to find the best combination for different markets and instruments.
2. Filters: Add other technical indicators or price behavior patterns as filters to reduce misjudgments and improve signal quality.
3. Position management: Dynamically adjust positions based on market volatility or account risk to improve capital utilization efficiency and risk-adjusted returns.

#### Summary
The Bollinger Band ATR Trend Following Strategy captures trending markets using Bollinger Bands and the ATR indicator. It has the advantages of trend following, timely stop loss, and simplicity. However, it also faces risks such as parameter sensitivity, choppy markets, and trend reversals. The strategy's performance can be further optimized through parameter optimization, adding filters, and position management.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-01 00:00:00
end: 2024-04-30 23:59:59
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Bollinger Bands and ATR Strategy", overlay=true)

// Veri Çekme
symbol = "AAPL"
timeframe = "D"
src = close

// Bollinger Bantları Hesaplama
len = 20
mult = 2
sum1 = 0.0, sum2 = 0.0
for i = 0 to len - 1
    sum1 += src[i]
basis = sum1 / len
for i = 0 to len - 1
    diff = src[i] - basis
    sum2 += diff * diff
dev = math.sqrt(sum2 / len)
upper_band = basis + dev * mult
lower_band = basis - dev * mult

// ATR Hesaplama
atr_period = input(10, title="ATR Period")
atr_value = 0.0
for i = 0 to atr_period - 1
    atr_value += math.abs(src[i] - src[i + 1])
atr_value /= atr_period
loss = input(1, title="Key Value (Sensitivity)")
atr_trailing_stop = src[1]
if src > atr_trailing_stop[1]
    atr_trailing_stop := math.max(atr_trailing_stop[1], src - loss * atr_value)
else if src < atr_trailing_stop[1]
    atr_trailing_stop := math.min(atr_trailing_stop[1], src + loss * atr_value)
else
    atr_trailing_stop := src - loss * atr_value

// Sinyal Üretme
long_condition  = src < lower_band and src[1] >= lower_band[1]
short_condition = src > upper_band and src[1] <= upper_band[1]
close_long  = src > basis
close_short = src < basis
buy_signal = src > atr_trailing_stop[1] and src[1] <= atr_trailing_stop[1]
sell_signal = src < atr_trailing_stop[1] and src[1] >= atr_trailing_stop[1]

if (long_condition)
    strategy.entry("Long", strategy.long, comment="Long Signal")
if (short_condition)
    strategy.entry("Short", strategy.short, comment="Short Signal")
if (close_long)
    strategy.close("Long", comment="Close Long")
if (close_short)
    strategy.close("Short", comment="Close Short")
if (buy_signal)
    strategy.entry("Long", strategy.long, comment="Buy Signal")
if (sell_signal)
    strategy.entry("Short", strategy.short, comment="Sell Signal")

// Çizim
plot(upper_band, color=#0000FF, linewidth=2, title="Upper Band")
plot(lower_band, color=#0000FF, linewidth=2, title="Lower Band")
plot(basis, color=#808080, linewidth=2, title="SMA")
plot(atr_trailing_stop, color=#FFA500, linewidth=2, title="ATR Trailing Stop")
plot(src, color=#FFA500, linewidth=2, title="Price")

// Sinyal İşaretleri
plotshape(long_condition, style=shape.arrowup, color=#00FF00, location=location.belowbar, size=size.small, title="Long Signal")
plotshape(short_condition, style=shape.arrowdown, color=#FF0000, location=location.abovebar, size=size.small, title="Short Signal")
plotshape(buy_signal, style=shape.diamond, color=#00FF00, location=location.belowbar, size=size.small, title="Buy Signal")
plotshape(sell_signal, style=shape.diamond, color=#FF0000, location=location.abovebar, size=size.small, title="Sell Signal")
```

> Detail

https://www.fmz.com/strategy/451492

> Last Modified

2024-05-15 10:50:14
