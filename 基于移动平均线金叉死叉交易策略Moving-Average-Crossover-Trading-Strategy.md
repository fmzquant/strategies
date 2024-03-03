
> Name

基于移动平均线金叉死叉交易策略Moving-Average-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13a34be24a7fb983fde.png)
 [trans]

## 概述

移动平均线金叉死叉交易策略通过计算快线EMA(fastLength)和慢线EMA(slowLength)的交叉来生成买入和卖出信号。当快线上穿慢线时,生成买入信号;当快线下穿慢线时,生成卖出信号。该策略简单实用,适用于中短线交易。

## 策略原理

该策略使用两个移动平均线,快线和慢线。快线参数EMAfastLength默认为9日线,慢线参数EMAslowLength默认为26日线。计算两个EMA线的交叉来判断市场买卖信号:

1. 当快线由下往上突破慢线时,产生买入信号enterLong()
2. 当快线由上往下跌破慢线时,产生卖出信号enterShort()

具体交易信号和策略规则如下:

1. 当快线上穿慢线时,做多入场;当快线下穿慢线时,平仓离场。
2. 做多的止盈是价格的Targetpercentage(默认0.15%),也就是涨幅达到15%时平仓离场。
3. 做多的止损是价格的StopLosspercentage(默认0.20%),跌幅达到20%时平仓止损。 
4. 做空同理。

所以该策略就是在两条移动平均线发生金叉和死叉时进行交易操作的策略。

## 优势分析

1. 策略简单易懂,容易理解。
2. 移动平均线的应用,过滤了一定的市场噪音,使交易信号更精确。
3. 交易规则清晰,有明确的止盈止损策略。
4. 测试参数可以灵活调整,适应不同的市场情况。

## 风险分析

1. 移动平均线本身有滞后性,可能会错过价格的短期变动,导致买点卖点不精确。
2. 不同周期的移动平均线参数,可能会产生假信号,带来亏损。
3. 仅仅依赖几个参数,该策略存在较高的超参数优化需求,需要找到最佳参数组合。
4. 在某些特定的大级别趋势中,该策略容易失败。

针对风险,可以优化的参数有移动平均线周期、交易品种、止盈止损比例等,需要大量测试来减少风险。

## 优化方向

该策略的移动平均线交叉思路简单实用,可以通过下列方式进行优化:

1. 更换移动平均线类型:除EMA外,还可以测试SMA、LWMA、HMA等线型。
2. 增加其他指标判断:结合RSI、MACD等指标发散开的时机交易。 
3. 自动优化参数:对EMA的两个周期参数进行自动优化搜索,寻找最佳参数组合。
4. 趋势过滤:根据大级别的趋势情况,选择性地进行交易。
5. 止盈止损策略优化:改进固定百分比的止盈止损方式,使其更具实战效果。

通过这些优化测试,可以大幅度提高策略的实战效果和稳定性。

## 总结

移动平均线交叉策略思路简单,实际应用需要不断优化。本策略给出了其交易信号生成逻辑和基本交易规则,在此基础上可以大力度优化,使之成为可实战的量化策略。移动平均线的应用也为我们提供了策略思路,我们可以在此基础上进行创新和改进。

||

## Overview

The moving average crossover trading strategy generates buy and sell signals by calculating the crossover of the fast EMA (fastLength) and slow EMA (slowLength) lines. When the fast line crosses above the slow line, a buy signal is generated. When the fast line crosses below the slow line, a sell signal is generated. This strategy is simple and practical, suitable for medium and short term trading.

## Strategy Principle 

The strategy uses two moving average lines, fast line and slow line. The fast line parameter EMAfastLength defaults to 9-day line, and the slow line parameter EMAslowLength defaults to 26-day line. Calculate the crossover of the two EMA lines to determine market buy and sell signals:

1. When the fast line breaks upward through the slow line, a buy signal enterLong() is generated.
2. When the fast line breaks downward through the slow line, a sell signal enterShort() is generated.

The specific trading signals and strategy rules are as follows:

1. When the fast line crosses above the slow line, go long; when the fast line crosses below the slow line, close position.
2. The take profit for long is Targetpercentage (default 0.15%) of the price, which is to close position when the profit reaches 15%.
3. The stop loss for long is StopLosspercentage (default 0.20%) of the price, which is to close position when the loss reaches 20%.
4. Short position works the same way.

So this strategy trades based on the golden cross and dead cross of the two moving average lines.

## Advantage Analysis

1. The strategy is simple and easy to understand. 
2. The application of moving average filters out some market noise and makes trading signals more precise.
3. Trading rules are clear with definite profit taking and stop loss.
4. Test parameters can be adjusted flexibly to adapt to different market conditions.

## Risk Analysis

1. Moving averages themselves have lagging, which may miss short-term price changes, leading to inaccurate buy and sell points.
2. Different cycle moving average parameters may generate false signals and bring losses.
3. Relying solely on a few parameters, this strategy has high hyperparameter optimization requirements to find the best parameter combination.
4. In some particular major trends, this strategy is prone to fail.

To address the risks, parameters that can be optimized include moving average cycle, trading variety, profit taking and stop loss ratio, etc. Extensive testing is required to reduce risks.

## Optimization Directions

The moving average crossover idea of this strategy is simple and practical. It can be optimized in the following ways:

1. Change moving average type: In addition to EMA, also test SMA, LWMA, HMA and other types. 
2. Add other indicators: Combine with RSI, MACD and other indicators.
3. Parameter optimization: Auto optimize the two cycle parameters of EMA to find the best parameter combination.
4. Trend filtering: Trade selectively based on major trend situations.
5. Profit taking and stop loss optimization: Improve the fixed percentage profit taking and stop loss to make it more practical.

Through these optimization tests, the strategy's practical effect and stability can be greatly improved.

## Summary 

The moving average crossover strategy idea is simple, but practical application requires continuous optimization. This strategy gives the logic of generating trading signals and basic trading rules. On this basis, it can be greatly optimized to become a usable quantitative strategy. The application of moving average also provides us with ideas for strategies, based on which we can innovate and improve.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|EMAfastLength|
|v_input_2|26|EMAslowLength|
|v_input_3|0.15|Profit Target in percentage|
|v_input_4|0.2|Stop Loss in percentage|
|v_input_5|true|From Month|
|v_input_6|true|From Day|
|v_input_7|2018|From Year|
|v_input_8|true|To Month|
|v_input_9|true|To Day|
|v_input_10|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("EMA Cross by MarketAlpha", overlay=true)
EMAfastLength = input(defval = 9, minval = 2)
EMAslowLength = input(defval = 26, minval = 2)
Targetpercentage = input(defval = 0.15, title = "Profit Target in percentage", minval = 0.05)
StopLosspercentage = input(defval = 0.20, title = "Stop Loss in percentage", minval = 0.05)
profitpoints = close*Targetpercentage
stoplosspoints = close*StopLosspercentage
price = close

FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2018, title = "From Year", minval = 2000)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2017)

start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"

emafast = ema(price, EMAfastLength)
emaslow = sma(price, EMAslowLength)
plot(emafast,color=green)
plot(emaslow,color=red)

enterLong() => crossover(emafast, emaslow)
strategy.entry(id = "MarketAlpha Long", long = true, when = window() and enterLong())
strategy.exit("Exit Long", from_entry = "MarketAlpha Long", profit = profitpoints,loss = stoplosspoints)

enterShort() => crossunder(emafast, emaslow)
strategy.entry(id = "MarketAlpha Short", long = false, when = window() and enterShort())
strategy.exit("Exit Short", from_entry = "MarketAlpha Short", profit = profitpoints,loss = stoplosspoints)


```

> Detail

https://www.fmz.com/strategy/439844

> Last Modified

2024-01-24 11:48:29
