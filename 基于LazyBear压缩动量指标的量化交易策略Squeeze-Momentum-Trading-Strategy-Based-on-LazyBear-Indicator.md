
> Name

基于LazyBear压缩动量指标的量化交易策略Squeeze-Momentum-Trading-Strategy-Based-on-LazyBear-Indicator

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e1b1926e408bbf7d08.png)
[trans]

## 概述

本策略基于LazyBear的压缩动量指标,加入了动量过滤器,改变了数据源,并增加了风险管理系统,可自定义回测时间段,旨在捕捉波动性压缩后的价格爆发。

## 策略原理

该策略使用布林带指标和Keltner通道指标计算价格通道,当价格突破通道时,视为波动性加大的信号。它结合了LazyBear的压缩动量指标,该指标使用线性回归方法判断价格动量方向。

策略加入了动量过滤器,只有当动量绝对值超过阈值时才会发出交易信号。当波动性压缩(通道内收紧),且动量过滤通过时,策略判断趋势方向,做多或做空。同时设置止损、止盈、追踪止损来控制风险。

## 优势分析

该策略集成了多种指标判断,比较全面;加入风险管理机制,可以限制单笔损失;在波动性压缩后能及时判断价格趋势方向;参数可自定义,适应性强。

## 风险分析

风险主要存在:虚假突破导致错误判断;参数设置不当,未能及时反转;止损被突破造成损失扩大。可以优化参数,调整风险管理参数,选择合适品种和交易时段来降低这些风险。

## 优化方向

可以考虑结合其他指标过滤信号,例如交易量指标;调整动量阈值更精确;设置回撤止损以进一步控制风险;测试更多品种数据效果。这些优化可以使策略更稳定和泛化。

## 总结

本策略较全面判断价格趋势和波动性,集成程度高,风险控制措施较完善,可根据优化方向做进一步改进,对捕捉波动性压缩后的价格爆发有很强的适应性。

||

## Overview

This strategy is based on LazyBear's Squeeze Momentum Indicator, with added momentum filters, changed data source, and enhanced risk management system and customizable backtesting timeframe, aiming to catch price outbreaks after volatility squeeze.  

## Strategy Logic

The strategy uses Bollinger Bands and Keltner Channels to calculate price channels. Breakouts signal increased volatility. It incorporates LazyBear's Squeeze Momentum Indicator which uses linear regression to determine price momentum direction.

The strategy adds momentum filters, only trading when absolute momentum exceeds a threshold. On volatility squeeze (channel tightening) with momentum filter passed, it judges trend direction for long/short. It also sets stop loss, take profit and trailing stop to control risks.

## Advantage Analysis 

The strategy integrates multiple indicators for comprehensive judgment. It limits per trade loss with risk management mechanisms. It can timely judge post-squeeze price trends. Customizable parameters make it adaptable.

## Risk Analysis

Main risks include: false breakouts causing wrong judgements; failure to reverse in time with improper parameter settings; stop loss breaches enlarging losses. These can be mitigated by optimizing parameters, adjusting risk management settings, selecting suitable products and trading sessions.

## Optimization Directions

Consider combining other indicator filters like volume; fine-tune momentum threshold for higher precision; add drawdown stop loss for tighter risk control; test effectiveness across more products. These optimizations can make the strategy more robust and generalized.

## Summary  

The strategy judges price trends and volatility relatively comprehensively with high integration degree and improved risk control measures. It can be further enhanced through the optimization directions for strong adaptiveness in catching post-squeeze price outbreaks.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|BB Length|
|v_input_2|2|BB MultFactor|
|v_input_3|16|KC Length|
|v_input_4|1.5|KC MultFactor|
|v_input_5|false|Filter for Momenutum value|
|v_input_6|20|Min for momentum|
|v_input_7|600|Stop Loss|
|v_input_8|1000|Take Profit|
|v_input_9|20|Trailing Stop|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-05 00:00:00
end: 2024-02-04 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=4
// Strategy based on LazyBear Squeeze Momentum Indicator
// © Bitduke
// All scripts: https://www.tradingview.com/u/Bitduke/#published-scripts

strategy(shorttitle="SMS", title="Squeeze Momentum Strategy", overlay=false )

length = input(12, title="BB Length")
mult = input(2.0, title="BB MultFactor")
lengthKC = input(16, title="KC Length")
mult_kc = input(1.5, title="KC MultFactor")


//FILTERS
useMomAverage = input(false, title="Filter for Momenutum value", type=input.bool)
MomentumMin = input(20, title="Min for momentum")

// Calculate BB
src = ohlc4

ma_1 = sma(src, length)
ma_2 = sma(src, lengthKC)
range_ma = sma(high - low, lengthKC)

dev = mult * stdev(src, length)

upper_bb = ma_1 + dev
lower_bb = ma_1 - dev

upper_kc = ma_2 + range_ma * mult_kc
lower_kc = ma_2 - range_ma * mult_kc

sqz_on = lower_bb > lower_kc and upper_bb < upper_kc
sqz_off = lower_bb < lower_kc and upper_bb > upper_kc
no_sqz = sqz_on == false and sqz_off == false

val = linreg(src - avg(avg(highest(hl2, lengthKC), lowest(low, lengthKC)), sma(hl2, lengthKC)), lengthKC, 0)

bcolor = iff(val > 0, iff(val > nz(val[1]), color.lime, color.green), iff(val < nz(val[1]), color.red, color.maroon))
scolor = no_sqz ? color.blue : sqz_on ? color.black : color.aqua
plot(val, color=bcolor, style=plot.style_histogram, linewidth=4)
plot(0, color=scolor, style=plot.style_cross, linewidth=2)

//LOGIC
//momentum filter
filterMom = useMomAverage ? abs(val) > MomentumMin / 100000 ? true : false : true

//standard condition
longCondition = scolor[1] != color.aqua and scolor == color.aqua and bcolor == color.lime and filterMom
exitLongCondition = bcolor == color.green
shortCondition = scolor[1] != color.aqua and scolor == color.aqua and bcolor == color.red and filterMom
exitShortCondition = bcolor == color.maroon

// Risk Management Sysyem
stop_loss = input(defval = 600, title="Stop Loss", minval = 0)
take_profit = input(defval = 1000, title="Take Profit", minval = 0)
trailing_stop = input(defval = 20, title="Trailing Stop", minval = 0)
// If the zero value is set for stop loss, take profit or trailing stop, then the function is disabled
s_loss = stop_loss >= 1 ? stop_loss : na
tk_profit = take_profit >= 1 ? take_profit : na
tr_stop = trailing_stop >= 1 ? trailing_stop : na


//STRATEGY
strategy.entry("SQ_Long", strategy.long, when=longCondition)
strategy.exit("Exit Long", from_entry = "SQ_Long", profit = take_profit, trail_points = trailing_stop, loss = s_loss)
strategy.close("SQ_Long", exitLongCondition)

strategy.entry("SQ_Short", strategy.short, when=shortCondition)
strategy.exit("Exit Short", from_entry = "SQ_Short", profit = take_profit, trail_points = trailing_stop, loss = s_loss )
strategy.close("SQ_Short", when=exitShortCondition)


```

> Detail

https://www.fmz.com/strategy/441084

> Last Modified

2024-02-05 14:48:01
