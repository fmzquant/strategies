
> Name

Dual-Indicator-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview 

This strategy combines the 123 reversal pattern with the CCI indicator to create a cumulative signal short term trading strategy. It capitalizes on price reversals by blending chart pattern analysis with overbought/oversold indications. The strategy suits trading instruments like indices and forex that experience oscillations.

## Strategy Logic

The key trading logic involves:

1. 123 pattern identifies reversals. 2 consecutive days of closing price reversal along with Stochastic reversal gives signals.

2. CCI confirms reversals. CCI identifies overbought/oversold conditions. Crossover of fast and slow CCI suggests reversals.

3. 123 + CCI together create more robust cumulative signals. Trades only when both reverse together.

4. Option to reverse signal direction. Go short on long signals and vice versa for contrarian trading.

5. Stochastic settings control reversal sensitivity. CCI parameters dictate overbought/oversold perception.

6. No fixed take profit or stop loss. Exits based on reversal patterns.

The strategy combines price action and index analysis for high probability reversal trade setups. Also offers flexibility via contrarian trade selection.

## Advantages

The main advantages are:

1. Dual indicator filtering improves signal quality and avoids false breaks. 

2. 123 patterns are intuitive and reliable for spotting reversals.

3. CCI clearly identifies overbought/oversold zones to time reversals.

4. Flexibility via contrarian trade selection for diversification.

5. Simple parameters make it easy to use.

6. No stop loss or take profit needed reduces risk.

7. Suits oscillating instruments like indices and forex.

8. Easy to replicate for beginners.

## Risks

The major risks are:

1. Increased costs from higher trade frequency.

2. Failed reversal risk since patterns are not foolproof. 

3. Instrument selection risk if applied on trending assets.

4. Parameter optimization risk leading to curve fitting.

5. Missing the trend risk and trading counter trend.

6. Low efficiency risk as reversal opportunities can be limited.

Risks can be mitigated through frequency control, asset selection, backtesting and parameter optimization.

## Enhancement Opportunities

Some ways to improve the strategy:

1. Add stop loss and take profit for risk control.

2. Incorporate trend filters to avoid false breaks.

3. Optimize parameters for different instruments.

4. Introduce position sizing based on conditions.

5. Set drawdown limits to prevent sustained losses.

6. Add machine learning for adaptive optimization.

7. Refine for higher win rate and risk-reward.

8. Trade with trend by distinguishing bull vs bear markets.

With continuous improvements, the strategy can become a steady short term trading system.

## Conclusion

This strategy combines the 123 pattern and CCI indicator to identify high probability price reversal opportunities using dual confirmation. It offers quality signals, flexibility of use and ease of adoption. But parameters and asset selection need optimization along with trade frequency and loss control. With ongoing refinements, it can evolve into an efficient short term reversal trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|10|FastMA|
|v_input_6|20|SlowMA|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-25 00:00:00
end: 2023-09-24 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 11/07/2019
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
// The Commodity Channel Index (CCI) is best used with markets that display cyclical or 
// seasonal characteristics, and is formulated to detect the beginning and ending of these 
// cycles by incorporating a moving average together with a divisor that reflects both possible 
// and actual trading ranges. The final index measures the deviation from normal, which indicates 
// major changes in market trend.
// To put it simply, the Commodity Channel Index (CCI) value shows how the instrument is trading 
// relative to its mean (average) price. When the CCI value is high, it means that the prices are 
// high compared to the average price; when the CCI value is down, it means that the prices are low 
// compared to the average price. The CCI value usually does not fall outside the -300 to 300 range 
// and, in fact, is usually in the -100 to 100 range.
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

CCI(FastMA, SlowMA) =>
    pos = 0
    xCCI = cci(close, 10)
    xSMA = sma(xCCI,SlowMA)
    xFMA = sma(xCCI,FastMA)
    pos := iff(xSMA < xFMA , 1,
	         iff(xSMA > xFMA, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Strategy 123 Reversal & CCI", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
FastMA = input(10, minval=1)
SlowMA = input(20, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posCCI = CCI(FastMA, SlowMA)
pos = iff(posReversal123 == 1 and posCCI == 1 , 1,
	   iff(posReversal123 == -1 and posCCI == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/427813

> Last Modified

2023-09-25 17:46:24
