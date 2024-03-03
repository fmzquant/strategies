
> Name

动量寻找策略Momentum-Finding-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/af41b3f93b4a5f1146.png)
 [trans]
## 概述

本策略通过布林带、KC通道和蜡烛线颜色等多重指标判断市场的压缩和释放,并结合均线的方向判断 establishment 趋势,在趋势方向发生转折的时候进行操作。

## 策略原理

1. 计算布林带。布林带中轨为N日收盘价的简单移动平均线,上轨为中轨+KC通道的N日真实波幅的M倍,下轨为中轨-KC通道的N日真实波幅的M倍。

2. 计算KC通道。KC通道中轨为N日收盘价的简单移动平均线,上轨为中轨+N日真实波幅的M倍,下轨为中轨-N日真实波幅的M倍。

3. 判断压缩和释放。当布林带上轨低于KC通道上轨且布林带下轨高于KC通道下轨时为压缩,当布林带上轨高于KC通道上轨且布林带下轨低于KC通道下轨时为释放。

4. 计算establishment趋势。以N日收盘价-N日最高价和最低价的平均价为输入,计算N日线性回归,其值大于0表示establishment上涨趋势,小于0表示establishment下跌趋势。

5. 交易信号。establishment上涨时,短阳线和释放为做多信号;establishment下跌时,短阴线和压缩为做空信号。

## 策略优势

1. 多重指标判断,提高信号准确率。结合布林带、KC通道和蜡烛线判断市场走势,避免假信号。

2. establishment趋势判断,按趋势交易。利用establishment判断主要趋势,避免逆势操作。

3. 自动止损,控制风险。当价格触碰止损线时,自动平仓止损。

## 策略风险

1. 布林带和KC通道参数设置不当,可能导致压缩和释放判断错误。

2. establishment趋势判断滞后,可能错过趋势转折点。

3. 突发事件造成巨大行情,无法止损,存在较大亏损风险。

优化方法:调整布林带和KC通道参数,采用ADX等指标辅助判断;及时更新establishment均线周期,降低滞后;设置止损线时加入缓冲区。

## 策略优化方向  

1. 结合更多技术指标,提高建仓信号准确性。例如KDJ、MACD等。

2. 优化establishment均线的周期参数,使其更能捕捉新的趋势。

3. 加入交易量指标,避免虚假突破。例如能量潮指标、Accumulation/Distribution等。  

4. 多时间周期判断,区分中长线和短线信号。避免被套。

5. AI优化参数, searched枚举和searched最优参数组合。降低过拟合。

## 总结  

本策略主要思路是:采用布林带判定市场的压缩和释放;辅助使用establishment趋势判断主要趋势方向;在压缩释放的转折点进行反establishment方向的操作。策略优势是信号较准、有止损、避免假信号。策略可优化的方向有:多指标组合、趋势判断参数优化、加入量能指标、多时间周期判断、AI寻优等。总体来说,本策略基于市场的自我相似和周期性运行规律,通过指标描绘市场节奏的变化,在市场由能量存积转为能量释放的关键点进行交易,属于典型的计时交易策略。

||

## Overview  

This strategy uses multiple indicators such as Bollinger Bands, KC channels, and candlestick colors to determine market squeezes and releases, and combines establishment trend judgments based on moving averages to make transactions when trend reversals occur.

## Strategy Principle  

1. Calculate Bollinger Bands. The middle rail of Bollinger Bands is the simple moving average of N-day closing prices, the upper rail is the middle rail + M times the N-day true range volatility of the KC channel, and the lower rail is the middle rail - M times the N-day true range volatility of the KC channel.

2. Calculate the KC channel. The middle rail of the KC channel is the simple moving average of N-day closing prices, the upper rail is the middle rail + M times the N-day true range volatility, and the lower rail is the middle rail - M times the N-day true range volatility.  

3. Judge squeeze and release. When the Bollinger Band upper rail is below the KC channel upper rail and the Bollinger Band lower rail is above the KC channel lower rail, it is a squeeze. When the Bollinger Band upper rail is above the KC channel upper rail and the Bollinger Band lower rail is below the KC The channel lower rail is released.

4. Calculate the establishment trend. Take the N-day closing price-average of the highest and lowest prices of N days as input, calculate the N-day linear regression, and its value greater than 0 indicates an upward establishment trend, and less than 0 indicates establishment downward trend.

5. Trading signals. When the establishment is rising, short yang lines and releases are long signals; when the establishment is falling, short yin lines and squeezes are short signals.  

## Strategy Advantages  

1. Multi-indicator judgment improves signal accuracy. Combining Bollinger Bands, KC channels and candlesticks to judge market trends avoids false signals. 

2. Establishment trend judgment, trade according to the trend. Use establishment to determine the main trend and avoid trading against the trend.

3. Automatic stop loss to control risks. When the price touches the stop loss line, automatically close the position to stop loss.

## Strategy Risks

1. Improper parameter settings for Bollinger Bands and KC channels may result in erroneous judgments of squeezes and releases.  

2. The establishment trend judgment lags, which may miss trend reversal points.

3. Sudden events cause huge moves that cannot be stopped, with considerable loss risks.

Optimization methods: Adjust Bollinger Band and KC channel parameters, use ADX and other indicators to assist in judging; Update the establishment moving average cycle in time to reduce lag; Add a buffer zone when setting the stop loss line.

## Strategy Optimization Directions   

1. Combine more technical indicators to improve the accuracy of opening positions signals. Such as KDJ, MACD, etc.  

2. Optimize the cycle parameters of the establishment moving average to make it better capture new trends.

3. Add trading volume indicators to avoid false breakouts. Such as Energy tide indicator, Accumulation/Distribution, etc.   

4. Multi-timeframe judgments distinguish between medium-and-long-term and short-term signals. Avoid being trapped.  

5. AI ​​optimization parameters, exhaustive search and optimal parameter combination searched. Reduce overfitting.

## Summary   

The main idea of ​​this strategy is: using Bollinger Bands to determine the compression and release of the market; auxiliary use establishment trend to determine the main trend direction; operate in the opposite direction of the establishment at the turning point of compression and release. The advantages of the strategy are accurate signals, stop losses, and avoiding false signals. The directions for optimizing the strategy include: multi-indicator combinations, trend judgment parameter optimization, adding momentum indicators, multi-timeframe judgments, AI ​​search optimization, etc. Overall, this strategy is based on the self-similarity and periodic operation rules of the market, depicting the rhythm changes of the market through indicators, and trading at the critical points when the market changes from energy storage to energy release, which belongs to a typical cycle trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|true|leverage|
|v_input_4|20|BB Length|
|v_input_5|2|BB MultFactor|
|v_input_6|20|KC Length|
|v_input_7|1.5|KC MultFactor|
|v_input_8|true|Mode 2|
|v_input_9|true|Use color of candle|
|v_input_10|true|Use EMA Body|
|v_input_11|false|Show trend background|
|v_input_12|2018|From Year|
|v_input_13|2100|To Year|
|v_input_14|true|From Month|
|v_input_15|12|To Month|
|v_input_16|true|From day|
|v_input_17|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-17 00:00:00
end: 2024-01-24 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2017

//@version=2
strategy(shorttitle = "Squeeze str 1.1", title="Noro's Squeeze Momentum Strategy v1.1", overlay = false, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
lev = input(1, defval = 1, minval = 1, maxval = 100, title = "leverage")
length = input(20, title="BB Length")
mult = input(2.0,title="BB MultFactor")
lengthKC=input(20, title="KC Length")
multKC = input(1.5, title="KC MultFactor")
useTrueRange = true
mode2 = input(true, defval = true, title = "Mode 2")
usecolor = input(true, defval = true, title = "Use color of candle")
usebody = input(true, defval = true, title = "Use EMA Body")
needbg = input(false, defval = false, title = "Show trend background")
fromyear = input(2018, defval = 2018, minval = 1900, maxval = 2100, title = "From Year")
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

//Body
body = abs(close - open)
abody = sma(body, 10) / 3

//Indicator
bcol = iff( val > 0, iff( val > nz(val[1]), lime, green), iff( val < nz(val[1]), red, maroon))
scol = noSqz ? blue : sqzOn ? black : gray 
plot(val, color=bcol, style=histogram, linewidth=4)
plot(0, color=scol, style=cross, linewidth=2)

//Signals
bar = close > open ? 1 : close < open ? -1 : 0
up1 = trend == 1 and (bar == -1 or usecolor == false) and (body > abody or usebody == false) and mode2 == false
dn1 = trend == -1 and (bar == 1 or usecolor == false) and (body > abody or usebody == false) and mode2 == false

up2 = trend == 1 and val < val[1] and mode2 
dn2 = trend == -1 and val > val[1] and mode2

exit = (strategy.position_size > 0 and close > strategy.position_avg_price) or (strategy.position_size < 0 and close < strategy.position_avg_price) and mode2

//Trading
lot = strategy.position_size == 0 ? strategy.equity / close * lev : lot[1]

if up1 or up2
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot)

if dn1 or dn2
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot)
    
if exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/439960

> Last Modified

2024-01-25 12:34:59
