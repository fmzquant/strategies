
> Name

US30-Multi-Grade-Trend-Confirmation-Risk-Management-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d943e7492a9a9f6e50a6.png)
![IMG](https://www.fmz.com/upload/asset/2d8fb849d4e83480e6dc1.png)




#### Overview

This strategy is a short-term trading system based on multiple indicator confirmations and a graded evaluation system. It analyzes candle size, volume changes, and the RSI indicator to assess signal strength, categorizing signals into three grades: A, B, and C, with Grade A being the strongest and Grade C the weakest. The strategy integrates risk management functionality, including automatic setting of take profit and stop loss levels, and provides chart labels and trade alerts to help traders track signals in real-time. The strategy is based on moving average crossovers, RSI trend confirmation, and price position relative to moving averages, ensuring trade direction aligns with the primary trend while requiring increasing volume and sufficient candle body size to confirm momentum.

#### Strategy Principles

The core principles of this strategy combine several key elements:

1. **Trend Determination**: Uses the 200 EMA as the primary trend determination tool. The strategy looks for long opportunities when price is above the 200 EMA and short opportunities when price is below it.

2. **Moving Average Crossover Signals**: The strategy employs 20-period EMA and SMA. Initial signals are generated when these two moving averages cross. A long signal requires the EMA to cross above the SMA, while a short signal requires the EMA to cross below the SMA.

3. **RSI Confirmation**: Uses a 9-period RSI indicator, requiring the RSI to be above 50 for long trades and below 50 for short trades.

4. **Candle Body Size Assessment**: The strategy analyzes candle body size compared to the average body size of the past 20 candles to judge current price momentum.

5. **Volume Confirmation**: Requires current volume to be greater than the previous period's volume, ensuring sufficient market participation.

6. **Signal Grading System**:
   - Grade A (Strongest): Very large candle body (2x the 20-period average), rising volume, and strong RSI direction confirmation (RSI > 55 or < 45)
   - Grade B (Moderate): Large candle body and rising volume
   - Grade C (Weak): Large candle body with either rising volume or RSI confirmation, but not both

7. **Risk Management**: Includes adjustable take profit (default 0.5%) and stop loss (default 0.3%) levels, set as a percentage of the entry price.

Through these multiple confirmation conditions, the strategy ensures trades are only entered when there is sufficient market momentum and trend confirmation, reducing false signals.

#### Strategy Advantages

1. **Graded Evaluation System**: The greatest advantage lies in its unique signal grading mechanism, allowing traders to choose to trade only the highest strength signals (Grade A) or include more trading opportunities (Grades B and C).

2. **Multiple Confirmation Mechanism**: The combination of technical indicators (RSI, moving averages), price action (candle body size), and market participation (volume) provides multiple confirmations that effectively reduce the probability of false signals.

3. **Built-in Risk Management**: Automated take profit and stop loss settings ensure controllable risk for each trade, preventing single trades from causing excessive losses.

4. **Visual Feedback System**: Automatically labels triggered trade signals on the chart, clearly displaying trade direction and signal strength, making it easy for traders to quickly identify opportunities.

5. **Alert Functionality**: Integrates with TradingView's alert system, which can remind traders via popups, emails, or mobile notifications.

6. **Adaptability to Different Market Conditions**: Through signal grading and multi-indicator confirmation, the strategy can maintain relatively stable performance under different volatility environments.

7. **Customizability**: Provides customization options for multiple key parameters, including RSI length, moving average periods, take profit/stop loss ratios, and the signal grades to trade, allowing the strategy to be adjusted according to personal preferences and market conditions.

8. **Combination of Trend Following and Momentum**: The strategy effectively combines trend following (moving averages) and momentum confirmation (RSI, candle size), forming a relatively complete trading system.

#### Strategy Risks

1. **Excessive Filtering**: Multiple confirmation mechanisms may cause some valid trading opportunities to be missed, especially when trading only Grade A signals, which may significantly reduce trading frequency.

2. **Parameter Sensitivity**: The strategy uses multiple technical indicators and parameters, and slight changes in these parameters may lead to significant performance differences. For example, RSI length, moving average periods, and candle body size judgment criteria may all need to be adjusted according to different market conditions.

3. **Fixed Percentage Take Profit/Stop Loss**: The strategy uses fixed percentage take profit and stop loss levels, which may not be suitable for all market conditions. In high volatility environments, the fixed stop loss level may be too small, while in low volatility environments, it may be too large.

4. **Market Noise Impact**: On a 1-minute timeframe, market noise is greater, potentially leading to more false signals, especially during market consolidation or low volatility periods.

5. **Liquidity Risk**: During non-trading sessions or periods of low liquidity, signal quality may deteriorate, and slippage risk increases.

6. **Consecutive Loss Risk**: Even with the grading system, consecutive losses may still occur when the market suddenly changes, requiring an appropriate money management strategy.

7. **Counter-trend Risk**: The strategy is primarily based on short-term moving average crossovers and RSI confirmation, which may generate incorrect signals in strong counter-trend markets.

Methods to mitigate these risks include: using longer timeframe filtering conditions, dynamically adjusting take profit and stop loss levels, trading during specific market sessions (such as periods of higher volatility or ample liquidity), regularly backtesting and optimizing parameters, and strictly controlling risk exposure for each trade.

#### Strategy Optimization Directions

1. **Dynamic Take Profit/Stop Loss**: Change the fixed percentage take profit/stop loss to dynamic levels based on market volatility (such as the ATR indicator) to better adapt to different market conditions. Optimization code could be:
   ```
   atr = ta.atr(14)
   longSL = close - atr * slMultiplier
   longTP = close + atr * tpMultiplier
   ```

2. **Time Filtering**: Add trading time filters to only trade during periods of higher volatility and sufficient liquidity, such as US market opening hours or during the overlap of European and US markets:
   ```
   timeFilter = (hour >= 14 and hour < 16) or (hour >= 9 and hour < 11)
   ```

3. **Multiple Timeframe Analysis**: Integrate higher timeframe trend confirmation, trading only when the trend direction on higher timeframes is consistent:
   ```
   higherTimeframeTrend = request.security(syminfo.ticker, "15", close > ta.ema(close, 200))
   longCondition = longBase and higherTimeframeTrend
   ```

4. **Consecutive Signal Strengthening**: Consider strengthening signal intensity for consecutive signals in the same direction, or use multiple signals in the same direction within a short period as stronger confirmation:
   ```
   consecutiveLongSignals = longBase and longBase[1]
   ```

5. **Adaptive Indicator Parameters**: Use adaptive RSI and moving average lengths that automatically adjust parameters based on market volatility:
   ```
   adaptiveLength = math.round(ta.atr(14) / ta.atr(14)[20] * baseLength)
   adaptiveRsi = ta.rsi(close, math.max(2, adaptiveLength))
   ```

6. **Risk-Reward Ratio Optimization**: Set different risk-reward ratios based on different signal grades. For example, Grade A signals can use a larger risk-reward ratio, while Grade C signals use more conservative settings:
   ```
   if setupGrade == "A"
       tpMultiplier = 2.0
   else if setupGrade == "B"
       tpMultiplier = 1.5
   else
       tpMultiplier = 1.0
   ```

7. **Volatility Filtering**: Avoid trading in low volatility environments to reduce false signals in ranging markets:
   ```
   volatilityFilter = ta.atr(14) > ta.sma(ta.atr(14), 20) * 0.8
   ```

8. **Partial Profit Locking Mechanism**: Implement a partial profit locking mechanism that moves the stop loss to breakeven or locks in partial profits when the price moves a certain distance:
   ```
   if (strategy.position_size > 0 and close > entryPrice * (1 + partialTpPerc/100))
       strategy.exit("Partial", "Long", qty_percent=50)
   ```

These optimization directions primarily address the strategy's adaptability to different market conditions, improve signal quality, and better manage risk while maintaining the core logic of the strategy.

#### Summary

This US30 Multi-Grade Trend Confirmation Risk Management Strategy is a short-term trading system that combines multiple technical indicators, trend confirmation, and momentum analysis. Its uniqueness lies in using a graded evaluation system (Grades A, B, C) to assess trade signal quality, allowing traders to choose signals based on their risk preferences. The strategy improves signal reliability through multidimensional analysis including moving average crossovers, RSI confirmation, candle body size, and volume changes.

The built-in risk management functionality and clear visual feedback make it a relatively complete trading system. However, the strategy may face challenges such as high market noise, parameter sensitivity, and inflexible fixed take profit/stop loss when running on short timeframes. By integrating dynamic risk management, multi-timeframe analysis, and market condition filtering, the strategy has the potential to further improve its adaptability and stability across different market environments while maintaining its core advantages.

For traders who prefer clear rules and controlled risk in short-term trading strategies, this system provides a good starting point that can be customized through further backtesting and optimization based on personal trading style and target market characteristics, developing into a personalized trading system.



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-02-01 00:00:00
end: 2025-03-31 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("US30 1-min Strategy with TP/SL, Grades, Alerts", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// === Inputs ===
rsiLength     = input.int(9, title="RSI Length")
maLength      = input.int(20, title="MA Length (SMA & EMA)")
ema200Length  = input.int(200, title="200 EMA Length")
tpPerc        = input.float(0.5, title="Take Profit %", step=0.1)
slPerc        = input.float(0.3, title="Stop Loss %", step=0.1)

// Grade filters
allowA        = input.bool(true, title="Trade A-Grade Setups")
allowB        = input.bool(true, title="Trade B-Grade Setups")
allowC        = input.bool(false, title="Trade C-Grade Setups")

// === Indicators ===
rsi = ta.rsi(close, rsiLength)
sma = ta.sma(close, maLength)
ema = ta.ema(close, maLength)
ema200 = ta.ema(close, ema200Length)
volumeRising = volume > volume[1]

// === Candle Size Helpers ===
avgBody = ta.sma(math.abs(close - open), 20)
candleBody = math.abs(close - open)
candleLarge = candleBody > avgBody
candleVeryLarge = candleBody > avgBody * 2

// === Setup Grade Conditions ===
gradeA = candleVeryLarge and volumeRising and rsi > 55 or rsi < 45
gradeB = candleLarge and volumeRising
gradeC = candleLarge

// === Setup Conditions ===
// --- Long ---
longBase = close > ema200 and ta.crossover(ema, sma) and rsi > 50 and close > ema and close > sma
// --- Short ---
shortBase = close < ema200 and ta.crossunder(ema, sma) and rsi < 50 and close < ema and close < sma

// === Determine Grade ===
setupGrade = ""
isTrade = false

if longBase
    if gradeA and allowA
        setupGrade := "A"
        isTrade := true
    else if gradeB and allowB
        setupGrade := "B"
        isTrade := true
    else if gradeC and allowC
        setupGrade := "C"
        isTrade := true

if shortBase
    if gradeA and allowA
        setupGrade := "A"
        isTrade := true
    else if gradeB and allowB
        setupGrade := "B"
        isTrade := true
    else if gradeC and allowC
        setupGrade := "C"
        isTrade := true

// === Entry & TP/SL ===
longTP = close * (1 + tpPerc / 100)
longSL = close * (1 - slPerc / 100)
shortTP = close * (1 - tpPerc / 100)
shortSL = close * (1 + slPerc / 100)

// Entry
if longBase and isTrade and (setupGrade == "A" or setupGrade == "B" or setupGrade == "C")
    strategy.entry("Long " + setupGrade, strategy.long)
    strategy.exit("TP/SL", "Long " + setupGrade, limit=longTP, stop=longSL)
    label.new(bar_index, high, "Long " + setupGrade, style=label.style_label_up, color=color.green, textcolor=color.white)
    alert("LONG " + setupGrade + " setup triggered!", alert.freq_once_per_bar)

if shortBase and isTrade and (setupGrade == "A" or setupGrade == "B" or setupGrade == "C")
    strategy.entry("Short " + setupGrade, strategy.short)
    strategy.exit("TP/SL", "Short " + setupGrade, limit=shortTP, stop=shortSL)
    label.new(bar_index, low, "Short " + setupGrade, style=label.style_label_down, color=color.red, textcolor=color.white)
    alert("SHORT " + setupGrade + " setup triggered!", alert.freq_once_per_bar)


// === Plotting MAs ===
plot(ema, title="20 EMA", color=color.red)
plot(sma, title="20 SMA", color=color.blue)
plot(ema200, title="200 EMA", color=color.green)
```

> Detail

https://www.fmz.com/strategy/489033

> Last Modified

2025-04-01 13:41:30
