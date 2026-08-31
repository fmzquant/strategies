
> Name

季节反转跨期交易策略Seasonal-Reversal-Intertemporal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19eec6b8c9fb6b5248a.png)

## Overview

This strategy is a reversal trading strategy based on seasonal effects. It establishes positions in specific entry months and closes positions in exit months to capture price reversals caused by seasonal effects.

## Strategy Principle 

The core logic of this strategy is to establish seasonal positions based on the entry and exit months selected by the user. Specifically, if the current month equals the entry month and no position has been established, a long or short position will be entered according to the direction. If the position has been established and the current month equals the exit month, the position will be closed.

For example, if October is selected as the entry month and January is selected as the exit month, new positions will be established every October in the long or short direction if there is no existing position. And existing positions will be closed every January. Relying on such logic, price reversals caused by seasonal effects can be captured.  

It should be noted that the strategy defaults to risk 25% of the account on each trade and charges 0.5% commission per trade. This will have some impact on the final profit.

## Advantage Analysis

The biggest advantage of this strategy is to profit from market reversals caused by seasonal effects. Many commodity and financial markets have significant seasonal price fluctuations. If appropriate entry and exit times are selected, such seasonal effect-induced reversal opportunities can be effectively captured.

In addition, this strategy is very simple and easy to understand and implement, suitable for beginners of quantitative trading. It relies only on two parameters, greatly reducing the difficulty of strategy optimization.

## Risk Analysis  

Although this strategy is effective, there are still some risks. Firstly, choosing inappropriate entry and exit times may fail to capture price reversals, resulting in losses. Secondly, changes in market conditions may also lead to weaker seasonal effects. Finally, the default stop loss logic is weak and cannot effectively control single trade losses.

To reduce risks, considerations can be given to optimizing the selection of entry and exit times, combining more analysis to judge market conditions, and setting stops to control risks. Of course, no trading strategy can completely avoid market risk, so traders need to treat it with caution.

## Optimization Directions

There is still much room for optimization of this strategy. Firstly, stop loss logic can be introduced to set reasonable stop loss ranges. Secondly, more different combinations of entry and exit can be tested to find the optimal parameters. Also, more factors can be considered to judge market conditions and avoid trading in unfavorable environments. Finally, introduce the exponential weighted algorithm to adjust the position size, increase the position size when profiting, and decrease the position size when losing.

Through the above optimizations, the stability of the strategy can be further improved and the tracking ability of the strategy can be enhanced. Of course, any optimization needs to be strictly backtested to avoid over optimization.

## Summary  

Overall, this seasonal reversal intertemporal trading strategy is very practical. By selecting appropriate entry and exit months, it effectively captures price reversals caused by seasonal effects to make profits. At the same time, this strategy is also very simple and easy to understand and implement, suitable for beginners in quantitative trading. Of course, traders also need to be aware of certain market risks and continuously optimize strategies in a targeted manner to adapt them to changes in market conditions.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Position Type: Long|Short|
|v_input_2|0|Entry Month: Oct|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Jan|Nov|Dec|
|v_input_3|0|Entry Month: Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-24 00:00:00
end: 2024-01-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © EmpiricalFX

//@version=4
strategy("Seasonality Benchmark ","Season",overlay=false,default_qty_type=strategy.percent_of_equity,
     default_qty_value=25,initial_capital=100000,currency="USD",
     commission_type=strategy.commission.percent,commission_value=0.5)
input_entry_direction = input("Long","Position Type",options=["Long","Short"])
input_entry_month = input("Oct","Entry Month",options=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"])
input_exit_month = input("Jan","Entry Month",options=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"])

//Convert three character month string to integer
month_str_to_int(m)=>
    ret = m == "Jan" ? 1 :
          m == "Feb" ? 2 :
          m == "Mar" ? 3 :
          m == "Apr" ? 4 :
          m == "May" ? 5 :
          m == "Jun" ? 6 :
          m == "Jul" ? 7 :
          m == "Aug" ? 8 :
          m == "Sep" ? 9 :
          m == "Oct" ? 10 :
          m == "Nov" ? 11 :
          m == "Dec" ? 12 : -1
          
is_long = input_entry_direction == "Long" ? true : false
entry = month_str_to_int(input_entry_month)
exit = month_str_to_int(input_exit_month)
var balance = strategy.equity

//Entering a position is conditional on:
    //1. No currently active trades
    //2. Input entry month matches current month
if(strategy.opentrades == 0 and entry == month)
    strategy.entry("Swing",is_long)

//Exiting a position is conditional on:
    //1. Must have open trade
    //2. Input exit month matches current month
if(strategy.opentrades > 0 and exit == month)
    strategy.close("Swing")
    
//Update the balance every time a trade is exited
if(change(strategy.closedtrades)>0)
    balance := strategy.equity
    
plot(strategy.equity,"Equity",color.orange)
plot(balance,"Balance",color.red)

    
```

> Detail

https://www.fmz.com/strategy/439970

> Last Modified

2024-01-25 14:07:35
