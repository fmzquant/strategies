
> Name

Reversal-Momentum-Strategy-with-Double-Confirmation

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/af0f8644a635ea5078.png)

## Overview

The Reversal Momentum strategy combines price reversal signals and volatility reversal signals to implement trend trading. It mainly uses the 123 pattern to determine price reversal points, while using the Donchian Channel volatility as a filter for false signals. This strategy is suitable for medium-to-long term holding. By double confirmation of reversals, it can effectively capture market turning points and achieve excess returns.

## Strategy Principle

The price reversal part uses the 123 pattern to judge. This pattern means that the prices of the first two K-lines move in opposite directions (up or down), and the third K-line reverses again (down or up). Therefore, it is called the 123 pattern. When a price appears with three K-lines reversing, it usually signals that a short-term trend is about to turn. To further verify the reliability of price reversals, this strategy also uses a stochastic indicator to trigger trades only when the stochastic indicator also reverses (the fast line falls back or rises rapidly).

The volatility reversal part uses Donchian Channel volatility. The Donchian Channel mainly reflects the price fluctuation range. When price volatility increases, the width of the Donchian Channel also expands; when price volatility decreases, the width of the Donchian Channel also narrows. Donchian Channel volatility (width) can effectively measure the degree of market fluctuation and risk level. This strategy uses the reversal of Donchian Channel volatility to filter out false signals, only issuing trading signals when volatility and prices reverse at the same time, avoiding being caught in callback operations.

In summary, this strategy ensures the reliability of trading signals and controls risks through dual reversal validation, making it a relatively robust trend strategy.

## Advantages

- Dual filtering mechanism ensures reliability of trading signals and avoids false breakouts 
- Controls risks and reduces probability of losses
- Suitable for medium-to-long term holding, avoids market noise and captures excess returns
- Large optimization space for parameters that can be adjusted for optimum state
- Unique style works well in combination with common technical indicators

## Risks

- Relies on parameter optimization, improper parameters affect strategy performance
- Stop loss strategy needs further enhancement, maximum drawdown control needs improving 
- Trading frequency may be low, cannot adapt to high frequency algorithmic trading
- Requires selection of suitable products and time frames, limited application scope
- Machine learning can be used to find optimal parameters  

## Optimization Directions

- Increase adaptive stop loss module to greatly reduce maximum drawdown
- Introduce trading volume indicator to ensure entering on high volume breakouts
- Optimize parameters for best stability  
- Try different products and time frames to find best fit
- Try combining with other indicators or strategies for 1+1>2 synergy

## Summary

The Reversal Momentum strategy achieves good risk control through dual confirmation of price reversal and volatility reversal. Compared to single indicators, it filters out a lot of noise and has better stability. By enhancing parameters optimization, stop loss modules, introducing volume, etc., this strategy can further improve signal quality and profit stability. It is suitable as a component of medium-to-long term strategies for stocks, cryptocurrencies, etc., and can obtain good excess returns when properly combined with other modules.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|20|LengthDCW|
|v_input_6|22|SmootheSCW|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-20 00:00:00
end: 2024-02-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 06/03/2020
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
// The Donchian Channel was developed by Richard Donchian and it could be compared 
// to the Bollinger Bands. When it comes to volatility analysis, the Donchian Channel 
// Width was created in the same way as the Bollinger Bandwidth technical indicator was.
//
// As was mentioned above the Donchian Channel Width is used in technical analysis to measure 
// volatility. Volatility is one of the most important parameters in technical analysis. 
// A price trend is not just about a price change. It is also about volume traded during this 
// price change and volatility of a this price change. When a technical analyst focuses his/her 
// attention solely on price analysis by ignoring volume and volatility, he/she only sees a part 
// of a complete picture only. This could lead to a situation when a trader may miss something and 
// lose money. Lets take a look at a simple example how volatility may help a trader:
//
//    Most of the price based technical indicators are lagging indicators.
//    When price moves on low volatility, it takes time for a price trend to change its direction and 
// it could be ok to have some lag in an indicator.
//    When price moves on high volatility, a price trend changes its direction faster and stronger. 
// An indicator's lag acceptable under low volatility could be financially suicidal now - Buy/Sell signals could be generated when it is already too late.
//
// Another use of volatility - very popular one - it is to adapt a stop loss strategy to it:
//    Smaller stop-loss recommended in low volatility periods. If it is not done, a stop-loss could 
// be generated when it is too late.
//    Bigger stop-loss recommended in high volatility periods. If it is not done, a stop-loss could 
// be triggered too often and you may miss good trades.
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

DCW(length, smoothe) =>
    pos = 0.0
    xUpper = highest(high, length)
    xLower = lowest(low, length)
    xDonchianWidth = xUpper - xLower
    xSmoothed = sma(xDonchianWidth, smoothe)
    pos := iff(xDonchianWidth > xSmoothed, -1,
              iff(xDonchianWidth < xSmoothed, 1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Donchian Channel Width", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthDCW = input(20, minval=1)
SmootheSCW = input(22, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posDCW = DCW(LengthDCW, SmootheSCW)
pos = iff(posReversal123 == 1 and posDCW == 1 , 1,
	   iff(posReversal123 == -1 and posDCW == -1, -1, 0)) 
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

https://www.fmz.com/strategy/442250

> Last Modified

2024-02-20 15:27:02
