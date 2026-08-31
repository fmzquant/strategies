
> Name

Extremum-Reversion-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ef74cb8c02fc0b6d53.png)

## Overview
The extremum reversion tracking strategy tracks the extremum points of price fluctuation range and makes reversal long/short positions at extremum points to track trends.

## Strategy Principle  
The strategy is mainly based on the following principles:  

1. Use security function to obtain high and low prices of different cycle K-lines to detect whether they are equal to previous ones, so as to judge if new extremum points are reached.

2. When new extremum points are detected, make short position if it is currently a bull market, and make long position if it is currently a bear market.  

3. Set stop loss point as the new extremum point formed after long/short position is made to track trends with stop loss.

4. Set the effective time range of the strategy by configuring start year, month and date to make adjustments for different time periods.

## Advantages
The main advantages of this strategy are:

1. Effectively capture extremum points of price changes and make reversal positions to track trends. 

2. Configure time and risk management to control usage time and capital of the strategy to reduce risks.

3. Use new extremum points as stop loss points to dynamically adjust stop loss positions based on new price fluctuation range.

4. Simple and clear strategy logic for easy understanding, debugging and optimization.

## Risks
There are also some risks for this strategy:

1. There could be misjudgement in determining extremum points, causing errors in long/short positions. The logic can be optimized.

2. Stop loss position is close to entry point, increasing the probability of stop loss being triggered. Floating stop loss can be used.

3. No consideration on pyramiding positions along trends and reverse positions, less profitable in trending markets. Related logics can be added.  

4. Currency and time range configuration is quite rigid, cannot make dynamic adjustments. Parameter optimization system can be introduced.

## Optimization Directions
The strategy can be optimized in the following aspects:

1. Optimize extremum point logic with more filters to avoid misjudgement.  

2. Add floating stop loss mechanism based on price and volatility changes to adjust stop loss distance.

3. Introduce pyramiding and reverse position modules based on trends and volatility to improve profitability.

4. Establish parameter optimization mechanism for automatic testing and parameter tuning.

5. Incorporate machine learning models to assist strategy decision making.  

## Summary 
The extremum reversion tracking strategy works by capturing price extremums and tracking trends, adaptable and profitable. Further optimizations on extremum judgement, stop loss mechanism, position opening rules etc. could shape it into a solid quantitative trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|false|Short|
|v_input_3|100|Capital, %|
|v_input_4|W|Timeframe for extremums|
|v_input_5|1900|From Year|
|v_input_6|2100|To Year|
|v_input_7|true|From Month|
|v_input_8|12|To Month|
|v_input_9|true|From day|
|v_input_10|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 6h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's Extremum Strategy v1.0", shorttitle = "Extremum str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(false, defval = false, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")
tf = input('W', title = 'Timeframe for extremums')
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Levels
highm = request.security(syminfo.tickerid, tf, high[1])
lowm = request.security(syminfo.tickerid, tf, low[1])
upcolorm = highm == highm[1] ? lime : na
dncolorm = lowm == lowm[1] ? red : na
plot(highm, color = upcolorm, linewidth = 3)
plot(lowm, color = dncolorm, linewidth = 3)

//Signals
size = strategy.position_size
up = size > 0 ? highm * 1000000 : highm != highm[1] ? highm : up[1]
dn = size < 0 ? 0 : lowm != lowm[1] ? lowm : dn[1]
exit = true

//Trading
lot = strategy.position_size != strategy.position_size[1] ? strategy.equity / close * capital / 100 : lot[1]

if highm > 0 and high[1] < highm and highm == highm[1]
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot, stop = up)
    
if lowm > 0 and low[1] > lowm and lowm == lowm[1]
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot, stop = dn)

if exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/442248

> Last Modified

2024-02-20 15:17:41
