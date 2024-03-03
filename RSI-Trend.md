
> Name

RSI-Trend

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|Apply Barcolor|
|v_input_bool_2|true|Show Hull Trend|
|v_input_int_1|14|(?RSI Settings)RSI Length1|
|v_input_int_2|28|RSI Length2|
|v_input_int_3|30|Over Sold|
|v_input_int_4|70|Over Bought|
|v_input_1|30|(?Hull Trend)Hull Trend Length|


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
// © traderharikrishna

//@version=5
indicator("RSITrend")
showbarcolor=input.bool(true,'Apply Barcolor')
show_Baseline=input.bool(true,'Show Hull Trend')
rsiLengthInput = input.int(14, minval=1, title="RSI Length1", group="RSI Settings")
rsiLengthInput2 = input.int(28, minval=1, title="RSI Length2", group="RSI Settings")
trendlen= input(title='Hull Trend Length', defval=30,group='Hull Trend')
oversold=input.int(30, minval=1, title="Over Sold", group="RSI Settings")
overbought=input.int(70, minval=1, title="Over Bought", group="RSI Settings")
BBMC=ta.hma(close,trendlen)
MHULL = BBMC[0]
SHULL = BBMC[2]
hmac=MHULL > SHULL ?color.new(#00c3ff , 0):color.new(#ff0062, 0)
buysignal=MHULL > SHULL 
sellsignal=MHULL < SHULL
frsi=ta.hma(ta.rsi(close,rsiLengthInput),10)
srsi=ta.hma(ta.rsi(close,rsiLengthInput2),10)
hullrsi1=ta.rsi(MHULL,rsiLengthInput)
hullrsi2=ta.rsi(SHULL,rsiLengthInput)
rsic=frsi>srsi?color.new(#00c3ff , 0):color.new(#ff0062, 0)
barcolor(showbarcolor?hmac:na)
hu1=plot(show_Baseline?hullrsi1:frsi,title='HMA1',color=color.gray,linewidth=1,display=display.none)
hu2=plot(show_Baseline?hullrsi2:srsi,title='HMA2',color=color.gray,linewidth=1,display=display.none)
fill(hu1,hu2,title='HULL RSI TREND',color=show_Baseline?hmac:rsic)

rsiUpperBand2 = hline(90, "RSI Upper Band(90)", color=color.red,linestyle=hline.style_dotted,display=display.none)
rsiUpperBand = hline(overbought, "RSI Upper Band", color=color.red,linestyle=hline.style_dotted,display=display.none)
fill(rsiUpperBand2,rsiUpperBand,title='Buy Zone',color=color.red,transp=80)
hline(50, "RSI Middle Band", color=color.new(#787B86, 50),linestyle=hline.style_solid)
rsiLowerBand = hline(oversold, "RSI Lower Band", color=color.green,linestyle=hline.style_dotted,display=display.none)
rsiLowerBand2 = hline(10, "RSI Lower Band(10)", color=color.green,linestyle=hline.style_dotted,display=display.none)
fill(rsiLowerBand,rsiLowerBand2,title='Sell Zone',color=color.green,transp=80)

plotshape(buysignal and sellsignal[1] ?hullrsi1 :na, title='Buy', style=shape.triangleup, location=location.absolute,  color=color.new(color.yellow, 0), size=size.tiny, offset=0)
plotshape(sellsignal and buysignal[1] ?hullrsi1 :na, title='Sell', style=shape.triangledown, location=location.absolute, color=color.new(color.red, 0), size=size.tiny, offset=0)

alertcondition(buysignal and sellsignal[1] ,title='RSI TREND:Buy Signal',message='RSI TREND: Buy Signal')
alertcondition(sellsignal  and buysignal[1],title='RSI TREND:Sell Signal',message='RSI TREND: Sell Signal')
if buysignal and sellsignal[1]
    strategy.entry("Enter Long", strategy.long)
else if sellsignal and buysignal[1]
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/380525

> Last Modified

2022-08-29 19:57:44
