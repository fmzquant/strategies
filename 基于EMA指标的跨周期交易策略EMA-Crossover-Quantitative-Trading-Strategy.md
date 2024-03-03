
> Name

基于EMA指标的跨周期交易策略EMA-Crossover-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10dc5501cd9c6021920.png)
[trans]

## 概述

本策略是一个基于EMA指标的跨周期交易策略。它使用两个不同周期的EMA作为买卖信号,在短周期EMA上穿长周期EMA时做多,在短周期EMA下穿长周期EMA时做空,属于趋势跟踪策略。该策略同时设定了止损位和止盈位来控制风险。

## 策略原理

该策略使用EMA指标的金叉死叉作为交易信号。具体来说,分别计算短期EMA和长期EMA,当短期EMA上穿长期EMA时生成买入信号做多;当短期EMA下穿长期EMA时生成卖出信号做空。这样通过EMA的移动趋势决定买卖方向。

进入仓位后,策略同时设置了止损位和止盈位。止损位是入场价格的一定百分比作为止损线,如果价格触碰止损线则平仓止损;止盈位是入场价格的一定百分比作为止盈线,如果价格触碰止盈线则平仓止盈。

该策略还允许选择只做多或只做空,以及选择日内交易还是持仓交易。对于日内交易,在美股收盘前会强制平仓。

## 优势分析

该策略具有以下优势:

1. 使用EMA指标过滤曲线,避免被高频波动误导,能顺势而为地捕捉中长线趋势。

2. 采用短周期EMA和长周期EMA的交叉作为交易信号,避免频繁交易。

3. 设置止损止盈来控制每个订单的风险收益比,有利于资金管理。  

4. 可以选择只做多或只做空,以及日内交易或持仓交易,适应不同类型交易者。

5. 兼容多种交易品种,包括股票、外汇、数字货币等。

## 风险分析

该策略也存在一些潜在风险:

1. EMA指标有滞后性,可能错过短期趋势转折点。

2. 长短周期EMA选择不当可能导致交易信号错乱。

3. 持仓时间过长可能承受更大的行情震荡。

4. 机械地止损止盈可能过早离场或减少盈利。

对应风险管理措施有:

1. 优化EMA参数,找到最佳周期组合。  

2. 加入其他指标作为辅助判断。

3. 动态调整止损止盈位。

4. 人工干预异常行情。

## 优化方向 

该策略可从以下几个方向进行优化:

1. 最佳化EMA参数,找到不同品种合适的长短周期组合。

2. 增加其他指标判断,如MACD、KD等,实现多指标共振。  

3. 增加机器学习模型训练,产生动态止损止盈。

4. 接入更先进的RISK指标进行特征工程。

5. 增加自适应交易元件,实现参数自优化。

## 总结

本策略整体是一个优秀的趋势跟踪策略模板,核心优势在于使用EMA指标过滤噪声实现稳定盈利,同时具备完善的风险收益管理。通过不断优化,该策略可以成为跨市场通用的量化策略,值得交易者学习和实践。

||

## Overview  

This is an EMA crossover quantitative trading strategy. It uses two EMAs with different periods as trading signals, going long when the shorter period EMA crosses over the longer period EMA and going short when the shorter period EMA crosses below the longer period EMA. It belongs to the trend following strategies. This strategy also sets stop loss and take profit to control risks.  

## Strategy Logic

This strategy uses the golden cross and death cross of EMAs as trading signals. Specifically, it calculates the shorter period EMA and longer period EMA respectively. When the shorter period EMA crosses over the longer period EMA, it generates a buy signal for going long. When the shorter period EMA crosses below the longer period EMA, it generates a sell signal for going short. So the moving trends of EMAs determine the trading directions.

After entering positions, the strategy also sets stop loss and take profit simultaneously. The stop loss is a certain percentage of the entry price as the stop loss line. If the price touches the stop loss line, it will exit the position for stop loss. The take profit is a certain percentage of the entry price as the take profit line. If the price touches the take profit line, it will exit the position for taking profit.

This strategy also allows choosing only long, only short, intraday trading or position trading. For intraday trading, it will close all positions before market close.

## Advantage Analysis 

This strategy has the following advantages:

1. Using EMA indicator to filter noises and catch mid-long term trends smoothly.  

2. Adopting EMA crossovers between shorter and longer periods as trading signals to avoid over-trading.

3. Setting stop loss and take profit to control risk-reward ratio of every trade, which is good for money management.   

4. Allowing only long, only short, intraday and position trading to suit different trader types.

5. Supporting multiple trading assets like stocks, forex, cryptocurrencies etc.

## Risk Analysis

This strategy also has some potential risks:

1. EMA indicator has lagging effect and may miss some short term trend turning points. 

2. Inappropriate choices of shorter and longer EMA periods may cause messy trading signals.  

3. Holding positions for too long may undertake larger market fluctuations.

4. Mechanical stop loss and take profit may exit positions too early or reduce profits prematurely.

The corresponding risk management measurements:

1. Optimize EMA parameters to find the best period combination.  

2. Add other indicators as auxiliary judgement.  

3. Dynamically adjust stop loss and take profit.

4. Manual intervene unusual market condition.

## Optimization Directions

This strategy can be optimized in the following aspects:

1. Best optimization of EMA parameters to find suitable shorter and longer period combinations for different trading assets.  

2. Add other indicators like MACD, KD for multi-indicator synergy.

3. Add machine learning models to generate dynamic stop loss and take profit.  

4. Connect more advanced RISK indicators for feature engineering.  

5. Add adaptive trading components for parameter self-optimization.

## Summary  

In summary, this is an excellent trend following strategy template. Its core strength lies in using EMA indicator to filter noises and achieve steady profits, while possessing comprehensive risk-reward management. Through continuous optimization, this strategy can become a universal quantitative strategy across markets and is worthwhile for traders to learn and practice.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|11|Short EMA Length|
|v_input_2|21|Long EMA Length|
|v_input_3|true|Stop-Loss (%)|
|v_input_4|3|Target (%)|
|v_input_5|true|Long Only|
|v_input_6|true|intraday?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("EMA Crossover Strategy by Vikrant Singh", overlay=true)


// Input for EMA Lengths
var bool runningPOS = false
var float stopLossLevel = na
var float targetLevel = na
shortLength = input(11, title="Short EMA Length")
longLength = input(21, title="Long EMA Length")

// Input for Stop-Loss and Target
stopLossPct = input(1, title="Stop-Loss (%)")
targetPct = input(3, title="Target (%)")
longOnly = input(true, title="Long Only")
intraDay = input(true, title="intraday?")


// Calculate EMAs
emaShort = ta.ema(close, shortLength)
emaLong = ta.ema(close, longLength)

// Calculate crossover conditions
crossoverCondition = ta.crossover(emaShort, emaLong)
crossunderCondition = ta.crossunder(emaShort, emaLong)

// Entry condition (long position just before crossover)
if crossoverCondition and not runningPOS and longOnly and (hour <= 15)
    strategy.entry("Long", strategy.long)
    runningPOS := true
    stopLossLevel := close * (1 - stopLossPct / 100)
    targetLevel := close * (1 + targetPct / 100)

//Entry condition (short position just before crossover)
if crossunderCondition and not runningPOS and not longOnly and (hour <= 15)
    strategy.entry("Short", strategy.short)
    runningPOS := true
    stopLossLevel := close * (1 + stopLossPct / 100)
    targetLevel := close * (1 - targetPct / 100)

// Exit conditions (square off on reverse crossover)
//Exit long
if (crossunderCondition or (low < stopLossLevel) or (high > targetLevel) ) and longOnly and runningPOS
    strategy.close("Long",comment = "Exit long")// ("Long", from_entry="Long",stop=stopLossLevel, limit=targetLevel)
    runningPOS := false

//Exit short
if (crossoverCondition or (high > stopLossLevel) or (low < targetLevel) ) and not longOnly and runningPOS
    strategy.close("Short", comment = "Exit Short")
    runningPOS := false

if intraDay and runningPOS
    if (hour >= 15)
        strategy.close_all(comment = "Intraday square off")
        //strategy.close("Long",comment = "intraday square off")
        runningPOS := false


// Plot EMAs
plot(emaShort, color=color.blue, title="Short EMA")
plot(emaLong, color=color.red, title="Long EMA")
```

> Detail

https://www.fmz.com/strategy/440361

> Last Modified

2024-01-29 15:56:56
