
> Name

基于MBO指标的趋势跟随策略Trend-Following-Strategy-Based-on-MBO-Indicator

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略基于MBO指标实现了一个简单的趋势跟随交易系统。MBO指标类似于MACD指标,是将快速移动平均线和慢速移动平均线的差值作为交易信号。当快速移动平均线上穿慢速移动平均线时做多,下穿时做空。该策略通过跟随MBO指标的趋势来进行交易。

## 策略原理

该策略主要是基于MBO指标的构造来产生交易信号的。MBO指标是由Bryan Strain和Mark Whitley开发的,指标计算方法是:

MBO = 25日简单移动平均线 - 200日简单移动平均线 

然后对MBO指数加速线进行平滑,计算出MBO的18日简单移动平均线SMAMBO。 

当MBO上穿SMAMBO时,做多;当MBO下穿SMAMBO时,做空。

从代码逻辑上看,主要步骤是:

1. 计算25日和200日简单移动平均线,赋值给xFastAvg和xSlowAvg

2. 计算MBO的值:MFBO = xFastAvg - xSlowAvg

3. 计算MBO的18日简单移动平均线SMAMBO

4. 比较MBO和SMAMBO,产生交易信号pos

    如果MBO > SMAMBO, pos = 1,做多

    如果MBO < SMAMBO, pos = -1,做空

5. 根据pos的值判断入场和出场

该策略通过跟随MBO指标表现出的趋势走势来进行交易,属于典型的趋势跟随策略。

## 优势分析

该策略具有以下优势:

1. 通过跟随中长线趋势,能够减少交易频率,避免无谓的止损。

2. MBO指标参数可调,可以通过调整参数来适应不同的市场环境。

3. 策略逻辑简单清晰,容易理解实现,适合初学者学习。

4. 可视化指标清楚显示趋势的变化,支持策略的决策。

5. 可扩展性强,可在该策略基础上进行优化,加入止损机制等。

## 风险分析

该策略也存在一些风险:

1. 跟随趋势交易容易垂直上涨下跌,可能会带来较大亏损。

2. 在趋势反转时无法及时止损退出,可能扩大损失。

3. 参数设置不当可能导致交易频率过高或信号不准确。

4. 容易产生假突破信号,需要加入过滤机制。 

5. 该策略本身没有设置止损点,存在无限亏损的风险。

对应解决方法:

1. 合理设置移动平均线参数,不能太敏感。

2. 加入趋势反转的判断指标,发现反转时及时止损。 

3. 优化参数设置,调整至产生准确信号。

4. 加入过滤机制,避免假突破。

5. 设置止损点,控制单笔亏损。

## 优化方向 

该策略可以从以下方面进行优化:

1. 加入趋势反转信号指标,在趋势反转时及时止损。

2. 优化移动平均线参数设置,平衡交易频率和信号质量。

3. 加入ATR止损,设置合理的止损点,控制单笔亏损。

4. 结合其他指标过滤假突破信号。

5. 加入仓位管理,根据趋势强弱调整仓位。

6. 可以考虑在突破前形成三推结构后才入场。

7. 建立参数优化机制,根据不同市场调整参数。

## 总结

该策略通过简单的MBO指标捕捉趋势,进行趋势跟随交易。优点是简单实用,可视化指标清晰,适合初学者学习。但也存在只追涨杀跌、无法止损的风险。我们可以通过加入反转信号、优化参数设置、止损机制等来优化策略,使之成为一个稳定可靠的趋势跟随策略。总体来说,该策略作为入门趋势跟随策略非常不错,通过优化可以成为日常交易的有力工具。

||

## Overview

This strategy implements a simple trend following trading system based on the MBO indicator. The MBO indicator is similar to the MACD indicator, using the difference between fast and slow moving averages as trading signals. It goes long when the fast moving average crosses above the slow one, and goes short when the fast crosses below the slow one. The strategy follows the trend of the MBO indicator to trade.

## Strategy Logic

The strategy generates trading signals primarily based on the MBO indicator. The MBO indicator was developed by Bryan Strain and Mark Whitley. The indicator is calculated as:

MBO = 25-day Simple Moving Average - 200-day Simple Moving Average

The MBO line is then smoothed by calculating the 18-day Simple Moving Average of MBO, called SMAMBO.

When MBO crosses above SMAMBO, go long. When MBO crosses below SMAMBO, go short.

The key steps in the strategy logic are:

1. Calculate the 25-day and 200-day SMA, assigned to xFastAvg and xSlowAvg. 

2. Calculate the MBO value: MBO = xFastAvg - xSlowAvg

3. Calculate the 18-day SMA of MBO, called SMAMBO.

4. Compare MBO and SMAMBO to generate trading signals pos:

    If MBO > SMAMBO, pos = 1, go long
    
    If MBO < SMAMBO, pos = -1, go short

5. Enter and exit trades based on the value of pos.

The strategy follows the trend exhibited by the MBO indicator. It is a typical trend following strategy.

## Advantage Analysis 

The advantages of this strategy include:

1. Lower trading frequency and avoid unnecessary stops by following medium/long term trends.

2. Flexible MBO parameters adaptable to different market conditions. 

3. Simple and clear logic, easy to understand and implement, good for beginners.

4. Visual indicator clearly shows trend changes to support decisions. 

5. High extensibility to optimize with stops, etc.

## Risk Analysis

The risks of the strategy:

1. Trend following tends to vertical rallies/selloffs that can produce large losses.

2. Fails to exit in a timely manner when trend reverses, potentially increasing losses.

3. Inappropriate parameters may cause too frequent trading or inaccurate signals. 

4. Susceptible to false breakout signals, needs filter mechanisms.

5. No stop loss mechanism results in unlimited loss potential.

Solutions:

1. Use reasonable SMA parameters, not too sensitive.

2. Add trend reversal indicator, exit quickly after reversal signaled.

3. Optimize parameters for accurate signals.  

4. Add filters to avoid false breakouts.

5. Implement stop loss to control loss per trade.

## Optimization Directions

The strategy can be improved in the following ways:

1. Add trend reversal indicator, implement timely stop loss after reversal.

2. Optimize SMA parameters to balance trade frequency and signal quality.

3. Add ATR stop loss to set reasonable stop levels to control loss.

4. Incorporate other indicators to filter false breakouts. 

5. Implement position sizing based on trend strength.

6. Consider requiring triple confirmation before entry.

7. Build parameter optimization mechanism to adjust to different markets.

## Summary

The strategy captures trends using a simple MBO indicator for trend following trading. The advantages are being simple, intuitive visuals, and beginner friendly. But risks like chasing rallies and inability to stop loss exist. We can optimize it by adding reversal signals, optimizing parameters, implementing stops etc, to build a robust trend following system. Overall it is a great introductory trend following strategy, and can become a practical daily trading tool after optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|25|Fastavg|
|v_input_2|200|Slowavg|
|v_input_3|18|Length|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-08 00:00:00
end: 2023-10-08 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 16/08/2018
// MBO indicator is the third component of TFS trading system. This indicator
// was developed by Bryan Strain and Mark Whitley.
// The idea of MBO is similar to moving average convergence/divergence (MACD)
// indicator. It is calculated by subtracting the 200-day moving average from
// the 25-day moving average.
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="TFS: MBO Backtest", shorttitle="TFS: MBO indicator")
Fastavg = input(25, minval=1)
Slowavg = input(200, minval=1)
Length = input(18, minval=1)
reverse = input(false, title="Trade reverse")
hline(0, color=blue, linestyle=line)
xFastAvg = sma(close, Fastavg)
xSlowAvg = sma(close, Slowavg)        
nMBO = xFastAvg - xSlowAvg
xSMAMBO = sma(nMBO, Length)
pos = iff(nMBO > xSMAMBO, 1,
       iff(nMBO < xSMAMBO, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(nMBO, color=red, style = histogram, title="TFS: MBO indicator")
plot(xSMAMBO, color=blue, title="SMA")
```

> Detail

https://www.fmz.com/strategy/428793

> Last Modified

2023-10-09 15:22:04
