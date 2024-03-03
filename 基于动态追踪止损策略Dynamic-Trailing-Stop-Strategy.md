
> Name

基于动态追踪止损策略Dynamic-Trailing-Stop-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1afc532d51fa268bbc2.png)
[trans]
## 概述

本策略旨在利用位姆斯特拉平台的追踪止损功能,动态调整止损价格,实现更准确和柔性的止损。策略不用于入场和出场,而是给出不同市场条件下合理的止损范围。建议您通过回测优化不同的参数。本策略也可以集成到现有入场出场策略中,作为止损。

## 策略原理

本策略主要运用3个指标:最高价、最低价和收盘价。策略首先定义长仓和短仓的止损范围,即多头追踪止损距离`longoffset`和空头追踪止损距离`shortoffset`。其中长仓距离默认为228.5点,短仓距离默认为243.5点。

然后策略运用以下逻辑调整追踪止损价格`trailstop`:

- 最近一根K线的最低价低于上一根K线的追踪止损价,并且上上根K线的最低价高于上两根K线的追踪止损价,则当前K线的追踪止损价=收盘价+空头追踪止损距离
- 最近一根K线的最高价高于上一根K线的追踪止损价,并且上上根K线的最高价低于上两根K线的追踪止损价,则当前K线的追踪止损价=收盘价-多头追踪止损距离
- 最近一根K线的最高价高于上一根K线的追踪止损价,则当前K线的追踪止损价=最大值(上一根K线的追踪止损价,最近一根K线的最高价-长仓追踪止损距离)
- 最近一根K线的最低价低于上一根K线的追踪止损价,则当前K线的追踪止损价=最小值(上一根K线的追踪止损价,最近一根K线的最低价+短仓追踪止损距离)
- 否则当前K线的追踪止损价=收盘价

这样可以根据市场最高价和最低价的变化,实时调整追踪止损价,实现动态止损。

## 优势分析

本策略最大的优势在于实现了真正动态和柔性的追踪止损。相比固定的止损价,动态追踪可以根据市场波动情况调整止损范围,避免止损距离过大带来不必要的损失,也避免止损距离过小被价格普通波动击出。这既减少了不必要的亏损,也降低了过早止损的概率。

另一个优势是止损距离是可以自定义和优化的。用户可以根据不同品种的特点和交易风格,选择适合自己的止损范围。这使得策略可以应用于更广泛的场景。

最后,本策略止损逻辑简单清晰,容易理解,也便于二次开发和集成到其他策略中,这也是其优势之一。

## 风险分析

本策略的主要风险有以下几点:

1. 动态止损只能减少正常行情下的亏损,无法抵御大的突发事件或者极端行情造成的亏损。这是动态止损本身的局限性。

2. 如果追踪止损距离设置过大,则可能导致亏损扩大。如果距离过小,则可能过早止损。距离的设定需要根据品种特性谨慎测试和优化。

3. 在刚开仓后的几根K线,由于追踪止损机制的原因,止损距离可能会过大,这段时间存在一定的额外风险。

## 优化方向  

本策略可以从以下几个方向进行优化:

1. 不同品种参数优化:根据不同品种的波动程度、日内波动范围等指标,选择合理的多头和空头追踪止损距离。这是最关键的优化方向。

2. 减少开仓后几根K线的额外风险:可以在开仓后的若干根K线上限制追踪止损距离的调整幅度,避免止损距离过大。

3. 结合交易量指标:比如在交易量放大的阶段降低止损距离,避免被套利的止损。

4. 和其他入场出场策略结合:本策略的主要作用是追踪止损,可以集成到其他策略中,与入场和出场规则配合使用。

## 总结

本策略实现了根据行情最高价和最低价变化的动态追踪止损功能。这可以有效减少正常行情下不必要的亏损,也较好地解决了固定止损距离过大过小的问题。关键优化方向是测试不同品种合适的参数,以及在开仓后几根K线的风险控制。本策略止损逻辑简单清晰,容易理解和二次开发,可以集成到其他策略中或作为止损工具单独使用。

||

## Overview

This strategy aims to utilize Bitmex's trailing stop function to dynamically adjust the stop loss price for more accurate and flexible stops. The strategy is not used for entries or exits, but rather gives reasonable stop loss ranges under different market conditions. It is suggested to backtest with different values. The strategy can also be integrated into existing strategies that give entries/exits to act as a stop loss.

## Strategy Logic  

The strategy mainly uses 3 indicators: highest price, lowest price and close price. The strategy first defines the stop loss ranges for long and short positions, namely the `longoffset` for long trailing stop distance and `shortoffset` for short trailing stop distance. The default long distance is 228.5 points and the short distance is 243.5 points.  

Then the strategy uses the following logic to adjust the trailing stop price `trailstop`:  

- If the lowest price of the latest candle is lower than the trailing stop price of the previous candle, and the lowest price of the candle before that is higher than the trailing stop price of the previous 2 candles, then the current candle's trailing stop price = close price + short trailing stop distance

- If the highest price of the latest candle is higher than the trailing stop price of the previous candle, and the highest price of the candle before that is lower than the trailing stop price of the previous 2 candles, then the current candle's trailing stop price = close price - long trailing stop distance  

- If the highest price of the latest candle is higher than the trailing stop price of the previous candle, then the current candle's trailing stop price = max(previous candle's trailing stop price, latest candle's highest price - long trailing stop distance)

- If the lowest price of the latest candle is lower than the trailing stop price of the previous candle, then the current candle's trailing stop price = min(previous candle's trailing stop price, latest candle's lowest price + short trailing stop distance)  

- Otherwise the current candle's trailing stop price = close price

This dynamically adjusts the trailing stop price based on changes in the highest and lowest market prices to achieve dynamic stops.  

## Advantage Analysis

The biggest advantage of this strategy is the implementation of truly dynamic and flexible trailing stops. Compared to fixed stop loss prices, dynamic trailing can adjust the stop loss range based on market fluctuations, avoiding unnecessary losses due to too large stop distances, while also avoiding being stopped out by normal price fluctuations when the distance is too small. This reduces unnecessary losses while also reducing the probability of premature stops.  

Another advantage is that the stop loss distance is customizable and optimizable. Users can choose stop loss ranges suitable for themselves according to the characteristics of different products and trading styles. This allows the strategy to be applied to a wider range of scenarios.   

Finally, the stop loss logic of this strategy is simple and clear, easy to understand, and easy to further develop and integrate into other strategies. This is also one of its advantages.

## Risk Analysis

The main risks of this strategy are:  

1. Dynamic stops can only reduce losses under normal market conditions, but cannot withstand major events or extreme market conditions. This is an inherent limitation.   

2. If the trailing stop distance is set too large, it may lead to greater losses. If set too small, it may stop out prematurely. The setting needs careful testing and optimization based on product characteristics.

3. In the first few candles after opening a position, due to the mechanism of trailing stops, the stop distance may be too large, posing some additional risk during this period.

## Optimization Directions

This strategy can be optimized in the following aspects:  

1. Parameter optimization for different products: Choose reasonable long and short trailing stop distances based on volatility, intraday range and other metrics for different products. This is the most critical direction.  

2. Reduce extra risk in early candles after opening positions: Limit the adjustment range of trailing stop distances in the first few candles to avoid too large distances.

3. Incorporate trading volume indicators: For example, reduce stop distance during surges in volume to avoid being stopped out by arbitrage.   

4. Combine with other entry/exit strategies: The main function of this strategy is trailing stop loss. It can be integrated with other strategies with entry and exit rules.  

## Conclusion

This strategy implements dynamic trailing stop loss based on changes in highest and lowest market prices. It can effectively reduce unnecessary losses under normal market conditions, and solves the problem of fixed distances being too large or small. The key optimization directions are testing suitable parameters across different products, and controlling risks in the early candles after opening positions. The stop loss logic is simple and clear, easy to understand and integrate into other strategies or use standalone as a stop loss tool.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|228.5|Long Trailing Stop Size|
|v_input_2|243.5|Short Trailing Stop Size |


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-20 00:00:00
end: 2024-02-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//By River
strategy("BitMex Trailing Stop Strategy", overlay=true)
longoffset = input(defval=228.5, title="Long Trailing Stop Size", type=float, minval=0.5, maxval=1000, step=0.5)
shortoffset = input(defval=243.5, title="Short Trailing Stop Size ", type=float, minval=0.5, maxval=1000, step=0.5)

hiprice = request.security(syminfo.tickerid, "1", high)
loprice = request.security(syminfo.tickerid, "1", low)
price = request.security(syminfo.tickerid, "1", close)

trailstop = price
trailstop := (loprice <= trailstop[1] and loprice[1] >= trailstop[2]) ? price + shortoffset : ((hiprice >= trailstop[1] and hiprice[1] <= trailstop[2]) ? price - longoffset : (hiprice > trailstop[1] ? max(hiprice - longoffset, trailstop[1]) : (loprice < trailstop[1] ? min(loprice + shortoffset, trailstop[1]) : price)))

trailcol = trailstop > price ? red : green
plot(trailstop, color=trailcol)

longCondition =  trailcol == green
alertcondition(longCondition, "Long Stop alert", "BUY")
if (longCondition)
    strategy.entry("Long", strategy.long)
shortCondition = trailcol == red
alertcondition(shortCondition, "Short alert", "SELL")
if (shortCondition)
    strategy.entry("Short", strategy.short)


```

> Detail

https://www.fmz.com/strategy/442937

> Last Modified

2024-02-27 15:02:34
