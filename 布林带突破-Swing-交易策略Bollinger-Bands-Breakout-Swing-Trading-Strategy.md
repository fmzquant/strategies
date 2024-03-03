
> Name

布林带突破-Swing-交易策略Bollinger-Bands-Breakout-Swing-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/104389330b1fd3a57a4.png)
[trans]

### 概述

该策略是一种基于布林带的突破交易策略。它使用布林带的上沿和中线,实现 Swing 交易。具体来说,它在价格突破布林带上轨时做多,在价格跌破布林带中线时平仓。这是一个典型的趋势跟踪策略。

### 策略原理  

1. 计算 20 日的布林带,包含上轨、中线和下轨
2. 当收盘价大于上轨时,做多
3. 当收盘价低于中线时,平仓

以上就是该策略的主要交易逻辑。它简单有效,能够捕捉较强的趋势行情。  

### 优势分析

这种布林带 Swing 策略主要有以下优势:

1. 操作简单,容易实施。
2. 能够有效跟踪较强趋势,持仓时间不会太长。
3. 利用布林带这个指标本身的优势,有一定的概率优势。

总的来说,这是一种表现相对较好的趋势策略,简单实用,容易把控。

### 风险及解决 

这种策略也存在一些风险,主要包括:  

1. 布林带指标本身对市场震荡有一定敏感性,可能造成频繁的打开和平仓。可以适当调整参数或增加过滤条件来避免。
2. 无法有效处理盘整行情,这期间可能出现损失或频繁小额交易。可以考虑在这种行情使用其他策略。

此外,也可以结合更多过滤指标或优化止损策略来控制风险。

### 优化方向  

该策略可以从以下几个方向进行优化:

1. 优化布林带参数,适应更广泛的市场情况。
2. 增加额外指标判断,提高决策准确性。例如 KDJ、MACD 等。  
3. 优化止损策略,设置合理止损点,控制单笔亏损。
4. 优化仓位管理,不同市况采用不同的交易仓位。

通过系统的测试和优化,可以持续改进该策略,提高盈利效果。

### 总结  

该布林带 Swing 策略整体来说非常实用。它操作简单,容易实现趋势跟踪。同时也存在一些需要注意的风险,可以通过参数调整和优化来解决。这是一个值得推荐的量化策略。


|| 

### Overview

This is a breakout trading strategy based on Bollinger Bands. It uses the upper band and middle line of Bollinger Bands to implement swing trading. Specifically, it goes long when the price breaks above the upper band and closes position when the price falls below the middle line. This is a typical trend following strategy.  

### Strategy Logic   

1. Calculate 20-day Bollinger Bands, including upper band, middle line and lower band
2. When close price is above the upper band, go long
3. When close price is below the middle line, close position

The above is the main trading logic of this strategy. It is simple and effective to capture relatively strong trending moves.

### Advantage Analysis

The main advantages of this Bollinger Bands swing strategy are:  

1. Simple to implement and easy to execute.  
2. Can effectively track relatively strong trends without holding position for too long.
3. Utilize the inherent advantage of Bollinger Bands indicator itself for better probability.

In general, this is a relatively well-performed trend following strategy that is simple, practical and easy to control.  

### Risks and Solutions   

There are also some risks with this strategy:   

1. Bollinger Bands itself is sensitive to market fluctuation, may cause frequent opening and closing of positions. This can be avoided by adjusting parameters or adding filters.  
2. Ineffective in range-bound markets, may lead to losses or frequent small trades. Consider using other strategies in such markets.  

Also possible to control risks by combining more filter indicators or optimizing stop loss strategies.

### Optimization Directions   

The strategy can be optimized from the following aspects:

1. Optimize Bollinger Bands parameters to adapt to more market conditions.  
2. Add additional indicators for better decision accuracy, e.g. KDJ, MACD etc.
3. Optimize stop loss strategy, set reasonable stop loss points to control single trade loss.  
4. Optimize position sizing, use different sizes for different market conditions.  

Continuous improvement of the strategy can be done through systematic testing and optimization for better profitability.  

### Summary   

Overall this Bollinger Bands swing trading strategy is very practical. It has simple operation for easy trend following. There are also some risks to note, which can be addressed through parameter tuning and optimization. This is a recommended quantitative strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Bollinger Band Length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|2|Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-02 00:00:00
end: 2024-01-02 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Bollinger Bands Breakout Strategy", overlay=true)

// Bollinger Band Einstellungen
length = input(20, title="Bollinger Band Length")
src = input(close, title="Source")
mult = input(2.0, title="Multiplier")

basis = ta.sma(src, length)
upper_band = basis + mult * ta.stdev(src, length)
lower_band = basis - mult * ta.stdev(src, length)

// Bedingung für den oberen Ausbruch
upper_breakout_condition = close > upper_band

// Bedingung für den Rückgang unter das mittlere Band
below_middle_band_condition = close < basis

// Plot der Bollinger Bänder
plot(upper_band, color=color.blue, title="Upper Bollinger Band")
plot(basis, color=color.purple, title="Middle Bollinger Band")
plot(lower_band, color=color.blue, title="Lower Bollinger Band")

// Kaufregel
if (upper_breakout_condition)
    strategy.entry("Buy", strategy.long)

// Verkaufsregel
if (below_middle_band_condition)
    strategy.close("Buy")

```

> Detail

https://www.fmz.com/strategy/437550

> Last Modified

2024-01-03 16:40:38
