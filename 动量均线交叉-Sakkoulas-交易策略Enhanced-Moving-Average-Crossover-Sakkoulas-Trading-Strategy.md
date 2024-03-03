
> Name

动量均线交叉-Sakkoulas-交易策略Enhanced-Moving-Average-Crossover-Sakkoulas-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17259864848a43653f1.png)
[trans]
### 概述

本交易策略结合了移动平均线交叉(MACD)、相对强弱指标(RSI)、简单移动平均线(SMA)、随机指标(Stochastic)和布林带(Bollinger Bands)等多种技术指标,识别市场的入市和退出点。当指标显示多头信号时,做多;当显示空头信号时,做空。同时,通过止损和止盈来控制风险。

### 策略原理

当MACD的DIF线上穿DEA线而进入多头状态时;或RSI低于30进入超卖状态时;或随机指标的%K线和%D线同时低于20进入超卖状态时,做多。

相反,当MACD的DIF线下穿DEA线而进入空头状态时;或RSI高于70进入超买状态时;或随机指标的%K线和%D线同时高于80进入超买状态时,做空。

止损根据ATR指标乘以一个系数来设置,止盈根据风险回报比来设置。

### 优势分析

该策略融合了多种指标判断市场状态,避免单一指标判断失误的概率,提高决策的准确性。同时,止损和止盈设置合理,有效控制单笔交易的风险。

### 风险分析

技术指标由历史数据计算,无法预测未来价格,存在一定的滞后。多个指标组合使用也可能会出现一定的假信号。此外,止损点设置不当也会带来更大的亏损。

针对技术指标滞后的问题,可以适当调整参数,缩短计算周期。对于假信号,可以增加其他辅助判断指标进行确认。此外,止损点应设置得更为宽松和合理。

### 优化方向  

该策略可以在以下几个方面进行优化:

1. 增加统计模型指标,结合趋势和相关性判断入市;
2. 增加机器学习模型判断指标信号的可靠性;  
3. 优化资金管理,使止损止盈更加自动化和智能化。

### 总结

本策略结合多种技术指标判断,可以有效提高决策准确性,通过止损止盈控制风险,是一种可靠的趋势跟踪策略。后续通过引入统计学和机器学习等方法,有望进一步增强策略的性能。

||

### Overview

This trading strategy combines moving average convergence divergence (MACD), relative strength index (RSI), simple moving average (SMA), stochastic oscillator and Bollinger bands to identify market entry and exit points. It goes long when indicators show bullish signals and goes short when bearish signals appear. Risk is controlled by stop loss and take profit.  

### Strategy Logic

It goes long when the MACD DIF line crosses above the DEA line into bullish zone; or when RSI drops below 30 into oversold territory; or when stochastic %K and %D lines fall below 20 showing oversold status.  

On the contrary, it goes short when MACD DIF line crosses below DEA line into bearish zone; or when RSI rises above 70 into overbought area; or when stochastic %K and %D lines climb over 80 indicating overbought condition.

Stop loss is set based on ATR multiplied by a coefficient. Take profit is determined by risk-reward ratio.

### Advantage Analysis 

This strategy combines multiple indicators to judge market status, avoiding errors by single metric and improving accuracy. Also stop loss and take profit are reasonably set to control risk for each trade.

### Risk Analysis  

Technical indicators are calculated from historical data and cannot predict future prices, leading to certain lags. Combining multiple indicators may also introduce some false signals. In addition, improper stop loss setting can result in larger losses.  

To tackle indicator lag issue, parameters can be adjusted to shorten computing cycle. For false signals, additional auxiliary indicators can be added for confirmation. Also, stop loss should be set wider and more reasonably.

### Optimization Directions

The strategy can be enhanced in the following aspects:

1. Incorporate statistical model indicators based on trend and correlation analysis for entry;
2. Add machine learning model to judge reliability of indicator signals; 
3. Optimize money management for more automated and intelligent stop loss and take profit.   

### Summary

This strategy combines multiple technical indicators for improved accuracy and controls risk via stop loss and take profit, making it a reliable trend following system. Its performance is expected to be further boosted by introducing statistical and machine learning techniques going forward.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|16|Fast Length|
|v_input_int_2|6|Slow Length|
|v_input_int_3|5|Signal Smoothing|
|v_input_int_4|6|RSI Length|
|v_input_int_5|70|Upper Bound|
|v_input_int_6|30|Lower Bound|
|v_input_int_7|10|SMA Period|
|v_input_int_8|5|Stochastic Length|
|v_input_int_9|3|Stochastic %K Smoothing|
|v_input_int_10|10|Stochastic %D Smoothing|
|v_input_int_11|20|Bollinger Bands Length|
|v_input_float_1|true|Bollinger Bands StdDev|
|v_input_int_12|14|ATR Length|
|v_input_float_2|1.5|ATR Multiplier for Stop Loss|
|v_input_float_3|0.02|SAR Acceleration|
|v_input_float_4|0.2|SAR Maximum|
|v_input_float_5|2|Risk/Reward Ratio|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-21 00:00:00
end: 2024-02-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Enhanced Moving Average Crossover sakkoulas with ATR and SAR", overlay=true)

// Παράμετροι MACD
fastLength = input.int(16, title="Fast Length")
slowLength = input.int(6, title="Slow Length")
signalSmoothing = input.int(5, title="Signal Smoothing")

// Παράμετροι RSI
rsiLength = input.int(6, title="RSI Length")
upperBound = input.int(70, title="Upper Bound")
lowerBound = input.int(30, title="Lower Bound")

// Παράμετροι SMA
smaPeriod = input.int(10, title="SMA Period")

// Παράμετροι Stochastic
stoLength = input.int(5, title="Stochastic Length")
stoSmoothK = input.int(3, title="Stochastic %K Smoothing")
stoSmoothD = input.int(10, title="Stochastic %D Smoothing")

// Παράμετροι Bollinger Bands
bbLength = input.int(20, title="Bollinger Bands Length")
bbStdDev = input.float(1, title="Bollinger Bands StdDev")

// Παράμετροι ATR
atrLength = input.int(14, title="ATR Length")
atrMultiplier = input.float(1.5, title="ATR Multiplier for Stop Loss")

// Παράμετροι Parabolic SAR
sarAcceleration = input.float(0.02, title="SAR Acceleration")
sarMaximum = input.float(0.2, title="SAR Maximum")

// Διαχείριση κινδύνου
riskRewardRatio = input.float(2.0, title="Risk/Reward Ratio")

// Υπολογισμοί δεικτών
[macdLine, signalLine, _] = ta.macd(close, fastLength, slowLength, signalSmoothing)
rsi = ta.rsi(close, rsiLength)
sma = ta.sma(close, smaPeriod)
atr = ta.atr(atrLength)

// Παράμετροι και κλήση του Parabolic SAR
sar = ta.sar(sarAcceleration, sarMaximum, 15) // Διορθωμένη κ
// Υπολογισμός Stop Loss με βάση το ATR
longStopLoss = close - atrMultiplier * atr 
shortStopLoss = close + atrMultiplier * atr

// Συνθήκες για είσοδο και έξοδο
longCondition = ta.crossover(macdLine, signalLine) and close > sar
shortCondition = ta.crossunder(macdLine, signalLine) and close < sar

// Εκτέλεση εντολών συναλλαγής με διαχείριση κινδύνου
if (longCondition)
    strategy.entry("Long Position", strategy.long)
    strategy.exit("Exit Long", "Long Position", stop=longStopLoss)
    
if (shortCondition)
    strategy.entry("Short Position", strategy.short)
    strategy.exit("Exit Short", "Short Position", stop=shortStopLoss)

// Συνθήκες για είσοδο και έξοδο
 
// Εμφάνιση βελών για σημεία εισόδου
plotshape(series=longCondition, location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small, title="Long Entry")
plotshape(series=shortCondition, location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small, title="Short Entry")


// Εμφάνιση δεικτών
plot(macdLine, color=color.blue, title="MACD Line")
plot(signalLine, color=color.red, title="Signal Line")
plot(sma, color=color.orange, title="SMA")
plot(series=sar, color=color.fuchsia, style=plot.style_circles, title="Parabolic SAR")
hline(upperBound, "Upper Bound", color=color.red)
hline(lowerBound, "Lower Bound", color=color.green)
```

> Detail

https://www.fmz.com/strategy/442389

> Last Modified

2024-02-21 15:14:19
