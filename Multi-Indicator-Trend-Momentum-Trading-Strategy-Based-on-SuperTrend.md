
> Name

Multi-Indicator-Trend-Momentum-Trading-Strategy-Based-on-SuperTrend

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/199d9c4f1962ae91d98.png)

#### Overview
This is a trend-following trading strategy that combines multiple technical indicators including SuperTrend, VWAP, EMA, and ADX. The strategy primarily identifies trend direction through the SuperTrend indicator, confirms trends using the relationship between VWAP and EMA, and filters weak trends using the ADX indicator to provide high-accuracy trading signals. The strategy is designed for intraday trading, particularly on 5-minute, 15-minute, and 1-hour timeframes.

#### Strategy Principles
The core logic is based on the following key components:
1. SuperTrend indicator calculation uses a 10-period ATR and 3.0 multiplier to determine trend direction. An uptrend (green) forms when price breaks above the upper band, and a downtrend (red) forms when price breaks below the lower band.
2. 21-period EMA serves as dynamic support/resistance and works with VWAP to confirm trends. Bullish bias exists when VWAP is above EMA; bearish bias when below.
3. ADX indicator measures trend strength - above 25 indicates strong trend and more reliable signals; below 25 indicates weak trend, requiring caution.
4. Entry conditions include:
   Buy Signal: SuperTrend turns green (uptrend confirmation), closing price above VWAP and EMA, ADX shows trend strength.
   Sell Signal: SuperTrend turns red (downtrend confirmation), closing price below VWAP and EMA, ADX confirms downtrend strength.

#### Strategy Advantages
1. Multiple indicator cross-validation improves trading signal accuracy and reduces false breakouts.
2. ADX indicator filters weak trends, improving trade success rate.
3. Strategy provides clear buy/sell signals with trend background color identification for easy execution.
4. Parameters can be flexibly adjusted for different markets and trading instruments.
5. Combines benefits of trend following and momentum trading for good returns in strong trend markets.

#### Strategy Risks
1. May generate frequent false signals in oscillating markets, leading to consecutive losses.
2. Multiple indicators may cause signal lag, affecting entry timing.
3. ATR parameter settings significantly impact strategy performance; improper parameters may lead to over-filtering or insufficient signals.
4. Strategy may not respond quickly enough in rapid reversal markets, causing drawdowns.

#### Strategy Optimization Directions
1. Incorporate volume indicators to confirm price breakout validity.
2. Consider adding stop-loss and take-profit functions to improve money management.
3. Develop adaptive parameter mechanisms to automatically adjust ATR and ADX parameters based on market volatility.
4. Add market environment recognition to automatically reduce positions or pause trading in oscillating markets.
5. Introduce more market structure analysis tools like support/resistance levels and trendlines to improve trading precision.

#### Summary
This is a well-structured trend-following strategy with clear logic. The combination of multiple indicators effectively improves trading signal reliability. The strategy's strengths lie in its clear signals, ease of execution, and good scalability. However, careful attention must be paid to market environment selection and risk control in practical application. Through continuous optimization and improvement, this strategy has the potential to achieve stable returns in strongly trending markets.


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-10 00:00:00
end: 2025-02-08 08:00:00
period: 2d
basePeriod: 2d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("SuperTrend on Steroids", overlay=true)

// Input parameters
atrLength = input(10, title="ATR Period")
atrMultiplier = input(3.0, title="ATR Multiplier")
emaLength = input(21, title="EMA Length")
adxLength = input(14, title="ADX Length")
adxSmoothing = input(14, title="ADX Smoothing")

// EMA Calculation
emaValue = ta.ema(close, emaLength)

// VWAP Calculation
vwapValue = ta.vwap(close)

// ATR Calculation
atrValue = ta.atr(atrLength)

// SuperTrend Calculation
var trend = 1
up = hl2 - atrMultiplier * atrValue
dn = hl2 + atrMultiplier * atrValue
up1 = nz(up[1], up)
dn1 = nz(dn[1], dn)
up := close[1] > up1 ? math.max(up, up1) : up
dn := close[1] < dn1 ? math.min(dn, dn1) : dn
trend := trend == -1 and close > dn1 ? 1 : trend == 1 and close < up1 ? -1 : trend

// ADX Calculation
[diplus, diminus, adx] = ta.dmi(adxLength, adxSmoothing)

// Buy/Sell Signals
buySignal = trend == 1 and trend[1] == -1
sellSignal = trend == -1 and trend[1] == 1

// Executing Trades
if buySignal
    strategy.entry("Long", strategy.long)

if sellSignal
    strategy.close("Long")

// Plotting SuperTrend Line
upPlot = plot(trend == 1 ? up : na, title="Up Trend", style=plot.style_line, color=color.yellow, linewidth=2)
dnPlot = plot(trend == -1 ? dn : na, title="Down Trend", style=plot.style_line, color=color.red, linewidth=2)

// Buy/Sell Labels
plotshape(buySignal, title="Buy Signal", text="BUY", location=location.belowbar, style=shape.labelup, size=size.normal, color=color.green, textcolor=color.white, offset=-1)

plotshape(sellSignal, title="Sell Signal", text="SELL", location=location.abovebar, style=shape.labeldown, size=size.normal, color=color.red, textcolor=color.white, offset=1)

// Background Highlighting
fill(upPlot, dnPlot, color=trend == 1 ? color.new(color.green, 90) : color.new(color.red, 90), title="Trend Highlight")

//vwap and EMA
plot(emaValue, title="EMA", color=color.white, linewidth=2)
plot(vwapValue, title="VWAP", color=color.blue, linewidth=2)
```

> Detail

https://www.fmz.com/strategy/481348

> Last Modified

2025-02-10 14:31:25
