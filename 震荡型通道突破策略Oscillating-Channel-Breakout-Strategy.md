
> Name

震荡型通道突破策略Oscillating-Channel-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/191b751aed041a868b2.png)
[trans]


## 概述

该策略是一种基于通道指标的突破交易策略。它利用通道上下轨的震荡特征,在价格突破通道上轨时做多,突破通道下轨时做空,属于趋势跟踪类型策略。

## 策略原理

该策略首先利用SMA计算通道的中轴线,以中轴线加一个参数值为上轨,减一个参数值为下轨,形成一个价格通道。然后判断价格是否突破上下轨,并结合交易量的激增作为开仓信号。当价格重新回落进入通道时,则作为平仓信号。

具体来说,策略的交易逻辑如下:

1. 计算通道中轴线:SMA(收盘价,N)

2. 通道上轨线:中轴线 + 参数值

3. 通道下轨线:中轴线 - 参数值 

4. 突破上轨线时,如果满足交易量大于前一周期2倍的条件,做多入场

5. 回落进入通道时,平多头仓位

6. 突破下轨线时,如果满足交易量大于前一周期2倍的条件,做空入场

7. 回落进入通道时,平空头仓位

## 优势分析

该策略具有以下几点优势:

1. 利用通道指标,可以有效跟踪价格趋势。

2. 结合交易量激增的条件,可以有效过滤假突破。

3. 回落进通道作为止损退出机制,可以限制单次交易的损失。

4. 震荡特性适合捕捉中短线趋势。

5. 实现逻辑简单,容易理解和实现。

## 风险分析

该策略也存在一些风险:

1. 当价格长期处于通道一侧时,会连续触发同向开仓,面临亏损风险。

2. 通道参数设置不当可能导致出现过多错误信号。

3. 交易量激增的判断标准不恰当也可能错过真正的突破信号。

4. 止损退出机制可能过于保守,错过较大的行情。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 优化通道参数,使其更加贴合不同市场的特点。

2. 优化或增加开仓条件,如考虑均线多空,或Kline形态等,避免假突破。 

3. 优化止损退出机制,适当放宽止损幅度,避免过早离场。

4. 增加仓位管理机制,根据市场情况调整仓位和资金利用率。

5. 结合更多指标判断大级别趋势方向,避免与大趋势做对。

## 总结

该策略整体来说是一个较为简单实用的趋势跟踪策略。它利用价格通道的震荡特性,可以有效捕捉中短线趋势。但也需要注意优化参数设置,并防范其中存在的风险,这样可以获得更好的策略效果。如果结合更多指标和技术手段进行优化,可以进一步增强策略的稳定性和获利能力。

||


## Overview

This is a breakout trading strategy based on channel indicators. It utilizes the oscillation characteristic of the channel bands to go long when price breaks out above the upper band and go short when breaking out below the lower band. It belongs to the trend following strategy category.

## Strategy Logic

The strategy first uses SMA to calculate the midline of the channel. The upper band is set as midline plus a parameter value, and the lower band is midline minus the parameter value, forming a price channel. It then judges if price breaks out of the upper or lower bands, combined with a surge in trading volume as the opening signal. When price falls back into the channel, it serves as the closing signal.

Specifically, the trading logic is as follows:

1. Calculate midline: SMA(close, N) 

2. Upper band: midline + parameter value

3. Lower band: midline - parameter value

4. When price breaks out above upper band, if trading volume is greater than 2x of previous period, go long.

5. When price falls back into channel, close long position.

6. When price breaks out below lower band, if trading volume is greater than 2x of previous period, go short. 

7. When price falls back into channel, close short position.

## Advantage Analysis 

The advantages of this strategy are:

1. Using channel indicator can effectively track price trends.

2. Combining with surge in trading volume filters false breakouts well. 

3. Falling back into channel serves as stop loss mechanism and limits loss per trade.

4. Oscillation characteristic fits capturing medium-term trends. 

5. Simple logic makes it easy to understand and implement.

## Risk Analysis

There are also some risks:

1. Consecutive same direction trades when price sticks on one side of channel for long, increasing loss risk.

2. Improper channel parameter setting may cause excessive false signals. 

3. Wrong criteria for trading volume surge may miss true breakout signals.

4. The stop loss mechanism may be too conservative, missing bigger moves.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize channel parameters to fit different market characteristics.

2. Enhance open position criteria, like considering MA crossover or candlestick patterns, to avoid false breakouts.

3. Optimize stop loss mechanism, allow wider stop loss range to avoid premature exit. 

4. Add position sizing rules to adjust position size and capital utilization based on market conditions.

5. Incorporate more indicators to determine overall trend direction, avoiding trading against major trend.

## Summary 

In summary, this is a simple and practical trend following strategy. By utilizing the channel oscillation, it can effectively capture medium-term trends. But parameter tuning is needed to fit different markets, and risks should be monitored. Further optimizations with more indicators and techniques can enhance its stability and profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|25|Period|
|v_input_2|25|Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-08 00:00:00
end: 2023-11-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Copyright, 2022, Cache_that_pass.  You are free to use this script however you see fit and reproduce it in any manner.

//@version=5

            //////  Name the strategy between the 2 quotation marks.  Consider setting commission type and value in strategy header to match exchanges rates. //////

strategy("Oscillating SSL Channel Strategy", "O-SSL Strat", overlay=true, pyramiding=1, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, initial_capital = 100, calc_on_order_fills=true)



            //////  Inputs and calculations used by script  //////

period = input(title='Period', defval=25)
len = input(title='Period', defval=25)
smaHigh = ta.sma(high, len)
smaLow = ta.sma(low, len)
Hlv = int(na)
Hlv := close > smaHigh ? 1 : close < smaLow ? -1 : Hlv[1]
sslDown = Hlv < 0 ? smaHigh : smaLow
sslUp = Hlv < 0 ? smaLow : smaHigh

            //////  Show me the money  //////

plot(sslDown, linewidth=2, color=color.new(color.red, 0))
plot(sslUp, linewidth=2, color=color.new(color.lime, 0))


            //////  Trade execution logic  //////  
            
//pseudo-code//
        //Go long when high (or maybe close) breaks above the sslUp and volume is 2x or > Volume[1] and sslUp > sslDown
        //Close the above longs when sslUp crosses under sslDown (or set takeprofit and stop loss exits)
        //
        //Go short when low is lower than the sslUp and volume is 2x or > Volume[1] and sslDown > sslUp
        //Close shorts when sslDown crosses under sslUp

longCondition1 = (sslUp > sslDown)
longCondition2 = ta.crossover(high, sslUp)
//longCondition3 = (volume >= (volume[1]*1.89))
longCondition = ((longCondition1) and (longCondition2))// and (longCondition3))

longExit = ta.crossunder(sslUp, sslDown)

            //////  Bring It  //////
if (longCondition)
    strategy.entry("Bring It", strategy.long)

            //////  Sling It  //////
if (longExit)
    strategy.close("Bring It", comment="Sling It")


shortCondition1 = (sslDown) > (sslUp)
shortCondition2 = ta.crossunder(low, sslUp)
//shortCondition3 = (volume >= (volume[1]*1.89))
shortCondition = ((shortCondition1) and (shortCondition2))// and (shortCondition3))

shortExit = ta.crossunder(sslDown, sslUp)

            //////  Bring It  //////
if (shortCondition)
    strategy.entry("Bring It", strategy.long)

            //////  Sling It  //////
if (shortExit)
    strategy.close("Bring It", comment="Sling It")

            //////  Sling It  //////
if (shortCondition)
    strategy.entry("Sling It", strategy.short)

            //////  Bling It  //////
if (shortExit)
    strategy.close("Sling It", comment="Bring It")


```

> Detail

https://www.fmz.com/strategy/432214

> Last Modified

2023-11-15 16:01:09
