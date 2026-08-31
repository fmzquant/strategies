
> Name

鲍威尔指数快速突破策略Fast-RSI-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b50f1ccc86b7d3ba7e.png)


## Overview

This strategy implements fast breakthrough operations based on RSI indicator and EMA of candlestick bodies. It identifies reversal signals using the fast formation of RSI and large candlestick bodies.  

## Strategy Logic

1. Calculate RSI indicator with period 7 and use RMA for acceleration.

2. Calculate EMA of candlestick body size with period 30 as benchmark for body size.

3. If RSI crosses above the limit line (default 30) and current candle body is larger than 1/4 of average body size, go long.

4. If RSI crosses below the limit line (default 70) and current candle body is larger than 1/4 of average body size, go short.

5. If already in position, close when RSI crosses back the limit line.

6. Parameters like RSI length, limit, reference price can be configured. 

7. Parameters like body EMA period, open position chroot multiplier can be configured.

8. The number of RSI crossings can be configured.

## Advantage Analysis  

1. Utilize the reversal attribute of RSI to capture reversals timely.

2. RMA accelerates RSI formation for more sensitive reversals. 

3. Filter small range consolidations with large candlestick bodies.

4. Sufficient backtest data ensures reliability.  

5. Customizable parameters adapt to different market environments.

6. Simple and clear logic.

## Risk Analysis

1. RSI has backtest bias, actual performance to be validated.

2. Large bodies cannot fully filter choppy markets.

3. Default parameters may not suit all products, optimization needed.

4. Win rate may not be high, need to endure consecutive losses mentally.

5. Risk of failed breakthrough, need timely stop loss.

## Optimization Directions

1. Optimize RSI parameters for different periods and products.

2. Optimize body EMA period to smooth body size.

3. Optimize body multiplier for open positions to control entry frequency. 

4. Add moving stop loss to ensure win rate.

5. Add trend filter to avoid counter trend trading.

6. Optimize money management for risk control.

## Conclusion

In summary, this is a very simple and direct reversal strategy. It utilizes both the reversal attribute of RSI and the momentum of large candlestick bodies to get in fast during market reversals. Although backtest results look good, actual performance is yet to be validated. Parameter optimization and risk control are needed when applying it. Overall it is a strategy with great value and is worth applying and constantly improving in live trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|7|RSI Period|
|v_input_4|30|RSI limit|
|v_input_5_close|0|RSI Price: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|true|RSI Bars|
|v_input_7|2018|From Year|
|v_input_8|2100|To Year|
|v_input_9|true|From Month|
|v_input_10|12|To Month|
|v_input_11|true|From day|
|v_input_12|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-23 00:00:00
end: 2023-10-23 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title = "Noro's Fast RSI Strategy v1.2", shorttitle = "Fast RSI str 1.2", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 5)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
rsiperiod = input(7, defval = 7, minval = 2, maxval = 50, title = "RSI Period")
limit = input(30, defval = 30, minval = 1, maxval = 100, title = "RSI limit")
rsisrc = input(close, defval = close, title = "RSI Price")
rb = input(1, defval = 1, minval = 1, maxval = 5, title = "RSI Bars")
fromyear = input(2018, defval = 2018, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Fast RSI
fastup = rma(max(change(rsisrc), 0), rsiperiod)
fastdown = rma(-min(change(rsisrc), 0), rsiperiod)
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))
uplimit = 100 - limit
dnlimit = limit

//RSI Bars
ur = fastrsi > uplimit
dr = fastrsi < dnlimit
uprsi = rb == 1 and ur ? 1 : rb == 2 and ur and ur[1] ? 1 : rb == 3 and ur and ur[1] and ur[2] ? 1 : rb == 4 and ur and ur[1] and ur[2] and ur[3] ? 1 : rb == 5 and ur and ur[1] and ur[2] and ur[3] and ur[4] ? 1 : 0
dnrsi = rb == 1 and dr ? 1 : rb == 2 and dr and dr[1] ? 1 : rb == 3 and dr and dr[1] and dr[2] ? 1 : rb == 4 and dr and dr[1] and dr[2] and dr[3] ? 1 : rb == 5 and dr and dr[1] and dr[2] and dr[3] and dr[4] ? 1 : 0

//Body
body = abs(close - open)
emabody = ema(body, 30)

//Signals
bar = close > open ? 1 : close < open ? -1 : 0
up = bar == -1 and (strategy.position_size == 0 or close < strategy.position_avg_price) and dnrsi and body > emabody / 4
dn = bar == 1 and (strategy.position_size == 0 or close > strategy.position_avg_price) and uprsi and body > emabody / 4
exit = ((strategy.position_size > 0 and fastrsi > dnlimit and bar == 1) or (strategy.position_size < 0 and fastrsi < uplimit and bar == -1)) and body > emabody / 2

//Trading
if up
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 00, 00)))

if dn
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 00, 00)))
    
if time > timestamp(toyear, tomonth, today, 00, 00) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/430017

> Last Modified

2023-10-24 11:51:56
