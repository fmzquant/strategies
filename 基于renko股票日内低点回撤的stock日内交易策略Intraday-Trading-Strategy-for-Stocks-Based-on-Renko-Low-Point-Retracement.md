
> Name

基于renko股票日内低点回撤的stock日内交易策略Intraday-Trading-Strategy-for-Stocks-Based-on-Renko-Low-Point-Retracement

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/137b66f89e4219e3859.png)
 [trans]
### 概述

该策略主要利用renko股票日内低点回撤特征判断新的趋势方向,进而建立stock日内交易策略。当股票renko日内低点有明显回撤时,判断为新的看涨信号,采取买入操作;当股票renko收盘价有明显下跌时,判断为看跌信号,采取平仓操作。

### 策略原理

该策略主要判断标准是:股票renko日内低点回撤幅度超过上轨和下轨。其中,上轨计算方法是renko日内低点回撤20日均值+2倍标准差;下轨计算方法是renko日内低点50日最高点的85%。当renko日内低点回撤超过上轨或下轨时,判断为买入信号,否则为空仓。具体流程如下:   

1. 计算最近22根renko的最高价与最低价差额在最近20日内的标准差DesviaccionTipica
2. 计算最近22根renko的最高价与最低价差额在最近20日内的均值Media
3. 上轨Rango11 = Media + DesviaccionTipica \* 2
4. 下轨Rango22 = renko最近50根内最高点 \* 0.85
5. 当日renko满足low/highest(low,22)>Rango11或Rango22时,做多;当日renko满足close<open时,平仓

以上就是该策略的主要判断规则和交易逻辑。

### 优势分析

1. 利用renko具有的滤波假信号的优势,采用renko辅助判断,可以有效过滤震荡市的假信号
2. 基于renko日内低点回撤特征判断趋势,避免使用单一均线判断产生的误判率
3. 采用双轨判断法则,可以更准确判断趋势方向
4. 策略判断规则简洁明了,容易理解实施
5. 策略容易Parameter Tunning和优化,可以显著改进策略效果

### 风险分析

1. renko具有的repaint特性可能对实盘交易产生一定影响
2. 双轨距离设置不当可能遗漏或误判信号
3. 策略使用了单一指标判断,可能会漏掉其他指标提供的重要信号
4. 没有止损设置,可能带来更大的亏损

风险解决方法:
1. 适当放宽双轨参数,确保更多信号被捕获
2. 结合更多指标判断,例如均线、能量指标等确保准确判断
3. 加上移动止损来控制风险

### 优化方向 

1. Parameter Tunning, 优化双轨参数设置
2. 加入更多辅助技术指标判断
3. 加入止损机制
4. 对交易品种进行扩展,增加更多交易机会

### 总结

该策略整体思路清晰、易于实现,利用renko股票日内低点回撤判断新的趋势方向。策略优势在于利用renko特性进行滤波,避免误判;采用双轨判断以提高准确率。同时,策略也存在一定改进空间,关键在于参数优化、止损设置以及多指标融合判断。总体而言,该策略为一个易于理解、简单有效的stock日内交易策略。

||

### Overview

This strategy mainly utilizes the intraday renko low point retracement characteristics of stocks to determine the new trend direction, and thus establishes an intraday trading strategy. When there is an obvious pullback of the renko intraday low point, it is judged as a new bullish signal and a long position will be taken. When there is a significant decline in the renko closing price, it is regarded as a bearish signal and existing position will be closed.

### Strategy Logic

The main criteria of this strategy are: the intraday renko low point retracement exceeds the upper rail and lower rail. The upper rail is calculated as the 20-day average + 2 standard deviations of the renko intraday low point retracement over the past 20 days; The lower rail is calculated as 85% of the highest point of the renko intraday low point retracement over the past 50 days. When the renko intraday low point retracement exceeds the upper rail or lower rail, it is regarded as a buy signal, otherwise the position will be cleared. The specific process is as follows:

1. Calculate the standard deviation DesviaccionTipica of the difference between the highest price and the lowest price of the most recent 22 renko bars over the past 20 days 
2. Calculate the 20-day moving average Media of the difference between the highest price and the lowest price of the most recent 22 renko bars
3. Upper rail Rango11 = Media + DesviaccionTipica * 2  
4. Lower rail Rango22 = highest point of the most recent 50 renko bars * 0.85
5. When today's renko satisfies low/highest(low,22)>Rango11 or Rango22, go long; when today's renko satisfies close<open, close position

The above is the main judgment rules and trading logic of this strategy.  

### Advantage Analysis 

1. Utilizing the noise filtering capability of renko, renko is used as an assistant judgment to effectively filter out false signals in range-bound markets
2. Judging the trend based on renko intraday low point retracement features avoids the misjudgment caused by using a single moving average 
3. The double rail judgment rules can determine the trend direction more accurately  
4. The strategy judgment rules are simple and easy to understand and implement
5. The strategy is easy to parameter tuning and optimization, which can significantly improve strategy performance

### Risk Analysis

1. The repainting characteristics of renko may have some impact on actual trading
2. Improper settings of double rail distances may miss or misjudge signals  
3. The strategy uses a single indicator for judgment, which may miss important signals provided by other indicators  
4. No stop loss setting may lead to greater losses  

Risk Mitigations:
1. Properly relax double rail parameters to ensure more signals are captured  
2. Incorporate judgments of more indicators such as moving averages and energy indicators to ensure accurate judgments 
3. Add moving stop loss to control risks

### Optimization Directions

1. Parameter Tuning, optimize double rail parameter settings  
2. Incorporate judgments of more technical indicators  
3. Add stop loss mechanism  
4. Expand trading varieties to increase trading opportunities  

### Summary  

The overall idea of this strategy is clear and easy to implement. It utilizes the renko intraday low point retracement to determine the new trend direction. The advantages of this strategy are that it uses renko characteristics for filtration to avoid misjudgment, and adopts double rail judgment to improve accuracy. At the same time, there are also some rooms for improvement of this strategy. The keys are parameter optimization, stop loss setting, and integration of multiple indicator judgments. In general, this is an easy to understand and effective intraday trading strategy for stocks.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Rango 1|
|v_input_2|false|Rango 2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=2
strategy("Renko Stock Daily")


Rango1 = input(false, title="Rango 1")
Rango2 = input(false, title="Rango 2")

Situacion = ((highest(close, 22)-low)/(highest(close, 22)))*100

DesviaccionTipica = 2 * stdev(Situacion, 20)
Media = sma(Situacion, 20)

Rango11 = Media + DesviaccionTipica

Rango22 = (highest(Situacion, 50)) * 0.85


advertir = Situacion >= Rango11 or Situacion >= Rango22 ? green : red    



if (Situacion[1] >= Rango11[1] or Situacion[1] >= Rango22[1]) and (Situacion[0] < Rango11[0] and Situacion[0] < Rango22[0])and (close>open)
    strategy.entry("Entrar", strategy.long,comment= "Entrar",when=strategy.position_size <= 0)


strategy.close_all(when=close<open)



plot(Rango1 and Rango22 ? Rango22 : na, title="Rango22", style=line, linewidth=4, color=orange)
plot(Situacion, title="Rengo Stock Daily", style=histogram, linewidth = 4, color=advertir)
plot(Rango2 and Rango11 ? Rango11 : na, title="Upper Band", style=line, linewidth = 3, color=aqua)


```

> Detail

https://www.fmz.com/strategy/440507

> Last Modified

2024-01-31 10:53:17
