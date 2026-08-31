
> Name

搏浪者策略Surf-Rider-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b574f56f2d91980319.png)


## Overview

The Surf Rider strategy is a combinational strategy that integrates different trend following strategies to generate more reliable trading signals. It combines the 123 Reversal strategy and the ECO strategy and aims to produce more accurate trading signals after trend confirmation. The name Surf Rider originates from the term for surfers, meaning that the strategy tries to ride the waves of market volatility to gain excess returns over the broader market.

## Strategy Logic

The Surf Rider strategy integrates two different types of strategies: reversal strategy and trend following strategy. 

Firstly, the 123 Reversal strategy is a reversal strategy. It uses candlestick information to identify price reversal signals. It generates a buy signal when yesterday's close is higher than the previous day's close, and today's close is lower than yesterday's, while the 9-day Slow K is lower than 50. It generates a sell signal when yesterday's close is lower than the previous day's close, and today's close is higher than yesterday's, while the 9-day Fast K is higher than 50.

Secondly, the ECO strategy is a trend following strategy. It uses the size and direction of price candlesticks to calculate momentum and determine the trend direction. The ECO indicator above 0 indicates an upward trend, while below 0 indicates a downward trend.

The Surf Rider strategy combines the signals from both strategies. It will only enter positions when both strategies generate signals in the same direction, for example when the ECO shows an upward trend and the 123 Reversal strategy also gives a buy signal. This avoids losing trades due to incorrect judgments from a single strategy.

## Advantage Analysis

Compared to a single strategy, the Surf Rider strategy has the following advantages:

1. Combining reversal and trend strategies complements their strengths and avoids weaknesses, making trading signals more reliable. The ECO ensures reversal only happens before trend changes, avoiding premature mid-trend reversals.

2. The 123 Reversal strategy uses the stochastic indicator to identify overbought and oversold areas, while the ECO strategy judges price momentum direction. The two strategies complement each other and reduce misjudgment probability.

3. The dual-strategy filter ensures opening positions only when both strategies agree on the same direction, which greatly reduces trading risk.

4. Flexible parameter tuning space allows optimizing parameters for different markets, making the strategy adaptable to more market environments.

5. The multi-timeframe approach combining intraday reversal and medium-term trend allows capturing more trading opportunities.

## Risk Analysis

Despite using multiple strategies to reduce individual strategy risks, the Surf Rider strategy still contains the following risks in trading:

1. The 123 Reversal strategy is weaker in range-bound markets, potentially generating consecutive loss-incurring reversal signals.

2. The ECO strategy underperforms in low liquidity environments so should be avoided there.

3. The dual-strategy filter may miss some profit signals that single strategies would capture separately. 

4. Incorrect parameter settings may cause the strategy to generate false signals. Parameters should be tuned to suit different markets.

5. The strategy may fail to adapt to some exceptional market conditions like black swan events.

## Optimization Directions

There is further room for optimizing the Surf Rider strategy:

1. Consider adding a stop loss strategy to exit positions automatically when losses reach stop loss levels.

2. Test different moving average parameters to find more stable parameter combinations.

3. Try machine learning based adaptive parameter optimization for dynamic parameter tuning.

4. Add more auxiliary strategies to further improve signal accuracy.

5. Test stability across different market environments and adjust parameters accordingly. 

6. Develop automated backtesting and execution systems for more rigorous strategy optimization.

## Conclusion

In conclusion, by combining reversal and trend following strategies for dual confirmation, the Surf Rider strategy improves signal accuracy while capturing trend changes, allowing for excess returns over the broader market. Despite some risks, continuous optimization can adapt the strategy to more market environments. The strategy is flexible and risk-controllable, suitable for investors seeking steady long term returns.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|32|r|
|v_input_6|12|s|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-16 00:00:00
end: 2023-10-16 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 16/04/2020
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
// We call this one the ECO for short, but it will be listed on the indicator list 
// at W. Blau’s Ergodic Candlestick Oscillator. The ECO is a momentum indicator. 
// It is based on candlestick bars, and takes into account the size and direction 
// of the candlestick "body". We have found it to be a very good momentum indicator, 
// and especially smooth, because it is unaffected by gaps in price, unlike many other 
// momentum indicators.
// We like to use this indicator as an additional trend confirmation tool, or as an 
// alternate trend definition tool, in place of a weekly indicator. The simplest way 
// of using the indicator is simply to define the trend based on which side of the "0" 
// line the indicator is located on. If the indicator is above "0", then the trend is up. 
// If the indicator is below "0" then the trend is down. You can add an additional 
// qualifier by noting the "slope" of the indicator, and the crossing points of the slow 
// and fast lines. Some like to use the slope alone to define trend direction. If the 
// lines are sloping upward, the trend is up. Alternately, if the lines are sloping 
// downward, the trend is down. In this view, the point where the lines "cross" is the 
// point where the trend changes.
// When the ECO is below the "0" line, the trend is down, and we are qualified only to 
// sell on new short signals from the Hi-Lo Activator. In other words, when the ECO is 
// above 0, we are not allowed to take short signals, and when the ECO is below 0, we 
// are not allowed to take long signals. 
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

ECO(r,s) =>
    pos = 0
    xCO = close - open
    xHL = high - low
    xEMA = ema(ema(xCO, r), s)
    xvEMA = ema(ema(xHL, r), s)
    nRes = 100 * (xEMA / xvEMA)
    pos := iff(nRes > 0, 1,
	         iff(nRes <= 0, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & ECO Strategy", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
r = input(32, minval=1)
s = input(12, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posECO = ECO(r,s)
pos = iff(posReversal123 == 1 and posECO == 1 , 1,
	   iff(posReversal123 == -1 and posECO == -1, -1, 0)) 
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

https://www.fmz.com/strategy/429485

> Last Modified

2023-10-17 15:30:18
