
> Name

基于SMA和ATR的跟踪止损策略SMA-ATR-Dynamic-Trailing-Stop-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a98bf2cb957855c7f6.png)
[trans]
## 概述

该策略是一个基于简单移动平均线(SMA)和平均真实波动率(ATR)设置动态跟踪止损的长线交易策略。它结合了趋势跟踪和风险管理的优点,旨在控制回撤并让利润最大化。

## 策略原理

当收盘价上穿SMA 200天加ATR 14天时,做多入场。当收盘价下穿SMA 200天减ATR 14天时,平仓止损。该策略使用SMA 200判断大趋势方向,使用ATR设置止损线,实现动态跟踪止损。具体来说,买入信号是收盘价突破SMA 200加ATR 14天,这个突破表示当前处于上升趋势中。止损信号是收盘价跌破SMA 200减ATR 14天,这个突破表示上升趋势被打破。

## 优势分析

该策略结合了SMA和ATR两个指标的优势。SMA 200可过滤市场噪音,锁定长线主方向;而ATR 14天可以根据最近两周的波动率设定止损线,达到动态跟踪止损的效果。这实现了在趋势中的持续盈利,同时也可有效控制回撤。总体来说,该策略的优势有:

1. 盈亏比高。跟随趋势运行,止损控制风险,从而取得较高盈亏比。

2. 回撤可控。ATR动态跟踪降低突发事件的影响,有效控制回撤。

3. 参数简单。只使用两个参数,实现风险与收益的平衡,避免过度优化。

## 风险分析

该策略也存在一些风险需要关注。主要风险如下:

1. 趋势反转风险。策略本身无法判断趋势反转,如果出现突然调头可能带来较大亏损。

2. SMA延迟风险。SMA有一定滞后性,无法即时反映趋势变化。

3. ATR参数设置风险。ATR参数设置过大或过小,都会影响策略表现。

对应解决方法:
1. 结合其他指标判断趋势,如MACD。
2. 测试不同参数组合寻找最佳平衡。

## 优化方向 

该策略还可从以下几个方面进行优化:

1. 测试不同的SMA和ATR参数组合,寻找最佳参数。

2. 增加其他技术指标判断反转,如MACD。

3. 优化止损机制,如变化止损、移动止损等方式。

4. 结合股票的基本面指标,避免买入上涨无望的个股。

## 总结

该策略整合了趋势跟踪和动态风险管理的方法,实现了长线持有期间的止损与止盈优化。它具有盈亏比高、回撤可控、风险收益平衡的特点。但也存在一定的趋势反转风险和参数优化难度。总体而言,该策略可为量化交易提供一个简单有效的长线交易思路,值得进一步测试与优化。

||

## Overview

This strategy is a long-term trading strategy that sets dynamic trailing stop loss based on Simple Moving Average (SMA) and Average True Range (ATR). It combines the advantages of trend tracking and risk management to control drawdowns while maximizing profits.

## Strategy Logic

Enter long when the closing price crosses above SMA 200 plus ATR 14, close the position when the closing price crosses below SMA 200 minus ATR 14. The strategy uses SMA 200 to determine the major trend direction, and sets the stop loss line dynamically with ATR 14, realizing dynamic trailing stop loss. Specifically, the buy signal is triggered when the closing price breaks through SMA 200 plus ATR 14. This breakout means the current market stays in upward trend. The stop loss signal is triggered when the closing price breaks through SMA 200 minus ATR 14. This breakout means the upward trend is broken.  

## Advantage Analysis

This strategy combines the advantages of both SMA and ATR indicators. SMA 200 filters market noise and locks in primary trend direction. ATR 14 sets stop loss line based on the volatility of recent two weeks, realizing dynamic trailing stop loss function. This achieves sustained profitability within the trend, while also controlling drawdowns effectively. The overall advantages are:

1. Higher profit/loss ratio. Following trends and controlling risks leads to higher profit/loss ratio.  

2. Controllable drawdowns. The dynamic stop loss with ATR reduces the impact of sporadic market shocks.

3. Simple parameters. Only two parameters balance risks and returns, avoiding overfitting.

## Risk Analysis  

Some risks of this strategy should be concerned:

1. Trend reversal risk. The strategy itself cannot identify trend reversal, which may lead to huge losses if sudden trend turning appears.

2. SMA lagging risk. SMA has some lagging effect which cannot reflect trend change instantly. 

3. ATR parameter risk. Improper ATR parameter setting can influence strategy performance.

Solutions:
1. Add other indicators to determine trend reversal, e.g. MACD. 
2. Test different parameter combinations to find the optimal balance.

## Optimization Directions

This strategy can be further optimized from the following aspects:

1. Test different combinations of SMA and ATR parameters to find the optimal one.  

2. Add more technical indicators to judge reversal, e.g. MACD.

3. Optimize the stop loss mechanism with trailing stop loss, moving stop loss etc.  

4. Combine fundamental factors to avoid buying up stocks with weak fundamentals.   

## Conclusion

This strategy integrates trend tracking and dynamic risk management methods to optimize stop loss and take profit during long holding periods. It features high profit/loss ratio, controllable drawdowns and balanced risk/return profile. But it also has some trend reversal risks and difficulty in parameter optimization. Overall, this simple and effective strategy provides a long-term trading idea worthy of further testing and optimization for quantitative trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|SMA Länge|
|v_input_2|14|ATR Länge|
|v_input_3|true|Zeige SMA und ATR-Bänder|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-30 00:00:00
end: 2024-02-05 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("SMA+ATR Strategie", overlay=true)

// Benutzer-Inputs für SMA, ATR und die Anzeigeoption
smaLength = input(200, title="SMA Länge")
atrLength = input(14, title="ATR Länge")
showSMAandATR = input(true, title="Zeige SMA und ATR-Bänder")

// Berechnung von SMA und ATR
sma = ta.sma(close, smaLength)
atr = ta.atr(atrLength)

// Kauf- und Verkaufslogik basierend auf SMA und ATR
buyCondition = close > sma + atr
sellCondition = close < sma - atr

// Variable zum Speichern des Eintrittspreises
var float entryPrice = na

// Kauf- und Verkaufssignale
if (buyCondition)
    strategy.entry("Buy", strategy.long)
    entryPrice := close // Speichere den Eintrittspreis

if (sellCondition)
    // Nur wenn ein Kauf stattgefunden hat
    if not na(entryPrice)
        // Berechne die Performance seit dem Kaufsignal
        performanceSinceBuy = ((close - entryPrice) / entryPrice) * 100
        // Anzeigen der Performance
        // Wähle die Box-Farbe basierend auf dem Vorzeichen der Performance
        plColor = performanceSinceBuy >= 0 ? color.green : color.red
        // Anzeigen der Performance in der entsprechenden Farbe
        plBox = "P/L: " + str.tostring(performanceSinceBuy, "#.##") + "%"
        label.new(bar_index, high, text=plBox, color=plColor, textcolor=color.white, style=label.style_label_center, yloc=yloc.price)
        
    // Schließe den Trade und setze den Eintrittspreis zurück
    strategy.close("Buy")
    entryPrice := na

// Optionale Anzeige von SMA und ATR-Band
plot(showSMAandATR ? sma : na, color=color.blue, title="SMA 200")
plot(showSMAandATR ? sma + atr : na, color=color.green, title="SMA 200 + ATR")
plot(showSMAandATR ? sma - atr : na, color=color.red, title="SMA 200 - ATR")
```

> Detail

https://www.fmz.com/strategy/441143

> Last Modified

2024-02-06 10:06:29
