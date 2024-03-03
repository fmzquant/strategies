
> Name

RSI和MACD结合支撑阻力的量化交易策略Quantitative-Trading-Strategy-Combining-RSI-MACD-and-Support-Resistance

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12931d843ccc4cfa6d0.png)

[trans]

## 概述

该策略基于RSI和MACD指标,结合支撑阻力面进行交易信号判断。其名称为“熊猫吐舌头”策略。该策略通过RSI指标判断超买超卖,MACD指标判断多空趋势,并结合100周期内的最高价和最低价绘制出支撑阻力面,在支撑附近产生买入信号,在阻力附近产生卖出信号,属于常见的趋势追踪型策略。

## 策略原理

该策略主要基于RSI和MACD两个指标,RSI指标判断超买超卖状态,MACD指标判断多空趋势状态。首先计算14周期的RSI值,并指定超买线为70,超卖线为30。然后计算12日快线,26日慢线的MACD值,以及9日信号线。在RSI低于30时视为超卖;RSI高于70时视为超买。MACD快慢线金叉时为买入信号,死叉时为卖出信号。

此外,该策略还计算了100周期内的最高价和最低价,作为支撑阻力位。在产生买入信号时,需要价格接近支撑位,即收盘价高出支撑位1%内时才会实际发出买入;在卖出信号产生时也需要收盘价低于阻力位1%内才会实际发出卖出信号。

## 策略优势

该策略结合了趋势分析和超买超卖判断,避免了只依赖单一指标而引起的假信号。同时引入支撑阻力位作为滤波,可以减少常见支撑阻力位置上的反弹造成的错误交易。MACD快慢线结合RSI指标,可以比较准确地判断价格走势和超买超卖状态。相比简单的移动平均线策略,该策略可以更加灵活地捕捉价格的长期趋势。

## 策略风险

该策略主要存在以下几种风险:

1)强势行情中,策略可能会漏掉大部分利润,因为它倾向于在反转周期结束后才进场;

2)RSI和MACD参数设置不当可能导致交易信号错误;

3)支撑阻力检测算法简单,可能高估或低估真实支撑阻力位;

4)止损机制缺失。极端行情中,无法有效控制损失。

针对这些风险,可通过引入自适应MACD,优化RSI参数,使其更贴近不同品种的特点;改进支撑阻力判断算法,增加市场modeling判断等方式进行优化。

## 策略优化方向 

该策略可以从以下几个维度进行优化:

1)引入止损机制,比如画布AMO指标结合移动止损

2)使用自适应MACD,让MACD参数实时优化

3)引入市场分型判断,确定更科学支撑阻力位

4)结合更多数据,建立市场状态判断,不同状态使用不同参数

5)使用机器学习算法对策略进行端对端优化

通过这些改进,可以进一步降低回撤,提高策略稳定性。

## 总结

本策略综合运用RSI和MACD指标判断超买超卖状态,在支撑和阻力附近进行交易,属于体现较好的趋势跟踪策略。同时结合支撑阻力判断减少风险。该策略的优势是策略信号稳定,风险可控,适合中长期持有。但部分参数如指标参数、支撑阻力范围等仍可进一步优化,提高盈利水平。总体来说,该策略对于跟踪行情趋势具有很好的表现,属于易于实施且风险可控的量化策略。

||

## Overview

This strategy is based on the RSI and MACD indicators, combined with support/resistance levels for trade signal judgment. Its name is "Panda Sticking Out Tongue" strategy. The strategy uses the RSI indicator to determine overbought/oversold levels, the MACD indicator to determine bullish/bearish trends, and draws support/resistance levels based on the highest and lowest prices over the past 100 periods, generating buy signals near support and sell signals near resistance. It belongs to a common trend-following strategy.  

## Strategy Logic

The strategy mainly relies on two indicators - RSI and MACD. The RSI indicator judges overbought/oversold statuses, while the MACD indicator determines bullish/bearish trend statuses. It first calculates the 14-period RSI value, and sets the overbought threshold as 70 and oversold threshold as 30. Then it calculates the MACD value based on 12-day fast line, 26-day slow line, and 9-day signal line. RSI below 30 is considered oversold; RSI above 70 is considered overbought. MACD golden cross is the buy signal while death cross is the sell signal.   

In addition, the strategy also calculates the highest and lowest prices over the past 100 periods as the support/resistance levels. When a buy signal is triggered, the price needs to be close to the support level, i.e. within 1% of the support level, to actually issue a buy order. Similarly when a sell signal is triggered, the price needs to be within 1% below the resistance level to actually issue a sell order.  

## Advantages of the Strategy

The strategy combines trend analysis and overbought/oversold level detection to avoid false signals relying on single indicator only. By introducing support/resistance filter, it can reduce wrong trades due to rebounds near key S/R levels. The combination of MACD and RSI can accurately identify price movements and OB/OS statuses. Compared to simple Moving Average strategies, this strategy can capture long-term price trends more flexibly.  

## Risks of the Strategy

The main risks of this strategy includes:  

1) It may miss most profits in strong trends, as it tends to enter after reversal finishes.  

2) Inappropriate RSI and MACD parameter settings may cause wrong signals.   

3) Simple S/R detection logic may overestimate or underestimate actual S/R zones.  

4) Lack of stop loss mechanism. Unable to effectively control losses in extreme market conditions.

To address these risks, methods like adaptive MACD, optimized RSI parameters tuning, improved S/R identification, market regime modeling etc. can be used to improve the strategy.  

## Directions for Enhancement

The strategy can be enhanced from the following dimensions:  

1) Introduce stop loss mechanisms e.g. CANVAS stop loss 

2) Use adaptive MACD for dynamic parameter tuning  

3) Introduce price pattern recognition for more scientific S/R identification   

4) Incorporate more data to establish market state detection logic for using different parameters adaptively  

5) Use machine learning algorithms to optimize the strategy end-to-end

Through these improvements, we can further reduce drawdown and improve stability of the strategy.

## Conclusion
The strategy integrates RSI and MACD indicators to determine OB/OS statuses, and trade around support/resistance levels, representing a trend-following approach. By incorporating support/resistance filter, the risk is reduced. The advantage lies in stable signals and controllable risk suitable for long-term holding. Still some components e.g. indicator parameters, S/R range can be further tuned to improve profitability. Overall it shows good performance in following market trends with easy implementation and risk control.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|70|RSI Overbought Threshold|
|v_input_2|30|RSI Oversold Threshold|
|v_input_3|12|MACD Fast Length|
|v_input_4|26|MACD Slow Length|
|v_input_5|9|MACD Signal Smoothing|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-28 00:00:00
end: 2024-01-04 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("RSI + MACD with Support and Resistance", shorttitle="RSI_MACD_SR", overlay=true)

// Input for RSI and MACD values
rsiOverbought = input(70, title="RSI Overbought Threshold")
rsiOversold = input(30, title="RSI Oversold Threshold")
macdFastLength = input(12, title="MACD Fast Length")
macdSlowLength = input(26, title="MACD Slow Length")
macdSignalSmoothing = input(9, title="MACD Signal Smoothing")

// Calculating RSI and MACD
rsiValue = ta.rsi(close, 14)
[macdLine, signalLine, _] = ta.macd(close, macdFastLength, macdSlowLength, macdSignalSmoothing)

// Support and Resistance
support = ta.lowest(100)
resistance = ta.highest(100)

// Drawing support and resistance lines
// line.new(x1=bar_index[0], y1=support, x2=bar_index[-1], y2=support, color=color.green, width=1)
// line.new(x1=bar_index[0], y1=resistance, x2=bar_index[-1], y2=resistance, color=color.red, width=1)

// Buy Condition: If RSI is oversold and MACD line crosses above the signal line
// Additionally, check if price is near the support line
longCondition = ta.crossover(macdLine, signalLine) and rsiValue < rsiOversold and (close - support) < (close * 0.01)
strategy.entry("Long", strategy.long, when=longCondition, comment="Buy")

// Sell Condition: If RSI is overbought and MACD line crosses below the signal line
// Additionally, check if price is near the resistance line
shortCondition = ta.crossunder(macdLine, signalLine) and rsiValue > rsiOverbought and (resistance - close) < (close * 0.01)
strategy.entry("Short", strategy.short, when=shortCondition, comment="Sell")

// Plot values on the chart for visualization
plotshape(series=longCondition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="Buy")
plotshape(series=shortCondition, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="Sell")
```

> Detail

https://www.fmz.com/strategy/437801

> Last Modified

2024-01-05 16:24:58
