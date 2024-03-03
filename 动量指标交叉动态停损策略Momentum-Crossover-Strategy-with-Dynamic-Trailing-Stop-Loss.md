
> Name

动量指标交叉动态停损策略Momentum-Crossover-Strategy-with-Dynamic-Trailing-Stop-Loss

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/140cba80fcb7fe6b14d.png)
[trans]

## 概述
本策略结合了移动平均线指标和动向指数指标,实现了双指标的交叉信号来发出买入和卖出信号。同时,策略加入了动态追踪止损来控制风险。

## 策略原理
1. 使用短期9日EMA和长期21日EMA构建移动平均线指标。当短期EMA上穿长期EMA时生成买入信号;当短期EMA下穿长期EMA时生成卖出信号。
2. 使用ADX、+DI和-DI构建DMI指标。当+DI上穿-DI时为买入信号;当-DI上穿+DI时为卖出信号。 
3. 将EMA指标和DMI指标的信号结合,即双指标都满足条件时才会发出实际的买入卖出信号。
4. 使用动态止损追踪最高价/最低价来止损。

## 优势分析
1. 双指标结合过滤假信号,提高信号准确率。短期指标捕捉趋势变化;长期指标确定大趋势方向。
2. 动量指标能提前捕捉到价格趋势,具有一定的leading特征。
3. 动态止损机制能最大限度锁定利润,同时控制风险。

## 风险分析
1. 双指标结合时,买入和卖出信号会减少,可能错过部分机会。 
2. 指标参数设置不当可能导致交易频率过高或信号质量差。
3. 止损设置过于宽松会增加亏损风险;设置过于严格会增加与趋势脱钩风险。

## 优化方向
1. 测试不同长度EMA长短期参数组合,找到最优参数。
2. 测试不同ADX参数选择,提高DMI信号质量。 
3. 优化止损参数,使其既能最大限度锁定利润,也能控制风险。
4. 可以考虑加入更多滤波指标,进一步提高信号质量。

## 总结
本策略整合移动平均线和动量指标的优势,双重确认信号,利用指标之间的互补提高策略盈利能力。同时,动态追踪止损机制能有效控制策略的风险。通过参数优化和规则完善,本策略返现能力和稳定性都有望得到提升。

||

## Overview
This strategy combines moving average indicators and directional movement index (DMI) indicators to generate buy and sell signals based on dual-indicator crossovers. It also incorporates a dynamic trailing stop loss to control risks.   

## Strategy Logic  
1. Construct moving average indicators using a short 9-day EMA and a long 21-day EMA. A buy signal is generated when the short EMA crosses above the long EMA. A sell signal is generated when the short EMA crosses below the long EMA.
2. Construct DMI indicators using ADX, +DI and -DI. A buy signal is triggered when +DI crosses above -DI. A sell signal is triggered when -DI crosses above +DI.
3. Combine the signals of EMA and DMI, requiring both indicators to satisfy conditions before issuing actual buy or sell signals.  
4. Use a dynamic trailing stop loss to track the highest price/lowest price for stop loss.
  
## Advantage Analysis
1. Dual-indicator combos filter fake signals and improve signal accuracy. Short-term indicators capture trend changes while long-term ones determine overall direction.   
2. Momentum indicators can capture trend shifts early with some leading characteristics.  
3. Dynamic trailing stop loss locks in profits as much as possible while controlling risks.
   
## Risk Analysis  
1. With dual-indicator combos, signal frequency is reduced, possibly missing some opportunities.
2. Poor parameter tuning of indicators may lead to over-trading or low-quality signals.  
3. Stop loss set too wide increases loss risks while set too tight increases trend disconnection risks.
   
## Optimization Directions
1. Test EMA combos with different short and long term lengths to find optimum.
2. Optimize ADX parameters to improve DMI signal quality.
3. Fine tune stop loss parameters to lock profits while managing risks.  
4. Consider adding more filters to further boost signal quality.
  
## Conclusion
This strategy combines the strengths of moving averages and momentum indicators for dual confirmation of signals, complementing each other to enhance profitability. Meanwhile, the dynamic trailing stop loss effectively controls risks. Further parameter optimization and strategy refinement could improve both profitability and stability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|9|Short-Term EMA Period|
|v_input_int_2|21|Long-Term EMA Period|
|v_input_float_1|true|Risk Percentage EMA|
|v_input_1|17|ADX Smoothing|
|v_input_2|17|DI Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-22 00:00:00
end: 2024-02-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Combined EMA and DMI Strategy with Enhanced Table", overlay=true)

// Input parameters for EMA
shortTermEMA = input.int(9, title="Short-Term EMA Period")
longTermEMA = input.int(21, title="Long-Term EMA Period")
riskPercentageEMA = input.float(1, title="Risk Percentage EMA", minval=0.1, maxval=5, step=0.1)

// Calculate EMAs
emaShort = ta.ema(close, shortTermEMA)
emaLong = ta.ema(close, longTermEMA)

// EMA Crossover Strategy
longConditionEMA = emaShort > emaLong and emaShort[1] <= emaLong[1]
shortConditionEMA = emaShort < emaLong and emaShort[1] >= emaLong[1]

// Input parameters for DMI
adxlen = input(17, title="ADX Smoothing")
dilen = input(17, title="DI Length")

// DMI Logic
dirmov(len) =>
    up = ta.change(high)
    down = -ta.change(low)
    truerange = ta.tr
    plus = fixnan(100 * ta.rma(up > down and up > 0 ? up : 0, len) / truerange)
    minus = fixnan(100 * ta.rma(down > up and down > 0 ? down : 0, len) / truerange)
    [plus, minus]

adx(dilen, adxlen) => 
    [plus, minus] = dirmov(dilen)
    sum = plus + minus
    adxValue = 100 * ta.rma(math.abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
    [adxValue, plus, minus]

[adxValue, up, down] = adx(dilen, adxlen)

// DMI Conditions
buyConditionDMI = up > down or (up and adxValue > down)
sellConditionDMI = down > up or (down and adxValue > up)

// Combined Conditions for Entry
longEntryCondition = longConditionEMA and buyConditionDMI
shortEntryCondition = shortConditionEMA and sellConditionDMI

// Combined Conditions for Exit
longExitCondition = shortConditionEMA
shortExitCondition = longConditionEMA

// Enter long trade based on combined conditions
if (longEntryCondition)
    strategy.entry("Long", strategy.long)

// Enter short trade based on combined conditions
if (shortEntryCondition)
    strategy.entry("Short", strategy.short)

// Exit trades
if (longExitCondition)
    strategy.close("Long")

if (shortExitCondition)
    strategy.close("Short")

// Plot EMAs
plot(emaShort, color=color.blue, title="Short-Term EMA")
plot(emaLong, color=color.red, title="Long-Term EMA")

// Create and fill the enhanced table
var tbl = table.new(position.top_right, 4, 1)
if (barstate.islast)
    table.cell(tbl, 0, 0, "ADX: " + str.tostring(adxValue), bgcolor=color.new(color.red, 90), width=15, height=4)
    table.cell(tbl, 1, 0, "+DI: " + str.tostring(up), bgcolor=color.new(color.blue, 90), width=15, height=4)
    table.cell(tbl, 2, 0, "-DI: " + str.tostring(down), bgcolor=color.new(color.orange, 90), width=15, height=4)

   
```

> Detail

https://www.fmz.com/strategy/443121

> Last Modified

2024-02-29 13:55:16
