
> Name

一目均衡策略Ichimoku-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

一目均衡策略运用均线的理念,采用一目均线和价格的关系来判断趋势方向,属于趋势跟踪策略。当价格上穿均线时做多,下穿时做空,跟随趋势运行。

### 原理解析

该策略主要基于一目均线的理念,核心运用`donchian()`函数计算一定周期内的最高价和最低价的平均值,作为均值线。然后判断价格是否突破该均值线,从而产生交易信号。

具体来说,策略首先计算`Ten`周期的一目均线`TS`,作为参考线。当价格上穿均线时,认为进入趋势行情,产生做多信号;当价格下穿均线时,认为趋势反转,产生做空信号。

此外,策略还计算`Kij`周期的均值线`KS`,和`TS`线结合,形成过滤条件,避免错信号。只有当`TS`线上穿`KS`线时,才会触发做多信号。

代码中还绘制了云图,判断云图的位置关系,辅助判断趋势方向。并计算`Chikou`线,判断其与价格的关系,作为辅助条件。

### 优势分析

- 使用均线判断趋势,原理简单易懂
- 结合云图增加判断依据,提高准确性 
- 增加`Chikou`线作为辅助条件,进一步过滤信号
- 采用不同参数均线组合,可以灵活调整

### 风险分析

- 均线策略对参数敏感,不同周期参数效果差异大
- 纯跟踪均线,无法判断趋势和区间,存在亏损风险
- 无法处理盘整周期,容易发出错误信号
- 云图辅助判断不稳定,可能产生误导

可以考虑结合趋势指标如MACD判断,再产生信号;采用均线多组合系统,提高稳定性;或加入止损策略控制风险。

### 优化方向

- 增加动量指标组合,判断趋势强弱
- 考虑多均线系统,如多均线黄金交叉
- 增加通道和波动率指标,判断盘整区间
- 优化参数,寻找最佳周期组合
- 加入止损策略,控制单笔损失

### 总结

一目均衡策略整体来说比较简单直接,适合作为初学者入门,通过均线理解趋势;同时也可进行多指标组合,丰富系统效果。但本策略的实盘效果还有待验证,仍需不断优化测试,才能用于实盘交易。关键是要控制风险,不能盲目跟随均线,在实盘中需审时度势运用。

||


## Overview

The Ichimoku Breakout strategy utilizes the concept of moving averages and uses the relationship between Ichimoku lines and price to determine the trend direction. It belongs to the trend following strategy. It goes long when the price breaks above the lines and goes short when the price breaks below the lines, following the trend.

## Principle Analysis

The core of this strategy is based on the theory of Ichimoku lines. It uses the `donchian()` function to calculate the average of highest high and lowest low over a certain period as the equilibrium line. It then judges if the price breaks through this line to generate trading signals. 

Specifically, the strategy first calculates the Tenkan Line (`TS`) using the `Ten` period, as a reference line. When the price breaks above the line, it is considered a trending move and generates a long signal. When the price breaks below the line, it is considered as trend reversal and generates a short signal.

In addition, the strategy calculates the Kijun Line (`KS`) using the `Kij` period. Together with the `TS` line, it acts as a filter to avoid false signals. Only when `TS` crosses above `KS` will a long signal be triggered.

The code also plots the Ichimoku Cloud to assist with trend direction judgement. The Chikou Line is calculated to determine its relationship with price as an auxiliary condition.

## Advantage Analysis

- Uses moving average to determine trend, simple and easy to understand
- Ichimoku Cloud provides additional reference to improve accuracy
- Chikou Line further filters signals as auxiliary condition 
- Flexible adjustment available with different parameter combinations

## Risk Analysis

- Moving average strategy is sensitive to parameters, different periods can produce varied results
- Pure trend following unable to judge trend vs range, risks of losses exist
- Poor handling of consolidation periods, prone to wrong signals
- Cloud judgement unstable, may mislead

Consider combining with momentum indicators like MACD for trend strength. Adopt multiple moving average system to improve stability. Or incorporate stop loss to control risk.

## Optimization Directions

- Add momentum indicators to determine trend strength
- Consider multiple moving average system, e.g. golden cross
- Add channel and volatility indicators to detect ranges
- Optimize parameters to find best period combination
- Incorporate stop loss strategy to limit loss per trade

## Conclusion

The Ichimoku Breakout Strategy is relatively simple and straightforward, suitable for beginners to understand trend using moving averages. It can also be expanded with multiple indicators for enriched systems. However, its practical performance requires further verification and optimization before applying in live trading, especially in risk control. The key is to apply it wisely based on market conditions, and not blindly follow the lines.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|18|Tenkan|
|v_input_2|52|Kijun|
|v_input_3|104|Senkou B|
|v_input_4|52|Senkou A|
|v_input_5|52|Span Offset|
|v_input_6|true|Show Tenkan|
|v_input_7|true|Show Kijun|
|v_input_8|true|Show Span A|
|v_input_9|true|Show Span B|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-10-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy(title="Ichimoku Crypto Breakout", shorttitle="Ichimoku Breakout", overlay=true)

Ten = input(18, minval=1, title="Tenkan")
Kij = input(52, minval=1, title="Kijun")
LeadSpan = input(104, minval=1, title="Senkou B")
Displace = input(52, minval=1, title="Senkou A")
SpanOffset = input(52, minval=1, title="Span Offset")

sts = input(true, title="Show Tenkan")
sks = input(true, title="Show Kijun")
ssa = input(true, title="Show Span A")
ssb = input(true, title="Show Span B")

source = close

//Script for Ichimoku Indicator
donchian(len) => avg(lowest(len), highest(len))
TS = donchian(Ten)
KS = donchian(Kij)
SpanA = avg(TS, KS)
SpanB = donchian(LeadSpan)

CloudTop = max(TS, KS)

Chikou = source[Displace]
SpanAA = avg(TS, KS)[SpanOffset]
SpanBB = donchian(LeadSpan)[SpanOffset]

//Kumo Breakout (Long)
SpanA_Top = SpanAA >= SpanBB ? 1 : 0
SpanB_Top = SpanBB >= SpanAA ? 1 : 0

SpanA_Top2 = SpanA >= SpanB ? 1 : 0
SpanB_Top2 = SpanB >= SpanA ? 1 : 0

SpanA1 = SpanA_Top2 ? SpanA : na
SpanA2 = SpanA_Top2 ? SpanB : na

SpanB1 = SpanB_Top2 ? SpanA : na
SpanB2 = SpanB_Top2 ? SpanB : na

//plot for Tenkan and Kijun (Current Timeframe)
p1= plot(sts and TS ? TS : na, title="Tenkan", linewidth = 2, color = gray)
p2 = plot(sks and KS ? KS : na, title="Kijun", linewidth = 2, color = black)
p5 = plot(close, title="Chikou", linewidth = 2, offset=-Displace, color = orange)

//Plot for Kumo Cloud (Dynamic Color)
p3 = plot(ssa and SpanA ? SpanA : na, title="SpanA", linewidth=2, offset=Displace, color=green)
p4 = plot(ssb and SpanB ? SpanB : na, title="SpanB", linewidth=2, offset=Displace, color=red)

p8 = plot(ssa and SpanA1 ? SpanA1 : na, title="Span A1 above", style=linebr, linewidth=1, offset=Displace, color=green)
p9 = plot(ssa and SpanA2 ? SpanA2 : na, title="Span A2 above", style=linebr, linewidth=1, offset=Displace, color=green)
p10 = plot(ssb and SpanB1 ? SpanB1 : na, title="Span B1 above", style=linebr, linewidth=1, offset=Displace, color=red)
p11 = plot(ssb and SpanB2 ? SpanB2 : na, title="Span B2 above", style=linebr, linewidth=1, offset=Displace, color=red)

fill(p8, p9, color = lime, transp=70, title="Kumo Cloud Up")
fill (p10, p11, color=red, transp=70, title="Kumo Cloud Down")

LongSpan = (SpanA_Top and source[1] < SpanAA[1] and source > SpanAA) or (SpanB_Top and source[1] < SpanBB[1] and source > SpanBB) ? 1 : 0
cupSpan = LongSpan  == 1 ? LongSpan : 0

//Kumo Breakout (Long)
//plotarrow(cupSpan, title="Kumo Breakout Long", colorup=green, maxheight=50)

//Kumo Breakout (Long) Alerts
Long_Breakout = (SpanA_Top ==1 and crossover(source, SpanAA)) or (SpanB_Top ==1 and crossover(source, SpanBB))
//Long_Breakout = ((SpanA_Top ==1 and crossover(KS, SpanAA)) or (SpanB_Top ==1 and crossover(KS, SpanBB))) and TS >= KS
//alertcondition(Long_Breakout, title="Kumo Breakout Long", message="Kumo Long")

//Kumo Breakout (Short)
ShortSpan = (SpanB_Top and source[1] > SpanAA[1] and source < SpanAA) or (SpanA_Top and source[1] > SpanBB[1] and source < SpanBB) ? 1 : 0
cdnSpan = ShortSpan == 1 ? ShortSpan : 0

//Kumo Breakout (Short)
//plotarrow(cdnSpan*-1, title="Kumo Breakout Short", colordown=red, maxheight=50)

//Kumo Breakout (Short) Alerts
Short_Breakout = (SpanA_Top ==1 and crossunder(source, SpanBB)) or (SpanB_Top ==1 and crossunder(source, SpanAA))
//alertcondition(Short_Breakout, title="Kumo Breakout Short", message="Kumo Short")

//Kumo Twist
Kumo_Twist_Long = SpanA[1] < SpanB[1] and SpanA > SpanB ? 1 : 0
Kumo_Twist_Short = SpanA[1] > SpanB[1] and SpanA < SpanB ? 1 : 0

cupD = Kumo_Twist_Long == 1 ? Kumo_Twist_Long : 0
cdnD = Kumo_Twist_Short == 1 ? Kumo_Twist_Short : 0

//Kumo Twist (Long/Short)
//plotarrow(cupD, title="Kumo Twist Long", colorup=green, maxheight=50)
//plotarrow(cdnD*-1, title="Kumo Twist Short", colordown=red, maxheight=50)

//Kumo Twist (Long/Short) Alerts
KumoTwistLong_Cross = crossover(SpanA, SpanB)
//alertcondition(KumoTwistLong_Cross, title="Kumo Twist Long", message="Kumo Twist Long")
KumoTwistShort_Cross = crossunder(SpanA, SpanB)
//alertcondition(KumoTwistShort_Cross, title="Kumo Twist Short", message="Kumo Twist Short")

//Kumo Twist (Long/Short) - Bar Color
BarColor = Kumo_Twist_Long ? green : Kumo_Twist_Short ? red : na
barcolor(BarColor)

//Chikou above/below Price
Chikou_Above = close > Chikou
Chikou_Below = close < Chikou

//Kumo Twist (Long/Short) - Plot Character on location of Chikou to Price & Price to Kumo
//plotchar(Kumo_Twist_Long and Chikou_Above, title="Kumo Twist Long and Chikou above Price", char="A", location=location.abovebar, color=green)
//plotchar(Kumo_Twist_Long and Chikou_Below, title="Kumo Twist Long and Chikou below Price", char="B", location=location.abovebar, color=red)
//plotchar(Kumo_Twist_Short and Chikou_Above, title="Kumo Twist Short and Chikou above Price", char="A", location=location.belowbar, color=green)
//plotchar(Kumo_Twist_Short and Chikou_Below, title="Kumo Twist Short and Chikou below Price", char="B", location=location.belowbar, color=red)

//Base and Conversion Line Cross
//long = cross(TS, KS) and TS>KS

long = (cross(TS, SpanA) or cross(TS, SpanB)) and TS>SpanA and TS>SpanB and TS>=KS
short = cross(TS, KS) and KS >= TS

strategy.entry("long", strategy.long, when=Long_Breakout)
strategy.entry("short", strategy.short, when=Short_Breakout)
//strategy.exit("bracket", when=short)
```

> Detail

https://www.fmz.com/strategy/429159

> Last Modified

2023-10-13 16:48:22
