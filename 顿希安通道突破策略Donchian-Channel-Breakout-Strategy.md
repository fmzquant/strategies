
> Name

顿希安通道突破策略Donchian-Channel-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses the Donchian Channel indicator to trade breakouts of the upper and lower bands, enabling trend following operations across stocks/futures/crypto/forex etc, belonging to medium-to-long-term trend breakout strategies.

## Strategy Logic

1. Calculate the highest high and lowest low over a given period (e.g. 20 days) to get the upper and lower bands.

2. The midline is the average of the upper and lower bands. Breaking upper band signals uptrend, breaking lower band signals downtrend.

3. When price closes above upper band, determine uptrend has started, go long to enter. 

4. When price breaks below midline, take profit to exit.

5. Can reference backtest timeframe to generate actual trading signals.

6. Optionally, breaking lower band can also act as short signal.

The strategy determines trend start by channel breakouts, uses midline as profit taking exit, capturing mid-to-long term trends. Channel parameters can be adjusted to fit the market. 

## Advantage Analysis

1. Donchian Channel is simple to calculate and implement.

2. Price breaking channel signals trend change.

3. Midline as profit taking level is reasonably set. 

4. Clear signal rules, easy to execute.

5. Can flexibly adjust channel parameters for different products and timeframes.

6. Can evaluate long term or short term trading performance.

7. Large expansion space, can introduce other technical indicators.

## Risk Analysis

1. Channel breakout may lag, risking missed early opportunities. 

2. Does not consider divergence before breakout, may generate false signals.

3. Fixed midline stop loss sensitive to market volatility.

4. Improper backtest period risks over-fitting. 

5. Lacks stop loss, need to watch out for enlarged losses.

## Optimization Directions

1. Test and optimize channel period parameters.

2. Evaluate other MA types as stop loss lines.

3. Add filters like volume indicators.

4. Add moving or trailing stop loss mechanisms. 

5. Introduce machine learning to predict price breakouts.

6. Optimize money management, set profit ratio etc.

7. Consider combining long/short term operations or multiple products.

## Summary

This strategy uses Donchian Channel to determine trend direction, trading breakouts, a typical mid-to-long term trend following approach. Optimizing channel parameters and adding other technical indicators can form a more robust breakout system. The clear and concise logic allows expansions, making it a foundational quant strategy module with great practical utility.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2000|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2018|Backtest Start Year|
|v_input_5|12|Backtest Start Month|
|v_input_6|true|Backtest Start Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-15 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//future strategy
//strategy(title = "stub", default_qty_type = strategy.fixed, default_qty_value = 1,  overlay = true, commission_type=strategy.commission.cash_per_contract,commission_value=2)
//stock strategy
strategy(title = "dc", default_qty_type = strategy.percent_of_equity, default_qty_value = 100,  overlay = true, commission_type=strategy.commission.cash_per_contract,commission_value=.005)
//forex strategy
//strategy(title = "stub", default_qty_type = strategy.percent_of_equity, default_qty_value = 100,  overlay = true)
//crypto strategy
//strategy(title = "stub", default_qty_type = strategy.percent_of_equity, default_qty_value = 100,  overlay = true, commission_type=strategy.commission.percent,commission_value=.25,default_qty_value=10000)


testStartYear = input(2000, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testEndYear = input(2018, "Backtest Start Year")
testEndMonth = input(12, "Backtest Start Month")
testEndDay = input(1, "Backtest Start Day")
testPeriodEnd = timestamp(testStartYear,testStartMonth,testStartDay,0,0)


testPeriod() =>
    true
    //time >= testPeriodStart  ? true : false

dcPeriod = 20

dcUpper = highest(close, dcPeriod)[1]
dcLower = lowest(close, dcPeriod)[1]
dcAverage = (dcUpper + dcLower) / 2

plot(dcLower, style=line, linewidth=3, color=red, offset=1)
plot(dcUpper, style=line, linewidth=3, color=aqua, offset=1)

plot(dcAverage, color=yellow, style=line, linewidth=1, title="Mid-Line Average")

strategy.entry("simpleBuy", strategy.long, when=close >= dcUpper)
strategy.close("simpleBuy",when=close < dcAverage)
    
//strategy.entry("simpleSell", strategy.short,when=close <= dcLower)
//strategy.close("simpleSell",when=close > dcAverage)
    


```

> Detail

https://www.fmz.com/strategy/427308

> Last Modified

2023-09-19 21:47:41
