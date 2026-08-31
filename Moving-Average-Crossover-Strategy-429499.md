
> Name

Moving-Average-Crossover-Strategy-429499

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14b4a649245259e86d9.png)


## Overview

This strategy is a trend-following strategy based on moving averages. It uses the crossover and crossunder of fast and slow moving averages to determine the trend direction for low-risk trend trading.

## Strategy Logic

The strategy employs a fast moving average of period 9 and a slow moving average of period 21. When the fast MA crosses above the slow MA, it signals an uptrend in the market and a long position is taken. When the fast MA crosses below the slow MA, it signals a downtrend and any long position is closed. 

Specifically, the strategy calculates the values of the fast and slow MAs and compares their relationship to determine the trend direction. In an uptrend, if the fast MA crosses above the slow MA, a long entry signal is triggered. In a downtrend, if the fast MA crosses below the slow MA, an exit signal is triggered to close the existing long position.

This way, the crossover and crossunder of the fast and slow MAs captures trend transitions for low-risk trend following trading.

## Advantages

- Using moving averages to determine trend filters out market noise and identifies trend direction
- The fast MA captures trend changes faster, while the slow MA filters out false signals
- Using crossover to buy and crossunder to sell avoids chasing tops and selling bottoms
- Simple and clear trading logic, easy to understand and implement

## Risks

- Moving averages have lag and may miss best entry/exit points for trend transitions 
- Fixed MA lengths cannot adapt to different market cycles
- Dual MA strategies tend to generate excessive trading signals and overfitting
- Using just MAs to determine trades is prone to sudden events and losses

Risks can be managed by tuning parameters, adding filters, stop loss/take profit.

## Improvement Directions 

- Test different parameter settings like MA lengths, crossover/crossunder thresholds etc.
- Add momentum indicators as filters to avoid false breakouts
- Add trend-determining indicators to distinguish trending and ranging markets
- Incorporate volatility metrics to optimize stops and take profits  
- Employ machine learning to dynamically optimize parameters

## Summary

As a simple trend following strategy, the core idea is to use fast and slow MAs to determine trend direction. The pros are simplicity, clear rules, and effective trend tracking. The cons are lag, false signals, and excessive trades. We can optimize it by adjusting parameters and adding other indicators to better adapt to market conditions. Overall, the dual MA strategy provides a simple and reliable approach to quantitative trading. With continuous improvements, its performance can become even better.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|9|Fast MA Length|
|v_input_int_2|21|Slow MA Length|
|v_input_float_1|true|Stop Loss %|
|v_input_float_2|true|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-01 00:00:00
end: 2023-09-20 23:59:59
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Profitable Crypto Strategy", shorttitle="Profit Strategy", overlay=true)

// Define strategy parameters
fastLength = input.int(9, title="Fast MA Length", minval=1)
slowLength = input.int(21, title="Slow MA Length", minval=1)
stopLossPercent = input.float(1.0, title="Stop Loss %", step=0.1)
takeProfitPercent = input.float(1.0, title="Take Profit %", step=0.1)

// Calculate moving averages
fastMA = ta.sma(close, fastLength)
slowMA = ta.sma(close, slowLength)

// Entry condition: Buy when fast MA crosses above slow MA
longCondition = ta.crossover(fastMA, slowMA)
// Exit condition: Sell when fast MA crosses below slow MA
shortCondition = ta.crossunder(fastMA, slowMA)

// Plot moving averages on the chart
plot(fastMA, color=color.blue, title="Fast MA")
plot(slowMA, color=color.orange, title="Slow MA")

// Strategy entry and exit logic
var stopLossPrice = 0.0
var takeProfitPrice = 0.0

if (longCondition)
    stopLossPrice := close * (1.0 - stopLossPercent / 100)
    takeProfitPrice := close * (1.0 + takeProfitPercent / 100)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.close("Long")

// Set stop loss and take profit for open positions
strategy.exit("Stop Loss/Profit", stop=stopLossPrice, limit=takeProfitPrice)

```

> Detail

https://www.fmz.com/strategy/429499

> Last Modified

2023-10-17 16:46:57
