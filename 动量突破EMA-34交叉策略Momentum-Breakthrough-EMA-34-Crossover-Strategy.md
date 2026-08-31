
> Name

动量突破EMA-34交叉策略Momentum-Breakthrough-EMA-34-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6d25a219a081bc2720.png)

## Overview  

This strategy is a trend-following strategy based on the momentum crossover of EMA 34 as the entry signal. It combines the breakthrough signals of price breaking through the EMA momentum line and the golden cross of EMA 34 to generate trading signals.   

## Strategy Principle

The strategy first calculates the 34-period EMA lines of close, high, low, named as emaClose, emaHigh, emaLow respectively. Then it generates buy and sell signals according to whether the price breaks through emaHigh and emaLow.   

Specifically, when the close price exceeds emaHigh, a buy signal is generated; when the close price is below emaLow, a sell signal is generated. Once the signal is generated, enter at the close price at that time, and set the take profit to 100 points and the stop loss to 50 points.   

In this way, the strategy uses the momentum indicator of EMA 34 to capture the trend of the market and implement trend following.

## Advantage Analysis  

The biggest advantage of this strategy is that it combines both the golden cross signal of the moving average and the breakthrough signal of the price, which makes the entry point more accurate and can effectively filter false signals. In addition, as a trend-following tool, EMA can help the strategy capture market trends in a timely manner to implement trend trading.   

## Risk Analysis   

The main risk of this strategy is that it is prone to consecutive long losses. When the market has a short adjustment shock before starting a neue uptrend, this strategy may frequently reduce positions at a loss. In addition, as a trend-following strategy, it cannot profit well in a sideways market.  

Optimization can be achieved by appropriately adjusting the stop loss point, or adding other indicators to improve the win rate of the strategy.  

## Optimization Directions  

The strategy can be optimized in the following directions:  

1. Add other indicators for filtering, such as adding a volume indicator to avoid being trapped in false breakouts.   

2. Optimize the EMA cycle parameters and adjust them to cycle parameters more suitable for the variety.   

3. Use an exit mechanism like profit factor instead of simple take profit and stop loss points to improve the stability of the strategy.

4. Increase liquidity filtering to avoid trading in periods with poor liquidity, which can reduce slippage losses.   

## Summary  

As a trend-following strategy based on EMA momentum indicators, this strategy has high practical utility. By combining price breakthrough signals and EMA golden cross signals, it can effectively discover neue trend directions. After a certain parameter and exit mechanism optimization, the stability of the strategy can be further enhanced.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("EMA 34 Crossover Strategy_4", overlay=true)

length = 34
exitPoints = 50

emaClose = ta.ema(close, length)
emaHigh = ta.ema(high, length)
emaLow = ta.ema(low, length)

var float[] entryPrices = array.new_float()
var float[] exitLevels = array.new_float()

// Long entry condition: Price crosses above EMA 34 high
enterLong = ta.crossover(close, emaHigh)

// Short entry condition: Price crosses below EMA 34 low
enterShort = ta.crossunder(close, emaLow)

// Exit condition for both long and short trades
exitLong = array.size(entryPrices) > 0 ? close >= array.get(entryPrices, array.size(entryPrices) - 1) + exitPoints : false
exitShort = array.size(entryPrices) > 0 ? close <= array.get(entryPrices, array.size(entryPrices) - 1) - exitPoints : false

if (enterLong)
    array.push(entryPrices, close)
    array.push(exitLevels, close + exitPoints)
    strategy.entry("Buy", strategy.long)

if (enterShort)
    array.push(entryPrices, close)
    array.push(exitLevels, close - exitPoints)
    strategy.entry("Sell", strategy.short)

if (exitLong)
    strategy.close("Buy")

if (exitShort)
    strategy.close("Sell")

plot(emaClose, color=color.blue, title="EMA 34 Close")
plot(emaHigh, color=color.red, title="EMA 34 High")
plot(emaLow, color=color.green, title="EMA 34 Low")
```

> Detail

https://www.fmz.com/strategy/442847

> Last Modified

2024-02-26 15:05:18
