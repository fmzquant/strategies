
> Name

基于Price-Channel和均线的趋势跟踪策略Price-Channel-and-Moving-Average-Based-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10baa58e8ca203f6839.png)
[trans]
## 概述

该策略通过构建Price Channel,计算价格偏离中心线的距离,再结合均线过滤信号,实现对趋势的识别和跟踪。当价格突破Channel时产生交易信号。该策略同时具有趋势跟踪和突破两个特点。

## 策略原理

1. 构建Price Channel
 
 - 计算最近len周期内的最高价和最低价
 - 中心线为最高价和最低价的平均值
 - 距离为价格与中心线的绝对偏差
 - 平滑距离求得上轨和下轨

2. 判断趋势方向

 - 当价格低于下轨,定义为跌趋势
 - 当价格高于上轨,定义为涨趋势

3. 产生交易信号

 - 涨趋势下,价格低于开盘价或下破上轨时做多
 - 跌趋势下,价格高于开盘价或上破下轨时做空

## 优势分析

1. 能捕捉中长线趋势
2. 结合突破信号,避免在震荡区间无效交易
3. 可定制参数,适应不同品种

## 风险分析

1. 震荡趋势下,可能出现较多小亏损
2. 参数设置不当可能错过趋势反转
3. 需关注交易频率,防止过度交易

## 优化方向

1. 结合其他指标过滤信号
2. 动态调整Price Channel参数
3. 加入止损机制,优化资金管理

## 总结

该策略整体较为稳健,能有效跟踪中长线趋势,同时结合趋势突破产生交易信号。通过参数优化和信号过滤可进一步改进策略,使之能适应更多品种和市场环境。

||

## Overview

This strategy identifies and follows trends by constructing a Price Channel to calculate the deviation of price from the middle line and using moving averages to filter signals. Trading signals are generated when price breaks through the Channel. The strategy has both trend following and breakout characteristics.

## Strategy Logic

1. Build Price Channel

 - Calculate highest high and lowest low over the past len periods
 - Middle line is average of highest high and lowest low
 - Distance is absolute deviation of price from middle line  
 - Smooth distance to get upper and lower bands

2. Determine Trend Direction

 - When price is below lower band, define as downtrend
 - When price is above upper band, define as uptrend

3. Generate Trading Signals

 - In uptrend, long when price is below open or breaks below upper band 
 - In downtrend, short when price is above open or breaks above lower band

## Advantage Analysis 

1. Captures mid- to long-term trends
2. Combines with breakout signals to avoid ineffective trading in range-bound markets
3. Customizable parameters suit different products  

## Risk Analysis

1. More minor losses possible in oscillating trends
2. Inappropriate parameter settings may miss trend reversals
3. Monitor trade frequency to prevent overtrading

## Optimization Directions

1. Add other indicators to filter signals
2. Dynamically adjust Price Channel parameters
3. Incorporate stop loss to optimize risk management

## Conclusion

The strategy is overall quite robust in tracking mid- to long-term trends effectively while generating trading signals through trend breakouts. Further improvements can be made through parameter optimization and signal filtering to adapt the strategy to more products and market environments.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|20|Period|
|v_input_4|true|Color|
|v_input_5|true|Show Bands|
|v_input_6|true|Show Background|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-30 00:00:00
end: 2024-02-05 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=2
strategy("Noro's Bands Strategy v1.1", shorttitle = "NoroBands str 1.1", overlay=true)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
len = input(20, defval = 20, minval = 2, maxval = 200, title = "Period")
color = input(true, "Color")
needbb = input(true, defval = false, title = "Show Bands")
needbg = input(true, defval = false, title = "Show Background")
src = close

//PriceChannel 1
lasthigh = highest(src, len)
lastlow = lowest(src, len)
center = (lasthigh + lastlow) / 2

//dist
dist = abs(src - center)
distsma = sma(dist, len)
hd = center + distsma
ld = center - distsma

//Trend
trend = close < ld and high < hd ? -1 : close > hd and low > ld ? 1 : trend[1]

//Lines
colo = needbb == false ? na : black
plot(hd, color = colo, linewidth = 1, transp = 0, title = "High band")
plot(center, color = colo, linewidth = 1, transp = 0, title = "center")
plot(ld, color = colo, linewidth = 1, transp = 0, title = "Low band")

//Background
col = needbg == false ? na : trend == 1 ? lime : red
bgcolor(col, transp = 90)

//Signals
up = trend == 1 and ((close < open or color == false) or close < hd) ? 1 : 0
dn = trend == -1 and ((close > open or color == false) or close > ld) ? 1 : 0 

longCondition = up == 1
if (longCondition)
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na)

shortCondition = dn == 1
if (shortCondition)
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na)
```

> Detail

https://www.fmz.com/strategy/441138

> Last Modified

2024-02-06 09:46:23
