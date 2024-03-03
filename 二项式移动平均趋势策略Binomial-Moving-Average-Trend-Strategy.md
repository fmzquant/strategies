
> Name

二项式移动平均趋势策略Binomial-Moving-Average-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/187be3b285275656da1.png)
[trans]

## 概述

二项式移动平均(Binomial Moving Average,简称BMA)是一种全新型的移动平均线指标。它利用二项式系数的一半来计算平均价,具有计算方式独特、平滑性好、实用性强的优点。

本策略将快速BMA和慢速BMA进行组合,形成类似于MACD的交易信号,属于趋势跟踪策略。它可用于多个周期,适合中长线操作。

## 策略详情

### 策略名称

二项式移动平均趋势策略(Binomial Moving Average Trend Strategy)

### 策略原理

1. 计算二项式移动平均线(BMA)。它根据用户设置的周期长度,计算出二项式系数,然后取其一半值作为权重平均价格。例如周期长度为5,则计算9次二项式系数,取其一半进行加权平均。这使得最近几根K线的权重更大,平滑性更好。

2. 设置快速BMA周期和慢速BMA周期。快速BMA对价格变化更敏感,慢速BMA更稳定。它们的交叉产生交易信号。

3. 当快速BMA上穿慢速BMA时,做多;当快速BMA下穿慢速BMA时,做空。进入场内后,一直持有仓位直至反向信号出现。

### 优势分析

这套策略最大的优势在于BMA指标的计算方式新颖,它增强了移动平均线的优点,提高了平滑性和实用性。相比EMA和SMA,BMA对最近几根K线的权重更大,同时也保留了更多历史信息。这使它能更好地捕捉趋势,产生更少假信号。

此外,快慢BMA的组合充分发挥了移动平均线的优势,它过滤了大量噪音,只在趋势转折点产生交易信号。策略本身逻辑简单,容易理解和实施,适合中长线操作。

### 风险分析

该策略主要风险在于:

1. 所有跟踪趋势策略一样,当趋势反转时容易产生亏损。解决方法是设置止损,或优化参数使BMA更灵敏。

2. BMA参数设置不当也会影响策略效果。如果快速BMA过于灵敏,会增加假信号;如果慢速BMA过于滞后,则可能错过趋势机会。需多组合测试找到最佳参数。 

3. 本策略默认全仓交易,可根据风险偏好设置仓位管理,降低单笔损失。

### 优化方向  

该策略的主要优化方向是BMA自身以及组合参数的测试。

1. 周期设置:测试不同的快速BMA周期和慢速BMA周期,找到最优参数组合。一般快速周期在10-30之间,慢速周期在20-60之间。

2. BMA权重:可以测试不同的权重分配方式,是全部分配二项式系数的一半,还是更偏重最近几根K线。这可能进一步提高BMA的平滑性。

3. 过滤条件:可设置价格突破、交易量增加等过滤条件,避免不合理的信号。

4. 止损机制、仓位管理也可以测试加入,控制风险。

## 总结

本策略首次提出二项式移动平均这一独特指标,它增强了移动平均线的计算方式,使得策略整体实用性和稳定性都得到提升。快速BMA和慢速BMA的交叉产生简单有效的交易信号。该策略平滑参数和风险控制都有进一步优化的空间,是一套非常有前途的趋势跟踪策略。

||


## Overview

The Binomial Moving Average (BMA) is a novel type of moving average indicator. It uses half of the binomial coefficients to calculate the average price, featuring unique calculation methods, good smoothness and strong practicality.

This strategy combines fast BMA and slow BMA to generate trading signals like MACD, belonging to the trend-following strategy. It can be applied to multiple timeframes and is suitable for medium-to-long term operations.

## Strategy Details 

### Strategy Name  

Binomial Moving Average Trend Strategy

### Strategy Logic

1. Calculate the Binomial Moving Average (BMA). According to the user-set period, it calculates the binomial coefficients and takes half of them as weights to average prices. For example, with period 5, it calculates 9 binomial coefficients and takes their half for weighted average. This gives more weight to recent candles and better smoothness.

2. Set fast BMA period and slow BMA period. Fast BMA is more sensitive to price changes while slow BMA is more stable. Their crossover generates trading signals.  

3. When fast BMA goes above slow BMA, long position is opened. When fast BMA falls below slow BMA, short position is opened. Hold the position until opposite signal appears.

### Advantage Analysis

The biggest advantage of this strategy lies in the innovative calculation of BMA. It enhances the strengths of moving averages with improved smoothness and practicality. Compared to EMA and SMA, BMA gives more weight to recent candles while retaining more historical information. This allows it to better capture trends and generate fewer false signals.

In addition, the fast and slow BMA combo makes full use of the advantages of moving averages. It filters out lots of noise and only produces signals at trend turning points. The strategy itself is simple to understand and implement, suitable for medium-to-long term trading.  

### Risk Analysis

The main risks of this strategy include:

1. Like all trend-following strategies, it can lead to losses when trend reverses. Solutions are setting stop loss or optimizing parameters to make BMA more sensitive.  

2. Improper BMA parameter setup also impacts strategy performance. Overly sensitive fast BMA may generate false signals while lagging slow BMA may miss trend opportunities. Extensive tests are needed to find the optimal parameter combination.

3. The strategy by default uses full position. Position sizing can be added according to risk preference to limit per trade loss.

### Optimization Directions   

The main optimization directions are testing of BMA itself and the parameter combination.

1. Period setting: Test different fast BMA and slow BMA periods to find the optimal combo. Generally fast period is between 10-30, slow period between 20-60.  

2. BMA weight: Test different weighting schemes, like fully distributing half binomial coefficients or putting more weight on recent candles. This may further improve BMA's smoothness.

3. Filter conditions like breakouts and rising volume can be added to avoid unreasonable signals. 

4. Stop loss mechanism and position sizing can also be tested to better control risks.

## Conclusion

This strategy firstly proposes the unique Binomial Moving Average indicator. It enhances moving average calculation and improves the overall usefulness and stability of the strategy. Crossovers between fast and slow BMA generate simple yet effective trading signals. There remains room for further optimization on parameter smoothness and risk control. It's a very promising trend-following strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Fast MA|
|v_input_2|30|Slow MA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-07 00:00:00
end: 2023-12-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © HosseinDaftary

//@version=4
strategy("Binomial Moving Average","BMA", overlay=true, margin_long=100, margin_short=100 ,max_bars_back=96)
//Binomial Moving Average:This type of moving average that is made by myself and i did not see anywhere before uses the half of binomial cofficients for
//averaging the prices for example if the period be 5 then we use the 9 degree binomial cofficients(that yields 10 cofficients) and use half of them.
//we use 126/256 for last bar,84/256,36/256,9/256 and finally use 1/256 for 5th bar. Seemingly this MA works better than EMA.
fa_ma=input(title='Fast MA',defval=10)
sl_ma=input(title='Slow MA',defval=30)

fac(n)=>
    fact=1
    for i= 1 to n
        fact:=fact*i
    fact
cof= array.new_float(sl_ma) 

hn_ma(price,length)=>
    sum=1.0
    sum1=0.0
    array.set(cof,length-1,1)
    for i=2 to length
        array.set(cof,length-i,fac(2*length-1)/(fac(i-1)*fac(2*length-i)))
        sum:=sum+array.get(cof,length-i)
    for i=0 to length-1
        array.set(cof,i,array.get(cof,i)/sum)
        sum1:=sum1+array.get(cof,i)*price[i]
    sum1
hn1=plot(hn_ma(close,sl_ma) , color=#00ff00)
hn2=plot(hn_ma(close,fa_ma) ,color=#ff0000)
fill(hn1,hn2,color=hn_ma(close,fa_ma)>hn_ma(close,sl_ma)?color.green:color.red)


longCondition = crossover(hn_ma(close, fa_ma), hn_ma(close, sl_ma))
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = crossunder(hn_ma(close, fa_ma), hn_ma(close, sl_ma))
if (shortCondition)
    strategy.entry("Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/434695

> Last Modified

2023-12-08 14:55:19
