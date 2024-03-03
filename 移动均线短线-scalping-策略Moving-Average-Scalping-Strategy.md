
> Name

移动均线短线-scalping-策略Moving-Average-Scalping-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

本策略属于短线 scalping 策略类型,其目标是频繁开仓平仓,通过小额盈利并控制下行风险来实现稳定收益。策略通过均线指标判断可能的反转点入场做多,并设定快速止盈目标来锁定小额利润。

## 策略原理

该策略使用 4 个移动均线,分别是 9 周期、50 周期、100 周期和 200 周期均线。

具体交易规则为:

- 9 周期均线上穿 50 周期均线时做多入场
- 50 周期均线低于 100 周期均线
- 100 周期均线低于 200 周期均线

这样的组合判断可以找到价格短期处于下跌但可能反转的时机点做多。

平仓规则为 9 周期均线上穿 200 周期均线时平多仓。这里设置一个较近的止盈目标,旨在通过频繁小额盈利实现稳定收益。

## 策略优势

- 频繁开平仓,有效控制单笔亏损
- 利用均线判断反转点,找到潜在买点
- 设定较近止盈点,锁定小额确定利润
- 降低持仓时间,减少大趋势影响
- 资金利用率高,适合小资金量增长

## 策略风险

- 均线判断滞后,可能错过最佳进入时点
- 盈利空间小,易受交易费用影响  
- 较多无效交易,交易频繁造成时间和精力成本
- 止盈点过于保守,未能充分跟随趋势
- 难以在盘整市场获得盈利

可以通过以下方法降低风险:

- 优化均线参数,提高买点判断准确性
- 适当放宽止盈 EXIT,追求更多趋势利润
- 加入其他技术指标进行确认,减少无效交易
- 优化资金利用率和仓位管理
- 考虑usch

## 优化方向

该策略可以从以下几个方面进行优化:

1. 优化均线参数组合

   测试更多均线周期参数,找到更准确判断反转的组合。

2. 放宽止盈点

   适当放宽止盈距离,追求更多趋势利润。

3. 加入其他技术指标

   例如 KDJ、MACD 等,进行确认,减少无效交易。 

4. 优化仓位管理

   设定仓位大小根据具体止盈点和止损点进行动态调整。

5. 加入重新入场机制

   在止盈出场后,如果趋势继续,可以考虑通过条件重新入场。

## 总结

本策略属于短线 scalping 策略类型,通过判断短期反转的均线组合形成交易信号,并设定较近止盈来频繁获利。这可以有效控制单笔损失和风险,适合于小资金量的增长。但存在盈利空间小、交易频繁等问题。我们可以通过参数优化、止盈调整、加入指标过滤等方法进行改进,在保持其优势的基础上,进一步扩大盈利空间,使策略更稳定高效。同时要注重持续学习其他更多元化的策略思路。

|| 

## Overview 

This strategy belongs to the scalping strategy type, aiming to open and close positions frequently to profit from small gains while limiting downside risks. It identifies potential reversal points with moving averages to go long, and sets tight take profit targets to lock in small profits.

## Strategy Logic

The strategy uses 4 moving averages - 9, 50, 100, and 200 periods. 

The specific trading rules are:

- Go long when 9 MA crosses above 50 MA
- 50 MA is below 100 MA 
- 100 MA is below 200 MA

This combination identifies situations when price is in short-term downtrend but a reversal may occur.

Exit rule is when 9 MA crosses above 200 MA. A near profit target is used to lock in frequent small gains for steady profits.

## Advantages

- Frequent opening and closing controls single loss
- MA crossover catches potential bottoms  
- Near profit target locks in small certain wins
- Reduced holding time minimizes trend influence
- High capital utilization suitable for small accounts

## Risks

- MA lag may miss best entry points
- Small profit range vulnerable to fees
- More invalid trades increase time and energy costs
- Excessively conservative TP fails to ride trends  
- Hard to profit in range-bound markets

Risks can be reduced by:

- Optimizing MA parameters for better signal accuracy
- Relaxing TP to capture more trend profits 
- Adding other indicators for confirmation, reducing invalid trades
- Optimizing capital utilization and position sizing
- Considering re-entries

## Optimization Directions

The strategy can be improved by:

1. Optimizing MA combinations

   Testing more MA periods for better reversal detection.

2. Widening take profit levels

   Allow wider TP distance for more trend profits.

3. Adding other indicators 

   Such as KDJ, MACD for confirmation to reduce invalid trades.

4. Position sizing optimization

   Dynamically size positions based on specific TP and SL.

5. Adding re-entry rules

   Consider re-entering after TP if trend continues.

## Summary

This scalping strategy identifies potential short-term reversals with MA combinations for frequent small profits. This effectively controls single loss and risks, making it suitable for small accounts growth. However limitations exist like small profit range and excessive trades. Improvements can be made via parameter tuning, TP adjusting, adding filters etc, to expand profits while retaining its strengths, making the strategy more robust and efficient. Also continuously learning other more advanced strategies is important.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|10|From Day|
|v_input_3|2019|From Year|
|v_input_4|true|Thru Month|
|v_input_5|true|Thru Day|
|v_input_6|2112|Thru Year|
|v_input_7|true|Show Date Range|
|v_input_8|9|v_input_8|
|v_input_9|50|v_input_9|
|v_input_10|200|v_input_10|
|v_input_11|100|v_input_11|
|v_input_12|2|v_input_12|
|v_input_13|8|v_input_13|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-21 00:00:00
end: 2023-09-20 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//strategy(shorttitle='Moving Average Scalper (by Coinrule)',title='Moving Average Scalper', overlay=true, initial_capital = 1000, default_qty_type = strategy.percent_of_equity, default_qty_type = strategy.percent_of_equity, default_qty_value = 30, commission_type=strategy.commission.percent, commission_value=0.1)

//Backtest dates
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 10,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 2019, title = "From Year",       type = input.integer, minval = 1970)
thruMonth = input(defval = 1,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12)
thruDay   = input(defval = 1,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31)
thruYear  = input(defval = 2112, title = "Thru Year",       type = input.integer, minval = 1970)

showDate  = input(defval = true, title = "Show Date Range", type = input.bool)

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => true       // create function "within window of time"

//MA inputs and calculations
movingaverage_signal = sma(close, input(9))
movingaverage_fast = sma(close, input(50))
movingaverage_slow = sma(close, input(200))
movingaverage_mid= sma(close, input(100))

//Entry 
bullish = crossover(movingaverage_signal, movingaverage_fast)

strategy.entry(id="long", long = true, when = bullish and movingaverage_fast < movingaverage_mid and movingaverage_mid < movingaverage_slow and window())

//Exit

bearish = crossover(movingaverage_signal, movingaverage_slow)


Stop_loss= ((input (2))/100)
Take_profit= ((input (8))/100)

longStopPrice  = strategy.position_avg_price * (1 - Stop_loss)
longTakeProfit = strategy.position_avg_price * (1 + Take_profit)

strategy.close("long", when = bearish)

// close < longStopPrice or close > longTakeProfit and window())

//PLOT
plot(movingaverage_signal, color=color.black, linewidth=2 )
plot(movingaverage_fast, color=color.orange, linewidth=2)
plot(movingaverage_slow, color=color.purple, linewidth=2)
plot(movingaverage_mid, color=color.blue, linewidth=2)

```

> Detail

https://www.fmz.com/strategy/427508

> Last Modified

2023-09-21 20:41:15
