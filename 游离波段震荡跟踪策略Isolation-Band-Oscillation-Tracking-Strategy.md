
> Name

游离波段震荡跟踪策略Isolation-Band-Oscillation-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8c43e74f95969a8921.png)
[trans]
## 概述

这个策略的主要思想是基于ATR指标计算出长线和短线的止损位,当价格突破这些止损线时生成交易信号。它同时具有趋势跟踪和震荡捕捉的功能。

## 策略原理

该策略使用ATR指标的N周期ATR乘以一个系数来计算长短两边的止损线。具体计算公式如下:

```
长线止损 = 最高价 - ATR * 系数
短线止损 = 最低价 + ATR * 系数
```

当价格上涨突破长线止损线时做多,当价格下跌突破短线止损线时做空。做多做空后会实时跟踪价格的波动来移动止损线。

这种以ATR波带作为止损位设置的方法,可以在保证止损风险的前提下充分捕捉价格趋势。当价格出现较大幅度的突破时产生信号,可以有效滤除假突破。

## 优势分析

这种策略最大的优势在于可以自动调整止损位,捕捉价格趋势的同时控制风险。具体优势如下:

1. 基于ATR指标设置浮动止损,可以根据市场波动性调整止损幅度,有效控制单笔损失。

2. 采用突破方式产生信号,可以滤除部分噪音,避免追顶和追底。

3. 实时调整止损线追踪价格波动,防止止损过于宽松,锁定更多盈利。

## 风险分析

该策略也存在一些风险,主要集中在止损位设置和信号产生方式上。具体风险点如下:

1. ATR周期和系数不当可能导致止损过宽或过窄。

2. 突破信号方式可能漏掉趋势初期机会。

3. 趋势末期止损追踪可能有所滞后,无法完美退出。

对策主要是调整参数使止损更合理,或者辅助其他指标判断趋势和信号。

## 优化方向 

该策略可以从以下几个方面继续优化:

1. 设置第二层止损,进一步控制风险。

2. 结合其他指标判断趋势,提高信号质量。

3. 添加移动止盈策略,在趋势进一步延续时提高获利。

4. 优化ATR周期和系数参数,使止损更贴近实际价格波动。

## 总结

这个策略整体来说非常实用,可以自动调整止损位有效控制风险,同时通过趋势跟踪可以获得不错的盈利。我们可以在原有基础上进一步结合其他分析方法来优化和改进策略,使其更稳定和智能。

||

## Overview

The main idea of this strategy is to calculate the long and short stop-loss lines based on the ATR indicator. It generates trading signals when the price breaks through these stop-loss lines. It has both trend tracking and oscillation capturing capabilities.

## Strategy Principle 

The strategy uses the N-period ATR multiplied by a coefficient to calculate the long and short stop-loss lines. The specific calculation formulas are as follows:

```
Long Stop = Highest Price - ATR * Coefficient 
Short Stop = Lowest Price + ATR * Coefficient
```

It goes long when the price rises and breaks through the long stop-loss line, and goes short when the price falls and breaks through the short stop-loss line. After going long or short, it will track price fluctuations in real time to move the stop-loss lines.

By using the ATR band as the stop-loss level, this method can fully capture the price trend while ensuring the stop-loss risk. It generates signals when there is a significant breakthrough in price, which can effectively filter out false breakouts.

## Advantage Analysis

The biggest advantage of this strategy is that it can automatically adjust the stop-loss level to capture price trends while controlling risks. The specific advantages are as follows:

1. The floating stop-loss based on the ATR indicator can adjust the stop-loss range according to market volatility to effectively control single loss.

2. Adopting a breakthrough method to generate signals can filter out some noise and avoid chasing peaks and bottoms. 

3. Real-time adjustment of stop-loss lines to track price fluctuations prevents the stop-loss from being too loose and locks in more profits.

## Risk Analysis

The strategy also has some risks, mainly concentrated in the setting of stop-loss level and signal generation. The specific risk points are:

1. Improper ATR cycle and coefficients may lead to excessively wide or narrow stop-loss. 

2. The breakthrough signal method may miss early trend opportunities.

3. There may be some lag in stop-loss tracking during trend ending, unable to perfectly exit.

The countermeasures are mainly to adjust the parameters to make the stop-loss more reasonable, or assist with other indicators to determine the trend and signals.

## Optimization Directions

The strategy can be further optimized in the following aspects:

1. Set up a second-layer stop-loss to further control risks.

2. Combine other indicators to determine the trend and improve signal quality.  

3. Add moving stop-profit strategies to increase profit when the trend further continues.

4. Optimize ATR cycle and coefficient parameters to make stop-loss closer to actual price fluctuations.  

## Summary  

Overall, this strategy is very practical. It can effectively control risks by automatically adjusting the stop-loss level, while obtaining good profits through trend tracking. We can further optimize and improve the strategy by combining other analytical methods on the existing basis to make it more stable and intelligent.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|22|ATR Period|
|v_input_2|3|ATR Multiplier|
|v_input_3|false|Show Buy/Sell Labels ?|
|v_input_4|true|Use Close Price for Extremums ?|
|v_input_5|true|Highlight State ?|
|v_input_6|true|(?Strategy Settings)Long-Short|
|v_input_7|timestamp(2019-01-01)|Date|
|v_input_8|timestamp(2025-01-01)|Date|
|v_input_9|5|Manuel Stop Loss Ratio|
|v_input_10|20|Take Profit Ratio|
|v_input_11|10|Trailing Stop Start Ratio|
|v_input_12|5|Trailing Stop Ratio|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-04 00:00:00
end: 2024-02-03 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © melihtuna
//@version=4
strategy("Chandelier Exit - Strategy",shorttitle="CE-STG" , overlay=true, default_qty_type=strategy.cash, default_qty_value=10000, initial_capital=10000, currency=currency.USD, commission_value=0.03, commission_type=strategy.commission.percent)

length = input(title="ATR Period", type=input.integer, defval=22)
mult = input(title="ATR Multiplier", type=input.float, step=0.1, defval=3.0)
showLabels = input(title="Show Buy/Sell Labels ?", type=input.bool, defval=false)
useClose = input(title="Use Close Price for Extremums ?", type=input.bool, defval=true)
highlightState = input(title="Highlight State ?", type=input.bool, defval=true)

atr = mult * atr(length)

longStop = (useClose ? highest(close, length) : highest(length)) - atr
longStopPrev = nz(longStop[1], longStop) 
longStop := close[1] > longStopPrev ? max(longStop, longStopPrev) : longStop

shortStop = (useClose ? lowest(close, length) : lowest(length)) + atr
shortStopPrev = nz(shortStop[1], shortStop)
shortStop := close[1] < shortStopPrev ? min(shortStop, shortStopPrev) : shortStop

var int dir = 1
dir := close > shortStopPrev ? 1 : close < longStopPrev ? -1 : dir

var color longColor = color.green
var color shortColor = color.red

longStopPlot = plot(dir == 1 ? longStop : na, title="Long Stop", style=plot.style_linebr, linewidth=2, color=longColor)
buySignal = dir == 1 and dir[1] == -1
plotshape(buySignal ? longStop : na, title="Long Stop Start", location=location.absolute, style=shape.circle, size=size.tiny, color=longColor, transp=0)
plotshape(buySignal and showLabels ? longStop : na, title="Buy Label", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=longColor, textcolor=color.white, transp=0)

shortStopPlot = plot(dir == 1 ? na : shortStop, title="Short Stop", style=plot.style_linebr, linewidth=2, color=shortColor)
sellSignal = dir == -1 and dir[1] == 1
plotshape(sellSignal ? shortStop : na, title="Short Stop Start", location=location.absolute, style=shape.circle, size=size.tiny, color=shortColor, transp=0)
plotshape(sellSignal and showLabels ? shortStop : na, title="Sell Label", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=shortColor, textcolor=color.white, transp=0)

midPricePlot = plot(ohlc4, title="", style=plot.style_circles, linewidth=0, display=display.none, editable=false)

longFillColor = highlightState ? (dir == 1 ? longColor : na) : na
shortFillColor = highlightState ? (dir == -1 ? shortColor : na) : na
fill(midPricePlot, longStopPlot, title="Long State Filling", color=longFillColor)
fill(midPricePlot, shortStopPlot, title="Short State Filling", color=shortFillColor)


long_short = input(true, "Long-Short",type=input.bool, group="Strategy Settings")

start     = input(timestamp("2019-01-01"), "Date", type=input.time, group="Strategy Settings")
finish    = input(timestamp("2025-01-01"), "Date", type=input.time, group="Strategy Settings")   
window()  => true

slRatio=input(5, "Manuel Stop Loss Ratio", type=input.float, minval=0, group="Strategy Settings")
tpRatio=input(20, "Take Profit Ratio", type=input.float, minval=0, group="Strategy Settings")
tsStartRatio=input(10, "Trailing Stop Start Ratio", type=input.float, minval=0, group="Strategy Settings")
tsRatio=input(5, "Trailing Stop Ratio", type=input.float, minval=1, group="Strategy Settings")

lastBuyPrice = strategy.position_avg_price

diffHiPriceRatio = (high-lastBuyPrice)/lastBuyPrice*100
diffLoPriceRatio = (close-lastBuyPrice)/lastBuyPrice*100
posHiRatio=0.0
posHiRatio:= strategy.position_size > 0 ? diffHiPriceRatio > posHiRatio[1] ? diffHiPriceRatio : posHiRatio[1] : 0

s_diffHiPriceRatio = (low-lastBuyPrice)/lastBuyPrice*100
s_diffLoPriceRatio = (close-lastBuyPrice)/lastBuyPrice*100
s_posHiRatio=0.0
s_posHiRatio:= strategy.position_size < 0 ? s_diffLoPriceRatio < s_posHiRatio[1] ? s_diffLoPriceRatio : s_posHiRatio[1] : 0

strategy.entry("LONG", strategy.long, when = window() and buySignal)
strategy.close("LONG", when = window() and sellSignal)
strategy.close("LONG", when = diffLoPriceRatio<(slRatio*(-1)), comment="STOP-LONG")
strategy.close("LONG", when = diffHiPriceRatio>tpRatio, comment="TAKE-PROFIT-LONG")
strategy.close("LONG", when = ((posHiRatio[1]>tsStartRatio) and (posHiRatio[1]-diffHiPriceRatio)>tsRatio), comment="TRAILING-STOP-LONG")

if long_short
    strategy.entry("SHORT", strategy.short, when = window() and sellSignal)
    strategy.close("SHORT", when = window() and buySignal)
    strategy.close("SHORT", when = s_diffLoPriceRatio>(slRatio), comment="STOP-SHORT")
    strategy.close("SHORT", when = s_diffHiPriceRatio<(tpRatio*(-1)), comment="TAKE-PROFIT-SHORT")
    strategy.close("SHORT", when = ((s_posHiRatio[1]*(-1)>tsStartRatio) and ((s_posHiRatio[1]-s_diffLoPriceRatio))*(-1)>tsRatio), comment="TRAILING-STOP-SHORT")
```

> Detail

https://www.fmz.com/strategy/440952

> Last Modified

2024-02-04 10:28:24
