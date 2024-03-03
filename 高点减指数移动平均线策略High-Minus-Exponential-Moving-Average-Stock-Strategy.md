
> Name

高点减指数移动平均线策略High-Minus-Exponential-Moving-Average-Stock-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/100ccdcc486c163310c.png)
[trans]

## 概述

高点减指数移动平均线策略(High Minus Exponential Moving Average Stock Strategy)是一种根据的高点和指数移动平均线进行交易决策的量化投资策略。该策略通过计算前一期价格的高点减去前一期收盘价的13期指数移动平均线,如果差值大于0则做多,如果差值小于0则做空,属于趋势跟踪型策略。

## 策略原理  

该策略的核心指标是高点减指数移动平均线(High Minus Exponential Moving Average,HMEMA)。具体来说,是取前一期的最高价,减去前一期收盘价的13期指数移动平均线。当该差值大于0时,说明最近一期的价格创出新的高点,进入多头趋势,这时做多;当差值小于0时,说明价格低于近期的平均水平,进入空头趋势,这时做空。

该策略认为,当价格创出新高时,是多头趋势的开始,所以那时做多;当价格跌破最近期平均价时,是空头趋势的开始,那时做空。通过这个方法,策略可以抓住价格的主要趋势转换点,实现趋势跟踪。  

## 策略优势

1. 该策略能够抓住主要的价格趋势转折点。当价格创出新高或跌破均线时下单,减少交易次数但捕捉到关键点位。

2. 使用指数移动平均线作为参考,可以更加平滑地反映价格走势,过滤掉短期市场噪音。

3. 策略逻辑简单清晰,容易理解和修改,适合初学者学习。

4. 该策略可适用于不同时间周期下的、外汇、加密货币等市场,灵活性强。

## 风险分析

1. 该策略无法确定具体的入市出场点位,存在一定的随波逐流风险。

2. 当价格处于震荡区间时,该策略会产生虚假信号,存在过度交易风险。可以适当调整参数或增加过滤条件以减少。

3. 策略并没有考虑股价的实际波动幅度,存在亏损过大的风险。可以设置止损来控制风险。

4. 策略没有结合市场总体状态、个股基本面等来确定多空方向,存在信号效果差的风险。

## 优化方向  

1. 可以考虑结合的波动幅度,仅在波动加大时才发出交易信号,以减少误导型交易。  

2. 可以结合股价的简单移动平均线,同时高点超过快线和慢线时做多,跌破快线和慢线时做空,设置过滤条件。

3. 可以对参数如均线周期、比较系列等进行优化,找到最佳参数组合。

4. 可以考虑根据市场状态(多头、空头、震荡)切换策略参数或使用不同均线指标,提高策略的状况适应性。

## 总结  

高点减指数移动平均线策略通过比较价格的高点和指数移动平均线,设计了一个简单有效的趋势跟踪策略。该策略抓住价格在创出新高或穿越均线时的趋势转折点,可以减少交易次数但捕捉关键点位。同时,使用指数移动平均线过滤了市场噪音。该策略适用于追踪、外汇或加密货币等金融产品的中长线趋势。通过进一步优化,可望获得更好的策略表现。

||


## Overview

The High Minus Exponential Moving Average Stock Strategy is a quantitative investment strategy that makes trading decisions based on the high price of a stock and its exponential moving average (EMA). It calculates the difference between the high price of the previous period and the 13-period EMA of the close price of the previous period. If the difference is greater than 0, it goes long. If the difference is less than 0, it goes short. This strategy belongs to the trend-following type.  

## Strategy Logic

The core indicator of this strategy is the High Minus Exponential Moving Average (HMEMA). Specifically, it takes the high price of the previous period and subtracts the 13-period EMA of the close price of the previous period. When this difference is greater than 0, it means the latest stock price has reached a new high and has entered a bullish trend, so it should go long. When the difference is less than 0, it means the stock price is below its recent average level and has entered a bearish trend, so it should go short.

The logic behind this is when stock price reaches a new high, it signals the start of an uptrend, so a long position should be taken. When the price breaks below its recent average, it signals the start of a downtrend, so a short position should be taken. This way, the strategy is able to capture major turning points in the price trend and follow trends.

## Advantages  

1. This strategy is able to capture major turning points of stock price trends. It enters orders when prices reach new highs or break through moving averages, thus reducing trade frequency while catching key levels.

2. The use of exponential moving averages provides a smoother reflection of price moves, filtering out short-term market noises.

3. The strategy logic is simple and clear, easy to understand and modify, suitable for beginners to learn. 

4. This strategy is flexible enough to be applied to stocks, forex, crypto currencies in different time frames.

## Risks

1. This strategy fails to determine exact entry and exit levels, posing certain risks of trend-chasing.

2. It may generate false signals when prices are ranging, causing over-trading risks. Parameters can be adjusted or filters added to reduce such risks.

3. The strategy does not consider the actual volatility of stock prices, risking oversized losses. Stop loss can be set to control risks.

4. The strategy does not incorporate overall market conditions, fundamentals of individual stocks to determine directions, running the risk of poor signal effects.

## Optimization

1. Consider incorporating price volatility to issue signals only when volatility increases, so as to reduce misleading trades.

2. Adding filters such as a double confirmation from fast and slow simple moving averages may help avoid false signals.  

3. Parameters like moving average periods, price series for comparison can be optimized to find the optimal combination.

4. Consider switching parameters or indicators based on market states to improve adaptability.

## Conclusion

The High Minus Exponential Moving Average Stock Strategy designs a simple but effective way of tracking stock trends by comparing high prices with exponential moving averages. It captures major turning points when prices break to new highs or moving average levels, thus catching key spots with fewer trades. Exponential moving averages also filter out market noises. This strategy suits medium- to long-term trend-following trading of stocks, forex, crypto currencies and more. Further optimizations may lead to improved strategy performance.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|13|Length|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-27 00:00:00
end: 2023-12-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 20/16/2016
// This indicator plots the difference between the High (of the previous period)
// and an exponential moving average (13 period) of the Close (of the previous period).
// You can use in the xPrice any series: Open, High, Low, Close, HL2, HLC3, OHLC4 and ect...
// It buy if indicator above 0 and sell if below.
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="High - EMA Strategy Backtest", shorttitle="High - EMA Strategy")
Length = input(13, minval=1)
reverse = input(false, title="Trade reverse")
xPrice = close  // You can use any series
hline(0, color=red, linestyle=line)
xEMA = ema(xPrice, Length)
nRes = high[1] - nz(xEMA[1])
pos = iff(nRes > 0, 1,
	   iff(nRes < 0, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(nRes, color=blue, title="High - EMA") 
```

> Detail

https://www.fmz.com/strategy/434175

> Last Modified

2023-12-04 14:29:31
