
> Name

Andrew-Abraham趋势追踪策略Andrew-Abraham-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/90439992dc3a478825.png)
[trans]

## 概述

趋势追踪策略是由Andrew Abraham在1998年9月发表在《交易技术分析杂志》上的一篇名为《交易趋势》的文章中提出的。该策略利用移动平均真实波幅和最高价、最低价来判断价格趋势,并在趋势方向上进行交易。

## 策略原理

该策略首先计算最近21天的平均真实波幅avgTR。然后计算最近21天的最高价highestC和最低价lowestC。接着计算上轨hiLimit,其值为最高价减去avgTR的3倍;计算下轨loLimit,其值为最低价加上avgTR的3倍。当收盘价超过上下轨时,分别取上下轨值作为参考价位ret。当收盘价高于参考价位时,做多;当收盘价低于参考价位时,做空。

## 优势分析

该策略主要有以下优势:

1. 使用平均真实波幅计算通道,可以动态捕捉市场波动。
2. 结合最高价和最低价判断趋势方向,避免被震荡市场误导。
3. 策略逻辑简单清晰,容易理解和实现。
4. 可根据趋势进行交易,避免在震荡行情中频繁开仓。

## 风险分析

该策略也存在一些风险:

1. 在震荡行情中,将产生更多错误信号。可通过优化参数来减少错误信号。
2. 无法判断趋势反转点,存在亏损风险。可结合其他指标判断趋势反转。
3. 参数优化不当可能导致过度交易或错误信号。需谨慎测试参数的稳定性。

## 优化方向  

该策略可从以下几个方面进行优化:

1. 优化移动平均天数,寻找最佳参数组合。
2. 增加止损策略,以控制单笔亏损。
3. 结合波动率指标判断市场阶段,避免在震荡行情中交易。  
4. 增加趋势判断指标,确定趋势反转点,降低亏损概率。

## 总结

趋势追踪策略整体来说是一个简单实用的趋势交易策略。它利用价格通道判断趋势方向,可避免在震荡行情中被套牢。但也存在一定的风险,需要进一步优化以提高稳定性。该策略适合有一定交易经验的投资者使用。

||

## Overview

The Trend Tracking strategy was proposed by Andrew Abraham in an article titled "Trading the Trend" published in Technical Analysis of Stocks & Commodities magazine in September 1998. It uses the moving average true range and highest and lowest prices to determine the price trend and trade in the direction of the trend.

## Principles

The strategy first calculates the 21-day average true range avgTR. Then it calculates the 21-day highest price highestC and lowest price lowestC. Next, it calculates the upper rail hiLimit, which is the highest price minus 3 times avgTR; and the lower rail loLimit, which is the lowest price plus 3 times avgTR. When the closing price exceeds the upper and lower rails, their values are taken as the reference price ret, respectively. When the closing price is higher than the reference price, go long; when lower, go short.

## Advantages

The main advantages of this strategy are:

1. Using average true range to calculate the channel can dynamically capture market volatility. 
2. Combining highest and lowest prices to determine trend direction avoids being misled by oscillating markets.
3. The logic is simple and clear, easy to understand and implement.
4. It can trade according to the trend and avoid frequent opening positions in oscillating markets.

## Risks 

There are also some risks with this strategy:  

1. More false signals will occur in oscillating markets. This can be reduced by optimizing parameters.
2. Unable to determine trend reversal points, risk of loss exists. Other indicators can be combined to judge trend reversal.
3. Improper parameter optimization may lead to overtrading or false signals. The stability of parameters needs to be tested carefully.

## Improvement

Some ways to improve this strategy:

1. Optimize the moving average period to find the best parameter combination.  
2. Add stop loss to control single loss.
3. Combine volatility indicators to determine market conditions and avoid trading in oscillating markets.
4. Add trend judgment indicators to identify trend reversal points and reduce probability of losses.

## Conclusion

In summary, the Trend Tracking strategy is a simple and practical trend trading strategy. It uses price channels to determine trend direction and avoid being trapped in oscillating markets. But there are still some risks, and further optimizations are needed to improve stability. It is suitable for investors with some trading experience.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|Length|
|v_input_2|3|Multiplier|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2024-01-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 12/01/2017
// This is plots the indicator developed by Andrew Abraham 
// in the Trading the Trend article of TASC September 1998  
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Trend Trader Strategy", overlay = true)
Length = input(21, minval=1),
Multiplier = input(3, minval=1)
reverse = input(false, title="Trade reverse")
avgTR      = wma(atr(1), Length)
highestC   = highest(Length)
lowestC    = lowest(Length)
hiLimit = highestC[1]-(avgTR[1] * Multiplier)
loLimit = lowestC[1]+(avgTR[1] * Multiplier)
ret = iff(close > hiLimit and close > loLimit, hiLimit,
       iff(close < loLimit and close < hiLimit, loLimit, nz(ret[1], 0)))
pos = iff(close > ret, 1,
	   iff(close < ret, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
         iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(ret, color= blue , title="Trend Trader Strategy")
```

> Detail

https://www.fmz.com/strategy/438053

> Last Modified

2024-01-08 16:21:11
