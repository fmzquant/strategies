
> Name

相对波动指数回测策略Relative-Volatility-Index-Backtesting-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

The Relative Volatility Index (RVI) is a technical indicator that is a modified version of the Relative Strength Index (RSI). It measures the direction of volatility by calculating the standard deviation of closing prices over the past 10 days to determine market trends and strength.

## Strategy Logic

The core logic of this strategy is:

1. Calculate the standard deviation of closing prices over the past 10 days, StdDev.

2. Calculate the part of closing prices that are higher than the previous day over the past 10 days, u.

3. Calculate the part of closing prices that are lower than the previous day over the past 10 days, d.

4. Use exponential smoothing to calculate the 14-day exponential moving average of u and d, nU and nD. 

5. Calculate the ratio of nU and nD, then multiply by 100 to get the volatility index nRes.

6. Go short when nRes is lower than the buy zone, and go long when nRes is higher than the sell zone.

7. The buy and sell zone parameters and reverse trading can be set in the code.

By comparing the difference between upside and downside volatility over the past 10 days, the strategy judges the likely direction of the next market move. When upside volatility is greater, it is a bullish signal, and when downside volatility is greater, it is a bearish signal.

## Advantage Analysis

The RVI backtesting strategy has the following advantages:

1. Using standard deviation of closing prices to measure volatility better reflects market fluctuation information than just prices.

2. The calculation method is simple and clear, easy to understand and implement.

3. The buy and sell signals generated are clear, no need for secondary judgment.

4. The buy and sell zone parameters can be flexibly set to adjust strategy sensitivity.

5. Support for reverse trading, can be used in different types of markets. 

6. Visualized display of indicator line and trading zones forms intuitive trading signals.

7. Backtesting has verified the effectiveness of this strategy.

## Risk Analysis

This strategy also has some risks:

1. Buy and sell signals may have false signals, should combine trend and support/resistance analysis.

2. Only considers closing price volatility, cannot reflect intraday price action.

3. Improper parameter settings may lead to over-trading or lower returns.

4. Transaction costs in live trading will affect final return.

5. Risk of loss is greater in reverse trading mode.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Combine with other technical indicators to filter false signals, like MACD, KD etc.

2. Add dynamic adjustment of position sizing. 

3. Optimize the buy and sell zone ranges for more accurate signals.

4. Add stop loss mechanisms to control single trade loss.

5. Reduce position sizing in high volatility conditions. 

6. Test different indicator parameter settings, like calculation periods, smoothing parameters etc.

## Summary

The RVI backtesting strategy judges market direction by comparing upside/downside volatility, implementing a simple and intuitive trend following strategy. The advantages are clear logic, easy implementation, good backtesting results. It can be improved through proper optimizations. Still need risk control in live trading, and combine other indicators to verify signals. Overall this strategy provides a valuable idea for quantitative trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Period|
|v_input_2|30|BuyZone|
|v_input_3|70|SellZone|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-26 00:00:00
end: 2023-09-19 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 23/10/2017
// The RVI is a modified form of the relative strength index (RSI). 
// The original RSI calculation separates one-day net changes into 
// positive closes and negative closes, then smoothes the data and 
// normalizes the ratio on a scale of zero to 100 as the basis for the 
// formula. The RVI uses the same basic formula but substitutes the 
// 10-day standard deviation of the closing prices for either the up 
// close or the down close. The goal is to create an indicator that 
// measures the general direction of volatility. The volatility is 
// being measured by the 10-days standard deviation of the closing prices. 
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Relative Volatility Index", shorttitle="RVI")
Period = input(10, minval=1)
BuyZone = input(30, minval=1)
SellZone = input(70, minval=1)
reverse = input(false, title="Trade reverse")
hline(0, color=purple, linestyle=hline.style_dashed)
hline(BuyZone, color=red, linestyle=hline.style_solid)
hline(SellZone, color=green, linestyle=hline.style_solid)
xPrice = close
StdDev = stdev(xPrice, Period)
d = iff(close > close[1], 0, StdDev)
u = iff(close > close[1], StdDev, 0)
nU = (13 * nz(nU[1],0) + u) / 14
nD = (13 * nz(nD[1],0) + d) / 14
nRes = 100 * nU / (nU + nD)
pos = iff(nRes < BuyZone, -1,
	   iff(nRes > SellZone, 1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )  
plot(nRes, color=red, title="RVI")

```

> Detail

https://www.fmz.com/strategy/427893

> Last Modified

2023-09-26 16:15:44
