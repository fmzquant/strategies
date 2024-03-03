
> Name

跳空缺口反转策略Gap-Down-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略针对跳空缺口形态进行反转交易。当标的物跳空缺口下跌后反转上涨时,策略会在次日开盘或收盘进行买入操作,并设置追踪止损来锁定利润。

## 策略原理

1. 判断标的物是否出现跳空缺口,即当日开盘价低于前一日收盘价。

2. 若出现跳空缺口下跌,则观察当日收盘价是否高于开盘价,表明反转上涨。

3. 如果满足跳空缺口反转条件,则在次日开盘或收盘时进行买入操作。

4. 入场后设置一定百分比的追踪止损,如5%。止损线随价格上涨而上调。

5. 当价格回落至止损线时触发止损单,止损离场。

## 优势分析

该策略主要优点:

1. 捕捉跳空缺口形态带来的反转交易机会。

2. 反转形态高概率,符合多空心理交替的行情规律。

3. 追踪止损锁定利润,无需人工监控。

4. 可灵活设置入场时间和止损水平,适应个股特点。

5. 程序化执行,回测优化方便。

## 风险分析

该策略主要风险:

1. 跳空缺口反转失败概率存在,需要验证形态。

2. 止损水平设定过大易被突破导致亏损扩大。

3. 标的股选择不当,可能出现硬着陆大幅反转。

4. 数据回测不足,可能存在过拟合风险。

5. 实盘操作与回测存在差异。

对应解决方法:

1. 优化止损水平,同时控制单笔损失比例。

2. 整体市场面判断,避免选择顶背离个股。

3. 验证形态,检验成交量变化。

4. 扩大回测样本量,模拟实盘验证。

## 优化方向

该策略可考虑以下几点进行优化:

1. 结合趋势指标过滤,避免逆势entry。

2. 动态调整止损水平比例,保护利润。

3. 考虑增加时间过滤,只在指定日期交易。

4. 评估形态强弱,调整入场资金比例。

5. 测试不同持仓时间,寻找最优退出点位。

## 总结

跳空缺口反转策略利用高概率反转形态进行交易。通过止损策略可有效控制风险。但仍需警惕假反弹与市场结构变化。实盘时建议谨慎评估形态与趋势方向,同时持续优化参数。

|| 
## Overview

This strategy trades gap down reversals. When the current candle opens below the prior close and finishes up on the day with a close greater than the open, the strategy enters long on the next day's open or close.

## Strategy Principle

1. Check if a gap down occurs, i.e. current open below prior close. 

2. If gapped down, observe if the current close is above the open, indicating an upside reversal.

3. If gap down reversal conditions are met, go long on the next day's open or close.

4. Set a trailing stop loss at a percentage, e.g. 5%, after entry. The stop level moves up with the price.

5. When price drops to hit the stop loss, the position is closed.

## Advantage Analysis

Main advantages of this strategy:

1. Captures reversal trading opportunities from gap down patterns.

2. High probability reversal pattern aligns with alternating fear/greed. 

3. Trailing stop locks in profits without needing manual monitoring.

4. Flexible settings for entry and stop loss to suit individual stocks.

5. Automated execution and easy backtesting/optimization.

## Risk Analysis

Main risks of this strategy:

1. Failed gap down reversals can occur, need pattern verification.

2. Oversized stop loss prone to being taken out leading to amplified losses.

3. Poor stock selection may lead to hard reversals.

4. Insufficient backtest data leads to overfit risks.

5. Execution differs between backtest and live.

Solutions:

1. Optimize stop loss level and cap loss percentage per trade.

2. Gauge overall market trend to avoid topping stocks. 

3. Verify pattern and volume changes. 

4. Expand sample size for backtest, simulate live trading.

## Optimization Directions

Some ways to improve the strategy:

1. Add trend filter to avoid countertrend entries.

2. Dynamically adjust stop loss percentage to protect profits.

3. Consider adding time filter to trade on specific dates. 

4. Assess strength of pattern for position sizing.

5. Test different holding periods to find optimal exit spots.

## Summary

The gap down reversal strategy capitalizes on high probability reversal patterns. Stops effectively control risk but beware of false bounces and changing market conditions. When trading live, cautious evaluation of patterns and trends along with ongoing optimizations are recommended.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Start Date|
|v_input_2|true|Start Month|
|v_input_3|2009|Start Year|
|v_input_4|5|Trail Long Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-12 04:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © RolandoSantos

//@version=2

strategy(title="Gap Down reversal strat", overlay=true, pyramiding=1, default_qty_type =  strategy.cash, default_qty_value = 10000, initial_capital = 10000 )

/// Start date

startDate = input(title="Start Date", defval=1, minval=1, maxval=31)
startMonth = input(title="Start Month", defval=1, minval=1, maxval=12)
startYear = input(title="Start Year", defval=2009, minval=1800, maxval=2100)


// See if this bar's time happened on/after start date
afterStartDate = (time >= timestamp(syminfo.timezone, startYear, startMonth, startDate, 0, 0))

// STEP 1:
// Configure trail stop level with input options (optional)
longTrailPerc = input(title="Trail Long Loss (%)",
     type=float, minval=0.0, step=0.1, defval=5.0) * 0.01


// Calculate trading conditions
gap_d_r = open < close[1] and close > open


// Plot Shapes
plotshape(gap_d_r, style=shape.triangleup, location=location.belowbar)
///plotshape(gap_u_r, style=shape.triangledown, location=location.abovebar)

///// Use Low, or close/////

//hlco = input(title="Stop Modifier", defval="close", options=["open", "high", "low"])


// STEP 2:
// Determine trail stop loss prices
longStopPrice = 0.0   ///, shortStopPrice = 0.0

longStopPrice := if (strategy.position_size > 0)
    stopValue = close * (1 - longTrailPerc)
    max(stopValue, longStopPrice[1])
else
    0


// Plot stop loss values for confirmation
plot(series=(strategy.position_size > 0) ? longStopPrice : na,
     color=red, style=circles,
     linewidth=1, title="Long Trail Stop")


// Submit entry orders
if (afterStartDate and gap_d_r)
    strategy.entry(id="EL", long=true)


// Submit exit orders for trail stop loss price
if (strategy.position_size > 0)
    strategy.exit(id="Stop out", stop=longStopPrice)














```

> Detail

https://www.fmz.com/strategy/427266

> Last Modified

2023-09-19 16:19:51
