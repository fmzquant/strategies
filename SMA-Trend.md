
> Name

SMA-Trend

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length of Sma|
|v_input_2|0.05|Factor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/
//@version=4

study("SMA Trend",overlay=true)

lenFast = 1
lenSlow = 5
lenC = input(20, title="Length of Sma", type=input.integer, minval=1)

co(sFast, sSlow, lFast, lSlow, lC)=>
    fastC = sma(sFast, lFast)
    slowC = sma(sSlow, lSlow)
    cC = fastC + slowC
    sma(cC, lC)

closeC = co(close, close, lenFast, lenSlow, lenC)
//              PLOTTING: 

c5 = closeC/2
f1   = 1
f2 = 10
//
up =c5 - (f1 * log(f2))
dn = c5 + (f1 * log(f2))
//

factor = input(title="Factor", defval=0.05, minval=0.01, maxval=5, step=0.01, type=input.float)

hb = 0.00 ,hb := nz(hb[1])
hl = 0.000, hl := nz(hl[1])

lb = 0.00 ,lb := nz(lb[1])
l1 = 0.000,l1 := nz(l1[1])

c = 0
c := nz(c[1]) + 1

trend = 0,trend := nz(trend[1]),n = dn,x =up


if barstate.isfirst
    c := 0
    lb := n
    hb := x                      
    l1 := c5  
    hl := c5
    hl
if c == 1
    if x >= hb[1]
        hb := x
        hl := c5
        trend := 1  
        trend
    else
        lb := n
        l1 := c5 
        trend := -1 
        trend

if c > 1

    if trend[1] > 0  
        hl := max(hl[1], c5)
        if x >= hb[1] 
            hb := x
            hb
        else

            
            if n < hb[1] - hb[1] * factor 
                lb := n
                l1 := c5

                trend := -1  
                trend
    else

       
        l1 := min(l1[1], c5 )

        if n <= lb[1] 
            lb := n 
            lb
        else

           
            if x > lb[1] + lb[1] * factor
                hb := x 
                hl := c5

                trend := 1  
                trend



v = trend == 1 ? hb : trend == -1 ? lb : na
plot(v, color=trend == 1 ? color.blue : color.yellow, style=plot.style_circles, linewidth=1, title="trend", transp=0, join=true)

//

long = trend == 1 and trend[1] == -1 
short = trend == -1 and trend[1] == 1 
//
last_long = 0.0
last_short = 0.0
last_long := long ? time : nz(last_long[1])
last_short := short ? time : nz(last_short[1])

buy = crossover(last_long, last_short)
sell = crossover(last_short, last_long)


/////////////// Plotting /////////////// 
plotshape(buy, title="buy", text="Buy", color=color.green, style=shape.labelup, location=location.belowbar, size=size.small, textcolor=color.white, transp=0)  //plot for buy icon
plotshape(sell, title="sell", text="Sell", color=color.red, style=shape.labeldown, location=location.abovebar, size=size.small, textcolor=color.white, transp=0)


/////////////// Alerts /////////////// 
alertcondition(buy, title='buy', message='Buy')
alertcondition(sell, title='sell', message='Sell')
if buy
   strategy.entry("buy", strategy.long)
else if sell
    strategy.entry("sell", strategy.short)

```

> Detail

https://www.fmz.com/strategy/366389

> Last Modified

2022-06-05 06:51:08
