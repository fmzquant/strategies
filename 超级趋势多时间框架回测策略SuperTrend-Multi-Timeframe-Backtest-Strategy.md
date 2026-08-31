
> Name

超级趋势多时间框架回测策略SuperTrend-Multi-Timeframe-Backtest-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15772766655312fcabd.png)



## Overview

The main idea of this strategy is to generate trading signals using the Supertrend indicator across multiple timeframes, and combine it with an intraday filter to square off open positions during the day, in order to implement multi-timeframe trading and improve signal quality.

## Strategy Logic

The strategy first calls the supertrend function, passing in the parameters mult and len, to generate the Supertrend line superTrend and direction dir. Then it plots the Supertrend line chart. The input parameter intrady controls whether to square off open positions intraday. If intrady is true, intraday open positions will be squared off after 2:45pm.

The signal generation rules are: when the close price is above the Supertrend line, a buy signal is generated; when the close price is below the Supertrend line, a sell signal is generated. When a buy signal is received, a buy order will be executed to open a long position; when a sell signal is received, a sell order will be executed to open a short position. If the intraday filter intrady is enabled, i.e. set to true, all open long and short positions will be closed after 2:45pm every day.

## Advantage Analysis 

The biggest advantage of this strategy is that it uses the simple but practical Supertrend indicator to implement multi-timeframe trading signals generation. Supertrend itself already has good win rate and return. In addition, this strategy includes an intraday filter to avoid losses caused by intense intraday fluctuations.

In addition, the strategy is very concise, it implements the core logic with very little code, which is easy to understand, modify and expand. This provides great flexibility for users to adjust parameters or add other indicators etc. according to their own needs.

## Risk Analysis

The main risk of this strategy is that the Supertrend indicator has some lag, which may lead to additional losses. In addition, the fixed multi-timeframe trading may also miss trading opportunities in the short term.

To mitigate these risks, it’s recommended to optimize the Supertrend parameters mult and len to find the optimal parameter combination. Other indicators can also be tested to complement Supertrend and utilize more factors to enhance the stability of the strategy. Furthermore, the fixed intraday square-off time can be removed and a dynamic mechanism can be used to determine the square-off timing based on volatility conditions.

## Optimization Directions

The main optimization directions for this strategy includes:

1. Test multiple sets of Supertrend parameters to find the optimal parameter combination.  

2. Add other technical indicators like candlestick patterns, moving average etc. to filter signals with more factors.

3. Optimize and dynamically adjust the specific intraday square-off timing to reduce premature square-off.  

4. Add stop loss mechanisms like fixed percentage stop loss or ATR stop loss.

5. Test suitable capital utilization ratio and position sizing strategies.  

6. Backtest longer time period to verify parameter robustness.

## Conclusion

In summary, this Supertrend multi-timeframe backtest strategy is very practical. It implements multi-timeframe trading with the simple Supertrend indicator and controls losses with the intraday filter. There is large room for optimization and users can adjust parameters or combine with other technical indicators according to their needs. The backtest performance is also relatively stable and reliable. Overall speaking, this strategy is suitable for medium-long term trend trading, and is also good for beginner to learn and practice modifications.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|mult|
|v_input_2|5|len|
|v_input_3|false|Do you want to exit intrday position|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-27 00:00:00
end: 2023-12-04 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

//@Gurjant_Singh IISMA-Indian Institute of stock Market Analysis 

strategy("SupterTrend ", overlay=true, initial_capital=100000, default_qty_type=strategy.percent_of_equity, default_qty_value=300, calc_on_order_fills=false, calc_on_every_tick=false)




mult = input(type=input.float, defval=3)
len = input(type=input.integer, defval=5)
[superTrend, dir] = supertrend(mult, len)



plot(superTrend)

intrady = input(false, "Do you want to exit intrday position", type = input.bool)

IntraDay_SquareOff = minute >= 45 and hour >= 14



buy = close > superTrend

sell = close < superTrend

if buy
    strategy.entry("Buy", true)
    
if sell
    strategy.entry("sell", false)

if intrady and IntraDay_SquareOff
    strategy.close("buy")
    strategy.close("sell")





```

> Detail

https://www.fmz.com/strategy/434295

> Last Modified

2023-12-05 10:59:54
