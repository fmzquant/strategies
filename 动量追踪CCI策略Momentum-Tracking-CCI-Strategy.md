
> Name

动量追踪CCI策略Momentum-Tracking-CCI-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/de605b9043c989a656.png)

[trans]

### 概述

这个策略基于商品通道指数(CCI)指标,旨在在超卖情况下做多,在超买情况下做空。它还可选地使用指数移动平均线(EMA) filter,以控制只在趋势方向交易。该策略还提供基于固定百分比或平均真实范围(ATR)的止损止盈方式。

### 策略原理

1. 使用CCI指标判断市场趋势

    - CCI通过比较当前价格与一定周期内的平均价格来度量动量
    
    - CCI above 150为超买,below -100为超卖
    
2. 可选使用EMA filter

    - 仅在价格高于EMA时做多,价格低于EMA时做空
    
    - 使用EMA判断趋势方向,避免反趋势交易

3. 提供两种止损止盈方式

    - 基于固定百分比的止损止盈:使用入场价的固定百分比来设置止损止盈
    
    - 基于ATR的止损止盈: 使用ATR的倍数来设置止损,再根据风险回报比率计算止盈
    
4. 入场条件

    - CCI上穿-100线时做多
    
    - CCI下穿150线时做空
    
    - 如果启用EMA,仅在价格高于EMA时做多,价格低于EMA时做空
    
5. 出场条件

    - 价格触及止损止盈平仓
    
    - CCI重新进入超买超卖区域时平仓
    
6. 绘图

    - 绘图CCI指标,区域着色
    
### 优势分析

1. 使用CCI判断超买超卖情况,这是CCI指标的经典用法

2. 可选EMA可确保只在趋势方向交易,避免反转

3. 提供两种止损止盈方式,可以根据市场调整止损止盈的参数

4. 根据CCI指标再次进入超买超卖区域来平仓,可锁定趋势反转利润

5. 绘图突出CCI信号,易于判读

6. 策略逻辑清晰简单,容易理解和优化

### 风险分析

1. CCI指标存在滞后,可能出现错过反转或产生假信号

2. EMA参数设置不当可能错过趋势或使策略无效

3. 百分比止损止盈难以适应市场变化,应设较宽参数

4. ATR止损止盈对间隔周期敏感,应调整至最佳参数

5. 回撤风险较大,应适当调整仓位管理

6. 效果随市场环境变化,应适时评估指标参数

### 优化方向

1. 评估不同周期的CCI参数,找到最佳参数组合

2. 测试不同EMA周期,确定最合适的趋势判断周期

3. 调整止损止盈参数,取得最佳风险收益比

4. 增加其他filter条件,如交易量,进一步过滤假信号

5. 结合趋势线或图形进行形态判断,提高效果 

6. 增加仓位管理策略,如固定仓位,来控制回撤风险

7. 全面回测不同市场环境数据,动态调整参数

### 总结

该策略运用CCI指标的经典超买超卖原理进行入场。加入EMA filter可控制趋势方向。提供两种止损止盈方式便于调整。绘图突出信号易判读。策略逻辑简单清晰,易于理解和优化。通过参数调整、增加filter条件、风险控制等方面可进一步提高效果。

||


## Overview

This strategy is based on the Commodity Channel Index (CCI) indicator, aiming to go long in oversold conditions and go short in overbought conditions. It also optionally uses an Exponential Moving Average (EMA) filter to only trade in the direction of the trend. The strategy also provides fixed percentage or Average True Range (ATR) based stop loss and take profit.

## Strategy Logic  

1. Use CCI indicator to determine market trend

    - CCI measures momentum by comparing current price to the average price over a period
    
    - CCI above 150 is overbought, below -100 is oversold
    
2. Optionally use EMA filter

    - Only go long when price is above EMA, and short when below EMA 
    
    - Use EMA to determine trend direction, avoid counter-trend trading

3. Provide two types of stop loss and take profit

    - Fixed percentage based stop loss and take profit: Use fixed percentage of entry price
    
    - ATR based stop loss and take profit: Use ATR multiplier for stop loss, calculate take profit based on risk reward ratio
    
4. Entry conditions

    - Go long when CCI crosses above -100
    
    - Go short when CCI crosses below 150 
    
    - If EMA enabled, only enter when price is on right side of EMA
    
5. Exit conditions

    - Close position when stop loss or take profit is hit
    
    - Close position when CCI re-enters overbought/oversold region
    
6. Plotting

    - Plot CCI indicator, color code regions
    
## Advantage Analysis

1. Use CCI overbought/oversold for entry, a classic usage of CCI

2. Optional EMA ensures trading with the trend, avoid reversals

3. Provide two types of stop loss/take profit for flexibility

4. Close on CCI signal again locks in reversal profit 

5. Plotting highlights CCI signals clearly

6. Simple and clear logic, easy to understand and optimize

## Risk Analysis

1. CCI has lagging effect, may miss reversals or give false signals

2. Wrong EMA parameters may miss trends or render strategy ineffective

3. Fixed percentage stop loss/take profit less adaptive to market changes

4. ATR stop loss/take profit sensitive to ATR period, should optimize

5. Larger drawdown risk, position sizing should be adjusted

6. Performance varies across market conditions, re-evaluate parameters

## Optimization Directions 

1. Evaluate CCI periods to find optimal parameter combinations

2. Test different EMA periods for best trend estimation

3. Adjust stop loss/take profit for optimal risk reward ratio

4. Add other filters like volume to further avoid false signals

5. Combine with trendlines/chart patterns for pattern confirmation

6. Add position sizing rules like fixed size to control drawdown

7. Backtest across different market conditions, dynamically adjust

## Summary

The strategy utilizes the classic CCI overbought/oversold principles for entry. The EMA filter controls trend trading. Two types of stop loss/take profit provided for flexibility. Plotting highlights signals clearly. Simple and clear logic, easy to understand and optimize. Further improvements can be made via parameter tuning, adding filters, risk control etc.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|CCI Length|
|v_input_int_1|150|Overbought|
|v_input_int_2|-140|Oversold|
|v_input_2|true|Use EMA|
|v_input_3|55|EMA Length|
|v_input_4|true|(?TP/SL Method)Percentage TP/SL|
|v_input_5|false|ATR TP/SL|
|v_input_float_1|10|Take Profit (%)|
|v_input_float_2|10|Stop Loss (%)|
|v_input_6|20|ATR Length|
|v_input_7|4|ATR SL Multiplier|
|v_input_8|2|Risk Reward Ratio|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-24 00:00:00
end: 2023-10-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © alifer123

//@version=5
// strategy("CCI+EMA Strategy with Percentage or ATR TP/SL [Alifer]", shorttitle = "CCI_EMA_%/ATR_TP/SL", overlay=false,
//      initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=10, commission_type=strategy.commission.percent, commission_value=0.045)

length = input(14, "CCI Length")
overbought = input.int(150, step = 10, title = "Overbought")
oversold = input.int(-140, step = 10, title = "Oversold")
src = hlc3
ma = ta.sma(src, length)
cci = (src - ma) / (0.015 * ta.dev(src, length))

// EMA
useEMA = input(true, "Use EMA", tooltip = "Only enters long when price is above the EMA, only enters short when price is below the EMA")
emaLength = input(55, "EMA Length")
var float ema = na
if useEMA
    ema := ta.ema(src, emaLength)

// Take Profit and Stop Loss Method
tpSlMethod_percentage = input(true, "Percentage TP/SL", group="TP/SL Method")
tpSlMethod_atr = input(false, "ATR TP/SL", group="TP/SL Method")

// Percentage-based Take Profit and Stop Loss
tp_percentage = input.float(10.0, title="Take Profit (%)", step=0.1, group="TP/SL Method")
sl_percentage = input.float(10.0, title="Stop Loss (%)", step=0.1, group="TP/SL Method")

// ATR-based Take Profit and Stop Loss
atrLength = input(20, title="ATR Length", group="TP/SL Method")
atrMultiplier = input(4, title="ATR SL Multiplier", group="TP/SL Method")
riskRewardRatio = input(2, title="Risk Reward Ratio", group="TP/SL Method")

// Calculate TP/SL levels based on the selected method, or leave them undefined if neither method is selected
longTP = tpSlMethod_percentage ? strategy.position_avg_price * (1 + tp_percentage / 100) : na
longSL = tpSlMethod_percentage ? strategy.position_avg_price * (1 - sl_percentage / 100) : na
shortTP = tpSlMethod_percentage ? strategy.position_avg_price * (1 - tp_percentage / 100) : na
shortSL = tpSlMethod_percentage ? strategy.position_avg_price * (1 + sl_percentage / 100) : na

if tpSlMethod_atr
    longSL := strategy.position_avg_price - ta.atr(atrLength) * atrMultiplier
    longTP := ((strategy.position_avg_price - longSL) * riskRewardRatio) + strategy.position_avg_price
    shortSL := strategy.position_avg_price + ta.atr(atrLength) * atrMultiplier
    shortTP := ((strategy.position_avg_price - shortSL) * riskRewardRatio) - strategy.position_avg_price

// Enter long position when CCI crosses below oversold level and price is above EMA
longCondition = ta.crossover(cci, oversold) and (not useEMA or close > ema)
if longCondition
    strategy.entry("Buy", strategy.long)

// Enter short position when CCI crosses above overbought level and price is below EMA
shortCondition = ta.crossunder(cci, overbought) and (not useEMA or close < ema)
if shortCondition
    strategy.entry("Sell", strategy.short)

// Close long positions with Take Profit or Stop Loss
if strategy.position_size > 0
    strategy.exit("Long Exit", "Buy", limit=longTP, stop=longSL)

// Close short positions with Take Profit or Stop Loss
if strategy.position_size < 0
    strategy.exit("Short Exit", "Sell", limit=shortTP, stop=shortSL)

// Close positions when CCI crosses back above oversold level in long positions or below overbought level in short positions
if ta.crossover(cci, overbought)
    strategy.close("Buy")
if ta.crossunder(cci, oversold)
    strategy.close("Sell")

// Plotting
color_c = cci > overbought ? color.red : (cci < oversold ? color.green : color.white)
plot(cci, "CCI", color=color_c)
hline(0, "Middle Band", color=color.new(#787B86, 50))
obband = hline(overbought, "OB Band", color=color.new(#78867a, 50))
osband = hline(oversold, "OS Band", color=color.new(#867878, 50))
fill(obband, osband, color=color.new(#787B86, 90))

```

> Detail

https://www.fmz.com/strategy/430170

> Last Modified

2023-10-25 17:37:39
