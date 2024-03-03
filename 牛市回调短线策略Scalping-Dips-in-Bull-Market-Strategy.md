
> Name

牛市回调短线策略Scalping-Dips-in-Bull-Market-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/641bede5c853b43121.png)
 [trans]
## 概述

牛市回调短线策略是一种趋势跟踪策略。它在牛市中买入回调,设置较大止损,以获利出场。该策略主要适用于牛市,可以获取超额收益。

## 策略原理

该策略首先计算最近一定周期内的收盘价变化幅度,当股价下跌超过设置的回调幅度时,即发出买入信号。同时,要求移动平均线高于收盘价,这是一个确认上升趋势的条件。

入场后,设置止损和止盈价格。止损幅度较大,达到资金充足的要求;止盈幅度较小,快速获利出场。在止损或止盈触发时,平仓离场。

## 优势分析

该策略具有以下优势:

1. 符合趋势操作的思路,可以获取超额收益
2. 回调幅度和趋势判断条件设置合理,确保操作准确性  
3. 止损幅度设计充分考虑了资金安全
4. 止盈设置迅速获利,回撤控制得当

## 风险分析

该策略也存在一定的风险:  

1. 回调过深或趋势反转,可能导致亏损
2. 大幅止损带来的回撤风险
3. 若行情平淡,止损止盈条件难以满足

对策:严格把控仓位规模,调整止损幅度,适当缩小止盈退出比例,降低风险。

## 优化方向  

该策略可以从以下几个方面进行优化:

1. 动态调整回调幅度,优化入场机会
2. 加入更多判断指标,提高决策的准确性
3. 结合波动性,动态调整止损止盈比例
4. 优化仓位管理,控制风险

## 总结

牛市回调短线策略,以较高的止损换取超额收益。它利用趋势判断和回调买入的配合,可以有效获取牛市行情带来的机会。通过参数调整和风险控制,可以获得较好的稳定收益。

||

## Overview

The Scalping Dips in Bull Market strategy is a trend-following strategy. It buys the dip during bull markets, sets a wide stop loss to lock in profits when exiting positions. This strategy is suitable for bull markets and can yield excess returns.

## Strategy Logic  

This strategy first calculates the percentage price change over a lookback period. When the price drops by more than the preset callback percentage, a buy signal is triggered. At the same time, the moving average line needs to be above the close price as a confirmation of the uptrend.

After entering a position, stop loss and take profit prices are set. The stop loss percentage is large to ensure sufficient funds; the take profit percentage is small for fast profit taking. When the stop loss or take profit is triggered, the position will be closed.

## Advantage Analysis

The advantages of this strategy are:

1. Aligns with the trend following methodology to obtain excess returns  
2. Reasonable callback percentage and trend criteria ensure accuracy
3. The stop loss design fully considers capital safety
4. Quick profit taking by take profit settings and drawdown control

## Risk Analysis   

There are also some risks with this strategy:

1. Overly deep retracement or trend reversal may lead to losses
2. Drawdown risk from the wide stop loss
3. Difficulty satisfying stop loss/profit conditions during range-bound markets  

Counter measures: Strictly control position sizing, adjust stop loss percentage, properly reduce take profit exit ratio to mitigate risks.

## Optimization Directions   

The strategy can be optimized in the following aspects:

1. Dynamically adjust the callback percentage to optimize entry opportunities
2. Add more indicators to improve decision accuracy  
3. Incorporate volatility measures to dynamically tune stop loss/profit ratios 
4. Optimize position sizing to better control risks

## Conclusion

The Scalping Dips in Bull Market strategy locks in excess returns using a wide stop loss. It capitalizes on buying callback dips in bull market trends for profit opportunities. Fine tuning parameters and risk controls can yield good steady returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|10|From Day|
|v_input_3|2020|From Year|
|v_input_4|true|Thru Month|
|v_input_5|true|Thru Day|
|v_input_6|2112|Thru Year|
|v_input_7|true|Show Date Range|
|v_input_8|true|Lookback Period|
|v_input_9|50|Moving Average|
|v_input_10|2|v_input_10|
|v_input_11|10|v_input_11|
|v_input_12|3|v_input_12|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-30 00:00:00
end: 2024-01-29 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Coinrule

//@version=3
strategy(shorttitle='Scalping Dips On Trend',title='Scalping Dips On Trend (by Coinrule)', overlay=true, initial_capital = 1000, default_qty_type = strategy.percent_of_equity, default_qty_value = 30, commission_type=strategy.commission.percent, commission_value=0.1)

//Backtest dates
fromMonth = input(defval = 1,  title = "From Month")     
fromDay   = input(defval = 10,    title = "From Day")       
fromYear  = input(defval = 2020, title = "From Year")       
thruMonth = input(defval = 1,    title = "Thru Month")     
thruDay   = input(defval = 1,    title = "Thru Day")     
thruYear  = input(defval = 2112, title = "Thru Year")       

showDate  = input(defval = true, title = "Show Date Range")

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => true

inp_lkb = input(1, title='Lookback Period')
 
perc_change(lkb) =>
    overall_change = ((close[0] - close[lkb]) / close[lkb]) * 100

// Call the function    
overall = perc_change(inp_lkb)

//MA inputs and calculations
MA=input(50, title='Moving Average')

MAsignal = sma(close, MA)

//Entry

dip= -(input(2))

strategy.entry(id="long", long = true, when = overall< dip and MAsignal > close and window()) 

//Exit
Stop_loss= ((input (10))/100)
Take_profit= ((input (3))/100)

longStopPrice  = strategy.position_avg_price * (1 - Stop_loss)
longTakeProfit = strategy.position_avg_price * (1 + Take_profit)

strategy.close("long", when = close < longStopPrice or close > longTakeProfit and window())
```

> Detail

https://www.fmz.com/strategy/440446

> Last Modified

2024-01-30 16:33:54
