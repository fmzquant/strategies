
> Name

双均线交叉反转趋势追踪策略Dual-Moving-Average-Crossover-Reverse-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/127742509d2d11fd28b.png)

[trans]

## 概述

本策略是一种组合策略,结合使用了三种不同的策略来产生交易信号。首先是123形态反转策略,它会在价格出现特定形态时产生交易信号;其次是均线交叉策略,它通过比较移动平均线和指数移动平均线的交叉来判断趋势;最后,本策略还允许选择是否进行反向交易。这三种策略的组合可以捕捉趋势反转点,同时过滤掉部分噪音交易信号。

## 策略原理

### 123形态反转策略

该策略来源于Ulf Jensen的《我如何在期货市场上获得三倍收益》一书中提出的方法。该策略基于股票的收盘价和斯托克随机指标进行交易。具体规则是:

当收盘价比前一日收盘价高,且比前两日收盘价也高,同时9日周期的Stochastic Slow指标低于50时,做多;当收盘价比前一日收盘价低,且比前两日收盘价也低,同时9日周期的Stochastic Fast指标高于50时,做空。

这样,它可以在价格出现三日新高或新低的同时,结合随机指标的过卖或过买信号来捕捉反转机会。

### 均线交叉策略

该策略使用 lengthMA周期的简单移动平均线 和 lengthEMA周期的指数移动平均线的交叉来产生交易信号。规则是:

当指数移动平均线上穿简单移动平均线时做多;当指数移动平均线下穿简单移动平均线时做空。

这样,它可以比较直观地判断出价格趋势的转折点。且指数移动平均线对价格变化更为敏感,可以更早地发出交易信号。

### 反向交易

本策略允许选择是否进行反向交易。如果选择反向交易,那么做多信号会变成做空,做空信号会变成做多。这对于一些坚信市场常存在误导性行为的交易者来说可能更有利。

## 策略优势

这种组合策略结合多种单一策略的优点,可以在一定程度上规避单一策略的风险,提高收益率。

具体来说,123形态反转策略可以在价格出现转折迹象时及时捕捉;均线交叉策略可以判断趋势方向;允许反向交易可以减少被套利的概率。

总的来说,本策略反应灵敏,良好跟踪趋势,并可自定义配置以适应不同市场环境。

## 策略风险

本策略最大的风险在于组合策略本身就比较复杂,不太容易判断 Fail/Success 的原因,不利于进行策略优化。

此外,跟其他任何技术分析策略一样,本策略也面临被套、止损失效等问题。具体来说,价格剧烈震荡时,容易产生误信号;持续、剧烈的趋势时,止损线易被突破。

为降低这些风险,可以适当调整参数,使指标更为平稳;可以适当放宽止损线,或使用交易量止损等方法。

## 策略优化

本策略还可从以下几个方面进行优化:

1. 添加过滤条件,如交易量、波动率等指标,可过滤掉一些无效信号

2. 优化参数,寻找最佳的参数组合

3. 尝试不同的均线交叉指标,寻找更匹配当下市场环境的指标

4. 增加机器学习模型,利用AI技术自动优化参数

## 总结

本策略作为一种组合策略,集多种单一策略优点于一身,可以有效跟踪趋势反转,适合中长线操作。配以参数优化、风险控制等手段,其效果可获得显著提高。值得量化交易从业者深入研究、应用与改进。

||

## Overview

This strategy is a combination strategy that combines three different strategies to generate trading signals. First, it uses the 123 reversal pattern strategy, which generates trading signals when prices form specific patterns. Second, it uses the moving average crossover strategy, which judges the trend by comparing the crossovers between moving averages and exponential moving averages. Finally, this strategy also allows choosing whether to trade reversely. The combination of these three strategies can capture trend reversal points while filtering out some noisy trading signals.

## Strategy Logic

### 123 Reversal Pattern Strategy

This strategy originates from the method proposed in Ulf Jensen's book "How I Tripled My Money in the Futures Market". The strategy trades based on the closing price of stocks and the Stochastic Oscillator indicator. Specifically, the rules are:

When the closing price is higher than the previous closing price and also higher than the closing price two days ago, while the 9-period Stochastic Slow is below 50, go long. When the closing price is lower than the previous closing price and also lower than the closing price two days ago, while the 9-period Stochastic Fast is above 50, go short.  

Thus, it can capture reversal opportunities when prices form three-day new highs or lows while combining with oversold or overbought signals from the stochastic indicator.

### Moving Average Crossover Strategy  

This strategy uses the crossover between the lengthMA-period simple moving average and the lengthEMA-period exponential moving average to generate trading signals. The rules are:

When the exponential moving average crosses above the simple moving average, go long. When the exponential moving average crosses below the simple moving average, go short.

Thus, it can intuitively judge the turning points of price trends. Also, the exponential moving average is more sensitive to price changes and can issue trading signals earlier.

### Reverse Trading

This strategy allows choosing whether to trade reversely. If reverse trading is selected, long signals become short signals, and vice versa. This may be more beneficial for some traders who firmly believe there are often misleading behaviors in the market.

## Advantages of the Strategy

This combined strategy inherits the advantages of various single strategies to some extent, which can mitigate the risks of a single strategy and increase returns.

Specifically, the 123 reversal pattern strategy can timely capture turns when prices show signs of reversal; the moving average crossover strategy can determine the trend direction; allowing reverse trading can reduce the probability of being trapping.

In general, this strategy is sensitive, tracks trends well, and can be custom configured to suit different market environments.

## Risks of the Strategy  

The most significant risk of this strategy is that the combination strategy itself is quite complicated, making it hard to determine the reasons for failure/success and unfavorable for strategy optimization.

Besides, like any other technical analysis strategy, this strategy also faces risks like being trapped and stop-loss failure. Specifically, it is prone to generate false signals when prices fluctuate sharply. Also, stop-loss lines tend to be broken in a persistent and violent trend.

To mitigate these risks, we can appropriately adjust parameters to make indicators more stable, loosen stop-loss lines reasonably, or use methods like volume stop-loss.

## Optimization

This strategy can be further optimized in the following aspects:

1. Add filtering conditions like trading volumes and volatility to filter out invalid signals.

2. Optimize parameters to find the best parameter combinations.  

3. Try different moving average crossover indicators to find the ones that match the current market best.

4. Increase machine learning models to automatically optimize parameters using AI technologies.

## Summary  

As a combination strategy, this strategy combines the advantages of various single strategies and can effectively track trend reversals. It is suitable for medium-to-long-term operations. With proper optimization, risk management, etc., its performance can be significantly improved. It deserves in-depth research, application, and improvement by practitioners of quantitative trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|10|LengthMA|
|v_input_6|10|LengthEMA|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-27 00:00:00
end: 2024-01-03 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 19/06/2020
// This is combo strategies for get a cumulative signal. 
//
// First strategy
// This System was created from the Book "How I Tripled My Money In The 
// Futures Market" by Ulf Jensen, Page 183. This is reverse type of strategies.
// The strategy buys at market, if close price is higher than the previous close 
// during 2 days and the meaning of 9-days Stochastic Slow Oscillator is lower than 50. 
// The strategy sells at market, if close price is lower than the previous close price 
// during 2 days and the meaning of 9-days Stochastic Fast Oscillator is higher than 50.
//
// Second strategy
// The Moving Average Crossover trading strategy is possibly the most popular
// trading strategy in the world of trading. First of them were written in the
// middle of XX century, when commodities trading strategies became popular.
// This strategy is a good example of so-called traditional strategies. 
// Traditional strategies are always long or short. That means they are never 
// out of the market. The concept of having a strategy that is always long or 
// short may be scary, particularly in today’s market where you don’t know what 
// is going to happen as far as risk on any one market. But a lot of traders 
// believe that the concept is still valid, especially for those of traders who 
// do their own research or their own discretionary trading. 
// This version uses crossover of moving average and its exponential moving average.
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
Reversal123(Length, KSmoothing, DLength, Level) =>
    vFast = sma(stoch(close, high, low, Length), KSmoothing) 
    vSlow = sma(vFast, DLength)
    pos = 0.0
    pos := iff(close[2] < close[1] and close > close[1] and vFast < vSlow and vFast > Level, 1,
	         iff(close[2] > close[1] and close < close[1] and vFast > vSlow and vFast < Level, -1, nz(pos[1], 0))) 
	pos

MACross(LengthMA,LengthEMA) =>
    pos = 0
    xMA = sma(close, LengthMA)
    xEMA = ema(xMA, LengthEMA)
    pos := iff(xEMA < xMA , 1,
	       iff(xEMA > xMA, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & EMA & MA Crossover", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthMA = input(10, minval=1)
LengthEMA = input(10,minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posMACross = MACross(LengthMA,LengthEMA)
pos = iff(posReversal123 == 1 and posMACross == 1 , 1,
	   iff(posReversal123 == -1 and posMACross == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/437658

> Last Modified

2024-01-04 15:48:15
