
> Name

Oscillation-Balance-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/122ea69ae8138825f10.png)



## Overview

The Oscillation Balance strategy is a simple strategy that uses weighted moving averages and basic lookback periods to predict price movement in the next tick. It calculates the current close position relative to the open based on high and low, then computes exponential moving averages of different periods, and finally judges the general price trend based on historical data.

## Principle Analysis 

The strategy first calculates the close position relative to open: `BoP = (close - open) / (high - low)`. Then it calculates the EMAs of periods 3, 6, 9, 12, and 18.

Drawing EMAs in different colors shows that shorter period lines change direction first, while longer period lines provide support and resistance. Filling the areas between EMAs makes it more intuitive to see the price oscillation between the lines.

It further takes the arithmetic mean of these EMAs to get a comprehensive line. Looking at the change of this line in the past two periods, it predicts the trend in the next period. If the comprehensive line rises, go long. If it falls, go short.

This way, it estimates a general future trend based on historical data. Although very simple, the visual EMAs and fillings clearly show the price oscillation.

## Advantage Analysis

The advantages of this strategy include:

1. The principle is simple and easy to understand and implement.

2. It aggregates complex price history into a simple comprehensive line for judging entry and exit points by direction.

3. The combination of multiple period EMAs provides more comprehensive references. Short period lines determine specific entry while long period ones decide general trend.

4. Filling between EMAs forms an intuitive visual effect for seeing clear price oscillation. 

5. No need to set stop loss or take profit, avoiding unnecessary trades.

## Risk Analysis 

The risks of this strategy include:

1. The prediction is solely based on past data, not ensuring future occurrence. It needs confirmation with trends and key levels.

2. Sudden price changes from events may render inaccurate predictions. Proper risk control is required.

3. Multiple EMAs can generate confused signals. Weights need to be optimized. 

4. High trading frequency may happen and interval control is needed to reduce unnecessary trading.

5. The strategy signals lag, possibly causing late entry and premature stop loss.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize the EMA weights for clearer signals. For example, increase weights for medium and long term EMAs.

2. Add trend indicator confirmation to avoid counter trend trades. Such as using ADX to determine trend strength.

3. Add filters at key support and resistance levels to reduce false signals. 

4. Optimize entry rules to avoid unnecessary opening positions. Trend filter or volume confirmation can be added.

5. Optimize stop loss methods like curve stop loss or ATR stop loss. 

6. Add sentiment indicators to avoid chasing tops and bottoms. For example, long/short ratio and fund flow.

7. Control interval to lower trading frequency. Or optimize number of trades to avoid overtrading.

## Summary

The Oscillation Balance strategy judges entry and exit points simply and intuitively by calculating price oscillation and visualizing EMAs of multiple periods. Although risks like prediction lag and wrong signals exist, it can be optimized by adding filters, stop loss methods etc. It provides useful references when trend trading. This strategy suits frequent short-term traders and visual pattern analyzers.




> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-13 00:00:00
end: 2023-10-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Balance of Power", format=format.price, precision=2)

BoP = (close - open) / (high - low)
p1 = plot(ema(BoP,18),color=color.purple)
p2 = plot(ema(BoP,12),color=color.blue)
p3 = plot(ema(BoP,9),color=color.green)
p4 = plot(ema(BoP,6),color=color.yellow)
p5 = plot(ema(BoP,3),color=color.orange)
p6 = plot(BoP, color=color.red)


sumEMA = (avg(BoP,ema(BoP,3),ema(BoP,6),ema(BoP,9),ema(BoP,12),ema(BoP,18)))
plot(sumEMA,color=color.gray)

fill(p1,p2,color.purple)
fill(p2,p3,color.blue)
fill(p3,p4,color.green)
fill(p4,p5,color.yellow)
fill(p5,p6,color.orange)




projected = sumEMA + (sumEMA - sumEMA[2])
p7 = plot(projected, linewidth=2, color=color.white)
fill(p6,p7,color.red)

//strategy.exit("exitx","Exit",when=cross(projected,0))

strategy.entry("Long",true,1,when=crossover(projected,0))
strategy.entry("Short",false,0,when=crossunder(projected,0))


```

> Detail

https://www.fmz.com/strategy/429780

> Last Modified

2023-10-20 17:03:08
