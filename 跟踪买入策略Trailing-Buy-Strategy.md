
> Name

跟踪买入策略Trailing-Buy-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

跟踪买入策略是一种趋势跟随策略。当快速移动平均线上穿慢速移动平均线时,触发开仓信号。与直接开仓不同,该策略在开仓信号触发后,不会立即入场,而是在价格达到一定条件后才执行买入。这可以在一定程度上提高策略收益。

## 原理  

该策略基于两个移动平均线均线交叉系统。分别计算快速移动平均线和慢速移动平均线,当快速移动平均线上穿慢速移动平均线时,给出做多信号。
    
在开启跟踪选项后,策略执行逻辑会有所不同:

1. 当做多信号触发时,不会立即买入,而是记录该时刻的最低价。

2. 然后根据跟踪买入设置的百分比,计算买入价格阈值,即最低价*(1+百分比)。

3. 在后续K线中,持续比较当前K线的最低价与买入价格阈值。

4. 当最低价上穿买入价格阈值时,执行买入。

5. 如此,可以在趋势确认后,选择一个更佳的价格点入场。

## 优势分析

该策略具有以下优势:

1. 采用跟踪买入,可以在趋势更加明确后入场,从而避免假突破所造成的风险。

2. 通过跟踪买入,可以以更好的价格入场,在一定程度上提升收益。

3. 该策略较为简单易懂,容易实施。

4. 可自定义跟踪买入的步进百分比,使策略更具灵活性。

5. 可自定义移动平均线周期,适用于不同市场环境。

## 风险分析 

该策略也存在一定风险:

1. 采用跟踪买入会带来一定的滞后,可能错过入场机会。

2. 跟踪买入的步进百分比设置不当,可能导致始终无法买入。

3. 移动平均线周期设置不当,可能产生更多假信号。

4. 如遇到震荡行情,该策略可能亏损严重。

5. 该策略比较简单,存在超参数优化空间。

对应风险,可以采取以下措施:

1. 适当缩短跟踪买入的步进百分比,降低滞后。

2. 测试不同百分比设置,找到最佳参数。

3. 优化移动平均线周期,适应市场环境。 

4. 增加其他过滤条件,避免震荡行情。

5. 可以考虑加入止损,降低亏损。

## 优化方向

该策略可以从以下方向进行优化:

1. 增加热点度等量价指标,避免量价不匹配。

2. 增加成交量的条件判断,只在成交量放大的时候买入。

3. 优化移动平均线周期参数,适应不同品种。

4. 增加波动率指标,避免震荡区间。 

5. 加入ATR止损。

6. 可以考虑让步进百分比动态变化,在趋势更明显时步进更快。

## 总结

综上所述,跟踪买入策略通过跟踪价格达到更好入场点的思路进行改进,在保持简单的基础上提高了策略收益。但该策略也存在一定风险,需要进行进一步优化以适应更多市场情况。总体来说,该策略为量化交易提供了一个可资借鉴的思路。

||

## Overview

The trailing buy strategy is a trend following strategy. When the fast moving average crosses over the slow moving average, it triggers an open position signal. Unlike opening position directly, this strategy will not enter the market immediately after the open position signal is triggered, but will execute the buy order only when the price reaches certain conditions. This can increase the profit of the strategy to some extent.

## Principles

This strategy is based on a moving average crossover system with two moving averages. The fast moving average and the slow moving average are calculated respectively. When the fast moving average crosses over the slow moving average, a long signal is generated.

The execution logic will be different when the trailing buy option is enabled:

1. When the long signal is triggered, instead of buying directly, record the lowest price at that time.

2. Then calculate the buy price threshold according to the trailing buy percentage, i.e. lowest price * (1 + percentage). 

3. In subsequent bars, keep comparing the current bar's lowest price with the buy price threshold.

4. When the lowest price crosses over the buy price threshold, execute the buy order.

5. In this way, we can enter the market at a better price point after the trend is confirmed.

## Advantage Analysis

The advantages of this strategy are:

1. Using trailing buy can avoid the risk of false breakout by entering the market after the trend becomes more obvious.

2. Through trailing buy, better prices can be achieved, improving profit to some extent.

3. This strategy is simple and easy to implement. 

4. The trailing buy stepping percentage is customizable, making the strategy more flexible.

5. The moving average periods can be customized to adapt to different market environments.

## Risk Analysis

There are also some risks in this strategy:

1. Trailing buy may cause certain lag and miss the opportunity to enter.

2. Improper setting of the trailing buy stepping percentage may result in inability to buy.

3. Improper moving average periods may produce more false signals. 

4. The strategy may suffer severe losses in ranging markets.

5. This is a simple strategy with room for parameter optimization.

The corresponding measures:

1. Shorten the trailing buy stepping percentage properly to reduce lag.

2. Test different percentage settings to find the optimal.

3. Optimize moving average periods to adapt the market.

4. Add other filters to avoid ranging markets. 

5. Consider adding a stop loss to reduce losses.

## Optimization Directions

The strategy can be optimized in the following directions:

1. Add price-volume indicators like Klinger to avoid price-volume mismatch.

2. Add volume condition judgments, only buy when volume expands.

3. Optimize moving average periods for different products. 

4. Add volatility indicators to avoid ranging zones.

5. Add ATR stop loss. 

6. Consider making the stepping percentage dynamic, stepping faster when trend is more obvious.

## Conclusion

In summary, the trailing buy strategy improves the strategy by trailing the price to better entry points while keeping it simple. But there are still some risks in this strategy that require further optimization to adapt more market situations. Overall, this strategy provides a reference-worthy idea for quantitative trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|(?Filters)From|
|v_input_1|timestamp(01 Jan 2021 00:00 UTC)|fromDate|
|v_input_bool_2|false|To |
|v_input_2|timestamp(31 Dec 2121 23:59 UTC)|toDate|
|v_input_int_1|21|(?Strategy)Fast/Slow SMA Length|
|v_input_int_2|49|slowMALen|
|v_input_bool_3|true|(?Buy)Enable Trailing|
|v_input_float_1|4|Trailing Buy Deviation %|
|v_input_source_1_high|0|Source Buy: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-08 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 
//  -----------------------------------------------------------------------------
//  Copyright 2022 Iason Nikolas | jason5480
//  Trailing Buy script may be freely distributed under the MIT license.
//
//  Permission is hereby granted, free of charge, 
//  to any person obtaining a copy of this software and associated documentation files (the "Software"), 
//  to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, 
//  publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
//  subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
//  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
//  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
//  -----------------------------------------------------------------------------
//
//  Authors:  @jason5480
//  Revision: v1.0.0
//  Date:     15-Feb-2022
//
//  Description
//  =============================================================================
//  This strategy will go long if fast MA crosses over slow MA.
//  If the trailing buy is checked then the strategy instead of entering into the position
//  directly it will follow the price downwards (percentagewise) with small steps
//  If the price raise by this percentage then the entry order will be executed
//
//  The strategy has the following parameters:
//
//  Fast SMA Length - How many candles back to calculte the fast SMA.
//  Slow SMA Length - How many candles back to calculte the slow SMA.
//  Enable Trailing - Enable or disable the trailing
//  Training Buy Deviation % - The step to follow the price when the open position condition is met.
//  Source Buy - The price to compare the current buyPrice in order to trigger the buy order when trailing
//  
//  -----------------------------------------------------------------------------
//  Disclaimer:
//    1. I am not licensed financial advisors or broker dealer. I do not tell you 
//       when or what to buy or sell. I developed this software which enables you 
//       execute manual or automated using TradingView. The 
//       software allows you to set the criteria you want for entering and exiting 
//       trades.
//    2. Do not trade with money you cannot afford to lose.
//    3. I do not guarantee consistent profits or that anyone can make money with no 
//       effort. And I am not selling the holy grail.
//    4. Every system can have winning and losing streaks.
//    5. Money management plays a large role in the results of your trading. For 
//       example: lot size, account size, broker leverage, and broker margin call 
//       rules all have an effect on results. Also, your Take Profit and Stop Loss 
//       settings for individual pair trades and for overall account equity have a 
//       major impact on results. If you are new to trading and do not understand 
//       these items, then I recommend you seek education materials to further your
//       knowledge.
//
//    YOU NEED TO FIND AND USE THE TRADING SYSTEM THAT WORKS BEST FOR YOU AND YOUR 
//    TRADING TOLERANCE.
//
//    I HAVE PROVIDED NOTHING MORE THAN A TOOL WITH OPTIONS FOR YOU TO TRADE WITH THIS PROGRAM ON TRADINGVIEW.
//    
//    I accept suggestions to improve the script.
//    If you encounter any problems I will be happy to share with me.
//  -----------------------------------------------------------------------------
//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// SETUP ============================================================================================================

strategy(title = 'Trailing Buy',
         shorttitle = 'TB',
         overlay = true,
         pyramiding = 0,
         default_qty_type = strategy.percent_of_equity,
         default_qty_value = 100,
         initial_capital = 100000)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// FILTERS ==========================================================================================================

// INPUT ============================================================================================================
usefromDate = input.bool(defval = true, title = 'From', inline = "From Date", group = "Filters")
fromDate = input(defval = timestamp('01 Jan 2021 00:00 UTC'), title = '', inline = "From Date", group = 'Filters')
usetoDate = input.bool(defval = false, title = 'To ', inline = "To Date", group = "Filters")
toDate = input(defval = timestamp('31 Dec 2121 23:59 UTC'), title = '', inline = "To Date", group = 'Filters')

// LOGIC ============================================================================================================
isWithinPeriod() => true

// PLOT =============================================================================================================
bgcolor(color = isWithinPeriod() ? color.new(color.gray, 90) : na, title = 'Period')

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// STRATEGY =========================================================================================================

// INPUT ============================================================================================================
fastMALen = input.int(defval = 21, title = 'Fast/Slow SMA Length', inline = 'MA Length', group = 'Strategy')
slowMALen = input.int(defval = 49, title = '', tooltip = 'How many candles back to calculte the fast/slow SMA.', inline = 'MA Length', group = 'Strategy')

// LOGIC ============================================================================================================
fastMA = ta.sma(close, fastMALen)
slowMA = ta.sma(close, slowMALen)

bool openLongPosition = isWithinPeriod() and ta.crossover(fastMA, slowMA)
bool closeLongPosition = ta.crossunder(fastMA, slowMA)

bool longIsActive = openLongPosition or strategy.position_size > 0

// PLOT =============================================================================================================
var fastColor = color.new(#0056BD, 0)
plot(series = fastMA, title = 'Fast SMA', color = fastColor, linewidth = 1, style = plot.style_line)
var slowColor = color.new(#FF6A00, 0)
plot(series = slowMA, title = 'Slow SMA', color = slowColor, linewidth = 1, style = plot.style_line)

plotshape(series = openLongPosition and strategy.position_size <= 0 ? fastMA : na, title = 'Buy', text = 'Buy', style = shape.labelup, location = location.absolute, color = color.new(color.green, 0), textcolor = color.new(color.white, 0), size = size.tiny)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// BUY ==============================================================================================================

// INPUT ============================================================================================================
enableTrailing = input.bool(defval = true, title = 'Enable Trailing', tooltip = 'Enable or disable the trailing for buy.', group = 'Buy')
trailingBuyDeviationPerc = input.float(defval = 4.0, title = 'Trailing Buy Deviation %', minval = 0.01, maxval = 100, step = 0.05, tooltip = 'The step to follow the price when the open position condition is met.', group = 'Buy') / 100
srcBuy = input.source(defval = high, title = 'Source Buy', tooltip = 'The price to check to trigger the buy order', group = 'Buy')

// LOGIC ============================================================================================================
int barsSinceOpenLong = nz(ta.barssince(openLongPosition), 999999)
int barsSinceCloseLong = nz(ta.barssince(closeLongPosition), 999999)
bool tryOpenLongPosition = isWithinPeriod() and barsSinceCloseLong >= barsSinceOpenLong and not (strategy.position_size > 0)

float longBuyPrice = na
longBuyPrice := if openLongPosition and not (strategy.position_size > 0)
    low * (1 + trailingBuyDeviationPerc)
else if tryOpenLongPosition
    math.min(low * (1 + trailingBuyDeviationPerc), nz(longBuyPrice[1], 999999))
else
    na

bool executeLongPosition = enableTrailing ? isWithinPeriod() and srcBuy > longBuyPrice : openLongPosition

// PLOT =============================================================================================================
var buyColor = color.new(#419388, 0)
plot(series = enableTrailing ? longBuyPrice : na, title = 'Long Buy Price', color = buyColor, linewidth = 1, style = plot.style_linebr, offset = 1)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// POSITION ORDERS ==================================================================================================

// LOGIC ============================================================================================================
// getting into LONG position
strategy.entry(id = 'Long Entry', direction = strategy.long, when = executeLongPosition, alert_message = 'Long(' + syminfo.ticker + '): Started')
// submit close order on trend reversal
strategy.close(id = 'Long Entry', when = closeLongPosition, comment = 'Close Long', alert_message = 'Long(' + syminfo.ticker + '): Closed at market price')

// PLOT =============================================================================================================
var posColor = color.new(color.white, 0)
plot(series = strategy.position_avg_price, title = 'Position', color = posColor, linewidth = 1, style = plot.style_linebr)

// ==================================================================================================================
```

> Detail

https://www.fmz.com/strategy/428782

> Last Modified

2023-10-09 14:53:02
