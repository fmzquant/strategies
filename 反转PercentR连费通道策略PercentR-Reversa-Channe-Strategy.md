
> Name

反转PercentR连费通道策略PercentR-Reversa-Channe-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1503c838a714f59f4ec.png)


### Strategy Overview

This is a reversal trading strategy based on the Laruent Channel indicator. It calculates the highest and lowest prices over a certain period of time in the past to determine if the current price is in the overbought or oversold area. If the price is close to the upper or lower rail, it will open a position in the opposite direction and wait for the price to return to the middle line.

### Strategy Principle  

The strategy is mainly based on two indicators: **PercentR indicator (%R)** and **Laruent Channel rails**.

The PercentR indicator shows the distance between the current closing price and the highest and lowest prices over the most recent period. The value range is from 0 to -100. A value close to 0 means the current closing price is near the highest point recently. And a value close to -100 means the current closing price is near the lowest price recently.

The Laruent Channel consists of upper rail, middle line and lower rail. The upper rail equals the highest price over the most recent period. The lower rail equals the lowest price over that period. The middle line is the mean of the upper and lower rails. If the price exceeds the upper rail, it is considered overbought. If the price is below the lower rail, it is considered oversold.

The strategy first calculates the **PercentR indicator** and **Laruent Channel rails**, then uses the two indicators to determine if the current status is overbought or oversold:  

1. When PercentR is below -87, the status is considered oversold.
2. When PercentR is above -20, the status is considered overbought.

If the current status is neither overbought nor oversold, it will long at market open. And close the position before market close on the same day.

By capturing the price reversal, it can make profits in short term.

### Advantages

1. The strategy is simple and clear, easy to understand and implement.
2. Using PercentR indicator to judge overbought/oversold status is reliable. 
3. Making orders at market open and closing positions before market close avoids overnight risk.
4. As a reversal trading strategy, it is suitable for short term profit making.

### Risks

1. Failed reversal, cannot exit with profit.
2. Improper parameter settings, cannot judge overbought/oversold status correctly.  
3. Too short intraday trading time, fewer trading signals.

Risks can be reduced by optimizing parameters, adjusting order placement time, or combining with other indicators.

### Optimization

1. A stop loss mechanism can be introduced to set a stop loss line to avoid loss expansion.
2. The parameters of PercentR can be optimized to make overbought/oversold judgment more accurate.
3. The strategy can be used on multiple timeframes simultaneously to implement multi-timeframe trading.
4. It can be combined with other indicators like KDJ, MACD to make trading signals more reliable.

### Summary  

In general, this strategy is quite simple and practical. It is designed based on the reversal trading idea and suitable for short term frequent trading. There is large room for optimization. More technical indicators can be introduced for combination. And automatic stop loss mechanisms can also be established to control risks.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|-87|Low Marker|
|v_input_2|-20|High Marker|
|v_input_3|3|Length|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-04 00:00:00
end: 2023-12-04 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © zweiprozent original strategy by larry williams

strategy("Daily PercentR Strategy", overlay=false)
D_High = security(syminfo.tickerid, 'D', high[1])
D_Low = security(syminfo.tickerid, 'D', low[1])
D_Close = security(syminfo.tickerid, 'D', close[1])
D_Open = security(syminfo.tickerid, 'D', open[1])

LowMarker = input(-87,"Low Marker",input.integer)

HighMarker =  input(-20,"High Marker",input.integer)

length = input(title="Length", type=input.integer, defval=3)
src = input(close, "Source", type = input.source)
_pr(length) =>
	max = highest(length)
	min = lowest(length)
	100 * (src - max) / (max - min)
percentR = _pr(length)
obPlot = hline(LowMarker, title="Upper Band", color=#606060)
hline(-50, title="Middle Level", linestyle=hline.style_dotted, color=#606060)
osPlot = hline(HighMarker, title="Lower Band", color=#606060)
fill(obPlot, osPlot, title="Background", color=color.new(#9915ff, 90))
plot(percentR, title="%R", color=#3A6CA8, transp=0)

// Go Long - if percentR is not overbought/sold

ordersize=floor(strategy.equity/close) 

if percentR<HighMarker and percentR>LowMarker
    strategy.entry("Long", strategy.long,comment="Long")

//exit at end of session
if low[0]<high[0]
    strategy.close("Long", comment="exit")
    
```

> Detail

https://www.fmz.com/strategy/434305

> Last Modified

2023-12-05 12:04:13
