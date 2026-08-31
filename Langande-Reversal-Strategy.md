
> Name

Langande-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

## Overview

The Langande reversal strategy uses the Langande indicator to identify potential turning points in price and combines it with closing price to determine trend reversal, in order to buy and sell at trend reversal points.

## Principle 

The strategy uses the two functions pivothigh and pivotlow in the Langande indicator to identify high and low points. 

The pivothigh function is used to find the maximum value of the highest prices over the past n bars, i.e. the potential resistance. The pivotlow function is used to find the minimum value of the lowest prices over the past n bars, i.e. the potential support.

Then, through the condition judgement of high and low points, it identifies the bars when new highs or lows are made, indicating potential trend reversal points. It buys on the new high points and sells on the new low points.

## Advantages

- Using the Langande indicator to identify key points can improve the reliability of trading signals.

- Judging based on actual closing prices avoids being misled by intermediate false breakouts. 

- The strategy logic is clear and easy to implement.

## Risks

- Improper parameter settings may lead to frequent trading, increasing transaction costs and slippage loss.

- There could be multiple false breakouts in the short term, causing unnecessary trading losses.

- Deep pullbacks may occur in long term trends, causing the strategy to generate incorrect signals.

## Optimization Directions 

- Consider adding other filters like moving averages to improve signal accuracy.

- Optimize the value of n to balance trading frequency and signal quality.

- Add stop loss logic to control maximum loss per trade.

## Summary

The Langande reversal strategy is relatively simple and direct. Due to its sole reliance on the Langande indicator, some false signals may occur. Risks can be reduced and stability improved by adding auxiliary indicators, optimizing parameters, and setting stops. The strategy is suitable for counter-trend trading and markets where the trend is relatively clear.
> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4|leftBars|
|v_input_2|2|rightBars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-17 00:00:00
end: 2023-09-16 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("lokendra Reversal Strategy", overlay=true)

leftBars = input(4)
rightBars = input(2)

swh = pivothigh(leftBars, rightBars)
swl = pivotlow(leftBars, rightBars)

swh_cond = not na(swh)

hprice = 0.0
hprice := swh_cond ? swh : hprice[1]

le = false
le := swh_cond ? true : (le[1] and high > hprice ? false : le[1])

if (le)
    strategy.entry("PivRevLE", strategy.long, comment="BUY**", stop=hprice + syminfo.mintick)

swl_cond = not na(swl)

lprice = 0.0
lprice := swl_cond ? swl : lprice[1]


se = false
se := swl_cond ? true : (se[1] and low < lprice ? false : se[1])

if (se)
    strategy.entry("PivRevSE", strategy.short, comment="SELL**", stop=lprice - syminfo.mintick)

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/427062

> Last Modified

2023-09-17 18:10:02
