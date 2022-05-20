
> 策略名称

MAHL Band

> 策略作者

张超

> 策略描述

The channel composed of the high price and low price moving average

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/ec8392508188c41741.png) 

> 策略参数



|参数|默认值|描述|
|----|----|----|
|v_input_int_1|3|MA Length|


> 源码 (javascript)

``` javascript
/*backtest
start: 2022-04-10 00:00:00
end: 2022-05-09 23:59:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
indicator(title="MAHL Band", overlay=true, timeframe="", timeframe_gaps=true)
malen = input.int(3, "MA Length", minval=1)
mahv = ta.sma(high, malen)
malv = ta.sma(low, malen)
mamv = (mahv + malv) / 2
mah = plot(mahv, color = #FF6D00, style = plot.style_line)
mal = plot(malv, color = #43A047)
mam = plot(mamv, color = color.blue) 

upperv = ta.highest(mahv, 60)
lowerv = ta.lowest(malv, 60)
middlev = (upperv + lowerv) / 2

upper = plot(upperv, color = color.red, linewidth = 2)
lower = plot(lowerv, color = color.green, linewidth = 2)
middle = plot(middlev, color = color.yellow, linewidth = 2) 


[diplus, diminus, adx] = ta.dmi(17, 14)

up = (open < (malv - low / 3 + open / 3)) and (diplus[1] > diminus[1]) and mamv[1] > mamv[2]
down = (open > (mahv - high / 3 + open / 3)) and (diplus[1] < diminus[1]) and mamv[1] < mamv[2]
plotshape(up, style=shape.arrowup, location=location.belowbar, color=color.red)
plotshape(down, style=shape.arrowdown, location=location.abovebar, color=color.green)

if up
    strategy.entry("Enter Long", strategy.long)
else if down
    strategy.entry("Enter Short", strategy.short)
```

> 策略出处

https://www.fmz.com/strategy/362497

> 更新时间

2022-05-11 20:48:53
