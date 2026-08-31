
> Name

Adaptive-Dynamic-Trading-Strategy-Based-on-Standardized-Logarithmic-Returns

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15b483dcb29027804eb.png)

#### Overview
This strategy is an adaptive trading system based on the Shiryaev-Zhou Index (SZI). It identifies overbought and oversold market conditions by calculating standardized scores of logarithmic returns, aiming to capture mean reversion opportunities. The strategy incorporates dynamic stop-loss and take-profit targets for precise risk control.

#### Strategy Principles
The core of the strategy lies in constructing a standardized indicator using rolling statistical properties of logarithmic returns. The specific steps are:
1. Calculate logarithmic returns for normalization
2. Compute rolling mean and standard deviation using a 50-period window
3. Construct SZI: (logarithmic return - rolling mean)/rolling standard deviation
4. Generate long signals when SZI falls below -2.0 and short signals when above 2.0
5. Set 2% stop-loss and 4% take-profit levels based on entry price

#### Strategy Advantages
1. Solid Theoretical Foundation: Based on log-normal distribution assumptions with strong statistical support
2. High Adaptability: Rolling window calculations adapt to changes in market volatility characteristics
3. Comprehensive Risk Control: Percentage-based stop-loss strategy enables precise risk control for each trade
4. User-friendly Visualization: Clear annotation of trading signals and risk control levels on charts

#### Strategy Risks
1. Parameter Sensitivity: Strategy performance significantly affected by choice of rolling window length and thresholds
2. Market Environment Dependency: May generate frequent false signals in trending markets
3. Slippage Impact: Actual execution prices may significantly deviate from ideal levels during volatile periods
4. Calculation Delay: Real-time computation of statistical indicators may lead to signal lag

#### Optimization Directions
1. Dynamic Thresholds: Consider adjusting signal thresholds based on market volatility
2. Multiple Time Frames: Introduce signal confirmation mechanisms across multiple timeframes
3. Volatility Filtering: Pause trading or adjust positions during extreme volatility periods
4. Signal Confirmation: Add volume, momentum, and other auxiliary indicators for signal confirmation
5. Position Management: Implement volatility-based dynamic position sizing

#### Summary
This is a quantitative trading strategy built on solid statistical foundations, capturing price volatility opportunities through standardized logarithmic returns. The strategy's main strengths lie in its adaptability and comprehensive risk control, though there remains room for optimization in parameter selection and market environment adaptation. Through the introduction of dynamic thresholds and multi-dimensional signal confirmation mechanisms, the strategy's stability and reliability can be further enhanced.

> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-25 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Jalambi Paul model", overlay=true)

// Define the length for the rolling window
window = input.int(50, title="Window Length", minval=1)
threshold = 2.0 // Fixed threshold value
risk_percentage = input.float(1.0, title="Risk Percentage per Trade", step=0.1) / 100

// Calculate the logarithmic returns
log_return = math.log(close / close[1])

// Calculate the rolling mean and standard deviation
rolling_mean = ta.sma(log_return, window)
rolling_std = ta.stdev(log_return, window)

// Calculate the Shiryaev-Zhou Index (SZI)
SZI = (log_return - rolling_mean) / rolling_std

// Generate signals based on the fixed threshold
long_signal = SZI < -threshold
short_signal = SZI > threshold

// Plot the signals on the main chart (overlay on price)
plotshape(series=long_signal, location=location.belowbar, color=color.green, style=shape.labelup, title="Buy Signal", text="BUY", offset=-1)
plotshape(series=short_signal, location=location.abovebar, color=color.red, style=shape.labeldown, title="Sell Signal", text="SELL", offset=-1)

// Strategy logic: Buy when SZI crosses below the negative threshold, Sell when it crosses above the positive threshold
if (long_signal)
    strategy.entry("Buy", strategy.long, comment="Long Entry")
    
if (short_signal)
    strategy.entry("Sell", strategy.short, comment="Short Entry")

// Calculate the stop loss and take profit levels based on the percentage of risk
stop_loss_pct = input.float(2.0, title="Stop Loss (%)") / 100
take_profit_pct = input.float(4.0, title="Take Profit (%)") / 100

// Set the stop loss and take profit levels based on the entry price
strategy.exit("Take Profit / Stop Loss", "Buy", stop=close * (1 - stop_loss_pct), limit=close * (1 + take_profit_pct))
strategy.exit("Take Profit / Stop Loss", "Sell", stop=close * (1 + stop_loss_pct), limit=close * (1 - take_profit_pct))

// Plot the stop loss and take profit levels for visualization (optional)
plot(stop_loss_pct != 0 ? close * (1 - stop_loss_pct) : na, color=color.red, linewidth=1, title="Stop Loss Level")
plot(take_profit_pct != 0 ? close * (1 + take_profit_pct) : na, color=color.green, linewidth=1, title="Take Profit Level")

```

> Detail

https://www.fmz.com/strategy/476254

> Last Modified

2024-12-27 14:39:32
