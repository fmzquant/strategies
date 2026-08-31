
> Name

All-about-the-ATR-and-EMA-based-trend-following-strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/150477f408b60aa5de1.png)

## Overview

The core idea of this strategy is to use the price fluctuation range calculated by the ATR indicator to judge price breakthroughs, and the EMA indicator to judge the overall trend direction, so as to achieve trend following trading. When the price breaks through the upper or lower limit of the ATR range, if the breakthrough direction is consistent with the EMA direction, take long or short positions. The closing condition is that the price breaks through the ATR range again.

## Strategy Principle 

Firstly, this strategy uses the ATR indicator to calculate the price fluctuation range over a certain period. The upper limit of the ATR range is SMA+ATR, and the lower limit is SMA-ATR. Where SMA represents the simple moving average of the closing price on the day, and ATR represents the True Range Average.

When the price breaks through the upper or lower limit of the ATR range, a trading opportunity occurs. At this time, it is necessary to judge the direction. If it is an upward breakthrough, go long. If it is a downward breakthrough, go short. To ensure the breakthrough direction is consistent with the trend direction, the strategy uses the EMA indicator to determine the overall trend direction. Only when the breakthrough direction is consistent with the EMA direction will a position be taken.

Finally, the strategy uses the price breaking through the ATR range again as the closing signal. After going long, close the position when the price falls below the lower limit; after going short, close the position when the price rises above the upper limit.


## Strategy Advantages

1. Using the ATR indicator to determine breakthroughs can effectively capture price trend breakthroughs. The ATR range is set based on volatility and will not interfere too much with normal fluctuations.

2. Adding the EMA indicator as a directional judgment avoids trading against the trend direction, which can greatly improve the profit rate.

3. Using the price break back above the ATR range as a stop loss method can maximize risk control.


## Strategy Risks

1. In a volatile market, the ATR range may be frequently penetrated, which easily leads to excessive invalid trades and wider losses.

2. The EMA as an indicator for judging trend direction has some lag. So it may miss opportunities for short-term price reversals.

3. The stop loss method is price break back above range, which can easily lead to widened losses due to sudden events.


## Strategy Optimization Directions 

1. Consider combining other indicators to determine trends and pullbacks to avoid EMA singular judgment errors. Such as MACD, KDJ, etc.

2. Consider adjusting ATR parameters in real time according to market volatility so that the ATR range is closer to the actual fluctuation.

3. Consider incorporating a moving stop loss method to continuously adjust the stop loss point to maximize the risk control of single losses.


## Summary

The overall idea of this strategy is clear, using the ATR indicator to determine price breakthroughs and cooperating with EMA to determine direction, it can effectively follow trends; The stop loss method is straightforward and easy to operate. But at the same time, there are certain risks and large room for optimization that need further testing and adjustment. In general, this strategy is suitable for trend traders pursuing high win rates.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|37|Periods|
|v_input_2|0.2|Range Multiplier|
|v_input_3|5000|Take Profit|
|v_input_4|2500|Stop Loss|
|v_input_5|true|Lots to Trade|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-23 00:00:00
end: 2024-02-22 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © cwagoner78
//@version=4
strategy("cATRpillar", overlay=true)
//------------

//inputs
lookback = input(title="Periods", type=input.integer, defval=37)
atrMult = input(title="Range Multiplier", type=input.float, defval=.2)
takeProfit = input(title="Take Profit", type=input.float, defval=5000)
stopLoss = input(title="Stop Loss", type=input.float, defval=2500)
lots = input(title="Lots to Trade", type=input.float, defval=1)
//------------

//indicators
atr=atr(lookback)*atrMult
sma=sma(close, lookback)
ema=ema(close,lookback*2)
rangeLo=sma-atr
rangeHi=sma+atr
//------------

//draw objects
p0 =plot(close, title="Close", color=#26A69A, linewidth=0, transp=80,style=plot.style_stepline)
p1 =plot(rangeHi, title="High", color=color.fuchsia, linewidth=0, transp=80,style=plot.style_stepline)
p2 =plot(rangeLo, title="Low", color=color.lime, linewidth=0, transp=80,style=plot.style_stepline)
p3 =plot(ema, title="EMA", color=color.white, linewidth=0, transp=80, style=plot.style_stepline)
fill(p1, p0, color=color.fuchsia)
fill(p0, p2, color=color.lime)
//------------

//Trading
atrShort=open[1] > rangeHi and open < rangeLo
atrLong=open[1] < rangeLo and open > rangeHi
exitLong=open>rangeLo
exitShort=open<rangeHi

//Long
longCondition=atrLong and open>ema+atr
strategy.entry(id="cATRpillar-Buy", long=true, when=longCondition)
longCloseCondition=exitLong
strategy.exit(id="cATRpillar-Exit", qty=lots, profit=takeProfit, loss=stopLoss, when=longCloseCondition)

//Short
shortCondition=atrShort and open<ema-atr
strategy.entry(id="cATRpillar-Sell", long=false, when=shortCondition)
shortCloseCondition=exitShort
strategy.exit(id="cATRpillar-Exit",  qty=lots, profit=takeProfit, loss=stopLoss, when=shortCloseCondition)

plotshape(shortCondition,  title= "Short", location=location.belowbar, color=color.fuchsia, transp=80, style=shape.triangledown, size=size.tiny)
plotshape(longCondition,  title= "Long", location=location.abovebar, color=color.lime, transp=80, style=shape.triangleup, size=size.tiny)
//------------






```

> Detail

https://www.fmz.com/strategy/442644

> Last Modified

2024-02-23 14:34:24
