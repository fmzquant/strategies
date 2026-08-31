
> Name

Trend-Tracking-Stop-Loss-Take-Profit-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f100eb93e65401e1c9.png)


### Overview

This is a trend tracking strategy that uses Bollinger Bands to determine trend and ATR to set stop loss and take profit. It first judges the market trend, draws a trend line, and sets stop loss and take profit when closing positions.

### Strategy Logic

1. Calculate the upper and lower rails of Bollinger Bands.
2. Judge if the closing price is above the upper rail or below the lower rail. If yes, judge it as a trending market, bullish or bearish respectively.
3. If it is a trending market, calculate the trend line. The trend line is based on the lowest price minus the ATR value (bull market) or the highest price plus the ATR value (bear market).
4. If it is not a trending market, keep the trend line the same as previous bar.
5. Compare the trend line to determine the trend direction. Uptrend for bullish, downtrend for bearish.  
6. Generate buy/sell signals when trend line direction changes.
7. Set stop loss and take profit: fixed stop loss distance is 100 times of entry price; floating take profit is 1.1 times (bull) or 0.9 times (bear) of entry price.

### Advantage Analysis 

1. Can determine market trend, avoid false breakout trades.
2. Set trend line to avoid being trapped.
3. Reasonable stop loss and take profit settings to control risk while ensuring profit.

### Risk Analysis

1. Improper parameter settings may miss trading opportunities.  
2. Bollinger Bands has a high probability of judging wrongly in range-bound markets.
3. Stop loss being too close may get stopped out easily.

### Optimization Directions

1. Optimize Bollinger Bands parameters for different products.
2. Optimize the trend line calculation methods, e.g. introducing other indicators. 
3. Test and optimize the stop loss and take profit parameter settings.

### Conclusion

This is a strategy that uses Bollinger Bands to determine trend and sets stop loss and take profit based on trend line. The core advantages are clear trend judgment, reasonable stop loss and take profit settings to effectively control risks. The main risks come from Bollinger Bands’ wrong trend judgment and stop loss being too close. Future optimization directions include parameter optimization, trend line calculation optimization and stop loss take profit optimization.


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
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © zhuenrong

// © Dreadblitz
//@version=4
strategy(shorttitle="FLI", title="Follow Line Indicator", overlay=true)
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
if (buy==1)
    strategy.entry("Buy", strategy.long)
if (sell==1)
    strategy.entry("Sell", strategy.short)
// === Stop LOSS ===

if strategy.position_size>0
    strategy.exit("Stop Loss/Profit Long","Buy", stop=strategy.position_avg_price*100, limit=strategy.position_avg_price*1.1)
if strategy.position_size<0
    strategy.exit("Stop Loss/Profit Short","Sell", stop=strategy.position_avg_price*100, limit=strategy.position_avg_price*0.9)
```

> Detail

https://www.fmz.com/strategy/439855

> Last Modified

2024-01-24 14:17:28
