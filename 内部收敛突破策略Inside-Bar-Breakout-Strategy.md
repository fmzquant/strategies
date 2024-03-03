
> Name

内部收敛突破策略Inside-Bar-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d104d62a3777157ba5.png)
[trans]
## 概述

内部收敛突破策略是一种基于K线形态的趋势跟踪策略。该策略利用内部收敛和外部扩张的K线形式来判断趋势,并在突破点进行长空开仓。

## 策略原理

该策略主要判断以下两种K线形态:

1. 内部收敛K线:当日K线的最高价低于昨日最高价,最低价高于昨日最低价,表明范围在收敛。

2. 外部扩张K线:当日K线的最高价高于昨日最高价,最低价低于昨日最低价,表明范围在扩大。

当判断到上述两种形态时,视为策略的入场信号。在入场K线的次日,如果开盘价高于上一日最高价,则做多;如果开盘价低点上一日最低价,则做空。

做多做空后,会设置止盈止损点。具体的止盈止损算法是:

止盈点=(当前close价格 × 目标止盈百分比)/最小变动价位 

止损点=(当前close价格 × 止损百分比)/最小变动价位

这样,我们就可以挂出止盈单和止损单,实现盈利后退出市场,避免超过可承受的损失。

## 优势分析

该策略具有以下优势:

1. 内部收敛外部扩张K线形态较为可靠,判断趋势方向的成功率较高。

2. 突破入场增加判断的确定性,避免了部分假突破。

3. 全自动化交易,不需要人工干预,降低了操作风险。

## 风险分析

该策略也存在一些风险:

1. K线形态判断不完全可靠,可能出现错误信号。

2. 突破入场容易被套,应适当调整止损点。

3.参数设置不当可能导致亏损加大,需要仔细测试优化参数。

## 优化方向

该策略还可以从以下方向进行优化:

1.加入更多过滤条件,避免错误信号。例如可以添加交易量过滤。

2. 优化止盈止损算法,实现动态止盈止损。

3. 添加自动止损防反功能。

4. 利用机器学习方法自动优化参数。

## 总结

内部收敛突破策略整体来说是一种较为可靠、容易实现的趋势策略。该策略充分利用了内部收敛外部扩张形态的判断优势,以及突破的确定性优势。同时,策略算法简单清晰,容易理解,适合量化入门选择。通过不断优化和调整,可以使该策略更加稳定和智能化,从而获得更好的交易效果。

||

## Overview

The inside bar breakout strategy is a trend following strategy based on candlestick patterns. It uses the inside bar and outside bar candlestick patterns to determine the trend direction and enters positions on breakouts.

## Strategy Logic 

The main logic behind this strategy is identifying two types of candlestick patterns:

1. Inside bar: When the high of current bar is lower than the previous high and the low is higher than the previous low, it indicates a price contraction. 

2. Outside bar: When the high of current bar is higher than the previous high and the low is lower than the previous low, it indicates a price expansion.

When either pattern is identified, it signals a potential entry. On the next bar after the signal bar, if open price breaks above previous high, go long. If open price breaks below previous low, go short.

After entry, take profit and stop loss orders will be placed. The specific algorithms are: 

Take Profit = (Current Close Price x Target Profit Percentage) / Minimum Price Tick
Stop Loss = (Current Close Price x Stop Loss Percentage) / Minimum Price Tick

By doing this, it can secure profits after hitting take profit level and limit losses below maximum tolerable amount when hitting stop loss.

## Advantage Analysis

The advantages of this strategy are:

1. Inside and outside bar patterns are quite reliable for determining trend direction. 

2. Breakout entry increases certainty and avoids some false breakouts. 

3. Fully automated without manual intervention. Reduces operational risks.

## Risk Analysis

Some risks also exist with this strategy:

1. Candlestick pattern identification not always accurate. Potential for wrong signals.

2. Breakout entry prone to getting trapped. Stop loss may need adjustment.  

3. Improper parameter settings can lead to amplified losses. Requires robust optimization.

## Improvement Areas

Some ways to improve the strategy include:

1. Adding filters to reduce false signals, e.g. volume filter.

2. Optimizing dynamic take profit and stop loss algorithms.  

3. Incorporating anti-reverse stop loss.

4. Utilizing machine learning to auto optimize parameters.

## Conclusion

The inside bar breakout strategy is an overall reliable and easy-to-implement trend following method. It takes advantage of the predictive power of inside bar and outside patterns combined with the higher certainty of breakout entries. With simple straightforward logic, it is beginner friendly in algorithmic trading. Further enhancements in optimization and automation will lead to more stable and intelligent trading results.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|target profit%|
|v_input_2|true|stop loss %|
|v_input_3|2021|yearfrom|
|v_input_4|2022|yearuntil|
|v_input_5|true|monthfrom|
|v_input_6|12|monthuntil|
|v_input_7|true|dayfrom|
|v_input_8|31|dayuntil|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-19 00:00:00
end: 2024-02-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("inside bar strategy  Wıth SL-TP ", overlay=true )



insides = high < high[1] and low > low[1]
outsides = high > high[1] and low < low[1]

candle_control=insides or outsides


target_profit_percent=input(3,"target profit%",step=0.1)
stop_loss_percent=input(1,"stop loss %",step=0.1)



yearfrom = input(2021)
yearuntil =input(2022)
monthfrom =input(1)
monthuntil =input(12)
dayfrom=input(1)
dayuntil=input(31)


long_cond=candle_control[1] and close>open and high>high[1]
short_cond=candle_control[1] and close<open and low<low[1]



if ( long_cond ) 
    strategy.entry("LONG", strategy.long, stop=close, oca_name="TREND",  comment="LONG")
    
else
    strategy.cancel(id="LONG")


if (  short_cond ) 

    strategy.entry("SHORT", strategy.short,stop=close, oca_name="TREND", comment="SHORT")
else
    strategy.cancel(id="SHORT")
    
    
    
    
profit_target=(close*(target_profit_percent/100))/syminfo.mintick
stop_target=(close*(stop_loss_percent/100))/syminfo.mintick


strategy.exit("LONG EXIT","LONG",profit=profit_target, loss=stop_target ) 
    
strategy.exit("LONG EXIT","SHORT",profit=profit_target, loss=stop_target ) 

```

> Detail

https://www.fmz.com/strategy/442825

> Last Modified

2024-02-26 12:16:52
