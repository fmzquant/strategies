
> Name

Bollinger-Bands-and-Fibonacci-Intraday-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b13c5ec476b540194d.png)


#### Overview
This strategy is an intraday trading system that combines Bollinger Bands and Fibonacci retracement levels. It identifies overbought and oversold conditions using Bollinger Bands while utilizing Fibonacci retracement levels to confirm potential support and resistance zones, thereby capturing trading opportunities in market fluctuations. The strategy employs Bollinger Bands based on a 20-period window and three key Fibonacci levels: 0.236, 0.382, and 0.618.

#### Strategy Principles
The core logic of the strategy is based on the following key elements:
1. Using Bollinger Bands (2 standard deviations) to identify overbought and oversold price zones
2. Calculating Fibonacci retracement levels based on the highest and lowest prices of the last 20 periods
3. Generating buy signals when price breaks below the lower Bollinger Band and remains above the Fibonacci 0.236 or 0.382 support levels
4. Generating sell signals when price breaks above the upper Bollinger Band and remains below the Fibonacci 0.618 resistance level
5. Using fixed stop-loss and take-profit points to control risk and secure profits

#### Strategy Advantages
1. Combines trend and support/resistance confirmation mechanisms, improving signal reliability
2. Bollinger Bands dynamically adapt to changes in market volatility, providing good strategy adaptability
3. Fibonacci levels provide a clear reference framework for entries and exits
4. Fixed stop-loss and take-profit settings help maintain strict risk control
5. Strategy parameters can be flexibly adjusted for different market conditions

#### Strategy Risks
1. May generate frequent false breakout signals in ranging markets
2. Fixed stop-loss and take-profit settings may not suit all market environments
3. Effectiveness of Fibonacci levels is heavily influenced by market structure
4. May miss some opportunities in rapidly trending markets
5. Requires continuous monitoring and parameter adjustment to adapt to market changes

#### Strategy Optimization Directions
1. Introduce volume indicators to confirm breakout validity
2. Dynamically adjust stop-loss and take-profit levels based on market volatility
3. Add trend filters to avoid trading in ranging markets
4. Optimize the calculation period for Fibonacci levels
5. Consider adding time filters to avoid trading during low liquidity periods

#### Summary
This is a complete trading system combining classic technical analysis tools, providing traders with a systematic trading framework through the synergy of Bollinger Bands and Fibonacci retracements. While it has certain limitations, the strategy can perform well in intraday trading through appropriate parameter optimization and risk management. The key is to make corresponding adjustments and optimizations based on specific trading instruments and market conditions.



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-02 00:00:00
end: 2025-01-09 00:00:00
period: 10m
basePeriod: 10m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":49999}]
*/

//@version=5
strategy("Bollinger Bands and Fibonacci Intraday Strategy", overlay=true)

// Bollinger Bands settings
length = input.int(20, title="Bollinger Band Length")
src = close
mult = input.float(2.0, title="Bollinger Band Multiplier")
basis = ta.sma(src, length)
dev = mult * ta.stdev(src, length)
upper = basis + dev
lower = basis - dev

// Fibonacci retracement levels
fibRetrace1 = input.float(0.236, title="Fibonacci Level 0.236")
fibRetrace2 = input.float(0.382, title="Fibonacci Level 0.382")
fibRetrace3 = input.float(0.618, title="Fibonacci Level 0.618")

// Define the Fibonacci levels based on recent high and low
var float fibLow = na
var float fibHigh = na

if (bar_index == 0 or ta.highest(high, 20) != fibHigh or ta.lowest(low, 20) != fibLow)
    fibHigh := ta.highest(high, 20)
    fibLow := ta.lowest(low, 20)

fibLevel1 = fibLow + (fibHigh - fibLow) * fibRetrace1
fibLevel2 = fibLow + (fibHigh - fibLow) * fibRetrace2
fibLevel3 = fibLow + (fibHigh - fibLow) * fibRetrace3

// Plot Fibonacci levels on the chart
plot(fibLevel1, title="Fib 0.236", color=color.blue, linewidth=1)
plot(fibLevel2, title="Fib 0.382", color=color.green, linewidth=1)
plot(fibLevel3, title="Fib 0.618", color=color.red, linewidth=1)

// Buy and Sell conditions
buyCondition = close < lower and close > fibLevel1
sellCondition = close > upper and close < fibLevel3

// Plot Buy and Sell signals
plotshape(buyCondition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(sellCondition, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

// Execute strategy
if (buyCondition)
    strategy.entry("Buy", strategy.long)

if (sellCondition)
    strategy.entry("Sell", strategy.short)

// Exit strategy with stop loss and take profit
stopLoss = input.float(50, title="Stop Loss (pips)", minval=1)
takeProfit = input.float(100, title="Take Profit (pips)", minval=1)

strategy.exit("Exit Buy", "Buy", stop=close - stopLoss * syminfo.mintick, limit=close + takeProfit * syminfo.mintick)
strategy.exit("Exit Sell", "Sell", stop=close + stopLoss * syminfo.mintick, limit=close - takeProfit * syminfo.mintick)
```

> Detail

https://www.fmz.com/strategy/477975

> Last Modified

2025-01-10 16:29:16
