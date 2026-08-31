
> Name

双重均线反转和三重最低闪现的组合交易策略Dual-Moving-Average-Reversal-and-Triple-Bottom-Flash-Combo-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1f3d62dff5fdd8cb9f5.png)



### Overview

This trading strategy makes full use of the advantages of moving average reversal and triple bottom flash technical indicators for combo application. It captures reversal opportunities while tracking the trend, filtering out some false breakout signals, and can effectively improve the win rate of trading systems.

### Strategy Principles 

The strategy consists of two parts:

1. Combination of 2-day and 20-day moving averages. Buy and sell signals are generated when the 2-day moving average diverges from the 20-day moving average.

2. Triple bottom flash pattern. The emergence of this pattern is a signal for short-term reversal. The forming condition is: the lowest of the middle day is lower than the previous and the next day, and the closing price of the next day is higher than the highest of the previous day.

When the 2-day and 20-day moving averages simultaneously show reversal signals, and are consistent with the direction of the triple bottom flash pattern signal, take buy or sell actions.

In the code, the 2-day and 20-day moving averages are calculated first. When the 2-day moving average breaks through the 20-day moving average up or down, buy/sell signals are generated. 

When the triple bottom flash pattern is detected, the pattern direction signal is set to 1 or -1. Read the pattern signal of the previous day, combine it with the current moving average signal, and generate the final entry signal.

Thus, by filtering with the combination of moving averages and patterns, some false signals can be filtered out, making the trading strategy more reliable.

### Advantages

1. The combination of multiple technical indicators can complement and verify each other and improve signal reliability.

2. Moving average reversal can capture reversal points of trends in a timely manner and take advantage of reversals. The triple bottom flash can further confirm the reversal formation.

3. The 20-day moving average tracks the medium and long term trends, and the 2-day moving average captures entry points after short-term adjustments. The combination of multiple time frames can fully grasp the trend.

4. The strategy is not sensitive to parameters and is easy to implement and optimize.

### Risks

1. Reversal patterns are prone to misjudgment and experience is needed to judge their reliability. 

2. Reversal signals may lag, requiring observation of pattern features and appropriate position adjustment.

3. Testing and optimization are needed for different trading varieties, and some parameters may need to be adjusted.

4. Loss control needs to introduce a stop loss mechanism to avoid missing important reversal points.

### Optimization

1. Test different moving average combinations to select the best parameters for the variety.

2. Introduce other auxiliary indicators such as volume, Bollinger Bands, etc. for multi-indicator verification.

3. Add a stop loss module to control drawdowns and risks.

4. Optimize entry timing to avoid premature or late problems. 

5. Perform parameter optimization for specific varieties to improve adaptability.

### Summary

The strategy makes full use of the advantages of moving average reversal and short-term patterns to achieve effective combination of both, which can improve the stability and win rate of trading systems. But risk control, parameter testing and optimization are needed to adapt to the characteristics of different varieties. Overall, the strategy has a simple and clear structure that is easy to implement and is a practical trend reversal trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|(?●═════ 2/20 EMA ═════●)Length|
|v_input_2|false|(?●═════ MISC ═════●)Trade reverse|
|v_input_3|true|(?●═════ Time Start ═════●)From Day|
|v_input_4|true|From Month|
|v_input_5|2005|From Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-19 00:00:00
end: 2023-10-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 25/12/2021
// This is combo strategies for get a cumulative signal. 
//
// First strategy
// This indicator plots 2/20 exponential moving average. For the Mov 
// Avg X 2/20 Indicator, the EMA bar will be painted when the Alert criteria is met.
//
// Second strategy
// This startegy based on 3-day pattern reversal described in "Are Three-Bar 
// Patterns Reliable For Stocks" article by Thomas Bulkowski, presented in 
// January,2000 issue of Stocks&Commodities magazine.
// That pattern conforms to the following rules:
// - It uses daily prices, not intraday or weekly prices;
// - The middle day of the three-day pattern has the lowest low of the three days, with no ties allowed;
// - The last day must have a close above the prior day's high, with no ties allowed;
// - Each day must have a nonzero trading range. 
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
EMA20(Length ) =>
    pos = 0.0
    xPrice = close
    xXA = ema(xPrice, Length)
    nHH = max(high, high[1])
    nLL = min(low, low[1])
    nXS = iff((nLL > xXA)or(nHH < xXA), nLL, nHH)
    pos := iff(nXS > close[1] , -1, iff(nXS < close[1] , 1, nz(pos[1], 0))) 
	pos

BarR()=>
    pos = 0.0
    pos :=	iff(open[2] > close[2] and high[1] < high[2] and low[1] < low[2] and low[0] > low[1] and high[0] > high[1], 1,
    	     iff(open[2] < close[2] and high[1] > high[2] and low[1] > low[2] and high[0] < high[1] and low[0] < low[1], -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo 2/20 EMA & 3 Day Pattern", shorttitle="Combo", overlay = true)
var I1  = "●═════ 2/20 EMA ═════●"
Length = input(14, minval=1, group = I1)
//var I2  = "●═════ 3-Bar-Reversal-Pattern ═════●"
var misc  = "●═════ MISC ═════●"
reverse = input(false, title="Trade reverse", group = misc)
var timePeriodHeader  = "●═════ Time Start ═════●"
d = input(1, title="From Day", minval=1, maxval=31, group=timePeriodHeader)
m = input(1, title="From Month", minval=1, maxval=12, group=timePeriodHeader)
y = input(2005, title="From Year", minval=0, group=timePeriodHeader)

StartTrade = true
prePos3Bar = BarR()

posEMA20 = EMA20(Length)
pos3BarR = security(syminfo.tickerid, "D", prePos3Bar[1], barmerge.gaps_off, barmerge.lookahead_on)
pos = iff(posEMA20 == 1 and pos3BarR == 1 and StartTrade , 1,
	   iff(posEMA20 == -1 and pos3BarR == -1 and StartTrade, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1 ) 
    strategy.entry("Long", strategy.long)
if (possig == -1 )
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/430264

> Last Modified

2023-10-26 16:26:24
