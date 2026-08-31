
> Name

Stochastic-RSI-Trading-Strategy-427683

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy is based on the Stochastic RSI indicator, which combines the Stochastic oscillator and the Relative Strength Index (RSI). It generates trading signals when the Stochastic RSI lines cross overbought or oversold levels.

## Strategy Logic

1. Calculate the 14-period RSI of close price, rsi1. 

2. Calculate the Stochastic K and D values based on rsi1.

3. Go long when K goes above 80, and go short when K falls below 20.

4. Close positions when K crosses the 80 and 20 levels.

5. Option to trade in the reverse direction.

6. Backtest on different products and timeframes to evaluate performance.

## Advantage Analysis

The main advantages of this strategy are:

1. Stochastic RSI combines the strengths of RSI and Stochastic oscillators.

2. Overbought/oversold areas help filter false breakouts. 

3. Flexibility to trade reversals when configured.

4. Simple and intuitive trading rules. 

5. Clear visual signals easy for manual trading.

## Risk Analysis

The main risks of this strategy are:

1. No stop loss exposes to large losses.

2. Oscillators prone to false signals without trend filter.

3. No position sizing control risks over-trading. 

4. Lack of parameter optimization leads to overfitting.

5. Ignores trading costs.

6. Insufficient backtest data causes curve fitting.

## Optimization Directions

The strategy can be improved by:

1. Adding stop loss and optimizing stop levels.

2. Optimizing parameters to reduce false signals.

3. Controlling position sizes and leverage.

4. Adding filters to avoid counter-trend trades. 

5. Accounting for trading costs.

6. Validating over longer timeframes and instruments.

## Summary

The Stochastic RSI strategy combines the strengths of RSI and Stochastic oscillators, generating signals when the lines cross key levels. Despite being simple to use, the strategy risks false signals. Further enhancements around stops, parameters, trend filters can help create a more robust short-term trading system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|80|TopBand|
|v_input_2|20|LowBand|
|v_input_3|false|Trade reverse|
|v_input_4|14|lengthRSI|
|v_input_5|14|lengthStoch|
|v_input_6|3|smoothK|
|v_input_7|3|smoothD|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-23 00:00:00
end: 2023-09-22 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 24/11/2014
// This strategy used to calculate the Stochastic RSI
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Stochastic RSI", shorttitle="Stoch RSI Backtest")
TopBand = input(80, step=0.01)
LowBand = input(20, step=0.01)
reverse = input(false, title="Trade reverse")
hline(TopBand, color=red, linestyle=line)
hline(LowBand, color=green, linestyle=line)
Source = close
lengthRSI = input(14, minval=1), lengthStoch = input(14, minval=1)
smoothK = input(3, minval=1), smoothD = input(3, minval=1)
rsi1 = rsi(Source, lengthRSI)
k = sma(stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
d = sma(k, smoothD)
d_cross_80 = cross(d,TopBand) 
dc80 = d_cross_80 ? red : green 
pos = iff(k > TopBand, 1,
       iff(k < LowBand, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )  
plot(k, color= orange)
plot(d, color=dc80)
```

> Detail

https://www.fmz.com/strategy/427683

> Last Modified

2023-09-23 15:59:22
