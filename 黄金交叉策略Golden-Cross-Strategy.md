
> Name

黄金交叉策略Golden-Cross-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

黄金交叉策略是一种简单的市场指标,可以帮助长期投资者确定入场时机。该策略基于短期和长期移动平均线的交叉来产生交易信号。当短期移动平均线上穿长期移动平均线时,形成黄金交叉,表示市场进入牛市,可以做多;当短期移动平均线下穿长期移动平均线时,形成死亡交叉,表示市场进入熊市,应平仓。

## 策略原理

该策略使用sma函数计算短期和长期的简单移动平均线。短期移动平均线长度设置为50天,长期移动平均线长度设置为200天。策略通过crossover和crossunder函数判断短期线是否上穿或下穿长期线,以产生交易信号。

当短期线上穿长期线时,表明市场趋势由下跌转为上涨,产生黄金交叉,这是做多的信号。策略会通过strategy.entry函数开仓做多。当短期线下穿长期线时,表明市场趋势由上涨转为下跌,形成死亡交叉,这是平仓的信号。策略会通过strategy.close_all函数平掉所有头寸。

通过抓住市场趋势转折点的黄金/死亡交叉来确定入场时机和平仓时机,可以有效过滤市场 noise,是一个简单实用的趋势跟踪策略。

## 优势分析

- 该策略容易理解和实现,适合初学者学习;
- 使用移动平均线可以有效滤波市场噪音,捕捉市场趋势;  
- 黄金交叉是公认的强力的涨市信号,可以有效抓住涨势;
- 死亡交叉是较强的跌市信号,可以减少亏损;
- 参数优化空间大,可以通过调整移动平均线长度来适应不同市场;
- 可视化的交叉信号,直观易读。

## 风险分析

- 移动平均线存在滞后,可能错过趋势反转的最佳时机;
- 简单的均线交叉并不能完全避免假信号;
- 未考虑突发事件的影响,如重大利空新闻;  
- 没有止损机制,无法有效控制单笔损失;
- 买入死叉时有亏损风险,平仓黄金交叉时有错过利润风险。

可以设置止损来控制风险,优化移动平均线参数来减少假信号,结合其他指标来确认信号可靠性,开发突发事件处理机制来应对重大新闻。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 优化移动平均线参数,调整短期和长期均线的长度,使其更好地匹配不同市场的特点;

2. 增加成交量的条件判断,只在成交量放大的情况下才产生信号;

3. 结合其它指标,如MACD、RSI等来确认黄金/死亡交叉信号,避免假信号;

4. 增加止损策略,如跟踪止损、比例止损等,控制单笔亏损;

5. 增加仓位管理策略,如固定仓位、指数增仓等,控制整体风险;

6. 优化入场时机,当交叉发生后再观察一段时间,过滤假交叉。

通过以上优化,可以使策略参数更符合市场统计特性,过滤假信号,控制风险,在保持简单的同时,进一步提高策略的稳定性和盈利能力。

## 总结

黄金交叉策略是一个既简单又实用的趋势跟踪策略。它直观地通过移动平均线交叉来捕捉市场趋势,可以有效为长线投资者识别入场和退出的时机。该策略容易实现,适合初学者学习,也可以进行多方面的拓展与优化,使其成为一个灵活可靠的量化交易策略。总体来说,黄金交叉策略结合简洁性和实用性,是量化交易体系中很有价值的一员。

||


## Overview

The Golden Cross strategy is a simple market indicator that helps long-term investors determine entry timing. The strategy generates trading signals based on the crossovers of short-term and long-term moving averages. When the short-term moving average crosses above the long-term moving average, forming a Golden Cross, it signals that the market is entering a bull trend and long positions can be opened. When the short-term moving average crosses below the long-term moving average, forming a Death Cross, it signals that the market is entering a bear trend and existing positions should be closed.

## Strategy Logic

This strategy uses the sma function to compute short-term and long-term simple moving averages. The short-term MA length is set to 50 days and the long-term MA length is set to 200 days. The strategy determines if the short-term MA crosses over or crosses under the long-term MA using the crossover and crossunder functions, which generates trade signals. 

When the short-term MA crosses above the long-term MA, it signals the trend is changing from downward to upward, forming a Golden Cross, which is the long entry signal. The strategy will open a long position using strategy.entry. When the short-term MA crosses below the long-term MA, it signals the trend is changing from upward to downward, forming a Death Cross, which is the exit signal. The strategy will close all positions using strategy.close_all.

By capturing trend reversal points marked by Golden/Death Crosses to determine entry and exit timing, the strategy can effectively filter out market noise and is a simple and practical trend following strategy.

## Advantage Analysis

- The strategy is easy to understand and implement, suitable for beginners;
- Moving averages help filter market noise and capture trends;
- Golden Crosses are recognized powerful bull signals to catch uptrends; 
- Death Crosses are relatively strong bear signals to reduce losses;
- The parameters are highly optimizable by adjusting MA lengths for different markets; 
- Visual crossover signals are intuitive and readable.

## Risk Analysis

- MAs have lag and may miss best timing for trend reversals;
- Simple MA crosses cannot fully avoid false signals;
- Black swan events like major negative news are not considered;
- No stop loss to effectively limit single loss;
- Buy on Death Cross risks losses, exit on Golden Cross risks missing profits.

Risks can be managed by adding stop loss, optimizing MA parameters to reduce false signals, combining with other indicators to confirm signals, and developing mechanisms to handle black swan events.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize MA parameters by adjusting short and long term MA lengths to better fit different market characteristics;

2. Add volume condition to trigger signals only when volume surges;

3. Incorporate other indicators like MACD, RSI to confirm crossover signals and avoid false signals;

4. Add stop loss strategies like trailing stop loss, percentage stop loss to control single loss;

5. Add position sizing strategies like fixed fraction, exponential sizing to control overall risk;

6. Optimize entry by observing for some time after crossover to filter fake crosses.

Through the above optimizations, the strategy parameters can better match market statistical properties, filter false signals, control risks, and further improve the stability and profitability of the strategy while maintaining simplicity.

## Conclusion

The Golden Cross strategy is a simple yet practical trend following strategy. It intuitively captures market trends through moving average crosses and can effectively identify entry and exit points for long-term investors. Easy to implement, suitable for beginners to learn, and adaptable to various optimizations, the strategy can become a flexible and reliable trading system. Overall, combining simplicity and practicality, the Golden Cross strategy is a valuable addition to the quantitative trading toolkit.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|short length|
|v_input_2|200|long length|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|2009|Backtest Start Year|
|v_input_5|true|Backtest Start Month|
|v_input_6|true|Backtest Start Day|
|v_input_7|2019|Backtest Stop Year|
|v_input_8|true|Backtest Stop Month|
|v_input_9|true|Backtest Stop Day|
|v_input_10|true|Color Background?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-27 00:00:00
end: 2023-09-26 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Dumb strategy 2 - Golden Cross", shorttitle="Golden Cross", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

lShort = input(50, title="short length")
lLong = input(200, title="long length")
src = input(close, title="Source")

smaShort = sma(src, lShort)
smaLong = sma(src, lLong)

plot(smaShort, title="SMA Short", style=line, linewidth=3, color=lime)
plot(smaLong, title="SMA Long", style=line, linewidth=3, color=red)


//
//Backtest Time Inputs
//

testStartYear = input(2009, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2019, "Backtest Stop Year")
testStopMonth = input(1, "Backtest Stop Month")
testStopDay = input(01, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

testPeriodBackground = input(title="Color Background?", type=bool, defval=true)
testPeriodBackgroundColor = testPeriodBackground and (time >= testPeriodStart) and (time <= testPeriodStop) ? blue : na
bgcolor(testPeriodBackgroundColor, transp=80)


testPeriod() => true

	

if testPeriod()
	longCondition = crossover(smaShort, smaLong)
	if (longCondition)
		strategy.entry("Long Entry", strategy.long)

	shortCondition = crossunder(smaShort, smaLong)
	if (shortCondition)
		strategy.close_all(true)
	
```

> Detail

https://www.fmz.com/strategy/427987

> Last Modified

2023-09-27 16:23:51
