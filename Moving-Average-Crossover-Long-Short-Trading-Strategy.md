
> Name

Moving-Average-Crossover-Long-Short-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

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
