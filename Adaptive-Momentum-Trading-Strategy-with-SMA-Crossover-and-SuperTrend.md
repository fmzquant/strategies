
> Name

Adaptive-Momentum-Trading-Strategy-with-SMA-Crossover-and-SuperTrend

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/160b988eb5d9412087f.png)


#### Overview

This strategy is an adaptive momentum trading system that combines Simple Moving Average (SMA) crossover with the SuperTrend indicator. It operates on a 5-minute timeframe, utilizing the crossover of two SMAs to capture trend changes while using the SuperTrend indicator to confirm trend direction and generate trading signals. The strategy also incorporates a percentage-based take-profit mechanism to protect profits and control risk.

#### Strategy Principles

1. SMA Crossover: Uses two Simple Moving Averages with different periods (default 20 and 50). A potential long signal is generated when the shorter-term SMA crosses above the longer-term SMA, and a potential short signal when it crosses below.

2. SuperTrend Indicator: Calculates upper and lower bands based on the Average True Range (ATR). The trend is considered upward when the price breaks above the upper band, and downward when it falls below the lower band. This helps filter out weak signals and confirm strong trends.

3. Trading Logic:
   - Long Condition: Shorter-term SMA crosses above longer-term SMA, and SuperTrend indicates an uptrend.
   - Short Condition: Shorter-term SMA crosses below longer-term SMA, and SuperTrend indicates a downtrend.

4. Take Profit: Sets a take-profit point based on a fixed percentage (default 1%) of the entry price. This helps lock in profits before trend reversal.

5. Visualization: The strategy plots SMA lines, SuperTrend indicator, and buy/sell signals on the chart for intuitive understanding of market conditions and trading logic.

#### Strategy Advantages

1. Trend Following and Momentum Combination: By combining SMA crossover and SuperTrend indicator, the strategy effectively captures market trends and follows strong momentum.

2. High Adaptability: The SuperTrend indicator, based on ATR calculations, automatically adjusts to market volatility, maintaining strategy stability across different market environments.

3. Signal Confirmation Mechanism: Requiring both SMA crossover and SuperTrend indicator conditions to be met before triggering a trade effectively reduces risks from false breakouts.

4. Risk Management: The built-in percentage-based take-profit mechanism helps lock in profits timely and prevents excessive drawdowns.

5. Good Visualization: The strategy clearly marks various indicators and signals on the chart, facilitating traders' intuitive understanding of market conditions and strategy logic.

6. Flexible Parameters: The strategy offers multiple adjustable parameters such as SMA periods, ATR period, ATR multiplier, allowing users to optimize based on different markets and personal preferences.

#### Strategy Risks

1. Underperformance in Ranging Markets: In sideways or oscillating markets, the strategy may generate frequent false signals, leading to overtrading and losses.

2. Lag: Both SMA and SuperTrend are lagging indicators, which may react slowly in rapidly reversing markets, causing delayed entries or exits.

3. Fixed Take Profit May Miss Big Trends: While the fixed percentage take-profit helps control risk, it may lead to premature exits in strong trends, missing out on larger profit opportunities.

4. Parameter Sensitivity: Strategy performance may be sensitive to parameter settings, with different parameter combinations performing differently across various market environments.

5. Lack of Stop Loss Mechanism: The current strategy lacks an explicit stop-loss setting, potentially facing significant risks in sudden market reversals.

#### Strategy Optimization Directions

1. Introduce Adaptive Parameters: Consider using adaptive mechanisms to dynamically adjust SMA periods and SuperTrend parameters for better adaptation to different market environments.

2. Add Market Environment Filtering: Introduce volatility indicators (like ATR) or trend strength indicators (like ADX) to reduce trading frequency in low volatility or weak trend markets.

3. Optimize Take Profit Mechanism: Consider using trailing stop or ATR-based dynamic take-profit to protect profits without exiting strong trends too early.

4. Add Stop Loss Settings: Introduce ATR-based dynamic stop-loss or fixed risk ratio stop-loss for better risk control.

5. Multi-Timeframe Analysis: Incorporate trend information from higher timeframes to improve trading signal reliability.

6. Add Volume Analysis: Introduce volume indicators to consider volume factors when confirming trading signals, improving signal quality.

7. Optimize Trading Frequency: Consider adding trade interval restrictions or signal confirmation mechanisms to reduce overtrading.

8. Backtesting and Optimization: Conduct comprehensive historical backtests and use genetic algorithms or grid search methods to optimize parameter combinations.

#### Conclusion

The Adaptive Momentum Trading Strategy with SMA Crossover and SuperTrend is a quantitative trading system that combines trend-following and momentum trading concepts. By integrating SMA crossover and SuperTrend indicator, this strategy effectively captures market trends and generates trading signals. Its adaptive features and signal confirmation mechanism help improve the reliability and stability of trades.

However, the strategy also has potential risks, such as underperformance in oscillating markets and sensitivity to parameter settings. To further enhance the strategy's robustness and performance, consider introducing adaptive parameter mechanisms, optimizing take-profit and stop-loss settings, and adding market environment filters.

Overall, this is a strategy framework with a solid foundation that has the potential to become a reliable trading system through continuous optimization and backtesting. Traders should pay attention to adjusting parameters according to specific trading instruments and market environments, and always remain vigilant about risks when using this strategy.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-06-01 00:00:00
end: 2024-06-30 23:59:59
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("SMA Crossover with Supertrend", overlay=true, format=format.price, precision=2)

// Input parameters for SMAs
SMA1Length = input.int(20, title="SMA1 Length")
SMA2Length = input.int(50, title="SMA2 Length")

// Input parameters for Supertrend
Periods = input.int(10, title="ATR Period")
src = input(hl2, title="Source")
Multiplier = input.float(3.0, title="ATR Multiplier")
changeATR = input.bool(true, title="Change ATR Calculation Method?")
showsignals = input.bool(true, title="Show Buy/Sell Signals?")
highlighting = input.bool(true, title="Highlighter On/Off?")

// Calculate EMAs
SMA1 = ta.sma(close, SMA1Length)
SMA2 = ta.sma(close, SMA2Length)

// Plot SMAs
plot(SMA1, color=color.green, title="SMA1")
plot(SMA2, color=color.red, title="SMA2")

// Calculate Supertrend
atr2 = ta.sma(ta.tr, Periods)
atr = changeATR ? ta.atr(Periods) : atr2

up = src - (Multiplier * atr)
up1 = nz(up[1], up)
up := close[1] > up1 ? math.max(up, up1) : up

dn = src + (Multiplier * atr)
dn1 = nz(dn[1], dn)
dn := close[1] < dn1 ? math.min(dn, dn1) : dn

trend = 1
trend := nz(trend[1], trend)
trend := trend == -1 and close > dn1 ? 1 : trend == 1 and close < up1 ? -1 : trend

upPlot = plot(trend == 1 ? up : na, title="Up Trend", style=plot.style_linebr, linewidth=2, color=color.green)
buySignal = trend == 1 and trend[1] == -1
plotshape(buySignal ? up : na, title="UpTrend Begins", location=location.absolute, style=shape.circle, size=size.tiny, color=color.green, transp=0)
plotshape(buySignal and showsignals ? up : na, title="Buy", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=color.green, textcolor=color.white, transp=0)

dnPlot = plot(trend == 1 ? na : dn, title="Down Trend", style=plot.style_linebr, linewidth=2, color=color.red)
sellSignal = trend == -1 and trend[1] == 1
plotshape(sellSignal ? dn : na, title="DownTrend Begins", location=location.absolute, style=shape.circle, size=size.tiny, color=color.red, transp=0)
plotshape(sellSignal and showsignals ? dn : na, title="Sell", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.red, textcolor=color.white, transp=0)

mPlot = plot(ohlc4, title="", style=plot.style_circles, linewidth=0)
longFillColor = highlighting ? (trend == 1 ? color.green : color.white) : color.white
shortFillColor = highlighting ? (trend == -1 ? color.red : color.white) : color.white
fill(mPlot, upPlot, title="UpTrend Highlighter", color=longFillColor)
fill(mPlot, dnPlot, title="DownTrend Highlighter", color=shortFillColor)

alertcondition(buySignal, title="SuperTrend Buy", message="SuperTrend Buy!")
alertcondition(sellSignal, title="SuperTrend Sell", message="SuperTrend Sell!")
changeCond = trend != trend[1]
alertcondition(changeCond, title="SuperTrend Direction Change", message="SuperTrend has changed direction!")

// Entry Conditions
longCondition = ta.crossover(SMA1, SMA2) and trend == 1
shortCondition = ta.crossunder(SMA1, SMA2) and trend == -1




// Execute Trades
strategy.entry("Long", strategy.long, when=longCondition)
strategy.entry("Short", strategy.short, when=shortCondition)



// Exit Conditions
takeProfitPercent = input.float(1.0, title="Take Profit (%)") / 100
longTakeProfit = strategy.position_avg_price * (1 + takeProfitPercent)
shortTakeProfit = strategy.position_avg_price * (1 - takeProfitPercent)

strategy.exit("Take Profit Long", from_entry="Long", limit=longTakeProfit)
strategy.exit("Take Profit Short", from_entry="Short", limit=shortTakeProfit)

// Plot Entry Signals
plotshape(series=longCondition, location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(series=shortCondition, location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

```

> Detail

https://www.fmz.com/strategy/458061

> Last Modified

2024-07-29 16:38:30
