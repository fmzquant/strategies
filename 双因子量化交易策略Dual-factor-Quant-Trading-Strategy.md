
> Name

双因子量化交易策略Dual-factor-Quant-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fb8d0a19bac1fdfb46.png)

## Overview  

This strategy combines the 123 reversal and prime number oscillator factors to implement quantitative trading driven by dual factors. While capturing short-term reversal opportunities, it also identifies longer-term trends to achieve low-risk excess returns.

## Principles  

The first part is the 123 reversal strategy. It uses the feature of price reversal over 2 days to determine entry and exit points. When prices rise continuously over 2 days and the slow stochastic is below 50, it's considered oversold, producing a buy signal. When prices fall continuously over 2 days and the fast stochastic is above 50, it's considered an overbought bounce, producing a sell signal.   

The second part is the prime number oscillator strategy. This indicator calculates the nearest prime number above and below the current price over a specified range, and outputs the difference from the current price. A positive value means the current price is near the prime number ceiling, while a negative value means it's near the prime number floor. The trend direction is judged by the difference value, which is combined with 123 reversal signals to generate the final trading signal.

The signal merge rule is: actual trading signals are generated only when the two sub-strategies give signals in the same direction, otherwise no new position is opened when the signals conflict.

## Advantages

By combining dual factors, this strategy considers both short-term reversal effects and long-term trend characteristics to make multi-angle market judgements, improving the risk resistance of the strategy. 

Compared to a single momentum strategy, this strategy can timely stop loss or reverse position during sudden price plunges, effectively controlling intraday risks by using the reversal factor.  

Compared to a single reversal strategy, introducing the prime number oscillator for trend direction avoids overtrading from frequent reversal trades.

## Risks  

The biggest risk is signal conflicts between the two factors. If 123 reversal shows overbought/oversold signs and produces reversal signals, while the prime number oscillator shows it's still in a trend, directly taking reversal trades could lead to losses.

To control this risk, additional logic is added - actual trades are generated only when the two signals align in direction. However this could also miss some trading opportunities.

## Enhancements

1. Optimize Stochastic parameters to find better reversal parameter sets for specific products  

2. Optimize the tolerance percentage of the prime number oscillator to reduce noise trades

3. Add stop loss strategies to limit one-way loss expansion  

4. Add position sizing module to adjust positions for different market environments 

5. Add machine learning models to judge signal credibility between the two factors, reducing conflicts

## Conclusion   

This strategy successfully combines short-term reversal factors and long-term trend factors to achieve low-risk quantitative trading. By effectively using dual factors to filter noise and setting additional logic to control risks, it is a steady profit practical strategy. Parameters and functions will be continually optimized to suit real market characteristics.  

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Prime Number Oscillator ----|
|v_input_7|5|Tolerance Percentage|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-29 00:00:00
end: 2023-12-06 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 28/04/2021
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
// Determining market trends has become a science even though a high number or people 
// still believe it’s a gambling game. Mathematicians, technicians, brokers and investors 
// have worked together in developing quite several indicators to help them better understand 
// and forecast market movements.
//
// Developed by Modulus Financial Engineering Inc., the prime number oscillator indicates the 
// nearest prime number, be it at the top or the bottom of the series, and outlines the 
// difference between that prime number and the respective series.
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

PrimeNumberOscillator(price, percent) =>
    res = 0.0
    res1 = 0.0
    res2 = 0.0
    for j = price to price + (price * percent / 100)
        res1 := j
	    for i = 2 to sqrt(price)
        	res1 := iff(j % i == 0 , 0, j)
            if res1 == 0 
                break
		if res1 > 0 
		    break
    for j = price to price - (price * percent / 100)
        res2 := j
	    for i = 2 to sqrt(price)
        	res2 := iff(j % i == 0 , 0, j)
            if res2 == 0 
                break
		if res2 > 0 
		    break
    res := iff(res1 - price < price - res2,  res1 - price, res2 - price)
    res := iff(res == 0, res[1], res)
    res
    
PNO(percent) =>
    pos = 0.0
    xPNO = PrimeNumberOscillator(close, percent)
    pos:= iff(xPNO > 0, 1,
           iff(xPNO < 0, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Prime Number Oscillator", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Prime Number Oscillator ----")
percent = input(5, minval=0.01, step = 0.01, title="Tolerance Percentage")
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posPNO = PNO(percent)
pos = iff(posReversal123 == 1 and posPNO == 1 , 1,
	   iff(posReversal123 == -1 and posPNO == -1, -1, 0)) 
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

https://www.fmz.com/strategy/434549

> Last Modified

2023-12-07 15:11:37
