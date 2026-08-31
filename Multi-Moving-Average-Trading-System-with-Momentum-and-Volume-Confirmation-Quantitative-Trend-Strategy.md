
> Name

Multi-Moving-Average-Trading-System-with-Momentum-and-Volume-Confirmation-Quantitative-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1dbb4f51f19252626ff.png)

#### Overview
This strategy is a comprehensive quantitative trading system that combines multiple moving averages, Relative Strength Index (RSI), Average Directional Index (ADX), and volume analysis. The strategy executes trades based on trend confirmation through multiple technical indicators, using volume and momentum filters to enhance trading reliability.

#### Strategy Principles
The core logic is based on several key components:
1. Multiple moving average system using Double HullMA, Volume-Weighted Moving Average (VWMA), and Basic Weighted Moving Average (WMA)
2. Trend strength assessment using ADX indicator, trading only in strong trends
3. RSI filtering to avoid extreme market conditions
4. Volume analysis requiring above-threshold volume for trade signals
5. Trade direction determination through n1 and n2 line crossovers

The multiple moving average system provides basic trend judgment, ADX ensures trading only in strong trends, RSI helps avoid chasing extremes, and volume analysis ensures trading during periods of high market activity.

#### Strategy Advantages
1. Multiple confirmation mechanisms reduce false breakout risks
2. Integration of technical indicators and volume analysis improves trading reliability
3. RSI filtering avoids entering during unfavorable market conditions
4. ADX usage ensures trading only in clear trends, improving win rate
5. Volume requirements help confirm market consensus
6. Clear strategy logic with adjustable parameters

#### Strategy Risks
1. Multiple filters may cause missed trading opportunities
2. May underperform in ranging markets
3. Parameter optimization risks overfitting
4. Moving average system may lag in quick reversals
5. Volume filtering may limit opportunities in low liquidity markets

Risk management recommendations:
- Adjust parameters based on market characteristics
- Set appropriate stop-loss and take-profit levels
- Control position sizing
- Regular strategy backtesting

#### Strategy Optimization
1. Introduce adaptive parameters based on market conditions
2. Add volatility filters to adjust positions in high volatility periods
3. Improve exit mechanisms with trailing stops
4. Optimize volume filters using relative rather than absolute values
5. Add time filters to avoid major news releases
6. Consider adding price volatility indicators for better risk assessment

#### Summary
The strategy builds a relatively complete trend following system through multiple technical indicators working in concert. Its main feature is using multiple confirmations to improve trading reliability while controlling risk through various filters. While it may miss some opportunities, it generally helps improve trading stability. The suggested optimization directions provide room for further strategy enhancement.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-11 00:00:00
end: 2024-12-10 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Optimized Multi-MA Strategy with Volume, ADX and RSI", overlay=true)

// Kullanıcı Parametreleri
keh = input.int(3, title="Double HullMA", minval=1)
teh = input.int(3, title="Volume-Weighted MA", minval=1)
yeh = input.int(75, title="Base Weighted MA", minval=1)
rsiPeriod = input.int(14, title="RSI Period", minval=1)
adxPeriod = input.int(14, title="ADX Period", minval=1)
volumeLookback = input.int(10, title="Volume Lookback Period", minval=1)  // Son X mumun hacmi
adxThreshold = input.int(20, title="ADX Trend Strength Threshold", minval=1) // ADX için trend gücü eşiği

// Hareketli Ortalamalar
rvwma = ta.vwma(close, teh)
yma = ta.wma(close, yeh)
n2ma = 2 * ta.wma(close, math.round(keh / 2))
nma = ta.wma(close, keh)
diff = n2ma - nma
sqrtKeh = math.round(math.sqrt(keh))
n1 = ta.wma(diff, sqrtKeh)
n2 = ta.wma(diff[1], sqrtKeh)

// ADX Hesaplaması
trueRange = ta.rma(ta.tr, adxPeriod)
plusDM = ta.rma(math.max(high - high[1], 0), adxPeriod)
minusDM = ta.rma(math.max(low[1] - low, 0), adxPeriod)
plusDI = (plusDM / trueRange) * 100
minusDI = (minusDM / trueRange) * 100
dx = math.abs(plusDI - minusDI) / (plusDI + minusDI) * 100
adx = ta.rma(dx, adxPeriod)
trendIsStrong = adx > adxThreshold

// RSI Filtreleme
rsiValue = ta.rsi(close, rsiPeriod)
rsiFilter = rsiValue > 30 and rsiValue < 70  // Aşırı alım ve aşırı satım bölgelerinin dışında olmak

// Hacim Filtresi
volumeThreshold = ta.sma(volume, volumeLookback)  // Ortalama hacim seviyesi
highVolume = volume > volumeThreshold

// Sinyal Şartları (Sadece güçlü trendler ve rsi'nın aşırı bölgelerde olmaması)
longCondition = n1 > n2 and close > rvwma and trendIsStrong and rsiFilter and highVolume
shortCondition = n1 < n2 and close < rvwma and trendIsStrong and rsiFilter and highVolume

// Hacim Filtresi ile İşaretler
plotshape(series=longCondition and highVolume ? close : na, style=shape.triangleup, location=location.belowbar, color=color.blue, size=size.small, title="High Volume Long Signal")
plotshape(series=shortCondition and highVolume ? close : na, style=shape.triangledown, location=location.abovebar, color=color.purple, size=size.small, title="High Volume Short Signal")

// Strateji Giriş ve Çıkış Şartları
if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

// Görsel Göstergeler
plot(n1, color=color.green, title="N1 Line")
plot(n2, color=color.red, title="N2 Line")
plot(rvwma, color=color.yellow, linewidth=2, title="VWMA")
plot(yma, color=color.orange, title="Base Weighted MA")

```

> Detail

https://www.fmz.com/strategy/474836

> Last Modified

2024-12-12 14:27:59
