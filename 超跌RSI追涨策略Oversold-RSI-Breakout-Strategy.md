
> Name

超跌RSI追涨策略Oversold-RSI-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


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
