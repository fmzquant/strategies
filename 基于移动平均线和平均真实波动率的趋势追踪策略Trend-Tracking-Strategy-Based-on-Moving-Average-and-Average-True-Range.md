
> Name

基于移动平均线和平均真实波动率的趋势追踪策略Trend-Tracking-Strategy-Based-on-Moving-Average-and-Average-True-Range

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d210d94c43fbe9f09a.png)

## Overview

This strategy uses moving average and average true range to determine the market trend direction for trend tracking trading.

## Principles  

This strategy uses the moving average ma of len periods and 2 times the average true range atr of len periods to determine the market trend. The specific rules are:

When the low is greater than the moving average plus the average true range (low > ma + atr), it is judged as an upward trend.
When the high is less than the moving average minus the average true range (high < ma - atr), it is judged as a downward trend.  

In other cases, the previous judgment is maintained.

When an upward trend is determined, go long at a certain percentage when allowed to go long. 
When a downward trend is determined, go short at a certain percentage when allowed to go short.  

The closing condition is to reach the specified trading end date.

## Advantage Analysis  

The advantages of this strategy are:

1. Use moving average to determine general trend direction and avoid being misled by short-term market fluctuations. 
2. Use average true range to set dynamic stop loss, which is conducive to risk control.
3. Can capture trend opportunities in a timely manner following the trend, with high profit potential.  
4. Simple and easy to operate rules.  

## Risk Analysis   

The main risks faced by this strategy are:

1. It is prone to multiple losses in a sharply fluctuating market.  
2. Unable to effectively determine trend reversal points, there is a risk of chasing highs and killing lows.
3. Improper parameter settings of average true range may result in exit points that are too loose or too strict.

Solutions:  

1. Adjust moving average parameters appropriately to use more stable parameters.
2. Confirm signals with other indicators to avoid chasing highs and killing lows.
3. Optimize and test the average true range parameters to set appropriate parameters.  

## Optimization Directions

The strategy can be optimized from the following aspects:  

1. Test different moving average systems to find more stable parameter combinations.  
2. Add other auxiliary indicators to judge the reliability of signals.  
3. Test the average true range parameters to find the optimal parameters.  
4. Optimize capital utilization through leverage to increase return on capital.
5. Combine machine learning and other methods to achieve dynamic parameter optimization.   

## Summary  

The overall idea of ​​this strategy is clear and easy to understand. It uses moving averages to determine trend direction and uses average true range to set stops. It can effectively track trends. But there are certain risks, and further optimization of parameter settings and adding other judgment indicators are needed. In general, this strategy provides a viable approach for trend tracking trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|100|Capital, %|
|v_input_4|30|MA Length|
|v_input_5_ohlc4|0|MA Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_6|false|limitmode|
|v_input_7|1900|From Year|
|v_input_8|2100|To Year|
|v_input_9|true|From Month|
|v_input_10|12|To Month|
|v_input_11|true|From day|
|v_input_12|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-04 00:00:00
end: 2024-01-11 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//2019
//Noro

//@version=4
strategy(title = "Noro's MA+ATR Strategy", shorttitle = "MA+ATR str", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")
len = input(30, minval = 2, title = "MA Length")
src = input(ohlc4, title = "MA Source")
limitmode = input(false)
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//MA + BG
atr = sma(tr, len) * 2
ma = sma(src, len)
plot(ma, color = color.blue, linewidth = 4)
trend = 0
trend := low > ma + atr ? 1 : high < ma - atr ? -1 : trend[1]
col = trend == 1 ? color.lime : color.red
bgcolor(col, transp = 70)

//Trading
lot = 0.0
lot := strategy.position_size != strategy.position_size[1] ? strategy.equity / close * capital / 100 : lot[1]
if trend == 1 and limitmode == false
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot)
if trend == -1 and limitmode == false
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot)
if trend == 1 and limitmode
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot)
if trend == -1 and limitmode
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot)
// if time > timestamp(toyear, tomonth, today, 23, 59)
//     strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/438456

> Last Modified

2024-01-12 11:14:01
