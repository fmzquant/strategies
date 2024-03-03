
> Name

采用双移动均线交易策略Dual-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/164854fcc7ef77fc2b7.png)
[trans]
## 概述

本策略采用双移动均线形成交易信号的方式,当短期移动均线上穿长期移动均线时生成买入信号;当短期移动均线下穿长期移动均线时生成卖出信号。该策略结合移动均线的趋势跟踪功能,可以有效捕捉价格趋势,实现趋势交易。

## 策略原理

本策略使用两条不同周期的指数移动均线(EMA)。EMA1为短期移动均线,周期设置为9;EMA2为长期移动均线,周期设置为21。当短期移动均线EMA1上穿长期移动均线EMA2时,产生买入信号;当EMA1下穿EMA2时,产生卖出信号。

这样可以利用移动均线的趋势跟踪功能,在价格开始新的趋势方向时及时捕捉信号,跟踪趋势进行交易。例如当价格从下跌转为上涨时,短期移动均线会先于长期移动均线上升,短期移动均线上穿长期移动均线是价格开始上涨的一个早期信号。

## 优势分析

本策略最大的优势在于可以有效识别价格趋势,尤其适合趋势性较强的市场。移动均线本身具有很好的趋势跟踪功能,双移动均线策略进一步增强了这一优势。此外,相比单一移动均线策略,双移动均线策略可以进一步过滤假信号,信号的可靠性更高。

## 风险分析

本策略最大的风险在于当价格出现剧烈波动时,移动均线会有滞后性,可能出现错过最佳入场或出场时机的情形。此外,当市场处于震荡区间时,该策略会产生更多无效信号,降低策略的稳定性。

为降低风险,可以适当调整移动均线的周期参数,或增加其他指标进行滤波。例如结合市场波动率指标设置阈值,避免在市场大幅震荡时依然进行交易等。

## 优化方向

本策略的优化空间主要在以下几个方面:

1. 优化移动均线周期参数,寻找最优参数组合
2. 增加其他指标结合进行滤波操作,提高信号的可靠性
3. 根据不同品种和市场环境设定自适应的参数
4. 结合量能指标等确定具体的入场点位
5. 优化止损机制

## 总结

本策略采用双指数移动均线形成交易信号的方法,最大优势是价格趋势跟踪能力强,可以有效识别价格趋势转折。但也存在移动均线滞后等问题。下一步可以从提高信号质量、确定具体入场时机以及止损方面进行优化。

||

## Overview

This strategy generates trading signals by using dual moving averages. It sends buy signals when the short-term moving average crosses above the long-term moving average, and sell signals when the reverse happens. This strategy combines the trend-following capability of moving averages to effectively catch price trends and implement trend trading.

## Strategy Logic  

This strategy leverages two exponential moving averages (EMA) with different periods. EMA1 is the short-term MA with a period set to 9, while EMA2 is the long-term MA with the period set to 21. The strategy generates buy signals when the EMA1 crosses above EMA2, and sell signals when it crosses below. 

By doing so, the strategy utilizes the trend-tracking capability of moving averages to capture signals when price starts a new trending direction. For example, when the price bounces up from a drop, the short-term MA would rally earlier than the long-term MA. The crossing above generates an early signal that the uptrend begins.

## Pros  

The biggest strength of this strategy lies in its capability to effectively identify price trends, especially suitable for markets with strong trending tendencies. Moving averages themselves have great trend-following features, and the dual MA mechanism further improves it. Also, comparing to single MA strategies, dual MAs can filter out more false signals and improve reliability.

## Cons  

The biggest risk is that when prices fluctuate dramatically, the lagging nature of MAs may lead to missing best entry or exit points. Also, when markets consolidate in ranges, there can be more invalid signals and lower stability of the strategy.  

To mitigate the risks, parameters like MA periods can be adjusted accordingly, or additional filters can be added. For example, combining volatility index to set a threshold and avoid trading in highly volatile conditions.

## Enhancement  

The optimization space mainly lies in the following aspects:

1. Optimize MA period parameters to find the optimal combination
2. Add other indicators as filters to improve signal reliability  
3. Setup adaptive parameters according to different products and market regimes
4. Combine volume indicators to determine precise entry points
5. Optimize stop loss mechanisms

## Summary  

This strategy generates signals by dual exponential moving averages, with strength in price trend tracking capability to detect trend reversals. But limitations like MA lag do exist. Next step would be enhancing signal quality, entry timing and stop loss from various dimensions.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|EMA KISA PERİYOT|
|v_input_2|21|EMA UZUN PERİYOT|
|v_input_3|2024|Backtest Başlangıç Tarihi|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-18 00:00:00
end: 2024-02-17 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © technicalTruff99446

//@version=4
strategy("AhmetMSA", overlay=true, initial_capital = 10000, commission_value = 0.002, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0, calc_on_order_fills = true)
//2. DEĞERDEN SONRA GEÇMİŞ HESAPLAMA DEĞERİ, KOMİSYON ORANI, PARANIN TAMAMI, DEĞERLERİ EKLEMDİ

emaShPD = input (title="EMA KISA PERİYOT", defval=9, minval=1)
emaLngPD = input (title="EMA UZUN PERİYOT", defval=21, minval=1)

//input   DEĞİŞKEN DEĞER ATAMA

ema1 = ema (close,emaShPD)
ema2 = ema (close,emaLngPD)

//EMALAR ARASINI BOYAMA upTrend downTrend
upTrend   = plot (ema1, color=#4DFF00, linewidth=2, title= "EMA KISA", transp=0)
downTrend = plot (ema2, color=#FF0C00, linewidth=3, title= "EMA UZUN", transp=0)
//linewidth ÇİZGİ KALINLIĞI
//title     İSİM VERME

//BACKTESTİN BAŞLANGIÇ TARİHİNİ BELİRLEME
yearin = input(2024, title = "Backtest Başlangıç Tarihi")
//longCondition = crossover(ema1, ema2)
//shortCondition = crossover(ema2, ema1)
buy = crossover(ema1, ema2) and yearin >= year
sell = crossover(ema2, ema1) and yearin >= year
//ta.crossunder  KESİŞİM KODU

//Barları BOYAMA
barbuy  = ema1 >= ema2
barsell = ema2 <  ema1




//AL SAT AŞK KUTUCUKLU EKRANA YAZMA
plotshape(buy, title = "AL AŞK", text = 'AL AŞK', style = shape.labelup, location = location.belowbar, color= color.green,   textcolor = color.white, transp = 0, size = size.tiny)
plotshape(sell, title = "SAT AŞK", text = 'SAT AŞK', style = shape.labeldown, location = location.abovebar, color= color.red,   textcolor = color.white, transp = 0, size = size.tiny)

//Barları BOYAMA KOŞULU
barcolor(barbuy? #4DFF00: barsell? #FF0C00: #FF0C00)


fill(upTrend, downTrend, color = ema1 >= ema2?#4DFF00 : #FF0C00, transp = 80, title = "bgcolor")

//longCondition = ta.crossover(ta.sma(close, 14), ta.sma(close, 28))
//shortCondition = ta.crossunder(ta.sma(close, 14), ta.sma(close, 28))
//14 GÜNLÜĞÜN KAPANIŞDEĞERİNİN 28 GÜNLÜK KAPANIŞ DEĞERİNİ KESMESİ KOŞULU



if (buy)
    strategy.entry("AL AŞK", strategy.long)


if (sell)
    strategy.entry("SAT AŞK", strategy.short)

```

> Detail

https://www.fmz.com/strategy/441999

> Last Modified

2024-02-18 15:11:04
