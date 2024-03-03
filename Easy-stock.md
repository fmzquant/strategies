
> Name

Easy-stock

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Timeframe: W|5|15|30|60|120|240|360|720|D|1|
|v_input_2|24|Period|
|v_input_3|true|Shift|
|v_input_4|100|len|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © RafaelZioni

//@version=4
study(title = "Easy stock", overlay = true)
tf10 = input("W", title = "Timeframe", type = input.resolution, options = ["1", "5", "15", "30", "60","120", "240","360","720", "D", "W"])

length = input(24, title = "Period", type = input.integer)
shift = input(1, title = "Shift", type = input.integer)

hma(_src, _length)=>
    wma((2 * wma(_src, _length / 2)) - wma(_src, _length), round(sqrt(_length)))
    
hma3(_src, _length)=>
    p = length/2
    wma(wma(close,p/3)*3 - wma(close,p/2) - wma(close,p),p)


a = security(syminfo.tickerid, tf10, hma(close, length))
b =security(syminfo.tickerid, tf10, hma3(close, length)[shift])
plot(a,color=color.gray)
plot(b,color=color.yellow)
close_price = close[0]
len = input(100)

linear_reg = linreg(close_price, len, 0)


plot(linear_reg, color=color.blue, title="LR", linewidth=3)

buy=crossover(linear_reg, b) 
sell=crossunder(linear_reg, b) 
plotshape(buy, title="buy", text="Buy", color=color.green, style=shape.labelup, location=location.belowbar, size=size.small, textcolor=color.white, transp=0)  //plot for buy icon
plotshape(sell, title="sell", text="Sell", color=color.red, style=shape.labeldown, location=location.abovebar, size=size.small, textcolor=color.white, transp=0)  //plot for sell icon
/////// Alerts /////
alertcondition(buy,title="buy")
alertcondition(sell,title="sell")
if buy
   strategy.entry("buy", strategy.long)
else if sell
    strategy.entry("sell", strategy.short)    
    
```

> Detail

https://www.fmz.com/strategy/368777

> Last Modified

2022-06-12 21:13:20
