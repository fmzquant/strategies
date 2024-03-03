
> Name

动量指标破位交易策略Momentum-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略采用动量指标布林带进行破位交易,主要判断价格是否突破布林带上下轨,发出买卖信号。

## 原理

该策略主要基于布林带指标判断趋势方向。布林带是由移动平均线及其标准差构成的带状区域。布林带中线是n日移动平均线,上轨是中线+2倍标准差,下轨是中线-2倍标准差。当价格接近上轨时为超买,接近下轨时为超卖。

具体来说,策略首先计算n日内最高价、最低价,并计算中间价((最高价+最低价)/2)。然后计算收盘价与中间价的距离加权移动平均构成布林带中线,中线上下各添加2倍标准差构成上下轨。

如果收盘价突破上轨,表明正在上涨趋势;如果突破下轨,表明正在下跌趋势。突破上轨时做多,突破下轨时做空。

此外,策略还引入了反向开仓机制。当价格突破布林带上轨时,如果MACD是下跌的,会采取逆市操作做空。

## 优势

1. 使用布林带判断趋势方向,具有一定的趋势跟踪能力。

2. 反向开仓设计可获取逆势利润。

3. 可自定义布林带周期、标准差倍数等参数,适应不同周期的交易。

4. 可关闭反向开仓,降低风险。

## 风险及对策

1. 布林带常用于高波动股票,可能不适合周期长Resources或指数等品种。可以测试不同周期参数的效果。

2. 突破信号可能出现假突破。可以结合其他因素过滤信号。

3. 反向开仓可能进一步扩大亏损。可以关闭反向开仓模块。

4. 回撤可能较大。可以适当调整仓位规模。

## 优化方向

1. 可以考虑加入趋势过滤,避免不明确方向的震荡市场。

2. 可以测试布林带标准差倍数,寻找更合适的参数。

3. 可以引入止损策略,以控制单笔亏损。

4. 可以优化开仓和加仓逻辑,使交易信号更清晰。

## 总结

本策略以布林带为基础指标,判断价格趋势突破进行交易。使用简单参数设定即可实现基本的趋势跟踪策略。但存在一定假突破风险,需要配合其他指标进行过滤。可进一步优化参数设定、止损策略等来控制风险。


## Overview

This strategy uses Bollinger Bands momentum indicator for breakout trading, mainly judging if price breaks through the upper or lower Bollinger Bands for trading signals.

## Principles 

The strategy is primarily based on Bollinger Bands indicator to determine trend direction. Bollinger Bands consist of a middle band based on a moving average and upper/lower bands defined by standard deviations. The middle band is a n-period moving average, the upper band is middle band + 2 standard deviations, and the lower band is middle band - 2 standard deviations. When price approaches the upper band it indicates overbought conditions, and when it approaches the lower band it signals oversold conditions.

Specifically, the strategy first calculates the highest high and lowest low over last n periods, and the middle price ((highest high + lowest low)/2). It then calculates the distance between close price and middle price, uses exponential moving average of the distance to form the middle band, and adds/subtracts 2 times standard deviation above and below to form the upper and lower bands. 

When close price breaks through the upper band, it signals an uptrend; when it breaks the lower band, it signals a downtrend. The strategy goes long when the upper band is broken, and goes short when the lower band is broken.

In addition, the strategy incorporates a counter-trend mechanism. When price breaks the upper band but MACD is falling, it will take a counter-trend short position.

## Advantages

1. Using Bollinger Bands to determine trend direction provides certain trend following capability.

2. Counter-trend design allows profiting from reversals. 

3. Customizable parameters like period and standard deviation multiples make it adaptable to different trading horizons.

4. Disable counter-trend trading to reduce risk.

## Risks and Mitigations

1. Bollinger Bands work best for high volatility stocks, may not be suitable for stable commodities or indices. Can test different period parameters.

2. Breakout signals may have false breakouts. Can add filters with other indicators.

3. Counter-trend trading can further increase losses. Can disable counter-trend module. 

4. Drawdowns may be significant. Can adjust position sizing.

## Enhancement Opportunities

1. Consider adding trend filter to avoid whipsaw in non-directional markets.

2. Test different standard deviation multiples to find optimal parameters.

3. Incorporate stop loss to control single trade loss.

4. Optimize entry and add-on logic for clearer trading signals.

## Summary

The strategy uses Bollinger Bands as the primary indicator and trades based on trend breakouts. With simple parameters it provides basic trend following capabilities. But false breakout risks exist, requiring additional filters. Parameters, stop loss and risk controls can be enhanced. Overall it serves as a reasonable baseline breakout strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|false|take, %|
|v_input_4|true|Bands Entry|
|v_input_5|false|Counter-trend entry|
|v_input_6|10|Body length|
|v_input_7|true|Trend bars|
|v_input_8|20|Period|
|v_input_9|true|Show Bands|
|v_input_10|true|Show Background|
|v_input_11|1900|From Year|
|v_input_12|2100|To Year|
|v_input_13|true|From Month|
|v_input_14|12|To Month|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-09-17 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy("Noro's Bands Scalper Strategy v1.6", shorttitle = "Scalper str 1.6", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100.0, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
takepercent = input(0, defval = 0, minval = 0, maxval = 1000, title = "take, %")
needbe = input(true, defval = true, title = "Bands Entry")
needct = input(false, defval = false, title = "Counter-trend entry")
bodylen = input(10, defval = 10, minval = 0, maxval = 50, title = "Body length")
trb = input(1, defval = 1, minval = 1, maxval = 5, title = "Trend bars")
len = input(20, defval = 20, minval = 2, maxval = 200, title = "Period")
needbb = input(true, defval = true, title = "Show Bands")
needbg = input(true, defval = true, title = "Show Background")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
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
hd2 = center + distsma * 2
ld2 = center - distsma * 2

//Trend
chd = close > hd
cld = close < ld
uptrend = trb == 1 and chd ? 1 : trb == 2 and chd and chd[1] ? 1 : trb == 3 and chd and chd[1] and chd[2] ? 1 : trb == 4 and chd and chd[1] and chd[2] and chd[3] ? 1 : trb == 5 and chd and chd[1] and chd[2] and chd[3] and chd[4] ? 1 : 0
dntrend = trb == 1 and cld ? 1 : trb == 2 and cld and cld[1] ? 1 : trb == 3 and cld and cld[1] and cld[2] ? 1 : trb == 4 and cld and cld[1] and cld[2] and cld[3] ? 1 : trb == 5 and cld and cld[1] and cld[2] and cld[3] and cld[4] ? 1 : 0
trend = dntrend == 1 and high < center ? -1 : uptrend == 1 and low > center ? 1 : trend[1]

//trend = close < ld and high < center ? -1 : close > hd and low > center ? 1 : trend[1]

//Lines
colo = needbb == false ? na : black
plot(hd2, color = colo, linewidth = 1, transp = 0, title = "High band 2")
plot(hd, color = colo, linewidth = 1, transp = 0, title = "High band 1")
plot(center, color = colo, linewidth = 1, transp = 0, title = "center")
plot(ld, color = colo, linewidth = 1, transp = 0, title = "Low band 1")
plot(ld2, color = colo, linewidth = 1, transp = 0, title = "Low band 2")

//Background
col = needbg == false ? na : trend == 1 ? lime : red
bgcolor(col, transp = 80)

//Body
body = abs(close - open)
smabody = ema(body, 30) / 10 * bodylen

//Signals
bar = close > open ? 1 : close < open ? -1 : 0
up7 = trend == 1 and ((bar == -1 and bar[1] == -1) or (body > smabody and bar == -1)) ? 1 : 0
dn7 = trend == 1 and ((bar == 1 and bar[1] == 1) or (close > hd and needbe == true)) and close > strategy.position_avg_price * (100 + takepercent) / 100 ? 1 : 0
up8 = trend == -1 and ((bar == -1 and bar[1] == -1) or (close < ld2 and needbe == true)) and close < strategy.position_avg_price * (100 - takepercent) / 100 ? 1 : 0
dn8 = trend == -1 and ((bar == 1 and bar[1] == 1) or (body > smabody and bar == 1)) ? 1 : 0

if up7 == 1 or up8 == 1 
    strategy.entry("Long", strategy.long, needlong == false ? 0 : trend == -1 and needct == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, 01, 00, 00) and time < timestamp(toyear, tomonth, 31, 00, 00)))

if dn7 == 1 or dn8 == 1
    strategy.entry("Short", strategy.short, needshort == false ? 0 : trend == 1 and needct == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, 01, 00, 00) and time < timestamp(toyear, tomonth, 31, 00, 00)))
    
if time > timestamp(toyear, tomonth, 31, 00, 00)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/427185

> Last Modified

2023-09-18 21:28:22
