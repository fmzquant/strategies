
> Name

双重均线反转策略Dual-Moving-Average-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

The dual moving average reversal strategy is a trading strategy that combines mean reversion and moving average principles. It first generates reversal trading signals using the 123 reversal methodology, and then filters the signals with 2/20 exponential moving averages, only taking trades when the signals from both match to improve robustness. This strategy aims to capture short-term reversal opportunities while using the long-term trend filter to identify high probability setups.

## Strategy Logic

The strategy consists of two parts:

1. 123 Reversal Strategy

The 123 reversal strategy originates from the book "How I Tripled My Money in the Futures Market". It is based on the idea that if the closing price drops from a high to low level over 2 days, and the 9-day slow stochastic is below 50, it signals a reversal point to go long. If the closing price rises from a low to high level over 2 days, and the 9-day fast stochastic is above 50, it signals a reversal point to go short.

2. 2/20 Exponential Moving Average Strategy 

This strategy uses the 2/20 EMA to determine the long-term trend. When the price is above the 2/20 EMA line, it signals an uptrend. When the price is below the 2/20 EMA line, it signals a downtrend. This filters out false breakouts.

The strategy only generates trade signals when the 123 reversal signal aligns with the 2/20 EMA signal. 

## Advantage Analysis

This strategy has the following advantages by combining short-term reversals and long-term trends:

1. Captures high profit opportunities from short-term reversals

The 123 reversal targets overbought and oversold scenarios where significant price swings often occur, allowing for larger profit targets.

2. 2/20 EMA filter avoids false breakout risks 

Pure reversal strategies are susceptible to trending markets. The 2/20 EMA filter eliminates signals against the trend, preventing bad trades during fakeouts.

3. Dual conditions improve risk reward profile

A single indicator often generates erroneous signals. Combining two complementary indicators significantly improves reliability and risk-reward outcomes.

4. Clear logic makes optimization intuitive

The clear functionality of each component makes the logic intuitive to understand, optimize, and adapt to changing market environments.

## Risk Analysis 

Despite the advantages, some risks need to be considered:

1. Reversals may not materialize

Past performance does not guarantee future results. The extent of the actual reversal bounce is uncertain and may result in losses.

2. Trends can extend  

The 2/20 EMA cannot fully filter strong trending markets. Short term corrections can still get overwhelmed by the larger trend.

3. Parameter optimization is crucial

Performance is very sensitive to parameter settings which must be robustly optimized through extensive backtesting and tuned for changing markets.

4. Long-term efficacy uncertain

Good short-term results do not guarantee lasting performance. Markets are highly stochastic and long-term outcomes require robust validation across diverse environments.

These risks can be managed through parameter tuning, stop losses, risk controls etc. More conditions like volume, volatility indicators can improve robustness. Machine learning techniques could enable dynamic optimization as well.

## Enhancement Opportunities

Some ways to further optimize the strategy:

1. Optimize reversal parameters 

Test different parameter sets to find more stable and pronounced reversal patterns for higher quality signals.

2. Optimize moving average systems

Experiment with different MA parameters or incorporate multiple MA checks for more accurate trend assessment. 

3. Add more filters

Volume, volatility and other filters can be incorporated to reduce false signals and improve stability.

4. Implement dynamic optimization

Machine learning techniques on large historical datasets could enable dynamic and robust parameter tuning.

5. Incorporate stop loss strategies 

Intelligent stop loss rules help control maximum drawdown and risk exposure.

6. Optimize money management

Better position sizing and capital allocation can enhance overall performance.

## Conclusion

The dual moving average reversal is a simple yet practical short-term trading strategy. By combining mean reversion and trend-following concepts, it aims to profit from high probability price reversals while avoiding false breakouts. The clear logic makes it intuitive to understand, optimize and apply. However, no strategy is risk-free. Continued improvements in robustness and risk management are needed to extract consistent profits in diverse trading environments.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- 2/20 Exponential MA ----|
|v_input_7|20|LengthMA|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-18 00:00:00
end: 2023-09-25 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 06/08/2021
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
// This indicator plots 2/20 exponential moving average. For the Mov 
// Avg X 2/20 Indicator, the EMA bar will be painted when the Alert criteria is met.
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


EMA220(Length) =>
    pos = 0.0
    xPrice = close
    xXA = ema(xPrice, Length)
    nHH = max(high, high[1])
    nLL = min(low, low[1])
    nXS = iff((nLL > xXA)or(nHH < xXA), nLL, nHH)
    pos :=  iff(close > xXA and close > nXS , 1,
    	     iff(close < xXA and close < nXS, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & 2/20 Exponential MA", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- 2/20 Exponential MA ----")
LengthMA = input(20, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posEMA220 = EMA220(LengthMA)
pos = iff(posReversal123 == 1 and posEMA220 == 1 , 1,
	   iff(posReversal123 == -1 and posEMA220 == -1, -1, 0)) 
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

https://www.fmz.com/strategy/427878

> Last Modified

2023-09-26 15:27:58
