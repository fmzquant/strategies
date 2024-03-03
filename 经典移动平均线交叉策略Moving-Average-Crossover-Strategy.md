
> Name

经典移动平均线交叉策略Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/eab3f46897dacaf70f.png)
[trans]


## 概述

移动平均线交叉策略是一个非常经典的技术分析策略。它通过计算不同周期的移动平均线,并观察它们的交叉情况来判断行情的趋势,实现低买高卖的目的。该策略适用于中长线交易,可以有效过滤市场噪音,识别趋势。

## 原理

该策略主要是计算10日简单移动平均线SMA和10日三角移动平均线TRIMA。当SMA上穿TRIMA时产生买入信号,表示行情由下跌转为上涨,可以买入。当SMA下穿TRIMA时产生卖出信号,表示行情由上涨转为下跌,可以卖出。

具体来说,策略首先输入收盘价,并定义计算SMA和TRIMA的周期长度。其中SMA的计算公式为:

SMA = (P1 + P2 + ... + Pn) / n

其中Pn为过去n天的收盘价。

TRIMA的计算公式为:

TRIMA = (SMA1 + SMA2 + SMA3) / 3

其中SMA1、SMA2、SMA3分别是过去n天收盘价的SMA。

这样,TRIMA相当于对SMA再进行一次SMA,具有更好的平滑效果。当短周期的SMA上穿长周期的TRIMA时,表示短周期均线上的突破,可以买入。相反,当SMA下穿TRIMA时,表示短周期均线下的突破,可以卖出。

## 优势

该策略最大的优势就是利用了移动平均线的趋势判断能力,可以有效地识别市场趋势,滤除短期市场噪音,实现低买高卖。相比单一移动平均线,SMA和TRIMA的组合使用可以提高突破的可靠性,降低假突破的概率。此外,移动平均线本身具有较好的平滑性,也可以起到止损的效果,降低单笔止损的概率。总体来说,该策略非常适合中长线持仓交易。

## 风险

该策略的主要风险在于移动平均线本身滞后于价格变化,可能会错过趋势的前期,导致入场过晚。此外,当市场没有明显趋势时,该策略会产生更多假突破。最后,移动平均线策略更依赖参数优化,如果参数设置不当,也会大幅影响策略效果。

## 优化方向 

该策略可以从以下几个方面进行优化:

1. 优化移动平均线的周期参数,采用更科学的方法寻找最佳周期组合。

2. 增加成交量的过滤指标,避免在成交量不佳的情况下发出错误信号。

3. 结合趋势指标如MACD判断局部趋势,避免在盘整市中反复交易。

4. 采用自适应移动平均线,当市场进入特定阶段时动态调整周期参数。

5. 采用多时间框架进行验证,例如只有日线、4小时线均突破时才考虑入场。

## 总结

移动平均线交叉策略是一个简单实用的技术分析策略,非常适合中长线持仓交易,可以有效识别趋势方向。但该策略也存在一定滞后性,需要结合趋势判断指标进行过滤优化,降低误信号概率。如果参数优化得当,它既可以 rodeo 保护资金,又可以抓住较大的趋势机会。是非常值得研究和应用的一个策略思路。

||


## Overview

The moving average crossover strategy is a very classic technical analysis strategy. It calculates moving averages of different periods and observes their crossover to determine the trend of the market, in order to achieve the goal of buying low and selling high. This strategy is suitable for medium and long term trading, and can effectively filter market noise and identify trends.

## Principle 

This strategy mainly calculates the 10-day simple moving average (SMA) and the 10-day triangular moving average (TRIMA). When the SMA crosses above the TRIMA, a buy signal is generated, indicating the market trend has changed from decline to rise, and we can buy. When the SMA crosses below the TRIMA, a sell signal is generated, indicating the market trend has changed from rise to decline, and we can sell.

Specifically, the strategy first inputs the closing price, and defines the cycle lengths for calculating SMA and TRIMA. The calculation formula for SMA is:

SMA = (P1 + P2 + ... + Pn) / n

Where Pn is the closing price for the past n days.  

The calculation formula for TRIMA is:  

TRIMA = (SMA1 + SMA2 + SMA3) / 3

Where SMA1, SMA2, SMA3 are the SMAs of the closing prices for the past n days respectively.

So TRIMA is actually an SMA calculated on top of the SMA, which has a better smoothing effect. When the short-term SMA crosses above the long-term TRIMA, it indicates a breakthrough of the short-term moving average, and we can buy. On the contrary, when the SMA crosses below the TRIMA, it indicates a breakdown below the short-term moving average, and we can sell.

## Advantages

The biggest advantage of this strategy is that it utilizes the trend judging capability of moving averages to effectively identify market trends and filter out short-term market noise, in order to buy low and sell high. Compared with a single moving average, the combination of SMA and TRIMA can improve the reliability of breakthroughs and reduce the probability of false breakthroughs. In addition, the moving average itself has good smoothness, which can also play the role of stop loss to reduce the probability of single stop loss. In general, this strategy is very suitable for medium and long term position trading.

## Risks

The main risk of this strategy is that the moving average itself lags behind price changes, which may miss the early stage of the trend, resulting in a late entry. In addition, when the market has no obvious trend, this strategy will produce more false breakthroughs. Finally, moving average strategies rely more on parameter optimization. If the parameters are not set properly, it will also greatly affect the strategy.

## Optimization Directions

This strategy can be optimized in the following aspects:

1. Optimize the cycle parameters of the moving average to find the best combination scientifically.

2. Add filtering indicators like trading volume to avoid wrong signals when the trading volume is low. 

3. Combine trend indicators like MACD to judge local trends and avoid frequent trading in consolidation markets.

4. Adopt adaptive moving averages to dynamically adjust cycle parameters when the market enters specific stages.

5. Verify with multiple time frames, such as considering entry only when both daily and 4-hour lines break through.

## Summary 

The moving average crossover strategy is a simple and practical technical analysis strategy that is very suitable for medium and long-term position trading. It can effectively identify the trend direction. But it also has certain lagging, and needs to be filtered and optimized with trend judgment indicators to reduce the probability of false signals. If the parameters are optimized properly, it can both protect capital and seize larger trend opportunities. It is definitely worth researching and applying as a strategy idea.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Red: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|10|periods|
|v_input_3|5|Green|
|v_input_4|2018|From Year|
|v_input_5|4|From Month|
|v_input_6|true|From Day|
|v_input_7|2019|To Year|
|v_input_8|true|To Month|
|v_input_9|true|To Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-31 00:00:00
end: 2023-11-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//TMA strategy I came across, uses sma to display entry/exit points for both margin and non margin trading. The buy/sell signals as well as syntax are hidden behind comments if you scroll down.
//Change the commented fields for margin or spot trading!
//@version=3
strategy("MP Rollercoaster Strat", overlay=true)

bgcolor ( color=black, transp=0, title='Blackground', editable=true)

x = input(close, "Red")
n = input(10, "periods")
trima = sma(sma(x,n), n)

kisa=input(5, "Green")
sma = sma(close, kisa)

bull = (sma>trima)
fill(plot(sma, color = green), plot(trima, color=red), bull ? green : red)

//Conditions
buy_signal = crossover(sma,trima)
sell_signal = crossunder(sma,trima)

plotshape(sell_signal, style=shape.triangleup, color = red, text="Short")
plotshape(buy_signal, style=shape.triangledown, color = green, text="Long")
//plotshape(sell_signal, style=shape.triangleup, color = red, text="Sell")
//plotshape(buy_signal, style=shape.triangledown, color = green, text="Buy")

alertcondition(sell_signal, title = 'Short', message = 'e= s= c=position b=long t=market l= | delay=30 | e= s= b=short l= t=market q=0.01')
alertcondition(buy_signal, title = 'Long', message =  'e= s= c=position b=short t=market l= | delay=30 | e= s= b=long l= t=market q=0.01')

//alertcondition(sell_signal, title = 'Sell', message = 'e= s= c=order b=buy | delay=3 | e= b=sell q=99% p=0.70% u=currency')
//alertcondition(buy_signal, title = 'Buy', message =  'e= s= c=order b=sell | delay=30 | e= b=buy q=80 p=0.1% u=currency')

testStartYear = input(2018, "From Year") 
testStartMonth = input(4, "From Month")
testStartDay = input(1, "From Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2019, "To Year")
testStopMonth = input(1, "To Month")
testStopDay = input(1, "To Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

testPeriod() => true

if testPeriod()
    if buy_signal
        strategy.entry("Long", true)
    

    if sell_signal
        strategy.close("Long")
```

> Detail

https://www.fmz.com/strategy/431404

> Last Modified

2023-11-07 15:48:41
