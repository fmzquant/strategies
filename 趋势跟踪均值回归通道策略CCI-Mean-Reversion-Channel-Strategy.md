
> Name

趋势跟踪均值回归通道策略CCI-Mean-Reversion-Channel-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17b782ec1a317b16fdb.png)

[trans]

### 概述

本策略基于CCI指标设计了一个灵活的跟踪趋势的自动交易系统。它可以根据CCI指标的0轴上穿或下穿发出交易信号,也可以通过自定义上下通道带及通道带交叉发出信号。策略可以设置固定止损、止盈比例,同时拥有时间段交易和每日固定时间段交易等多种功能。

### 策略原理

1. 利用CCI指标的0轴交叉来判断市场趋势,CCI上穿0轴为看涨信号,CCI下穿0轴为看跌信号。

2. 通过自定义CCI上下通道带,当CCI上穿上通道带为看涨信号,CCI下穿下通道带为看跌信号。通道带交叉为止损信号。

3. 可设置只在特定时间段交易,未交易时段平仓。可设置每日固定时间段交易。

4. 可设置固定止损、止盈比例。

5. 可自定义交易开平仓的Alert消息。

6. 策略完全自定义灵活,可调整CCI参数、通道带参数、止损止盈参数等优化策略。

### 优势分析

1. 使用CCI指标判断市场趋势,CCI对价格变化敏感,能快速捕捉市场转折点。

2. 自定义通道带可根据不同市场调整参数,通道带交叉止损可有效控制风险。 

3. 支持多种交易时间设置,可根据不同时间段调整策略参数,利用不同时间段的特征获得超额收益。

4. 支持固定止损止盈设置,可以预设盈亏比,有效控制个别交易的风险。

5. 完全可自定义参数,可以针对不同品种、市场行情进行策略优化,获得更好的效果。

### 风险分析

1. CCI指标对价格变化敏感,可能产生部分假信号,应结合较长周期指标进行验证。

2. 固定止损止盈比例无法根据市场变化进行调整,应适当保守设置比例。

3. 固定交易时间可能错过市场短线调整的机会,应适当选择有交易价值的时间段。

4. 需要频繁优化参数,如果优化不当可能导致过度交易或漏掉交易机会。

5. 需要与行业情况、宏观环境等多方面因素结合,单纯依靠参数优化无法完全规避风险。

### 优化方向

1. 结合长短周期指标进行验证,避免CCI产生假信号。

2. 利用ATR等指标设定动态止损止盈。

3. 测试不同时间段参数效果,选择交易高效时段。

4. 优化CCI参数、通道带参数,适应市场变化。

5. 考虑结合趋势、波动性、成交量等多因素进行综合判断。

6. 根据交易品种特点选择合适交易时间段。

7. 考虑加入机器学习算法,实现策略的自动优化。

### 总结

本策略整体来说是一个非常灵活和可定制的趋势跟踪交易系统。策略具有利用CCI判断趋势、自定义通道带控制风险、设置固定止盈止损、选择交易时间段等多项优势。同时也需要注意CCI易产生假信号、固定止盈止损比例无法动态调整等问题。未来可从优化参数、筛选交易信号、选择高效时间段等方面进行策略改进,并增加机器学习等算法引入智能化管理,使策略能够自动适应市场变化,从而获得更稳定的超额收益。

||


### Overview

This strategy is designed as a flexible trend following trading system based on the CCI indicator. It can generate trading signals based on CCI zero line crossovers or custom upper/lower band crosses. The strategy allows setting fixed stop loss and take profit ratios, trading in specific time frames, and more.

### Strategy Logic

1. Use CCI zero line crossovers to determine market trends. CCI crossing above zero is a bullish signal and crossing below is a bearish signal.

2. Set custom CCI upper and lower bands. CCI crossing above upper band is bullish and crossing below lower band is bearish. Band crossovers act as stops.

3. Option to only trade in specific time frames and close all positions outside those periods. Can also trade in fixed daily time frames.

4. Set fixed stop loss and take profit percentages. 

5. Customizable alert messages for entry and exit signals.

6. Highly customizable strategy with adjustable CCI parameters, bands, stops, etc.

### Advantage Analysis

1. CCI sensitive to price changes, good for catching trend reversals.

2. Custom bands can be adjusted for different markets. Band cross stops help control risk.

3. Support trading in different time frames with optimized parameters based on characteristics.

4. Fixed stop loss/take profit preset risk/reward ratios and limit risk.

5. Fully customizable parameters optimize strategy for different products and market conditions.

### Risk Analysis

1. CCI prone to false signals, should verify signals with longer timeframe indicators.

2. Fixed stop/take percentages cannot adapt to changing market conditions.

3. Trading in fixed time frames risks missing opportunities during range periods.

4. Frequent parameter optimizations may lead to over-trading or missing trades. 

5. Macro factors should be considered, optimization alone insufficient to eliminate risks.

### Optimization Directions

1. Add longer timeframe indicators to verify CCI signals. 

2. Incorporate dynamic stops/takes such as ATR.

3. Test parameters in different time frames and find high-efficiency periods.

4. Optimize CCI parameters and bands for changing markets.

5. Consider incorporating other factors like volatility and volume.

6. Select time frames fitting for traded products.

7. Consider machine learning to automate strategy optimizations.

### Summary

Overall this is a very flexible and customizable trend following system. Key advantages are using CCI for trends, custom bands to limit risk, fixed stops/takes, and time frame selection. Need to watch for false CCI signals and inflexible stops. Future improvements could come from optimizing parameters, filtering signals, selecting efficient time frames, and incorporating machine learning for automatic adaptations to market changes, in order to achieve more consistent excess returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|CCI Length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|timestamp(2099-10-01T00:00:00)|Backtesting Start Date|
|v_input_4|timestamp(9999-12-31T00:00:00)|Backtesting End Date|
|v_input_5||Time Frame To Enter Trades|
|v_input_6|false|Enable Close Trade At End Of Time Frame|
|v_input_7|true|Enter First Trade ASAP|
|v_input_8|false|Wait For Cross To Enter First Trade|
|v_input_9|true|Use CCI Simple Cross Line For Entries & Exits|
|v_input_10|false|Use Upper & Lower Bands For Entries & Exits|
|v_input_11|false|CCI Simple Cross|
|v_input_12|100|CCI Enter Long Band|
|v_input_13|100|CCI Exit Long Band|
|v_input_14|-100|CCI Enter Short Band|
|v_input_15|-100|CCI Exit Short Band|
|v_input_16|false|Enable Stop Loss|
|v_input_17|false|Enable Take Profit|
|v_input_18|5|Stop Loss %|
|v_input_19|10|Take Profit %|
|v_input_20||Long Entry message|
|v_input_21||Short Entry message|
|v_input_22||Close Long message|
|v_input_23||Close Short message|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-31 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © REV0LUTI0N

//@version=4

strategy(title="CCI Strategy", overlay=true, initial_capital = 10000, default_qty_value = 10000, default_qty_type = strategy.cash)


//CCI Code

length = input(20, minval=1, title="CCI Length")
src = input(close, title="Source")
ma = sma(src, length)
cci = (src - ma) / (0.015 * dev(src, length))


// Strategy Backtesting
startDate  = input(timestamp("2099-10-01T00:00:00"), type = input.time, title='Backtesting Start Date')
finishDate = input(timestamp("9999-12-31T00:00:00"), type = input.time, title='Backtesting End Date')

time_cond  = true


//Time Restriction Settings
startendtime = input("", title='Time Frame To Enter Trades')
enableclose = input(false, title='Enable Close Trade At End Of Time Frame')
timetobuy = true
timetoclose = true


//Strategy Settings

//Strategy Settings - Enable Check Boxes
enableentry = input(true, title="Enter First Trade ASAP")
enableconfirmation = input(false, title="Wait For Cross To Enter First Trade")
enablezero =input(true, title="Use CCI Simple Cross Line For Entries & Exits")
enablebands = input(false, title="Use Upper & Lower Bands For Entries & Exits")

//Strategy Settings - Band Sources
ccisource = input(0, title="CCI Simple Cross")
upperbandsource =input(100, title="CCI Enter Long Band")
upperbandexitsource =input(100, title="CCI Exit Long Band")
lowerbandsource =input(-100, title="CCI Enter Short Band")
lowerbandexitsource =input(-100, title="CCI Exit Short Band")

//Strategy Settings - Crosses
simplecrossup = crossover(cci, ccisource)
simplecrossdown = crossunder(cci, ccisource)
uppercrossup = crossover(cci, upperbandsource)
lowercrossdown = crossunder(cci, lowerbandsource)
uppercrossdown = crossunder(cci, upperbandexitsource)
lowercrossup = crossover(cci, lowerbandexitsource)
upperstop = crossunder(cci, upperbandsource)
lowerstop = crossover(cci, lowerbandsource)


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
    

//Strategy Execution

//Strategy Execution - Simple Line Cross
if (cci > ccisource and enablezero and enableentry and time_cond and timetobuy)
    strategy.entry("Long", strategy.long, alert_message = message_enterlong)
if (cci < ccisource and enablezero and enableentry and time_cond and timetobuy)
    strategy.entry("Short", strategy.short, alert_message = message_entershort)

if (simplecrossup and enablezero and enableconfirmation and time_cond and timetobuy)
    strategy.entry("Long", strategy.long, alert_message = message_enterlong)
if (simplecrossdown and enablezero and enableconfirmation and time_cond and timetobuy)
    strategy.entry("Short", strategy.short, alert_message = message_entershort)

//Strategy Execution - Upper and Lower Band Entry
if (uppercrossup and enablebands and time_cond and timetobuy)
    strategy.entry("Long", strategy.long, alert_message = message_enterlong)
if (lowercrossdown and enablebands and time_cond and timetobuy)
    strategy.entry("Short", strategy.short, alert_message = message_entershort)

//Strategy Execution - Upper and Lower Band Exit
if strategy.position_size > 0 and uppercrossdown and enablebands and time_cond and timetobuy
    strategy.close_all(alert_message = message_closelong)
if strategy.position_size < 0 and lowercrossup and enablebands and time_cond and timetobuy
    strategy.close_all(alert_message = message_closeshort)

//Strategy Execution - Upper and Lower Band Stops
if strategy.position_size > 0 and upperstop and enablebands and time_cond and timetobuy
    strategy.close_all(alert_message = message_closelong)
if strategy.position_size < 0 and lowerstop and enablebands and time_cond and timetobuy
    strategy.close_all(alert_message = message_closeshort)

//Strategy Execution - Close Trade At End Of Time Frame    
if strategy.position_size > 0 and timetoclose and enableclose and time_cond
    strategy.close_all(alert_message = message_closelong)
if strategy.position_size < 0 and timetoclose and enableclose and time_cond
    strategy.close_all(alert_message = message_closeshort)

//Strategy Execution - Stop Loss and Take Profit
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

https://www.fmz.com/strategy/430761

> Last Modified

2023-11-01 16:20:45
