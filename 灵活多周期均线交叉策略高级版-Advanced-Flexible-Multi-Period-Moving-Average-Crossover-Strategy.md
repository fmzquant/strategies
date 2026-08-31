
> Name

灵活多周期均线交叉策略高级版-Advanced-Flexible-Multi-Period-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b5461658cf259b0247.png)


#### Overview
This strategy is an advanced quantitative trading system based on multiple moving averages and time periods. It allows traders to flexibly choose different types of moving averages (including SMA, EMA, WMA, HMA, and SMMA) and switch between multiple time periods such as daily, weekly, or monthly timeframes according to market conditions. The core logic determines buy and sell signals by comparing the closing price with the selected moving average position, while combining different time period reviews to improve trading accuracy.

#### Strategy Principles
The strategy employs a modular design with four core components: moving average type selection module, time period selection module, signal generation module, and position management module. When the closing price crosses above the selected moving average, the system generates a long signal at the beginning of the next trading period; when the closing price crosses below the moving average, the system generates a closing signal. The strategy implements cross-period data calculation through the request.security function, ensuring signal accuracy across different time frames. Additionally, the strategy includes automatic position closing at the end of backtesting to ensure capital safety.

#### Strategy Advantages
1. High Flexibility: Supports combinations of multiple moving average types and time periods, adapting to different market environments
2. Comprehensive Risk Control: Prevents missed opportunities through end-of-period automatic checking mechanism
3. Rational Capital Management: Employs position percentage management for effective risk control
4. Strong Signal Stability: Reduces false signals through multiple confirmation mechanisms
5. Wide Adaptability: Applicable to various trading instruments and market environments

#### Strategy Risks
1. Lag Risk: Moving average indicators inherently have some lag, potentially causing delayed entry and exit timing
2. Oscillation Risk: May generate frequent false breakout signals in sideways markets
3. Cross-Period Risk: Signals from different time periods may contradict each other, requiring effective signal prioritization
4. Capital Management Risk: Fixed percentage positions may be too aggressive under certain market conditions

#### Strategy Optimization Directions
1. Incorporate Volatility Indicators: Suggested addition of ATR or Bollinger Bands for dynamic position sizing
2. Add Trend Filters: Can add long-period trend judgment mechanisms to only open positions in the main trend direction
3. Optimize Signal Confirmation: Consider introducing volume and other auxiliary indicators to improve signal reliability
4. Improve Stop-Loss Mechanism: Suggested addition of trailing stop-loss functionality for better profit protection
5. Add Market Sentiment Indicators: Suggested introduction of RSI or MACD to judge market overbought/oversold conditions

#### Summary
This strategy is a well-designed trading system with clear logic, providing traders with a reliable trading tool through flexible parameter settings and multiple confirmation mechanisms. The strategy's modular design gives it strong scalability, and its performance can be further enhanced through continuous optimization. It is recommended that traders fully test various parameter combinations in a backtesting environment before live trading to find the most suitable strategy configuration for their needs.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-27 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Flexible Moving Average Strategy", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// Input to select the review frequency (Daily, Weekly, Monthly)
check_frequency = input.string("Weekly", title="Review Frequency", options=["Daily", "Weekly", "Monthly"])

// Input to select the Moving Average method (SMA, EMA, WMA, HMA, SMMA)
ma_method = input.string("EMA", title="Moving Average Method", options=["SMA", "EMA", "WMA", "HMA", "SMMA"])

// Input to select the length of the Moving Average
ma_length = input.int(30, title="Moving Average Length", minval=1)

// Input to select the timeframe for Moving Average calculation
ma_timeframe = input.string("W", title="Moving Average Timeframe", options=["D", "W", "M"])

// Calculate all Moving Averages on the selected timeframe
sma_value = request.security(syminfo.tickerid, ma_timeframe, ta.sma(close, ma_length), lookahead=barmerge.lookahead_off)
ema_value = request.security(syminfo.tickerid, ma_timeframe, ta.ema(close, ma_length), lookahead=barmerge.lookahead_off)
wma_value = request.security(syminfo.tickerid, ma_timeframe, ta.wma(close, ma_length), lookahead=barmerge.lookahead_off)
hma_value = request.security(syminfo.tickerid, ma_timeframe, ta.hma(close, ma_length), lookahead=barmerge.lookahead_off)
smma_value = request.security(syminfo.tickerid, ma_timeframe, ta.rma(close, ma_length), lookahead=barmerge.lookahead_off) // Smoothed Moving Average (SMMA)

// Select the appropriate Moving Average based on user input
ma = ma_method == "SMA" ? sma_value : 
     ma_method == "EMA" ? ema_value :
     ma_method == "WMA" ? wma_value :
     ma_method == "HMA" ? hma_value :
     smma_value  // Default to SMMA

// Variable initialization
var float previous_close = na
var float previous_ma = na
var float close_to_compare = na
var float ma_to_compare = na

// Detect the end of the period (Daily, Weekly, or Monthly) based on the selected frequency
var bool is_period_end = false

if check_frequency == "Daily"
    is_period_end := ta.change(time('D')) != 0
else if check_frequency == "Weekly"
    is_period_end := ta.change(time('W')) != 0
else if check_frequency == "Monthly"
    is_period_end := ta.change(time('M')) != 0

// Store the close and Moving Average values at the end of the period
if is_period_end
    previous_close := close[0]  // Closing price of the last day of the period
    previous_ma := ma[0]  // Moving Average value at the end of the period

// Strategy logic
is_period_start = is_period_end

// Check if this is the first bar of the backtest
is_first_bar = barstate.isfirst

if (is_period_start or is_first_bar)
    // If the previous period values are not available, use current values
    close_to_compare := not na(previous_close) ? previous_close : close[0]
    ma_to_compare := not na(previous_ma) ? previous_ma : ma[0]
    
    if close_to_compare < ma_to_compare
        // Close price below the MA -> Sell
        if strategy.position_size > 0
            strategy.close("Long")
    else
        // Close price above the MA -> Buy/Hold
        if strategy.position_size == 0
            strategy.entry("Long", strategy.long)

// Close all positions at the end of the backtest period
if barstate.islastconfirmedhistory
    strategy.close_all(comment="Backtest End")

// Plot the previous period's close price for comparison
plot(previous_close, color=color.red, title="Previous Period Close", style=plot.style_stepline)
plot(close_to_compare, color=color.blue, title="Close to Compare", style=plot.style_line)

// Plot the selected Moving Average
plot(ma, color=color.white, title="Moving Average", style=plot.style_line, linewidth=3)
```

> Detail

https://www.fmz.com/strategy/473238

> Last Modified

2024-11-28 15:18:47
