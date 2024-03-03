
> Name

Intraday-BUY-SELL

> Author

ChaoZhang

> Strategy Description

BUY & SELL Scalp Signals for Crude Oil Future Contracts (Or it can be used with any scrip with good amount of Volume ) based on Sma & RSI overbought/oversold alert (!) for possible reversal indication.

Take Buy position only if candle breaks the high of alert candle & for Sell positions, take position if candle breaks low of the alert candle.

Best to perform with 3 min timeframe on Crude Oil Futures

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/ae4be0a059edbbe53b.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|RSI Length|
|v_input_2|75|Higher Value of RSI|
|v_input_3|25|Lower value of RSI|
|v_input_4|50|SMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-24 00:00:00
end: 2022-05-23 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © nicks1008

//@version=4
study(title="CRUDE OIL BUY/SELL",shorttitle="CRUDE Scalp |3 Min",precision=2,overlay=true)

Rsi_value=input(14,title="RSI Length",step=1)
hl=input(75,title="Higher Value of RSI",step=1)
ll=input(25,title="Lower value of RSI",step=1)
rs=rsi(close,Rsi_value)

sma_value=input(50,title="SMA Length",step=1)
sma1=sma(close,sma_value)

dist_SMA=1
candle_length=1

mycolor= iff(rs>=hl or rs<=ll,color.yellow,iff(low> sma1,color.lime,iff(high<sma1,color.red,color.yellow)))
gaps=sma1+dist_SMA  //Gap between price and SMA for Sell
gapb=sma1-dist_SMA  //Gap between price and SMA for Buy
chartgap=gaps or gapb  //for both below or above the SMA 
gap1=sma1+5
gapvalue=(open/100)*candle_length     //setting % with its Share price
gapp=(high-low)>gapvalue //or rs<50     // Condition for Min candle size to be eligible for giving signal - Buy Calls
gapp2=(high-low)>gapvalue //or rs>55    // Condition for Min candle size to be eligible for giving signal - Sell Calls
bull=open<close and (high-low)>2*gapvalue and close>(high+open)/2
bear=open>close and (high-low)>2*gapvalue and close<(low+open)/2


rev1=rs>68 and open>close and open>gaps and (high-low)>gapvalue+0.5 and low!=close      //over red candles  "S" - uptrend
rev1a=rs>90 and open<close and close>gaps and high!=close and open!=low                             // over green candles"S" - uptrend
sellrev= rev1 or rev1a

rev2=rs<50 and open<close and open<gapb and open==low  //over green candles"B"
rev3=rs<30 and open>close and high>gapb and open!=high and barstate.isconfirmed!=bear  //over red candles"B"
rev4=rs<85 and close==high and (high-low)>gapvalue and open<close    //over green candle in both trends
hlrev_s=crossunder(rs,hl)
llrev_b=crossover(rs,ll) and open<close

buycall=open<close and open>sma1 and cross(close[1],sma1) and close>sma1
sellcall=cross(close,sma1) and open>close
BUY=crossover(close[1],sma1) and close[1]>open[1] and high[0]>high[1] and close[0]>open[0]  
SELL=crossunder(low[1],sma1) and close[1]<open[1] and low[0]<low[1] and close[0]<open[0]

plotshape(SELL,title="SELL",style=shape.labeldown,color=color.red,text="S",textcolor=color.black,transp=30)
plotshape(BUY,title="BUY",style=shape.labelup,color=color.aqua,text="B",textcolor=color.black,transp=30,location=location.belowbar)

plotshape(hlrev_s,title="Reversal1",style=shape.labeldown,color=color.yellow,text="!",textcolor=color.black,transp=20)
plotshape(llrev_b,title="Reversal2",style=shape.labelup,color=color.yellow,text="!",textcolor=color.black,transp=20,location=location.belowbar)

plot(sma1,title="SMA",color=mycolor,linewidth=2)
alertcondition(hlrev_s or llrev_b,title="Reversal Signal", message="Reversal Alert")
alertcondition(SELL or BUY,title="Buy/Sale Signal", message="Buy/Sell Alert")

if BUY
    strategy.entry("Enter Long", strategy.long)
else if SELL
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/365706

> Last Modified

2022-05-25 17:44:23
