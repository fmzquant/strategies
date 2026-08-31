
> Name

EMA-Momentum-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/166d45c816112a0f46a.png)


## Overview  

The Momentum Moving Average Crossover strategy generates trading signals by calculating fast Exponential Moving Average (EMA) and slow EMA and observing their crossover. It will generate a buy signal when the fast EMA crosses above the slow EMA, and it will generate a sell signal when the fast EMA crosses below the slow EMA.

## Strategy Principle  

This strategy uses two EMAs as the main analytical tool - one fast EMA with a period of 7 and one slow EMA with a period of 21. EMA is a trend tracking indicator that can smooth price data and filter out market noise. The fast EMA is more sensitive than the slow EMA, so it can capture changes in price trends faster.

When the fast EMA crosses above the slow EMA, it indicates that the short-term trend begins to dominate the long-term trend, i.e. prices start to rise. At this point, the strategy will generate a buy signal and open a long position. On the contrary, when the fast EMA crosses below the slow EMA, it indicates that the short-term trend begins to decline and prices start to fall. At this point, the strategy will generate a sell signal and open a short position.

Using EMA crossover to form momentum trading signals is a widely used quantitative trading strategy. This strategy automatically tracks price trends without manual judgment, enabling efficient automated trading.  

## Advantage Analysis

- Use extensively proven indicator: EMA is a simple but very commonly used technical indicator. This strategy is based on EMA, a mature and effective analytical tool, thus having higher reliability.

- Automatically track trends: This strategy can automatically discover changes in price trends and make timely trading decisions without manual judgment, avoiding missing trades.  

- Simple and clear logic: The crossover principle is simple and easy to understand, making it easy to judge the signals generated, reducing risks.

- Customizable parameters: Users can adjust EMA period parameters according to their own preferences to make the strategy fit personal styles better.

## Risk Analysis

- Possible wrong signals: EMA may generate multiple crossovers causing wrong signals when prices oscillate. This can be reduced by optimizing parameters or adding filtering conditions.

- Reliance on single indicator: This strategy relies entirely on the EMA indicator. When EMA fails or lags, it will affect strategy performance. Other indicators can be introduced for combination verification.  

- Lack of stop loss mechanism: Currently there is no stop loss in the strategy, unable to actively control risks. Reasonable points or percentage stop loss should be set.  

- Improper parameters may fail: If the parameters set are improper, EMA crossover loses practical meaning. The reasonability of parameters should be carefully evaluated.

## Optimization Directions 

- Add trend filtering: Check overall price trend when EMA crossover happens to avoid wrong signals during consolidations.

- Multi-indicator verification: Introduce other indicators like MACD, BOLL etc. to combine with EMA to verify trading signals. 

- Add stop loss strategy: Set reasonable moving or percentage stop loss based on historical drawdown to actively control risks.

- Parameter optimization: Find optimum parameter combinations through backtest, or set dynamic cycle to optimize parameters.  

## Summary

The Momentum Moving Average Crossover Strategy has a clear logic of forming trading signals through fast and slow EMA crossover, which can automatically track trends and reduce manual workload. But it also has certain profit risks. Adding signal filtering, stop loss mechanisms and optimizing parameter settings can reduce risks and improve strategy stability. Overall, it is a simple strategy suitable as a quantitative trading starter strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Quantity|
|v_input_2|2500|Stoploss|
|v_input_3|7|Fast EMA|
|v_input_4|21|Slow EMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-30 00:00:00
end: 2023-12-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © sandeepdezno

//@version=5
strategy("EMA_Crossover", overlay=true)

//Inputs
quantity = input(1, "Quantity")
slPoints = input(2500, "Stoploss")

fastEMA = input(7, "Fast EMA")
slowEMA = input(21, "Slow EMA")

//Defining EMAs
fema = ta.ema(close, fastEMA)
sema = ta.ema(close, slowEMA)

//Checking for Crossover
buyCrossover = ta.crossover(fema, sema) //Buy Signal
sellCrossover = ta.crossunder(fema, sema) //Sell Signal

plot(fema, title = "Fast_EMA", style = plot.style_line, linewidth = 1, color = color.red)
plot(sema, title = "Slow_EMA", style = plot.style_line, linewidth = 2, color = color.black)


//Generating Entries
if buyCrossover
    strategy.entry("Buy",strategy.long, qty = quantity)

if sellCrossover
    strategy.entry("Sell", strategy.short, qty = quantity)

//Stoploss Exit
strategy.exit("StopLoss", from_entry = "Buy", loss = slPoints, qty = quantity)
strategy.exit("StopLoss", from_entry = "Sell", loss = slPoints, qty = quantity)

```

> Detail

https://www.fmz.com/strategy/434593

> Last Modified

2023-12-07 17:00:52
