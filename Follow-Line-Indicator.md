
> Name

Follow-Line-Indicator

> Author

Zer3192

> Strategy Description

 ![IMG](https://www.fmz.com/upload/asset/147b58e59ce07a8a3f609.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|BB Period|
|v_input_2|true|BB Deviations|
|v_input_3|true|ATR Filter|
|v_input_4|5|ATR Period|
|v_input_5|false|Hide Labels|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/
// © Dreadblitz
//@version=4
study(shorttitle="FLI", title="Follow Line Indicator", overlay=true)
// 
BBperiod      = input(defval = 21,     title = "BB Period",    type = input.integer, minval = 1)
BBdeviations  = input(defval = 1.00,     title = "BB Deviations",    type = input.float, minval = 0.1, step=0.05)
UseATRfilter  = input(defval = true, title = "ATR Filter",  type = input.bool)
ATRperiod     = input(defval = 5,     title = "ATR Period",    type = input.integer, minval = 1)
hl            = input(defval = false, title = "Hide Labels",  type = input.bool)
//
BBUpper=sma (close,BBperiod)+stdev(close, BBperiod)*BBdeviations
BBLower=sma (close,BBperiod)-stdev(close, BBperiod)*BBdeviations
//
TrendLine = 0.0
iTrend = 0.0
buy = 0.0
sell = 0.0
//
BBSignal = close>BBUpper? 1 : close<BBLower? -1 : 0
// 
if BBSignal == 1 and UseATRfilter == 1
    TrendLine:=low-atr(ATRperiod)
    if TrendLine<TrendLine[1] 
        TrendLine:=TrendLine[1]
if BBSignal == -1 and UseATRfilter == 1
    TrendLine:=high+atr(ATRperiod)
    if TrendLine>TrendLine[1]
        TrendLine:=TrendLine[1]
if BBSignal == 0 and UseATRfilter == 1
    TrendLine:=TrendLine[1]
//
if BBSignal == 1 and UseATRfilter == 0
    TrendLine:=low
    if TrendLine<TrendLine[1] 
        TrendLine:=TrendLine[1]
if BBSignal == -1 and UseATRfilter == 0
    TrendLine:=high
    if TrendLine>TrendLine[1]
        TrendLine:=TrendLine[1]
if BBSignal == 0 and UseATRfilter == 0
    TrendLine:=TrendLine[1]
//
iTrend:=iTrend[1]
if TrendLine>TrendLine[1] 
    iTrend:=1
if TrendLine<TrendLine[1] 
    iTrend:=-1
//
buy:=iTrend[1]==-1 and iTrend==1 ? 1 : na
sell:=iTrend[1]==1 and iTrend==-1? 1 : na
//
plot(TrendLine, color=iTrend > 0?color.blue:color.red ,style=plot.style_line,linewidth=2,transp=0,title="Trend Line") 
plotshape(buy == 1 and hl == false? TrendLine-atr(8) :na, text='?', style= shape.labelup, location=location.absolute, color=color.blue, textcolor=color.white, offset=0, transp=0,size=size.auto)
plotshape(sell == 1 and hl == false ?TrendLine+atr(8):na, text='?', style=shape.labeldown, location=location.absolute, color=color.red, textcolor=color.white, offset=0, transp=0,size=size.auto)
//
alertcondition(sell == 1 ,title="Sell",message="Sell")
alertcondition(buy == 1 ,title="Buy",message="Buy")
alertcondition(buy == 1 or sell == 1 ,title="Buy/Sell",message="Buy/Sell")
if buy == 1 and hl == false
   strategy.entry("buy", strategy.long)
else if sell == 1 and hl == false
    strategy.entry("sell", strategy.short)

```

> Detail

https://www.fmz.com/strategy/368736

> Last Modified

2022-06-12 17:01:09
