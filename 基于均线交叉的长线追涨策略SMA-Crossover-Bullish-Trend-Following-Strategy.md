
> Name

基于均线交叉的长线追涨策略SMA-Crossover-Bullish-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10f981ad1cbdc4f634f.png)
[trans]
## 概述

本策略是一个基于简单移动平均线(SMA)交叉的长线追涨策略。它通过计算不同周期的SMA,在短期SMA上穿长期SMA时生成买入信号,进行追涨操作。同时,它也会根据进入价格的一定比例来设置止盈止损位,对仓位进行风险管理。

## 策略原理

该策略主要基于SMA指标的“金叉”交叉信号来判断入市时机。具体来说,它分别计算9日线和21日线这两个不同周期的SMA。当短期的9日线从下方上穿较长期的21日线时,表示股价从盘整阶段进入升浪阶段,属于追涨的良好时机点,这时策略会生成买入信号,进行追涨操作。

此外,策略还会根据入场价格的1.5%和1%这两个比例来动态设置止盈位和止损位。也就是说,止盈位置会比入场价格高1.5%,止损位置会比入场价格低1%。通过这种方式,可以对仓位进行设定盈亏比的风险管理。

## 策略优势

- 使用SMA指标判断入场时机,滤除短期市场噪音,捕捉中长线走势。
- 周期参数可调,可以通过调整周期来适应不同波段的行情。  
- 风险管理机制完善,可以通过调整盈亏比来控制单笔损失。
- 实现简单,容易理解,适合量化交易的初学者。

## 风险及解决方案

- SMA交叉信号可能出现假突破,导致不必要的亏损。可以结合其他指标过滤信号。
- 止盈止损位置比较单一,可能出现预期止盈而实际亏损的情况。可以考虑动态追踪止盈止损位。 
- 盈亏比固定设置,无法根据市场波动性调整。可以结合ATR指标动态设置盈亏比。
- 存在一定的时间滞后问题。可以考虑减少SMA的周期参数,或者引入其他先导指标。

## 优化方向

- 增加其他指标过滤SMA交叉信号,避免假突破。例如KDJ指标、波动率指标等。
- 动态追踪止盈止损位。例如运用Chandelier Exit算法。
- 利用ATR指标等根据市场波动率动态调整盈亏比。
- 减少SMA周期或引入其他先导指标,降低滞后性。

## 总结

本策略是一个基于SMA交叉的中长线追涨策略。它使用SMA指标判断行情趋势,设置止盈止损控制风险。优点是简单易行,适合量化交易的初学者。同时也存在一些可优化空间,如增加其他指标过滤信号、动态追踪止盈止损以及根据市场波动率调整盈亏比等。通过不断优化,可以使策略更稳健,适应更多市场环境。

||

## Overview

This strategy is a long-term trend following strategy based on the crossover of Simple Moving Averages (SMA). It generates buy signals when the short period SMA crosses over the long period SMA and follows the uptrend. At the same time, it also sets take profit and stop loss based on certain percentages of the entry price to manage risks.

## Strategy Logic

The strategy mainly uses the "golden cross" crossover signals of the SMA indicator to determine entry timing. Specifically, it calculates the 9-period and 21-period SMA respectively. When the short term 9-period SMA crosses over the longer term 21-period SMA from below, it indicates the price is shifting from consolidation to an uptrend, which is a good timing for trend following. The strategy will then generate a buy signal to follow the trend.  

In addition, the strategy also dynamically sets the take profit and stop loss based on 1.5% and 1% of the entry price. That means the take profit will be 1.5% above the entry price and the stop loss will be 1% below. Through this approach, it manages risks by setting a predefined risk-reward ratio.

## Advantages

- Using SMA to determine entry filters out short-term market noise and catches mid-long term trends.
- The SMA periods are adjustable and can be tuned to adapt to trends over different time horizons.
- The risk management mechanism is comprehensive and can control single trade loss by adjusting risk-reward ratio. 
- The strategy is simple to understand, suitable for beginners in quantitative trading.

## Risks and Solutions

- SMA crossover signals may have false breakouts, causing unnecessary losses. Other indicators can be used to filter the signals.
- The take profit and stop loss are relatively fixed, which may lead to expected profit but actual loss. Consider dynamically trailing take profit and stop loss.
- The risk-reward ratio is fixed and cannot adapt to changing market volatility. Consider using ATR and other indicators to dynamically adjust risk-reward levels.  
- There is a certain time lag. Can consider reducing SMA periods or introducing leading indicators.  

## Enhancement Opportunities 

- Add other indicators to filter SMA crossover signals and avoid false signals, e.g. KDJ, volatility indicators etc.
- Dynamically trail take profit and stop loss, e.g. using Chandelier Exit algorithms.
- Use ATR and other indicators to dynamically adjust risk-reward ratio based on market volatility. 
- Reduce SMA periods or introduce leading indicators to lower time lags.

## Conclusion
This is a medium-long term trend following strategy based on SMA crossover. It identifies trends with SMA and controls risks by setting take profit and stop loss. The advantage is it is simple and easy to implement, suitable for beginners in quantitative trading. Meanwhile, there are also rooms for enhancement, such as adding other signal filters, trailing take profit/stop loss dynamically, adjusting risk-reward ratios based on volatility etc. Through continuous improvements, the strategy can become more robust and adapt to more market environments.  
[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-28 00:00:00
end: 2024-02-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Masterdata

//@version=5
strategy("Simple MA Crossover Long Strategy v5", overlay=true)

// Define the short and long moving averages
shortMa = ta.sma(close, 9)
longMa = ta.sma(close, 21)

// Plot the moving averages on the chart
plot(shortMa, color=color.green)
plot(longMa, color=color.orange)

// Generate a long entry signal when the short MA crosses over the long MA
longCondition = ta.crossover(shortMa, longMa)
if (longCondition)
    strategy.entry("Long", strategy.long)

// Define the take profit and stop loss as a percentage of the entry price
takeProfitPerc = 1.5 / 100 // Take profit at 1.5% above entry price

stopLossPerc = 1.0 / 100 // Stop loss at 1.0% below entry price

// Calculate the take profit and stop loss price levels dynamically
takeProfitLevel = strategy.position_avg_price * (1 + takeProfitPerc)
stopLossLevel = strategy.position_avg_price * (1 - stopLossPerc)

// Set the take profit and stop loss for the trade
if (longCondition)
    strategy.exit("Take Profit/Stop Loss", "Long", limit=takeProfitLevel, stop=stopLossLevel)
```

> Detail

https://www.fmz.com/strategy/440978

> Last Modified

2024-02-04 14:56:00
