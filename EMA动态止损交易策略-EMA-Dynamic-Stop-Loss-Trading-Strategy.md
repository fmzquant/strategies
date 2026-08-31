
> Name

EMA动态止损交易策略-EMA-Dynamic-Stop-Loss-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1427fdee89e710dfa9b.png)

#### Overview
This strategy generates buy and sell signals based on the crossover of the 20-day and 200-day Exponential Moving Averages (EMAs), confirmed by the Relative Strength Index (RSI) and Moving Average Convergence Divergence (MACD) indicators. The strategy employs dynamic stop-loss and fixed profit target methods to manage trading risks and lock in profits.

#### Strategy Principles
1. Calculate the 20-day and 200-day EMAs. A buy signal is generated when the 20-day EMA crosses above the 200-day EMA, and a sell signal is generated when the 20-day EMA crosses below the 200-day EMA.
2. Use RSI and MACD to confirm the EMA crossover signals. A buy signal is executed only when RSI is above 50 and the MACD line is above the signal line. A sell signal is executed only when RSI is below 50 and the MACD line is below the signal line.
3. Set a fixed profit target (e.g., 20%) and an initial stop-loss level (e.g., 10%).
4. When the unrealized profit reaches the profit target, raise the stop-loss price to 10% below the current price, implementing a dynamic stop-loss.
5. Close the position for a profit when the price hits the dynamic stop-loss level.

#### Strategy Advantages
1. Combining multiple technical indicators to confirm trading signals increases signal reliability.
2. The dynamic stop-loss method helps lock in profits while giving prices some room for pullback, avoiding premature position closure.
3. Setting a fixed profit target helps control risks and achieve stable returns.

#### Strategy Risks
1. EMA crossover signals may generate frequent false signals, leading to increased trading costs.
2. In choppy markets, the strategy may experience consecutive losses.
3. Fixed profit targets and stop-loss levels may not adapt well to different market conditions and may require adjustments based on market volatility.

#### Strategy Optimization Directions
1. Incorporate additional technical indicators or market sentiment indicators to improve signal accuracy and reliability.
2. Adopt adaptive profit targets and stop-loss levels that dynamically adjust based on market volatility and asset characteristics.
3. Consider market trends and volatility cycles, and apply different parameter settings in different market environments.

#### Summary
By combining EMA crossover signals with RSI and MACD confirmation, along with dynamic stop-loss and fixed profit target risk management methods, this strategy aims to achieve stable profits in trending markets. However, in choppy markets, the strategy may face risks of frequent trading and consecutive losses. Therefore, further optimization and improvements are needed to enhance the strategy's adaptability and robustness.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-06-11 00:00:00
end: 2024-06-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("EMA Crossover Strategy with RSI and MACD Confirmation and Dynamic Trailing Stop Loss", overlay=true)

// Calculate EMAs
ema20 = ta.ema(close, 20)
ema200 = ta.ema(close, 200)

// Calculate RSI
rsi = ta.rsi(close, 14)

// Calculate MACD
[macdLine, signalLine, _] = ta.macd(close, 12, 26, 9)

// Plot EMAs, RSI, and MACD on the chart
plot(ema20, color=color.blue, title="EMA 20")
plot(ema200, color=color.red, title="EMA 200")
hline(70, "Overbought", color=color.red)
hline(30, "Oversold", color=color.green)
plot(rsi, title="RSI", color=color.orange)
hline(0, "Zero Line", color=color.gray)
plot(macdLine, title="MACD Line", color=color.aqua)
plot(signalLine, title="Signal Line", color=color.fuchsia)

// Strategy parameters
targetProfitPercent = 20
trailingStopIncrement = 10

// Strategy variables
var float initialStopLevel = na
var float trailingStopLevel = na

// Strategy rules with RSI and MACD confirmation
longCondition = ta.crossover(ema20, ema200) and rsi > 50 and macdLine > signalLine
shortCondition = ta.crossunder(ema20, ema200) and rsi < 50 and macdLine < signalLine

// Execute trades
if (longCondition)
    strategy.entry("Buy Call", strategy.long)
    initialStopLevel := strategy.position_avg_price * (1 - 0.10) // Initial stop-loss at 10% below entry price

if (shortCondition)
    strategy.entry("Buy Put", strategy.short)

// Calculate profit and loss targets
takeProfit = strategy.position_avg_price * (1 + targetProfitPercent / 100) // 20% profit target

// Update trailing stop loss
if (strategy.opentrades > 0)
    if (strategy.position_size > 0) // Long position
        if (strategy.netprofit >= takeProfit)
            // Update stop-loss based on profit increments
            if (trailingStopLevel == na)
                trailingStopLevel := strategy.position_avg_price * (1 - 0.10) // Initial trailing stop at 10% below entry price
            else
                if (strategy.position_avg_price * (1 - 0.10) > trailingStopLevel)
                    trailingStopLevel := strategy.position_avg_price * (1 - 0.10) // Increase stop-loss to 10% below current price
        
        // Apply trailing stop loss
        strategy.exit("Take Profit", "Buy Call", stop=trailingStopLevel)

// Plot buy and sell signals on the chart
plotshape(series=longCondition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(series=shortCondition, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

```

> Detail

https://www.fmz.com/strategy/454359

> Last Modified

2024-06-17 16:17:31
