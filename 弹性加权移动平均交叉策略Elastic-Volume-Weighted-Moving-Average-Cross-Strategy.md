
> Name

弹性加权移动平均交叉策略Elastic-Volume-Weighted-Moving-Average-Cross-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略采用两条不同周期的弹性加权移动平均线(EVWMA)进行交叉操作,以产生买入和卖出信号。当短周期线上穿长周期线时产生买入信号;当短周期线下穿长周期线时产生卖出信号。

## 策略原理  

该策略通过计算不同周期的EVWMA线,并让它们交叉操作来判断趋势的变化。

具体来说,它首先计算了两条EVWMA线:

1. 短周期线m1,周期length1,默认是5

2. 长周期线m2,周期length2,默认是40

然后,它通过crossover和crossunder函数来判断m1和m2的交叉情况:

- 如果m1上穿m2,则产生买入信号,执行long操作

- 如果m1下穿m2,则产生卖出信号,执行short操作

这里需要注意的是,EVWMA与普通移动平均线不同,它对最近的数据赋予更高的权重,这样可以更快地响应价格变化。计算公式如下:

```
data = (nz(data[1]) * (nb_floating_shares - volume)/nb_floating_shares) + (volume_price/nb_floating_shares)
```

其中nz(data[1])表示上一周期的EVWMA值,nb_floating_shares表示该周期内总成交量,volume表示当前周期成交量,volume_price表示当前周期成交额。这样就实现了对最近数据赋予更高权重的效果。

## 优势分析

该策略具有以下优势:

1. 使用EVWMA可以更快响应价格变化,提高获利机会

2. 采用双EVWMA线交叉可以发现趋势变化点,及时入场

3. 操作简单,容易实现

4. 可自定义周期长度,适应不同市场环境

5. 不需要复杂的参数优化,容易实盘

## 风险及解决方法

该策略也存在一些风险:

1. 双线交叉无法过滤市场噪音,可能产生大量无效信号

   - 解决方法:结合其他指标如交易量来过滤信号

2. 无法确定趋势反转点,存在错过反转的风险

   - 解决方法:适当调整周期参数,或添加其他判定趋势反转的指标

3. 无止损止盈机制,无法有效控制风险

   - 解决方法:根据历史数据或波动情况,设定合理的止损止盈比率

4. 参数优化不足,线周期设置不当会损失效果

   - 解决方法:通过回测优化参数,选择合适的周期长度

## 优化方向

该策略可以从以下几个方面进行优化:

1. 增加止损止盈策略,严格控制风险

2. 优化线的周期长度,选择最佳参数

3. 添加交易量指标过滤信号,减少无效交易

4. 结合其他指标判断趋势反转,减少错过机会

5. 动态优化参数,根据市场变化调整线的周期长度

6. 区分多头市场和空头市场,采用不同的参数

7. 加入机器学习算法,利用大数据训练判断买卖时机

## 总结

该弹性加权移动平均交叉策略Overall, this elastic weighted moving average cross strategy通过计算并让双EVWMA线交叉操作,可以有效发现趋势变化,产生交易信号。策略简单易行,但存在一些风险及优化方向。通过优化止损机制、参数选择、结合其他指标等手段,可以强化该策略,使其更适应实盘交易。总体来说,该策略为移动平均交叉类策略的有益探索,值得进一步研究与应用。

|| 


## Overview

This strategy uses two EVWMA lines with different periods to generate crossovers and produce buy and sell signals. When the short period line crosses over the long period line, it generates a buy signal. When the short period line crosses below the long period line, it generates a sell signal.

## Strategy Logic

The strategy identifies trend changes by calculating and crossing two EVWMA lines with different periods. 

Specifically, it first calculates two EVWMA lines:

1. Short period line m1, with period length1, default to 5

2. Long period line m2, with period length2, default to 40

It then uses the crossover and crossunder functions to determine the crossover situations between m1 and m2:

- If m1 crosses over m2, it generates a buy signal and executes long operation

- If m1 crosses below m2, it generates a sell signal and executes short operation

Note that EVWMA gives more weight to recent data compared to simple moving average. The calculation formula is:

```
data = (nz(data[1]) * (nb_floating_shares - volume)/nb_floating_shares) + (volume_price/nb_floating_shares)
```

Where nz(data[1]) is the EVWMA value of previous period, nb_floating_shares is total volume of the period, volume is current period volume, and volume_price is current period turnover. This achieves the effect of assigning higher weights on recent data.

## Advantage Analysis

The advantages of this strategy include:

1. EVWMA responds faster to price changes and improves profit opportunities 

2. Crossover of dual EVWMA lines identifies turning points timely

3. Simple logic and easy to implement

4. Customizable period lengths to adapt different market environments

5. No complex parameter optimization needed and easy for live trading

## Risks and Solutions

There are also some risks with this strategy:

1. Crossovers may generate excessive invalid signals without filtering market noise

   - Solution: Combine with volume or other indicators to filter signals

2. Hard to identify trend reversal points and risks missing reversals

   - Solution: Adjust period parameters or add other reversal indicators 

3. No stop loss or take profit, unable to effectively control risks

   - Solution: Set proper stop loss and take profit ratios based on historical data and volatility
   
4. Insufficient parameter optimization leads to improper period settings

   - Solution: Optimize parameters through backtesting and choose proper lengths
   
## Improvement Directions

Some directions to improve the strategy:

1. Add stop loss and take profit to strictly control risks

2. Optimize period lengths to find the best parameters

3. Add volume filter to reduce invalid trades

4. Combine with reversal indicators to avoid missing reversals

5. Dynamically optimize parameters based on market changes

6. Differentiate bull and bear markets and use different parameters

7. Introduce machine learning models to determine trading timing based on big data

## Conclusion

In summary, this EVWMA cross strategy can effectively identify trend changes and generate trading signals by calculating and crossing dual EVWMA lines. The logic is simple but there are risks and improvement directions. By optimizing stop loss, parameter selection, integrating other indicators etc, the strategy can be strengthened for live trading. Overall, this is a beneficial exploration of moving average cross strategies and worth further research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|EVWMA Short|
|v_input_2|40|EVWMA Long|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-08-26 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2

strategy("Elastic Volume Weighted Moving Average Cross Strategy", shorttitle="EVWMA Cross", overlay=true)
length1=input(5, title="EVWMA Short")
length2=input(40, title="EVWMA Long")

nbfs1=sum(volume, length1)
nbfs2=sum(volume, length2)

medianSrc=close

calc_evwma(price, length, nb_floating_shares) => 
    data = (nz(data[1]) * (nb_floating_shares - volume)/nb_floating_shares) + (volume*price/nb_floating_shares)
    data
    

m1=calc_evwma(medianSrc, length1, nbfs1)
m2=calc_evwma(medianSrc, length2, nbfs2)

if (crossover(m1, m2))
    strategy.entry("MA2CrossLE", strategy.long, comment="MA2CrossLE")

if (crossunder(m1, m2))
    strategy.entry("MA2CrossSE", strategy.short, comment="MA2CrossSE")

p1=plot(m1,color=orange,linewidth=2, title="evwma")
p2=plot(m2,color=orange,linewidth=2, title="evwma")
```

> Detail

https://www.fmz.com/strategy/427192

> Last Modified

2023-09-18 22:08:05
