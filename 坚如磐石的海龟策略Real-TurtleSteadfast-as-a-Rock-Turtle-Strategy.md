
> Name

坚如磐石的海龟策略Real-TurtleSteadfast-as-a-Rock-Turtle-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17395aa63e37b6c45b6.png)
[trans]
## 概述

坚如磐石的海龟策略是一个追随布雷迪海龟交易法则的量化交易策略。它采用价格突破入场,止损追踪止损出场的方式,根据真实波幅计算头寸规模,严格控制单笔损失。该策略长期运作稳定,抗跌回撤强,如同坚硬的磐石。

## 策略原理

### 入场规则

坚如磐石的海龟策略在突破入场。具体来说,它会根据输入的突破周期参数,分别计算一定周期内的最高价和最低价。当价格突破最高价时,做多入场;当价格突破最低价时,做空入场。

举例来说,如果入场周期参数设为20根K线,那么策略会提取最近20根K线的最高价和最低价。如果当前K线的收盘价高于过去20根K线的最高价,则策略会在该收盘价位置发出做多停止单,等待突破最高价入场。

### 出场规则  

坚如磐石的海龟策略在止损追踪止损出场。它会根据输入的出场周期参数,动态计算一定周期内的最高价和最低价。这成为策略的退出通道。

当持有做多头寸时,如果价格跌破退出通道的最低价,则头寸止损退出。反之当持有做空头寸时,如果价格涨破退出通道的最高价,则头寸止损退出。

此外,策略还会根据真实波幅计算停损位,作为最后的止损线。只要价格不突破退出通道,停损位会一直追踪修正,确保止损距离恰到好处,既不会过于激进导致不必要的止损,也不会距离太远无法有效控制损失。

### 头寸规模

坚如磐石的海龟策略会根据真实波幅计算单笔头寸规模。具体来说,它会首先测算入场价格附近的潜在损失百分比,然后根据期望风险参数反推出头寸规模。这样可以有效控制每笔交易的最大损失。

## 优势分析

### 稳定运作

坚如磐石的海龟策略遵循布雷迪海龟交易法则,严格执行入场规则和出场规则,不随意变通。这使得策略可以长期稳定运转,不会因为临时性判断错误导致系统失灵。

### 抗跌回撤  

策略采用价格突破入场方式,可以有效避开高位Fault入场的风险,从而减少系统性亏损的可能。同时采用止损追踪止损方式确保单笔损失控制,最大程度抑制连续亏损导致的跌回撤出现。

### 风险可控

策略通过真实波幅计算头寸,严格控制每笔交易最大损失在容许范围内,避免单笔大额亏损导致的风险外溢。同时采用止损追踪方式确保止损距离得当,可以及时止损,有效控制风险。

## 风险分析

### 突破失效风险  

如果行情不带量的震荡突破,容易形成虚假信号导致系统错误入场亏损。这时需要调整参数,增加入场确认条件,避免无效突破的噪音干扰。

### 参数优化风险  

策略的参数如入场周期、出场周期等都是静态设置的。如果市场环境发生较大变化,这些参数设置可能会失效。这时需要重新评估参数设定,优化参数以适应新的市场状态。 

### 技术指标失效风险

策略中使用了价格突破判断 flags 等技术指标。当市场趋势和波动模式发生重大变化时,这些技术指标可能会失效。这时需要引入更多技术指标判断,整体优化策略的可靠性。

## 优化方向  

### 增加趋势判断

可以在策略中加上常用的趋势判断指标,如 MA,MACD 等。做多时判断上涨趋势,做空时判断下跌趋势,可以减少反向操作亏损。

### 多时间框架判断

可以引入高一级时间框架的技术指标,进行综合判断。例如 86400 级别的 MA 线位置可以判断总体走势方向,进一步确认分时图上的操作信号。

### 动态参数优化

可以通过机器学习等手段,根据历史数据自动优化参数,实时调整参数以适应市场环境变化。这可以使策略更具适应性和稳定性。

## 总结

坚如磐石的海龟策略遵循经典的海龟交易法则,以价格突破入场和止损追踪止损出场,严格控制风险,可以长期稳定运作并具有出色的抗跌回撤能力。虽然仍需要提防一些突破失效、参数失效等风险,但通过引入趋势判断、时间框架判断、动态参数优化等手段可以有效降低这些风险,大幅提高策略的稳定运作能力。总体而言,该策略具有非常出色的稳定性与抗跌回撤能力,值得信赖与持有。

||

## Overview

Steadfast as a Rock Turtle strategy is a quantitative trading strategy that follows the rules of the Brady turtle trading methodology. It uses price breakout to enter positions and stops tracking stops for exit. It calculates position sizing based on true volatility and strictly controls losses per trade. The strategy has long-term stability in operation and strong tolerance for drawdowns, much like steadfast rocks.

## Principle 

### Entry Rule

Steadfast as a Rock Turtle strategy enters on breakouts. Specifically, it calculates the highest high and lowest low over the specified lookback period. When price breaks above highest high, it goes long. When price breaks below lowest low, it goes short. 

For example, with an entry period set to 20 bars, the strategy extracts the highest high and lowest low over the past 20 bars. If the close of the current bar exceeds the highest high of past 20 bars, the strategy would place a long stop order at that close price to prepare for breakout above the highest high.

### Exit Rule

Steadfast as a Rock Turtle strategy exits with stops tracking stops. It dynamically calculates highest high and lowest low over the specified exit period and uses them to determine the exit channel.

If holding long, once price drops below the lowest low of exit channel, the position would stop out. Vice versa for short position.

Additionally, the strategy calculates a stop-loss level based on true volatility, which serves as the final stop. As long as price remains above exit channel, the stop-loss will keep tracking and adjusting, making sure the stops are set at appropriate distances—not too tight for unnecessary stopouts, not too loose for risk control.

### Position Sizing

Steadfast as a Rock Turtle strategy sizes its positions based on true volatility. Specifically, it first estimates the potential loss percentage near entry price, then reverse calculates position size from expected risk parameter. This effectively controls the max loss per trade.

## Advantage Analysis

### Steady Operation  

Steadfast as a Rock Turtle strategy adheres strictly to classic turtle trading rules on entries and exits without arbitrary modifications. This allows the strategy to run steadily for the long haul without system failure due to temporary poor judgement.

### Drawdown Resilience

By entering on breakouts, the strategy avoids overvalued entries effectively, reducing the probability of system losses. And by exiting with stops tracking stops, it ensures max loss per trade is controlled to largely prevent consecutive losses leading to deep drawdowns.  

### Risk Containability  

By sizing based on true volatility, the strategy strictly controls the max loss per trade within tolerance. And by tracking stop distances, it can cut losses in time to effectively contain risks.

## Risk Analysis

### Breakdown Failure Risk

If price breaks out with low momentum, it may turn out to be false signal causing wrong entry losses. Parameters would need adjustment with more entry confirmation rules to avoid ineffective breakout noise.  

### Parameter Optimization Risk

Static strategy parameters like entry/exit periods could become invalid if market regime changes drastically. These parameters would need reevaluation and re-optimization to adapt.

### Technical Indicator Failure Risk

Indicators used like price breakout flags could fail when trend or volatility changes significantly. More techniques would need integration to improve strategy reliability.

## Optimization Directions 

### Add Trend Filter  

Common trend indicators like MA, MACD can be added. Go long only in uptrend and short only in downtrend to avoid countertrend whipsaws.

### Timeframe Synthesis  

Higher timeframe indicators, e.g. Daily MA levels, can help confirm overall direction to supplement lower timeframe signals.

### Dynamic Parameter Tuning      

Machine learning can auto update strategy parameters continually based on latest data to maintain efficacy in changing market dynamics.

## Summary
Steadfast as a Rock Turtle strategy follows the classic turtle trading methodology strictly—breakout entry and tracking stop exit with stringent risk control. This allows long-term steady operations with strong drawdown resilience. Despite risks like false breakout, parameter failure etc, these can be effectively mitigated via additions like trend filter, timeframe synthesis, dynamic tuning etc to significantly improve strategy stability. Overall an excellently robust strategy well worth trusting and holding.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2016|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2030|Backtest Stop Year|
|v_input_5|12|Backtest Stop Month|
|v_input_6|30|Backtest Stop Day|
|v_input_7|false|Color Background?|
|v_input_8|20|Entry Channel Length|
|v_input_9|10|Exit Channel Length|
|v_input_10|13|True Range Length|
|v_input_11|false|Use whole position on every trade|
|v_input_12|2|Use Desired Risk %|
|v_input_13|2|Desired multiple of ema Tr (N)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-18 00:00:00
end: 2024-02-17 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Real Turtle", shorttitle = "Real Turtle", overlay=true, pyramiding=1, default_qty_type= strategy.percent_of_equity,calc_on_order_fills=false, slippage=25,commission_type=strategy.commission.percent,commission_value=0.075)
//////////////////////////////////////////////////////////////////////
// Testing Start dates
testStartYear = input(2016, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)
//Stop date if you want to use a specific range of dates
testStopYear = input(2030, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(30, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

// A switch to control background coloring of the test period
// Use if using a specific date range
testPeriodBackground = input(title="Color Background?", type=bool, defval=false)
testPeriodBackgroundColor = testPeriodBackground and (time >= testPeriodStart) and (time <= testPeriodStop) ? #00FF00 : na
bgcolor(testPeriodBackgroundColor, transp=97)

testPeriod() => true
// Component Code Stop
//////////////////////////////////////////////////////////////////////

//How many candles we want to determine our position entry
enterTrade = input(20, minval=1, title="Entry Channel Length")
//How many candles we want ot determine our position exit
exitTrade = input(10, minval=1, title="Exit Channel Length")

//True Range EMA Length
trLength = input(13, minval=1, title="True Range Length")
//Go all in on every trade
allIn = input(false, title="Use whole position on every trade")
dRisk = input(2, "Use Desired Risk %")
//How much of emaTR to use for TS offset
multiEmaTR = input(2, "Desired multiple of ema Tr (N)")
//absolute value (highest high of of this many candles - lowest high of this many candles) . This is used if we want to change our timeframe to a higher timeframe otherwise just works like grabbing high o r low of a candle
//True range is calculated as just high - low. Technically this should be a little more complicated but with 24/7 nature of crypto markets high-low is fine.
trueRange = max(high - low, max(high - close[1], close[1] - low))
//Creates an EMA of the true range by our custom length
emaTR = ema(trueRange, trLength)
//Highest high of how many candles back we want to look as specified in entry channel for long
longEntry = highest(enterTrade)
//loweest low of how many candles back we want to look as specified in exit channel for long
exitLong = lowest(exitTrade)
//lowest low of how many candles back want to look as specified in entry channel for short
shortEntry = lowest(enterTrade)
//lowest low of how many candles back want to look as specified in exit channel for short
exitShort = highest(exitTrade)
//plots the longEntry as a green line
plot(longEntry[1], title="Long Entry",color=green)
//plots the short entry as a purple line
plot(shortEntry[1], title="Short Entry",color=purple)

howFar = barssince(strategy.position_size == 0)
actualLExit = strategy.position_size > 0 ? strategy.position_avg_price - (emaTR[howFar] * multiEmaTR) : longEntry - (emaTR * multiEmaTR)
actualLExit2 = actualLExit > exitLong ? actualLExit : exitLong
actualSExit = strategy.position_size < 0 ? strategy.position_avg_price + (emaTR[howFar] * multiEmaTR) : shortEntry + (emaTR * multiEmaTR)
actualSExit2 = actualSExit < exitShort ? actualSExit : exitShort

//plots the long exit as a red line
plot(actualLExit2[1], title="Long Exit",color=red)
//plots the short exit as a blue line
plot(actualSExit2[1], title="Short Exit",color=yellow)


//Stop loss in ticks
SLLong =(emaTR * multiEmaTR)/ syminfo.mintick
SLShort = (emaTR * multiEmaTR)/ syminfo.mintick


//Calculate our potential loss as a whole percentage number. Example 1 instead of 0.01 for 1% loss. We have to convert back from ticks to whole value, then divided by close
PLLong = ((SLLong * syminfo.mintick) * 100) / longEntry
PLShort = ((SLShort * syminfo.mintick) * 100) / shortEntry
//Calculate our risk by taking our desired risk / potential loss. Then multiple by our equity to get position size. we divide by close because we are using percentage size of equity for quantity in this script as not actual size.
//we then floor the value. which is just to say we round down so instead of say 201.54 we would just input 201 as TV only supports whole integers for quantity.
qtyLong = floor(((dRisk / PLLong) * strategy.equity) /longEntry )
qtyShort = floor(((dRisk / PLShort) * strategy.equity) /shortEntry )
qtyLong2 = allIn ? 100 : qtyLong
qtyShort2 = allIn ? 100 : qtyShort
//Only open long or short positions if we are inside the test period specified earlier
if testPeriod()
    //Open a stop market order at our long entry price and keep it there at the quantity specified. This order is updated/changed on each new candlestick until a position is opened
    strategy.entry("long", strategy.long, stop = longEntry, qty = qtyLong2) 
    //sets up or stop loss order by price specified in our actualLExit2 variable
    strategy.exit("Stoploss-Long", "long", stop=actualLExit2)
    
     //Open a stop market order at our short entry price and keep it there at the quantity specified. This order is updated/changed on each new candlestick until a position is opened
    strategy.entry("short", strategy.short, stop = shortEntry, qty = qtyShort2)
    //sets up or stop loss order by price specified in our actualLExit2 variable
    strategy.exit("Stoploss-Short", "short", stop=actualSExit2)


```

> Detail

https://www.fmz.com/strategy/441990

> Last Modified

2024-02-18 14:34:40
