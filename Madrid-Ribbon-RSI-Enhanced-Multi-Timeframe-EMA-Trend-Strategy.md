
> Name

Madrid-Ribbon-RSI-Enhanced-Multi-Timeframe-EMA-Trend-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8faf87e65ff5672b64c.png)
![IMG](https://www.fmz.com/upload/asset/2d830139dc7d03e2a9967.png)

## Overview

The Madrid Ribbon RSI-Enhanced Multi-Timeframe EMA Trend Strategy is a comprehensive quantitative trading system that cleverly combines a moving average ribbon system (Madrid Ribbon) with a Relative Strength Index (RSI) filter, providing a dual confirmation mechanism for trend identification and trade execution. The core of this strategy involves monitoring a ribbon structure formed by multiple exponential moving averages (EMAs) of different periods (from 5 to 90), while incorporating the RSI indicator as a filtering condition to effectively reduce false signals. The strategy includes built-in automated trading functionality with preset profit targets and stop losses, determining market trend direction and strength by counting the number of green and red moving averages, which then generates buy and sell signals.

## Strategy Principles

The core principle of this strategy is based on the analysis of multi-timeframe moving average clusters and the filtering effect of the RSI indicator:

1. **Multi-Timeframe Moving Average Ribbon System**: The strategy constructs 18 moving averages ranging from 5 to 90 periods and compares them with a 100-period baseline. Each moving average is assigned a color identifier based on its direction of change and position relative to the baseline:
   - Rising and above the baseline: Lime
   - Falling and above the baseline: Maroon
   - Falling and below the baseline: Red
   - Rising and below the baseline: Green

2. **Trend Strength Quantification**: The strategy quantifies trend strength by counting the number of green (rising) and red (falling) moving averages:
   - When the number of green moving averages ≥ 13, it identifies a strong upward trend
   - When the number of red moving averages ≥ 9, it identifies a strong downward trend

3. **RSI Filtering Mechanism**: To reduce false signals, the strategy incorporates the RSI indicator as a filtering condition:
   - Buy signal requires: Green moving averages ≥ 13 and RSI < 30 (oversold territory)
   - Sell signal requires: Red moving averages ≥ 9 and RSI > 70 (overbought territory)

4. **Risk Management Mechanism**: The strategy sets percentage-based profit targets and stop losses:
   - Long trades: Profit target at entry price + 0.5%, stop loss at entry price - 1%
   - Short trades: Profit target at entry price - 0.5%, stop loss at entry price + 1%

5. **Capital Management**: The strategy allows users to set initial capital and automatically calculates position size based on the current price.

## Strategy Advantages

1. **Multiple Confirmation Mechanism**: By combining the moving average ribbon system with the RSI indicator, the strategy provides multiple confirmation mechanisms, significantly reducing the possibility of false signals. When both the moving average cluster and RSI simultaneously meet the conditions, the reliability of the signal is greatly improved.

2. **Trend Strength Quantification**: Unlike simple crossover strategies, this strategy quantifies trend strength by counting the number of different colored moving averages, making trading decisions more objective and data-driven.

3. **Visualized Trading Signals**: The strategy clearly displays signals on the chart through background color changes and shape markers, allowing traders to intuitively identify potential trading opportunities.

4. **Built-in Risk Management**: The strategy integrates profit target and stop loss mechanisms by default, with clear presets for maximum profit and loss on each trade, effectively controlling risk exposure.

5. **High Adaptability**: The strategy allows users to choose between EMA or SMA, which can be flexibly adjusted according to different market environments. EMAs are more sensitive to recent price changes, while SMAs are smoother, with different settings suitable for different market conditions.

6. **Comprehensive Market State Monitoring**: By monitoring 18 moving averages of different periods, the strategy can comprehensively capture market dynamics, reducing the blind spots that might be caused by single timeframe analysis.

## Strategy Risks

1. **Trend Reversal Delay**: Because the strategy relies on multiple moving averages, there may be a lagged response when trends rapidly reverse, leading to less-than-ideal entry or exit timing. To address this risk, consider adding shorter-period indicators or adjusting RSI parameters to increase the strategy's sensitivity to market changes.

2. **Strict Filtering Conditions Missing Opportunities**: The RSI filtering conditions are set quite strictly (< 30 and > 70), which may miss some potential trading opportunities. Users can adjust the RSI thresholds according to specific market characteristics, such as relaxing the buy condition to RSI < 40 and the sell condition to RSI > 60.

3. **Limitations of Fixed Percentage Profit Targets and Stop Losses**: The strategy uses fixed percentage settings for profit targets and stop losses (0.5% and 1%), which may not be flexible enough in markets with different volatility. It is recommended to dynamically adjust profit target and stop loss levels based on the Average True Range (ATR) of the asset.

4. **Ranging Market Risk**: During market consolidation phases, moving averages may frequently intersect, causing signal confusion. This can be mitigated by adding additional range detection mechanisms (such as the ADX indicator) to avoid excessive trading in low-volatility environments.

5. **Parameter Sensitivity**: Strategy performance is sensitive to parameter selection (such as moving average periods and RSI length). Inappropriate parameter selection may lead to poor strategy performance. It is recommended to conduct thorough parameter optimization and backtesting before live implementation.

## Strategy Optimization Directions

1. **Dynamic Profit Target and Stop Loss Mechanism**: Replace fixed percentage profit targets and stop losses with the ATR indicator to better adapt to changes in market volatility. For example, set stop loss at 1.5*ATR and profit target at 1*ATR, making risk management more flexible and market-adaptive.

2. **Add Trend Strength Filter**: Introduce the ADX indicator to measure trend strength, trading only in strong trend environments where ADX > 25, avoiding too many false signals in weak trend or ranging markets.

3. **Optimize RSI Parameters**: The current strategy uses the standard 14-period RSI. Consider adjusting the RSI period based on specific asset characteristics and timeframes, or use a dual RSI system (checking both short-period and long-period RSI) to reduce false signals.

4. **Incorporate Volume Confirmation**: Add a volume analysis dimension to ensure sufficient market participation when signals occur, increasing the reliability of trading signals. For example, require buy signals to coincide with volume above the N-day average level.

5. **Implement Dynamic Position Sizing**: Adjust position size dynamically based on trend strength (the number of green or red moving averages), increasing positions in stronger trends and reducing positions in weaker trends, optimizing capital efficiency.

6. **Add Market Environment Filtering**: Detect the current market environment through volatility indicators (such as VIX or ATR), adjusting strategy parameters or pausing trading in high-volatility environments, reducing risk under extreme market conditions.

## Summary

The Madrid Ribbon RSI-Enhanced Multi-Timeframe EMA Trend Strategy is a comprehensive quantitative trading system that provides traders with a powerful tool for trend identification and trade execution by combining the moving average ribbon structure with RSI filtering mechanisms. The core advantages of the strategy lie in its multiple confirmation mechanisms and trend strength quantification capabilities, making trading decisions more objective and data-driven.

Although the strategy performs well in trending markets, it may face challenges in ranging markets and rapid reversal environments. By introducing dynamic profit targets and stop losses, trend strength filtering, volume confirmation, and other optimization measures, the robustness and adaptability of the strategy can be further enhanced.

This strategy is particularly suitable for medium to long-term trend traders, capable of finding high-probability trading opportunities across various market environments through reasonable parameter adjustments and risk management. However, any trading strategy needs to match the trader's risk preference and investment objectives, so thorough backtesting and optimization are recommended before live implementation.

> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-24 00:00:00
end: 2025-03-23 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BNB_USDT"}]
*/

//@version=5
strategy("Madrid Ribbon Strategy with Backtesting", shorttitle="Madrid Ribbon Strat", overlay=true, default_qty_type=strategy.cash, default_qty_value=100000)

// Inputs
i_exp = input.bool(true, title="Use Exponential MA")
wallet_balance = input.float(100000, title="Starting Wallet Balance", minval=1000)

// RSI Settings
rsi_length = input.int(14, title="RSI Length")
rsi = ta.rsi(close, rsi_length)

// Profit Target & Stop Loss (%)
long_take_profit_perc = input.float(0.5, title="Long Take Profit (%)") / 100  // 0.5%
long_stop_loss_perc = input.float(1.0, title="Long Stop Loss (%)") / 100    // 1%
short_take_profit_perc = input.float(0.5, title="Short Take Profit (%)") / 100  // 0.5%
short_stop_loss_perc = input.float(1.0, title="Short Stop Loss (%)") / 100    // 1%

// Source
src = close

// Compute Moving Averages
ma05 = i_exp ? ta.ema(src, 5) : ta.sma(src, 5)
ma10 = i_exp ? ta.ema(src, 10) : ta.sma(src, 10)
ma15 = i_exp ? ta.ema(src, 15) : ta.sma(src, 15)
ma20 = i_exp ? ta.ema(src, 20) : ta.sma(src, 20)
ma25 = i_exp ? ta.ema(src, 25) : ta.sma(src, 25)
ma30 = i_exp ? ta.ema(src, 30) : ta.sma(src, 30)
ma35 = i_exp ? ta.ema(src, 35) : ta.sma(src, 35)
ma40 = i_exp ? ta.ema(src, 40) : ta.sma(src, 40)
ma45 = i_exp ? ta.ema(src, 45) : ta.sma(src, 45)
ma50 = i_exp ? ta.ema(src, 50) : ta.sma(src, 50)
ma55 = i_exp ? ta.ema(src, 55) : ta.sma(src, 55)
ma60 = i_exp ? ta.ema(src, 60) : ta.sma(src, 60)
ma65 = i_exp ? ta.ema(src, 65) : ta.sma(src, 65)
ma70 = i_exp ? ta.ema(src, 70) : ta.sma(src, 70)
ma75 = i_exp ? ta.ema(src, 75) : ta.sma(src, 75)
ma80 = i_exp ? ta.ema(src, 80) : ta.sma(src, 80)
ma85 = i_exp ? ta.ema(src, 85) : ta.sma(src, 85)
ma90 = i_exp ? ta.ema(src, 90) : ta.sma(src, 90)
ma100 = i_exp ? ta.ema(src, 100) : ta.sma(src, 100)

// Function for ribbon color
maColor(_ma, _maRef) =>
    diffMA = ta.change(_ma)
    resultColor = diffMA >= 0 and _ma > _maRef ? color.lime :
                  diffMA < 0 and _ma > _maRef ? color.maroon :
                  diffMA <= 0 and _ma < _maRef ? color.red :
                  diffMA >= 0 and _ma < _maRef ? color.green : color.gray
    resultColor

// Count Green and Red Ribbons
count_green = 0
count_red = 0

mas = array.new_float(18)
array.set(mas, 0, ma05)
array.set(mas, 1, ma10)
array.set(mas, 2, ma15)
array.set(mas, 3, ma20)
array.set(mas, 4, ma25)
array.set(mas, 5, ma30)
array.set(mas, 6, ma35)
array.set(mas, 7, ma40)
array.set(mas, 8, ma45)
array.set(mas, 9, ma50)
array.set(mas, 10, ma55)
array.set(mas, 11, ma60)
array.set(mas, 12, ma65)
array.set(mas, 13, ma70)
array.set(mas, 14, ma75)
array.set(mas, 15, ma80)
array.set(mas, 16, ma85)
array.set(mas, 17, ma90)

for i = 0 to array.size(mas) - 1
    ma = array.get(mas, i)
    col = maColor(ma, ma100)
    count_green += col == color.lime or col == color.green ? 1 : 0
    count_red += col == color.red or col == color.maroon ? 1 : 0

// Buy/Sell Conditions
buy_signal = count_green >= 13
sell_signal = count_red >= 9

// RSI Filtering
rsi_buy = buy_signal and rsi < 30
rsi_sell = sell_signal and rsi > 70

// Calculate Entry, Take Profit & Stop Loss for Long and Short
entry_price = close
long_take_profit = entry_price * (1 + long_take_profit_perc)  // +0.5%
long_stop_loss = entry_price * (1 - long_stop_loss_perc)      // -1%
short_take_profit = entry_price * (1 - short_take_profit_perc) // -0.5%
short_stop_loss = entry_price * (1 + short_stop_loss_perc)     // +1%

// Backtesting Orders
if rsi_buy
    strategy.entry("Buy", strategy.long, qty=wallet_balance / close)
    strategy.exit("Long Exit", from_entry="Buy", limit=long_take_profit, stop=long_stop_loss)
    alert("? Buy Signal! Entering long trade at " + str.tostring(entry_price), alert.freq_once_per_bar_close)

if rsi_sell
    strategy.entry("Sell", strategy.short, qty=wallet_balance / close)
    strategy.exit("Short Exit", from_entry="Sell", limit=short_take_profit, stop=short_stop_loss)
    alert("? Sell Signal! Entering short trade at " + str.tostring(entry_price), alert.freq_once_per_bar_close)

// Highlight Chart Background Based on Ribbon Counts
bgcolor(count_green >= 13 ? color.new(color.green, 90) : count_red >= 9 ? color.new(color.red, 90) : na, title="Ribbon Trend Highlight")

// Plot "B" when Buy Signal is active
plotshape(rsi_buy, location=location.belowbar, color=color.green, style=shape.labelup, title="Buy Signal", text="B")

// Plot "S" when Sell Signal is active
plotshape(rsi_sell, location=location.abovebar, color=color.red, style=shape.labeldown, title="Sell Signal", text="S")

// Plot the Madrid Ribbon (all MAs)
plot(ma05, color=maColor(ma05, ma100), title="MA05", linewidth=1)
plot(ma10, color=maColor(ma10, ma100), title="MA10", linewidth=1)
plot(ma15, color=maColor(ma15, ma100), title="MA15", linewidth=1)
plot(ma20, color=maColor(ma20, ma100), title="MA20", linewidth=1)
plot(ma25, color=maColor(ma25, ma100), title="MA25", linewidth=1)
plot(ma30, color=maColor(ma30, ma100), title="MA30", linewidth=1)
plot(ma35, color=maColor(ma35, ma100), title="MA35", linewidth=1)
plot(ma40, color=maColor(ma40, ma100), title="MA40", linewidth=1)
plot(ma45, color=maColor(ma45, ma100), title="MA45", linewidth=1)
plot(ma50, color=maColor(ma50, ma100), title="MA50", linewidth=1)
plot(ma55, color=maColor(ma55, ma100), title="MA55", linewidth=1)
plot(ma60, color=maColor(ma60, ma100), title="MA60", linewidth=1)
plot(ma65, color=maColor(ma65, ma100), title="MA65", linewidth=1)
plot(ma70, color=maColor(ma70, ma100), title="MA70", linewidth=1)
plot(ma75, color=maColor(ma75, ma100), title="MA75", linewidth=1)
plot(ma80, color=maColor(ma80, ma100), title="MA80", linewidth=1)
plot(ma85, color=maColor(ma85, ma100), title="MA85", linewidth=1)
plot(ma90, color=maColor(ma90, ma100), title="MA90", linewidth=1)
plot(ma100, color=maColor(ma100, ma100), title="MA100", linewidth=2)
```

> Detail

https://www.fmz.com/strategy/488034

> Last Modified

2025-03-24 15:52:28
