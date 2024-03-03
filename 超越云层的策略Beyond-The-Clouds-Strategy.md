
> Name

超越云层的策略Beyond-The-Clouds-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/db12595e65f8fb23a1.png)
[trans]

## 概述

该策略采用超级趋势指标辅助下单,并结合云层和K线颜色进行过滤,限价挂单增加获利概率。其目标是在趋势启动后快速捕捉趋势,在盘整区间降低亏损风险。

## 策略原理

1. 计算ATR周期内的最高价和最低价的平均值作为基准线。

2. 根据Factor倍数计算上轨和下轨。

3. 当收盘价大于上轨时,标记为1,小于下轨时标记为-1,其他时候保持当前状态。

4. 根据收盘价和上下轨的位置关系,实时调整止损线。

5. 根据上下轨间距的一定百分比计算云层范围。

6. 当超级趋势为1时,做多时需收盘价低于开盘价,做空时需收盘价高于开盘价。

7. 做多时,挂买入限价单,价格为上一根K线收盘价。做空时,挂卖出限价单,价格为上一根K线收盘价。

8. 过滤时间段、可关闭所有仓位。

## 优势分析

该策略结合超级趋势指标和云层概念,能够在趋势启动后快速捕捉趋势方向。与普通移动止损相比,超级趋势止损线能更快跟踪价格变化。云层过滤能避免假突破带来的亏损。限价单减少滑点损失,提高盈利能力。整体来看,该策略具有如下优势:

1. 超级趋势指标灵敏度高,跟踪趋势能力强。

2. 云层概念过滤减少假突破造成的亏损。

3. K线颜色辅助判断,避免反转。 

4. 限价单减少滑点影响,提高获利概率。

5. 可自定义时间段和仓位管理,适应不同交易需求。

## 风险分析

该策略也存在一些风险需要注意:

1. 超级趋势指标参数设置不当可能造成曲线过于灵敏,产生较多假信号。

2. 云层范围过大时,可能过滤正常突破信号,影响盈利。

3. 限价单在波动较大时难以成交,可能错过交易机会。

4. 任何跟踪止损都无法完全规避巨额亏损的系统性风险。

5. 仓位过大时,亏损也会放大,需要控制风险。

## 优化方向

该策略可从以下方面进行优化:

1. 测试不同市场和品种,寻找最佳超级趋势参数组合。

2. 设置止损幅度根据市场波动程度动态调整。

3. 优化云层范围,在滤除噪音和保留信号间取得平衡。

4. 添加仓位优化模块,让仓位大小动态跟随市场变化。 

5. 在不同时间段使用不同参数组合,适应市场节律。

6. 测试与其他指标组合使用效果。

## 总结

综上所述,该策略整体思路清晰,在捕捉趋势方面优势明显。但任何策略都无法完全规避系统性风险,需要控制仓位、持续优化来降低实际交易中可能出现的风险,最大限度发挥策略优势。该策略具有很大的发展潜力,值得进行后续的测试和优化,以适应更加多变的市场环境。

||


## Overview

This strategy uses the Super Trend indicator to assist in placing orders, and filters by cloud layers and candlestick colors to place limit orders for increasing profitability. Its goal is to quickly capture trends after they start, and reduce risk during consolidation.

## Strategy Logic

1. Calculate the average of highest and lowest prices within ATR period as the baseline.

2. Calculate the upper and lower bands based on the Factor multiplier. 

3. When close is above upper band, mark as 1; below lower band, mark as -1. Otherwise, maintain previous state.

4. Dynamically adjust stop loss line based on close price's position relative to upper/lower bands.

5. Calculate cloud layer range based on a certain percentage of upper/lower band interval.

6. For long, need close < open when Super Trend is 1. For short, need close > open when Super Trend is -1.

7. Place limit buy orders at previous bar's close price for long. Place limit sell orders for short.

8. Filter by time range, close all positions available.

## Advantage Analysis

This strategy combines Super Trend and cloud concept, which allows fast trend capturing after trend starts. Super Trend stop loss responds faster than normal moving stop loss. Cloud layers avoid losses from false breakouts. Limit orders reduce slippage and increase profitability. The main advantages are:

1. Super Trend is sensitive and tracks trends strongly.

2. Cloud layers filter reduces losses from false breakouts. 

3. Candlestick color helps avoid reversals.

4. Limit orders decrease slippage impact and increase win rate.

5. Customizable time range and position management suit different trading needs.

## Risk Analysis

There are also some risks to note:

1. Improper Super Trend parameters may cause too much sensitivity and whipsaws.

2. Excessive cloud range may filter out valid breakout signals, impacting profitability.

3. Limit orders may not get filled during high volatility, missing opportunities.

4. No stop loss can fully avoid systemic risk and huge losses. 

5. Larger position sizes also amplify losses. Need to control risks.

## Optimization Directions

This strategy can be improved in the following aspects:

1. Test different markets and instruments for optimal Super Trend parameters.

2. Dynamically adjust stop loss level based on market volatility.

3. Optimize cloud range to balance noise filtering and signal retention.

4. Add position sizing module to dynamically size positions based on market conditions.

5. Use different parameter sets for different trading sessions to adapt to market rhythms. 

6. Test effectiveness when combining with other indicators.

## Conclusion

In conclusion, this strategy has clear logic and obvious advantage in trend catching. But no strategy can completely avoid systemic risks. Need to control position sizing, keep optimizing to minimize risks in live trading, and maximize the edge. This strategy has great potential for further testing and enhancements to adapt to evolving market dynamics.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|100|Lot, %|
|v_input_4|25|cloud, % of ATR|
|v_input_5|3|Super Trend|
|v_input_6|7|ATR|
|v_input_7|true|need center of ATR?|
|v_input_8|false|need border?|
|v_input_9|1900|From Year|
|v_input_10|2100|To Year|
|v_input_11|true|From Month|
|v_input_12|12|To Month|
|v_input_13|true|From day|
|v_input_14|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-03 00:00:00
end: 2023-11-02 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy("Noro's SuperTrend Strategy v2.0 Limit", shorttitle = "STL str", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot, %")
cloud = input(25, defval = 25, minval = 5, maxval = 50, title = "cloud, % of ATR")
Factor = input(title = "Super Trend", defval = 3, minval = 1, maxval = 100)
ATR = input(title = "ATR", defval = 7, minval = 1,maxval = 100)
centr = input(true, defval = true, title = "need center of ATR?")
border = input(false, defval = false, title = "need border?")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Super Trend ATR 1
src = close
Up=hl2-(Factor*atr(ATR))
Dn=hl2+(Factor*atr(ATR))
TUp=close[1]>TUp[1]? max(Up,TUp[1]) : Up
TDown=close[1]<TDown[1]? min(Dn,TDown[1]) : Dn
Trend = close > TDown[1] ? 1: close< TUp[1]? -1: nz(Trend[1],1)
Tsl1 = Trend==1? TUp: TDown
Tsl2 = Trend==1? TDown: TUp
limit = (Tsl1 - Tsl2) / 100 * cloud
upcloud = Tsl1 - limit
dncloud = Tsl2 + limit

//Cloud
linecolor = Trend == 1 ? green : red
centercolor = centr == true ? blue : na
cloudcolor = Trend == 1 ? green : red
cline = (Tsl1 + Tsl2) / 2
P1 = plot(Tsl1, color = border == false ? na : linecolor , style = line , linewidth = 1,title = "SuperTrend ATR-1")
P2 = plot(Tsl2, color = border == false ? na : linecolor , style = line , linewidth = 1,title = "SuperTrend ATR-2")
P3 = plot(cline, color = centercolor , style = line , linewidth = 1,title = "SuperTrend Center")
P4 = plot(upcloud, color = border == false ? na : linecolor , style = line , linewidth = 1,title = "SuperTrend Center+1")
P5 = plot(dncloud, color = border == false ? na : linecolor , style = line , linewidth = 1,title = "SuperTrend Center-1")
fill(P1, P4, color = linecolor == red ? red : lime, transp = 50)
fill(P2, P5, color = linecolor == red ? red : lime, transp = 50)

//Signals
up = 0.0
dn = 0.0
up := Trend != 1 ? 0 : Trend == 1 and close < open ? close : up[1]
dn := Trend != -1 ? close * 1000 : Trend == -1 and close > open ? close : dn[1]

//Trading
size = strategy.position_size
lot = 0.0
lot := size != size[1] ? strategy.equity / close * capital / 100 : lot[1]
if true
    strategy.entry("Long", strategy.long, needlong ? lot : 0, limit = up, when = (Trend == 1 and time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    strategy.entry("Short", strategy.short, needshort ? lot : 0, limit = dn, when = (Trend == -1 and time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/430996

> Last Modified

2023-11-03 16:10:33
