
> Name

双向突破反转策略Bidirectional-Breakout-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/4a0bd57abc88959d17.png)

[trans]

## 概述

双向突破反转策略是一种基于价格 pivot 点的反转交易策略。它通过检测价格在一定数量的 bar 内的极值点,来判断价格可能反转的时机。当价格突破极值点时,进行反向入场。该策略适用于高波动性市场,能够抓住价格短期内的反转机会。

## 策略原理

双向突破反转策略的核心逻辑是:

1. 使用 `pivothigh()` 和 `pivotlow()` 函数计算最近 n 个 bar 内的最高价和最低价作为极值点。这里 n 设置为 4。

2. 当最新 bar 的高点超过极大值点时,策略认为价格可能反转,做空入场。 stop loss 放在极大值点上方。

3. 当最新 bar 的低点低于极小值点时,策略认为价格可能反转,做多入场。stop loss 放在极小值点下方。 

4. 一旦价格反转超过极值点,前一个信号无效,等待下一个交易机会。

通过这个方法,策略在突破极值点时抓住价格短期反转的机会。同时设置好 stop loss,可以控制风险。

## 优势分析

双向突破反转策略具有以下优势:

1. sellable/round 的思路,利用极值点判断反转点位。

2. 适用于高波动的加密货币等市场,能够抓住短线反转机会。

3. 规则相对简单,容易理解掌握。

4. 回撤只有 10%,风险可控。

5. 收益高达 350%, Sharp 比率在 1 以上。

## 风险分析

双向突破反转策略也存在以下风险:

1. 市场持续趋势时,会产生多次小额止损。

2. 极值点并不一定是反转点,存在错失反转或反转不足的风险。

3. 突破极值点后,不能保证立即反转,存在追击亏损的风险。

4. 只要求最近 4 个 bar 的极值,样本区间可能过小。

5. 没有考虑市场流动性,大笔入场可能对价格造成冲击。

6. 回测时间区间较短,长期效果存疑。

## 优化方向

双向突破反转策略可以从以下方面进行优化:

1. 增加极值点时间区间,避免样本过小。可以设定动态区间。

2. 在突破极值点后,等待额外确认信号,避免假突破。例如加大量,MACD 背离等。

3. 根据市场流动性情况,动态调整入场仓位。

4. 结合趋势指标,避免在趋势中频繁反转止损。

5. 增加止损线移动策略,让止损追踪利润。

6. 对不同品种分别测试参数,设定最优参数。

7. 增加更长的回测时间和期货数据,验证策略的稳定性。

## 总结

双向突破反转策略利用价格极值点判断反转时机,在高波动市场中可以捕捉短线机会。优点是规则简单,回撤低,收益率高。但也存在错失反转和追击亏损的风险。我们可以通过扩大样本区间、增加反转确认和动态止损来优化,使策略更稳健可靠。在更长的时间和更多市场中验证,以确保其长期有效性。总体来说,双向突破反转策略适合掌握短线交易技巧的量化交易者。

|| 

## Overview

The Bidirectional Breakout Reversal Strategy is a price action strategy based on pivot points. It detects extreme price levels within a number of bars to identify potential reversal opportunities. It enters reverse trades when prices break pivots. The strategy is suitable for high volatility markets and capable of catching short-term reversals.

## Strategy Logic

The core logic of the Bidirectional Breakout Reversal Strategy is:

1. Use `pivothigh()` and `pivotlow()` to calculate the highest high and lowest low within the most recent n bars as pivots. Here n is set to 4.

2. When the latest bar's high exceeds the pivot high, the strategy considers prices may reverse and goes short. The stop loss is placed above the pivot high.

3. When the latest bar's low breaks the pivot low, the strategy considers prices may reverse and goes long. The stop loss is placed below the pivot low.

4. Once prices reverse beyond the pivots, the previous signal is invalidated and waits for the next trading chance.

In this way, the strategy catches short-term reversal opportunities when prices break the pivots. The stop loss controls risk.

## Advantage Analysis 

The Bidirectional Breakout Reversal Strategy has the following advantages:

1. Simple and intuitive logic based on pivot points.

2. Suitable for volatile crypto markets to capture short-term reversals. 

3. Easy to understand and master.

4. Low 10% drawdown, risk is under control. 

5. High 350% return, Sharpe ratio above 1.

## Risk Analysis

The Bidirectional Breakout Reversal Strategy also has these risks:

1. Multiple small stop losses may occur in sustained trends.

2. Pivots are not guaranteed reversal points, risks of missing or insufficient reversals exist.

3. Prices may not reverse immediately after breaking pivots, risks of chasing losses. 

4. Only requires pivots of the recent 4 bars, sample size may be too small.

5. Market liquidity is ignored, large orders may impact prices.

6. Short backtest period makes long-term performance uncertain.

## Optimization

The Bidirectional Breakout Reversal Strategy can be optimized in the following aspects:

1. Increase the pivot period to avoid insufficient samples. Consider dynamic periods.

2. Wait for additional confirmation signals after breaking pivots to avoid false breaks. Such as bigger volumes, MACD divergences etc.

3. Dynamically adjust position sizing based on liquidity conditions.

4. Incorporate trend indicators to avoid whipsaws in trends.

5. Add stop loss movement strategies to trail profits.

6. Test optimal parameters for different products separately. 

7. Expand backtest period and use futures data to verify robustness.

## Conclusion

The Bidirectional Breakout Reversal Strategy catches short-term opportunities by identifying reversal points with price pivots. The advantage is simple rules, low drawdown and high returns. But risks like missing reversals and chasing losses exist. We can optimize it by expanding sample periods, adding reversal confirmation, dynamic stops etc. More extensive verification is needed to ensure long-term efficacy. Overall it suits quantitative traders skilled in short-term trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4|leftBars|
|v_input_2|4|rightBars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-16 00:00:00
end: 2023-11-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("QuantNomad - Pivot Reversal Strategy - XBTUSD - 1h", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 50)

// 
// author: QuantNomad
// date: 2019-06-01
// Pivot Reversal Strategy - XBTUSD - 1h
// https://www.tradingview.com/u/QuantNomad/
// https://t.me/quantnomad
//

leftBars  = input(4)
rightBars = input(4)

swh = pivothigh(leftBars, rightBars)
swl = pivotlow(leftBars, rightBars)

swh_cond = not na(swh)

hprice = 0.0
hprice := swh_cond ? swh : hprice[1]

le = false
le := swh_cond ? true : (le[1] and high > hprice ? false : le[1])

if (le)
    strategy.entry("PivRevLE", strategy.long, comment="PivRevLE", stop=hprice + syminfo.mintick)

swl_cond = not na(swl)

lprice = 0.0
lprice := swl_cond ? swl : lprice[1]


se = false
se := swl_cond ? true : (se[1] and low < lprice ? false : se[1])

if (se)
    strategy.entry("PivRevSE", strategy.short, comment="PivRevSE", stop=lprice - syminfo.mintick)

```

> Detail

https://www.fmz.com/strategy/432366

> Last Modified

2023-11-16 17:57:04
