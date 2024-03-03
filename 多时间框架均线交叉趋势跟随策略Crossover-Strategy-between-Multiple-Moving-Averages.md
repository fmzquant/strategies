
> Name

多时间框架均线交叉趋势跟随策略Crossover-Strategy-between-Multiple-Moving-Averages

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/168629d3c50cb9f04de.png)
[trans]

## 概述

本策略通过计算多种不同时间周期的移动平均线,实现多时间框架的趋势判断。当价格突破不同周期的移动平均线时,进行相应的做多做空操作。同时,结合止损和止盈方式,实现风险和收益的平衡。

## 策略原理

本策略主要基于以下几个要点:

1. 计算21日线、50日线、100日线和200日线四种不同时间周期的简单移动平均线。

2. 当价格上穿其中任意一条平均线时,做多;当价格下穿其中任意一条平均线时,做空。

3. 进入做多局面后,止损点设置为前一根K线的最低价附近;进入做空局面后,止损点设置为前一根K线的最高价附近。

4. 做多止盈点设置为最低价之下的一定范围;做空止盈点设置为最高价之上的一定范围。

5. 当价格触碰止损点或止盈点时,平仓离场。

通过这种多时间框架判断的方式,可以提高交易信号的可靠性,在趋势较为明确时进行追踪。同时,止损和止盈设置可以控制风险,在亏损扩大或获利达到一定水平后退出市场。

## 优势分析

本策略主要具有以下几点优势:

1. 多时间框架判断,提高信号可靠性。不同周期均线的交叉组合,可以过滤掉部分假信号,选择趋势较为明确的时机进行交易。

2. 动态止损止盈方式便于风险控制。结合K线数据计算止损止盈位,可以根据市场实际波动幅度设定合理的区间,有效控制单笔亏损的最大值。

3. 代码结构清晰简单。基于Pine编辑器的策略语法,代码结构清楚易读,便于参数调整和优化。

4. 易于实盘应用。移动平均线交叉是一种较为经典的交易策略思路,参数调整后易于实盘应用,效果较为稳定。

## 风险分析

本策略也存在一定的风险,主要体现在以下几个方面:

1. 趋势判断失误风险。移动平均线作为趋势判断指标,也会出现错乱和滞后的情况,导致交易信号可能会偏差。

2. 大幅震荡市场的亏损风险。当市场出现大幅跳空或巨量反转时,止损点可能会被轻易触发,带来较大的亏损。

3. 参数设置不当可能扩大亏损。如果止损点设置过宽或者止盈点设置过紧,同样会扩大单笔亏损的大小。

4. 长期持有风险。本策略侧重趋势跟踪,但没有考量长期收益回撤比问题,长期全仓持有可能会消耗大量资金。

5. 平台差异带来实盘风险。在全功能的交易平台中可能会因为交易成本、滑点等问题影响收益率。

对策:

1. 结合其他指标验证信号。例如KDJ、MACD等指标的辅助判断。 

2. 根据市场情况调整止损幅度。充足的空间可以防止止损被轻易触发。

3. 优化参数,评估长期收益回撤。通过反复测试获得最佳参数组合。

4. 在模拟交易中充分检验策略,并补充手工止损方式。

## 优化方向  

本策略还有进一步优化的空间,主要方向如下:

1. 增加定量入场和出场条件。例如可以设置价格创新高和创新低的筛选,确保选择趋势明确的时机交易。

2. 结合资金管理和仓位控制方式。根据账户和市场情况动态调整每次交易的头寸比例。 

3. 增加趋势指标的判断逻辑。结合PRZ、ATR、DMI等指标设定趋势交易的选择与过滤规则。

4. 设置长短交替的出场机制。获利后设置价格回撤幅度的移动止损,实现获利保护。

5. 构建符合智能选股标准的标的池。评定各种指标得分进行股池的构建与调整。

6. 增加机器学习的风控手段。使用LSTM、RNN等深度学习模型辅助判断,减少人工误操作风险。

## 总结

本策略通过简单移动平均线的多时间框架交叉进行趋势判断,易操作性较强。同时带有动态止损和止盈设定,可以有效控制风险。但也存在一定的信号误判风险和震荡行情下的资金损耗问题。通过进一步优化参数以及增加辅助技术指标、风控手段等,可以获得更加出色和稳定的交易表现。

||

## Overview

This strategy calculates moving average lines of multiple timeframes to determine the trend across different periods. It goes long when the price crosses over the moving averages and goes short when the price crosses below the moving averages. Additionally, stop loss and take profit are incorporated to balance risks and returns.  

## Principles

The strategy is based on the following key points:

1. Calculate 21-day, 50-day, 100-day and 200-day simple moving averages.  

2. Go long when the price crosses over any of the moving averages, and go short when it crosses below.

3. Set the stop loss near the lowest price of the previous bar after opening long positions, and near the highest price after opening short positions.  

4. Set take profit targets below the lowest price for longs and above the highest price for shorts within certain ranges.

5. Close positions when the price hits the stop loss or take profit levels.

Judging trends across multiple timeframes can improve the reliability of trading signals and allow us to follow the trends when they are relatively clear. The stop loss and take profit mechanics control risks by exiting positions when losses expand or profits reach certain levels.  

## Advantages

The main advantages of this strategy are:

1. Improved signal reliability with multiple timeframe analysis. Different moving average crossovers help filter out some false signals and allow us to trade at clearer trend moments.  

2. Dynamic stops facilitate risk control. Calculating stops based on price action provides reasonable ranges to limit max loss on a per trade basis.

3. Simple and clear code structure. The Pine syntax offers readable structures to easily adjust parameters and optimize.  

4. Easy practical application. Moving average crossovers are a classic strategy idea that can be easily implemented in live trading with proper parameter tuning.

## Risks

There are also some risks to consider:

1. Inaccurate trend judgement. Moving averages can produce mixed signals and lag, leading to improper trade signals.  

2. Loss exposure in volatile markets. Stop losses may get triggered easily in huge price gaps or reversals, incurring large losses.

3. Improper parameter setting enlarges losses. Overly wide stops or tight take profits can increase the max loss per trade.  

4. Long holding risks. This trend following strategy does not consider long-term profitability and can consume significant capital over time. 

5. Real trading differences. Trading costs, slippage etc. can affect returns when applied in actual trading platforms.

Solutions:

1. Add signal confirmation with other indicators like KDJ, MACD etc.  

2. Adjust stop width based on market conditions to avoid premature trigger.

3. Optimize parameters and evaluate long-term returns and drawdowns. Obtain best parameter combinations through rigorous backtesting.  

4. Thoroughly test strategies in paper trading and add manual stops.

## Enhancement Opportunities 

There is room for further improvements:

1. Add quantitative entry and exit rules. For example, check for new highs and lows to ensure trading at clearer trends.

2. Incorporate position sizing and risk management. Dynamically size positions based on account size and market conditions.   

3. Enhance trend validation. Use indicators like PRZ, ATR, DMI etc. to filter and select appropriate trends. 

4. Alternate long and short holding periods. Set trailing stops on profits to lock in gains.
 
5. Construct stock pool using factor investing models. Score and filter stocks on various factors.

6. Add machine learning for risk control. Use LSTM, RNN etc. to assist in judgement and prevent human errors.

## Conclusion

This simple moving average crossover strategy offers easy implementation for trend following. The dynamic stops help control risks. But some signal inaccuracies and whipsaw risks exist. Further optimizations on parameters and additional techniques can lead to more robust performance.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-04 00:00:00
end: 2024-02-03 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("DolarBasar by AlperDursun", shorttitle="DOLARBASAR", overlay=true)

// Input for Moving Averages
ma21 = ta.sma(close, 21)
ma50 = ta.sma(close, 50)
ma100 = ta.sma(close, 100)
ma200 = ta.sma(close, 200)

// Calculate the lowest point of the previous candle for stop loss
lowestLow = ta.lowest(low, 2)

// Calculate the highest point of the previous candle for stop loss
highestHigh = ta.highest(high, 2)

// Calculate take profit levels
takeProfitLong = lowestLow - 3 * (lowestLow - highestHigh)
takeProfitShort = highestHigh + 3 * (lowestLow - highestHigh)

// Entry Conditions
longCondition = ta.crossover(close, ma21) or ta.crossover(close, ma50) or ta.crossover(close, ma100) or ta.crossover(close, ma200)
shortCondition = ta.crossunder(close, ma21) or ta.crossunder(close, ma50) or ta.crossunder(close, ma100) or ta.crossunder(close, ma200)

// Stop Loss Levels
stopLossLong = lowestLow * 0.995
stopLossShort = highestHigh * 1.005

// Exit Conditions
longExitCondition = low < stopLossLong or high > takeProfitLong
shortExitCondition = high > stopLossShort or low < takeProfitShort

if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

if (longExitCondition)
    strategy.exit("Long Exit", from_entry="Long", stop=stopLossLong, limit=takeProfitLong)

if (shortExitCondition)
    strategy.exit("Short Exit", from_entry="Short", stop=stopLossShort, limit=takeProfitShort)

```

> Detail

https://www.fmz.com/strategy/441008

> Last Modified

2024-02-04 17:21:25
