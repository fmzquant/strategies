
> Name

2-20-Exponential-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy is based on the 2/20 exponential moving average line. It enters long or short positions when the price breaks through the average line. It combines the trend following function of moving averages and the trend reversal function of breakout trading, aiming to capture both short-term and medium-term trends.

## Strategy Logic

The strategy uses a 20-period exponential moving average as the benchmark line. When the high or low of the latest candlestick breaks through the benchmark line, it signals a potential trend reversal. If the previous candle's reversal point is lower than the current closing price, go long. If the previous candle's reversal point is higher than the current closing price, go short. 

Specifically, the strategy identifies reversal signals by calculating the current candle's high, low and comparing it with the previous candle's closing price, and plots out the reversal point. When the reversal point is higher than the previous close, it goes long. When the reversal point is lower, it goes short. The long/short signals are generated using the 20-day EMA as a reference benchmark, which identifies the trend direction. The comparison between the reversal point and closing price determines the timing of reversal.

## Advantage Analysis

- Combines trend following and trend reversal, capturing both medium-long term trends and short-term opportunities
- The exponential moving average filters out short-term market noise
- Comparing reversal points with closing prices can accurately identify reversals
- Highly flexible across different products and timeframes

## Risk Analysis

- Stock index futures have extremely high leverage, very risky for this strategy. More suitable for stocks and forex
- Susceptible to false breakouts and whipsaws in ranging markets, leading to losses
- Limited optimization space with few adjustable parameters
- Requires other indicators for asset selection and position sizing

Solutions:

- Optimize moving average parameters using machine learning
- Add other indicators like volume to confirm valid breakout
- Only trade this strategy in clear trends, avoid ranging markets
- Implement strict risk management rules to limit losses

## Optimization Directions 

This strategy can be improved in the following aspects:

1. Optimize moving average parameters, adjust period or add double moving averages
2. Add filters like volume to filter breakout signals
3. Incorporate stop loss strategies to control risks
4. Add machine learning models to predict trends and breakout probabilities
5. Consider adaptive parameters that dynamically adjust 
6. Combine sentiment analysis to find optimal entry points
7. Optimize position sizing strategies, e.g. fixed fractional, martingale, etc

Through parameter optimization, indicator combos, risk management etc, the strategy's stability and reliability can be enhanced, while lowering trading risks.

## Summary

In summary, this simple strategy relies on a single indicator, making it sensitive to parameters and market conditions, with limited optimization space. It is best used to complement other strategies. However, the concept of capturing reversals is instructive and can be incorporated into more sophisticated breakout systems. With proper filters, risk management and robustness enhancement, this strategy can serve as a component in an overall strategy portfolio to improve stability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-12 00:00:00
end: 2023-09-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 21/11/2016
// This indicator plots 2/20 exponential moving average. For the Mov 
// Avg X 2/20 Indicator, the EMA bar will be painted when the Alert criteria is met.
////////////////////////////////////////////////////////////
strategy(title="Strategy 2/20 Exponential Moving Average", overlay = true)
Length = input(20, minval=1)
xPrice = close
xXA = ema(xPrice, Length)
nHH = max(high, high[1])
nLL = min(low, low[1])
nXS = iff((nLL > xXA)or(nHH < xXA), nLL, nHH)
pos = iff(nXS > close[1] , -1, iff(nXS < close[1] , 1, nz(pos[1], 0))) 
if (pos == 1) 
    strategy.entry("Long", strategy.long)
if (pos == -1)
    strategy.entry("Short", strategy.short)	    
barcolor(pos == -1 ? red: pos == 1 ? green : blue )
//plot(nXS, color=blue, title="XAverage")

```

> Detail

https://www.fmz.com/strategy/427276

> Last Modified

2023-09-19 17:02:20
