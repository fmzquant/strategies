
> 策略名称

SWING TRADE SIGNALS

> 策略作者

张超

> 策略描述

BUY & SELL Signals for higher timeframes based on Ema & Sma with RSI overbought/oversold dots for possible reversal indication.

It can be used for booking profit in the existing trade and take fresh position once the new candle breaks the high/low of alert candle depending upon the side.

Best work with 1h+ timeframes.

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/1190f85e1e5f9b65be2.png) 

> 策略参数



|参数|默认值|描述|
|----|----|----|
|v_input_1|5|ema_value|
|v_input_2|50|sma_value|
|v_input_3|80|Overbought limit of RSI|
|v_input_4|20|Oversold limit of RSI|


> 源码 (PineScript)

``` javascript
/*backtest
start: 2022-04-25 00:00:00
end: 2022-05-24 23:59:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © nicks1008
//@version=4
study("SWING CALLS",title="SMA call buy/sale",shorttitle = "SWING CALL",precision=1, overlay=true)
ema_value=input(5)
sma_value=input(50)
ema1=ema(close,ema_value)
sma2= sma(close,sma_value)
rs=rsi(close,14)

mycolor= iff(rs>=85 or rs<=15,color.yellow,iff(low> sma2,color.lime,iff(high<sma2,color.red,color.yellow)))

hl=input(80,title="Overbought limit of RSI",step=1)
ll=input(20,title="Oversold limit of RSI",step=1)


buyexit= crossunder(rs,hl)
sellexit=crossover(rs,ll)


plot(sma2,title="Long SMA",color=mycolor,linewidth=2,transp=40)

plotshape(buyexit,title="RSI alert Bearish", style=shape.triangledown,
                 location=location.abovebar, color=color.teal, text="↓\n ↓")
plotshape(sellexit,title="RSI alert Bullish", style=shape.triangleup,
                 location=location.belowbar, color=color.teal, text="↑ \n ↑")    
                 
sellcall= crossover(sma2,ema1)and open>close
buycall=crossunder (sma2,ema1)and high>sma2
                 
plotshape(buycall,title="BuyShape", style=shape.labelup,
                   location=location.belowbar, color=color.aqua, text="B",textcolor=color.white)
plotshape(sellcall,title="SellShape", style=shape.labeldown,
                   location=location.abovebar, color=color.red,transp=20, text="S",textcolor=color.black) 
                   
alertcondition(buyexit or sellexit,title="Reversal", message="Possible Reversal on Swing Signal Alert") 
alertcondition(buycall or sellcall,title="Buy/Sale Swing Signal", message="Swing Signal Entry Alert") 


if buycall
    strategy.entry("Enter Long", strategy.long)
else if sellcall
    strategy.entry("Enter Short", strategy.short)
    

```

> 策略出处

https://www.fmz.com/strategy/365907

> 更新时间

2022-05-26 17:28:12
