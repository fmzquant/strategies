
> Name

MCL-YG-Bollinger-Band-Breakout-Pair-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ea1fb4a77fbb0620a3.png)

### Overview

This strategy uses Bollinger Band breakouts to generate trading signals and implement pair trading between two positively correlated assets MCL and YG. It goes long MCL and short YG when MCL price touches the upper band, and goes short MCL and long YG when MCL price touches the lower band, to trade along the price trend.

### Strategy Logic

Firstly, the strategy calculates the SMA line and StdDev based on closing prices over a certain period. Then it adds an offset above and below the SMA to form the upper and lower bands of the Bollinger Bands. A buy signal is generated when price touches the upper band, and a sell signal when price touches the lower band.

The strategy utilizes the breakout trading logic of Bollinger Bands - go long when price breaks above the upper band and go short when price breaks below the lower band. Bollinger Bands dynamically adjust the width of the bands based on market volatility, which helps filter out market noise during ranging periods. Unlike fixed channel bands, Bollinger Bands widen during high volatility and narrow during low volatility. This allows it to filter some noise when volatility is high, and capture smaller breakouts when volatility is low.

It implements pair trading between two positively correlated assets MCL and YG. When MCL breaks above the upper band, it shows MCL is in an uptrend. The strategy goes long MCL and short YG - buying the stronger asset and selling the weaker one, to benefit from the divergence in their prices.

### Advantages

1. Breakout trading based on Bollinger Bands can effectively filter market noise and identify trends
2. Pair trading on correlated assets can gain alpha returns from price divergence 
3. Dynamic position sizing helps control risk for individual trades
4. Standard breakout entry and reversion exit logic makes the strategy logic simple and clear

### Risks

1. Poor Bollinger Bands parameter tuning may lead to too many signals or unclear signals
2. Declining correlation between the assets can reduce profits from the pair trading
3. Breakouts may be fooled by false signals in choppy markets, causing losses
4. No stop loss may lead to enlarged losses for single trades

Risks can be reduced by optimizing parameters, selecting assets with stronger correlation and liquidity, setting proper stop loss etc.

### Optimization Opportunities 

1. Optimize Bollinger Bands parameters to find best combination
2. Test more correlated asset pairs and select the best combination 
3. Add stop loss logic to limit losses for single trades
4. Add more filters to avoid false breakout signals
5. Incorporate other factors like volume confirmation to improve entry timing

### Summary

Overall the strategy is simple and straightforward, capturing trends with Bollinger Bands and gaining alpha from pair trading. But there is room for improvement in parameters tuning, stop loss, and pair selection. Further testing of parameters, trading vehicles, trend filters etc. can improve the strategy performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|SMA Length|
|v_input_int_2|20|StdDev Length|
|v_input_float_1|true|Upper Band Offset|
|v_input_float_2|true|Lower Band Offset|
|v_input_bool_1|true|Use Position Sizing?|
|v_input_float_3|0.5|Risk %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-07 00:00:00
end: 2023-11-13 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © shark792

//@version=5

// 1. Define strategy settings
strategy(title="MCL-YG Pair Trading Strategy", overlay=true,
     pyramiding=0, initial_capital=10000,
     commission_type=strategy.commission.cash_per_order,
     commission_value=4, slippage=2)

smaLength = input.int(title="SMA Length", defval=20)
stdLength = input.int(title="StdDev Length", defval=20)

ubOffset = input.float(title="Upper Band Offset", defval=1, step=0.5)
lbOffset = input.float(title="Lower Band Offset", defval=1, step=0.5)

usePosSize = input.bool(title="Use Position Sizing?", defval=true)
riskPerc   = input.float(title="Risk %", defval=0.5, step=0.25)


// 2. Calculate strategy values
smaValue = ta.sma(close, smaLength)
stdDev   = ta.stdev(close, stdLength)

upperBand = smaValue + (stdDev * ubOffset)
lowerBand = smaValue - (stdDev * lbOffset)

riskEquity  = (riskPerc / 100) * strategy.equity
atrCurrency = (ta.atr(20) * syminfo.pointvalue)
posSize     = usePosSize ? math.floor(riskEquity / atrCurrency) : 1


// 3. Output strategy data
plot(series=smaValue, title="SMA", color=color.teal)

plot(series=upperBand, title="UB", color=color.green,
     linewidth=2)
plot(series=lowerBand, title="LB", color=color.red,
     linewidth=2)


// 4. Determine long trading conditions
enterLong = ta.crossover(close, upperBand)
exitLong  = ta.crossunder(close, smaValue)


// 5. Code short trading conditions
enterShort = ta.crossunder(close, lowerBand)
exitShort  = ta.crossover(close, smaValue)


// 6. Submit entry orders
if enterLong
    strategy.entry(id="EL", direction=strategy.long, qty=posSize)

if enterShort
    strategy.entry(id="ES", direction=strategy.short, qty=posSize)


// 7. Submit exit orders
strategy.close(id="EL", when=exitLong)
strategy.close(id="ES", when=exitShort)


```

> Detail

https://www.fmz.com/strategy/432093

> Last Modified

2023-11-14 13:49:12
