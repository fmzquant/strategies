
> Name

动态价格通道交易策略Dynamic-Price-Channel-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本文将介绍一种基于动态价格通道的短线交易策略。该策略通过计算价格的动态通道来判断趋势方向,并在通道突破点进行交易。

## 策略原理

该策略基于以下原理:

1. 使用最高价和最低价计算出动态价格通道。通道上轨线为最高价与通道中线之和的一半,下轨线为最低价与通道中线之差的一半。

2. 当价格突破上轨时,表明行情进入上涨趋势;当价格突破下轨时,表明行情进入下跌趋势。

3. 在上涨趋势中,当出现两个连续阴线时做多;在下跌趋势中,当出现两个连续阳线时做空。

4. 可选择进行反向开仓,即在上涨中做空,在下跌中做多,以追捧市场情绪。 

5. 可设定止盈比例,例如设置止盈点为入场价的x%,以锁定利润。

## 优势分析

该策略具有以下优势:

1. 动态通道能够实时反映市场变化,更好地判断趋势。

2. 结合趋势和数根K线的突破信号,可以过滤假突破。

3. 反向开仓可追捧市场热点,赚取超额利润。

4. 设定止盈比例能够有效控制风险。

5. 策略思路简单清晰,容易实施。

## 风险分析

该策略也存在一定风险:

1. 市场剧烈波动时,通道可能失效。应适当调整参数使通道更稳健。

2. 反向开仓易受亏损,应控制单笔亏损比例。

3. 假突破可能导致错误交易。应与趋势结合判定突破有效性。 

4. 应注意避免过于频繁交易,以控制交易成本。

## 总结

该策略整合了动态通道判断趋势、K线突破入场以及止盈思想。在参数调整适当的情况下,可以作为短线交易的有效工具。但交易者仍需注意风险控制,并结合自己的交易风格进行适当修改。

||

## Overview

This article introduces a short-term trading strategy based on dynamic price channels. It judges trend direction by calculating price dynamic channels and trades at channel breakouts.

## Strategy Logic

The strategy is based on the following logic:

1. Calculate dynamic price channels using highest and lowest prices. The upper band is the average of the highest price and channel midpoint. The lower band is the midpoint minus the difference between lowest price and midpoint.  

2. When price breaks above the upper band, an uptrend begins. When price breaks below the lower band, a downtrend begins.

3. In uptrends, go long when two consecutive bearish bars appear. In downtrends, go short when two consecutive bullish bars appear. 

4. Consider counter-trend entries to chase market momentum. For example, short in uptrends and long in downtrends.

5. Set take profit percentages, like x% of entry price, to lock in profits.

## Advantage Analysis 

The advantages of this strategy include:

1. The dynamic channels reflect market changes in real time for better trend judgment.

2. Combining trends and breakouts filters false breakouts. 

3. Counter-trend entries capitalize on market momentum for excess returns.

4. Take profit stops effectively control risks. 

5. The logic is simple and clear for easy implementation.

## Risk Analysis

There are also some risks to consider:

1. Channels may fail during volatile markets. Adjust parameters for robustness.

2. Counter-trend trades are vulnerable to losses. Control loss size.

3. Fake breakouts can cause bad trades. Confirm validity with trends.

4. Avoid overtrading to control costs.

## Conclusion

This strategy integrates dynamic channels, breakouts, and take profits. With proper tuning, it can be an effective short-term trading tool. But traders should note risk control and tailor it to their own styles.

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
start: 2022-09-09 00:00:00
end: 2023-09-15 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=2
strategy("Noro's Bands Scalper Strategy v1.1", shorttitle = "Scalper str 1.1", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
takepercent = input(0, defval = 0, minval = 0, maxval = 1000, title = "take, %")
needct = input(false, defval = false, title = "Counter-trend entry")
len = input(20, defval = 20, minval = 2, maxval = 200, title = "Period")
needbb = input(true, defval = true, title = "Show Bands")
needbg = input(true, defval = true, title = "Show Background")
src = close

//PriceChannel
lasthigh = highest(src, len)
lastlow = lowest(src, len)
center = (lasthigh + lastlow) / 2

//Distance
dist = abs(src - center)
distsma = sma(dist, len)
hd = center + distsma
ld = center - distsma
hd2 = center + distsma * 2
ld2 = center - distsma * 2

//Trend
sma = sma(close, 20)
smatrend = close > sma ? 1 : close < sma ? -1 : smatrend[1]
trend = close < ld and high < hd ? -1 : close > hd and low > ld ? 1 : trend[1]

//Lines
colo = needbb == false ? na : black
plot(hd, color = colo, linewidth = 1, transp = 0, title = "High band")
plot(center, color = colo, linewidth = 1, transp = 0, title = "center")
plot(ld, color = colo, linewidth = 1, transp = 0, title = "Low band")

//Background
col = needbg == false ? na : trend == 1 ? lime : red
bgcolor(col, transp = 80)

//Signals
bar = close > open ? 1 : close < open ? -1 : 0
up7 = trend == 1 and bar == -1 and bar[1] == -1 ? 1 : 0
dn7 = trend == 1 and bar == 1 and bar[1] == 1 and close > strategy.position_avg_price * (100 + takepercent) / 100 ? 1 : 0
up8 = trend == -1 and bar == -1 and bar[1] == -1 and close < strategy.position_avg_price * (100 - takepercent) / 100 ? 1 : 0
dn8 = trend == -1 and bar == 1 and bar[1] == 1 ? 1 : 0

if up7 == 1 or up8 == 1
    strategy.entry("Long", strategy.long, needlong == false ? 0 : trend == -1 and needct == false ? 0 : na)

if dn7 == 1 or dn8 == 1
    strategy.entry("Short", strategy.short, needshort == false ? 0 : trend == 1 and needct == false ? 0 : na)
```

> Detail

https://www.fmz.com/strategy/426995

> Last Modified

2023-09-16 19:01:26
