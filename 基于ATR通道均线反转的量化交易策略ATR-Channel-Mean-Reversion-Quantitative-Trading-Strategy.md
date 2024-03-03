
> Name

基于ATR通道均线反转的量化交易策略ATR-Channel-Mean-Reversion-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16eef11d52550f68057.png)
[trans]

## 概述

该策略是一个仅做多的策略,它利用价格突破ATR通道下限来确定入场时机,并以ATR通道均线或ATR通道上限作为止盈退出。同时,它还会利用ATR来计算止损价格。该策略适合做快速短线交易。

## 策略原理

当价格跌破ATR通道下限时,表明价格出现了异常的下跌。此时策略会在下一根K线开盘的时候做多入场。止损价格为入场价减去ATR止损系数乘以ATR。止盈价格为ATR通道均线或ATR通道上限,如果当前K线收盘价低于前一根K线的最低价,则以前一根K线最低价作为止盈价格。

具体来说,该策略主要包含以下逻辑:

1. 计算ATR和ATR通道均线
2. 确定时间过滤条件
3. 当价格低于ATR通道下限时,标记可以做多入场
4. 在下一根K线开盘时做多入场
5. 记录入场价
6. 计算止损价格
7. 当价格高于ATR通道均线或ATR通道上限时,平仓止盈
8. 当价格低于止损价时,止损退出

## 优势分析

该策略具有以下优势:

1. 利用ATR通道来确定入场和止盈,可靠性较高
2. 做多仅在异常下跌后才入场,避免追高
3. 止损规则严格,有效控制风险
4. 适合快速短线交易,无须长时间持仓
5. 简单易懂的规则,容易实现和优化

## 风险分析

该策略也存在一些风险:

1. 频繁交易带来的交易费用和滑点风险
2. 可能出现止损连续被触发的情况
3. 参数优化不当可能影响策略效果
4. 标的价格波动较大时,止损可能过大

可以通过调整ATR周期,缩小止损系数等方法来降低上述风险。同时选择交易费用较低的券商也很重要。

## 优化方向

该策略还可以从以下方面进行优化:

1. 增加其他指标过滤,避免错失最佳入场时机
2. 优化ATR周期参数
3. 考虑加入再入场机制
4. 动态调整止损幅度
5. 加入趋势判断规则,避免逆势入场

## 总结

该策略整体而言是一个简单实用的短线突破均线反转策略。它有着清晰的入场规则、严格的止损机制以及完善的止盈方式。同时也提供了一些参数调整的优化空间。如果交易者能够选择合适的标的并配合止损来控制风险,该策略应该能够获得不错的效果。

|| 

## Overview

This is a long-only strategy that identifies entry signals when prices break below the lower band of the ATR channel, and takes profit when prices reach the middle band (EMA) or upper band of the ATR channel. It also uses ATR to calculate stop loss levels. This strategy is suitable for quick short-term trades.  

## Strategy Logic

When the price breaks below the lower ATR band, it signals an anomaly drop. The strategy will go long at the next candle's open. The stop loss is set at entry price minus ATR stop loss multiplier times ATR. Take profit is at the middle band (EMA) or upper ATR band. If current bar's close is lower than previous bar's low, then use previous bar's low as take profit.

Specifically, the key logic includes:

1. Calculate ATR and middle band (EMA)
2. Define time filters 
3. Identify long signal when price < lower ATR band  
4. Enter long at next bar's open
5. Record entry price
6. Calculate stop loss price
7. Take profit when price > middle band (EMA) or upper ATR band
8. Stop out when price < stop loss price

## Advantage Analysis 

The advantages of this strategy:

1. Uses ATR channel for reliable entry and exit signals
2. Only long after anomaly drop avoids chasing highs 
3. Strict stop loss controls risk
4. Suitable for quick short-term trades
5. Simple logic easy to implement and optimize

## Risk Analysis

There are some risks:

1. High trading frequency leads to higher transaction costs and slippage
2. Consecutive stop loss triggers may happen
3. Inappropriate parameter optimization impacts performance
4. Large price swings may result in oversized stop loss

These risks can be reduced by adjusting ATR period, stop loss multiplier etc. Choosing brokers with low trading fees is also important.

## Optimization Directions

The strategy can be improved by:

1. Adding other filter indicators to avoid missing best entry signals
2. Optimizing ATR period 
3. Considering re-entry mechanism
4. Adaptive stop loss size
5. Adding trend filter to avoid counter-trend trades

## Conclusion

In summary, this is a simple and practical mean reversion strategy based on ATR channel. It has clear entry rules, strict stop loss, and reasonable take profit. There is also room for parameter tuning. If traders can choose the right symbol and control risk with stop loss, this strategy can achieve good results.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|1.5|SL Multiplier|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|10|ATR & MA PERIOD|
|v_input_3|timestamp(01 Jan 1995 13:30 +0000)|(?Time Filter)Start Filter|
|v_input_4|timestamp(1 Jan 2099 19:30 +0000)|End Filter|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-04 00:00:00
end: 2023-12-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Bcullen175

//@version=5
strategy("ATR Mean Reversion", overlay=true, initial_capital=100000,default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=6E-5) // Brokers rate (ICmarkets = 6E-5)
SLx = input(1.5, "SL Multiplier", tooltip = "Multiplies ATR to widen stop on volatile assests, Higher values reduce risk:reward but increase winrate, Values below 1.2 are not reccomended")
src = input(close, title="Source")
period = input.int(10, "ATR & MA PERIOD")
plot(open+ta.atr(period))
plot(open-ta.atr(period))
plot((ta.ema(src, period)), title = "Mean", color=color.white)

i_startTime     = input(title="Start Filter", defval=timestamp("01 Jan 1995 13:30 +0000"), group="Time Filter", tooltip="Start date & time to begin searching for setups")
i_endTime       = input(title="End Filter", defval=timestamp("1 Jan 2099 19:30 +0000"), group="Time Filter", tooltip="End date & time to stop searching for setups")

// Check filter(s)
f_dateFilter = true

atr = ta.atr(period)

// Check buy/sell conditions
var float buyPrice = 0
buyCondition    = low < (open-ta.atr(period)) and strategy.position_size == 0 and f_dateFilter
sellCondition   = (high > (ta.ema(close, period)) and strategy.position_size > 0 and close < low[1]) or high > (open+ta.atr(period))
stopDistance    = strategy.position_size > 0 ? ((buyPrice - atr)/buyPrice) : na
stopPrice       = strategy.position_size > 0 ? (buyPrice - SLx*atr): na
stopCondition   = strategy.position_size > 0 and low < stopPrice

// Enter positions
if buyCondition
    strategy.entry(id="Long", direction=strategy.long)

if buyCondition[1]
    buyPrice := open

// Exit positions
if sellCondition or stopCondition
    strategy.close(id="Long", comment="Exit" + (stopCondition ? "SL=true" : ""))
    buyPrice := na

// Draw pretty colors
plot(buyPrice, color=color.lime, style=plot.style_linebr)
plot(stopPrice, color=color.red, style=plot.style_linebr, offset=-1)

```

> Detail

https://www.fmz.com/strategy/434995

> Last Modified

2023-12-11 15:38:25
