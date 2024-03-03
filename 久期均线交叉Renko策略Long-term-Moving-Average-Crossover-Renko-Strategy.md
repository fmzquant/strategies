
> Name

久期均线交叉Renko策略Long-term-Moving-Average-Crossover-Renko-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ca5f2415971c812143.png)
 [trans]
### 概述

该策略是基于Renko蜡烛图的移动平均线交叉策略。它使用TEMA指标构建交叉信号,并结合长期均线进行过滤,旨在识别Renko蜡烛图上的趋势,发出买入和卖出信号。

### 策略原理

该策略主要的信号来源是短期TEMA指标和SMA指标的金叉死叉。具体逻辑是:

当短期TEMA上穿短期SMA时,做多;当短期TEMA下穿短期SMA时,平仓。

此外,该策略还设置了两个可选参数avg_protection和gain_protection,用于调节进场和止损逻辑:

- avg_protection>0时,只有当close价格低于当前持仓均价时才会买入,这样可以降低持仓成本;

- gain_protection>0时,只有当close价格超过入场价一定百分比时才会卖出止盈,从而锁定盈利。

最后,策略还使用一条长期SMMA指标作为趋势过滤器。只有当close价格低于SMMA时,才会发出做多信号。

### 优势分析

该策略主要具有以下优势:

1. 基于Renko蜡烛图,能有效过滤noise,识别趋势;
2. 使用TEMA指标构建信号,灵敏度高,跟随性好;  
3. 可调参数丰富,可以控制进场策略;
4. 结合长短期均线,可在趋势中捕捉机会。

### 风险分析

该策略也存在一些风险:  

1. Renko本身时间轴不均匀,无法控制间隔时间;
2. TEMA灵敏度高也更容易产生误信号; 
3. 参数设置不当可能导致漏入漏出。

针对这些风险,可以通过适当调整参数,设定止损位置等方式进行规避。

### 优化方向  

该策略主要可以从以下几个方面进行优化:

1. 测试不同参数组合,寻找最优参数;
2. 增加止损策略,比如移动止损、区间止损等,降低 DD;
3. 结合其他指标进行信号过滤,减少误信号;
4. 测试不同品种的参数效果。

### 总结

该策略整体来说是一个基础简单但实用性很强的移动均线交叉策略。它主要依靠Renko K线优异的去噪效果以及TEMA指标的高灵敏性产生信号。同时,长短期均线的配合也强化了它的趋势跟随能力。通过参数调节和适当优化,该策略可以成为量化交易的一个有效选择。

||

### Overview

This strategy is a moving average crossover strategy based on Renko candlestick charts. It uses the TEMA indicator to construct crossover signals and combines long-term moving averages for filtering, aiming to identify trends on Renko charts and generate buy and sell signals.

### Strategy Logic

The main signal source of this strategy comes from the golden cross and death cross of the short-term TEMA indicator and SMA indicator. Specifically, the logic is:

When the short-term TEMA crosses over the short-term SMA, go long; when the short-term TEMA crosses below the short-term SMA, close positions.

In addition, the strategy also sets two optional parameters avg_protection and gain_protection to adjust the entry and stop loss logic:

- When avg_protection>0, only buy when the close price is lower than the current average holding price, which can reduce the cost basis;

- When gain_protection>0, only sell when the close price exceeds the entry price by a certain percentage to lock in profits.

Finally, the strategy also uses a long-term SMMA indicator as a trend filter. Only when the close price is below SMMA will a long signal be triggered.

### Advantage Analysis 

The main advantages of this strategy are:

1. Based on Renko candlestick charts, it can effectively filter out noise and identify trends;
2. Use the TEMA indicator to construct signals with high sensitivity and tracking ability;
3. The adjustable parameters are rich to control the entry strategy;
4. The combination of long-term and short-term moving averages can capture opportunities in trends.

### Risk Analysis

This strategy also has some risks:
 
1. Renko itself has an uneven timeline that cannot control interval times;
2. The high sensitivity of TEMA also leads to more false signals;
3. Improper parameter settings may lead to missing trades.

To mitigate these risks, proper parameter tuning, setting stop losses etc. can be adopted.

### Optimization Directions

The main optimization directions for this strategy are:

1. Test different parameter combinations to find the optimal parameters;
2. Add stop loss strategies such as trailing stop loss, range stop loss, etc. to reduce DD;
3. Combine other indicators for signal filtering to reduce false signals; 
4. Test parameter effectiveness across different products.

### Conclusion

In general, this is a basic, simple but highly practical moving average crossover strategy. It mainly relies on the excellent noise reduction effect of Renko bars and the high sensitivity of the TEMA indicator to generate signals. Meanwhile, the collaboration between long-term and short-term moving averages also enhances its trend following capability. With parameter tuning and proper optimization, this strategy can become an effective choice for quantitative trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|temaLength|
|v_input_2|3|smaLength|
|v_input_3|30|smmaLength|
|v_input_4|2|minGainPercent|
|v_input_5|true|avg_protection|
|v_input_6|true|gain_protection|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-17 00:00:00
end: 2024-01-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("TEMA Cross", overlay = true)

tema(src, len) =>
    3*ema(src, len) - 3*ema(ema(src, len), len) + ema(ema(ema(src, len),len),len)

smma(src, len) =>
    sa = 0.0
    sa := na(sa[1]) ? sma(src, len) : (sa[1] * (len - 1) + src) / len
    sa

temaLength = input(5)
smaLength = input(3)
smmaLength = input(30)
tema1 = tema(close, temaLength)
sma1 = sma(tema1, smaLength)
smma1 = smma(close,smmaLength)


plot(tema1, color = green, title = "TEMA")
plot(sma1, color = orange, title = "SMA")
plot(smma1, color = red, title = "SMMA")
minGainPercent = input(2)
gainMultiplier = minGainPercent * 0.01 + 1

avg_protection = input(1)
gain_protection = input(1)

longCondition = crossover(tema1, sma1) and tema1 < smma1
shortCondition = crossunder(tema1, sma1)

strategy.entry("Buy", strategy.long, when = longCondition and (avg_protection >= 1 ? (na(strategy.position_avg_price) ? true : close <= strategy.position_avg_price) : true))
strategy.close_all(when = shortCondition and (gain_protection >=1 ? (close >= gainMultiplier * strategy.position_avg_price) : true))
```

> Detail

https://www.fmz.com/strategy/439823

> Last Modified

2024-01-24 10:55:57
