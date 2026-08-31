
> Name

双因子反转追踪策略Dual-Factor-Mean-Reversion-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/164b5b87d3a85696887.png)


## Overview

This strategy belongs to the dual factor mean reversion tracking strategy in the field of quantitative trading. It integrates the 123 reversal strategy and the Keltner channel strategy with two factors, aiming to discover reversal signals and realize the trading idea of buying low and selling high.

## Principle  

The strategy consists of two sub-strategies. The first sub-strategy is the 123 reversal strategy. It judges whether the market is at a reversal point by calculating the change in closing prices over the previous two trading days and combining the Stochastic indicator. Specifically, when the closing price rises for two consecutive days and the Stochastic indicator is below 50, a buy signal is issued; When the closing price falls for two consecutive days and the Stochastic indicator is above 50, a sell signal is issued.

The second sub-strategy is the Keltner channel strategy. This strategy calculates the typical price moving average and volatility range over the most recent n trading days. When the price approaches the upper or lower rails, reverse trading signals are issued. When the price is below the lower rail, go short; when it is above the upper rail, go long.

Finally, by judging the signal directions of the two sub-strategies, the strategy calculates the final position signal. When the signals of the two sub-strategies are consistent, real trading orders are issued, otherwise no transactions are made to achieve the purpose of dual factor verification.

## Advantage Analysis  

The biggest advantage of this dual factor mean reversion tracking strategy is that it can grasp opportunities in time when the market reverses and realize the trading idea of buying low and selling high. At the same time, the dual factor confirmation mechanism can reduce false signals to some extent and improve the quality of signals.

Specifically, the parameter setting of the Stochastic indicator in the 123 reversal strategy is relatively conservative, which can effectively filter false reversals in oscillating markets. And the idea of Keltner channel tracking Bollinger bands can also seize reversal opportunities when price breaks through upper and lower rails. The two complement each other to reduce unnecessary transactions and thus obtain higher winning rates.

## Risk Analysis   

The main risk of this strategy is that the timing of reversal signals is crucial. If continuous false reversals occur or the timing of reversal signals is improperly chosen, it will lead to failure to hold a complete trend, thereby affecting the final return.

In addition, dual-factor strategies have greater difficulty in parameter selection and optimization than single-factor strategies. Comprehensive testing and evaluation of the parameters of the two sub-strategies is needed, otherwise failure is also very likely.

Finally, reverse trading itself has a disproportionate risk-reward ratio. Abnormal market conditions can easily lead to liquidation. This needs to be avoided through strict stop loss.

## Optimization Directions

According to the above risk analysis, the strategy can be optimized in the following aspects:  

1. Test different settings of reversal indicator parameters to find combinations with higher fault tolerance and less false signals
2. Try parameter values of different cycle lengths to find values that capture reversals more precisely  
3. Add a stop loss module to strictly control the maximum loss per trade
4. Test the effects of different holding periods to find exit points that match the strategy logic better  
5. Increase the number of open positions or add position control modules to make the risk-reward ratio more reasonable

## Summary  

As a typical dual factor mean reversion tracking strategy, by integrating the 123 reversal and Keltner channel sub-strategies, this strategy aims to more precisely seize the timing of buying low and selling high at market reversal points. With proper parameter optimization and risk control, such a strategy can obtain relatively considerable alpha. But traders still need to pay attention to the particularity of reverse trading and prevent the expansion of losses caused by abnormal market conditions.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Trade reverse|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|10|Period|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-18 00:00:00
end: 2023-12-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 09/12/2020
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
// The Keltner Channel, a classic indicator 
// of technical analysis developed by Chester Keltner in 1960. 
// The indicator is a bit like Bollinger Bands and Envelopes.
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

KeltnerChn(nPeriod) =>
    pos = 0.0
    xPrice = sma(hlc3, nPeriod)
    xMove = sma(high - low, nPeriod)
    reverse = input(false, title="Trade reverse")
    xUpper = xPrice + xMove
    xLower = xPrice - xMove
    pos := iff(close < xLower, -1,
             iff(close > xUpper, 1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Keltner Channel", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
nPeriod = input(title="Period", defval=10, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posKeltnerChn = KeltnerChn(nPeriod)
pos = iff(posReversal123 == 1 and posKeltnerChn == 1 , 1,
	   iff(posReversal123 == -1 and posKeltnerChn == -1, -1, 0)) 
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

https://www.fmz.com/strategy/435837

> Last Modified

2023-12-19 11:09:20
