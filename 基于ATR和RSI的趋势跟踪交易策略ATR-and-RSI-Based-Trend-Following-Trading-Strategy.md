
> Name

基于ATR和RSI的趋势跟踪交易策略ATR-and-RSI-Based-Trend-Following-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略基于平均真实波动幅度(ATR)和相对强弱指数(RSI)设计了一个具有趋势跟踪功能的交易系统。该系统可以自动识别趋势方向,并具有止损和止盈功能。

## 策略原理

1. 计算ATR和RSI。ATR反映最近一段时间内的平均价格波动幅度。RSI反映多空双方力量对比。

2. 当ATR大于其移动平均线时,认为处于高波动期,适合交易。

3. 当RSI高于超买线时,做多;当RSI低于超卖区时,做空。

4. 做多后,以高点乘以固定比例作为追踪止损位。做空后,以低点乘以固定比例作为追踪止损位。

5. 盈利比例止盈。

## 优势分析

1. 追踪止损可以最大限度挂单止损,减少亏损。

2. RSI可以有效判断多空力量,避免在震荡行情反复打开头寸。

3. ATR作为波动度指标,可以过滤掉震荡行情,只在趋势行情交易。

4. 盈利比例止盈可以锁定部分利润。

## 风险分析

1. ATR和RSI均为滞后指标,可能导致入场时点偏后。可以适当优化参数,使系统更灵敏。

2. 固定盈亏比止损止盈容易过度优化,应结合回测结果谨慎设置。

3. 大周期震荡行情中,ATR可能长期大于移动平均线,导致过度交易。可以增加其他过滤条件。

## 优化方向

1. 优化ATR和RSI的参数,使系统更敏感。

2. 增加MA等指标判断趋势方向,避免错入震荡行情。 

3. 尝试动态止损止盈比例,而不是固定设置。

4. 考虑加入交易量控制措施。

## 总结

本策略整合ATR和RSI两个指标的优势,设计了一个简单实用的趋势跟踪交易系统。通过参数优化和增加过滤条件,可以进一步提高系统稳定性。总体来说,该策略具有较强的实盘应用价值。

||

## Overview

This strategy designs a trading system with trend following function based on Average True Range (ATR) and Relative Strength Index (RSI). It can automatically identify the trend direction and has stop loss and take profit features.

## Strategy Logic

1. Calculate ATR and RSI. ATR reflects the average price volatility over a period. RSI reflects the power comparison between bulls and bears.

2. When ATR is greater than its moving average, it is considered a high volatility period suitable for trading. 

3. When RSI is above the overbought line, go long. When RSI is below the oversold area, go short.

4. After long, use high point multiplied by a fixed ratio as trailing stop loss price. After short, use low point multiplied by a fixed ratio as trailing stop loss price.

5. Take profit by profit ratio.

## Advantage Analysis 

1. Trailing stop loss can maximize stop loss orders to reduce losses.

2. RSI can effectively judge the power of bulls and bears to avoid repeatedly opening positions in range-bound markets.

3. As a volatility indicator, ATR can filter out range-bound markets and only trade in trending markets.

4. Take profit by profit ratio can lock in some profits.

## Risk Analysis

1. Both ATR and RSI are lagging indicators, which may lead to late entry timing. Parameters can be optimized to make the system more sensitive.

2. Fixed profit and loss ratio for stop loss and take profit is prone to over optimization, should be set prudently based on backtest results.

3. In large cycle range-bound markets, ATR may be greater than moving average for a long time, leading to over trading. Other filters can be added.

## Optimization Directions

1. Optimize parameters of ATR and RSI to make system more sensitive.

2. Add MA and other indicators to determine trend direction, avoid wrongly entering range-bound markets.

3. Try dynamic stop loss and take profit ratios, instead of fixed settings. 

4. Consider adding trading size control measures.

## Summary

This strategy integrates the advantages of ATR and RSI indicators and designs a simple and practical trend following trading system. Further improving system stability by parameter optimization and adding filters. Overall, this strategy has strong practical value for live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|26|atr_length|
|v_input_int_2|45|atr_ma_length|
|v_input_int_3|15|rsi_length|
|v_input_int_4|10|rsi_entry|
|v_input_float_1|0.3|atr_ma_norm_min|
|v_input_float_2|0.7|atr_ma_norm_max|
|v_input_float_3|1.5|trailing_percent|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-08 00:00:00
end: 2023-10-08 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © liwei666
//@version=5
// # ========================================================================= #
// #                   |   Strategy  |
// # ========================================================================= #
strategy(
 title                = "ATR_RSI_Strategy v2[liwei666]",
 shorttitle           = "ATR_RSI_Strategy",
 overlay              =  true,
 max_lines_count                 =  500, 
 max_labels_count                =  500, 
 max_boxes_count                 =  500,
 max_bars_back = 5000,
 initial_capital = 10000,
 default_qty_type=strategy.percent_of_equity, 
 default_qty_value=50, commission_type=strategy.commission.percent, pyramiding=1, 
 commission_value=0.05
 )
// # ========================================================================= #
// #                   |   Strategy  |
// # ========================================================================= #

atr_length = input.int(26, "atr_length", minval = 6, maxval = 100, step=1)
atr_ma_length = input.int(45, "atr_ma_length", minval = 6, maxval = 100, step=1)
rsi_length = input.int(15, "rsi_length", minval = 6, maxval = 100, step=1)
rsi_entry = input.int(10, "rsi_entry", minval = 6, maxval = 100, step=1)
atr_ma_norm_min = input.float(0.3, "atr_ma_norm_min", minval = 0.1, maxval = 0.5, step=0.1)
atr_ma_norm_max = input.float(0.7, "atr_ma_norm_max", minval = 0.5, maxval = 1, step=0.1)
trailing_percent= input.float(1.5, "trailing_percent", minval = 0.1, maxval = 2, step=0.1)

var rsi_buy = 50 + rsi_entry
var rsi_sell = 50 - rsi_entry

sma_norm_h_45() => 
    source = high
    n = 45
    sma = ta.sma(source, n) 
    sma_norm = (sma - ta.lowest(sma, n)) / (ta.highest(sma,n) - ta.lowest(sma, n))
    sma_norm

atr_value = ta.atr(atr_length)
atr_ma = ta.sma(atr_value, atr_ma_length) 
rsi_value = ta.rsi(close, length = rsi_length) 
atr_ma_norm = atr_ma / close * 100
sma_norm = sma_norm_h_45()

var intra_trade_high = 0.0
var intra_trade_low = 0.0

if strategy.position_size == 0
    intra_trade_high := high
    intra_trade_low := low

    if atr_ma_norm >= atr_ma_norm_min and atr_ma_norm <= atr_ma_norm_max
        if atr_value > atr_ma
            if rsi_value > rsi_buy
                strategy.entry("B1", strategy.long, limit = close + 5 )
            else if rsi_value < rsi_sell
                strategy.entry("S1", strategy.short, limit = close - 5 )
else if strategy.position_size > 0
    intra_trade_high := math.max(intra_trade_high, high)
    intra_trade_low := low

    long_tp = intra_trade_high * (1 - trailing_percent / 100)
    strategy.exit("Exit B1", from_entry="B1", stop = long_tp, limit = strategy.position_avg_price * 1.03)

else if strategy.position_size < 0
    intra_trade_high := high
    intra_trade_low := math.min(intra_trade_low, low) 

    short_tp = intra_trade_low * (1 + trailing_percent / 100)
    strategy.exit("Exit S1", from_entry="S1", stop = short_tp, limit = strategy.position_avg_price * 0.94)
```

> Detail

https://www.fmz.com/strategy/428792

> Last Modified

2023-10-09 15:18:10
