
> Name

里向破坏策略Inside-Bar-Failure-Strategy

> Author

ChaoZhang

> Strategy Description




## Strategy Logic

This strategy trades based on inside bar breakdowns. If the high/low of the bar following an inside bar penetrates the prior inside bar's range, trade signals are generated. 

The logic is:

1. Check if the prior 2 bars formed an inside bar i.e. bar 2's high/low within bar 1's range

2. If bar 3 high exceeds bar 2 high, and closes above bar 2 low, go long

3. If bar 3 low breaks bar 2 low, and closes below bar 2 high, go short 

4. Optionally close orders X bars later (e.g. 3 bars)

It aims to capture trends emerging from inside bar consolidations. Inside bars represent short-term balances, and breakdowns can kickstart new trends.

## Advantages

- Inside bars easy to identify, breakdowns give clear signals

- Closing orders early avoids whipsaws

- Simple and intuitive rules

## Risks

- Need to further validate signal effectiveness 

- Inside bar formation and breakdowns less common

- Could trade against major trend

## Summary

This strategy attempts to capitalize on trends from inside bar breakdowns. But the lower frequency of trading needs evaluation of risk-reward. Combining with other factors could improve performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Look Forward|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-07 00:00:00
end: 2022-10-31 00:00:00
period: 4d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Inside Bar Failure", overlay=true)

forward = input(defval=3, title="Look Forward")

longCondition = if (high[2] > high[1] and low[2] < low[1] and low < low[1] and high < high[1] and close > low[1])
    x = true
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = if (high[2] > high[1] and low[2] < low[1] and high > high[1] and low > low[1] and close < high[1])
    y = true
if (shortCondition)
    strategy.entry("Short", strategy.short)
    
if (longCondition[forward])
    strategy.close("Long")
if (shortCondition[forward])
    strategy.close("Short")
```

> Detail

https://www.fmz.com/strategy/426807

> Last Modified

2023-09-14 16:43:52
