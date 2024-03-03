
> Name

基于VSTOP和RSI的交易策略VSTOP-and-RSI-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略结合了VSTOP和RSI两个指标,实现当RSI超买超卖时进行做多做空操作,同时使用VSTOP来判断趋势方向,在趋势反转时及时止损。

## 策略原理

1. 计算RSI指标值,设置超买线和超卖线。当RSI大于超买线时,做多;当RSI小于超卖线时,做空。

2. 计算VSTOP,它是根据价格波动范围来设置的止损线。具体计算步骤如下:

   - 计算ATR指标,并设定ATR的系数mult

   - 记录最大价max和最小价min

   - 根据是否处于上升趋势is_uptrend,计算出当前的止损线stop = is_uptrend ? max - mult * ATR : min + mult * ATR

   - 更新止损线:vstop1 = is_uptrend ? max(vstop_prev, stop) : min(vstop_prev, stop)

   - 当趋势发生反转时,重新设置止损线vstop

3. 在RSI超卖时,若价格上穿VSTOP,则做空;在RSI超买时,做多。

## 优势分析

- 结合趋势指标和超买超卖指标,可以在趋势行情中捕捉反转机会。

- 使用VSTOP来设置止损,可以有效控制风险。

- RSI参数设置灵活,可以针对不同品种进行优化。

- VSTOP系统地跟踪止损,无需人工干预。

## 风险及解决方案

- 如果ATR参数设置过大或过小,止损线将失去意义。可以测试不同的ATR参数,也可以结合ATR的平均值来设置。

- 在盘整行情中,RSI可能频繁触发交易信号,从而增加交易频率和滑点成本。可以适当调整RSI的参数,或者增加过滤条件来减少无效信号。

- 反转失败是此策略的主要风险,交易者需要关注更大级别的趋势 direction,避免逆势操作。可以通过与长期均线结合来判断趋势方向。

## 优化方向

- 可以考虑结合其他指标滤除无效信号,例如量能指标,唐奇通道等。

- 可以基于回测结果对参数进行优化,找到最佳的参数组合。

- 可以研究如何动态调整ATR的系数,在不同市场环境中进行自适应。

- 可以探索在特定时间段关闭策略,以规避高风险时段。

## 总结

该策略整合了趋势判断和超买超卖判断,能够在趋势行情中捕捉反转机会。VSTOP系统地进行止损管理,有助于风险控制。通过参数优化和组合其他指标可以进一步增强策略效果。交易者需要关注趋势方向,避免反转失败的主要风险。

||


## Overview

This strategy combines the VSTOP and RSI indicators to go long when RSI is overbought and go short when RSI is oversold, while using VSTOP to determine the trend direction and cut losses in time when the trend reverses.

## Strategy Logic

1. Calculate the RSI indicator value and set overbought and oversold lines. Go long when RSI is above the overbought line and go short when RSI is below the oversold line.

2. Calculate the VSTOP, which is a stop loss line based on price fluctuation range. The calculation steps are as follows:

   - Calculate the ATR indicator and set the ATR coefficient mult

   - Record the max price and min price 

   - According to the uptrend state is_uptrend, calculate the current stop loss line: stop = is_uptrend ? max - mult * ATR : min + mult * ATR

   - Update the stop loss line: vstop1 = is_uptrend ? max(vstop_prev, stop) : min(vstop_prev, stop)

   - When trend reversal happens, reset the stop loss line vstop

3. When RSI is oversold, if price crosses above VSTOP, go short; when RSI is overbought, go long.

## Advantage Analysis 

- Combining trend indicator and overbought/oversold indicator helps capture reversal opportunities in trending markets.

- Using VSTOP to set stop loss effectively controls risks.

- Flexible RSI parameter settings can be optimized for different products. 

- VSTOP systematically trails stop loss without manual intervention.

## Risks and Solutions

- If ATR parameter is set too large or too small, the stop loss line would be meaningless. Different ATR parameters can be tested or combined with ATR average.

- In range-bound markets, RSI may trigger frequent trading signals, increasing trading frequency and slippage cost. RSI parameters can be adjusted or extra filters added to reduce invalid signals.

- Failed reversal is the main risk of this strategy. Traders need to watch larger timeframe trend direction to avoid counter trend trading. Long-term moving averages can be used to determine the trend.

## Optimization Directions

- Consider combining other indicators to filter out invalid signals, e.g. volume, Donchian Channel etc.

- Optimize parameters based on backtest results to find the optimal parameter combination.

- Research how to dynamically adjust the ATR coefficient for adaptation in different market environments.

- Explore shutting down the strategy during high-risk periods.

## Conclusion

This strategy integrates trend judgment and overbought/oversold levels to capture reversal opportunities in trending markets. VSTOP provides systematic stop loss management for risk control. The strategy can be further enhanced through parameter optimization and combining other indicators. Traders need to watch out for failed reversals, the main risk.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|RSI Period|
|v_input_2|30|Oversold Level|
|v_input_3|70|Overbought Level|
|v_input_4|2|Vstop Length|
|v_input_5|2|Vstop Mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-02 00:00:00
end: 2023-10-08 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Vstop and RSI", overlay=true)

//RSI Section
length = input(2, "RSI Period") 
overSold = input(30, "Oversold Level") 
overBought = input(70, "Overbought Level") 
price = close 
vrsi = rsi (price, length) 

//VSTOP Section
vlength = input(2, "Vstop Length") 
mult = input(2, "Vstop Mult") 
atr_ = atr(vlength) 

max1=0.0 
min1=0.0 
is_uptrend_prev = false 
stop=0.0 
vstop_prev=0.0 
vstop1=0.0 
is_uptrend=false 
is_trend_changed=false 
max_ = 0.0 
min_ = 0.0 
vstop=0.0 

max1 := max(nz(max_[1]), close)
min1 := min(nz(min_[1]), close)


is_uptrend_prev := nz(is_uptrend[1], true)

stop := is_uptrend_prev ? max1 - mult * atr_ : min1 + mult * atr_
vstop_prev := nz(vstop[1])
vstop1 := is_uptrend_prev ? max(vstop_prev, stop) : min(vstop_prev, stop)
is_uptrend := close - vstop1 >= 0
is_trend_changed := is_uptrend != is_uptrend_prev
max_ := is_trend_changed ? close : max1
min_ := is_trend_changed ? close : min1
vstop := is_trend_changed ? is_uptrend ? max_ - mult * atr_ : min_ + mult * atr_ : vstop1
plot(vstop, color = is_uptrend ? green : red, style=cross, linewidth=2)

if vrsi > overBought
    strategy.entry("Buy", strategy.long, comment="Buy")
     
if vrsi < overSold and vstop > price
    strategy.entry("Sell", strategy.short, comment="Sell")
```

> Detail

https://www.fmz.com/strategy/428802

> Last Modified

2023-10-09 15:48:46
