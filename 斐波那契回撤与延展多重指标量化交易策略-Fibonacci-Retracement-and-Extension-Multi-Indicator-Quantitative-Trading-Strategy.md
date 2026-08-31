
> Name

斐波那契回撤与延展多重指标量化交易策略-Fibonacci-Retracement-and-Extension-Multi-Indicator-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14bbd3c75136d173766.png)


#### Overview
This strategy is a composite quantitative trading system based on Fibonacci retracement and extension levels, combined with EMA trend determination. The strategy identifies important support and resistance levels in the market and executes trades based on trend signals. The system uses 20-period and 50-period EMAs to determine market trends and utilizes Fibonacci retracement levels to find optimal trading opportunities.

#### Strategy Principles
The core logic consists of three main components: First, it calculates the highest and lowest prices over the past 10 periods to determine the price range; Second, it computes five key Fibonacci retracement levels (0.236, 0.382, 0.5, 0.618, 0.786) based on this range; Finally, it determines trend direction through the crossover of 20 and 50-period EMAs. Buy signals are generated when price breaks above retracement levels in an uptrend, while sell signals are triggered when price breaks below retracement levels in a downtrend.

#### Strategy Advantages
1. Combines trend following and price retracement concepts, improving trading accuracy
2. Uses Fibonacci sequences as key price levels, which hold strong psychological significance in markets
3. Employs EMA crossovers for trend identification, avoiding frequent trades in ranging markets
4. Features a clean system design that's easy to understand and maintain
5. Adaptable to different timeframes, demonstrating strong versatility

#### Strategy Risks
1. May generate false signals in highly volatile markets
2. Relies on trend continuation, potentially underperforming in ranging markets
3. Retracement level calculations based on historical highs and lows may lag behind the market
4. Entry point selection might not be precise enough, leading to wider stop losses
5. System lacks dynamic position management mechanisms

#### Strategy Optimization Directions
1. Incorporate volume indicators to improve trend determination accuracy
2. Implement dynamic stop-loss mechanisms for better risk control
3. Optimize retracement level calculation periods to better match market rhythm
4. Add volatility filters to avoid trading during high volatility periods
5. Design more flexible position management systems that adjust holdings based on market conditions

#### Summary
The strategy builds a relatively complete trading system by combining classic technical analysis tools. While there are areas for optimization, the overall framework demonstrates good market adaptability. Through continuous optimization and improvement, the strategy shows promise for better performance in actual trading. It is recommended to conduct thorough historical data backtesting and parameter optimization before live trading.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-11 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Fibonacci Retracement and Extension Strategy", overlay=true)

// Define the Fibonacci levels for retracement and extension
fibRetracementLevels = array.new_float(5)
array.set(fibRetracementLevels, 0, 0.236)
array.set(fibRetracementLevels, 1, 0.382)
array.set(fibRetracementLevels, 2, 0.5)
array.set(fibRetracementLevels, 3, 0.618)
array.set(fibRetracementLevels, 4, 0.786)

fibExtensionLevels = array.new_float(5)
array.set(fibExtensionLevels, 0, 1.618)
array.set(fibExtensionLevels, 1, 2.618)
array.set(fibExtensionLevels, 2, 3.618)
array.set(fibExtensionLevels, 3, 4.236)
array.set(fibExtensionLevels, 4, 5.618)

// Calculate the high and low prices for the last 10 bars
highPrice = ta.highest(high, 10)
lowPrice = ta.lowest(low, 10)

// Calculate the Fibonacci retracement levels
fibRetracement = array.new_float(5)
for i = 0 to 4
    array.set(fibRetracement, i, highPrice - (highPrice - lowPrice) * array.get(fibRetracementLevels, i))

// Calculate the trend using the Exponential Moving Average (EMA)
shortEMA = ta.ema(close, 20)
longEMA = ta.ema(close, 50)

// Define the trend conditions
isUptrend = shortEMA > longEMA
isDowntrend = shortEMA < longEMA

// Generate buy and sell signals
var float lastFibRetracementLevel = na
var float lastFibExtensionLevel = na

// Buy condition: price crosses above the highest retracement level
if (isUptrend)
    for i = 0 to 4
        if (close > array.get(fibRetracement, i))
            lastFibRetracementLevel := array.get(fibRetracement, i)
            strategy.entry("Buy", strategy.long)

// Sell condition: price crosses below the lowest retracement level
if (isDowntrend)
    for i = 0 to 4
        if (close < array.get(fibRetracement, i))
            lastFibRetracementLevel := array.get(fibRetracement, i)
            strategy.entry("Sell", strategy.short)

// Plotting the Fibonacci levels on the chart
// for i = 0 to 4
//     line.new(bar_index[10], array.get(fibRetracement, i), bar_index, array.get(fibRetracement, i), color=color.new(color.blue, 70), width=1)

// Plot the EMAs
plot(shortEMA, color=color.red, title="Short EMA")
plot(longEMA, color=color.blue, title="Long EMA")
```

> Detail

https://www.fmz.com/strategy/471662

> Last Modified

2024-11-12 10:51:02
