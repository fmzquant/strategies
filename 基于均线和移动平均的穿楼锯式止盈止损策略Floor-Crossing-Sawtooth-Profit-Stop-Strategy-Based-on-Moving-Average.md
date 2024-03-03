
> Name

基于均线和移动平均的穿楼锯式止盈止损策略Floor-Crossing-Sawtooth-Profit-Stop-Strategy-Based-on-Moving-Average

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16550a719cc025b8aed.png)
[trans]

## 概述

本策略基于均线和移动平均线的金叉死叉进行开仓,并采用穿楼的方式设置止盈止损。其主要特点是:

1. 使用均线系统过滤震荡市
2. 采用移动止盈止损,实现动态管理资金
3. 可配置仓位过滤,避免单边开仓

## 策略原理

本策略主要由四部分组成:

1. 均线系统

   使用均线的黄金交叉和死叉来判断趋势,过滤震荡市场。

2. 移动止盈止损

   使用一定比例的移动止盈止损来锁定利润和控制风险,实现资金的动态管理。

3. 仓位过滤

   可配置是否开启仓位过滤。如果上一仓位为多头,则下一个信号必须为空头才能开仓,避免单边持仓。

4. ATR止损

   使用ATR来限制最大止损范围,避免止损过大。

具体来说,策略首先计算均线,并在均线出现黄金交叉时做多,死叉时做空。入场后,以一定比例设置移动止盈和止损线。如果价格触碰止盈线则止盈;如果触碰止损线或者超过ATR止损范围则止损。

## 策略优势

本策略主要有以下优势:

1. 可配置性强

   策略中多处参数都是可配置的,用户可以根据自己的交易风格进行调整。

2. 资金管理优良

   采用移动止盈止损和ATR止损,可以有效控制单次止损幅度,实现优秀的资金管理。

3. 适合趋势市

   均线策略本身就较适合趋势性较强的市场,可有效过滤震荡。

## 风险及对策  

本策略也存在一些风险,主要有:

1. 趋势判断错误

   均线本身对复杂行情的判断并不完美,可能出现误判的情况。此时应适当调整均线参数,或结合其他指标来判断。

2. 止损过于激进

   移动止损可能在震荡中被否定,应结合ATR参数来设置止损范围。

3. 单边开仓风险

   开启仓位过滤会对交易频率带来一定影响,长时间单边持仓可能带来额外风险。

## 策略优化方向  

本策略的主要优化方向有:

1. 参数优化

   调整均线期数、ATR参数、止盈止损比例等参数,优化策略效果。

2. 增加指标

   增加CMF、OBV等指标来判断资金流向,避免止损过大。

3. 组合其他策略

   结合突破等策略,在趋势稳定后进行追踪,可获得更好的效果。

## 总结

本策略总体来说,通过均线过滤和移动止盈止损的方式,实现了基于趋势的动态资金管理。可配置性强,适合理性投资者按自己风格调整使用。作为一种通用型量化策略,它的优化余地还很大,值得深入研究。

|| 

## Overview

This strategy opens positions based on the golden cross and death cross of moving averages, and sets take profit and stop loss in a floor-crossing way. Its main features are:

1. Use moving average system to filter shocks
2. Adopt moving take profit and stop loss for dynamic capital management  
3. Configurable position filtering to avoid one-way opening

## Strategy Principle 

The strategy consists of four parts:

1. Moving Average System

   Use golden cross and death cross of moving averages to determine trends and filter shocks.

2. Moving Take Profit and Stop Loss

   Use take profit and stop loss with a certain percentage to lock in profits and control risks, realizing dynamic capital management.

3. Position Filtering

   Can configure whether to enable position filtering. If the previous position is long, the next signal must be short to open position, avoiding unilateral holding.

4. ATR Stop Loss

   Use ATR to limit the maximum range of stop loss and avoid excessive stop loss.

Specifically, the strategy first calculates the moving average, longs on golden cross, and shorts on death cross. After entry, set the moving take profit and stop loss lines with a certain percentage. If price touches the take profit line, then take profit; if touches the stop loss line or exceeds the ATR stop loss range, then stop loss.

## Advantages

The main advantages of this strategy are:  

1. High Configurability

   Many parameters in the strategy are configurable for users to adjust based on their trading styles.

2. Good Capital Management

   The adoption of moving take profit and stop loss and ATR stop loss can effectively control the amplitude of a single stop loss and achieve excellent capital management.

3. Suitable for Trending Market

   The moving average strategy itself is more suitable for strong trending markets to filter shocks effectively.   

## Risks and Countermeasures

There are also some risks in this strategy:

1. Trend Misjudgement

   The judgment of moving averages on complex markets is not perfect, and misjudgements may occur. At this time, moving average parameters should be adjusted accordingly, or other indicators can be combined to judge trends.

2. Excessive Stop Loss

   Moving stop loss may be negated in shocks. ATR parameters should be combined to set the stop loss range.

3. One-way Opening Risks

   Enabling position filtering will have some impact on trading frequency. Prolonged one-way holding may bring additional risks.


## Optimization Directions   

The main optimization directions are:

1. Parameter Optimization

   Adjust the moving average cycle, ATR parameters, take profit and stop loss ratios and other parameters to optimize strategy performance.

2. Adding indicators

   Add indicators like CMF, OBV to judge capital flow and avoid excessive stop loss.   

3. Combining with other strategies

   Combine with breakout strategies to follow trends after the trend stabilizes to achieve better results.


## Summary  

In summary, through the moving average filter and moving take profit and stop loss, this strategy realizes dynamic capital management based on trends. It has high configurability, suitable for rational investors to adjust and use according to their own styles. As a universal quantitative strategy, it still has great potential for optimization and is worth in-depth research.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|52|Leading Periot|
|v_input_int_2|true|Displacement|
|v_input_bool_1|true|Pozisyon Sıra Filtresi Uygula|
|v_input_float_1|true|Zarar Durdurma %|
|v_input_float_2|2|Kar Alma %|
|v_input_float_3|0.3|ATR Çarpanı|
|v_input_float_4|0.01|ATR Üst Limit|
|v_input_float_5|0.06|ATR Alt Limit|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-12-11 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © MGULHANN

//@version=5

//İchimoku Leading Span 2 Hesaplaması ve Girişleri
strategy("Stairs Gain Strategy - MG", overlay=true, margin_long=100, margin_short=100)
laggingSpan2Periods = input.int(52, minval=1, title="Leading Periot")
displacement = input.int(1, minval=1, title="Displacement")
donchian(len) => math.avg(ta.lowest(len), ta.highest(len))
leadLine2 = donchian(laggingSpan2Periods)
p2 = plot(leadLine2, offset = displacement - 1, color=#EF9A9A,
	 title="Leading Span B")

// İşlem Tekrarını Filtrele	 
filtreUygula = input.bool(true,title="Pozisyon Sıra Filtresi Uygula")

//Kar Al / Zarar Durdur Seviyeleri Girişleri
zararDurdurmaYuzde = input.float(1.0, title='Zarar Durdurma %', step=0.01) / 100
karAlmaYuzde = input.float(2.0, title='Kar Alma %', step=0.01) / 100

//ATR Hesaplaması
atrCarpani = input.float(0.3, title="ATR Çarpanı", step= 0.01)
atrDegeri = ta.atr(14) * atrCarpani

//ATR Değer Girişleri
atrbuyukdeger = input.float(0.01, title="ATR Üst Limit", step=0.01)
atrkucukdeger = input.float(0.06, title="ATR Alt Limit", step=0.01)

//Buy ve Sell Şartları
buycross =   ta.crossover(close,leadLine2[displacement-1]) ? atrDegeri > atrbuyukdeger : strategy.position_size == 0
sellcross = ta.crossover(leadLine2[displacement-1],close) ? atrDegeri < atrkucukdeger : strategy.position_size == 0

//KONTROL
var sonPozisyonYonu = 0
//Son kapanan pozisyon long ise degiskenin degerini 1 olarak ata
if strategy.position_size[1] > 0 and strategy.position_size == 0
    sonPozisyonYonu := 1

//Son kapanan pozisyon short ise degiskenin degerini -1 olarak ata
if strategy.position_size[1] < 0 and strategy.position_size == 0
    sonPozisyonYonu := -1
    
//eger filtre uygulama seçiliyse ve son pozisyon yönü long ise 'longFiltreSonuc' degiskenine false degeri ata ve bir sonraki pozisyonun long olmasını engelle
longFiltreSonuc = filtreUygula ? sonPozisyonYonu == 1 ? false : true : true

//eger filtre uygulama seçiliyse ve son pozisyon yönü short ise 'shortFiltreSonuc' degiskenine false degeri ata ve bir sonraki pozisyonun short olmasını engelle
shortFiltreSonuc = filtreUygula ? sonPozisyonYonu == -1 ? false : true : true

//LONG GİRİŞ
strategy.entry("Long", strategy.long, when=buycross and longFiltreSonuc)
longKarAl = strategy.position_avg_price * (1 + karAlmaYuzde)
longZararDurdur = strategy.position_avg_price * (1 - zararDurdurmaYuzde)
strategy.exit("Long Exit","Long",limit=longKarAl, stop=longZararDurdur)

//SHORT GİRİŞ
strategy.entry("Short", strategy.short, when=sellcross and shortFiltreSonuc)
shortKarAl = strategy.position_avg_price * (1 - karAlmaYuzde)
shortZararDurdur = strategy.position_avg_price * (1 + zararDurdurmaYuzde)
strategy.exit("Short Exit","Short",limit=shortKarAl, stop=shortZararDurdur)

//Kar Al ve Zarar Durdur Seviyelerinin Grafikte İşaretlenmesi
plot(strategy.position_size != 0 ? strategy.position_avg_price : na, color=color.navy, linewidth=2, style=plot.style_linebr, title="İşleme Giriş Seviyesi")
plot(strategy.position_size > 0 ? longKarAl : na, color=color.green, linewidth=2, style=plot.style_linebr, title="Long Kar Alım Seviyesi")
plot(strategy.position_size > 0 ? longZararDurdur : na, color=color.red, linewidth=2, style=plot.style_linebr, title="Long Zarar Durdurma Seviyesi")
plot(strategy.position_size < 0 ? shortKarAl : na, color=color.green, linewidth=2, style=plot.style_linebr, title="Short Kar Alım Seviyesi")
plot(strategy.position_size < 0 ? shortZararDurdur : na, color=color.red, linewidth=2, style=plot.style_linebr, title="Short Zarar Durdurma Seviyesi")

//plotshape(buycross,size=size.small,style=shape.labelup,location=location.belowbar,color=color.green,text="Al", offset = displacement-1, textcolor=color.white)
//plotshape(sellcross,size=size.small,style=shape.labeldown,location=location.abovebar,color=color.red,text="Sat", offset = displacement-1, textcolor=color.white)

```

> Detail

https://www.fmz.com/strategy/436114

> Last Modified

2023-12-21 12:26:18
