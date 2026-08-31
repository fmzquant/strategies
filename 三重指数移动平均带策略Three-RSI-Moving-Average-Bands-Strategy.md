
> Name

三重指数移动平均带策略Three-RSI-Moving-Average-Bands-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b8e91ebc3345f23ea7.png)

## Overview

This strategy calculates three groups of RSI indicators with different parameter settings and their corresponding six moving average lines to form three moving average bands, and judges the market trend direction for long-term operations.

## Strategy Logic  

1. Calculate three groups of RSI indicators: Fast RSI Period=50, Normal RSI Period=75, Slow RSI Period=100.

2. For each group of RSI indicators, calculate the 5, 30, 50, 70, 90, 100 periods of simple or exponential moving averages respectively to form moving average bands.

3. When all lines of the fast RSI moving average rise, it is judged as a long signal; when all lines of the fast RSI moving average decline, it is judged as a short signal.

4. The trading signals given by the moving average bands corresponding to the normal RSI and slow RSI are the same.

5. During the given trading time period, go long with 100% position when a buy signal appears; close the previous long position when a sell signal appears.


## Advantage Analysis  

The strategy combines the advantages of RSI indicators and moving averages. It uses three groups of RSI with different parameter settings to capture trend changes at different cycle levels. At the same time, it uses six moving average lines to filter out some noise and improve signal reliability.

Compared with a single RSI and moving average, this combination forms a basis for judgment by using a systematic method without relying on parameter optimization. The application is scientific, rigorous and simple to grasp.

## Risk Analysis   

The RSI moving average combination strategy relies on parameter settings. If the parameters are set improperly, misaligned signals may occur. In addition, fluctuations in fast markets can also trigger false signals. 

To reduce the risk of false signals, RSI cycle parameters should be adjusted accordingly, or the cycle number of the moving average should be adjusted to find the optimal parameter combination.

## Optimization

The strategy can be further optimized in the following aspects:

1. Add stop loss logic. The current strategy does not set stop loss, which is easily affected by dramatic market fluctuations.

2. Optimize parameter settings. More combinations can be tested to find the best parameters.  

3. Increase other indicators filtering. Other indicators like MACD and Bollinger Bands can be introduced to confirm signals.

4. Add time and volume filtering. Avoid false signals during abnormal time periods and volume.


## Summary  

The three RSI moving average bands strategy integrates the advantages of multiple indicators and forms trading signals through rigorous logical judgments to determine long-term trends. The strategy features simplicity, ease of grasp and is suitable for learning and practicing moving average bands trading strategies. With continuous optimization of parameters and combinations, the strategy effect is expected to further improve.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Day|
|v_input_2|true|From Month|
|v_input_3|2019|From Year|
|v_input_4|31|To Day|
|v_input_5|12|To Month|
|v_input_6|2021|To Year|
|v_input_7_ohlc4|0|source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-21 00:00:00
end: 2024-02-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=4

strategy(title="3 RSI MA movement crypto strategy", overlay=true, initial_capital = 100, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.03, pyramiding=1  )

///////////////
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2019, title = "From Year", minval = 1970)
 //monday and session 
// To Date Inputs
toDay = input(defval = 31, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2021, title = "To Year", minval = 1970)

startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true

source = input(ohlc4)

RSIFast  = rsi(source, 50)
RSINorm  = rsi(source, 75)
RSISlow = rsi(source, 100)

// plot(RSIFast, color=color.silver, style=plot.style_area, histbase=50)
// plot(RSINorm, color=#98b8be, style=plot.style_area, histbase=50)
// plot(RSISlow, color=#be9e98, style=plot.style_area, histbase=50)

// plot(RSIFast, color=color.gray, style=plot.style_line, linewidth=1)
// plot(RSINorm, color=color.purple, style=plot.style_line, linewidth=2)
// plot(RSISlow, color=color.black, style=plot.style_line, linewidth=3)

exponential = false//input(false, title="Exponential MA")

src = (RSIFast)

ma05 = exponential ? ema(src, 05) : sma(src, 05)
ma30 = exponential ? ema(src, 30) : sma(src, 30)
ma50 = exponential ? ema(src, 50) : sma(src, 50)
ma70 = exponential ? ema(src, 70) : sma(src, 70)
ma90 = exponential ? ema(src, 90) : sma(src, 90)
ma100 = exponential ? ema(src, 100) : sma(src, 100)

leadMAColor = change(ma30)>=0 and ma30>ma100 ? color.lime            : change(ma30)<0  and ma30>ma100 ? color.red            : change(ma30)<=0 and ma30<ma100 ? color.maroon            : change(ma30)>=0 and ma30<ma100 ? color.green            : color.gray
maColor(ma, maRef) => 
              change(ma)>=0 and ma30>maRef ? color.lime            : change(ma)<0  and ma30>maRef ? color.red            : change(ma)<=0 and ma30<maRef ? color.maroon            : change(ma)>=0 and ma30<maRef ? color.green            : color.gray
            
// plot( ma30, color=maColor(ma30,ma100), style=plot.style_line, title="MMA30", linewidth=2)
// plot( ma50, color=maColor(ma50,ma100), style=plot.style_line, title="MMA50", linewidth=2)
// plot( ma70, color=maColor(ma70,ma100), style=plot.style_line, title="MMA70", linewidth=2)
// plot( ma90, color=maColor(ma90,ma100), style=plot.style_line, title="MMA90", linewidth=2)

long0=(leadMAColor==color.lime and maColor(ma30,ma100)==color.lime and maColor(ma50,ma100)==color.lime and maColor(ma70,ma100)==color.lime and maColor(ma90,ma100)==color.lime ) or (leadMAColor==color.green and maColor(ma30,ma100)==color.green and maColor(ma50,ma100)==color.green and maColor(ma70,ma100)==color.green and maColor(ma90,ma100)==color.green )
exit0=leadMAColor==color.maroon and maColor(ma30,ma100)==color.maroon and maColor(ma50,ma100)==color.maroon and maColor(ma70,ma100)==color.maroon and maColor(ma90,ma100)==color.maroon 


exponential1 = false//input(false, title="Exponential MA")

src1 = (RSINorm)

ma051 = exponential1 ? ema(src1, 05) : sma(src1, 05)
ma301 = exponential1 ? ema(src1, 30) : sma(src1, 30)
ma501 = exponential1 ? ema(src1, 50) : sma(src1, 50)
ma701 = exponential1 ? ema(src1, 70) : sma(src1, 70)
ma901 = exponential1 ? ema(src1, 90) : sma(src1, 90)
ma1001 = exponential1 ? ema(src1, 100) : sma(src1, 100)

leadMAColor1 = change(ma051)>=0 and ma051>ma1001 ? color.lime            : change(ma051)<0  and ma051>ma1001 ? color.red            : change(ma051)<=0 and ma051<ma1001 ? color.maroon            : change(ma051)>=0 and ma051<ma1001 ? color.green            : color.gray
maColor1(ma, maRef) => 
              change(ma)>=0 and ma05>maRef ? color.lime            : change(ma)<0  and ma05>maRef ? color.red            : change(ma)<=0 and ma05<maRef ? color.maroon            : change(ma)>=0 and ma05<maRef ? color.green            : color.gray
            
// plot( ma051, color=leadMAColor1, style=plot.style_line, title="MMA05", linewidth=1)
// plot( ma301, color=maColor1(ma301,ma1001), style=plot.style_line, title="MMA30", linewidth=3)
// plot( ma501, color=maColor1(ma501,ma1001), style=plot.style_line, title="MMA50", linewidth=3)
// plot( ma701, color=maColor1(ma701,ma1001), style=plot.style_line, title="MMA70", linewidth=3)
// plot( ma901, color=maColor1(ma901,ma1001), style=plot.style_line, title="MMA90", linewidth=3)

long1=(leadMAColor1==color.lime and maColor1(ma301,ma1001)==color.lime and maColor1(ma501,ma1001)==color.lime and maColor1(ma701,ma1001)==color.lime and maColor1(ma901,ma1001)==color.lime ) or (leadMAColor1==color.green and maColor1(ma301,ma1001)==color.green and maColor1(ma501,ma1001)==color.green and maColor1(ma701,ma1001)==color.green and maColor1(ma901,ma100)==color.green )
exit1=leadMAColor1==color.maroon and maColor1(ma301,ma1001)==color.maroon and maColor1(ma501,ma1001)==color.maroon and maColor1(ma701,ma1001)==color.maroon and maColor1(ma901,ma1001)==color.maroon 

 

exponential2 = false//input(false, title="Exponential MA")

src2 = (RSISlow)

ma052 = exponential2 ? ema(src2, 05) : sma(src2, 05)
ma302 = exponential2 ? ema(src2, 30) : sma(src2, 30)
ma502 = exponential2 ? ema(src2, 50) : sma(src2, 50)
ma702 = exponential2 ? ema(src2, 70) : sma(src2, 70)
ma902 = exponential2 ? ema(src2, 90) : sma(src2, 90)
ma1002 = exponential2 ? ema(src2, 100) : sma(src2, 100)

leadMAColor2 = change(ma052)>=0 and ma052>ma1002 ? color.lime            : change(ma052)<0  and ma052>ma1002 ? color.red            : change(ma052)<=0 and ma052<ma1002 ? color.maroon            : change(ma052)>=0 and ma052<ma1002 ? color.green            : color.gray
maColor2(ma, maRef) => 
              change(ma)>=0 and ma05>maRef ? color.lime            : change(ma)<0  and ma05>maRef ? color.red            : change(ma)<=0 and ma05<maRef ? color.maroon            : change(ma)>=0 and ma05<maRef ? color.green            : color.gray
            
// plot( ma052, color=leadMAColor2, style=plot.style_line, title="MMA05", linewidth=1)
// plot( ma302, color=maColor2(ma302,ma1001), style=plot.style_line, title="MMA30", linewidth=4)
// plot( ma502, color=maColor2(ma502,ma1001), style=plot.style_line, title="MMA50", linewidth=4)
// plot( ma702, color=maColor2(ma701,ma1001), style=plot.style_line, title="MMA70", linewidth=4)
// plot( ma902, color=maColor2(ma901,ma1001), style=plot.style_line, title="MMA90", linewidth=4)

long2=(leadMAColor2==color.lime and maColor2(ma302,ma1002)==color.lime and maColor2(ma502,ma1002)==color.lime and maColor2(ma702,ma1002)==color.lime and maColor2(ma902,ma1002)==color.lime ) or (leadMAColor2==color.green and maColor2(ma302,ma1002)==color.green and maColor2(ma502,ma1002)==color.green and maColor2(ma701,ma1002)==color.green and maColor2(ma901,ma1002)==color.green )
exit2=leadMAColor2==color.maroon and maColor2(ma302,ma1002)==color.maroon and maColor2(ma502,ma1002)==color.maroon and maColor2(ma702,ma1002)==color.maroon and maColor2(ma902,ma1002)==color.maroon 


long= long1 or long2
exit=  exit1 or exit2


// ------------------------- Strategy Logic --------------------------------- //
var longOpened = false
var shortOpened = false
var int timeOfBuy = na

 

longConditionLongOnly= long and not longOpened 

if longConditionLongOnly
    longOpened := true
    timeOfBuy := time


longExitSignal = exit
exitLongConditionLongOnly = longOpened[1] and longExitSignal

if exitLongConditionLongOnly
    longOpened := false
    timeOfBuy := na


//plotshape(longConditionLongOnly, color=color.green, text= "Buy", location= location.belowbar,style= shape.labelup, textcolor=color.white, size = size.tiny, title="Buy Alert",editable=false, transp=60)
//plotshape(exitLongConditionLongOnly, color=color.red, text= "exit", location= location.abovebar,style= shape.labeldown, textcolor=color.white, size = size.tiny, title="Sell Alert", editable=false, transp=60)

//alertcondition(longConditionLongOnly ,title='Buy Alert', message='Buy Alert')
//alertcondition(exitLongConditionLongOnly , title='exit Alert', message='exit Alert')

if(time_cond)
    strategy.entry("long",1,when=longConditionLongOnly)
    strategy.entry("short",0,when=exitLongConditionLongOnly)
```

> Detail

https://www.fmz.com/strategy/442403

> Last Modified

2024-02-21 16:18:44
