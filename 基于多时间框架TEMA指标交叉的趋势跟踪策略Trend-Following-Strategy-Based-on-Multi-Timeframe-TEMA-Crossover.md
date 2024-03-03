
> Name

基于多时间框架TEMA指标交叉的趋势跟踪策略Trend-Following-Strategy-Based-on-Multi-Timeframe-TEMA-Crossover

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14cd36d3d939251e251.png)
[trans]

## 概述

该策略基于TEMA指标的多时间框架交叉来识别市场趋势方向,并结合更低时间框架的TEMA指标交叉来寻找具体的入市和出场时机。策略可配置仅做多、仅做空或双向交易。

## 策略原理

策略使用两个TEMA指标,一个基于5和15周期的快慢线,另一个基于用户自定义的高周期时间框架,例如日线或周线。高周期TEMA指标交叉确定总体趋势方向,当快线上穿慢线时看涨,下穿看跌;低周期TEMA指标交叉用于寻找具体的入市和出场时机。

当高周期TEMA快线上穿慢线时,低周期TEMA快线上穿慢线就可入场做多;当低周期TEMA快线下穿慢线时,就应该出场了。类似的,当高周期TEMA快线下穿慢线时,低周期TEMA快线下穿慢线就可入场做空;快线上穿慢线时就应该出场。   

## 策略优势

1. 基于TEMA指标交叉,避免被噪声误导
2. 多时间框架设定,结合高低周期判断,提高准确性  
3. 可单边交易,也可双向交易,灵活配置
4. 规则清晰,容易理解实施

## 风险分析

1. TEMA指标存在滞后,可能错过价格变化最初的时机
2. 高周期趋势判断中,短期调整可能导致不必要的反向操作
3. 高周期Setting选择不当,可能无法反映真实趋势
4. 低周期Setting选择不当,可能增大止损风险

风险解决方法:

1. 适当调整TEMA参数,取得平衡
2. 适当放宽止损幅度
3. 优化高低周期参数Setting
4. 测试不同品种参数健壮性

## 优化方向  

1. 动态调整TEMA参数,优化指标灵敏度
2. 增加动量指标过滤,避免错过趋势
3. 增加波动率指标,动态调整止损幅度  
4. 机器学习方法优化参数

## 总结

该策略整体概念清晰易理解,基于TEMA指标多时间框架交叉判断趋势方向,并结合低周期交叉寻找入场时机。有一定的优势,同时也存在一些改进空间。总体来说,该策略为量化交易实践提供了有价值的参考。

||


## Overview

This strategy identifies market trend direction based on the crossover of TEMA indicator across multiple timeframes, and uses TEMA crossover in lower timeframe to find specific entry and exit points. The strategy can be configured for long only, short only or both directions.

## Strategy Logic

The strategy employs two TEMA indicators, one with fast and slow line based on 5 and 15 periods, the other based on user-defined higher timeframe such as daily or weekly. The crossover of higher timeframe TEMA determines overall trend bias, with fast line crossing above slow line indicating bullish view, and below indicating bearish view. The lower timeframe TEMA crossover is used to find concrete entry and exit timing.  

When higher timeframe TEMA fast line crosses above slow line, a long entry can be triggered when lower timeframe TEMA fast line crosses above slow line; An exit signal is given when fast line crosses below slow line. Similarly, when higher timeframe fast line drops below slow line, a short entry is triggered on lower timeframe TEMA bearish crossover and exit when a bullish crossover happens.

## Advantages

1. Based on TEMA crossover, avoids noise interference  
2. Multi timeframe design combines high and lower cycles, improving accuracy
3. Flexible configuration for long only, short only or both directions  
4. Simple rules, easy to understand and implement

## Risk Analysis 

1. TEMA has lagging effect, may miss initial price change
2. Short term corrections on higher TF may cause unnecessary reverse trades 
3. Improper higher TF setting fails to reflect real trend
4. Improper lower TF setting increases stop loss risk

Risk Solutions:

1. Fine tune TEMA parameters for balance
2. Relax stop loss margin moderately
3. Optimize high low cycle settings  
4. Test parameter robustness across products

## Enhancement Opportunities

1. Dynamically adjust TEMA parameters for sensitivity optimization
2. Add momentum filter to avoid missing trends
3. Add volatility index for dynamic stop loss sizing
4. Machine learning for parameter optimization

## Summary  

The strategy overall is simple and clear in logic, identifying trend bias via TEMA crossover on multiple timeframes, and relying on additional crossover on lower TF to time entries. It has certain merits while also has some space for improvements. On the whole, it provides valuable reference for quant trading practices.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|What type of Orders: Longs+Shorts|LongsOnly|ShortsOnly|
|v_input_2|true|From Month|
|v_input_3|true|From Day|
|v_input_4|2020|From Year|
|v_input_5|true|To Month|
|v_input_6|true|To Day|
|v_input_7|9999|To Year|
|v_input_8|20|Fast Length|
|v_input_9|60|Slow Length|
|v_input_10|D|HTF Resolution|
|v_input_11|5|HTF Fast Length|
|v_input_12|15|HTF Slow Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-12-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Seltzer_

//@version=4
strategy(title="TEMA Cross +HTF Backtest", shorttitle="TEMA_X_+HTF_BT", overlay=true)

orderType = input("Longs+Shorts",title="What type of Orders", options=["Longs+Shorts","LongsOnly","ShortsOnly"])
isLong   = (orderType != "ShortsOnly")
isShort  = (orderType != "LongsOnly")

// Backtest Section {

// Backtest inputs
FromMonth = input(defval=1, title="From Month", minval=1, maxval=12)
FromDay = input(defval=1, title="From Day", minval=1, maxval=31)
FromYear = input(defval=2020, title="From Year", minval=2010)
ToMonth = input(defval=1, title="To Month", minval=1, maxval=12)
ToDay = input(defval=1, title="To Day", minval=1, maxval=31)
ToYear = input(defval=9999, title="To Year", minval=2017)

// Define backtest timewindow
start = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish = timestamp(ToYear, ToMonth, ToDay, 23, 59)  // backtest finish window
window() => true

// }

//TEMA Section {

//LTF Section
xLength = input(20, minval=1, title="Fast Length")
xPrice = close
xEMA1 = ema(xPrice, xLength)
xEMA2 = ema(xEMA1, xLength)
xEMA3 = ema(xEMA2, xLength)
xnRes = (3 * xEMA1) - (3 * xEMA2) + xEMA3
xnResP = plot(xnRes, color=color.green, linewidth=2, title="TEMA1")

yLength = input(60, minval=1, title="Slow Length")
yPrice = close
yEMA1 = ema(yPrice, yLength)
yEMA2 = ema(yEMA1, yLength)
yEMA3 = ema(yEMA2, yLength)
ynRes = (3 * yEMA1) - (3 * yEMA2) + yEMA3
ynResP = plot(ynRes, color=color.red, linewidth=2, title="TEMA2")

fill(xnResP, ynResP, color=xnRes > ynRes ? color.green : color.red, transp=65, editable=true)

//HTF Section
HTFres = input(defval="D", type=input.resolution, title="HTF Resolution")

HTFxLength = input(5, minval=1, title="HTF Fast Length")
HTFxPrice = close
HTFxEMA1 = security(syminfo.tickerid, HTFres, ema(HTFxPrice, HTFxLength), barmerge.gaps_off, barmerge.lookahead_on)
HTFxEMA2 = security(syminfo.tickerid, HTFres, ema(HTFxEMA1, HTFxLength), barmerge.gaps_off, barmerge.lookahead_on)
HTFxEMA3 = security(syminfo.tickerid, HTFres, ema(HTFxEMA2, HTFxLength), barmerge.gaps_off, barmerge.lookahead_on)
HTFxnRes = (3 * HTFxEMA1) - (3 * HTFxEMA2) + HTFxEMA3
HTFxnResP = plot(HTFxnRes, color=color.yellow, linewidth=1,transp=30, title="TEMA1")

HTFyLength = input(15, minval=1, title="HTF Slow Length")
HTFyPrice = close
HTFyEMA1 = security(syminfo.tickerid, HTFres, ema(HTFyPrice, HTFyLength), barmerge.gaps_off, barmerge.lookahead_on)
HTFyEMA2 = security(syminfo.tickerid, HTFres, ema(HTFyEMA1, HTFyLength), barmerge.gaps_off, barmerge.lookahead_on)
HTFyEMA3 = security(syminfo.tickerid, HTFres, ema(HTFyEMA2, HTFyLength), barmerge.gaps_off, barmerge.lookahead_on)
HTFynRes = (3 * HTFyEMA1) - (3 * HTFyEMA2) + HTFyEMA3
HTFynResP = plot(HTFynRes, color=color.purple, linewidth=1, transp=30, title="TEMA2")

fill(HTFxnResP, HTFynResP, color=HTFxnRes > HTFynRes ? color.yellow : color.purple, transp=90, editable=true)
bgcolor(HTFxnRes > HTFynRes ? color.yellow : na, transp=90, editable=true)
bgcolor(HTFxnRes < HTFynRes ? color.purple : na, transp=90, editable=true)

// }

// Buy and Sell Triggers
LongEntryAlert = xnRes > ynRes and HTFxnRes > HTFynRes and window()
LongCloseAlert = xnRes < ynRes and window()
ShortEntryAlert = xnRes < ynRes and HTFxnRes < HTFynRes and window()
ShortCloseAlert = xnRes > ynRes

// Entry & Exit signals
if isLong
    strategy.entry("Long", strategy.long, when = LongEntryAlert)
    strategy.close("Long", when = LongCloseAlert)

if isShort
    strategy.entry("Short", strategy.short, when = ShortEntryAlert)
    strategy.close("Short", when = ShortCloseAlert)
```

> Detail

https://www.fmz.com/strategy/436516

> Last Modified

2023-12-25 14:20:36
