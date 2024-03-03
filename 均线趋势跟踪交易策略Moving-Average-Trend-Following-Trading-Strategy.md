
> Name

均线趋势跟踪交易策略Moving-Average-Trend-Following-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e79a2fb69d8ce9f325.png)
[trans]

## 概述

该策略通过计算移动平均线和价格变化率,结合一定周期内的K线,判断目前处于上涨趋势还是下跌趋势,并相应做多或做空。

## 策略原理

该策略首先计算长度为l的简单移动平均线a和长度为l的价格变化率r。然后计算当前K线价格与移动平均线的差值k。最后计算k在过去s根K线的总和sum。

当sum>0时,表示目前处于上涨趋势,该策略会做多。当sum<0时,表示目前处于下跌趋势,该策略会做空。

做多做空后,会一直持有头寸,直到趋势发生逆转(sum从正变负或从负变正),这时就会平仓。

## 优势分析

该策略最大的优势是能够抓住趋势,适合趋势交易。具体来说,有以下几点优势:

1. 使用移动平均线判断整体趋势方向,可以有效过滤市场噪音,锁定主要趋势。

2. 应用价格变化率指标衡量动量强度,避免错过强劲行情。 

3. 考量一定周期内多个K线,可以更准确判断趋势,避免被 einzelne Ausreißer in die Irre führen。

4. 只要趋势不变,就持续持有头寸,最大程度享受趋势行情带来的利润。

## 风险分析

该策略主要存在以下风险:

1. 无法准确判断趋势结束时间,可能预早停损或错过部分利润。

2. 无法有效控制单笔损失大小,极端行情下亏损可能较大。

3. 策略参数不当可能导致过于频繁交易或漏掉部分交易机会。

4. 长期持仓可能面临隔夜利息和保证金风险。

为控制风险,可以设置止损点、仅交易高流动性商品、优化参数以及合理使用杠杆。

## 优化方向

该策略主要可以从以下几个方面进行优化:

1. 测试不同长度的移动平均线和价格变化率,找到最佳参数组合。

2. 尝试其他指标如MACD等判断趋势,进一步提高准确率。

3. 增加仓位管理机制,例如盈利后部分止盈等,控制单笔亏损。

4. 结合波动率指标设定动态止损,降低极端行情的风险。 

5. 优化开仓和平仓逻辑,过滤假突破提高交易效率。

## 总结

该策略整体思路清晰、易于实现,通过跟踪趋势进行长线持仓交易,回撤控制相对合理,适合追求稳定收益的投资者。如能进一步优化止损和仓位管理等机制,可望获得较好的长期稳定回报。

||


## Overview

This strategy calculates the moving average and price change rate to determine whether the current state is in an uptrend or a downtrend combined with K-lines over a certain period, and accordingly goes long or short.

## Strategy Principle 

This strategy first calculates the simple moving average a of length l and the price change rate r of length l. Then it calculates the difference k between the current K-line price and the moving average. Finally, it calculates the sum sum of k over the past s K-lines.  

When sum>0, it indicates a current uptrend and the strategy will go long. When sum<0, it indicates a current downtrend and the strategy will go short.  

After going long or short, the position will be held until the trend reverses (sum changes from positive to negative or vice versa), then the position will be closed.

## Advantage Analysis

The biggest advantage of this strategy is that it can catch the trend and is suitable for trend trading. Specifically, it has the following advantages:

1. Using the moving average to determine the overall trend direction can effectively filter market noise and lock in the major trend.

2. Applying the price change rate indicator to measure momentum strength avoids missing strong momentum.

3. Taking into account multiple K-lines over a period can more accurately determine the trend and avoid being misled by einzelne Ausreißer. 

4. As long as the trend remains unchanged, continue holding the position to maximize profits from the trending market.

## Risk Analysis

The main risks of this strategy are:

1. Unable to accurately determine the end time of the trend, may stop loss prematurely or miss some profits.  

2. Unable to effectively control the size of single loss, losses may be large in extreme market conditions.

3. Improper strategy parameters may lead to over-frequent trading or missing some trading opportunities.  

4. Long-term holdings may face overnight interest and margin risks.

To control risks, we can set stop loss points, trade only highly liquid products, optimize parameters and reasonably use leverage.

## Optimization Directions

The main aspects to optimize this strategy include:

1. Test moving averages and price change rates of different lengths to find the best parameter combination.

2. Try other indicators such as MACD to better determine the trend and further improve accuracy. 

3. Add position management mechanisms, such as taking profit after making some profits, to control single loss.

4. Incorporate volatility indicators to set dynamic stops to reduce risks in extreme market conditions.

5. Optimize entry and exit logic to filter false breakouts and improve trading efficiency.  

## Conclusion

The overall logic of this strategy is clear and easy to implement. By tracking trends for long-term holding trading, drawdown control is relatively reasonable. It is suitable for investors seeking stable returns. Further optimizing the stop loss and position management can expect good long-term steady returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|170|Length for indicator|
|v_input_2|18|Length of summation|
|v_input_3|false|Take Profit|
|v_input_4|false|Stop Loss|
|v_input_5|false|Trailing Stop Loss|
|v_input_6|false|Trailing Stop Loss Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-03 00:00:00
end: 2023-12-10 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Indicator Integrator Strat",default_qty_type = strategy.percent_of_equity, default_qty_value = 100,currency="USD",initial_capital=662, overlay=false)

l = input(defval=170,title="Length for indicator")
s = input(title="Length of summation",defval=18)
a= sma(close,l)
r=roc(close,l)
k=close-a
sum = 0
for i = 0 to s
    sum := sum + k[i]
//plot(a,color=yellow,linewidth=2,transp=0)
//bc =  iff( sum > 0, white, teal)
//plot(sum,color=bc, transp=20, linewidth=3,style=columns)
//plot(sma(sum,3),color=white)
//hline(0)

inpTakeProfit = input(defval = 0, title = "Take Profit", minval = 0)
inpStopLoss = input(defval = 0, title = "Stop Loss", minval = 0)
inpTrailStop = input(defval = 0, title = "Trailing Stop Loss", minval = 0)
inpTrailOffset = input(defval = 0, title = "Trailing Stop Loss Offset", minval = 0)
useTakeProfit = inpTakeProfit >= 1 ? inpTakeProfit : na
useStopLoss = inpStopLoss >= 1 ? inpStopLoss : na
useTrailStop = inpTrailStop >= 1 ? inpTrailStop : na
useTrailOffset = inpTrailOffset >= 1 ? inpTrailOffset : na

////buyEntry = crossover(source, lower)
////sellEntry = crossunder(source, upper)
if sum>0
    strategy.entry("BBandLE", strategy.long, oca_name="BollingerBands",  comment="BBandLE")
else
    strategy.cancel(id="BBandLE")
if sum<0
    strategy.entry("BBandSE", strategy.short, oca_name="BollingerBands",  comment="BBandSE")
else
    strategy.cancel(id="BBandSE")

strategy.initial_capital = 50000
plot(strategy.equity-strategy.initial_capital-strategy.closedtrades*.25/2, title="equity", color=red, linewidth=2)
hline(0)
//longCondition = sum>0
//exitlong = sum<0

//shortCondition = sum<0
//exitshort = sum>0

//strategy.entry(id = "Long", long=true, when = longCondition)
//strategy.close(id = "Long", when = exitlong)
//strategy.exit("Exit Long", from_entry = "Long", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset, when=exitlong)

//strategy.entry(id = "Short", long=false, when = shortCondition)
//strategy.close(id = "Short", when = exitshort)
//strategy.exit("Exit Short", from_entry = "Short", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset, when=exitshort)
```

> Detail

https://www.fmz.com/strategy/434986

> Last Modified

2023-12-11 15:05:31
