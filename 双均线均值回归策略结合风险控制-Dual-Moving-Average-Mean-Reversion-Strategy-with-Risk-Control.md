
> Name

双均线均值回归策略结合风险控制-Dual-Moving-Average-Mean-Reversion-Strategy-with-Risk-Control

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d8a8924261975b0808.png)


#### Overview

This strategy is a trading system based on dual moving average crossovers and mean reversion principles, combined with a dynamic risk control mechanism. The strategy utilizes the crossover of fast and slow Simple Moving Averages (SMA) to generate trading signals, while using the Average True Range (ATR) indicator to set dynamic stop-losses, enabling precise control of risk for each trade. This approach aims to capture market trends while exiting timely during market reversals, balancing profitability and risk.

#### Strategy Principles

1. Signal Generation:
   - Uses two Simple Moving Averages (SMA) of different periods: a fast SMA (14 periods) and a slow SMA (100 periods).
   - A buy signal is triggered when the price crosses above the slow SMA.
   - A sell signal is triggered when the price crosses below the fast SMA.

2. Risk Control:
   - Uses a 10-period ATR to calculate dynamic stop-loss levels.
   - Stop-loss is set at the entry price minus the ATR multiplied by the risk percentage (default 2%).

3. Trade Execution:
   - Opens a long position at market price when a buy signal occurs, setting a dynamic stop-loss.
   - Closes all positions when a sell signal occurs.

4. Visualization:
   - Plots the price, fast SMA, and slow SMA on the chart.
   - Uses triangle markers to indicate buy and sell signals.

#### Strategy Advantages

1. Combination of Trend Following and Mean Reversion: By using a dual moving average system, the strategy can capture long-term trends while responding to short-term price fluctuations, balancing trend following and mean reversion.

2. Dynamic Risk Control: The use of ATR-based dynamic stop-losses allows the stop level to automatically adjust according to market volatility, providing more precise risk management.

3. Simple yet Effective: The strategy logic is clear, easy to understand and implement, while containing sufficient complexity to handle different market environments.

4. Visual Support: By intuitively displaying trading signals and moving averages on the chart, it helps traders better understand and evaluate strategy performance.

5. Adjustable Parameters: Allows users to adjust key parameters such as moving average periods and risk percentage based on personal risk preferences and market characteristics.

#### Strategy Risks

1. False Breakout Risk: In sideways markets, price may frequently cross the moving averages, leading to excessive false signals and unnecessary trades.

2. Lag: Due to the use of moving averages, the strategy may react slowly at trend turning points, resulting in untimely entries or exits.

3. Overtrading: In highly volatile markets, too many trading signals may be generated, increasing transaction costs.

4. Limitations of Fixed Risk Percentage: Although ATR is used to dynamically adjust stop-losses, a fixed risk percentage may not be suitable for all market conditions.

5. Lack of Profit Targets: The strategy relies solely on moving average crossovers for closing positions, which may lead to premature exits in strong trends, missing out on more potential profits.

#### Strategy Optimization Directions

1. Introduce Trend Filters: Add long-term trend indicators (such as 200-day moving average) to filter trading signals, trading only in the direction of the main trend to reduce false breakouts.

2. Optimize Entry Timing: Consider combining other technical indicators (such as RSI or MACD) to confirm entry signals, improving trading accuracy.

3. Dynamically Adjust Risk Parameters: Adjust the risk percentage dynamically based on market volatility or other market state indicators, making risk management more flexible.

4. Add Profit Targets: Set dynamic profit targets based on ATR or fixed ratios, allowing for larger profit margins when trends are strong.

5. Implement Partial Position Closing: Execute partial position closures when certain profit levels are reached, both locking in partial profits and allowing remaining positions to continue profiting.

6. Optimize Moving Average Periods: Backtest different combinations of moving average periods to find parameter settings more suitable for specific markets.

7. Add Volume Filters: Consider incorporating volume indicators into the signal generation process to improve signal reliability.

#### Conclusion

The Dual Moving Average Mean Reversion Strategy with Risk Control is a trading system that balances trend following and risk management. By utilizing the crossover of fast and slow moving averages to capture market directions, combined with an ATR-based dynamic stop-loss mechanism, the strategy achieves precise risk control for each trade. This method captures market trends while exiting timely during market reversals, providing traders with a tool that balances profitability and risk.

However, the strategy also has some limitations, such as false breakout risks, signal lag, and potential overtrading. There is significant room for optimization through introducing trend filters, optimizing entry timing, dynamically adjusting risk parameters, and other methods. Future improvements can focus on enhancing signal quality, optimizing risk management, and adding profit management mechanisms.

Overall, this strategy provides a solid foundation framework for quantitative trading, with good scalability and adaptability. Through continuous optimization and adjustment, it has the potential to become a powerful and reliable trading system suitable for different market environments and trading instruments.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-07-23 00:00:00
end: 2024-07-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy('TAMMY V2')

// Define the parameters
fast_len = input.int(14, minval=1, title='Fast SMA Length')
slow_len = input.int(100, minval=1, title='Slow SMA Length')
risk_per_trade = input.float(2.0, minval=0.1, maxval=10.0, step=0.1, title='Risk Per Trade (%)')

// Calculate the moving averages
fast_sma = ta.sma(close, fast_len)
slow_sma = ta.sma(close, slow_len)

// Generate the trading signals
buy_signal = ta.crossover(close, slow_sma)
sell_signal = ta.crossunder(close, fast_sma)

// Calculate the stop loss level
atr = ta.sma(ta.tr, 10)
sl = close - atr * (risk_per_trade / 100)

// Execute the trades
if buy_signal
    strategy.entry('Long', strategy.long, stop=sl)
if sell_signal
    strategy.close_all()

// Plot the signals and price
plot(close, color=color.new(#808080, 0), linewidth=2, title='Gold Price')
plot(fast_sma, color=color.new(#FF0000, 0), linewidth=2, title='Fast SMA')
plot(slow_sma, color=color.new(#0000FF, 0), linewidth=2, title='Slow SMA')
plotshape(buy_signal, style=shape.triangleup, color=color.new(#0000FF, 0), size=size.small, title='Buy Signal')
plotshape(sell_signal, style=shape.triangledown, color=color.new(#FF0000, 0), size=size.small, title='Sell Signal')


```

> Detail

https://www.fmz.com/strategy/458065

> Last Modified

2024-07-29 16:47:54
