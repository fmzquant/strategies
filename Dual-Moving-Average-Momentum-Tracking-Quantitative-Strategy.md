
> Name

Dual-Moving-Average-Momentum-Tracking-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description
![IMG](https://www.fmz.com/upload/asset/d71f7b97eaf85a1190.png)

#### Overview
This is a quantitative trading strategy based on dual moving average crossover signals. The strategy employs two moving averages, one as the main signal line and another as a smoothing signal line. It generates trading signals by monitoring price crossovers with the smoothing signal line, enabling market trend capture and momentum tracking. The strategy's core strength lies in its simple yet effective signal generation mechanism and flexible parameter configuration options.

#### Strategy Principle
The strategy utilizes two levels of moving average calculations. It first computes a basic moving average (default period of 9), followed by a secondary smoothing process (default period of 5). The strategy offers various moving average calculation methods, including Simple Moving Average (SMA), Exponential Moving Average (EMA), Smoothed Moving Average (SMMA), Weighted Moving Average (WMA), and Volume Weighted Moving Average (VWMA). Long signals are generated when the closing price crosses above the smoothing signal line, while short signals are generated when the closing price crosses below it.

#### Strategy Advantages
1. Clear and simple signal generation mechanism, easy to understand and implement
2. Effective reduction of false signals through secondary smoothing
3. Multiple moving average calculation methods available for different market characteristics
4. Flexible parameter configuration for different market cycles
5. Clear code structure, easy to maintain and expand
6. Strong trend-following capabilities

#### Strategy Risks
1. May generate frequent trading signals in oscillating markets, increasing transaction costs
2. Some inherent lag, potentially missing the beginning of market moves
3. Possible significant drawdowns during rapid market reversals
4. Single technical indicator strategy, lacking market environment assessment
5. Risk of overfitting through excessive parameter optimization

#### Strategy Optimization Directions
1. Introduce market environment assessment mechanisms for different parameter configurations
2. Add stop-loss and take-profit mechanisms for risk control
3. Implement volume filters to avoid trading in low liquidity environments
4. Incorporate additional technical indicators as confirmatory signals
5. Develop adaptive parameter mechanisms for dynamic market adjustments
6. Add position management module for more flexible position control

#### Summary
This is an improved version of a classic trend-following strategy that enhances stability while maintaining simplicity through a dual-layer moving average design. The strategy offers good scalability and flexibility, adaptable to different market environments through parameter optimization and function extensions. However, users need to pay attention to transaction cost control and risk management, and it is recommended to conduct thorough backtesting before live trading.
> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-25 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Moving Average 1.0 Strategy", overlay=true)

// Input for Moving Average Length
len = input.int(9, minval=1, title="Length")
src = input(close, title="Source")
offset = input.int(title="Offset", defval=0, minval=-500, maxval=500)

// Calculate the Moving Average
out = ta.sma(src, len)

// Plot the Moving Average
plot(out, color=color.blue, title="MA", offset=offset)

// Function to choose the type of moving average
ma(source, length, type) =>
    switch type
        "SMA" => ta.sma(source, length)
        "EMA" => ta.ema(source, length)
        "SMMA (RMA)" => ta.rma(source, length)
        "WMA" => ta.wma(source, length)
        "VWMA" => ta.vwma(source, length)

// Input for Smoothing Method and Length
typeMA = input.string(title="Method", defval="SMA", options=["SMA", "EMA", "SMMA (RMA)", "WMA", "VWMA"], group="Smoothing")
smoothingLength = input.int(title="Smoothing Length", defval=5, minval=1, maxval=100, group="Smoothing")

// Calculate the Smoothing Line
smoothingLine = ma(out, smoothingLength, typeMA)

// Plot the Smoothing Line
plot(smoothingLine, title="Smoothing Line", color=color.rgb(120, 66, 134, 35), offset=offset)

// Strategy Logic
if (ta.crossover(close, smoothingLine))
    strategy.entry("Buy", strategy.long)

if (ta.crossunder(close, smoothingLine))
    strategy.entry("Sell", strategy.short)




```

> Detail

https://www.fmz.com/strategy/473136

> Last Modified

2024-11-27 15:06:57
