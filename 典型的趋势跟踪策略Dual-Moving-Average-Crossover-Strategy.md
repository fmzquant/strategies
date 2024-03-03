
> Name

典型的趋势跟踪策略Dual-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1148a4aa63b71da3062.png)

[trans]

## 概述

双均线交叉策略是一种典型的趋势跟踪策略。它利用两条不同周期的EMA均线,当短周期均线上穿长周期均线时做多,当短周期均线下穿长周期均线时做空,以捕捉价格趋势的转折点。

## 策略原理  

该策略的核心指标是两条EMA均线,分别为30周期和60周期。代码中通过自定义函数计算两条EMA均线:

```
emaLen1 = emaFuncOne(close, lenMA1)  
emaLen2 = emaFuncTwo(close, lenMA2)
```

策略的交易信号来自两条EMA均线的交叉:

```
currentState = if emaLen2 > emaLen1  
    0
else
    1

previousState = if emaLastLen2 > emaLastLen1
    0  
else
    1

convergence = if currentState != previousState
    1
else 
    0
```

当短期EMA上穿长期EMA时,currentState与previousState不相等,出现交叉信号。这时做多。
当短期EMA下穿长期EMA时,currentState与previousState不相等,出现交叉信号。这时做空。

## 优势分析

该策略具有以下优势:

1. 策略思路简单直观,容易理解和实现
2. 利用EMA均线的平滑特性,有效过滤市场噪音
3. 自动跟踪趋势,不容易漏买漏卖

## 风险分析  

该策略也存在一些风险:  

1. 双均线交叉信号可能滞后,无法及时捕捉转折
2. 震荡行情中可能出现多次错误信号
3. 参数设置不当可能导致过于敏感或过于滞后

可以通过调整EMA周期,或者增加过滤条件来优化。

## 优化方向  

该策略可以从以下几个方面进行优化:

1. 测试不同长度的EMA周期组合
2. 增加成交量或波动率条件过滤假信号 
3. 结合其他指标确认趋势,例如MACD
4. 优化资金管理,设置止损止盈

## 总结  

双均线交叉策略整体来说是一种简单实用的趋势跟踪策略。它 straight-forward,易于实现,可以自动跟踪趋势。但也存在一些滞后,假信号的风险。通过参数优化和增加过滤条件,可以进一步完善,使其成为量化交易的基础策略之一。

||

## Overview   

The Dual Moving Average Crossover strategy is a typical trend following strategy. It uses two EMA lines with different periods and goes long when the shorter period EMA crosses over the longer period EMA and goes short when the opposite crossing happens to capture trend reversals.  

## Principles  

The core indicators of this strategy are two EMA lines, one is 30-period and the other is 60-period. The two EMA lines are calculated by custom functions in the code:   

```
emaLen1 = emaFuncOne(close, lenMA1)
emaLen2 = emaFuncTwo(close, lenMA2)  
```

The trading signals are generated from the crossing of the two EMA lines:  

```  
currentState = if emaLen2 > emaLen1
    0
else 
    1

previousState = if emaLastLen2 > emaLastLen1 
    0
else
    1

convergence = if currentState != previousState
    1  
else
    0
```
  
When the shorter period EMA crosses over the longer period EMA, currentState is not equal to previousState, a crossover signal is triggered, go long. 
When the shorter period EMA crosses below the longer period EMA, currentState is not equal to previousState, a crossover signal is triggered, go short.

## Advantage Analysis   

The advantages of this strategy are:  

1. The logic is simple and intuitive, easy to understand and implement  
2. Smoothes price fluctuations with EMA and filters out market noise  
3. Automatically follows trends, avoids missing trades   

## Risk Analysis   

There are also some risks with this strategy:   

1. Crossover signals may lag and fail to capture reversals in a timely manner
2. Whipsaw signals may occur frequently during ranging markets  
3. Poor parameter tuning may cause oversensitivity or delays

Optimization can be done by adjusting EMA periods or adding filters.  

## Optimization Directions

This strategy can be optimized from the following aspects:  

1. Test different EMA period combinations  
2. Add volume or volatility filters to reduce false signals
3. Incorporate other indicators like MACD to confirm trends  
4. Optimize money management with stop loss and take profit

## Conclusion  

The Dual Moving Average Crossover strategy is a simple and practical trend following system overall. It is straight-forward, easy to implement and can automatically track trends. But some risks like lagging and false signals exist. With parameter tuning and adding filters, it can be further improved to become one of the fundamental algorithmic trading strategies.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|30|Length 1|
|v_input_2|60|Length 2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-10 00:00:00
end: 2024-01-11 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("ParkerMAStrat", overlay=true)

lenMA1=input(title="Length 1", defval=30)
lenMA2=input(title="Length 2",  defval=60)

x = 0

checkLines(current, last) =>

    if current > last
        x = 1
    else
        x = 0
    x
    

//plot ema based on len1
emaFuncOne(src, time_period) =>

    alpha = 2 / (time_period + 1)
    // we have defined the alpha function above
    ema = 0.0
    // this is the initial declaration of ema, since we dont know the first ema we will declare it to 0.0 [as a decimal]
    ema := alpha * src + (1 - alpha) * nz(ema[1])
    // this returns the computed ema at the current time
    // notice the use of : (colon) symbol before =, it symbolises, that we are changing the value of ema,
    // since the ema was previously declared to 0
    // this is called mutable variale declaration in pine script
    ema
    // return ema from the function

emaLen1 = emaFuncOne(close, lenMA1)

    
plot(emaLen1, color=green, transp=0, linewidth=2)
// now we plot the _10_period_ema

//plot ema based on len2
emaFuncTwo(src, time_period) =>

    alpha = 2 / (time_period + 1)
    // we have defined the alpha function above
    ema = 0.0
    // this is the initial declaration of ema, since we dont know the first ema we will declare it to 0.0 [as a decimal]
    ema := alpha * src + (1 - alpha) * nz(ema[1])
    // this returns the computed ema at the current time
    // notice the use of : (colon) symbol before =, it symbolises, that we are changing the value of ema,
    // since the ema was previously declared to 0
    // this is called mutable variale declaration in pine script
    ema
    // return ema from the function

//plot ema based on len2
emaFuncOneLast(src, time_period) =>

    alpha = 2 / (time_period + 1)
    // we have defined the alpha function above
    ema = 0.0
    // this is the initial declaration of ema, since we dont know the first ema we will declare it to 0.0 [as a decimal]
    ema := alpha * src + (1 - alpha) * nz(ema[0])
    // this returns the computed ema at the current time
    // notice the use of : (colon) symbol before =, it symbolises, that we are changing the value of ema,
    // since the ema was previously declared to 0
    // this is called mutable variale declaration in pine script
    ema
    // return ema from the function

//plot ema based on len2
emaFuncTwoLast(src, time_period) =>

    alpha = 2 / (time_period + 1)
    // we have defined the alpha function above
    ema = 0.0
    // this is the initial declaration of ema, since we dont know the first ema we will declare it to 0.0 [as a decimal]
    ema := alpha * src + (1 - alpha) * nz(ema[0])
    // this returns the computed ema at the current time
    // notice the use of : (colon) symbol before =, it symbolises, that we are changing the value of ema,
    // since the ema was previously declared to 0
    // this is called mutable variale declaration in pine script
    ema
    // return ema from the function



emaLastLen1 = emaFuncOneLast(close, lenMA1)
emaLastLen2 = emaFuncTwoLast(close, lenMA2)
emaLen2 = emaFuncTwo(close, lenMA2)

    
plot(emaLen2, color=red, transp=30, linewidth=2)
// now we plot the _10_period_ema

//now we compare the two and when green crosses red we buy/sell (line1 vs line2)

previousState = if emaLastLen2 > emaLastLen1
    0
else
    1

currentState = if emaLen2 > emaLen1
    0
else
    1

convergence = if currentState != previousState
    1
else
    0

    
lineCheck = if convergence == 1 
    checkLines(currentState, previousState)
    
if lineCheck == 1
    strategy.entry("Long", strategy.long)
else
    strategy.entry("Short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/438507

> Last Modified

2024-01-12 14:59:18
