
> Name

基于海龟交易员策略的突破反转模型Breakout-Reversal-Model-Based-on-Turtle-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/731a9bb78d8cbc4e31.png)
 [trans]
## 概述

该策略基于著名的“海龟交易员策略”,该策略已经经过多年验证。它发送长仓和空仓信号,最多可进行5次金字塔订单,这意味着该策略可以在同一方向触发多达5个订单。具有良好的风险和资金管理。

需要注意的是,该策略结合了两个一起工作的系统(S1和S2)。

## 策略原理

仓位大小对于海龟交易员来说非常重要,以便妥善管理风险。该仓位调整策略适应市场波动性和账户(收益和损失)。它基于ATR(平均真实范围),也可以称为“N”。其长度默认为20。

买入的单位数为:

```
unit = (percentage_to_risk/100)*account/atr*syminfo.pointvalue
```

根据您的风险偏好,您可以增加账户的百分比,但是海龟交易员默认为1%。 如果您交易合约,则单位必须默认向下取整。

还有一个附加规则,用于在账户值低于初始资本时减少风险:在这种情况下,在单位公式中必须用下式替换:

``` 
account := (strategy.equity-strategy.openprofit)*(strategy.equity-strategy.openprofit)/strategy.initial_capital
```

有两个系统一起工作:
突破是一个新的高点或新低点。 如果这是一个新的高点,我们打开多头头寸,反之,如果这是一个新的低点,我们进入空头头寸。

我们添加一个额外的规则:
该额外规则允许交易员参与主要趋势,如果跳过了系统1信号。 如果跳过了系统1的信号,而下一根K线也是一个新的20日突破,则S1不会发出信号。 我们必须等待S2信号或等待不产生新的突破的K线来重新激活S1。

## 优势分析

海龟策略允许我们在价格走势对我们有利时向头寸添加额外的单位。 我将策略配置为允许在同一方向添加多达5个订单。 因此,如果价格从买入变化,我们会添加单位。 

我们将首订单(多头或空头)设置为最大订单。 后续的金字塔订单将比首个订单的单位数更少。 

我们为首个订单设置了10%的最大止损,这意味着您不会损失超过首个订单价值的10%。 然而,由于止损会增加/减少0.5 \* ATR(20),您的金字塔订单可能会损失更多,此时不会保证损失不超过10%。 风险仍然得到很好的管理,因为这些订单的价值低于首个订单的价值。 

## 风险分析

该策略最大的风险在于持仓过大。由于委托下单采用市价单,如果同时下达多笔巨额市价单,会对报价有很大的冲击,造成大额的滑点。这会造成极大的资金损失。

另一个风险就是不适当的资金管理配置。如止损配置错误或者比例过大,都会导致巨额亏损。这需要根据自己的风险偏好谨慎配置。

## 优化方向

该策略可以在以下几个方面进行优化:

1. 可以测试不同参数对收益率和夏普比率的影响,如ATR周期,止损的ATR倍数等。找到最优参数组合。

2. 可以测试不同的进场和出场规则。如用K线形态作为额外的过滤条件。

3. 可以尝试其他类型的止损方式,如移动止损,动态止损。这可能可以减少止损被击穿的概率。

4. 可以测试不同数量的金字塔订单。订单越多,杠杆和风险越大。找到最佳平衡点。

5. 可以尝试在特定的时间段内(如美国非农就业数据发布前)停止交易,以规避重大事件的冲击。

## 总结
该策略整体来说,风险收益平衡良好,适合中长线趋势交易。它具有交易系统化,风险可控等优势。通过优化,可以进一步提高策略的稳定性和收益率。

||

## Overview

This strategy is based on the famous "Turtle Trading Strategy", which has been validated over the years. It sends long and short signals with pyramid orders of up to 5, meaning that the strategy can trigger up to 5 orders in the same direction. With good risk and money management.  

It should be noted that the strategy combines 2 systems working together (S1 and S2).

## Strategy Logic  

Position sizing is very important for turtle traders to properly manage risk. This position sizing strategy adapts to market volatility and account (gains and losses). It is based on ATR (Average True Range), which can also be called "N". Its default length is 20.

The number of units to buy is:

```
unit = (percentage_to_risk/100)*account/atr*syminfo.pointvalue 
```

Depending on your risk appetite, you can increase the percentage of your account, but turtle traders default to 1%. If you trade contracts, units must be rounded down by default.  

There is also an additional rule to reduce risk if the value of the account falls below initial capital: in this case and only in this case, in the unit formula must be replaced by:  

```
account := (strategy.equity-strategy.openprofit)*(strategy.equity-strategy.openprofit)/strategy.initial_capital
```

2 systems work together:  
A breakout is a new high or new low. If it is a new high, we open a long position and vice versa if it is a new low we enter a short position.  

We add an additional rule:  
This additional rule allows the trader to be in major trends if the system 1 signal has been skipped. If a signal for system 1 has been skipped, and the next candle is also a new 20-day breakout, S1 does not give a signal. We have to wait for the S2 signal or wait for a candle that does not make a new breakout to reactivate S1.  

## Advantage Analysis   

The Turtle Strategy allows us to add extra units to the position if the price moves in our favor. I have configured the strategy to allow up to 5 orders to be added in the same direction. So if the price varies from, we add units with the position size formula.  

We have set a maximum SL of 10% for the first order, meaning you won't lose more than 10% of the value of your first order. However, it is possible to lose more on your pyramid orders, as the SL is increased/decreased by 0.5*ATR(20), which does not secure a loss of more than 10% on your pyramid orders.  

## Risk Analysis  

The biggest risk of this strategy is oversized positions. Since market orders are used for order placement, placing multiple huge market orders at the same time will have a huge impact on the quote, causing large slippage. This will lead to huge capital losses.  

Another risk is improper capital management configuration. For example, incorrect stop loss configuration or oversized proportions can lead to huge losses. This needs to be configured with caution according to one's own risk appetite.

## Optimization

The strategy can be optimized in the following aspects:  

1. Test the impact of different parameters such as ATR period, ATR multiplier for stop loss, etc. on return and sharpe ratio. Find the optimal parameter combination.

2. Test different entry and exit rules. For example, use candlestick patterns as additional filters.  

3. Try other types of stop losses, such as moving stop loss, dynamic stop loss. This may reduce the probability of stop loss being hit.  

4. Test different number of pyramid orders. The more orders, the greater the leverage and risk. Find the best balance point.

5. Try to stop trading during specific time periods (such as before the release of US Non-Farm Payrolls data) to avoid the impact of major events.  

## Summary  

Overall, this strategy strikes a good balance between risk and reward, suitable for medium and long term trend trading. It has the advantages of trading systematization, controllable risks. The strategy can be further improved by optimization to increase stability and return.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|true|(?Turtle Parameters)Risk % of capital|
|v_input_int_1|20|ATR period|
|v_input_float_2|1.5|Stop ATR|
|v_input_float_3|0.5|Pyramid Profit|
|v_input_int_2|20|S1 Long|
|v_input_int_3|55|S2 Long|
|v_input_int_4|10|S1 Long Exit|
|v_input_int_5|20|S2 Long Exit|
|v_input_int_6|15|S1 Short|
|v_input_int_7|55|S2 Short|
|v_input_int_8|7|S1 Short Exit|
|v_input_int_9|20|S2 Short Exit|
|v_input_1|timestamp(1 Jan 2020 00:00:00)|(?Backtesting Period)Start Date|
|v_input_2|timestamp(1 July 2034 00:00:00)|End Date|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © gsanson66


//This strategy is based on the famous "Turtle Strategy"
//A well-known strategy which proved its performance during past years 
//@version=5
strategy("TURTLE STRATEGY", overlay=true)


//------------------------------TOOL TIPS--------------------------------//

t1 = "Percentage of the account the trader is willing to lose. This percentage is used to define the position size based on previous gains or losses. Turtle traders default to 1%."
t2 = "ATR Length"
t3 = "ATR Multiplier to fix the Stop Loss"
t4 = "Pyramiding : ATR Multiplier to set a profit target to increase position size"
t5 = "System 1 enter long if there is a new high after this selected period of time"
t6 = "System 2 enter long if there is a new high after this selected period of time"
t7 = "Exit Long from system 1 if there is a new low after this selected period of time"
t8 = "Exit Long from system 2 if there is a new low after this selected period of time"
t9 = "System 1 enter short if there is a new low after this selected period of time"
t10 = "System 2 enter short if there is a new low after this selected period of time"
t11 = "Exit short from system 1 if there is a new high after this selected period of time"
t12 = "Exit short from system 2 if there is a new high after this selected period of time"


//----------------------------------------FUNCTIONS---------------------------------------//

//@function Displays text passed to `txt` when called.
debugLabel(txt, color) =>
    label.new(bar_index, high, text=txt, color=color, style=label.style_label_lower_right, textcolor=color.black, size=size.small)

//@function which looks if the close date of the current bar falls inside the date range
inBacktestPeriod(start, end) => true


//---------------------------------------USER INPUTS--------------------------------------//

//Risk Management and turtle system input
percentage_to_risk = input.float(1, "Risk % of capital", maxval=100, minval=0, group="Turtle Parameters", tooltip=t1) 
atr_period = input.int(20, "ATR period", minval=1, group="Turtle Parameters", tooltip=t2)
stop_N_multiplier = input.float(1.5, "Stop ATR", minval=0.1, group="Turtle Parameters", tooltip=t3)
pyramid_profit = input.float(0.5, "Pyramid Profit", minval=0.01, group="Turtle Parameters", tooltip=t4)
S1_long = input.int(20, "S1 Long", minval=1, group="Turtle Parameters", tooltip=t5)
S2_long = input.int(55, "S2 Long", minval=1, group="Turtle Parameters", tooltip=t6)
S1_long_exit = input.int(10, "S1 Long Exit", minval=1, group="Turtle Parameters", tooltip=t7)
S2_long_exit = input.int(20, "S2 Long Exit", minval=1, group="Turtle Parameters", tooltip=t8)
S1_short = input.int(15, "S1 Short", minval=1, group="Turtle Parameters", tooltip=t9)
S2_short = input.int(55, "S2 Short", minval=1, group="Turtle Parameters", tooltip=t10)
S1_short_exit = input.int(7, "S1 Short Exit", minval=1, group="Turtle Parameters", tooltip=t11)
S2_short_exit = input.int(20, "S2 Short Exit", minval=1, group="Turtle Parameters", tooltip=t12)
//Backtesting period
startDate = input(title="Start Date", defval=timestamp("1 Jan 2020 00:00:00"), group="Backtesting Period")
endDate = input(title="End Date", defval=timestamp("1 July 2034 00:00:00"), group="Backtesting Period")


//----------------------------------VARIABLES INITIALISATION-----------------------------//

//Turtle variables
atr = ta.atr(atr_period)
var float buy_price_long = na
var float buy_price_short = na
var float stop_loss_long = na
var float stop_loss_short = na
float account = na
//Entry variables
day_high_syst1 = ta.highest(high, S1_long)
day_low_syst1 = ta.lowest(low, S1_short)
day_high_syst2 = ta.highest(high, S2_long)
day_low_syst2 = ta.lowest(low, S2_short)
var bool skip = false
var bool unskip_buffer_long = false
var bool unskip_buffer_short = false
//Exit variables
exit_long_syst1 = ta.lowest(low, S1_long_exit)
exit_short_syst1 = ta.highest(high, S1_short_exit)
exit_long_syst2 = ta.lowest(low, S2_long_exit)
exit_short_syst2 = ta.highest(high, S2_short_exit)
float exit_signal = na
//Backtesting period
bool inRange = na


//------------------------------CHECKING SOME CONDITIONS ON EACH SCRIPT EXECUTION-------------------------------//
strategy.initial_capital = 50000
//Checking if the date belong to the range
inRange := inBacktestPeriod(startDate, endDate)

//Checking if the current equity is higher or lower than the initial capital to adjusted position size
if strategy.equity - strategy.openprofit < strategy.initial_capital
    account := (strategy.equity-strategy.openprofit)*(strategy.equity-strategy.openprofit)/strategy.initial_capital
else
    account := strategy.equity - strategy.openprofit

//Checking if we close all trades in case where we exit the backtesting period
if strategy.position_size!=0 and not inRange
    strategy.close_all()
    debugLabel("END OF BACKTESTING PERIOD : we close the trade", color=color.rgb(116, 116, 116))


//--------------------------------------SKIP MANAGEMENT------------------------------------//
    
//Checking if a long signal has been skiped and system2 is not triggered
if skip and high>day_high_syst1[1] and high<day_high_syst2[1]
    unskip_buffer_long := true

//Checking if a short signal has been skiped and system2 is not triggered
if skip and low<day_low_syst1[1] and low>day_low_syst2[1]
    unskip_buffer_short := true

//Checking if current high is lower than previous 20_day_high after a skiped long signal to set skip to false
if unskip_buffer_long
    if high<day_high_syst1[1]
        skip := false
        unskip_buffer_long := false

//Checking if current low is higher than previous 20_day_low after a skiped short signal to set skip to false
if unskip_buffer_short
    if low>day_low_syst1[1]
        skip := false
        unskip_buffer_short := false

//Checking if we have an open position to reset skip and unskip buffers
if strategy.position_size!=0 and skip
    skip := false
    unskip_buffer_long := false
    unskip_buffer_short := false


//--------------------------------------------ENTRY CONDITIONS--------------------------------------------------//

//We calculate the position size based on turtle calculation
unit = (percentage_to_risk/100)*account/atr*syminfo.pointvalue

//Long order for system 1
if not skip and not (strategy.position_size>0) and inRange
    strategy.cancel("Long Syst 2")
    //We check that position size doesn't exceed available equity
    if unit*day_high_syst1>account
        unit := account/day_high_syst1
    stop_loss_long := day_high_syst1 - stop_N_multiplier*atr
    //We adjust SL if it's greater than 10% of trade value and fix it to 10%
    if stop_loss_long < day_high_syst1*0.9
        stop_loss_long := day_high_syst1*0.9
    strategy.order("Long Syst 1", strategy.long, unit, stop=day_high_syst1)
    buy_price_long := day_high_syst1

//Long order for system 2
if skip and not (strategy.position_size>0) and inRange
    //We check that position size doesn't exceed available equity
    if unit*day_high_syst2>account
        unit := account/day_high_syst2
    stop_loss_long := day_high_syst2 - stop_N_multiplier*atr
    //We adjust SL if it's greater than 10% of trade value and fix it to 10%
    if stop_loss_long < day_high_syst2*0.9
        stop_loss_long := day_high_syst2*0.9
    strategy.order("Long Syst 2", strategy.long, unit, stop=day_high_syst2)
    buy_price_long := day_high_syst2

//Short order for system 1
if not skip and not (strategy.position_size<0) and inRange
    strategy.cancel("Short Syst 2")
    //We check that position size doesn't exceed available equity
    if unit*day_low_syst1>account
        unit := account/day_low_syst1
    stop_loss_short := day_low_syst1 + stop_N_multiplier*atr
    //We adjust SL if it's greater than 10% of trade value and fix it to 10%
    if stop_loss_short > day_low_syst1*1.1
        stop_loss_short := day_low_syst1*1.1
    strategy.order("Short Syst 1", strategy.short, unit, stop=day_low_syst1)
    buy_price_short := day_low_syst1

//Short order for system 2
if skip and not (strategy.position_size<0) and inRange
    //We check that position size doesn't exceed available equity
    if unit*day_low_syst2>account
        unit := account/day_low_syst2
    stop_loss_short := day_low_syst2 + stop_N_multiplier*atr
    //We adjust SL if it's greater than 10% of trade value and fix it to 10%
    if stop_loss_short > day_low_syst2*1.1
        stop_loss_short := day_low_syst2*1.1
    strategy.order("Short Syst 2", strategy.short, unit, stop=day_low_syst2)
    buy_price_short := day_low_syst2


//-------------------------------PYRAMIDAL------------------------------------//

//Pyramid for long orders
if close > buy_price_long + (pyramid_profit*atr) and strategy.position_size>0
    //We calculate the remaining capital
    remaining_capital = account - strategy.position_size*strategy.position_avg_price*(1-0.0018)
    //We calculate units to add to the long position
    units_to_add = (percentage_to_risk/100)*remaining_capital/atr*syminfo.pointvalue
    if remaining_capital > units_to_add
        //We set the new Stop loss
        stop_loss_long := stop_loss_long + pyramid_profit*atr
        strategy.entry("Pyramid Long", strategy.long, units_to_add)
        buy_price_long := close

//Pyramid for short orders
if close < buy_price_short - (pyramid_profit*atr) and strategy.position_size<0
    //We calculate the remaining capital
    remaining_capital = account + strategy.position_size*strategy.position_avg_price*(1-0.0018)
    //We calculate units to add to the short position
    units_to_add = (percentage_to_risk/100)*remaining_capital/atr*syminfo.pointvalue
    if remaining_capital > units_to_add
        //We set the new Stop loss
        stop_loss_short := stop_loss_short - pyramid_profit*atr
        strategy.entry("Pyramid Short", strategy.short, units_to_add)
        buy_price_short := close


//----------------------------EXIT ORDERS-------------------------------//

//Checking if exit_long_syst1 is higher than stop_loss_long
if strategy.opentrades.entry_id(0)=="Long Syst 1"
    if exit_long_syst1[1] > stop_loss_long
        exit_signal := exit_long_syst1[1]
    else
        exit_signal := stop_loss_long

//Checking if exit_long_syst2 is higher than stop_loss_long
if strategy.opentrades.entry_id(0)=="Long Syst 2"
    if exit_long_syst2[1] > stop_loss_long
        exit_signal := exit_long_syst2[1]
    else
        exit_signal := stop_loss_long

//Checking if exit_short_syst1 is lower than stop_loss_short
if strategy.opentrades.entry_id(0)=="Short Syst 1"
    if exit_short_syst1[1] < stop_loss_short
        exit_signal := exit_short_syst1[1]
    else
        exit_signal := stop_loss_short

//Checking if exit_short_syst2 is lower than stop_loss_short
if strategy.opentrades.entry_id(0)=="Short Syst 2"
    if exit_short_syst2[1] < stop_loss_short
        exit_signal := exit_short_syst2[1]
    else
        exit_signal := stop_loss_short

//If the exit order is configured to close the position at a profit, we set 'skip' to true (we substract commission)
if strategy.position_size*exit_signal>strategy.position_size*strategy.position_avg_price*(1-0.0018)
    strategy.cancel("Long Syst 1")    
    strategy.cancel("Short Syst 1")
    skip := true
if strategy.position_size*exit_signal<=strategy.position_size*strategy.position_avg_price*(1-0.0018)
    skip := false

//We place stop exit orders
if strategy.position_size > 0
    strategy.exit("Exit Long", stop=exit_signal)

if strategy.position_size < 0
    strategy.exit("Exit Short", stop=exit_signal)


//------------------------------PLOTTING ELEMENTS-------------------------------//

plotchar(atr, "ATR", "", location.top, color.rgb(131, 5, 83))
//Plotting enter threshold
plot(day_high_syst1[1], "20 day high", color.rgb(118, 217, 159))
plot(day_high_syst2[1], "55 day high", color.rgb(4, 92, 53))
plot(day_low_syst1[1], "20 day low", color.rgb(234, 108, 108))
plot(day_low_syst2[1], "55 day low", color.rgb(149, 17, 17))
//Plotting Exit Signal
plot(exit_signal, "Exit Signal", color.blue, style=plot.style_circles)
//Plotting our position
exit_long_syst2_plot = plot(exit_long_syst2[1], color=na)
day_high_syst2_plot = plot(day_high_syst2[1], color=na)
exit_short_syst2_plot = plot(exit_short_syst2[1], color=na)
day_low_syst2_plot = plot(day_low_syst2[1], color=na)
fill(exit_long_syst2_plot, day_high_syst2_plot, color=strategy.position_size>0 ? color.new(color.lime, 90) : na)
fill(exit_short_syst2_plot, day_low_syst2_plot, color=strategy.position_size<0 ? color.new(color.red, 90) : na)


```

> Detail

https://www.fmz.com/strategy/440371

> Last Modified

2024-01-29 16:48:00
