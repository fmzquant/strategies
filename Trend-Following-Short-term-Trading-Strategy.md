
> Name

Trend-Following-Short-term-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fcd4c6bd95c7f2ca00.png)

## Overview

This strategy is a short-term trading strategy that identifies trend based on multiple indicators. It combines 8 indicators including WOW, BMA, BarColor, SuperTrend, DI, TTS, RSI and WTO to determine the trend direction and make trading decisions accordingly.

## Strategy Logic

The strategy first calculates and judges the trend direction of the 8 indicators - WOW, BMA, BarColor, SuperTrend, DI, TTS, RSI and WTO. 

The WOW indicator judges bullish or bearish trend based on the body location. Body near upper band indicates bullish while body near lower band indicates bearish.

The BMA indicator judges trend by the relationship between SMA of open and close. Close SMA crossing above Open SMA indicates bullish while crossing below indicates bearish.

The BarColor indicator judges trend by the color of candlesticks. Continuous yellow candles suggest bullish while black candles suggest bearish.

The SuperTrend indicator judges trend based on the price location versus the average range. Price above upper band indicates bullish while price below lower band indicates bearish.

The DI indicator judges trend by the relationship between positive and negative directional movement. Positive DI greater than Negative DI suggests bullish while vice versa suggests bearish.

The TTS indicator judges trend based on the price location versus moving average. 

The RSI indicator judges trend direction based on the level of relative strength index.

The WTO indicator judges trend direction based on the wave trend oscillator.

The strategy then counts the number of bullish signals from the 8 indicators and plots the SILA support and resistance lines accordingly. More lines indicate stronger trend signal. 

When multiple indicators suggest bullish, buying signal is generated when close is above the lowest support line. When multiple indicators suggest bearish, selling signal is generated when close is below the lowest resistance line.

In addition, the strategy also utilizes candlestick patterns to find pullback opportunities and improve entry points.

## Advantages of the Strategy

1. Combining multiple indicators improves accuracy

The strategy uses 8 common trend indicators to determine the trend from multiple aspects, thus improving the accuracy and reliability of trend judgment.

2. SILA system identifies strength of signals 

The SILA support/resistance lines reflect the number of bullish/bearish signals. More lines indicate stronger signals. This helps traders to further evaluate the strength of trading signals.

3. Candlestick patterns improve entry points

The strategy seeks pullback opportunities based on candlestick patterns to find better entry points when trend reverses.

## Risks of the Strategy

1. Potential conflicts between indicators

The multiple indicators may sometimes generate conflicting signals, making decision-making more difficult.

2. Parameters may require optimization

The default parameters may not be optimal. Further optimization may be needed to achieve the best results.

3. Consider systemic risks 

Black swan events may invalidate normal technical signals. Market systemic risks should be evaluated.

4. Drawdown risk

Following the trend may result in larger drawdowns during market corrections. Trade size should be managed to limit drawdown.

## Enhancement of the Strategy

1. Optimize indicator parameters

Systematically test and optimize parameters like period and value levels to find the optimal parameter combination.

2. Add stop loss methods 

Consider adding moving or percentage stop loss to control drawdowns.

3. Incorporate volume indicators

Combine trend indicators with volume indicators like MAVP and OBV to improve tactic decisions.

4. Manage position sizing

Research optimal position sizes for different market stages, and size up when trend becomes more apparent.

## Conclusion

In summary, this is a multi-indicator trend following short-term trading strategy. It determines trend direction using multiple indicators and identifies strength of signals with the SILA system, supplemented by candlestick patterns for entry improvements. The strategy can improve accuracy but the risk of conflicting signals should be noted. Further improvements can be made through parameter optimization, stop loss optimization, volume incorporation etc.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Uptrend-sensivity|
|v_input_2|5|Downtrend-sensivity|
|v_input_3|true|Use trend-indicator WOW?|
|v_input_4|true|Use trend-indicator BestMA?|
|v_input_5|true|Use trend-indicator BarColor?|
|v_input_6|true|Use trend-indicator SuperTrend?|
|v_input_7|true|Use trend-indicator DI?|
|v_input_8|true|Use trend-indicator TTS?|
|v_input_9|true|Use trend-indicator RSI?|
|v_input_10|true|Use trend-indicator WTO?|
|v_input_11|100|Distance SILA-lines|
|v_input_12|true|Need SILA-lines?|
|v_input_13|true|Need uptrend-background?|
|v_input_14|true|Need downtrend-background?|
|v_input_15|true|Need background always?|
|v_input_16|true|Need new-trend-arrows?|
|v_input_17|true|Need locomotive-arrows?|
|v_input_18|true|Need money?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-16 00:00:00
end: 2023-11-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// (c) Noro
//2017

//@version=2

strategy(title="Noro's SILA v1.6L Strategy", shorttitle="SILA v1.6L str", overlay=true)

//settings
sensup = input(5, title="Uptrend-sensivity", minval = -8, maxval = 8)
sensdn = input(5, title="Downtrend-sensivity", minval = -8, maxval = 8)
usewow = input(true, title="Use trend-indicator WOW?")
usebma = input(true, title="Use trend-indicator BestMA?")
usebc = input(true, title="Use trend-indicator BarColor?")
usest = input(true, title="Use trend-indicator SuperTrend?")
usedi = input(true, title="Use trend-indicator DI?")
usetts = input(true, title="Use trend-indicator TTS?")
usersi = input(true, title="Use trend-indicator RSI?")
usewto = input(true, title="Use trend-indicator WTO?")
dist = input(100, title="Distance SILA-lines", minval = 0, maxval = 100)
usetl = input(true, title="Need SILA-lines?")
usebgup = input(true, title="Need uptrend-background?")
usebgdn = input(true, title="Need downtrend-background?")
usealw = input(true, title="Need background always?")
usearr = input(true, title="Need new-trend-arrows?")
useloco = input(true, title="Need locomotive-arrows?")
usemon = input(true, title="Need money?") //joke

// WOW 1.0 method
lasthigh = highest(close, 30)
lastlow = lowest(close, 30)
center = (lasthigh +lastlow) / 2
body = (open + close) / 2
trend1 = body > center ? 1 : body < center ? -1 : trend1[1]
trend2 = center > center[1] ? 1 : center < center[1] ? -1 : trend2[1]
WOWtrend = usewow == true ? trend1 == 1 and trend2 == 1 ? 1 : trend1 == -1 and trend2 == -1 ? -1 : WOWtrend[1] : 0

// BestMA 1.0 method
SMAOpen = sma(open, 30)
SMAClose = sma(close, 30)
BMAtrend = usebma == true ? SMAClose > SMAOpen ? 1 : SMAClose < SMAOpen ? -1 : BMAtrend[1] : 0

// BarColor 1.0 method
color = close > open ? 1 : 0
score = color + color[1] + color[2] + color[3] + color[4] + color[5] + color[6] + color[7]
BARtrend = usebc == true ? score > 5 ? 1 : score < 3 ? -1 : BARtrend[1] : 0

// SuperTrend mehtod
Up = hl2 - (7 * atr(3))
Dn = hl2 + (7 * atr(3))
TrendUp = close[1] > TrendUp[1] ? max(Up, TrendUp[1]) : Up
TrendDown = close[1] < TrendDown[1] ? min(Dn, TrendDown[1]) : Dn
SUPtrend = usest == true ? close > TrendDown[1] ? 1: close < TrendUp[1]? -1 : SUPtrend[1] : 0

//DI method
th = 20
TrueRange = max(max(high-low, abs(high-nz(close[1]))), abs(low-nz(close[1])))
DirectionalMovementPlus = high-nz(high[1]) > nz(low[1])-low ? max(high-nz(high[1]), 0): 0
DirectionalMovementMinus = nz(low[1])-low > high-nz(high[1]) ? max(nz(low[1])-low, 0): 0
SmoothedTrueRange = nz(SmoothedTrueRange[1]) - (nz(SmoothedTrueRange[1])/14) + TrueRange
SmoothedDirectionalMovementPlus = nz(SmoothedDirectionalMovementPlus[1]) - (nz(SmoothedDirectionalMovementPlus[1])/14) + DirectionalMovementPlus
SmoothedDirectionalMovementMinus = nz(SmoothedDirectionalMovementMinus[1]) - (nz(SmoothedDirectionalMovementMinus[1])/14) + DirectionalMovementMinus
DIPlus = SmoothedDirectionalMovementPlus / SmoothedTrueRange * 100
DIMinus = SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100
DItrend = usedi == true ? DIPlus > DIMinus ? 1 : -1 : 0

//TTS method (Trend Trader Strategy)
//Start of HPotter's code
//Andrew Abraham' idea
avgTR      = wma(atr(1), 21)
highestC   = highest(21)
lowestC    = lowest(21)
hiLimit = highestC[1]-(avgTR[1] * 3)
loLimit = lowestC[1]+(avgTR[1] * 3)
ret = iff(close > hiLimit and close > loLimit, hiLimit, iff(close < loLimit and close < hiLimit, loLimit, nz(ret[1], 0)))
pos =	iff(close > ret, 1, iff(close < ret, -1, nz(pos[1], 0))) 
//End of HPotter's code

TTStrend = usetts == true ? pos == 1 ? 1 : pos == -1 ? -1 : TTStrend[1] : 0

//RSI method
RSIMain = (rsi(close, 13) - 50) * 1.5
rt = iff(RSIMain > -10, 1, iff(RSIMain < 10, -1, nz(pos[1], 0))) 
RSItrend = usersi == true ? rt : 0

//WTO ("WaveTrend Oscilator") method by LazyBear
//Start of LazyBear's code
esa = ema(hlc3, 10)
d = ema(abs(hlc3 - esa), 10)
ci = (hlc3 - esa) / (0.015 * d)
tci = ema(ci, 21)
//End of LazyBear's code

WTOtrend = usewto == true ? tci > 0 ? 1 : tci < 0 ? -1 : 0 : 0

//plots
trends = usemon == true ? WOWtrend + BMAtrend + BARtrend + SUPtrend + DItrend + TTStrend + RSItrend + WTOtrend: -1 * (WOWtrend + BMAtrend + BARtrend + SUPtrend + DItrend + TTStrend + RSItrend + WTOtrend)
pricehi = sma(high, 10)
pricelo = sma(low, 10)
per = usetl == 1 ? dist / 10000 : 0

color1 = usetl == true ? trends > 0 ? blue : na : na
plot(pricelo * (1 - per), color=color1, linewidth=1, title="SILA-line")
color2 = usetl == true ? trends > 1 ? blue : na : na
plot(pricelo * (1 - 2 * per), color=color2, linewidth=1, title="SILA-line")
color3 = usetl == true ? trends > 2 ? blue : na : na
plot(pricelo * (1 - 3 * per), color=color3, linewidth=1, title="SILA-line")
color4 = usetl == true ? trends > 3 ? blue : na : na
plot(pricelo * (1 - 4 * per), color=color4, linewidth=1, title="SILA-line")
color5 = usetl == true ? trends > 4 ? blue : na : na
plot(pricelo * (1 - 5 * per), color=color5, linewidth=1, title="SILA-line")
color6 = usetl == true ? trends > 5 ? blue : na : na
plot(pricelo * (1 - 6 * per), color=color6, linewidth=1, title="SILA-line")
color7 = usetl == true ? trends > 6 ? blue : na : na
plot(pricelo * (1 - 7 * per), color=color7, linewidth=1, title="SILA-line")
color8 = usetl == true ? trends > 7 ? blue : na : na
plot(pricelo * (1 - 8 * per), color=color8, linewidth=1, title="SILA-line")

color10 = usetl == true ? trends < 0 ? black : na : na
plot(pricehi * (1 + per), color=color10, linewidth=1, title="SILA-line")
color11 = usetl == true ? trends < -1 ? black : na : na
plot(pricehi * (1 + 2 * per), color=color11, linewidth=1, title="SILA-line")
color12 = usetl == true ? trends < -2 ? black : na : na
plot(pricehi * (1 + 3 * per), color=color12, linewidth=1, title="SILA-line")
color13 = usetl == true ? trends < -3 ? black : na : na
plot(pricehi * (1 + 4 * per), color=color13, linewidth=1, title="SILA-line")
color14 = usetl == true ? trends < -4 ? black : na : na
plot(pricehi * (1 + 5 * per), color=color14, linewidth=1, title="SILA-line")
color15 = usetl == true ? trends < -5 ? black : na : na
plot(pricehi * (1 + 6 * per), color=color15, linewidth=1, title="SILA-line")
color16 = usetl == true ? trends < -6 ? black : na : na
plot(pricehi * (1 + 7 * per), color=color16, linewidth=1, title="SILA-line")
color17 = usetl == true ? trends < -7 ? black : na : na
plot(pricehi * (1 + 8 * per), color=color17, linewidth=1, title="SILA-line")

//background
col = usebgup == true and trends >= sensup ? 1 : usebgdn == true and trends <= (-1 * sensdn) ? -1 : usealw == true ? col[1] : 0
bgcolor = col == 1 ? lime : col == -1 ? red : na
//bgcolor(bgcolor, transp=70)

//arrows
posi = trends >= sensup ? 1 : trends <= (-1 * sensdn) ? -1 : posi[1]
arr = usearr == true ? posi == 1 and posi[1] < 1 ? 1 : posi == -1 and posi[1] > -1 ? -1 : na : na
//plotarrow(arr == 1 ? 1 : na, title="UpArrow", colorup=blue, maxheight=60, minheight=50, transp=0)
//plotarrow(arr == -1 ? -1 : na, title="DnArrow", colordown=blue, maxheight=60, minheight=50, transp=0)

//locomotive
bar = close > open ? 1 : close < open ? -1 : 0
locotop = bar == -1 and bar[1] == 1 and bar[2] == 1 ? 1 : 0
locobot = bar == 1 and bar[1] == -1 and bar[2] == -1 ? 1 : 0
entry = useloco == false ? 1 : posi == posi[1] ? (locotop == 1 and posi == -1) or (locobot == 1 and posi == 1) ? 1 : entry[1] : 0
//plotarrow(locobot == 1 and entry[1] == 0 and posi == 1 ? 1 : na, title="UpLocomotive", colorup=yellow, maxheight=60, minheight=50, transp=0)
//plotarrow(locotop == 1 and entry[1] == 0 and posi == -1 ? -1 : na, title="DnLocomotive", colordown=yellow, maxheight=60, minheight=50, transp=0)

longCondition = arr == 1
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = arr == -1
if (shortCondition)
    strategy.entry("Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/432309

> Last Modified

2023-11-16 11:11:32
