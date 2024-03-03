
> Name

Supertrend-Bitcoin长线策略Supertrend-Bitcoin-Long-Line-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/166743bd5e0c56668ca.png)
[trans]

### 概述

Supertrend Bitcoin长线策略是一个只做多头的比特币交易策略。它结合使用SuperTrend指标、RSI相对强弱指标和ADX平均方向指数来确定入场点。

### 策略原理

当满足以下入场条件时,策略会开仓做多:

1. SuperTrend指标变为负向
2. 21周期RSI低于66
3. 3周期RSI高于80
4. 28周期RSI高于49
5. ADX信号高于20

当SuperTrend指标变为正向时,策略会平仓离场。

该策略使用账户权益的100% Margins率设定为10%。它会在图表上绘制策略权益曲线,用于分析。这种设置旨在在比特币市场的长线趋势中,在特定的技术指标条件下捕捉阳线行情。

### 优势分析

Supertrend Bitcoin长线策略最大的优势在于,它只在技术指标充分确认市场趋势后才入场。具体来说,它要求短期和长期RSI同时呈现超买或超卖信号,表示大周期和小周期走势达成共识,从而过滤掉很多噪音交易机会。同时结合ADX判断趋势力度,避免在盘整震荡市中随波逐流。

这种只做多不做空的策略,也避免了空头交易中无限亏损的风险。在长线看涨的大周期,追涨杀跌可以获得较好的胜率和收益回报率。

### 风险分析

Supertrend Bitcoin长线策略最大的风险在于,它无法响应突发消息引发的短期调整和回撤。当利空消息面市,价格出现断崖式下跌时,由于只做多无法切换方向,这时就会遭受巨额亏损。这属于无法规避的残余风险。

另一个潜在风险是,SuperTrend等指标判断市场结构转折点的效果并不理想。它们往往会滞后,从而错过最佳入场时机或出场时机。这可能导致获得的收益远低于市场本身。为减轻这一风险,可以适当调整参数,或增加其他先行指标进行确认。

### 优化方向 

Supertrend Bitcoin长线策略还有进一步优化的空间:

1. 可以增加游离股指标、OBV指标等,对买卖力度进行判断,防止在高位燥股中追高

2. 可以结合波动率指标,只在波动加大时才入场,避免陷入无利可图的低波动区间

3. 可以加入自动止损模块,设定回撤范围,避免出现超出风险偏好的大额亏损

4. 可以进行参数优化,调整RSI周期参数,提高指标效果

5. 可以结合机器学习模型,实现动态参数和多因子优化

通过这些优化,可以进一步提高策略的稳定性、胜率和盈利水平。

### 总结

Supertrend Bitcoin长线策略是一个简单直接的量化投资策略。它旨在捕捉比特币或加密货币市场中的长线阳线,通过追涨杀跌获得稳定收益。尽管仍存在一定风险,但通过参数调整和模型优化,这一策略可以进一步增强,成为量化交易的有利工具。它为投资者提供了一个整体乐观看多加密市场,分享数字资产增长红利的思路。

||

### Overview

The Supertrend Bitcoin Long Line Strategy is a Bitcoin trading strategy that only takes long positions. It uses a combination of the SuperTrend indicator, RSI (Relative Strength Index), and ADX (Average Directional Index) to determine entry points.

### Strategy Principle  

The strategy will open a long position when the following entry conditions are met:

1. The SuperTrend indicator turns negative
2. The 21-period RSI is below 66  
3. The 3-period RSI is above 80
4. The 28-period RSI is above 49  
5. The ADX signal is above 20

The strategy will close the long position when the SuperTrend indicator turns positive.

The strategy uses 100% of the equity for each trade, with the margin for long positions set at 10%. It plots the strategy's equity on the chart for analysis. This setup aims to capture long trends in the Bitcoin market under specific conditions defined by these technical indicators.

### Advantage Analysis

The biggest advantage of the Supertrend Bitcoin Long Line Strategy is that it only enters the market after the technical indicators have fully confirmed the market trend. Specifically, it requires short-term and long-term RSI to show overbought or oversold signals at the same time, indicating that major and minor cycle trends have reached a consensus to filter out a lot of noisy trading opportunities. while combining ADX to determine the strength of the trend, avoid going with the flow in a sideways market.

This kind of long-only, no-short strategy also avoids the risk of unlimited losses in short selling. In the long-term bull market cycle, chasing rises and killing falls can obtain better win rate and return on investment.

### Risk Analysis  

The biggest risk of the Supertrend Bitcoin Long Line Strategy is that it cannot respond to short-term adjustments and pullbacks caused by sudden news. When bearish news hits the market and prices plummet, being long-only means it cannot switch direction, which will then suffer huge losses. This is an unavoidable residual risk.

Another potential risk is that the effectiveness of SuperTrend and other indicators in determining market structure turning points is not ideal. They tend to lag, thus missing the best entry or exit timing. This may lead to much lower returns than the market itself. To mitigate this risk, parameters can be appropriately adjusted or additional leading indicators can be added for confirmation.

### Optimization Direction   

The Supertrend Bitcoin Long Line Strategy has room for further optimization:  

1. Free float indicators, OBV indicators, etc. can be added to judge buying and selling power to prevent chasing highs amid thin trading volumes  

2. Volatility indicators can be combined to only enter when volatility increases, avoiding low volatility ranges where there is little profit  

3. Automatic stop loss modules can be added to set retracement ranges to avoid excessive losses beyond risk tolerance   

4. Parameter optimization can be performed to adjust RSI cycle parameters and improve indicator effectiveness  

5. Machine learning models can be combined to enable dynamic parameter and multi-factor optimization

Through these optimizations, the stability, win rate and profit level of the strategy can be further improved.   

### Summary

The Supertrend Bitcoin Long Line Strategy is a simple and straightforward quantitative investment strategy. It aims to capture long bull runs in the Bitcoin or cryptocurrency market and obtain steady returns by chasing rises and killing falls. Although there are still some risks, through parameter adjustment and model optimization, this strategy can be further enhanced to become an advantageous quantitative trading tool. It provides investors with an overall optimistic outlook on the cryptocurrency market and a way to share the growth dividends of digital assets.

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
start: 2023-01-26 00:00:00
end: 2024-02-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Supertrend Bitcoin Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, initial_capital=1000, margin_long=0.1)

atrPeriod = input(10, "ATR Length")
factor = input.float(3.0, "Factor", step = 0.01)

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

plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)


```

> Detail

https://www.fmz.com/strategy/440876

> Last Modified

2024-02-02 17:57:43
