
> Name

Reversal-and-Linear-Regression-Intercept-Combo-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy combines the 123 reversal strategy and linear regression intercept strategy to implement a multi-factor driven combo trading strategy. The 123 reversal strategy judges the price relationship between the last two trading days and combines the Stoch indicator to determine the reversal signal. The linear regression intercept strategy uses linear regression analysis to judge the relationship between price and trend line and generate trading signals. The two strategies verify each other and can effectively filter false signals.

## Strategy Principle

### 123 Reversal Strategy

The strategy is based on the following principles:

1. If the closing price relationship between the last two trading days is today's closing price higher than yesterday's, and the Stoch fast line is lower than the slow line, it is considered that there is a bullish reversal signal

2. If the closing price relationship between the last two trading days is today's closing price lower than yesterday's, and the Stoch fast line is higher than the slow line, it is considered that there is a bearish reversal signal

The judgment rules are as follows:

- If today's closing price > yesterday's closing price and Stoch fast line < Stoch slow line and Stoch fast line > set parameter, generate buy signal

- If today's closing price < yesterday's closing price and Stoch fast line > Stoch slow line and Stoch fast line < set parameter, generate sell signal

The strategy needs to set Stoch indicator parameters, including: K line cycle Length for Stoch calculation, smoothing cycle KSmoothing for Stoch fast line, smoothing cycle DLength for Stoch slow line, threshold Level for Stoch fast line judgment.

### Linear Regression Intercept Strategy

The strategy is based on linear regression analysis to judge the relationship between price and linear regression trend line. The judgment rules are as follows:

- If the closing price is greater than the linear regression intercept, a buy signal is generated

- If the closing price is less than the linear regression intercept, a sell signal is generated

The strategy needs to set the linear regression cycle LengthLRI and the linear regression input data source xSeria.

### Combo Strategy

The combo strategy requires simultaneous buy/sell signals from both the 123 reversal strategy and the linear regression intercept strategy to generate actual trading orders, which effectively filters out false signals and improves trading performance.

## Advantage Analysis

The strategy has the following advantages:

1. Multi-factor driven, effectively filter out false signals and improve signal quality

The combination of two different types of strategies requires signals from both strategies to actually place orders. This multi-factor verification mechanism can filter out occasional wrong signals from a strategy, reduce unnecessary trading, and effectively improve signal quality.

2. Real-time monitoring of price and trend relationships avoids being trapped

The linear regression intercept can reflect the relationship between price and trend line in real time. If the price deviates significantly from the trend, it will promptly prompt the strategy to adjust the position direction. This allows timely stop losses and avoids being trapped in historical trends.

3. Take into account trading opportunities for both trends and reversals

The linear regression strategy is better at identifying trend buy and sell points. While the 123 reversal strategy focuses on identifying reversal points. The two strategies can combine the advantages of trend trading and reversal trading.

4. Customizable parameter optimization of strategies

Both strategies provide certain parameters for customization, which can be optimized for different varieties and different trends to optimize the effect of the combined strategy.

## Risk Analysis

The strategy also has the following risks:

1. Multi-factor drivers may miss some opportunities

The need to meet the trading signals of both strategies will miss some opportunities that can be profitable relying solely on a single strategy. If one strategy weakens, it will drag down the overall trading performance.

2. Linear regression has lag

Linear regression requires some historical data for calculation and cannot respond in real time to sudden events, resulting in some lag. If there is a large price gap, the linear regression trend line will take some time to adjust, which may generate wrong signals during this period.

3. Reasonable parameter optimization is needed

Both strategies require appropriate parameter selection, which may need to be adjusted independently for some varieties. Improper parameter selection will greatly reduce the effectiveness of the strategy.

The risks can be reduced through the following methods:

1. Appropriately relax the combo signal triggering conditions to prevent missing too many opportunities

2. Combine trend indicators to replace linear regression to obtain more real-time trend judgments

3. Use machine learning methods to assist parameter optimization and improve parameter selection

## Optimization Directions

The strategy can be further optimized in the following ways:

1. Use machine learning methods for parameter optimization

Collect historical data, design parameter optimization goals, and use machine learning algorithms such as genetic algorithms and Bayesian optimization to search for the best parameter combinations.

2. Add stop-loss mechanism

Stop-loss rules can be set based on ATR, trend indicators, etc. to control maximum loss per trade.

3. Optimize entry and exit logic

Auxiliary conditions such as moving average filters and Bollinger Bands can be added on the basis of trading signals to reduce the frequency of position adjustments and avoid being trapped.

4. Combine sentiments analysis

Use natural language processing techniques to determine market participant sentiment and assist in trading decisions.

5. Add machine learning prediction module

Use deep learning models like LSTM and GRU to predict prices as an important reference for strategy decisions.

## Summary

This strategy combines the 123 reversal strategy and linear regression intercept strategy to implement multi-factor driven quantitative trading. The verification mechanism can effectively filter out false signals and capture reversal and trend trading opportunities. But there are also certain lag risks in the strategy that require attention to parameter optimization and expansion of risk control mechanisms to further improve strategy stability. Combining machine learning and other technologies for parameter optimization and feature expansion is a worthwhile further optimization direction for the strategy to explore.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Line Regression Intercept ----|
|v_input_7|14|LengthLRI|
|v_input_8_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-18 00:00:00
end: 2023-09-19 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 25/01/2021
// This is combo strategies for get a cumulative signal. 
//
// First strategy
// This System was created from the Book "How I Tripled My Money In The 
// Futures Market" by Ulf Jensen, Page 183. This is reverse type of strategies.
// The strategy buys at market, if close price is higher than the previous close 
// during 2 days and the meaning of 9-days Stochastic Slow Oscillator is lower than 50. 
// The strategy sells at market, if close price is lower than the previous close price 
// during 2 days and the meaning of 9-days Stochastic Fast Oscillator is higher than 50.
//
// Second strategy
// Linear Regression Intercept is one of the indicators calculated by using the 
// Linear Regression technique. Linear regression indicates the value of the Y 
// (generally the price) when the value of X (the time series) is 0. Linear 
// Regression Intercept is used along with the Linear Regression Slope to create 
// the Linear Regression Line. The Linear Regression Intercept along with the Slope 
// creates the Regression line.
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
Reversal123(Length, KSmoothing, DLength, Level) =>
    vFast = sma(stoch(close, high, low, Length), KSmoothing) 
    vSlow = sma(vFast, DLength)
    pos = 0.0
    pos := iff(close[2] < close[1] and close > close[1] and vFast < vSlow and vFast > Level, 1,
	         iff(close[2] > close[1] and close < close[1] and vFast > vSlow and vFast < Level, -1, nz(pos[1], 0))) 
	pos

LRI(Length,xSeria) =>
    pos = 0.0
    xX = Length * (Length - 1) * 0.5
    xDivisor = xX * xX - Length * Length * (Length - 1) * (2 * Length - 1) / 6
    xXY = 0.0
    for i = 0 to Length-1
    	xXY := xXY + (i * xSeria[i])
    xSlope = (Length * xXY - xX * sum(xSeria, Length)) / xDivisor
    xLRI = (sum(xSeria, Length) - xSlope * xX) / Length
    pos:= iff(close > xLRI, 1,
           iff(close < xLRI, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Line Regression Intercept", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Line Regression Intercept ----")
LengthLRI = input(14, minval=1)
xSeria = input(title="Source", type=input.source, defval=close)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posLRI = LRI(LengthLRI,xSeria)
pos = iff(posReversal123 == 1 and posLRI == 1 , 1,
	   iff(posReversal123 == -1 and posLRI == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/427884

> Last Modified

2023-09-26 15:56:48
