
> Name

移动平均线交叉金策略Moving-Average-Crossover-Gold-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1e0e6dd823a4bce8cd2.png)

## Overview

This strategy is a simple moving average crossover strategy. It goes long when the fast EMA crosses above the slow EMA and goes short when the fast EMA crosses below the slow EMA. The strategy incorporates stop loss, take profit and break-even to effectively control risks.  

## Strategy Logic

The strategy is based on fast and slow moving averages. The fast line is 9-day EMA and the slow line is 21-day EMA. It goes long when the fast line crosses above the slow line from below. It goes short when the fast line crosses below the slow line from above. Exits are triggered by reverse crosses.  

Stop loss is set based on a percentage of close. Take profit is set based on a percentage of close. Break-even stop loss moves to entry price when price reaches break-even level.

## Advantage Analysis 

The advantages of this strategy are:

1. Simple and clear logic, easy to understand and implement
2. Utilizes trend following ability of moving averages, catching trends effectively 
3. Incorporates stop loss, take profit and break-even to control risks
4. Flexible parameter adjustment, optimizable for different markets

## Risk Analysis

There are some risks:  

1. Lagging issue of moving averages, potentially missing reversal signals
2. Improper stop loss or take profit setting may cause unnecessary loss or profit loss
3. Improper parameter setting may lead to over-trading or missing trades  

Solutions:

1. Optimize parameters and set moving averages properly  
2. Adjust stop loss/take profit percentage, ensure reasonable setting
3. Adjust parameters for different markets to avoid over-trading

## Optimization Directions

The strategy can be optimized by:

1. Testing different length combinations of moving averages  
2. Adjusting percentages of stop loss, take profit and break-even for different market volatility
3. Adding other technical indicators for filtering entry signals 
4. Dynamically optimizing parameters with statistical techniques or machine learning

## Summary  

Overall, this moving average crossover gold strategy has clear logic and is easy to implement. With stop loss, take profit and break-even, it controls risks. With proper parameter tuning and optimization for different markets, it can achieve good performance. But the risks of whipsaws and difficulty of parameter optimization need to be noted.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Fast EMA Length|
|v_input_2|21|Slow EMA Length|
|v_input_3|true|Stop Loss (%)|
|v_input_4|2|Take Profit (%)|
|v_input_5|true|Break Even (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-20 00:00:00
end: 2023-12-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("XAUUSD Strategy with SL, TP, and BE", shorttitle="EA", overlay=true)

// Define strategy parameters
fastLength = input(9, title="Fast EMA Length")
slowLength = input(21, title="Slow EMA Length")
stopLossPercent = input(1, title="Stop Loss (%)", minval=0, maxval=5) / 100
takeProfitPercent = input(2, title="Take Profit (%)", minval=0, maxval=5) / 100
breakEvenPercent = input(1, title="Break Even (%)", minval=0, maxval=5) / 100

// Calculate EMAs
fastEMA = ema(close, fastLength)
slowEMA = ema(close, slowLength)

// Plot EMAs on the chart
plot(fastEMA, color=color.blue, title="Fast EMA")
plot(slowEMA, color=color.red, title="Slow EMA")

// Strategy logic
enterLong = crossover(fastEMA, slowEMA)
exitLong = crossunder(fastEMA, slowEMA)

enterShort = crossunder(fastEMA, slowEMA)
exitShort = crossover(fastEMA, slowEMA)

// Calculate stop loss, take profit, and break-even levels
longStopLoss = close * (1 - stopLossPercent)
longTakeProfit = close * (1 + takeProfitPercent)
shortStopLoss = close * (1 + stopLossPercent)
shortTakeProfit = close * (1 - takeProfitPercent)

longBreakEven = close * (1 + breakEvenPercent)
shortBreakEven = close * (1 - breakEvenPercent)

// Execute strategy with stop loss, take profit, and break-even
strategy.entry("Long", strategy.long, when = enterLong)
strategy.exit("Take Profit/Stop Loss Long", from_entry="Long", profit = longTakeProfit, loss = longStopLoss)

strategy.entry("Short", strategy.short, when = enterShort)
strategy.exit("Take Profit/Stop Loss Short", from_entry="Short", profit = shortTakeProfit, loss = shortStopLoss)

// Move stop loss to break even when price reaches break-even level
strategy.exit("Break Even Long", from_entry="Long", loss = longBreakEven)
strategy.exit("Break Even Short", from_entry="Short", loss = shortBreakEven)

```

> Detail

https://www.fmz.com/strategy/436773

> Last Modified

2023-12-27 15:56:12
