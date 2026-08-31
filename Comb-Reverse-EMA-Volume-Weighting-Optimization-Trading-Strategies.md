
> Name

Comb-Reverse-EMA-Volume-Weighting-Optimization-Trading-Strategies

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1516c76b6303e5370bd.png)


### Overview

This strategy is a double optimized combination reverse EMA weighted trading strategy. It combines reverse strategy and EMA weighted strategy, two different types of strategies, and generates more reliable trading signals by judging whether the signals of the two strategies are consistent.

### Strategy Principle 

The reversal part uses the 123 reversal strategy. This strategy combines the relationship between the closing prices of the previous two days and the stochastic oscillator to generate signals. The specific rules are:

- When today's closing price is higher than yesterday's, and yesterday's closing price is lower than the day before yesterday; at the same time, the 9-day stochastic slow line is lower than 50, go long;
- When today's closing price is lower than yesterday's, and yesterday's closing price is higher than the day before yesterday; at the same time, the 9-day stochastic fast line is higher than 50, go short.

The EMA weighted part uses the exponential moving average and volume weighted calculation. The calculation formula is as follows:

```
xMAVolPrice = ema(volume * close, Length)
xMAVol = ema(volume, Length)
nRes = xMAVolPrice / xMAVol
```

The specific trading rules are: when the nRes indicator is lower/higher than yesterday's closing price, go long/short.

Finally, the strategy judges whether the signals of the two parts are consistent before generating the actual trading signal.


### Advantage Analysis

The strategy combines two different types of strategies to verify each other and improve the reliability of signals and reduce false signals. At the same time, the reversal part can capture turning points, and the EMA weighted part can track trends to achieve complementary advantages.

### Risk Analysis

The strategy has a certain time lag and is prone to miss short-term trading opportunities. Also, the EMA weighted is not effective for oscillating markets. In addition, the reliability of reversal signals also needs to be verified.

Shorten the parameters appropriately to speed up reaction. Add stop loss to control risks. Introduce more factors to verify reversal signals.

### Optimization

1. Test more reversal factor combinations to find the optimal parameters.
2. Try different types of EMA weighting methods.
3. Add stop loss, trailing stop loss. 
4. Optimize parameters for faster response.

### Summary  

The strategy integrates the advantages of two different types of strategies, which can improve signal quality and overcome the disadvantages of a single strategy to some extent. But there is also a certain lag that needs further optimization. Overall, this strategy provides new ideas for quantitative trading and is worth further research and optimization to seize market opportunities.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|22|LengthEMA_VM|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-06 00:00:00
end: 2023-12-06 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 18/10/2019
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
// The related article is copyrighted material from Stocks & Commodities 2009 Oct 
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

fFilter(xSeriesSum, xSeriesV, Filter) =>
    iff(xSeriesV > Filter, xSeriesSum, 0)

EMA_VW(Length) =>
    pos = 0.0
    xMAVolPrice = ema(volume * close, Length)
    xMAVol = ema(volume, Length)
    nRes = xMAVolPrice / xMAVol
    pos := iff(nRes < close[1], 1,
             iff(nRes > close[1], -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & EMA & Volume Weighting", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthEMA_VM = input(22, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posEMA_VW = EMA_VW(LengthEMA_VM)
pos = iff(posReversal123 == 1 and posEMA_VW == 1 , 1,
	   iff(posReversal123 == -1 and posEMA_VW == -1, -1, 0)) 
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

https://www.fmz.com/strategy/434579

> Last Modified

2023-12-07 16:39:50
