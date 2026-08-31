
> Name

基于趋势预测双均线策略Trend-Prediction-Dual-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/189934e408c0a6c25ce.png)

## Overview

The Trend Prediction Dual Moving Average Strategy is a strategy that tries to predict trend changes before the actual break from one trend to another. It extends LazyBear's WaveTrend indicator. The strategy can identify price trends and display buy and sell signals through curve filling visual effects.

## Strategy Principle 

The strategy uses LazyBear's WaveTrend indicator as the basis. WaveTrend itself is an excellent trend tracking indicator. The strategy extends and optimizes on this basis. The main steps are as follows:

1. Calculate average HLC price  
2. Calculate EMA average price
3. Calculate EMA of absolute deviation of price  
4. Calculate zero-leveled adjusted indicator
5. Calculate EMA of trend
6. Calculate fast and slow moving averages  

Through such processing, random price fluctuations can be filtered out and relatively clear trends can be identified. The cross of fast and slow moving averages can be used to issue buy and sell signals.

## Advantage Analysis

The strategy has the following advantages:

1. Can effectively identify price trends  
2. Timely signal generation, can predict trend reversals in advance
3. Clearly visualize trends through curve filling  
4. Large parameter optimization space that can be adjusted according to different varieties and cycles

## Risk Analysis

The strategy also has some risks:

1. Like all technical indicator strategies, there is a risk of failure in case of extreme price volatility
2. Improper parameter settings may cause false signals  
3. Signal lag may result in losses

These risks can be mitigated through methods like adjusting parameters, combining other indicators, etc.

## Optimization Directions  

The strategy can be optimized in the following aspects:

1. Adjust parameters to suit more varieties and cycles  
2. Increase stop loss strategy to control loss risk
3. Combine with other indicators to improve signal accuracy  
4. Increase machine learning models to assist in judging trends and issuing signals  

## Summary  

Overall, the Trend Prediction Dual Moving Average Strategy is a very promising strategy. It can effectively identify price trends and try to predict trend changes in advance. With some optimization and improvement, the strategy can become a powerful quantitative trading system. Its simple and straightforward trading logic and clear visual effects also make it a strategy worth learning and researching.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Channel Length|
|v_input_2|21|Average Length|
|v_input_3|4| WTFactor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-26 00:00:00
end: 2024-02-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("BreakingDawn [JackTz]", overlay = true)

// WaveTrend [LazyBear]
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

n1 = input(10, "Channel Length")
n2 = input(21, "Average Length")
 
WTfactor = input(4, title=" WTFactor")
averageHlc3 = sum(hlc3, WTfactor) / WTfactor
ap = averageHlc3 
esa = ema(ap, n1)
d = ema(abs(ap - esa), n1)
ci = (ap - esa) / (0.015 * d)
tci = ema(ci, n2)
wt1 = tci
wt2 = sma(wt1,4)
wtAvg = wt1-wt2
wtPeriodAvgVal = wtAvg * 45 + averageHlc3
wtPeriodAvg2Val = wtAvg * 25 + averageHlc3

buy = wtAvg[1] < wtAvg and wtAvg < close
sell = wtAvg[1] > wtAvg

fillColor = buy ? color.green : color.red
control = plot(wtPeriodAvgVal, color = fillColor)
signal = plot(wtPeriodAvg2Val, color = fillColor)
fill(signal, control, color = fillColor)

if year > 2016
    strategy.entry("buy", strategy.long, when = buy)
    strategy.close("buy",when = sell)

```

> Detail

https://www.fmz.com/strategy/440866

> Last Modified

2024-02-02 17:39:54
