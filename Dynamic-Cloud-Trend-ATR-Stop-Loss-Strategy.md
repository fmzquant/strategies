
> Name

Dynamic-Cloud-Trend-ATR-Stop-Loss-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d7f5063ddf03108ace39.png)
![IMG](https://www.fmz.com/upload/asset/2d85e457c3068a813af63.png)


#### Overview
This strategy is a comprehensive trading system that combines the Ichimoku Cloud and Average True Range (ATR). It identifies market trends through cloud components while using ATR to dynamically adjust stop-loss positions, achieving an organic combination of trend following and risk management. The strategy integrates market information from both momentum and volatility dimensions, providing a comprehensive analytical framework for trading decisions.

#### Strategy Principles
The core logic is built upon the five lines of the Ichimoku Cloud and the ATR indicator. The system triggers trading signals through the crossover of the Conversion Line (Tenkan-Sen) and Base Line (Kijun-Sen), while requiring price to be on the correct side of the cloud (Senkou Span A and B) and confirmation from the Lagging Span (Chikou Span). Specifically:
- Long conditions: Conversion Line crosses above Base Line, price above the cloud, Lagging Span above current close
- Short conditions: Conversion Line crosses below Base Line, price below the cloud, Lagging Span below current close
- Stop-loss setting: Dynamically adjusted through ATR multiplier, default at 1.5x ATR
- Exit conditions: Reverse crossing signals or change in Lagging Span position

#### Strategy Advantages
1. Multi-dimensional confirmation: Combines market information from trend, momentum, and volatility dimensions, improving signal reliability
2. Dynamic risk management: ATR-based stop-loss adjusts automatically with market volatility, avoiding fixed stop-loss drawbacks
3. Systematic operation: Clear strategy rules maintain trading consistency and discipline
4. Visual intuition: Cloud visualization allows traders to intuitively understand market structure
5. High adaptability: Adjustable parameters can adapt to different market environments

#### Strategy Risks
1. Lag risk: Ichimoku Cloud indicators have inherent lag, potentially leading to delayed entries
2. Ranging market risk: May generate false breakout signals in sideways markets
3. Parameter sensitivity: Different timeframe parameter settings significantly affect strategy performance
4. Stop-loss range: ATR multiplier selection requires balance between protection and profit potential
5. Signal frequency: Strict entry conditions may result in relatively fewer trading opportunities

#### Strategy Optimization Directions
1. Introduce trend strength filtering: Add indicators like ADX to measure trend strength and filter weak trend environments
2. Optimize stop-loss mechanism: Consider setting stops at cloud edges or significant support/resistance levels
3. Add time filtering: Avoid high volatility periods during major economic data releases
4. Include volume confirmation: Add volume as supplementary signal confirmation
5. Develop partial position management: Adjust position sizes based on signal strength and market conditions

#### Summary
The Dynamic Cloud Trend ATR Stop-Loss Strategy is a complete trading system integrating classical technical analysis tools. It identifies trends through the Ichimoku Cloud's multiple confirmation mechanism and implements dynamic risk control using ATR, providing traders with a systematic decision-making framework. While the strategy has certain lag and parameter sensitivity issues, it can achieve stable performance in trending markets through proper optimization and risk management. The strategy's visualization features and clear rules make it particularly suitable for investors wanting to practice systematic trading.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-09-01 00:00:00
end: 2025-02-18 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"TRB_USDT"}]
*/

//@version=5
strategy("Ichimoku Cloud + ATR Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// === Inputs ===
conversionPeriods = input.int(9, title="Tenkan-sen Period", minval=1)
basePeriods = input.int(26, title="Kijun-sen Period", minval=1)
laggingSpan2Periods = input.int(52, title="Senkou Span B Period", minval=1)
displacement = input.int(26, title="Displacement", minval=1)
atrLength = input.int(14, title="ATR Period", minval=1)
atrMultiplier = input.float(1.5, title="ATR Multiplier for Stop-Loss", minval=0.1, step=0.1)

// === Indicator Calculations ===
// Ichimoku Cloud
tenkan = (ta.highest(high, conversionPeriods) + ta.lowest(low, conversionPeriods)) / 2
kijun = (ta.highest(high, basePeriods) + ta.lowest(low, basePeriods)) / 2
senkouSpanA = ta.sma((tenkan + kijun) / 2, 1)
senkouSpanB = (ta.highest(high, laggingSpan2Periods) + ta.lowest(low, laggingSpan2Periods)) / 2
chikouSpan = close[displacement]

// ATR
atr = ta.atr(atrLength)

// === Entry Conditions ===
longCondition = ta.crossover(tenkan, kijun) and close > senkouSpanA and close > senkouSpanB and chikouSpan > close
shortCondition = ta.crossunder(tenkan, kijun) and close < senkouSpanA and close < senkouSpanB and chikouSpan < close

// === Entry Signals with Stop-Loss ===
if (longCondition)
    longStop = close - (atrMultiplier * atr)
    strategy.entry("Long", strategy.long)
    strategy.exit("Long Exit", from_entry="Long", stop=longStop)

if (shortCondition)
    shortStop = close + (atrMultiplier * atr)
    strategy.entry("Short", strategy.short)
    strategy.exit("Short Exit", from_entry="Short", stop=shortStop)

// === Exit Conditions ===
exitLongCondition = ta.crossunder(tenkan, kijun) or chikouSpan < close
exitShortCondition = ta.crossover(tenkan, kijun) or chikouSpan > close

if (exitLongCondition)
    strategy.close("Long")

if (exitShortCondition)
    strategy.close("Short")

// === Plotting Indicators on the Chart ===
// Ichimoku Cloud
plot(senkouSpanA, color=color.green, title="Senkou Span A")
plot(senkouSpanB, color=color.red, title="Senkou Span B")
fill(plot(senkouSpanA, color=color.green), plot(senkouSpanB, color=color.red), color=close > senkouSpanA ? color.new(color.green, 90) : color.new(color.red, 90), title="Ichimoku Cloud")

// Tenkan-sen and Kijun-sen
plot(tenkan, color=color.blue, title="Tenkan-sen")
plot(kijun, color=color.red, title="Kijun-sen")

// Chikou Span
plot(chikouSpan, color=color.purple, title="Chikou Span", offset=-displacement)

// ATR (hidden)
plot(atr, color=color.orange, title="ATR", linewidth=1, display=display.none)

// === Signal Visualization ===
// Markers for Long and Short entries
plotshape(series=longCondition, title="Long Entry", location=location.belowbar, color=color.green, style=shape.labelup, text="Long")
plotshape(series=shortCondition, title="Short Entry", location=location.abovebar, color=color.red, style=shape.labeldown, text="Short")

// Markers for Long and Short exits
plotshape(series=exitLongCondition, title="Long Exit", location=location.abovebar, color=color.red, style=shape.labeldown, text="Exit Long")
plotshape(series=exitShortCondition, title="Short Exit", location=location.belowbar, color=color.green, style=shape.labelup, text="Exit Short")

```

> Detail

https://www.fmz.com/strategy/482673

> Last Modified

2025-02-27 17:54:39
