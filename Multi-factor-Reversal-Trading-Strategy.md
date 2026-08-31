
> Name

Multi-factor-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy combines multiple technical indicators to identify price reversals, making it a multi-factor driven reversal trading strategy. It integrates the 123 pattern with the Polarized Fractal Efficiency (PFE) indicator, entering trades only when both agree on the signal to filter out false signals and improve win rate.

## Strategy Logic 

The strategy consists of two main components:

1. 123 pattern identification: A buy signal is generated when the close is up for 2 consecutive days and then down on the 3rd day, with Stochastic fast line below slow line. A sell signal is generated when the opposite occurs.

2. PFE indicator threshold: PFE above upper limit indicates sell signals, PFE below lower limit indicates buy signals.

Trades are entered only when both 123 pattern and PFE indicator agree. If not, position is flat.

The 123 pattern identifies potential reversals. PFE measures trend efficiency to avoid false breakouts. Together they improve accuracy through multi-factor confirmation.

## Advantages

- 123 pattern and PFE validate each other, reducing false signals
- PFE has sound theoretical basis for evaluating price efficiency  
- Multi-factor driven improves accuracy
- Combining reversal pattern and trend indicator provides flexibility
- Customizable parameters adapt to changing markets

## Risks and Mitigation 

- Individual factors may give incorrect signals
- Factor tuning needs continuous optimization
- Short holding time risks frequent stop loss

Mitigations:

1. Additional factors to improve accuracy
2. Parameter optimization for increased robustness
3. Auto-optimization methods to find optimal parameters  
4. Use fixed or trailing stop losses

## Enhancement Opportunities

The strategy can be enhanced through:

1. Volatility-based stops 
2. Auto-optimization of all parameters via machine learning
3. Reducing reversal frequency during strong trends  
4. Adaptive indicators to adjust for market volatility
5. Portfolio combinations to diversify risks and improve returns

## Conclusion

This strategy combines multiple factors to identify reversal points, providing theoretical soundness and ease of implementation. The multi-factor approach improves accuracy over single indicators. Further improvements can come through parameter optimization, stop loss management, portfolio combinations and more.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- PFE ----|
|v_input_7|9|LengthPFE|
|v_input_8|5|LengthEMA|
|v_input_9|50|BuyBand|
|v_input_10|-50|SellBand|
|v_input_11|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-13 08:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 16/04/2021
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
// The Polarized Fractal Efficiency (PFE) indicator measures the efficiency 
// of price movements by drawing on concepts from fractal geometry and chaos 
// theory. The more linear and efficient the price movement, the shorter the 
// distance the prices must travel between two points and thus the more efficient 
// the price movement.
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


PFE(Length,LengthEMA,BuyBand,SellBand) =>
    pos = 0.0
    PFE = sqrt(pow(close - close[Length], 2) + 100)
    C2C = sum(sqrt(pow((close - close[1]), 2) + 1), Length)
    xFracEff = iff(close - close[Length] > 0,  round((PFE / C2C) * 100) , round(-(PFE / C2C) * 100))
    xEMA = ema(xFracEff, LengthEMA)
    pos := iff(xEMA < SellBand, -1,
    	      iff(xEMA > BuyBand, 1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & PFE (Polarized Fractal Efficiency)", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- PFE ----")
LengthPFE = input(9, minval=1)
LengthEMA = input(5, minval=1)
BuyBand = input(50, step = 0.1)
SellBand = input(-50, step = 0.1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posPFE = PFE(LengthPFE,LengthEMA,BuyBand,SellBand)
pos = iff(posReversal123 == 1 and posPFE == 1 , 1,
	   iff(posReversal123 == -1 and posPFE == -1, -1, 0)) 
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

https://www.fmz.com/strategy/427298

> Last Modified

2023-09-19 21:13:04
