
> Name

基于多个移动平均带策略Moving-Average-Ribbon-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/7e482849627fa0ca0e.png)

## Overview

The Moving Average Ribbon strategy is a trend following strategy based on multiple moving averages. It monitors fast and slow moving averages simultaneously, and generates trading signals when prices break through the moving average ribbon. The strategy combines trend determination and overbought/oversold indicators, which can effectively capture medium- and long-term trends.  

## Strategy Logic

The strategy uses 5 fast moving averages (5-, 8-, 13-, 20- and 30-day lines) and 4 slow moving averages (45-, 70-, 105- and 150-day lines). The fast lines form an inner moving average ribbon and the slow lines form an outer moving average ribbon. A buy signal is generated when prices break above the inner ribbon, and a sell signal is generated when prices break below the inner ribbon. To filter out false breaks, it requires prices to break through the inner ribbon for 3 consecutive candles, and most of the fast moving averages also break through synchronously before generating trading signals.

In addition, the strategy also judges long-term trends. It only considers generating buy signals when prices are above the 200-day moving average. On the contrary, it only considers generating sell signals when prices break below the 200-day moving average. By determining long-term trends, it prevents being trapped during consolidations.


## Advantage Analysis 

The strategy has the following advantages:

1. The multi-moving average design can accurately determine trend direction. The combination of inner and outer moving average ribbons with fast and slow lines works well in identifying medium- to long-term trends.

2. The consecutive break mechanism can effectively filter out false breaks. Meanwhile, requiring most fast moving averages to break through ensures the trend is changing.  

3. Judging long-term trends avoids being trapped during consolidations. Using the 200-day line to determine allows opening positions only when trends start to reverse.

4. Balances trend following and overbought/oversold conditions. The moving averages themselves have trend following ability, while combining overbought/oversold indicators to set stop loss points ensures good risk control.

## Risk Analysis

The main risks of this strategy includes:

1. Failed breakout risk. When false breakouts occur, the strategy cannot completely avoid losses.  

2. Loss risk during ranging trends. When the market ranges for long periods, stop loss points may be frequently hit, leading to larger losses.

3. Parameter optimization risk. Improper settings of moving average parameters can also lead to errors in trading signals, resulting in greater losses.

The corresponding solutions are:

1. Appropriately widen the stop loss points to give prices enough space to move. Or adopt a trailing stop loss method to allow stop loss line to follow prices.

2. Add trend judging indicators to avoid establishing positions without direction during consolidations. Such as filtering with DMI, MACD and other indicators.  

3. Use historical backtesting and parameter optimization methods to select the best parameter combinations. Also track parameter effectiveness in real trading and make dynamic optimizations.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize moving average parameters to select the best cycle numbers. Run backtests of moving averages with different cycle numbers to find the optimal parameter combination.  

2. Add trend judging indicators for filtering. Such as RSI for overbought/oversold, Bollinger Bands for channel breakouts etc. Avoid establishing positions blindly when trends are unclear.

3. Adopt adaptive moving averages. Optimize moving average parameters dynamically according to changing market conditions and volatility, so that they fit better to current market states.  

4. Combine machine learning models to judge trend probabilities. Establish probability models to evaluate chances of a successful breakout, assisting the decision system in judging ideal entry timing.

5. Optimize stop loss strategies for better tracking of prices. Such as trailing stop loss or dynamic position sizing stop loss to make stop loss line more intelligent.

## Summary 

The Moving Average Ribbon strategy is one of the more common trend following strategies. It combines fast and slow lines to judge medium- and long-term trends, and sets consecutive breakout mechanisms to decide entries. The strategy balances trend following and overbought/oversold conditions. With parameter optimization and indicator enhancement, its performance can be further improved. It suits investors who hold mid- to long-term positions.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|trima|Input one in lowercase: sma, ema, wma, trima, zlema, dema, tema, or hma|


> Source (PineScript)

``` pinescript
//@version=4
strategy(title="Moving Average Ribbon", shorttitle="MA Ribbon", overlay=true)
src = input(close, type=input.source, title="Source")
matype = input(title="Input one in lowercase: sma, ema, wma, trima, zlema, dema, tema, or hma", type=input.string, defval="trima")
// possible values: sma, ema, wma, trima, zlema, dema, tema, hma (hull ma)



trima(_src, _len) =>
    sma(sma(_src, _len), _len)
hma(_src, _len) =>
    wma(2 * wma(_src, _len / 2) - wma(_src, _len), round(sqrt(_len)))
dema(_src, _len) =>
    2 * ema(_src, _len) - ema(ema(_src, _len), _len)
tema(_src, _len) =>
    3 * ema(_src, _len) - 3 * ema(ema(_src, _len), _len) + 
       ema(ema(ema(_src, _len), _len), _len)
zlema(_src, _len) =>
    ema(_src, _len) + ema(_src, _len) - ema(ema(_src, _len), _len)

ma(_src, _len) =>
    hma__1 = hma(_src, _len)
    ema_1 = ema(_src, _len)
    sma_1 = sma(_src, _len)
    wma_1 = wma(_src, _len)
    trima__1 = trima(_src, _len)
    zlema__1 = zlema(_src, _len)
    dema__1 = dema(_src, _len)
    tema__1 = tema(_src, _len)
    matype == "hma" ? hma__1 : matype == "ema" ? ema_1 : matype == "sma" ? sma_1 : 
       matype == "wma" ? wma_1 : matype == "trima" ? trima__1 : 
       matype == "zlema" ? zlema__1 : matype == "dema" ? dema__1 : tema__1

ma05 = ma(src, 5)
ma08 = ma(src, 8)
ma13 = ma(src, 13)
ma20 = ma(src, 20)
ma30 = ma(src, 30)
ma45 = ma(src, 45)
ma70 = ma(src, 70)
ma105 = ma(src, 105)
ma150 = ma(src, 150)
ma200 = ma(src, 200)




maColor(ma, maRef) =>
    if change(ma) <= 0 and ma05 < maRef
        color.new(color.red, 20)
    else
        if change(ma) >= 0 and ma05 > maRef
            color.new(color.navy, 20)
        else
            if change(ma) < 0 and ma05 > maRef
                color.new(color.red, 20)
            else
                if change(ma) >= 0 and ma05 < maRef
                    color.new(color.navy, 20)
                else
                    color.gray


aboveConfirmed(x,maRef)=>
    above=true
    for i=1 to x
        if close[i]<maRef[i] and not (close[i]>ma200[i]*1.01) and not (ma05[i]>ma105[i]*1.015)
            above:=false
    above


aboveMost(x,len)=>
    above=0
    boolean=false
    if close[len]>ma05[len]
        above:=above+1
    if close[len]>ma08[len]
        above:=above+1
    if close[len]>ma13[len]
        above:=above+1
    if close[len]>ma20[len]
        above:=above+1
    if close[len]>ma30[len]
        above:=above+1
    if close[len]>ma45[len]
        above:=above+1
    if close[len]>ma70[len]
        above:=above+1
    if close[len]>ma105[len]
        above:=above+1
    if close[len]>ma150[len]
        above:=above+1
    if close[len]>ma200[len]
        above:=above+1
    if(above>=x)
        boolean:=true
    boolean
    
belowMost(x,len)=>
    above=0
    boolean=false
    if close[len]<ma05[len]
        above:=above+1
    if close[len]<ma08[len]
        above:=above+1
    if close[len]<ma13[len]
        above:=above+1
    if close[len]<ma20[len]
        above:=above+1
    if close[len]<ma30[len]
        above:=above+1
    if close[len]<ma45[len]
        above:=above+1
    if close[len]<ma70[len]
        above:=above+1
    if close[len]<ma105[len]
        above:=above+1
    if close[len]<ma150[len]
        above:=above+1
    if close[len]<ma200[len]
        above:=above+1
    if(above>=x)
        boolean:=true
    boolean
        
        
belowConfirmed(x,maRef)=>
    below=true
    for i=1 to x
        if close[i]>maRef[i] and not (close[i]<maRef[i]*0.99) and not (ma05[i]<ma105[i]*0.985)
            below:=false
    below
            
            
//plotshape(aboveConfirmed(5,ma150),color=color.navy,location=location.abovebar,style=shape.triangleup,size=size.large,title="above",text="above")
            
plot(ma05, color=maColor(ma05, ma150), style=plot.style_line, title="MMA05", linewidth=2)
plot(ma08, color=maColor(ma08, ma150), style=plot.style_line, title="MMA08", linewidth=1)
plot(ma13, color=maColor(ma13, ma150), style=plot.style_line, title="MMA13", linewidth=1)
plot(ma20, color=maColor(ma20, ma150), style=plot.style_line, title="MMA20", linewidth=1)
plot(ma30, color=maColor(ma30, ma150), style=plot.style_line, title="MMA30", linewidth=1)
plot(ma45, color=maColor(ma45, ma200), style=plot.style_line, title="MMA45", linewidth=1)
plot(ma70, color=maColor(ma70, ma200), style=plot.style_line, title="MMA70", linewidth=2)
plot(ma105, color=maColor(ma105, ma200), style=plot.style_line, title="MMA105", linewidth=2)
plot(ma150, color=maColor(ma150, ma200), style=plot.style_line, title="MMA150", linewidth=3)
plot(ma200, color=maColor(ma200, ma200), style=plot.style_line, title="MM200", linewidth=3)


closeLong=belowMost(6,1) and belowMost(6,2) and belowMost(6,3)
closeShort=aboveMost(6,1) and aboveMost(6,2) and aboveMost(6,3)

isAbove=aboveConfirmed(5,ma200)
strategy.entry("short", false, when=belowConfirmed(3,ma200) and belowMost(8,1) and belowMost(8,2) and belowMost(8,3))
strategy.entry("long", true, when=aboveConfirmed(3,ma200) and aboveMost(8,1) and aboveMost(8,2) and aboveMost(8,3))




strategy.close("long",when=closeLong)
strategy.close("short",when=closeShort)


```

> Detail

https://www.fmz.com/strategy/435723

> Last Modified

2023-12-18 12:29:19
