
> Name

Dual-Hull-Moving-Average-Crossover-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d5dd2fa8b7a2e5f4d0.png)

 

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
This is a quantitative trading strategy based on HMA crossovers, providing more timely trading signals by reducing the lag of traditional moving averages. The strategy design is concise, easy to understand and implement, but requires attention to market environment adaptability and risk management in practical applications. Through continuous optimization and improvement, this strategy has the potential to become a robust trading system.

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
