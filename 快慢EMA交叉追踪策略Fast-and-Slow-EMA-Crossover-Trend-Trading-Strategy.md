
> Name

快慢EMA交叉追踪策略Fast-and-Slow-EMA-Crossover-Trend-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略通过快、慢两EMA的交叉情况来判断价格趋势,进行趋势追踪操作。属于中长线趋势交易策略。

策略原理:

1. 分别计算一快一慢两EMA,典型参数为快线13周期,慢线48周期。

2. 当快线从下方向上突破慢线时,进行做多入场。

3. 当价格从上向下突破快线时,进行多单止损退出。

4. 可选择加入做空操作规则,进行双向交易。

该策略的优势:

1. 快慢EMA配合,可有效识别中长线趋势。

2. 突破交易方式,可在趋势开始阶段及时入场。

3. 止损方式简单直接,可控制单笔损失。

该策略的风险:

1. EMA均线存在滞后问题,可能错过最佳入场点位。

2. 须适当放宽止损幅度,避免过于频繁止损。

3. 震荡行情中难以判断明确趋势方向。

总之,该策略利用EMA交叉进行趋势判断和追踪。在参数优化和风险控制方面尚可提升,但整体思路简单实用。可通过优化适应不同市场类型。

||

This strategy trades the crossover of fast and slow EMAs to determine and track price trends. It aims to capture intermediate-term trends.

Strategy Logic:

1. Calculate fast and slow EMAs, typically 13 and 48 periods.

2. Enter long when fast EMA crosses above slow EMA. 

3. Exit long when price crosses below fast EMA.

4. Option to add short side rules for two-way trading.

Advantages:

1. Fast/slow EMA combo effectively identifies intermediate trends.

2. Breakout trading allows timely trend entries.

3. Simple stop loss mechanism controls loss per trade. 

Risks:

1. EMA lag causes missed best entry points.

2. Loosen stops to avoid excessive whipsaws.

3. Hard to determine clear trend direction during ranges.

In summary, this strategy uses EMA crosses for trend identification and tracking. Optimization on parameters and risk controls can further improve performance for a wide range of markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Fast MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|13|Fast MA Period|
|v_input_3_close|0|Slow MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|48|Slow MA Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-05 00:00:00
end: 2023-09-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

// strategy("EMA Strategy 13 48", shorttitle = "EMA Strategy 13 48", overlay=true, pyramiding = 3,default_qty_type = strategy.percent_of_equity, default_qty_value = 1000)


// === Inputs ===
// short ma
maFastSource   = input(defval = close, title = "Fast MA Source")
maFastLength   = input(defval = 13, title = "Fast MA Period", minval = 1)

// long ma
maSlowSource   = input(defval = close, title = "Slow MA Source")
maSlowLength   = input(defval = 48, title = "Slow MA Period", minval = 1)


// === Vars and Series ===
fastMA = ema(maFastSource, maFastLength)
slowMA = ema(maSlowSource, maSlowLength)

plot(fastMA, color=blue)
plot(slowMA, color=purple)

goLong() => crossover(fastMA, slowMA)
killLong() => crossunder(close, fastMA)
strategy.entry("Buy", strategy.long, when = goLong())
strategy.close("Buy", when = killLong())

// Shorting if using
goShort() => crossunder (fastMA, slowMA)
killShort() => crossover(fastMA, slowMA)
//strategy.entry("Sell", strategy.short, when = goShort())
//strategy.close("Sell", when = killShort())


 
```

> Detail

https://www.fmz.com/strategy/426521

> Last Modified

2023-09-12 18:06:26
