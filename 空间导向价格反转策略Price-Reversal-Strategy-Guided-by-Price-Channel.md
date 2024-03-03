
> Name

空间导向价格反转策略Price-Reversal-Strategy-Guided-by-Price-Channel

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1f5d2f67707c53e07fb.png)
[trans]
## 概述

空间导向价格反转策略通过计算价格通道中心线,判断价格波动的趋势方向。当价格接近通道中心线时,发出做多或做空信号。该策略结合多个过滤条件,寻找高概率交易机会。

## 策略原理  

该策略的核心指标是价格通道中心线。计算方式是取最近30根K线的最高价和最低价的平均值。当低点高于中心线时认为是上涨趋势,当高点低于中心线时认为是下跌趋势。

策略只在趋势背景发生转变时发出交易信号。即在上涨背景下,只在K线变红时做空;在下跌背景下,只在K线变绿时做多。

此外,策略还设置双重过滤条件:蜡烛实体过滤和价格通道bars过滤。只有当蜡烛实体体积大于平均值的20%时才会触发信号;过滤周期内必须有连续的趋势信号才会开仓。

## 优势分析

该策略结合趋势、价值区域和K线形态,是一种高效的反转交易策略。主要优势有:

1. 使用价格通道判断主要趋势,避免被震荡市场误导。
2. 点位选择价格通道中心线附近,是经典的低买高卖区域。 
3. K线实体和通道bars过滤增加信号质量,降低了错误信号率。
4. 只在明确的反转点开仓,避免追高杀跌。

## 风险及解决方法  

该策略主要风险来自错过价格反转点而无谓等待信号。可通过以下方法优化:

1. 调整过滤条件严格程度,降低过滤标准可减少漏单率。
2. 可在反转趋势初期加大仓位,追踪趋势利润。
3. 结合其他指标判断反转信号强度,主观干预过滤条件。

## 优化方向  

该策略可从以下几个方面进行优化:

1. 优化参数,如调整价格通道周期,通道bars数等参数。
2. 增加止损策略,在亏损达到一定比例时止损。 
3. 结合交易量,量能干预过滤条件强度。如量能放大时放宽过滤。
4. 增加机器学习模型判断趋势转折概率,取代简单过滤。

## 总结  

空间导向价格反转策略通过价格通道判断反转时点,设置双重过滤条件生成高质量信号。在参数调优和风控的基础上,是一种可靠的量化策略。

||


## Overview

The price reversal strategy guided by price channel calculates the center line of the price channel to determine the trend direction of price fluctuations. It generates long and short signals when the price approaches the channel center line. This strategy combines multiple filter conditions to search for high probability trading opportunities.  

## Strategy Logic   

The core indicator of this strategy is the price channel center line. It is calculated as the average of the highest price and lowest price of the most recent 30 candlesticks. When the low is higher than the center line, it is considered an uptrend. When the high is lower than the center line, it is considered a downtrend.

The strategy only generates trading signals when the trend background changes. That is, in an uptrend background, it goes short only when the candlestick turns red. In a downtrend background, it goes long only when the candlestick turns green.   

In addition, the strategy also sets double filter conditions: candlestick body filter and price channel bars filter. Signals are triggered only when the candlestick body volume is greater than 20% of the average value, and there must be consecutive trend signals within the filter cycle to open positions.


## Advantage Analysis  

This strategy combines trend, value area and candlestick patterns, which is an efficient reversal trading strategy. The main advantages are:  

1. Using the price channel to determine the major trend and avoid being misled by range-bound markets.  
2. Selecting price levels near the price channel center line, which is the classic low-buy-high-sell area.   
3. Candlestick body and channel bars filters increase signal quality and reduce false signal rates.  
4. Open positions only at obvious reversal points to avoid chasing highs and selling lows.  

## Risks and Solutions   

The main risks of this strategy come from missing price reversal points and unnecessary waiting for signals. It can be optimized in the following ways:  

1. Adjust the strictness of filter conditions and reduce filtering standards to decrease missing trades.  
2. Increase position size in the early stage of reversal trend to capture trend profits.  
3. Combine other indicators to judge the signal strength and intervene in filters manually.   

## Optimization Directions 

This strategy can be optimized in the following aspects:   

1. Optimize parameters like the price channel period, number of channel bars etc.   
2. Add stop loss strategy to stop loss when loss reaches a certain percentage.   
3. Combine trading volume to intervene in filter strength. For example, relax filters when trading volume amplifies.  
4. Add machine learning model to judge probability of trend reversal, replacing simple filters.

## Conclusion   

The price reversal strategy guided by the price channel determines reversal points through price channels, and sets double filter conditions to generate high quality signals. On the basis of parameter tuning and risk control, it is a reliable quantitative strategy.    
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|long|
|v_input_2|true|short|
|v_input_3|30|PriceChannel Period|
|v_input_4|true|PriceChannel Bars|
|v_input_5|true|Use color-filter|
|v_input_6|true|Use body-filter|
|v_input_7|false|Need trend Background?|
|v_input_8|1900|From Year|
|v_input_9|2100|To Year|
|v_input_10|true|From Month|
|v_input_11|12|To Month|
|v_input_12|true|From day|
|v_input_13|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-19 00:00:00
end: 2023-11-26 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's PriceChannel for D1 v1.0", shorttitle = "PriceChannel D1", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100.0, pyramiding = 0)

//Settings
needlong = input(true, "long")
needshort = input(true, "short")
slowlen = input(30, defval = 30, minval = 2, maxval = 200, title = "PriceChannel Period")
pcbars = input(1, defval = 1, minval = 1, maxval = 20, title = "PriceChannel Bars")
usecol = input(true, "Use color-filter")
usebod = input(true, "Use body-filter")
needbg = input(false, defval = false, title = "Need trend Background?")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

src = close

//PriceChannel
lasthigh = highest(src, slowlen)
lastlow = lowest(src, slowlen)
center = (lasthigh + lastlow) / 2

//Trend
ub = low > center ? 1 : 0
db = high < center ? 1 : 0
trend = sma(ub, pcbars) == 1 ? 1 : sma(db, pcbars) == 1 ? -1 : trend[1]

//Body
body = abs(close - open)
abody = sma(body, 10)

//Signals
up = trend == 1 and (close < open or usecol == false) and (body > abody / 5 or usebod == false)
dn = trend == -1 and (close > open or usecol == false) and (body > abody / 5 or usebod == false)

//Lines
plot(center, color = blue, linewidth = 3, transp = 0, title = "PriceChannel Center")

//Background
col = needbg == false ? na : trend == 1 ? lime : red
bgcolor(col, transp = 80)

//Trading
if up
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if dn
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
    
```

> Detail

https://www.fmz.com/strategy/433403

> Last Modified

2023-11-27 11:40:36
