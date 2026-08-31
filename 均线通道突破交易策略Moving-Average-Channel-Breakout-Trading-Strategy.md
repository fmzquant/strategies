
> Name

均线通道突破交易策略Moving-Average-Channel-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1294de469823d7c7ab4.png)

## Overview

This strategy is based on the golden cross and death cross principles of simple moving averages, making buy and sell decisions based on the crossover of 7-day and 14-day moving averages. It generates a buy signal when the 7-day MA crosses above the 14-day MA from below, and a sell signal when the 7-day MA crosses below the 14-day MA from above. The strategy also features stop loss, take profit, and trailing stop functions to lock in profits and control risks.   

## Strategy Logic

The core trading logic of this strategy is based on the crossover principles of the 7-day and 14-day moving averages. The 7-day MA reflects short-term price trends, while the 14-day MA reflects medium-term trends. When the short-term MA crosses above the medium-term MA from below, it signals that the short-term trend is strengthening, making it a good time to go long. Conversely, when the short-term MA crosses below the medium-term MA from above, it signals that the short-term trend is weakening, so one should close positions or go short.  

Specifcally, this strategy calculates the 7-day and 14-day simple moving averages using the SMA indicator. After each candlestick forms, it compares the current values of the 7-day line and the 14-day line. If the 7-day line crosses above the 14-day line, a long signal is generated to go long. If the 7-day line crosses below the 14-day line, a short signal is generated to go short.   

In addition, the strategy also sets stop loss, take profit, and trailing stop functions to lock in profits and control risks. The parameters can be optimized based on backtest results.

## Advantages

This strategy has the following advantages:

1. Simple and clear rules, easy to understand and implement, suitable for beginners to learn.  
2. Moving average crossover principles are time-tested and effective, with relatively high win rates.   
3. Equipped with stop loss, take profit and trailing stop to effectively control risks.  
4. Few parameters, convenient for testing and optimization.

## Risks and Countermeasures   

There are also some risks with this strategy:

1. Moving averages may lag in reflecting trend changes, potentially causing large losses when trends reverse.
2. Frequent crossover signals duringranging markets generate more false signals, undermining strategy efficacy.   

To address these risks, the following countermeasures can be considered:  

1. Add other indicators like MACD and KDJ to filter crossover signals and avoid wrong signals at trend turning points.   
2. Expand stop loss range, shorten holding period to reduce single loss impact.
3. Optimize moving average parameters based on varying market conditions, using longer periods for ranging markets.  

## Optimization Directions

This strategy can be optimized in the following aspects:  

1. Test different MA combinations and parameters to find the optimal setup.  
2. Add other indicators for signal filtering to improve strategy efficacy.  
3. Optimize stop loss, take profit parameters to reduce drawdown and increase profit ratio.
4. Fine tune parameters based on different products and trading sessions.  

## Conclusion  

In conclusion, this strategy is very suitable for beginners to learn. The logic is simple and easy to understand and implement. It also has relatively good market adaptiveness, with ample room for parameter adjustment and optimization to achieve steady profits. It is worthwhile for quantitative trading beginners to use it for getting started and learning.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2019|backtest_year|
|v_input_2|true|backtest_month|
|v_input_3|true|backtest_day|
|v_input_4|true|Enable Stop Loss and Take Profit|
|v_input_5|true|Enable Trail Stop|
|v_input_6|0.2|buy_stop_loss|
|v_input_7|0.1|sell_stop_loss|
|v_input_8|0.4|buy_tp|
|v_input_9|0.2|sell_tp|
|v_input_10|1.1|trail_stop_long|
|v_input_11|0.9|trail_stop_short|
|v_input_12|0.05|trail_stop_long_offset|
|v_input_13|0.05|trail_stop_short_offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © bensonsuntw

strategy("Strategy Template[Benson]", pyramiding=1, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

backtest_year = input(2019, type=input.integer, title='backtest_year')
backtest_month = input(01, type=input.integer, title='backtest_month', minval=1, maxval=12)
backtest_day = input(01, type=input.integer, title='backtest_day', minval=1, maxval=31)
start_time = timestamp(backtest_year, backtest_month, backtest_day, 00, 00)
stop_loss_and_tp = input(title="Enable Stop Loss and Take Profit", type=input.bool, defval=true)
trail_stop = input(title="Enable Trail Stop", type=input.bool, defval=true)
buy_stop_loss = input(0.2, type=input.float, title='buy_stop_loss')
sell_stop_loss = input(0.1, type=input.float, title='sell_stop_loss')
buy_tp = input(0.4, type=input.float, title='buy_tp')
sell_tp =input(0.2, type=input.float, title='sell_tp')
trail_stop_long = input(1.1, type=input.float, title='trail_stop_long')
trail_stop_short = input(0.9, type=input.float, title='trail_stop_short')
trail_stop_long_offset = input(0.05, type=input.float, title='trail_stop_long_offset')
trail_stop_short_offset = input(0.05, type=input.float, title='trail_stop_short_offset')


// you can set your own logic here
shortCondition = crossunder(sma(close,7),sma(close,14))
longCondition = crossover(sma(close,7),sma(close,14))

strategy.entry("Buy", strategy.long, when=longCondition  )
strategy.close("Buy", when=shortCondition)
strategy.exit("Close Buy","Buy", limit= stop_loss_and_tp?strategy.position_avg_price * (1+buy_tp):na, stop = stop_loss_and_tp?strategy.position_avg_price * (1-buy_stop_loss):na,trail_price=trail_stop?strategy.position_avg_price *trail_stop_long:na,trail_offset=trail_stop?-strategy.position_avg_price *trail_stop_long_offset:na)

strategy.entry("Sell", strategy.short, when=shortCondition)
strategy.close("Sell", when=longCondition)
strategy.exit("Close Sell","Sell", limit= stop_loss_and_tp?strategy.position_avg_price * (1-sell_tp):na, stop = stop_loss_and_tp?strategy.position_avg_price * (1+sell_stop_loss):na,trail_price=trail_stop?strategy.position_avg_price *trail_stop_short:na,trail_offset=trail_stop?strategy.position_avg_price *trail_stop_short_offset:na)


net_profit = strategy.netprofit + strategy.openprofit

plot(net_profit, title="Net Profit", linewidth=2, style=plot.style_area, transp=50, color=net_profit >= 0 ? #26A69A : color.red)





```

> Detail

https://www.fmz.com/strategy/440334

> Last Modified

2024-01-29 14:31:25
