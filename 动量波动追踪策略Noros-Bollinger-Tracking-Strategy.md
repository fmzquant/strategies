
> Name

动量波动追踪策略Noros-Bollinger-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d852ec85e6bf00135e.png)

[trans]

## 概述
该策略是一个基于布林带的动量波动追踪策略。它结合布林带指标判断市场趋势和反转点,通过设置多空仓位追踪市场波动。

## 策略原理
该策略的核心指标是布林带。布林带由中轨、上轨和下轨组成。中轨是n天的移动平均线,上下轨分别是中轨加减标准差的偏移。当价格接近上下轨时视为超买超卖的信号。策略加入趋势偏离作为建仓的依据,即当价格反向突破中轨时开仓。为防止假突破造成亏损,策略要求开仓突破幅度大于均值。平仓条件是突破中轨后价格再次回折。

该策略同时加入了趋势性建仓和反转型建仓,分别对应不同的交易机会。趋势性建仓要求中轨作为支撑阻力参考,形成突破偏离的效果。反转型建仓则直接在布林带上下轨附近反转形成。策略通过组合这两种启示,能够兼顾趋势追踪和反转操作。

## 优势分析
该策略结合布林带的超买超卖特征,加入反转点判断。这使得其能够同时适用于趋势市和震荡市,捕捉不同类型的交易机会。策略的止损 Exit 设置防止了亏损扩大。多空双向交易的特点也增强了策略的适用性。

相比简单布林带策略,该策略加入的趋势逻辑判断使得建仓更稳定,同时也抓住了反转机会。这让信噪比得到提升。其次,多空双向交易也比较全面的利用了不同市场的交易机会。

## 风险分析
该策略主要依赖布林带的超买超卖特征。所以当价格出现剧烈波动时,布林带区间会不断增加,容易导致多次亏损建仓。这是潜在的风险点。此外,反转判断依然有一定的不确定性和误差,会造成失败的建仓和停损。

针对布林带失效的情况,可以缩短n天参数,使布林带更灵敏。或者减小它的幅度范围,降低造成亏损的可能。对于反转曲线判断,则可通过优化突破的参数来减少错误。

## 优化方向
该策略可优化的方向主要有以下几个:
1. 布林带的参数可根据不同市场调整,找到最佳的参数组合。
2. 趋势偏离的幅度和均值的计算方式可以测试其他选项。
3. 加入更多过滤器判断建仓信号,减少误判概率。
4. 可测试止损方式,如trail停损等其他模式。
5. 可以针对特定品种、周期进行参数调优。


## 总结
该策略对布林带标准策略进行了有效的扩展与优化。加入的趋势偏离判断提高了稳定性,利用好了反转机会。多空双向交易和止损设置也让策略更加健壮。通过参数优化和加入更多过滤器,可进一步提高效果

||


## Overview
This is a momentum tracking strategy based on Bollinger Bands. It combines Bollinger Bands to judge market trends and reversal points, and sets long and short positions to track market fluctuations.

## Principles
The core indicator of this strategy is Bollinger Bands, which consists of middle band, upper band and lower band. The middle band is the moving average of n days, and the upper and lower bands are the offsets of the middle band plus/minus standard deviation. When the price approaches the upper/lower band, it is considered a signal of overbought/oversold. The strategy incorporates trend deviation as the basis for opening positions, i.e. opening positions when the price breaks through the middle band in the opposite direction. To prevent losses caused by false breakouts, the strategy requires that the width of breakout is greater than the mean. The closing condition is that the price turns back after breaking through the middle band.

This strategy also incorporates both trend-following entries and mean-reversion entries, corresponding to different trading opportunities. Trend-following entries require the middle band to be the support/resistance reference and form deviation breakouts. Mean-reversion entries directly reverse near the upper/lower Bollinger bands. The strategy combines these two types of signals and can take both trend tracking and reversal operations.

## Advantage Analysis 
This strategy combines the overbought/oversold characteristics of Bollinger Bands with reversal point judgment. This enables it to apply to both trending and ranging markets, capturing different types of trading opportunities. The stop loss exit setting prevents the loss from expanding. Also, the ability to trade both long and short enhances the applicability of the strategy.

Compared with simple Bollinger strategies, the additional trend logic makes entries of this strategy more stable, and it also captures reversal opportunities. This improves the signal-to-noise ratio. In addition, trading both directions utilizes trading opportunities more fully across different market situations.

## Risk Analysis
This strategy mainly relies on the overbought/oversold characteristics of Bollinger Bands. So when there is extreme price fluctuation, the width of Bollinger Bands keeps expanding, which can easily lead to multiple losing trades. This is a potential risk point. In addition, there are still some uncertainties and errors in reversal judgments, causing failed entries and stops.

Against the failure of Bollinger Bands, we can shorten the parameter n to make the bands more sensitive, or reduce the band width to lower the chance of losses. As for reversal curve judgments, optimizing the parameters of breakouts can reduce errors.

## Optimization Directions
The main directions to optimize this strategy include:
1. The parameters of Bollinger Bands can be adjusted according to different markets to find the optimal combination.
2. The magnitude of deviation and the calculation of mean values can be tested with other options.  
3. Add more filters to judge entry signals and reduce false positives.
4. Test other stop loss methods like trail stop loss.
5. Parameters can be optimized towards specific products and timeframes.

## Conclusion
This strategy makes effective expansions and optimizations to standard Bollinger strategies. The added trend deviation improves stability and utilizes reversal opportunities well. The ability to trade both directions and stop losses also makes the strategy more robust. Further improvements can be achieved through parameter optimization and adding more filters.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|20|Bollinger Length|
|v_input_4|2|Bollinger Mult|
|v_input_5_ohlc4|0|Bollinger Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_6|true|Use trend entry|
|v_input_7|true|Use counter-trend entry|
|v_input_8|2018|From Year|
|v_input_9|2100|To Year|
|v_input_10|true|From Month|
|v_input_11|12|To Month|
|v_input_12|true|From day|
|v_input_13|31|To day|
|v_input_14|true|Show Bollinger Bands|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-11-27 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=3
strategy("Noro's Bollinger Strategy v1.3", shorttitle = "Bollinger str 1.3", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100.0, pyramiding = 5)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")

length = input(20, defval = 20, minval = 1, maxval = 1000, title = "Bollinger Length")
mult = input(2.0, defval = 2.0, minval = 0.001, maxval = 50, title = "Bollinger Mult")
source = input(ohlc4, defval = ohlc4, title = "Bollinger Source")

uset = input(true, defval = true, title = "Use trend entry")
usect = input(true, defval = true, title = "Use counter-trend entry")

fromyear = input(2018, defval = 2018, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")
showbands = input(true, defval = true, title = "Show Bollinger Bands")

//Bollinger Bands
basis = sma(source, length)
dev = mult * stdev(source, length)
upper = basis + dev
lower = basis - dev

//Lines
col = showbands ? black : na 
plot(upper, linewidth = 1, color = col)
plot(basis, linewidth = 1, color = col)
plot(lower, linewidth = 1, color = col)

//Body
body = abs(close - open)
abody = ema(body, 30)

//Signals
bar = close > open ? 1 : close < open ? -1 : 0 
up1 = bar == -1 and ohlc4 >= basis and ohlc4 < upper and (close < strategy.position_avg_price or strategy.position_size == 0) and uset
dn1 = bar == 1 and ohlc4 <= basis and ohlc4 > lower and (close > strategy.position_avg_price or strategy.position_size == 0) and uset
up2 = close <= lower and usect
dn2 = close >= upper and usect
exit = ((strategy.position_size > 0 and close > open) or (strategy.position_size < 0 and close < open)) and body > abody / 2

//Trading
if up1 or up2
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if dn1 or dn2
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if time > timestamp(toyear, tomonth, today, 23, 59) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/433588

> Last Modified

2023-11-28 16:57:28
