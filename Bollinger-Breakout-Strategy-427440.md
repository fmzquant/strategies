
> Name

Bollinger-Breakout-Strategy-427440

> Author

ChaoZhang

> Strategy Description



### Overview

This strategy is based on Bollinger Bands indicator, taking long or short positions when price breaks out of Bollinger Bands upper or lower lines. It aims to profit from catching breakout moves.

### Strategy Logic

1. Calculate Bollinger midline, upper and lower lines
2. Go long on lower line breakout; go short on upper line breakout
3. Set start and end time to define trading hours 
4. Set holding time, default to intraday exit  

Specifically, it first calculates the midline SMA of length length, and upper/lower lines of mult times standard deviation. When close breaks out upward from the lower line, go long. When close breaks down from the upper line, go short. Also set start and end time to limit trading hours. Exit before daily open.

The strategy attempts to capture expanding moves after price breaks out of bands. Breaking lower band indicates strengthening bullish forces, while breaking upper band means strengthening bearish forces, so trading in line with breakout is favorable.

### Advantage Analysis

1. Simple and intuitive, easy to understand and implement
2. Utilize Bollinger Bands to judge trend breakouts, has some trend following capacity 
3. Flexible parameter adjustment for different cycles and products
4. Intraday exit controls overnight risk
5. Can enable only long or short trading

### Risk Analysis 

1. False breakout risk. Price may retrace after initial breakout.
2. Need timely parameter tuning. Parameters need adjustments for different cycles.
3. Potential loss enlargement risk. Larger breakout range may expand losses.
4. Increased transaction costs. Frequent trading may increase transaction costs.

Risks can be reduced by optimizing entry rules, adding stop loss, introducing trend filter etc.

### Optimization Directions

1. Optimize parameters for different cycles
2. Add re-entry and pyramiding rules to follow trends
3. Introduce stop loss to control risks
4. Set trading hours to avoid significant news events
5. Test trend filters to avoid choppy price action
6. Evaluate different holding periods and compare results

### Summary

This is a breakout strategy based on Bollinger Bands. It profits from breakout moves. Pros are simple logic and easy implementation; Cons are susceptibility to false breakouts. Risks can be managed through parameter optimization, stop loss, trading hours control etc. It allows traders to understand basics of using indicators and trading breakouts.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|20|length|
|v_input_4|true|mult|
|v_input_5|1900|From Year|
|v_input_6|2100|To Year|
|v_input_7|true|From Month|
|v_input_8|12|To Month|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-21 00:00:00
end: 2023-09-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy("Noro's Bollinger Strategy v1.0", shorttitle = "Bollinger str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100.0, pyramiding = 5)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")

length = input(20, minval=1)
mult = input(1.0, minval=0.001, maxval=50)

fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")

source = close
basis = sma(source, length)
dev = mult * stdev(source, length)

upper = basis + dev
lower = basis - dev

up = close < lower
dn = close > upper
exit = (strategy.position_size > 0 and close > open) or (strategy.position_size < 0 and close < open)

if up
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, 01, 00, 00) and time < timestamp(toyear, tomonth, 31, 00, 00)))

if dn
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, 01, 00, 00) and time < timestamp(toyear, tomonth, 31, 00, 00)))
    
if time > timestamp(toyear, tomonth, 31, 00, 00) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/427440

> Last Modified

2023-09-21 10:38:13
