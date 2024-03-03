
> Name

动态止损随ATR波动自适应的动量敲入策略Dynamic-Stop-Loss-Strategy-Adaptive-to-ATR-Fluctuations

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略结合了动量指标随机指标K值以及波动率指标ATR,根据ATR的值来动态调整K值的止损线和入场线,实现了根据市场波动率自动调整止损线和入场线的思想。

## 策略原理

1. 计算长度为len的K值sma(stoch(close, high, low, len), smoothK),代表随机指标K值。

2. 计算长度为len的ATR值atr(len)。 

3. 根据ATR值绘制止损线plot(rsi(atr, len)+lowLine, ..., title = "low line")和入场线plot(rsi(atr, len)*-1+100-lowLine, ..., title = "up line")。

4. 判断K值何时突破入场线crossover(k,up line)和止损线crossunder(k,low line),产生买入和卖出信号。

5. 绘制买入卖出的背景颜色。

6. 以上信号满足时进行买入卖出操作并设置止损。

## 策略优势分析

1. 该策略根据市场的波动率ATR来动态调整止损线和入场线,可以根据市场波动率自动适应调整止损风险。

2. 当市场波动较大时,止损线和入场线间距拉大,可以避免止损被震出。

3. 当市场波动平静时,止损线和入场线间距收窄,可以及时止损。

4. 利用动量指标K值判定入场和出场。K值能反应价格变化速度,能捕捉转折点。 

5. 结合动量指标和波动率指标,既可以捕捉趋势,又可以根据波动自动调整风险。

## 策略风险分析

1. K值容易产生虚假突破,可能引发不必要的交易信号。可以适当调整K值参数smoothK来平滑K线。

2. ATR参数len设置过大,止损线和入场线间距过大,风险可能过高。可以测试不同len参数的稳定性。

3. 纯跟踪止损无法确定止损位置是否合理,无法控制单次止损风险。可以考虑结合期望止损算法,控制单次止损风险。

4. 策略信号频繁,交易费用较高。可以适当调整入场线参数lowLine,控制交易频率。

## 策略优化方向  

1. 测试调整K值参数smoothK,找到平滑K值的最优参数组合。

2. 测试ATR参数len的不同取值,确定合适的ATR参数。

3. 优化入场线参数lowLine,找到最优参数以控制交易频率。

4. 考虑结合其它指标过滤入场信号,避免虚假突破。如结合交易量指标,KDJ指标等。

5. 考虑优化止损方式,改进为期望止损,能主动控制止损风险。

## 总结

该策略基于动量指标K值和波动率指标ATR实现了动态调整止损线和入场线的思路,既可以捕捉趋势又可以根据波动自动调整风险,是一种非常创新和实用的策略思路。通过参数优化,改进止损方式等进一步优化,可以使策略更稳定可靠,具有非常好的发展前景。

||


## Overview

This strategy combines the momentum indicator Stochastic K value and the volatility indicator ATR to dynamically adjust the stop loss line and entry line based on ATR values, realizing the idea of automatically adjusting stop loss and entry lines according to market volatility.

## Strategy Logic

1. Calculate K value sma(stoch(close, high, low, len), smoothK) with length len, representing Stochastic K value.

2. Calculate ATR value atr(len) with length len.

3. Plot stop loss line plot(rsi(atr, len)+lowLine, ..., title = "low line") and entry line plot(rsi(atr, len)*-1+100-lowLine, ..., title = "up line") based on ATR value. 

4. Determine entry and exit signals when K value crosses over entry line crossover(k,up line) and stop loss line crossunder(k,low line).

5. Plot background colors for buy and sell signals.

6. Execute trades and set stop loss when above signals triggered.

## Advantage Analysis

1. The strategy dynamically adjusts stop loss and entry lines based on market volatility ATR, which automatically adapts stop loss risk according to market volatility.

2. When market volatility is high, the distance between stop loss and entry lines increases to avoid being stopped out by fluctuations.

3. When market volatility is low, the distance between stop loss and entry lines narrows to timely stop loss.

4. Using momentum indicator K values to determine entries and exits. K values reflect price change speed and catch turning points.

5. Combining momentum and volatility indicators can capture trends and automatically adjust risks based on fluctuations.

## Risk Analysis

1. K values may have false breakouts, causing unnecessary trading signals. Can smooth K lines by adjusting smoothK parameter.

2. If ATR parameter len is too large, the distance between stop loss and entry lines becomes too big with high risk. Can test stability of different len parameters.  

3. Pure trailing stop loss cannot determine if stop loss position is appropriate and fails to control single stop loss risk. Can consider expected stop loss to control single stop loss risk.

4. Frequent strategy signals lead to high trading costs. Can adjust entry line parameter lowLine to control trading frequency.

## Optimization Directions

1. Test and adjust smoothK parameter to find optimal smooth K value parameter combinations.

2. Test different values of ATR parameter len to determine appropriate ATR parameters.

3. Optimize entry line parameter lowLine to find optimal parameters to control trading frequency. 

4. Consider combining other indicators to filter entry signals and avoid false breakouts, such as trading volume indicators, KDJ indicators, etc.

5. Consider optimizing stop loss methods, improving to expected stop loss to actively control stop loss risk.

## Summary  

The strategy realizes the idea of dynamically adjusting stop loss and entry lines based on momentum indicator K values and volatility indicator ATR. It can capture trends and automatically adjust risks based on fluctuations, which is very innovative and practical. Further optimizations like parameter tuning, improving stop loss methods can make the strategy more stable and reliable, with great development prospects.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|34|Length for Main Stochastic & ATR|
|v_input_2|2|SmoothK for Main Stochastic|
|v_input_3|10|Multiplier for up/low lines|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-08 00:00:00
end: 2023-10-08 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Stoch + ATR", overlay=false, pyramiding = 0, calc_on_order_fills = false, commission_type =  strategy.commission.percent, commission_value = 0.0454, default_qty_type = strategy.percent_of_equity, default_qty_value = 100)

len = input(34, minval=1, title="Length for Main Stochastic & ATR") 
smoothK = input(2, minval=1, title="SmoothK for Main Stochastic")
lowLine = input(10, minval=-50, maxval=50, title="Multiplier for up/low lines")

//Stoch formula
k = sma(stoch(close, high, low, len), smoothK)
plot(k, color=aqua, title = "Stoch")

//len=input
atr=atr(len)
plot(rsi(atr, len)+lowLine , color=red,linewidth=2, title = "low line")
plot(rsi(atr, len)*-1+100-lowLine, color=lime,linewidth=2, title = "up line")

aboveLine = crossunder(k,(rsi(atr, len)+lowLine))? 1 : 0
belowLine = crossover(k,(rsi(atr, len)*-1+100-lowLine))? 1 : 0

aboveLine2 = crossover(k,(rsi(atr, len)+lowLine))? 1 : 0
belowLine2 = crossunder(k,(rsi(atr, len)*-1+100-lowLine))? 1 : 0

skip=(aboveLine2==1 or belowLine2==1) and (aboveLine==1 or belowLine==1)? 1 : 0

//BackGroound Color Plots
plotchar(belowLine==1 and skip==0, title="Buy Signal", char='B', location=location.bottom, color=white, transp=0, offset=0)
plotchar(aboveLine==1 and skip==0, title="Sell Signal", char='S', location=location.top, color=white, transp=0, offset=0)
plotchar(belowLine2==1 and skip==0, title="Close Signal", char='C', location=location.bottom, color=white, transp=0, offset=0)
plotchar(aboveLine2==1 and skip==0, title="Close Signal", char='C', location=location.top, color=white, transp=0, offset=0)

bgcolor(aboveLine==1 ? red : na, transp=30, title = "sell signal")
bgcolor(belowLine==1 ? lime : na, transp=30, title = "buy signal")

bgcolor(aboveLine2==1 ? lime : na, transp=80, title = "close short")
bgcolor(belowLine2==1 ? red : na, transp=80, title = "close long")

bgcolor(skip==1 ? black : na, transp=0, title = "skip signal")

//strategy
longCondition = belowLine==1
shortCondition = aboveLine==1

strategy.entry("BUY", strategy.long, when = longCondition)
strategy.entry("SELL", strategy.short, when = shortCondition)
strategy.cancel_all(when = skip==1)




```

> Detail

https://www.fmz.com/strategy/428794

> Last Modified

2023-10-09 15:30:29
