
> Name

Ichimoku-Leading-Span-B-突破策略-Ichimoku-Leading-Span-B-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11bf14bf005bb632302.png)


#### Overview

This strategy is based on the Leading Span B line of the Ichimoku Cloud indicator. It generates trading signals when the price breaks through the Leading Span B line. A buy signal is generated when the price breaks above the Leading Span B line, and a sell signal is generated when the price breaks below the Leading Span B line. The strategy leverages the predictive power of the Leading Span B line in the Ichimoku Cloud indicator for future price trends, aiming to capture good trading opportunities by timely detecting the price breakout of the Leading Span B line.

#### Strategy Principle

1. Calculate the Conversion Line (Tenkan-sen), Base Line (Kijun-sen), Leading Span A (Senkou Span A), and Leading Span B (Senkou Span B) of the Ichimoku Cloud indicator.
2. When the closing price breaks above the Leading Span B line, a buy signal is generated, and a long position is opened.
3. When the closing price breaks below the Leading Span B line, a sell signal is generated, and the position is closed.
4. Mark the buy and sell signals on the chart for intuitive observation.

#### Strategy Advantages

1. The strategy is based on the Ichimoku Cloud indicator, which comprehensively considers price information from multiple time dimensions, providing a more comprehensive market analysis.
2. It utilizes the predictive power of the Leading Span B line for future price movements to capture trending opportunities.
3. The strategy logic is simple and clear, easy to understand and implement.
4. By marking buy and sell signals on the chart, it facilitates traders to intuitively grasp trading timing.

#### Strategy Risks

1. The strategy relies on a single indicator, which may face the risk of indicator failure.
2. In a volatile market, frequent price breakouts may lead to excessive trading signals, increasing trading costs.
3. The strategy does not set stop-loss, facing potential risks of large losses.

#### Strategy Optimization Directions

1. Combine with other technical indicators or price behavior characteristics to further confirm trading signals and improve signal reliability.
2. Introduce position management and risk control mechanisms, such as setting reasonable stop-loss and take-profit levels to control single-trade risk.
3. Optimize strategy parameters, such as adjusting the calculation period of the Ichimoku Cloud indicator to adapt to different market conditions.
4. Consider trading cost factors and set appropriate signal filtering mechanisms to reduce frequent trading.

#### Summary

The Ichimoku Leading Span B Breakout Strategy is a trading strategy based on the Leading Span B line of the Ichimoku Cloud indicator. By capturing the timing of price breakouts of the Leading Span B line, it aims to obtain trending trading opportunities. The strategy's advantages are its simple logic, easy implementation, and ability to comprehensively consider price information from multiple time dimensions. However, it also faces potential risks such as single indicator failure, frequent trading, and lack of risk control. Therefore, in practical application, it is necessary to optimize the strategy by combining other indicators, optimizing parameter settings, introducing risk control measures, etc., to improve the strategy's robustness and profitability.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Dönüşüm Periyodu|
|v_input_2|26|Taban Periyodu|
|v_input_3|52|Gecikme Span 2 Periyodu|
|v_input_4|26|Kaydırma|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-04-23 00:00:00
end: 2024-04-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Ichimoku Leading Span B Alım/Satım Stratejisi", overlay=true)

// Ichimoku göstergesi parametreleri
conversionPeriods = input(9, title="Dönüşüm Periyodu")
basePeriods = input(26, title="Taban Periyodu")
laggingSpan2Periods = input(52, title="Gecikme Span 2 Periyodu")
displacement = input(26, title="Kaydırma")

// Ichimoku hesaplama
tenkanSen = (ta.highest(high, conversionPeriods) + ta.lowest(low, conversionPeriods)) / 2
kijunSen = (ta.highest(high, basePeriods) + ta.lowest(low, basePeriods)) / 2
senkouSpanA = (tenkanSen + kijunSen) / 2
senkouSpanB = (ta.highest(high, laggingSpan2Periods) + ta.lowest(low, laggingSpan2Periods)) / 2

// Leading Span B'nin grafiğe çizilmesi
plot(senkouSpanB, color=color.red, title="Leading Span B", offset=displacement)

// Alım sinyali: Fiyat Leading Span B'yi yukarı keserse
buy_signal = ta.crossover(close, senkouSpanB[displacement])
if (buy_signal)
    strategy.entry("Alım", strategy.long)

// Satım sinyali: Fiyat Leading Span B'yi aşağı keserse
sell_signal = ta.crossunder(close, senkouSpanB[displacement])
if (sell_signal)
    strategy.close("Alım")

// Sinyalleri grafik üzerinde gösterme
plotshape(series=buy_signal, title="Alım Sinyali", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)
plotshape(series=sell_signal, title="Satım Sinyali", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small)

```

> Detail

https://www.fmz.com/strategy/449817

> Last Modified

2024-04-29 14:45:40
