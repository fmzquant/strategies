
> Name

基于CCI指标的趋势跟踪策略CCI-Dual-Timeframe-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/5604b8fba9dce37b2a.png)
[trans]


## 概述

该策略是基于CCI指标的趋势跟踪策略。它使用两个不同周期的CCI指标进行交易信号生成。具体来说,它会监测一个较短周期的CCI指标是否突破一个较长周期的CCI指标,根据突破的方向来决定做多或做空。

## 策略原理  

该策略的核心逻辑是:

1. 定义两个CCI指标,ci1为14周期,ci2为56周期
2. 当ci1向上突破ci2时,做多
3. 当ci1向下突破ci2时,做空
4. 交易信号发出后,通过ci1和ci2的数值来决定持仓的平仓

做多的具体规则是:

1. ci1上穿ci2,即短周期CCI上穿长周期CCI
2. 止损条件:ci1<-50且变化率<0或ci1跌破-100

做空的具体规则是:

1. ci1下穿ci2,即短周期CCI下穿长周期CCI  
2. 止损条件:ci1>100且变化率>0或ci2上穿100

可以看出,该策略利用较短周期CCI的敏感性以及较长周期CCI的稳定性,实现了趋势的识别和跟踪。

## 策略优势

该策略具有以下优势:  

1. 利用CCI指标的优势,能够有效识别趋势
2. 双CCI设计可以过滤掉部分噪音交易
3. 通过长短周期CCI指标的组合,可以在跟踪趋势的同时控制风险
4. 策略规则简单清晰,容易理解和实现
5. 可配置性较强,CCI周期和止损条件都可以自定义

## 策略风险

该策略也存在一些风险:

1. CCI指标对于横盘和震荡行情识别能力较弱
2. 长短周期CCI可能发生背离,导致交易信号错误  
3. 止损条件设置不当可能造成较大亏损
4. 参数设置不当也会对策略收益产生较大影响

对应风险的解决方法:

1. 可以结合其他指标来判断行情,避免在震荡行情中交易
2. 增加过滤条件,避免长短周期CCI背离带来的错误信号
3. 优化和测试不同的止损条件
4. 通过回测和参数优化选择合适的参数组合

## 策略优化方向  

该策略还可以进一步优化的地方包括:  

1. 增加其他指标判断,形成更 SYSTEM 的交易系统
2. 测试不同weekday和session的收益差异
3. 结合 machine learning 方法寻找更优的参数
4. 根据不同品种特性调整参数
5. 优化开仓和平仓条件

## 总结

本策略整体来说是一个基于长短周期CCI指标突破的简单趋势跟踪策略。它能够有效识别趋势方向并跟踪趋势。同时通过止损等手段控制风险。本策略简单实用,参数调整灵活,可作为量化交易的入门策略。通过进一步优化和组合,可以形成更强大的交易系统。

|| 

## Overview

This strategy is a trend following strategy based on the CCI indicator. It generates trading signals by monitoring the crossover between two CCIs of different timeframes. Specifically, it will detect if a shorter period CCI breaks through a longer period CCI and determine long or short positions based on the breakthrough direction.

## Strategy Logic   

The core logic of this strategy is:  

1. Define two CCIs, ci1 as 14 periods, ci2 as 56 periods  
2. When ci1 breaks above ci2, go long
3. When ci1 breaks below ci2, go short  
4. Use the values of ci1 and ci2 to determine exits after signals triggered  

Specific long rules:  

1. ci1 breaks above ci2, the shorter period CCI above longer period CCI
2. Stop loss condition: ci1 <-50 and change rate < 0 or ci1 breaks below -100   

Specific short rules:

1. ci1 breaks below ci2, the shorter period CCI below longer period CCI   
2. Stop loss condition: ci1 > 100 and change rate > 0 or ci2 breaks above 100  

As we can see, this strategy takes advantage of the sensitivity of shorter period CCI and the stability of longer period CCI to identify and follow trends.  

## Advantages

The advantages of this strategy:   

1. Effectively identifies trends using the strength of CCI indicator  
2. Dual CCI design filters some noise trades  
3. The combination of long and short period CCIs controls risk while following trends  
4. Simple and clear strategy rules, easy to understand and implement
5. Highly configurable, both CCI periods and stop loss conditions are customizable   

## Risks  

There are also some risks:  

1. Weak ability to identify range-bound and volatile markets using CCI
2. Divergence may happen between long and short period CCIs, causing wrong signals
3. Improper stop loss setting may lead to huge loss  
4. Inappropriate parameter tuning also largely impacts strategy profitability   

Solutions:  

1. Incorporate other indicators to determine market condition, avoid trading in volatile period   
2. Add filters to avoid errors from CCI divergence  
3. Optimize and test different stop loss levels  
4. Find suitable parameter sets through backtesting and tuning  

## Optimization Directions   

Areas that the strategy can be further optimized:

1. Add more indicators to build a more systematic trading system  
2. Test profitability difference between weekdays and sessions  
3. Search for better parameters using machine learning  
4. Tune parameters for different products  
5. Optimize entry and exit rules  

## Conclusion  

In conclusion, this is a simple trend following strategy based on CCI crossover. It can effectively identify trend direction and follow trends. Meanwhile it controls risk via stop loss. This strategy is simple, practical, flexible in parameter tuning, and can serve as a starter quant strategy. It can be enhanced into more powerful system via further optimization and combination.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|shortlength|
|v_input_2|56|longlength|
|v_input_3|2|aa|
|v_input_4|75|Ss|
|v_input_5|10|len|
|v_input_6|9|lenTurn|
|v_input_7|26|lenStd|
|v_input_8|true|from day|
|v_input_9|true|from month|
|v_input_10|2019|from yr|
|v_input_11|13|to day|
|v_input_12|12|to month|
|v_input_13|2019|to yr|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-24 00:00:00
end: 2023-11-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="my work",calc_on_order_fills=true,currency=currency.USD, default_qty_type=strategy.percent_of_equity,commission_type=strategy.commission.percent)


source = close
shortlength=input(14)
longlength=input(56)
aa=input(2)
Ss=input(75)

//Cci part
ci1=cci(source,shortlength)   //4시간봉의 기본 cci
ci2=cci(source,longlength)   //4시간봉에서 12시봉의 cci 무빙측정

//오린간 선생님의 WT + ichimoku
len = input(10)
lenTurn = input(9)
lenStd = input(26)

wtm_e(so, l) =>
    esa = ema(so, l)
    d = ema(abs(so - esa), l)
    ci = (so - esa) / (0.015 * d)
    ema(ci, l*2+1)

alh(len) => avg(lowest(len), highest(len))
alh_src(src, len) => avg(lowest(src, len), highest(src, len))

wt = wtm_e(close,len)
turn = alh_src(wt, lenTurn)
std = alh_src(wt, lenStd)

cnt = 0
if wt > turn
    cnt:=cnt+1
if wt > std
    cnt:=cnt+1


//100,-100선
h0 = hline(100)
h1 = hline(-100)

//plot(ci,color=green)
// plot(k,color=green)
// plot(d,color=red)
plot(ci1,color=green)
plot(ci2,color=red)

plot(0,color=black)
plot(100,color=black)
plot(-100,color=black)

fill(h0,h1,color=purple,transp=95)

bgcolor(cnt==0 ? red : cnt==1 ? blue : cnt == 2 ? green : na, transp = Ss)

//기간조정

Fromday = input(defval=1, title="from day", minval=1, maxval=31)
FromMonth = input(defval=1, title="from month", minval=1, maxval=12)
FromYr = input(defval=2019, title="from yr", minval=1970)

Today = input(defval=13, title="to day", minval=1, maxval=31)
ToMonth = input(defval=12, title="to month", minval=1, maxval=12)
ToYr = input(defval=2019, title="to yr", minval=1970)

startDate = timestamp(FromYr, FromMonth, Fromday, 00, 00)
finishDate = timestamp(ToYr, ToMonth, Today, 00, 00)
Time_cond = true


/////롱

if  crossover(ci1,ci2) and change(ci2)>0 and Time_cond
    strategy.entry("go", strategy.long, comment="go")
    
strategy.close("go", (ci2<0 and ci1 <-50 and change(ci1)<0) or (crossunder(ci1,-100) and strategy.openprofit<0) and change(cnt)<0)



/////숏

if  (crossunder(ci1,ci2) and change(ci2)<0 and falling(ci1,aa)) and Time_cond
    strategy.entry("die", strategy.short, comment="die")
    
strategy.close("die", (ci2>0 and ci1 > 100 and change(ci1)>0) or (crossover(ci2,100) and strategy.openprofit<0) and change(cnt)>0)
```

> Detail

https://www.fmz.com/strategy/433076

> Last Modified

2023-11-24 10:53:07
