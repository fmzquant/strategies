
> Name

双指数移动平均线策略Developing-a-2-20-Exponential-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy utilizes a dual exponential moving average to determine the direction of the trend based on the price breaking through the moving average. It goes long when the price rises above the moving average and goes short when the price falls below the moving average. The strategy combines trend determination and overbought/oversold levels to lock in profits.

## Strategy Logic  

The strategy is based on the dual exponential moving average indicator. The Length parameter in the indicator sets the moving average period to 20 days. The xPrice parameter is set to the closing price close. The 20-day exponential moving average xXA is then calculated. The highest high nHH and lowest low nLL over the past two days are also calculated. If nLL is higher than the moving average or nHH is lower than the moving average, the smaller of nLL and nHH is taken as the key price nXS. If the closing price is higher than the moving average and the key price, it goes long. If the closing price is lower than the moving average and key price, it goes short. The reverse parameter determines if the trades are reversed.

The strategy judges the direction of the price breaking through the moving average and combines the real-time highest high and lowest low to determine the validity of the breakout to avoid false breakouts. It only sends trade signals when the price actually breaks through the moving average.

## Advantage Analysis

1. The dual exponential moving average can more accurately determine the trend direction.

2. Combining the highest high and lowest low to judge the validity of the breakout avoids false breakouts caused by price fluctuations. 

3. The long/short direction can be easily reversed using the reverse parameter to adapt to different market environments.

4. Only trading on breakouts effectively filters out market noise.

## Risk Analysis

1. The dual exponential moving average sometimes reacts slowly and may miss short-term trading opportunities.

2. Moving average systems are prone to generating frequent false signals during market consolidations.

3. The strategy suits market environments with obvious trends and is unsuitable for range-bound volatile markets.

4. It does not consider stop loss exits and has the risk of enlarging losses. 

5. It does not set position sizing and may lead to improper risk control.

## Optimization Directions 

1. Other indicators can be combined to judge market trends and avoid frequent trading during consolidations.

2. Dynamic stops can be added to control the risk of single trade losses.

3. The moving average parameters can be dynamically adjusted based on market volatility to optimize indicator sensitivity.

4. Position sizing can be set to control risks while expanding profits. 

5. Parameters can be optimized using Walk Forward Analysis.

## Summary

This strategy utilizes a dual exponential moving average indicator to determine the price trend direction while combining the highest high and lowest low to avoid false breakouts. There is room for improvement in optimizing stop loss mechanisms, controlling position sizing, etc. But overall, the strategy is simple, practical, and adaptable to different market environments through parameter adjustments, making it a reliable trend following strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-10-07 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 27/12/2016
// Strategy
// This indicator plots 2/20 exponential moving average. For the Mov 
// Avg X 2/20 Indicator, the EMA bar will be painted when the Alert criteria is met.
//
// You can use in the xPrice any series: Open, High, Low, Close, HL2, HLC3, OHLC4 and ect...
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Strategy 2/20 Exponential Moving Average", overlay = true)
Length = input(20, minval=1)
reverse = input(false, title="Trade reverse")
xPrice = close
xXA = ema(xPrice, Length)
nHH = max(high, high[1])
nLL = min(low, low[1])
nXS = iff((nLL > xXA)or(nHH < xXA), nLL, nHH)
pos =  iff(close > xXA and close > nXS , 1,
	     iff(close < xXA and close < nXS, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(nXS, color=blue, title="XAverage")
```

> Detail

https://www.fmz.com/strategy/428706

> Last Modified

2023-10-08 15:14:17
