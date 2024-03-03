
> Name

双轨突破均线交叉策略Double-Rail-Breakthrough-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/dd3ac170fdb48f3f7b.png)
[trans]

## 概述

双轨突破均线交叉策略是一种趋势跟踪型的量化交易策略。该策略运用双轨道机制判断市场趋势方向,配合均线交叉信号进行进场。具体来说,策略使用不同周期的平均线构建双轨道,通过价格突破上轨或下轨来判断趋势;然后结合快慢均线交叉信号过滤入场时机。

## 策略原理

双轨突破均线交叉策略主要由以下几部分组成:

1. **趋势判断模块**:使用不同周期均线构建双轨,价格突破上轨判断为上涨趋势,突破下轨判断为下跌趋势。

2. **入场模块**:快速均线上穿中长线均线时做多,下穿时做空。同时需要判断趋势方向。

3. **出场模块**:快速均线下穿中长线均线时平仓。

策略首先利用 Trend Required 参数设定需要判断的趋势强度。当价格突破上轨或下轨时,判断为趋势形成。此后,当快速均线上穿中长线均线时,做多入场;当快速均线下穿中长线均线时,做空入场。入场后,以快速均线下穿中长线均线作为离场信号。

此外,策略还设有止损、止盈模块。具体参数可以进行调整优化,以控制风险和获利。

## 优势分析  

相比单轨或单均线策略,双轨突破均线交叉策略综合了趋势判断和入场时机选择,可以更好地把握市场节奏。具体优势有:

1. 双轨设定可以更准确判断趋势,避免错过机会。

2. 均线交叉过滤可以减少假突破做反方向操作的概率。

3. 可以通过参数调整,实现风险和收益的优化。

4. 策略逻辑简单清晰,容易理解,便于跟踪。

## 风险分析

双轨突破均线交叉策略也存在一定的风险,主要表现在:  

1. 双轨道设定并不能完全避免趋势判断错误的概率。

2. 均线参数设置不当可能导致交易频率过高或反向操作。

3. 止损点设置过于宽松,无法有效控制单次损失。

对应解决方法如下:

1. 调整双轨参数,适当放宽突破判断范围。

2. 优化均线周期组合,确保交易频率合理。

3. 测试不同止损点水平,找到最优参数。

## 优化方向

双轨突破均线交叉策略还有以下几个可优化的方向:

1. 测试不同均线周期参数,找到最优组合。

2. 尝试加入更多均线,构建多均线过滤系统。

3. 测试不同的止损算法,如追踪止损、震荡止损等。

4. 加入复利机制,优化资金利用效率。

5. 结合其他指标进行过滤,如布林带、KDJ等。

## 总结

双轨突破均线交叉策略综合考虑了趋势判断和入场时机选择,可以有效把握市场节奏。相比单一指标,该策略具有判断更准、过滤更优的特点。通过参数优化和模块升级,有望进一步提高策略的稳定性和收益率。

|| 

## Overview  

The double rail breakthrough moving average crossover strategy is a trend-following quantitative trading strategy. The strategy uses a double rail mechanism to judge the market trend direction and combines moving average crossover signals to enter the market. Specifically, the strategy uses moving averages of different cycles to build a double rail and judges the trend by whether the price breaks through the upper or lower rail; then it combines fast and slow moving average crossover signals to filter entry timing.

## Strategy Principle  

The double rail breakthrough moving average crossover strategy consists of the following parts:

1. **Trend judgement module**: Use moving averages of different cycles to build a double rail. When the price breaks through the upper rail, it is judged as an uptrend. When it breaks through the lower rail, it is judged as a downtrend.

2. **Entry module**: Go long when the fast moving average crosses above the medium and long moving average, and go short when it crosses below. It also needs to determine the trend direction. 

3. **Exit module**: Close positions when the fast moving average crosses below the medium and long moving average.

The strategy first uses the Trend Required parameter to set the required trend strength. When the price breaks through the upper or lower rail, a trend is determined to have formed. Thereafter, go long when the fast moving average crosses above the medium and long moving average; go short when the fast moving average crosses below. Use the fast moving average crossing below the medium and long moving average as the exit signal after entering.

In addition, the strategy also has stop loss and take profit modules. The specific parameters can be adjusted and optimized to control risks and profits.  

## Advantage Analysis

Compared with single rail or single moving average strategies, the double rail breakthrough moving average crossover strategy combines trend judgment and entry timing selection, which can better grasp the market rhythm. The specific advantages are:

1. The double rail setting can more accurately determine the trend and avoid missing opportunities.  

2. The moving average crossover filter can reduce the probability of doing reverse operations due to false breakouts.

3. Risk and return can be optimized by adjusting parameters.

4. The strategy logic is simple and clear, easy to understand and track.

## Risk Analysis 

The double rail breakthrough moving average crossover strategy also has some risks, mainly:
 
1. The double rail setting still cannot completely eliminate the probability of trend misjudgment.  

2. Improper setting of moving average parameters may lead to excessively high trading frequency or reverse operations.

3. Overly loose stop loss points cannot effectively control single loss.

The corresponding solutions are:

1. Adjust double rail parameters appropriately to widen breakout judgment range.

2. Optimize moving average cycle portfolio to ensure reasonable trading frequency.  

3. Test different levels of stop loss points to find optimal parameters.

## Optimization Directions

The double rail breakthrough moving average crossover strategy also has the following optimizable directions:

1. Test different moving average cycle parameters to find optimal portfolio.  

2. Try adding more moving averages to build a multi-moving average filtering system.

3. Test different stop loss algorithms, such as trailing stop loss, oscillating stop loss, etc.

4. Add compounding mechanism to optimize capital utilization efficiency. 

5. Combine with other indicators for filtering, such as Bollinger Bands, KDJ, etc.

## Summary  

The double rail breakthrough moving average crossover strategy comprehensively considers trend judgment and entry timing selection, which can effectively grasp the market rhythm. Compared with single indicators, this strategy has the advantages of more accurate judgment and better filtering. By optimizing parameters and upgrading modules, it is expected to further improve the stability and profitability of the strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2015|Start Year|
|v_input_2|0|R Static or Percent: Static|Percent|
|v_input_3|2000|R Size Static|
|v_input_4|3|R Size Percent|
|v_input_5|W|Trend Timeframe|
|v_input_6|26|# of Bars for Trend|
|v_input_7|15|Trend Growth %|
|v_input_8|0|Trend Required: Orange|Yellow|Green|Red|
|v_input_9|10|MA1 Period|
|v_input_10|0|MA1 Type: EMA|SMA|WMA|
|v_input_11|20|MA2 Period|
|v_input_12|0|MA2 Type: EMA|SMA|WMA|
|v_input_13|50|MA3 Period|
|v_input_14|0|MA3 Type: EMA|SMA|WMA|
|v_input_15|100|MA4 Period|
|v_input_16|0|MA4 Type: SMA|EMA|WMA|
|v_input_17|200|MA5 Period|
|v_input_18|0|MA5 Type: SMA|EMA|WMA|
|v_input_19|0|Enable Short MA Cross Filter: Yes|No|
|v_input_20|0|Enable Long MA Cross Filter: Yes|No|
|v_input_21|2.5|Stop ATR Multiple|
|v_input_22|3|Target Multiple|
|v_input_23|0|Enable ATR Stops: Yes|No|
|v_input_24|0|Enable Stops: Yes|No|
|v_input_25|0|Enable Targets: Yes|No|
|v_input_26|0|Enable Early Exit: Yes|No|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-12 00:00:00
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
timeFilter = (year >= startYear) and (month >= 1) and (dayofmonth >= 1)
//R Size (Risk Amount)
rStaticOrPercent = input(title="R Static or Percent", defval="Static", options=["Static", "Percent"])
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
trendRequired = input(title="Trend Required", defval="Orange", options=["Green", "Yellow", "Orange", "Red"])
goTrend = trendRequired == "Orange" ? upTrend or sidewaysUpTrend or sidewaysDownTrend : trendRequired == "Yellow" ? upTrend or sidewaysUpTrend : trendRequired == "Green" ? upTrend : trendRequired == "Red" ? upTrend or sidewaysUpTrend or sidewaysDownTrend or downTrend : na
//MAs Inputs Defalt is 10 EMA, 20 EMA, 50 EMA, 100 SMA and 200 SMA
ma1Length = input(10, title="MA1 Period", minval=1, step=1)
ma1Type = input(title="MA1 Type", defval="EMA", options=["SMA", "EMA", "WMA"])
ma2Length = input(20, title="MA2 Period", minval=1, step=1)
ma2Type = input(title="MA2 Type", defval="EMA", options=["SMA", "EMA", "WMA"])
ma3Length = input(50, title="MA3 Period", minval=1, step=1)
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
enableShortMAs = input(title="Enable Short MA Cross Filter", defval="Yes", options=["Yes", "No"])
shortMACross = enableShortMAs == "Yes" and ma1 > ma2 or enableShortMAs == "No"
//Allows user to toggle on/off ma4 > ma5 filter
enableLongMAs = input(title="Enable Long MA Cross Filter", defval="Yes", options=["Yes", "No"])
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
enableAtrStop = input(title="Enable ATR Stops", defval="Yes", options=["Yes", "No"])
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
enableStops = input(title="Enable Stops", defval="Yes", options=["Yes", "No"])
yesStops = enableStops == "Yes" ? 1 : enableStops == "No" ? 0 : na
//Calculate size of trade based on R Size
//Original buggy code: 
//positionSize = (rSize/(close - initialStop))
//Added a minimum order size of 1 "debug code"
positionSize = (rSize/(close - initialStop)) > 1 ? (rSize/(close - initialStop)) : 1
//Targets
//Enable or Disable Targets
enableTargets = input(title="Enable Targets", defval="Yes", options=["Yes", "No"])
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
strategy.order("Stop Loss", false, qty = strategy.position_size, stop=stoploss, oca_name="Exit",when = timeFilter and yesStops, comment = "Stop Loss")
strategy.cancel("Stop Loss", when = ma1CrossExit and timeFilter and earlyExit)
strategy.order("Target", false, qty = strategy.position_size, limit=t3, oca_name="Exit",  when = timeFilter and yesTargets, comment = "Target")
strategy.cancel("Target", when = ma1CrossExit and timeFilter and earlyExit)
```

> Detail

https://www.fmz.com/strategy/434560

> Last Modified

2023-12-07 15:32:51
