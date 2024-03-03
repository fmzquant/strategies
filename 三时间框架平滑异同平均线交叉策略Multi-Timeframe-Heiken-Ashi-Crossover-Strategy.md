
> Name

三时间框架平滑异同平均线交叉策略Multi-Timeframe-Heiken-Ashi-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略基于三个时间周期的平滑异同平均线指标,当不同周期指标同向看涨或看跌时,产生交易信号。目的是利用多时间框架确认趋势,降低假信号概率。

## 原理

平滑异同平均线(Heiken Ashi)指标不同于普通K线,其计算方式可平滑价格曲线,识别趋势较为准确。

本策略采用日线、周线和月线三个时间周期的平滑异同平均线指标。当三者同向看涨,即出现所有时间周期的火烛线为绿色时,产生买入信号;当三者同看跌,即火烛线全部为红色时,产生卖出信号。

入场后,只要任一时间周期平滑异同平均线转向,即产生平仓信号。

## 优势

1. 多时间框架验证,可减少假信号,增强稳定性。

2. 平滑异同平均线指标可识别趋势,减少噪音。

3. 规则简单清晰,容易实施。

4. 可灵活选择时间周期组合,适应不同品种。

5. 无参数优化,极易操作。

## 风险及解决方案

1. 多重条件限制,可能错过交易机会。可降低条件限制。

2. 平滑异同平均线滞后问题仍存在,可能延迟信号。可结合其他指标进行优化。

3. 未设止损,无法控制风险。可加入移动止损策略。 

4. 盈亏比例固定,缺乏灵活性。可设置动态止盈止损。

5. 仅基于指标,容易产生假信号。可加入量价确认机制。

## 优化思路

1. 测试添加更多时间框架,如15分钟或60分钟。

2. 优化平滑异同平均线参数,提高灵敏度。

3. 加入移动止损策略,以控制风险。

4. 研究加入市场结构指标,避开震荡范围。 

5. 新增再入场条件,延长持仓周期。

## 总结

该策略利用多时间周期平滑异同平均线指标的优点实现趋势跟踪,但仅基于指标易产生假信号。可通过添加更多指标、止损策略、优化参数等方法进行改进,使策略更可靠。整体来说,多时间框架验证思路值得学习借鉴。

|| 

## Overview

This strategy uses Heiken Ashi candles across three timeframes to generate signals when all timeframes align bullish or bearish. It aims to confirm trend using multiple timeframes to reduce false signals.

## Principles

Heiken Ashi candles differ from regular candles by smoothing price action for easier trend identification.

The strategy employs daily, weekly and monthly Heiken Ashi candles. When all three align bullish, with green candles, long signal is generated. When all red candles, short signal is generated.

Exits when any timeframe flips direction after entry.

## Advantages  

1. Multi-timeframe confirmation reduces false signals and enhances robustness.

2. Heiken Ashi smooths noise to identify trend.

3. Simple straightforward rules easy to implement. 

4. Flexible timeframes adaptable to different products.

5. No parameter optimization required, very easy to use.

## Risks and Mitigations

1. Strict conditions may miss opportunities. Can relax condition requirements.

2. Heiken Ashi lag remains, potentially delaying signals. Can optimize with additional indicators.

3. No stop loss inability to control risk. Can add moving stop loss.

4. Fixed risk-reward lacks flexibility. Can implement dynamic stops. 

5. Indicator-only prone to false signals. Can add price-volume confirmation.

## Enhancement Opportunities

1. Test additional timeframes like 15m or 60m.

2. Optimize Heiken Ashi parameters for sensitivity.

3. Add moving stop loss for risk control.

4. Incorporate market structure indicators to avoid ranges.

5. Develop re-entry conditions to extend holding period.

## Summary

The strategy taps into Heiken Ashi across timeframes for trend following, but indicator-only design prone to false signals. Improvements can be made via additional indicators, stops, parameter optimization to make it more reliable. Overall the multi-timeframe confirmation is a useful concept.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|D|TM 1|
|v_input_2|W|TM 2|
|v_input_3|M|TM 3|
|v_input_4|true|longA|
|v_input_5|false|shortA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-03-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
args: [["v_input_5",true]]
*/

//@version=4
strategy("Heiken Ashi MTF Strategy")
ha_t = heikinashi(syminfo.tickerid)

res = input('D', title="TM 1")
ha_open = security(ha_t, res, open)
ha_close = security(ha_t, res, close)
ha_dif = ha_open-ha_close
ha_diff=iff(ha_dif > 0, 1, iff(ha_dif<0, 2, 3))

res2 = input('W', title="TM 2")
ha_open2 = security(ha_t, res2, open)
ha_close2 = security(ha_t, res2, close)
ha_dif2 = ha_open2-ha_close2
ha_diff2=iff(ha_dif2 > 0, 1, iff(ha_dif2<0, 2, 3))

res3 = input('M', title="TM 3")
ha_open3 = security(ha_t, res3, open)
ha_close3 = security(ha_t, res3, close)
ha_dif3 = ha_open3-ha_close3
ha_diff3=iff(ha_dif3 > 0, 1, iff(ha_dif3<0, 2, 3))

plot(15, title="TF1", color=iff(ha_diff==1, color.red, iff(ha_diff==2, color.green, color.white)), style=plot.style_circles, linewidth=5, join=true)
plot(14, title="TF2", color=iff(ha_diff2==1, color.red, iff(ha_diff2==2, color.green, color.white)), style=plot.style_circles, linewidth=5, join=true)
plot(13, title="TF3", color=iff(ha_diff3==1, color.red, iff(ha_diff3==2, color.green, color.white)), style=plot.style_circles, linewidth=5, join=true)


short = ha_diff ==1 and ha_diff2==1 and ha_diff3 ==1
long = ha_diff ==2 and ha_diff2==2 and ha_diff3 ==2

exitlong = ha_diff ==1 or ha_diff2==1 or ha_diff3 ==1
exitshort = ha_diff ==2 or ha_diff2==2 or ha_diff3 ==2

longA = input(true)
shortA = input(false)

if(longA)
    strategy.entry("long",1,when=long)
    strategy.close("long",when=exitlong)
if(shortA)
    strategy.entry("short",0,when=short)
    strategy.close("short",when=exitshort)
```

> Detail

https://www.fmz.com/strategy/427188

> Last Modified

2023-09-18 21:50:05
