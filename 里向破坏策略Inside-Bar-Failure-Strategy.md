
> Name

里向破坏策略Inside-Bar-Failure-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

## 策略原理

该策略基于里向K线的破坏来进行交易。当出现里向K线后,如果下一根K线的高点低点突破里向K线的高低点,则产生交易信号。

具体交易逻辑是:

1. 判断前两根K线是否构成里向,即第2根K线的高点低点都在第1根K线内

2. 如果第3根K线的最高点超过了第2根K线,并收盘价高于第2根K线最低点,则产生做多信号

3. 如果第3根K线的最低点低于了第2根K线,并收盘价低于第2根K线最高点,则产生做空信号

4. 可提前一定根K线(如3根)进行平仓

该策略试图捕捉里向破坏后的趋势运行。里向代表短期盘整,破坏则可能开始新一波趋势。

## 策略优势

- 里向易辨认,破坏信号明确

- 可提前一定周期平仓,避免反转

- 规则简单直观,容易实现

## 策略风险

- 需进一步验证破坏的有效性

- 里向构成和破坏都较少见

- 可能随大趋势产生次优方向交易

## 总结

该策略尝试捕捉里向破坏带来的趋势机会。但交易频率较低,需评估风险收益比。可考虑与其他因素结合使用,优化交易效果。


||


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

[/trans]

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
