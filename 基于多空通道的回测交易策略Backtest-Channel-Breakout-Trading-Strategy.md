
> Name

基于多空通道的回测交易策略Backtest-Channel-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略利用建立多空通道,进行通道突破型的系统回测验证,属于趋势突破类交易策略。

## 策略原理

1. 计算一定周期内的最高价构建多头通道,最低价构建空头通道。

2. 当价格突破上通道线时,进行买入。

3. 当价格突破下通道线时,进行卖出。

4. 可以设置回测的时间范围,对策略进行验证。

5. 采用突破通道进行交易,策略规则简单清晰。

## 优势分析

1. 多空通道可以比较直观地界定行情通道。

2. 突破通道线后的趋势向上可能性较大。

3. 回测可以验证策略在历史行情中的效果。

4. 通道突破的交易思路简单易行。

5. 代码较为简洁,容易进行修改和优化。

## 风险分析

1. 存在突破后的假突破 Bring回调风险。

2. 无法有效设置止损和止盈。

3. 通道参数设定不当会影响策略效果。

4. 回测结果可能存在优化偏差。

5. 实盘实施时效果可能会有较大差异。

## 优化方向

1. 测试不同参数寻找最优参数组合。

2. 增加其他因子组合过滤假突破。 

3. 建立止损和止盈机制。

4. 针对回测数据做好处理,消除数据偏差。

5. 在多种市场环境中进行回测验证。

6. 模拟实盘进行验证以配置实盘参数。

## 总结

该策略采用简单的突破通道法则进行回测验证,易于操作,但仍需优化以提高稳定性。通过参数调整、风险控制等进一步完善,可以使之成为可靠的突破交易系统。

||

## Overview

This strategy builds long and short channels, backtesting channel breakouts systematically. It belongs to channel breakout trend trading strategies.

## Strategy Logic

1. Build long channel with highest prices over a period, and short channel with lowest prices.

2. Buy when price breaks above the upper channel line.  

3. Sell when price breaks below the lower channel line.

4. Can set backtest date range to verify the strategy.

5. Simple and clear rules trading channel breakouts.

## Advantages

1. Channels visually define price ranges.

2. High probability of upside momentum after breakouts.

3. Backtesting verifies strategy effectiveness historically. 

4. Channel breakout concept simple and intuitive.

5. Concise code easy to modify and optimize.

## Risks

1. Risks of false breakouts and pullbacks after initial breakout.

2. No effective way to set stops and exits. 

3. Improper channel parameters negatively affect performance.

4. Backtest results may have look-ahead bias.

5. Real trading performance may differ greatly from backtest.

## Enhancement

1. Test parameters to find optimal combinations.

2. Add other factors to filter out false breakouts.

3. Build in stop loss and take profit mechanisms.

4. Handle backtest data properly to eliminate bias.

5. Verify strategy across various market conditions via backtest. 

6. Paper trade to configure parameters for live trading.

## Conclusion

This strategy backtests simple channel breakout rules, easy to operate but requiring refinement for stability. Further improvements like parameter tuning and risk controls can make it a reliable breakout system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2000|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2018|Backtest End Year|
|v_input_5|12|Backtest End Month|
|v_input_6|true|Backtest End Day|
|v_input_7|20|Upper Channel|
|v_input_8|20|Lower Channel|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-08-30 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//strategy(title = "Backtest Donchian Teixeira", default_qty_type = strategy.fixed, default_qty_value = 100, overlay = true, commission_type = strategy.commission.cash_per_order, commission_value = 2.50, precision = 2, calc_on_every_tick = true, pyramiding = 0, initial_capital = 10000)

testStartYear = input(2000, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear, testStartMonth, testStartDay, 00, 00)

testEndYear = input(2018, "Backtest End Year")
testEndMonth = input(12, "Backtest End Month")
testEndDay = input(1, "Backtest End Day")
testPeriodEnd = timestamp(testStartYear, testStartMonth, testStartDay, 23, 59)

window()  => true //nao funciona

length1 = input(20, minval=1, title="Upper Channel")
length2 = input(20, minval=1, title="Lower Channel")

dcUpper = highest(length1)
dcLower = lowest(length2)

plot(dcLower, style=line, linewidth=1, color=red, offset=1)
plot(dcUpper, style=line, linewidth=1, color=lime, offset=1)
plot(dcLower, style=line, linewidth=1, color=gray)

if (strategy.position_size == 0)
    strategy.entry("COMPRA", true, stop = dcUpper)
    
if (strategy.position_size > 0)
    strategy.exit("VENDA", stop = dcLower)
```

> Detail

https://www.fmz.com/strategy/427395

> Last Modified

2023-09-20 17:02:40
