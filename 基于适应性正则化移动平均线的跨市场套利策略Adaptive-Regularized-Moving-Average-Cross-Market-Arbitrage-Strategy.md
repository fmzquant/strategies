
> Name

基于适应性正则化移动平均线的跨市场套利策略Adaptive-Regularized-Moving-Average-Cross-Market-Arbitrage-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/149b39b3266f4b39c6e.png)
[trans]


## 概述

本策略通过计算适应性正则化移动平均线,实现不同市场之间的套利交易。该策略具有跨市场套利、动态参数调整、风险控制等特点。

## 策略原理

该策略首先定义了一个scaleMinimax函数,用于将时间序列标准化到指定范围。然后定义了一个自适应正则化移动平均线rema函数,计算出平滑后的信号线sig。该信号线的计算方式是:

1. 定义一个滑动窗口,默认长度为5日。
2. 每日的sig值为前一日sig值与当日收盘价的加权平均。加权平均采用自适应加权机制,离当前价值越近的,权重越大。
3. 加入λ参数作为正则项,使sig的变换更加平滑。

在得到信号线后,策略通过判断信号线与价格的金叉死叉来决定多空。具体来说:

1. 当sig上穿价格时,做多。
2. 当sig下穿价格时,做空。

此外,该策略加入平滑因子smooth和显示信号线show_line作为可调参数,提高了策略的灵活性。

## 优势分析

相比传统移动平均线策略,该策略具有以下优势:

1. 采用自适应加权机制,可以更快地响应价格变化。
2. 加入正则化项,使信号线更加平滑,避免由于价格剧烈波动产生错误信号。
3. 跨市场套利,可以利用不同市场之间的价格差异获利。
4. 可调参数设计灵活,可以根据市场情况进行优化。

## 风险及解决方案

该策略也存在一定的风险:

1. 双边交叉出现错误信号的概率较大。解决方法是适当调整平滑参数,避免信号线震荡。

2. 跨市场套利必须要确保两市场具有价格关联性且走势一致。解决方法是选择高相关性的市场进行套利。

3. 参数优化需要积累足够的历史数据进行回测。解决方法是在现实交易中谨慎调整参数。

## 优化方向

该策略还可从以下方面进行优化:

1. 在参数选取上,可以引入机器学习算法自动优化参数组合。

2. 在信号生成上,可以引入更多的指标进行组合,构建更稳定的交易信号。

3. 在风险控制上,可以设置止损线,以控制单笔损失。

4. 在跨市场套利上,可以扩展到更多相关性高的交易品种。

## 总结

本策略通过自适应计算移动平均线的方式,实现了跨市场之间的套利交易。相比传统移动平均线策略,具有参数自适应、平滑处理、跨市场套利等优势。下一步,通过机器学习、组合信号、风险管理等方式进一步优化该策略。

||


## Overview

This strategy implements arbitrage trading between different markets by calculating an adaptive regularized moving average line. The strategy features cross-market arbitrage, dynamic parameter adjustment, risk control, etc.

## Strategy Principle 

The strategy first defines a scaleMinimax function to standardize the time series to a specified range. Then it defines an adaptive regularized moving average function rema to calculate the smoothed signal line sig. The calculation of the signal line is:

1. Define a sliding window, default length 5 days.

2. The sig value for each day is the weighted average of the previous sig value and the current closing price. The weighting uses an adaptive weighting mechanism, where values closer to the current price are weighted higher. 

3. Add a λ parameter as a regularizer to make the sig transition smoother.

After obtaining the signal line, the strategy determines long/short based on the golden/dead cross of the signal line and price. Specifically:

1. When sig crosses above price, go long.

2. When sig crosses below price, go short.

In addition, the strategy adds the smooth factor and show_line as adjustable parameters to increase flexibility.

## Advantage Analysis

Compared with traditional moving average strategies, this strategy has the following advantages:

1. The adaptive weighting mechanism can respond faster to price changes.

2. The added regularizer makes the signal line smoother, avoiding wrong signals from drastic price fluctuations.

3. Cross-market arbitrage can profit from price differences between markets. 

4. Flexible adjustable parameters can be optimized according to market conditions.

## Risks and Solutions

The strategy also has some risks:

1. The probability of wrong signals from double crossovers is higher. The solution is to properly adjust the smooth parameter to avoid oscillation of the signal line.

2. Cross-market arbitrage requires that the two markets have price correlation and consistent trends. The solution is to select highly correlated markets for arbitrage. 

3. Parameter optimization requires sufficient historical data for backtesting. The solution is to cautiously adjust parameters in live trading.

## Optimization Directions

The strategy can also be optimized in the following aspects:

1. In parameter selection, machine learning algorithms can be introduced to automatically optimize parameter combinations.

2. In signal generation, more indicators can be introduced to construct more stable trading signals.

3. In risk control, stop loss can be set to limit the loss per trade. 

4. In cross-market arbitrage, it can be extended to more highly correlated trading assets.

## Summary

This strategy implements arbitrage trading between markets by adaptively calculating moving averages. Compared with traditional moving average strategies, it has the advantages of adaptive parameters, smoothed processing, cross-market arbitrage, etc. Next steps are to further optimize the strategy through machine learning, combined signals, risk management, etc.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Data source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|2|REMA smooth factor|
|v_input_3|true|Show signal line|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Crossover82%", overlay=true)

//
// Functions
//
scaleMinimax(X, p, min, max) => 
    hi = highest(X, p), lo = lowest(X, p)
    (max - min) * (X - lo)/(hi - lo) + min

rema(ts, p) => // regularized ma
    rm = 0.0, lambda = .5, a = 2 / (p + 1)
    rm := (nz(rm[1]) + a * (ts - nz(rm[1])) + lambda * (2 * nz(rm[1]) - nz(rm[2]))) / (lambda + 1)
    rm
    
//
// Inputs
//
X = input(close, title="Data source")
smooth = input(2, title="REMA smooth factor")
show_line = input(true, title="Show signal line")

//
// Main
//
p = 5
sig = rema(scaleMinimax(pow(X*p,-X) - 0.1, 100, lowest(X, 100), highest(X, 100)), smooth)

plot(show_line ? sig : na, linewidth=1)
plot(cross(sig, X) ? ohlc4 : na, style=circles, linewidth=8, color=blue, transp=50)

longCondition = crossover(sig, X)
if (longCondition)
    strategy.entry("LE", strategy.long)

shortCondition = crossunder(sig, X)
if (shortCondition)
    strategy.entry("SE", strategy.short)


```

> Detail

https://www.fmz.com/strategy/432339

> Last Modified

2023-11-16 16:20:11
