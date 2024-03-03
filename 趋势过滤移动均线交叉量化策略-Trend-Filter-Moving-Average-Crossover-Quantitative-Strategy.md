
> Name

趋势过滤移动均线交叉量化策略-Trend-Filter-Moving-Average-Crossover-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15ba88039850db5e08b.png)
[trans]

## 概述

趋势过滤移动均线交叉量化策略是一种中长线量化交易策略。该策略通过快速移动均线和慢速移动均线的交叉来判断市场的趋势方向,在判断有效趋势的前提下进行入场。同时,该策略还设置了一个更长周期的移动均线作为趋势过滤器,只有当价格突破该移动均线时才可能形成有效的交易信号。

## 策略原理

该策略主要基于移动均线的交叉原理。具体来说,分别计算出两条不同周期的移动均线,典型设置为20日线和50日线。当20日线从下向上突破50日线时产生买入信号;当20日线从上向下突破50日线时产生卖出信号。这些简单的交叉信号被认为可以捕捉中长线上的突破。

此外,该策略还设置了一个200日移动均线作为整体趋势的判断指标。只有当价格突破200日线时,上述简单交叉信号才被视为有效。这就构成了一个趋势过滤机制,可以避免在盘整市场中产生大量无效信号。

## 策略优势分析

1. 中长线操盘,避免过于频繁交易,降低交易成本和滑点风险。

2. 移动均线交叉判断明确,容易理解实现。

3. 趋势过滤机制可以过滤掉大部分无效信号,提高胜率。

4. 可灵活调整移动均线参数,适用于不同品种和时间周期。

5. 可设置止损止盈来控制单笔损益。

## 策略风险分析

1. 当价格在均线附近震荡时,可能产生多次无效信号导致过度交易。 

2. 长周期均线可能滞后市场,错过趋势转折点。

3. 需要较长的历史数据建立移动均线指标,新品种或短周期无法应用。

4. 策略参数需要反复测试优化,不当设置可能导致策略失效。

对应风险的解决方法:

1. 采用更长周期均线,或增加趋势过滤条件。 

2. 结合其他指标判断大趋势,如能量指标、波动率指标等。

3. 提高移动均线周期参数的自适应性。

4. 增加参数优化和反馈机制,动态调整策略参数。


## 策略优化方向

1. 尝试不同类型的移动均线,如线性权重移动均线。

2. 增加自适应移动均线周期功能。

3. 结合波动率类指标判断趋势分段,提高移动均线交叉的有效性。  

4. 增加机器学习算法,实现策略参数的自动优化。

5. 探索多品种组合策略,利用品种间相关性获利。

## 总结

趋势过滤移动均线交叉策略整体来说是一种简单实用的中长线量化策略。它通过均线交叉判断中长线趋势,然后配合趋势过滤来减少无效信号。该策略容易理解和实现,适合量化交易的初学者。其可能的改进空间在于移动均线的优化,以及与其他指标和机器学习算法的整合。作为基础策略,它可以为更高级的量化交易套利算法提供交易信号。

||

## Overview

The Trend Filter Moving Average Crossover Quantitative Strategy is a medium-to-long term quantitative trading strategy. It determines the trend direction of the market through the crossover of fast and slow moving averages, and enters the market under the premise of identifying an effective trend. At the same time, this strategy also sets a longer cycle moving average as a trend filter, so that valid trading signals may only be generated when prices break through that moving average.

## Strategy Logic  

This strategy is mainly based on the principle of moving average crossover. Specifically, two moving averages with different periods are calculated, typically set at 20-day and 50-day lines. A buy signal is generated when the 20-day line breaks above the 50-day line from the bottom up, and a sell signal is generated when the 20-day line breaks the 50-day line from the top down. These simple crossover signals are considered to capture breakouts in the medium-to-long term.

In addition, the strategy also sets a 200-day moving average as the overall trend benchmark. Only when the price breaks through the 200-day line, the aforementioned simple crossover signals are considered valid. This constitutes a trend filtering mechanism to avoid generating a lot of invalid signals in a range-bound market.

## Advantage Analysis  

1. Medium-to-long-term trading frequency avoids excessive trading, reducing trading costs and slippage risks.

2. Moving average crossover determination is clear and easy to understand and implement.

3. The trend filtering mechanism can filter out most invalid signals and improve win rate.

4. Flexible adjustment of moving average parameters is applicable to different varieties and time cycles. 

5. Stop loss and take profit can be set to control single profit and loss.

## Risk Analysis

1. When the price oscillates around the moving averages, multiple invalid signals may be generated resulting in over trading.

2. Long-cycle moving averages may lag the market, thus missing trend reversal points. 

3. Relatively long historical data is required to establish moving average benchmarks, rendering new varieties or short cycles inapplicable. 

4. Strategy parameters need repeated testing and optimization, improper settings may cause strategy failure.

Risk Mitigations:

1. Adopt longer cycle moving averages, or increase trend filtering conditions.

2. Incorporate other indicators to determine the major trend, such as energy indicators, volatility indicators, etc.

3. Improve adaptiveness of moving average cycle parameters.  

4. Increase parameter optimization and feedback mechanisms to dynamically adjust strategy parameters.

## Strategy Optimization  

1. Attempt different types of moving averages, such as Linear Weighted Moving Average.

2. Increase adaptive moving average cycle functionality.

3. Incorporate volatility indicators to determine trend stages, improving the validity of moving average crossovers. 

4. Introduce machine learning algorithms to automatically optimize strategy parameters.

5. Explore multi-asset combinational strategies by utilizing inter-asset correlations for profit.

## Summary  

The Trend Filter Moving Average Crossover Strategy is overall a simple and practical medium-to-long term quantitative strategy. It determines the medium-to-long term trend through moving average crossover, and then uses trend filtering to reduce invalid signals. This strategy has the advantage of being easy to understand and implement, suitable for beginners of quantitative trading. Potential areas of improvement lie in optimization of the moving averages, as well as integration with other indicators and machine learning algorithms. As a basic strategy, it can provide trading signals for more advanced quantitative arbitrage algorithms.

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
start: 2023-11-23 00:00:00
end: 2023-11-30 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

////////////////////////////////////////////////////////////////////////////////
// Booz Strategy
// Developed for Godstime
// Version 1.1
// 11/28/2021
////////////////////////////////////////////////////////////////////////////////

//@version=4
strategy("Booz Strategy", "", true)

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
trade_qty = 1

// Long Side
strategy.entry("Long Entry", strategy.long, trade_qty, when=buy_cond and in_trading_window)
long_tp = strategy.position_avg_price * (1 + tp_perc)
long_sl = strategy.position_avg_price * (1 - sl_perc)
if not swing_trading_mode
    strategy.exit("Long Exit", "Long Entry", limit=long_tp, stop=long_sl)

// Short Side
strategy.entry("Short Entry", strategy.short, trade_qty, when=sell_cond and in_trading_window)
short_tp = strategy.position_avg_price * (1 - tp_perc)
short_sl = strategy.position_avg_price * (1 + sl_perc)
if not swing_trading_mode
    strategy.exit("Short Exit", "Short Entry", limit=short_tp, stop=short_sl)

// End of trading window close
strategy.close_all(when=not in_trading_window)
```

> Detail

https://www.fmz.com/strategy/433915

> Last Modified

2023-12-01 14:25:08
