
> Name

RSI双向突破策略RSI-Reversal-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/109876c91a8941b015a.png)
[trans]

## 概述

该策略基于相对强弱指数(RSI)指标设计,利用RSI指标的超买超卖原理进行双向突破操作。当RSI指标上穿设定的超买线时做多,当RSI指标下穿设定的超卖线时做空,属于典型的反转交易策略。

## 策略原理

1. 根据用户输入设置计算RSI指标的参数,包括RSI周期长度、超买线阈值、超卖线阈值。

2. 根据RSI曲线相对于超买线和超卖线的位置关系,判断所处的超买区还是超卖区。

3. 当RSI指标从超卖区突破对应阈值线时,进行相反方向的开仓操作。例如从超买区突破超买线时,认为行情反转,此时开仓做多;从超卖区突破超卖线时,认为行情反转,此时开仓做空。

4. 开仓后,设置止损止盈线。跟踪止损止盈情况,满足条件时进行平仓。

5. 该策略还提供了利用EMA作为过滤器的可选功能。只有在RSI指标做多做空信号的同时,价格也要突破EMA才开仓。

6. 策略还提供了只在特定交易时段交易的功能。用户可以设置只在某个时间段交易,超过时间后平仓离场。

## 优势分析

- 利用RSI指标的经典突破原理,回测效果较好。
- 可灵活设置超买超卖阈值,调整适合不同品种。
- 可选择是否使用EMA过滤信号,避免因小范围震荡而频繁开平仓。
- 支持止损止盈功能,可以提高策略稳定性。
- 支持设置特定交易时段,避免不适宜的时间段交易。
- 支持做多做空双向交易,可以充分利用行情双向波动。

## 风险分析

- RSI指标容易出现背离,仅凭RSI指标判断可能产生交易信号不准。需要结合趋势、均线等判断。
- 超买超卖阈值设定不当可能导致过于频繁或错过交易机会。
- 止损止盈设置不当可能造成策略过于激进或保守。
- EMA过滤器设置不当也可能错过交易机会或过滤掉有效信号。

风险解决:

- 优化RSI参数,调整适合不同品种的参数。
- 结合趋势指标等判断背离情况,避免错误信号。  
- 测试和优化止损止盈参数,找到最佳参数。
- 测试和优化EMA参数,找到最佳过滤水平。

## 策略优化方向 

该策略可以从以下几个方面进行优化:

1. 优化RSI参数,寻找不同品种最佳参数组合。可以通过遍历回测找到最佳超买超卖阈值。

2. 尝试不同的指标替代或结合RSI,形成更强势的判断信号。例如MACD,KD,布林带等。

3. 优化止损止盈策略,提高策略稳定性。可以根据市场波动率设定游离止损,或者带有追踪止损功能的策略。

4. 优化EMA过滤器参数或试验其他指标过滤器,进一步避免被套。

5. 增加趋势判断模块,避免反向做空多头行情,或反向做多空头行情。

6. 测试不同的交易时段参数,判断哪些时段适合该策略,哪些时段应避免。

## 总结

该RSI双向突破策略整体思路清晰,利用经典的RSI超买超卖原理进行反转交易。既可以抓取超买超卖区的反转机会,又可通过EMA过滤和止损止盈来控制风险。通过参数优化和模块优化空间较大,可以将其打造成较为稳定可靠的反转策略。值得进一步测试优化后实际应用。

||


## Overview

This strategy is based on the Relative Strength Index (RSI) indicator and utilizes the overbought/oversold principles of RSI to make breakout trades. It goes long when RSI breaks above the overbought threshold and goes short when RSI breaks below the oversold threshold. It is a typical mean reversion trading strategy.

## Strategy Logic

1. Set RSI indicator parameters based on user input, including RSI period, overbought threshold and oversold threshold. 

2. Determine if RSI is in overbought or oversold zone based on its position relative to thresholds.

3. When RSI breaks out of overbought/oversold zone and crosses the corresponding threshold line, make trades in opposite direction. For example, when RSI breaks above overbought line from overbought zone, market is considered reversed, go long at this point. When RSI breaks below oversold line from oversold zone, market is considered reversed, go short here.

4. After entry, set stop loss and take profit lines. Track SL/TP and close positions when triggered.

5. The strategy also provides option to use EMA as filter. Only take trade signals when both RSI signal and price breakout against EMA direction are met. 

6. It also allows trading only within specific time frames. Positions will be closed at the end of time frame.

## Advantage Analysis

- Utilizes classic RSI breakout principles with good backtest results.

- Flexible overbought/oversold threshold settings suitable for different products.

- Optional EMA filter avoids excessive whipsaw trades.

- Supports SL/TP to enhance stability.

- Supports time frame filter to avoid unsuitable period.

- Supports both long and short for full utilization of two-way price swings.

## Risk Analysis

- RSI divergence happens frequently, solely relying on RSI may generate inaccurate signals. Need combination with trend, moving averages etc.

- Improper threshold settings lead to too frequent or missing trades.

- Bad SL/TP settings cause over-aggressiveness or over-conservativeness. 

- Improper EMA filter settings may miss valid trades or filter out good signals.

Risk Solutions:

- Optimize RSI parameters for different products.

- Combine with trend indicators to identify divergence. 

- Test and optimize SL/TP parameters.

- Test and optimize EMA parameters.

## Optimization Directions

The strategy can be improved in the following aspects:

1. Optimize RSI parameters to find best settings for different products via exhaustive backtest.

2. Try different indicators combined with or replacing RSI to generate more robust signals, e.g. MACD, KD, Bollinger Bands etc.

3. Optimize stop loss and take profit strategies to enhance stability. Adaptive stops or trailing stops can be used.

4. Optimize EMA filter parameters or experiment with other filters to better avoid whipsaws.

5. Add trend filter modules to avoid trading against primary trend.

6. Test different time frames to find best trading sessions for this strategy.

## Summary

The RSI reversal breakout strategy has clear logic based on classic overbought/oversold principles. It aims to capture mean reversion at extremes with proper risk control filters. There is good potential to turn it into a stable strategy via parameter tuning and modular enhancements. It is worthwhile to optimize and apply in live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(2021-10-01T00:00:00)|Backtesting Start Date|
|v_input_2|timestamp(9999-12-31T00:00:00)|Backtesting End Date|
|v_input_3|12|Length|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|70|overbought|
|v_input_6|30|oversold|
|v_input_7|true|Overbought Go Long & Oversold Go Short|
|v_input_8|false|Overbought Go Short & Oversold Go Long|
|v_input_9|true|No EMA Filter|
|v_input_10|false|Use EMA Filter|
|v_input_11|15|EMA Length|
|v_input_12_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_13||Time Frame To Enter Trades|
|v_input_14|false|Enable Close Trade At End Of Time Frame|
|v_input_15|false|Enable Stop Loss|
|v_input_16|false|Enable Take Profit|
|v_input_17|5|Stop Loss %|
|v_input_18|10|Take Profit %|
|v_input_19||Long Entry message|
|v_input_20||Short Entry message|
|v_input_21||Close Long message|
|v_input_22||Close Short message|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-08 00:00:00
end: 2023-11-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © REV0LUTI0N

//@version=4

strategy("RSI Strategy", overlay=true, initial_capital = 10000, default_qty_value = 10000, default_qty_type = strategy.cash)

// Strategy Backtesting
startDate  = input(timestamp("2021-10-01T00:00:00"), type = input.time, title='Backtesting Start Date')
finishDate = input(timestamp("9999-12-31T00:00:00"), type = input.time, title='Backtesting End Date')

time_cond  = true
// Strategy

Length = input(12, minval=1)
src = input(close, title="Source")
overbought = input(70, minval=1)
oversold = input(30, minval=1)
xRSI = rsi(src, Length)
    
rsinormal = input(true, title="Overbought Go Long & Oversold Go Short")
rsiflipped = input(false, title="Overbought Go Short & Oversold Go Long")

// EMA Filter
noemafilter = input(true, title="No EMA Filter")
useemafilter = input(false, title="Use EMA Filter")
ema_length = input(defval=15, minval=1, title="EMA Length")
emasrc = input(close, title="Source")
ema = ema(emasrc, ema_length)
plot(ema, "EMA", style=plot.style_linebr, color=#cad850, linewidth=2)

//Time Restriction Settings
startendtime = input("", title='Time Frame To Enter Trades')
enableclose = input(false, title='Enable Close Trade At End Of Time Frame')
timetobuy = (time(timeframe.period, startendtime))
timetoclose = na(time(timeframe.period, startendtime))

// Stop Loss & Take Profit % Based
enablesl = input(false, title='Enable Stop Loss')
enabletp = input(false, title='Enable Take Profit')
stopTick = input(5.0, title='Stop Loss %', type=input.float, step=0.1) / 100
takeTick = input(10.0, title='Take Profit %', type=input.float, step=0.1) / 100

longStop = strategy.position_avg_price * (1 - stopTick)
shortStop = strategy.position_avg_price * (1 + stopTick)
shortTake = strategy.position_avg_price * (1 - takeTick)
longTake = strategy.position_avg_price * (1 + takeTick)

plot(strategy.position_size > 0 and enablesl ? longStop : na, style=plot.style_linebr, color=color.red, linewidth=1, title="Long Fixed SL")
plot(strategy.position_size < 0 and enablesl ? shortStop : na, style=plot.style_linebr, color=color.red, linewidth=1, title="Short Fixed SL")
plot(strategy.position_size > 0 and enabletp ? longTake : na, style=plot.style_linebr, color=color.green, linewidth=1, title="Long Take Profit")
plot(strategy.position_size < 0 and enabletp ? shortTake : na, style=plot.style_linebr, color=color.green, linewidth=1, title="Short Take Profit")

// Alert messages
message_enterlong  = input("", title="Long Entry message")
message_entershort = input("", title="Short Entry message")
message_closelong = input("", title="Close Long message")
message_closeshort = input("", title="Close Short message")

// Strategy Execution
if (xRSI > overbought and close > ema and time_cond and timetobuy and rsinormal and useemafilter)
    strategy.entry("Long", strategy.long, alert_message = message_enterlong)
    
if (xRSI < oversold and close < ema and time_cond and timetobuy and rsinormal and useemafilter)
    strategy.entry("Short", strategy.short, alert_message = message_entershort)
    
if (xRSI < oversold and close > ema and time_cond and timetobuy and rsiflipped and useemafilter)
    strategy.entry("Long", strategy.long, alert_message = message_enterlong)
    
if (xRSI > overbought and close < ema and time_cond and timetobuy and rsiflipped and useemafilter)
    strategy.entry("Short", strategy.short, alert_message = message_entershort)
    
if (xRSI > overbought and time_cond and timetobuy and rsinormal and noemafilter)
    strategy.entry("Long", strategy.long, alert_message = message_enterlong)
    
if (xRSI < oversold and time_cond and timetobuy and rsinormal and noemafilter)
    strategy.entry("Short", strategy.short, alert_message = message_entershort)
    
if (xRSI < oversold and time_cond and timetobuy and rsiflipped and noemafilter)
    strategy.entry("Long", strategy.long, alert_message = message_enterlong)
    
if (xRSI > overbought and time_cond and timetobuy and rsiflipped and noemafilter)
    strategy.entry("Short", strategy.short, alert_message = message_entershort)
    
if strategy.position_size > 0 and timetoclose and enableclose
    strategy.close_all(alert_message = message_closelong)
if strategy.position_size < 0 and timetoclose and enableclose
    strategy.close_all(alert_message = message_closeshort)
    
if strategy.position_size > 0 and enablesl and time_cond
    strategy.exit(id="Close Long", stop=longStop, limit=longTake, alert_message = message_closelong)
if strategy.position_size < 0 and enablesl and time_cond
    strategy.exit(id="Close Short", stop=shortStop, limit=shortTake, alert_message = message_closeshort)
    
if strategy.position_size > 0 and enabletp and time_cond
    strategy.exit(id="Close Long", stop=longStop, limit=longTake, alert_message = message_closelong)
if strategy.position_size < 0 and enabletp and time_cond
    strategy.exit(id="Close Short", stop=shortStop, limit=shortTake, alert_message = message_closeshort)
    


```

> Detail

https://www.fmz.com/strategy/431498

> Last Modified

2023-11-08 12:11:03
