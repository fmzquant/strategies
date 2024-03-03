
> Name

基于市场真势波动的云图交叉策略Cloud-Crossover-Strategy-Based-on-Market-Momentum

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略的主要思想是利用云图的延迟穿越线技术判断市场的真实趋势,实现低风险交易。当延迟穿越线上穿基准线时做多,下穿时做空。

## 策略原理  

该策略通过计算转换线、基准线、延迟穿越线等指标判断市场趋势。

转换线是过去9天的中价线,反映最近9天的平均价位。基准线是过去26天的中价线,反映较长期的平均价位。延迟穿越线是价格延迟26天后的关闭价。

当短期平均价转换线上穿长期平均价基准线时,表示短期价位突破长期价位,属于多头信号。当延迟穿越线也上穿基准线时,验证了多头趋势,这个买入信号强度更大。

当短期平均价转换线下穿长期平均价基准线时,表示短期价位跌破长期价位,属于空头信号。当延迟穿越线也下穿基准线时,验证了空头趋势,这个卖出信号强度更大。

通过计算这些指标并观察其交叉情况,可以判断未来趋势方向。当延迟穿越线上穿基准线时做多,下穿时做空,可以利用云图判断市场真势,过滤掉部分假突破做反向操作。

## 策略优势

1. 延迟穿越线有去噪作用,可以过滤许多假突破。

2. 结合短期和长期均线,实现多空切换。

3. 入场时机精准,回撤小。

4. 容易掌握,适合初学者。

5. 可在不同品种和周期上广泛应用。

## 策略风险

1. 延迟穿越线滞后于价格变化,可能错过部分机会。

2. 长短周期指标发散时会产生错误信号。

3. 震荡行情中容易被套。

4. 参数优化不当会影响效果。

需要优化参数组合,配合止损来控制风险。可以考虑加入其他指标过滤信号。

## 优化方向

1. 优化转换线、基准线等均线参数,提高策略稳定性。

2. 增加容差设置,避免频繁交易。 

3. 结合波动率、成交量等指标进行过滤,确保交易顺势而为。

4. 根据品种特性和交易者风险偏好调整持仓规模。

5. 大周期进行趋势判断,小周期进行具体入场。

## 总结

该策略利用云图的延迟穿越线技术判断市场真势,实现低风险交易。策略简单易懂,容易掌握。但也存在一定风险,需要针对性优化。通过参数调整、止损规避、信号过滤等手段可以进一步提高策略效果。总体来说,该策略为初学者提供了一个有效的交易工具。

|| 

## Overview

The core idea of this strategy is to determine the real trend of the market using the delayed crossover line of the Ichimoku Cloud for low-risk trading. Go long when the delayed crossover line crosses above the baseline, and go short when it crosses below.

## Strategy Logic

This strategy calculates conversion line, baseline, delayed crossover line and other indicators to determine market trend. 

The conversion line is the mid-price of the past 9 days, reflecting the recent 9-day average price. The baseline is the mid-price of the past 26 days, reflecting the longer term average price. The delayed crossover line is the closing price delayed by 26 days.

When the short-term average price conversion line crosses above the long-term average price baseline, it indicates the short-term price breaks through the long-term price, which is a bullish signal. When the delayed crossover line also crosses above the baseline, it validates the bullish trend and this long signal is stronger.

When the short-term average price conversion line crosses below the long-term average price baseline, it indicates the short-term price falls through the long-term price, which is a bearish signal. When the delayed crossover line also crosses below the baseline, it validates the bearish trend and this short signal is stronger. 

By calculating these indicators and observing their crossover, we can determine the future trend direction. Go long when the delayed crossover line crosses above the baseline, and go short when it crosses below. This uses the Ichimoku Cloud to determine the real market momentum and filter out some false breakouts for reverse operations.

## Advantages of the Strategy

1. The delayed crossover line filters out many false breakouts.

2. Combining short-term and long-term moving averages enables switching between long and short.

3. Precise entry timing with small drawdowns. 

4. Easy to understand, suitable for beginners.

5. Can be widely applied across different products and timeframes.

## Risks of the Strategy

1. The delayed crossover line lags price changes and may miss some opportunities.

2. Divergence between long and short cycles may generate false signals. 

3. Prone to being trapped in range-bound markets.

4. Improper parameter optimization affects performance.

Risk management by stop loss and parameter optimization is needed. Other indicators may be added to filter signals.

## Optimization Directions 

1. Optimize moving average parameters like conversion and baseline to improve stability.

2. Introduce tolerance to avoid excessive trading.

3. Add volatility, volume and other filters to ensure trading with the trend.

4. Adjust position sizing based on product character and risk preference.

5. Use higher timeframe for trend analysis and lower timeframe for entries.

## Conclusion

This strategy uses the delayed crossover line of the Ichimoku Cloud to determine market momentum for low-risk trading. The strategy is simple and easy to understand. But it also has some risks, requiring custom optimization. Further improvements can be made through parameter tuning, risk management, signal filtering etc. Overall, it provides an effective trading tool for beginners.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Conversion Line Periods|
|v_input_2|26|Base Line Periods|
|v_input_3|52|Lagging Span 2 Periods|
|v_input_4|26|Displacement|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-25 00:00:00
end: 2023-09-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="Chikou Crossover", shorttitle="Chikou", overlay=true)

conversionPeriods = input(9, minval=1, title="Conversion Line Periods"),
basePeriods = input(26, minval=1, title="Base Line Periods")
laggingSpan2Periods = input(52, minval=1, title="Lagging Span 2 Periods"),
displacement = input(26, minval=1, title="Displacement")

donchian(len) => avg(lowest(len), highest(len))

conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)

plot(conversionLine, color=#0496ff, title="Conversion Line")
plot(baseLine, color=#991515, title="Base Line")
plot(close, offset = -displacement, color=#459915, title="Lagging Span")

p1 = plot(leadLine1, offset = displacement, color=green,
 title="Lead 1")
p2 = plot(leadLine2, offset = displacement, color=red, 
 title="Lead 2")
fill(p1, p2, color = leadLine1 > leadLine2 ? green : red)

if (crossover(baseLine, close[26]))
    strategy.entry("ChikouLE", strategy.long, comment="ChikouLE")

if (crossunder(baseLine, close[26]))
    strategy.entry("ChikouSE", strategy.short, comment="ChikouSE")

// plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)

```

> Detail

https://www.fmz.com/strategy/427806

> Last Modified

2023-09-25 17:28:29
