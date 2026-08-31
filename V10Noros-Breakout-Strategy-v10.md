
> Name

V10Noros-Breakout-Strategy-v10

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy trades based on price breakouts beyond recent extremes. It calculates highest high and lowest low over a period and generates signals when price breaks these levels.

## How it Works

1. Calculate highest high upex and lowest low dnex over N periods.

2. Go long when price breaks above upex. 

3. Go short when price breaks below dnex.

4. Configurable for long only, short only or both directions.

5. Configurable capital utilization rate. 

6. Configurable trading time range.

## Advantages

- Captures breakout signals, good for trend trading
- Simple and intuitive rules, easy to implement
- Directional config adapts to different markets
- Can limit trading time range
- Controls capital utilization  

## Risks

- Unable to filter false breakouts effectively 
- Two-way trading increases costs
- High capital utilization increases risk
 
## Optimization Directions

- Add validation to avoid false breakouts
- Optimize N value for optimum performance
- Additional filters to screen signals
- Test different capital utilization rates
- Limit number of trades per day

## Conclusion

The strategy follows trends using price breakout signals. Enhancing breakout validity and tuning parameters can improve performance. But false breakouts and risk controls need to be addressed. Overall a simple and effective trend trading solution.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|100|Capital, %|
|v_input_4|4|Length|
|v_input_5|true|Show Lines?|
|v_input_6|1900|From Year|
|v_input_7|2100|To Year|
|v_input_8|true|From Month|
|v_input_9|12|To Month|
|v_input_10|true|From day|
|v_input_11|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-18 00:00:00
end: 2023-09-20 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's Brakeout Strategy v1.0", shorttitle = "Brakeout str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")
len = input(4, defval = 4, minval = 1, maxval = 1000, title = "Length")
showlines = input(true, defval = true, title = "Show Lines?")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Extremums
upex = highest(high, len)
dnex = lowest(low, len)
col = showlines ? blue : na
plot(upex, color = col, linewidth = 2)
plot(dnex, color = col, linewidth = 2)

//Trading
lot = strategy.position_size == 0 ? strategy.equity / close * capital / 100 : lot[1]

if (not na(close[len]))
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)), stop = upex + syminfo.mintick)
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)), stop = dnex - syminfo.mintick)

if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/427469

> Last Modified

2023-09-21 15:09:43
