
> Name

一目均衡趋势跟踪策略Ichimoku-Balance-Line-trend-following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12061c1835c13a6fb97.png)

[trans]


### 概述

一目均衡策略是一种趋势跟踪策略,它结合了Ichimoku云图指标的 Conversion线和Base线,以及移动平均线EMA来判断趋势方向,根据价格突破的信号入场。当Conversion线上穿Base线且价格高于200日EMA时做多;当Conversion线下穿Base线时平仓。该策略融合多个指标判断趋势方向,可以有效跟踪趋势,获得超额收益。

### 策略原理

该策略主要使用以下指标:

1. Conversion线:Donchian通道的中间值,代表价格的最短期趋势,相当于9日移动平均线。

2. Base线:Donchian通道的中间值,代表价格的中期趋势,相当于26日移动平均线。 

3. Lagging Span:关闭价格的移位平均线,移位周期为120日,用来判断支撑阻力。

4. Lead 1:Conversion线和Base线的平均值,代表价格的长期趋势。

5. Lead 2:120日Donchian通道的中间值,代表价格的最长期趋势。

6. EMA200: 200日的指数移动平均线,判断大趋势方向。

当Conversion线上穿Base线时,表示短期均线上穿长期均线,属于金叉信号,说明价格趋势开始变强,可以做多。此时如果价格还高于200日EMA,则说明处于长线多头行情,做多信号更加可靠。

当Conversion线下穿Base线时,属于死叉信号,说明价格趋势开始转弱,应平仓止损。

综合多个均线的交叉信号,可以有效判断价格趋势转折点,实现趋势跟踪。同时结合长线均线过滤,可以避免因短期市场震荡而出现的错误信号。

### 优势分析

1. 使用多重均线判定趋势方向,提高判断准确性。Conversion线和Base线的交叉为核心交易信号,Lead 1和Lead 2的多空排列用来验证信号的可靠性。

2. Lagging Span可用于确认支撑阻力位,进一步提升入场的时机。

3. 运用EMA200判断大趋势方向,避免因短期调整而错误交易。只有大趋势向上时,才考虑做多信号。

4. 通过参数优化,转换线和基准线的周期组合可以把握不同周期的趋势转换点。

5. 策略思路清晰易于理解,容易实盘复现。

### 风险分析

1. Conversion线和Base线交叉时,要关注Lead 1和Lead 2的排列以确认信号。如果排列顺序异常,可能是假突破,此时应避免交易。

2. 必须结合更长周期指标如EMA200来判断大趋势,如果大趋势向下,即使出现做多信号也要规避。

3. 该策略更依赖趋势,在震荡行情中容易产生错误信号导致止损。应结合波动率等指标来控制风险。

4. 参数设置需要测试优化,如果参数设定不当,转换线和基准线会过于灵敏或迟钝,导致漏单或错单。

### 优化方向 

1. 可以测试添加其他均线指标,如EMA 50、EMA 100等来辅助判断趋势。

2. 可以结合交易量指标来确认趋势转折点,避免无效突破。例如突破时要求交易量放大。

3. 可以结合波动率指标如ATR来动态调整止损位和盈利目标。在波动率扩大时,适当放宽止损;波动率缩小时,可以收紧止损以锁定利润。

4. 可以基于历史数据回测优化转换线和基准线的参数组合,以获得更稳定的交易信号。

5. 可以建立仓位管理策略,在大趋势向上时加大做多仓位,在震荡行情中减小仓位。

### 总结

一目均衡策略通过多重均线指标判断趋势方向,在趋势转换点入场,然后顺势而为,有效把握中长线趋势。相比单一指标,该策略可以过滤伪信号,提高入场的准确性。但仍需要优化参数,并辅以其他指标来确保信号的可靠性,控制风险。如果参数设置合理,交易频次不会过高,可以长时间持有趋势波段,实现超额收益。

||


### Overview

The Ichimoku Balance Line strategy is a trend following strategy that combines the Conversion Line and Base Line from the Ichimoku Cloud indicator and the moving average EMA to determine the trend direction. It enters long positions when the Conversion Line crosses above the Base Line and the price is above the 200-day EMA; closes positions when the Conversion Line crosses below the Base Line. This strategy incorporates multiple indicators to determine the trend direction, which allows effectively following the trend and achieving excess returns.

### Strategy Logic

The strategy primarily uses the following indicators:

1. Conversion Line: The midpoint of the Donchian Channel, representing the shortest-term trend of the price, similar to a 9-day moving average.

2. Base Line: The midpoint of the Donchian Channel, representing the medium-term trend of the price, similar to a 26-day moving average.

3. Lagging Span: The displaced moving average of the closing price, displacement period is 120 days, used to determine support and resistance.

4. Lead 1: The average of the Conversion Line and the Base Line, representing the long-term trend. 

5. Lead 2: The midpoint of the 120-day Donchian Channel, representing the longest-term trend.

6. EMA200: The 200-day exponential moving average judging the major trend direction.

When the Conversion Line crosses above the Base Line, it signals the short-term moving average is crossing above the long-term moving average, which is a bullish golden cross signal indicating the trend is strengthening for going long. If the price is also above the 200-day EMA, it indicates the major trend is upward, making the long signal more reliable.

When the Conversion Line crosses below the Base Line, it is a death cross signal indicating the trend is turning weak, and positions should be closed for stop loss.

By combining crossover signals of multiple moving averages, the strategy can effectively determine trend reversal points for trend following. Using the long-term moving average filter avoids incorrect signals caused by short-term market fluctuations.

### Advantage Analysis 

1. Using multiple moving averages to determine the trend direction improves accuracy. The Conversion and Base Line crossovers are the core trading signals, while the alignment of Lead 1 and 2 validates the reliability of the signals.

2. The Lagging Span can be used to confirm support and resistance levels, further improving entry timing.

3. Applying the EMA200 to gauge the major trend avoids incorrect trades due to short-term corrections. Only long signals are considered in a major uptrend.

4. The periods of the Conversion and Base Lines can be optimized to capture trend reversal points across different timeframes.

5. The strategy logic is straightforward and easy to implement for live trading.

### Risk Analysis

1. When the Conversion and Base Lines cross, watch for the alignment of Lead 1 and 2 to confirm the signal. If the alignment is anomalous, it may be a false breakout, in which case trades should be avoided.

2. Longer-term indicators like the EMA200 must be incorporated to determine the major trend. Long signals should be avoided if the major trend is down.

3. The strategy relies more on trends, so can generate incorrect signals and stop loss in ranging markets. Volatility measures should be added to control risk.

4. Parameter tuning through backtesting optimization is needed to avoid oversensitive or lagging signals from improper Conversion and Base Line periods. 

5. Optimization is needed on the number of moving average periods used. Too many may lead to excessive curve fitting.

### Enhancement Opportunities

1. Other moving averages like the EMA 50 and EMA 100 can be tested to corroborate the trend.

2. Volume indicators should confirm trend reversal points and avoid false breakouts. For example, require rising volume on breakouts.

3. Volatility measures like ATR can be used to dynamically adjust stop loss and take profit levels. Widen stops and targets when volatility expands, and tighten them to lock in profits when volatility contracts.

4. Backtest to find the optimal parameter combinations for the Conversion and Base Line periods for more consistent signals. 

5. Build a position sizing rule to increase long exposure in uptrends and decrease exposure in choppy conditions.

### Summary

The Ichimoku Balance Line strategy captures mid- to long-term trends by entering on trend reversal signals from multiple moving average crossovers. Compared to single indicator strategies, it can filter out false signals and improve entry accuracy. But parameters need to be optimized, and additional indicators incorporated to ensure reliable signals and manage risk. With well-tuned settings, trade frequency should not be too high, allowing riding long swings for excess returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Conversion Line Periods|
|v_input_2|60|Base Line Periods|
|v_input_3|120|Lagging Span 2 Periods|
|v_input_4|30|Displacement|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-18 00:00:00
end: 2023-10-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="TK Cross > EMA200 Strat", shorttitle="TK Cross > EMA200 Strat", overlay=true)

ema200 = ema(close, 200)
conversionPeriods = input(20, minval=1, title="Conversion Line Periods"),
basePeriods = input(60, minval=1, title="Base Line Periods")
laggingSpan2Periods = input(120, minval=1, title="Lagging Span 2 Periods"),
displacement = input(30, minval=1, title="Displacement")

donchian(len) => avg(lowest(len), highest(len))

conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)

plot(conversionLine, color=#0496ff, title="Conversion Line", linewidth=4)
plot(baseLine, color=#991515, title="Base Line", linewidth=4)
plot(close, offset = -displacement, color=#459915, title="Lagging Span")

p1 = plot(leadLine1, offset = displacement, color=green,
 title="Lead 1")
p2 = plot(leadLine2, offset = displacement, color=red, 
 title="Lead 2")
fill(p1, p2, color = leadLine1 > leadLine2 ? green : red)

plot(ema200, color=purple, linewidth=4)
strategy.initial_capital = 50000
strategy.entry('tkcross', strategy.long, strategy.initial_capital / close, when=conversionLine>baseLine and close > ema200)
strategy.close('tkcross', when=conversionLine<baseLine)

```

> Detail

https://www.fmz.com/strategy/430142

> Last Modified

2023-10-25 14:32:23
