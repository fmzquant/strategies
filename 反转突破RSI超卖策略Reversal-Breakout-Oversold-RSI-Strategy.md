
> Name

反转突破RSI超卖策略Reversal-Breakout-Oversold-RSI-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/eaa3e77b3b8a08481f.png)
[trans]

## 概述

反转突破RSI超卖策略是一种利用相对强度指数(RSI)指标判断超卖情况,在价格反转时进入做多仓位的算法交易策略。该策略设置RSI阈值为30,当RSI低于30时判断为超卖状态,此时开启做多仓位。策略通过严格的止损和止盈规则来锁定盈利。

## 策略原理

反转突破RSI超卖策略使用14周期的RSI指标。当RSI指标低于30时,判断为超卖状态。这表明前一段时间价格持续下跌,目前处于超卖状态,市场即将出现反转,价格很可能转为上涨。策略在此时开启做多头寻求反转机会。 

具体来说,当RSI<30且处于回测时间窗口时,会触发做多信号开仓。然后设置止损位为入场价的1%下方,止盈位为入场价的7%上方。当价格高于止盈位或低于止损位时平仓离场。

整个策略通过判断超卖反转点入场,设置止损止盈来锁定盈利的方式进行资金增长。

## 优势分析

反转突破RSI超卖策略具有以下几个优势:

1. 捕捉超卖反转带来的做多机会,这是一种较为可靠的交易策略。

2. 利用RSI指标识别入场点,相比直接对价格建仓判断更为专业。

3. 严格的止损和止盈设置,可以有效控制单笔交易的风险和盈利。

4. 回测数据表明,该策略收益和胜率都较高。

5. 容易理解,新人也可以轻松使用。

## 风险分析

反转突破RSI超卖策略也存在一些风险,主要有以下几点:

1. 价格反转失败的概率依然存在。尽管RSI低于30会提高反转概率,但市场环境复杂多变,反转失败的情况也会出现,此时止损会被触发。

2. 止损点过于接近,出现止损碰撞的概率较大。可以适当放宽止损幅度。

3. 回测时间窗口设置不当,可能对测试结果产生偏差。应调整回测周期,全面评估策略效果。

4. 交易币种不当也会对收益产生影响。此策略最适合交易波动较大的币种。

## 优化方向  

反转突破RSI超卖策略还有一定的优化空间:

1. 调整RSI参数,测试不同参数对策略收益的影响。

2. 测试不同交易对,选择波动更大的币种。

3. 调整止损止盈参数,找到最优参数组合。适当扩大止损幅度也是一个方向。

4. 增加其他指标过滤,例如价格突破某一移动均线之后才入场。

5. 测试不同时间周期参数,寻找最佳入场时机。

## 总结

反转突破RSI超卖策略整体易于理解易于操作,通过捕捉超卖反转机会获取收益。策略最大优势在于容易掌握,新人也能使用。同时严格的止损止盈机制也使风险可控。下一步可以从调整参数、增加过滤指标等方向进行优化,使策略效果更出色。

||

## Overview

The Reversal Breakout Oversold RSI strategy is an algorithmic trading strategy that uses the Relative Strength Index (RSI) indicator to determine oversold situations and goes long when prices reverse. The strategy sets the RSI threshold at 30 - when the RSI is below 30, it is considered oversold, and at that time a long position is opened. The strategy locks in profits through strict stop loss and take profit rules.

## Strategy Logic

The Reversal Breakout Oversold RSI strategy uses a 14-period RSI indicator. When the RSI falls below 30, it is judged to be oversold. This indicates that prices have been falling continuously over the previous period and are currently in an oversold state, so the market is about to reverse and prices are likely to start rising. The strategy opens a long position at this time to seek reversal opportunities.

Specifically, when RSI <30 and within the backtest time window, a long signal is triggered to open a position. Then set the stop loss at 1% below the entry price and take profit at 7% above. When the price rises above the take profit or falls below the stop loss, close the position.

The whole strategy grows capital by identifying oversold reversal entry points and setting stop losses and take profits to lock in profits.

## Advantage Analysis 

The Reversal Breakout Oversold RSI Strategy has the following advantages:

1. Captures long opportunities brought about by oversold reversals, which is a relatively reliable trading strategy.

2. Uses the RSI indicator to identify entry points, which is more professional than direct price action.

3. Strict stop loss and take profit settings effectively control the risk and profit of each trade.

4. Backtest data shows that the strategy has high returns and win rate.  

5. Easy to understand, beginners can use it easily.

## Risk Analysis

The Reversal Breakout Oversold RSI strategy also has some risks:   

1. There is still a probability that the price reversal will fail. Although RSI below 30 increases the probability of reversal, market conditions are complex and changeable, and failures can still occur, triggering the stop loss at this time.

2. The stop loss point is too close with a high probability of stop loss clustering occurring. The stop loss amplitude can be appropriately relaxed.

3. Improper backtest time window settings can bias test results. The backtest period should be adjusted to fully evaluate strategy performance.  

4. Improper selection of trading tokens can also affect profits. This strategy works best on more volatile coins.

## Optimization

There is still room for optimization of the Reversal Breakout Oversold RSI Strategy:  

1. Adjust RSI parameters and test the impact of different parameters on strategy returns.

2. Test different trading pairs and select more volatile coins.  

3. Adjust stop loss and take profit parameters to find the optimal parameter combination. Appropriately widening the stop loss amplitude is also a direction.

4. Add other indicators filters, such as only entering after the price breaks a certain moving average.
  
5. Test different time period parameters to find the best entry timing.

## Summary

The Reversal Breakout Oversold RSI strategy is easy to understand and operate overall, capturing reversal opportunities from oversold situations to make profits. The biggest advantage of the strategy is that it is easy to grasp even for beginners. At the same time, the strict stop loss and take profit mechanism also makes the risk controllable. The next step is to optimize from directions like adjusting parameters and adding filter indicators to make the strategy performance even better.

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
start: 2023-12-14 00:00:00
end: 2023-12-18 19:00:00
period: 3m
basePeriod: 1m
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
window()  => time >= start and time <= finish ? true : false       // create function "within window of time"

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

https://www.fmz.com/strategy/436250

> Last Modified

2023-12-22 15:00:48
