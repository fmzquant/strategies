
> Name

超级鹅倒三角移动平均线交易策略Super-Guppy-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/924d81575cd0a40e1d.png)


[trans]

## 概述

该策略的主要思想是利用多个不同周期的移动平均线构建“超级鹅”交易信号,以发掘 relatively较长周期方向性趋势。超级鹅由快速移动平均线和慢速移动平均线两组线构成,快速线决定具体入场点位,慢速线决定整体交易方向。当快速线由下向上穿过慢速线时产生多头信号;而由上向下穿过时,产生空头信号。

## 原理

该策略使用了多组不同周期的EMA均线,具体为:

- 快速线:3周期、6周期...21周期7条线  
- 慢速线:24周期、27周期...200周期线

快速线互相交叉时分为蓝色(上升)和橙色(下降),慢速线交叉时分为绿色(上升)和红色(下降)。当快速线蓝色从灰色过渡到绿色慢速线时产生多头信号,反之从绿色到灰色过渡时平多头;从灰色过渡到红色时,产生空头信号。

该策略同时提供两个模式:稳定模式仅在快慢速EMA确定方向后才交易;激进模式,快速EMA任何方向转变都会产生信号。

## 优势

这种策略结合了双重均线系统的优势,既可以及时捕捉较短线周期内的交易机会,又可以利用较慢速线滤除过多的假信号。具体优势有:

1. 快慢速EMA线配合,可以有效控制风险。  
2. 激进模式可以及时捕捉短期机会。
3. 稳定模式可以提供高概率和高盈亏比的机会。  
4. 手动参数优化空间大。  

## 风险

该策略也存在一些风险:  

1. 大幅震荡行情中,可能出现较多的暴露在市场中的时间。
2. 多组均线系统,参数优化和测试难度较大。  
3. 稳定模式中,部分利润会被快速EMA线的滞后特性让渡。

可以通过适当调整快慢速EMA参数组合、或设置止损来控制风险。

## 优化方向  

该策略可以从以下几个方面进行优化:

1. 增加基于波动率的止损。这样可以有效控制个别巨震后造成的亏损。
2. 尝试机器学习算法优化EMA参数。这可以大幅提升参数利用效率。 
3. 增加量价组合过滤。これにより実体となる取引機会を高めることができます。
4. 探索其他指标与EMA交叉进行组合。こうすることでさらに取引精度を高められる可能性があります。

## 总结  

该超级鹅策略综合考虑了多个时间周期因素,在控制风险的同时,提高盈利机会。它可以通过多种方式进行优化提升,值得量化交易者深入研究。

||

## Overview

The core idea of this strategy is to build a "Super Guppy" trading signal with multiple moving averages of different periods to discover relatively long-term directional trends. The Super Guppy consists of two groups of lines: fast moving averages and slow moving averages. The fast lines determine specific entry points, while the slow lines determine the overall trading direction. When the fast lines cross above the slow lines, a long signal is generated; when crossing down through the slow lines, a short signal is generated.

## Principles 

This strategy uses multiple EMAs with different periods, specifically:
  
- Fast lines: 3, 6...21 periods, 7 lines total
- Slow lines: 24, 27...200 periods  

Fast line crossovers are colored blue (up) and orange (down). Slow line crossovers are colored green (up) and red (down). When fast blue lines transition from gray to slow green lines, long signals are generated, and vice versa from green to gray for closing longs; transitions from gray to red generate short signals.

The strategy also provides two modes: stable mode only trades after fast and slow EMAs determine direction; aggressive mode generates signals on any fast EMA directional changes.  

## Advantages

This strategy combines the benefits of a dual moving average system, which can timely capture trading opportunities over shorter time frames, while using slower lines to filter out excessive false signals. The main advantages are:  

1. Fast and slow EMAs work together effectively managing risks.
2. Aggressive mode allows capturing short-term opportunities in a timely manner.  
3. Stable mode provides high-probability, high risk-reward ratio setups.
4. Large parameter tuning space for customization.
   
## Risks

There are also some risks:  

1. In volatile markets, prolonged exposure is possible.  
2. Multiple EMA systems mean greater complexity in parameter optimization and testing.
3. Some profits sacrificed in stable mode due to EMA lag.  

Risks can be controlled by adjusting fast/slow EMA combinations or using stop losses.

## Optimization Directions   

The strategy can be enhanced in several aspects:  

1. Add volatility-based stops to effectively limit losses after huge spikes.  
2. Test machine learning algorithms for EMA parameter optimization to substantially improve parameter efficiency.  
3. Add price-volume filters to increase quality trading opportunities.  
4. Explore combining other indicators with EMA crosses for higher precision.  

## Conclusion

The Super Guppy strategy synthetically considers factors across multiple timeframes, improving profitability while controlling risks. With various viable optimization paths, it merits further research for quant traders.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Test w/Shorts?|
|v_input_2|true|Use Early Signals?|
|v_input_3|false|Show 200 EMA?|
|v_input_4|100000|Max Days Back to Test|
|v_input_5|false|Min Days Back to Test|
|v_input_6|3|Fast EMA 1|
|v_input_7|6|Fast EMA 2|
|v_input_8|9|Fast EMA 3|
|v_input_9|12|Fast EMA 4|
|v_input_10|15|Fast EMA 5|
|v_input_11|18|Fast EMA 6|
|v_input_12|21|Fast EMA 7|
|v_input_13|24|Slow EMA 8|
|v_input_14|27|Slow EMA 9|
|v_input_15|30|Slow EMA 10|
|v_input_16|33|Slow EMA 11|
|v_input_17|36|Slow EMA 12|
|v_input_18|39|Slow EMA 13|
|v_input_19|42|Slow EMA 14|
|v_input_20|45|Slow EMA 15|
|v_input_21|48|Slow EMA 16|
|v_input_22|51|Slow EMA 17|
|v_input_23|54|Slow EMA 18|
|v_input_24|57|Slow EMA 19|
|v_input_25|60|Slow EMA 20|
|v_input_26|63|Slow EMA 21|
|v_input_27|66|Slow EMA 22|
|v_input_28|200|EMA 200|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-13 00:00:00
end: 2023-11-20 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


// A strategized version Daryl Guppy Super EMA's with additional options
// by default "early signals" is enabled, which will trade any green/gray or red/gray transitions of the guppy.  Disable to only take longs while green, and shorts while red.
//@version=4

strategy(title="Super Guppy Strategy", shorttitle="Super Guppy Strat", overlay = true, 
  initial_capital=100000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type="percent", commission_value=0.0)

useShorts       = input(true, "Test w/Shorts?")
useEarlySignals = input(true, "Use Early Signals?")
show200Ema      = input(false, "Show 200 EMA?")
daysBackMax     = input(defval = 100000, title = "Max Days Back to Test", minval = 0)
daysBackMin     = input(defval = 0, title = "Min Days Back to Test", minval = 0)
msBackMax       = 1000 * 60 * 60 * 24 * daysBackMax
msBackMin       = 1000 * 60 * 60 * 24 * daysBackMin


src = close, 
len1 = input(3, minval=1, title="Fast EMA 1")
len2 = input(6, minval=1, title="Fast EMA 2")
len3 = input(9, minval=1, title="Fast EMA 3")
len4 = input(12, minval=1, title="Fast EMA 4")
len5 = input(15, minval=1, title="Fast EMA 5")
len6 = input(18, minval=1, title="Fast EMA 6")
len7 = input(21, minval=1, title="Fast EMA 7")
//Slow EMA
len8 = input(24, minval=1, title="Slow EMA 8")
len9 = input(27, minval=1, title="Slow EMA 9")
len10 = input(30, minval=1, title="Slow EMA 10")
len11 = input(33, minval=1, title="Slow EMA 11")
len12 = input(36, minval=1, title="Slow EMA 12")
len13 = input(39, minval=1, title="Slow EMA 13")
len14 = input(42, minval=1, title="Slow EMA 14")
len15 = input(45, minval=1, title="Slow EMA 15")
len16 = input(48, minval=1, title="Slow EMA 16")
len17 = input(51, minval=1, title="Slow EMA 17")
len18 = input(54, minval=1, title="Slow EMA 18")
len19 = input(57, minval=1, title="Slow EMA 19")
len20 = input(60, minval=1, title="Slow EMA 20")
len21 = input(63, minval=1, title="Slow EMA 21")
len22 = input(66, minval=1, title="Slow EMA 22")
len23 = input(200, minval=1, title="EMA 200")

//Fast EMA
ema1 = ema(src, len1)
ema2 = ema(src, len2)
ema3 = ema(src, len3)
ema4 = ema(src, len4)
ema5 = ema(src, len5)
ema6 = ema(src, len6)
ema7 = ema(src, len7)

//Slow EMA
ema8 = ema(src, len8)
ema9 = ema(src, len9)
ema10 = ema(src, len10)
ema11 = ema(src, len11)
ema12 = ema(src, len12)
ema13 = ema(src, len13)
ema14 = ema(src, len14)
ema15 = ema(src, len15)
ema16 = ema(src, len16)
ema17 = ema(src, len17)
ema18 = ema(src, len18)
ema19 = ema(src, len19)
ema20 = ema(src, len20)
ema21 = ema(src, len21)
ema22 = ema(src, len22)

//EMA 200
ema23 = ema(src, len23)

//Fast EMA Color Rules
colfastL = (ema1 > ema2 and ema2 > ema3 and ema3 > ema4 and ema4 > ema5 and ema5 > ema6 and ema6 > ema7)
colfastS = (ema1 < ema2 and ema2 < ema3 and ema3 < ema4 and ema4 < ema5 and ema5 < ema6 and ema6 < ema7)
//Slow EMA Color Rules
colslowL = ema8 > ema9 and ema9 > ema10 and ema10 > ema11 and ema11 > ema12 and ema12 > ema13 and ema13 > ema14 and ema14 > ema15 and ema15 > ema16 and ema16 > ema17 and ema17 > ema18 and ema18 > ema19 and ema19 > ema20 and ema20 > ema21 and ema21 > ema22
colslowS = ema8 < ema9 and ema9 < ema10 and ema10 < ema11 and ema11 < ema12 and ema12 < ema13 and ema13 < ema14 and ema14 < ema15 and ema15 < ema16 and ema16 < ema17 and ema17 < ema18 and ema18 < ema19 and ema19 < ema20 and ema20 < ema21 and ema21 < ema22 
//Fast EMA Final Color Rules
colFinal = colfastL and colslowL? color.aqua : colfastS and colslowS? color.orange : color.gray
//Slow EMA Final Color Rules
colFinal2 = colslowL  ? color.lime : colslowS ? color.red : color.gray 
// iff colSlowL then lime, otherwise is colSlowS, then red, otherwise gray

// open long:  grey to green
// close long:  green to grey
// open short: grey to red
// close short: red to grey


//Fast EMA Plots
p1=plot(ema1, linewidth=2, color=colFinal)
plot(ema2, linewidth=1, color=colFinal)
plot(ema3, linewidth=1, color=colFinal)
plot(ema4, linewidth=1, color=colFinal)
plot(ema5, linewidth=1, color=colFinal)
plot(ema6, linewidth=1, color=colFinal)
p2=plot(ema7, linewidth=2, color=colFinal)

//Slow EMA Plots
p3=plot(ema8, linewidth=1, color=colFinal2)
plot(ema9, linewidth=1, color=colFinal2)
plot(ema10,linewidth=1, color=colFinal2)
plot(ema11,linewidth=1, color=colFinal2)
plot(ema12,linewidth=1, color=colFinal2)
plot(ema13,linewidth=1, color=colFinal2)
plot(ema14,linewidth=1, color=colFinal2)
plot(ema15,linewidth=1, color=colFinal2)
plot(ema16,linewidth=1, color=colFinal2)
plot(ema17,linewidth=1, color=colFinal2)
plot(ema18,linewidth=1, color=colFinal2)
plot(ema19,linewidth=1, color=colFinal2)
plot(ema20,linewidth=1, color=colFinal2)
plot(ema21,linewidth=1, color=colFinal2)
plot(ema22,linewidth=2, color=colFinal2)
p4=plot(show200Ema==true ? ema23 : na, linewidth=2)

var isLong = false
var isShort = false

long = not isLong and ((colFinal2 == color.lime and colFinal2[1] == color.gray) or (colFinal2 == color.gray and colFinal2[1] == color.red))
short = not isShort and ((colFinal2 == color.gray and colFinal2[1] == color.lime) or (colFinal2 == color.red and colFinal2[1] == color.gray))

if long
    isLong := true
    isShort := false

if short
    isLong := false
    isShort := true

openLong = colFinal2 == color.lime and colFinal2[1] == color.gray
closeLong = colFinal2 == color.gray and colFinal2[1] == color.lime
openShort = colFinal2 == color.red and colFinal2[1] == color.gray
closeShort = colFinal2 == color.gray and colFinal2[1] == color.red


// default - no early signals
plotshape(openLong and not useEarlySignals, title="open long", text="open long", style=shape.labelup, location=location.belowbar, size=size.tiny, color=color.green, textcolor=color.white, transp=0)
plotshape(closeLong and not useEarlySignals, title="close long", text="close long", style=shape.labeldown, location=location.abovebar, size=size.tiny, color=color.gray, textcolor=color.white, transp=0)
plotshape(openShort and useShorts and not useEarlySignals, title="open short", text="open short", style=shape.labelup, location=location.belowbar, size=size.tiny, color=color.red, textcolor=color.white, transp=0)
plotshape(closeShort and useShorts and not useEarlySignals, title="close short", text="close short", style=shape.labeldown, location=location.abovebar, size=size.tiny, color=color.black, textcolor=color.white, transp=0)

// with early signals
plotshape(long and useEarlySignals, title="long", text="long", style=shape.labelup, location=location.belowbar, size=size.tiny, color=color.green, textcolor=color.white, transp=0)
plotshape(short and useEarlySignals and useShorts, title="short", text="short", style=shape.labeldown, location=location.abovebar, size=size.tiny, color=color.red, textcolor=color.white, transp=0)
plotshape(short and useEarlySignals and not useShorts, title="close long", text="close long", style=shape.labeldown, location=location.abovebar, size=size.tiny, color=color.red, textcolor=color.white, transp=0)




isWithinTimeBounds = (msBackMax == 0 or (time > (timenow - msBackMax))) and (msBackMin == 0 or (time < (timenow - msBackMin)))
strategy.entry("LONG", long=true, when=openLong and isWithinTimeBounds and not useEarlySignals)
strategy.close("LONG", when=closeLong and isWithinTimeBounds and not useEarlySignals)
strategy.entry("short", long=false, when=openShort and useShorts and isWithinTimeBounds and not useEarlySignals)
strategy.close("short", when=closeShort and useShorts and isWithinTimeBounds and not useEarlySignals)

strategy.entry("LONG", long=true, when=long and isWithinTimeBounds and useEarlySignals)
strategy.close("LONG", when=short and isWithinTimeBounds and useEarlySignals)
strategy.entry("short", long=false, when=short and useShorts and isWithinTimeBounds and useEarlySignals)
strategy.close("short", when=long and useShorts and isWithinTimeBounds and not useEarlySignals)


```

> Detail

https://www.fmz.com/strategy/432778

> Last Modified

2023-11-21 14:05:40
