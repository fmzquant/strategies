
> Name

大涨大跌策略Big-Surge-Big-Fall-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1204bdebcff1f60dfad.png)

[trans]
## 概述

大涨大跌策略是一种通过检测巨额阳线阴线来进行入场的策略。当检测到一个巨量的阳线时做空,检测到一个巨量的阴线时做多。止损位于触发信号的柱线低点(做多则反之),止盈为止损的1倍。用户可以定义阳线阴线的最小体积,以及相对于之前某段时间的平均柱体积的倍数。

## 策略原理

该策略的核心逻辑是:

1. 计算当前K线的总波动范围(高点-低点)和实体的大小(收盘价比开盘价大则为正,反之为负)

2. 计算过去N根K线内波动幅度的平均值

3. 判断当前K线是否满足:波动范围>=平均波动幅度x倍数 且 实体大小>=波动范围x最小实体系数

4. 满足上述条件即触发信号:阳线做空,阴线做多

5. 可选择是否开启止损止盈:止损为信号柱低点加上止损系数倍的波动幅度;止盈为止损的1倍

在实体判断上过滤了线段,确保有足够的力量;通过动态计算平均波动幅度,避免固定阈值无法适应市场变化;止损止盈设置合理回撤率,可通过系数调整。

## 策略优势

该策略最大的优势在于捕捉了高质量的趋势反转信号,这主要基于两个判断:

1. 巨量阳线阴线表示该趋势前期已经表现强劲,所以大概率是整个趋势的结构性转折点

2. 通过动态计算平均波动幅度,确保捕捉到超出正常水平的异常波动,从而过滤普通回调行情

此外,止损止盈设置也非常合理,可以有效控制单笔止损,同时止盈回报率为1,不会过于追涨杀跌。

总体来说,该策略成功定位了高质量结构性转折点,实现高效率操作。这对于趋势跟踪交易者非常适合,可以避免在中间过程被套住。

## 策略风险

该策略的主要风险来自两个方面:

1. 大涨大跌可能是止损猝发,从而形成了无效信号

2. 止损设置过于宽松,无法有效控制损失

针对第一个风险,可以通过增加最小波动幅度和实体大小来过滤误判率,但是也会错过一些机会。需要根据回测结果找到平衡点。

第二个风险可以通过调整止损系数来优化,使止损更接近支持位,但不能过于紧密。同时也要考虑加大止盈回报率,以补偿止损带来的损失。

## 策略优化方向

该策略还有以下几点可以进一步优化:

1. 增加对趋势方向的判断,避免逆势操作

2. 优化参数设置,找到最佳的参数组合

3. 增加成交量的过滤,确保大阳线大阴线成交量足够高

4. 考虑加入更多过滤条件,例如平台,布林带等,减少误判概率

5. 测试不同品种参数效果,进行参数优化

6. 增加止损追踪,让止损可以根据价位走势进行动态调整

7. 考虑加入重新入场机会,即在首次止损后再次入场

通过以上几点优化,可以使该策略更具有效性,从而真正提高盈利概率。需要充分回测和优化找到最佳参数。

## 总结

大涨大跌策略通过捕捉巨量阳线阴线来实现高效盈利,具有止损止盈设置。它成功定位了高质量的结构性反转机会,可以为趋势交易者提供非常有价值的信息。通过参数优化和规则优化,该策略可以成为一个非常实用的辅助决策工具。它简单的交易逻辑和直接的经济含义,也让它容易被人理解和掌握。总体来说,该策略为我们提供了一个非常好的策略框架,值得深入研究和应用。

||


## Overview

The Big Surge Big Fall strategy detects huge bullish and bearish candlesticks to enter positions. It goes short when detecting a huge bullish candlestick and goes long when detecting a huge bearish candlestick. The stop loss is placed below the low of the signal candlestick (vice versa for long), and take profit is set at 1 times the stop loss. Users can define the minimum size of bullish/bearish candlesticks, and the multiple of average bar range over certain periods. 

## Strategy Logic

The core logic of this strategy is:

1. Calculate the current candlestick range (high - low) and candlestick body size (positive if close > open, negative if close < open)

2. Calculate the average range over the past N candlesticks

3. Check if the current candlestick satisfies: range >= average range x multiple AND body size >= range x min body size coefficient 

4. If above conditions are met, a signal is triggered: go short on bullish candlestick, go long on bearish candlestick

5. Option to enable stop loss and take profit: Stop loss at low plus stop loss coefficient x range; Take profit at 1 x stop loss

The body size filter excludes doji. The dynamic average range adapts to market changes. The stop loss and take profit allows reasonable drawdown control.

## Advantages

The biggest advantage of this strategy is catching high quality trend reversal signals, based on two judgments:

1. The huge bullish/bearish candlestick likely indicates a trend is exhausted after extended move

2. The abnormally large range exceeding dynamic average confirms significance 

In addition, the stop loss and take profit settings are sensible, allowing effective loss control while not chasing.

Overall, this strategy succeeds in identifying high quality structural turning points, enabling efficient execution. It suits trend followers by avoiding getting caught in corrections.

## Risks

The main risks come from two aspects:

1. Huge bars could be stop loss hunting, creating false signals

2. Stop loss may be too wide to effectively control loss

For the first risk, adding minimum size filters can reduce false signals but also miss opportunities. Backtests are needed to optimize parameters. 

For the second risk, adjusting stop loss coefficient can optimize stops near supports without being too tight. Also consider increasing take profit ratio to compensate loss from stops.

## Enhancement Opportunities 

There are several ways this strategy can be further improved:

1. Add trend direction filter to avoid counter-trend trades

2. Optimize parameters through backtesting to find best combination

3. Add volume filter to ensure high volume on huge candlesticks 

4. Consider additional filters like moving average, Bollinger Bands to reduce false signals

5. Test parameters across different products for optimization

6. Add trailing stop loss for dynamic adjustment based on price action

7. Consider re-entry opportunities after initial stop loss

With the above enhancements, this strategy can become much more effective and improve probability of profit. Extensive backtesting and optimization is needed to find optimum parameters.

## Conclusion

The Big Surge Big Fall strategy profits from huge candlesticks reversals with stop loss and take profit management. It successfully identifies high quality structural turning points, providing valuable information for trend traders. With parameter and logic optimization, this strategy can become a practical decision tool. Its simple logic and intuitive economics also makes it easy to understand and apply. Overall, this strategy provides a solid framework worth researching and implementing.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Direction (Long=1, Both=0, Short=-1 |
|v_input_2|true|SL Mult|
|v_input_3|true|TP Mult|
|v_input_4|0.5|Bar Body Size|
|v_input_5|10|period|
|v_input_6|2|Big Size Avg Mult to determine Big Bar|
|v_input_7|false|Reverse Trades|
|v_input_8|false|Use SL / TP|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-06 00:00:00
end: 2023-11-05 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © tweakerID

// This strategy detects and uses big bars to enter a position. When the Big Bar 
// is bearish (red candle) the position will be long and viceversa
// for short positions. The stop loss (optional) is placed on the low of the 
// candle used to trigger the position and user inputs allow you to modify the
// size of the SL. Take profit is placed on a reward ratio of 1. User can also modify 
// the size of the bar body used to determine if we have a real Big Bar and
// filter out Doji bars. Big Bars are determined relative to the previous X period size, 
// which can also be modified, as well as the required size of the Big Bar relative to this period average.

//@version=4
strategy("Big Bar Strategy", overlay=false)

direction = input(0, title = "Direction (Long=1, Both=0, Short=-1 ", type=input.integer, minval=-1, maxval=1)
strategy.risk.allow_entry_in(direction == 0 ? strategy.direction.all : (direction < 0 ? strategy.direction.short : strategy.direction.long))

//Inputs
barsizemult=input(1, step=.1, title="SL Mult")
TPbarsizemult=input(1, step=.1, title="TP Mult")
barsizeThreshold=input(.5, step=.1, minval=.5, maxval=.9, title="Bar Body Size")
period=input(10)
mult=input(2, step=.2, title="Big Size Avg Mult to determine Big Bar")
i_reverse=input(false, title="Reverse Trades")
SLon=input(false, title="Use SL / TP")

//Calculations
barsize=high-low
barbodysize=close>open?(open-close)*-1:(open-close)
barsizeavg=sum(barsize, period)/period
bigbar=barsize >= barsizeavg*mult and barbodysize>barsize*barsizeThreshold

//Entry Logic
longCondition = close < open and bigbar //and strategy.position_size==0
shortCondition = close > open and bigbar //and strategy.position_size==0

//SL & TP Calculations
longTP=strategy.position_avg_price + (valuewhen(longCondition,barsize,0)*TPbarsizemult)
longSL=strategy.position_avg_price - (valuewhen(longCondition,barsize,0)*barsizemult)
shortTP=strategy.position_avg_price - (valuewhen(shortCondition,barsize,0)*TPbarsizemult)
shortSL=strategy.position_avg_price + (valuewhen(shortCondition,barsize,0)*barsizemult)
TP=strategy.position_size>0?longTP:shortTP
SL=strategy.position_size>0?longSL:shortSL

//Entries
if (longCondition)
    strategy.entry("long", long=not i_reverse?true:false)
    alert("Big Bar")
if (shortCondition)
    strategy.entry("short", long=not i_reverse?false:true)
    alert("Big Bar")
if SLon
    strategy.exit("SL & TP", "long", stop=SL, limit=TP)
    strategy.exit("SL & TP", "short", stop=SL, limit=TP)
    
// Plots
barcolor(bigbar ? color.white : na)
plot(barsizeavg, transp=100, title="Barsize Avg")
plot(barsize, transp=100, title="Bar Size")
plot(barbodysize, transp=100, title="Bar Body Size")
plot(SLon?TP:na, color=color.green, style=plot.style_cross, title="TP")
plot(SLon?SL:na, color=color.red, style=plot.style_cross, title="SL")
plotshape(longCondition ? 1 : na, style=shape.triangleup, location=location.belowbar, color=color.green, title="Bullish Setup")
plotshape(shortCondition ? 1 : na, style=shape.triangledown, location=location.abovebar, color=color.red, title="Bearish Setup")


```

> Detail

https://www.fmz.com/strategy/431267

> Last Modified

2023-11-06 15:48:22
