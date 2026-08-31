
> Name

百分比阈值量化交易策略-Percentage-Threshold-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11c21f490fd7ce91bd3.png)

#### Overview
This article introduces a quantitative trading strategy based on a percentage threshold. The strategy determines the timing of buying and selling by setting a percentage threshold and selecting an appropriate time period. When the price rises or falls above or below the specified percentage threshold relative to the previous closing price, it triggers a buy or sell signal. This strategy can be flexibly adjusted according to the user's risk preferences and market conditions, and is suitable for trading various financial instruments.

#### Strategy Principle
The core of this strategy is to generate trading signals based on the percentage change in price. First, the user needs to set a percentage threshold, which represents the magnitude of price change relative to the previous closing price. At the same time, the user also needs to choose a time period, such as 1 minute, 1 hour, 1 day, etc., to calculate the high, low, and closing prices within that time frame. The strategy monitors market prices in real-time. When the highest price of the current time period exceeds the previous closing price plus the threshold, it triggers a buy signal; when the lowest price of the current time period falls below the previous closing price minus the threshold, it triggers a sell signal. If a sell signal is triggered while holding a long position, the strategy closes the long position; if a buy signal is triggered while holding a short position, the strategy closes the short position. In this way, the strategy can make timely trades when price fluctuations are large to capture potential profits.

#### Strategy Advantages
1. Simple and easy to use: The strategy only requires setting two parameters, the percentage threshold and time period, to automatically generate trading signals, making it easy to operate.
2. High flexibility: Users can adjust the percentage threshold and time period according to their risk preferences and market characteristics to adapt to different trading environments.
3. Wide applicability: The strategy can be applied to various financial instruments, such as stocks, futures, and foreign exchange, as long as price data is available for trading.
4. Intuitive and clear: The strategy directly marks buy and sell signals on the chart and plots the equity curve, allowing traders to visually assess the strategy's performance.

#### Strategy Risks
1. Market volatility risk: When market prices fluctuate dramatically, frequent trading may lead to high transaction costs and slippage, affecting the strategy's profitability.
2. Parameter setting risk: Improper settings of the percentage threshold and time period may result in poor strategy performance, requiring adjustments based on market characteristics and personal experience.
3. Overfitting risk: If the strategy parameters are overly optimized, it may lead to poor performance in future market environments, requiring thorough backtesting and forward-looking analysis.

#### Strategy Optimization Directions
1. Incorporate stop-loss and take-profit mechanisms: To control risk, stop-loss and take-profit functions can be added to the strategy, automatically closing positions when prices reach preset stop-loss or take-profit levels to protect capital safety.
2. Dynamically adjust parameters: The percentage threshold and time period can be dynamically adjusted based on changes in market volatility to adapt to different market states. For example, appropriately raising the threshold when market volatility intensifies to reduce trading frequency.
3. Combine with other technical indicators: Combining this strategy with other technical indicators (such as moving averages, relative strength index, etc.) to form a more robust trading system and improve the strategy's reliability.

#### Summary
This article introduces a quantitative trading strategy based on a percentage threshold, which automatically generates buy and sell signals by setting a percentage threshold for price changes and a time period. The strategy is simple to operate, highly flexible, and widely applicable, but also faces risks such as market volatility, parameter settings, and overfitting. By incorporating stop-loss and take-profit mechanisms, dynamically adjusting parameters, and combining with other technical indicators, the strategy's performance can be further optimized to enhance its effectiveness in actual trading.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-28 00:00:00
end: 2024-06-02 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("GBS Percentage", overlay=true)

// Define input options for percentage settings and timeframe
percentage = input.float(1.04, title="Percentage Threshold", minval=0.01, step=0.01) / 100
timeframe = input.timeframe("D", title="Timeframe", options=["1", "3", "5", "15", "30", "60", "240", "D", "W", "M"])

// Calculate high, low, and close of the selected timeframe
high_timeframe = request.security(syminfo.tickerid, timeframe, high)
low_timeframe = request.security(syminfo.tickerid, timeframe, low)
close_timeframe = request.security(syminfo.tickerid, timeframe, close)

// Calculate the percentage threshold based on the previous close
threshold = close_timeframe[1] * percentage

// Define conditions for Buy and Sell
buyCondition = high_timeframe > (close_timeframe[1] + threshold)
sellCondition = low_timeframe < (close_timeframe[1] - threshold)

// Entry and exit rules
if (buyCondition)
    strategy.entry("Buy", strategy.long)

if (sellCondition)
    strategy.entry("Sell", strategy.short)

// Close the positions based on the conditions
if (sellCondition)
    strategy.close("Buy")

if (buyCondition)
    strategy.close("Sell")

// Plot Buy and Sell signals on the chart
plotshape(series=buyCondition, title="Buy Entry", color=color.green, style=shape.triangleup, location=location.belowbar)
plotshape(series=sellCondition, title="Sell Entry", color=color.red, style=shape.triangledown, location=location.abovebar)

// Plot the equity curve of the strategy
plot(strategy.equity, title="Equity", color=color.blue, linewidth=2)

```

> Detail

https://www.fmz.com/strategy/453276

> Last Modified

2024-06-03 16:41:59
