
> Name

双阴影形态反转策略Dual-Shadow-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10d2dc400446c6ab7b8.png)

[trans]

## 概述

双阴影形态反转策略是一种基于K线形态的短线交易策略。该策略通过识别出现连续两根K线都不存在影线的特殊K线形态,来判断可能的反转机会。策略的优点是简单明了,易于实现,但同时也存在一定的风险需要注意。

## 原理

该策略的核心逻辑是识别“双阴影”形态。具体来说,策略会判断当前K线是否满足“开盘价等于最低价,收盘价等于最高价”的条件,即没有下影线和上影线,这种K线称为阴影线。如果前一根K线也满足这个条件,就认为出现了连续两根阴影线,即“双阴影”形态。

根据技术分析理论,这种双阴影形态通常预示着当前趋势即将反转。因为连续两根K线价格都在一个很窄的区间内波动,说明买卖双方力量趋于平衡,预示着反转的可能。

判断到双阴影形态后,策略会在下一根K线开盘时按收盘价进入做多或做空方向。并在设定的bar数后平仓离场。

## 优势

- 策略思路清晰易懂,简单的形态判断,容易实现。

- 利用了经典的双阴影反转形态,有一定的技术分析依据。

- 操作频率不高,有利于降低交易成本和风险。

- 可方便加入回测功能,优化参数。

## 风险

- 形态交易依赖历史图形统计概率,不能完全避免乖离。

- 虽然双阴影预示反转,但反转未必会发生或维持。

- 设定固定的止盈区间难以对付行情快速运行的情况。

- 只看一两个K线信息,容易造成过于激进出入场。

## 优化思路

- 可以结合趋势指标,避免逆势操作。

- 可以 Wait for Confirm 进场,等待反转确认信号。 

- 停止盈亏可根据ATR动态设置,而不是固定天数。

- 可用机器学习判断哪些双阴影形态更可靠。

## 总结

双阴影反转策略利用经典的形态交易理念,思路简单直观,既适合新手学习,也可作为机器人的模块之一。但仍需要注意风险控制,可通过优化进场timing和止盈方式来改进。整体来说,该策略优点和缺点都较为明显,可供参考借鉴。

||

## Overview

The Dual Shadow Reversal strategy is a short-term trading strategy based on candlestick patterns. It identifies potential reversal opportunities by detecting the special candlestick pattern where two consecutive candles have no shadows. The strategy is simple and straightforward to implement but also has certain risks to note.   

## Principle 

The core logic of this strategy is to identify the "dual shadow" pattern. Specifically, it checks if the current candle meets the condition of "open equals low, close equals high", meaning no lower or upper shadows, which is known as a shadowless candle. If the previous candle also meets this criteria, it signals two consecutive shadowless candles, or the "dual shadow" pattern.

According to technical analysis theory, this dual shadow pattern often suggests an impending trend reversal. The price fluctuating within a very narrow range on two consecutive candles indicates the equalization of buying and selling forces, which hints at a likely reversal.

Upon detecting the dual shadow pattern, the strategy will enter long or short at the next candle's open based on the previous close. And close the position after a set number of bars.

## Advantages

- The strategy logic is straightforward and easy to understand, with simple pattern recognition that is easy to implement.

- It utilizes the classical dual shadow reversal pattern which has some technical analysis rationale. 

- Infrequent trading helps reduce costs and risks.

- Easy to add backtesting features and optimize parameters.

## Risks

- Pattern trading relies on historical chart statistics and probabilities, and deviations can happen.

- Although dual shadows suggest reversal, the actual reversal may not occur or sustain. 

- The fixed profit-taking zone may not cope well with fast-moving markets.

- Looking at limited candle information can lead to over-eager entries.

## Enhancement Ideas

- Incorporate trend indicators to avoid countertrend trades.

- Use wait-for-confirmation entries to confirm actual reversal. 

- Set dynamic stop loss based on ATR instead of fixed duration.

- Use machine learning to determine which dual shadow patterns are more reliable.

## Summary

The dual shadow reversal strategy leverages the classic concept of pattern trading in a simple and intuitive way, suitable for beginners while also serving as a modular component for algos. But risk management is still essential, and the strategy can be improved by optimizing entry timing and take-profit methods. Overall, the pros and cons of this strategy are quite apparent for reference.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Bars Until Close|
|v_input_2|true|Backtest on Twice alert?|
|v_input_3|2017|Backtest Start Year|
|v_input_4|true|Backtest Start Month|
|v_input_5|2|Backtest Start Day|
|v_input_6|2019|Backtest Stop Year|
|v_input_7|7|Backtest Stop Month|
|v_input_8|30|Backtest Stop Day|
|v_input_9|true|Color Background?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-30 00:00:00
end: 2023-11-06 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("No Shadow Candles", overlay=true)

//set inputs
bars_until_close_trade = input(1,"Bars Until Close", minval = 1)
backtest_option = input(true,"Backtest on Twice alert?", bool)

//set conditions
up = close > close[1] and low >= open and high <= close
down = close < close[1] and low >= close and high <= open

up2 = (close > close[1] and low >= open and high <= close) and (close[1] > close[2] and low[1] >= open[1] and high[1] <= close[1])
down2 = (close < close[1] and low >= close and high <= open) and (close[1] < close[2] and low[1] >= close[1] and high[1] <= open[1])

close_trade = barssince(up or down) == bars_until_close_trade
close_trade2 = barssince(up2 or down2) == bars_until_close_trade

//plot indicators
plotshape(up,"Up Marker", shape.triangleup, location.belowbar, color = olive, size = size.tiny, transp = 50)
plotshape(down,"Down Marker", shape.triangledown, location.abovebar, color = orange, size = size.tiny, transp = 50)
plotshape(up2,"Up Twice Marker", shape.triangleup, location.belowbar, color = white, size = size.small)
plotshape(down2,"Down Twice Marker", shape.triangledown, location.abovebar, color = white, size = size.small)
plotshape(close_trade,"Close Trigger", shape.circle, location.belowbar, color = fuchsia, size = size.tiny, transp = 50)
plotshape(close_trade2,"Close Trigger2 (After Twice Alert)", shape.circle, location.belowbar, color = red, size = size.small)

//Strategy Testing


// Component Code Start
// Example usage:
// if testPeriod()
//   strategy.entry("LE", strategy.long)
testStartYear = input(2017, "Backtest Start Year")
testStartMonth = input(01, "Backtest Start Month")
testStartDay = input(2, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2019, "Backtest Stop Year")
testStopMonth = input(7, "Backtest Stop Month")
testStopDay = input(30, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

// A switch to control background coloring of the test period
testPeriodBackground = input(title="Color Background?", type=bool, defval=true)
testPeriodBackgroundColor = testPeriodBackground and (time >= testPeriodStart) and (time <= testPeriodStop) ? #00FF00 : na
bgcolor(testPeriodBackgroundColor, transp=97)

testPeriod() => true
// Component Code Stop

//Entry and Close settings
if testPeriod() and backtest_option == true
    strategy.entry("up2", true, when = up2, limit = close)
    strategy.close("up2", when = close_trade)

if testPeriod() and backtest_option == false
    strategy.entry("up", true,  when = up, limit = close)
    strategy.close("up", when = close_trade)

```

> Detail

https://www.fmz.com/strategy/431425

> Last Modified

2023-11-07 17:00:52
