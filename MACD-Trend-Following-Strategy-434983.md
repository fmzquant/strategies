
> Name

MACD-Trend-Following-Strategy-434983

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/830b1dca0535cb6a50.png)


## Overview

The MACD Trend Following Strategy is a quantitative trading strategy based on the MACD indicator. This strategy identifies MACD golden cross and death cross signals to determine market trends and track price trends.  

## Strategy Logic

The core logic of the MACD Trend Following Strategy is:

1. Calculate the MACD line and signal line.  
2. When the MACD line crosses above 0 from bottom up, record the highest point then, and wait for death cross signal.
3. When the MACD line crosses below 0 from top down, record the lowest point then, and wait for golden cross signal.
4. When golden cross happens, record the current closing price as long entry point, set stop loss point, open long position.
5. When death cross happens, record the current closing price as short entry point, set stop loss point, open short position.
6. When holding long position, if profit ratio reaches preset target or drawdown reaches stop loss point, close position to realize profit.
7. When holding short position, if profit ratio reaches preset target or drawdown reaches stop loss point, close position to realize profit.

Through this trend following mechanism, the strategy can timely capture turns of market trends and make profits.

## Advantage Analysis 

The MACD Trend Following Strategy has the following advantages:

1. The source of strategy signals is singular and clear, generated directly by the MACD indicator, avoiding interference of signals.
2. Utilize the golden cross and death cross characteristics of the MACD indicator to determine market trend directions, with accurate judgements.  
3. Timely tracking turns of trends, with strong profit tracking capability. 
4. Proper risk control in place, with stop loss mechanism.

## Risk Analysis

The MACD Trend Following Strategy also has the following risks:

1. MACD indicator tends to generate false signals, which may lead to loss in ultra short-term operations.
2. Improper stop loss point settings may expand single loss.
3. Difficult to balance between profit tracking ratio and stop loss point, with risk of over tracking leading to loss.

To address the above risks, the following optimization measures can be adopted:

1. Combine with other indicators to filter out false signals.  
2. Dynamically adjust stop loss points.
3. Optimize parameters of profit tracking ratio and stop loss points.

## Optimization Directions

The MACD Trend Following Strategy can be optimized in the following aspects:

1. Optimize MACD indicator parameters to reduce false signal rate. Different cycle parameters of MACD can be tested.

2. Add other indicators like trading volume to filter out signals. Minimum trading volume conditions can be set.

3. Set up dynamic trailing stop loss mechanism. Stop loss points can be adjusted dynamically based on volatility. 

4. Optimize the signal determination logic for opening positions. More rigorous trigger conditions can be set.

5. Incorporate machine learning models to filter out signals. Models can be trained to judge reliability of signals.

## Conclusion

In general, the MACD Trend Following Strategy is a relatively mature quantitative strategy. It utilizes the MACD indicator to determine market trend directions, and controls risks with stop loss mechanism, which can effectively track price trends. But the MACD indicator itself also has some flaws, easy to generate false signals. So there are rooms for further optimization of this strategy, mainly on aspects like indicator parameters, stop loss mechanism, signal filtering etc.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-10 00:00:00
end: 2023-12-10 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("MACD Cross Strategy", overlay=true)

// Get MACD values
[macdLine, signalLine, _] = ta.macd(close, 12, 26, 9)
var float entryLongPrice = na
var float entryShortPrice = na

var float highestLongProfit = 0
var float highestShortProfit = 0

var float highestMACD = 0
var float lowestMACD = 0
var bool haveOpenedLong = false
var bool haveOpenedShort = false

var float stoploss = 0.04 // To be adjust for different investment
var float minProfit = 0.05 // To be adjust for different investment

if macdLine > 0
    lowestMACD := 0
    highestMACD := math.max(highestMACD, macdLine)
    haveOpenedShort := false
else
    highestMACD := 0
    lowestMACD := math.min(lowestMACD, macdLine)
    haveOpenedLong := false

// Enter long position when MACD line crosses above the signal line
if ta.crossover(macdLine, signalLine) and macdLine < highestMACD and macdLine > 0 and haveOpenedLong == false
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit Long", from_entry = "Long", stop=close*(1 - stoploss))
    entryLongPrice := close
    haveOpenedLong := true

if ta.crossunder(macdLine, signalLine) and macdLine > lowestMACD and macdLine < 0 and haveOpenedShort == false
    strategy.entry("Short", strategy.short)
    strategy.exit("Exit Short", from_entry = "Short", stop=close*(1 + stoploss))
    entryShortPrice := close
    haveOpenedShort := true

// log.info("entryLongPrice:{0}", entryLongPrice)
if strategy.position_size > 0
    profit = close - entryLongPrice
    log.info("profit:{0}", profit)
    if profit > 0
        highestLongProfit := math.max(highestLongProfit, profit)
        if profit / entryLongPrice > minProfit and highestLongProfit * 0.8 > profit
            strategy.close("Long")
            highestLongProfit := 0

if strategy.position_size < 0
    profit = entryShortPrice - close
    if profit > 0
        highestShortProfit := math.max(highestShortProfit, profit)
        log.info("highestShortProfit={0}, profit={1}", highestShortProfit, profit)
        if profit / entryShortPrice > minProfit and highestShortProfit * 0.8 > profit
            strategy.close("Short")
            highestShortProfit := 0
```

> Detail

https://www.fmz.com/strategy/434983

> Last Modified

2023-12-11 14:57:00
