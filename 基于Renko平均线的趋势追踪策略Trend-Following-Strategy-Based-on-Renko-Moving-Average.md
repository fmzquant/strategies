
> Name

基于Renko平均线的趋势追踪策略Trend-Following-Strategy-Based-on-Renko-Moving-Average

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e80092d94d2c9fdbc0.png)
[trans]
### 概述

这是一个利用Renko平均线进行趋势判断和追踪的交易策略。该策略的核心逻辑是当价格突破22周期的HL2平均线时,做出相应的买入或卖出操作。同时,该策略还设置了止损、止盈、移动止损等风险管理机制。

### 策略原理

当Renko柱线收盘价上穿22周期HL2平均线时,做多;当Renko柱线收盘价下穿22周期HL2平均线时,做空。这样通过判断价格与平均线的关系,来捕捉趋势的方向。

HL2平均线(Highest High + Lowest Low)/2)是一种趋势型平均线,它结合最高价和最低价的信息,可以更准确地判断趋势的发展方向。22是一个经验值,用于平衡平均线的灵敏度。

此外,策略还设置了只在特定交易时段开仓的限制,以规避市场可能存在的剧烈波动。

### 优势分析

这是一个较为简单直观的趋势追踪策略,具有如下优势:

1. 使用Renko柱线作为交易信号,可以有效过滤市场噪音,捕捉主要趋势。

2. HL2平均线结合最高价和最低价信息,对趋势判断更为准确可靠。

3. 设定固定的止损、止盈点位,可以很好控制单笔交易的风险。

4. 移动止损可以随着趋势的发展来锁定利润,实现趋势跟踪。

5. 限制交易时间段,可以一定程度规避剧烈行情的冲击。

### 风险分析

该策略也存在一些风险,主要体现在:  

1. 平均线策略容易产生较多的虚假信号。

2. 无法有效应对突发事件导致的断头风险。

3. Renko设置不当可能导致错过较好的交易机会。

4. 固定的止损、止盈难以适应市场的变化。

### 优化方向  

该策略可以从以下几个方向进行优化:

1. 增加其他指标或条件来过滤信号,减少虚假信号。例如量能指标、震荡指标等。

2. 可以测试不同参数的平均线,寻找更合适的周期数值。

3. Renko的箱体大小也可以进行测试优化,以获得最佳的参数。

4. 增加基于波动率的自适应止损机制。

5. 可以测试不同的交易时间段设置,优化这一条件。

### 总结  

总的来说,这是一个利用Renko平均线进行趋势判断和追踪的简单实用策略。它有较直观的交易逻辑、风险控制机制,适合追求稳定收益的交易者。但也存在一些改进空间,通过参数优化、增加过滤条件、自适应止损等手段可以获得更好的策略效果。

||

### Overview

This is a trading strategy that utilizes Renko moving averages for trend identification and tracking. The core logic of this strategy is to go long or short when the price breaks through the 22-period HL2 moving average on the Renko bars. Meanwhile, this strategy also sets risk management mechanisms like stop loss, take profit and trailing stop.

### Strategy Principle 

When the Renko bar closing price breaks above the 22-period HL2 moving average, go long. When the Renko bar closing price breaks below the 22-period HL2 moving average, go short. By judging the relationship between price and moving average, it captures the trend direction.

The HL2 moving average (Highest High + Lowest Low)/2) is a trend-following moving average, which incorporates the information of highest high and lowest low prices to more accurately determine the trend direction. 22 is an empirical value to balance the sensitivity of the moving average.

In addition, the strategy also sets the restriction of only opening positions during specific trading sessions to avoid potential huge market swings.

### Advantage Analysis

This is a relatively simple and intuitive trend-following strategy with the pros below:

1. Using Renko bars as trading signals can effectively filter out market noise and capture the main trend.

2. The HL2 moving average combines highest and lowest price information for more reliable trend judgment. 

3. Setting fixed stop loss and take profit points can well control the risk of single trades.

4. Trailing stop can lock in profits along the trend development to realize trend tracking.

5. Limiting trading sessions can alleviate the impact of huge swings to some extent.

### Risk Analysis 

There are also some risks with this strategy:

1. Moving average strategies tend to generate more false signals.  

2. It cannot effectively cope with the gap risk caused by sudden events.

3. Improper Renko settings may miss better trading opportunities.  

4. Fixed stop loss and take profit cannot adapt to market changes.

### Optimization Directions

The strategy can be optimized in the following aspects:

1. Add other indicators or conditions to filter out false signals, e.g. volume, oscillators etc.

2. Test moving averages with different parameters to find out the most suitable period.

3. The box size of Renko can also be tested and optimized for the best parameter.  

4. Add adaptive stop loss mechanism based on volatility.

5. Test different trading session settings to optimize this condition.

### Conclusion   

In conclusion, this is a simple and practical strategy for trend identification and tracking using Renko moving average. It has intuitive trading logic and risk control mechanisms, suitable for traders seeking steady returns. But there is still room for improvement by parameter optimization, adding filter conditions, adaptive stop loss etc. to obtain better strategy performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|300|Take Profit|
|v_input_2|200|Stop Loss|
|v_input_3|200|Trailing Stop|
|v_input_4|false|Trailing Stop Offset|
|v_input_5|0500-1600|My Defined Hours|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("HL2 - 22 Cross", overlay=true)

// Stops and Profit inputs
inpTakeProfit   = input(defval = 300, title = "Take Profit", minval = 0)
inpStopLoss     = input(defval = 200, title = "Stop Loss", minval = 0)
inpTrailStop    = input(defval = 200, title = "Trailing Stop", minval = 0)
inpTrailOffset  = input(defval = 0, title = "Trailing Stop Offset", minval = 0)

// Stops and Profit Targets
useTakeProfit   = inpTakeProfit  >= 1 ? inpTakeProfit  : na
useStopLoss     = inpStopLoss    >= 1 ? inpStopLoss    : na
useTrailStop    = inpTrailStop   >= 1 ? inpTrailStop   : na
useTrailOffset  = inpTrailOffset >= 1 ? inpTrailOffset : na

//Specific Time to Trade
myspecifictradingtimes = input('0500-1600',  title="My Defined Hours")

longCondition1 = crossover(close, ema(hl2, 22))
longCondition2 = time(timeframe.period, myspecifictradingtimes) != 0
if longCondition1 and longCondition2
    strategy.entry("Long", strategy.long, comment="LongEntry")

shortCondition1 = crossunder(close, ema(hl2, 22))
shortCondition2 = time(timeframe.period, myspecifictradingtimes) != 0
if shortCondition1 and shortCondition2
    strategy.entry("Short", strategy.short, comment="ShortEntry")

strategy.exit("Exit Long", from_entry = "Long", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
strategy.exit("Exit Short", from_entry = "Short", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
```

> Detail

https://www.fmz.com/strategy/442410

> Last Modified

2024-02-21 16:36:00
