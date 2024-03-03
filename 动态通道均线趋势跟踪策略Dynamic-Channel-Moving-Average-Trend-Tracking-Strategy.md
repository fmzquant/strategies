
> Name

动态通道均线趋势跟踪策略Dynamic-Channel-Moving-Average-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12472fbe51399e5028a.png)
[trans]
## 概述

本策略基于动态通道和均线的趋势跟踪原理设计。它计算价格的动态通道,通过通道上下轨判断价格趋势方向,结合均线滤波价格离散度,产生交易信号。该策略适用于中短线趋势交易。

## 原理

该策略主要基于以下原理:

1. 计算动态价格通道。通过最高价和最低价计算通道中线,通道上轨为中线+价格离散度均线,下轨为中线-价格离散度均线。

2. 判断趋势方向。当价格上穿上轨时,定义为看涨;当价格下破下轨时,定义为看跌。

3. 滤波噪音。使用一定周期的价格离散度均线,滤波价格随机波动带来的噪音。

4. 产生交易信号。看涨时,在该周期收盘价低于开盘价时产生买入信号;看跌时,在该周期收盘价高于开盘时产生卖出信号。

## 优势

该策略具有以下优势:

1. 动态通道能实时捕捉价格趋势;
2. 均线滤波能减少假信号;
3. 结合趋势方向和K线实体方向产生交易信号,避免被套。

## 风险

该策略也存在以下风险:

1. Params选取不当可能导致过度优化;
2. 震荡盘整理时容易产生错误信号;
3. 无法预测价格剧烈波动。

对应解决方法:

1. 严格的Params选择和测试;
2. 增加过滤条件,识别震荡盘整理;
3. 设置止损止盈,控制风险。

## 优化方向  

该策略可以从以下方面进行优化:

1. 测试不同周期参数的稳定性;
2. 增加VOLUME或波动度指标判断力度;
3. 结合波段、通道等判断进入和退出。

## 总结

本策略整合动态通道和均线趋势判断的思想,在中短线捕捉趋势方向中表现不俗。但也存在一定局限性,需要进一步测试优化以适应更多市场情况。

||

## Overview

This strategy is designed based on the principle of dynamic channel and moving average trend tracking. It calculates the dynamic price channel, judges the trend direction through the upper and lower rails of the channel, and generates trading signals by combining the moving average to filter price volatility. This strategy is suitable for medium and short term trend trading.  

## Principle  

The main principles of this strategy are:

1. Calculate dynamic price channel. The channel middle line is calculated from highest price and lowest price. The upper rail is middle line + price volatility MA, and the lower rail is middle line - price volatility MA.

2. Judge trend direction. When price breaks through the upper rail, it is defined as bullish. When price breaks through the lower rail, it is defined as bearish.  

3. Filter noise. Use price volatility MA of a certain period to filter noise from random price fluctuations.

4. Generate trading signals. When bullish, a buy signal is generated when close price is lower than open price in that period. When bearish, a sell signal is generated when close price is higher than open price.

## Advantages

The advantages of this strategy are:  

1. Dynamic channel can capture price trend in real time.
2. MA filter can reduce false signals. 
3. Combining trend direction and K-line entity direction to generate trading signals avoids being trapped.

## Risks

The risks of this strategy are:

1. Improper Param selection may lead to overfitting.  
2. It is easy to generate wrong signals during sideways volatility.
3. It cannot predict extreme price fluctuations.

Solutions:

1. Strict Param selection and testing.
2. Add filter conditions to identify sideways. 
3. Set stop loss/profit to control risks.

## Optimization Directions

The strategy can be optimized in following aspects:

1. Test stability of different period Params.
2. Add VOLUME or volatility indicators to judge momentum. 
3. Combine bands, channels etc. to determine entry and exit.

## Summary  

This strategy integrates the ideas of dynamic channel and MA trend judgment, and performs well in capturing trend directions in medium and short term. But there are still some limitations, which need further testing and optimization to adapt more market situations.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|20|Period|
|v_input_4|true|Color|
|v_input_5|false|Show Bands|
|v_input_6|false|Show Background|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=2
strategy("Noro's Bands Strategy v1.0", shorttitle = "NoroBands str 1.0", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
len = input(20, defval = 20, minval = 2, maxval = 200, title = "Period")
color = input(true, "Color")
needbb = input(false, defval = false, title = "Show Bands")
needbg = input(false, defval = false, title = "Show Background")
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

//up =  and trend == 1 ? 1 : 0
//dn =  and trend == -1 ? 1 : 0 

up = close < hd and trend == 1 and (close < open or color == false) ? 1 : 0
dn = close > ld and trend == -1 and (close > open or color == false) ? 1 : 0 

longCondition = up == 1
if (longCondition)
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na)

shortCondition = dn == 1
if (shortCondition)
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na)
```

> Detail

https://www.fmz.com/strategy/442523

> Last Modified

2024-02-22 15:51:48
