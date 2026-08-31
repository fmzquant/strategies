
> Name

动量平均倒数救济拉回策略Momentum-Average-Inverse-Relief-Pullback-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/df7cc5ab67264e2e3b.png)

## Overview

The Momentum Average Inverse Relief Pullback Strategy is a simple strategy to trade reversal around moving average lines. It uses 50-period Exponential Moving Average (EMA) as the main trend indicator, combined with candlestick engulfing patterns to identify reversal opportunities. After a penetration through the EMA, it waits for 2-3 candles in the opposite direction to form. If the next candle shows an engulfing reversal pattern, a reverse position will be taken at the candle close, with a 1-minute stop loss timer.  

## Principles  

The key assumptions of this strategy are:  

1. The 50-period EMA is effective in determining market trend. A close above it signals bull trend while a close below it signals bear trend.   

2. After a trend penetration through the EMA, there are often short-term pullbacks. By identifying the end of pullbacks using reversal candlestick patterns, profitable reverse trades can be executed.

Specifically, the strategy first calculates the 50-period EMA, then checks if price breaks through it. If a bull breakout happens, it waits for 2-3 red candles downwards. If the next candle shows a bullish engulfing pattern, long position will be taken on close. Similarly for bear breakouts. After taking positions, a 1-minute stop loss timer is started. Positions will be closed on timer expiration. 

## Advantages

The main advantages of this strategy:

1. The logic is simple and clear, easy to understand and implement, suitable for beginners.  

2. It utilizes both the trending effectiveness of moving averages and the predictive power of candlestick patterns, making the signals more reliable.  

3. The stop loss timer controls single trade risk.  

4. The systematic rules avoid subjective judgements and improve consistency.

## Risks 

Some main risks are:  

1. The 50-period EMA cannot fully capture trends accurately all the time. There can be misjudgements of trend.

2. Candlestick patterns also have probabilistic nature which leads to false signals.

3. Ineffective stop loss timer settings may lead to larger losses or profit giving up. 

4. Slippage, partial fills etc. impacts strategy performance.

Some mitigations:  

1. Optimize EMA period parameter to find the best fit.

2. Incorporate other indicators for strengthening signals.   

3. Test and find optimal risk parameters.  

4. Implement stop loss mechanisms against slippage in live trading.

## Enhancement Opportunities

Some ways to enhance the strategy:

1. Optimize EMA parameter to find best periods.  

2. Test other EMA variants e.g. weighted moving average.   

3. Add filters on volume or volatility to remove false signals during sideways periods.   

4. Create combination strategies with other indicators e.g. Stochastics, MACD to improve signal quality.

5. Fine tune the stop loss timer duration based on product specification and trading sessions.  

6. Consider adding profit taking mechanisms to lock gains after reaching profit targets.  

## Conclusion

The Momentum Average Inverse Relief Pullback Strategy is a simple and practical short term trading strategy. It uses EMA crossovers to determine trends and candlestick patterns to identify reversals for executing tactical trades. Despite some parameter optimization space, its clarity in logic makes it a good starting point strategy for novice quants. With proper testing and refinements, it can evolve into a robust tactical system.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|EMA Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-11 00:00:00
end: 2024-02-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("LinoR EMA Pullback Strategy", shorttitle="EPS", overlay=true)

// Define EMA period
emaPeriod = input(50, title="EMA Period")

// Calculate 50 EMA
ema50 = ta.ema(close, emaPeriod)

// Calculate engulfing conditions
engulfingBullish = close[1] < open[1] and close > open and close > close[1] and open < open[1]
engulfingBearish = close[1] > open[1] and open > close and open > open[1] and close < close[1]

// Define a 1-minute timer
var timer = 0
if bar_index > 0
    timer := timer[1] + 1

// Long condition
longCondition = ta.crossover(close, ema50) and engulfingBullish
if longCondition
    strategy.entry("Buy", strategy.long)

// Short condition
shortCondition = ta.crossunder(close, ema50) and engulfingBearish
if shortCondition
    strategy.entry("Sell", strategy.short)

// Exit after 1 minute
if timer >= 1
    strategy.close("Exit")

plotshape(series=longCondition, title="Long Signal", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)
plotshape(series=shortCondition, title="Short Signal", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small)

```

> Detail

https://www.fmz.com/strategy/441965

> Last Modified

2024-02-18 10:21:04
