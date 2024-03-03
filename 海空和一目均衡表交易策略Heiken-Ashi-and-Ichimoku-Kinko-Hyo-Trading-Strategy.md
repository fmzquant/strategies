
> Name

海空和一目均衡表交易策略Heiken-Ashi-and-Ichimoku-Kinko-Hyo-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略结合使用海空和一目均衡表指标判断趋势方向并进行趋势跟踪。海空平滑K线数据降低噪音。一目均衡表通过转换线、基准线等多种信号综合判断趋势强弱。结合双重指标提高策略稳定性。

## 策略原理

计算海空的收盘价,并绘制转换线、基准线等一目均衡表指标。当收盘价高于前两日且高于云图上沿和延迟线时做多。当收盘价低于前两日且低于云图下沿和延迟线时做空。一目均衡表的转换线和基准线交叉也作为辅助信号。

## 优势分析

- 海空过滤假突破,提高信号质量
- 一目均衡表多个指标信号相互验证 
- 延迟线避免被套,确保止盈
- 顺势而为,持仓时间长,获利空间大

## 风险分析

- 海空指标平滑程度无法完美优化
- 一目均衡表参数设置对结果影响显著
- 持仓时间过长可能亏损扩大
- 交易频次较低,不适合短线交易

可适当调整平滑参数,缩短持仓周期,优化一目均衡表参数等来控制风险。

## 优化方向

- 测试不同的海空平滑参数
- 优化一目均衡表的周期参数
- 设置离场后的再入场策略
- 在不同品种中测试参数健壮性

## 总结

该策略综合多个指标判断趋势方向,回撤控制能力较强。可通过调参等方法进一步提升效果。

||

## Overview

This strategy combines Heiken Ashi and Ichimoku Kinko Hyo indicators to determine trend direction and follow the trend. Heiken Ashi smoothing reduces noise. Ichimoku uses multiple signals like conversion and base lines to assess trend strength. The combination improves strategy stability.

## Strategy Logic

Calculate Heiken Ashi close price and plot Ichimoku indicators like conversion line, base line etc. Go long when close is higher than previous two days and above Ichimoku top edge and lagging line. Go short when close is lower than previous two days and below Ichimoku bottom edge and lagging line. Conversion and base line crosses also provide secondary signals.

## Advantages 

- Heiken Ashi filters false breakouts improving signal quality
- Ichimoku uses multiple validating signals 
- Lagging line avoids whipsaws ensuring profit taking 
- Following the trend leads to longer holding and bigger profits

## Risks

- Heiken Ashi smoothing cannot be perfectly optimized
- Ichimoku parameters significantly impact results
- Long holding risks increasing losses
- Lower trade frequency unsuitable for short term

Risks can be controlled by adjusting smoothness, holding period, optimizing Ichimoku parameters etc.

## Enhancements

- Test different Heiken Ashi smoothing parameters
- Optimize Ichimoku period parameters
- Strategize re-entry rules after exit
- Test robustness across different products  

## Conclusion

This strategy comprehensively uses multiple indicators to determine trend direction with controlled drawdowns. Performance can be further improved via tuning parameters etc.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Tenkan Sen Periods|
|v_input_2|24|Kijun Sen Periods|
|v_input_3|51|Senkou Span B Periods|
|v_input_4|24|Displacement|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-09-17 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

strategy("Heiken Ashi + Ichimoku Kinko Hyo Strategy", shorttitle="HaI", overlay=true, default_qty_type=strategy.percent_of_equity, max_bars_back=1000, default_qty_value=100, calc_on_order_fills= true, calc_on_every_tick=true, pyramiding=0)

hahigh = security(heikinashi(syminfo.tickerid), timeframe.period, high)
halow = security(heikinashi(syminfo.tickerid), timeframe.period, low)

TenkanSenPeriods = input(9, minval=1, title="Tenkan Sen Periods")
KijunSenPeriods = input(24, minval=1, title="Kijun Sen Periods")
SenkouSpanBPeriods = input(51, minval=1, title="Senkou Span B Periods")
displacement = input(24, minval=1, title="Displacement")
donchian(len) => avg(lowest(len), highest(len))
TenkanSen = donchian(TenkanSenPeriods)
KijunSen = donchian(KijunSenPeriods)
SenkouSpanA = avg(TenkanSen, KijunSen)
SenkouSpanB = donchian(SenkouSpanBPeriods)
SenkouSpanH = max(SenkouSpanA[displacement - 1], SenkouSpanB[displacement - 1])
SenkouSpanL = min(SenkouSpanA[displacement - 1], SenkouSpanB[displacement - 1])
ChikouSpan = close[displacement-1]

plot(TenkanSen, color=blue, title="Tenkan Sen", linewidth = 2)
plot(KijunSen, color=maroon, title="Kijun Sen", linewidth = 3)
plot(close, offset = -displacement, color=orange, title="Chikou Span", linewidth = 2)
sa=plot (SenkouSpanA, offset = displacement, color=green,  title="Senkou Span A", linewidth = 2)
sb=plot (SenkouSpanB, offset = displacement, color=red,  title="Senkou Span B", linewidth = 3)
fill(sa, sb, color = SenkouSpanA > SenkouSpanB ? green : red)

longCondition = hahigh > max(hahigh[1],hahigh[2]) and close>ChikouSpan and close>SenkouSpanH and (TenkanSen>=KijunSen or close>KijunSen)
if (longCondition)
    strategy.entry("Long",strategy.long)

shortCondition = halow < min(halow[1],halow[2]) and close<ChikouSpan and close<SenkouSpanL and (TenkanSen<=KijunSen or close<KijunSen)
if (shortCondition)
    strategy.entry("Short",strategy.short)

closelong = halow < min(halow[1],halow[2]) and (TenkanSen<KijunSen or close<TenkanSen or close<KijunSen or close<SenkouSpanH or close<ChikouSpan)
if (closelong)
    strategy.close("Long")

closeshort = hahigh > max(hahigh[1],hahigh[2]) and (TenkanSen>KijunSen or close>TenkanSen or close>KijunSen or close>SenkouSpanL or close>ChikouSpan)
if (closeshort)
    strategy.close("Short")
```

> Detail

https://www.fmz.com/strategy/427137

> Last Modified

2023-09-18 15:13:35
