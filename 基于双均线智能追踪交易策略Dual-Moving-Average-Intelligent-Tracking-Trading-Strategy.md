
> Name

基于双均线智能追踪交易策略Dual-Moving-Average-Intelligent-Tracking-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16cd6e895ad50f0be6e.png)
[trans]
## 概述

双均线智能追踪交易策略是一种基于均线和特定指标的趋势跟踪策略。该策略运用两条不同参数设置的均线构建通道,并结合OTT指标设定通道上下限,实现对价格趋势的智能跟踪。当价格突破通道时,进行买入或卖出操作。

## 策略原理  

该策略主要运用两条移动平均线及OTT指标构建自适应通道,具体原理如下:

1. 计算快线MAvg,以CLOSE收盘价和自定义均线为输入,长度为5;

2. 根据MAvg和设置百分比,计算通道上下限长线位置长Stop和短线位置短Stop; 

3. 计算OTT指标中的通道移动止损MT,根据多空状态计算通道价格OTT;

4. 当价格突破OTT时,产生交易信号。

以上构建自适应通道的过程,使得策略可以实时跟踪价格变化趋势,进而产生交易信号。

## 策略优势

该策略具有以下优势:

1. 双均线通道结构,可以有效捕捉价格趋势;
2. OTT指标设置通道移动止损,控制风险;  
3. 自适应通道结构,可以快速响应价格变化;
4. 策略参数设置灵活,可针对不同品种及周期优化。

## 策略风险

该策略也存在一些风险:  

1. 双均线容易形成背离,可能产生误信号;
2. OTT参数设置不当可能过于激进或保守,影响策略表现;
3. 策略仅基于技术指标,没有结合基本面因素。

针对上述风险,可以通过参数优化,结合其他指标或基本面过滤信号等方式进行改进和优化。

## 策略优化方向  

该策略可以从以下几个方向进行优化:

1. 优化均线参数,选择合适品种及周期的参数组合;
2. 优化通道带宽参数,平衡跟踪灵敏度和稳定性;
3. 结合交易量进行信号过滤;
4. 结合基本面情况设定交易方向过滤。

## 总结

本策略总体来说是一个基于双均线通道和OTT指标进行趋势跟踪的策略,核心思路是构建自适应通道,并以突破产生交易信号。该策略具有一定的优势,但也存在可能的改进空间。通过参数及规则优化,该策略可以成为一个值得实盘验证的高效量化交易策略。

||

## Overview  

The dual moving average intelligent tracking trading strategy is a trend following strategy based on moving averages and specific indicators. The strategy uses two moving averages with different parameter settings to build a channel and combines the OTT indicator to set the upper and lower limits of the channel to intelligently track price trends. When prices break through the channel, buy or sell operations are executed.

## Strategy Principle

The core methodology of this strategy is to construct an adaptive channel using two moving averages and the OTT indicator, specifically:

1. Calculate the fast line MAvg using CLOSE and custom moving average as input, with a length of 5 periods;  

2. Calculate the long line position LongStop and short line position ShortStop for the channel based on MAvg and preset percentage;

3. Calculate the channel stop loss MT in OTT indicator, and channel price OTT based on long/short direction;  

4. Generate trading signals when price breaks through OTT.

The above process enables real-time tracking of price trend changes, generating trading signals.

## Strategy Advantages

The advantages of this strategy include:

1. The dual moving average channel structure effectively captures price trends; 
2. OTT indicator sets channel stop loss to control risks;
3. Adaptive channel structure responds quickly to price changes;  
4. Flexible parameter tuning for different products and timeframes.

## Strategy Risks

There are also some risks:   

1. Dual moving averages can form divergence resulting in false signals;  
2. Improper OTT parameter settings may be too aggressive or conservative; 
3. The strategy relies solely on technical indicators without considering fundamentals.

Risks can be addressed through parameter optimization, integrating other indicators and fundamentals filters.

## Optimization Directions

The strategy can be optimized in several aspects:

1. Optimize moving average parameters for proper product and timeframes;
2. Optimize channel width parameters balancing sensitivity and stability;
3. Add filters based on trading volume;  
4. Set direction filters based on fundamentals.

## Summary

In summary, this is a trend following strategy based on a dual moving average channel and OTT indicator. The core idea is constructing an adaptive channel and generating signals when prices breakout. The strategy has merits but also room for improvements. With parameter tuning and logic optimization, it has the potential to become an efficient quant trading strategy worth deploying.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Period|
|v_input_2|true|Sihirli Yüzde|
|v_input_3|0|Hareketli Ortalama Türü: VAR|EMA|WMA|TMA|SMA|WWMA|ZLEMA|TSF|
|v_input_4|10|Kanal Periyodu|
|v_input_5|21|Averaj Uzunluğu|
|v_input_6|20200101|Başlangıç Tarihi (YYYYMMDD)|
|v_input_7|20201231|Bitiş Tarihi (YYYYMMDD)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-11 00:00:00
end: 2024-02-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="BugRA_Trade_Strategy", shorttitle="BugRA_Trade_Strategy", overlay=true)

// Kullanıcı Girdileri
length = input(5, title="Period", minval=1)
percent = input(1, title="Sihirli Yüzde", type=input.float, step=0.1, minval=0)
mav = input(title="Hareketli Ortalama Türü", defval="VAR", options=["SMA", "EMA", "WMA", "TMA", "VAR", "WWMA", "ZLEMA", "TSF"])
wt_n1 = input(10, title="Kanal Periyodu")
wt_n2 = input(21, title="Averaj Uzunluğu")
src = close

// Tarih Aralığı Girdileri
startDate = input(20200101, title="Başlangıç Tarihi (YYYYMMDD)")
endDate = input(20201231, title="Bitiş Tarihi (YYYYMMDD)")

// Tarih Filtresi Fonksiyonu
isDateInRange() => true

// Özel Fonksiyonlar
Var_Func(src, length) =>
    valpha = 2 / (length + 1)
    vud1 = src > src[1] ? src - src[1] : 0
    vdd1 = src < src[1] ? src[1] - src : 0
    vUD = sum(vud1, length)
    vDD = sum(vdd1, length)
    vCMO = (vUD - vDD) / (vUD + vDD)
    varResult = 0.0
    varResult := nz(valpha * abs(vCMO) * src + (1 - valpha * abs(vCMO)) * nz(varResult[1]))
    varResult

Wwma_Func(src, length) =>
    wwalpha = 1 / length
    wwma = 0.0
    wwma := wwalpha * src + (1 - wwalpha) * nz(wwma[1])
    wwma

Zlema_Func(src, length) =>
    zxLag = floor(length / 2)
    zxEMAData = src + (src - src[zxLag])
    zlema = ema(zxEMAData, length)
    zlema

Tsf_Func(src, length) =>
    lrc = linreg(src, length, 0)
    lrs = lrc - linreg(src, length, 1)
    tsf = lrc + lrs
    tsf

getMA(src, length) =>
    ma = mav == "SMA" ? sma(src, length) :
         mav == "EMA" ? ema(src, length) :
         mav == "WMA" ? wma(src, length) :
         mav == "TMA" ? sma(sma(src, ceil(length / 2)), floor(length / 2) + 1) :
         mav == "VAR" ? Var_Func(src, length) :
         mav == "WWMA" ? Wwma_Func(src, length) :
         mav == "ZLEMA" ? Zlema_Func(src, length) :
         mav == "TSF" ? Tsf_Func(src, length) : na

// Strateji Hesaplamaları
MAvg = getMA(src, length)
fark = MAvg * percent * 0.01
longStop = MAvg - fark
longStopPrev = nz(longStop[1], longStop)
longStop := MAvg > longStopPrev ? max(longStop, longStopPrev) : longStop
shortStop = MAvg + fark
shortStopPrev = nz(shortStop[1], shortStop)
shortStop := MAvg < shortStopPrev ? min(shortStop, shortStopPrev) : shortStop

dir = 1
dir := nz(dir[1], dir)
dir := dir == -1 and MAvg > shortStopPrev ? 1 : dir == 1 and MAvg < longStopPrev ? -1 : dir
MT = dir==1 ? longStop: shortStop
OTT = MAvg > MT ? MT*(200+percent)/200 : MT*(200-percent)/200

plot(OTT, title="BugRA", color=color.rgb(251, 126, 9))

// Alım ve Satım Koşulları
longCondition = crossover(src, OTT) and isDateInRange()
shortCondition = crossunder(src, OTT) and isDateInRange()

// Strateji Giriş ve Çıkış Emirleri
if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.close("Long")

```

> Detail

https://www.fmz.com/strategy/442010

> Last Modified

2024-02-18 15:58:08
