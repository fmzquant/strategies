
> Name

一种基于三重SMA自动追踪策略Triple-SMA-Auto-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17d9bc0882a12c923ba.png)
[trans]
## 概述

三重SMA策略是一种基于三条不同周期的简单移动平均线进行趋势判断和entries的策略。它可以自动追踪趋势,利用趋势中的回调进行加仓建仓。

## 策略原理

该策略使用三条不同周期的SMA作为主要的趋势判断指标,包括200周期、400周期和600周期的SMA。价格在三条SMA之上时判断为上涨趋势,反之则为空头趋势。

作为entries指标,策略结合使用close价格和StochClose振荡器。只有当价格与三重SMA的方向一致时才会发出信号。StochClose指标用于判断是否过量或超卖,当StochClose上穿95时做多,下穿5时做空。

止损标准为当价格触及最慢的SMA时止损。

策略可以进行加仓,最大加仓次数为10次。并设置了三个不同比例的止盈,分别为1%、2%和6%。

## 优势分析

三重SMA策略最大的优势在于,通过组合使用三条不同周期的SMA,能较好地判断趋势的方向和力度。比单一SMA具有更强的过滤假信号的能力。

另外,结合StochClose指标判断是否超买超卖,可以避免在趋势反转点附近进场,从而减少错误的entries。 

止损标准简单直接,将最慢周期的SMA作为止损线,可以最大限度避免止损过早。

允许加仓也使得策略可以持续追踪趋势获利。

## 风险分析

该策略主要的风险在于,三条SMA未必能完全过滤掉所有假信号,价格突破后如果不能形成趋势再次回调,则可能造成损失。这种情况通常发生在重要支撑阻力附近。 

此外,StochClose指标本身也会产生错误信号,导致不适当的entries。这种情况通常会在价格震荡区间发生。

为降低这些风险,可以适当调整SMA的周期;或者增加其他指标进行组合判断,如KDJ、MACD等,确保进入的信号质量。

## 优化方向  

该策略可以从以下几个方面进行优化:

1. 增加或调整SMA的周期数,找到更适合具体品种的周期参数

2. 增加其他指标进行组合判断,如KDJ、MACD等,提高entries质量

3. 优化止盈止损标准,使其更加贴合市场的波动范围

4. 优化加仓的次数和比例,找到更适合的加仓策略   

5. 测试不同的品种参数,使策略参数全面适应更多品种

## 总结

三重SMA策略整体而言是一个非常实用的趋势跟踪策略。它通过组合应用三条不同周期的SMA以及StochClose指标,实现了较好的趋势判断效果,能有效避免错误信号。同时允许适当加仓,从而能始终跟踪趋势参与profit。通过参数调整和优化,该策略可以成为一个强劲的趋势跟踪机器。

||

## Overview

The Triple SMA strategy is a trend-following strategy based on three simple moving averages (SMA) of different periods for trend identification and entries. It can automatically track trends and add positions during pullbacks in trends.

## Strategy Logic

The strategy uses three SMAs of different periods as the main trend indicator, including 200-, 400-, and 600-period SMAs. When price is above all three SMAs, it indicates an upward trend, and vice versa for downtrend.

For entries, the strategy combines the use of close price and StochClose oscillator. Signals are generated only when price aligns with the triple SMAs’ direction. StochClose identifies overbought/oversold levels and gives long signal when crossing above 95 and short signal when crossing below 5.  

The stop loss is set to price crossing below the slowest SMA.  

The strategy allows pyramiding up to 10 times. Three take profit levels are built-in at 1%, 2% and 6% profits.

## Advantage Analysis   

The biggest advantage of the Triple SMA strategy is that by combining three SMAs of different periods, it can better identify trend direction and strength. It has stronger capabilities of filtering out false signals than single SMA strategies.

Additionally, incorporating StochClose for overbought/oversold analysis avoids taking signals around potential trend reversal points.

The stop loss based on the slowest SMA also maximizes the strategy's capability of riding trends while minimizing premature stop outs.

Allowing pyramiding enables the strategy to continously participate in trends.

## Risk Analysis

The main risk of this strategy is that the triple SMAs may not completely filter out all false signals. If price fails to form a trend after breaking through the SMAs and pulls back soon, losses can occur. This often happens around major support/resistance levels.

Also, StochClose itself may generate incorrect signals, leading to inappropriate entries, especially in ranging markets.

To mitigate these risks, parameters like SMA periods can be adjusted. More indicators can be added, like KDJ and MACD, to improve signal quality. 

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Add/tune SMA periods to find optimal values fitting specific products  

2. Add additional indicators like KDJ and MACD for combo filtering and better entries

3. Optimize stop loss and take profit standards to better fit market volatility ranges

4. Optimize pyramiding settings to find ideal pyramiding strategies

5. Test across different products and make parameters adaptive to more products

## Conclusion

In conclusion, the Triple SMA strategy is a very practical trend-following approach. By combining triple SMAs and StochClose, it achieves solid trend identification and avoids false signals. Allowing pyramiding also enables tracking trends. With parameter tuning and optimizations, it can become a powerful trend tracker.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|sma 1 length|
|v_input_2|400|sma 2 length|
|v_input_3|600|sma 3 length|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|50|length for the oscillator|
|v_input_6|5|oscillator smoothing|
|v_input_7|95|signal when oscillator crosses above|
|v_input_8|5|signal when oscillator crosses below|
|v_input_9|2500|max orders filled on a day|
|v_input_10|true|take profit level 1|
|v_input_11|2|take profit level 2|
|v_input_12|6|take profit level 3|
|v_input_13|30|take profit quantity first|
|v_input_14|30|take profit quantity second|
|v_input_15|30|take profit quantity third|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Tripla Sma with entries based on sma price closes ", shorttitle="TRIPLE SMA STRATEGY", overlay=true) ////resolution=""
len = input(200, minval=1, title="sma 1 length")
len1 = input(400, minval=1, title="sma 2 length")
len2 = input(600, minval=1, title="sma 3 length")
src = input(close, title="Source")
////////////////////////////////////////////
smma = 0.0
smma := na(smma[1]) ? sma(src, len) : (smma[1] * (len - 1) + src) / len

up = smma > smma [1]
down =smma < smma[1]
mycolor = up ? #64b5f6 : down ? #d32f2f : na
fastma = sma(hl2, 1)

fastplot = plot(fastma, color=#000000, transp=100, title='sma on candle')
slowplot = plot(smma, color=mycolor, transp=55, title='sma1')

////////////////////////////////////////////
smma1 = 0.0
smma1 := na(smma1[1]) ? sma(src, len1) : (smma1[1] * (len1 - 1) + src) / len1

up2 = smma1 > smma1 [1]
down2 =smma1 < smma1[1]

mycolor2 = up2 ? #64b5f6 : down2 ? #d32f2f : na
slowplot2 = plot(smma1, color=mycolor2, transp=45, title='sma2')

////////////////////////////////////////////
smma2 = 0.0
smma2 := na(smma2[1]) ? sma(src, len2) : (smma2[1] * (len2 - 1) + src) / len2

up3 = smma2 > smma2 [1]
down3 =smma2 < smma2[1]

mycolor3 = up3 ? #64b5f6 : down3 ? #d32f2f : na
slowplot3 = plot(smma2, color=mycolor3, transp=35, title='sma3')

////////////////////////////////////////////////////////////////////////////////////////
//Fill gaps
fillData = smma > fastma
fillData2 = smma < fastma

fillDtat = smma1 > smma
fillDtat2 = smma1 < smma

fillDat = smma2 > smma1
fillDat2 = smma2 < smma1


fillCol1 = fillData ? #ef5350 : fillData2 ? #64b5f6 : na
fillCol2 = fillDtat ? #ef5350 : fillDtat2 ? #64b5f6 : na
fillCol3 = fillDat ? #ef5350 : fillDat2 ? #64b5f6 : na


fill(slowplot, fastplot, color=fillCol1, transp=90, title="sma1 fill")
fill(slowplot, slowplot2, color=fillCol2, transp=80, title="sma2 fill")
fill(slowplot2, slowplot3, color=fillCol3, transp=60, title="sma3 fill")

uc = (close > smma) and (close > smma1)
dc = (close < smma) and (close < smma1)

barColor = uc ? #64b5f6 : dc ? #e91e63 : #b2b5be
barcolor(color=barColor)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//StochClose from @trendinvestpro 
periods = input(50, minval=1, title="length for the oscillator")
smooth = input(5, minval=1, title="oscillator smoothing")
hhc=highest(close,periods)
llc=lowest(close,periods)
StochClose = sma((close-llc)/(hhc-llc)*100, smooth)

shortline = input(95, minval=0, title="signal when oscillator crosses above")
longline = input(5, minval=0, title="signal when oscillator crosses below")

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
longs = close > smma2
shorts = close < smma2



long = longs == true and crossunder(StochClose, longline)
short = shorts == true and crossover(StochClose, shortline)

stoplong = close < smma and close < smma1 and close < smma2
stopshort = close > smma and close > smma1 and close > smma2

p1 = strategy.position_avg_price / 100 / syminfo.mintick

maxx = input(2500, title="max orders filled on a day", minval=0)
takeprofit1 = input(1, title="take profit level 1", minval=0)
takeprofit2 = input(2, title="take profit level 2", minval=0)
takeprofit3 = input(6, title="take profit level 3", minval=0)

takeprofitqt1 = input(30, title="take profit quantity first", minval=0)
takeprofitqt2 = input(30, title="take profit quantity second", minval=0)
takeprofitqt3 = input(30, title="take profit quantity third", minval=0)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////Strategy entries/////////////////////////////////////////////////////////////////////////////////////////
// strategy.risk.max_intraday_filled_orders(maxx)
strategy.entry("long", strategy.long, when=long)
strategy.exit("tpl1", "long", qty_percent = takeprofitqt1, profit = takeprofit1 * p1)
strategy.exit("tpl2", "long", qty_percent = takeprofitqt2, profit = takeprofit2 * p1)
strategy.exit("tpl3", "long", qty_percent = takeprofitqt3, profit = takeprofit3 * p1)
strategy.close("long", when=stoplong == true)


strategy.entry("short", strategy.short, when=short)
strategy.exit("tpl1", "short", qty_percent = takeprofitqt1, profit = takeprofit1 * p1)
strategy.exit("tpl2", "short", qty_percent = takeprofitqt2, profit = takeprofit2 * p1)
strategy.exit("tpl3", "short", qty_percent = takeprofitqt3, profit = takeprofit3 * p1)
strategy.close("short", when=stopshort == true)



```

> Detail

https://www.fmz.com/strategy/440085

> Last Modified

2024-01-26 15:05:58
