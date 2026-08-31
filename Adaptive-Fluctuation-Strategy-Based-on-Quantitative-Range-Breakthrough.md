
> Name

Adaptive-Fluctuation-Strategy-Based-on-Quantitative-Range-Breakthrough

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/be8b09ea92ad0a690b.png)

## Overview  

This strategy calculates the highest and lowest transaction volume over a certain recent period to form an adaptive fluctuation range. When the transaction volume of the current cycle breaks through this range, trading signals are generated. The signal direction is determined by the Yin Yang candlestick, which is a simple and effective strategy to track sudden large single transactions in the market.

## Strategy Logic  

The core logic is to calculate the highest and lowest values of positive and negative transaction volumes in the most recent N cycles to form an adaptive fluctuation range. Determine if a breakthrough occurs in the current period based on this range while taking into account the Yin Yang line signal to complete the judgment.  

The specific calculation process is:  

1. Calculate the highest transaction volume Highest and the lowest transaction volume Lowest in the most recent N cycles  
2. Determine if the transaction volume Volume of the current cycle is higher than Highest
3. Combine whether the current candlestick is Yin or Yang to complete the breakthrough signal judgment  
4. Generate long and short signals

## Advantage Analysis  

The main advantages of this strategy are:  

1. Adaptive range setting is sensitive to market changes  
2. Capture high volatility surge trends, reduce rate of missing transactions  
3. Combine candle shape judgments to avoid false breakthroughs  
4. Simple to implement and modify  
5. Parameters are adjustable to suit different products

## Risk Analysis   

The strategy also has some risks:   

1. Prone to chasing highs and killing lows, need to adjust parameters to control    
2. May frequently generate false signals in large cycle oscillating markets
3. Cannot distinguish normal and abnormal breakthroughs, need to incorporate other indicators or patterns for judgment   
4. Only one entry opportunity for each breakthrough, cannot track trends  

Adjusting cycle parameters and incorporating other indicators for filtering can optimize.

## Optimization Directions 

The strategy can be optimized in several ways:  

1. Increase intervals to adjust range length to suit different market cycles  
2. Incorporate MA, Bollinger Bands etc. to filter signals  
3. Optimize combinations with candlestick patterns to avoid false signals  
4. Add re-entry and stop loss modules so strategy can track trends  

## Summary 

The strategy is overall simple and practical. By combining adaptive range and volume price analysis it can effectively capture one-sided explosive markets. However there are also certain risk of false signals, requiring appropriate parameter tweak and complementary tools before it can achieve maximum impact.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Range Length|
|v_input_2|true|Heikin Ashi Colors|
|v_input_3|true|Show Bar Colors|
|v_input_4|true|Show Break-Out|
|v_input_5|true|Show Range|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © EvoCrypto

//@version=4
strategy("Ranged Volume Strategy - evo", shorttitle="Ranged Volume", format=format.volume)

// INPUTS {
Range_Length    =   input(5,        title="Range Length",                       minval=1)

Heikin_Ashi     =   input(true,     title="Heikin Ashi Colors")
Display_Bars    =   input(true,     title="Show Bar Colors")
Display_Break   =   input(true,     title="Show Break-Out")
Display_Range   =   input(true,     title="Show Range")
// }

// SETTINGS {
Close           =   Heikin_Ashi ? security(heikinashi(syminfo.tickerid), timeframe.period, close)    : close
Open            =   Heikin_Ashi ? security(heikinashi(syminfo.tickerid), timeframe.period, open)     : open

Positive        =    volume
Negative        =   -volume

Highest         =   highest(volume, Range_Length)
Lowest          =   lowest(-volume, Range_Length)

Up              =   Highest > Highest[1] and Close > Open
Dn              =   Highest > Highest[1] and Close < Open

Volume_Color    =   
 Display_Break and Up   ? color.new(#ffeb3b, 0)     : 
 Display_Break and Dn   ? color.new(#f44336, 0)     : 
 Close > Open           ? color.new(#00c0ff, 60)    : 
 Close < Open           ? color.new(#000000, 60)    : na 
// }

//PLOTS {
plot(Positive,                      title="Positive Volume",    color=Volume_Color,             style=plot.style_histogram,  linewidth=4)
plot(Negative,                      title="Negative Volume",    color=Volume_Color,             style=plot.style_histogram,  linewidth=4)

plot(Display_Range ? Highest : na,  title="Highest",            color=color.new(#000000, 0),    style=plot.style_line,       linewidth=2)
plot(Display_Range ? Lowest  : na,  title="Lowest",             color=color.new(#000000, 0),    style=plot.style_line,       linewidth=2)

barcolor(Display_Bars ? Volume_Color : na)
// }

if (Up)
    strategy.entry("Long Entry", strategy.long)
if (Dn)
    strategy.entry("Short Entry", strategy.short)
```

> Detail

https://www.fmz.com/strategy/442545

> Last Modified

2024-02-22 16:50:46
