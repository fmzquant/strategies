
> Name

Adaptive-Trend-Momentum-RSI-Strategy-with-Moving-Average-Filter-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1e1fb93e5b5ec16e4be.png)


#### Overview
This strategy is a trend-following trading system that combines the Relative Strength Index (RSI) with Moving Average (MA). The core mechanism utilizes RSI to capture price momentum changes while incorporating a 90-day moving average as a trend filter, effectively tracking market trends. The strategy features adjustable RSI overbought/oversold thresholds and implements a 2500-day lookback period limitation to ensure practicality and stability.

#### Strategy Principles
The strategy is built on several core components:
1. RSI Configuration: Uses 12-period RSI with 70 and 62 as overbought/oversold thresholds to capture market momentum.
2. Moving Average: Employs 90-day moving average as trend confirmation indicator.
3. Position Management: Automatically calculates position size based on current account equity when long signals appear.
4. Time Window: Implements 2500-day lookback period to ensure strategy operates within a reasonable timeframe.

Buy signals are triggered when RSI crosses above 70, while sell signals generate when RSI drops below 62. The system automatically calculates and executes full position entries when entry conditions are met within the valid lookback period.

#### Strategy Advantages
1. Dynamic Adaptability: Adjustable RSI thresholds allow strategy adaptation to different market conditions
2. Robust Risk Control: Dual confirmation using RSI and MA reduces false breakout risks
3. Scientific Position Management: Dynamic position sizing based on account equity ensures efficient capital utilization
4. Reasonable Time Window: 2500-day lookback period prevents overfitting to historical data
5. Visualization Support: Strategy provides real-time visualization of RSI and MA for monitoring and adjustment

#### Strategy Risks
1. Trend Reversal Risk: Potential false breakouts in highly volatile markets
2. Parameter Sensitivity: Strategy performance heavily influenced by RSI and MA period selection
3. Slippage Impact: Full position trading may face slippage risks in low liquidity conditions
4. Lookback Period Limitation: Fixed lookback period might miss certain historical patterns

Risk Control Recommendations:
- Dynamically adjust RSI thresholds based on market characteristics
- Add stop-loss and take-profit functions to enhance risk management
- Consider implementing staged position building to reduce slippage impact
- Regularly evaluate parameter effectiveness

#### Optimization Directions
1. Signal System Optimization:
   - Add more technical indicators for confirmation
   - Incorporate volume analysis to enhance signal reliability

2. Position Management Optimization:
   - Implement staged position building and reduction
   - Add dynamic stop-loss and take-profit functionality

3. Risk Control Optimization:
   - Introduce volatility adaptive mechanism
   - Add market environment analysis module

4. Backtesting System Optimization:
   - Add more backtesting statistics
   - Implement automatic parameter optimization

#### Summary
The strategy constructs a relatively complete trading system by combining RSI momentum indicator with MA trend filter. Its strengths lie in strong adaptability and comprehensive risk control, but attention must be paid to parameter sensitivity and market environment changes. Through the suggested optimization directions, the strategy has significant room for improvement to enhance its stability and profitability further.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-11 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Simple RSI Strategy - Adjustable Levels with Lookback Limit and 30-Day MA", overlay=true)

// Parameters
rsi_length = input.int(12, title="RSI Length", minval=1)  // RSI period
rsi_overbought = input.int(70, title="RSI Overbought Level", minval=1, maxval=100)  // Overbought level
rsi_oversold = input.int(62, title="RSI Oversold Level", minval=1, maxval=100)  // Oversold level
ma_length = input.int(90, title="Moving Average Length", minval=1)  // Moving Average period

// Calculate lookback period (2000 days)
lookback_period = 2500
start_date = timestamp(year(timenow), month(timenow), dayofmonth(timenow) - lookback_period)

// RSI Calculation
rsi_value = ta.rsi(close, rsi_length)

// 30-Day Moving Average Calculation
ma_value = ta.sma(close, ma_length)

// Buy Condition: Buy when RSI is above the overbought level
long_condition = rsi_value > rsi_overbought

// Sell Condition: Sell when RSI drops below the oversold level
sell_condition = rsi_value < rsi_oversold

// Check if current time is within the lookback period
in_lookback_period = (time >= start_date)

// Execute Buy with 100% equity if within lookback period
if (long_condition and strategy.position_size == 0 and in_lookback_period)
    strategy.entry("Buy", strategy.long, qty=strategy.equity / close)

if (sell_condition and strategy.position_size > 0)
    strategy.close("Buy")

// Plot RSI on a separate chart for visualization
hline(rsi_overbought, "Overbought", color=color.red)
hline(rsi_oversold, "Oversold", color=color.green)
plot(rsi_value, title="RSI", color=color.blue)

// Plot the 30-Day Moving Average on the chart
plot(ma_value, title="30-Day MA", color=color.orange, linewidth=2)

```

> Detail

https://www.fmz.com/strategy/471708

> Last Modified

2024-11-12 16:02:31
