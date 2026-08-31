
> Name

Zero-Lag-Hull-EMA-Combo-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description


### Overview

This strategy uses a combination of Zero Lag EMA and Hull EMA to implement trend following. Zero Lag EMA eliminates the lag of regular EMA, and Hull EMA smooths the price curve. Their combination can more accurately capture trend movements for low-risk trend following trading.

### Strategy Logic

First calculate the Zero Lag EMA:
    ```
    EMA1 = ema(close, Period)
    EMA2 = ema(EMA1, Period)
    Difference = EMA1 - EMA2 
    ZeroLagEMA = EMA1 + Difference
    ```

Where ZeroLagEMA is the Zero Lag EMA. It eliminates the lag problem of regular EMA. 

Then calculate the Hull EMA smoothed curve:

    ```
    n2ma = 2*wma(ZeroLagEMA, round(S_period/2))
    nma = wma(ZeroLagEMA, S_period) 
    n1 = wma(n2ma - nma, sqn)
    ```

Finally, determine the trend direction based on the magnitude relationship between the current Hull EMA (n1) and the previous period's Hull EMA (n2), and formulate the trading strategy.

### Advantage Analysis 

The biggest advantage of this strategy is the ability to accurately capture trend directions. There are two reasons:

1. Zero Lag EMA eliminates the lag problem of regular EMA and can capture price changes faster.

2. Hull EMA doubles smoothes prices and filters out some noise to capture trends more clearly.

Compared to using EMA or Hull EMA alone, the combination leverages the strengths of both for a more accurate and reliable strategy.

### Risk Analysis

The main risks of this strategy are:

1. Improper Period and S_period parameter settings may cause the strategy to be insensitive to the market and miss trading opportunities.

2. In ranging markets, EMA and Hull EMA may produce more false crossover signals that require caution. 

3. It cannot effectively handle overnight price gaps.

Therefore, careful parameter testing is needed, indicator signals should be interpreted prudently, and price gap risks guarded against.

### Optimization Directions

The strategy can be optimized in the following aspects:

1. Test parameter combinations under different markets and timeframes for better adaptability.

2. Add other indicators to filter false breakout signals, such as KDJ, MACD etc, to improve stability.

3. Add stop loss to control single trade loss. 

4. Optimize entry timing to further improve win rate, e.g. avoiding trades against the trend.

### Summary

This strategy uses the Zero Lag Hull EMA combo to accurately and sensitively capture market trends for low-risk trend following trading. Further improvements in stability can be achieved through parameter optimization, signal filtering, stop loss etc. Overall, the strategy is simple, practical and suitable for trending currency pairs and indices.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|30|Period|
|v_input_2|176|Smoother Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-09-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// Zero Lag EMA combined with Hull moving average for smoothing purposes.
// author: email: sbginter@gmail.com

strategy("Ujanja", overlay=true)



Period = input(title="Period",defval=30, minval=1)
S_period=input(title="Smoother Period",defval=176)
EMA1= ema(close,Period)
EMA2= ema(EMA1,Period)
Difference= EMA1 - EMA2
ZeroLagEMA= EMA1 + Difference

n2ma=2*wma(ZeroLagEMA,round(S_period/2))
nma=wma(ZeroLagEMA,S_period)
diff=n2ma-nma
sqn=round(sqrt(S_period))


n2ma1=2*wma(ZeroLagEMA[1],round(S_period/2))
nma1=wma(ZeroLagEMA[1],S_period)
diff1=n2ma1-nma1
sqn1=round(sqrt(S_period))


n1=wma(diff,sqn)
n2=wma(diff1,sqn)

c=n1>n2?green:red
ma=plot(n1,color=c)


longCondition = n1>n2
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = longCondition != true
if (shortCondition)
    strategy.entry("Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/427274

> Last Modified

2023-09-19 16:53:31
