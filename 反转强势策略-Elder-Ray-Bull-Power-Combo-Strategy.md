
> Name

反转强势策略-Elder-Ray-Bull-Power-Combo-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13bdb483ee189daaa38.png)


## Overview
This strategy combines the 123 reversal strategy and Elder Ray bull power strategy to generate combined trading signals, achieving both trend following and reversal capturing capabilities.  

## Strategy Logic
### Reversal Part
According to the reversal strategy logic on page 183 of Chen Qin's book "How I Tripled My Money in The Futures Market": go long when the close price is higher than the previous close for 2 consecutive days and the 9-day stochastic slow line is below 50; go short when the close price is lower than the previous close for 2 consecutive days and the 9-day stochastic fast line is above 50.

### Bull Power Part
According to Dr. Alexander Elder's Elder Ray indicator: The 13-day exponential moving average (EMA) represents the market consensus of value. Bull power measures the ability of buyers to drive prices above the consensus of value. Bear power reflects the ability of sellers to drive prices below the average consensus of value. Bull power is calculated by subtracting the 13-day EMA from the day's high. Bear Power subtracts the 13-day EMA from the day's low.

The threshold for the bull power indicator in this strategy is set to 0, meaning that any value greater than 0 generates a trading signal.  

### Combined Signals 
A final trading signal is generated when the reversal and bull power signals align in the same direction. The long signal is triggered when both reversal and bull power signal long. The short signal is triggered when both reversal and bull power signal short.

## Pros Analysis  
This is a combo strategy that forms trading signals using both reversal and trend-following strategies, possessing the advantages of catching reversals and following trends.

The reversal part can lock in reversal opportunities after gap jumps. The bull power part ensures positions are only opened when a trend exists. Combined they effectively filter false breakouts and avoid being trapped.

The parameters are highly flexible for optimization across different products and timeframes to find the best parameter combinations.

## Risks Analysis
The probability of alignment between reversal and bull power signals is relatively low, which can lead to sparse signals.

The reversal part may mistakenly identify sideways range-bound price action as reversal opportunities, causing premature entry. The bull power part could miss some reversal chances. Using them together can alleviate these risks to some extent. Going forwards trend filters could be introduced for further optimization.  

## Optimization Directions
1. Try more parameter combinations to find optimum settings;
2. Add trend filter modules to avoid repeatedly establishing positions without a clear trend;
3. Consider adding stop loss strategies to control per trade loss.

## Summary  
This strategy possesses both trend following and reversal trading capabilities, making it a combo strategy par excellence. With parameter optimization, stable profits can be expected. Meanwhile, risks like sparse signals and misjudgments need attention. Going forwards, trend filters, stop loss and other modules can be introduced to further enhance practical performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|13|LengthBP|
|v_input_6|false|Trigger|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-21 00:00:00
end: 2023-11-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 15/06/2020
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
// Developed by Dr Alexander Elder, the Elder-ray indicator measures buying 
// and selling pressure in the market. The Elder-ray is often used as part 
// of the Triple Screen trading system but may also be used on its own.
// Dr Elder uses a 13-day exponential moving average (EMA) to indicate the 
// market consensus of value. Bull Power measures the ability of buyers to 
// drive prices above the consensus of value. Bear Power reflects the ability 
// of sellers to drive prices below the average consensus of value.
// Bull Power is calculated by subtracting the 13-day EMA from the day's High. 
// Bear power subtracts the 13-day EMA from the day's Low.
// You can use in the xPrice any series: Open, High, Low, Close, HL2, HLC3, OHLC4 and ect...
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

BP(Trigger,Length) =>
    pos = 0
    DayHigh = 0.0
    xPrice = close
    xMA = ema(xPrice,Length)
    DayHigh := iff(dayofmonth != dayofmonth[1], high, max(high, nz(DayHigh[1])))
    nRes = DayHigh - xMA
    pos := iff(nRes > Trigger, 1,
    	     iff(nRes < Trigger, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Strategy 123 Reversal & Elder Ray (Bull Power)", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthBP = input(13, minval=1)
Trigger = input(0)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posBP = BP(Trigger,LengthBP)
pos = iff(posReversal123 == 1 and posBP == 1 , 1,
	   iff(posReversal123 == -1 and posBP == -1, -1, 0)) 
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

https://www.fmz.com/strategy/432762

> Last Modified

2023-11-21 11:36:48
