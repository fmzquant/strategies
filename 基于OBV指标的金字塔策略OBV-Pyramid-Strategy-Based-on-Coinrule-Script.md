
> Name

基于OBV指标的金字塔策略OBV-Pyramid-Strategy-Based-on-Coinrule-Script

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17f8a0366151b9f4acd.png)
[trans]

## 概述

该策略名为“OBV金字塔”,基于OBV指标设计开仓策略,并采用金字塔加仓方式,在趋势出现后,分批多次加仓,追踪趋势进行获利。

## 策略原理

该策略使用OBV指标判断趋势方向。OBV指标基于成交量变化判断价格趋势,成交量的变化反映市场参与者的态度。当OBV上穿0轴表示买盘力道增强,多头趋势形成;当OBV下穿0轴表示卖盘力道增强,空头趋势形成。

该策略通过判断OBV是否上穿0轴,来确认多头趋势的形成。在多头趋势形成时,设定金字塔式加仓规则,最多可加仓7次。通过追踪趋势进行获利,设置止盈止损退出机制。

## 优势分析

该策略最大优势是能捕捉趋势,通过金字塔加仓方式追踪趋势运行,获利潜力大。另外,策略风险控制到位,有止盈止损设置。

具体来说,优势主要体现在:
1. 使用OBV判断趋势方向准确;
2. 金字塔加仓方式能够追踪趋势获利;  
3. 设置止盈止损能控制风险;
4. 策略逻辑简单清晰易于理解。

## 风险分析

该策略主要风险来自两方面:

1. OBV判断失误,造成错失良机或错误建仓;
2. 加仓过多,风险扩大。

对应解决方法:
1. 优化OBV参数,确保判断准确;
2. 适当控制加仓次数,确保风险可控。

## 优化方向 

该策略主要可优化方向:

1. OBV参数优化,提高判断准确率;
2. 加仓次数和金额优化;
3. 止盈止损点位优化;
4. 结合其他指标判断,避免OBV单一判断风险。

优化这些内容后,可以使策略更稳定、更可控、更具备扩展性。

## 总结

该策略整体来说非常实用。它使用OBV指标判断趋势方向,然后通过金字塔加仓追踪趋势运行。策略逻辑简洁清晰,易于理解和回测。有一定的实战运用价值。通过对参数、止盈止损、加仓方式等的深入优化,策略效果能够得到进一步提升,值得进一步研究。

|| 

# Overview

This strategy is called "OBV Pyramid". It designs opening positions based on the OBV indicator and adopts a pyramid increasing position approach to track trends for profit after they emerge. 

# Principles

This strategy uses the OBV indicator to determine the trend direction. The OBV indicator judges price trends based on changes in trading volume, as shifts in volume reflect market participant attitudes. When the OBV line crosses above 0, it indicates strengthening buying power and an uptrend forming. When crossing below 0, it signals strengthening selling pressure and a downtrend.

This strategy confirms an uptrend by the OBV crossing above 0. When an uptrend forms, pyramid increasing position rules are set, allowing up to 7 additional buys. It aims to profit from the trend while setting take profit and stop loss exists.

# Advantage Analysis 

The biggest advantage of this strategy is catching trends using the pyramid approach to track trends and profit from them. Also, solid risk control is in place with take profit and stop loss settings.

Specifically, the main advantages are:

1. Accurate trend judgement using OBV;
2. Pyramid buying to track trends for profit; 
3. Take profit/stop loss controlling risk;
4. Simple and clear logic.

# Risk Analysis

The main risks come from two aspects:

1. Inaccurate OBV signals leading to missed opportunities or wrong entries;  
2. Too many additional buys enlarging risk.

Solutions:

1. Optimize OBV parameters to ensure accuracy;
2. Reasonably limit additional buys for controllable risk.

# Optimization Directions

Main optimization directions:

1. OBV parameter optimization for higher accuracy;
2. Optimization of number of additional buys and amounts;
3. Take profit/stop loss optimization;  
4. Incorporating other indicators to avoid sole OBV reliance.

This can make the strategy more stable, controllable and extensible.

# Conclusion

Overall this is a very practical strategy. It uses OBV to determine trend direction, then pyramids into the trend for profit. The logic is simple and clear for easy backtesting. It has applicability value and with further parameter, risk and money management optimization, performance can improve further, warranting additional research.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Strategy Direction: long|short|all|
|v_input_2|250|Fast filter length |
|v_input_3|500|Slow filter length|
|v_input_4|20|LengthOBV|
|v_input_5|3|ProfitTarget_Percent|
|v_input_6|10|LossTarget_Percent|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-07 00:00:00
end: 2023-12-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © RafaelZioni

//@version=4

strategy(title = " OBV Pyr", overlay = true, pyramiding=5,initial_capital = 10000, default_qty_type= strategy.percent_of_equity, default_qty_value = 20, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.075)
strat_dir_input = input(title="Strategy Direction", defval="long", options=["long", "short", "all"])
strat_dir_value = strat_dir_input == "long" ? strategy.direction.long : strat_dir_input == "short" ? strategy.direction.short : strategy.direction.all
strategy.risk.allow_entry_in(strat_dir_value)

//
fastLength = input(250, title="Fast filter length ", minval=1)
slowLength = input(500,title="Slow filter length",  minval=1)
source=close
v1=ema(source,fastLength)
v2=ema(source,slowLength)
 
//
 
filter=true 
src = close


LengthOBV = input(20)

nv = change(src) > 0 ? volume : change(src) < 0 ? -volume : 0*volume 
c = cum(nv) 
c_tb = c - sma(c,LengthOBV) 

// Conditions

longCond = crossover(c_tb,0)
//shortCond =crossunder(cnv_tb,0)

//

longsignal  = (v1 > v2 or filter == false ) and longCond
//shortsignal = (v1 < v2 or filter == false ) and shortCond 
 
//set take profit
 
ProfitTarget_Percent = input(3)
Profit_Ticks = close * (ProfitTarget_Percent / 100) / syminfo.mintick
 
//set take profit
 
LossTarget_Percent = input(10)
Loss_Ticks = close * (LossTarget_Percent / 100) / syminfo.mintick
 
 
////Order Placing
//
strategy.entry("Entry 1", strategy.long, when=strategy.opentrades == 0 and longsignal)
//
strategy.entry("Entry 2", strategy.long, when=strategy.opentrades == 1 and longsignal)
//
strategy.entry("Entry 3", strategy.long, when=strategy.opentrades == 2 and longsignal)
//
strategy.entry("Entry 4", strategy.long, when=strategy.opentrades == 3 and longsignal)
//
strategy.entry("Entry 5", strategy.long, when=strategy.opentrades == 4 and longsignal)
//
strategy.entry("Entry 6", strategy.long, when=strategy.opentrades == 5 and longsignal)
//
strategy.entry("Entry 7", strategy.long, when=strategy.opentrades == 6 and longsignal)
//
//
//
if strategy.position_size > 0
    strategy.exit(id="Exit 1", from_entry="Entry 1", profit=Profit_Ticks, loss=Loss_Ticks)
    strategy.exit(id="Exit 2", from_entry="Entry 2", profit=Profit_Ticks, loss=Loss_Ticks)
    strategy.exit(id="Exit 3", from_entry="Entry 3", profit=Profit_Ticks, loss=Loss_Ticks)
    strategy.exit(id="Exit 4", from_entry="Entry 4", profit=Profit_Ticks, loss=Loss_Ticks)
    strategy.exit(id="Exit 5", from_entry="Entry 5", profit=Profit_Ticks, loss=Loss_Ticks)
    strategy.exit(id="Exit 6", from_entry="Entry 6", profit=Profit_Ticks, loss=Loss_Ticks)
    strategy.exit(id="Exit 7", from_entry="Entry 7", profit=Profit_Ticks, loss=Loss_Ticks)
    

```

> Detail

https://www.fmz.com/strategy/434709

> Last Modified

2023-12-08 15:58:29
