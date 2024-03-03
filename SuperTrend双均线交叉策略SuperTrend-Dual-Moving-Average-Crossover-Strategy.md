
> Name

SuperTrend双均线交叉策略SuperTrend-Dual-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略是基于SuperTrend指标的双均线交叉策略。SuperTrend指标由两条均线组成,其交叉作为买入和卖出信号。策略属于趋势跟踪类策略。

## 策略原理

1. 计算快线demaFast,公式为:2*ema5 - ema(ema5,5)

2. 计算慢线demaSlow,公式为:2*ema2 - ema(ema2,2)

3. 快线由5日EMA构成,响应价格变化更迅速;慢线由2日EMA构成,响应价格变化更缓慢。

4. 当快线从下方向上突破慢线时,产生买入信号;当快线从上方向下跌破慢线时,产生卖出信号。

5. 这样利用两条响应速度不同的均线的交叉来判断价格趋势的变化,属于典型的趋势跟踪策略。

6. 根据买入和卖出信号实际执行交易。

该策略核心思想简单清晰,通过调整均线参数可以适应不同周期的市场,是一种常见的趋势跟踪策略。

## 优势分析

1. 使用双均线交叉判断趋势方向变化,是一种简单实用的技术指标。

2. 快线和慢线参数可调,可以针对不同周期进行优化。

3. 策略信号明确,交易执行简单。

4. 回测功能完备,可以验证策略效果。

5. 可视化界面直观展示交叉情况。

6. 策略思路易于理解,适合新手学习。

## 风险分析

1. 双均线交叉可能出现滞后信号或假信号。可以适当调整参数或加入过滤条件来改善。

2. 无法有效处理盘整或震荡市场,容易止损。可以加入趋势判断机制进行优化。

3. 回测参数可优化空间有限,实盘效果待验证。

4. 需关注交易成本对盈利的影响。

## 优化方向

1. 测试不同均线长度的参数组合,寻找最佳匹配。

2. 增加其他指标进行信号过滤,如KDJ指标等。

3. 加入止损机制来控制单笔损失。

4. 增加仓位管理功能,不同市况采用不同的交易百分比。

5. 优化资金管理策略,设定盈亏比等风险指标。

6. 考虑加入机器学习等算法进行参数优化或信号判断。

## 总结

该SuperTrend双均线交叉策略是一个简单的趋势跟踪策略,通过参数调整适应不同周期,可实际操作性强。结合其他技术指标进行优化扩展以及风险控制,可以进一步增强策略稳定性。该策略易于上手学习,同时也有很大的拓展潜力,是一个非常实用的量化交易策略思路。

|| 

## Overview

This is a dual moving average crossover strategy based on the SuperTrend indicator. SuperTrend consists of two moving averages, their crossover acts as buy and sell signals. The strategy belongs to the trend following category.

## Strategy Logic 

1. Calculate the fast line demaFast, formula: 2*ema5 - ema(ema5,5)

2. Calculate the slow line demaSlow, formula: 2*ema2 - ema(ema2,2)  

3. The fast line consists of 5-day EMA, more responsive to price changes; the slow line consists of 2-day EMA, lagging in response.

4. When fast line crosses above slow line from below, generate buy signal; when crossing below from above, generate sell signal.

5. Using crossover of two lines with different response speeds to determine trend change is a typical trend following strategy.

6. Execute trades based on buy and sell signals.

The core logic is simple and clear. By adjusting the MA parameters it can adapt to different cycle markets, a common trend following strategy.

## Advantage Analysis

1. Using dual MA crossover to determine trend change is a simple and practical technique.

2. Fast and slow line parameters are adjustable for optimizing different periods.

3. Clear signals and simple execution.

4. Complete backtest functionality to verify strategy. 

5. Intuitive visual interface showing crossover.

6. Easy to understand logic, suitable for beginners.

## Risk Analysis

1. Dual MA crossover may have lagging signals or false signals. Can improve by adjusting parameters or adding filters.

2. Ineffective in range-bound or choppy markets, prone to stop loss. Can add trend mechanism.

3. Limited optimization space in backtest, real trading effect untested.

4. Need to watch transaction cost impact on profitability.

## Optimization Directions

1. Test different MA length combinations to find optimal match.

2. Add other indicators for signal filtering, e.g. KDJ.

3. Add stop loss mechanism to control single trade loss amount. 

4. Add position sizing to use different percentages for different market conditions.

5. Optimize money management, set risk metrics like profit ratio.

6. Consider machine learning algorithms for parameter optimization or signal forecasting.

## Summary
This SuperTrend dual MA strategy is a simple trend following system adaptable to different cycles. Combining with other technical indicators and risk control can further enhance stability. Easy to learn with great potential for expansions, it is a highly practical quant trading strategy.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

strategy(title = "SuperTrend", shorttitle = "BTC")
ema5=ta.ema(close, 5)
ema2=ta.ema(close, 2)
 
demaFast =  request.security(syminfo.tickerid, "30", 2 * ema5 - ta.ema(ema5, 5)  )

plotchar((2 * ema5 - ta.ema(ema5, 5)), "d", "", location = location.top)
plotchar(demaFast, "fast", "", location = location.top)

demaSlow  = request.security(syminfo.tickerid,"30", 2 * ema2 - ta.ema(ema2, 2)  )
plotchar(demaSlow, "slow", "", location = location.top)

buy = ta.crossover(demaSlow, demaFast)
sell = ta.crossunder(demaSlow, demaFast)
strategy.entry("BUY", strategy.long, 1, when = buy)
strategy.entry("SELL", strategy.short, 1, when = sell )
```

> Detail

https://www.fmz.com/strategy/427306

> Last Modified

2023-09-19 21:38:06
