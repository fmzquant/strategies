
> Name

基于动态趋势追踪策略Trading-Dynamic-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1e5d0d7e76a417e94ed.png)
[trans]
## 概述

本策略是基于Andrew Abraham在1998年9月《交易技术分析师》杂志上发表的“跟踪趋势”文章中给出的思路进行改进设计的,用于动态跟踪股票价格趋势,并据此产生交易信号。

## 策略原理  

该策略首先计算最近21天的平均真实波动范围作为参考阈值,然后计算最近21天内最高价和最低价,并据此设定通道上下限,通道上限为最近21天最高价减去平均真实波动范围的3倍,下限为最近21天最低价加上平均真实波动范围的3倍。当收盘价高于通道上限时,为抛压信号;当收盘价低于通道下限时,为吸筹信号。为过滤假信号,还计算了长度为21的指数移动平均线,只有当收盘价与通道限制同向突破移动平均线时,才生成真正的交易信号。另外,该策略还提供反转输入参数,可以将原始的做多做空信号进行反转,从而实现做空做多操作。

## 优势分析

该策略最大的优势在于可以动态跟踪价格趋势,据此产生交易信号。相比固定参数的移动平均线策略,能更好地捕捉价格变化趋势。此外,结合真实波动范围进行通道建立,避免了通道限制只根据最高价最低价设定带来的不足。通道上下限的波动范围也非常合理,在一定程度上避免了假突破。可以自定义反转参数也增加了策略的灵活性。

## 风险分析

该策略主要存在两个方面的风险:一是交易信号增多带来的过度交易风险;二是参数设置不当可能带来的风险。由于该策略采用动态参数,交易信号会比传统移动平均线策略更为频繁,可能带来一定程度的过度交易风险。此外,如果参数设置得不当,如时间周期设置过短或通道限制数值过小,也会增多假信号从而增加风险。

为控制风险,可以适当调整参数,选取较长的时间周期,并适当放宽通道上下限的约束。此外也可以考虑加入止损策略,以控制单笔损失。

## 优化方向  

该策略的优化空间还比较大。例如可以考虑结合其他过滤指标,如RSI、KD等来避免假突破。也可以尝试通过机器学习方法来自动优化参数。此外,不同股票和市场环境下,参数的最优值也会有所不同。所以我们也可以考虑制定一套参数优选机制,根据股票和市场特征动态选择最优参数,从而提高策略稳定性。

## 总结

本策略整体来说是一个非常实用的趋势跟踪策略。相比传统移动平均线策略,它更加灵活和智能,能够动态捕捉价格变化趋势。在参数调整得当的情况下,其交易信号质量较高,可以获得不错的回报。后续通过进一步优化,预计该策略的表现还可持续改进。值得实盘检验和投入应用。

||

## Overview

This strategy is an improved design based on the ideas presented by Andrew Abraham in the "Trading the Trend" article published in Technical Analysis of Stocks & Commodities magazine in September 1998, which is used to dynamically track stock price trends and generate trading signals accordingly.  

## Strategy Logic

The strategy first calculates the average true range over the past 21 days as a reference threshold, then calculates the highest and lowest prices over the past 21 days, and sets the upper and lower limits of the channel accordingly. The upper limit of the channel is set to the 21-day highest price minus 3 times the average true range, and the lower limit is set to the 21-day lowest price plus 3 times the average true range. When the closing price is higher than the upper limit of the channel, it is a selling pressure signal; when the closing price is lower than the lower limit of the channel, it is a buying signal. To filter out false signals, a 21-period exponential moving average is also calculated, and a real trading signal is only generated when the closing price breaks through the channel limits in the same direction as the moving average. In addition, the strategy also provides a reverse input parameter, which can reverse the original long and short signals to implement short and long operations.

## Advantage Analysis 

The biggest advantage of this strategy is that it can dynamically track price trends and generate trading signals accordingly. Compared with moving average strategies with fixed parameters, it can better capture price change trends. In addition, the establishment of the channel incorporates the true range, avoiding the shortcomings of setting channel limits based solely on highest and lowest prices. The fluctuation range of the upper and lower limits of the channel is also very reasonable, avoiding false breakouts to some extent. The customizability of the reverse parameter also increases the flexibility of the strategy.  

## Risk Analysis

There are two main risks with this strategy: one is the risk of overtrading caused by increased trading signals; the second is the risk that may arise from improper parameter settings. As this strategy uses dynamic parameters, trading signals will be more frequent than traditional moving average strategies, which may lead to a certain degree of overtrading risk. In addition, if the parameters are set improperly, such as if the time period is set too short or the channel limit values are too small, false signals will also increase, thus increasing risk.

To control risks, parameters can be adjusted appropriately by selecting longer time periods and moderately relaxing channel upper and lower limit constraints. Stop loss strategies can also be considered to control single loss.

## Optimization Directions   

There is still a large space for optimizing this strategy. For example, other filtering indicators such as RSI and KD can be considered to avoid false breakouts. Machine learning methods can also be tried to automatically optimize parameters. In addition, the optimal parameter values may differ across different stocks and market environments. Therefore, we can also consider formulating a set of parameter optimization mechanisms to dynamically select the optimal parameters based on stock and market characteristics to improve the stability of the strategy.  

## Summary 

Overall, this is a very practical trend tracking strategy. Compared with traditional moving average strategies, it is more flexible and intelligent, and can dynamically capture price change trends. With proper parameter tuning, the quality of its trading signals is relatively high and can yield good returns. It is expected that the performance of this strategy can be further improved through subsequent optimizations. It is worth verifying in live trading and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|Length|
|v_input_2|21|LengthMA|
|v_input_3|3|Multiplier|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-15 00:00:00
end: 2024-02-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 10/10/2018
// This is plots the indicator developed by Andrew Abraham 
// in the Trading the Trend article of TASC September 1998  
// It was modified, result values wass averages.
////////////////////////////////////////////////////////////
strategy(title="Trend Trader AVR Backtest", overlay = true)
Length = input(21, minval=1),
LengthMA = input(21, minval=1),
Multiplier = input(3, minval=1)
reverse = input(false, title="Trade reverse")
avgTR      = wma(atr(1), Length)
highestC   = highest(Length)
lowestC    = lowest(Length)
hiLimit = highestC[1]-(avgTR[1] * Multiplier)
loLimit = lowestC[1]+(avgTR[1] * Multiplier)
ret = 0.0
ret :=  iff(close > hiLimit and close > loLimit, hiLimit,
         iff(close < loLimit and close < hiLimit, loLimit, nz(ret[1], 0)))
nResMA = ema(ret, LengthMA)        
pos = 0
pos := iff(close < nResMA, -1,
       iff(close > nResMA, 1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(nResMA, color= blue , title="Trend Trader AVR")
```

> Detail

https://www.fmz.com/strategy/442566

> Last Modified

2024-02-22 17:54:26
