
> Name

动量双均线交叉策略Momentum-Double-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c6522bbb85a800484c.png)
[trans]


## 概述

本策略采用动量双均线交叉的方法,实现low risk交易。它使用两个不同周期的均线,快线和慢线,根据它们的交叉去判断买入卖出时机。该策略旨在捕捉趋势的变化,在大趋势中获取长线收益。

## 策略原理   

该策略使用WMA快线和WMA慢线的交叉判断买卖信号。快线周期是慢线周期的一半。当快线从下方上穿慢线时产生买入信号;当快线从上方下穿慢线时产生卖出信号。为过滤假信号,它还引入了一个移动平均线的动量差值指标。只有当快慢线交叉的同时,该指标也符合形态要求时,才会产生交易信号。   

具体来说,策略中的关键逻辑有:   

1. 定义价格及参数:提取OHLC价格数据;定义参数HullMA周期z、价格数据p。

2. 计算双均线:计算2周期均线n2ma、z周期均线nma。 

3. 计算均线差值:计算两均线差值diff。

4. 计算动量指标:计算均线差值的sqn周期移动平均n1、n2、n3。

5. 判断交叉:当n1上穿n2时标记为绿色,否则标记为红色。

6. 绘制形态:绘制n1、n2的图形。

7. 判断信号:三个动量均线n1、n2、n3同向交叉时产生信号。

8. 入场出场:快线上穿慢线且动量指标符合要求时做多;快线下穿慢线且动量指标符合要求时做空。

## 策略优势

该策略结合双均线交叉和动量指标,可以有效过滤假信号,只在趋势变化开始时产生交易信号,从而获得较好的策略效果。

1. 快线慢线交叉可以判断趋势变化的时机,利用趋势获得收益。

2. 加入动量指标可以过滤假信号,避免被市场的短期涨跌误导。

3. 只在大趋势发生变化时进行交易,可以减少不必要的交易频率。 

4. 采用参数优化后的均线周期,可以使指标更符合不同品种的特性。

5. 允许一定程度的 pyreming 可以拉伸盈利周期。

## 策略风险

该策略也存在一些风险需要注意:

1. 双均线交叉对趋势变化判断有滞后,可能错过价格变化的最佳时机。

2. 动量指标参数设置不当可能对交易产生误导。

3. 存在一定的多空仓持仓时间不均衡问题。

4. 策略对市场的震荡行情没有很好的处理机制。

5. 存在一定的过优化风险,需对参数进行步进优化。

对应风险的解决方法有:

1. 可以考虑加入其他先导指标判断价格变化,提前做准备。 

2. 应对动量指标参数进行适当优化,找到最佳参数组合。

3. 可以考虑加入波动率指标帮助控制仓位时间。

4. 可适当限制仓位量,降低单笔亏损。

5. 应进行参数稳健性检验,避免过优化问题。

## 策略优化方向 

该策略还可以从以下几个方面进行优化:

1. 尝试不同类型的均线指标,找到对品种最优的参数。

2. 测试加入其他辅助指标,如MACD、布林带等判别趋势变化。 

3. 优化入场时机,准确判断价格反转的起点。

4. 优化出场时机,使用追踪止损等方式锁定利润。

5. 根据不同品种的特性进行参数优化。

6. 利用机器学习方法找到最优参数组合。

7. 构建动态仓位管理机制,控制风险。

8. 添加量化的策略评估指标,如夏普比率、盈亏比等。

9. 利用回测引擎评估策略在历史数据上的表现。

## 总结

综上所述,该动量双均线策略采用了均线交叉和动量指标判断大趋势的转折点,可以有效过滤噪音实现低风险交易。它具有获利稳定、实现简单等优点,也存在一些参数优化和风险控制方面的问题。我们可以从优化入场出场时机、动态仓位管理等方面进行改进,使策略更适应市场的特性。充分验证和严格评估是保证策略效果的关键。总之,该策略为量化交易提供了一个简单有效的思路,但还需要持续优化和验证,才能产生稳定的投资回报。

||

## Overview

This strategy uses the momentum double moving average crossover method to implement low risk trading. It utilizes two moving averages of different periods, a fast line and a slow line, to determine entry and exit signals based on their crossover. The goal of this strategy is to capture trend changes and generate long-term profits during major trends.

## Strategy Logic

The strategy generates trading signals based on the crossover of a fast WMA line and a slow WMA line. The period of the fast line is half of the slow line's period. A buy signal is generated when the fast line crosses above the slow line from below. A sell signal is generated when the fast line crosses below the slow line from above. To filter out false signals, it also incorporates a momentum indicator based on the difference between two moving averages. A trade signal is only generated when the MA crossover occurs concurrently with the momentum indicator fulfilling shape requirements.

Specifically, the key logic includes:

1. Define price input and parameters: get OHLC price data; define parameters HullMA period z, price data p.

2. Calculate dual MAs: compute 2-period MA n2ma, z-period MA nma.

3. Compute MA difference: calculate difference between two MAs diff.  

4. Compute momentum indicator: calculate moving average of diff - n1, n2, n3 with period sqn.

5. Determine crossover: mark n1 above n2 as green, otherwise red. 

6. Plot shapes: plot n1 and n2.

7. Identify signals: generate signal when n1, n2, n3 align in same direction. 

8. Enter and exit: go long when fast line above slow line and momentum indicator agrees; go short when fast line below slow line and momentum indicator agrees.

## Advantages

Combining dual MA crossover and momentum indicator, this strategy can effectively filter out false signals and only generate trades at the start of trend changes, thus producing good strategy performance.

1. MA crossover detects changes in trend, profiting from trends.

2. Momentum indicator filters out false signals, avoiding being misled by short-term fluctuations.

3. Only trading on major trend changes reduces unnecessary trading frequency.

4. Parameter optimization fits the characteristics of different products. 

5. Allowing some degree of pyramiding stretches out profit cycles.

## Risks

There are also some risks to be aware of:

1. Dual MA crossover has lag in detecting trend changes, potentially missing best timing.

2. Improper parameter settings on momentum indicator may generate bad signals. 

3. Imbalance exists between long and short holding periods.

4. The strategy lacks mechanisms to handle choppy market conditions well.  

5. Risk of over-optimization exists, requiring stepwise optimization of parameters.

Some solutions:

1. Consider adding other leading indicators to detect price changes early.

2. Optimize parameters of momentum indicator to find best combinations.

3. Add volatility indicator to control holding period.

4. Limit position sizing to reduce single loss.

5. Test for parameter robustness to avoid over-optimization.

## Improvement Directions

The strategy can be improved in the following aspects:

1. Test different types of MAs to find optimal parameters for each product.

2. Add other indicators like MACD, Bollinger Bands to determine trend changes.

3. Optimize entry timing to accurately determine turning points. 

4. Optimize exits using trailing stops to lock in profits.

5. Perform parameter optimization according to product characteristics. 

6. Employ machine learning to find optimal parameter combinations. 

7. Build dynamic position sizing mechanisms to control risks.

8. Add quantitative metrics like Sharpe ratio, profit factor for strategy evaluation.

9. Assess performance on historical data using backtesting engine.

## Summary

In summary, this momentum double MA strategy identifies major trend reversal points using MA crossover and momentum, enabling low-risk trading. It has advantages like stable profits and simple implementation, but also issues to improve like parameter optimization and risk control. We can refine areas like entry/exit timing, dynamic position sizing to better adapt to market conditions. Extensive validation and evaluation are critical for ensuring robust strategy performance. Overall, this strategy provides a simple yet effective approach to quantitative trading, but requires continuous optimizations and validations to generate consistent investment returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|60|HullMA cross|
|v_input_2_ohlc4|0|Price data: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-10 00:00:00
end: 2023-11-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
//OCTOPUS Indicator Strategy
strategy("FAVEL corp. Indicator Strategy", shorttitle="FAVEL corp. Monarch", overlay=true, default_qty_type=strategy.percent_of_equity, max_bars_back=420, default_qty_value=20, calc_on_order_fills= true, calc_on_every_tick=true, pyramiding=0)
z=input(defval=60,title="HullMA cross")
p=input(ohlc4,title="Price data")
n2ma=2*wma(p,round(z/2))
nma=wma(p,z)
diff=n2ma-nma
sqn=round(sqrt(z))
n2ma1=2*wma(p[1],round(z/2))
nma1=wma(p[1],z)
diff1=n2ma1-nma1
sqn1=round(sqrt(z))
n2ma2=2*wma(p[2],round(z/2))
nma2=wma(p[2],z)
diff2=n2ma2-nma2
sqn2=round(sqrt(z))
n1=wma(diff,sqn)
n2=wma(diff1,sqn)
n3=wma(diff2,sqn)
c=n1>n2?green:red
n1e=plot(n1, color=c, linewidth=1, offset=2)
n2e=plot(n2, color=c, linewidth=1, offset=2)
fill(n1e, n2e, color=c, transp=75)
plot(cross(n1, n2) ? n1 : na, style = circles,color=c, linewidth = 4)
closelong = p<p[1] and n1<n3
if (closelong)
    strategy.close("BUY")
closeshort = p>p[1] and n1>n3
if (closeshort)
    strategy.close("SELL")
longCondition = strategy.opentrades<1 and n1>n2 and p>p[1] and n1>n3
if (longCondition)
    strategy.entry("BUY",strategy.long)
shortCondition = strategy.opentrades<1 and n1<n2 and p<p[1] and n1<n3
if (shortCondition)
    strategy.entry("SELL",strategy.short)
```

> Detail

https://www.fmz.com/strategy/432419

> Last Modified

2023-11-17 17:00:32
