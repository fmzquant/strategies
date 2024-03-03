
> Name

EMA黄金交叉短线交易策略EMA-Golden-Cross-Short-term-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1e9c30f6d9c309cc0fe.png)
 [trans]

## 概述

该EMA黄金交叉短线交易策略是基于EMA指标的短线交易策略。它使用不同周期的EMA线进行金叉和死叉交易信号判断,采用较短周期EMA线作为入市信号,较长周期EMA线作为止损信号,实现快进快出的短线交易模式。

## 策略原理  

该策略使用4条不同周期的EMA均线,具体为9周期、26周期、100周期和55周期的EMA线。交易入场信号是9周期EMA线上穿26周期EMA线时做多;止损退出信号是100周期EMA线下穿55周期EMA线时平仓。这样快进快出,避免被套。

## 优势分析

1. 使用EMA指标判断趋势具有可靠性,避免假信号。
2. 采用不同周期EMA的金叉死叉组合,可以捕捉短线机会。  
3. 快进快出的短线交易方式,避免长时间承担亏损。

## 风险分析  

1. EMA线本身存在滞后性,可能错过最佳入场时机。
2. 短周期交易容易增加交易频率和手续费负担。
3. 短线交易对交易者的心理控制能力要求较高。

## 优化方向  

1. 可以调整EMA线的周期参数,优化获利能力。
2. 可以加入其他指标过滤信号,提高交易胜率。 
3. 可以设置止损止盈条件,控制单笔交易风险。

## 总结  

该EMA黄金交叉短线交易策略整体来说具有简单易操作、快速响应的特点。通过参数优化和信号过滤,可以进一步提升其稳定性和盈利水平。但短线交易对交易者的控制能力也提出了更高要求。总体而言,该策略适合有一定交易经验的投资者实盘运用。

||


## Overview

The EMA golden cross short-term trading strategy is a short-term trading strategy based on the EMA indicator. It uses EMA lines of different cycles to judge golden cross and dead cross trading signals, adopts shorter cycle EMA lines as entry signals, and longer cycle EMA lines as stop loss signals to realize a fast in and fast out short-term trading mode.

## Strategy Principle 

The strategy uses 4 EMA lines of different cycles, specifically 9, 26, 100 and 55 cycle EMA lines. The entry signal is to go long when the 9 cycle EMA line crosses over the 26 cycle EMA line; The exit stop loss signal is to close positions when the 100 cycle EMA line crosses below the 55 cycle EMA line. This allows fast entry and fast exit to avoid being trapped.

## Advantage Analysis

1. Using the EMA indicator to determine trends is reliable to avoid false signals.
2. Adopting EMA combos of different cycles can capture short-term opportunities.
3. The fast in and fast out short-term trading method avoids long-term bearing of losses.

## Risk Analysis   

1. EMA lines themselves have laggingness which may miss the best entry timing.  
2. Short-term trading can easily increase trading frequency and commission burdens.
3. Short-term trading requires higher psychological control skills from traders.

## Optimization Directions

1. EMA line cycle parameters can be adjusted to optimize profitability.
2. Other indicators can be added to filter signals and improve win rate.
3. Stop loss and take profit conditions can be set to control single trade risks.

## Summary   

In general, the EMA golden cross short-term trading strategy has the characteristics of simplicity, ease of operation and quick response. Through parameter optimization and signal filtering, its stability and profit level can be further improved. But short-term trading also raises higher requirements for traders' control capabilities. In conclusion, this strategy is suitable for investors with some trading experience to use in live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|9|EMA_L|
|v_input_int_2|26|EMA_L2|
|v_input_int_3|100|EMA_S|
|v_input_int_4|55|EMA_S2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-07 00:00:00
end: 2023-12-14 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © YukalMoon

//@version=5
strategy(title="EMA SCALPEUR", overlay=true, initial_capital = 1000)


//// input controls

EMA_L = input.int (title = "EMA_L", defval = 9, minval = 1, maxval = 100, step =1)
EMA_L2 = input.int (title = "EMA_L2", defval = 26, minval = 1, maxval = 100, step =1)
EMA_S = input.int (title = "EMA_S", defval = 100, minval = 1, maxval = 100, step =1)
EMA_S2 = input.int (title = "EMA_S2", defval = 55, minval = 1, maxval = 100, step =1)


/// mise en place de ema

shortest = ta.ema(close, 9)
short = ta.ema(close, 26)
longer = ta.ema(close, 100)
longest = ta.ema(close, 55)

plot(shortest, color = color.red)
plot(short, color = color.orange)
plot(longer, color = color.aqua)
plot(longest, color = color.yellow)

plot(close)

//// trading indicators

EMA1 = ta.ema (close,EMA_L)
EMA2 = ta.ema (close,EMA_L2)
EMA3 = ta.ema (close, EMA_S)
EMA4 = ta.ema (close, EMA_S2)


buy = ta.crossover(EMA1, EMA2)
//sell = ta.crossunder(EMA1, EMA2)

buyexit = ta.crossunder(EMA3, EMA4)
//sellexit = ta.crossover(EMA3, EMA4)

/////strategy

strategy.entry ("long", strategy.short, when = buy, comment = "ENTER-SHORT")
//strategy.entry ("short", strategy.short, when = sell, comment = "ENTER-SHORT")


///// market exit

strategy.close ("long", when = buyexit, comment = "EXIT-SHORT")
//strategy.close ("short",  when = sellexit, comment = "EXIT-SHORT")












```

> Detail

https://www.fmz.com/strategy/435477

> Last Modified

2023-12-15 11:16:18
