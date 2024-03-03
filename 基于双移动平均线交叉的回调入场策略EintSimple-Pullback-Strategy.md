
> Name

基于双移动平均线交叉的回调入场策略EintSimple-Pullback-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b128f19f595c6ad061.png)
 [trans]

## 概述 Overview

EintSimple Pullback Strategy是一个基于双移动平均线交叉的回调入场策略。该策略首先使用长期和短期两个移动平均线,当短期移动平均线从下方突破长期移动平均线时生成买入信号。为了过滤假突破,该策略还要求收盘价高于长期移动平均线。

在入场后,如果价格重新跌破短期移动平均线,则btc体现退出信号。此外,该策略还设置了离场止损,如果从最高点回撤幅度达到设置的止损百分比,也会退出仓位。

## 策略原理 Strategy Logic

该策略主要基于双移动平均线的黄金交叉来判断入场时机。具体来说,需同时满足以下条件才会开仓做多:

1. 收盘价大于长期移动平均线ma1 
2. 收盘价低于短期移动平均线ma2
3. 目前没有持仓

满足上述条件后,该策略会全仓做多。

退出信号判断基于两个条件,一个是价格重新跌破短期移动平均线,另一个是从最高点回撤幅度达到设置的止损百分比。具体退出条件如下:

1. 收盘价大于短期移动平均线ma2
2. 从最高点回撤幅度达到设置的止损百分比

满足任一退出条件时,该策略会平掉全部多单。

## 优势分析 Advantages

1. 使用双移动平均线交叉并结合实体收盘价格判断,可以有效过滤假突破。

2. 采用回调入场,可以在股价形成短期拐点之后进入。

3. 有止损设定,可以限制最大回撤。

## 风险分析 Risks 

1. 双移动平均线交叉策略容易产生多次交易信号,可能追高杀跌。

2. 移动平均线参数设置不当可能导致曲线过于光滑或过于敏感。

3. 止损设置过于宽松会让亏损扩大。

## 优化方向 Optimization

1. 测试不同长度的长短期移动平均线参数组合,找到最优参数。

2. 比较测试使用收盘价和典型价格判断移动平均线交叉的效果。

3. 测试添加交易量或波动性指标等过滤器。

4. 对止损幅度进行回测优化,找到最佳设置。

## 总结 Conclusion

EintSimple Pullback Strategy是一个简单实用的双移动平均线回调策略。它有效利用了移动平均线的指示功能,同时结合实体收盘价格判断来过滤假信号。虽然该策略容易产生频繁交易和追高杀跌的问题,但是通过参数优化和添加过滤器可以进一步完善。总的来说,该策略是一个非常适合量化交易初学者实践和优化的策略。

|| 

# Moving Average Crossover EintSimple Pullback Strategy  

## Overview  

The EintSimple Pullback Strategy is a mean reversion strategy based on dual moving average crossover. It first uses a long-term and a short-term moving average line. When the short-term moving average line breaks through the long-term moving average line from the bottom, a buy signal is generated. To filter false breakouts, this strategy also requires the close price to be higher than the long-term moving average line.  

After entering the market, if the price falls back below the short-term moving average line again, it will trigger an exit signal. In addition, this strategy also sets a stop loss exit. If the retracement from the highest point reaches the set stop loss percentage, it will also exit positions.

## Strategy Logic  

The strategy mainly relies on the golden cross of dual moving averages to determine entry timing. Specifically, the following conditions must be met at the same time before opening a position to go long:  

1. The close price is greater than the long-term moving average ma1
2. The close price is lower than the short-term moving average ma2  
3. There is currently no position  

After meeting the above conditions, this strategy will take a full long position.

The exit signal judgment is based on two conditions. One is that the price falls back below the short-term moving average again. The other is that the retracement from the highest point reaches the set stop loss percentage. The specific exit conditions are as follows:  

1. The close price is greater than the short-term moving average ma2
2. The retracement from the highest point reaches the set stop loss percentage  

When either exit condition is met, this strategy will close all long positions.  

## Advantages  

1. Using dual moving average crossover combined with solid close prices to judge can effectively filter false breakouts. 

2. Adopting pullback entry can enter after the price forms short-term inflection points.  

3. With stop loss setting, it can limit the maximum drawdown.   

## Risks

1. Dual moving average crossover strategies tend to produce frequent trading signals and may chase peaks and kill bottoms.  

2. Improper parameter settings of moving averages may result in overly smooth or overly sensitive curves.  

3. Overly loose stop loss settings will lead to enlarged losses.   

## Optimization  

1. Test different length combinations of long-term and short-term moving averages to find the optimal parameters.  

2. Compare the effects of using close price and typical price to determine moving average crossovers.   

3. Test adding filters like volume or volatility indicators.  

4. Backtest optimize the stop loss percentage to find the best setting.   

## Conclusion   

The EintSimple Pullback Strategy is a simple and practical dual moving average pullback strategy. It effectively utilizes the directional functionality of moving averages while combining solid close prices to filter out false signals. Although this strategy is prone to frequent trading and chasing peaks and killing bottoms, it can be further improved through parameter optimization and adding filters. Overall, this is a great strategy for quantitative trading beginners to practice on and optimize.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|75|(?Strategy Parameters)MA 1 Length|
|v_input_int_2|9|MA 2 Length|
|v_input_float_1|0.1|Stop Loss Percent|
|v_input_bool_1|true|Exit On Lower Close|
|v_input_1|timestamp(01 Jan 1995 13:30 +0000)|(?Time Filter)Start Filter|
|v_input_2|timestamp(1 Jan 2099 19:30 +0000)|End Filter|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ZenAndTheArtOfTrading / www.PineScriptMastery.com
// @version=5
strategy("Simple Pullback Strategy", 
     overlay=true, 
     initial_capital=50000,
     default_qty_type=strategy.percent_of_equity, 
     default_qty_value=100)// 100% of balance invested on each trade

// Get user input
i_ma1           = input.int(title="MA 1 Length", defval=75, step=1, group="Strategy Parameters", tooltip="Long-term EMA")
i_ma2           = input.int(title="MA 2 Length", defval=9, step=1, group="Strategy Parameters", tooltip="Short-term EMA")
i_stopPercent   = input.float(title="Stop Loss Percent", defval=0.10, step=0.1, group="Strategy Parameters", tooltip="Failsafe Stop Loss Percent Decline")
i_lowerClose    = input.bool(title="Exit On Lower Close", defval=true, group="Strategy Parameters", tooltip="Wait for a lower-close before exiting above MA2")
i_startTime     = input(title="Start Filter", defval=timestamp("01 Jan 1995 13:30 +0000"), group="Time Filter", tooltip="Start date & time to begin searching for setups")
i_endTime       = input(title="End Filter", defval=timestamp("1 Jan 2099 19:30 +0000"), group="Time Filter", tooltip="End date & time to stop searching for setups")

// Get indicator values
ma1 = ta.ema(close, i_ma1)
ma2 = ta.ema(close, i_ma2)

// Check filter(s)
f_dateFilter = true

// Check buy/sell conditions
var float buyPrice = 0
buyCondition    = close > ma1 and close < ma2 and strategy.position_size == 0 and f_dateFilter
sellCondition   = close > ma2 and strategy.position_size > 0 and (not i_lowerClose or close < low[1])
stopDistance    = strategy.position_size > 0 ? ((buyPrice - close) / close) : na
stopPrice       = strategy.position_size > 0 ? buyPrice - (buyPrice * i_stopPercent) : na
stopCondition   = strategy.position_size > 0 and stopDistance > i_stopPercent

// Enter positions
if buyCondition
    strategy.entry(id="Long", direction=strategy.long)

if buyCondition[1]
    buyPrice := open

// Exit positions
if sellCondition or stopCondition
    strategy.close(id="Long", comment="Exit" + (stopCondition ? "SL=true" : ""))
    buyPrice := na

// Draw pretty colors
plot(buyPrice, color=color.lime, style=plot.style_linebr)
plot(stopPrice, color=color.red, style=plot.style_linebr, offset=-1)
plot(ma1, color=color.blue)
plot(ma2, color=color.fuchsia)
```

> Detail

https://www.fmz.com/strategy/438794

> Last Modified

2024-01-15 14:04:54
