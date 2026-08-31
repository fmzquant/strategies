
> Name

RSI双向突破策略RSI-Reversal-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/109876c91a8941b015a.png)


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
