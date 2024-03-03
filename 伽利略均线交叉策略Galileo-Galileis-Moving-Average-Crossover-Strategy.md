
> Name

伽利略均线交叉策略Galileo-Galileis-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1206dde7851f7e1f48b.png)
[trans]

## 概述

伽利略均线交叉策略是一种基于移动平均线的交易策略。该策略通过计算一定周期的指数移动平均线,并与价格进行交叉比较,产生交易信号。当价格从上方向下跌破均线时,产生卖出信号;当价格从下方向上突破均线时,产生买入信号。该策略名称来源于伽利略·伽利莱

## 策略原理

伽利略均线交叉策略的核心是指数移动平均线(EMA)。EMA是一种趋向于给予最近价格更大权重的移动平均线算法。它的计算公式是:

EMA今天 = (收盘价今天×平滑常数) + (EMA昨天×(1-平滑常数))

其中,平滑常数α=(2/(周期数+1))。

该策略通过用户输入的周期长度,实时计算EMA值。然后将价格与EMA进行比较,判断二者的交叉情况,作为买入和卖出信号:

1. 当价格从上方向下跌破EMA时,产生卖出信号,进行短线操作。

2. 当价格从下方向上突破EMA时,产生买入信号,进行做多操作。

该策略同时绘制EMA线,以及标记出买卖信号的箭头。

## 优势分析

伽利略均线交叉策略具有以下优势:

1. 思路简单,容易理解和实现,适合初学者。
2. 通过EMA的使用,能够更快速地响应价格变化。
3. 交叉产生信号清晰,不会出现频繁买卖。
4. 可以通过调整EMA参数,适应不同市场环境。
5. 进入和退出信号明确,控制风险。

## 风险分析

伽利略均线交叉策略也存在以下风险:

1. 在价格剧烈波动时,会出现较多假信号,影响效果。可以设置止损策略进行优化。
2. 单一指标易受到作假行为的影响,出现信号失效。可以加入附加指标进行优化。
3. 存在一定程度的滞后,特别是在突发事件发生后。可以测试缩短均线参数。
4. 无法适应价格长期持续的单边行情。这是均线策略的共性缺点。

## 优化方向 

伽利略均线交叉策略可以从以下几个方向进行优化:

1. 结合其他指标,构建复合策略,避免假信号,提高稳定性。例如加入成交量,趋势指标等。

2. 增加止损策略,设置移动止损或百分比止损,控制单笔损失。

3. 测试EMA不同参数的效果,选择最佳参数组合。也可以测试其他类型的移动平均线。

4. 评估加入重新进场机制,在价格反转后再次进场,提高盈利率。

## 总结

伽利略均线交叉策略是一种简单实用的交易策略,思路清晰,易于操作,适合量化交易的初学者。在不断优化和改进下,相信其效果会越来越好,值得推荐。

||

## Overview

Galileo Galilei's moving average crossover strategy is a trading strategy based on moving averages. It generates trading signals by calculating the exponential moving average (EMA) over a specified period and comparing crossovers between the EMA and price. Sell signals are generated when the price drops below the EMA from the top down, while buy signals occur when the price breaks above the EMA from the bottom up.

## Strategy Logic

The core of Galileo Galilei's strategy lies in the exponential moving average (EMA). EMA is a type of moving average that places more weight on recent prices. Its calculation formula is:

EMA today = (Closing price today × Smoothing factor) + (EMA yesterday × (1 − Smoothing factor))

Where the smoothing factor α = (2/(number of periods + 1))

The strategy dynamically calculates the EMA based on user input period parameters. It then compares the crossovers between price and EMA to determine trading signals:  

1. When price drops below the EMA from the top down, a sell signal is generated for short trading.

2. When price breaks above the EMA from below, a buy signal is triggered for long trading.

The strategy also plots the EMA line on the chart, along with arrow markers indicating buy and sell signals.

## Advantage Analysis 

Galileo Galilei's moving average crossover strategy has the following advantages:

1. Simple logic that is easy to understand and implement, suitable for beginners.  
2. Faster response to price changes through the use of EMA.
3. Clear crossover signals without excessive whipsaws.  
4. Flexibility to adapt to different market environments by adjusting EMA parameters.
5. Defined entry and exit signals provide risk control.

## Risk Analysis

Potential risks of this strategy include:

1. More false signals may occur during high price volatility. A stop loss strategy could help optimize.
2. Reliance on a single indicator makes it vulnerable to price manipulation. Additional indicators may improve robustness.   
3. Lagging effect, especially after sudden events. Shortening EMA periods could help.
4. Unable to adapt to prolonged one-sided price trends, a common limitation among moving average strategies.

## Optimization Directions

Some ways to optimize the strategy:

1. Incorporate other indicators to construct a composite strategy for increased robustness against false signals. Examples include volume, trend indicators etc.

2. Add stop loss mechanisms like trailing stop loss or percentage-based stop loss to control single-trade loss amount.

3. Test EMAs with different parameter combinations to find optimal settings. Other moving average types could also be evaluated.  

4. Assess re-entry logic to capture rebounds after initial price reversals, improving profitability.

## Conclusion

Galileo Galilei's moving average crossover is a simple yet practical strategy with clear logic and easy operability. It is suitable for novice quant traders. With continuous improvements, its performance could become increasingly superior over time.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|11|Length|
|v_input_2_open|0|Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|true|From Day|
|v_input_4|true|From Month|
|v_input_5|2020|From Year|
|v_input_6|true|To Day|
|v_input_7|12|To Month|
|v_input_8|2021|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-11 00:00:00
end: 2023-12-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © armigoldman

//@version=3
strategy(title="Galileo Galilei", shorttitle="Galileo Galilei", overlay=true, initial_capital = 100000, default_qty_type=strategy.cash, default_qty_value = 100000)
len = input(11, minval=1, title="Length")
src = input(open, title="Source")
out = ema(src, len)
plot(out, title="EMA", color=yellow)
//last8h = highest(close, 8)
//lastl8 = lowest(close, 8)

//plot(last8h, color=red, linewidth=2)
//plot(lastl8, color=green, linewidth=2)

////////////////////////////////////////////////////////////////////////////////
// BACKTESTING RANGE

// From Date Inputs
fromDay = input(defval=1, title="From Day", minval=1, maxval=31)
fromMonth = input(defval=1, title="From Month", minval=1, maxval=12)
fromYear = input(defval=2020, title="From Year", minval=1970)

// To Date Inputs
toDay = input(defval=1, title="To Day", minval=1, maxval=31)
toMonth = input(defval=12, title="To Month", minval=1, maxval=12)
toYear = input(defval=2021, title="To Year", minval=1970)

// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true


bearish = cross(close, out) == 1 and close[1] > close
bullish = cross(close, out) == 1 and close[1] < close

plotshape(bearish, color=white, style=shape.arrowdown, text="BEAR", location=location.abovebar)
plotshape(bullish, color=white, style=shape.arrowup, text="BULL", location=location.belowbar)

buy = if cross(close, out) == 1 and close[1] < close
    strategy.entry("BUY", strategy.long, when=time_cond)
        //strategy.close_all(when=bearish)
        // strategy.exit("exit", "Long", profit =, loss = 35)


sell = if cross(close, out) == 1 and close[1] > close
    strategy.entry("SELL", strategy.short, when=time_cond)
        //sell = if bearish
        //strategy.close_all(when=bullish)
        // strategy.exit("exit", "Long", profit = bullish, loss = 100)

profit = strategy.netprofit
if not time_cond
    strategy.close_all()

//plotshape(true, style=shape.triangleup, location=location.abovebar)

```

> Detail

https://www.fmz.com/strategy/435717

> Last Modified

2023-12-18 12:07:07
