
> Name

AlphaTrend-Adaptive-ATR-Channel-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


The AlphaTrend strategy uses an adaptive ATR channel to capture price trend direction and follow trends based on channel breakouts. Specifically, it constructs a dynamic channel based on ATR, with the upper band being the low minus ATR value, and the lower band being the high plus ATR value. Long entries are taken when price breaks above the upper band, and short entries are taken when price breaks below the lower band.

ATR reflects market volatility and momentum in real-time. The channel formed by the upper and lower bands can gauge price momentum and strength. Breakouts signal possible trend reversals or acceleration, making it sensible to follow the trend. The advantage of AlphaTrend is utilizing the adaptiveness of ATR to capture price changes, while also combining other indicators like RSI to determine trend direction, improving entry accuracy.

However, some issues need to be noted. ATR itself has lagging characteristics, which may cause entries after trend reversals. Also, not using a stop loss leads to large drawdowns. Finally, parameters like ATR period need optimization for different products and timeframes.

In summary, AlphaTrend has unique strengths in identifying dynamic trend reversal points, but strict risk management is still required for live trading, including using stops, sizing positions, and parameter tuning. With proper risk controls, this strategy can be applied successfully over the long term.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|true|Multiplier|
|v_input_1|14|Common Period|
|v_input_2_close|0|src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|false|Show Signals?|
|v_input_4|false|Change calculation (no volume data)?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-04-10 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// author © KivancOzbilgic
// developer © KivancOzbilgic
//@version=5

strategy("AlphaTrend Strategy", shorttitle='ATst', overlay=true, format=format.price, precision=2, margin_long=100, margin_short=100)
coeff = input.float(1, 'Multiplier', step=0.1)
AP = input(14, 'Common Period')
ATR = ta.sma(ta.tr, AP)
src = input(close)
showsignalsk = input(title='Show Signals?', defval=false)
novolumedata = input(title='Change calculation (no volume data)?', defval=false)
upT = low - ATR * coeff
downT = high + ATR * coeff
AlphaTrend = 0.0
AlphaTrend := (novolumedata ? ta.rsi(src, AP) >= 50 : ta.mfi(hlc3, AP) >= 50) ? upT < nz(AlphaTrend[1]) ? nz(AlphaTrend[1]) : upT : downT > nz(AlphaTrend[1]) ? nz(AlphaTrend[1]) : downT

color1 = AlphaTrend > AlphaTrend[2] ? #00E60F : AlphaTrend < AlphaTrend[2] ? #80000B : AlphaTrend[1] > AlphaTrend[3] ? #00E60F : #80000B
k1 = plot(AlphaTrend, color=color.new(#0022FC, 0), linewidth=3)
k2 = plot(AlphaTrend[2], color=color.new(#FC0400, 0), linewidth=3)

fill(k1, k2, color=color1)

buySignalk = ta.crossover(AlphaTrend, AlphaTrend[2])
sellSignalk = ta.crossunder(AlphaTrend, AlphaTrend[2])


K1 = ta.barssince(buySignalk)
K2 = ta.barssince(sellSignalk)
O1 = ta.barssince(buySignalk[1])
O2 = ta.barssince(sellSignalk[1])

plotshape(buySignalk and showsignalsk and O1 > K2 ? AlphaTrend[2] * 0.9999 : na, title='BUY', text='BUY', location=location.absolute, style=shape.labelup, size=size.tiny, color=color.new(#0022FC, 0), textcolor=color.new(color.white, 0))

plotshape(sellSignalk and showsignalsk and O2 > K1 ? AlphaTrend[2] * 1.0001 : na, title='SELL', text='SELL', location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.new(color.maroon, 0), textcolor=color.new(color.white, 0))


longCondition = buySignalk
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = sellSignalk
if (shortCondition)
    strategy.entry("Short", strategy.short)
 
```

> Detail

https://www.fmz.com/strategy/426357

> Last Modified

2023-09-11 14:28:36
