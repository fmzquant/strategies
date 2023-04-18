
> 策略名称

AK-MACD-BB-INDICATOR-V-100

> 策略作者

张超

> 策略描述



**backtest**
 ![IMG](https://www.fmz.com/upload/asset/173ceab6efbee32a47d.png) 

> 策略参数



|参数|默认值|描述|
|----|----|----|
|v_input_1|10|BB Periods|
|v_input_2|true|Deviations|
|v_input_3|12|fastLength|
|v_input_4|26|slowLength|
|v_input_5|9|signalLength|


> 源码 (PineScript)

``` javascript
/*backtest
start: 2022-04-30 00:00:00
end: 2022-05-29 23:59:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//AK MACD BB 
//created by Algokid , February 24,2015
//@version=4

study("AK MACD BB v 1.00")

length = input(10, minval=1, title="BB Periods")
dev = input(1, minval=0.0001, title="Deviations")

//MACD
fastLength = input(12, minval=1) 
slowLength=input(26,minval=1)
signalLength=input(9,minval=1)
fastMA = ema(close, fastLength)
slowMA = ema(close, slowLength)
macd = fastMA - slowMA

//BollingerBands

Std = stdev(macd, length)
Upper = (Std * dev + (sma(macd, length)))
Lower = ((sma(macd, length)) - (Std * dev))


Band1 = plot(Upper, color=gray, style=line, linewidth=2,title="Upper Band")
Band2 = plot(Lower, color=gray, style=line, linewidth=2,title="lower Band")
fill(Band1, Band2, color=blue, transp=75,title="Fill")

mc = macd >= Upper ? lime:red

// Indicator

plot(macd, color=mc, style =circles,linewidth = 3)
zeroline = 0 
plot(zeroline,color= orange,linewidth= 2,title="Zeroline")

//buy
barcolor(macd >Upper ? yellow:na)
//short
barcolor(macd <Lower ? aqua:na)

//needs improvments 



if macd >Upper
    strategy.entry("Enter Long", strategy.long)
else if macd <Lower
    strategy.entry("Enter Short", strategy.short)
```

> 策略出处

https://www.fmz.com/strategy/366943

> 更新时间

2022-05-31 19:05:37
