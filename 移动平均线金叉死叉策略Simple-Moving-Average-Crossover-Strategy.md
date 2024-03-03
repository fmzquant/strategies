
> Name

移动平均线金叉死叉策略Simple-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

本策略基于三条移动平均线的金叉死叉形态进行交易。当快速移动平均线上穿中速线并中速线上穿慢速线时做多;当快速移动平均线下穿中速线并中速线下穿慢速线时做空。

### 策略原理

1. 设置三条不同周期的移动平均线:快速线、中速线、慢速线
2. 当快速线上穿中速线且中速线上穿慢速线时,做多
3. 当快速线下穿中速线且中速线下穿慢速线时,做空  
4. 可设置入场延迟,过滤假突破
5. 当反向信号触发时平仓

具体来说,该策略利用三条不同周期移动平均线间的交叉进行交易。快速线代表当前短期趋势,中速线代表中期趋势,慢速线代表长期趋势。当短中长三条均线顺序发生向上交叉时,说明趋势启动,做多;当发生向下交叉时,说明趋势反转,做空。还可设置入场延迟来过滤短期假突破。

### 优势分析

1. 使用三条均线判断趋势方向变化,提高准确性
2. 延迟入场可过滤假突破,避免被套
3. 交易逻辑简单直观,容易理解实现
4. 可灵活调整均线参数,适用于不同周期
5. 顺势交易,避免逆势交易风险

### 风险分析

1. 大周期下需要较长持仓时间,存在亏损扩大风险
2. 三线交叉存在一定滞后,可能错过最佳入场点
3. 需要优化均线参数,否则信号可能不精确
4. 长期持仓需要考虑隔夜风险

可以通过调整持仓时间,优化均线参数,引入止损策略等方式来管理风险。

### 优化方向

1. 测试不同均线周期参数找出最优参数
2. 评估不同入场延迟的优劣以筛选信号
3. 引入止损策略,根据实际行情调整止损位置
4. 研究不同品种的参数偏好,建立参数优化体系
5. 测试增加再入场和加仓规则以优化持仓

### 总结

本策略基于三均线交叉判断趋势方向进行持仓。优点是交易信号简单明确,可配置性强;缺点是容易滞后且需要参数优化。可通过参数调优、止损策略等提高效果,并控制回撤风险。该策略帮助交易者掌握移动平均线的应用及多均线交叉的交易思路。

|| 

### Overview

This strategy trades based on golden cross and dead cross of 3 simple moving averages. It goes long when the fast SMA crosses above mid SMA and mid SMA crosses above slow SMA; It goes short when the reverse crossover happens. 

### Strategy Logic

1. Set 3 SMAs with different periods: fast, mid, slow
2. Go long when fast SMA crosses above mid SMA and mid above slow SMA
3. Go short when fast SMA crosses below mid SMA and mid below slow SMA
4. Can set entry delay to avoid false breakouts 
5. Exit when reverse crossover signal triggers

Specifically, it utilizes the crossovers between 3 SMAs of different periods to trade. The fast SMA represents short term trend, mid SMA represents medium term trend, and slow SMA represents long term trend. When the three SMAs crossover upward in sequence, it signals an uptrend to go long. When downward crossover happens, it signals a downtrend to go short. Entry delay can also be set to avoid short term false breakouts.

### Advantage Analysis

1. Using 3 SMAs improves directional accuracy  
2. Delayed entry avoids false breakouts and being trapped
3. Simple and intuitive logic, easy to understand
4. Flexible SMA parameter tuning for different cycles  
5. Trend following avoids counter-trend risks

### Risk Analysis

1. Long holding in long cycle risks loss expansion
2. SMA crossover has some lag, may miss best entry points 
3. Requires SMA parameter optimization, otherwise signals may be inaccurate
4. Long holding introduces overnight risks

Risks can be managed through position sizing, SMA optimization, stop loss strategies etc.

### Optimization Directions

1. Test different SMA periods to find optimal parameters
2. Evaluate entry delay to filter out signals
3. Introduce stop loss adaptable to actual price action
4. Study parameter preference across different products
5. Test adding re-entry and pyramiding rules to optimize holding

### Summary

This strategy holds positions based on 3 SMA crossovers to determine trend direction. Pros are simple clear signals and configurability; Cons are lagging signals and parameter dependency. Performance can be improved and risks controlled through parameter optimization, stop loss etc. It helps traders master using SMA and crossover strategies.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|SMA Top|
|v_input_2|50|SMA Mid|
|v_input_3|200|SMA Low|
|v_input_4|5|Long: After trigger, how many bars to wait?|
|v_input_5|5|Short: After trigger, how many bars to wait?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-21 00:00:00
end: 2023-09-20 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © DaynTrading

//@version=4
// strategy(
//      title="Simple Moving Average Cross",
//      overlay=true,
//      initial_capital=5000,
//      default_qty_type=strategy.percent_of_equity,
//      default_qty_value=2,
//      commission_type=strategy.commission.percent,
//      commission_value=0.075,
//      pyramiding=0
//      )

sma_top_input = input(title="SMA Top", type=input.integer, defval=20)
sma_mid_input = input(title="SMA Mid", type=input.integer, defval=50)
sma_low_input = input(title="SMA Low", type=input.integer, defval=200)

bars_long = input(title="Long: After trigger, how many bars to wait?", type=input.integer, defval=5)
bars_short = input(title="Short: After trigger, how many bars to wait?", type=input.integer, defval=5)

sma_top = sma(close, sma_top_input)
sma_mid = sma(close, sma_mid_input)
sma_low = sma(close, sma_low_input)

long = sma_top > sma_mid and sma_mid > sma_low
short = sma_top < sma_mid and sma_mid < sma_low

long_condition = long and long[bars_long] and not long[bars_long + 1]
short_condition = short and short[bars_short] and not short[bars_short + 1]

close_long = sma_top < sma_mid and sma_mid < sma_low and not long[bars_long + 1]
close_short = sma_top > sma_mid and sma_mid > sma_low and not short[bars_short + 1]

plot(sma_top, title="SMA Top", color=#95f252, linewidth=2)
plot(sma_mid, title="SMA Mid", color=#FF1493, linewidth=2)
plot(sma_low, title="SMA Low", color=#6a0dad, linewidth=2)

strategy.entry("LongPosition", strategy.long, when = long_condition)
strategy.entry("ShortPosition", strategy.short, when = short_condition)
    
strategy.close("LongPosition", when = close_short)
strategy.close("ShortPosition", when = close_long)
```

> Detail

https://www.fmz.com/strategy/427445

> Last Modified

2023-09-21 10:47:24
