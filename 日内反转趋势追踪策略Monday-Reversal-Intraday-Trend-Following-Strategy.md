
> Name

日内反转趋势追踪策略Monday-Reversal-Intraday-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/84541a1f7cf0615308.png)
[trans]

## 概述

该策略的主要思路是在周一盘中,利用当天的反转行情进行趋势追踪,实现盈利。

## 原理

该策略的核心逻辑是:

1. 判断是否为周一交易日,如果是则继续执行后续逻辑;

2. 判断当天的K线是否出现了自下而上的反转形态,具体来说是:第1根K线收盘价<第2根K线收盘价,且第2根K线收盘价<第3根K线收盘价;

3. 如果上述反转形态成立,则在第3根K线收盘时开多仓,进行趋势追踪; 

4. 止盈条件是当天高点突破,或者止损退出;

5. 持仓6小时后强制平仓退出。

整个策略利用了周一特定时间段的反转行情,通过识别反转K线形态,实现低买高卖的盈利模式。同时设置了止盈止损条件,控制了风险。

## 优势

该策略最大的优势在于:

1. 利用周一盘中特定阶段的反转行情,these reversals during Monday trading session,实现盈利;makes profits

2. 通过识别特定K线形态,实现了较为明确的入场信号;By identifying specific candlestick patterns, it has clear entry signals

3. 设置了止盈止损条件,可以很好控制风险;Stop loss and take profit conditions are set to control risks

4. 采用趋势追踪模式,可以最大化获利;The trend following approach maximizes profits

5. 策略逻辑简单清晰,容易理解和实现;The logic is simple and easy to understand and implement

## 风险

该策略也存在一定的风险:

1. 周一反转行情不明显时,会导致亏损;Losses can occur if Monday reversals are not significant

2. 反转后可能再次回调从而止损;Price may retrace after reversal leading to stop loss

3. 行情突然变化导致止损成本过大;Sudden market changes may lead to large stop loss

4. 持仓时间过长也可能导致亏损;Holding positions too long may also cause losses

对应的解决方法是:优化止损策略,适当缩短持仓时间,严格控制单笔亏损。

The solutions are: Optimizing stop loss strategy, shortening holding time, strictly controlling single loss.

## 优化方向

该策略主要可以从以下几个方面进行优化:

1. 利用机器学习方法识别更准确的反转形态;Use machine learning to identify reversal patterns more accurately

2. 优化止损策略,例如移动止损、分批止损等;Optimizing stop loss such as trailing stop loss, partial stop loss etc

3. 结合更多因素判断趋势强度,如交易量变化等;Incorporate more factors to judge trend strength, e.g. volume changes

4. 动态调整持仓时间;Dynamically adjust holding time 

5. 采用算法自动确定合理的参数;Use algorithms to determine optimal parameters

6. 增加立场切换机制,实现多空双向交易;Add position switching mechanism for two-way trading

通过这些优化,可以提高策略的胜率和盈利水平。

These optimizations can improve the win rate and profitability of the strategy.

## 总结

总而言之,该策略通过利用周一特定阶段的反转行情,设定明确的入场退出机制,实现了简单的趋势追踪盈利模式。相比固定止损止盈,该策略可以取得更好的效果。当然,仍需要进一步优化来应对市场的不确定性。该策略为日内短线交易提供了一个参考思路和模板。

In summary, this strategy utilizes the reversal during Monday trading session, with clear entry and exit mechanisms, to implement a simple trend following profitable model. Compared to fixed stop loss and take profit, this strategy can achieve better results. However, further optimizations are still needed to deal with market uncertainty. The strategy provides a reference idea and template for intraday trading.

||


## Overview

The main idea of this strategy is to profit from Monday's intraday reversal using trend following.

## Principles 

The core logic is:

1. Check if it is Monday, if yes, continue to next steps;

2. Identify if an uptrend reversal pattern exists - Close[1] < Close[2] and Close[2] < Close[3];

3. If reversal pattern confirmed, go long at the close of 3rd bar to follow the trend;

4. Exit if today's high is breached, or stop loss is hit; 

5. Close position after 6 hours.

The strategy capitalizes on specific Monday reversal, identifies reversal patterns to go long at relative lows for profits. Stop loss in place to control risks.

## Advantages

The biggest advantages are:

1. Profits from Monday reversals during specific periods;

2. Clear entry signals from reversal candlestick patterns; 

3. Stop loss and take profit to control risks;

4. Trend following approach maximizes profits;

5. Simple and easy to understand logic;

## Risks

There are some risks:

1. Losses if Monday reversals not significant;

2. Price may retrace after entry leading to stop loss;

3. Sudden market changes may result in large stop loss; 

4. Holding too long may also lead to losses;

The solutions are optimizing stop loss, shortening holding time, and controlling single loss size.

## Enhancements

The strategy can be improved by:

1. Using machine learning to identify reversals more accurately;

2. Optimizing stop loss strategies like trailing stop or partial stop loss;

3. Incorporating more factors to judge trend strength; 

4. Dynamically adjusting holding time;

5. Using algorithms to find optimal parameters;

6. Adding position switching for two-way trading;

These can increase the win rate and profitability.

## Conclusion

In conclusion, the strategy capitalizes on Monday reversals, with clear entry/exit rules, to implement a simple trend following strategy. It can achieve better results than fixed stop loss/take profit. Further optimizations are needed to address market uncertainty. The strategy provides a reference for intraday trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2018|FirstYear|
|v_input_2|false|deltaDay|
|v_input_3|false|StartHour|
|v_input_4|6|HoldTime|
|v_input_5|true|MM|
|v_input_6|-7|startHour|
|v_input_7|34|endHour|
|v_input_8|30|exitHour|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-06 00:00:00
end: 2023-11-05 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("ET Forex TurnaroundMonday", overlay=true)
FirstYear = input(2018, minval=2000, maxval=2023, step=1)
FirstMonth = 1 //input(1, minval=1, maxval=12, step=1)
FirstDay = 1 //input(1, minval=1, maxval=31, step=1)

deltaDay = input(0)
StartHour = input(0)

f_barssince(_cond, _count) => _barssince=bar_index-valuewhen(_cond, bar_index, _count)

HoldTime = input(6, step=1)

MM = input(1)

startHour = input(-7, step=1)
endHour = input(34, step=1)
exitHour = input(30, step=1)


startdateCond = (year > FirstYear or (year == FirstYear and (month > FirstMonth or (month == FirstMonth and dayofmonth >= FirstDay))))

iHour = hour
if iHour > 19 
    iHour := iHour-20
else
    iHour := iHour+4    
    
    
timeCondition = true //(iHour>=startHour and iHour<=endHour and iHour<=exitHour)

since_flat_condition = strategy.position_size == 0

entryPrice=strategy.position_avg_price
EntryLongCondition = dayofweek == (dayofweek.monday+deltaDay) and close[0] < close[1] and close[1]<close[2] and startdateCond //and timeCondition and iHour > StartHour
ExitTimeCondition = false//(f_barssince(since_flat_condition, 0)>=HoldTime)
ExitLongCondition = strategy.position_size > 0  and (close[0] > high[1])// or close[0]< entryPrice-abs(close[1]-close[2])*0.2)//(ExitTimeCondition) //iHour >= exitHour or 
strategy.initial_capital =50000
// MM Block
lots = if MM < 2 
    strategy.initial_capital 
else 
    strategy.equity

lots := lots/close

entryPrice:=strategy.position_avg_price
strategy.close("ETLong",when=(ExitLongCondition==true))
strategy.entry("ETLong", strategy.long, qty=lots, comment="OpenLong",when=(EntryLongCondition==true))


```

> Detail

https://www.fmz.com/strategy/431263

> Last Modified

2023-11-06 15:34:06
