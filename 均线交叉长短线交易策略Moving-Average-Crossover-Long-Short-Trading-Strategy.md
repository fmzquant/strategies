
> Name

均线交叉长短线交易策略Moving-Average-Crossover-Long-Short-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11eb458b6f407531342.png)
[trans]

## 概述
该策略是基于均线的长短线交易策略。它使用快速简单移动平均线(SMA)和慢速简单移动平均线,当快速SMA上穿慢速SMA时做多,当快速SMA下穿慢速SMA时做空。

## 策略原理
该策略使用两个SMA指标:一个20天的快速SMA和一个50天的慢速SMA。当短期的快速SMA从下方上穿长期的慢速SMA时,表示市场趋势转为上升,这时做多。当快速SMA从上方下穿慢速SMA时,表示市场趋势转为下降,这时做空。

具体来说,如果快速SMA上穿慢速SMA,就开仓做多。如果快速SMA下穿慢速SMA,就开仓做空。在相反的SMA交叉出现时平仓。

## 优势分析
这种SMA交叉策略简单易用,易于理解和实现。相对其他技术指标而言,SMA指标延迟性较小,可以更敏感地捕捉趋势的变化。

使用快慢两个SMA可以起到滤波的作用。快速SMA捕捉短期动向,慢速SMA过滤噪音。它们的交叉有助于捕捉中长期趋势的转折点。

该策略交易频率较低,适合长线投资者。它只在SMA交叉的时候开仓,避免了不必要的交易。

## 风险分析
该策略可能存在些许滞后。由于SMA本身的滞后性,该策略生成信号的时间早晚存在一定滞后。这可能导致部分利润的损失。

当股价出现跳空或短期趋势反转时,快慢SMA可能发出错误信号,导致不必要的亏损。这时就要考验投资者的心理素质。

## 优化方向
该策略可以从以下几个方面进行优化:

1. 调整快速和慢速SMA的周期参数,优化交叉效果
2. 增加其他技术指标过滤,例如MACD、KD等,提高信号准确率
3. 增加止损策略,控制单笔亏损
4. 结合股票个股特点,调整参数

## 总结
该策略整体来说是一种简单实用的长线交易策略。它利用均线交叉原理,在大趋势转折点给出交易信号。同时结合快慢SMA双均线过滤,可以有效减少错误信号。该策略易于理解和实现,适合大多数长线投资者,是一种值得推荐的量化交易策略。通过参数优化和辅助技术指标增加,该策略可以获得更好的策略效果。

||

## Overview  
This strategy is a long-short trading strategy based on moving average crossover. It uses fast simple moving average (SMA) and slow SMA. When fast SMA crosses above slow SMA, go long. When fast SMA crosses below slow SMA, go short.  

## Strategy Logic
The strategy uses two SMA indicators: a 20-day fast SMA and a 50-day slow SMA. When short-term fast SMA crosses above long-term slow SMA from below, it indicates the market trend is turning bullish, so go long. When fast SMA crosses below slow SMA from above, it indicates the market trend is turning bearish, so go short.   

Specifically, if fast SMA crosses above slow SMA, open long position. If fast SMA crosses below slow SMA, open short position. Close position when the opposite SMA crossover occurs.  

## Advantage Analysis
This SMA crossover strategy is simple to use and understand. Compared to other technical indicators, SMA has smaller lagging and can capture trend changes more sensitively.  

Using double fast and slow SMA acts as a filter. Fast SMA captures short-term moves while slow SMA filters out noises. Their crossover helps capture mid-long term trend turning points.  

The strategy has relatively low trading frequency suitable for long-term investors. It only opens position on SMA crossovers, avoiding unnecessary trades. 

## Risk Analysis  
The strategy may have some lagging. Due to the lagging nature of SMA itself, there can be certain delay in the timing of signal generation. This may lead to loss of some profits.

When price gaps or short-term reversal occurs, fast and slow SMA may give out false signals, resulting in unnecessary losses. This tests investor's psychological quality.  

## Optimization  

The strategy can be optimized from the following aspects:

1. Adjust fast and slow SMA periods to optimize crossover effect   
2. Add other technical indicator filters e.g. MACD, KD to improve signal accuracy
3. Add stop loss to control single trade loss  
4. Adjust parameters based on individual stock characteristics   

## Conclusion
Overall this is a simple and practical long term trading strategy. It gives trading signals around major trend turning points based on the principle of moving average crossover. Coupling fast and slow double SMA acts as effective filter to reduce false signals. The strategy is easy to understand and implement, suitable for most long-term investors. It is a recommended quantitative trading strategy. Further improvements can be made through parameter tuning and adding complementary technical indicators.
[/trans]]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|SMA Veloce|
|v_input_2|50|SMA Lenta|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-14 00:00:00
end: 2023-12-21 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © forsakenMaster81726

//@version=5
strategy("Il mio script", overlay=true)

// Imposta le medie mobili
fastLength = input(20, title="SMA Veloce")
slowLength = input(50, title="SMA Lenta")

smaFast = ta.sma(close, fastLength)
smaSlow = ta.sma(close, slowLength)

// Crossover SMA (Veloce sopra Lenta)
bullishCrossover = ta.crossover(smaFast, smaSlow)

// Crossunder SMA (Veloce sotto Lenta)
bearishCrossover = ta.crossunder(smaFast, smaSlow)

// Regole di trading
strategy.entry("Long", strategy.long, when=bullishCrossover)
strategy.close("Long", when=bearishCrossover)

strategy.entry("Short", strategy.short, when=bearishCrossover)
strategy.close("Short", when=bullishCrossover)

// Plot delle medie mobili sul grafico
plot(smaFast, color=color.green, title="SMA Veloce")
plot(smaSlow, color=color.red, title="SMA Lenta")

// Plot del prezzo
plot(close, color=color.blue, title="Prezzo")

```

> Detail

https://www.fmz.com/strategy/436254

> Last Modified

2023-12-22 15:13:50
