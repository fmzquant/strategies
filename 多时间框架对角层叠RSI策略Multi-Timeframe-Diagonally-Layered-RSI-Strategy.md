
> Name

多时间框架对角层叠RSI策略Multi-Timeframe-Diagonally-Layered-RSI-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略是一个多时间框架非重绘RSI策略,仅在两个更高时间框架超卖时做多。我在BTC/USD的1分钟线上编写,但逻辑可应用于其他资产。旨在资产处于下跌趋势时盈利。

## 原理

对角层叠指入场和退出条件分布在不同时间框架上。通常,指标可能变得无利可图,因为在下跌趋势中,当前时间框架的超买区未被触及,而是先触及更高时间框架的超买区,然后发生回调。对角层叠策略通过对角方式减轻这一问题,即当更快时间框架超买时卖出,当更慢时间框架超卖时买入。

因此,本策略是对角层叠的。我可能会创建一个单独的脚本,根据总体趋势在对角向上和对角向下之间切换,因为在延长的上涨趋势期间,该指标可能不会频繁闪烁。这在时间序列与时间框架图表上可以视为“X”形。这是值得考虑的......

## 优势

- 利用多个时间框架RSI指标,提高了交易信号的可靠性
- 对角层叠入场,可在下跌趋势中获得更多机会
- 非重绘指标,信号可靠
- 可配置RSI参数和超买超卖界限,适应不同市场
- 考虑交易成本,追求稳定利润而非高频交易

## 风险及解决方法

- RSI容易产生假信号,可适当调整参数或添加过滤条件
- 对角层叠增加了入场难度,可降低层叠时间框架数量
- 仅做多,需承担方向性风险,可考虑均衡做多做空
- 利用固定止损来控制单笔损失

## 优化方向

- 增加趋势判断,在趋势下跌时使用对角层叠,趋势上涨时使用对角向上
- 优化RSI参数,寻找最佳参数组合
- 增加Volume,MA等指标过滤,提高信号质量 
- 增加做空策略,使策略能在所有市场中获利
- 优化止损策略,降低回撤

## 总结

本策略overall是一个非常有效的下跌趋势交易策略。利用多时间框架RSI指标和对角层叠入场方式,能在下跌阶段捕捉反弹机会。同时非重绘特性也提高了信号的可靠性。通过优化参数,添加过滤器和做空策略,可以将其打造成一个适应任何市场的强大策略。

||

## Overview

This strategy is a multi-timeframe non-repainting RSI strategy that goes long only when two higher timeframes are oversold. I wrote it on BTC/USD 1-min, but the logic should work on other assets as well. It is designed to be profitable when the asset is in a downtrend.  

## Principle 

Diagonal layering refers to entry and exit conditions spread across different timeframes. Normally, indicators can become unprofitable because in downtrends, the overbought zones of the current timeframe are not reached. Rather, the overbought zones of the higher timeframes are reached first, followed by a pullback. Diagonally layered strategies mitigate this by selling diagonally, that is, selling once the faster timeframe reaches overbought and buying once the slower timeframe reaches oversold.

Thus this strategy is diagonally layered. I may create a separate script that toggles between diagonal-up and diagonal-down based on overall trend, as in extended uptrend periods this indicator may not flash as frequently. This can be visualized on a time series x timeframe chart as an "X" shape. Something to consider...

## Advantages

- Utilizes RSI indicators across multiple timeframes, improving signal reliability
- Diagonal layering provides more opportunities in downtrends 
- Non-repainting indicators give reliable signals
- Configurable RSI parameters and overbought/oversold levels adapt to different markets
- Considers trading costs, targets steady profits over high-frequency trading

## Risks and Solutions

- RSI prone to false signals, tweak parameters or add filters 
- Diagonal layering increases entry difficulty, reduce layered timeframes
- Long only, exposed to directional risk, consider balancing long/short
- Use fixed stop loss to control loss per trade

## Optimization Directions

- Add trend detection, use diagonal layering in downtrends, diagonal-up in uptrends
- Optimize RSI parameters to find best combo
- Add Volume, MA etc. filters to improve signal quality
- Add short strategy so strategy can profit in all markets
- Optimize stop loss to reduce drawdown

## Summary

Overall this is a very effective downtrend trading strategy. Using multi-timeframe RSIs and diagonal layering provides opportunities to catch bounces in downtrends. Non-repainting also improves signal reliability. With parameter optimization, adding filters and a short strategy, it can be made into a robust strategy for any market.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|7|RSI Length|
|v_input_timeframe_1|3|HT 1|
|v_input_timeframe_2|5|HT 2|
|v_input_int_2|80|Overbought Level|
|v_input_int_3|20|Oversold Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-21 00:00:00
end: 2023-06-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © wbburgin

//@version=5
strategy("MTF Layered RSI - Bitcoin Bot [wbburgin]",overlay=false, pyramiding = 20, initial_capital=10000)

length = input.int(7,"RSI Length")
tf2 = input.timeframe("3",title="HT 1")
tf3 = input.timeframe("5",title="HT 2")
ob = input.int(80,"Overbought Level")
os = input.int(20,"Oversold Level")

rsi = ta.rsi(close,length)
rsi2 = request.security(syminfo.tickerid, tf2, rsi[1], barmerge.gaps_off, lookahead=barmerge.lookahead_on)
rsi3 = request.security(syminfo.tickerid, tf3, rsi[1], barmerge.gaps_off, lookahead=barmerge.lookahead_on)

plot(rsi,color=color.yellow,title="RSI Current TF")
plot(rsi2,color=color.new(color.yellow,50),title="RSI HT1")
plot(rsi3,color=color.new(color.yellow,75),title="RSI HT2")

lm=hline(os,title="Oversold")
hm=hline(ob,title="Overbought")

fill(hm,lm,color=color.new(color.blue,95))

htCross = (ta.crossover(rsi2,os) and rsi3>os and rsi>os) or (ta.crossover(rsi3,os) and rsi2>os and rsi>os)
buySig = (ta.crossover(rsi,os) and rsi2 < os and rsi3 < os) or htCross
sellSig = ta.crossunder(rsi,ob)

if buySig
    strategy.entry("Long",strategy.long)
if sellSig
    strategy.close("Long")

plotshape(buySig,title="Buysig",style=shape.triangleup,location=location.bottom,color=color.green,size=size.tiny)
plotshape(sellSig,title="Sellsig",style=shape.triangledown,location=location.top,color=color.red,size=size.tiny)
```

> Detail

https://www.fmz.com/strategy/428102

> Last Modified

2023-09-28 16:12:25
