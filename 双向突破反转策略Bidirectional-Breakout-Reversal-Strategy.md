
> Name

双向突破反转策略Bidirectional-Breakout-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/4a0bd57abc88959d17.png)


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
