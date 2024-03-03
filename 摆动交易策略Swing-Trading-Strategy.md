
> Name

摆动交易策略Swing-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

这是一个基于移动平均线交叉的趋势跟踪策略,结合止损止盈管理和杠杆效应,旨在识别多种市场中的趋势并最大限度地获利。

## 策略原理

该策略使用快速移动平均线和慢速移动平均线的交叉作为交易信号。当快速移动平均线上穿慢速移动平均线时,采取多头仓位;当快速移动平均线下穿慢速移动平均线时,采取空头仓位。 

为了过滤掉非主要趋势的噪音交易,策略还引入200日移动平均线作为趋势过滤器。只有当价格高于或低于200日移动平均线时,才会发出交易信号。

策略采用区间交易止损策略。交易后会设置固定比例的止损位和止盈位,例如设置止损为1%,止盈为1%,当价格触及止损或止盈价位时就会平仓。 

为了放大交易盈利,策略采用杠杆效应。根据不同市场的特点,可以选择适当的杠杆比例,例如10倍杠杆。

## 优势分析

- 策略优点之一是可以识别多种市场中的趋势,包括加密货币、股票和期货市场,扩大策略的适用性。

- 应用快慢均线交叉和趋势过滤,可以较好地识别趋势方向,在趋势行情中获得较好的胜率。

- 采用区间止损止盈策略,可以将单笔损失控制在一个可承受的范围,有利于策略的稳定运行。

- 杠杆效应可以放大交易盈利,从而充分利用策略的优势。

- 可视化的界面设计,使用不同背景色标识多头和空头市场,使用者可以直观地判断目前的市场情况。

## 风险分析

- 策略基于趋势交易思想,在震荡盘整的市场中交易效果会打折扣。应适当控制仓位规模。

- 固定比例的止损止盈存在被套利的风险,应根据具体市场调整止损止盈幅度。

- 杠杆放大了交易规模,也放大了交易风险。需要控制杠杆比例,避免超出可承受的损失范围。

- 移动平均线本身存在滞后性,可能出现交易信号延迟的问题。

## 优化方向

- 可以研究不同参数组合下的策略表现,选择参数组合更优的快慢均线长度。

- 可以结合其他指标或模型作为过滤信号,提高策略准确性。例如引入ATR止损,RSI指标等。

- 可以研穆趋势识别指标,如DC指标等,进一步提升策略对趋势的判断能力。

- 可以结合机器学习模型进行策略信号优化,识别更有效的交易时机。

- 可以考虑动态调整止损止盈幅度,根据波动率和市场情况来设置更合理的止损止盈。


## 总结

本策略整体采用较为科学系统的趋势跟踪方法,同时辅以止损止盈和杠杆来控制风险并放大收益。该策略可广泛适用于多种市场,有望获取稳定的超额收益。但仍需注意参数优化、风控和策略更新等方面,才能长期有效运行。

||


## Overview

This is a trend-following strategy based on moving average crossover, combined with stop loss/take profit management and leverage effect, aiming to identify trends across multiple markets and maximize profits.

## Strategy Logic

The strategy uses crossover of fast and slow moving averages as trading signals. It goes long when the fast MA crosses above the slow MA, and goes short when the fast MA crosses below the slow MA.

To filter out noise trades from minor trends, it also uses a 200-day MA as a trend filter. Trade signals are only generated when the price is above or below the 200-day MA.

The strategy uses range trading stops. After entry, fixed percentage stop loss and take profit levels are set, e.g. 1% stop loss and 1% take profit. Positions will be closed when price hits the stop loss or take profit.

Leverage effect is employed to amplify trading profits. Based on different market characteristics, appropriate leverage ratios can be selected, e.g. 10x.

## Advantage Analysis 

- One advantage is that it can identify trends across multiple markets including crypto, stocks and futures, making the strategy widely applicable.

- Using fast/slow MA crossover and trend filter can better identify trend direction and achieve good win rate in trending markets.

- Range trading stops help control single trade loss within bearable range, allowing stable running of the strategy. 

- Leverage effect amplifies trading profits, making full use of the strategy edge.

- Visual interface design with different background colors for bull/bear markets offers intuitive market insight.

## Risk Analysis

- The strategy is trend-following so may underperform in choppy, range-bound markets. Position sizing should be controlled.

- Fixed percentage stop loss/take profit carries risk of getting stopped out. Levels should be adjusted based on specific market volatility.

- Leverage amplifies position size as well as risks. Leverage ratio should be controlled to avoid oversized losses.

- Lagging nature of moving averages may cause delayed trade signals.

## Optimization Directions

- Test different parameter combinations and select optimal fast/slow MA lengths.

- Incorporate other indicators or models as filter signals to improve accuracy, e.g. ATR stops, RSI etc.

- Research other trend identification tools like ADX to further enhance trend capturing ability.

- Use machine learning models to optimize strategy signals and find more effective entry/exit points.

- Consider dynamic stop loss/take profit based on volatility and market conditions for more sensible stops.

## Summary

The strategy employs a systematic trend-following approach and uses stops/take profit and leverage to control risk and magnify profits. It is widely applicable across markets with potential for steady alpha. Attention should still be paid to parameter optimization, risk control and strategy iteration for long-term success.

[/trans]


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Source MA Type: EMA|SMA|
|v_input_2|50|Source MA Length|
|v_input_3|20|Fast MA Length|
|v_input_4|50|Slow MA Length|
|v_input_5|true|Trend Filter|
|v_input_6|0|Trend Filter MA Type: EMA|SMA|
|v_input_7|200|Trend Filter MA Period|
|v_input_8|true|Show MAs|
|v_input_9|false|Swing Trading|
|v_input_10|true|(?Backtest Control)Stop Loss (in %)|
|v_input_11|true|Take Profit (in %)|
|v_input_12|10|Leverage|
|v_input_13|timestamp(2021 01 01)|Backtest Start Time|
|v_input_14|timestamp(2021 12 31)|Backtest End Time|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-10-10 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

////////////////////////////////////////////////////////////////////////////////
// Bozz Strategy
// Developed for Godstime
// Version 1.1
// 11/28/2021
////////////////////////////////////////////////////////////////////////////////

//@version=4
// strategy("Bozz Strategy", "", true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, margin_long=0, margin_short=0)

// ----------------------------- Inputs ------------------------------------- //
source_ma_type = input("EMA", "Source MA Type", options=["SMA", "EMA"])
source_ma_length = input(50, "Source MA Length")
fast_ma_length = input(20, "Fast MA Length")
slow_ma_length = input(50, "Slow MA Length")
use_trend_filter = input(true, "Trend Filter")
trend_filter_ma_type = input("EMA", "Trend Filter MA Type", options=["SMA", "EMA"])
trend_filter_ma_length = input(200, "Trend Filter MA Period")
show_mas = input(true, "Show MAs")
swing_trading_mode = input(false, "Swing Trading")

// -------------------------- Calculations ---------------------------------- //
fast_ma = ema(close, fast_ma_length)
slow_ma = ema(close, slow_ma_length)
source_ma = source_ma_type == "EMA"? ema(close, source_ma_length): 
                                     sma(close, source_ma_length)
trend_filter_ma = trend_filter_ma_type == "EMA"? ema(close, trend_filter_ma_length): 
                                                 sma(close, trend_filter_ma_length)

// --------------------------- Conditions ----------------------------------- //
uptrend = not use_trend_filter or close > trend_filter_ma
buy_cond = crossover(fast_ma, slow_ma) and uptrend

downtrend = not use_trend_filter or close < trend_filter_ma
sell_cond = crossunder(fast_ma, slow_ma) and downtrend

// ---------------------------- Plotting ------------------------------------ //
bgcolor(use_trend_filter and downtrend? color.red: use_trend_filter? color.green: na)
plot(show_mas? fast_ma: na, "Fast MA", color.green)
plot(show_mas? slow_ma: na, "Slow MA", color.red)
plot(show_mas? source_ma: na, "Source MA", color.purple)
plot(show_mas? trend_filter_ma: na, "Trend Filter MA", color.blue)


// ---------------------------- Trading  ------------------------------------ //
// Inputs
sl_perc = input(1.0, "Stop Loss (in %)", group="Backtest Control")/100
tp_perc = input(1.0, "Take Profit (in %)", group="Backtest Control")/100
leverage = input(10, "Leverage", maxval=100, group="Backtest Control")
bt_start_time = input(timestamp("2021 01 01"), "Backtest Start Time", input.time, group="Backtest Control")
bt_end_time = input(timestamp("2021 12 31"), "Backtest End Time", input.time, group="Backtest Control")

// Trading Window
in_trading_window = true
trade_qty = (strategy.equity * leverage) / close 

// Long Side
strategy.entry("Long Entry", strategy.long,  when=buy_cond and in_trading_window)
long_tp = strategy.position_avg_price * (1 + tp_perc)
long_sl = strategy.position_avg_price * (1 - sl_perc)
if not swing_trading_mode
    strategy.exit("Long Exit", "Long Entry", limit=long_tp, stop=long_sl)

// Short Side
strategy.entry("Short Entry", strategy.short, when=sell_cond and in_trading_window)
short_tp = strategy.position_avg_price * (1 - tp_perc)
short_sl = strategy.position_avg_price * (1 + sl_perc)
if not swing_trading_mode
    strategy.exit("Short Exit", "Short Entry", limit=short_tp, stop=short_sl)

// End of trading window close
strategy.close_all(when=not in_trading_window)
```

> Detail

https://www.fmz.com/strategy/428985

> Last Modified

2023-10-11 16:29:37
