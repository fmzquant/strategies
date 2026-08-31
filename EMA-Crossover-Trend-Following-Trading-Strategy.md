
> Name

EMA-Crossover-Trend-Following-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f742b2bb8d46ac708d.png)

## Overview

This strategy uses the golden cross and death cross of fast and slow EMA lines to determine the trend and sets a profit percentage as the take profit rule to implement trend following trading. It is applicable to any timeframe and can capture trends in both indexes and stocks.

## Strategy Logic

The strategy employs 3 and 30 period EMAs as trading signals. When the 3EMA crosses above the 30EMA, it signals that price starts to rise which conforms to the buy condition. When the 3EMA crosses below the 30EMA, it signals that price starts to fall which conforms to the sell condition.  

In addition, a profit target is configured in the strategy. When price rises to the entry price multiplied by the profit percentage, the position will be closed to lock in more profits and achieve trend following trading.

## Advantage Analysis  

1. Using EMAs to determine trends is simple and easy to grasp. 
2. Combining trend indicators and take profit rules can effectively control risks and lock in profits.
3. Applicable to any timeframe and tradable, great flexibility.

## Risk Analysis

1. EMA itself has lagging effect on price changes, may cause misjudgments.  
2. Overly large profit target may lead to failure in timely profit-taking, missing reversal opportunities.
3. Stopping tracking too early may result in missing part of the trending move.

## Optimization Directions 

1. Different EMA combinations can be tested to find the optimal parameters.
2. Other indicators can be combined to verify the EMA signals and improve accuracy. 
3. The profit percentage can be dynamically tuned, relaxed during bull market and tightened during bear market.

## Conclusion

In conclusion, this is a very practical trend following strategy. It adopts simple EMA indicators to determine the trend direction and sets reasonable profit taking rules to effectively control risks, suitable for long term tracking of stock and index mid-to-long term trends. Further improvements on stability and profit factor can be achieved through parameter optimization and supplementary signal verification indicators.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Fast EMA Length|
|v_input_2|30|Slow EMA Length|
|v_input_3|100|Profit Percentage|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-12 00:00:00
end: 2024-02-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("EMA Crossover Strategy with Target", shorttitle="EMACross", overlay=true)

// Define input parameters
fastLength = input(3, title="Fast EMA Length")
slowLength = input(30, title="Slow EMA Length")
profitPercentage = input(100.0, title="Profit Percentage")

// Calculate EMAs
fastEMA = ta.ema(close, fastLength)
slowEMA = ta.ema(close, slowLength)

// Plot EMAs on the chart
plot(fastEMA, color=color.blue, title="Fast EMA")
plot(slowEMA, color=color.red, title="Slow EMA")

// Buy condition: 3EMA crosses above 30EMA
buyCondition = ta.crossover(fastEMA, slowEMA)

// Sell condition: 3EMA crosses below 30EMA or profit target is reached
sellCondition = ta.crossunder(fastEMA, slowEMA) or close >= (strategy.position_avg_price * (1 + profitPercentage / 100))

// Target condition: 50 points profit
//targetCondition = close >= (strategy.position_avg_price + 50)

// Execute orders
// strategy.entry("Buy", strategy.long, when=buyCondition)
// strategy.close("Buy", when=sellCondition )
if (buyCondition)
    strategy.entry("Buy", strategy.long)

if (sellCondition)
    strategy.close("Buy")

// // Execute sell orders
// strategy.entry("Sell", strategy.short, when=sellCondition)
// strategy.close("Sell", when=buyCondition)

// Plot buy and sell signals on the chart
plotshape(series=buyCondition, title="Buy Signal", color=color.green, style=shape.labelup, location=location.belowbar)
plotshape(series=sellCondition, title="Sell Signal", color=color.red, style=shape.labeldown, location=location.abovebar)

```

> Detail

https://www.fmz.com/strategy/442077

> Last Modified

2024-02-19 10:39:22
