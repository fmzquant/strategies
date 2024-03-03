
> Name

朗格安德逆转策略Langande-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]
## 概述

朗格安德逆转策略利用朗格安德指标识别价格潜在的转折点,结合收盘价判断趋势反转,以在趋势反转点进行买入和卖出操作。

## 原理

该策略使用朗格安德指标中的两个函数pivothigh和pivotlow来识别高点和低点。

pivothigh函数用于找出过去n根K线的最高价的最大值,即潜在的阻力;pivotlow函数用于找出过去n根K线的最低价的最小值,即潜在的支撑。

之后,通过高点和低点的条件判断,识别出价格创出新高或新低的K线,表示潜在的趋势反转点。在新高点时进行买入操作,在新低点时进行卖出操作。

## 优势

- 利用朗格安德指标识别关键点位,可以提高交易信号的可靠性。

- 结合实际收盘价进行判断,避免被中间的假突破误导。

- 策略逻辑清晰易懂,容易实施。

## 风险

- 如果参数设置不当,可能导致交易频繁,增加交易成本和滑点 loss。

- 短期内可能出现多次虚假突破,造成不必要的交易亏损。

- 长期趋势中可能出现较深的回调,使策略产生错误信号。

## 优化方向

- 可以考虑添加其他指标过滤,例如移动平均线,提高信号的准确性。

- 可以优化参数n的值,以平衡交易频率和信号质量。

- 可以添加止损逻辑,控制单笔交易的最大损失。

## 总结

朗格安德逆转策略整体来说较简单直接,由于仅利用朗格安德指标,可能会出现一定的假信号。可以通过添加辅助指标、优化参数以及设置止损来减少风险和提高策略稳定性。该策略适用于逆势交易,以及趋势较为明确的市场环境。

 ||


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

[/trans]

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
