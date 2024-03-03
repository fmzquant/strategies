
> Name

克隆阴阳数量化交易策略Renko-Yin-Yang-Quant-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

克隆阴阳数量化交易策略是一个基于日内量价关系的短线交易策略。该策略利用日内股票交易的阴阳方向信息,结合量能确认信号,实现低风险的短线操作。

## 策略原理

该策略通过计算股票每日的开盘价、收盘价、最高价、最低价,结合ATR指标,生成Renko砖块。当阴阳砖块发生反转时产生交易信号。

具体来说,策略首先计算Renko砖块的开盘价o2和收盘价c2。如果o2<c2,表示阳线,如果o2>c2,表示阴线。当阳线转为阴线时产生卖出信号,当阴线转为阳线时产生买入信号。

为了过滤假突破,策略还统计了上一个阳线和阴线的周期数,如果阳线周期数较多,则信号更可靠。此外,策略还在买入和卖出后设置了止损止盈逻辑。

## 策略优势

1. 使用Renko砖块过滤了市场噪音,交易信号更清晰。

2. 结合量能关系,避免了假突破的风险。

3. DAPM模型简单有效,适合日内短线操作。

4. 可自定义ATR参数调整交易频率。

5. 可自定义止损止盈策略优化风险管理。

## 风险分析

1. 仍存在趋势不明显的假突破风险。

2. Renko参数设置不当可能错过趋势或增大交易频率。

3. 止损点设置过小可能造成轻微亏损被反弹止损。

## 优化方向

1. 可考虑结合其他技术指标过滤信号。

2. 可考虑增加移动止损或跟踪止损功能。 

3. 可针对不同品种参数进行优化测试。

4. 可考虑不同时间周期的组合,进行多时间框架交易。

## 总结

该策略总体而言是一个非常实用的短线交易策略。它利用量价关系进行高效过滤,可以抓住短线价格向上和向下的关键点位。同时也需要注意合理的参数设置,适当的风险管理和止损策略,会大大提高策略的稳定性和盈利能力。通过不断优化测试,该策略可以成为日内短线交易员必备的有力工具。

||

## Overview

The Renko Yin Yang quant trading strategy is a short-term trading strategy based on intraday price-volume relationship. It utilizes the yin yang direction information within a day and combines volume confirmation signals to implement low-risk short-term trading.

## Strategy Logic

The strategy calculates the open, close, high and low prices of each trading day, and generates Renko bricks together with ATR indicator. Trading signals are generated when yin yang bricks reverse. 

Specifically, the strategy first calculates the open price o2 and close price c2 of the Renko bricks. If o2<c2, it indicates a yang line, if o2>c2, it indicates a yin line. When yang line turns to yin line, a sell signal is generated. When yin line turns to yang line, a buy signal is generated.

To filter false breakouts, the strategy also counts the number of periods of the last yang and yin line. If the yang line has more periods, the signal is more reliable. In addition, stop loss and take profit logic are set after buying and selling.

## Advantages

1. Renko bricks filter market noise and make trading signals clearer.

2. Combining price-volume relationship avoids the risk of false breakout. 

3. The DAPM model is simple and effective for intraday trading.

4. Customizable ATR parameters adjust trading frequency. 

5. Customizable stop loss improves risk management.

## Risks

1. There is still risk of unclear false breakout.

2. Improper Renko parameter settings may miss trends or increase trading frequency.

3. A too tight stop loss may get stopped out by minor pullback.

## Optimization

1. Consider combining other technical indicators to filter signals.

2. Consider adding trailing stop loss feature.

3. Optimize parameters for different assets. 

4. Consider combining different timeframes for multi-timeframe trading.

## Conclusion

In conclusion, this is a very practical short-term trading strategy. It uses price-volume relationship to filter efficiently and capture key turning points. Proper parameter tuning, risk management and stop loss strategy can greatly improve its stability and profitability. With continuous optimization and testing, this strategy can become a powerful tool for intraday traders.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---------------- Trade Range ----------------|
|v_input_2|true|From Month|
|v_input_3|true|From Day|
|v_input_4|2017|From Year|
|v_input_5|true|To Month|
|v_input_6|true|To Day|
|v_input_7|2099|To Year|
|v_input_8|true|---------------- Settings ----------------|
|v_input_9|false|Allow Short|
|v_input_10|10|ATR Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-26 00:00:00
end: 2023-09-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License https://creativecommons.org/licenses/by-sa/4.0/
// © dman103
strategy(title="Renko Strategy V2", shorttitle="Renko Strategy V2", overlay=true,precision=3, commission_value=0.025, default_qty_type=strategy.cash, default_qty_value=10000, initial_capital=10000)
// Version 2.0 of my previous renko strategy using Renko calculations, this time without Tilson T3 and without using security with Renko to remove repaints!
// Seems to work nicely on cryptocurrencies on higher time frames.

//== Description ==
// Strategy gets Renko values and uses renko close and open to trigger signals.
// Base on these results the strategy triggers a long and short orders, where green is uptrending and red is downtrending.
// This Renko version is based on ATR, you can Set ATR (in settings) to adjust it.

// == Notes ==
// Supports alerts.
// Supports backtesting time ranges.
// Shorts are disabled by default (can be enabled in settings).
// Link to previous Renko strategy V1: https://www.tradingview.com/script/KeWBWLGT-Renko-Strategy-T3-V1/
//
// Stay tuned for version V3 in the future as i have an in progress prototype, Follow to get updated: https://www.tradingview.com/u/dman103/#published-scripts

// === INPUT BACKTEST RANGE ===
useDate = input(true,     title='---------------- Trade Range ----------------', type=input.bool)
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2017, title = "From Year", minval = 2000)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 2099, title = "To Year", minval = 2010)
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => time >= start and time <= finish ? true : false // create 

settings = input(true,     title='---------------- Settings ----------------', type=input.bool)

allow_short = input(false,title="Allow Short")
atr_len = input(10,"ATR Length")

atr = atr(atr_len)
// Thanks to renko snippet calculations from @RafaelZioni  https://www.tradingview.com/script/2vKhpfVH-Renko-XZ/
Renko1() =>
    p1 = 0.0
    p1 := close > nz(p1[1]) + atr ? nz(p1[1]) + atr : close < nz(p1[1]) - atr ? nz(p1[1]) - atr : nz(p1[1])
    p1
Renko2() =>
    p2 = 0.0
    Br_1 = Renko1()
    p2 := Renko1() != Renko1()[1] ? Br_1[1] : nz(p2[1])
    p2

Renko3() =>
    p3 = 0.0
    p3 := open > nz(p3[1]) + atr ? nz(p3[1]) + atr : open < nz(p3[1]) - atr ? nz(p3[1]) - atr : nz(p3[1])
    p3

Renko4() =>
    open_v = 0.0
    Br_2 = Renko3()
    open_v := Renko3() != Renko3()[1] ? Br_2[1] : nz(open_v[1])
    open_v

o2 = Renko4()
c2 = Renko1()
l2 =low
h2 = high

//=== Plotting ===

crossPlot= 0.0
if (o2 < c2)
    crossPlot :=o2
else 
    crossPlot := o2

// Used to make sure that even if o2 and c2 are equal, the result (short or long) will be based on previous trend.
bars_since_up=barssince(o2 < c2)
bars_since_down=barssince(o2 > c2)
go_long= (bars_since_up<bars_since_down) and  o2<c2
go_short = (bars_since_up>bars_since_down) and o2>c2
plotColor = go_long and  o2<c2 ? color.green : go_short and o2>c2?  color.red : color.white 
plot(crossPlot, color = plotColor, style = plot.style_circles, linewidth = 2,join=true)
changeCond = plotColor != plotColor[1]

//=== Buy/Sell ===
closeStatus =  strategy.openprofit > 0 ? "win" : "lose"
long_entry = plotColor == color.green and window()  and changeCond
long_exit_entry = plotColor == color.red //or (allow_alternative_sl and close < low_result  )
short_entry = plotColor == color.red  and window() and changeCond
short_exit_entry = plotColor == color.green   // or (allow_alternative_sl and close > high_result )

strategy.entry("long", true, when = long_entry)
strategy.close("long",when=long_exit_entry,comment=closeStatus)

if (allow_short)
    strategy.entry("short",false, when = short_entry)
strategy.close("short",when=short_exit_entry,comment=closeStatus)
//=== Alerts ===
alertcondition(go_long and changeCond , title='Renko Buy Signal', message='Renko Revered to Buy Signal')
alertcondition(go_short and changeCond , title='Renko Sell Signal', message='Renko Revered to Sell Signal')
```

> Detail

https://www.fmz.com/strategy/427998

> Last Modified

2023-09-27 17:11:30
