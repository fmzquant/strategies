
> Name

反转型布林带通道震荡趋势策略Bollinger-Bands-Reversal-Oscillation-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11fded547fd60513c19.png)
[trans]

## 概述

这是一个基于布林带通道的反转型震荡趋势策略。它利用布林带上下通道作为趋势判断,并在价格接近通道边界时寻找反转机会入场。

## 策略原理

该策略使用布林带指标作为主要技术指标。布林带由n日移动平均线及其上下波动范围构成,布林带上轨=n日移动平均线 + m×n日标准差,布林带下轨=n日移动平均线 - m×n日标准差。其中n和m为参数。 

当价格接近上轨时,表示当前处于上升趋势,但是可能会触顶反转;当价格接近下轨时,表示当前处于下跌趋势,但是可能会触底反转。这时候如果有效突破布林带上下轨,则可能开始反转。

本策略的具体交易规则如下:

1. 当收盘价大于布林带上轨时,做多入场;当收盘价小于布林带下轨时,做空入场。

2. 止盈止损以n日移动平均线为信号。当多单收盘价下破n日均线时止盈出场;当空单收盘价上破n日均线时止损出场。 

3. 采用固定交易量,每次交易数值固定。

4. 采用固定比率资金管理法,设定固定盈亏比率和订单调整幅度。当实现固定比率盈利时按固定幅度增加仓位,当亏损时减少仓位。

## 优势分析

该策略具有以下优势:

1. 使用布林带通道判断趋势方向,采取逆势交易策略,在价格可能反转的时间点入场,避开大部分震荡,提高胜率。

2. 移动平均线作为止盈止损信号较为可靠,可以锁定大部分利润。

3. 固定交易量策略简单易行,不需要复杂计算。

4. 固定比率资金管理策略可以通过仓位调整扩大盈利同时控制风险。

## 风险分析

该策略也存在一定风险:

1. 布林带判断产生错误信号的概率存在,可能在趋势中反向做单亏损。

2. 移动平均线滞后性可能导致止盈不够充分。

3. 固定交易量无法根据市场情况调整仓位,存在仓位过大过小的问题。

4. 固定比率资金管理方法扩大仓位幅度较大,可能导致亏损扩大。

对策:优化布林带参数,提高信号准确率;结合其他指标判断趋势;适当缩小固定仓位大小;降低固定比率资金管理的仓位调整幅度。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 优化布林带的参数,如调整n值和m值,提高布林带通道判断准确性。

2. 增加其他指标判断,如MACD,KD等,避免布林带错误信号。

3. 将固定交易量调整为动态交易量,根据市场情况灵活调整仓位。

4. 降低固定比率资金管理法的仓位调整幅度,优化资金曲线。

5. 添加止损策略,如移动止损、区间突破止损等,进一步控制风险。

6. 进行参数优化,自动优化参数组合,寻找最佳参数对策略进行优化。

## 总结

该策略整体是一个较为典型的布林带反转策略。它利用布林带判断趋势反转点,配合移动平均线设置止盈止损,固定交易量和固定比率资金管理控制风险。相比传统布林带策略,该策略作为一个反转策略,在理论上可以避开部分震荡,提高盈利概率。但由于布林带和移动平均线等指标本身存在缺陷,实际运用时仍需要进一步优化,才能使策略参数化并减少交易风险。

|| 


## Overview

This is a reversal oscillation trend strategy based on Bollinger Bands channel. It uses Bollinger Bands upper and lower channel to determine trend, and looks for reversal opportunities when price approaches channel boundaries.

## Strategy Logic

The strategy uses Bollinger Bands as the main technical indicator. Bollinger Bands consist of n-period moving average and upper/lower bands deviation. Upper band = n-period MA + m * n-period standard deviation, Lower band = n-period MA - m * n-period standard deviation. n and m are parameters.

When price approaches upper band, it indicates an uptrend but may reverse at peak. When price approaches lower band, it indicates a downtrend but may reverse at bottom. Effective breakout of Bollinger Bands may signal potential reversal.

The specific trading rules are:

1. Go long when close > upper band, go short when close < lower band. 

2. Use n-period moving average as profit taking and stop loss signal. Close long when close breaks below MA, close short when close breaks above MA.

3. Use fixed quantity for each trade.

4. Use fixed fractional position sizing. Increase position size by fixed amount when meet fixed profit ratio, decrease size when loss.

## Advantage Analysis 

The advantages of this strategy:

1. Using Bollinger Bands channel to determine trend direction and trade reversals, avoids most whipsaws and improves win rate.

2. Moving average is a reliable profit taking/stop loss signal, locks in most profits.

3. Fixed quantity is simple and easy to implement, no complex calculation needed.

4. Fixed fractional position sizing expands profits while controls risk by position adjustment.

## Risk Analysis

The risks of this strategy:

1. Bollinger Bands may generate incorrect signals, causing losses trading against trend.

2. Lagging of moving average may lead to insufficient profit taking. 

3. Fixed quantity cannot adapt to market conditions, risks of over/under position sizing.

4. Aggressive position sizing adjustment in fixed fractional method may expand losses.

Solutions: Optimize Bollinger Bands parameters to improve signal accuracy. Add other indicators to determine trend. Reduce fixed quantity size. Lower position sizing adjustment ratio in fractional position sizing method.

## Improvement Directions

The strategy can be improved from the following aspects:

1. Optimize Bollinger Bands parameters like n and m to increase accuracy.

2. Add other indicators like MACD, KD to avoid wrong signals.

3. Change fixed quantity to dynamic positioning based on market conditions.

4. Lower position sizing adjustment ratio in fractional position sizing to smooth equity curve.

5. Add stop loss strategies like moving stop loss, breakout stop loss to control risk.

6. Parameter optimization to find optimal parameter combinations.

## Summary

In summary, this is a typical Bollinger Bands reversal strategy. It identifies reversal points by Bollinger Bands, sets profit taking/stop loss by moving average, controls risk by fixed quantity and fractional position sizing. As a reversal strategy, it theoretically avoids some whipsaws and improves profitability compared to traditional Bollinger Bands strategies. However, flaws in Bollinger Bands, moving averages require further optimization and risk management for robust practical application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|(?Technical Parameters)BB Length|
|v_input_float_1|2|Standard Deviation Multipler|
|v_input_int_2|20|SMA Exit Signal Length|
|v_input_int_3|400|(?Money Management)Fixed Ratio Value ($)|
|v_input_int_4|200|Increasing Order Amount ($)|
|v_input_1|timestamp(1 Jan 2020 00:00:00)|(?Backtesting Period)Start Date|
|v_input_2|timestamp(1 July 2024 00:00:00)|End Date|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-30 00:00:00
end: 2023-10-30 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © gsanson66


//This strategy uses the well-known Bollinger Bands Indicator
//@version=5
strategy("BOLLINGER BANDS BACKTESTING", shorttitle="BB BACKTESTING", overlay=true, initial_capital=1000, default_qty_type=strategy.cash, default_qty_value=950, commission_type=strategy.commission.percent, commission_value=0.18)


//----------------------------------------FUNCTIONS---------------------------------------//

//@function Displays text passed to `txt` when called.
debugLabel(txt, color) =>
    label.new(bar_index, high, text = txt, color=color, style = label.style_label_lower_right, textcolor = color.black, size = size.small)

//@function which looks if the close date of the current bar falls inside the date range
inBacktestPeriod(start, end) => (time >= start) and (time <= end)


//---------------------------------------USER INPUTS--------------------------------------//

//Technical parameters
bbLength = input.int(defval=20, minval=1, title="BB Length", group="Technical Parameters")
mult = input.float(defval=2, minval=0.1, title="Standard Deviation Multipler", group="Technical Parameters")
smaLength = input.int(defval=20, minval=1, title="SMA Exit Signal Length", group="Technical Parameters")
//Money Management
fixedRatio = input.int(defval=400, minval=1, title="Fixed Ratio Value ($)", group="Money Management")
increasingOrderAmount = input.int(defval=200, minval=1, title="Increasing Order Amount ($)", group="Money Management")
//Backtesting period
startDate = input(title="Start Date", defval=timestamp("1 Jan 2020 00:00:00"), group="Backtesting Period")
endDate = input(title="End Date", defval=timestamp("1 July 2024 00:00:00"), group="Backtesting Period")


//----------------------------------VARIABLES INITIALISATION-----------------------------//
strategy.initial_capital = 50000
//Exit SMA
smaExit = ta.sma(close, smaLength)
//BB Calculation
basis = ta.sma(close, bbLength)
dev = mult * ta.stdev(close, bbLength)
upperBB = basis + dev
lowerBB = basis - dev
//Money management
equity = strategy.equity - strategy.openprofit
var float capital_ref = strategy.initial_capital
var float cashOrder = strategy.initial_capital * 0.95
//Backtesting period
bool inRange = na


//------------------------------CHECKING SOME CONDITIONS ON EACH SCRIPT EXECUTION-------------------------------//

//Checking if the date belong to the range
inRange := true

//Checking performances of the strategy
if equity > capital_ref + fixedRatio
    spread = (equity - capital_ref)/fixedRatio
    nb_level = int(spread)
    increasingOrder = nb_level * increasingOrderAmount
    cashOrder := cashOrder + increasingOrder
    capital_ref := capital_ref + nb_level*fixedRatio
if equity < capital_ref - fixedRatio
    spread = (capital_ref - equity)/fixedRatio
    nb_level = int(spread)
    decreasingOrder = nb_level * increasingOrderAmount
    cashOrder := cashOrder - decreasingOrder
    capital_ref := capital_ref - nb_level*fixedRatio

//Checking if we close all trades in case where we exit the backtesting period
if strategy.position_size!=0 and not inRange
    strategy.close_all()
    debugLabel("END OF BACKTESTING PERIOD : we close the trade", color=color.rgb(116, 116, 116))


//-----------------------------------EXIT SIGNAL------------------------------//

if strategy.position_size > 0 and close < smaExit
    strategy.close("Long")
if strategy.position_size < 0 and close > smaExit
    strategy.close("Short")


//----------------------------------LONG/SHORT CONDITION---------------------------//

//Long Condition
if close > upperBB and inRange
    qty = cashOrder/close
    strategy.entry("Long", strategy.long, qty)
//Short Condition
if close < lowerBB and inRange
    qty = cashOrder/close
    strategy.entry("Short", strategy.short, qty)


//---------------------------------PLOTTING ELEMENT----------------------------------//

plot(smaExit, color=color.orange)
upperBBPlot = plot(upperBB, color=color.blue)
lowerBBPlot = plot(lowerBB, color=color.blue)
fill(upperBBPlot, lowerBBPlot, title = "Background", color=strategy.position_size>0 ? color.rgb(0, 255, 0, 90) : strategy.position_size<0 ? color.rgb(255, 0, 0, 90) : color.rgb(33, 150, 243, 95))

```

> Detail

https://www.fmz.com/strategy/430664

> Last Modified

2023-10-31 14:30:45
