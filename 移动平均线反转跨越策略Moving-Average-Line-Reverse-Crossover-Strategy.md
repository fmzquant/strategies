
> Name

移动平均线反转跨越策略Moving-Average-Line-Reverse-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1604837903559d99bf0.png)
[trans]

## 概述

移动平均线反转跨越策略是一种技术分析策略。它利用移动平均线的方向和股价的关系来判断进入或退出仓位的时机。具体来说,是当股价从上方向下方跨越45天移动平均线时做空;当持有空仓8天后平仓;之后再次出现股价向下跨越45天移动平均线的信号时可以重新做空。

## 策略原理

该策略的核心逻辑是:

1. 计算45天简单移动平均线(SMA)
2. 当收盘价从上方向下方跨越45天移动平均线时,做空入场
3. 持有空仓8个交易日后平仓
4. 之后如果再次出现价格跨越信号,可以重新做空

具体来说:

1. 首先计算45天SMA
2. 如果不在持有空仓且出现价格下跌跨越SMA的信号(收盘价<SMA且前一日收盘价>前一日SMA),则做空入场
3. 如果已持有空仓8天,则平仓
4. 如果不在持有空仓且再次出现价格跨越SMA信号,且与上次平仓至少有8天的间隔,则可以重新做空

通过这样的逻辑,就可以在股价显著向下突破移动平均线时做空,并在一定时间后 cutoff loss。

## 优势分析

这种策略有以下几点优势:

1. 概念简单,容易理解和实现
2. 利用了移动平均线的信号,可判断股价趋势反转
3. 有清晰的入场规则、止损规则
4. 可以过滤掉部分假突破信号

相比其他策略,该策略易于理解,容易编程实现。同时,它利用了移动平均线这一大家熟知的技术指标来判断股价趋势。当价格突破移动平均线时,常常意味着短期趋势产生转折。因此可以捕捉到一些反转机会。

此外,策略中的入场规则和 8 天固定止损方法,也使得风险控制比较清晰。假突破的情况也在一定程度上得到过滤。总的来说,该策略简单实用,容易掌握。

## 风险分析

但是该策略也存在一些风险:  

1. 移动平均线本身滞后性较强,不能确保每次跨越都是精确的趋势反转点
2. 8天持仓时间比较短,可能无法持续捕捉大的行情
3. 对突破信号的判断没有更多确认,可能存在一定的假突破情况
4. 没有设置止盈点,无法锁定利润

具体来说,移动平均线本身滞后于价格变化,因此其发出信号的时间不一定精确。部分突破可能是临时性的,并不能真正把握住反转点。

此外,8天的持仓时间比较短。在大的股票行情中,这样的止损设置可能过于激进,无法持续捕捉较大的反转。也增加了反复进出市场的交易次数。

策略中对突破信号的判断仅仅依赖价格与移动平均线的关系。没有设置更多的确认指标或条件来过滤信号。这在一定程度上使得假突破的情况时有发生。

最后,没有设置止盈点来锁定利润。这样在亏损被止损切换之前,利润也有可能被削减。

## 优化方向  

根据上述风险分析,该策略可以从以下几个方向进行优化:

1. 设置更多的确认指标或条件来过滤假突破  

    例如可以配置MACD、KD等其他技术指标,在它们也出现一定信号时才认定趋势反转。或者配置交易量的突增作为辅助条件。

2. 配置自适应的持仓时间 

    例如当价格运行超过某一固定幅度后才止损。或者当其他指标(如MACD)发出信号时止损。

3. 设置滑点止盈

    即在价格运行一定比例后逐步移动止盈点,来锁定利润。

4. 优化移动平均线的天数参数

    尝试不同天数的参数并测试,寻找最优参数。也可以配置双移动平均线系统。

通过这些优化,可以在保持策略简单行之有效的基础上,提高信号质量,减少假突破概率;获取更充分的趋势利润;并有更强的风险控制能力。从而可能获得更好的策略表现。

## 总结  

移动平均线反转跨越策略是一个非常简单实用的短线交易策略。它利用移动平均线这一广为人知的技术指标,判断股价是否出现短期趋势反转的信号。具有容易理解、实现简单、风险可控等优点。同时也存在一些可优化的问题,例如假突破、持仓时间等。通过合理的技术指标或参数配置,可以在保持其简单有效特性的同时,进一步增强策略的表现与风险控制能力。

||

## Overview  

The moving average reverse crossover strategy is a technical analysis strategy. It utilizes the relationship between moving average lines and stock prices to determine when to enter or exit positions. Specifically, it goes short when the stock price crosses below the 45-day moving average line from top to bottom; closes the short position after holding it for 8 days; goes short again when the signal of the stock price crossing below the 45-day moving average reappears.

## Principles  

The core logic of this strategy is:

1. Calculate the 45-day simple moving average (SMA)  
2. When the closing price crosses below the 45-day moving average from top to bottom, go short
3. Close the position after holding the short position for 8 trading days
4. If the crossover signal appears again, go short again

Specifically:  

1. Calculate the 45-day SMA first  
2. If not already in a short position and the price drop crossover SMA signal appears (close < SMA and previous close > previous SMA), go short
3. If already held the short position for 8 days, close the position
4. If not in a short position and the price crossover SMA signal appears again, and there is at least 8 days apart from last closing, go short again

Through this logic, we can go short when the stock price breaks through the moving average line significantly downward, and cut loss after a period of time.

## Advantage Analysis   

This strategy has the following advantages:

1. The concept is simple and easy to understand and implement
2. Utilize the signals of moving averages to judge trend reversals  
3. Has clear entry rules and stop loss rules
4. Can filter out some false breakout signals

Compared with other strategies, this strategy is easy to understand and implement. At the same time, it utilizes the well-known technical indicator of moving average lines to determine price trends. When prices break through moving averages, it often means reversals in short-term trends. So some reversal opportunities can be captured.

In addition, the entry rules and fixed 8-day stop loss method in the strategy also make risk management clear. False breakouts are also filtered out to some extent. In general, this strategy is simple, practical and easy to master.

## Risk Analysis   

However, there are some risks to this strategy:

1. Moving averages themselves have high lagging properties and cannot ensure that each crossover is the exact trend reversal point
2. The 8-day holding period is relatively short and may not be able to continuously capture large moves
3. There is no more confirmation for breakout signals, and some false breakouts may exist  
4. No profit taking points are set to lock in profits  

Specifically, moving averages themselves lag prices, so their signals may not be timed precisely. Some breakouts may be temporary and fail to truly capture reversal points. 

In addition, the 8-day holding period is relatively short. In major stock trends, such stop loss settings may be too aggressive to continuously capture larger reversals. It also increases the frequency of getting in and out of the market.

The strategy relies solely on the relationship between prices and moving averages to determine crossover signals. No additional confirmation indicators or criteria are configured to filter out signals. This makes false breakouts occur from time to time to some extent.

Finally, no profit taking points are set to lock in profits. Thus, profits may also be reduced before losses are stopped out.

## Optimization Directions   

Based on the above risk analysis, the strategy can be optimized in the following directions:

1. Set up more confirmation indicators or conditions to filter out false breakouts

    For example, other technical indicators such as MACD and KD can be configured, and trend reversals can be identified only when they also show certain signals. Or increased trading volume can be configured as an auxiliary condition.

2. Configure adaptive holding period  

    For example, stop loss only after the price exceeds a certain fixed amplitude. Or stop loss when other indicators (such as MACD) give out signals.  

3. Set trailing stop profit 

    That is, gradually move the profit taking point after the price rises a certain percentage to lock in profits.

4. Optimize moving average parameters  

    Try different parameter days and test to find the optimal parameters. Dual moving average systems can also be configured.


Through these optimizations, while maintaining the simplicity and effectiveness of the strategy, the signal quality can be improved and the probability of false breakouts can be reduced; more sufficient trend profits can be obtained; and stronger risk control capabilities can be achieved. Thus, better strategy performance may be achieved.

## Conclusion  

The moving average reverse crossover strategy is a very simple and practical short-term trading strategy. It utilizes the well-known technical indicator of moving averages to determine whether stock prices show short-term trend reversal signals. It has the advantages of easy to understand, simple to implement, controllable risks and so on. There are also some optimizable issues such as false breakouts and holding periods. By reasonably configuring technical indicators or parameters, the simplicity and validity of the strategy can be maintained while further enhancing the performance and risk control capabilities.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-23 00:00:00
end: 2023-11-28 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Moving Average Reverse Crossover Strategy", overlay=true)

// Calculate the 45-day moving average
ma_length = 45
ma = ta.sma(close, ma_length)

// Track position entry and entry bar
var bool in_short_position = na
var int entry_bar = na
var int exit_bar = na

// Entry condition: Close price crosses below the 45-day moving average to enter the short position
if (not in_short_position and ta.crossunder(close, ma) and not na(ma[1]) and close < ma and close[1] > ma[1])
    in_short_position := true
    entry_bar := bar_index

// Exit condition: Close the short position after holding for 8 trading days
if (in_short_position and bar_index - entry_bar >= 8)
    in_short_position := false
    exit_bar := bar_index

// Re-entry condition: Wait for price to cross below the 45-day moving average again
if (not in_short_position and ta.crossunder(close, ma) and not na(ma[1]) and close < ma and close[1] < ma[1] and (na(exit_bar) or bar_index - exit_bar >= 8))
    in_short_position := true
    entry_bar := bar_index

// Execute short entry and exit
if (in_short_position)
    strategy.entry("Short", strategy.short)

if (not in_short_position)
    strategy.close("Short")
```

> Detail

https://www.fmz.com/strategy/433949

> Last Modified

2023-12-01 16:52:13
