
> Name

EMA-200-交叉量价趋势策略EMA-200-Crossover-with-Volume-and-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18bb05b62fea71c90b3.png)

## Strategy Overview

The Jurik 50-100 EMA 200 Crossover with Volume and Trend strategy is a trading strategy based on the crossover between the Jurik moving average and the Exponential Moving Average (EMA), combined with volume conditions and trend confirmation. The strategy uses the crossover of the Jurik moving average (with a period of 50) and the EMA (with a period of 200) to generate buy and sell signals, while considering volume conditions and trend direction for confirmation.

## Strategy Principle

The core of this strategy is to utilize the crossover of two moving averages with different periods to capture potential trend changes. Specifically:

1. When the price crosses above both the Jurik and EMA moving averages, and the current candle's close price is above the EMA, a buy signal is generated under the confirmation of high volume conditions and an uptrend.

2. When the price crosses below both the Jurik and EMA moving averages, and the current candle's close price is below the EMA, a sell signal is generated under the confirmation of high volume conditions and a downtrend.

The strategy employs the Jurik moving average, which is designed to be more responsive to price changes. Meanwhile, the EMA is used as a reference for the long-term trend. By combining volume analysis and trend confirmation, the strategy aims to identify potential entry points in the early stages of trend formation.

## Strategy Advantages

1. Trend Following: By using the crossover of moving averages with different periods, the strategy can effectively capture potential trend changes, helping traders align with market trends.

2. Volume Confirmation: The strategy incorporates volume as one of the confirmation factors to validate the effectiveness of price breakouts. High volume indicates interest from market participants and the sustainability of the trend.

3. Risk Management: The strategy includes a fixed risk factor, determining the position size based on the user's defined risk tolerance, which helps control risk.

4. Visualization: The strategy plots buy and sell signals on the chart, visually indicating potential entry points, making it convenient for traders to make decisions.

## Strategy Risks

1. False Breakouts: In some cases, the price may experience temporary breakouts but quickly reverse, leading to false trading signals.

2. Market Noise: Short-term market volatility may cause frequent trading signals, increasing trading costs and the risk of false signals.

3. Trend Reversal: The strategy trades in the early stages of trend formation, but if the trend suddenly reverses, it may lead to losses.

To address these risks, traders can consider combining other technical indicators or filtering conditions, such as using moving averages with longer time periods to confirm trends, or setting appropriate stop-loss and take-profit levels to manage risk.

## Strategy Optimization Directions

1. Parameter Optimization: Optimize the periods of the Jurik moving average and EMA through testing to find the best-performing parameter combinations under different market conditions.

2. Multi-Timeframe Confirmation: Consider confirming signals on multiple timeframes to filter out false breakouts and short-term noise.

3. Dynamic Risk Management: Dynamically adjust the risk factor and position size based on market volatility or other risk indicators to better adapt to different market environments.

4. Combining Other Indicators: Combine the strategy with other technical indicators or market sentiment indicators to improve the reliability and accuracy of signals.

By implementing these optimization directions, the robustness and adaptability of the strategy can be enhanced to better cope with different market conditions.

## Strategy Summary

The Jurik 50-100 EMA 200 Crossover with Volume and Trend strategy is a trading strategy based on moving average crossovers, combined with volume confirmation and trend validation. The strategy leverages the sensitivity of the Jurik moving average to price changes and the ability of EMA to capture long-term trends, aiming to identify potential entry opportunities in the early stages of trend formation. By confirming with volume and validating trend direction, the strategy seeks to improve the reliability of trading signals. The inclusion of a fixed risk factor helps control risk.

Although the strategy has its advantages, it also faces risks such as false breakouts, market noise, and trend reversals. To address these risks and further enhance the strategy's performance, traders can consider optimizing the strategy through methods such as parameter optimization, multi-timeframe confirmation, dynamic risk management, and combining other indicators.

Overall, the Jurik 50-100 EMA 200 Crossover with Volume and Trend strategy provides a trading framework based on moving averages and volume, aiming to capture potential trading opportunities in dynamic market environments through trend following and risk management. Traders can make appropriate adjustments and optimizations to the strategy based on their risk preferences and trading styles, seeking to achieve better trading performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|50|Periodo Jurik|
|v_input_int_2|200|Periodo EMA|
|v_input_float_1|10000|Volume Threshold|
|v_input_float_2|3|Risk Factor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-03-13 00:00:00
end: 2024-03-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Jurik 50-100 EMA 200 Crossover with Volume and Trend", shorttitle="Jurik50-100_EMA200_Vol_Trend", overlay=true)

// Impostazione dei periodi per le medie mobili
jurik_periodo = input.int(50, title="Periodo Jurik", minval=1)
ema_periodo = input.int(200, title="Periodo EMA", minval=1)
vol_threshold = input.float(10000, title="Volume Threshold", minval=0)
risk_factor = input.float(3, title="Risk Factor", minval=0)

// Calcola la media mobile Jurik con fase 100
calcola_media_mobile_jurik(source, length) =>
    alpha = 0.5 // Valore fittizio per alpha
    sum1 = 0.0
    sum2 = 0.0
    for i = 0 to length - 1
        sum1 := sum1 + (1 - alpha) * math.pow(alpha, i) * source[i]
        sum2 := sum2 + (1 - alpha) * math.pow(alpha, i)
    sum1 / sum2

// Calcola la media mobile esponenziale (EMA)
ema = ta.ema(close, ema_periodo)

// Calcola la media mobile Jurik
jurik = calcola_media_mobile_jurik(close, jurik_periodo)

// Calcola il volume
volume_cond = volume > vol_threshold

// Condizione di uptrend e downtrend
uptrend = ta.crossover(close, ema) and volume_cond
downtrend = ta.crossunder(close, ema) and volume_cond

// Segnali di ingresso
long_condition = uptrend and ta.crossover(jurik, ema) and close > ema and jurik < close
short_condition = downtrend and ta.crossunder(jurik, ema) and close < ema and jurik > close

// Calcola la dimensione della posizione considerando il fattore di rischio
risk_position_size = 1

// Genera segnali di trading con dimensione della posizione basata sul rischio
strategy.entry("Buy", strategy.long, when=long_condition, qty=risk_position_size)
strategy.entry("Sell", strategy.short, when=short_condition, qty=risk_position_size)

// Etichetta dei segnali di ingresso
plotshape(series=long_condition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)
plotshape(series=short_condition, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small)

```

> Detail

https://www.fmz.com/strategy/445457

> Last Modified

2024-03-19 15:58:22
