
> Name

KijunSen-Line-With-Cross

> Author

ChaoZhang

> Strategy Description

Kijen Sen Independent Line of Ichimoku Trading System


Many traders in the financial markets use Ichimoku components to detect trends, which is why I published this indicator.

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/159637efb31d4192cce.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|26|Length|
|v_input_2|true|Show Candle Cross?|


> Source (PineScript)

``` pinescript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © dilan1999

//@version=5
indicator('KijunSen Line With Cross', overlay=true)
n = input(26, 'Length')
h = ta.highest(high, n)
l = ta.lowest(low, n)
value = (h + l) / 2



showCross = input(true, title='Show Candle Cross?')
crossUp = ta.crossover(hl2, value)
crossDown = ta.crossunder(hl2, value)

//Show Cross
plotshape(showCross and crossUp, text='*', style=shape.labelup, location=location.belowbar, color=color.new(color.green, 0), textcolor=color.new(color.white, 0), size=size.small)
plotshape(showCross and crossDown, text='*', style=shape.labeldown, location=location.abovebar, color=color.new(color.red, 0), textcolor=color.new(color.white, 0), size=size.small)

//Drawline
plot(value, color=(hl2 > value ? color.lime : color.red), linewidth=2)
if showCross and crossUp
    strategy.entry("Enter Long", strategy.long)
else if showCross and crossDown
    strategy.entry("Enter Short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/362223

> Last Modified

2022-05-10 18:56:36
