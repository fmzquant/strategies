
> Name

诺罗波动通道scalping策略Noros-Price-Channel-Scalping-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/104d580b14467d9ab07.png)
[trans]

## 概述

诺罗波动通道scalping策略(Noro's Price Channel Scalping Strategy)是一个基于价格通道和价格波动带的scalping交易策略。该策略利用价格通道和价格波动带来识别市场趋势,并在趋势方向发生转折时进行入场。

## 策略原理

该策略首先计算价格的最高价通道(lasthigh)和最低价通道(lastlow),然后计算出价格通道中线(center)。接着计算价格与中线的距离(dist)以及距离的简单移动平均(distsma)。 据此可以计算出距离中线1倍(hd和ld)和2倍(hd2和ld2)的价格波动带。

当价格上穿距离中线1倍的波动带时判断为看涨,当价格下穿距离中线1倍的波动带时判断为看跌。策略在衰竭的迹象出现时进行反向开仓。例如在看涨的趋势下,如果出现两根阳线,则在第二根阳线收盘时做空;在看跌的趋势下,如果出现两根阴线,则在第二根阴线收盘时做多。

## 策略优势

1. 利用价格通道判断市场趋势方向,避免错误交易
2. 基于价格波动带来判断趋势是否衰竭,精确捕捉转折点
3. 采用scalping交易方式,获利快速

## 策略风险

1. 价格震荡大时,价格通道和波动带可能失效
2. scalping交易需要较高的交易频率,容易增加交易成本和滑点风险
3. 需要充分考虑止损策略,以控制亏损风险

## 策略优化

1. 优化价格通道和波动带的参数,适应更多市场情况
2. 结合其他指标判断趋势和转折点
3. 增加止损策略
4. 考虑交易成本和滑点的影响

## 总结

诺罗波动通道scalping策略整体来说是一个非常适合scalping交易的策略。它利用价格通道和波动带判断市场走势,并在见顶或见底迹象出现时反向开仓。该策略交易频率高、获利快速,但也面临一定的风险。通过进一步优化,可以使该策略在更多不同市场中应用。

|| 

## Overview  

Noro's Price Channels Scalping Strategy is a scalping trading strategy based on price channels and volatility bands. This strategy uses price channels and volatility bands to identify market trends and takes positions when trend reversals occur.

## Strategy Logic

The strategy first calculates the highest price channel (lasthigh) and lowest price channel (lastlow) of the price, then calculates the middle line of the price channel (center). Next, it calculates the distance (dist) between the price and the middle line as well as the simple moving average of the distance (distsma). Based on this, the volatility bands of 1 time (hd and ld) and 2 times (hd2 and ld2) the distance from the middle line can be calculated.  

When the price breaks through the volatility band of 1 time the distance from the middle line, it is judged as bullish. When the price breaks through the volatility band below the middle line, it is judged as bearish. The strategy opens positions in reverse when signs of exhaustion occur in trends. For example, in an uptrend, if there are two yang lines, short positions will be opened on the close of the second yang line; in a downtrend, if there are two yin lines, long positions will be opened on the close of the second yin line.

## Advantages of the Strategy

1. Use price channels to determine market trend direction and avoid trading errors  
2. Use volatility bands to judge whether the trend is exhausted and accurately capture turning points
3. Adopt scalping trading to earn profits quickly

## Risks of the Strategy  

1. Price channels and volatility bands may fail when price fluctuations are large
2. Scalping trading requires high trading frequency, which can increase trading costs and slippage risks  
3. Stop loss strategies need to be fully considered to control loss risks

## Optimization of the Strategy

1. Optimize parameters of price channels and volatility bands to adapt to more market conditions  
2. Incorporate other indicators to determine trends and turning points  
3. Increase stop loss strategies  4. Consider impacts of trading costs and slippage

## Conclusion  

In general, Noro's Price Channels Scalping Strategy is a strategy very suitable for scalping trading. It uses price channels and volatility bands to determine market trends, and opens reverse positions when topping or bottoming signs appear. The strategy has high trading frequency, fast profit-making, but also faces certain risks. Further optimization can enable the strategy to be applied in more different markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|20|Period|
|v_input_4|true|Show Bands|
|v_input_5|true|Show Background|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-10 00:00:00
end: 2023-12-10 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=2
strategy("Noro's Bands Scalper Strategy v1.0", shorttitle = "Scalper str 1.0", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
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
dn7 = trend == 1 and bar == 1 and bar[1] == 1 and close > strategy.position_avg_price ? 1 : 0
up8 = trend == -1 and bar == -1 and bar[1] == -1 and close < strategy.position_avg_price ? 1 : 0
dn8 = trend == -1 and bar == 1 and bar[1] == 1 ? 1 : 0

if up7 == 1 or up8 == 1
    strategy.entry("Long", strategy.long, needlong == false ? 0 : trend == -1 ? 0 : na)

if dn7 == 1 or dn8 == 1
    strategy.entry("Short", strategy.short, needshort == false ? 0 : trend == 1 ? 0 : na)
```

> Detail

https://www.fmz.com/strategy/435019

> Last Modified

2023-12-11 17:06:27
