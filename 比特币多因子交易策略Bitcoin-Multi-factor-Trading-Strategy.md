
> Name

比特币多因子交易策略Bitcoin-Multi-factor-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略是一个适用于比特币和其他加密货币15分钟时间周期的综合交易策略。它整合多个指标生成买入卖出信号,包括三重指数移动平均线、平均真实波动幅度、以及平衡线蜡烛图形,同时具有止盈止损等风险管理机制。

## 策略原理

该策略使用以下多个指标:

- 三重指数移动平均线(TEMA):使用不同长度和源的3个TEMA,分别基于高点、低点和收盘价计算。

- 平均真实波动幅度(ATR):使用EMA平滑的自定义ATR计算市场波动率。

- 超趋指标:基于ATR和倍数确定趋势方向。 

- 简单移动平均线(SMA):对短周期TEMA进行SMA计算以平滑值。

- 平衡线收盘价:用于额外确认趋势。

当短周期TEMA高于两个长周期TEMA,超趋指标看涨,短周期TEMA高于其SMA,且平衡线收盘价高于前一日时,产生买入信号。

当短周期TEMA低于两个长周期TEMA,超趋指标看跌,短周期TEMA低于其SMA,且平衡线收盘价低于前一日时,产生卖出信号。

止盈止损分别设置为入场价格的1%和3%。同时考虑手续费因素。

## 优势分析

- 多因子综合判断,提高准确率

结合趋势、波动率、形态等多个因子指标,可以提高判断准确性,避免假信号。

- 止盈止损机制合理控制风险

合理的止盈止损设置可以锁定利润,也可有效限制单笔损失。

- 参数优化空间大

指标参数可以灵活调整,适应市场的变化,寻找最佳组合。

- 考虑手续费因素更贴近实盘

加入手续费因子,可以使回测结果更接近实际交易表现。

## 风险分析

- 多因子组合误判风险

过多指标组合也可能出现误判,需要仔细评估指标的实效性。

- 短周期操作风险较大

相比长周期,15分钟操作更受突发事件影响,存在更大的偶发风险。

- 策略稳定性有待检验

该策略尚需在更长周期和多市场中进行验证,以确保稳定性。

- 参数优化耗时较长

多指标组合带来大量参数,优化所有参数组合需要较长时间。

## 优化方向

- 评估各指标的实际效果

回测检验各个指标的实际提升效果,避免使用冗余指标。

- 优化参数,测试稳定性

在更多市场中测试参数优化结果,确保稳定可靠。

- 加入止损策略

如移动止损、挂单止损等方式进一步控制风险。

- 考虑更多成本因素

如滑点成本等使回测更实盘化。

## 总结

该策略综合多个指标和风险控制机制,对比特币15分钟周期交易进行设计。其优化空间还很大,需要深入回测评估指标效果,广泛市场稳定性测试,以及加入更多实盘考虑因素,以求在多因子策略中找到最优参数组合。如果持续优化和验证,该策略可成为加密货币高频交易的有效工具。

||


## Overview

This is a comprehensive trading strategy designed for 15-min timeframe trading of Bitcoin and other cryptocurrencies. It combines multiple indicators to generate buy and sell signals, including Triple Exponential Moving Average (TEMA), Average True Range (ATR), and Heikin-Ashi candles, together with risk management features like take profit and stop loss.

## Strategy Logic 

The strategy utilizes the following indicators:

- Triple Exponential Moving Average (TEMA): Three TEMA lines of different lengths and sources, based on high, low and close prices respectively.

- Average True Range (ATR): Custom ATR calculation with EMA smoothing to measure volatility.

- Supertrend: Calculated using ATR and a multiplier to determine trend direction.

- Simple Moving Average (SMA): Applied on the short TEMA line to smooth its values. 

- Heikin-Ashi Close: Used for additional trend confirmation.

Long entry signal is triggered when the short TEMA is above both long TEMA lines, Supertrend is bullish, short TEMA is above its SMA, and Heikin-Ashi close is higher than previous close.

Short entry signal is triggered when the opposite conditions are met.

Take profit and stop loss are set at 1% and 3% of entry price. Commission is also considered.

## Advantage Analysis

- Multiple factors improve accuracy 
Combining trend, volatility, pattern indicators can improve accuracy and avoid false signals.

- Reasonable stop loss/take profit controls risk
Well-set stop loss and take profit levels lock in profits and limit losses.

- Large parameter optimization space
Indicator parameters can be flexibly tuned to adapt to changing markets.

- More realistic with commission factored in
Commission considered makes backtest results closer to live performance.

## Risk Analysis

- Risk of misjudgments from over-optimization
Too many combined indicators may also lead to misjudgments. Effectiveness needs evaluation.

- Higher risk with short-term trading
Compared to longer timeframes, 15-min is more susceptible to sudden events and risks.

- Strategy stability needs further validation
More extensive testing across long history and markets is needed to ensure reliability.

- Lengthy optimization with multiple parameters
Many parameters introduced leads to lengthy process for optimizing all parameter combinations.

## Improvement Directions

- Evaluate real effect of each indicator
Backtest to verify actual incremental benefit of each indicator, avoid redundancy.

- Optimize and test stability
Test optimization results across more markets to ensure robustness.  

- Incorporate stop loss strategies
Such as trailing stop, bracket order stop to further control risk.

- Consider more cost factors
Such as slippage to make backtest closer to live performance.

## Summary
This strategy combines multiple indicators and risk management techniques tailored for 15-min Bitcoin trading. Large space remains for optimizing parameters, evaluating indicator effectiveness, broad market stability test, and introducing more real-world factors to find the optimal combination within the multi-factor approach. With persistent optimization and verification, it can become an effective tool for crypto high frequency trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|50|short|
|v_input_1_high|0|TEMA short: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|100|long|
|v_input_2_low|0|TEMA long 2: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_3|350|long2|
|v_input_3_close|0|TEMA long 3: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_4|550|ATR Length|
|v_input_float_1|3|Multiplier|
|v_input_int_5|100|SMA Period|
|v_input_float_2|true|Take Profit (%)|
|v_input_float_3|3|Stop Loss (%)|
|v_input_bool_1|true|(?Backtest Time Period)Begin Backtest at Start Date|
|v_input_4|timestamp(1 Jan 2023)|Start Date|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-25 00:00:00
end: 2023-09-09 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © deperp
//@version=5
strategy('3kilos', shorttitle='3kilos BTC 15m', overlay=true, initial_capital=100000, max_bars_back=5000, default_qty_type=strategy.percent_of_equity, default_qty_value=10, commission_type=strategy.commission.percent, commission_value=0.07, pyramiding=0)

short = input.int(50, minval=1)
srcShort = input(high, title='TEMA short')

long = input.int(100, minval=1)
srcLong = input(low, title='TEMA long 2')

long2 = input.int(350, minval=1)
srcLong2 = input(close, title='TEMA long 3')

atrLength = input.int(550, title='ATR Length', minval=1)
mult = input.float(3, title="Multiplier", minval=0.5, step=1)

smaPeriod = input.int(100, title="SMA Period", minval=1)

takeProfitPercent = input.float(1, title="Take Profit (%)", minval=0.1) / 100
stopLossPercent = input.float(3, title="Stop Loss (%)", minval=0.1) / 100


tema(src, length) =>
    ema1 = ta.ema(src, length)
    ema2 = ta.ema(ema1, length)
    ema3 = ta.ema(ema2, length)
    3 * (ema1 - ema2) + ema3

tema1 = tema(srcShort, short)
plot(tema1, color=color.new(color.red, 0), linewidth=2)

tema2 = tema(srcLong, long)
plot(tema2, color=color.new(color.blue, 0), linewidth=2)

tema3 = tema(srcLong2, long2)
plot(tema3, color=color.new(color.green, 0), linewidth=2)

// Custom ATR calculation with EMA smoothing
atr_ema(src, length) =>
    trueRange = math.max(math.max(high - low, math.abs(high - close[1])), math.abs(low - close[1]))
    emaTrueRange = ta.ema(trueRange, length)
    emaTrueRange

// Calculate ATR with EMA smoothing
atr = atr_ema(close, atrLength)

// Calculate Supertrend
var float up = na
var float dn = na
var bool uptrend = na
up := na(up[1]) ? hl2 - (mult * atr) : uptrend[1] ? math.max(hl2 - (mult * atr), up[1]) : hl2 - (mult * atr)
dn := na(dn[1]) ? hl2 + (mult * atr) : uptrend[1] ? hl2 + (mult * atr) : math.min(hl2 + (mult * atr), dn[1])
uptrend := na(uptrend[1]) ? true : close[1] > dn[1] ? true : close[1] < up[1] ? false : uptrend[1]

// Calculate SMA
sma = ta.sma(tema1, smaPeriod)

// Heikin-Ashi Close
haTicker = ticker.heikinashi(syminfo.tickerid)
haClose = request.security(haTicker, timeframe.period, close)


// Trend determination using Heikin-Ashi Close
longC = tema1 > tema2 and tema1 > tema3 and uptrend and tema1 > sma and haClose > haClose[1]
shortC = tema1 < tema2 and tema1 < tema3 and not uptrend and tema1 < sma and haClose < haClose[1]


alertlong = longC and not longC[1]
alertshort = shortC and not shortC[1]

useDateFilter = input.bool(true, title="Begin Backtest at Start Date",
     group="Backtest Time Period")
backtestStartDate = input(timestamp("1 Jan 2023"), 
     title="Start Date", group="Backtest Time Period",
     tooltip="This start date is in the time zone of the exchange " + 
     "where the chart's instrument trades. It doesn't use the time " + 
     "zone of the chart or of your computer.")

inTradeWindow = true

stopLossLevelLong = close - atr * mult
stopLossLevelShort = close + atr * mult
longTakeProfitLevel = close * (1 + takeProfitPercent)
longStopLossLevel = close * (1 - stopLossPercent)
shortTakeProfitLevel = close * (1 - takeProfitPercent)
shortStopLossLevel = close * (1 + stopLossPercent)



if inTradeWindow and longC
    strategy.entry('Long', strategy.long, comment='Long')
    strategy.exit("TP Long", "Long", limit=longTakeProfitLevel, stop=longStopLossLevel, comment="TP/SL Long")

if inTradeWindow and shortC
    strategy.entry('Short', strategy.short, comment='Short')
    strategy.exit("TP Short", "Short", limit=shortTakeProfitLevel, stop=shortStopLossLevel, comment="TP/SL Short")

// Alerts

alertcondition(longC, title='Long', message=' Buy Signal ')
alertcondition(shortC, title='Short', message=' Sell Signal ')
```

> Detail

https://www.fmz.com/strategy/427822

> Last Modified

2023-09-25 18:24:02
