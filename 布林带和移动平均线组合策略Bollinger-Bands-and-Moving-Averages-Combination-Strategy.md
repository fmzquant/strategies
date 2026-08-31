
> Name

布林带和移动平均线组合策略Bollinger-Bands-and-Moving-Averages-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/168d6e214db1975dd6a.png)

## Overview

This strategy combines Bollinger Bands and Moving Averages, using Bollinger Bands upper band and lower band to determine price breakouts and using fast moving average golden cross and death cross with slow moving average to determine trends. It goes long when price breaks above Bollinger upper band and fast moving average crosses above slow moving average. It goes short when price breaks below Bollinger lower band and fast moving average crosses below slow moving average. Using such double confirmation can effectively filter false breakouts.  

## Strategy Principle   

This strategy mainly utilizes two technical indicators, Bollinger Bands to determine price levels and Moving Averages to determine trends.

Bollinger middle band is simple moving average of price, upper band is middle band + 2 standard deviation, lower band is middle band - 2 standard deviation. When price approaches upper band, it indicates an overbought condition. When price approaches lower band, it indicates an oversold condition.

Fast moving average is 50-period simple moving average of price and slow moving average is 200-period simple moving average. When fast MA crosses above slow MA, it signals an uptrend or a "golden cross". When fast MA crosses below slow MA, it signals a downtrend or a "death cross".

The entry signals require meeting both conditions simultaneously: price break above Bollinger upper band indicates breaking a resistance level AND fast MA cross above slow MA indicates uptrend; price break below Bollinger lower band indicates breaking a support level AND fast MA cross below slow MA indicates downtrend. This double confirmation can effectively filter the influence of false breakouts.   

## Advantages  

1. Using double confirmation can effectively filter false breakouts and make entries more accurate.

2. Bollinger Bands visually determine support and resistance levels, Moving Averages reliably determine trends, combination complements each other.   

3. High optimization flexibility on parameters like Bollinger period, standard deviation multiplier, MA periods etc. Fits more market environments.  

4. Simple to implement, easy to understand, less code, can directly be used in live trading.

## Risks

1. Both Bollinger Bands and MAs may fail in certain cases, double confirmation may also fail together, causing wrong entries.  

2. MAs have lagging issue, may cause inaccurate entry timing or missing opportunities.

3. Inadequate parameter settings like too short BB period, unmatched MA periods etc. may undermine strategy performance.  

4. Breakout strategies are prone to false breakout impact, even with double confirmation.

Methods like dynamic adjustment of parameters, strict stop loss, combining with other indicators can help reduce risks.  

## Optimization Directions 

1. Introduce other indicators for condition checking, e.g. volume amplification on BB breakouts, MACD for trend determination, forming multiple confirmations.

2. Incorporate candlestick patterns to assist entry timing, e.g. hammer formed on BB upper touch.  

3. Adopt dynamic MAs instead of static MAs to further improve trend determination.

4. Set parameter auto-optimization to find optimum parameter sets via historical backtests.  

5. Adjust position sizing and stop loss levels, set strict stop loss to control loss.  

## Conclusion  

This strategy combines Bollinger Bands and Moving Averages based on technical indicators, enters positions only when both price breakout of Bollinger Bands upper or lower band and golden/death cross of MAs are met. This utilizes Bollinger Bands’ intuitive support/resistance identification and Moving Averages’ reliable trend determination to complement each other and filters false breakouts effectively. In general, this is a practical strategy, easy to implement, and worthwhile to apply and optimize in live trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|BB Length|
|v_input_2|2|BB Standard Deviation|
|v_input_3|50|MA1 Length|
|v_input_4|200|MA2 Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-25 00:00:00
end: 2024-02-01 00:00:00
period: 2m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Bollinger Bands and Moving Averages Strategy", overlay=true)

// Bollinger Bands
length = input(20, minval=1, title="BB Length")
mult = input(2.0, minval=0.1, maxval=5, title="BB Standard Deviation")
src = close
basis = sma(src, length)
dev = mult * stdev(src, length)
upper = basis + dev
lower = basis - dev

// Moving Averages
ma1_length = input(50, minval=1, title="MA1 Length")
ma2_length = input(200, minval=1, title="MA2 Length")
ma1 = sma(src, ma1_length)
ma2 = sma(src, ma2_length)

// Strategy Conditions
longCondition = crossover(src, upper) and crossover(ma1, ma2)
shortCondition = crossunder(src, lower) and crossunder(ma1, ma2)

// Strategy Execution
strategy.entry("Long", strategy.long, when=longCondition)
strategy.entry("Short", strategy.short, when=shortCondition)
strategy.close("Long", when=shortCondition)
strategy.close("Short", when=longCondition)

// Plotting
plot(basis, color=color.blue, title="Basis")
plot(upper, color=color.red, title="Upper")
plot(lower, color=color.green, title="Lower")
plot(ma1, color=color.orange, title="MA1")
plot(ma2, color=color.purple, title="MA2")

```

> Detail

https://www.fmz.com/strategy/440871

> Last Modified

2024-02-02 17:47:12
