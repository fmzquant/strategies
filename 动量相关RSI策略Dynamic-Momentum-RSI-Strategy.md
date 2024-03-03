
> Name

动量相关RSI策略Dynamic-Momentum-RSI-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略的核心思路是使RSI指标的平滑周期变得动态,根据价格和动量之间的相关性自动调整,从而改善RSI指标的实用性。

## 策略原理

该策略首先计算价格的动量,然后计算价格和动量之间的相关性系数。相关性系数接近1时,表示价格和动量高度正相关;相关性系数接近-1时,表示价格和动量高度负相关。

根据价格和动量的相关性,可以调整RSI指标的平滑周期长度。当相关性较高时,使用较短的RSI周期;当相关性较低时,使用较长的RSI周期。

具体来说,本策略将RSI周期长度设置为一个范围,默认是20-50。在计算价格和动量的相关系数后,通过线性映射的方法,将相关系数映射到20-50这个范围,作为RSI的最终平滑周期长度。

这样可以根据市场情况,自动调整RSI指标的参数,当价格变化和动量变化强烈相关时,使用更短期的RSI,使其更灵敏;当相关性不强时,使用更长期的RSI,以减少噪音对信号的影响。

## 优势分析

- 动态调整参数,适应市场变化
- 避免使用固定周期指标的局限性
- 平滑周期自动优化,无需人工选择最佳参数
- 可配置RSI周期的范围,适用于不同品种

## 风险分析

- 相关性计算本身引入了滞后,可能错过价格转折点
- 仅关注价格和动量的相关性过于单一,忽略其他因素
- 默认的RSI周期范围可能不适合所有品种,需要优化
- 可考虑结合其他因素如波动率等来调整RSI周期

## 优化方向

- 尝试不同的Related性计算方法,降低滞后
- 考虑引入更多因素来决定RSI周期,不要仅仅依赖相关性
- 对不同品种进行回测,找到最佳的默认RSI周期范围
- 可以设置相关性因子权重,而不是完全依赖线性映射
- 添加过滤条件,避免在特定市场环境下使用不合适的RSI周期

## 总结

该策略通过动态调整RSI平滑周期的思路值得学习,但具体实现还有很大改进空间。关键是要找到影响RSI参数选择的决定性因素,并将其转化为可量化的指标。同时,不要完全依赖模型,还需要根据经验和回测对参数范围进行优化。整体来说,这是一个非常创新的思路,在继续优化和改进后具有实际运用的潜力。

||


## Overview

The core idea of this strategy is to make the smoothing period of the RSI indicator dynamic, automatically adjusting it based on the correlation between price and momentum, thereby improving the usefulness of the RSI indicator.

## Strategy Logic

The strategy first calculates the momentum of the price, then calculates the correlation coefficient between the price and momentum. When the correlation coefficient is close to 1, it means the price and momentum are highly positively correlated. When the correlation coefficient is close to -1, it means the price and momentum are highly negatively correlated.

Based on the correlation between price and momentum, the smoothing period of the RSI indicator can be adjusted. When the correlation is high, a shorter RSI period is used. When the correlation is low, a longer RSI period is used. 

Specifically, this strategy sets the RSI period range to be 20-50 by default. After calculating the correlation coefficient between price and momentum, it uses linear mapping to map the correlation coefficient to the 20-50 range as the final RSI smoothing period.

This allows the RSI parameters to be automatically adjusted based on market conditions. When price changes are strongly correlated with momentum changes, a shorter-period RSI is used to make it more sensitive. When the correlation is weak, a longer-period RSI is used to reduce the impact of noise on the signal.

## Advantage Analysis

- Dynamic parameter adjustment adapts to market changes
- Avoids limitations of fixed period indicators  
- Smoothing period is automatically optimized, no need to manually select the best parameter
- Configurable RSI period range works for different products

## Risk Analysis

- Correlation calculation itself introduces lag, may miss price turning points
- Only considering price-momentum correlation is too simplistic, ignores other factors
- Default RSI period range may not suit all products, needs optimization
- Consider incorporating other factors like volatility to adjust RSI period

## Optimization Directions
 
- Try different correlation calculation methods to reduce lag
- Consider more factors, not just correlation, to determine RSI period 
- Backtest on different products to find optimal default RSI period range
- Can set correlation factor weights, instead of purely linear mapping
- Add filters to avoid unsuitable RSI periods in certain market environments  

## Summary

The idea of dynamically adjusting RSI smoothing period is worth learning from, but the specific implementation has much room for improvement. The key is to identify the decisive factors affecting RSI parameter selection, and convert them into quantifiable indicators. Also, don't purely rely on the model, empirical optimization of parameter ranges is needed. Overall this is a very innovative idea, with practical potential after further optimizations and improvements.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|(?Dynamic RSI Momentum)Momentum Length|
|v_input_source_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|20|Min RSI|
|v_input_int_3|50|Max RSI|
|v_input_float_1|70|OverBought|
|v_input_float_2|30|OverSold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-10-06 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=5
strategy("Dynamic RSI Momentum", "DRM Strategy", process_orders_on_close = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 50 )

// +++++++++++++++++++++
// ++      INPUT      ++ 
// +++++++++++++++++++++

// Momentum
len = input.int(10, "Momentum Length", 1,      group = "Dynamic RSI Momentum")
src = input.source(close, "Source",   group = "Dynamic RSI Momentum")

min_rsi = input.int(20, "Min RSI", group = "Dynamic RSI Momentum")
max_rsi = input.int(50, "Max RSI", group = "Dynamic RSI Momentum")

upLvl = input.float(70, "OverBought", 0, 100, group = "Dynamic RSI Momentum")
dnLvl = input.float(30, "OverSold",   0, 100, group = "Dynamic RSI Momentum")

// +++++++++++++++++++++
// ++   CALCULATION   ++ 
// +++++++++++++++++++++

// RMA Function
rmaFun(src, len) =>
    sma   = ta.sma(src, len) 
	alpha = 1/len
	sum   = 0.0
	sum  := na(sum[1]) ? sma : alpha * src + (1 - alpha) * nz(sum[1])

// RSI Function 
rsiFun(src, len) =>     
    100 - 100 / (1 + rmaFun(src - src[1] > 0 ? src - src[1] : 0, len) / 
                     rmaFun(src[1] - src > 0 ? src[1] - src : 0, len))

// Momentum
momVal = src - src[len]

// Calculation Price vs Momentum
corr  = ta.correlation(src, momVal, len)
corr := corr > 1 or corr < -1 ? float(na) : corr

rsiLen = 0
rsiLen := int(min_rsi + nz(math.round((1 - corr) * (max_rsi-min_rsi) / 2, 0), 0))

rsiMom = rsiFun(src, rsiLen)


// +++++++++++++++++++++
// ++    STRATEGY     ++ 
// +++++++++++++++++++++

long  = ta.crossover(rsiMom, dnLvl)
short = ta.crossunder(rsiMom, upLvl) 


// +++> Long <+++++
if long and not na(rsiMom)
    strategy.entry("Long", strategy.long)

// +++> Short <+++++
if short and not na(rsiMom)
    strategy.entry("Short", strategy.short)

// +++++++++++++++++++++
// ++      PLOT       ++ 
// +++++++++++++++++++++

plot(rsiMom, "Dynamic RSI Momentum", rsiMom < dnLvl ? color.green : rsiMom > upLvl ? color.red : color.yellow)

hline(50, "Mid Line", color.gray)

upperLine = hline(upLvl, "Upper Line", color.gray)
lowerLine = hline(dnLvl, "Lower Line", color.gray)
fill(upperLine, lowerLine, color.new(color.purple, 90), "Background Fill")


```

> Detail

https://www.fmz.com/strategy/428620

> Last Modified

2023-10-07 15:47:42
