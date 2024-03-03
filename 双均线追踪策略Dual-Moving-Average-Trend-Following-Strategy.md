
> Name

双均线追踪策略Dual-Moving-Average-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

双均线追踪策略是一个利用双均线判断价格趋势的追踪策略。该策略使用两个不同周期的均线判断趋势方向,并发出做多做空信号。当短周期和长周期均线同方向时,表示趋势确认,可以选择入场。

## 原理

该策略使用两个均线判断价格趋势。具体原理如下:

1. 计算短周期p1和长周期p2的中线mid和mid_2。

2. 判断价格是否高于或低于中线,得到上涨和下跌的 bool 值。

3. 通过SMA平滑上涨和下跌的 bool 值,判断出短期p1和长期p2周期的趋势方向trend和trend_2。

4. 当trend和trend_2同向时,发出做多或做空信号。

5. 填充不同颜色柱状图表示趋势方向。

6. 入场时机为短周期和长周期趋势方向一致时。

以上构成了双均线追踪策略的核心逻辑。通过双均线判断,可以有效过滤掉部分假突破。当短周期和长周期趋势方向一致时,表示价格趋势非常明确,这时入场交易风险较小。

## 优势分析

双均线追踪策略的主要优势有:

1. 使用双均线判断,可以过滤假突破,使入场时机更加可靠。

2. 采用不同周期均线,可以实现多时间框架的趋势判断,使交易信号更加准确。

3. 结合短周期和长周期均线,可以把握大趋势的同时,捕捉部分短线回调机会。

4. 策略逻辑简单清晰,容易理解和实现,适合不同水平的交易者使用。

5. 可自定义均线周期,可以根据市场调整参数,适应不同品种和行情类型。

6. 采用柱状图可视化显示趋势方向,形成更直观的交易提示。

## 风险分析

双均线追踪策略也存在一些风险需要注意:

1. 在均线周期设置不当时,可能出现多次调整仓位,增加交易频率和滑点成本。可以适当调整周期参数,或增加开仓筛选条件。

2. 当市场处于震荡期,均线产生交叉时,会出现错误信号。可通过 andere 指标进行过滤,或增加仓位管理规则。

3. 突破短线回调可能被错过。可以适当缩短均线周期,或采用其他策略捕捉短线机会。

4. 大趋势突转时,止损设置不当可能带来较大亏损。应适时调整止损位置,确保止损点之下确有支撑。

5. 策略并没有考虑基本面因素,仅从技术上判断趋势。用户需要结合自己的研判使用该策略。

## 优化方向 

该策略可以从以下几个方面进行优化:

1. 增加其他指标过滤,例如成交量,动量指标等,避免在震荡期无效交易。

2. 采用自适应均线周期,根据市场变化自动调整参数,而非静态周期。

3. 增加仓位管理模块,通过趋势强度等规则指导具体加仓幅度。

4. 增加止损模块, trailing stop 或时间止损,控制单笔损失。

5.考虑结合机器学习等技术,通过训练判断趋势准确率,动态调整出入场逻辑。

6. 考虑加入基本面因素,例如财报公告、重要事件等,避免与大级别局势背离。

## 总结

综上所述,双均线追踪策略是一个简单实用的趋势判断策略。它同时结合短期和长期两种时间维度来识别趋势,入场时机判断非常可靠,适合大部分追踪趋势交易的交易者。当然,该策略也存在一些风险需要注意,用户可以从参数优化、风险控制等方面进行改进,使策略更适应实际情况。总体来说,双均线策略是一个非常经典和实用的趋势交易策略。

||


## Overview

The Dual Moving Average Trend Following strategy is a trend following strategy that uses two moving averages to determine the price trend. It generates long and short signals when the short and long period moving averages align in the same direction. Entering when the short and long term trends agree provides increased confidence.

## Principle 

The strategy uses two moving averages to determine the trend direction. The logic is as follows:

1. Calculate the midline for short period p1 and long period p2. 

2. Determine if the price is above or below the midlines, generating up and down bool values.

3. Use SMA to smooth the up and down values, determining the trend direction trend and trend_2.

4. When trend and trend_2 agree, generate long or short signals.

5. Color-filled bars visually indicate the trend.

6. Enter trades when short and long term trends agree.

The dual moving average comparison creates the core logic. Trading with trend agreement on two timeframes reduces false breakouts. Agreeing trends indicate a high conviction move, lowering risk on entries.

## Advantages

The main advantages of this strategy are:

1. Dual moving average reduces false breakouts and provides reliable entry signals.

2. Using two timeframes provides better accuracy in trend determination. 

3. Captures longer trends while taking advantage of short-term pullbacks.

4. Simple and easy to understand logic suitable for all traders. 

5. Customizable moving average periods allows optimization for any market.

6. Visual bar coloring provides intuitive trend direction.

## Risks

Some risks to consider:

1. Incorrect period settings may cause excessive position changes increasing costs. Optimize parameters or add filters.

2. Whipsaws occur when markets oscillate across moving averages. Add filters or position sizing rules.

3. Short pullbacks can be missed. Consider shorter periods or additional strategies.

4. Incorrect stop loss placement can lead to large losses when trends suddenly reverse. Actively manage stops.

5. No fundamental analysis is considered. Use discretion when applying signals.

## Enhancements

Some ways to improve the strategy:

1. Add additional filters like volume or momentum to avoid whipsaws.

2. Employ adaptive periods that adjust based on market conditions.

3. Add position sizing rules based on trend strength for guidance. 

4. Implement stop loss modules like trailing stops or time exits to limit losses.

5. Consider machine learning to score trend accuracy and improve entry/exit logic.

6. Incorporate fundamental factors like earnings, events to avoid trading against larger trends.

## Conclusion

In summary, the Dual Moving Average Trend Following strategy provides a simple and practical approach to trend identification. By combining short and long-term perspectives, it generates high-confidence entry signals suitable for most trend traders. Risks exist and can be mitigated through optimization, risk management and discretion. Overall, the dual moving average strategy remains a robust, classic trend following approach.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|p1|
|v_input_2|21|p2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-01 00:00:00
end: 2023-10-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// My Tradingview Scripts : https://bit.ly/2HKtr7k 
strategy("UniDir Strategy", overlay=true, initial_capital=50000, default_qty_value=50000, default_qty_type=strategy.cash, slippage=3, commission_type=strategy.commission.percent, commission_value=0.075, pyramiding=0)

p1=input(14)
p2=input(21)


Price = close
mid = (highest(high, p1)+lowest(low, p1)) / 2
mid_2 = (highest(high, p2)+lowest(low, p2)) / 2

//Trend
up = Price > mid ? 1 : 0
up_2 = Price > mid_2 ? 1 : 0
down = Price < mid ? 1 : 0
down_2 = Price < mid_2 ? 1 : 0
trend = sma(up, 2) == 1 ? 1 : sma(down, 2) == 1 ? -1 : nz(trend[1])
trend_2 = sma(up_2, 2) == 1 ? 1 : sma(down_2, 2) == 1 ? -1 : nz(trend_2[1])

dir1=trend==1 ? lime : red
dir2=trend_2==1 ? lime : red
dir_all=trend==1 and trend_2==1 ? lime : red

top_p=plot(1)
hi_p=plot(0.4)
mid_p=plot(0.2)
lo_p=plot(0)

fill(hi_p,mid_p,color=dir1,transp=80)
fill(lo_p,mid_p,color=dir2,transp=80)
fill(top_p,hi_p,color=dir_all,transp=0)

// Entry
long_cond = trend==1 and trend_2==1
short_cond = trend==-1 and trend_2==-1

if long_cond
    strategy.entry("Long",strategy.long)
if short_cond
    strategy.entry("Short",strategy.short)
```

> Detail

https://www.fmz.com/strategy/428700

> Last Modified

2023-10-08 14:25:40
