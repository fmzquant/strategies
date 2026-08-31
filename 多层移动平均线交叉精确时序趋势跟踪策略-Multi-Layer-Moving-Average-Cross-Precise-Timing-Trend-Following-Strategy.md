
> Name

多层移动平均线交叉精确时序趋势跟踪策略-Multi-Layer-Moving-Average-Cross-Precise-Timing-Trend-Following-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d89d8f862aaf81d50158.png)
![IMG](https://www.fmz.com/upload/asset/2d8b52b12cf350eab3dd4.png)




#### Overview
This strategy is a trend following system based on multiple Simple Moving Averages (SMA) combined with precise tick cross detection technology. It determines market trends through the hierarchical relationship of 20, 50, 100, and 200-period moving averages, and triggers trading signals using real-time price crosses with moving averages. The strategy is designed to be universally applicable across different time zones and trading sessions, capable of running on charts of various timeframes.

#### Strategy Principle
The strategy employs a three-layer trend filtering mechanism, requiring the 50-period moving average to be above the 100-period moving average, which in turn must be above the 200-period moving average to confirm an uptrend, and vice versa for a downtrend. Entry signals are based on price crosses with the 50-period moving average, using tick data for precise cross detection by comparing current price action with the previous bar's position. Exit signals are determined by the relationship between price and the 20-period moving average, triggering position closure when price breaks through the 20-period moving average.

#### Strategy Advantages
1. Precise cross detection mechanism improves the accuracy of trading timing
2. Multi-layer moving average trend confirmation effectively filters false signals
3. Strategy has good timezone adaptability and can be used in any global market
4. Entry and exit logic is unified and clear, easy to understand and execute
5. Applicable to multiple timeframe charts, demonstrating strong universality

#### Strategy Risks
1. May generate frequent false signals in ranging markets, leading to overtrading
2. Moving averages have inherent lag, potentially missing important turning points
3. Tick cross detection may produce excessive signals in highly volatile markets
4. Multi-layer trend filtering might miss some potential trading opportunities
5. Fixed exit conditions may result in larger drawdowns during severe volatility

#### Strategy Optimization Directions
1. Introduce volatility indicators to dynamically adjust entry and exit conditions
2. Add volume confirmation mechanism to enhance cross signal reliability
3. Design dynamic stop-loss mechanism for better risk control
4. Incorporate market structure analysis to optimize trend judgment accuracy
5. Develop adaptive parameter optimization mechanism to improve strategy stability

#### Summary
This is a well-structured trend following strategy with clear logic that ensures signal reliability and effective trend tracking through the coordinated use of multiple moving averages. The strategy's design considers practicality and universality, making it suitable for use in different market environments. Through further optimization and refinement, this strategy has the potential to achieve better performance in actual trading.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-22 00:00:00
end: 2024-06-25 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("Multi-SMA Strategy - Core Signals", overlay=true)

// ———— Universal Inputs ———— //
int smaPeriod1 = input(20, "Fast SMA")
int smaPeriod2 = input(50, "Medium SMA")
bool useTickCross = input(true, "Use Tick-Precise Crosses")

// ———— Timezone-Neutral Calculations ———— //
sma20 = ta.sma(close, smaPeriod1)
sma50 = ta.sma(close, smaPeriod2)
sma100 = ta.sma(close, 100)
sma200 = ta.sma(close, 200)

// ———— Tick-Precise Cross Detection ———— //
golden_cross = useTickCross ? 
  (high >= sma50 and low[1] < sma50[1]) : 
  ta.crossover(sma20, sma50)

death_cross = useTickCross ? 
  (low <= sma50 and high[1] > sma50[1]) : 
  ta.crossunder(sma20, sma50)

// ———— Trend Filter ———— //
uptrend = sma50 > sma100 and sma100 > sma200
downtrend = sma50 < sma100 and sma100 < sma200

// ———— Entry Conditions ———— //
longCondition = golden_cross and uptrend
shortCondition = death_cross and downtrend

// ———— Exit Conditions ———— //
exitLong = ta.crossunder(low, sma20)
exitShort = ta.crossover(high, sma20)

// ———— Strategy Execution ———— //
strategy.entry("Long", strategy.long, when=longCondition)
strategy.entry("Short", strategy.short, when=shortCondition)
strategy.close("Long", when=exitLong)
strategy.close("Short", when=exitShort)

// ———— Clean Visualization ———— //
plot(sma20, "20 SMA", color.new(color.blue, 0))
plot(sma50, "50 SMA", color.new(color.red, 0))
plot(sma100, "100 SMA", color.new(#B000B0, 0), linewidth=2)
plot(sma200, "200 SMA", color.new(color.green, 0), linewidth=2)

// ———— Signal Markers ———— //
plotshape(longCondition,  "Long Entry", shape.triangleup, location.belowbar, color.green, 0)
plotshape(shortCondition, "Short Entry", shape.triangledown, location.abovebar, color.red, 0)
plotshape(exitLong,  "Long Exit", shape.xcross, location.abovebar, color.blue, 0)
plotshape(exitShort, "Short Exit", shape.xcross, location.belowbar, color.orange, 0)
```

> Detail

https://www.fmz.com/strategy/483122

> Last Modified

2025-02-21 14:32:49
