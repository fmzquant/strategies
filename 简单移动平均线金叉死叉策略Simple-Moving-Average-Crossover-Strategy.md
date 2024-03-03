
> Name

简单移动平均线金叉死叉策略Simple-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/101c6caca810f8fbe13.png)
[trans]


## 概述

该策略基于多条不同时间周期的简单移动平均线(SMA)的金叉死叉来判断行情趋势和发出买卖信号。策略采用20日线、50日线、100日线和200日线四条SMA。当短期SMA上穿长期SMA时为金叉信号,做多;当短期SMA下穿长期SMA时为死叉信号,做空。

## 策略原理 

该策略的核心逻辑基于以下几点:

1. 计算多条不同时间周期的SMA,包括20日线、50日线、100日线和200日线。

2. 判断短期SMA(20日线)与长期SMA(50日线、100日线、200日线)的交叉情况。

3. 当20日线上穿50日线时判断为金叉信号,做多;当20日线下穿50日线时判断为死叉信号,做空。

4. 与此同时,50日线、100日线和200日线要满足大趋势判断逻辑,即较长周期的SMA要位于较短周期的SMA之上。

5. 入场信号优先级:20日线与50日线>20日线与100日线>20日线与200日线。

6. 出场信号为20日线重新跨过50日线。

该策略主要依靠SMA线的交叉来判断趋势方向。在牛市中,短期SMA上穿长期SMA为金叉信号,表示行情可能进入趋势;在熊市中,短期SMA下穿长期SMA为死叉信号,表示行情可能进入调整。另外,较长周期SMA要高于较短SMA也是确认大趋势的判断依据。

## 策略优势

该策略具有以下几点优势:

1. 策略思路简单清晰,易于理解和实现。

2. 使用SMA指数移动平均线,相比EMA更能有效过滤市场噪音,识别趋势。 

3. 多组时间周期SMA结合使用,可以提高信号的可靠性。

4. 入场信号优先级设定合理,避免过早入场。

5. 可自定义SMA周期和颜色,优化策略。

6. 可在多种时间周期使用,适合不同交易风格。

7. SMA交叉系统对大盘趋势的判断非常准确有效。

## 策略风险

该策略也存在以下风险:

1. 在震荡行情中,SMA交叉信号频繁,可能产生大量错误信号。

2. 固定的SMA周期无法适应市场的变化,应该结合趋势和波动率优化SMA参数。

3. 仅凭SMA交叉无法确定入场时机,应该结合其他指标如MACD辅助判断。 

4. SMA本质具有滞后性,应提前优化入场时机或使用限价单。

5. 该策略对交易资金管理要求高,必须严格遵守止损逻辑。

6. 应充分考虑交易成本对策略盈利能力的影响。

## 策略优化

该策略可以从以下几个方面进行优化:

1. 优化SMA周期参数,不同周期参数适用于不同市况,可以结合ATR动态优化。

2. 增加其他指标结合,如MACD、RSI等来辅助过滤入场时机。

3. 增加趋势判断逻辑,如ADX,避免震荡市错交易。

4. 优化止损方式,可按ATR止损或跟踪止损。

5. 优化仓位管理,根据资金规模动态调整每单仓位。

6. 测试不同品种参数效果,根据特性调整SMA周期。

7. 多时间框架结合,确保大周期趋势一致。

## 总结

整体来说,该SMA金叉死叉策略通过简单的移动平均线交叉系统判断趋势方向,可靠性较高,适合大多数交易者。但其本身存在一些滞后性和错误信号问题。我们应该从优化入场时机、止损方式、仓位管理等方面继续完善该策略,使其在不同市场环境中都能具备稳定的盈利能力。多种技术指标和趋势判断的综合运用,才能使趋势跟踪策略真正做到稳健、高效、可靠。

||


## Overview

This strategy generates buy and sell signals based on golden cross and death cross of multiple simple moving averages (SMAs) with different time periods to determine the trend direction. It uses 4 SMAs - 20-day, 50-day, 100-day and 200-day SMA. When the shorter-term SMA crosses above the longer-term SMA, it is considered a golden cross and a buy signal is triggered. When the shorter-term SMA crosses below the longer-term SMA, it is considered a death cross and a sell signal is triggered.

## Strategy Logic

The core logic of this strategy is based on the following points:

1. Calculate multiple SMAs with different time periods including 20-day, 50-day, 100-day and 200-day SMA.

2. Check the crossover situations between the shorter-term SMA (20-day) and longer-term SMAs (50-day, 100-day, 200-day). 

3. When the 20-day SMA crosses above the 50-day SMA, it is considered a golden cross and a buy signal is triggered. When the 20-day SMA crosses below the 50-day SMA, it is considered a death cross and a sell signal is triggered.

4. The larger trend is determined by the longer time period SMAs staying above the shorter time period SMAs, i.e. 50-day SMA > 20-day SMA.

5. The priority for entry signals is: 20-day SMA vs 50-day SMA > 20-day SMA vs 100-day SMA > 20-day SMA vs 200-day SMA.

6. Exit signal is generated when the 20-day SMA crosses back below the 50-day SMA.

The strategy mainly relies on SMA crossovers to determine the trend direction. Golden crosses in bull markets and death crosses in bear markets can signal potential trend start. In addition, longer term SMAs staying above shorter term SMAs serve as confirmation of the larger trend.

## Advantages of the Strategy

The main advantages of this strategy include:

1. The logic is simple and easy to understand and implement.

2. SMAs are better than EMAs in filtering market noise and identifying the trend.

3. Using multiple time period SMAs improves signal reliability. 

4. The priority setting for entry signals avoids premature entry.

5. Customizable SMA periods and colors allow strategy optimization.

6. Applicable to multiple timeframes for different trading styles.

7. SMA crossover system is very effective in determining the major trend direction.

## Risks of the Strategy

Some risks associated with this strategy:

1. Too many false signals may occur during ranging markets with frequent SMA crosses.

2. Fixed SMA periods cannot adapt to market changes, parameters should be optimized based on trend and volatility.

3. SMA crosses alone cannot determine precise entry, other indicators like MACD should be incorporated.

4. SMAs have lagging nature, entry timing needs optimization or limit orders should be used.  

5. Strict stop loss implementation is crucial for capital preservation.

6. Trading costs impact on profitability should be considered.

## Enhancement of the Strategy

Some ways to optimize this strategy:

1. Optimize SMA periods dynamically based on market conditions and ATR.

2. Add other indicators like MACD, RSI for entry timing.

3. Add trend filter like ADX to avoid false signals during consolidation.

4. Optimize stop loss methods like ATR stop or trailing stop.

5. Manage position sizing dynamically based on account size.

6. Test optimal parameters across different asset classes. 

7. Incorporate multiple timeframes to ensure consistency with higher timeframe trend.

## Conclusion

In summary, this simple SMA crossover system is reliable in determining trend direction and suitable for most traders. However, it has some lagging issues and can generate false signals. We should look to enhance entry timing, stop loss, position sizing etc. to make it robust across changing market environments. The combination of multiple technical indicators and trend evaluation is key to building a solid trend following strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|MA №1|
|v_input_string_1|0|ma1_type: SMA|EMA|SMMA (RMA)|WMA|VWMA|
|v_input_2_close|0|ma1_source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|20|ma1_length|
|v_input_3|#0929f6|ma1_color|
|v_input_4|true|MA №2|
|v_input_string_2|0|ma2_type: SMA|EMA|SMMA (RMA)|WMA|VWMA|
|v_input_5_close|0|ma2_source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|50|ma2_length|
|v_input_6|#00fb04|ma2_color|
|v_input_7|true|MA №3|
|v_input_string_3|0|ma3_type: SMA|EMA|SMMA (RMA)|WMA|VWMA|
|v_input_8_close|0|ma3_source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_3|100|ma3_length|
|v_input_9|#131313|ma3_color|
|v_input_10|true|MA №4|
|v_input_string_4|0|ma4_type: SMA|EMA|SMMA (RMA)|WMA|VWMA|
|v_input_11_close|0|ma4_source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_4|200|ma4_length|
|v_input_12|#f60c0c|ma4_color|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-14 00:00:00
end: 2023-11-13 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © xyzdesign1989
//@version=5
strategy("SMA crossover buy/sell [SCSM_Algo]", overlay=true, margin_long=3000, margin_short=3000)


BuyCond = ta.crossover(ta.sma(close, 20), ta.sma(close, 50)) and ta.sma(close, 20) > ta.sma(close, 50) and  ta.sma(close, 50) > ta.sma(close, 100) and  ta.sma(close, 100) > ta.sma(close, 200) or (ta.crossover(ta.sma(close, 20), ta.sma(close, 100)) and ta.sma(close, 20) > ta.sma(close, 50))
if (BuyCond)
    strategy.entry("SCSM ? Buy", strategy.long)

SellCond = ta.crossunder(ta.sma(close, 20), ta.sma(close, 50))
if (SellCond)
    strategy.entry("الحمد للہ،Sell", strategy.short)

ma(source, length, type) =>
    type == "SMA" ? ta.sma(source, length) :
     type == "EMA" ? ta.ema(source, length) :
     type == "SMMA (RMA)" ? ta.rma(source, length) :
     type == "WMA" ? ta.wma(source, length) :
     type == "VWMA" ? ta.vwma(source, length) :
     na

show_ma1   = input(true   , "MA №1", inline="MA #1")
ma1_type   = input.string("SMA"  , ""     , inline="MA #1", options=["SMA", "EMA", "SMMA (RMA)", "WMA", "VWMA"])
ma1_source = input(close  , ""     , inline="MA #1")
ma1_length = input.int(20     , ""     , inline="MA #1", minval=1)
ma1_color  = input(#0929f6, ""     , inline="MA #1")
ma1 = ma(ma1_source, ma1_length, ma1_type)
plot(show_ma1 ? ma1 : na, color = ma1_color, title="MA №1")

show_ma2   = input(true   , "MA №2", inline="MA #2")
ma2_type   = input.string("SMA"  , ""     , inline="MA #2", options=["SMA", "EMA", "SMMA (RMA)", "WMA", "VWMA"])
ma2_source = input(close  , ""     , inline="MA #2")
ma2_length = input.int(50     , ""     , inline="MA #2", minval=1)
ma2_color  = input(#00fb04, ""     , inline="MA #2")
ma2 = ma(ma2_source, ma2_length, ma2_type)
plot(show_ma2 ? ma2 : na, color = ma2_color, title="MA №2")

show_ma3   = input(true   , "MA №3", inline="MA #3")
ma3_type   = input.string("SMA"  , ""     , inline="MA #3", options=["SMA", "EMA", "SMMA (RMA)", "WMA", "VWMA"])
ma3_source = input(close  , ""     , inline="MA #3")
ma3_length = input.int(100    , ""     , inline="MA #3", minval=1)
ma3_color  = input(#131313, ""     , inline="MA #3")
ma3 = ma(ma3_source, ma3_length, ma3_type)
plot(show_ma3 ? ma3 : na, color = ma3_color, title="MA №3")

show_ma4   = input(true   , "MA №4", inline="MA #4")
ma4_type   = input.string("SMA"  , ""     , inline="MA #4", options=["SMA", "EMA", "SMMA (RMA)", "WMA", "VWMA"])
ma4_source = input(close  , ""     , inline="MA #4")
ma4_length = input.int(200    , ""     , inline="MA #4", minval=1)
ma4_color  = input(#f60c0c, ""     , inline="MA #4")
ma4 = ma(ma4_source, ma4_length, ma4_type)
plot(show_ma4 ? ma4 : na, color = ma4_color, title="MA №4")
```

> Detail

https://www.fmz.com/strategy/432114

> Last Modified

2023-11-14 16:17:16
