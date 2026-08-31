
> Name

Supertrend-BarUpDn-Fusion-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14eb20869c1bc5ec474.png)

## Overview

The Supertrend BarUpDn Fusion strategy is a strategy that fuses the Supertrend indicator and the BarUpDn indicator. The strategy will go long if either the Supertrend or BarUpDn indicator gives a long signal, and will go short if either indicator gives a short signal.

## Strategy Principle  

The strategy mainly utilizes two indicators:

1. Supertrend Indicator: This indicator determines the trend direction based on Average True Range and a factor. It gives long signals when price is in an uptrend channel and short signals when price is in a downtrend channel.  

2. BarUpDn Indicator: This indicator judges if the current bar is a bullish bar (close higher than open) or bearish bar (open higher than close). It returns 1 for bullish bars and -1 for bearish bars.

The main logic of the strategy is:

1. Go long when Supertrend is long and BarUpDn is bullish.  

2. Go short when Supertrend is short and BarUpDn is bearish.

3. Close positions timely when Supertrend changes direction.

Through this fusion, the strategy can utilize both the trend judging capability of Supertrend and the short-term judging capability of BarUpDn to achieve better entry timing.

## Advantage Analysis   

The main advantages of this strategy are:

1. Improved accuracy by fusing multiple indicators. Utilizing both the trend judging of Supertrend and the short-term judging of BarUpDn can improve entry timing accuracy.  

2. Timely stop loss. Quickly cutting losses when the main indicator Supertrend changes direction can avoid enlarging losses.

3. Simple and easy to use. The strategy only uses a combination of two common indicators, making it very simple and easy to use.  

4. Strong adaptability. Supertrend itself has adjustable parameters to adapt to different products and timeframes.

## Risk Analysis   

There are also some risks with this strategy:  

1. Incorrect judging from improper fusion may cause misjudging. Timely stop loss when indicators give inconsistent signals.

2. Improper parameter tuning affects performance. Supertrend's ATR Length and Factor need to be adjusted for different products.  

3. Short-term reversals may cause minor losses. Small losses may occur during short-term price reversals before Supertrend turns direction.

## Optimization Directions  

The strategy can be optimized from the following aspects:

1. Add stop loss strategies like moving stop loss, time stop loss, breakout stop loss etc. to further control risks.

2. Optimize parameters of Supertrend to find the best parameter combinations for different products and timeframes, e.g. via machine learning.  

3. Add more indicator fusion to build a voting mechanism and improve judging stability.  

4. Incorporate more market factors like volume change, spread change etc. to judge signal reliability and filter misleading signals.

## Summary   

The Supertrend BarUpDn Fusion Strategy fuses trend judging and short-term judging by combining simple indicators, improving entry timing accuracy while keeping simplicity and ease of use. The strategy can be further enhanced by parameter optimization, stop loss optimization, indicator voting etc.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ATR Length|
|v_input_2|3|Factor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Supertrend and BarUpDn Indicator Fusion", overlay=true)

// Supertrend indicator
atrLength = input(10, title="ATR Length")
factor = input(3.0, title="Factor")
[supertrend, direction] = ta.supertrend(factor, atrLength)
lastBar = 0

// BarUpDn indicator
barUpDn = close > open and open > close[1] ? 1 : close < open and open < close[1] ? -1 : 0

if (barUpDn == 1)
    lastBar := 1
else if barUpDn == -1
    lastBar := -1


// Determine long or short position
longCondition = (direction > 0 and barUpDn > 0) or (direction > 0 and lastBar == 1)
shortCondition = (direction < 0 and barUpDn < 0) or (direction < 0 and lastBar == -1)

// Enter long or short position
if (longCondition)
    strategy.entry("Long", strategy.long)
    lastBar := 1
else if (shortCondition)
    strategy.entry("Short", strategy.short)
    lastBar := -1

if (direction < 0 and barUpDn > 0)
    strategy.entry("Long", strategy.long)

// Exit long or short position
if (direction > 0 and barUpDn < 0)
    strategy.entry("Short", strategy.short)

// Exit long or short position
// if (direction < 0 and barUpDn > 0 or direction > 0 and barUpDn < 0)
//   strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/440537

> Last Modified

2024-01-31 14:43:06
