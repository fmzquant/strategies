
> Name

移动平均交叉优化策略Optimized-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/5a2fb23485f666db03.png)

## Overview

This strategy is based on regular moving average crossovers but some modifications have been made to generate more accurate trading signals. It combines fast and slow moving averages to identify the trend direction and belongs to trend following strategies.  

## Strategy Logic  

When the fast moving average crosses above the slow moving average from the bottom up, it is considered as a buy signal. When the fast moving average crosses down the slow moving average from the top down, it is considered as a sell signal. That is, golden cross for long, death cross for short. Once long/short position is taken, stop loss will be set to avoid huge losses.

The key lies in the selection of fast and slow moving averages. This strategy adopts the 50&100 period exponential moving averages as the fast and slow line respectively. The strategy effect can be optimized by adjusting the MA parameters.   

## Advantage Analysis

This strategy identifies the trend direction by combining dual moving averages, which can filter market noise effectively. Compared with single MA strategies, it can improve the profitability probability. In addition, the stop loss setting also limits the loss of individual trades.  

By leveraging the crossover rules to determine inflection points, this strategy can capture trending opportunities in a timely manner. Compared with strategies consisting of complex logics, it is easy to understand and implement.

## Risk Analysis   

There are three major risks for this strategy: inappropriate MA parameter risk, improper holding period risk and unreasonable stop loss position risk.

- Improper MA parameter selection will lead to false signals. Either too short or too long MA lengths will misjudge the market, so proper adjustment according to the instrument's characteristics is required.

- Either too long or too short holding period cannot maximize the profit or control the risk properly. Different exit methods should be tested to determine the optimal holding period.  

- Unreasonable stop loss position setting will lead to either too wide or too narrow stop loss, so appropriate stop loss based on the instrument's volatility shall be determined.

## Optimization Directions

This strategy can be optimized from the following aspects:

- Test more MA parameter combinations to find the optimal parameters  

- Determine dynamic stop loss position based on price fluctuation or ATR of recent N days

- Combine more indicators like MACD, KD etc. to determine entry timing   

- Add trend filtering rules to avoid range-bound market

- Consider applying the strategy to more instruments, or improve it to cross-instrument strategy

## Summary   

This optimized moving average crossover strategy integrates the advantage of dual MA in judging trend directions and sets stop loss to control risks. It belongs to easy-to-implement trend following strategies. This strategy can be further enhanced in stability and efficiency through parameter optimization, stop loss optimization, signal filtering etc. Compared with complex strategies, it is easier to understand and implement, and hence very suitable to be the first quant trading strategy for beginners.  


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|Fast EMA Length|
|v_input_2|100|Slow EMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-27 00:00:00
end: 2024-02-03 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ashishchauhan
strategy(title="MA CO Strategy Test", overlay=true, pyramiding=0, initial_capital=100000)

fastEMALen = input(title="Fast EMA Length", type=input.integer, defval=50)
slowEMALen = input(title="Slow EMA Length", type=input.integer, defval=100)

fastEMA = ema(close, fastEMALen)
slowEMA = ema(close, slowEMALen)

enterLong = crossover(fastEMA, slowEMA)
enterShort = crossunder(fastEMA, slowEMA)

longStop = 0.0
longStop := enterShort ? close : longStop[1]

shortStop = 0.0
shortStop := enterLong ? close : shortStop[1]

plot(series=fastEMA, color=color.orange, title="Fast EMA")
plot(series=slowEMA, color=color.teal, linewidth=3, title="Slow EMA")

if enterLong
    strategy.entry(id="GoLong", long=true)

if enterShort
    strategy.entry(id="GoShort", long=false)

if strategy.position_size > 0
    strategy.exit(id="ExLong", from_entry="GoLong", stop=longStop)

if strategy.position_size < 0
    strategy.exit(id="ExShort", from_entry="GoShort", stop=shortStop)

strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/440954

> Last Modified

2024-02-04 10:31:45
