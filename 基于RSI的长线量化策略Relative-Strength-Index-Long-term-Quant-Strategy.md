
> Name

基于RSI的长线量化策略Relative-Strength-Index-Long-term-Quant-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1aed620a872bd917db0.png)
[trans]

## 概述

本策略名为“Relative Strength Index长线量化策略”,简称RSI长线策略。该策略通过计算一定周期内价格涨幅和跌幅的移动平均线,构建RSI技术指标,并设定超买超卖线,来判断行情时点。当RSI低于设定的超卖线时,采取逐步建仓的方式进入长线持有。

## 策略原理

该策略的核心指标是相对强弱指数(RSI)。RSI指标通过比较一段时间内的平均涨幅和平均跌幅,来判断当前证券价格是否被高估或低估。其计算公式为:

RSI = 100 - 100 / (1 + UP / DOWN)

其中,UP是最近n天内收盘价上涨的平均幅度;DOWN是最近n天内收盘价下跌的平均幅度。指标以0-100区间震荡,超过70为超买区,低于30为超卖区。

该策略设置RSI参数Length=14,根据14天的收盘价计算RSI。并设置超卖线Rsvalue=40,即RSI低于40判定为超卖。当日RSI低于40时,打开买入窗口,采取逐步建仓策略,在超卖区间逐步买入,并设置最后平仓时间,超过平仓时间后全部卖出。

## 优势分析

该策略最大的优势在于,通过RSI指标判断市场时点,实现了对低价的捕捉。RSI低于40时为超卖状态,代表前期跌幅过大,存在反弹机会,这时逐步建仓,可以获得较好的成本。而RSI高于70时为超买状态,代表行情可能见顶,这时可以考虑逐步减仓。

另外,策略采取逐步建仓的方式,可以降低单次入场带来的风险。建仓窗口作为持仓高点,最后平仓时间作为持仓低点,实现了长线投资。

## 风险分析

该策略主要依赖RSI这一技术指标,存在一定的滞后性。特别是在行情突然变化时,RSI可能来不及给出反应。这时如盲目跟随RSI指标建仓,可能获利有限或增加亏损。

另外,策略给出的是probabilistic的交易信号。即使RSI低于40,也不意味着就100%存在反弹机会。建仓后价格再创新低的概率也是存在的。这时需要设置好止损策略,控制最大亏损。

## 优化方向

该策略可以在以下几个方面进行优化:

1. 结合多个股票,进行组合交易。单一股票容易受特定事件影响,而组合可以分散个股风险。

2. 加入止损策略,进一步控制风险。如加入跟踪止损,在价格继续下跌时停损exit。

3. 优化建仓策略,如在超卖区间使用时间加权平均价逐步建仓,而不是全仓建立。

4. 结合其他指标过滤信号,如量能指标、移动平均线等,避免盲目跟随RSI。

## 总结

本策略通过构建RSI指标判断超买超卖区间,在超卖区间逐步建立多头仓位,并设置最后平仓时间,实现长线持有。相比短线交易,该策略更适合作为长线量化投资工具。其优势在于低价捕捉和成本控制,而风险在于指标滞后性和信号误导。未来可通过组合优化、止损策略、建仓优化等多种方式进行改进。

||

## Overview

This strategy is called "Relative Strength Index Long-term Quant Strategy", abbreviated as RSI Long-term Strategy. By calculating the moving average of the rise and fall ranges within a certain period, the RSI technical indicator is constructed and overbought and oversold lines are set to judge the timing of the market. When the RSI is lower than the set oversold line, long positions are gradually built in the long-term hold.

## Strategy Principle 

The core indicator of this strategy is Relative Strength Index (RSI). The RSI indicator compares the average increase and decrease over a period of time to determine whether the current security price is overestimated or underestimated. Its calculation formula is:

RSI = 100 - 100 / (1 + UP / DOWN)

Where UP is the average amplitude of the closing price rise in the last n days; DOWN is the average amplitude of the closing price decline in the last n days. The index oscillates between 0-100 intervals. Above 70 is the overbought zone and below 30 is the oversold zone.

This strategy sets RSI parameter Length=14 to calculate RSI based on 14-day closing prices. And set the oversold line Rsvalue=40, that is, RSI below 40 is determined to be oversold. When the RSI of the day is below 40, the buy window is opened, and positions are gradually built in the oversold area, and the final closing time is set to sell out after exceeding the closing time.

## Advantage Analysis

The biggest advantage of this strategy is that by using the RSI indicator to determine the timing of the market, the capture of low prices is realized. When the RSI is below 40, it is an oversold state, which means that the previous decline was too large and there is a chance of a rebound. At this time, gradually build a position to obtain a better cost. When the RSI is above 70, it is in an overbought state, which means that the market may have peaked and positions could be reduced. 

In addition, the strategy adopts a gradual position building approach to reduce the risk of a single entry. The construction window serves as the high point of the position, and the final closing time serves as the low point of the position to achieve long-term investment.

## Risk Analysis  

This strategy mainly relies on the RSI technical indicator, which has some lag. Especially when the market changes suddenly, the RSI may not be able to react in time. At this time, blindly following the RSI indicator to build a position may result in limited profits or increased losses. 

In addition, the strategy provides probabilistic trading signals. Even if the RSI is below 40, it does not mean that there is 100% chance of a rebound. The probability that the price will hit a new low after building a position also exists. At this point, a good stop loss strategy is needed to control maximum losses.

## Optimization Directions

The strategy can be optimized in the following areas:

1. Combine multiple stocks for portfolio trading. Single stocks are more easily affected by specific events, while portfolios can diversify individual stock risks.

2. Add a stop loss strategy to further control risks. For example, add a trailing stop loss to stop loss exit when prices continue to fall.

3. Optimize the position building strategy. For example, use time-weighted average price for gradual position building in the over-interval, rather than full position establishment.  

4. Combine with other indicators to filter signals, such as momentum indicators, moving averages, etc., to avoid blindly following the RSI.

## Summary  

This strategy determines the overbought and oversold areas by constructing the RSI indicator, gradually establishes long positions in the oversold area, and sets the final closing time to achieve long-term holding. Compared with short-term trading, this strategy is more suitable as a long-term quantitative investment tool. Its advantages lie in capturing low prices and controlling costs, while the risks lie in indicator lag and signal misguidance. In the future, it can be improved in many ways such as portfolio optimization, stop loss strategies, position building optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|40|RSvalue|
|v_input_4|true|From Month|
|v_input_5|true|From Day|
|v_input_6|2015|From Year|
|v_input_7|3|To Month|
|v_input_8|true|To Day|
|v_input_9|2022|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-28 00:00:00
end: 2024-02-04 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Relative Strength Index", shorttitle="RSI")
len = input(14, minval=1, title="Length")
src = input(close, "Source", type = input.source)
up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
plot(rsi, "RSI", color=#8E1599)
band1 = hline(70, "Upper Band", color=#C0C0C0)
band0 = hline(30, "Lower Band", color=#C0C0C0)
fill(band1, band0, color=#9915FF, title="Background")
Rsvalue = input(defval = 40, title = "RSvalue", minval = 20, maxval = 75)


FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2015, title = "From Year", minval = 999)
ToMonth   = input(defval = 3, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 2022, title = "To Year", minval = 999)
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)
booking   = timestamp(ToYear, ToMonth, ToDay, 23, 59)

window()  => time >= start and time <= finish ? true : false
endtrade() => time >= booking ? true : false


longCondition = rsi< Rsvalue

if (longCondition)
    strategy.entry("BUY", strategy.long)
    strategy.close("BUY")



```

> Detail

https://www.fmz.com/strategy/441074

> Last Modified

2024-02-05 13:51:01
