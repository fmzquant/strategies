
> Name

反向K线突破短线交易策略Reversal-Short-term-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/911daa9e5a8dcfab4c.png)
[trans]

## 概述
该策略用于捕捉短线反转交易机会。它会在连续N根K线都是上涨后开仓做空,在连续M根K线都是下跌后平仓。同时,该策略加入了时间段限制和止损止盈功能。

## 原理
1. 输入参数:连续上涨K线数N,连续下跌K线数M
2. 定义逻辑:
    - ups统计上涨K线数,price>price[1]则+1,否则reset为0
    - dns统计下跌K线数,price<price[1]则+1,否则reset为0
3. 入场:当ups≥N时,做空;当dns≥M时,平仓
4. 出场:固定止损止盈或时间段结束

## 优势
1. 捕捉反转交易机会,适合短线操作
2. 可灵活设置交易时间段,适应不同交易计划
3. 内置止损止盈功能,有助于风险控制

## 风险
1. 短线反转不一定成功,可能再次反转导致损失
2. 需要合理设置参数N、M,过大或过小都不利
3. 停止时刻设置不当可能无法及时止损

## 优化方向  
1. 结合趋势指标避免逆势操作
2. 动态调整参数N、M
3. 优化止损机制

## 总结  
该策略通过统计K线形态来捕捉短线交易机会。设置合理的参数以及风控措施对于获得稳定收益至关重要。通过进一步结合趋势判断及动态调整参数,可望获得更好的效果。

|| 

## Overview  
This strategy aims to capture short-term reversal trading opportunities. It will open short position after N consecutive up-bars and close position after M consecutive down-bars. It also incorporates time frame filter and stop loss/take profit features.  

## Logic
1. Input parameters: Number of consecutive up-bars N, consecutive down-bars M
2. Definition:
    - ups counts number of up-bars, price>price[1] then +1, otherwise reset to 0 
    - dns counts number of down-bars, price<price[1] then +1, otherwise reset to 0
3. Entry: short when ups≥N; close position when dns≥M 
4. Exit: fixed stop loss/take profit or end of time frame

## Pros
1. Capture reversal trading chances, suitable for short-term trading
2. Flexible time frame setting catering to different trading plans 
3. Embedded stop loss/take profit facilitating risk management

## Risks
1. Short-term reversal may fail and reverse again leading to loss
2. Reasonable N, M parameters needed, too large or small unfavourable
3. Improper stop time may unable to stop loss in time  

## Optimization Directions
1. Combine with trend indicator to avoid against trend trades
2. Dynamic adjustment of parameters N, M
3. Optimize stop loss mechanism  

## Conclusion
The strategy captures short-term trading opportunities through statistical K-line patterns. Reasonable parameter tuning and risk control measures are crucial for steady profits. Further improvements on combining trend analysis and dynamic parameter adjustment may lead to even better performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Consecutive Bars Up|
|v_input_2|true|Consecutive Bars Down|
|v_input_3|timestamp(2021-01-01T00:00:00)|Backtesting Start Date|
|v_input_4|timestamp(2021-12-31T00:00:00)|Backtesting End Date|
|v_input_5||Time Frame To Enter Trades|
|v_input_6|false|Enable Close Trade At End Of Time Frame|
|v_input_7|false|Enable Take Profit & Stop Loss|
|v_input_8|5|Stop Loss Ticks|
|v_input_9|10|Take Profit Ticks|
|v_input_10||Long Entry message|
|v_input_11||Short Entry message|
|v_input_12||Close Long message|
|v_input_13||Close Short message|
|v_input_14||Take Profit message|
|v_input_15||Stop Loss message|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-13 00:00:00
end: 2023-11-20 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

// Strategy
strategy("Up/Down Short Strategy", overlay=true, initial_capital = 10000, default_qty_value = 10000, default_qty_type = strategy.cash)

// There will be no short entries, only exits from long.
strategy.risk.allow_entry_in(strategy.direction.short)

consecutiveBarsUp = input(1, title='Consecutive Bars Up')
consecutiveBarsDown = input(1, title='Consecutive Bars Down')

price = close

ups = 0.0
ups := price > price[1] ? nz(ups[1]) + 1 : 0

dns = 0.0
dns := price < price[1] ? nz(dns[1]) + 1 : 0

// Strategy Backtesting
startDate  = input(timestamp("2021-01-01T00:00:00"), type = input.time, title='Backtesting Start Date')
finishDate = input(timestamp("2021-12-31T00:00:00"), type = input.time, title='Backtesting End Date')

time_cond  = true

//Time Restriction Settings
startendtime = input("", title='Time Frame To Enter Trades')
enableclose = input(false, title='Enable Close Trade At End Of Time Frame')
timetobuy = (time(timeframe.period, startendtime))
timetoclose = na(time(timeframe.period, startendtime))

// Stop Loss & Take Profit Tick Based
enablesltp = input(false, title='Enable Take Profit & Stop Loss')
stopTick = input(5.0, title='Stop Loss Ticks', type=input.float) / 100
takeTick = input(10.0, title='Take Profit Ticks', type=input.float) / 100

longStop = strategy.position_avg_price - stopTick
shortStop = strategy.position_avg_price + stopTick
shortTake = strategy.position_avg_price - takeTick
longTake = strategy.position_avg_price + takeTick

plot(strategy.position_size > 0 and enablesltp ? longStop : na, style=plot.style_linebr, color=color.red, linewidth=1, title="Long Fixed SL")
plot(strategy.position_size < 0 and enablesltp ? shortStop : na, style=plot.style_linebr, color=color.red, linewidth=1, title="Short Fixed SL")
plot(strategy.position_size > 0 and enablesltp ? longTake : na, style=plot.style_linebr, color=color.green, linewidth=1, title="Long Take Profit")
plot(strategy.position_size < 0 and enablesltp ? shortTake : na, style=plot.style_linebr, color=color.green, linewidth=1, title="Short Take Profit")

// Alert messages
message_enterlong  = input("", title="Long Entry message")
message_entershort = input("", title="Short Entry message")
message_closelong = input("", title="Close Long message")
message_closeshort = input("", title="Close Short message")
message_takeprofit = input("", title="Take Profit message")
message_stoploss = input("", title="Stop Loss message")

// Strategy Execution
if (ups >= consecutiveBarsUp) and time_cond and timetobuy
    strategy.entry("Long", strategy.long, stop = high + syminfo.mintick, alert_message = message_enterlong)
    
if (dns >= consecutiveBarsDown) and time_cond and timetobuy
    strategy.entry("Short", strategy.short, stop = low + syminfo.mintick, alert_message = message_entershort)
    
if strategy.position_size > 0 and timetoclose and enableclose
    strategy.close_all(alert_message = message_closelong)
if strategy.position_size < 0 and timetoclose and enableclose
    strategy.close_all(alert_message = message_closeshort)
    
if strategy.position_size > 0 and enablesltp and time_cond
    strategy.exit(id="Close Long", stop=longStop, limit=longTake, alert_message = message_takeprofit)
if strategy.position_size < 0 and enablesltp and time_cond
    strategy.exit(id="Close Short", stop=shortStop, limit=shortTake, alert_message = message_stoploss)





```

> Detail

https://www.fmz.com/strategy/432806

> Last Modified

2023-11-21 17:03:32
