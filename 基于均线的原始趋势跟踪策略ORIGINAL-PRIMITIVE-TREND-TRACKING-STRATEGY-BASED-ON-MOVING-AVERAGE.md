
> Name

基于均线的原始趋势跟踪策略ORIGINAL-PRIMITIVE-TREND-TRACKING-STRATEGY-BASED-ON-MOVING-AVERAGE

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/168bc9ebfb73623be84.png)



## Overview  

This strategy is based on the body of the candle, combined with the EMA indicator to judge the market trend direction, to achieve the ORIGINAL PRIMITIVE TREND TRACKING effect. Go long when there is a large yang line, go short when there is a large yin line, so as to track the market trend.

## Strategy Principle

1. Calculate the average body length sbody of the last 30 K-line candles  
2. When the latest K-line is a yang line and the body length is greater than sbody/2, go long
3. When already long, if the latest K-line is a yin line, the body length is greater than sbody/2, and the current position is profitable, then close the long position  
4. When the latest K-line is a yin line and the body length is greater than sbody/2, go short
5. When already short, if the latest K-line is a yang line, the body length is greater than sbody/2, and the current position is profitable, then close the short position

## Advantage Analysis   

This strategy has the following advantages:

1. Original and simple, easy to understand and implement  
2. Based on candle structure judgment, has some effect on catching breakouts 
3. Track trends, can capture larger moves
4. Fast stop loss when profitable, helps lock in profits  

## Risk Analysis   

This strategy also has some risks:  

1. Unable to effectively filter false breakouts, may cause unnecessary losses
2. Judging only by candles is susceptible to slippage and gap influence
3. Did not consider the problem of excessive trading frequency  

Risks can be reduced by:

1. Combine with other indicators to filter signals
2. Set stop loss strategy 
3. Optimize parameters to control trade frequency  

## Optimization Directions   

This strategy can be optimized in the following aspects:  

1. Add breakout indicators to filter false breakouts  
2. Add stop loss strategy to reduce single loss  
3. Incorporate trend indicators to verify trend direction   
4. Parameter optimization to find the best parameter combination  

## Summary
This strategy belongs to the original simple trend tracking strategy. By judging candle structures, it can effectively track trend directions. At the same time, setting a fast stop loss mechanism can lock in profits. This strategy can supplement the trend tracking portfolio, but still needs to be optimized to reduce risks. It is worth further researching the effect of combining with other indicators in the future.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|true|Use body|
|v_input_4|true|Use UUP|
|v_input_5|1900|From Year|
|v_input_6|2100|To Year|
|v_input_7|true|From Month|
|v_input_8|true|To Month|
|v_input_9|true|From day|
|v_input_10|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-23 00:00:00
end: 2023-11-22 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title = "Noro's Primitive Strategy v1.0", shorttitle = "Primitive str 1.0", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100.0, pyramiding = 10)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
usebody = input(true, defval = true, title = "Use body")
useus = input(true, defval = true, title = "Use UUP")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(01, defval = 01, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Logic
body = abs(close - open)
sbody = ema(body, 30) / 2
bar = close > open ? 1 : close < open ? -1 : 0

//Signals
up = bar == -1 and (body > sbody or usebody == false) and (close < strategy.position_avg_price or strategy.position_size <= 0 or useus == false)
dn = bar == 1 and (body > sbody or usebody == false) and (close > strategy.position_avg_price or strategy.position_size >= 0 or useus == false)

//Trading
if up
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 00, 00)))

if dn
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 00, 00)))
    
if time > timestamp(toyear, tomonth, today, 00, 00)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/433015

> Last Modified

2023-11-23 15:54:37
