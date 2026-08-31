
> Name

Donchian-Channels-Long-Term-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/633209937ee3052d09.png)

## Overview

This strategy is a long term trend following strategy based on Donchian Channels. It uses the upper and lower bands of Donchian Channels to find price breakouts and enter the market when a breakout occurs. It also uses the middle band as a trailing stop to exit positions. This strategy is suitable for markets with clear trends and can capture long term trends for high profits.  

## Strategy Logic

The strategy uses Donchian Channels with a length of 20 periods. The upper band is the highest high of the last 20 periods and the lower band is the lowest low of the last 20 periods. The default length of the middle band is 2 times that of the upper and lower bands, but can also be set to the same length. When price breaks above the upper band, go long. When price breaks below the lower band, go short. Exit long positions when price falls below the middle band. Exit short positions when price rises above the middle band.

Using a longer middle band allows profitable positions more room to run when a trend exists in the market, resulting in higher possible profits. In fact, the middle band with length of 2 times of upper/lower bands is very close to the 3 x ATR trailing stop recommended by Wilder. So this longer middle band can serve as an alternative trailing stop method for trend following strategies.  

## Advantage Analysis  

The advantages of this strategy are:

1. Simple logic, easy to understand and implement;
2. Donchian Channels is a classic trend following indicator with proven reliability;   
3. The middle band trailing stop helps effectively control risks;
4. Can achieve high profits when used in markets with clear trends; 
5. The alternative trailing stop method allows profits to run longer.

## Risk Analysis

There are also some risks with this strategy:

1. As a trend following strategy, it relies on strong trending moves in the market and can get whipsawed in ranging markets;
2. The middle band trailing stop can sometimes be too wide, leading to larger losses; 
3. It cannot accurately determine trend reversals and thus may result in large losses when trends reverse.

The risks can be reduced by fine tuning the middle band length or incorporating other stop loss methods. Additional filters on entry logic can also help avoid unnecessary trades.

## Optimization Directions

Some ways to optimize this strategy:

1. Optimize Donchian Channel parameters for more markets;
2. Incorporate other indicators to improve trend detection and entry accuracy;
3. Refine middle band trailing stop logic to make it more robust; 
4. Add filters to reduce frequency of trades.

## Conclusion

In summary, this is a very simple long term trend following strategy using Donchian Channels for trend direction and entries, with a middle band trailing stop. It can achieve high profits when used in strongly trending markets. But there are also risks that need to be addressed through parameter tuning and stop loss optimization to make the strategy more robust.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Donchian Channel length|
|v_input_2|0|Middleband length: regular or double: double|regular|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-07 00:00:00
end: 2024-01-14 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/

// Donchian Channels Strategy - Long Term Trend
// by SparkyFlary

//For Educational Purposes
//Results can differ on different markets and can fail at any time. Profit is not guaranteed.
strategy("Donchian Channels Strategy - Long Term Trend", shorttitle="Donchian Channels LT Strategy", overlay=true)

length = input(20, title="Donchian Channel length")
option = input("double", title="Middleband length: regular or double", options=["regular","double"])

upperband = highest(high, length)[1]
lowerband = lowest(low, length)[1]
middlebandLength = option=="double"?length*2:length
middleband = avg(highest(high, middlebandLength)[1], lowest(low, middlebandLength)[1])

//Plots
ubP = plot(upperband, title="Upperband", style=plot.style_line, linewidth=2)
lbP = plot(lowerband, title="Lowerband", style=plot.style_line, linewidth=2)
mbP = plot(middleband, title="Middleband", style=plot.style_line, color=color.maroon, linewidth=2)

//Strategy
buy = close > upperband
sell = close < middleband
short = close < lowerband
cover = close > middleband

strategy.entry(id="enter long", long=true, when=buy)
strategy.close(id="enter long", comment="exit long", when=sell)
strategy.entry(id="enter short", long=false, when=short)
strategy.close(id="enter short", comment="exit short", when=cover)
```

> Detail

https://www.fmz.com/strategy/438810

> Last Modified

2024-01-15 14:48:03
