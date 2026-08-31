
> Name

Supertrend-and-Bollinger-Bands-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d92bacf6999be07086.png)

#### Overview
This strategy combines the Supertrend indicator and the Bollinger Bands indicator to capture trending opportunities in the market. The Supertrend indicator is used to determine the current market trend direction, while the Bollinger Bands indicator is used to measure market volatility. A long signal is generated when the closing price breaks above the Supertrend line and is below the lower Bollinger Band, and a short signal is generated when the closing price breaks below the Supertrend line and is above the upper Bollinger Band. The advantage of this strategy is that it can enter the market in a timely manner when the trend is clear, while avoiding premature entry in a choppy market.

#### Strategy Principles
1. Calculate the Average True Range (ATR) and Supertrend indicator to determine the current market trend direction.
2. Calculate the upper and lower Bollinger Bands to measure market volatility.
3. Generate a long signal when the closing price breaks above the Supertrend line and is below the lower Bollinger Band; generate a short signal when the closing price breaks below the Supertrend line and is above the upper Bollinger Band.
4. When holding a long position, if the closing price breaks below the Supertrend line, close the position; when holding a short position, if the closing price breaks above the Supertrend line, close the position.

#### Strategy Advantages
1. Combining information from both the trend and volatility dimensions can more comprehensively grasp market opportunities.
2. Able to enter the market in a timely manner when the trend is clear, which helps capture the gains of trending markets.
3. In a choppy market, the combination of Bollinger Bands and Supertrend can effectively filter out false breakout signals and reduce the risk of losses.
4. The code logic is clear, with few parameters, and is easy to understand and implement.

#### Strategy Risks
1. In a unilateral trending market, due to frequent breakout signals, it may lead to excessive trading frequency and increase transaction costs.
2. The capture of breakout points relies on the Supertrend indicator, which is sensitive to parameters, and the indicator trends vary greatly under different parameters, which may affect the strategy's effectiveness.
3. The width of the Bollinger Bands will change with changes in market volatility, and may widen stop-losses in high-volatility environments.

#### Strategy Optimization Directions
1. Consider introducing more effective filtering conditions, such as trading volume, market sentiment, etc., to further improve the reliability of signals.
2. For the parameters of the Supertrend indicator, optimization tests can be conducted to select the optimal parameters to improve strategy stability.
3. In terms of trade execution, more detailed position management and risk control measures can be introduced, such as setting trailing stops, dynamically adjusting positions, etc., to reduce the risk exposure of a single trade.

#### Summary
The Supertrend Bollinger Band combination strategy is a trend-following strategy that can effectively capture trending opportunities by combining two market factors: trend and volatility. However, this strategy also has certain limitations, such as being sensitive to parameters and increased risk in high-volatility environments. Therefore, in actual application, it is necessary to appropriately optimize and improve the strategy according to market characteristics and one's own risk preferences.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Supertrend Factor|
|v_input_2|10|ATR Length|
|v_input_3|20|Bollinger Bands Length|
|v_input_4|2|Bollinger Bands Deviation|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-21 00:00:00
end: 2024-03-28 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © sabhiv27

//@version=4
strategy("Supertrend & Bollinger Bands Strategy", shorttitle="ST_BB_Strategy", overlay=true)

// Input options
factor = input(3, title="Supertrend Factor")
length = input(10, title="ATR Length")
bollinger_length = input(20, title="Bollinger Bands Length")
bollinger_deviation = input(2, title="Bollinger Bands Deviation")

// Calculate True Range for Supertrend
truerange = rma(tr, length)

// Calculate Supertrend
var float up_trend = na
var float dn_trend = na
var float trend = na
up_signal = hl2 - (factor * truerange)
dn_signal = hl2 + (factor * truerange)
up_trend := close[1] > up_trend[1] ? max(up_signal, up_trend[1]) : up_signal
dn_trend := close[1] < dn_trend[1] ? min(dn_signal, dn_trend[1]) : dn_signal
trend := close > dn_trend ? 1 : close < up_trend ? -1 : nz(trend[1], 1)

// Calculate Bollinger Bands
basis = sma(close, bollinger_length)
dev = stdev(close, bollinger_length)
upper_band = basis + bollinger_deviation * dev
lower_band = basis - bollinger_deviation * dev

// Entry conditions
long_condition = crossover(close, up_trend) and close < lower_band
short_condition = crossunder(close, dn_trend) and close > upper_band

// Exit conditions
exit_long_condition = crossover(close, dn_trend)
exit_short_condition = crossunder(close, up_trend)

// Plot Supertrend
plot(trend == 1 ? up_trend : dn_trend, color=trend == 1 ? color.green : color.red, linewidth=2)

// Plot Bollinger Bands
plot(upper_band, color=color.blue)
plot(lower_band, color=color.blue)

// Generate buy and sell signals
strategy.entry("Long", strategy.long, when=long_condition)
strategy.entry("Short", strategy.short, when=short_condition)
strategy.close("Long", when=exit_long_condition)
strategy.close("Short", when=exit_short_condition)
```

> Detail

https://www.fmz.com/strategy/446546

> Last Modified

2024-03-29 15:18:22
