
> Name

基于布林带的趋势反转策略Bollinger-Bands-Trend-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/179b736ae9513263b9a.png)

[trans]


## 概述

该策略基于布林带指标和移动平均线,判断价格是否接近布林带上下轨时进行LONG或SHORT平仓,从而获利。当价格突破布林带上轨时看空;当价格跌破布林带下轨时看多。它结合了趋势反转和突破两种交易策略的优点,可以在趋势震荡时获得较好收益。

## 原理

该策略主要判断以下两个入场信号:

1. 多头信号:当收盘价触及下轨,且收盘价高于EMA均线,前K线实体为阴线,当前K线实体为阳线时做多。

2. 空头信号:当收盘价触及上轨,且收盘价低于EMA均线,前K线实体为阳线,当前K线实体为阴线时做空。 

止损方式:固定止损。止损点为入场价格到对手方轨距的风险回报系数倍。

止盈方式:目标盈利为对手方轨。也就是做多止盈为下轨,做空止盈为上轨。

## 优势

1. 结合趋势和反转策略的优点,在趋势震荡行情中表现较好。

2. 利用布林带指标判断超买超卖区域,精确判断反转机会。

3. 固定止损点设定合理,有助于风险控制。

4. 移动止盈方式让利润能最大化。

## 风险

1. 突破型策略容易被套利,需警惕假突破。

2. 行情过于震荡时,止损可能会频繁被触发。

3. 固定止损无法根据市场波动调整,可能过于宽松或过于激进。

4. 布林带参数设置不当时,效果可能会差强人意。

## 优化思路

1. 可以考虑結合RSI指标過濾入場信號,例如RSI高於50再做多,RSI低於50再做空,可避免錯誤訊號。

2. 增加自动调整固定止损距离的功能,使止损更具弹性。例如根据ATR指标动态设置止损距离。

3. 优化布林带参数,寻找最佳参数组合。

4. 可以测试不同EMA均线参数,优化均线的护城河效应。

## 总结

该策略综合考虑趋势和反转,利用布林带判定超买超卖点位入场,通过移动止盈让利润最大化。在趋势震荡行情中表现较好。但需要注意防范被套现象,同时要调整参数优化策略效果。整体来说是一个比较实用的高效策略。

||


## Overview

This strategy utilizes Bollinger Bands and Moving Average to go LONG or SHORT when price approaches the upper or lower bands. It goes short when price breaks above the upper band and goes long when price breaks below the lower band. The strategy combines the advantages of both trend following and mean reversion strategies, and performs well during range-bound markets.

## Logic

The strategy identifies two entry signals:

1. Long signal: when close price hits the lower band while above EMA line, previous candle was bearish and current candle is bullish. 

2. Short signal: when close price hits the upper band while below EMA line, previous candle was bullish and current candle is bearish.

The stop loss uses fixed stop loss. The stop loss level is set at the entry price plus/minus risk/reward ratio times the distance between entry price and take profit level. 

The take profit uses dynamic take profit. Long take profit is set at the lower band. Short take profit is set at the upper band.

## Advantages

1. Combines the strengths of both trend following and mean reversion strategies, performs well during range-bound markets.

2. Utilizes Bollinger Bands to identify overbought and oversold levels, improving accuracy of reversal signals.

3. Fixed stop loss facilitates risk management. 

4. Dynamic take profit allows maximization of profits.

## Risks

1. Breakout strategies are susceptible to stop runs. Need to beware of false breakouts.

2. Frequent stop loss triggers when market is too choppy.

3. Fixed stop loss is not adaptive to market volatility. Can be too wide or too tight.

4. Poor parameter tuning of Bollinger Bands can lead to mediocre results.

## Enhancement

1. Incorporate RSI indicator to filter entry signals. For example, only go long if RSI is above 50, and only go short if RSI is below 50. This avoids bad signals.

2. Implement adaptive stop loss that adjusts stop distance based on volatility. E.g. use ATR to set dynamic stop loss.

3. Optimize Bollinger Bands parameters to find best parameter combinations. 

4. Test different EMA periods to enhance the EMA's support/resistance effect.

## Summary

The strategy combines trend and reversal, entering overbought/oversold levels identified by Bollinger Bands. It maximizes profits through dynamic take profit. Performs well during range-bound markets. Be wary of stop runs. Fine tune parameters to optimize performance. Overall a practical and effective strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|2|StdDev|
|v_input_4|200|EMA Input|
|v_input_5|1.5|Risk/Reward Ratio|
|v_input_6|false|Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-24 00:00:00
end: 2023-10-31 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

// Welcome to yet another script. This script was a lot easier since I was stuck for so long on the Donchian Channels one and learned so much from that one that I could use in this one
// This code should be a lot cleaner compared to the Donchian Channels, but we'll leave that up to the pro's
// This strategy has two entry signals, long = when price hits lower band, while above EMA, previous candle was bearish and current candle is bullish
// Short = when price hits upper band, while below EMA, previous candle was bullish and current candle is bearish
// Take profits are the opposite side's band(lower band for long signals, upper band for short signals). This means our take profit price will change per bar
// Our stop loss doesn't change, it's the difference between entry price and the take profit target divided by the input risk reward
// At the time of writing this, I could probably calculate that much easier by simply multiplying the opposite band by the input risk reward ratio
// Since I want to get this script out and working on the next one, I won't clean that up, I'm sorry
// strategy(shorttitle="BB Trending Reverse Strategy", title="Bollinger Bands Trending Reverse Strategy", overlay=true, default_qty_type = strategy.cash, default_qty_value = 150, initial_capital = 1000, currency = currency.USD, commission_type = "percent", commission_value = 0.036)

// The built-in Bollinger Band indicator inputs and variables, added some inputs of my own and organised the code
length              = input(20, minval=1)
src                 = input(close, title="Source")
mult                = input(2.0, minval=0.001, maxval=50, title="StdDev")
emaInput            = input(title = "EMA Input", type = input.integer, defval = 200, minval = 10, maxval = 400, step = 1)
riskreward          = input(title = "Risk/Reward Ratio", type = input.float, defval = 1.50, minval = 0.01, maxval = 100, step = 0.01)
offset              = input(0, "Offset", type = input.integer, minval = -500, maxval = 500)
basis               = sma(src, length)
dev                 = mult * stdev(src, length)
upper               = basis + dev
lower               = basis - dev
ema                 = ema(close, emaInput)

// These are our conditions as explained above
entryLong           = low[1] <= lower[1] and low <= lower and low > ema
entryShort          = high[1] >= upper[1] and high >= upper and high < ema
reversecandleLong   = close > open and close[1] < open[1]
reversecandleShort  = close < open and close[1] > open[1]
var stopLong        = 0.0
var stopShort       = 0.0

// These are our entry signals, notice how the stop condition is within the if statement while the strategy.exit is outside of the if statement, this way the take profit targets trails up or down depending on what the price does
if reversecandleLong and entryLong and strategy.position_size == 0
    stopLong := (((close / upper - 1) * riskreward + 1) * close)
    strategy.entry("Long Entry", strategy.long, comment = "Long Entry")
    
strategy.exit("Exit Long", "Long Entry", limit = upper, stop = stopLong, comment = "Exit Long")

if reversecandleShort and entryShort and strategy.position_size == 0
    stopShort := (((close / lower - 1) / riskreward + 1) * close)
    strategy.entry("Short Entry", strategy.short, comment = "Short Entry")

strategy.exit("Exit Short", "Short Entry", limit = lower, stop = stopShort, comment = "Exit Short")


// The built-in Bollinger Band plots
plot(basis, "Basis", color=#872323, offset = offset)
p1 = plot(upper, "Upper", color=color.teal, offset = offset)
p2 = plot(lower, "Lower", color=color.teal, offset = offset)
fill(p1, p2, title = "Background", color=#198787, transp=95)
plot(ema, color=color.red)

// These plots are to check the stoplosses, they can  make a mess of your chart so only use these if you want to make sure these work
// plot(stopLong)
// plot(stopShort)
```

> Detail

https://www.fmz.com/strategy/430743

> Last Modified

2023-11-01 11:29:34
