
> Name

Williams-R-Smoothed

> Author

ChaoZhang

> Strategy Description

From TradingView's description:
Williams %R (%R) is a momentum-based oscillator used in technical analysis , primarily to identify overbought and oversold conditions. The %R is based on a comparison between the current close and the highest high for a user defined look back period. %R Oscillates between 0 and -100 (note the negative values) with readings closer to zero indicating more overbought conditions and readings closer to -100 indicating oversold. Typically %R can generate set ups based on overbought and oversold conditions as well overall changes in momentum.

What's special?
This indicator adds two additional EMA lines to the original Williams %R indicator. Default EMA lengths are 5 and 13. The result is 2 smoother average lines, which are easier to read.
This indicator includes:
- signals for EMA crosses. EMA crosses can help indicate confirmed trend changes. Default colors are green and red
- signals for trend reversals on the faster EMA line. Default colors are blue and orange

Alerts available for bullish / bearish crossovers and reversals.

Enjoy~~!

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/be759889670f5c8d21.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|34|length|
|v_input_1|5|Smoothed %R Length|
|v_input_2|13|Slow EMA Length|
|v_input_bool_1|true|Show EMA Crossovers|
|v_input_bool_2|true|Show trend reversals|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-02-08 00:00:00
end: 2022-05-08 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © platsn

//@version=5
indicator(title='Williams %R - Smoothed', shorttitle='The Smooth Willy')

// Williams %R
length = input.int(defval=34, minval=1)
upper = ta.highest(length)
lower = ta.lowest(length)

output = 100 * (close - upper) / (upper - lower)

fast_period = input(defval=5, title='Smoothed %R Length')
slow_period = input(defval=13, title='Slow EMA Length')

fast_ema = ta.wma(output,fast_period)
slow_ema = ta.ema(output,slow_period)

// Plot
//h1 = hline(-20, title='Upper Band')
//h2 = hline(-80, title='Lower Band')
//fill(h1, h2, title='Background', transp=90)

plot(output, title='%R', color=color.new(color.white, 80), linewidth=1)
plot(fast_ema, title='Smoothed %R', color=color.new(color.yellow, 0), linewidth=2)
plot(slow_ema, title='Slow EMA', color=color.new(color.aqua, 0), linewidth=2)

bullX = ta.crossover(fast_ema, slow_ema)
bearX = ta.crossunder(fast_ema, slow_ema)
bullreverse = fast_ema[2] > fast_ema[1] and fast_ema > fast_ema[1] and fast_ema < -30
bearreverse = fast_ema[2] < fast_ema[1] and fast_ema < fast_ema[1] and fast_ema > -70

plotX = input.bool(true, "Show EMA Crossovers")
plotRev = input.bool(true, "Show trend reversals")

//plotshape(plotX and bearX ,"Cross down", color=color.red, style=shape.triangledown, location = location.top, size =size.tiny, offset=-1) 
//plotshape(plotX and bullX ,"Cross up", color=color.green, style=shape.triangleup, location = location.bottom, size =size.tiny, offset=-1)
//plotshape(plotRev and bearreverse ,"Bear reversal", color=color.orange, style=shape.triangledown, location = location.top, size =size.tiny, offset=-1) 
//plotshape(plotRev and bullreverse ,"Bull reversal", color=color.blue, style=shape.triangleup, location = location.bottom, size =size.tiny, offset=-1)

//alertcondition(bearX,"Bearish Crossover", "Bearish cross on William %R")
//alertcondition(bullX,"Bullish Crossover", "Bullish cross on William %R")
//alertcondition(bearreverse,"Bearish Reversal", "Bearish Reversal on William %R")
//alertcondition(bullreverse,"Billish Reversal", "Bullish Reversal on William %R")

if plotRev and bullreverse
    strategy.entry("Enter Long", strategy.long)
else if plotRev and bearreverse
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/361974

> Last Modified

2022-05-09 12:08:11
