
> Name

三重指数移动平均线长线策略Triple-Exponential-Moving-Average-Long-Only-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/956037267034eed70d.png)
[trans]


## 概述

三重指数移动平均线长线策略(Triple Exponential Moving Average Long Only Strategy)是一个基于三重指数移动平均线作为交易信号的长线策略。该策略通过计算三条不同周期的EMA,并叠加转换为TEMA指标,以滤除短期市场噪音,识别中长线趋势方向。当价格上穿TEMA时做多,下穿TEMA时平仓。该策略适合对中长线趋势交易感兴趣的投资者。

## 策略原理

该策略通过TEMA技术指标识别中长线趋势。TEMA指标是对EMA指数移动平均线进行三重平滑之后得到的趋势指标。EMA指标本身对价格起到一定滤波作用。TEMA通过计算三条不同周期的EMA指数移动平均线,并进行叠加转换,可进一步滤除短期噪音,突显更大周期的趋势。

具体来说,该策略首先计算fastEmaPeriod周期的EMA指标ema1,然后再基于ema1计算出同周期ema2,最后基于ema2计算出ema3。最终的TEMA指标按照:TEMA = 3 * (ema1 - ema2) + ema3的公式进行计算。当价格上穿TEMA时,做多;当价格下穿TEMA时,平仓。

通过多重指数平滑,TEMA指标可有效识别曲折反复的中长线趋势方向,滤除短期噪音对交易的干扰,因此非常适合作为空头的长线交易策略。

## 策略优势分析

- 使用TEMA指标可有效识别中长线趋势,滤除短期噪音干扰,避免被套。

- 仅做多不做空,可规避空头带来的无限亏损风险。

- 采用百分比仓位管理,可根据账户资金灵活调整仓位规模,控制风险。

- 时间窗口设置可实现回测指定历史时间段,优化策略参数。

## 策略风险分析

- 长线持仓时,遇到重大黑天鹅事件导致快速调头可能造成较大亏损。

- TEMA指标在趋势转折点失败时,可能错过及时止损机会。

- 百分比仓位无法限制单笔亏损大小,需辅以止损来控制风险。

- 回测存在过拟合风险,参数优化不一定适用于未来市场。

## 策略优化方向

- 结合波动率指标优化参数,提高参数的稳健性。

- 增加止损策略,以控制单笔亏损。

- 优化仓位管理,在回撤时降低仓位。

- 加入跨时间周期的 Tendency 指标,提升趋势判断的准确性。

- 测试不同持仓周期参数,寻找最优持仓周期。

## 总结

综上所述,该三重指数移动平均线长线策略通过计算TEMA指标识别趋势方向,采用长线持仓避免被短期噪音干扰,仅做多不做空规避无限亏损风险,可有效捕捉中长线趋势进行长周期持仓。但该策略也存在一定风险,需要适当优化以提高稳健性。整体来说,该策略适合具有一定风险承受能力并倾向趋势交易的投资者。

||


## Overview

The Triple Exponential Moving Average Long Only Strategy is a long-term trend following strategy based on the Triple Exponential Moving Average (TEMA) indicator. It uses TEMA to filter out short-term market noise and identify mid-to-long-term trend directions. The strategy goes long when price crosses above TEMA and exits when price falls below TEMA. It is suitable for investors interested in mid-to-long term trend trading.

## Strategy Logic

The strategy identifies mid-to-long term trends using the TEMA indicator. TEMA is a smoothed trend indicator derived from triple exponential smoothing of the standard EMA. EMA itself has some noise filtering effect. TEMA further reduces short-term noise by smoothing three EMAs of different periods. 

Specifically, the strategy first calculates the EMA (ema1) of period fastEmaPeriod, then calculates another EMA (ema2) of ema1 using the same period, and finally calculates ema3 based on ema2. The final TEMA is calculated as: TEMA = 3 * (ema1 - ema2) + ema3. The strategy goes long when price crosses above TEMA and exits when price falls below TEMA.

Through multiple exponential smoothing, TEMA can effectively identify mid-to-long term trend directions despite zigzags and reversals, filtering out short-term noise. Thus it is well-suited for long-term trend following strategies.

## Advantage Analysis

- TEMA effectively identifies mid-to-long term trends and filters out short-term noise, avoiding whipsaws.

- Only long positions avoid unlimited downside risks of shorting. 

- Percentage position sizing flexibly sizes positions based on account size for risk control.

- Time window backtesting optimizes parameters on specific historical periods.

## Risk Analysis

- Severe black swan events may cause sharp reversals during long holding periods, leading to large losses.

- TEMA may fail to signal trend changes for timely stop loss. 

- Percentage sizing does not limit per trade loss size, requiring stops.

- Backtesting risks overfitting, optimized parameters may not fit future markets.

## Improvement Directions

- Add volatility metrics to robustify parameters.

- Implement stop loss to control single trade loss size.

- Optimize position sizing to lower size during drawdowns. 

- Add cross-timeframe Tendency indicators to improve trend accuracy.

- Test different holding period parameters for optimum.

## Conclusion

In summary, the Triple EMA Long Only Strategy identifies trend directions via the TEMA indicator, holds long-term positions to avoid short-term noise, stays only long to avoid unlimited downside, and effectively catches mid-to-long term trends. However, risks exist requiring optimizations to improve robustness. Overall it suits investors with some risk tolerance favoring trend trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|7|Fast TEMA Period|
|v_input_2|true|From Month|
|v_input_3|4|From Day|
|v_input_4|2010|From Year|
|v_input_5|true|To Month|
|v_input_6|true|To Day|
|v_input_7|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-08 00:00:00
end: 2023-11-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("TEMA_System_long_only", overlay=true)

//Collect inputs parameters

fastEmaPeriod = input(7, minval=1, title="Fast TEMA Period")

// === INPUT BACKTEST RANGE ===
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 4, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2010, title = "From Year", minval = 2000)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2000)

// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"

fastEma = ema(close, fastEmaPeriod)

//convert EMA into TEMA

ema1 = ema(close, fastEmaPeriod)
ema2 = ema(ema1, fastEmaPeriod)
ema3 = ema(ema2, fastEmaPeriod)

fastTEMA = 3 * (ema1 - ema2) + ema3


buy  = close > fastTEMA
sell = close < fastTEMA

plot(fastTEMA, title = 'TEMA', linewidth=3, color=white)

if window()
    strategy.entry("long",strategy.long, when = buy)
    strategy.close("long", when = sell )
```

> Detail

https://www.fmz.com/strategy/432179

> Last Modified

2023-11-15 10:54:39
