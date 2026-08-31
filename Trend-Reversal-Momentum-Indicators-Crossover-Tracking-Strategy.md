
> Name

Trend-Reversal-Momentum-Indicators-Crossover-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11093890092d3ace955.png)

### Overview

This strategy combines MACD, RSI, ADX and other momentum technical indicators to identify price reversal signals and adopt reverse strategies to enter when the strong trend reverses. The strategy also sets stop loss and take profit to lock in profits and control risks.

### Strategy Principle 

This strategy first combines MACD indicator's fast and slow moving average crossovers to judge price trends; then uses RSI indicator to filter false breakouts and ensure that trading signals are generated only after actual price reversals occur; finally utilizes ADX indicator to verify again whether prices have entered a trending state. Trading signals are generated only when all the above conditions are met simultaneously.  

Specifically, when MACD fast line crosses above slow line, RSI is higher than 50 and rising, ADX is greater than 20, it is a buy signal; when MACD fast line crosses below slow line, RSI is lower than 50 and falling, ADX is greater than 20, it is a sell signal.

### Advantage Analysis

The biggest advantage of this strategy is that it combines multiple indicators to effectively filter whipsaws and erroneous signals, truly locking the inflection points of trend reversals, thus obtaining a higher win rate. In addition, setting stop loss and take profit locks in profits and controls risks, which can effectively hedge the impact of unexpected events.

### Risk Analysis

The biggest risk of this strategy is the misjudgment of trend reversal, such as price making a deep retracement resulting in misjudgment. In addition, the sustainability of the new trend after reversal may not be sufficient to make enough profit.

The solutions are to further optimize parameters, adjust stop loss margin, or incorporate more auxiliary indicators for signal filtering.

### Optimization Directions  

This strategy can be further optimized in the following directions:

1. Optimize the combination of MACD and RSI parameters to improve the accuracy of price reversal judgments;

2. Increase more indicators filtering, such as KD, BOLL etc, to form the effect of indicators encompassing each other;

3. Dynamically adjust stop loss margin according to different market conditions;  

4. Modify take profit position in real time according to the actual trend after reversal.

### Summary

This strategy combines multiple momentum indicators to identify potential price reversal opportunities. Through parameter optimization, incorporating more auxiliary indicators, dynamically adjusting stop loss and take profit strategies, the stability and reliability of the strategy can be further improved to lock the various trading opportunities provided by the markets.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|false|Inverse Strategy|
|v_input_string_1|0|direction: Both|Short|Long|
|v_input_6|50|QTY to sell at TP 1|
|v_input_1|6|(?Support and resistance) Left Bars|
|v_input_2|6| Right Bars|
|v_input_3|12|(?MACD)MACD Fast|
|v_input_4|26|MACD Slow|
|v_input_5|7|MACD Signal|
|v_input_7|14|(?ADX)ADX Length|
|v_input_float_1|6|(?Exit LONG Orders)Long TP 1|
|v_input_float_2|12|Long TP 2|
|v_input_float_3|3|Long SL|
|v_input_float_4|6|(?Exit SHORT Orders)Short TP 1 |
|v_input_float_5|12|Short TP 2|
|v_input_float_6|3|Short SL|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-28 00:00:00
end: 2023-12-28 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © AHMEDABDELAZIZZIZO

//@version=5
strategy("Ta Strategy", overlay=true )

// inputs
inversestrategy = input.bool(false, title = "Inverse Strategy",tooltip = "This option makes you reverse the strategy so that long signals become where to short  ")
direction = input.string(defval = "Both" , options = ["Both" , "Short" , "Long"] )

leftbars= input(6,title = " Left Bars" , group = "Support and resistance")
rightbars = input(6, title = " Right Bars", group = "Support and resistance")

macdfast = input(12, title = "MACD Fast", group = "MACD")
macdslow = input(26, title = "MACD Slow",group = "MACD")
macdsignal = input(7, "MACD Signal",group = "MACD")

sellqty = input(50, title = "QTY to sell at TP 1")

len = input(14, title="ADX Length" , group = "ADX")


// sup and res
res = fixnan(ta.pivothigh(high,leftbars,rightbars))
sup = fixnan(ta.pivotlow(low , leftbars,rightbars))

// macd
macd =ta.ema(close,macdfast) - ta.ema(close,macdslow)
signal=ta.ema(macd,macdsignal)


//adx
up = ta.change(high)
down = -ta.change(low)
plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
truerange = ta.rma(ta.tr,len)
plusDI = 100 * ta.rma(plusDM, len) / truerange
minusDI = 100 * ta.rma(minusDM, len) / truerange
dx = 100 * ta.rma(math.abs(plusDI - minusDI) / (plusDI + minusDI), len)
adx = ta.sma(dx, len)

// start deal condition
longcondition =  ta.crossover(macd,signal) and close > res and ta.rsi(close,14) > 50 and plusDI > minusDI and adx > 20 
shortcondition = ta.crossunder(macd,signal) and close < sup and ta.rsi(close,14) < 50 and plusDI < minusDI and adx > 20 

//tp
longtp1   = input.float(6, "Long TP 1", minval = 0.0, step = 0.25, group = "Exit LONG Orders") /100
longtp2   = input.float(12, "Long TP 2", minval = 0.0, step = 0.25, group = "Exit LONG Orders") /100
longsl1 = input.float(3.0, "Long SL",  minval = 0.0, step = 0.25, group = "Exit LONG Orders") /100
longtakeprofit1 = (strategy.position_avg_price * (1 + longtp1)) 
longstoploss1 = (strategy.position_avg_price * (1 - longsl1)) 
longtakeprofit2 = (strategy.position_avg_price * (1 + longtp2)) 

//sl
shorttp1   = input.float(6.0, "Short TP 1 ", minval = 0.0, step = 0.25, group = "Exit SHORT Orders")/100
shorttp2   = input.float(12.0, "Short TP 2", minval = 0.0, step = 0.25, group = "Exit SHORT Orders")/100
shortsl1 = input.float(3.0, "Short SL",  minval = 0.0, step = 0.25, group = "Exit SHORT Orders")/100
shorttakeprofit1 = (strategy.position_avg_price * (1- shorttp1))
shortstoploss1 = (strategy.position_avg_price * (1 + shortsl1))
shorttakeprofit2 = (strategy.position_avg_price * (1- shorttp2))

//placeorders
if inversestrategy == false
    if direction == "Both"
        if longcondition and strategy.opentrades == 0
            strategy.entry("long" , strategy.long )
        strategy.exit("exit long 1","long",qty_percent = sellqty ,limit = longtakeprofit1,stop = longstoploss1)
        strategy.exit("exit long 2","long",qty_percent = 100 ,limit = longtakeprofit2,stop = longstoploss1)
        if high >= longtakeprofit1
            strategy.cancel("exit long 2")
            strategy.exit("exit long 3","long",qty_percent = 100 ,limit = longtakeprofit2,stop = strategy.position_avg_price)
        if shortcondition and strategy.opentrades == 0
            strategy.entry("short",strategy.short)
        strategy.exit("exit short 1","short",qty_percent = sellqty ,limit = shorttakeprofit1,stop = shortstoploss1)
        strategy.exit("exit short 2","short",qty_percent = 100 ,limit = shorttakeprofit2,stop = shortstoploss1)
        if low <= shorttakeprofit1
            strategy.cancel("exit short 2")
        strategy.exit("exit short 3","short",qty_percent = 100 ,limit = shorttakeprofit2,stop = strategy.position_avg_price)
    else if direction == "Long"
        if longcondition and strategy.opentrades == 0
            strategy.entry("long" , strategy.long )
        strategy.exit("exit long 1","long",qty_percent = sellqty ,limit = longtakeprofit1,stop = longstoploss1)
        strategy.exit("exit long 2","long",qty_percent = 100 ,limit = longtakeprofit2,stop = longstoploss1)
        if high >= longtakeprofit1
            strategy.cancel("exit long 2")
            strategy.exit("exit long 3","long",qty_percent = 100 ,limit = longtakeprofit2,stop = strategy.position_avg_price)
    else if direction == "Short"
        if shortcondition and strategy.opentrades == 0
            strategy.entry("short",strategy.short)
        strategy.exit("exit short 1","short",qty_percent = sellqty ,limit = shorttakeprofit1,stop = shortstoploss1)
        strategy.exit("exit short 2","short",qty_percent = 100 ,limit = shorttakeprofit2,stop = shortstoploss1)
        if low <= shorttakeprofit1
            strategy.cancel("exit short 2")
        strategy.exit("exit short 3","short",qty_percent = 100 ,limit = shorttakeprofit2,stop = strategy.position_avg_price)
else
    if direction == "Both"
        if shortcondition and strategy.opentrades == 0
            strategy.entry("long" , strategy.long )
        strategy.exit("exit long 1","long",qty_percent = sellqty ,limit = longtakeprofit1,stop = longstoploss1)
        strategy.exit("exit long 2","long",qty_percent = 100 ,limit = longtakeprofit2,stop = longstoploss1)
        if high >= longtakeprofit1
            strategy.cancel("exit long 2")
            strategy.exit("exit long 3","long",qty_percent = 100 ,limit = longtakeprofit2,stop = strategy.position_avg_price)
        if longcondition and strategy.opentrades == 0
            strategy.entry("short",strategy.short)
        strategy.exit("exit short 1","short",qty_percent = sellqty ,limit = shorttakeprofit1,stop = shortstoploss1)
        strategy.exit("exit short 2","short",qty_percent = 100 ,limit = shorttakeprofit2,stop = shortstoploss1)
        if low <= shorttakeprofit1
            strategy.cancel("exit short 2")
        strategy.exit("exit short 3","short",qty_percent = 100 ,limit = shorttakeprofit2,stop = strategy.position_avg_price)
    else if direction == "Long"
        if shortcondition and strategy.opentrades == 0
            strategy.entry("long" , strategy.long )
        strategy.exit("exit long 1","long",qty_percent = sellqty ,limit = longtakeprofit1,stop = longstoploss1)
        strategy.exit("exit long 2","long",qty_percent = 100 ,limit = longtakeprofit2,stop = longstoploss1)
        if high >= longtakeprofit1
            strategy.cancel("exit long 2")
            strategy.exit("exit long 3","long",qty_percent = 100 ,limit = longtakeprofit2,stop = strategy.position_avg_price)
    else if direction == "Short"
        if longcondition and strategy.opentrades == 0
            strategy.entry("short",strategy.short)
        strategy.exit("exit short 1","short",qty_percent = sellqty ,limit = shorttakeprofit1,stop = shortstoploss1)
        strategy.exit("exit short 2","short",qty_percent = 100 ,limit = shorttakeprofit2,stop = shortstoploss1)
        if low <= shorttakeprofit1
            strategy.cancel("exit short 2")
        strategy.exit("exit short 3","short",qty_percent = 100 ,limit = shorttakeprofit2,stop = strategy.position_avg_price)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
lsl1 = plot(strategy.position_size <= 0 ? na : longstoploss1, color=color.rgb(124, 11, 11), style=plot.style_linebr, linewidth=1)
ltp1 = plot(strategy.position_size <= 0 ? na : longtakeprofit1, color=color.rgb(15, 116, 18), style=plot.style_linebr, linewidth=1)
ltp2 = plot(strategy.position_size <= 0 ? na : longtakeprofit2, color=color.rgb(15, 116, 18), style=plot.style_linebr, linewidth=1)
avg = plot(strategy.position_avg_price, color=color.rgb(255, 153, 0, 47), style=plot.style_linebr, linewidth=1)
fill(ltp1,avg , color =strategy.position_size <= 0 ? na : color.rgb(82, 255, 97, 90))
fill(ltp2,ltp1 , color =strategy.position_size <= 0 ? na : color.rgb(82, 255, 97, 90))
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ssl1 = plot(strategy.position_size >= 0 ? na : shortstoploss1, color=color.red, style=plot.style_linebr, linewidth=1)
stp1 = plot(strategy.position_size >= 0 ? na : shorttakeprofit2, color=color.green, style=plot.style_linebr, linewidth=1)
stp2 = plot(strategy.position_size >= 0 ? na : shorttakeprofit1, color=color.green, style=plot.style_linebr, linewidth=1)
fill(stp1,avg , color =strategy.position_size >= 0 ? na : color.rgb(30, 92, 35, 90))
fill(stp2,stp1 , color =strategy.position_size >= 0 ? na : color.rgb(30, 92, 35, 90))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
resplot = plot(res, color=ta.change(res) ? na : #bf141446,  linewidth=3, offset=-(rightbars+1), title="res")
supplot = plot(sup, color=ta.change(sup) ? na : #118f113a,  linewidth=3, offset=-(rightbars+1), title="sup")
```

> Detail

https://www.fmz.com/strategy/437027

> Last Modified

2023-12-29 16:21:12
