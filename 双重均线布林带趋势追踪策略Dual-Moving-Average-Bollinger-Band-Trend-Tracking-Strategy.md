
> Name

双重均线布林带趋势追踪策略Dual-Moving-Average-Bollinger-Band-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a29d4e7b7290e59bdd.png)
[trans]

## 概述

该策略是一个利用布林带和均线组合进行趋势判断和入场的量化交易策略。它结合了布林带的趋势识别能力和移动平均线的滤波效应,可以有效识别市场趋势方向,在趋势方向行情中进行入场。

## 策略原理  

1. 利用最高价和最低价计算布林带通道,判断市场趋势方向

    - 最高价highest和最低价lowest计算通道上下轨
    - 通道中轴为最高价和最低价的平均价
    - 判断价格在通道上的位置确定趋势方向
    
2. 计算阳线实体大小,判断止损和反转信号

    - 阳线实体体为收盘价减开盘价的绝对值
    - 计算N周期内的阳线实体均值,与当前阳线实体大小比较,判断止损和反转

3. 在趋势方向确认后,在通道方向进行入场

    - 趋势上行时在下轨附近长入
    - 趋势下行时在上轨附近空头
    
4. 利用移动平均线进行滤波,避免虚假信号

    - 计算N周期的收盘价移动平均线
    - 只有在价格突破平均线时才发出交易信号

## 策略优势

1. 结合布林带通道和移动平均线判断趋势,系统性强

    布林带能清晰判断价格通道和趋势方向,移动平均线进行滤波,两者结合能有效识别趋势,避免市场突发事件的影响,保证系统稳定性。

2. 利用阳线实体大小进行止损,有效控制风险

    通过计算一定周期内的阳线实体大小均值,与当前周期实体大小比较,可以清晰判断趋势反转,进行止损减仓,从而有效控制策略风险。

3. 定量入场和止损规则清晰

    策略在移动平均线和通道方向配合的条件下入场,并利用阳线实体大小规则进行止损,使整个系统入场和止损规则非常清晰系统化。

## 风险分析

1. 震荡行情中潜在亏损风险

    在震荡行情中,价格可能多次触碰上下轨造成反复小幅亏损的可能。此时应减少仓位规模,降低单笔亏损。

2. 停损点过近造成波动过大被击出的风险

    在强势趋势中,价格短期回调可能触发止损规则被击出,此时应适当放宽止损幅度,追随趋势运行。

3. 参数不当引发错误信号的可能

    移动平均线和布林带的参数设置不当,可能出现错误识别信号的情况。应适当优化参数,使信号稳定可靠。


## 策略优化方向 

1. 优化移动平均线周期参数

    调整移动平均线参数,减少平滑程度,能更快发现趋势变化。

2. 测试不同止损规则效果

    尝试不同的止损规则,如跟踪止损、ATR止损等,选取最优止损方式。

3. 增加机器学习模型辅助

    基于大量历史数据训练模型,辅助判断趋势和发出交易信号。

## 总结

该策略综合考虑趋势判断与风险控制,利用布林带通道和移动平均线进行趋势识别,同时用阳线实体大小进行止损。策略系统性强,定量规则清晰,可以有效控制风险获取超额收益。后续通过参数优化和结合机器学习等方式不断改进,使策略更加稳定可靠。

||

## Overview

This strategy utilizes a combination of Bollinger Bands and moving averages for trend identification and entry. It leverages the trend recognition capability of Bollinger Bands and the filtering effect of moving averages to effectively identify market trend directions for entry in trending markets.

## Strategy Logic

1. Calculate Bollinger Channel to determine market trend direction

    - Use highest high and lowest low to calculate channel bands 
    - Channel middle band is average of high and low
    - Determine trend direction based on price location within channel
    
2. Compute bullish candle body size for stop loss and reversal signals

    - Bullish candle body is absolute value of close minus open
    - Compute N-period average of candle bodies, compare to current body for stop loss and reversal

3. Enter trades in channel direction upon trend confirmation

    - Long entries near lower band in uptrends
    - Short entries near upper band in downtrends

4. Utilize moving averages for filtration to avoid false signals

    - Compute N-period moving average of closing price 
    - Generate signals only on moving average breakthroughs

## Advantages

1. Systematic trend identification combining bands and moving averages  

    Bands clearly identify price channels and trend direction. Moving averages filter noise. Combination enables robust trend detection immune to sporadic market shocks.

2. Effective risk control via candle body stop loss

    Comparing current candle body to historical average detects trend reversal for stop loss and position reduction. Effectively controls strategy risk.

3. Clear quantitative entry and stop loss rules

    Strict moving average and channel direction requirements for entry. Candle body size stop loss rule. Makes entire system entry and exits clear and systematic.

## Risk Analysis  

1. Potential losses in range-bound markets

    Whip-sawing price oscillating around bands can cause repeated minor losses. Position sizing should be reduced to limit loss impact.

2. Premature stop loss in strong trends

    Short-term retracements can trigger stops in strong uptrends/downtrends. Stop loss width should be relaxed to ride trends. 

3. Erroneous signals from poor parameter tuning

    Suboptimal moving average and bands parameters can cause spurious signals. Parameters should be optimized for signal reliability.

## Enhancement Opportunities

1. Optimize moving average lookback period  

    Adjust period to reduce smoothing for quicker trend change detection.

2. Test alternative stop loss mechanisms   

    Evaluate trailing stops, ATR stops etc. to find optimal system.

3. Incorporate machine learning models

    Train models on extensive historical data to augment trend and signal prediction.

## Conclusion

This strategy balances trend identification and risk control using Bollinger Bands and moving averages. The systematic quantitative approach with clear entry/exit rules enables effective reward capture with controlled risk. Further improvements via parameter tuning and machine learning integration will enhance robustness.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|false|take, %|
|v_input_4|false|Counter-trend entry|
|v_input_5|20|Period|
|v_input_6|true|Show Bands|
|v_input_7|true|Show Background|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-14 00:00:00
end: 2023-12-21 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=2
strategy("Noro's Bands Scalper Strategy v1.3", shorttitle = "Scalper str 1.3", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
takepercent = input(0, defval = 0, minval = 0, maxval = 1000, title = "take, %")
needct = input(false, defval = false, title = "Counter-trend entry")
len = input(20, defval = 20, minval = 2, maxval = 200, title = "Period")
needbb = input(true, defval = true, title = "Show Bands")
needbg = input(true, defval = true, title = "Show Background")
src = close

//PriceChannel 1
lasthigh = highest(src, len)
lastlow = lowest(src, len)
center = (lasthigh + lastlow) / 2

//Distance
dist = abs(src - center)
distsma = sma(dist, len)
hd = center + distsma
ld = center - distsma
hd1 = center + distsma / 2
ld1 = center - distsma / 2

//Trend
trend = close < ld and high < center ? -1 : close > hd and low > center ? 1 : trend[1]

//Lines
colo = needbb == false ? na : black
plot(hd, color = colo, linewidth = 1, transp = 0, title = "High band")
plot(center, color = colo, linewidth = 1, transp = 0, title = "center")
plot(ld, color = colo, linewidth = 1, transp = 0, title = "Low band")

//Background
col = needbg == false ? na : trend == 1 ? lime : red
bgcolor(col, transp = 80)

//Body
body = abs(close - open)
smabody = ema(body, 30)
candle = high - low

//Engulfing
min = min(open, close)
max = max(open, close)
bar = close > open ? 1 : close < open ? -1 : 0
upeng = bar == 1 and bar[1] == -1 and min >= min[1] and max <= max[1] ? 1 : 0
dneng = bar == -1 and bar[1] == 1 and min >= min[1] and max <= max[1] ? 1 : 0

//Signals
up7 = trend == 1 and ((bar == -1 and bar[1] == -1) or (body > smabody and close < open)) ? 1 : 0
dn7 = trend == 1 and bar == 1 and bar[1] == 1 and close > strategy.position_avg_price * (100 + takepercent) / 100 ? 1 : 0
up8 = trend == -1 and bar == -1 and bar[1] == -1 and close < strategy.position_avg_price * (100 - takepercent) / 100 ? 1 : 0
dn8 = trend == -1 and ((bar == 1 and bar[1] == 1) or (body > smabody and close > open)) ? 1 : 0

if up7 == 1 or up8 == 1 
    strategy.entry("Long", strategy.long, needlong == false ? 0 : trend == -1 and needct == false ? 0 : na)

if dn7 == 1 or dn8 == 1
    strategy.entry("Short", strategy.short, needshort == false ? 0 : trend == 1 and needct == false ? 0 : na)
```

> Detail

https://www.fmz.com/strategy/436249

> Last Modified

2023-12-22 14:54:20
