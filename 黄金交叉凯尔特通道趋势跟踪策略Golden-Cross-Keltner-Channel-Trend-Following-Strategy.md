
> Name

黄金交叉凯尔特通道趋势跟踪策略Golden-Cross-Keltner-Channel-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/93393107ae4a875932.png)
[trans]


## 概述

黄金交叉凯尔特通道趋势跟踪策略是一种仅在趋势方向上进行交易的策略。它结合了移动平均线黄金交叉和凯尔特通道作为入市信号,以捕捉趋势的方向。 

## 原理

该策略使用两个移动平均线,即短期移动平均线和长期移动平均线,形成黄金交叉和死亡交叉来判断趋势方向。同时,它利用用户定义的倍数绘制凯尔特通道的上下轨,当价格突破通道时产生交易信号。

具体来说,策略首先判断长期移动平均线是否位于短期移动平均线之上,如果是,则为黄金交叉,判断为趋势向上;如果短期移动平均线位于长期移动平均线之下,则为死亡交叉,判断为趋势向下。 

在趋势判断的基础上,如果价格突破上轨,产生做多信号;如果价格跌破下轨,产生做空信号。用户可以自行调整移动平均线周期和通道宽度,从而调整策略的参数。

进场后,策略利用用户定义的止盈止损ATR倍数来设置止盈止损位。同时,策略还提供额外的突破止盈和止损条件,可以更灵活地控制仓位。

## 优势分析

该策略结合趋势跟踪和通道突破的优点,可以有效判断市场走势和捕捉趋势机会。具体优势如下:

1. 使用黄金交叉判断趋势方向,可以有效过滤掉不符合大趋势的噪音交易。

2. 凯尔特通道突破结合趋势方向判断,可以提高入市的时机 accuracy。

3. 止盈止损机制可以锁定利润,并主动控制风险。

4. 策略参数可以灵活调整,适用于不同品种和市场环境。

5. 可同时做多做空,扩大策略适用范围。

## 风险分析

尽管该策略有许多优点,但也存在一定的风险需要注意:

1. 会有一定的错过反转机会的风险。

2. 如果大趋势发生变化,可能产生逆势亏损的风险。

3. 参数设置不当可能导致过于宽松或过于频繁交易。

4. 需承担一定的隔夜风险。

5. 存在一定的曲线拟合风险。

对此,可以通过参数优化,适时调整移动平均线周期,或适当缩小仓位规模来降低风险。

## 优化思路

该策略还有进一步优化的空间:

1. 可以考虑加入更多判断指标,形成多因子模型,提高策略 accuracy。例如加入 MACD、RSI 等。

2. 可以基于机器学习对参数进行优化,使其更符合不同市场环境。

3. 可以考虑动态调整止盈止损条件,在保证利润的前提下追求更大收益。

4. 可以根据波动率的变化动态调整仓位规模。

5. 研究不同品种的参数偏好,制定适合不同品种的参数组合。

6. 添加降低交易频率的机制,以减少交易费率的影响。

## 总结

黄金交叉凯尔特通道趋势跟踪策略整体来说是一个比较稳定可靠的趋势跟踪策略。它结合趋势判断和通道突破的优势,可以有效识别市场趋势方向,选择高概率的交易机会。通过参数优化和机制改进,该策略可以成为一个强大的量化交易工具。

||

## Overview

The Golden Cross Keltner Channel Trend Following Strategy is a strategy that only trades in the direction of the trend. It combines the moving average golden cross and Keltner Channel as entry signals to capture the trend direction.

## Principle 

This strategy uses two moving averages, a short-term and a long-term moving average, to form golden crosses and death crosses to determine the trend direction. At the same time, it uses user-defined multiples to plot the upper and lower rails of the Keltner Channel and generate trading signals when prices break through the channel.

Specifically, the strategy first checks if the long-term moving average is above the short-term moving average, indicating a golden cross and an upward trend. If the short-term MA is below the long-term MA, it is a death cross, indicating a downward trend.

Based on the trend determination, if the price breaks above the upper rail, a long signal is generated. If the price breaks below the lower rail, a short signal is generated. Users can adjust the MA periods and channel width to customize the strategy parameters.

After entry, the strategy uses user-defined ATR multiples for take-profit and stop-loss. It also provides additional break-even and stop-loss conditions for more flexible position control.

## Advantage Analysis

This strategy combines the advantages of trend following and channel breakouts, enabling effective trend identification and opportunity capturing. The main advantages are:

1. Golden cross filters out false signals not aligned with the major trend. 

2. Channel breakout with trend direction improves entry accuracy.

3. Take-profit and stop-loss preserve profits and control risks.

4. Flexible parameter adjustments suit different products and environments. 

5. Goes both long and short, expanding applicability.

## Risk Analysis

Despite the advantages, some risks need attention:

1. Missing reversal opportunities. 

2. Trend changes may lead to losses.

3. Improper parameters may cause over-trading or sparse trading.

4. Overnight risk exists. 

5. Curve fitting risk.

Solutions include parameter optimization, timely MA period adjustment, and position sizing control.

## Optimization Directions

There is room for further improvements:

1. Adding more indicators to build a multi-factor model and improve accuracy. E.g. MACD, RSI.

2. Parameter optimization via machine learning for market adaptability.

3. Dynamic take-profit and stop-loss rules to balance profitability and reward.

4. Dynamic position sizing based on volatility.

5. Research optimal parameters for different products. 

6. Reduce trading frequency to minimize fees.

## Conclusion

The Golden Cross Keltner Channel Trend Following Strategy is generally a stable and reliable trend following system. By combining trend filtering and channel breakouts, it identifies high-probability opportunities aligned with the trend direction. Further optimizations and enhancements can make it a robust trading framework.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|MA Length|
|v_input_2|true|Entry ATR|
|v_input_3|4|Profit Taker|
|v_input_4|-1|Exit ATR|
|v_input_string_1|0|Moving Average Type: SMA|EMA|WMA|
|v_input_5|true|Long Positions|
|v_input_6|true|Enable Short Positions|
|v_input_7|50|Short MA for Golden Cross|
|v_input_8|200|Long MA for Golden Cross|
|v_input_9|true|Enable Long Profit Taker|
|v_input_10|true|Enable Long Stop|
|v_input_11|true|Enable Short Profit Taker|
|v_input_12|true|Enable Short Stop|
|v_input_13|true|Enable Take Profit Condition|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-26 00:00:00
end: 2023-11-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © OversoldPOS

//@version=5
// strategy("Keltner Channel Strategy by OversoldPOS", overlay=true,initial_capital = 100000,default_qty_type = strategy.percent_of_equity,default_qty_value = 10, commission_type = strategy.commission.cash_per_order, commission_value = 7)

// Parameters
length = input(21, title="MA Length")
Entrymult = input(1, title="Entry ATR")
profit_mult = input(4, title="Profit Taker")
exit_mult = input(-1, title="Exit ATR")

// Moving Average Type Input
ma_type = input.string("SMA", title="Moving Average Type", options=["SMA", "EMA", "WMA"])

// Calculate Keltner Channels for different ATR multiples
atr_value = ta.atr(length)

basis = switch ma_type
    "SMA" => ta.sma(close, length)
    "EMA" => ta.ema(close, length)
    "WMA" => ta.wma(close, length)
 

//
EntryKeltLong = basis + Entrymult * ta.atr(10)
EntryKeltShort = basis - Entrymult * ta.atr(10)
upper_channel1 = basis + 1 * ta.atr(10)
lower_channel1 = basis - 1 * ta.atr(10)
upper_channel2 = basis + 2 * ta.atr(10)
lower_channel2 = basis - 2 * ta.atr(10)
upper_channel3 = basis + 3 * ta.atr(10)
lower_channel3 = basis - 3 * ta.atr(10)
upper_channel4 = basis + 4 * ta.atr(10)
lower_channel4 = basis - 4 * ta.atr(10)

// Entry condition parameters
long_entry_condition = input(true, title="Long Positions")
short_entry_condition = input(true, title="Enable Short Positions")

// Additional conditions for long and short entries
is_long_entry = ta.ema(close, 20) > ta.ema(close, 50)
is_short_entry = ta.ema(close, 20) < ta.ema(close, 50)

// Additional conditions for long and short entries
MAShort =  input(50, title="Short MA for Golden Cross")
MALong =  input(200, title="Long MA for Golden Cross")
is_long_entry2 = ta.ema(close, MAShort) > ta.ema(close, MALong)
is_short_entry2 = ta.ema(close, MAShort) < ta.ema(close, MALong)

// Exit condition parameters
long_exit_condition1_enabled = input(true, title="Enable Long Profit Taker")
long_exit_condition2_enabled = input(true, title="Enable Long Stop")
short_exit_condition1_enabled = input(true, title="Enable Short Profit Taker")
short_exit_condition2_enabled = input(true, title="Enable Short Stop")

// Take Profit condition parameters
take_profit_enabled = input(true, title="Enable Take Profit Condition")

Takeprofit = basis + profit_mult * atr_value
STakeprofit = basis - profit_mult * atr_value

// Long entry condition
long_condition = long_entry_condition and ta.crossover(close, EntryKeltLong) and is_long_entry2

// Short entry condition
short_condition = short_entry_condition and ta.crossunder(close, EntryKeltShort) and is_short_entry2

// Exit conditions
long_exit_condition1 = long_exit_condition1_enabled and close > Takeprofit
long_exit_condition2 = long_exit_condition2_enabled and close < basis + exit_mult * atr_value
short_exit_condition1 = short_exit_condition1_enabled and close < STakeprofit
short_exit_condition2 = short_exit_condition2_enabled and close > basis - exit_mult * atr_value

// Strategy logic
if (long_condition)
    strategy.entry("Long", strategy.long)
if (short_condition)
    strategy.entry("Short", strategy.short)

if (long_exit_condition1 or long_exit_condition2)
    strategy.close("Long")

if (short_exit_condition1 or short_exit_condition2)
    strategy.close("Short")

// Moving Averages
var float MA1 = na
var float MA2 = na

if (ma_type == "SMA")
    MA1 := ta.sma(close, MAShort)
    MA2 := ta.sma(close, MALong)
else if (ma_type == "EMA")
    MA1 := ta.ema(close, MAShort)
    MA2 := ta.ema(close, MALong)
else if (ma_type == "WMA")
    MA1 := ta.wma(close, MAShort)
    MA2 := ta.wma(close, MALong)

// Plotting Keltner Channels with adjusted transparency
transparentColor = color.rgb(255, 255, 255, 56)

plot(upper_channel1, color=transparentColor, title="Upper Channel 1")
plot(lower_channel1, color=transparentColor, title="Lower Channel 1")
plot(upper_channel2, color=transparentColor, title="Upper Channel 2")
plot(lower_channel2, color=transparentColor, title="Lower Channel 2")
plot(upper_channel3, color=transparentColor, title="Upper Channel 3")
plot(lower_channel3, color=transparentColor, title="Lower Channel 3")
plot(upper_channel4, color=transparentColor, title="Upper Channel 4")
plot(lower_channel4, color=transparentColor, title="Lower Channel 4")
plot(basis, color=color.white, title="Basis")
plot(MA1, color=color.rgb(4, 248, 216), linewidth=2, title="Middle MA")
plot(MA2, color=color.rgb(220, 7, 248), linewidth=2, title="Long MA")

```

> Detail

https://www.fmz.com/strategy/430843

> Last Modified

2023-11-02 14:31:10
