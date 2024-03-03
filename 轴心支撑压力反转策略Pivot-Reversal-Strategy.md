
> Name

轴心支撑压力反转策略Pivot-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

轴心支撑压力反转策略是一种突破交易策略,它结合轴心支撑压力位的概念,在价格突破轴心位时进行反向操作。该策略简单易懂,容易实现,是一种短线突破交易策略。

## 策略原理

该策略首先计算指定周期(如4根K线)的最高价和最低价,作为轴心支撑位和轴心压力位。然后实时监控价格行情,判断价格是否突破轴心位。具体来说:

1. 用pivothigh()函数计算最高价,得到轴心压力位swh
2. 用pivotlow()函数计算最低价,得到轴心支撑位swl
3. 当价格上涨突破轴心压力位swh时,做空头交易(策略.short)
4. 当价格下跌突破轴心支撑位swl时,做多头交易(策略.long)

该策略逻辑简单清晰,主要就是判断价格突破轴心位时进行反向操作。同时,策略加入了交易时间控制逻辑,只在指定的时间范围内交易,从而避免了隔夜风险。

## 优势分析

这种轴心反转策略具有以下几点优势:

1. 策略思路简单,容易理解和实现,适合初学者学习;
2. 利用轴心位判断趋势反转点,不易受到短期市场噪音的影响;  
3. 只在突破轴心位时才交易,避免不必要的交易频率过高;
4. 加入了交易时间控制,有助于规避隔夜带来的风险;
5. 代码量少,资源占用低,易于策略优化。

## 风险分析

该策略也存在一些风险需要注意:

1. 轴心位并不能百分百预测价格趋势,存在错误突破的可能;
2. 仅靠轴心位判断趋势转向容易造成过早入场,应结合其它指标确定交易信号; 
3. 未考虑大盘走势和个股特质,存在系统性风险;
4. 支撑压力位靠近时,突破效果可能不明显,应适当放宽止损范围。

为控制风险,建议优化时可考虑加入移动止损,把握大趋势方向,并配合股票和大盘选择,降低错误突破率。

## 优化方向 

考虑到该策略存在的风险,未来可以从以下几个方向进行优化:

1. 优化轴心位参数,如增加计算周期长度,看是否可以提高突破成功率;

2. 加入移动止损机制,跟踪大趋势,减少反转带来的风险;

3. 结合其它指标如MACD等判断趋势,避免错误突破带来的风险;  

4. 对股票分类,区分不同特质,设定不同的参数;

5. 优化交易时间段,考虑美股、港股等不同时区交易时间;

6. 考虑大盘整体走势,有选择地进行交易。

## 总结

总体来说,轴心支撑压力反转策略是一个非常适合初学者学习的简单突破策略。它利用轴心位判断反转时机,策略思路清晰易懂。同时也存在一些风险,需要对参数、止损、交易时间等进行优化,并辅以其它技术指标判断。如果能控制好风险,它可以成为一个非常实用的短线交易策略。

|| 

## Overview 

The Pivot Reversal Strategy is a breakout trading strategy that combines the concept of pivot support and resistance levels. It takes reverse positions when the price breaks through the pivot levels. The strategy is simple and easy to implement, making it a short-term breakout trading strategy.

## Strategy Logic

The strategy first calculates the highest and lowest prices over a specified period (e.g. 4 bars) as the pivot resistance and support levels. It then monitors price action in real-time and determines if the price breaks through the pivot levels. Specifically:

1. Use the pivothigh() function to calculate the highest price for the pivot resistance swh
2. Use the pivotlow() function to calculate the lowest price for the pivot support swl  
3. Go short (strategy.short) when prices break above the pivot resistance swh
4. Go long (strategy.long) when prices break below the pivot support swl

The strategy logic is simple and clear - take reverse positions when prices break pivotal levels. It also incorporates trading hour control to avoid overnight risks.

## Advantage Analysis

The pivot reversal strategy has several advantages:

1. The strategy idea is simple and easy to understand for beginners.
2. Using pivot levels to determine trend reversal is robust against short-term market noise.
3. Only trading on pivotal breakouts avoids excessive trade frequencies. 
4. Trading hour control helps avoid overnight risks.
5. The concise code is easy to optimize.

## Risk Analysis

There are also some risks to note:

1. Pivot levels do not guarantee perfect trend prediction and false breakouts are possible.
2. Pivotal signals alone may cause premature entry. Other indicators should confirm the trading signal.
3. It does not consider market regime and individual stock traits, leading to systemic risks. 
4. Blurred support and resistance increase the chance of failure in breakouts.

To control risks, recommended optimizations include using moving stop loss to follow the major trend, pairing stocks with market conditions, and reducing false breakout rates.

## Optimization Directions

Considering the risks, future optimizations can focus on:

1. Optimizing pivot parameters like increasing calculation period to improve success rate.

2. Adding moving stop loss to follow the major trend and reduce reversal risks.

3. Incorporating other indicators like MACD to confirm trend and avoid false breakouts.

4. Classifying stocks by traits and setting unique parameters.

5. Optimizing trading hours for different markets like US and HK stocks. 

6. Considering overall market trend for selective trading.

## Conclusion

Overall, the Pivot Reversal Strategy is a great simple breakout strategy for beginners to learn. It identifies reversal levels cleanly using pivot points. While risks exist, optimizing parameters, stop loss, trading hours and incorporating indicators can turn it into a robust short-term trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|From Month|
|v_input_2|true|From Day|
|v_input_3|2018|From Year|
|v_input_4|true|To Month|
|v_input_5|true|To Day|
|v_input_6|9999|To Year|
|v_input_7|4|leftBars|
|v_input_8|2|rightBars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-18 00:00:00
end: 2023-09-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Pivot Reversal Strategy", overlay=true)

// === BACKTEST RANGE ===
FromMonth = input(defval = 2, title = "From Month", minval = 1)
FromDay   = input(defval = 1, title = "From Day", minval = 1)
FromYear  = input(defval = 2018, title = "From Year", minval = 2014)
ToMonth   = input(defval = 1, title = "To Month", minval = 1)
ToDay     = input(defval = 1, title = "To Day", minval = 1)
ToYear    = input(defval = 9999, title = "To Year", minval = 2014)


leftBars = input(4)
rightBars = input(2)

swh = pivothigh(leftBars, rightBars)
swl = pivotlow(leftBars, rightBars)

swh_cond = not na(swh)

hprice = 0.0
hprice := swh_cond ? swh : hprice[1]

le = false
le := swh_cond ? true : (le[1] and high > hprice ? false : le[1])

if (le)
    strategy.entry("PivRevLE", strategy.long, comment="PivRevLE", stop=hprice + syminfo.mintick)

swl_cond = not na(swl)

lprice = 0.0
lprice := swl_cond ? swl : lprice[1]


se = false
se := swl_cond ? true : (se[1] and low < lprice ? false : se[1])

if (se)
    strategy.entry("PivRevSE", strategy.short, comment="PivRevSE", stop=lprice - syminfo.mintick)

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/427907

> Last Modified

2023-09-26 17:38:56
