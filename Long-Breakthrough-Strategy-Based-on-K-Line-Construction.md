
> Name

Long-Breakthrough-Strategy-Based-on-K-Line-Construction

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/984b88da5da1da1a25.png)

## Overview  

This strategy realizes long position breakout trading on the 4-hour line of Tesla by setting simple K-line pattern judgment rules. The strategy has the advantages of simple implementation, clear logic, easy to understand, etc.

## Strategy Principle 

The core judgment logic of the strategy is based on the following 4 K-line pattern rules:  

1. The lowest price of the current K-line is lower than the opening price  
2. The lowest price of the current K-line is lower than the lowest price of the previous K-line  
3. The closing price of the current K-line is higher than the opening price 
4. The closing price of the current K-line is higher than the opening price and closing price of the previous K-line  

When all 4 rules are met at the same time, a long position opening operation is performed.  

In addition, the strategy also sets stop loss and take profit to close positions when price triggers stop loss or take profit conditions.  

## Advantage Analysis   

The strategy has the following advantages:  

1. The K-line judgment rules used are very simple and straightforward, easy to understand, and easy to practice.
2. It is completely based on the judgment of price entities without the use of overly complex technical indicators, and the backtest results are straightforward.  
3. The code implementation is small in size, runs efficiently, and is easy to optimize and improve.
4. Stop loss and take profit can be flexibly set by adjusting parameters to control risks.   

## Risk Analysis   

The main risks to note are:   

1. Fixed quantity is used for opening positions without considering position sizing, which may pose risks of overtrading.  
2. No filters are set which may generate too many invalid trades in range-bound markets.
3. Insufficient backtest data may bias the judgment of the strategy performance.   

The following methods can be adopted to mitigate risks:  

1. Incorporate position sizing model to dynamically adjust trade size based on capital size.   
2. Add trade filters to avoid disorderly opening of trades in choppy market conditions. 
3. Collect more historical data to expand backtest duration and improve result reliability.  

## Optimization Directions   

Potential optimization directions for the strategy include:  

1. Incorporate position sizing module to determine trade size based on capital utilization ratio.    
2. Design stop loss and take profit trailing mechanisms for flexible exits.  
3. Add trade filters to avoid invalid trades.
4. Auto-optimize parameters using machine learning methods.  
5. Support spread trading across multiple products.   

## Conclusion  

This strategy realizes long breakthrough trading using simple K-line pattern rules. Although there is some room left for improvement, from the perspective of simplicity and directness, it is a very suitable long position strategy for beginners to understand and use. With continuous optimizations, the strategy performance can be further enhanced.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|true|Start Date|
|v_input_int_2|true|Start Month|
|v_input_int_3|2017|Start Year|
|v_input_int_4|8|End Date|
|v_input_int_5|3|End Month|
|v_input_int_6|2022|End Year|
|v_input_1|4|TakeProfit_long|
|v_input_2|4|StopLoss_long|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © TheQuantScience

//@version=5
strategy("SimpleBarPattern_LongOnly", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, currency = currency.EUR, initial_capital = 1000, commission_type = strategy.commission.percent, commission_value = 0.03)

// Make input options that configure backtest date range
startDate = input.int(title="Start Date",
     defval=1, minval=1, maxval=31)
startMonth = input.int(title="Start Month",
     defval=1, minval=1, maxval=12)
startYear = input.int(title="Start Year",
     defval=2017, minval=1800, maxval=2100)

endDate = input.int(title="End Date",
     defval=8, minval=1, maxval=31)
endMonth = input.int(title="End Month",
     defval=3, minval=1, maxval=12)
endYear = input.int(title="End Year",
     defval=2022, minval=1800, maxval=2100)
     
// Look if the close time of the current bar
// Falls inside the date range
inDateRange = true

// Setting Conditions 
ConditionA = low < open 
ConditionB = low < low[1]
ConditionC = close > open
ConditionD = close > open[1] and close > close[1]

FirstCondition = ConditionA and ConditionB 
SecondCondition = ConditionC and ConditionD
IsLong = FirstCondition and SecondCondition

TakeProfit_long = input(4.00)
StopLoss_long = input(4.00)
Profit = TakeProfit_long*close/100/syminfo.mintick
Loss = StopLoss_long*close/100/syminfo.mintick

EntryCondition = IsLong and inDateRange

// Trade Entry&Exit Condition 
if EntryCondition and strategy.opentrades == 0
    strategy.entry(id = 'Open_Long', direction = strategy.long)
    strategy.exit(id = "Close_Long", from_entry = 'Open_Long', profit = Profit, loss = Loss)






```

> Detail

https://www.fmz.com/strategy/437751

> Last Modified

2024-01-05 12:37:46
