
> Name

VWAP突破追踪策略The-VWAP-breakout-tracking-strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10ddb5d27f797bdde0a.png)

[trans]

## 概述

VWAP突破追踪策略是一个利用VWAP指标识别趋势方向的追踪策略。它通过分析最近5根K线的收盘价突破VWAP的情况,判断价格的突破方向。当检测到连续3根K线在同一方向突破VWAP时,记录该方向第3根K线的最高价或最低价。之后若价格突破该最高价或最低价,则产生交易信号。

该策略的主要优势是能快速捕捉价格突破的机会,实现超短线的追踪交易。但也存在一定的仓位积累过快的风险。可通过适当调整仓位参数进行优化。

## 策略原理

### 指标计算

该策略使用的主要指标是VWAP。VWAP代表价格的平均成交价,是考量成交量加权的价格均线。它能很好反映市场公认的价格水平。

策略内部实时计算5根收盘价K线和VWAP指标。并定义了一系列逻辑判断变量,检测价格是否出现指定次数的连续突破。

### 交易信号

策略的交易信号来自于价格突破创造的新高或新低。具体逻辑是:

1. 判断最近5根K线中,前3根是否在同一方向连续突破VWAP(如价位持续上涨或下跌)
2. 如果是,则记录该方向第3根K线的最高价或最低价
3. 等待价格突破记录的最高价或最低价时,产生交易信号

因此,该策略的核心就是识别价格突破方向,追踪突破产生的新高或新低进行交易。

### 仓位控制

默认的仓位大小为账户权益的100%。这代表采取全仓交易。考虑到策略的高频短线特点,可适当调低仓位规模,控制风险。

平仓条件为价格重新回穿VWAP指标。即以VWAP作为追踪止损位,避免亏损扩大。

## 优势分析

VWAP突破追踪策略最大的优势在于能快速捕捉短期价格趋势,追踪突破行情进行交易。主要优势总结如下:

1. 快速响应价格突破,追踪最新趋势
2. 采用VWAP指标判断方向,有一定的可靠性
3. 默认全仓交易,可以最大化盈利
4. VWAP作为止损位,可以限制单笔损失

该策略特别适合高频短线交易,能快速锁定短期获利。在具有明显波动的品种(如原油、黄金等)中效果最佳。

## 风险分析

尽管VWAP突破追踪策略响应迅速、追踪效率高,但也存在一些风险需要注意:

1. 多次追踪仓位易累积过大,损失风险加大
2. VWAP指标作用有限,不足以完全避免亏损
3. 高频出入场交易成本压力较大
4. 默认全仓交易风险高,需要承受较大回撤

针对以上风险,可通过以下方式进一步优化:

1. 适当缩小仓位比例,减少单次亏损影响
2. 增加其他指标判断过滤,提高决策准确性 
3. 适当放宽止损线距离,减少过于频繁停损
4. 增设盈利PROTECT止盈机制,锁定收益

## 优化方向 

VWAP突破追踪策略作为一个追踪类超短线策略,可从以下几个维度继续优化:

1. **多指标集成**:整合波动率、MACD等其他指标,设定更严格的交易信号过滤条件,减少误判概率

2. **动态仓位**:根据市场波动程度,动态调整仓位大小。如大盘震荡时减少仓位,趋势明显时加大仓位

3. **自适应止损**:将固定的VWAP止损线改为动态追踪止损位。并结合ATR指标计算止损距离,实现止损线自适应调整

4. **风控机制**:设置最大持仓时间、单日盈亏限制、回撤率线等多项风控指标,对交易进行约束

5. **机器学习**:收集历史交易数据,使用深度学习模型优化策略参数,追求更高稳定性

## 总结

VWAP突破追踪策略总体来说是一个非常实用的高频交易策略。它能快速响应短期价格突破机会,利用全仓追踪实现超短线套利。同时,内置的VWAP追踪止损机制也能很好控制风险。

通过进一步多指标集成、动态仓位管理、自适应止损线、风控机制等优化手段,可以使该策略的交易决策更稳定,追踪效率更高。配合机器学习参数优化,VWAP突破追踪策略的效果还有很大提升空间。

对于喜欢高频交易操作的投资者而言,这绝对是一个值得重点考虑和持续优化的策略方案。

||

## Overview  

The VWAP breakout tracking strategy is a trend-following strategy that uses the VWAP indicator to identify trend direction. It detects price breakouts across VWAP based on the closing prices of the recent 5 bars. When 3 consecutive bars breakout VWAP in the same direction, the highest/lowest price of the 3rd bar is recorded. A trading signal is then generated when price breaks through that recorded highest/lowest price level.

The key advantage of this strategy is its quick response to catch breakout opportunities for ultra short-term momentum trading. However, there is also the risk of accumulating too large of a position. This can be optimized by adjusting the position sizing parameters.   

## Strategy Logic  

### Indicator Calculation  

The core indicator used in this strategy is VWAP. VWAP stands for Volume Weighted Average Price, which is a volume-weighted average price line. It reflects the market consensus price level.  

The strategy calculates the closing prices of the most recent 5 bars and the VWAP indicator in real-time. It also defines a series of logical variables to check for specific types of consecutive VWAP breakouts.  

### Trading Signals  

The trading signals are generated based on the new highest/lowest prices created by price breakouts. The logic is:  

1. Check if the closing prices of the most recent 3 bars breakout VWAP in the same direction consecutively (e.g. prices rising or falling)  
2. If yes, record the highest/lowest price of the 3rd bar in that direction
3. Enter trade when price breaks through the recorded highest/lowest price 

So the core idea is to identify the direction of price breakouts, and trade the new highest/lowest prices resulted from the breakouts.  

### Position Sizing  

The default position sizing is set at 100% of equity. This represents a full position on every trade. Considering the short-term nature of this strategy, the position size could be reduced to control risk.  

The exit rule is a VWAP crossunder/crossover. VWAP serves as the trailing stop loss to avoid runaway losses.   

## Advantage Analysis   

The biggest advantage of the VWAP breakout tracking strategy is its quick response to catch short-term price momentum and trend-following opportunities. The key advantages are:  

1. Quick reaction to price breakouts and momentum movements  
2. VWAP indicator offers reasonably reliable directional bias  
3. Default full position sizing allows maximized profits  
4. VWAP acts as risk management to contain losses  

This strategy is especially suitable for high-frequency short-term trading, allowing quick locking-in of profits. It performs the best with volatile instruments like crude oil and gold.   

## Risk Analysis   

Although this strategy has efficient tracking capability, there are still risks to consider:   

1. Accumulating excessive position from frequent tracking  
2. Limited effectiveness of VWAP to fully prevent losses
3. High trading costs from frequent exits/entries   
4. Full position sizing by default implies high risk and drawdowns  

The following optimizations could help mitigate those risks:  

1. Reduce position sizing ratio to limit impact per loss
2. Add filter conditions with more indicators to improve signal accuracy   
3. Relax stop loss distance to prevent over-stopping out 
4. Add profit-taking mechanisms like PROTECT to lock in gains  

## Optimization Directions   

As an ultra short-term tracking strategy, further optimizations could be done from these areas:   

1. **Multi-indicator integration**: Combine other volatility and momentum indicators to set stricter filter rules and improve accuracy 

2. **Dynamic position sizing**: Adjust position size dynamically based on changing market conditions. Reduce when volatility surges and increase during strong trends.

3. **Adaptive stops**: Upgrade fixed VWAP stops to adaptive trailing stop mechanism based on ATR and other price action signals.  

4. **Risk management**: Establish more risk metrics constraints like maximum holding periods, profit/loss limits per day, drawdown limit etc. to control risks.   

5. **Machine learning**: Collect historical trade data and adopt machine learning models to find optimal strategy parameters for higher stability.  

## Conclusion   

Overall, the VWAP breakout tracking strategy is a very practical high-frequency trading system. It responds swiftly to short-term breakout opportunities and tracks prices using full position for quick scalping. The built-in VWAP trailing stop also helps restrict risks.  

With further optimizations like multi-indicator filtering, dynamic position sizing, adaptive stops and machine learning, this strategy can achieve even better efficiency and stability. It has great potential for high-frequency traders. The ongoing enhancement of this strategy is strongly recommended due to its practical applicability.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-12 00:00:00
end: 2023-12-19 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=5
strategy(title="VWAP Push", initial_capital = 100000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0, currency = 'USD', overlay=true)


//VWAP
vwap = ta.vwap(close)
plot(vwap, color=color.black, title="vwap")

//Last 5 Closes
closeBarPrevious5 = close[5]
closeBarPrevious4 = close[4]
closeBarPrevious3 = close[3]
closeBarPrevious2 = close[2]
closeBarPrevious1 = close[1]
closeBarCurrent = close


//is_1530 = (hour == 15) and (minute == 30)

is_push_up = (closeBarCurrent > closeBarPrevious1) and (closeBarPrevious1 > closeBarPrevious2) and (closeBarPrevious2 > closeBarPrevious3) and (closeBarPrevious4 < vwap) and (closeBarPrevious3 > vwap)  
is_push_down = (closeBarCurrent < closeBarPrevious1) and (closeBarPrevious1 < closeBarPrevious2) and (closeBarPrevious2 < closeBarPrevious3) and (closeBarPrevious4 > vwap) and (closeBarPrevious3 < vwap)  

var float hi = na
var float lo = na

hi := is_push_up ? high : hi
lo := is_push_down and (close < vwap) ? low : lo

plot(hi, "High", color.green, 1, plot.style_circles)
plot(lo, "Low", color.red, 1, plot.style_circles)

// Conditions

longCondition = ta.crossover(close,hi)
exitLong = ta.crossunder(close,vwap)

shortCondition = ta.crossunder(close,lo) and (close < vwap)
exitShort = ta.crossover(close,vwap)

// Entries Exits


if (longCondition)
    strategy.entry("Long", strategy.long)
if (exitLong)
    strategy.close("Long")
 

if (shortCondition)
    strategy.entry("Sell", strategy.short)
if (exitShort)
    strategy.close("Sell")



```

> Detail

https://www.fmz.com/strategy/435991

> Last Modified

2023-12-20 16:25:18
