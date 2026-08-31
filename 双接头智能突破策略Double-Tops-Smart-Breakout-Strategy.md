
> Name

双接头智能突破策略Double-Tops-Smart-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

The Double Tops Smart Breakout Strategy is a combination strategy that incorporates the 123 Reversal Strategy and the Pivot Detector Oscillator Strategy. It mainly utilizes double top patterns to identify potential trend reversal points and uses the pivot detector indicator to filter out false breakouts, in order to capture trend reversals at critical technical levels.

## Principles 

The strategy consists of two parts:

1. 123 Reversal Strategy

   The 123 Reversal Strategy originates from the book "How I Tripled My Money in the Futures Market" by Ulf Jensen, page 183. It is a counter-trend reversal strategy.

   The logic is: when the closing price is higher than the previous closing price for 2 consecutive days, and the 9-day Stochastic Slow line is below 50, go long; when the closing price is lower than the previous closing price for 2 consecutive days, and the 9-day Stochastic Fast line is above 50, go short.

2. Pivot Detector Oscillator Strategy

   The Pivot Detector Oscillator Strategy was proposed by Giorgos E. Siligardos. The related article was published in the September 2009 issue of Stocks & Commodities magazine.

   This strategy uses a combination of moving averages and the RSI indicator to gauge oscillation when price approaches upper or lower bands. The specific calculation formula is as follows:

   ```
   When price > moving average:
       Indicator value = (RSI value - 35) / (85 - 35)
   When price <= moving average: 
       Indicator value = (RSI value - 20) / (70 - 20)

   If indicator value > 50, go long
   If indicator value < 50, go short
   ```

By combining the two strategies, when a double top pattern emerges, if the indicator issues a signal in the same direction, a breakout operation is executed. This allows capturing new trends at critical technical levels while avoiding false breakouts within consolidation ranges.

## Advantage Analysis

- Utilizes double indicators for more reliable signals
- Captures new trend outbreaks at key technical levels  
- Breakout operations allow larger profit potential
- Combining reversals and indicator filters avoids whipsaws in ranges
- Applicable to multiple products with flexibility

## Risk Analysis

- Double tops cannot fully eliminate false breakout risks
- Indicator settings require experience, improper parameters may cause wrong signals 
- Effective stop loss strategies are needed to control single loss
- Failed breakouts can lead to large losses
- Performance relies on parameter tuning for different products

Risk management and optimization:

- Optimize indicator parameters to lower false signals
- Adopt moving or trailing stops to limit losses
- Evaluate sustainability of breakouts to avoid reversals
- Adjust parameters based on different product characteristics

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Test different moving average systems to find optimal parameter combinations

2. Optimize RSI parameters to reduce false signals

3. Add volume filter to ensure valid breakouts 

4. Incorporate trend-determining indicators to avoid counter-trend breaks

5. Use machine learning for automatic parameter tuning

6. Add stop loss strategies to control risks

7. Evaluate breakout sustainability and set profit targets

8. Analyze different product characteristics for parameter adjustments

Through parameter optimization, evaluating breakout effects, adjusting stop loss strategies etc, the strategy can be continuously improved to obtain steady profits in different market environments. 

## Conclusion

The Double Tops Smart Breakout Strategy combines reversal patterns and indicator confirmation mechanisms to capture potential trend reversal points at critical technical levels. Compared to purely chasing breakouts, its execution timing is more precise, avoiding whipsaws in ranging markets. Meanwhile, the strategy emphasizes risk control and should be used with stop loss mechanisms. Through parameter optimization and combining technical indicators, steady breakout signals can be obtained to capture outbreaks and achieve large profits at trend reversal points. In summary, the strategy has precise timing selection and sound risk control. With proficiency, it can achieve excellent trading performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Pivot Detector Oscillator ----|
|v_input_7|200|Length_MA|
|v_input_8|14|Length_RSI|
|v_input_9|100|UpBand|
|v_input_10|false|DownBand|
|v_input_11|50|MidlleBand|
|v_input_12|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-30 00:00:00
end: 2023-10-03 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 20/04/2021
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
// The Pivot Detector Oscillator, by Giorgos E. Siligardos
// The related article is copyrighted material from Stocks & Commodities 2009 Sep
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


PDO(Length_MA,Length_RSI,UpBand,DownBand,MidlleBand) =>
    pos = 0.0
    xMA = sma(close, Length_MA)
    xRSI = rsi(close, Length_RSI)
    nRes = iff(close > xMA, (xRSI - 35) / (85-35), 
             iff(close <= xMA, (xRSI - 20) / (70 - 20), 0))
    pos:= iff(nRes * 100 > 50, 1,
    	   iff(nRes * 100 < 50, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Pivot Detector Oscillator)", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Pivot Detector Oscillator ----")
Length_MA = input(200, minval=1)
Length_RSI = input(14, minval=1)
UpBand = input(100, minval=1)
DownBand = input(0)
MidlleBand = input(50)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posPDO = PDO(Length_MA,Length_RSI,UpBand,DownBand,MidlleBand)
pos = iff(posReversal123 == 1 and posPDO == 1 , 1,
	   iff(posReversal123 == -1 and posPDO == -1, -1, 0)) 
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

https://www.fmz.com/strategy/428708

> Last Modified

2023-10-08 15:17:51
