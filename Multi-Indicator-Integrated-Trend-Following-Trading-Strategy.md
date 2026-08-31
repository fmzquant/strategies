
> Name

Multi-Indicator-Integrated-Trend-Following-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d848623fbf2bce46e130.png)
![IMG](https://www.fmz.com/upload/asset/2d884949076071891f53a.png)




#### Overview
The Multi-Indicator Integrated Trend Following Trading Strategy is a quantitative trading system that utilizes multiple technical indicators to determine market trend direction and strength. This strategy cleverly combines moving averages, Relative Strength Index (RSI), Average Directional Index (ADX), On-Balance Volume (OBV), and other indicators, while also integrating candlestick pattern analysis and trading session filtering. Through multi-level condition screening, it ensures capturing high-probability trading opportunities in strong trending markets. The strategy particularly focuses on cross-verification between indicators, executing trades only when multiple technical signals confirm simultaneously, effectively reducing the risk of false signals.

#### Strategy Principles
This strategy operates based on the following core principles:

1. **Trend Confirmation System**: Uses the crossover and relative position of Fast EMA (50 periods) and Slow EMA (200 periods) to determine the primary market trend direction. When the Fast EMA is above the Slow EMA, an uptrend is confirmed; otherwise, a downtrend is confirmed.

2. **Strength Measurement**: Measures trend strength through a custom ADX indicator, trading only when the ADX value exceeds a set threshold (default 20), avoiding weak trends or oscillating markets.

3. **Multi-level Confirmation Mechanism**: Designed an intelligent signal system called "aiStrength" that comprehensively evaluates five key market factors:
   - EMA trend direction
   - OBV trend direction
   - ADX trend strength
   - Engulfing pattern occurrence
   - Short-term and medium-term EMA crossover
   A trading signal is generated only when at least 4 factors simultaneously confirm.

4. **Candlestick Pattern Validation**: Additionally identifies special candlestick patterns such as engulfing patterns, doji stars, and pin bars as confirmation signals for trend reversal or continuation.

5. **Volume Confirmation**: Requires volume to be 1.5 times higher than the 20-period average volume, ensuring sufficient market participation supports price movements.

6. **Indicator Divergence Identification**: Detects divergences between price and RSI/ADX, serving as early warning signals for potential trend reversals.

7. **Oscillation Market Filtering**: Identifies and avoids oscillating markets through combined analysis of price range fluctuations with ADX and RSI.

8. **Trading Session Optimization**: Restricts trading to specific sessions (14:00-23:00 in UTC+7 timezone), corresponding to major market active periods, improving signal quality.

9. **Dynamic Risk Management**: Dynamically sets stop-loss and take-profit levels based on ATR, and applies trailing stop mechanisms to protect profits. The risk-reward ratio is set at 2.0, while using a 1.5x ATR trailing stop to protect existing profits.

#### Strategy Advantages
1. **Multi-dimensional Market Analysis**: By integrating multiple indicators including moving averages, RSI, ADX, and OBV, the market is analyzed from different angles, reducing the risk of misleading signals from any single indicator.

2. **Strong Adaptability**: The strategy uses ATR-based stop-loss and take-profit settings, automatically adapting to different market volatilities, maintaining effectiveness in both high and low volatility environments.

3. **High-level Filtering System**: Through multiple condition screening (trend direction, strength confirmation, volume verification, candlestick patterns, trading sessions, etc.), effectively filters out numerous low-quality signals, significantly enhancing the reliability of trading signals.

4. **Intelligent Oscillation Market Recognition**: The strategy has a built-in oscillation market recognition mechanism, actively avoiding trading when the market is in a clear sideways state, reducing the risk of losses in high-uncertainty environments.

5. **Dynamic Profit Protection**: Applying ATR-based trailing stops allows for effectively locking in profits while maintaining sufficient upside potential, balancing risk and reward.

6. **Combination of Patterns and Indicators**: Combines traditional technical analysis candlestick patterns (engulfing, doji, pin bars) with modern technical indicators, leveraging the strengths of each and providing mutual verification.

7. **Divergence Warning System**: By detecting divergences between price and RSI/ADX, potential trend weakness or imminent reversals are identified in advance, enhancing the strategy's predictive ability.

8. **Trading Session Optimization**: Focuses on trading during highly active market sessions, avoiding periods of low liquidity and unstable volatility, improving trading efficiency.

#### Strategy Risks
1. **Overreliance on Indicator Resonance**: The strategy requires multiple indicators to confirm simultaneously to generate signals. While this improves signal quality, it may lead to missing some effective trading opportunities, especially in fast-moving markets.

2. **Parameter Optimization Challenges**: The strategy involves multiple parameter settings (such as EMA length, RSI period, ADX threshold, etc.), and different market environments may require different parameter combinations, increasing the complexity of parameter optimization.

3. **Unstable Trading Frequency**: Due to strict entry conditions, there may be extended periods without trading signals in certain market phases, affecting capital utilization efficiency. A solution is to consider increasing the number of tradable market instruments or appropriately relaxing certain conditions.

4. **Drawdown Risk**: Despite using ATR-based stop-loss settings, in extreme market conditions (such as gaps or flash crashes), actual stop-losses may experience significant slippage, leading to unexpected losses. Additional risk control measures are recommended, such as overall position management and daily maximum loss limits.

5. **Market State Misjudgment**: Although the strategy's oscillation market identification mechanism is effective, it may misjudge in certain complex market environments, incorrectly filtering out valuable trading opportunities or erroneously entering unsuitable markets.

6. **Algorithmic Complexity Risk**: The strategy logic is relatively complex, and multiple condition judgments may lead to programming errors or logical contradictions, requiring strict backtesting and live monitoring to ensure strategy stability.

7. **Overfitting Risk**: As the strategy employs multiple indicators and conditions, there is a risk of overfitting historical data, potentially leading to future live performance not meeting expectations. Thorough testing under different time periods and market conditions is recommended.

#### Strategy Optimization Directions
1. **Adaptive Parameter Adjustment**: The current strategy uses fixed parameter settings. Consider introducing an adaptive parameter adjustment mechanism that dynamically adjusts EMA length, RSI threshold, ADX threshold, and other parameters based on market volatility and trend strength, improving the strategy's adaptability across different market environments.

2. **Market State Classification Optimization**: The existing oscillation market identification mechanism can be further refined by classifying market states into strong uptrend, weak uptrend, strong downtrend, weak downtrend, and oscillation, applying different trading strategies and parameter combinations for different market states.

3. **Entry Timing Precision**: Add entry optimization based on market microstructure, such as support/resistance breakout confirmation and price volatility analysis, further improving the precision of entry points.

4. **Position Management Strategy Enhancement**: The current strategy uses fixed proportion fund management. Consider introducing volatility-based dynamic position management, increasing positions with high-confidence signals and low market risk, and vice versa, optimizing capital usage efficiency.

5. **Multiple Timeframe Analysis**: Introducing multiple timeframe analysis can significantly enhance strategy effectiveness, such as using larger timeframes (like 1-hour or 4-hour) to confirm the main trend direction, then seeking specific entry points on 15-minute charts, reducing counter-trend trading risk.

6. **Machine Learning Optimization for Signal Weighting**: Utilize machine learning techniques to analyze historical data and assign dynamic weights to different indicator signals, rather than simply counting the number of confirming signals, thereby more accurately evaluating market conditions and the quality of trading opportunities.

7. **Stop-Loss Strategy Refinement**: The current strategy uses a uniform ATR multiplier for stop-loss. Consider customizing more detailed stop-loss strategies based on market volatility characteristics and entry reasons, such as structure-based stops using support/resistance, time-based stops, or volatility-adjusted stops.

8. **Seasonality and Market Cycle Analysis**: Add analysis of seasonality factors and market cycles, adjusting strategy parameters or pausing trading during specific periods (such as month beginning/end, before/after quarterly settlements), avoiding historically anomalous volatility periods.

#### Conclusion
The Multi-Indicator Integrated Trend Following Trading Strategy is an ingeniously designed quantitative trading system that effectively identifies and tracks market trends through the comprehensive application of multiple technical analysis tools and trading concepts. The strategy's most notable highlight is its multi-level signal confirmation mechanism, which significantly reduces the possibility of erroneous signals by requiring multiple different types of indicators to simultaneously point in the same trading direction.

The strategy also cleverly integrates traditional candlestick pattern analysis with modern technical indicators, adding volume confirmation and trading session optimization to form a comprehensive and systematic trading decision framework. The ATR-based dynamic risk management design also reflects the strategy's emphasis on capital safety, providing traders with a reasonable risk control mechanism.

Although the strategy has limitations such as complex parameter optimization and potentially missing some trading opportunities, through the suggested optimization directions like adaptive parameter adjustment, multiple timeframe analysis, and machine learning signal optimization, the strategy's performance can be further enhanced. Overall, this is a logically rigorous and well-designed quantitative trading strategy, particularly suitable for traders pursuing steady returns with a focus on risk control.



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-03-10 00:00:00
end: 2025-04-07 00:00:00
period: 2m
basePeriod: 2m
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("TUONG HA GBP M15 Trend Strategy NHIEU CHI BAO TICH HOP", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// === INPUTS ===
emaFastLen = input.int(50, "EMA Fast", minval=10, maxval=200, step=5)
emaSlowLen = input.int(200, "EMA Slow", minval=50, maxval=500, step=10)
rsiLen = input.int(14, "RSI Length")
adsLen = input.int(14, "ADX Length")
adxThreshold = input.int(20, "ADX Threshold")
atrLen = input.int(14, "ATR Length")
rrRatio = input.float(2.0, "Risk-Reward Ratio", step=0.1)
trailOffset = input.float(1.5, "Trailing Stop ATR Multiplier", step=0.1)
volumeMultiplier = input.float(1.5, "Volume Multiplier Threshold", step=0.1)

// === SESSIONS (London + New York in VN Time UTC+7) ===
startHour = 14
endHour = 23
inSession = (hour >= startHour and hour <= endHour)

// === INDICATORS ===
emaFast = ta.ema(close, emaFastLen)
emaSlow = ta.ema(close, emaSlowLen)
rsi = ta.rsi(close, rsiLen)
at = ta.atr(atrLen)

// === CUSTOM ADX FUNCTION ===
upMove = high - high[1]
downMove = low[1] - low
plusDM = (upMove > downMove and upMove > 0) ? upMove : 0
minusDM = (downMove > upMove and downMove > 0) ? downMove : 0
trur = ta.tr(true)
plusDI = 100 * ta.rma(plusDM, adsLen) / ta.rma(trur, adsLen)
minusDI = 100 * ta.rma(minusDM, adsLen) / ta.rma(trur, adsLen)
adx = 100 * ta.rma(math.abs(plusDI - minusDI) / (plusDI + minusDI), adsLen)

// === OBV TREND ===
obv = ta.cum(close > close[1] ? volume : close < close[1] ? -volume : 0)
obvTrend = obv > obv[1]

// === VOLUME FILTER ===
avgVol = ta.sma(volume, 20)
highVol = volume > avgVol * volumeMultiplier

// === SIDEWAY DETECTION ===
rng = ta.highest(high, 20) - ta.lowest(low, 20)
rngCloseRatio = close != 0 ? (rng / close) : na
sideway = na(rngCloseRatio) ? false : (rngCloseRatio < 0.003 and adx < adxThreshold and (rsi > 45 and rsi < 55))

// === ENGULFING ===
bullishEngulf = close[1] < open[1] and close > open and close > open[1] and open < close[1]
bearishEngulf = close[1] > open[1] and close < open and close < open[1] and open > close[1]

// === DOJI AND PIN BAR ===
doji = math.abs(open - close) <= (high - low) * 0.1
pinBar = (high - math.max(open, close)) > 2 * math.abs(open - close) and (math.min(open, close) - low) < (high - low) * 0.25

// === AI SIGNALS ENHANCED ===
aiStrength = 0
aiStrength := aiStrength + (emaFast > emaSlow ? 1 : 0)
aiStrength := aiStrength + (obvTrend ? 1 : 0)
aiStrength := aiStrength + (adx > adxThreshold ? 1 : 0)
aiStrength := aiStrength + (bullishEngulf ? 1 : 0)
aiStrength := aiStrength + (ta.crossover(ta.ema(close, 5), ta.ema(close, 21)) ? 1 : 0)
aiSignalLong = aiStrength >= 4

aioStrengthS = 0
aioStrengthS := aioStrengthS + (emaFast < emaSlow ? 1 : 0)
aioStrengthS := aioStrengthS + (not obvTrend ? 1 : 0)
aioStrengthS := aioStrengthS + (adx > adxThreshold ? 1 : 0)
aioStrengthS := aioStrengthS + (bearishEngulf ? 1 : 0)
aioStrengthS := aioStrengthS + (ta.crossunder(ta.ema(close, 5), ta.ema(close, 21)) ? 1 : 0)
aiSignalShort = aioStrengthS >= 4

// === HIGHS AND LOWS DETECTION ===
highestHigh = ta.highest(high, 50)
lowestLow = ta.lowest(low, 50)
plot(highestHigh, title="Highest High", color=color.fuchsia, linewidth=1, style=plot.style_line)
plot(lowestLow, title="Lowest Low", color=color.teal, linewidth=1, style=plot.style_line)

// === RSI DIVERGENCE ===
priceHigherHigh = high > high[1] and high[1] > high[2]
rsiLowerHigh = rsi < rsi[1] and rsi[1] > rsi[2]
shortDiv = priceHigherHigh and rsiLowerHigh

priceLowerLow = low < low[1] and low[1] < low[2]
rsiHigherLow = rsi > rsi[1] and rsi[1] < rsi[2]
longDiv = priceLowerLow and rsiHigherLow

// === ADX DIVERGENCE ===
priceHigherHighADX = high > high[1] and high[1] > high[2]
adxLowerHigh = adx < adx[1] and adx[1] > adx[2]
adxBearishDiv = priceHigherHighADX and adxLowerHigh

priceLowerLowADX = low < low[1] and low[1] < low[2]
adxHigherLow = adx > adx[1] and adx[1] < adx[2]
adxBullishDiv = priceLowerLowADX and adxHigherLow

// === CONDITIONS ===
trendUp = emaFast > emaSlow
trendDn = emaFast < emaSlow

longCond = trendUp and rsi > 50 and obvTrend and adx > adxThreshold and bullishEngulf and aiSignalLong and inSession and not sideway and highVol and (pinBar or doji or longDiv or adxBullishDiv)
shortCond = trendDn and rsi < 50 and not obvTrend and adx > adxThreshold and bearishEngulf and aiSignalShort and inSession and not sideway and highVol and (pinBar or doji or shortDiv or adxBearishDiv)

// === ENTRY + SL/TP + TRAILING ===
longSL = close - at
longTP = close + at * rrRatio
shortSL = close + at
shortTP = close - at * rrRatio

plotshape(longCond, location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small, title="Buy Signal")
plotshape(shortCond, location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small, title="Sell Signal")

if (longCond)
    strategy.entry("Long", strategy.long)
    strategy.exit("Long TP/SL", from_entry="Long", stop=longSL, limit=longTP, trail_points=at * trailOffset, trail_offset=at * trailOffset)
    label.new(bar_index, high, "Buy", style=label.style_label_up, color=color.green, textcolor=color.white, size=size.normal)
    alert("Long Signal!", alert.freq_once_per_bar)

if (shortCond)
    strategy.entry("Short", strategy.short)
    strategy.exit("Short TP/SL", from_entry="Short", stop=shortSL, limit=shortTP, trail_points=at * trailOffset, trail_offset=at * trailOffset)
    label.new(bar_index, low, "Sell", style=label.style_label_down, color=color.red, textcolor=color.white, size=size.normal)
    alert("Short Signal!", alert.freq_once_per_bar)

// === PLOTS ===
plot(emaFast, color=color.orange, title="EMA Fast")
plot(emaSlow, color=color.blue, title="EMA Slow")
bgcolor(sideway ? color.new(color.gray, 90) : na)

// === COLORING BARS ===
barcolor(longCond ? color.new(color.green, 0) : shortCond ? color.new(color.red, 0) : na)

```

> Detail

https://www.fmz.com/strategy/489971

> Last Modified

2025-04-10 15:37:00
