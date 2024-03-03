
> Name

基于三重Hull移动平均线和一目均衡表的趋势交易策略Trend-Trading-Strategy-Based-on-Triple-Hull-Moving-Averages-and-Ichimoku-Kinko-Hyo

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/137e15f95009f0b312e.png)
[trans]

## 概述

本策略结合了Hull移动平均线和一目均衡表两个指标,实现了一个趋势跟踪交易系统。该系统可以捕捉中短线趋势,进行趋势交易。

## 策略原理

本策略使用Hull移动平均线来判断价格趋势方向。Hull移动平均线是一种对移动平均线进行优化的指标,可以更快速地响应价格变化。策略这里使用了一个三重Hull移动平均系统,包含6期、3期和1.5期的Hull MA。

另外,策略还结合了一目均衡表的转换线和延迟线。这两个指标反映了价格的中长线趋势。策略将三重Hull MA与一目均衡表指标进行组合,形成交易信号。

具体来说,策略计算出三重Hull MA:n1、n2、n2ma。以及一目均衡表的两个指标:leadLine1和leadLine2。然后计算出post1和post2作为最终的交易指标。

当post1上穿post2时,做多;当post1下穿post2时,做空。这样可以跟踪捕捉价格中短线趋势,进行趋势交易。

## 优势分析

本策略具有以下优势:

1. 结合双重指标,提高系统稳定性。
2. 使用Hull MA响应速度快,可以捕捉趋势变化。
3. 一目均衡表指标可以过滤假突破。
4. 采用多重Hull MA,可以有效跟踪价格中短线趋势。
5. 策略逻辑简单清晰,容易理解和优化。

## 风险分析

本策略也存在一些风险:

1. 在震荡行情中,可能出现多次错误信号。
2. 参数设置不当可能导致策略表现不佳。
3. 需避免在重大消息发布时使用本策略。

对策:

1. 可适当调整参数,过滤掉一些噪音。
2. 建议优化参数,寻找最佳参数组合。
3. 在重大消息发布前后避免交易。

## 优化方向

本策略还可从以下方面进行优化:

1. 尝试不同长度期的Hull MA组合。
2. 测试增加或减少一目均衡表的指标。
3. 对交易指标post1和post2进行平滑优化。
4. 添加止损逻辑,控制单笔损失。

## 总结

本策略综合运用Hull MA和一目均衡表指标,构建了一个简单实用的趋势跟踪交易系统。策略响应速度快,可以有效捕捉价格中短线趋势。该系统值得进一步测试和优化,通过参数调整和添加其他过滤指标,可以获得更好的交易表现。

||

## Overview

This strategy combines the Hull Moving Average and Ichimoku Kinko Hyo indicators to implement a trend-following trading system. The system can capture medium-term trends for trend trading.  

## Strategy Logic

This strategy uses the Hull Moving Average to determine the direction of the price trend. The Hull MA is an optimized version of the moving average that can respond more quickly to price changes. The strategy here employs a triple Hull MA system, containing 6-period, 3-period and 1.5-period Hull MAs.

In addition, the strategy also incorporates the Ichimoku Kinko Hyo conversion and lagging span lines. These two indicators reflect the medium to long term trend of the prices. The strategy combines the triple Hull MA and Ichimoku indicators to generate trading signals. 

Specifically, the strategy calculates the triple Hull MA: n1, n2, n2ma. As well as two Ichimoku indicators: leadLine1 and leadLine2. It then computes post1 and post2 as the final trading metrics.

When post1 crosses over post2 upward, go long. When post1 crosses below post2, go short. This allows us to track and capture price medium-term trends for trend trading.

## Advantage Analysis  

The advantages of this strategy include:

1. Combining dual indicators improves system stability.
2. Hull MA responds fast and can capture trend changes.  
3. Ichimoku filters out false breakouts.
4. The multiple Hull MAs can effectively track medium-term price trends.
5. The strategy logic is simple and easy to understand and optimize.

## Risk Analysis

There are also some risks with this strategy:

1. It may generate multiple false signals during ranging markets.  
2. Inadequate parameter settings can lead to poor performance.
3. Avoid using this strategy around major news events.

Countermeasures:

1. Adjust parameters to filter out noise.
2. Optimize parameters to find the best combination.  
3. Avoid trading around significant news releases.

## Optimization Directions

This strategy can also be improved in the following aspects:

1. Test Hull MA combinations of different lengths.
2. Add or reduce Ichimoku indicators.  
3. Smooth optimizations for trading metrics post1 and post2. 
4. Incorporate stop loss to limit per trade loss.

## Conclusion

This strategy combines the Hull MA and Ichimoku Kinko Hyo indicators to build a simple and practical trend following system. With fast responses, it can effectively capture medium-term price trends. Further testing and optimization, through parameter tuning and adding filters, can lead to better trading performance.
[/trans]]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|6|Hull MA period|
|v_input_2|9|Conversion Line Periods|
|v_input_3|26|Base Line Periods|
|v_input_4|52|Lagging Span 2 Periods|
|v_input_5|26|Displacement|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-17 00:00:00
end: 2023-12-24 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//                                                HULL & ICHIMOKU & MATHS
strategy("3 HULLs & ICHIMOKU divided by PRICE", shorttitle="3H&I/P", overlay=true, default_qty_type=strategy.percent_of_equity, max_bars_back=720, default_qty_value=100, calc_on_order_fills=true, calc_on_every_tick=true, pyramiding=0)
keh=input(title="Hull MA period",defval=6)
p=ohlc4[1]
n2ma=2*wma(p,round(keh/2))
nma=wma(p,keh)
diff=n2ma-nma
sqn=round(sqrt(keh))
n2ma1=2*wma(p[1],round(keh/2))
nma1=wma(p[1],keh)
diff1=n2ma1-nma1
sqn1=round(sqrt(keh))
n1=wma(diff,sqn)
n2=wma(diff1,sqn)
conversionPeriods = input(9, minval=1, title="Conversion Line Periods")
basePeriods = input(26, minval=1, title="Base Line Periods")
laggingSpan2Periods = input(52, minval=1, title="Lagging Span 2 Periods")
displacement = input(26, minval=1, title="Displacement")
donchian(len) => avg(lowest(len), highest(len))
conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)
post1=((n1[1]*3)+leadLine1)/p
post2=((n2[1]*3)+leadLine2)/p
if (post1<post2)
    strategy.entry("buy", strategy.long, comment="BUY")
if (post1>post2)
    strategy.entry("sell", strategy.short, comment="SELL")
```

> Detail

https://www.fmz.com/strategy/436509

> Last Modified

2023-12-25 13:40:10
