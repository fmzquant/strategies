
> Name

狮子裂缝均衡策略Lion-Fissure-Balance-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a0903b561f9bdaf0e8.png)

[trans]

## 概述

狮子裂缝均衡策略是一个基于均线交叉的简单短线交易策略。该策略主要运用两个移动平均线,当快速移动平均线从下方穿过慢速移动平均线的时候,做多;当快速移动平均线从上方穿过慢速移动平均线的时候,平仓。策略名称取自交易界流行的“狮子裂缝”术语,寓意捕捉短线价格的微小动作,在狭小的均线裂缝中获利。

## 策略原理  

该策略使用两个移动平均线:快速移动平均线小MAPeriod和慢速移动平均线bigMAPeriod。两条移动平均线构成价格通道,通道下沿为快速移动平均线,通道上沿为慢速移动平均线。当价格从下向上突破通道下沿快速移动平均线时,做多;当价格从上向下跌破通道上沿慢速移动平均线时,平仓。

具体来说,策略首先计算快速移动平均线smallMA和慢速移动平均线bigMA。然后计算通道下沿买入线buyMA,它是慢速移动平均线的(100 - percentBelowToBuy)%。当快速移动平均线smallMA从下方向上穿过买入线buyMA时,做多;当盈利达到1%或者未盈利但持仓7根K线后,平仓。

综上,该策略捕捉均线的“狮子裂缝”,也就是突破通道下沿的机会,以期实现短线获利。它同时设置了止盈和止损条件,控制单笔交易的风险。

## 优势分析

该策略具有以下优势:

1. 概念简单,容易理解和实现。使用双均线交叉是最基础的技术指标策略。

2. 回测容易。该策略直接使用TradingView自带的回测功能,无需额外实现。

3. 可视化强大。使用TradingView可直接在图表上展示交易信号点和回测统计数据。

4. 风险可控。策略设置了止盈和止损条件,可以有效控制单笔交易的损失。

5. 灵活调整。用户可以根据自己的需要调整均线参数和 andere 技术指标,使策略更契合不同品种和交易风格。

## 风险分析

该策略也存在以下风险:

1. 可能产生过多信号。双均线策略容易在盘整时产生多次错乱信号。

2. 单一指标依赖。仅使用均线交叉作决策,忽视了其他因素,信号质量可能较差。

3. 参数优化难度大。优化均线周期参数组合需要大量计算,不易找到最佳参数。

4. 回测偏差。简单的双均线策略回测效果往往优于实盘。

5. 止损困难。设置固定止损点位难以适应行情的变化。

## 优化方向

该策略可以从以下方面进行优化:

1. 结合其他指标过滤信号,如交易量、波动率等,避免在盘整中产生无效信号。

2. 增加基于趋势的判断,避免逆势交易。可以加入 longer 周期均线判断趋势方向。

3. 使用机器学习寻找最优参数。使用序贯参数优化或遗传算法自动寻找较优参数组合。

4. 增加止损策略,如追踪止损、移动止损等,使止损更具弹性。

5. 优化入场时机。可以使用其他指标识别更有效的入场时点。

6. 结合量化研究对参数组合进行回测优化,提高稳定性。

7. 开发自动交易系统,利用程序化交易进行参数组合优化与策略评估。

## 总结

狮子裂缝均衡策略是一个非常适合新手学习的入门策略。它运用简单的双均线交叉原理,设置止盈止损规则,可以捕捉短线价格波动。该策略易于理解实现,具有良好的回测效果。但其优化难度较大,实盘效果存疑。我们可以通过引入其他技术指标、优化参数以及开发自动交易系统等方式对该策略进行改进。总体而言,狮子裂缝均衡策略为量化交易初学者提供了一个非常好的学习平台。

||


## Overview

The Lion Fissure Balance strategy is a simple short-term trading strategy based on moving average crossovers. It mainly uses two moving averages - when the fast MA crosses above the slow MA from below, go long; when the fast MA crosses below the slow MA from above, close the position. The strategy name comes from the popular trading jargon "Lion Fissure", implying capturing minor price actions and profiting from the narrow gap between MAs.

## Strategy Logic

The strategy uses two moving averages: a fast MA (smallMAPeriod) and a slow MA (bigMAPeriod). The two MAs form a price channel, with the fast MA as the channel base and the slow MA as the channel ceiling. When price breaks above the channel base upwards, go long; when price breaks the channel ceiling downwards, close position. 

Specifically, the strategy first calculates the fast MA (smallMA) and slow MA (bigMA). It then calculates the buy line (buyMA), which is (100 - percentBelowToBuy)% of the slow MA. When the fast MA crosses above the buy line upwards, go long; when reaching 1% profit or holding 7 bars without profit, close position.

In summary, the strategy aims to capture the "Lion Fissure" between MAs for short-term profits. It also sets profit taking and stop loss conditions to control per trade risk.

## Advantage Analysis

The strategy has the following advantages:

1. Simple concept easy to understand and implement. Dual MA crossovers are the most basic technical indicator strategy.

2. Easy backtesting. The strategy directly uses TradingView built-in backtester without extra implementation. 

3. Powerful visualization. TradingView can directly show trade signals and statistical data on charts.

4. Controllable risk. The strategy sets profit taking and stop loss conditions to effectively control per trade loss. 

5. Flexible customization. Users can adjust MA parameters and other indicators to suit different products and trading styles.

## Risk Analysis

The strategy also has the following risks:

1. Potentially excessive signals. Dual MA strategies tend to generate false signals during consolidations.

2. Single indicator reliance. Using only MA crosses ignores other factors, potentially resulting in poor signal quality.

3. Difficult parameter optimization. Finding the optimal MA combination requires extensive computation.

4. Backtest bias. Simple dual MA strategies often perform better in backtests than live trading.

5. Difficult stop loss. Fixed stop loss levels may fail to adapt to changing market conditions.

## Optimization Directions

The strategy can be improved from the following aspects:

1. Add other filters like volume and volatility to avoid ineffective signals during consolidations.

2. Incorporate trend bias to avoid counter-trend trading. Longer-period MAs can be added to determine trend direction.

3. Use machine learning to find optimal parameters, like sequential parameter optimization or genetic algorithms.

4. Enhance stop loss strategies, like trailing stop loss and adaptive stop loss for better flexibility.

5. Optimize entry timing using other indicators to identify higher probability entry points.

6. Conduct quantitative research and backtesting to improve stability of optimized parameter sets.

7. Develop automated trading systems to systematically optimize and evaluate parameter combinations.

## Conclusion

The Lion Fissure Balance strategy is an excellent starter strategy for beginners to learn. It applies the simple dual MA crossover logic and sets profit taking and stop loss rules to capture short-term price swings. The strategy is easy to understand and implement, and shows good backtest results. However, it suffers from optimization difficulty and questionable live performance. We can improve the strategy by incorporating other indicators, optimizing parameters, and developing automated trading systems. Overall, the Lion Fissure Balance strategy provides a great learning platform for quantitative trading beginners.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|2|Small Moving Average|
|v_input_3|8|Big Moving Average|
|v_input_4|true|Percent below to buy %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-02 00:00:00
end: 2023-11-01 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © TraderHalai
// This script was born out of my quest to be able to display strategy back test statistics on charts to allow for easier backtesting on devices that do not natively support backtest engine (such as mobile phones, when I am backtesting from away from my computer). There are already a few good ones on TradingView, but most / many are too complicated for my needs.
//
//Found an excellent display backtest engine by 'The Art of Trading'. This script is a snippet of his hard work, with some very minor tweaks and changes. Much respect to the original author.
//
//Full credit to the original author of this script. It can be found here: https://www.tradingview.com/script/t776tkZv-Hammers-Stars-Strategy/?offer_id=10&aff_id=15271
//
// This script can be copied and airlifted onto existing strategy scripts of your own, and integrates out of the box without implementation of additional functions. I've also added Max Runup, Average Win and Average Loss per trade to the orignal script.
//
//Will look to add in more performance metrics in future, as I further develop this script.
//
//Feel free to use this display panel in your scripts and strategies.

//Thanks and enjoy! :)
//@version=5
// strategy("Strategy BackTest Display Statistics - TraderHalai", overlay=true, default_qty_value= 5, default_qty_type = strategy.percent_of_equity, initial_capital=10000,  commission_type=strategy.commission.percent, commission_value=0.1)

//DEMO basic strategy - Use your own strategy here -  Jaws Mean Reversion from my profile used here
source = input(title = "Source", defval = close)
smallMAPeriod = input(title = "Small Moving Average", defval = 2)
bigMAPeriod = input(title = "Big Moving Average", defval = 8)
percentBelowToBuy = input(title = "Percent below to buy %", defval = 1)

smallMA = ta.sma(source, smallMAPeriod)
bigMA =  ta.sma(source, bigMAPeriod) 
buyMA = ((100 - percentBelowToBuy) / 100) * ta.sma(source, bigMAPeriod)[0]

buy = ta.crossunder(smallMA, buyMA)
if(buy)
    strategy.entry("BUY", strategy.long)

if(strategy.openprofit >= strategy.position_avg_price * 0.01) // 1% profit target
    strategy.close("BUY")

if(ta.barssince(buy) >= 7) //Timed Exit, if you fail to make 1 percent in 7 candles.
    strategy.close("BUY")
    
///////////////////////////// --- BEGIN TESTER CODE --- ////////////////////////
// COPY below into your strategy to enable display
////////////////////////////////////////////////////////////////////////////////

// strategy.initial_capital = 50000
// // Declare performance tracking variables
// drawTester = input.bool(true, "Draw Tester")
// var balance = strategy.initial_capital
// var drawdown = 0.0
// var maxDrawdown = 0.0
// var maxBalance = 0.0
// var totalWins = 0
// var totalLoss = 0

// // Prepare stats table
// var table testTable = table.new(position.top_right, 5, 2, border_width=1)
// f_fillCell(_table, _column, _row, _title, _value, _bgcolor, _txtcolor) =>
//     _cellText = _title + "\n" + _value
//     table.cell(_table, _column, _row, _cellText, bgcolor=_bgcolor, text_color=_txtcolor)
    
// // Custom function to truncate (cut) excess decimal places
// truncate(_number, _decimalPlaces) =>
//     _factor = math.pow(10, _decimalPlaces)
//     int(_number * _factor) / _factor
    
// // Draw stats table
// var bgcolor = color.new(color.black,0)
// if drawTester
//     if barstate.islastconfirmedhistory
//         // Update table
//         dollarReturn = strategy.netprofit
//         f_fillCell(testTable, 0, 0, "Total Trades:", str.tostring(strategy.closedtrades), bgcolor, color.white)
//         f_fillCell(testTable, 0, 1, "Win Rate:", str.tostring(truncate((strategy.wintrades/strategy.closedtrades)*100,2)) + "%", bgcolor, color.white)
//         f_fillCell(testTable, 1, 0, "Starting:", "$" + str.tostring(strategy.initial_capital), bgcolor, color.white)
//         f_fillCell(testTable, 1, 1, "Ending:", "$" + str.tostring(truncate(strategy.initial_capital + strategy.netprofit,2)), bgcolor, color.white)
//         f_fillCell(testTable, 2, 0, "Avg Win:", "$"+ str.tostring(truncate(strategy.grossprofit / strategy.wintrades, 2)), bgcolor, color.white)
//         f_fillCell(testTable, 2, 1, "Avg Loss:", "$"+ str.tostring(truncate(strategy.grossloss / strategy.losstrades, 2)), bgcolor, color.white)
//         f_fillCell(testTable, 3, 0, "Profit Factor:", str.tostring(truncate(strategy.grossprofit / strategy.grossloss,2)), strategy.grossprofit > strategy.grossloss ? color.green : color.red, color.white)
//         f_fillCell(testTable, 3, 1, "Max Runup:",  str.tostring(truncate(strategy.max_runup, 2 )), bgcolor, color.white)
//         f_fillCell(testTable, 4, 0, "Return:", (dollarReturn > 0 ? "+" : "") + str.tostring(truncate((dollarReturn / strategy.initial_capital)*100,2)) + "%", dollarReturn > 0 ? color.green : color.red, color.white)
//         f_fillCell(testTable, 4, 1, "Max DD:", str.tostring(truncate((strategy.max_drawdown / strategy.equity) * 100 ,2)) + "%", color.red, color.white)
// // --- END TESTER CODE --- ///////////////
```

> Detail

https://www.fmz.com/strategy/430893

> Last Modified

2023-11-02 16:55:00
