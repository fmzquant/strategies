
> Name

Renko-Reversal-Alert

> Author

Zer3192





> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/
//@version=2
study("Renko Reversal alert", overlay=true) 
//Buy entry if a bearish renko brick is followed by a bullish brick
//Sell entry if a bullish brick is followed by a bearish brick
long = close > open[1] and close[1] < open[2]
short = close < open[1] and close[1] > open[2]

//Use these alerts to create server-side alerts (right-click on one of the buy or sell arrows on the chart and choose "add alert")
alertcondition(long, title='Long opportunity', message='Renko reversal')
alertcondition(short, title='Short opportunity', message='Renko reversal')

//Use this to customize the look of the arrows to suit your needs.
plotshape(long, location=location.belowbar, color=lime, style=shape.arrowup, text="Buy")
plotshape(short, location=location.abovebar, color=red, style=shape.arrowdown, text="Sell")
if long
   strategy.entry("buy", strategy.long)
else if short
    strategy.entry("sell", strategy.short)    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
```

> Detail

https://www.fmz.com/strategy/368749

> Last Modified

2022-06-12 18:32:42
