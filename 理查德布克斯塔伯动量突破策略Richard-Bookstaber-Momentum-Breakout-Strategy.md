
> Name

理查德布克斯塔伯动量突破策略Richard-Bookstaber-Momentum-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6e0be50af68a063a3b.png)
[trans]


### 概述

动量突破策略基于理查德·布克斯塔伯在1984年提出的概念,即一旦出现大的波动,市场往往会持续这个方向运行。因此,该策略使用ATR来测量波动性,当收盘价变化超过ATR倍数阈值时,发出交易信号。

### 策略原理

该策略首先计算ATR指标来测量市场波动性。然后计算每日收盘价变化的绝对值。当收盘价变化超过ATR指标值的若干倍时,产生交易信号。具体来说,如果收盘价上涨幅度大于ATR上轨,做多;如果收盘价下跌幅度大于ATR上轨,做空。

该策略利用ATR指标来动态确定突破阈值。当市场波动加大时,阈值会上升,可以减少错误交易。当市场波动减小时,阈值会下降,可以及时捕捉突破机会。

### 优势分析

- 动态ATR止损可以有效控制风险,使止损点随市场波动性变化。
- 利用突破产生交易信号,可以抓住市场趋势的轮换。  
- 参数优化空间大,可以针对不同品种和周期进行调整。
- 策略思路简单清晰,容易理解和实现。

### 风险分析

- ATR指标对突发事件反应迟缓,可能错过首次突破。  
- 多空平衡性差,只做多或只做空时效果明显好于双向交易。
- 策略参数容易过优化,实际效果可能不佳。
- 交易频繁,交易成本可能较高。

可以考虑结合其他指标筛选交易时机,提高效率。也可以针对品种特点选择更优参数。使用马丁格尔算法等技术控制交易频率。

### 优化方向 

- 可以考虑结合其他指标判断趋势方向,避免错误交易。例如RSI、MACD等。
- 可以添加仓位管理模块,根据市场情况调整仓位。
- 可以针对不同的品种选择最优的参数组合。
- 可以结合机器学习技术自动优化参数。

### 总结

动量突破策略简单直接,利用突破产生交易信号。ATR止损使其可以适应市场的波动性。该策略依靠参数优化可以获得不错的效果。但也存在一些问题,如错过首次突破、频繁交易等。这需要进一步结合其他技术进行改进,才能在复杂的市场中稳定获利。总体来说,动量突破策略思路清晰,值得进一步研究与应用。

||


### Overview

The momentum breakout strategy is based on the concept proposed by Richard Bookstaber in 1984 that once there is a big volatile movement, the market tends to follow it. Thus, it uses the ATR to measure volatility and issues orders when the current change in the closing price exceeds the threshold calculated by multiplying the ATR by a configurable constant.  

### Strategy Logic

The strategy first calculates the ATR indicator to measure market volatility. Then it calculates the absolute value of the daily closing price change. When the closing price change exceeds the ATR value by several multiples, trading signals are generated. Specifically, if the closing price rises more than the ATR upper rail, go long; if the closing price falls more than the ATR upper rail, go short.

The strategy uses the ATR indicator to dynamically determine the breakout threshold. When market volatility increases, the threshold will rise to reduce erroneous trades. When market volatility decreases, the threshold will decrease to capture breakout opportunities in a timely manner.

### Advantage Analysis

- Dynamic ATR stop loss can effectively control risks with adaptive stop loss based on market volatility.
- Using breakouts to generate trading signals can capture market trend rotations.
- Large parameter optimization space, can be adjusted for different products and cycles.
- The strategy logic is simple and clear, easy to understand and implement.

### Risk Analysis  

- ATR indicator reacts slowly to sudden events, may miss the initial breakout.
- Imbalanced between long and short, works significantly better for one side only than for two-way trading.
- Strategy parameters are easy to overfit, actual results may be poor. 
- Frequent trading, transaction costs may be high.

Consider combining other indicators to select trading opportunities to improve efficiency. Also select optimal parameters based on product characteristics. Use techniques like Martingale to control trading frequency.

### Optimization Directions

- Consider combining other indicators like RSI, MACD to determine trend direction and avoid wrong trades.
- Can add position management module to adjust positions based on market conditions.
- Can select optimal parameter sets for different products. 
- Can combine machine learning techniques to auto-optimize parameters.

### Summary

The momentum breakout strategy is simple and direct, generating trading signals from breakouts. ATR stop loss allows it to adapt to market volatility. The strategy relies on parameter optimization for decent results. But there are also some problems like missing initial breakouts, frequent trading, etc. Further improvements by combining with other techniques are needed for stable profits in complex markets. Overall, the momentum breakout strategy has clear logic and is worth further research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|Average length|
|v_input_float_1|2|Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-26 00:00:00
end: 2023-11-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © EduardoMattje

//@version=5
strategy("Volatility System", overlay=false, margin_long=0, margin_short=0, default_qty_type=strategy.percent_of_equity, 
 default_qty_value=100, process_orders_on_close=true, initial_capital=20000)

// Inputs

var averageLength = input.int(14, "Average length", 2)
var multiplier = input.float(2.0, "Multiplier", 0.0, step=0.1)

// Calculations

atr = ta.atr(averageLength) * multiplier
closingChange = ta.change(close, 1)

atrPenetration(int signal) =>
    res = closingChange * signal > atr[1]

longCondition = atrPenetration(1)
shortCondition = atrPenetration(-1)

// Order calls

if (longCondition)
    strategy.entry(strategy.direction.long, strategy.long)

if (shortCondition)
    strategy.entry(strategy.direction.short, strategy.short)

// Visuals

plot(atr, "ATR", color.white, 2)
plot(math.abs(closingChange), "Absolute close change", color.red)

```

> Detail

https://www.fmz.com/strategy/430857

> Last Modified

2023-11-02 15:12:46
