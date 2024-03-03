
> Name

均线交叉策略Dual-SMA-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

 ![IMG](https://www.fmz.com/upload/asset/1a9af0ee348aeae52d2.png)

[trans]

## 概述

均线交叉策略通过计算两个不同参数设置的SMA均线的交叉来产生交易信号。当较快的SMA均线上穿较慢的SMA均线时,产生买入信号;当较慢的SMA均线下穿较快的SMA均线时,产生卖出信号。该策略同时使用两组SMA均线参数,一组用于确定买入点,另一组用于确定卖出点。

## 策略原理

该策略中使用了两组SMA均线参数,分别是`smaB1`、`smaB2`和`smaS1`、`smaS2`。`smaB1`和`smaB2`用于确定买入信号,它们分别代表较慢和较快的均线。当`smaB1`上穿`smaB2`时产生买入信号。`smaS1`和`smaS2`用于确定卖出信号,同样分别代表较慢和较快的均线。当`smaS2`下穿`smaS1`时产生卖出信号。这样可以灵活地调整买入和卖出条件,适应不同的市场环境。

具体来说,该策略通过计算close价格的SMA值,并实时监测两组SMA均线的交叉情况来判断买入和卖出的时机。在SMA快线上穿慢线时,认为价格走势正向上,因此此时做多;而在SMA慢线下穿快线时,判断价格走势转为下降,因此平掉多单。

## 优势分析

该策略有以下主要优势:

1. 使用双均线交叉系统,可以灵活调整买入卖出条件,适应市场变化
2. SMA均线本身可以滤波掉部分噪音,产生较为可靠的交易信号
3. 允许自定义SMA参数组合,可以针对不同品种优化参数

## 风险分析

该策略也存在一些风险:  

1. 均线交叉信号可能滞后,无法在转折点前后立即产生信号
2. 选择不当的SMA参数组合可能导致过多错误信号
3. 大幅震荡市场中产生的信号效果可能不佳

为控制上述风险,可以通过优化SMA参数组合,结合动态止损来锁定利润等方法进行改进。

## 优化方向  

该策略可以从以下几个方面进行优化:

1. 测试更多SMA参数组合,寻找最佳参数
2. 增加成交量的确认,避免在价格剧烈波动时产生错误信号
3. 结合其他指标(如MACD、RSI等)过滤SMA交叉信号
4. 增加止损策略,以锁定利润并减少亏损

## 总结

均线交叉策略通过计算两组SMA均线的交叉情况,产生简单有效的交易信号。该策略允许灵活调整参数,适用于不同品种,是一种常用的趋势跟踪策略。通过参数优化、信号过滤等方法可以进一步改进该策略,使其产生更可靠的信号。

||

## Overview

The Dual SMA Crossover strategy generates trading signals by calculating the crossover of two SMA lines with different parameter settings. When the faster SMA line crosses above the slower SMA line, a buy signal is generated. When the slower SMA line crosses below the faster SMA line, a sell signal is generated. The strategy uses two sets of SMA parameters at the same time, one set to determine entry points, and the other to determine exit points.

## Strategy Logic  

This strategy uses two sets of SMA parameters, `smaB1`, `smaB2` for buy signals, and `smaS1`, `smaS2` for sell signals, representing slower and faster moving averages respectively. When `smaB1` crosses above `smaB2`, a buy signal is generated. When `smaS2` crosses below `smaS1`, a sell signal is generated. This allows flexible adjustment of entry and exit conditions to adapt to changing market environments.

Specifically, this strategy monitors the crossover situations between the two SMA lines calculated from the close price to determine the timing of buying and selling. When the faster SMA line crosses above the slower SMA line, it is judged that the price trend is upward, so go long at this time. And when the slower SMA line crosses below the faster SMA line, the price trend turns downward, so exit long positions.  

## Advantage Analysis

The main advantages of this strategy are:

1. Using a dual moving average crossover system allows flexible tuning of entry and exit criteria to adapt to market changes
2. The SMA lines themselves can filter out some noise and generate more reliable trading signals  
3. Customizable SMA parameter combinations allow parameter optimization for different products

## Risk Analysis

There are also some risks associated with this strategy:

1. SMA crossover signals may lag and fail to generate timely signals around turning points
2. Improper selection of SMA parameters can lead to too many false signals
3. Signals generated in volatile market conditions may not work well

To control the above risks, methods like SMA parameter optimization, dynamic stop loss to lock in profits, etc. can be used to improve the strategy.

## Optimization Directions

Some optimization directions for this strategy:

1. Test more SMA parameter combinations to find the optimal parameters
2. Add volume confirmation to avoid wrong signals during violent price fluctuations
3. Combine other indicators (e.g. MACD, RSI) to filter SMA crossover signals  
4. Add stop loss strategies to lock in profits and reduce losses

## Summary

The SMA Crossover strategy generates simple and effective trading signals by calculating the crossover situations between two SMA lines. The flexibility to adjust parameters makes this strategy adaptable to different products, and it is a commonly used trend following strategy. Further improvements can be made to this strategy through parameter optimization, signal filtering etc. to generate more reliable signals.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|377|smaB1|
|v_input_2|200|smaB2|
|v_input_3|377|smaS1|
|v_input_4|200|smaS2|
|v_input_5|true|From Month|
|v_input_6|true|From Day|
|v_input_7|2020|From Year|
|v_input_8|true|To Month|
|v_input_9|true|To Day|
|v_input_10|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-15 00:00:00
end: 2023-11-22 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © melihtuna

//@version=4
strategy("SMA Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, initial_capital=10000, currency=currency.USD, commission_value=0.1, commission_type=strategy.commission.percent)

smaB1 = input(title="smaB1",defval=377)
smaB2 = input(title="smaB2",defval=200)
smaS1 = input(title="smaS1",defval=377)
smaS2 = input(title="smaS2",defval=200)
smawidth = 2

plot(sma(close, smaB1), color = #EFB819, linewidth=smawidth, title='smaB1')
plot(sma(close, smaB2), color = #FF23FD, linewidth=smawidth, title='smaB2')
plot(sma(close, smaS1), color = #000000, linewidth=smawidth, title='smaS1')
plot(sma(close, smaS2), color = #c48dba, linewidth=smawidth, title='smaS2')

// === INPUT BACKTEST RANGE ===
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2020, title = "From Year", minval = 2017)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2017)

// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        
window()  => time >= start and time <= finish ? true : false 

longCondition = crossover(sma(close, smaB1),sma(close, smaB2))

if (window() and longCondition)
    strategy.entry("BUY", strategy.long)

shortCondition = crossover(sma(close, smaS2),sma(close, smaS1))

if (window() and shortCondition)
    strategy.entry("SELL", strategy.short)
    
    
    
```

> Detail

https://www.fmz.com/strategy/433020

> Last Modified

2023-11-23 16:42:58
