
> Name

基于RSI和ATR通道的超级scalping策略

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11c8252bf57ef793872.png)
[trans]

## 概述

本策略基于相对强弱指数(RSI)和平均真实波动幅度(ATR)通道,适用于5分钟和15分钟时间周期,属于超级scalping类型策略。策略通过RSI指标判断长短方向进入点,并利用ATR通道设置止损和止盈,实现高频交易。

## 策略原理

1. 使用21日指数移动平均线(EMA)和65日EMA形成金叉死叉,判断大趋势方向。
2. RSI低于50时看跌,高于50时看涨,发出买入和卖出信号。
3. ATR通道上下轨分别为:close+ATR和close-ATR。 close突破ATR上轨时卖出,下破ATR下轨时买入。
4. 利用ATR的2倍设置止损,5倍设置止盈。

## 优势分析

1. 使用金叉死叉判断大趋势,避免逆势操作。
2. RSI可确定较好的入场时机。
3. ATR通道设置止损止盈点效果好,大幅提高盈亏比。
4. 适合高频scalping交易,获利快。

## 风险分析

1. 需密切注意盯盘,错过入场或止损点可能造成较大亏损。 
2. 趋势市场中可能出现多次加仓,需要控制好资金比例。
3. 需要足够的资金支持频繁交易。

## 优化方向

1. 优化ATR参数,使止损止盈更加合理。
2. 增加其他指标过滤,提高入场质量。 
3. 加入自动止损和止盈功能。
4. 增加资金管理和仓位控制模块。

## 总结

本策略属于高频scalping交易类型,通过RSI指标和ATR通道设定入场出场点,实现快速交易。优点是获利快,风险控制到位,适合逢高短轻的操作。但需要密切盯盘,而且需要足够的资金支持频繁交易。整体来说,该策略顺势操作效果好,可通过进一步优化来提升盈利能力。

||

# Super Scalping Strategy Based on RSI and ATR Channel

## Overview

This strategy is based on Relative Strength Index (RSI) and Average True Range (ATR) channel, suitable for 5-min and 15-min timeframes, belonging to super scalping strategy type. It determines long/short direction entry points through RSI indicator and utilizes ATR channel to set stop loss and take profit, realizing high frequency trading.

## Strategy Principle 

1. Use 21-day Exponential Moving Average (EMA) and 65-day EMA to form golden cross and dead cross, judging the major trend direction.
2. When RSI is below 50, it is bearish; when above 50, it is bullish, sending out buy and sell signals.
3. The upper and lower bands of ATR channel are: close+ATR and close-ATR. Sell when close breaks through the upper band of ATR and buy when it breaks through the lower band.  
4. Set stop loss at 2 times ATR and take profit at 5 times ATR.

## Advantage Analysis

1. Using golden cross and dead cross to determine major trend, avoiding trading against the trend.
2. RSI can identify better entry timing.
3. ATR channel sets stop loss and take profit points effectively, greatly improving profit-loss ratio. 
4. Suitable for high frequency scalping trading with quick profits.

## Risk Analysis  

1. Need to watch the market closely, otherwise missing entry or stop loss points may lead to huge loss.
2. In trending market, multiple add-on positions may occur, needing good control of position sizing.
3. Enough capital is required to support frequent trading.  

## Optimization Direction

1. Optimize ATR parameters for more reasonable stop loss and take profit.
2. Add other indicator filters to improve entry quality.
3. Add auto stop loss and take profit functions. 
4. Include capital management and position sizing control modules.

## Summary

This strategy belongs to high frequency scalping trading type. It sets entry and exit points through RSI indicator and ATR channel for quick trades. The advantages are quick profit with good risk control, suitable for trading along the trend. However, close market watch is needed with enough capital supporting frequent trades. Overall speaking, this strategy performs well for trend trading and could be further improved on profitability through optimization.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-11-27 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Super Scalper - 5 Min 15 Min", overlay=true)

// Create Indicator's
shortSMA = ema(close, 21)
longSMA = ema(close, 65)
rsi = rsi(close, 14)
atr = atr(14)

// Specify  conditions
longCondition = open < close-atr
shortCondition = open > atr+close
GoldenLong = crossover(shortSMA,longSMA)
Goldenshort = crossover(longSMA,shortSMA)

plotshape(shortCondition, title="Sell Label", text="Sell", location=location.abovebar, style=shape.labeldown, size=size.tiny, color=color.red, textcolor=color.white, transp=0)
plotshape(longCondition, title="Buy Label", text="Buy", location=location.belowbar, style=shape.labelup, size=size.tiny, color=color.green, textcolor=color.white, transp=0)
plotshape(Goldenshort, title="Golden Sell Label", text="Golden Crossover Short", location=location.abovebar, style=shape.labeldown, size=size.tiny, color=color.blue, textcolor=color.white, transp=0)
plotshape(GoldenLong, title="Golden Buy Label", text="Golden Crossover Long", location=location.belowbar, style=shape.labelup, size=size.tiny, color=color.yellow, textcolor=color.white, transp=0)
// Execute trade if condition is True
if (longCondition)
    stopLoss = low - atr * 2
    takeProfit = high + atr * 5
    strategy.entry("long", strategy.long, 1, when = rsi > 50)


if (shortCondition)
    stopLoss = high + atr * 2
    takeProfit = low - atr * 5
    strategy.entry("short", strategy.short, 1, when = rsi < 50)


// Plot ATR bands to chart
plot(atr+close)
plot(close-atr)

// Plot Moving Averages
plot(shortSMA, color = color.red)
plot(longSMA, color = color.yellow)
```

> Detail

https://www.fmz.com/strategy/433562

> Last Modified

2023-11-28 15:15:14
