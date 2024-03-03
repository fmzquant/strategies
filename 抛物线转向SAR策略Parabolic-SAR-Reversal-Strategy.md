
> Name

抛物线转向SAR策略Parabolic-SAR-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略基于抛物线转向指标SAR进行交易,SAR指标可显现市场的趋势反转点。当SAR点突破价格时产生交易信号。

## 原理

抛物线转向指标SAR(Stop and Reverse)主要判断市场趋势反转,属于趋势跟踪指标。

SAR点位于价格之下时代表看涨,此时如果SAR上穿价格则为做空信号。

SAR点位于价格之上时代表看跌,此时如果SAR下穿价格则为做多信号。 

该策略就是以SAR指标的突破作为交易信号的方向。并以SAR点作为止损位。

## 优势

1. SAR指标可准确定位潜在的反转点。

2. 由于采用趋势跟踪机制,可减少假信号。

3. SAR作为止损位可顺势Setting,避免被套。

4. 无需其它指标或过滤器即可运作。

5. 参数优化简单,使用默认设置即可。

## 风险及解决方法

1. SAR指标在盘整时可能产生频繁信号。可添加过滤器识别趋势性行情。

2. 止损点靠近当前价可能被击穿。应适当宽松止损点。

3. 未考虑交易量因素。可加入量能指标避免价量不符。 

4. 回撤可能较大。应适当设置仓位以限制风险。

5. 趋势反转不一定成功。可设置再次反转确认。

## 优化思路

1. 测试是否调整SAR参数能获得更好结果。

2. 加入MACD等指标判断反转成功率。

3. 建立动态移动止损机制。

4. 优化开仓仓位,充分利用SAR信号。

5. 研究加入继续反转确认逻辑。

## 总结

该策略运用抛物线转向指标SAR判断潜在反转点,在SAR突破价格时交易。优点是顺势止损,避免被套。但SAR信号时点选择可能不准,需进一步优化。整体来说,抛物线转向思路值得借鉴学习。

|| 

## Overview

This strategy trades based on Parabolic SAR indicator which identifies potential reversal points in trends. Entry signals are generated when SAR flips above or below price. 

## Principles

Parabolic SAR is a trend following indicator that mainly identifies trend reversals.

When SAR is below price, it represents uptrend. SAR flipping above price gives short signal.

When SAR is above price, it represents downtrend. SAR flipping below price gives long signal.

The strategy simply trades the SAR flip as signal direction, with SAR as stop loss.

## Advantages

1. SAR accurately locates potential reversal points.

2. Trend following mechanism reduces false signals.

3. SAR acts as trailing stop, avoiding being trapped.

4. No other indicators or filters required. 

5. Easy parameter optimization, defaults often work.

## Risks and Mitigations

1. SAR may whipsaw in ranging markets. Trend filter can be added.

2. SAR too close to price risks being hit. Wider stops needed.

3. Volume is ignored, risk of divergence. Volume indicators can help.

4. Drawdowns may be significant. Appropriate position sizing is key.

5. Reversals do not always succeed. Confirmation may be needed.

## Enhancement Opportunities

1. Test if SAR parameters can be improved.

2. Add indicators like MACD to confirm reversal probability.

3. Build dynamic trailing stop mechanism. 

4. Optimize entry position sizing to capitalize on SAR signals.

5. Research adding reversal confirmation logic.

## Summary

The strategy trades potential reversal points identified by SAR, taking trades when SAR flips price. Benefits include trailing stops to avoid traps. But SAR timing may be inaccurate and needs refinement. Overall the SAR reversal concept is worth learning.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.02|start|
|v_input_2|0.02|increment|
|v_input_3|0.2|maximum|
|v_input_4|true|From Day|
|v_input_5|true|From Month|
|v_input_6|2018|From Year|
|v_input_7|true|To Day|
|v_input_8|true|To Month|
|v_input_9|2019|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-09-17 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Parabolic SAR Strategy", overlay=true)

// 
// author: Kozlod
// date: 2018-09-03
// https://www.tradingview.com/u/Kozlod/
// 

start = input(0.02)
increment = input(0.02)
maximum = input(0.2)

////////////////////////////////////////////////////////////////////////////////
// BACKTESTING RANGE
 
// From Date Inputs
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2018, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2019, title = "To Year", minval = 1970)
 
// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true
 
////////////////////////////////////////////////////////////////////////////////

psar = sar(start, increment, maximum)

// Signals
psar_long  = high[1] < psar[2] and high > psar[1] 
psar_short = low[1]  > psar[2] and low  < psar[1] 

// Plot PSAR
plotshape(psar, location = location.absolute, style = shape.cross, size = size.tiny, color = low < psar[1] and not psar_long ? green : red)


if (psar >= high and time_cond)
    strategy.entry("ParLE", strategy.long, stop=psar, comment="ParLE")
else
    strategy.cancel("ParLE")

if (psar <= low and time_cond)
    strategy.entry("ParSE", strategy.short, stop=psar, comment="ParSE")
else
    strategy.cancel("ParSE")

if (not time_cond)
    strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/427190

> Last Modified

2023-09-18 21:59:08
