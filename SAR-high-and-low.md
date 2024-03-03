
> Name

SAR-high-and-low

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.02|start|
|v_input_2|0.02|increment|
|v_input_3|0.2|maximum|
|v_input_4|40|lookBack|
|v_input_5|2|Multiplier|


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
study("SAR -high and low",overlay = true)
// INPUTS //
//
start = input(0.02) 
increment = input(0.02)  
maximum = input(0.2)
s1 = sar(start, increment, maximum)
pc = close < s1 ? color.red : color.green
plot(s1, style=plot.style_cross, color=pc)
//


lookBack = input(40)
//
multi = input(2, title="Multiplier", minval=0.001, maxval=2) 

mean = ema(s1 ,lookBack)  
stddev = multi * stdev(s1, lookBack)  
b = mean + stddev
s2 = mean - stddev

low1 = crossover(s1, s2)  
high1 = crossunder(s1, b) 

meanp = plot(mean, title="Mean", color=color.gray)  
bsign = plot(b, title="Upper Deviation Line", color=color.green, linewidth=2)  
ssign = plot(s2, title="Lower Deviation Line", color=color.red, linewidth=2)  

fill(bsign, meanp, title="Upper Deviation fill", color=color.green)  
fill(meanp, ssign, title="Lower Deviation fill", color=color.red)  



plotshape(low1, title="low", text="low", color=color.green, style=shape.labelup, location=location.belowbar, size=size.small, textcolor=color.white, transp=0)  //plot for buy icon
plotshape(high1, title="high", text="high", color=color.red, style=shape.labeldown, location=location.abovebar, size=size.small, textcolor=color.white, transp=0)  //plot for sell icon
if low1
   strategy.entry("buy", strategy.long)
else if high1
    strategy.entry("sell", strategy.short)


```

> Detail

https://www.fmz.com/strategy/367572

> Last Modified

2022-06-04 08:50:51
