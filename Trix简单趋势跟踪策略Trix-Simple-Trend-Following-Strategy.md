
> Name

Trix简单趋势跟踪策略Trix-Simple-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

Trix简单趋势跟踪策略是一种基于Trix指标的简单趋势跟踪策略。它利用Trix指标判断价格趋势,并结合移动平均线进行买入和卖出。该策略适用于中长线交易,可以在较大的趋势中获得收益。

## 策略原理

该策略主要基于Trix指标。Trix指标是一种能够识别价格变化趋势的技术分析工具。它通过对价格的三重平滑移动平均线计算其速度变化,当Trix上穿其移动平均线时为买入信号,下穿其移动平均线时为卖出信号。

具体来说,该策略首先计算两组不同参数的Trix指标,分别命名为Trix和Trix1。Trix参数为(7,4,4),Trix1参数为(4,4,4)。然后计算Trix的20日简单移动平均,获得中间带。

当快速均线EMA13上穿慢速均线SMA68,且Trix低于中间带时为买入信号;当Trix1上穿Trix时触发买入。当Trix重新回穿上中间带时平仓。

当EMA13下穿SMA68,且Trix高于中间带时为卖出信号;当Trix1下穿Trix时触发卖出。当Trix重新回穿下中间带时平仓。

## 策略优势

这是一个非常简单的趋势跟踪策略,具有以下优势:

1. 使用Trix指标可以有效识别价格趋势,减少假信号。

2. 结合快慢均线系统有助于判断趋势方向。

3. 采用两组不同参数Trix指标进行组合,可以提高信号质量。

4. 中间带过滤增加了过滤效果,避免在震荡行情中频繁开仓。

5. 适用于中长线趋势交易,不会被短期波动干扰。

6. 易于理解和实现,适合新手学习。

## 策略风险

该策略也存在一些风险需要注意:

1. 在稳定趋势中无法及时追趋势,错过部分利润。

2. 大幅震荡行情下,Trix指标可能产生错误信号。

3. 快慢均线头寸管理不当可能导致亏损加剧。

4. 缺乏止损策略,无法有效控制单笔损失。

5. 参数设置不当可能导致交易频率过高或信号质量差。

6. 交易手续费可能占据部分盈利。

## 策略优化

该策略可以从以下几个方面进行优化:

1. 增加止损策略,如跟踪止损或ATR止损,控制单笔损失。

2. 优化Trix参数,寻找更合适的参数组合,提高信号质量。

3. 添加其他指标过滤,如MACD、KDJ等,避免错误信号。

4. 根据市场情况动态调整快慢均线参数,提高灵活性。

5. 加入趋势判断指标,如ADX,避免逆势交易。

6. 区分牛熊行情,采用不同的参数组合。

7. 优化入场时机,在趋势确认后再入场。

## 总结

Trix简单趋势跟踪策略 overall, 这是一个易于实现的趋势跟踪策略。它利用Trix指标判断趋势方向,以及与移动平均线组合产生交易信号。该策略优点是简单易用,可以有效跟踪中长线趋势,适合新手学习。但也存在一些风险,需要注意防范。通过适当优化,可以提高策略效果。总体来说,该策略为初学者提供了一个简单实用的趋势交易思路。

||

## Overview

The Trix simple trend following strategy is a simple trend following strategy based on the Trix indicator. It uses the Trix indicator to judge price trends and combines moving averages to generate buy and sell signals. This strategy is suitable for medium-to-long term trading and can profit from larger trends.

## Strategy Logic 

This strategy is mainly based on the Trix indicator. The Trix indicator is a technical analysis tool that can identify price trend changes. It calculates the rate of change of prices through triple smoothed moving averages. When the Trix crosses above its moving average, it is a buy signal. When the Trix crosses below its moving average, it is a sell signal.

Specifically, this strategy first calculates two groups of Trix indicators with different parameters, named Trix and Trix1. The parameters for Trix are (7,4,4) and for Trix1 are (4,4,4). Then it calculates the 20-day simple moving average of Trix to get the middle band.

When the faster EMA13 crosses above the slower SMA68, and Trix is below the middle band, it is a buy signal. When Trix1 crosses above Trix, it triggers the buy. When Trix crosses back above the middle band, it closes the position. 

When EMA13 crosses below SMA68, and Trix is above the middle band, it is a sell signal. When Trix1 crosses below Trix, it triggers the sell. When Trix crosses back below the middle band, it closes the position.

## Advantages

This is a very simple trend following strategy with these advantages:

1. Using the Trix indicator can effectively identify price trends and reduce false signals.

2. Combining fast and slow moving averages helps determine trend direction. 

3. Using two Trix indicators with different parameters improves signal quality.

4. The middle band filter increases the filtering effect and avoids frequent opening during market oscillation.

5. It is suitable for medium-to-long term trend trading and is not disturbed by short-term fluctuations.

6. It is easy to understand and implement, suitable for beginners to learn.

## Risks

There are also some risks to note for this strategy:

1. It cannot catch trends in time during stable trends, missing some profits.

2. The Trix indicator may generate incorrect signals during huge market swings.

3. Improper fast and slow moving average position management can lead to greater losses. 

4. It lacks a stop loss strategy and cannot effectively control single losses.

5. Improper parameter settings may lead to too high trading frequency or poor signal quality.

6. Transaction fees may take up some profits.

## Optimization

This strategy can be optimized in the following aspects:

1. Add stop loss strategies like trailing stop loss or ATR stop loss to control single losses.

2. Optimize Trix parameters to find more suitable combinations and improve signal quality.

3. Add other indicator filters like MACD, KDJ etc. to avoid false signals. 

4. Dynamically adjust fast and slow moving average parameters based on market conditions to improve flexibility.

5. Add trend judging indicators like ADX to avoid trading against the trend.

6. Use different parameter sets to distinguish bull and bear markets.

7. Optimize entry timing and enter after trend confirmation.

## Conclusion

In summary, this is an easy to implement trend following strategy. It uses the Trix indicator to determine trend direction and generates trading signals in combination with moving averages. The advantages are its simplicity and ability to effectively track medium-to-long term trends, making it suitable for beginners to learn. But risks exist and need to be prevented. With proper optimizations, the strategy's effectiveness can be improved. Overall, it provides beginners with a simple and practical trend trading idea.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|7|lengtha|
|v_input_2|4|lengtha1|
|v_input_3|20|bb|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-10-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Trix simple", overlay=true)

///_____________Made by Zan______//
// All thanks to Nmike's Chat, go visit there lol, you'll learn a lot.//

//Length setting
lengtha = input(7, minval=1)
lengtha1 = input(4, minval=1)
Trix = 10000 * change(ema(ema(ema(log(close), lengtha), lengtha), lengtha)) // TRIX 5
Trix1= 10000 * change(ema(ema(ema(log(close), lengtha1), lengtha1), lengtha1)) // TRIX 3
bb = input(20)
Middle_Band = sma(Trix, bb)
sma68 = sma(close,68)
ema13 = sma(close,13)



longCondition = ema13>sma68 and Middle_Band>0 and Trix<Middle_Band
if (longCondition)
    strategy.entry("Buy", strategy.long, when = crossover(Trix1,Trix))
    strategy.exit("Buy", when = cross(Trix,Middle_Band))
    
    
shortCondition = ema13<sma68 and Middle_Band<0 and Trix>Middle_Band
if (shortCondition)
    strategy.entry("Sell", strategy.short, when = crossunder(Trix1,Trix))
    strategy.exit("Sell",when = cross(Trix,Middle_Band))
```

> Detail

https://www.fmz.com/strategy/428683

> Last Modified

2023-10-08 12:17:21
