
> Name

Dual-Moving-Average-and-Williams-Average-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

#### Overview

This strategy combines dual exponential moving averages and three Williams moving averages to form a comprehensive trend tracking and trend reversal signal generation system. It has excellent holding efficiency and can effectively filter out false signals.

#### Strategy Logic

This strategy consists of two sub-strategies:

1. Dual Exponential Moving Average (DEMA). This indicator combines the trend tracking capability of single exponential moving averages and the lagging feature of double exponential moving averages. It can go long faster when prices rise and can flatten positions faster when prices fall.

2. Williams Three Moving Averages. This indicator consists of long, medium and short lines. It uses the crossover of moving averages of different periods to determine trend changes and generate trading signals. When the short line crosses above the medium line and the medium line crosses above the long line, it is a long signal. When the short line crosses below the medium line and the medium line crosses below the long line, it is a short signal.

The trading signals of this strategy are the "AND" operation of the results of the two sub-strategies. That is, only when both sub-strategies issue signals at the same time, orders will be triggered for this strategy. This can effectively reduce false signals and improve the stability of holding positions.

#### Advantage Analysis 

The biggest advantage of this strategy is that it can effectively filter out false signals, which is determined by its strategy structure. Although double moving averages and Williams moving averages have their own disadvantages, combining them together can give full play to their respective advantages and compensate for each other. This enables the strategy to achieve efficient holdings in trending markets, and to stop losses in time during range-bound markets.

In addition, this strategy has large parameter optimization space. By adjusting the parameters of dual moving averages and three Williams moving averages, it can adapt to the characteristics of different varieties and cycles, and has strong adaptability.

#### Risk Analysis

The main risk of this strategy is that when the market enters violent fluctuations, the stop loss point may be broken, resulting in greater losses. This is a common problem with moving average strategies. In addition, in oscillating markets, this strategy may frequently open and close positions, increasing the cost of trading fees.

To control these risks, it is recommended to use the Walk Forward Analysis method for parameter optimization, and set reasonable stop loss points. At the same time, additional indicators can also be introduced to determine the market status and suspend trading during oscillating markets.

#### Optimization Directions

This strategy has the following optimization directions:

1. Adjust the parameters of dual moving averages to adapt to different varieties and cycles.

2. Adjust the cycles of the three Williams moving average lines to adapt to market volatility frequencies. 

3. Increase opening conditions to filter trading signals during specific market stages. For example, do not trade during violent fluctuations.

4. Increase stop loss indicators to control losses. Methods like trailing stop loss and average stop loss can be tried.

5. Introduce machine learning algorithms to automatically optimize parameters.

#### Conclusion

This strategy realizes effective filtering of trading signals by combining the advantages of dual moving averages and Williams moving averages, which can reduce false signals and improve holding efficiency. It can obtain better performance through parameter optimization according to market conditions, and has great application potential. At the same time, risk management is also required to control losses caused by drastic market fluctuations.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|(?●═════ 2/20 EMA ═════●)Length|
|v_input_int_2|13|(?●═════ 3Lines ═════●)LLength|
|v_input_int_3|8|MLength|
|v_input_int_4|5|SLength|
|v_input_int_5|8|LOffset|
|v_input_int_6|5|MOffset|
|v_input_int_7|3|SOffset|
|v_input_bool_1|false|(?●═════ MISC ═════●)Trade reverse|
|v_input_int_8|true|(?●═════ Time Start ═════●)From Day|
|v_input_int_9|true|From Month|
|v_input_int_10|2005|From Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 21/04/2022
// This is combo strategies for get a cumulative signal. 
//
// First strategy
// This indicator plots 2/20 exponential moving average. For the Mov 
// Avg X 2/20 Indicator, the EMA bar will be painted when the Alert criteria is met.
//
// Second strategy
// This indicator calculates 3 Moving Averages for default values of
// 13, 8 and 5 days, with displacement 8, 5 and 3 days: Median Price (High+Low/2).
// The most popular method of interpreting a moving average is to compare 
// the relationship between a moving average of the security's price with 
// the security's price itself (or between several moving averages).
//
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
EMA20(Length) =>
    pos = 0.0
    xPrice = close
    xXA = ta.ema(xPrice, Length)
    nHH = math.max(high, high[1])
    nLL = math.min(low, low[1])
    nXS = nLL > xXA or nHH < xXA ? nLL : nHH
    iff_1 = nXS < close[1] ? 1 : nz(pos[1], 0)
    pos := nXS > close[1] ? -1 : iff_1
    pos


BWA3Lines(LLength,MLength,SLength,LOffset,MOffset,SOffset) =>
    pos = 0.0
    xLSma = ta.sma(hl2, LLength)[LOffset]
    xMSma = ta.sma(hl2, MLength)[MOffset]
    xSSma = ta.sma(hl2, SLength)[SOffset]
    pos := close < xSSma and xSSma < xMSma and xMSma < xLSma ? -1 :
    	     close > xSSma and xSSma > xMSma and xMSma > xLSma ? 1 : nz(pos[1], 0) 
    pos

strategy(title='Combo 2/20 EMA & Bill Williams Averages. 3Lines', shorttitle='Combo', overlay=true)
var I1 = '●═════ 2/20 EMA ═════●'
Length = input.int(14, minval=1, group=I1)
var I2 = '●═════ 3Lines ═════●'
LLength = input.int(13, minval=1, group=I2)
MLength = input.int(8,minval=1, group=I2)
SLength = input.int(5,minval=1, group=I2)
LOffset = input.int(8,minval=1, group=I2)
MOffset = input.int(5,minval=1, group=I2)
SOffset = input.int(3,minval=1, group=I2)
var misc = '●═════ MISC ═════●'
reverse = input.bool(false, title='Trade reverse', group=misc)
var timePeriodHeader = '●═════ Time Start ═════●'
d = input.int(1, title='From Day', minval=1, maxval=31, group=timePeriodHeader)
m = input.int(1, title='From Month', minval=1, maxval=12, group=timePeriodHeader)
y = input.int(2005, title='From Year', minval=0, group=timePeriodHeader)
StartTrade = time > timestamp(y, m, d, 00, 00) ? true : false
posEMA20 = EMA20(Length)
prePosBWA3Lines = BWA3Lines(LLength,MLength,SLength,LOffset,MOffset,SOffset)
iff_1 = posEMA20 == -1 and prePosBWA3Lines == -1 and StartTrade ? -1 : 0
pos = posEMA20 == 1 and prePosBWA3Lines == 1 and StartTrade ? 1 : iff_1
iff_2 = reverse and pos == -1 ? 1 : pos
possig = reverse and pos == 1 ? -1 : iff_2
if possig == 1
    strategy.entry('Long', strategy.long)
if possig == -1
    strategy.entry('Short', strategy.short)
if possig == 0
    strategy.close_all()
barcolor(possig == -1 ? #b50404 : possig == 1 ? #079605 : #0536b3)
```

> Detail

https://www.fmz.com/strategy/440110

> Last Modified

2024-01-26 16:36:27
