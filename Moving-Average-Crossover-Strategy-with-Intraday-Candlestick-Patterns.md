
> Name

Moving-Average-Crossover-Strategy-with-Intraday-Candlestick-Patterns

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13e861b0154d0e60490.png)

### Overview

This strategy generates trading signals based on the crossover of 9-day and 15-day moving averages, combined with some typical intraday candlestick patterns. It goes long when the fast MA crosses above the slow MA and meets certain angle conditions and candlestick patterns. It goes short when the fast MA crosses below the slow MA. Stop loss and take profit levels are set to control risks.

### Strategy Logic

When the short-term moving average (9-day MA) crosses above the longer-term moving average (15-day MA), it indicates stronger short-term upward momentum to go long. When the short-term MA crosses below the long-term MA, it signals stronger short-term downward momentum to go short. In addition, the angle of the MA needs to be greater than 30 degrees to ensure sufficient upward or downward power. Specific intraday candlestick patterns are used to filter out false signals. 

This strategy mainly utilizes the trend-following capability of moving averages and the characteristics of certain candlestick patterns. It can be adapted to different products through parameter tuning.

### Advantage Analysis 

This strategy combines moving average indicators and intraday candlestick patterns to effectively filter out noise and make trading signals more reliable. Especially with the angle threshold, it ensures there is enough price change momentum before generating signals, avoiding unnecessary false signals. Also, the stop loss and take profit levels can automatically limit the maximum loss and drawdown of profit. These measures improve both the stability and profitability.

As a trend-following indicator, the moving average can capture medium- to long-term price trends. The intraday candlesticks reflect the power comparison of short-term market participants. Using them together can obtain trading implication across different time frames. This strategy integrates the strengths of multiple indicators and should achieve good performance in actual trading.

### Risk Analysis

The main risks of this strategy include:

1. False breakout risk. During market consolidation, moving averages may have multiple crosses, most of which are false signals. Getting whipsawed here would incur losses. The candlestick patterns and angle conditions can mitigate this risk.

2. Trend reversal risk. Moving averages cannot give early warnings of trend reversals. Holding positions here may lead to huge losses. This risk can be controlled via strict stop loss.

3. Parameter optimization risk. Different markets adapt differently to parameter settings. Directly applying one set of parameters without adjustment may lead to losses. Proper parameters need to be found through backtesting and paper trading.

In general, this strategy may generate some false signals and chase high/low risks without considering market conditions. Further improvements can be made by incorporating analysis of major trends and price-volume characteristics to optimize it.

### Optimization Directions

The following aspects of this strategy can be further improved:

1. Add analysis of major trends, e.g, confirm medium-/long-term channels, to avoid trading against trends.

2. Incorporate volume indicators. For example, on-balance volume can be used to avoid shorting high-momentum price or buying low-momentum price.

3. Combine fundamentals analysis. Select stocks with improving prospect and earnings to improve winning rate.  

4. Optimize moving average parameters. Test different length periods, triple or quintuple MA systems for greater tuning flexibility.

5. Test stop loss/take profit parameters. Set order book rebate ratios based on backtest results to achieve optimal risk-reward ratio.

The above optimization directions should significantly improve both the profitability and stability of this strategy.

### Summary

In summary, this strategy combines the strengths of moving averages and selected candlestick patterns. The trading signals are generated with relatively strict criteria, filtering out lots of noise and improving signal quality. The stop loss and take profit controls further limit risks and lock in gains. It is a stable quantitative trading strategy worth recommending.

The next step is to further improve the win rate and profitability through parameter optimization. Adding more indicators can also strengthen the robustness. With rigorous paper trading tests, this strategy has the potential to become an effective quantitative tool that generates steady profits.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Fast MA Length|
|v_input_2|15|Slow MA Length|
|v_input_3|0.25|Stop Loss (%)|
|v_input_4|0.25|Target (%)|
|v_input_5|30|Angle Threshold (degrees)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-29 00:00:00
end: 2024-02-28 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Moving Average Crossover Strategy with Candlestick Patterns", overlay=true)

// Define input parameters
fast_length = input(9, "Fast MA Length")
slow_length = input(15, "Slow MA Length")
stop_loss_percent = input(0.25, "Stop Loss (%)")
target_percent = input(0.25, "Target (%)")
angle_threshold = input(30, "Angle Threshold (degrees)")

// Calculate moving averages
fast_ma = sma(close, fast_length)
slow_ma = sma(close, slow_length)

// Define candlestick patterns
is_pin_bar() =>
    pin_bar = abs(open - close) > 2 * abs(open[1] - close[1])
    high_tail = max(open, close) - high > abs(open - close) * 1.5
    low_tail = low - min(open, close) > abs(open - close) * 1.5
    pin_bar and high_tail and low_tail

is_marubozu() =>
    marubozu = abs(open - close) > abs(open[1] - close[1]) * 0.75
    no_upper_shadow = high == max(open, close)
    no_lower_shadow = low == min(open, close)
    marubozu and no_upper_shadow and no_lower_shadow

is_full_body() =>
    full_body = abs(open - close) > abs(open[1] - close[1]) * 0.95
    full_body

// Plot moving averages
plot(fast_ma, color=color.blue, title="Fast MA")
plot(slow_ma, color=color.red, title="Slow MA")

// Calculate angle of slow moving average
ma_angle = abs(180 * (atan(slow_ma[1] - slow_ma) / 3.14159))

// Generate buy/sell signals based on angle condition and candlestick patterns
buy_signal = crossover(fast_ma, slow_ma) and ma_angle >= angle_threshold and (is_pin_bar() or is_marubozu() or is_full_body())
sell_signal = crossunder(fast_ma, slow_ma)

// Calculate stop-loss and target levels
stop_loss_level = close * (1 - stop_loss_percent / 100)
target_level = close * (1 + target_percent / 100)

// Execute trades based on signals with stop-loss and target
strategy.entry("Buy", strategy.long, when=buy_signal)
strategy.exit("Exit", "Buy", stop=stop_loss_level, limit=target_level)

// Plot buy/sell signals on chart (optional)
plotshape(series=buy_signal, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)
plotshape(series=sell_signal, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small)

// Plot angle line
hline(angle_threshold, "Angle Threshold", color=color.black, linestyle=hline.style_dashed)

```

> Detail

https://www.fmz.com/strategy/443109

> Last Modified

2024-02-29 12:07:21
