
> Name

Nik-Stoch

> Author

ChaoZhang

> Strategy Description

Stochastics Oscillator with settings of 5,3,3
Levels : 15, 85, 30, 70

**backtest**
 ![IMG](https://www.fmz.com/upload/asset/141e589f5b00c84de34.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|lookback_period|
|v_input_int_2|3|m1|
|v_input_int_3|3|m2|
|v_input_int_4|5|lookback_period1|
|v_input_int_5|3|m3|
|v_input_int_6|3|m4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-09 00:00:00
end: 2022-05-08 23:59:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
indicator('Nik Stoch')
lookback_period = input.int(14, minval=1)
m1 = input.int(3, minval=1)
m2 = input.int(3, minval=1)

k = ta.sma(ta.stoch(close, high, low, lookback_period), m1)
d = ta.sma(k, m2)
//plot(k)
//plot(d, color=color.red)
h0 = hline(15)
h1 = hline(85)
h2 = hline(50)
h3 = hline(30)
h4 = hline(70)

fill(h0, h1, color=color.new(color.purple, 95))

/////stoch fast
lookback_period1 = input.int(5, minval=1)
m3 = input.int(3, minval=1)
m4 = input.int(3, minval=1)

k1 = ta.sma(ta.stoch(close, high, low, lookback_period1), m3)
d1 = ta.sma(k1, m4)
plot(k1, color=color.new(color.aqua, 0))
plot(d1, color=color.new(color.red, 0))


if k1[1] < d1[1] and k1 > d1
    strategy.entry("Enter Short", strategy.short)
else if k1[1] > d1[1] and k1 < d1
    strategy.entry("Enter Long", strategy.long)
    
```

> Detail

https://www.fmz.com/strategy/362172

> Last Modified

2022-05-10 14:08:03
