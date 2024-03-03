
> Name

基于随机指标交叉的交易策略Stochastics-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略利用随机指标的K线和D线交叉产生交易信号,属于典型的随机指标交易策略。

## 策略原理

1. 计算一定周期内的随机指标K线和D线。

2. 当K线从下方向上突破D线时,产生买入信号。

3. 当K线从上方向下突破D线时,产生卖出信号。 

4. 可以设置回测的时间范围来测试策略效果。

5. 使用随机指标交叉进行交易,策略规则简单清晰。

## 优势分析

1. 随机指标对超买超卖情况较为敏感。

2. K线和D线易于形成交易信号。

3. 可通过回测验证策略效果。

4. 随机指标易于计算实现。

5. 代码简洁,易于二次开发。

## 风险分析

1. 随机指标交叉可能出现假信号。

2. 没有设置止损止盈。

3. 无法区分趋势和盘整行情。

4. 回测存在数据拟合偏差。

5. 实盘实施效果可能存在差异。

## 优化方向

1. 测试不同参数寻找最优参数。

2. 增加趋势判断指标进行过滤。

3. 建立止损止盈机制。

4. 引入其他因子进行信号验证。

5. 对回测数据进行处理以消除偏差。

6. 模拟实盘来优化参数配置。

## 总结

该策略采用简单的随机指标交叉进行交易,易于实现,但需要进一步优化来提高稳定性。通过参数调整、风险控制等方式增强,可以将其打造成为可靠的量化交易策略。

||

## Overview 

This strategy uses stochastics crossover between K and D lines to generate trading signals, a typical stochastics trading strategy.

## Strategy Logic

1. Calculate stochastics K and D lines over a given period.

2. K line crossover above D line generates buy signals.

3. K line crossover below D line generates sell signals.

4. Can set backtest date range to test strategy effectiveness.

5. Simple and clear rules trading stochastics crossover.

## Advantages

1. Stochastics sensitive to overbought and oversold levels.

2. K and D lines form easy trading signals.

3. Backtest verifies strategy performance.

4. Stochastics easy to compute and implement.

5. Concise code easy for further development.

## Risks

1. Crossovers may generate false signals. 

2. No stop loss or take profit in place.

3. Fails to differentiate trends and ranges.

4. Backtest carries look-ahead bias.

5. Real trading performance may differ from backtest.

## Enhancement

1. Test parameters to find optimum values.

2. Add trend filter for additional validation. 

3. Build in stop loss and take profit mechanisms.

4. Incorporate other factors for signal confirmation.

5. Handle backtest data to eliminate biases.

6. Paper trade to optimize parameters for live trading.

## Conclusion

This strategy trades simple stochastics crossovers, easy to implement but requires refinements for stability. Enhancing it via parameter tuning, risk controls etc can transform it into a robust quant trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|35|K|
|v_input_2|21|D|
|v_input_3|21|Smooth|
|v_input_4|2020|開始年|
|v_input_5|true|開始月|
|v_input_6|true|開始日|
|v_input_7|2030|終了年|
|v_input_8|12|終了月|
|v_input_9|31|終了日|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © utanico

//@version=4
strategy(title="Stochastic", overlay=true, shorttitle="Stoch")
periodK = input(35, title="K", minval=1)
periodD = input(21, title="D", minval=1)
smoothK = input(21, title="Smooth", minval=1)
startYear = input(type=input.integer, title = "開始年", defval = 2020)
startMonth = input(type=input.integer, title = "開始月", defval = 1)
startDay = input(type=input.integer, title = "開始日", defval = 1)
endYear = input(type=input.integer, title = "終了年", defval = 2030)
endMonth = input(type=input.integer, title = "終了月", defval = 12)
endDay = input(type=input.integer, title = "終了日", defval = 31)

//開始日時
test_start = timestamp(startYear, startMonth, startDay, 00, 00)
//終了日時
test_end   = timestamp(endYear, endMonth, endDay, 00, 00)
//テスト期間の指定
is_test = true

k = sma(stoch(close, high, low, periodK), smoothK)
d = sma(k, periodD)

if (is_test)
    if (k > d)
        strategy.entry("Stoch_LE", strategy.long, comment="Stoch_LE")
    //if (strategy.opentrades > 0 and k < d)
        //strategy.close("Stoch_LE",comment="CloseLONG")
    if (k < d)
        strategy.entry("Stoch_SE", strategy.short, comment="Stoch_SE")
    //if (strategy.opentrades < 0 and k > d)
        //strategy.close("Stoch_SE",comment="CloseShort")
```

> Detail

https://www.fmz.com/strategy/427396

> Last Modified

2023-09-20 17:05:17
