
> Name

一目均衡表与RSI组合策略Ichimoku-Cloud-and-RSI-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

本策略融合使用一目均衡表和相对强弱指数(RSI)指标来判断趋势方向,在趋势启动时入场。当一目均衡表的三根线段形成符合条件的排列组合并结合RSI信号时,产生交易信号。

### 策略原理

1. 计算一目均衡表的转换线、基准线、延迟线
2. 计算RSI指标值
3. 当转换线上穿基准线,延迟线在阳线上方,收盘价突破云图,且RSI低于50时做多
4. 当转换线下穿基准线,延迟线在阴线下方,收盘价跌破云图,且RSI高于50时做空
5. 当反向信号出现时平仓

具体来说,该策略融合一目均衡表的趋势判断和RSI的超买超卖判定。当一目均衡表的三线组合形态显示趋势启动,并且RSI同时显示没有超买超卖时,产生入场信号。RSI过滤帮助避免在盘整时错误入场。平仓信号则完全依据一目均衡表反向FORMATION。

### 优势分析

1. 融合RSI指标,提高入场准确率
2. 一目均衡表可判断趋势方向,具有较强的趋势跟踪能力
3. 交易信号简单直观,容易掌握
4. 可调整均线和RSI参数,适应不同周期
5. 有止盈止损策略,可控制风险

### 风险分析

1. 一目均衡表判定有时滞后,可能误入盘整
2. 需要优化参数,否则交易信号可能不准确
3. 长期持仓面临隔夜风险
4. RSI容易发出假信号
5. 可能因为反转而被套

可以通过参数优化,优化止盈止损策略,适当缩短持仓周期等方式来管理风险。

### 优化方向

1. 测试不同均线和RSI参数找出最佳组合
2. 引入移动止损追踪价格变化
3. 评估限定交易时间的效果
4. 研究不同品种的参数偏好
5. 测试增加再入场和加仓规则
6. 比较不同的止盈止损策略

### 总结

本策略融合一目均衡表和RSI指标进行趋势判断和交易。优点是信号简单直观,ROI高;缺点是存在滞后和被套风险。可通过参数优化、止盈止损优化、限定交易时间等方式提高策略效果并控制风险。该策略可使交易者全面了解一目均衡表的应用。

|| 

### Overview

This strategy combines Ichimoku Cloud and Relative Strength Index (RSI) indicators to determine trend direction and enter positions when a trend starts. It generates trading signals when the three Ichimoku lines align in valid combinations together with RSI signals.

### Strategy Logic 

1. Calculate Tenkan-sen, Kijun-sen, Chikou Span lines of Ichimoku Cloud
2. Calculate RSI values
3. Go long when Tenkan-sen crosses above Kijun-sen, Chikou Span above cloud, price breaks out above cloud, and RSI below 50
4. Go short when Tenkan-sen crosses below Kijun-sen, Chikou Span below cloud, price breaks down cloud, and RSI above 50  
5. Close position when reverse signal occurs

Specifically, it combines Ichimoku Cloud's trend analysis and RSI's overbought-oversold gauge. Entry signals are generated when Ichimoku lines align in trend start formation, and RSI shows no overbought-oversold condition. RSI filters help avoid false breakout during consolidation. Exits follow Ichimoku reverse FORMATION completely.

### Advantage Analysis

1. Combining RSI improves entry accuracy
2. Ichimoku Cloud has strong trend following capacity  
3. Signals are simple and intuitive
4. Customizable parameters fit different cycles
5. Risk managed by stop profit/loss

### Risk Analysis

1. Ichimoku Cloud may lag, causing false breakouts
2. Requires parameter optimization, otherwise inaccurate signals
3. Long holding introduces overnight risk 
4. RSI prone to false signals
5. Risks of being trapped on reversals

Risks can be managed via parameter optimization, stop profit/loss tuning, limiting holding period etc.

### Optimization Directions

1. Test different line and RSI parameters for best combinations
2. Introduce trailing stop loss
3. Evaluate limiting trading hours 
4. Study parameter preferences across products
5. Test adding re-entry and pyramiding rules
6. Compare different stop profit/loss strategies

### Summary

This strategy combines Ichimoku Cloud and RSI for trend analysis and trading. Pros are simple intuitive signals and high ROI; Cons are lags and trapped risks. Performance can be improved and risks controlled through parameter optimization, stop profit/loss tuning, trading hours control etc. It allows comprehensive understanding of Ichimoku Cloud application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Show Date Range|
|v_input_int_1|9|Tenkan-Sen Bars|
|v_input_int_2|26|Kijun-Sen Bars|
|v_input_int_3|52|Senkou-Span B Bars|
|v_input_int_4|26|Chikou-Span Offset|
|v_input_int_5|26|Senkou-Span Offset|
|v_input_2|true|Long Entry|
|v_input_3|true|Short Entry|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-14 00:00:00
end: 2023-09-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Coinrule

//@version=5
strategy("Ichimoku Cloud with RSI (By Coinrule)",
         overlay=true,
         initial_capital=1000,
         process_orders_on_close=true,
         default_qty_type=strategy.percent_of_equity,
         default_qty_value=30,
         commission_type=strategy.commission.percent,
         commission_value=0.1)

showDate = input(defval=true, title='Show Date Range')
timePeriod = time >= timestamp(syminfo.timezone, 2022, 6, 1, 0, 0)


// RSI inputs and calculations
lengthRSI = 14
RSI = ta.rsi(close, lengthRSI)


//Inputs
ts_bars = input.int(9, minval=1, title="Tenkan-Sen Bars")
ks_bars = input.int(26, minval=1, title="Kijun-Sen Bars")
ssb_bars = input.int(52, minval=1, title="Senkou-Span B Bars")
cs_offset = input.int(26, minval=1, title="Chikou-Span Offset")
ss_offset = input.int(26, minval=1, title="Senkou-Span Offset")
long_entry = input(true, title="Long Entry")
short_entry = input(true, title="Short Entry")

middle(len) => math.avg(ta.lowest(len), ta.highest(len))


// Components of Ichimoku Cloud
tenkan = middle(ts_bars)
kijun = middle(ks_bars)
senkouA = math.avg(tenkan, kijun)
senkouB = middle(ssb_bars)


// Plot Ichimoku Cloud
plot(tenkan, color=#0496ff, title="Tenkan-Sen")
plot(kijun, color=#991515, title="Kijun-Sen")
plot(close, offset=-cs_offset+1, color=#459915, title="Chikou-Span")
sa=plot(senkouA, offset=ss_offset-1, color=color.green, title="Senkou-Span A")
sb=plot(senkouB, offset=ss_offset-1, color=color.red, title="Senkou-Span B")
fill(sa, sb, color = senkouA > senkouB ? color.green : color.red, title="Cloud color")

ss_high = math.max(senkouA[ss_offset-1], senkouB[ss_offset-1])
ss_low = math.min(senkouA[ss_offset-1], senkouB[ss_offset-1])


// Entry/Exit Conditions
tk_cross_bull = tenkan > kijun
tk_cross_bear = tenkan < kijun
cs_cross_bull = ta.mom(close, cs_offset-1) > 0
cs_cross_bear = ta.mom(close, cs_offset-1) < 0
price_above_kumo = close > ss_high
price_below_kumo = close < ss_low

bullish = tk_cross_bull and cs_cross_bull and price_above_kumo
bearish = tk_cross_bear and cs_cross_bear and price_below_kumo

strategy.entry("Long", strategy.long, when=bullish and long_entry and RSI < 50 and timePeriod)
strategy.close("Long", when=bearish and not short_entry)

strategy.entry("Short", strategy.short, when=bearish and short_entry and RSI > 50 and timePeriod)
strategy.close("Short", when=bullish and not long_entry)
```

> Detail

https://www.fmz.com/strategy/427447

> Last Modified

2023-09-21 10:52:13
