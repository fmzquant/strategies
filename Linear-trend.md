
> Name

Linear-trend

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|c: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|200|len|
|v_input_3|4|Deviation|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © RafaelZioni

//@version=4
strategy(title = "Linear trend", overlay = true)
//

c = input(close)
len = input(200, minval=1),off= 0,dev= input(4, "Deviation")
lreg = linreg(c, len, off), lreg_x =linreg(c, len, off+1)
b = bar_index, s = lreg - lreg_x,intr = lreg - b*s
dS = 0.0
for i=0 to len-1
    dS:= dS + pow(c[i]-(s*(b-i)+intr), 2)  
de = sqrt(dS/(len))
up = (-de*dev) + lreg
down= (de*dev) + lreg

up_t   = 0.0
up_t   := c[1] > up_t[1]   ? max(up, up_t[1])   : up
down_t = 0.0
down_t := c[1] < down_t[1] ? min(down, down_t[1]) : down
trend = 0
trend := c > down_t[1]  ? 1: c < up_t[1]  ? -1 : nz(trend[1], 1)

//
r_line = trend ==1 ? up_t : down_t
plot(r_line)
buy=crossover( c, r_line) 
sell=crossunder(c, r_line) 

plotshape(buy, style=shape.triangleup, size=size.normal, location=location.belowbar, color=color.lime)
plotshape(sell, style=shape.triangledown, size=size.normal, location=location.abovebar, color=color.red)

/////// Alerts /////
alertcondition(buy,title="buy")
alertcondition(sell,title="sell")
if buy
   strategy.entry("long", strategy.long)
else if sell
    strategy.entry("short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/367476

> Last Modified

2022-06-03 16:09:05
