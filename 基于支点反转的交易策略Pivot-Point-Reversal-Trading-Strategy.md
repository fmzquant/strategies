
> Name

基于支点反转的交易策略Pivot-Point-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略通过识别价格在支点区域的反转形成信号,实现趋势追踪交易。在上涨趋势下买入反转,在下跌趋势下卖出反转,旨在追捕较大行情。

## 策略原理

1. 使用前n周期的高点和低点计算出支点。

2. 当价格上涨突破上方支点后下跌时,产生买入信号。

3. 当价格下跌突破下方支点后上涨时,产生卖出信号。

4. 支点突破判断趋势反转,以及反转验证形成交易信号。

5. 设置止损线以控制风险。

## 优势分析

1. 支点区域反转高概率产生较大行情。

2. 突破验证有效过滤假突破。

3. 易于通过参数调整适应不同品种。

4. 止损设置合理,可控制单笔亏损。

5. 交易逻辑简单直观,较容易实盘操作。

## 风险分析

1. 须适当把握支点参数,避免漏失交易机会。

2. 无法区分正常震荡和趋势反转。

3. 无法限制单向追踪次数,存在亏损放大风险。

4. 没有设置止盈点,无法锁定利润。

## 优化方向

1. 测试不同支点参数在不同品种的效果。

2. 增加指标判断突破的真谛性。

3. 设置止盈或移动止盈以锁定利润。

4. 评估支点强弱,避免反向开仓。

5. 限制单向反转追踪的最大次数。

6. 优化资金管理策略,调整仓位。

## 总结

该策略通过识别支点区域反转形成交易信号,框架简洁合理,可自行优化改进。可适当扩展指标应用,丰富入场过滤条件。也需要加入止盈和风险控制机制以提高稳定性。总体而言,该策略具有较大的提升空间。

|| 

## Overview 

This strategy identifies price reversals around pivot point areas to generate signals for trend trading. It buys on pullbacks in uptrend and sells on bounces in downtrend, aiming to ride significant moves.

## Strategy Logic

1. Calculate pivot points using high/low of previous n bars.

2. When price breaks above upper pivot point then drops, buy signal is generated.

3. When price breaks below lower pivot point then rebounds, sell signal is generated. 

4. Pivot point break judges trend reversal, and reversal confirmation forms trade signals.

5. Set stop loss to control risks.

## Advantage Analysis

1. High probability of significant moves when reversal occurs around pivot areas.

2. Breakout confirmation filters out false breakouts effectively. 

3. Easy to adjust parameters for different products.

4. Reasonable stop loss controls single trade loss.

5. Simple and intuitive logic, relatively easy to implement for live trading.

## Risk Analysis

1. Need to properly determine pivot parameters to avoid missing opportunities.

2. Unable to distinguish normal oscillations and trend reversals.

3. No limit on number of consecutive trades, risks amplified losses. 

4. No take profit defined, unable to lock in profits.

## Improvement Directions

1. Test different pivot parameters on different products.

2. Add indicators to judge the authenticity of breakouts.

3. Define take profit or trailing stop to lock in profits.

4. Assess pivot point strength to avoid premature reverse entries.

5. Limit maximum number of consecutive reversal trades.

6. Optimize capital management for better position sizing. 

## Summary

This strategy identifies trading opportunities from pivot area reversals with a simple and reasonable framework. It has large room for custom optimization and improvements. Some expansions on indicator applications can enrich entry filters. Profit taking and risk control mechanisms are also needed to improve stability. Overall, this strategy has good potential for enhancements.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4|leftBars|
|v_input_2|2|rightBars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-12 00:00:00
end: 2023-09-19 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("KVFX Pivot Reversal Strategy", overlay=true)
leftBars = input(4)
rightBars = input(2)
swh = ta.pivothigh(leftBars, rightBars)
swl = ta.pivotlow(leftBars, rightBars)
swh_cond = not na(swh)
hprice = 0.0
hprice := swh_cond ? swh : hprice[1]
le = false
le := swh_cond ? true : (le[1] and high > hprice ? false : le[1])
if (le)
	strategy.entry("PivRevLE", strategy.long, comment="PivRevLE", stop=hprice + syminfo.mintick)
swl_cond = not na(swl)
lprice = 0.0
lprice := swl_cond ? swl : lprice[1]
se = false
se := swl_cond ? true : (se[1] and low < lprice ? false : se[1])
if (se)
	strategy.entry("PivRevSE", strategy.short, comment="PivRevSE", stop=lprice - syminfo.mintick)
//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)
```

> Detail

https://www.fmz.com/strategy/427377

> Last Modified

2023-09-20 14:52:57
