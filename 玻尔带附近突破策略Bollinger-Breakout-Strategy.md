
> Name

玻尔带附近突破策略Bollinger-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

本策略基于玻尔带指标设计,当价格突破玻尔带上下轨时,采取相应做多或做空操作。策略通过捕捉突破行情来获利。

### 策略原理 

1. 计算玻尔带的中轨、上轨和下轨
2. 突破下轨时做多;突破上轨时做空
3. 设置起止时间,限定交易区间
4. 设置持仓时间,默认当日平仓

具体来说,该策略首先计算长度为length的中轨SMA,以及以mult倍标准差计算的上下轨。当收盘价从下向上突破下轨时,做多入场;从上向下突破上轨时,做空入场。同时设置起止时间限定交易区间。每日开盘前强制平仓。

该策略试图捕捉价格突破上下轨后的扩张行情。突破下轨时看多方力量增强,突破上轨时看空方力量增强,这时交易同方向有利。

### 优势分析

1. 简单直观,容易理解和实现
2. 利用玻尔带指标判断行情突破,具有一定的趋势跟踪能力
3. 可灵活调整参数,适用于不同周期和品种
4. 每日平仓,可控制隔夜风险
5. 可单独开启多头或空头交易

### 风险分析

1. 突破假突破风险。突破后价格可能再度回折。
2. 需适时调整参数。不同周期需要调整参数。
3. 潜在亏损扩大风险。扩大突破幅度可能扩大单笔亏损。
4. 交易成本扩大风险。频繁交易可能加大交易成本。

可通过优化入场条件,添加止损策略,引入趋势过滤等方式来降低上述风险。

### 优化方向

1. 优化参数以适应不同周期
2. 添加再入场和加仓条件以追踪趋势
3. 增加止损策略以控制风险
4. 设定交易时间段以避开重要新闻事件
5. 评估趋势过滤条件以过滤曲折行情
6. 测试不同持仓时间并比较结果

### 总结

本策略为基于玻尔带的突破策略,通过捕捉突破展开的行情获利。优点是思路简单,易于实现;缺点是容易受到曲折行情的误导。可通过参数优化、止损策略、交易时间控制等方式提高策略效果并控制风险。该策略可使交易者理解指标应用和突破交易的基本方法。

|| 


### Overview

This strategy is based on Bollinger Bands indicator, taking long or short positions when price breaks out of Bollinger Bands upper or lower lines. It aims to profit from catching breakout moves.

### Strategy Logic

1. Calculate Bollinger midline, upper and lower lines
2. Go long on lower line breakout; go short on upper line breakout
3. Set start and end time to define trading hours 
4. Set holding time, default to intraday exit  

Specifically, it first calculates the midline SMA of length length, and upper/lower lines of mult times standard deviation. When close breaks out upward from the lower line, go long. When close breaks down from the upper line, go short. Also set start and end time to limit trading hours. Exit before daily open.

The strategy attempts to capture expanding moves after price breaks out of bands. Breaking lower band indicates strengthening bullish forces, while breaking upper band means strengthening bearish forces, so trading in line with breakout is favorable.

### Advantage Analysis

1. Simple and intuitive, easy to understand and implement
2. Utilize Bollinger Bands to judge trend breakouts, has some trend following capacity 
3. Flexible parameter adjustment for different cycles and products
4. Intraday exit controls overnight risk
5. Can enable only long or short trading

### Risk Analysis 

1. False breakout risk. Price may retrace after initial breakout.
2. Need timely parameter tuning. Parameters need adjustments for different cycles.
3. Potential loss enlargement risk. Larger breakout range may expand losses.
4. Increased transaction costs. Frequent trading may increase transaction costs.

Risks can be reduced by optimizing entry rules, adding stop loss, introducing trend filter etc.

### Optimization Directions

1. Optimize parameters for different cycles
2. Add re-entry and pyramiding rules to follow trends
3. Introduce stop loss to control risks
4. Set trading hours to avoid significant news events
5. Test trend filters to avoid choppy price action
6. Evaluate different holding periods and compare results

### Summary

This is a breakout strategy based on Bollinger Bands. It profits from breakout moves. Pros are simple logic and easy implementation; Cons are susceptibility to false breakouts. Risks can be managed through parameter optimization, stop loss, trading hours control etc. It allows traders to understand basics of using indicators and trading breakouts.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|20|length|
|v_input_4|true|mult|
|v_input_5|1900|From Year|
|v_input_6|2100|To Year|
|v_input_7|true|From Month|
|v_input_8|12|To Month|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-21 00:00:00
end: 2023-09-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy("Noro's Bollinger Strategy v1.0", shorttitle = "Bollinger str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100.0, pyramiding = 5)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")

length = input(20, minval=1)
mult = input(1.0, minval=0.001, maxval=50)

fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")

source = close
basis = sma(source, length)
dev = mult * stdev(source, length)

upper = basis + dev
lower = basis - dev

up = close < lower
dn = close > upper
exit = (strategy.position_size > 0 and close > open) or (strategy.position_size < 0 and close < open)

if up
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, 01, 00, 00) and time < timestamp(toyear, tomonth, 31, 00, 00)))

if dn
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, 01, 00, 00) and time < timestamp(toyear, tomonth, 31, 00, 00)))
    
if time > timestamp(toyear, tomonth, 31, 00, 00) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/427440

> Last Modified

2023-09-21 10:38:13
