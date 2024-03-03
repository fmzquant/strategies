
> Name

基于ADX-EFI指标的趋势回调策略ADX-EFI-50-Moving-Average-Channel-Pullback-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略利用50周期均线通道和ADX动向指数以及EFI能量指标组合进行趋势交易。当EFI能量指标显示趋势启动后,在50均线通道区域进行回调进入场内。策略适用于1分钟时间周期。

## 策略原理

1. 计算50周期的均线通道,通道上沿为高点的均线,下沿为低点的均线。

2. 计算ADX动向指数判断趋势强度,只有强势趋势时(ADX>20)才考虑交易。

3. 计算长周期(120周期)和短周期(15周期)的EFI能量指标。长周期指标大于0表示总体上升趋势能量增强,短周期指标小于0表示短期升势脉冲消退。

4. 当长短周期EFI指标发出买入信号时,并且价格回调至50均线通道时,进行买入操作。

5. 当长短周期EFI指标发出卖出信号时,并且价格回调至50均线通道时,进行卖出操作。

## 优势分析

该策略结合趋势、动量和回调信号,可以有效过滤掉大部分假突破。具体优势如下:

1. 50均线通道清晰判定主要趋势方向。

2. ADX指标确保只在趋势明确时交易,避免震荡市场的套利。

3. EFI指标判断趋势能量增强的瞬间进行买入,降低了买点的风险。

4. 等待回调进入场内,可以获得更好的风险回报比。

5. 多种指标组合,可以有效过滤假突破带来的风险。

## 风险分析

该策略主要存在以下风险:

1. 强势趋势中也会有较大幅度的回调,需要设置较宽的止损范围。

2. 在震荡行情中,EFI指标可能发出错误信号,需要搭配趋势判断指标如ADX。 

3. 回调过深时会错过入场时机,可以适当调整均线参数。

4. 单一交易品种,不能有效分散市场系统性风险。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 测试更多品种,寻找策略参数通用范围。

2. 增加止损策略,通过追踪止损来锁定利润。

3. 进行参数优化,优化ADX、EFI等指标参数。

4. 增加机器学习算法,利用大数据训练判断真假趋势突破。

5. 增加多时间周期交易,不同周期之间采用Spacing技术控制仓位。

6. 评估并引入更多趋势过滤指标,提高信号质量。

## 总结

该策略整体来说是一个非常适合初学者掌握的趋势回调策略。它融合了趋势、动量和回调等多种信号,可以有效过滤假突破。通过优化止损策略、参数设定、时间周期等,该策略可以成为一个强大的趋势跟踪系统。总体来说,该策略是一个非常实用的趋势交易策略,值得深入研究与应用。

||

## Overview

This strategy uses a combination of the 50-period moving average channel, ADX directional index and EFI energy index for trend trading. When the EFI energy index shows a trend start, it enters the market during a pullback within the 50 MA channel area. The strategy is suitable for the 1-minute timeframe.

## Strategy Logic

1. Calculate the 50-period moving average channel, with the upper band being the moving average of high prices and the lower band being the moving average of low prices.

2. Calculate the ADX directional index to determine trend strength, and only consider trading during strong trends (ADX>20).

3. Calculate the long-term (120-period) and short-term (15-period) EFI energy indexes. The long-term index above 0 indicates an overall upward trend in energy, while the short-term index below 0 indicates a short-term uptrend retreat.

4. When the long and short term EFI indexes give a buy signal, and the price pulls back to the 50 MA channel, a long position is taken.

5. When the long and short term EFI indexes give a sell signal, and the price pulls back to the 50 MA channel, a short position is taken.

## Advantage Analysis 

This strategy combines trend, momentum and pullback signals to effectively filter out most false breakouts. The specific advantages are:

1. The 50 MA channel clearly determines the main trend direction. 

2. The ADX index ensures trading only occurs during clear trends, avoiding whipsaws in ranging markets.

3. The EFI index captures trend energy surges for low-risk entry points.

4. Waiting for pullbacks allows better risk-reward ratios.

5. Multiple indicator combinations effectively filter false breakout risks.

## Risk Analysis

The main risks of this strategy are:

1. Strong trends can also have larger pullbacks, requiring wider stop-loss ranges.

2. In ranging markets, the EFI may give false signals, requiring pairing with trend-filtering indicators like ADX.

3. Pullbacks that are too deep can miss entry points, possibly requiring MA tuning.

4. A single trading instrument fails to diversify market systematic risks. 

## Optimization Directions

This strategy can be improved in several aspects:

1. Test on more instruments to find optimal universal parameters.

2. Add profit-taking via trailing stop losses.

3. Parameter optimization of ADX, EFI settings and more.

4. Incorporate machine learning for robust trend vs false breakout detection.

5. Add multi-timeframe analysis with position sizing between timeframes.

6. Evaluate more trend-filtering indicators to improve signal quality.

## Summary

Overall this is an excellent trend pullback strategy for beginners, combining trend, momentum and pullback signals to filter false breakouts. With refinements in stop-loss, parameter tuning, timeframes and more, it can become a robust trend following system. In summary, a very practical and research-worthy trend trading strategy.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-09-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © trent777brown

//@version=5
// strategy("adx efi 50 ema channel, trend pullback", overlay=true, margin_long=100, margin_short=100, currency=currency.USD, initial_capital= 100000, close_entries_rule="ANY")

//bollingerbands
[basis, upperband, lowerband]= ta.bb(ohlc4, 50, 3) 
[basis2, upperband2, lowerband2]= ta.bb(ohlc4, 50, 2)
psar= ta.sar(.1, .1, .09)
ema50= ta.ema(hlc3, 50) 
ema50hi= ta.ema(high, 50) 
ema50lo= ta.ema(low, 50) 
ema18= ta.wma(hlc3, 15)
wma9= ta.wma(open, 9) 
wma5= ta.wma(ohlc4, 5) 
ema34= ta.rma(hlc3, 10)
[macdline, signalline, histline]= ta.macd(hlc3, 5, 34, 5) 
[macdline2, signalline2, histline2]= ta.macd(hlc3, 15,70, 24) 
[diplus, diminus, adx]= ta.dmi(20, 20) 
[diplus2, diminus2, adx2]= ta.dmi(12, 12)
rsi= ta.rsi(hlc3, 14)
rsisma= ta.sma(rsi, 10) 
stoch= ta.stoch(close, high, low, 21)
k= ta.wma(stoch, 3)
d= ta.wma(k, 3)
trendline5= ta.wma(hlc3, 300) 
trendline9= ta.wma(open, 540) 
trendline18= ta.wma(open, 1080)
atr=ta.atr(14)
plot(psar, color=color.red, style=plot.style_circles)
plot(ema50, color=color.white, linewidth=4) 
plot(ema50hi, color=color.yellow, linewidth=4)
plot(ema50lo, color=color.yellow, linewidth=4)
plot(ema34, color=color.aqua, linewidth=4)
plot(wma9, color=color.gray, linewidth=4) 
plot(wma5, color=color.lime, linewidth=4) 
plot(trendline18, color=color.orange, linewidth=4) 
plot(upperband, color=color.navy, linewidth=4) 
plot(lowerband, color=color.navy, linewidth=4)
plot(upperband2, color=color.navy, linewidth=4)
plot(lowerband2, color=color.navy, linewidth=4)
plot(trendline9, color=color.maroon, linewidth=4)
plot(trendline5, color=color.yellow, linewidth=4)


efi = ta.rma(ta.change(close) * volume, 15)
efi2= ta.rma(ta.change(close) * volume, 120)

buy= efi2 > 0 and efi < 0 and efi[1] < efi  and adx >= 20 and open < ema50hi
sell= efi2 < 0 and efi > 0 and efi[1] > efi and adx >= 20 and open > ema50lo

//ell= rsi > 50 and ta.crossunder(wma5, wma9) and psar > high and ema18 <= ema50hi and macdline > 0 and macdline < signalline
//buy= ta.crossunder(close, ema50) and rsi < 50 and adx2 < adx2[1] and k < 25 and psar > high
//uy= rsi < 60 and ta.crossover(wma5, wma9)  and psar < low and ema18 >= ema50 and macdline2 > 0 and diplus2 < 30 // and histline2 < 0  
//buy=  ema18 > ema50 and ta.crossunder(rsi, 45) and open < ema50hi and adx2[3] < adx2 and diplus2 < 25 and macdline < 0  and adx < 10
//sell= ta.crossover(close, ema50) and rsi > 50 and adx2 < adx2[1] and k > 75 and psar < low
//ell= ema18 < ema50 and ta.crossover(rsi, 60) and open > ema50lo and diminus2 < 30 and macdline2 < 0 and adx2[2] < adx2 
//buy sell conditions 1
//buy= ta.crossover(wma5, ema18) and ema18 > ema50lo and diplus > 22 and diminus < 22 and adx > 15
//ell= ta.crossover(psar, high) and macdline2 < signalline2 and rsi < rsisma
//when conditions
buytrig= ema34 >= ema50lo
selltrig= ema34 <= ema50hi
//strategy
sl= low - atr * 8
tp= high +  atr * 4
sellsl= high + atr * 8
selltp= low - atr * 4
if(buy)
    strategy.entry("buy", strategy.long, when= buytrig)
    strategy.exit("exit buy", "buy", limit= tp, stop= sl)
    strategy.close("close", when= ta.crossunder(ema34, ema50lo))
if(sell)
    strategy.entry("sell", strategy.short, when= selltrig)
    strategy.exit("exit sell", "sell", limit= selltp, stop= sellsl)

```

> Detail

https://www.fmz.com/strategy/427279

> Last Modified

2023-09-19 17:10:51
