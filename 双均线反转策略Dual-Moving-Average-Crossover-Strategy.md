
> Name

双均线反转策略Dual-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

本策略基于双均线的金叉死叉原理设计。当短期均线上穿长期均线时,做多;当短期均线下穿长期均线时,平仓。该策略简单易懂,适合新手学习。

## 策略原理

该策略主要基于sma(close, 14) 和 sma(close, 28) 两个均线 indicator。

首先定义长短均线:

```pine
short_ma = sma(close, 14)
long_ma = sma(close, 28)
```

然后根据金叉死叉判断入场出场:

```pine  
longCondition = crossover(short_ma, long_ma)
shortCondition = crossunder(short_ma, long_ma)
```

当短期均线上穿长期均线时做多:

```pine
strategy.entry("Buy", strategy.long, when = longCondition) 
```

当短期均线下穿长期均线时平仓:

```pine
strategy.close_all(when = shortCondition)
```

该策略原理简单明了,利用双均线的金叉死叉进行判断,具有一定的趋势跟踪能力。

## 优势分析

- 策略原理简单易懂,新手也能轻松使用
- 利用均线的金叉死叉判断趋势,有一定的趋势跟踪能力
- 可自定义均线周期,优化策略参数
- 可设置止损点,控制单笔损失

## 风险分析

- 双均线策略对市场震荡敏感,可能产生多次亏损交易
- 均线具有滞后性,可能错过价格反转点
- 靠近均线交叉点建立头寸容易被套牢
- 需要优化均线周期参数,不同周期效果可能存在差异
- 无法在趋势 violently 变化时快速止损

## 优化方向

该策略可以从以下几个方面进行优化:

1. 优化均线周期参数,寻找最佳参数组合

可以尝试不同的短期和长期均线周期,寻找最佳组合。例如 (5, 10)、(10, 20)、(20, 60)等参数对比测试。

2. 增加过滤条件,避免虚假信号

可以在均线交叉时增加交易量、价差等过滤条件,避免在震荡市场中产生过多交易。

3. 增加止损策略

设置止损点或使用均线作为止损线,可以控制单笔损失。

4. 结合其他指标

可以加入 MACD,KDJ 等辅助指标进行组合交易,提高策略效果。

5. 优化入场点位

在均线附近寻找更佳入场点,而不是紧贴均线建立头寸。例如在均线背离的点位入场。

## 总结

双均线策略概念简单,新手易于上手使用。但该策略对市场震荡敏感,存在一定亏损风险。我们可以通过优化参数、增加过滤条件、设置止损以及加入其他指标等方式来提高策略效果。在强劲趋势中,该策略可以获得不错的效果。但在市场震荡时期,建议谨慎使用或止损控制风险。

[/trans]

||


## Overview

This strategy is designed based on the golden cross and death cross of dual moving averages. It goes long when the short period moving average crosses above the long period moving average, and closes position when the short period moving average crosses below the long period moving average. The strategy is simple and easy to understand, suitable for beginners to learn.

## Strategy Logic

The strategy is mainly based on the sma(close, 14) and sma(close, 28) indicators. 

First define the short and long moving averages:

```pine
short_ma = sma(close, 14)  
long_ma = sma(close, 28)
```

Then determine entry and exit based on golden cross and death cross:

```pine
longCondition = crossover(short_ma, long_ma)
shortCondition = crossunder(short_ma, long_ma) 
```

Go long when the short MA crosses above the long MA:

```pine
strategy.entry("Buy", strategy.long, when = longCondition)
```

Close position when the short MA crosses below the long MA:

```pine
strategy.close_all(when = shortCondition) 
```

The logic is simple and clear, utilizing the crossovers of dual MAs to determine entries and exits. It has some trend following capacity.


## Advantage Analysis 

- Simple logic, easy for beginners to use
- Utilizes MA crossovers to determine trends
- Customizable MA periods for parameter optimization
- Allows stop loss to control single trade loss

## Risk Analysis

- Sensitive to market fluctuation, may generate multiple losing trades
- Lagging nature of MAs, may miss price reversal points
- Prone to being trapped near MA crossover points
- Need to optimize MA periods, different periods may lead to different results
- Unable to quickly cut loss when trend changes violently

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize MA periods to find the best combination

Test different short and long MA periods, such as (5, 10), (10, 20), (20, 60) etc to find the optimal combination.

2. Add filters to avoid false signals 

Add filters like trading volume, price gap etc. near MA crossovers to avoid excessive trades in ranging markets.

3. Incorporate stop loss 

Set stop loss price or use MA as stop loss line to control single trade loss.

4. Combine with other indicators

Add auxiliary indicators like MACD, KDJ etc. to improve strategy performance. 

5. Optimize entry points

Find better entry points near MAs instead of entering right at the crossover. For example, enter on MA divergence points.

## Summary

The dual MA strategy is simple for beginners to use. But it is sensitive to market fluctuations and has risks of losses. We can improve it by optimizing parameters, adding filters, incorporating stop loss, combining other indicators etc. It can perform well in strong trends but should be used with caution or proper stop loss in ranging markets.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.6|minGainPercent|
|v_input_2|true|avg_protection|
|v_input_3|true|gain_protection|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-21 00:00:00
end: 2023-09-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

//@version=2
// strategy("Tester", pyramiding = 50, default_qty_type = strategy.cash, default_qty_value = 20, initial_capital = 2000, commission_type = strategy.commission.percent, commission_value = 0.25)

minGainPercent = input(0.6)
gainMultiplier = minGainPercent * 0.01 + 1


longCondition = crossover(sma(close, 14), sma(close, 28))
shortCondition = crossunder(sma(close, 14), sma(close, 28))


avg_protection = input(1)
gain_protection = input(1)


strategy.entry("Buy", strategy.long, when = longCondition    and (avg_protection >= 1 ? (na(strategy.position_avg_price) ? true : close <= strategy.position_avg_price) : true))
strategy.close_all(when = shortCondition  and (gain_protection >=1 ? (close >= gainMultiplier * strategy.position_avg_price) : true))
```

> Detail

https://www.fmz.com/strategy/427487

> Last Modified

2023-09-21 16:40:01
