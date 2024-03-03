
> Name

Diamond-Trend

> Author

ChaoZhang

> Strategy Description

Diamond Trend is an indicator clearly way to catch the trend in the begining $$

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/f6a5f43fe714bdae29.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.02|start|
|v_input_2|0.02|increment|
|v_input_3|0.2|maximum|
|v_input_4|100|len|
|v_input_5|1.9|Deviation|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-09 00:00:00
end: 2022-05-08 23:59:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © meer2019
//@version=4
study(title="PSAR x", overlay=true)
start = input(0.02)
increment = input(0.02)
maximum = input(0.2)
c=close

psar = sar(start, increment, maximum)
cp = psar
len = input(100, minval=1),off= 0,dev= input(1.9, "Deviation")
lreg = linreg(cp, len, off), lreg_x =linreg(cp, len, off+1)
b = bar_index, s = lreg - lreg_x,intr = lreg - b*s
dS = 0.0
for i=0 to len-1
    dS:= dS + pow(cp[i]-(s*(b-i)+intr), 2)  
de = sqrt(dS/(len))
up = (-de*dev) + psar
down= (de*dev) + psar

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

if buy
    strategy.entry("Enter Long", strategy.long)
else if sell
    strategy.entry("Enter Short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/362178

> Last Modified

2022-05-10 14:47:48
