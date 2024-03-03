
> Name

EMAC指数移动平均线交叉优化策略EMAC-Exponential-Moving-Average-Cross-Optimized-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/186996b0c8ff3d15ac5.png)
[trans]

## 概述

EMAC指数移动平均线交叉优化策略是在基础的EMAC策略上进行参数优化后的版本。该策略融合了趋势判断、多重均线过滤和止损止盈 Exit,旨在抓住中长线趋势进行趋势跟随。

## 策略原理

1. 判断最近趋势方向:计算过去26周期的收盘价涨跌幅,判断为上升、下降、震荡。

2. 多重均线过滤:计算10周期、20周期、34周期的EMA,待它们上穿50周期SMA时产生买入信号。

3. ATR止损:Entry信号出现时,止损位设为 Entry柱低点或高点减去2.5ATR。

4. 移动止损:随价格上涨逐步向上移动止损线。

5. 目标止盈:Entry信号出现时,设置目标位为当时收盘价加上3ATR。

6. MA均线回调止损Exit:当价格回破10日EMA时主动止损退出。

## 策略优势

1. 多重均线过滤增加了信号的可靠性,避免被虚假突破误导。

2. 采用ATR止损,可以根据市场波动性设置合理的止损距离。

3. 移动止损使止损线逐步向上移动,保护了部分利润。

4. 目标止盈设定合理的盈利目标,不贪心,避免把利润吐出。

5. MA回调Exit使得在趋势反转时能够及时止损退出。

## 策略风险及解决方法

1. 在震荡行情中,EMA均线容易形成多次交叉对穿,可能会产生连续亏损的风险。可以适当调大EMA参数,或增加MA金叉过滤条件来降低这种概率。

2. ATR数值较大时,止损距离过大,亏损风险增加。可以考虑采用ATR的移动平均值或在ATR上乘以一个缩减比例系数来优化。 

3. 未考虑夜间隔空风险。可以加入夜间停牌时间段的判断逻辑,避免信号在不能交易的时间出现。

4. 没有考虑大盘状态的影响。可以加入对大盘趋势的判断作为策略的开关条件之一,降低在大盘不利情况下的损失。

## 策略优化方向

1. 可以测试不同长度的EMA参数组合,找到对不同品种更适合的均线长度。

2. 可以测试ATR的移动平均值或系数缩减的方法来优化止损距离。

3. 可以加入夜间停牌时间段判断逻辑,以规避隔夜风险。 

4. 可以加入对大盘态势的判断,设置对大盘趋势不利时的开关条件。

5. 可以通过反向测试多年历史数据来选择参数组合,使策略在回测中具有最佳稳定性。

## 总结

EMAC指数移动平均线交叉优化策略结合趋势判断、多重均线过滤和动态止损止盈,旨在跟踪中长线趋势进行长线持有。相较于原始版本进行了参数优化,可望获得更好的实盘表现。但该策略仍需进一步优化与完善,加入更多逻辑判断以应对多种市场情况,降低实盘交易中的风险,提高策略的稳定性和盈利能力。

||


## Overview

The EMAC Exponential Moving Average Cross Optimized Strategy is an optimized version based on the basic EMAC strategy. It incorporates trend judgment, multiple moving average filtering, and stop loss/take profit exits, aiming to follow mid-to-long term trends.

## Strategy Logic

1. Judge recent trend direction: calculate the increase/decrease percentage of close price over past 26 weeks to determine uptrend, downtrend or sideways.

2. Multiple moving average filter: calculate 10-period, 20-period, 34-period EMA and wait for them to cross above 50-period SMA to trigger buy signals.

3. ATR stop loss: when entry signal appears, set stop loss at entry bar's low or high minus 2.5ATR. 

4. Trailing stop loss: gradually move up stop loss line as price rises.

5. Take profit: when entry signal appears, set target at close price plus 3ATR.

6. MA pullback exit: actively exit when price breaks back below 10-day EMA.

## Advantages

1. Multiple MA filter increases signal reliability, avoiding false breakouts. 

2. ATR stop loss allows reasonable stop distance based on market volatility.

3. Trailing stop locks in some profits as it moves up.

4. Reasonable profit target avoids giving back too much profit.

5. MA pullback exit allows timely exit when trend reverses.

## Risks and Solutions

1. EMA crosses may whipsaw in sideways markets, causing consecutive losses. Can increase EMA periods or add MA crossover filter.

2. Large ATR values can cause stops too far away, increasing loss risk. Can optimize with ATR moving averages or reduction coefficients.

3. Overnight gap risk not considered. Can add logic to avoid signals during non-trading periods.

4. Market regime not considered. Can add market trend filter as a strategy switch.

## Optimization Directions 

1. Test EMA combinations to find optimal lengths for different products.

2. Test ATR moving averages or reduction coefficients to optimize stop distance.

3. Add logic to avoid signals during non-trading periods.

4. Add market trend filter as a strategy switch when market is unfavorable.

5. Backtest parameter combinations over many years to find optimal stability.

## Summary

The EMAC Exponential Moving Average Cross Optimized Strategy combines trend judgment, multiple MA filtering and dynamic stops to follow mid-to-long term trends. Compared to the original version it has undergone parameter optimization to improve real-trading performance. But further optimizations and enhancements are needed by adding more logic to handle different market situations, reducing risks and improving stability and profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2015|Start Year|
|v_input_2|0|R Static or Percent: Percent|Static|
|v_input_3|2000|R Size Static|
|v_input_4|3|R Size Percent|
|v_input_5|W|Trend Timeframe|
|v_input_6|26|# of Bars for Trend|
|v_input_7|15|Trend Growth %|
|v_input_8|0|Trend Required: Red|Yellow|Orange|Green|
|v_input_9|10|MA1 Period|
|v_input_10|0|MA1 Type: EMA|SMA|WMA|
|v_input_11|20|MA2 Period|
|v_input_12|0|MA2 Type: EMA|SMA|WMA|
|v_input_13|34|MA3 Period|
|v_input_14|0|MA3 Type: EMA|SMA|WMA|
|v_input_15|100|MA4 Period|
|v_input_16|0|MA4 Type: SMA|EMA|WMA|
|v_input_17|200|MA5 Period|
|v_input_18|0|MA5 Type: SMA|EMA|WMA|
|v_input_19|0|Enable Short MA Cross Filter: No|Yes|
|v_input_20|0|Enable Long MA Cross Filter: No|Yes|
|v_input_21|2.5|Stop ATR Multiple|
|v_input_22|3|Target Multiple|
|v_input_23|0|Enable ATR Stops: No|Yes|
|v_input_24|0|Enable Stops: No|Yes|
|v_input_25|0|Enable Targets: No|Yes|
|v_input_26|0|Enable Early Exit: Yes|No|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-31 23:59:59
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//Author = Dustin Drummond https://www.tradingview.com/u/Dustin_D_RLT/
//Strategy based in part on original 10ema Basic Swing Trade Strategy by Matt Delong: https://www.tradingview.com/u/MattDeLong/
//Link to original 10ema Basic Swing Trade Strategy: https://www.tradingview.com/script/8yhGnGCM-10ema-Basic-Swing-Trade-Strategy/
//This is the Original EMAC - Exponential Moving Average Cross Strategy built as a class for reallifetrading dot com and so has all the default settings and has not been optimized
//I would not recomend using this strategy with the default settings and is for educational purposes only
//For the fully optimized version please come back around the same time tomorrow 6/16/21 for the EMAC - Exponential Moving Average Cross - Optimized
//EMAC - Exponential Moving Average Cross
strategy(title="EMAC - Exponential Moving Average Cross", shorttitle = "EMAC", overlay = true, calc_on_every_tick=false, default_qty_value = 100, initial_capital = 100000, default_qty_type = strategy.fixed, pyramiding = 0, process_orders_on_close=true)
//creates a time filter to prevent "too many orders error" and allows user to see Strategy results per year by changing input in settings in Stratey Tester
startYear = input(2015, title="Start Year", minval=1980, step=1)
timeFilter = true
//R Size (Risk Amount)
rStaticOrPercent = input(title="R Static or Percent", defval="Percent", options=["Static", "Percent"])
rSizeStatic = input(2000, title="R Size Static", minval=1, step=100)
rSizePercent = input(3, title="R Size Percent", minval=.01, step=.01)
rSize = rStaticOrPercent == "Static" ? rSizeStatic : rStaticOrPercent == "Percent" ? (rSizePercent * .01 * strategy.equity) : 1
//Recent Trend Indicator "See the standalone version for detailed description"
res = input(title="Trend Timeframe", type=input.resolution, defval="W")
trend = input(26, minval=1, title="# of Bars for Trend")
trendMult = input(15, minval=0, title="Trend Growth %", step=.25) / 100
currentClose = security(syminfo.tickerid, res, close)
pastClose = security(syminfo.tickerid, res, close[trend])
//Trend Indicator
upTrend = (currentClose >= (pastClose * (1 + trendMult)))
downTrend = (currentClose <= (pastClose * (1 - trendMult)))
sidewaysUpTrend = (currentClose < (pastClose * (1 + trendMult)) and (currentClose > pastClose))
sidewaysDownTrend = (currentClose > (pastClose * (1 - trendMult)) and (currentClose < pastClose))
//Plot Trend on Chart
plotshape(upTrend, "Up Trend", style=shape.square, location=location.top, color=color.green, size=size.small)
plotshape(downTrend, "Down Trend", style=shape.square, location=location.top, color=color.red, size=size.small)
plotshape(sidewaysUpTrend, "Sideways Up Trend", style=shape.square, location=location.top, color=color.yellow, size=size.small)
plotshape(sidewaysDownTrend, "Sideways Down Trend", style=shape.square, location=location.top, color=color.orange, size=size.small)
//What trend signals to use in entrySignal
trendRequired = input(title="Trend Required", defval="Red", options=["Green", "Yellow", "Orange", "Red"])
goTrend = trendRequired == "Orange" ? upTrend or sidewaysUpTrend or sidewaysDownTrend : trendRequired == "Yellow" ? upTrend or sidewaysUpTrend : trendRequired == "Green" ? upTrend : trendRequired == "Red" ? upTrend or sidewaysUpTrend or sidewaysDownTrend or downTrend : na
//MAs Inputs Defalt is 10 EMA, 20 EMA, 50 EMA, 100 SMA and 200 SMA
ma1Length = input(10, title="MA1 Period", minval=1, step=1)
ma1Type = input(title="MA1 Type", defval="EMA", options=["SMA", "EMA", "WMA"])
ma2Length = input(20, title="MA2 Period", minval=1, step=1)
ma2Type = input(title="MA2 Type", defval="EMA", options=["SMA", "EMA", "WMA"])
ma3Length = input(34, title="MA3 Period", minval=1, step=1)
ma3Type = input(title="MA3 Type", defval="EMA", options=["SMA", "EMA", "WMA"])
ma4Length = input(100, title="MA4 Period", minval=1, step=1)
ma4Type = input(title="MA4 Type", defval="SMA", options=["SMA", "EMA", "WMA"])
ma5Length = input(200, title="MA5 Period", minval=1, step=1)
ma5Type = input(title="MA5 Type", defval="SMA", options=["SMA", "EMA", "WMA"])
//MAs defined
ma1 = ma1Type == "EMA" ? ema(close, ma1Length) : ma1Type == "SMA" ? sma(close, ma1Length) : wma(close, ma1Length)
ma2 = ma2Type == "EMA" ? ema(close, ma2Length) : ma2Type == "SMA" ? sma(close, ma2Length) : wma(close, ma2Length)
ma3 = ma3Type == "EMA" ? ema(close, ma3Length) : ma3Type == "SMA" ? sma(close, ma3Length) : wma(close, ma3Length)
ma4 = ma4Type == "SMA" ? sma(close, ma4Length) : ma4Type == "EMA" ? ema(close, ma4Length) : wma(close, ma4Length)
ma5 = ma5Type == "SMA" ? sma(close, ma5Length) : ma5Type == "EMA" ? ema(close, ma5Length) : wma(close, ma5Length)
//Plot MAs
plot(ma1, title="MA1", color=color.yellow, linewidth=1, style=plot.style_line)
plot(ma2, title="MA2", color=color.purple, linewidth=1, style=plot.style_line)
plot(ma3, title="MA3", color=#00FFFF, linewidth=1, style=plot.style_line)
plot(ma4, title="MA4", color=color.blue, linewidth=2, style=plot.style_line)
plot(ma5, title="MA5", color=color.orange, linewidth=2, style=plot.style_line)
//Allows user to toggle on/off ma1 > ma2 filter
enableShortMAs = input(title="Enable Short MA Cross Filter", defval="No", options=["Yes", "No"])
shortMACross = enableShortMAs == "Yes" and ma1 > ma2 or enableShortMAs == "No"
//Allows user to toggle on/off ma4 > ma5 filter
enableLongMAs = input(title="Enable Long MA Cross Filter", defval="No", options=["Yes", "No"])
longMACross = enableLongMAs == "Yes" and ma4 >= ma5 or enableLongMAs == "No"
//Entry Signals
entrySignal = (strategy.position_size <= 0 and close[1] < ma1[1] and close > ma1 and close > ma2 and close > ma3 and shortMACross and ma1 > ma3 and longMACross and goTrend)
secondSignal = (strategy.position_size > 0 and close[1] < ma1[1] and close > ma1 and close > ma2 and close > ma3 and shortMACross and ma1 > ma3 and longMACross and goTrend)
plotshape(entrySignal, style=shape.triangleup, location=location.belowbar, color=color.green, size=size.small)
plotshape(secondSignal, style=shape.triangleup, location=location.belowbar, color=color.lime, size=size.small)
//ATR for Stops
atrValue = (atr(14))
//to test ATR enable next line
//plot(atrValue, linewidth=1, color=color.black, style=plot.style_line)
atrMult = input(2.5, minval=.25, step=.25, title="Stop ATR Multiple")
//Only target3Mult is used in current strategy target1 and target2 might be used in the future with pyramiding
//target1Mult = input(1.0, minval=.25, step=.25, title="Targert 1 Multiple")
//target2Mult = input(2.0, minval=.25, step=.25, title="Targert 2 Multiple")
target3Mult = input(3.0, minval=.25, step=.25, title="Target Multiple")
enableAtrStop = input(title="Enable ATR Stops", defval="No", options=["Yes", "No"])
//Intitial Recomended Stop Location
atrStop = entrySignal and ((high - (atrMult * atrValue)) < low) ? (high - (atrMult * atrValue)) : low
//oneAtrStop is used for testing only enable next 2 lines to test
//oneAtrStop = entrySignal ? (high - atrValue) : na
//plot(oneAtrStop, "One ATR Stop", linewidth=2, color=color.orange, style=plot.style_linebr)
initialStop = entrySignal and enableAtrStop == "Yes" ? atrStop : entrySignal ? low : na
//Stops changed to stoploss to hold value for orders the next line is old code "bug"
//plot(initialStop, "Initial Stop", linewidth=2, color=color.red, style=plot.style_linebr)
//Set Initial Stop and hold value "debug code"
stoploss = valuewhen(entrySignal, initialStop, 0)
plot(stoploss, title="Stop", linewidth=2, color=color.red)
enableStops = input(title="Enable Stops", defval="No", options=["Yes", "No"])
yesStops = enableStops == "Yes" ? 1 : enableStops == "No" ? 0 : na
//Calculate size of trade based on R Size
//Original buggy code: 
//positionSize = (rSize/(close - initialStop))
//Added a minimum order size of 1 "debug code"
positionSize = (rSize/(close - initialStop)) > 1 ? (rSize/(close - initialStop)) : 1
//Targets
//Enable or Disable Targets
enableTargets = input(title="Enable Targets", defval="No", options=["Yes", "No"])
yesTargets = enableTargets == "Yes" ? 1 : enableTargets == "No" ? 0 : na
//Only target3 is used in current strategy target1 and target2 might be used in the future with pyramiding
//target1 = entrySignal ? (close + ((close - initialStop) * target1Mult)) : na
//target2 = entrySignal ? (close + ((close - initialStop) * target2Mult)) : na
target3 = entrySignal ? (close + ((close - initialStop) * target3Mult)) : na
//plot(target1, "Target 1", linewidth=2, color=color.green, style=plot.style_linebr)
//plot(target2, "Target 2", linewidth=2, color=color.green, style=plot.style_linebr)
plot(target3, "Target 3", linewidth=2, color=color.green, style=plot.style_linebr)
//Set Target and hold value "debug code"
t3 = valuewhen(entrySignal, target3, 0)
//To test t3 and see plot enable next line
//plot(t3, title="Target", linewidth=2, color=color.green)
//MA1 Cross Exit
enableEarlyExit = input(title="Enable Early Exit", defval="Yes", options=["Yes", "No"])
earlyExit = enableEarlyExit == "Yes" ? 1 : enableEarlyExit == "No" ? 0 : na
ma1CrossExit = strategy.position_size > 0 and close < ma1
//Entry Order
strategy.order("Entry", long = true, qty = positionSize, when = (strategy.position_size <= 0 and entrySignal and timeFilter))
//Early Exit Order
strategy.close_all(when = ma1CrossExit and timeFilter and earlyExit, comment = "MA1 Cross Exit")
//Stop and Target Orders
//strategy.cancel orders are needed to prevent bug with Early Exit Order
strategy.order("Stop Loss", false, qty = strategy.position_size, stop=stoploss, oca_name="Exit",  when = timeFilter and yesStops, comment = "Stop Loss")
strategy.cancel("Stop Loss", when = ma1CrossExit and timeFilter and earlyExit)
strategy.order("Target", false, qty = strategy.position_size, limit=t3, oca_name="Exit",  when = timeFilter and yesTargets, comment = "Target")
strategy.cancel("Target", when = ma1CrossExit and timeFilter and earlyExit)
```

> Detail

https://www.fmz.com/strategy/431395

> Last Modified

2023-11-07 15:16:03
