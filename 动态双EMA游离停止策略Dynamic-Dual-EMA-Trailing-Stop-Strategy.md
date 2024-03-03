
> Name

动态双EMA游离停止策略Dynamic-Dual-EMA-Trailing-Stop-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/491cae7fee727a0b05.png)
[trans]
### 概述

本策略旨在利用指数移动平均线和基于Chande动态汇聚散度平均真实范围的游离停止来发现潜在的趋势反转或延续。该策略结合多个指标判断入场时机,并设定基于市场波动性的止损和止盈水平,力求在发现新趋势的同时控制风险。

### 策略原理   

本策略使用60周期和90周期的双EMA判断趋势方向。当短周期EMA上穿长周期EMA时为看涨信号。同时,MACD的快线上穿慢线也可确认看涨。入场时要求价格高于之前计算出的CDC游离停止位。

策略出场规则为:价格触碰基于ATR的止盈位或下破CDC游离止损位时平仓。

### 优势分析

该策略结合双EMA判断主趋势方向和MACD确认入场时机,避免了假突破。游离停止位和止盈位都基于市场的波动性计算,能够很好地管理风险。无论趋势反转还是延续,该策略都能及时抓住机会。

另外,该策略输入参数可自定义,用户可根据需要调整EMA周期、ATR周期和CDC系数等,使策略更贴合自己的交易方式。

### 风险分析  

本策略最大的风险在于趋势判断出错。当市场处于盘整时,EMA容易发出错误信号。这时,MACD指标的确认作用尤为重要。此外,应适当调大CDC止损系数来应对突发事件导致的大幅跳空。

### 优化方向  

1. 测试调整EMA周期参数,寻找最佳参数组合
2. 测试不同的CDC止损系数大小
3. 尝试结合其他指标过滤入场时机  
4. 增加对突发事件的处理机制

### 总结  

本策略充分利用了趋势判断和波动性指标的优势,能够识别出标的证券中的潜在机会。通过参数优化和机制改进,该策略有望进一步增强稳定性和获利能力。它为量化交易者提供了一个可靠、可扩展的策略框架。

||

### Overview  

This strategy aims to exploit potential trend reversals or continuations using Exponential Moving Averages (EMAs) and a trailing stop based on the Chande Dynamic Convergence Divergence (CDC) Average True Range method. The strategy combines multiple indicators to determine entry timing and sets stop loss and take profit levels based on market volatility to control risk while capturing new trends.

### Strategy Logic  

This strategy uses 60-period and 90-period dual EMAs to determine trend direction. A crossover where the shorter period EMA moves above the longer period EMA gives a bullish signal. At the same time, a MACD line crossover above its signal line can confirm the bullish view. Entry requires the price to be above the previously calculated CDC trailing stop level.

The exit rules are: close the position when price hits the ATR-based take profit level or falls below the CDC trailing stop loss level.

### Advantage Analysis

This strategy combines dual EMAs to judge the main trend direction and MACD to confirm entry timing, avoiding false breakouts. Both the trailing stop and profit target levels are calculated based on market volatility for effective risk management. Whether a trend reverses or continues, this strategy can seize opportunities in a timely manner.

In addition, the input parameters of this strategy are customizable. Users can adjust the EMA periods, ATR period and CDC multiplier according to their own trading style.

### Risk Analysis  

The biggest risk of this strategy is incorrect trend judgment. When the market is consolidating, EMAs can easily give wrong signals. At this time, MACD’s confirmation role is especially important. In addition, appropriately increasing the CDC stop loss multiplier is needed to deal with large price gaps caused by sudden events.

### Optimization Directions

1. Test different combinations of EMA period parameters to find the optimal setting  
2. Test different CDC stop loss multiplier sizes
3. Try incorporating other indicators to filter entry timing
4. Add mechanisms to handle sudden market events  

### Summary   

This strategy makes good use of the advantages of trend and volatility indicators to identify potential opportunities in securities. Through parameter optimization and mechanism improvements, this strategy has the potential to further enhance stability and profitability. It provides quantitative traders with a reliable and scalable strategic framework.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|60|EMA 60 Period|
|v_input_2|90|EMA 90 Period|
|v_input_3|24|CDC ATR Period|
|v_input_4|4|CDC Multiplier|
|v_input_5|2|Profit Target Multiplier (ATR)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-17 00:00:00
end: 2024-01-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Improved EMA & CDC Trailing Stop Strategy", overlay=true)

// Define the inputs
ema60Period = input(60, title="EMA 60 Period")
ema90Period = input(90, title="EMA 90 Period")
atrPeriod = input(24, title="CDC ATR Period")
multiplier = input(4.0, title="CDC Multiplier")
profitTargetMultiplier = input(2.0, title="Profit Target Multiplier (ATR)")

// Calculate EMAs
ema60 = ta.ema(close, ema60Period)
ema90 = ta.ema(close, ema90Period)

// Calculate ATR 
atr = ta.atr(atrPeriod)

// MACD calculation
[macdLine, signalLine, _] = ta.macd(close, 12, 26, 9)

// Define the trailing stop and profit target
longStop = close - multiplier * atr
shortStop = close + multiplier * atr
longProfitTarget = close + profitTargetMultiplier * atr
shortProfitTarget = close - profitTargetMultiplier * atr

// Entry conditions
longCondition = close > ema60 and ema60 > ema90 and macdLine > signalLine and close > longStop
shortCondition = close < ema60 and ema60 < ema90 and macdLine < signalLine and close < shortStop

// Exit conditions based on profit target
longProfitCondition = close >= longProfitTarget
shortProfitCondition = close <= shortProfitTarget

// Plot the EMAs, Stops, and MACD for visualization
plot(ema60, color=color.blue, title="60 EMA")
plot(ema90, color=color.red, title="90 EMA")
plot(longStop, color=color.green, title="Long Stop", style=plot.style_linebr)
plot(shortStop, color=color.red, title="Short Stop", style=plot.style_linebr)
hline(0, "Zero Line", color=color.gray)
plot(macdLine - signalLine, color=color.blue, title="MACD Histogram")

// Strategy execution using conditional blocks
if longCondition
    strategy.entry("Long", strategy.long)
if shortCondition
    strategy.entry("Short", strategy.short)

// Exit based on profit target and trailing stop
if longProfitCondition or close < longStop
    strategy.close("Long")
if shortProfitCondition or close > shortStop
    strategy.close("Short")


```

> Detail

https://www.fmz.com/strategy/439875

> Last Modified

2024-01-24 15:13:07
