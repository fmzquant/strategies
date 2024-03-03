
> Name

T-Step-LSMA

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|length|
|v_input_2|0.5|sc|
|v_input_3|false|No Smoothing|


> Source (PineScript)

``` pinescript
 /*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/
//@version=4
study("T-Step LSMA",overlay=true)
length = input(100),sc = input(.5),ns = input(false,"No Smoothing")
//----
b = 0.,ls = 0.
src = sc*close+(1-sc)*nz(ls[1],close)
//----
er = 1 - abs(change(src,length))/sum(abs(change(src)),length)
n = cum(1)-1
a = cum(abs(src - nz(b[1],src)))/n*(1+er)
b := src > nz(b[1],src) + a ? src : src < nz(b[1],src) - a ? src : nz(b[1],src)
//----
alpha = fixnan(correlation(src,b,length) * (stdev(src,length)/stdev(b,length)))
beta = sma(src,length) - alpha*sma(b,length)
ls := alpha*b+beta
//----
osc = 0
osc := b > b[1] ? 1 : b < b[1] ? 0 : osc[1] 
css = osc == 1 ? color.blue :#e65100
plot(ns ? b : fixnan(ls),color=css,linewidth=3,transp=0)
alertcondition(change(osc)>0,title="Up",message="Up-trending Market Estimated")
alertcondition(change(osc)<0,title="Dn",message="Down-trending Market Estimated")
buySignal = change(osc)>0
sellSignal= change(osc)<0
if buySignal
    strategy.entry("buy", strategy.long)
else if sellSignal
    strategy.entry("sell", strategy.short) 
```

> Detail

https://www.fmz.com/strategy/370711

> Last Modified

2022-06-25 16:26:42
