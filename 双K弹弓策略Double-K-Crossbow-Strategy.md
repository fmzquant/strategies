
> Name

双K弹弓策略Double-K-Crossbow-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/144fa1e1f200cad1f22.png)



Overview: The Double K Crossbow strategy combines the 123 Reversal strategy and Martin Pring's Special K strategy to take advantage of reversal signals and cyclical indicators. It aims to generate more accurate buy and sell signals by leveraging the strengths of both strategies.

Strategy Logic:

The Double K Crossbow consists of two parts:

1. 123 Reversal strategy: It identifies buy and sell signals based on 2 consecutive days of closing price reversal, combined with stochastic oscillator readings. It generates a buy signal when the close is higher than the previous close for 2 days and stochastic is below 50, indicating consolidation. It generates a sell signal when the close is lower than the previous close for 2 days and stochastic is above 50, indicating distribution.

2. Martin Pring's Special K strategy: It uses a composite cyclical indicator formed by stacking rate of change values from different timeframes. It generates buy signals when the indicator crosses above its moving average and sell signals when crossing below. 

The Double K Crossbow consolidates the signals from both strategies, requiring agreement to trigger actual trades. This utilizes the timing strengths of each strategy and avoids false signals.

Advantage Analysis:

- Combines signals from two strategies for more reliable trade entry and exit. Avoids false trades.

- 123 Reversal catches short-term reversals while Special K judges long-term trend. Combination considers both short and long-term.

- Multi-timeframe rate of change provides insight into market cycles.

- Optimizable stochastic parameters adapt to different market conditions.

Risk Analysis:

- Consolidating signals may miss some buy/sell points and lag short-term moves.

- Strategies can disagreed during outlier events, requiring judgment on direction.

- Requires monitoring and optimizing parameters for both strategies, increasing complexity. 

- Incorrect optimization of short and long-term parameters may miss cycle turning points.

Enhancement Opportunities:

- Test different parameter combinations to find optimal settings.

- Add stop loss module to limit losses.

- Add position sizing module to adjust with market conditions.

- Incorporate machine learning for more robust signal modeling.

- Add adaptive optimization to dynamically track market rhythms.

Conclusion:

The Double K Crossbow successfully combines the strengths of reversal and cyclical strategies for quality signals and multi-timeframe profit opportunities. The novel approach is worth further testing and optimization as a stable strategy. But risk management and parameter tuning remain essential for consistent gains in ever-changing markets.



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Martin Pring`s ----|
|v_input_7|10|Smooth|
|v_input_8_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-17 00:00:00
end: 2023-10-17 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 17/02/2021
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
// Pring's Special K is a cyclical indicator created by Martin Pring. 
// His method combines short-term, intermediate and long-term velocity 
// into one complete series. Useful tool for Long Term Investors
// Modified for any source.
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


MPSK(a, sources) =>
    pos = 0.0
    roc1 = (sma(roc(sources,10),10)*1)
    roc2 = (sma(roc(sources,15),10)*2)
    roc3 = (sma(roc(sources,20),10)*3)
    roc4 = (sma(roc(sources,30),15)*4)
    roc5 = (sma(roc(sources,40),50)*1)
    roc6 = (sma(roc(sources,65),65)*2)
    roc7 = (sma(roc(sources,75),75)*3)
    roc8 = (sma(roc(sources,100),100)*4)
    roc9 = (sma(roc(sources,195),130)*1)
    roc10 = (sma(roc(sources,265),130)*2)
    roc11 = (sma(roc(sources,390),130)*3)
    roc12 = (sma(roc(sources,530),195)*4)
    osc = roc1+roc2+roc3+roc4+roc5+roc6+roc7+roc8+roc9+roc10+roc11+roc12
    oscsmt = sma(osc,a)
    pos := iff(osc > oscsmt, 1,
    	     iff(osc < oscsmt, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Martin Pring's Special K", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Martin Pring`s ----")
a = input(10, title = "Smooth" )
sources = input(title="Source", type=input.source, defval=close)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posMPSK = MPSK(a,sources)
pos = iff(posReversal123 == 1 and posMPSK == 1 , 1,
	   iff(posReversal123 == -1 and posMPSK == -1, -1, 0)) 
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

https://www.fmz.com/strategy/429565

> Last Modified

2023-10-18 11:19:07
