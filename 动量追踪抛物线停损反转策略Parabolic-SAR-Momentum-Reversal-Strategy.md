
> Name

动量追踪抛物线停损反转策略Parabolic-SAR-Momentum-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/efc7411f52f0ae1400.png)
[trans]

## 概述

该策略是一个利用抛物线滑点值(Parabolic SAR)与K线进行交叉操作,实现动量追踪和止损的Swing交易策略。策略会在看涨和看跌形势下建立做多和做空仓位,在价格反转时平掉这些仓位止损。

## 策略原理

该策略主要依靠抛物线指标(Parabolic SAR)判断当前是价格上涨趋势还是下跌趋势。当Parabolic SAR指标在K线下方时,表示目前处于价格上涨状态,这时策略会在每根K线收盘时检查Parabolic SAR值是否上穿K线最低价,如果没有上穿,说明上涨趋势继续,策略会建立做多仓位;如果Parabolic SAR上穿K线最低价,说明上涨趋势反转为下跌,这时策略会平掉做多仓位止损。相反,当Parabolic SAR指标在K线上方时,表示目前处于价格下跌状态。这时,策略会在每根K线收盘时检查Parabolic SAR值是否下穿K线最高价,如果没有下穿,则建立做空头寸;如果下穿,说明下跌趋势反转为上涨,这时平掉做空头寸止损。

通过这样的操作原理,该策略能够在确认的价格趋势下顺势建立仓位,并在第一时间止损,从而锁定盈利。同时,抛物线作为动量指标,能够更准确地判断趋势是否反转,这也使得止损更为精确。

## 策略优势

1. 利用抛物线判断趋势和反转点,是一个比较先进和准确的技术指标,能够提高判断精准度
2. 采用动量追踪和反转止损的操作方式,能够充分利用价格趋势带来的机会
3. 反转止损规则比较严格,风险控制能力较强
4. 该策略参数经过优化,特别适合应用在GBP/JPY这个具有强劲 추세的货币对上

## 策略风险

1. 如其他任何单一指标策略,该策略可能会出现抛物线误判价格趋势和反转点的情况。如果指标失效,可能导致不必要的亏损。
2. 该策略是完全依赖抛物线的指示进行操作,如果指标参数设置不当,止损点设置过于宽松,则无法有效控制风险。
3. 任何单一策略都可能由于市场结构或环境变化而逐步失效,需要及时检验和优化策略。

提高策略健壮性的方法包括:优化止损点设置使其足够严格;结合其他指标判断作为确认;调整指标参数适应市场环境变化;根据不同品种选择最优参数组合等。

## 策略优化方向  

1. 该策略可以测试并优化抛物线的参数组合,以获得更好的指标表现
2. 可以结合其他判断指标,例如MACD,KD等,形成多指标确认体系,提高操作信号的可靠性
3. 可以测试不同的止损方式,如轧差止损、时间止损、价格止损等的效果
4. 根据不同的品种特点,优化参数,使策略在不同品种上都能获得良好回报

## 总结

该抛物线Swing策略整体来说是一个效果较好的短线操作策略。它利用抛物线指标判断趋势方向和 prices 的动量变化,配合Swing交易方式,在品种上涨和下跌阶段反复建立做多和做空仓位。严格的止损机制也使得该策略风险控制能力较强。但作为单一指标策略,抛物线的失效也会对策略产生较大的影响。所以这是一个有一定优势和潜力,但也存在一定风险的策略,需要根据实际情况检验和不断优化,才能使其产生持续稳定的超额收益。

||

## Overview

This strategy utilizes the crossover operation between the Parabolic SAR sliding value and candlestick to achieve momentum tracking and stop loss for swing trading. The strategy will establish long and short positions when the price is rising and falling. It will close out these positions to stop loss when the price reverses.

## Strategy Logic  

The core of this strategy relies on the Parabolic SAR indicator to determine whether the current price is in an upward or downward trend. When the Parabolic SAR indicator is below the candlestick, it means that the price is currently rising. In this case, the strategy will check at the close of each candlestick whether the Parabolic SAR value crosses above the low of the candlestick. If not, it means the upward trend continues and the strategy will establish a long position. If Parabolic SAR crosses above the low, it means the upside trend reverses downside, and the strategy will close the long position to stop loss. 

On the contrary, when Parabolic SAR is above the candlestick, it means the price is currently falling. In this case, the strategy will check at the close of each candlestick whether Parabolic SAR crosses below the high of the candlestick. If not, it will establish a short position. If Parabolic SAR crosses the high, it means the downside trend reverses upside, and the strategy will close the short position to stop loss.

Through this logic, the strategy can establish positions along the price trend and realize stop loss in the first time when trend reverses, locking in profits. Meanwhile, Parabolic SAR as a momentum indicator can more accurately determine whether the trend is reversed, making the stop loss more precise.

## Advantages

1. Parabolic SAR is an advanced and accurate technical indicator to determine trend and reversal points, improving judgment accuracy.
2. Taking advantage of momentum tracking and reversal stop loss methods can make full use of trending opportunities.  
3. The strict stop loss rules mean good risk control capability.
4. Optimized parameters make this strategy particularly suitable for GBP/JPY with strong trend.

## Risks

1. Like any single indicator strategies, this strategy may suffer from Parabolic SAR's misjudgement on trend and reversals. Invalid signals may lead to unnecessary losses.  
2. The strategy fully depends on Parabolic SAR for entries and exits. Improper parameter settings and loose stop loss points may fail to control risks effectively.
3. Any single strategy may gradually deteriorate due to changing market structure and environments. Regular backtests and optimizations are necessary.

Methods to enhance robustness include: optimizing stop loss points to make them strict enough; combining other indicators for confirmation; adjusting parameters to adapt to changing environments; selecting optimal parameter sets for different products, etc.

## Optimization Directions

1. Test and optimize combinations of Parabolic SAR parameters for better performance.
2. Combine other indicators like MACD, KD to form a multi-indicator confirmation system, improving signal reliability. 
3. Test effects of different stop loss methods like trail stop loss, time stop loss, price stop loss, etc.
4. Optimize parameters based on different product characteristics so that the strategy can achieve good returns across products.

## Conclusion

In general, this Parabolic SAR swing strategy is quite an effective short-term trading strategy. It takes advantage of Parabolic SAR to determine trend direction and momentum changes, together with swing trading methods, to repeatedly establish long and short positions during uptrends and downtrends. The strict stop loss mechanism also gives this strategy decent risk control capability. But as a single indicator strategy, the invalidity of Parabolic SAR will have a significant impact. So this is a strategy with some strength and potential, but also has some risks. It needs backtests, optimizations and enhancements to generate stable excess returns in live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.05|start|
|v_input_2|0.075|increment|
|v_input_3|true|maximum|
|v_input_4|true|From Day|
|v_input_5|true|From Month|
|v_input_6|2000|From Year|
|v_input_7|31|To Day|
|v_input_8|12|To Month|
|v_input_9|2020|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-14 00:00:00
end: 2023-12-21 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Parabolic SAR Strategy", overlay=true)
start = input(0.05)
increment = input(0.075)
maximum = input(1)

fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2000, title = "From Year", minval = 1970)
 //monday and session 
// To Date Inputs
toDay = input(defval = 31, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2020, title = "To Year", minval = 1970)

startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true

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
	if barstate.isconfirmed and time_cond
		if uptrend
			strategy.entry("ParSE", strategy.short, stop=nextBarSAR, comment="ParSE")
			strategy.cancel("ParLE")
		else
			strategy.entry("ParLE", strategy.long, stop=nextBarSAR, comment="ParLE")
			strategy.cancel("ParSE")
plot(SAR, style=plot.style_cross, linewidth=3, color=color.orange)
plot(nextBarSAR, style=plot.style_cross, linewidth=3, color=color.aqua)
//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)
```

> Detail

https://www.fmz.com/strategy/436247

> Last Modified

2023-12-22 14:45:12
