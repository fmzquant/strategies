
> Name

均值恢复ATR趋势策略Mean-Reversion-ATR-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略利用价格波动率的高低来判断进入或退出头寸的时机,目标是在价格波动率较高时建立多头头寸,并在价格趋势转向有利时获利了结头寸。

## 策略原理

1. 使用ATR指标衡量价格波动率。计算最近20个周期的ATR值,并计算其移动平均值和标准差。如果当前ATR值超过平均值加上一个标准差,认为价格波动率较高。

2. 使用一阶对数价格变化率确定价格趋势。计算最近20个周期的对数收盘价变化率,计算其移动平均值,如果当前变化率连续3日均大于平均值且为正,认为价格处于上涨趋势。

3. 当价格波动率较高,且价格出现上涨趋势时,做多开仓。当价格出现回落,止损价格被触发时平仓。 止损价格动态调整,始终维持在最低价减去ATR的2倍之间。

## 优势分析

1. 利用价格波动率高低和趋势判断做多做空时机,避免在震荡市场频繁交易。

2. 动态调整止损价格,避免止损过于宽松带来大额亏损。

3. 回测显示,在2015-2021年间,策略年化收益率达到159%,远超过Buy and Hold策略的120%。

## 风险分析 

1. ATR参数设置过于激进可能导致进入机会过少。参数可适当扩大区间提高进入频率。

2. 趋势判断指标可能产生误判,与实际趋势不符,应增加确认因子避免潜在亏损。

3. 回测周期仅6年,需扩大样本区间并做稳健性检验,避免过拟合。

4. 无法判断极端行情下的表现,如快速熔断行情,需人工干预或设置编程停损。

## 优化方向

1. 增加趋势确认指标,如MACD,KDJ等,判断趋势方向更准确。

2. ATR参数可根据不同品种、市场情况做自适应调整,优化波动率判断。

3. 增加突破判断模块,配置趋势加速因子,在出现突破时加大仓位。

4. 测试不同止损方式,如百分比止损、波动止损等的效果。

5. 对交易次数、收益曲线稳定性、最大回撤等进行评估,确保策略稳健。

## 总结

该策略整合价格波动率和趋势判断的优点,在波动加剧的情况下判断价格可能反转的时机进场,设置动态止损来控制风险,从回测结果看实现了较好的超额收益。但样本区间仅6年,关键参数设置需要根据不同市场调整,且需引入更多确认因子以减少误判概率,此外还需要对策略进行更全面的稳健性检验,才能真正运用于实盘交易。总体来说,该策略提供了一种利用波动率进行逆向操作的思路,但还需要深入优化与检验,方能成为稳定可靠的量化策略。

|| 

## Overview

This strategy utilizes the highs and lows of price volatility to determine the timing of entries and exits of positions. It aims to establish long positions when price volatility is high and take profits when price trends favorably.

## Strategy Logic  

1. Use ATR indicator to measure price volatility. Calculate the ATR over the last 20 periods and get its moving average and standard deviation. If current ATR value exceeds the average plus one standard deviation, price volatility is considered high.

2. Use first order logarithmic price change rate to determine price trend. Calculate the logarithmic close price change rate over the last 20 periods, get its moving average. If the current change rate exceeds the average for 3 consecutive days and is positive, price is considered in an uptrend.

3. When price volatility is high and price shows an uptrend, go long. When price pulls back and stop loss is triggered, close position. Stop loss price is adjusted dynamically to stay below the lowest price minus 2 times ATR.

## Advantage Analysis

1. Utilize price volatility and trend to determine long/short timing, avoid over-trading in ranging markets. 

2. Dynamic stop loss avoids excessive loss from too wide stops.

3. Backtest shows annualized return of 159% during 2015-2021, far exceeding 120% of buy & hold.

## Risk Analysis

1. Overly aggressive ATR parameters may result in too few entry opportunities. Can relax parameters moderately to increase frequency.

2. Trend indicator may generate false signals contradicting actual trend. Should add more confirming factors to avoid potential losses.

3. Backtest period only 6 years. Need larger sample and robustness check to avoid overfitting.  

4. Unable to assess performance in extreme conditions like flash crashes. Manual intervention or stop programming required.

## Optimization Directions 

1. Add more trend confirming indicators like MACD, KDJ to improve trend accuracy.

2. Tune ATR parameters adaptively based on different products and market regimes to optimize volatility gauge.

3. Add breakout logic and trend accelerating factors to size up on breakouts. 

4. Test different stop loss types like percentage, volatility stop on performance.

5. Evaluate on metrics like trade frequency, curve stability, max drawdown to ensure robustness.

## Summary

This strategy combines the advantages of gauging volatility and trend to determine possible reversal points to enter on amplified volatility, and uses dynamic stops to control risk. Backtest shows decent alpha generated. But 6-year sample is limited, key parameters need market-specific tuning, and more confirming factors are needed to reduce false signals. Comprehensive robustness check also required before applying to live trading. Overall this provides an idea of mean reversion on volatility but still needs refinement and rigorous verification to become a robust quant strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Apr 2000 13:30 +0000)|Backtest Start Time|
|v_input_2|false|Define backtest end-time (If false, will test up to most recent candle)|
|v_input_3|timestamp(01 May 2021 19:30 +0000)|Backtest End Time (if checked above)|
|v_input_4|14|Length of ATR for trailing stop loss|
|v_input_5|2|ATR Multiplier for trailing stop loss|
|v_input_6|20|Length of ATR to determine volatility|
|v_input_7|20|Length of Drift|


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
// © DojiEmoji (kevinhhl)

//@version=4
strategy("Mean Reversion (ATR) Strategy [KL]",overlay=true,pyramiding=1)
ENUM_LONG = "Long"

// Timeframe {
backtest_timeframe_start = input(defval = timestamp("01 Apr 2000 13:30 +0000"), title = "Backtest Start Time", type = input.time)
USE_ENDTIME = input(false,title="Define backtest end-time (If false, will test up to most recent candle)")
backtest_timeframe_end = input(defval = timestamp("01 May 2021 19:30 +0000"), title = "Backtest End Time (if checked above)", type = input.time)
within_timeframe = true
// }

// Trailing stop loss {
ATR_X2_TSL = atr(input(14,title="Length of ATR for trailing stop loss")) * input(2.0,title="ATR Multiplier for trailing stop loss",type=input.float)
TSL_source = low
var stop_loss_price = float(0)
TSL_line_color = color.green, TSL_transp = 100
if strategy.position_size == 0 or not within_timeframe
    TSL_line_color := color.black
    stop_loss_price := TSL_source - ATR_X2_TSL 
else if strategy.position_size > 0
    stop_loss_price := max(stop_loss_price, TSL_source - ATR_X2_TSL)
    TSL_transp := 0
plot(stop_loss_price, color=color.new(TSL_line_color, TSL_transp))
// }

// Variables for confirmations of entry {
_len_volat = input(20,title="Length of ATR to determine volatility")
_ATR_volat = atr(_len_volat)
_avg_atr = sma(_ATR_volat, _len_volat)
_std_volat = stdev(_ATR_volat,_len_volat)
signal_diverted_ATR = _ATR_volat > (_avg_atr + _std_volat) or _ATR_volat < (_avg_atr - _std_volat)

_len_drift = input(20,title="Length of Drift")//default set to const: _len_vol's default value
_prcntge_chng = log(close/close[1])
_drift = sma(_prcntge_chng, _len_drift) - pow(stdev(_prcntge_chng, _len_drift),2)*0.5
_chg_drift = _drift/_drift[1]-1
signal_uptrend = (_drift > _drift[1] and _drift > _drift[2]) or _drift > 0

entry_signal_all = signal_diverted_ATR and signal_uptrend
// }

alert_per_bar(msg)=>
    prefix = "[" + syminfo.root + "] "
    suffix = "(P=" + tostring(close) + "; atr=" + tostring(_ATR_volat) + ")"
    alert(tostring(prefix) + tostring(msg) + tostring(suffix), alert.freq_once_per_bar)

// MAIN {
if within_timeframe

    if strategy.position_size > 0 and strategy.position_size[1] > 0 and (stop_loss_price/stop_loss_price[1]-1) > 0.005
        alert_per_bar("TSL raised to " + tostring(stop_loss_price))

    // EXIT:
	if strategy.position_size > 0 and TSL_source <= stop_loss_price
	    exit_msg = close <= strategy.position_avg_price ? "stop loss" : "take profit"
        strategy.close(ENUM_LONG, comment=exit_msg)
    // ENTRY:
    else if entry_signal_all and (strategy.position_size == 0 or (strategy.position_size > 0 and close > stop_loss_price))
		entry_msg = strategy.position_size > 0 ? "adding" : "initial"
		strategy.entry(ENUM_LONG, strategy.long, comment=entry_msg)

if strategy.position_size == 0
    stop_loss_price := float(0)
// }

```

> Detail

https://www.fmz.com/strategy/427455

> Last Modified

2023-09-21 11:42:06
