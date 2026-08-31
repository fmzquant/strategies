
> Name

MACD-and-EMA-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11b391dc310787e97ba.png)



## Overview 

This strategy uses the crossover of the MACD indicator fast and slow lines to determine entries and exits. The EMA indicator is also used to judge trend direction. It goes long when the fast line breaks through the slow line from below and the MACD value is below 0; it goes short when the fast line breaks through the slow line from above and the MACD value is above 0. The stop loss exit is set to the EMA value when the signal was generated; the take profit is set to 2 times the entry price.  

## Strategy Principle

When the fast line of the MACD breaks through the slow line from below and the MACD value is below 0, it indicates that the short-term moving average of the price starts to rise and the momentum begins to strengthen, so a long position can be taken. When the fast line breaks through the slow line from above and the MACD value is above 0, it indicates that the short-term moving average of the price begins to fall and the momentum begins to weaken, so a short position can be taken.  

The EMA indicator judges the overall trend direction. Higher EMA values indicate an upward trend while lower values indicate a downward trend. The strategy only goes long when the EMA indicates an upward trend and goes short when the EMA indicates a downward trend to avoid counter trend trading.

The stop loss is set to the EMA value when the signal was generated. The EMA can judge the trend well. Setting it as the EMA value can reduce the probability of stop loss being taken out by previous low or high points. The take profit is set to 2 times the entry price, giving a risk reward ratio of 2.

## Advantage Analysis 

This strategy combines the MACD and EMA indicators to better determine entry timing and trend direction. The stop loss method avoids chasing rises and selling falls. The risk reward ratio of 2 is a relatively conservative parameter setting. The parameters of the MACD indicator can be adjusted to flexibly adapt to market changes.

## Risk Analysis

The MACD indicator has averaging lag, indicator turns tend to lag price turns. The strategy cannot determine specific entry points, there is some blindness. The stop loss tends to be triggered by volatile price action. Take profit points may be hit prematurely or with delay.  

## Optimization Directions

1. Optimize parameters of MACD to make it more sensitive or stable.  
2. Incorporate other indicators to determine more accurate entry points.
3. Dynamically adjust stop loss and take profit parameters. 
4. Optimize money management to determine more suitable position sizing.

## Summary

This strategy combines the MACD and EMA indicators to determine entry timing and trend direction. It uses simple and reasonable methods for stop loss and take profit. Further optimizations can be done on the lagging of the MACD, stop loss and take profit parameters etc. to obtain better strategy results.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Fast Length|
|v_input_2|26|Slow Length|
|v_input_3|9|Signal Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-21 00:00:00
end: 2023-12-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("MACD & EMA 200 Strategy", overlay=true)

// MACD Settings
fastLength = input(12, title="Fast Length")
slowLength = input(26, title="Slow Length")
signalLength = input(9, title="Signal Length")
src = close

[macdLine, signalLine, _] = ta.macd(src, fastLength, slowLength, signalLength)

// 200 EMA
ema200 = ta.ema(src, 200)
plot(ema200, title="200 EMA", color=color.red)

// Long Condition
longCondition = ta.crossover(macdLine, signalLine) and macdLine < 0 and close > ema200
if (longCondition and strategy.position_size <= 0)
    strategy.entry("Long", strategy.long)
    longStopLoss = ema200
    longTakeProfit = close + 2 * (close - ema200)
    strategy.exit("Exit Long", "Long", stop=longStopLoss, limit=longTakeProfit)

// Short Condition
shortCondition = ta.crossunder(macdLine, signalLine) and macdLine > 0 and close < ema200
if (shortCondition and strategy.position_size <= 0)
    strategy.entry("Short", strategy.short)
    shortStopLoss = ema200
    shortTakeProfit = close - 2 * (ema200 - close)
    strategy.exit("Exit Short", "Short", stop=shortStopLoss, limit=shortTakeProfit)

```

> Detail

https://www.fmz.com/strategy/436876

> Last Modified

2023-12-28 15:22:14
