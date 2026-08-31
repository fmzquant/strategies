
> Name

均值回归策略-Mean-Reversion-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a514e968f293222069.png)

#### Overview
This strategy is based on the principle of mean reversion, using the deviation of prices from the moving average to make trading decisions. It goes short when the price deviates above the upper band and goes long when it deviates below the lower band. The position is closed when the price reverts back to the moving average. The core assumption of this strategy is that prices will always revert to the mean level.

#### Strategy Principles
1. Calculate the simple moving average (SMA) of a specified period (default 20) as the mean price level.
2. Calculate the standard deviation (DEV) of prices and use it to construct upper and lower bands. The upper band is the SMA plus a multiple (default 1.5) of the standard deviation, and the lower band is the SMA minus a multiple of the standard deviation.
3. Go short when the price breaks above the upper band, and go long when it breaks below the lower band.
4. Close the long position when the price crosses below the SMA, and close the short position when the price crosses above the SMA.
5. Mark the moving average, upper band, lower band, and buy/sell signals on the chart.

#### Advantage Analysis
1. The mean reversion strategy is based on the statistical principle that prices always revert to the mean, which has a certain probability of profitability in the long run.
2. The setting of upper and lower bands provides clear entry and exit points, which is convenient for execution and management.
3. The strategy logic is simple and clear, easy to understand and implement.
4. It is suitable for instruments and timeframes that exhibit obvious mean-reversion characteristics.

#### Risk Analysis
1. When the market trend changes, prices may deviate from the mean for a long time without reverting, causing the strategy to fail.
2. Improper setting of the standard deviation multiple may lead to too high or too low trading frequency, affecting returns.
3. In extreme market conditions, price fluctuations can be violent, and the upper and lower bands may lose their effectiveness.
4. If the instrument or timeframe does not have mean-reversion characteristics, the strategy may not be profitable.

#### Optimization Directions
1. Perform optimization tests on the SMA period and standard deviation multiple to find the best parameters.
2. Introduce trend judgment indicators to avoid counter-trend trading when the trend is clear.
3. Add volatility indicators such as ATR in addition to standard deviation to construct dynamic bands.
4. Consider trading costs such as slippage and commissions to control the authenticity of backtesting.
5. Add risk control modules, such as stop-loss, take-profit, and position management.

#### Summary
The mean reversion strategy is a quantitative trading strategy based on statistical principles, which makes trading decisions by constructing upper and lower bands around the mean price. The strategy has simple logic and clear execution, but attention should be paid to the selection of instruments and optimization of parameters. In practical application, factors such as trend, trading costs, and risk control also need to be considered to improve the robustness and profitability of the strategy. In general, the mean reversion strategy is a common and worthy of in-depth study in the field of quantitative trading.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-05-01 00:00:00
end: 2024-05-31 23:59:59
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Mean Regression Strategy", overlay=true)

// Define the lookback period for the moving average
length = input.int(20, title="Moving Average Length")
mult = input.float(1.5, title="Standard Deviation Multiplier")

// Calculate the moving average and standard deviation
ma = ta.sma(close, length)
dev = mult * ta.stdev(close, length)

// Calculate upper and lower bands
upper_band = ma + dev
lower_band = ma - dev

// Plot the moving average and bands
plot(ma, color=color.blue, linewidth=2, title="Moving Average")
plot(upper_band, color=color.red, linewidth=2, title="Upper Band")
plot(lower_band, color=color.green, linewidth=2, title="Lower Band")

// Entry conditions
long_condition = ta.crossover(close, lower_band)
short_condition = ta.crossunder(close, upper_band)

// Exit conditions
exit_long_condition = ta.crossunder(close, ma)
exit_short_condition = ta.crossover(close, ma)

// Strategy orders
if (long_condition)
    strategy.entry("Long", strategy.long)
if (short_condition)
    strategy.entry("Short", strategy.short)

if (exit_long_condition)
    strategy.close("Long")
if (exit_short_condition)
    strategy.close("Short")

// Plot signals on the chart
plotshape(series=long_condition, location=location.belowbar, color=color.green, style=shape.labelup, title="Buy Signal")
plotshape(series=short_condition, location=location.abovebar, color=color.red, style=shape.labeldown, title="Sell Signal")

```

> Detail

https://www.fmz.com/strategy/454339

> Last Modified

2024-06-17 14:57:59
