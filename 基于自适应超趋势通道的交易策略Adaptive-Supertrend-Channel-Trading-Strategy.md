
> Name

基于自适应超趋势通道的交易策略Adaptive-Supertrend-Channel-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过构建双层超趋势通道,结合价格突破通道进行交易信号产生。同时利用价格波动率调整通道宽度,实现自适应效果。属于趋势跟踪类策略。

## 策略原理

1. 计算价格的标准差和波动率ATR,根据波动率调整超趋势通道的宽度。

2. 构建双层超趋势通道,内层通道更为灵敏,外层通道更稳定。

3. 当价格突破内层或外层超趋势通道时,产生买入或卖出信号。

4. 采用双层通道结构,可以过滤掉部分假突破。

5. 波动率ATR用于调整通道宽度,当波动加大时通道宽度增加,实现自适应效果。

## 优势分析

1. 超趋势通道简单易用,可以较好跟踪趋势。

2. 双层通道结构可以提高信号质量,过滤假突破。

3. 波动率自适应调整通道宽度,使通道更符合不同市场环境。

4. 易于实施,参数调整也较为简单。

5. 可视化通道及突破情况,形成直观的交易信号。

## 风险分析

1. 突破信号可能出现误判,导致不必要的亏损。

2. 无法判断趋势方向,存在逆势交易风险。

3. 自适应调整可能过于灵敏,调整幅度过大。

4. 参数优化不当可能导致过度优化。

5. 作为趋势追踪策略,uddle行情下容易获利不足或亏损。

## 优化方向

1. 测试不同参数对通道自适应效果的影响。

2. 尝试结合均线等指标判断大趋势方向。

3. 优化突破确认机制,避免假突破。

4. 添加止损策略,控制单笔亏损。

5. 评估调整通道参数对交易频率的影响。

6. 可以通过机器学习算法动态优化参数。

## 总结

该策略使用双层自适应超趋势通道捕捉价格趋势。优点是简单直观,可以有效跟踪趋势。但也存在一些突破误判和趋势判断错误的风险。通过参数优化以及配套机制的补充,可以进一步改进策略效果,将其打造成一个稳定高效的趋势追踪系统。

||


## Overview

This strategy builds double-layer supertrend channels and generates trading signals when price breaks through the channels. It also adapts channel width using price volatility for adaptive effect. It belongs to trend following strategies.

## Strategy Logic

1. Calculate price standard deviation and volatility ATR, use volatility to adjust channel width.

2. Build double-layer supertrend channels, with inner layer more sensitive and outer layer more stable. 

3. Generate buy/sell signals when price breaks inner or outer channel.

4. The double channel structure helps filter some false breakouts.

5. ATR volatility adapts channel width, wider when volatility surges for adaptive effect.

## Advantages

1. Supertrend channels are simple and effective in tracking trends.

2. The double channel filters false breakouts and improves signal quality.

3. Volatility adaptive adjustment makes the channels fit different market environments.

4. Easy to implement with simple parameter tuning.

5. Visualized channels and breakouts form intuitive trading signals.

## Risks

1. Breakout signals may produce false signals resulting in unnecessary losses.

2. It fails to determine trend direction, risks of counter-trend trading.

3. Adaptive adjustment may be too sensitive, with over-adjustments.

4. Improper parameter optimization leads to overfitting.

5. As a trend following strategy, it struggles in range-bound markets.

## Enhancement

1. Test parameters' impacts on adaptive effect.

2. Incorporate MA to determine major trends. 

3. Optimize breakout confirmation to avoid false breakouts.

4. Add stop loss to limit loss per trade.

5. Evaluate channel tuning on trading frequency.

6. Use machine learning to dynamically optimize parameters.

## Conclusion

This strategy uses adaptive double supertrend channels to capture price trends. It is simple and intuitive in tracking trends. But risks include false breakouts and incorrect trend direction. Further parameter tuning and supplementary mechanisms can improve strategy performance, making it a robust trend following system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Multiplier|
|v_input_2|10|Period|
|v_input_3|false|Self-Adjusting|
|v_input_4|true|From Day|
|v_input_5|true|From Month|
|v_input_6|2019|From Year|
|v_input_7|true|To Day|
|v_input_8|true|To Month|
|v_input_9|2020|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("SuperTrend Cloud Strategy", shorttitle="SuperTrend Cloud Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, initial_capital = 1000)

//Inputs
multi = input(title="Multiplier", type=input.float, step=0.1, defval=3, minval=1)
period = input(title="Period", type=input.integer, step=1, defval=10, minval=1)
SelfAdjust = input(title="Self-Adjusting", type=input.bool, defval = false)


////////////////////////////////////////////////////////////////////////////////
// BACKTESTING RANGE
 
// From Date Inputs
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2019, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2020, title = "To Year", minval = 1970)
 
// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true
 
////////////////////////////////////////////////////////////////////////////////

dev = stdev(close, period)
stdDev = (dev / close) * 100 + 1
MultDev = SelfAdjust ? multi * stdDev : multi

up_lev1 = hl2 - MultDev * atr(period)
dn_lev1 = hl2 + MultDev * atr(period)
up_lev2 = hl2 - (MultDev * 2 * atr(period))
dn_lev2 = hl2 + (MultDev * 2 * atr(period))

up_trend1 = 0.0
up_trend1 := close[1] > up_trend1[1] ? max(up_lev1, up_trend1[1]) : up_lev1
up_trend2 = 0.0
up_trend2 := close[1] > up_trend2[1] ? max(up_lev2, up_trend2[1]) : up_lev2

down_trend1 = 0.0
down_trend1 := close[1] < down_trend1[1] ? min(dn_lev1, down_trend1[1]) : dn_lev1
down_trend2 = 0.0
down_trend2 := close[1] < down_trend2[1] ? min(dn_lev2, down_trend2[1]) : dn_lev2

trend1 = 0
trend1 := close > down_trend1[1] ? 1: close < up_trend1[1] ? -1 : nz(trend1[1], 1)
trend2 = 0
trend2 := close > down_trend2[1] ? 1: close < up_trend2[1] ? -1 : nz(trend2[1], 1)

st_line1 = trend1 == 1 ? up_trend1 : down_trend1
st_line2 = trend2 == 1 ? up_trend2 : down_trend2

// Plotting
plot1 = plot(st_line1, color = trend1 == 1 ? color.green : color.red , style = plot.style_line, linewidth = 1, title = "SuperTrend 1")
plot2 = plot(st_line2, color = trend2 == 1 ? color.green : color.red , style = plot.style_line, linewidth = 1, title = "SuperTrend 2")
fill(plot1, plot2, color = color.aqua, title = "Cloud")

buy = crossover(close, st_line1) and close > st_line2 or crossover(close, st_line2) and close > st_line1
sell = crossunder(close, st_line1) and close < st_line2 or crossunder(close, st_line2) and close < st_line1

if(buy and time_cond)
    strategy.entry("long", long = true , comment="long")

if (close < st_line1 and time_cond or close < st_line2 and time_cond)
    strategy.close("long")
    
if (not time_cond)
    strategy.close_all()





 

```

> Detail

https://www.fmz.com/strategy/427382

> Last Modified

2023-09-20 15:17:51
