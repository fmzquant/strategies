
> Name

四均线跨度趋势追踪策略Four-WMA-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10e013284055eb0dae5.png)
[trans]

## 概述

四均线跨度趋势追踪策略是一种同时利用四条不同周期的加权移动平均线(WMA)来识别股票价格趋势,在趋势发生反转时建立多头或空头头寸的量化交易策略。该策略同时设置了止损和止盈机制来控制风险。

## 策略原理

该策略使用四条WMA线,其中两条较长周期的WMA(longM1和longM2)用于识别多头趋势和做多信号,而另外两条较短周期的WMA(shortM1和shortM2)则用于识别空头趋势和做空信号。具体交易规则如下:

1. 当短周期WMA从上往下跨越长周期WMA时,产生做多信号,建立多头头寸;
2. 当短周期WMA从下往上跨越长周期WMA时,产生做空信号,建立空头头寸;
3. 按照输入的止盈比例和止损比例设置每个头寸的止盈价位和止损价位;
4. 当价格触及止盈或止损价位时,平掉对应的头寸。

该策略实际上是追踪价格趋势的转折点,在缩短线和加长线发生交叉时建仓,随后利用止盈止损来锁定盈利或控制风险。

## 优势分析

四均线跨度趋势追踪策略具有以下优势:

1. 策略信号来源清晰,由四条均线的交叉来产生,可明确判断行情趋势;
2. 建仓信号较为可靠,同时利用两组均线过滤假信号的概率;  
3. 利用止盈止损机制来管理每个头寸的风险收益比,避免单笔损失过大;
4. 策略参数较少,容易实现和测试。

## 风险分析

四均线跨度趋势追踪策略也存在一些潜在风险:  

1. 该策略对均线指标的依赖性较高,在价格剧烈波动时均线可能产生滞后的错信号;
2. 多空头开仓信号可能出现频繁交替,带来过高的交易频率和手续费负担;
3. 固定百分比的止盈止损设置可能无法适应市场的实时波动。

为降低上述风险,可以考虑结合其他技术指标来确认交易信号,优化开仓和止损标准,或人工干预异常市场的交易。

## 优化方向  

四均线跨度趋势追踪策略可以从以下几个方面进行优化:

1. 测试更多组合的均线参数,找到最佳参数组合;
2. 增加成交量或波动指数等指标来过滤假信号;  
3. 对止盈止损标准设置自适应机制,根据市场波动程度来动态调整;
4. 优化开仓标准,避免出现过于频繁的反向开仓。

## 总结

四均线跨度趋势追踪策略整体来说是一个较为简单直观的跟踪趋势策略。它利用多组均线交叉来识别价格可能的转折点,同时辅以止盈止损机制来锁定利润和控制风险。如果参数设置得当,在较为平稳的股票中该策略可以获得较好的效果。但交易者在使用时也需要注意防范潜在的假信号风险,适当调整策略参数以使其更好地适应实际市场情况。

|| 

## Overview

The Four WMA Trend Tracking strategy is a quantitative trading strategy that utilizes four weighted moving averages (WMA) of different timeframes to identify price trend reversals in stocks and establish long or short positions when those reversals happen. It also implements stop loss and take profit mechanisms to control risks.

## Strategy Logic  

The strategy employs four WMA lines. Two longer period WMAs (longM1 and longM2) are used to identify uptrends and long entry signals, while the other two shorter period WMAs (shortM1 and shortM2) are for identifying downtrends and short entry signals. The specific trading rules are:

1. When the shorter period WMA crosses below the longer period WMA, a long signal is generated and a long position is established.  

2. When the shorter period WMA crosses above the longer period WMA, a short signal is generated and a short position is established.
 
3. Take profit and stop loss levels are set for each position based on the input percentage of the entry price.
 
4. When price reaches either take profit or stop loss level, the corresponding position is closed.  

In essence, this strategy tracks potential turning points of price trends by observing crossover of the contraction and expansion of moving average lines, entering positions on those signals, and then managing risks/profits with stop loss and take profit.

## Advantage Analysis

The Four WMA Trend Tracking Strategy has the following advantages:

1. Clear signal sources from crossover of the four moving averages, which helps determine market trend.  
2. More reliable entry signals as two sets of MAs are used to filter out false signals.   
3. Manage risk/reward on each position with stop loss and take profit. Avoid large losses on single positions.  
4. Simple to implement and test with few parameters.  

## Risk Analysis   

There are also some potential risks of this strategy:

1. High reliance on moving averages which could lag severely during high price volatility.  
2. Whipsaws might happen frequently, incurring high trading frequency and commissions.
3. Fixed percentage stop loss/profit taking may fail to adapt to real-time market fluctuations.  

To mitigate the risks, considerations include combining other indicators to confirm signals, optimizing entry rules and stop loss, or manual intervention during abnormal markets.

## Enhancement Opportunities

Some directions to optimize the strategy:

1. Test more combinations of MA parameters to find the optimal set.  
2. Add volume or volatility indicators to filter false signals.   
3. Build adaptive mechanisms for stop loss/profit taking, based on market volatility.  
4. Refine entry rules to avoid overly frequent reverse entries.   

## Conclusion

In summary, the Four WMA Trend Tracking Strategy is a relatively straightforward trend tracking strategy. It identifies potential turning points with crossover of multiple moving averages and manages trades with stop loss/take profit. When properly configured, it can perform well for stable stocks. However, traders should be aware of potential false signals and fine-tune parameters to suit real market regimes when applying it.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|Long WMA1|
|v_input_int_2|20|Long WMA2|
|v_input_int_3|30|Short WMA1|
|v_input_int_4|40|Short WMA2|
|v_input_float_1|true|Take Profit %|
|v_input_float_2|true|Stop Loss %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-22 00:00:00
end: 2024-02-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@rosedenvy
//@version=5
strategy("Four WMA Strategy with TP and SL", shorttitle="4WMA TP/SL", overlay=true)

// Inputs for WMA lengths
longM1 = input.int(10, title="Long WMA1")
longM2 = input.int(20, title="Long WMA2")
shortM1 = input.int(30, title="Short WMA1")
shortM2 = input.int(40, title="Short WMA2")

// Inputs for TP and SL
tp_percent = input.float(1.0, title="Take Profit %") / 100
sl_percent = input.float(1.0, title="Stop Loss %") / 100

// Calculating WMAs
longWMA1 = ta.wma(close, longM1)
longWMA2 = ta.wma(close, longM2)
shortWMA1 = ta.wma(close, shortM1)
shortWMA2 = ta.wma(close, shortM2)

// Entry Conditions
longCondition = ta.crossunder(longWMA1, longWMA2)
shortCondition = ta.crossunder(shortWMA2, shortWMA1)

// Strategy Entry
if (longCondition)
    strategy.entry("Long", strategy.long, comment = "Long entry")
    strategy.exit("Long TP/SL", "Long", limit=close * (1 + tp_percent), stop=close * (1 - sl_percent), comment = "Long Exit" )

if (shortCondition)
    strategy.entry("Short", strategy.short, comment = "Short entry")
    strategy.exit("Short TP/SL", "Short", limit=close * (1 - tp_percent), stop=close * (1 + sl_percent), comment = "Short Exit")

// Plotting WMAs
plot(longWMA1, color=color.blue)
plot(longWMA2, color=color.orange)
plot(shortWMA1, color=color.red)
plot(shortWMA2, color=color.purple)

```

> Detail

https://www.fmz.com/strategy/442512

> Last Modified

2024-02-22 15:21:46
