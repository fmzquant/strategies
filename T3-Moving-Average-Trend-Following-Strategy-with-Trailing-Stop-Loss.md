
> Name

T3-Moving-Average-Trend-Following-Strategy-with-Trailing-Stop-Loss

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11fb7477beadd6f6040.png)

#### Overview
This strategy is a comprehensive quantitative trading system that combines T3 Moving Average, trend following, and trailing stop loss mechanisms. The strategy identifies market trend direction using T3 Moving Average, confirms signals using Lemon Trend Indicator and TDFI indicator, and incorporates a risk management system that combines trailing stops with fixed stops to capture trends and effectively control risks.

#### Strategy Principles
The strategy consists of three main components: trend identification, signal confirmation, and risk management. First, it uses T3 Moving Average as the primary trend identification tool, which reduces lag while maintaining smoothness through six-fold exponential moving average calculations. Second, it calculates price volatility ranges using the Lemon Trend Indicator and filters signals with the TDFI indicator, generating trade signals only when price breaks through the volatility range and TDFI confirms. Finally, the strategy employs a combination of trailing and fixed stops for risk management, with trailing stops activating after price reaches threshold levels while maintaining fixed stops as protection.

#### Strategy Advantages
1. Multiple signal confirmation mechanisms improve trading accuracy
2. T3 Moving Average reduces the impact of false breakouts
3. Flexible risk management system that protects profits while allowing trends to develop
4. Supports partial position exits for staged profit realization
5. Highly adjustable parameters for optimization in different market conditions

#### Strategy Risks
1. Complex T3 Moving Average calculations may introduce computational delays
2. Multiple signal confirmations might cause missed trading opportunities
3. Trailing stops may trigger prematurely during volatile market conditions
4. Requires significant price movements to generate effective signals
5. May generate frequent false signals in ranging markets

#### Optimization Directions
1. Introduce volatility indicators to adjust trailing stop parameters
2. Add market environment recognition module for different parameter sets
3. Optimize TDFI indicator calculation periods for improved signal timing
4. Consider incorporating volume factors for signal confirmation
5. Research adaptive partial profit-taking ratio mechanisms

#### Conclusion
This is a comprehensively designed trend-following strategy that ensures reliable trading signals and effective risk management through multiple technical indicators. The strategy's modular design provides good extensibility and optimization potential, making it suitable as a foundation for medium to long-term trend following systems. In practical application, it is recommended to optimize parameters based on specific trading instruments and market conditions.

> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-27 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Lemon Trend Strategy", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100)
 
// Input parameters
lookbackPeriod = input.int(14, "Lookback Period")
t3Length = input.int(200, "T3 MA Length")
t3Factor = input.float(0.7, "T3 Factor", minval=0, maxval=1)

// 移动止损参数
trailingStopPct = input.float(1.5, "移动止损百分比", minval=0.1, step=0.1)
trailingStopActivationPct = input.float(1.0, "移动止损激活百分比", minval=0.1, step=0.1)
 
// === T3 Moving Average Function ===
t3(src, length, factor) =>
    // First EMA
    e1 = ta.ema(src, length)
    // Second EMA
    e2 = ta.ema(e1, length)
    // Third EMA
    e3 = ta.ema(e2, length)
    // Fourth EMA
    e4 = ta.ema(e3, length)
    // Fifth EMA
    e5 = ta.ema(e4, length)
    // Sixth EMA
    e6 = ta.ema(e5, length)
   
    c1 = -factor * factor * factor
    c2 = 3 * factor * factor + 3 * factor * factor * factor
    c3 = -6 * factor * factor - 3 * factor - 3 * factor * factor * factor
    c4 = 1 + 3 * factor + factor * factor * factor + 3 * factor * factor
   
    t3 = c1 * e6 + c2 * e5 + c3 * e4 + c4 * e3
 
// Calculate T3 MA
t3ma = t3(close, t3Length, t3Factor)
plot(t3ma, "T3 MA", color=color.blue)
 
// === Lemon Trend Indicator ===
highLowDiff = high - low
normalizedDiff = ta.sma(highLowDiff, lookbackPeriod)
upperBand = ta.highest(high, lookbackPeriod)
lowerBand = ta.lowest(low, lookbackPeriod)
buySignal = ta.crossover(close, upperBand - normalizedDiff)
sellSignal = ta.crossunder(close, lowerBand + normalizedDiff)
 
// === TDFI Indicator ===
tdfiLength = input.int(14, "TDFI Length")
tdfi = ta.ema(close - close[1], tdfiLength)
tdfiSignal = ta.ema(tdfi, 9)
 
// Plot signals
plotshape(buySignal and tdfi > tdfiSignal and close > t3ma, "Buy Signal", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)
plotshape(sellSignal and tdfi < tdfiSignal and close < t3ma, "Sell Signal", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small)
 
// === Strategy Logic ===
longCondition = buySignal and tdfi > tdfiSignal and close > t3ma
shortCondition = sellSignal and tdfi < tdfiSignal and close < t3ma
 
// 计算移动止损价格
var float longTrailingStop = na
var float shortTrailingStop = na

// 更新移动止损价格
if (strategy.position_size > 0)
    threshold = strategy.position_avg_price * (1 + trailingStopActivationPct / 100)
    if (high > threshold)
        stopPrice = high * (1 - trailingStopPct / 100)
        if (na(longTrailingStop) or stopPrice > longTrailingStop)
            longTrailingStop := stopPrice
    
if (strategy.position_size < 0)
    threshold = strategy.position_avg_price * (1 - trailingStopActivationPct / 100)
    if (low < threshold)
        stopPrice = low * (1 + trailingStopPct / 100)
        if (na(shortTrailingStop) or stopPrice < shortTrailingStop)
            shortTrailingStop := stopPrice

// Entry orders
if (longCondition)
    strategy.entry("Long", strategy.long)
    longTrailingStop := na
    
if (shortCondition)
    strategy.entry("Short", strategy.short)
    shortTrailingStop := na
 
// Calculate stop loss and take profit levels
longStopLoss = ta.lowest(low, lookbackPeriod)
shortStopLoss = ta.highest(high, lookbackPeriod)
 
// Exit conditions with fixed R:R
fixedRR = input.float(1.8, "Fixed Risk:Reward Ratio")
partialExitPct = input.float(50.0, "Partial Exit Percentage", minval=0, maxval=100) / 100
 
// 综合移动止损和固定止损
if (strategy.position_size > 0)
    longTakeProfit = strategy.position_avg_price + (strategy.position_avg_price - longStopLoss) * fixedRR
    stopPrice = na(longTrailingStop) ? longStopLoss : math.max(longStopLoss, longTrailingStop)
    strategy.exit("Long Exit", "Long", qty_percent=partialExitPct, stop=stopPrice, limit=longTakeProfit)
    
if (strategy.position_size < 0)
    shortTakeProfit = strategy.position_avg_price - (shortStopLoss - strategy.position_avg_price) * fixedRR
    stopPrice = na(shortTrailingStop) ? shortStopLoss : math.min(shortStopLoss, shortTrailingStop)
    strategy.exit("Short Exit", "Short", qty_percent=partialExitPct, stop=stopPrice, limit=shortTakeProfit)

// 绘制移动止损线
plot(strategy.position_size > 0 ? longTrailingStop : na, "Long Trailing Stop", color=color.red, style=plot.style_linebr)
plot(strategy.position_size < 0 ? shortTrailingStop : na, "Short Trailing Stop", color=color.red, style=plot.style_linebr)
```

> Detail

https://www.fmz.com/strategy/473237

> Last Modified

2024-11-28 15:17:13
