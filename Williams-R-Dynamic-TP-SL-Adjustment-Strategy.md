
> Name

Williams-R-Dynamic-TP-SL-Adjustment-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/693ea875fea3e9b203.png)

#### Overview
This strategy is based on the Williams %R indicator and optimizes trading performance by dynamically adjusting take profit and stop loss levels. Buy signals are generated when the Williams %R crosses above the oversold area (-80), and sell signals are generated when it crosses below the overbought area (-20). An Exponential Moving Average (EMA) is used to smooth the Williams %R values and reduce noise. The strategy offers flexible parameter settings, including indicator periods, take profit/stop loss (TP/SL) levels, trading hours, and trade direction choices, to adapt to different market conditions and trader preferences.

#### Strategy Principles
1. Calculate the Williams %R indicator value for a given period.
2. Calculate the Exponential Moving Average (EMA) of the Williams %R.
3. When the Williams %R crosses above the -80 level from below, it triggers a buy signal; when it crosses below the -20 level from above, it triggers a sell signal.
4. After a buy entry, set take profit and stop loss levels. The trade is closed when the TP/SL price levels are reached or when the Williams %R triggers a reverse signal.
5. After a sell entry, set take profit and stop loss levels. The trade is closed when the TP/SL price levels are reached or when the Williams %R triggers a reverse signal.
6. Optionally, trade within a specified time range (e.g., 9:00-11:00) and choose whether to trade near the top of the hour (X minutes before to Y minutes after).
7. Optionally, choose the trade direction as long only, short only, or both.

#### Advantages Analysis
1. Dynamic TP/SL: Dynamically adjust take profit and stop loss levels based on user settings, which can better protect profits and control risks.
2. Flexible parameters: Users can set various parameters according to their preferences, such as indicator periods, TP/SL levels, trading hours, etc., to adapt to different market conditions.
3. Smoothed indicator: Introducing EMA to smooth Williams %R values can effectively reduce indicator noise and improve signal reliability.
4. Restricted trading time: Optionally trade within a specific time range to avoid highly volatile market periods and reduce risk.
5. Customizable trade direction: Choose to go long only, short only, or trade in both directions based on market trends and personal judgment.

#### Risk Analysis
1. Improper parameter settings: If the TP/SL settings are too loose or too strict, it may lead to profit loss or frequent stop-outs.
2. Trend identification errors: The Williams %R indicator performs poorly in choppy markets and may generate false signals.
3. Limited effect of time restrictions: Limiting trading time may cause the strategy to miss some good trading opportunities.
4. Over-optimization: Over-optimizing parameters may lead to poor strategy performance in future actual trading.

#### Optimization Directions
1. Combine with other indicators: Such as trend indicators, volatility indicators, etc., to improve the accuracy of signal confirmation.
2. Dynamic parameter optimization: Adjust parameters in real-time according to market conditions, such as using different parameter settings in trending and ranging markets.
3. Improve TP/SL methods: Such as using trailing stop loss, partial profit-taking, etc., to better protect profits and control risks.
4. Incorporate money management: Dynamically adjust the position size of each trade based on account balance and risk preferences.

#### Summary
The Williams %R Dynamic TP/SL Adjustment Strategy captures overbought and oversold price conditions in a simple and effective way while providing flexible parameter settings to adapt to different market environments and trading styles. The strategy dynamically adjusts take profit and stop loss levels, which can better control risks and protect profits. However, when applying the strategy in practice, attention should still be paid to factors such as parameter settings, signal confirmation, and trading time selection to further improve the robustness and profitability of the strategy.



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
strategy("Williams %R Strategy defined buy/sell criteria with TP / SL", overlay=true)

// User inputs for TP and SL levels
tp_level = input.int(defval=60, title="Take Profit (ticks)", minval=10, maxval=500, step=10)
sl_level = input.int(defval=60, title="Stop Loss (ticks)", minval=10, maxval=200, step=10)

// Williams %R calculation
length = input.int(defval=21, title="Length", minval=5, maxval=50, step=1)
willy = 100 * (close - ta.highest(length)) / (ta.highest(length) - ta.lowest(length))

// Exponential Moving Average (EMA) of Williams %R
ema_length = input.int(defval=13, title="EMA Length", minval=5, maxval=50, step=1)
ema_willy = ta.ema(willy, ema_length)

// User inputs for Williams %R thresholds
buy_threshold = -80
sell_threshold = -20

// User input to enable/disable specific trading hours
use_specific_hours = input.bool(defval=false, title="Use Specific Trading Hours")
start_hour = input(defval=timestamp("0000-01-01 09:00:00"), title="Start Hour")
end_hour = input(defval=timestamp("0000-01-01 11:00:00"), title="End Hour")

// User input to choose trade direction
trade_direction = input.string(defval="Both", title="Trade Direction", options=["Buy Only", "Sell Only", "Both"])

// User input to enable/disable "Minutes Before" and "Minutes After" options
enable_minutes_before_after = input.bool(defval=true, title="Enable Minutes Before/After Options")
minutes_before = enable_minutes_before_after ? input.int(defval=10, title="Minutes Before the Top of the Hour", minval=0, maxval=59, step=1) : 0
minutes_after = enable_minutes_before_after ? input.int(defval=10, title="Minutes After the Top of the Hour", minval=0, maxval=59, step=1) : 0

// Condition to check if the current minute is within the user-defined time window around the top of the hour
is_top_of_hour_range = (minute(time) >= (60 - minutes_before) and minute(time) <= 59) or (minute(time) >= 0 and minute(time) <= minutes_after)

// Condition to check if the current time is within the user-defined specific trading hours
in_specific_hours = true
if use_specific_hours
    in_specific_hours := (hour(time) * 60 + minute(time)) >= (hour(start_hour) * 60 + minute(start_hour)) and (hour(time) * 60 + minute(time)) <= (hour(end_hour) * 60 + minute(end_hour))

// Buy and Sell conditions with time-based restriction
buy_condition = ta.crossover(willy, buy_threshold) and is_top_of_hour_range and in_specific_hours
sell_condition = ta.crossunder(willy, sell_threshold) and is_top_of_hour_range and in_specific_hours

// Strategy entry and exit with TP and SL
if (trade_direction == "Buy Only" or trade_direction == "Both") and buy_condition
    strategy.entry("Buy", strategy.long)

if (trade_direction == "Sell Only" or trade_direction == "Both") and sell_condition
    strategy.entry("Sell", strategy.short)

// If a buy entry was taken, allow the trade to be closed after reaching TP and SL or if conditions for a sell entry are true
if (strategy.opentrades > 0)
    strategy.exit("TP/SL", profit=tp_level, loss=sl_level)

// Plot Williams %R and thresholds for visualization
hline(-20, "Upper Band", color=color.red)
hline(-80, "Lower Band", color=color.green)
plot(willy, title="%R", color=color.yellow, linewidth=2)
plot(ema_willy, title="EMA", color=color.aqua, linewidth=2)
```

> Detail

https://www.fmz.com/strategy/453661

> Last Modified

2024-06-07 15:52:55
