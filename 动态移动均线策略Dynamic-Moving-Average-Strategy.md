
> Name

动态移动均线策略Dynamic-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1452ef713a1e54fb6ef.png)
[trans]

## 概述

本策略名为“动态移动均线策略”,主要思想是利用移动均线的方向和价格的关系来判断趋势,在趋势方向进入场内,在无趋势时平仓。

## 策略原理  

该策略使用 length 个周期的源价格来计算出移动均线,源价格可以选择 OHLC4,HLC3,收盘价等。计算出的移动均线被定义为 sma。然后根据移动均线值的比例绘制出长线和短线,通过长线和短线的位置关系来判断目前处于上涨趋势还是下跌趋势。

具体来说,短线的计算公式是:shortline = sma * ((100 + shortlevel) / 100),其中 shortlevel 是可以由使用者设定的一个正数,代表短线距离移动均线的比例。长线类似,计算公式是:longline = sma * ((100 + longlevel) / 100),longlevel 是可以由使用者设定的一个负数,代表长线距离移动均线的比例。 

这样,短线值永远大于移动均线,而长线值永远小于移动均线。当价格上穿短线时,代表进入上涨趋势,这个时候若 needlong 允许做多,则会在长线价格水平下单做多;当价格下穿长线时,代表进入下跌趋势,这个时候若 needshort 允许做空,则会在短线价格水平下单做空。

无论做多或做空,当价格重新回到移动均线时,代表趋势结束,这个时候会平掉之前的所有仓位。

这样通过长短线与移动均线的动态关系来判断趋势方向并据此入场和出场。

## 策略优势

这种策略最大的优势在于通过长短线动态设定买卖点,能比较灵活地把握主要的趋势方向。相比简单地在固定水平触发买卖点的策略,这种策略更为高级和智能。

其次,移动均线自身也有一定滤波作用,一定程度避免被高频震荡套住。同时依据移动均线水平来判断趋势是否结束时及时出场,这也非常关键。

## 策略风险

该策略最大的风险在于移动均线在不同时期的表现力度不同。正常情况下移动均线足以代表趋势方向,但是在某些极端行情中短期内移动均线可能被打穿,造成错误的入场,或者顶背离这样的情况。这时需要使用更长周期的移动均线来确保趋势判断的准确性。

风险的另一方面在于移动均线本身缓慢性较强。对于一些短小剧烈的价格波动,移动均线难以及时作出跟踪,这时可能错过入场点或出场点。需要降低周期来加快移动均线的反应速度。

## 策略优化

该策略可以在以下几个方面继续优化:
1. 增加止损逻辑。移动均线判断趋势时有滞后性,无法完全避免被套,因此适当加上移动止损可以进一步降低风险。
2. 优化长短均线的参数。目前长短均线距离移动均线的比例是固定值,可以测试不同数据集,找出最优参数。
3. 增加趋势强度判断。除了长短均线位置,也可以通过一定算法判断趋势的强度,避免弱趋势下的错误信号。
4. 可以尝试将移动均线应用于其他交易品种,进行跨品种验证。

## 总结  

本策略通过动态设定买卖点的方式进行趋势判断和对应的多空交易。这种基于移动均线动态设定交易信号的方法,相比静态触发点能更加灵活和智能地捕捉价格趋势。同时也解决了移动均线本身缺乏及时性的问题。通过系统的回测和参数优化,相信该策略可以获得良好收益。

||

## Overview  

This strategy is named "Dynamic Moving Average Strategy". The main idea is to use the direction of the moving average and its relationship with price to determine the trend. Enter the market according to the trend direction and close positions when there is no trend.  

## Strategy Principle

The strategy uses source prices over a length period to calculate the moving average, where source prices can be OHLC4, HLC3, close price etc. The resulting moving average is defined as sma. Then the long line and short line are plotted based on percentage of the moving average value to determine if we are currently in an upward or downward trend.   

Specifically, the short line is calculated as: shortline = sma * ((100 + shortlevel) / 100), where shortlevel is a positive number set by user, representing the percentage that the short line is above the moving average. The long line is similar, calculated as: longline = sma * ((100 + longlevel) / 100), where longlevel is a negative number set by user, representing the percentage that the long line is below the moving average.   

Thus, short line value is always greater than moving average, and long line value is always less than moving average. When price crosses above short line, it represents that an upward trend begins. At this time if needlong allows long, it will place a long order at the long line price level. When price crosses below long line, it represents that a downward trend begins. At this time if needshort allows short, it will place a short order at the short line price level. 

Regardless of long or short, when price moves back to the moving average, it means the trend ends. At this time it will close all previous positions.   

So the trend direction and corresponding entries and exists are determined by the dynamic relationship between the long/short lines and the moving average line.

## Advantages  

The biggest advantage of this strategy is that by dynamically setting the long and short lines, it can relatively flexibly capture the main trend direction. Compared to strategies that trigger entries and exits at fixed levels, this strategy is more advanced and intelligent.   

Secondly, the moving average itself has a filtering effect to some extent, which avoids being trapped by high frequency fluctuations to some extent. Also, exiting in a timely manner when the trend is judged to be over based on the moving average level is very critical.

## Risks   

The biggest risk of this strategy is that the performance of moving averages differs in different periods. Normally the moving average is sufficient to represent trend direction, but in some extreme market conditions, the moving average could be penetrated in the short term, causing wrong entries, or top divergence etc. In this case longer period moving averages are needed to ensure accuracy of trend judgement.

Another aspect of the risk is that moving averages themselves have high inertia. For some short and intense price fluctuations, it is difficult for moving averages to respond in time, thus missing entry or exit points. The period needs to be reduced to accelerate reaction speed of the moving average.  

## Enhancement

The strategy can be further optimized in the following aspects:

1. Add stop loss logic. Since moving averages have lag in judging trends, being trapped cannot be completely avoided. So appropriate trailing stops can further reduce risks.  

2. Optimize parameters of long/short lines. Currently the percentages long/short lines deviate from the moving average are fixed. These can be tested on different datasets to find optimal values.

3. Add trend strength judgement. Other than long/short line positions, algorithms can also judge the strength of the trend, to avoid errors from weak trend signals.  

4. Try applying moving averages to other trading products to verify cross-product performance.  

## Conclusion   

This strategy determines trend and places corresponding long/short trades by dynamically setting entry and exit points based on moving averages. This method of dynamically generating trading signals based on moving averages is more flexible and intelligent in capturing price trends compared to static trigger levels. It also solves the problem of lack of timeliness of moving averages themselves. With systematic backtesting and parameter optimization, this strategy can yield good profits.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|false|Short|
|v_input_3|100|Lot, %|
|v_input_4|3|Length|
|v_input_5_ohlc4|0|Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_6|10|Short line (red)|
|v_input_7|-5|Long line (lime)|
|v_input_8|1900|From Year|
|v_input_9|2100|To Year|
|v_input_10|true|From Month|
|v_input_11|12|To Month|
|v_input_12|true|From day|
|v_input_13|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-16 00:00:00
end: 2023-11-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=3
strategy(title = "Noro's ShiftMA Strategy v1.1", shorttitle = "ShiftMA str 1.1", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 100)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(false, defval = false, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot, %")
per = input(3, title = "Length")
src = input(ohlc4, title = "Source")
shortlevel = input(10.0, title = "Short line (red)")
longlevel = input(-5.0, title = "Long line (lime)")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//SMAs
sma = sma(src, per) 
//sma = lowest(low, per)
shortline = sma * ((100 + shortlevel) / 100)
longline = sma * ((100 + longlevel) / 100)
plot(shortline, linewidth = 2, color = red, title = "Short line")
plot(sma, linewidth = 2, color = blue, title = "SMA line")
plot(longline, linewidth = 2, color = lime, title = "Long line")

//plot(round(buy * 100000000), linewidth = 2, color = lime)
//plot(round(sell * 100000000), linewidth = 2, color = red)

//Trading
size = strategy.position_size
lot = 0.0
lot := size == 0 ? strategy.equity / close * capital / 100 : lot[1]

if (not na(close[per])) and size == 0 and needlong
    strategy.entry("L", strategy.long, lot, limit = longline, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if (not na(close[per])) and size == 0 and needshort
    strategy.entry("S", strategy.short, lot, limit = shortline, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if (not na(close[per])) and size > 0 
    strategy.entry("Close", strategy.short, 0, limit = sma, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if (not na(close[per])) and size < 0 
    strategy.entry("Close", strategy.long, 0, limit = sma, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/432975

> Last Modified

2023-11-23 11:39:24
