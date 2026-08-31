
> Name

Momentum-Breakout-Moving-Average-Trading-Strategy-434187

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1300f35054c557636f9.png)


## Overview

This strategy integrates Relative Strength Index (RSI), SuperTrend indicator and Average True Range (ATR) to construct a comprehensive and practical quantitative trading strategy.  

## Strategy Logic  

### Relative Strength Index (RSI)

RSI is a powerful oscillating indicator that judges if the market is overbought or oversold by measuring the velocity and magnitude of price movements. RSI below oversold region indicates oversold signal, while RSI above overbought region is overbought signal.

### SuperTrend Indicator   

SuperTrend is a trend following indicator that helps identify current trend direction. Price above SuperTrend line indicates an uptrend while price below SuperTrend line an downtrend.  

### Average True Range (ATR)  

ATR measures the degree of market volatility and risk level. Higher ATR represents higher market volatility while lower means relatively calm. This strategy leverages ATR to set stop loss and profit target.

## Strategy Execution Logic  

**Long Signal:** When fast RSI crosses below slow RSI while price is above SuperTrend line to go long.  

**Short Signal:** When fast RSI crosses above slow RSI while price is below SuperTrend line to go short.   

**Exit Rule:** If holding long position, exit when fast RSI crosses above slow RSI OR price falls below SuperTrend line. If holding short position, exit when fast RSI crosses below slow RSI OR price rises above SuperTrend line.

## Advantages  

1. Trend Following: SuperTrend identifies trend clearly. 

2. Momentum Confirmation: RSI ensures trades align with market sentiment.   

3. Volatility Adaptive: ATR-driven stop loss adapts to varying market conditions.  

## Risks & Solutions   

1. Trend Misalignment Risk: Probability of conflicts between SuperTrend and actual trend direction resulting losses. Parameter optimization helps to improve accuracy.  

2. Premature Stop Loss Risk: Stop loss too close may get hit unintentionally. Reasonable stop distance should be set.  

3. Parameter Risk: Improper RSI parameters setting affects timing of entries and exits. Careful backtests required to determine proper parameters.  

## Enhancement Recommendations    

1. Add other technical indicators to filter signals improving system stability.  

2. Optimize RSI parameters based on maximum drawdown constraints.  

3. Leverage heuristic algorithms to search optimal SuperTrend parameters.  

## Conclusion  

This strategy integrates trend, momentum and volatility indicators constructing a quantitative model with clear signals, flexible parameter tuning, and sound risk control. With continuous testing and enhancement, it is promising to achieve steady above-average returns over the long run.  


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|RSI Length 1|
|v_input_2|21|RSI Length 2|
|v_input_3|1.5|SuperTrend Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-27 00:00:00
end: 2023-12-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("RSI, SuperTrend, and ATR Strategy", overlay=true)

// Define input parameters
rsiLength1 = input(14, title="RSI Length 1")
rsiLength2 = input(21, title="RSI Length 2")
supertrendMultiplier = input(1.5, title="SuperTrend Multiplier")

// Calculate indicators
rsi1 = ta.rsi(close, rsiLength1)
rsi2 = ta.rsi(close, rsiLength2)
supertrend = ta.atr(14) * supertrendMultiplier

// Define trading conditions
rsiLongCondition = rsi1 > rsi2
rsiShortCondition = rsi1 < rsi2
supertrendLongCondition = close > supertrend
supertrendShortCondition = close < supertrend

// Execute trades
if (rsiLongCondition and supertrendLongCondition)
    strategy.entry("Long", strategy.long)

if (rsiShortCondition and supertrendShortCondition)
    strategy.entry("Short", strategy.short)

if (strategy.position_size > 0 and (rsiShortCondition or supertrendShortCondition))
    strategy.close("Long")

if (strategy.position_size < 0 and (rsiLongCondition or supertrendLongCondition))
    strategy.close("Short")

// Plot indicators on the chart
plot(rsi1, color=color.orange, title="RSI 1")
plot(rsi2, color=color.yellow, title="RSI 2")
plot(supertrend, color=color.blue, title="SuperTrend")

```

> Detail

https://www.fmz.com/strategy/434187

> Last Modified

2023-12-04 15:57:06
