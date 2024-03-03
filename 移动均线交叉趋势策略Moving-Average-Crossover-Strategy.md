
> Name

移动均线交叉趋势策略Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e0ad9156e6e91b680b.png)

[trans]

## 概述

移动平均线交叉策略是一种 momentum 策略,利用双移动平均线的交叉信号来判断趋势方向,产生买入和卖出信号。该策略使用 2 条简单移动平均线和 1 条指数移动平均线,根据它们的交叉情况判定多空,属于中短期交易策略。

## 策略原理

该策略使用 3 条移动平均线:

- EMA1: 一条较短周期的指数移动平均线,代表快线
- SMA1: 一条较长周期的简单移动平均线,代表慢线  
- SMA2: 一条更长周期的简单移动平均线,判断趋势方向

策略以 EMA1, SMA1, SMA2 的大小关系来判断趋势:

- 上升趋势:EMA1 > SMA1 > SMA2
- 下降趋势:EMA1 < SMA1 < SMA2

进入信号:

- 多头进入:当快线上穿慢线时做多
- 空头进入:当快线下穿慢线时做空

退出信号:

- 多头退出:快线下穿慢线时平仓
- 空头退出:快线上穿慢线时平仓

该策略提供了多种参数配置,可以选择不同的移动平均线来判断进入和退出。

## 优势分析

该策略具有以下优势:

1.  capture momentum: 能够捕捉市场趋势的变化,momentum 策略
2. flexible configuration: 提供多种移动平均线选择,可以灵活配置
3. trend filtering: 使用长周期移动平均线来判断趋势方向,避免逆势交易
4. risk management: 可配置止损和止盈,控制单笔交易风险

## 风险分析

该策略也存在以下风险:

1. whipsaws: 在突破前有可能出现持续震荡导致多次假突破
2. sensitive to MA parameters: 移动平均线参数设置不当可能导致过于频繁或不够敏感
3. lagging: 移动平均线本质具有滞后性,可能错过突破最佳时点
4. no fundamentals: 纯技术指标驱动,不考虑基本面

针对 whipsaws 风险,可以适当调整移动平均线周期;对参数敏感性风险,可以优化参数;对滞后性风险,可以结合其他先行指标优化。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 加入其他技术指标过滤,例如 RSI、布林带等,提高信号质量
2. 优化移动平均线周期参数,寻找最优参数
3. 加入机器学习模型判断趋势和信号可靠性
4. 结合交易量,避免价格在低量情况下出现虚假突破
5. 结合基本面因素,避免逆经济周期交易

## 总结

移动平均线交叉策略整体较为简单直接,通过快慢均线的交叉判定趋势方向和参与时机。该策略优势是可以捕捉momentum,灵活配置参数,但也存在一定的whipsaw风险、滞后风险等问题。通过引入其他指标进行过滤优化,该策略可以成为一个非常实用的量化交易策略。

||

## Overview

The Moving Average Crossover strategy is a momentum strategy that uses the crossover signals of double moving averages to determine the trend direction and generate trading signals. It employs 2 simple moving averages and 1 exponential moving average, judging long and short based on their crossover, belonging to a medium-term trading strategy.

## Strategy Logic

The strategy uses 3 moving averages:

- EMA1: A shorter period exponential moving average, acting as the fast line
- SMA1: A longer period simple moving average, acting as the slow line
- SMA2: An even longer period simple moving average, determining the trend direction  

The strategy judges the trend based on the relationship between EMA1, SMA1 and SMA2:

- Uptrend: EMA1 > SMA1 > SMA2
- Downtrend: EMA1 < SMA1 < SMA2

Entry signals:

- Long entry: When the fast line crosses above the slow line  
- Short entry: When the fast line crosses below the slow line

Exit signals:

- Close long: When the fast line crosses below the slow line
- Close short: When the fast line crosses above the slow line

The strategy provides multiple parameter configurations, with customizable moving averages for entry and exit.

## Advantage Analysis 

The advantages of this strategy:

1. Captures momentum: Detects trend changes, momentum strategy
2. Flexible configuration: Provides multiple MA choices, flexible parameter tuning
3. Trend filtering: Uses long period MA to determine trend, avoids counter-trend trades 
4. Risk management: Configurable stop loss and take profit controls single trade risk

## Risk Analysis

The risks of this strategy:

1. Whipsaws: Prolonged choppiness before breakout may cause multiple false signals
2. Sensitive to MA parameters: Improper tuning of MA periods may result in over-sensitivity or sluggishness 
3. Lagging: Inherent lagging nature of moving averages, may miss best entry timing
4. No fundamentals: Purely technical indicator driven, no consideration of fundamentals

Whipsaw risk can be mitigated by tuning MA periods; Parameter sensitivity can be solved by optimization; Lagging risk can be reduced by incorporating other leading indicators. 

## Optimization Directions

Potential optimizations:

1. Add other technical filters like RSI, Bollinger Bands to improve signal quality
2. Optimize MA periods to find optimum parameters
3. Incorporate machine learning models to judge trend and signal reliability
4. Consider trading volume to avoid false breakouts in low volume conditions  
5. Incorporate fundamental factors to avoid trading against economic cycles

## Conclusion

The Moving Average Crossover strategy is straight-forward, judging trend and timing by crossing of fast and slow MAs. Its advantage is capturing momentum with flexible configurations, but risks like whipsaw and lagging exist. With optimizations like additional filters, it can become a very practical quantitative trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|5|(?Moving Averages:)Fast EMA|
|v_input_bool_1|true|Dynamic Exponential Moving Average?|
|v_input_int_2|10|Slow SMA|
|v_input_bool_2|false|Dynamic Simple Moving Average?|
|v_input_int_3|13|Trend Determining SMA|
|v_input_bool_3|true|(?Allowed Entries:)Long|
|v_input_bool_4|true|Short|
|v_input_string_1|0|(?Entry Conditions:)Buy when: Fast-Slow Crossing|Fast-Trend Crossing|Slow-Trend Crossing|
|v_input_bool_5|true|In trend|
|v_input_string_2|0|Sell when: Fast-Slow Crossing|Fast-Trend Crossing|Slow-Trend Crossing|
|v_input_bool_6|true|In trend|
|v_input_string_3|0|(?Exit Conditions:)Close long when: Fast-Slow Crossing|Fast-Trend Crossing|Slow-Trend Crossing|
|v_input_string_4|0|Close short when: Fast-Slow Crossing|Fast-Trend Crossing|Slow-Trend Crossing|
|v_input_bool_7|true|(?Apply Filters to)Long Entries|
|v_input_bool_8|true|Short Entries|
|v_input_bool_9|true|Exits|
|v_input_bool_10|false|(?Relative Volume Filter:)usevol|
|v_input_int_4|true|Volume >|
|v_input_int_5|30|Avg. Volume Over Period|
|v_input_bool_11|false|(?Volatility Filter:)useatr|
|v_input_int_6|5|ATR|
|v_input_int_7|30|> ATR|
|v_input_bool_12|false|(?Overbought/Oversold Filter:)usersi|
|v_input_int_8|false|rsitrhs1|
|v_input_int_9|100|< RSI (14) <|
|v_input_bool_13|false|(?Stop Loss / Take Profit:)SL|
|v_input_float_1|10|, %|
|v_input_bool_14|false|Trailing|
|v_input_bool_15|false|TP|
|v_input_float_2|20|, %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-26 00:00:00
end: 2023-10-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Decam9

//@version=5
strategy(title = "Moving Average Crossover", shorttitle = "MA Crossover Strategy", overlay=true,
     initial_capital = 100000,default_qty_type = strategy.percent_of_equity, default_qty_value = 10)

//Moving Average Inputs
EMA1 = input.int(title="Fast EMA", group = "Moving Averages:", 
     inline = "EMAs", defval=5, minval = 1)
isDynamicEMA = input.bool(title = "Dynamic Exponential Moving Average?", defval = true,
     inline = "EMAs", group = "Moving Averages:", tooltip = "Changes the source of the MA based on trend")

SMA1 = input.int(title = "Slow SMA", group = "Moving Averages:",
     inline = "SMAs", defval = 10, minval = 1)
isDynamicSMA = input.bool(title = "Dynamic Simple Moving Average?", defval = false,
     inline = "SMAs", group = "Moving Averages:", tooltip = "Changes the source of the MA based on trend")

SMA2 = input.int(title="Trend Determining SMA", group = "Moving Averages:",
     inline = "MAs", defval=13, minval = 1)

//Moving Averages
Trend = ta.sma(close, SMA2)
Fast = ta.ema(isDynamicEMA ? (close > Trend ? low : high) : close, EMA1)
Slow = ta.sma(isDynamicSMA ? (close > Trend ? low : high) : close, SMA1)

//Allowed Entries
islong = input.bool(title = "Long", group = "Allowed Entries:",
     inline = "Entries",defval = true)
isshort = input.bool(title = "Short", group = "Allowed Entries:",
     inline = "Entries", defval= true)

//Entry Long Conditions
buycond = input.string(title="Buy when", group = "Entry Conditions:", 
     inline = "Conditions",defval="Fast-Slow Crossing", 
     options=["Fast-Slow Crossing", "Fast-Trend Crossing","Slow-Trend Crossing"])
     
intrendbuy = input.bool(title = "In trend", defval = true, group = "Entry Conditions:",
     inline = "Conditions", tooltip = "In trend if price is above SMA 2")

//Entry Short Conditions
sellcond = input.string(title="Sell when", group = "Entry Conditions:", 
     inline = "Conditions2",defval="Fast-Slow Crossing", 
     options=["Fast-Slow Crossing", "Fast-Trend Crossing","Slow-Trend Crossing"])
     
intrendsell = input.bool(title = "In trend",defval = true, group = "Entry Conditions:",
     inline = "Conditions2", tooltip = "In trend if price is below SMA 2?")

//Exit Long Conditions
closebuy = input.string(title="Close long when", group = "Exit Conditions:", 
     defval="Fast-Slow Crossing", options=["Fast-Slow Crossing", "Fast-Trend Crossing","Slow-Trend Crossing"])

//Exit Short Conditions
closeshort = input.string(title="Close short when", group = "Exit Conditions:", 
     defval="Fast-Slow Crossing", options=["Fast-Slow Crossing", "Fast-Trend Crossing","Slow-Trend Crossing"])
     

//Filters
filterlong =input.bool(title = "Long Entries", inline = 'linefilt', group = 'Apply Filters to', 
     defval = true)
filtershort =input.bool(title = "Short Entries", inline = 'linefilt', group = 'Apply Filters to', 
     defval = true)
filterend =input.bool(title = "Exits", inline = 'linefilt', group = 'Apply Filters to', 
     defval = true)
usevol =input.bool(title = "", inline = 'linefiltvol', group = 'Relative Volume Filter:', 
     defval = false)
rvol = input.int(title = "Volume >", inline = 'linefiltvol', group = 'Relative Volume Filter:', 
     defval = 1)
len_vol = input.int(title = "Avg. Volume Over Period", inline = 'linefiltvol', group = 'Relative Volume Filter:', 
     defval = 30, minval = 1,
     tooltip="The current volume must be greater than N times the M-period average volume.")
useatr =input.bool(title = "", inline = 'linefiltatr', group = 'Volatility Filter:', 
     defval = false)
len_atr1 = input.int(title = "ATR", inline = 'linefiltatr', group = 'Volatility Filter:', 
     defval = 5, minval = 1)
len_atr2 = input.int(title = "> ATR", inline = 'linefiltatr', group = 'Volatility Filter:', 
     defval = 30, minval = 1,
     tooltip="The N-period ATR must be greater than the M-period ATR.")
usersi =input.bool(title = "", inline = 'linersi', group = 'Overbought/Oversold Filter:', 
     defval = false)
rsitrhs1 = input.int(title = "", inline = 'linersi', group = 'Overbought/Oversold Filter:', 
     defval = 0, minval=0, maxval=100)
rsitrhs2 = input.int(title = "< RSI (14) <", inline = 'linersi', group = 'Overbought/Oversold Filter:', 
     defval = 100, minval=0, maxval=100,
     tooltip="RSI(14) must be in the range between N and M.")
issl =  input.bool(title = "SL", inline = 'linesl1', group = 'Stop Loss / Take Profit:', 
     defval = false)
slpercent =  input.float(title = ", %", inline = 'linesl1', group = 'Stop Loss / Take Profit:', 
     defval = 10, minval=0.0)
istrailing =  input.bool(title = "Trailing", inline = 'linesl1', group = 'Stop Loss / Take Profit:', 
     defval = false)
istp =  input.bool(title = "TP", inline = 'linetp1', group = 'Stop Loss / Take Profit:', 
     defval = false)
tppercent =  input.float(title = ", %", inline = 'linetp1', group = 'Stop Loss / Take Profit:', 
     defval = 20)
     
//Conditions for Crossing
fscrossup = ta.crossover(Fast,Slow)
fscrossdw = ta.crossunder(Fast,Slow)
ftcrossup = ta.crossover(Fast,Trend)
ftcrossdw = ta.crossunder(Fast,Trend)
stcrossup = ta.crossover(Slow,Trend)
stcrossdw = ta.crossunder(Slow,Trend)

//Defining in trend
uptrend = Fast >= Slow and Slow >= Trend
downtrend = Fast <= Slow and Slow <= Trend
justCrossed = ta.cross(Fast,Slow) or ta.cross(Slow,Trend)


//Entry Signals
crosslong = if intrendbuy
    (buycond =="Fast-Slow Crossing" and uptrend ? fscrossup:(buycond =="Fast-Trend Crossing" and uptrend ? ftcrossup:(buycond == "Slow-Trend Crossing" and uptrend ? stcrossup : na))) 
else
    (buycond =="Fast-Slow Crossing"?fscrossup:(buycond=="Fast-Trend Crossing"?ftcrossup:stcrossup))

crossshort = if intrendsell
    (sellcond =="Fast-Slow Crossing" and downtrend ? fscrossdw:(sellcond =="Fast-Trend Crossing" and downtrend ? ftcrossdw:(sellcond == "Slow-Trend Crossing" and downtrend ? stcrossdw : na))) 
else
    (sellcond =="Fast-Slow Crossing"?fscrossdw:(buycond=="Fast-Trend Crossing"?ftcrossdw:stcrossdw))
crossexitlong = (closebuy =="Fast-Slow Crossing"?fscrossdw:(closebuy=="Fast-Trend Crossing"?ftcrossdw:stcrossdw))
crossexitshort = (closeshort =="Fast-Slow Crossing"?fscrossup:(closeshort=="Fast-Trend Crossing"?ftcrossup:stcrossup))


// Filters
rsifilter = usersi?(ta.rsi(close,14) > rsitrhs1 and ta.rsi(close,14) < rsitrhs2):true
volatilityfilter = useatr?(ta.atr(len_atr1) > ta.atr(len_atr2)):true
volumefilter = usevol?(volume > rvol*ta.sma(volume,len_vol)):true
totalfilter = volatilityfilter and volumefilter and rsifilter

//Filtered signals
golong  = crosslong  and islong  and (filterlong?totalfilter:true) 
goshort = crossshort and isshort and (filtershort?totalfilter:true)
endlong  = crossexitlong and (filterend?totalfilter:true)
endshort = crossexitshort and (filterend?totalfilter:true)

// Entry price and TP
startprice = ta.valuewhen(condition=golong or goshort, source=close, occurrence=0)
pm = golong?1:goshort?-1:1/math.sign(strategy.position_size)
takeprofit = startprice*(1+pm*tppercent*0.01)
// fixed stop loss
stoploss = startprice * (1-pm*slpercent*0.01)
// trailing stop loss
if istrailing and strategy.position_size>0
    stoploss := math.max(close*(1 - slpercent*0.01),stoploss[1])
else if istrailing and strategy.position_size<0
    stoploss := math.min(close*(1 + slpercent*0.01),stoploss[1])
    
if golong and islong
    strategy.entry("long",   strategy.long )
if goshort and isshort
    strategy.entry("short",  strategy.short)
if endlong
    strategy.close("long")
if endshort
    strategy.close("short")

// Exit via SL or TP
strategy.exit(id="sl/tp long", from_entry="long", stop=issl?stoploss:na, 
              limit=istp?takeprofit:na)
strategy.exit(id="sl/tp short",from_entry="short",stop=issl?stoploss:na, 
              limit=istp?takeprofit:na)


```

> Detail

https://www.fmz.com/strategy/430371

> Last Modified

2023-10-27 16:19:00
