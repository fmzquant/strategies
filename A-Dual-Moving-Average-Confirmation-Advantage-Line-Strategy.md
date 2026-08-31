
> Name

A-Dual-Moving-Average-Confirmation-Advantage-Line-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c9e3fc01451d05d5be.png)

### Overview  

This strategy is a long-only trend-following strategy that generates trading signals through the dual confirmation of the Aroon indicator and the Linear Regression Moving Average (LSMA) line. It is suitable for medium and long-term trend trading.

### Strategy Principles

This strategy uses the crossover of the upper and lower bands of the Aroon indicator to determine the trend direction. A buy signal is generated when the upper band crosses above the lower band from below. A sell signal is generated when the upper band crosses below the lower band from above. To avoid false breakouts, the strategy also introduces the LSMA line as an auxiliary judge. A buy signal is triggered only when the closing price is above the LSMA.

Specifically, the rules for generating trading signals are:  

1. Long entry signal: The upper band crosses above the lower band (Aroon indicator determines the upward trend) and the closing price of the day is above the LSMA line (the closing price is in an upward trend).

2. Long exit signal: The upper band crosses below the lower band (Aroon indicator determines the downward trend) and the closing price of the day is below the LSMA line (the closing price is in a downward trend).

### Advantages

1. Using Aroon indicator to determine the trend avoids noise interference  
2. Adding LSMA line to filter false breakouts
3. Only long, in line with the long-term upside of the broader market  
4. Simple parameters, easy to implement
   
### Risks

1. Only doing long, hard to profit in sideways market
2. Fixed parameters may lead to overfitting  
3. Hard to cut losses timely when trend reverses  

To mitigate risks, stop loss can be added, or other indicators can be used to determine trend reversal and cut losses in time.

### Optimization Directions

1. Consider adding shorting opportunities to profit from falling market
2. Test indicators with different cycle parameters  
3. Add machine learning module to automatically optimize parameters

### Summary

In summary, this is a relatively simple and practical dual confirmation trend following strategy. Using Aroon to determine the trend and LSMA to filter noise is straightforward. With proper parameter tuning, it can achieve decent results. It is suitable for mid-to-long-term holding to avoid noise. By adding modules like stop loss, the strategy can be further optimized to amplify its strengths and reduce risks.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Day|
|v_input_2|true|From Month|
|v_input_3|2010|From Year|
|v_input_4|31|To Day|
|v_input_5|12|To Month|
|v_input_6|2021|To Year|
|v_input_7|15|Aroon Legnth|
|v_input_8|20|Length LSMA|
|v_input_9_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-16 00:00:00
end: 2024-01-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=4

strategy(title = "Aroon Strategy long only", overlay = true,  pyramiding=1,initial_capital = 100, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.1)

//Time
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2010, title = "From Year", minval = 1970)
 //monday and session 
// To Date Inputs
toDay = input(defval = 31, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2021, title = "To Year", minval = 1970)

startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true

//INPUTS

length = input(15, minval=1, title="Aroon Legnth")
upper = 100 * (highestbars(high, length+1) + length)/length
lower = 100 * (lowestbars(low, length+1) + length)/length

lengthx = input(title="Length LSMA", type=input.integer, defval=20)
offset = 0//input(title="Offset", type=input.integer, defval=0)
src = input(close, title="Source")
lsma = linreg(src, lengthx, offset)


long = crossover(upper,lower) and close > lsma
longexit = crossunder(upper,lower) and close < lsma

if(time_cond)
    strategy.entry("long",1,when=long)
    strategy.close("long",when=longexit)

```

> Detail

https://www.fmz.com/strategy/439696

> Last Modified

2024-01-23 10:49:57
