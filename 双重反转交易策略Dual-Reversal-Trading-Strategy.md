
> Name

双重反转交易策略Dual-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17f94b2113065fe22c3.png)


## Overview

The dual reversal trading strategy combines the "123 reversal" and "N consecutive bars down" sub-strategies to efficiently capture trading opportunities when trend reversal occurs. This strategy is more suitable for medium and long term trading.

## Strategy Logic

### 123 Reversal 

The "123 reversal" sub-strategy is based on the principle:

Go long when the closing price of the previous two days shows a reverse (i.e. if previous close is higher than the close before previous day, current close is lower than previous close), and the 9-day fast stochastic is lower than 50; 

Go short when the closing price of the previous two days shows a reverse (i.e. if previous close is lower than the close before previous day, current close is higher than previous close), and the 9-day fast stochastic is higher than 50.

This sub-strategy identifies trend reversal by judging the reverse of previous two closing prices combined with stochastic indicator.

### N Consecutive Bars Down

The "N consecutive bars down" sub-strategy is based on the principle: 

Count the recent N bars and see if the closing prices show consecutive downward movement. If yes, a short signal is generated.

This sub-strategy identifies trend reversal by consecutive downward price movement.

### Combination of Signals 

The dual reversal trading strategy combines the two sub-strategies by only taking actual positions when both long or short signals are triggered at the same time.

This helps filter out some false signals and makes the trading signals more reliable. The combination of reversal and consecutive down signals can also more accurately identify trend reversal timing.

## Advantage Analysis

The dual reversal trading strategy has the following advantages:

1. Combining multiple sub-strategies helps filter out false signals effectively and improves reliability of signals.

2. The 123 reversal strategy can accurately identify short term trend reversal points. The N bar consecutive down strategy looks at medium-long term reversal. The two complement each other and capture short term opportunities at medium-long term levels.

3. Using technical indicators from stock charts makes the strategy flexible to adjust parameters for different products. 

4. The strategy logic is simple and easy to understand and track, suitable for beginners to learn.

5. Customizable parameters of sub-strategies allow optimization for different products, improving adaptability.

## Risk Analysis

There are also some risks associated with the dual reversal trading strategy:

1. Reversal signals may give false signals sometimes. Although the combined signals reduce false signals, the risk cannot be completely eliminated. It's recommended to use stops.

2. The sub-strategies use simple indicators and may not adapt well to complex market situations. More technical indicators or machine learning could be introduced to improve adaptability.

3. Sub-strategy parameters need optimization for different products, otherwise overfitting problems may occur.

4. Reversal strategies fit better for medium-long term. There are risks of being stopped out in the short term. Proper position holding period should be adjusted.

5. Reversal signals may come during range-bound corrections in a trend. Overall trend should be confirmed to ensure consistency with the major trend.

## Optimization Directions

The dual reversal trading strategy can be optimized in the following aspects:

1. Introduce more technical indicators, build a multi-factor model to improve adaptability to complex market situations. For example, combining with moving average, Bollinger bands etc.

2. Add machine learning models to take advantage of multi-dimensional features and improve signal accuracy. For example, introduce random forest or neural networks.

3. Optimize parameters for different products through training to improve adaptability. Genetic algorithm can be used to search for optimal parameter combinations.

4. Incorporate stop loss strategies to control single trade risks. Stop loss levels can also be data-driven optimized.

5. Develop dynamic position sizing mechanisms based on market conditions and sub-strategy signals to lower risks.

6. Introduce trend filtering modules to avoid signal contradictions with the overall trend. Simple moving averages can be used to determine trends.

## Conclusion

The dual reversal trading strategy efficiently captures trend reversals by combining the 123 reversal and N consecutive bars down sub-strategies. It fits better for medium-long term holdings and can filter out false signals to provide reliable trading opportunities during trend reversals. But there are also some limitations that need addressing through introducing more technical indicators and optimization, together with stop loss and position sizing to lower risks, in order to adapt to more complex market environments. Overall, it provides a simple and straightforward approach for trend reversal trading and serves as good learning materials for beginners to understand and learn about quantitative trading strategies. With more optimization techniques, it can become a very practical quantitative trading strategy.



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- N Bars Down ----|
|v_input_7|4|nLength|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-24 00:00:00
end: 2023-10-28 03:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 24/03/2021
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
// Evaluates for n number of consecutive lower closes. Returns a value 
// of 1 when the condition is true or 0 when false.
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


NBD(nLength) =>
    pos = 0.0
    nCounter = 0
    nCounter :=  iff(close[1] <= open[1], nz(nCounter[1],0)+1,
                   iff(close[1] > open[1], 0, nCounter))
    C2 = iff(nCounter >= nLength, 1, 0)
    posprice = 0.0
    posprice := iff(C2== 1, close, nz(posprice[1], 0)) 
    pos := iff(posprice > 0, -1, 0)
    pos

strategy(title="Combo Backtest 123 Reversal & N Bars Down", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- N Bars Down ----")
nLength = input(4, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posNBD = NBD(nLength)
pos = iff(posReversal123 == 1 and posNBD == 1 , 1,
	   iff(posReversal123 == -1 and posNBD == -1, -1, 0)) 
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

https://www.fmz.com/strategy/430768

> Last Modified

2023-11-01 16:49:36
