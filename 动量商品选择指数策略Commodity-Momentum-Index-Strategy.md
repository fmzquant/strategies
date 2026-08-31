
> Name

动量商品选择指数策略Commodity-Momentum-Index-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1405f2260d16af433b9.png)

## Overview  

The Commodity Selection Index (CSI) strategy is a short-term trading strategy that tracks market momentum. It identifies commodities with strong momentum by calculating the trend and volatility of commodities for trading. This strategy was proposed by Welles Wilder in his book New Concepts in Technical Trading Systems.  

## Strategy Principle

The core indicator of this strategy is the CSI index, which takes into account the trend and volatility of commodities. The specific calculation method is:

CSI = K × ATR × ((ADX + n-day moving average of ADX) / 2)

Where K is a scaling factor, ATR represents the Average True Range, which measures market volatility. ADX represents the Average Directional Index, which reflects the trend of the market.

By calculating the CSI index value of each commodity and comparing it with its n-day simple moving average, a buy signal is generated when the CSI is higher than its moving average, and a sell signal is generated when the CSI is lower than its moving average.

The strategy selects commodities with relatively high CSI indices for trading. Because these commodities have very strong trends and fluctuations that can generate greater profit potential in the short term.

## Advantage Analysis  

This strategy has the following advantages:

1. Capture market momentum and make full use of the trend and volatility characteristics of commodities.  
2. Use dual indicators to make trading signals more reliable.
3. Simple and clear trading rules suitable for algorithm trading.  
4. Specially designed for short-term trading to quickly seize short-term opportunities.

## Risk Analysis

The strategy also has some risks:  

1. Overly dependent on technical indicators, false signals may occur.
2. The characteristic of chasing momentum makes it only suitable for short-term operations.  
3. Excessive fluctuations may trigger stop loss and cause losses to trading.
4. Need to withstand a certain degree of leverage and thus face greater capital risk.


To control risks, stop loss positions should be reasonably set, single position size should be controlled, and parameters should be appropriately adjusted to suit different market environments.

## Optimization Directions  

The strategy can be optimized in the following aspects:

1. Test more parameter combinations to find the optimal parameters.  
2. Add other auxiliary indicators for signal filtering.
3. Combine with other strategies such as volatility reversal to form a portfolio.  
4. Use machine learning to train models to generate more reliable trading signals.


## Conclusion  

The commodity momentum index strategy realizes simple and fast short-term trading by capturing commodities with strong trends and high volatility in the market. This specialized approach of tracking momentum makes its signals clear and easy to implement algorithmically. Of course, it is also necessary to pay attention to risk control and continue to improve and upgrade to adapt to changes in market conditions.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|PointValue|
|v_input_2|3000|Margin|
|v_input_3|10|Commission|
|v_input_4|14|Length|
|v_input_5|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-28 00:00:00
end: 2023-11-27 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 20/03/2019
// The Commodity Selection Index ("CSI") is a momentum indicator. It was 
// developed by Welles Wilder and is presented in his book New Concepts in 
// Technical Trading Systems. The name of the index reflects its primary purpose. 
// That is, to help select commodities suitable for short-term trading.
// A high CSI rating indicates that the commodity has strong trending and volatility 
// characteristics. The trending characteristics are brought out by the Directional 
// Movement factor in the calculation--the volatility characteristic by the Average 
// True Range factor.
// Wilder's approach is to trade commodities with high CSI values (relative to other 
// commodities). Because these commodities are highly volatile, they have the potential 
// to make the "most money in the shortest period of time." High CSI values imply 
// trending characteristics which make it easier to trade the security.
// The Commodity Selection Index is designed for short-term traders who can handle 
// the risks associated with highly volatile markets.
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
fADX(Len) =>
    up = change(high)
    down = -change(low)
    trur = rma(tr, Len)
    plus = fixnan(100 * rma(up > down and up > 0 ? up : 0, Len) / trur)
    minus = fixnan(100 * rma(down > up and down > 0 ? down : 0, Len) / trur)
    sum = plus + minus 
    100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), Len)

strategy(title="Commodity Selection Index Backtest", shorttitle="CSI Backtest")
PointValue = input(50)
Margin = input(3000)
Commission = input(10)
Length = input(14)
reverse = input(false, title="Trade reverse")
K = 100 * ((PointValue / sqrt(Margin) / (150 + Commission)))
xATR = atr(Length)
xADX = fADX(Length)
nADXR = (xADX + xADX[Length]) * 0.5
xCSI = K * xATR * nADXR
xMACSI = sma(xCSI, Length)
pos = 0.0
pos := iff(xCSI < xMACSI, 1,
	   iff(xCSI > xMACSI, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(xCSI, color=green, title="CSI")
plot(xMACSI, color=red, title="CSI SMA")
```

> Detail

https://www.fmz.com/strategy/433579

> Last Modified

2023-11-28 16:27:55
