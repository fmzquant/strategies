
> Name

双均线动量鞅策略Dual-Moving-Average-Momentum-Squeeze-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/101984d35d284faf341.png)
[trans]

## 概述

该策略结合了三个不同的技术指标,采用双均线系统生成交易信号,并使用K线的颜色和实体作为额外的过滤条件,从而构建一个比较稳定和有效的短线交易策略。

## 策略原理

整个策略使用布林带和KC通道的组合来识别市场的压缩和扩张阶段。具体来说,当布林带在KC通道内时认为是压缩,布林带突破KC通道时认为是扩张。压缩代表着波动加剧和趋势反转的可能,这时利用线性回归作为主要的交易信号指标。

如果线性回归histogram为正(代表着上涨趋势),并且该bar为红色K线(代表着该bar收阴),同时K线实体大于过去30根K线的平均实体的1/3,这样的组合信号则做多;反之若线性回归histogram为负,该bar为绿色K线,实体也较大,则做空。

该策略同时提供了可视化的压缩和扩张的背景,辅助判断市场阶段。

## 策略优势分析

- 利用多个指标进行组合,可以有效过滤假信号
- 压缩代表着可能的反转点,增加策略效果
- 实体过滤可以避免被小波段的假突破误导 
- 容易通过参数优化获得更好结果

## 策略风险分析

- 线性回归容易发出错误信号,可能导致亏损
- 布林带和KC通道判断压缩的效果并不理想
- 过滤条件过于苛刻,可能错过较好的入场点
- 回撤可能较大,需要忍受一定程度的承受能力

可以通过调整指标参数、优化过滤条件等方法来降低风险。

## 策略优化方向  

该策略可以从以下几个方面进行优化:

1. 尝试不同的参数组合和长度,寻找最佳参数
2. 增加或减少过滤条件,找出最佳过滤水平
3. 利用机器学习方法自动寻找最优参数
4. 在具体品种中测试效果,根据不同品种调整参数
5. 增加止损策略,以控制单笔亏损

## 总结

本策略综合多个指标,在识别压缩机会的同时增加滤波条件,形成一个较为稳健的高效短线策略。通过参数和过滤条件的优化,可以获得更好的效果。而且该策略框架灵活,易于在不同品种中调整使用,值得进一步测试和优化。

||

## Overview

This strategy combines three different technical indicators and generates trading signals using a dual moving average system, with additional filters based on the color and body of candlesticks, to construct a relatively stable and effective short-term trading strategy.

## Strategy Logic

The strategy uses Bollinger Bands and KC channels in combination to identify compression and expansion phases in the market. Specifically, when Bollinger Bands are within the KC channel, it is considered compression; when Bollinger Bands break through the KC channel, it is considered expansion. Compression represents intensified volatility and possible trend reversal, and linear regression is used as the primary trading signal indicator at this time. 

If the linear regression histogram is positive (representing an upward trend) and the bar is a red candlestick (representing a close lower), at the same time the candlestick body is larger than 1/3 of the average body of the past 30 candlesticks, such a combination signal goes long. Conversely, if the linear regression histogram is negative, the bar is a green candlestick, and the body is also large, it goes short.

The strategy also provides a visualization of the compression and expansion background to assist in judging the market stage.

## Advantage Analysis

- Using multiple indicators for combination can effectively filter false signals
- Compression represents potential reversal points and improves strategy performance 
- Body filter avoids being misled by small waves of false breakouts
- Easy to obtain better results through parameter optimization

## Risk Analysis 

- Linear regression can easily issue wrong signals, which may lead to losses
- The effect of Bollinger Bands and KC channels to judge compression is not ideal
- Filtering criteria are too harsh, possibly missing better entry points  
- Drawdowns may be larger, need to withstand a certain degree of tolerance

Risks can be reduced by adjusting indicator parameters, optimizing filtering criteria, etc.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Try different parameter combinations and lengths to find the optimal parameters
2. Increase or decrease filtering conditions to find the optimal filtering level 
3. Use machine learning methods to automatically find optimal parameters
4. Test effects in specific varieties and adjust parameters according to different varieties
5. Add stop loss strategy to control single loss

## Conclusion

This strategy combines multiple indicators, while identifying compression opportunities, it increases filtering conditions to form a relatively robust efficient short-term strategy. Through parameter and filtering condition optimization, better results can be obtained. In addition, the strategy framework is flexible and easy to adjust for use in different varieties, worth further testing and optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|20|BB Length|
|v_input_4|2|BB MultFactor|
|v_input_5|20|KC Length|
|v_input_6|1.5|KC MultFactor|
|v_input_7|true|Use color of candle|
|v_input_8|true|Use EMA Body|
|v_input_9|false|Show trend background|
|v_input_10|1900|From Year|
|v_input_11|2100|To Year|
|v_input_12|true|From Month|
|v_input_13|12|To Month|
|v_input_14|true|From day|
|v_input_15|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-24 00:00:00
end: 2023-12-24 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2017

//@version=2
strategy(shorttitle = "Squeeze str 1.0", title="Noro's Squeeze Momentum Strategy v1.0", overlay = false, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
length = input(20, title="BB Length")
mult = input(2.0,title="BB MultFactor")
lengthKC=input(20, title="KC Length")
multKC = input(1.5, title="KC MultFactor")
useTrueRange = true
usecolor = input(true, defval = true, title = "Use color of candle")
usebody = input(true, defval = true, title = "Use EMA Body")
needbg = input(false, defval = false, title = "Show trend background")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

// Calculate BB
source = close
basis = sma(source, length)
dev = multKC * stdev(source, length)
upperBB = basis + dev
lowerBB = basis - dev

// Calculate KC
ma = sma(source, lengthKC)
range = useTrueRange ? tr : (high - low)
rangema = sma(range, lengthKC)
upperKC = ma + rangema * multKC
lowerKC = ma - rangema * multKC

sqzOn  = (lowerBB > lowerKC) and (upperBB < upperKC)
sqzOff = (lowerBB < lowerKC) and (upperBB > upperKC)
noSqz  = (sqzOn == false) and (sqzOff == false)

val = linreg(source  -  avg(avg(highest(high, lengthKC), lowest(low, lengthKC)),sma(close,lengthKC)), lengthKC,0)

bcolor = iff( val > 0, iff( val > nz(val[1]), lime, green), iff( val < nz(val[1]), red, maroon))
scolor = noSqz ? blue : sqzOn ? black : gray 

trend = val > 0 ? 1 : val < 0 ? -1 : 0

//Background
col = needbg == false ? na : trend == 1 ? lime : red
bgcolor(col, transp = 80)

//EMA Body
body = abs(close - open)
emabody = ema(body, 30) / 3

//Signals
bar = close > open ? 1 : close < open ? -1 : 0
up = trend == 1 and (bar == -1 or usecolor == false) and (body > emabody or usebody == false)
dn = trend == -1 and (bar == 1 or usecolor == false) and (body > emabody or usebody == false)

if up
    strategy.entry("Long", strategy.long)

if dn
    strategy.entry("Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/436540

> Last Modified

2023-12-25 17:01:28
