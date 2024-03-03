
> Name

超越移动止损盈利策略Supertrend-Moving-Stop-Loss-Take-Profit-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10c72e6112de0438872.png)
[trans]

## 概述

超越移动止损盈利策略是一个基于超越指标的量化交易策略。该策略通过构建长仓和短仓的进入和退出条件,实现止损和移动止赚。策略优势是可以在持续趋势中获得较高的盈利,同时通过移动止赚可以锁定大部分利润。但是该策略对突破failure也较为敏感。

## 策略原理  

该策略是基于超越指标的趋势跟踪型策略。超越指标可以判断价格趋势方向。当超越指标方向变化时产生买入和卖出信号。具体来说,如果超越指标上穿0轴线则产生买入信号;如果超越指标下穿0轴线则产生卖出信号。收盘价与前一天收盘价的比例判断移动止赚点。ATR确定止损点。这样就构建了基于超越指标判断趋势方向的移动止赚止损策略。

## 优势分析

该策略最大的优势是结合了趋势判断和移动止赚。超越指标通过0轴上下突破来判断趋势方向,可以较准确地捕捉趋势。移动止赚可以在趋势进行时锁定大部分利润。止损设置也有利于控制风险。所以,在趋势明显的市场中,该策略可以获得较高的盈利。此外,策略逻辑简单清晰,容易理解和实现,这也是策略的一个优势。

## 风险分析  

该策略最大的风险在于对突破失败很敏感。在盘整区域中,超越指标可能产生假突破从而错误建立仓位。这时就很容易被套。此外,移动止赚机制也可能过早止盈,错过后续行情。最后,止损设置不当也可能过于宽松或过于激进,增加风险。所以这些都是该策略需要防范的风险点。

## 优化方向  

该策略可以从以下几个方面进行优化:1)合理确定超越指标参数,避免产生假信号;2)增加机制来判断突破的可靠性,如增加成交量信号;3)优化移动止赚的参数,在保证收益的同时尽可能减少套利可能;4)运用基于波动率的动态止损来代替静态止损;5)增加其他指标进行组合,提高策略稳定性。

## 总结  

超越移动止损盈利策略整体来说是一个较好的趋势跟踪策略。它可以合理判断趋势方向,并具有移动止盈机制。但该策略对突破失效也较为敏感,存在一定的风险。通过进一步优化参数设定、判断规则、止损机制等,可以有效改善该策略,使其成为一个稳定高效的量化交易策略。

||

## Overview
The Supertrend Moving Stop Loss Take Profit strategy is a quantitative trading strategy based on the Supertrend indicator. The strategy constructs long and short entry and exit conditions to implement stop loss and moving take profit. The advantage of the strategy is that it can achieve higher profits in sustained trends, while locking in most of the profits through moving take profit. However, the strategy is also sensitive to breakout failures.

## Strategy Logic
This strategy is a trend following strategy based on the Supertrend indicator. The Supertrend indicator can determine the direction of the price trend. It generates buy and sell signals when the Supertrend line crosses the 0-line. Specifically, a buy signal is generated when the Supertrend line crosses above the 0-line; a sell signal is generated when the line crosses below the 0-line. The ratio between the closing price and previous day's closing price determines the moving take profit point. ATR determines the stop loss point. Thus, a moving take profit stop loss strategy is constructed based on the Supertrend indicator to determine trend direction.  

## Advantage Analysis 
The biggest advantage of this strategy is the combination of trend identification and moving take profit. The Supertrend indicator can capture trends quite accurately through 0-line crossovers. Moving take profit allows locking in most profits while the trend persists. The stop loss setting also helps to control risks. Thus, the strategy can achieve higher profits in obvious trending markets. In addition, the simple and clear logic is also an advantage of the strategy.

## Risk Analysis
The biggest risk of this strategy is its sensitivity to breakout failures. In range-bound periods, the Supertrend indicator may generate false breakouts resulting in wrongly established positions. This can easily lead to being caught in traps. Also, the moving take profit mechanism may exit positions too early, missing subsequent moves. Finally, improper stop loss settings can also be too loose or too aggressive, heightening risks. Thus, these are areas the strategy needs to guard against.

## Optimization Directions 
The strategy can be optimized from the following aspects: 1) Reasonably determine Supertrend parameters to avoid false signals; 2) Add mechanisms to judge breakout reliability, such as volume signals; 3) Optimize the parameters of moving take profit to reduce whipsaw possibility while ensuring profitability; 4) Use volatility-based dynamic stops instead of static stops; 5) Add other indicators for ensemble strategies to improve robustness.

## Conclusion
Overall, the Supertrend Moving Stop Loss Take Profit strategy is a decent trend following strategy. It can reasonably determine trend direction and has a moving take profit mechanism. But it is also sensitive to invalid breakouts and has some risks. Further optimizing parameters, judgement rules, stop mechanisms etc. can improve the strategy and make it a stable and efficient trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|1500|Stop Loss Amount|
|v_input_2|15000|Profit Amount|
|v_input_3|0.91|Long Trailing Profit Taking|
|v_input_4|1.01|Short Trailing Profit Taking|
|v_input_5|10|ATR Length|
|v_input_float_1|3|Factor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2024-01-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("ST Michael Moving TP", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=15)

// Stop loss and profit amount
stop_loss = input(1500, title="Stop Loss Amount")
profit = input (15000, title="Profit Amount")
LongTrailProfit = input (0.91, title = "Long Trailing Profit Taking")
ShortTrailProfit = input (1.01, title = "Short Trailing Profit Taking")

atrPeriod = input(10, "ATR Length")
factor = input.float(3.0, "Factor", step = 0.01)

[_, direction] = ta.supertrend(factor, atrPeriod)

long_condition = ta.change(direction) <0
short_condition = ta.change(direction) >0


stop_price_long = ta.valuewhen(long_condition, low[0]-stop_loss,0)
profit_price_long = ta.valuewhen(long_condition, high[0]+profit,0)
stop_price_short = ta.valuewhen(short_condition, high[0]+stop_loss,0)
profit_price_short = ta.valuewhen(short_condition, low[0]-profit,0)

atr=ta.atr(10)

intrade_long = strategy.position_size > 0
intrade_short = strategy.position_size < 0
exitConditionLong = (close < (close[1]*LongTrailProfit)) 
exitConditionShort = (close > (close[1]*ShortTrailProfit))

if (long_condition)
    strategy.entry("Long3", strategy.long)
if (intrade_long and exitConditionLong)
    strategy.close("Long3")

if (short_condition)
    strategy.entry("Short3", strategy.short)
if (intrade_short and exitConditionShort)
    strategy.close ("Short3")

if (strategy.position_size>0)
    strategy.exit("exit_long",from_entry="Long3",limit=profit_price_long,stop=stop_price_long)

if (strategy.position_size<0)
    strategy.exit("exit_short",from_entry="Short3",limit=profit_price_short,stop=stop_price_short)    
```

> Detail

https://www.fmz.com/strategy/438054

> Last Modified

2024-01-08 16:24:03
