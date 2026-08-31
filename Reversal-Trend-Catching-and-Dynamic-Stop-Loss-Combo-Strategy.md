
> Name

Reversal-Trend-Catching-and-Dynamic-Stop-Loss-Combo-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/112686506afc4b86b82.png)

## Overview
This strategy combines a reversal trend catching strategy and dynamic stop loss strategy to capture reversal trends while controlling risks with dynamic stops.

## Strategy Logic  
### Reversal Trend Catching Strategy
This strategy is based on K and D values of Stochastic Oscillator. It generates buy signals when price falls for two consecutive days while K rises above D. It generates sell signals when price rises for two days while K falls below D. This catches price reversal trends.  

### Dynamic Stop Loss Strategy
This strategy sets dynamic stop loss based on price volatility and skew. It calculates fluctuation of highest high and lowest low recently and judges if it is in a upper or down channel based on skew, then set dynamic stop price accordingly. This adjusts stop position based on market condition.

The two strategies work together to catch reversal signals and set dynamic stops to control risks.

## Advantage Analysis
- Catch price reversal points, good for reversal trading
- Dynamic stops adjust with market environment  
- Dual signal confirmation avoids false signals
- Control risks and ensure profits

## Risk Analysis
- Reversal failure risk. Reversal signals may fail.
- Parameter risk. Wrong parameters may affect performance.
- Liquidity risk. Some products have poor liquidity to stop loss.  

Risks can be controlled by parameter optimization, strict stop loss, choosing products with good liquidity.

## Optimization Directions 
- Optimize stochastic parameters for best combination
- Optimize stop parameters for best stop position   
- Add filters to avoid opening on range markets
- Add position sizing to limit maximum loss

Comprehensive optimizations enable the strategy to catch reversals while controlling risks.

## Summary
The strategy combines reversal trend catching and dynamic stops for stable short-term trading. With continuous optimization and monitoring, it has the potential for steady profits.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|30|LengthKDS|
|v_input_6|0|Trade From Level: 4|2|3|1|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-05 00:00:00
end: 2024-02-04 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 07/12/2020
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
//  The Kase Dev Stops system finds the optimal statistical balance between letting profits run, 
//  while cutting losses.  Kase DevStop seeks an ideal stop level by accounting for volatility (risk),
//  the variance in volatility (the change in volatility from bar to bar), and volatility skew 
//  (the propensity for volatility to occasionally spike incorrectly).
//  Kase Dev Stops are set at points at which there is an increasing probability of reversal against 
//  the trend being statistically significant based on the log normal shape of the range curve.  
//  Setting stops will help you take as much risk as necessary to stay in a good position, but not more.
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
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

KaseDevStops(Length, Level) =>
    pos = 0.0
    RWH = (high - low[Length]) / (atr(Length) * sqrt(Length))
    RWL = (high[Length] - low) / (atr(Length) * sqrt(Length))
    Pk = wma((RWH-RWL),3)
    AVTR = sma(highest(high,2) - lowest(low,2), 20)
    SD = stdev(highest(high,2) - lowest(low,2),20)
    Val4 = iff(Pk>0, highest(high-AVTR-3*SD,20), lowest(low+AVTR+3*SD,20))
    Val3 = iff(Pk>0, highest(high-AVTR-2*SD,20), lowest(low+AVTR+2*SD,20))
    Val2 = iff(Pk>0, highest(high-AVTR-SD,20), lowest(low+AVTR+SD,20))
    Val1 = iff(Pk>0, highest(high-AVTR,20), lowest(low+AVTR,20))
    ResPrice = iff(Level == 4, Val4,
                 iff(Level == 3, Val3,
                  iff(Level == 2, Val2,
                     iff(Level == 1, Val1, Val4))))
    pos := iff(close < ResPrice , -1, 1)
    pos

strategy(title="Combo Backtest 123 Reversal & Kase Dev Stops", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthKDS = input(30, minval=2, maxval = 100)
LevelKDS = input(title="Trade From Level", defval=4, options=[1, 2, 3, 4])
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posKaseDevStops = KaseDevStops(LengthKDS, LevelKDS)
pos = iff(posReversal123 == 1 and posKaseDevStops == 1 , 1,
	   iff(posReversal123 == -1 and posKaseDevStops == -1, -1, 0)) 
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

https://www.fmz.com/strategy/441042

> Last Modified

2024-02-05 09:54:13
