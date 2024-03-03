
> Name

均线交叉策略Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

均线交叉策略是一个基于移动均线的常用交易策略。该策略使用快速移动均线和慢速移动均线的交叉作为买入和卖出信号。当快速均线从下方上穿慢速均线时,视为买入信号;当快速均线从上方下穿慢速均线时,视为卖出信号。本策略使用50日均线作为快速均线,200日均线作为慢速均线。

## 策略原理

该策略的核心逻辑基于均线理论。移动均线能够有效平滑价格波动,反映价格趋势。快速均线对价格变化更为敏感,能够捕捉趋势的转折点;慢速均线对价格变化不那么敏感,能过滤掉短期波动。当快速均线上穿慢速均线时,表示短期价格开始上升,开始进入多头趋势;当快速均线下穿慢速均线时,表示短期价格开始下跌,开始进入空头趋势。

具体来看,该策略首先定义了50日均线和200日均线。然后设置多头入场条件为快速均线上穿慢速均线,空头入场条件为快速均线下穿慢速均线。为了避免重叠交易,策略使用了isEntry和isExit标志位进行控制。当满足入场条件时,将isEntry设为true,当满足出场条件时,将isExit设为true。只有当isEntry为false且出现买入信号时,才会进行多头开仓;只有当isExit为false且出现卖出信号时,才会进行空头开仓。

此外,策略还设置了止盈止损点。用户可以通过输入百分比来设定止盈止损的距离。止盈和止损价格会根据入场价格的百分比变化来计算。当持仓量大于0时,会根据设置的止盈和止损百分比来履行止盈止损;当持仓量小于0时,会根据设置的空头止盈止损百分比来履行止盈止损。

## 优势分析

该策略具有以下优势:

1. 操作简单,容易实现。仅仅依靠均线交叉就可以进行交易,非常适合无交易经验的初学者。

2. 回撤可控,具有一定的风险管理机制。移动均线能够有效过滤短期价格震荡,避免被套利。

3. 可自定义参数,适应性强。用户可以自行设置均线参数和止盈止损标准,优化策略的参数。

4. 可视化展示清晰。策略直接在图表上绘制出关键的均线、入场点、止盈止损点,一目了然。

5. 可扩展性强。该策略框架完整,只需要修改关键的交易信号、添加指标等就可以改进策略。

## 风险分析

该策略也存在一些风险:

1. 市场突发事件导致巨大行情,无法止损。快速均线对价格变化较为敏感,无法有效应对突发事件。

2. 震荡行情中容易被套。若行情长期震荡,则会重复亏损。

3. 未考虑交易成本。实际交易中手续费和滑点损耗严重影响盈利。

4. 回测数据拟合风险。实盘情况复杂多变,回测结果不代表实战表现。

对应解决方法:

1. 可设置更加宽松的止损标准,也可以加入附加的突破止损。

2. 可适当加宽均线距离,降低交易频率,或改用其他指标过滤信号。 

3. 应考虑到实际交易成本,设置更宽限的止盈空间。

4. 应充分考虑市场环境变化,优化参数并逐步减少拟合。

## 优化方向 

该策略可以从以下几个方面进行优化:

1. 测试不同的参数组合,寻找最佳的参数。可以测试快慢均线的日数、参数组合等。

2. 加入其他指标进行过滤,避免震荡行情中的误交易。例如MACD,KD等指标。

3. 优化止盈止损策略,实现更高效的风险管理。例如追踪止损、挂单止损等。

4. 加大持仓规模,利用杠杆进行放大,增大盈利空间。但要控制风险。

5. 考虑实盘交易成本,对回测参数进行调整优化,使策略参数更适合实战。

6. 结合统计方法对参数稳定性进行评估,降低数据拟合风险,提高稳定性。

## 总结

综上所述,该均线交叉策略整体思路清晰、实现简单,适合作为量化交易的入门策略来学习。但该策略也存在一定的风险与不足,需要对参数及 filters 进行细致优化,并注意控制实盘交易风险,才能取得稳定收益。该策略框架具有很强的拓展性,用户可以在此基础上进行创新与优化,开发出更适合自身风格的交易策略。

||


## Overview

The moving average crossover strategy is a commonly used trading strategy based on moving averages. It uses the crossover of a faster moving average and a slower moving average as trading signals. When the faster moving average crosses above the slower moving average from below, it is a buy signal. When the faster moving average crosses below the slower moving average from above, it is a sell signal. This strategy uses 50-day MA as the faster MA and 200-day MA as the slower MA.

## Strategy Logic

The core logic of this strategy is based on the theory of moving averages. Moving averages can effectively smooth price fluctuations and indicate price trends. The faster MA is more sensitive to price changes and can capture trend reversal points. The slower MA is less sensitive to price changes and can filter out short-term fluctuations. When the faster MA crosses above the slower MA, it indicates an uptrend in prices. When the faster MA crosses below the slower MA, it indicates a downtrend in prices.

Specifically, this strategy first defines the 50-day MA and 200-day MA. The long entry condition is set when the faster MA crosses above the slower MA. The short entry condition is set when the faster MA crosses below the slower MA. To avoid overlapping trades, the strategy uses isEntry and isExit flags for control. When the entry condition is met, isEntry is set to true. When the exit condition is met, isExit is set to true. A long position will only be opened when isEntry is false and a buy signal appears. A short position will only be opened when isExit is false and a sell signal appears.

In addition, the strategy also sets take profit and stop loss levels. Users can define the TP/SL percentage distance through inputs. The TP and SL prices will be calculated based on the entry price percentage. When position size is greater than 0, TP and SL will be executed based on the long TP/SL percentage. When position size is less than 0, TP and SL will be based on the short TP/SL percentage.

## Advantage Analysis

The advantages of this strategy include:

1. Simple to implement. It trades purely based on MA crosses, suitable for beginners without trading experience.

2. Controllable drawdown with risk management. Moving averages can filter short-term fluctuations and avoid being stopped out.

3. Customizable parameters for adaptability. Users can optimize parameters like MA periods and TP/SL levels.

4. Clear visualization. The strategy plots the key MAs, entries, and TP/SL levels on the chart.

5. Extendable framework. The strategy structure is complete. New signals and indicators can be added to enhance it.

## Risk Analysis

The risks of this strategy include:

1. Unable to stop loss during extreme market events, leading to huge drawdown. Faster MA is sensitive to price changes and may fail in extreme conditions.

2. Prone to whipsaws in ranging markets, causing consecutive losses.

3. Trading costs are not considered. Fees and slippage in actual trading will significantly impact profitability.

4. Backtest overfitting. Real market conditions are complex and backtest results may not represent live performance.

The solutions include:

1. Use a wider stop loss, or add an additional breakout stop loss.

2. Widen the MA distance, reduce trade frequency, or add other filters.

3. Consider actual trading costs, set a wider profit target space. 

4. Optimize parameters gradually and reduce overfitting by considering changing market conditions.

## Optimization Directions

This strategy can be optimized in the following aspects:

1. Test different parameter combinations to find the optimal parameters, like MA periods.

2. Add other indicators as filters to avoid whipsaws, such as MACD, KD etc.

3. Optimize stop loss strategy for better risk management, like trailing stop loss. 

4. Increase position size with leverage to magnify profits while controlling risk.

5. Consider trading costs, optimize parameters for live trading.

6. Evaluate parameter stability using statistical methods to reduce overfitting.

## Conclusion

In conclusion, this MA crossover strategy has a clear logic and is simple to implement, suitable as an introductory strategy for algo trading. But it also has risks and limitations. Careful parameter and filter optimization, and risk control are needed to achieve steady profits. This strategy has great extensibility for users to innovate and optimize based on it to suit their own trading style.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2020|Backtest Start Year|
|v_input_2|5|Backtest Start Month|
|v_input_3|11|Backtest Start Day|
|v_input_4|3650|Backtest Period (days)|
|v_input_5|false|Long Take Profit (%)|
|v_input_6|false|Long Stop Loss (%)|
|v_input_7|false|Short Take Profit (%)|
|v_input_8|false|Short Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-02 00:00:00
end: 2023-10-09 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © gjfsdrtytru

//@version=4
strategy("Backtest Engine", "Backtest", overlay=true, commission_type=strategy.commission.percent, commission_value=0.07, initial_capital = 1000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, currency = currency.USD)


// Start code here...
fastMA = sma(close,50)
slowMA = sma(close,200)

plot(fastMA, "Fast MA",  color.blue)
plot(slowMA, "Slow MA",  color.red)

// Long Enrty/Exit
longCondition = crossover(fastMA,slowMA)
closeLong = crossover(slowMA,fastMA)

// Short Enrty/Exit
shortCondition = crossover(slowMA,fastMA)
closeShort = crossover(fastMA,slowMA)


// Bot web-link alert - {{strategy.order.comment}}
botLONG = "ENTRY LONG ALERT"
botCLOSELONG = "CLOSE LONG ALERT"
botSHORT = "ENTRY SHORT ALERT"
botCLOSESHORT = "CLOSE SHORT ALERT"

//////////////////////////////////////////////////////////////////
//////////////////////// BACKTEST ENGINE \\\\\\\\\\\\\\\\\\\\\\\\\
/////////////////// [NO USER INPUT REQUIRED] /////////////////////
//////////////////////////////////////////////////////////////////

// Time period
testStartYear = input(2020, "Backtest Start Year")
testStartMonth = input(5, "Backtest Start Month")
testStartDay = input(11, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

periodLength = input(3650, "Backtest Period (days)", minval=0,tooltip="Days until strategy ends") * 86400000 // convert days into UNIX time
testPeriodStop = testPeriodStart + periodLength

testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false

// Convert Take profit and Stop loss to percentage
longTP = input(title="Long Take Profit (%)", type=input.float, minval=0.0, step=0.1, defval=0) * 0.01 // Set levels with input options
longSL = input(title="Long Stop Loss (%)", type=input.float, minval=0.0, step=0.1, defval=0) * 0.01 // Set levels with input options
shortTP = input(title="Short Take Profit (%)", type=input.float, minval=0.0, step=0.1, defval=0) * 0.01 // Set levels with input options
shortSL = input(title="Short Stop Loss (%)", type=input.float, minval=0.0, step=0.1, defval=0) * 0.01 // Set levels with input options

// 0% TP/SL = OFF (a value of 0 turns off TP/SL feature)
longProfitPerc = longTP == 0 ? 1000 : longTP
longStopPerc = longSL == 0 ? 1 : longSL
shortProfitPerc = shortTP == 0 ? 1 : shortTP
shortStopPerc = shortSL == 0 ? 1000 : shortSL

// Determine TP/SL price based on percentage given
longProfitPrice  = strategy.position_avg_price * (1 + longProfitPerc)
longStopPrice  = strategy.position_avg_price * (1 - longStopPerc)
shortProfitPrice  = strategy.position_avg_price * (1 - shortProfitPerc)
shortStopPrice  = strategy.position_avg_price * (1 + shortStopPerc)

// Anti-overlap
isEntry_Long = false
isEntry_Long := nz(isEntry_Long[1], false)
isExit_Long = false
isExit_Long := nz(isExit_Long[1], false)
isEntry_Short = false
isEntry_Short := nz(isEntry_Short[1], false)
isExit_Short = false
isExit_Short := nz(isExit_Short[1], false)

entryLong = not isEntry_Long and longCondition
exitLong = not isExit_Long and closeLong
entryShort = not isEntry_Short and  shortCondition
exitShort = not isExit_Short and closeShort

if (entryLong)
    isEntry_Long := true
    isExit_Long := false
if (exitLong)
    isEntry_Long := false
    isExit_Long := true
if (entryShort)
    isEntry_Short := true
    isExit_Short := false
if (exitShort)
    isEntry_Short := false
    isExit_Short := true

// Order Execution
if testPeriod() 
    if entryLong
        strategy.entry(id="Long", long=true, when = entryLong, comment=botLONG) // {{strategy.order.comment}}
    if entryShort
        strategy.entry(id="Short", long=false, when = entryShort, comment=botSHORT) // {{strategy.order.comment}}


// TP/SL Execution
if (strategy.position_size > 0)
    strategy.exit(id="Long SL/TP", from_entry="Long", limit=longProfitPrice, stop=longStopPrice)
    strategy.close(id="Long", when=exitLong, comment=botCLOSELONG) // {{strategy.order.comment}}

if (strategy.position_size < 0)
    strategy.exit(id="Short TP/SL", from_entry="Short", limit=shortProfitPrice, stop=shortStopPrice)
    strategy.close(id="Short", when=exitShort, comment=botCLOSESHORT) // {{strategy.order.comment}}
    
// Draw Entry, TP and SL Levels for Long Positions
plot(strategy.position_size > 0 ? longTP == 0 ? na : longProfitPrice : na, style=plot.style_linebr, color=color.green, title="Long TP")
plot(strategy.position_size > 0 ? strategy.position_avg_price : na, style=plot.style_linebr, color=color.blue, title="Long Entry")
plot(strategy.position_size > 0 ? longSL == 0 ? na : longStopPrice : na, style=plot.style_linebr, color=color.red, title="Long SL")
// Draw Entry, TP and SL Levels for Short Positions
plot(strategy.position_size < 0 ? shortTP == 0 ? na : shortProfitPrice : na, style=plot.style_linebr, color=color.green, title="Short TP")
plot(strategy.position_size < 0 ? strategy.position_avg_price : na, style=plot.style_linebr, color=color.blue, title="Short Entry")
plot(strategy.position_size < 0 ? shortSL == 0 ? na : shortStopPrice : na, style=plot.style_linebr, color=color.red, title="Short SL")
```

> Detail

https://www.fmz.com/strategy/428856

> Last Modified

2023-10-10 10:44:25
