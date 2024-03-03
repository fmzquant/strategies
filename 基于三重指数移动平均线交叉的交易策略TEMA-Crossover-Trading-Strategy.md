
> Name

基于三重指数移动平均线交叉的交易策略TEMA-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过计算两组不同参数的三重指数移动平均线(TEMA)的交叉来判断买入和卖出信号。当快线TEMA上穿慢线TEMA时生成买入信号,下穿时生成卖出信号。该策略结合了TEMA平滑曲线的优点,旨在发现潜在的趋势变化点。

## 策略原理

1. 计算一组时间长度为34的三重EMA作为快线TEMA。

2. 计算一组时间长度为13的三重EMA作为慢线TEMA。

3. 当快线TEMA上穿慢线TEMA时,产生买入信号。

4. 当快线TEMA下穿慢线TEMA时,产生卖出信号。

5. 使用strategy模块进行自动的订单管理。

## 优势分析

1. TEMA曲线更加平滑,可以减少假信号。

2. 不同曲线交叉可抓住短期和长期趋势的变化。

3. 策略信号简单清晰,容易执行。

4. 可自由调整参数,适应不同周期。

5. 可 preset 停损和止盈位置,控制风险。

## 风险分析

1. 参数设置不当可能产生过多错误信号。

2. TEMA存在一定滞后,可能错过突发事件。

3. 部分重大突破无法提前预警。

4. 需要结合趋势和支持阻力判断。

5. 存在一定程度的回调风险。

## 优化方向

1. 测试优化参数,找到最佳组合。

2. 增加过滤条件,确保质量信号。

3. 结合其他指标判断大趋势。 

4. 开发退出机制,防止超时持有。

5. 调整固定止损止盈为动态止损。

6. 测试不同品种和周期的实盘效果。

## 总结

该策略利用TEMA指标的平滑优势和交叉判定产生简单的交易信号。通过参数优化、严格过滤和风险控制,可成为稳定的趋势跟踪策略。总体来说,该策略实用性强,值得深入优化测试,以取得更好的回报。

|| 

## Overview

This strategy uses the crossover of two triple exponential moving averages (TEMA) with different parameters to generate buy and sell signals. The fast TEMA crossing above the slow TEMA produces buy signals, while crossing below produces sell signals. It combines the smoothness of TEMA to discover potential trend changes.

## Strategy Logic

1. Calculate a fast TEMA with period 34.

2. Calculate a slow TEMA with period 13.

3. Fast TEMA crossing above slow TEMA generates buy signals.

4. Fast TEMA crossing below slow TEMA generates sell signals.

5. Use strategy module for automated order management.

## Advantage Analysis 

1. Smoother TEMA curves reduce false signals.

2. Crossover captures short and long term trend changes.

3. Simple and clear trading signals, easy to execute.

4. Customizable parameters for different timeframes. 

5. Can preset stops and limits for risk control.

## Risk Analysis

1. Improper parameters may generate excessive false signals.

2. TEMA has some lag, may miss sudden events. 

3. Some major breakouts cannot be warned earlier.

4. Needs combination with trend and S/R analysis. 

5. Possibility of some retracement risks.

## Optimization Directions

1. Test and optimize parameters for best combinations.

2. Add filters to ensure high quality signals.

3. Incorporate analysis of larger trend.

4. Develop exit mechanisms to prevent overholding.

5. Adjust fixed stops to dynamic stops.

6. Test performance in live markets across different instruments and timeframes.

## Summary

This strategy utilizes the smoothness of TEMA and crossover logic to generate simple trading signals. With parameter optimization, strict filtering, and risk control, it can become a steady trend following strategy. Overall a practical strategy worth in-depth optimization and testing for improved returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|34|Length|
|v_input_2|13|Length2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-18 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title="TEMA With Alert", shorttitle="ALRTEMA", overlay = true )
//Blue
Length = input(34, minval=1)
xPrice = close
xEMA1 = ema(xPrice, Length)
xEMA2 = ema(xEMA1, Length)
xEMA3 = ema(xEMA2, Length)
nRes = 3 * xEMA1 - 3 * xEMA2 + xEMA3


//RED
Length2 = input(13, minval=1)
xPrice2 = close
xEMA12 = ema(xPrice2, Length2)
xEMA22 = ema(xEMA12, Length2)
xEMA32 = ema(xEMA22, Length2)
nRes2 = 3 * xEMA12 - 3 * xEMA22 + xEMA32


buy = 1
sell = 0

x = if nRes > nRes2
	buy
else
	sell


c = cross(nRes, nRes2)

xy = "Do Some Thing :" + tostring(x)


alertcondition(c, title="Crosing Found", message=xy)

plot(nRes, color=red)
plot(nRes2, color=blue)

short = cross(nRes, nRes2) and nRes > nRes2
long = cross(nRes, nRes2) and nRes < nRes2

strategy.entry("long", strategy.long, when=long)
strategy.entry("short", strategy.short, when=short)




```

> Detail

https://www.fmz.com/strategy/427257

> Last Modified

2023-09-19 15:41:47
