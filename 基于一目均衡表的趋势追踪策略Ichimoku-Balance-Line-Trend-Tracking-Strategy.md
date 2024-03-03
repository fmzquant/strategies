
> Name

基于一目均衡表的趋势追踪策略Ichimoku-Balance-Line-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略采用Ichimoku Kinko Hyo指标中的Conversion Line,Base Line以及线云的前沿和后沿线,识别价格的趋势方向,实现趋势追踪交易。当价格突破云顶时做多,突破云底时做空,达到预设盈利比例止盈,达到预设亏损比例止损。

## 策略原理

该策略主要使用以下Ichimoku指标线:

- Conversion Line (Tenkan-sen): 转换线,代表短期趋势,为9周期最高价和最低价的平均线 
- Base Line (Kijun-sen): 基准线,代表中期趋势,为26周期最高价和最低价的平均线
- Leading Span A (Senkou Span A): 前沿线A,为转换线和基准线的平均线
- Leading Span B (Senkou Span B): 前沿线B,为52周期最高价和最低价的平均线 

当价格上穿前沿线云时,做多;当价格下穿前沿线云时,做空。ConfigEntry和ExitReason分别在突破云顶和云底时开仓,达到盈亏比例时平仓。

## 优势分析

- 使用Ichimoku指标识别趋势方向,避免被市场震荡误导
- 采用突破云顶/云底的方式识别趋势转折点,提高交易效率
- 设置止盈止损点,有助于把握盈利机会并控制风险

## 风险分析 

- Ichimoku指标存在滞后,可能错过趋势转折的最佳点位
- 需要合理设置参数周期,如转换线、基准线等周期设置不当可能导致虚假信号
- 止损点设置过小,可能过早止损;设置过大,亏损扩大的风险

## 优化方向

- 考虑结合其他指标识别趋势,提高准确率
- 动态优化参数周期,适应不同周期和市场环境
- 设置追踪止损,让止损点根据价格波动进行调整,避免过早止损
- 考虑开发自动止盈止损策略,根据市场波动性智能调整止盈止损点

## 总结

该策略利用Ichimoku云识别趋势方向,简单有效地进行趋势追踪交易。虽存在一定滞后和假信号风险,但可通过参数优化、止损技术改进、结合其他指标等方式获得改进。该策略易于理解和实现,适合初学者学习,也可作为其他策略参考。通过不断测试和优化,可使策略参数和规则更完善,在实盘中获得更好的绩效。

||


## Overview

This strategy uses the Conversion Line, Base Line and cloud boundaries from the Ichimoku Kinko Hyo indicator to identify the trend direction and implement trend tracking trades. It goes long when price breaks above the cloud top and goes short when price breaks below the cloud bottom. Profits are taken when a preset profit ratio is reached. Losses are cut when a preset loss ratio is reached.

## Strategy Logic

The strategy primarily utilizes the following Ichimoku indicator lines:

- Conversion Line (Tenkan-sen): Represents short-term trend, calculated as the average of the highest high and lowest low over the past 9 periods
- Base Line (Kijun-sen): Represents medium-term trend, calculated as the average of the highest high and lowest low over the past 26 periods  
- Leading Span A (Senkou Span A): The mean of the Conversion and Base Lines
- Leading Span B (Senkou Span B): The average of the highest high and lowest low over the past 52 periods

It goes long when price breaks above the cloud and goes short when price breaks below the cloud. Entry and Exit reasons are triggered when price breaks the cloud top and bottom respectively. Exits are triggered when profit or loss ratios are reached.

## Advantage Analysis

- Uses Ichimoku to identify trend direction, avoiding false signals from market noise
- Breaking cloud top/bottom identifies trend reversal points efficiently 
- Take profit and stop loss points help lock in profits and control risk

## Risk Analysis

- Ichimoku has lag and may miss best entry points 
- Poor parameter tuning of lines like Conversion Line could cause false signals
- Stop loss set too tight risks early exit; too loose risks large losses

## Optimization Directions

- Consider combining other indicators to improve accuracy
- Dynamically optimize parameters for different periods and markets
- Use trailing stop loss to adjust stops based on price action and avoid early exit
- Develop automated profit/loss strategy to intelligently adjust points based on volatility

## Summary

This strategy uses Ichimoku cloud to identify trends and implement simple trend tracking. Despite some lag and false signals, optimizations in parameters, stops, and using other indicators can improve it. Easy to understand and implement, it's good for beginners to learn from and reference when developing other strategies. Continuous testing and optimizations will improve parameters and rules for better live performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Tenkan-sen (Linha de Conversão)|
|v_input_2|26|Kijun-sen (Linha Base)|
|v_input_3|52|Senkou Span B (Nível adiantado B)|
|v_input_4|26|Deslocamento|
|v_input_5|5|Goal (%)|
|v_input_6|0.5|Stop (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-04 00:00:00
end: 2023-10-08 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Estratégia com Ichimoku" , pyramiding=0, calc_on_every_tick = true, initial_capital = 20000, commission_type = strategy.commission.cash_per_order, commission_value = 10.00)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////Ichimoku Clouds////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////(VERSÃO 40.0)//////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

periodoLinhaDeConversao = input(defval=9, title="Tenkan-sen (Linha de Conversão)",  minval=1)
periodoLinhaBase = input(defval=26, title="Kijun-sen (Linha Base)",  minval=1)
periodoNivelAdiantadoB = input(defval=52, title="Senkou Span B (Nível adiantado B)",  minval=1)
deslocamento = input(defval=26, title="Deslocamento",  minval=1)

linhaDeConversao = (highest(high,periodoLinhaDeConversao)+lowest(low,periodoLinhaDeConversao))/2
linhaBase = (highest(high,periodoLinhaBase)+lowest(low,periodoLinhaBase))/2
nivelAdiantadoA = (linhaDeConversao + linhaBase)/2
nivelAdiantadoB = (highest(high,periodoNivelAdiantadoB)+lowest(low,periodoNivelAdiantadoB))/2

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
strategy.initial_capital = 50000
//Hardcoded quantity - strategy.entry(qty=)
capitalInicial = strategy.initial_capital
lotes = (strategy.initial_capital - (strategy.initial_capital % (open*100)))/open

//Percentage input goal - strategy.exit(profit=)
percentGoal = input (defval = 5.0, title = "Goal (%)", type = float, minval=0.0, step=0.1)
longGoal = (strategy.position_avg_price * (percentGoal/100)) * 100
shortGoal = (strategy.position_avg_price - (strategy.position_avg_price / (1+(percentGoal/100)))) * 100

//Percentage input stop - strategy.exit(loss=)
percentStop = input (defval = 0.5, title = "Stop (%)", type = float, minval=0.0, step=0.1)
longStop = (strategy.position_avg_price * (percentStop/100)) * 100
shortStop = (strategy.position_avg_price * (percentStop/100)) * 100

strategy.entry('entryLong', strategy.long, lotes, when = strategy.position_size == 0 and crossover(close,max(nivelAdiantadoA[deslocamento], nivelAdiantadoB[deslocamento])))
strategy.entry('entryShort', strategy.short, lotes, when = strategy.position_size == 0 and crossunder(close,min(nivelAdiantadoA[deslocamento], nivelAdiantadoB[deslocamento])))
strategy.exit('exitLong', 'entryLong', profit = longGoal, loss = longStop)
strategy.exit('exitShort', 'entryShort', profit = shortGoal, loss = shortStop)

plot(strategy.equity, title="Variação de capital", color=white)
//plot(strategy.position_size, color=red)
```

> Detail

https://www.fmz.com/strategy/429084

> Last Modified

2023-10-12 17:29:46
