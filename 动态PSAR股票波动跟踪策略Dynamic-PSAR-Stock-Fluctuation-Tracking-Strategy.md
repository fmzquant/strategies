
> Name

动态PSAR股票波动跟踪策略Dynamic-PSAR-Stock-Fluctuation-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13bf3536176ed9e8720.png)
[trans]

### 概述

本策略基于Parabolic SAR指标实现了一个简单高效的股票波动跟踪和自动止盈止损的策略。它可以动态跟踪股票价格的涨跌趋势,并在涨跌反转点自动设置止盈止损点,无需人工干预,实现自动化交易。

### 策略原理  

本策略使用Parabolic SAR指标判断股票价格波动的趋势方向。当PSAR指标位于K线之下时,表示正在上涨趋势;当PSAR指标位于K线之上时,表示正在下跌趋势。策略会实时追踪PSAR值的变化来判断趋势的变化。

在确认上的涨趋势时,策略会在下一个BAR的PSAR点位设置止损点;在确认下跌趋势时,策略会在下一个BAR的PSAR点位设置止盈点。这样就实现了股票价格反转时,自动止盈止损的功能。

同时,策略内置了起步值、步进值和最大值等参数,可以调整PSAR指标的敏感度,从而优化止盈止损的效果。

### 策略优势分析  

本策略最大的优势在于实现了股票波动跟踪和自动止盈止损的全自动化。不需要人工判断市场走势就可以实现盈利,大大降低了手工交易的时间和精力成本。

相比传统止损止盈策略,本策略的止盈止损点是浮动变化的,能更快捷地捕捉价格变化带来的机会,同时也能降低错误判断的概率,提高盈利空间。

在参数优化后,本策略可以在大趋势中持续盈利,同时在反转来临时自动止损Protect本金。

### 风险分析

本策略最大的风险在于PSAR指标判断错趋势方向的概率。当股票价格出现短期调整震荡时,PSAR指标可能发生错误信号。此时就需要合理优化PSAR的参数,提高判断准确性。

另一个风险点是止盈止损点过于接近当前价格。这可能导致止损点被突破的概率增加,给本金带来更大冲击。此时需要适当放宽止盈止损范围,保证有足够的缓冲空间。

### 策略优化方向  

本策略的优化余地主要集中在PSAR指标本身的参数调整上。通过测试不同股票并优化起步值、步进值和最大值的设置,可以使PSAR指标对价格波动更加敏感,同时也要保证判断准确性。这需要大量的回测和分析工作。

另一个优化方向是设置止盈止损的范围。这需要研究不同股票的日内波动范围,并在此基础上设定合理的盈亏比例要求。这可以进一步减少本金损失的概率。

### 总结  

本策略利用Parabolic SAR指标实现了股票跟踪和自动止盈止损的全自动化交易策略。它最大的优势是无需人工干预,可以降低时间和精力成本。风险主要来自指标判断失误,可以通过参数优化来减少。总体而言,本策略为股票量化交易提供了一个高效可靠的解决方案。

||

### Overview

This strategy implements a simple and efficient stock fluctuation tracking and automatic take profit/stop loss strategy based on the Parabolic SAR indicator. It can dynamically track the uptrend and downtrend of stock prices and automatically set take profit/stop loss points at the reversal points without manual intervention, realizing automated trading.

### Strategy Principle

This strategy uses the Parabolic SAR indicator to determine the trend direction of stock price fluctuations. When the PSAR indicator is below the K-line, it indicates an upward trend; when the PSAR indicator is above the K-line, it indicates a downward trend. The strategy tracks changes in PSAR values ​​in real time to determine changes in trends.

When an upward trend is confirmed, the strategy will set a stop loss point at the PSAR point of the next BAR; when a downward trend is confirmed, the strategy will set a take profit point at the PSAR point of the next BAR. This achieves the automatic take profit/stop loss function when stock prices reverse.

At the same time, the strategy has built-in parameters such as starting value, step value and maximum value to adjust the sensitivity of the PSAR indicator, thereby optimizing the effect of take profit/stop loss.

### Advantage Analysis

The biggest advantage of this strategy is that it realizes full automation of stock fluctuation tracking and automatic take profit/stop loss. Profits can be realized without manual judgment of market trends, which greatly reduces the time and energy costs of manual trading.

Compared with traditional stop loss/take profit strategies, the take profit/stop loss points of this strategy are variable, which can capture price changes and opportunities more quickly. It also reduces the probability of misjudgment and increases profit potential.

After parameter optimization, this strategy can continuously profit in major trends, while automatically stop loss to protect the principal when reversal comes.

### Risk Analysis  

The biggest risk of this strategy is the probability that the PSAR indicator misjudges the trend direction. When the stock price has a short-term adjustment and fluctuation, the PSAR indicator may give a wrong signal. At this time, it is necessary to reasonably optimize the parameters of PSAR to improve the accuracy of judgment.

Another risk point is that the take profit/stop loss point is too close to the current price. This may increase the probability that the stop loss point is broken, bringing greater impact to the principal. At this time, appropriately relax the take profit/stop loss range to ensure sufficient buffer space.

### Strategy Optimization  

The optimization potential of this strategy mainly focuses on adjusting the parameters of the PSAR indicator itself. By testing different stocks and optimizing the settings of starting value, step value and maximum value, the PSAR indicator can be more sensitive to price fluctuations, while ensuring judgment accuracy. This requires a lot of backtesting and analysis work.

Another optimization direction is to set the range of take profit/stop loss. It is necessary to study the intraday fluctuation range of different stocks, and set reasonable profit/loss ratio requirements based on this. This can further reduce the probability of principal loss.

### Summary   

This strategy utilizes the Parabolic SAR indicator to realize a fully automated stock tracking and automatic take profit/stop loss trading strategy. Its biggest advantage is that no manual intervention is required, which can reduce time and energy costs. The main risks come from misjudgments of indicators, which can be reduced through parameter optimization. In general, this strategy provides an efficient and reliable solution for quantitative trading of stocks.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.02|start|
|v_input_2|0.02|increment|
|v_input_3|0.2|maximum|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-28 00:00:00
end: 2024-02-04 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Swing Parabolic SAR Strategy", overlay=true)
start = input(0.02)
increment = input(0.02)
maximum = input(0.2)
var bool uptrend = na
var float EP = na
var float SAR = na
var float AF = start
var float nextBarSAR = na
if bar_index > 0
	firstTrendBar = false
	SAR := nextBarSAR
	if bar_index == 1
		float prevSAR = na
		float prevEP = na
		lowPrev = low[1]
		highPrev = high[1]
		closeCur = close
		closePrev = close[1]
		if closeCur > closePrev
			uptrend := true
			EP := high
			prevSAR := lowPrev
			prevEP := high
		else
			uptrend := false
			EP := low
			prevSAR := highPrev
			prevEP := low
		firstTrendBar := true
		SAR := prevSAR + start * (prevEP - prevSAR)
	if uptrend
		if SAR > low
			firstTrendBar := true
			uptrend := false
			SAR := max(EP, high)
			EP := low
			AF := start
	else
		if SAR < high
			firstTrendBar := true
			uptrend := true
			SAR := min(EP, low)
			EP := high
			AF := start
	if not firstTrendBar
		if uptrend
			if high > EP
				EP := high
				AF := min(AF + increment, maximum)
		else
			if low < EP
				EP := low
				AF := min(AF + increment, maximum)
	if uptrend
		SAR := min(SAR, low[1])
		if bar_index > 1
			SAR := min(SAR, low[2])
	else
		SAR := max(SAR, high[1])
		if bar_index > 1
			SAR := max(SAR, high[2])
	nextBarSAR := SAR + AF * (EP - SAR)
	if barstate.isconfirmed
		if uptrend
			strategy.entry("short", strategy.short, stop=nextBarSAR, comment="short")
			strategy.cancel("long")
		else
			strategy.entry("long", strategy.long, stop=nextBarSAR, comment="long")
			strategy.cancel("short")
			
plot(SAR, style=plot.style_cross, linewidth=3, color=color.orange)
plot(nextBarSAR, style=plot.style_cross, linewidth=3, color=color.aqua)

```

> Detail

https://www.fmz.com/strategy/441050

> Last Modified

2024-02-05 10:40:12
