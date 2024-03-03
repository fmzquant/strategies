
> Name

多时间框架趋势策略Multiple-Timeframe-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1408e1b3ab4a79b8b8a.png)

[trans]


## 概述

该策略是一个利用多时间框架进行交易的策略,主要使用长期时间框架判断趋势方向,中期时间框架判断动量方向,短期时间框架寻找具体的入场点。整体来说,策略主要思想是同时利用趋势、动量和具体入场点三个不同时间段的信息来进行决策。

## 原理

该策略主要通过以下几个部分来实现:

1. 定义不同时间框架

    - 长期时间框架(日线):用于判断整体趋势方向
    - 中期时间框架(4小时):用于判断动量方向 
    - 短期时间框架(自定义):用于寻找具体入场点

2. 判断长期趋势

    - 使用SMA均线判断长期趋势方向
    - 如果close高于SMA,定义为多头趋势
    - 如果close低于SMA,定义为空头趋势

3. 判断中期动量

    - 使用Stoch指标的K线和D线
    - 当K线在D线之上,定义为上升动量
    - 当K线在D线之下,定义为下降动量

4. 寻找入场点

    - 多头入场:长期多头,中期Stoch动量向上,短期均线金叉
    - 空头入场:长期空头,中期Stoch动量向下,短期均线死叉

5. 退出点

    - 多头退出:中期Stoch K线下穿D线
    - 空头退出:中期Stoch K线上穿D线

综上,该策略充分利用了多时间框架的信息,从长短不同维度判断趋势和时机,可以有效过滤假突破,在趋势背景下选择高概率的入场点位。

## 优势

该策略具有以下优势:

1. 多时间框架设计科学、细致,可以更准确判断市场走势,有效避免被市场短期噪音误导。

2. 同时考虑趋势、动量和入场时机,条件较为全面和严谨,可以过滤大量假信号。

3. 利用Stoch指标判断中期动量非常精准,可以把握市场真正的反转时机。

4. 入场条件设置得较严格,可以避开大部分冲高回落的虚假突破。

5. 设定了明确的止损退出点,可以有效控制每次交易的风险。

6. 适用于多种市场环境,不会被特定行情所局限。

7. 资金管理方面可以进行优化,如设定固定止损比例、动态调整仓位等。

## 风险

该策略也存在一些风险需要注意:

1. 在震荡行情中,可能出现多次止损。 

2. 大趋势突变时,跟趋势的判断会滞后,可能误操作。

3. 仅依靠KDJ指标判断中期动量对突变也易错失良机。 

4. 入场条件过于严格,可能错过部分行情。

5. 盈利空间相对有限,难以把握大行情。

对应风险,可以从以下方面进行优化:

1. 适当调整参数,降低误差率。

2. 增加趋势判断指标,建立组合判断。 

3. 结合更多指标判断中期动量,如MACD等。

4. 优化止损机制,改为追踪止损等方式。

5. 大趋势发生变化时,及时调整止损点和仓位。

## 优化方向 

该策略可以从以下几个方面进行优化:

1. 参数优化。如调整MA周期参数,Stoch参数等,使信号更准确。

2. 增加更多指标判断。可以引入MACD,Bollinger Band等指标辅助判断。

3. 优化入场条件。可以考虑放宽入场条件,适当增加交易频率。

4. 优化止损方式。可以采用追踪止损,或根据ATR设置止损位。

5. 增加仓位管理。如大趋势突变时主动调整仓位。

6. 优化机器学习。利用机器学习方法自动优化参数和策略规则。

7. 考虑基本面因素。结合重要经济数据发布进一步确认交易信号。

8. 测试不同品种套用效果。评估策略在不同品种如外汇、贵金属等的效果。

## 总结

该多时间框架趋势策略整体来看,核心思路是利用长、中、短三个时间维度的信息进行决策。策略优势在于条件严格、风险可控,但需要针对具体市场进行参数和规则优化。未来可通过引入更多指标、优化止损方式、加入机器学习等方法进一步完善该策略。

||


## Overview

This strategy is a trading strategy that utilizes multiple timeframes. It mainly uses the long-term timeframe to determine the trend direction, medium-term timeframe to determine momentum direction, and short-term timeframe to locate specific entry points. The overall idea is to make decisions based on trend, momentum and entry timing in three different time spans.

## Principles 

The strategy is implemented mainly through the following:

1. Define different timeframes

    - Long term (daily): to determine overall trend
    - Medium term (4-hour): to determine momentum direction
    - Short term (custom): to locate entry points

2. Determine long-term trend 

    - Use SMA to determine long-term trend direction
    - If close is above SMA, define as uptrend
    - If close is below SMA, define as downtrend

3. Determine medium-term momentum

    - Use Stoch K and D lines 
    - When K line is above D line, define as upward momentum
    - When K line is below D line, define as downward momentum

4. Locate entry points

    - Long entry: long-term uptrend, medium-term Stoch upwards, short-term MA golden cross
    - Short entry: long-term downtrend, medium-term Stoch downwards, short-term MA dead cross

5. Exit points

    - Long exit: medium-term Stoch K line crosses below D line
    - Short exit: medium-term Stoch K line crosses above D line

In summary, this strategy makes full use of information across timeframes, judging trend and timing from different dimensions, which can effectively filter false breakouts and select high probability entry points along the trend.

## Advantages

The advantages of this strategy include:

1. The multiple timeframe design is scientific and meticulous, allowing for more accurate market trend judgment and avoiding being misled by short-term market noise.

2. Comprehensive conditions considering trend, momentum and entry timing help filter out many false signals.  

3. Using Stoch to determine medium-term momentum is very precise and helps capture true market reversals.

4. The strict entry criteria avoid most false breakouts from price spikes.

5. Defined stop loss exit points effectively control risk for each trade.

6. Applicable to various market environments without being constrained by specific market conditions. 

7. There is room for optimizing capital management, such as fixed stop loss percentage, dynamic position sizing etc.

## Risks

There are also some risks to note for this strategy:

1. In ranging markets, there may be multiple stop loss hits.

2. Trend changes may not be captured in time, leading to improper trades.

3. Relying solely on Stoch for momentum judgment has limitations.

4. The strict entry criteria may cause missing out some trends. 

5. The profit potential is relatively limited, unable to capture huge trends.

Some ways to mitigate the risks:

1. Fine tune parameters to lower error rates.

2. Add trend indicators to establish combined judgment.

3. Incorporate more indicators like MACD for momentum judgment. 

4. Optimize stop loss to use trailing stop etc.

5. Promptly adjust stop loss and position size when major trend changes.

## Optimization

Some ways to optimize the strategy:

1. Parameter optimization such as MA periods, Stoch settings to improve signal accuracy.

2. Add more indicators such as MACD, Bollinger Bands for enhanced judgment.

3. Optimize entry criteria, allow more trades at acceptable risk levels.  

4. Use trailing stop loss or ATR-based stops.

5. Actively adjust position sizing when major trend changes. 

6. Utilize machine learning to auto optimize parameters and rules.

7. Consider fundamentals, use key data releases to further confirm signals.

8. Test effectiveness across different products like forex, metals etc.

## Conclusion

In summary, the core idea of this multiple timeframe trend strategy is to make decisions based on long-, medium- and short-term dimensions. The advantages lie in strict conditions and controllable risks, but parameters and rules need optimization for specific markets. Going forward, this strategy can be further enhanced by incorporating more indicators, optimizing stops, adding machine learning etc.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Entry timeframe (minutes)|
|v_input_2|50|Moving Average Period (Trend)|
|v_input_3|18|Stoch Length|
|v_input_4|80|Stoch OB|
|v_input_5|20|Stoch OS|
|v_input_6|14|Stoch SmoothK|
|v_input_7|14|Stoch SmoothD|
|v_input_8|7|Moving Avg SM|
|v_input_9|21|Moving Avg MD|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-15 00:00:00
end: 2023-10-22 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("TUX MTF", overlay=true)

// MULTIPLE TIME FRAME STRATEGY
// LONG TERM --- TREND
// MED TERM --- MOMENTUM
// SHORT TERM --- ENTRY

// ENTRY POSITION TIMEFRAME
entry_position = input(title="Entry timeframe (minutes)",  defval=5, minval=1, maxval=1440)
med_term = entry_position * 4
long_term = med_term * 4

// GLOBAL VARIABLES
ma_trend = input(title="Moving Average Period (Trend)",  defval=50, minval=5, maxval=200)

// RSI
length = input(title="Stoch Length",  defval=18, minval=5, maxval=200)
OverBought = input(title="Stoch OB",  defval=80, minval=60, maxval=100)
OverSold = input(title="Stoch OS",  defval=20, minval=5, maxval=40)
smoothK = input(title="Stoch SmoothK",  defval=14, minval=1, maxval=40)
smoothD = input(title="Stoch SmoothD",  defval=14, minval=1, maxval=40)
maSm = input(title="Moving Avg SM",  defval=7, minval=5, maxval=50)
maMed = input(title="Moving Avg MD",  defval=21, minval=13, maxval=200)

// LONG TERM TREND
long_term_trend = request.security(syminfo.ticker, tostring(long_term), sma(close,ma_trend)) > request.security(syminfo.ticker, tostring(long_term), close)
plot(request.security(syminfo.ticker, tostring(long_term), sma(close,ma_trend)), title="Long Term MA", linewidth=2)
// FALSE = BEAR
// TRUE = BULL

// MED TERM MOMENTUM

k = request.security(syminfo.ticker, tostring(med_term), sma(stoch(close, high, low, length), smoothK))
d = request.security(syminfo.ticker, tostring(med_term), sma(k, smoothD))

os = k >= OverBought or d >= OverBought
ob = k <= OverSold or d <= OverSold


// SHORT TERM MA X OVER
bull_entry = long_term_trend == false and os == false and ob == false and k > d and request.security(syminfo.ticker, tostring(entry_position), crossover(sma(close, maSm), sma(close, maMed)))
bear_entry = long_term_trend == true and os == false and ob == false and k < d and request.security(syminfo.ticker, tostring(entry_position), crossunder(sma(close, maSm), sma(close, maMed)))



bull_exit = crossunder(k,d)
bear_exit = crossover(k,d)



if (bull_entry)
    strategy.entry("Long", strategy.long)
    

if (bear_entry)
    strategy.entry("Short", strategy.short)
  
strategy.close("Long", when = bull_exit == true)
strategy.close("Short", when = bear_exit == true)

    
    

    



```

> Detail

https://www.fmz.com/strategy/429960

> Last Modified

2023-10-23 16:56:52
