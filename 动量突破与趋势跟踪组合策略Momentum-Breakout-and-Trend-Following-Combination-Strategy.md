
> Name

动量突破与趋势跟踪组合策略Momentum-Breakout-and-Trend-Following-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1ba999b62ba76dac6f9.png)

[trans]

## 概述

该策略是一个组合策略,结合了动量指标、趋势跟踪指标以及均线指标,实现了趋势跟踪与突破买入/卖出。主要通过 Stochastic 指标与 Supertrend 指标的组合判断买入/卖出时机,辅以 EMA 均线判断市场主要趋势。

## 策略原理

该策略主要由以下几部分指标组成:

1. EMA 均线:使用 EMA 25、50、100 和 200 四条均线判断主要趋势。EMA25 上穿 EMA50 且 EMA100 上穿 EMA200 时为上升趋势,否则为下降趋势。

2. Supertrend 趋势跟踪指标:参数为 Factor 3和 ATR 10,判断当前价格是否处于上升或下降趋势中。当 Supertrend 为绿色时为上升趋势,红色为下降趋势。

3. Stochastic 动量指标:%K 8 和 %D 3,判断Stochastic 是否产生金叉或死叉现象。当 %K 线从下方上穿 %D 线时为金叉信号,反之死叉信号。

买入策略为:EMA 显示上升趋势 + Supertrend 显示上升趋势 + Stochastic 金叉时机。
卖出策略为:EMA 显示下降趋势 + Supertrend 显示下降趋势 + Stochastic 死叉时机。

该策略综合了趋势、动量和突破三个指标,能比较可靠地判断市场走势与买卖点。

## 优势分析

该策略主要具有以下优势:

1. 结合多种指标,判断力较强,可以有效过滤假突破。

2. 动量指标的加入可以提早判断转折点。

3. 可自定义参数,适用于不同市场环境。

4. 实现了相对高效的止损与止盈设置。

5. 可以在高周期如日线进行回测,效果较好。

## 风险分析

该策略也存在一些风险:  

1. 参数设置不当可能导致交易频繁或信号不稳定。需要对参数调优。

2. 在择时上仍有可能出现误判的情况。可以考虑加入更多滤波指标。

3. 止损点设置为 Stochastic 指标的极值点,可能会过于靠近,可以考虑适当放宽。

4. 回测数据不足,可能对参数拟合产生影响,应扩大回测周期。

## 优化方向  

该策略可以从以下几个方向进行优化:

1.测试更多参数组合,找到最优参数。如调整 Supertrend 的 Factor 参数等。

2.加入更多滤波指标,如能量指标、波动率指标等,减少误判概率。 

3.可以测试不同的止损方式,如在极值点一定百分比设置止损线等。

4.优化止盈方式,如考虑动态止盈,以锁定更多利润。

5.扩大策略适用范围,如尝试适配更多交易品种,或尝试在更高周期使用。

## 总结

该策略整体思路清晰,指标选择合理,实现了趋势跟踪与突破交易,回测效果较好。但仍有优化空间存在,通过参数调整、加入更多滤波指标、改进止损止盈方式等进行多方位优化,可以使策略更加稳定可靠。

||

## Overview  

This strategy is a combination strategy that integrates momentum indicators, trend following indicators and moving average indicators to realize trend following and breakout entry/exit. It mainly uses the combination of Stochastic indicator and Supertrend indicator to determine entry/exit timing, and uses EMA lines to judge the main market trend.

## Strategy Principle

The strategy consists of the following indicators:  

1. EMA lines: Use EMA 25, 50, 100 and 200 to determine the main trend. When EMA25 crosses above EMA50 and EMA100 crosses above EMA200, it is an upward trend, otherwise it is a downward trend.

2. Supertrend trend following indicator: Parameters are Factor 3 and ATR 10 to judge whether the current price is in an uptrend or a downtrend. When Supertrend is green, it is an uptrend. When it is red, it is a downtrend.

3. Stochastic momentum indicator: %K 8 and %D 3 to determine if Stochastic generates golden cross or dead cross. When %K line crosses %D line from below, it is a golden cross signal, and vice versa for dead cross.

The buy strategy is: EMA shows uptrend + Supertrend shows uptrend + Stochastic golden cross.  
The sell strategy is: EMA shows downtrend + Supertrend shows downtrend + Stochastic dead cross.

This strategy integrates trend, momentum and breakout indicators to reliably determine market moves and trading points.  

## Advantage Analysis   

The main advantages of this strategy are:

1. Combining multiple indicators improves robustness and filters out fake breakouts effectively.  

2. Adding momentum indicator can early spot turning points.

3. Customizable parameters suit different market environments.  

4. Realizes relatively efficient stop loss and take profit setting.

5. Works well when backtested on high timeframes like daily.

## Risk Analysis

There are also some risks:

1. Improper parameter settings may cause too frequent trading or unstable signals. Parameters need to be optimized.

2. There can still be misjudgements in timing. More filter indicators may be added.  

3. Stop loss set on Stochastic extremes may be too close. Wider stop is worth testing.

4. Insufficient backtest data may cause bias in parameter fitting. Expand backtest period.

## Optimization Directions

The strategy can be optimized in the following ways:

1. Test more parameter sets to find optimum. E.g. adjust Supertrend Factor.

2. Add more filter indicators like energy or volatility to reduce misjudgements.

3. Test different stop loss ways, e.g. percentage-based stop loss.

4. Optimize take profit, like trailing stop to lock in more profits.  

5. Expand scope, adapt to more products or higher timeframes.

## Conclusion  

The strategy's logic is clear and indicator selection reasonable. It realizes trend following and momentum breakout trading with good backtest results. But there is still room for optimization, e.g. parameter tuning, adding filters, improving stops and profit taking. Multi-dimensional optimization can make the strategy more robust.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|1.5|P/L|
|v_input_2|true|Loss Percentage|
|v_input_3|10|ATR Length|
|v_input_4|3|Supertrend Factor|
|v_input_5|8|%K Length|
|v_input_6|3|%K Smoothing|
|v_input_7|3|%D Smoothing|
|v_input_8|25|EMA 1 Length|
|v_input_9|50|EMA 2 Length|
|v_input_10|100|EMA 3 Length|
|v_input_11|200|EMA 4 Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-05 00:00:00
end: 2023-12-06 07:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Supertrend + Stoch Strategy", overlay=true)

// ---inputs---
pl = input(1.5, title="P/L", minval=0.1)
lossPercentage = input(1, title="Loss Percentage", minval=1, maxval=100)
atrPeriod = input(10, "ATR Length")
factor = input(3, "Supertrend Factor")
periodK = input(8, title="%K Length", minval=1)
smoothK = input(3, title="%K Smoothing", minval=1)
periodD = input(3, title="%D Smoothing", minval=1)
ema1l = input(25, title="EMA 1 Length", minval=1)
ema2l = input(50, title="EMA 2 Length", minval=1)
ema3l = input(100, title="EMA 3 Length", minval=1)
ema4l = input(200, title="EMA 4 Length", minval=1)

// ---lines---
ema1 = ema(close, ema1l)
ema2 = ema(close, ema2l)
ema3 = ema(close, ema3l)
ema4 = ema(close, ema4l)
trendUpper = ema1 > ema2 and ema3 > ema4
trendLower = ema1 < ema2 and ema3 < ema4

[supertrend, direction] = supertrend(factor, atrPeriod)
supertrendUpper = direction < 0
supertrendLower = direction > 0

k = sma(stoch(close, high, low, periodK), smoothK)
d = sma(k, periodD)
stochCrossOver = crossover(k, d)
stochCrossUnder = crossunder(k, d)

// ---plot---
plot(ema1, color=color.green)
plot(ema2, color=color.orange)
plot(ema3, color=color.blue)
plot(ema4, color=color.purple)

bodyMiddle = plot((open + close) / 2, display=display.none)
upTrend = plot(direction < 0 ? supertrend : na, "Up Trend", color = color.green, style=plot.style_linebr)
downTrend = plot(direction < 0 ? na : supertrend, "Down Trend", color = color.red, style=plot.style_linebr)
fill(bodyMiddle, upTrend, color.new(color.green, 95), fillgaps=false)
fill(bodyMiddle, downTrend, color.new(color.red, 95), fillgaps=false)

// ---stop place compute---
edge = 0.  // periodly high/low
edge := stochCrossOver ? high : stochCrossUnder ? low : k > d ? max(edge[1], high) : k < d ? min(edge[1], low) : edge[1]

// plot(edge)

// ---trade condition---
// longCond = trendUpper and supertrendUpper and stochCrossOver
// shortCond = trendLower and supertrendLower and stochCrossUnder
longCond = trendUpper and supertrendUpper and stochCrossOver and strategy.position_size == 0
shortCond = trendLower and supertrendLower and stochCrossUnder and strategy.position_size == 0

// ---stop & take---
stop = 0.
stop := nz(stop[1], stop)
take = 0.
take := nz(take[1], take)

if longCond
    stop := edge[1]
    take := close + (close - stop) * pl
if shortCond
    stop := edge[1]
    take := close - (stop - close) * pl

// ---trade---
qty = strategy.equity / abs(stop - close) / 100 * lossPercentage

strategy.entry("Buy", strategy.long, when=longCond, qty=qty)
strategy.exit("Close Buy","Buy", limit=take, stop=stop)

strategy.entry("Sell", strategy.short, when=shortCond, qty=qty)
strategy.exit("Close Sell","Sell", limit=take, stop=stop)

stopLine = plot(strategy.position_size != 0 ? stop : na, color=color.red, style=plot.style_linebr)
takeLine = plot(strategy.position_size != 0 ? take : na, color=color.green, style=plot.style_linebr)
entryLine = plot(strategy.position_size != 0 ? strategy.position_avg_price : na, color=color.blue, style=plot.style_linebr)
fill(entryLine, stopLine, color.new(color.red, 90), fillgaps=false)
fill(entryLine, takeLine, color.new(color.green, 90), fillgaps=false)
```

> Detail

https://www.fmz.com/strategy/435266

> Last Modified

2023-12-13 16:41:25
