
> Name

基于RSI指标的股票交易双向金字塔策略RSI-Indicator-Based-Stock-Trading-Pyramiding-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1f5f52192fb57f347d8.png)
 [trans]
## 概述

本文主要介绍了一个基于相对强弱指标(RSI)设计的股票交易双向金字塔策略。该策略通过RSI指标判断股票超买超卖区域,配合金字塔加仓原理实现盈利。

## 策略原理

- 使用RSI指标判断股票是否进入超买超卖区域。RSI低于25时为超卖,高于80时为超买。
- 当RSI进入超卖区域时,开始做多入场。当RSI进入超买区域时,开始做空入场。
- 采用金字塔加仓方式,最多加仓7次。每次加仓后设置止盈止损点。

## 优势分析

- 使用RSI指标判断超买超卖面积,可以捕捉较大的价格反转机会。
- 金字塔加仓方式可以在行情正确时获取较优的收益率。
- 每次加仓后设置止盈止损,可以控制风险。

## 风险分析

- RSI指标判断超买超卖的效果不稳定,可能出现错误信号。
- 需要合理设置加仓次数,加仓过多风险会增加。  
- 停止损失点设置需要考虑波动率,不能设置过小。

## 优化方向  

- 可以考虑结合其他指标过滤RSI信号,提高判断超买超卖的准确率。例如KDJ、BOLL等指标的配合。
- 可以设置浮动止损来跟踪价格。根据波动率和风险控制要求动态调整。  
- 可以考虑根据市场状况(牛市、熊市等)使用自适应参数。

## 总结

本策略将RSI指标与金字塔加仓策略结合,在判断超买超卖的同时可以通过加仓获取更多收益。虽然RSI判断准确性有待提高,但通过合理的参数优化,结合其他指标可以形成效果稳定的交易策略。该策略具有一定的普适性,是一种相对简单直接的量化交易方法。

||

## Overview

This article mainly introduces a stock trading pyramiding strategy designed based on the Relative Strength Index (RSI) indicator. The strategy uses the RSI indicator to determine overbought and oversold areas of stocks and implements profit making through pyramiding principles.

## Strategy Principle  

- Use the RSI indicator to judge whether the stock has entered the overbought or oversold area. RSI below 25 is oversold, and above 80 is overbought.
- When the RSI enters the oversold area, start going long. When the RSI enters the overbought area, start going short.
- Adopt the pyramiding method, with up to 7 additional purchases. Set take profit and stop loss points after each additional purchase.

## Advantage Analysis

- Using the RSI indicator to determine the overbought and oversold areas can capture larger price reversal opportunities.
- The pyramiding method can obtain relatively better returns when the market moves correctly.  
- Setting take profit and stop loss after each additional purchase can control risks.

## Risk Analysis  

- The effect of RSI indicator to determine overbought and oversold areas is unstable, and wrong signals may occur.
- The number of additional purchases needs to be set reasonably, too many additional purchases will increase risks.
- The setting of stop loss points needs to consider volatility, cannot be set too small.  

## Optimization Directions

- Consider combining other indicators to filter RSI signals and improve the accuracy of determining overbought and oversold statuses. Such as KDJ, BOLL and other indicators.
- Can set floating stop loss to track price. Adjust dynamically according to volatility and risk control requirements.
- Consider using adaptive parameters based on market conditions (bull market, bear market, etc.).  

## Summary  

This strategy combines the RSI indicator with the pyramiding strategy. While judging the overbought and oversold statuses, it can obtain more returns through additional purchases. Although the accuracy of RSI judgment needs to be improved, through reasonable parameter optimization and combination with other indicators, it can form an effective trading strategy. This strategy has some universality and is a relatively simple and straightforward quantitative trading method.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|80|OverBought|
|v_input_2|25|OverSold|
|v_input_3|5|RSI Length|
|v_input_4|3|ProfitTarget_Percent|
|v_input_5|10|LossTarget_Percent|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-30 00:00:00
end: 2024-01-29 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © RafaelZioni

strategy(title='Simple RSI strategy', overlay=false)

SWperiod = 1
look = 0
OverBought = input(80, minval=50)
OverSold = input(25, maxval=50)

bandmx = hline(100)
bandmn = hline(0)

band1 = hline(OverBought)
band0 = hline(OverSold)
//band50 = hline(50, color=black, linewidth=1)
fill(band1, band0, color=color.purple, transp=98)


src = close
len = input(5, minval=1, title="RSI Length")
up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - 100 / (1 + up / down)

p = 100

//scale
hh = highest(high, p)
ll = lowest(low, p)
scale = hh - ll

//dynamic OHLC
dyno = (open - ll) / scale * 100
dynl = (low - ll) / scale * 100
dynh = (high - ll) / scale * 100
dync = (close - ll) / scale * 100

//candle color
color_1 = close > open ? 1 : 0

//drawcandle
hline(78.6)
hline(61.8)
hline(50)
hline(38.2)
hline(23.6)
plotcandle(dyno, dynh, dynl, dync, title="Candle", color=color_1 == 1 ? color.green : color.red)
plot(10, color=color.green)
plot(55, color=color.black)
plot(80, color=color.black)
plot(90, color=color.red)

long = rsi <= OverSold ? 5 : na

//Strategy
golong = rsi <= OverSold ? 5 : na

longsignal = golong  
//based on https://www.tradingview.com/script/7NNJ0sXB-Pyramiding-Entries-On-Early-Trends-by-Coinrule/
//set take profit

ProfitTarget_Percent = input(3)
Profit_Ticks = close * (ProfitTarget_Percent / 100) / syminfo.mintick

//set take profit

LossTarget_Percent = input(10)
Loss_Ticks = close * (LossTarget_Percent / 100) / syminfo.mintick


//Order Placing

strategy.entry("Entry 1", strategy.long, when=strategy.opentrades == 0 and longsignal)

strategy.entry("Entry 2", strategy.long, when=strategy.opentrades == 1 and longsignal)

strategy.entry("Entry 3", strategy.long, when=strategy.opentrades == 2 and longsignal)

strategy.entry("Entry 4", strategy.long, when=strategy.opentrades == 3 and longsignal)

strategy.entry("Entry 5", strategy.long, when=strategy.opentrades == 4 and longsignal)

strategy.entry("Entry 6", strategy.long, when=strategy.opentrades == 5 and longsignal)

strategy.entry("Entry 7", strategy.long, when=strategy.opentrades == 6 and longsignal)



if strategy.position_size > 0
    strategy.exit(id="Exit 1", from_entry="Entry 1", profit=Profit_Ticks, loss=Loss_Ticks)
    strategy.exit(id="Exit 2", from_entry="Entry 2", profit=Profit_Ticks, loss=Loss_Ticks)
    strategy.exit(id="Exit 3", from_entry="Entry 3", profit=Profit_Ticks, loss=Loss_Ticks)
    strategy.exit(id="Exit 4", from_entry="Entry 4", profit=Profit_Ticks, loss=Loss_Ticks)
    strategy.exit(id="Exit 5", from_entry="Entry 5", profit=Profit_Ticks, loss=Loss_Ticks)
    strategy.exit(id="Exit 6", from_entry="Entry 6", profit=Profit_Ticks, loss=Loss_Ticks)
    strategy.exit(id="Exit 7", from_entry="Entry 7", profit=Profit_Ticks, loss=Loss_Ticks)

```

> Detail

https://www.fmz.com/strategy/440430

> Last Modified

2024-01-30 15:26:49
