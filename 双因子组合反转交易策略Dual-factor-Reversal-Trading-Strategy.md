
> Name

双因子组合反转交易策略Dual-factor-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1079357eb3817af5f4c.png)


### Overview  

This strategy firstly utilizes price reversal signals for trading, then combines trend filtering indicators for screening, implementing dual-factor driven system. The price reversal part adopts 123 reversal trading system, while the trend filtering part uses Extracting The Trend (ETT) system. The combination forms a dual-factor driven reversal trading strategy.

### Strategy Logic  

The price reversal part uses 123 reversal system. This system is from the book "How I Tripled My Money In The Futures Market" by Ulf Jensen, page 183. The trading signal generation has the following conditions:  

1. Previous close is lower than the close 2 days ago
2. Current close is higher than previous close  
3. 9-day slow stochastic is lower than 50

When the above conditions are met, a buy signal is generated. On the contrary, when  

1. Previous close is higher than the close 2 days ago
2. Current close is lower than previous close
3. 9-day fast stochastic is higher than 50  

A sell signal is generated.

The goal of this reversal system is to capture short-term reversals when prices form temporary reverse.

The trend filtering part uses Extracting The Trend (ETT) system. ETT system judges trend direction through filter and moving average combination. In this strategy, its main function is to verify the price reversal signals, avoiding reversal operation when there is no clear trend.

This strategy combines the trading signals from both sub-strategies, eventually realizing a dual-factor driven reversal trading system.

### Advantage Analysis 

The dual-factor reversal trading strategy integrates the advantages of each sub-strategy through combination:  

1. 123 reversal system can capture short-term reversal oppurtunities  
2. ETT system can effectively filter scenarios without clear trend, avoiding reversal trading risk
3. Dual-factor driven improves signal quality  

Therefore, this strategy can effectively filter invalid reversal signals. With correct trend judgment, it conducts reversal operation, thereby improving overall performance of the trading system.

### Risk Analysis

The dual-factor reversal trading strategy has the following main risks:  

1. The risk of price continuing original trend after reversal. Improper Compiler parameter setting may lead to over-frequent reversal signal generation, thus missing trend oppurtunities.
2. The risk from ETT system's judgment error. ETT system itself also has judgment errors, leading to loss in reversal trading. 
3. The inherent risk of dual-factor driven mechanism. Though less likely, there is still probability that both trading signals make wrong judgement at the same time, which amplifies losses.

To reduce above risks, considerations include adjusting Compiler parameters, optimizing the reversal & ETT strategies for better judgment, as well as appropriately expanding stop loss range for reversal trading. In practice, the inherent risk of dual-factor driven should be fully considered for position sizing control.  

### Optimization  

This strategy can be optimized in the following aspects:

1. Optimize reversal system parameters for better parameter combination
2. Optimize ETT system parameters for higher judgment accuracy  
3. Try combining other price reversal strategies with ETT
4. Add position sizing control mechanism
5. Drive with more factors  

With the strategy logic and key trading signals unchanged, better backtest results can be expected through parameter and combination optimization.  

### Conclusion  

The dual-factor reversal trading strategy organically combines price reversal signals and trend filtering for multi-factor judgment system. Compared with single reversal signal strategies, this strategy can better capture short-term price reversals while avoiding false signals when there is no clear trend, thereby improving signal quality. Better performance can be expected through parameter optimization and adding other factors.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|20|LengthETT|
|v_input_6|0.5|Delta|
|v_input_7|false|Trigger|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-26 00:00:00
end: 2023-12-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 03/08/2020
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
// Extracting The Trend
// The related article is copyrighted material from Stocks & Commodities Mar 2010
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


ETT(Length,Delta,Trigger) =>
    pos = 0
    xBandpassFilter = 0.0
    xPrice = hl2
    beta = cos(3.1415 * (360 / Length) / 180)
    gamma = 1 / cos(3.1415 * (720 * Delta / Length) / 180)
    alpha = gamma - sqrt(gamma * gamma - 1)
    xBandpassFilter := 0.5 * (1 - alpha) * (xPrice - xPrice[2]) + beta * (1 + alpha) * nz(xBandpassFilter[1]) - alpha * nz(xBandpassFilter[2])
    xMean = sma(xBandpassFilter, 2 * Length)
    pos :=iff(xMean > Trigger, 1,
	       iff(xMean < Trigger, -1, nz(pos[1], 0)))     
    pos

strategy(title="Combo Backtest 123 Reversal & Extracting The Trend", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthETT = input(20, minval=1)
Delta = input(0.5)
Trigger = input(0)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posETT = ETT(LengthETT,Delta,Trigger)
pos = iff(posReversal123 == 1 and posETT == 1 , 1,
	   iff(posReversal123 == -1 and posETT == -1, -1, 0)) 
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

https://www.fmz.com/strategy/436791

> Last Modified

2023-12-27 17:22:31
