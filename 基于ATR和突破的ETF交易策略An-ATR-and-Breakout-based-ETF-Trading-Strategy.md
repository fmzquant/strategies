
> Name

基于ATR和突破的ETF交易策略An-ATR-and-Breakout-based-ETF-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9c2b339fa35f1e6849.png)
[trans]

## 概述

该策略是一个基于平均真实波幅(ATR)和价格突破的ETF自动交易策略。它使用ATR来计算止损位和止盈位,并在价格突破一定周期最高价或最低价时开仓做多或做空。 

## 策略原理

该策略主要基于以下原理:

1. 使用一定周期(如20根K线)的最高价和最低价来判断价格走势和方向。当价格突破周期最高价时,做多;当价格突破周期最低价时,做空。

2. 使用ATR来动态计算止损位。止损位距离入场价一个ATR周期的ATR值乘以系数(如2)。

3. 使用ATR来计算止盈位。止盈距离入场价为一个ATR周期的ATR值乘以系数(如1)。

4. 使用ATRtrailer多因子来跟踪止损。当价格向不利方向突破trailer止损位时,平仓止损。

该策略简单可靠,既考虑了价格趋势的方向,有利于及时捕捉价格趋势;又设置了止损和止盈位,有利于把握盈利机会并控制风险。

## 优势分析

该策略具有以下优势:

1. 策略思路简单清晰,容易理解和实施。

2. 利用ATR计算止盈止损位,可以动态调整仓位规模,灵活控制风险。

3. 周期突破判断策略容易捕捉价格趋势,收益较好。

4. Trailer止损可以及时止损,避免承担过大风险。

5. 适用于趋势较明显的品种,如ETF、股票等。

## 风险分析

该策略也存在以下风险:

1. 价格震荡时,可能出现较多的错误信号和反向开仓。

2. 周期参数设置不当可能错过价格趋势或虚惊交易次数过多。

3. 系数参数设置不当,可能导致止损或止盈过于激进或保守,影响盈利。

4. ETF本身具有的风险,如政策风险、溢价风险等也会对策略带来影响。

对应解决方法:
1. 优化参数,降低虚拟交易率。
2. 结合多个因子和过滤器来确定交易信号。
3. 按不同市场调整参数。
4. 分散投资,控制单只ETF的仓位。

## 优化方向 

该策略可以从以下几个方面进一步优化:

1. 结合移动均线等指标来过滤虚假信号。

2. 增加适应性参数优化模块,根据不同周期和品种自动优化参数。

3. 增加机器学习模型预测下一根K线的高点和低点,来判断突破信号。

4. 考虑交易量溢出等指标,防范假突破。 

5. 优化开仓仓位大小和比例,不同品种和市场环境适应性开仓。

## 总结

该策略整体思路清晰简洁,核心机制突破和ATR动态止盈止损可以有效控制风险和锁定盈利。通过参数优化和结合更多过滤指标,可以进一步增强策略Profit因子和风险控制能力,是一个值得入手和持续优化的量化策略。

|| 

## Overview

This is an ETF algorithmic trading strategy based on Average True Range (ATR) and price breakout. It uses ATR to calculate stop loss and take profit levels, and open long or short positions when price breaks through the highest or lowest price of a certain period.

## Strategy Logic

The strategy is mainly based on the following principles:

1. Use the highest and lowest prices of a certain period (e.g. 20 candles) to determine price trend and direction. Go long when price breaks through the highest price of the period, and go short when price breaks through the lowest price.

2. Use ATR to dynamically calculate stop loss level. The stop loss is placed at a distance of ATR value of an ATR period multiplied by a coefficient (e.g. 2) from the entry price.

3. Use ATR to determine take profit level. The take profit is placed at a distance of ATR value of an ATR period multiplied by a coefficient (e.g. 1) from the entry price. 

4. Use ATR trailer multiplier to trail stop loss. Close positions with stop loss when price breaks through trailer stop loss level towards unfavourable direction.

The strategy is simple and reliable, as it considers both price trend direction for timely catching price movements, and sets stop loss and take profit for profit taking and risk control.

## Advantage Analysis 

The advantages of this strategy include:

1. The strategy logic is simple and clear, easy to understand and implement.

2. Using ATR to calculate adaptive stop loss and take profit levels helps flexible position sizing and risk control.

3. Breakout strategies are good at catching price trends, leading to good returns. 

4. Trailer stop loss can close positions timely, avoiding excessive loss.

5. It is suitable for products with obvious trends, like ETFs and stocks.

## Risk Analysis

The risks of the strategy include:

1. More false signals and reverse openings may occur during price consolidation. 

2. Improper parameter tuning may lead to missing price trends or too many unnecessary trades.

3. Extreme parameter values may result in over-aggressive or over-conservative stop loss and take profit, influencing strategy profitability.  

4. Underlying risks of ETFs like policy and premium risks can also impact strategy performance.

Corresponding solutions:
1. Optimize parameters to decrease unnecessary trades.
2. Add more factors and filters to confirm trading signals. 
3. Adjust parameters adaptively for different markets.
4. Diversify investment and control position size of a single ETF.

## Optimization Directions

The strategy can be further optimized from the following aspects:

1. Add indicators like moving average to filter out false signals.

2. Develop adaptive parameter optimization module to auto tune parameters for different periods and products.

3. Adopt machine learning models to predict next candle's highest and lowest prices for determining breakout signals.

4. Consider trading volume overflow to avoid false breakout.

5. Optimize initial position sizing and allocation percentages adaptively for different products and market regimes.

## Conclusion  

The strategy has clear and simple logic. The core mechanisms of breakout and adaptive ATR stop loss/take profit can effectively control risks and lock in profits. Further enhancing Profit factors and risk control capabilities through parameter optimization and integrating more filters can make it a profitable and optimizable quantitative strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|HH LL lookback|
|v_input_2|14|ATR period|
|v_input_3|2|ATR SL multiplier|
|v_input_4|true|ATR TP multiplier|
|v_input_5|3.5|ATR trailing SL multiplier|
|v_input_6|4|trailing SL lookback|
|v_input_7|true|max sequel trades|
|v_input_8|true|trade long ?|
|v_input_9|false|trade short ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-18 00:00:00
end: 2023-12-21 03:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © FX_minds

//@version=4
strategy("ETF tradedr", overlay=true, pyramiding=100, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

//------------------------------ get user input
lookback                   = input(title="HH LL lookback", type=input.integer, defval=20)
ATR_periode                = input(title="ATR period", type=input.integer, defval=14)
ATR_SL_multiplier          = input(title="ATR SL multiplier", type=input.float, defval=2)
ATR_TP_multiplier          = input(title="ATR TP multiplier", type=input.float, defval=1)
trailing_SL_ATR_multiplier = input(title="ATR trailing SL multiplier", type=input.float, defval=3.5)
lookback_trailing_SL       = input(title="trailing SL lookback", type=input.integer, defval=4)
max_sequel_trades          = input(title="max sequel trades", type=input.float, defval=1)
trade_long                 = input(title= "trade long ?", type=input.bool, defval=true)
trade_short                = input(title= "trade short ?", type=input.bool, defval=false)

//------------------------------ determine entry conditions
long_condition   = barstate.isconfirmed and crossover(high, highest(high, lookback)[1])
short_condition  = barstate.isconfirmed and crossunder(low, lowest(low, lookback)[1])


//------------------------------ count open long trades
count_open_longs = 0
count_open_longs := nz(count_open_longs[1])

if (long_condition) 
    count_open_longs := count_open_longs +1
    //label.new(bar_index, low, tostring(count_open_longs, "#"), xloc.bar_index, yloc.belowbar, color.green, label.style_none, color.green, size.large)

if (short_condition)
    count_open_longs := 0


//------------------------------ count open short trades
count_open_shorts = 0
count_open_shorts := nz(count_open_shorts[1])

if (short_condition)
    count_open_shorts := count_open_shorts +1
    //label.new(bar_index, low, tostring(count_open_shorts, "#"), xloc.bar_index, yloc.belowbar, color.red, label.style_none, color.red, size.large)

if (long_condition)
    count_open_shorts := 0


//------------------------------ calculate entryprice
entryprice_long = long_condition ? close : na
entryprice_short = short_condition ? close : na


//------------------------------ calculate SL & TP
SL_distance = atr(ATR_periode) * ATR_SL_multiplier
TP_distance  = atr(ATR_periode) * ATR_TP_multiplier
trailing_SL_distance = atr(ATR_periode) * trailing_SL_ATR_multiplier

SL_long = entryprice_long - SL_distance
SL_short = entryprice_short + SL_distance

trailing_SL_short = lowest(close, lookback_trailing_SL) + trailing_SL_distance
trailing_SL_long  = highest(close, lookback_trailing_SL) - trailing_SL_distance

trailing_SL_short_signal = crossover(high, trailing_SL_short[1])
trailing_SL_long_signal = crossunder(low, trailing_SL_long[1])


//------------------------------ plot entry price & SL  
plot(entryprice_long, style=plot.style_linebr, color=color.white)
plot(SL_long, style=plot.style_linebr, color=color.red)
plot(SL_short, style=plot.style_linebr, color=color.green)
plot(trailing_SL_short, style=plot.style_linebr, color=color.red)
plot(trailing_SL_long, style=plot.style_linebr, color=color.green)


//------------------------------ submit entry orders
if (long_condition) and (count_open_longs <= max_sequel_trades) and (trade_long == true)
    strategy.entry("Long" + tostring(count_open_longs, "#"), strategy.long)
    strategy.exit("SL Long"+ tostring(count_open_longs, "#"), 
     from_entry="Long" + tostring(count_open_longs, "#"), stop=SL_long)

if (short_condition) and (count_open_shorts <= max_sequel_trades) and (trade_short == true)
    strategy.entry("Short" + tostring(count_open_shorts, "#"), strategy.short)
    strategy.exit("SL Short" + tostring(count_open_shorts, "#"), 
     from_entry="Short" + tostring(count_open_shorts, "#"), stop=SL_short)
    

//------------------------------ submit exit conditions
if (trailing_SL_long_signal)
    strategy.close("Long" + tostring(count_open_longs, "#"))
    strategy.close("Long" + tostring(count_open_longs-1, "#"))
    strategy.close("Long" + tostring(count_open_longs-2, "#"))
    strategy.close("Long" + tostring(count_open_longs-4, "#"))
    strategy.close("Long" + tostring(count_open_longs-5, "#"))
    strategy.close("Long" + tostring(count_open_longs-6, "#"))
    strategy.close("Long" + tostring(count_open_longs-7, "#"))
    strategy.close("Long" + tostring(count_open_longs-8, "#"))
    strategy.close("Long" + tostring(count_open_longs-9, "#"))
    
if (trailing_SL_short_signal)
    strategy.close("Short" + tostring(count_open_shorts, "#"))
    strategy.close("Short" + tostring(count_open_shorts-1, "#"))
    strategy.close("Short" + tostring(count_open_shorts-2, "#"))
    strategy.close("Short" + tostring(count_open_shorts-3, "#"))
    strategy.close("Short" + tostring(count_open_shorts-4, "#"))
    strategy.close("Short" + tostring(count_open_shorts-5, "#"))
    strategy.close("Short" + tostring(count_open_shorts-6, "#"))
    strategy.close("Short" + tostring(count_open_shorts-7, "#"))
    strategy.close("Short" + tostring(count_open_shorts-8, "#"))
    strategy.close("Short" + tostring(count_open_shorts-9, "#"))


```

> Detail

https://www.fmz.com/strategy/436650

> Last Modified

2023-12-26 16:05:55
