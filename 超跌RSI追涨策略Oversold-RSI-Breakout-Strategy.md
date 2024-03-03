
> Name

超跌RSI追涨策略Oversold-RSI-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略利用RSI指标判断加密货币是否处于超跌状态,如果RSI低于30就认为是超跌,这时买入,然后设置止损和止盈价格,如果达到止损价格就卖出止损,如果达到止盈价格就卖出止盈。

## 策略原理

1. 该策略使用RSI指标来判断入场时机。RSI指标是一种技术分析指标,通过计算价格变动速度和幅度来判断资产是否超买或超卖。RSI值范围在0到100之间,一般认为RSI高于70为超买区,RSI低于30为超卖区。

2. 当RSI指标低于30时,判断为超跌,这时买入开仓做多。

3. 开仓后设置止损和止盈价格。止损价格为入场价格的1%以下,止盈价格为入场价格的7%以上。

4. 如果价格跌破止损价格,则止损出场;如果价格超过止盈价格,则止盈出场。

## 策略优势分析

1. 利用RSI指标判断超跌来确定买入时机,可以在价格跌至低点时买入,获得较好入场价位。

2. 设置止损可以控制单笔损失。止损幅度较小,可以承受一定回调。

3. 设置止盈可以锁定盈利,不会错过涨幅。止盈幅度较大,让利润最大化。

4. 该策略回撤控制能力较强,风险较小。

## 策略风险分析

1. RSI指标发出超跌信号不一定代表价格反转,可能会继续下跌导致止损。

2. 止损幅度过小,如果回调过大可能被秒止损。

3. 止盈幅度过大,可能提前止盈无法持仓时间足够长。

4. �盘走势不佳时,该策略可能亏损较大。

## 策略优化方向

1. 可以结合其他指标确认RSI超跌信号,避免错误信号。例如KDJ指标等。

2. 可以根据不同币种的波动程度设置合适的止损止盈幅度。

3. 可以测试不同时间周期的参数设置,寻找最佳参数组合。

4. 可以根据回测结果优化仓位大小。

## 总结

该策略总体来说是一个比较稳健的超跌追涨策略。利用RSI指标判断超跌买入,可以在相对低位建仓。设置止损止盈来控制风险和锁定盈利。该策略回撤可控,适合长线持仓。可以根据不同市场情况优化参数,以获得更好的效果。

||

## Overview

This strategy uses the RSI indicator to determine if a cryptocurrency is oversold, and buys when the RSI is below 30, which is considered oversold. It then sets a stop loss and take profit price. If the stop loss price is hit, it will exit the position. If the take profit price is reached, it will close the position for profit.

## How it Works

1. The strategy uses the RSI indicator to identify entry signals. The RSI measures the speed and magnitude of price changes to determine if an asset is overbought or oversold. RSI ranges from 0 to 100, with above 70 considered overbought and below 30 oversold.

2. When the RSI drops below 30, the strategy enters a long position, betting on a trend reversal. 

3. After opening the position, a stop loss and take profit are set. The stop loss is set 1% below the entry price. The take profit is set 7% above the entry price.

4. If the price drops below the stop loss, the position is closed. If the price rises above the take profit, the position is closed for profit.

## Advantage Analysis

1. Using RSI to identify oversold conditions provides good entry points at relative lows. 

2. The tight stop loss controls risk on a per trade basis. It allows some drawdown before getting stopped out.

3. The take profit locks in profits from large upside moves.

4. This strategy has strong drawdown control and lower risk overall.

## Risk Analysis

1. RSI oversold signals don't always lead to a reversal, prices could continue falling leading to a stop loss.

2. The stop loss may be too tight, leading to premature stops if drawdown is large.

3. The take profit may be too wide, closing profits early and not letting winners run. 

4. The strategy could face large losses during choppy sideways markets.

## Optimization

1. Combining RSI with other indicators like KDJ could improve signal accuracy and avoid false signals.

2. Optimizing stop loss and take profit percentages based on volatility of different coins.

3. Testing different time frame parameters to find optimal combinations.

4. Optimizing position sizing based on backtest results.

## Conclusion

Overall this is a fairly robust oversold breakout strategy. Taking positions after RSI signals oversold provides good entry points at relatively low prices. The stop loss and take profit mechanics help control risk and lock in profits. Drawdowns are manageable which makes it suitable for longer term holdings. Parameters can be optimized according to changing market conditions for improved performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2020|From Year|
|v_input_4|true|Thru Month|
|v_input_5|true|Thru Day|
|v_input_6|2112|Thru Year|
|v_input_7|true|Show Date Range|
|v_input_8|30|oversold|
|v_input_9|true|v_input_9|
|v_input_10|7|v_input_10|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-18 00:00:00
end: 2023-09-25 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © brodieCoinrule

//@version=4
strategy(shorttitle='Oversold RSI with tight SL',title='Oversold RSI with tight SL Strategy (by Coinrule)', overlay=true, initial_capital = 1000, process_orders_on_close=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 50, commission_type=strategy.commission.percent, commission_value=0.1)
//Backtest dates
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 1,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 2020, title = "From Year",       type = input.integer, minval = 1970)
thruMonth = input(defval = 1,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12)
thruDay   = input(defval = 1,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31)
thruYear  = input(defval = 2112, title = "Thru Year",       type = input.integer, minval = 1970)

showDate  = input(defval = true, title = "Show Date Range", type = input.bool)

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => true       // create function "within window of time"

perc_change(lkb) =>
    overall_change = ((close[0] - close[lkb]) / close[lkb]) * 100



// RSI inputs and calculations
lengthRSI = 14
RSI = rsi(close, lengthRSI)
oversold= input(30)


//Entry 
strategy.entry(id="long", long = true, when = RSI< oversold and window())

//Exit
Stop_loss= ((input (1))/100)
Take_profit= ((input (7)/100))

longStopPrice  = strategy.position_avg_price * (1 - Stop_loss)
longTakeProfit = strategy.position_avg_price * (1 + Take_profit)

strategy.close("long", when = close < longStopPrice or close > longTakeProfit and window())


```

> Detail

https://www.fmz.com/strategy/427892

> Last Modified

2023-09-26 16:11:55
