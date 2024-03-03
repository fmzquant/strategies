
> Name

DCA策略DCA-Bot-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略是利用dollar cost averaging (DCA)原理来进行加仓交易的回测程序。它可以在初始开仓后,根据设定的价格偏离百分比和加仓次数规则来追加仓位。同时,策略还包含止盈策略和追踪止盈功能。

## 策略原理

该策略首先会在回测时间窗口内,当天收盘价大于0时立即开仓做多,此时的开仓价格作为基础价格bo_level。之后,若不存在安全订单(so),则会根据设定的价格偏离百分比和加仓次数,将可能的平仓订单全部放在当前蜡烛上。具体来说,安全订单的价格会以最近一笔安全订单价格latest_so_level为基础,根据安全订单步长缩放safe_order_step_scale计算出下一笔安全订单价格next_so_level。如此循环直到达到最大安全订单数max_safe_order。

在持仓阶段,如果持仓量大于0,会根据基础价格和目标止盈百分比计算出止盈价格take_profit_level。如果追踪止盈功能被关闭,则使用此固定止盈价格;否则会根据蜡烛的最高价不断更新止盈跟踪的最高价ttp_max,并相应调整止盈价格,实现追踪止盈。

## 策略优势分析

- 利用DCA策略,可以在价格下跌后自动加仓,降低平均持仓成本,对冲系统性风险。

- 支持自定义参数,可以根据不同品种和交易风格灵活配置开仓规则和止盈策略,适用面广。

- 内置追踪止盈功能,可以根据行情自动调整止盈位置,避免止盈过早被触发。

- 回测参数设置灵活,可以方便测试不同时间段的数据,评估策略效果。

- 结合3commas平台,可以直接用回测结果配置实盘机器人,无需额外开发。

## 策略风险分析

- DCA策略存在加仓风险,如果行情继续下跌,持仓量会进一步增加,亏损也会加大。需要合理配置加仓规则。

- 固定百分比止盈无法根据市场波动幅度调整,可能会过早止盈或止盈离场。需要配置追踪止盈。

- 回测存在拟合风险,实盘效果会受交易成本等因素影响。需要做好风险评估。

- 需要关注交易所和3commas的系统稳定性,避免计划交易执行失败。

## 策略优化方向

- 可以根据不同品种的波动率动态调整价格偏离百分比,优化加仓规则。

- 可以结合波动率指标,确定更科学的止盈百分比。

- 可以根据具体品种不同的交易时段,设定合理的回测时间窗口。

- 可以引入止损策略,在大幅亏损时停损退出。

- 可以结合机器学习算法,让策略动态优化参数。

## 总结

本策略总体是一个非常实用的DCA回测程序。它支持良好的自定义参数设置,可以灵活配置开仓和止盈规则。同时内置追踪止盈功能弥补固定止盈的不足。回测参数也十分灵活,可以测试不同品种和时间段的数据。如果参数设置得当,在交易机会多的品种中,利用DCA策略对冲系统风险,该策略可以获得非常不错的回测结果。但实盘时还需要警惕加仓和止盈风险,同时关注系统稳定性。如果继续优化参数设置和止损策略,该程序可以成为一个非常强大的DCA交易机器人。

||

## Overview

This is a backtesting strategy on the dollar cost averaging (DCA) mechanism to scale into positions after initial entry. It can add to the position based on preset price deviation percentage and pyramiding rules. The strategy also includes take profit and trailing take profit functions.

## Strategy Logic

The strategy first opens a long position at the close price once it is above 0 within the backtest timeframe. This entry price is recorded as the base price bo_level. It then places all possible exit orders on the current candle if no safety orders (so) exist. Specifically, the safety order price is calculated based on the last safety order price latest_so_level and the safety order step scale safe_order_step_scale. This loops until the max safety order count max_safe_order is reached. 

During holding positions, if position size is greater than 0, the take profit price take_profit_level is calculated based on the base price and target take profit percentage. If trailing take profit is disabled, this fixed take profit price is used. Otherwise, the highest price ttp_max is updated based on candle high to trail the take profit price for trailing take profit.

## Advantage Analysis

- Utilizes DCA mechanism to average down cost basis when price drops, hedging systemic risks.

- Supports customizable parameters for flexible configuration of entry rules and take profit strategy for different assets and trading styles.

- Has built-in trailing take profit functions to automatically adjust take profit based on price action, avoiding premature take profit trigger.

- Flexible backtest parameter settings make testing different timeframe data easy to evaluate strategy performance.

- Can directly configure live bots on 3commas using backtest results without extra coding.

## Risk Analysis

- DCA risks further increasing positions and losses if market continues downward. Reasonable pyramiding rules needed.

- Fixed percentage take profit unable to adjust to market volatility, risks premature or late exit. Trailing take profit needed.

- Backtest overfit risk, live performance affected by transaction costs etc. Proper evaluation required.

- Platform stability risks failed execution. Monitoring required.

## Optimization Directions 

- Dynamically adjust price deviation based on different assets' volatility to optimize pyramiding rules.

- Incorporate volatility indicators to determine more scientific take profit percentage.

- Set reasonable backtest timeframe based on trading sessions of specific assets.

- Introduce stop loss for cutting losses when position down significantly.

- Utilize machine learning to dynamically optimize parameters.

## Conclusion

Overall this is a very practical DCA backtester. It supports great customization for entry and take profit rules. The trailing take profit also complements the fixed take profit well. Flexible backtest parameters allow testing different assets and timeframes. With proper parameter tuning, this strategy can yield excellent results for high opportunity assets by hedging systemic risks with DCA. But risks like pyramiding and take profit should be watched for in live trading, along with platform stability. Further optimizations like dynamic parameters, stop loss can make this an extremely powerful DCA trading bot.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Price deviation to open safety orders (%)|
|v_input_2|true|Target Take Profit (%)|
|v_input_3|0.5|Trailing Take Profit (%) [0 = Disabled]|
|v_input_4|10|base order|
|v_input_5|20|safe order|
|v_input_6|2|Safety order volume scale|
|v_input_7|1.5|Safety order step scale|
|v_input_8|5|Max safe order|
|v_input_9|true|From Month|
|v_input_10|true|From Day|
|v_input_11|2021|From Year|
|v_input_12|true|To Month|
|v_input_13|true|To Day|
|v_input_14|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-18 00:00:00
end: 2023-09-25 00:00:00
period: 15h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © rouxam

// Author: rouxam
// Inspired by the original work of ericlin0122

//@version=4
// strategy("Backtesting 3commas DCA Bot", overlay=true, pyramiding=99, process_orders_on_close=true, commission_type=strategy.commission.percent, commission_value=0.1)

// Strategy Inputs
price_deviation         = input(1.0, type=input.float,  title='Price deviation to open safety orders (%)', minval=0.0, step=0.1)/100
take_profit             = input(1.0, type=input.float,  title='Target Take Profit (%)', minval=0.0, step=0.1)/100
ttp                     = input(0.5, type=input.float,  title='Trailing Take Profit (%) [0 = Disabled]', minval=0.0, step=0.1)/100
base_order              = input(10.0, type=input.float, title='base order') 
safe_order              = input(20.0, type=input.float, title='safe order') 
safe_order_volume_scale = input(2.0, type=input.float,  title='Safety order volume scale', step=0.1) 
safe_order_step_scale   = input(1.5, type=input.float,  title='Safety order step scale', step=0.1) 
max_safe_order          = input(5,                      title='Max safe order', minval=1, maxval=99, step=1) 

// Date Inputs
from_month = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
from_day   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
from_year  = input(defval = 2021, title = "From Year")
to_month   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
to_day     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
to_year    = input(defval = 9999, title = "To Year")
start  = timestamp(from_year, from_month, from_day, 00, 00)  // backtest start window
finish = timestamp(to_year, to_month, to_day, 23, 59)        // backtest finish window
window = time >= start and time <= finish ? true : false // create function "within window of time"

var bo_level = 0.0
var latest_so_level = 0.0
var next_so_level = 0.0
var ttp_active = false
var ttp_max = 0.0
var ttp_level = 0.0
var take_profit_level = 0.0

if strategy.position_size <= 0.0
    ttp_max := 0.0
    ttp_active := false


// First Position
if(strategy.opentrades == 0 and window and close > 0)
    // Place Buy Order ASAP
    bo_level := open
    strategy.entry("BO", limit=bo_level, long=strategy.long, qty=base_order/bo_level)
    latest_so_level := open

// Dollar Cost Averaging
place_safety_orders = latest_so_level == bo_level
if place_safety_orders
    // Placing all possible exit orders on that candle
    for i = 1 to max_safe_order
        next_so_level := latest_so_level * (1 - price_deviation * pow(safe_order_step_scale,  i - 1))
        so_name = "SO" + tostring(i) 
        strategy.entry(so_name, long=strategy.long, limit=next_so_level, qty=safe_order * pow(safe_order_volume_scale, i - 1)/next_so_level)
        latest_so_level := next_so_level

// Take Profit
if strategy.position_size > 0
    take_profit_level := strategy.position_avg_price * (1 + take_profit)
    if ttp <= 0.0
        // No trailing take profit
        strategy.exit(id="TP", limit=take_profit_level)
    else
        // Trailing take profit
        if take_profit_level <= close
            ttp_max := max(high, ttp_max)
            ttp_active := true
        if ttp_active 
            // Update exit order
            ttp_level := ttp_max * (1 - ttp)
            strategy.exit(id="TTP", stop=ttp_level)

```

> Detail

https://www.fmz.com/strategy/427900

> Last Modified

2023-09-26 17:28:27
