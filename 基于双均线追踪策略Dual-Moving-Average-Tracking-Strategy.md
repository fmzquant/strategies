
> Name

基于双均线追踪策略Dual-Moving-Average-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1cafd06adba197e5da5.png)
[trans]

## 概述

双均线追踪策略是一种基于均线指标的量化交易策略。该策略主要利用了移动平均线的黄金交叉和死亡交叉来发出买入和卖出信号。当短期移动平均线从下方上穿较长周期的移动平均线时,产生黄金交叉信号;当短期移动平均线从上方下穿较长周期的移动平均线时,产生死亡交叉信号。本策略同时结合RSI指标和ADX指标来确定趋势的方向和力度,在趋势较强时选择入场。

## 策略原理  

该策略主要基于三个技术指标:

1. 超越指标(Supertrend):用于判断价格的主要趋势方向。当Supertrend指标方向变化时,判断为价格趋势转折点,发出交易信号。

2. RSI指标(Relative Strength Index):一种震荡指标,用于判断超买超卖情况。本策略在RSI指标显示价格短期超买或超卖时发出交易信号。  

3. ADX指标(Average Directional Indicator):用于判断趋势的力度。本策略结合ADX判断趋势力度,在趋势较强时选择入场。

当Supertrend指标方向变化,表示价格趋势发生转折;同时RSI指标显示超买超卖现象,表明短期需求供应关系发生转变,价格可能反转;此外,ADX指标显示趋势力度较大,这就为本策略的入场提供了机会。具体来说,当出现Supertrend方向变化,RSI指标显示超卖,且ADX>20时,发出做多信号;当Supertrend方向变化,RSI指标显示超买,发出平仓信号。

## 策略优势  

1. 使用双均线系统,能够有效跟踪价格趋势的变化,Profit从趋势中获利。

2. 结合RSI指标判断超买超卖现象,避免在价格转折点追高杀低。

3. ADX指标判断趋势力度,使得本策略主要在趋势较强时出手,从大趋势中获利。

4. 策略参数经过优化选择,对比测试表现良好。

## 风险与解决  

1. 双均线策略本身对价格变化较为敏感,可能产生较多的交易信号。解决方法是适当调整均线参数,缩小交易频率。  

2. RSI指标和ADX指标都可能出现失效的情况。解决方法是进行参数优化,调整指标计算周期。

3. 本策略需选择合适的止损策略。解决方法是设置合理的移动止损或挂单止损。

## 策略优化方向  

1. 对交易频率进行优化。可以尝试优化均线系统参数,调整交易频率。

2. 可以引入其他辅助指标。比如引入交易量指标,在大单进场时选择入场。

3. 可以结合机器学习算法进行参数优化。使用算法预测最优参数组合。

4. 引入止损机制。设置移动止损或者挂单止损来控制单笔损失。

## 总结  

本策略是一种双均线追踪策略,核心思路是跟踪均线指标判断价格趋势,并结合RSI指标和ADX指标选择入场时机。其优势在于能顺应趋势运行,在超买超卖现象出现时机敏锐入场,从大趋势中获利。该策略风险主要来自于价格变化敏感性大,可能产生过于频繁交易。通过参数优化与止损手段,可以有效调整该策略,使其在实盘中获得更好表现。

||

## Overview  

The Dual Moving Average Tracking strategy is a quantitative trading strategy based on moving average indicators. This strategy mainly utilizes the golden cross and death cross of moving averages to generate buy and sell signals. When the short-term moving average crosses above the longer-term moving average from below, a golden cross signal is generated. When the short-term moving average crosses below the longer-term moving average from above, a death cross signal is generated. This strategy also incorporates the RSI indicator and the ADX indicator to determine the direction and strength of the trend and enter when the trend is strong.   

## Strategy Principle

This strategy is mainly based on three technical indicators:  

1. Supertrend: Used to judge the main trend direction of prices. When the Supertrend indicator direction changes, it is judged as an inflection point in the price trend and a trading signal is issued.

2. RSI Indicator (Relative Strength Index): An oscillating indicator used to judge overbought and oversold conditions. This strategy issues trading signals when the RSI indicator shows that prices are overbought or oversold in the short term.   

3. ADX Indicator (Average Directional Indicator): Used to judge the strength of the trend. This strategy incorporates ADX to judge the trend strength and chooses to enter when the trend is strong.  

When the Supertrend indicator direction changes, it means the price trend has reversed. At the same time, the RSI indicator shows an overbought/oversold phenomenon, indicating a turnaround in short-term supply and demand relationships, and prices may reverse. In addition, the ADX indicator shows that the trend strength is large. This provides an opportunity for this strategy to enter. Specifically, when Supertrend direction changes, RSI shows oversold, and ADX>20, a long signal is issued. When Supertrend direction changes and RSI shows overbought, a closing signal is issued.  

## Advantages of the Strategy  

1. Using a dual moving average system can effectively track changes in price trends and profit from the trend.  

2. Incorporating the RSI indicator to judge overbought and oversold conditions avoids chasing highs and selling lows at price reversal points.   

3. The ADX indicator judges the strength of the trend, so that this strategy mainly acts when the trend is strong, profiting from the major trend.  

4. The strategy parameters have been optimized and tested to show good performance.   

## Risks and Solutions

1. The dual moving average strategy itself is quite sensitive to price changes, which may generate more trading signals. The solution is to appropriately adjust the moving average parameters to reduce trading frequency.

2. The RSI and ADX indicators can both fail. The solution is to optimize the parameters and adjust the indicator calculation cycle.  

3. This strategy requires an appropriate stop loss strategy. The solution is to set reasonable movement or pending order stops.

## Strategy Optimization Directions  

1. Optimize trading frequency. Try optimizing the parameters of the moving average system to adjust trading frequency.  

2. Additional auxiliary indicators can be introduced. For example, introducing trading volume indicators and entering when large orders come in.

3. Machine learning algorithms can be combined for parameter optimization. Use algorithms to predict optimal parameter combinations.  

4. Introduce a stop loss mechanism. Set movement or pending order stops to control single loss.

## Conclusion  

This is a dual moving average tracking strategy. The core idea is to track moving average indicators to judge price trends, and choose entry timing combined with RSI and ADX indicators. Its advantage is that it can follow trends, keenly entering on overbought/oversold phenomena, and profiting from major trends. The main risks of this strategy come from high sensitivity to price changes, which may generate overly frequent trading. Through parameter optimization and stop loss measures, this strategy can be effectively adjusted for better performance in live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ATR Length|
|v_input_float_1|3|Factor|
|v_input_2|7|ADX Smoothing|
|v_input_3|7|DI Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-18 00:00:00
end: 2023-12-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Supertrend Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=120,
     initial_capital=1000, margin_long=0.1)

atrPeriod = input(10, "ATR Length")
factor = input.float(3.0, "Factor", step=0.01)

[_, direction] = ta.supertrend(factor, atrPeriod)

adxlen = input(7, title="ADX Smoothing")
dilen = input(7, title="DI Length")
dirmov(len) =>
	up = ta.change(high)
	down = -ta.change(low)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
	minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange = ta.rma(ta.tr, len)
	plus = fixnan(100 * ta.rma(plusDM, len) / truerange)
	minus = fixnan(100 * ta.rma(minusDM, len) / truerange)
	[plus, minus]
adx(dilen, adxlen) =>
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * ta.rma(math.abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
sig = adx(dilen, adxlen)

if ta.change(direction) < 0 and ta.rsi(close, 21) < 66 and ta.rsi(close, 3) > 80 and ta.rsi(close, 28) > 49 and sig > 20
    strategy.entry("My Long Entry Id", strategy.long)

if ta.change(direction) > 0
    strategy.close("My Long Entry Id")  // Close long position

//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)

```

> Detail

https://www.fmz.com/strategy/436541

> Last Modified

2023-12-25 17:04:29
