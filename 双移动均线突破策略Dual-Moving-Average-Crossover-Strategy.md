
> Name

双移动均线突破策略Dual-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1705b2c15e0d05537ed.png)
这里是使用双移动均线的趋势跟随策略的详细分析文章:

[trans]

### 概述

双移动均线突破策略是最受欢迎的交易策略之一。该策略利用快速移动均线和慢速移动均线的交叉作为买入和卖出的信号。当快速移动均线从下方上穿慢速移动均线时,为买入信号;当快速移动均线从上方下穿慢速移动均线时,为卖出信号。该策略属于传统的追踪趋势策略。

### 策略原理

该策略使用长度为10和13的简单移动均线。当10日简单移动均线从下方上穿13日简单移动均线时,产生买入信号;当10日简单移动均线从上方下穿13日简单移动均线时,产生卖出信号。

如果满足买入条件,同时当前持有空头头寸,会先平掉空头头寸,然后开仓做多;如果满足卖出条件,同时当前持有多头头寸,会先平掉多头头寸,然后开仓做空。

此外,该策略还设置了止损逻辑。做多时,会根据输入的止损百分比设置止损价格;做空时也是一样,根据输入的百分比设置止损价格。当价格触碰到止损价格时,会退出当前头寸。

### 优势分析

- 该策略 captures1. 该策略能够捕捉趋势,跟踪中长线趋势走势。

- 采用双均线设计,可以有效过滤假突破。

- 设置止损可以控制个别单笔损失。

- 策略逻辑简单清晰,容易理解实现。

- 可根据市场调整均线参数,优化策略表现。

### 风险分析

- 作为趋势跟踪策略,在趋势末段容易被套。

- 均线系统容易产生滞后,可能错过转折点。

- 止损设置不合理可能造成不必要的损失。

- 双均线交叉并不能完全过滤假突破。

- 策略仅基于技术指标,忽略了基本面因素。

### 优化方向 

- 可以考虑将均线长度参数优化,选择更合适的均线周期。

- 可以采用三均线设计,增加判断信号准确性。

- 动态优化止损点,让止损更贴近价格。

- 结合其他指标过滤假突破信号。

- 优化资金管理,严格控制个别损失大小。

### 总结

双移动均线突破策略是一个简单实用的趋势跟踪策略。它能够有效捕捉中长线趋势,返回稳定的超额收益。但作为趋势跟踪策略,它可能在趋势末期被套利。我们可以通过参数优化、增加信号过滤和优化资金管理来改进该策略,使其更适应市场环境。总体来说,双均线策略是一个非常适合新手交易者实施的入门策略。

||


### Overview

The dual moving average crossover strategy is one of the most popular trading strategies. It utilizes the crossover of a fast moving average and a slow moving average as buy and sell signals. When the fast MA crosses above the slow MA, it generates a buy signal. When the fast MA crosses below the slow MA, it generates a sell signal. This strategy belongs to the category of traditional trend following strategies.

### Strategy Logic  

This strategy uses simple moving averages of length 10 and 13. When the 10-period SMA crosses above the 13-period SMA, a buy signal is generated. When the 10-period SMA crosses below the 13-period SMA, a sell signal is generated.

If the long condition is met while currently holding a short position, the short position will be closed first before entering a long position. Similarly, if the short condition is met while currently holding a long position, the long position will be closed first before entering a short position.

In addition, this strategy incorporates stop loss logic. For long trades, the stop loss price is calculated based on the input percentage. The same applies for short trades. When price hits the stop loss level, the current position will be exited.

### Advantage Analysis

- This strategy captures trends and follows medium to long term trend movements.

- The dual MA design helps filter out false breakouts effectively. 

- The stop loss helps control loss on individual trades.

- The strategy logic is simple and easy to understand.

- MA parameters can be adjusted for optimization.

### Risk Analysis

- As a trend following strategy, it risks being caught at trend reversals.

- MA systems can lag and miss turning points.

- Improper stop loss setting may lead to unnecessary losses.

- Dual MA crossovers do not completely eliminate false signals.

- The strategy ignores fundamentals and focuses solely on technicals.

### Improvement Directions

- The MA parameters can be optimized to find the optimal periods.

- A triple MA system could improve signal accuracy. 

- The stop loss can be made adaptive to price.

- Additional filters could be added to screen signals.

- Money management can be enhanced to limit losses.

### Conclusion

The dual moving average crossover is a simple and practical trend following strategy. It can effectively capture medium to long term trends and generate steady excess returns. But it runs the risk of being whipsawed at trend reversals. The strategy can be improved via parameter optimization, better signal filtering and enhanced risk management. Overall, it is an ideal starter strategy for novice traders.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long Stop Loss (%)|
|v_input_2|true|Short Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-26 00:00:00
end: 2023-11-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © chiragchopra91
//@version=4

strategy(title='Chirag Strategy SMA', shorttitle='CHIRAGSMA', overlay=true)

longCondition = crossover(sma(close, 10), sma(close, 13))
shortCondition = crossover(sma(close, 13), sma(close, 10))

// Set stop loss level with input options
longLossPerc = input(title="Long Stop Loss (%)", type=input.float, minval=0.0, step=0.1, defval=1) * 0.01
shortLossPerc = input(title="Short Stop Loss (%)", type=input.float, minval=0.0, step=0.1, defval=1) * 0.01

longStopPrice  = strategy.position_avg_price * (1 - longLossPerc)
shortStopPrice = strategy.position_avg_price * (1 + shortLossPerc)

if longCondition
    if strategy.position_size < 0
        strategy.close('Short', comment="SHORT EXIT")
    strategy.entry('Long', strategy.long, comment="BUY")

if shortCondition
    if strategy.position_size > 0
        strategy.close('Long', comment="BUY EXIT")
    strategy.entry('Short', strategy.short, comment="SHORT")

if strategy.position_size > 0
    strategy.exit('LONG SL', stop=longStopPrice, comment="LONG SL EXIT")

if strategy.position_size < 0
    strategy.exit('SHORT SL', stop=shortStopPrice, comment="SHORT SL EXIT")
    
```

> Detail

https://www.fmz.com/strategy/430897

> Last Modified

2023-11-02 17:04:55
