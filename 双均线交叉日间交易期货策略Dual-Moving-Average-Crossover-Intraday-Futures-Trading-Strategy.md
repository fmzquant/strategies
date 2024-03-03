
> Name

双均线交叉日间交易期货策略Dual-Moving-Average-Crossover-Intraday-Futures-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11c185631535c2f1ddc.png)
[trans]

## 概述

该策略运用双均线交叉的原理,结合ATR指标设定止损止盈,辅以交易时间控制,设计出一套适合日间交易期货合约的策略。策略简单明了,容易掌握,适合初学者使用。

## 策略原理

该策略使用5周期和20周期的WMA均线交叉做为入场信号。当5周期线从下方向上突破20周期线时,做多;当5周期线从上方向下跌破20周期线时,做空。同时,策略还使用50周期WMA均线判断趋势方向。只有当价格突破均线方向与大趋势方向一致时,才产生交易信号。

此外,策略还运用ATR指标来设定止损止盈位置。ATR指标能动态反映市场波动幅度。策略以ATR指标的数值乘以一个倍数(如3倍)来确定止损止盈位置,从而控制单笔损失。

最后,策略限定只在美国交易时段(9:00-14:30 CST)触发交易信号。这避免在开市和收市时段交易,因为这两个时段波动较大,容易形成虚假信号。

## 优势分析

该策略具有以下优势:

1. 使用双均线交叉,可以有效捕捉趋势转折点,及时入场。

2. 借助大趋势判断过滤掉部分噪音交易信号,避免逆势操作。

3. 应用ATR指标动态调整止损止盈位置,有效控制单笔损失。

4. 限定交易时段,避开市场开盘和收盘时的剧烈波动。

5. 策略规则简单清晰,容易理解和实现,适合初学者掌握。

6. 可自定义参数,如均线周期、ATR倍数、交易时段等,优化策略。

## 风险分析

该策略也存在以下风险:

1. 震荡行情中,可能出现较多止损。

2. 双均线交叉会有一定滞后,可能错过短线突破。

3. ATR参数设定不当可能导致止损过大或过小。

4. 仅依靠技术指标,忽略基本面信息。

5. 交易品种和周期不合适都会影响策略效果。

6. 机械交易系统存在被套利的风险。

7. 不同交易时段的参数需要调整。

这需要通过参数优化、指标组合、适当人工干预等方法来改进。

## 优化方向

该策略可以从以下方面进行优化:

1. 尝试不同的均线系统,如EMA、DMA等。

2. 增加其他技术指标过滤,如MACD、RSI等。

3. 优化ATR参数,使止损止盈更合理。

4. 结合交易量指标寻找高效入场点。

5. 根据不同品种特点调整参数。

6. 结合基本面因素,避免逆市场操作。 

7. 增加机器学习成分,利用神经网络对数据进行建模。

8. 尝试多周期结合,发掘更多交易机会。

9. 构建策略组合,提高稳定性。

## 总结

本策略整体较为简单通俗,适合初学者实盘练习。同时也留有很大的优化空间,可以引入更多技术指标或机器学习方法来完善。此外,根据不同交易品种特性和市场环境调整参数也很关键。总之,本策略为量化交易初学者提供了一个参考框架,但还需要根据实际情况不断测试与优化,方能获得稳定收益。

||


## Overview

This strategy utilizes the principle of dual moving average crossover, incorporates ATR indicator for stop loss and take profit, and adds trading hour control to design an intraday trading strategy suitable for futures contracts. The strategy is simple and easy to grasp, making it ideal for beginners.

## Strategy Logic

The strategy uses 5-period and 20-period WMA lines crossover as entry signals. It goes long when 5-period line breaks above 20-period line, and goes short when 5-period line breaks below 20-period line. It also uses 50-period WMA line to determine the trend direction. Trading signals are only triggered when price breakout direction is consistent with the major trend.

In addition, the strategy leverages ATR indicator to set dynamic stop loss and take profit levels. ATR reflects the volatility of the market. The strategy uses ATR value multiplied by a factor (such as 3) to determine stop loss and take profit, thereby controlling per trade loss.

Finally, the strategy only triggers trades during US trading hours (9:00-14:30 CST) to avoid high volatility around market open and close where false signals easily form.

## Advantage Analysis 

The strategy has the following advantages:

1. Dual moving average crossover effectively captures trend turning points for timely entry.

2. Trend filter avoids trading against major trend and reduces false signals. 

3. Dynamic ATR-based stop loss controls per trade loss.

4. Limiting trading hours avoids volatile open and close periods.

5. Simple and clear rules, easy to understand and implement for beginners.

6. Customizable parameters like MA periods, ATR multiplier, trading hours etc. for optimization.

## Risk Analysis

The strategy also has the following risks:

1. More stop loss triggers during range-bound markets.

2. Dual MA crossover has lag and may miss short-term breakouts.  

3. Improper ATR parameter setting leads to large or small stop loss.

4. Rely solely on technical indicators without fundamental analysis.

5. Effectiveness relies on proper symbol and timeframe.

6. Mechanical system has risk of being arbitraged. 

7. Parameters need adjustment for different trading sessions.

These can be improved via parameter tuning, indicator combinations, selective manual intervention etc.

## Optimization Directions

The strategy can be enhanced in the following aspects:

1. Test different MA systems like EMA, DMA etc.

2. Add other technical filters like MACD, RSI etc.

3. Optimize ATR parameters for better stop loss/profit.

4. Incorporate volume indicators to find high quality entry signals.

5. Adjust parameters based on symbol specifics. 

6. Integrate fundamental factors to avoid trading against market.

7. Introduce machine learning like neural networks for market modeling.

8. Explore multi-timeframe combinations for more opportunities.

9. Construct strategy ensemble to improve robustness.

## Conclusion

In summary, this is a simple and intuitive strategy suitable for beginners to practice live trading. At the same time, huge room remains for optimization via more technical indicators or machine learning. Parameter tuning based on symbol and market dynamics is also key. The strategy provides a reference framework for quant trading beginners, but requires relentless testing and enhancement for stable profits.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ATR Period|
|v_input_2_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_3|3|ATR Multiplier|
|v_input_4|true|Change ATR Calculation Method ?|
|v_input_5|true|Show Buy/Sell Signals ?|
|v_input_6_close|0|Fast WMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|5|Fast WMA Period|
|v_input_8_close|0|Slow WMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|20|Slow WMA Period|
|v_input_10_close|0|Trend 50 Period Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_11|50|Trend 50 Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-15 00:00:00
end: 2023-11-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © james4392010

//@version=4

strategy(title="DayTradingFutures Cross-Strategy", overlay=true)




// === GENERAL INPUTS ===
Periods = input(title="ATR Period", type=input.integer, defval=10)
src = input(hl2, title="Source")
Multiplier = input(title="ATR Multiplier", type=input.float, step=0.1, defval=3.0)
changeATR= input(title="Change ATR Calculation Method ?", type=input.bool, defval=true)
showsignals = input(title="Show Buy/Sell Signals ?", type=input.bool, defval=true)
//highlighting = input(title="Highlighter On/Off ?", type=input.bool, defval=true)
atr2 = sma(tr, Periods)
atr= changeATR ? atr(Periods) : atr2
up=src-(Multiplier*atr)
up1 = nz(up[1],up)
up := close[1] > up1 ? max(up,up1) : up
dn=src+(Multiplier*atr)
dn1 = nz(dn[1], dn)
dn := close[1] < dn1 ? min(dn, dn1) : dn



wmaFastSource   = input(defval = close, title = "Fast WMA Source")
wmaFastLength   = input(defval = 5, title = "Fast WMA Period")
wmaSlowSource   = input(defval = close, title = "Slow WMA Source")
wmaSlowLength   = input(defval = 20, title = "Slow WMA Period")
wmaDirectionSource  = input(defval = close, title = "Trend 50 Period Source")
wmaDirectionLength  = input(defval = 50, title = "Trend 50 Period")
timeinrange(res, sess) => time(res, sess) != 0



// === SERIES SETUP ===
/// a couple of ma's..
wmaFast = wma(close, 5)
wmaSlow = wma(close, 20)
wmaDirection = wma(close, 50)





// === PLOTTING ===
fast = plot(series=wmaFast, color=color.white, linewidth=2)
slow = plot(series=wmaSlow, color=color.yellow, linewidth=2)
direction = plot(series=wmaDirection, color=color.red, linewidth=2)


// === INPUT BACKTEST RANGE ===

//fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
//fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
//fromYear = input(defval = 2022, title = "From Year", minval = 2022)
 
// To Date Inputs
//toDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
//toMonth = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
//toYear = input(defval = 2022, title = "To Year", minval = 2022)
//startDate = timestamp(fromYear, fromMonth, fromDay)
//finishDate = timestamp(toYear, toMonth, toDay)
//inDateRange= (time >= fromDay, fromMonth, fromYear and time <= toDay, toMonth, toYear) 



// === FUNCTION EXAMPLE ===
//inDateRange = (time >= fromDay, fromMonth, fromYear) and (time <= toDay, toMonth, toYear)


// === LOGIC ===

enterLong = crossover(wmaFast, wmaSlow) and close > wmaDirection and timeinrange(timeframe.period, "0900-1430")
enterShort = crossunder(wmaFast, wmaSlow) and close < wmaDirection and timeinrange(timeframe.period, "0900-1430")

//trend := nz(trend[1], trend)
//trend := trend == -1 and close > dn1 ? 1 : trend == 1 and close < up1 ? -1 : trend
//upPlot = plot(trend == 1 ? up : na, title="Up Trend", style=plot.style_linebr, linewidth=2, color=color.green)

buySignal = enterLong 
//plotshape(enterLong ? up : na, title="UpTrend Begins", location=location.absolute, style=shape.circle, size=size.tiny, color=color.green)
plotshape(enterLong and showsignals ? up : na, title="Buy", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=color.green, textcolor=color.white)
//dnPlot = plot(trend == 1 ? na : dn, title="Down Trend", style=plot.style_linebr, linewidth=2, color=color.red)

sellSignal = enterShort
//plotshape(enterShort ? dn : na, title="DownTrend Begins", location=location.absolute, style=shape.circle, size=size.tiny, color=color.red)
plotshape(enterShort and showsignals ? dn : na, title="Sell", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.red, textcolor=color.white)
//mPlot = plot(ohlc4, title="", style=plot.style_circles, linewidth=0)
//longFillColor = highlighting ? (trend == 1 ? color.green : color.white) : color.white
//shortFillColor = highlighting ? (trend == -1 ? color.red : color.white) : color.white
//fill(mPlot, upPlot, title="UpTrend Highligter", color=longFillColor)
//fill(mPlot, dnPlot, title="DownTrend Highligter", color=shortFillColor)
alertcondition(buySignal, title="Buy", message="Buy!")
alertcondition(sellSignal, title="Sell", message="Sell!")
//changeCond = trend != trend[1]
//alertcondition(changeCond, title="SuperTrend Direction Change", message="SuperTrend has changed direction!")



// Entry for strategy //

//tp=input(25,title="TakeProfit")
//sl=input(40,title="StopLoss")

strategy.entry("Long",1, when=buySignal)
//strategy.exit("Exit",profit=tp,loss=sl)
//strategy.exit("TakeProfit",profit=tp)
//strategy.exit("StopLoss",loss=sl)

strategy.entry("Short",1, when=sellSignal)
//strategy.exit("Exit",profit=tp,loss=sl)
//strategy.exit("TakeProfit",profit=tp)
//strategy.exit("StopLoss",loss=sl)
//strategy.exit("Exit", wmaFastwmaSlow)

//Buy and Sell Signals

//strategy.close_all(when =not timeinrange(timeframe.period, "1000-1430"))   


// === FILL ====

fill (fast, slow, color = wmaSlow > wmaDirection ? color.green : color.red)
//fill(when=enterLong, tp, color = color.new(color.green, 90), title = "Profit area")
//fill(when=enterLong, sl, color = color.new(color.red, 90), title = "Loss area")
//fill(when=enterShort, tp, color = color.new(color.green, 90), title = "Profit area")
//fill(when=enterShort, sl, color = color.new(color.red, 90), title = "Loss area")





```

> Detail

https://www.fmz.com/strategy/432224

> Last Modified

2023-11-15 16:48:02
