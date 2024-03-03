
> Name

月度趋势突破策略Monthly-Trend-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/106a0a3b55b4b738b3e.png)

[trans]

## 概述

月度趋势突破策略是一个基于pine脚本的TradingView指标。该策略利用自适应移动平均线、趋势线突破以及RSI指标的组合,确定每月仅一次的多头入场时机。当RSI指标显示超买时,平仓退出。

## 策略原理

1. 定义变量lastEntryMonth记录上一个入场月份。currentMonth获得当前月份。

2. 设置TRAMA自适应移动平均线参数length=99,来平滑价格并判断趋势方向。

3. 设置参数length_trend=14,绘制高点的趋势线upper。当价格上穿趋势线时,判断为突破。 

4. 计算RSI指标参数rsiLength=14,判断超买超卖。

5. 入场逻辑:当收盘价高于TRAMA,并且收盘价突破上轨时,若上月未入场,则做多入场。

6. 出场逻辑:当RSI大于70时,平仓。

7. 绘制TRAMA曲线、RSI的超买线,完成策略。

该策略综合了三大主流技术指标,判断趋势、momentum和超买超卖情况,寻找每月仅一次的较低风险做多机会。同时,限制只有价格突破上升趋势才入场,避免在盘整区间无效操作。

## 优势分析

1. 多种指标组合,综合判断市场状态,提高决策的准确性。

2. 只在月度时间框架突破时入场,避免频繁交易。

3. 利用自适应移动平均线判断趋势方向,能快速捕捉转折。

4. 结合超买指标避开市场高位,有效控制风险。

5. 简单直观的入场出场条件,容易掌握。

6. 可根据自身需要调整参数,获得更好的策略优化。

## 风险分析

1. 突破失败带来的whipsaw风险。入场后价格再次跌破上轨,可能造成损失。

2. 趋势突破时点选择不佳,对应会选择到顶部附近高位入场。

3. 指标参数设置不当,导致指标产生误导信号。

4. 突破仅 Reflect recent market volatility. Consider adaptive stops/position sizing.

5. Monitor risk/reward. Consider only trading pullbacks or adding other confirmation filters.

6. Validate indicators on multiple timeframes. Use higher timeframes to identify trend and lower for entry.

7. Backtest over different market conditions. Optimize parameters to match strategy to market type.

## 优化方向

1. 添加Volume,MA成交量指标的确认,避免低量的假突破。

2. 在RSI超买平仓时,考虑部分利润止损,留余下持仓。

3. 优化移动平均线参数,自适应变化,更好跟踪趋势转换。

4. 在突破点前后设立区间,避免直接在转折点高位入场。

5. 增加更多过滤条件,如通道指标、波动率指标等,提高决策准确性。

6. 分级入场,价格继续突破新增阻力线时,可加仓。

## 总结

月度趋势突破策略综合考虑了趋势、能量和极限状况等多种因素。它在月线时间框架判断趋势方向,并结合更低时间框架的突破执行入场。同时,运用RSI指标有效控制交易风险。该策略以简单的逻辑寻找每月一次较优做多机会。它既考虑趋势跟踪,也重视风险管理。通过参数优化,可针对不同市场环境进行调整。总体来说,月度趋势突破策略是一个既简单实用,又注重风险控制的交易策略。

|| 

## Overview

The Monthly Trend Breakout Strategy is a TradingView indicator based on Pine Script. It combines an adaptive moving average, trendline breakouts and the RSI indicator to determine long entry signals once per month. Exits occur when the RSI shows overbought conditions.

## Strategy Logic

1. Define variable lastEntryMonth to track last entry month. currentMonth gets current month.

2. Set TRAMA adaptive MA parameters length=99 to smooth price and determine trend.

3. Set length_trend=14 to plot trendline upper based on pivot highs. Long when price breaks above trendline.

4. Calculate RSI indicator with rsiLength=14 to determine overbought/oversold. 

5. Entry logic: Go long if close > TRAMA and close breaks above upper trendline, if no entry last month.

6. Exit logic: Close long if RSI > 70 (overbought).

7. Plot TRAMA line and RSI overbought level 70.

The strategy combines 3 major technical indicators to find low risk long entries once per month. Entries are limited to trend breaks only, avoiding whipsaws in ranges.

## Advantages

1. Combines multiple indicators for robust market analysis and higher accuracy.

2. Limits entries to monthly timeframe, avoiding overtrading.

3. Adaptive MA quickly adapts to trend changes.

4. Oversold RSI avoids buying at market tops and controls risk.

5. Simple entry/exit rules are easy to implement.

6. Customizable parameters allow strategy optimization.

## Risks

1. Whipsaw risk if breakout fails. Stop loss if price breaks back below trendline.

2. Poor timing leads to entries near tops.

3. Bad indicator parameters cause misleading signals. 

4. Breakouts may Reflect recent market volatility. Consider adaptive stops/position sizing.

5. Monitor risk/reward. Consider only trading pullbacks or adding other confirmation filters.

6. Validate indicators on multiple timeframes. Use higher timeframes to identify trend and lower for entry. 

7. Backtest over different market conditions. Optimize parameters to match strategy to market type.

## Optimization

1. Add volume indicator to avoid false breakouts with low volume.

2. Consider partial profit taking on RSI overbought exit, keeping partial position.

3. Optimize MA parameters to better adapt to trend changes. 

4. Add zones before/after breakout point to avoid buying right at reversal.

5. Add more filters like channels, volatility for higher accuracy.

6. Scale in with additional breakouts at new resistance levels.

## Conclusion

The Monthly Trend Breakout Strategy analyzes trend, momentum and extremes. It determines trend on monthly timeframe but enters on shorter timeframe breakouts. RSI oversees risk management. Simple logic identifies optimized monthly long entries. It balances trend following and risk controls. Parameter optimization adapts it to different market conditions. Overall, this is a simple yet robust strategy combining usability and effective risk management.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|99|length_trama|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-17 00:00:00
end: 2023-10-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy('Bannos Strategy', shorttitle='Bannos', overlay=true)

//The provided script is an indicator for TradingView written in Pine Script version 5. The indicator is used to determine entry and exit points for a trading strategy. Here's a detailed breakdown of what the script does:

// Strategy Definition:

// Bannos Strategy is the full name, with a short title Bannos.
// The overlay=true option indicates that the strategy will be overlayed on the price chart.
// Tracking Entry Month:

// A variable lastEntryMonth is set up to track the month of the last entry.
// currentMonth identifies the current month.
// Trend Regularity Adaptive Moving Average (TRAMA):

// It takes an input of length 99 as default.
// It uses adaptive calculations to track trend changes.
// Trendlines with Breaks:

// Identifies local peaks over a given period (in this case, 14) and calculates a slope based on these peaks.
// Relative Strength Index (RSI):

// Uses a length of 14 (default) to calculate the RSI.
// RSI is an oscillation indicator that indicates overbought or oversold conditions.
// Strategy Logic for Long Entry:

// A long position is opened if:
// The close price is above the TRAMA.
// There's a crossover of the close price and the upper trendline.
// The position is taken only once per month.
// Strategy Logic for Long Exit:

// The long position is closed if the RSI exceeds 70, indicating an overbought condition.
// Plotting:

// The TRAMA is plotted in red on the chart.
// A horizontal line is also drawn at 70 to indicate the RSI's overbought zone.
// In summary, this strategy aims to enter a long position when certain trend and crossover conditions are met, and close the position when the market is considered overbought as per the RSI. Additionally, it ensures entries only occur once a month.
//



// Variable pour suivre le mois de la dernière entrée
var float lastEntryMonth = na
currentMonth = month(time)

// Parameters for Trend Regularity Adaptive Moving Average (TRAMA)
length_trama = input(99)
src_trama = close
ama = 0.
hh = math.max(math.sign(ta.change(ta.highest(length_trama))), 0)
ll = math.max(math.sign(ta.change(ta.lowest(length_trama)) * -1), 0)
tc = math.pow(ta.sma(hh or ll ? 1 : 0, length_trama), 2)
ama := nz(ama[1] + tc * (src_trama - ama[1]), src_trama)

// Parameters for Trendlines with Breaks
length_trend = 14
mult = 1.0
ph = ta.pivothigh(length_trend, length_trend)
upper = 0.
slope_ph = 0.
slope_ph := ph ? mult : slope_ph
upper := ph ? ph : upper - slope_ph

// Parameters for RSI
rsiLength = 14
up = ta.rma(math.max(ta.change(close), 0), rsiLength)
down = ta.rma(-math.min(ta.change(close), 0), rsiLength)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))

// Strategy Logic for Long Entry
longCondition = close > ama and ta.crossover(close, upper) and (na(lastEntryMonth) or lastEntryMonth != currentMonth)
if (longCondition)
    lastEntryMonth := currentMonth
    strategy.entry('Long', strategy.long)

// Strategy Logic for Long Exit
exitCondition = rsi > 70
if (exitCondition)
    strategy.close('Long')

// Plotting
plot(ama, 'TRAMA', color=color.red)
hline(70, 'Overbought', color=color.red)

```

> Detail

https://www.fmz.com/strategy/430051

> Last Modified

2023-10-24 16:08:33
