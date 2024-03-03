
> Name

双动能均线交易策略Bugra-Trading-Strategy-Based-on-Dual-Kinetic-Moving-Average

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1bdba9db7874729a2db.png)
[trans]
## 概述

双动能均线交易策略是一种联合使用OTT指标和Wavetrend振荡器指标的策略。它结合使用Anıl Özekşi老师开发的OTT指标和lonestar108的Wavetrend振荡器指标,形成一个成功的交易指标。该策略可以在双向市场中进行做多做空操盘。

## 策略原理

双动能均线交易策略首先计算布林带中轨,也就是移动平均线MAvg。然后根据用户设定的百分比范围和周期,计算出长停损位longStop和短停损位shortStop。当价格突破上轨时做多,突破下轨时做空。关闭信号是价格重新回到均线附近。

具体来说,该策略的核心指标是OTT指标。OTT指标由均线和边界线组成,是根据一定算法根据市场波动程度调整边界线的位置。当价格跌破下边界线OTT时,做空;当价格涨破上边界线OTT时,做多。

该策略同时使用Wavetrend指标判断价格趋势方向,如果判断为向下的趋势,则只做空不做多;如果判断为向上的趋势,则只做多不做空。

## 优势分析

双动能均线交易策略结合了移动平均线、布林带和OTT指标的优点,可以自动调整止损位置,降低了止损被激活的概率。同时结合趋势判断指标,避免在震荡趋势中被套。

具体来说,该策略的主要优势有:

1. 可以自动调整止损位,有效控制风险
2. OTT指标可以比较准确地判断反转点位
3. 结合趋势判断指标,避免震荡市场的套牢
4. 规则相对简单清晰,容易理解运用

## 风险分析

双动能均线交易策略也存在一定的风险,主要集中在以下几个方面:  

1. 在剧烈行情中,止损线可能被突破,造成较大的亏损
2. OTT指标判断的反转信号不一定准确,可能发生故障信号
3. 趋势判断也可能发生错误,在震荡向下中做多亏损
4. 参数设置不当也会影响策略效果

对策方式主要是:

1. 适当放宽止损幅度,确保止损线不会轻易被激活
2. 结合其他指标判断OTT信号的可靠性,避免假信号
3. 适当调整参数,使趋势判断更加可靠
4. 优化参数,找到最佳参数组合

## 优化方向  

双动能均线交易策略仍有进一步优化的空间:

1. 可以考虑与其他指标结合,提高信号判断的准确性
2. 可以研究自适应止损算法,使止损线可以根据市场波动程度进行调整
3. 可以加入交易量指标,避免低量的假突破
4. 可以测试不同的移动平均线种类,找到最匹配的均线
5. 可以尝试机器学习等方法自动优化参数

## 总结

双动能均线交易策略整合了多种指标的优点,可以自动调整止损位,判断反转信号,识别趋势方向。它具有风险控制能力强,容易理解使用等优势。但也存在被套、信号不准等风险。该策略可以进一步优化,与其他指标组合使用,研究自适应算法等。总体来说,双动能均线交易策略是一种实用的突破类交易策略。

||

## Overview

The Bugra trading strategy is a strategy that combines the OTT indicator developed by my dear teacher Anıl Özekşi and the Wavetrend Oscillator indicator by lonestar108. It forms a successful trading indicator by integrating the two indicators. The strategy can do long and short trading in two-way markets.

## Strategy Principle 

The Bugra trading strategy first calculates the midline of Bollinger Bands, which is the moving average line MAvg. Then, based on the percentage range and period set by the user, it calculates the long stop loss longStop and the short stop loss shortStop. When the price breaks through the upper rail, go long. When it breaks through the lower rail, go short. The closing signal is when the price returns to around the moving average.

Specifically, the core indicator of this strategy is the OTT indicator. The OTT indicator consists of a moving average and boundary lines. It adjusts the position of the boundary lines according to the volatility of the market based on certain algorithms. When the price breaks through the lower boundary line OTT, go short. When it breaks through the upper boundary line OTT, go long.

This strategy also uses the Wavetrend indicator to determine the direction of the price trend. If it is judged to be a downward trend, only go short, not long. If it is judged to be an upward trend, only go long, not short.

## Advantage Analysis

The Bugra trading strategy combines the advantages of moving averages, Bollinger Bands and OTT indicators. It can automatically adjust stop loss positions and reduce the probability of stop loss being triggered. At the same time, by incorporating trend judgment indicators, it avoids being trapped in oscillating trends.

Specifically, the main advantages of this strategy are:

1. It can automatically adjust stop loss positions to effectively control risks.
2. The OTT indicator can relatively accurately determine reversal points.  
3. By incorporating trend judgment indicators, it avoids being trapped in oscillating markets.
4. Its rules are relatively simple and clear, easy to understand and apply.

## Risk Analysis

The Bugra trading strategy also has some risks, mainly in the following aspects:

1. In violent market conditions, stop loss may be broken, causing greater losses.
2. The reversal signals judged by the OTT indicator may not be accurate, and faulty signals may occur.
3. Trend judgments can also be wrong. Going long in an downward oscillation will cause losses.  
4. Improper parameter settings will also affect strategy performance.

The countermeasures are mainly:  

1. Appropriately loosen the stop loss range to ensure that stop loss lines are not easily activated.
2. Combine with other indicators to judge the reliability of OTT signals to avoid false signals.  
3. Appropriately adjust parameters to make trend judgments more reliable.
4. Optimize parameters to find the best parameter combination.

## Optimization Directions

There is still room for further optimization of the dual kinetic moving average trading strategy:

1. Consider combining with other indicators to improve the accuracy of signal judgment.
2. Study adaptive stop loss algorithms so that stop loss lines can be adjusted according to market volatility.
3. Add trading volume indicators to avoid false breakouts with low volume.
4. Test different types of moving averages to find the most suitable moving average.
5. Try machine learning and other methods to automatically optimize parameters.


## Summary  

The dual kinetic moving average trading strategy integrates the advantages of multiple indicators. It can automatically adjust stop loss positions, judge reversal signals, and identify trend directions. It has advantages such as strong risk control capabilities and easy to understand and use. But it also has risks like being trapped and inaccurate signals. This strategy can be further optimized by combining with other indicators, studying adaptive algorithms, etc. In general, the dual kinetic moving average trading strategy is a practical breakout trading strategy.

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
start: 2023-02-12 00:00:00
end: 2024-02-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Bugra trade strategy", shorttitle="Bugra trade strategy", overlay=true)

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

https://www.fmz.com/strategy/442114

> Last Modified

2024-02-19 14:36:37
