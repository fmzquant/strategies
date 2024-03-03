
> Name

基于ATR的ES尾随停止策略ATR-based-Trailing-Stop-Strategy-for-ES

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16887f43aaf994086b9.png)
[trans]

## 概述

本策略是一个应用于E-mini S&P500期货(ES)的尾随停止策略。它使用10日ATR作为参考,以3倍ATR作为止损范围来设置多头和空头的止损线。策略通过ATR线的方向变化来判断趋势,并在趋势转折点generate入场信号。一旦入场后,它会实时调整止损线,让止损线尾随价格运行,实现盈利的保护。

## 策略原理

本策略使用hl2作为价格源。首先计算10日ATR,并让用户选择是使用SMA方式计算ATR还是内置的ATR函数。计算出ATR后,向上向下各添加3倍ATR作为范围。这两个范围线就是止损线。

判断趋势的方法是,当价格超过上边界,则为多头;当价格跌破下边界,则为空头。当价格重新回调进入范围时,则确认趋势转折。这时如果由空转多,generate多头入场信号;如果由多转空,generate空头入场信号。

入场后,多头止损线设置为上边界下移1点,空头止损线设置为下边界上移1点,进行盈利的尾随保护。

## 策略优势

1. 使用ATR能够自动适应市场波动率的变化,降低止损被触发的概率
2. 追踪趋势的方法简单有效,避免追顶和追底的风险
3. 尾随止损保证了盈利的保护,避免获利后再次亏损

## 风险分析

1. ATR参数设定不当可能导致止损范围过大或过小
2. 标的波动性陡变时,可能出现异常止损
3. TAILING止损可能过于保守,未能持续追踪趋势

## 优化方向

1. 可以考虑结合波动率指标对ATR参数进行优化
2. 可以测试不同的TAILING止损算法,如余额百分比止损等
3. 可以结合趋势指标过滤入场信号,避免非主趋势入场

## 总结

本策略整体来说是一种较为普适的趋势跟踪策略。它解决了止损范围确定难的问题,通过ATR动态调整降低了风险。同时尾随止损进行盈利保护。但ATR参数、止损算法等仍有优化空间。通过进一步测试和调整参数,本策略可以成为鲁棒性较高的跟踪止损策略。

||


## Overview

This strategy is a trailing stop strategy applied to the E-mini S&P500 futures (ES). It uses 10-day ATR as a reference and sets the stop loss range to 3 times ATR to define long and short stop lines. The strategy judges the trend by the direction change of the ATR lines and generates entry signals at turning points of the trend. Once entered, it will adjust the stop loss lines in real time to trail the price movement, protecting profits.

## Strategy Logic  

The strategy uses hl2 as the price source. First it calculates the 10-day ATR, and lets the user choose between using SMA method or built-in ATR function to calculate ATR. After obtaining ATR, it adds 3 times ATR up and down to form the range. The two range lines are the stop loss lines.

The method to judge the trend is when the price exceeds the upper boundary, it is long; when the price breaks the lower boundary, it is short. When the price retraces back into the range, it confirms the trend reversal. At this time, if turned from short to long, it will generate a long entry signal; if turned from long to short, it will generate a short entry signal.

After entering, the long stop loss line is set to the upper boundary minus 1 tick, and the short stop loss line is set to the lower boundary plus 1 tick, trailing to protect profits.

## Advantages

1. Using ATR can automatically adapt to changes in market volatility and reduce the probability of stop loss being triggered. 
2. The trend tracking method is simple and effective to avoid risks of chasing tops and bottoms.
3. Trailing stops lock in profits and avoid giving back profitable trades.

## Risk Analysis  

1. Improper ATR parameter setting may cause the stop loss range to be too large or too small.
2. Drastic changes in the volatility of the underlying may cause abnormal stop loss triggering.  
3. TRAILING stops may be too conservative to keep tracking the trend.

## Optimization Directions

1. Consider optimizing ATR parameters combined with volatility metrics.  
2. Test different trailing stop algorithms like percentage trailing stops etc.
3. Filter entry signals combined with trend indicators to avoid false trend signals.

## Conclusion

In general, this is a robust trend following strategy. It solves the problem of determining stop loss range and reduces risks by adjusting stops dynamically based on ATR. At the same time, trailing stops lock in profits. But there is still room for optimizing parameters like ATR periods, stop algorithms etc. With further testing and tuning, this strategy can become a trend following strategy with high robustness.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ATR Period|
|v_input_2_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_3|3|ATR Multiplier|
|v_input_4|true|Change ATR Calculation Method ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-05 00:00:00
end: 2024-01-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("ATR Based Trailing Stop Strategy on ES! [v4]", overlay=true)

// Given ATR study
Periods = input(title="ATR Period", type=input.integer, defval=10)
src = input(hl2, title="Source")
Multiplier = input(title="ATR Multiplier", type=input.float, step=0.1, defval=3.0)
changeATR = input(title="Change ATR Calculation Method ?", type=input.bool, defval=true)
atr2 = sma(tr, Periods)
atr = changeATR ? atr(Periods) : atr2
up = src - (Multiplier * atr)
up1 = nz(up[1], up)
up := close[1] > up1 ? max(up, up1) : up
dn = src + (Multiplier * atr)
dn1 = nz(dn[1], dn)
dn := close[1] < dn1 ? min(dn, dn1) : dn
trend = 1
trend := nz(trend[1], trend)
trend := trend == -1 and close > dn1 ? 1 : trend == 1 and close < up1 ? -1 : trend

// Entry logic based on trend change
longCondition = trend == 1 and trend[1] == -1
shortCondition = trend == -1 and trend[1] == 1

if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

// Trailing stop loss logic
// For long positions, trail 1 point below the up plot
longStopPrice = up - 1

// For short positions, trail 1 point above the dn plot
shortStopPrice = dn + 1

strategy.exit("Trailing Stop Long", "Long", trail_offset=longStopPrice)
strategy.exit("Trailing Stop Short", "Short", trail_offset=shortStopPrice)

```

> Detail

https://www.fmz.com/strategy/438505

> Last Modified

2024-01-12 14:52:23
