
> Name

EMA交叉与布林带双重入场策略结合趋势跟踪与波动突破的量化交易系统EMA-Crossover-with-Bollinger-Bands-Double-Entry-Strategy-A-Quantitative-Trading-System-Combining-Trend-Following-and-Volatility-Breakout

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18583a180e85e8d79da.png)


#### Overview

The EMA Crossover with Bollinger Bands Double Entry Strategy is a quantitative trading system that combines trend following and volatility breakout methodologies. This strategy primarily uses Exponential Moving Average (EMA) crossovers to determine market trends, while utilizing Bollinger Bands (BB) to identify potential breakout opportunities. This approach aims to capture strong market trends while providing additional entry points through Bollinger Band breakouts, thereby increasing trading opportunities and optimizing capital management.

#### Strategy Principles

1. EMA Crossover: The strategy employs 12-period and 26-period EMAs to determine trend direction. A buy signal is generated when the fast EMA (12-period) crosses above the slow EMA (26-period), and vice versa for sell signals.

2. Bollinger Bands: The strategy uses a 55-period Bollinger Band with 0.9 standard deviation. When the price breaks above the upper band while already in an uptrend, it provides an additional entry opportunity.

3. Entry Logic:
   - Primary Entry: EMA crossover or price breakout above the upper Bollinger Band.
   - Additional Entry: If already in a long position, increase position size on Bollinger Band breakouts.

4. Exit Logic:
   - Exit when the fast EMA crosses below the slow EMA.
   - Optional exit when the price closes below the Bollinger Band middle line.

5. Stop Loss Setting:
   - Dynamic stop loss using 14-period Average True Range (ATR).
   - Optional use of the lowest low of the past 5 days as a stop loss.

6. Risk Management:
   - Default risk of 3% of account equity per trade (adjustable).
   - Use of ATR for dynamic stop loss adjustment, adapting to market volatility.
   - Optional pause in trading when price is below the Bollinger Band middle line.

#### Strategy Advantages

1. Multi-dimensional Analysis: Combines trend following (EMA) and volatility breakout (Bollinger Bands) strategies, enhancing the reliability of trading signals.

2. Flexible Entry Mechanism: In addition to the primary EMA crossover signals, it utilizes Bollinger Band breakouts for additional entry opportunities, increasing the strategy's adaptability.

3. Dynamic Risk Management: Uses ATR to set stop losses and adjust position sizes, allowing the strategy to better adapt to volatility in different market conditions.

4. Market Condition Awareness: Uses the Bollinger Band middle line to assess market conditions, with the option to pause trading under unfavorable conditions, reducing risk.

5. Optimized Capital Management: Achieves more refined capital control through percentage-based risk management and ATR-based dynamic position sizing.

6. High Customizability: Multiple adjustable parameters, such as EMA periods, Bollinger Band settings, and ATR multiplier, allow the strategy to adapt to different trading instruments and market environments.

#### Strategy Risks

1. Trend Reversal Risk: Performs well in strong trending markets but may generate frequent false breakout signals in rangebound markets.

2. Overtrading Risk: Bollinger Band breakouts may lead to excessive trading signals, increasing transaction costs.

3. Slippage Risk: In highly volatile markets, entry and exit prices may significantly deviate from expectations.

4. Parameter Sensitivity: Strategy performance may be sensitive to changes in EMA periods, Bollinger Band settings, etc., requiring careful optimization and backtesting.

5. Market Environment Dependency: Strategy performance may be inconsistent across different market cycles and volatility environments.

6. Capital Management Risk: Despite using percentage-based risk management, the account may still face significant drawdowns in case of consecutive losses.

#### Strategy Optimization Directions

1. Multi-timeframe Analysis: Introduce longer-term trend confirmation, such as weekly or monthly EMAs, to reduce false signals.

2. Volatility Filtering: Adjust Bollinger Band parameters or pause trading in low volatility environments to avoid overtrading in sideways markets.

3. Incorporate Momentum Indicators: Add RSI or MACD to confirm trend strength and potential reversal signals.

4. Optimize Exit Mechanism: Consider using trailing stops or ATR-based dynamic profit targets to better lock in profits.

5. Market State Classification: Develop a market environment classification system to use different parameter settings in different market states.

6. Machine Learning Optimization: Use machine learning algorithms to dynamically adjust strategy parameters to adapt to different market conditions.

7. Correlation Analysis: Consider inter-instrument correlations when trading multiple assets to optimize overall portfolio risk-return characteristics.

8. Incorporate Fundamental Factors: For stocks or commodities, consider adding relevant fundamental indicators to improve entry signal quality.

#### Conclusion

The EMA Crossover with Bollinger Bands Double Entry Strategy is a quantitative trading system that combines trend following and volatility breakout concepts. It captures major trends through EMA crossovers and provides additional entry opportunities using Bollinger Band breakouts, while employing dynamic risk management methods to optimize capital utilization. The strategy's strengths lie in its multi-dimensional analysis approach and flexible risk management, but it also faces risks such as trend reversals and overtrading.

There is significant room for optimization through multi-timeframe analysis, volatility filtering, incorporation of momentum indicators, and other methods. Particularly, introducing machine learning algorithms and market state classification systems could significantly improve the strategy's adaptability and stability. However, in practical application, comprehensive backtesting and forward testing are still necessary, and careful parameter adjustments are required based on specific trading instruments and market environments.

Overall, this is a well-designed and promising quantitative trading strategy framework. Through continuous optimization and careful management, it has the potential to become a robust trading system suitable for investors seeking to capture trends while controlling risks.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-07-23 00:00:00
end: 2024-07-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("EMA Crossover with BB Double Entry", overlay=true, initial_capital=1000, default_qty_type=strategy.cash, default_qty_value=100)

// Input parameters
fastLength = input.int(12, "Fast EMA Length")
slowLength = input.int(26, "Slow EMA Length")
atrPeriod = input.int(14, "ATR Period")
atrMultiplier = input.float(1.0, "ATR Multiplier")
useATRStopLoss = input.bool(true, "Use ATR Stop Loss")
stopLossDays = input.int(5, "Number of days for stop loss", minval=1, maxval=50)
riskPerTrade = input.float(3.0, "Risk per trade (%)", minval=0.1, maxval=5, step=0.1)
bbRiskPerTrade = input.float(1.5, "Risk for BB breakout trade (%)", minval=0.1, maxval=5, step=0.1)

// Bollinger Bands parameters
bbLength = input.int(55, "BB Length")
bbMult = input.float(0.9, "BB Standard Deviation")
useBBPauseResume = input.bool(false, "Use BB for Pause/Resume trading")

// Backtesting dates
startDate = input(timestamp("2020-01-01"), "Start Date")
endDate = input(timestamp("9999-12-31"), "End Date")

// Calculate EMAs
fastEMA = ta.ema(close, fastLength)
slowEMA = ta.ema(close, slowLength)

// Calculate ATR
atr = ta.atr(atrPeriod)

// Calculate Bollinger Bands
bbBasis = ta.sma(close, bbLength)
bbDev = bbMult * ta.stdev(close, bbLength)
bbUpper = bbBasis + bbDev
bbLower = bbBasis - bbDev

// Define trading conditions
longCondition = ta.crossover(fastEMA, slowEMA)
shortCondition = ta.crossunder(fastEMA, slowEMA)
bullish = fastEMA > slowEMA
bearish = fastEMA < slowEMA

// Bollinger Bands breakout
bbBreakout = close > bbUpper and close[1] <= bbUpper[1]

// Calculate lowest low for stop loss
lowestLow = ta.lowest(low, stopLossDays)

// Variables to store entry price and stop loss
var float entryPrice = na
var float stopLoss = na
var bool inPosition = false
var bool pauseTrading = false

// Entry logic
entryConditions = (longCondition or (bbBreakout and bullish)) and
                  (not useBBPauseResume or close > bbBasis) and
                  not pauseTrading

if entryConditions and not inPosition
    entryPrice := close
    atrStopLoss = close - (atr * atrMultiplier)
    lowStopLoss = lowestLow
    stopLoss := useATRStopLoss ? atrStopLoss : lowStopLoss
    
    riskAmount = strategy.equity * (riskPerTrade / 100)
    positionSize = riskAmount / (close - stopLoss)
    
    strategy.entry("Long", strategy.long, qty=positionSize)
    inPosition := true
    pauseTrading := false
    
    alert("BUY," + syminfo.ticker + ",EntryPrice=" + str.tostring(close) + ",StopLoss=" + str.tostring(stopLoss) + ",PositionSize=" + str.tostring(positionSize), alert.freq_once_per_bar_close)

// Additional entry on BB breakout
if inPosition and bbBreakout and bullish and (not useBBPauseResume or close > bbBasis)
    bbRiskAmount = strategy.equity * (bbRiskPerTrade / 100)
    bbPositionSize = bbRiskAmount / (close - stopLoss)
    
    strategy.entry("Long_BB", strategy.long, qty=bbPositionSize)
    
    alert("ADD," + syminfo.ticker + ",EntryPrice=" + str.tostring(close) + ",StopLoss=" + str.tostring(stopLoss) + ",PositionSize=" + str.tostring(bbPositionSize), alert.freq_once_per_bar_close)

// Exit logic
if shortCondition or (useBBPauseResume and inPosition and close < bbBasis)
    if shortCondition
        strategy.close_all(comment="EMA Crossdown")
        inPosition := false
        pauseTrading := false
        alert("SELL," + syminfo.ticker + ",Reason=EMA_Crossdown", alert.freq_once_per_bar_close)
    else if useBBPauseResume
        strategy.close_all(comment="Close under BB basic")
        pauseTrading := true
        alert("SELL," + syminfo.ticker + ",Reason=Below_BB_Basic", alert.freq_once_per_bar_close)
    
    entryPrice := na
    stopLoss := na

// Resume trading if price closes above BB basic
if useBBPauseResume and pauseTrading and close > bbBasis
    pauseTrading := false
    alert("RESUME," + syminfo.ticker, alert.freq_once_per_bar_close)

// Stop loss
if strategy.position_size > 0
    strategy.exit("Stop Loss", "Long", stop=stopLoss)
    strategy.exit("Stop Loss", "Long_BB", stop=stopLoss)
    if close <= stopLoss
        alert("SELL," + syminfo.ticker + ",Reason=Stop_Loss", alert.freq_once_per_bar_close)

// Plotting
plot(fastEMA, color=color.new(color.blue, 0), title="Fast EMA")
plot(slowEMA, color=color.new(color.red, 0), title="Slow EMA")
plot(bbUpper, color=color.new(color.green, 50), title="BB Upper")
plot(bbLower, color=color.new(color.green, 50), title="BB Lower")
plot(bbBasis, color=color.new(color.yellow, 50), title="BB Basic")
plot(strategy.position_size > 0 ? stopLoss : na, color=color.red, style=plot.style_cross, linewidth=2, title="Stop Loss")

// Alert conditions
alertcondition(entryConditions, title="Buy Alert", message="Buy {{ticker}}")
alertcondition(bbBreakout and inPosition and bullish and (not useBBPauseResume or close > bbBasis), title="Add Position Alert", message="Add Position {{ticker}}")
alertcondition(shortCondition, title="Sell Alert (EMA)", message="Sell {{ticker}} (EMA crossdown)")
alertcondition(useBBPauseResume and inPosition and close < bbBasis, title="Pause Alert", message="Pause trading {{ticker}} (Close under BB basic)")
alertcondition(useBBPauseResume and pauseTrading and close > bbBasis, title="Resume Alert", message="Resume trading {{ticker}} (Close above BB basic)")
```

> Detail

https://www.fmz.com/strategy/458078

> Last Modified

2024-07-29 17:14:32
