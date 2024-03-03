
> Name

自适应移动平均线量化策略Adaptive-Moving-Average-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10c6aabbfe1b6f48c7a.png)
[trans]


## 概述

本策略基于移动平均线,可自动调整参数,适用于高时间周期的波动市场。它能够自动找到最佳的参数组合,在价格突破移动平均线时产生交易信号。

## 策略原理

本策略使用自适应移动平均线作为交易信号。首先计算指定周期(start)的简单移动平均线(CMA)。然后测试CMA周围的参数组合,判断哪个组合的CMA线被K线实体和影线触碰的次数最少。最后使用触碰最少的那个CMA作为信号线。

具体来说,策略会测试CMA周期加1(CMA_P1)和减1(CMA_M1)后的CMA线,统计实体线和影线触碰它们的次数。如果CMA的触碰次数少于CMA_P1和CMA_M1,那么保持当前的CMA周期;如果CMA_P1触碰次数较少,那么CMA周期加1;如果CMA_M1触碰次数较少,那么CMA周期减1。这样可以找到一个相对平滑的CMA作为信号线。

当价格从下向上突破CMA时,产生买入信号;当价格从上向下突破CMA时,产生卖出信号。

## 优势分析

这种自适应移动平均线策略具有以下优势:

1. 自动寻找最优参数。不需要人工选择移动平均线的周期,策略会自动测试不同周期,找到最优参数。

2. 减少假信号。相比固定周期的移动平均线,自适应移动平均线可以滤除更多的噪音,从而减少许多假信号。

3. 适应市场变化。当市场从盘整进入趋势时,移动平均线周期会自动变长来产生信号;当市场从趋势进入盘整时,移动平均线周期会自动变短。所以策略可以动态适应市场的变化。

4. 简化交易系统。这种自适应方式可以简化整个交易系统,不需要人工优化参数。

5. 可扩展性强。该策略思想可以推广到其他指标,设计出自适应布林带、自适应KD等策略。

## 风险分析

这种策略也存在一些风险需要注意:

1. 看涨期权风险。当市场出现看涨期权行情时,实体线无法突破移动平均线,会造成错误信号。需要加入过滤条件以减少此类风险。

2. 突破失败风险。移动平均线突破并不总能 continuation,存在部分突破失败的风险。所以需要进行突破验证,确保突破成功率。

3. 趋势反转风险。进入趋势市场后的反转需要及时切换方向,否则会造成亏损。可以设定止损条件以控制损失。

4. 参数优化风险。自适应调整的参数可能会落入本地优化,从而产生明显冗余的移动平均线。需要引入模型评估方法来避免这一问题。

5. 过优化风险。自适应调整参数可能会过度优化,而丧失模型的泛化能力。需要在不同市场环境中进行长时间验证,不能过度依赖回测结果。

## 优化方向

这种自适应移动平均线策略可优化的方向有:

1. 加入趋势突破验证机制,通过连续突破来过滤假突破。

2. 增加止损策略,当价格重新回到移动平均线另一侧时止损。

3. 增加期权过滤机制,在看涨期权行情中避免发出错误信号。

4. 引入评估指标对参数调整进行约束,如 IC、LIC、SIC 等,避免参数被过度优化。

5. 扩展至其他指标,设计自适应金叉死叉策略,自适应布林带策略等。

6. 优化移动平均线计算方式,使用加权移动平均、指数移动平均等平滑移动平均线。

## 总结

本策略通过自适应调整移动平均线周期,寻找最优参数,从而产生交易信号。相比固定参数,它可以减少许多假信号,适应市场的变化。但我们也要注意一些潜在的风险,需要对策略进行 verification 和 walk forward 优化,才能在实际交易中稳定获利。

[/trans]

||


## Overview

This strategy is based on moving average, can automatically adjust parameters, and is suitable for wavy markets at high timeframes. It can automatically find the optimal parameter combination and generate trading signals when price breaks through the moving average line.

## Strategy Logic

This strategy uses an adaptive moving average as trading signal. First it calculates the simple moving average (CMA) of the specified period (start). Then it tests the CMA parameters around the period, judging which combination has the least touches by candlestick body and wick. Finally it uses the CMA with the least touches as the signal line.

Specifically, the strategy tests the CMA with period plus 1 (CMA_P1) and minus 1 (CMA_M1), counts the number of touches by body and wick. If CMA has less touches than CMA_P1 and CMA_M1, then keep the current period; if CMA_P1 has less touches, then increase the period by 1; if CMA_M1 has less touches, then decrease the period by 1. This finds a relatively smooth CMA as the signal line.

When price breaks through CMA upward, a buy signal is generated; when price breaks through CMA downward, a sell signal is generated.

## Advantage Analysis 

This adaptive moving average strategy has the following advantages:

1. Automatically find optimal parameters. No need to manually select moving average period, the strategy will test different periods and find the optimum.

2. Reduce false signals. Compared with fixed period MA, the adaptive MA can filter out more noise and reduce many false signals. 

3. Adapt to market changes. When market switches from range-bound to trending, the MA period will automatically increase to generate signals; when market switches from trending to range-bound, the MA period will automatically decrease. So the strategy can dynamically adapt to market changes.

4. Simplify trading system. This adaptive method can simplify the whole trading system without manual parameter optimization.

5. Good scalability. The concept can be applied to other indicators like adaptive Bollinger Bands, adaptive KD etc.

## Risk Analysis

There are also some risks to note for this strategy:

1. Call option risk. When market has a call option pattern, the candle body may fail to break the MA line, resulting in wrong signals. Filter conditions need to be added to reduce such risk.

2. Failed breakout risk. MA breakout does not always continuation, some failed breakouts may occur. Breakout validation is needed to ensure high success rate. 

3. Trend reversal risk. Trend reversal after entering the trend needs to be switched timely, otherwise it may cause losses. Stop loss should be set to control the loss.

4. Parameter optimization risk. Adaptive adjusted parameters may fall into local optimization, resulting in redundant MAs. Model evaluation methods need to be introduced to avoid this problem.

5. Overfitting risk. Excessive parameter tuning may lead to overfitting and lose the model generalization ability. Prolonged verification in different market environments is needed, not just rely on backtest results.

## Improvement Directions

Some directions to improve this adaptive MA strategy:

1. Add trend breakout validation via consecutive breakouts to filter false breakouts.

2. Increase stop loss strategy, stop loss when price moves back to the other side of MA. 

3. Add option filter to avoid wrong signals when call option appears.

4. Introduce evaluation metrics like IC, LIC, SIC etc. to constrain parameter tuning and prevent overfitting.

5. Expand to other indicators like adaptive golden cross strategy, adaptive Bollinger Bands etc. 

6. Optimize MA calculation by using weighted MA, exponential MA etc. to get smoother MA.

## Summary

This strategy generates trading signals by adaptively adjusting the MA period to find optimal parameters. Compared with fixed parameters, it can reduce many false signals and adapt to market changes. But we also need to watch out for potential risks, and do verification and walk-forward optimization before applying it in live trading for steady profits.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Sensitivity|
|v_input_2|3|Smoothing|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|2020|Start year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-10 00:00:00
end: 2023-11-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © fondDealer96636

//@version=5

strategy('Automatic Moving Average', overlay=true, max_bars_back=201, pyramiding=0, currency=currency.USD, default_qty_type=strategy.cash, default_qty_value=10000, initial_capital=10000)

// input
start = 20
lookback = input(20, "Sensitivity", tooltip="Low (High Sensitivity), High (Low Sensitivity).\n\nAdjust according to timeframe and asset.")
smoothing = input(3, "Smoothing")
source = input(close, "Source")
startYear = input(2020, "Start year")
resp = 1

in_date_range = time >= timestamp(syminfo.timezone, startYear, 1, 1, 0, 0)

// global
var ix = -1
var mal = array.new_int(0)


// functions
avg(source, len) =>
    sum = 0.0
    for i = 0 to len-1
        sum += source[i]
    sum/len

bull = close > open

wick_touch(x) =>
    bull ? ((close <= x and x <= high) or (low <= x and x <= open)) : ((open <= x and x <= high) or (low <= x and x <= close))

body_touch(x) =>
    bull ? (open < x and x < close) : (close < x and x < open)

touches(t) =>
    touches = 0
    for i = 0 to lookback-1
        touches += t[i] ? 1 : 0
    touches


// local
ix := ix+1
prev_mal = ix >= 1 ? array.get(mal, ix-1) : start

cma = avg(source, prev_mal)
cma_p1 = avg(source, prev_mal+1)
cma_m1 = avg(source, prev_mal-1)

d = touches(wick_touch(cma))
d_p1 = touches(wick_touch(cma_p1))
d_m1 = touches(wick_touch(cma_m1))

d_b = touches(body_touch(cma))
d_p1_b = touches(body_touch(cma_p1))
d_m1_b = touches(body_touch(cma_m1))

any_body_touch = d_b > 0 or d_p1_b > 0 or d_m1_b > 0
no_wick_touch = d <= 0 and d_p1 <= 0 and d_m1 <= 0
wick_maximized = d >= d_p1 and d >= d_m1 ? prev_mal : (d_p1 >= d and d_p1 >= d_m1 ? prev_mal+resp : (d_m1 >= d and d_m1 >= d_p1 ? prev_mal-resp : na))

up = cma > cma[1]
down = cma < cma[1]
against_trend = (up and close < cma) or (down and close > cma)

new_mal = no_wick_touch or against_trend ? prev_mal-resp : (any_body_touch ? prev_mal+resp : wick_maximized)
next_mal = na(new_mal) ? prev_mal : new_mal

array.push(mal, next_mal < 2 ? 2 : (next_mal > 200 ? 200 : next_mal))


// graph
scma = ta.ema(cma, smoothing)

uptrend = scma > scma[1]
downtrend = scma < scma[1]

plot(scma, "Automatic MA", color=uptrend ? color.green : color.red)

uptrending = close > scma and uptrend
downtrending = close < scma and downtrend

defy = not uptrending and not downtrending
defy_cross = defy and body_touch(scma)

barcolor(uptrending ? color.lime : (downtrending ? color.red : (defy_cross ? color.black : color.white)))


// strategy
change_to_uptrend = uptrending and downtrend[1]
change_to_downtrend = downtrending and uptrend[1]

long = in_date_range and change_to_uptrend
short = in_date_range and change_to_downtrend

if long
    strategy.entry("Long", strategy.long)
if short
    strategy.entry("Short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/432421

> Last Modified

2023-11-17 17:14:36
