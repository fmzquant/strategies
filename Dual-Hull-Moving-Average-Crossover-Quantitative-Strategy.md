
> Name

Dual-Hull-Moving-Average-Crossover-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d5dd2fa8b7a2e5f4d0.png)

[trans]
#### 概述
本策略基于赫尔移动平均线(Hull Moving Average, HMA)的交叉信号进行交易。通过计算快速和慢速两条HMA线,在它们发生交叉时产生交易信号。HMA是一种先进的移动平均线指标,它通过加权移动平均(WMA)的特殊组合来减少滞后性,提供更快速和平滑的市场趋势信号。

#### 策略原理
策略的核心是利用不同周期的HMA交叉来捕捉市场趋势的转换点。HMA的计算过程包括三个步骤:首先计算半周期的WMA,然后计算完整周期的WMA,最后通过这两个WMA的特殊组合再次计算一个周期为原周期平方根的WMA。当快速HMA(默认9周期)向上穿越慢速HMA(默认16周期)时,产生做多信号;当快速HMA向下穿越慢速HMA时,产生做空信号。

#### 策略优势
1. 信号反应迅速:HMA通过特殊的计算方法显著减少了传统移动平均线的滞后性,能更快捕捉到市场趋势的转变。
2. 噪音过滤:通过两条均线的交叉确认,可以有效过滤掉市场噪音,降低虚假信号。
3. 参数灵活:策略允许调整快慢线的周期参数,适应不同市场环境。
4. 可视化清晰:策略在图表上清晰展示两条均线和交易信号,便于分析和优化。

#### 策略风险
1. 震荡市场风险:在横盘震荡行情下,频繁的交叉可能导致过度交易和连续止损。
2. 滞后风险:尽管HMA相对传统均线滞后性更小,但仍存在一定的滞后性,可能错过最佳入场点。
3. 参数敏感性:不同的参数组合可能导致截然不同的交易结果,需要careful的参数优化。
4. 假突破风险:市场可能出现假突破,导致错误的交易信号。

#### 策略优化方向
1. 引入趋势过滤器:可以添加ADX或趋势强度指标,仅在明确趋势时进行交易。
2. 优化止损机制:设计动态止损,如基于ATR或波动率的止损策略。
3. 增加交易确认条件:结合成交量、动量指标等作为辅助确认信号。
4. 参数自适应:开发基于市场波动性的动态参数调整机制。
5. 风险管理优化:添加仓位管理和资金管理模块。

#### 总结
这是一个基于HMA交叉的量化交易策略,通过减少传统移动平均线的滞后性来提供更及时的交易信号。策略设计简洁,易于理解和实现,但在实际应用中需要注意市场环境的适配性和风险管理。通过持续优化和完善,该策略有潜力成为一个稳健的交易系统。 || 

#### Overview
This strategy is based on the crossover signals of Hull Moving Average (HMA). It generates trading signals when two HMA lines with different periods cross each other. HMA is an advanced moving average indicator that reduces lag through a special combination of Weighted Moving Averages (WMA), providing faster and smoother market trend signals.

#### Strategy Principle
The core of the strategy lies in capturing market trend reversal points using HMA crossovers of different periods. The HMA calculation involves three steps: first calculating a half-period WMA, then calculating a full-period WMA, and finally computing another WMA with a period equal to the square root of the original period using a special combination of the first two WMAs. Buy signals are generated when the fast HMA (default 9 periods) crosses above the slow HMA (default 16 periods), and sell signals when the fast HMA crosses below the slow HMA.

#### Strategy Advantages
1. Quick Signal Response: HMA significantly reduces the lag of traditional moving averages through its special calculation method, capturing market trend changes faster.
2. Noise Filtering: The crossover confirmation between two moving averages effectively filters out market noise, reducing false signals.
3. Flexible Parameters: The strategy allows adjustment of fast and slow line periods to adapt to different market environments.
4. Clear Visualization: The strategy clearly displays both moving averages and trading signals on the chart for easy analysis and optimization.

#### Strategy Risks
1. Choppy Market Risk: Frequent crossovers in sideways markets may lead to overtrading and consecutive losses.
2. Lag Risk: Although HMA has less lag than traditional moving averages, some lag still exists, potentially missing optimal entry points.
3. Parameter Sensitivity: Different parameter combinations may lead to significantly different trading results, requiring careful optimization.
4. False Breakout Risk: The market may exhibit false breakouts, leading to incorrect trading signals.

#### Strategy Optimization Directions
1. Introduce Trend Filters: Add ADX or trend strength indicators to trade only in clear trends.
2. Optimize Stop Loss Mechanism: Design dynamic stop losses based on ATR or volatility.
3. Add Trade Confirmation Conditions: Incorporate volume and momentum indicators as auxiliary confirmation signals.
4. Parameter Adaptation: Develop dynamic parameter adjustment mechanisms based on market volatility.
5. Risk Management Optimization: Add position sizing and money management modules.

#### Summary
This is a quantitative trading strategy based on HMA crossovers, providing more timely trading signals by reducing the lag of traditional moving averages. The strategy design is concise, easy to understand and implement, but requires attention to market environment adaptability and risk management in practical applications. Through continuous optimization and improvement, this strategy has the potential to become a robust trading system.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-28 00:00:00
period: 2d
basePeriod: 2d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Hull Moving Average Crossover", overlay=true)


fastLength = input.int(9, "Fast HMA Length", minval=1)
slowLength = input.int(16, "Slow HMA Length", minval=1)


hma(src, length) =>
    wma1 = ta.wma(src, length / 2)
    wma2 = ta.wma(src, length)
    ta.wma(2 * wma1 - wma2, math.floor(math.sqrt(length)))


fastHMA = hma(close, fastLength)
slowHMA = hma(close, slowLength)


plot(fastHMA, color=color.blue, title="Fast HMA")
plot(slowHMA, color=color.red, title="Slow HMA")


longCondition = ta.crossover(fastHMA, slowHMA)
shortCondition = ta.crossunder(fastHMA, slowHMA)


if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)


plotshape(longCondition, style=shape.triangleup, location=location.belowbar, color=color.green, size=size.small)
plotshape(shortCondition, style=shape.triangledown, location=location.abovebar, color=color.red, size=size.small)
```

> Detail

https://www.fmz.com/strategy/473404

> Last Modified

2024-11-29 16:53:05
