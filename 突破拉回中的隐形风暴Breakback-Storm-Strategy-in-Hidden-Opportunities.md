
> Name

突破拉回中的隐形风暴Breakback-Storm-Strategy-in-Hidden-Opportunities

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1358db41aa5d6562a80.png)
[trans]

## 概述

突破拉回中的隐形风暴策略(Breakback Storm Strategy)专门利用价格突破后拉回进入的机会,在短线上捕捉隐藏在拉回行情中的暴涨机会。它结合趋势判断和反转信号,在突破新高后价格回吐到前期支持位置时进入做多;在突破新低后价格回升到前期压力位置时进入做空。策略通过严格的突破过滤,避开了大部分的假突破,从而确保进入的质量。

## 策略原理

该策略主要基于两个触发信号:长线上的近期新高突破和短线上的拉回形态。具体来说,策略首先要求价格突破80周期的最高点,从更长线上判断目前处于上升趋势之中。其次,要求价格突破第二天的最高点,形成短线上的向上突破。当价格在突破的第二天收盘后发生回吐,回落到前一天的最低点时,就是做多信号。

做空信号的原理则是对称的,需要近期新低突破配合高点回吐。首先判断长线上处于下跌趋势,然后短线上出现向下突破,当价格回升到前一天的最高点时,形成做空信号。

这样的组合设计可以有效过滤假突破的机会,确保进入突破方向正确。而入场点则利用了短线上的拉回机会,在反转前期低点(或高点)附近进入,避开反转中期,获取后续反转行情的主体部分。

## 优势分析

这种策略结合多空双向交易和突破概念,具有以下显著优势:

1. 突破过滤确保交易方向正确性 
2. 拉回进入点确保风险回报比 
3. 定时退出兼顾获利和风控

具体来说,80周期长线过滤避开了大部分短线市的突破假象。突破第二天高点(或低点)的方式则可靠抓取短线趋势。这样高质量的进入信号确保了交易方向的正确性。

而入场点设定在前一天反转点附近,足以给予一定空间的止损范围,同时也能捕捉反转行情中期的主体部分。这保证了策略的稳定盈利。

最后,时间退出机制也综合考虑了盈利因素和风险控制,通过事先定义盈亏结果,减少交易者主观情绪对策略实施的干扰。

## 风险及解决

但是,这种策略也存在一定风险:

1. 进入时间节点集中,容易互相VALID 
2. 多空转换频繁,增加交易成本
3. 反转波动可能不足,难以盈利

第一点风险主要来自于入场时机的设定。当大盘同时出现上涨和下跌两波行情时,容易产生进入定时冲突。这可能导致无法进入任何一边的机会。 

可以通过调整过滤Exiting参数,以及设定最小的突破幅度,避免两边信号过于密集。

第二点风险则与频繁反转相关。当行情出现多次震荡时,买卖转换可能过于频繁。这增加了交易成本和实际亏损。

可以通过调整持仓时间参数以及止损幅度来减少不必要的买卖切换。

最后,突破后的反转波动也可能无法给予足够盈利空间。这通常发生在行情整理震荡 mehr 内。通过结合更长线上趋势判断,可以避开这类整理机会,保证交易质量。


## 策略优化

根据以上分析该策略还可以从以下方面进行优化:

1. 增加止盈机制 
2. 结合波动率指标 
3. 关注季节性机会

首先,可以额外加入移动止盈或突破新高(或新低)止盈方式。这可以锁定大部分利润,避免反转后出现亏损。

此外,也可以结合ATR,RVI等波动率指标,判断行情震荡模式。这可以过滤掉交易机会不足的时期,减少无谓交易。

最后,也可以关注季节性更替等周期性趋势。这类长线机会可以提供更大的趋势空间,避开部分副作用。

## 总结
总的来说，"突破拉回中的隐形风暴策略"策略旨在捕获趋势突破后的短期趋势反转机会。通过结合长期趋势过滤器、短期反转信号、突破验证和回撤入口，它提供了一个强大的框架来交易大趋势中的回撤。当用适当的利润获取、波动性指标和季节性过滤器进行优化时，这样的框架可以在各种市场条件下产生稳定利润。

||

## Overview

The Breakback Storm strategy specializes in capturing pullback opportunities after price breakouts to seize hidden explosive moves within short-term reversals. It combines trend determinations and reversal signals to go long after upward breakouts when prices pull back to previous support levels, and go short after downward breakouts when prices bounce back to previous resistance levels. The strategy filters out most false breakouts through strict breakout validations, ensuring high quality entries.

## Strategy Logic  

The strategy is based on two main triggers: recent high/low breakouts on the long-term timeframe and pullback patterns on the short-term. Specifically, it first requires prices to break above the 80-period high to determine an upward trend from the higher timeframe. Secondly, it demands prices to break the previous day's high to confirm a short-term upward breakout. The long signal then triggers when prices close below the previous day's low after the breakout.

The short signal works symmetrically, requiring a recent low breakout plus a bounce back to the previous day's high. This combination ensures the quality of trend direction and timing of entry points, capturing most of the trend while avoiding middles. 

## Advantage Analysis

This strategy combines dual directional trading and breakout concepts with significant edges:

1. Breakout filter ensures directional accuracy
2. Pullback entry ensures risk-reward
3. Timed exit balances profit and risk

Specifically, the 80-period filter avoids most false breakouts on short-term noise. Breaking the previous day's extreme points reliably catches short-term trend evolutions. Such quality signals ensure directional accuracy of trades.

The pullback entry giving certain stop loss buffer then captures most of the trend middle part afterwards. This guarantees profitable stability of the strategy.

Finally, the timed exit mechanism also balances both profitability and risk control factors by predefining outcome scenarios, minimizing emotional interference.

## Risks and Solutions

However, some risks exist in this strategy:

1. Concentrated entry timing causes crowding
2. Frequent long/short switches increase costs
3. Insufficient reversal magnitude to profit

The first risk comes from the pullback entry setting. When concurrent uptrend and downtrend waves appear in the market, entry signals on both sides can crowd, preventing entries on either side. 

This can be avoided by adjusting the exit filters and setting minimum breakout ranges to space out signals.

The second risk relates to whipsaws from frequent reversals. Excessive long/short switches increase costs and actual losses. 

This can be reduced by tuning the holding period and stop loss parameters to minimize unnecessary exits.

Finally, the ensuing reversal momentum may also lack enough magnitude within consolidation ranges at times. Additional long-term trend metrics can help avoid low quality setups.

## Optimization Directions  

Based on the analysis, further optimizations include:

1. Adding profit taking mechanisms  
2. Incorporating volatility metrics
3. Considering seasonal opportunities

Moving profit stops or break-even stops can first lock in profits and avoid retracements.

Volatility indicators like ATR and RVI can also gauge oscillation regimes to avoid low-opportunity periods.

Finally, cyclic trends around seasonal shifts also provide larger trend spaces to minimize side effects.

## Conclusion

Overall, the Breakback Storm strategy aims to capture short-term trend reversal opportunities after trend breakouts. By combining long-term trend filters, short-term reversal signals, breakout validations and pullback entries, it provides a robust framework to trade pullbacks within larger trend moves. When optimized with appropriate profit taking, volatility metrics and seasonal filters, such framework can generate stable profits across various market conditions.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|40|Max Days to Hold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Smash Day Pattern (Type B)", overlay=true, default_qty_type = strategy.fixed, default_qty_value = 1, initial_capital = 10000)
in1 = input(40, "Max Days to Hold") - 1

isLong = strategy.position_size > 0
isShort = strategy.position_size < 0

longTrigger = close[1]<low[2]
shortTrigger = close[1]>high[2]

longFilter = close[1] > close[80]
shortFilter = close[1] < close[80]

longEntry = (not isLong) and longTrigger and longFilter
shortEntry = (not isShort) and shortTrigger and shortFilter

longStop = valuewhen(longEntry, low[1], 0)
longPrice = valuewhen(longEntry, high[1], 0)
shortStop = valuewhen(shortEntry, high[1],0)
shortPrice = valuewhen(shortEntry, low[1], 0)

strategy.entry(id = "Long", long = true, stop = longPrice+.001, when = longEntry)
strategy.exit(id = "Stop Long", from_entry = "Long", stop = longStop, when = isLong)
strategy.close("Long", barssince(longEntry==true)>=in1)

strategy.entry(id = "Short", long = false, stop = shortPrice-.001, when = shortEntry)
strategy.exit(id = "Stop Short", from_entry = "Short", stop = shortStop, when = isShort)
strategy.close("Short", barssince(shortEntry==true)>=in1)
```

> Detail

https://www.fmz.com/strategy/440678

> Last Modified

2024-02-01 10:25:35
