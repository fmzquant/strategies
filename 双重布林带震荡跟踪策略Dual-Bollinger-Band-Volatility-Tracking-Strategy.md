
> Name

双重布林带震荡跟踪策略Dual-Bollinger-Band-Volatility-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/860bb07ccc824c5a53.png)

[trans]

## 概述

双重布林带震荡跟踪策略是一种通过构建双重布林带,捕捉价格震荡进行跟踪的量化交易策略。该策略借助布林带的上下轨,实时捕捉市场的震荡机会。

## 策略原理

该策略首先计算N天的均线作为基准线,然后在均线的基础上按照标准差的若干倍计算出上下轨构建布林带。策略采用双重布林带,即上轨和下轨都是标准差的若干倍。在双重布林带形成后,当价格突破上轨时发出买入信号,当价格跌破下轨时发出卖出信号,通过这样的方式捕捉布林带上的价格震荡机会。

该策略同时设置了时间窗口,使得回测更加 TARGET,防止前期数据对测试产生影响。整个策略运作流程为:构建双重布林带、价格与轨道的交叉作为交易信号、设置时间窗口防止前期数据影响。

## 优势分析

该策略最大的优势在于能实时捕捉价格的震荡,通过布林带上下轨的突破来判断OPERATION方向。相比其他指标,布林带对市场的反应更为灵敏,可以在较短时间内形成交易信号。此外,双重布林带设置了更宽的通道,价格突破的可能性更大,可以抓住更多的交易机会。

## 风险分析

该策略主要的风险在于布林带构建依赖的参数N日和标准差倍数的设置。如果参数设置不当,将导致布林带变得太宽或太窄,从而错过交易机会或产生错误信号。此外,双边交易中没有设置止损,可能导致亏损扩大。

解决方法是优化参数,实时评估布林带的形态;另外是根据历史数据制定止损策略,控制单次亏损。

## 优化方向  

该策略主要可以从以下几个方向进行优化:

1. 优化布林带的参数,调整N日和标准差倍数,使布林带能更好地适应不同市场的特征。

2. 增加续单机制,在原有订单获得一定利润后再次追加订单,扩大获利空间。

3. 设置止损策略,当价格向不利方向突破布林带上下轨时止损出场,控制亏损。

4. 结合其他指标筛选信号,避免在震荡市场中产生错误信号。

## 总结

双重布林带震荡跟踪策略通过构建双向布林带实时捕捉价格的震荡,能够在短期内抓住较多交易机会。该策略优势在于对市场变化灵敏,交易信号生成快速;风险主要来自参数设置不当和缺乏止损。我们可以通过多方位优化使该策略更稳定和高效。

||


## Overview

The Dual Bollinger Band Volatility Tracking strategy is a quantitative trading strategy that captures price volatility by building double Bollinger Bands for tracking. The strategy leverages the upper and lower rails of the Bollinger Bands to capture market volatility opportunities in real time.

## Strategy Principle  

The strategy first calculates the N-day moving average as the baseline, then calculates the upper and lower rails based on multiples of standard deviation to construct the Bollinger Bands. The strategy employs double Bollinger Bands, where both the upper and lower rails are multiples of the standard deviation. Once the double Bollinger Bands are formed, a buy signal is triggered when the price breaks through the upper rail, and a sell signal is triggered when the price breaks through the lower rail, capturing price volatility opportunities on the Bollinger Bands.

The strategy also sets a time window to make the backtest more TARGET and prevent early data from affecting the test results. The whole strategy workflow is: construct double Bollinger Bands, crossovers of price and rails as trade signals, set time window to avoid impact from early data.

## Advantage Analysis

The biggest advantage of this strategy is that it can capture price volatility in real time by breaking through the upper and lower rails of the Bollinger Bands to determine the OPERATION direction. Compared with other indicators, Bollinger Bands react to the market more sensitively and can form trade signals within a shorter period of time. In addition, the double Bollinger Bands set a wider channel so that the likelihood of price breakout is greater, allowing the strategy to capture more trading opportunities.

## Risk Analysis  

The main risks of this strategy lie in the parameter settings of the N-day period and standard deviation multiples that construct the Bollinger Bands. If the parameters are not set appropriately, it will lead to Bollinger Bands that are too wide or too narrow, thus missing trade opportunities or generating false signals. In addition, no stop loss is set for the dual-directional trading, which may lead to enlarged losses.

The solutions are to optimize the parameters and evaluate the shape of Bollinger Bands in real time; also, to set up stop loss strategies based on historical data to control single loss.

## Optimization Directions

The main aspects to optimize for this strategy:

1. Optimize parameters of the Bollinger Bands, adjust N-day period and standard deviation multiples to better suit different market characteristics.  

2. Increase order renewal mechanisms to place additional orders after some profit is captured from original orders, so as to expand profit space.

3. Set up stop loss strategies so as to exit positions when prices break through the upper or lower rails of the Bollinger Bands in unfavorable directions, controlling losses.  

4. Incorporate other indicators to screen signals and avoid false signals in volatile markets.

## Conclusion  

The Dual Bollinger Band Volatility Tracking strategy captures price volatility in real time by constructing double-sided Bollinger Bands, being able to seize more short-term trading opportunities. The advantages of this strategy are sensitivity to market changes and fast signal generation. The main risks come from inappropriate parameter settings and lack of stop loss. We can make the strategy more stable and efficient through multi-dimensional optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|2|mult|
|v_input_4|true|From Month|
|v_input_5|true|From Day|
|v_input_6|2017|From Year|
|v_input_7|true|To Month|
|v_input_8|true|To Day|
|v_input_9|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-18 00:00:00
end: 2023-12-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("BB_BB", overlay=true,default_qty_type=strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)
length = input(20, minval=1)
src = input(close, title="Source")
mult = input(2.0, minval=0.001, maxval=50)
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear = input(defval = 2017, title = "From Year", minval = 2017)
ToMonth = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear = input(defval = 9999, title = "To Year", minval = 2017)
start = timestamp(FromYear, FromMonth, FromDay, 00, 00) // backtest start window
finish = timestamp(ToYear, ToMonth, ToDay, 23, 59) // backtest finish window
window() => true // create function "within window of time"


basis = sma(src, length)
dev = mult * stdev(src, length)
upper = basis + dev
lower = basis - dev
plot(basis, color=red)
p1 = plot(upper, color=blue)
p2 = plot(lower, color=blue)
fill(p1, p2)

buy = crossover(sma(close,1), upper) or crossover(sma(close,1), lower)
sell = crossunder(sma(close,1), upper) or crossunder(sma(close,1), lower)

if(buy)
    strategy.entry("BUY", strategy.long, when = window())
if(sell)
    strategy.entry("SELL", strategy.short, when = window()) 
```

> Detail

https://www.fmz.com/strategy/436489

> Last Modified

2023-12-25 11:49:41
