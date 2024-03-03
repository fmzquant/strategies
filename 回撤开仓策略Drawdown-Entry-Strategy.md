
> Name

回撤开仓策略Drawdown-Entry-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本文将介绍一种基于回撤判断的开仓策略。该策略通过监控账户回撤情况,在回撤达到设定值时选择性开仓做多,以在市场反弹时获得较好收益。

## 策略原理

该策略基于以下几点逻辑:

1. 计算账户当前回撤幅度,并绘制于图表中。

2. 当回撤达到设定阈值(如5%)时,判断行情可能超卖,做多开仓。

3. 若次日收盘价较前一日收高,则平仓套现,回撤交易完成。

4. 若无回撤或未达阈值,则不进行交易。

5. 回撤交易后,账户将重新计算并等待下次条件达成。

## 优势分析

该策略具有以下优势:

1. 回撤开仓可在市场反弹时获得较好收益。

2. 设定回撤阈值后可进行自动化交易。

3. 回撤时开仓量可设定较大,可获较大收益。

4. 策略逻辑简单清晰,易于操作。

5. 可根据市场调整回撤阈值。

## 风险分析

该策略也存在一些风险:

1. 回撤判断不准确可能导致开仓失败。

2. 回撤后行情再次下跌可能扩大损失。

3. 应适当调整仓位和止损点。

4. 需要关注交易频次,避免过度交易。

5. 回撤阈值设定应考量账户承受能力。

## 总结

该策略试图捕捉回撤后的反弹行情。但交易者仍需审时度势,谨慎评估回撤交易时机,并控制好风险。

||


## Overview

This article introduces an entry strategy based on drawdowns. It monitors account drawdowns and selectively goes long when drawdown reaches a threshold, aiming to profit from market bounces.

## Strategy Logic 

The logic is:

1. Calculate current account drawdown percentage and plot it.

2. When drawdown reaches a threshold (e.g. 5%), market may be oversold so go long. 

3. If next day's close is higher than previous day's, close long for profit.

4. If no drawdown or threshold not reached, no trades are placed.

5. After drawdown trade, account is reset to recalculate for next signal.

## Advantage Analysis

Advantages of the strategy:

1. Drawdown longs can profit from market bounces.

2. Auto trading after reaching drawdown threshold. 

3. Larger size possible for higher returns during drawdown.

4. Simple and clear logic for easy implementation. 

5. Threshold can be adjusted based on market conditions.

## Risk Analysis

There are also some risks:

1. Inaccurate drawdown signal may cause failed trades.

2. Market could drop further after drawdown longs.

3. Position sizing and stops should be set appropriately. 

4. Avoid overtrading from excessive signals.

5. Drawdown threshold should consider account risk tolerance.

## Conclusion

This strategy tries to capture bounces after drawdowns. But traders should evaluate timing carefully and manage risks when trading drawdowns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|-5|Drawdown, %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-16 00:00:00
end: 2023-09-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2019

//@version=3
strategy(title = "Noro's DD Strategy", shorttitle = "DD str", overlay = false, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)
signal = input(-5.0, title = "Drawdown, %")
bull = close > close[1] ? 1 : 0
bear = close < close[1] ? 1 : 0
lastbull = 0.0
lastbull := bull ? close : lastbull[1]
dd = ((close / lastbull) - 1) * 100
plot(dd, color = black, transp = 20)
bottom = dd < signal
col = bottom ? lime : na
bgcolor(col, transp = 20)

if bottom
    strategy.entry("Long", strategy.long)
if strategy.position_size > 0 and close > open
    strategy.entry("Close", strategy.short, 0)
```

> Detail

https://www.fmz.com/strategy/427001

> Last Modified

2023-09-16 19:18:38
